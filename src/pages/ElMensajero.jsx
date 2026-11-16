import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/elMensajero'
import PreguntaMensajero from '../components/elMensajero/PreguntaMensajero'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Cada frase se monta en unos segundos: 120 s y +10 s por acierto.
const GAME_TIME = 120
const WRONG_TIME = 5
const CORRECT_TIME = 10
const REVEAL_MS = 5000 // da tiempo a leer la comprobación

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Afirmaciones: cambia el pronombre y el tiempo verbal', en: 'Statements: change the pronoun and the tense', ca: 'Afirmacions: canvia el pronom i el temps verbal' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Más tiempos verbales y palabras de tiempo y lugar (tomorrow → the next day)', en: 'More tenses, plus time and place words (tomorrow → the next day)', ca: 'Més temps verbals i paraules de temps i lloc (tomorrow → the next day)' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Preguntas (if, where… sin do) y órdenes (told us to / not to)', en: 'Questions (if, where… without do) and commands (told us to / not to)', ca: 'Preguntes (if, where… sense do) i ordres (told us to / not to)' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[el-mensajero] los niveles de la pantalla no coinciden con NIVELES')
}

export default function ElMensajero() {
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
    setRonda({ ...genRonda(niv), uid: Math.random() })
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
        type: 'juego', game: 'el-mensajero', category: 'reported-speech',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('el-mensajero', { score: pts }),
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
    title: tr({ es: 'El Mensajero — Juego de reported speech (estilo indirecto en inglés)', en: 'The Messenger — Reported speech game', ca: 'El Missatger — Joc de reported speech (estil indirecte en anglès)' }),
    desc: tr({
      es: 'Juego de reported speech: pasa frases del estilo directo al indirecto en inglés rellenando los huecos con fichas. Cambia pronombres, tiempos verbales, today → that day, preguntas con if y órdenes con told… to. ESO. Gratis.',
      en: 'Reported speech game: turn direct speech into reported speech by filling the gaps with tiles. Change pronouns, tenses, today → that day, questions with if and commands with told… to. Free.',
      ca: 'Joc de reported speech: passa frases de l’estil directe a l’indirecte en anglès omplint els buits amb fitxes. Canvia pronoms, temps verbals, today → that day, preguntes amb if i ordres amb told… to. ESO. Gratis.',
    }),
    path: '/juegos/el-mensajero',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="el-mensajero"
            badge={tr({ es: 'Inglés · Reported speech', en: 'English · Reported speech', ca: 'Anglès · Reported speech' })}
            titulo={tr({ es: '📨 El Mensajero', en: '📨 The Messenger', ca: '📨 El Missatger' })}
            sub={tr({ es: 'Cuenta lo que dijeron: del estilo directo al indirecto', en: 'Pass on what they said: from direct to reported speech', ca: 'Explica el que van dir: de l’estil directe a l’indirecte' })} />

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
              <p>{tr({ es: 'Eres el mensajero: tienes que contar lo que dijo otra persona. Arriba sale la frase tal como se dijo (estilo directo) y debajo, la versión indirecta con huecos. Toca las fichas para llenar los huecos en orden; si te equivocas, toca el hueco para vaciarlo.', en: 'You are the messenger: you have to pass on what someone else said. The sentence as it was said (direct speech) is at the top, and below it the reported version with gaps. Tap the tiles to fill the gaps in order; if you make a mistake, tap the gap to empty it.', ca: 'Ets el missatger: has d’explicar el que va dir una altra persona. A dalt surt la frase tal com es va dir (estil directe) i a sota, la versió indirecta amb buits. Toca les fitxes per omplir els buits en ordre; si t’equivoques, toca el buit per buidar-lo.' })}</p>
              <p>{tr({ es: 'Entre las fichas hay trampas: la forma sin cambiar (am en vez de was), el pronombre de quien hablaba (I en vez de he) o el orden de pregunta (did you live). El verbo da un paso atrás en el pasado, los pronombres cambian según quién habla y tomorrow pasa a the next day.', en: 'Some tiles are traps: the unchanged form (am instead of was), the speaker’s own pronoun (I instead of he) or question word order (did you live). The verb moves one step back into the past, pronouns change to match who is speaking, and tomorrow becomes the next day.', ca: 'Entre les fitxes hi ha paranys: la forma sense canviar (am en lloc de was), el pronom de qui parlava (I en lloc de he) o l’ordre de pregunta (did you live). El verb fa un pas enrere cap al passat, els pronoms canvien segons qui parla i tomorrow passa a the next day.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 4 ? 'Buen comienzo' : aciertos < 8 ? '¡Mensajes bien entregados!' : '¡Mensajero estrella!',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 4 ? 'Good start' : aciertos < 8 ? 'Messages delivered!' : 'Star messenger!',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 4 ? 'Bon començament' : aciertos < 8 ? 'Missatges ben lliurats!' : 'Missatger estrella!',
    })
    const shareText = tr({
      es: `He pasado ${aciertos} frases a reported speech en Tuthor 📨 — ¿puedes superarme? https://tuthor.es/juegos/el-mensajero`,
      en: `I put ${aciertos} sentences into reported speech on Tuthor 📨 — can you beat me? https://tuthor.es/en/juegos/el-mensajero`,
      ca: `He passat ${aciertos} frases a reported speech a Tuthor 📨 — em pots superar? https://tuthor.es/ca/juegos/el-mensajero`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="el-mensajero" emoji="📨" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaMensajero key={ronda.uid} ronda={ronda} revelado={isResult} onResponder={responder} />
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
