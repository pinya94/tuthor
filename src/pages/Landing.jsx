import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { PLANS } from '../lib/access'
import { startCheckout } from '../lib/checkout'
import AuthModal from '../components/AuthModal'
import SEOHead from '../components/SEOHead'
import PreguntaDiaria from './PreguntaDiaria'

// Landing de venta. Estilo deliberadamente distinto al de dentro de la app
// (clara, editorial) para que se lea como lo que es: la página que explica el
// producto, no el producto.
//
// Sin cifras de catálogo a propósito ("23 juegos" envejece mal en los dos
// sentidos) y sin decir "tres" enfoques: el número de puertas a un concepto no
// está cerrado, y fijarlo en el copy obliga a mantenerlo a mano.
//
// El texto en español lo escribió el usuario; en/ca son traducción fiel. Al
// tocarlo, respetar el registro: la sección de metodología usa vocabulario
// técnico a propósito — es lo que transmite que detrás hay profesores.
const PRO_PRICE = PLANS.pro.price.toFixed(2).replace('.', ',')

// ── Fase de lanzamiento ──────────────────────────────────────────────────────
// A propósito NO promete una consecuencia concreta ("el precio sube el día
// X"): eso obligaría a subir el precio de verdad ese día o la promesa queda
// caducada y rozando publicidad engañosa (España regula esto explícitamente
// desde el RDL 24/2021 — el precio "antes" de un descuento tiene que ser
// real). Esto es más simple y sigue siendo honesto: solo delimita un periodo
// real de lanzamiento del producto. Se autodesactiva sola pasada la fecha —
// nunca debe quedar una cuenta atrás en negativo ni una promesa vieja en la
// web, así que ni el badge ni el countdown se muestran una vez pasado.
const LAUNCH_DEADLINE = new Date('2026-09-13T00:00:00+02:00')

function useLaunchCountdown() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])
  const msLeft = LAUNCH_DEADLINE - now
  if (msLeft <= 0) return null
  return {
    days: Math.floor(msLeft / 86_400_000),
    hours: Math.floor((msLeft % 86_400_000) / 3_600_000),
  }
}

function LaunchBadge({ tr, className = '' }) {
  const left = useLaunchCountdown()
  if (!left) return null
  // "dia" → "dies" en catalán, no "dias" (eso es español) — plural distinto,
  // no vale la misma regla de añadir una "s" que en es/en.
  const dias = left.days > 0
    ? tr({ es: `quedan ${left.days} día${left.days === 1 ? '' : 's'}`, en: `${left.days} day${left.days === 1 ? '' : 's'} left`, ca: `queden ${left.days} ${left.days === 1 ? 'dia' : 'dies'}` })
    : tr({ es: `quedan ${left.hours} h`, en: `${left.hours}h left`, ca: `queden ${left.hours} h` })
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1.5 text-xs font-black text-amber-800 ${className}`}>
      🚀 {tr({ es: 'Precio de lanzamiento', en: 'Launch price', ca: 'Preu de llançament' })} · {dias}
    </span>
  )
}

// CTA intermedio reutilizable: se coloca justo después de los dos momentos de
// la página con más intención (la demostración de metodología y el juego
// jugado de verdad), no al azar — es donde a alguien convencido le cuesta
// menos seguir. Por defecto lleva a #precios (informativo); con `onClick`
// hace otra cosa — normalmente entrar directo a la app, que es gratis y no
// necesita pasar por precios primero.
function MidPageCTA({ tr, text, dark = false, onClick }) {
  const cls = `mt-14 text-center`
  const btnCls = `inline-block rounded-xl px-7 py-3.5 text-sm font-black transition-all hover:scale-[1.02] ${
    dark ? 'bg-white text-violet-700 hover:bg-violet-50' : 'bg-violet-600 text-white shadow-md shadow-violet-200 hover:bg-violet-500'
  }`
  return (
    <div className={cls}>
      {onClick
        ? <button onClick={onClick} className={btnCls}>{tr(text)}</button>
        : <a href="#precios" className={btnCls}>{tr(text)}</a>}
    </div>
  )
}

// Los enfoques, en abstracto. Van antes que los ejemplos porque son la idea
// que hay que comprar; los juegos concretos vienen después como prueba.
const APPROACHES = [
  {
    key: { es: 'Deducir', en: 'Deduce', ca: 'Deduir' },
    body: {
      es: 'Resuelve un problema real anticipando el resultado.',
      en: 'Solve a real problem by anticipating the outcome.',
      ca: 'Resol un problema real anticipant el resultat.',
    },
  },
  {
    key: { es: 'Construir', en: 'Build', ca: 'Construir' },
    body: {
      es: 'Manipula los elementos y ve en directo cómo cambia la regla.',
      en: 'Handle the parts and watch the rule change live.',
      ca: 'Manipula els elements i veu en directe com canvia la regla.',
    },
  },
  {
    key: { es: 'Visualizar', en: 'Visualise', ca: 'Visualitzar' },
    body: {
      es: 'Asocia la teoría a un dibujo o a un patrón intuitivo.',
      en: 'Tie the theory to a drawing or an intuitive pattern.',
      ca: 'Associa la teoria a un dibuix o a un patró intuïtiu.',
    },
  },
]

// Metodología aplicada: cada juego con su nombre pedagógico. El titular es la
// competencia que se trabaja, no el nombre comercial del juego — a un padre
// "El Portero" no le dice nada, "inferencia y deducción funcional" sí.
const ANGLES = [
  {
    concept: { es: 'Funciones y representación gráfica', en: 'Functions and graphing', ca: 'Funcions i representació gràfica' },
    emoji: '📈',
    games: [
      {
        angle: { es: 'Inferencia y deducción funcional', en: 'Functional inference and deduction', ca: 'Inferència i deducció funcional' },
        name: 'El Portero',
        img: '/games/capturas/portero.webp',
        body: {
          es: 'A partir de la expresión algebraica de la función, el alumno debe predecir y anticipar la trayectoria de la curva para resolver una situación de interceptación vectorial en tiempo real.',
          en: 'From the algebraic expression of the function, the pupil must predict and anticipate the path of the curve to resolve a real-time vector interception.',
          ca: "A partir de l'expressió algebraica de la funció, l'alumne ha de predir i anticipar la trajectòria de la corba per resoldre una situació d'interceptació vectorial en temps real.",
        },
      },
      {
        angle: { es: 'Manipulación paramétrica e interactiva', en: 'Interactive parametric manipulation', ca: 'Manipulació paramètrica i interactiva' },
        name: 'Caza la Función',
        img: '/games/capturas/caza-funcion.webp',
        body: {
          es: 'Al modificar los coeficientes y variables independientes uno a uno, observa de manera inmediata cómo se alteran la pendiente, la concavidad y la traslación de la gráfica en el plano cartesiano.',
          en: 'By changing the coefficients and independent variables one at a time, they see immediately how the slope, concavity and translation of the graph shift across the Cartesian plane.',
          ca: 'En modificar els coeficients i variables independents un a un, observa de manera immediata com s\'alteren el pendent, la concavitat i la translació de la gràfica en el pla cartesià.',
        },
      },
      {
        angle: { es: 'Geometría analítica y reconocimiento espacial', en: 'Analytic geometry and spatial recognition', ca: 'Geometria analítica i reconeixement espacial' },
        name: 'Trayectoria',
        img: '/games/capturas/trayectoria.webp',
        body: {
          es: 'A través de la resolución de obstáculos en un sistema de coordenadas, el estudiante identifica la ecuación matemática idónea que conecta distintos puntos del espacio continuo.',
          en: 'By clearing obstacles within a coordinate system, the student identifies the right mathematical equation connecting different points of continuous space.',
          ca: "Mitjançant la resolució d'obstacles en un sistema de coordenades, l'estudiant identifica l'equació matemàtica idònia que connecta diferents punts de l'espai continu.",
        },
      },
    ],
  },
  {
    concept: { es: 'Aritmética y cálculo operacional', en: 'Arithmetic and operational calculation', ca: 'Aritmètica i càlcul operacional' },
    emoji: '➕',
    games: [
      {
        angle: { es: 'Modelado sintético y descomposición numérica', en: 'Synthetic modelling and number decomposition', ca: 'Modelatge sintètic i descomposició numèrica' },
        name: 'Acércate',
        img: '/games/capturas/acercate.webp',
        body: {
          es: 'En lugar de resolver un algoritmo predeterminado, el alumno realiza la descomposición inversa de una cifra objetivo planteando sus propios términos y operadores matemáticos.',
          en: 'Instead of working through a set algorithm, the pupil reverse-decomposes a target figure by proposing their own terms and mathematical operators.',
          ca: "En lloc de resoldre un algoritme predeterminat, l'alumne fa la descomposició inversa d'una xifra objectiu plantejant els seus propis termes i operadors matemàtics.",
        },
      },
      {
        angle: { es: 'Lógica secuencial y resolución de algoritmos', en: 'Sequential logic and algorithm solving', ca: "Lògica seqüencial i resolució d'algoritmes" },
        name: 'NumPath',
        img: '/games/capturas/numpath.webp',
        body: {
          es: 'Mediante una estructura de grafos y laberintos lógicos, cada nodo exige la resolución de una operación aritmética cuya precisión condiciona la viabilidad de la ruta.',
          en: 'Through a structure of graphs and logical mazes, each node demands an arithmetic operation whose accuracy determines whether the route remains viable.',
          ca: "Mitjançant una estructura de grafs i laberints lògics, cada node exigeix la resolució d'una operació aritmètica la precisió de la qual condiciona la viabilitat de la ruta.",
        },
      },
      {
        angle: { es: 'Mecanización, consolidación y evaluación', en: 'Drilling, consolidation and assessment', ca: 'Mecanització, consolidació i avaluació' },
        name: { es: 'Examen de sumas', en: 'Sums exam', ca: 'Examen de sumes' },
        img: '/games/capturas/examen-sumas.webp',
        body: {
          es: 'Evaluación formativa orientada a la consolidación del cálculo mental autómata, con corrección procedimental explicada al instante para fijar el aprendizaje sin generar ansiedad académica.',
          en: 'Formative assessment aimed at consolidating automatic mental arithmetic, with step-by-step corrections explained instantly to fix learning without creating academic anxiety.',
          ca: "Avaluació formativa orientada a la consolidació del càlcul mental automàtic, amb correcció procedimental explicada a l'instant per fixar l'aprenentatge sense generar ansietat acadèmica.",
        },
      },
    ],
  },
]

const SUBJECTS = {
  es: 'Matemáticas, Lengua, Historia, Geografía, Física, Química, Biología, Geología, Inglés, Música, Economía y Vida Práctica.',
  en: 'Maths, Language, History, Geography, Physics, Chemistry, Biology, Geology, English, Music, Economics and Life Skills.',
  ca: 'Matemàtiques, Llengua, Història, Geografia, Física, Química, Biologia, Geologia, Anglès, Música, Economia i Vida Pràctica.',
}

const PAINS = [
  {
    emoji: '⏱️',
    title: { es: '«En clase van muy rápido»', en: '"Class moves too fast"', ca: '«A classe van molt de pressa»' },
    body: {
      es: 'Un profesor con treinta alumnos no puede pararse a buscarle otra explicación a cada uno. No es culpa suya: no hay tiempo. En Tuthor el tema espera lo que tu hijo necesite.',
      en: 'A teacher with thirty pupils cannot stop to find a different explanation for each one. It is not their fault: there is no time. Here the topic waits as long as your child needs.',
      ca: 'Un professor amb trenta alumnes no es pot aturar a buscar una altra explicació per a cadascun. No és culpa seva: no hi ha temps. A Tuthor el tema espera el que el teu fill necessiti.',
    },
  },
  {
    emoji: '😑',
    title: { es: '«Se aburre a los cinco minutos»', en: '"They get bored in five minutes"', ca: "«S'avorreix als cinc minuts»" },
    body: {
      es: 'Partidas cortas, monedas, rachas y rankings. La misma mecánica que le engancha a los videojuegos, puesta a trabajar a favor de sus notas.',
      en: 'Short rounds, coins, streaks and rankings. The same mechanics that hook them on video games, put to work in favour of their grades.',
      ca: 'Partides curtes, monedes, ratxes i rànquings. La mateixa mecànica que l\'enganxa als videojocs, posada a treballar a favor de les seves notes.',
    },
  },
  {
    emoji: '📉',
    title: { es: '«Estudia y suspende igual»', en: '"They study and still fail"', ca: '«Estudia i suspèn igual»' },
    body: {
      es: 'Casi nunca es falta de horas; es que no lo ha entendido desde el principio. Releer lo mismo otra vez no arregla la duda. Contárselo de otra forma, sí.',
      en: 'It is rarely a lack of hours; they did not understand it in the first place. Re-reading the same thing does not clear the doubt. Being told another way does.',
      ca: "Gairebé mai és falta d'hores; és que no ho ha entès des del principi. Rellegir el mateix no arregla el dubte. Explicar-l'hi d'una altra manera, sí.",
    },
  },
  {
    emoji: '💸',
    title: { es: '«Una academia cuesta 150 € al mes»', en: '"Tutoring costs €150 a month"', ca: '«Una acadèmia costa 150 € al mes»' },
    body: {
      es: `Y requiere desplazamientos y adaptarse al ritmo del grupo. Tuthor es gratis, a la hora que él quiera y enfocado en lo que flojea — y si quieres el panel de seguimiento completo y sin publicidad, Pro son solo ${PRO_PRICE} € al mes.`,
      en: `And it means travelling and fitting the group's pace. Tuthor is free, whenever they want and focused on where they struggle — and if you want the full tracking panel with no ads, Pro is just €${PRO_PRICE} a month.`,
      ca: `I requereix desplaçaments i adaptar-se al ritme del grup. Tuthor és gratis, a l'hora que ell vulgui i enfocat en el que fluixeja — i si vols el panell de seguiment complet i sense publicitat, Pro són només ${PRO_PRICE} € al mes.`,
    },
  },
]

const PANEL = [
  {
    emoji: '🔑',
    title: { es: 'Sin cuenta ni email para el niño', en: 'No account or email for the child', ca: 'Sense compte ni email per al nen' },
    body: {
      es: 'Le pasas un código corto, lo escribe y entra. No tiene que recordar ni compartir contraseñas ni correos.',
      en: 'You give them a short code, they type it and they are in. Nothing to remember and no passwords or emails to share.',
      ca: 'Li passes un codi curt, l\'escriu i entra. No ha de recordar ni compartir contrasenyes ni correus.',
    },
  },
  {
    emoji: '📊',
    title: { es: 'Progreso por materia en tiempo real', en: 'Progress by subject in real time', ca: 'Progrés per matèria en temps real' },
    body: {
      es: 'Consulta qué temas ha trabajado, cuánto tiempo le ha dedicado y las notas que saca en sus exámenes.',
      en: 'Check which topics they have worked on, how long they spent and the grades they get in their exams.',
      ca: 'Consulta quins temes ha treballat, quant temps hi ha dedicat i les notes que treu als seus exàmens.',
    },
  },
  {
    emoji: '🔒',
    title: { es: 'Control absoluto', en: 'Full control', ca: 'Control absolut' },
    body: {
      es: 'El niño no puede acceder a los ajustes, al panel de datos ni a la suscripción. Todo queda bloqueado desde el servidor.',
      en: 'The child cannot reach the settings, the data panel or the subscription. It is all locked down on the server.',
      ca: 'El nen no pot accedir als ajustos, al panell de dades ni a la subscripció. Tot queda bloquejat des del servidor.',
    },
  },
]

const FAQ = [
  {
    q: { es: '¿Mi hijo necesita un email o una contraseña?', en: 'Does my child need an email or a password?', ca: 'El meu fill necessita un email o una contrasenya?' },
    a: {
      es: 'No. Tú creas la cuenta con tu Google y a él solo le das un código de acceso único.',
      en: 'No. You create the account with your Google and all they get is a single access code.',
      ca: 'No. Tu crees el compte amb el teu Google i a ell només li dones un codi d\'accés únic.',
    },
  },
  {
    q: { es: '¿Para qué edades sirve?', en: 'What ages is it for?', ca: 'Per a quines edats serveix?' },
    a: {
      es: 'Cubre contenidos adaptados desde Educación Primaria hasta Bachillerato.',
      en: 'It covers content adapted from primary school through to sixth form.',
      ca: 'Cobreix continguts adaptats des d\'Educació Primària fins a Batxillerat.',
    },
  },
  {
    q: { es: '¿Vale para varios hermanos?', en: 'Does it work for several siblings?', ca: 'Serveix per a diversos germans?' },
    a: {
      es: 'Puedes gestionar su progreso desde tu mismo panel de control.',
      en: 'You can follow their progress from your own control panel.',
      ca: 'Pots gestionar el seu progrés des del teu mateix panell de control.',
    },
  },
  {
    q: { es: '¿Puedo cancelar cuando quiera?', en: 'Can I cancel whenever I want?', ca: 'Puc cancel·lar quan vulgui?' },
    a: {
      es: 'Sí, sin llamadas ni trámites complicados. Lo haces en un clic desde tus ajustes.',
      en: 'Yes, with no phone calls or paperwork. One click from your settings.',
      ca: 'Sí, sense trucades ni tràmits complicats. Ho fas amb un clic des dels teus ajustos.',
    },
  },
]

// Mismos tres idiomas y banderas que el LangSelector del Navbar de dentro de
// la app (src/components/Navbar.jsx) — duplicado a propósito, no compartido:
// la landing tiene su propio header con estilo claro y no depende del resto.
const LANDING_LANGS = [
  { code: 'es', flag: 'es', label: 'Español' },
  { code: 'en', flag: 'gb', label: 'English' },
  { code: 'ca', flag: 'ad', label: 'Català' },
]

function LandingLangSwitcher({ lang, switchLang }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = LANDING_LANGS.find(l => l.code === lang) || LANDING_LANGS[0]

  useEffect(() => {
    if (!open) return
    const close = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
      >
        <img src={`https://flagcdn.com/w40/${current.flag}.png`} alt={current.label} width={20} height={15} className="rounded-sm" />
        <svg className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl z-50">
          {LANDING_LANGS.map(l => (
            <button
              key={l.code}
              onClick={() => { switchLang(l.code); setOpen(false) }}
              className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm transition-colors ${
                l.code === lang ? 'bg-violet-50 text-violet-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <img src={`https://flagcdn.com/w40/${l.flag}.png`} alt={l.label} width={20} height={15} className="rounded-sm" />
              <span className="font-medium">{l.label}</span>
              {l.code === lang && <span className="ml-auto text-xs text-violet-500">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Header({ onLogin, user, tr, localPath, lang, switchLang }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3.5">
        <Link to={localPath('/')} className="flex items-center gap-2 font-black text-lg text-slate-900">
          <img src="/favicon.svg" alt="Tuthor" className="h-6 w-6" /> Tuthor
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
          <LandingLangSwitcher lang={lang} switchLang={switchLang} />
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

// Un solo plan (Pro) desde que el producto en sí es gratis: no hay nada que
// comparar entre mensual/anual, así que la tarjeta pasa de "elige un precio"
// a "esto es lo que compra tu suscripción".
const PRO_FEATURES = [
  { es: 'Sin publicidad', en: 'No ads', ca: 'Sense publicitat' },
  { es: 'Panel de seguimiento completo (por juego, por materia)', en: 'Full tracking panel (by game, by subject)', ca: 'Panell de seguiment complet (per joc, per matèria)' },
  { es: 'Apoyas que sigamos haciendo contenido nuevo', en: "You help us keep making new content", ca: 'Ajudes que seguim fent contingut nou' },
]

function PlanCard({ tr, onPick, busy }) {
  const price = PLANS.pro.price.toFixed(2).replace('.', ',')

  return (
    <div className="relative flex flex-col rounded-2xl border border-violet-300 bg-white p-6 shadow-xl shadow-violet-200/50 ring-1 ring-violet-200">
      <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Pro</p>

      <p className="mt-3 flex items-baseline gap-1.5">
        <span className="text-4xl font-black text-slate-900">{price} €</span>
        <span className="text-sm font-semibold text-slate-500">{tr({ es: '/ mes', en: '/ month', ca: '/ mes' })}</span>
      </p>
      <p className="mt-1 text-sm text-slate-500">{tr({ es: 'Sin permanencia', en: 'No commitment', ca: 'Sense permanència' })}</p>

      <ul className="mt-4 space-y-2">
        {PRO_FEATURES.map(f => (
          <li key={f.es} className="flex items-start gap-2 text-sm text-slate-600">
            <span className="text-violet-600 font-bold">✓</span>{tr(f)}
          </li>
        ))}
      </ul>

      <button
        onClick={() => onPick('pro')}
        disabled={busy}
        className="mt-5 rounded-xl bg-violet-600 px-5 py-3 text-sm font-black text-white transition-colors hover:bg-violet-500 disabled:opacity-50"
      >
        {busy
          ? tr({ es: 'Un momento…', en: 'One moment…', ca: 'Un moment…' })
          : tr({ es: 'Hazte Pro', en: 'Go Pro', ca: 'Fes-te Pro' })}
      </button>
    </div>
  )
}

export default function Landing() {
  const { tr, localPath, lang, switchLang } = useLang()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showAuth, setShowAuth] = useState(false)
  const [busyPlan, setBusyPlan] = useState(null)
  // Plan que el usuario pulsó sin tener sesión: se retoma al terminar el login
  const [pendingPlan, setPendingPlan] = useState(null)
  // null = sin error; true = error genérico; string = detalle del servidor
  const [checkoutError, setCheckoutError] = useState(null)

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

  // Sin sesión no se puede cobrar: el checkout necesita saber a qué cuenta dar
  // el acceso. Mandarlo a Stripe y preguntarle la cuenta después es peor: paga
  // y no sabes de quién es el dinero.
  function pickPlan(planId) {
    if (!user) { setPendingPlan(planId); setShowAuth(true); return }
    runCheckout(planId)
  }

  // El producto es gratis: la mayoría de los CTA de la landing ya no tienen
  // que llevar a #precios, tienen que meter a la persona en la app cuanto
  // antes — precios queda para quien lo busca explícitamente (el enlace del
  // header y la sección en sí). Sin pendingPlan, handleAuthSuccess ya
  // navega a /app solo al terminar el login.
  function startFree() {
    if (!user) { setShowAuth(true); return }
    navigate(localPath('/app'))
  }

  // Qué hacer justo después de entrar, según por qué se abrió el login: si
  // venía de pulsar un plan, se sigue al pago; si no, se entra en la app.
  // Quedarse en la landing es lo único que no tiene sentido en ningún caso.
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
          es: 'La misma clase, explicada de todas las formas que hacen falta',
          en: 'The same class, explained every way it takes',
          ca: 'La mateixa classe, explicada de totes les maneres que calgui',
        })}
        description={tr({
          es: `Plataforma educativa gratuita para Primaria, ESO y Bachillerato. Un equipo de profesores plantea cada concepto desde distintos puntos de vista. Pro (sin publicidad y panel de seguimiento completo) desde ${PRO_PRICE} € al mes.`,
          en: `Free educational platform for primary and secondary school. A team of teachers frames each concept from different points of view. Pro (no ads, full tracking panel) from €${PRO_PRICE} a month.`,
          ca: `Plataforma educativa gratuïta per a Primària, ESO i Batxillerat. Un equip de professors planteja cada concepte des de diferents punts de vista. Pro (sense publicitat i panell de seguiment complet) des de ${PRO_PRICE} € al mes.`,
        })}
      />

      <Header onLogin={() => setShowAuth(true)} user={user} tr={tr} localPath={localPath} lang={lang} switchLang={switchLang} />

      {/* ── HERO ── */}
      <section className="mx-auto max-w-4xl px-5 pb-16 pt-16 text-center sm:pt-24">
        <p className="mb-5 inline-block rounded-full border border-violet-200 bg-violet-100/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-700">
          {tr({ es: 'Primaria · ESO · Bachillerato', en: 'Primary · Secondary · Sixth form', ca: 'Primària · ESO · Batxillerat' })}
        </p>

        <h1 className="text-4xl font-black leading-[1.1] tracking-tight sm:text-6xl">
          {tr({
            es: 'La misma clase, explicada de todas las formas que hacen falta.',
            en: 'The same class, explained every way it takes.',
            ca: 'La mateixa classe, explicada de totes les maneres que calgui.',
          })}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          {tr({
            es: 'En una clase con treinta alumnos hay un temario que terminar y un solo ritmo. No hay tiempo para buscar distintas formas de explicar lo mismo. En Tuthor sí.',
            en: 'A class of thirty pupils has a syllabus to finish and a single pace. There is no time to look for different ways of explaining the same thing. Here there is.',
            ca: 'En una classe amb trenta alumnes hi ha un temari per acabar i un sol ritme. No hi ha temps per buscar diferents formes d\'explicar el mateix. A Tuthor sí.',
          })}
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
          {tr({
            es: 'Un equipo de profesores plantea cada concepto desde distintos puntos de vista. Si a tu hijo no le entra por la deducción, le entra por la práctica o por la imagen. No paramos hasta dar con la puerta que le encaja.',
            en: 'A team of teachers frames each concept from different points of view. If deduction is not your child\'s way in, practice or imagery will be. We do not stop until we find the door that fits.',
            ca: 'Un equip de professors planteja cada concepte des de diferents punts de vista. Si al teu fill no li entra per la deducció, li entra per la pràctica o per la imatge. No parem fins a trobar la porta que li encaixa.',
          })}
        </p>

        <div className="mt-7">
          <LaunchBadge tr={tr} />
        </div>

        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button onClick={startFree} className="w-full rounded-xl bg-violet-600 px-7 py-4 text-base font-black text-white shadow-lg shadow-violet-300/60 transition-all hover:bg-violet-500 hover:shadow-xl sm:w-auto">
            {tr({ es: 'Empezar gratis', en: 'Start for free', ca: 'Començar gratis' })}
          </button>
          <a href="#como-funciona" className="w-full rounded-xl border border-slate-300 bg-white px-7 py-4 text-base font-bold text-slate-700 transition-colors hover:border-slate-400 sm:w-auto">
            {tr({ es: 'Ver cómo funciona', en: 'See how it works', ca: 'Veure com funciona' })}
          </a>
        </div>
      </section>

      {/* ── LOS ENFOQUES, EN ABSTRACTO ── */}
      <section id="como-funciona" className="scroll-mt-20 border-y border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-4xl">
            {tr({
              es: 'Diferentes formas de entender lo mismo. Ninguna se parece a un libro de texto.',
              en: 'Different ways of understanding the same thing. None of them looks like a textbook.',
              ca: 'Diferents formes d\'entendre el mateix. Cap s\'assembla a un llibre de text.',
            })}
          </h2>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            {tr({
              es: 'Repetir la misma explicación más despacio o más alto no es una explicación nueva. Es volver a tropezar con la misma piedra. En Tuthor cambiamos el enfoque para que el concepto haga clic:',
              en: 'Repeating the same explanation more slowly or more loudly is not a new explanation. It is tripping over the same stone again. Here we change the approach so the concept clicks:',
              ca: 'Repetir la mateixa explicació més a poc a poc o més fort no és una explicació nova. És tornar a ensopegar amb la mateixa pedra. A Tuthor canviem l\'enfocament perquè el concepte faci clic:',
            })}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {APPROACHES.map(a => (
              <div key={a.key.es} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
                <p className="text-base font-black text-violet-700">{tr(a.key)}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{tr(a.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── METODOLOGÍA APLICADA ── */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            {tr({
              es: 'Así se aprende en Tuthor',
              en: 'This is how learning works in Tuthor',
              ca: 'Així s\'aprèn a Tuthor',
            })}
          </h2>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-violet-600">
            {tr({ es: 'Metodología aplicada', en: 'Methodology in practice', ca: 'Metodologia aplicada' })}
          </p>

          <div className="mt-12 space-y-14">
            {ANGLES.map(angle => (
              <div key={angle.concept.es}>
                <p className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-violet-700">
                  <span className="text-lg">{angle.emoji}</span> {tr(angle.concept)}
                </p>

                <div className="mt-5 grid gap-5 sm:grid-cols-3">
                  {angle.games.map(g => (
                    <figure key={typeof g.name === 'string' ? g.name : g.name.es}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                      {/* Altura fija y recorte por arriba: las capturas vienen
                          con proporciones distintas y sin esto la fila queda
                          como una sierra. loading="lazy" porque están abajo. */}
                      <img
                        src={g.img}
                        alt={`${typeof g.name === 'string' ? g.name : tr(g.name)} — ${tr(g.angle)}`}
                        loading="lazy"
                        className="h-44 w-full bg-slate-900 object-cover object-top"
                      />
                      <figcaption className="p-5">
                        <p className="text-base font-black leading-tight text-slate-900">{tr(g.angle)}</p>
                        <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-violet-600">
                          {typeof g.name === 'string' ? g.name : tr(g.name)}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-slate-600">{tr(g.body)}</p>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <MidPageCTA tr={tr} text={{ es: 'Ver los planes →', en: 'See the plans →', ca: 'Veure els plans →' }} />
        </div>
      </section>

      {/* ── TODAS LAS MATERIAS ── */}
      <section className="border-y border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            {tr({
              es: 'Todas las materias que necesita en un solo lugar',
              en: 'Every subject they need, in one place',
              ca: 'Totes les matèries que necessita en un sol lloc',
            })}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            {tr({
              es: 'No hay una sola forma correcta de aprender. Hay mentes que entienden a la primera con un dibujo, otras con un número y otras mediante la deducción. Lo importante no es imponer un método, sino que tu hijo tenga opciones para elegir el suyo.',
              en: 'There is no single correct way to learn. Some minds get it straight away with a drawing, others with a number, others through deduction. What matters is not imposing a method, but giving your child options so they can pick their own.',
              ca: 'No hi ha una sola forma correcta d\'aprendre. Hi ha ments que entenen a la primera amb un dibuix, d\'altres amb un número i d\'altres mitjançant la deducció. L\'important no és imposar un mètode, sinó que el teu fill tingui opcions per triar el seu.',
            })}
          </p>

          <p className="mx-auto mt-7 max-w-2xl rounded-2xl border border-violet-200 bg-violet-50/70 px-6 py-4 text-sm font-semibold text-slate-700">
            <span className="text-violet-700">{tr({ es: 'Disponible para:', en: 'Available for:', ca: 'Disponible per a:' })}</span>{' '}
            {tr(SUBJECTS)}
          </p>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            {tr({
              es: 'Lo que nos dicen los padres (y cómo lo resolvemos)',
              en: 'What parents tell us (and how we solve it)',
              ca: 'El que ens diuen els pares (i com ho resolem)',
            })}
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
            {tr({
              es: 'Tú ves los datos. Él siente que solo está jugando.',
              en: 'You see the data. They feel like they are just playing.',
              ca: 'Tu veus les dades. Ell sent que només està jugant.',
            })}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            {tr({
              es: 'Diseñado para que la tecnología no sea un dolor de cabeza ni un riesgo en casa:',
              en: 'Built so the technology is neither a headache nor a risk at home:',
              ca: 'Dissenyat perquè la tecnologia no sigui un mal de cap ni un risc a casa:',
            })}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {PANEL.map(c => (
              <div key={c.title.es} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-2xl">{c.emoji}</p>
                <p className="mt-3 font-black">{tr(c.title)}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{tr(c.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRUÉBALO ── */}
      {/* El único juego del catálogo que funciona sin sesión y sin muro (ver
          requiresAccess() en lib/paidRoutes.js) — de ahí que sea el único
          sitio de toda la landing donde se puede jugar de verdad en vez de
          solo leer sobre el producto. Fondo oscuro a propósito: la tarjeta
          del juego usa colores translúcidos pensados para el tema oscuro de
          la app (bg-white/5, texto blanco); sobre el fondo claro del resto
          de la landing se leería mal. */}
      <section className="border-y border-slate-200 bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-2xl px-5 text-center">
          <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl">
            {tr({
              es: 'Pruébalo tú mismo, sin registrarte',
              en: 'Try it yourself, no sign-up needed',
              ca: 'Prova-ho tu mateix, sense registrar-te',
            })}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            {tr({
              es: 'Este es el reto diario de hoy — el mismo que ve cualquier alumno. Contesta y compruébalo.',
              en: "This is today's actual daily challenge — the same one any student sees. Answer it and see for yourself.",
              ca: 'Aquest és el repte diari d\'avui — el mateix que veu qualsevol alumne. Respon-lo i comprova-ho.',
            })}
          </p>
        </div>
        <div className="mt-10 px-5">
          <PreguntaDiaria embedded />
        </div>
        <div className="px-5">
          <MidPageCTA tr={tr} dark onClick={startFree} text={{ es: '¿Le ha gustado? Empieza gratis →', en: 'Did they like it? Start for free →', ca: 'Li ha agradat? Comença gratis →' }} />
        </div>
      </section>

      {/* ── PRECIOS ── */}
      <section id="precios" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-3xl px-5">
          <div className="mb-5 flex justify-center">
            <LaunchBadge tr={tr} />
          </div>
          <h2 className="text-center text-3xl font-black tracking-tight sm:text-4xl">
            {tr({ es: 'El panel completo, sin publicidad.', en: 'The full panel, ad-free.', ca: 'El panell complet, sense publicitat.' })}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
            {tr({
              es: 'Todos los juegos y todos los exámenes son gratis para cualquiera, sin cuenta ni tarjeta. Pro añade el desglose completo de seguimiento (por juego, por materia, historial de monedas) y quita la tarjeta de apoyo. Con todas las actualizaciones futuras incluidas.',
              en: 'Every game and every exam is free for anyone, no account or card needed. Pro adds the full tracking breakdown (by game, by subject, coin history) and removes the support card. Every future update included.',
              ca: 'Tots els jocs i tots els exàmens són gratis per a qualsevol, sense compte ni targeta. Pro afegeix el desglossament complet de seguiment (per joc, per matèria, historial de monedes) i treu la targeta de suport. Amb totes les actualitzacions futures incloses.',
            })}
          </p>

          <div className="mt-12 mx-auto max-w-sm">
            <PlanCard tr={tr} onPick={pickPlan} busy={busyPlan === 'pro'} />
          </div>

          <p className="mx-auto mt-6 max-w-md text-center text-sm text-slate-500">
            {tr({
              es: 'No hace falta Pro para jugar: se compra cuando ya estás dentro de la app, desde tu perfil.',
              en: "You don't need Pro to play: it's bought once you're already inside the app, from your profile.",
              ca: 'No cal Pro per jugar: es compra quan ja ets dins de l\'app, des del teu perfil.',
            })}
          </p>

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
              es: 'Cancela cuando quieras desde tu perfil con un solo clic. Pago 100 % seguro procesado por Stripe.',
              en: 'Cancel whenever you like from your profile in one click. Payment processed securely by Stripe.',
              ca: 'Cancel·la quan vulguis des del teu perfil amb un sol clic. Pagament 100 % segur processat per Stripe.',
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
              es: 'Se tarda menos de dos minutos en configurarlo y tenerle aprendiendo.',
              en: 'It takes less than two minutes to set up and have them learning.',
              ca: 'Es triga menys de dos minuts a configurar-ho i tenir-lo aprenent.',
            })}
          </p>
          <button onClick={startFree} className="mt-7 inline-block rounded-xl bg-white px-8 py-4 text-base font-black text-violet-700 transition-colors hover:bg-violet-50">
            {tr({ es: 'Empezar gratis', en: 'Start for free', ca: 'Començar gratis' })}
          </button>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-sm text-slate-500 sm:flex-row">
          <p className="flex items-center gap-1.5 font-black text-slate-900"><img src="/favicon.svg" alt="Tuthor" className="h-4 w-4" /> Tuthor</p>
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
