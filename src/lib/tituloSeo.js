// Título de página (pestaña, Google y al compartir). Lo usan SEOHead y el
// prerender, así que los dos sacan exactamente el mismo.
//
// La palabra clave va PRIMERO: Google corta hacia los 60 caracteres y antes
// el prefijo «Tuthor · » se comía el final («…con soluciones»). La marca va
// al final solo si cabe; si no, Google ya enseña el nombre del sitio aparte.
export const MAX_TITULO = 60
export function tituloSeo(titulo) {
  const t = String(titulo || '').trim()
  if (!t) return 'Tuthor'
  if (/tuthor/i.test(t)) return t
  const conMarca = `${t} | Tuthor`
  return conMarca.length <= MAX_TITULO ? conMarca : t
}
