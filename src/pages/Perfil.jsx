import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { getStatsAndCosmetics, setHidePhoto, formatTime, getUserRank, getCoinsHistory } from '../lib/activity'
import { useAccessStatus } from '../lib/access'
import { useNavigate, Link } from 'react-router-dom'
import AvatarFrame from '../components/AvatarFrame'
import { BANNER_BY_ID } from '../data/cosmetics'
import { GAMES } from '../lib/games'
import { EXAMS } from '../lib/exams'
import { GAME_LABELS, aggregateStudentStats, temasTocados } from '../lib/statsAggregation'
import { juegosDescubiertos, ultimoJuego } from '../lib/juegoDelDia'
import { getStudentAssignments } from '../lib/assignments'
import ChildCodeCard from '../components/ChildCodeCard'
import ReferralCard from '../components/ReferralCard'
import SupportBlock from '../components/SupportBlock'
import ProUpsell from '../components/ProUpsell'
import JuegoDelDia from '../components/JuegoDelDia'
import { ArteJuego } from '../components/arte'
import { getNovedades, setNovedades } from '../lib/novedades'

// ── Cómo está ordenado el perfil (octubre 2026) ─────────────────────────────
// Antes abría con un marcador: monedas, «mejores puntos» (la suma de los
// récords de todos los juegos, una cifra sin significado) y actividades, y lo
// que dice si el alumno está aprendiendo —su avance por materia— quedaba al
// final, con las tareas de clase debajo de los ajustes. Ahora el orden es el
// de lo que el alumno viene a hacer:
//   1. quién soy (racha y monedas, pequeñas)
//   2. tareas de clase pendientes, si las hay — lo más urgente
//   3. sigue donde lo dejaste (último juego) y el juego del día
//   4. su avance por materia, compacto: una ficha por materia (temas tocados)
//   5. cifras pequeñas: juegos descubiertos, aprobados, tiempo
//   6. sus juegos (récord y ranking) y, plegado, el historial de monedas
//   7. ajustes de la cuenta, con cerrar sesión al final

// Qué parte del panel es de pago desde que el muro de juegos/exámenes está
// apagado (ver paidRoutes.js): el resumen de arriba (monedas, puntos,
// actividades, tiempo, aprobados) se queda de teaser gratis para todos —
// motiva sin necesitar cuenta Pro. El desglose de VERDAD — de dónde viene
// cada moneda, cómo le va en cada juego y en cada materia — es lo que vende
// la suscripción ahora: es la herramienta del padre, no la del hijo.
// Antes esto era un candado centrado y un botón. El problema no era el
// texto, era que no se veía QUÉ se está perdiendo: un 🔒 no da ninguna gana
// de pagar. Ahora se enseña el desglose de verdad, difuminado detrás —
// mismas filas que vería un Pro, con datos de ejemplo— y encima el porqué:
// Pro no es "quitar anuncios", es lo que mantiene el sitio gratis.
//
// Las filas fantasma son decorativas: aria-hidden y sin texto real, para que
// un lector de pantalla no las lea como si fueran estadísticas del alumno.
const PEEK_ROWS = [
  { emoji: '💰', w: '78%' },
  { emoji: '🎮', w: '55%' },
  { emoji: '📚', w: '67%' },
  { emoji: '📈', w: '41%' },
]

function ProLock() {
  const { tr } = useLang()

  return (
    <div className="rounded-2xl border border-violet-400/25 overflow-hidden mb-5"
      style={{ background: 'linear-gradient(135deg, rgba(139,92,246,.14), rgba(139,92,246,.03))' }}>

      {/* Adelanto difuminado de lo que hay dentro */}
      <div className="relative px-5 pt-5" aria-hidden="true">
        <div className="flex flex-col gap-2.5 blur-[3px] opacity-60 select-none pointer-events-none">
          {PEEK_ROWS.map(r => (
            <div key={r.emoji} className="flex items-center gap-3">
              <span className="grid place-items-center w-8 h-8 shrink-0 rounded-lg bg-white/10 text-sm">{r.emoji}</span>
              <span className="h-2.5 rounded-full bg-white/25" style={{ width: r.w }} />
              <span className="ml-auto h-2.5 w-10 rounded-full bg-violet-400/40" />
            </div>
          ))}
        </div>
        {/* Degradado que funde el adelanto con el bloque de venta de abajo */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-[#12101f]" />
      </div>

      <div className="px-5 pb-5 pt-4">
        <p className="text-white font-black text-base mb-1.5">
          {tr({
            es: 'Aquí está el desglose completo de su progreso',
            en: "Here's the full breakdown of their progress",
            ca: 'Aquí hi ha el desglossament complet del seu progrés',
          })}
        </p>
        <p className="text-white/50 text-sm leading-relaxed mb-4">
          {tr({
            es: 'De dónde vienen sus monedas, cómo le va juego a juego y materia a materia. Es la parte del panel pensada para ti, no para tu hijo.',
            en: "Where their coins come from, how they're doing game by game and subject by subject. It's the part of the panel built for you, not for your child.",
            ca: "D'on venen les seves monedes, com li va joc a joc i matèria a matèria. És la part del panell pensada per a tu, no per al teu fill.",
          })}
        </p>

        {/* La venta de Pro con el "para qué" por delante: mismo bloque que en
            el resto de la web, así el mensaje no diverge según la pantalla. */}
        <ProUpsell />

        {/* Para quien no quiere pagar ahora mismo pero sí quiere apoyar de
            otra forma — se oculta solo si ya es Pro (comprueba su propio
            acceso, no depende de ProLock). */}
        <SupportBlock variant="top" className="mt-3" />
      </div>
    </div>
  )
}

// Superficies casi opacas: el tinte de color va sobre una base oscura para
// que el fondo del bosque no reste legibilidad.
const SURF = 'rgba(17,20,29,.86)'
const SURF_HERO = `linear-gradient(135deg, rgba(139,92,246,.18), rgba(237,174,73,.07)), ${SURF}`
const CAJA = 'border border-white/10 rounded-2xl'
const T2 = 'text-white/60'
const T3 = 'text-white/45'

function Titulo({ children, extra }) {
  return (
    <div className="flex items-baseline gap-2 mb-3 px-0.5">
      <h2 className="font-black text-white text-[17px] tracking-tight">{children}</h2>
      {extra && <span className={`${T3} text-[13px] font-semibold ml-auto`}>{extra}</span>}
    </div>
  )
}

// «hace 3 min», «hace 2 d»… Fuera del componente: lee la hora actual.
function timeAgo(date, tr) {
  if (!date) return ''
  const s = Math.floor((Date.now() - date.getTime()) / 1000)
  if (s < 60) return tr({ es: 'ahora', en: 'now', ca: 'ara' })
  const m = Math.floor(s / 60)
  if (m < 60) return tr({ es: `hace ${m} min`, en: `${m} min ago`, ca: `fa ${m} min` })
  const h = Math.floor(m / 60)
  if (h < 24) return tr({ es: `hace ${h} h`, en: `${h}h ago`, ca: `fa ${h} h` })
  const d = Math.floor(h / 24)
  if (d < 7) return tr({ es: `hace ${d} d`, en: `${d}d ago`, ca: `fa ${d} d` })
  return date.toLocaleDateString(tr({ es: 'es-ES', en: 'en-GB', ca: 'ca-ES' }), { day: 'numeric', month: 'short' })
}

function Interruptor({ on }) {
  return (
    <span className={`shrink-0 w-10 h-6 rounded-full transition-colors flex items-center px-1 ${on ? 'bg-violet-600' : 'bg-white/20'}`}>
      <span className={`w-4 h-4 rounded-full bg-white transition-transform ${on ? 'translate-x-4' : 'translate-x-0'}`} />
    </span>
  )
}

export default function Perfil() {
  const { user, logout } = useAuth()
  const { lang, localPath, tr, lt } = useLang()
  const navigate = useNavigate()
  const access = useAccessStatus()
  // null mientras se sabe si es Pro: no se muestra ni el detalle ni el
  // aviso de "hazte Pro" hasta saberlo, para no enseñarle un candado un
  // instante a quien sí paga.
  const isPro = access?.allowed === true
  const accessKnown = access !== null
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAllGames, setShowAllGames] = useState(false)
  const [expandedSubject, setExpandedSubject] = useState(null)
  const [equippedFrame, setEquippedFrame] = useState('default')
  const [equippedBanner, setEquippedBanner] = useState('banner_default')
  const [equippedAvatar, setEquippedAvatar] = useState(null)
  const [hidePhoto, setHidePhotoState] = useState(false)
  const [novedades, setNovedadesState] = useState(false)
  const [rankings, setRankings] = useState({})
  const [coinsHistory, setCoinsHistory] = useState([])
  const [showAllCoins, setShowAllCoins] = useState(false)
  const [pendingTasks, setPendingTasks] = useState(0)

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
    getCoinsHistory(user.uid).then(setCoinsHistory)
    getNovedades(user.uid).then(setNovedadesState).catch(() => {})
    getStudentAssignments(user.uid)
      .then(list => setPendingTasks(list.filter(t => !t.completions?.[user.uid]?.done).length))
      .catch(() => {})
  }, [user])

  async function toggleNovedades() {
    const next = !novedades
    setNovedadesState(next)
    await setNovedades(user.uid, next)
  }

  async function toggleHidePhoto() {
    const next = !hidePhoto
    setHidePhotoState(next)
    await setHidePhoto(user.uid, next)
  }

  if (!user) return null

  const { streak, gameEntries, subjectEntries } = aggregateStudentStats(stats, lang)
  const temas = temasTocados(stats)
  const descubiertos = juegosDescubiertos(stats, lang)
  const ultimo = ultimoJuego(coinsHistory, lang)
  const visibleGames = showAllGames ? gameEntries : gameEntries.slice(0, 4)
  const dias = n => tr(n === 1 ? { es: 'día', en: 'day', ca: 'dia' } : { es: 'días', en: 'days', ca: 'dies' })

  // Historial de monedas: fuente (nombre + emoji) y tiempo relativo
  function coinSource(gid) {
    if (gid === 'pregunta-diaria') return { name: tr({ es: 'Pregunta del día', en: "Today's question", ca: "Pregunta d'avui" }), emoji: '📅' }
    if (GAMES[gid]) return { name: GAMES[gid].label[lang] || GAMES[gid].label.es, emoji: GAMES[gid].emoji }
    if (EXAMS[gid]) return { name: EXAMS[gid].label[lang] || EXAMS[gid].label.es, emoji: EXAMS[gid].emoji }
    return { name: gid, emoji: '🎮' }
  }

  const banner = BANNER_BY_ID[equippedBanner]
  const hasBanner = banner?.bg

  // El desglose (materias, juegos, monedas) es la parte "de pago" si algún
  // día vuelve a cobrarse (MONETIZATION_ENABLED en access.js); hoy se ve
  // siempre. Sin datos todavía no se enseña ni el aviso: no hay nada que ver.
  const hasDetail = coinsHistory.length > 0 || gameEntries.length > 0 || subjectEntries.length > 0
  const verDetalle = accessKnown && hasDetail && isPro
  const verCandado = accessKnown && hasDetail && !isPro

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-6 py-6">
      <div className="max-w-3xl mx-auto w-full">

        {/* ── 1. QUIÉN SOY ── */}
        <div
          className="flex items-center gap-4 mb-4 p-5 rounded-[22px] border border-white/10"
          style={{
            background: hasBanner ? banner.bg : SURF_HERO,
            borderLeft: hasBanner ? `4px solid ${banner.border}` : undefined,
            backgroundSize: banner?.animated ? '300% 300%' : undefined,
            animation: banner?.animated ? 'frameRotate 3s ease infinite' : undefined,
          }}
        >
          <AvatarFrame user={user} frameId={equippedFrame} avatarEmoji={equippedAvatar} size="lg" hidePhoto={hidePhoto} />
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight break-words">{user.displayName}</h1>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="inline-flex items-center gap-1 bg-orange-500/12 border border-orange-500/30 text-orange-300 text-xs font-bold px-2.5 py-1 rounded-full">
                🔥 {streak > 0 ? `${streak} ${dias(streak)}` : tr({ es: 'Sin racha', en: 'No streak', ca: 'Sense ratxa' })}
              </span>
              {stats && (
                <span className="inline-flex items-center gap-1 bg-amber-500/12 border border-amber-500/30 text-amber-300 text-xs font-bold px-2.5 py-1 rounded-full tabular-nums">
                  💰 {(stats.coins ?? 0).toLocaleString()}
                </span>
              )}
            </div>
          </div>
          <button onClick={() => navigate(localPath('/tienda'))} aria-label={tr({ es: 'Tienda', en: 'Shop', ca: 'Botiga' })}
            className="shrink-0 self-start sm:self-center bg-violet-500 hover:brightness-110 text-[#140d24] font-bold text-[13px] px-3 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap">
            🛍<span className="hidden sm:inline"> {tr({ es: 'Tienda', en: 'Shop', ca: 'Botiga' })}</span>
          </button>
        </div>

        {/* ── 2. TAREAS DE CLASE: solo si hay pendientes ── */}
        {pendingTasks > 0 && (
          <Link to={localPath('/clase')}
            className="mb-4 flex items-center gap-3 rounded-2xl border border-sky-400/35 bg-sky-500/10 hover:bg-sky-500/15 px-4 py-3.5 transition-colors">
            <span className="text-2xl">🏫</span>
            <span className="flex-1 min-w-0">
              <span className="block text-white font-black text-[15px]">
                {tr(pendingTasks === 1
                  ? { es: 'Tienes 1 tarea de clase pendiente', en: 'You have 1 class task to do', ca: 'Tens 1 tasca de classe pendent' }
                  : { es: `Tienes ${pendingTasks} tareas de clase pendientes`, en: `You have ${pendingTasks} class tasks to do`, ca: `Tens ${pendingTasks} tasques de classe pendents` })}
              </span>
              <span className="block text-sky-200/70 text-xs mt-0.5">{tr({ es: 'Te las ha mandado tu profe', en: 'Set by your teacher', ca: "Te les ha enviat el teu profe" })}</span>
            </span>
            <span className="text-sky-300 font-bold text-sm">{tr({ es: 'Ver', en: 'View', ca: 'Veure' })} →</span>
          </Link>
        )}

        {/* ── 3. SIGUE DONDE LO DEJASTE + JUEGO DEL DÍA ── */}
        <div className="flex flex-col gap-2.5 mb-6">
          {ultimo && (
            <Link to={localPath(ultimo.path)}
              className="group flex items-center gap-3 rounded-2xl bg-[#141b2e] border border-white/[0.08] hover:border-violet-400/40 pl-2 pr-4 py-2 transition-colors">
              <span className="w-20 h-14 shrink-0 rounded-xl overflow-hidden bg-white/[0.03]">
                <ArteJuego slug={ultimo.slug} className="w-full h-full p-0.5" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-widest text-violet-300/90">{tr({ es: 'Sigue donde lo dejaste', en: 'Pick up where you left off', ca: 'Continua on ho vas deixar' })}</span>
                <span className="block text-white font-black text-[15px] leading-tight truncate">{lt(ultimo)}</span>
                <span className="block text-white/45 text-xs truncate">{lt(ultimo, 'subtitle')}</span>
              </span>
              <span className="shrink-0 text-violet-300 font-bold text-sm group-hover:translate-x-0.5 transition-transform">{tr({ es: 'Jugar', en: 'Play', ca: 'Jugar' })} →</span>
            </Link>
          )}
          <JuegoDelDia />
        </div>

        {loading ? (
          <div className={`${T3} text-center py-12`}>{tr({ es: 'Cargando tu progreso…', en: 'Loading your progress…', ca: 'Carregant el teu progrés…' })}</div>
        ) : !hasDetail ? (
          <div className={`${CAJA} text-center px-5 py-8 mb-6`} style={{ background: SURF }}>
            <p className="text-white font-black text-lg">{tr({ es: 'Aquí verás lo que vas aprendiendo', en: "This is where you'll see what you're learning", ca: 'Aquí veuràs el que vas aprenent' })}</p>
            <p className={`${T2} text-sm mt-1.5 max-w-md mx-auto`}>{tr({ es: 'Cada juego o examen que hagas suma temas a tus materias. Empieza por el juego del día o elige uno.', en: 'Every game or quiz you do adds topics to your subjects. Start with the game of the day or pick one.', ca: 'Cada joc o examen que facis suma temes a les teves matèries. Comença pel joc del dia o tria’n un.' })}</p>
            <Link to={localPath('/juegos')} className="inline-block mt-4 bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors">
              {tr({ es: 'Ver todos los juegos', en: 'See all games', ca: 'Veure tots els jocs' })} →
            </Link>
          </div>
        ) : verCandado ? (
          <ProLock />
        ) : verDetalle && (
          <>
            {/* ── 4. TU AVANCE POR MATERIA: compacto ──
                El avance no es lineal (se tocan temas sueltos de muchas
                materias), así que una lista de barras largas ocupaba media
                pantalla y parecía un progreso que había que completar. Ahora
                es una rejilla de fichas pequeñas; el detalle de exámenes de
                una materia se abre debajo al tocarla. */}
            {subjectEntries.length > 0 && (
              <section className="mb-5">
                <Titulo extra={`${subjectEntries.length} ${tr(subjectEntries.length === 1 ? { es: 'materia', en: 'subject', ca: 'matèria' } : { es: 'materias', en: 'subjects', ca: 'matèries' })}`}>
                  📚 {tr({ es: 'Lo que vas aprendiendo', en: "What you're learning", ca: 'El que vas aprenent' })}
                </Titulo>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {subjectEntries.map(subj => {
                    const isOpen = expandedSubject === subj.id
                    const tt = temas[subj.id]
                    const pct = tt?.total ? Math.round((tt.tocados / tt.total) * 100) : 0
                    return (
                      <button key={subj.id} onClick={() => setExpandedSubject(isOpen ? null : subj.id)}
                        className={`${CAJA} text-left px-3 py-2.5 transition-colors ${isOpen ? 'ring-1 ring-violet-400/60' : 'hover:bg-white/5'}`} style={{ background: SURF }}>
                        <span className="flex items-center gap-1.5">
                          <span className="text-base leading-none">{subj.emoji}</span>
                          <span className="text-white text-[13px] font-bold truncate">{subj.label[lang] || subj.label.es}</span>
                        </span>
                        <span className={`block ${T3} text-[11.5px] mt-1 tabular-nums`}>
                          {tt?.tocados > 0
                            ? tr({ es: `${tt.tocados} de ${tt.total} temas`, en: `${tt.tocados} of ${tt.total} topics`, ca: `${tt.tocados} de ${tt.total} temes` })
                            : `${subj.totalPlays} ${tr(subj.totalPlays === 1 ? { es: 'actividad', en: 'activity', ca: 'activitat' } : { es: 'actividades', en: 'activities', ca: 'activitats' })}`}
                        </span>
                        {tt?.tocados > 0 && (
                          <span className="block h-1 rounded-full bg-white/10 mt-1.5 overflow-hidden">
                            <span className="block h-full rounded-full bg-emerald-400" style={{ width: `${Math.max(pct, 4)}%` }} />
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
                {(() => {
                  const subj = subjectEntries.find(s => s.id === expandedSubject)
                  if (!subj) return null
                  const failed = subj.totalExamPlays - subj.totalPassed
                  return (
                    <div className={`${CAJA} mt-2 px-4 py-3`} style={{ background: SURF }}>
                      <p className={`${T3} text-[12.5px] flex gap-2 flex-wrap items-center`}>
                        <span className="text-white font-bold">{subj.emoji} {subj.label[lang] || subj.label.es}</span>
                        <span>· {subj.totalPlays} {tr(subj.totalPlays === 1 ? { es: 'actividad', en: 'activity', ca: 'activitat' } : { es: 'actividades', en: 'activities', ca: 'activitats' })}</span>
                        {subj.totalExamPlays > 0 && <span className="text-green-400 font-bold">{subj.totalPassed} ✅</span>}
                        {failed > 0 && <span className="text-red-400 font-bold">{failed} ❌</span>}
                        {(subj.timeSpent || 0) > 0 && <span>· {formatTime(subj.timeSpent)}</span>}
                      </p>
                      {subj.examRows.length > 0 ? subj.examRows.map(row => {
                        const rowFailed = row.plays - row.passed
                        return (
                          <div key={row.id} className="flex items-center gap-2 py-1.5 border-b border-white/5 last:border-0 mt-1">
                            <span className={`flex-1 ${T2} text-[13px]`}>{row.label}</span>
                            <span className={`${T3} text-[12.5px] font-semibold`}>{row.plays}×</span>
                            <span className="text-green-400 text-[12.5px] font-extrabold">{row.passed} ✅</span>
                            {rowFailed > 0 && <span className="text-red-400 text-[12.5px] font-extrabold">{rowFailed} ❌</span>}
                          </div>
                        )
                      }) : (
                        <p className={`${T3} text-[13px] mt-1.5`}>{tr({ es: 'Aún no has hecho ningún examen de esta materia.', en: "You haven't done any quizzes in this subject yet.", ca: 'Encara no has fet cap examen d’aquesta matèria.' })}</p>
                      )}
                    </div>
                  )
                })()}
              </section>
            )}

            {/* ── 5. CIFRAS ── */}
            <div className="grid grid-cols-3 gap-2.5 mb-5">
              {[
                { emoji: '🧭', value: `${descubiertos.jugados}/${descubiertos.total}`, label: tr({ es: 'juegos descubiertos', en: 'games discovered', ca: 'jocs descoberts' }) },
                { emoji: '✅', value: stats?.examsPassed ?? 0, label: tr({ es: 'exámenes aprobados', en: 'quizzes passed', ca: 'exàmens aprovats' }) },
                { emoji: '⏱️', value: formatTime(stats?.totalTime), label: tr({ es: 'tiempo aprendiendo', en: 'time learning', ca: 'temps aprenent' }) },
              ].map(s => (
                <div key={s.emoji} className={`${CAJA} p-3 text-center`} style={{ background: SURF }}>
                  <span className="text-lg block leading-none">{s.emoji}</span>
                  <p className="text-white font-black text-lg sm:text-xl leading-none tabular-nums mt-1.5">{s.value}</p>
                  <p className={`${T3} text-[11.5px] font-semibold mt-1 leading-tight`}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* ── 6a. TUS JUEGOS ── */}
            {gameEntries.length > 0 && (
              <section className="mb-5">
                <Titulo extra={`${gameEntries.length} ${tr({ es: 'jugados', en: 'played', ca: 'jugats' })}`}>
                  🎮 {tr({ es: 'Tus juegos', en: 'Your games', ca: 'Els teus jocs' })}
                </Titulo>
                <div className={`${CAJA} overflow-hidden`} style={{ background: SURF }}>
                  {visibleGames.map((g, i) => {
                    const rank = rankings[g.key]
                    const parts = [`${g.plays ?? 0} ${tr(g.plays === 1 ? { es: 'partida', en: 'game', ca: 'partida' } : { es: 'partidas', en: 'games', ca: 'partides' })}`]
                    if ((g.timeSpent || 0) > 0) parts.push(formatTime(g.timeSpent))
                    return (
                      <div key={g.key} className={`flex items-center gap-3 px-4 py-3.5 ${i < visibleGames.length - 1 ? 'border-b border-white/10' : ''}`}>
                        <span className="text-[22px] w-[30px] text-center shrink-0">{g.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-[14.5px] font-bold flex items-center flex-wrap gap-x-2">
                            <span className="truncate">{g.label}</span>
                            {rank && (
                              <span className="inline-flex items-center gap-1 text-[11.5px] font-extrabold text-amber-400 bg-amber-500/12 border border-amber-500/30 px-2 py-0.5 rounded-full">
                                🏅 #{rank.rank} {tr({ es: 'de', en: 'of', ca: 'de' })} {rank.total}
                              </span>
                            )}
                          </p>
                          <p className={`${T3} text-[12.5px] mt-1`}>{parts.join(' · ')}</p>
                        </div>
                        {(g.bestScore || 0) > 0 && (
                          <div className="text-right shrink-0">
                            <p className="text-violet-400 font-black text-xl leading-none tabular-nums">{g.bestScore.toLocaleString()}</p>
                            <p className={`${T3} text-[11.5px] font-semibold mt-1`}>{tr({ es: 'récord', en: 'best', ca: 'rècord' })}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                  {gameEntries.length > 4 && (
                    <button onClick={() => setShowAllGames(!showAllGames)}
                      className="w-full text-center py-3 border-t border-white/10 text-violet-400 hover:bg-white/5 font-bold text-[13.5px] transition-colors">
                      {showAllGames
                        ? `${tr({ es: 'Ver menos', en: 'Show less', ca: 'Veure menys' })} ↑`
                        : `${tr({ es: `Ver los ${gameEntries.length} juegos`, en: `Show all ${gameEntries.length} games`, ca: `Veure els ${gameEntries.length} jocs` })} ↓`}
                    </button>
                  )}
                </div>
              </section>
            )}

            {/* ── 6b. MONEDAS: plegado, es consulta, no lo principal ── */}
            {coinsHistory.length > 0 && (
              <details className={`${CAJA} mb-5 overflow-hidden group`} style={{ background: SURF }}>
                <summary className="cursor-pointer list-none flex items-center gap-3 px-4 py-3.5 hover:bg-white/5">
                  <span className="text-lg">💰</span>
                  <span className="flex-1 text-white font-bold text-[14.5px]">{tr({ es: 'De dónde vienen tus monedas', en: 'Where your coins come from', ca: "D'on venen les teves monedes" })}</span>
                  <span className={`${T3} text-xs transition-transform group-open:rotate-180`}>▾</span>
                </summary>
                {(showAllCoins ? coinsHistory : coinsHistory.slice(0, 6)).map(e => {
                  const src = coinSource(e.game)
                  return (
                    <div key={e.id} className="flex items-center gap-3 px-4 py-2.5 border-t border-white/10">
                      <span className="text-lg w-7 text-center shrink-0">{src.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white/90 text-sm font-semibold truncate">{src.name}</p>
                        <p className={`${T3} text-[11px] mt-0.5`}>{timeAgo(e.at, tr)}</p>
                      </div>
                      <span className="text-amber-400 font-black tabular-nums shrink-0">+{e.coins.toLocaleString()}</span>
                    </div>
                  )
                })}
                {coinsHistory.length > 6 && (
                  <button onClick={() => setShowAllCoins(!showAllCoins)}
                    className="w-full text-center py-2.5 border-t border-white/10 text-violet-400 hover:bg-white/5 font-bold text-[13px] transition-colors">
                    {showAllCoins
                      ? `${tr({ es: 'Ver menos', en: 'Show less', ca: 'Veure menys' })} ↑`
                      : `${tr({ es: `Ver las ${coinsHistory.length} últimas`, en: `Show last ${coinsHistory.length}`, ca: `Veure les ${coinsHistory.length} últimes` })} ↓`}
                  </button>
                )}
              </details>
            )}
          </>
        )}

        {/* ── 7. AJUSTES ── */}
        <section className="mt-2">
          <Titulo>⚙️ {tr({ es: 'Ajustes', en: 'Settings', ca: 'Ajustos' })}</Titulo>
          <div className={`${CAJA} overflow-hidden mb-4`} style={{ background: SURF }}>
            {pendingTasks === 0 && (
              <Link to={localPath('/clase')} className="flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors">
                <span className={`${T2} text-[13.5px] font-semibold`}>🏫 {tr({ es: 'Mi clase', en: 'My class', ca: 'La meva classe' })}</span>
                <span className="text-white/30 text-xs">→</span>
              </Link>
            )}
            {user.photoURL && (
              <button onClick={toggleHidePhoto} className="w-full flex items-center justify-between gap-3 px-4 py-3 border-t border-white/10 first:border-t-0 hover:bg-white/5 transition-colors text-left">
                <span className={`${T2} text-[13.5px]`}>{tr({ es: 'Usar emoji en lugar de foto', en: 'Use emoji instead of photo', ca: 'Usar emoji en lloc de foto' })}</span>
                <Interruptor on={hidePhoto} />
              </button>
            )}
            {/* Correo de novedades: solo con consentimiento (lib/novedades.js) */}
            {user.email && (
              <button onClick={toggleNovedades} className="w-full flex items-center justify-between gap-3 px-4 py-3 border-t border-white/10 first:border-t-0 hover:bg-white/5 transition-colors text-left">
                <span>
                  <span className={`block ${T2} text-[13.5px]`}>{tr({ es: 'Recibir novedades de Tuthor por correo', en: 'Get Tuthor news by email', ca: 'Rebre novetats de Tuthor per correu' })}</span>
                  <span className="block text-white/35 text-[11.5px] mt-0.5">{tr({ es: 'Juegos nuevos y alguna petición de opinión. Puedes darte de baja cuando quieras.', en: 'New games and the odd request for feedback. Unsubscribe any time.', ca: 'Jocs nous i alguna petició d’opinió. Pots donar-te de baixa quan vulguis.' })}</span>
                </span>
                <Interruptor on={novedades} />
              </button>
            )}
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-white/10">
              <span className="min-w-0">
                <span className={`block ${T2} text-[13.5px]`}>{tr({ es: 'Sesión iniciada como', en: 'Signed in as', ca: 'Sessió iniciada com a' })}</span>
                <span className="block text-white/35 text-[11.5px] truncate">{user.email}</span>
              </span>
              <button onClick={logout}
                className={`shrink-0 ${T2} hover:text-white text-[13px] font-bold border border-white/15 hover:bg-white/8 px-4 py-2 rounded-xl transition-all`}>
                {tr({ es: 'Cerrar sesión', en: 'Sign out', ca: 'Tancar sessió' })}
              </button>
            </div>
          </div>

          {/* El propio componente se esconde solo (CHILD_CODE_LOGIN_ENABLED
              en lib/childCode.js): reactivarlo es solo tocar ese flag. */}
          <div className="mb-4"><ChildCodeCard /></div>
          <div className="mb-4"><ReferralCard /></div>
        </section>
      </div>
    </div>
  )
}
