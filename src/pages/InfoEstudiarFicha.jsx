import { useParams, Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const FICHAS_ES = {
  'tabla-periodica': {
    titulo: 'Tabla Periódica de los Elementos',
    subtitulo: 'Examen Interactivo de Química para Primaria, ESO y Bachillerato',
    emoji: '⚗️', gradient: 'from-violet-500 to-purple-700',
    examPath: '/examen/tabla-periodica',
    studyPath: '/estudiar/quimica/tabla-periodica',
    asignatura: 'Química', niveles: 'Primaria, ESO, Bachillerato',
    intro: 'Domina los símbolos, nombres y números atómicos de los elementos químicos con exámenes adaptativos por nivel. En Primaria identificas los más comunes; en ESO añades número atómico y clasificación; en Bachillerato trabajas grupos, periodos e isótopos.',
    beneficios: [
      { titulo: 'Aprendizaje por Niveles', texto: 'Tres niveles progresivos (Primaria, ESO, Bachillerato) con tipos de pregunta distintos en cada uno. El sistema no te exige saber todo de golpe.' },
      { titulo: 'Preguntas Mixtas', texto: 'Símbolo → nombre, nombre → símbolo, número atómico → elemento, clasificar por tipo. La variedad evita el efecto de memorización superficial.' },
      { titulo: 'Retroalimentación Inmediata', texto: 'Tras cada error, el elemento correcto se revela con su símbolo visual. Aprendes más del fallo que del acierto.' },
    ],
    ejemplo: 'Un alumno de 3º ESO practica 10 minutos al día durante una semana. Al cabo de 5 días, ya identifica los 20 primeros elementos sin vacilar.',
    consejos: [
      'Empieza por los primeros 20 elementos — son los que más salen en exámenes de Primaria y 1º ESO.',
      'Asocia cada símbolo con algo visual o fonético: Na (sodio) suena a "natrio" en latín, Fe (hierro) a "ferrum".',
      'Practica primero de símbolo a nombre y luego al revés — son dos memorias distintas.',
      'En Bachillerato, aprende los grupos por columnas: todos los alcalinos tienen propiedades similares.',
    ],
    relacionados: [
      { nombre: 'Estados de la Materia', slug: 'estados-materia' },
      { nombre: 'Átomos y Moléculas', slug: 'atomos-moleculas' },
      { nombre: 'Mezclas y Separación', slug: 'mezclas-separacion' },
    ],
  },
  'estados-materia': {
    titulo: 'Estados de la Materia',
    subtitulo: 'Examen de Física y Química — Sólido, Líquido, Gas y Cambios de Estado',
    emoji: '🧪', gradient: 'from-teal-500 to-cyan-700',
    examPath: '/examen/estados-materia',
    studyPath: '/estudiar/quimica/estados-materia',
    asignatura: 'Física y Química', niveles: 'Primaria, ESO',
    intro: 'Aprende a identificar los tres estados de la materia, sus propiedades físicas y todos los cambios de estado — fusión, solidificación, evaporación, condensación y sublimación — con preguntas de opción múltiple adaptadas a Primaria y ESO.',
    beneficios: [
      { titulo: 'Explicación tras Cada Respuesta', texto: 'Independientemente de si aciertas o fallas, ves la explicación científica. El aprendizaje no se detiene en el error.' },
      { titulo: 'Ejemplos Cotidianos', texto: 'Las preguntas usan hielo, chocolate, vapor o el espejo del baño. Conectar la teoría con la vida real fija el concepto mejor que cualquier definición.' },
      { titulo: 'Dos Niveles Diferenciados', texto: 'Primaria trabaja conceptos básicos y cambios principales. ESO añade sublimación, vaporización, compresibilidad y temperaturas de cambio de estado.' },
    ],
    ejemplo: 'Una alumna de 5º de Primaria aprende que la condensación es el vapor convirtiéndose en gotitas al ver su espejo empañado después de ducharse. La pregunta lo conecta.',
    consejos: [
      'Memoriza los 6 cambios de estado con la regla: Fusión↑ Solidificación↓ / Evaporación↑ Condensación↓ / Sublimación↑ Deposición↓',
      'Para ESO: recuerda que solo los gases son compresibles fácilmente — sus moléculas tienen espacio libre.',
      'Practica poniendo ejemplos cotidianos para cada cambio de estado antes de hacer el examen.',
      'El truco del punto de ebullición: agua hierve a 100°C, se congela a 0°C — los dos números más importantes.',
    ],
    relacionados: [
      { nombre: 'Átomos y Moléculas', slug: 'atomos-moleculas' },
      { nombre: 'Tabla Periódica', slug: 'tabla-periodica' },
      { nombre: 'Mezclas y Separación', slug: 'mezclas-separacion' },
    ],
  },
  'mezclas-separacion': {
    titulo: 'Mezclas y Métodos de Separación',
    subtitulo: 'Filtración, Destilación, Decantación y más — Primaria y ESO',
    emoji: '🔀', gradient: 'from-orange-500 to-amber-600',
    examPath: '/examen/mezclas-separacion',
    studyPath: '/estudiar/quimica/mezclas-separacion',
    asignatura: 'Física y Química', niveles: 'Primaria, ESO',
    intro: 'Distingue mezclas homogéneas de heterogéneas y aprende qué método de separación usar en cada caso. Desde tamizar harina hasta destilar alcohol, el examen cubre todos los métodos del currículo oficial con ejemplos reales.',
    beneficios: [
      { titulo: 'Aplicación Práctica', texto: 'Cada método de separación se presenta con un ejemplo de la vida real: café (filtración), sal marina (evaporación), vino (destilación). La teoría tiene sentido cuando ves para qué sirve.' },
      { titulo: 'Progresión Curricular', texto: 'Primaria trabaja los tipos de mezcla y métodos básicos. ESO añade cromatografía, cristalización y la diferencia entre destilación y evaporación.' },
      { titulo: 'Preguntas de Aplicación', texto: 'No es solo memorizar nombres. El examen pregunta qué método usarías para separar arena del agua, o cómo se obtiene la sal del mar. Razonamiento aplicado.' },
    ],
    ejemplo: 'Un alumno de 2º ESO entiende por qué una cafetera de goteo es filtración y por qué el aceite flota sobre el agua al ver la pregunta de decantación.',
    consejos: [
      'Aprende los 6 métodos básicos con su ejemplo clave: filtración=café, destilación=alcohol, decantación=aceite+agua, imantación=hierro+arena, tamizado=harina, evaporación=sal marina.',
      'Para distinguir homogénea/heterogénea: ¿ves los componentes a simple vista? Heterogénea. ¿No? Homogénea.',
      'Recuerda que la destilación RECOGE el vapor condensado — eso la diferencia de la simple evaporación.',
      'Para ESO: la cromatografía separa por velocidad de desplazamiento, no por tamaño ni densidad.',
    ],
    relacionados: [
      { nombre: 'Estados de la Materia', slug: 'estados-materia' },
      { nombre: 'Ácidos y Bases', slug: 'acidos-bases' },
      { nombre: 'Átomos y Moléculas', slug: 'atomos-moleculas' },
    ],
  },
  'acidos-bases': {
    titulo: 'Ácidos y Bases — Escala de pH',
    subtitulo: 'Examen de Química para ESO — pH, Indicadores y Neutralización',
    emoji: '🧴', gradient: 'from-green-500 to-emerald-700',
    examPath: '/examen/acidos-bases',
    studyPath: '/estudiar/quimica/acidos-bases',
    asignatura: 'Química', niveles: 'ESO',
    intro: 'Aprende a usar la escala de pH del 0 al 14, identifica ácidos y bases cotidianos, entiende qué hacen los indicadores como el tornasol y comprende la reacción de neutralización con ejemplos del laboratorio y la cocina.',
    beneficios: [
      { titulo: 'pH en la Vida Cotidiana', texto: 'El zumo de limón, el jabón, la lejía y el antiácido. Identificar ácidos y bases en productos del día a día hace que la química deje de ser abstracta.' },
      { titulo: 'Lógica de la Neutralización', texto: 'Entender por qué tomamos antiácidos cuando nos duele el estómago, o por qué el bicarbonato sube el pH de una solución ácida, es química aplicada a la salud.' },
      { titulo: 'Indicadores Visuales', texto: 'El tornasol cambia de color: rojo en ácido, azul en base. Las preguntas usan estos indicadores para que el aprendizaje sea visual e intuitivo.' },
    ],
    ejemplo: 'Un alumno de 3º ESO relaciona el HCl del estómago con el ácido clorhídrico del laboratorio. De repente la química tiene sentido: el mismo ácido que digiere la comida puede corroer metales.',
    consejos: [
      'Memoriza los extremos de la escala: 0=ácido fuerte (HCl), 7=neutro (agua pura), 14=base fuerte (NaOH=lejía).',
      'Ácidos producen H⁺, bases producen OH⁻. Una frase, dos conceptos clave.',
      'Neutralización: ácido + base → sal + agua. La ecuación más básica de la química de ESO.',
      'El tornasol: ROJO=ácido (piensa en rojo=peligro=ácido), AZUL=base.',
    ],
    relacionados: [
      { nombre: 'Átomos y Moléculas', slug: 'atomos-moleculas' },
      { nombre: 'Mezclas y Separación', slug: 'mezclas-separacion' },
      { nombre: 'Tabla Periódica', slug: 'tabla-periodica' },
    ],
  },
  'atomos-moleculas': {
    titulo: 'Átomos y Moléculas — Estructura Atómica',
    subtitulo: 'Protones, Neutrones, Electrones, Elementos y Compuestos',
    emoji: '⚛️', gradient: 'from-blue-500 to-indigo-700',
    examPath: '/examen/atomos-moleculas',
    studyPath: '/estudiar/quimica/atomos-moleculas',
    asignatura: 'Física y Química', niveles: 'Primaria, ESO',
    intro: 'Desde la estructura básica del átomo hasta los isótopos, este examen cubre todo lo que necesitas saber sobre la materia a nivel subatómico. Primaria trabaja conceptos esenciales; ESO profundiza en número atómico, número másico y diferencia entre elemento y compuesto.',
    beneficios: [
      { titulo: 'De lo Simple a lo Complejo', texto: 'Primaria aprende que los átomos tienen núcleo y electrones, que las moléculas son átomos unidos. ESO añade protones, neutrones, Z, A e isótopos. La progresión es natural.' },
      { titulo: 'Conexión con la Tabla Periódica', texto: 'Entender el número atómico Z es la clave para leer la tabla periódica. Este examen y el de Tabla Periódica se complementan perfectamente.' },
      { titulo: 'Fórmulas Químicas Explicadas', texto: 'H₂O tiene 2 hidrógenos y 1 oxígeno: 3 átomos en total. Las preguntas enseñan a leer fórmulas químicas antes de que aparezcan en otros exámenes.' },
    ],
    ejemplo: 'Un alumno de 4º ESO que no entendía los isótopos ve la pregunta del ¹²C y ¹⁴C: mismo número de protones (carbono), diferente número de neutrones. En ese momento lo entiende.',
    consejos: [
      'Protón(+) y neutrón(sin carga) van al núcleo. Electrón(-) orbita fuera. Una imagen mental vale más que memorizar.',
      'Número atómico Z = número de protones = lo que define el elemento. Número másico A = protones + neutrones.',
      'Para calcular neutrones: N = A − Z. Si un carbono tiene A=12 y Z=6, tiene 6 neutrones.',
      'Isótopos = mismo elemento (mismo Z), distinto A (distinto número de neutrones). Ejemplo: ¹²C y ¹⁴C son ambos carbono.',
    ],
    relacionados: [
      { nombre: 'Tabla Periódica', slug: 'tabla-periodica' },
      { nombre: 'Estados de la Materia', slug: 'estados-materia' },
      { nombre: 'Ácidos y Bases', slug: 'acidos-bases' },
    ],
  },
}

const FICHAS_EN = {
  'tabla-periodica': {
    titulo: 'Periodic Table of Elements',
    subtitulo: 'Interactive Chemistry Exam for Primary, Secondary and Sixth Form',
    emoji: '⚗️', gradient: 'from-violet-500 to-purple-700',
    examPath: '/examen/tabla-periodica',
    studyPath: '/estudiar/quimica/tabla-periodica',
    asignatura: 'Chemistry', niveles: 'Primary, Secondary, Sixth Form',
    intro: 'Master the symbols, names and atomic numbers of chemical elements with adaptive exams by level. In Primary you identify the most common elements; in Secondary you add atomic number and classification; in Sixth Form you work with groups, periods and isotopes.',
    beneficios: [
      { titulo: 'Level-based Learning', texto: 'Three progressive levels (Primary, Secondary, Sixth Form) with different question types at each one. The system does not demand you know everything at once.' },
      { titulo: 'Mixed Questions', texto: 'Symbol → name, name → symbol, atomic number → element, classify by type. Variety prevents shallow memorisation.' },
      { titulo: 'Immediate Feedback', texto: 'After each wrong answer, the correct element is revealed with its visual symbol. You learn more from a mistake than from a correct answer.' },
    ],
    ejemplo: 'A Year 9 student practises for 10 minutes a day over a week. After 5 days, they can identify the first 20 elements without hesitation.',
    consejos: [
      'Start with the first 20 elements — they appear most often in Primary and Year 7 exams.',
      'Associate each symbol with something visual or phonetic: Na (sodium) from Latin "natrium", Fe (iron) from "ferrum".',
      'Practise symbol → name first, then name → symbol — they are two distinct memories.',
      'In Sixth Form, learn groups by column: all alkali metals share similar properties.',
    ],
    relacionados: [
      { nombre: 'States of Matter', slug: 'estados-materia' },
      { nombre: 'Atoms & Molecules', slug: 'atomos-moleculas' },
      { nombre: 'Mixtures & Separation', slug: 'mezclas-separacion' },
    ],
  },
  'estados-materia': {
    titulo: 'States of Matter',
    subtitulo: 'Physics & Chemistry Exam — Solid, Liquid, Gas and Changes of State',
    emoji: '🧪', gradient: 'from-teal-500 to-cyan-700',
    examPath: '/examen/estados-materia',
    studyPath: '/estudiar/quimica/estados-materia',
    asignatura: 'Physics & Chemistry', niveles: 'Primary, Secondary',
    intro: 'Learn to identify the three states of matter, their physical properties and all changes of state — melting, solidification, evaporation, condensation and sublimation — with multiple-choice questions adapted for Primary and Secondary.',
    beneficios: [
      { titulo: 'Explanation after Every Answer', texto: 'Whether you are right or wrong, you see the scientific explanation. Learning does not stop at the mistake.' },
      { titulo: 'Everyday Examples', texto: 'Questions use ice, chocolate, steam or a bathroom mirror. Connecting theory to real life fixes concepts better than any definition.' },
      { titulo: 'Two Differentiated Levels', texto: 'Primary covers basic concepts and main changes of state. Secondary adds sublimation, vaporisation, compressibility and transition temperatures.' },
    ],
    ejemplo: 'A Year 5 student learns that condensation is steam turning into droplets when she sees her mirror mist up after a shower. The question makes the connection.',
    consejos: [
      'Memorise the 6 changes of state: Melting↑ Solidification↓ / Evaporation↑ Condensation↓ / Sublimation↑ Deposition↓',
      'For Secondary: only gases are easily compressible — their molecules have free space between them.',
      'Practise giving everyday examples for each change of state before taking the exam.',
      'Boiling-point trick: water boils at 100°C, freezes at 0°C — the two most important numbers.',
    ],
    relacionados: [
      { nombre: 'Atoms & Molecules', slug: 'atomos-moleculas' },
      { nombre: 'Periodic Table', slug: 'tabla-periodica' },
      { nombre: 'Mixtures & Separation', slug: 'mezclas-separacion' },
    ],
  },
  'mezclas-separacion': {
    titulo: 'Mixtures & Separation Methods',
    subtitulo: 'Filtration, Distillation, Decantation & more — Primary and Secondary',
    emoji: '🔀', gradient: 'from-orange-500 to-amber-600',
    examPath: '/examen/mezclas-separacion',
    studyPath: '/estudiar/quimica/mezclas-separacion',
    asignatura: 'Physics & Chemistry', niveles: 'Primary, Secondary',
    intro: 'Distinguish homogeneous from heterogeneous mixtures and learn which separation method to use in each case. From sieving flour to distilling alcohol, the exam covers all methods from the official curriculum with real examples.',
    beneficios: [
      { titulo: 'Practical Application', texto: 'Each separation method is presented with a real-life example: coffee (filtration), sea salt (evaporation), wine (distillation). Theory makes sense when you see what it is for.' },
      { titulo: 'Curriculum Progression', texto: 'Primary covers types of mixture and basic methods. Secondary adds chromatography, crystallisation and the difference between distillation and evaporation.' },
      { titulo: 'Application Questions', texto: 'It is not just memorising names. The exam asks which method you would use to separate sand from water, or how sea salt is obtained. Applied reasoning.' },
    ],
    ejemplo: 'A Year 8 student understands why a drip coffee maker is filtration and why oil floats on water when they see the decantation question.',
    consejos: [
      'Learn the 6 basic methods with their key example: filtration=coffee, distillation=alcohol, decantation=oil+water, magnetism=iron+sand, sieving=flour, evaporation=sea salt.',
      'To distinguish homogeneous/heterogeneous: can you see the components with the naked eye? Heterogeneous. No? Homogeneous.',
      'Remember that distillation COLLECTS the condensed vapour — that is what distinguishes it from simple evaporation.',
      'For Secondary: chromatography separates by speed of movement, not by size or density.',
    ],
    relacionados: [
      { nombre: 'States of Matter', slug: 'estados-materia' },
      { nombre: 'Acids & Bases', slug: 'acidos-bases' },
      { nombre: 'Atoms & Molecules', slug: 'atomos-moleculas' },
    ],
  },
  'acidos-bases': {
    titulo: 'Acids & Bases — pH Scale',
    subtitulo: 'Chemistry Exam for Secondary — pH, Indicators and Neutralisation',
    emoji: '🧴', gradient: 'from-green-500 to-emerald-700',
    examPath: '/examen/acidos-bases',
    studyPath: '/estudiar/quimica/acidos-bases',
    asignatura: 'Chemistry', niveles: 'Secondary',
    intro: 'Learn to use the pH scale from 0 to 14, identify everyday acids and bases, understand what indicators like litmus do and grasp the neutralisation reaction with examples from the lab and the kitchen.',
    beneficios: [
      { titulo: 'pH in Everyday Life', texto: 'Lemon juice, soap, bleach and antacid. Identifying acids and bases in everyday products makes chemistry stop being abstract.' },
      { titulo: 'Logic of Neutralisation', texto: 'Understanding why we take antacids when our stomach hurts, or why baking soda raises the pH of an acidic solution, is chemistry applied to health.' },
      { titulo: 'Visual Indicators', texto: 'Litmus changes colour: red in acid, blue in base. Questions use these indicators so that learning is visual and intuitive.' },
    ],
    ejemplo: 'A Year 9 student connects the HCl in the stomach with the hydrochloric acid in the lab. Suddenly chemistry makes sense: the same acid that digests food can corrode metals.',
    consejos: [
      'Memorise the extremes: 0=strong acid (HCl), 7=neutral (pure water), 14=strong base (NaOH=bleach).',
      'Acids produce H⁺, bases produce OH⁻. One sentence, two key concepts.',
      'Neutralisation: acid + base → salt + water. The most fundamental equation in Secondary chemistry.',
      'Litmus: RED=acid (think red=danger=acid), BLUE=base.',
    ],
    relacionados: [
      { nombre: 'Atoms & Molecules', slug: 'atomos-moleculas' },
      { nombre: 'Mixtures & Separation', slug: 'mezclas-separacion' },
      { nombre: 'Periodic Table', slug: 'tabla-periodica' },
    ],
  },
  'atomos-moleculas': {
    titulo: 'Atoms & Molecules — Atomic Structure',
    subtitulo: 'Protons, Neutrons, Electrons, Elements and Compounds',
    emoji: '⚛️', gradient: 'from-blue-500 to-indigo-700',
    examPath: '/examen/atomos-moleculas',
    studyPath: '/estudiar/quimica/atomos-moleculas',
    asignatura: 'Physics & Chemistry', niveles: 'Primary, Secondary',
    intro: 'From the basic structure of the atom to isotopes, this exam covers everything you need to know about matter at the subatomic level. Primary tackles essential concepts; Secondary goes deeper with atomic number, mass number and the difference between element and compound.',
    beneficios: [
      { titulo: 'From Simple to Complex', texto: 'Primary learns that atoms have a nucleus and electrons, that molecules are bonded atoms. Secondary adds protons, neutrons, Z, A and isotopes. The progression is natural.' },
      { titulo: 'Connection with the Periodic Table', texto: 'Understanding atomic number Z is the key to reading the periodic table. This exam and the Periodic Table exam complement each other perfectly.' },
      { titulo: 'Chemical Formulae Explained', texto: 'H₂O has 2 hydrogens and 1 oxygen: 3 atoms in total. Questions teach students to read chemical formulae before they appear in other exams.' },
    ],
    ejemplo: 'A Year 10 student who did not understand isotopes sees the ¹²C and ¹⁴C question: same number of protons (carbon), different number of neutrons. In that moment it clicks.',
    consejos: [
      'Proton(+) and neutron(no charge) go in the nucleus. Electron(-) orbits outside. A mental image beats memorising.',
      'Atomic number Z = number of protons = what defines the element. Mass number A = protons + neutrons.',
      'To calculate neutrons: N = A − Z. If carbon has A=12 and Z=6, it has 6 neutrons.',
      'Isotopes = same element (same Z), different A (different number of neutrons). Example: ¹²C and ¹⁴C are both carbon.',
    ],
    relacionados: [
      { nombre: 'Periodic Table', slug: 'tabla-periodica' },
      { nombre: 'States of Matter', slug: 'estados-materia' },
      { nombre: 'Acids & Bases', slug: 'acidos-bases' },
    ],
  },
}

const FICHAS_CA = {
  'tabla-periodica': {
    titulo: 'Taula Periòdica dels Elements',
    subtitulo: 'Examen Interactiu de Química per a Primària, ESO i Batxillerat',
    emoji: '⚗️', gradient: 'from-violet-500 to-purple-700',
    examPath: '/examen/tabla-periodica',
    studyPath: '/estudiar/quimica/tabla-periodica',
    asignatura: 'Química', niveles: 'Primària, ESO, Batxillerat',
    intro: 'Domina els símbols, noms i números atòmics dels elements químics amb exàmens adaptatius per nivell. A Primària identifiques els més comuns; a l\'ESO afegeixes número atòmic i classificació; a Batxillerat treballes grups, períodes i isòtops.',
    beneficios: [
      { titulo: 'Aprenentatge per Nivells', texto: 'Tres nivells progressius (Primària, ESO, Batxillerat) amb tipus de pregunta diferents a cada un. El sistema no t\'exigeix saber-ho tot de cop.' },
      { titulo: 'Preguntes Mixtes', texto: 'Símbol → nom, nom → símbol, número atòmic → element, classificar per tipus. La varietat evita l\'efecte de memorització superficial.' },
      { titulo: 'Retroalimentació Immediata', texto: 'Després de cada error, l\'element correcte es revela amb el seu símbol visual. Aprens més de la falla que de l\'encert.' },
    ],
    ejemplo: 'Un alumne de 3r d\'ESO practica 10 minuts al dia durant una setmana. Al cap de 5 dies, ja identifica els 20 primers elements sense vacil·lar.',
    consejos: [
      'Comença pels primers 20 elements — són els que surten més als exàmens de Primària i 1r d\'ESO.',
      'Associa cada símbol amb alguna cosa visual o fonètica: Na (sodi) sona a "natri" en llatí, Fe (ferro) a "ferrum".',
      'Practica primer de símbol a nom i després al revés — són dues memòries diferents.',
      'A Batxillerat, aprèn els grups per columnes: tots els alcalins tenen propietats similars.',
    ],
    relacionados: [
      { nombre: 'Estats de la Matèria', slug: 'estados-materia' },
      { nombre: 'Àtoms i Molècules', slug: 'atomos-moleculas' },
      { nombre: 'Mescles i Separació', slug: 'mezclas-separacion' },
    ],
  },
  'estados-materia': {
    titulo: 'Estats de la Matèria',
    subtitulo: 'Examen de Física i Química — Sòlid, Líquid, Gas i Canvis d\'Estat',
    emoji: '🧪', gradient: 'from-teal-500 to-cyan-700',
    examPath: '/examen/estados-materia',
    studyPath: '/estudiar/quimica/estados-materia',
    asignatura: 'Física i Química', niveles: 'Primària, ESO',
    intro: 'Aprèn a identificar els tres estats de la matèria, les seves propietats físiques i tots els canvis d\'estat — fusió, solidificació, evaporació, condensació i sublimació — amb preguntes d\'opció múltiple adaptades a Primària i ESO.',
    beneficios: [
      { titulo: 'Explicació després de Cada Resposta', texto: 'Tant si encertes com si falles, veus l\'explicació científica. L\'aprenentatge no s\'atura en l\'error.' },
      { titulo: 'Exemples Quotidians', texto: 'Les preguntes fan servir gel, xocolata, vapor o el mirall del bany. Connectar la teoria amb la vida real fixa el concepte millor que qualsevol definició.' },
      { titulo: 'Dos Nivells Diferenciats', texto: 'Primària treballa conceptes bàsics i canvis principals. ESO afegeix sublimació, vaporització, compressibilitat i temperatures de canvi d\'estat.' },
    ],
    ejemplo: 'Una alumna de 5è de Primària aprèn que la condensació és el vapor convertint-se en gotetes en veure el seu mirall entelat després de dutxar-se. La pregunta ho connecta.',
    consejos: [
      'Memoritza els 6 canvis d\'estat: Fusió↑ Solidificació↓ / Evaporació↑ Condensació↓ / Sublimació↑ Deposició↓',
      'Per a l\'ESO: recorda que només els gasos són compressibles fàcilment — les seves molècules tenen espai lliure.',
      'Practica posant exemples quotidians per a cada canvi d\'estat abans de fer l\'examen.',
      'El truc del punt d\'ebullició: l\'aigua bull a 100°C, es congela a 0°C — els dos números més importants.',
    ],
    relacionados: [
      { nombre: 'Àtoms i Molècules', slug: 'atomos-moleculas' },
      { nombre: 'Taula Periòdica', slug: 'tabla-periodica' },
      { nombre: 'Mescles i Separació', slug: 'mezclas-separacion' },
    ],
  },
  'mezclas-separacion': {
    titulo: 'Mescles i Mètodes de Separació',
    subtitulo: 'Filtració, Destil·lació, Decantació i més — Primària i ESO',
    emoji: '🔀', gradient: 'from-orange-500 to-amber-600',
    examPath: '/examen/mezclas-separacion',
    studyPath: '/estudiar/quimica/mezclas-separacion',
    asignatura: 'Física i Química', niveles: 'Primària, ESO',
    intro: 'Distingeix mescles homogènies de heterogènies i aprèn quin mètode de separació fer servir en cada cas. Des de tamisar farina fins a destilar alcohol, l\'examen cobreix tots els mètodes del currículum oficial amb exemples reals.',
    beneficios: [
      { titulo: 'Aplicació Pràctica', texto: 'Cada mètode de separació es presenta amb un exemple de la vida real: cafè (filtració), sal marina (evaporació), vi (destil·lació). La teoria té sentit quan veus per a què serveix.' },
      { titulo: 'Progressió Curricular', texto: 'Primària treballa els tipus de mescla i mètodes bàsics. ESO afegeix cromatografia, cristal·lització i la diferència entre destil·lació i evaporació.' },
      { titulo: 'Preguntes d\'Aplicació', texto: 'No és només memoritzar noms. L\'examen pregunta quin mètode faries servir per separar sorra de l\'aigua, o com s\'obté la sal de la mar. Raonament aplicat.' },
    ],
    ejemplo: 'Un alumne de 2n d\'ESO entén per què una cafetera de goteo és filtració i per què l\'oli flota sobre l\'aigua en veure la pregunta de decantació.',
    consejos: [
      'Aprèn els 6 mètodes bàsics amb el seu exemple clau: filtració=cafè, destil·lació=alcohol, decantació=oli+aigua, imantació=ferro+sorra, tamisat=farina, evaporació=sal marina.',
      'Per distingir homogènia/heterogènia: veus els components a simple vista? Heterogènia. No? Homogènia.',
      'Recorda que la destil·lació RECULL el vapor condensat — això la diferencia de la simple evaporació.',
      'Per a l\'ESO: la cromatografia separa per velocitat de desplaçament, no per mida ni densitat.',
    ],
    relacionados: [
      { nombre: 'Estats de la Matèria', slug: 'estados-materia' },
      { nombre: 'Àcids i Bases', slug: 'acidos-bases' },
      { nombre: 'Àtoms i Molècules', slug: 'atomos-moleculas' },
    ],
  },
  'acidos-bases': {
    titulo: 'Àcids i Bases — Escala de pH',
    subtitulo: 'Examen de Química per a ESO — pH, Indicadors i Neutralització',
    emoji: '🧴', gradient: 'from-green-500 to-emerald-700',
    examPath: '/examen/acidos-bases',
    studyPath: '/estudiar/quimica/acidos-bases',
    asignatura: 'Química', niveles: 'ESO',
    intro: 'Aprèn a fer servir l\'escala de pH de 0 a 14, identifica àcids i bases quotidians, entèn què fan els indicadors com el tornasol i comprèn la reacció de neutralització amb exemples del laboratori i la cuina.',
    beneficios: [
      { titulo: 'pH a la Vida Quotidiana', texto: 'El suc de llimona, el sabó, la lleixiu i l\'antiàcid. Identificar àcids i bases en productes del dia a dia fa que la química deixi de ser abstracta.' },
      { titulo: 'Lògica de la Neutralització', texto: 'Entendre per què prenem antiàcids quan ens fa mal l\'estómac, o per què el bicarbonat puja el pH d\'una solució àcida, és química aplicada a la salut.' },
      { titulo: 'Indicadors Visuals', texto: 'El tornasol canvia de color: vermell en àcid, blau en base. Les preguntes fan servir aquests indicadors perquè l\'aprenentatge sigui visual i intuïtiu.' },
    ],
    ejemplo: 'Un alumne de 3r d\'ESO relaciona l\'HCl de l\'estómac amb l\'àcid clorhídric del laboratori. De cop la química té sentit: el mateix àcid que digereix el menjar pot corroir metalls.',
    consejos: [
      'Memoritza els extrems: 0=àcid fort (HCl), 7=neutre (aigua pura), 14=base forta (NaOH=lleixiu).',
      'Els àcids produeixen H⁺, les bases produeixen OH⁻. Una frase, dos conceptes clau.',
      'Neutralització: àcid + base → sal + aigua. L\'equació més bàsica de la química de l\'ESO.',
      'El tornasol: VERMELL=àcid (pensa en vermell=perill=àcid), BLAU=base.',
    ],
    relacionados: [
      { nombre: 'Àtoms i Molècules', slug: 'atomos-moleculas' },
      { nombre: 'Mescles i Separació', slug: 'mezclas-separacion' },
      { nombre: 'Taula Periòdica', slug: 'tabla-periodica' },
    ],
  },
  'atomos-moleculas': {
    titulo: 'Àtoms i Molècules — Estructura Atòmica',
    subtitulo: 'Protons, Neutrons, Electrons, Elements i Compostos',
    emoji: '⚛️', gradient: 'from-blue-500 to-indigo-700',
    examPath: '/examen/atomos-moleculas',
    studyPath: '/estudiar/quimica/atomos-moleculas',
    asignatura: 'Física i Química', niveles: 'Primària, ESO',
    intro: 'Des de l\'estructura bàsica de l\'àtom fins als isòtops, aquest examen cobreix tot el que necessites saber sobre la matèria a nivell subatòmic. Primària treballa conceptes essencials; ESO aprofundeix en número atòmic, número màssic i diferència entre element i compost.',
    beneficios: [
      { titulo: 'Del Simple al Complex', texto: 'Primària aprèn que els àtoms tenen nucli i electrons, que les molècules són àtoms units. ESO afegeix protons, neutrons, Z, A i isòtops. La progressió és natural.' },
      { titulo: 'Connexió amb la Taula Periòdica', texto: 'Entendre el número atòmic Z és la clau per llegir la taula periòdica. Aquest examen i el de Taula Periòdica es complementen perfectament.' },
      { titulo: 'Fórmules Químiques Explicades', texto: 'H₂O té 2 hidrògens i 1 oxigen: 3 àtoms en total. Les preguntes ensenyen a llegir fórmules químiques abans que apareguin en altres exàmens.' },
    ],
    ejemplo: 'Un alumne de 4t d\'ESO que no entenia els isòtops veu la pregunta del ¹²C i ¹⁴C: mateix número de protons (carboni), diferent número de neutrons. En aquell moment ho entèn.',
    consejos: [
      'Protó(+) i neutró(sense càrrega) van al nucli. Electró(-) orbita fora. Una imatge mental val més que memoritzar.',
      'Número atòmic Z = número de protons = el que defineix l\'element. Número màssic A = protons + neutrons.',
      'Per calcular neutrons: N = A − Z. Si un carboni té A=12 i Z=6, té 6 neutrons.',
      'Isòtops = mateix element (mateix Z), distint A (distint número de neutrons). Exemple: ¹²C i ¹⁴C són tots dos carboni.',
    ],
    relacionados: [
      { nombre: 'Taula Periòdica', slug: 'tabla-periodica' },
      { nombre: 'Estats de la Matèria', slug: 'estados-materia' },
      { nombre: 'Àcids i Bases', slug: 'acidos-bases' },
    ],
  },
}

const UI = {
  es: {
    back: '← Volver a Estudiar',
    empezar: 'Empezar examen de',
    hacerExamen: 'Ir al examen →',
    estudiarTema: 'Estudiar el tema →',
    probar: 'Empezar',
    ahora: 'ahora →',
    beneficiosH2: '🧠 Beneficios Pedagógicos',
    ejemploH2: '💡 Ejemplo Práctico',
    consejosH2: '📝 Consejos de Estudio',
    consejosPre: 'Trucos y técnicas para dominar este tema más rápido:',
    relacionadosH2: '🔬 Temas relacionados que te pueden interesar',
    relacionadosPre: 'Si estás estudiando',
    relacionadosPost: ', estos temas del currículo se complementan:',
    listoH2: '¿Listo para empezar?',
    listoSub: 'Accede gratis y practica ahora mismo.',
    verMas: 'Ver más →',
    notFound: 'Tema no encontrado',
  },
  en: {
    back: '← Back to Study',
    empezar: 'Start exam:',
    hacerExamen: 'Go to exam →',
    estudiarTema: 'Study the topic →',
    probar: 'Start',
    ahora: 'now →',
    beneficiosH2: '🧠 Pedagogical Benefits',
    ejemploH2: '💡 Practical Example',
    consejosH2: '📝 Study Tips',
    consejosPre: 'Tricks and techniques to master this topic faster:',
    relacionadosH2: '🔬 Related topics you might find useful',
    relacionadosPre: 'If you are studying',
    relacionadosPost: ', these curriculum topics complement each other:',
    listoH2: 'Ready to start?',
    listoSub: 'Access for free and practise right now.',
    verMas: 'See more →',
    notFound: 'Topic not found',
  },
  ca: {
    back: '← Tornar a Estudiar',
    empezar: 'Començar examen de',
    hacerExamen: 'Anar a l\'examen →',
    estudiarTema: 'Estudiar el tema →',
    probar: 'Començar',
    ahora: 'ara →',
    beneficiosH2: '🧠 Beneficis Pedagògics',
    ejemploH2: '💡 Exemple Pràctic',
    consejosH2: '📝 Consells d\'Estudi',
    consejosPre: 'Trucs i tècniques per dominar aquest tema més ràpid:',
    relacionadosH2: '🔬 Temes relacionats que et poden interessar',
    relacionadosPre: 'Si estàs estudiant',
    relacionadosPost: ', aquests temes del currículum es complementen:',
    listoH2: 'Preparat per començar?',
    listoSub: 'Accedeix gratis i practica ara mateix.',
    verMas: 'Veure més →',
    notFound: 'Tema no trobat',
  },
}

export default function InfoEstudiarFicha() {
  const { slug } = useParams()
  const { lang, localPath } = useLang()
  const fichas = lang === 'ca' ? FICHAS_CA : lang === 'en' ? FICHAS_EN : FICHAS_ES
  const ui = UI[lang] || UI.es
  const ficha = fichas[slug]

  if (!ficha) {
    return (
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="text-center">
          <p className="text-white/50 text-lg mb-4">{ui.notFound}</p>
          <Link to={localPath('/info/estudiar')} className="text-[#EDAE49] hover:underline">{ui.back}</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative z-10">
      {/* Header oscuro */}
      <div className="px-4 sm:px-8 py-10 max-w-3xl mx-auto">
        <Link to={localPath('/info/estudiar')} className="text-white/30 hover:text-white/60 text-sm mb-8 inline-flex items-center gap-1 transition-colors">
          {ui.back}
        </Link>
        <header className="mb-4">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <span className="text-5xl sm:text-6xl shrink-0">{ficha.emoji}</span>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">{ficha.titulo}</h1>
              <p className="text-white/40 text-sm sm:text-lg">{ficha.subtitulo}</p>
            </div>
          </div>
          <div className="flex gap-3 mb-4">
            <span className="text-xs font-bold bg-white/10 text-white/60 px-3 py-1 rounded-full">{ficha.asignatura}</span>
            <span className="text-xs font-bold bg-white/10 text-white/60 px-3 py-1 rounded-full">{ficha.niveles}</span>
          </div>
          <Link to={localPath(ficha.examPath)}
            className="inline-block py-3 px-8 bg-[#EDAE49] hover:bg-amber-400 text-black font-black rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-amber-500/30">
            {ui.empezar} {ficha.titulo} →
          </Link>
        </header>
      </div>

      {/* Contenido claro */}
      <div className="bg-[#f5f5f0] text-gray-900 rounded-t-[2rem] sm:rounded-t-[3rem]">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12">

          <p className="text-gray-600 leading-relaxed text-lg mb-8">{ficha.intro}</p>

          <div className={`bg-gradient-to-br ${ficha.gradient} rounded-2xl h-48 sm:h-64 flex items-center justify-center mb-10 relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="relative text-center">
              <span className="text-8xl sm:text-9xl drop-shadow-2xl">{ficha.emoji}</span>
              <p className="text-white/60 text-sm font-bold mt-2">{ficha.asignatura} · {ficha.niveles}</p>
            </div>
          </div>

          {/* CTA 1 */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link to={localPath(ficha.examPath)}
              className="inline-block py-4 px-10 bg-teal-600 hover:bg-teal-500 text-white font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-teal-600/30 text-center">
              {ui.hacerExamen}
            </Link>
            <Link to={localPath(ficha.studyPath)}
              className="inline-block py-4 px-10 bg-violet-600 hover:bg-violet-500 text-white font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-violet-600/30 text-center">
              {ui.estudiarTema}
            </Link>
          </div>

          <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="info-estudiar-ficha-1" style={{ minHeight: '90px', marginBottom: '2.5rem' }} />

          {/* Beneficios */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-gray-900 mb-6">{ui.beneficiosH2}</h2>
            <div className="space-y-5">
              {ficha.beneficios.map(b => (
                <div key={b.titulo} className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h3 className="font-black text-gray-900 text-lg mb-2">{b.titulo}</h3>
                  <p className="text-gray-500 leading-relaxed">{b.texto}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-gray-900 mb-4">{ui.ejemploH2}</h2>
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6">
              <p className="text-teal-800 leading-relaxed italic">"{ficha.ejemplo}"</p>
            </div>
          </section>

          {/* CTA 2 */}
          <div className="text-center mb-10">
            <Link to={localPath(ficha.examPath)}
              className="inline-block py-4 px-10 bg-teal-600 hover:bg-teal-500 text-white font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-teal-600/30">
              {ui.probar} {ficha.titulo} {ui.ahora}
            </Link>
          </div>

          <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="info-estudiar-ficha-2" style={{ minHeight: '90px', marginBottom: '2.5rem' }} />

          {/* Consejos de estudio */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-gray-900 mb-2">{ui.consejosH2}</h2>
            <p className="text-gray-400 mb-5">{ui.consejosPre}</p>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <ol className="space-y-3">
                {ficha.consejos.map((c, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-7 h-7 rounded-full bg-teal-100 border border-teal-200 text-teal-700 font-black text-sm flex items-center justify-center shrink-0">{i + 1}</span>
                    <p className="text-gray-600 leading-relaxed pt-0.5">{c}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Temas relacionados */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-gray-900 mb-2">{ui.relacionadosH2}</h2>
            <p className="text-gray-400 mb-5">{ui.relacionadosPre} {ficha.titulo}{ui.relacionadosPost}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {ficha.relacionados.map(r => (
                <Link key={r.slug} to={localPath(`/info/estudiar/${r.slug}`)}
                  className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-teal-300 hover:shadow-sm transition-all group">
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">{r.nombre}</h3>
                  <p className="text-teal-600 text-sm font-semibold">{ui.verMas}</p>
                </Link>
              ))}
            </div>
          </section>

          <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="info-estudiar-ficha-3" style={{ minHeight: '90px', marginBottom: '2.5rem' }} />

          {/* CTA final */}
          <footer className="text-center pt-4">
            <h2 className="text-2xl font-black text-gray-900 mb-3">{ui.listoH2}</h2>
            <p className="text-gray-400 mb-6">{ui.listoSub}</p>
            <Link to={localPath(ficha.examPath)}
              className="inline-block py-4 px-10 bg-teal-600 hover:bg-teal-500 text-white font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-teal-600/30">
              {ui.empezar} {ficha.titulo} →
            </Link>
          </footer>
        </div>
      </div>
    </div>
  )
}
