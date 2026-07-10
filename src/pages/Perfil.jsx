import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { getStatsAndCosmetics, setHidePhoto, formatTime, getUserRank } from '../lib/activity'
import { useNavigate } from 'react-router-dom'
import AvatarFrame from '../components/AvatarFrame'
import { BANNER_BY_ID } from '../data/cosmetics'
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

  // Titulares del perfil
  const totalBestPts = Object.values(stats?.bestScores || {}).reduce((a, b) => a + b, 0)
  const examsTaken   = subjectEntries.reduce((a, s) => a + s.totalExamPlays, 0)

  const t2 = 'text-white/60'
  const t3 = 'text-white/45'

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-6 py-6">
      <div className="max-w-3xl mx-auto w-full">

        {/* ── HERO ── */}
        {(() => {
          const banner = BANNER_BY_ID[equippedBanner]
          const hasBanner = banner?.bg
          return (
            <div
              className="flex items-center gap-4 flex-wrap mb-3.5 p-5 rounded-[22px] border border-white/10"
              style={{
                background: hasBanner ? banner.bg : 'linear-gradient(135deg, rgba(139,92,246,.16), rgba(237,174,73,.07))',
                borderLeft: hasBanner ? `4px solid ${banner.border}` : undefined,
                backgroundSize: banner?.animated ? '300% 300%' : undefined,
                animation: banner?.animated ? 'frameRotate 3s ease infinite' : undefined,
              }}
            >
              <AvatarFrame user={user} frameId={equippedFrame} avatarEmoji={equippedAvatar} size="lg" hidePhoto={hidePhoto} />
              <div className="flex-1 min-w-[150px]">
                <h1 className="text-2xl font-black text-white tracking-tight">{user.displayName}</h1>
                <p className={`${t3} text-[13px] mt-0.5`}>{user.email}</p>
                {streak > 0 && (
                  <span className="inline-flex items-center gap-1.5 mt-2 bg-amber-500/12 border border-amber-500/30 text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
                    🔥 {ca ? `Ratxa de ${streak} ${streak === 1 ? 'dia' : 'dies'}` : en ? `${streak}-day streak` : `Racha de ${streak} ${streak === 1 ? 'día' : 'días'}`}
                  </span>
                )}
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button onClick={() => navigate(localPath('/tienda'))}
                  className="flex-1 sm:flex-none bg-violet-500 hover:brightness-110 text-[#140d24] font-bold text-[13px] px-4 py-2 rounded-xl transition-all whitespace-nowrap">
                  🛍 {ca ? 'Botiga' : en ? 'Shop' : 'Tienda'}
                </button>
                <button onClick={logout}
                  className={`flex-1 sm:flex-none ${t2} hover:text-white text-[13px] font-bold border border-white/15 hover:bg-white/8 px-4 py-2 rounded-xl transition-all`}>
                  {ca ? 'Tancar sessió' : en ? 'Sign out' : 'Cerrar sesión'}
                </button>
              </div>
            </div>
          )
        })()}

        {loading ? (
          <div className={`${t3} text-center py-12`}>{ca ? 'Carregant estadístiques...' : en ? 'Loading stats...' : 'Cargando estadísticas...'}</div>
        ) : !stats ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">🎮</p>
            <p className={t2}>{ca ? 'Encara no has jugat res. Comença ara!' : en ? "You haven't played anything yet. Start now!" : 'Aún no has jugado nada. ¡Empieza ahora!'}</p>
          </div>
        ) : (
          <>
            {/* ── TITULARES: monedas / puntos / actividades ── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
              <div className="bg-amber-500/12 border border-amber-500/30 rounded-2xl p-4 text-center">
                <span className="text-xl block leading-none">💰</span>
                <p className="text-amber-400 font-black text-[28px] leading-none tabular-nums mt-1.5">{(stats.coins ?? 0).toLocaleString()}</p>
                <p className={`${t2} text-[12.5px] font-semibold mt-1.5`}>{ca ? 'monedes' : en ? 'coins' : 'monedas'}</p>
              </div>
              <div className="bg-violet-500/14 border border-violet-500/30 rounded-2xl p-4 text-center">
                <span className="text-xl block leading-none">⭐</span>
                <p className="text-violet-400 font-black text-[28px] leading-none tabular-nums mt-1.5">{totalBestPts.toLocaleString()}</p>
                <p className={`${t2} text-[12.5px] font-semibold mt-1.5`}>{ca ? 'millors punts' : en ? 'best points' : 'mejores puntos'}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center col-span-2 sm:col-span-1">
                <span className="text-xl block leading-none">🎮</span>
                <p className="text-white font-black text-[28px] leading-none tabular-nums mt-1.5">{(stats.gamesPlayed ?? 0).toLocaleString()}</p>
                <p className={`${t2} text-[12.5px] font-semibold mt-1.5`}>{ca ? 'activitats' : en ? 'activities' : 'actividades'}</p>
              </div>
            </div>

            {/* ── TIRA SECUNDARIA: tiempo / aprobados / exámenes ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              {[
                { emoji: '⏱️', value: formatTime(stats.totalTime), label: ca ? 'temps total' : en ? 'total time' : 'tiempo total' },
                { emoji: '✅', value: stats.examsPassed ?? 0, label: ca ? 'exàmens aprovats' : en ? 'exams passed' : 'exámenes aprobados' },
                { emoji: '📚', value: examsTaken, label: ca ? 'exàmens fets' : en ? 'exams taken' : 'exámenes hechos' },
              ].map(s => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-3.5 flex items-center gap-3">
                  <span className="text-lg">{s.emoji}</span>
                  <div>
                    <p className="text-white font-black text-xl leading-none tabular-nums">{s.value}</p>
                    <p className={`${t3} text-xs font-semibold mt-1`}>{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── RETO DIARIO ── */}
            <div className="rounded-2xl p-[18px] mb-5 border border-orange-500/30"
              style={{ background: 'linear-gradient(135deg, rgba(251,146,60,.14), rgba(237,174,73,.05))' }}>
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <h2 className="font-black text-white text-base flex items-center gap-2">📅 {ca ? 'Repte diari' : en ? 'Daily challenge' : 'Reto diario'}</h2>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full border whitespace-nowrap ${dailyDoneToday ? 'border-green-500/40 bg-green-500/12 text-green-400' : 'border-amber-500/40 bg-amber-500/12 text-amber-400'}`}>
                  {dailyDoneToday ? (ca ? '✓ Fet avui' : en ? '✓ Done today' : '✓ Hecho hoy') : (ca ? 'Pendent avui' : en ? 'Pending today' : 'Pendiente hoy')}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-black/20 rounded-xl p-3 text-center">
                  <p className="text-[22px] font-black text-white leading-none tabular-nums">🔥 {dailyStreak}</p>
                  <p className={`${t3} text-xs mt-1.5`}>{ca ? 'dies seguits' : en ? 'days in a row' : 'días seguidos'}</p>
                </div>
                <div className="bg-black/20 rounded-xl p-3 text-center">
                  <p className="text-[22px] font-black text-white leading-none tabular-nums">{stats.dailyTotal ?? 0}</p>
                  <p className={`${t3} text-xs mt-1.5`}>{ca ? 'reptes totals' : en ? 'total challenges' : 'retos totales'}</p>
                </div>
              </div>
              {!dailyDoneToday && (
                <a href={localPath('/diaria')} className="mt-3 flex items-center justify-center w-full bg-orange-500/20 border border-orange-500/35 text-orange-400 font-bold py-2.5 rounded-xl text-[13.5px] hover:bg-orange-500/30 transition-colors">
                  {ca ? 'Fer el repte d\'avui →' : en ? "Do today's challenge →" : 'Hacer el reto de hoy →'}
                </a>
              )}
            </div>

            {/* ── POR JUEGO ── */}
            {gameEntries.length > 0 && (
              <section className="mb-5">
                <div className="flex items-baseline gap-2 mb-3 px-0.5">
                  <h2 className="font-black text-white text-[17px] tracking-tight">🎮 {ca ? 'Per joc' : en ? 'By game' : 'Por juego'}</h2>
                  <span className={`${t3} text-[13px] font-semibold ml-auto`}>{gameEntries.length} {ca ? 'jugats' : en ? 'played' : 'jugados'}</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                  {visibleGames.map((g, i) => {
                    const rank = rankings[g.key]
                    const parts = []
                    parts.push(`${g.plays ?? 0} ${ca ? 'partides' : en ? 'games' : 'partidas'}`)
                    if ((g.timeSpent || 0) > 0) parts.push(formatTime(g.timeSpent))
                    return (
                      <div key={g.key} className={`flex items-center gap-3 px-4 py-3.5 ${i < visibleGames.length - 1 ? 'border-b border-white/10' : ''}`}>
                        <span className="text-[22px] w-[30px] text-center shrink-0">{g.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-[14.5px] font-bold flex items-center flex-wrap gap-x-2">
                            <span className="truncate">{g.label}</span>
                            {rank && (
                              <span className="inline-flex items-center gap-1 text-[11.5px] font-extrabold text-amber-400 bg-amber-500/12 border border-amber-500/30 px-2 py-0.5 rounded-full">
                                🏅 #{rank.rank} {ca ? 'de' : en ? 'of' : 'de'} {rank.total}
                              </span>
                            )}
                          </p>
                          <p className={`${t3} text-[12.5px] mt-1`}>{parts.join(' · ')}</p>
                        </div>
                        {(g.bestScore || 0) > 0 && (
                          <div className="text-right shrink-0">
                            <p className="text-violet-400 font-black text-xl leading-none tabular-nums">{g.bestScore.toLocaleString()}</p>
                            <p className={`${t3} text-[11.5px] font-semibold mt-1`}>{ca ? 'millor pts' : en ? 'best pts' : 'mejor pts'}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                  {gameEntries.length > 4 && (
                    <button onClick={() => setShowAllGames(!showAllGames)}
                      className="w-full text-center py-3 border-t border-white/10 text-violet-400 hover:bg-white/5 font-bold text-[13.5px] transition-colors">
                      {showAllGames
                        ? (ca ? 'Veure menys ↑' : en ? 'Show less ↑' : 'Ver menos ↑')
                        : (ca ? `Veure els ${gameEntries.length} jocs ↓` : en ? `Show all ${gameEntries.length} games ↓` : `Ver los ${gameEntries.length} juegos ↓`)}
                    </button>
                  )}
                </div>
              </section>
            )}

            {/* ── POR MATERIA ── */}
            {subjectEntries.length > 0 && (
              <section className="mb-5">
                <div className="flex items-baseline gap-2 mb-3 px-0.5">
                  <h2 className="font-black text-white text-[17px] tracking-tight">📚 {ca ? 'Per matèria' : en ? 'By subject' : 'Por materia'}</h2>
                  <span className={`${t3} text-[13px] font-semibold ml-auto`}>{subjectEntries.length} {ca ? 'matèries' : en ? 'subjects' : 'materias'}</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                  {subjectEntries.map((subj, i) => {
                    const subjLabel = subj.label[lang] || subj.label.es
                    const isOpen = expandedSubject === subj.id
                    const failed = subj.totalExamPlays - subj.totalPassed
                    return (
                      <div key={subj.id} className={i < subjectEntries.length - 1 ? 'border-b border-white/10' : ''}>
                        <button
                          onClick={() => setExpandedSubject(isOpen ? null : subj.id)}
                          className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-white/5 transition-colors"
                        >
                          <span className="text-[22px] w-[30px] text-center shrink-0">{subj.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-[14.5px] font-bold">{subjLabel}</p>
                            <p className={`${t3} text-[12.5px] mt-1 flex gap-2 flex-wrap items-center`}>
                              <span>{subj.totalPlays} {ca ? 'activitats' : en ? 'activities' : 'actividades'}</span>
                              {subj.totalExamPlays > 0 && <span className="text-green-400 font-bold">{subj.totalPassed} ✅</span>}
                              {failed > 0 && <span className="text-red-400 font-bold">{failed} ❌</span>}
                            </p>
                          </div>
                          {(subj.timeSpent || 0) > 0 && (
                            <span className={`${t2} text-[13px] font-semibold whitespace-nowrap`}>{formatTime(subj.timeSpent)}</span>
                          )}
                          <span className={`${t3} text-xs ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
                        </button>
                        {isOpen && subj.examRows.length > 0 && (
                          <div className="px-4 pb-3.5 pl-[59px]">
                            <p className={`${t3} text-[11px] uppercase tracking-wider font-bold mb-1.5`}>
                              {ca ? 'Exàmens' : en ? 'Exams' : 'Exámenes'}
                            </p>
                            {subj.examRows.map(row => {
                              const rowFailed = row.plays - row.passed
                              return (
                                <div key={row.id} className="flex items-center gap-2 py-1.5 border-b border-white/5 last:border-0">
                                  <span className={`flex-1 ${t2} text-[13px]`}>{row.label}</span>
                                  <span className={`${t3} text-[12.5px] font-semibold`}>{row.plays}×</span>
                                  <span className="text-green-400 text-[12.5px] font-extrabold">{row.passed} ✅</span>
                                  {rowFailed > 0 && <span className="text-red-400 text-[12.5px] font-extrabold">{rowFailed} ❌</span>}
                                </div>
                              )
                            })}
                          </div>
                        )}
                        {isOpen && subj.examRows.length === 0 && subj.gameStats.plays > 0 && (
                          <p className={`px-4 pb-3.5 pl-[59px] ${t3} text-[13px]`}>
                            {ca ? 'Sense exàmens fets' : en ? 'No exams taken' : 'Sin exámenes realizados'}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* ── Ajuste: usar emoji en lugar de foto ── */}
            {user.photoURL && (
              <button
                onClick={toggleHidePhoto}
                className="w-full mb-4 flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-4 py-3 hover:bg-white/8 transition-colors"
              >
                <span className={`${t2} text-[13.5px]`}>
                  {ca ? 'Usar emoji en lloc de foto' : en ? 'Use emoji instead of photo' : 'Usar emoji en lugar de foto'}
                </span>
                <span className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${hidePhoto ? 'bg-violet-600' : 'bg-white/20'}`}>
                  <span className={`w-4 h-4 rounded-full bg-white transition-transform ${hidePhoto ? 'translate-x-4' : 'translate-x-0'}`} />
                </span>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
