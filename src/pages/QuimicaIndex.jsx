import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import TemarioGrid from '../components/TemarioGrid'
import SEOHead from '../components/SEOHead'
import { getDisciplina } from '../data/ciencias'

const TEMAS = [
  {
    id: 'tabla-periodica', disciplina: 'quimica',
    titulo: 'Tabla Periódica', tituloEn: 'Periodic Table', tituloCa: 'Taula Periòdica',
    subtitulo: 'Símbolos, nombres y grupos de los elementos', subtituloEn: 'Symbols, names and groups of elements', subtituloCa: 'Símbols, noms i grups dels elements',
    emoji: '⚗️', gradient: 'from-violet-500 to-purple-700',
    tags: ['elementos', 'simbolos', 'quimica', 'tabla', 'periodic table', 'elements'],
    niveles: ['primaria', 'eso', 'bachillerato'],
  },
  {
    id: 'estados-materia', disciplina: 'quimica',
    titulo: 'Estados de la Materia', tituloEn: 'States of Matter', tituloCa: 'Estats de la Matèria',
    subtitulo: 'Sólido, líquido, gas y cambios de estado', subtituloEn: 'Solid, liquid, gas and changes of state', subtituloCa: 'Sòlid, líquid, gas i canvis d\'estat',
    emoji: '🧪', gradient: 'from-teal-500 to-cyan-700',
    tags: ['estados', 'solido', 'liquido', 'gas', 'fusion', 'evaporacion', 'materia', 'states', 'matter', 'ciclo del agua', 'water cycle', 'condensacion'],
    niveles: ['primaria', 'eso'],
  },
  {
    id: 'mezclas-separacion', disciplina: 'quimica',
    titulo: 'Mezclas y Separación', tituloEn: 'Mixtures & Separation', tituloCa: 'Mescles i Separació',
    subtitulo: 'Homogéneas, heterogéneas y métodos de separación', subtituloEn: 'Homogeneous, heterogeneous and separation methods', subtituloCa: 'Homogènies, heterogènies i mètodes de separació',
    emoji: '🔀', gradient: 'from-orange-500 to-amber-600',
    tags: ['mezclas', 'separacion', 'filtracion', 'destilacion', 'decantacion', 'mixtures', 'separation'],
    niveles: ['primaria', 'eso'],
  },
  {
    id: 'acidos-bases', disciplina: 'quimica',
    titulo: 'Ácidos y Bases', tituloEn: 'Acids & Bases', tituloCa: 'Àcids i Bases',
    subtitulo: 'pH, indicadores y neutralización', subtituloEn: 'pH, indicators and neutralisation', subtituloCa: 'pH, indicadors i neutralització',
    emoji: '🧴', gradient: 'from-green-500 to-emerald-700',
    tags: ['acidos', 'bases', 'ph', 'neutralizacion', 'indicadores', 'acids', 'bases', 'neutralisation'],
    niveles: ['eso'],
  },
  {
    id: 'atomos-moleculas', disciplina: 'quimica',
    titulo: 'Átomos y Moléculas', tituloEn: 'Atoms & Molecules', tituloCa: 'Àtoms i Molècules',
    subtitulo: 'Estructura atómica, elementos y compuestos', subtituloEn: 'Atomic structure, elements and compounds', subtituloCa: 'Estructura atòmica, elements i compostos',
    emoji: '⚛️', gradient: 'from-blue-500 to-indigo-700',
    tags: ['atomos', 'moleculas', 'protones', 'neutrones', 'electrones', 'atoms', 'molecules', 'electrons'],
    niveles: ['primaria', 'eso'],
  },
  {
    id: 'rocas-minerales', disciplina: 'geologia',
    titulo: 'Rocas y Minerales', tituloEn: 'Rocks & Minerals', tituloCa: 'Roques i Minerals',
    subtitulo: 'Tipos de rocas, minerales y cómo se forman', subtituloEn: 'Rock types, minerals and how they form', subtituloCa: 'Tipus de roques, minerals i com es formen',
    emoji: '🪨', gradient: 'from-stone-500 to-neutral-700',
    tags: ['rocas', 'minerales', 'granito', 'marmol', 'cuarzo', 'igneas', 'sedimentarias', 'metamorficas', 'geologia', 'ciclo de las rocas', 'rock cycle', 'erosion', 'rocks', 'minerals', 'geology'],
    niveles: ['primaria', 'eso'],
  },
  {
    id: 'sistema-solar', disciplina: 'geologia',
    titulo: 'Sistema Solar', tituloEn: 'Solar System', tituloCa: 'Sistema Solar',
    subtitulo: 'Planetas, astros, movimientos y características', subtituloEn: 'Planets, celestial bodies, movements and features', subtituloCa: 'Planetes, astres, moviments i característiques',
    emoji: '🌍', gradient: 'from-indigo-500 to-purple-700',
    tags: ['planetas', 'sol', 'luna', 'orbita', 'rotacion', 'traslacion', 'sistema solar', 'planets', 'solar system'],
    niveles: ['primaria', 'eso'],
  },
  {
    id: 'celula', disciplina: 'biologia',
    titulo: 'La Célula', tituloEn: 'The Cell', tituloCa: 'La Cèl·lula',
    subtitulo: 'Tipos, orgánulos y funciones celulares', subtituloEn: 'Types, organelles and cell functions', subtituloCa: 'Tipus, orgànuls i funcions cel·lulars',
    emoji: '🔬', gradient: 'from-green-500 to-teal-700',
    tags: ['celula', 'nucleo', 'mitocondria', 'cloroplasto', 'procariota', 'eucariota', 'cell', 'organelle', 'ciclo de krebs', 'ciclo de calvin', 'ciclo celular', 'mitosis', 'krebs cycle', 'calvin cycle', 'respiracion celular', 'fotosintesis'],
    niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'cuerpo-humano', disciplina: 'biologia',
    titulo: 'Cuerpo Humano', tituloEn: 'Human Body', tituloCa: 'Cos Humà',
    subtitulo: 'Sistemas digestivo, circulatorio, respiratorio y nervioso', subtituloEn: 'Digestive, circulatory, respiratory and nervous systems', subtituloCa: 'Sistemes digestiu, circulatori, respiratori i nerviós',
    emoji: '❤️', gradient: 'from-red-500 to-rose-700',
    tags: ['cuerpo humano', 'digestion', 'corazon', 'pulmones', 'nervioso', 'human body', 'heart', 'lungs'],
    niveles: ['primaria', 'eso'],
  },
  {
    id: 'seres-vivos', disciplina: 'biologia',
    titulo: 'Seres Vivos', tituloEn: 'Living Things', tituloCa: 'Éssers Vius',
    subtitulo: 'Reinos, clasificación, vertebrados e invertebrados', subtituloEn: 'Kingdoms, classification, vertebrates and invertebrates', subtituloCa: 'Regnes, classificació, vertebrats i invertebrats',
    emoji: '🌱', gradient: 'from-emerald-500 to-green-700',
    tags: ['seres vivos', 'reinos', 'vertebrados', 'plantas', 'animales', 'hongos', 'living things', 'kingdoms', 'metamorfosis', 'ciclo de vida', 'rana', 'renacuajo', 'frog metamorphosis'],
    niveles: ['primaria', 'eso'],
  },
  {
    id: 'ecosistemas', disciplina: 'biologia',
    titulo: 'Ecosistemas', tituloEn: 'Ecosystems', tituloCa: 'Ecosistemes',
    subtitulo: 'Cadenas tróficas, biomas y adaptaciones', subtituloEn: 'Food chains, biomes and adaptations', subtituloCa: 'Cadenes tròfiques, biomes i adaptacions',
    emoji: '🌍', gradient: 'from-teal-500 to-emerald-700',
    tags: ['ecosistema', 'cadena trofica', 'bioma', 'biodiversidad', 'habitat', 'ecosystems', 'food chain', 'biome', 'ciclo del nitrogeno', 'nitrogen cycle', 'bacterias', 'fijacion del nitrogeno'],
    niveles: ['primaria', 'eso', 'bachillerato'],
  },
  {
    id: 'genetica', disciplina: 'biologia',
    titulo: 'Genética', tituloEn: 'Genetics', tituloCa: 'Genètica',
    subtitulo: 'ADN, genes, herencia y mutaciones', subtituloEn: 'DNA, genes, heredity and mutations', subtituloCa: 'ADN, gens, herència i mutacions',
    emoji: '🧬', gradient: 'from-purple-500 to-violet-700',
    tags: ['genetica', 'adn', 'cromosomas', 'genes', 'herencia', 'mendel', 'genetics', 'dna', 'chromosomes'],
    niveles: ['eso'],
  },
  {
    id: 'nutricion', disciplina: 'biologia',
    titulo: 'Nutrición', tituloEn: 'Nutrition', tituloCa: 'Nutrició',
    subtitulo: 'Macronutrientes, vitaminas y dieta saludable', subtituloEn: 'Macronutrients, vitamins and healthy diet', subtituloCa: 'Macronutrients, vitamines i dieta saludable',
    emoji: '🥗', gradient: 'from-lime-500 to-green-600',
    tags: ['nutricion', 'vitaminas', 'proteinas', 'carbohidratos', 'dieta', 'alimentacion', 'nutrition', 'vitamins', 'diet'],
    niveles: ['primaria', 'eso'],
  },
  {
    id: 'fuerzas', disciplina: 'fisica',
    titulo: 'Fuerzas y Movimiento', tituloEn: 'Forces and Motion', tituloCa: 'Forces i Moviment',
    subtitulo: 'Leyes de Newton, velocidad, gravedad y presión', subtituloEn: 'Newton\'s laws, speed, gravity and pressure', subtituloCa: 'Lleis de Newton, velocitat, gravetat i pressió',
    emoji: '⚡', gradient: 'from-yellow-500 to-orange-600',
    tags: ['newton', 'fuerza', 'velocidad', 'gravedad', 'inercia', 'rozamiento', 'pressure', 'forces', 'motion', 'gravity'],
    niveles: ['primaria', 'eso'],
  },
  {
    id: 'energia', disciplina: 'fisica',
    titulo: 'Energía', tituloEn: 'Energy', tituloCa: 'Energia',
    subtitulo: 'Tipos, transformaciones y fuentes de energía renovable', subtituloEn: 'Types, transformations and renewable energy sources', subtituloCa: 'Tipus, transformacions i fonts d\'energia renovable',
    emoji: '🔋', gradient: 'from-green-500 to-teal-600',
    tags: ['energia', 'cinetica', 'potencial', 'renovable', 'solar', 'nuclear', 'rendimiento', 'energy', 'renewable'],
    niveles: ['primaria', 'eso'],
  },
  {
    id: 'electricidad', disciplina: 'fisica',
    titulo: 'Electricidad', tituloEn: 'Electricity', tituloCa: 'Electricitat',
    subtitulo: 'Circuitos, corriente, tensión, resistencia y magnetismo', subtituloEn: 'Circuits, current, voltage, resistance and magnetism', subtituloCa: 'Circuits, corrent, tensió, resistència i magnetisme',
    emoji: '💡', gradient: 'from-amber-500 to-yellow-600',
    tags: ['electricidad', 'circuito', 'corriente', 'voltaje', 'resistencia', 'ohm', 'iman', 'electricity', 'circuit', 'ohm law'],
    niveles: ['primaria', 'eso'],
  },
  {
    id: 'ondas-luz', disciplina: 'fisica',
    titulo: 'Ondas y Luz', tituloEn: 'Waves and Light', tituloCa: 'Ones i Llum',
    subtitulo: 'Sonido, espectro electromagnético, reflexión y refracción', subtituloEn: 'Sound, electromagnetic spectrum, reflection and refraction', subtituloCa: 'So, espectre electromagnètic, reflexió i refracció',
    emoji: '🌊', gradient: 'from-blue-500 to-cyan-600',
    tags: ['ondas', 'luz', 'sonido', 'reflexion', 'refraccion', 'espectro', 'ultrasonidos', 'waves', 'light', 'sound', 'spectrum'],
    niveles: ['primaria', 'eso'],
  },
]

// Índice de UNA disciplina de ciencias (Física, Química, Biología o Geología).
// `disciplina` llega por prop desde la ruta correspondiente en App.jsx.
export default function QuimicaIndex({ disciplina = 'quimica' }) {
  const navigate = useNavigate()
  const { lang, localPath, lt, tr } = useLang()
  const ca = lang === 'ca', en = lang === 'en'

  const disc = getDisciplina(disciplina) || getDisciplina('quimica')

  const items = TEMAS.filter(t => t.disciplina === disc.id).map(t => ({
    ...t,
    titulo:    lt(t, 'titulo'),
    subtitulo: lt(t, 'subtitulo'),
  }))

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <SEOHead
        title={tr({ es: `${tr(disc.label)} — temas y exámenes`, en: `${tr(disc.label)} — topics and exams`, ca: `${tr(disc.label)} — temes i exàmens` })}
        description={tr({ es: `${tr(disc.subtitulo)}. Teoría breve, juegos y exámenes tipo test por nivel: Primaria, ESO y Bachillerato.`, en: `${tr(disc.subtitulo)}. Short theory, games and level-based quizzes for primary and secondary school.`, ca: `${tr(disc.subtitulo)}. Teoria breu, jocs i exàmens tipus test per nivell.` })}
        path={`/estudiar/${disc.id}`}
        lang={lang}
      />
      <div className="max-w-3xl mx-auto w-full mb-5">
        <p className="text-white/30 text-xs mb-4">
          <button onClick={() => navigate(localPath('/estudiar'))} className="hover:text-white/60 transition-colors">
            {ca ? 'Estudiar' : en ? 'Study' : 'Estudiar'}
          </button>
          {' / '}
          <span className="text-white/50">{tr(disc.label)}</span>
        </p>
        <div className="flex items-center gap-4">
          <span className="text-5xl">{disc.emoji}</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{tr(disc.label)}</h1>
            <p className="text-white/40 text-sm mt-0.5">{tr(disc.subtitulo)}</p>
          </div>
        </div>
      </div>

      <TemarioGrid
        items={items}
        onSelect={item => navigate(localPath(`/estudiar/${disc.id}/${item.id}`))}
        placeholder={ca ? 'Cercar tema...' : en ? 'Search topic...' : 'Buscar tema...'}
      />
    </div>
  )
}
