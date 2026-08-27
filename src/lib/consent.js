// Traduce las preferencias del banner de cookies a la señal que espera
// Google (Consent Mode v2). Punto ÚNICO: los valores por defecto se fijan en
// index.html antes de cargar AdSense —tienen que estar puestos antes de la
// primera petición de anuncio, no cuando arranca React— y todo cambio
// posterior pasa por aquí.
//
// Por qué importa más de lo que parece: sin señal de consentimiento, Google
// no sirve (o limita) publicidad al tráfico del EEE y puede sancionar la
// cuenta. Es la diferencia entre "el sitio está aprobado" y "el sitio además
// gana dinero".
//
// El público de Tuthor incluye menores, así que la personalización no se
// activa nunca "por defecto": hace falta un sí explícito en el banner.

const GRANTED = 'granted'
const DENIED = 'denied'

// `advertising` es la categoría nueva del banner. `analytics` ya existía y
// gobernaba Vercel Analytics; ahora gobierna además analytics_storage de GA4,
// que hasta ahora se cargaba pasara lo que pasara.
export function consentSignal(prefs) {
  const ads = prefs?.advertising === true
  const analytics = prefs?.analytics === true
  return {
    ad_storage: ads ? GRANTED : DENIED,
    ad_user_data: ads ? GRANTED : DENIED,
    ad_personalization: ads ? GRANTED : DENIED,
    analytics_storage: analytics ? GRANTED : DENIED,
  }
}

// Se llama al guardar el banner y también al arrancar con una decisión ya
// guardada de una visita anterior: sin lo segundo, quien ya había aceptado
// volvía a arrastrar el "denegado" por defecto de index.html toda la sesión.
export function applyConsent(prefs) {
  if (typeof window === 'undefined') return
  const signal = consentSignal(prefs)

  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', signal)
  }

  // Segundo cinturón, y solo eso: AdSense lee esta bandera al cargar y
  // acto seguido sustituye el array de window.adsbygoogle por su propio
  // objeto, así que escribirla DESPUÉS no sirve de nada (comprobado en el
  // navegador: la propiedad desaparece). Sigue aquí porque applyConsent
  // también corre al montar React, que a veces gana la carrera al script
  // async. Quien de verdad manda es Consent Mode, arriba.
  const ads = window.adsbygoogle
  if (Array.isArray(ads)) ads.requestNonPersonalizedAds = prefs?.advertising === true ? 0 : 1
}
