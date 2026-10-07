// Potencias, raíces y notación científica — Matemáticas de 6.º de Primaria a
// 4.º de ESO. Base y exponente, cuadrados y cubos, potencias de 10, raíz
// cuadrada, propiedades (producto, cociente, potencia de potencia), exponente
// cero y negativo, signos, notación científica y exponentes fraccionarios.
//
// Ninguna opción equivocada vale lo mismo que la buena escrita de otra forma
// (nada de «9⁴» junto a «3⁸»): el test lo comprueba evaluando las potencias.
//
// La respuesta buena va siempre la PRIMERA en `opciones`: ExamenMC baraja el
// orden al servir cada pregunta (lib/ordenOpciones.js).
function q(id, nivel, emoji, pregunta, opciones, explicacion) {
  const correcta = { es: opciones.es[0], en: opciones.en[0], ca: opciones.ca[0] }
  return { id, nivel, emoji, pregunta, opciones, correcta, explicacion }
}
const T = (es, en, ca) => ({ es, en, ca })
const O = (es, en, ca) => ({ es, en, ca })
// Opciones con números: iguales en los tres idiomas salvo la coma decimal y
// el separador de miles (espacio en es/ca, coma en inglés).
const N = (...xs) => ({ es: xs, en: xs.map(x => x.replace(/(\d),(\d)/g, '$1.$2').replace(/(\d) (\d{3})/g, '$1,$2')), ca: xs })

export const PREGUNTAS = [
  // ── Primaria ────────────────────────────────────────────────────────────
  q('po-01', 'primaria', '🔢',
    T('¿Cuánto es 2³?', 'What is 2³?', 'Quant és 2³?'),
    N('8', '6', '9', '5'),
    T('2³ = 2 · 2 · 2 = 8: la base (2) se multiplica por sí misma tantas veces como dice el exponente (3). El 6 sale de multiplicar 2 · 3, que es el error más frecuente.', '2³ = 2 · 2 · 2 = 8: the base (2) is multiplied by itself as many times as the exponent says (3). 6 comes from 2 · 3, the most common mistake.', '2³ = 2 · 2 · 2 = 8: la base (2) es multiplica per si mateixa tantes vegades com diu l’exponent (3). El 6 surt de multiplicar 2 · 3, que és l’error més freqüent.')),
  q('po-02', 'primaria', '❓',
    T('En la potencia 5⁴, ¿qué indica el 4?', 'In the power 5⁴, what does the 4 mean?', 'En la potència 5⁴, què indica el 4?'),
    O(['Cuántas veces se multiplica el 5 por sí mismo', 'Que hay que multiplicar 5 por 4', 'Que hay que sumar 5 cuatro veces', 'Que el resultado tiene 4 cifras'], ['How many times 5 is multiplied by itself', 'That 5 must be multiplied by 4', 'That 5 must be added four times', 'That the result has 4 digits'], ['Quantes vegades es multiplica el 5 per si mateix', 'Que cal multiplicar 5 per 4', 'Que cal sumar 5 quatre vegades', 'Que el resultat té 4 xifres']),
    T('El 4 es el exponente: 5⁴ = 5 · 5 · 5 · 5 = 625. Sumar 5 cuatro veces es 5 · 4 = 20, que es otra cosa.', 'The 4 is the exponent: 5⁴ = 5 · 5 · 5 · 5 = 625. Adding 5 four times is 5 · 4 = 20, which is something else.', 'El 4 és l’exponent: 5⁴ = 5 · 5 · 5 · 5 = 625. Sumar 5 quatre vegades és 5 · 4 = 20, que és una altra cosa.')),
  q('po-03', 'primaria', '🔟',
    T('¿Cuánto es 10⁴?', 'What is 10⁴?', 'Quant és 10⁴?'),
    N('10 000', '40', '1000', '100 000'),
    T('Una potencia de 10 es un 1 seguido de tantos ceros como indica el exponente: 10⁴ = 10 000.', 'A power of 10 is a 1 followed by as many zeros as the exponent says: 10⁴ = 10,000.', 'Una potència de 10 és un 1 seguit de tants zeros com indica l’exponent: 10⁴ = 10 000.')),
  q('po-04', 'primaria', '√',
    T('¿Cuánto es √49?', 'What is √49?', 'Quant és √49?'),
    N('7', '24,5', '9', '49'),
    T('La raíz cuadrada de 49 es el número que, multiplicado por sí mismo, da 49: 7 · 7 = 49. El 24,5 es la mitad, que no tiene nada que ver.', 'The square root of 49 is the number that, multiplied by itself, gives 49: 7 · 7 = 49. 24.5 is half of it, which is unrelated.', 'L’arrel quadrada de 49 és el nombre que, multiplicat per si mateix, dona 49: 7 · 7 = 49. El 24,5 és la meitat, que no hi té res a veure.')),
  q('po-05', 'primaria', '⬛',
    T('¿Cuál es el cuadrado de 9?', 'What is 9 squared?', 'Quin és el quadrat de 9?'),
    N('81', '18', '3', '99'),
    T('El cuadrado de 9 es 9² = 9 · 9 = 81. El 18 sería 9 · 2 y el 3 es su raíz cuadrada.', '9 squared is 9² = 9 · 9 = 81. 18 would be 9 · 2 and 3 is its square root.', 'El quadrat de 9 és 9² = 9 · 9 = 81. El 18 seria 9 · 2 i el 3 és la seva arrel quadrada.')),
  q('po-06', 'primaria', '🧊',
    T('¿Cuál es el cubo de 3?', 'What is 3 cubed?', 'Quin és el cub de 3?'),
    N('27', '9', '6', '81'),
    T('3³ = 3 · 3 · 3 = 27, que es el número de cubitos de un cubo de 3 de lado. El 9 es el cuadrado y el 81, 3⁴.', '3³ = 3 · 3 · 3 = 27, the number of small cubes in a cube 3 units across. 9 is the square and 81 is 3⁴.', '3³ = 3 · 3 · 3 = 27, que és el nombre de cubets d’un cub de 3 de costat. El 9 és el quadrat i el 81, 3⁴.')),
  q('po-07', 'primaria', '1️⃣',
    T('¿Cuánto es 7¹?', 'What is 7¹?', 'Quant és 7¹?'),
    N('7', '1', '0', '49'),
    T('Cualquier número elevado a 1 es el mismo número: la base aparece una sola vez.', 'Any number to the power of 1 is the same number: the base appears just once.', 'Qualsevol nombre elevat a 1 és el mateix nombre: la base hi apareix una sola vegada.')),
  q('po-08', 'primaria', '0️⃣',
    T('¿Cuánto es 5⁰?', 'What is 5⁰?', 'Quant és 5⁰?'),
    N('1', '0', '5', '50'),
    T('Cualquier número distinto de cero elevado a 0 vale 1. Se ve dividiendo: 5³ ÷ 5³ = 1, y por la regla de restar exponentes también es 5⁰.', 'Any non-zero number to the power of 0 is 1. You can see it by dividing: 5³ ÷ 5³ = 1, and by the rule of subtracting exponents it is also 5⁰.', 'Qualsevol nombre diferent de zero elevat a 0 val 1. Es veu dividint: 5³ ÷ 5³ = 1, i per la regla de restar exponents també és 5⁰.')),
  q('po-09', 'primaria', '🔍',
    T('¿Qué número elevado al cuadrado da 64?', 'Which number squared gives 64?', 'Quin nombre elevat al quadrat dona 64?'),
    N('8', '32', '16', '6'),
    T('8² = 64, así que √64 = 8. El 32 es la mitad de 64 y el 16 es su cuarta parte.', '8² = 64, so √64 = 8. 32 is half of 64 and 16 a quarter of it.', '8² = 64, així que √64 = 8. El 32 és la meitat de 64 i el 16 n’és la quarta part.')),
  q('po-10', 'primaria', '🧱',
    T('¿Cómo se descompone 3456 con potencias de 10?', 'How do you break down 3456 using powers of 10?', 'Com es descompon 3456 amb potències de 10?'),
    N('3 · 10³ + 4 · 10² + 5 · 10 + 6', '3 · 10⁴ + 4 · 10³ + 5 · 10² + 6', '3 · 10³ + 4 · 10² + 5 · 10² + 6', '3 + 4 · 10 + 5 · 10² + 6 · 10³'),
    T('El 3 son millares (10³ = 1000), el 4 centenas (10²), el 5 decenas (10) y el 6 unidades: 3000 + 400 + 50 + 6.', 'The 3 is thousands (10³ = 1000), the 4 hundreds (10²), the 5 tens (10) and the 6 units: 3000 + 400 + 50 + 6.', 'El 3 són milers (10³ = 1000), el 4 centenes (10²), el 5 desenes (10) i el 6 unitats: 3000 + 400 + 50 + 6.')),

  // ── ESO ─────────────────────────────────────────────────────────────────
  q('po-11', 'eso', '✖️',
    T('¿A qué es igual 2³ · 2⁴?', 'What is 2³ · 2⁴ equal to?', 'A què és igual 2³ · 2⁴?'),
    N('2⁷', '2¹²', '4⁷', '4¹²'),
    T('Producto de potencias de la misma base: se deja la base y se suman los exponentes, 2³⁺⁴ = 2⁷ = 128. Multiplicar los exponentes (2¹²) es el error típico.', 'Product of powers with the same base: keep the base and add the exponents, 2³⁺⁴ = 2⁷ = 128. Multiplying the exponents (2¹²) is the typical mistake.', 'Producte de potències de la mateixa base: es deixa la base i se sumen els exponents, 2³⁺⁴ = 2⁷ = 128. Multiplicar els exponents (2¹²) és l’error típic.')),
  q('po-12', 'eso', '➗',
    T('¿A qué es igual 5⁸ ÷ 5³?', 'What is 5⁸ ÷ 5³ equal to?', 'A què és igual 5⁸ ÷ 5³?'),
    N('5⁵', '5¹¹', '1⁵', '5²⁴'),
    T('Cociente de potencias de la misma base: se restan los exponentes, 5⁸⁻³ = 5⁵. La base no se divide (1⁵ sería 1).', 'Quotient of powers with the same base: subtract the exponents, 5⁸⁻³ = 5⁵. The base is not divided (1⁵ would be 1).', 'Quocient de potències de la mateixa base: es resten els exponents, 5⁸⁻³ = 5⁵. La base no es divideix (1⁵ seria 1).')),
  q('po-13', 'eso', '🏗️',
    T('¿A qué es igual (3²)⁴?', 'What is (3²)⁴ equal to?', 'A què és igual (3²)⁴?'),
    N('3⁸', '3⁶', '3¹⁶', '6⁸'),
    T('Potencia de una potencia: se multiplican los exponentes, 3²·⁴ = 3⁸. Sumarlos (3⁶) es confundir con el producto de potencias.', 'Power of a power: multiply the exponents, 3²·⁴ = 3⁸. Adding them (3⁶) confuses it with the product of powers.', 'Potència d’una potència: es multipliquen els exponents, 3²·⁴ = 3⁸. Sumar-los (3⁶) és confondre-ho amb el producte de potències.')),
  q('po-14', 'eso', '➖',
    T('¿Cuánto vale 2⁻³?', 'What is 2⁻³?', 'Quant val 2⁻³?'),
    N('1/8', '−8', '−6', '1/6'),
    T('Un exponente negativo significa «uno partido por»: 2⁻³ = 1/2³ = 1/8. No hace negativo el resultado.', 'A negative exponent means "one over": 2⁻³ = 1/2³ = 1/8. It does not make the result negative.', 'Un exponent negatiu vol dir «u partit per»: 2⁻³ = 1/2³ = 1/8. No fa negatiu el resultat.')),
  q('po-15', 'eso', '±',
    T('¿Cuánto vale (−2)⁴?', 'What is (−2)⁴?', 'Quant val (−2)⁴?'),
    N('16', '−16', '−8', '8'),
    T('(−2) · (−2) · (−2) · (−2) = 16: con exponente par, el signo menos desaparece. Ojo: sin paréntesis, −2⁴ = −(2⁴) = −16.', '(−2) · (−2) · (−2) · (−2) = 16: with an even exponent, the minus sign disappears. Careful: without brackets, −2⁴ = −(2⁴) = −16.', '(−2) · (−2) · (−2) · (−2) = 16: amb exponent parell, el signe menys desapareix. Compte: sense parèntesis, −2⁴ = −(2⁴) = −16.')),
  q('po-16', 'eso', '🔭',
    T('¿Cómo se escribe 45 000 000 en notación científica?', 'How is 45,000,000 written in scientific notation?', 'Com s’escriu 45 000 000 en notació científica?'),
    N('4,5 · 10⁷', '4,5 · 10⁶', '4,5 · 10⁸', '45 · 10⁷'),
    T('En notación científica el primer número va entre 1 y 10: 4,5, y la coma se ha movido 7 lugares, así que 10⁷. 45 · 10⁷ vale diez veces más.', 'In scientific notation the first number is between 1 and 10: 4.5, and the decimal point has moved 7 places, so 10⁷. 45 · 10⁷ is ten times as much.', 'En notació científica el primer nombre va entre 1 i 10: 4,5, i la coma s’ha mogut 7 llocs, així que 10⁷. 45 · 10⁷ val deu vegades més.')),
  q('po-17', 'eso', '🦠',
    T('¿Cómo se escribe 0,00032 en notación científica?', 'How is 0.00032 written in scientific notation?', 'Com s’escriu 0,00032 en notació científica?'),
    N('3,2 · 10⁻⁴', '3,2 · 10⁻³', '3,2 · 10⁴', '3,2 · 10⁻⁵'),
    T('Para llegar a 3,2 la coma se mueve 4 lugares a la derecha, así que el exponente es −4. Los números menores que 1 tienen exponente negativo.', 'To reach 3.2 the decimal point moves 4 places to the right, so the exponent is −4. Numbers smaller than 1 have a negative exponent.', 'Per arribar a 3,2 la coma es mou 4 llocs a la dreta, així que l’exponent és −4. Els nombres menors que 1 tenen exponent negatiu.')),
  q('po-18', 'eso', '🚀',
    T('¿Cuánto es (3 · 10⁴) · (2 · 10⁵)?', 'What is (3 · 10⁴) · (2 · 10⁵)?', 'Quant és (3 · 10⁴) · (2 · 10⁵)?'),
    N('6 · 10⁹', '6 · 10²⁰', '5 · 10⁹', '6 · 10¹'),
    T('Se multiplican los números (3 · 2 = 6) y se suman los exponentes de 10 (4 + 5 = 9): 6 · 10⁹.', 'Multiply the numbers (3 · 2 = 6) and add the exponents of 10 (4 + 5 = 9): 6 · 10⁹.', 'Es multipliquen els nombres (3 · 2 = 6) i se sumen els exponents de 10 (4 + 5 = 9): 6 · 10⁹.')),
  q('po-19', 'eso', '📉',
    T('¿Cuánto es (8 · 10⁶) ÷ (2 · 10²)?', 'What is (8 · 10⁶) ÷ (2 · 10²)?', 'Quant és (8 · 10⁶) ÷ (2 · 10²)?'),
    N('4 · 10⁴', '4 · 10³', '6 · 10⁴', '4 · 10⁸'),
    T('Se dividen los números (8 ÷ 2 = 4) y se restan los exponentes (6 − 2 = 4): 4 · 10⁴.', 'Divide the numbers (8 ÷ 2 = 4) and subtract the exponents (6 − 2 = 4): 4 · 10⁴.', 'Es divideixen els nombres (8 ÷ 2 = 4) i es resten els exponents (6 − 2 = 4): 4 · 10⁴.')),
  q('po-20', 'eso', '√',
    T('¿Cuánto es √(16 · 25)?', 'What is √(16 · 25)?', 'Quant és √(16 · 25)?'),
    N('20', '41', '400', '9'),
    T('La raíz de un producto es el producto de las raíces: √16 · √25 = 4 · 5 = 20. Con la suma no funciona: √(16 + 25) = √41, no 9.', 'The root of a product is the product of the roots: √16 · √25 = 4 · 5 = 20. It does not work with a sum: √(16 + 25) = √41, not 9.', 'L’arrel d’un producte és el producte de les arrels: √16 · √25 = 4 · 5 = 20. Amb la suma no funciona: √(16 + 25) = √41, no 9.')),
  q('po-21', 'eso', '🔣',
    T('¿Cuánto vale 9^(1/2)?', 'What is 9^(1/2)?', 'Quant val 9^(1/2)?'),
    N('3', '4,5', '81', '1/9'),
    T('Un exponente 1/2 es una raíz cuadrada: 9^(1/2) = √9 = 3. No es la mitad (4,5).', 'An exponent of 1/2 is a square root: 9^(1/2) = √9 = 3. It is not half (4.5).', 'Un exponent 1/2 és una arrel quadrada: 9^(1/2) = √9 = 3. No és la meitat (4,5).')),
  q('po-22', 'eso', '🔣',
    T('¿Cuánto vale 8^(2/3)?', 'What is 8^(2/3)?', 'Quant val 8^(2/3)?'),
    N('4', '16', '2', '5,33'),
    T('8^(2/3) = (∛8)² = 2² = 4: el denominador es el índice de la raíz y el numerador, el exponente. El 2 es solo la raíz cúbica; el 5,33 sale de multiplicar 8 · 2/3.', '8^(2/3) = (∛8)² = 2² = 4: the denominator is the root index and the numerator is the power. 2 is just the cube root; 5.33 comes from 8 · 2/3.', '8^(2/3) = (∛8)² = 2² = 4: el denominador és l’índex de l’arrel i el numerador, l’exponent. El 2 és només l’arrel cúbica; el 5,33 surt de multiplicar 8 · 2/3.')),
  q('po-23', 'eso', '📐',
    T('¿A qué es igual (a + b)²?', 'What is (a + b)² equal to?', 'A què és igual (a + b)²?'),
    N('a² + 2ab + b²', 'a² + b²', 'a² + ab + b²', '2a + 2b'),
    T('Es una identidad notable: (a + b)(a + b) = a² + ab + ab + b² = a² + 2ab + b². Con a = b = 1 se ve que a² + b² falla: (1 + 1)² = 4, no 2.', 'It is a special product: (a + b)(a + b) = a² + ab + ab + b² = a² + 2ab + b². With a = b = 1 you can see a² + b² fails: (1 + 1)² = 4, not 2.', 'És una identitat notable: (a + b)(a + b) = a² + ab + ab + b² = a² + 2ab + b². Amb a = b = 1 es veu que a² + b² falla: (1 + 1)² = 4, no 2.')),
  q('po-24', 'eso', '🏆',
    T('¿Cuál de estos números es el mayor?', 'Which of these numbers is the largest?', 'Quin d’aquests nombres és el més gran?'),
    N('3 · 10⁻⁵', '5 · 10⁻⁶', '9 · 10⁻⁷', '1 · 10⁻⁶'),
    T('Con exponentes negativos manda el exponente más cercano a cero: 10⁻⁵ es diez veces mayor que 10⁻⁶. 3 · 10⁻⁵ = 0,00003, mayor que 5 · 10⁻⁶ = 0,000005.', 'With negative exponents, the exponent closest to zero wins: 10⁻⁵ is ten times bigger than 10⁻⁶. 3 · 10⁻⁵ = 0.00003, bigger than 5 · 10⁻⁶ = 0.000005.', 'Amb exponents negatius mana l’exponent més proper a zero: 10⁻⁵ és deu vegades més gran que 10⁻⁶. 3 · 10⁻⁵ = 0,00003, més gran que 5 · 10⁻⁶ = 0,000005.')),
]

export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
export const PREGUNTAS_ESO = PREGUNTAS
