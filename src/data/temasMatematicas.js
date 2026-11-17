// Los temas del hub de Matemáticas que no son un modo del motor de cálculo
// (esos salen de MODOS en lib/mathEngine.js). Aquí y no en la página para que
// el test de arte pueda comprobar que cada tarjeta tiene su dibujo.
export const TEMAS_MATEMATICAS_EXTRA = [
  {
    id: 'geometria',
    titulo: 'Geometría', tituloEn: 'Geometry', tituloCa: 'Geometria',
    emoji: '📐', gradient: 'from-pink-500 to-rose-700',
    tags: ['area', 'perimetro', 'pitagoras', 'angulos', 'volumen', 'triangulo'],
  },
  {
    id: 'fracciones',
    titulo: 'Fracciones y Decimales', tituloEn: 'Fractions and Decimals', tituloCa: 'Fraccions i Decimals',
    emoji: '🍕', gradient: 'from-blue-500 to-indigo-600',
    tags: ['fraccion', 'decimal', 'porcentaje', 'equivalente', 'simplificar'],
  },
  {
    id: 'porcentajes',
    titulo: 'Proporcionalidad y Porcentajes', tituloEn: 'Proportion and Percentages', tituloCa: 'Proporcionalitat i Percentatges',
    emoji: '💯', gradient: 'from-emerald-500 to-teal-700',
    tags: ['porcentaje', 'proporcion', 'regla de tres', 'descuento', 'escala', 'iva'],
  },
  {
    id: 'divisibilidad',
    titulo: 'Divisibilidad', tituloEn: 'Divisibility', tituloCa: 'Divisibilitat',
    emoji: '🌳', gradient: 'from-lime-500 to-green-700',
    tags: ['multiplo', 'divisor', 'primo', 'mcm', 'mcd', 'factores', 'criterios'],
  },
  {
    id: 'potencias',
    titulo: 'Potencias y Notación Científica', tituloEn: 'Powers and Scientific Notation', tituloCa: 'Potències i Notació Científica',
    emoji: '🚀', gradient: 'from-orange-500 to-red-600',
    tags: ['potencia', 'exponente', 'raiz', 'cuadrado', 'cubo', 'notacion cientifica', 'powers', 'scientific notation'],
  },
  {
    id: 'sucesiones',
    titulo: 'Sucesiones y Progresiones', tituloEn: 'Sequences and Progressions', tituloCa: 'Successions i Progressions',
    emoji: '🔢', gradient: 'from-teal-500 to-emerald-700',
    tags: ['sucesion', 'progresion', 'aritmetica', 'geometrica', 'termino general', 'fibonacci', 'sequence', 'progression'],
  },
  {
    id: 'trigonometria',
    titulo: 'Trigonometría', tituloEn: 'Trigonometry', tituloCa: 'Trigonometria',
    emoji: '📐', gradient: 'from-cyan-500 to-blue-700',
    tags: ['seno', 'coseno', 'tangente', 'radianes', 'angulo', 'teorema del seno', 'teorema del coseno', 'sine', 'cosine'],
  },
  {
    id: 'estadistica',
    titulo: 'Estadística y Probabilidad', tituloEn: 'Statistics and Probability', tituloCa: 'Estadística i Probabilitat',
    emoji: '📊', gradient: 'from-purple-500 to-violet-600',
    tags: ['media', 'mediana', 'moda', 'probabilidad', 'grafico', 'datos'],
  },
  {
    id: 'enteros-racionales',
    titulo: 'Números Enteros y Racionales', tituloEn: 'Integers and Rationals', tituloCa: 'Nombres Enters i Racionals',
    emoji: '🔢', gradient: 'from-slate-500 to-gray-700',
    tags: ['entero', 'negativo', 'valor absoluto', 'racional', 'signos'],
  },
  {
    id: 'algebra',
    titulo: 'Álgebra', tituloEn: 'Algebra', tituloCa: 'Àlgebra',
    emoji: '🔣', gradient: 'from-red-500 to-rose-700',
    tags: ['ecuacion', 'variable', 'monomio', 'sistema', 'cuadratica'],
  },
  {
    id: 'teorema-de-pitagoras',
    titulo: 'Teorema de Pitágoras', tituloEn: 'Pythagoras’ theorem', tituloCa: 'Teorema de Pitàgores',
    emoji: '📐', gradient: 'from-indigo-500 to-violet-700',
    tags: ['pitagoras', 'hipotenusa', 'cateto', 'triangulo rectangulo', 'pythagoras'],
  },
  {
    id: 'sistemas-de-ecuaciones',
    titulo: 'Sistemas de ecuaciones', tituloEn: 'Simultaneous equations', tituloCa: 'Sistemes d’equacions',
    emoji: '🔣', gradient: 'from-red-500 to-rose-700',
    tags: ['sistema', 'ecuaciones', 'sustitucion', 'igualacion', 'reduccion', 'simultaneous'],
  },
  {
    id: 'cuerpos-geometricos',
    titulo: 'Cuerpos geométricos', tituloEn: 'Solid shapes', tituloCa: 'Cossos geomètrics',
    emoji: '📦', gradient: 'from-violet-500 to-sky-700',
    tags: ['volumen', 'area', 'prisma', 'cilindro', 'cono', 'esfera', 'piramide', 'volume'],
  },
  {
    id: 'ecuaciones-de-segundo-grado',
    titulo: 'Ecuaciones de segundo grado', tituloEn: 'Quadratic equations', tituloCa: 'Equacions de segon grau',
    emoji: '🧮', gradient: 'from-orange-500 to-red-700',
    tags: ['ecuaciones', 'segundo grado', 'cuadratica', 'discriminante', 'incompletas', 'quadratic'],
  },
  {
    id: 'proporcionalidad',
    titulo: 'Proporcionalidad', tituloEn: 'Proportion', tituloCa: 'Proporcionalitat',
    emoji: '⚖️', gradient: 'from-emerald-500 to-teal-700',
    tags: ['proporcionalidad', 'directa', 'inversa', 'regla de tres', 'reparto', 'proportion'],
  },
  {
    id: 'numeros-decimales',
    titulo: 'Números decimales', tituloEn: 'Decimals', tituloCa: 'Nombres decimals',
    emoji: '🔢', gradient: 'from-sky-500 to-cyan-700',
    tags: ['decimales', 'decimas', 'centesimas', 'redondear', 'decimals'],
  },
  {
    id: 'numeros-romanos',
    titulo: 'Números romanos', tituloEn: 'Roman numerals', tituloCa: 'Nombres romans',
    emoji: '🏛️', gradient: 'from-stone-500 to-amber-700',
    tags: ['romanos', 'numeracion', 'siglos', 'roman numerals'],
  },
]
