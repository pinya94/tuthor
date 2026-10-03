import { useLocation } from 'react-router-dom'
import { SOBRE_EXAMEN } from '../data/sobreExamen'
import { SOBRE_PAGINA } from '../data/sobrePagina'
import { SobreExamen } from './SobreExamen'

// Pinta «Sobre este examen» debajo de los exámenes con envoltorio propio, según
// la URL (sin prefijo de idioma). Va una vez en el Layout para no tener que
// meter el bloque dentro de cada pantalla, que tienen estructuras muy distintas.
export default function SobreExamenAuto() {
  const { pathname } = useLocation()
  const ruta = pathname.replace(/^\/(en|ca)(?=\/)/, '').replace(/\/$/, '')
  const pagina = SOBRE_PAGINA[ruta]
  const parrafos = pagina?.parrafos ?? SOBRE_EXAMEN[ruta]
  if (!parrafos) return null
  return <div className="relative z-10 px-4 pb-10"><SobreExamen parrafos={parrafos} titulo={pagina?.titulo} className="mt-2" /></div>
}
