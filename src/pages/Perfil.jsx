import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { getStatsAndCosmetics, setHidePhoto, formatTime, getUserRank } from '../lib/activity'
import { useNavigate } from 'react-router-dom'
import AvatarFrame from '../components/AvatarFrame'
import { FRAME_BY_ID, BANNER_BY_ID } from '../data/cosmetics'
import { GAMES } from '../lib/games'
import { examsBySubject } from '../lib/exams'

function todayStr() { return new Date().toISOString().slice(0, 10) }

// ── Juegos reales, derivados del registro central (src/lib/games.js) ──────
const GAME_LABELS = Object.fromEntries(
  Object.entries(GAMES).map(([id, g]) => [id, { ...g.label, emoji: g.emoji }])
)

// ── Agrupación por materia ────────────────────────────────────────────────
// Los exámenes (examIds/examLabels) se derivan del registro central
// (src/lib/exams.js): un examen nuevo aparece aquí sin tocar este fichero.
// catIds son categorías de juego (no exámenes) y mantienen sus etiquetas.
const SUBJECT_DEFS = [
  {
    id: 'historia', emoji: '⚔️',
    label: { es: 'Historia', en: 'History', ca: 'Història' },
    gameIds: ['tuthor-time', 'juego-fechas', 'orden-temporal', 'linea-temporal', 'quien-es-quien', 'portadas'],
    catIds: ['gce', 'wwii', 'roma', 'usa', 'primaria', 'global'],
    catLabels: {
      'gce':     { es: 'Guerra Civil Española',    en: 'Spanish Civil War',     ca: 'Guerra Civil Espanyola'  },
      'wwii':    { es: 'Segunda Guerra Mundial',   en: 'World War II',          ca: 'Segona Guerra Mundial'   },
      'roma':    { es: 'Antigua Roma',             en: 'Ancient Rome',          ca: 'Roma Antiga'             },
      'usa':     { es: 'Independencia Americana',  en: 'American Independence', ca: 'Independència Americana' },
      'primaria':{ es: 'Grandes Hitos',            en: 'Great Milestones',      ca: 'Grans Fites'             },
      'global':  { es: 'Historia Global',          en: 'World History',         ca: 'Història Global'         },
    },
  },
  {
    id: 'geografia', emoji: '🌍',
    label: { es: 'Geografía', en: 'Geography', ca: 'Geografia' },
    gameIds: ['georush', 'geomapa'],
    catIds: [],
    catLabels: {},
  },
  {
    id: 'matematicas', emoji: '🔢',
    label: { es: 'Matemáticas', en: 'Maths', ca: 'Matemàtiques' },
    gameIds: ['matematicas', 'acercate-clasico', 'acercate-roguelike', 'numpath', 'trayectoria', 'portero'],
    catIds: ['facil', 'medio', 'dificil', 'combinado-primaria', 'combinado-eso', 'combinado-bachillerato',
             'sumas-primaria', 'sumas-eso', 'sumas-bachillerato',
             'multiplicacion-primaria', 'multiplicacion-eso', 'multiplicacion-bachillerato',
             'division-primaria', 'division-eso', 'division-bachillerato'],
    catLabels: {},
  },
  {
    id: 'ciencias', emoji: '🔬',
    label: { es: 'Ciencias', en: 'Science', ca: 'Ciències' },
    gameIds: [],
    catIds: [],
    catLabels: {},
  },
  {
    id: 'lengua', emoji: '📖',
    label: { es: 'Lengua', en: 'Language', ca: 'Llengua' },
    gameIds: ['intruso'],
    catIds: [],
    catLabels: {},
  },
  {
    id: 'ingles', emoji: '🇬🇧',
    label: { es: 'Inglés', en: 'English', ca: 'Anglès' },
    gameIds: [],
    catIds: [],
    catLabels: {},
  },
]

const SUBJECTS = SUBJECT_DEFS.map(s => {
  const exams = examsBySubject(s.id)
  return {
    ...s,
    examIds: exams.map(e => e.id),
    examLabels: {
      ...Object.fromEntries(exams.map(e => [e.id, e.label])),
      ...s.catLabels,
    },
  }
})

export default function Perfil() {
  const { user, logout } = useAuth()
  const { lang, localPath } = useLang()
  const navigate = useNavigate()
  const en = lang === 'en'
  const ca = lang === 'ca'
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAllGames, setShowAllGames] = useState(false)
  const [expandedSubject, setExpandedSubject] = useState(null)
  const [equippedFrame, setEquippedFrame] = useState('default')
  const [equippedBanner, setEquippedBanner] = useState('banner_default')
  const [equippedAvatar, setEquippedAvatar] = useState(null)
  const [hidePhoto, setHidePhotoState] = useState(false)
  const [rankings, setRankings] = useState({})

  useEffect(() => {
    if (!user) { navigate(localPath('/')); return }
    getStatsAndCosmetics(user.uid).then(data => {
      setStats(data)
      setEquippedFrame(data.equippedFrame)
      setEquippedBanner(data.equippedBanner)
      setEquippedAvatar(data.equippedAvatar)
      setHidePhotoState(data.hidePhoto ?? false)
      setLoading(false)
      // Posición en el ranking de cada juego jugado (count agregado, sin
      // descargar el ranking entero)
      const playedGames = Object.keys(data.statsByGame || {}).filter(k => GAME_LABELS[k])
      Promise.all(playedGames.map(async k => {
        const best = data.bestScores?.[k]
        const rank = best !== undefined ? await getUserRank(k, best) : null
        return [k, rank]
      })).then(results => setRankings(Object.fromEntries(results.filter(([, v]) => v))))
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

  // Only real games (those in GAME_LABELS), with at least 1 play
  const gameEntries = Object.entries(GAME_LABELS)
    .map(([key, lbl]) => {
      const s = statsByGame[key] || {}
      return { key, label: lbl[lang] || lbl.es, emoji: lbl.emoji, ...s }
    })
    .filter(g => (g.plays || 0) > 0)
    .sort((a, b) => (b.bestScore || 0) - (a.bestScore || 0))

  const visibleGames = showAllGames ? gameEntries : gameEntries.slice(0, 4)

  // Per-subject: aggregate games + exams
  const subjectEntries = SUBJECTS.map(subj => {
    // Game stats
    const gameStats = subj.gameIds.reduce((acc, gId) => {
      const s = statsByGame[gId] || {}
      acc.plays += s.plays || 0
      acc.timeSpent += s.timeSpent || 0
      return acc
    }, { plays: 0, timeSpent: 0 })

    // Exam rows (from statsByGame for ExamenMC, statsByCategory for historia/geo exams)
    const examRows = [
      ...subj.examIds.map(id => {
        const s = statsByGame[id] || {}
        if (!s.plays) return null
        const lbl = subj.examLabels[id]
        return { id, label: lbl?.[lang] || lbl?.es || id, plays: s.plays, passed: statsByCategory[id]?.examsPassed || 0, timeSpent: s.timeSpent || 0 }
      }),
      ...subj.catIds.map(id => {
        const s = statsByCategory[id] || {}
        if (!s.plays) return null
        // Only show if it looks like an exam (has examsPassed data or type examen)
        if ((s.examsPassed ?? -1) < 0) return null
        const lbl = subj.examLabels[id]
        return { id, label: lbl?.[lang] || lbl?.es || id, plays: s.plays, passed: s.examsPassed || 0, timeSpent: s.timeSpent || 0 }
      }),
    ].filter(Boolean)

    const totalExamPlays  = examRows.reduce((a, r) => a + r.plays, 0)
    const totalPassed     = examRows.reduce((a, r) => a + r.passed, 0)
    const examTimeSpent   = examRows.reduce((a, r) => a + (r.timeSpent || 0), 0)
    const totalPlays      = gameStats.plays + totalExamPlays

    return { ...subj, gameStats, examRows, totalExamPlays, totalPassed, totalPlays, timeSpent: gameStats.timeSpent + examTimeSpent }
  }).filter(s => s.totalPlays > 0)

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
                  {visibleGames.map(g => {
                    const rank = rankings[g.key]
                    return (
                      <div key={g.key} className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">
                        <span className="text-lg w-7 text-center">{g.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white/80 text-sm font-medium truncate">{g.label}</p>
                          {rank && (
                            <p className="text-amber-400/70 text-[10px] font-semibold">
                              #{rank.rank} {ca ? 'de' : en ? 'of' : 'de'} {rank.total}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-right shrink-0">
                          <div className="text-center min-w-[36px]">
                            <p className="text-white font-bold text-sm">{g.plays ?? 0}</p>
                            <p className="text-white/30 text-[10px]">{ca ? 'partides' : en ? 'games' : 'partidas'}</p>
                          </div>
                          {(g.timeSpent || 0) > 0 && (
                            <div className="text-center min-w-[44px]">
                              <p className="text-white font-bold text-sm">{formatTime(g.timeSpent)}</p>
                              <p className="text-white/30 text-[10px]">{ca ? 'temps total' : en ? 'total time' : 'tiempo total'}</p>
                            </div>
                          )}
                          {(g.bestScore || 0) > 0 && (
                            <div className="text-center min-w-[44px]">
                              <p className="text-violet-400 font-black text-sm">{g.bestScore.toLocaleString()}</p>
                              <p className="text-white/30 text-[10px]">{ca ? 'millor pts' : en ? 'best pts' : 'mejor pts'}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
                {gameEntries.length > 4 && (
                  <button onClick={() => setShowAllGames(!showAllGames)}
                    className="mt-3 w-full text-center text-sm text-violet-400 hover:text-violet-300 font-semibold transition-colors">
                    {showAllGames
                      ? (ca ? 'Veure menys ↑' : en ? 'Show less ↑' : 'Ver menos ↑')
                      : (ca ? `Veure els ${gameEntries.length} jocs ↓` : en ? `Show all ${gameEntries.length} games ↓` : `Ver los ${gameEntries.length} juegos ↓`)}
                  </button>
                )}
              </div>
            )}

            {/* Por materia */}
            {subjectEntries.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
                <h2 className="font-black text-white mb-4">📚 {ca ? 'Per matèria' : en ? 'By subject' : 'Por materia'}</h2>
                <div className="space-y-1">
                  {subjectEntries.map(subj => {
                    const subjLabel = subj.label[lang] || subj.label.es
                    const isOpen = expandedSubject === subj.id
                    const failed = subj.totalExamPlays - subj.totalPassed
                    return (
                      <div key={subj.id} className="border-b border-white/5 last:border-0">
                        <button
                          onClick={() => setExpandedSubject(isOpen ? null : subj.id)}
                          className="w-full flex items-center gap-3 py-3 text-left hover:bg-white/3 rounded-lg transition-colors"
                        >
                          <span className="text-lg w-7 text-center">{subj.emoji}</span>
                          <div className="flex-1">
                            <p className="text-white/80 text-sm font-semibold">{subjLabel}</p>
                            <p className="text-white/30 text-[10px]">
                              {subj.totalPlays} {ca ? 'activitats' : en ? 'activities' : 'actividades'}
                              {subj.totalExamPlays > 0 && ` · ${subj.totalPassed}✅ ${failed > 0 ? `${failed}❌` : ''}`}
                            </p>
                          </div>
                          {(subj.timeSpent || 0) > 0 && (
                            <span className="text-white/40 text-xs">{formatTime(subj.timeSpent)}</span>
                          )}
                          <span className="text-white/30 text-xs ml-1">{isOpen ? '▲' : '▼'}</span>
                        </button>
                        {isOpen && subj.examRows.length > 0 && (
                          <div className="ml-10 mb-3 space-y-1">
                            <p className="text-white/30 text-[10px] uppercase tracking-wider mb-2">
                              {ca ? 'Exàmens' : en ? 'Exams' : 'Exámenes'}
                            </p>
                            {subj.examRows.map(row => {
                              const rowFailed = row.plays - row.passed
                              return (
                                <div key={row.id} className="flex items-center gap-2 py-1.5">
                                  <span className="flex-1 text-white/60 text-xs">{row.label}</span>
                                  <span className="text-white/40 text-xs">{row.plays}x</span>
                                  <span className="text-green-400 text-xs font-bold">{row.passed}✅</span>
                                  {rowFailed > 0 && <span className="text-red-400 text-xs font-bold">{rowFailed}❌</span>}
                                </div>
                              )
                            })}
                          </div>
                        )}
                        {isOpen && subj.examRows.length === 0 && subj.gameStats.plays > 0 && (
                          <p className="ml-10 mb-3 text-white/30 text-xs">
                            {ca ? 'Sense exàmens fets' : en ? 'No exams taken' : 'Sin exámenes realizados'}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
