import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACHILLERATO } from '../data/atmosferaClima'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACHILLERATO },
}

export default function AtmosferaClimaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Atmósfera y Cambio Climático', en: 'Atmosphere and Climate Change', ca: 'Atmosfera i Canvi Climàtic' }}
      emoji="🌡️"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/geologia/atmosfera-clima"
      gameId="atmosfera-clima"
    />
  )
}
