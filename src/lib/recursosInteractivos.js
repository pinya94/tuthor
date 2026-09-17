// ── Recursos interactivos: la lista única ───────────────────────────────────
//
// Los recursos que no se imprimen sino que se USAN: el alumno escribe su
// ejercicio y se lo resolvemos. Salen en tres sitios, y los tres leen de aquí
// para que no digan cosas distintas:
//   · /clase — la "Mi clase" del alumno, tenga clase o no.
//   · /profesor → pestaña Recursos, encima de los imprimibles.
//   · /recursos — la página pública.
//
// Recurso nuevo = entrada aquí + su ruta en App.jsx + STATIC_META + sitemap.
// Hay test que comprueba las tres cosas.
//
// `desc` es la descripción completa (tarjetas normales). `corto`, `etiquetas`
// y `accion` son para la tarjeta grande de /recursos, que se tiene que poder
// leer de un vistazo: una línea, dos etiquetas y un botón que dice qué pasa.
// `tipo` decide en qué bloque de /recursos sale: 'resolver' o 'explorar'.

const T = (es, en, ca) => ({ es, en, ca })

export const RECURSOS_INTERACTIVOS = [
  {
    id: 'funciones',
    tipo: 'resolver',
    emoji: '📈',
    path: '/recursos/funciones',
    materias: ['matematicas'],
    materia: T('Matemáticas', 'Maths', 'Matemàtiques'),
    titulo: T('Problemas de funciones', 'Function problems', 'Problemes de funcions'),
    desc: T(
      'Escribe la función o los datos del ejercicio y te la dibujamos: cortes con los ejes, vértice, dónde se cruzan dos rectas o la recta que pasa por dos puntos.',
      'Type the function or the exercise data and we draw it: axis crossings, vertex, where two lines cross or the line through two points.',
      "Escriu la funció o les dades de l'exercici i te la dibuixem: talls amb els eixos, vèrtex, on es creuen dues rectes o la recta que passa per dos punts."),
    corto: T(
      'Escribe tu función y te la dibujamos con sus puntos clave.',
      'Type your function and we draw it with its key points.',
      'Escriu la teva funció i te la dibuixem amb els punts clau.'),
    etiquetas: [T('Gráfica', 'Graph', 'Gràfica'), T('Rectas y parábolas', 'Lines and parabolas', 'Rectes i paràboles')],
    accion: T('Dibujar mi función', 'Draw my function', 'Dibuixar la meva funció'),
  },
  {
    id: 'ecuaciones',
    tipo: 'resolver',
    emoji: '⚖️',
    path: '/recursos/ecuaciones',
    materias: ['matematicas'],
    materia: T('Matemáticas', 'Maths', 'Matemàtiques'),
    titulo: T('Resolver ecuaciones', 'Solve equations', 'Resoldre equacions'),
    desc: T(
      'Ecuaciones de primer y segundo grado, con x a los dos lados, paréntesis o fracciones: paso a paso, con la comprobación y la gráfica.',
      'Linear and quadratic equations, with x on both sides, brackets or fractions: step by step, with the check and the graph.',
      'Equacions de primer i segon grau, amb x als dos costats, parèntesis o fraccions: pas a pas, amb la comprovació i la gràfica.'),
    corto: T(
      'Primer y segundo grado, resueltas paso a paso y comprobadas.',
      'Linear and quadratic, solved step by step and checked.',
      'Primer i segon grau, resoltes pas a pas i comprovades.'),
    etiquetas: [T('Paso a paso', 'Step by step', 'Pas a pas'), T('Comprobación', 'Check', 'Comprovació')],
    accion: T('Resolver mi ecuación', 'Solve my equation', 'Resoldre la meva equació'),
  },
  {
    id: 'estadistica',
    tipo: 'resolver',
    emoji: '📊',
    path: '/recursos/estadistica',
    materias: ['matematicas'],
    materia: T('Matemáticas', 'Maths', 'Matemàtiques'),
    titulo: T('Media, mediana y moda', 'Mean, median and mode', 'Mitjana, mediana i moda'),
    desc: T(
      'Pega tus datos o la tabla de frecuencias del ejercicio: tabla completa, media, mediana, moda, rango y desviación típica, paso a paso y con el diagrama de barras.',
      'Paste your data or the frequency table from the exercise: full table, mean, median, mode, range and standard deviation, step by step with a bar chart.',
      "Enganxa les teves dades o la taula de freqüències de l'exercici: taula completa, mitjana, mediana, moda, rang i desviació típica, pas a pas i amb el diagrama de barres."),
    corto: T(
      'Pega tus datos y sale la tabla, los parámetros y el gráfico.',
      'Paste your data and get the table, the measures and the chart.',
      'Enganxa les teves dades i surt la taula, els paràmetres i el gràfic.'),
    etiquetas: [T('Tabla de frecuencias', 'Frequency table', 'Taula de freqüències'), T('Gráfico de barras', 'Bar chart', 'Gràfic de barres')],
    accion: T('Calcular con mis datos', 'Calculate with my data', 'Calcular amb les meves dades'),
  },
  {
    id: 'mcm-mcd',
    tipo: 'resolver',
    emoji: '🔢',
    path: '/recursos/mcm-mcd',
    materias: ['matematicas'],
    materia: T('Matemáticas', 'Maths', 'Matemàtiques'),
    titulo: T('m.c.m. y m.c.d.', 'LCM and GCD', 'm.c.m. i m.c.d.'),
    desc: T(
      'Escribe tus números y obtén la factorización en primos de cada uno, el mínimo común múltiplo y el máximo común divisor, paso a paso y exactos.',
      'Type your numbers and get the prime factorisation of each, the lowest common multiple and the greatest common divisor, step by step and exact.',
      'Escriu els teus números i obtén la factorització en primers de cadascun, el mínim comú múltiple i el màxim comú divisor, pas a pas i exactes.'),
    corto: T(
      'Escribe tus números y sale la factorización, el m.c.m. y el m.c.d.',
      'Type your numbers and get the factorisation, the LCM and the GCD.',
      'Escriu els teus números i surt la factorització, el m.c.m. i el m.c.d.'),
    etiquetas: [T('Factorización', 'Factorisation', 'Factorització'), T('Paso a paso', 'Step by step', 'Pas a pas')],
    accion: T('Calcular con mis números', 'Calculate with my numbers', 'Calcular amb els meus números'),
  },
  {
    id: 'porcentajes',
    tipo: 'resolver',
    emoji: '💯',
    path: '/recursos/porcentajes',
    materias: ['matematicas'],
    materia: T('Matemáticas', 'Maths', 'Matemàtiques'),
    titulo: T('Porcentajes y regla de tres', 'Percentages and rule of three', 'Percentatges i regla de tres'),
    desc: T(
      'El X % de una cantidad, qué porcentaje es un número de otro, la regla de tres y aumentos o descuentos: escribe tus datos y sale resuelto paso a paso.',
      'X% of an amount, what percentage one number is of another, the rule of three and increases or discounts: type your data and it comes out solved step by step.',
      'El X % d\'una quantitat, quin percentatge és un número d\'un altre, la regla de tres i augments o descomptes: escriu les teves dades i surt resolt pas a pas.'),
    corto: T(
      'Porcentajes, regla de tres y descuentos, paso a paso.',
      'Percentages, rule of three and discounts, step by step.',
      'Percentatges, regla de tres i descomptes, pas a pas.'),
    etiquetas: [T('Regla de tres', 'Rule of three', 'Regla de tres'), T('Descuentos', 'Discounts', 'Descomptes')],
    accion: T('Calcular mi porcentaje', 'Calculate my percentage', 'Calcular el meu percentatge'),
  },
  {
    id: 'sistema-solar',
    tipo: 'explorar',
    // 🌌 y no el planeta con anillo (U+1FA90): está en U+1FA70–1FAFF y en Windows 10
    // sale como un cuadrado (hay test que lo vigila).
    emoji: '🌌',
    path: '/recursos/sistema-solar',
    materias: ['geologia'],
    materia: T('Ciencias', 'Science', 'Ciències'),
    titulo: T('El sistema solar en 3D', 'The solar system in 3D', 'El sistema solar en 3D'),
    desc: T(
      'Gíralo, haz que pase el tiempo y mira dónde están de verdad los planetas en cualquier fecha, con la distancia a la Tierra y los datos de cada uno.',
      'Rotate it, let time pass and see where the planets really are on any date, with their distance to Earth and facts about each one.',
      "Gira'l, fes que passi el temps i mira on són de veritat els planetes en qualsevol data, amb la distància a la Terra i les dades de cadascun."),
    corto: T(
      'Los planetas donde están de verdad, en la fecha que elijas.',
      'The planets where they really are, on any date you pick.',
      'Els planetes on són de veritat, en la data que triïs.'),
    etiquetas: [T('3D', '3D', '3D'), T('Órbitas reales', 'Real orbits', 'Òrbites reals')],
    accion: T('Abrir el sistema solar', 'Open the solar system', 'Obrir el sistema solar'),
  },
  {
    id: 'globo',
    tipo: 'explorar',
    emoji: '🌍',
    path: '/recursos/globo-terraqueo',
    materias: ['geografia'],
    materia: T('Geografía', 'Geography', 'Geografia'),
    titulo: T('El globo terráqueo en 3D', 'The globe in 3D', 'El globus terraqüi en 3D'),
    desc: T(
      'Gira la Tierra, toca un país para ver su ficha, lee la latitud y la longitud de cualquier punto y mira dónde es de día y de noche ahora mismo.',
      'Spin the Earth, tap a country to see its facts, read the latitude and longitude of any point and see where it is day and night right now.',
      "Gira la Terra, toca un país per veure'n la fitxa, llegeix la latitud i la longitud de qualsevol punt i mira on és de dia i de nit ara mateix."),
    corto: T(
      'Gira la Tierra, toca un país y mira dónde es de día ahora.',
      'Spin the Earth, tap a country and see where it is day right now.',
      'Gira la Terra, toca un país i mira on és de dia ara.'),
    etiquetas: [T('3D', '3D', '3D'), T('Países y coordenadas', 'Countries and coordinates', 'Països i coordenades')],
    accion: T('Abrir el globo', 'Open the globe', 'Obrir el globus'),
  },
]
