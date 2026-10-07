// Sucesiones y progresiones — Matemáticas de 3.º-4.º de ESO y 1.º de
// Bachillerato. Patrones, progresiones aritméticas y geométricas, término
// general, término n-ésimo, sumas (también la infinita), interés compuesto,
// límites sencillos y monotonía.
//
// Todas las cuentas las rehace el test. Los distractores son los fallos de
// siempre: contar una diferencia de más (n en vez de n − 1), olvidar dividir
// entre 2 en la suma, confundir diferencia con razón.
//
// La respuesta buena va siempre la PRIMERA en `opciones`: ExamenMC baraja el
// orden al servir cada pregunta (lib/ordenOpciones.js).
function q(id, nivel, emoji, pregunta, opciones, explicacion) {
  const correcta = { es: opciones.es[0], en: opciones.en[0], ca: opciones.ca[0] }
  return { id, nivel, emoji, pregunta, opciones, correcta, explicacion }
}
const T = (es, en, ca) => ({ es, en, ca })
const O = (es, en, ca) => ({ es, en, ca })
const N = (...xs) => ({ es: xs, en: xs.map(x => x.replace(/(\d),(\d)/g, '$1.$2').replace(/(\d) (\d{3})/g, '$1,$2')), ca: xs })

export const PREGUNTAS = [
  // ── ESO ─────────────────────────────────────────────────────────────────
  q('su-01', 'eso', '➡️',
    T('¿Qué término sigue en 3, 7, 11, 15, …?', 'What comes next in 3, 7, 11, 15, …?', 'Quin terme segueix a 3, 7, 11, 15, …?'),
    N('19', '18', '20', '30'),
    T('Cada término suma 4 al anterior: 15 + 4 = 19. Es una progresión aritmética de diferencia 4.', 'Each term adds 4 to the previous one: 15 + 4 = 19. It is an arithmetic sequence with common difference 4.', 'Cada terme suma 4 a l’anterior: 15 + 4 = 19. És una progressió aritmètica de diferència 4.')),
  q('su-02', 'eso', '➡️',
    T('¿Qué término sigue en 2, 6, 18, 54, …?', 'What comes next in 2, 6, 18, 54, …?', 'Quin terme segueix a 2, 6, 18, 54, …?'),
    N('162', '90', '108', '72'),
    T('Cada término se multiplica por 3: 54 · 3 = 162. Es una progresión geométrica de razón 3. El 90 sale de sumar la última diferencia (36) en vez de multiplicar.', 'Each term is multiplied by 3: 54 · 3 = 162. It is a geometric sequence with common ratio 3. 90 comes from adding the last difference (36) instead of multiplying.', 'Cada terme es multiplica per 3: 54 · 3 = 162. És una progressió geomètrica de raó 3. El 90 surt de sumar l’última diferència (36) en lloc de multiplicar.')),
  q('su-03', 'eso', '🧩',
    T('¿Qué tipo de sucesión es 5, 8, 11, 14, …?', 'What kind of sequence is 5, 8, 11, 14, …?', 'Quin tipus de successió és 5, 8, 11, 14, …?'),
    O(['Progresión aritmética de diferencia 3', 'Progresión geométrica de razón 3', 'Progresión aritmética de diferencia 5', 'No es una progresión'], ['Arithmetic sequence with difference 3', 'Geometric sequence with ratio 3', 'Arithmetic sequence with difference 5', 'It is not a progression'], ['Progressió aritmètica de diferència 3', 'Progressió geomètrica de raó 3', 'Progressió aritmètica de diferència 5', 'No és una progressió']),
    T('Siempre se suma lo mismo (3): aritmética. En una geométrica se multiplica siempre por lo mismo. El 5 es el primer término, no la diferencia.', 'The same amount (3) is always added: arithmetic. In a geometric one you always multiply by the same number. 5 is the first term, not the difference.', 'Sempre se suma el mateix (3): aritmètica. En una geomètrica es multiplica sempre pel mateix. El 5 és el primer terme, no la diferència.')),
  q('su-04', 'eso', '🧩',
    T('¿Qué tipo de sucesión es 3, 6, 12, 24, …?', 'What kind of sequence is 3, 6, 12, 24, …?', 'Quin tipus de successió és 3, 6, 12, 24, …?'),
    O(['Progresión geométrica de razón 2', 'Progresión aritmética de diferencia 3', 'Progresión geométrica de razón 3', 'Progresión aritmética de diferencia 2'], ['Geometric sequence with ratio 2', 'Arithmetic sequence with difference 3', 'Geometric sequence with ratio 3', 'Arithmetic sequence with difference 2'], ['Progressió geomètrica de raó 2', 'Progressió aritmètica de diferència 3', 'Progressió geomètrica de raó 3', 'Progressió aritmètica de diferència 2']),
    T('Cada término es el doble del anterior: razón 2. Las diferencias (3, 6, 12) no son constantes, así que no es aritmética.', 'Each term is double the previous one: ratio 2. The differences (3, 6, 12) are not constant, so it is not arithmetic.', 'Cada terme és el doble de l’anterior: raó 2. Les diferències (3, 6, 12) no són constants, així que no és aritmètica.')),
  q('su-05', 'eso', '🔢',
    T('Si el término general es aₙ = 2n + 1, ¿cuánto vale a₅?', 'If the general term is aₙ = 2n + 1, what is a₅?', 'Si el terme general és aₙ = 2n + 1, quant val a₅?'),
    N('11', '10', '13', '7'),
    T('Se sustituye n por 5: a₅ = 2 · 5 + 1 = 11.', 'Substitute n = 5: a₅ = 2 · 5 + 1 = 11.', 'Se substitueix n per 5: a₅ = 2 · 5 + 1 = 11.')),
  q('su-06', 'eso', '🐚',
    T('¿Qué número sigue en 1, 1, 2, 3, 5, 8, …?', 'What number comes next in 1, 1, 2, 3, 5, 8, …?', 'Quin nombre segueix a 1, 1, 2, 3, 5, 8, …?'),
    N('13', '11', '16', '10'),
    T('Es la sucesión de Fibonacci: cada término es la suma de los dos anteriores, 5 + 8 = 13. Aparece en las espirales de las piñas y los girasoles.', 'It is the Fibonacci sequence: each term is the sum of the previous two, 5 + 8 = 13. It appears in the spirals of pine cones and sunflowers.', 'És la successió de Fibonacci: cada terme és la suma dels dos anteriors, 5 + 8 = 13. Apareix a les espirals de les pinyes i els gira-sols.')),
  q('su-07', 'eso', '⬛',
    T('¿Qué número sigue en 1, 4, 9, 16, …?', 'What number comes next in 1, 4, 9, 16, …?', 'Quin nombre segueix a 1, 4, 9, 16, …?'),
    N('25', '20', '24', '32'),
    T('Son los cuadrados perfectos: 1², 2², 3², 4²… El siguiente es 5² = 25. Las diferencias (3, 5, 7, 9) son los impares.', 'They are the perfect squares: 1², 2², 3², 4²… The next is 5² = 25. The differences (3, 5, 7, 9) are the odd numbers.', 'Són els quadrats perfectes: 1², 2², 3², 4²… El següent és 5² = 25. Les diferències (3, 5, 7, 9) són els senars.')),
  q('su-08', 'eso', '🔟',
    T('En una progresión aritmética, a₁ = 4 y d = 3. ¿Cuánto vale a₁₀?', 'In an arithmetic sequence, a₁ = 4 and d = 3. What is a₁₀?', 'En una progressió aritmètica, a₁ = 4 i d = 3. Quant val a₁₀?'),
    N('31', '34', '30', '40'),
    T('aₙ = a₁ + (n − 1) · d = 4 + 9 · 3 = 31. Del primero al décimo hay nueve saltos, no diez: con 10 saltos sale 34.', 'aₙ = a₁ + (n − 1) · d = 4 + 9 · 3 = 31. From the first to the tenth there are nine steps, not ten: with 10 steps you get 34.', 'aₙ = a₁ + (n − 1) · d = 4 + 9 · 3 = 31. Del primer al desè hi ha nou salts, no deu: amb 10 salts surt 34.')),
  q('su-09', 'eso', '✏️',
    T('¿Cuál es el término general de 2, 5, 8, 11, …?', 'What is the general term of 2, 5, 8, 11, …?', 'Quin és el terme general de 2, 5, 8, 11, …?'),
    N('aₙ = 3n − 1', 'aₙ = 3n + 2', 'aₙ = n + 3', 'aₙ = 3n'),
    T('Diferencia 3 y primer término 2: aₙ = 2 + (n − 1) · 3 = 3n − 1. Comprobación: n = 1 da 2 y n = 4 da 11.', 'Difference 3 and first term 2: aₙ = 2 + (n − 1) · 3 = 3n − 1. Check: n = 1 gives 2 and n = 4 gives 11.', 'Diferència 3 i primer terme 2: aₙ = 2 + (n − 1) · 3 = 3n − 1. Comprovació: n = 1 dona 2 i n = 4 dona 11.')),
  q('su-10', 'eso', '🧒',
    T('¿Cuánto suman todos los números del 1 al 100?', 'What is the sum of all the numbers from 1 to 100?', 'Quant sumen tots els nombres de l’1 al 100?'),
    N('5050', '5000', '10 100', '4950'),
    T('El truco de Gauss: se emparejan 1 + 100, 2 + 99… y cada pareja suma 101. Hay 50 parejas: 50 · 101 = 5050. Es la suma de una progresión aritmética, (a₁ + aₙ) · n ÷ 2.', 'Gauss’s trick: pair 1 + 100, 2 + 99… and each pair adds up to 101. There are 50 pairs: 50 · 101 = 5050. It is the sum of an arithmetic sequence, (a₁ + aₙ) · n ÷ 2.', 'El truc de Gauss: s’aparellen 1 + 100, 2 + 99… i cada parella suma 101. Hi ha 50 parelles: 50 · 101 = 5050. És la suma d’una progressió aritmètica, (a₁ + aₙ) · n ÷ 2.')),
  q('su-11', 'eso', '📈',
    T('En una progresión geométrica, a₁ = 3 y r = 2. ¿Cuánto vale a₆?', 'In a geometric sequence, a₁ = 3 and r = 2. What is a₆?', 'En una progressió geomètrica, a₁ = 3 i r = 2. Quant val a₆?'),
    N('96', '192', '13', '48'),
    T('aₙ = a₁ · rⁿ⁻¹ = 3 · 2⁵ = 96. Con 2⁶ sale 192 (un salto de más), y el 13 sale de sumar en vez de multiplicar.', 'aₙ = a₁ · rⁿ⁻¹ = 3 · 2⁵ = 96. With 2⁶ you get 192 (one step too many), and 13 comes from adding instead of multiplying.', 'aₙ = a₁ · rⁿ⁻¹ = 3 · 2⁵ = 96. Amb 2⁶ surt 192 (un salt de més), i el 13 surt de sumar en lloc de multiplicar.')),
  q('su-12', 'eso', '📉',
    T('¿Cuál es la razón de la progresión 80, 40, 20, 10, …?', 'What is the common ratio of 80, 40, 20, 10, …?', 'Quina és la raó de la progressió 80, 40, 20, 10, …?'),
    N('1/2', '2', '−40', '−1/2'),
    T('Cada término es la mitad del anterior: se multiplica por 1/2. La razón no es negativa: los términos bajan, pero todos son positivos.', 'Each term is half the previous one: multiply by 1/2. The ratio is not negative: the terms go down, but they are all positive.', 'Cada terme és la meitat de l’anterior: es multiplica per 1/2. La raó no és negativa: els termes baixen, però tots són positius.')),

  // ── Bachillerato ────────────────────────────────────────────────────────
  q('su-13', 'bachillerato', '➕',
    T('En una progresión aritmética, a₁ = 5 y d = 4. ¿Cuánto suman los 10 primeros términos?', 'In an arithmetic sequence, a₁ = 5 and d = 4. What is the sum of the first 10 terms?', 'En una progressió aritmètica, a₁ = 5 i d = 4. Quant sumen els 10 primers termes?'),
    N('230', '460', '205', '410'),
    T('Primero a₁₀ = 5 + 9 · 4 = 41. Luego S₁₀ = (a₁ + a₁₀) · 10 ÷ 2 = 46 · 5 = 230. Sin dividir entre 2 sale 460.', 'First a₁₀ = 5 + 9 · 4 = 41. Then S₁₀ = (a₁ + a₁₀) · 10 ÷ 2 = 46 · 5 = 230. Without dividing by 2 you get 460.', 'Primer a₁₀ = 5 + 9 · 4 = 41. Després S₁₀ = (a₁ + a₁₀) · 10 ÷ 2 = 46 · 5 = 230. Sense dividir entre 2 surt 460.')),
  q('su-14', 'bachillerato', '➕',
    T('¿Cuánto suman los 4 primeros términos de la progresión geométrica con a₁ = 2 y r = 3?', 'What is the sum of the first 4 terms of the geometric sequence with a₁ = 2 and r = 3?', 'Quant sumen els 4 primers termes de la progressió geomètrica amb a₁ = 2 i r = 3?'),
    N('80', '54', '162', '240'),
    T('Sₙ = a₁ · (rⁿ − 1) ÷ (r − 1) = 2 · (81 − 1) ÷ 2 = 80. Comprobación: 2 + 6 + 18 + 54 = 80. El 54 es solo el cuarto término.', 'Sₙ = a₁ · (rⁿ − 1) ÷ (r − 1) = 2 · (81 − 1) ÷ 2 = 80. Check: 2 + 6 + 18 + 54 = 80. 54 is just the fourth term.', 'Sₙ = a₁ · (rⁿ − 1) ÷ (r − 1) = 2 · (81 − 1) ÷ 2 = 80. Comprovació: 2 + 6 + 18 + 54 = 80. El 54 és només el quart terme.')),
  q('su-15', 'bachillerato', '♾️',
    T('¿Cuánto vale la suma infinita 8 + 4 + 2 + 1 + …?', 'What is the infinite sum 8 + 4 + 2 + 1 + …?', 'Quant val la suma infinita 8 + 4 + 2 + 1 + …?'),
    N('16', '15', '∞', '32'),
    T('Es geométrica de razón 1/2 y, como |r| < 1, la suma es finita: S = a₁ ÷ (1 − r) = 8 ÷ (1/2) = 16. Los términos se van haciendo tan pequeños que nunca se pasa de 16.', 'It is geometric with ratio 1/2 and, since |r| < 1, the sum is finite: S = a₁ ÷ (1 − r) = 8 ÷ (1/2) = 16. The terms get so small that the total never goes past 16.', 'És geomètrica de raó 1/2 i, com que |r| < 1, la suma és finita: S = a₁ ÷ (1 − r) = 8 ÷ (1/2) = 16. Els termes es fan tan petits que mai no es passa de 16.')),
  q('su-16', 'bachillerato', '♾️',
    T('¿Cuándo tiene suma finita una progresión geométrica infinita?', 'When does an infinite geometric sequence have a finite sum?', 'Quan té suma finita una progressió geomètrica infinita?'),
    O(['Cuando el valor absoluto de la razón es menor que 1', 'Cuando la razón es mayor que 1', 'Cuando la razón es exactamente 1', 'Siempre'], ['When the absolute value of the ratio is less than 1', 'When the ratio is greater than 1', 'When the ratio is exactly 1', 'Always'], ['Quan el valor absolut de la raó és menor que 1', 'Quan la raó és més gran que 1', 'Quan la raó és exactament 1', 'Sempre']),
    T('Solo si |r| < 1 los términos tienden a 0 lo bastante deprisa. Con r = 1 se suma siempre lo mismo y la suma crece sin fin.', 'Only if |r| < 1 do the terms shrink towards 0 fast enough. With r = 1 the same amount is added every time and the sum grows forever.', 'Només si |r| < 1 els termes tendeixen a 0 prou de pressa. Amb r = 1 se suma sempre el mateix i la suma creix sense fi.')),
  q('su-17', 'bachillerato', '🏦',
    T('Se ingresan 1000 € al 5 % de interés compuesto anual. ¿Cuánto hay al cabo de 2 años?', '€1000 is deposited at 5% compound interest a year. How much is there after 2 years?', 'S’ingressen 1000 € al 5 % d’interès compost anual. Quant n’hi ha al cap de 2 anys?'),
    N('1102,50 €', '1100 €', '1050 €', '1105 €'),
    T('Es una progresión geométrica de razón 1,05: 1000 · 1,05² = 1102,50 €. Los 1100 € serían interés simple, sin cobrar intereses de los intereses.', 'It is a geometric sequence with ratio 1.05: 1000 · 1.05² = €1102.50. €1100 would be simple interest, without earning interest on the interest.', 'És una progressió geomètrica de raó 1,05: 1000 · 1,05² = 1102,50 €. Els 1100 € serien interès simple, sense cobrar interessos dels interessos.')),
  q('su-18', 'bachillerato', '🔁',
    T('¿Qué término general da la sucesión 1, −1, 1, −1, …?', 'Which general term gives the sequence 1, −1, 1, −1, …?', 'Quin terme general dona la successió 1, −1, 1, −1, …?'),
    N('aₙ = (−1)ⁿ⁺¹', 'aₙ = (−1)ⁿ', 'aₙ = 1/n', 'aₙ = n − 2'),
    T('Con n = 1, (−1)² = 1; con n = 2, (−1)³ = −1… (−1)ⁿ empieza por −1, así que da la sucesión con los signos al revés.', 'With n = 1, (−1)² = 1; with n = 2, (−1)³ = −1… (−1)ⁿ starts at −1, so it gives the sequence with the signs flipped.', 'Amb n = 1, (−1)² = 1; amb n = 2, (−1)³ = −1… (−1)ⁿ comença per −1, així que dona la successió amb els signes al revés.')),
  q('su-19', 'bachillerato', '🎯',
    T('¿A qué tiende aₙ = 1/n cuando n se hace muy grande?', 'What does aₙ = 1/n tend to as n gets very large?', 'A què tendeix aₙ = 1/n quan n es fa molt gran?'),
    N('0', '1', '∞', 'No tiene límite'),
    T('1/10 = 0,1; 1/1000 = 0,001… cada vez más cerca de 0 sin llegar nunca: el límite es 0.', '1/10 = 0.1; 1/1000 = 0.001… ever closer to 0 without reaching it: the limit is 0.', '1/10 = 0,1; 1/1000 = 0,001… cada vegada més a prop de 0 sense arribar-hi mai: el límit és 0.')),
  q('su-20', 'bachillerato', '🎯',
    T('¿Cuál es el límite de aₙ = (2n + 1) / n?', 'What is the limit of aₙ = (2n + 1) / n?', 'Quin és el límit de aₙ = (2n + 1) / n?'),
    N('2', '1', '3', '∞'),
    T('(2n + 1) / n = 2 + 1/n, y 1/n tiende a 0: el límite es 2. Con n = 1 vale 3, pero eso es solo el primer término.', '(2n + 1) / n = 2 + 1/n, and 1/n tends to 0: the limit is 2. With n = 1 it is 3, but that is only the first term.', '(2n + 1) / n = 2 + 1/n, i 1/n tendeix a 0: el límit és 2. Amb n = 1 val 3, però això és només el primer terme.')),
  q('su-21', 'bachillerato', '↘️',
    T('¿Cómo es la sucesión aₙ = 5 − 2n?', 'What is the sequence aₙ = 5 − 2n like?', 'Com és la successió aₙ = 5 − 2n?'),
    O(['Decreciente', 'Creciente', 'Constante', 'Alternada'], ['Decreasing', 'Increasing', 'Constant', 'Alternating'], ['Decreixent', 'Creixent', 'Constant', 'Alternada']),
    T('Sus términos son 3, 1, −1, −3…: cada uno es 2 menos que el anterior. Es aritmética con diferencia −2, y una diferencia negativa la hace decreciente.', 'Its terms are 3, 1, −1, −3…: each one is 2 less than the one before. It is arithmetic with difference −2, and a negative difference makes it decreasing.', 'Els seus termes són 3, 1, −1, −3…: cadascun és 2 menys que l’anterior. És aritmètica amb diferència −2, i una diferència negativa la fa decreixent.')),
  q('su-22', 'bachillerato', '🧵',
    T('Interpola tres medios aritméticos entre 2 y 18.', 'Insert three arithmetic means between 2 and 18.', 'Interpola tres mitjans aritmètics entre 2 i 18.'),
    N('6, 10, 14', '5, 10, 15', '4, 8, 12', '6, 12, 18'),
    T('Quedan 5 términos: 2, _, _, _, 18. Hay 4 saltos, así que d = (18 − 2) ÷ 4 = 4: 2, 6, 10, 14, 18.', 'That leaves 5 terms: 2, _, _, _, 18. There are 4 steps, so d = (18 − 2) ÷ 4 = 4: 2, 6, 10, 14, 18.', 'Queden 5 termes: 2, _, _, _, 18. Hi ha 4 salts, així que d = (18 − 2) ÷ 4 = 4: 2, 6, 10, 14, 18.')),
  q('su-23', 'bachillerato', '🔎',
    T('En la progresión 3, 6, 12, 24, …, ¿qué lugar ocupa el término 384?', 'In the sequence 3, 6, 12, 24, …, which position does the term 384 occupy?', 'A la progressió 3, 6, 12, 24, …, quin lloc ocupa el terme 384?'),
    N('8', '7', '9', '128'),
    T('3 · 2ⁿ⁻¹ = 384 → 2ⁿ⁻¹ = 128 = 2⁷ → n − 1 = 7 → n = 8. Contar: 3, 6, 12, 24, 48, 96, 192, 384.', '3 · 2ⁿ⁻¹ = 384 → 2ⁿ⁻¹ = 128 = 2⁷ → n − 1 = 7 → n = 8. Counting: 3, 6, 12, 24, 48, 96, 192, 384.', '3 · 2ⁿ⁻¹ = 384 → 2ⁿ⁻¹ = 128 = 2⁷ → n − 1 = 7 → n = 8. Comptant: 3, 6, 12, 24, 48, 96, 192, 384.')),
  q('su-24', 'bachillerato', '🔢',
    T('¿Cuántos términos tiene la progresión 7, 11, 15, …, 99?', 'How many terms does the sequence 7, 11, 15, …, 99 have?', 'Quants termes té la progressió 7, 11, 15, …, 99?'),
    N('24', '23', '25', '92'),
    T('99 = 7 + (n − 1) · 4 → n − 1 = 92 ÷ 4 = 23 → n = 24. Con 23 se cuentan los saltos y no los términos.', '99 = 7 + (n − 1) · 4 → n − 1 = 92 ÷ 4 = 23 → n = 24. 23 counts the steps, not the terms.', '99 = 7 + (n − 1) · 4 → n − 1 = 92 ÷ 4 = 23 → n = 24. Amb 23 es compten els salts i no els termes.')),
]

export const PREGUNTAS_ESO = PREGUNTAS.filter(p => p.nivel === 'eso')
export const PREGUNTAS_BACH = PREGUNTAS
