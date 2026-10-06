import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACH } from '../data/arteArquitectura'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACH },
}

export default function ArteArquitecturaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Historia del Arte: Arquitectura', en: 'Art History: Architecture', ca: 'Història de l’Art: Arquitectura' }}
      emoji="🏰"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/arte"
      gameId="arte-arquitectura"
    />
  )
}
