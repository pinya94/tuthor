import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/seguridadVial'

const nivelInfo = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function SeguridadVialExamen() {
  return <ExamenMC titulo={{ es: 'Seguridad Vial', en: 'Road Safety', ca: 'Seguretat Viària' }} emoji="🚸" nivelInfo={nivelInfo} backFallback="/estudiar/vida-practica" gameId="seguridad-vial" />
}
