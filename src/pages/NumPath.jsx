import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const DIFS = {
  facil:   { label: 'Fácil', labelEn: 'Easy',   emoji: '🟢', size: 5, time: 90,  bonus: 15, ops: ['+','-'],       goalsNeeded: 1 },
  medio:   { label: 'Medio', labelEn: 'Medium', emoji: '🟡', size: 5, time: 60,  bonus: 10, ops: ['+','-','×'],   goalsNeeded: 1 },
  dificil: { label: 'Difícil', labelEn: 'Hard', emoji: '🔴', size: 5, time: 45,  bonus: 10, ops: ['+','-','×','÷'], goalsNeeded: 2 },
}

const OP_POOL = {
  '+': [
    { label: '+1', fn: s => s + 1 }, { label: '+2', fn: s => s + 2 },
    { label: '+3', fn: s => s + 3 }, { label: '+5', fn: s => s + 5 },
    { label: '+7', fn: s => s + 7 }, { label: '+10', fn: s => s + 10 },
  ],
  '-': [
    { label: '-1', fn: s => s - 1 }, { label: '-2', fn: s => s - 2 },
    { label: '-3', fn: s => s - 3 }, { label: '-5', fn: s => s - 5 },
  ],
  '×': [
    { label: '×2', fn: s => s * 2 }, { label: '×3', fn: s => s * 3 },
  ],
  '÷': [
    { label: '÷2', fn: s => Math.floor(s / 2) }, { label: '÷3', fn: s => Math.floor(s / 3) },
  ],
}

const GOALS_COUNT = 3

const UI = {
  es: {
    titulo: 'NumPath', desc: 'Navega por la cuadrícula y alcanza una meta con la puntuación exacta',
    volver: '← Volver', empezar: '¡Empezar! →', salir: '← Salir',
    puntuacion: 'Puntuación', meta: 'Meta', tiempo: 'Tiempo',
    tableros: 'Tableros', tiempoAgotado: '¡Tiempo agotado!',
    compartir: '🔗 Compartir resultado', reintentar: 'Intentarlo de nuevo',
    cambiarDif: 'Cambiar dificultad', resetear: '🔄 Reiniciar tablero',
    comoFunciona: 'Cómo funciona', reglas: 'Reglas',
    paso1: 'Muévete por la cuadrícula tocando casillas adyacentes',
    paso2: 'Cada casilla aplica una operación a tu puntuación (un solo uso)',
    paso3: 'Llega a CUALQUIER meta con la puntuación exacta',
    paso4: 'Puedes reiniciar el tablero si te atascas (mismas casillas)',
    tiempoInicial: 'Tiempo inicial', bonusPorTablero: 'Al completar',
    metasDisponibles: 'Metas', soloUna: 'alcanza solo 1 de 3',
    operaciones: 'Operaciones',
  },
  en: {
    titulo: 'NumPath', desc: 'Navigate the grid and reach a goal with the exact score',
    volver: '← Back', empezar: 'Start! →', salir: '← Exit',
    puntuacion: 'Score', meta: 'Goal', tiempo: 'Time',
    tableros: 'Boards', tiempoAgotado: 'Time is up!',
    compartir: '🔗 Share result', reintentar: 'Try again',
    cambiarDif: 'Change difficulty', resetear: '🔄 Reset board',
    comoFunciona: 'How it works', reglas: 'Rules',
    paso1: 'Move across the grid by tapping adjacent cells',
    paso2: 'Each cell applies a maths operation to your score (single use)',
    paso3: 'Reach ANY goal with the exact score',
    paso4: 'You can reset the board if you get stuck (same cells)',
    tiempoInicial: 'Starting time', bonusPorTablero: 'On completion',
    metasDisponibles: 'Goals', soloUna: 'reach just 1 of 3',
    operaciones: 'Operations',
  },
}

function rng(min, max) { return min + Math.floor(Math.random() * (max - min + 1)) }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

function buildOps(allowedTypes) {
  const pool = []
  for (const t of allowedTypes) pool.push(...(OP_POOL[t] || []))
  return pool
}

function generateBoard(size, allowedOps, startScore) {
  const ops = buildOps(allowedOps)
  const grid = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => {
      const op = pick(ops)
      return { op, label: op.label, used: false }
    })
  )
  grid[0][0] = { op: null, label: '', used: true, isStart: true }

  // Place 3 goals at random positions (not start)
  const goals = []
  while (goals.length < GOALS_COUNT) {
    const r = rng(1, size - 1), c = rng(0, size - 1)
    if (goals.some(g => g.r === r && g.c === c)) continue
    goals.push({ r, c })
  }

  // For each goal, simulate a random walk from (0,0) to compute a reachable target
  goals.forEach(g => {
    let score = startScore
    let cr = 0, cc = 0
    // Random-ish path: go right then down, with some variation
    const steps = []
    while (cr !== g.r || cc !== g.c) {
      if (cr < g.r && (cc >= g.c || Math.random() > 0.5)) { cr++; steps.push([cr, cc]) }
      else if (cc < g.c) { cc++; steps.push([cr, cc]) }
      else if (cr > g.r) { cr--; steps.push([cr, cc]) }
      else break
    }
    for (const [sr, sc] of steps) {
      const cell = grid[sr][sc]
      if (cell.op && !cell.isGoal) score = cell.op.fn(score)
    }
    grid[g.r][g.c] = { op: null, label: '', used: false, isGoal: true, target: score }
  })

  return grid
}

export default function NumPath() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const u = UI[lang] || UI.es
  const dl = d => lang === 'en' ? (d.labelEn || d.label) : d.label

  const [fase, setFase] = useState('intro')
  const [difId, setDifId] = useState('medio')
  const [grid, setGrid] = useState([])
  const [origGrid, setOrigGrid] = useState([])
  const [pos, setPos] = useState({ r: 0, c: 0 })
  const [score, setScore] = useState(10)
  const [startScore, setStartScore] = useState(10)
  const [timeLeft, setTimeLeft] = useState(60)
  const [boards, setBoards] = useState(0)
  const [flash, setFlash] = useState(null)
  const [levelKey, setLevelKey] = useState(0)

  const timerRef = useRef(null)
  const timeRef = useRef(60)

  const dif = DIFS[difId]

  function initBoard(d) {
    const dd = d || dif
    const ss = rng(1, 20)
    const g = generateBoard(dd.size, dd.ops, ss)
    setGrid(g.map(row => row.map(c => ({ ...c }))))
    setOrigGrid(g.map(row => row.map(c => ({ ...c }))))
    setPos({ r: 0, c: 0 })
    setScore(ss)
    setStartScore(ss)
    setFlash(null)
  }

  function resetBoard() {
    setGrid(origGrid.map(row => row.map(c => ({ ...c }))))
    setPos({ r: 0, c: 0 })
    setScore(startScore)
    setFlash(null)
  }

  function startGame(selectedDif) {
    const d = DIFS[selectedDif || difId]
    setDifId(selectedDif || difId)
    timeRef.current = d.time
    setTimeLeft(d.time)
    setBoards(0)
    initBoard(d)
    setFase('jugando')
    setLevelKey(k => k + 1)
  }

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
    const size = dif.size
    if (nr < 0 || nr >= size || nc < 0 || nc >= size) return
    if (Math.abs(nr - pos.r) + Math.abs(nc - pos.c) !== 1) return

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
      newGrid[nr][nc] = { ...newGrid[nr][nc], cleared: true }
      setGrid(newGrid)

      const cleared = newGrid.flat().filter(c => c.isGoal && c.cleared).length
      if (cleared >= dif.goalsNeeded) {
        timeRef.current += dif.bonus
        setTimeLeft(timeRef.current)
        setBoards(b => b + 1)
        setTimeout(() => { initBoard(); setFlash(null) }, 800)
      } else {
        setTimeout(() => setFlash(null), 500)
      }
    } else if (cell.isGoal) {
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
    const d = DIFS[difId]
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

          <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl mb-5 w-fit mx-auto">
            {Object.entries(DIFS).map(([id, dd]) => (
              <button key={id} onClick={() => setDifId(id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  difId === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'
                }`}>
                {dd.emoji} {dl(dd)}
              </button>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5 space-y-2.5 text-sm">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">{u.reglas}</p>
            {[
              ['⏱️', u.tiempoInicial, `${d.time}s`],
              ['🎁', u.bonusPorTablero, `+${d.bonus}s`],
              ['🎯', u.metasDisponibles, d.goalsNeeded === 1 ? `3 — ${u.soloUna}` : `3 — ${lang === 'en' ? `reach ${d.goalsNeeded}` : `alcanza ${d.goalsNeeded}`}`],
              ['🔢', u.operaciones, d.ops.join(' ')],
              ['📐', 'Grid', `${d.size}×${d.size}`],
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
              {[['🎮', u.paso1], ['🔢', u.paso2], ['🎯', u.paso3], ['♻️', u.paso4]].map(([e, t]) => (
                <div key={t} className="flex items-start gap-3 text-sm text-white/50">
                  <span className="text-base w-5 shrink-0 text-center">{e}</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => startGame(difId)}
            className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/30">
            {u.empezar}
          </button>
        </div>
      </div>
    )
  }

  // ── FIN ───────────────────────────────────────────────────────────────────
  if (fase === 'fin') {
    const shareText = `🧮 NumPath: ${boards} ${u.tableros.toLowerCase()} · ${dif.emoji} ${dl(dif)}\n🎮 https://www.tuthor.es/juegos/numpath`
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-6">
        <div className="max-w-lg w-full">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center mb-5">
            <div className="text-6xl mb-3">🧮</div>
            <h2 className="text-3xl font-black text-white mb-1">{u.tiempoAgotado}</h2>
            <p className="text-white/40 mb-6">{dif.emoji} {dl(dif)}</p>
            <div className="mb-4">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-1">{u.tableros}</p>
              <p className="text-white font-black text-6xl tabular-nums">{boards}</p>
            </div>
          </div>
          <div className="space-y-3">
            <button onClick={() => navigator.clipboard.writeText(shareText).then(() => alert(lang === 'en' ? 'Copied!' : '¡Copiado!'))}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 rounded-xl transition">
              {u.compartir}
            </button>
            <button onClick={() => startGame(difId)}
              className="w-full bg-[#EDAE49] hover:bg-amber-400 text-black font-black py-4 text-lg rounded-xl transition">
              {u.reintentar}
            </button>
            <button onClick={() => setFase('intro')}
              className="w-full text-white/40 hover:text-white/70 text-sm py-2 transition">
              {u.cambiarDif}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── JUGANDO ───────────────────────────────────────────────────────────────
  const size = dif.size
  const timerPct = Math.min(100, (timeLeft / dif.time) * 100)
  const timerColor = timeLeft > 20 ? 'bg-green-400' : timeLeft > 10 ? 'bg-yellow-400' : 'bg-red-500 animate-pulse'

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-3 py-3 max-w-lg mx-auto w-full">

      <div className="flex items-center justify-between mb-2">
        <button onClick={() => setFase('intro')} className="text-white/40 hover:text-white/70 text-sm transition-colors">
          {u.salir}
        </button>
        <div className="flex items-center gap-3 text-sm text-white/50">
          <span className="text-white font-bold tabular-nums">🧮 {boards}</span>
          {dif.goalsNeeded > 1 && (
            <span className="text-amber-400 font-bold">🎯 {grid.flat().filter(c => c.isGoal && c.cleared).length}/{dif.goalsNeeded}</span>
          )}
        </div>
      </div>

      <div className="mb-2">
        <div className="flex justify-between text-xs text-white/40 mb-1">
          <span>{u.tiempo}</span>
          <span className={`font-bold tabular-nums ${timeLeft <= 10 ? 'text-red-400' : ''}`}>{timeLeft}s</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 ${timerColor}`}
            style={{ width: `${timerPct}%` }} />
        </div>
      </div>

      <div className={`text-center mb-2 py-2 rounded-xl border-2 transition-all duration-200 ${
        flash === 'correct' ? 'border-green-400 bg-green-500/20' :
        flash === 'wrong' ? 'border-red-400 bg-red-500/20' :
        'border-white/10 bg-white/5'
      }`}>
        <p className="text-white/30 text-[10px] uppercase tracking-widest">{u.puntuacion}</p>
        <p className="text-white font-black text-3xl tabular-nums leading-none">{score}</p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="grid gap-1 w-full" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
          {grid.map((row, r) =>
            row.map((cell, c) => {
              const isPlayer = pos.r === r && pos.c === c
              const isAdj = Math.abs(r - pos.r) + Math.abs(c - pos.c) === 1
              const isGoal = cell.isGoal

              let bg = 'bg-white/5 border-white/10'
              let text = 'text-white/60'

              const isCleared = cell.isGoal && cell.cleared

              if (isPlayer) { bg = 'bg-violet-600 border-violet-400'; text = 'text-white' }
              else if (isCleared) { bg = 'bg-green-500/20 border-green-500/30'; text = 'text-green-400' }
              else if (isGoal) { bg = 'bg-amber-500/20 border-amber-500/40'; text = 'text-amber-300' }
              else if (cell.used) { bg = 'bg-white/3 border-white/5'; text = 'text-white/15' }
              else if (isAdj) { bg = 'bg-white/10 border-white/20 hover:bg-white/15'; text = 'text-white/80' }

              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => move(r, c)}
                  className={`relative border rounded-lg sm:rounded-xl flex flex-col items-center justify-center transition-all duration-150 ${bg} ${text} ${
                    isAdj && !isPlayer ? 'cursor-pointer hover:scale-105 active:scale-95' : isPlayer ? 'scale-105 shadow-lg shadow-violet-500/40 z-10' : 'cursor-default'
                  }`}
                  style={{ aspectRatio: '1' }}
                >
                  {isPlayer && <span className="text-base sm:text-lg">🧑</span>}
                  {isCleared && !isPlayer && <span className="text-base">✓</span>}
                  {isGoal && !isCleared && !isPlayer && (
                    <>
                      <span className="text-[7px] sm:text-[9px] uppercase font-bold opacity-60 leading-none">{u.meta}</span>
                      <span className="font-black text-xs sm:text-sm leading-none">{cell.target}</span>
                    </>
                  )}
                  {!isGoal && !isPlayer && !cell.isStart && (
                    <span className={`font-bold text-[10px] sm:text-xs ${cell.used ? 'opacity-20' : ''}`}>{cell.label}</span>
                  )}
                </button>
              )
            })
          )}
        </div>
      </div>

      <button onClick={resetBoard}
        className="mt-2 w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white/80 font-bold text-sm rounded-xl transition-all">
        {u.resetear}
      </button>
    </div>
  )
}
