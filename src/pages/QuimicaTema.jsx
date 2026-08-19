import { useNavigate, useParams } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { ELEMENTOS } from '../data/tablaperiodica'
import { ciclosPorTema } from '../data/ciclosCientificos'
import { diagnosticosPorTema } from '../data/diagnostico'
import { disciplinaDeTema, getDisciplina } from '../data/ciencias'
import PageMeta from '../components/PageMeta'
import CourseSchema from '../components/CourseSchema'
import BreadcrumbSchema from '../components/BreadcrumbSchema'

const NIVEL_LABEL = {
  primaria:     { es: 'Primaria',     en: 'Primary',   ca: 'Primària' },
  eso:          { es: 'ESO',          en: 'Secondary', ca: 'ESO' },
  bachillerato: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' },
}
const NIVEL_CONJ = { es: ' y ', en: ' & ', ca: ' i ' }

// Chip informativo con los niveles a los que se dirige un ciclo, p. ej. "ESO y Bachillerato".
function nivelesChip(niveles, lang) {
  return (niveles || []).map(n => NIVEL_LABEL[n]?.[lang] ?? NIVEL_LABEL[n]?.es ?? n).join(NIVEL_CONJ[lang] ?? NIVEL_CONJ.es)
}

const TEMAS_META = {
  es: {
    'tabla-periodica':   { titulo: 'Tabla Periódica',      emoji: '⚗️', descripcion: 'Símbolos, nombres, números atómicos, grupos y tipos de los elementos químicos.' },
    'estados-materia':   { titulo: 'Estados de la Materia',emoji: '🧪', descripcion: 'Sólido, líquido, gas y cambios de estado. Propiedades y temperatura.' },
    'mezclas-separacion':{ titulo: 'Mezclas y Separación', emoji: '🔀', descripcion: 'Mezclas homogéneas y heterogéneas. Filtración, destilación, decantación y más.' },
    'acidos-bases':      { titulo: 'Ácidos y Bases',       emoji: '🧴', descripcion: 'Escala de pH, ácidos y bases cotidianos, indicadores y neutralización.' },
    'atomos-moleculas':  { titulo: 'Átomos y Moléculas',   emoji: '⚛️', descripcion: 'Estructura atómica, partículas subatómicas, elementos y compuestos.' },
    'rocas-minerales':   { titulo: 'Rocas y Minerales',    emoji: '⛰️', descripcion: 'Rocas ígneas, sedimentarias y metamórficas, minerales y cómo se forman.' },
    'placas-tectonicas': { titulo: 'Placas Tectónicas',    emoji: '🌋', descripcion: 'Capas de la Tierra, bordes de placas, terremotos, volcanes y la deriva continental.' },
    'sistema-solar':     { titulo: 'Sistema Solar',        emoji: '🌍', descripcion: 'Planetas, astros, movimientos de traslación y rotación, y características del sistema solar.' },
    'celula':            { titulo: 'La Célula',            emoji: '🔬', descripcion: 'Tipos de célula, orgánulos, membrana, fotosíntesis y división celular.' },
    'cuerpo-humano':     { titulo: 'Cuerpo Humano',        emoji: '❤️', descripcion: 'Sistemas digestivo, circulatorio, respiratorio y nervioso. Órganos y funciones.' },
    'seres-vivos':       { titulo: 'Seres Vivos',          emoji: '🌱', descripcion: 'Los 5 reinos, clasificación, vertebrados, invertebrados, reproducción y fotosíntesis.' },
    'ecosistemas':       { titulo: 'Ecosistemas',          emoji: '🌍', descripcion: 'Cadenas tróficas, biomas, adaptaciones, relaciones entre especies y biodiversidad.' },
    'genetica':          { titulo: 'Genética',             emoji: '🧬', descripcion: 'ADN, genes, cromosomas, leyes de Mendel, mutaciones e ingeniería genética.' },
    'nutricion':         { titulo: 'Nutrición',            emoji: '🥗', descripcion: 'Macronutrientes, vitaminas, minerales, dieta mediterránea y alimentación saludable.' },
    'evolucion':         { titulo: 'Evolución',            emoji: '🧬', descripcion: 'Darwin, selección natural, adaptación, los pinzones de Galápagos y la especiación.' },
    'fuerzas':           { titulo: 'Fuerzas y Movimiento', emoji: '⚡', descripcion: 'Leyes de Newton, masa, peso, velocidad, gravedad, rozamiento y presión.' },
    'energia':           { titulo: 'Energía',              emoji: '🔋', descripcion: 'Energía cinética, potencial, térmica, renovable y rendimiento energético.' },
    'electricidad':      { titulo: 'Electricidad',         emoji: '💡', descripcion: 'Corriente eléctrica, circuitos, ley de Ohm, conductores, magnetismo y electroimanes.' },
    'ondas-luz':         { titulo: 'Ondas y Luz',          emoji: '🌊', descripcion: 'Ondas mecánicas, sonido, luz, reflexión, refracción y espectro electromagnético.' },
  },
  en: {
    'tabla-periodica':   { titulo: 'Periodic Table',       emoji: '⚗️', descripcion: 'Symbols, names, atomic numbers, groups and types of chemical elements.' },
    'estados-materia':   { titulo: 'States of Matter',     emoji: '🧪', descripcion: 'Solid, liquid, gas and changes of state. Properties and temperature.' },
    'mezclas-separacion':{ titulo: 'Mixtures & Separation',emoji: '🔀', descripcion: 'Homogeneous and heterogeneous mixtures. Filtration, distillation, decantation and more.' },
    'acidos-bases':      { titulo: 'Acids & Bases',        emoji: '🧴', descripcion: 'pH scale, everyday acids and bases, indicators and neutralisation.' },
    'atomos-moleculas':  { titulo: 'Atoms & Molecules',    emoji: '⚛️', descripcion: 'Atomic structure, subatomic particles, elements and compounds.' },
    'rocas-minerales':   { titulo: 'Rocks & Minerals',     emoji: '⛰️', descripcion: 'Igneous, sedimentary and metamorphic rocks, minerals and how they form.' },
    'placas-tectonicas': { titulo: 'Tectonic Plates',      emoji: '🌋', descripcion: 'Earth\'s layers, plate boundaries, earthquakes, volcanoes and continental drift.' },
    'sistema-solar':     { titulo: 'Solar System',         emoji: '🌍', descripcion: 'Planets, celestial bodies, orbital and rotational movements, and solar system features.' },
    'celula':            { titulo: 'The Cell',             emoji: '🔬', descripcion: 'Cell types, organelles, membrane, photosynthesis and cell division.' },
    'cuerpo-humano':     { titulo: 'Human Body',           emoji: '❤️', descripcion: 'Digestive, circulatory, respiratory and nervous systems. Organs and functions.' },
    'seres-vivos':       { titulo: 'Living Things',        emoji: '🌱', descripcion: 'The 5 kingdoms, classification, vertebrates, invertebrates, reproduction and photosynthesis.' },
    'ecosistemas':       { titulo: 'Ecosystems',           emoji: '🌍', descripcion: 'Food chains, biomes, adaptations, species relationships and biodiversity.' },
    'genetica':          { titulo: 'Genetics',             emoji: '🧬', descripcion: 'DNA, genes, chromosomes, Mendel\'s laws, mutations and genetic engineering.' },
    'nutricion':         { titulo: 'Nutrition',            emoji: '🥗', descripcion: 'Macronutrients, vitamins, minerals, Mediterranean diet and healthy eating.' },
    'evolucion':         { titulo: 'Evolution',            emoji: '🧬', descripcion: 'Darwin, natural selection, adaptation, the Galápagos finches and speciation.' },
    'fuerzas':           { titulo: 'Forces and Motion',    emoji: '⚡', descripcion: 'Newton\'s laws, mass, weight, speed, gravity, friction and pressure.' },
    'energia':           { titulo: 'Energy',               emoji: '🔋', descripcion: 'Kinetic, potential, thermal and renewable energy, power and efficiency.' },
    'electricidad':      { titulo: 'Electricity',          emoji: '💡', descripcion: 'Electric current, circuits, Ohm\'s law, conductors, magnetism and electromagnets.' },
    'ondas-luz':         { titulo: 'Waves and Light',      emoji: '🌊', descripcion: 'Mechanical waves, sound, light, reflection, refraction and the electromagnetic spectrum.' },
  },
  ca: {
    'tabla-periodica':   { titulo: 'Taula Periòdica',      emoji: '⚗️', descripcion: 'Símbols, noms, números atòmics, grups i tipus dels elements químics.' },
    'estados-materia':   { titulo: 'Estats de la Matèria', emoji: '🧪', descripcion: 'Sòlid, líquid, gas i canvis d\'estat. Propietats i temperatura.' },
    'mezclas-separacion':{ titulo: 'Mescles i Separació',  emoji: '🔀', descripcion: 'Mescles homogènies i heterogènies. Filtració, destil·lació, decantació i més.' },
    'acidos-bases':      { titulo: 'Àcids i Bases',        emoji: '🧴', descripcion: 'Escala de pH, àcids i bases quotidians, indicadors i neutralització.' },
    'atomos-moleculas':  { titulo: 'Àtoms i Molècules',    emoji: '⚛️', descripcion: 'Estructura atòmica, partícules subatòmiques, elements i compostos.' },
    'rocas-minerales':   { titulo: 'Roques i Minerals',    emoji: '⛰️', descripcion: 'Roques ígnies, sedimentàries i metamòrfiques, minerals i com es formen.' },
    'placas-tectonicas': { titulo: 'Plaques Tectòniques',  emoji: '🌋', descripcion: 'Capes de la Terra, vores de plaques, terratrèmols, volcans i la deriva continental.' },
    'sistema-solar':     { titulo: 'Sistema Solar',        emoji: '🌍', descripcion: 'Planetes, astres, moviments de translació i rotació, i característiques del sistema solar.' },
    'celula':            { titulo: 'La Cèl·lula',          emoji: '🔬', descripcion: 'Tipus de cèl·lula, orgànuls, membrana, fotosíntesi i divisió cel·lular.' },
    'cuerpo-humano':     { titulo: 'Cos Humà',             emoji: '❤️', descripcion: 'Sistemes digestiu, circulatori, respiratori i nerviós. Òrgans i funcions.' },
    'seres-vivos':       { titulo: 'Éssers Vius',          emoji: '🌱', descripcion: 'Els 5 regnes, classificació, vertebrats, invertebrats, reproducció i fotosíntesi.' },
    'ecosistemas':       { titulo: 'Ecosistemes',          emoji: '🌍', descripcion: 'Cadenes tròfiques, biomes, adaptacions, relacions entre espècies i biodiversitat.' },
    'genetica':          { titulo: 'Genètica',             emoji: '🧬', descripcion: 'ADN, gens, cromosomes, lleis de Mendel, mutacions i enginyeria genètica.' },
    'nutricion':         { titulo: 'Nutrició',             emoji: '🥗', descripcion: 'Macronutrients, vitamines, minerals, dieta mediterrània i alimentació saludable.' },
    'evolucion':         { titulo: 'Evolució',             emoji: '🧬', descripcion: 'Darwin, selecció natural, adaptació, els pinsans de Galápagos i l\'especiació.' },
    'fuerzas':           { titulo: 'Forces i Moviment',    emoji: '⚡', descripcion: 'Lleis de Newton, massa, pes, velocitat, gravetat, fricció i pressió.' },
    'energia':           { titulo: 'Energia',              emoji: '🔋', descripcion: 'Energia cinètica, potencial, tèrmica, renovable i rendiment energètic.' },
    'electricidad':      { titulo: 'Electricitat',         emoji: '💡', descripcion: 'Corrent elèctric, circuits, llei d\'Ohm, conductors, magnetisme i electroimants.' },
    'ondas-luz':         { titulo: 'Ones i Llum',          emoji: '🌊', descripcion: 'Ones mecàniques, so, llum, reflexió, refracció i espectre electromagnètic.' },
  },
}

// Modos de examen por tema: qué pruebas hay disponibles y sus detalles
const MODOS_POR_TEMA = {
  'tabla-periodica': [
    {
      id: 'examen',
      emoji: '📝',
      gradient: 'from-violet-500 to-purple-700',
      titulo: { es: 'Examen', en: 'Exam', ca: 'Examen' },
      descripcion: {
        es: 'Identifica elementos por símbolo, nombre o número atómico. Preguntas mixtas según el nivel elegido.',
        en: 'Identify elements by symbol, name or atomic number. Mixed questions based on the chosen level.',
        ca: 'Identifica elements per símbol, nom o número atòmic. Preguntes mixtes segons el nivell triat.',
      },
      detalles: {
        es: ['3 niveles', '10 preguntas', 'Hasta 6 tipos de pregunta', '2 intentos'],
        en: ['3 levels', '10 questions', 'Up to 6 question types', '2 attempts'],
        ca: ['3 nivells', '10 preguntes', 'Fins a 6 tipus de pregunta', '2 intents'],
      },
      path: 'tabla-periodica',
    },
    {
      id: 'encuentra-elemento-test', emoji: '🔬', gradient: 'from-cyan-600 to-teal-800',
      titulo: { es:'Encuentra el Elemento', en:'Find the Element', ca:'Troba l\'Element' },
      descripcion: { es:'Con la mecánica del juego: toca la celda de la tabla periódica que pide la pista — nombre, número atómico o categoría.', en:'Using the game mechanic: tap the periodic table cell the clue asks for — name, atomic number or category.', ca:'Amb la mecànica del joc: toca la cel·la de la taula periòdica que demana la pista — nom, número atòmic o categoria.' },
      detalles: { es:['3 niveles','10 preguntas','Sin cronómetro','Con el juego'], en:['3 levels','10 questions','No timer','With the game'], ca:['3 nivells','10 preguntes','Sense cronòmetre','Amb el joc'] },
      path: 'encuentra-elemento-test',
    },
  ],
  'estados-materia': [
    {
      id: 'examen', emoji: '📝', gradient: 'from-teal-500 to-cyan-700',
      titulo: { es:'Examen', en:'Exam', ca:'Examen' },
      descripcion: { es:'Identifica estados, cambios de estado y sus propiedades. Preguntas de opción múltiple con explicación.', en:'Identify states, changes of state and their properties. Multiple choice questions with explanation.', ca:'Identifica estats, canvis d\'estat i les seves propietats. Preguntes d\'opció múltiple amb explicació.' },
      detalles: { es:['2 niveles','10 preguntas','Opción múltiple','Explicación tras cada respuesta'], en:['2 levels','10 questions','Multiple choice','Explanation after each answer'], ca:['2 nivells','10 preguntes','Opció múltiple','Explicació després de cada resposta'] },
      path: 'estados-materia',
    },
  ],
  'mezclas-separacion': [
    {
      id: 'examen', emoji: '📝', gradient: 'from-orange-500 to-amber-600',
      titulo: { es:'Examen', en:'Exam', ca:'Examen' },
      descripcion: { es:'Tipos de mezclas y métodos de separación: filtración, destilación, decantación, imantación y más.', en:'Types of mixtures and separation methods: filtration, distillation, decantation, magnetism and more.', ca:'Tipus de mescles i mètodes de separació: filtració, destil·lació, decantació, imantació i més.' },
      detalles: { es:['2 niveles','10 preguntas','Opción múltiple','Explicación tras cada respuesta'], en:['2 levels','10 questions','Multiple choice','Explanation after each answer'], ca:['2 nivells','10 preguntes','Opció múltiple','Explicació després de cada resposta'] },
      path: 'mezclas-separacion',
    },
  ],
  'acidos-bases': [
    {
      id: 'examen', emoji: '📝', gradient: 'from-green-500 to-emerald-700',
      titulo: { es:'Examen', en:'Exam', ca:'Examen' },
      descripcion: { es:'pH, ácidos y bases cotidianos, indicadores de color y reacción de neutralización.', en:'pH, everyday acids and bases, colour indicators and neutralisation reaction.', ca:'pH, àcids i bases quotidians, indicadors de color i reacció de neutralització.' },
      detalles: { es:['1 nivel (ESO)','10 preguntas','Opción múltiple','Explicación tras cada respuesta'], en:['1 level (Secondary)','10 questions','Multiple choice','Explanation after each answer'], ca:['1 nivell (ESO)','10 preguntes','Opció múltiple','Explicació després de cada resposta'] },
      path: 'acidos-bases',
    },
  ],
  'atomos-moleculas': [
    {
      id: 'examen', emoji: '📝', gradient: 'from-blue-500 to-indigo-700',
      titulo: { es:'Examen', en:'Exam', ca:'Examen' },
      descripcion: { es:'Estructura atómica, partículas subatómicas, elementos, compuestos e isótopos.', en:'Atomic structure, subatomic particles, elements, compounds and isotopes.', ca:'Estructura atòmica, partícules subatòmiques, elements, compostos i isòtops.' },
      detalles: { es:['2 niveles','10 preguntas','Opción múltiple','Explicación tras cada respuesta'], en:['2 levels','10 questions','Multiple choice','Explanation after each answer'], ca:['2 nivells','10 preguntes','Opció múltiple','Explicació després de cada resposta'] },
      path: 'atomos-moleculas',
    },
    {
      id: 'balanza-ecuaciones-test', emoji: '⚗️', gradient: 'from-emerald-500 to-teal-700',
      titulo: { es:'Átomos en Equilibrio', en:'Atoms in Balance', ca:'Àtoms en Equilibri' },
      descripcion: { es:'Con la mecánica del juego: ajusta los coeficientes hasta que haya los mismos átomos de cada elemento a los dos lados de la reacción.', en:'Using the game mechanic: adjust the coefficients until there are the same atoms of each element on both sides of the reaction.', ca:'Amb la mecànica del joc: ajusta els coeficients fins que hi hagi els mateixos àtoms de cada element als dos costats de la reacció.' },
      detalles: { es:['3 niveles','10 preguntas','Sin cronómetro','Con el juego'], en:['3 levels','10 questions','No timer','With the game'], ca:['3 nivells','10 preguntes','Sense cronòmetre','Amb el joc'] },
      path: 'balanza-ecuaciones-test',
    },
  ],
  'sistema-solar': [
    {
      id: 'examen', emoji: '📝', gradient: 'from-indigo-500 to-purple-700',
      titulo: { es:'Examen', en:'Exam', ca:'Examen' },
      descripcion: { es:'Planetas, el Sol, la Luna, tipos de astros y movimientos de la Tierra. Preguntas de opción múltiple con explicación.', en:'Planets, the Sun, the Moon, types of celestial bodies and Earth\'s movements. Multiple choice questions with explanation.', ca:'Planetes, el Sol, la Lluna, tipus d\'astres i moviments de la Terra. Preguntes d\'opció múltiple amb explicació.' },
      detalles: { es:['2 niveles','10 preguntas','Opción múltiple','Explicación tras cada respuesta'], en:['2 levels','10 questions','Multiple choice','Explanation after each answer'], ca:['2 nivells','10 preguntes','Opció múltiple','Explicació després de cada resposta'] },
      path: 'sistema-solar',
    },
    {
      id: 'orbita-test', emoji: '🛰️', gradient: 'from-cyan-700 to-indigo-900',
      titulo: { es:'Órbita', en:'Orbit', ca:'Òrbita' },
      descripcion: { es:'Con la mecánica del juego: lanza la sonda a la distancia al Sol donde crees que está cada planeta.', en:'Using the game mechanic: launch the probe to the distance from the Sun where you think each planet is.', ca:'Amb la mecànica del joc: llança la sonda a la distància al Sol on creus que és cada planeta.' },
      detalles: { es:['10 preguntas','Sin cronómetro','Acierto o fallo','Con el juego'], en:['10 questions','No timer','Right or wrong','With the game'], ca:['10 preguntes','Sense cronòmetre','Encert o error','Amb el joc'] },
      path: 'orbita-test',
    },
  ],
  'rocas-minerales': [
    {
      id: 'examen', emoji: '📝', gradient: 'from-stone-500 to-neutral-700',
      titulo: { es:'Examen', en:'Exam', ca:'Examen' },
      descripcion: { es:'Rocas ígneas, sedimentarias y metamórficas, cómo se forman y en qué se diferencian de los minerales.', en:'Igneous, sedimentary and metamorphic rocks, how they form and how they differ from minerals.', ca:'Roques ígnies, sedimentàries i metamòrfiques, com es formen i en què es diferencien dels minerals.' },
      detalles: { es:['2 niveles','10 preguntas','Opción múltiple','Explicación tras cada respuesta'], en:['2 levels','10 questions','Multiple choice','Explanation after each answer'], ca:['2 nivells','10 preguntes','Opció múltiple','Explicació després de cada resposta'] },
      path: 'rocas-minerales',
    },
  ],
  'placas-tectonicas': [
    {
      id: 'examen', emoji: '📝', gradient: 'from-orange-600 to-red-800',
      titulo: { es:'Examen', en:'Exam', ca:'Examen' },
      descripcion: { es:'Capas de la Tierra, tipos de bordes de placa, terremotos, volcanes y la deriva continental de Wegener.', en:'Earth\'s layers, types of plate boundaries, earthquakes, volcanoes and Wegener\'s continental drift.', ca:'Capes de la Terra, tipus de vores de placa, terratrèmols, volcans i la deriva continental de Wegener.' },
      detalles: { es:['2 niveles','10 preguntas','Opción múltiple','Explicación tras cada respuesta'], en:['2 levels','10 questions','Multiple choice','Explanation after each answer'], ca:['2 nivells','10 preguntes','Opció múltiple','Explicació després de cada resposta'] },
      path: 'placas-tectonicas',
    },
  ],
  'celula': [
    {
      id: 'examen', emoji: '📝', gradient: 'from-green-500 to-teal-700',
      titulo: { es:'Examen', en:'Exam', ca:'Examen' },
      descripcion: { es:'Células procariotas y eucariotas, orgánulos, diferencias animal/vegetal, fotosíntesis y división celular.', en:'Prokaryotic and eukaryotic cells, organelles, animal/plant differences, photosynthesis and cell division.', ca:'Cèl·lules procariotes i eucariotes, orgànuls, diferències animal/vegetal, fotosíntesi i divisió cel·lular.' },
      detalles: { es:['1 nivel (ESO)','10 preguntas','Opción múltiple','Explicación tras cada respuesta'], en:['1 level (Secondary)','10 questions','Multiple choice','Explanation after each answer'], ca:['1 nivell (ESO)','10 preguntes','Opció múltiple','Explicació després de cada resposta'] },
      path: 'celula',
    },
  ],
  'cuerpo-humano': [
    {
      id: 'examen', emoji: '📝', gradient: 'from-red-500 to-rose-700',
      titulo: { es:'Examen', en:'Exam', ca:'Examen' },
      descripcion: { es:'Sistemas digestivo, circulatorio, respiratorio y nervioso. Órganos, funciones y procesos clave.', en:'Digestive, circulatory, respiratory and nervous systems. Organs, functions and key processes.', ca:'Sistemes digestiu, circulatori, respiratori i nerviós. Òrgans, funcions i processos clau.' },
      detalles: { es:['2 niveles','10 preguntas','Opción múltiple','Explicación tras cada respuesta'], en:['2 levels','10 questions','Multiple choice','Explanation after each answer'], ca:['2 nivells','10 preguntes','Opció múltiple','Explicació després de cada resposta'] },
      path: 'cuerpo-humano',
    },
    {
      id: 'rayos-x-test', emoji: '🧠', gradient: 'from-indigo-700 to-slate-900',
      titulo: { es:'Rayos X', en:'X-Ray', ca:'Raigs X' },
      descripcion: { es:'Con la mecánica del juego: toca la silueta del cuerpo donde crees que está el órgano pedido.', en:'Using the game mechanic: tap the body silhouette where you think the requested organ is.', ca:'Amb la mecànica del joc: toca la silueta del cos on creus que és l\'òrgan demanat.' },
      detalles: { es:['10 preguntas','Sin cronómetro','Acierto o fallo','Con el juego'], en:['10 questions','No timer','Right or wrong','With the game'], ca:['10 preguntes','Sense cronòmetre','Encert o error','Amb el joc'] },
      path: 'rayos-x-test',
    },
  ],
  'seres-vivos': [
    {
      id: 'examen', emoji: '📝', gradient: 'from-emerald-500 to-green-700',
      titulo: { es:'Examen', en:'Exam', ca:'Examen' },
      descripcion: { es:'Los 5 reinos, clasificación de animales, plantas, hongos y bacterias. Vertebrados e invertebrados.', en:'The 5 kingdoms, classification of animals, plants, fungi and bacteria. Vertebrates and invertebrates.', ca:'Els 5 regnes, classificació d\'animals, plantes, fongs i bacteris. Vertebrats i invertebrats.' },
      detalles: { es:['2 niveles','10 preguntas','Opción múltiple','Explicación tras cada respuesta'], en:['2 levels','10 questions','Multiple choice','Explanation after each answer'], ca:['2 nivells','10 preguntes','Opció múltiple','Explicació després de cada resposta'] },
      path: 'seres-vivos',
    },
  ],
  'ecosistemas': [
    {
      id: 'examen', emoji: '📝', gradient: 'from-teal-500 to-emerald-700',
      titulo: { es:'Examen', en:'Exam', ca:'Examen' },
      descripcion: { es:'Cadenas y redes tróficas, biomas del planeta, adaptaciones animales y relaciones entre especies.', en:'Food chains and webs, planet biomes, animal adaptations and species relationships.', ca:'Cadenes i xarxes tròfiques, biomes del planeta, adaptacions animals i relacions entre espècies.' },
      detalles: { es:['2 niveles','10 preguntas','Opción múltiple','Explicación tras cada respuesta'], en:['2 levels','10 questions','Multiple choice','Explanation after each answer'], ca:['2 nivells','10 preguntes','Opció múltiple','Explicació després de cada resposta'] },
      path: 'ecosistemas',
    },
    {
      id: 'cadena-alimentaria-test', emoji: '🌿', gradient: 'from-lime-600 to-green-800',
      titulo: { es:'Cadena Alimentaria', en:'Food Chain', ca:'Cadena Alimentària' },
      descripcion: { es:'Con la mecánica del juego: elige el rol trófico de cada organismo (productor, consumidor o descomponedor) a partir de un dato real.', en:'Using the game mechanic: pick each organism\'s trophic role (producer, consumer or decomposer) from a real fact.', ca:'Amb la mecànica del joc: tria el rol tròfic de cada organisme (productor, consumidor o descomponedor) a partir d\'una dada real.' },
      detalles: { es:['3 niveles','10 preguntas','Sin cronómetro','Con el juego'], en:['3 levels','10 questions','No timer','With the game'], ca:['3 nivells','10 preguntes','Sense cronòmetre','Amb el joc'] },
      path: 'cadena-alimentaria-test',
    },
  ],
  'genetica': [
    {
      id: 'examen', emoji: '📝', gradient: 'from-purple-500 to-violet-700',
      titulo: { es:'Examen', en:'Exam', ca:'Examen' },
      descripcion: { es:'ADN, cromosomas, genes, leyes de Mendel, mutaciones, ingeniería genética y clonación.', en:'DNA, chromosomes, genes, Mendel\'s laws, mutations, genetic engineering and cloning.', ca:'ADN, cromosomes, gens, lleis de Mendel, mutacions, enginyeria genètica i clonació.' },
      detalles: { es:['1 nivel (ESO)','10 preguntas','Opción múltiple','Explicación tras cada respuesta'], en:['1 level (Secondary)','10 questions','Multiple choice','Explanation after each answer'], ca:['1 nivell (ESO)','10 preguntes','Opció múltiple','Explicació després de cada resposta'] },
      path: 'genetica',
    },
  ],
  'nutricion': [
    {
      id: 'examen', emoji: '📝', gradient: 'from-lime-500 to-green-600',
      titulo: { es:'Examen', en:'Exam', ca:'Examen' },
      descripcion: { es:'Macronutrientes, vitaminas liposolubles e hidrosolubles, dieta mediterránea y alimentación saludable.', en:'Macronutrients, fat-soluble and water-soluble vitamins, Mediterranean diet and healthy eating.', ca:'Macronutrients, vitamines liposolubles i hidrosolubles, dieta mediterrània i alimentació saludable.' },
      detalles: { es:['2 niveles','10 preguntas','Opción múltiple','Explicación tras cada respuesta'], en:['2 levels','10 questions','Multiple choice','Explanation after each answer'], ca:['2 nivells','10 preguntes','Opció múltiple','Explicació després de cada resposta'] },
      path: 'nutricion',
    },
  ],
  'evolucion': [
    {
      id: 'examen', emoji: '📝', gradient: 'from-lime-600 to-green-800',
      titulo: { es:'Examen', en:'Exam', ca:'Examen' },
      descripcion: { es:'Darwin, selección natural, adaptación, los pinzones de Galápagos y Lamarck frente a Darwin.', en:'Darwin, natural selection, adaptation, the Galápagos finches and Lamarck versus Darwin.', ca:'Darwin, selecció natural, adaptació, els pinsans de Galápagos i Lamarck davant Darwin.' },
      detalles: { es:['2 niveles','10 preguntas','Opción múltiple','Explicación tras cada respuesta'], en:['2 levels','10 questions','Multiple choice','Explanation after each answer'], ca:['2 nivells','10 preguntes','Opció múltiple','Explicació després de cada resposta'] },
      path: 'evolucion',
    },
  ],
  'fuerzas': [
    {
      id: 'examen', emoji: '📝', gradient: 'from-yellow-500 to-orange-600',
      titulo: { es:'Examen', en:'Exam', ca:'Examen' },
      descripcion: { es:'Leyes de Newton, masa y peso, velocidad, gravedad, rozamiento, presión y principio de Arquímedes.', en:'Newton\'s laws, mass and weight, speed, gravity, friction, pressure and Archimedes\' principle.', ca:'Lleis de Newton, massa i pes, velocitat, gravetat, fricció, pressió i principi d\'Arquímedes.' },
      detalles: { es:['2 niveles','10 preguntas','Opción múltiple','Explicación tras cada respuesta'], en:['2 levels','10 questions','Multiple choice','Explanation after each answer'], ca:['2 nivells','10 preguntes','Opció múltiple','Explicació després de cada resposta'] },
      path: 'fuerzas',
    },
    {
      id: 'fuerza-neta-test', emoji: '🧭', gradient: 'from-sky-500 to-blue-700',
      titulo: { es:'Fuerza Neta', en:'Net Force', ca:'Força Neta' },
      descripcion: { es:'Con la mecánica del juego: suma las fuerzas del diagrama y elige la dirección resultante.', en:'Using the game mechanic: add the forces in the diagram and pick the resultant direction.', ca:'Amb la mecànica del joc: suma les forces del diagrama i tria la direcció resultant.' },
      detalles: { es:['3 niveles','10 preguntas','Sin cronómetro','Con el juego'], en:['3 levels','10 questions','No timer','With the game'], ca:['3 nivells','10 preguntes','Sense cronòmetre','Amb el joc'] },
      path: 'fuerza-neta-test',
    },
    {
      id: 'balanza-test', emoji: '⚖️', gradient: 'from-teal-500 to-emerald-700',
      titulo: { es:'Palancas y Momentos', en:'Levers & Moments', ca:'Palanques i Moments' },
      descripcion: { es:'Con la mecánica del juego: coloca el peso a la distancia que equilibra la balanza (momento = peso × distancia).', en:'Using the game mechanic: place the weight at the distance that balances the scale (moment = weight × distance).', ca:'Amb la mecànica del joc: col·loca el pes a la distància que equilibra la balança (moment = pes × distància).' },
      detalles: { es:['3 niveles','10 preguntas','Sin cronómetro','Con el juego'], en:['3 levels','10 questions','No timer','With the game'], ca:['3 nivells','10 preguntes','Sense cronòmetre','Amb el joc'] },
      path: 'balanza-test',
    },
  ],
  'energia': [
    {
      id: 'examen', emoji: '📝', gradient: 'from-green-500 to-teal-600',
      titulo: { es:'Examen', en:'Exam', ca:'Examen' },
      descripcion: { es:'Tipos de energía, transformaciones, fuentes renovables y no renovables, rendimiento y potencia.', en:'Energy types, transformations, renewable and non-renewable sources, efficiency and power.', ca:'Tipus d\'energia, transformacions, fonts renovables i no renovables, rendiment i potència.' },
      detalles: { es:['2 niveles','10 preguntas','Opción múltiple','Explicación tras cada respuesta'], en:['2 levels','10 questions','Multiple choice','Explanation after each answer'], ca:['2 nivells','10 preguntes','Opció múltiple','Explicació després de cada resposta'] },
      path: 'energia',
    },
  ],
  'electricidad': [
    {
      id: 'examen', emoji: '📝', gradient: 'from-amber-500 to-yellow-600',
      titulo: { es:'Examen', en:'Exam', ca:'Examen' },
      descripcion: { es:'Corriente, tensión, resistencia, ley de Ohm, circuitos serie y paralelo, conductores y magnetismo.', en:'Current, voltage, resistance, Ohm\'s law, series and parallel circuits, conductors and magnetism.', ca:'Corrent, tensió, resistència, llei d\'Ohm, circuits sèrie i paral·lel, conductors i magnetisme.' },
      detalles: { es:['2 niveles','10 preguntas','Opción múltiple','Explicación tras cada respuesta'], en:['2 levels','10 questions','Multiple choice','Explanation after each answer'], ca:['2 nivells','10 preguntes','Opció múltiple','Explicació després de cada resposta'] },
      path: 'electricidad',
    },
    {
      id: 'circuito-cerrado-test', emoji: '💡', gradient: 'from-amber-500 to-orange-700',
      titulo: { es:'Circuito Cerrado', en:'Circuit Complete', ca:'Circuit Complet' },
      descripcion: { es:'Con la mecánica del juego: predice si cada bombilla brilla apagada, tenue o a tope, según el interruptor y si están en serie o en paralelo.', en:'Using the game mechanic: predict whether each bulb is off, dim or at full brightness, based on the switch and whether they\'re in series or parallel.', ca:'Amb la mecànica del joc: prediu si cada bombeta brilla apagada, tènue o a tota potència, segons l\'interruptor i si són en sèrie o en paral·lel.' },
      detalles: { es:['3 niveles','10 preguntas','Sin cronómetro','Con el juego'], en:['3 levels','10 questions','No timer','With the game'], ca:['3 nivells','10 preguntes','Sense cronòmetre','Amb el joc'] },
      path: 'circuito-cerrado-test',
    },
  ],
  'ondas-luz': [
    {
      id: 'examen', emoji: '📝', gradient: 'from-blue-500 to-cyan-600',
      titulo: { es:'Examen', en:'Exam', ca:'Examen' },
      descripcion: { es:'Ondas mecánicas y electromagnéticas, sonido, luz, reflexión, refracción y espectro electromagnético.', en:'Mechanical and electromagnetic waves, sound, light, reflection, refraction and electromagnetic spectrum.', ca:'Ones mecàniques i electromagnètiques, so, llum, reflexió, refracció i espectre electromagnètic.' },
      detalles: { es:['2 niveles','10 preguntas','Opción múltiple','Explicación tras cada respuesta'], en:['2 levels','10 questions','Multiple choice','Explanation after each answer'], ca:['2 nivells','10 preguntes','Opció múltiple','Explicació després de cada resposta'] },
      path: 'ondas-luz',
    },
  ],
}

export default function QuimicaTema() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const en = lang === 'en', ca = lang === 'ca'
  const { tema } = useParams()

  const temasMeta = TEMAS_META[lang] || TEMAS_META.es
  const meta = temasMeta[tema]

  const disc = getDisciplina(disciplinaDeTema(tema))
  const discPath = `/estudiar/${disc.id}`

  if (!meta) { navigate(localPath('/estudiar')); return null }

  const modos = [
    ...(MODOS_POR_TEMA[tema] || []),
    ...ciclosPorTema(tema).map(c => ({
      id: c.id, emoji: c.emoji, gradient: c.gradient,
      titulo: c.label, descripcion: c.descripcion,
      detalles: {
        es: [nivelesChip(c.niveles, 'es'), `${c.total} pasos`, 'Antes o después'],
        en: [nivelesChip(c.niveles, 'en'), `${c.total} steps`, 'Before or after'],
        ca: [nivelesChip(c.niveles, 'ca'), `${c.total} passos`, 'Abans o després'],
      },
      path: `ciclo/${c.id}`,
    })),
    ...diagnosticosPorTema(tema).map(d => ({
      id: `diag-${d.id}`, emoji: '💉', gradient: 'from-cyan-500 to-teal-700',
      titulo: {
        es: `Diagnóstico: ${d.titulo.es}`, en: `Diagnosis: ${d.titulo.en}`, ca: `Diagnòstic: ${d.titulo.ca}`,
      },
      descripcion: {
        es: 'Descarta candidatos con pistas científicas progresivas hasta dar con el correcto. Otra forma de repasar el mismo temario.',
        en: 'Rule out candidates with progressive science clues until you find the right one. Another way to revise the same content.',
        ca: 'Descarta candidats amb pistes científiques progressives fins a trobar el correcte. Una altra manera de repassar el mateix temari.',
      },
      detalles: {
        es: ['Deducción', `${d.candidatos.length} candidatos`, 'Sin cronómetro'],
        en: ['Deduction', `${d.candidatos.length} candidates`, 'No timer'],
        ca: ['Deducció', `${d.candidatos.length} candidats`, 'Sense cronòmetre'],
      },
      path: `diagnostico/${d.id}`,
    })),
  ]
  const discLabel = disc.label[lang] ?? disc.label.es
  const pageMeta = <PageMeta title={meta.titulo} description={meta.descripcion} path={`${discPath}/${tema}`} lang={lang} />
  const courseSchema = <CourseSchema name={meta.titulo} description={meta.descripcion} path={`${discPath}/${tema}`} lang={lang} subject={discLabel} />
  const breadcrumb = <BreadcrumbSchema lang={lang} items={[
    { name: en ? 'Study' : ca ? 'Estudiar' : 'Estudiar', path: '/estudiar' },
    { name: discLabel, path: discPath },
    { name: meta.titulo, path: `${discPath}/${tema}` },
  ]} />

  function getLabel(obj) {
    return lang === 'en' ? obj.en : lang === 'ca' ? obj.ca : obj.es
  }

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      {pageMeta}{courseSchema}{breadcrumb}
      <div className="max-w-2xl mx-auto w-full mb-6">
        <p className="text-white/30 text-xs mb-4">
          <button onClick={() => navigate(localPath('/estudiar'))} className="hover:text-white/60 transition-colors">
            {ca ? 'Estudiar' : en ? 'Study' : 'Estudiar'}
          </button>
          {' / '}
          <button onClick={() => navigate(localPath(discPath))} className="hover:text-white/60 transition-colors">
            {discLabel}
          </button>
          {' / '}
          <span className="text-white/50">{meta.titulo}</span>
        </p>

        <div className="flex items-center gap-4">
          <span className="text-5xl">{meta.emoji}</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{meta.titulo}</h1>
            <p className="text-white/40 text-sm mt-0.5">{meta.descripcion}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full space-y-4">
        <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">
          {ca ? 'Proves disponibles' : en ? 'Available tests' : 'Pruebas disponibles'}
        </p>

        {modos.map(modo => (
          <button
            key={modo.id}
            onClick={() => navigate(localPath(`/examen/${modo.path}`), {
              state: { backPath: `${discPath}/${tema}` }
            })}
            className="w-full group relative rounded-2xl overflow-hidden text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/40"
          >
            <div className={`bg-gradient-to-br ${modo.gradient} p-6`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">{modo.emoji}</span>
                    <h3 className="font-black text-white text-xl">{getLabel(modo.titulo)}</h3>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">{getLabel(modo.descripcion)}</p>
                  <div className="flex flex-wrap gap-2">
                    {getLabel(modo.detalles).map(d => (
                      <span key={d} className="text-xs font-semibold bg-black/25 text-white/80 px-2.5 py-1 rounded-full border border-white/10">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
                    <span className="text-white font-black text-lg">→</span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
