// Qué rutas están detrás del muro de pago.
//
// Fuente única para que no haya dos ideas distintas de qué es gratis: la usa
// AccessGate (que decide si deja pasar) y cualquier UI que quiera pintar un
// candado antes de que el usuario pulse.
//
// La regla en una frase: **se paga por jugar y por examinarse; leer es gratis.**
//
//   GRATIS   /                     landing de venta
//            /app                  portada de la app
//            /estudiar/*           temarios y hubs por materia
//            /info/*               fichas de juegos y de estudio
//            /juegos               el catálogo — es el escaparate
//            /precios, /contacto, /privacidad…
//
//   DE PAGO  /juegos/<lo-que-sea>  cada juego
//            /examen/*             todos los exámenes
//            /estudiar/matematicas/<modo>/jugar
//            /estudiar/matematicas/<modo>/examen
//
// Los dos últimos son la excepción que no se ve venir: cuelgan de /estudiar,
// que por lo demás es gratis, pero son un juego y un examen de verdad. Sin
// esta línea habría una puerta trasera a las matemáticas.

// El path que entra aquí va SIN prefijo de idioma. normalizePath lo quita.
export function normalizePath(pathname) {
  const neutral = (pathname || '/').replace(/^\/(en|ca)(?=\/|$)/, '') || '/'
  // Sin barra final: /juegos/portero y /juegos/portero/ son la misma página.
  return neutral.length > 1 ? neutral.replace(/\/+$/, '') : neutral
}

export function requiresAccess(pathname) {
  const path = normalizePath(pathname)

  // El catálogo se queda fuera: es donde el visitante ve qué hay. Poner el
  // muro en el escaparate en vez de en la puerta no vende nada.
  if (path === '/juegos') return false

  if (path.startsWith('/juegos/')) return true
  if (path === '/examen' || path.startsWith('/examen/')) return true

  if (/^\/estudiar\/matematicas\/[^/]+\/(jugar|examen)$/.test(path)) return true

  return false
}
