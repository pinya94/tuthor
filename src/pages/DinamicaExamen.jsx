import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACH } from '../data/dinamica'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACH },
}

export default function DinamicaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Dinámica: las leyes de Newton', en: 'Dynamics: Newton’s Laws', ca: 'Dinàmica: les lleis de Newton' }}
      emoji="🛷"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/fisica/dinamica"
      gameId="dinamica"
    />
  )
}
