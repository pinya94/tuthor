import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/gramaticaEspanol'

const nivelInfo = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function EspanolExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Gramática Española', en: 'Spanish Grammar', ca: 'Gramàtica Espanyola' }}
      emoji="🇪🇸"
      nivelInfo={nivelInfo}
      backFallback="/estudiar/idiomas/espanol"
      gameId="espanol"
    />
  )
}
