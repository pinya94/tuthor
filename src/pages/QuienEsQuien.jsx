import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PERSONAJES_GCE, montarTablero, generarPistas } from '../data/personajes'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'

const BOARD_SIZE   = 12
const MAX_INTENTOS = 2   // fallos antes de game over
const PTS_PISTA    = [300, 200, 100, 50]  // puntos según pista en la que aciertas

// ── AVATAR ────────────────────────────────────────────────────────────────────
function Avatar({ p, estado, onClick }) {
  // estado: 'activo' | 'eliminado' | 'seleccionado' | 'correcto' | 'incorrecto'
  const base = 'relative flex flex-col items-center gap-1.5 cursor-pointer transition-all duration-300 select-none'
  const ring = {
    activo:     'opacity-100 scale-100',
    eliminado:  'opacity-20 scale-95 pointer-events-none',
    seleccionado:'opacity-100 scale-105 ring-2 ring-violet-400 rounded-2xl',
    correcto:   'opacity-100 scale-110 ring-2 ring-green-400 rounded-2xl',
    incorrecto: 'opacity-40 scale-95',
  }[estado] ?? 'opacity-100'

  return (
    <div className={`${base} ${ring} p-1`} onClick={onClick}>
      <div
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white font-black text-sm sm:text-base shadow-lg"
        style={{ backgroundColor: p.color }}
      >
        {estado === 'correcto'   && <span className="text-xl">✓</span>}
        {estado === 'incorrecto' && <span className="text-xl">✗</span>}
        {estado !== 'correcto' && estado !== 'incorrecto' && p.iniciales}
      </div>
      <p className="text-white/70 text-[10px] text-center leading-tight w-14 sm:w-16 line-clamp-2">
        {p.nombre.split(' ').slice(0, 2).join(' ')}
      </p>
    </div>
  )
}

// ── INTRO ─────────────────────────────────────────────────────────────────────
function Intro({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <span className="text-6xl mb-4 block">🕵️</span>
          <h1 className="text-3xl font-black text-white mb-2">¿Quién es quién?</h1>
          <p className="text-white/50 text-sm">Adivina el personaje histórico con las mínimas pistas</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 space-y-4">
          {[
            { icon: '🎴', title: 'Tablero de 12 personajes', desc: 'Cada partida, 12 figuras históricas distintas de la Guerra Civil Española.' },
            { icon: '💡', title: 'Pistas dinámicas', desc: 'Cada pista elimina un grupo del tablero. El mismo personaje siempre tiene pistas distintas según con quién comparta tablero.' },
            { icon: '⚡', title: 'Cuanto antes aciertes, más puntos', desc: 'Pista 1 → 300 pts · Pista 2 → 200 · Pista 3 → 100 · Pista final → 50. Dos fallos y pierdes.' },
          ].map(r => (
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
          Empezar partida →
        </button>
      </div>
    </div>
  )
}

// ── RESULTADO ─────────────────────────────────────────────────────────────────
function Resultado({ ganó, secreto, puntos, onRepetir, onSalir }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-sm w-full text-center">
        <span className="text-6xl block mb-4">{ganó ? '🎉' : '💀'}</span>
        <h2 className="text-2xl font-black text-white mb-1">{ganó ? '¡Correcto!' : 'Sin más intentos'}</h2>
        <p className="text-white/50 text-sm mb-6">El personaje era <span className="text-white font-bold">{secreto.nombre}</span></p>

        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-3 shadow-xl"
          style={{ backgroundColor: secreto.color }}
        >
          {secreto.iniciales}
        </div>
        <p className="text-white/40 text-xs italic px-4 mb-6">"{secreto.pistaUnica}"</p>

        {ganó && (
          <div className="bg-violet-600/20 border border-violet-500/30 rounded-2xl px-6 py-4 mb-6">
            <p className="text-3xl font-black text-white">{puntos.toLocaleString()} pts</p>
            <p className="text-white/40 text-xs mt-1">puntuación de esta partida</p>
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={onRepetir} className="flex-1 bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-xl transition-all">
            Otra partida
          </button>
          <button onClick={onSalir} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 font-bold py-3 rounded-xl transition-all">
            Salir
          </button>
        </div>
      </div>
    </div>
  )
}

// ── JUEGO PRINCIPAL ───────────────────────────────────────────────────────────
export default function QuienEsQuien() {
  const navigate = useNavigate()
  const { user }  = useAuth()
  const startRef  = useRef(Date.now())

  const [fase, setFase]           = useState('intro')   // intro | jugando | resultado
  const [tablero, setTablero]     = useState([])
  const [secreto, setSecreto]     = useState(null)
  const [pistas, setPistas]       = useState([])
  const [pistaIdx, setPistaIdx]   = useState(0)         // cuántas pistas reveladas (0 = ninguna)
  const [estados, setEstados]     = useState({})        // id → 'activo'|'eliminado'|'seleccionado'
  const [seleccionado, setSelec]  = useState(null)
  const [intentos, setIntentos]   = useState(0)
  const [puntos, setPuntos]       = useState(0)
  const [ganó, setGanó]           = useState(false)
  const [feedback, setFeedback]   = useState(null)      // null | 'correcto' | 'incorrecto'

  function iniciarPartida() {
    const tableroNuevo  = montarTablero(PERSONAJES_GCE, BOARD_SIZE)
    const secretoNuevo  = tableroNuevo[Math.floor(Math.random() * tableroNuevo.length)]
    const pistasNuevas  = generarPistas(secretoNuevo, tableroNuevo)
    const estadosInicio = Object.fromEntries(tableroNuevo.map(p => [p.id, 'activo']))

    setTablero(tableroNuevo)
    setSecreto(secretoNuevo)
    setPistas(pistasNuevas)
    setPistaIdx(0)
    setEstados(estadosInicio)
    setSelec(null)
    setIntentos(0)
    setPuntos(0)
    setGanó(false)
    setFeedback(null)
    startRef.current = Date.now()
    setFase('jugando')
  }

  function revelarSiguientePista() {
    if (pistaIdx < pistas.length - 1) {
      const siguiente = pistaIdx + 1

      // Auto-eliminar personajes que NO cumplen la nueva pista
      const pista = pistas[siguiente]
      if (pista.attr !== 'única') {
        setEstados(prev => {
          const next = { ...prev }
          tablero.forEach(p => {
            if (next[p.id] === 'activo' && p.atributos[pista.attr] !== pista.val) {
              next[p.id] = 'eliminado'
            }
          })
          return next
        })
      }
      setPistaIdx(siguiente)
      setSelec(null)
    }
  }

  function seleccionarPersonaje(p) {
    if (estados[p.id] !== 'activo' || feedback) return
    setSelec(prev => prev?.id === p.id ? null : p)
  }

  function confirmarRespuesta() {
    if (!seleccionado || feedback) return

    if (seleccionado.id === secreto.id) {
      // ✓ Correcto
      const pts = PTS_PISTA[Math.min(pistaIdx, PTS_PISTA.length - 1)]
      setPuntos(pts)
      setGanó(true)
      setEstados(prev => ({ ...prev, [seleccionado.id]: 'correcto' }))
      setFeedback('correcto')
      const timeSpent = Math.round((Date.now() - startRef.current) / 1000)
      if (user) saveActivity(user.uid, {
        type: 'juego', game: 'quien-es-quien', category: 'gce',
        score: pts, passed: true, timeSpent,
      }).catch(() => {})
      setTimeout(() => setFase('resultado'), 1200)
    } else {
      // ✗ Incorrecto
      const nuevosIntentos = intentos + 1
      setIntentos(nuevosIntentos)
      setEstados(prev => ({ ...prev, [seleccionado.id]: 'incorrecto' }))
      setFeedback('incorrecto')

      setTimeout(() => {
        setEstados(prev => ({ ...prev, [seleccionado.id]: 'eliminado' }))
        setSelec(null)
        setFeedback(null)

        if (nuevosIntentos >= MAX_INTENTOS) {
          // Game over
          const timeSpent = Math.round((Date.now() - startRef.current) / 1000)
          if (user) saveActivity(user.uid, {
            type: 'juego', game: 'quien-es-quien', category: 'gce',
            score: 0, passed: false, timeSpent,
          }).catch(() => {})
          setFase('resultado')
        } else if (pistaIdx < pistas.length - 1) {
          // Revelar pista automáticamente tras fallo
          revelarSiguientePista()
        }
      }, 900)
    }
  }

  if (fase === 'intro') return <Intro onStart={iniciarPartida} />
  if (fase === 'resultado') return (
    <Resultado
      ganó={ganó} secreto={secreto} puntos={puntos}
      onRepetir={iniciarPartida}
      onSalir={() => navigate('/juegos')}
    />
  )

  const pistaActual   = pistas[pistaIdx]
  const pistasVistas  = pistas.slice(0, pistaIdx + 1)
  const activosCount  = tablero.filter(p => estados[p.id] === 'activo').length
  const puedeAdivinar = seleccionado && !feedback
  const hayMasPistas  = pistaIdx < pistas.length - 1

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-3 sm:px-6 py-4">
      <div className="max-w-2xl mx-auto w-full flex flex-col gap-4">

        {/* Cabecera */}
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/juegos')} className="text-white/40 hover:text-white/70 text-sm transition-colors">
            ← Salir
          </button>
          <div className="flex items-center gap-3">
            <span className="text-white/40 text-xs">{activosCount} restantes</span>
            <div className="flex gap-1">
              {Array.from({ length: MAX_INTENTOS }).map((_, i) => (
                <span key={i} className={`text-base ${i < intentos ? 'opacity-20' : ''}`}>❤️</span>
              ))}
            </div>
          </div>
        </div>

        {/* Tablero */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4">
          <div className="grid grid-cols-6 gap-1 sm:gap-2 justify-items-center">
            {tablero.map(p => (
              <Avatar
                key={p.id}
                p={p}
                estado={seleccionado?.id === p.id && estados[p.id] === 'activo'
                  ? 'seleccionado'
                  : feedback === 'correcto' && p.id === secreto.id
                  ? 'correcto'
                  : feedback === 'incorrecto' && seleccionado?.id === p.id
                  ? 'incorrecto'
                  : estados[p.id]}
                onClick={() => seleccionarPersonaje(p)}
              />
            ))}
          </div>
        </div>

        {/* Pistas reveladas */}
        <div className="flex flex-col gap-2">
          {pistasVistas.map((pista, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 rounded-xl px-4 py-3 border text-sm
                ${i === pistaIdx
                  ? 'bg-violet-600/20 border-violet-500/40 text-white'
                  : 'bg-white/5 border-white/5 text-white/50'}`}
            >
              <span className="font-black text-violet-400 w-5 shrink-0">#{i + 1}</span>
              <span className="leading-relaxed">{pista.texto}</span>
            </div>
          ))}
        </div>

        {/* Acciones */}
        <div className="flex gap-2 pb-4">
          {seleccionado ? (
            <button
              onClick={confirmarRespuesta}
              disabled={!puedeAdivinar}
              className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-bold py-3 rounded-xl transition-all text-sm"
            >
              Es <span className="font-black">{seleccionado.nombre}</span> →
            </button>
          ) : (
            <p className="flex-1 text-center text-white/30 text-xs self-center py-3">
              Selecciona un personaje del tablero para adivinar
            </p>
          )}

          {hayMasPistas && !feedback && (
            <button
              onClick={revelarSiguientePista}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white font-medium px-4 py-3 rounded-xl transition-all text-sm whitespace-nowrap"
            >
              Pista {pistaIdx + 2} 💡
            </button>
          )}
        </div>

      </div>
    </div>
  )
}
