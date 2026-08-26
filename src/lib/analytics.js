// Envoltorio fino sobre gtag (cargado en index.html, ver <script> de GA4).
//
// Nació porque no había NINGÚN evento propio en toda la app: solo el
// page_view automático de la primera carga. Sin esto, Google Ads (cuando se
// vuelva a activar) y GA4 no tienen forma de saber que alguien se registró o
// pagó — el checkout puede estar funcionando perfectamente y seguir
// pareciendo que "no convierte" porque nadie se lo cuenta a Google.
//
// gtag puede no existir todavía (bloqueadores de anuncios, fallo de red al
// cargar el script) — por eso la comprobación, no porque sea opcional
// llamarlo: cada sitio que dispara un evento debe hacerlo igual, sin repetir
// esta comprobación a mano.
export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}
