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

export const RECURSOS_INTERACTIVOS = [
  {
    id: 'funciones',
    emoji: '📈',
    path: '/recursos/funciones',
    materia: { es: 'Matemáticas', en: 'Maths', ca: 'Matemàtiques' },
    titulo: { es: 'Problemas de funciones', en: 'Function problems', ca: 'Problemes de funcions' },
    desc: {
      es: 'Escribe la función o los datos del ejercicio y te la dibujamos: cortes con los ejes, vértice, dónde se cruzan dos rectas o la recta que pasa por dos puntos.',
      en: 'Type the function or the exercise data and we draw it: axis crossings, vertex, where two lines cross or the line through two points.',
      ca: "Escriu la funció o les dades de l'exercici i te la dibuixem: talls amb els eixos, vèrtex, on es creuen dues rectes o la recta que passa per dos punts.",
    },
  },
  {
    id: 'ecuaciones',
    emoji: '⚖️',
    path: '/recursos/ecuaciones',
    materia: { es: 'Matemáticas', en: 'Maths', ca: 'Matemàtiques' },
    titulo: { es: 'Resolver ecuaciones', en: 'Solve equations', ca: 'Resoldre equacions' },
    desc: {
      es: 'Ecuaciones de primer y segundo grado, con x a los dos lados, paréntesis o fracciones: paso a paso, con la comprobación y la gráfica.',
      en: 'Linear and quadratic equations, with x on both sides, brackets or fractions: step by step, with the check and the graph.',
      ca: 'Equacions de primer i segon grau, amb x als dos costats, parèntesis o fraccions: pas a pas, amb la comprovació i la gràfica.',
    },
  },
  {
    id: 'estadistica',
    emoji: '📊',
    path: '/recursos/estadistica',
    materia: { es: 'Matemáticas', en: 'Maths', ca: 'Matemàtiques' },
    titulo: { es: 'Media, mediana y moda', en: 'Mean, median and mode', ca: 'Mitjana, mediana i moda' },
    desc: {
      es: 'Pega tus datos o la tabla de frecuencias del ejercicio: tabla completa, media, mediana, moda, rango y desviación típica, paso a paso y con el diagrama de barras.',
      en: 'Paste your data or the frequency table from the exercise: full table, mean, median, mode, range and standard deviation, step by step with a bar chart.',
      ca: "Enganxa les teves dades o la taula de freqüències de l'exercici: taula completa, mitjana, mediana, moda, rang i desviació típica, pas a pas i amb el diagrama de barres.",
    },
  },
  {
    id: 'sistema-solar',
    // 🌌 y no el planeta con anillo (U+1FA90): está en U+1FA70–1FAFF y en Windows 10
    // sale como un cuadrado (hay test que lo vigila).
    emoji: '🌌',
    path: '/recursos/sistema-solar',
    materia: { es: 'Ciencias', en: 'Science', ca: 'Ciències' },
    titulo: { es: 'El sistema solar en 3D', en: 'The solar system in 3D', ca: 'El sistema solar en 3D' },
    desc: {
      es: 'Gíralo, haz que pase el tiempo y mira dónde están de verdad los planetas en cualquier fecha, con la distancia a la Tierra y los datos de cada uno.',
      en: 'Rotate it, let time pass and see where the planets really are on any date, with their distance to Earth and facts about each one.',
      ca: 'Gira\'l, fes que passi el temps i mira on són de veritat els planetes en qualsevol data, amb la distància a la Terra i les dades de cadascun.',
    },
  },
  {
    id: 'globo',
    emoji: '🌍',
    path: '/recursos/globo-terraqueo',
    materia: { es: 'Geografía', en: 'Geography', ca: 'Geografia' },
    titulo: { es: 'El globo terráqueo en 3D', en: 'The globe in 3D', ca: 'El globus terraqüi en 3D' },
    desc: {
      es: 'Gira la Tierra, toca un país para ver su ficha, lee la latitud y la longitud de cualquier punto y mira dónde es de día y de noche ahora mismo.',
      en: 'Spin the Earth, tap a country to see its facts, read the latitude and longitude of any point and see where it is day and night right now.',
      ca: "Gira la Terra, toca un país per veure'n la fitxa, llegeix la latitud i la longitud de qualsevol punt i mira on és de dia i de nit ara mateix.",
    },
  },
]
