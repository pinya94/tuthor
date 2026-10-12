import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/europa27'
import PreguntaEuropa from '../components/europa27/PreguntaEuropa'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 4800 // da tiempo a ver el mapa coloreado y la explicación

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Países de la UE en el mapa, capitales y quién es miembro', en: 'EU countries on the map, capitals and who is a member', ca: 'Països de la UE al mapa, capitals i qui n’és membre' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'El euro, las ampliaciones y las instituciones', en: 'The euro, enlargements and institutions', ca: 'L’euro, les ampliacions i les institucions' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Schengen, años de entrada y sedes', en: 'Schengen, joining years and seats', ca: 'Schengen, anys d’entrada i seus' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[europa-27] los niveles de la pantalla no coinciden con NIVELES')
}

export default function Europa27() {
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
        type: 'juego', game: 'europa-27', category: 'union-europea',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('europa-27', { score: pts }),
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
    title: tr({ es: 'Europa a 27 — Juego de la Unión Europea: mapa, euro, Schengen e instituciones', en: 'Europe of 27 — European Union game: map, euro, Schengen and institutions', ca: 'Europa a 27 — Joc de la Unió Europea: mapa, euro, Schengen i institucions' }),
    desc: tr({
      es: 'Los 27 países de la UE en el mapa de Europa: capitales, quién es miembro y quién no (Noruega, Suiza, Reino Unido), el euro, Schengen, los años de cada ampliación y las instituciones con sus sedes. Juego de geografía gratis.',
      en: 'The 27 EU countries on the map of Europe: capitals, who is a member and who is not (Norway, Switzerland, the UK), the euro, Schengen, the year of each enlargement and the institutions with their seats. Free geography game.',
      ca: 'Els 27 països de la UE al mapa d’Europa: capitals, qui n’és membre i qui no (Noruega, Suïssa, el Regne Unit), l’euro, Schengen, els anys de cada ampliació i les institucions amb les seves seus. Joc de geografia gratis.',
    }),
    path: '/juegos/europa-27',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="europa-27"
            badge={tr({ es: 'Geografía · La Unión Europea', en: 'Geography · The European Union', ca: 'Geografia · La Unió Europea' })}
            titulo={tr({ es: '⭐ Europa a 27', en: '⭐ Europe of 27', ca: '⭐ Europa a 27' })}
            sub={tr({ es: 'Veintisiete países, una moneda (casi) y unas cuantas instituciones', en: 'Twenty-seven countries, one currency (nearly) and a handful of institutions', ca: 'Vint-i-set països, una moneda (gairebé) i unes quantes institucions' })} />

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
              <p>{tr({ es: 'Sale el mapa de Europa con uno o varios países marcados en ámbar (con un punto en la capital, para que se vean también los pequeños). Hay que decir qué país es, su capital o cuál de los marcados no es de la UE, no usa el euro o no está en Schengen.', en: 'A map of Europe appears with one or more countries marked in amber (with a dot on the capital, so the small ones show too). You say which country it is, its capital, or which of the marked ones is not in the EU, does not use the euro or is not in Schengen.', ca: 'Surt el mapa d’Europa amb un o diversos països marcats en ambre (amb un punt a la capital, perquè es vegin també els petits). Cal dir quin país és, la capital o quin dels marcats no és de la UE, no fa servir l’euro o no és a Schengen.' })}</p>
              <p>{tr({ es: 'Ojo con las trampas: Noruega y Suiza no son de la UE aunque estén en Schengen, el Reino Unido salió en 2020, y seis miembros no usan el euro.', en: 'Watch out for the traps: Norway and Switzerland are not in the EU even though they are in Schengen, the UK left in 2020, and six members do not use the euro.', ca: 'Compte amb els paranys: Noruega i Suïssa no són de la UE encara que siguin a Schengen, el Regne Unit en va sortir el 2020, i sis membres no fan servir l’euro.' })}</p>
              <p>{tr({ es: 'En los niveles altos, el año en que entró cada país y las instituciones: quién propone las leyes, quién las aprueba y dónde tiene su sede cada una. Al corregir, el mapa pinta en azul a los 27.', en: 'On the higher levels, the year each country joined and the institutions: who proposes laws, who passes them and where each one is based. When you answer, the map colours the 27 in blue.', ca: 'Als nivells alts, l’any en què va entrar cada país i les institucions: qui proposa les lleis, qui les aprova i on té la seu cadascuna. En corregir, el mapa pinta de blau els 27.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Muy europeo!' : '¡Eurodiputado de honor! ⭐',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Very European!' : 'Honorary MEP! ⭐',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Molt europeu!' : 'Eurodiputat d’honor! ⭐',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} preguntas de la Unión Europea en Europa a 27 de Tuthor ⭐ — ¿puedes superarme? https://tuthor.es/juegos/europa-27`,
      en: `I got ${aciertos} European Union questions right in Europe of 27 on Tuthor ⭐ — can you beat me? https://tuthor.es/juegos/europa-27`,
      ca: `He encertat ${aciertos} preguntes de la Unió Europea a Europa a 27 de Tuthor ⭐ — em pots superar? https://tuthor.es/juegos/europa-27`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="europa-27" emoji="⭐" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaEuropa key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
