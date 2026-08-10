import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import HeroCard from '../components/HeroCard'
import { MAIN_CARDS } from '../data/constants'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { getStats, formatTime } from '../lib/activity'
import { getStudentClasses } from '../lib/classes'
import { getStudentAssignments } from '../lib/assignments'
import { aggregateStudentStats } from '../lib/statsAggregation'
import { FRAMES } from '../data/cosmetics'
import SEOHead from '../components/SEOHead'

const PREVIEW_FRAMES = ['silver', 'gold', 'rainbow', 'galaxy', 'fire', 'neon']

// Superficie oscura casi opaca: legibilidad sobre el fondo del bosque
const SURF = 'rgba(17,20,29,0.86)'

function RewardsSection({ lang, navigate }) {
  const en = lang === 'en', ca = lang === 'ca'
  const previewFrames = FRAMES.filter(f => PREVIEW_FRAMES.includes(f.id)).slice(0, 4)

  return (
    <section className="mb-8">
      <div className="rounded-2xl border border-violet-500/25 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(139,92,246,.2), rgba(237,174,73,.08)), ' + SURF }}>
        <div className="px-5 sm:px-6 py-4 flex items-center gap-4">
          <div className="flex-1">
            <p className="text-violet-300 text-xs font-bold uppercase tracking-widest mb-0.5">
              {ca ? 'Recompenses' : en ? 'Rewards' : 'Recompensas'}
            </p>
            <p className="text-white font-black text-base leading-tight">
              {ca ? 'Juga i guanya monedes 💰' : en ? 'Play and earn coins 💰' : 'Juega y gana monedas 💰'}
            </p>
            <p className="text-white/50 text-xs mt-0.5">
              {ca ? 'Marcs · Banners · Avatars' : en ? 'Frames · Banners · Avatars' : 'Marcos · Banners · Avatares'}
            </p>
          </div>
          {/* Preview frames inline */}
          <div className="flex gap-1.5 shrink-0">
            {previewFrames.map(frame => (
              <div key={frame.id} className={frame.animated ? 'frame-animated' : ''} style={{ ...frame.style, padding: 2, borderRadius: '50%', width: 36, height: 36 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1e1b4b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                  {frame.emoji}
                </div>
              </div>
            ))}
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '2px dashed rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: 'rgba(255,255,255,0.3)' }}>+</div>
          </div>
        </div>

        <div className="px-5 sm:px-6 pb-4">
          <button onClick={() => navigate('/tienda')} className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-black rounded-xl transition-all text-sm">
            🛍 {ca ? 'Anar a la botiga' : en ? 'Go to shop' : 'Ir a la tienda'}
          </button>
        </div>
      </div>
    </section>
  )
}

// La ruta del hub de "/estudiar" coincide con subj.id salvo estas dos: lengua
// e inglés cuelgan de /estudiar/idiomas/* (ver App.jsx), el resto es directo.
const SUBJECT_HUB_PATH = { lengua: '/estudiar/idiomas/espanol', ingles: '/estudiar/idiomas/ingles' }

// Solo se muestra si hay alguna materia con actividad — mismo dato que ya
// calcula Perfil.jsx (aggregateStudentStats), aquí en versión compacta y
// sin acordeón: cada tarjeta lleva directo al hub de la materia.
function SubjectsGrid({ subjectEntries, navigate, localPath, lang }) {
  const en = lang === 'en', ca = lang === 'ca'
  return (
    <section className="mb-8">
      <div className="flex items-baseline gap-2 mb-3 px-0.5">
        <h2 className="text-white font-black text-[15px]">📚 {ca ? 'Per matèria' : en ? 'By subject' : 'Por materia'}</h2>
        <span className="text-white/40 text-xs font-semibold ml-auto">
          {subjectEntries.length} {ca ? 'matèries' : en ? 'subjects' : 'materias'}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {subjectEntries.map(subj => {
          const label = subj.label[lang] || subj.label.es
          const failed = subj.totalExamPlays - subj.totalPassed
          const path = SUBJECT_HUB_PATH[subj.id] || `/estudiar/${subj.id}`
          return (
            <button key={subj.id} onClick={() => navigate(localPath(path))}
              className="text-left rounded-xl border border-white/10 hover:border-violet-400/40 p-3.5 transition-all" style={{ background: SURF }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{subj.emoji}</span>
                <span className="text-white font-bold text-[13.5px] truncate">{label}</span>
              </div>
              <div className="flex items-center gap-2 text-xs flex-wrap">
                <span className="text-white/45">{subj.totalPlays} {ca ? 'activitats' : en ? 'activities' : 'actividades'}</span>
                {subj.totalExamPlays > 0 && <span className="text-green-400 font-bold">{subj.totalPassed} ✅</span>}
                {failed > 0 && <span className="text-red-400 font-bold">{failed} ❌</span>}
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}

// Solo se muestra si el alumno está en al menos una clase — nada que ofrecer
// aquí a quien no lo está (no es un profesor vendiendo el panel, es una
// cuenta ya de pago; "únete a una clase" no pinta nada en su navegación).
function MisClasesCard({ classes, pendingTasks, navigate, localPath, lang }) {
  const en = lang === 'en', ca = lang === 'ca'
  const clase = classes[0]
  return (
    <section className="mb-8">
      <button onClick={() => navigate(localPath('/clase'))}
        className="w-full text-left rounded-2xl border border-white/10 hover:border-teal-400/40 p-5 flex items-center justify-between gap-4 transition-all" style={{ background: SURF }}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏫</span>
          <div>
            <p className="text-white font-bold text-sm">
              {classes.length > 1
                ? (ca ? `Les teves classes (${classes.length})` : en ? `Your classes (${classes.length})` : `Tus clases (${classes.length})`)
                : clase.name}
            </p>
            <p className="text-white/40 text-xs mt-0.5">
              {pendingTasks > 0
                ? (ca ? `${pendingTasks} tasca${pendingTasks === 1 ? '' : 's'} pendent${pendingTasks === 1 ? '' : 's'}` : en ? `${pendingTasks} pending task${pendingTasks === 1 ? '' : 's'}` : `${pendingTasks} tarea${pendingTasks === 1 ? '' : 's'} pendiente${pendingTasks === 1 ? '' : 's'}`)
                : (ca ? 'Sense tasques pendents' : en ? 'No pending tasks' : 'Sin tareas pendientes')}
            </p>
          </div>
        </div>
        {pendingTasks > 0 && (
          <span className="shrink-0 text-xs font-bold bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-full">{pendingTasks}</span>
        )}
      </button>
    </section>
  )
}

function StatsWidget({ stats, name, onVerMas, en, lang }) {
  const ca = lang === 'ca'
  const streak = stats.streak || 0
  const items = [
    { emoji: '🔥', value: `${streak} ${ca ? (streak === 1 ? 'dia' : 'dies') : en ? (streak === 1 ? 'day' : 'days') : (streak !== 1 ? 'días' : 'día')}`, label: ca ? 'Ratxa' : en ? 'Streak' : 'Racha' },
    { emoji: '⏱️', value: formatTime(stats.totalTime), label: ca ? 'Temps total' : en ? 'Total time' : 'Tiempo total' },
    { emoji: '✅', value: stats.examsPassed ?? 0, label: ca ? 'Aprovats' : en ? 'Passed' : 'Aprobados' },
    { emoji: '🎮', value: stats.gamesPlayed ?? 0, label: ca ? 'Activitats' : en ? 'Activities' : 'Actividades' },
  ]
  return (
    <div className="rounded-xl border border-violet-500/30 bg-violet-600/10 backdrop-blur-sm">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
        <div>
          <p className="font-bold text-white text-sm">{ca ? `El teu progrés, ${name}` : en ? `Your progress, ${name}` : `Tu progreso, ${name}`}</p>
          <p className="text-white/40 text-xs">{ca ? 'Continua així 💪' : en ? 'Keep it up 💪' : 'Sigue así 💪'}</p>
        </div>
        <button
          onClick={onVerMas}
          className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
        >
          {ca ? 'Veure més →' : en ? 'See more →' : 'Ver más →'}
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

function EmptyStatsWidget({ onVerMas, en, lang }) {
  const ca = lang === 'ca'
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="flex items-center justify-between px-5 py-2.5">
        <div className="flex items-center gap-3">
          <span className="text-lg">📊</span>
          <div>
            <p className="font-bold text-white text-sm">{ca ? 'El teu progrés' : en ? 'Your progress' : 'Tu progreso'}</p>
            <p className="text-white/40 text-xs">{ca ? 'Completa la teva primera activitat per veure estadístiques' : en ? 'Complete your first activity to see stats' : 'Completa tu primera actividad para ver stats'}</p>
          </div>
        </div>
        <button onClick={onVerMas} className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors">
          {ca ? 'Veure perfil →' : en ? 'See profile →' : 'Ver perfil →'}
        </button>
      </div>
    </div>
  )
}

// Mismo spinner que AccessGate.jsx (Checking): se usa mientras se resuelve si
// hay sesión, y también durante el instante en que se está redirigiendo a "/"
// a quien no la tiene — nunca se llega a pintar el resto de la página para
// ese caso.
function Loader() {
  return (
    <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#EDAE49]" />
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { t, localPath, lang } = useLang()
  const en = lang === 'en'
  const ca = lang === 'ca'
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [classes, setClasses] = useState(null) // null = aún sin comprobar
  const [pendingTasks, setPendingTasks] = useState(0)

  // /app es el panel de quien ya tiene cuenta — la venta ocurre en "/"
  // (Landing.jsx), no aquí. Nadie debería llegar sin sesión salvo por un
  // enlace viejo o el propio prerender (que tampoco tiene sesión nunca:
  // ver IS_PRERENDER en AccessGate.jsx para el motivo). En ambos casos la
  // respuesta correcta es la misma: mandar a la página que sí vende.
  useEffect(() => {
    if (user === null) navigate(localPath('/'), { replace: true })
  }, [user])

  // Sin reseteo para !user, mismo motivo que el efecto de clases de abajo:
  // el componente vuelve <Loader/> mientras no hay usuario, así que nada lee
  // `stats` en ese estado.
  useEffect(() => {
    if (user) getStats(user.uid).then(setStats)
  }, [user])

  // Mismo patrón que Navbar.jsx para el aviso de tareas pendientes: se cuenta
  // una vez por sesión, no en tiempo real. Sin reseteo explícito para !user:
  // mientras no hay usuario el componente ya no llega a renderizar nada que
  // lea `classes` (vuelve <Loader/> más abajo), así que no hace falta —y
  // resetear aquí sería un setState síncrono en el cuerpo del efecto.
  useEffect(() => {
    if (!user) return
    getStudentClasses(user.uid).then(setClasses).catch(() => setClasses([]))
    getStudentAssignments(user.uid)
      .then(tasks => setPendingTasks(tasks.filter(t => !t.completions?.[user.uid]?.done).length))
      .catch(() => {})
  }, [user])

  // Igual que STATIC_META['/app'] en scripts/seoMeta.mjs (esa es la que ve un
  // crawler, vía el prerender; esta es la que aplica Helmet en cuanto carga
  // el JS en un navegador real). Si divergen, Helmet pisa la meta correcta
  // del prerender con esta en cuanto hidrata — ya pasó una vez.
  const seo = {
    es: { title: 'Tu panel de estudio', desc: 'Tu progreso, tus rachas y tus monedas. Elige materia y sigue repasando con juegos y exámenes tipo test.' },
    en: { title: 'Your study dashboard', desc: 'Your progress, streaks and coins. Pick a subject and keep revising with games and quizzes.' },
    ca: { title: 'El teu tauler d\'estudi', desc: 'El teu progrés, les teves ratxes i les teves monedes. Tria matèria i segueix repassant amb jocs i exàmens tipus test.' },
  }[lang] || {}

  // undefined = la sesión aún se resuelve; null = confirmado sin sesión,
  // a punto de redirigir. En ninguno de los dos casos hay nada que pintar.
  if (user === undefined || user === null) return <Loader />

  const subjectEntries = stats ? aggregateStudentStats(stats, lang).subjectEntries : []

  return (
    <div className="relative z-10 px-4 sm:px-8">
      {/* /app ya no está en el sitemap (era panel privado disfrazado de página
          de marketing); esta meta sigue aquí solo por si algún cliente viejo
          o un compartido directo cae en la URL con JS ya cargado. */}
      <SEOHead title={seo.title} description={seo.desc} path="/app" lang={lang} noindex />

      {/* Un único contenedor de ancho fijo para TODO, tarjetas incluidas: antes
          las tarjetas vivían fuera de max-w-4xl y se estiraban a lo ancho de
          toda la ventana en pantallas grandes mientras el resto del contenido
          quedaba centrado y estrecho — el "descuadre" que se ve en pantallas
          anchas. HeroCard no tiene proporción propia (w-full h-full, ocupa
          lo que le des), así que un contenedor demasiado ancho también las
          dejaba planas y "enanas" en vez de cuadradas. aspect-square en el
          envoltorio de cada tarjeta les da una proporción fija en vez de una
          altura arbitraria en píxeles. */}
      <div className="max-w-4xl mx-auto pb-16">
        <div className="pt-6 pb-4 text-center">
          <p className="text-white/40 text-sm">
            {ca ? `Hola, ${user.displayName?.split(' ')[0] || ''}` : en ? `Hi, ${user.displayName?.split(' ')[0] || ''}` : `Hola, ${user.displayName?.split(' ')[0] || ''}`}
          </p>
        </div>

        {/* Cards principales: van directas a la página real (/estudiar,
            /juegos, /diaria), no a una ficha informativa — no hace falta
            convencer a nadie de entrar, ya está pagando. */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {MAIN_CARDS.map(card => (
            <div key={card.id} className="aspect-square sm:aspect-[4/5]">
              <HeroCard card={card} onClick={() => navigate(localPath(card.path))} priority={card.id === 'estudiar'} />
            </div>
          ))}
        </div>

        {/* PROGRESO */}
        <div className="mb-8">
          {stats ? (
            <StatsWidget stats={stats} name={user.displayName?.split(' ')[0]} onVerMas={() => navigate(localPath('/perfil'))} en={en} lang={lang} />
          ) : (
            <EmptyStatsWidget onVerMas={() => navigate(localPath('/perfil'))} en={en} lang={lang} />
          )}
        </div>

        {/* POR MATERIA — solo materias con actividad registrada */}
        {subjectEntries.length > 0 && (
          <SubjectsGrid subjectEntries={subjectEntries} navigate={navigate} localPath={localPath} lang={lang} />
        )}

        {/* MIS CLASES — solo si el alumno está en alguna */}
        {classes && classes.length > 0 && (
          <MisClasesCard classes={classes} pendingTasks={pendingTasks} navigate={navigate} localPath={localPath} lang={lang} />
        )}

        {/* RECOMPENSAS */}
        <RewardsSection lang={lang} navigate={navigate} />

        {/* COMUNIDAD */}
        <section className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Bug report */}
            <Link to={localPath('/reportar-bug')}
              className="group rounded-2xl border border-white/10 hover:border-violet-400/50 p-6 flex flex-col gap-3 transition-all" style={{ background: SURF }}>
              <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center text-xl">🐛</div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-sm">
                  {lang === 'en' ? 'Report a bug' : lang === 'ca' ? 'Reportar un error' : 'Reportar un bug'}
                </h3>
                <p className="text-white/50 text-xs mt-1 leading-relaxed">
                  {lang === 'en' ? "Something not working? Let us know and we'll fix it."
                    : lang === 'ca' ? "Alguna cosa no funciona? Explica'ns-ho i ho arreglem."
                    : 'Algo no funciona bien? Cuéntanoslo y lo arreglamos.'}
                </p>
              </div>
              <span className="text-xs font-bold text-violet-400 group-hover:text-violet-300 flex items-center gap-1">
                {lang === 'en' ? 'Open form' : lang === 'ca' ? 'Obrir formulari' : 'Abrir formulario'}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </span>
            </Link>

            {/* Colaborar */}
            <Link to={localPath('/colaborar')}
              className="group rounded-2xl border border-white/10 hover:border-emerald-400/50 p-6 flex flex-col gap-3 transition-all" style={{ background: SURF }}>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-xl">📣</div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-sm">
                  {lang === 'en' ? 'Collaborate or advertise' : lang === 'ca' ? "Col·laborar o anunciar-se" : 'Colaborar o anunciarse'}
                </h3>
                <p className="text-white/50 text-xs mt-1 leading-relaxed">
                  {lang === 'en' ? "School, publisher or ed-tech project? Let's talk about working together."
                    : lang === 'ca' ? 'Acadèmia, editorial o projecte educatiu? Parlem de com treballar junts.'
                    : '¿Academia, editorial o proyecto educativo? Hablemos de cómo trabajar juntos.'}
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-400 group-hover:text-emerald-300 flex items-center gap-1">
                {lang === 'en' ? 'Write to us' : lang === 'ca' ? "Escriu-nos" : 'Escribirnos'}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </span>
            </Link>

          </div>
        </section>

        {/* CONTACTO */}
        <section className="rounded-2xl border border-white/10 p-6 sm:p-8 text-center" style={{ background: SURF }}>
          <h2 className="text-2xl font-black text-white mb-2">{t('home.seo.contacto.titulo')}</h2>
          <p className="text-white/55 mb-5 max-w-md mx-auto">{t('home.seo.contacto.texto')}</p>
          <Link to={localPath('/contacto')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm rounded-xl transition-all hover:scale-[1.02]">
            📧 {lang === 'ca' ? 'Escriu-nos' : lang === 'en' ? 'Write to us' : 'Escríbenos'}
          </Link>
        </section>
      </div>
    </div>
  )
}
