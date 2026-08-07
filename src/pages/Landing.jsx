import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { GAMES } from '../lib/games'
import { EXAMS } from '../lib/exams'
import { PLANS, annualSavings } from '../lib/access'
import { startCheckout } from '../lib/checkout'
import AuthModal from '../components/AuthModal'
import SEOHead from '../components/SEOHead'

// Landing de venta. Estilo deliberadamente distinto al de dentro de la app
// (clara, editorial) para que se lea como lo que es: la página que explica el
// producto, no el producto.
//
// Todas las cifras salen de los registros, nunca escritas a mano: un catálogo
// que crece y una landing que sigue diciendo "15 juegos" es la forma más tonta
// de parecer más pequeño de lo que eres.
//
// Se cuentan RUTAS únicas, no ids: Tuthor Time y Acércate tienen dos entradas
// cada uno (clásico y roguelike) que son el mismo juego con dos modos. Decir
// 25 sería inflar el número.
const GAME_COUNT = new Set(Object.values(GAMES).map(g => g.route)).size
const SUBJECT_COUNT = new Set(Object.values(GAMES).map(g => g.subject)).size
const EXAM_COUNT = Object.values(EXAMS).filter(e => !e.retired).length

const SAVINGS = annualSavings()

// Los tres ángulos con los que se ataca un mismo concepto. Son juegos reales
// del catálogo, no ejemplos inventados: si alguno se retira, hay que tocar
// esto (el test de registries lo cazaría al desaparecer del catálogo).
const ANGLES = [
  {
    concept: { es: 'Funciones y gráficas', en: 'Functions and graphs', ca: 'Funcions i gràfiques' },
    emoji: '📈',
    games: [
      { name: 'El Portero', hook: { es: 'para el balón calculando su parábola', en: 'save the ball by working out its parabola', ca: 'atura la pilota calculant-ne la paràbola' } },
      { name: 'Caza la Función', hook: { es: 'ajusta la ecuación hasta que encaje en la gráfica', en: 'tweak the equation until it fits the graph', ca: "ajusta l'equació fins que encaixi al gràfic" } },
      { name: 'Trayectoria', hook: { es: 'dispara y ve la curva que has descrito', en: 'shoot and watch the curve you traced', ca: 'dispara i mira la corba que has descrit' } },
    ],
  },
  {
    concept: { es: 'Cálculo mental', en: 'Mental arithmetic', ca: 'Càlcul mental' },
    emoji: '🔢',
    games: [
      { name: 'Cálculo Mental', hook: { es: 'operaciones a contrarreloj', en: 'timed operations', ca: 'operacions a contrarellotge' } },
      { name: 'Acércate', hook: { es: 'combina números para llegar al objetivo', en: 'combine numbers to hit the target', ca: "combina nombres per arribar a l'objectiu" } },
      { name: 'NumPath', hook: { es: 'recorre el laberinto resolviendo el camino', en: 'cross the maze by solving the path', ca: 'recorre el laberint resolent el camí' } },
    ],
  },
]

const PAINS = [
  {
    emoji: '🤷',
    title: { es: '«No sé por dónde va»', en: '"I have no idea how they\'re doing"', ca: '«No sé per on va»' },
    body: { es: 'Ves qué materias toca, cuánto tiempo dedica y qué nota saca en cada examen. Sin preguntar y sin discusiones.', en: 'See which subjects they touch, how long they spend and what they score on each exam. No asking, no arguments.', ca: 'Veus quines matèries toca, quant temps hi dedica i quina nota treu a cada examen. Sense preguntar i sense discussions.' },
  },
  {
    emoji: '😑',
    title: { es: '«Se aburre a los cinco minutos»', en: '"They get bored in five minutes"', ca: '«S\'avorreix als cinc minuts»' },
    body: { es: 'Partidas cortas, monedas, rachas y ranking. La misma mecánica que le engancha al móvil, puesta a trabajar a tu favor.', en: 'Short rounds, coins, streaks and rankings. The same mechanics that hook them on their phone, working for you instead.', ca: 'Partides curtes, monedes, ratxes i rànquing. La mateixa mecànica que l\'enganxa al mòbil, treballant al teu favor.' },
  },
  {
    emoji: '📉',
    title: { es: '«Estudia y suspende igual»', en: '"They study and still fail"', ca: '«Estudia i suspèn igual»' },
    body: { es: 'Casi siempre es que no lo ha entendido, no que no lo haya leído. Por eso cada concepto viene desde varios ángulos.', en: "Usually it's that they didn't understand it, not that they didn't read it. That's why each concept comes from several angles.", ca: 'Gairebé sempre és que no ho ha entès, no que no ho hagi llegit. Per això cada concepte ve des de diversos angles.' },
  },
  {
    emoji: '💸',
    title: { es: '«Una academia son 150 € al mes»', en: '"Tutoring costs €150 a month"', ca: '«Una acadèmia són 150 € al mes»' },
    body: { es: `Tuthor son ${SAVINGS.equivalentMonthly.toFixed(2).replace('.', ',')} € al mes en el plan anual, y lo usa cuando quiere, no cuando toca clase.`, en: `Tuthor is €${SAVINGS.equivalentMonthly.toFixed(2)} a month on the annual plan, used whenever they want, not when class happens.`, ca: `Tuthor són ${SAVINGS.equivalentMonthly.toFixed(2).replace('.', ',')} € al mes en el pla anual, i l'usa quan vol, no quan toca classe.` },
  },
]

const FAQ = [
  {
    q: { es: '¿Mi hijo necesita un email o una contraseña?', en: 'Does my child need an email or password?', ca: 'El meu fill necessita un email o una contrasenya?' },
    a: { es: 'No. Tú entras con tu cuenta de Google y le das un código. Él lo escribe y entra directo, sin contraseña. Con ese código puede jugar y hacer exámenes, pero no ve el panel de seguimiento ni puede tocar la suscripción.', en: "No. You sign in with your Google account and give them a code. They type it and they're in, no password. With that code they can play and take exams, but they can't see the tracking panel or touch the subscription.", ca: 'No. Tu entres amb el teu compte de Google i li dones un codi. Ell l\'escriu i entra directe, sense contrasenya. Amb aquest codi pot jugar i fer exàmens, però no veu el panell de seguiment ni pot tocar la subscripció.' },
  },
  {
    q: { es: '¿Para qué edades sirve?', en: 'What ages is it for?', ca: 'Per a quines edats serveix?' },
    a: { es: 'Primaria, ESO y Bachillerato. Cada materia tiene contenido por nivel, así que el mismo tema se puede repasar más fácil o más difícil.', en: 'Primary and secondary school. Each subject has content by level, so the same topic can be revised at an easier or harder setting.', ca: 'Primària, ESO i Batxillerat. Cada matèria té contingut per nivell, així que el mateix tema es pot repassar més fàcil o més difícil.' },
  },
  {
    q: { es: '¿Vale para varios hermanos?', en: 'Does it work for several siblings?', ca: 'Serveix per a diversos germans?' },
    a: { es: 'Una suscripción es una cuenta, pensada para un alumno. Si la comparten, funciona, pero el progreso y las estadísticas de los dos se mezclan en el mismo sitio y el panel deja de decirte gran cosa.', en: 'One subscription is one account, meant for one student. If they share it, it works, but both their progress and stats get mixed in the same place and the panel stops telling you much.', ca: 'Una subscripció és un compte, pensada per a un alumne. Si la comparteixen, funciona, però el progrés i les estadístiques dels dos es barregen al mateix lloc i el panell deixa de dir-te gran cosa.' },
  },
  {
    q: { es: '¿Puedo cancelar cuando quiera?', en: 'Can I cancel any time?', ca: 'Puc cancel·lar quan vulgui?' },
    a: { es: 'Sí, desde tu cuenta y en cualquier momento. Sigues teniendo acceso hasta el final del periodo que ya has pagado.', en: 'Yes, from your account and at any time. You keep access until the end of the period you already paid for.', ca: 'Sí, des del teu compte i en qualsevol moment. Continues tenint accés fins al final del període que ja has pagat.' },
  },
]

function Header({ onLogin, user, tr, localPath }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3.5">
        <Link to={localPath('/')} className="flex items-center gap-2 font-black text-lg text-slate-900">
          <span className="text-xl">🦉</span> Tuthor
        </Link>

        <nav className="ml-auto flex items-center gap-1 sm:gap-3">
          <a href="#como-funciona" className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900 sm:block">
            {tr({ es: 'Cómo funciona', en: 'How it works', ca: 'Com funciona' })}
          </a>
          <a href="#precios" className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900 sm:block">
            {tr({ es: 'Precios', en: 'Pricing', ca: 'Preus' })}
          </a>
          <Link to={localPath('/profesores')} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900">
            {tr({ es: 'Soy profe', en: "I'm a teacher", ca: 'Sóc profe' })}
          </Link>
          {user ? (
            <Link to={localPath('/app')} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-slate-700">
              {tr({ es: 'Entrar', en: 'Open', ca: 'Entrar' })}
            </Link>
          ) : (
            <button onClick={onLogin} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-slate-700">
              {tr({ es: 'Entrar', en: 'Sign in', ca: 'Entrar' })}
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}

function PlanCard({ planId, featured, tr, onPick, busy }) {
  const plan = PLANS[planId]
  const isAnnual = planId === 'family_annual'
  const price = plan.price.toFixed(2).replace('.', ',')

  return (
    <div className={`relative flex flex-col rounded-2xl border p-6 ${
      featured
        ? 'border-violet-300 bg-white shadow-xl shadow-violet-200/50 ring-1 ring-violet-200'
        : 'border-slate-200 bg-white/70'
    }`}>
      {featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-violet-600 px-3 py-1 text-xs font-black text-white">
          {tr({ es: `Ahorras un ${SAVINGS.percent} %`, en: `Save ${SAVINGS.percent}%`, ca: `Estalvies un ${SAVINGS.percent} %` })}
        </span>
      )}

      <p className="text-sm font-bold uppercase tracking-wider text-slate-500">{tr(plan.label)}</p>

      <p className="mt-3 flex items-baseline gap-1.5">
        <span className="text-4xl font-black text-slate-900">{price} €</span>
        <span className="text-sm font-semibold text-slate-500">
          {isAnnual ? tr({ es: '/ año', en: '/ year', ca: '/ any' }) : tr({ es: '/ mes', en: '/ month', ca: '/ mes' })}
        </span>
      </p>

      <p className="mt-1 min-h-[20px] text-sm text-slate-500">
        {isAnnual
          ? tr({
              es: `Equivale a ${SAVINGS.equivalentMonthly.toFixed(2).replace('.', ',')} € al mes`,
              en: `Works out to €${SAVINGS.equivalentMonthly.toFixed(2)} a month`,
              ca: `Equival a ${SAVINGS.equivalentMonthly.toFixed(2).replace('.', ',')} € al mes`,
            })
          : tr({ es: 'Sin permanencia', en: 'No commitment', ca: 'Sense permanència' })}
      </p>

      <button
        onClick={() => onPick(planId)}
        disabled={busy}
        className={`mt-5 rounded-xl px-5 py-3 text-sm font-black transition-colors disabled:opacity-50 ${
          featured
            ? 'bg-violet-600 text-white hover:bg-violet-500'
            : 'bg-slate-900 text-white hover:bg-slate-700'
        }`}
      >
        {busy
          ? tr({ es: 'Un momento…', en: 'One moment…', ca: 'Un moment…' })
          : tr({ es: 'Empezar', en: 'Get started', ca: 'Començar' })}
      </button>
    </div>
  )
}

export default function Landing() {
  const { tr, localPath } = useLang()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showAuth, setShowAuth] = useState(false)
  const [busyPlan, setBusyPlan] = useState(null)
  // Plan que el usuario pulsó sin tener sesión: se retoma al terminar el login
  const [pendingPlan, setPendingPlan] = useState(null)
  // null = sin error; true = error genérico; string = detalle del servidor
  const [checkoutError, setCheckoutError] = useState(null)

  // Sin sesión no se puede cobrar: el checkout necesita saber a qué cuenta dar
  // el acceso. Mandarlo a Stripe y preguntarle la cuenta después es peor: paga
  // y no sabes de quién es el dinero.
  //
  // El plan se recuerda mientras se inicia sesión y el pago sigue solo al
  // terminar. Antes había que volver a pulsarlo, y quien acaba de decidir que
  // paga no debería tener que decidirlo dos veces.
  // El pago en sí, sin comprobar la sesión: startCheckout lee auth.currentUser,
  // que Firebase actualiza en cuanto el login resuelve. El `user` del contexto
  // tarda un render más, así que comprobarlo aquí justo después de entrar daría
  // un falso negativo y reabriría el modal en bucle.
  async function runCheckout(planId) {
    setBusyPlan(planId); setCheckoutError(null)
    try {
      await startCheckout(planId)
    } catch (err) {
      // `detail` solo llega cuando el operador ha puesto DEBUG_API en el
      // servidor; en operación normal se muestra el mensaje genérico.
      setCheckoutError(err?.detail ?? true)
      setBusyPlan(null)
    }
  }

  function pickPlan(planId) {
    if (!user) { setPendingPlan(planId); setShowAuth(true); return }
    runCheckout(planId)
  }

  // Qué hacer justo después de entrar, según por qué se abrió el login:
  // si venía de pulsar un plan, se sigue al pago; si no, se entra en la app.
  // Quedarse en la landing es lo único que no tiene sentido en ningún caso —
  // y es lo que hacía antes, dejando al niño mirando la página de ventas.
  function handleAuthSuccess() {
    setShowAuth(false)
    if (pendingPlan) {
      const plan = pendingPlan
      setPendingPlan(null)
      runCheckout(plan)
    } else {
      navigate(localPath('/app'))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-white text-slate-900">
      <SEOHead
        path="/"
        title={tr({
          es: 'Tuthor — Aprende jugando: el mismo concepto desde varios ángulos',
          en: 'Tuthor — Learn by playing: one concept, several angles',
          ca: 'Tuthor — Aprèn jugant: el mateix concepte des de diversos angles',
        })}
        description={tr({
          es: `Plataforma educativa para Primaria, ESO y Bachillerato. ${GAME_COUNT} juegos y ${EXAM_COUNT} exámenes en ${SUBJECT_COUNT} materias, con panel de seguimiento para padres. Desde ${SAVINGS.equivalentMonthly.toFixed(2).replace('.', ',')} € al mes.`,
          en: `Educational platform for primary and secondary school. ${GAME_COUNT} games and ${EXAM_COUNT} exams across ${SUBJECT_COUNT} subjects, with a tracking panel for parents. From €${SAVINGS.equivalentMonthly.toFixed(2)} a month.`,
          ca: `Plataforma educativa per a Primària, ESO i Batxillerat. ${GAME_COUNT} jocs i ${EXAM_COUNT} exàmens en ${SUBJECT_COUNT} matèries, amb panell de seguiment per a pares. Des de ${SAVINGS.equivalentMonthly.toFixed(2).replace('.', ',')} € al mes.`,
        })}
      />

      <Header onLogin={() => setShowAuth(true)} user={user} tr={tr} localPath={localPath} />

      {/* ── HERO ── */}
      <section className="mx-auto max-w-4xl px-5 pb-16 pt-16 text-center sm:pt-24">
        <p className="mb-5 inline-block rounded-full border border-violet-200 bg-violet-100/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-700">
          {tr({ es: 'Primaria · ESO · Bachillerato', en: 'Primary · Secondary', ca: 'Primària · ESO · Batxillerat' })}
        </p>

        <h1 className="text-4xl font-black leading-[1.1] tracking-tight sm:text-6xl">
          {tr({
            es: 'Tu hijo no necesita más horas. Necesita entenderlo de otra forma.',
            en: "Your child doesn't need more hours. They need to get it a different way.",
            ca: 'El teu fill no necessita més hores. Necessita entendre-ho d\'una altra manera.',
          })}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          {tr({
            es: 'Tuthor enseña cada concepto desde varios ángulos distintos, en formato de juego. Cuando una explicación no le encaja, la siguiente sí.',
            en: 'Tuthor teaches each concept from several different angles, as a game. When one explanation doesn\'t click, the next one does.',
            ca: 'Tuthor ensenya cada concepte des de diversos angles diferents, en format de joc. Quan una explicació no li encaixa, la següent sí.',
          })}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#precios" className="w-full rounded-xl bg-violet-600 px-7 py-4 text-base font-black text-white shadow-lg shadow-violet-300/60 transition-all hover:bg-violet-500 hover:shadow-xl sm:w-auto">
            {tr({ es: 'Empezar ahora', en: 'Get started', ca: 'Començar ara' })}
          </a>
          <a href="#como-funciona" className="w-full rounded-xl border border-slate-300 bg-white px-7 py-4 text-base font-bold text-slate-700 transition-colors hover:border-slate-400 sm:w-auto">
            {tr({ es: 'Ver cómo funciona', en: 'See how it works', ca: 'Veure com funciona' })}
          </a>
        </div>

        <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4">
          {[
            { n: GAME_COUNT, l: { es: 'juegos', en: 'games', ca: 'jocs' } },
            { n: EXAM_COUNT, l: { es: 'exámenes', en: 'exams', ca: 'exàmens' } },
            { n: SUBJECT_COUNT, l: { es: 'materias', en: 'subjects', ca: 'matèries' } },
          ].map(s => (
            <div key={s.l.es} className="rounded-2xl border border-slate-200 bg-white/70 py-5">
              <dt className="text-3xl font-black text-violet-600 tabular-nums">{s.n}</dt>
              <dd className="mt-0.5 text-sm font-semibold text-slate-500">{tr(s.l)}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── EL DIFERENCIAL ── */}
      <section id="como-funciona" className="scroll-mt-20 border-y border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="max-w-2xl text-3xl font-black leading-tight tracking-tight sm:text-4xl">
            {tr({
              es: 'El mismo concepto, tres juegos completamente distintos',
              en: 'One concept, three completely different games',
              ca: 'El mateix concepte, tres jocs completament diferents',
            })}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            {tr({
              es: 'A un chaval que no entiende una parábola dibujada en unos ejes puede hacérsele evidente parando un balón. No es el mismo ejercicio repintado: son mecánicas distintas que atacan la misma idea por sitios distintos.',
              en: "A kid who can't see a parabola drawn on axes might find it obvious when saving a football. It's not the same exercise repainted: they're different mechanics attacking the same idea from different places.",
              ca: 'A un noi que no entén una paràbola dibuixada en uns eixos se li pot fer evident aturant una pilota. No és el mateix exercici repintat: són mecàniques diferents que ataquen la mateixa idea per llocs diferents.',
            })}
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {ANGLES.map(angle => (
              <div key={angle.concept.es} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
                <p className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-violet-700">
                  <span className="text-lg">{angle.emoji}</span> {tr(angle.concept)}
                </p>
                <ul className="mt-5 space-y-4">
                  {angle.games.map((g, i) => (
                    <li key={g.name} className="flex gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-black text-white">
                        {i + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-slate-700">
                        <span className="font-bold text-slate-900">{g.name}</span>
                        {' — '}{tr(g.hook)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-slate-500">
            {tr({
              es: `Y así con el resto: ${GAME_COUNT} juegos repartidos en ${SUBJECT_COUNT} materias, cada uno con su forma de contar lo mismo.`,
              en: `And so on: ${GAME_COUNT} games across ${SUBJECT_COUNT} subjects, each with its own way of telling the same story.`,
              ca: `I així amb la resta: ${GAME_COUNT} jocs repartits en ${SUBJECT_COUNT} matèries, cadascun amb la seva manera d'explicar el mateix.`,
            })}
          </p>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            {tr({ es: 'Lo que nos dicen los padres', en: 'What parents tell us', ca: 'El que ens diuen els pares' })}
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {PAINS.map(p => (
              <div key={p.title.es} className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-2xl">{p.emoji}</p>
                <p className="mt-3 font-black text-slate-900">{tr(p.title)}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{tr(p.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PANEL ── */}
      <section className="border-y border-slate-200 bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="max-w-2xl text-3xl font-black leading-tight tracking-tight sm:text-4xl">
            {tr({ es: 'Tú ves los datos. Él ve un juego.', en: 'You see the data. They see a game.', ca: 'Tu veus les dades. Ell veu un joc.' })}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            {tr({
              es: 'Entras con tu Google y le pasas un código. Él lo escribe y juega, sin contraseñas que recordar ni que compartir. Tú entras con tu cuenta y ves qué ha hecho, cuánto tiempo y con qué resultado.',
              en: 'You sign in with Google and hand them a code. They type it and play, with no passwords to remember or share. You sign in with your account and see what they did, for how long and how well.',
              ca: 'Entres amb el teu Google i li passes un codi. Ell l\'escriu i juga, sense contrasenyes per recordar ni per compartir. Tu entres amb el teu compte i veus què ha fet, quant temps i amb quin resultat.',
            })}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { emoji: '🔑', t: { es: 'Sin cuenta para el niño', en: 'No account for the kid', ca: 'Sense compte per al nen' }, d: { es: 'Un código y dentro. Nunca ve tu email ni tu contraseña.', en: 'A code and they\'re in. They never see your email or password.', ca: 'Un codi i a dins. Mai no veu el teu email ni la teva contrasenya.' } },
              { emoji: '📊', t: { es: 'Progreso por materia', en: 'Progress by subject', ca: 'Progrés per matèria' }, d: { es: 'Qué toca, cuánto tiempo y qué nota saca en cada examen.', en: 'What they touch, how long and what they score on each exam.', ca: 'Què toca, quant temps i quina nota treu a cada examen.' } },
              { emoji: '🔒', t: { es: 'Él no toca nada', en: 'They can\'t touch anything', ca: 'Ell no toca res' }, d: { es: 'Ni el panel, ni los ajustes, ni la suscripción. Está bloqueado en el servidor.', en: 'Not the panel, the settings or the subscription. It\'s locked on the server.', ca: 'Ni el panell, ni els ajustos, ni la subscripció. Està bloquejat al servidor.' } },
            ].map(c => (
              <div key={c.t.es} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-2xl">{c.emoji}</p>
                <p className="mt-3 font-black">{tr(c.t)}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{tr(c.d)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRECIOS ── */}
      <section id="precios" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-center text-3xl font-black tracking-tight sm:text-4xl">
            {tr({ es: 'Un precio, todo dentro', en: 'One price, everything included', ca: 'Un preu, tot inclòs' })}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
            {tr({
              es: `Los ${GAME_COUNT} juegos, los ${EXAM_COUNT} exámenes y el panel de seguimiento. Sin extras ni niveles de suscripción.`,
              en: `All ${GAME_COUNT} games, all ${EXAM_COUNT} exams and the tracking panel. No add-ons, no tiers.`,
              ca: `Els ${GAME_COUNT} jocs, els ${EXAM_COUNT} exàmens i el panell de seguiment. Sense extres ni nivells de subscripció.`,
            })}
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            <PlanCard planId="family_annual" featured tr={tr} onPick={pickPlan} busy={busyPlan === 'family_annual'} />
            <PlanCard planId="family_monthly" tr={tr} onPick={pickPlan} busy={busyPlan === 'family_monthly'} />
          </div>

          {checkoutError && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
              <p>
                {tr({
                  es: 'No hemos podido abrir la pasarela de pago. Inténtalo de nuevo en un momento.',
                  en: "We couldn't open the payment page. Please try again in a moment.",
                  ca: 'No hem pogut obrir la passarel·la de pagament. Torna-ho a intentar en un moment.',
                })}
              </p>
              {typeof checkoutError === 'string' && (
                <p className="mt-2 font-mono text-xs break-words text-red-500">{checkoutError}</p>
              )}
            </div>
          )}

          <p className="mt-6 text-center text-sm text-slate-500">
            {tr({
              es: 'Cancela cuando quieras desde tu cuenta. Pago seguro con Stripe.',
              en: 'Cancel any time from your account. Secure payment via Stripe.',
              ca: 'Cancel·la quan vulguis des del teu compte. Pagament segur amb Stripe.',
            })}
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            {tr({ es: 'Preguntas frecuentes', en: 'Frequently asked questions', ca: 'Preguntes freqüents' })}
          </h2>
          <div className="mt-8 divide-y divide-slate-200">
            {FAQ.map(item => (
              <details key={item.q.es} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900">
                  {tr(item.q)}
                  <span className="shrink-0 text-xl text-slate-400 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{tr(item.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CIERRE ── */}
      <section className="bg-violet-600 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl px-5">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            {tr({ es: '¿Lo probamos?', en: 'Shall we try it?', ca: 'Ho provem?' })}
          </h2>
          <p className="mt-3 text-violet-100">
            {tr({
              es: 'Se tarda dos minutos en tenerlo jugando.',
              en: 'It takes two minutes to have them playing.',
              ca: 'Es triga dos minuts a tenir-lo jugant.',
            })}
          </p>
          <a href="#precios" className="mt-7 inline-block rounded-xl bg-white px-8 py-4 text-base font-black text-violet-700 transition-colors hover:bg-violet-50">
            {tr({ es: 'Ver los planes', en: 'See the plans', ca: 'Veure els plans' })}
          </a>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-sm text-slate-500 sm:flex-row">
          <p className="font-black text-slate-900">🦉 Tuthor</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:ml-auto">
            <Link to={localPath('/profesores')} className="transition-colors hover:text-slate-900">
              {tr({ es: 'Para profesores', en: 'For teachers', ca: 'Per a professors' })}
            </Link>
            <Link to={localPath('/info/juegos')} className="transition-colors hover:text-slate-900">
              {tr({ es: 'Los juegos', en: 'The games', ca: 'Els jocs' })}
            </Link>
            <Link to={localPath('/contacto')} className="transition-colors hover:text-slate-900">
              {tr({ es: 'Contacto', en: 'Contact', ca: 'Contacte' })}
            </Link>
            <Link to={localPath('/privacidad')} className="transition-colors hover:text-slate-900">
              {tr({ es: 'Privacidad', en: 'Privacy', ca: 'Privacitat' })}
            </Link>
          </nav>
        </div>
      </footer>

      {showAuth && (
        <AuthModal
          onClose={() => { setShowAuth(false); setPendingPlan(null) }}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  )
}
