import { useLang } from '../context/LangContext'
import { PLANS } from '../lib/access'

// Los banners de verdad: bloques con marca, color propio y un claim grande,
// no una línea de texto con un enlace. Hechos en CSS/SVG y no como imagen
// porque así se adaptan al hueco (el raíl es estrecho y vertical, el de
// dentro del contenido es ancho), pesan cero y se leen nítidos en cualquier
// pantalla — un PNG a 212px de ancho se ve borroso en un portátil retina.
//
// Dos marcas, dos fondos, a propósito:
//   iGraal → naranja de su marca. Es publicidad de un tercero y tiene que
//            parecerlo (además lleva su etiqueta "Patrocinado").
//   Pro    → negro con el logo de Tuthor. Es nuestro, y el contraste con el
//            naranja evita que se confundan de un vistazo.
//
// `orientation`:
//   'horizontal' — ancho: marca a la izquierda, claim y botón a la derecha.
//   'vertical'   — estrecho (raíles laterales): todo apilado.

// Marca de iGraal redibujada en SVG: un rombo de esquinas redondeadas con el
// hueco interior y el corte diagonal. Es una aproximación a su logotipo, no
// su fichero oficial — si su panel de padrinazgo da los creativos de marca,
// sustituir este bloque por el suyo es lo correcto y solo afecta a este
// componente.
function IgraalMark({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="iGraal">
      <g transform="rotate(45 24 24)">
        <rect x="5" y="5" width="38" height="38" rx="13" fill="currentColor" />
        <rect x="14.5" y="14.5" width="19" height="19" rx="6.5" fill="var(--igraal-bg, #F4621F)" />
      </g>
      <path d="M15 31 L31 15" stroke="var(--igraal-bg, #F4621F)" strokeWidth="9" strokeLinecap="round" />
      <path d="M17.5 28.5 L28.5 17.5" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    </svg>
  )
}

function IgraalWordmark({ className = '' }) {
  // Su logotipo es una geométrica redondeada; con el peso y el tracking
  // apretado de Inter queda cerca sin cargar otra fuente solo para esto.
  return (
    <span className={`font-black tracking-[-0.04em] leading-none select-none ${className}`}>
      iGraal
    </span>
  )
}

const IGRAAL_COPY = {
  es: { claim: 'CONSIGUE 10€ GRATIS', sub: 'Y recupera dinero en todas tus compras', cta: 'Quiero mis 10€', tag: 'Patrocinado' },
  en: { claim: 'GET €10 FREE', sub: 'And earn cashback on everything you buy', cta: 'Claim my €10', tag: 'Sponsored' },
  ca: { claim: 'CONSEGUEIX 10€ GRATIS', sub: 'I recupera diners en totes les teves compres', cta: 'Vull els meus 10€', tag: 'Patrocinat' },
}

const PRO_COPY = {
  es: { claim: 'APOYA A SEGUIR CRECIENDO', sub: 'Sin anuncios y con el panel completo', cta: 'Hazte Pro', per: 'mes' },
  en: { claim: 'HELP US KEEP GROWING', sub: 'No ads and the full tracking panel', cta: 'Go Pro', per: 'mo' },
  ca: { claim: 'AJUDA A SEGUIR CREIXENT', sub: 'Sense anuncis i amb el panell complet', cta: 'Fes-te Pro', per: 'mes' },
}

// El naranja va como variable CSS para que el hueco del logotipo (que es un
// recorte, no un color pintado) case exactamente con el fondo del banner.
const IGRAAL_BG = '#F4621F'

export function IgraalBanner({ orientation = 'horizontal', className = '' }) {
  const { lang } = useLang()
  const c = IGRAAL_COPY[lang] || IGRAAL_COPY.es
  const vertical = orientation === 'vertical'

  return (
    <div
      style={{ '--igraal-bg': IGRAAL_BG, background: `linear-gradient(135deg, #FF7A33 0%, ${IGRAAL_BG} 55%, #E04E10 100%)` }}
      className={`@container relative overflow-hidden rounded-2xl text-white shadow-lg shadow-orange-900/20 transition-transform hover:scale-[1.01] ${vertical ? 'p-4' : 'p-4 @lg:p-6'} ${className}`}
    >
      {/* Brillo decorativo: da profundidad sin cargar ninguna imagen */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />

      <span className="absolute right-3 top-3 text-[8px] font-bold uppercase tracking-[0.16em] text-white/55">{c.tag}</span>

      <div className={vertical ? 'flex flex-col' : 'flex flex-col @lg:flex-row @lg:items-center @lg:gap-6'}>
        <div className={`flex items-center gap-2 ${vertical ? 'mb-3' : 'mb-3 @lg:mb-0 @lg:shrink-0'}`}>
          <IgraalMark className={vertical ? 'h-8 w-8' : 'h-8 w-8 @lg:h-10 @lg:w-10'} />
          <IgraalWordmark className={vertical ? 'text-2xl' : 'text-2xl @lg:text-3xl'} />
        </div>

        <div className="flex-1 min-w-0">
          <p className={`font-black leading-[1.05] ${vertical ? 'text-lg' : 'text-xl @lg:text-3xl'}`}>{c.claim}</p>
          <p className={`text-white/80 leading-snug ${vertical ? 'mt-1 text-[11px]' : 'mt-1 text-xs @lg:mt-1.5 @lg:text-sm'}`}>{c.sub}</p>
        </div>

        <span className={`inline-block shrink-0 rounded-xl bg-white px-4 py-2.5 text-center font-black text-[#D2490D] ${vertical ? 'mt-3 w-full text-xs' : 'mt-3 text-xs @lg:mt-0 @lg:text-sm'}`}>
          {c.cta} →
        </span>
      </div>
    </div>
  )
}

export function ProBanner({ orientation = 'horizontal', className = '' }) {
  const { lang } = useLang()
  const c = PRO_COPY[lang] || PRO_COPY.es
  const vertical = orientation === 'vertical'
  const price = PLANS.pro.price.toFixed(2).replace('.', ',')

  return (
    <div
      className={`@container relative overflow-hidden rounded-2xl bg-black text-white shadow-lg shadow-black/40 ring-1 ring-white/10 transition-transform hover:scale-[1.01] ${vertical ? 'p-4' : 'p-4 @lg:p-6'} ${className}`}
    >
      {/* Mismo ámbar del logotipo, difuminado: liga el fondo negro con la marca */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-10 -bottom-12 h-36 w-36 rounded-full bg-[#EDAE49]/20 blur-3xl" />

      <div className={vertical ? 'flex flex-col' : 'flex flex-col @lg:flex-row @lg:items-center @lg:gap-6'}>
        <div className={`${vertical ? 'mb-3' : 'mb-3 @lg:mb-0 @lg:shrink-0'}`}>
          {/* El logotipo real del sitio, no un texto que lo imite */}
          <img src="/logo.svg" alt="Tuthor" className={vertical ? 'h-6 w-auto' : 'h-6 w-auto @lg:h-8'} width="160" height="32" loading="lazy" />
          <p className={`mt-1 font-bold uppercase tracking-[0.18em] text-[#EDAE49] ${vertical ? 'text-[8px]' : 'text-[9px] @lg:text-[10px]'}`}>Pro</p>
        </div>

        <div className="flex-1 min-w-0">
          <p className={`font-black leading-[1.05] ${vertical ? 'text-base' : 'text-xl @lg:text-3xl'}`}>{c.claim}</p>
          <p className={`text-white/60 leading-snug ${vertical ? 'mt-1 text-[11px]' : 'mt-1 text-xs @lg:mt-1.5 @lg:text-sm'}`}>
            {c.sub} · <span className="text-white font-bold">{price}€/{c.per}</span>
          </p>
        </div>

        <span className={`inline-block shrink-0 rounded-xl bg-[#EDAE49] px-4 py-2.5 text-center font-black text-black ${vertical ? 'mt-3 w-full text-xs' : 'mt-3 text-xs @lg:mt-0 @lg:text-sm'}`}>
          {c.cta} →
        </span>
      </div>
    </div>
  )
}
