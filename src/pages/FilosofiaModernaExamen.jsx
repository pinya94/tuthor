import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACH } from '../data/filosofiaModerna'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACH },
}

export default function FilosofiaModernaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Filosofía moderna y contemporánea', en: 'Modern and Contemporary Philosophy', ca: 'Filosofia moderna i contemporània' }}
      emoji="💭"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/filosofia"
      gameId="filosofia-moderna"
    />
  )
}
