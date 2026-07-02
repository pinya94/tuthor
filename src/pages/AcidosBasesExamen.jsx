import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO } from '../data/acidosBases'

const NIVEL_INFO = {
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function AcidosBasesExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Ácidos y Bases', en: 'Acids & Bases', ca: 'Àcids i Bases' }}
      emoji="🧴"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/quimica/acidos-bases"
      gameId="acidos-bases"
    />
  )
}
