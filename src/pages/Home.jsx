import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import HeroCard from '../components/HeroCard'
import { PUERTAS } from '../data/constants'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { getStats, formatTime } from '../lib/activity'
import { getStudentClasses } from '../lib/classes'
import { getStudentAssignments } from '../lib/assignments'
import { aggregateStudentStats } from '../lib/statsAggregation'
import { FRAMES } from '../data/cosmetics'
import SEOHead from '../components/SEOHead'
import AuthModal from '../components/AuthModal'
import AdSlot from '../components/AdSlot'
import ProUpsell from '../components/ProUpsell'
import ReferralCard from '../components/ReferralCard'
import NivelPicker from '../components/NivelPicker'
import EresProfesor from '../components/EresProfesor'
import { useDebePreguntarNivel, sincronizarNivel } from '../lib/nivel'
import { ARTE_MATERIAS } from '../components/arte/materias'
import AvatarDibujo from '../components/avatares/AvatarDibujo'
import { Racha, Reloj, Acierto, Fallo, Mando, Moneda, Tienda, Pizarra, Familia, Bicho, Megafono, Sobre } from '../components/Iconos'

// Marco + avatar de muestra para el escaparate de recompensas.
const PREVIEW_FRAMES = ['gold', 'rainbow', 'galaxy', 'fire']
const PREVIEW_AVATARS = ['🦊', '🐲', '🦖', '🚀']


function RewardsSection({ navigate, localPath }) {
  const { tr } = useLang()
  const previewFrames = FRAMES.filter(f => PREVIEW_FRAMES.includes(f.id)).slice(0, 4)

  return (
    <section className="mb-8">
      <div className={`${TARJETA} overflow-hidden`}>
        <div className="px-5 py-4 flex items-center gap-4">
          <span className="shrink-0 w-12 h-12 rounded-xl bg-amber-500/12 grid place-items-center">
            <Moneda className="w-7 h-7" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-amber-300/80 text-[11px] font-bold uppercase tracking-widest mb-0.5">
              {tr({ es: 'Recompensas', en: 'Rewards', ca: 'Recompenses' })}
            </p>
            <p className="text-white font-black text-base leading-tight">
              {tr({ es: 'Juega y gana monedas', en: 'Play and earn coins', ca: 'Juga i guanya monedes' })}
            </p>
            <p className="text-white/50 text-xs mt-0.5">
              {tr({ es: 'Marcos · Banners · Avatares', en: 'Frames · Banners · Avatars', ca: 'Marcs · Banners · Avatars' })}
            </p>
          </div>
          {/* Los marcos son cosméticos del usuario: se enseñan tal cual. */}
          <div className="hidden sm:flex gap-1.5 shrink-0">
            {previewFrames.map((frame, i) => (
              <div key={frame.id} className={frame.animated ? 'frame-animated' : ''} style={{ ...frame.style, padding: 2, borderRadius: '50%', width: 36, height: 36 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden' }}>
                  <AvatarDibujo emoji={PREVIEW_AVATARS[i]} />
                </div>
              </div>
            ))}
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '2px dashed rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: 'rgba(255,255,255,0.3)' }}>+</div>
          </div>
        </div>

        <div className="px-5 pb-4">
          <button onClick={() => navigate(localPath('/tienda'))}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-black rounded-xl transition-all text-sm">
            <Tienda className="w-4 h-4" />
            {tr({ es: 'Ir a la tienda', en: 'Go to shop', ca: 'Anar a la botiga' })}
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
// En "Por materia" la lengua se llama `lengua` (statsAggregation) y su dibujo
// es el de Español en /estudiar.
const ARTE_DE_MATERIA = { lengua: 'espanol' }

// Misma superficie plana que las puertas de arriba (HeroCard): #141b2e.
const TARJETA = 'rounded-2xl bg-[#141b2e] border border-white/[0.08]'

function SubjectsGrid({ subjectEntries, navigate, localPath, lang }) {
  const { tr } = useLang()
  return (
    <section className="mb-8">
      <div className="flex items-baseline gap-2 mb-3 px-0.5">
        <h2 className="text-white font-black text-lg">{tr({ es: 'Por materia', en: 'By subject', ca: 'Per matèria' })}</h2>
        <span className="text-white/40 text-xs font-semibold ml-auto">
          {subjectEntries.length} {tr({ es: 'materias', en: 'subjects', ca: 'matèries' })}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {subjectEntries.map(subj => {
          const label = subj.label[lang] || subj.label.es
          const failed = subj.totalExamPlays - subj.totalPassed
          const path = SUBJECT_HUB_PATH[subj.id] || `/estudiar/${subj.id}`
          const Arte = ARTE_MATERIAS[ARTE_DE_MATERIA[subj.id] || subj.id]
          const acierto = subj.totalExamPlays > 0 ? subj.totalPassed / subj.totalExamPlays : null
          return (
            <button key={subj.id} onClick={() => navigate(localPath(path))}
              className={`group text-left overflow-hidden ${TARJETA} hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300`}>
              <div className="relative aspect-[16/7] border-b border-white/[0.06] overflow-hidden">
                {Arte
                  ? <Arte className="absolute inset-0 w-full h-full p-1.5 transition-transform duration-500 ease-out group-hover:scale-[1.05]" />
                  : <span className="absolute inset-0 grid place-items-center text-3xl">{subj.emoji}</span>}
              </div>
              <div className="px-3.5 pt-2.5 pb-3">
                <p className="text-white font-black text-sm truncate">{label}</p>
                <div className="flex items-center flex-wrap gap-x-2.5 gap-y-1 text-xs mt-1">
                  <span className="text-white/45 tabular-nums whitespace-nowrap">
                    {subj.totalPlays} {tr({ es: 'actividades', en: 'activities', ca: 'activitats' })}
                  </span>
                  {subj.totalExamPlays > 0 && (
                    <span className="flex items-center gap-1 text-green-300 font-bold tabular-nums"><Acierto className="w-3.5 h-3.5" />{subj.totalPassed}</span>
                  )}
                  {failed > 0 && (
                    <span className="flex items-center gap-1 text-rose-300 font-bold tabular-nums"><Fallo className="w-3.5 h-3.5" />{failed}</span>
                  )}
                </div>
                {/* Cuánto de lo examinado está aprobado: se ve de un vistazo
                    dónde flojea, sin tener que restar. */}
                {acierto !== null && (
                  <div className="mt-2.5 h-1.5 rounded-full bg-rose-400/25 overflow-hidden">
                    <div className="h-full rounded-full bg-green-400" style={{ width: `${Math.round(acierto * 100)}%` }} />
                  </div>
                )}
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
        className={`w-full text-left ${TARJETA} hover:border-teal-400/40 p-5 flex items-center justify-between gap-4 transition-all`}>
        <div className="flex items-center gap-3">
          <span className="shrink-0 w-11 h-11 rounded-xl bg-teal-500/12 grid place-items-center">
            <Pizarra className="w-6 h-6" />
          </span>
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

// Las cuatro cifras del progreso, cada una con su icono (Iconos.jsx) sobre
// una pastilla de su color — el mismo lenguaje que las puertas de arriba.
function StatsWidget({ stats, name, onVerMas }) {
  const { tr } = useLang()
  const streak = stats.streak || 0
  const items = [
    { Icono: Racha, fondo: 'bg-orange-500/12', value: streak, unidad: tr(streak === 1 ? { es: 'día', en: 'day', ca: 'dia' } : { es: 'días', en: 'days', ca: 'dies' }), label: tr({ es: 'Racha', en: 'Streak', ca: 'Ratxa' }) },
    { Icono: Reloj, fondo: 'bg-sky-500/12', value: formatTime(stats.totalTime), label: tr({ es: 'Tiempo total', en: 'Total time', ca: 'Temps total' }) },
    { Icono: Acierto, fondo: 'bg-green-500/12', value: stats.examsPassed ?? 0, label: tr({ es: 'Aprobados', en: 'Passed', ca: 'Aprovats' }) },
    { Icono: Mando, fondo: 'bg-violet-500/12', value: stats.gamesPlayed ?? 0, label: tr({ es: 'Actividades', en: 'Activities', ca: 'Activitats' }) },
  ]
  return (
    <section className={`${TARJETA} shadow-xl shadow-black/30`}>
      <div className="flex items-center justify-between gap-3 px-5 pt-4 pb-3">
        <h2 className="text-white font-black text-lg leading-tight">
          {tr({ es: `Tu progreso, ${name}`, en: `Your progress, ${name}`, ca: `El teu progrés, ${name}` })}
        </h2>
        <button onClick={onVerMas}
          className="shrink-0 text-xs font-bold text-violet-300 hover:text-violet-200 bg-violet-500/10 hover:bg-violet-500/20 px-3 py-1.5 rounded-full transition-colors">
          {tr({ es: 'Ver más →', en: 'See more →', ca: 'Veure més →' })}
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 px-4 pb-4">
        {items.map(({ Icono, fondo, value, unidad, label }) => (
          <div key={label} className="flex items-center gap-2.5 sm:gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] px-2.5 sm:px-3 py-3">
            <span className={`shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-xl ${fondo} grid place-items-center`}>
              <Icono className="w-5 h-5 sm:w-6 sm:h-6" />
            </span>
            <div className="min-w-0">
              <p className="text-white font-black text-base sm:text-xl leading-none tabular-nums whitespace-nowrap">
                {value}{unidad && <span className="text-white/50 text-xs font-bold ml-1">{unidad}</span>}
              </p>
              <p className="text-white/45 text-xs mt-1 truncate">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function EmptyStatsWidget({ onVerMas }) {
  const { tr } = useLang()
  return (
    <section className={`${TARJETA} flex items-center gap-4 px-5 py-4`}>
      <span className="shrink-0 w-11 h-11 rounded-xl bg-violet-500/12 grid place-items-center">
        <Mando className="w-6 h-6" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-black text-white">{tr({ es: 'Tu progreso', en: 'Your progress', ca: 'El teu progrés' })}</p>
        <p className="text-white/45 text-xs mt-0.5">{tr({ es: 'Completa tu primera actividad y aquí verás tu racha, tu tiempo y tus aprobados.', en: 'Finish your first activity and your streak, time and passes will show up here.', ca: 'Completa la teva primera activitat i aquí veuràs la ratxa, el temps i els aprovats.' })}</p>
      </div>
      <button onClick={onVerMas}
        className="shrink-0 text-xs font-bold text-violet-300 hover:text-violet-200 bg-violet-500/10 hover:bg-violet-500/20 px-3 py-1.5 rounded-full transition-colors">
        {tr({ es: 'Ver perfil →', en: 'See profile →', ca: 'Veure perfil →' })}
      </button>
    </section>
  )
}

// Mismo spinner que AccessGate.jsx (Checking): solo mientras se resuelve si
// hay sesión. Sin sesión ya NO se espera nada — la página se pinta igual.
function Loader() {
  return (
    <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#EDAE49]" />
    </div>
  )
}

// Ocupa el sitio del panel de progreso cuando no hay cuenta. Va aquí y no en
// una pantalla de bloqueo porque el usuario acaba de llegar de la landing a
// mirar: se le enseña qué se lleva si se registra, no se le corta el paso.
// Un icono por ventaja de la cuenta: progreso y rachas, monedas, clase.
const PERK_ICONOS = [[Racha, 'bg-orange-500/12'], [Moneda, 'bg-amber-500/12'], [Pizarra, 'bg-teal-500/12']]

function SignupPrompt({ onSignup }) {
  const { tr } = useLang()
  const perks = tr({
    es: ['Guarda tu progreso y tus rachas', 'Gana monedas y compite en el ranking', 'Tu profesor puede mandarte tareas y ver cómo vas'],
    en: ['Save your progress and streaks', 'Earn coins and climb the leaderboard', 'Your teacher can set you tasks and see how you are doing'],
    ca: ['Desa el teu progrés i les teves ratxes', 'Guanya monedes i competeix al rànquing', 'El teu professor et pot enviar tasques i veure com vas'],
  })

  return (
    <section className={`${TARJETA} shadow-xl shadow-black/30 p-5`}>
      <p className="text-white font-black text-lg leading-tight mb-1.5">
        {tr({ es: 'Puedes jugar sin cuenta, pero no se guarda nada', en: 'You can play without an account, but nothing is saved', ca: 'Pots jugar sense compte, però no es desa res' })}
      </p>
      <p className="text-white/55 text-sm leading-relaxed mb-4">
        {tr({
          es: 'Crear la cuenta es gratis y tarda diez segundos con Google.',
          en: 'Creating an account is free and takes ten seconds with Google.',
          ca: 'Crear el compte és gratis i triga deu segons amb Google.',
        })}
      </p>
      <ul className="flex flex-col gap-2 mb-5">
        {perks.map((p, i) => (
          <li key={p} className="flex items-center gap-3 text-white/75 text-sm">
            <span className={`shrink-0 w-9 h-9 rounded-xl ${PERK_ICONOS[i][1]} grid place-items-center`}>
              {(() => { const Icono = PERK_ICONOS[i][0]; return <Icono className="w-5 h-5" /> })()}
            </span>
            {p}
          </li>
        ))}
      </ul>
      <button onClick={onSignup}
        className="w-full sm:w-auto rounded-xl bg-violet-600 hover:bg-violet-500 px-6 py-3 text-white text-sm font-black shadow-lg shadow-violet-500/20 transition-colors">
        {tr({ es: 'Crear cuenta gratis →', en: 'Create a free account →', ca: 'Crear compte gratis →' })}
      </button>
    </section>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { t, localPath, lang, tr } = useLang()
  const { user } = useAuth()
  const debePreguntarNivel = useDebePreguntarNivel()
  const [stats, setStats] = useState(null)
  const [classes, setClasses] = useState(null) // null = aún sin comprobar
  const [pendingTasks, setPendingTasks] = useState(0)

  // /app es el panel de quien ya tiene cuenta — la venta ocurre en "/"
  // (Landing.jsx), no aquí. Nadie debería llegar sin sesión salvo por un
  // enlace viejo o el propio prerender (que tampoco tiene sesión nunca:
  // ver IS_PRERENDER en AccessGate.jsx para el motivo). En ambos casos la
  // respuesta correcta es la misma: mandar a la página que sí vende.
  const [showAuth, setShowAuth] = useState(false)

  // Antes esto echaba a la landing a quien llegara sin sesión. Ya no: /app es
  // el destino del botón "Empezar gratis" de la landing TAMBIÉN para quien no
  // tiene cuenta — es el sitio desde el que se va libremente a Estudiar,
  // Juegos o la Pregunta Diaria. Con la redirección puesta, ese botón hacía
  // un bucle (landing → /app → landing).
  //
  // Lo que sí cambia sin sesión es qué se pinta: las tarjetas de navegación y
  // los anuncios salen igual, y el bloque de progreso se sustituye por la
  // invitación a registrarse (no hay progreso que enseñar de quien no tiene
  // cuenta). Sigue con noindex: es un panel, no una página de captación.

  // Sin reseteo para !user, mismo motivo que el efecto de clases de abajo:
  // el componente vuelve <Loader/> mientras no hay usuario, así que nada lee
  // `stats` en ese estado.
  useEffect(() => {
    if (user) getStats(user.uid).then(setStats)
  }, [user])

  // El curso vive en localStorage para que las rejillas ya salgan filtradas
  // en el primer pintado, pero la cuenta es la verdad entre dispositivos: al
  // haber sesión se reconcilian (ver sincronizarNivel en lib/nivel.js). Si el
  // doc no lo tiene y este navegador sí, se sube — así quien eligió curso sin
  // cuenta y luego se registra no pierde la respuesta.
  useEffect(() => {
    if (user) sincronizarNivel(user.uid)
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
    es: { title: 'Aprende jugando: el mismo concepto desde varios ángulos', desc: 'Plataforma educativa para Primaria, ESO y Bachillerato. Juegos y exámenes en 11 materias, gratis y sin registro. Cada concepto, explicado de varias formas distintas.' },
    en: { title: 'Learn by playing: one concept, several angles', desc: 'Educational platform for primary and secondary school. Games and exams across 11 subjects, free and with no sign-up. Every concept, explained in several different ways.' },
    ca: { title: 'Aprèn jugant: el mateix concepte des de diversos angles', desc: 'Plataforma educativa per a Primària, ESO i Batxillerat. Jocs i exàmens en 11 matèries, gratis i sense registre. Cada concepte, explicat de diverses maneres.' },
  }[lang] || {}

  // Solo undefined (la sesión aún se resuelve) espera. `null` ya NO: sin
  // cuenta la página se pinta igual, con la invitación a registrarse en el
  // sitio del progreso.
  if (user === undefined) return <Loader />

  const subjectEntries = stats ? aggregateStudentStats(stats, lang).subjectEntries : []

  return (
    <div className="relative z-10 px-4 sm:px-8">
      {/* La raíz del sitio: el producto. Indexable (la meta del prerender vive
          en staticMeta['/']). */}
      <SEOHead title={seo.title} description={seo.desc} path="/" lang={lang} />

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
            {user
              ? tr({
                  es: `Hola, ${user.displayName?.split(' ')[0] || ''}`,
                  en: `Hi, ${user.displayName?.split(' ')[0] || ''}`,
                  ca: `Hola, ${user.displayName?.split(' ')[0] || ''}`,
                })
              : tr({ es: 'Elige por dónde empezar', en: 'Pick where to start', ca: 'Tria per on començar' })}
          </p>
        </div>

        {/* Cards principales: van directas a la página real (/estudiar,
            /juegos, /diaria), no a una ficha informativa — no hace falta
            convencer a nadie de entrar, ya está pagando. */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PUERTAS.map(card => (
            <div key={card.id} className="aspect-square sm:aspect-[4/5]">
              {/* priority en la primera tarjeta, que ahora es el reto diario:
                  es la imagen que entra en pantalla antes que ninguna. */}
              <HeroCard card={card} onClick={() => navigate(localPath(card.path))} priority={card.id === 'diaria'} />
            </div>
          ))}
        </div>

        {/* EL CURSO — la única pregunta que hace Tuthor, y una sola vez.
            Va justo debajo de las tres puertas porque es lo que decide qué
            se ve al cruzarlas: sin curso, Estudiar enseña los 91 temas del
            catálogo por sus tres niveles. No es un modal y no bloquea nada —
            se puede ignorar y seguir, y quien la cierra no la vuelve a ver
            (marcarPreguntado en lib/nivel.js). */}
        {debePreguntarNivel && <NivelPicker variant="card" className="mt-6" />}

        {/* PROGRESO — o la invitación a tener uno, si no hay cuenta */}
        <div className="mt-6 mb-8">
          {!user ? (
            <>
              <SignupPrompt onSignup={() => setShowAuth(true)} />
              <EresProfesor className="mt-6" />
            </>
          ) : stats ? (
            <StatsWidget stats={stats} name={user.displayName?.split(' ')[0]} onVerMas={() => navigate(localPath('/perfil'))} />
          ) : (
            <EmptyStatsWidget onVerMas={() => navigate(localPath('/perfil'))} />
          )}
        </div>

        {/* Pro arriba y iGraal más abajo, separados a propósito: apilados uno
            debajo de otro leían como un bloque de anuncios. Repartidos, cada
            uno aparece en su momento del recorrido. Los dos se ocultan solos
            si la cuenta es Pro, y también por encima de 1400px, donde el
            trabajo lo hacen los raíles laterales. */}
        <ProUpsell variant="inline" className="mb-8" />

        {/* POR MATERIA — solo materias con actividad registrada */}
        {subjectEntries.length > 0 && (
          <SubjectsGrid subjectEntries={subjectEntries} navigate={navigate} localPath={localPath} lang={lang} />
        )}

        {/* MIS CLASES — solo si el alumno está en alguna */}
        {classes && classes.length > 0 && (
          <MisClasesCard classes={classes} pendingTasks={pendingTasks} navigate={navigate} localPath={localPath} lang={lang} />
        )}

        {/* RECOMPENSAS */}
        <RewardsSection navigate={navigate} localPath={localPath} />

        {/* iGraal y la invitación, ya avanzada la página: quien ha bajado
            hasta aquí está navegando, no de paso. */}
        <AdSlot placement="inArticle" className="mb-4" />
        <ReferralCard variant="compact" className="mb-8" />

        {/* COMUNIDAD */}
        <section className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* Para familias y profes: la home es el producto; quien quiere
                entender qué es Tuthor, qué es gratis y cómo seguir a su hijo va
                a la página de familias (antes era la raíz). */}
            <Link to={localPath('/para-familias')}
              className={`group ${TARJETA} hover:border-amber-400/50 p-6 flex flex-col gap-3 transition-all`}>
              <div className="w-11 h-11 rounded-xl bg-amber-500/12 grid place-items-center"><Familia className="w-6 h-6" /></div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-sm">
                  {lang === 'en' ? 'For families & teachers' : lang === 'ca' ? 'Per a famílies i profes' : 'Para familias y profes'}
                </h3>
                <p className="text-white/50 text-xs mt-1 leading-relaxed">
                  {lang === 'en' ? 'What Tuthor is, what is free and how to follow your child. We explain it.'
                    : lang === 'ca' ? 'Què és Tuthor, què és gratis i com seguir el teu fill. T\'ho expliquem.'
                    : 'Qué es Tuthor, qué es gratis y cómo seguir a tu hijo. Te lo contamos.'}
                </p>
              </div>
              <span className="text-xs font-bold text-amber-400 group-hover:text-amber-300 flex items-center gap-1">
                {lang === 'en' ? 'How it works' : lang === 'ca' ? 'Com funciona' : 'Cómo funciona'}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </span>
            </Link>

            {/* Bug report */}
            <Link to={localPath('/reportar-bug')}
              className={`group ${TARJETA} hover:border-violet-400/50 p-6 flex flex-col gap-3 transition-all`}>
              <div className="w-11 h-11 rounded-xl bg-violet-500/12 grid place-items-center"><Bicho className="w-6 h-6" /></div>
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
              className={`group ${TARJETA} hover:border-emerald-400/50 p-6 flex flex-col gap-3 transition-all`}>
              <div className="w-11 h-11 rounded-xl bg-emerald-500/12 grid place-items-center"><Megafono className="w-6 h-6" /></div>
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
        <section className={`${TARJETA} p-6 sm:p-8 text-center`}>
          <span className="mx-auto mb-3 w-12 h-12 rounded-xl bg-violet-500/12 grid place-items-center">
            <Sobre className="w-7 h-7" />
          </span>
          <h2 className="text-2xl font-black text-white mb-2">{t('home.seo.contacto.titulo')}</h2>
          <p className="text-white/55 mb-5 max-w-md mx-auto">{t('home.seo.contacto.texto')}</p>
          <Link to={localPath('/contacto')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm rounded-xl transition-all hover:scale-[1.02]">
            {tr({ es: 'Escríbenos', en: 'Write to us', ca: 'Escriu-nos' })}
          </Link>
        </section>
      </div>

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={() => setShowAuth(false)}
        />
      )}
    </div>
  )
}
