// ── Pentagrama Path ──────────────────────────────────────────────────────────
// Juego de lectura de partituras: lee el pentagrama y toca la melodía en un
// piano virtual de una octava. Dos modos según la fase:
//   Modo A (fases 1-2): sin presión de tiempo — el cursor espera cada nota.
//   Modo B (fases 3-4): playhead a tempo real (requestAnimationFrame) con
//     ventana de tolerancia por nota. Se evalúan DOS ejes por nota:
//     ¿tecla correcta? y ¿dentro de la ventana? → 4 resultados:
//       perfecto (verde) · nota bien, tiempo mal (amarillo) ·
//       tiempo bien, nota mal (naranja) · fallo (rojo)

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
import { FASES, melodiasDeFase, totalBeats, COUNT_IN_BEATS } from '../data/pentagramaMelodies'

const LS_PROGRESO = 'pentagrama-path-fase'

// Puntos por nota según resultado
const PTS = { verde: 100, perfecto: 100, amarillo: 60, naranja: 30, rojo: 0 }

const RESULT_UI = {
  perfecto: { color: 'bg-green-400',  label: { es: 'Perfecto', en: 'Perfect', ca: 'Perfecte' } },
  verde:    { color: 'bg-green-400',  label: { es: 'Correcta', en: 'Correct', ca: 'Correcta' } },
  amarillo: { color: 'bg-yellow-400', label: { es: 'Nota bien, tiempo mal', en: 'Right note, wrong time', ca: 'Nota bé, temps malament' } },
  naranja:  { color: 'bg-orange-400', label: { es: 'Tiempo bien, nota mal', en: 'Right time, wrong note', ca: 'Temps bé, nota malament' } },
  rojo:     { color: 'bg-red-400',    label: { es: 'Fallo', en: 'Miss', ca: 'Errada' } },
}

export default function PentagramaPath() {
  const navigate = useNavigate()
  const { lang, tr, localPath } = useLang()
  const { user } = useAuth()

  const [pantalla, setPantalla] = useState('intro') // intro | jugando | fin
  const [faseId, setFaseId] = useState(1)
  const [melIdx, setMelIdx] = useState(0)
  const [notaRes, setNotaRes] = useState([])
  const [cursor, setCursor] = useState(0)
  const [playBeat, setPlayBeat] = useState(null)
  const [hintPitch, setHintPitch] = useState(null)
  const [entreMelodias, setEntreMelodias] = useState(false)
  const [final, setFinal] = useState(null)
  const [progreso, setProgreso] = useState(() => Number(localStorage.getItem(LS_PROGRESO) || 0))

  const resRef = useRef([])
  const histRef = useRef([])
  const cursorRef = useRef(0)
  const startRef = useRef(0)
  const rafRef = useRef(null)
  const lastClickRef = useRef(-1)
  const finishedRef = useRef(false)
  const savedRef = useRef(false)

  const fase = FASES[faseId]
  const melodias = melodiasDeFase(faseId)
  const melodia = melodias[melIdx]
  const conNegras = melodias.some(m => m.notas.some(n => n.pitch?.includes('#')))

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  function marcar(i, status) {
    resRef.current[i] = status
    setNotaRes(resRef.current.slice())
  }

  function startFase(id) {
    ensureAudio()
    histRef.current = []
    savedRef.current = false
    setFinal(null)
    setFaseId(id)
    setPantalla('jugando')
    startMelodia(id, 0)
  }

  function startMelodia(fId, idx) {
    const mel = melodiasDeFase(fId)[idx]
    setMelIdx(idx)
    setEntreMelodias(false)
    resRef.current = mel.notas.map(() => null)
    setNotaRes(resRef.current.slice())
    finishedRef.current = false
    cursorRef.current = 0
    setCursor(0)
    setHintPitch(null)
    cancelAnimationFrame(rafRef.current)
    if (FASES[fId].modo === 'B') {
      startRef.current = performance.now()
      lastClickRef.current = -1
      setPlayBeat(-COUNT_IN_BEATS)
      rafRef.current = requestAnimationFrame(() => tick(fId, idx))
    } else {
      setPlayBeat(null)
    }
  }

  // ── Motor modo B: playhead + metrónomo + notas caducadas ──────────────────
  function tick(fId, idx) {
    const f = FASES[fId]
    const mel = melodiasDeFase(fId)[idx]
    const beatMs = 60000 / mel.tempoBPM
    const totalB = totalBeats(mel)
    const elapsed = (performance.now() - startRef.current) / beatMs // pulsos desde el inicio del count-in
    const beat = elapsed - COUNT_IN_BEATS

    const bi = Math.floor(elapsed)
    if (bi !== lastClickRef.current && bi < COUNT_IN_BEATS + Math.ceil(totalB)) {
      lastClickRef.current = bi
      playClick(((bi - COUNT_IN_BEATS) % 4 + 4) % 4 === 0)
    }
    setPlayBeat(beat)

    // La nota no caduca al cerrarse la ventana de tolerancia: hay un periodo de
    // gracia (~1 pulso) en el que una pulsación correcta tardía aún cuenta como
    // amarillo ("nota bien, tiempo mal"). Sin él, el amarillo tardío sería imposible.
    const tolB = f.ventanaMs / beatMs
    const caducaB = Math.max(tolB, 0.9)
    mel.notas.forEach((n, i) => {
      if (n.pitch && resRef.current[i] == null && beat > n.cum + caducaB) marcar(i, 'rojo')
    })

    if (beat > totalB + 0.6) { finishMelodia(fId, idx); return }
    rafRef.current = requestAnimationFrame(() => tick(fId, idx))
  }

  function finishMelodia(fId, idx) {
    cancelAnimationFrame(rafRef.current)
    finishedRef.current = true
    const mels = melodiasDeFase(fId)
    histRef.current = [...histRef.current, { mel: mels[idx], res: resRef.current.slice() }]
    if (idx + 1 < mels.length) {
      setEntreMelodias(true)
      setTimeout(() => startMelodia(fId, idx + 1), 1400)
    } else {
      terminarFase(fId)
    }
  }

  function terminarFase(fId) {
    const f = FASES[fId]
    const flat = histRef.current.flatMap(h => h.res.filter((_, i) => h.mel.notas[i].pitch))
    const total = flat.length
    const notasOk = flat.filter(r => r === 'verde' || r === 'perfecto' || r === 'amarillo').length
    const tiempoOk = flat.filter(r => r === 'perfecto' || r === 'naranja').length
    const score = flat.reduce((s, r) => s + (PTS[r] || 0), 0)
    const notaPct = total ? Math.round((notasOk / total) * 100) : 0
    const tiempoPct = total ? Math.round((tiempoOk / total) * 100) : 0
    const superada = notaPct >= 70 && (f.modo === 'A' || tiempoPct >= 50)
    if (superada && fId > progreso) {
      setProgreso(fId)
      localStorage.setItem(LS_PROGRESO, String(fId))
    }
    setFinal({ score, notaPct, tiempoPct, superada, modo: f.modo, detalle: histRef.current })
    setPantalla('fin')
  }

  // Guardar la partida al llegar a la pantalla final
  useEffect(() => {
    if (pantalla !== 'fin' || !final || !user || savedRef.current) return
    savedRef.current = true
    saveActivity(user.uid, {
      type: 'juego', game: 'pentagrama-path', score: final.score, passed: final.superada,
      timeSpent: 0, coinsEarned: computeCoins('pentagrama-path', { score: final.score }),
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }, [pantalla, final, user])

  // ── Entrada del piano (ratón o teclado físico) ────────────────────────────
  function onPianoKey(pitch) {
    playNote(pitch, 0.35)
    if (pantalla !== 'jugando' || finishedRef.current || entreMelodias) return
    const mel = melodia
    if (!mel) return

    if (fase.modo === 'A') {
      const i = cursorRef.current
      if (i >= mel.notas.length) return
      const n = mel.notas[i]
      const ok = pitch === n.pitch
      marcar(i, ok ? 'verde' : 'rojo')
      if (!ok) {
        setHintPitch(n.pitch)
        setTimeout(() => playNote(n.pitch, 0.45), 280)
        setTimeout(() => setHintPitch(null), 1000)
      }
      const next = i + 1
      if (next >= mel.notas.length) {
        finishedRef.current = true
        setTimeout(() => finishMelodia(faseId, melIdx), 700)
      } else {
        cursorRef.current = next
        setCursor(next)
      }
      return
    }

    // Modo B: atribuir la pulsación a la nota pendiente más cercana en el tiempo
    const beatMs = 60000 / mel.tempoBPM
    const beat = (performance.now() - startRef.current) / beatMs - COUNT_IN_BEATS
    let best = -1, bestD = Infinity
    mel.notas.forEach((n, i) => {
      if (!n.pitch || resRef.current[i] != null) return
      const d = Math.abs(beat - n.cum)
      if (d < bestD) { bestD = d; best = i }
    })
    if (best < 0 || bestD > 1) return // pulsación suelta, lejos de toda nota
    const enVentana = bestD * beatMs <= fase.ventanaMs
    const notaOk = pitch === mel.notas[best].pitch
    if (notaOk && enVentana) marcar(best, 'perfecto')
    else if (notaOk) marcar(best, 'amarillo')
    else if (enVentana) marcar(best, 'naranja')
    // nota incorrecta fuera de ventana: se ignora — la nota caducará en rojo
  }

  function salir() {
    cancelAnimationFrame(rafRef.current)
    setPantalla('intro')
  }

  // ── INTRO ─────────────────────────────────────────────────────────────────
  if (pantalla === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <SEOHead
          title={tr({ es: 'Pentagrama Path — aprende a leer partituras jugando', en: 'Pentagrama Path — learn to read sheet music by playing', ca: 'Pentagrama Path — aprèn a llegir partitures jugant' })}
          description={tr({ es: 'Lee el pentagrama y toca la melodía en un piano virtual. Cuatro fases: de reconocer notas sin prisa a tocar a tempo real con clave de fa y alteraciones.', en: 'Read the staff and play the melody on a virtual piano. Four phases: from note recognition at your own pace to real-tempo playing with bass clef and sharps.', ca: 'Llegeix el pentagrama i toca la melodia en un piano virtual. Quatre fases: de reconèixer notes sense pressa a tocar a tempo real amb clau de fa i alteracions.' })}
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
              {tr({ es: 'Lee la partitura y tócala en el piano', en: 'Read the score and play it on the piano', ca: 'Llegeix la partitura i toca-la al piano' })}
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {Object.entries(FASES).map(([id, f]) => {
              const fId = Number(id)
              const bloqueada = fId > progreso + 1
              const completada = fId <= progreso
              return (
                <button key={id} disabled={bloqueada}
                  onClick={() => startFase(fId)}
                  className={`w-full text-left rounded-2xl border p-4 transition-all ${
                    bloqueada ? 'bg-white/[0.02] border-white/5 opacity-50 cursor-not-allowed'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:scale-[1.01] active:scale-[0.99]'
                  }`}>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{bloqueada ? '🔒' : f.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-black">{tr(f.label)} {completada && <span className="text-green-400">✓</span>}</p>
                      <p className="text-white/40 text-xs mt-0.5">{tr(f.desc)}</p>
                    </div>
                    {!bloqueada && <span className="text-white/30">▶</span>}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">
              {tr({ es: 'Colores del resultado (fases a tempo)', en: 'Result colours (tempo phases)', ca: 'Colors del resultat (fases a tempo)' })}
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
                ['👀', tr({ es: 'Fases 1-2: el cursor espera a que aciertes cada nota', en: 'Phases 1-2: the cursor waits until you hit each note', ca: 'Fases 1-2: el cursor espera que encertis cada nota' })],
                ['⏱️', tr({ es: 'Fases 3-4: el playhead avanza solo — toca cada nota en su momento', en: 'Phases 3-4: the playhead moves on its own — hit each note on time', ca: 'Fases 3-4: el playhead avança sol — toca cada nota al seu moment' })],
                ['🥁', tr({ es: 'Antes de cada melodía a tempo oirás 4 pulsos de metrónomo', en: 'Before each tempo melody you\'ll hear 4 metronome beats', ca: 'Abans de cada melodia a tempo sentiràs 4 polsos de metrònom' })],
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

  // ── FIN DE FASE ───────────────────────────────────────────────────────────
  if (pantalla === 'fin' && final) {
    const stats = [
      { label: tr({ es: 'Notas correctas', en: 'Correct notes', ca: 'Notes correctes' }), value: `${final.notaPct}%`, emoji: '🎵' },
    ]
    if (final.modo === 'B') {
      stats.push({ label: tr({ es: 'En tiempo', en: 'On time', ca: 'A temps' }), value: `${final.tiempoPct}%`, emoji: '⏱️' })
    }
    const siguiente = final.superada && faseId < 4
    return (
      <GameEndScreen
        game="pentagrama-path"
        emoji="🎼"
        title={`${tr(fase.label)} · ${final.superada
          ? tr({ es: 'Superada', en: 'Cleared', ca: 'Superada' })
          : tr({ es: 'No superada', en: 'Not cleared', ca: 'No superada' })}`}
        score={final.score}
        message={final.superada
          ? (siguiente ? tr({ es: '¡Fase desbloqueada! Ya puedes pasar a la siguiente', en: 'Phase unlocked! You can move on to the next one', ca: 'Fase desbloquejada! Ja pots passar a la següent' })
            : tr({ es: '¡Has completado todas las fases! 🏆', en: 'You\'ve completed every phase! 🏆', ca: 'Has completat totes les fases! 🏆' }))
          : tr({ es: 'Necesitas un 70% de notas correctas para superar la fase', en: 'You need 70% correct notes to clear the phase', ca: 'Necessites un 70% de notes correctes per superar la fase' })}
        stats={stats}
        shareText={tr({
          es: `He conseguido ${final.score} puntos leyendo partituras en Pentagrama Path 🎼 (${final.notaPct}% de notas correctas) — ¿puedes superarme? https://tuthor.es/juegos/pentagrama-path`,
          en: `I scored ${final.score} points reading sheet music in Pentagrama Path 🎼 (${final.notaPct}% correct notes) — can you beat me? https://tuthor.es/juegos/pentagrama-path`,
          ca: `He aconseguit ${final.score} punts llegint partitures a Pentagrama Path 🎼 (${final.notaPct}% de notes correctes) — pots superar-me? https://tuthor.es/juegos/pentagrama-path`,
        })}
        onPlayAgain={() => (siguiente ? startFase(faseId + 1) : startFase(faseId))}
        playAgainLabel={siguiente
          ? tr({ es: '▶ Siguiente fase', en: '▶ Next phase', ca: '▶ Fase següent' })
          : tr({ es: '▶ Repetir fase', en: '▶ Retry phase', ca: '▶ Repetir fase' })}
        secondaryActions={[
          ...(siguiente ? [{ label: tr({ es: 'Repetir esta fase', en: 'Retry this phase', ca: 'Repetir aquesta fase' }), onClick: () => startFase(faseId) }] : []),
          { label: tr({ es: 'Elegir fase', en: 'Choose phase', ca: 'Triar fase' }), onClick: salir },
        ]}
        user={user} lang={lang}
      >
        {/* Desglose por melodía: un punto de color por nota */}
        <div className="mt-5 text-left space-y-3">
          {final.detalle.map((h, mi) => (
            <div key={mi} className="bg-white/5 border border-white/10 rounded-xl p-3">
              <p className="text-white/40 text-xs font-semibold mb-2">🎵 {tr(h.mel.titulo)}</p>
              <div className="flex gap-1.5 flex-wrap">
                {h.res.map((r, i) => (
                  h.mel.notas[i].pitch
                    ? <span key={i} title={r ? tr(RESULT_UI[r].label) : ''}
                        className={`w-3.5 h-3.5 rounded-full ${r ? RESULT_UI[r].color : 'bg-white/15'}`} />
                    : null
                ))}
              </div>
            </div>
          ))}
        </div>
      </GameEndScreen>
    )
  }

  // ── JUGANDO ───────────────────────────────────────────────────────────────
  if (!melodia) return null
  const enCountIn = fase.modo === 'B' && playBeat != null && playBeat < 0
  const beatActual = fase.modo === 'B' && playBeat != null ? Math.floor(playBeat + COUNT_IN_BEATS) : -1

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-3 py-3 max-w-2xl mx-auto w-full">
      <div className="flex items-center justify-between mb-3">
        <button onClick={salir} className="text-white/40 hover:text-white/70 text-sm transition-colors">
          {tr({ es: '← Salir', en: '← Exit', ca: '← Sortir' })}
        </button>
        <div className="text-sm text-white/50 flex items-center gap-3">
          <span className="text-white font-bold">{fase.emoji} {tr(fase.label)}</span>
          <span className="tabular-nums">🎵 {melIdx + 1}/{melodias.length}</span>
          {fase.modo === 'B' && <span className="tabular-nums text-white/40">♩ = {melodia.tempoBPM}</span>}
        </div>
      </div>

      <p className="text-center text-white/60 font-bold mb-1">{tr(melodia.titulo)}</p>

      {/* Metrónomo visual (modo B): 4 puntos que pulsan con el beat */}
      {fase.modo === 'B' && (
        <div className="flex justify-center gap-2 mb-2 h-3">
          {[0, 1, 2, 3].map(i => (
            <span key={i} className={`w-3 h-3 rounded-full transition-all duration-100 ${
              beatActual >= 0 && ((beatActual % 4) + 4) % 4 === i
                ? 'bg-[#EDAE49] scale-125' : 'bg-white/15'
            }`} />
          ))}
        </div>
      )}

      <div className="relative bg-white/5 border border-white/10 rounded-2xl px-2 py-3 mb-3">
        <PentagramaSVG
          clave={fase.clave}
          notas={melodia.notas}
          resultados={notaRes}
          cursorIdx={fase.modo === 'A' ? cursor : null}
          playheadBeat={fase.modo === 'B' ? playBeat : null}
        />
        {enCountIn && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl">
            <div className="text-center">
              <p className="text-6xl font-black text-[#EDAE49] tabular-nums animate-pulse">{Math.ceil(-playBeat)}</p>
              <p className="text-white/50 text-xs mt-1 uppercase tracking-widest">
                {tr({ es: 'Escucha el pulso…', en: 'Feel the beat…', ca: 'Escolta el pols…' })}
              </p>
            </div>
          </div>
        )}
        {entreMelodias && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
            <p className="text-xl font-black text-green-400">
              ✅ {tr({ es: 'Melodía completada', en: 'Melody complete', ca: 'Melodia completada' })}
            </p>
          </div>
        )}
      </div>

      {/* Leyenda compacta en modo B */}
      {fase.modo === 'B' && (
        <div className="flex justify-center gap-3 mb-3 text-[10px] text-white/40">
          {['perfecto', 'amarillo', 'naranja', 'rojo'].map(k => (
            <span key={k} className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${RESULT_UI[k].color}`} />
              {tr(RESULT_UI[k].label)}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto">
        <PianoVirtual
          octavaBase={fase.octavaBase}
          onKey={onPianoKey}
          hintPitch={hintPitch}
          conNegras={conNegras}
          disabled={entreMelodias}
        />
        <p className="text-center text-white/25 text-xs mt-2 hidden sm:block">
          {tr({ es: 'Teclado: A S D F G H J K', en: 'Keyboard: A S D F G H J K', ca: 'Teclat: A S D F G H J K' })}
          {conNegras && ' · W E T Y U'}
        </p>
      </div>
    </div>
  )
}
