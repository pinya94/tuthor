import ExamenRios from '../components/riosMontanas/ExamenRios'

// Examen de Ríos y Montañas: Europa
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Los grandes ríos y cordilleras de Europa', en: 'The great rivers and mountain ranges of Europe', ca: 'Els grans rius i serralades d’Europa' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Más ríos y cordilleras, y las vertientes', en: 'More rivers and ranges, and the drainage basins', ca: 'Més rius i serralades, i els vessants' } },
  { key: 'experto', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Experto', en: 'Expert', ca: 'Expert' },
    hint: { es: 'Nacimientos y desembocaduras', en: 'Sources and mouths', ca: 'Naixements i desembocadures' } },
]

export default function RiosMontanasEuropaExamen() {
  return (
    <ExamenRios
      region="europa"
      gameId="rios-montanas-europa-test"
      levels={LEVELS}
      badge={{ es: 'Examen · Relieve de Europa', en: 'Exam · Physical geography of Europe', ca: 'Examen · Relleu d’Europa' }}
      title={{ es: 'Examen de ríos y montañas de Europa', en: 'Rivers and Mountains of Europe Exam', ca: 'Examen de rius i muntanyes d’Europa' }}
      sub={{ es: 'En el mapa: Danubio, Rin, Volga, Alpes, Cárpatos y las vertientes', en: 'On the map: the Danube, Rhine, Volga, Alps, Carpathians and the drainage basins', ca: 'Al mapa: Danubi, Rin, Volga, Alps, Carpats i els vessants' }}
      metaTitle={{ es: 'Examen de ríos y montañas de Europa en el mapa (con vertientes)', en: 'Rivers and mountains of Europe map quiz: Danube, Rhine, Volga, Alps', ca: 'Examen de rius i muntanyes d’Europa al mapa (amb vessants)' }}
      metaDesc={{ es: 'Examen interactivo de geografía física de Europa: sitúa en el mapa el Danubio, el Rin, el Volga, el Ródano, los Alpes, los Cárpatos o los Urales, clasifica los ríos por vertientes (ártica, atlántica, mediterránea y del Caspio) y encuentra dónde nacen y desembocan. 10 preguntas, tres niveles.', en: 'Interactive quiz on the physical geography of Europe: find the Danube, Rhine, Volga, Rhône, the Alps, the Carpathians or the Urals on the map, sort the rivers into drainage basins (Arctic, Atlantic, Mediterranean and Caspian) and find where they rise and end. 10 questions, three levels.', ca: 'Examen interactiu de geografia física d’Europa: situa al mapa el Danubi, el Rin, el Volga, el Roine, els Alps, els Carpats o els Urals, classifica els rius per vessants (àrtic, atlàntic, mediterrani i del Caspi) i troba on neixen i desemboquen. 10 preguntes, tres nivells.' }}
      metaPath="/examen/rios-montanas-europa-test"
    />
  )
}
