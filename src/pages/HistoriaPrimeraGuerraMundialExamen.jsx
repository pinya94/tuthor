import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACHILLERATO } from '../data/historiaPrimeraGuerraMundial'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACHILLERATO },
}

export default function HistoriaPrimeraGuerraMundialExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Primera Guerra Mundial', en: 'World War I', ca: 'Primera Guerra Mundial' }}
      emoji="🎖️"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/historia/primera-guerra-mundial"
      gameId="primera-guerra-mundial"
    />
  )
}
