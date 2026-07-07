import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { getStats, getStatsAndCosmetics, setHidePhoto, formatTime } from '../lib/activity'
import { useNavigate } from 'react-router-dom'
import AvatarFrame from '../components/AvatarFrame'
import { FRAME_BY_ID, BANNER_BY_ID, DEFAULT_AVATAR_EMOJI } from '../data/cosmetics'

function todayStr() { return new Date().toISOString().slice(0, 10) }

const GAME_LABELS = {
  'juego-fechas':    { es: 'Juego de Fechas',    en: 'Date Game',         ca: 'Joc de Dates',       emoji: '📅' },
  'tuthor-time':     { es: 'Tuthor Time',         en: 'Tuthor Time',       ca: 'Tuthor Time',        emoji: '🕰️' },
  'pregunta-diaria': { es: 'Pregunta Diaria',     en: 'Daily Challenge',   ca: 'Pregunta Diària',    emoji: '⚡' },
  'orden-temporal':  { es: 'Línea Temporal',      en: 'Timeline',          ca: 'Línia Temporal',     emoji: '📜' },
  'linea-temporal':  { es: 'Línea Temporal',      en: 'Timeline',          ca: 'Línia Temporal',     emoji: '📜' },
  'quien-es-quien':  { es: '¿Quién es Quién?',   en: 'Who is Who?',       ca: 'Qui és qui?',        emoji: '🕵️' },
  'matematicas':     { es: 'Cálculo Mental',      en: 'Mental Maths',      ca: 'Càlcul Mental',      emoji: '🎯' },
  'acercate':        { es: 'Acércate al Número',  en: 'Target Number',     ca: "Acosta't al Número", emoji: '🎯' },
  'portadas':        { es: 'Portadas',            en: 'Headlines',         ca: 'Portades',           emoji: '📰' },
  'georush':         { es: 'GeoRush',             en: 'GeoRush',           ca: 'GeoRush',            emoji: '🌍' },
  'geomapa':         { es: 'GeoMapa',             en: 'GeoMap',            ca: 'GeoMapa',            emoji: '🗺️' },
  'numpath':         { es: 'NumPath',             en: 'NumPath',           ca: 'NumPath',            emoji: '🧮' },
}

const CATEGORY_LABELS = {
  'gce':      { es: 'Guerra Civil Española',   en: 'Spanish Civil War',      ca: 'Guerra Civil Espanyola',   emoji: '⚔️' },
  'wwii':     { es: 'Segunda Guerra Mundial',  en: 'World War II',           ca: 'Segona Guerra Mundial',    emoji: '⚔️' },
  'roma':     { es: 'Antigua Roma',            en: 'Ancient Rome',           ca: 'Roma Antiga',              emoji: '🏛️' },
  'usa':      { es: 'Independencia Americana', en: 'American Independence',  ca: 'Independència Americana',  emoji: '🦅' },
  'primaria': { es: 'Grandes Hitos',           en: 'Great Milestones',       ca: 'Grans Fites',              emoji: '🌍' },
  'global':   { es: 'Historia Global',         en: 'World History',          ca: 'Història Global',          emoji: '🗺️' },
  'facil':    { es: 'Acércate · Fácil',        en: 'Target Number · Easy',   ca: "Acosta't · Fàcil",        emoji: '🟢' },
  'medio':    { es: 'Acércate · Medio',        en: 'Target Number · Medium', ca: "Acosta't · Mitjà",        emoji: '🟡' },
  'dificil':  { es: 'Acércate · Difícil',      en: 'Target Number · Hard',   ca: "Acosta't · Difícil",      emoji: '🔴' },
  'combinado-primaria':       { es: 'Mates · Primaria',           en: 'Maths · Primary',          ca: 'Mates · Primària',          emoji: '📐' },
  'combinado-eso':            { es: 'Mates · ESO',                en: 'Maths · Secondary',        ca: 'Mates · ESO',               emoji: '📐' },
  'combinado-bachillerato':   { es: 'Mates · Bachillerato',      en: 'Maths · Sixth Form',      ca: 'Mates · Batxillerat',       emoji: '📐' },
  'sumas-primaria':           { es: 'Sumas · Primaria',           en: 'Addition · Primary',       ca: 'Sumes · Primària',          emoji: '➕' },
  'sumas-eso':                { es: 'Sumas · ESO',                en: 'Addition · Secondary',     ca: 'Sumes · ESO',               emoji: '➕' },
  'sumas-bachillerato':       { es: 'Sumas · Bachillerato',      en: 'Addition · Sixth Form',   ca: 'Sumes · Batxillerat',       emoji: '➕' },
  'multiplicacion-primaria':  { es: 'Multiplicación · Primaria',  en: 'Multiplication · Primary', ca: 'Multiplicació · Primària',  emoji: '✖️' },
  'multiplicacion-eso':       { es: 'Multiplicación · ESO',       en: 'Multiplication · Secondary', ca: 'Multiplicació · ESO',     emoji: '✖️' },
  'multiplicacion-bachillerato': { es: 'Multiplicación · Bach.',  en: 'Multiplication · 6th Form', ca: 'Multiplicació · Batx.',   emoji: '✖️' },
  'division-primaria':        { es: 'División · Primaria',        en: 'Division · Primary',       ca: 'Divisió · Primària',        emoji: '➗' },
  'division-eso':             { es: 'División · ESO',             en: 'Division · Secondary',     ca: 'Divisió · ESO',             emoji: '➗' },
  'division-bachillerato':    { es: 'División · Bachillerato',    en: 'Division · Sixth Form',   ca: 'Divisió · Batxillerat',     emoji: '➗' },
}

function resolveLabel(key, map, lang) {
  const entry = map[key]
  if (entry) return { label: entry[lang] || entry.es, emoji: entry.emoji }
  return { label: key.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), emoji: '📖' }
}

export default function Perfil() {
  const { user, logout } = useAuth()
  const { lang, localPath } = useLang()
  const navigate = useNavigate()
  const en = lang === 'en'
  const ca = lang === 'ca'
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAllGames, setShowAllGames] = useState(false)
  const [showAllCats, setShowAllCats] = useState(false)
  const [equippedFrame, setEquippedFrame] = useState('default')
  const [equippedBanner, setEquippedBanner] = useState('banner_default')
  const [equippedAvatar, setEquippedAvatar] = useState(null)
  const [hidePhoto, setHidePhotoState] = useState(false)

  useEffect(() => {
    if (!user) { navigate(localPath('/')); return }
    getStatsAndCosmetics(user.uid).then(cosmetics => {
      setStats(cosmetics)
      setEquippedFrame(cosmetics.equippedFrame)
      setEquippedBanner(cosmetics.equippedBanner)
      setEquippedAvatar(cosmetics.equippedAvatar)
      setHidePhotoState(cosmetics.hidePhoto ?? false)
      setLoading(false)
    })
  }, [user])

  async function toggleHidePhoto() {
    const next = !hidePhoto
    setHidePhotoState(next)
    await setHidePhoto(user.uid, next)
  }

  if (!user) return null

  const streak = stats?.streak || 0
  const dailyStreak = stats?.dailyStreak || 0
  const dailyDoneToday = stats?.lastDailyDate === todayStr()

  const statsByGame     = stats?.statsByGame     || {}
  const statsByCategory = stats?.statsByCategory || {}

  const gameEntries = Object.entries(statsByGame)
    .map(([key, s]) => ({ key, ...resolveLabel(key, GAME_LABELS, lang), ...s }))
    .filter(g => g.bestScore > 0)
    .sort((a, b) => (b.bestScore || 0) - (a.bestScore || 0))

  const catEntries = Object.entries(statsByCategory)
    .map(([key, s]) => ({ key, ...resolveLabel(key, CATEGORY_LABELS, lang), ...s }))
    .filter(c => c.plays > 0 && (c.bestScore > 0 || (c.examsPassed ?? 0) > 0))
    .sort((a, b) => (b.plays || 0) - (a.plays || 0))

  const visibleGames = showAllGames ? gameEntries : gameEntries.slice(0, 3)
  const visibleCats  = showAllCats  ? catEntries  : catEntries.slice(0, 3)

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-8">
      <div className="max-w-2xl mx-auto w-full">

        {/* Cabecera */}
        {(() => {
          const banner = BANNER_BY_ID[equippedBanner]
          const hasBanner = banner?.bg
          return (
            <div
              className="flex items-center gap-4 mb-8 px-4 py-4 rounded-2xl transition-all"
              style={{
                background: hasBanner ? banner.bg : undefined,
                borderLeft: hasBanner ? `4px solid ${banner.border}` : undefined,
                backgroundSize: banner?.animated ? '300% 300%' : undefined,
                animation: banner?.animated ? 'frameRotate 3s ease infinite' : undefined,
              }}
            >
              <AvatarFrame user={user} frameId={equippedFrame} avatarEmoji={equippedAvatar} size="lg" hidePhoto={hidePhoto} />
              <div>
                <h1 className="text-2xl font-black text-white">{user.displayName}</h1>
                <p className="text-white/40 text-sm">{user.email}</p>
              </div>
              <div className="ml-auto flex flex-col gap-2 items-end">
                <button onClick={logout}
                  className="text-white/30 hover:text-white/70 text-sm border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-lg transition-all">
                  {ca ? 'Tancar sessió' : en ? 'Sign out' : 'Cerrar sesión'}
                </button>
                <button onClick={() => navigate(localPath('/tienda'))}
                  className="text-amber-400/70 hover:text-amber-400 text-sm border border-amber-500/20 hover:border-amber-500/40 px-3 py-1.5 rounded-lg transition-all">
                  🛍 {ca ? 'Botiga' : en ? 'Shop' : 'Tienda'}
                </button>
              </div>
            </div>
          )
        })()}

        {loading ? (
          <div className="text-white/30 text-center py-12">{ca ? 'Carregant estadístiques...' : en ? 'Loading stats...' : 'Cargando estadísticas...'}</div>
        ) : !stats ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">🎮</p>
            <p className="text-white/40">{ca ? 'Encara no has jugat res. Comença ara!' : en ? "You haven't played anything yet. Start now!" : 'Aún no has jugado nada. ¡Empieza ahora!'}</p>
          </div>
        ) : (
          <>
            {/* Monedas + Puntos */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-center">
                <span className="text-2xl block mb-1">💰</span>
                <p className="text-amber-400 font-black text-2xl tabular-nums">{(stats.coins ?? 0).toLocaleString()}</p>
                <p className="text-amber-400/50 text-xs">{ca ? 'monedes' : en ? 'coins' : 'monedas'}</p>
              </div>
              <div className="bg-violet-500/10 border border-violet-500/30 rounded-2xl p-4 text-center">
                <span className="text-2xl block mb-1">⭐</span>
                <p className="text-violet-400 font-black text-2xl tabular-nums">{Object.values(stats.bestScores || {}).reduce((a, b) => a + b, 0).toLocaleString()}</p>
                <p className="text-violet-400/50 text-xs">{ca ? 'millors pts totals' : en ? 'total best pts' : 'mejores pts totales'}</p>
              </div>
            </div>

            {/* Recompensas / tienda */}
            <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-4 mb-4 flex items-center gap-4">
              <div className="flex-1">
                <p className="text-violet-300 font-black text-sm mb-0.5">🛍 {ca ? 'Botiga de cosmétics' : en ? 'Cosmetics shop' : 'Tienda de cosméticos'}</p>
                <p className="text-white/40 text-xs">
                  {ca ? `Marc: ${FRAME_BY_ID[equippedFrame]?.name?.ca ?? equippedFrame}` : en ? `Frame: ${FRAME_BY_ID[equippedFrame]?.name?.en ?? equippedFrame}` : `Marco: ${FRAME_BY_ID[equippedFrame]?.name?.es ?? equippedFrame}`}
                  {' · '}
                  {ca ? `Banner: ${BANNER_BY_ID[equippedBanner]?.name?.ca ?? equippedBanner}` : en ? `Banner: ${BANNER_BY_ID[equippedBanner]?.name?.en ?? equippedBanner}` : `Banner: ${BANNER_BY_ID[equippedBanner]?.name?.es ?? equippedBanner}`}
                </p>
              </div>
              <button onClick={() => navigate(localPath('/tienda'))}
                className="bg-violet-600 hover:bg-violet-500 text-white font-black text-sm px-4 py-2.5 rounded-xl transition-all whitespace-nowrap">
                {ca ? 'Obrir botiga' : en ? 'Open shop' : 'Abrir tienda'}
              </button>
            </div>

            {/* Toggle foto de perfil */}
            {user.photoURL && (
              <button
                onClick={toggleHidePhoto}
                className="w-full mb-4 flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-4 py-3 hover:bg-white/8 transition-colors"
              >
                <span className="text-white/60 text-sm">
                  {ca ? 'Usar emoji en lloc de foto' : en ? 'Use emoji instead of photo' : 'Usar emoji en lugar de foto'}
                </span>
                <span className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${hidePhoto ? 'bg-violet-600' : 'bg-white/20'}`}>
                  <span className={`w-4 h-4 rounded-full bg-white transition-transform ${hidePhoto ? 'translate-x-4' : 'translate-x-0'}`} />
                </span>
              </button>
            )}

            {/* Stats resumen */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: ca ? 'Ratxa' : en ? 'Streak' : 'Racha', value: `${streak}`, sub: ca ? (streak === 1 ? 'dia' : 'dies') : en ? (streak === 1 ? 'day' : 'days') : (streak === 1 ? 'día' : 'días'), emoji: '🔥' },
                { label: ca ? 'Temps' : en ? 'Time' : 'Tiempo', value: formatTime(stats.totalTime), emoji: '⏱️' },
                { label: ca ? 'Activitats' : en ? 'Activities' : 'Actividades', value: stats.gamesPlayed ?? 0, emoji: '🎮' },
                { label: ca ? 'Aprovats' : en ? 'Passed' : 'Aprobados', value: stats.examsPassed ?? 0, emoji: '✅' },
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
                <h2 className="font-black text-white">📅 {ca ? 'Repte Diari' : en ? 'Daily Challenge' : 'Reto Diario'}</h2>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${dailyDoneToday ? 'border-green-500/40 bg-green-500/10 text-green-400' : 'border-amber-500/40 bg-amber-500/10 text-amber-400'}`}>
                  {dailyDoneToday ? (ca ? '✓ Fet avui' : en ? '✓ Done today' : '✓ Hecho hoy') : (ca ? 'Pendent avui' : en ? 'Pending today' : 'Pendiente hoy')}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-black/20 rounded-xl p-3 text-center">
                  <p className="text-2xl font-black text-white">🔥 {dailyStreak}</p>
                  <p className="text-white/40 text-xs mt-0.5">{ca ? 'dies seguits' : en ? 'days in a row' : 'días seguidos'}</p>
                </div>
                <div className="flex-1 bg-black/20 rounded-xl p-3 text-center">
                  <p className="text-2xl font-black text-white">{stats.dailyTotal ?? 0}</p>
                  <p className="text-white/40 text-xs mt-0.5">{ca ? 'reptes totals' : en ? 'total challenges' : 'retos totales'}</p>
                </div>
              </div>
              {!dailyDoneToday && (
                <a href="/diaria" className="mt-3 flex items-center justify-center gap-2 w-full bg-orange-500/20 border border-orange-500/30 text-orange-400 font-semibold py-2.5 rounded-xl text-sm hover:bg-orange-500/30 transition-colors">
                  {ca ? 'Fer el repte d\'avui →' : en ? "Do today's challenge →" : 'Hacer el reto de hoy →'}
                </a>
              )}
            </div>

            {/* Por juego */}
            {gameEntries.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
                <h2 className="font-black text-white mb-4">🎮 {ca ? 'Per joc' : en ? 'By game' : 'Por juego'}</h2>
                <div className="space-y-1">
                  {visibleGames.map((g, i) => (
                    <div key={g.key} className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">
                      <span className="text-lg w-7 text-center">{g.emoji}</span>
                      <span className="flex-1 text-white/80 text-sm font-medium">{g.label}</span>
                      <div className="flex items-center gap-4 text-right">
                        <div className="text-center min-w-[40px]">
                          <p className="text-white font-bold text-sm">{g.plays}</p>
                          <p className="text-white/30 text-[10px]">{ca ? 'partides' : en ? 'games' : 'partidas'}</p>
                        </div>
                        <div className="text-center min-w-[48px]">
                          <p className="text-white font-bold text-sm">{formatTime(g.timeSpent)}</p>
                          <p className="text-white/30 text-[10px]">{ca ? 'temps' : en ? 'time' : 'tiempo'}</p>
                        </div>
                        {g.bestScore > 0 && (
                          <div className="text-center min-w-[40px]">
                            <p className="text-violet-400 font-black text-sm">{g.bestScore.toLocaleString()}</p>
                            <p className="text-white/30 text-[10px]">{ca ? 'millor' : en ? 'best' : 'mejor'}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {gameEntries.length > 3 && (
                  <button onClick={() => setShowAllGames(!showAllGames)}
                    className="mt-3 w-full text-center text-sm text-violet-400 hover:text-violet-300 font-semibold transition-colors">
                    {showAllGames ? (ca ? 'Veure menys ↑' : en ? 'Show less ↑' : 'Ver menos ↑') : (ca ? `Veure els ${gameEntries.length} jocs ↓` : en ? `Show all ${gameEntries.length} games ↓` : `Ver los ${gameEntries.length} juegos ↓`)}
                  </button>
                )}
              </div>
            )}

            {/* Por materia */}
            {catEntries.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
                <h2 className="font-black text-white mb-4">📚 {ca ? 'Per matèria' : en ? 'By subject' : 'Por materia'}</h2>
                <div className="space-y-1">
                  {visibleCats.map(c => (
                    <div key={c.key} className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">
                      <span className="text-lg w-7 text-center">{c.emoji}</span>
                      <span className="flex-1 text-white/80 text-sm font-medium">{c.label}</span>
                      <div className="flex items-center gap-4 text-right">
                        <div className="text-center min-w-[40px]">
                          <p className="text-white font-bold text-sm">{c.plays}</p>
                          <p className="text-white/30 text-[10px]">{ca ? 'partides' : en ? 'games' : 'partidas'}</p>
                        </div>
                        <div className="text-center min-w-[48px]">
                          <p className="text-white font-bold text-sm">{formatTime(c.timeSpent)}</p>
                          <p className="text-white/30 text-[10px]">{ca ? 'temps' : en ? 'time' : 'tiempo'}</p>
                        </div>
                        {(c.examsPassed ?? 0) > 0 && (
                          <div className="text-center min-w-[40px]">
                            <p className="text-green-400 font-black text-sm">{c.examsPassed}</p>
                            <p className="text-white/30 text-[10px]">{ca ? 'aprovats' : en ? 'passed' : 'aprobados'}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {catEntries.length > 3 && (
                  <button onClick={() => setShowAllCats(!showAllCats)}
                    className="mt-3 w-full text-center text-sm text-violet-400 hover:text-violet-300 font-semibold transition-colors">
                    {showAllCats ? (ca ? 'Veure menys ↑' : en ? 'Show less ↑' : 'Ver menos ↑') : (ca ? `Veure les ${catEntries.length} matèries ↓` : en ? `Show all ${catEntries.length} subjects ↓` : `Ver las ${catEntries.length} materias ↓`)}
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
