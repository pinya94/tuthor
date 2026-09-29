import { useState, useEffect } from 'react'
import { useLang } from '../context/LangContext'
import { Moneda } from './Iconos'

// Badge persistente para la pantalla de resultado: la animación dura 2,6s,
// esto deja constancia fija de las monedas ganadas en la partida.
export function CoinsEarnedBadge({ coins, lang = 'es' }) {
  if (!coins || coins <= 0) return null
  const label = { es: 'monedas ganadas', en: 'coins earned', ca: 'monedes guanyades' }
  return (
    <p className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-sm font-bold">
      <Moneda className="w-4 h-4" />
      +{coins.toLocaleString()} <span className="text-amber-300/60 font-semibold">{label[lang] ?? label.es}</span>
    </p>
  )
}

export default function CoinsAnimation({ points, coins: explicitCoins, onDone }) {
  const { tr } = useLang()
  const coins = explicitCoins !== undefined
    ? Math.max(0, Math.round(explicitCoins))
    : Math.min(Math.floor((points || 0) / 10), 200)
  const [phase, setPhase] = useState('in') // 'in' | 'out' | 'gone'

  useEffect(() => {
    if (coins <= 0) { setPhase('gone'); onDone?.(); return }
    const t1 = setTimeout(() => setPhase('out'), 2000)
    const t2 = setTimeout(() => { setPhase('gone'); onDone?.() }, 2600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === 'gone' || coins <= 0) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${phase === 'out' ? 'opacity-0' : 'opacity-100'}`}
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={() => { setPhase('out'); setTimeout(() => { setPhase('gone'); onDone?.() }, 500) }}
    >
      <div className="text-center select-none">
        <Moneda className="w-24 h-24 mx-auto mb-4" style={{ animation: 'bounce 0.5s infinite alternate' }} />
        <p className="text-amber-400 font-black tabular-nums" style={{ fontSize: 64, lineHeight: 1 }}>+{coins.toLocaleString()}</p>
        <p className="text-amber-400/60 text-lg mt-2 font-semibold">{tr({ es: 'monedas', en: 'coins', ca: 'monedes' })}</p>
      </div>
    </div>
  )
}
