import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/rebajas'
import PreguntaRebajas from '../components/rebajas/PreguntaRebajas'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 4200 // da tiempo a leer la cuenta de la explicación

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Descuentos redondos: cuánto pagas y cuánto te ahorras', en: 'Round discounts: what you pay and what you save', ca: 'Descomptes rodons: quant pagues i quant t’estalvies' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Qué % es, el IVA y comparar ofertas como el 3×2', en: 'What % it is, VAT and comparing deals like 3 for 2', ca: 'Quin % és, l’IVA i comparar ofertes com el 3×2' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'El precio de antes, quitar el IVA y descuentos encadenados', en: 'The old price, removing VAT and chained discounts', ca: 'El preu d’abans, treure l’IVA i descomptes encadenats' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[rebajas] los niveles de la pantalla no coinciden con NIVELES')
}

export default function Rebajas() {
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
        type: 'juego', game: 'rebajas', category: 'porcentajes',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('rebajas', { score: pts }),
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
    title: tr({ es: 'Rebajas — Juego de porcentajes, descuentos e IVA', en: 'Sale! — Percentages, discounts and VAT game', ca: 'Rebaixes — Joc de percentatges, descomptes i IVA' }),
    desc: tr({
      es: 'Etiquetas de tienda con descuentos, IVA, el precio de antes, rebajas encadenadas y ofertas 3×2. Calcula cuánto pagas y descubre las trampas de los porcentajes. Juego de matemáticas gratis.',
      en: 'Shop price tags with discounts, VAT, the old price, chained sales and 3-for-2 deals. Work out what you pay and spot the percentage traps. Free maths game.',
      ca: 'Etiquetes de botiga amb descomptes, IVA, el preu d’abans, rebaixes encadenades i ofertes 3×2. Calcula quant pagues i descobreix els paranys dels percentatges. Joc de matemàtiques gratis.',
    }),
    path: '/juegos/rebajas',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="rebajas"
            badge={tr({ es: 'Matemáticas · Porcentajes', en: 'Maths · Percentages', ca: 'Matemàtiques · Percentatges' })}
            titulo={tr({ es: '🛍️ Rebajas', en: '🛍️ Sale!', ca: '🛍️ Rebaixes' })}
            sub={tr({ es: '¿Cuánto pagas de verdad? Descuentos, IVA y ofertas con trampa', en: 'What do you really pay? Discounts, VAT and tricky deals', ca: 'Quant pagues de debò? Descomptes, IVA i ofertes amb parany' })} />

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
              <p>{tr({ es: 'Sale la etiqueta de un producto con el camino del precio: el precio, el porcentaje y el precio final. Uno de ellos es un «?» y tienes que elegir cuál es. Al responder se rellena y ves la cuenta.', en: 'A product tag appears showing the price’s journey: the price, the percentage and the final price. One of them is a «?» and you pick its value. When you answer it fills in and you see the working.', ca: 'Surt l’etiqueta d’un producte amb el camí del preu: el preu, el percentatge i el preu final. Un d’ells és un «?» i has de triar quin és. En respondre s’omple i veus el compte.' })}</p>
              <p>{tr({ es: 'El truco es pensar en multiplicar: un 25 % de descuento es pagar el 75 %, o sea, × 0,75; sumar el 21 % de IVA es × 1,21. Con eso salen todas, incluido el precio de antes de la rebaja: se divide.', en: 'The trick is to think in multiplying: 25% off means paying 75%, that is × 0.75; adding 21% VAT is × 1.21. That solves them all, including the price before the sale: you divide.', ca: 'El truc és pensar a multiplicar: un 25 % de descompte és pagar el 75 %, és a dir, × 0,75; sumar el 21 % d’IVA és × 1,21. Amb això surten totes, fins i tot el preu d’abans de la rebaixa: es divideix.' })}</p>
              <p>{tr({ es: 'Ojo con las trampas: subir un 20 % y bajar un 20 % no te deja igual, un 20 % más un 10 % extra no es un 30 %, y un 3×2 puede salir mejor o peor que un −30 %. Las opciones incluyen justo esos errores.', en: 'Watch out for the traps: going up 20% and down 20% does not leave you where you started, 20% plus an extra 10% is not 30%, and 3 for 2 can be better or worse than 30% off. The options include exactly those mistakes.', ca: 'Compte amb els paranys: pujar un 20 % i baixar un 20 % no et deixa igual, un 20 % més un 10 % extra no és un 30 %, i un 3×2 pot sortir millor o pitjor que un −30 %. Les opcions inclouen just aquests errors.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Buen ojo para las ofertas!' : '¡No hay rebaja que se te escape! 🛍️',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Sharp eye for a deal!' : 'No sale gets past you! 🛍️',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Bon ull per a les ofertes!' : 'No se t’escapa cap rebaixa! 🛍️',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} precios de rebajas en Tuthor 🛍️ — ¿puedes superarme? https://tuthor.es/juegos/rebajas`,
      en: `I got ${aciertos} sale prices right on Tuthor 🛍️ — can you beat me? https://tuthor.es/juegos/rebajas`,
      ca: `He encertat ${aciertos} preus de rebaixes a Tuthor 🛍️ — em pots superar? https://tuthor.es/juegos/rebajas`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="rebajas" emoji="🛍️" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaRebajas key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
