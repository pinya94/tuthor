import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO } from '../data/genetica'

const NIVEL_INFO = {
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function GeneticaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Genética', en: 'Genetics', ca: 'Genètica' }}
      emoji="🧬"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/biologia/genetica"
      gameId="genetica"
    />
  )
}
