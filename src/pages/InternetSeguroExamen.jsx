import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/internetSeguro'

const nivelInfo = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function InternetSeguroExamen() {
  return <ExamenMC titulo={{ es: 'Internet Seguro', en: 'Online Safety', ca: 'Internet Segur' }} emoji="🔐" nivelInfo={nivelInfo} backFallback="/estudiar/vida-practica" gameId="internet-seguro" />
}
