import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, TEMAS, genRonda, esCorrecta } from '../lib/elGancho'
import PreguntaGancho from '../components/elGancho/PreguntaGancho'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Rondas de un toque: partida corta, +3 s por acierto y −3 s por fallo.
const GAME_TIME = 60
const CORRECT_TIME = 3
const WRONG_TIME = 3
const REVEAL_OK = 900     // acierto: casi sin pausa
const REVEAL_MAL = 3000   // fallo: tiempo para leer la regla

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'who, which, where · coletillas con be (isn’t she?)', en: 'who, which, where · tags with be (isn’t she?)', ca: 'who, which, where · coletilles amb be (isn’t she?)' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'whose, when · coletillas con do, did, can, will, have', en: 'whose, when · tags with do, did, can, will, have', ca: 'whose, when · coletilles amb do, did, can, will, have' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Entre comas (sin that) · I’m, let’s, nobody, never, there is… · 4 botones', en: 'Between commas (no that) · I’m, let’s, nobody, never, there is… · 4 buttons', ca: 'Entre comes (sense that) · I’m, let’s, nobody, never, there is… · 4 botons' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[el-gancho] los niveles de la pantalla no coinciden con NIVELES')
}

export default function ElGancho() {
  const { lang, localPath, tr } = useLang()
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const backPath = location.state?.backPath
  const temaFijo = TEMAS.includes(location.state?.tema) ? location.state.tema : null

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
    setRonda({ ...genRonda(niv, { tema: temaFijo }), uid: Math.random() })
    setElegida(null)
    setPhase('choose')
  }, [temaFijo])

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
        type: 'juego', game: 'el-gancho', category: temaFijo ?? 'mezcla',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('el-gancho', { score: pts }),
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
    const ok = esCorrecta(ronda, r)
    if (ok) {
      setAciertos(a => a + 1)
      setStreak(s => s + 1)
      setTimeLeft(t => t + CORRECT_TIME)
    } else {
      setStreak(0)
      setTimeLeft(t => Math.max(0, t - WRONG_TIME))
    }
    nextRef.current = setTimeout(() => next(nivel), ok ? REVEAL_OK : REVEAL_MAL)
  }

  const seo = {
    title: tr({ es: 'El Gancho — Juego de question tags y relative pronouns en inglés', en: 'The Hook — Question tags and relative pronouns game', ca: 'El Ganxo — Joc de question tags i relative pronouns en anglès' }),
    desc: tr({
      es: 'Juego de inglés de un toque: elige el relativo (who, which, where, whose, when) o la coletilla de pregunta (isn’t she?, didn’t they?, aren’t I?, shall we?). Tres niveles para ESO. Gratis.',
      en: 'One-tap English game: choose the relative pronoun (who, which, where, whose, when) or the question tag (isn’t she?, didn’t they?, aren’t I?, shall we?). Three levels. Free.',
      ca: 'Joc d’anglès d’un toc: tria el relatiu (who, which, where, whose, when) o la coletilla de pregunta (isn’t she?, didn’t they?, aren’t I?, shall we?). Tres nivells per a l’ESO. Gratis.',
    }),
    path: '/juegos/el-gancho',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="el-gancho"
            badge={tr({ es: 'Inglés · Question tags y relativos', en: 'English · Question tags and relatives', ca: 'Anglès · Question tags i relatius' })}
            titulo={tr({ es: '🎣 El Gancho', en: '🎣 The Hook', ca: '🎣 El Ganxo' })}
            sub={tr({ es: 'La palabrita que engancha la frase: un toque y a por la siguiente', en: 'The little word that hooks the sentence together: one tap and on to the next', ca: 'La paraula petita que enganxa la frase: un toc i a per la següent' })} />

          {temaFijo && (
            <p className="text-center text-xs text-amber-300 font-bold mb-3">
              {temaFijo === 'question-tags'
                ? tr({ es: '❓ Solo question tags', en: '❓ Question tags only', ca: '❓ Només question tags' })
                : tr({ es: '🔗 Solo relative pronouns', en: '🔗 Relative pronouns only', ca: '🔗 Només relative pronouns' })}
            </p>
          )}

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
              <p>{tr({ es: 'Sale una frase en inglés con un hueco. A veces falta el relativo que une las dos partes (The girl ___ sings → who) y a veces la coletilla del final (She’s late, ___ → isn’t she?). Toca la buena: un toque y sale la siguiente.', en: 'You get an English sentence with a gap. Sometimes it’s the relative pronoun joining the two parts (The girl ___ sings → who), sometimes the tag at the end (She’s late, ___ → isn’t she?). Tap the right one: one tap and the next sentence appears.', ca: 'Surt una frase en anglès amb un buit. De vegades falta el relatiu que uneix les dues parts (The girl ___ sings → who) i de vegades la coletilla del final (She’s late, ___ → isn’t she?). Toca la bona: un toc i surt la següent.' })}</p>
              <p>{tr({ es: 'Si fallas, verás la regla en una línea. Las trampas son las de siempre: which para personas, that entre comas, isn’t para un presente con does o amn’t I.', en: 'If you get it wrong, you’ll see the rule in one line. The traps are the classic ones: which for people, that between commas, isn’t for a present simple with does, or amn’t I.', ca: 'Si falles, veuràs la regla en una línia. Els paranys són els de sempre: which per a persones, that entre comes, isn’t per a un present amb does o amn’t I.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 6 ? 'Buen comienzo' : aciertos < 14 ? '¡Buena pesca!' : '¡Pescador de élite!',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 6 ? 'Good start' : aciertos < 14 ? 'Good catch!' : 'Master angler!',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 6 ? 'Bon començament' : aciertos < 14 ? 'Bona pesca!' : 'Pescador d’elit!',
    })
    const shareText = tr({
      es: `He enganchado ${aciertos} frases en inglés en El Gancho de Tuthor 🎣 — ¿puedes superarme? https://tuthor.es/juegos/el-gancho`,
      en: `I hooked ${aciertos} English sentences in The Hook on Tuthor 🎣 — can you beat me? https://tuthor.es/en/juegos/el-gancho`,
      ca: `He enganxat ${aciertos} frases en anglès a El Ganxo de Tuthor 🎣 — em pots superar? https://tuthor.es/ca/juegos/el-gancho`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="el-gancho" emoji="🎣" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaGancho key={ronda.uid} ronda={ronda} revelado={isResult} onResponder={responder} />
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
