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

  q('al-30', 'eso',
    { es: 'Resuelve: 5x − 7 = 3x + 9', en: 'Solve: 5x − 7 = 3x + 9', ca: 'Resol: 5x − 7 = 3x + 9' },
    { es: ['x = 8', 'x = 2', 'x = 16', 'x = 1'], en: ['x = 8', 'x = 2', 'x = 16', 'x = 1'], ca: ['x = 8', 'x = 2', 'x = 16', 'x = 1'] },
    { es: 'x = 8', en: 'x = 8', ca: 'x = 8' },
    '⚖️',
    { es: 'Se juntan las x a un lado y los números al otro: 5x − 3x = 9 + 7, es decir 2x = 16, y x = 8. Al pasar un término al otro lado cambia de signo, porque en realidad se está restando lo mismo en ambos lados.', en: 'Gather the x terms on one side and the numbers on the other: 5x − 3x = 9 + 7, that is 2x = 16, so x = 8. Moving a term across changes its sign, because you are really subtracting the same thing from both sides.', ca: 'Es junten les x a un costat i els nombres a l\'altre: 2x = 16, i x = 8.' }),

  q('al-31', 'eso',
    { es: 'Simplifica: 4a + 3b − 2a', en: 'Simplify: 4a + 3b − 2a', ca: 'Simplifica: 4a + 3b − 2a' },
    { es: ['2a + 3b', '5ab', '7a − 2b', '2ab'], en: ['2a + 3b', '5ab', '7a − 2b', '2ab'], ca: ['2a + 3b', '5ab', '7a − 2b', '2ab'] },
    { es: '2a + 3b', en: '2a + 3b', ca: '2a + 3b' },
    '🧮',
    { es: 'Solo se pueden juntar los términos semejantes, los que llevan la misma letra: 4a − 2a = 2a. El 3b se queda como está porque b y a son cosas distintas, igual que no se pueden sumar peras con manzanas.', en: 'Only like terms can be combined, those with the same letter: 4a − 2a = 2a. The 3b stays as it is because b and a are different things, just as you cannot add pears to apples.', ca: 'Només es poden ajuntar els termes semblants, els que porten la mateixa lletra: 4a − 2a = 2a.' }),

  q('al-32', 'eso',
    { es: '"El doble de un número más 5 es igual a 17". ¿Qué ecuación lo expresa y cuánto vale el número?', en: '"Twice a number plus 5 equals 17". Which equation says this and what is the number?', ca: '"El doble d\'un nombre més 5 és igual a 17". Quina equació ho expressa i quant val el nombre?' },
    { es: ['2x + 5 = 17, x = 6', 'x + 5 = 17, x = 12', '2(x + 5) = 17, x = 3,5', '2x − 5 = 17, x = 11'], en: ['2x + 5 = 17, x = 6', 'x + 5 = 17, x = 12', '2(x + 5) = 17, x = 3.5', '2x − 5 = 17, x = 11'], ca: ['2x + 5 = 17, x = 6', 'x + 5 = 17, x = 12', '2(x + 5) = 17, x = 3,5', '2x − 5 = 17, x = 11'] },
    { es: '2x + 5 = 17, x = 6', en: '2x + 5 = 17, x = 6', ca: '2x + 5 = 17, x = 6' },
    '📝',
    { es: 'Lo difícil de estos problemas casi nunca es resolver la ecuación, sino escribirla. "El doble de un número" es 2x, y el "más 5" va fuera del doble: por eso no es 2(x + 5). Luego 2x = 12 y x = 6.', en: 'The hard part of these problems is almost never solving the equation but writing it. "Twice a number" is 2x, and the "plus 5" sits outside the doubling: that is why it is not 2(x + 5). Then 2x = 12 and x = 6.', ca: 'El difícil d\'aquests problemes gairebé mai és resoldre l\'equació, sinó escriure-la. Després 2x = 12 i x = 6.' }),

  q('al-33', 'eso',
    { es: 'Aplica la propiedad distributiva: 3(2x − 4)', en: 'Apply the distributive property: 3(2x − 4)', ca: 'Aplica la propietat distributiva: 3(2x − 4)' },
    { es: ['6x − 12', '6x − 4', '5x − 7', '6x + 12'], en: ['6x − 12', '6x − 4', '5x − 7', '6x + 12'], ca: ['6x − 12', '6x − 4', '5x − 7', '6x + 12'] },
    { es: '6x − 12', en: '6x − 12', ca: '6x − 12' },
    '✖️',
    { es: 'El 3 multiplica a todo lo que hay dentro del paréntesis, no solo al primer término: 3 × 2x = 6x y 3 × (−4) = −12. Olvidarse del segundo es uno de los fallos más repetidos.', en: 'The 3 multiplies everything inside the brackets, not just the first term: 3 × 2x = 6x and 3 × (−4) = −12. Forgetting the second is one of the commonest mistakes.', ca: 'El 3 multiplica tot el que hi ha dins del parèntesi, no només el primer terme.' }),

  q('al-34', 'eso',
    { es: 'Resuelve: 3(x − 2) = x + 4', en: 'Solve: 3(x − 2) = x + 4', ca: 'Resol: 3(x − 2) = x + 4' },
    { es: ['x = 5', 'x = 3', 'x = 1', 'x = 10'], en: ['x = 5', 'x = 3', 'x = 1', 'x = 10'], ca: ['x = 5', 'x = 3', 'x = 1', 'x = 10'] },
    { es: 'x = 5', en: 'x = 5', ca: 'x = 5' },
    '🔍',
    { es: 'Primero se quita el paréntesis: 3x − 6 = x + 4. Luego se agrupa: 3x − x = 4 + 6, o sea 2x = 10 y x = 5. Se puede comprobar sustituyendo: 3(5 − 2) = 9 y 5 + 4 = 9.', en: 'First remove the brackets: 3x − 6 = x + 4. Then gather: 3x − x = 4 + 6, so 2x = 10 and x = 5. You can check by substituting: 3(5 − 2) = 9 and 5 + 4 = 9.', ca: 'Primer es lleva el parèntesi: 3x − 6 = x + 4. Després 2x = 10 i x = 5.' }),

  q('al-35', 'eso',
    { es: 'Resuelve la inecuación: 2x > 10', en: 'Solve the inequality: 2x > 10', ca: 'Resol la inequació: 2x > 10' },
    { es: ['x > 5', 'x = 5', 'x < 5', 'x > 20'], en: ['x > 5', 'x = 5', 'x < 5', 'x > 20'], ca: ['x > 5', 'x = 5', 'x < 5', 'x > 20'] },
    { es: 'x > 5', en: 'x > 5', ca: 'x > 5' },
    '📊',
    { es: 'Se resuelve casi igual que una ecuación, dividiendo los dos lados entre 2. La diferencia importante es que la solución no es un número sino todos los mayores que 5, y que si se multiplica o divide por un número negativo hay que dar la vuelta al signo.', en: 'You solve it almost like an equation, dividing both sides by 2. The key difference is that the solution is not one number but every number above 5, and that multiplying or dividing by a negative flips the sign.', ca: 'Es resol gairebé igual que una equació. La solució no és un nombre sinó tots els més grans que 5.' }),

  q('al-36', 'eso',
    { es: 'Desarrolla: (a + b)(a − b)', en: 'Expand: (a + b)(a − b)', ca: 'Desenvolupa: (a + b)(a − b)' },
    { es: ['a² − b²', 'a² + b²', 'a² − 2ab + b²', 'a² − b'], en: ['a² − b²', 'a² + b²', 'a² − 2ab + b²', 'a² − b'], ca: ['a² − b²', 'a² + b²', 'a² − 2ab + b²', 'a² − b'] },
    { es: 'a² − b²', en: 'a² − b²', ca: 'a² − b²' },
    '🔷',
    { es: 'Al multiplicar todo con todo salen a², −ab, +ab y −b²: los dos del medio se anulan. Es la llamada suma por diferencia, y leída al revés sirve para factorizar cualquier resta de cuadrados, como x² − 9.', en: 'Multiplying everything out gives a², −ab, +ab and −b²: the middle two cancel. It is the sum-times-difference identity, and read backwards it factorises any difference of squares, like x² − 9.', ca: 'En multiplicar tot amb tot surten a², −ab, +ab i −b²: els dos del mig s\'anul·len.' }),

  q('al-37', 'eso',
    { es: 'En la fórmula del área de un rectángulo A = b · h, ¿cómo se despeja la altura h?', en: 'In the rectangle area formula A = b · h, how do you solve for the height h?', ca: 'A la fórmula de l\'àrea d\'un rectangle A = b · h, com s\'aïlla l\'altura h?' },
    { es: ['h = A / b', 'h = A · b', 'h = A − b', 'h = b / A'], en: ['h = A / b', 'h = A · b', 'h = A − b', 'h = b / A'], ca: ['h = A / b', 'h = A · b', 'h = A − b', 'h = b / A'] },
    { es: 'h = A / b', en: 'h = A / b', ca: 'h = A / b' },
    '📐',
    { es: 'La b está multiplicando a la h, así que pasa dividiendo al otro lado. Despejar es útil justo por esto: con una sola fórmula puedes calcular cualquiera de las tres cantidades si conoces las otras dos.', en: 'The b multiplies h, so it moves across as a division. Rearranging is useful precisely for this: one formula lets you find any of the three quantities if you know the other two.', ca: 'La b està multiplicant la h, així que passa dividint a l\'altre costat.' }),

  q('al-38', 'eso',
    { es: '¿Cuál es el grado del polinomio 4x³ − 2x + 7?', en: 'What is the degree of the polynomial 4x³ − 2x + 7?', ca: 'Quin és el grau del polinomi 4x³ − 2x + 7?' },
    { es: ['3', '4', '7', '1'], en: ['3', '4', '7', '1'], ca: ['3', '4', '7', '1'] },
    { es: '3', en: '3', ca: '3' },
    '📈',
    { es: 'El grado es el exponente más alto de la variable, y aquí es el 3 de x³. No hay que confundirlo con el coeficiente, que es el número que multiplica: el coeficiente de ese término es 4.', en: 'The degree is the highest exponent of the variable, here the 3 in x³. Do not confuse it with the coefficient, the multiplying number: that term\'s coefficient is 4.', ca: 'El grau és l\'exponent més alt de la variable, i aquí és el 3 de x³. No s\'ha de confondre amb el coeficient.' }),

]

export const PREGUNTAS_ESO = TODAS
