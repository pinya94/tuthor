import { useState, useEffect } from 'react'

export default function CoinsAnimation({ points, coins: explicitCoins }) {
  const coins = explicitCoins !== undefined
    ? Math.max(0, Math.round(explicitCoins))
    : Math.min(Math.floor((points || 0) / 10), 200)
  const [phase, setPhase] = useState('in') // 'in' | 'out' | 'gone'

  useEffect(() => {
    if (coins <= 0) { setPhase('gone'); return }
    const t1 = setTimeout(() => setPhase('out'), 2000)
    const t2 = setTimeout(() => setPhase('gone'), 2600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === 'gone' || coins <= 0) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${phase === 'out' ? 'opacity-0' : 'opacity-100'}`}
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={() => setPhase('out')}
    >
      <div className="text-center select-none">
        <div className="text-7xl mb-4" style={{ animation: 'bounce 0.5s infinite alternate' }}>💰</div>
        <p className="text-amber-400 font-black" style={{ fontSize: 64, lineHeight: 1 }}>+{coins.toLocaleString()}</p>
        <p className="text-amber-400/60 text-lg mt-2 font-semibold">monedas</p>
      </div>
    </div>
  )
}
