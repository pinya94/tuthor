import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/potencias'

const NIVEL_INFO = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function PotenciasExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Potencias y Notación Científica', en: 'Powers and Scientific Notation', ca: 'Potències i Notació Científica' }}
      emoji="🚀"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/matematicas"
      gameId="potencias"
    />
  )
}
