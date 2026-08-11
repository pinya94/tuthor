import { useState } from 'react'

// Tablero de NumPath en miniatura, para el reto diario — mismo espíritu que
// ForceDiagram/BalanceBeam: recibe una ronda ya generada (numpath.js) y se
// encarga solo de pintar y de la interacción, con el estado de juego
// (moverse, marcar casillas usadas, detectar la meta) contenido aquí dentro.
// El juego completo (src/pages/NumPath.jsx) tiene su propia copia de esta
// lógica de movimiento porque además gestiona tableros múltiples, examen y
// puntuación por racha — de momento no merece la pena unificarlas.
export default function NumPathBoard({ round, disabled, onWin, meta = 'Meta' }) {
  const { grid: initialGrid, size } = round
  const [grid, setGrid]   = useState(initialGrid)
  const [pos, setPos]     = useState({ r: 0, c: 0 })
  const [score, setScore] = useState(0)
  const [flash, setFlash] = useState(null)
  const [won, setWon]     = useState(false)

  function move(r, c) {
    if (disabled || won) return
    const dist = Math.abs(r - pos.r) + Math.abs(c - pos.c)
    if (dist !== 1) return
    const cell = grid[r][c]
    if (cell.used) return

    const newScore = cell.op ? cell.op.fn(score) : score
    const newGrid = grid.map(row => row.map(x => ({ ...x })))
    newGrid[r][c] = { ...newGrid[r][c], used: true }
    setGrid(newGrid)
    setPos({ r, c })
    setScore(newScore)

    if (cell.isGoal) {
      if (newScore === cell.target) {
        setFlash('correct'); setWon(true); onWin?.(true)
      } else {
        setFlash('wrong')
        setTimeout(() => setFlash(null), 400)
      }
    }
  }

  return (
    <div>
      <div className={`text-center mb-2 py-2 rounded-xl border-2 transition-all duration-200 ${
        flash === 'correct' ? 'border-green-400 bg-green-500/20' :
        flash === 'wrong' ? 'border-red-400 bg-red-500/20' :
        'border-white/10 bg-white/5'
      }`}>
        <p className="text-white font-black text-2xl tabular-nums leading-none">{score}</p>
      </div>

      <div className="grid gap-1 w-full" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
        {grid.map((row, r) =>
          row.map((cell, c) => {
            const isPlayer = pos.r === r && pos.c === c
            const isAdj = Math.abs(r - pos.r) + Math.abs(c - pos.c) === 1
            const isGoal = cell.isGoal

            let bg = 'bg-white/5 border-white/10'
            let text = 'text-white/60'

            if (isPlayer) { bg = 'bg-violet-600 border-violet-400'; text = 'text-white' }
            else if (isGoal && won) { bg = 'bg-green-500/20 border-green-500/30'; text = 'text-green-400' }
            else if (isGoal) { bg = 'bg-amber-500/20 border-amber-500/40'; text = 'text-amber-300' }
            else if (cell.used) { bg = 'bg-white/3 border-white/5'; text = 'text-white/15' }
            else if (isAdj && !disabled && !won) { bg = 'bg-white/10 border-white/20 hover:bg-white/15'; text = 'text-white/80' }

            return (
              <button
                key={`${r}-${c}`}
                onClick={() => move(r, c)}
                disabled={disabled || won}
                className={`relative border rounded-lg flex flex-col items-center justify-center transition-all duration-150 ${bg} ${text} ${
                  isAdj && !isPlayer && !disabled && !won ? 'cursor-pointer hover:scale-105 active:scale-95' : isPlayer ? 'scale-105 shadow-lg shadow-violet-500/40 z-10' : 'cursor-default'
                }`}
                style={{ aspectRatio: '1' }}
              >
                {isPlayer && <span className="text-base">🧑</span>}
                {isGoal && won && !isPlayer && <span className="text-sm">✓</span>}
                {isGoal && !won && !isPlayer && (
                  <>
                    <span className="text-[7px] uppercase font-bold opacity-60 leading-none">{meta}</span>
                    <span className="font-black text-xs leading-none">{cell.target}</span>
                  </>
                )}
                {!isGoal && !isPlayer && !cell.isStart && (
                  <span className={`font-bold text-[10px] ${cell.used ? 'opacity-20' : ''}`}>{cell.label}</span>
                )}
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}
