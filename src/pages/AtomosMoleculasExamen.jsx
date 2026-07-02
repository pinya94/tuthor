import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/atomosMoleculas'

const NIVEL_INFO = {
  primaria: { label: { es: 'Primaria', en: 'Primary',   ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso:      { label: { es: 'ESO',      en: 'Secondary', ca: 'ESO'      }, pool: () => PREGUNTAS_ESO      },
}

export default function AtomosMoleculasExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Átomos y Moléculas', en: 'Atoms & Molecules', ca: 'Àtoms i Molècules' }}
      emoji="⚛️"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/quimica/atomos-moleculas"
      gameId="atomos-moleculas"
    />
  )
}
