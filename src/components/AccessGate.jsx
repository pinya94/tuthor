import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { loadAccessCached, PLANS, annualSavings } from '../lib/access'
import { requiresAccess, normalizePath } from '../lib/paidRoutes'
import AuthModal from './AuthModal'
import SEOHead from './SEOHead'
import QuizSchema from './QuizSchema'
// resolveMeta vive en scripts/ porque lo usa el prerender (Node) y los tests
// de invariantes, pero es un módulo puro (sin I/O) — se puede importar aquí
// igual que cualquier otro módulo de src/. Es la MISMA fuente que ya usa el
// prerender para title/desc, así que no hay dos ideas distintas de la meta
// de una URL.
import { resolveMeta } from '../../scripts/seoMeta.mjs'

// Puerta única del muro de pago. Se monta una sola vez alrededor de las rutas
// (App.jsx) en lugar de envolver ruta por ruta: las de juegos y exámenes están
// repartidas por todo el fichero y anidarlas obligaría a reordenarlas, que es
// mucho movimiento para algo que se decide igual mirando la ruta actual.
//
// Qué es de pago lo dice requiresAccess() en lib/paidRoutes.js, no este
// componente. Aquí solo se decide qué enseñar.
//
// Este muro no es una barrera criptográfica: el contenido va en el bundle de
// JS y quien sepa abrir las devtools entra igual. Existe para el 99 % que no
// lo hará. Lo que sí está protegido de verdad son los DATOS — firestore.rules
// impide escribir los campos que conceden acceso.

const SAVINGS = annualSavings()

function Locked({ onLogin, user }) {
  const { tr, localPath } = useLang()
  const monthly = PLANS.family_monthly.price.toFixed(2).replace('.', ',')
  const annual = PLANS.family_annual.price.toFixed(2).replace('.', ',')

  return (
    <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-lg flex-col items-center justify-center px-5 py-12 text-center">
      <span className="mb-5 text-5xl">🔒</span>

      <h1 className="text-2xl font-black leading-tight text-white sm:text-3xl">
        {tr({
          es: 'Esto es parte de la suscripción',
          en: 'This is part of the subscription',
          ca: 'Això forma part de la subscripció',
        })}
      </h1>

      <p className="mt-3 text-sm leading-relaxed text-white/50">
        {tr({
          es: 'Los juegos y los exámenes van con el plan. Los temarios y las fichas siguen siendo gratis para todo el mundo.',
          en: 'Games and exams come with the plan. Study notes and guides stay free for everyone.',
          ca: 'Els jocs i els exàmens van amb el pla. Els temaris i les fitxes continuen sent gratis per a tothom.',
        })}
      </p>

      <div className="mt-7 w-full rounded-2xl border border-violet-500/25 bg-violet-500/5 p-5">
        <p className="text-white font-black text-lg">
          {annual} € <span className="text-sm font-semibold text-white/40">
            {tr({ es: '/ año', en: '/ year', ca: '/ any' })}
          </span>
        </p>
        <p className="mt-0.5 text-xs text-white/40">
          {tr({
            es: `o ${monthly} € al mes · ahorras un ${SAVINGS.percent} % con el anual`,
            en: `or €${monthly} a month · save ${SAVINGS.percent}% with the annual plan`,
            ca: `o ${monthly} € al mes · estalvies un ${SAVINGS.percent} % amb l'anual`,
          })}
        </p>

        <Link
          to={`${localPath('/')}#precios`}
          className="mt-4 block w-full rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-black text-white transition-colors hover:bg-violet-500"
        >
          {tr({ es: 'Ver los planes', en: 'See the plans', ca: 'Veure els plans' })}
        </Link>
      </div>

      {/* Quien ya paga y llega aquí sin sesión (otro dispositivo, sesión
          caducada) necesita una salida que no sea volver a pagar. */}
      {!user && (
        <button
          onClick={onLogin}
          className="mt-5 text-sm font-bold text-violet-400 transition-colors hover:text-violet-300"
        >
          {tr({ es: 'Ya tengo cuenta — iniciar sesión', en: 'I already have an account — sign in', ca: 'Ja tinc compte — iniciar sessió' })}
        </button>
      )}

      <Link
        to={localPath('/estudiar')}
        className="mt-8 text-xs text-white/30 transition-colors hover:text-white/60"
      >
        {tr({ es: '← Ver los temarios gratuitos', en: '← Browse the free study notes', ca: '← Veure els temaris gratuïts' })}
      </Link>
    </div>
  )
}

function Checking() {
  return (
    <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#EDAE49]" />
    </div>
  )
}

// Meta SEO + JSON-LD para la pantalla de muro (Locked). Sin esto, la página
// real — con su propio <SEOHead>/<QuizSchema> — nunca llega a montar cuando
// está de pago (Locked sustituye a `children`, no lo envuelve), así que un
// crawler o una vista previa de WhatsApp solo veían el título/canonical
// genéricos del shell: 110 páginas indistinguibles entre sí, justo el patrón
// de "contenido de poco valor" que ya penalizó una vez (ver memoria
// adsense-contenido-poco-valor.md). resolveMeta reutiliza la MISMA fuente
// que ya usa el prerender para title/desc — no hay una segunda idea de la
// meta de una URL escrita a mano aquí.
//
// isAccessibleForFree: false es la señal que documenta Google para contenido
// de pago — deja la página indexable y describible sin fingir que es
// gratis ni ocultarla del todo (justo lo que pedía la nota del pivot a
// suscripción). kind: 'Quiz' para /examen/*, 'LearningResource' para el
// resto — no hay preguntas reales que enseñar aquí (la página de verdad no
// ha llegado a montar), así que no se inventa un `hasPart`.
function LockedMeta({ pathname, lang }) {
  const neutral = normalizePath(pathname)
  const meta = resolveMeta(neutral, lang)
  if (!meta) return null
  const kind = neutral === '/examen' || neutral.startsWith('/examen/') ? 'Quiz' : 'LearningResource'
  return (
    <>
      <SEOHead title={meta.title} description={meta.desc} path={neutral} lang={lang} />
      <QuizSchema name={meta.title} description={meta.desc} path={neutral} lang={lang} kind={kind} isAccessibleForFree={false} />
    </>
  )
}

// Cuánto se espera a Firebase antes de dejar de confiar en que va a
// responder. Existe por un fallo real: en el prerender (scripts/prerender.mjs)
// Chromium headless vía @sparticuz/chromium no resuelve nunca
// onAuthStateChanged — probablemente porque ese Chromium recortado, pensado
// para funciones serverless, no soporta bien IndexedDB, que es donde Firebase
// Auth persiste la sesión. <Checking/> se quedaba esperando para siempre, el
// prerender espera exactamente a que desaparezca su spinner (misma clase
// animate-spin) para dar la página por cargada, y eso colgó un despliegue de
// producción 46 minutos hasta que hubo que cancelarlo a mano.
// El mismo timeout protege a un usuario real con una conexión que se cae a
// mitad de comprobar la sesión: sin esto se quedaba mirando un spinner sin
// salida en vez de ver el muro con un botón para reintentar.
//
// 4s y no más: son ~110 páginas de /juegos y /examen las que pagan esta
// espera durante el prerender (nunca hay sesión ahí), y cada segundo de más
// aquí se multiplica por 110/CONCURRENCY en el build. Un usuario real con
// Firebase funcionando normal resuelve en milisegundos; esto es solo el techo
// para cuando no resuelve nunca.
const AUTH_TIMEOUT_MS = 4000

// Durante el prerender NUNCA hay sesión: es Chromium headless sin login (ver
// newContext() en scripts/prerender.mjs, que inyecta esta bandera antes de
// cualquier navegación). Sin este atajo, cada una de las ~110 URLs de pago
// pagaba el AUTH_TIMEOUT_MS completo esperando a un Firebase que no iba a
// resolver nunca ahí, y esa espera multiplicada por página fue lo que hizo
// que el build superase el límite de 45 min de Vercel (Build Failed: timed
// out — no un cuelgue infinito, pero igual de fatal para el despliegue).
const IS_PRERENDER = typeof window !== 'undefined' && window.__PRERENDER__ === true

export default function AccessGate({ children }) {
  const { pathname } = useLocation()
  const { user } = useAuth()
  const { tr, localPath, lang } = useLang()
  // Solo guarda el resultado ya resuelto, junto al uid al que corresponde. Los
  // casos "aún no sé" y "no hay sesión" se deducen al renderizar, para no
  // escribir estado dentro del efecto y provocar renders en cascada.
  const [resolved, setResolved] = useState(null) // { uid, result }
  const [showAuth, setShowAuth] = useState(false)

  const gated = requiresAccess(pathname)
  // En prerender, "esperando sesión" nunca es cierto: se trata como resuelto
  // a "sin sesión" en el acto, aunque el `user` real de Firebase se quede en
  // `undefined` para siempre (que es justo lo que pasa ahí).
  const waitingOnAuth = !IS_PRERENDER && user === undefined
  const waitingOnAccess = gated && !!user && resolved?.uid !== user.uid
  const stillWaiting = gated && (waitingOnAuth || waitingOnAccess)

  // Identifica DE QUÉ espera se trata, con valores puros (nada de refs: leer
  // un ref durante el render rompe la pureza que React exige — Strict Mode
  // renderiza dos veces a propósito para cazar justo esto).
  const waitKey = waitingOnAuth ? `auth:${pathname}` : waitingOnAccess ? `access:${pathname}:${user.uid}` : null

  // Se guarda QUÉ waitKey ha agotado el plazo, no un booleano suelto: así,
  // en cuanto cambia de página o de uid, la comparación de abajo es distinta
  // sin tener que resetear nada a mano (que sería un setState síncrono en el
  // cuerpo del efecto — react-hooks/set-state-in-effect — y es justo el fallo
  // que tenía la primera versión de este arreglo).
  const [timedOutKey, setTimedOutKey] = useState(null)

  useEffect(() => {
    if (!stillWaiting) return
    const key = waitKey
    const t = setTimeout(() => setTimedOutKey(key), AUTH_TIMEOUT_MS)
    return () => clearTimeout(t)
  }, [stillWaiting, waitKey])

  const timedOut = stillWaiting && timedOutKey === waitKey

  useEffect(() => {
    if (!gated || !user) return

    let alive = true
    loadAccessCached(user.uid)
      .then(({ allowed }) => { if (alive) setResolved({ uid: user.uid, result: allowed ? 'allowed' : 'locked' }) })
      // Un fallo de red no puede cerrarle la puerta a quien ha pagado: se
      // ofrece reintentar, nunca un "paga otra vez".
      .catch(() => { if (alive) setResolved({ uid: user.uid, result: 'error' }) })
    return () => { alive = false }
  }, [gated, user])

  if (!gated) return children
  if (stillWaiting && !timedOut) return <Checking />

  // A partir de aquí ya hay bastante para decidir, tanto si se resolvió como
  // si se agotó el plazo. Agotar el plazo esperando la sesión se trata como
  // "sin sesión" — nunca como si hubiese una: es la lectura que no puede
  // regalar acceso por error.
  const effectiveUser = waitingOnAuth ? null : user

  if (!effectiveUser) {
    return (
      <>
        <LockedMeta pathname={pathname} lang={lang} />
        <Locked onLogin={() => setShowAuth(true)} user={effectiveUser} />
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </>
    )
  }

  // Agotar el plazo esperando la comprobación de acceso (con sesión ya
  // resuelta) es indistinguible de un fallo de red: mismo estado 'error',
  // mismo reintento, nunca "paga otra vez" para quien ya pagó.
  const state = resolved?.uid === effectiveUser.uid ? resolved.result : 'error'

  if (state === 'error') {
    return (
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-sm flex-col items-center justify-center px-5 text-center">
        <span className="mb-4 text-4xl">📡</span>
        <p className="text-white/70 text-sm">
          {tr({
            es: 'No hemos podido comprobar tu cuenta. Puede ser cosa de la conexión.',
            en: "We couldn't check your account. It may be your connection.",
            ca: 'No hem pogut comprovar el teu compte. Pot ser cosa de la connexió.',
          })}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-5 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/20"
        >
          {tr({ es: 'Reintentar', en: 'Try again', ca: 'Tornar-ho a provar' })}
        </button>
        <Link to={localPath('/estudiar')} className="mt-6 text-xs text-white/30 hover:text-white/60">
          {tr({ es: '← Temarios gratuitos', en: '← Free study notes', ca: '← Temaris gratuïts' })}
        </Link>
      </div>
    )
  }

  if (state === 'locked') {
    return (
      <>
        <LockedMeta pathname={pathname} lang={lang} />
        <Locked onLogin={() => setShowAuth(true)} user={effectiveUser} />
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </>
    )
  }

  return children
}
