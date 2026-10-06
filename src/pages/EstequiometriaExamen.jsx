import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACH } from '../data/estequiometria'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACH },
}

export default function EstequiometriaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'El Mol y la Estequiometría', en: 'The Mole and Stoichiometry', ca: 'El Mol i l’Estequiometria' }}
      emoji="🧮"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/quimica/estequiometria"
      gameId="estequiometria"
    />
  )
}
