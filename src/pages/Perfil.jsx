import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getStats, formatTime } from '../lib/activity'
import { useNavigate } from 'react-router-dom'

function todayStr() { return new Date().toISOString().slice(0, 10) }

export default function Perfil() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { navigate('/'); return }
    getStats(user.uid).then(s => { setStats(s); setLoading(false) })
  }, [user])

  if (!user) return null

  const streak = stats?.streak || 0
  const dailyStreak = stats?.dailyStreak || 0
  const dailyDoneToday = stats?.lastDailyDate === todayStr()
  const statCards = [
    { label: 'Racha general', value: `${streak} día${streak !== 1 ? 's' : ''}`, emoji: '🔥' },
    { label: 'Tiempo total', value: formatTime(stats?.totalTime), emoji: '⏱️' },
    { label: 'Actividades', value: stats?.gamesPlayed ?? 0, emoji: '🎮' },
    { label: 'Exámenes aprobados', value: stats?.examsPassed ?? 0, emoji: '✅' },
  ]

  const bestScores = stats?.bestScores || {}
  const gameLabels = {
    'juego-fechas':   { label: 'Juego de Fechas',   emoji: '📅' },
    'tuthor-time':    { label: 'Tuthor Time',        emoji: '⚡' },
    'pregunta-diaria':{ label: 'Pregunta Diaria',    emoji: '🧠' },
    'orden-temporal': { label: 'Línea Temporal',     emoji: '📜' },
    'linea-temporal': { label: 'Línea Temporal Examen', emoji: '🗓️' },
  }
  const categoryLabels = {
    'gce':      { label: 'Guerra Civil Española',    emoji: '🇪🇸' },
    'wwii':     { label: 'Segunda Guerra Mundial',   emoji: '⚔️' },
    'roma':     { label: 'Antigua Roma',             emoji: '🏛️' },
    'usa':      { label: 'Independencia Americana',  emoji: '🦅' },
    'primaria': { label: 'Grandes hitos',            emoji: '🌍' },
    'global':   { label: 'Historia Global',          emoji: '🗺️' },
  }
  const statsByGame     = stats?.statsByGame     || {}
  const statsByCategory = stats?.statsByCategory || {}

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-8">
      <div className="max-w-2xl mx-auto w-full">

        {/* Cabecera */}
        <div className="flex items-center gap-4 mb-8">
          {user.photoURL
            ? <img src={user.photoURL} alt="" className="w-16 h-16 rounded-full ring-2 ring-violet-500/50" />
            : <div className="w-16 h-16 rounded-full bg-violet-600 flex items-center justify-center text-2xl font-black text-white">{user.displayName?.[0]}</div>
          }
          <div>
            <h1 className="text-2xl font-black text-white">{user.displayName}</h1>
            <p className="text-white/40 text-sm">{user.email}</p>
          </div>
          <button
            onClick={logout}
            className="ml-auto text-white/30 hover:text-white/70 text-sm border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-lg transition-all"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Stats */}
        {loading ? (
          <div className="text-white/30 text-center py-12">Cargando estadísticas...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {statCards.map(s => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <span className="text-2xl block mb-1">{s.emoji}</span>
                  <p className="text-xl font-black text-white">{s.value}</p>
                  <p className="text-white/40 text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Reto Diario */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-black text-white">📅 Reto Diario</h2>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${dailyDoneToday ? 'border-green-500/40 bg-green-500/10 text-green-400' : 'border-amber-500/40 bg-amber-500/10 text-amber-400'}`}>
                  {dailyDoneToday ? '✓ Hecho hoy' : 'Pendiente hoy'}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-black/20 rounded-xl p-3 text-center">
                  <p className="text-2xl font-black text-white">🔥 {dailyStreak}</p>
                  <p className="text-white/40 text-xs mt-0.5">días seguidos</p>
                </div>
                <div className="flex-1 bg-black/20 rounded-xl p-3 text-center">
                  <p className="text-2xl font-black text-white">{stats?.dailyTotal ?? 0}</p>
                  <p className="text-white/40 text-xs mt-0.5">retos totales</p>
                </div>
              </div>
              {!dailyDoneToday && (
                <a href="/diaria" className="mt-3 flex items-center justify-center gap-2 w-full bg-orange-500/20 border border-orange-500/30 text-orange-400 font-semibold py-2.5 rounded-xl text-sm hover:bg-orange-500/30 transition-colors">
                  Hacer el reto de hoy →
                </a>
              )}
            </div>

            {/* Por juego */}
            {Object.keys(statsByGame).length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
                <h2 className="font-black text-white mb-4">🎮 Por juego</h2>
                <div className="space-y-2">
                  {Object.entries(statsByGame).map(([game, s]) => {
                    const info = gameLabels[game] || { label: game, emoji: '🎯' }
                    return (
                      <div key={game} className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0">
                        <span className="text-lg w-7 text-center">{info.emoji}</span>
                        <span className="flex-1 text-white/80 text-sm font-medium">{info.label}</span>
                        <div className="flex items-center gap-4 text-right">
                          <div className="hidden sm:block text-center">
                            <p className="text-white font-bold text-sm">{s.plays ?? 0}</p>
                            <p className="text-white/30 text-[10px]">partidas</p>
                          </div>
                          <div className="text-center">
                            <p className="text-white font-bold text-sm">{formatTime(s.timeSpent)}</p>
                            <p className="text-white/30 text-[10px]">tiempo</p>
                          </div>
                          {s.bestScore > 0 && (
                            <div className="text-center">
                              <p className="text-violet-400 font-black text-sm">{s.bestScore.toLocaleString()}</p>
                              <p className="text-white/30 text-[10px]">mejor</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Por categoría/materia */}
            {Object.keys(statsByCategory).length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
                <h2 className="font-black text-white mb-4">📚 Por materia</h2>
                <div className="space-y-2">
                  {Object.entries(statsByCategory).map(([cat, s]) => {
                    const info = categoryLabels[cat] || { label: cat, emoji: '📖' }
                    return (
                      <div key={cat} className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0">
                        <span className="text-lg w-7 text-center">{info.emoji}</span>
                        <span className="flex-1 text-white/80 text-sm font-medium">{info.label}</span>
                        <div className="flex items-center gap-4 text-right">
                          <div className="hidden sm:block text-center">
                            <p className="text-white font-bold text-sm">{s.plays ?? 0}</p>
                            <p className="text-white/30 text-[10px]">partidas</p>
                          </div>
                          <div className="text-center">
                            <p className="text-white font-bold text-sm">{formatTime(s.timeSpent)}</p>
                            <p className="text-white/30 text-[10px]">tiempo</p>
                          </div>
                          {(s.examsPassed ?? 0) > 0 && (
                            <div className="text-center">
                              <p className="text-green-400 font-black text-sm">{s.examsPassed}</p>
                              <p className="text-white/30 text-[10px]">aprobados</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Mejores puntuaciones */}
            {Object.keys(bestScores).length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h2 className="font-black text-white mb-4">🏆 Mejores puntuaciones</h2>
                <div className="space-y-2">
                  {Object.entries(bestScores).map(([game, score]) => {
                    const info = gameLabels[game] || { label: game, emoji: '🎯' }
                    return (
                      <div key={game} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                        <span className="text-base w-7 text-center">{info.emoji}</span>
                        <span className="flex-1 text-white/70 text-sm">{info.label}</span>
                        <span className="font-black text-violet-400">{score.toLocaleString()} pts</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {!stats && (
              <div className="text-center py-12">
                <p className="text-4xl mb-3">🎮</p>
                <p className="text-white/40">Aún no has jugado nada. ¡Empieza ahora!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
