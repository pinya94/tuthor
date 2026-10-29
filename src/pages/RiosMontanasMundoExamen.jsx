import ExamenRios from '../components/riosMontanas/ExamenRios'

// Examen de Ríos y Montañas: el mundo
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Los grandes ríos y cordilleras del mundo', en: 'The great rivers and mountain ranges of the world', ca: 'Els grans rius i serralades del món' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Más ríos y cordilleras, y a qué océano va cada río', en: 'More rivers and ranges, and which ocean each river reaches', ca: 'Més rius i serralades, i a quin oceà va cada riu' } },
  { key: 'experto', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Experto', en: 'Expert', ca: 'Expert' },
    hint: { es: 'Nacimientos y desembocaduras', en: 'Sources and mouths', ca: 'Naixements i desembocadures' } },
]

export default function RiosMontanasMundoExamen() {
  return (
    <ExamenRios
      region="mundo"
      gameId="rios-montanas-mundo-test"
      levels={LEVELS}
      badge={{ es: 'Examen · Relieve del mundo', en: 'Exam · World relief', ca: 'Examen · Relleu del món' }}
      title={{ es: 'Examen de ríos y montañas del mundo', en: 'Rivers and Mountains of the World Exam', ca: 'Examen de rius i muntanyes del món' }}
      sub={{ es: 'En el mapa: Nilo, Amazonas, Himalaya, Andes y los océanos', en: 'On the map: the Nile, the Amazon, the Himalayas, the Andes and the oceans', ca: 'Al mapa: Nil, Amazones, Himàlaia, Andes i els oceans' }}
      metaTitle={{ es: 'Examen de los grandes ríos y cordilleras del mundo en el mapa', en: 'Exam: the great rivers and mountain ranges of the world on the map', ca: 'Examen dels grans rius i serralades del món al mapa' }}
      metaDesc={{ es: 'Examen interactivo de geografía física del mundo: sitúa en el mapa el Nilo, el Amazonas, el Misisipi, el Yangtsé, el Himalaya, los Andes o los Alpes, clasifica los ríos por el océano al que van y encuentra dónde nacen y desembocan. 10 preguntas, tres niveles.', en: 'Interactive world physical geography exam: place the Nile, the Amazon, the Mississippi, the Yangtze, the Himalayas, the Andes or the Alps on the map, sort the rivers by the ocean they reach and find where they rise and end. 10 questions, three levels.', ca: 'Examen interactiu de geografia física del món: situa al mapa el Nil, l’Amazones, el Mississipí, l’Iang-Tsé, l’Himàlaia, els Andes o els Alps, classifica els rius per l’oceà on van i troba on neixen i desemboquen. 10 preguntes, tres nivells.' }}
      metaPath="/examen/rios-montanas-mundo-test"
    />
  )
}
