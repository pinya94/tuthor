// Las grandes eras de la historia, con su color. Las usan Tuthor Time (la
// línea de eras) y la Línea del Tiempo (el punto de cada evento).
export const ERAS = [
  { desde: -3000, hasta: 476, color: '#F59E0B', nombre: { es: 'Antigua', en: 'Ancient', ca: 'Antiga' } },
  { desde: 476, hasta: 1492, color: '#A78BFA', nombre: { es: 'Media', en: 'Medieval', ca: 'Mitjana' } },
  { desde: 1492, hasta: 1789, color: '#38BDF8', nombre: { es: 'Moderna', en: 'Early modern', ca: 'Moderna' } },
  { desde: 1789, hasta: 2030, color: '#34D399', nombre: { es: 'Contemp.', en: 'Modern', ca: 'Contemp.' } },
]

// Posición 0-1 en una línea donde cada era ocupa lo mismo (aunque no duren igual).
export function posicionEnEras(año) {
  if (año == null || Number.isNaN(año)) return null
  if (año <= ERAS[0].desde) return 0
  const i = ERAS.findIndex(e => año < e.hasta)
  const k = i < 0 ? ERAS.length - 1 : i
  const e = ERAS[k]
  const dentro = Math.min(1, Math.max(0, (año - e.desde) / (e.hasta - e.desde)))
  return (k + dentro) / ERAS.length
}

export function eraDe(año) {
  if (año == null || Number.isNaN(año)) return null
  return ERAS.find(e => año < e.hasta) ?? ERAS[ERAS.length - 1]
}
