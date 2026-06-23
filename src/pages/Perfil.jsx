import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { getStats, formatTime } from '../lib/activity'
import { useNavigate } from 'react-router-dom'

function todayStr() { return new Date().toISOString().slice(0, 10) }

const GAME_LABELS = {
  'juego-fechas':    { label: 'Juego de Fechas',    emoji: '📅' },
  'tuthor-time':     { label: 'Tuthor Time',         emoji: '🕰️' },
  'pregunta-diaria': { label: 'Pregunta Diaria',     emoji: '⚡' },
  'orden-temporal':  { label: 'Línea Temporal',      emoji: '📜' },
  'linea-temporal':  { label: 'Línea Temporal',      emoji: '📜' },
  'quien-es-quien':  { label: '¿Quién es Quién?',   emoji: '🕵️' },
  'matematicas':     { label: 'Cálculo Mental',      emoji: '🎯' },
  'acercate':        { label: 'Acércate al Número',  emoji: '🎯' },
  'portadas':        { label: 'Portadas',            emoji: '📰' },
  'georush':         { label: 'GeoRush',             emoji: '🌍' },
}

const CATEGORY_LABELS = {
  'gce':      { label: 'Guerra Civil Española',   emoji: '🇪🇸' },
  'wwii':     { label: 'Segunda Guerra Mundial',  emoji: '⚔️' },
  'roma':     { label: 'Antigua Roma',            emoji: '🏛️' },
  'usa':      { label: 'Independencia Americana', emoji: '🦅' },
  'primaria': { label: 'Grandes Hitos',           emoji: '🌍' },
  'global':   { label: 'Historia Global',         emoji: '🗺️' },
  'facil':    { label: 'Acércate · Fácil',        emoji: '🟢' },
  'medio':    { label: 'Acércate · Medio',        emoji: '🟡' },
  'dificil':  { label: 'Acércate · Difícil',      emoji: '🔴' },
  'combinado-primaria':       { label: 'Mates · Primaria',           emoji: '📐' },
  'combinado-eso':            { label: 'Mates · ESO',                emoji: '📐' },
  'combinado-bachillerato':   { label: 'Mates · Bachillerato',      emoji: '📐' },
  'sumas-primaria':           { label: 'Sumas · Primaria',           emoji: '➕' },
  'sumas-eso':                { label: 'Sumas · ESO',                emoji: '➕' },
  'sumas-bachillerato':       { label: 'Sumas · Bachillerato',      emoji: '➕' },
  'multiplicacion-primaria':  { label: 'Multiplicación · Primaria',  emoji: '✖️' },
  'multiplicacion-eso':       { label: 'Multiplicación · ESO',       emoji: '✖️' },
  'multiplicacion-bachillerato': { label: 'Multiplicación · Bach.',  emoji: '✖️' },
  'division-primaria':        { label: 'División · Primaria',        emoji: '➗' },
  'division-eso':             { label: 'División · ESO',             emoji: '➗' },
  'division-bachillerato':    { label: 'División · Bachillerato',    emoji: '➗' },
}

function resolveLabel(key, map) {
  if (map[key]) return map[key]
  return { label: key.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), emoji: '📖' }
}

export default function Perfil() {
  const { user, logout } = useAuth()
  const { lang, localPath } = useLang()
  const navigate = useNavigate()
  const en = lang === 'en'
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAllGames, setShowAllGames] = useState(false)
  const [showAllCats, setShowAllCats] = useState(false)

  useEffect(() => {
    if (!user) { navigate(localPath('/')); return }
    getStats(user.uid).then(s => { setStats(s); setLoading(false) })
  }, [user])

  if (!user) return null

  const streak = stats?.streak || 0
  const dailyStreak = stats?.dailyStreak || 0
  const dailyDoneToday = stats?.lastDailyDate === todayStr()

  const statsByGame     = stats?.statsByGame     || {}
  const statsByCategory = stats?.statsByCategory || {}

  const gameEntries = Object.entries(statsByGame)
    .map(([key, s]) => ({ key, ...resolveLabel(key, GAME_LABELS), ...s }))
    .filter(g => g.plays > 0)
    .sort((a, b) => (b.timeSpent || 0) - (a.timeSpent || 0))

  const catEntries = Object.entries(statsByCategory)
    .map(([key, s]) => ({ key, ...resolveLabel(key, CATEGORY_LABELS), ...s }))
    .filter(c => c.plays > 0)
    .sort((a, b) => (b.plays || 0) - (a.plays || 0))

  const visibleGames = showAllGames ? gameEntries : gameEntries.slice(0, 3)
  const visibleCats  = showAllCats  ? catEntries  : catEntries.slice(0, 3)

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
          <button onClick={logout}
            className="ml-auto text-white/30 hover:text-white/70 text-sm border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-lg transition-all">
            {en ? 'Sign out' : 'Cerrar sesión'}
          </button>
        </div>

        {loading ? (
          <div className="text-white/30 text-center py-12">Cargando estadísticas...</div>
        ) : !stats ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">🎮</p>
            <p className="text-white/40">Aún no has jugado nada. ¡Empieza ahora!</p>
          </div>
        ) : (
          <>
            {/* Stats resumen */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: en ? 'Streak' : 'Racha', value: `${streak}`, sub: en ? (streak === 1 ? 'day' : 'days') : (streak === 1 ? 'día' : 'días'), emoji: '🔥' },
                { label: en ? 'Time' : 'Tiempo', value: formatTime(stats.totalTime), emoji: '⏱️' },
                { label: en ? 'Activities' : 'Actividades', value: stats.gamesPlayed ?? 0, emoji: '🎮' },
                { label: en ? 'Passed' : 'Aprobados', value: stats.examsPassed ?? 0, emoji: '✅' },
              ].map(s => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <span className="text-2xl block mb-1">{s.emoji}</span>
                  <p className="text-xl font-black text-white">{s.value}</p>
                  <p className="text-white/40 text-xs mt-0.5">{s.sub || s.label}</p>
                </div>
              ))}
            </div>

            {/* Reto diario */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-black text-white">📅 {en ? 'Daily Challenge' : 'Reto Diario'}</h2>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${dailyDoneToday ? 'border-green-500/40 bg-green-500/10 text-green-400' : 'border-amber-500/40 bg-amber-500/10 text-amber-400'}`}>
                  {dailyDoneToday ? (en ? '✓ Done today' : '✓ Hecho hoy') : (en ? 'Pending today' : 'Pendiente hoy')}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-black/20 rounded-xl p-3 text-center">
                  <p className="text-2xl font-black text-white">🔥 {dailyStreak}</p>
                  <p className="text-white/40 text-xs mt-0.5">{en ? 'days in a row' : 'días seguidos'}</p>
                </div>
                <div className="flex-1 bg-black/20 rounded-xl p-3 text-center">
                  <p className="text-2xl font-black text-white">{stats.dailyTotal ?? 0}</p>
                  <p className="text-white/40 text-xs mt-0.5">{en ? 'total challenges' : 'retos totales'}</p>
                </div>
              </div>
              {!dailyDoneToday && (
                <a href="/diaria" className="mt-3 flex items-center justify-center gap-2 w-full bg-orange-500/20 border border-orange-500/30 text-orange-400 font-semibold py-2.5 rounded-xl text-sm hover:bg-orange-500/30 transition-colors">
                  {en ? "Do today's challenge →" : 'Hacer el reto de hoy →'}
                </a>
              )}
            </div>

            {/* Por juego */}
            {gameEntries.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
                <h2 className="font-black text-white mb-4">🎮 {en ? 'By game' : 'Por juego'}</h2>
                <div className="space-y-1">
                  {visibleGames.map((g, i) => (
                    <div key={g.key} className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">
                      <span className="text-lg w-7 text-center">{g.emoji}</span>
                      <span className="flex-1 text-white/80 text-sm font-medium">{g.label}</span>
                      <div className="flex items-center gap-4 text-right">
                        <div className="text-center min-w-[40px]">
                          <p className="text-white font-bold text-sm">{g.plays}</p>
                          <p className="text-white/30 text-[10px]">{en ? 'games' : 'partidas'}</p>
                        </div>
                        <div className="text-center min-w-[48px]">
                          <p className="text-white font-bold text-sm">{formatTime(g.timeSpent)}</p>
                          <p className="text-white/30 text-[10px]">tiempo</p>
                        </div>
                        {g.bestScore > 0 && (
                          <div className="text-center min-w-[40px]">
                            <p className="text-violet-400 font-black text-sm">{g.bestScore.toLocaleString()}</p>
                            <p className="text-white/30 text-[10px]">mejor</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {gameEntries.length > 3 && (
                  <button onClick={() => setShowAllGames(!showAllGames)}
                    className="mt-3 w-full text-center text-sm text-violet-400 hover:text-violet-300 font-semibold transition-colors">
                    {showAllGames ? 'Ver menos ↑' : `Ver los ${gameEntries.length} juegos ↓`}
                  </button>
                )}
              </div>
            )}

            {/* Por materia */}
            {catEntries.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
                <h2 className="font-black text-white mb-4">📚 {en ? 'By subject' : 'Por materia'}</h2>
                <div className="space-y-1">
                  {visibleCats.map(c => (
                    <div key={c.key} className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">
                      <span className="text-lg w-7 text-center">{c.emoji}</span>
                      <span className="flex-1 text-white/80 text-sm font-medium">{c.label}</span>
                      <div className="flex items-center gap-4 text-right">
                        <div className="text-center min-w-[40px]">
                          <p className="text-white font-bold text-sm">{c.plays}</p>
                          <p className="text-white/30 text-[10px]">partidas</p>
                        </div>
                        <div className="text-center min-w-[48px]">
                          <p className="text-white font-bold text-sm">{formatTime(c.timeSpent)}</p>
                          <p className="text-white/30 text-[10px]">tiempo</p>
                        </div>
                        {(c.examsPassed ?? 0) > 0 && (
                          <div className="text-center min-w-[40px]">
                            <p className="text-green-400 font-black text-sm">{c.examsPassed}</p>
                            <p className="text-white/30 text-[10px]">aprobados</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {catEntries.length > 3 && (
                  <button onClick={() => setShowAllCats(!showAllCats)}
                    className="mt-3 w-full text-center text-sm text-violet-400 hover:text-violet-300 font-semibold transition-colors">
                    {showAllCats ? 'Ver menos ↑' : `Ver las ${catEntries.length} materias ↓`}
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
