import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/inglesGrammarPastSimple'

const nivelInfo = {
  primaria: { label: { es: 'Primary', en: 'Primary', ca: 'Primary' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'Secondary', en: 'Secondary', ca: 'Secondary' }, pool: () => PREGUNTAS_ESO },
}

export default function InglesGrammarPastSimpleExamen() {
  return <ExamenMC titulo={{ es: 'Past Simple', en: 'Past Simple', ca: 'Past Simple' }} emoji="⏪" nivelInfo={nivelInfo} backFallback="/estudiar/idiomas/ingles/grammar" gameId="ingles-grammar-past-simple-test" otroExamen={{ path: '/examen/ingles-piezas-past-simple-test', emoji: '🧩', label: { es: 'Montar la frase', en: 'Build the sentence', ca: 'Muntar la frase' }, desc: { es: 'Completa el hueco con las piezas, sin opciones que elegir', en: 'Fill the gap with pieces, no options to pick from', ca: 'Completa el buit amb les peces, sense opcions per triar' } }} />
}
