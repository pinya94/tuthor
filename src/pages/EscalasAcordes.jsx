import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/escalasAcordes'
import PreguntaEscalas from '../components/escalasAcordes/PreguntaEscalas'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Cada ronda se construye (teclado, cajas): 120 s y +8 s por acierto.
const GAME_TIME = 120
const WRONG_TIME = 5
const CORRECT_TIME = 8
const REVEAL_MS = 4500 // da tiempo a oír la respuesta

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Terceras, quintas y octavas desde notas naturales, y acordes mayores', en: 'Thirds, fifths and octaves from natural notes, and major chords', ca: 'Terceres, quintes i octaves des de notes naturals, i acords majors' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Todos los intervalos hasta la 6ª, escalas mayores y acordes mayores y menores', en: 'Every interval up to the 6th, major scales and major and minor chords', ca: 'Tots els intervals fins a la 6a, escales majors i acords majors i menors' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Séptimas y tritono, escalas con hasta 4 alteraciones y menores, acordes disminuidos y aumentados; sin nombres en el teclado', en: 'Sevenths and the tritone, scales with up to 4 sharps or flats, minor scales, diminished and augmented chords; no names on the keys', ca: 'Setenes i trítons, escales amb fins a 4 alteracions i menors, acords disminuïts i augmentats; sense noms al teclat' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[escalas-acordes] los niveles de la pantalla no coinciden con NIVELES')
}

export default function EscalasAcordes() {
  const { lang, localPath, tr } = useLang()
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const backPath = location.state?.backPath

  const [screen, setScreen] = useState('intro')
  const [nivel, setNivel] = useState('facil')
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [aciertos, setAciertos] = useState(0)
  const [streak, setStreak] = useState(0)
  const [ronda, setRonda] = useState(null)
  const [elegida, setElegida] = useState(null)
  const [phase, setPhase] = useState('choose')

  const timerRef = useRef(null)
  const nextRef = useRef(null)
  const aciertosRef = useRef(0)
  useEffect(() => { aciertosRef.current = aciertos }, [aciertos])

  const next = useCallback(niv => {
    setRonda(genRonda(niv))
    setElegida(null)
    setPhase('choose')
  }, [])

  const startGame = useCallback((niv = 'facil') => {
    setNivel(niv); setScreen('playing')
    setAciertos(0); setStreak(0)
    setTimeLeft(GAME_TIME)
    next(niv)
  }, [next])

  function finish() {
    clearTimeout(nextRef.current)
    setScreen('end')
    const pts = aciertosRef.current * 10
    if (user) {
      saveActivity(user.uid, {
        type: 'juego', game: 'escalas-acordes', category: 'armonia',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('escalas-acordes', { score: pts }),
        userName: user.displayName, userPhoto: user.photoURL,
      }).catch(() => {})
    }
  }

  useEffect(() => {
    if (screen !== 'playing' || phase === 'result') return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); finish(); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [screen, phase]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => clearTimeout(nextRef.current), [])

  function responder(r) {
    if (phase !== 'choose') return
    setElegida(r); setPhase('result')
    if (esCorrecta(ronda, r)) {
      setAciertos(a => a + 1)
      setStreak(s => s + 1)
      setTimeLeft(t => t + CORRECT_TIME)
    } else {
      setStreak(0)
      setTimeLeft(t => Math.max(0, t - WRONG_TIME))
    }
    nextRef.current = setTimeout(() => next(nivel), REVEAL_MS)
  }

  const seo = {
    title: tr({ es: 'Escalas y Acordes — Juego de intervalos, escalas y acordes en el piano', en: 'Scales and Chords — Intervals, scales and chords on the piano', ca: 'Escales i Acords — Joc d’intervals, escales i acords al piano' }),
    desc: tr({
      es: 'Juego de teoría musical para ESO: toca en el piano la nota a una tercera mayor, marca la escala de Re mayor con sus sostenidos, monta acordes mayores, menores, disminuidos y aumentados y clasifica intervalos. Suena al tocar. Gratis.',
      en: 'Music theory game: play the note a major third above on the piano, mark the D major scale with its sharps, build major, minor, diminished and augmented chords and classify intervals. It plays as you tap. Free.',
      ca: 'Joc de teoria musical per a ESO: toca al piano la nota a una tercera major, marca l’escala de Re major amb els seus sostinguts, munta acords majors, menors, disminuïts i augmentats i classifica intervals. Sona en tocar. Gratis.',
    }),
    path: '/juegos/escalas-acordes',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="escalas-acordes"
            badge={tr({ es: 'Música · Teoría', en: 'Music · Theory', ca: 'Música · Teoria' })}
            titulo={tr({ es: '🎹 Escalas y Acordes', en: '🎹 Scales and Chords', ca: '🎹 Escales i Acords' })}
            sub={tr({ es: 'Construye la música tecla a tecla', en: 'Build music key by key', ca: 'Construeix la música tecla a tecla' })} />

          <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{tr({ es: 'Elige nivel', en: 'Choose a level', ca: 'Tria nivell' })}</p>
          <div className="flex flex-wrap justify-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl mb-2">
            {Object.entries(DIFS).map(([id, d], i) => (
              <button key={id} onClick={() => setNivel(id)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${nivel === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}>
                <NivelBarras clave={id} i={i} />{tr(d.label)}
              </button>
            ))}
          </div>
          <p className="text-white/40 text-xs text-center mb-5">{tr(DIFS[nivel].desc)}</p>

          <button onClick={() => startGame(nivel)}
            className="w-full py-3.5 rounded-2xl bg-[#EDAE49] text-black font-black text-lg hover:bg-amber-400 transition-colors">
            {tr({ es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' })}
          </button>
          <ComoSeJuega>
            <div className="space-y-2 text-white/70 text-sm">
              <p>{tr({ es: 'Intervalo: toca en el teclado la nota que está a esa distancia. Cuenta las notas incluyendo las dos (de Do a Mi hay una 3ª) y luego los semitonos: la 3ª mayor tiene 4 y la menor, 3.', en: 'Interval: play the note that distance away. Count the letter names including both (C to E is a 3rd), then the semitones: a major 3rd has 4 and a minor 3rd has 3.', ca: 'Interval: toca al teclat la nota que és a aquesta distància. Compta les notes incloent-hi les dues (de Do a Mi hi ha una 3a) i després els semitons: la 3a major en té 4 i la menor, 3.' })}</p>
              <p>{tr({ es: 'Escala: la tónica y su octava ya están marcadas; marca las seis notas de en medio. La mayor sigue el patrón tono, tono, semitono, tono, tono, tono, semitono. Acorde: marca la tercera y la quinta sobre la nota dada.', en: 'Scale: the tonic and its octave are already marked; mark the six notes in between. A major scale follows tone, tone, semitone, tone, tone, tone, semitone. Chord: mark the third and fifth above the given note.', ca: 'Escala: la tònica i la seva octava ja estan marcades; marca les sis notes del mig. La major segueix el patró to, to, semitò, to, to, to, semitò. Acord: marca la tercera i la quinta sobre la nota donada.' })}</p>
              <p>{tr({ es: 'Cajas: cada intervalo escrito (Do – Mi) a su nombre. Al tocarlo suena, para que el oído también aprenda. En difícil el teclado no tiene nombres.', en: 'Boxes: each written interval (C – E) to its name. It plays when you tap it, so your ear learns too. On hard the keys have no names.', ca: 'Caixes: cada interval escrit (Do – Mi) al seu nom. Quan el toques sona, perquè l’orella també aprengui. En difícil el teclat no té noms.' })}</p>
              <p className="text-white/40 text-xs pt-1">⏱️ {GAME_TIME}s · {tr({ es: `Acierto +10 y +${CORRECT_TIME}s · Fallo −${WRONG_TIME}s`, en: `Correct +10 and +${CORRECT_TIME}s · Wrong −${WRONG_TIME}s`, ca: `Encert +10 i +${CORRECT_TIME}s · Error −${WRONG_TIME}s` })}</p>
            </div>
          </ComoSeJuega>
        </div>
      </div>
    )
  }

  if (screen === 'end') {
    const pts = aciertos * 10
    const msg = tr({
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Buen oído!' : '¡Armonía perfecta!',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Good ear!' : 'Perfect harmony!',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Bona orella!' : 'Harmonia perfecta!',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} retos de escalas y acordes en Tuthor 🎹 — ¿puedes superarme? https://tuthor.es/juegos/escalas-acordes`,
      en: `I got ${aciertos} scales and chords right on Tuthor 🎹 — can you beat me? https://tuthor.es/en/juegos/escalas-acordes`,
      ca: `He encertat ${aciertos} reptes d’escales i acords a Tuthor 🎹 — em pots superar? https://tuthor.es/ca/juegos/escalas-acordes`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="escalas-acordes" emoji="🎹" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
        stats={[{ label: tr({ es: 'aciertos', en: 'correct', ca: 'encerts' }), value: aciertos, emoji: '✅' }]}
        shareText={shareText} user={user} lang={l}
        onPlayAgain={() => startGame(nivel)} secondaryActions={secondary} />
    )
  }

  if (!ronda) return null
  const timerColor = timeLeft > GAME_TIME * 0.66 ? '#22c55e' : timeLeft > GAME_TIME * 0.28 ? '#f59e0b' : '#ef4444'
  const timerPct = Math.min(1, timeLeft / GAME_TIME)
  const isResult = phase === 'result'
  const acierto = isResult && esCorrecta(ronda, elegida)

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-3 sm:px-4 py-4">
      {head}
      <div className="w-full max-w-[480px] flex items-center justify-between mb-3 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">{DIFS[nivel].emoji} {tr(DIFS[nivel].label)}</p>
          <p className="text-white font-bold text-lg flex items-center gap-2">
            {aciertos * 10} {tr({ es: 'puntos', en: 'points', ca: 'punts' })}
            {streak >= 2 && <span className="flex items-center gap-0.5 text-orange-400 text-sm font-black"><Racha className="w-4 h-4" />{streak}</span>}
          </p>
        </div>
        <div className="relative w-14 h-14">
          <svg className="absolute inset-0" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="24" fill="none" stroke="#ffffff15" strokeWidth="4" />
            <circle cx="28" cy="28" r="24" fill="none" stroke={timerColor} strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 24}`} strokeDashoffset={`${2 * Math.PI * 24 * (1 - timerPct)}`}
              strokeLinecap="round" style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dashoffset 1s linear' }} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-black text-sm" style={{ color: timerColor }}>{timeLeft}</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[480px]">
        <PreguntaEscalas key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
        {isResult && (
          <p className="text-center text-xs font-bold mt-2">
            {acierto
              ? <span className="text-green-400">+10 · +{CORRECT_TIME}s ⏱️{streak >= 2 ? ` · 🔥 ${streak}` : ''}</span>
              : <span className="text-red-400">−{WRONG_TIME}s ⏱️</span>}
          </p>
        )}
      </div>
    </div>
  )
}
