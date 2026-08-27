import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { useAccessStatus, PLANS } from '../lib/access'
import AuthModal from './AuthModal'
import { IgraalBanner, ProBanner } from './PromoBanner'

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

// El contenedor fija y centra; el banner de dentro es el que se anima al
// pasar por encima. Separados a propósito: si el mismo elemento llevara el
// -translate-y-1/2 del centrado y el escalado del hover, el segundo pisaría
// al primero y el banner daría un salto de media altura.
const railWrap = 'hidden 2xl:block fixed top-1/2 -translate-y-1/2 z-20 w-[212px] animate-[railIn_.45s_ease-out_both]'

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
      {/* Los dos raíles llevan el MISMO banner de marca que el resto de la web
          (PromoBanner), en su versión vertical — antes eran tarjetas de texto
          propias de este componente, así que el anuncio se veía distinto según
          dónde cayera. El aria-label lleva la oferta entera y no solo
          "Patrocinado": aria-label sustituye al nombre accesible, no se suma,
          y un lector de pantalla anunciaba "Patrocinado, enlace" sin más. */}
      <div className={`${railWrap} left-4`}>
        <a
          href={IGRAAL_URL}
          target="_blank"
          rel="sponsored noopener noreferrer"
          aria-label={`${c.sponsored}: ${c.igraalTitle}. ${c.igraalBody}`}
          className="block"
        >
          <IgraalBanner orientation="vertical" />
        </a>
      </div>

      <div className={`${railWrap} right-4`}>
        <button
          onClick={handlePro}
          aria-label={`${c.proCta}: ${c.proTitle}, ${price}€/${c.per}. ${c.proBody}`}
          className="block w-full text-left"
        >
          <ProBanner orientation="vertical" />
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
