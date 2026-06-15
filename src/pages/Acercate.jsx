import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// ── Configuración por nivel ────────────────────────────────────────────────
const CONFIGS = {
  facil:    { label: 'Fácil',    emoji: '🟢', objMin: 10,  objMax: 50,  count: 6, tiempo: 90,  numMax: 10 },
  medio:    { label: 'Medio',    emoji: '🟡', objMin: 10,  objMax: 99,  count: 5, tiempo: 60,  numMax: 10 },
  dificil:  { label: 'Difícil',  emoji: '🔴', objMin: 50,  objMax: 999, count: 4, tiempo: 45,  numMax: 15 },
}

const OPS = [
  { id: '+', label: '+', activeClass: 'bg-emerald-600 border-emerald-400 text-white' },
  { id: '-', label: '−', activeClass: 'bg-blue-600 border-blue-400 text-white' },
  { id: '×', label: '×', activeClass: 'bg-amber-500 border-amber-300 text-black' },
  { id: '÷', label: '÷', activeClass: 'bg-rose-600 border-rose-400 text-white' },
]

let _nextId = 1
function uid() { return _nextId++ }

function rng(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function aplicar(a, op, b) {
  if (op === '+') return a + b
  if (op === '-') return a - b
  if (op === '×') return a * b
  if (op === '÷') return (b !== 0 && Number.isInteger(a / b)) ? a / b : null
  return null
}

// ── Confetti canvas ────────────────────────────────────────────────────────
function Confetti() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')
    const COLORS = ['#EDAE49', '#a78bfa', '#34d399', '#f87171', '#60a5fa', '#fb923c']
    const particles = Array.from({ length: 100 }, () => ({
      x:        Math.random() * canvas.width,
      y:        -rng(0, 200),
      vx:       (Math.random() - 0.5) * 3,
      vy:       2 + Math.random() * 4,
      size:     5 + Math.random() * 8,
      color:    COLORS[Math.floor(Math.random() * COLORS.length)],
      rot:      Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.15,
      isRect:   Math.random() > 0.5,
    }))
    let alive = true
    function draw() {
      if (!alive) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let any = false
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.rot += p.rotSpeed
        if (p.y < canvas.height + 20) any = true
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        if (p.isRect) {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }
      if (any) requestAnimationFrame(draw)
    }
    draw()
    return () => { alive = false }
  }, [])
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />
}

// ── Componente principal ───────────────────────────────────────────────────
export default function Acercate() {
  const navigate = useNavigate()

  const [fase,      setFase]      = useState('intro')   // intro | jugando | fin
  const [nivelId,   setNivelId]   = useState('medio')
  const [objetivo,  setObjetivo]  = useState(null)
  const [numeros,   setNumeros]   = useState([])        // [{id, valor}]
  const [sel1,      setSel1]      = useState(null)      // {id, valor}
  const [opSel,     setOpSel]     = useState(null)      // op id string
  const [historial, setHistorial] = useState([])        // stack para undo
  const [tiempo,    setTiempo]    = useState(60)
  const [flashId,   setFlashId]   = useState(null)      // id del número recién creado
  const [errorFlash,setErrorFlash]= useState(false)
  const [victoria,  setVictoria]  = useState(false)
  const [finInfo,   setFinInfo]   = useState(null)

  const timerRef    = useRef(null)
  const numerosRef  = useRef(numeros)
  const objetivoRef = useRef(objetivo)
  numerosRef.current  = numeros
  objetivoRef.current = objetivo

  // ── Timer ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (fase !== 'jugando') return
    timerRef.current = setInterval(() => {
      setTiempo(t => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          acabar(true)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [fase])

  function acabar(porTiempo = false, numerosActuales, objetivoActual) {
    clearInterval(timerRef.current)
    const nums = numerosActuales ?? numerosRef.current
    const obj  = objetivoActual  ?? objetivoRef.current
    if (!nums.length) { setFinInfo({ diff: obj, mejor: '—', pts: 0 }); setFase('fin'); return }
    const mejor = nums.map(n => n.valor).reduce((a, b) => Math.abs(a - obj) < Math.abs(b - obj) ? a : b)
    const diff  = Math.abs(mejor - obj)
    const pts   = diff === 0 ? 10 : diff <= 2 ? 5 : 0
    setFinInfo({ diff, mejor, pts, porTiempo })
    if (diff === 0) setVictoria(true)
    setFase('fin')
  }

  // ── Iniciar partida ────────────────────────────────────────────────────
  function iniciar() {
    const c   = CONFIGS[nivelId]
    const obj = rng(c.objMin, c.objMax)
    const nums = Array.from({ length: c.count }, () => ({ id: uid(), valor: rng(1, c.numMax) }))
    setObjetivo(obj)
    setNumeros(nums)
    setSel1(null); setOpSel(null); setHistorial([])
    setTiempo(c.tiempo); setVictoria(false); setFinInfo(null); setFlashId(null)
    setFase('jugando')
  }

  // ── Clic en número ────────────────────────────────────────────────────
  function clickNumero(n) {
    if (!sel1) {
      setSel1(n)
      return
    }
    if (n.id === sel1.id) {
      // Deselect
      setSel1(null); setOpSel(null)
      return
    }
    if (!opSel) {
      // Change first selection
      setSel1(n)
      return
    }
    // Execute operation
    const res = aplicar(sel1.valor, opSel, n.valor)
    if (res === null) {
      // Invalid (e.g. 7÷3)
      setErrorFlash(true)
      setTimeout(() => setErrorFlash(false), 500)
      return
    }
    setHistorial(h => [...h, numeros])
    const newId   = uid()
    const nuevos  = numeros
      .filter(x => x.id !== sel1.id && x.id !== n.id)
      .concat([{ id: newId, valor: res }])
    setNumeros(nuevos)
    setFlashId(newId)
    setTimeout(() => setFlashId(null), 700)
    setSel1(null); setOpSel(null)
    // Auto-win check
    if (res === objetivo) {
      clearInterval(timerRef.current)
      setVictoria(true)
      setTimeout(() => acabar(false, nuevos, objetivo), 600)
    }
  }

  // ── Clic en operador ──────────────────────────────────────────────────
  function clickOp(op) {
    if (!sel1) return
    setOpSel(prev => prev === op ? null : op)
  }

  // ── Deshacer ──────────────────────────────────────────────────────────
  function undo() {
    if (historial.length > 0) {
      setNumeros(historial[historial.length - 1])
      setHistorial(h => h.slice(0, -1))
    }
    setSel1(null); setOpSel(null)
  }

  function resetear() {
    if (historial.length > 0) setNumeros(historial[0])
    setHistorial([]); setSel1(null); setOpSel(null)
  }

  // ── Colores del timer ─────────────────────────────────────────────────
  const cfg = CONFIGS[nivelId]
  const tiempoRatio = tiempo / cfg.tiempo
  const tiempoColor = tiempoRatio > 0.5 ? 'text-green-400' : tiempoRatio > 0.2 ? 'text-amber-400' : 'text-red-400 animate-pulse'

  // ═══════════════════════════════════════════════════════════════════════
  // ── PANTALLA INTRO ────────────────────────────────────────────────────
  if (fase === 'intro') return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <span className="text-6xl block mb-3">🎯</span>
          <h1 className="text-3xl font-black text-white mb-2">Acércate al Número</h1>
          <p className="text-white/50 text-sm">Combina los números con operaciones para llegar al objetivo</p>
        </div>

        {/* Selector nivel */}
        <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl mb-5 w-fit mx-auto">
          {Object.entries(CONFIGS).map(([id, c]) => (
            <button key={id} onClick={() => setNivelId(id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                nivelId === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'
              }`}>
              {c.emoji} {c.label}
            </button>
          ))}
        </div>

        {/* Info nivel */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5 space-y-2.5 text-sm">
          {[
            ['🎯', 'Objetivo', `${cfg.objMin} – ${cfg.objMax}`],
            ['🃏', 'Números', `${cfg.count} cartas (del 1 al ${cfg.numMax})`],
            ['⏱️', 'Tiempo',  `${cfg.tiempo} segundos`],
            ['⭐', 'Puntos',  '+10 exacto · +5 si ±1 o ±2'],
          ].map(([e, k, v]) => (
            <div key={k} className="flex items-center justify-between">
              <span className="text-white/40">{e} {k}</span>
              <span className="text-white font-semibold">{v}</span>
            </div>
          ))}
        </div>

        {/* Cómo jugar */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">Cómo jugar</p>
          <div className="space-y-2">
            {[
              ['1️⃣', 'Pulsa un número disponible'],
              ['➕', 'Elige una operación (+, −, ×, ÷)'],
              ['2️⃣', 'Pulsa otro número'],
              ['✨', 'El resultado reemplaza a los dos — ¡sigue combinando!'],
            ].map(([e, t]) => (
              <div key={t} className="flex items-start gap-3 text-sm text-white/50">
                <span className="text-base mt-0.5 w-5 shrink-0 text-center">{e}</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <button onClick={iniciar}
          className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/30">
          ¡Empezar!
        </button>
      </div>
    </div>
  )

  // ═══════════════════════════════════════════════════════════════════════
  // ── PANTALLA FIN ──────────────────────────────────────────────────────
  if (fase === 'fin') {
    const exact  = finInfo?.diff === 0
    const cerca  = !exact && finInfo?.diff <= 2
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {victoria && <Confetti />}
        <div className="max-w-md w-full text-center">
          <div className="text-7xl mb-4">{exact ? '🎉' : cerca ? '😮' : '😅'}</div>
          <h2 className="text-3xl font-black text-white mb-2">
            {exact ? '¡Exacto!' : cerca ? '¡Casi!' : finInfo?.porTiempo ? '¡Tiempo!' : 'Ronda terminada'}
          </h2>
          {!exact && (
            <p className="text-white/50 text-sm mb-1">
              Llegaste a{' '}
              <span className="text-white font-bold">{finInfo?.mejor}</span>
              {' '}· objetivo: <span className="text-amber-400 font-bold">{objetivo}</span>
              {finInfo?.diff > 0 && <span className="text-white/30"> (diferencia: {finInfo.diff})</span>}
            </p>
          )}
          <div className={`text-6xl font-black mt-4 mb-8 ${finInfo?.pts > 0 ? 'text-amber-400' : 'text-white/30'}`}>
            +{finInfo?.pts} pts
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={iniciar}
              className="px-8 py-3 bg-[#EDAE49] hover:bg-amber-400 text-black font-black rounded-2xl transition-all hover:scale-[1.02]">
              Otra ronda
            </button>
            <button onClick={() => setFase('intro')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all">
              Menú
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ═══════════════════════════════════════════════════════════════════════
  // ── PANTALLA DE JUEGO ─────────────────────────────────────────────────
  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-3 sm:px-6 py-4 max-w-lg mx-auto w-full select-none">

      {/* ── HUD ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {/* Nivel */}
        <div className="flex flex-col items-center bg-white/5 border border-white/10 rounded-xl py-2 px-1">
          <span className="text-white/30 text-[9px] uppercase tracking-wider font-semibold">Nivel</span>
          <span className="text-white font-bold text-sm mt-0.5">{cfg.emoji} {cfg.label}</span>
        </div>

        {/* Objetivo — centro y protagonista */}
        <div className="flex flex-col items-center bg-amber-500/15 border-2 border-amber-500/50 rounded-2xl py-2 px-1">
          <span className="text-amber-400/70 text-[9px] uppercase tracking-widest font-semibold">Objetivo</span>
          <span className="text-amber-300 font-black text-3xl leading-none">{objetivo}</span>
        </div>

        {/* Timer */}
        <div className="flex flex-col items-center bg-white/5 border border-white/10 rounded-xl py-2 px-1">
          <span className="text-white/30 text-[9px] uppercase tracking-wider font-semibold">Tiempo</span>
          <span className={`font-black text-xl leading-none mt-0.5 ${tiempoColor}`}>{tiempo}s</span>
        </div>
      </div>

      {/* ── Área de trabajo (fórmula en construcción) ────────────────── */}
      <div className={`rounded-2xl border-2 p-4 mb-4 min-h-[64px] flex items-center justify-center gap-4 transition-all ${
        errorFlash
          ? 'border-red-500/70 bg-red-900/20'
          : sel1
          ? 'border-violet-500/40 bg-violet-900/10'
          : 'border-white/10 bg-white/3'
      }`}>
        {!sel1 ? (
          <p className="text-white/20 text-sm">Selecciona un número para empezar</p>
        ) : (
          <>
            <span className="text-white font-black text-3xl">{sel1.valor}</span>
            {opSel ? (
              <>
                <span className="text-amber-400 font-black text-3xl">{opSel}</span>
                <span className="text-white/30 font-black text-3xl">?</span>
              </>
            ) : (
              <span className="text-white/20 font-black text-3xl">?</span>
            )}
          </>
        )}
        {errorFlash && (
          <span className="text-red-400 text-sm font-bold absolute">División no exacta</span>
        )}
      </div>

      {/* ── Números disponibles ───────────────────────────────────────── */}
      <div className="mb-5">
        <p className="text-white/25 text-[10px] uppercase tracking-widest mb-2 font-semibold text-center">
          Números disponibles
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          {numeros.map(n => {
            const isSelected = sel1?.id === n.id
            const isFlash    = flashId === n.id
            return (
              <button
                key={n.id}
                onClick={() => clickNumero(n)}
                className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl font-black text-xl border-2 transition-all duration-150
                  ${isFlash
                    ? 'bg-[#EDAE49] border-amber-300 text-black scale-125 shadow-xl shadow-amber-500/50 z-10'
                    : isSelected
                    ? 'bg-violet-600 border-violet-400 text-white scale-110 shadow-lg shadow-violet-500/40'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105 active:scale-95'
                  }`}
              >
                {n.valor}
              </button>
            )
          })}
          {numeros.length === 0 && (
            <p className="text-white/20 text-sm py-4">Sin números — reinicia o termina la ronda</p>
          )}
        </div>
      </div>

      {/* ── Operadores ───────────────────────────────────────────────── */}
      <div className="mb-5">
        <p className="text-white/25 text-[10px] uppercase tracking-widest mb-2 font-semibold text-center">
          Operación
        </p>
        <div className="grid grid-cols-4 gap-2">
          {OPS.map(op => {
            const active   = opSel === op.id
            const disabled = !sel1
            return (
              <button
                key={op.id}
                onClick={() => clickOp(op.id)}
                disabled={disabled}
                className={`h-14 rounded-2xl font-black text-2xl border-2 transition-all duration-150
                  ${active
                    ? `${op.activeClass} scale-105 shadow-lg`
                    : disabled
                    ? 'bg-white/3 border-white/8 text-white/15 cursor-not-allowed'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105 active:scale-95'
                  }`}
              >
                {op.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Botones de control ───────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-2 mt-auto pt-2">
        <button onClick={undo} disabled={!historial.length && !sel1}
          className="py-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white font-bold rounded-2xl transition-all text-sm flex items-center justify-center gap-1.5">
          ↩ Deshacer
        </button>
        <button onClick={resetear} disabled={historial.length === 0}
          className="py-3 bg-white/5 hover:bg-white/10 disabled:opacity-20 text-white/60 hover:text-white font-bold rounded-2xl transition-all text-sm flex items-center justify-center gap-1.5">
          🔄 Reiniciar
        </button>
        <button onClick={() => acabar()}
          className="py-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 font-bold rounded-2xl transition-all border border-amber-500/30 text-sm">
          Terminar
        </button>
      </div>
    </div>
  )
}
