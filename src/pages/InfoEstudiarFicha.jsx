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
  'sistema-solar': {
    titulo: 'Sistema Solar — Planetas y Astros',
    subtitulo: 'Examen de Ciencias Naturales — Planetas, Movimientos y Características',
    emoji: '🌍', gradient: 'from-indigo-500 to-purple-700',
    examPath: '/examen/sistema-solar',
    studyPath: '/estudiar/quimica/sistema-solar',
    asignatura: 'Ciencias Naturales', niveles: 'Primaria, ESO',
    intro: 'Aprende los 8 planetas del sistema solar, sus características principales y los movimientos de la Tierra con preguntas adaptadas a Primaria y ESO. Desde el más cercano al Sol hasta los gigantes gaseosos con anillos, el examen cubre todo el currículo oficial de Astronomía.',
    beneficios: [
      { titulo: 'Los 8 Planetas en Orden', texto: 'Mercurio, Venus, Tierra, Marte, Júpiter, Saturno, Urano, Neptuno. El examen refuerza el orden desde el Sol hacia afuera con preguntas repetidas de distintos ángulos.' },
      { titulo: 'Movimientos Explicados', texto: 'Rotación (día y noche, 24h) y traslación (estaciones, 365 días). La diferencia entre los dos movimientos es el error más común en los exámenes de Primaria.' },
      { titulo: 'ESO: Año Luz y Estaciones', texto: 'Para ESO se añaden conceptos como el año luz, la inclinación del eje terrestre para las estaciones, y características específicas de planetas como Venus y su rotación retrógrada.' },
    ],
    ejemplo: 'Un alumno de 4º de Primaria ya sabía los planetas de memoria pero confundía rotación con traslación. Tras 5 preguntas del examen con explicación, ya no los confunde.',
    consejos: [
      'Regla para recordar el orden: "Mi Vieja Tía Marta Juega Siempre Un Naipe" (Mercurio, Venus, Tierra, Marte, Júpiter, Saturno, Urano, Neptuno).',
      'Rotación = giro sobre sí mismo → día y noche. Traslación = vuelta al Sol → año y estaciones.',
      'Júpiter es el más grande (caben 1.000 Tierras), Mercurio el más pequeño y el más cercano al Sol.',
      'Para ESO: las estaciones NO se deben a la distancia al Sol, sino a la inclinación del eje de la Tierra (23,5°).',
    ],
    relacionados: [
      { nombre: 'La Célula', slug: 'celula' },
      { nombre: 'Estados de la Materia', slug: 'estados-materia' },
      { nombre: 'Átomos y Moléculas', slug: 'atomos-moleculas' },
    ],
  },
  'celula': {
    titulo: 'La Célula — Unidad Básica de la Vida',
    subtitulo: 'Examen de Biología — Orgánulos, Tipos de Célula y Funciones',
    emoji: '🔬', gradient: 'from-green-500 to-teal-700',
    examPath: '/examen/celula',
    studyPath: '/estudiar/quimica/celula',
    asignatura: 'Biología y Geología', niveles: 'ESO',
    intro: 'Domina los conceptos clave de la biología celular: diferencia entre células procariotas y eucariotas, células animales y vegetales, función de cada orgánulo y procesos fundamentales como la fotosíntesis, la respiración celular y la mitosis. Todo con explicación detallada tras cada respuesta.',
    beneficios: [
      { titulo: 'Procariota vs Eucariota', texto: 'La diferencia más importante de la biología celular: presencia o ausencia de núcleo definido. Las bacterias son procariotas; los animales, plantas y hongos son eucariotas.' },
      { titulo: 'Animal vs Vegetal', texto: 'Pared celular, cloroplastos y vacuola central grande son exclusivos de las vegetales. El examen trabaja estas diferencias con preguntas directas y comparativas.' },
      { titulo: 'Orgánulos con Función', texto: 'Mitocondria=energía (ATP), ribosomas=proteínas, cloroplasto=fotosíntesis, vacuola=reserva. Aprende cada orgánulo con su función en una pregunta.' },
    ],
    ejemplo: 'Una alumna de 3º ESO que memorizaba los orgánulos sin entenderlos ve la pregunta de la mitocondria: "central energética que usa O₂ para obtener ATP". Lo relaciona con el ejercicio físico. Ahora lo recuerda.',
    consejos: [
      'Diferencia clave: procariota (bacterias) NO tiene núcleo. Eucariota (animales, plantas, hongos) SÍ tiene núcleo con membrana.',
      'Célula vegetal vs animal: vegetal tiene PARED CELULAR + CLOROPLASTOS + VACUOLA GRANDE. Animal no tiene ninguna de las tres.',
      'Mitocondria = energía (respiración celular). Cloroplasto = fotosíntesis (solo en células con luz). Ribosoma = proteínas (en todas las células).',
      'Fotosíntesis: CO₂ + H₂O + luz → glucosa + O₂. Respiración celular: glucosa + O₂ → ATP + CO₂ + H₂O. Son procesos opuestos.',
    ],
    relacionados: [
      { nombre: 'Sistema Solar', slug: 'sistema-solar' },
      { nombre: 'Átomos y Moléculas', slug: 'atomos-moleculas' },
      { nombre: 'Mezclas y Separación', slug: 'mezclas-separacion' },
    ],
  },
  'geometria': {
    titulo: 'Geometría — Figuras, Áreas y Volúmenes',
    subtitulo: 'Examen de Matemáticas — Teorema de Pitágoras, Perímetros y Fórmulas',
    emoji: '📐', gradient: 'from-pink-500 to-rose-700',
    examPath: '/examen/geometria',
    studyPath: '/examen/geometria',
    asignatura: 'Matemáticas', niveles: 'Primaria, ESO',
    intro: 'Repasa las fórmulas de geometría plana y espacial: áreas de triángulos, cuadrados, rectángulos y círculos; tipos de ángulos y triángulos; el teorema de Pitágoras con ejemplos numéricos; y volúmenes de cubos y cilindros. Todo explicado tras cada pregunta.',
    beneficios: [
      { titulo: 'Fórmulas con Ejemplos', texto: 'No basta con saber que el área del triángulo es (base×altura)/2. El examen pide aplicarla con números concretos. Cada explicación incluye el cálculo completo.' },
      { titulo: 'Pitágoras Paso a Paso', texto: 'a²+b²=c². Las ternas pitagóricas más frecuentes (3-4-5, 6-8-10) aparecen en el examen para que las automatices antes de enfrentarte a casos generales.' },
      { titulo: 'Progresión Primaria → ESO', texto: 'Primaria trabaja ángulos básicos, tipos de triángulos, perímetros y áreas simples. ESO añade Pitágoras, volúmenes de cilindro y cubo, y áreas del círculo.' },
    ],
    ejemplo: 'Un alumno de 2º ESO siempre confundía área con perímetro. Tras ver la explicación "área en cm², perímetro en cm lineal" en 3 preguntas seguidas, ya no los confunde.',
    consejos: [
      'Ángulos: agudo<90°, recto=90°, obtuso entre 90° y 180°, llano=180°. La suma de ángulos de cualquier triángulo = 180°.',
      'Área del triángulo = (base × altura) / 2. Área del círculo = πr². Área del cuadrado = L². Área del rectángulo = largo × ancho.',
      'Pitágoras solo en triángulos rectángulos: a²+b²=c² donde c es la hipotenusa (lado más largo, opuesto al ángulo recto).',
      'Para volúmenes: cubo = a³, cilindro = πr²×h. El nombre "volumen" indica unidades cúbicas (cm³, m³).',
    ],
    relacionados: [
      { nombre: 'Átomos y Moléculas', slug: 'atomos-moleculas' },
      { nombre: 'Sistema Solar', slug: 'sistema-solar' },
      { nombre: 'Tabla Periódica', slug: 'tabla-periodica' },
    ],
  },
  // Historia
  'historia-guerra-civil': {
    titulo: 'Guerra Civil Española — Examen de Historia',
    subtitulo: 'Del golpe de estado de 1936 a la dictadura franquista',
    emoji: '🇪🇸', gradient: 'from-red-600 to-rose-800',
    examPath: '/estudiar/historia/gce',
    studyPath: '/estudiar/historia/gce',
    asignatura: 'Historia de España', niveles: 'ESO, Bachillerato',
    intro: 'Repasa los hitos clave de la Guerra Civil Española: causas del alzamiento militar de 1936, principales batallas, figuras históricas como Franco, Azaña y La Pasionaria, la intervención extranjera y el inicio de la dictadura. Examen con preguntas adaptadas al currículo de ESO y Bachillerato.',
    beneficios: [
      { titulo: 'Cronología Clara', texto: 'Del golpe del 17 de julio de 1936 al 1 de abril de 1939. El examen trabaja las fechas clave con contexto, no solo como datos sueltos.' },
      { titulo: 'Personajes Históricos', texto: 'Franco, Manuel Azaña, Largo Caballero, La Pasionaria, Mola. Cada figura con su papel en el conflicto y su bando.' },
      { titulo: 'Contexto Internacional', texto: 'Brigadas Internacionales, apoyo nazi-fascista al bando nacional, el pacto de no intervención. La guerra civil dentro del tablero europeo de los años 30.' },
    ],
    ejemplo: 'Un alumno de 4º ESO que confundía el Frente Popular con el Frente Nacional entiende la diferencia al ver la pregunta sobre las elecciones de febrero de 1936.',
    consejos: [
      'Memoriza la cronología: golpe (julio 1936) → guerra (1936-1939) → victoria franquista (1 abril 1939) → dictadura (1939-1975).',
      'Los dos bandos: Republicanos (gobierno legítimo, Frente Popular, URSS, Brigadas Internacionales) vs Nacionales (Franco, Alemania nazi, Italia fascista).',
      'Batallas clave: Batalla del Ebro (más larga), Madrid (resistió todo el conflicto), Guernica (bombardeo nazi, 1937).',
      'Para Bachillerato: aprende las causas estructurales — crisis de la II República, polarización política, revolución de 1934.',
    ],
    relacionados: [
      { nombre: 'Segunda Guerra Mundial', slug: 'historia-segunda-guerra-mundial' },
      { nombre: 'Grandes Hitos de la Historia', slug: 'historia-hitos' },
      { nombre: 'Antigua Roma', slug: 'historia-antigua-roma' },
    ],
  },
  'historia-segunda-guerra-mundial': {
    titulo: 'Segunda Guerra Mundial — Examen de Historia',
    subtitulo: 'De la invasión de Polonia (1939) a Hiroshima (1945)',
    emoji: '⚔️', gradient: 'from-gray-600 to-slate-800',
    examPath: '/estudiar/historia/wwii',
    studyPath: '/estudiar/historia/wwii',
    asignatura: 'Historia del Mundo Contemporáneo', niveles: 'ESO, Bachillerato',
    intro: 'Estudia los momentos decisivos de la Segunda Guerra Mundial: el Blitzkrieg alemán, la Batalla de Inglaterra, el Holocausto, la Operación Barbarroja, el Desembarco de Normandía y las bombas atómicas sobre Japón. Examen con preguntas de múltiple elección basadas en el currículo oficial.',
    beneficios: [
      { titulo: 'Causas y Consecuencias', texto: 'El Tratado de Versalles como germen del conflicto, el ascenso del nazismo, y la Guerra Fría como consecuencia directa. La IIGM no surge de la nada ni termina sin secuelas.' },
      { titulo: 'Figuras Históricas', texto: 'Hitler, Churchill, Stalin, Roosevelt, Eisenhower, Rommel. El examen sitúa cada figura en su contexto y bando.' },
      { titulo: 'Geografía del Conflicto', texto: 'Frente Occidental, Frente Oriental, Pacífico. Entender dónde pasó cada cosa es esencial para recordar por qué pasó.' },
    ],
    ejemplo: 'Una alumna de 1º Bachillerato siempre confundía la Operación Overlord con la Operación Barbarroja. Tras ver la pregunta con el mapa de Europa, ya las distingue.',
    consejos: [
      'Cronología básica: invasión de Polonia (sept. 1939) → caída de Francia (1940) → Barbarroja (1941) → Pearl Harbor (dic. 1941) → Normandía (jun. 1944) → fin Europa (mayo 1945) → Hiroshima (ago. 1945).',
      'Aliados: EEUU, Reino Unido, URSS, Francia. Eje: Alemania, Italia, Japón.',
      'El Holocausto: 6 millones de judíos exterminados. Auschwitz, Treblinka, Sobibor son los campos de exterminio más nombrados en exámenes.',
      'Para Bachillerato: las causas incluyen el Tratado de Versalles (1919), la Gran Depresión (1929) y el fracaso de la Sociedad de Naciones.',
    ],
    relacionados: [
      { nombre: 'Guerra Civil Española', slug: 'historia-guerra-civil' },
      { nombre: 'Independencia Americana', slug: 'historia-independencia-americana' },
      { nombre: 'Grandes Hitos de la Historia', slug: 'historia-hitos' },
    ],
  },
  'historia-independencia-americana': {
    titulo: 'Independencia Americana — Examen de Historia',
    subtitulo: 'Del Motín del Té a la Constitución de los Estados Unidos',
    emoji: '🦅', gradient: 'from-blue-700 to-indigo-900',
    examPath: '/estudiar/historia/usa',
    studyPath: '/estudiar/historia/usa',
    asignatura: 'Historia del Mundo', niveles: 'ESO',
    intro: 'Aprende los orígenes, desarrollo y consecuencias de la Revolución Americana: la crisis con la metrópoli británica, el Motín del Té, la Declaración de Independencia de 1776, la guerra contra Gran Bretaña y la creación de la Constitución. Examen de historia universal para ESO.',
    beneficios: [
      { titulo: 'Causas del Conflicto', texto: 'Impuestos sin representación, las Leyes Intolerables, el Motín del Té de 1773. Entender por qué estalló la revolución es la clave para recordar cómo se desarrolló.' },
      { titulo: 'Documentos Fundacionales', texto: 'La Declaración de Independencia (4 julio 1776) y la Constitución (1787) son los dos documentos más importantes. El examen trabaja sus fechas, autores y principios clave.' },
      { titulo: 'Figuras de la Revolución', texto: 'George Washington, Thomas Jefferson, Benjamin Franklin, John Adams. Cada padre fundador con su papel en la independencia.' },
    ],
    ejemplo: 'Un alumno de 3º ESO no entendía por qué las colonias querían independizarse si eran prósperas. La pregunta sobre los impuestos sin representación lo aclara: no era pobreza, era principio político.',
    consejos: [
      'Cronología: Motín del Té (1773) → Primer Congreso Continental (1774) → Declaración de Independencia (4 julio 1776) → victoria en Yorktown (1781) → Constitución (1787).',
      '"No taxation without representation" — la frase clave que resume la causa principal del conflicto.',
      'Los aliados de las colonias: Francia (Lafayete) y España, que veían una oportunidad de debilitar a Gran Bretaña.',
      'Las 13 colonias originales se convierten en los primeros 13 estados de EEUU — dato que suele caer en examen.',
    ],
    relacionados: [
      { nombre: 'Segunda Guerra Mundial', slug: 'historia-segunda-guerra-mundial' },
      { nombre: 'Guerra Civil Española', slug: 'historia-guerra-civil' },
      { nombre: 'Grandes Hitos de la Historia', slug: 'historia-hitos' },
    ],
  },
  'historia-antigua-roma': {
    titulo: 'Antigua Roma — Examen de Historia',
    subtitulo: 'De Rómulo y Remo al Colapso del Imperio Romano',
    emoji: '🏛️', gradient: 'from-amber-600 to-yellow-800',
    examPath: '/estudiar/historia/roma',
    studyPath: '/estudiar/historia/roma',
    asignatura: 'Historia Clásica', niveles: 'Primaria, ESO',
    intro: 'Recorre la historia de Roma desde sus orígenes míticos hasta la caída del Imperio: la monarquía, la República con sus cónsules y senado, el periodo de las Guerras Púnicas, Julio César, el Imperio con Augusto y los emperadores más importantes, y la caída en 476 d.C.',
    beneficios: [
      { titulo: 'Tres Periodos Clave', texto: 'Monarquía (753-509 a.C.), República (509-27 a.C.) e Imperio (27 a.C.-476 d.C.). Saber en qué periodo encuadrar cada evento es la base del examen.' },
      { titulo: 'Figuras Romanas', texto: 'Rómulo, Julio César, Augusto, Nerón, Marco Aurelio, Constantino. El examen trabaja cada figura con su época y relevancia histórica.' },
      { titulo: 'Instituciones Republicanas', texto: 'El Senado, los cónsules, el tribuno de la plebe, la ley de las XII Tablas. Las instituciones romanas son la base del derecho occidental y suelen caer en selectividad.' },
    ],
    ejemplo: 'Una alumna de 2º ESO confundía la República con el Imperio. Tras ver la pregunta "¿En qué período gobernaron los cónsules?" con la respuesta explicada, ya distingue perfectamente los tres períodos.',
    consejos: [
      'Los tres periodos con fechas: Monarquía (753-509 a.C.) → República (509-27 a.C.) → Imperio (27 a.C.-476 d.C.).',
      'Julio César no fue emperador: fue dictador durante la República. Augusto fue el PRIMER emperador (27 a.C.).',
      'Guerras Púnicas (contra Cartago, Aníbal y los elefantes): I (264-241), II (218-201), III (149-146 a.C.).',
      'La caída del Imperio: 476 d.C., cuando Odoacro depone a Rómulo Augústulo. Solo cae el Imperio de Occidente — el de Oriente (Bizancio) dura hasta 1453.',
    ],
    relacionados: [
      { nombre: 'Grandes Hitos de la Historia', slug: 'historia-hitos' },
      { nombre: 'Guerra Civil Española', slug: 'historia-guerra-civil' },
      { nombre: 'Independencia Americana', slug: 'historia-independencia-americana' },
    ],
  },
  'historia-hitos': {
    titulo: 'Grandes Hitos de la Historia Universal',
    subtitulo: 'Los Momentos que Cambiaron el Mundo — Examen de Historia para Primaria',
    emoji: '🌍', gradient: 'from-teal-600 to-cyan-800',
    examPath: '/estudiar/historia/primaria',
    studyPath: '/estudiar/historia/primaria',
    asignatura: 'Historia Universal', niveles: 'Primaria, ESO',
    intro: 'Desde la escritura en Mesopotamia hasta la llegada a la Luna, este examen cubre los eventos más importantes de la historia de la humanidad: civilizaciones antiguas, grandes descubrimientos, revoluciones y hitos del siglo XX. Adaptado al currículo de Conocimiento del Medio y Ciencias Sociales.',
    beneficios: [
      { titulo: 'Civilizaciones Antiguas', texto: 'Egipto, Mesopotamia, Grecia, Roma. Las primeras civilizaciones con sus aportaciones: escritura, democracia, leyes, arquitectura. El examen conecta cada cultura con su legado.' },
      { titulo: 'Grandes Descubrimientos', texto: 'La imprenta (Gutenberg, 1450), América (Colón, 1492), la revolución científica (Galileo, Newton). Cada descubrimiento con su fecha, autor y consecuencias.' },
      { titulo: 'Siglo XX en Clave', texto: 'Las dos Guerras Mundiales, la llegada a la Luna (1969), la caída del Muro de Berlín (1989). Los hitos más recientes con su contexto histórico simplificado.' },
    ],
    ejemplo: 'Un alumno de 5º de Primaria aprende que Colón llegó a América en 1492 pero no lo confunde con Magallanes (primera vuelta al mundo, 1519-1522) gracias a las preguntas comparativas del examen.',
    consejos: [
      'Las 4 grandes civilizaciones antiguas: Mesopotamia (escritura cuneiforme), Egipto (jeroglíficos, pirámides), Grecia (democracia, filosofía), Roma (derecho, ingeniería).',
      'Grandes descubrimientos: imprenta (1450) → América (1492) → vuelta al mundo (1522) → telescopio (Galileo, 1609).',
      'Siglo XX: I Guerra Mundial (1914-1918) → II Guerra Mundial (1939-1945) → llegada a la Luna (1969) → caída del Muro de Berlín (1989).',
      'Truco para Primaria: asocia cada hito con un número redondo fácil de recordar. 1492 (América) y 1969 (Luna) son los más importantes.',
    ],
    relacionados: [
      { nombre: 'Antigua Roma', slug: 'historia-antigua-roma' },
      { nombre: 'Guerra Civil Española', slug: 'historia-guerra-civil' },
      { nombre: 'Segunda Guerra Mundial', slug: 'historia-segunda-guerra-mundial' },
    ],
  },
  // Matemáticas
  'matematicas-sumas-restas': {
    titulo: 'Sumas y Restas — Cálculo Mental',
    subtitulo: 'Examen de Matemáticas — Operaciones Básicas Combinadas',
    emoji: '➕', gradient: 'from-blue-500 to-cyan-600',
    examPath: '/estudiar/matematicas/sumas-restas/examen',
    studyPath: '/estudiar/matematicas/sumas-restas/examen',
    asignatura: 'Matemáticas', niveles: 'Primaria, ESO',
    intro: 'Practica la suma y la resta con cálculo mental progresivo. El examen plantea operaciones de dificultad creciente — de números de 1 dígito a operaciones con decenas y centenas — para afianzar la agilidad aritmética antes de pasar a multiplicaciones y divisiones.',
    beneficios: [
      { titulo: 'Cálculo Mental Progresivo', texto: 'Las operaciones aumentan en complejidad a lo largo del examen. Empiezas con 7+5 y terminas con 234-87. El cerebro se calienta gradualmente.' },
      { titulo: 'Base para Todo lo Demás', texto: 'Las sumas y restas son la base de las multiplicaciones, divisiones y fracciones. Dominarlas sin calculadora es la habilidad matemática más rentable de Primaria.' },
      { titulo: 'Velocidad y Precisión', texto: 'El examen no solo mide si aciertas, sino si lo haces con seguridad. Repetir el mismo tipo de operación en variantes distintas afianza el automatismo.' },
    ],
    ejemplo: 'Un alumno de 3º de Primaria que dudaba en restas con llevadas practica 10 minutos al día durante una semana. Al final de la semana, las resuelve sin errores ni vacilación.',
    consejos: [
      'Para sumas rápidas: agrupa los números que sumen 10 primero. 3+7+4+6 = (3+7)+(4+6) = 10+10 = 20.',
      'Para restas con llevadas: visualiza el número mayor "prestando" una decena. 52-7: piensa en 52 como 40+12, así 12-7=5, resultado 45.',
      'Practica las combinaciones de un dígito hasta que sean automáticas (7+8, 9+6, 13-7...) — son la base de todo cálculo mental.',
      'Si te trabas, divide la operación en partes: 67+38 = 67+30+8 = 97+8 = 105.',
    ],
    relacionados: [
      { nombre: 'Multiplicación', slug: 'matematicas-multiplicacion' },
      { nombre: 'División', slug: 'matematicas-division' },
      { nombre: 'Geometría', slug: 'geometria' },
    ],
  },
  'matematicas-multiplicacion': {
    titulo: 'Multiplicación — Tablas y Cálculo Mental',
    subtitulo: 'Examen de Matemáticas — Tablas del 1 al 10 y Multiplicaciones',
    emoji: '✖️', gradient: 'from-violet-500 to-purple-700',
    examPath: '/estudiar/matematicas/multiplicaciones/examen',
    studyPath: '/estudiar/matematicas/multiplicaciones/examen',
    asignatura: 'Matemáticas', niveles: 'Primaria, ESO',
    intro: 'Domina las tablas de multiplicar del 1 al 10 y practica multiplicaciones de dificultad creciente. El examen combina multiplicaciones puras con operaciones mixtas para afianzar el cálculo mental y prepararte para las divisiones, fracciones y álgebra de cursos superiores.',
    beneficios: [
      { titulo: 'Tablas Automatizadas', texto: 'El objetivo no es saber las tablas: es tenerlas tan interiorizadas que salgan sin pensar. El examen repite las más difíciles (7×8, 6×9, 8×9) con mayor frecuencia.' },
      { titulo: 'Operaciones Mixtas', texto: 'Combinamos multiplicación con sumas y restas para repasar el orden de las operaciones. 3×4+7 no es lo mismo que 3×(4+7) — diferencia crítica en ESO.' },
      { titulo: 'Cálculo con Decenas', texto: 'Multiplicar por 10, 100, por múltiplos de 10. Trucos mentales como 15×4 = 15×2×2 = 30×2 = 60. Matemáticas mentales más rápidas que la calculadora.' },
    ],
    ejemplo: 'Una alumna de 4º de Primaria que tardaba 5 segundos en 7×8 practica el examen diariamente. En dos semanas, lo resuelve instantáneamente, lo que le libera capacidad mental para los problemas.',
    consejos: [
      'Las tablas difíciles (6,7,8,9): practica estas más que las fáciles. 7×7=49, 7×8=56, 8×8=64, 9×9=81.',
      'Truco del 9: 9×n = la suma de dígitos del resultado siempre es 9. 9×7=63 (6+3=9). Y el primer dígito es siempre n-1: 9×7=6_ → primer dígito 6.',
      'Para multiplicar por 11: 11×n (del 1 al 9) = nn. 11×7=77. Para 11×números mayores: 11×35 = 3(3+5)5 = 385.',
      'El orden de operaciones: primero paréntesis, luego multiplicaciones y divisiones, finalmente sumas y restas (PEMDAS/BODMAS).',
    ],
    relacionados: [
      { nombre: 'División', slug: 'matematicas-division' },
      { nombre: 'Sumas y Restas', slug: 'matematicas-sumas-restas' },
      { nombre: 'Geometría', slug: 'geometria' },
    ],
  },
  'matematicas-division': {
    titulo: 'División — Examen de Matemáticas',
    subtitulo: 'Divisiones Exactas e Inexactas — Primaria y ESO',
    emoji: '➗', gradient: 'from-orange-500 to-red-600',
    examPath: '/estudiar/matematicas/divisiones/examen',
    studyPath: '/estudiar/matematicas/divisiones/examen',
    asignatura: 'Matemáticas', niveles: 'Primaria, ESO',
    intro: 'Practica las divisiones exactas e inexactas con dividendos de 1, 2 y 3 dígitos. El examen trabaja la división como operación inversa de la multiplicación y prepara para los conceptos de cociente, resto, mínimo común múltiplo y máximo común divisor de ESO.',
    beneficios: [
      { titulo: 'División como Reparto', texto: 'Entender la división como "cuántas veces cabe" o "cuánto le toca a cada uno" la hace intuitiva. El examen usa contextos de reparto antes de pasar a la abstracción.' },
      { titulo: 'Cociente y Resto', texto: 'La división inexacta da cociente y resto. 17÷5=3 resto 2 (porque 5×3=15, y 17-15=2). Dominar esto es esencial para fracciones y números decimales.' },
      { titulo: 'Inversa de la Multiplicación', texto: 'Si 6×7=42, entonces 42÷6=7 y 42÷7=6. Ver la relación entre multiplicación y división reduce el tiempo de cálculo a la mitad.' },
    ],
    ejemplo: 'Un alumno de 5º de Primaria que hacía las divisiones largas con errores aprende a verificar: multiplicar el cociente por el divisor y sumar el resto debe dar el dividendo. Una comprobación que elimina el 90% de los errores.',
    consejos: [
      'Regla de verificación: dividendo = (cociente × divisor) + resto. Si 47÷6=7 resto 5: 7×6+5=47. Siempre verifica así.',
      'Para dividir por 2: si el número es par, el resultado es exacto. 86÷2=43. Si es impar, habrá resto 1: 87÷2=43 resto 1.',
      'Divisibilidad básica: divisible por 3 → suma de dígitos divisible por 3. Divisible por 5 → acaba en 0 o 5. Divisible por 10 → acaba en 0.',
      'Para ESO: el MCD (Máximo Común Divisor) se calcula con el algoritmo de Euclides. El MCM se calcula descomponiendo en factores primos.',
    ],
    relacionados: [
      { nombre: 'Multiplicación', slug: 'matematicas-multiplicacion' },
      { nombre: 'Sumas y Restas', slug: 'matematicas-sumas-restas' },
      { nombre: 'Geometría', slug: 'geometria' },
    ],
  },
  // Geografía
  'geografia-europa': {
    titulo: 'Geografía de Europa — Capitales y Países',
    subtitulo: 'Examen Interactivo: Identifica los Países Europeos por Pistas Progresivas',
    emoji: '🇪🇺', gradient: 'from-blue-600 to-indigo-800',
    examPath: '/estudiar/geografia/europa',
    studyPath: '/estudiar/geografia/europa',
    asignatura: 'Geografía', niveles: 'Primaria, ESO',
    intro: 'Aprende a identificar los países de Europa a través de pistas progresivas: hemisferio, número de países vecinos, población, montañas, ríos, idioma oficial y capital. El juego se vuelve más difícil si tardas más. Cada error suma una pista nueva hasta revelar la respuesta.',
    beneficios: [
      { titulo: 'Sistema de Pistas Progresivas', texto: 'Empieza con la pista más general (hemisferio, tamaño) y avanza hacia la más específica (capital, idioma). Cuanto antes aciertes, más puntos. Esto fuerza el aprendizaje profundo.' },
      { titulo: 'Europa en Contexto', texto: 'No solo capitales: también ríos (Rin, Danubio, Volga), montañas (Alpes, Pirineos, Cárpatos), mares (Mediterráneo, Báltico, del Norte) y datos de población.' },
      { titulo: 'Preparación para Exámenes', texto: 'Los exámenes de geografía de ESO preguntan capitales, países limítrofes, ríos y características físicas. El juego los trabaja todos de forma integrada.' },
    ],
    ejemplo: 'Un alumno de 6º de Primaria que solo sabía las capitales más conocidas aprende Austria, Eslovenia y Eslovaquia en una sola sesión al ver que tienen fronteras comunes con Alemania y Hungría.',
    consejos: [
      'Aprende primero los 5 países más grandes: Rusia, Ucrania, Francia, España, Suecia. Ocupan más de la mitad del territorio europeo.',
      'Las capitales "trampa": Bratislava (Eslovaquia), Ljubljana (Eslovenia), Tirana (Albania), Chisinau (Moldavia). Las menos conocidas siempre caen en examen.',
      'Los ríos más importantes: Rin (Alemania), Danubio (atraviesa 10 países), Volga (Rusia, el más largo), Támesis (Reino Unido), Sena (Francia).',
      'Europa del Este: Polonia, República Checa, Eslovaquia, Hungría, Rumanía, Bulgaria. Memorizarlos en bloque es más eficaz que de uno en uno.',
    ],
    relacionados: [
      { nombre: 'Asia', slug: 'geografia-asia' },
      { nombre: 'América', slug: 'geografia-america' },
      { nombre: 'España — Provincias', slug: 'geografia-espana' },
    ],
  },
  'geografia-america': {
    titulo: 'Geografía de América — Países y Capitales',
    subtitulo: 'Examen de los Países de América del Norte, Central y del Sur',
    emoji: '🌎', gradient: 'from-green-600 to-emerald-800',
    examPath: '/estudiar/geografia/america',
    studyPath: '/estudiar/geografia/america',
    asignatura: 'Geografía', niveles: 'Primaria, ESO',
    intro: 'Recorre los 35 países del continente americano: desde Canadá y Estados Unidos al norte, pasando por los países centroamericanos y del Caribe, hasta Argentina y Chile en el sur. Aprende capitales, idiomas, ríos (Amazonas, Orinoco, Mississippi) y características físicas con pistas progresivas.',
    beneficios: [
      { titulo: 'América del Norte vs del Sur', texto: 'La diferencia entre Hispanoamérica, Latinoamérica y América Anglosajona. Entender qué idiomas se hablan dónde ayuda a recordar la geografía política.' },
      { titulo: 'Grandes Ríos y Selvas', texto: 'El Amazonas (más caudaloso del mundo), el Mississippi-Missouri (EEUU), el Orinoco (Venezuela). Los ríos son pistas frecuentes en el juego geográfico.' },
      { titulo: 'Capitales Difíciles', texto: 'Surinam → Paramaribo, Bolivia → Sucre (o La Paz), Trinidad y Tobago → Puerto España. Las capitales menos conocidas son las que más suelen preguntar.' },
    ],
    ejemplo: 'Un alumno de 4º ESO sabía que Brasil hablaba portugués pero no recordaba su capital. Tras la pregunta de pistas (idioma português + río Amazonas + la mayor ciudad de América del Sur), recuerda: Brasilia (no São Paulo).',
    consejos: [
      'Brasil es el único país de América del Sur que habla portugués — todos los demás hablan español excepto Guyana (inglés), Surinam (holandés) y Guayana Francesa (francés).',
      'Las capitales más confundidas: Brasil=Brasilia (no São Paulo), Australia=Canberra, Nueva Zelanda=Wellington. Brasil y América comparten el patrón.',
      'Países del Caribe: Cuba (La Habana), República Dominicana (Santo Domingo), Jamaica (Kingston), Haití (Puerto Príncipe).',
      'América Central: Guatemala, Belice, Honduras, El Salvador, Nicaragua, Costa Rica, Panamá. Aprende los 7 en orden de norte a sur.',
    ],
    relacionados: [
      { nombre: 'Europa', slug: 'geografia-europa' },
      { nombre: 'Estados Unidos — Estados', slug: 'geografia-eeuu' },
      { nombre: 'África', slug: 'geografia-africa' },
    ],
  },
  'geografia-asia': {
    titulo: 'Geografía de Asia — Países y Capitales',
    subtitulo: 'El Continente Más Grande: China, India, Japón y 45 países más',
    emoji: '🌏', gradient: 'from-red-500 to-orange-700',
    examPath: '/estudiar/geografia/asia',
    studyPath: '/estudiar/geografia/asia',
    asignatura: 'Geografía', niveles: 'ESO',
    intro: 'Asia es el continente más extenso y poblado del planeta: 44,5 millones de km², más de 4.500 millones de personas y 49 países. Aprende a identificar países como China, Japón, Corea del Sur, India, Rusia asiática, las monarquías del Golfo y los países de Asia Central con pistas geográficas progresivas.',
    beneficios: [
      { titulo: 'Las Grandes Potencias Asiáticas', texto: 'China (1.400 millones, capital Pekín/Beijing), India (1.400 millones, capital Nueva Delhi), Japón (Tokio), Indonesia (Yakarta). Los cuatro países más importantes de Asia en geografía escolar.' },
      { titulo: 'Oriente Medio y el Golfo', texto: 'Arabia Saudí, Emiratos Árabes, Qatar, Kuwait, Irán, Irak, Israel, Turquía. La región más estratégica del mundo en geopolítica actual.' },
      { nombre: 'Asia Central y Pacífico', texto: 'Los cinco "-stán" (Kazajistán, Uzbekistán, Turkmenistán, Tayikistán, Kirguistán), Corea del Norte y del Sur, Vietnam, Tailandia, Filipinas.' },
    ],
    ejemplo: 'Una alumna confundía continuamente Corea del Norte (Pyongyang) con Corea del Sur (Seúl). La pista del juego que menciona "régimen comunista cerrado" vs "democracia industrial" fija la diferencia definitivamente.',
    consejos: [
      'Asia se divide en regiones: Asia Oriental (China, Japón, Corea), Asia del Sur (India, Pakistán, Bangladesh), Asia del Sudeste (Vietnam, Tailandia, Indonesia), Asia Central (los -stán) y Oriente Medio.',
      'Los países más poblados del mundo están en Asia: China e India tienen cada uno más de 1.400 millones. El tercero es EEUU con 335 millones.',
      'Las capitales menos conocidas: Astana (Kazajistán), Taskent (Uzbekistán), Dusambé (Tayikistán), Bishkek (Kirguistán), Asjabad (Turkmenistán).',
      'Truco para Japón: las 4 islas principales son Hokkaido, Honshu, Shikoku y Kyushu. Tokyo está en Honshu, la isla central y más grande.',
    ],
    relacionados: [
      { nombre: 'Europa', slug: 'geografia-europa' },
      { nombre: 'África', slug: 'geografia-africa' },
      { nombre: 'América', slug: 'geografia-america' },
    ],
  },
  'geografia-africa': {
    titulo: 'Geografía de África — Países y Capitales',
    subtitulo: 'El Continente con Mayor Número de Países: 54 Naciones',
    emoji: '🌍', gradient: 'from-yellow-500 to-amber-700',
    examPath: '/estudiar/geografia/africa',
    studyPath: '/estudiar/geografia/africa',
    asignatura: 'Geografía', niveles: 'ESO',
    intro: 'África es el continente con mayor número de países del mundo (54) y el segundo en extensión y población. Aprende a identificar los países de África del Norte (el Magreb), África Subsahariana, los grandes ríos (Nilo, Congo, Níger) y los accidentes geográficos más importantes con pistas progresivas.',
    beneficios: [
      { titulo: 'El Magreb y África del Norte', texto: 'Marruecos (Rabat), Argelia (Argel), Túnez (Túnez), Libia (Trípoli), Egipto (El Cairo). Los cinco países del norte mediterráneo y sus capitales son los más frecuentes en ESO.' },
      { titulo: 'África Subsahariana', texto: 'Nigeria (el más poblado, Abuya), Etiopía (Adís Abeba), Sudáfrica (Pretoria/Ciudad del Cabo/Johannesburgo), Kenia (Nairobi), Ghana (Acra). Los países con más peso geopolítico y económico.' },
      { titulo: 'Ríos y Geografía Física', texto: 'El Nilo (el más largo del mundo, 6.650 km), el Congo (el más caudaloso de África), el Sahara (el desierto más grande), el Kilimanjaro (la cima más alta, 5.895 m).' },
    ],
    ejemplo: 'Un alumno de 3º ESO que solo conocía Egipto y Sudáfrica descubre que Nigeria tiene más habitantes que ningún otro país africano, más que Egipto y Etiopía juntos, y aprende a situarla en el mapa.',
    consejos: [
      'África del Norte (el Magreb): Marruecos, Argelia, Túnez, Libia, Egipto. Son los países con más presencia en los exámenes de ESO sobre África.',
      'Sudáfrica tiene 3 capitales: Pretoria (ejecutiva), Ciudad del Cabo (legislativa), Bloemfontein (judicial). Uno de los datos más sorprendentes de la geografía mundial.',
      'Los ríos: Nilo (más largo, fluye hacia el norte), Congo (más caudaloso de África, cuenca amazónica de África), Níger (África Occidental), Zambeze (cataratas Victoria).',
      'Para recordar los países del Cuerno de África: Somalia, Etiopía, Eritrea, Yibuti. Son los cuatro que forman la "punta" nororiental del continente.',
    ],
    relacionados: [
      { nombre: 'Europa', slug: 'geografia-europa' },
      { nombre: 'Asia', slug: 'geografia-asia' },
      { nombre: 'América', slug: 'geografia-america' },
    ],
  },
  'geografia-oceania': {
    titulo: 'Geografía de Oceanía — Países e Islas del Pacífico',
    subtitulo: 'Australia, Nueva Zelanda y los Archipiélagos del Pacífico',
    emoji: '🏝️', gradient: 'from-cyan-500 to-teal-700',
    examPath: '/estudiar/geografia/oceania',
    studyPath: '/estudiar/geografia/oceania',
    asignatura: 'Geografía', niveles: 'ESO',
    intro: 'Oceanía es el continente más pequeño del mundo: 14 países y territorios que se extienden por el Pacífico Sur. Aprende a identificar Australia (Canberra), Nueva Zelanda (Wellington), Papua Nueva Guinea, Fiyi, Samoa y las demás islas del Pacífico con sus características geográficas únicas.',
    beneficios: [
      { titulo: 'Australia: Continente e Isla', texto: 'Australia es el único país que ocupa un continente entero. Su capital es Canberra (no Sydney), dato que sorprende a la mayoría. El examen trabaja esta confusión frecuente.' },
      { titulo: 'Nueva Zelanda y el Pacífico', texto: 'Nueva Zelanda (Wellington como capital, no Auckland), Fiyi (Suva), Papua Nueva Guinea (Port Moresby). Los archipiélagos con mayor peso geopolítico del Pacífico Sur.' },
      { titulo: 'Geografía Física Única', texto: 'La Gran Barrera de Coral (Australia), los géiseres de Nueva Zelanda, el monte Wilhelm en Papua Nueva Guinea. Oceanía tiene la geografía física más singular del planeta.' },
    ],
    ejemplo: 'Un alumno de 2º ESO creía que Sydney era la capital de Australia. Tras la pista "ciudad planificada como capital en el siglo XX", aprende que Canberra se construyó específicamente para ser capital porque Sydney y Melbourne no se ponían de acuerdo.',
    consejos: [
      'La capital más confundida del mundo: Australia=Canberra (no Sydney ni Melbourne). Canberra fue construida entre las dos ciudades para resolver el conflicto.',
      'Nueva Zelanda: capital Wellington (sur de la Isla Norte), ciudad más grande Auckland (norte de la Isla Norte). Wellington es la capital más austral del mundo.',
      'Los países del Pacífico: Fiyi, Samoa, Tonga, Vanuatu, Islas Salomón, Micronesia, Kiribati, Tuvalu, Nauru, Palaos. Son pequeños pero soberanos.',
      'Oceanía vs Australia: "Oceanía" es el continente que incluye Australia, Nueva Zelanda y las islas del Pacífico. "Australia" es solo el país.',
    ],
    relacionados: [
      { nombre: 'Asia', slug: 'geografia-asia' },
      { nombre: 'África', slug: 'geografia-africa' },
      { nombre: 'América', slug: 'geografia-america' },
    ],
  },
  'geografia-espana': {
    titulo: 'Geografía de España — Provincias y Comunidades Autónomas',
    subtitulo: 'Las 50 Provincias de España y sus Capitales',
    emoji: '🇪🇸', gradient: 'from-red-500 to-yellow-600',
    examPath: '/estudiar/geografia/espana',
    studyPath: '/estudiar/geografia/espana',
    asignatura: 'Geografía de España', niveles: 'Primaria, ESO',
    intro: 'Aprende a identificar las 50 provincias españolas y sus capitales, agrupadas en las 17 comunidades autónomas. El examen trabaja la localización de provincias por su comunidad, sus capitales y sus características geográficas: ríos, sierras y costas.',
    beneficios: [
      { titulo: 'Las 17 Comunidades Autónomas', texto: 'Cataluña, Madrid, Andalucía, Comunidad Valenciana, Galicia, Castilla y León... Cada comunidad con sus provincias agrupadas. Aprender por bloques es más eficaz que memorizar de una en una.' },
      { titulo: 'Capitales de Provincia', texto: 'Muchas provincias tienen el mismo nombre que su capital (Madrid, Barcelona, Valencia). Pero hay excepciones: Álava=Vitoria, Guipúzcoa=San Sebastián, Vizcaya=Bilbao, Asturias=Oviedo.' },
      { titulo: 'Geografía Física de España', texto: 'Sistema Central, Cordillera Cantábrica, Pirineos, Sistema Ibérico, Sierra Nevada. El Tajo, el Ebro, el Guadalquivir, el Duero. Los ríos y sierras ayudan a localizar provincias.' },
    ],
    ejemplo: 'Un alumno de 5º de Primaria confundía Burgos con León (ambas en Castilla y León, en el norte de la Meseta). La pista "provincia que limita con La Rioja por el oeste" le ayuda a situar correctamente Burgos.',
    consejos: [
      'Las provincias del País Vasco tienen capital distinta al nombre: Álava=Vitoria-Gasteiz, Guipúzcoa=Donostia-San Sebastián, Vizcaya=Bilbao.',
      'Andalucía tiene 8 provincias: Huelva, Sevilla, Cádiz, Málaga, Granada, Almería, Jaén, Córdoba. Apréndalas de oeste a este.',
      'Castilla y León es la comunidad con más provincias (9): Ávila, Burgos, León, Palencia, Salamanca, Segovia, Soria, Valladolid, Zamora.',
      'Las islas: Baleares (Palma de Mallorca) y Canarias son 2 provincias pero con 8 islas habitadas en total. Las Canarias tienen 2 provincias: Las Palmas y S/C de Tenerife.',
    ],
    relacionados: [
      { nombre: 'Europa', slug: 'geografia-europa' },
      { nombre: 'Estados Unidos — Estados', slug: 'geografia-eeuu' },
      { nombre: 'América', slug: 'geografia-america' },
    ],
  },
  'geografia-eeuu': {
    titulo: 'Geografía de Estados Unidos — Los 50 Estados',
    subtitulo: 'Capitales, Regiones y Características de los 50 Estados Americanos',
    emoji: '🇺🇸', gradient: 'from-blue-700 to-red-700',
    examPath: '/estudiar/geografia/eeuu',
    studyPath: '/estudiar/geografia/eeuu',
    asignatura: 'Geografía', niveles: 'ESO',
    intro: 'Aprende a identificar los 50 estados de Estados Unidos: sus capitales (muchas no son las ciudades más famosas), su localización en el mapa, y sus características principales. El examen usa pistas progresivas sobre la región geográfica, la población, la frontera con otros estados o países y la capital.',
    beneficios: [
      { titulo: 'Capitales Sorprendentes', texto: 'La capital de California no es Los Ángeles (es Sacramento). La de Texas no es Dallas ni Houston (es Austin). La de Florida no es Miami (es Tallahassee). Las confusiones más frecuentes en examen.' },
      { titulo: 'Las Grandes Regiones', texto: 'Nueva Inglaterra, el Medio Oeste, el Sur, las Grandes Llanuras, las Montañas Rocosas, la Costa Oeste. Aprender los estados por región geográfica es más eficaz que de uno en uno.' },
      { titulo: 'Frontera y Geografía Física', texto: 'Los estados que limitan con México (California, Arizona, Nuevo México, Texas), los que limitan con Canadá, los que bordean los Grandes Lagos. La frontera es una pista esencial del juego.' },
    ],
    ejemplo: 'Un alumno de 4º ESO sabía que Washington D.C. era la capital federal pero ignoraba que el estado de Washington (en el noroeste) tiene capital en Olympia. La distinción entre el estado y el Distrito Columbia es una de las preguntas más frecuentes.',
    consejos: [
      'La capital federal es Washington D.C. (Distrito de Columbia) — no es un estado. El estado de Washington está en el noroeste, con capital Olympia.',
      'Las capitales más confundidas: California=Sacramento (no LA), Texas=Austin (no Houston/Dallas), Florida=Tallahassee (no Miami), Illinois=Springfield (no Chicago), NY=Albany (no NYC).',
      'Los 4 estados que limitan con México: California, Arizona, Nuevo México, Texas. Los 2 estados no contiguos: Alaska (noroeste de Canadá) y Hawái (Pacífico).',
      'Los estados más pequeños están en Nueva Inglaterra (noreste): Rhode Island, Connecticut, Massachusetts, Vermont, New Hampshire, Maine.',
    ],
    relacionados: [
      { nombre: 'España — Provincias', slug: 'geografia-espana' },
      { nombre: 'América', slug: 'geografia-america' },
      { nombre: 'Europa', slug: 'geografia-europa' },
    ],
  },
  'cuerpo-humano': {
    titulo: 'Cuerpo Humano — Sistemas y Órganos',
    subtitulo: 'Examen de Biología — Digestivo, Circulatorio, Respiratorio y Nervioso',
    emoji: '🫀', gradient: 'from-red-500 to-rose-700',
    examPath: '/examen/cuerpo-humano',
    studyPath: '/estudiar/quimica/cuerpo-humano',
    asignatura: 'Biología y Geología', niveles: 'Primaria y ESO',
    intro: 'Repasa los cuatro grandes sistemas del cuerpo humano: el sistema digestivo (boca hasta intestino), el circulatorio (corazón, arterias y venas), el respiratorio (pulmones y alvéolos) y el nervioso (neuronas, reflejos y cerebelo). Preguntas de opción múltiple con explicación detallada.',
    beneficios: [
      'Aprende el recorrido del alimento a lo largo del sistema digestivo.',
      'Distingue arterias de venas y entiende la circulación mayor y menor.',
      'Comprende el intercambio gaseoso en los alvéolos pulmonares.',
      'Conoce el sistema nervioso central y periférico, y los actos reflejos.',
    ],
    preguntasFrecuentes: [
      '¿Dónde se absorben los nutrientes? — En el intestino delgado, gracias a las vellosidades intestinales.',
      '¿Qué hace el diafragma? — Es el músculo principal de la inspiración; al bajar, los pulmones se expanden.',
      '¿Qué diferencia hay entre venas y arterias? — Las arterias salen del corazón (con presión); las venas regresan al corazón.',
    ],
    relacionados: [
      { nombre: 'La Célula', slug: 'celula' },
      { nombre: 'Nutrición', slug: 'nutricion' },
      { nombre: 'Seres Vivos', slug: 'seres-vivos' },
    ],
  },
  'seres-vivos': {
    titulo: 'Seres Vivos — Reinos y Clasificación',
    subtitulo: 'Examen de Biología — Vertebrados, Invertebrados, Plantas y Hongos',
    emoji: '🌱', gradient: 'from-emerald-500 to-green-700',
    examPath: '/examen/seres-vivos',
    studyPath: '/estudiar/quimica/seres-vivos',
    asignatura: 'Biología y Geología', niveles: 'Primaria y ESO',
    intro: 'Clasifica los seres vivos en los 5 reinos (Monera, Protista, Fungi, Plantae y Animalia). Aprende a distinguir vertebrados de invertebrados, anfibios de reptiles, angiospermas de gimnospermas y células procariotas de eucariotas. Con explicación tras cada pregunta.',
    beneficios: [
      'Memoriza las características de cada uno de los 5 reinos.',
      'Diferencia los 5 grupos de vertebrados con sus rasgos clave.',
      'Entiende la fotosíntesis y por qué las plantas son autótrofas.',
      'Aprende la diferencia entre reproducción sexual y asexual.',
    ],
    preguntasFrecuentes: [
      '¿El delfín es un pez? — No, es un mamífero: respira con pulmones y amamanta a sus crías.',
      '¿Qué diferencia anfibios de reptiles? — Los anfibios tienen metamorfosis y piel húmeda; los reptiles, escamas y huevos con cáscara.',
      '¿Qué son las angiospermas? — Plantas con flores cuyas semillas están dentro de un fruto.',
    ],
    relacionados: [
      { nombre: 'La Célula', slug: 'celula' },
      { nombre: 'Ecosistemas', slug: 'ecosistemas' },
      { nombre: 'Genética', slug: 'genetica' },
    ],
  },
  'ecosistemas': {
    titulo: 'Ecosistemas — Cadenas Tróficas y Biomas',
    subtitulo: 'Examen de Ciencias Naturales — Biomas, Adaptaciones y Biodiversidad',
    emoji: '🌍', gradient: 'from-teal-500 to-emerald-700',
    examPath: '/examen/ecosistemas',
    studyPath: '/estudiar/quimica/ecosistemas',
    asignatura: 'Biología y Geología', niveles: 'Primaria y ESO',
    intro: 'Domina los conceptos de ecología: qué es un ecosistema, cómo funciona una cadena trófica (productores, consumidores y descomponedores), los principales biomas del planeta (selva tropical, tundra, desierto) y las relaciones entre especies (mutualismo, parasitismo, comensalismo).',
    beneficios: [
      'Construye cadenas tróficas y sitúa cada ser vivo en su nivel.',
      'Identifica los biomas del planeta y sus características principales.',
      'Comprende la biodiversidad y por qué es esencial protegerla.',
      'Distingue mutualismo, comensalismo, parasitismo y depredación.',
    ],
    preguntasFrecuentes: [
      '¿Qué hace el conejo en la cadena hierba→conejo→zorro? — Es consumidor primario (herbívoro).',
      '¿Por qué el oso polar es blanco? — Adaptación para camuflarse en la nieve y cazar.',
      '¿Qué bioma tiene más biodiversidad? — La selva tropical: alberga el 50-80% de las especies del planeta.',
    ],
    relacionados: [
      { nombre: 'Seres Vivos', slug: 'seres-vivos' },
      { nombre: 'La Célula', slug: 'celula' },
      { nombre: 'Genética', slug: 'genetica' },
    ],
  },
  'genetica': {
    titulo: 'Genética — ADN, Genes y Herencia',
    subtitulo: 'Examen de Biología ESO — Cromosomas, Mendel y Mutaciones',
    emoji: '🧬', gradient: 'from-purple-500 to-violet-700',
    examPath: '/examen/genetica',
    studyPath: '/estudiar/quimica/genetica',
    asignatura: 'Biología y Geología', niveles: 'ESO',
    intro: 'Aprende los fundamentos de la genética: estructura del ADN, qué es un gen y un cromosoma, las leyes de Mendel (dominante vs. recesivo), genotipo vs. fenotipo, mutaciones y sus causas, ingeniería genética y clonación. Todo explicado con ejemplos del currículo de ESO.',
    beneficios: [
      'Entiende la estructura de la doble hélice del ADN (bases A-T y C-G).',
      'Aplica las leyes de Mendel para predecir la herencia de caracteres.',
      'Diferencia genotipo (información genética) de fenotipo (expresión observable).',
      'Conoce aplicaciones reales: insulina transgénica, CRISPR, terapia génica.',
    ],
    preguntasFrecuentes: [
      '¿Cuántos cromosomas tiene una célula humana? — 46 (23 pares). Los gametos tienen 23.',
      '¿Cuándo se expresa un alelo recesivo? — Solo cuando el individuo es homocigoto recesivo (aa).',
      '¿Quién determina el sexo del bebé? — El padre: aporta X (niña) o Y (niño).',
    ],
    relacionados: [
      { nombre: 'La Célula', slug: 'celula' },
      { nombre: 'Seres Vivos', slug: 'seres-vivos' },
      { nombre: 'Ecosistemas', slug: 'ecosistemas' },
    ],
  },
  'nutricion': {
    titulo: 'Nutrición y Alimentación Saludable',
    subtitulo: 'Examen de Biología — Macronutrientes, Vitaminas y Dieta Mediterránea',
    emoji: '🥗', gradient: 'from-lime-500 to-green-600',
    examPath: '/examen/nutricion',
    studyPath: '/estudiar/quimica/nutricion',
    asignatura: 'Biología y Geología', niveles: 'Primaria y ESO',
    intro: 'Repasa los pilares de la nutrición: macronutrientes (hidratos, proteínas y grasas), vitaminas liposolubles e hidrosolubles, minerales esenciales, la dieta mediterránea y la importancia del agua y la fibra. Preguntas de opción múltiple con explicación detallada.',
    beneficios: [
      'Distingue macronutrientes (energía) de micronutrientes (reguladores).',
      'Sabe qué vitaminas son liposolubles (A, D, E, K) y cuáles hidrosolubles (B, C).',
      'Entiende la dieta mediterránea y sus beneficios para la salud.',
      'Calcula e interpreta el IMC como herramienta de orientación nutricional.',
    ],
    preguntasFrecuentes: [
      '¿Qué vitamina produce el sol? — La vitamina D, esencial para absorber el calcio.',
      '¿Cuántas porciones de fruta y verdura se recomiendan? — 5 al día (OMS).',
      '¿Qué nutriente NO aporta calorías pero es vital? — El agua (60-70% de nuestro cuerpo).',
    ],
    relacionados: [
      { nombre: 'Cuerpo Humano', slug: 'cuerpo-humano' },
      { nombre: 'Seres Vivos', slug: 'seres-vivos' },
      { nombre: 'La Célula', slug: 'celula' },
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
  'sistema-solar': {
    titulo: 'Solar System — Planets and Celestial Bodies',
    subtitulo: 'Natural Science Exam — Planets, Movements and Features',
    emoji: '🌍', gradient: 'from-indigo-500 to-purple-700',
    examPath: '/examen/sistema-solar',
    studyPath: '/estudiar/quimica/sistema-solar',
    asignatura: 'Natural Science', niveles: 'Primary, Secondary',
    intro: 'Learn the 8 planets of the solar system, their main features and Earth\'s movements with questions adapted to Primary and Secondary. From the planet closest to the Sun to the gas giants with rings, this exam covers the full official astronomy curriculum.',
    beneficios: [
      { titulo: 'The 8 Planets in Order', texto: 'Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune. The exam reinforces the order from the Sun outwards with questions from different angles.' },
      { titulo: 'Rotation and Revolution Explained', texto: 'Rotation (day and night, 24 h) and revolution (seasons, 365 days). Confusing these two movements is the most common mistake in Primary science exams.' },
      { titulo: 'Secondary: Light Year and Seasons', texto: 'For Secondary, concepts such as the light year, Earth\'s axial tilt causing seasons, and specific planet characteristics like Venus\'s retrograde rotation are added.' },
    ],
    ejemplo: 'A Year 4 student already knew the planet names but confused rotation with revolution. After 5 exam questions with explanations, the difference is clear.',
    consejos: [
      'Mnemonic for planet order: "My Very Educated Mother Just Served Us Nachos" (Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune).',
      'Rotation = spinning on its own axis → day and night. Revolution = orbit around the Sun → year and seasons.',
      'Jupiter is the largest (over 1,000 Earths fit inside), Mercury is the smallest and closest to the Sun.',
      'For Secondary: seasons are NOT caused by distance to the Sun, but by Earth\'s axial tilt (23.5°).',
    ],
    relacionados: [
      { nombre: 'The Cell', slug: 'celula' },
      { nombre: 'States of Matter', slug: 'estados-materia' },
      { nombre: 'Atoms & Molecules', slug: 'atomos-moleculas' },
    ],
  },
  'celula': {
    titulo: 'The Cell — Basic Unit of Life',
    subtitulo: 'Biology Exam — Organelles, Cell Types and Functions',
    emoji: '🔬', gradient: 'from-green-500 to-teal-700',
    examPath: '/examen/celula',
    studyPath: '/estudiar/quimica/celula',
    asignatura: 'Biology & Geology', niveles: 'Secondary',
    intro: 'Master the key concepts of cell biology: the difference between prokaryotic and eukaryotic cells, animal and plant cells, the function of each organelle, and fundamental processes such as photosynthesis, cellular respiration and mitosis — with a detailed explanation after each answer.',
    beneficios: [
      { titulo: 'Prokaryote vs Eukaryote', texto: 'The most important distinction in cell biology: the presence or absence of a defined nucleus. Bacteria are prokaryotes; animals, plants and fungi are eukaryotes.' },
      { titulo: 'Animal vs Plant', texto: 'Cell wall, chloroplasts and a large central vacuole are exclusive to plant cells. The exam tackles these differences with direct and comparative questions.' },
      { titulo: 'Organelles with Functions', texto: 'Mitochondrion=energy (ATP), ribosomes=proteins, chloroplast=photosynthesis, vacuole=storage. Each organelle is learned with its function in one focused question.' },
    ],
    ejemplo: 'A Year 9 student who was memorising organelles without understanding them sees the mitochondrion question: "powerhouse using O₂ to produce ATP". She links it to exercise. Now she remembers it.',
    consejos: [
      'Key difference: prokaryote (bacteria) has NO nucleus. Eukaryote (animals, plants, fungi) has a nucleus with a membrane.',
      'Plant vs animal cell: plant has CELL WALL + CHLOROPLASTS + LARGE VACUOLE. Animal cell has none of these three.',
      'Mitochondrion = energy (cellular respiration). Chloroplast = photosynthesis (only in light-using cells). Ribosome = proteins (in all cells).',
      'Photosynthesis: CO₂ + H₂O + light → glucose + O₂. Cellular respiration: glucose + O₂ → ATP + CO₂ + H₂O. They are opposite processes.',
    ],
    relacionados: [
      { nombre: 'Solar System', slug: 'sistema-solar' },
      { nombre: 'Atoms & Molecules', slug: 'atomos-moleculas' },
      { nombre: 'Mixtures & Separation', slug: 'mezclas-separacion' },
    ],
  },
  'geometria': {
    titulo: 'Geometry — Shapes, Areas and Volumes',
    subtitulo: 'Maths Exam — Pythagoras Theorem, Perimeters and Formulae',
    emoji: '📐', gradient: 'from-pink-500 to-rose-700',
    examPath: '/examen/geometria',
    studyPath: '/examen/geometria',
    asignatura: 'Mathematics', niveles: 'Primary, Secondary',
    intro: 'Revise plane and solid geometry formulae: areas of triangles, squares, rectangles and circles; types of angles and triangles; the Pythagorean theorem with numerical examples; and volumes of cubes and cylinders — all explained after each question.',
    beneficios: [
      { titulo: 'Formulae with Examples', texto: 'Knowing that the triangle area is (base×height)/2 is not enough. The exam requires applying it with concrete numbers. Each explanation includes the full calculation.' },
      { titulo: 'Pythagoras Step by Step', texto: 'a²+b²=c². The most common Pythagorean triples (3-4-5, 6-8-10) appear in the exam so students can automate them before tackling general cases.' },
      { titulo: 'Primary → Secondary Progression', texto: 'Primary covers basic angles, triangle types, perimeters and simple areas. Secondary adds Pythagoras, cylinder and cube volumes, and circle areas.' },
    ],
    ejemplo: 'A Year 8 student always confused area with perimeter. After seeing the explanation "area in cm², perimeter in linear cm" across 3 questions, the confusion is gone.',
    consejos: [
      'Angles: acute<90°, right=90°, obtuse between 90° and 180°, straight=180°. Interior angles of any triangle sum to 180°.',
      'Triangle area = (base × height) / 2. Circle area = πr². Square area = L². Rectangle area = length × width.',
      'Pythagoras only for right triangles: a²+b²=c² where c is the hypotenuse (longest side, opposite the right angle).',
      'For volumes: cube = a³, cylinder = πr²×h. "Volume" always uses cubic units (cm³, m³).',
    ],
    relacionados: [
      { nombre: 'Atoms & Molecules', slug: 'atomos-moleculas' },
      { nombre: 'Solar System', slug: 'sistema-solar' },
      { nombre: 'Periodic Table', slug: 'tabla-periodica' },
    ],
  },
  // History
  'historia-guerra-civil': {
    titulo: 'Spanish Civil War — History Exam',
    subtitulo: 'From the 1936 Military Coup to the Francoist Dictatorship',
    emoji: '🇪🇸', gradient: 'from-red-600 to-rose-800',
    examPath: '/estudiar/historia/gce',
    studyPath: '/estudiar/historia/gce',
    asignatura: 'History of Spain', niveles: 'Secondary, Sixth Form',
    intro: 'Revise the key events of the Spanish Civil War: causes of the 1936 military uprising, major battles, historical figures such as Franco, Azaña and La Pasionaria, foreign intervention and the onset of the dictatorship. Exam with multiple-choice questions based on the official curriculum.',
    beneficios: [
      { titulo: 'Clear Chronology', texto: 'From the coup of 17 July 1936 to 1 April 1939. The exam works through key dates with context, not just isolated facts.' },
      { titulo: 'Historical Figures', texto: 'Franco, Manuel Azaña, Largo Caballero, La Pasionaria, Mola. Each figure with their role in the conflict and their side.' },
      { titulo: 'International Context', texto: 'International Brigades, Nazi-Fascist support for the Nationalists, the non-intervention pact. The civil war within the European landscape of the 1930s.' },
    ],
    ejemplo: 'A Year 10 student who confused the Popular Front with the National Front understands the difference after seeing the question about the February 1936 elections.',
    consejos: [
      'Timeline: coup (July 1936) → war (1936-1939) → Nationalist victory (1 April 1939) → dictatorship (1939-1975).',
      'The two sides: Republicans (legitimate government, Popular Front, USSR, International Brigades) vs Nationalists (Franco, Nazi Germany, Fascist Italy).',
      'Key battles: Battle of the Ebro (longest), Madrid (held out throughout), Guernica (Nazi bombing, 1937).',
      'For Sixth Form: structural causes — crisis of the Second Republic, political polarisation, the 1934 revolution.',
    ],
    relacionados: [
      { nombre: 'World War II', slug: 'historia-segunda-guerra-mundial' },
      { nombre: 'Great Milestones of History', slug: 'historia-hitos' },
      { nombre: 'Ancient Rome', slug: 'historia-antigua-roma' },
    ],
  },
  'historia-segunda-guerra-mundial': {
    titulo: 'World War II — History Exam',
    subtitulo: 'From the Invasion of Poland (1939) to Hiroshima (1945)',
    emoji: '⚔️', gradient: 'from-gray-600 to-slate-800',
    examPath: '/estudiar/historia/wwii',
    studyPath: '/estudiar/historia/wwii',
    asignatura: 'Contemporary World History', niveles: 'Secondary, Sixth Form',
    intro: 'Study the decisive moments of the Second World War: the German Blitzkrieg, the Battle of Britain, the Holocaust, Operation Barbarossa, the D-Day landings and the atomic bombs on Japan. Multiple-choice exam based on the official curriculum.',
    beneficios: [
      { titulo: 'Causes and Consequences', texto: 'The Treaty of Versailles as the seed of conflict, the rise of Nazism, and the Cold War as a direct consequence. WWII does not arise from nowhere and does not end without repercussions.' },
      { titulo: 'Historical Figures', texto: 'Hitler, Churchill, Stalin, Roosevelt, Eisenhower, Rommel. The exam places each figure in their context and on their side.' },
      { titulo: 'Geography of the Conflict', texto: 'Western Front, Eastern Front, Pacific. Understanding where things happened is essential for remembering why they happened.' },
    ],
    ejemplo: 'A Year 12 student who always confused Operation Overlord with Operation Barbarossa understands the difference after seeing the question alongside a map of Europe.',
    consejos: [
      'Basic timeline: invasion of Poland (Sept. 1939) → fall of France (1940) → Barbarossa (1941) → Pearl Harbor (Dec. 1941) → D-Day Normandy (Jun. 1944) → VE Day (May 1945) → Hiroshima (Aug. 1945).',
      'Allies: USA, UK, USSR, France. Axis: Germany, Italy, Japan.',
      'The Holocaust: 6 million Jews murdered. Auschwitz, Treblinka, and Sobibor are the most commonly mentioned extermination camps in exams.',
      'For Sixth Form: causes include the Treaty of Versailles (1919), the Great Depression (1929) and the failure of the League of Nations.',
    ],
    relacionados: [
      { nombre: 'Spanish Civil War', slug: 'historia-guerra-civil' },
      { nombre: 'American Independence', slug: 'historia-independencia-americana' },
      { nombre: 'Great Milestones of History', slug: 'historia-hitos' },
    ],
  },
  'historia-independencia-americana': {
    titulo: 'American Independence — History Exam',
    subtitulo: 'From the Boston Tea Party to the United States Constitution',
    emoji: '🦅', gradient: 'from-blue-700 to-indigo-900',
    examPath: '/estudiar/historia/usa',
    studyPath: '/estudiar/historia/usa',
    asignatura: 'World History', niveles: 'Secondary',
    intro: 'Learn the origins, development and consequences of the American Revolution: the crisis with Britain, the Boston Tea Party, the Declaration of Independence of 1776, the war against Great Britain and the creation of the Constitution. World history exam for Secondary.',
    beneficios: [
      { titulo: 'Causes of the Conflict', texto: 'Taxation without representation, the Intolerable Acts, the Boston Tea Party of 1773. Understanding why the revolution erupted is the key to remembering how it unfolded.' },
      { titulo: 'Founding Documents', texto: 'The Declaration of Independence (4 July 1776) and the Constitution (1787) are the two most important documents. The exam tests their dates, authors and key principles.' },
      { titulo: 'Founding Fathers', texto: 'George Washington, Thomas Jefferson, Benjamin Franklin, John Adams. Each Founding Father with their role in independence.' },
    ],
    ejemplo: 'A Year 9 student could not understand why the colonies wanted independence if they were prosperous. The question about taxation without representation clarifies it: it was not poverty, it was political principle.',
    consejos: [
      'Timeline: Boston Tea Party (1773) → First Continental Congress (1774) → Declaration of Independence (4 July 1776) → victory at Yorktown (1781) → Constitution (1787).',
      '"No taxation without representation" — the key phrase summarising the main cause of the conflict.',
      'Allies of the colonies: France (Lafayette) and Spain, who saw an opportunity to weaken Britain.',
      'The 13 original colonies became the first 13 US states — a detail that frequently comes up in exams.',
    ],
    relacionados: [
      { nombre: 'World War II', slug: 'historia-segunda-guerra-mundial' },
      { nombre: 'Spanish Civil War', slug: 'historia-guerra-civil' },
      { nombre: 'Great Milestones of History', slug: 'historia-hitos' },
    ],
  },
  'historia-antigua-roma': {
    titulo: 'Ancient Rome — History Exam',
    subtitulo: 'From Romulus and Remus to the Collapse of the Roman Empire',
    emoji: '🏛️', gradient: 'from-amber-600 to-yellow-800',
    examPath: '/estudiar/historia/roma',
    studyPath: '/estudiar/historia/roma',
    asignatura: 'Classical History', niveles: 'Primary, Secondary',
    intro: 'Travel through the history of Rome from its mythical origins to the fall of the Empire: the monarchy, the Republic with its consuls and senate, the Punic Wars, Julius Caesar, the Empire under Augustus and the most important emperors, and the fall in AD 476.',
    beneficios: [
      { titulo: 'Three Key Periods', texto: 'Kingdom (753-509 BC), Republic (509-27 BC) and Empire (27 BC-AD 476). Knowing which period each event belongs to is the foundation of the exam.' },
      { titulo: 'Roman Figures', texto: 'Romulus, Julius Caesar, Augustus, Nero, Marcus Aurelius, Constantine. The exam places each figure in their era and explains their historical significance.' },
      { titulo: 'Republican Institutions', texto: 'The Senate, consuls, tribune of the plebs, the Law of the Twelve Tables. Roman institutions are the foundation of Western law and frequently appear in school-leaving exams.' },
    ],
    ejemplo: 'A Year 8 student confused the Republic with the Empire. After seeing the question "In which period did consuls govern?" with its explanation, she can now distinguish all three periods clearly.',
    consejos: [
      'Three periods with dates: Kingdom (753-509 BC) → Republic (509-27 BC) → Empire (27 BC-AD 476).',
      'Julius Caesar was NOT an emperor: he was a dictator during the Republic. Augustus was the FIRST emperor (27 BC).',
      'Punic Wars (against Carthage, Hannibal and the elephants): I (264-241), II (218-201), III (149-146 BC).',
      'The fall: AD 476, when Odoacer deposes Romulus Augustulus. Only the Western Empire falls — the Eastern (Byzantine) Empire lasts until 1453.',
    ],
    relacionados: [
      { nombre: 'Great Milestones of History', slug: 'historia-hitos' },
      { nombre: 'Spanish Civil War', slug: 'historia-guerra-civil' },
      { nombre: 'American Independence', slug: 'historia-independencia-americana' },
    ],
  },
  'historia-hitos': {
    titulo: 'Great Milestones of History',
    subtitulo: 'The Moments that Changed the World — Primary History Exam',
    emoji: '🌍', gradient: 'from-teal-600 to-cyan-800',
    examPath: '/estudiar/historia/primaria',
    studyPath: '/estudiar/historia/primaria',
    asignatura: 'World History', niveles: 'Primary, Secondary',
    intro: 'From writing in Mesopotamia to the Moon landing, this exam covers the most important events in human history: ancient civilisations, great discoveries, revolutions and 20th-century milestones. Aligned to the Primary Social Studies and Secondary History curriculum.',
    beneficios: [
      { titulo: 'Ancient Civilisations', texto: 'Egypt, Mesopotamia, Greece, Rome. The earliest civilisations with their contributions: writing, democracy, law, architecture. The exam connects each culture to its legacy.' },
      { titulo: 'Great Discoveries', texto: 'The printing press (Gutenberg, 1450), America (Columbus, 1492), the scientific revolution (Galileo, Newton). Each discovery with its date, author and consequences.' },
      { titulo: '20th Century Highlights', texto: 'The two World Wars, the Moon landing (1969), the fall of the Berlin Wall (1989). Recent milestones with simplified historical context.' },
    ],
    ejemplo: 'A Year 6 student learns that Columbus reached America in 1492 but does not confuse this with Magellan (first circumnavigation, 1519-1522) thanks to the comparative questions in the exam.',
    consejos: [
      'The 4 great ancient civilisations: Mesopotamia (cuneiform writing), Egypt (hieroglyphics, pyramids), Greece (democracy, philosophy), Rome (law, engineering).',
      'Great discoveries: printing press (1450) → America (1492) → circumnavigation (1522) → telescope (Galileo, 1609).',
      '20th century: WWI (1914-1918) → WWII (1939-1945) → Moon landing (1969) → fall of Berlin Wall (1989).',
      'Tip for Primary: link each milestone to a round, easy-to-remember number. 1492 (America) and 1969 (Moon) are the most important.',
    ],
    relacionados: [
      { nombre: 'Ancient Rome', slug: 'historia-antigua-roma' },
      { nombre: 'Spanish Civil War', slug: 'historia-guerra-civil' },
      { nombre: 'World War II', slug: 'historia-segunda-guerra-mundial' },
    ],
  },
  // Mathematics
  'matematicas-sumas-restas': {
    titulo: 'Addition & Subtraction — Mental Arithmetic',
    subtitulo: 'Maths Exam — Combined Basic Operations',
    emoji: '➕', gradient: 'from-blue-500 to-cyan-600',
    examPath: '/estudiar/matematicas/sumas-restas/examen',
    studyPath: '/estudiar/matematicas/sumas-restas/examen',
    asignatura: 'Mathematics', niveles: 'Primary, Secondary',
    intro: 'Practise addition and subtraction with progressive mental arithmetic. The exam presents operations of increasing difficulty — from single-digit numbers to tens and hundreds — to build arithmetic fluency before moving on to multiplication and division.',
    beneficios: [
      { titulo: 'Progressive Mental Arithmetic', texto: 'Operations increase in complexity throughout the exam. You start with 7+5 and finish with 234-87. The brain warms up gradually.' },
      { titulo: 'Foundation for Everything Else', texto: 'Addition and subtraction are the basis for multiplication, division and fractions. Mastering them without a calculator is the most valuable maths skill in Primary.' },
      { titulo: 'Speed and Accuracy', texto: 'The exam measures not only whether you get the right answer, but whether you do so with confidence. Repeating the same type of operation in different variants builds automaticity.' },
    ],
    ejemplo: 'A Year 3 student who struggled with borrowing in subtraction practises for 10 minutes a day over a week. By the end of the week, he solves them without errors or hesitation.',
    consejos: [
      'For fast addition: group numbers that make 10 first. 3+7+4+6 = (3+7)+(4+6) = 10+10 = 20.',
      'For subtraction with borrowing: picture the larger number "lending" a ten. 52-7: think of 52 as 40+12, so 12-7=5, result 45.',
      'Practise single-digit combinations until they are automatic (7+8, 9+6, 13-7...) — they are the basis of all mental arithmetic.',
      'If you get stuck, break the operation into parts: 67+38 = 67+30+8 = 97+8 = 105.',
    ],
    relacionados: [
      { nombre: 'Multiplication', slug: 'matematicas-multiplicacion' },
      { nombre: 'Division', slug: 'matematicas-division' },
      { nombre: 'Geometry', slug: 'geometria' },
    ],
  },
  'matematicas-multiplicacion': {
    titulo: 'Multiplication — Times Tables & Mental Arithmetic',
    subtitulo: 'Maths Exam — Times Tables 1 to 10 and Multiplications',
    emoji: '✖️', gradient: 'from-violet-500 to-purple-700',
    examPath: '/estudiar/matematicas/multiplicaciones/examen',
    studyPath: '/estudiar/matematicas/multiplicaciones/examen',
    asignatura: 'Mathematics', niveles: 'Primary, Secondary',
    intro: 'Master the times tables from 1 to 10 and practise multiplications of increasing difficulty. The exam combines pure multiplications with mixed operations to consolidate mental arithmetic and prepare you for division, fractions and algebra in higher years.',
    beneficios: [
      { titulo: 'Automated Times Tables', texto: 'The goal is not to know the tables — it is to have them so internalised they come instantly. The exam repeats the hardest ones (7×8, 6×9, 8×9) more frequently.' },
      { titulo: 'Mixed Operations', texto: 'We combine multiplication with addition and subtraction to practise the order of operations. 3×4+7 is not the same as 3×(4+7) — a critical distinction in Secondary.' },
      { titulo: 'Calculation with Tens', texto: 'Multiplying by 10, 100, multiples of 10. Mental tricks like 15×4 = 15×2×2 = 30×2 = 60. Faster than a calculator.' },
    ],
    ejemplo: 'A Year 4 student who took 5 seconds to recall 7×8 practises the exam daily. Within two weeks it comes instantly, freeing up mental capacity for problem-solving.',
    consejos: [
      'Hard tables (6,7,8,9): practise these more than the easy ones. 7×7=49, 7×8=56, 8×8=64, 9×9=81.',
      'Trick for 9: 9×n → the digit sum of the result is always 9. 9×7=63 (6+3=9). The first digit is always n-1: 9×7=6_.',
      'To multiply by 11: 11×n (1-9) = nn. 11×7=77. For larger numbers: 11×35 = 3(3+5)5 = 385.',
      'Order of operations: brackets first, then multiplication and division, finally addition and subtraction (BODMAS).',
    ],
    relacionados: [
      { nombre: 'Division', slug: 'matematicas-division' },
      { nombre: 'Addition & Subtraction', slug: 'matematicas-sumas-restas' },
      { nombre: 'Geometry', slug: 'geometria' },
    ],
  },
  'matematicas-division': {
    titulo: 'Division — Maths Exam',
    subtitulo: 'Exact and Inexact Divisions — Primary and Secondary',
    emoji: '➗', gradient: 'from-orange-500 to-red-600',
    examPath: '/estudiar/matematicas/divisiones/examen',
    studyPath: '/estudiar/matematicas/divisiones/examen',
    asignatura: 'Mathematics', niveles: 'Primary, Secondary',
    intro: 'Practise exact and inexact divisions with 1, 2 and 3-digit dividends. The exam works on division as the inverse of multiplication and prepares students for quotients, remainders, lowest common multiple and highest common factor in Secondary.',
    beneficios: [
      { titulo: 'Division as Sharing', texto: 'Understanding division as "how many times does it fit" or "how much does each person get" makes it intuitive. The exam uses sharing contexts before moving to abstraction.' },
      { titulo: 'Quotient and Remainder', texto: 'Inexact division gives a quotient and remainder. 17÷5=3 remainder 2 (because 5×3=15, and 17-15=2). Mastering this is essential for fractions and decimals.' },
      { titulo: 'Inverse of Multiplication', texto: 'If 6×7=42, then 42÷6=7 and 42÷7=6. Seeing the relationship between multiplication and division halves calculation time.' },
    ],
    ejemplo: 'A Year 5 student who made errors in long division learns to verify: multiply the quotient by the divisor and add the remainder — it must equal the dividend. A check that eliminates 90% of mistakes.',
    consejos: [
      'Verification rule: dividend = (quotient × divisor) + remainder. If 47÷6=7 r5: 7×6+5=47. Always check this way.',
      'Dividing by 2: if the number is even, the result is exact. 86÷2=43. If odd, remainder is 1: 87÷2=43 r1.',
      'Divisibility rules: divisible by 3 → digit sum divisible by 3. By 5 → ends in 0 or 5. By 10 → ends in 0.',
      'For Secondary: HCF (Highest Common Factor) is found with the Euclidean algorithm. LCM is found by prime factorisation.',
    ],
    relacionados: [
      { nombre: 'Multiplication', slug: 'matematicas-multiplicacion' },
      { nombre: 'Addition & Subtraction', slug: 'matematicas-sumas-restas' },
      { nombre: 'Geometry', slug: 'geometria' },
    ],
  },
  // Geography
  'geografia-europa': {
    titulo: 'Geography of Europe — Countries and Capitals',
    subtitulo: 'Interactive Exam: Identify European Countries from Progressive Clues',
    emoji: '🇪🇺', gradient: 'from-blue-600 to-indigo-800',
    examPath: '/estudiar/geografia/europa',
    studyPath: '/estudiar/geografia/europa',
    asignatura: 'Geography', niveles: 'Primary, Secondary',
    intro: 'Learn to identify the countries of Europe through progressive clues: hemisphere, number of neighbours, population, mountains, rivers, official language and capital. The game gets harder the longer you take. Each wrong answer reveals a new clue.',
    beneficios: [
      { titulo: 'Progressive Clue System', texto: 'Start with the most general clue (hemisphere, size) and work towards the most specific (capital, language). The earlier you guess, the more points. This forces deep learning.' },
      { titulo: 'Europe in Context', texto: 'Not just capitals: also rivers (Rhine, Danube, Volga), mountains (Alps, Pyrenees, Carpathians), seas (Mediterranean, Baltic, North Sea) and population data.' },
      { titulo: 'Exam Preparation', texto: 'Secondary geography exams ask for capitals, bordering countries, rivers and physical features. The game covers them all in an integrated way.' },
    ],
    ejemplo: 'A Year 6 student who only knew the best-known capitals learns Austria, Slovenia and Slovakia in a single session by seeing that they share borders with Germany and Hungary.',
    consejos: [
      'Learn the 5 largest countries first: Russia, Ukraine, France, Spain, Sweden. They cover more than half of Europe\'s land area.',
      'Tricky capitals: Bratislava (Slovakia), Ljubljana (Slovenia), Tirana (Albania), Chisinau (Moldova). The least-known ones always appear in exams.',
      'Most important rivers: Rhine (Germany), Danube (crosses 10 countries), Volga (Russia, longest), Thames (UK), Seine (France).',
      'Eastern Europe: Poland, Czech Republic, Slovakia, Hungary, Romania, Bulgaria. Learn them as a block rather than one by one.',
    ],
    relacionados: [
      { nombre: 'Asia', slug: 'geografia-asia' },
      { nombre: 'The Americas', slug: 'geografia-america' },
      { nombre: 'Spain — Provinces', slug: 'geografia-espana' },
    ],
  },
  'geografia-america': {
    titulo: 'Geography of the Americas — Countries and Capitals',
    subtitulo: 'Exam on the Countries of North, Central and South America',
    emoji: '🌎', gradient: 'from-green-600 to-emerald-800',
    examPath: '/estudiar/geografia/america',
    studyPath: '/estudiar/geografia/america',
    asignatura: 'Geography', niveles: 'Primary, Secondary',
    intro: 'Explore the 35 countries of the American continent: from Canada and the United States in the north, through Central America and the Caribbean, to Argentina and Chile in the south. Learn capitals, languages, rivers (Amazon, Orinoco, Mississippi) and physical features with progressive clues.',
    beneficios: [
      { titulo: 'North vs South America', texto: 'The difference between Hispanic America, Latin America and Anglo-Saxon America. Understanding which languages are spoken where helps to remember political geography.' },
      { titulo: 'Great Rivers and Rainforests', texto: 'The Amazon (most voluminous river in the world), the Mississippi-Missouri (USA), the Orinoco (Venezuela). Rivers are frequent clues in the geography game.' },
      { titulo: 'Tricky Capitals', texto: 'Suriname → Paramaribo, Bolivia → Sucre (or La Paz), Trinidad and Tobago → Port of Spain. The lesser-known capitals are the ones most often tested.' },
    ],
    ejemplo: 'A Year 10 student knew Brazil spoke Portuguese but could not remember its capital. After the clue sequence (Portuguese language + Amazon river + largest South American city), he remembers: Brasília — not São Paulo.',
    consejos: [
      'Brazil is the only South American country that speaks Portuguese — all others speak Spanish except Guyana (English), Suriname (Dutch) and French Guiana (French).',
      'Most confused capitals: Brazil=Brasília (not São Paulo), Australia=Canberra, New Zealand=Wellington.',
      'Caribbean countries: Cuba (Havana), Dominican Republic (Santo Domingo), Jamaica (Kingston), Haiti (Port-au-Prince).',
      'Central America: Guatemala, Belize, Honduras, El Salvador, Nicaragua, Costa Rica, Panama. Learn all 7 from north to south.',
    ],
    relacionados: [
      { nombre: 'Europe', slug: 'geografia-europa' },
      { nombre: 'United States — States', slug: 'geografia-eeuu' },
      { nombre: 'Africa', slug: 'geografia-africa' },
    ],
  },
  'geografia-asia': {
    titulo: 'Geography of Asia — Countries and Capitals',
    subtitulo: 'The Largest Continent: China, India, Japan and 45 More Countries',
    emoji: '🌏', gradient: 'from-red-500 to-orange-700',
    examPath: '/estudiar/geografia/asia',
    studyPath: '/estudiar/geografia/asia',
    asignatura: 'Geography', niveles: 'Secondary',
    intro: 'Asia is the largest and most populous continent: 44.5 million km², over 4.5 billion people and 49 countries. Learn to identify countries such as China, Japan, South Korea, India, Russia\'s Asian territory, the Gulf monarchies and Central Asian nations with progressive geographic clues.',
    beneficios: [
      { titulo: 'The Great Asian Powers', texto: 'China (1.4 billion, capital Beijing), India (1.4 billion, capital New Delhi), Japan (Tokyo), Indonesia (Jakarta). The four most important countries in school geography.' },
      { titulo: 'The Middle East and Gulf', texto: 'Saudi Arabia, UAE, Qatar, Kuwait, Iran, Iraq, Israel, Turkey. The world\'s most strategically important region in current geopolitics.' },
      { titulo: 'Central Asia and the Pacific', texto: 'The five "-stan" countries (Kazakhstan, Uzbekistan, Turkmenistan, Tajikistan, Kyrgyzstan), North and South Korea, Vietnam, Thailand, Philippines.' },
    ],
    ejemplo: 'A student kept confusing North Korea (Pyongyang) with South Korea (Seoul). The game clue mentioning "closed communist regime" vs "industrial democracy" fixes the distinction permanently.',
    consejos: [
      'Asia is divided into regions: East (China, Japan, Korea), South (India, Pakistan, Bangladesh), Southeast (Vietnam, Thailand, Indonesia), Central (the -stans) and Middle East.',
      'The world\'s most populous countries are in Asia: China and India each have over 1.4 billion people. The third is the US with 335 million.',
      'Lesser-known capitals: Nur-Sultan/Astana (Kazakhstan), Tashkent (Uzbekistan), Dushanbe (Tajikistan), Bishkek (Kyrgyzstan), Ashgabat (Turkmenistan).',
      'Japan tip: the 4 main islands are Hokkaido, Honshu, Shikoku and Kyushu. Tokyo is on Honshu, the central and largest island.',
    ],
    relacionados: [
      { nombre: 'Europe', slug: 'geografia-europa' },
      { nombre: 'Africa', slug: 'geografia-africa' },
      { nombre: 'The Americas', slug: 'geografia-america' },
    ],
  },
  'geografia-africa': {
    titulo: 'Geography of Africa — Countries and Capitals',
    subtitulo: 'The Continent with the Most Countries: 54 Nations',
    emoji: '🌍', gradient: 'from-yellow-500 to-amber-700',
    examPath: '/estudiar/geografia/africa',
    studyPath: '/estudiar/geografia/africa',
    asignatura: 'Geography', niveles: 'Secondary',
    intro: 'Africa has more countries than any other continent (54) and is second in area and population. Learn to identify the countries of North Africa (the Maghreb), Sub-Saharan Africa, the great rivers (Nile, Congo, Niger) and the most important physical features with progressive clues.',
    beneficios: [
      { titulo: 'The Maghreb and North Africa', texto: 'Morocco (Rabat), Algeria (Algiers), Tunisia (Tunis), Libya (Tripoli), Egypt (Cairo). The five northern Mediterranean countries and their capitals are the most frequent in Secondary exams.' },
      { titulo: 'Sub-Saharan Africa', texto: 'Nigeria (most populous, Abuja), Ethiopia (Addis Ababa), South Africa (Pretoria/Cape Town/Johannesburg), Kenya (Nairobi), Ghana (Accra). Countries with the greatest geopolitical and economic weight.' },
      { titulo: 'Rivers and Physical Geography', texto: 'The Nile (longest river in the world, 6,650 km), the Congo (most voluminous in Africa), the Sahara (largest desert), Kilimanjaro (highest peak, 5,895 m).' },
    ],
    ejemplo: 'A Year 9 student who only knew Egypt and South Africa discovers that Nigeria has more inhabitants than any other African country — more than Egypt and Ethiopia combined — and learns to place it on the map.',
    consejos: [
      'North Africa (the Maghreb): Morocco, Algeria, Tunisia, Libya, Egypt. These are the countries that appear most in Secondary Africa questions.',
      'South Africa has 3 capitals: Pretoria (executive), Cape Town (legislative), Bloemfontein (judicial). One of the most surprising facts in world geography.',
      'Rivers: Nile (longest, flows northward), Congo (most voluminous in Africa), Niger (West Africa), Zambezi (Victoria Falls).',
      'Horn of Africa: Somalia, Ethiopia, Eritrea, Djibouti — the four countries forming the northeastern "horn" of the continent.',
    ],
    relacionados: [
      { nombre: 'Europe', slug: 'geografia-europa' },
      { nombre: 'Asia', slug: 'geografia-asia' },
      { nombre: 'The Americas', slug: 'geografia-america' },
    ],
  },
  'geografia-oceania': {
    titulo: 'Geography of Oceania — Countries and Pacific Islands',
    subtitulo: 'Australia, New Zealand and the Archipelagos of the Pacific',
    emoji: '🏝️', gradient: 'from-cyan-500 to-teal-700',
    examPath: '/estudiar/geografia/oceania',
    studyPath: '/estudiar/geografia/oceania',
    asignatura: 'Geography', niveles: 'Secondary',
    intro: 'Oceania is the smallest continent: 14 countries and territories spread across the South Pacific. Learn to identify Australia (Canberra), New Zealand (Wellington), Papua New Guinea, Fiji, Samoa and the other Pacific islands with their unique geographic features.',
    beneficios: [
      { titulo: 'Australia: Continent and Island', texto: 'Australia is the only country that occupies an entire continent. Its capital is Canberra — not Sydney — a fact that surprises most students. The exam targets this frequent mistake.' },
      { titulo: 'New Zealand and the Pacific', texto: 'New Zealand (Wellington as capital, not Auckland), Fiji (Suva), Papua New Guinea (Port Moresby). The archipelagos with the greatest geopolitical weight in the South Pacific.' },
      { titulo: 'Unique Physical Geography', texto: 'The Great Barrier Reef (Australia), New Zealand\'s geysers, Mount Wilhelm in Papua New Guinea. Oceania has the most singular physical geography on Earth.' },
    ],
    ejemplo: 'A Year 8 student thought Sydney was Australia\'s capital. After the clue "city planned as capital in the 20th century", he learns that Canberra was built specifically as a compromise between Sydney and Melbourne.',
    consejos: [
      'The world\'s most confused capital: Australia=Canberra (not Sydney or Melbourne). Canberra was built between the two cities to resolve their rivalry.',
      'New Zealand: capital Wellington (south of the North Island), largest city Auckland (north of the North Island). Wellington is the world\'s southernmost capital.',
      'Pacific nations: Fiji, Samoa, Tonga, Vanuatu, Solomon Islands, Micronesia, Kiribati, Tuvalu, Nauru, Palau. Small but sovereign.',
      'Oceania vs Australia: "Oceania" is the continent including Australia, New Zealand and the Pacific islands. "Australia" is just the country.',
    ],
    relacionados: [
      { nombre: 'Asia', slug: 'geografia-asia' },
      { nombre: 'Africa', slug: 'geografia-africa' },
      { nombre: 'The Americas', slug: 'geografia-america' },
    ],
  },
  'geografia-espana': {
    titulo: 'Geography of Spain — Provinces and Autonomous Communities',
    subtitulo: 'Spain\'s 50 Provinces and their Capitals',
    emoji: '🇪🇸', gradient: 'from-red-500 to-yellow-600',
    examPath: '/estudiar/geografia/espana',
    studyPath: '/estudiar/geografia/espana',
    asignatura: 'Geography of Spain', niveles: 'Primary, Secondary',
    intro: 'Learn to identify Spain\'s 50 provinces and their capitals, grouped into the 17 autonomous communities. The exam covers province location within each community, capitals, rivers, mountain ranges and coastlines.',
    beneficios: [
      { titulo: 'The 17 Autonomous Communities', texto: 'Catalonia, Madrid, Andalusia, Valencia, Galicia, Castile and León... Each community with its provinces grouped. Learning in blocks is far more effective than one by one.' },
      { titulo: 'Provincial Capitals', texto: 'Many provinces share the name of their capital (Madrid, Barcelona, Valencia). But there are exceptions: Álava=Vitoria, Guipúzcoa=San Sebastián, Vizcaya=Bilbao, Asturias=Oviedo.' },
      { titulo: 'Physical Geography of Spain', texto: 'Central System, Cantabrian Mountains, Pyrenees, Iberian System, Sierra Nevada. The Tagus, Ebro, Guadalquivir, Douro. Rivers and mountain ranges help to locate provinces.' },
    ],
    ejemplo: 'A Year 6 student confused Burgos with León (both in Castile and León, on the northern Meseta). The clue "province bordering La Rioja to the west" helps him correctly place Burgos.',
    consejos: [
      'The Basque Country provinces have capitals different from their name: Álava=Vitoria-Gasteiz, Guipúzcoa=Donostia-San Sebastián, Vizcaya=Bilbao.',
      'Andalusia has 8 provinces: Huelva, Seville, Cádiz, Málaga, Granada, Almería, Jaén, Córdoba. Learn them west to east.',
      'Castile and León has the most provinces (9): Ávila, Burgos, León, Palencia, Salamanca, Segovia, Soria, Valladolid, Zamora.',
      'The islands: Balearic Islands (Palma de Mallorca) and the Canary Islands make up 2 provinces. The Canaries have 2 provinces: Las Palmas and S/C de Tenerife.',
    ],
    relacionados: [
      { nombre: 'Europe', slug: 'geografia-europa' },
      { nombre: 'United States — States', slug: 'geografia-eeuu' },
      { nombre: 'The Americas', slug: 'geografia-america' },
    ],
  },
  'geografia-eeuu': {
    titulo: 'Geography of the United States — All 50 States',
    subtitulo: 'Capitals, Regions and Features of the 50 American States',
    emoji: '🇺🇸', gradient: 'from-blue-700 to-red-700',
    examPath: '/estudiar/geografia/eeuu',
    studyPath: '/estudiar/geografia/eeuu',
    asignatura: 'Geography', niveles: 'Secondary',
    intro: 'Learn to identify all 50 US states: their capitals (many are not the most famous cities), their location on the map, and their main features. The exam uses progressive clues about geographic region, population, borders with other states or countries, and the capital.',
    beneficios: [
      { titulo: 'Surprising State Capitals', texto: 'California\'s capital is not Los Angeles (it\'s Sacramento). Texas\'s is not Dallas or Houston (it\'s Austin). Florida\'s is not Miami (it\'s Tallahassee). The most frequent exam confusions.' },
      { titulo: 'The Major Regions', texto: 'New England, the Midwest, the South, the Great Plains, the Rocky Mountains, the West Coast. Learning states by geographic region is more effective than one by one.' },
      { titulo: 'Borders and Physical Geography', texto: 'States bordering Mexico (California, Arizona, New Mexico, Texas), those bordering Canada, those along the Great Lakes. Borders are essential clues in the game.' },
    ],
    ejemplo: 'A Year 10 student knew Washington D.C. was the federal capital but did not know the state of Washington (northwest) has its capital in Olympia. The DC vs state distinction is one of the most frequent exam questions.',
    consejos: [
      'The federal capital is Washington D.C. (District of Columbia) — it is not a state. The state of Washington is in the northwest, with capital Olympia.',
      'Most confused state capitals: California=Sacramento (not LA), Texas=Austin (not Houston/Dallas), Florida=Tallahassee (not Miami), Illinois=Springfield (not Chicago), NY=Albany (not NYC).',
      'The 4 states bordering Mexico: California, Arizona, New Mexico, Texas. The 2 non-contiguous states: Alaska (northwest of Canada) and Hawaii (Pacific).',
      'The smallest states are in New England (northeast): Rhode Island, Connecticut, Massachusetts, Vermont, New Hampshire, Maine.',
    ],
    relacionados: [
      { nombre: 'Spain — Provinces', slug: 'geografia-espana' },
      { nombre: 'The Americas', slug: 'geografia-america' },
      { nombre: 'Europe', slug: 'geografia-europa' },
    ],
  },
  'cuerpo-humano': {
    titulo: 'Human Body — Systems and Organs',
    subtitulo: 'Biology Exam — Digestive, Circulatory, Respiratory and Nervous Systems',
    emoji: '🫀', gradient: 'from-red-500 to-rose-700',
    examPath: '/examen/cuerpo-humano',
    studyPath: '/estudiar/quimica/cuerpo-humano',
    asignatura: 'Biology & Geology', niveles: 'Primary & Secondary',
    intro: 'Revise the four major systems of the human body: the digestive system (mouth to intestine), the circulatory system (heart, arteries and veins), the respiratory system (lungs and alveoli) and the nervous system (neurons, reflexes and the cerebellum). Multiple-choice questions with detailed explanation.',
    beneficios: [
      { titulo: 'Digestive System Order', texto: 'The route of food: mouth → oesophagus → stomach → small intestine (absorption) → large intestine → rectum. The most tested sequence.' },
      { titulo: 'Arteries vs Veins', texto: 'Arteries carry blood away from the heart under pressure (thick wall). Veins return blood to the heart (valves, thinner wall). Capillaries = gas and nutrient exchange.' },
      { titulo: 'Nervous System', texto: 'CNS: brain + spinal cord. PNS: all peripheral nerves. Reflex arc: stimulus → sensory neuron → spinal cord → motor neuron → effector (no brain needed).' },
    ],
    ejemplo: 'A Year 8 student always confused arteries and veins. After learning "arteries leave the heart (A for Away)", she got full marks on the circulatory system section.',
    consejos: [
      'The small intestine is where nutrients are absorbed — not the stomach.',
      'The diaphragm is the main muscle for breathing in (inspiration). When it contracts, it moves down and the lungs expand.',
      'The cerebellum controls balance and coordination; the cerebrum handles thinking and language.',
    ],
    relacionados: [
      { nombre: 'The Cell', slug: 'celula' },
      { nombre: 'Nutrition', slug: 'nutricion' },
      { nombre: 'Living Things', slug: 'seres-vivos' },
    ],
  },
  'seres-vivos': {
    titulo: 'Living Things — Kingdoms and Classification',
    subtitulo: 'Biology Exam — Vertebrates, Invertebrates, Plants and Fungi',
    emoji: '🌱', gradient: 'from-emerald-500 to-green-700',
    examPath: '/examen/seres-vivos',
    studyPath: '/estudiar/quimica/seres-vivos',
    asignatura: 'Biology & Geology', niveles: 'Primary & Secondary',
    intro: 'Classify living things into the 5 kingdoms (Monera, Protista, Fungi, Plantae and Animalia). Learn to distinguish vertebrates from invertebrates, amphibians from reptiles, angiosperms from gymnosperms, and prokaryotic from eukaryotic cells — with an explanation after every question.',
    beneficios: [
      { titulo: '5 Kingdoms', texto: 'Monera (bacteria), Protista (unicellular algae), Fungi (mushrooms, yeasts), Plantae (plants) and Animalia (animals). Each kingdom has defining characteristics.' },
      { titulo: 'Vertebrate Groups', texto: 'Fish, amphibians, reptiles, birds and mammals. Key traits: mammals nurse young and have hair; reptiles have scales and shelled eggs; amphibians have metamorphosis.' },
      { titulo: 'Photosynthesis', texto: 'CO₂ + H₂O + sunlight → glucose + O₂. Plants are autotrophs (make their own food); animals are heterotrophs. Chloroplasts contain chlorophyll (green pigment).' },
    ],
    ejemplo: 'A Year 6 pupil thought dolphins were fish. After the exam, she knew dolphins are mammals: they breathe with lungs, nurse their calves and are warm-blooded.',
    consejos: [
      'Is the dolphin a fish? No — it is a mammal. It breathes with lungs and nurses its young.',
      'Amphibians vs reptiles: amphibians have moist skin and metamorphosis; reptiles have scales and hard-shelled eggs.',
      'Gymnosperms = naked seeds in cones (pines); angiosperms = seeds inside fruit + flowers (apple, wheat).',
    ],
    relacionados: [
      { nombre: 'The Cell', slug: 'celula' },
      { nombre: 'Ecosystems', slug: 'ecosistemas' },
      { nombre: 'Genetics', slug: 'genetica' },
    ],
  },
  'ecosistemas': {
    titulo: 'Ecosystems — Food Chains and Biomes',
    subtitulo: 'Natural Sciences Exam — Biomes, Adaptations and Biodiversity',
    emoji: '🌍', gradient: 'from-teal-500 to-emerald-700',
    examPath: '/examen/ecosistemas',
    studyPath: '/estudiar/quimica/ecosistemas',
    asignatura: 'Biology & Geology', niveles: 'Primary & Secondary',
    intro: 'Master ecology concepts: what an ecosystem is, how a food chain works (producers, consumers and decomposers), the main biomes of the planet (tropical rainforest, tundra, desert) and species relationships (mutualism, parasitism, commensalism).',
    beneficios: [
      { titulo: 'Trophic Levels', texto: 'Producers (plants) → Primary consumers (herbivores) → Secondary consumers (carnivores) → Decomposers (fungi, bacteria). Energy is lost ≈90% at each level.' },
      { titulo: 'Biomes', texto: 'Tropical rainforest: most biodiversity. Tundra: permafrost, no trees, very cold. Desert: extreme dryness. Taiga: coniferous forest, long cold winters.' },
      { titulo: 'Species Relationships', texto: 'Mutualism (+/+): bees and flowers. Commensalism (+/0): clownfish in anemone. Parasitism (+/−): tick on dog. Predation (+/−): wolf hunts deer.' },
    ],
    ejemplo: 'A Year 7 student identified the rabbit in the chain grass→rabbit→fox→eagle as a "secondary consumer". After the exam, she understood it is a primary consumer (herbivore that eats producers).',
    consejos: [
      'Producers are always plants or algae. Herbivores are primary consumers. Carnivores eating herbivores are secondary consumers.',
      'Decomposers (fungi, bacteria) close the matter cycle — without them nutrients would not return to the soil.',
      'The tropical rainforest holds 50-80% of Earth\'s species despite covering only 6% of the land surface.',
    ],
    relacionados: [
      { nombre: 'Living Things', slug: 'seres-vivos' },
      { nombre: 'The Cell', slug: 'celula' },
      { nombre: 'Genetics', slug: 'genetica' },
    ],
  },
  'genetica': {
    titulo: 'Genetics — DNA, Genes and Heredity',
    subtitulo: 'Biology Secondary Exam — Chromosomes, Mendel and Mutations',
    emoji: '🧬', gradient: 'from-purple-500 to-violet-700',
    examPath: '/examen/genetica',
    studyPath: '/estudiar/quimica/genetica',
    asignatura: 'Biology & Geology', niveles: 'Secondary',
    intro: 'Learn the fundamentals of genetics: DNA structure, what a gene and chromosome are, Mendel\'s laws (dominant vs. recessive), genotype vs. phenotype, mutations and their causes, genetic engineering and cloning — all explained with curriculum examples.',
    beneficios: [
      { titulo: 'DNA Structure', texto: 'Double helix with 4 bases: A-T and C-G always pair together. Watson and Crick, 1953. 20,000-25,000 genes in the human genome, packaged into 46 chromosomes.' },
      { titulo: 'Mendel\'s Laws', texto: 'Dominant (A) masks recessive (a). AA or Aa → dominant phenotype; aa → recessive phenotype. Use Punnett squares to calculate inheritance probabilities.' },
      { titulo: 'Mutations and Applications', texto: 'Mutations: spontaneous or caused by mutagens (UV, tobacco). Source of genetic variability → evolution. Genetic engineering: insulin, CRISPR, transgenic plants, gene therapy.' },
    ],
    ejemplo: 'A Year 10 student thought blue eyes were dominant. After the question "blue eyes only appear in homozygous recessive (aa) individuals", he understood the difference between genotype and phenotype.',
    consejos: [
      'Human somatic cells have 46 chromosomes (23 pairs). Gametes (egg, sperm) have 23.',
      'A recessive allele is only expressed when the individual is homozygous recessive (aa).',
      'The father determines the biological sex: he contributes X (girl) or Y (boy).',
    ],
    relacionados: [
      { nombre: 'The Cell', slug: 'celula' },
      { nombre: 'Living Things', slug: 'seres-vivos' },
      { nombre: 'Ecosystems', slug: 'ecosistemas' },
    ],
  },
  'nutricion': {
    titulo: 'Nutrition and Healthy Eating',
    subtitulo: 'Biology Exam — Macronutrients, Vitamins and the Mediterranean Diet',
    emoji: '🥗', gradient: 'from-lime-500 to-green-600',
    examPath: '/examen/nutricion',
    studyPath: '/estudiar/quimica/nutricion',
    asignatura: 'Biology & Geology', niveles: 'Primary & Secondary',
    intro: 'Review the pillars of nutrition: macronutrients (carbohydrates, proteins and fats), fat-soluble and water-soluble vitamins, essential minerals, the Mediterranean diet and the importance of water and fibre. Multiple-choice questions with detailed explanation.',
    beneficios: [
      { titulo: 'Macronutrients', texto: 'Carbohydrates (4 kcal/g): quick energy. Proteins (4 kcal/g): build and repair tissues. Fats (9 kcal/g): reserve energy and hormones. Each has a specific role.' },
      { titulo: 'Vitamins', texto: 'Fat-soluble (A, D, E, K): stored in liver and fat tissue — excess can be toxic. Water-soluble (B, C): excess excreted in urine — must be taken regularly.' },
      { titulo: 'Mediterranean Diet', texto: 'UNESCO Intangible Cultural Heritage. Rich in fruit, vegetables, pulses, wholegrain cereals, olive oil and fish. Associated with lower cardiovascular risk and longer life expectancy.' },
    ],
    ejemplo: 'A Year 8 student thought vitamin D came only from food. After the question about sunlight, she understood that the skin produces it from UVB rays — and that\'s why northern countries have higher deficiency rates.',
    consejos: [
      'Vitamin D: produced by the skin in sunlight. Essential for calcium absorption and bone health.',
      '5 portions of fruit and vegetables per day (WHO recommendation).',
      'Water provides no calories but makes up 60-70% of the body — it is the most important nutrient.',
    ],
    relacionados: [
      { nombre: 'Human Body', slug: 'cuerpo-humano' },
      { nombre: 'Living Things', slug: 'seres-vivos' },
      { nombre: 'The Cell', slug: 'celula' },
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
  'sistema-solar': {
    titulo: 'Sistema Solar — Planetes i Astres',
    subtitulo: 'Examen de Ciències Naturals — Planetes, Moviments i Característiques',
    emoji: '🌍', gradient: 'from-indigo-500 to-purple-700',
    examPath: '/examen/sistema-solar',
    studyPath: '/estudiar/quimica/sistema-solar',
    asignatura: 'Ciències Naturals', niveles: 'Primària, ESO',
    intro: 'Aprèn els 8 planetes del sistema solar, les seves característiques principals i els moviments de la Terra amb preguntes adaptades a Primària i ESO. Des del planeta més proper al Sol fins als gegants gasosos amb anells, l\'examen cobreix tot el currículum oficial d\'Astronomia.',
    beneficios: [
      { titulo: 'Els 8 Planetes en Ordre', texto: 'Mercuri, Venus, Terra, Mart, Júpiter, Saturn, Urà, Neptú. L\'examen reforça l\'ordre des del Sol cap enfora amb preguntes des de diferents angles.' },
      { titulo: 'Moviments Explicats', texto: 'Rotació (dia i nit, 24 h) i translació (estacions, 365 dies). La diferència entre els dos moviments és l\'error més comú en els exàmens de Primària.' },
      { titulo: 'ESO: Any Llum i Estacions', texto: 'Per a ESO s\'afegeixen conceptes com l\'any llum, la inclinació de l\'eix terrestre per a les estacions, i característiques específiques de planetes com Venus i la seva rotació retrògrada.' },
    ],
    ejemplo: 'Un alumne de 4t de Primària ja sabia els planetes de memòria però confonia rotació amb translació. Després de 5 preguntes de l\'examen amb explicació, ja no les confon.',
    consejos: [
      'Regla per recordar l\'ordre: "Mercuri, Venus, Terra, Mart, Júpiter, Saturn, Urà, Neptú" — aprèn les inicials: M-V-T-M-J-S-U-N.',
      'Rotació = gir sobre si mateix → dia i nit. Translació = volta al Sol → any i estacions.',
      'Júpiter és el més gran (hi caben 1.000 Terres), Mercuri el més petit i el més proper al Sol.',
      'Per a ESO: les estacions NO es deuen a la distància al Sol, sinó a la inclinació de l\'eix de la Terra (23,5°).',
    ],
    relacionados: [
      { nombre: 'La Cèl·lula', slug: 'celula' },
      { nombre: 'Estats de la Matèria', slug: 'estados-materia' },
      { nombre: 'Àtoms i Molècules', slug: 'atomos-moleculas' },
    ],
  },
  'celula': {
    titulo: 'La Cèl·lula — Unitat Bàsica de la Vida',
    subtitulo: 'Examen de Biologia — Orgànuls, Tipus de Cèl·lula i Funcions',
    emoji: '🔬', gradient: 'from-green-500 to-teal-700',
    examPath: '/examen/celula',
    studyPath: '/estudiar/quimica/celula',
    asignatura: 'Biologia i Geologia', niveles: 'ESO',
    intro: 'Domina els conceptes clau de la biologia cel·lular: diferència entre cèl·lules procariotes i eucariotes, cèl·lules animals i vegetals, funció de cada orgànul i processos fonamentals com la fotosíntesi, la respiració cel·lular i la mitosi.',
    beneficios: [
      { titulo: 'Procariota vs Eucariota', texto: 'La diferència més important de la biologia cel·lular: presència o absència de nucli definit. Els bacteris són procariotes; els animals, plantes i fongs són eucariotes.' },
      { titulo: 'Animal vs Vegetal', texto: 'Paret cel·lular, cloroplasts i vacuola central gran són exclusius de les vegetals. L\'examen treballa aquestes diferències amb preguntes directes i comparatives.' },
      { titulo: 'Orgànuls amb Funció', texto: 'Mitocondri=energia (ATP), ribosomes=proteïnes, cloroplast=fotosíntesi, vacuola=reserva. Aprèn cada orgànul amb la seva funció en una pregunta.' },
    ],
    ejemplo: 'Una alumna de 3r d\'ESO que memoritzava els orgànuls sense entendre\'ls veu la pregunta del mitocondri: "central energètica que fa servir O₂ per obtenir ATP". Ho relaciona amb l\'exercici físic. Ara ho recorda.',
    consejos: [
      'Diferència clau: procariota (bacteris) NO té nucli. Eucariota (animals, plantes, fongs) SÍ té nucli amb membrana.',
      'Cèl·lula vegetal vs animal: vegetal té PARET CEL·LULAR + CLOROPLASTS + VACUOLA GRAN. Animal no té cap de les tres.',
      'Mitocondri = energia (respiració cel·lular). Cloroplast = fotosíntesi (només en cèl·lules amb llum). Ribosoma = proteïnes (a totes les cèl·lules).',
      'Fotosíntesi: CO₂ + H₂O + llum → glucosa + O₂. Respiració cel·lular: glucosa + O₂ → ATP + CO₂ + H₂O. Són processos oposats.',
    ],
    relacionados: [
      { nombre: 'Sistema Solar', slug: 'sistema-solar' },
      { nombre: 'Àtoms i Molècules', slug: 'atomos-moleculas' },
      { nombre: 'Mescles i Separació', slug: 'mezclas-separacion' },
    ],
  },
  'geometria': {
    titulo: 'Geometria — Figures, Àrees i Volums',
    subtitulo: 'Examen de Matemàtiques — Teorema de Pitàgores, Perímetres i Fórmules',
    emoji: '📐', gradient: 'from-pink-500 to-rose-700',
    examPath: '/examen/geometria',
    studyPath: '/examen/geometria',
    asignatura: 'Matemàtiques', niveles: 'Primària, ESO',
    intro: 'Repassa les fórmules de geometria plana i espacial: àrees de triangles, quadrats, rectangles i cercles; tipus d\'angles i triangles; el teorema de Pitàgores amb exemples numèrics; i volums de cubs i cilindres. Tot explicat després de cada pregunta.',
    beneficios: [
      { titulo: 'Fórmules amb Exemples', texto: 'No n\'hi ha prou amb saber que l\'àrea del triangle és (base×alçada)/2. L\'examen demana aplicar-la amb nombres concrets. Cada explicació inclou el càlcul complet.' },
      { titulo: 'Pitàgores Pas a Pas', texto: 'a²+b²=c². Les ternes pitagòriques més freqüents (3-4-5, 6-8-10) apareixen a l\'examen perquè les automatitzis abans d\'enfrontar-te a casos generals.' },
      { titulo: 'Progressió Primària → ESO', texto: 'Primària treballa angles bàsics, tipus de triangles, perímetres i àrees simples. ESO afegeix Pitàgores, volums de cilindre i cub, i àrees del cercle.' },
    ],
    ejemplo: 'Un alumne de 2n d\'ESO sempre confonia àrea amb perímetre. Després de veure l\'explicació "àrea en cm², perímetre en cm lineals" en 3 preguntes seguides, ja no els confon.',
    consejos: [
      'Angles: agut<90°, recte=90°, obtús entre 90° i 180°, pla=180°. La suma dels angles de qualsevol triangle = 180°.',
      'Àrea del triangle = (base × alçada) / 2. Àrea del cercle = πr². Àrea del quadrat = L². Àrea del rectangle = llarg × ample.',
      'Pitàgores només en triangles rectangles: a²+b²=c² on c és la hipotenusa (costat més llarg, oposat a l\'angle recte).',
      'Per a volums: cub = a³, cilindre = πr²×h. El "volum" sempre s\'expressa en unitats cúbiques (cm³, m³).',
    ],
    relacionados: [
      { nombre: 'Àtoms i Molècules', slug: 'atomos-moleculas' },
      { nombre: 'Sistema Solar', slug: 'sistema-solar' },
      { nombre: 'Taula Periòdica', slug: 'tabla-periodica' },
    ],
  },
  // Història
  'historia-guerra-civil': {
    titulo: 'Guerra Civil Espanyola — Examen d\'Història',
    subtitulo: 'Del cop d\'estat del 1936 a la dictadura franquista',
    emoji: '🇪🇸', gradient: 'from-red-600 to-rose-800',
    examPath: '/estudiar/historia/gce',
    studyPath: '/estudiar/historia/gce',
    asignatura: 'Història d\'Espanya', niveles: 'ESO, Batxillerat',
    intro: 'Repassa els fets clau de la Guerra Civil Espanyola: causes de l\'aixecament militar del 1936, batalles principals, figures com Franco, Azaña i La Pasionaria, la intervenció estrangera i l\'inici de la dictadura. Examen amb preguntes adaptades al currículum de l\'ESO i Batxillerat.',
    beneficios: [
      { titulo: 'Cronologia Clara', texto: 'Del cop del 17 de juliol del 1936 a l\'1 d\'abril del 1939. L\'examen treballa les dates clau amb context, no només com a dades aïllades.' },
      { titulo: 'Personatges Històrics', texto: 'Franco, Manuel Azaña, Largo Caballero, La Pasionaria, Mola. Cada figura amb el seu paper en el conflicte i el seu bàndol.' },
      { titulo: 'Context Internacional', texto: 'Brigades Internacionals, suport nazi-feixista al bàndol nacional, el pacte de no intervenció. La guerra civil dins el tauler europeu dels anys 30.' },
    ],
    ejemplo: 'Un alumne de 4t d\'ESO que confonia el Front Popular amb el Front Nacional entén la diferència en veure la pregunta sobre les eleccions del febrer del 1936.',
    consejos: [
      'Memoritza la cronologia: cop (juliol 1936) → guerra (1936-1939) → victòria franquista (1 abril 1939) → dictadura (1939-1975).',
      'Els dos bàndols: Republicans (govern legítim, Front Popular, URSS, Brigades Internacionals) vs Nacionals (Franco, Alemanya nazi, Itàlia feixista).',
      'Batalles clau: Batalla de l\'Ebre (més llarga), Madrid (va resistir tot el conflicte), Guernica (bombardeig nazi, 1937).',
      'Per a Batxillerat: aprèn les causes estructurals — crisi de la II República, polarització política, revolució del 1934.',
    ],
    relacionados: [
      { nombre: 'Segona Guerra Mundial', slug: 'historia-segunda-guerra-mundial' },
      { nombre: 'Grans Fites de la Història', slug: 'historia-hitos' },
      { nombre: 'Antiga Roma', slug: 'historia-antigua-roma' },
    ],
  },
  'historia-segunda-guerra-mundial': {
    titulo: 'Segona Guerra Mundial — Examen d\'Història',
    subtitulo: 'De la invasió de Polònia (1939) a Hiroshima (1945)',
    emoji: '⚔️', gradient: 'from-gray-600 to-slate-800',
    examPath: '/estudiar/historia/wwii',
    studyPath: '/estudiar/historia/wwii',
    asignatura: 'Història del Món Contemporani', niveles: 'ESO, Batxillerat',
    intro: 'Estudia els moments decisius de la Segona Guerra Mundial: el Blitzkrieg alemany, la Batalla d\'Anglaterra, l\'Holocaust, l\'Operació Barbarroja, el Desembarcament de Normandia i les bombes atòmiques sobre el Japó. Examen de selecció múltiple basat en el currículum oficial.',
    beneficios: [
      { titulo: 'Causes i Conseqüències', texto: 'El Tractat de Versalles com a germen del conflicte, l\'ascens del nazisme, i la Guerra Freda com a conseqüència directa. La IIGM no sorgeix del no-res ni acaba sense seqüeles.' },
      { titulo: 'Figures Històriques', texto: 'Hitler, Churchill, Stalin, Roosevelt, Eisenhower, Rommel. L\'examen situa cada figura en el seu context i bàndol.' },
      { titulo: 'Geografia del Conflicte', texto: 'Front Occidental, Front Oriental, Pacífic. Entendre on va passar cada cosa és essencial per recordar per què va passar.' },
    ],
    ejemplo: 'Una alumna de 1r de Batxillerat sempre confonia l\'Operació Overlord amb l\'Operació Barbarroja. Després de veure la pregunta amb el mapa d\'Europa, ja les distingeix.',
    consejos: [
      'Cronologia bàsica: invasió de Polònia (set. 1939) → caiguda de França (1940) → Barbarroja (1941) → Pearl Harbor (des. 1941) → Normandia (juny 1944) → fi Europa (maig 1945) → Hiroshima (ag. 1945).',
      'Aliats: EEUU, Regne Unit, URSS, França. Eix: Alemanya, Itàlia, Japó.',
      'L\'Holocaust: 6 milions de jueus exterminats. Auschwitz, Treblinka, Sobibor són els camps d\'extermini més esmentats als exàmens.',
      'Per a Batxillerat: les causes inclouen el Tractat de Versalles (1919), la Gran Depressió (1929) i el fracàs de la Societat de Nacions.',
    ],
    relacionados: [
      { nombre: 'Guerra Civil Espanyola', slug: 'historia-guerra-civil' },
      { nombre: 'Independència Americana', slug: 'historia-independencia-americana' },
      { nombre: 'Grans Fites de la Història', slug: 'historia-hitos' },
    ],
  },
  'historia-independencia-americana': {
    titulo: 'Independència Americana — Examen d\'Història',
    subtitulo: 'Del Motí del Te a la Constitució dels Estats Units',
    emoji: '🦅', gradient: 'from-blue-700 to-indigo-900',
    examPath: '/estudiar/historia/usa',
    studyPath: '/estudiar/historia/usa',
    asignatura: 'Història del Món', niveles: 'ESO',
    intro: 'Aprèn els orígens, el desenvolupament i les conseqüències de la Revolució Americana: la crisi amb la metròpoli britànica, el Motí del Te, la Declaració d\'Independència del 1776, la guerra contra la Gran Bretanya i la creació de la Constitució.',
    beneficios: [
      { titulo: 'Causes del Conflicte', texto: 'Impostos sense representació, les Lleis Intolerables, el Motí del Te del 1773. Entendre per què va esclatar la revolució és la clau per recordar com es va desenvolupar.' },
      { titulo: 'Documents Fundacionals', texto: 'La Declaració d\'Independència (4 juliol 1776) i la Constitució (1787) són els dos documents més importants. L\'examen treballa les seves dates, autors i principis clau.' },
      { titulo: 'Pares Fundadors', texto: 'George Washington, Thomas Jefferson, Benjamin Franklin, John Adams. Cada pare fundador amb el seu paper en la independència.' },
    ],
    ejemplo: 'Un alumne de 3r d\'ESO no entenia per què les colònies volien independitzar-se si eren pròsperes. La pregunta sobre els impostos sense representació ho aclareix: no era pobresa, era principi polític.',
    consejos: [
      'Cronologia: Motí del Te (1773) → Primer Congrés Continental (1774) → Declaració d\'Independència (4 juliol 1776) → victòria a Yorktown (1781) → Constitució (1787).',
      '"No taxation without representation" — la frase clau que resumeix la causa principal del conflicte.',
      'Els aliats de les colònies: França (Lafayete) i Espanya, que veien una oportunitat de debilitar Gran Bretanya.',
      'Les 13 colònies originals es van convertir en els primers 13 estats dels EEUU — dada que sol caure a l\'examen.',
    ],
    relacionados: [
      { nombre: 'Segona Guerra Mundial', slug: 'historia-segunda-guerra-mundial' },
      { nombre: 'Guerra Civil Espanyola', slug: 'historia-guerra-civil' },
      { nombre: 'Grans Fites de la Història', slug: 'historia-hitos' },
    ],
  },
  'historia-antigua-roma': {
    titulo: 'Antiga Roma — Examen d\'Història',
    subtitulo: 'De Ròmul i Rem al Col·lapse de l\'Imperi Romà',
    emoji: '🏛️', gradient: 'from-amber-600 to-yellow-800',
    examPath: '/estudiar/historia/roma',
    studyPath: '/estudiar/historia/roma',
    asignatura: 'Història Clàssica', niveles: 'Primària, ESO',
    intro: 'Recorre la història de Roma des dels seus orígens mítics fins a la caiguda de l\'Imperi: la monarquia, la República amb els seus cònsols i senat, les Guerres Púniques, Juli Cèsar, l\'Imperi amb August i els emperadors més importants, i la caiguda l\'any 476 dC.',
    beneficios: [
      { titulo: 'Tres Períodes Clau', texto: 'Monarquia (753-509 aC), República (509-27 aC) i Imperi (27 aC-476 dC). Saber en quin període enquadrar cada esdeveniment és la base de l\'examen.' },
      { titulo: 'Figures Romanes', texto: 'Ròmul, Juli Cèsar, August, Neró, Marc Aureli, Constantí. L\'examen treballa cada figura amb la seva època i rellevància històrica.' },
      { titulo: 'Institucions Republicanes', texto: 'El Senat, els cònsols, el tribú de la plebs, la Llei de les XII Taules. Les institucions romanes són la base del dret occidental i sovint cauen a selectivitat.' },
    ],
    ejemplo: 'Una alumna de 2n d\'ESO confonia la República amb l\'Imperi. Després de veure la pregunta "En quin període governaven els cònsols?" amb la resposta explicada, ja distingeix perfectament els tres períodes.',
    consejos: [
      'Els tres períodes amb dates: Monarquia (753-509 aC) → República (509-27 aC) → Imperi (27 aC-476 dC).',
      'Juli Cèsar NO va ser emperador: va ser dictador durant la República. August va ser el PRIMER emperador (27 aC).',
      'Guerres Púniques (contra Cartago, Anníbal i els elefants): I (264-241), II (218-201), III (149-146 aC).',
      'La caiguda de l\'Imperi: 476 dC, quan Odoacre deposa Ròmul Augústul. Només cau l\'Imperi d\'Occident — el d\'Orient (Bizanci) dura fins al 1453.',
    ],
    relacionados: [
      { nombre: 'Grans Fites de la Història', slug: 'historia-hitos' },
      { nombre: 'Guerra Civil Espanyola', slug: 'historia-guerra-civil' },
      { nombre: 'Independència Americana', slug: 'historia-independencia-americana' },
    ],
  },
  'historia-hitos': {
    titulo: 'Grans Fites de la Història Universal',
    subtitulo: 'Els Moments que van Canviar el Món — Examen d\'Història per a Primària',
    emoji: '🌍', gradient: 'from-teal-600 to-cyan-800',
    examPath: '/estudiar/historia/primaria',
    studyPath: '/estudiar/historia/primaria',
    asignatura: 'Història Universal', niveles: 'Primària, ESO',
    intro: 'Des de l\'escriptura a Mesopotàmia fins a l\'arribada a la Lluna, aquest examen cobreix els esdeveniments més importants de la història de la humanitat: civilitzacions antigues, grans descobriments, revolucions i fites del segle XX. Adaptat al currículum de Coneixement del Medi i Ciències Socials.',
    beneficios: [
      { titulo: 'Civilitzacions Antigues', texto: 'Egipte, Mesopotàmia, Grècia, Roma. Les primeres civilitzacions amb les seves aportacions: escriptura, democràcia, lleis, arquitectura. L\'examen connecta cada cultura amb el seu llegat.' },
      { titulo: 'Grans Descobriments', texto: 'La impremta (Gutenberg, 1450), Amèrica (Colom, 1492), la revolució científica (Galileu, Newton). Cada descobriment amb la seva data, autor i conseqüències.' },
      { titulo: 'Segle XX en Clau', texto: 'Les dues Guerres Mundials, l\'arribada a la Lluna (1969), la caiguda del Mur de Berlín (1989). Les fites més recents amb el seu context històric simplificat.' },
    ],
    ejemplo: 'Un alumne de 5è de Primària aprèn que Colom va arribar a Amèrica el 1492 però no el confon amb Magallanes (primera volta al món, 1519-1522) gràcies a les preguntes comparatives de l\'examen.',
    consejos: [
      'Les 4 grans civilitzacions antigues: Mesopotàmia (escriptura cuneïforme), Egipte (jeroglífics, piràmides), Grècia (democràcia, filosofia), Roma (dret, enginyeria).',
      'Grans descobriments: impremta (1450) → Amèrica (1492) → volta al món (1522) → telescopi (Galileu, 1609).',
      'Segle XX: I Guerra Mundial (1914-1918) → II Guerra Mundial (1939-1945) → arribada a la Lluna (1969) → caiguda del Mur de Berlín (1989).',
      'Truc per a Primària: associa cada fita amb un número rodó fàcil de recordar. 1492 (Amèrica) i 1969 (Lluna) són els més importants.',
    ],
    relacionados: [
      { nombre: 'Antiga Roma', slug: 'historia-antigua-roma' },
      { nombre: 'Guerra Civil Espanyola', slug: 'historia-guerra-civil' },
      { nombre: 'Segona Guerra Mundial', slug: 'historia-segunda-guerra-mundial' },
    ],
  },
  // Matemàtiques
  'matematicas-sumas-restas': {
    titulo: 'Sumes i Restes — Càlcul Mental',
    subtitulo: 'Examen de Matemàtiques — Operacions Bàsiques Combinades',
    emoji: '➕', gradient: 'from-blue-500 to-cyan-600',
    examPath: '/estudiar/matematicas/sumas-restas/examen',
    studyPath: '/estudiar/matematicas/sumas-restas/examen',
    asignatura: 'Matemàtiques', niveles: 'Primària, ESO',
    intro: 'Practica la suma i la resta amb càlcul mental progressiu. L\'examen planteja operacions de dificultat creixent — d\'un dígit fins a operacions amb desenes i centenes — per consolidar l\'agilitat aritmètica abans de passar a les multiplicacions i divisions.',
    beneficios: [
      { titulo: 'Càlcul Mental Progressiu', texto: 'Les operacions augmenten en complexitat al llarg de l\'examen. Comences amb 7+5 i acabes amb 234-87. El cervell s\'escalfa gradualment.' },
      { titulo: 'Base per a Tot', texto: 'Les sumes i restes són la base de les multiplicacions, divisions i fraccions. Dominar-les sense calculadora és l\'habilitat matemàtica més rendible de Primària.' },
      { titulo: 'Velocitat i Precisió', texto: 'L\'examen no mesura només si encertes, sinó si ho fas amb seguretat. Repetir el mateix tipus d\'operació en variants diferents consolida l\'automatisme.' },
    ],
    ejemplo: 'Un alumne de 3r de Primària que dubtava en restes amb porteig practica 10 minuts al dia durant una setmana. Al final de la setmana, les resol sense errors ni vacil·lació.',
    consejos: [
      'Per a sumes ràpides: agrupa els números que sumin 10 primer. 3+7+4+6 = (3+7)+(4+6) = 10+10 = 20.',
      'Per a restes amb porteig: visualitza el número gran "deixant" una desena. 52-7: pensa en 52 com a 40+12, així 12-7=5, resultat 45.',
      'Practica les combinacions d\'un dígit fins que siguin automàtiques (7+8, 9+6, 13-7...) — són la base de tot càlcul mental.',
      'Si et quedes encallat, divideix l\'operació en parts: 67+38 = 67+30+8 = 97+8 = 105.',
    ],
    relacionados: [
      { nombre: 'Multiplicació', slug: 'matematicas-multiplicacion' },
      { nombre: 'Divisió', slug: 'matematicas-division' },
      { nombre: 'Geometria', slug: 'geometria' },
    ],
  },
  'matematicas-multiplicacion': {
    titulo: 'Multiplicació — Taules i Càlcul Mental',
    subtitulo: 'Examen de Matemàtiques — Taules de l\'1 al 10 i Multiplicacions',
    emoji: '✖️', gradient: 'from-violet-500 to-purple-700',
    examPath: '/estudiar/matematicas/multiplicaciones/examen',
    studyPath: '/estudiar/matematicas/multiplicaciones/examen',
    asignatura: 'Matemàtiques', niveles: 'Primària, ESO',
    intro: 'Domina les taules de multiplicar de l\'1 al 10 i practica multiplicacions de dificultat creixent. L\'examen combina multiplicacions pures amb operacions mixtes per consolidar el càlcul mental i preparar-te per a les divisions, fraccions i àlgebra de cursos superiors.',
    beneficios: [
      { titulo: 'Taules Automatitzades', texto: 'L\'objectiu no és saber les taules: és tenir-les tan interioritzades que surtin sense pensar. L\'examen repeteix les més difícils (7×8, 6×9, 8×9) amb major freqüència.' },
      { titulo: 'Operacions Mixtes', texto: 'Combinem multiplicació amb sumes i restes per repassar l\'ordre de les operacions. 3×4+7 no és el mateix que 3×(4+7) — diferència crítica a l\'ESO.' },
      { titulo: 'Càlcul amb Desenes', texto: 'Multiplicar per 10, 100, per múltiples de 10. Trucs mentals com 15×4 = 15×2×2 = 30×2 = 60. Matemàtiques mentals més ràpides que la calculadora.' },
    ],
    ejemplo: 'Una alumna de 4t de Primària que tardava 5 segons en 7×8 practica l\'examen diàriament. En dues setmanes, ho resol instantàniament, cosa que li allibera capacitat mental per als problemes.',
    consejos: [
      'Les taules difícils (6,7,8,9): practica-les més que les fàcils. 7×7=49, 7×8=56, 8×8=64, 9×9=81.',
      'Truc del 9: 9×n = la suma de dígits del resultat sempre és 9. 9×7=63 (6+3=9). I el primer dígit és sempre n-1: 9×7=6_.',
      'Per multiplicar per 11: 11×n (de l\'1 al 9) = nn. 11×7=77. Per a nombres grans: 11×35 = 3(3+5)5 = 385.',
      'L\'ordre de les operacions: primer parèntesis, després multiplicacions i divisions, finalment sumes i restes.',
    ],
    relacionados: [
      { nombre: 'Divisió', slug: 'matematicas-division' },
      { nombre: 'Sumes i Restes', slug: 'matematicas-sumas-restas' },
      { nombre: 'Geometria', slug: 'geometria' },
    ],
  },
  'matematicas-division': {
    titulo: 'Divisió — Examen de Matemàtiques',
    subtitulo: 'Divisions Exactes i Inexactes — Primària i ESO',
    emoji: '➗', gradient: 'from-orange-500 to-red-600',
    examPath: '/estudiar/matematicas/divisiones/examen',
    studyPath: '/estudiar/matematicas/divisiones/examen',
    asignatura: 'Matemàtiques', niveles: 'Primària, ESO',
    intro: 'Practica les divisions exactes i inexactes amb dividends d\'1, 2 i 3 dígits. L\'examen treballa la divisió com a operació inversa de la multiplicació i prepara per als conceptes de quocient, resta, mínim comú múltiple i màxim comú divisor de l\'ESO.',
    beneficios: [
      { titulo: 'Divisió com a Repartiment', texto: 'Entendre la divisió com "quantes vegades hi cap" o "quant toca a cadascú" la fa intuïtiva. L\'examen usa contextos de repartiment abans de passar a l\'abstracció.' },
      { titulo: 'Quocient i Resta', texto: 'La divisió inexacta dóna quocient i resta. 17÷5=3 resta 2 (perquè 5×3=15, i 17-15=2). Dominar això és essencial per a fraccions i nombres decimals.' },
      { titulo: 'Inversa de la Multiplicació', texto: 'Si 6×7=42, aleshores 42÷6=7 i 42÷7=6. Veure la relació entre multiplicació i divisió redueix el temps de càlcul a la meitat.' },
    ],
    ejemplo: 'Un alumne de 5è de Primària que feia les divisions llargues amb errors aprèn a verificar: multiplicar el quocient pel divisor i sumar la resta ha de donar el dividend. Una comprovació que elimina el 90% dels errors.',
    consejos: [
      'Regla de verificació: dividend = (quocient × divisor) + resta. Si 47÷6=7 resta 5: 7×6+5=47. Verifica-ho sempre.',
      'Per dividir per 2: si el número és parell, el resultat és exacte. 86÷2=43. Si és imparell, hi haurà resta 1: 87÷2=43 resta 1.',
      'Divisibilitat bàsica: divisible per 3 → suma de dígits divisible per 3. Per 5 → acaba en 0 o 5. Per 10 → acaba en 0.',
      'Per a ESO: el MCD (Màxim Comú Divisor) es calcula amb l\'algorisme d\'Euclides. El MCM es calcula descomponent en factors primers.',
    ],
    relacionados: [
      { nombre: 'Multiplicació', slug: 'matematicas-multiplicacion' },
      { nombre: 'Sumes i Restes', slug: 'matematicas-sumas-restas' },
      { nombre: 'Geometria', slug: 'geometria' },
    ],
  },
  // Geografia
  'geografia-europa': {
    titulo: 'Geografia d\'Europa — Capitals i Països',
    subtitulo: 'Examen Interactiu: Identifica els Països Europeus amb Pistes Progressives',
    emoji: '🇪🇺', gradient: 'from-blue-600 to-indigo-800',
    examPath: '/estudiar/geografia/europa',
    studyPath: '/estudiar/geografia/europa',
    asignatura: 'Geografia', niveles: 'Primària, ESO',
    intro: 'Aprèn a identificar els països d\'Europa a través de pistes progressives: hemisferi, nombre de veïns, població, muntanyes, rius, idioma oficial i capital. El joc es fa més difícil si tardes més. Cada error suma una pista nova fins a revelar la resposta.',
    beneficios: [
      { titulo: 'Sistema de Pistes Progressives', texto: 'Comença amb la pista més general (hemisferi, mida) i avança cap a la més específica (capital, idioma). Com més aviat encertis, més punts. Això força un aprenentatge profund.' },
      { titulo: 'Europa en Context', texto: 'No només capitals: també rius (Rin, Danubi, Volga), muntanyes (Alps, Pirineus, Càrpats), mars (Mediterrani, Bàltic, del Nord) i dades de població.' },
      { titulo: 'Preparació per als Exàmens', texto: 'Els exàmens de geografia de l\'ESO pregunten capitals, països limítrofes, rius i característiques físiques. El joc els treballa tots de forma integrada.' },
    ],
    ejemplo: 'Un alumne de 6è de Primària que només sabia les capitals més conegudes aprèn Àustria, Eslovènia i Eslovàquia en una sola sessió en veure que comparteixen fronteres amb Alemanya i Hongria.',
    consejos: [
      'Aprèn primer els 5 països més grans: Rússia, Ucraïna, França, Espanya, Suècia. Ocupen més de la meitat del territori europeu.',
      'Les capitals "trampa": Bratislava (Eslovàquia), Ljubljana (Eslovènia), Tirana (Albània), Chisinau (Moldàvia). Les menys conegudes sempre cauen a l\'examen.',
      'Els rius més importants: Rin (Alemanya), Danubi (travessa 10 països), Volga (Rússia, el més llarg), Tàmesi (Regne Unit), Sena (França).',
      'Europa de l\'Est: Polònia, República Txeca, Eslovàquia, Hongria, Romania, Bulgària. Memoritzar-los en bloc és més eficaç que d\'un en un.',
    ],
    relacionados: [
      { nombre: 'Àsia', slug: 'geografia-asia' },
      { nombre: 'Amèrica', slug: 'geografia-america' },
      { nombre: 'Espanya — Províncies', slug: 'geografia-espana' },
    ],
  },
  'geografia-america': {
    titulo: 'Geografia d\'Amèrica — Països i Capitals',
    subtitulo: 'Examen dels Països d\'Amèrica del Nord, Central i del Sud',
    emoji: '🌎', gradient: 'from-green-600 to-emerald-800',
    examPath: '/estudiar/geografia/america',
    studyPath: '/estudiar/geografia/america',
    asignatura: 'Geografia', niveles: 'Primària, ESO',
    intro: 'Recorre els 35 països del continent americà: des de Canadà i els Estats Units al nord, passant pels països centreamericans i del Carib, fins a l\'Argentina i Xile al sud. Aprèn capitals, idiomes, rius (Amazones, Orinoco, Mississipí) i característiques físiques amb pistes progressives.',
    beneficios: [
      { titulo: 'Amèrica del Nord vs del Sud', texto: 'La diferència entre Hispanoamèrica, Llatinoamèrica i Amèrica anglosaxona. Entendre quins idiomes es parlen on ajuda a recordar la geografia política.' },
      { titulo: 'Grans Rius i Selves', texto: 'L\'Amazones (el més cabalós del món), el Mississipí-Missouri (EEUU), l\'Orinoco (Veneçuela). Els rius són pistes freqüents en el joc geogràfic.' },
      { titulo: 'Capitals Difícils', texto: 'Surinam → Paramaribo, Bolívia → Sucre (o La Paz), Trinitat i Tobago → Port d\'Espanya. Les capitals menys conegudes són les que més solen preguntar.' },
    ],
    ejemplo: 'Un alumne de 4t d\'ESO sabia que el Brasil parlava portuguès però no recordava la seva capital. Després de la pista (idioma portuguès + riu Amazones + la major ciutat d\'Amèrica del Sud), recorda: Brasília (no São Paulo).',
    consejos: [
      'El Brasil és l\'únic país d\'Amèrica del Sud que parla portuguès — tots els altres parlen castellà excepte Guyana (anglès), Surinam (neerlandès) i Guaiana Francesa (francès).',
      'Les capitals més confoses: Brasil=Brasília (no São Paulo), Austràlia=Canberra, Nova Zelanda=Wellington.',
      'Països del Carib: Cuba (L\'Havana), República Dominicana (Santo Domingo), Jamaica (Kingston), Haití (Port-au-Prince).',
      'Amèrica Central: Guatemala, Belize, Hondures, El Salvador, Nicaragua, Costa Rica, Panamà. Aprèn-los en ordre de nord a sud.',
    ],
    relacionados: [
      { nombre: 'Europa', slug: 'geografia-europa' },
      { nombre: 'Estats Units — Estats', slug: 'geografia-eeuu' },
      { nombre: 'Àfrica', slug: 'geografia-africa' },
    ],
  },
  'geografia-asia': {
    titulo: 'Geografia d\'Àsia — Països i Capitals',
    subtitulo: 'El Continent Més Gran: Xina, Índia, Japó i 45 Països Més',
    emoji: '🌏', gradient: 'from-red-500 to-orange-700',
    examPath: '/estudiar/geografia/asia',
    studyPath: '/estudiar/geografia/asia',
    asignatura: 'Geografia', niveles: 'ESO',
    intro: 'Àsia és el continent més extens i poblat del planeta: 44,5 milions de km², més de 4.500 milions de persones i 49 països. Aprèn a identificar països com Xina, Japó, Corea del Sud, Índia, la Rússia asiàtica, les monarquies del Golf i els països d\'Àsia Central amb pistes geogràfiques progressives.',
    beneficios: [
      { titulo: 'Les Grans Potències Asiàtiques', texto: 'Xina (1.400 milions, capital Pequín/Beijing), Índia (1.400 milions, capital Nova Delhi), Japó (Tòquio), Indonèsia (Jakarta). Els quatre països més importants d\'Àsia en geografia escolar.' },
      { titulo: 'Orient Mitjà i el Golf', texto: 'Aràbia Saudita, Emirats Àrabs Units, Qatar, Kuwait, Iran, Iraq, Israel, Turquia. La regió més estratègica del món en geopolítica actual.' },
      { titulo: 'Àsia Central i Pacífic', texto: 'Els cinc "-stan" (Kazakhstan, Uzbekistan, Turkmenistan, Tadjikistan, Kirguizstan), Corea del Nord i del Sud, Vietnam, Tailàndia, Filipines.' },
    ],
    ejemplo: 'Una alumna confonia contínuament Corea del Nord (Pyongyang) amb Corea del Sud (Seül). La pista del joc que esmenta "règim comunista tancat" vs "democràcia industrial" fixa la diferència definitivament.',
    consejos: [
      'Àsia es divideix en regions: Àsia Oriental (Xina, Japó, Corea), Àsia del Sud (Índia, Pakistan, Bangla Desh), Àsia del Sud-est (Vietnam, Tailàndia, Indonèsia), Àsia Central (els -stan) i Orient Mitjà.',
      'Els països més poblats del món estan a Àsia: Xina i Índia tenen cada un més de 1.400 milions. El tercer és els EEUU amb 335 milions.',
      'Les capitals menys conegudes: Nur-Sultan/Astana (Kazakhstan), Taixkent (Uzbekistan), Duixanbe (Tadjikistan), Bixkek (Kirguizstan), Aixkhabad (Turkmenistan).',
      'Truc per al Japó: les 4 illes principals són Hokkaido, Honshu, Shikoku i Kyushu. Tòquio és a Honshu, l\'illa central i més gran.',
    ],
    relacionados: [
      { nombre: 'Europa', slug: 'geografia-europa' },
      { nombre: 'Àfrica', slug: 'geografia-africa' },
      { nombre: 'Amèrica', slug: 'geografia-america' },
    ],
  },
  'geografia-africa': {
    titulo: 'Geografia d\'Àfrica — Països i Capitals',
    subtitulo: 'El Continent amb Més Països: 54 Nacions',
    emoji: '🌍', gradient: 'from-yellow-500 to-amber-700',
    examPath: '/estudiar/geografia/africa',
    studyPath: '/estudiar/geografia/africa',
    asignatura: 'Geografia', niveles: 'ESO',
    intro: 'Àfrica és el continent amb més països del món (54) i el segon en extensió i població. Aprèn a identificar els països de l\'Àfrica del Nord (el Magrib), l\'Àfrica Subsahariana, els grans rius (Nil, Congo, Níger) i els accidents geogràfics més importants amb pistes progressives.',
    beneficios: [
      { titulo: 'El Magrib i l\'Àfrica del Nord', texto: 'Marroc (Rabat), Algèria (Alger), Tunísia (Tunis), Líbia (Trípoli), Egipte (El Caire). Els cinc països del nord mediterrani i les seves capitals són els més freqüents a l\'ESO.' },
      { titulo: 'Àfrica Subsahariana', texto: 'Nigèria (el més poblat, Abuja), Etiòpia (Addis Abeba), Sud-àfrica (Pretòria/Ciutat del Cap/Johannesburg), Kenya (Nairobi), Ghana (Accra). Els països amb més pes geopolític i econòmic.' },
      { titulo: 'Rius i Geografia Física', texto: 'El Nil (el més llarg del món, 6.650 km), el Congo (el més cabalós d\'Àfrica), el Sàhara (el desert més gran), el Kilimanjaro (el cim més alt, 5.895 m).' },
    ],
    ejemplo: 'Un alumne de 3r d\'ESO que només coneixia Egipte i Sud-àfrica descobreix que Nigèria té més habitants que cap altre país africà, més que Egipte i Etiòpia junts, i aprèn a situar-la al mapa.',
    consejos: [
      'Àfrica del Nord (el Magrib): Marroc, Algèria, Tunísia, Líbia, Egipte. Són els països amb més presència als exàmens de l\'ESO sobre Àfrica.',
      'Sud-àfrica té 3 capitals: Pretòria (executiva), Ciutat del Cap (legislativa), Bloemfontein (judicial). Una de les dades més sorprenents de la geografia mundial.',
      'Els rius: Nil (més llarg, flueix cap al nord), Congo (més cabalós d\'Àfrica), Níger (Àfrica Occidental), Zambezi (cascades Victòria).',
      'El Corn d\'Àfrica: Somàlia, Etiòpia, Eritrea, Djibouti — els quatre països que formen la "punta" nord-oriental del continent.',
    ],
    relacionados: [
      { nombre: 'Europa', slug: 'geografia-europa' },
      { nombre: 'Àsia', slug: 'geografia-asia' },
      { nombre: 'Amèrica', slug: 'geografia-america' },
    ],
  },
  'geografia-oceania': {
    titulo: 'Geografia d\'Oceania — Països i Illes del Pacífic',
    subtitulo: 'Austràlia, Nova Zelanda i els Arxipèlags del Pacífic',
    emoji: '🏝️', gradient: 'from-cyan-500 to-teal-700',
    examPath: '/estudiar/geografia/oceania',
    studyPath: '/estudiar/geografia/oceania',
    asignatura: 'Geografia', niveles: 'ESO',
    intro: 'Oceania és el continent més petit del món: 14 països i territoris que s\'estenen pel Pacífic Sud. Aprèn a identificar Austràlia (Canberra), Nova Zelanda (Wellington), Papua Nova Guinea, Fiji, Samoa i les altres illes del Pacífic amb les seves característiques geogràfiques úniques.',
    beneficios: [
      { titulo: 'Austràlia: Continent i Illa', texto: 'Austràlia és l\'únic país que ocupa un continent sencer. La seva capital és Canberra (no Sydney), dada que sorprèn la majoria. L\'examen treballa aquesta confusió freqüent.' },
      { titulo: 'Nova Zelanda i el Pacífic', texto: 'Nova Zelanda (Wellington com a capital, no Auckland), Fiji (Suva), Papua Nova Guinea (Port Moresby). Els arxipèlags amb més pes geopolític del Pacífic Sud.' },
      { titulo: 'Geografia Física Única', texto: 'La Gran Barrera de Corall (Austràlia), els guèisers de Nova Zelanda, el mont Wilhelm a Papua Nova Guinea. Oceania té la geografia física més singular del planeta.' },
    ],
    ejemplo: 'Un alumne de 2n d\'ESO creia que Sydney era la capital d\'Austràlia. Després de la pista "ciutat planejada com a capital al segle XX", aprèn que Canberra es va construir específicament per ser capital perquè Sydney i Melbourne no s\'entesaven.',
    consejos: [
      'La capital més confosa del món: Austràlia=Canberra (no Sydney ni Melbourne). Canberra va ser construïda entre les dues ciutats per resoldre el conflicte.',
      'Nova Zelanda: capital Wellington (sud de l\'Illa del Nord), ciutat més gran Auckland (nord de l\'Illa del Nord). Wellington és la capital més austral del món.',
      'Els països del Pacífic: Fiji, Samoa, Tonga, Vanuatu, Illes Salomó, Micronèsia, Kiribati, Tuvalu, Nauru, Palau. Petits però sobirans.',
      'Oceania vs Austràlia: "Oceania" és el continent que inclou Austràlia, Nova Zelanda i les illes del Pacífic. "Austràlia" és només el país.',
    ],
    relacionados: [
      { nombre: 'Àsia', slug: 'geografia-asia' },
      { nombre: 'Àfrica', slug: 'geografia-africa' },
      { nombre: 'Amèrica', slug: 'geografia-america' },
    ],
  },
  'geografia-espana': {
    titulo: 'Geografia d\'Espanya — Províncies i Comunitats Autònomes',
    subtitulo: 'Les 50 Províncies d\'Espanya i les seves Capitals',
    emoji: '🇪🇸', gradient: 'from-red-500 to-yellow-600',
    examPath: '/estudiar/geografia/espana',
    studyPath: '/estudiar/geografia/espana',
    asignatura: 'Geografia d\'Espanya', niveles: 'Primària, ESO',
    intro: 'Aprèn a identificar les 50 províncies espanyoles i les seves capitals, agrupades en les 17 comunitats autònomes. L\'examen treballa la localització de províncies per comunitat, les seves capitals i les seves característiques geogràfiques: rius, serralades i costes.',
    beneficios: [
      { titulo: 'Les 17 Comunitats Autònomes', texto: 'Catalunya, Madrid, Andalusia, Comunitat Valenciana, Galícia, Castella i Lleó... Cada comunitat amb les seves províncies agrupades. Aprendre per blocs és molt més eficaç que d\'una en una.' },
      { titulo: 'Capitals de Província', texto: 'Moltes províncies tenen el mateix nom que la seva capital (Madrid, Barcelona, València). Però hi ha excepcions: Àlaba=Vitòria, Guipúscoa=Sant Sebastià, Biscaia=Bilbao, Astúries=Oviedo.' },
      { titulo: 'Geografia Física d\'Espanya', texto: 'Sistema Central, Serralada Cantàbrica, Pirineus, Sistema Ibèric, Sierra Nevada. El Tajo, l\'Ebre, el Guadalquivir, el Duero. Els rius i serres ajuden a localitzar províncies.' },
    ],
    ejemplo: 'Un alumne de 5è de Primària confonia Burgos amb Lleó (totes dues a Castella i Lleó, al nord de la Meseta). La pista "província que limita amb La Rioja per l\'oest" l\'ajuda a situar correctament Burgos.',
    consejos: [
      'Les províncies del País Basc tenen capital diferent del nom: Àlaba=Vitòria-Gasteiz, Guipúscoa=Donostia-Sant Sebastià, Biscaia=Bilbao.',
      'Andalusia té 8 províncies: Huelva, Sevilla, Cadis, Màlaga, Granada, Almeria, Jaén, Còrdova. Aprèn-les d\'est a west.',
      'Castella i Lleó és la comunitat amb més províncies (9): Àvila, Burgos, Lleó, Palència, Salamanca, Segòvia, Sòria, Valladolid, Zamora.',
      'Les illes: Illes Balears (Palma de Mallorca) i Canàries formen 2 províncies. Les Canàries tenen 2 províncies: Las Palmas i S/C de Tenerife.',
    ],
    relacionados: [
      { nombre: 'Europa', slug: 'geografia-europa' },
      { nombre: 'Estats Units — Estats', slug: 'geografia-eeuu' },
      { nombre: 'Amèrica', slug: 'geografia-america' },
    ],
  },
  'geografia-eeuu': {
    titulo: 'Geografia dels Estats Units — Els 50 Estats',
    subtitulo: 'Capitals, Regions i Característiques dels 50 Estats Americans',
    emoji: '🇺🇸', gradient: 'from-blue-700 to-red-700',
    examPath: '/estudiar/geografia/eeuu',
    studyPath: '/estudiar/geografia/eeuu',
    asignatura: 'Geografia', niveles: 'ESO',
    intro: 'Aprèn a identificar els 50 estats dels Estats Units: les seves capitals (moltes no són les ciutats més famoses), la seva localització al mapa, i les seves característiques principals. L\'examen utilitza pistes progressives sobre la regió geogràfica, la població, la frontera amb altres estats o països i la capital.',
    beneficios: [
      { titulo: 'Capitals Sorprenents', texto: 'La capital de Califòrnia no és Los Angeles (és Sacramento). La de Texas no és Dallas ni Houston (és Austin). La de Florida no és Miami (és Tallahassee). Les confusions més freqüents a l\'examen.' },
      { titulo: 'Les Grans Regions', texto: 'Nova Anglaterra, el Midwest, el Sud, les Grans Planures, les Muntanyes Rocalloses, la Costa Oest. Aprendre els estats per regió geogràfica és molt més eficaç que d\'un en un.' },
      { titulo: 'Frontera i Geografia Física', texto: 'Els estats que limiten amb Mèxic (Califòrnia, Arizona, Nou Mèxic, Texas), els que limiten amb el Canadà, els que voregen els Grans Llacs. La frontera és una pista essencial del joc.' },
    ],
    ejemplo: 'Un alumne de 4t d\'ESO sabia que Washington D.C. era la capital federal però ignorava que l\'estat de Washington (al nord-oest) té capital a Olympia. La distinció entre l\'estat i el Districte de Colúmbia és una de les preguntes més freqüents.',
    consejos: [
      'La capital federal és Washington D.C. (Districte de Colúmbia) — no és un estat. L\'estat de Washington és al nord-oest, amb capital Olympia.',
      'Les capitals més confoses: Califòrnia=Sacramento (no LA), Texas=Austin (no Houston/Dallas), Florida=Tallahassee (no Miami), Illinois=Springfield (no Chicago), NY=Albany (no NYC).',
      'Els 4 estats que limiten amb Mèxic: Califòrnia, Arizona, Nou Mèxic, Texas. Els 2 estats no contigus: Alaska (nord-ouest del Canadà) i Hawaii (Pacífic).',
      'Els estats més petits es troben a Nova Anglaterra (nord-est): Rhode Island, Connecticut, Massachusetts, Vermont, New Hampshire, Maine.',
    ],
    relacionados: [
      { nombre: 'Espanya — Províncies', slug: 'geografia-espana' },
      { nombre: 'Amèrica', slug: 'geografia-america' },
      { nombre: 'Europa', slug: 'geografia-europa' },
    ],
  },
  'cuerpo-humano': {
    titulo: 'Cos Humà — Sistemes i Òrgans',
    subtitulo: 'Examen de Biologia — Digestiu, Circulatori, Respiratori i Nerviós',
    emoji: '🫀', gradient: 'from-red-500 to-rose-700',
    examPath: '/examen/cuerpo-humano',
    studyPath: '/estudiar/quimica/cuerpo-humano',
    asignatura: 'Biologia i Geologia', niveles: 'Primària i ESO',
    intro: 'Repassa els quatre grans sistemes del cos humà: el sistema digestiu (de la boca fins a l\'intestí), el circulatori (cor, artèries i venes), el respiratori (pulmons i alvèols) i el nerviós (neurones, reflexos i cerebel). Preguntes d\'opció múltiple amb explicació detallada.',
    beneficios: [
      { titulo: 'Ordre del Sistema Digestiu', texto: 'El recorregut de l\'aliment: boca → esòfag → estómac → intestí prim (absorció) → intestí gros → recte. La seqüència més avaluada als exàmens.' },
      { titulo: 'Artèries vs Venes', texto: 'Les artèries surten del cor amb pressió (paret gruixuda). Les venes retornen la sang al cor (vàlvules, paret més prima). Els capil·lars fan l\'intercanvi de gasos i nutrients.' },
      { titulo: 'Sistema Nerviós', texto: 'SNC: cervell + medul·la espinal. SNP: tots els nervis perifèrics. Arc reflex: estímul → neurona sensorial → medul·la → neurona motora → efector (sense passar pel cervell).' },
    ],
    ejemplo: 'Un alumne de 2n d\'ESO sempre confonia artèries i venes. Després d\'aprendre que "les artèries surten del cor", va treure la màxima puntuació a la pregunta del sistema circulatori.',
    consejos: [
      'A l\'intestí prim és on s\'absorbeixen els nutrients, no a l\'estómac.',
      'El diafragma és el múscul principal de la inspiració. En contraure\'s baixa i els pulmons s\'expandeixen.',
      'El cerebel controla l\'equilibri i la coordinació; el cervell gestiona el pensament i el llenguatge.',
    ],
    relacionados: [
      { nombre: 'La Cèl·lula', slug: 'celula' },
      { nombre: 'Nutrició', slug: 'nutricion' },
      { nombre: 'Éssers Vius', slug: 'seres-vivos' },
    ],
  },
  'seres-vivos': {
    titulo: 'Éssers Vius — Regnes i Classificació',
    subtitulo: 'Examen de Biologia — Vertebrats, Invertebrats, Plantes i Fongs',
    emoji: '🌱', gradient: 'from-emerald-500 to-green-700',
    examPath: '/examen/seres-vivos',
    studyPath: '/estudiar/quimica/seres-vivos',
    asignatura: 'Biologia i Geologia', niveles: 'Primària i ESO',
    intro: 'Classifica els éssers vius en els 5 regnes (Monera, Protista, Fungi, Plantae i Animalia). Aprèn a distingir vertebrats d\'invertebrats, amfibis de rèptils, angiospermes de gimnospermes i cèl·lules procariotes d\'eucariotes. Amb explicació després de cada pregunta.',
    beneficios: [
      { titulo: '5 Regnes', texto: 'Monera (bacteris), Protista (algues unicel·lulars), Fungi (bolets, llevats), Plantae (plantes) i Animalia (animals). Cada regne té característiques definidores.' },
      { titulo: 'Grups de Vertebrats', texto: 'Peixos, amfibis, rèptils, ocells i mamífers. Trets clau: els mamífers alleten i tenen pèl; els rèptils tenen escates i ous amb closca; els amfibis tenen metamorfosi.' },
      { titulo: 'Fotosíntesi', texto: 'CO₂ + H₂O + llum solar → glucosa + O₂. Les plantes són autòtrofes (produeixen el seu propi aliment); els animals són heteròtrofs. Els cloroplasts contenen clorofil·la (pigment verd).' },
    ],
    ejemplo: 'Una alumna de 6è creia que els dofins eren peixos. Després de l\'examen, va saber que els dofins són mamífers: respiren amb pulmons, alleten les cries i són de sang calenta.',
    consejos: [
      'El dofí és un mamífer, no un peix. Respira amb pulmons i alleta les cries.',
      'Amfibis vs rèptils: els amfibis tenen pell humida i metamorfosi; els rèptils tenen escates i ous amb closca.',
      'Gimnospermes = llavors nues en pinyes (pins); angiospermes = llavors dins d\'un fruit + flors (pomera, blat).',
    ],
    relacionados: [
      { nombre: 'La Cèl·lula', slug: 'celula' },
      { nombre: 'Ecosistemes', slug: 'ecosistemas' },
      { nombre: 'Genètica', slug: 'genetica' },
    ],
  },
  'ecosistemas': {
    titulo: 'Ecosistemes — Cadenes Tròfiques i Biomes',
    subtitulo: 'Examen de Ciències Naturals — Biomes, Adaptacions i Biodiversitat',
    emoji: '🌍', gradient: 'from-teal-500 to-emerald-700',
    examPath: '/examen/ecosistemas',
    studyPath: '/estudiar/quimica/ecosistemas',
    asignatura: 'Biologia i Geologia', niveles: 'Primària i ESO',
    intro: 'Domina els conceptes d\'ecologia: què és un ecosistema, com funciona una cadena tròfica (productors, consumidors i descomponedors), els principals biomes del planeta (selva tropical, tundra, desert) i les relacions entre espècies (mutualisme, parasitisme, comensalisme).',
    beneficios: [
      { titulo: 'Nivells Tròfics', texto: 'Productors (plantes) → Consumidors primaris (herbívors) → Consumidors secundaris (carnívors) → Descomponedors (fongs, bacteris). L\'energia es perd ≈90% en cada nivell.' },
      { titulo: 'Biomes', texto: 'Selva tropical: màxima biodiversitat. Tundra: permafrost, sense arbres, molt fred. Desert: sequedat extrema. Taigà: bosc de coníferes, hiverns llargs i freds.' },
      { titulo: 'Relacions entre Espècies', texto: 'Mutualisme (+/+): abelles i flors. Comensalisme (+/0): peix pallasso a l\'anèmone. Parasitisme (+/−): paparra al gos. Depredació (+/−): llop caça cérvol.' },
    ],
    ejemplo: 'Un alumne de 1r d\'ESO va identificar el conill de la cadena herba→conill→guineu→àguila com a "consumidor secundari". Després de l\'examen va entendre que és consumidor primari (herbívor que menja productors).',
    consejos: [
      'Els productors sempre són plantes o algues. Els herbívors són consumidors primaris. Els carnívors que mengen herbívors són consumidors secundaris.',
      'Els descomponedors (fongs, bacteris) tanquen el cicle de la matèria — sense ells els nutrients no tornarien al sòl.',
      'La selva tropical conté el 50-80% de les espècies del planeta tot i cobrir només el 6% de la superfície terrestre.',
    ],
    relacionados: [
      { nombre: 'Éssers Vius', slug: 'seres-vivos' },
      { nombre: 'La Cèl·lula', slug: 'celula' },
      { nombre: 'Genètica', slug: 'genetica' },
    ],
  },
  'genetica': {
    titulo: 'Genètica — ADN, Gens i Herència',
    subtitulo: 'Examen de Biologia ESO — Cromosomes, Mendel i Mutacions',
    emoji: '🧬', gradient: 'from-purple-500 to-violet-700',
    examPath: '/examen/genetica',
    studyPath: '/estudiar/quimica/genetica',
    asignatura: 'Biologia i Geologia', niveles: 'ESO',
    intro: 'Aprèn els fonaments de la genètica: estructura de l\'ADN, què és un gen i un cromosoma, les lleis de Mendel (dominant vs. recessiu), genotip vs. fenotip, mutacions i les seves causes, enginyeria genètica i clonació. Tot explicat amb exemples del currículum de l\'ESO.',
    beneficios: [
      { titulo: 'Estructura de l\'ADN', texto: 'Doble hèlix amb 4 bases: A-T i C-G sempre s\'aparellen. Watson i Crick, 1953. 20 000-25 000 gens al genoma humà, empaquetats en 46 cromosomes.' },
      { titulo: 'Lleis de Mendel', texto: 'El dominant (A) emmascara el recessiu (a). AA o Aa → fenotip dominant; aa → fenotip recessiu. Quadrat de Punnett per calcular probabilitats d\'herència.' },
      { titulo: 'Mutacions i Aplicacions', texto: 'Mutacions: espontànies o provocades per mutàgens (UV, tabac). Font de variabilitat genètica → evolució. Enginyeria genètica: insulina, CRISPR, plantes transgèniques, teràpia gènica.' },
    ],
    ejemplo: 'Un alumne de 3r d\'ESO creia que els ulls blaus eren dominants. Després de la pregunta "els ulls blaus només apareixen en homozigots recessius (aa)", va entendre la diferència entre genotip i fenotip.',
    consejos: [
      'Les cèl·lules somàtiques humanes tenen 46 cromosomes (23 parells). Els gàmetes (òvul, espermatozoide) en tenen 23.',
      'Un al·lel recessiu només s\'expressa quan l\'individu és homozigot recessiu (aa).',
      'El pare determina el sexe biològic: aporta X (nena) o Y (nen).',
    ],
    relacionados: [
      { nombre: 'La Cèl·lula', slug: 'celula' },
      { nombre: 'Éssers Vius', slug: 'seres-vivos' },
      { nombre: 'Ecosistemes', slug: 'ecosistemas' },
    ],
  },
  'nutricion': {
    titulo: 'Nutrició i Alimentació Saludable',
    subtitulo: 'Examen de Biologia — Macronutrients, Vitamines i Dieta Mediterrània',
    emoji: '🥗', gradient: 'from-lime-500 to-green-600',
    examPath: '/examen/nutricion',
    studyPath: '/estudiar/quimica/nutricion',
    asignatura: 'Biologia i Geologia', niveles: 'Primària i ESO',
    intro: 'Repassa els pilars de la nutrició: macronutrients (hidrats, proteïnes i greixos), vitamines liposolubles i hidrosolubles, minerals essencials, la dieta mediterrània i la importància de l\'aigua i la fibra. Preguntes d\'opció múltiple amb explicació detallada.',
    beneficios: [
      { titulo: 'Macronutrients', texto: 'Hidrats de carboni (4 kcal/g): energia ràpida. Proteïnes (4 kcal/g): construir i reparar teixits. Greixos (9 kcal/g): energia de reserva i hormones. Cadascun té un rol específic.' },
      { titulo: 'Vitamines', texto: 'Liposolubles (A, D, E, K): s\'emmagatzemen al fetge i al greix — l\'excés pot ser tòxic. Hidrosolubles (B, C): l\'excés s\'elimina per l\'orina — cal prendre-les regularment.' },
      { titulo: 'Dieta Mediterrània', texto: 'Patrimoni Cultural Immaterial de la UNESCO. Rica en fruites, verdures, llegums, cereals integrals, oli d\'oliva i peix. S\'associa a menor risc cardiovascular i major esperança de vida.' },
    ],
    ejemplo: 'Una alumna de 2n d\'ESO creia que la vitamina D venia únicament dels aliments. Després de la pregunta sobre la llum solar, va entendre que la pell la produeix a partir dels raigs UVB.',
    consejos: [
      'Vitamina D: la produeix la pell amb la llum solar. Essencial per absorbir el calci i mantenir els ossos.',
      '5 porcions de fruita i verdura al dia (recomanació de l\'OMS).',
      'L\'aigua no aporta calories però constitueix el 60-70% del cos — és el nutrient més important.',
    ],
    relacionados: [
      { nombre: 'Cos Humà', slug: 'cuerpo-humano' },
      { nombre: 'Éssers Vius', slug: 'seres-vivos' },
      { nombre: 'La Cèl·lula', slug: 'celula' },
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
