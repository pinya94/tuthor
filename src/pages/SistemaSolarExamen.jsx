import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/sistemaSolar'

const NIVEL_INFO = {
  primaria: { label: { es: 'Primaria', en: 'Primary',   ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso:      { label: { es: 'ESO',      en: 'Secondary', ca: 'ESO'      }, pool: () => PREGUNTAS_ESO      },
}

export default function SistemaSolarExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Sistema Solar', en: 'Solar System', ca: 'Sistema Solar' }}
      emoji="🌍"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/quimica/sistema-solar"
      gameId="sistema-solar"
    />
  )
}
