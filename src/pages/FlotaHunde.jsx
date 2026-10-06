import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/flotaHunde'
import PreguntaFlota from '../components/flotaHunde/PreguntaFlota'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 4200 // el objeto tarda 1,3 s en caer y asentarse

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'En agua, con la densidad de cada objeto a la vista', en: 'In water, with each object’s density shown', ca: 'En aigua, amb la densitat de cada objecte a la vista' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Ocho líquidos y solo la masa y el volumen: calcula la densidad', en: 'Eight liquids and only mass and volume: work out the density', ca: 'Vuit líquids i només la massa i el volum: calcula la densitat' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Si flota, ¿qué parte queda bajo el líquido?', en: 'If it floats, how much is under the surface?', ca: 'Si sura, quina part queda sota el líquid?' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[flota-o-se-hunde] los niveles de la pantalla no coinciden con NIVELES')
}

export default function FlotaHunde() {
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
        type: 'juego', game: 'flota-o-se-hunde', category: 'presion-fluidos',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('flota-o-se-hunde', { score: pts }),
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
    title: tr({ es: '¿Flota o se hunde? — Juego de densidad y flotación', en: 'Float or Sink? — Density and buoyancy game', ca: 'Sura o s’enfonsa? — Joc de densitat i flotació' }),
    desc: tr({
      es: 'Corcho, hielo, un huevo o una moneda en agua, aceite, miel o mercurio: predice si flota o se hunde y míralo caer. Densidad, principio de Arquímedes y parte sumergida. Juego de física gratis.',
      en: 'Cork, ice, an egg or a coin in water, oil, honey or mercury: predict whether it floats or sinks and watch it drop. Density, Archimedes’ principle and how much is submerged. Free physics game.',
      ca: 'Suro, gel, un ou o una moneda en aigua, oli, mel o mercuri: prediu si sura o s’enfonsa i mira’l caure. Densitat, principi d’Arquimedes i part submergida. Joc de física gratis.',
    }),
    path: '/juegos/flota-o-se-hunde',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="flota-o-se-hunde"
            badge={tr({ es: 'Física · Presión y fluidos', en: 'Physics · Pressure and fluids', ca: 'Física · Pressió i fluids' })}
            titulo={tr({ es: '🚢 ¿Flota o se hunde?', en: '🚢 Float or Sink?', ca: '🚢 Sura o s’enfonsa?' })}
            sub={tr({ es: 'Predice qué pasa al soltarlo en el líquido… y míralo caer', en: 'Predict what happens when it is dropped in the liquid… and watch it fall', ca: 'Prediu què passa quan el deixes anar al líquid… i mira’l caure' })} />

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
              <p>{tr({ es: 'Sale un objeto sujeto encima de un vaso con un líquido. Tienes que predecir qué pasará al soltarlo. Cuando respondes, cae de verdad y se queda donde lo dice la física: flotando o en el fondo.', en: 'An object is held above a glass of liquid. You predict what will happen when it is dropped. When you answer, it really falls and stays where physics says: floating or on the bottom.', ca: 'Surt un objecte subjectat damunt d’un got amb un líquid. Has de predir què passarà quan el deixis anar. Quan respons, cau de debò i es queda on diu la física: surant o al fons.' })}</p>
              <p>{tr({ es: 'La regla es una sola: flota lo que tiene menos densidad que el líquido. No importa si es grande o pesado: un tronco enorme flota y una canica se hunde. La densidad es masa ÷ volumen; en el nivel medio te dan esos dos datos y la calculas tú.', en: 'There is just one rule: whatever is less dense than the liquid floats. Size and weight do not matter: a huge log floats and a marble sinks. Density is mass ÷ volume; on medium you get those two numbers and work it out.', ca: 'La regla és una sola: sura el que té menys densitat que el líquid. No importa si és gran o pesat: un tronc enorme sura i una bala s’enfonsa. La densitat és massa ÷ volum; al nivell mitjà et donen aquestes dues dades i la calcules tu.' })}</p>
              <p>{tr({ es: 'En difícil hay que decir cuánto queda sumergido: es la densidad del objeto dividida entre la del líquido. Un bloque de 0,6 g/cm³ en agua se queda con el 60 % bajo la superficie. En el dibujo lo verás: la parte teñida por el líquido.', en: 'On hard you say how much stays under the surface: the object’s density divided by the liquid’s. A 0.6 g/cm³ block in water floats with 60% under the surface. You will see it in the drawing: the part tinted by the liquid.', ca: 'En difícil s’ha de dir quant queda submergit: és la densitat de l’objecte dividida per la del líquid. Un bloc de 0,6 g/cm³ en aigua es queda amb el 60 % sota la superfície. Al dibuix ho veuràs: la part tenyida pel líquid.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Te mantienes a flote!' : '¡Arquímedes estaría orgulloso! 🚢',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Staying afloat!' : 'Archimedes would be proud! 🚢',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Et mantens a flor d’aigua!' : 'Arquimedes n’estaria orgullós! 🚢',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} veces si flota o se hunde en Tuthor 🚢 — ¿puedes superarme? https://tuthor.es/juegos/flota-o-se-hunde`,
      en: `I got ${aciertos} float-or-sink calls right on Tuthor 🚢 — can you beat me? https://tuthor.es/juegos/flota-o-se-hunde`,
      ca: `He encertat ${aciertos} vegades si sura o s’enfonsa a Tuthor 🚢 — em pots superar? https://tuthor.es/juegos/flota-o-se-hunde`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="flota-o-se-hunde" emoji="🚢" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaFlota key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
