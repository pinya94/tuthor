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
]
