import { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { PERSONAJES_TODOS, PERSONAJES_GCE, PERSONAJES_WWII, montarTablero, generarPistas } from '../data/personajes'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'

const BOARD_SIZE = 12
const MAX_FALLOS = 2
const PTS_PISTA  = [300, 200, 100, 50]
const POOL_LABEL = {
  gce:    'Guerra Civil Española',
  wwii:   'Segunda Guerra Mundial',
  global: 'Personajes históricos de todas las épocas',
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
function Intro({ pool, onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <span className="text-6xl mb-4 block">🕵️</span>
          <h1 className="text-3xl font-black text-white mb-2">¿Quién es quién?</h1>
          <p className="text-white/50 text-sm">
            {POOL_LABEL[pool] ?? pool}
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 space-y-4">
          {[
            { icon: '🎴', title: 'Tablero de 12 personajes', desc: 'Cada partida, 12 figuras distintas seleccionadas al azar.' },
            { icon: '✂️', title: 'Tacha a los que descartes', desc: 'Toca un personaje para tacharlo. Tócalo de nuevo para restaurarlo. Descarta hasta quedarte con el correcto.' },
            { icon: '🧠', title: 'Solo ves una pista a la vez', desc: 'Cada pista nueva sustituye a la anterior — ¡tendrás que recordarlas! Menos pistas usadas = más puntos.' },
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
function Resultado({ ganó, secreto, pistaIdx, onRepetir, onSalir }) {
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
        <p className="text-white/40 text-xs italic px-4 mb-6">"{secreto.pistaUnica}"</p>
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

// ── JUEGO ─────────────────────────────────────────────────────────────────────
export default function QuienEsQuien() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const { user }  = useAuth()
  const startRef  = useRef(Date.now())

  // Si venimos desde /estudiar/historia/gce usamos solo el pool GCE
  const poolKey  = location.state?.pool ?? 'global'
  const backPath = location.state?.backPath ?? '/juegos'
  const pool = poolKey === 'gce'  ? PERSONAJES_GCE
             : poolKey === 'wwii' ? PERSONAJES_WWII
             : PERSONAJES_TODOS

  const [fase, setFase]         = useState('intro')
  const [tablero, setTablero]   = useState([])
  const [secreto, setSecreto]   = useState(null)
  const [pistas, setPistas]     = useState([])
  const [pistaIdx, setPistaIdx] = useState(0)
  const [tachados, setTachados] = useState(new Set())
  const [modoAdivinar, setModoAdivinar] = useState(false)
  const [fallos, setFallos]     = useState(0)
  const [ganó, setGanó]         = useState(false)
  const [resultados, setResultados] = useState({}) // id → 'correcto'|'incorrecto'|'revelado'
  const [animFallo, setAnimFallo]   = useState(false)
  const [popupFallo, setPopupFallo] = useState(null) // { fallosRestantes } | null

  function iniciarPartida() {
    const t = montarTablero(pool, BOARD_SIZE)
    const s = t[Math.floor(Math.random() * t.length)]
    setTablero(t)
    setSecreto(s)
    setPistas(generarPistas(s, t))
    setPistaIdx(0)
    setTachados(new Set())
    setModoAdivinar(false)
    setFallos(0)
    setGanó(false)
    setResultados({})
    setAnimFallo(false)
    setPopupFallo(null)
    startRef.current = Date.now()
    setFase('jugando')
  }

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
      const t = Math.round((Date.now() - startRef.current) / 1000)
      if (user) saveActivity(user.uid, {
        type: 'juego', game: 'quien-es-quien', category: poolKey,
        score: pistaIdx + 1, passed: true, timeSpent: t,
      }).catch(() => {})
      setTimeout(() => setFase('resultado'), 1000)
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
          const t = Math.round((Date.now() - startRef.current) / 1000)
          if (user) saveActivity(user.uid, {
            type: 'juego', game: 'quien-es-quien', category: poolKey,
            score: 0, passed: false, timeSpent: t,
          }).catch(() => {})
          setTimeout(() => setFase('resultado'), 1200)
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

  if (fase === 'intro') return <Intro pool={poolKey} onStart={iniciarPartida} />
  if (fase === 'resultado') return (
    <Resultado
      ganó={ganó} secreto={secreto} pistaIdx={pistaIdx}
      onRepetir={iniciarPartida}
      onSalir={() => navigate(backPath)}
    />
  )

  const activosCount = tablero.filter(p => !tachados.has(p.id) && !resultados[p.id]).length
  const hayMasPistas = pistaIdx < pistas.length - 1

  return (
    <div className={`relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-2 sm:px-6 py-3 transition-all ${animFallo ? 'brightness-50' : ''}`}>

      {/* Popup tras fallo */}
      {popupFallo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="bg-[#0d0d1a] border border-white/10 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
            <span className="text-5xl block mb-3">❌</span>
            <h3 className="text-white font-black text-xl mb-1">¡Incorrecto!</h3>
            <p className="text-white/40 text-sm mb-5">
              {popupFallo.fallosRestantes === 1
                ? 'Te queda 1 intento. ¡Piénsalo bien!'
                : `Te quedan ${popupFallo.fallosRestantes} intentos.`}
            </p>
            <button
              onClick={() => { setPopupFallo(null); setModoAdivinar(true) }}
              className="w-full font-black py-3 rounded-xl text-black text-base"
              style={{ backgroundColor: '#EDAE49' }}
            >
              Elegir otro personaje →
            </button>
          </div>
        </div>
      )}

      {/* Cabecera */}
      <div className="flex items-center justify-between mb-3 px-1">
        <button
          onClick={() => navigate(backPath)}
          className="text-white/40 hover:text-white/70 text-sm transition-colors"
        >
          ← Salir
        </button>
        <div className="flex items-center gap-3">
          <span className="text-white/40 text-xs">{activosCount} sin tachar</span>
          <div className="flex gap-1">
            {Array.from({ length: MAX_FALLOS }).map((_, i) => (
              <span key={i} className={`text-lg transition-opacity ${i < fallos ? 'opacity-20' : ''}`}>❤️</span>
            ))}
          </div>
        </div>
      </div>

      {/* Tablero — ocupa todo el ancho disponible */}
      <div className={`border rounded-2xl p-3 sm:p-4 transition-all flex-1 flex flex-col gap-3 ${modoAdivinar ? 'border-violet-500/50 bg-violet-900/10' : 'border-white/10 bg-white/5'}`}>

        {modoAdivinar && (
          <p className="text-violet-300 text-xs text-center font-semibold">
            👆 Toca cualquier personaje para adivinar (incluso los tachados)
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
            {pistaIdx} pista{pistaIdx > 1 ? 's' : ''} anterior{pistaIdx > 1 ? 'es' : ''} — ¡recuérdalas!
          </p>
        )}

        {/* Acciones */}
        <div className="flex gap-2">
          {(() => {
            const unicoRestante = activosCount === 1
              ? tablero.find(p => !tachados.has(p.id) && !resultados[p.id])
              : null

            // Queda solo uno — confirmar directamente
            if (unicoRestante) return (
              <button
                onClick={() => adivinar(unicoRestante)}
                className="flex-1 font-black py-3 sm:py-4 rounded-xl transition-all text-black text-base"
                style={{ backgroundColor: '#EDAE49' }}
              >
                ¿Es {unicoRestante.nombre}?
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
                    💡 Pista {pistaIdx + 2}
                  </button>
                )}
                <button
                  onClick={() => setModoAdivinar(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 font-medium py-3 rounded-xl transition-all text-sm"
                >
                  Cancelar
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
                  💡 Nueva pista
                </button>
                <button
                  onClick={() => setModoAdivinar(true)}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white font-medium px-5 py-3 rounded-xl transition-all whitespace-nowrap"
                >
                  🎯 Adivinar
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
                🎯 Adivinar
              </button>
            )
          })()}
        </div>

      </div>
    </div>
  )
}
