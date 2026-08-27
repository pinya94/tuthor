import { useEffect, useRef } from 'react'
import { useAccessStatus } from '../lib/access'
import { ADSENSE_CLIENT, PLACEMENTS, slotIdFor } from '../lib/ads'
import IgraalCard from './IgraalCard'

// Un hueco de publicidad. La página dice DÓNDE cabe un anuncio; qué se sirve
// ahí lo decide lib/ads.js. Así se cambia de red tocando un fichero en vez de
// las veinte páginas donde hay huecos.
//
// Orden de relevo:
//   1. Pro → nada. "Sin publicidad" es lo que compra la suscripción.
//   2. Bloque de AdSense configurado para ese hueco → AdSense.
//   3. Si no → el respaldo (iGraal), que es lo que hay mientras AdSense no
//      esté aprobado. `fallback={false}` lo desactiva para un hueco concreto.
//
// Ojo con AdSense en una SPA: cada <ins> se empuja UNA vez y nunca se
// reutiliza entre rutas. Empujarlo dos veces tira el error "All ins elements
// must have a data-ad-slot attribute" o "already have ads in them", y a
// partir de ahí ese bloque deja de rellenarse en toda la sesión. De ahí el
// `pushed` y el `key` por ruta en quien lo monta.
export default function AdSlot({ placement, className = '', fallback = true, fallbackVariant = 'card', minHeight = 100 }) {
  const access = useAccessStatus()
  const insRef = useRef(null)
  const pushed = useRef(false)

  const def = PLACEMENTS[placement]
  const slotId = slotIdFor(placement)
  const isPro = access?.allowed === true
  const serveAdsense = Boolean(def && slotId) && !isPro && access !== null

  useEffect(() => {
    if (!serveAdsense || pushed.current || !insRef.current) return
    // Si el bloque ya viene marcado por AdSense (remonte en StrictMode), no
    // se vuelve a empujar.
    if (insRef.current.getAttribute('data-adsbygoogle-status')) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      pushed.current = true
    } catch {
      // Un bloqueador de anuncios hace que .push reviente. No es un error
      // del sitio y no debe tumbar la página: el hueco se queda vacío.
    }
  }, [serveAdsense])

  if (access === null) return null // aún no se sabe si es Pro: no parpadear
  if (isPro) return null

  if (serveAdsense) {
    return (
      <div className={className} style={{ minHeight }}>
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slotId}
          data-ad-format={def.format}
          data-full-width-responsive={def.responsive ? 'true' : 'false'}
        />
      </div>
    )
  }

  if (!fallback) return null
  // El respaldo se esconde a partir de 1400px porque el respaldo ES iGraal,
  // y a esa anchura el raíl lateral ya lo está enseñando: serían dos veces la
  // misma oferta en la misma pantalla. Ojo, esto NO afecta a un bloque real de
  // AdSense (se pinta arriba y en todas las anchuras): cuando haya red de
  // verdad, el hueco deja de ser un duplicado del raíl y se aprovecha.
  return <IgraalCard variant={fallbackVariant} className={`min-[1400px]:hidden ${className}`} />
}
