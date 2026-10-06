import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/ofertaDemanda'
import PreguntaMercado from '../components/ofertaDemanda/PreguntaMercado'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 4500 // da tiempo a ver moverse la curva y leer el porqué

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Una noticia: ¿se mueve la oferta o la demanda, y hacia dónde?', en: 'A news item: does supply or demand shift, and which way?', ca: 'Una notícia: es mou l’oferta o la demanda, i cap a on?' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Qué pasa con el precio y la cantidad, y la trampa del movimiento a lo largo', en: 'What happens to price and quantity, and the movement-along trap', ca: 'Què passa amb el preu i la quantitat, i el parany del moviment al llarg' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Con ecuaciones: equilibrio, escasez y excedentes', en: 'With equations: equilibrium, shortages and surpluses', ca: 'Amb equacions: equilibri, escassetat i excedents' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[oferta-demanda] los niveles de la pantalla no coinciden con NIVELES')
}

export default function OfertaDemanda() {
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
    setRonda(prev => genRonda(niv, { evitar: prev?.noticia }))
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
        type: 'juego', game: 'oferta-demanda', category: 'mercado',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('oferta-demanda', { score: pts }),
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
    title: tr({ es: 'Oferta y demanda — Juego del mercado y el precio', en: 'Supply and Demand — Market and price game', ca: 'Oferta i demanda — Joc del mercat i el preu' }),
    desc: tr({
      es: 'Una helada, una moda, un impuesto: lee la noticia y di qué curva se desplaza, qué pasa con el precio y la cantidad, y calcula el equilibrio con ecuaciones. Juego de economía gratis para ESO y Bachillerato.',
      en: 'A frost, a trend, a tax: read the news and say which curve shifts, what happens to price and quantity, and work out equilibrium with equations. Free economics game.',
      ca: 'Una gelada, una moda, un impost: llegeix la notícia i digues quina corba es desplaça, què passa amb el preu i la quantitat, i calcula l’equilibri amb equacions. Joc d’economia gratis per a ESO i Batxillerat.',
    }),
    path: '/juegos/oferta-demanda',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="oferta-demanda"
            badge={tr({ es: 'Economía · El mercado', en: 'Economics · The market', ca: 'Economia · El mercat' })}
            titulo={tr({ es: '🛒 Oferta y demanda', en: '🛒 Supply and Demand', ca: '🛒 Oferta i demanda' })}
            sub={tr({ es: 'Lee la noticia y mueve la curva: ¿sube o baja el precio?', en: 'Read the news and shift the curve: does the price go up or down?', ca: 'Llegeix la notícia i mou la corba: puja o baixa el preu?' })} />

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
              <p>{tr({ es: 'En el gráfico, la demanda (D) baja: cuanto más caro, menos se quiere comprar. La oferta (O) sube: cuanto más caro, más se quiere vender. Donde se cruzan está el equilibrio (E): el precio y la cantidad a los que se vende de verdad.', en: 'On the graph, demand (D) slopes down: the dearer it is, the less people want to buy. Supply (S) slopes up: the dearer it is, the more sellers want to sell. Where they cross is equilibrium (E): the price and quantity actually traded.', ca: 'Al gràfic, la demanda (D) baixa: com més car, menys es vol comprar. L’oferta (O) puja: com més car, més es vol vendre. On es creuen hi ha l’equilibri (E): el preu i la quantitat a què es ven de debò.' })}</p>
              <p>{tr({ es: 'Sale una noticia y hay que pensar a quién afecta: si cambian los gustos, la renta o el precio de otro bien, se mueve la demanda; si cambian los costes, la tecnología o el número de vendedores, se mueve la oferta. Ojo: si cambia el precio del propio bien, no se mueve ninguna curva, solo nos desplazamos a lo largo de ellas.', en: 'A news item appears and you think about who it affects: if tastes, income or another good’s price change, demand shifts; if costs, technology or the number of sellers change, supply shifts. Careful: if the good’s own price changes, no curve shifts, we just move along them.', ca: 'Surt una notícia i cal pensar a qui afecta: si canvien els gustos, la renda o el preu d’un altre bé, es mou la demanda; si canvien els costos, la tecnologia o el nombre de venedors, es mou l’oferta. Compte: si canvia el preu del mateix bé, no es mou cap corba, només ens desplacem al llarg d’elles.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Tienes olfato de economista!' : '¡Adam Smith te fichaba! 🛒',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'You think like an economist!' : 'Adam Smith would hire you! 🛒',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Tens olfacte d’economista!' : 'Adam Smith et fitxaria! 🛒',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} preguntas de oferta y demanda en Tuthor 🛒 — ¿puedes superarme? https://tuthor.es/juegos/oferta-demanda`,
      en: `I got ${aciertos} supply-and-demand questions right on Tuthor 🛒 — can you beat me? https://tuthor.es/juegos/oferta-demanda`,
      ca: `He encertat ${aciertos} preguntes d’oferta i demanda a Tuthor 🛒 — em pots superar? https://tuthor.es/juegos/oferta-demanda`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="oferta-demanda" emoji="🛒" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaMercado key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
