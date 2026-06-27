import { useState, useEffect } from 'react'

export default function CoinsAnimation({ points, onDone }) {
  const coins = Math.floor(points / 10)
  const [phase, setPhase] = useState('points') // 'points' → 'converting' → 'coins'
  const [displayPts, setDisplayPts] = useState(points)
  const [displayCoins, setDisplayCoins] = useState(0)

  useEffect(() => {
    if (points <= 0) { onDone?.(); return }

    const t1 = setTimeout(() => setPhase('converting'), 600)
    const t2 = setTimeout(() => {
      const steps = 20
      const ptsStep = points / steps
      const coinsStep = coins / steps
      let step = 0
      const id = setInterval(() => {
        step++
        setDisplayPts(Math.max(0, Math.round(points - ptsStep * step)))
        setDisplayCoins(Math.min(coins, Math.round(coinsStep * step)))
        if (step >= steps) {
          clearInterval(id)
          setPhase('coins')
          setTimeout(() => onDone?.(), 1200)
        }
      }, 40)
      return () => clearInterval(id)
    }, 1000)

    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      {/* Points */}
      <div className={`transition-all duration-500 ${phase === 'coins' ? 'opacity-30 scale-75' : 'opacity-100'}`}>
        <p className="text-white/30 text-xs uppercase tracking-widest">⭐</p>
        <p className={`font-black tabular-nums transition-all duration-300 ${
          phase === 'points' ? 'text-4xl text-white' : 'text-2xl text-white/50'
        }`}>{displayPts.toLocaleString()}</p>
      </div>

      {/* Arrow */}
      {phase !== 'points' && (
        <div className={`text-amber-400 text-lg transition-all duration-300 ${phase === 'converting' ? 'animate-bounce' : ''}`}>
          ↓ ÷10
        </div>
      )}

      {/* Coins */}
      {phase !== 'points' && (
        <div className={`transition-all duration-500 ${phase === 'coins' ? 'scale-110' : ''}`}>
          <p className="text-amber-400/50 text-xs uppercase tracking-widest">💰</p>
          <p className={`font-black tabular-nums text-amber-400 ${
            phase === 'coins' ? 'text-4xl' : 'text-2xl'
          }`}>+{displayCoins.toLocaleString()}</p>
        </div>
      )}
    </div>
  )
}
