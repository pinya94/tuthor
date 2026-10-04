import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/etiqueta'
import PreguntaEtiqueta from '../components/etiqueta/PreguntaEtiqueta'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 3800

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Dos etiquetas: ¿cuál tiene más? ¿Cuántos terrones de azúcar?', en: 'Two labels: which has more? How many sugar cubes?', ca: 'Dues etiquetes: quina en té més? Quants terrossos de sucre?' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Tres etiquetas, gramos por ración y el semáforo nutricional', en: 'Three labels, grams per serving and traffic-light labels', ca: 'Tres etiquetes, grams per ració i el semàfor nutricional' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'La trampa de la ración: lo que cuenta es lo que te comes', en: 'The serving trap: what counts is what you eat', ca: 'La trampa de la ració: el que compta és el que et menges' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[lee-la-etiqueta] los niveles de la pantalla no coinciden con NIVELES')
}

export default function LeeLaEtiqueta() {
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
        type: 'juego', game: 'lee-la-etiqueta', category: 'nutricion',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('lee-la-etiqueta', { score: pts }),
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
    title: tr({ es: 'Lee la Etiqueta — Juego de etiquetas nutricionales', en: 'Read the Label — Nutrition label game', ca: 'Llegeix l’Etiqueta — Joc d’etiquetes nutricionals' }),
    desc: tr({
      es: 'Aprende a leer la etiqueta nutricional: azúcar, sal y grasas por 100 g y por ración, terrones de azúcar y el semáforo nutricional. 24 productos del súper, tres niveles. Juego gratis.',
      en: 'Learn to read nutrition labels: sugar, salt and fat per 100 g and per serving, sugar cubes and traffic-light labels. 24 supermarket products, three levels. Free game.',
      ca: 'Aprèn a llegir l’etiqueta nutricional: sucre, sal i greixos per 100 g i per ració, terrossos de sucre i el semàfor nutricional. 24 productes del súper, tres nivells. Joc gratis.',
    }),
    path: '/juegos/lee-la-etiqueta',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="lee-la-etiqueta"
            badge={tr({ es: 'Ciencias · Nutrición', en: 'Science · Nutrition', ca: 'Ciències · Nutrició' })}
            titulo={tr({ es: '🏷️ Lee la Etiqueta', en: '🏷️ Read the Label', ca: '🏷️ Llegeix l’Etiqueta' })}
            sub={tr({ es: '¿Qué hay de verdad en lo que comes?', en: 'What is really in what you eat?', ca: 'Què hi ha de debò en el que menges?' })} />

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
              <p>{tr({ es: 'Salen etiquetas nutricionales como las de los envases del súper y una pregunta: cuál tiene más azúcar, cuántos terrones lleva una lata, cuántos gramos de sal hay en una ración o si un producto es alto en grasas.', en: 'Nutrition labels like the ones on supermarket packs appear with a question: which has more sugar, how many cubes are in a can, how many grams of salt in a serving or whether a product is high in fat.', ca: 'Surten etiquetes nutricionals com les dels envasos del súper i una pregunta: quina té més sucre, quants terrossos porta una llauna, quants grams de sal hi ha en una ració o si un producte és alt en greixos.' })}</p>
              <p>{tr({ es: 'Las reglas: la tabla da los valores por 100 g o 100 ml; en una ración hay valor × gramos de la ración / 100; un terrón de azúcar son 4 g. Semáforo por 100 g: azúcar alto por encima de 22,5 g y bajo hasta 5 g; grasas, 17,5 y 3; saturadas, 5 y 1,5; sal, 1,5 y 0,3. En las bebidas, la mitad.', en: 'The rules: the table gives values per 100 g or 100 ml; a serving contains value × serving grams / 100; a sugar cube is 4 g. Traffic light per 100 g: sugar high above 22.5 g and low up to 5 g; fat 17.5 and 3; saturates 5 and 1.5; salt 1.5 and 0.3. For drinks, half.', ca: 'Les regles: la taula dona els valors per 100 g o 100 ml; en una ració hi ha valor × grams de la ració / 100; un terròs de sucre són 4 g. Semàfor per 100 g: sucre alt per sobre de 22,5 g i baix fins a 5 g; greixos, 17,5 i 3; saturats, 5 i 1,5; sal, 1,5 i 0,3. En les begudes, la meitat.' })}</p>
              <p>{tr({ es: 'En difícil llega la trampa de la ración: la crema de cacao tiene muchísimo más azúcar por 100 g que el zumo, pero una cucharada aporta menos que un vaso. Lo que cuenta es lo que te comes. Los valores son típicos de productos genéricos, sin marcas.', en: 'On hard comes the serving trap: chocolate spread has far more sugar per 100 g than juice, but a spoonful gives less than a glass. What counts is what you eat. Values are typical of generic products, no brands.', ca: 'En difícil arriba la trampa de la ració: la crema de cacau té moltíssim més sucre per 100 g que el suc, però una cullerada n’aporta menys que un got. El que compta és el que et menges. Els valors són típics de productes genèrics, sense marques.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Buena lectura!' : '¡Ya no te la cuelan! 🏷️',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Well read!' : 'Nobody fools you now! 🏷️',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Bona lectura!' : 'Ja no te la colen! 🏷️',
    })
    const shareText = tr({
      es: `He leído bien ${aciertos} etiquetas en Lee la Etiqueta 🏷️ — ¿puedes superarme? https://tuthor.es/juegos/lee-la-etiqueta`,
      en: `I read ${aciertos} labels right in Read the Label 🏷️ — can you beat me? https://tuthor.es/juegos/lee-la-etiqueta`,
      ca: `He llegit bé ${aciertos} etiquetes a Llegeix l’Etiqueta 🏷️ — em pots superar? https://tuthor.es/juegos/lee-la-etiqueta`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="lee-la-etiqueta" emoji="🏷️" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaEtiqueta ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
