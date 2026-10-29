import ExamenRios from '../components/riosMontanas/ExamenRios'

// Examen de Ríos y Montañas: España
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Los grandes ríos y sistemas montañosos', en: 'The big rivers and mountain ranges', ca: 'Els grans rius i sistemes muntanyosos' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Más ríos y sierras, y las vertientes', en: 'More rivers and ranges, and the drainage basins', ca: 'Més rius i serres, i els vessants' } },
  { key: 'experto', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Experto', en: 'Expert', ca: 'Expert' },
    hint: { es: 'Nacimientos y desembocaduras', en: 'Sources and mouths', ca: 'Naixements i desembocadures' } },
]

export default function RiosMontanasExamen() {
  return (
    <ExamenRios
      region="espana"
      gameId="rios-montanas-test"
      levels={LEVELS}
      badge={{ es: 'Examen · Relieve de España', en: 'Exam · Relief of Spain', ca: 'Examen · Relleu d’Espanya' }}
      title={{ es: 'Examen de ríos y montañas de España', en: 'Rivers and Mountains of Spain Exam', ca: 'Examen de rius i muntanyes d’Espanya' }}
      sub={{ es: 'En el mapa: ríos, sistemas montañosos y vertientes', en: 'On the map: rivers, mountain ranges and basins', ca: 'Al mapa: rius, sistemes muntanyosos i vessants' }}
      metaTitle={{ es: 'Examen de ríos y sistemas montañosos de España en el mapa', en: 'Exam: rivers and mountain ranges of Spain on the map', ca: 'Examen de rius i sistemes muntanyosos d’Espanya al mapa' }}
      metaDesc={{ es: 'Examen interactivo de geografía física de España: sitúa los ríos y los sistemas montañosos en el mapa, clasifica los ríos por vertientes y encuentra dónde nacen y desembocan. 10 preguntas, tres niveles, con nota.', en: 'Interactive exam on the physical geography of Spain: place the rivers and mountain ranges on the map, sort the rivers into drainage basins and find where they rise and reach the sea. 10 questions, three levels, with a mark.', ca: 'Examen interactiu de geografia física d’Espanya: situa els rius i els sistemes muntanyosos al mapa, classifica els rius per vessants i troba on neixen i desemboquen. 10 preguntes, tres nivells, amb nota.' }}
      metaPath="/examen/rios-montanas-test"
    />
  )
}
