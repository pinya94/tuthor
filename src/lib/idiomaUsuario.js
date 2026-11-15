// Idioma en el que usa Tuthor cada persona, para escribirle en ese idioma
// (altas de profes, lista de novedades, mensajes de contacto). Sale de la URL,
// que es lo que decide el idioma de toda la web: /en/… inglés, /ca/… catalán,
// lo demás castellano. Se guarda en users/{uid}.idioma al entrar, al apuntarse
// a novedades y al darse de alta como profe.
export function idiomaDeRuta(pathname = typeof window === 'undefined' ? '/' : window.location.pathname) {
  return pathname.startsWith('/en') ? 'en' : pathname.startsWith('/ca') ? 'ca' : 'es'
}
export const NOMBRE_IDIOMA = { es: 'castellano', en: 'inglés', ca: 'catalán' }
