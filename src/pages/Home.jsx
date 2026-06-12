import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeroCard from '../components/HeroCard'
import { MAIN_CARDS } from '../data/constants'
import { useAuth } from '../context/AuthContext'
import { getStats, formatTime } from '../lib/activity'

export default function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [stats, setStats] = useState(null)

  useEffect(() => {
    if (user) getStats(user.uid).then(setStats)
    else setStats(null)
  }, [user])

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-5 gap-4">
      {/* Título */}
      <div className="text-center">
        <h1 className="text-2xl font-black text-white">¿Qué quieres hacer hoy?</h1>
        <p className="text-white/40 mt-0.5 text-sm">Elige una sección y empieza ahora</p>
      </div>

      {/* Cards principales */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ minHeight: '280px' }}>
        {MAIN_CARDS.map(card => (
          <div key={card.id} className="min-h-[220px] sm:min-h-0">
            <HeroCard card={card} onClick={() => navigate(card.path)} />
          </div>
        ))}
      </div>

      {/* Banner progreso */}
      <div className="space-y-2">
        {user && stats ? (
          <StatsWidget stats={stats} name={user.displayName?.split(' ')[0]} onVerMas={() => navigate('/perfil')} />
        ) : user ? (
          <EmptyStatsWidget onVerMas={() => navigate('/perfil')} />
        ) : (
          <LockedWidget />
        )}
        <div className="rounded-lg border border-dashed border-white/10 bg-white/5 h-10 flex items-center justify-center">
          <span className="text-xs text-white/20 font-medium tracking-widest uppercase">Espacio publicitario</span>
        </div>
      </div>
    </div>
  )
}

function StatsWidget({ stats, name, onVerMas }) {
  const streak = stats.streak || 0
  const items = [
    { emoji: '🔥', value: `${streak} día${streak !== 1 ? 's' : ''}`, label: 'Racha' },
    { emoji: '⏱️', value: formatTime(stats.totalTime), label: 'Tiempo total' },
    { emoji: '✅', value: stats.examsPassed ?? 0, label: 'Aprobados' },
    { emoji: '🎮', value: stats.gamesPlayed ?? 0, label: 'Actividades' },
  ]
  return (
    <div className="rounded-xl border border-violet-500/30 bg-violet-600/10 backdrop-blur-sm">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
        <div>
          <p className="font-bold text-white text-sm">Tu progreso, {name}</p>
          <p className="text-white/40 text-xs">Sigue así 💪</p>
        </div>
        <button
          onClick={onVerMas}
          className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
        >
          Ver más →
        </button>
      </div>
      <div className="grid grid-cols-4 divide-x divide-white/5 px-0">
        {items.map(item => (
          <div key={item.label} className="flex flex-col items-center py-3 px-2">
            <span className="text-lg mb-0.5">{item.emoji}</span>
            <span className="text-white font-black text-sm">{item.value}</span>
            <span className="text-white/30 text-xs">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function EmptyStatsWidget({ onVerMas }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="flex items-center justify-between px-5 py-2.5">
        <div className="flex items-center gap-3">
          <span className="text-lg">📊</span>
          <div>
            <p className="font-bold text-white text-sm">Tu progreso</p>
            <p className="text-white/40 text-xs">Completa tu primera actividad para ver stats</p>
          </div>
        </div>
        <button onClick={onVerMas} className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors">
          Ver perfil →
        </button>
      </div>
    </div>
  )
}

function LockedWidget() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm opacity-50">
      <div className="flex items-center justify-between px-5 py-2.5 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <span className="text-lg">📊</span>
          <div>
            <p className="font-bold text-white text-sm">Trackea tu progreso</p>
            <p className="text-white/40 text-xs">Rachas, tiempo y estadísticas personales</p>
          </div>
        </div>
        <div className="bg-white/10 text-white/40 text-xs font-semibold px-4 py-2 rounded-lg cursor-not-allowed">
          🔒 Inicia sesión para ver
        </div>
      </div>
    </div>
  )
}
