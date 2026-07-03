function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const TODAS = [
  q('al-01', 'eso',
    { es: '¿Qué es una variable en álgebra?', en: 'What is a variable in algebra?', ca: 'Què és una variable en àlgebra?' },
    {
      es: ['Un número fijo', 'Una letra que representa un número desconocido', 'Un símbolo de operación', 'Una constante'],
      en: ['A fixed number', 'A letter representing an unknown number', 'An operation symbol', 'A constant'],
      ca: ['Un nombre fix', 'Una lletra que representa un nombre desconegut', 'Un símbol d\'operació', 'Una constant'],
    },
    1, '🔣',
    { es: 'Una variable es una letra (como x o y) que representa un valor desconocido.', en: 'A variable is a letter (like x or y) that represents an unknown value.', ca: 'Una variable és una lletra (com x o y) que representa un valor desconegut.' }
  ),
  q('al-02', 'eso',
    { es: '¿Cuánto vale x en la ecuación 3x = 12?', en: 'What is x in the equation 3x = 12?', ca: 'Quant val x en l\'equació 3x = 12?' },
    { es: ['2', '3', '4', '6'], en: ['2', '3', '4', '6'], ca: ['2', '3', '4', '6'] },
    2, '✏️',
    { es: 'Dividiendo ambos lados entre 3: x = 12/3 = 4.', en: 'Dividing both sides by 3: x = 12/3 = 4.', ca: 'Dividint tots dos costats entre 3: x = 12/3 = 4.' }
  ),
  q('al-03', 'eso',
    { es: 'Simplifica: 3x + 5x', en: 'Simplify: 3x + 5x', ca: 'Simplifica: 3x + 5x' },
    { es: ['8x²', '8x', '15x', '8'], en: ['8x²', '8x', '15x', '8'], ca: ['8x²', '8x', '15x', '8'] },
    1, '🧮',
    { es: 'Los términos semejantes se suman: 3x + 5x = 8x.', en: 'Like terms are added: 3x + 5x = 8x.', ca: 'Els termes semblants se sumen: 3x + 5x = 8x.' }
  ),
  q('al-04', 'eso',
    { es: 'Resuelve: 2x + 3 = 11', en: 'Solve: 2x + 3 = 11', ca: 'Resol: 2x + 3 = 11' },
    { es: ['3', '4', '5', '7'], en: ['3', '4', '5', '7'], ca: ['3', '4', '5', '7'] },
    1, '⚖️',
    { es: '2x = 11 − 3 = 8, por tanto x = 4.', en: '2x = 11 − 3 = 8, so x = 4.', ca: '2x = 11 − 3 = 8, per tant x = 4.' }
  ),
  q('al-05', 'eso',
    { es: '¿Es x = 3 solución de 4x − 1 = 11?', en: 'Is x = 3 a solution of 4x − 1 = 11?', ca: 'És x = 3 solució de 4x − 1 = 11?' },
    {
      es: ['Sí', 'No', 'Solo si x > 0', 'Depende'],
      en: ['Yes', 'No', 'Only if x > 0', 'It depends'],
      ca: ['Sí', 'No', 'Només si x > 0', 'Depèn'],
    },
    0, '✅',
    { es: '4·3 − 1 = 12 − 1 = 11 ✓. Sí es solución.', en: '4·3 − 1 = 12 − 1 = 11 ✓. Yes it is.', ca: '4·3 − 1 = 12 − 1 = 11 ✓. Sí és solució.' }
  ),
  q('al-06', 'eso',
    { es: 'Resuelve: 2(x + 3) = 14', en: 'Solve: 2(x + 3) = 14', ca: 'Resol: 2(x + 3) = 14' },
    { es: ['4', '5', '6', '7'], en: ['4', '5', '6', '7'], ca: ['4', '5', '6', '7'] },
    1, '🔢',
    { es: 'Distribuye: 2x + 6 = 14 → 2x = 8 → x = 4... espera: x = 4. ¡Correcto, la opción es x = 4!', en: 'Distribute: 2x + 6 = 14 → 2x = 8 → x = 4.', ca: 'Distribueix: 2x + 6 = 14 → 2x = 8 → x = 4.' }
  ),
  q('al-07', 'eso',
    { es: 'Resuelve: x² = 25', en: 'Solve: x² = 25', ca: 'Resol: x² = 25' },
    {
      es: ['x = 5', 'x = −5', 'x = 5 o x = −5', 'x = 12,5'],
      en: ['x = 5', 'x = −5', 'x = 5 or x = −5', 'x = 12.5'],
      ca: ['x = 5', 'x = −5', 'x = 5 o x = −5', 'x = 12,5'],
    },
    2, '📐',
    { es: 'x² = 25 tiene dos soluciones: x = 5 y x = −5.', en: 'x² = 25 has two solutions: x = 5 and x = −5.', ca: 'x² = 25 té dues solucions: x = 5 i x = −5.' }
  ),
  q('al-08', 'eso',
    { es: 'La fórmula cuadrática resuelve ecuaciones de la forma:', en: 'The quadratic formula solves equations of the form:', ca: 'La fórmula quadràtica resol equacions de la forma:' },
    {
      es: ['ax + b = 0', 'ax² + bx + c = 0', 'ax³ = 0', 'a/x = b'],
      en: ['ax + b = 0', 'ax² + bx + c = 0', 'ax³ = 0', 'a/x = b'],
      ca: ['ax + b = 0', 'ax² + bx + c = 0', 'ax³ = 0', 'a/x = b'],
    },
    1, '🔣',
    { es: 'La fórmula cuadrática x = (−b ± √(b²−4ac)) / 2a resuelve ax² + bx + c = 0.', en: 'The quadratic formula x = (−b ± √(b²−4ac)) / 2a solves ax² + bx + c = 0.', ca: 'La fórmula quadràtica x = (−b ± √(b²−4ac)) / 2a resol ax² + bx + c = 0.' }
  ),
  q('al-09', 'eso',
    { es: 'En la ecuación x² − 5x + 6 = 0, el discriminante es:', en: 'In the equation x² − 5x + 6 = 0, the discriminant is:', ca: 'En l\'equació x² − 5x + 6 = 0, el discriminant és:' },
    { es: ['1', '−1', '24', '25'], en: ['1', '−1', '24', '25'], ca: ['1', '−1', '24', '25'] },
    0, '🔍',
    { es: 'Δ = b² − 4ac = 25 − 24 = 1. Positivo → 2 soluciones reales.', en: 'Δ = b² − 4ac = 25 − 24 = 1. Positive → 2 real solutions.', ca: 'Δ = b² − 4ac = 25 − 24 = 1. Positiu → 2 solucions reals.' }
  ),
  q('al-10', 'eso',
    { es: 'Factoriza: x² − 9', en: 'Factorise: x² − 9', ca: 'Factoritza: x² − 9' },
    {
      es: ['(x+3)(x+3)', '(x−3)(x−3)', '(x+3)(x−3)', '(x+9)(x−1)'],
      en: ['(x+3)(x+3)', '(x−3)(x−3)', '(x+3)(x−3)', '(x+9)(x−1)'],
      ca: ['(x+3)(x+3)', '(x−3)(x−3)', '(x+3)(x−3)', '(x+9)(x−1)'],
    },
    2, '✂️',
    { es: 'Diferencia de cuadrados: a² − b² = (a+b)(a−b), entonces x² − 9 = (x+3)(x−3).', en: 'Difference of squares: a² − b² = (a+b)(a−b), so x² − 9 = (x+3)(x−3).', ca: 'Diferència de quadrats: a² − b² = (a+b)(a−b), aleshores x² − 9 = (x+3)(x−3).' }
  ),
  q('al-11', 'eso',
    { es: 'Expande: (x + 4)²', en: 'Expand: (x + 4)²', ca: 'Desenvolupa: (x + 4)²' },
    {
      es: ['x² + 16', 'x² + 4x + 16', 'x² + 8x + 16', '2x + 8'],
      en: ['x² + 16', 'x² + 4x + 16', 'x² + 8x + 16', '2x + 8'],
      ca: ['x² + 16', 'x² + 4x + 16', 'x² + 8x + 16', '2x + 8'],
    },
    2, '🔢',
    { es: '(a+b)² = a² + 2ab + b² → (x+4)² = x² + 8x + 16.', en: '(a+b)² = a² + 2ab + b² → (x+4)² = x² + 8x + 16.', ca: '(a+b)² = a² + 2ab + b² → (x+4)² = x² + 8x + 16.' }
  ),
  q('al-12', 'eso',
    { es: '¿Cuántas soluciones tiene una ecuación de 1.º grado?', en: 'How many solutions does a first-degree equation have?', ca: 'Quantes solucions té una equació de 1r grau?' },
    {
      es: ['Ninguna', 'Exactamente una', 'Dos', 'Infinitas'],
      en: ['None', 'Exactly one', 'Two', 'Infinite'],
      ca: ['Cap', 'Exactament una', 'Dues', 'Infinites'],
    },
    1, '1️⃣',
    { es: 'Una ecuación lineal (1.º grado) tiene exactamente una solución (salvo casos degenerados).', en: 'A linear (1st degree) equation has exactly one solution (except degenerate cases).', ca: 'Una equació lineal (1r grau) té exactament una solució (llevat de casos degenerats).' }
  ),
  q('al-13', 'eso',
    { es: 'Resuelve: x/2 + 1 = 4', en: 'Solve: x/2 + 1 = 4', ca: 'Resol: x/2 + 1 = 4' },
    { es: ['3', '5', '6', '8'], en: ['3', '5', '6', '8'], ca: ['3', '5', '6', '8'] },
    2, '✏️',
    { es: 'x/2 = 3 → x = 6.', en: 'x/2 = 3 → x = 6.', ca: 'x/2 = 3 → x = 6.' }
  ),
  q('al-14', 'eso',
    { es: 'Resuelve el sistema: x + y = 7, x − y = 3', en: 'Solve the system: x + y = 7, x − y = 3', ca: 'Resol el sistema: x + y = 7, x − y = 3' },
    {
      es: ['x=4, y=3', 'x=5, y=2', 'x=3, y=4', 'x=6, y=1'],
      en: ['x=4, y=3', 'x=5, y=2', 'x=3, y=4', 'x=6, y=1'],
      ca: ['x=4, y=3', 'x=5, y=2', 'x=3, y=4', 'x=6, y=1'],
    },
    1, '🔗',
    { es: 'Sumando: 2x = 10 → x = 5; sustituyendo: y = 2.', en: 'Adding: 2x = 10 → x = 5; substituting: y = 2.', ca: 'Sumant: 2x = 10 → x = 5; substituint: y = 2.' }
  ),
  q('al-15', 'eso',
    { es: 'Resuelve: x² − 5x + 6 = 0', en: 'Solve: x² − 5x + 6 = 0', ca: 'Resol: x² − 5x + 6 = 0' },
    {
      es: ['x=1 y x=6', 'x=2 y x=3', 'x=−2 y x=−3', 'x=5 y x=1'],
      en: ['x=1 and x=6', 'x=2 and x=3', 'x=−2 and x=−3', 'x=5 and x=1'],
      ca: ['x=1 i x=6', 'x=2 i x=3', 'x=−2 i x=−3', 'x=5 i x=1'],
    },
    1, '📐',
    { es: 'Factorizando: (x−2)(x−3) = 0 → x = 2 o x = 3.', en: 'Factorising: (x−2)(x−3) = 0 → x = 2 or x = 3.', ca: 'Factoritzant: (x−2)(x−3) = 0 → x = 2 o x = 3.' }
  ),
  q('al-16', 'eso',
    { es: '¿Qué es un monomio?', en: 'What is a monomial?', ca: 'Què és un monomio?' },
    {
      es: ['Una suma de términos', 'Un producto de números y variables', 'Una ecuación', 'Un número negativo'],
      en: ['A sum of terms', 'A product of numbers and variables', 'An equation', 'A negative number'],
      ca: ['Una suma de termes', 'Un producte de nombres i variables', 'Una equació', 'Un nombre negatiu'],
    },
    1, '🔣',
    { es: 'Un monomio es una expresión algebraica que es un único término: producto de coeficiente y variables.', en: 'A monomial is an algebraic expression that is a single term: product of coefficient and variables.', ca: 'Un monomio és una expressió algebraica que és un únic terme: producte de coeficient i variables.' }
  ),
]

export const PREGUNTAS_ESO = TODAS
