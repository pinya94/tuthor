import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACH } from '../data/trigonometria'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACH },
}

export default function TrigonometriaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Trigonometría', en: 'Trigonometry', ca: 'Trigonometria' }}
      emoji="📐"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/matematicas"
      gameId="trigonometria"
    />
  )
}
