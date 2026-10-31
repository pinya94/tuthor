import ExamenRios from '../components/riosMontanas/ExamenRios'

// Examen de Ríos y Montañas: Estados Unidos
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Los grandes ríos y cordilleras de Estados Unidos', en: 'The great rivers and mountain ranges of the United States', ca: 'Els grans rius i serralades dels Estats Units' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Más ríos y cordilleras, y a qué mar va cada río', en: 'More rivers and ranges, and which sea each river reaches', ca: 'Més rius i serralades, i a quin mar va cada riu' } },
  { key: 'experto', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Experto', en: 'Expert', ca: 'Expert' },
    hint: { es: 'Nacimientos y desembocaduras', en: 'Sources and mouths', ca: 'Naixements i desembocadures' } },
]

export default function RiosMontanasEeuuExamen() {
  return (
    <ExamenRios
      region="eeuu"
      gameId="rios-montanas-eeuu-test"
      levels={LEVELS}
      badge={{ es: 'Examen · Relieve de Estados Unidos', en: 'Exam · Physical geography of the US', ca: 'Examen · Relleu dels Estats Units' }}
      title={{ es: 'Examen de ríos y montañas de Estados Unidos', en: 'Rivers and Mountains of the United States Exam', ca: 'Examen de rius i muntanyes dels Estats Units' }}
      sub={{ es: 'En el mapa: Misisipi, Misuri, Colorado, Rocosas, Apalaches y a qué mar va cada río', en: 'On the map: the Mississippi, Missouri, Colorado, Rockies, Appalachians and which sea each river reaches', ca: 'Al mapa: Mississipí, Missouri, Colorado, Rocoses, Apalatxes i a quin mar va cada riu' }}
      metaTitle={{ es: 'Examen de los ríos y montañas de Estados Unidos en el mapa', en: 'US rivers and mountains map quiz: Mississippi, Missouri, Rockies, Appalachians', ca: 'Examen dels rius i muntanyes dels Estats Units al mapa' }}
      metaDesc={{ es: 'Examen interactivo de geografía física de Estados Unidos: sitúa en el mapa el Misisipi, el Misuri, el Colorado, el Río Bravo, las Rocosas o los Apalaches, clasifica los ríos según vayan al Pacífico, al golfo de México o al Atlántico y encuentra dónde nacen y desembocan. 10 preguntas, tres niveles.', en: 'Interactive US physical geography quiz: find the Mississippi, Missouri, Colorado, Rio Grande, the Rocky Mountains or the Appalachians on the map, sort the rivers by whether they reach the Pacific, the Gulf of Mexico or the Atlantic, and find where they rise and end. 10 questions, three levels.', ca: 'Examen interactiu de geografia física dels Estats Units: situa al mapa el Mississipí, el Missouri, el Colorado, el Riu Bravo, les Rocoses o els Apalatxes, classifica els rius segons vagin al Pacífic, al golf de Mèxic o a l’Atlàntic i troba on neixen i desemboquen. 10 preguntes, tres nivells.' }}
      metaPath="/examen/rios-montanas-eeuu-test"
    />
  )
}
