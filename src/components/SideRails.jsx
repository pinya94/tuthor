import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { useAccessStatus, PLANS } from '../lib/access'
import AuthModal from './AuthModal'

// Los márgenes muertos a los lados en pantallas anchas — el usuario los
// marcó a mano en una captura de /app: el contenido va en una columna
// centrada (max-w-*) y en monitores grandes sobra un montón de sitio sin
// usar, en TODA la web (landing, /app, cada juego, cada examen), porque
// todos comparten la misma columna centrada.
//
// Se monta UNA vez por rama de layout en App.jsx, no página por página —
// mismo motivo que AccessGate: es más barato y no hay que tocar cada
// pantalla para que aparezca en todas. Va DENTRO del envoltorio de la app
// (no como hermano suyo) para heredar su contexto de apilamiento; ver el
// comentario en App.jsx.
//
// Solo en pantallas muy anchas (2xl, 1536px+): por debajo de eso la columna
// central + dos raíles ya no caben con holgura, y se ve apretado en vez de
// "espacio aprovechado". Ahí el relevo lo coge SupportBlock, que vive dentro
// del flujo de cada página — y que por eso mismo se esconde en 2xl, para no
// repetir la misma oferta dos veces en la misma pantalla.
//
// Izquierda = iGraal, derecha = Hazte Pro: dos huecos, dos mensajes
// distintos, en vez de repetir el mismo dos veces.
const IGRAAL_URL = 'https://es.igraal.com/padrinazgo?padrino=AG_638200fb04960&utm_medium=inf&utm_source=premium'

const COPY = {
  es: {
    sponsored: 'Patrocinado',
    igraalTitle: 'Llévate 10€',
    igraalBody: 'Regístrate en iGraal y te devuelven dinero en tus compras de siempre.',
    igraalCta: 'Conseguir mis 10€',
    proKicker: 'Tuthor Pro',
    proTitle: 'Sin publicidad',
    proBody: 'Quita los anuncios, desbloquea el panel completo y apoya el proyecto.',
    proCta: 'Hazte Pro',
    per: 'mes',
  },
  en: {
    sponsored: 'Sponsored',
    igraalTitle: 'Get €10',
    igraalBody: 'Sign up to iGraal and earn cashback on your everyday shopping.',
    igraalCta: 'Claim my €10',
    proKicker: 'Tuthor Pro',
    proTitle: 'No ads',
    proBody: 'Remove the ads, unlock the full panel and support the project.',
    proCta: 'Go Pro',
    per: 'mo',
  },
  ca: {
    sponsored: 'Patrocinat',
    igraalTitle: "Emporta't 10€",
    igraalBody: "Registra't a iGraal i et retornen diners en les teves compres de sempre.",
    igraalCta: 'Aconseguir els meus 10€',
    proKicker: 'Tuthor Pro',
    proTitle: 'Sense publicitat',
    proBody: 'Treu els anuncis, desbloqueja el panell complet i dona suport al projecte.',
    proCta: 'Fes-te Pro',
    per: 'mes',
  },
}

// El contenedor fija y centra; la tarjeta de dentro es la que se anima al
// pasar por encima. Separados a propósito: si el mismo elemento llevara el
// -translate-y-1/2 del centrado y el desplazamiento del hover, el segundo
// pisaría al primero y la tarjeta daría un salto de media altura.
const railWrap = 'hidden 2xl:block fixed top-1/2 -translate-y-1/2 z-20 w-[212px] animate-[railIn_.45s_ease-out_both]'
const cardBase =
  'flex flex-col rounded-2xl border p-4 backdrop-blur-md shadow-xl shadow-black/30 ' +
  'transition-all duration-200 hover:-translate-y-0.5'
const kicker = 'text-[9px] font-bold uppercase tracking-[0.14em]'
const badge = 'grid place-items-center w-8 h-8 rounded-xl text-base mb-2.5'
const body = 'text-white/50 text-[11px] leading-relaxed'
const cta = 'mt-3 rounded-lg px-3 py-2 text-center text-[11px] font-bold transition-colors'

export default function SideRails() {
  const { user } = useAuth()
  const { lang, localPath } = useLang()
  const navigate = useNavigate()
  const access = useAccessStatus()
  const [showAuth, setShowAuth] = useState(false)

  if (access === null) return null // aún no se sabe si es Pro
  if (access.allowed) return null  // ya es Pro: nada que venderle aquí

  const c = COPY[lang] || COPY.es
  const price = PLANS.pro.price.toFixed(2).replace('.', ',')

  function handlePro() {
    if (!user) { setShowAuth(true); return }
    navigate(localPath('/mi-plan'))
  }

  return (
    <>
      {/* El aria-label lleva la oferta ENTERA, no solo "Patrocinado". Antes
          decía solo eso, y como aria-label sustituye al nombre accesible (no
          se suma), un lector de pantalla anunciaba "Patrocinado, enlace" y se
          perdía qué había detrás. Explícito y no heredado del texto porque el
          contenido va repartido en varios <p> y no toda herramienta lo
          concatena igual. */}
      <div className={`${railWrap} left-4`}>
        <a
          href={IGRAAL_URL}
          target="_blank"
          rel="sponsored noopener noreferrer"
          aria-label={`${c.sponsored}: ${c.igraalTitle}. ${c.igraalBody}`}
          className={`${cardBase} group border-amber-400/20 bg-gradient-to-b from-amber-400/[0.13] to-amber-400/[0.03] hover:border-amber-400/40`}
        >
          <p className={`${kicker} text-amber-300/50 mb-2.5`}>{c.sponsored}</p>
          <span className={`${badge} bg-amber-400/15`} aria-hidden="true">💚</span>
          <p className="text-white font-black text-[15px] leading-tight mb-1">{c.igraalTitle}</p>
          <p className={body}>{c.igraalBody}</p>
          <span className={`${cta} bg-amber-400 text-black group-hover:bg-amber-300`}>
            {c.igraalCta} →
          </span>
        </a>
      </div>

      <div className={`${railWrap} right-4`}>
        <button
          onClick={handlePro}
          aria-label={`${c.proCta}: ${c.proTitle}, ${price}€/${c.per}. ${c.proBody}`}
          className={`${cardBase} group w-full text-left border-violet-400/20 bg-gradient-to-b from-violet-400/[0.13] to-violet-400/[0.03] hover:border-violet-400/40`}
        >
          <p className={`${kicker} text-violet-300/50 mb-2.5`}>{c.proKicker}</p>
          <span className={`${badge} bg-violet-400/15`} aria-hidden="true">✨</span>
          <p className="text-white font-black text-[15px] leading-tight mb-1">{c.proTitle}</p>
          <p className={body}>{c.proBody}</p>
          <p className="mt-2.5 text-white font-black text-sm">
            {price}€ <span className="text-white/35 text-[11px] font-semibold">/ {c.per}</span>
          </p>
          <span className={`${cta} bg-violet-600 text-white group-hover:bg-violet-500`}>
            {c.proCta} →
          </span>
        </button>
      </div>

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={() => { setShowAuth(false); navigate(localPath('/mi-plan')) }}
        />
      )}
    </>
  )
}
