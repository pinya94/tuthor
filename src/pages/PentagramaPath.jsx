// ── Pentagrama Path ──────────────────────────────────────────────────────────
// Modo Survivor: partitura infinita generada sobre la marcha. La dificultad
// escala con las notas resueltas (tempo, ventana de tolerancia, ritmos y
// alteraciones) y la partida termina a los FAILS_LIMIT fallos.
//
// Se evalúan DOS ejes por nota (¿tecla correcta? y ¿dentro de la ventana?)
// → 4 resultados: perfecto (verde) · nota bien, tiempo mal (amarillo) ·
// tiempo bien, nota mal (naranja) · fallo (rojo). Solo "perfecto" libra de
// perder una vida — si no, machacar todas las teclas a la vez no costaría
// nada.
//
// Cada cierto número de notas resueltas se ofrece un bono a elegir (vidas,
// tempo más lento, puntería ancha o puntos) — el hueco entre bonos crece
// hasta que dejan de aparecer tras BONUS_THRESHOLDS.length rondas.
//
// La versión estructurada por fases (progresión graduada, sin partitura
// infinita) vive en /examen/musica — ver src/pages/MusicaExamen.jsx.

import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import PentagramaSVG from '../components/PentagramaSVG'
import PianoVirtual from '../components/PianoVirtual'
import { ensureAudio, playNote, playClick } from '../lib/pentagramaAudio'
import { COUNT_IN_BEATS } from '../data/pentagramaMelodies'
import { FAILS_LIMIT, LOOKAHEAD_BEATS, stageFor, siguienteEvento } from '../lib/pentagramaSurvivor'

const LS_SURVIVOR_BEST = 'pentagrama-path-survivor-best'

// Notas blancas de la octava (para el bono "puntería ancha": nota vecina)
const WHITE_ORDER = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']
function esVecina(pulsada, objetivo) {
  const i = WHITE_ORDER.indexOf(objetivo)
  if (i < 0) return false
  return pulsada === WHITE_ORDER[i - 1] || pulsada === WHITE_ORDER[i + 1]
}

// Nº de notas resueltas a las que aparece cada bono. El hueco crece
// (8, 12, 15, 20, 25) y no hay más ofertas después de la 5ª.
const BONUS_THRESHOLDS = [8, 20, 35, 55, 80]

const PTS = { perfecto: 100, amarillo: 60, naranja: 30, rojo: 0 }

const RESULT_UI = {
  perfecto: { color: 'bg-green-400',  label: { es: 'Perfecto', en: 'Perfect', ca: 'Perfecte' } },
  amarillo: { color: 'bg-yellow-400', label: { es: 'Nota bien, tiempo mal', en: 'Right note, wrong time', ca: 'Nota bé, temps malament' } },
  naranja:  { color: 'bg-orange-400', label: { es: 'Tiempo bien, nota mal', en: 'Right time, wrong note', ca: 'Temps bé, nota malament' } },
  rojo:     { color: 'bg-red-400',    label: { es: 'Fallo', en: 'Miss', ca: 'Errada' } },
}

export default function PentagramaPath() {
  const navigate = useNavigate()
  const { lang, tr, localPath } = useLang()
  const { user } = useAuth()

  const [pantalla, setPantalla] = useState('intro') // intro | survivor | survivor-fin

  const [survNotas, setSurvNotas] = useState([])
  const [survRes, setSurvRes] = useState([])
  const [survPlayBeat, setSurvPlayBeat] = useState(null)
  const [survFails, setSurvFails] = useState(0)
  const [survScore, setSurvScore] = useState(0)
  const [survStreak, setSurvStreak] = useState(0)
  const [survResueltas, setSurvResueltas] = useState(0)
  const [survFinal, setSurvFinal] = useState(null)
  const [survBest] = useState(() => Number(localStorage.getItem(LS_SURVIVOR_BEST) || 0))
  const [bonusOpen, setBonusOpen] = useState(false)
  const [bonusOpciones, setBonusOpciones] = useState([])

  const survNotasRef = useRef([])
  const survResRef = useRef([])
  const survFailsRef = useRef(0)
  const survScoreRef = useRef(0)
  const survStreakRef = useRef(0)
  const survBestStreakRef = useRef(0)
  const survResueltasRef = useRef(0)
  const survBeatRef = useRef(0)
  const survLastFrameRef = useRef(0)
  const survLastClickFloorRef = useRef(null)
  const survRafRef = useRef(null)
  const survFinishedRef = useRef(false)
  const survSavedRef = useRef(false)
  const bonusIdxRef = useRef(0)
  const bonusPendingRef = useRef(false) // true entre offerBonus() y elegirBono()
  const tempoBoostRef = useRef(null) // { until, factor }
  const wideRef = useRef(null)       // { until }

  useEffect(() => () => cancelAnimationFrame(survRafRef.current), [])

  // Bonos de la partida: definidos aquí dentro para que `apply` cierre sobre
  // los refs/setters de este componente sin pasarlos como argumentos.
  const BONUS_TYPES = [
    {
      id: 'vidas', emoji: '❤️',
      label: tr({ es: 'Segunda oportunidad', en: 'Second chance', ca: 'Segona oportunitat' }),
      desc: tr({ es: 'Recupera 3 vidas', en: 'Recover 3 lives', ca: 'Recupera 3 vides' }),
      apply: () => {
        survFailsRef.current = Math.max(0, survFailsRef.current - 3)
        setSurvFails(survFailsRef.current)
      },
    },
    {
      id: 'tempo', emoji: '🐢',
      label: tr({ es: 'Respiro', en: 'Breather', ca: 'Respir' }),
      desc: tr({ es: 'Tempo un 20% más lento durante 15 notas', en: '20% slower tempo for 15 notes', ca: 'Tempo un 20% més lent durant 15 notes' }),
      apply: () => { tempoBoostRef.current = { until: survResueltasRef.current + 15, factor: 0.8 } },
    },
    {
      id: 'ancha', emoji: '🎯',
      label: tr({ es: 'Puntería ancha', en: 'Wide aim', ca: 'Punteria ampla' }),
      desc: tr({ es: 'La nota de arriba o abajo también vale, 12 notas', en: 'The note above or below also counts, 12 notes', ca: 'La nota de dalt o baix també val, 12 notes' }),
      apply: () => { wideRef.current = { until: survResueltasRef.current + 12 } },
    },
    {
      id: 'puntos', emoji: '💎',
      label: tr({ es: 'Botín', en: 'Loot', ca: 'Botí' }),
      desc: tr({ es: '+300 puntos al momento', en: '+300 points instantly', ca: '+300 punts a l\'instant' }),
      apply: () => { survScoreRef.current += 300; setSurvScore(survScoreRef.current) },
    },
  ]

  function generarEvento(notas) {
    const prevPitch = [...notas].reverse().find(n => n.pitch)?.pitch ?? null
    const stage = stageFor(notas.length)
    return siguienteEvento(prevPitch, stage)
  }

  function startSurvivor() {
    ensureAudio()
    survFailsRef.current = 0
    survScoreRef.current = 0
    survStreakRef.current = 0
    survBestStreakRef.current = 0
    survResueltasRef.current = 0
    survFinishedRef.current = false
    survSavedRef.current = false
    survLastClickFloorRef.current = null
    bonusIdxRef.current = 0
    tempoBoostRef.current = null
    wideRef.current = null
    setBonusOpen(false)

    // Compás inicial de silencio (siempre): el jugador ve el playhead cruzar
    // un compás vacío a tempo antes de la primera nota, en vez de un
    // contador tapando la partitura — así "ve" el tempo antes de leer.
    const notas = [{ pitch: null, beats: COUNT_IN_BEATS, cum: 0 }]
    let cum = COUNT_IN_BEATS
    while (cum < COUNT_IN_BEATS + LOOKAHEAD_BEATS) {
      const ev = generarEvento(notas)
      notas.push({ ...ev, cum })
      cum += ev.beats
    }
    survNotasRef.current = notas
    survResRef.current = notas.map(() => null)
    setSurvNotas(notas.slice())
    setSurvRes(survResRef.current.slice())
    setSurvFails(0); setSurvScore(0); setSurvStreak(0); setSurvResueltas(0)
    setSurvFinal(null)

    survBeatRef.current = 0
    survLastFrameRef.current = performance.now()
    setSurvPlayBeat(0)
    setPantalla('survivor')
    cancelAnimationFrame(survRafRef.current)
    survRafRef.current = requestAnimationFrame(survivorTick)
  }

  function checkBonusThreshold() {
    if (bonusIdxRef.current >= BONUS_THRESHOLDS.length) return
    if (survResueltasRef.current < BONUS_THRESHOLDS[bonusIdxRef.current]) return
    bonusIdxRef.current += 1
    offerBonus()
  }

  function offerBonus() {
    cancelAnimationFrame(survRafRef.current)
    bonusPendingRef.current = true
    const opciones = [...BONUS_TYPES].sort(() => Math.random() - 0.5).slice(0, 3)
    setBonusOpciones(opciones)
    setBonusOpen(true)
  }

  function elegirBono(bono) {
    bono.apply()
    bonusPendingRef.current = false
    setBonusOpen(false)
    survLastFrameRef.current = performance.now()
    cancelAnimationFrame(survRafRef.current)
    survRafRef.current = requestAnimationFrame(survivorTick)
  }

  function marcarSurvivor(i, resultado) {
    if (survResRef.current[i] != null) return
    survResRef.current[i] = resultado
    setSurvRes(survResRef.current.slice())
    survResueltasRef.current += 1
    setSurvResueltas(survResueltasRef.current)

    if (resultado === 'perfecto') {
      survStreakRef.current += 1
      if (survStreakRef.current > survBestStreakRef.current) survBestStreakRef.current = survStreakRef.current
    } else {
      survStreakRef.current = 0
    }
    setSurvStreak(survStreakRef.current)

    // Solo "perfecto" (nota y tiempo correctos) libra de perder una vida.
    // Si no, machacar todas las teclas a la vez nunca costaría nada: siempre
    // habría alguna tecla cerca en nota o en tiempo que "resolviera" la nota
    // sin arriesgar la partida.
    if (resultado !== 'perfecto') {
      survFailsRef.current += 1
      setSurvFails(survFailsRef.current)
    }

    // Racha de "perfecto": +50% de puntos cada 5, hasta x2.
    const mult = 1 + Math.min(2, Math.floor(survStreakRef.current / 5)) * 0.5
    survScoreRef.current += Math.round((PTS[resultado] || 0) * mult)
    setSurvScore(survScoreRef.current)

    checkBonusThreshold()
  }

  function survivorTick() {
    const now = performance.now()
    const stage = stageFor(survResueltasRef.current)
    const boost = tempoBoostRef.current && survResueltasRef.current < tempoBoostRef.current.until
      ? tempoBoostRef.current.factor : 1
    const beatMs = 60000 / (stage.tempoBPM * boost)
    // Si la pestaña estuvo en segundo plano, dt puede ser enorme: sin este
    // tope, el playhead saltaría de golpe al volver y caducaría de una vez
    // todas las notas pendientes. 150ms es margen de sobra a 60fps normales.
    const dt = Math.min(now - survLastFrameRef.current, 150)
    survLastFrameRef.current = now
    survBeatRef.current += dt / beatMs
    const beat = survBeatRef.current

    const bi = Math.floor(beat)
    if (bi !== survLastClickFloorRef.current) {
      survLastClickFloorRef.current = bi
      playClick(((bi % 4) + 4) % 4 === 0)
    }
    setSurvPlayBeat(beat)

    // Amplía la partitura por delante del playhead
    const notas = survNotasRef.current
    let last = notas[notas.length - 1]
    while (last.cum + last.beats < beat + LOOKAHEAD_BEATS) {
      const ev = generarEvento(notas)
      const nueva = { ...ev, cum: last.cum + last.beats }
      notas.push(nueva)
      last = nueva
    }
    setSurvNotas(notas.slice())

    // Caduca las notas no resueltas a tiempo (mismo margen de gracia que en el examen)
    notas.forEach((n, i) => {
      if (!n.pitch || survResRef.current[i] != null) return
      const tolB = n.ventanaMs / beatMs
      const graceB = Math.max(tolB, 0.9)
      if (beat > n.cum + graceB) marcarSurvivor(i, 'rojo')
    })

    if (survFailsRef.current >= FAILS_LIMIT) { finishSurvivor(); return }
    // marcarSurvivor puede haber abierto el selector de bonos (vía
    // checkBonusThreshold) en medio de este mismo tick, antes de que el
    // estado `bonusOpen` se haya re-renderizado todavía. Sin este flag,
    // el bucle se reprogramaría igualmente aquí abajo y seguiría generando
    // y caducando notas (restando vidas) con la pantalla de bono ya abierta.
    if (bonusPendingRef.current) return
    survRafRef.current = requestAnimationFrame(survivorTick)
  }

  function finishSurvivor() {
    cancelAnimationFrame(survRafRef.current)
    survFinishedRef.current = true
    const nivel = stageFor(survResueltasRef.current).nivel
    const prevBest = Number(localStorage.getItem(LS_SURVIVOR_BEST) || 0)
    const esRecord = survScoreRef.current > prevBest
    if (esRecord) localStorage.setItem(LS_SURVIVOR_BEST, String(survScoreRef.current))
    setSurvFinal({
      score: survScoreRef.current,
      resueltas: survResueltasRef.current,
      bestStreak: survBestStreakRef.current,
      nivel,
      esRecord,
    })
    setPantalla('survivor-fin')
  }

  function onSurvivorPianoKey(pitch) {
    if (survFinishedRef.current) return
    const beat = survBeatRef.current
    const notas = survNotasRef.current
    const stage = stageFor(survResueltasRef.current)
    const boost = tempoBoostRef.current && survResueltasRef.current < tempoBoostRef.current.until
      ? tempoBoostRef.current.factor : 1
    const beatMs = 60000 / (stage.tempoBPM * boost)
    let best = -1, bestD = Infinity
    notas.forEach((n, i) => {
      if (!n.pitch || survResRef.current[i] != null) return
      const d = Math.abs(beat - n.cum)
      if (d < bestD) { bestD = d; best = i }
    })
    if (best < 0 || bestD > 1) return
    const n = notas[best]
    const enVentana = bestD * beatMs <= n.ventanaMs
    const wideActivo = wideRef.current && survResueltasRef.current < wideRef.current.until
    const notaOk = pitch === n.pitch || (wideActivo && esVecina(pitch, n.pitch))
    if (notaOk && enVentana) marcarSurvivor(best, 'perfecto')
    else if (notaOk) marcarSurvivor(best, 'amarillo')
    else if (enVentana) marcarSurvivor(best, 'naranja')
  }

  useEffect(() => {
    if (pantalla !== 'survivor-fin' || !survFinal || !user || survSavedRef.current) return
    survSavedRef.current = true
    saveActivity(user.uid, {
      type: 'juego', game: 'pentagrama-path', score: survFinal.score, passed: true,
      timeSpent: 0, coinsEarned: computeCoins('pentagrama-path', { score: survFinal.score }),
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }, [pantalla, survFinal, user])

  function onPianoKey(pitch) {
    playNote(pitch, 0.35)
    onSurvivorPianoKey(pitch)
  }

  function salir() {
    cancelAnimationFrame(survRafRef.current)
    setPantalla('intro')
  }

  // ── INTRO ─────────────────────────────────────────────────────────────────
  if (pantalla === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <SEOHead
          title={tr({ es: 'Pentagrama Path — lee partituras a contrarreloj', en: 'Pentagrama Path — sight-read against the clock', ca: 'Pentagrama Path — llegeix partitures contrarellotge' })}
          description={tr({ es: 'Partitura infinita: toca la nota correcta en su momento antes de que la dificultad se dispare. Bonos de vidas, tempo y puntos por el camino. 10 fallos y fuera.', en: 'Endless sheet music: hit the right note on time before the difficulty spikes. Life, tempo and score bonuses along the way. 10 misses and you\'re out.', ca: 'Partitura infinita: toca la nota correcta al seu moment abans que la dificultat es dispari. Bons de vides, tempo i punts pel camí. 10 errades i fora.' })}
          path="/juegos/pentagrama-path" lang={lang} />
        <div className="max-w-md w-full">
          <button onClick={() => navigate(localPath('/juegos'))}
            className="text-white/30 hover:text-white/60 text-sm mb-6 flex items-center gap-1 transition-colors">
            {tr({ es: '← Volver', en: '← Back', ca: '← Tornar' })}
          </button>
          <div className="text-center mb-7">
            <span className="text-7xl block mb-4">🎼</span>
            <h1 className="text-4xl font-black text-white mb-2">Pentagrama Path</h1>
            <p className="text-white/40">
              {tr({ es: 'Partitura infinita — lee y toca antes de que se acabe el tiempo', en: 'Endless score — read and play before time runs out', ca: 'Partitura infinita — llegeix i toca abans que s\'acabi el temps' })}
            </p>
            {survBest > 0 && (
              <p className="text-amber-400 text-sm font-bold mt-2">🏆 {tr({ es: 'Mejor puntuación', en: 'Best score', ca: 'Millor puntuació' })}: {survBest}</p>
            )}
          </div>

          <button onClick={startSurvivor}
            className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/30 mb-5">
            🔥 {tr({ es: '¡Empezar!', en: 'Start!', ca: 'Comença!' })}
          </button>

          <button onClick={() => navigate(localPath('/examen/musica'))}
            className="w-full text-left rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 p-4 mb-5 transition-all">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📚</span>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm">{tr({ es: '¿Prefieres progresar por fases?', en: 'Prefer to progress through phases?', ca: 'Prefereixes progressar per fases?' })}</p>
                <p className="text-white/40 text-xs">{tr({ es: 'Prueba el Examen de Música →', en: 'Try the Music Exam →', ca: 'Prova l\'Examen de Música →' })}</p>
              </div>
            </div>
          </button>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">
              {tr({ es: 'Colores del resultado', en: 'Result colours', ca: 'Colors del resultat' })}
            </p>
            <div className="space-y-2 text-sm">
              {['perfecto', 'amarillo', 'naranja', 'rojo'].map(k => (
                <div key={k} className="flex items-center gap-3 text-white/60">
                  <span className={`w-3.5 h-3.5 rounded-full shrink-0 ${RESULT_UI[k].color}`} />
                  <span>{tr(RESULT_UI[k].label)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">
              {tr({ es: 'Cómo se juega', en: 'How to play', ca: 'Com es juga' })}
            </p>
            <div className="space-y-2 text-sm text-white/50">
              {[
                ['🎹', tr({ es: 'Toca con el ratón o con el teclado: A-K (blancas), W E T Y U (negras)', en: 'Play with the mouse or keyboard: A-K (white keys), W E T Y U (black keys)', ca: 'Toca amb el ratolí o amb el teclat: A-K (blanques), W E T Y U (negres)' })],
                ['⏱️', tr({ es: 'El playhead avanza solo — toca cada nota en su momento', en: 'The playhead moves on its own — hit each note on time', ca: 'El playhead avança sol — toca cada nota al seu moment' })],
                ['💔', tr({ es: `Solo "perfecto" no cuesta vida: ${FAILS_LIMIT} fallos y se acaba`, en: `Only "perfect" costs no life: ${FAILS_LIMIT} misses and it's over`, ca: `Només "perfecte" no costa vida: ${FAILS_LIMIT} errades i s'acaba` })],
                ['📈', tr({ es: 'El tempo y la dificultad suben solos cuanto más aguantas', en: 'Tempo and difficulty rise on their own the longer you survive', ca: 'El tempo i la dificultat pugen sols com més aguantes' })],
                ['🎁', tr({ es: 'Cada cierto tiempo eliges un bono (vidas, tempo, puntería, puntos) — cada vez cuesta más conseguirlo', en: 'Every so often you pick a bonus (lives, tempo, aim, points) — each one takes longer to earn', ca: 'Cada cert temps tries un bo (vides, tempo, punteria, punts) — cada vegada costa més aconseguir-lo' })],
              ].map(([e, t]) => (
                <div key={t} className="flex items-start gap-3">
                  <span className="text-base w-5 shrink-0 text-center">{e}</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── SURVIVOR: FIN DE PARTIDA ─────────────────────────────────────────────
  if (pantalla === 'survivor-fin' && survFinal) {
    return (
      <GameEndScreen
        game="pentagrama-path"
        emoji="🔥"
        title={tr({ es: `${FAILS_LIMIT} fallos — fin de la partida`, en: `${FAILS_LIMIT} misses — run over`, ca: `${FAILS_LIMIT} errades — fi de la partida` })}
        score={survFinal.score}
        message={survFinal.esRecord
          ? tr({ es: '¡Nueva mejor puntuación! 🏆', en: 'New high score! 🏆', ca: 'Nova millor puntuació! 🏆' })
          : null}
        stats={[
          { label: tr({ es: 'Notas superadas', en: 'Notes cleared', ca: 'Notes superades' }), value: survFinal.resueltas, emoji: '🎵' },
          { label: tr({ es: 'Mejor racha', en: 'Best streak', ca: 'Millor ratxa' }), value: survFinal.bestStreak, emoji: '🔥' },
          { label: tr({ es: 'Nivel alcanzado', en: 'Level reached', ca: 'Nivell assolit' }), value: survFinal.nivel, emoji: '⭐' },
        ]}
        shareText={tr({
          es: `He conseguido ${survFinal.score} puntos en Pentagrama Path 🔥 (nivel ${survFinal.nivel}) — ¿puedes superarme? https://tuthor.es/juegos/pentagrama-path`,
          en: `I scored ${survFinal.score} points in Pentagrama Path 🔥 (level ${survFinal.nivel}) — can you beat me? https://tuthor.es/juegos/pentagrama-path`,
          ca: `He aconseguit ${survFinal.score} punts a Pentagrama Path 🔥 (nivell ${survFinal.nivel}) — pots superar-me? https://tuthor.es/juegos/pentagrama-path`,
        })}
        onPlayAgain={startSurvivor}
        playAgainLabel={tr({ es: '▶ Otra vez', en: '▶ Play again', ca: '▶ Una altra vegada' })}
        secondaryActions={[{ label: tr({ es: '← Menú', en: '← Menu', ca: '← Menú' }), onClick: salir }]}
        user={user} lang={lang}
      />
    )
  }

  // ── SURVIVOR: JUGANDO ────────────────────────────────────────────────────
  if (pantalla === 'survivor') {
    const stage = stageFor(survResueltas)
    const beatActual = survPlayBeat != null ? Math.floor(survPlayBeat) : -1
    // Las notas se generan con antelación (buffer por delante del playhead) con
    // la dificultad de esa etapa futura, así que puede haber un sostenido ya
    // generado antes de que `stage` (basado en notas resueltas) lo refleje.
    // Hay que mirar las notas reales, no la etapa, para no dejar un sostenido
    // en la partitura sin su tecla negra correspondiente en el piano.
    const survConNegras = survNotas.some(n => n.pitch?.includes('#'))
    const vidas = FAILS_LIMIT - survFails

    if (bonusOpen) {
      return (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
          <div className="max-w-md w-full text-center">
            <span className="text-6xl block mb-3">🎁</span>
            <h2 className="text-2xl font-black text-white mb-1">
              {tr({ es: '¡Mejora desbloqueada!', en: 'Upgrade unlocked!', ca: 'Millora desbloquejada!' })}
            </h2>
            <p className="text-white/40 text-sm mb-6">
              {tr({ es: 'Elige un bono para seguir', en: 'Pick a bonus to continue', ca: 'Tria un bo per continuar' })}
            </p>
            <div className="space-y-3">
              {bonusOpciones.map(b => (
                <button key={b.id} onClick={() => elegirBono(b)}
                  className="w-full text-left rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#EDAE49]/40 p-4 transition-all hover:scale-[1.01] active:scale-[0.99]">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{b.emoji}</span>
                    <div>
                      <p className="text-white font-black">{b.label}</p>
                      <p className="text-white/40 text-xs mt-0.5">{b.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-3 py-3 max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between mb-3">
          <button onClick={salir} className="text-white/40 hover:text-white/70 text-sm transition-colors">
            {tr({ es: '← Salir', en: '← Exit', ca: '← Sortir' })}
          </button>
          <div className="text-sm text-white/50 flex items-center gap-3">
            <span className="text-white font-bold">🔥 {tr({ es: 'Survivor', en: 'Survivor', ca: 'Survivor' })}</span>
            <span className="tabular-nums text-white/40">
              {tr({ es: 'Nv.', en: 'Lv.', ca: 'Nv.' })}{stage.nivel} · ♩={stage.tempoBPM}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-0.5">
            {Array.from({ length: FAILS_LIMIT }).map((_, i) => (
              <span key={i} className={`text-sm ${i < vidas ? 'text-red-400' : 'text-white/10'}`}>❤</span>
            ))}
          </div>
          <div className="flex items-center gap-3 text-sm">
            {survStreak >= 3 && <span className="text-amber-400 font-bold">🔥 x{survStreak}</span>}
            <span className="text-white font-black tabular-nums">{survScore}</span>
          </div>
        </div>

        <div className="flex justify-center gap-2 mb-2 h-3">
          {[0, 1, 2, 3].map(i => (
            <span key={i} className={`w-3 h-3 rounded-full transition-all duration-100 ${
              beatActual >= 0 && ((beatActual % 4) + 4) % 4 === i
                ? 'bg-[#EDAE49] scale-125' : 'bg-white/15'
            }`} />
          ))}
        </div>

        <div className="relative bg-white/5 border border-white/10 rounded-2xl px-2 py-3 mb-3">
          <PentagramaSVG
            clave="sol"
            notas={survNotas}
            resultados={survRes}
            playheadBeat={survPlayBeat}
          />
        </div>

        <div className="mt-auto">
          <PianoVirtual octavaBase={4} onKey={onPianoKey} conNegras={survConNegras} />
          <p className="text-center text-white/25 text-xs mt-2 hidden sm:block">
            {tr({ es: 'Teclado: A S D F G H J K', en: 'Keyboard: A S D F G H J K', ca: 'Teclat: A S D F G H J K' })}
            {survConNegras && ' · W E T Y U'}
          </p>
        </div>
      </div>
    )
  }

  return null
}
