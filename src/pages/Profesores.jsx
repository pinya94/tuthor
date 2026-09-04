import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import TeacherAppSchema from '../components/TeacherAppSchema'
import AuthModal from '../components/AuthModal'
import { activateTeacherProfile, getTeacherProfile, hasTeacherAccess } from '../lib/classes'

// BETA GRATUITA (sept. 2026): mientras dure, no se pide pago — pero SÍ se pide
// la palabra de la beta (ver TEACHER_BETA_CODE en classes.js), que no se
// enseña en ningún sitio de esta página: se comparte por fuera, con quien se
// quiera invitar a probar. El camino de pago con Stripe sigue intacto en
// checkout.js y access.js, listo para reactivarse: basta con devolver aquí el
// formulario "pagar / código" que había antes y volver a importar
// TEACHER_PLAN/startCheckout.

const STAGES = [
  { id: 'primaria', label: { es: 'Primaria', en: 'Primary', ca: 'Primària' } },
  { id: 'eso', label: { es: 'ESO', en: 'Secondary', ca: 'ESO' } },
  { id: 'bachillerato', label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' } },
  { id: 'otro', label: { es: 'Otro', en: 'Other', ca: 'Altre' } },
]

// ── Identidad visual propia ──────────────────────────────────────────────────
// Esta landing necesita sentirse como un SaaS aparte, no como una página más
// del sitio: pinta su propio fondo a pantalla completa por encima del bosque
// animado global (Layout en App.jsx). Al estar dentro del wrapper `relative
// z-10` de Layout, cualquier z-index basta para taparlo — es un nuevo
// stacking context que se pinta entero por encima del fondo (z-0) y las
// partículas (z-0), sin tocar App.jsx.
function SaasBackground() {
  return (
    <div
      className="fixed inset-0"
      style={{
        background: `
          radial-gradient(1100px 550px at 15% -5%, rgba(45,212,191,0.16), transparent 60%),
          radial-gradient(900px 500px at 88% 8%, rgba(139,92,246,0.18), transparent 60%),
          linear-gradient(180deg, #060612 0%, #0a0b18 45%, #06060f 100%)
        `,
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  )
}

// Marco de navegador decorativo para los mockups del producto: son
// recreaciones estáticas de las pantallas reales (ProfesorPanel, ProfesorClase,
// Clase.jsx) con datos de ejemplo, no capturas — así siempre quedan nítidas y
// no hay que mantener imágenes sincronizadas con la UI real.
function BrowserFrame({ children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d0e1a] shadow-2xl shadow-black/50 overflow-hidden select-none pointer-events-none">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="ml-3 text-[10px] text-white/25 font-mono">tuthor.es/profesor</span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  )
}

function MockClassList() {
  return (
    <BrowserFrame>
      <p className="text-white font-black text-sm mb-3">Mis clases</p>
      <div className="space-y-2">
        {[{ name: '3º ESO A', n: 24, code: 'F7K2QX' }, { name: '4º ESO B', n: 19, code: 'M3RT9L' }].map(c => (
          <div key={c.code} className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5">
            <div>
              <p className="text-white text-[13px] font-bold">{c.name}</p>
              <p className="text-white/40 text-[11px]">{c.n} alumnos</p>
            </div>
            <span className="font-mono text-[11px] bg-black/30 border border-white/10 rounded-lg px-2 py-1 text-teal-300">{c.code}</span>
          </div>
        ))}
      </div>
    </BrowserFrame>
  )
}

// 26 nombres distintos — ni uno repetido, para que una clase llena no lea
// como la misma ficha clonada 26 veces. 4 pupitres se quedan vacíos a
// propósito (30 huecos, no 26): un plano perfectamente lleno sin un solo
// hueco libre se ve más a maqueta imposible que a clase real.
const NOMBRES_CLASE = [
  'Marta', 'Iker', 'Nora', 'Bruno', 'Aitana', 'Leo', 'Uxue', 'Diego',
  'Sara', 'Pau', 'Elena', 'Mario', 'Vera', 'Hugo', 'Alba', 'Nico',
  'Julia', 'Enzo', 'Carla', 'Rubén', 'Naia', 'Marc', 'Lucía', 'Adrián',
  'Irene', 'Álex',
]
const HUECOS_PLANO = 30

function MockSeating() {
  const mesas = Array.from({ length: HUECOS_PLANO }, (_, i) => NOMBRES_CLASE[i] ?? null)
  return (
    <BrowserFrame>
      <div className="flex items-center justify-between mb-3">
        <p className="text-white font-black text-sm">💺 Aula · 3º ESO A</p>
        <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-teal-600 text-white">🎲 Sale a la pizarra</span>
      </div>
      <div className="rounded-lg bg-white/[0.07] py-1.5 text-center mb-2">
        <span className="text-white/35 text-[9px] uppercase tracking-[0.3em] font-bold">Pizarra</span>
      </div>
      <div className="grid grid-cols-6 gap-1">
        {mesas.map((n, i) => (
          <div key={i} className={`aspect-[4/3] rounded-md border flex items-center justify-center text-center leading-tight px-0.5 text-[8px] font-bold ${
            n ? 'bg-white/10 border-white/20 text-white' : 'border-dashed border-white/10 text-white/15'
          }`}>
            {n || '·'}
          </div>
        ))}
      </div>
    </BrowserFrame>
  )
}

function MockTasks() {
  const rows = [
    { label: '🕵️ Guerra Civil — ¿Quién es quién?', done: 3, total: 4 },
    { label: '⚡ Fuerza Neta', done: 1, total: 4 },
    { label: '📌 Traer el libro de texto', done: 4, total: 4 },
  ]
  return (
    <BrowserFrame>
      <div className="flex items-center justify-between mb-3">
        <p className="text-white font-black text-sm">Tareas · 3º ESO A</p>
        <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-teal-600 text-white">+ Asignar tarea</span>
      </div>
      <div className="space-y-2">
        {rows.map(r => (
          <div key={r.label} className="flex items-center gap-3 bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5">
            <span className="flex-1 text-white text-[12.5px] font-semibold truncate">{r.label}</span>
            <div className="flex-1 max-w-[70px] bg-white/5 rounded-full h-1.5">
              <div className="h-1.5 rounded-full bg-teal-500" style={{ width: `${(r.done / r.total) * 100}%` }} />
            </div>
            <span className="text-white/45 text-[11px] font-semibold tabular-nums w-8 text-right">{r.done}/{r.total}</span>
          </div>
        ))}
      </div>
    </BrowserFrame>
  )
}

function MockStudentView() {
  return (
    <BrowserFrame>
      <p className="text-white font-black text-sm mb-3">🏫 Mi clase</p>
      <div className="space-y-2">
        <div className="border border-red-500/30 rounded-xl px-3.5 py-2.5 bg-white/[0.04]">
          <p className="text-white text-[12.5px] font-bold">Traer el libro de texto</p>
          <p className="text-[11px] mt-0.5"><span className="text-white/40">3º ESO A · </span><span className="text-red-400 font-semibold">vence 3 ago</span></p>
        </div>
        <div className="border border-white/10 rounded-xl px-3.5 py-2.5 bg-white/[0.04] flex items-center justify-between gap-3">
          <div>
            <p className="text-white text-[12.5px] font-bold">⚡ Fuerza Neta</p>
            <p className="text-white/40 text-[11px] mt-0.5">3º ESO A · vence 7 ago</p>
          </div>
          <span className="text-white/30 text-[11px] shrink-0">Pendiente</span>
        </div>
        <div className="border border-white/10 rounded-xl px-3.5 py-2.5 bg-white/[0.04] flex items-center justify-between gap-3">
          <p className="text-white text-[12.5px] font-bold truncate">🕵️ Guerra Civil — ¿Quién es quién?</p>
          <span className="text-green-400 text-[11px] font-bold shrink-0">✅ Hecha <span className="text-white/40">92 pts</span></span>
        </div>
      </div>
    </BrowserFrame>
  )
}

// Tabla, no cuadrícula de mesas: a propósito lo más distinto posible de
// MockSeating aunque las dos vivan en la misma clase — así ninguna de las
// dos lee como la misma imagen repetida con otro color.
function MockGrades() {
  const alumnos = [
    { name: 'Marta', notas: [8.5, 7, 9] },
    { name: 'Iker', notas: [6, 5.5, 7.5] },
    { name: 'Nora', notas: [9.5, 9, 10] },
    { name: 'Bruno', notas: [4.5, 6, 5] },
    { name: 'Aitana', notas: [7, 8, 7.5] },
  ]
  const trimestres = ['Todas', '1º', '2º', '3º']
  return (
    <BrowserFrame>
      <div className="flex items-center justify-between mb-3">
        <p className="text-white font-black text-sm">🔢 Notas · 3º ESO A</p>
        <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-teal-600 text-white">+ Columna</span>
      </div>
      <div className="flex gap-1.5 mb-2.5">
        {trimestres.map((t, i) => (
          <span key={t} className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${i === 0 ? 'bg-teal-600 text-white' : 'bg-white/5 text-white/40'}`}>
            {t}
          </span>
        ))}
      </div>
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <div className="grid grid-cols-[1fr_repeat(3,32px)] bg-white/5 px-3 py-1.5 text-[9px] font-bold text-white/40 uppercase tracking-wide">
          <span>Alumno</span>
          <span className="text-center">Ex1</span>
          <span className="text-center">Ex2</span>
          <span className="text-center">Ex3</span>
        </div>
        {alumnos.map((a, i) => (
          <div key={a.name} className={`grid grid-cols-[1fr_repeat(3,32px)] items-center px-3 py-2 ${i < alumnos.length - 1 ? 'border-b border-white/5' : ''}`}>
            <span className="text-white text-[12px] font-semibold truncate">{a.name}</span>
            {a.notas.map((n, j) => (
              <span key={j} className={`text-center text-[11px] font-black tabular-nums ${n >= 5 ? 'text-green-400' : 'text-red-400'}`}>{n}</span>
            ))}
          </div>
        ))}
      </div>
    </BrowserFrame>
  )
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Profesores() {
  const { user } = useAuth()
  const { lang, tr, localPath } = useLang()
  const navigate = useNavigate()

  // true en cuanto se sabe si ESTE usuario ya tiene acceso de profesor — solo
  // tiene sentido comprobarlo con sesión, así que sin usuario no hay nada que
  // esperar (ver `loading` más abajo, que no necesita este estado para eso).
  const [profileChecked, setProfileChecked] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [schoolName, setSchoolName] = useState('')
  const [stage, setStage] = useState('eso')
  const [betaCode, setBetaCode] = useState('')
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (!user) return
    getTeacherProfile(user.uid).then(profile => {
      if (hasTeacherAccess(profile)) { navigate(localPath('/profesor'), { replace: true }); return }
      setProfileChecked(true)
    }).catch(() => setProfileChecked(true))
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSubmit(e) {
    e.preventDefault()
    if (!user) { setShowAuth(true); return }
    setStatus('sending')
    try {
      // Gratis, pero no abierto a cualquiera: hace falta la palabra de la
      // beta (activateTeacherProfile la normaliza — da igual mayúsculas o
      // espacios de más). Si no coincide con lo que exige firestore.rules,
      // el propio setDoc llega denegado con permission-denied.
      await activateTeacherProfile(user.uid, { schoolName, stage, promoCode: betaCode })
      navigate(localPath('/profesor'))
    } catch (err) {
      setStatus(err?.code === 'permission-denied' ? 'invalid-code' : 'error')
    }
  }

  // Título y descripción pensados para quien busca "herramientas para
  // profesores" (o variantes: gestión de clase, pasar lista online, notas
  // online) — no un genérico "Profesores y centros" que no encaja con ningún
  // término de búsqueda real. Mantener en sync con STATIC_META['/profesores']
  // en scripts/seoMeta.mjs: esta es la meta que de verdad llega a producción
  // (la página renderiza a tiempo en el prerender), esa otra es solo el
  // respaldo de emergencia si algún día dejara de hacerlo.
  const metaTitle = tr({
    es: 'Herramientas gratis para profesores',
    en: 'Free tools for teachers',
    ca: 'Eines gratuïtes per a professors',
  })
  const metaDesc = tr({
    es: 'Pasa lista, pon notas, crea tus propios exámenes y gestiona toda la clase desde el móvil. Gratis durante la beta, sin tarjeta ni permanencia.',
    en: 'Take attendance, grade your students, build your own quizzes and run the whole classroom from your phone. Free during the beta, no card required.',
    ca: 'Passa llista, posa notes, crea els teus propis exàmens i gestiona tota la classe des del mòbil. Gratis durant la beta, sense targeta.',
  })

  if (user === undefined || (user && !profileChecked)) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <p className="text-white/30 text-sm">{tr({ es: 'Cargando…', en: 'Loading…', ca: 'Carregant…' })}</p>
      </div>
    )
  }

  const comparisonRows = [
    { label: tr({ es: 'Jugar y hacer exámenes', en: 'Play games and take exams', ca: 'Jugar i fer exàmens' }), free: true, teacher: true },
    { label: tr({ es: 'Rachas, monedas y tienda', en: 'Streaks, coins and shop', ca: 'Ratxes, monedes i botiga' }), free: true, teacher: true },
    { label: tr({ es: 'Crear clases con código de acceso', en: 'Create classes with an access code', ca: 'Crear classes amb codi d\'accés' }), free: false, teacher: true },
    { label: tr({ es: 'Asignar tareas (juego, examen o texto)', en: 'Assign tasks (game, exam or text)', ca: 'Assignar tasques (joc, examen o text)' }), free: false, teacher: true },
    { label: tr({ es: 'Crear tus propios exámenes tipo test', en: 'Build your own multiple-choice quizzes', ca: 'Crear els teus propis examens tipus test' }), free: false, teacher: true },
    { label: tr({ es: 'Plano de la clase y modo puntos', en: 'Seating plan and points mode', ca: 'Plànol de la classe i mode punts' }), free: false, teacher: true },
    { label: tr({ es: 'Pasar lista y llevar notas por trimestre', en: 'Take attendance and grades by term', ca: 'Passar llista i portar notes per trimestre' }), free: false, teacher: true },
    { label: tr({ es: 'Boletín para familias', en: 'Report for families', ca: 'Butlletí per a famílies' }), free: false, teacher: true },
    { label: tr({ es: 'Ver progreso agregado de la clase', en: 'See aggregated class progress', ca: 'Veure el progrés agregat de la classe' }), free: false, teacher: true },
  ]

  return (
    <div className="relative">
      <SaasBackground />
      <SEOHead title={metaTitle} description={metaDesc} path="/profesores" lang={lang} />
      <TeacherAppSchema lang={lang} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <Link to={localPath('/')} className="inline-flex items-center gap-1 text-white/35 hover:text-white/70 text-xs mt-6 mb-2 transition-colors">
          ← {tr({ es: 'Volver a Tuthor', en: 'Back to Tuthor', ca: 'Tornar a Tuthor' })}
        </Link>

        {/* ── HERO ── */}
        <section className="pt-10 pb-16 sm:pt-16 sm:pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex flex-wrap gap-2 mb-5">
              {/* El texto del badge dobla como refuerzo SEO on-page: es la
                  frase que se busca ("herramientas para profesores"), no un
                  genérico "Tuthor para centros" que no la contiene. */}
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-teal-300 bg-teal-500/10 border border-teal-500/20 rounded-full px-3 py-1.5">
                {tr({ es: 'Herramientas para profesores', en: 'Tools for teachers', ca: 'Eines per a professors' })}
              </span>
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1.5">
                🧪 {tr({ es: 'Beta gratuita', en: 'Free beta', ca: 'Beta gratuïta' })}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-[1.05] mb-5">
              {tr({ es: 'Lleva tu clase a Tuthor', en: 'Bring your class to Tuthor', ca: 'Porta la teva classe a Tuthor' })}
            </h1>
            <p className="text-white/55 text-base sm:text-lg mb-3 max-w-md">
              {tr({
                es: 'Crea una clase, asigna tareas y mira en un panel quién ha jugado, quién ha aprobado y quién todavía no ha entrado.',
                en: 'Create a class, assign tasks and see in one panel who has played, who has passed, and who hasn\'t logged in yet.',
                ca: 'Crea una classe, assigna tasques i mira en un panell qui ha jugat, qui ha aprovat i qui encara no ha entrat.',
              })}
            </p>
            <p className="text-amber-300/70 text-[13px] mb-8 max-w-md">
              {tr({
                es: 'Está en fase de pruebas: es gratis mientras dure y algunas cosas pueden cambiar. Tus datos se guardan igual que en el resto de Tuthor, según nuestra política de privacidad.',
                en: 'It\'s in testing: free while it lasts, and some things may change. Your data is stored just like the rest of Tuthor, under our privacy policy.',
                ca: 'Està en fase de proves: és gratis mentre duri i algunes coses poden canviar. Les teves dades es guarden igual que a la resta de Tuthor.',
              })}
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => scrollTo('empezar')}
                className="px-6 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                {tr({ es: 'Empezar gratis →', en: 'Start for free →', ca: 'Començar gratis →' })}
              </button>
              <button onClick={() => scrollTo('features')}
                className="px-6 py-3.5 border border-white/15 hover:border-white/30 text-white/80 hover:text-white font-bold text-sm rounded-xl transition-colors">
                {tr({ es: 'Ver cómo funciona', en: 'See how it works', ca: 'Veure com funciona' })}
              </button>
            </div>
          </div>
          <div className="lg:pl-6">
            <MockTasks />
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section id="features" className="py-16 sm:py-20 space-y-20 sm:space-y-28 scroll-mt-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1"><MockClassList /></div>
            <div className="order-1 lg:order-2">
              <span className="text-3xl block mb-3">🔑</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                {tr({ es: 'Crea una clase en segundos', en: 'Create a class in seconds', ca: 'Crea una classe en segons' })}
              </h2>
              <p className="text-white/55 text-[15px] leading-relaxed">
                {tr({
                  es: 'Cada clase tiene su propio código. Tus alumnos lo introducen desde su cuenta de Tuthor de siempre — no necesitan crear nada nuevo ni descargar otra app.',
                  en: 'Each class gets its own code. Your students enter it from their usual Tuthor account — no new sign-up, no separate app.',
                  ca: 'Cada classe té el seu propi codi. Els teus alumnes l\'introdueixen des del seu compte de Tuthor de sempre — no necessiten crear res nou.',
                })}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-3xl block mb-3">💺</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                {tr({ es: 'El plano de la clase, en el móvil', en: 'The classroom plan, on your phone', ca: 'El plànol de la classe, al mòbil' })}
              </h2>
              <p className="text-white/55 text-[15px] leading-relaxed">
                {tr({
                  es: 'Sienta a cada alumno tocando su mesa, sortea sitios cuando haga falta y saca a alguien a la pizarra sin repetir siempre a los mismos. Toca una mesa ocupada y ves ahí mismo sus resultados.',
                  en: 'Seat each student by tapping their desk, shuffle seats when you need to, and pick someone for the board without always repeating the same names. Tap an occupied desk to see their results right there.',
                  ca: 'Asseu cada alumne tocant la seva taula, sorteja llocs quan calgui i treu algú a la pissarra sense repetir sempre els mateixos.',
                })}
              </p>
            </div>
            <div><MockSeating /></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-3xl block mb-3">📝</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                {tr({ es: 'Asigna tareas, ellos juegan', en: 'Assign tasks, they play', ca: 'Assigna tasques, ells juguen' })}
              </h2>
              <p className="text-white/55 text-[15px] leading-relaxed">
                {tr({
                  es: 'Elige un juego, un examen por tema (ej. Guerra Civil Española) o escribe una tarea libre. Se la mandas a toda la clase o a alumnos concretos, con fecha límite, y se completa sola al jugarla.',
                  en: 'Pick a game, an exam by topic (e.g. the Spanish Civil War) or write a free-text task. Send it to the whole class or specific students, with a due date — it completes itself as they play.',
                  ca: 'Tria un joc, un examen per tema (ex. Guerra Civil Espanyola) o escriu una tasca lliure. L\'envies a tota la classe o a alumnes concrets, amb data límit.',
                })}
              </p>
            </div>
            <div><MockTasks /></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1"><MockStudentView /></div>
            <div className="order-1 lg:order-2">
              <span className="text-3xl block mb-3">🎒</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                {tr({ es: 'Tus alumnos ven todo claro', en: 'Your students see everything clearly', ca: 'Els teus alumnes ho veuen tot clar' })}
              </h2>
              <p className="text-white/55 text-[15px] leading-relaxed">
                {tr({
                  es: 'En su perfil aparece un único sitio con sus tareas pendientes y hechas, con la fecha límite bien visible — nada se pierde en un chat o un cuaderno.',
                  en: 'Their profile has one place for pending and completed tasks, with the due date clearly visible — nothing gets lost in a chat or a notebook.',
                  ca: 'Al seu perfil apareix un únic lloc amb les seves tasques pendents i fetes, amb la data límit ben visible.',
                })}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-3xl block mb-3">🔢</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                {tr({ es: 'Las notas, organizadas por trimestre', en: 'Grades, organized by term', ca: 'Les notes, organitzades per trimestre' })}
              </h2>
              <p className="text-white/55 text-[15px] leading-relaxed">
                {tr({
                  es: 'Añade una columna por examen o trabajo, márcala con el trimestre si te sirve, y ve la media de cada alumno y de la clase entera de un vistazo. Filtra cuando quieras revisar solo uno.',
                  en: 'Add a column per exam or assignment, tag it with the term if it helps, and see each student\'s average — and the whole class\'s — at a glance. Filter whenever you want to check just one.',
                  ca: 'Afegeix una columna per examen o treball, marca-la amb el trimestre si et va bé, i veu la mitjana de cada alumne i de tota la classe d\'un cop d\'ull.',
                })}
              </p>
            </div>
            <div><MockGrades /></div>
          </div>

          {/* Módulos opcionales: se activan por clase desde "Más módulos" —
              se muestran en cuadrícula compacta (no como bloque alterno de
              página completa) porque son seis capacidades y no todas las
              clases las usan todas; el objetivo aquí es que se sepa que
              existen, no repetir el ritmo largo de los bloques de arriba. */}
          <div>
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                {tr({ es: 'Y lo que necesites cuando lo necesites', en: 'And whatever you need, when you need it', ca: 'I el que necessitis quan ho necessitis' })}
              </h2>
              <p className="text-white/45 text-sm max-w-lg mx-auto">
                {tr({
                  es: 'Módulos que activas o desactivas por clase desde "Más módulos" — no hace falta montar el aula entera de golpe.',
                  en: 'Modules you turn on or off per class from "More modules" — no need to set up the whole classroom at once.',
                  ca: 'Mòduls que actives o desactives per classe des de "Més mòduls" — no cal muntar l\'aula sencera de cop.',
                })}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: '🙋', title: tr({ es: 'Pasar lista', en: 'Take attendance', ca: 'Passar llista' }),
                  desc: tr({ es: 'Marca faltas en segundos, para hoy o cualquier día pasado.', en: 'Mark absences in seconds, for today or any past day.', ca: 'Marca faltes en segons, per avui o qualsevol dia passat.' }) },
                { icon: '❓', title: tr({ es: 'Crea tus propios exámenes', en: 'Build your own quizzes', ca: 'Crea els teus propis examens' }),
                  desc: tr({ es: 'Preguntas de tipo test, tuyas, que se envían como tarea y se corrigen solas.', en: 'Your own multiple-choice questions, sent as a task and self-graded.', ca: 'Preguntes tipus test, teves, que s\'envien com a tasca i es corregeixen soles.' }) },
                { icon: '💬', title: tr({ es: 'Observaciones', en: 'Notes on students', ca: 'Observacions' }),
                  desc: tr({ es: 'Anota algo puntual sobre un alumno, con fecha, para no fiarlo todo a la memoria.', en: 'Jot down something about a student, dated, instead of relying on memory.', ca: 'Anota algo puntual sobre un alumne, amb data, per no fiar-ho tot a la memòria.' }) },
                { icon: '📄', title: tr({ es: 'Boletín para familias', en: 'Report for families', ca: 'Butlletí per a famílies' }),
                  desc: tr({ es: 'Un resumen con notas, asistencia y observaciones, listo para compartir.', en: 'A summary of grades, attendance and notes, ready to share.', ca: 'Un resum amb notes, assistència i observacions, llest per compartir.' }) },
                { icon: '🎲', title: tr({ es: 'Modo puntos y pizarra', en: 'Points mode & the board', ca: 'Mode punts i pissarra' }),
                  desc: tr({ es: 'Suma puntos por mesa desde el plano y sortea quién sale a la pizarra.', en: 'Award points per desk from the seating plan and pick who goes to the board.', ca: 'Suma punts per taula des del plànol i sorteja qui surt a la pissarra.' }) },
              ].map(m => (
                <div key={m.title} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5">
                  <span className="text-2xl block mb-2.5">{m.icon}</span>
                  <p className="text-white font-bold text-[14px] mb-1">{m.title}</p>
                  <p className="text-white/45 text-[12.5px] leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPARATIVA ── */}
        <section className="py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-2">
            {tr({ es: 'Qué cambia respecto a una cuenta normal', en: 'What changes vs. a regular account', ca: 'Què canvia respecte a un compte normal' })}
          </h2>
          <p className="text-white/45 text-sm text-center mb-10">
            {tr({ es: 'Tus alumnos siguen jugando gratis, siempre.', en: 'Your students always keep playing for free.', ca: 'Els teus alumnes segueixen jugant gratis, sempre.' })}
          </p>
          <div className="max-w-2xl mx-auto rounded-2xl border border-white/10 overflow-hidden bg-white/[0.03]">
            <div className="grid grid-cols-[1fr_auto_auto] gap-3 px-5 py-3 bg-white/5 text-[11px] uppercase tracking-wider font-bold text-white/40">
              <span />
              <span className="w-16 text-center">{tr({ es: 'Gratis', en: 'Free', ca: 'Gratis' })}</span>
              <span className="w-20 text-center text-teal-300">{tr({ es: 'Profesor', en: 'Teacher', ca: 'Professor' })}</span>
            </div>
            {comparisonRows.map((row, i) => (
              <div key={row.label} className={`grid grid-cols-[1fr_auto_auto] gap-3 px-5 py-3.5 items-center ${i > 0 ? 'border-t border-white/5' : ''}`}>
                <span className="text-white/70 text-[13.5px]">{row.label}</span>
                <span className="w-16 text-center">{row.free ? '✅' : <span className="text-white/20">—</span>}</span>
                <span className="w-20 text-center">{row.teacher ? '✅' : <span className="text-white/20">—</span>}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRICING / FORMULARIO ── */}
        <section id="empezar" className="py-16 sm:py-20 scroll-mt-8">
          <div className="max-w-md mx-auto">
            <div className="flex items-start gap-3 mb-6 border border-amber-500/25 rounded-2xl px-5 py-4 bg-amber-500/[0.06]">
              <span className="text-2xl shrink-0">🧪</span>
              <div>
                <p className="text-white font-black text-base leading-tight">
                  {tr({ es: 'Acceso gratuito por invitación', en: 'Free access by invitation', ca: 'Accés gratuït per invitació' })}
                </p>
                <p className="text-white/45 text-xs mt-1">
                  {tr({
                    es: 'Sin tarjeta ni compromiso. Necesitas la palabra de la beta — te la habrá dado quien te haya invitado a probarlo.',
                    en: 'No card, no commitment. You\'ll need the beta word — whoever invited you to try it should have given it to you.',
                    ca: 'Sense targeta ni compromís. Necessites la paraula de la beta — qui t\'hagi convidat a provar-ho te l\'haurà donat.',
                  })}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" required value={schoolName} onChange={e => setSchoolName(e.target.value)}
                placeholder={tr({ es: 'Nombre del centro', en: 'School name', ca: 'Nom del centre' })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-teal-500 transition-colors" />
              <select value={stage} onChange={e => setStage(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-teal-500 transition-colors">
                {STAGES.map(s => (
                  <option key={s.id} value={s.id} className="bg-[#0d0d1a]">{tr(s.label)}</option>
                ))}
              </select>
              <input type="text" required value={betaCode} onChange={e => setBetaCode(e.target.value)}
                placeholder={tr({ es: 'Palabra de la beta', en: 'Beta word', ca: 'Paraula de la beta' })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-teal-500 transition-colors" />

              {status === 'invalid-code' && (
                <p className="text-red-400 text-sm">
                  {tr({ es: 'Esa palabra no es correcta. Comprueba que la has escrito bien.', en: 'That word isn\'t right. Check you typed it correctly.', ca: 'Aquesta paraula no és correcta. Comprova que l\'has escrit bé.' })}
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-sm">
                  {tr({ es: 'Error al crear tu cuenta de profesor. Inténtalo de nuevo.', en: 'Error creating your teacher account. Please try again.', ca: 'Error en crear el teu compte de professor. Torna-ho a intentar.' })}
                </p>
              )}

              <button type="submit" disabled={status === 'sending'}
                className="w-full px-6 py-3.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99]">
                {status === 'sending'
                  ? tr({ es: 'Un momento…', en: 'One moment…', ca: 'Un moment…' })
                  : !user
                  ? tr({ es: 'Iniciar sesión y empezar gratis', en: 'Sign in and start for free', ca: 'Iniciar sessió i començar gratis' })
                  : tr({ es: 'Empezar gratis →', en: 'Start for free →', ca: 'Començar gratis →' })}
              </button>
            </form>
          </div>
        </section>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  )
}
