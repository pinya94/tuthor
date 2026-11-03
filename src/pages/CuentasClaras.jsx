import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/cuentasClaras'
import PreguntaCuentas from '../components/cuentasClaras/PreguntaCuentas'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Cada ronda se construye (cajas, teclear, ordenar): 120 s y +8 s por acierto.
const GAME_TIME = 120
const WRONG_TIME = 5
const CORRECT_TIME = 8
const REVEAL_MS = 5000 // da tiempo a leer la cuenta

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Necesidad, deseo o ahorro, la regla 50/30/20 e interés simple', en: 'Needs, wants or savings, the 50/30/20 rule and simple interest', ca: 'Necessitat, desig o estalvi, la regla 50/30/20 i interès simple' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Y además interés compuesto, inflación y qué plan de ahorro rinde más', en: 'Plus compound interest, inflation and which savings plan pays most', ca: 'I a més interès compost, inflació i quin pla d’estalvi rendeix més' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Compuesto a muchos años, inflación y cuánto cuesta pagar una tarjeta a plazos', en: 'Compound interest over many years, inflation and the real cost of paying a card off slowly', ca: 'Compost a molts anys, inflació i quant costa pagar una targeta a terminis' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[cuentas-claras] los niveles de la pantalla no coinciden con NIVELES')
}

export default function CuentasClaras() {
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
        type: 'juego', game: 'cuentas-claras', category: 'finanzas-personales',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('cuentas-claras', { score: pts }),
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
    title: tr({ es: 'Cuentas Claras — Juego de finanzas personales: presupuesto, interés e inflación', en: 'Money Matters — Personal finance game: budgeting, interest and inflation', ca: 'Comptes Clars — Joc de finances personals: pressupost, interès i inflació' }),
    desc: tr({
      es: 'Juego de finanzas personales para ESO y Bachillerato: reparte un sueldo con la regla 50/30/20, distingue necesidades y deseos, calcula interés simple y compuesto, la inflación y lo que cuesta pagar una tarjeta a plazos. Gratis.',
      en: 'Personal finance game: split a salary with the 50/30/20 rule, tell needs from wants, work out simple and compound interest, inflation and the real cost of paying off a credit card slowly. Free.',
      ca: 'Joc de finances personals per a ESO i Batxillerat: reparteix un sou amb la regla 50/30/20, distingeix necessitats i desitjos, calcula interès simple i compost, la inflació i el que costa pagar una targeta a terminis. Gratis.',
    }),
    path: '/juegos/cuentas-claras',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="cuentas-claras"
            badge={tr({ es: 'Economía · Finanzas personales', en: 'Economics · Personal finance', ca: 'Economia · Finances personals' })}
            titulo={tr({ es: '🐷 Cuentas Claras', en: '🐷 Money Matters', ca: '🐷 Comptes Clars' })}
            sub={tr({ es: 'Tu dinero, con números de verdad', en: 'Your money, with real numbers', ca: 'Els teus diners, amb números de debò' })} />

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
              <p>{tr({ es: 'Presupuesto: cada gasto a su caja. Necesidad es lo que no puedes dejar de pagar (alquiler, luz, comida); deseo, lo que te gusta pero podrías quitar (cine, cenas fuera); ahorro, lo que apartas para el futuro. Con la regla 50/30/20 se reparte el sueldo: la mitad para necesidades, el 30 % para deseos y el 20 % para ahorrar.', en: 'Budget: each expense to its box. A need is what you cannot stop paying (rent, electricity, food); a want is what you enjoy but could cut (cinema, eating out); savings are what you set aside. The 50/30/20 rule splits a salary: half for needs, 30% for wants and 20% for savings.', ca: 'Pressupost: cada despesa a la seva caixa. Necessitat és el que no pots deixar de pagar (lloguer, llum, menjar); desig, el que t’agrada però podries treure (cinema, sopars fora); estalvi, el que reserves per al futur. Amb la regla 50/30/20 es reparteix el sou: la meitat per a necessitats, el 30 % per a desitjos i el 20 % per estalviar.' })}</p>
              <p>{tr({ es: 'Cuentas: escribe el dinero final, en euros redondeados. Con interés simple se gana cada año lo mismo; con el compuesto, el interés también da interés, y con los años la diferencia es enorme. La inflación funciona igual, pero al revés: sube los precios sobre lo que ya subieron.', en: 'Sums: type the final amount, in whole euros. With simple interest you earn the same each year; with compound interest the interest earns interest too, and over the years the difference is huge. Inflation works the same way in reverse: prices rise on top of earlier rises.', ca: 'Comptes: escriu els diners finals, en euros arrodonits. Amb interès simple es guanya cada any el mateix; amb el compost, l’interès també dona interès, i amb els anys la diferència és enorme. La inflació funciona igual, però al revés: puja els preus sobre el que ja van pujar.' })}</p>
              <p>{tr({ es: 'Y además: ordena planes de ahorro de más a menos dinero final y, en difícil, calcula en cuántos pagos se salda una tarjeta si cada mes se suma un interés.', en: 'Also: order savings plans from most to least money and, on hard, work out how many payments it takes to clear a credit card that charges interest each month.', ca: 'I a més: ordena plans d’estalvi de més a menys diners finals i, en difícil, calcula en quants pagaments se salda una targeta si cada mes se suma un interès.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Buenas cuentas!' : '¡Tus finanzas, en orden!',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Nicely worked out!' : 'Your finances are in order!',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Bons comptes!' : 'Les teves finances, en ordre!',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} cuentas en Cuentas Claras de Tuthor 🐷 — ¿puedes superarme? https://tuthor.es/juegos/cuentas-claras`,
      en: `I got ${aciertos} sums right in Money Matters on Tuthor 🐷 — can you beat me? https://tuthor.es/en/juegos/cuentas-claras`,
      ca: `He encertat ${aciertos} comptes a Comptes Clars de Tuthor 🐷 — em pots superar? https://tuthor.es/ca/juegos/cuentas-claras`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="cuentas-claras" emoji="🐷" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaCuentas key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
