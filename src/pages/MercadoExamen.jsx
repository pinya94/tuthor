import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACHILLERATO } from '../data/mercado'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACHILLERATO },
}

export default function MercadoExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'El Mercado', en: 'The Market', ca: 'El Mercat' }}
      emoji="⚖️"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/economia"
      gameId="mercado"
    />
  )
}
