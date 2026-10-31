import ExamenRios from '../components/riosMontanas/ExamenRios'

// Examen de Ríos y Montañas: Reino Unido (lo que pide el currículo inglés de Primaria)
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Los grandes ríos y montañas del Reino Unido', en: 'The main rivers and mountains of the UK', ca: 'Els grans rius i muntanyes del Regne Unit' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary', ca: 'Secundària (ESO)' },
    hint: { es: 'Más ríos y montañas', en: 'More rivers and mountains', ca: 'Més rius i muntanyes' } },
  { key: 'experto', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Experto', en: 'Expert', ca: 'Expert' },
    hint: { es: 'Nacimientos y desembocaduras', en: 'Sources and mouths', ca: 'Naixements i desembocadures' } },
]

export default function RiosMontanasReinoUnidoExamen() {
  return (
    <ExamenRios
      region="reino-unido"
      gameId="rios-montanas-reino-unido-test"
      levels={LEVELS}
      badge={{ es: 'Examen · Relieve del Reino Unido', en: 'Exam · Physical geography of the UK', ca: 'Examen · Relleu del Regne Unit' }}
      title={{ es: 'Examen de ríos y montañas del Reino Unido', en: 'Rivers and Mountains of the UK Exam', ca: 'Examen de rius i muntanyes del Regne Unit' }}
      sub={{ es: 'En el mapa: Támesis, Severn, Trent, Peninos, Highlands y a qué mar va cada río', en: 'On the map: the Thames, Severn, Trent, Pennines, Highlands and which sea each river reaches', ca: 'Al mapa: Tàmesi, Severn, Trent, Penins, Highlands i a quin mar va cada riu' }}
      metaTitle={{ es: 'Examen de los ríos y montañas del Reino Unido en el mapa', en: 'UK rivers and mountains map quiz: Thames, Severn, Pennines, Snowdonia', ca: 'Examen dels rius i muntanyes del Regne Unit al mapa' }}
      metaDesc={{ es: 'Examen interactivo de geografía física del Reino Unido: sitúa en el mapa el Támesis, el Severn, el Trent, el Mersey, los Peninos, los Montes Grampianos o Snowdonia, clasifica los ríos según vayan al mar del Norte, al Atlántico o al mar de Irlanda y encuentra dónde nacen y desembocan. 10 preguntas.', en: 'Interactive UK physical geography quiz for Key Stage 2 and beyond: find the Thames, Severn, Trent, Mersey, the Pennines, the Grampian Mountains or Snowdonia on the map, sort the rivers by whether they reach the North Sea, the Atlantic or the Irish Sea, and find where they rise and end. 10 questions.', ca: 'Examen interactiu de geografia física del Regne Unit: situa al mapa el Tàmesi, el Severn, el Trent, el Mersey, els Penins, les Muntanyes Grampianes o Snowdonia, classifica els rius segons vagin al mar del Nord, a l’Atlàntic o al mar d’Irlanda i troba on neixen i desemboquen. 10 preguntes.' }}
      metaPath="/examen/rios-montanas-reino-unido-test"
    />
  )
}
