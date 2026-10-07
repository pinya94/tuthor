import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACH } from '../data/sucesiones'

const NIVEL_INFO = {
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACH },
}

export default function SucesionesExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Sucesiones y Progresiones', en: 'Sequences and Progressions', ca: 'Successions i Progressions' }}
      emoji="🔢"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/matematicas"
      gameId="sucesiones"
    />
  )
}
