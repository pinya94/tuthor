import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/placasMovimiento'
import PreguntaPlacas from '../components/placasMovimiento/PreguntaPlacas'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 5000 // da tiempo a ver el relieve dibujado y leer la explicación

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Qué borde es por las flechas, qué relieve se forma y si se crea o se destruye corteza', en: 'Which boundary it is from the arrows, what landform appears and whether crust is made or destroyed', ca: 'Quina vora és per les fletxes, quin relleu es forma i si es crea o es destrueix escorça' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Además, qué placa se hunde y qué lugar real es: Andes, Himalaya, Japón…', en: 'Plus which plate sinks and which real place it is: Andes, Himalayas, Japan…', ca: 'A més, quina placa s’enfonsa i quin lloc real és: Andes, Himàlaia, Japó…' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Sin dibujo: de un lugar o unos síntomas, deduce qué borde es (y el caso de Hawái)', en: 'No drawing: from a place or some clues, work out the boundary (and the Hawaii case)', ca: 'Sense dibuix: d’un lloc o uns símptomes, dedueix quina vora és (i el cas de Hawaii)' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[placas-movimiento] los niveles de la pantalla no coinciden con NIVELES')
}

export default function PlacasMovimiento() {
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
        type: 'juego', game: 'placas-movimiento', category: 'placas-tectonicas',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('placas-movimiento', { score: pts }),
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
    title: tr({ es: 'Placas en Movimiento — Juego de placas tectónicas y bordes de placa', en: 'Moving Plates — Plate tectonics and plate boundaries game', ca: 'Plaques en Moviment — Joc de plaques tectòniques i vores de placa' }),
    desc: tr({
      es: 'Un corte de la Tierra con dos placas y sus flechas: ¿borde convergente, divergente o transformante? ¿Se forma una dorsal, una fosa con volcanes, un arco de islas o una cordillera? Andes, Himalaya, Japón y San Andrés. Juego de geología gratis.',
      en: 'A cross-section of the Earth with two plates and their arrows: convergent, divergent or transform boundary? Does a ridge, a trench with volcanoes, an island arc or a mountain range form? Andes, Himalayas, Japan and San Andreas. Free geology game.',
      ca: 'Un tall de la Terra amb dues plaques i les seves fletxes: vora convergent, divergent o transformant? Es forma una dorsal, una fossa amb volcans, un arc d’illes o una serralada? Andes, Himàlaia, Japó i Sant Andreu. Joc de geologia gratis.',
    }),
    path: '/juegos/placas-movimiento',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="placas-movimiento"
            badge={tr({ es: 'Geología · Placas tectónicas', en: 'Geology · Plate tectonics', ca: 'Geologia · Plaques tectòniques' })}
            titulo={tr({ es: '🌋 Placas en Movimiento', en: '🌋 Moving Plates', ca: '🌋 Plaques en Moviment' })}
            sub={tr({ es: 'Mira hacia dónde se mueven las placas y descubre qué se forma', en: 'See which way the plates move and find out what forms', ca: 'Mira cap on es mouen les plaques i descobreix què s’hi forma' })} />

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
              <p>{tr({ es: 'Sale un corte de la Tierra: el manto abajo, dos placas encima (la oceánica, fina y bajo el mar; la continental, gruesa) y unas flechas que dicen hacia dónde se mueve cada una. Si se acercan, el borde es convergente; si se separan, divergente; si se deslizan de lado, transformante (ese se ve desde arriba).', en: 'You see a cross-section of the Earth: the mantle below, two plates on top (oceanic, thin and under the sea; continental, thick) and arrows showing which way each one moves. If they move together the boundary is convergent; if they move apart, divergent; if they slide sideways, transform (that one is shown from above).', ca: 'Surt un tall de la Terra: el mantell a baix, dues plaques a sobre (l’oceànica, prima i sota el mar; la continental, gruixuda) i unes fletxes que diuen cap on es mou cadascuna. Si s’acosten, la vora és convergent; si se separen, divergent; si llisquen de costat, transformant (aquesta es veu des de dalt).' })}</p>
              <p>{tr({ es: 'Al responder se dibuja lo que se forma de verdad: una dorsal, un valle de rift, una fosa con volcanes, un arco de islas, una cordillera plegada o una falla que parte una carretera. Y la explicación cuenta dónde pasa en el mundo real.', en: 'When you answer, what really forms is drawn: a ridge, a rift valley, a trench with volcanoes, an island arc, folded mountains or a fault that splits a road. The explanation tells you where it happens in the real world.', ca: 'En respondre es dibuixa el que es forma de debò: una dorsal, una vall de rift, una fossa amb volcans, un arc d’illes, una serralada plegada o una falla que parteix una carretera. I l’explicació explica on passa al món real.' })}</p>
              <p>{tr({ es: 'La clave está en qué placas se encuentran: la oceánica es más densa y se hunde bajo la continental (subducción) y ahí salen volcanes; dos continentales no se hunden, chocan y levantan montañas altísimas casi sin volcanes.', en: 'The key is which plates meet: oceanic crust is denser and sinks under continental crust (subduction), and that is where volcanoes appear; two continental plates do not sink, they collide and push up huge mountains with almost no volcanoes.', ca: 'La clau és quines plaques es troben: l’oceànica és més densa i s’enfonsa sota la continental (subducció) i allà surten volcans; dues continentals no s’enfonsen, xoquen i aixequen muntanyes altíssimes gairebé sense volcans.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Tienes los pies en tierra firme!' : '¡Ni un terremoto te mueve! 🌋',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'You are on solid ground!' : 'Not even an earthquake shakes you! 🌋',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Tens els peus a terra ferma!' : 'Ni un terratrèmol et mou! 🌋',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} bordes de placa en Placas en Movimiento de Tuthor 🌋 — ¿puedes superarme? https://tuthor.es/juegos/placas-movimiento`,
      en: `I got ${aciertos} plate boundaries right in Moving Plates on Tuthor 🌋 — can you beat me? https://tuthor.es/juegos/placas-movimiento`,
      ca: `He encertat ${aciertos} vores de placa a Plaques en Moviment de Tuthor 🌋 — em pots superar? https://tuthor.es/juegos/placas-movimiento`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="placas-movimiento" emoji="🌋" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaPlacas key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
