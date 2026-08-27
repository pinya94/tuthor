import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { useAccessStatus, PLANS } from '../lib/access'
import AuthModal from './AuthModal'
import { ProBanner } from './PromoBanner'

// SOLO la venta de Pro, sin el enlace de afiliado al lado. SupportBlock mete
// las dos vías juntas, que va bien en la cabecera de un juego pero no donde
// ya hay un anuncio pintado: ahí saldría iGraal dos veces.
//
// El mensaje lleva por delante el "para qué", no el "cuánto": el usuario
// pidió que se entienda que Pro es lo que mantiene Tuthor en pie y no un
// simple quita-anuncios. Los tres puntos son lo que se lleva, en orden de lo
// que más se nota al usarlo.
const COPY = {
  es: {
    kicker: 'Tuthor Pro',
    title: 'Tuthor se mantiene con quien se hace Pro',
    body: 'Todo el contenido es gratis y queremos que siga así. Los que dan el paso a Pro son los que pagan los servidores y el contenido nuevo de cada semana.',
    perks: ['Sin ningún anuncio', 'Panel de progreso completo', 'Apoyas el proyecto directamente'],
    cta: 'Hazte Pro',
    per: 'mes',
    cancel: 'Cancela cuando quieras',
  },
  en: {
    kicker: 'Tuthor Pro',
    title: 'Tuthor runs on the people who go Pro',
    body: 'All the content is free and we want to keep it that way. The people who go Pro are the ones paying for the servers and the new content every week.',
    perks: ['No ads at all', 'Full progress panel', 'You support the project directly'],
    cta: 'Go Pro',
    per: 'mo',
    cancel: 'Cancel anytime',
  },
  ca: {
    kicker: 'Tuthor Pro',
    title: 'Tuthor es manté amb qui es fa Pro',
    body: 'Tot el contingut és gratis i volem que continuï així. Els qui fan el pas a Pro són els que paguen els servidors i el contingut nou de cada setmana.',
    perks: ['Sense cap anunci', 'Panell de progrés complet', 'Dones suport al projecte directament'],
    cta: 'Fes-te Pro',
    per: 'mes',
    cancel: 'Cancel·la quan vulguis',
  },
}

// `variant`:
//   'card'   (por defecto) — el bloque persuasivo con los tres puntos.
//   'inline' — una tira compacta, para cuando ya hay mucho contenido debajo.
export default function ProUpsell({ variant = 'card', className = '' }) {
  const { user } = useAuth()
  const { lang, localPath } = useLang()
  const navigate = useNavigate()
  const access = useAccessStatus()
  const [showAuth, setShowAuth] = useState(false)

  if (access === null) return null // aún no se sabe si es Pro
  if (access.allowed) return null  // ya es Pro

  const c = COPY[lang] || COPY.es
  const price = PLANS.pro.price.toFixed(2).replace('.', ',')

  function handlePro() {
    if (!user) { setShowAuth(true); return }
    navigate(localPath('/mi-plan'))
  }

  const modal = showAuth && (
    <AuthModal
      onClose={() => setShowAuth(false)}
      onSuccess={() => { setShowAuth(false); navigate(localPath('/mi-plan')) }}
    />
  )

  // 'inline' y 'rail' pintan el banner de marca (negro + logotipo), que es lo
  // que se ve como un anuncio de verdad. 'card' sigue siendo el bloque
  // explicativo con los tres puntos, para donde hay sitio para argumentar
  // (el panel de Perfil).
  if (variant === 'inline' || variant === 'rail') {
    return (
      <>
        {/* 'inline' se esconde a partir de 1400px: a esa anchura el raíl
            derecho ya lleva este mismo banner y se veía dos veces en la misma
            pantalla. El de 'rail' ES el raíl, así que ese no se oculta. */}
        <button
          onClick={handlePro}
          aria-label={`${c.cta}: ${c.title}. ${price}€/${c.per}`}
          className={`block w-full text-left ${variant === 'inline' ? 'min-[1400px]:hidden' : ''} ${className}`}
        >
          <ProBanner orientation={variant === 'rail' ? 'vertical' : 'horizontal'} />
        </button>
        {modal}
      </>
    )
  }

  return (
    <>
      <div className={`rounded-2xl border border-violet-400/25 bg-gradient-to-br from-violet-500/[0.16] via-violet-500/[0.06] to-transparent p-5 ${className}`}>
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-violet-300/60 mb-2">{c.kicker}</p>
        <p className="text-white font-black text-lg leading-tight mb-2">{c.title}</p>
        <p className="text-white/55 text-sm leading-relaxed mb-4">{c.body}</p>

        <ul className="flex flex-col gap-2 mb-5">
          {c.perks.map(p => (
            <li key={p} className="flex items-center gap-2.5 text-white/75 text-sm">
              <span className="grid place-items-center w-5 h-5 shrink-0 rounded-full bg-violet-500/20 text-violet-300 text-[11px] font-black" aria-hidden="true">✓</span>
              {p}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-3">
          <p className="text-white font-black text-2xl leading-none">
            {price}€ <span className="text-white/35 text-xs font-semibold">/ {c.per}</span>
          </p>
          <button
            onClick={handlePro}
            className="rounded-xl bg-violet-600 hover:bg-violet-500 px-5 py-3 text-white text-sm font-black shadow-lg shadow-violet-500/20 transition-colors"
          >
            {c.cta} →
          </button>
        </div>
        <p className="text-white/25 text-[11px] mt-2.5">{c.cancel}</p>
      </div>
      {modal}
    </>
  )
}
