import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/decimalesExamen'

const nivelInfo = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function NumerosDecimalesExamen() {
  return <ExamenMC titulo={{ es: 'Números decimales', en: 'Decimals', ca: 'Nombres decimals' }} emoji="🔢" nivelInfo={nivelInfo} backFallback="/estudiar/matematicas/numeros-decimales" gameId="numeros-decimales-test" />
}
