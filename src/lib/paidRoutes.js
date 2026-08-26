// Qué rutas están detrás del muro de pago.
//
// Fuente única para que no haya dos ideas distintas de qué es gratis: la usa
// AccessGate (que decide si deja pasar) y cualquier UI que quiera pintar un
// candado antes de que el usuario pulse.
//
// ── MURO DESACTIVADO (2026-08) ───────────────────────────────────────────
// Se retiró el muro de juegos/exámenes: todo el contenido educativo es
// gratis para todo el mundo, sin cuenta ni tarjeta. Motivo (ver la
// conversación de monetización): un checkout que apenas convertía porque no
// había forma de probar el producto antes de pagar, Y una política de
// AdSense que exige explícitamente que "no significant content should be
// hidden behind a login or paywall" — con ~29% del sitio siendo la misma
// pantalla de candado repetida, Google llevaba razón en penalizarlo.
//
// La suscripción ahora vende otra cosa: el panel de seguimiento completo
// (ver Perfil.jsx) y quitar la tarjeta de apoyo/iGraal (ver IgraalCard.jsx),
// no el acceso al juego o al examen en sí.
//
// La tabla de rutas de pago de abajo NO se ha borrado a propósito — por si
// se quiere recuperar el muro de juegos algún día, basta con volver a poner
// PAYWALL_ENABLED a true. `wouldRequireAccessIfEnabled` sigue teniendo sus
// propios tests (ver paidRoutes.test.js) para que, si ese día llega, la
// tabla siga funcionando exactamente igual que cuando se apagó.
const PAYWALL_ENABLED = false
//
//   GRATIS   /                     landing de venta
//            /app                  portada de la app
//            /estudiar/*           temarios y hubs por materia
//            /info/*               fichas de juegos y de estudio
//            /juegos               el catálogo — es el escaparate
//            /precios, /contacto, /privacidad…
//
//   DE PAGO  /juegos/<lo-que-sea>  cada juego               (solo si PAYWALL_ENABLED)
//            /examen/*             todos los exámenes       (solo si PAYWALL_ENABLED)
//            /estudiar/matematicas/<modo>/jugar              (solo si PAYWALL_ENABLED)
//            /estudiar/matematicas/<modo>/examen              (solo si PAYWALL_ENABLED)
//
// Los dos últimos son la excepción que no se ve venir: cuelgan de /estudiar,
// que por lo demás es gratis, pero son un juego y un examen de verdad. Sin
// esta línea habría una puerta trasera a las matemáticas — si el muro
// vuelve a activarse.

// El path que entra aquí va SIN prefijo de idioma. normalizePath lo quita.
export function normalizePath(pathname) {
  const neutral = (pathname || '/').replace(/^\/(en|ca)(?=\/|$)/, '') || '/'
  // Sin barra final: /juegos/portero y /juegos/portero/ son la misma página.
  return neutral.length > 1 ? neutral.replace(/\/+$/, '') : neutral
}

// La tabla de siempre, intacta — qué pediría acceso SI el muro estuviese
// encendido. Separada de `requiresAccess` para poder seguir probándola
// (y para poder reactivarla) sin que hoy tenga ningún efecto real.
export function wouldRequireAccessIfEnabled(pathname) {
  const path = normalizePath(pathname)

  // El catálogo se queda fuera: es donde el visitante ve qué hay. Poner el
  // muro en el escaparate en vez de en la puerta no vende nada.
  if (path === '/juegos') return false

  if (path.startsWith('/juegos/')) return true
  if (path === '/examen' || path.startsWith('/examen/')) return true

  if (/^\/estudiar\/matematicas\/[^/]+\/(jugar|examen)$/.test(path)) return true

  return false
}

export function requiresAccess(pathname) {
  if (!PAYWALL_ENABLED) return false
  return wouldRequireAccessIfEnabled(pathname)
}
