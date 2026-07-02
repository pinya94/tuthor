import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/estadosMateria'

const NIVEL_INFO = {
  primaria: { label: { es: 'Primaria', en: 'Primary',   ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso:      { label: { es: 'ESO',      en: 'Secondary', ca: 'ESO'      }, pool: () => PREGUNTAS_ESO      },
}

export default function EstadosMateriaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Estados de la Materia', en: 'States of Matter', ca: 'Estats de la Matèria' }}
      emoji="🧪"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/quimica/estados-materia"
      gameId="estados-materia"
    />
  )
}
