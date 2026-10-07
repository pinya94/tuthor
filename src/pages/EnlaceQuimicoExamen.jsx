import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACH } from '../data/enlaceQuimico'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACH },
}

export default function EnlaceQuimicoExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'El Enlace Químico', en: 'Chemical Bonding', ca: 'L’Enllaç Químic' }}
      emoji="🔗"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/quimica/enlace-quimico"
      gameId="enlace-quimico"
    />
  )
}
