import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const SIZE = 5
const GOALS = 3
const TIME_START = 60
const TIME_BONUS = 10

const OPS = [
  { label: '+1', fn: s => s + 1 },
  { label: '+2', fn: s => s + 2 },
  { label: '+3', fn: s => s + 3 },
  { label: '+5', fn: s => s + 5 },
  { label: '+7', fn: s => s + 7 },
  { label: '+10', fn: s => s + 10 },
  { label: '-1', fn: s => s - 1 },
  { label: '-2', fn: s => s - 2 },
  { label: '-3', fn: s => s - 3 },
  { label: '-5', fn: s => s - 5 },
  { label: '×2', fn: s => s * 2 },
  { label: '×3', fn: s => s * 3 },
  { label: '÷2', fn: s => Math.floor(s / 2) },
  { label: '÷3', fn: s => Math.floor(s / 3) },
]

const UI = {
  es: {
    titulo: 'NumPath', desc: 'Navega por la cuadrícula y alcanza las metas con la puntuación exacta',
    volver: '← Volver', empezar: '¡Empezar! →', salir: '← Salir',
    puntuacion: 'Puntuación', meta: 'Meta', metas: 'Metas', tiempo: 'Tiempo',
    tableros: 'Tableros', completado: '¡Completado!', bonus: '+10s',
    tiempoAgotado: '¡Tiempo agotado!', compartir: '🔗 Compartir resultado',
    reintentar: 'Intentarlo de nuevo', comoFunciona: 'Cómo funciona',
    paso1: 'Muévete por la cuadrícula con flechas o tocando',
    paso2: 'Cada casilla aplica una operación a tu puntuación',
    paso3: 'Llega a una meta con la puntuación exacta para ganar',
    paso4: 'Las casillas se agotan tras usarlas — planifica tu ruta',
    reglas: 'Reglas',
    tiempoInicial: 'Tiempo inicial', bonusPorTablero: 'Bonus por tablero',
    metasPorTablero: 'metas por tablero', movimiento: 'Movimiento', soloAdyacentes: 'solo casillas adyacentes',
  },
  en: {
    titulo: 'NumPath', desc: 'Navigate the grid and reach the goals with the exact score',
    volver: '← Back', empezar: 'Start! →', salir: '← Exit',
    puntuacion: 'Score', meta: 'Goal', metas: 'Goals', tiempo: 'Time',
    tableros: 'Boards', completado: 'Completed!', bonus: '+10s',
    tiempoAgotado: 'Time is up!', compartir: '🔗 Share result',
    reintentar: 'Try again', comoFunciona: 'How it works',
    paso1: 'Move across the grid with arrows or by tapping',
    paso2: 'Each cell applies a maths operation to your score',
    paso3: 'Reach a goal with the exact score to clear it',
    paso4: 'Cells are single-use — plan your route',
    reglas: 'Rules',
    tiempoInicial: 'Starting time', bonusPorTablero: 'Bonus per board',
    metasPorTablero: 'goals per board', movimiento: 'Movement', soloAdyacentes: 'adjacent cells only',
  },
}

function rng(min, max) { return min + Math.floor(Math.random() * (max - min + 1)) }

function generateBoard(startScore) {
  const grid = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => {
      const op = OPS[Math.floor(Math.random() * OPS.length)]
      return { op, label: op.label, used: false }
    })
  )
  grid[0][0] = { op: null, label: '', used: true, isStart: true }

  const goalPositions = []
  while (goalPositions.length < GOALS) {
    const r = rng(0, SIZE - 1), c = rng(0, SIZE - 1)
    if (r === 0 && c === 0) continue
    if (goalPositions.some(g => g.r === r && g.c === c)) continue
    goalPositions.push({ r, c })
  }

  // Make goals reachable by simulating paths
  goalPositions.forEach(g => {
    let score = startScore
    let cr = 0, cc = 0
    // Simple path: go right then down
    while (cc < g.c) { cc++; score = grid[cr][cc].op?.fn(score) ?? score }
    while (cr < g.r) { cr++; score = grid[cr][cc].op?.fn(score) ?? score }
    grid[g.r][g.c] = { op: null, label: '', used: false, isGoal: true, target: score }
  })

  return grid
}

export default function NumPath() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const u = UI[lang] || UI.es

  const [fase, setFase] = useState('intro')
  const [grid, setGrid] = useState([])
  const [pos, setPos] = useState({ r: 0, c: 0 })
  const [score, setScore] = useState(10)
  const [startScore, setStartScore] = useState(10)
  const [timeLeft, setTimeLeft] = useState(TIME_START)
  const [boards, setBoards] = useState(0)
  const [flash, setFlash] = useState(null)
  const [levelKey, setLevelKey] = useState(0)

  const timerRef = useRef(null)
  const timeRef = useRef(TIME_START)

  function initBoard() {
    const ss = rng(1, 20)
    const g = generateBoard(ss)
    setGrid(g)
    setPos({ r: 0, c: 0 })
    setScore(ss)
    setStartScore(ss)
    setFlash(null)
  }

  function startGame() {
    timeRef.current = TIME_START
    setTimeLeft(TIME_START)
    setBoards(0)
    initBoard()
    setFase('jugando')
    setLevelKey(k => k + 1)
  }

  // Timer
  useEffect(() => {
    if (fase !== 'jugando') return
    timerRef.current = setInterval(() => {
      timeRef.current -= 1
      setTimeLeft(timeRef.current)
      if (timeRef.current <= 0) {
        clearInterval(timerRef.current)
        setFase('fin')
      }
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [fase, levelKey])

  function move(nr, nc) {
    if (fase !== 'jugando') return
    if (nr < 0 || nr >= SIZE || nc < 0 || nc >= SIZE) return
    const dr = Math.abs(nr - pos.r), dc = Math.abs(nc - pos.c)
    if (dr + dc !== 1) return

    const cell = grid[nr][nc]
    let newScore = score

    if (cell.op && !cell.used) {
      newScore = cell.op.fn(score)
      const newGrid = grid.map(row => row.map(c => ({ ...c })))
      newGrid[nr][nc] = { ...cell, used: true, label: '' }
      setGrid(newGrid)
    }

    setScore(newScore)
    setPos({ r: nr, c: nc })

    if (cell.isGoal && newScore === cell.target) {
      setFlash('correct')
      const newGrid = grid.map(row => row.map(c => ({ ...c })))
      newGrid[nr][nc] = { ...cell, cleared: true }
      setGrid(newGrid)

      const remaining = newGrid.flat().filter(c => c.isGoal && !c.cleared).length
      if (remaining === 0) {
        timeRef.current += TIME_BONUS
        setTimeLeft(timeRef.current)
        setBoards(b => b + 1)
        setTimeout(() => {
          initBoard()
          setFlash(null)
        }, 800)
      } else {
        setTimeout(() => setFlash(null), 500)
      }
    } else if (cell.isGoal && newScore !== cell.target) {
      setFlash('wrong')
      setTimeout(() => setFlash(null), 400)
    }
  }

  const handleKey = useCallback((e) => {
    if (fase !== 'jugando') return
    const map = { ArrowUp: [-1,0], ArrowDown: [1,0], ArrowLeft: [0,-1], ArrowRight: [0,1] }
    const d = map[e.key]
    if (d) { e.preventDefault(); move(pos.r + d[0], pos.c + d[1]) }
  }, [fase, pos, score, grid])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  // ── INTRO ─────────────────────────────────────────────────────────────────
  if (fase === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="max-w-md w-full">
          <button onClick={() => navigate(localPath('/juegos'))}
            className="text-white/30 hover:text-white/60 text-sm mb-6 flex items-center gap-1 transition-colors">
            {u.volver}
          </button>
          <div className="text-center mb-7">
            <span className="text-7xl block mb-4">🧮</span>
            <h1 className="text-4xl font-black text-white mb-2">{u.titulo}</h1>
            <p className="text-white/40">{u.desc}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5 space-y-2.5 text-sm">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">{u.reglas}</p>
            {[
              ['⏱️', u.tiempoInicial, `${TIME_START}s`],
              ['🎁', u.bonusPorTablero, `+${TIME_BONUS}s`],
              ['🎯', u.metas, `${GOALS} ${u.metasPorTablero}`],
              ['↕️', u.movimiento, u.soloAdyacentes],
            ].map(([e, k, v]) => (
              <div key={k} className="flex items-center justify-between gap-2">
                <span className="text-white/40 shrink-0">{e} {k}</span>
                <span className="text-white font-semibold text-right">{v}</span>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-7">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{u.comoFunciona}</p>
            <div className="space-y-2">
              {[
                ['🎮', u.paso1],
                ['🔢', u.paso2],
                ['🎯', u.paso3],
                ['♻️', u.paso4],
              ].map(([e, t]) => (
                <div key={t} className="flex items-start gap-3 text-sm text-white/50">
                  <span className="text-base w-5 shrink-0 text-center">{e}</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={startGame}
            className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/30">
            {u.empezar}
          </button>
        </div>
      </div>
    )
  }

  // ── FIN ───────────────────────────────────────────────────────────────────
  if (fase === 'fin') {
    const shareText = `🧮 NumPath: ${boards} ${u.tableros.toLowerCase()}\n🎮 https://www.tuthor.es/juegos/numpath`
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-6">
        <div className="max-w-lg w-full">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center mb-5">
            <div className="text-6xl mb-3">🧮</div>
            <h2 className="text-3xl font-black text-white mb-1">{u.tiempoAgotado}</h2>
            <div className="mb-4 mt-6">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-1">{u.tableros}</p>
              <p className="text-white font-black text-6xl tabular-nums">{boards}</p>
            </div>
          </div>
          <div className="space-y-3">
            <button onClick={() => navigator.clipboard.writeText(shareText).then(() => alert(lang === 'en' ? 'Copied!' : '¡Copiado!'))}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 rounded-xl transition">
              {u.compartir}
            </button>
            <button onClick={startGame}
              className="w-full bg-[#EDAE49] hover:bg-amber-400 text-black font-black py-4 text-lg rounded-xl transition">
              {u.reintentar}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── JUGANDO ───────────────────────────────────────────────────────────────
  const timerPct = Math.min(100, (timeLeft / TIME_START) * 100)
  const timerColor = timeLeft > 20 ? 'bg-green-400' : timeLeft > 10 ? 'bg-yellow-400' : 'bg-red-500 animate-pulse'
  const goalsLeft = grid.flat().filter(c => c.isGoal && !c.cleared).length

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 py-4 max-w-lg mx-auto w-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setFase('intro')} className="text-white/40 hover:text-white/70 text-sm transition-colors">
          {u.salir}
        </button>
        <div className="flex items-center gap-4 text-sm text-white/50">
          <span className="text-white font-bold tabular-nums">🧮 {boards}</span>
          <span className="text-white/30">🎯 {goalsLeft}</span>
        </div>
      </div>

      {/* Timer */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-white/40 mb-1">
          <span>{u.tiempo}</span>
          <span className={`font-bold tabular-nums ${timeLeft <= 10 ? 'text-red-400' : ''}`}>{timeLeft}s</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 ${timerColor}`}
            style={{ width: `${timerPct}%` }} />
        </div>
      </div>

      {/* Score */}
      <div className={`text-center mb-3 py-3 rounded-2xl border-2 transition-all duration-200 ${
        flash === 'correct' ? 'border-green-400 bg-green-500/20' :
        flash === 'wrong' ? 'border-red-400 bg-red-500/20' :
        'border-white/10 bg-white/5'
      }`}>
        <p className="text-white/30 text-xs uppercase tracking-widest">{u.puntuacion}</p>
        <p className="text-white font-black text-4xl tabular-nums">{score}</p>
      </div>

      {/* Grid */}
      <div className="flex-1 flex items-center justify-center">
        <div className="grid gap-1.5 w-full" style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)`, aspectRatio: '1' }}>
          {grid.map((row, r) =>
            row.map((cell, c) => {
              const isPlayer = pos.r === r && pos.c === c
              const isAdj = Math.abs(r - pos.r) + Math.abs(c - pos.c) === 1
              const isGoal = cell.isGoal && !cell.cleared
              const isCleared = cell.isGoal && cell.cleared

              let bg = 'bg-white/5 border-white/10'
              let text = 'text-white/60'

              if (isPlayer) { bg = 'bg-violet-600 border-violet-400'; text = 'text-white' }
              else if (isCleared) { bg = 'bg-green-500/20 border-green-500/30'; text = 'text-green-400/50' }
              else if (isGoal) { bg = 'bg-amber-500/20 border-amber-500/40'; text = 'text-amber-300' }
              else if (cell.used) { bg = 'bg-white/3 border-white/5'; text = 'text-white/15' }
              else if (isAdj) { bg = 'bg-white/10 border-white/20 hover:bg-white/15'; text = 'text-white/80' }

              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => move(r, c)}
                  className={`relative border rounded-xl flex flex-col items-center justify-center transition-all duration-150 ${bg} ${text} ${
                    isAdj && !isPlayer ? 'cursor-pointer hover:scale-105 active:scale-95' : isPlayer ? 'scale-110 shadow-lg shadow-violet-500/40' : 'cursor-default'
                  }`}
                  style={{ aspectRatio: '1' }}
                >
                  {isPlayer && <span className="text-lg sm:text-xl">🧑</span>}
                  {isGoal && !isPlayer && (
                    <>
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold opacity-60">{u.meta}</span>
                      <span className="font-black text-sm sm:text-base leading-none">{cell.target}</span>
                    </>
                  )}
                  {isCleared && <span className="text-lg">✓</span>}
                  {!isGoal && !isCleared && !isPlayer && !cell.isStart && (
                    <span className={`font-bold text-xs sm:text-sm ${cell.used ? 'opacity-20' : ''}`}>{cell.label}</span>
                  )}
                </button>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
