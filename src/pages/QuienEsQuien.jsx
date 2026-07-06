import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { PERSONAJES_TODOS, PERSONAJES_GCE, PERSONAJES_WWII, PERSONAJES_USA, PERSONAJES_GLOBAL, montarTablero, generarPistas } from '../data/personajes'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { saveActivity } from '../lib/activity'
import CoinsAnimation from '../components/CoinsAnimation'
import GameResultFooter from '../components/GameResultFooter'
import ShareButton from '../components/ShareButton'

const BOARD_SIZE = 12
const MAX_FALLOS = 2
const POOL_LABEL = {
  es: {
    gce: 'Guerra Civil Española', wwii: 'Segunda Guerra Mundial',
    usa: 'Independencia Americana', primaria: 'Personajes históricos de todas las épocas',
    global: 'Personajes históricos de todas las épocas',
  },
  en: {
    gce: 'Spanish Civil War', wwii: 'World War II',
    usa: 'American Independence', primaria: 'Historical figures from all eras',
    global: 'Historical figures from all eras',
  },
  ca: {
    gce: 'Guerra Civil Espanyola', wwii: 'Segona Guerra Mundial',
    usa: 'Independència Americana', primaria: 'Personatges històrics de totes les èpoques',
    global: 'Personatges històrics de totes les èpoques',
  },
}

const QUI = {
  es: {
    titulo: '¿Quién es Quién?', desc: 'Adivina el personaje secreto',
    pista: 'Pista', adivinar: 'Adivinar', tachar: 'Tachar',
    esPersonaje: '¿Es', correcto: '¡Correcto!', incorrecto: 'Incorrecto',
    era: 'Era', puntos: 'Puntos', intentos: 'Intentos',
    nuevaPartida: 'Nueva partida', volver: '← Volver',
    seleccionaParaAdivinar: 'Selecciona un personaje para adivinar',
    fallosRestantes: 'intentos restantes',
  },
  en: {
    titulo: 'Who is Who?', desc: 'Guess the secret figure',
    pista: 'Clue', adivinar: 'Guess', tachar: 'Cross out',
    esPersonaje: 'Is it', correcto: 'Correct!', incorrecto: 'Wrong',
    era: 'It was', puntos: 'Points', intentos: 'Attempts',
    nuevaPartida: 'New game', volver: '← Back',
    seleccionaParaAdivinar: 'Select a figure to guess',
    fallosRestantes: 'attempts left',
  },
  ca: {
    titulo: 'Qui és qui?', desc: 'Endevina el personatge secret',
    pista: 'Pista', adivinar: 'Endevinar', tachar: 'Ratlla',
    esPersonaje: 'És', correcto: 'Correcte!', incorrecto: 'Incorrecte',
    era: 'Era', puntos: 'Punts', intentos: 'Intents',
    nuevaPartida: 'Nova partida', volver: '← Tornar',
    seleccionaParaAdivinar: 'Selecciona un personatge per endevinar',
    fallosRestantes: 'intents restants',
  },
}

// ── AVATAR ────────────────────────────────────────────────────────────────────
function Avatar({ p, tachado, modoAdivinar, esSecreto, resultado, onClick }) {
  // resultado: null | 'correcto' | 'incorrecto' | 'revelado'
  const cursor = tachado ? 'cursor-default' : 'cursor-pointer'

  let overlay = null
  let opacidad = 'opacity-100'
  let escala = 'scale-100'
  let anillo = ''

  if (resultado === 'correcto') {
    anillo = 'ring-2 ring-green-400'
    escala = 'scale-110'
  } else if (resultado === 'incorrecto') {
    opacidad = 'opacity-40'
  } else if (resultado === 'revelado') {
    anillo = 'ring-2 ring-amber-400'
    escala = 'scale-105'
  } else if (tachado) {
    opacidad = 'opacity-20'
    overlay = (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg className="w-8 h-8 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <line x1="4" y1="4" x2="20" y2="20" /><line x1="20" y1="4" x2="4" y2="20" />
        </svg>
      </div>
    )
  } else if (modoAdivinar) {
    anillo = 'ring-2 ring-violet-400/60 hover:ring-violet-400'
    escala = 'hover:scale-105'
  } else {
    escala = 'hover:scale-105'
    opacidad = 'hover:opacity-90'
  }

  return (
    <div
      className={`relative rounded-xl shadow transition-all duration-200 select-none ${cursor} ${opacidad} ${escala} ${anillo}`}
      style={{ backgroundColor: p.color, width: '100%', paddingBottom: '100%' }}
      onClick={onClick}
    >
      <div style={{ position: 'absolute', inset: 0 }} className="flex flex-col items-center justify-center p-2 sm:p-3 overflow-hidden">
        {resultado === 'correcto' && <span className="text-2xl">✓</span>}
        {resultado === 'revelado' && <span className="text-2xl">★</span>}
        {resultado !== 'correcto' && resultado !== 'revelado' && (
          <p className="text-white font-bold text-center leading-tight" style={{ fontSize: 'clamp(7px, 1.1vw, 13px)', wordBreak: 'break-word' }}>
            {p.nombre}
          </p>
        )}
      </div>
      {overlay}
    </div>
  )
}

// ── INTRO ─────────────────────────────────────────────────────────────────────
function Intro({ pool, onStart, lang }) {
  const en = lang === 'en'
  const q = QUI[lang] || QUI.es
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <span className="text-6xl mb-4 block">🕵️</span>
          <h1 className="text-3xl font-black text-white mb-2">{q.titulo}</h1>
          <p className="text-white/50 text-sm">
            {(POOL_LABEL[lang] || POOL_LABEL.es)[pool] ?? pool}
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 space-y-4">
          {(lang === 'ca' ? [
            { icon: '🎴', title: 'Tauler de 12 personatges', desc: 'Cada partida, 12 figures diferents seleccionades a l\'atzar.' },
            { icon: '✂️', title: 'Ratlla els que descartis', desc: 'Toca un personatge per ratllar-lo. Toca\'l de nou per restaurar-lo. Descarta fins a quedar-te amb el correcte.' },
            { icon: '🧠', title: 'Només veus una pista alhora', desc: 'Cada pista nova substitueix l\'anterior — les hauràs de recordar! Com menys pistes necessitis, millor.' },
          ] : en ? [
            { icon: '🎴', title: 'Board of 12 figures', desc: 'Each game, 12 different figures selected at random.' },
            { icon: '✂️', title: 'Cross out to eliminate', desc: 'Tap a figure to cross them out. Tap again to restore. Eliminate until you find the right one.' },
            { icon: '🧠', title: 'One clue at a time', desc: "Each new clue replaces the last — you'll have to remember them! Fewer clues = better score." },
          ] : [
            { icon: '🎴', title: 'Tablero de 12 personajes', desc: 'Cada partida, 12 figuras distintas seleccionadas al azar.' },
            { icon: '✂️', title: 'Tacha a los que descartes', desc: 'Toca un personaje para tacharlo. Tócalo de nuevo para restaurarlo. Descarta hasta quedarte con el correcto.' },
            { icon: '🧠', title: 'Solo ves una pista a la vez', desc: 'Cada pista nueva sustituye a la anterior — ¡tendrás que recordarlas! Cuantas menos pistas necesites, mejor lo has hecho.' },
          ]).map(r => (
            <div key={r.title} className="flex items-start gap-4">
              <span className="text-2xl">{r.icon}</span>
              <div>
                <p className="text-white font-semibold text-sm">{r.title}</p>
                <p className="text-white/40 text-xs mt-0.5">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={onStart}
          className="w-full bg-violet-600 hover:bg-violet-500 text-white font-black text-lg py-4 rounded-2xl transition-all"
        >
          {lang === 'ca' ? 'Començar partida →' : en ? 'Start game →' : 'Empezar partida →'}
        </button>
      </div>
    </div>
  )
}

// ── RESULTADO ─────────────────────────────────────────────────────────────────
function Resultado({ ganó, secreto, pistaIdx, onRepetir, onSalir, lang }) {
  const en = lang === 'en'
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-sm w-full text-center">
        <span className="text-6xl block mb-4">{ganó ? '🎉' : '💀'}</span>
        <h2 className="text-2xl font-black text-white mb-1">{ganó ? '¡Correcto!' : 'Sin más intentos'}</h2>
        <p className="text-white/50 text-sm mb-6">
          El personaje era <span className="text-white font-bold">{secreto.nombre}</span>
        </p>
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-3 shadow-xl"
          style={{ backgroundColor: secreto.color }}
        >
          {secreto.iniciales}
        </div>
        <p className="text-white/40 text-xs italic px-4 mb-6">"{(lang === 'en' && secreto.pistaUnicaEn) || secreto.pistaUnica}"</p>
        {ganó && (
          <div className="rounded-2xl px-6 py-4 mb-6 border border-white/10" style={{ backgroundColor: '#EDAE4920', borderColor: '#EDAE4940' }}>
            <p className="text-3xl font-black" style={{ color: '#EDAE49' }}>
              {pistaIdx + 1} {pistaIdx === 0 ? 'pista' : 'pistas'}
            </p>
            <p className="text-white/40 text-xs mt-1">
              {pistaIdx === 0 ? '¡A la primera!' : pistaIdx === 1 ? 'Muy bien' : 'Lo conseguiste'}
            </p>
          </div>
        )}
        <div className="flex gap-3">
          <button onClick={onRepetir} className="flex-1 bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-xl transition-all">
            {lang === 'ca' ? 'Nova partida' : en ? 'New game' : 'Otra partida'}
          </button>
          <button onClick={onSalir} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 font-bold py-3 rounded-xl transition-all">
            {lang === 'ca' ? 'Sortir' : en ? 'Exit' : 'Salir'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── JUEGO ─────────────────────────────────────────────────────────────────────
export default function QuienEsQuien() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const { lang, localPath } = useLang()
  const en = lang === 'en'
  const q = QUI[lang] || QUI.es
  const { user }  = useAuth()
  const startRef  = useRef(Date.now())

  // Si venimos desde /estudiar/historia/gce usamos solo el pool GCE
  const poolKey  = location.state?.pool ?? 'global'
  const backPath = location.state?.backPath ?? '/juegos'
  const pool = poolKey === 'gce'      ? PERSONAJES_GCE
             : poolKey === 'wwii'     ? PERSONAJES_WWII
             : poolKey === 'usa'      ? PERSONAJES_USA
             : poolKey === 'primaria' ? PERSONAJES_GLOBAL
             : PERSONAJES_TODOS

  const TIME_START = 60
  const TIME_CORRECT = 15
  const TIME_FAIL = -10

  const [fase, setFase]         = useState('intro')
  const [tablero, setTablero]   = useState([])
  const [secreto, setSecreto]   = useState(null)
  const [pistas, setPistas]     = useState([])
  const [pistaIdx, setPistaIdx] = useState(0)
  const [tachados, setTachados] = useState(new Set())
  const [modoAdivinar, setModoAdivinar] = useState(false)
  const [fallos, setFallos]     = useState(0)
  const [ganó, setGanó]         = useState(false)
  const [resultados, setResultados] = useState({})
  const [animFallo, setAnimFallo]   = useState(false)
  const [popupFallo, setPopupFallo] = useState(null)
  const [popupConfirm, setPopupConfirm] = useState(null)

  // Timer & score state
  const [timeLeft, setTimeLeft]     = useState(TIME_START)
  const [puntos, setPuntos]         = useState(0)
  const [rondas, setRondas]         = useState(0)
  const [combo, setCombo]           = useState(0)
  const [levelKey, setLevelKey]     = useState(0)
  const timerRef = useRef(null)
  const timeRef  = useRef(TIME_START)

  // Timer
  useEffect(() => {
    if (fase !== 'jugando') return
    timerRef.current = setInterval(() => {
      timeRef.current -= 1
      setTimeLeft(timeRef.current)
      if (timeRef.current <= 0) {
        clearInterval(timerRef.current)
        if (user && puntos > 0) {
          saveActivity(user.uid, { type: 'juego', game: 'quien-es-quien', category: poolKey, score: puntos, passed: rondas > 0, timeSpent: 0 }).catch(() => {})
        }
        setFase('fin')
      }
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [fase, levelKey])

  function startGame() {
    timeRef.current = TIME_START
    setTimeLeft(TIME_START)
    setPuntos(0)
    setRondas(0)
    setCombo(0)
    nuevaRonda()
    setFase('jugando')
    setLevelKey(k => k + 1)
  }

  function nuevaRonda() {
    const t = montarTablero(pool, BOARD_SIZE)
    const s = t[Math.floor(Math.random() * t.length)]
    setTablero(t)
    setSecreto(s)
    setPistas(generarPistas(s, t, lang))
    setPistaIdx(0)
    setTachados(new Set())
    setModoAdivinar(false)
    setFallos(0)
    setGanó(false)
    setResultados({})
    setAnimFallo(false)
    setPopupFallo(null)
    setPopupConfirm(null)
  }

  // Legacy compat
  function iniciarPartida() { startGame() }

  function toggleTachado(p) {
    if (modoAdivinar) return
    if (resultados[p.id]) return
    setTachados(prev => {
      const next = new Set(prev)
      if (next.has(p.id)) next.delete(p.id)
      else next.add(p.id)
      return next
    })
  }

  function adivinar(p) {
    if (resultados[p.id]) return // ya tiene resultado, ignorar

    // Si estaba tachado, lo destachamos antes de adivinar
    if (tachados.has(p.id)) {
      setTachados(prev => { const n = new Set(prev); n.delete(p.id); return n })
    }

    if (p.id === secreto.id) {
      setGanó(true)
      setModoAdivinar(false)
      setResultados(prev => ({ ...prev, [p.id]: 'correcto' }))
      // Points: fewer clues = more points
      const pts = Math.max(50, 300 - pistaIdx * 50) + combo * 25
      setPuntos(prev => prev + pts)
      setRondas(r => r + 1)
      setCombo(c => c + 1)
      // Add time
      timeRef.current = Math.max(0, timeRef.current + TIME_CORRECT)
      setTimeLeft(timeRef.current)
      setTimeout(() => nuevaRonda(), 1200)
    } else {
      const nuevosFallos = fallos + 1
      setFallos(nuevosFallos)
      setResultados(prev => ({ ...prev, [p.id]: 'incorrecto' }))
      setAnimFallo(true)
      setTimeout(() => setAnimFallo(false), 600)

      setTimeout(() => {
        setResultados(prev => { const n = { ...prev }; delete n[p.id]; return n })
        setTachados(prev => { const n = new Set(prev); n.add(p.id); return n })

        if (nuevosFallos >= MAX_FALLOS) {
          setModoAdivinar(false)
          setResultados(prev => ({ ...prev, [secreto.id]: 'revelado' }))
          setCombo(0)
          timeRef.current = Math.max(0, timeRef.current + TIME_FAIL)
          setTimeLeft(timeRef.current)
          if (timeRef.current <= 0) {
            clearInterval(timerRef.current)
            if (user && puntos > 0) saveActivity(user.uid, { type: 'juego', game: 'quien-es-quien', category: poolKey, score: puntos, passed: rondas > 0, timeSpent: 0 }).catch(() => {})
            setTimeout(() => setFase('fin'), 1200)
          } else {
            setTimeout(() => nuevaRonda(), 1500)
          }
        } else {
          // Tras fallo: mostrar popup para que elija otra
          setPopupFallo({ fallosRestantes: MAX_FALLOS - nuevosFallos })
        }
      }, 800)
    }
  }

  function siguientePista() {
    const idx = pistaIdx + 1
    setPistaIdx(idx)
    setModoAdivinar(false)
  }

  if (fase === 'intro') return <Intro pool={poolKey} onStart={startGame} lang={lang} />
  if (fase === 'fin') {
    const shareText = `🕵️ ${lang === 'ca' ? 'Qui és qui' : en ? 'Who is Who' : '¿Quién es Quién?'}: ${rondas} ${lang === 'ca' ? 'rondes' : en ? 'rounds' : 'rondas'} · ${puntos.toLocaleString()} pts\n🎮 https://www.tuthor.es/juegos/quien-es-quien`
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-6">
        <div className="max-w-lg w-full">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center mb-5">
            <div className="text-6xl mb-3">🕵️</div>
            <h2 className="text-3xl font-black text-white mb-1">{lang === 'ca' ? 'S\'ha acabat el temps!' : en ? 'Time is up!' : '¡Tiempo agotado!'}</h2>
            <div className="mb-4 mt-6">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-1">{lang === 'ca' ? 'Puntuació' : en ? 'Score' : 'Puntuación'}</p>
              <p className="text-white font-black text-6xl tabular-nums">{puntos.toLocaleString()}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/40 text-xs mb-1">{lang === 'ca' ? 'Rondes' : en ? 'Rounds' : 'Rondas'}</p>
                <p className="text-white font-black text-3xl">{rondas}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/40 text-xs mb-1">{lang === 'ca' ? 'Millor ratxa' : en ? 'Best streak' : 'Mejor racha'}</p>
                <p className="text-white font-black text-3xl">{combo}</p>
              </div>
            </div>
            {puntos > 0 && <CoinsAnimation points={puntos} />}
            <GameResultFooter game="quien-es-quien" score={puntos} user={user} lang={lang} />
          </div>
          <div className="space-y-3">
            <ShareButton text={shareText} lang={lang} />
            <button onClick={startGame}
              className="w-full bg-[#EDAE49] hover:bg-amber-400 text-black font-black py-4 text-lg rounded-xl transition">
              {lang === 'ca' ? 'Tornar-ho a provar' : en ? 'Try again' : 'Intentarlo de nuevo'}
            </button>
            <button onClick={() => navigate(localPath(backPath))}
              className="w-full text-white/40 hover:text-white/70 text-sm py-2 transition">
              {lang === 'ca' ? '← Tornar' : en ? '← Back' : '← Volver'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const activosCount = tablero.filter(p => !tachados.has(p.id) && !resultados[p.id]).length
  const hayMasPistas = pistaIdx < pistas.length - 1

  return (
    <div className={`relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-2 sm:px-6 py-3 transition-all ${animFallo ? 'brightness-50' : ''}`}>

      {/* Popup confirmación último restante */}
      {popupConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="bg-[#0d0d1a] border border-white/10 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
            <span className="text-5xl block mb-3">🤔</span>
            <h3 className="text-white font-black text-xl mb-1">Parece que apuntas a…</h3>
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-black text-lg mx-auto my-3 shadow-lg"
              style={{ backgroundColor: popupConfirm.color }}
            >
              {popupConfirm.iniciales}
            </div>
            <p className="text-white font-bold text-lg mb-1">{popupConfirm.nombre}</p>
            <p className="text-white/40 text-sm mb-5">¿Quieres comprobarlo?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setPopupConfirm(null)}
                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 font-bold py-3 rounded-xl transition-all"
              >
                {lang === 'ca' ? 'Cancel·lar' : en ? 'Cancel' : 'Cancelar'}
              </button>
              <button
                onClick={() => { setPopupConfirm(null); adivinar(popupConfirm) }}
                className="flex-1 font-black py-3 rounded-xl text-black"
                style={{ backgroundColor: '#EDAE49' }}
              >
                {lang === 'ca' ? 'Comprovar' : en ? 'Confirm' : 'Comprobar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup tras fallo */}
      {popupFallo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="bg-[#0d0d1a] border border-white/10 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
            <span className="text-5xl block mb-3">❌</span>
            <h3 className="text-white font-black text-xl mb-1">{q.incorrecto}!</h3>
            <p className="text-white/40 text-sm mb-5">
              {lang === 'ca'
                ? (popupFallo.fallosRestantes === 1 ? 'Et queda 1 intent. Pensa-ho bé!' : `Et queden ${popupFallo.fallosRestantes} intents.`)
                : en
                ? `${popupFallo.fallosRestantes} ${popupFallo.fallosRestantes === 1 ? 'attempt' : 'attempts'} left.`
                : popupFallo.fallosRestantes === 1
                  ? 'Te queda 1 intento. ¡Piénsalo bien!'
                  : `Te quedan ${popupFallo.fallosRestantes} intentos.`}
            </p>
            <button
              onClick={() => { setPopupFallo(null); setModoAdivinar(true) }}
              className="w-full font-black py-3 rounded-xl text-black text-base"
              style={{ backgroundColor: '#EDAE49' }}
            >
              {lang === 'ca' ? 'Triar un altre personatge →' : en ? 'Pick another figure →' : 'Elegir otro personaje →'}
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-1">
        <button onClick={() => setFase('intro')} className="text-white/40 hover:text-white/70 text-sm transition-colors">
          {lang === 'ca' ? '← Sortir' : en ? '← Exit' : '← Salir'}
        </button>
        <div className="flex items-center gap-3 text-sm text-white/50">
          {combo >= 2 && <span className="text-amber-400 font-bold">🔥 ×{combo}</span>}
          <span className="text-white font-bold tabular-nums">{puntos.toLocaleString()} pts</span>
          <span className="text-white/30">🕵️ {rondas}</span>
        </div>
      </div>

      {/* Timer */}
      <div className="mb-2 px-1">
        <div className="flex justify-between text-xs text-white/40 mb-1">
          <span>{lang === 'ca' ? 'Temps' : en ? 'Time' : 'Tiempo'}</span>
          <span className={`font-bold tabular-nums ${timeLeft <= 10 ? 'text-red-400' : ''}`}>{timeLeft}s</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 ${timeLeft > 20 ? 'bg-green-400' : timeLeft > 10 ? 'bg-yellow-400' : 'bg-red-500 animate-pulse'}`}
            style={{ width: `${Math.min(100, (timeLeft / TIME_START) * 100)}%` }} />
        </div>
      </div>

      {/* Lives + count */}
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-white/40 text-xs">{activosCount} {lang === 'ca' ? 'sense ratllar' : en ? 'remaining' : 'sin tachar'}</span>
        <div className="flex gap-1">
          {Array.from({ length: MAX_FALLOS }).map((_, i) => (
            <span key={i} className={`text-lg transition-opacity ${i < fallos ? 'opacity-20' : ''}`}>❤️</span>
          ))}
        </div>
      </div>

      {/* Tablero — ocupa todo el ancho disponible */}
      <div className={`border rounded-2xl p-3 sm:p-4 transition-all flex-1 flex flex-col gap-3 ${modoAdivinar ? 'border-violet-500/50 bg-violet-900/10' : 'border-white/10 bg-white/5'}`}>

        {modoAdivinar && (
          <p className="text-violet-300 text-xs text-center font-semibold">
            {lang === 'ca' ? '👆 Toca qualsevol personatge per endevinar (fins i tot els ratllats)' : en ? '👆 Tap any figure to guess (even crossed-out ones)' : '👆 Toca cualquier personaje para adivinar (incluso los tachados)'}
          </p>
        )}

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 sm:gap-5 justify-items-center flex-1">
          {tablero.map(p => (
            <Avatar
              key={p.id}
              p={p}
              tachado={tachados.has(p.id)}
              modoAdivinar={modoAdivinar && !resultados[p.id]}
              esSecreto={p.id === secreto?.id}
              resultado={resultados[p.id] ?? null}
              onClick={() => {
                if (resultados[p.id]) return
                if (modoAdivinar) adivinar(p)
                else toggleTachado(p)
              }}
            />
          ))}
        </div>

        {/* Pista actual */}
        {pistas[pistaIdx] && (
          <div className={`flex items-start gap-3 rounded-xl px-4 py-3 border text-white text-sm sm:text-base ${
            pistas[pistaIdx].negativa
              ? 'border-red-500/40 bg-red-900/20'
              : 'border-violet-500/40 bg-violet-600/20'
          }`}>
            <span className={`font-black shrink-0 text-xs mt-0.5 ${pistas[pistaIdx].negativa ? 'text-red-400' : 'text-violet-400'}`}>
              {pistas[pistaIdx].negativa ? '✕' : `#${pistaIdx + 1}`}
            </span>
            <span className="leading-relaxed">{pistas[pistaIdx].texto}</span>
          </div>
        )}
        {pistaIdx > 0 && (
          <p className="text-white/25 text-xs text-center -mt-1">
            {lang === 'ca' ? `${pistaIdx} pista${pistaIdx > 1 ? 'es' : ''} anterior${pistaIdx > 1 ? 's' : ''} — recorda-les!` : en ? `${pistaIdx} previous clue${pistaIdx > 1 ? 's' : ''} — remember them!` : `${pistaIdx} pista${pistaIdx > 1 ? 's' : ''} anterior${pistaIdx > 1 ? 'es' : ''} — ¡recuérdalas!`}
          </p>
        )}

        {/* Acciones */}
        <div className="flex gap-2">
          {(() => {
            if (ganó) return null
            const unicoRestante = activosCount === 1
              ? tablero.find(p => !tachados.has(p.id) && !resultados[p.id])
              : null

            // Queda solo uno — confirmar directamente
            if (unicoRestante) return (
              <button
                onClick={() => setPopupConfirm(unicoRestante)}
                className="flex-1 font-black py-3 sm:py-4 rounded-xl transition-all text-black text-base"
                style={{ backgroundColor: '#EDAE49' }}
              >
                {lang === 'ca' ? `És ${unicoRestante.nombre}?` : en ? `Is it ${unicoRestante.nombre}?` : `¿Es ${unicoRestante.nombre}?`}
              </button>
            )

            // Modo adivinar activo — cancelar o pedir nueva pista
            if (modoAdivinar) return (
              <>
                {hayMasPistas && (
                  <button
                    onClick={() => { siguientePista() }}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white font-medium px-5 py-3 rounded-xl transition-all whitespace-nowrap"
                  >
                    💡 {lang === 'ca' ? `Pista ${pistaIdx + 2}` : en ? `Clue ${pistaIdx + 2}` : `Pista ${pistaIdx + 2}`}
                  </button>
                )}
                <button
                  onClick={() => setModoAdivinar(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 font-medium py-3 rounded-xl transition-all text-sm"
                >
                  {lang === 'ca' ? 'Cancel·lar' : en ? 'Cancel' : 'Cancelar'}
                </button>
              </>
            )

            // Normal — nueva pista + adivinar
            if (hayMasPistas) return (
              <>
                <button
                  onClick={siguientePista}
                  className="flex-1 font-black py-3 sm:py-4 rounded-xl transition-all text-black text-base"
                  style={{ backgroundColor: '#EDAE49' }}
                >
                  {lang === 'ca' ? '💡 Nova pista' : en ? '💡 Next clue' : '💡 Nueva pista'}
                </button>
                <button
                  onClick={() => setModoAdivinar(true)}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white font-medium px-5 py-3 rounded-xl transition-all whitespace-nowrap"
                >
                  🎯 {lang === 'ca' ? 'Endevinar' : en ? 'Guess' : 'Adivinar'}
                </button>
              </>
            )

            // Sin más pistas — solo adivinar
            return (
              <button
                onClick={() => setModoAdivinar(true)}
                className="flex-1 font-black py-3 sm:py-4 rounded-xl transition-all text-black text-base"
                style={{ backgroundColor: '#EDAE49' }}
              >
                🎯 {lang === 'ca' ? 'Endevinar' : en ? 'Guess' : 'Adivinar'}
              </button>
            )
          })()}
        </div>

      </div>
    </div>
  )
}
