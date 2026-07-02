import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO } from '../data/funciones'

const NIVEL_INFO = {
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function FuncionesExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Funciones', en: 'Functions', ca: 'Funcions' }}
      emoji="📈"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/matematicas"
      gameId="funciones"
    />
  )
}
