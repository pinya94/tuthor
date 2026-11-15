// Tercera tanda del autocompletado (15-nov-2026): álgebra y polinomios,
// proporcionalidad directa e inversa, el relieve de España y los climas de
// España. Cada página: meta, resumen, puntos clave, tablas, dudas y
// ejercicios resueltos en los tres idiomas.
//   algebra            → MATEMATICAS_AMPLIADO (la pinta AlgebraTema.jsx)
//   proporcionalidad   → MATEMATICAS_TEMA (MatematicasTemaExtra.jsx)
//   relieve / climas   → ESTUDIO_EXTRA (TemaEstudioExtra.jsx)
// El relieve sale de lib/riosMontanas.js (los mismos sistemas y frases del juego).
import { MONTES, PISTA_MONTE } from '../lib/riosMontanas.js'

const T = (es, en, ca) => ({ es, en, ca })
const L = T

// ── ÁLGEBRA ───────────────────────────────────────────────────────────────

export const algebra = {
  metaTitle: L('Álgebra: lenguaje algebraico, polinomios, identidades notables y ecuaciones — resumen y ejercicios', 'Algebra: algebraic language, polynomials, special products and equations — summary and practice questions', 'Àlgebra: llenguatge algebraic, polinomis, identitats notables i equacions — resum i exercicis'),
  metaDesc: L('Expresiones algebraicas, monomios y polinomios, cómo sumarlos y multiplicarlos, identidades notables y ecuaciones de primer y segundo grado, con ejercicios resueltos.', 'Algebraic expressions, monomials and polynomials, how to add and multiply them, special products, and linear and quadratic equations, with worked exercises.', 'Expressions algebraiques, monomis i polinomis, com sumar-los i multiplicar-los, identitats notables i equacions de primer i segon grau, amb exercicis resolts.'),
  resumen: L(
    ['El álgebra usa letras para representar números que no conocemos o que pueden cambiar. Con ellas se escriben expresiones algebraicas («el doble de un número más tres» es 2x + 3) y ecuaciones, que son igualdades que solo se cumplen para algunos valores: resolverlas es encontrar esos valores.', 'Las expresiones más importantes son los monomios (un número por letras, como −3x²) y los polinomios, que son sumas de monomios (4x³ − 2x + 7). Se suman juntando los términos semejantes y se multiplican con la propiedad distributiva; algunos productos se repiten tanto que se aprenden de memoria: las identidades notables.'],
    ['Algebra uses letters to stand for numbers we do not know or that can change. With them we write algebraic expressions («twice a number plus three» is 2x + 3) and equations, which are equalities that only hold for certain values: solving them means finding those values.', 'The most important expressions are monomials (a number times letters, such as −3x²) and polynomials, which are sums of monomials (4x³ − 2x + 7). They are added by collecting like terms and multiplied using the distributive property; some products come up so often that they are learnt by heart: the special products.'],
    ['L’àlgebra fa servir lletres per representar nombres que no coneixem o que poden canviar. Amb elles s’escriuen expressions algebraiques («el doble d’un nombre més tres» és 2x + 3) i equacions, que són igualtats que només es compleixen per a alguns valors: resoldre-les és trobar aquests valors.', 'Les expressions més importants són els monomis (un nombre per lletres, com −3x²) i els polinomis, que són sumes de monomis (4x³ − 2x + 7). Se sumen ajuntant els termes semblants i es multipliquen amb la propietat distributiva; alguns productes es repeteixen tant que s’aprenen de memòria: les identitats notables.'],
  ),
  puntosClave: L(
    ['Monomio: coeficiente × parte literal (en −3x², −3 y x²); su grado es el exponente.', 'Solo se suman los monomios semejantes: 2x² + 5x² = 7x², pero 2x + 3x² no se puede juntar.', 'Para multiplicar se usa la propiedad distributiva: 3x(2x − 4) = 6x² − 12x.', '(a + b)² = a² + 2ab + b²; (a − b)² = a² − 2ab + b²; (a + b)(a − b) = a² − b².', 'Ecuación de 1.er grado: se agrupan las x a un lado y los números al otro.', 'Ecuación de 2.º grado: x = (−b ± √(b² − 4ac)) / 2a.'],
    ['Monomial: coefficient × variable part (in −3x², −3 and x²); its degree is the exponent.', 'Only like terms can be added: 2x² + 5x² = 7x², but 2x + 3x² cannot be combined.', 'To multiply, use the distributive property: 3x(2x − 4) = 6x² − 12x.', '(a + b)² = a² + 2ab + b²; (a − b)² = a² − 2ab + b²; (a + b)(a − b) = a² − b².', 'Linear equation: put the x terms on one side and the numbers on the other.', 'Quadratic equation: x = (−b ± √(b² − 4ac)) / 2a.'],
    ['Monomi: coeficient × part literal (a −3x², −3 i x²); el grau és l’exponent.', 'Només se sumen els monomis semblants: 2x² + 5x² = 7x², però 2x + 3x² no es pot ajuntar.', 'Per multiplicar es fa servir la propietat distributiva: 3x(2x − 4) = 6x² − 12x.', '(a + b)² = a² + 2ab + b²; (a − b)² = a² − 2ab + b²; (a + b)(a − b) = a² − b².', 'Equació de 1r grau: s’agrupen les x a un costat i els nombres a l’altre.', 'Equació de 2n grau: x = (−b ± √(b² − 4ac)) / 2a.'],
  ),
  secciones: [
    {
      titulo: L('Del enunciado a la expresión', 'From words to expressions', 'De l’enunciat a l’expressió'),
      tabla: {
        columnas: L(['Enunciado', 'Expresión'], ['In words', 'Expression'], ['Enunciat', 'Expressió']),
        filas: [
          [L('el doble de un número', 'twice a number', 'el doble d’un nombre'), '2x'],
          [L('un número más cinco', 'a number plus five', 'un nombre més cinc'), 'x + 5'],
          [L('la mitad de un número', 'half a number', 'la meitat d’un nombre'), 'x / 2'],
          [L('el cuadrado de un número', 'the square of a number', 'el quadrat d’un nombre'), 'x²'],
          [L('el triple de un número menos cuatro', 'three times a number minus four', 'el triple d’un nombre menys quatre'), '3x − 4'],
          [L('dos números consecutivos', 'two consecutive numbers', 'dos nombres consecutius'), 'x y x + 1'],
        ],
      },
    },
    {
      titulo: L('Monomios y polinomios', 'Monomials and polynomials', 'Monomis i polinomis'),
      tabla: {
        columnas: L(['Concepto', 'Qué es', 'Ejemplo'], ['Term', 'What it is', 'Example'], ['Concepte', 'Què és', 'Exemple']),
        filas: [
          [L('Monomio', 'Monomial', 'Monomi'), L('un número (coeficiente) por letras (parte literal)', 'a number (coefficient) times letters (variable part)', 'un nombre (coeficient) per lletres (part literal)'), L('−3x²: coeficiente −3, grado 2', '−3x²: coefficient −3, degree 2', '−3x²: coeficient −3, grau 2')],
          [L('Monomios semejantes', 'Like terms', 'Monomis semblants'), L('tienen la misma parte literal', 'they have the same variable part', 'tenen la mateixa part literal'), '2x² y 5x² → 7x²'],
          [L('Polinomio', 'Polynomial', 'Polinomi'), L('suma de monomios; su grado es el del monomio de mayor grado', 'a sum of monomials; its degree is that of the highest-degree term', 'suma de monomis; el grau és el del monomi de grau més alt'), L('4x³ − 2x + 7: grado 3, término independiente 7', '4x³ − 2x + 7: degree 3, constant term 7', '4x³ − 2x + 7: grau 3, terme independent 7')],
          [L('Valor numérico', 'Numerical value', 'Valor numèric'), L('lo que vale al sustituir la letra por un número', 'its value when the letter is replaced by a number', 'el que val en substituir la lletra per un nombre'), 'P(x) = 4x³ − 2x + 7 → P(2) = 32 − 4 + 7 = 35'],
        ],
      },
    },
    {
      titulo: L('Tipos de ecuaciones', 'Types of equation', 'Tipus d’equacions'),
      tabla: {
        columnas: L(['Tipo', 'Forma', 'Cómo se resuelve'], ['Type', 'Form', 'How to solve it'], ['Tipus', 'Forma', 'Com es resol']),
        filas: [
          [L('Primer grado', 'Linear', 'Primer grau'), 'ax + b = 0', L('quitar paréntesis y denominadores, agrupar y despejar: x = −b / a', 'remove brackets and denominators, collect terms and solve: x = −b / a', 'treure parèntesis i denominadors, agrupar i aïllar: x = −b / a')],
          [L('Segundo grado', 'Quadratic', 'Segon grau'), 'ax² + bx + c = 0', L('fórmula x = (−b ± √(b² − 4ac)) / 2a. Si b² − 4ac > 0, dos soluciones; si es 0, una (doble); si es negativo, ninguna', 'formula x = (−b ± √(b² − 4ac)) / 2a. If b² − 4ac > 0, two solutions; if 0, one (repeated); if negative, none', 'fórmula x = (−b ± √(b² − 4ac)) / 2a. Si b² − 4ac > 0, dues solucions; si és 0, una (doble); si és negatiu, cap')],
          [L('Sistema de dos ecuaciones', 'Pair of simultaneous equations', 'Sistema de dues equacions'), L('dos ecuaciones con x e y', 'two equations in x and y', 'dues equacions amb x i y'), L('sustitución, igualación, reducción o método gráfico', 'substitution, equating, elimination or the graphical method', 'substitució, igualació, reducció o mètode gràfic')],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Qué diferencia hay entre una expresión algebraica y una ecuación?', 'What is the difference between an algebraic expression and an equation?', 'Quina diferència hi ha entre una expressió algebraica i una equació?'),
      r: T('La expresión no tiene signo igual (2x + 3) y puede valer cualquier cosa según x. La ecuación es una igualdad (2x + 3 = 11) que solo se cumple para algunos valores: aquí, x = 4.', 'An expression has no equals sign (2x + 3) and can take any value depending on x. An equation is an equality (2x + 3 = 11) that only holds for some values: here, x = 4.', 'L’expressió no té signe igual (2x + 3) i pot valer qualsevol cosa segons x. L’equació és una igualtat (2x + 3 = 11) que només es compleix per a alguns valors: aquí, x = 4.') },
    { p: T('¿Por qué (a + b)² no es a² + b²?', 'Why is (a + b)² not a² + b²?', 'Per què (a + b)² no és a² + b²?'),
      r: T('Porque (a + b)² = (a + b)(a + b), y al multiplicar salen cuatro productos: a², ab, ab y b². Falta el doble producto 2ab. Con números: (3 + 2)² = 25, y 3² + 2² = 13.', 'Because (a + b)² = (a + b)(a + b), and multiplying out gives four products: a², ab, ab and b². The 2ab is missing. With numbers: (3 + 2)² = 25, but 3² + 2² = 13.', 'Perquè (a + b)² = (a + b)(a + b), i en multiplicar surten quatre productes: a², ab, ab i b². Falta el doble producte 2ab. Amb nombres: (3 + 2)² = 25, i 3² + 2² = 13.') },
  ],
  ejercicios: [
    { e: T('Suma: (2x² + 3x − 1) + (x² − 5x + 4).', 'Add: (2x² + 3x − 1) + (x² − 5x + 4).', 'Suma: (2x² + 3x − 1) + (x² − 5x + 4).'),
      s: T('Se juntan los semejantes: 2x² + x² = 3x²; 3x − 5x = −2x; −1 + 4 = 3. Resultado: 3x² − 2x + 3.', 'Collect like terms: 2x² + x² = 3x²; 3x − 5x = −2x; −1 + 4 = 3. Result: 3x² − 2x + 3.', 'S’ajunten els semblants: 2x² + x² = 3x²; 3x − 5x = −2x; −1 + 4 = 3. Resultat: 3x² − 2x + 3.') },
    { e: T('Multiplica: 3x(2x − 4).', 'Multiply out: 3x(2x − 4).', 'Multiplica: 3x(2x − 4).'),
      s: T('Propiedad distributiva: 3x · 2x − 3x · 4 = 6x² − 12x.', 'Distributive property: 3x · 2x − 3x · 4 = 6x² − 12x.', 'Propietat distributiva: 3x · 2x − 3x · 4 = 6x² − 12x.') },
    { e: T('Desarrolla (x + 3)².', 'Expand (x + 3)².', 'Desenvolupa (x + 3)².'),
      s: T('(a + b)² = a² + 2ab + b² → x² + 2 · x · 3 + 9 = x² + 6x + 9.', '(a + b)² = a² + 2ab + b² → x² + 2 · x · 3 + 9 = x² + 6x + 9.', '(a + b)² = a² + 2ab + b² → x² + 2 · x · 3 + 9 = x² + 6x + 9.') },
    { e: T('Resuelve: 2(x − 3) = x + 4.', 'Solve: 2(x − 3) = x + 4.', 'Resol: 2(x − 3) = x + 4.'),
      s: T('2x − 6 = x + 4 → 2x − x = 4 + 6 → x = 10. Comprobación: 2 · 7 = 14 y 10 + 4 = 14.', '2x − 6 = x + 4 → 2x − x = 4 + 6 → x = 10. Check: 2 · 7 = 14 and 10 + 4 = 14.', '2x − 6 = x + 4 → 2x − x = 4 + 6 → x = 10. Comprovació: 2 · 7 = 14 i 10 + 4 = 14.') },
    { e: T('Resuelve: x² − 5x + 6 = 0.', 'Solve: x² − 5x + 6 = 0.', 'Resol: x² − 5x + 6 = 0.'),
      s: T('a = 1, b = −5, c = 6. b² − 4ac = 25 − 24 = 1. x = (5 ± 1) / 2: x = 3 y x = 2.', 'a = 1, b = −5, c = 6. b² − 4ac = 25 − 24 = 1. x = (5 ± 1) / 2: x = 3 and x = 2.', 'a = 1, b = −5, c = 6. b² − 4ac = 25 − 24 = 1. x = (5 ± 1) / 2: x = 3 i x = 2.') },
    { e: T('Si P(x) = x³ − 2x + 1, calcula P(−1).', 'If P(x) = x³ − 2x + 1, work out P(−1).', 'Si P(x) = x³ − 2x + 1, calcula P(−1).'),
      s: T('(−1)³ − 2 · (−1) + 1 = −1 + 2 + 1 = 2.', '(−1)³ − 2 · (−1) + 1 = −1 + 2 + 1 = 2.', '(−1)³ − 2 · (−1) + 1 = −1 + 2 + 1 = 2.') },
  ],
}

// ── PROPORCIONALIDAD ──────────────────────────────────────────────────────

export const proporcionalidad = {
  metaTitle: L('Proporcionalidad directa e inversa y regla de tres (con ejemplos) — resumen y ejercicios', 'Direct and inverse proportion and the rule of three (with examples) — summary and practice questions', 'Proporcionalitat directa i inversa i regla de tres (amb exemples) — resum i exercicis'),
  metaDesc: L('Cómo saber si dos magnitudes son directa o inversamente proporcionales, la regla de tres directa e inversa, los repartos proporcionales y ejercicios resueltos.', 'How to tell whether two quantities are in direct or inverse proportion, the direct and inverse rule of three, proportional sharing, and worked exercises.', 'Com saber si dues magnituds són directament o inversament proporcionals, la regla de tres directa i inversa, els repartiments proporcionals i exercicis resolts.'),
  resumen: L(
    ['Dos magnitudes son directamente proporcionales cuando, si una se multiplica por un número, la otra se multiplica por el mismo: el doble de kilos de manzanas cuesta el doble. Su cociente es siempre el mismo (el precio por kilo). Son inversamente proporcionales cuando, si una se multiplica, la otra se divide entre el mismo número: el doble de pintores tarda la mitad. Lo que no cambia es su producto.', 'Con la regla de tres se calcula un dato desconocido a partir de tres conocidos. Antes de hacer la cuenta hay que decidir si la relación es directa o inversa: preguntarse «si hay más de esto, ¿hay más o menos de aquello?».'],
    ['Two quantities are in direct proportion when, if one is multiplied by a number, the other is multiplied by the same number: twice the kilos of apples costs twice as much. Their quotient is always the same (the price per kilo). They are in inverse proportion when, if one is multiplied, the other is divided by the same number: twice as many painters take half the time. What stays the same is their product.', 'The rule of three finds an unknown value from three known ones. Before doing the sum you have to decide whether the relationship is direct or inverse: ask yourself «if there is more of this, is there more or less of that?».'],
    ['Dues magnituds són directament proporcionals quan, si una es multiplica per un nombre, l’altra es multiplica pel mateix: el doble de quilos de pomes costa el doble. El seu quocient és sempre el mateix (el preu per quilo). Són inversament proporcionals quan, si una es multiplica, l’altra es divideix entre el mateix nombre: el doble de pintors triga la meitat. El que no canvia és el producte.', 'Amb la regla de tres es calcula una dada desconeguda a partir de tres de conegudes. Abans de fer el compte cal decidir si la relació és directa o inversa: preguntar-se «si n’hi ha més d’això, n’hi ha més o menys d’allò?».'],
  ),
  puntosClave: L(
    ['Directa: más → más (y menos → menos) en la misma proporción; el cociente es constante.', 'Inversa: más → menos en la misma proporción; el producto es constante.', 'Regla de tres directa: x = (b · c) / a. Inversa: x = (a · b) / c.', 'Antes de calcular, decide si es directa o inversa.', 'No todo lo que crece a la vez es proporcional: la edad y la altura no lo son.', 'Reparto directamente proporcional: se divide el total entre la suma de las partes.'],
    ['Direct: more → more (and less → less) in the same proportion; the quotient is constant.', 'Inverse: more → less in the same proportion; the product is constant.', 'Direct rule of three: x = (b · c) / a. Inverse: x = (a · b) / c.', 'Before calculating, decide whether it is direct or inverse.', 'Not everything that grows together is proportional: age and height are not.', 'Sharing in direct proportion: divide the total by the sum of the parts.'],
    ['Directa: més → més (i menys → menys) en la mateixa proporció; el quocient és constant.', 'Inversa: més → menys en la mateixa proporció; el producte és constant.', 'Regla de tres directa: x = (b · c) / a. Inversa: x = (a · b) / c.', 'Abans de calcular, decideix si és directa o inversa.', 'No tot el que creix alhora és proporcional: l’edat i l’alçada no ho són.', 'Repartiment directament proporcional: es divideix el total entre la suma de les parts.'],
  ),
  secciones: [
    {
      titulo: L('Directa o inversa', 'Direct or inverse', 'Directa o inversa'),
      tabla: {
        columnas: L(['', 'Directa', 'Inversa'], ['', 'Direct', 'Inverse'], ['', 'Directa', 'Inversa']),
        filas: [
          [L('Cuándo', 'When', 'Quan'), L('si una aumenta, la otra aumenta en la misma proporción', 'if one increases, the other increases in the same proportion', 'si una augmenta, l’altra augmenta en la mateixa proporció'), L('si una aumenta, la otra disminuye en la misma proporción', 'if one increases, the other decreases in the same proportion', 'si una augmenta, l’altra disminueix en la mateixa proporció')],
          [L('Qué se mantiene', 'What stays the same', 'Què es manté'), L('el cociente: y ÷ x = k', 'the quotient: y ÷ x = k', 'el quocient: y ÷ x = k'), L('el producto: x · y = k', 'the product: x · y = k', 'el producte: x · y = k')],
          [L('Ejemplos', 'Examples', 'Exemples'), L('kilos y precio; horas trabajadas y sueldo; ingredientes y raciones', 'kilos and price; hours worked and pay; ingredients and servings', 'quilos i preu; hores treballades i sou; ingredients i racions'), L('obreros y días; velocidad y tiempo para un mismo trayecto; grifos y horas para llenar', 'workers and days; speed and time for the same journey; taps and hours to fill', 'obrers i dies; velocitat i temps per a un mateix trajecte; aixetes i hores per omplir')],
        ],
      },
    },
    {
      titulo: L('La regla de tres, paso a paso', 'The rule of three, step by step', 'La regla de tres, pas a pas'),
      tabla: {
        columnas: L(['Tipo', 'Planteamiento', 'Cuenta'], ['Type', 'Setting out', 'Sum'], ['Tipus', 'Plantejament', 'Compte']),
        filas: [
          [L('Directa', 'Direct', 'Directa'), L('3 kg → 6 €; 5 kg → x', '3 kg → €6; 5 kg → x', '3 kg → 6 €; 5 kg → x'), L('x = 5 · 6 / 3 = 10 €', 'x = 5 · 6 / 3 = €10', 'x = 5 · 6 / 3 = 10 €')],
          [L('Inversa', 'Inverse', 'Inversa'), L('4 obreros → 6 días; 8 obreros → x', '4 workers → 6 days; 8 workers → x', '4 obrers → 6 dies; 8 obrers → x'), L('x = 4 · 6 / 8 = 3 días', 'x = 4 · 6 / 8 = 3 days', 'x = 4 · 6 / 8 = 3 dies')],
        ],
      },
      texto: L(
        ['Un truco para no equivocarse: reducir a la unidad. Si 3 kg cuestan 6 €, 1 kg cuesta 2 € y 5 kg, 10 €. Si 4 obreros tardan 6 días, 1 obrero tardaría 24 días y 8 obreros, 24 ÷ 8 = 3 días.'],
        ['A trick to avoid mistakes: work out the value for one. If 3 kg cost €6, 1 kg costs €2 and 5 kg, €10. If 4 workers take 6 days, 1 worker would take 24 days and 8 workers, 24 ÷ 8 = 3 days.'],
        ['Un truc per no equivocar-se: reduir a la unitat. Si 3 kg costen 6 €, 1 kg costa 2 € i 5 kg, 10 €. Si 4 obrers triguen 6 dies, 1 obrer trigaria 24 dies i 8 obrers, 24 ÷ 8 = 3 dies.'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿Cómo sé si es directa o inversa?', 'How do I know whether it is direct or inverse?', 'Com sé si és directa o inversa?'),
      r: T('Pregúntate qué pasa si una magnitud se duplica. Si la otra también se duplica, es directa; si se reduce a la mitad, es inversa. Y comprueba con los datos: en la directa el cociente se mantiene; en la inversa, el producto.', 'Ask yourself what happens if one quantity doubles. If the other doubles too, it is direct; if it halves, it is inverse. Then check with the data: in direct proportion the quotient stays the same; in inverse, the product.', 'Pregunta’t què passa si una magnitud es duplica. Si l’altra també es duplica, és directa; si es redueix a la meitat, és inversa. I comprova-ho amb les dades: en la directa el quocient es manté; en la inversa, el producte.') },
    { p: T('¿Siempre que una cosa sube y la otra también es proporcional?', 'If two things go up together, are they always proportional?', 'Sempre que una cosa puja i l’altra també és proporcional?'),
      r: T('No. Un taxi que cobra 3 € al subir y 1 € por kilómetro cobra 5 € por 2 km y 7 € por 4 km: el doble de kilómetros no cuesta el doble. Para que sea proporcional, el cociente tiene que ser siempre el mismo.', 'No. A taxi that charges £3 to start and £1 per mile charges £5 for 2 miles and £7 for 4 miles: twice the distance does not cost twice as much. For it to be proportional, the quotient must always be the same.', 'No. Un taxi que cobra 3 € en pujar i 1 € per quilòmetre cobra 5 € per 2 km i 7 € per 4 km: el doble de quilòmetres no costa el doble. Perquè sigui proporcional, el quocient ha de ser sempre el mateix.') },
  ],
  ejercicios: [
    { e: T('5 cuadernos cuestan 7,50 €. ¿Cuánto cuestan 8?', '5 exercise books cost €7.50. How much do 8 cost?', '5 quaderns costen 7,50 €. Quant en costen 8?'),
      s: T('Directa. Un cuaderno: 7,50 ÷ 5 = 1,50 €. Ocho: 8 × 1,50 = 12 €.', 'Direct. One book: 7.50 ÷ 5 = €1.50. Eight: 8 × 1.50 = €12.', 'Directa. Un quadern: 7,50 ÷ 5 = 1,50 €. Vuit: 8 × 1,50 = 12 €.') },
    { e: T('Un coche a 90 km/h tarda 4 horas en un viaje. ¿Cuánto tardaría a 120 km/h?', 'A car at 90 km/h takes 4 hours for a journey. How long would it take at 120 km/h?', 'Un cotxe a 90 km/h triga 4 hores en un viatge. Quant trigaria a 120 km/h?'),
      s: T('Inversa: más velocidad, menos tiempo. 90 × 4 = 360 km. 360 ÷ 120 = 3 horas.', 'Inverse: more speed, less time. 90 × 4 = 360 km. 360 ÷ 120 = 3 hours.', 'Inversa: més velocitat, menys temps. 90 × 4 = 360 km. 360 ÷ 120 = 3 hores.') },
    { e: T('6 grifos llenan un depósito en 10 horas. ¿Cuánto tardan 4 grifos?', '6 taps fill a tank in 10 hours. How long do 4 taps take?', '6 aixetes omplen un dipòsit en 10 hores. Quant triguen 4 aixetes?'),
      s: T('Inversa: menos grifos, más tiempo. 6 × 10 = 60 horas-grifo. 60 ÷ 4 = 15 horas.', 'Inverse: fewer taps, more time. 6 × 10 = 60 tap-hours. 60 ÷ 4 = 15 hours.', 'Inversa: menys aixetes, més temps. 6 × 10 = 60 hores-aixeta. 60 ÷ 4 = 15 hores.') },
    { e: T('Una receta para 4 personas lleva 300 g de harina. ¿Cuánta harina hace falta para 10 personas?', 'A recipe for 4 people uses 300 g of flour. How much flour is needed for 10 people?', 'Una recepta per a 4 persones porta 300 g de farina. Quanta farina cal per a 10 persones?'),
      s: T('Directa. Por persona: 300 ÷ 4 = 75 g. Para 10: 750 g.', 'Direct. Per person: 300 ÷ 4 = 75 g. For 10: 750 g.', 'Directa. Per persona: 300 ÷ 4 = 75 g. Per a 10: 750 g.') },
    { e: T('Reparte 900 € en partes directamente proporcionales a 2, 3 y 4.', 'Share €900 in direct proportion to 2, 3 and 4.', 'Reparteix 900 € en parts directament proporcionals a 2, 3 i 4.'),
      s: T('2 + 3 + 4 = 9 partes. Cada parte: 900 ÷ 9 = 100 €. Tocan 200 €, 300 € y 400 € (suman 900).', '2 + 3 + 4 = 9 parts. Each part: 900 ÷ 9 = €100. The shares are €200, €300 and €400 (total 900).', '2 + 3 + 4 = 9 parts. Cada part: 900 ÷ 9 = 100 €. Toquen 200 €, 300 € i 400 € (sumen 900).') },
  ],
}

// ── EL RELIEVE DE ESPAÑA ──────────────────────────────────────────────────

const GRUPO = {
  pirineos: L('Cordilleras exteriores', 'Outer ranges', 'Serralades exteriors'),
  beticos: L('Cordilleras exteriores', 'Outer ranges', 'Serralades exteriors'),
  catalana: L('Cordilleras exteriores', 'Outer ranges', 'Serralades exteriors'),
  cantabrica: L('Rodean la Meseta', 'Around the Meseta', 'Envolten la Meseta'),
  iberico: L('Rodean la Meseta', 'Around the Meseta', 'Envolten la Meseta'),
  morena: L('Rodean la Meseta', 'Around the Meseta', 'Envolten la Meseta'),
  galaico: L('Rodean la Meseta', 'Around the Meseta', 'Envolten la Meseta'),
  central: L('Dentro de la Meseta', 'Inside the Meseta', 'Dins de la Meseta'),
  toledo: L('Dentro de la Meseta', 'Inside the Meseta', 'Dins de la Meseta'),
}
const ORDEN_GRUPO = ['central', 'toledo', 'galaico', 'cantabrica', 'iberico', 'morena', 'pirineos', 'beticos', 'catalana']

export const relieveEspana = {
  metaTitle: L('El relieve de España: la Meseta, sistemas montañosos, depresiones y picos más altos — resumen y ejercicios', 'The relief of Spain: the Meseta, mountain ranges, lowlands and highest peaks — summary and practice questions', 'El relleu d’Espanya: la Meseta, sistemes muntanyosos, depressions i cims més alts — resum i exercicis'),
  metaDesc: L('El relieve de España explicado: la Meseta Central, los sistemas que la rodean y la dividen, las cordilleras exteriores, las depresiones, las islas y los picos más altos.', 'The relief of Spain explained: the central Meseta, the ranges around and inside it, the outer ranges, the lowlands, the islands and the highest peaks.', 'El relleu d’Espanya explicat: la Meseta Central, els sistemes que l’envolten i la divideixen, les serralades exteriors, les depressions, les illes i els cims més alts.'),
  resumen: L(
    ['El centro de la península lo ocupa la Meseta Central, una gran llanura elevada (unos 600-800 metros de altitud media) que el Sistema Central divide en dos: la submeseta norte, regada por el Duero, y la submeseta sur, por el Tajo y el Guadiana. Por eso España es uno de los países más altos de Europa de media.', 'Alrededor de la Meseta se levantan montañas que la cierran: el Macizo Galaico, la Cordillera Cantábrica, el Sistema Ibérico y Sierra Morena. Más allá están las cordilleras exteriores (Pirineos, Sistemas Béticos y Cordillera Costero-Catalana) y dos grandes depresiones, las del Ebro y del Guadalquivir. Las islas Baleares continúan los Sistemas Béticos, y las Canarias son volcánicas.'],
    ['The centre of the peninsula is taken up by the Meseta Central, a large raised plain (around 600-800 metres high on average) that the Central System splits in two: the northern sub-plateau, drained by the Douro, and the southern one, by the Tagus and the Guadiana. That is why Spain is one of the highest countries in Europe on average.', 'Around the Meseta rise mountains that close it in: the Galician Massif, the Cantabrian Mountains, the Iberian System and Sierra Morena. Beyond them are the outer ranges (the Pyrenees, the Baetic System and the Catalan Coastal Range) and two large lowlands, the Ebro and Guadalquivir valleys. The Balearic Islands continue the Baetic System, and the Canary Islands are volcanic.'],
    ['El centre de la península l’ocupa la Meseta Central, una gran plana elevada (uns 600-800 metres d’altitud mitjana) que el Sistema Central divideix en dues: la submeseta nord, regada pel Duero, i la submeseta sud, pel Tajo i el Guadiana. Per això Espanya és un dels països més alts d’Europa de mitjana.', 'Al voltant de la Meseta s’aixequen muntanyes que la tanquen: el Massís Galaic, la Serralada Cantàbrica, el Sistema Ibèric i Serra Morena. Més enllà hi ha les serralades exteriors (Pirineus, Sistemes Bètics i Serralada Litoral Catalana) i dues grans depressions, les de l’Ebre i del Guadalquivir. Les illes Balears continuen els Sistemes Bètics, i les Canàries són volcàniques.'],
  ),
  puntosClave: L(
    ['La Meseta Central es la unidad principal del relieve: una llanura alta en el centro.', 'El Sistema Central la divide en submeseta norte y submeseta sur.', 'La rodean el Macizo Galaico, la Cordillera Cantábrica, el Sistema Ibérico y Sierra Morena.', 'Cordilleras exteriores: Pirineos, Sistemas Béticos y Cordillera Costero-Catalana.', 'Depresiones: la del Ebro y la del Guadalquivir.', 'Pico más alto de España: el Teide (3.715 m); de la península: el Mulhacén (3.479 m).'],
    ['The Meseta Central is the main relief unit: a high plain in the centre.', 'The Central System splits it into a northern and a southern sub-plateau.', 'It is surrounded by the Galician Massif, the Cantabrian Mountains, the Iberian System and Sierra Morena.', 'Outer ranges: the Pyrenees, the Baetic System and the Catalan Coastal Range.', 'Lowlands: the Ebro valley and the Guadalquivir valley.', 'Highest peak in Spain: Teide (3,715 m); on the peninsula: Mulhacén (3,479 m).'],
    ['La Meseta Central és la unitat principal del relleu: una plana alta al centre.', 'El Sistema Central la divideix en submeseta nord i submeseta sud.', 'L’envolten el Massís Galaic, la Serralada Cantàbrica, el Sistema Ibèric i Serra Morena.', 'Serralades exteriors: Pirineus, Sistemes Bètics i Serralada Litoral Catalana.', 'Depressions: la de l’Ebre i la del Guadalquivir.', 'Cim més alt d’Espanya: el Teide (3.715 m); de la península: el Mulhacén (3.479 m).'],
  ),
  secciones: [
    {
      titulo: L('Los sistemas montañosos', 'The mountain ranges', 'Els sistemes muntanyosos'),
      tabla: {
        columnas: L(['Grupo', 'Sistema', 'Dónde está'], ['Group', 'Range', 'Where it is'], ['Grup', 'Sistema', 'On és']),
        filas: ORDEN_GRUPO.map(id => [GRUPO[id], MONTES.find(m => m.id === id).nombre, PISTA_MONTE[id]]),
      },
    },
    {
      titulo: L('Los picos más altos', 'The highest peaks', 'Els cims més alts'),
      tabla: {
        columnas: L(['Pico', 'Altura', 'Dónde'], ['Peak', 'Height', 'Where'], ['Cim', 'Alçada', 'On']),
        filas: [
          ['Teide', '3.715 m', L('Tenerife (Canarias): un volcán, el pico más alto de España', 'Tenerife (Canary Islands): a volcano, the highest peak in Spain', 'Tenerife (Canàries): un volcà, el cim més alt d’Espanya')],
          ['Mulhacén', '3.479 m', L('Sierra Nevada (Sistemas Béticos): el más alto de la península', 'Sierra Nevada (Baetic System): the highest on the peninsula', 'Sierra Nevada (Sistemes Bètics): el més alt de la península')],
          ['Aneto', '3.404 m', L('Pirineos (Huesca)', 'Pyrenees (Huesca)', 'Pirineus (Osca)')],
          ['Torre Cerredo', '2.648 m', L('Picos de Europa (Cordillera Cantábrica)', 'Picos de Europa (Cantabrian Mountains)', 'Picos de Europa (Serralada Cantàbrica)')],
          ['Almanzor', '2.591 m', L('Sierra de Gredos (Sistema Central)', 'Sierra de Gredos (Central System)', 'Serra de Gredos (Sistema Central)')],
          ['Moncayo', '2.314 m', L('Sistema Ibérico, entre Zaragoza y Soria', 'Iberian System, between Zaragoza and Soria', 'Sistema Ibèric, entre Saragossa i Sòria')],
        ],
      },
    },
    {
      titulo: L('Las depresiones y las costas', 'Lowlands and coasts', 'Les depressions i les costes'),
      lista: L(
        ['Depresión del Ebro: entre los Pirineos y el Sistema Ibérico; por ella corre el Ebro hasta el Mediterráneo.', 'Depresión del Guadalquivir: entre Sierra Morena y los Sistemas Béticos; es una llanura abierta al Atlántico.', 'Las costas cantábrica y gallega son altas y recortadas (en Galicia, las rías); las mediterráneas y la atlántica andaluza son más bajas y con largas playas.'],
        ['The Ebro valley: between the Pyrenees and the Iberian System; the Ebro flows through it to the Mediterranean.', 'The Guadalquivir valley: between Sierra Morena and the Baetic System; a plain open to the Atlantic.', 'The Cantabrian and Galician coasts are high and jagged (in Galicia, the rías); the Mediterranean and Andalusian Atlantic coasts are lower, with long beaches.'],
        ['Depressió de l’Ebre: entre els Pirineus i el Sistema Ibèric; hi corre l’Ebre fins a la Mediterrània.', 'Depressió del Guadalquivir: entre Serra Morena i els Sistemes Bètics; és una plana oberta a l’Atlàntic.', 'Les costes cantàbrica i gallega són altes i retallades (a Galícia, les ries); les mediterrànies i l’atlàntica andalusa són més baixes i amb platges llargues.'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿Cuál es la montaña más alta de España?', 'What is the highest mountain in Spain?', 'Quina és la muntanya més alta d’Espanya?'),
      r: T('El Teide, en Tenerife, con 3.715 metros. En la península, el Mulhacén, en Sierra Nevada, con 3.479 metros.', 'Teide, on Tenerife, at 3,715 metres. On the peninsula, Mulhacén, in Sierra Nevada, at 3,479 metres.', 'El Teide, a Tenerife, amb 3.715 metres. A la península, el Mulhacén, a Sierra Nevada, amb 3.479 metres.') },
    { p: T('¿Qué separa la submeseta norte de la sur?', 'What separates the northern and southern sub-plateaus?', 'Què separa la submeseta nord de la sud?'),
      r: T('El Sistema Central, con las sierras de Gredos y Guadarrama.', 'The Central System, with the Gredos and Guadarrama ranges.', 'El Sistema Central, amb les serres de Gredos i Guadarrama.') },
  ],
  ejercicios: [
    { e: T('Di qué sistemas montañosos rodean la Meseta.', 'Name the ranges that surround the Meseta.', 'Digues quins sistemes muntanyosos envolten la Meseta.'),
      s: T('El Macizo Galaico (noroeste), la Cordillera Cantábrica (norte), el Sistema Ibérico (este) y Sierra Morena (sur).', 'The Galician Massif (north-west), the Cantabrian Mountains (north), the Iberian System (east) and Sierra Morena (south).', 'El Massís Galaic (nord-oest), la Serralada Cantàbrica (nord), el Sistema Ibèric (est) i Serra Morena (sud).') },
    { e: T('¿Entre qué montañas está la depresión del Guadalquivir?', 'Between which mountains is the Guadalquivir valley?', 'Entre quines muntanyes és la depressió del Guadalquivir?'),
      s: T('Entre Sierra Morena, al norte, y los Sistemas Béticos, al sur.', 'Between Sierra Morena to the north and the Baetic System to the south.', 'Entre Serra Morena, al nord, i els Sistemes Bètics, al sud.') },
    { e: T('Ordena de más alto a más bajo: Aneto, Teide, Mulhacén.', 'Order from highest to lowest: Aneto, Teide, Mulhacén.', 'Ordena de més alt a més baix: Aneto, Teide, Mulhacén.'),
      s: T('Teide (3.715 m), Mulhacén (3.479 m) y Aneto (3.404 m).', 'Teide (3,715 m), Mulhacén (3,479 m) and Aneto (3,404 m).', 'Teide (3.715 m), Mulhacén (3.479 m) i Aneto (3.404 m).') },
    { e: T('¿Qué cordillera hace de frontera con Francia y cuál es su pico más alto?', 'Which range forms the border with France and what is its highest peak?', 'Quina serralada fa de frontera amb França i quin és el cim més alt?'),
      s: T('Los Pirineos; su pico más alto es el Aneto (3.404 m), en Huesca.', 'The Pyrenees; their highest peak is Aneto (3,404 m), in Huesca.', 'Els Pirineus; el cim més alt és l’Aneto (3.404 m), a Osca.') },
  ],
}

// ── LOS CLIMAS DE ESPAÑA ──────────────────────────────────────────────────

export const climaEspana = {
  metaTitle: L('Los climas de España: oceánico, mediterráneo, continentalizado, de montaña y canario — resumen y ejercicios', 'The climates of Spain: oceanic, Mediterranean, continental, mountain and Canary Islands — summary and practice questions', 'Els climes d’Espanya: oceànic, mediterrani, continentalitzat, de muntanya i canari — resum i exercicis'),
  metaDesc: L('Los climas de España con sus temperaturas, lluvias y zonas, los factores que los explican y cómo reconocer cada uno en un climograma. Con ejercicios resueltos.', 'The climates of Spain with their temperatures, rainfall and areas, the factors behind them and how to spot each one on a climate graph. With worked exercises.', 'Els climes d’Espanya amb les temperatures, les pluges i les zones, els factors que els expliquen i com reconèixer cadascun en un climograma. Amb exercicis resolts.'),
  resumen: L(
    ['España tiene climas muy distintos para su tamaño porque está entre dos mares, a medio camino entre Europa y África, y tiene un relieve alto con montañas que frenan la influencia del mar. El norte es lluvioso y suave; el interior, de inviernos fríos y veranos calurosos; las costas mediterráneas, de veranos secos y calurosos; y Canarias, templada todo el año.', 'Para clasificar un clima se miran dos elementos: la temperatura (media y diferencia entre el mes más cálido y el más frío, la amplitud térmica) y las precipitaciones (cuánto llueve al año y en qué meses). Los dos se ven de un vistazo en un climograma.'],
    ['Spain has very different climates for its size because it lies between two seas, halfway between Europe and Africa, and has high relief with mountains that hold back the influence of the sea. The north is rainy and mild; the interior has cold winters and hot summers; the Mediterranean coasts have dry, hot summers; and the Canary Islands are mild all year.', 'To classify a climate you look at two elements: temperature (the average and the difference between the warmest and coldest months, the temperature range) and precipitation (how much it rains in a year and in which months). Both can be seen at a glance on a climate graph.'],
    ['Espanya té climes molt diferents per a la seva mida perquè és entre dos mars, a mig camí entre Europa i l’Àfrica, i té un relleu alt amb muntanyes que frenen la influència del mar. El nord és plujós i suau; l’interior, d’hiverns freds i estius calorosos; les costes mediterrànies, d’estius secs i calorosos; i les Canàries, temperades tot l’any.', 'Per classificar un clima es miren dos elements: la temperatura (mitjana i diferència entre el mes més càlid i el més fred, l’amplitud tèrmica) i les precipitacions (quant plou a l’any i en quins mesos). Tots dos es veuen d’un cop d’ull en un climograma.'],
  ),
  puntosClave: L(
    ['Oceánico: norte peninsular; lluvias abundantes todo el año y temperaturas suaves.', 'Mediterráneo: costas del este y del sur y Baleares; veranos secos y calurosos e inviernos suaves.', 'Mediterráneo continentalizado: interior; inviernos fríos, veranos calurosos y pocas lluvias.', 'De montaña: en las cordilleras altas; frío y más precipitaciones, a menudo en forma de nieve.', 'Subtropical (canario): Canarias; temperaturas suaves todo el año y pocas lluvias.', 'El sureste (Almería, Murcia) es la zona más seca: clima mediterráneo árido o seco.'],
    ['Oceanic: the north of the peninsula; plenty of rain all year and mild temperatures.', 'Mediterranean: the east and south coasts and the Balearics; dry, hot summers and mild winters.', 'Continental Mediterranean: the interior; cold winters, hot summers and little rain.', 'Mountain: in the high ranges; cold, with more precipitation, often as snow.', 'Subtropical (Canary Islands): mild temperatures all year and little rain.', 'The south-east (Almería, Murcia) is the driest area: arid Mediterranean climate.'],
    ['Oceànic: nord peninsular; pluges abundants tot l’any i temperatures suaus.', 'Mediterrani: costes de l’est i del sud i Balears; estius secs i calorosos i hiverns suaus.', 'Mediterrani continentalitzat: interior; hiverns freds, estius calorosos i poques pluges.', 'De muntanya: a les serralades altes; fred i més precipitacions, sovint en forma de neu.', 'Subtropical (canari): Canàries; temperatures suaus tot l’any i poques pluges.', 'El sud-est (Almeria, Múrcia) és la zona més seca: clima mediterrani àrid o sec.'],
  ),
  secciones: [
    {
      titulo: L('Los climas, uno a uno', 'The climates one by one', 'Els climes, un per un'),
      tabla: {
        columnas: L(['Clima', 'Dónde', 'Temperaturas', 'Precipitaciones'], ['Climate', 'Where', 'Temperatures', 'Rainfall'], ['Clima', 'On', 'Temperatures', 'Precipitacions']),
        filas: [
          [L('Oceánico', 'Oceanic', 'Oceànic'), L('Galicia y la costa cantábrica', 'Galicia and the Cantabrian coast', 'Galícia i la costa cantàbrica'), L('suaves: inviernos templados, veranos frescos; poca amplitud', 'mild: gentle winters, cool summers; small range', 'suaus: hiverns temperats, estius frescos; poca amplitud'), L('abundantes (más de 1.000 mm) y repartidas por todo el año', 'plentiful (over 1,000 mm) and spread through the year', 'abundants (més de 1.000 mm) i repartides tot l’any')],
          [L('Mediterráneo', 'Mediterranean', 'Mediterrani'), L('costas del este y del sur, Baleares', 'east and south coasts, Balearics', 'costes de l’est i del sud, Balears'), L('inviernos suaves y veranos calurosos', 'mild winters and hot summers', 'hiverns suaus i estius calorosos'), L('escasas e irregulares; sequía en verano, lluvias en otoño y primavera', 'low and irregular; summer drought, rain in autumn and spring', 'escasses i irregulars; sequera a l’estiu, pluges a la tardor i la primavera')],
          [L('Mediterráneo continentalizado', 'Continental Mediterranean', 'Mediterrani continentalitzat'), L('el interior: las dos Mesetas y el valle del Ebro', 'the interior: both Mesetas and the Ebro valley', 'l’interior: les dues Mesetes i la vall de l’Ebre'), L('inviernos fríos y veranos calurosos: gran amplitud térmica', 'cold winters and hot summers: a large temperature range', 'hiverns freds i estius calorosos: gran amplitud tèrmica'), L('escasas, con sequía en verano', 'low, with summer drought', 'escasses, amb sequera a l’estiu')],
          [L('Mediterráneo árido (seco)', 'Arid Mediterranean', 'Mediterrani àrid (sec)'), L('el sureste: Almería, Murcia', 'the south-east: Almería, Murcia', 'el sud-est: Almeria, Múrcia'), L('cálidas casi todo el año', 'warm for most of the year', 'càlides gairebé tot l’any'), L('muy escasas (menos de 300 mm)', 'very low (under 300 mm)', 'molt escasses (menys de 300 mm)')],
          [L('De montaña', 'Mountain', 'De muntanya'), L('Pirineos, Cordillera Cantábrica, Sistema Central, Sierra Nevada…', 'Pyrenees, Cantabrian Mountains, Central System, Sierra Nevada…', 'Pirineus, Serralada Cantàbrica, Sistema Central, Sierra Nevada…'), L('frías: bajan con la altitud', 'cold: they fall with height', 'fredes: baixen amb l’altitud'), L('abundantes, a menudo en forma de nieve', 'plentiful, often as snow', 'abundants, sovint en forma de neu')],
          [L('Subtropical (canario)', 'Subtropical (Canary Islands)', 'Subtropical (canari)'), L('islas Canarias', 'Canary Islands', 'illes Canàries'), L('suaves todo el año: casi no hay invierno', 'mild all year: there is hardly any winter', 'suaus tot l’any: gairebé no hi ha hivern'), L('escasas, sobre todo en las islas orientales', 'low, especially on the eastern islands', 'escasses, sobretot a les illes orientals')],
        ],
      },
    },
    {
      titulo: L('Por qué cambia el clima de un sitio a otro', 'Why the climate changes from place to place', 'Per què canvia el clima d’un lloc a l’altre'),
      tabla: {
        columnas: L(['Factor', 'Cómo influye'], ['Factor', 'How it affects climate'], ['Factor', 'Com influeix']),
        filas: [
          [L('Latitud', 'Latitude', 'Latitud'), L('cuanto más al sur, más calor: Canarias está casi a la altura del Sáhara', 'the further south, the warmer: the Canaries are almost level with the Sahara', 'com més al sud, més calor: les Canàries són gairebé a l’altura del Sàhara')],
          [L('Distancia al mar', 'Distance from the sea', 'Distància al mar'), L('el mar suaviza las temperaturas; lejos de él, los inviernos son más fríos y los veranos más calurosos', 'the sea softens temperatures; far from it, winters are colder and summers hotter', 'el mar suavitza les temperatures; lluny d’ell, els hiverns són més freds i els estius més calorosos')],
          [L('Relieve', 'Relief', 'Relleu'), L('con la altitud baja la temperatura; las montañas costeras frenan la humedad del mar hacia el interior', 'temperature falls with height; coastal mountains block moist sea air from reaching the interior', 'amb l’altitud baixa la temperatura; les muntanyes costaneres frenen la humitat del mar cap a l’interior')],
          [L('Vientos y masas de aire', 'Winds and air masses', 'Vents i masses d’aire'), L('las borrascas del Atlántico traen lluvia al norte y al oeste; el anticiclón de las Azores trae el verano seco', 'Atlantic depressions bring rain to the north and west; the Azores high brings the dry summer', 'les borrasques de l’Atlàntic porten pluja al nord i a l’oest; l’anticicló de les Açores porta l’estiu sec')],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Qué es la amplitud térmica?', 'What is the temperature range?', 'Què és l’amplitud tèrmica?'),
      r: T('La diferencia entre la temperatura media del mes más cálido y la del más frío. Es pequeña en la costa (el mar suaviza) y grande en el interior: en Madrid supera los 18 °C, y en A Coruña ronda los 9 °C.', 'The difference between the average temperature of the warmest month and the coldest. It is small on the coast (the sea softens things) and large inland: in Madrid it is over 18 °C, while in A Coruña it is around 9 °C.', 'La diferència entre la temperatura mitjana del mes més càlid i la del més fred. És petita a la costa (el mar suavitza) i gran a l’interior: a Madrid supera els 18 °C, i a la Corunya ronda els 9 °C.') },
    { p: T('¿Por qué llueve tanto en el norte?', 'Why does it rain so much in the north?', 'Per què plou tant al nord?'),
      r: T('Porque recibe las borrascas que llegan del Atlántico y la Cordillera Cantábrica obliga al aire húmedo a subir, se enfría y descarga la lluvia antes de pasar a la Meseta.', 'Because it receives the depressions coming in from the Atlantic, and the Cantabrian Mountains force the moist air to rise, cool and drop its rain before it reaches the Meseta.', 'Perquè rep les borrasques que arriben de l’Atlàntic i la Serralada Cantàbrica obliga l’aire humit a pujar, es refreda i descarrega la pluja abans de passar a la Meseta.') },
  ],
  ejercicios: [
    { e: T('Una ciudad tiene inviernos de 5 °C, veranos de 25 °C y 400 mm de lluvia al año, casi nada en verano. ¿Qué clima tiene?', 'A city has winters of 5 °C, summers of 25 °C and 400 mm of rain a year, almost none in summer. What climate does it have?', 'Una ciutat té hiverns de 5 °C, estius de 25 °C i 400 mm de pluja a l’any, gairebé res a l’estiu. Quin clima té?'),
      s: T('Mediterráneo continentalizado: gran amplitud térmica (20 °C), pocas lluvias y sequía en verano. Es el clima del interior, como Madrid o Valladolid.', 'Continental Mediterranean: a large range (20 °C), little rain and a summer drought. It is the climate of the interior, like Madrid or Valladolid.', 'Mediterrani continentalitzat: gran amplitud tèrmica (20 °C), poques pluges i sequera a l’estiu. És el clima de l’interior, com Madrid o Valladolid.') },
    { e: T('¿Qué clima tiene Santander y por qué?', 'What climate does Santander have, and why?', 'Quin clima té Santander i per què?'),
      s: T('Oceánico: está en la costa cantábrica, recibe las borrascas atlánticas (llueve mucho todo el año) y el mar suaviza las temperaturas.', 'Oceanic: it is on the Cantabrian coast, gets the Atlantic depressions (lots of rain all year) and the sea keeps temperatures mild.', 'Oceànic: és a la costa cantàbrica, rep les borrasques atlàntiques (plou molt tot l’any) i el mar suavitza les temperatures.') },
    { e: T('Calcula la amplitud térmica si el mes más frío tiene 6 °C y el más cálido 26 °C.', 'Work out the temperature range if the coldest month is 6 °C and the warmest 26 °C.', 'Calcula l’amplitud tèrmica si el mes més fred té 6 °C i el més càlid 26 °C.'),
      s: T('26 − 6 = 20 °C. Es una amplitud grande, propia del interior.', '26 − 6 = 20 °C. That is a large range, typical of the interior.', '26 − 6 = 20 °C. És una amplitud gran, pròpia de l’interior.') },
    { e: T('¿Cuál es la zona más seca de España?', 'Which is the driest area of Spain?', 'Quina és la zona més seca d’Espanya?'),
      s: T('El sureste, sobre todo Almería y Murcia, con menos de 300 mm al año: allí está el desierto de Tabernas.', 'The south-east, especially Almería and Murcia, with under 300 mm a year: the Tabernas desert is there.', 'El sud-est, sobretot Almeria i Múrcia, amb menys de 300 mm a l’any: allà hi ha el desert de Tabernas.') },
  ],
}
