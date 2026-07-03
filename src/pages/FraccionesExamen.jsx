import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/fracciones'

const nivelInfo = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function FraccionesExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Fracciones y Decimales', en: 'Fractions and Decimals', ca: 'Fraccions i Decimals' }}
      emoji="🍕"
      nivelInfo={nivelInfo}
      backFallback="/estudiar/matematicas/fracciones"
      gameId="fracciones"
    />
  )
}
