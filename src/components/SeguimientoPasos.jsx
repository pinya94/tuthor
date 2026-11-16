import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { trackEvent } from '../lib/analytics'

// Mide el paso que más importa para la retención: de leer a jugar. Cuando
// alguien navega DENTRO de la web hasta un juego o un examen, se manda
// `paso_a_jugar` con el tipo de página de la que venía (estudio, índice de
// juegos, portada, otro juego…) y la ruta de origen. Con game_complete y
// exam_complete se ve el embudo entero: entra → pasa a jugar → termina.
// Solo navegación interna: la primera carga no cuenta (no hay origen).
const TIPOS = [
  [/^\/estudiar\//, 'estudio'],
  [/^\/estudiar$/, 'indice_estudio'],
  [/^\/juegos\/[^/]+$/, 'juego'],
  [/^\/juegos/, 'indice_juegos'],
  [/^\/examen\//, 'examen'],
  [/^\/info\//, 'ficha'],
  [/^\/$/, 'portada'],
]
const tipoDe = path => {
  const neutro = path.replace(/^\/(en|ca)(?=\/|$)/, '') || '/'
  return (TIPOS.find(([re]) => re.test(neutro)) ?? [null, 'otra'])[1]
}

export default function SeguimientoPasos() {
  const { pathname } = useLocation()
  const anterior = useRef(null)
  useEffect(() => {
    const de = anterior.current
    anterior.current = pathname
    if (!de || de === pathname) return
    const destino = tipoDe(pathname)
    if (destino !== 'juego' && destino !== 'examen') return
    trackEvent('paso_a_jugar', { origen: tipoDe(de), origen_path: de.slice(0, 100), destino, item_id: pathname.slice(0, 100) })
  }, [pathname])
  return null
}
