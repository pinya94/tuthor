// Contenido de estudio para las páginas de tema de matemáticas que ya existían
// (/estudiar/matematicas/fracciones, geometria, potencias, divisibilidad,
// funciones) y solo tenían un título de una palabra y las tarjetas de práctica.
// Son los temas con más búsquedas escolares del autocompletado de Google
// (nov-2026): «potencias y raíces 2 eso», «fracciones equivalentes
// ejercicios», «mcm y mcd ejercicios resueltos», «áreas y perímetros»,
// «funciones lineales ejercicios resueltos».
// Se fusiona en CONTENIDO_TEMA (clave = id de la página). Los títulos AÑADEN
// palabras a los de antes, no quitan ninguna.

const T = (es, en, ca) => ({ es, en, ca })
const L = T

const fracciones = {
  metaTitle: L('Fracciones: equivalentes, simplificar, comparar y operar (con ejemplos) — resumen y ejercicios', 'Fractions: equivalent fractions, simplifying, comparing and calculating — summary and practice questions', 'Fraccions: equivalents, simplificar, comparar i operar (amb exemples) — resum i exercicis'),
  metaDesc: L('Qué es una fracción, fracciones equivalentes, simplificar, comparar, sumar, restar, multiplicar y dividir fracciones, fracción de una cantidad y paso a decimal. Con ejercicios.', 'What a fraction is, equivalent fractions, simplifying, comparing, adding, subtracting, multiplying and dividing fractions, a fraction of an amount and converting to decimals.', 'Què és una fracció, fraccions equivalents, simplificar, comparar, sumar, restar, multiplicar i dividir fraccions, fracció d’una quantitat i pas a decimal. Amb exercicis.'),
  resumen: L(
    ['Una fracción representa partes de un todo: el denominador (abajo) dice en cuántas partes iguales se divide y el numerador (arriba), cuántas se toman. En 3/4 se divide en cuatro partes y se toman tres. Si el numerador es menor que el denominador, la fracción es propia (menor que 1); si es mayor, es impropia y se puede escribir como número mixto: 7/4 = 1 y 3/4.', 'Dos fracciones son equivalentes si representan la misma cantidad: 1/2 = 2/4 = 3/6. Se obtienen multiplicando o dividiendo el numerador y el denominador por el mismo número, y se comprueban con los productos cruzados (1 · 4 = 2 · 2). Simplificar es dividir los dos entre un divisor común hasta llegar a la fracción irreducible.'],
    ['A fraction represents parts of a whole: the denominator (bottom) says how many equal parts it is divided into and the numerator (top), how many are taken. In 3/4 it is divided into four parts and three are taken. If the numerator is smaller than the denominator, the fraction is proper (less than 1); if it is larger, it is improper and can be written as a mixed number: 7/4 = 1 and 3/4.', 'Two fractions are equivalent if they represent the same amount: 1/2 = 2/4 = 3/6. You get them by multiplying or dividing the numerator and denominator by the same number, and you check them by cross-multiplying (1 × 4 = 2 × 2). Simplifying means dividing both by a common factor until you reach the fraction in its simplest form.'],
    ['Una fracció representa parts d’un tot: el denominador (a baix) diu en quantes parts iguals es divideix i el numerador (a dalt), quantes se’n prenen. A 3/4 es divideix en quatre parts i se’n prenen tres. Si el numerador és menor que el denominador, la fracció és pròpia (menor que 1); si és més gran, és impròpia i es pot escriure com a nombre mixt: 7/4 = 1 i 3/4.', 'Dues fraccions són equivalents si representen la mateixa quantitat: 1/2 = 2/4 = 3/6. S’obtenen multiplicant o dividint el numerador i el denominador pel mateix nombre, i es comproven amb els productes creuats (1 · 4 = 2 · 2). Simplificar és dividir-los tots dos entre un divisor comú fins arribar a la fracció irreductible.'],
  ),
  puntosClave: L(
    ['Numerador: partes que se toman. Denominador: partes en que se divide.', 'Equivalentes: multiplicar o dividir arriba y abajo por el mismo número.', 'Simplificar: dividir entre el máximo común divisor.', 'Sumar y restar: con el mismo denominador (si no, se busca el mcm).', 'Multiplicar: numerador por numerador y denominador por denominador.', 'Dividir: multiplicar por la fracción inversa (en cruz).'],
    ['Numerator: parts taken. Denominator: parts the whole is divided into.', 'Equivalent: multiply or divide top and bottom by the same number.', 'Simplify: divide by the highest common factor.', 'Add and subtract: with the same denominator (if not, find the LCM).', 'Multiply: numerator times numerator and denominator times denominator.', 'Divide: multiply by the reciprocal (cross-multiply).'],
    ['Numerador: parts que es prenen. Denominador: parts en què es divideix.', 'Equivalents: multiplicar o dividir a dalt i a baix pel mateix nombre.', 'Simplificar: dividir entre el màxim comú divisor.', 'Sumar i restar: amb el mateix denominador (si no, es busca el mcm).', 'Multiplicar: numerador per numerador i denominador per denominador.', 'Dividir: multiplicar per la fracció inversa (en creu).'],
  ),
  secciones: [
    {
      titulo: L('Operaciones con fracciones', 'Calculating with fractions', 'Operacions amb fraccions'),
      tabla: {
        columnas: L(['Operación', 'Cómo se hace', 'Ejemplo'], ['Operation', 'How to do it', 'Example'], ['Operació', 'Com es fa', 'Exemple']),
        filas: [
          [L('Suma (mismo denominador)', 'Adding (same denominator)', 'Suma (mateix denominador)'), L('se suman los numeradores', 'add the numerators', 'se sumen els numeradors'), '2/7 + 3/7 = 5/7'],
          [L('Suma (distinto denominador)', 'Adding (different denominators)', 'Suma (denominador diferent)'), L('se pasan a común denominador con el mcm', 'change to a common denominator using the LCM', 'es passen a comú denominador amb el mcm'), '1/4 + 1/6 = 3/12 + 2/12 = 5/12'],
          [L('Resta', 'Subtracting', 'Resta'), L('igual que la suma, restando numeradores', 'like adding, subtracting the numerators', 'igual que la suma, restant numeradors'), '5/6 − 1/3 = 5/6 − 2/6 = 3/6 = 1/2'],
          [L('Multiplicación', 'Multiplying', 'Multiplicació'), L('en línea: arriba por arriba y abajo por abajo', 'straight across: top by top, bottom by bottom', 'en línia: a dalt per a dalt i a baix per a baix'), '2/3 · 4/5 = 8/15'],
          [L('División', 'Dividing', 'Divisió'), L('en cruz, o multiplicar por la inversa', 'cross-multiply, or multiply by the reciprocal', 'en creu, o multiplicar per la inversa'), '2/3 ÷ 4/5 = 2/3 · 5/4 = 10/12 = 5/6'],
          [L('Fracción de una cantidad', 'Fraction of an amount', 'Fracció d’una quantitat'), L('se divide entre el denominador y se multiplica por el numerador', 'divide by the denominator and multiply by the numerator', 'es divideix entre el denominador i es multiplica pel numerador'), '3/4 de 20 = 20 ÷ 4 · 3 = 15'],
          [L('Paso a decimal', 'Converting to a decimal', 'Pas a decimal'), L('se divide el numerador entre el denominador', 'divide the numerator by the denominator', 'es divideix el numerador entre el denominador'), L('3/4 = 3 ÷ 4 = 0,75', '3/4 = 3 ÷ 4 = 0.75', '3/4 = 3 ÷ 4 = 0,75')],
        ],
      },
    },
    {
      titulo: L('Cómo comparar fracciones', 'How to compare fractions', 'Com comparar fraccions'),
      lista: L(
        ['Mismo denominador: es mayor la de mayor numerador (5/8 > 3/8).', 'Mismo numerador: es mayor la de menor denominador (3/4 > 3/5: los trozos son más grandes).', 'Distintos los dos: se pasan a común denominador (2/3 y 3/4 → 8/12 y 9/12, así que 3/4 es mayor) o se pasan a decimal.'],
        ['Same denominator: the one with the larger numerator is bigger (5/8 > 3/8).', 'Same numerator: the one with the smaller denominator is bigger (3/4 > 3/5: the pieces are larger).', 'Both different: change to a common denominator (2/3 and 3/4 → 8/12 and 9/12, so 3/4 is bigger) or convert to decimals.'],
        ['Mateix denominador: és més gran la de numerador més gran (5/8 > 3/8).', 'Mateix numerador: és més gran la de denominador més petit (3/4 > 3/5: els trossos són més grans).', 'Diferents tots dos: es passen a comú denominador (2/3 i 3/4 → 8/12 i 9/12, així que 3/4 és més gran) o es passen a decimal.'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿Cómo sé si dos fracciones son equivalentes?', 'How do I know whether two fractions are equivalent?', 'Com sé si dues fraccions són equivalents?'),
      r: T('Multiplica en cruz: si los productos son iguales, lo son. 2/3 y 8/12: 2 · 12 = 24 y 3 · 8 = 24, así que son equivalentes.', 'Cross-multiply: if the products are equal, they are. 2/3 and 8/12: 2 × 12 = 24 and 3 × 8 = 24, so they are equivalent.', 'Multiplica en creu: si els productes són iguals, ho són. 2/3 i 8/12: 2 · 12 = 24 i 3 · 8 = 24, així que són equivalents.') },
    { p: T('¿Qué es una fracción irreducible?', 'What is a fraction in its simplest form?', 'Què és una fracció irreductible?'),
      r: T('La que ya no se puede simplificar porque numerador y denominador no tienen divisores comunes (salvo el 1): 3/4 es irreducible; 6/8 no, porque se simplifica a 3/4.', 'One that cannot be simplified any further because the numerator and denominator have no common factors (except 1): 3/4 is in its simplest form; 6/8 is not, as it simplifies to 3/4.', 'La que ja no es pot simplificar perquè numerador i denominador no tenen divisors comuns (llevat de l’1): 3/4 és irreductible; 6/8 no, perquè se simplifica a 3/4.') },
  ],
  ejercicios: [
    { e: T('Escribe dos fracciones equivalentes a 2/5.', 'Write two fractions equivalent to 2/5.', 'Escriu dues fraccions equivalents a 2/5.'), s: T('Por ejemplo 4/10 (×2) y 6/15 (×3).', 'For example 4/10 (×2) and 6/15 (×3).', 'Per exemple 4/10 (×2) i 6/15 (×3).') },
    { e: T('Simplifica hasta la fracción irreducible: 18/24.', 'Simplify to its simplest form: 18/24.', 'Simplifica fins a la fracció irreductible: 18/24.'), s: T('El mcd de 18 y 24 es 6: 18/24 = 3/4.', 'The HCF of 18 and 24 is 6: 18/24 = 3/4.', 'El mcd de 18 i 24 és 6: 18/24 = 3/4.') },
    { e: T('Calcula 1/3 + 1/4.', 'Work out 1/3 + 1/4.', 'Calcula 1/3 + 1/4.'), s: T('mcm(3, 4) = 12: 4/12 + 3/12 = 7/12.', 'LCM(3, 4) = 12: 4/12 + 3/12 = 7/12.', 'mcm(3, 4) = 12: 4/12 + 3/12 = 7/12.') },
    { e: T('Calcula 3/4 · 2/9 y simplifica.', 'Work out 3/4 × 2/9 and simplify.', 'Calcula 3/4 · 2/9 i simplifica.'), s: '6/36 = 1/6' },
    { e: T('Calcula 5/6 ÷ 2/3.', 'Work out 5/6 ÷ 2/3.', 'Calcula 5/6 ÷ 2/3.'), s: T('En cruz: (5 · 3)/(6 · 2) = 15/12 = 5/4.', 'Cross-multiplying: (5 × 3)/(6 × 2) = 15/12 = 5/4.', 'En creu: (5 · 3)/(6 · 2) = 15/12 = 5/4.') },
    { e: T('En una clase de 30 alumnos, 2/5 van en bici. ¿Cuántos son?', 'In a class of 30 pupils, 2/5 cycle to school. How many is that?', 'En una classe de 30 alumnes, 2/5 van en bici. Quants són?'), s: T('30 ÷ 5 · 2 = 12 alumnos.', '30 ÷ 5 × 2 = 12 pupils.', '30 ÷ 5 · 2 = 12 alumnes.') },
    { e: T('Ordena de menor a mayor: 1/2, 2/3, 3/5.', 'Order from smallest to largest: 1/2, 2/3, 3/5.', 'Ordena de petit a gran: 1/2, 2/3, 3/5.'), s: T('Con denominador 30: 15/30, 20/30 y 18/30. Orden: 1/2 < 3/5 < 2/3.', 'With denominator 30: 15/30, 20/30 and 18/30. Order: 1/2 < 3/5 < 2/3.', 'Amb denominador 30: 15/30, 20/30 i 18/30. Ordre: 1/2 < 3/5 < 2/3.') },
  ],
}

const geometria = {
  metaTitle: L('Geometría: áreas y perímetros de figuras planas, fórmulas y ejemplos (con tabla) — resumen y ejercicios', 'Geometry: areas and perimeters of flat shapes, formulas and examples (table) — summary and practice questions', 'Geometria: àrees i perímetres de figures planes, fórmules i exemples (amb taula) — resum i exercicis'),
  metaDesc: L('Fórmulas del área y el perímetro del cuadrado, rectángulo, triángulo, rombo, trapecio, polígonos regulares y círculo, con ejemplos, ángulos del triángulo y ejercicios resueltos.', 'Area and perimeter formulas for squares, rectangles, triangles, rhombuses, trapeziums, regular polygons and circles, with examples, triangle angles and solved exercises.', 'Fórmules de l’àrea i el perímetre del quadrat, rectangle, triangle, rombe, trapezi, polígons regulars i cercle, amb exemples, angles del triangle i exercicis resolts.'),
  resumen: L(
    ['El perímetro es la longitud del borde de una figura: se calcula sumando todos sus lados y se mide en unidades de longitud (cm, m). El área es la superficie que ocupa por dentro y se mide en unidades cuadradas (cm², m²). Una misma figura tiene las dos medidas, y no hay que confundirlas: para vallar un huerto se necesita el perímetro; para sembrarlo, el área.', 'Cada figura tiene su fórmula de área, pero casi todas salen del rectángulo (base por altura): el triángulo es la mitad de un rectángulo, el romboide es un rectángulo con una esquina recolocada y el trapecio es la media de sus dos bases por la altura. El círculo es la excepción: su área es π · r².'],
    ['The perimeter is the length of a shape’s edge: you add up all its sides, and it is measured in units of length (cm, m). The area is the surface it covers inside and is measured in square units (cm², m²). Every shape has both measures, and they must not be confused: to fence a vegetable patch you need the perimeter; to sow it, the area.', 'Each shape has its own area formula, but almost all come from the rectangle (base times height): a triangle is half a rectangle, a parallelogram is a rectangle with one corner moved and a trapezium is the average of its two bases times the height. The circle is the exception: its area is π × r².'],
    ['El perímetre és la longitud de la vora d’una figura: es calcula sumant tots els costats i es mesura en unitats de longitud (cm, m). L’àrea és la superfície que ocupa per dins i es mesura en unitats quadrades (cm², m²). Una mateixa figura té totes dues mesures, i no s’han de confondre: per tancar un hort cal el perímetre; per sembrar-lo, l’àrea.', 'Cada figura té la seva fórmula d’àrea, però gairebé totes surten del rectangle (base per altura): el triangle és la meitat d’un rectangle, el romboide és un rectangle amb una cantonada recol·locada i el trapezi és la mitjana de les dues bases per l’altura. El cercle és l’excepció: la seva àrea és π · r².'],
  ),
  puntosClave: L(
    ['Perímetro: suma de los lados (cm, m).', 'Área: superficie de dentro (cm², m²).', 'Rectángulo: A = b · h. Triángulo: A = b · h / 2.', 'Círculo: longitud L = 2 · π · r y área A = π · r² (π ≈ 3,14).', 'Los ángulos de un triángulo suman 180°; los de un cuadrilátero, 360°.', 'La altura siempre es perpendicular a la base.'],
    ['Perimeter: the sum of the sides (cm, m).', 'Area: the surface inside (cm², m²).', 'Rectangle: A = b × h. Triangle: A = b × h ÷ 2.', 'Circle: circumference C = 2 × π × r and area A = π × r² (π ≈ 3.14).', 'The angles of a triangle add up to 180°; those of a quadrilateral, 360°.', 'The height is always perpendicular to the base.'],
    ['Perímetre: suma dels costats (cm, m).', 'Àrea: superfície de dins (cm², m²).', 'Rectangle: A = b · h. Triangle: A = b · h / 2.', 'Cercle: longitud L = 2 · π · r i àrea A = π · r² (π ≈ 3,14).', 'Els angles d’un triangle sumen 180°; els d’un quadrilàter, 360°.', 'L’altura sempre és perpendicular a la base.'],
  ),
  secciones: [
    {
      titulo: L('Fórmulas de áreas y perímetros', 'Area and perimeter formulas', 'Fórmules d’àrees i perímetres'),
      tabla: {
        columnas: L(['Figura', 'Perímetro', 'Área', 'Ejemplo'], ['Shape', 'Perimeter', 'Area', 'Example'], ['Figura', 'Perímetre', 'Àrea', 'Exemple']),
        filas: [
          [L('Cuadrado (lado l)', 'Square (side l)', 'Quadrat (costat l)'), 'P = 4 · l', 'A = l²', L('l = 5 cm → P = 20 cm, A = 25 cm²', 'l = 5 cm → P = 20 cm, A = 25 cm²', 'l = 5 cm → P = 20 cm, A = 25 cm²')],
          [L('Rectángulo (base b, altura h)', 'Rectangle (base b, height h)', 'Rectangle (base b, altura h)'), 'P = 2b + 2h', 'A = b · h', L('8 × 3 cm → P = 22 cm, A = 24 cm²', '8 × 3 cm → P = 22 cm, A = 24 cm²', '8 × 3 cm → P = 22 cm, A = 24 cm²')],
          [L('Triángulo', 'Triangle', 'Triangle'), L('suma de los 3 lados', 'sum of the 3 sides', 'suma dels 3 costats'), 'A = b · h / 2', L('b = 6, h = 4 → A = 12 cm²', 'b = 6, h = 4 → A = 12 cm²', 'b = 6, h = 4 → A = 12 cm²')],
          [L('Rombo (diagonales D y d)', 'Rhombus (diagonals D and d)', 'Rombe (diagonals D i d)'), 'P = 4 · l', 'A = D · d / 2', L('D = 10, d = 6 → A = 30 cm²', 'D = 10, d = 6 → A = 30 cm²', 'D = 10, d = 6 → A = 30 cm²')],
          [L('Romboide', 'Parallelogram', 'Romboide'), L('suma de los lados', 'sum of the sides', 'suma dels costats'), 'A = b · h', L('b = 7, h = 3 → A = 21 cm²', 'b = 7, h = 3 → A = 21 cm²', 'b = 7, h = 3 → A = 21 cm²')],
          [L('Trapecio (bases B y b)', 'Trapezium (bases B and b)', 'Trapezi (bases B i b)'), L('suma de los lados', 'sum of the sides', 'suma dels costats'), 'A = (B + b) · h / 2', L('B = 9, b = 5, h = 4 → A = 28 cm²', 'B = 9, b = 5, h = 4 → A = 28 cm²', 'B = 9, b = 5, h = 4 → A = 28 cm²')],
          [L('Polígono regular', 'Regular polygon', 'Polígon regular'), L('n · lado', 'n × side', 'n · costat'), L('A = P · apotema / 2', 'A = P × apothem ÷ 2', 'A = P · apotema / 2'), L('hexágono de lado 4 y apotema 3,5 → A = 24 · 3,5 / 2 = 42 cm²', 'hexagon, side 4, apothem 3.5 → A = 24 × 3.5 ÷ 2 = 42 cm²', 'hexàgon de costat 4 i apotema 3,5 → A = 24 · 3,5 / 2 = 42 cm²')],
          [L('Círculo (radio r)', 'Circle (radius r)', 'Cercle (radi r)'), 'L = 2 · π · r', 'A = π · r²', L('r = 10 → L ≈ 62,8 cm, A ≈ 314 cm²', 'r = 10 → C ≈ 62.8 cm, A ≈ 314 cm²', 'r = 10 → L ≈ 62,8 cm, A ≈ 314 cm²')],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Qué diferencia hay entre área y perímetro?', 'What is the difference between area and perimeter?', 'Quina diferència hi ha entre àrea i perímetre?'),
      r: T('El perímetro mide el contorno (una longitud, en cm o m) y el área mide la superficie de dentro (en cm² o m²). Un cuadrado de 4 cm de lado tiene 16 cm de perímetro y 16 cm² de área: el número coincide, pero no es lo mismo.', 'The perimeter measures the outline (a length, in cm or m) and the area measures the surface inside (in cm² or m²). A square with 4 cm sides has a perimeter of 16 cm and an area of 16 cm²: the number is the same, but they are different things.', 'El perímetre mesura el contorn (una longitud, en cm o m) i l’àrea mesura la superfície de dins (en cm² o m²). Un quadrat de 4 cm de costat té 16 cm de perímetre i 16 cm² d’àrea: el nombre coincideix, però no és el mateix.') },
    { p: T('¿Qué es la apotema?', 'What is the apothem?', 'Què és l’apotema?'),
      r: T('El segmento que va del centro de un polígono regular al punto medio de un lado, perpendicular a él. Se usa en la fórmula del área: A = perímetro · apotema / 2.', 'The line segment from the centre of a regular polygon to the midpoint of a side, at right angles to it. It is used in the area formula: A = perimeter × apothem ÷ 2.', 'El segment que va del centre d’un polígon regular al punt mitjà d’un costat, perpendicular a ell. S’usa a la fórmula de l’àrea: A = perímetre · apotema / 2.') },
  ],
  ejercicios: [
    { e: T('Un rectángulo mide 12 cm de base y 5 cm de altura. Calcula su perímetro y su área.', 'A rectangle has a base of 12 cm and a height of 5 cm. Find its perimeter and area.', 'Un rectangle fa 12 cm de base i 5 cm d’altura. Calcula’n el perímetre i l’àrea.'), s: 'P = 2 · 12 + 2 · 5 = 34 cm;  A = 12 · 5 = 60 cm²' },
    { e: T('Calcula el área de un triángulo de 10 cm de base y 7 cm de altura.', 'Find the area of a triangle with a 10 cm base and a 7 cm height.', 'Calcula l’àrea d’un triangle de 10 cm de base i 7 cm d’altura.'), s: 'A = 10 · 7 / 2 = 35 cm²' },
    { e: T('Un círculo tiene 5 m de radio. ¿Cuánto mide su circunferencia y cuál es su área? (π ≈ 3,14)', 'A circle has a radius of 5 m. How long is its circumference and what is its area? (π ≈ 3.14)', 'Un cercle té 5 m de radi. Quant fa la circumferència i quina és l’àrea? (π ≈ 3,14)'), s: T('L = 2 · 3,14 · 5 = 31,4 m;  A = 3,14 · 25 = 78,5 m²', 'C = 2 × 3.14 × 5 = 31.4 m;  A = 3.14 × 25 = 78.5 m²', 'L = 2 · 3,14 · 5 = 31,4 m;  A = 3,14 · 25 = 78,5 m²') },
    { e: T('Un trapecio tiene bases de 8 y 12 cm y una altura de 5 cm. ¿Cuál es su área?', 'A trapezium has bases of 8 and 12 cm and a height of 5 cm. What is its area?', 'Un trapezi té bases de 8 i 12 cm i una altura de 5 cm. Quina és l’àrea?'), s: 'A = (12 + 8) · 5 / 2 = 50 cm²' },
    { e: T('Dos ángulos de un triángulo miden 50° y 60°. ¿Cuánto mide el tercero?', 'Two angles of a triangle are 50° and 60°. What is the third?', 'Dos angles d’un triangle fan 50° i 60°. Quant fa el tercer?'), s: '180° − 50° − 60° = 70°' },
    { e: T('Se quiere vallar un huerto cuadrado de 9 m de lado y sembrarlo de césped. ¿Cuántos metros de valla y cuántos m² de césped hacen falta?', 'A square vegetable patch with 9 m sides is to be fenced and turfed. How many metres of fence and how many m² of turf are needed?', 'Es vol tancar un hort quadrat de 9 m de costat i sembrar-lo de gespa. Quants metres de tanca i quants m² de gespa calen?'), s: T('Valla = perímetro = 36 m. Césped = área = 81 m².', 'Fence = perimeter = 36 m. Turf = area = 81 m².', 'Tanca = perímetre = 36 m. Gespa = àrea = 81 m².') },
  ],
}

const potencias = {
  metaTitle: L('Potencias y raíces: propiedades, raíz cuadrada y notación científica — resumen y ejercicios', 'Powers and roots: index laws, square roots and scientific notation — summary and practice questions', 'Potències i arrels: propietats, arrel quadrada i notació científica — resum i exercicis'),
  metaDesc: L('Qué es una potencia, sus propiedades (producto, cociente, potencia de potencia, exponente 0 y negativo), raíces cuadradas exactas y aproximadas y notación científica.', 'What a power is, the index laws (product, quotient, power of a power, zero and negative indices), exact and approximate square roots and scientific notation. With exercises.', 'Què és una potència, les propietats (producte, quocient, potència de potència, exponent 0 i negatiu), arrels quadrades exactes i aproximades i notació científica. Amb exercicis.'),
  resumen: L(
    ['Una potencia es una multiplicación de un número por sí mismo varias veces: en 2⁵ = 2 · 2 · 2 · 2 · 2 = 32, el 2 es la base y el 5 el exponente, que dice cuántas veces se multiplica. Al cuadrado (exponente 2) y al cubo (exponente 3) son las más habituales.', 'La raíz cuadrada es la operación inversa del cuadrado: √49 = 7 porque 7² = 49. Si el número no es un cuadrado perfecto, la raíz no es exacta y se aproxima: √50 está entre 7 y 8. Las potencias de 10 sirven para escribir números muy grandes o muy pequeños en notación científica: 3.000.000 = 3 · 10⁶.'],
    ['A power is a number multiplied by itself several times: in 2⁵ = 2 × 2 × 2 × 2 × 2 = 32, 2 is the base and 5 the index (exponent), which says how many times it is multiplied. Squared (index 2) and cubed (index 3) are the most common.', 'The square root is the inverse of squaring: √49 = 7 because 7² = 49. If the number is not a perfect square, the root is not exact and is approximated: √50 lies between 7 and 8. Powers of 10 are used to write very large or very small numbers in scientific notation: 3,000,000 = 3 × 10⁶.'],
    ['Una potència és una multiplicació d’un nombre per ell mateix diverses vegades: a 2⁵ = 2 · 2 · 2 · 2 · 2 = 32, el 2 és la base i el 5 l’exponent, que diu quantes vegades es multiplica. Al quadrat (exponent 2) i al cub (exponent 3) són les més habituals.', 'L’arrel quadrada és l’operació inversa del quadrat: √49 = 7 perquè 7² = 49. Si el nombre no és un quadrat perfecte, l’arrel no és exacta i s’aproxima: √50 és entre 7 i 8. Les potències de 10 serveixen per escriure nombres molt grans o molt petits en notació científica: 3.000.000 = 3 · 10⁶.'],
  ),
  puntosClave: L(
    ['aⁿ = a · a · … · a (n veces).', 'Misma base: al multiplicar se suman los exponentes; al dividir, se restan.', 'Potencia de una potencia: se multiplican los exponentes.', 'a⁰ = 1 y a⁻ⁿ = 1/aⁿ.', '√ es la inversa del cuadrado: √81 = 9 porque 9² = 81.', 'Notación científica: a · 10ⁿ con 1 ≤ a < 10.'],
    ['aⁿ = a × a × … × a (n times).', 'Same base: when multiplying, add the indices; when dividing, subtract them.', 'Power of a power: multiply the indices.', 'a⁰ = 1 and a⁻ⁿ = 1/aⁿ.', '√ is the inverse of squaring: √81 = 9 because 9² = 81.', 'Scientific notation: a × 10ⁿ with 1 ≤ a < 10.'],
    ['aⁿ = a · a · … · a (n vegades).', 'Mateixa base: en multiplicar se sumen els exponents; en dividir, es resten.', 'Potència d’una potència: es multipliquen els exponents.', 'a⁰ = 1 i a⁻ⁿ = 1/aⁿ.', '√ és la inversa del quadrat: √81 = 9 perquè 9² = 81.', 'Notació científica: a · 10ⁿ amb 1 ≤ a < 10.'],
  ),
  secciones: [
    {
      titulo: L('Propiedades de las potencias', 'Index laws', 'Propietats de les potències'),
      tabla: {
        columnas: L(['Propiedad', 'Regla', 'Ejemplo'], ['Law', 'Rule', 'Example'], ['Propietat', 'Regla', 'Exemple']),
        filas: [
          [L('Producto de misma base', 'Product, same base', 'Producte de mateixa base'), 'aᵐ · aⁿ = aᵐ⁺ⁿ', '2³ · 2⁴ = 2⁷ = 128'],
          [L('Cociente de misma base', 'Quotient, same base', 'Quocient de mateixa base'), 'aᵐ ÷ aⁿ = aᵐ⁻ⁿ', '5⁶ ÷ 5⁴ = 5² = 25'],
          [L('Potencia de una potencia', 'Power of a power', 'Potència d’una potència'), '(aᵐ)ⁿ = aᵐ·ⁿ', '(3²)³ = 3⁶ = 729'],
          [L('Producto con el mismo exponente', 'Product, same index', 'Producte amb el mateix exponent'), 'aⁿ · bⁿ = (a · b)ⁿ', '2³ · 5³ = 10³ = 1000'],
          [L('Exponente 0', 'Zero index', 'Exponent 0'), 'a⁰ = 1', '7⁰ = 1'],
          [L('Exponente negativo', 'Negative index', 'Exponent negatiu'), 'a⁻ⁿ = 1 / aⁿ', '2⁻³ = 1/8'],
        ],
      },
      lista: L(
        ['Ojo con el signo: (−2)⁴ = 16 (exponente par, positivo) y (−2)³ = −8 (exponente impar, negativo). Y no es lo mismo −2⁴ = −16, porque ahí el signo no está elevado.', 'No hay regla para sumar potencias: 2³ + 2² = 8 + 4 = 12, no 2⁵.'],
        ['Watch the sign: (−2)⁴ = 16 (even index, positive) and (−2)³ = −8 (odd index, negative). And −2⁴ = −16 is different, because there the sign is not raised to the power.', 'There is no rule for adding powers: 2³ + 2² = 8 + 4 = 12, not 2⁵.'],
        ['Compte amb el signe: (−2)⁴ = 16 (exponent parell, positiu) i (−2)³ = −8 (exponent senar, negatiu). I no és el mateix −2⁴ = −16, perquè aquí el signe no està elevat.', 'No hi ha regla per sumar potències: 2³ + 2² = 8 + 4 = 12, no 2⁵.'],
      ),
    },
    {
      titulo: L('Cuadrados perfectos y raíces cuadradas', 'Perfect squares and square roots', 'Quadrats perfectes i arrels quadrades'),
      tabla: {
        columnas: L(['n', 'n²', '√'], ['n', 'n²', '√'], ['n', 'n²', '√']),
        filas: Array.from({ length: 12 }, (_, i) => [String(i + 4), String((i + 4) ** 2), `√${(i + 4) ** 2} = ${i + 4}`]),
      },
    },
  ],
  preguntas: [
    { p: T('¿Cómo se calcula una raíz cuadrada que no es exacta?', 'How do you work out a square root that is not exact?', 'Com es calcula una arrel quadrada que no és exacta?'),
      r: T('Se busca entre qué cuadrados perfectos está el número: √50 está entre √49 = 7 y √64 = 8, y muy cerca de 7 (≈ 7,07). Para más precisión se usa la calculadora o el algoritmo de la raíz.', 'Find which perfect squares the number lies between: √50 is between √49 = 7 and √64 = 8, and very close to 7 (≈ 7.07). For more precision, use a calculator or the long square-root method.', 'Es busca entre quins quadrats perfectes hi ha el nombre: √50 és entre √49 = 7 i √64 = 8, i molt a prop de 7 (≈ 7,07). Per a més precisió es fa servir la calculadora o l’algoritme de l’arrel.') },
    { p: T('¿Por qué cualquier número elevado a 0 da 1?', 'Why does any number to the power of 0 equal 1?', 'Per què qualsevol nombre elevat a 0 dona 1?'),
      r: T('Por la regla del cociente: 5³ ÷ 5³ = 5⁰, y cualquier número entre sí mismo da 1. (La excepción es 0⁰, que no está definido.)', 'Because of the quotient law: 5³ ÷ 5³ = 5⁰, and any number divided by itself is 1. (The exception is 0⁰, which is undefined.)', 'Per la regla del quocient: 5³ ÷ 5³ = 5⁰, i qualsevol nombre entre ell mateix dona 1. (L’excepció és 0⁰, que no està definit.)') },
  ],
  ejercicios: [
    { e: T('Calcula: 3⁴, (−5)², (−2)⁵ y 10⁰.', 'Work out: 3⁴, (−5)², (−2)⁵ and 10⁰.', 'Calcula: 3⁴, (−5)², (−2)⁵ i 10⁰.'), s: '81, 25, −32, 1' },
    { e: T('Expresa como una sola potencia: 2³ · 2⁵, 7⁸ ÷ 7³ y (4²)³.', 'Write as a single power: 2³ × 2⁵, 7⁸ ÷ 7³ and (4²)³.', 'Expressa com una sola potència: 2³ · 2⁵, 7⁸ ÷ 7³ i (4²)³.'), s: '2⁸, 7⁵, 4⁶' },
    { e: T('Calcula √144 y √225. ¿Entre qué dos enteros está √30?', 'Work out √144 and √225. Between which two whole numbers does √30 lie?', 'Calcula √144 i √225. Entre quins dos enters és √30?'), s: T('12 y 15. √30 está entre 5 y 6 (25 < 30 < 36).', '12 and 15. √30 is between 5 and 6 (25 < 30 < 36).', '12 i 15. √30 és entre 5 i 6 (25 < 30 < 36).') },
    { e: T('Escribe en notación científica: 45.000.000 y 0,0006.', 'Write in scientific notation: 45,000,000 and 0.0006.', 'Escriu en notació científica: 45.000.000 i 0,0006.'), s: T('4,5 · 10⁷ y 6 · 10⁻⁴.', '4.5 × 10⁷ and 6 × 10⁻⁴.', '4,5 · 10⁷ i 6 · 10⁻⁴.') },
    { e: T('Calcula 2⁻² y expresa 1/1000 como potencia de 10.', 'Work out 2⁻² and write 1/1000 as a power of 10.', 'Calcula 2⁻² i expressa 1/1000 com a potència de 10.'), s: T('2⁻² = 1/4 = 0,25.  1/1000 = 10⁻³.', '2⁻² = 1/4 = 0.25.  1/1000 = 10⁻³.', '2⁻² = 1/4 = 0,25.  1/1000 = 10⁻³.') },
  ],
}

const divisibilidad = {
  metaTitle: L('Divisibilidad: múltiplos, divisores, números primos, mcm y mcd — resumen y ejercicios resueltos', 'Divisibility: multiples, factors, prime numbers, LCM and HCF — summary and solved exercises', 'Divisibilitat: múltiples, divisors, nombres primers, mcm i mcd — resum i exercicis resolts'),
  metaDesc: L('Múltiplos y divisores, criterios de divisibilidad, números primos, descomposición en factores primos y cómo calcular el mcm y el mcd, con problemas resueltos.', 'Multiples and factors, divisibility rules, prime numbers, prime factorisation and how to find the LCM and HCF, with solved problems.', 'Múltiples i divisors, criteris de divisibilitat, nombres primers, descomposició en factors primers i com calcular el mcm i el mcd, amb problemes resolts.'),
  resumen: L(
    ['Un número es múltiplo de otro si lo contiene un número exacto de veces (12 es múltiplo de 3), y entonces el segundo es divisor del primero (3 es divisor de 12). Los múltiplos de un número son infinitos; sus divisores, no. Un número primo solo tiene dos divisores, el 1 y él mismo (2, 3, 5, 7, 11…); los demás se llaman compuestos.', 'Todo número compuesto se puede descomponer en un producto de factores primos: 60 = 2² · 3 · 5. Con esa descomposición se calculan el mínimo común múltiplo (mcm), el menor múltiplo que comparten dos números, y el máximo común divisor (mcd), el mayor número que divide a los dos.'],
    ['A number is a multiple of another if it contains it an exact number of times (12 is a multiple of 3), and then the second is a factor (divisor) of the first (3 is a factor of 12). A number has infinitely many multiples but only a few factors. A prime number has just two factors, 1 and itself (2, 3, 5, 7, 11…); the rest are called composite.', 'Every composite number can be broken down into a product of prime factors: 60 = 2² × 3 × 5. With that factorisation you find the lowest common multiple (LCM), the smallest multiple two numbers share, and the highest common factor (HCF), the largest number that divides both.'],
    ['Un nombre és múltiple d’un altre si el conté un nombre exacte de vegades (12 és múltiple de 3), i aleshores el segon és divisor del primer (3 és divisor de 12). Els múltiples d’un nombre són infinits; els divisors, no. Un nombre primer només té dos divisors, l’1 i ell mateix (2, 3, 5, 7, 11…); els altres s’anomenen compostos.', 'Tot nombre compost es pot descompondre en un producte de factors primers: 60 = 2² · 3 · 5. Amb aquesta descomposició es calculen el mínim comú múltiple (mcm), el múltiple més petit que comparteixen dos nombres, i el màxim comú divisor (mcd), el nombre més gran que divideix tots dos.'],
  ),
  puntosClave: L(
    ['Múltiplo: resultado de multiplicar (12 es múltiplo de 3). Divisor: divide exacto (3 es divisor de 12).', 'Primo: solo divisible entre 1 y él mismo. El 1 no es primo.', 'mcd: factores comunes con el menor exponente.', 'mcm: factores comunes y no comunes con el mayor exponente.', 'Problemas de «coinciden de nuevo»: mcm. De «repartir en grupos lo más grandes posible»: mcd.', 'mcd(a, b) · mcm(a, b) = a · b.'],
    ['Multiple: the result of multiplying (12 is a multiple of 3). Factor: divides exactly (3 is a factor of 12).', 'Prime: divisible only by 1 and itself. 1 is not prime.', 'HCF: common factors with the smallest index.', 'LCM: common and non-common factors with the largest index.', '«When do they coincide again» problems: LCM. «Split into the largest possible groups»: HCF.', 'HCF(a, b) × LCM(a, b) = a × b.'],
    ['Múltiple: resultat de multiplicar (12 és múltiple de 3). Divisor: divideix exactament (3 és divisor de 12).', 'Primer: només divisible entre 1 i ell mateix. L’1 no és primer.', 'mcd: factors comuns amb l’exponent més petit.', 'mcm: factors comuns i no comuns amb l’exponent més gran.', 'Problemes de «tornen a coincidir»: mcm. De «repartir en grups tan grans com es pugui»: mcd.', 'mcd(a, b) · mcm(a, b) = a · b.'],
  ),
  secciones: [
    {
      titulo: L('Criterios de divisibilidad', 'Divisibility rules', 'Criteris de divisibilitat'),
      tabla: {
        columnas: L(['Entre', 'Regla', 'Ejemplo'], ['By', 'Rule', 'Example'], ['Entre', 'Regla', 'Exemple']),
        filas: [
          ['2', L('acaba en cifra par (0, 2, 4, 6, 8)', 'it ends in an even digit (0, 2, 4, 6, 8)', 'acaba en xifra parella (0, 2, 4, 6, 8)'), '348'],
          ['3', L('la suma de sus cifras es múltiplo de 3', 'its digits add up to a multiple of 3', 'la suma de les xifres és múltiple de 3'), L('252 → 2 + 5 + 2 = 9', '252 → 2 + 5 + 2 = 9', '252 → 2 + 5 + 2 = 9')],
          ['5', L('acaba en 0 o en 5', 'it ends in 0 or 5', 'acaba en 0 o en 5'), '735'],
          ['9', L('la suma de sus cifras es múltiplo de 9', 'its digits add up to a multiple of 9', 'la suma de les xifres és múltiple de 9'), L('729 → 7 + 2 + 9 = 18', '729 → 7 + 2 + 9 = 18', '729 → 7 + 2 + 9 = 18')],
          ['10', L('acaba en 0', 'it ends in 0', 'acaba en 0'), '1.230'],
          ['11', L('la diferencia entre la suma de las cifras de lugar par y de lugar impar es 0 o múltiplo de 11', 'the difference between the sums of the digits in odd and even places is 0 or a multiple of 11', 'la diferència entre la suma de les xifres de lloc parell i de lloc senar és 0 o múltiple d’11'), L('2.574 → (2 + 7) − (5 + 4) = 0', '2,574 → (2 + 7) − (5 + 4) = 0', '2.574 → (2 + 7) − (5 + 4) = 0')],
        ],
      },
      lista: L(
        ['Números primos menores que 50: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43 y 47.'],
        ['Prime numbers below 50: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43 and 47.'],
        ['Nombres primers menors que 50: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43 i 47.'],
      ),
    },
    {
      titulo: L('Cómo calcular el mcm y el mcd: 12 y 18', 'How to find the LCM and HCF: 12 and 18', 'Com calcular el mcm i el mcd: 12 i 18'),
      tabla: {
        columnas: L(['Paso', 'Qué se hace', 'Resultado'], ['Step', 'What to do', 'Result'], ['Pas', 'Què es fa', 'Resultat']),
        filas: [
          ['1', L('descomponer en factores primos', 'write as a product of primes', 'descompondre en factors primers'), '12 = 2² · 3;  18 = 2 · 3²'],
          ['2', L('mcd: solo los comunes, con el menor exponente', 'HCF: only the common ones, with the smallest index', 'mcd: només els comuns, amb l’exponent més petit'), 'mcd = 2 · 3 = 6'],
          ['3', L('mcm: comunes y no comunes, con el mayor exponente', 'LCM: common and non-common, with the largest index', 'mcm: comuns i no comuns, amb l’exponent més gran'), 'mcm = 2² · 3² = 36'],
          ['4', L('comprobación', 'check', 'comprovació'), '6 · 36 = 216 = 12 · 18'],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿El 1 es un número primo?', 'Is 1 a prime number?', 'L’1 és un nombre primer?'),
      r: T('No. Un primo tiene exactamente dos divisores distintos, y el 1 solo tiene uno. El primer primo es el 2, que además es el único primo par.', 'No. A prime has exactly two different factors, and 1 has only one. The first prime is 2, which is also the only even prime.', 'No. Un primer té exactament dos divisors diferents, i l’1 només en té un. El primer primer és el 2, que a més és l’únic primer parell.') },
    { p: T('¿Cuándo uso el mcm y cuándo el mcd en un problema?', 'When do I use the LCM and when the HCF in a problem?', 'Quan faig servir el mcm i quan el mcd en un problema?'),
      r: T('El mcm, cuando algo se repite y se busca cuándo vuelve a coincidir (autobuses, alarmas, vueltas). El mcd, cuando se reparte en partes iguales lo más grandes posible sin que sobre nada (cortar cintas, hacer lotes).', 'The LCM, when things repeat and you want to know when they coincide again (buses, alarms, laps). The HCF, when you split into equal parts that are as large as possible with nothing left over (cutting ribbons, making packs).', 'El mcm, quan alguna cosa es repeteix i es busca quan torna a coincidir (autobusos, alarmes, voltes). El mcd, quan es reparteix en parts iguals tan grans com es pugui sense que en sobri res (tallar cintes, fer lots).') },
  ],
  ejercicios: [
    { e: T('Descompón en factores primos: 84 y 90.', 'Write as products of primes: 84 and 90.', 'Descompon en factors primers: 84 i 90.'), s: '84 = 2² · 3 · 7;  90 = 2 · 3² · 5' },
    { e: T('Calcula el mcm y el mcd de 24 y 36.', 'Find the LCM and HCF of 24 and 36.', 'Calcula el mcm i el mcd de 24 i 36.'), s: T('24 = 2³ · 3 y 36 = 2² · 3². mcd = 2² · 3 = 12; mcm = 2³ · 3² = 72.', '24 = 2³ × 3 and 36 = 2² × 3². HCF = 2² × 3 = 12; LCM = 2³ × 3² = 72.', '24 = 2³ · 3 i 36 = 2² · 3². mcd = 2² · 3 = 12; mcm = 2³ · 3² = 72.') },
    { e: T('¿Es 1.326 divisible entre 2, 3 y 5?', 'Is 1,326 divisible by 2, 3 and 5?', '1.326 és divisible entre 2, 3 i 5?'), s: T('Entre 2 sí (acaba en 6). Entre 3 sí (1 + 3 + 2 + 6 = 12). Entre 5 no (no acaba en 0 ni en 5).', 'By 2, yes (it ends in 6). By 3, yes (1 + 3 + 2 + 6 = 12). By 5, no (it does not end in 0 or 5).', 'Entre 2 sí (acaba en 6). Entre 3 sí (1 + 3 + 2 + 6 = 12). Entre 5 no (no acaba en 0 ni en 5).') },
    { e: T('Un autobús pasa cada 12 minutos y otro cada 18. Si han salido juntos a las 8:00, ¿cuándo vuelven a coincidir?', 'One bus comes every 12 minutes and another every 18. If they left together at 8:00, when do they next coincide?', 'Un autobús passa cada 12 minuts i un altre cada 18. Si han sortit junts a les 8:00, quan tornen a coincidir?'), s: T('mcm(12, 18) = 36 minutos: a las 8:36.', 'LCM(12, 18) = 36 minutes: at 8:36.', 'mcm(12, 18) = 36 minuts: a les 8:36.') },
    { e: T('Tenemos dos cintas de 24 y 36 cm y queremos cortarlas en trozos iguales lo más largos posible, sin que sobre nada. ¿Cuánto medirá cada trozo?', 'We have two ribbons of 24 and 36 cm and want to cut them into equal pieces as long as possible, with nothing left over. How long will each piece be?', 'Tenim dues cintes de 24 i 36 cm i volem tallar-les en trossos iguals tan llargs com es pugui, sense que en sobri res. Quant farà cada tros?'), s: T('mcd(24, 36) = 12 cm (salen 2 + 3 = 5 trozos).', 'HCF(24, 36) = 12 cm (that gives 2 + 3 = 5 pieces).', 'mcd(24, 36) = 12 cm (en surten 2 + 3 = 5 trossos).') },
  ],
}

const funciones = {
  metaTitle: L('Funciones: función lineal y afín, pendiente, tabla y gráfica — resumen y ejercicios resueltos', 'Functions: linear functions, gradient, tables and graphs — summary and solved exercises', 'Funcions: funció lineal i afí, pendent, taula i gràfica — resum i exercicis resolts'),
  metaDesc: L('Qué es una función, cómo se expresa (tabla, gráfica y fórmula), la función lineal y = mx y la afín y = mx + n, la pendiente, la ordenada en el origen y ejercicios resueltos.', 'What a function is, how it is expressed (table, graph and formula), linear functions y = mx and y = mx + c, the gradient, the y-intercept and solved exercises.', 'Què és una funció, com s’expressa (taula, gràfica i fórmula), la funció lineal y = mx i l’afí y = mx + n, el pendent, l’ordenada a l’origen i exercicis resolts.'),
  resumen: L(
    ['Una función relaciona dos magnitudes de forma que a cada valor de la primera (x, la variable independiente) le corresponde un único valor de la segunda (y, la dependiente). Por ejemplo, el precio que pagas según los kilos de fruta que compras. Se puede expresar con una tabla de valores, con una gráfica o con una fórmula.', 'Las más sencillas son las de gráfica recta. La función lineal, y = m · x, pasa por el origen (0, 0). La afín, y = m · x + n, corta el eje Y en el punto (0, n). En las dos, m es la pendiente: cuánto sube (o baja) y cada vez que x aumenta 1. Si m es positiva la recta crece; si es negativa, decrece.'],
    ['A function relates two quantities so that each value of the first (x, the independent variable) has exactly one value of the second (y, the dependent variable). For example, the price you pay according to how many kilos of fruit you buy. It can be expressed with a table of values, a graph or a formula.', 'The simplest have straight-line graphs. The function y = m × x passes through the origin (0, 0). The function y = m × x + c crosses the y-axis at (0, c). In both, m is the gradient: how much y goes up (or down) each time x increases by 1. If m is positive the line rises; if negative, it falls.'],
    ['Una funció relaciona dues magnituds de manera que a cada valor de la primera (x, la variable independent) li correspon un únic valor de la segona (y, la dependent). Per exemple, el preu que pagues segons els quilos de fruita que compres. Es pot expressar amb una taula de valors, amb una gràfica o amb una fórmula.', 'Les més senzilles són les de gràfica recta. La funció lineal, y = m · x, passa per l’origen (0, 0). L’afí, y = m · x + n, talla l’eix Y al punt (0, n). En totes dues, m és el pendent: quant puja (o baixa) y cada vegada que x augmenta 1. Si m és positiva la recta creix; si és negativa, decreix.'],
  ),
  puntosClave: L(
    ['A cada x le corresponde un solo valor de y.', 'Lineal: y = mx (pasa por el origen). Afín: y = mx + n.', 'Pendiente: m = (y₂ − y₁) / (x₂ − x₁).', 'm > 0 crece, m < 0 decrece, m = 0 es una recta horizontal (función constante).', 'n es la ordenada en el origen: donde la recta corta el eje Y.', 'Para dibujar una recta bastan dos puntos.'],
    ['Each x has only one value of y.', 'Through the origin: y = mx. General straight line: y = mx + c.', 'Gradient: m = (y₂ − y₁) / (x₂ − x₁).', 'm > 0 rises, m < 0 falls, m = 0 is a horizontal line (constant function).', 'c is the y-intercept: where the line crosses the y-axis.', 'Two points are enough to draw a straight line.'],
    ['A cada x li correspon un sol valor de y.', 'Lineal: y = mx (passa per l’origen). Afí: y = mx + n.', 'Pendent: m = (y₂ − y₁) / (x₂ − x₁).', 'm > 0 creix, m < 0 decreix, m = 0 és una recta horitzontal (funció constant).', 'n és l’ordenada a l’origen: on la recta talla l’eix Y.', 'Per dibuixar una recta n’hi ha prou amb dos punts.'],
  ),
  secciones: [
    {
      titulo: L('Tipos de funciones de gráfica recta', 'Kinds of straight-line function', 'Tipus de funcions de gràfica recta'),
      tabla: {
        columnas: L(['Tipo', 'Fórmula', 'Gráfica', 'Ejemplo'], ['Type', 'Formula', 'Graph', 'Example'], ['Tipus', 'Fórmula', 'Gràfica', 'Exemple']),
        filas: [
          [L('Lineal (proporcional)', 'Proportional', 'Lineal (proporcional)'), 'y = mx', L('recta que pasa por (0, 0)', 'line through (0, 0)', 'recta que passa per (0, 0)'), L('y = 3x: 1 kg de manzanas a 3 €', 'y = 3x: apples at £3 a kilo', 'y = 3x: 1 kg de pomes a 3 €')],
          [L('Afín', 'Linear with intercept', 'Afí'), 'y = mx + n', L('recta que corta el eje Y en n', 'line crossing the y-axis at c', 'recta que talla l’eix Y a n'), L('y = 2x + 5: 5 € fijos más 2 € por hora', 'y = 2x + 5: £5 fixed plus £2 an hour', 'y = 2x + 5: 5 € fixos més 2 € per hora')],
          [L('Constante', 'Constant', 'Constant'), 'y = n', L('recta horizontal', 'horizontal line', 'recta horitzontal'), 'y = 4'],
        ],
      },
    },
    {
      titulo: L('Ejemplo: y = 2x − 1 en tabla y gráfica', 'Example: y = 2x − 1 as a table and a graph', 'Exemple: y = 2x − 1 en taula i gràfica'),
      tabla: {
        columnas: L(['x', 'y = 2x − 1', 'Punto'], ['x', 'y = 2x − 1', 'Point'], ['x', 'y = 2x − 1', 'Punt']),
        filas: [-1, 0, 1, 2, 3].map(x => [String(x), String(2 * x - 1).replace('-', '−'), `(${String(x).replace('-', '−')}, ${String(2 * x - 1).replace('-', '−')})`]),
      },
      lista: L(
        ['Pendiente 2: cada vez que x avanza 1, y sube 2. Ordenada en el origen −1: corta el eje Y en (0, −1). Corta el eje X donde y = 0: 2x − 1 = 0 → x = 0,5.'],
        ['Gradient 2: each time x goes up by 1, y goes up by 2. Y-intercept −1: it crosses the y-axis at (0, −1). It crosses the x-axis where y = 0: 2x − 1 = 0 → x = 0.5.'],
        ['Pendent 2: cada vegada que x avança 1, y puja 2. Ordenada a l’origen −1: talla l’eix Y a (0, −1). Talla l’eix X on y = 0: 2x − 1 = 0 → x = 0,5.'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿Qué diferencia hay entre función lineal y afín?', 'What is the difference between y = mx and y = mx + c?', 'Quina diferència hi ha entre funció lineal i afí?'),
      r: T('La lineal (y = mx) pasa siempre por el origen y representa una proporcionalidad directa. La afín (y = mx + n) tiene además un valor fijo n, así que corta el eje Y en (0, n).', 'y = mx always passes through the origin and represents direct proportion. y = mx + c also has a fixed amount c, so it crosses the y-axis at (0, c).', 'La lineal (y = mx) passa sempre per l’origen i representa una proporcionalitat directa. L’afí (y = mx + n) té a més un valor fix n, així que talla l’eix Y a (0, n).') },
    { p: T('¿Cómo se calcula la pendiente con dos puntos?', 'How do you find the gradient from two points?', 'Com es calcula el pendent amb dos punts?'),
      r: T('Se divide lo que sube la y entre lo que avanza la x: m = (y₂ − y₁) / (x₂ − x₁). Entre (1, 3) y (4, 9): m = (9 − 3) / (4 − 1) = 2.', 'Divide how much y rises by how much x moves: m = (y₂ − y₁) / (x₂ − x₁). Between (1, 3) and (4, 9): m = (9 − 3) / (4 − 1) = 2.', 'Es divideix el que puja la y entre el que avança la x: m = (y₂ − y₁) / (x₂ − x₁). Entre (1, 3) i (4, 9): m = (9 − 3) / (4 − 1) = 2.') },
  ],
  ejercicios: [
    { e: T('Haz una tabla de valores de y = 3x + 2 para x = 0, 1 y 2.', 'Make a table of values for y = 3x + 2 for x = 0, 1 and 2.', 'Fes una taula de valors de y = 3x + 2 per a x = 0, 1 i 2.'), s: '(0, 2), (1, 5), (2, 8)' },
    { e: T('¿Cuál es la pendiente de la recta que pasa por (2, 1) y (5, 10)?', 'What is the gradient of the line through (2, 1) and (5, 10)?', 'Quin és el pendent de la recta que passa per (2, 1) i (5, 10)?'), s: 'm = (10 − 1) / (5 − 2) = 9 / 3 = 3' },
    { e: T('Escribe la ecuación de la recta de pendiente −2 que corta el eje Y en (0, 4).', 'Write the equation of the line with gradient −2 that crosses the y-axis at (0, 4).', 'Escriu l’equació de la recta de pendent −2 que talla l’eix Y a (0, 4).'), s: 'y = −2x + 4' },
    { e: T('¿Dónde corta los ejes la recta y = 2x − 6?', 'Where does the line y = 2x − 6 cross the axes?', 'On talla els eixos la recta y = 2x − 6?'), s: T('Eje Y: x = 0 → (0, −6). Eje X: 2x − 6 = 0 → x = 3 → (3, 0).', 'Y-axis: x = 0 → (0, −6). X-axis: 2x − 6 = 0 → x = 3 → (3, 0).', 'Eix Y: x = 0 → (0, −6). Eix X: 2x − 6 = 0 → x = 3 → (3, 0).') },
    { e: T('Un taxi cobra 3 € de bajada de bandera y 1,20 € por km. Escribe la función y calcula cuánto cuesta un viaje de 10 km.', 'A taxi charges a £3 flat fare plus £1.20 per km. Write the function and work out the cost of a 10 km journey.', 'Un taxi cobra 3 € de baixada de bandera i 1,20 € per km. Escriu la funció i calcula quant costa un viatge de 10 km.'),
      s: T('y = 1,2x + 3 (afín). Para x = 10: y = 12 + 3 = 15 €.', 'y = 1.2x + 3. For x = 10: y = 12 + 3 = £15.', 'y = 1,2x + 3 (afí). Per a x = 10: y = 12 + 3 = 15 €.') },
  ],
}

export const MATEMATICAS_AMPLIADO = { fracciones, geometria, potencias, divisibilidad, funciones }
