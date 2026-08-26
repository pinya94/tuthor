import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { nuevoMazo, CENTROS, evaluarLanzamiento } from '../lib/orbita'
import { PLANETAS } from '../data/planetas'
import GameEndScreen from '../components/GameEndScreen'
import SupportBlock from '../components/SupportBlock'
import SEOHead from '../components/SEOHead'
import BarraOrbita from '../components/BarraOrbita'

// Roguelike corto y cerrado: 8 rondas como máximo (un lanzamiento por
// planeta, sin repetir). Sin reloj ni sonda animada: el jugador arrastra el
// slider a su ritmo y confirma cuando esté seguro — el reto es SABER dónde
// está el planeta, no ser rápido de dedos (mismo slider deliberado que
// epocasHistoricas.js, sin la parte de reflejos). Las posiciones de los
// planetas no se enseñan hasta después de lanzar.
const VIDAS_INICIALES = 3
const SLIDER_MAX = 1000
const IDX = Object.fromEntries(PLANETAS.map((p, i) => [p.id, i]))

const UI = {
  es: {
    titulo: 'Órbita',
    desc: 'Decide a qué distancia del Sol crees que está el planeta pedido y lanza la sonda. Cuanto más precisa, más puntos. Si aciertas la zona de otro planeta, pierdes una vida.',
    volver: '← Volver', empezar: '¡Empezar misión! →',
    comoFunciona: 'Cómo funciona',
    paso1: 'Arrastra el slider a lo largo de la barra: representa la distancia al Sol',
    paso2: 'Sin prisa ni reloj — decide dónde crees que está el planeta pedido y confirma',
    paso3: 'Cuanto más cerca del centro real, más puntos. Fuera de su zona, pierdes una vida',
    paso4: `Tienes ${VIDAS_INICIALES} vidas — la misión acaba si se agotan o al lanzar a los 8 planetas`,
    salir: '← Salir',
    lanzar: '🚀 ¡Lanzar aquí!',
    objetivo: 'Envía la sonda a:',
    perfecto: '¡Órbita perfecta!', orbita: 'En órbita', fallo: 'Fuera de órbita',
    siguiente: 'Siguiente planeta →', verResultado: 'Ver resultado →',
    finPartida: 'Misión terminada', reintentar: '🚀 Nueva misión', volverMenu: '← Volver al menú',
    planetasLbl: 'Planetas', rachaLbl: 'Mejor racha',
    examen: 'Examen con la mecánica del juego →',
    cerca: 'Sol', lejos: 'Muy lejos',
  },
  en: {
    titulo: 'Orbit',
    desc: 'Decide how far from the Sun you think the requested planet is and launch the probe. The more precise, the more points. Land on another planet\'s zone and you lose a life.',
    volver: '← Back', empezar: 'Start mission! →',
    comoFunciona: 'How it works',
    paso1: 'Drag the slider along the bar: it represents the distance to the Sun',
    paso2: 'No rush, no clock — decide where you think the requested planet is and confirm',
    paso3: 'The closer to the real centre, the more points. Outside its zone, you lose a life',
    paso4: `You have ${VIDAS_INICIALES} lives — the mission ends when they run out, or once you have launched to all 8 planets`,
    salir: '← Exit',
    lanzar: '🚀 Launch here!',
    objetivo: 'Send the probe to:',
    perfecto: 'Perfect orbit!', orbita: 'In orbit', fallo: 'Off course',
    siguiente: 'Next planet →', verResultado: 'See result →',
    finPartida: 'Mission over', reintentar: '🚀 New mission', volverMenu: '← Back to menu',
    planetasLbl: 'Planets', rachaLbl: 'Best streak',
    examen: 'Exam using the game mechanic →',
    cerca: 'Sun', lejos: 'Very far',
  },
  ca: {
    titulo: 'Òrbita',
    desc: 'Decideix a quina distància del Sol creus que és el planeta demanat i llança la sonda. Com més precisa, més punts. Si encertes la zona d\'un altre planeta, perds una vida.',
    volver: '← Enrere', empezar: 'Comença la missió! →',
    comoFunciona: 'Com funciona',
    paso1: 'Arrossega el slider al llarg de la barra: representa la distància al Sol',
    paso2: 'Sense presses ni rellotge — decideix on creus que és el planeta demanat i confirma',
    paso3: 'Com més a prop del centre real, més punts. Fora de la seva zona, perds una vida',
    paso4: `Tens ${VIDAS_INICIALES} vides — la missió acaba si s'acaben o en llançar als 8 planetes`,
    salir: '← Sortir',
    lanzar: '🚀 Llança aquí!',
    objetivo: 'Envia la sonda a:',
    perfecto: 'Òrbita perfecta!', orbita: 'En òrbita', fallo: 'Fora d\'òrbita',
    siguiente: 'Planeta següent →', verResultado: 'Veure resultat →',
    finPartida: 'Missió acabada', reintentar: '🚀 Nova missió', volverMenu: '← Torna al menú',
    planetasLbl: 'Planetes', rachaLbl: 'Millor ratxa',
    examen: 'Examen amb la mecànica del joc →',
    cerca: 'Sol', lejos: 'Molt lluny',
  },
}

// ── Fila de planetas en orden (referencia visual, resalta el objetivo) ──────
function FilaPlanetas({ objetivoId, l }) {
  return (
    <div className="flex justify-between gap-1 w-full mb-1">
      {PLANETAS.map((p, i) => {
        const activo = p.id === objetivoId
        return (
          <div key={p.id}
            className={`flex-1 flex flex-col items-center py-1.5 rounded-lg border text-center transition-all ${
              activo ? 'bg-[#EDAE49]/15 border-[#EDAE49]/50 scale-105' : 'bg-white/5 border-white/10 opacity-50'
            }`}>
            <span className={`text-[8px] sm:text-[9px] font-bold ${activo ? 'text-[#EDAE49]' : 'text-white/25'}`}>{i + 1}</span>
            <span className="text-base sm:text-lg leading-none">{p.emoji}</span>
            <span className={`text-[9px] sm:text-[10px] mt-0.5 font-semibold ${activo ? 'text-[#EDAE49]' : 'text-white/40'}`}>
              {(p.nombre[l] ?? p.nombre.es).slice(0, 4)}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default function Orbita() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const { user } = useAuth()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const t = UI[l]

  const [fase, setFase]     = useState('intro') // intro | jugando | resultado | fin
  const [cola, setCola]     = useState([])
  const [planeta, setPlaneta] = useState(null)
  const [vidas, setVidas]   = useState(VIDAS_INICIALES)
  const [puntos, setPuntos] = useState(0)
  const [racha, setRacha]   = useState(0)
  const [mejorRacha, setMejorRacha] = useState(0)
  const [rondas, setRondas] = useState(0)
  const [sliderVal, setSliderVal] = useState(Math.round(SLIDER_MAX / 2))
  const [feedback, setFeedback] = useState(null)
  const [saved, setSaved]   = useState(false)

  const gameStartRef = useRef(null)
  const pos = sliderVal / (SLIDER_MAX / 100) // 0-100

  function iniciar() {
    const mazo = nuevoMazo()
    setPlaneta(mazo[0])
    setCola(mazo.slice(1))
    setVidas(VIDAS_INICIALES)
    setPuntos(0)
    setRacha(0)
    setMejorRacha(0)
    setRondas(0)
    setFeedback(null)
    setSaved(false)
    setSliderVal(Math.round(SLIDER_MAX / 2))
    setFase('jugando')
    gameStartRef.current = Date.now()
  }

  // Guardar actividad al terminar la misión.
  useEffect(() => {
    if (fase !== 'fin' || saved || !user) return
    setSaved(true)
    const timeSpent = gameStartRef.current ? Math.round((Date.now() - gameStartRef.current) / 1000) : 0
    saveActivity(user.uid, {
      type: 'juego', game: 'orbita', category: 'geologia',
      score: puntos, passed: rondas >= 5, timeSpent,
      coinsEarned: computeCoins('orbita', { score: puntos }),
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fase])

  function lanzar() {
    if (fase !== 'jugando' || !planeta) return
    const objetivoIdx = IDX[planeta.id]
    const resultado = evaluarLanzamiento(pos, objetivoIdx)
    const gano = resultado !== 'fallo'
    const base = resultado === 'perfecto' ? 100 : resultado === 'orbita' ? 50 : 0
    const bonus = resultado === 'perfecto' ? Math.min(racha * 10, 50) : 0
    const pts = base + bonus
    const nuevaRacha = resultado === 'perfecto' ? racha + 1 : 0
    const vidasRestantes = gano ? vidas : vidas - 1

    if (gano) setPuntos(p => p + pts)
    setRondas(r => r + 1)
    setRacha(nuevaRacha)
    setMejorRacha(m => Math.max(m, nuevaRacha))
    setVidas(vidasRestantes)
    setFeedback({ resultado, pts, vidasRestantes, planeta, posLanzada: pos, objetivoIdx })
    setFase('resultado')
  }

  function siguiente() {
    if (feedback && feedback.vidasRestantes <= 0) { setFase('fin'); return }
    if (cola.length === 0) { setFase('fin'); return } // los 8 planetas ya lanzados
    setPlaneta(cola[0])
    setCola(cola.slice(1))
    setFeedback(null)
    setSliderVal(Math.round(SLIDER_MAX / 2))
    setFase('jugando')
  }

  const seo = {
    es: { title: 'Órbita — Lanza la sonda al planeta correcto', desc: 'Decide a qué distancia del Sol está cada planeta y lanza la sonda. Aprende el orden y la distancia de los 8 planetas jugando, sin reloj ni reflejos. Juego de geología gratis.', path: '/juegos/orbita' },
    en: { title: 'Orbit — Launch the probe to the right planet', desc: "Decide how far from the Sun each planet is and launch the probe. Learn the order and distance of the 8 planets by playing, no clock or reflexes needed. Free geology game.", path: '/en/juegos/orbita' },
    ca: { title: 'Òrbita — Llança la sonda al planeta correcte', desc: 'Decideix a quina distància del Sol és cada planeta i llança la sonda. Aprèn l\'ordre i la distància dels 8 planetes jugant, sense rellotge ni reflexos. Joc de geologia gratis.', path: '/ca/juegos/orbita' },
  }[l]

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (fase === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />
        <div className="max-w-xl w-full flex flex-col items-center">
          <button onClick={() => navigate(localPath('/juegos'))}
            className="text-white/30 hover:text-white/60 text-sm mb-6 flex items-center gap-1 transition-colors">
            {t.volver}
          </button>

          <SupportBlock variant="top" className="mb-5 w-full" />

          <div className="text-center mb-7">
            <span className="text-7xl block mb-4">🛰️</span>
            <h1 className="text-4xl font-black text-white mb-2">{t.titulo}</h1>
            <p className="text-white/40">{t.desc}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5 w-full">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{t.comoFunciona}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                ['↔️', t.paso1],
                ['🤔', t.paso2],
                ['🎯', t.paso3],
                ['❤️', t.paso4],
              ].map(([e, txt]) => (
                <div key={txt} className="flex items-start gap-2 text-sm text-white/50">
                  <span className="text-base w-5 shrink-0 text-center">{e}</span>
                  <span>{txt}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={iniciar}
            className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/30 mb-3">
            {t.empezar}
          </button>
          <button onClick={() => navigate(localPath('/examen/orbita-test'))}
            className="text-white/30 hover:text-white/60 text-sm transition-colors">
            {t.examen}
          </button>
        </div>
      </div>
    )
  }

  // ── JUGANDO ────────────────────────────────────────────────────────────────
  if (fase === 'jugando' && planeta) {
    return (
      <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 md:px-8 py-5 max-w-2xl mx-auto w-full">
        <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setFase('intro')} className="text-white/40 hover:text-white/70 text-sm transition-colors">
            {t.salir}
          </button>
          <div className="flex items-center gap-3 text-sm text-white/50">
            {racha >= 2 && <span className="text-amber-400 font-bold">🔥 ×{racha}</span>}
            <span className="text-white font-bold tabular-nums">{puntos.toLocaleString()} pts</span>
            <span className="flex gap-0.5">
              {Array.from({ length: VIDAS_INICIALES }).map((_, i) => (
                <span key={i} className={i < vidas ? '' : 'opacity-20'}>❤️</span>
              ))}
            </span>
          </div>
        </div>

        <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-1">{t.objetivo}</p>
        <p className="text-center text-2xl font-black text-white mb-5">
          {planeta.emoji} {planeta.nombre[l] ?? planeta.nombre.es}
        </p>

        <BarraOrbita pos={pos} objetivoIdx={null} resultado={null} />

        <input
          type="range" min={0} max={SLIDER_MAX} value={sliderVal}
          onChange={e => setSliderVal(Number(e.target.value))}
          className="w-full mt-4 accent-[#EDAE49]"
        />
        <div className="flex justify-between text-[10px] text-white/30 uppercase tracking-widest px-0.5 mb-2">
          <span>{t.cerca}</span>
          <span>{t.lejos}</span>
        </div>

        <button onClick={lanzar}
          className="w-full mt-3 py-5 rounded-2xl bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-xl transition-all hover:scale-[1.02] active:scale-[0.97] shadow-lg shadow-amber-500/20">
          {t.lanzar}
        </button>
      </div>
    )
  }

  // ── RESULTADO ──────────────────────────────────────────────────────────────
  if (fase === 'resultado' && feedback) {
    const { resultado, pts, vidasRestantes, planeta: p, posLanzada, objetivoIdx } = feedback
    const color = resultado === 'perfecto' ? 'text-green-400' : resultado === 'orbita' ? 'text-yellow-400' : 'text-red-400'
    return (
      <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 md:px-8 py-5 max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4 text-sm text-white/50">
          <span className="text-white font-bold tabular-nums">{puntos.toLocaleString()} pts</span>
          <span className="flex gap-0.5">
            {Array.from({ length: VIDAS_INICIALES }).map((_, i) => (
              <span key={i} className={i < vidas ? '' : 'opacity-20'}>❤️</span>
            ))}
          </span>
        </div>

        <p className={`text-center text-2xl font-black mb-1 ${color}`}>
          {t[resultado]} {resultado !== 'fallo' && pts > 0 && `· +${pts}`}
        </p>
        <p className="text-center text-white/40 text-sm mb-4">
          {t.objetivo} {p.emoji} {p.nombre[l] ?? p.nombre.es}
        </p>

        <FilaPlanetas objetivoId={p.id} l={l} />
        <BarraOrbita pos={posLanzada} objetivoIdx={objetivoIdx} resultado={resultado} />

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mt-4 text-sm text-white/60 leading-relaxed">
          {p.dato[l] ?? p.dato.es}
        </div>

        <button onClick={siguiente}
          className="w-full mt-5 py-4 rounded-2xl bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg transition-all hover:scale-[1.02]">
          {vidasRestantes <= 0 || cola.length === 0 ? t.verResultado : t.siguiente}
        </button>
      </div>
    )
  }

  // ── FIN ────────────────────────────────────────────────────────────────────
  if (fase === 'fin') {
    const emoji = rondas >= 8 ? '🏆' : rondas >= 5 ? '🛰️' : rondas >= 3 ? '🚀' : '☄️'
    const shareText = l === 'en'
      ? `I launched ${rondas} probes and scored ${puntos.toLocaleString()} pts in Orbit 🛰️ — can you beat me? https://tuthor.es/juegos/orbita`
      : l === 'ca'
      ? `He llançat ${rondas} sondes i he fet ${puntos.toLocaleString()} pts a Òrbita 🛰️ — pots superar-me? https://tuthor.es/juegos/orbita`
      : `He lanzado ${rondas} sondas y conseguido ${puntos.toLocaleString()} pts en Órbita 🛰️ — ¿puedes superarme? https://tuthor.es/juegos/orbita`
    return (
      <GameEndScreen
        game="orbita"
        emoji={emoji}
        title={t.finPartida}
        score={puntos}
        stats={[
          { label: t.planetasLbl, value: `${rondas}/8`, emoji: '🛰️' },
          { label: t.rachaLbl, value: `×${mejorRacha}`, emoji: '🔥' },
        ]}
        shareText={shareText}
        onPlayAgain={iniciar}
        playAgainLabel={t.reintentar}
        secondaryActions={[{ label: t.volverMenu, onClick: () => setFase('intro') }]}
        user={user} lang={l}
      />
    )
  }

  return null
}
