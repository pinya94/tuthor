import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO } from '../data/enterosRacionales'

const nivelInfo = {
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function EnterosRacionalesExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Números Enteros y Racionales', en: 'Integers and Rationals', ca: 'Nombres Enters i Racionals' }}
      emoji="🔢"
      nivelInfo={nivelInfo}
      backFallback="/estudiar/matematicas/enteros-racionales"
      gameId="enteros-racionales"
    />
  )
}
