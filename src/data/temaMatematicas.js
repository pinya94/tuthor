// Páginas de estudio de matemáticas fuera del motor de MODOS (mathEngine):
// temas con juego propio y mucha búsqueda que no tenían página. Se fusionan en
// CONTENIDO_TEMA con la clave = slug (/estudiar/matematicas/<slug>).
// Los ejemplos salen de aRomano(), la misma función que corrige el juego.
import { aRomano } from '../lib/romanos.js'
import { proporcionalidad } from './temaTanda3.js'
import { segundoGrado } from './temaTanda12.js'
import { cuerposGeometricos } from './temaCuerpos.js'

const T = (es, en, ca) => ({ es, en, ca })
const L = T

const EJEMPLOS = [4, 9, 14, 19, 40, 44, 49, 90, 99, 400, 444, 900, 1492, 1999, 2026, 3999]

const numerosRomanos = {
  metaTitle: L('Los números romanos: reglas, tabla del 1 al 100 y ejemplos — resumen y ejercicios', 'Roman numerals: rules, a chart from 1 to 100 and examples — summary and practice questions', 'Els nombres romans: regles, taula de l’1 al 100 i exemples — resum i exercicis'),
  metaDesc: L('Cómo se escriben los números romanos: los siete símbolos, las reglas de sumar, restar y repetir, una tabla del 1 al 100, años como 1492 o 2026 y ejercicios resueltos.', 'How to write Roman numerals: the seven symbols, the rules for adding, subtracting and repeating, a chart from 1 to 100, years such as 1492 or 2026 and solved exercises.', 'Com s’escriuen els nombres romans: els set símbols, les regles de sumar, restar i repetir, una taula de l’1 al 100, anys com 1492 o 2026 i exercicis resolts.'),
  resumen: L(
    ['Los romanos escribían los números con siete letras: I (1), V (5), X (10), L (50), C (100), D (500) y M (1.000). Hoy los seguimos usando para los siglos (siglo XXI), los reyes y papas (Felipe VI), los capítulos y algunos relojes.', 'Para leer un número romano se suman los valores de izquierda a derecha (XVI = 10 + 5 + 1 = 16), salvo cuando un símbolo menor va delante de uno mayor: entonces se resta (IV = 5 − 1 = 4). Con estas reglas se escribe cualquier número del 1 al 3.999.'],
    ['The Romans wrote numbers with seven letters: I (1), V (5), X (10), L (50), C (100), D (500) and M (1,000). We still use them for centuries (the 21st century, XXI), kings and popes (Elizabeth II), chapters and some clocks.', 'To read a Roman numeral, add the values from left to right (XVI = 10 + 5 + 1 = 16), except when a smaller symbol comes before a larger one: then you subtract (IV = 5 − 1 = 4). With these rules you can write any number from 1 to 3,999.'],
    ['Els romans escrivien els nombres amb set lletres: I (1), V (5), X (10), L (50), C (100), D (500) i M (1.000). Avui encara els fem servir per als segles (segle XXI), els reis i papes (Felip VI), els capítols i alguns rellotges.', 'Per llegir un nombre romà se sumen els valors d’esquerra a dreta (XVI = 10 + 5 + 1 = 16), llevat de quan un símbol menor va davant d’un de més gran: aleshores es resta (IV = 5 − 1 = 4). Amb aquestes regles s’escriu qualsevol nombre de l’1 al 3.999.'],
  ),
  puntosClave: L(
    ['I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1.000.', 'Un símbolo detrás de otro mayor o igual, se suma: VI = 6.', 'Delante de uno mayor, se resta: IV = 4, IX = 9.', 'Solo restan I (ante V y X), X (ante L y C) y C (ante D y M).', 'I, X, C y M se repiten como mucho tres veces; V, L y D, nunca.', 'Sin rayas encima, el mayor número es MMMCMXCIX (3.999).'],
    ['I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1,000.', 'A symbol after a larger or equal one is added: VI = 6.', 'Before a larger one, it is subtracted: IV = 4, IX = 9.', 'Only I (before V and X), X (before L and C) and C (before D and M) subtract.', 'I, X, C and M repeat at most three times; V, L and D never.', 'Without bars on top, the largest number is MMMCMXCIX (3,999).'],
    ['I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1.000.', 'Un símbol darrere d’un altre de més gran o igual, se suma: VI = 6.', 'Davant d’un de més gran, es resta: IV = 4, IX = 9.', 'Només resten I (davant de V i X), X (davant de L i C) i C (davant de D i M).', 'I, X, C i M es repeteixen com a molt tres vegades; V, L i D, mai.', 'Sense ratlles a sobre, el nombre més gran és MMMCMXCIX (3.999).'],
  ),
  secciones: [
    {
      titulo: L('Los siete símbolos', 'The seven symbols', 'Els set símbols'),
      tabla: {
        columnas: L(['Símbolo', 'Valor', '¿Se repite?', '¿Puede restar?'], ['Symbol', 'Value', 'Repeated?', 'Can it subtract?'], ['Símbol', 'Valor', 'Es repeteix?', 'Pot restar?']),
        filas: [
          ['I', '1', L('sí, hasta 3 (III)', 'yes, up to 3 (III)', 'sí, fins a 3 (III)'), L('sí, ante V y X', 'yes, before V and X', 'sí, davant de V i X')],
          ['V', '5', 'no', 'no'],
          ['X', '10', L('sí, hasta 3 (XXX)', 'yes, up to 3 (XXX)', 'sí, fins a 3 (XXX)'), L('sí, ante L y C', 'yes, before L and C', 'sí, davant de L i C')],
          ['L', '50', 'no', 'no'],
          ['C', '100', L('sí, hasta 3 (CCC)', 'yes, up to 3 (CCC)', 'sí, fins a 3 (CCC)'), L('sí, ante D y M', 'yes, before D and M', 'sí, davant de D i M')],
          ['D', '500', 'no', 'no'],
          ['M', '1000', L('sí, hasta 3 (MMM)', 'yes, up to 3 (MMM)', 'sí, fins a 3 (MMM)'), 'no'],
        ],
      },
    },
    {
      titulo: L('Tabla de números romanos del 1 al 100', 'Roman numerals chart from 1 to 100', 'Taula de nombres romans de l’1 al 100'),
      // 10 columnas (1-10, 11-20… 91-100): en móvil la tabla se desplaza
      tabla: (() => {
        const cols = Array.from({ length: 10 }, (_, c) => `${c * 10 + 1}-${c * 10 + 10}`)
        return {
          columnas: L(cols, cols, cols),
          filas: Array.from({ length: 10 }, (_, f) => cols.map((_, c) => `${c * 10 + f + 1} ${aRomano(c * 10 + f + 1)}`)),
        }
      })(),
    },
    {
      titulo: L('Centenas y millares', 'Hundreds and thousands', 'Centenes i milers'),
      tabla: {
        columnas: L(['Centenas', 'Romano', 'Millares', 'Romano'], ['Hundreds', 'Roman', 'Thousands', 'Roman'], ['Centenes', 'Romà', 'Milers', 'Romà']),
        filas: Array.from({ length: 9 }, (_, i) => [String((i + 1) * 100), aRomano((i + 1) * 100), i < 3 ? String((i + 1) * 1000) : '—', i < 3 ? aRomano((i + 1) * 1000) : '—']),
      },
    },
    {
      titulo: L('Más ejemplos (y años)', 'More examples (and years)', 'Més exemples (i anys)'),
      tabla: {
        columnas: L(['Número', 'Romano', 'Cómo se forma'], ['Number', 'Roman', 'How it is built'], ['Nombre', 'Romà', 'Com es forma']),
        filas: EJEMPLOS.map(n => {
          const partes = [1000, 100, 10, 1].map(u => Math.floor(n / u) % 10 * u).filter(Boolean)
          const desglose = partes.map(p => `${aRomano(p)} (${p})`).join(' + ')
          return [String(n), aRomano(n), desglose]
        }),
      },
      lista: L(
        ['Truco: separa el número en millares, centenas, decenas y unidades, escribe cada parte y júntalas. 1.492 = 1.000 + 400 + 90 + 2 = M + CD + XC + II = MCDXCII.', 'En algunos relojes el 4 aparece como IIII; en matemáticas y en los exámenes se escribe IV.'],
        ['Tip: split the number into thousands, hundreds, tens and units, write each part and put them together. 1,492 = 1,000 + 400 + 90 + 2 = M + CD + XC + II = MCDXCII.', 'On some clocks 4 appears as IIII; in maths and in exams it is written IV.'],
        ['Truc: separa el nombre en milers, centenes, desenes i unitats, escriu cada part i ajunta-les. 1.492 = 1.000 + 400 + 90 + 2 = M + CD + XC + II = MCDXCII.', 'En alguns rellotges el 4 apareix com a IIII; en matemàtiques i als exàmens s’escriu IV.'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿Por qué 99 no se escribe IC?', 'Why is 99 not written IC?', 'Per què el 99 no s’escriu IC?'),
      r: T('Porque la I solo puede restar delante de V y de X. Hay que ir por partes: 90 = XC y 9 = IX, así que 99 = XCIX.', 'Because I can only subtract before V and X. You go part by part: 90 = XC and 9 = IX, so 99 = XCIX.', 'Perquè la I només pot restar davant de V i de X. Cal anar per parts: 90 = XC i 9 = IX, així que 99 = XCIX.') },
    { p: T('¿Cómo se escriben los números mayores de 3.999?', 'How are numbers above 3,999 written?', 'Com s’escriuen els nombres més grans de 3.999?'),
      r: T('Con una raya horizontal encima, que multiplica por mil: V con raya = 5.000, X con raya = 10.000.', 'With a horizontal bar on top, which multiplies by a thousand: V with a bar = 5,000, X with a bar = 10,000.', 'Amb una ratlla horitzontal a sobre, que multiplica per mil: V amb ratlla = 5.000, X amb ratlla = 10.000.') },
    { p: T('¿Existe el cero en números romanos?', 'Is there a zero in Roman numerals?', 'Existeix el zero en nombres romans?'),
      r: T('No. Los romanos no tenían un símbolo para el cero; llegó a Europa más tarde, con los números indoarábigos que usamos hoy.', 'No. The Romans had no symbol for zero; it reached Europe later, with the Hindu-Arabic numerals we use today.', 'No. Els romans no tenien cap símbol per al zero; va arribar a Europa més tard, amb els nombres indoaràbics que fem servir avui.') },
  ],
  ejercicios: [
    { e: T('Escribe en números romanos: 47, 94 y 2026.', 'Write in Roman numerals: 47, 94 and 2026.', 'Escriu en nombres romans: 47, 94 i 2026.'),
      s: `47 = ${aRomano(47)}, 94 = ${aRomano(94)}, 2026 = ${aRomano(2026)}` },
    { e: T('¿Qué número es XIV? ¿Y CDXLIV?', 'Which number is XIV? And CDXLIV?', 'Quin nombre és XIV? I CDXLIV?'),
      s: T('XIV = 10 + 4 = 14. CDXLIV = 400 + 40 + 4 = 444.', 'XIV = 10 + 4 = 14. CDXLIV = 400 + 40 + 4 = 444.', 'XIV = 10 + 4 = 14. CDXLIV = 400 + 40 + 4 = 444.') },
    { e: T('Escribe el año en que Colón llegó a América (1492).', 'Write the year Columbus reached America (1492).', 'Escriu l’any en què Colom va arribar a Amèrica (1492).'),
      s: `${aRomano(1492)} = M (1000) + CD (400) + XC (90) + II (2)` },
    { e: T('¿Está bien escrito? VV, IL, XXXX, XLIX.', 'Is it written correctly? VV, IL, XXXX, XLIX.', 'Està ben escrit? VV, IL, XXXX, XLIX.'),
      s: T('Solo XLIX (49). VV debe ser X; IL no vale (la I solo resta ante V y X: 49 = XLIX); XXXX debe ser XL (40).', 'Only XLIX (49). VV should be X; IL is not allowed (I only subtracts before V and X: 49 = XLIX); XXXX should be XL (40).', 'Només XLIX (49). VV ha de ser X; IL no val (la I només resta davant de V i X: 49 = XLIX); XXXX ha de ser XL (40).') },
    { e: T('¿En qué siglo estamos y cómo se escribe en romanos? ¿Y el siglo de la Revolución francesa (1789)?', 'Which century are we in, and how is it written in Roman numerals? And the century of the French Revolution (1789)?', 'En quin segle som i com s’escriu en romans? I el segle de la Revolució Francesa (1789)?'),
      s: T('Estamos en el siglo XXI (21). 1789 es del siglo XVIII (18): los años 1701-1800.', 'We are in the 21st century, XXI. 1789 is in the 18th century, XVIII: the years 1701-1800.', 'Som al segle XXI (21). El 1789 és del segle XVIII (18): els anys 1701-1800.') },
  ],
}

// Ternas pitagóricas: se comprueban solas (a² + b² = c²) en el test.
export const TERNAS = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15], [7, 24, 25], [20, 21, 29], [9, 40, 41]]

const pitagoras = {
  metaTitle: L('El teorema de Pitágoras: fórmula, explicación y ejemplos — resumen y ejercicios resueltos', 'Pythagoras’ theorem: formula, explanation and examples — summary and solved exercises', 'El teorema de Pitàgores: fórmula, explicació i exemples — resum i exercicis resolts'),
  metaDesc: L('Qué dice el teorema de Pitágoras, cómo calcular la hipotenusa o un cateto, las ternas pitagóricas (3-4-5) y problemas resueltos: la escalera, la diagonal y la altura.', 'What Pythagoras’ theorem says, how to find the hypotenuse or a shorter side, Pythagorean triples (3-4-5) and solved problems: the ladder, the diagonal and the height.', 'Què diu el teorema de Pitàgores, com calcular la hipotenusa o un catet, les ternes pitagòriques (3-4-5) i problemes resolts: l’escala, la diagonal i l’altura.'),
  resumen: L(
    ['El teorema de Pitágoras se cumple en todos los triángulos rectángulos, los que tienen un ángulo de 90°. Los dos lados que forman el ángulo recto se llaman catetos, y el lado de enfrente, que siempre es el más largo, hipotenusa. El teorema dice que la hipotenusa al cuadrado es igual a la suma de los cuadrados de los catetos: c² = a² + b².', 'Sirve para calcular un lado cuando se conocen los otros dos. Si falta la hipotenusa, se suman los cuadrados de los catetos y se hace la raíz cuadrada. Si falta un cateto, se resta: al cuadrado de la hipotenusa se le quita el cuadrado del otro cateto, y se hace la raíz.'],
    ['Pythagoras’ theorem holds in every right-angled triangle, the ones with a 90° angle. The side opposite the right angle, which is always the longest, is called the hypotenuse; the other two are the shorter sides (legs). The theorem says the square of the hypotenuse equals the sum of the squares of the other two sides: c² = a² + b².', 'It lets you find one side when you know the other two. If the hypotenuse is missing, add the squares of the shorter sides and take the square root. If a shorter side is missing, subtract: take the square of the other shorter side away from the square of the hypotenuse, then take the square root.'],
    ['El teorema de Pitàgores es compleix en tots els triangles rectangles, els que tenen un angle de 90°. Els dos costats que formen l’angle recte s’anomenen catets, i el costat de davant, que sempre és el més llarg, hipotenusa. El teorema diu que la hipotenusa al quadrat és igual a la suma dels quadrats dels catets: c² = a² + b².', 'Serveix per calcular un costat quan es coneixen els altres dos. Si falta la hipotenusa, se sumen els quadrats dels catets i es fa l’arrel quadrada. Si falta un catet, es resta: al quadrat de la hipotenusa se li treu el quadrat de l’altre catet, i es fa l’arrel.'],
  ),
  puntosClave: L(
    ['Solo vale para triángulos rectángulos (con un ángulo de 90°).', 'c² = a² + b², donde c es la hipotenusa y a y b los catetos.', 'Hipotenusa: c = √(a² + b²).', 'Cateto: a = √(c² − b²).', 'La hipotenusa es siempre el lado más largo: si sale más corta que un cateto, hay un error.', 'Si a² + b² = c², el triángulo es rectángulo (así se comprueba una escuadra).'],
    ['It only works for right-angled triangles (with a 90° angle).', 'c² = a² + b², where c is the hypotenuse and a and b the shorter sides.', 'Hypotenuse: c = √(a² + b²).', 'Shorter side: a = √(c² − b²).', 'The hypotenuse is always the longest side: if it comes out shorter than another side, there is a mistake.', 'If a² + b² = c², the triangle is right-angled (that is how you check a set square).'],
    ['Només val per a triangles rectangles (amb un angle de 90°).', 'c² = a² + b², on c és la hipotenusa i a i b els catets.', 'Hipotenusa: c = √(a² + b²).', 'Catet: a = √(c² − b²).', 'La hipotenusa és sempre el costat més llarg: si surt més curta que un catet, hi ha un error.', 'Si a² + b² = c², el triangle és rectangle (així es comprova un escaire).'],
  ),
  secciones: [
    {
      titulo: L('Cómo se aplica, paso a paso', 'How to apply it, step by step', 'Com s’aplica, pas a pas'),
      tabla: {
        columnas: L(['Qué falta', 'Fórmula', 'Ejemplo'], ['What is missing', 'Formula', 'Example'], ['Què falta', 'Fórmula', 'Exemple']),
        filas: [
          [L('La hipotenusa', 'The hypotenuse', 'La hipotenusa'), 'c = √(a² + b²)', L('catetos 6 y 8 → c = √(36 + 64) = √100 = 10', 'sides 6 and 8 → c = √(36 + 64) = √100 = 10', 'catets 6 i 8 → c = √(36 + 64) = √100 = 10')],
          [L('Un cateto', 'A shorter side', 'Un catet'), 'a = √(c² − b²)', L('hipotenusa 13 y cateto 5 → a = √(169 − 25) = √144 = 12', 'hypotenuse 13 and side 5 → a = √(169 − 25) = √144 = 12', 'hipotenusa 13 i catet 5 → a = √(169 − 25) = √144 = 12')],
          [L('Saber si es rectángulo', 'Checking for a right angle', 'Saber si és rectangle'), L('¿a² + b² = c²?', 'is a² + b² = c²?', 'a² + b² = c²?'), L('lados 5, 6 y 8 → 25 + 36 = 61 ≠ 64: no lo es', 'sides 5, 6 and 8 → 25 + 36 = 61 ≠ 64: it is not', 'costats 5, 6 i 8 → 25 + 36 = 61 ≠ 64: no ho és')],
        ],
      },
    },
    {
      titulo: L('Ternas pitagóricas', 'Pythagorean triples', 'Ternes pitagòriques'),
      texto: L(
        ['Son tres números enteros que cumplen el teorema. Conviene saberse las primeras, porque salen mucho en los problemas, y cualquier múltiplo de una terna también lo es (3-4-5 → 6-8-10 → 9-12-15).'],
        ['These are three whole numbers that satisfy the theorem. It is worth knowing the first few, because they come up a lot in problems, and any multiple of a triple is one too (3-4-5 → 6-8-10 → 9-12-15).'],
        ['Són tres nombres enters que compleixen el teorema. Convé saber-se les primeres, perquè surten molt als problemes, i qualsevol múltiple d’una terna també ho és (3-4-5 → 6-8-10 → 9-12-15).'],
      ),
      tabla: {
        columnas: L(['Cateto a', 'Cateto b', 'Hipotenusa c', 'Comprobación'], ['Side a', 'Side b', 'Hypotenuse c', 'Check'], ['Catet a', 'Catet b', 'Hipotenusa c', 'Comprovació']),
        filas: TERNAS.map(([a, b, c]) => [String(a), String(b), String(c), `${a * a} + ${b * b} = ${c * c}`]),
      },
    },
  ],
  preguntas: [
    { p: T('¿Para qué sirve el teorema de Pitágoras?', 'What is Pythagoras’ theorem used for?', 'Per a què serveix el teorema de Pitàgores?'),
      r: T('Para calcular distancias que no se pueden medir directamente: la diagonal de una pantalla o de un campo, la altura a la que llega una escalera o la distancia entre dos puntos de un plano.', 'To work out distances you cannot measure directly: the diagonal of a screen or a pitch, how high a ladder reaches or the distance between two points on a plane.', 'Per calcular distàncies que no es poden mesurar directament: la diagonal d’una pantalla o d’un camp, l’altura a què arriba una escala o la distància entre dos punts d’un pla.') },
    { p: T('¿Cómo sé cuál es la hipotenusa?', 'How do I know which side is the hypotenuse?', 'Com sé quina és la hipotenusa?'),
      r: T('Es el lado que está enfrente del ángulo recto, y siempre es el más largo de los tres.', 'It is the side opposite the right angle, and it is always the longest of the three.', 'És el costat que hi ha davant de l’angle recte, i sempre és el més llarg dels tres.') },
  ],
  ejercicios: [
    { e: T('Los catetos de un triángulo rectángulo miden 9 cm y 12 cm. ¿Cuánto mide la hipotenusa?', 'The shorter sides of a right-angled triangle are 9 cm and 12 cm. How long is the hypotenuse?', 'Els catets d’un triangle rectangle fan 9 cm i 12 cm. Quant fa la hipotenusa?'),
      s: 'c = √(9² + 12²) = √(81 + 144) = √225 = 15 cm' },
    { e: T('La hipotenusa mide 10 m y un cateto 6 m. ¿Cuánto mide el otro cateto?', 'The hypotenuse is 10 m and one shorter side is 6 m. How long is the other?', 'La hipotenusa fa 10 m i un catet 6 m. Quant fa l’altre catet?'),
      s: 'a = √(10² − 6²) = √(100 − 36) = √64 = 8 m' },
    { e: T('Una escalera de 5 m se apoya en una pared con el pie a 3 m de ella. ¿A qué altura llega?', 'A 5 m ladder leans against a wall with its foot 3 m away. How high does it reach?', 'Una escala de 5 m es recolza en una paret amb el peu a 3 m. A quina altura arriba?'),
      s: T('La escalera es la hipotenusa: altura = √(5² − 3²) = √(25 − 9) = √16 = 4 m.', 'The ladder is the hypotenuse: height = √(5² − 3²) = √(25 − 9) = √16 = 4 m.', 'L’escala és la hipotenusa: altura = √(5² − 3²) = √(25 − 9) = √16 = 4 m.') },
    { e: T('¿Cuánto mide la diagonal de un rectángulo de 8 cm por 15 cm?', 'How long is the diagonal of an 8 cm by 15 cm rectangle?', 'Quant fa la diagonal d’un rectangle de 8 cm per 15 cm?'),
      s: T('La diagonal es la hipotenusa de un triángulo de catetos 8 y 15: √(64 + 225) = √289 = 17 cm.', 'The diagonal is the hypotenuse of a triangle with sides 8 and 15: √(64 + 225) = √289 = 17 cm.', 'La diagonal és la hipotenusa d’un triangle de catets 8 i 15: √(64 + 225) = √289 = 17 cm.') },
    { e: T('¿Es rectángulo un triángulo de lados 7, 24 y 25? ¿Y uno de lados 4, 5 y 6?', 'Is a triangle with sides 7, 24 and 25 right-angled? And one with sides 4, 5 and 6?', 'És rectangle un triangle de costats 7, 24 i 25? I un de costats 4, 5 i 6?'),
      s: T('El primero sí: 49 + 576 = 625 = 25². El segundo no: 16 + 25 = 41, y 6² = 36.', 'The first is: 49 + 576 = 625 = 25². The second is not: 16 + 25 = 41, and 6² = 36.', 'El primer sí: 49 + 576 = 625 = 25². El segon no: 16 + 25 = 41, i 6² = 36.') },
    { e: T('Calcula la altura de un triángulo equilátero de 10 cm de lado (con un decimal).', 'Find the height of an equilateral triangle with 10 cm sides (to one decimal place).', 'Calcula l’altura d’un triangle equilàter de 10 cm de costat (amb un decimal).'),
      s: T('La altura parte la base en dos mitades de 5 cm: h = √(10² − 5²) = √75 ≈ 8,7 cm.', 'The height splits the base into two halves of 5 cm: h = √(10² − 5²) = √75 ≈ 8.7 cm.', 'L’altura parteix la base en dues meitats de 5 cm: h = √(10² − 5²) = √75 ≈ 8,7 cm.') },
  ],
}

const sistemas = {
  metaTitle: L('Sistemas de ecuaciones: sustitución, igualación y reducción — resumen y ejercicios resueltos', 'Simultaneous equations: substitution, equating and elimination — summary and solved exercises', 'Sistemes d’equacions: substitució, igualació i reducció — resum i exercicis resolts'),
  metaDesc: L('Cómo resolver un sistema de dos ecuaciones con dos incógnitas por sustitución, igualación y reducción, paso a paso, con problemas de enunciado y ejercicios resueltos.', 'How to solve two simultaneous equations by substitution, equating and elimination, step by step, with word problems and solved exercises.', 'Com resoldre un sistema de dues equacions amb dues incògnites per substitució, igualació i reducció, pas a pas, amb problemes d’enunciat i exercicis resolts.'),
  resumen: L(
    ['Un sistema de ecuaciones son dos ecuaciones con dos incógnitas (x e y) que tienen que cumplirse a la vez. Resolverlo es encontrar el par de valores que funciona en las dos. Por ejemplo, en x + y = 10 y x − y = 2, la solución es x = 6, y = 4.', 'Hay tres métodos y los tres dan el mismo resultado: sustitución (despejar una incógnita y meterla en la otra ecuación), igualación (despejar la misma incógnita en las dos e igualar) y reducción (sumar o restar las ecuaciones para que una incógnita desaparezca). Al terminar, conviene comprobar la solución en las dos ecuaciones.'],
    ['A system of simultaneous equations is two equations with two unknowns (x and y) that must both be true at once. Solving it means finding the pair of values that works in both. For example, for x + y = 10 and x − y = 2, the solution is x = 6, y = 4.', 'There are three methods and all three give the same result: substitution (make one unknown the subject and put it into the other equation), equating (make the same unknown the subject in both and set them equal) and elimination (add or subtract the equations so one unknown disappears). At the end, check the solution in both equations.'],
    ['Un sistema d’equacions són dues equacions amb dues incògnites (x i y) que s’han de complir alhora. Resoldre’l és trobar el parell de valors que funciona en totes dues. Per exemple, a x + y = 10 i x − y = 2, la solució és x = 6, y = 4.', 'Hi ha tres mètodes i tots tres donen el mateix resultat: substitució (aïllar una incògnita i posar-la a l’altra equació), igualació (aïllar la mateixa incògnita a totes dues i igualar) i reducció (sumar o restar les equacions perquè una incògnita desaparegui). En acabar, convé comprovar la solució a les dues equacions.'],
  ),
  puntosClave: L(
    ['La solución es un par (x, y) que cumple las dos ecuaciones.', 'Sustitución: cómoda cuando una incógnita ya está despejada o tiene coeficiente 1.', 'Igualación: cómoda cuando la misma incógnita se despeja fácil en las dos.', 'Reducción: cómoda cuando los coeficientes son iguales u opuestos (o se consiguen multiplicando).', 'Comprueba siempre sustituyendo en las dos ecuaciones.', 'Gráficamente, la solución es el punto donde se cortan las dos rectas.'],
    ['The solution is a pair (x, y) that satisfies both equations.', 'Substitution: handy when one unknown is already the subject or has coefficient 1.', 'Equating: handy when the same unknown is easy to isolate in both.', 'Elimination: handy when the coefficients are equal or opposite (or can be made so by multiplying).', 'Always check by substituting into both equations.', 'On a graph, the solution is the point where the two lines cross.'],
    ['La solució és un parell (x, y) que compleix les dues equacions.', 'Substitució: còmoda quan una incògnita ja està aïllada o té coeficient 1.', 'Igualació: còmoda quan la mateixa incògnita s’aïlla fàcilment a totes dues.', 'Reducció: còmoda quan els coeficients són iguals o oposats (o s’aconsegueixen multiplicant).', 'Comprova sempre substituint a les dues equacions.', 'Gràficament, la solució és el punt on es tallen les dues rectes.'],
  ),
  secciones: [
    {
      titulo: L('Los tres métodos con el mismo sistema: x + y = 10, x − y = 2', 'The three methods on the same system: x + y = 10, x − y = 2', 'Els tres mètodes amb el mateix sistema: x + y = 10, x − y = 2'),
      tabla: {
        columnas: L(['Método', 'Pasos', 'Resultado'], ['Method', 'Steps', 'Result'], ['Mètode', 'Passos', 'Resultat']),
        filas: [
          [L('Sustitución', 'Substitution', 'Substitució'), L('De la 1.ª: x = 10 − y. En la 2.ª: (10 − y) − y = 2 → 10 − 2y = 2 → y = 4', 'From the 1st: x = 10 − y. Into the 2nd: (10 − y) − y = 2 → 10 − 2y = 2 → y = 4', 'De la 1a: x = 10 − y. A la 2a: (10 − y) − y = 2 → 10 − 2y = 2 → y = 4'), 'x = 10 − 4 = 6'],
          [L('Igualación', 'Equating', 'Igualació'), L('x = 10 − y y x = 2 + y. Se igualan: 10 − y = 2 + y → 8 = 2y → y = 4', 'x = 10 − y and x = 2 + y. Set equal: 10 − y = 2 + y → 8 = 2y → y = 4', 'x = 10 − y i x = 2 + y. S’igualen: 10 − y = 2 + y → 8 = 2y → y = 4'), 'x = 2 + 4 = 6'],
          [L('Reducción', 'Elimination', 'Reducció'), L('Se suman las dos: (x + y) + (x − y) = 10 + 2 → 2x = 12 → x = 6', 'Add the two: (x + y) + (x − y) = 10 + 2 → 2x = 12 → x = 6', 'Se sumen totes dues: (x + y) + (x − y) = 10 + 2 → 2x = 12 → x = 6'), 'y = 10 − 6 = 4'],
        ],
      },
      lista: L(
        ['Comprobación: 6 + 4 = 10 y 6 − 4 = 2. La solución es x = 6, y = 4.'],
        ['Check: 6 + 4 = 10 and 6 − 4 = 2. The solution is x = 6, y = 4.'],
        ['Comprovació: 6 + 4 = 10 i 6 − 4 = 2. La solució és x = 6, y = 4.'],
      ),
    },
    {
      titulo: L('Cuántas soluciones puede tener', 'How many solutions there can be', 'Quantes solucions pot tenir'),
      tabla: {
        columnas: L(['Tipo', 'Soluciones', 'Las rectas', 'Ejemplo'], ['Type', 'Solutions', 'The lines', 'Example'], ['Tipus', 'Solucions', 'Les rectes', 'Exemple']),
        filas: [
          [L('Compatible determinado', 'One solution', 'Compatible determinat'), L('una', 'one', 'una'), L('se cortan en un punto', 'cross at one point', 'es tallen en un punt'), 'x + y = 10; x − y = 2'],
          [L('Compatible indeterminado', 'Infinitely many', 'Compatible indeterminat'), L('infinitas', 'infinitely many', 'infinites'), L('son la misma recta', 'are the same line', 'són la mateixa recta'), 'x + y = 5; 2x + 2y = 10'],
          [L('Incompatible', 'No solution', 'Incompatible'), L('ninguna', 'none', 'cap'), L('son paralelas', 'are parallel', 'són paral·leles'), 'x + y = 5; x + y = 8'],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Qué método es mejor?', 'Which method is best?', 'Quin mètode és millor?'),
      r: T('Los tres dan la misma solución. Elige el que ahorre cuentas: sustitución si hay una incógnita con coeficiente 1, reducción si los coeficientes de una incógnita son iguales u opuestos.', 'All three give the same solution. Pick whichever saves work: substitution if an unknown has coefficient 1, elimination if the coefficients of one unknown are equal or opposite.', 'Tots tres donen la mateixa solució. Tria el que estalviï comptes: substitució si hi ha una incògnita amb coeficient 1, reducció si els coeficients d’una incògnita són iguals o oposats.') },
    { p: T('¿Cómo se plantea un problema con un sistema?', 'How do you set up a word problem as a system?', 'Com es planteja un problema amb un sistema?'),
      r: T('Se nombra con x e y lo que se pregunta y se escribe una ecuación por cada dato del enunciado. «Dos números suman 20 y su diferencia es 4» → x + y = 20, x − y = 4.', 'Call the things you are asked for x and y and write one equation for each fact in the problem. «Two numbers add up to 20 and their difference is 4» → x + y = 20, x − y = 4.', 'S’anomena amb x i y el que es pregunta i s’escriu una equació per cada dada de l’enunciat. «Dos nombres sumen 20 i la seva diferència és 4» → x + y = 20, x − y = 4.') },
  ],
  ejercicios: [
    { e: T('Resuelve por reducción: x + y = 7, x − y = 1.', 'Solve by elimination: x + y = 7, x − y = 1.', 'Resol per reducció: x + y = 7, x − y = 1.'),
      s: T('Sumando: 2x = 8 → x = 4. Entonces y = 7 − 4 = 3. Comprobación: 4 − 3 = 1.', 'Adding: 2x = 8 → x = 4. Then y = 7 − 4 = 3. Check: 4 − 3 = 1.', 'Sumant: 2x = 8 → x = 4. Llavors y = 7 − 4 = 3. Comprovació: 4 − 3 = 1.') },
    { e: T('Resuelve por sustitución: y = 2x, x + y = 9.', 'Solve by substitution: y = 2x, x + y = 9.', 'Resol per substitució: y = 2x, x + y = 9.'),
      s: 'x + 2x = 9 → 3x = 9 → x = 3; y = 2 · 3 = 6' },
    { e: T('Resuelve: 2x + y = 11, x − y = 1.', 'Solve: 2x + y = 11, x − y = 1.', 'Resol: 2x + y = 11, x − y = 1.'),
      s: T('Sumando las dos desaparece la y: 3x = 12 → x = 4. De la segunda: y = 4 − 1 = 3. Comprobación: 2 · 4 + 3 = 11.', 'Adding the two removes y: 3x = 12 → x = 4. From the second: y = 4 − 1 = 3. Check: 2 × 4 + 3 = 11.', 'Sumant totes dues desapareix la y: 3x = 12 → x = 4. De la segona: y = 4 − 1 = 3. Comprovació: 2 · 4 + 3 = 11.') },
    { e: T('Resuelve: 3x + 2y = 16, x + 2y = 8.', 'Solve: 3x + 2y = 16, x + 2y = 8.', 'Resol: 3x + 2y = 16, x + 2y = 8.'),
      s: T('Restando la segunda de la primera: 2x = 8 → x = 4. Entonces 4 + 2y = 8 → y = 2.', 'Subtracting the second from the first: 2x = 8 → x = 4. Then 4 + 2y = 8 → y = 2.', 'Restant la segona de la primera: 2x = 8 → x = 4. Llavors 4 + 2y = 8 → y = 2.') },
    { e: T('Dos números suman 20 y su diferencia es 4. ¿Cuáles son?', 'Two numbers add up to 20 and their difference is 4. What are they?', 'Dos nombres sumen 20 i la seva diferència és 4. Quins són?'),
      s: T('x + y = 20 y x − y = 4. Sumando: 2x = 24 → x = 12; y = 8.', 'x + y = 20 and x − y = 4. Adding: 2x = 24 → x = 12; y = 8.', 'x + y = 20 i x − y = 4. Sumant: 2x = 24 → x = 12; y = 8.') },
    { e: T('En una granja hay gallinas y conejos: 10 cabezas y 28 patas. ¿Cuántos hay de cada?', 'A farm has hens and rabbits: 10 heads and 28 legs. How many of each?', 'En una granja hi ha gallines i conills: 10 caps i 28 potes. Quants n’hi ha de cada?'),
      s: T('g + c = 10 y 2g + 4c = 28. De la primera, g = 10 − c: 2(10 − c) + 4c = 28 → 20 + 2c = 28 → c = 4 conejos y g = 6 gallinas.', 'h + r = 10 and 2h + 4r = 28. From the first, h = 10 − r: 2(10 − r) + 4r = 28 → 20 + 2r = 28 → r = 4 rabbits and h = 6 hens.', 'g + c = 10 i 2g + 4c = 28. De la primera, g = 10 − c: 2(10 − c) + 4c = 28 → 20 + 2c = 28 → c = 4 conills i g = 6 gallines.') },
  ],
}

const decimales = {
  metaTitle: L('Los números decimales: lectura, comparación y operaciones — resumen y ejercicios resueltos', 'Decimal numbers: reading, comparing and calculating — summary and solved exercises', 'Els nombres decimals: lectura, comparació i operacions — resum i exercicis resolts'),
  metaDesc: L('Qué son los números decimales, décimas, centésimas y milésimas, cómo se comparan y ordenan, sumar, restar, multiplicar y dividir decimales, redondear y pasar a fracción.', 'What decimals are, tenths, hundredths and thousandths, how to compare and order them, adding, subtracting, multiplying and dividing decimals, rounding and converting to fractions.', 'Què són els nombres decimals, dècimes, centèsimes i mil·lèsimes, com es comparen i s’ordenen, sumar, restar, multiplicar i dividir decimals, arrodonir i passar a fracció.'),
  resumen: L(
    ['Un número decimal tiene una parte entera y una parte decimal, separadas por la coma: en 3,75 la parte entera es 3 y la decimal, 75. Las cifras de después de la coma valen cada vez diez veces menos: la primera son décimas, la segunda centésimas y la tercera milésimas.', 'Para comparar dos decimales se mira primero la parte entera y luego cifra a cifra desde las décimas: 3,5 es mayor que 3,45 porque 5 décimas son más que 4. Añadir ceros al final no cambia el número (3,5 = 3,50), y eso ayuda a comparar y a sumar y restar colocando las comas en columna.'],
    ['A decimal number has a whole part and a decimal part, separated by the decimal point: in 3.75 the whole part is 3 and the decimal part 75. Each digit after the point is worth ten times less than the one before: the first is tenths, the second hundredths and the third thousandths.', 'To compare two decimals, look first at the whole part and then digit by digit from the tenths: 3.5 is greater than 3.45 because 5 tenths are more than 4. Adding zeros at the end does not change the number (3.5 = 3.50), which helps when comparing and when adding or subtracting with the points lined up.'],
    ['Un nombre decimal té una part entera i una part decimal, separades per la coma: a 3,75 la part entera és 3 i la decimal, 75. Les xifres de després de la coma valen cada vegada deu cops menys: la primera són dècimes, la segona centèsimes i la tercera mil·lèsimes.', 'Per comparar dos decimals es mira primer la part entera i després xifra a xifra des de les dècimes: 3,5 és més gran que 3,45 perquè 5 dècimes són més que 4. Afegir zeros al final no canvia el nombre (3,5 = 3,50), i això ajuda a comparar i a sumar i restar posant les comes en columna.'],
  ),
  puntosClave: L(
    ['Décima = 0,1; centésima = 0,01; milésima = 0,001.', 'Para comparar: parte entera y luego cifra a cifra (3,5 > 3,45).', 'Sumar y restar: las comas, en columna.', 'Multiplicar: se multiplica sin comas y se ponen tantos decimales como sumen los dos factores.', '× 10, 100, 1000: la coma se mueve a la derecha; ÷ 10, 100, 1000: a la izquierda.', 'Redondear: si la cifra siguiente es 5 o más, se sube una.'],
    ['Tenth = 0.1; hundredth = 0.01; thousandth = 0.001.', 'To compare: whole part, then digit by digit (3.5 > 3.45).', 'Adding and subtracting: line up the decimal points.', 'Multiplying: multiply without the points, then give the answer as many decimal places as the two factors have together.', '× 10, 100, 1000: the point moves right; ÷ 10, 100, 1000: left.', 'Rounding: if the next digit is 5 or more, round up.'],
    ['Dècima = 0,1; centèsima = 0,01; mil·lèsima = 0,001.', 'Per comparar: part entera i després xifra a xifra (3,5 > 3,45).', 'Sumar i restar: les comes, en columna.', 'Multiplicar: es multiplica sense comes i es posen tants decimals com sumin els dos factors.', '× 10, 100, 1000: la coma es mou a la dreta; ÷ 10, 100, 1000: a l’esquerra.', 'Arrodonir: si la xifra següent és 5 o més, se’n puja una.'],
  ),
  secciones: [
    {
      titulo: L('El valor de cada cifra: 23,475', 'The value of each digit: 23.475', 'El valor de cada xifra: 23,475'),
      tabla: {
        columnas: L(['Cifra', 'Posición', 'Vale', 'Como fracción'], ['Digit', 'Place', 'Worth', 'As a fraction'], ['Xifra', 'Posició', 'Val', 'Com a fracció']),
        filas: [
          ['2', L('decenas', 'tens', 'desenes'), '20', '—'],
          ['3', L('unidades', 'units', 'unitats'), '3', '—'],
          ['4', L('décimas', 'tenths', 'dècimes'), L('0,4', '0.4', '0,4'), '4/10'],
          ['7', L('centésimas', 'hundredths', 'centèsimes'), L('0,07', '0.07', '0,07'), '7/100'],
          ['5', L('milésimas', 'thousandths', 'mil·lèsimes'), L('0,005', '0.005', '0,005'), '5/1000'],
        ],
      },
      lista: L(
        ['Se lee «veintitrés coma cuatrocientos setenta y cinco» o «veintitrés unidades y cuatrocientas setenta y cinco milésimas».'],
        ['It is read «twenty-three point four seven five».'],
        ['Es llegeix «vint-i-tres coma quatre-cents setanta-cinc» o «vint-i-tres unitats i quatre-centes setanta-cinc mil·lèsimes».'],
      ),
    },
    {
      titulo: L('Operaciones con decimales', 'Calculating with decimals', 'Operacions amb decimals'),
      tabla: {
        columnas: L(['Operación', 'Cómo se hace', 'Ejemplo'], ['Operation', 'How to do it', 'Example'], ['Operació', 'Com es fa', 'Exemple']),
        filas: [
          [L('Suma y resta', 'Adding and subtracting', 'Suma i resta'), L('comas en columna; se rellenan huecos con ceros', 'line up the points; fill gaps with zeros', 'comes en columna; s’omplen buits amb zeros'), L('3,5 + 2,75 = 3,50 + 2,75 = 6,25', '3.5 + 2.75 = 3.50 + 2.75 = 6.25', '3,5 + 2,75 = 3,50 + 2,75 = 6,25')],
          [L('Multiplicación', 'Multiplying', 'Multiplicació'), L('sin comas, y luego tantos decimales como sumen los factores', 'without points, then as many decimal places as the factors have in total', 'sense comes, i després tants decimals com sumin els factors'), L('1,2 × 0,3 → 12 × 3 = 36 → 0,36', '1.2 × 0.3 → 12 × 3 = 36 → 0.36', '1,2 × 0,3 → 12 × 3 = 36 → 0,36')],
          [L('División entre decimal', 'Dividing by a decimal', 'Divisió entre decimal'), L('se multiplican los dos por 10, 100… hasta quitar la coma del divisor', 'multiply both by 10, 100… until the divisor has no point', 'es multipliquen tots dos per 10, 100… fins a treure la coma del divisor'), L('4,5 ÷ 0,5 = 45 ÷ 5 = 9', '4.5 ÷ 0.5 = 45 ÷ 5 = 9', '4,5 ÷ 0,5 = 45 ÷ 5 = 9')],
          [L('Por 10, 100, 1000', 'By 10, 100, 1000', 'Per 10, 100, 1000'), L('la coma, a la derecha', 'the point moves right', 'la coma, a la dreta'), L('3,45 × 100 = 345', '3.45 × 100 = 345', '3,45 × 100 = 345')],
          [L('Entre 10, 100, 1000', 'Divided by 10, 100, 1000', 'Entre 10, 100, 1000'), L('la coma, a la izquierda', 'the point moves left', 'la coma, a l’esquerra'), L('3,45 ÷ 10 = 0,345', '3.45 ÷ 10 = 0.345', '3,45 ÷ 10 = 0,345')],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Qué es mayor, 0,5 o 0,45?', 'Which is greater, 0.5 or 0.45?', 'Què és més gran, 0,5 o 0,45?'),
      r: T('0,5. Tener más cifras no hace más grande a un decimal: 0,5 = 0,50, y 50 centésimas son más que 45.', '0.5. Having more digits does not make a decimal bigger: 0.5 = 0.50, and 50 hundredths are more than 45.', '0,5. Tenir més xifres no fa més gran un decimal: 0,5 = 0,50, i 50 centèsimes són més que 45.') },
    { p: T('¿Cómo se pasa un decimal a fracción?', 'How do you turn a decimal into a fraction?', 'Com es passa un decimal a fracció?'),
      r: T('Se escribe el número sin coma arriba y un 1 seguido de tantos ceros como decimales abajo, y se simplifica: 0,75 = 75/100 = 3/4.', 'Write the number without the point on top and a 1 followed by as many zeros as there are decimal places underneath, then simplify: 0.75 = 75/100 = 3/4.', 'S’escriu el nombre sense coma a dalt i un 1 seguit de tants zeros com decimals a baix, i se simplifica: 0,75 = 75/100 = 3/4.') },
  ],
  ejercicios: [
    { e: T('Ordena de menor a mayor: 2,5 · 2,45 · 2,405 · 2,54.', 'Put in order from smallest to largest: 2.5 · 2.45 · 2.405 · 2.54.', 'Ordena de petit a gran: 2,5 · 2,45 · 2,405 · 2,54.'),
      s: T('2,405 < 2,45 < 2,5 < 2,54 (igualando decimales: 2,405 · 2,450 · 2,500 · 2,540).', '2.405 < 2.45 < 2.5 < 2.54 (padding with zeros: 2.405 · 2.450 · 2.500 · 2.540).', '2,405 < 2,45 < 2,5 < 2,54 (igualant decimals: 2,405 · 2,450 · 2,500 · 2,540).') },
    { e: T('Calcula 12,8 + 3,45 y 10 − 2,75.', 'Work out 12.8 + 3.45 and 10 − 2.75.', 'Calcula 12,8 + 3,45 i 10 − 2,75.'),
      s: T('12,80 + 3,45 = 16,25. 10,00 − 2,75 = 7,25.', '12.80 + 3.45 = 16.25. 10.00 − 2.75 = 7.25.', '12,80 + 3,45 = 16,25. 10,00 − 2,75 = 7,25.') },
    { e: T('Calcula 2,5 × 0,4.', 'Work out 2.5 × 0.4.', 'Calcula 2,5 × 0,4.'),
      s: T('25 × 4 = 100; los factores suman dos decimales: 1,00 = 1.', '25 × 4 = 100; the factors have two decimal places in total: 1.00 = 1.', '25 × 4 = 100; els factors sumen dos decimals: 1,00 = 1.') },
    { e: T('Calcula 7,2 ÷ 0,6.', 'Work out 7.2 ÷ 0.6.', 'Calcula 7,2 ÷ 0,6.'),
      s: T('Multiplicando los dos por 10: 72 ÷ 6 = 12.', 'Multiplying both by 10: 72 ÷ 6 = 12.', 'Multiplicant tots dos per 10: 72 ÷ 6 = 12.') },
    { e: T('Redondea 3,476 a las décimas y a las centésimas.', 'Round 3.476 to one and to two decimal places.', 'Arrodoneix 3,476 a les dècimes i a les centèsimes.'),
      s: T('A las décimas: 3,5 (la cifra siguiente es 7). A las centésimas: 3,48 (la siguiente es 6).', 'To one decimal place: 3.5 (the next digit is 7). To two: 3.48 (the next is 6).', 'A les dècimes: 3,5 (la xifra següent és 7). A les centèsimes: 3,48 (la següent és 6).') },
    { e: T('Escribe como fracción irreducible: 0,6 y 0,125.', 'Write as a fraction in its simplest form: 0.6 and 0.125.', 'Escriu com a fracció irreductible: 0,6 i 0,125.'),
      s: '0,6 = 6/10 = 3/5;  0,125 = 125/1000 = 1/8' },
  ],
}

export const MATEMATICAS_TEMA = {
  proporcionalidad,
  'numeros-romanos': numerosRomanos,
  'teorema-de-pitagoras': pitagoras,
  'sistemas-de-ecuaciones': sistemas,
  'numeros-decimales': decimales,
  'ecuaciones-de-segundo-grado': segundoGrado,
  'cuerpos-geometricos': cuerposGeometricos,
}
