import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/presionFluidos'

const nivelInfo = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function PresionFluidosExamen() {
  return <ExamenMC titulo={{ es: 'Presión y Fluidos', en: 'Pressure and Fluids', ca: 'Pressió i Fluids' }} emoji="🎈" nivelInfo={nivelInfo} backFallback="/estudiar/fisica/presion-fluidos" gameId="presion-fluidos" />
}
