// Configuración de la publicidad. Punto ÚNICO donde se decide QUÉ red se
// sirve en cada hueco: las páginas solo dicen "aquí cabe un anuncio"
// (<AdSlot placement="…">), nunca de quién es.
//
// El objetivo es poder cambiar de red sin volver a tocar las páginas. Hoy hay
// dos fuentes y una regla de relevo:
//   1. AdSense, si el hueco tiene un id de bloque configurado.
//   2. iGraal (enlace de afiliado), como respaldo mientras AdSense no esté
//      aprobado o ese hueco no tenga bloque.
// Un hueco sin nada que servir no se pinta: mejor un espacio vacío que un
// recuadro en blanco de 250px.
//
// Los ids de bloque NO se escriben aquí: van en variables de entorno de
// Vercel (VITE_ADSENSE_SLOT_*), porque cambian con la cuenta y no tiene
// sentido recompilar el sitio para tocarlos. Sin ellas, todo cae al respaldo
// solo. Ver docs/anuncios.md.

export const ADSENSE_CLIENT = 'ca-pub-9281841187642423'

// Huecos declarados. `format`/`responsive` salen de aquí para que un mismo
// hueco se vea igual en toda la web (el lateral siempre vertical, el de
// después de jugar siempre horizontal), sin que cada página lo reinvente.
export const PLACEMENTS = {
  // Raíl lateral, pantallas anchas: vertical y estrecho.
  rail:      { slotEnv: 'VITE_ADSENSE_SLOT_RAIL',    format: 'vertical',  responsive: false },
  // Bajo la pantalla final de un juego: es el momento de más atención.
  gameEnd:   { slotEnv: 'VITE_ADSENSE_SLOT_GAMEEND', format: 'auto',      responsive: true },
  // Dentro del contenido largo de las páginas de estudio/fichas.
  inArticle: { slotEnv: 'VITE_ADSENSE_SLOT_ARTICLE', format: 'fluid',     responsive: true },
}

export function slotIdFor(placement) {
  const def = PLACEMENTS[placement]
  if (!def) return null
  const id = import.meta.env?.[def.slotEnv]
  // Una variable sin definir llega como undefined; una definida en blanco,
  // como ''. Las dos significan "este hueco todavía no tiene bloque".
  return id ? String(id) : null
}

// ¿Hay alguna red real configurada? Sirve para decidir si el respaldo de
// afiliado tiene que seguir haciendo el trabajo.
export function hasAdsenseSlot(placement) {
  return slotIdFor(placement) !== null
}
