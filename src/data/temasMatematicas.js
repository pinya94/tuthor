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
]
