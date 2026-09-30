import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACHILLERATO } from '../data/saludEnfermedad'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACHILLERATO },
}

export default function SaludEnfermedadExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Salud y Enfermedad', en: 'Health and Disease', ca: 'Salut i Malaltia' }}
      emoji="🦠"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/biologia/salud-enfermedad"
      gameId="salud-enfermedad"
    />
  )
}
