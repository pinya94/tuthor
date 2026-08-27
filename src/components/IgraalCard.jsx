import { useLang } from '../context/LangContext'
import { useAccessStatus } from '../lib/access'
import { IgraalBanner } from './PromoBanner'

// Único "anuncio" del sitio de momento: un enlace de afiliado/referido a
// iGraal (cashback), no una red con inventario propio — por eso es un
// componente concreto y no un script de terceros cargado globalmente. El día
// que haya una red real aprobada (AdSense u otra), este es el único sitio
// que hace falta tocar: se sustituye el contenido de la tarjeta, los sitios
// donde se importa no cambian.
//
// No se enseña a quien tiene acceso Pro (ver access.js): "sin publicidad" es
// uno de los beneficios que vende la suscripción ahora que el muro de
// juegos/exámenes está apagado (ver paidRoutes.js). Mientras no se sabe si
// el usuario es Pro (access === null, primera carga), no se pinta nada —
// mejor no enseñarle nada un instante a quien paga que enseñárselo y
// quitárselo enseguida.
const COPY = {
  es: {
    title: '💚 Llévate 10€ y apoya a Tuthor',
    body: 'Regístrate en iGraal desde este enlace y consigue 10€ de regalo — además, te devuelven dinero cada vez que compras online en cientos de tiendas. Una parte nos ayuda a seguir creando contenido nuevo, sin depender de publicidad agresiva.',
    cta: 'Conseguir mis 10€ →',
    banner: 'Llévate 10€ en iGraal y apoya a Tuthor',
  },
  en: {
    title: '💚 Get €10 and support Tuthor',
    body: 'Sign up to iGraal through this link and get a €10 welcome gift — plus cashback every time you shop online at hundreds of stores. A share of it helps us keep building new content, without relying on aggressive ads.',
    cta: 'Claim my €10 →',
    banner: 'Get €10 on iGraal and support Tuthor',
  },
  ca: {
    title: "💚 Emporta't 10€ i dona suport a Tuthor",
    body: "Registra't a iGraal des d'aquest enllaç i aconsegueix 10€ de regal — a més, et retornen diners cada vegada que compres en línia a centenars de botigues. Una part ens ajuda a seguir creant contingut nou, sense dependre de publicitat agressiva.",
    cta: 'Aconseguir els meus 10€ →',
    banner: "Emporta't 10€ a iGraal i dona suport a Tuthor",
  },
}

const SPONSORED_LABEL = { es: 'Patrocinado', en: 'Sponsored', ca: 'Patrocinat' }

const IGRAAL_URL = 'https://es.igraal.com/padrinazgo?padrino=AG_638200fb04960&utm_medium=inf&utm_source=premium'

// `variant`:
//   'card'   (por defecto) — la tarjeta grande, para fichas/hubs/final de
//            partida: hay sitio de sobra y conviene explicar el porqué.
//   'banner' — tira compacta de una línea, pensada para vivir en la
//              pantalla de INICIO de un juego (antes de "▶ Empezar"), nunca
//              durante la partida — "que no influya" en jugar de verdad.
export default function IgraalCard({ className = '', variant = 'card' }) {
  const { lang } = useLang()
  const access = useAccessStatus()

  if (access === null) return null // aún no se sabe si es Pro
  if (access.allowed) return null  // Pro: sin publicidad

  const c = COPY[lang] || COPY.es
  const label = SPONSORED_LABEL[lang] || SPONSORED_LABEL.es

  // Las dos variantes pintan ya el banner de marca (PromoBanner), no una
  // tarjeta de texto: lo que cambia entre ellas es la forma del hueco.
  // 'card' se usa en huecos anchos y 'banner' en tiras dentro del contenido;
  // los dos son horizontales. El vertical lo piden los raíles laterales.
  return (
    <a
      href={IGRAAL_URL}
      target="_blank"
      rel="sponsored noopener noreferrer"
      aria-label={`${label}: ${c.title}. ${c.body}`}
      className={`block ${className}`}
    >
      <IgraalBanner orientation={variant === 'rail' ? 'vertical' : 'horizontal'} />
    </a>
  )
}
