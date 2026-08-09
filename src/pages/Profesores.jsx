import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import AuthModal from '../components/AuthModal'
import { activateTeacherProfile, saveTeacherProfileDraft, getTeacherProfile, hasTeacherAccess } from '../lib/classes'
import { TEACHER_PLAN } from '../lib/access'
import { startCheckout } from '../lib/checkout'

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

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Profesores() {
  const { user } = useAuth()
  const { lang, tr, localPath } = useLang()
  const navigate = useNavigate()

  const [checking, setChecking] = useState(true)
  const [showAuth, setShowAuth] = useState(false)
  const [accessMethod, setAccessMethod] = useState('pay') // 'pay' | 'code'
  const [schoolName, setSchoolName] = useState('')
  const [stage, setStage] = useState('eso')
  const [promoCode, setPromoCode] = useState('')
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (user === undefined) return
    if (!user) { setChecking(false); return }
    getTeacherProfile(user.uid).then(profile => {
      if (hasTeacherAccess(profile)) { navigate(localPath('/profesor'), { replace: true }); return }
      setChecking(false)
    }).catch(() => setChecking(false))
  }, [user])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!user) { setShowAuth(true); return }
    setStatus('sending')

    if (accessMethod === 'pay') {
      try {
        // active se deja en false a propósito — lo pone el webhook de Stripe
        // al confirmar el cobro (api/stripe-webhook.js), no esta escritura.
        await saveTeacherProfileDraft(user.uid, { schoolName, stage })
        await startCheckout('teacher')
      } catch {
        setStatus('error')
      }
      return
    }

    try {
      await activateTeacherProfile(user.uid, { schoolName, stage, promoCode: promoCode.trim().toUpperCase() })
      navigate(localPath('/profesor'))
    } catch (err) {
      setStatus(err?.code === 'permission-denied' ? 'invalid-code' : 'error')
    }
  }

  const metaTitle = tr({ es: 'Profesores y centros', en: 'Teachers & schools', ca: 'Professors i centres' })
  const metaDesc = tr({
    es: 'Crea clases, asigna tareas y consulta cómo estudian tus alumnos en Tuthor.',
    en: 'Create classes, assign tasks and see how your students study on Tuthor.',
    ca: 'Crea classes, assigna tasques i consulta com estudien els teus alumnes a Tuthor.',
  })

  if (user === undefined || checking) {
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
    { label: tr({ es: 'Ver progreso agregado de la clase', en: 'See aggregated class progress', ca: 'Veure el progrés agregat de la classe' }), free: false, teacher: true },
  ]

  return (
    <div className="relative">
      <SaasBackground />
      <SEOHead title={metaTitle} description={metaDesc} path="/profesores" lang={lang} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <Link to={localPath('/')} className="inline-flex items-center gap-1 text-white/35 hover:text-white/70 text-xs mt-6 mb-2 transition-colors">
          ← {tr({ es: 'Volver a Tuthor', en: 'Back to Tuthor', ca: 'Tornar a Tuthor' })}
        </Link>

        {/* ── HERO ── */}
        <section className="pt-10 pb-16 sm:pt-16 sm:pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-teal-300 bg-teal-500/10 border border-teal-500/20 rounded-full px-3 py-1.5 mb-5">
              {tr({ es: 'Tuthor para centros', en: 'Tuthor for schools', ca: 'Tuthor per a centres' })}
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-[1.05] mb-5">
              {tr({ es: 'Lleva tu clase a Tuthor', en: 'Bring your class to Tuthor', ca: 'Porta la teva classe a Tuthor' })}
            </h1>
            <p className="text-white/55 text-base sm:text-lg mb-8 max-w-md">
              {tr({
                es: 'Crea una clase, asigna tareas y mira en un panel quién ha jugado, quién ha aprobado y quién todavía no ha entrado.',
                en: 'Create a class, assign tasks and see in one panel who has played, who has passed, and who hasn\'t logged in yet.',
                ca: 'Crea una classe, assigna tasques i mira en un panell qui ha jugat, qui ha aprovat i qui encara no ha entrat.',
              })}
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => scrollTo('pricing')}
                className="px-6 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                {tr({ es: 'Empezar ahora →', en: 'Get started →', ca: 'Començar ara →' })}
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
        <section id="pricing" className="py-16 sm:py-20 scroll-mt-8">
          <div className="max-w-md mx-auto">
            <div className="flex items-end justify-between gap-3 mb-6 border border-teal-500/20 rounded-2xl px-5 py-4 bg-teal-500/[0.06]">
              <div>
                <p className="text-white font-black text-3xl leading-none">
                  {TEACHER_PLAN.price.toFixed(2).replace('.', ',')}€ <span className="text-white/40 text-sm font-semibold">/ {tr({ es: 'mes', en: 'month', ca: 'mes' })}</span>
                </p>
                <p className="text-white/40 text-xs mt-1.5">{tr({ es: 'Por profesor, cancela cuando quieras', en: 'Per teacher, cancel anytime', ca: 'Per professor, cancel·la quan vulguis' })}</p>
              </div>
              <span className="text-3xl">🎓</span>
            </div>

            <p className="text-white/35 text-[11px] uppercase tracking-wider font-bold mb-2">
              {tr({ es: 'Método de acceso', en: 'Access method', ca: 'Mètode d\'accés' })}
            </p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button type="button" onClick={() => setAccessMethod('pay')}
                className={`rounded-xl border px-3 py-3 text-left transition-colors ${accessMethod === 'pay' ? 'border-teal-500/50 bg-teal-500/10' : 'border-white/10 bg-white/[0.03] hover:border-white/20'}`}>
                <span className="text-lg block mb-1">💳</span>
                <p className={`text-xs font-bold ${accessMethod === 'pay' ? 'text-white' : 'text-white/70'}`}>{tr({ es: 'Pagar', en: 'Pay', ca: 'Pagar' })}</p>
              </button>
              <button type="button" onClick={() => setAccessMethod('code')}
                className={`rounded-xl border px-3 py-3 text-left transition-colors ${accessMethod === 'code' ? 'border-teal-500/50 bg-teal-500/10' : 'border-white/10 bg-white/[0.03] hover:border-white/20'}`}>
                <span className="text-lg block mb-1">🎟️</span>
                <p className={`text-xs font-bold ${accessMethod === 'code' ? 'text-white' : 'text-white/70'}`}>{tr({ es: 'Código de acceso', en: 'Access code', ca: 'Codi d\'accés' })}</p>
              </button>
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
              {accessMethod === 'code' && (
                <input type="text" required value={promoCode} onChange={e => setPromoCode(e.target.value)}
                  placeholder={tr({ es: 'Código de acceso', en: 'Access code', ca: 'Codi d\'accés' })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-teal-500 transition-colors" />
              )}

              {status === 'invalid-code' && (
                <p className="text-red-400 text-sm">
                  {tr({ es: 'Código no válido. Comprueba que lo has escrito bien.', en: 'Invalid code. Check that you typed it correctly.', ca: 'Codi no vàlid. Comprova que l\'has escrit bé.' })}
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
                  ? tr({ es: 'Iniciar sesión y empezar', en: 'Sign in and start', ca: 'Iniciar sessió i començar' })
                  : accessMethod === 'pay'
                  ? tr({
                      es: `Pagar ${TEACHER_PLAN.price.toFixed(2).replace('.', ',')}€/mes →`,
                      en: `Pay €${TEACHER_PLAN.price.toFixed(2)}/month →`,
                      ca: `Pagar ${TEACHER_PLAN.price.toFixed(2).replace('.', ',')}€/mes →`,
                    })
                  : tr({ es: 'Empezar a dar clase', en: 'Start teaching', ca: 'Començar a fer classe' })}
              </button>
            </form>
          </div>
        </section>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  )
}
