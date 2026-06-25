import { useState, useEffect, useRef } from 'react'
import { aplicar, generarPuzzle, OP_STYLE } from '../lib/mathEngine'
import { useLang } from '../context/LangContext'

let _nextId = 1
function uid() { return _nextId++ }

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
      x: Math.random() * canvas.width, y: -Math.random() * 200,
      vx: (Math.random() - 0.5) * 3, vy: 2 + Math.random() * 4,
      size: 5 + Math.random() * 8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot: Math.random() * Math.PI * 2, rotSpeed: (Math.random() - 0.5) * 0.15,
      isRect: Math.random() > 0.5,
    }))
    let alive = true
    function draw() {
      if (!alive) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let any = false
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.rot += p.rotSpeed
        if (p.y < canvas.height + 20) any = true
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        if (p.isRect) ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
        else { ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill() }
        ctx.restore()
      }
      if (any) requestAnimationFrame(draw)
    }
    draw()
    return () => { alive = false }
  }, [])
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />
}

// ── Juego "Acércate al número" ───────────────────────────────────────────────
// Componente sin pantalla de selección: recibe las operaciones y la dificultad ya
// decididas, y arranca la partida inmediatamente al montarse.
//
// Props:
//   ops:        array de operadores permitidos, p.ej. ['+', '-']
//   cfg:        { objMin, objMax, count, tiempo, numMax }
//   nivelLabel: { emoji, label } — lo que se muestra en el HUD como "Nivel"
//   onFinish:   ({ pts, diff, passed, timeSpent }) => void
//   onPlayAgain: si se pasa, se muestra el botón "Otra ronda" (modo práctica libre)
//   onExit:     si se pasa, se muestra un botón para salir
export default function CombinaNumeros({ ops, cfg, nivelLabel, onFinish, onPlayAgain, onExit, playAgainLabel = 'Otra ronda' }) {
  const { lang } = useLang()
  const en = lang === 'en'
  const [fase,       setFase]       = useState('jugando')
  const [objetivo,   setObjetivo]   = useState(null)
  const [numeros,    setNumeros]    = useState([])
  const [sel1,       setSel1]       = useState(null)
  const [opSel,      setOpSel]      = useState(null)
  const [historial,  setHistorial]  = useState([])
  const [tiempo,     setTiempo]     = useState(cfg.tiempo)
  const [flashId,    setFlashId]    = useState(null)
  const [errorFlash, setErrorFlash] = useState(false)
  const [victoria,   setVictoria]   = useState(false)
  const [finInfo,    setFinInfo]    = useState(null)

  const timerRef     = useRef(null)
  const tiempoRef    = useRef(cfg.tiempo)
  const startTimeRef = useRef(Date.now())
  const numerosRef   = useRef(numeros)
  const objetivoRef  = useRef(objetivo)
  numerosRef.current  = numeros
  objetivoRef.current = objetivo

  function iniciar() {
    const { vals, objetivo: obj } = generarPuzzle(cfg, ops)
    const nums = vals.map(v => ({ id: uid(), valor: v }))
    setObjetivo(obj)
    setNumeros(nums)
    setSel1(null); setOpSel(null); setHistorial([])
    setTiempo(cfg.tiempo)
    tiempoRef.current = cfg.tiempo
    setVictoria(false); setFinInfo(null); setFlashId(null)
    startTimeRef.current = Date.now()
    setFase('jugando')
  }

  useEffect(() => { iniciar() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Timer ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (fase !== 'jugando') return
    timerRef.current = setInterval(() => {
      tiempoRef.current -= 1
      setTiempo(tiempoRef.current)
      if (tiempoRef.current <= 0) {
        clearInterval(timerRef.current)
        acabar(true)
      }
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [fase]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Acabar ronda ─────────────────────────────────────────────────────────
  function acabar(porTiempo = false, numerosAct, objetivoAct) {
    clearInterval(timerRef.current)
    const nums = numerosAct ?? numerosRef.current
    const obj  = objetivoAct ?? objetivoRef.current
    if (!nums.length) {
      const info = { diff: obj, mejor: '—', pts: 0, porTiempo }
      setFinInfo(info); setFase('fin')
      onFinish?.({ pts: 0, diff: obj, passed: false, timeSpent: Math.round((Date.now() - startTimeRef.current) / 1000) })
      return
    }
    const mejor = nums.map(n => n.valor).reduce((a, b) => Math.abs(a - obj) < Math.abs(b - obj) ? a : b)
    const diff  = Math.abs(mejor - obj)
    const pts   = diff === 0 ? 10 : diff <= 2 ? 5 : 0
    if (diff === 0) setVictoria(true)
    setFinInfo({ diff, mejor, pts, porTiempo })
    setFase('fin')
    onFinish?.({ pts, diff, passed: diff === 0, timeSpent: Math.round((Date.now() - startTimeRef.current) / 1000) })
  }

  // ── Clic en número ───────────────────────────────────────────────────────
  function clickNumero(n) {
    if (!sel1) { setSel1(n); return }
    if (n.id === sel1.id) { setSel1(null); setOpSel(null); return }
    if (!opSel) { setSel1(n); return }

    const res = aplicar(sel1.valor, opSel, n.valor)
    if (res === null) {
      setErrorFlash(true)
      setTimeout(() => setErrorFlash(false), 500)
      return
    }
    setHistorial(h => [...h, numeros])
    const newId  = uid()
    const nuevos = numeros
      .filter(x => x.id !== sel1.id && x.id !== n.id)
      .concat([{ id: newId, valor: res }])
    setNumeros(nuevos)
    setFlashId(newId)
    setTimeout(() => setFlashId(null), 700)
    setSel1(null); setOpSel(null)

    const hayVictoria = nuevos.some(x => x.valor === objetivo)
    if (hayVictoria || nuevos.length === 1) {
      clearInterval(timerRef.current)
      setTimeout(() => acabar(false, nuevos, objetivo), 600)
    }
  }

  function clickOp(op) {
    if (!sel1) return
    setOpSel(prev => prev === op ? null : op)
  }

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

  const tiempoRatio = tiempo / cfg.tiempo
  const tiempoColor = tiempoRatio > 0.5 ? 'text-green-400' : tiempoRatio > 0.2 ? 'text-amber-400' : 'text-red-400 animate-pulse'

  // ── PANTALLA FIN ────────────────────────────────────────────────────────
  if (fase === 'fin') {
    const exact = finInfo?.diff === 0
    const cerca = !exact && finInfo?.diff <= 2
    return (
      <div className="flex flex-col items-center justify-center px-4 py-8">
        {victoria && <Confetti />}
        <div className="max-w-md w-full text-center">
          <div className="text-7xl mb-4">{exact ? '🎉' : cerca ? '😮' : '😅'}</div>
          <h2 className="text-3xl font-black text-white mb-2">
            {exact ? (en ? 'Exact!' : '¡Exacto!') : cerca ? (en ? 'Close!' : '¡Casi!') : finInfo?.porTiempo ? (en ? 'Time!' : '¡Tiempo!') : (en ? 'Round over' : 'Ronda terminada')}
          </h2>
          {exact ? (
            <p className="text-white/50 text-sm mb-1">
              {en ? 'You reached' : 'Llegaste a'} <span className="text-amber-400 font-bold">{objetivo}</span> — {en ? 'perfect!' : '¡perfecto!'}
            </p>
          ) : (
            <p className="text-white/50 text-sm mb-1">
              {en ? 'You reached' : 'Llegaste a'} <span className="text-white font-bold">{finInfo?.mejor}</span>
              {' '}· {en ? 'target' : 'objetivo'}: <span className="text-amber-400 font-bold">{objetivo}</span>
              {finInfo?.diff > 0 && <span className="text-white/30"> ({en ? 'diff' : 'diferencia'}: {finInfo.diff})</span>}
            </p>
          )}
          <div className={`text-6xl font-black mt-4 mb-8 ${finInfo?.pts > 0 ? 'text-amber-400' : 'text-white/30'}`}>
            +{finInfo?.pts} pts
          </div>
          <div className="flex gap-3 justify-center">
            {onPlayAgain && (
              <button onClick={onPlayAgain}
                className="px-8 py-3 bg-[#EDAE49] hover:bg-amber-400 text-black font-black rounded-2xl transition-all hover:scale-[1.02]">
                {playAgainLabel}
              </button>
            )}
            {onExit && (
              <button onClick={onExit}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all">
                {en ? 'Menu' : 'Menú'}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── PANTALLA DE JUEGO ───────────────────────────────────────────────────
  return (
    <div className="flex flex-col max-w-lg mx-auto w-full select-none">

      {/* HUD */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="flex flex-col items-center bg-white/5 border border-white/10 rounded-xl py-2 px-1">
          <span className="text-white/30 text-[9px] uppercase tracking-wider font-semibold">{en ? 'Level' : 'Nivel'}</span>
          <span className="text-white font-bold text-sm mt-0.5">{nivelLabel?.emoji} {nivelLabel?.label}</span>
        </div>
        <div className="flex flex-col items-center bg-amber-500/15 border-2 border-amber-500/50 rounded-2xl py-2 px-1">
          <span className="text-amber-400/70 text-[9px] uppercase tracking-widest font-semibold">{en ? 'Target' : 'Objetivo'}</span>
          <span className="text-amber-300 font-black text-3xl leading-none">{objetivo}</span>
        </div>
        <div className="flex flex-col items-center bg-white/5 border border-white/10 rounded-xl py-2 px-1">
          <span className="text-white/30 text-[9px] uppercase tracking-wider font-semibold">{en ? 'Time' : 'Tiempo'}</span>
          <span className={`font-black text-xl leading-none mt-0.5 ${tiempoColor}`}>{tiempo}s</span>
        </div>
      </div>

      {/* Fórmula en construcción */}
      <div className={`rounded-2xl border-2 p-4 mb-4 min-h-[64px] flex items-center justify-center gap-4 transition-all ${
        errorFlash ? 'border-red-500/70 bg-red-900/20'
          : sel1    ? 'border-violet-500/40 bg-violet-900/10'
          :            'border-white/10 bg-white/3'
      }`}>
        {!sel1 ? (
          <p className="text-white/20 text-sm">{en ? 'Select a number to start' : 'Selecciona un número para empezar'}</p>
        ) : (
          <>
            <span className="text-white font-black text-3xl">{sel1.valor}</span>
            {opSel
              ? <><span className="text-amber-400 font-black text-3xl">{opSel}</span><span className="text-white/30 font-black text-3xl">?</span></>
              : <span className="text-white/20 font-black text-3xl">?</span>
            }
          </>
        )}
        {errorFlash && <span className="text-red-400 text-sm font-bold absolute">{en ? 'Non-exact division' : 'División no exacta'}</span>}
      </div>

      {/* Números disponibles */}
      <div className="mb-5">
        <p className="text-white/25 text-[10px] uppercase tracking-widest mb-2 font-semibold text-center">{en ? 'Available numbers' : 'Números disponibles'}</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {numeros.map(n => {
            const isSelected = sel1?.id === n.id
            const isFlash    = flashId === n.id
            return (
              <button key={n.id} onClick={() => clickNumero(n)}
                className={`w-16 h-16 rounded-2xl font-black text-xl border-2 transition-all duration-150 ${
                  isFlash    ? 'bg-[#EDAE49] border-amber-300 text-black scale-125 shadow-xl shadow-amber-500/50 z-10'
                  : isSelected ? 'bg-violet-600 border-violet-400 text-white scale-110 shadow-lg shadow-violet-500/40'
                  :               'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105 active:scale-95'
                }`}>
                {n.valor}
              </button>
            )
          })}
          {numeros.length === 0 && <p className="text-white/20 text-sm py-4">{en ? 'No numbers — reset or finish' : 'Sin números — reinicia o termina'}</p>}
        </div>
      </div>

      {/* Operadores */}
      <div className="mb-5">
        <p className="text-white/25 text-[10px] uppercase tracking-widest mb-2 font-semibold text-center">{en ? 'Operation' : 'Operación'}</p>
        <div className={`grid gap-2 ${ops.length === 1 ? 'grid-cols-1' : ops.length === 2 ? 'grid-cols-2' : 'grid-cols-4'}`}>
          {ops.map(op => {
            const style    = OP_STYLE[op]
            const active   = opSel === op
            const disabled = !sel1
            return (
              <button key={op} onClick={() => clickOp(op)} disabled={disabled}
                className={`h-14 rounded-2xl font-black text-2xl border-2 transition-all duration-150 ${
                  active   ? `${style.activeClass} scale-105 shadow-lg`
                  : disabled ? 'bg-white/3 border-white/8 text-white/15 cursor-not-allowed'
                  :             'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105 active:scale-95'
                }`}>
                {style.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Controles */}
      <div className="grid grid-cols-3 gap-2">
        <button onClick={undo} disabled={!historial.length && !sel1}
          className="py-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white font-bold rounded-2xl transition-all text-sm">
          {en ? '↩ Undo' : '↩ Deshacer'}
        </button>
        <button onClick={resetear} disabled={historial.length === 0}
          className="py-3 bg-white/5 hover:bg-white/10 disabled:opacity-20 text-white/60 hover:text-white font-bold rounded-2xl transition-all text-sm">
          {en ? '🔄 Reset' : '🔄 Reiniciar'}
        </button>
        <button onClick={() => acabar()}
          className="py-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 font-bold rounded-2xl transition-all border border-amber-500/30 text-sm">
          {en ? 'Finish' : 'Terminar'}
        </button>
      </div>
    </div>
  )
}
