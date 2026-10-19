import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/termometro'
import PreguntaTermometro from '../components/termometro/PreguntaTermometro'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Se teclea, se ajusta la mezcla, se reparte o se monta: 90 s y +6 s por acierto.
const GAME_TIME = 90
const WRONG_TIME = 5
const CORRECT_TIME = 6
const REVEAL_MS = 4800 // da tiempo a ver el termómetro o el vaso resueltos y la cuenta

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Celsius y kelvin, mezclas a partes iguales, reparte escenas y monta una sartén', en: 'Celsius and kelvin, equal mixes, sort scenes and build a frying pan', ca: 'Celsius i kelvin, barreges a parts iguals, reparteix escenes i munta una paella' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Fahrenheit y mezclas con distinta cantidad de agua', en: 'Fahrenheit and mixes with different amounts of water', ca: 'Fahrenheit i barreges amb diferent quantitat d’aigua' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Q = m · c · ΔT tecleado y de Fahrenheit a Celsius', en: 'Q = m · c · ΔT typed in, and Fahrenheit to Celsius', ca: 'Q = m · c · ΔT teclejat i de Fahrenheit a Celsius' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[termometro] los niveles de la pantalla no coinciden con NIVELES')
}

export default function Termometro() {
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
        type: 'juego', game: 'termometro', category: 'calor-temperatura',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('termometro', { score: pts }),
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
    title: tr({ es: 'Termómetro — Juego de calor y temperatura', en: 'Thermometer — Heat and temperature game', ca: 'Termòmetre — Joc de calor i temperatura' }),
    desc: tr({
      es: 'Pasa de grados Celsius a kelvin y a Fahrenheit con un termómetro de dos escalas, calcula la temperatura de una mezcla de agua, usa Q = m · c · ΔT y distingue conducción, convección y radiación. Juego de física gratis.',
      en: 'Convert between Celsius, kelvin and Fahrenheit on a two-scale thermometer, work out the temperature of a water mix, use Q = m · c · ΔT and tell conduction, convection and radiation apart. Free physics game.',
      ca: 'Passa de graus Celsius a kelvin i a Fahrenheit amb un termòmetre de dues escales, calcula la temperatura d’una barreja d’aigua, fes servir Q = m · c · ΔT i distingeix conducció, convecció i radiació. Joc de física gratis.',
    }),
    path: '/juegos/termometro',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="termometro"
            badge={tr({ es: 'Física · Calor y temperatura', en: 'Physics · Heat and temperature', ca: 'Física · Calor i temperatura' })}
            titulo={tr({ es: '🌡️ Termómetro', en: '🌡️ Thermometer', ca: '🌡️ Termòmetre' })}
            sub={tr({ es: 'Escalas, mezclas de agua y cómo viaja el calor', en: 'Scales, water mixes and how heat travels', ca: 'Escales, barreges d’aigua i com viatja la calor' })} />

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
              <p>{tr({ es: 'Escalas: sale un termómetro con dos escalas a la vez y sus puntos de referencia (el agua se congela a 0 °C, que son 273 K y 32 °F, y hierve a 100 °C, 373 K y 212 °F). Lee una y teclea la otra (con el signo menos si hace falta): a kelvin se suma 273; a Fahrenheit se multiplica por 1,8 y se suma 32.', en: 'Scales: a thermometer shows two scales at once with their reference points (water freezes at 0 °C, which is 273 K and 32 °F, and boils at 100 °C, 373 K and 212 °F). Read one and type the other (with a minus sign if needed): to kelvin add 273; to Fahrenheit multiply by 1.8 and add 32.', ca: 'Escales: surt un termòmetre amb dues escales alhora i els seus punts de referència (l’aigua es congela a 0 °C, que són 273 K i 32 °F, i bull a 100 °C, 373 K i 212 °F). Llegeix-ne una i tecleja l’altra (amb el signe menys si cal): a kelvin se suma 273; a Fahrenheit es multiplica per 1,8 i se suma 32.' })}</p>
              <p>{tr({ es: 'Mezclas: dos vasos de agua a distinta temperatura. El calor que pierde la caliente lo gana la fría hasta que se igualan; si hay más agua en un vaso, la mezcla queda más cerca de su temperatura. Subes o bajas el termómetro del vaso de la mezcla, que cambia de color, hasta donde quedará.', en: 'Mixes: two glasses of water at different temperatures. The heat lost by the hot water is gained by the cold until they are equal; if one glass has more water, the mix ends up closer to its temperature. You move the mixed glass’s thermometer up or down, and it changes colour, to where it will end up.', ca: 'Barreges: dos gots d’aigua a diferent temperatura. La calor que perd la calenta la guanya la freda fins que s’igualen; si en un got hi ha més aigua, la barreja queda més a prop de la seva temperatura. Puges o baixes el termòmetre del got de la barreja, que canvia de color, fins on quedarà.' })}</p>
              <p>{tr({ es: 'También hay escenas que se reparten en tres cajas, conducción (contacto), convección (corrientes en líquidos y gases) o radiación (ondas, sin contacto), y una sartén que montar: el cuerpo con un material que conduzca y el mango con uno que aísle. En difícil, Q = m · c · ΔT se teclea en julios.', en: 'There are also scenes to sort into three boxes, conduction (contact), convection (currents in liquids and gases) or radiation (waves, no contact), and a frying pan to build: the pan from a material that conducts and the handle from one that insulates. On hard, Q = m · c · ΔT is typed in joules.', ca: 'També hi ha escenes que es reparteixen en tres caixes, conducció (contacte), convecció (corrents en líquids i gasos) o radiació (ones, sense contacte), i una paella per muntar: el cos amb un material que condueixi i el mànec amb un que aïlli. En difícil, Q = m · c · ΔT es tecleja en joules.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Vas entrando en calor!' : '¡Al rojo vivo! 🌡️',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'You are warming up!' : 'Red hot! 🌡️',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Vas agafant escalfor!' : 'Al roig viu! 🌡️',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} de calor y temperatura en Termómetro de Tuthor 🌡️ — ¿puedes superarme? https://tuthor.es/juegos/termometro`,
      en: `I got ${aciertos} heat and temperature questions right in Thermometer on Tuthor 🌡️ — can you beat me? https://tuthor.es/juegos/termometro`,
      ca: `He encertat ${aciertos} de calor i temperatura a Termòmetre de Tuthor 🌡️ — em pots superar? https://tuthor.es/juegos/termometro`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="termometro" emoji="🌡️" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaTermometro key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
