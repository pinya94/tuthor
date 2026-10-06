import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/formulacion'
import PreguntaFormula from '../components/formulacion/PreguntaFormula'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 4500 // da tiempo a ver el cruce de valencias

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Óxidos, hidruros y sales: qué tipo es y cuál es su fórmula', en: 'Oxides, hydrides and salts: what type it is and its formula', ca: 'Òxids, hidrurs i sals: quin tipus és i quina és la fórmula' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'También hidróxidos, y de la fórmula al nombre (Stock)', en: 'Hydroxides too, and from formula to name (Stock)', ca: 'També hidròxids, i de la fórmula al nom (Stock)' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Nombres por prefijos y oxoácidos (sulfúrico, nítrico…)', en: 'Prefix names and oxoacids (sulfuric, nitric…)', ca: 'Noms amb prefixos i oxoàcids (sulfúric, nítric…)' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[nombra-compuesto] los niveles de la pantalla no coinciden con NIVELES')
}

export default function NombraCompuesto() {
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
    setRonda(prev => genRonda(niv, { evitar: prev?.clave }))
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
        type: 'juego', game: 'nombra-compuesto', category: 'formulacion',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('nombra-compuesto', { score: pts }),
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
    title: tr({ es: 'Nombra el compuesto — Juego de formulación inorgánica', en: 'Name the Compound — Inorganic nomenclature game', ca: 'Anomena el compost — Joc de formulació inorgànica' }),
    desc: tr({
      es: 'Formulación inorgánica jugando: óxidos, hidruros, sales binarias, hidróxidos y oxoácidos. Del nombre a la fórmula y de la fórmula al nombre, con nomenclatura de Stock y por prefijos y el cruce de valencias. Gratis, para 3.º y 4.º de ESO.',
      en: 'Inorganic nomenclature as a game: oxides, hydrides, binary salts, hydroxides and oxoacids. From name to formula and formula to name, with Stock and prefix nomenclature and the valency swap. Free.',
      ca: 'Formulació inorgànica jugant: òxids, hidrurs, sals binàries, hidròxids i oxoàcids. Del nom a la fórmula i de la fórmula al nom, amb nomenclatura de Stock i amb prefixos i l’encreuament de valències. Gratis, per a 3r i 4t d’ESO.',
    }),
    path: '/juegos/nombra-compuesto',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="nombra-compuesto"
            badge={tr({ es: 'Química · Formulación', en: 'Chemistry · Nomenclature', ca: 'Química · Formulació' })}
            titulo={tr({ es: '🔣 Nombra el compuesto', en: '🔣 Name the Compound', ca: '🔣 Anomena el compost' })}
            sub={tr({ es: 'De nombre a fórmula y de fórmula a nombre, cruzando valencias', en: 'From name to formula and back, swapping valencies', ca: 'De nom a fórmula i de fórmula a nom, encreuant valències' })} />

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
              <p>{tr({ es: 'Sale el nombre de un compuesto y hay que elegir su fórmula, o al revés. El truco para escribir la fórmula es cruzar las valencias: el hierro(III) con el oxígeno (2) da Fe₂O₃; si los dos números se pueden simplificar, se simplifican (CaO, no Ca₂O₂).', en: 'The name of a compound appears and you pick its formula, or the other way round. The trick for writing the formula is to swap the valencies: iron(III) with oxygen (2) gives Fe₂O₃; if both numbers can be simplified, simplify them (CaO, not Ca₂O₂).', ca: 'Surt el nom d’un compost i cal triar-ne la fórmula, o al revés. El truc per escriure la fórmula és encreuar les valències: el ferro(III) amb l’oxigen (2) dona Fe₂O₃; si els dos nombres es poden simplificar, se simplifiquen (CaO, no Ca₂O₂).' })}</p>
              <p>{tr({ es: 'En la nomenclatura de Stock, el número romano es la valencia del metal y solo se escribe si tiene más de una (hierro(III), pero cloruro de sodio). Por prefijos se cuentan los átomos: trióxido de dihierro. En difícil entran los oxoácidos: -ico para la valencia mayor y -oso para la menor.', en: 'In Stock nomenclature, the Roman numeral is the metal’s valency and is only written if it has more than one (iron(III), but sodium chloride). With prefixes you count the atoms: diiron trioxide. On hard the oxoacids come in: -ic for the higher valency and -ous for the lower.', ca: 'En la nomenclatura de Stock, el nombre romà és la valència del metall i només s’escriu si en té més d’una (ferro(III), però clorur de sodi). Amb prefixos es compten els àtoms: triòxid de diferro. En difícil hi entren els oxoàcids: -ic per a la valència més gran i -ós per a la menor.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡La formulación ya no te asusta!' : '¡Formulas como la IUPAC! 🔣',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Nomenclature holds no fear for you!' : 'You name like IUPAC itself! 🔣',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'La formulació ja no et fa por!' : 'Formules com la IUPAC! 🔣',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} compuestos en Nombra el compuesto de Tuthor 🔣 — ¿puedes superarme? https://tuthor.es/juegos/nombra-compuesto`,
      en: `I got ${aciertos} compounds right in Tuthor’s Name the Compound 🔣 — can you beat me? https://tuthor.es/juegos/nombra-compuesto`,
      ca: `He encertat ${aciertos} compostos a Anomena el compost de Tuthor 🔣 — em pots superar? https://tuthor.es/juegos/nombra-compuesto`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="nombra-compuesto" emoji="🔣" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaFormula key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
