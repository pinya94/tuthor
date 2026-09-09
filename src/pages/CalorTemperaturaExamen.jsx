import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/calorTemperatura'

const nivelInfo = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function CalorTemperaturaExamen() {
  return <ExamenMC titulo={{ es: 'Calor y Temperatura', en: 'Heat and Temperature', ca: 'Calor i Temperatura' }} emoji="🌡️" nivelInfo={nivelInfo} backFallback="/estudiar/fisica/calor-temperatura" gameId="calor-temperatura" />
}
