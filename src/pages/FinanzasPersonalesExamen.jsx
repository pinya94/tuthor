import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_GENERAL } from '../data/finanzasPersonales'

const NIVEL_INFO = {
  general: { label: { es: 'General', en: 'General', ca: 'General' }, pool: () => PREGUNTAS_GENERAL },
}

export default function FinanzasPersonalesExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Finanzas Personales', en: 'Personal Finance', ca: 'Finances Personals' }}
      emoji="💰"
      nivelInfo={NIVEL_INFO}
      backFallback="/info/juegos/spicy"
      gameId="finanzas-personales"
    />
  )
}
