// Trigonometría — Matemáticas de 4.º de ESO y 1.º de Bachillerato. Razones
// trigonométricas, ángulos notables, radianes, problemas de alturas y
// distancias, circunferencia goniométrica, fórmulas de suma y ángulo doble,
// teoremas del seno y del coseno y ecuaciones sencillas.
//
// Las cuentas están comprobadas (las tests las rehacen con Math.sin/cos) y
// los distractores son los errores típicos: seno por coseno, olvidar el
// signo del cuadrante o el término 2bc·cos A.
//
// La respuesta buena va siempre la PRIMERA en `opciones`: ExamenMC baraja el
// orden al servir cada pregunta (lib/ordenOpciones.js).
function q(id, nivel, emoji, pregunta, opciones, explicacion) {
  const correcta = { es: opciones.es[0], en: opciones.en[0], ca: opciones.ca[0] }
  return { id, nivel, emoji, pregunta, opciones, correcta, explicacion }
}
const T = (es, en, ca) => ({ es, en, ca })
const O = (es, en, ca) => ({ es, en, ca })
// Opciones con números: iguales en los tres idiomas salvo la coma decimal.
const N = (...xs) => ({ es: xs, en: xs.map(x => x.replace(/(\d),(\d)/g, '$1.$2')), ca: xs })

export const PREGUNTAS = [
  // ── ESO ─────────────────────────────────────────────────────────────────
  q('tr-01', 'eso', '📐',
    T('En un triángulo rectángulo, ¿qué es el seno de un ángulo agudo?', 'In a right-angled triangle, what is the sine of an acute angle?', 'En un triangle rectangle, què és el sinus d’un angle agut?'),
    O(['Cateto opuesto ÷ hipotenusa', 'Cateto contiguo ÷ hipotenusa', 'Cateto opuesto ÷ cateto contiguo', 'Hipotenusa ÷ cateto opuesto'], ['Opposite side ÷ hypotenuse', 'Adjacent side ÷ hypotenuse', 'Opposite side ÷ adjacent side', 'Hypotenuse ÷ opposite side'], ['Catet oposat ÷ hipotenusa', 'Catet contigu ÷ hipotenusa', 'Catet oposat ÷ catet contigu', 'Hipotenusa ÷ catet oposat']),
    T('Seno = opuesto ÷ hipotenusa; coseno = contiguo ÷ hipotenusa; tangente = opuesto ÷ contiguo. Como la hipotenusa es el lado mayor, seno y coseno nunca pasan de 1.', 'Sine = opposite ÷ hypotenuse; cosine = adjacent ÷ hypotenuse; tangent = opposite ÷ adjacent. Since the hypotenuse is the longest side, sine and cosine never exceed 1.', 'Sinus = oposat ÷ hipotenusa; cosinus = contigu ÷ hipotenusa; tangent = oposat ÷ contigu. Com que la hipotenusa és el costat més gran, sinus i cosinus mai no passen d’1.')),
  q('tr-02', 'eso', '📐',
    T('¿Qué es la tangente de un ángulo agudo en un triángulo rectángulo?', 'What is the tangent of an acute angle in a right-angled triangle?', 'Què és la tangent d’un angle agut en un triangle rectangle?'),
    O(['Cateto opuesto ÷ cateto contiguo', 'Cateto contiguo ÷ cateto opuesto', 'Cateto opuesto ÷ hipotenusa', 'Hipotenusa ÷ cateto contiguo'], ['Opposite side ÷ adjacent side', 'Adjacent side ÷ opposite side', 'Opposite side ÷ hypotenuse', 'Hypotenuse ÷ adjacent side'], ['Catet oposat ÷ catet contigu', 'Catet contigu ÷ catet oposat', 'Catet oposat ÷ hipotenusa', 'Hipotenusa ÷ catet contigu']),
    T('La tangente compara los dos catetos: lo que sube ÷ lo que avanza. Por eso es la pendiente de una rampa. También tg α = sen α ÷ cos α.', 'The tangent compares the two legs: rise ÷ run. That is why it is the slope of a ramp. Also tan α = sin α ÷ cos α.', 'La tangent compara els dos catets: el que puja ÷ el que avança. Per això és el pendent d’una rampa. També tg α = sin α ÷ cos α.')),
  q('tr-03', 'eso', '🔺',
    T('Un triángulo rectángulo tiene catetos de 3 y 4 cm e hipotenusa de 5 cm. ¿Cuánto vale el seno del ángulo opuesto al cateto de 3 cm?', 'A right-angled triangle has legs of 3 and 4 cm and a hypotenuse of 5 cm. What is the sine of the angle opposite the 3 cm leg?', 'Un triangle rectangle té catets de 3 i 4 cm i hipotenusa de 5 cm. Quant val el sinus de l’angle oposat al catet de 3 cm?'),
    N('0,6', '0,8', '0,75', '1,33'),
    T('sen = opuesto ÷ hipotenusa = 3 ÷ 5 = 0,6. El 0,8 sería su coseno (4 ÷ 5) y el 0,75 su tangente (3 ÷ 4).', 'sin = opposite ÷ hypotenuse = 3 ÷ 5 = 0.6. 0.8 would be its cosine (4 ÷ 5) and 0.75 its tangent (3 ÷ 4).', 'sin = oposat ÷ hipotenusa = 3 ÷ 5 = 0,6. El 0,8 seria el cosinus (4 ÷ 5) i el 0,75 la tangent (3 ÷ 4).')),
  q('tr-04', 'eso', '🎯',
    T('¿Cuánto vale sen 30°?', 'What is sin 30°?', 'Quant val sin 30°?'),
    N('1/2', '√3/2', '√2/2', '1'),
    T('Medio triángulo equilátero: el lado opuesto a 30° es la mitad de la hipotenusa, así que sen 30° = 1/2. En cambio, cos 30° = √3/2 y sen 45° = cos 45° = √2/2.', 'Half an equilateral triangle: the side opposite 30° is half the hypotenuse, so sin 30° = 1/2. On the other hand, cos 30° = √3/2 and sin 45° = cos 45° = √2/2.', 'Mig triangle equilàter: el costat oposat a 30° és la meitat de la hipotenusa, així que sin 30° = 1/2. En canvi, cos 30° = √3/2 i sin 45° = cos 45° = √2/2.')),
  q('tr-05', 'eso', '🎯',
    T('¿Cuánto vale tg 45°?', 'What is tan 45°?', 'Quant val tg 45°?'),
    N('1', '0', '√2/2', '√3'),
    T('Un triángulo rectángulo con un ángulo de 45° es isósceles: los dos catetos son iguales, y la tangente (opuesto ÷ contiguo) vale 1. √3 es tg 60°.', 'A right-angled triangle with a 45° angle is isosceles: both legs are equal, so the tangent (opposite ÷ adjacent) is 1. √3 is tan 60°.', 'Un triangle rectangle amb un angle de 45° és isòsceles: els dos catets són iguals, i la tangent (oposat ÷ contigu) val 1. √3 és tg 60°.')),
  q('tr-06', 'eso', '⚖️',
    T('¿Cuál es la relación fundamental de la trigonometría?', 'What is the fundamental identity of trigonometry?', 'Quina és la relació fonamental de la trigonometria?'),
    O(['sen²α + cos²α = 1', 'sen α + cos α = 1', 'sen α · cos α = 1', 'tg α = cos α ÷ sen α'], ['sin²α + cos²α = 1', 'sin α + cos α = 1', 'sin α · cos α = 1', 'tan α = cos α ÷ sin α'], ['sin²α + cos²α = 1', 'sin α + cos α = 1', 'sin α · cos α = 1', 'tg α = cos α ÷ sin α']),
    T('Sale del teorema de Pitágoras dividiendo entre la hipotenusa al cuadrado. Sin los cuadrados no se cumple: sen 45° + cos 45° ≈ 1,41.', 'It comes from Pythagoras’ theorem dividing by the hypotenuse squared. Without the squares it does not hold: sin 45° + cos 45° ≈ 1.41.', 'Surt del teorema de Pitàgores dividint entre la hipotenusa al quadrat. Sense els quadrats no es compleix: sin 45° + cos 45° ≈ 1,41.')),
  q('tr-07', 'eso', '🔄',
    T('¿A cuántos radianes equivalen 180°?', 'How many radians are 180°?', 'A quants radiants equivalen 180°?'),
    O(['π rad', '2π rad', 'π/2 rad', '180 rad'], ['π rad', '2π rad', 'π/2 rad', '180 rad'], ['π rad', '2π rad', 'π/2 rad', '180 rad']),
    T('Una vuelta entera, 360°, son 2π radianes, así que media vuelta, 180°, son π radianes. Para pasar de grados a radianes se multiplica por π/180.', 'A full turn, 360°, is 2π radians, so half a turn, 180°, is π radians. To convert degrees to radians, multiply by π/180.', 'Una volta sencera, 360°, són 2π radiants, així que mitja volta, 180°, són π radiants. Per passar de graus a radiants es multiplica per π/180.')),
  q('tr-08', 'eso', '🔄',
    T('¿Cuántos grados mide, aproximadamente, 1 radián?', 'About how many degrees is 1 radian?', 'Quants graus fa, aproximadament, 1 radiant?'),
    N('57,3°', '3,14°', '180°', '90°'),
    T('1 rad = 180° ÷ π ≈ 57,3°. Es el ángulo cuyo arco mide lo mismo que el radio.', '1 rad = 180° ÷ π ≈ 57.3°. It is the angle whose arc is as long as the radius.', '1 rad = 180° ÷ π ≈ 57,3°. És l’angle l’arc del qual fa el mateix que el radi.')),
  q('tr-09', 'eso', '🌳',
    T('Un árbol da una sombra de 10 m cuando los rayos del sol forman 45° con el suelo. ¿Cuánto mide el árbol?', 'A tree casts a 10 m shadow when the sun’s rays make 45° with the ground. How tall is the tree?', 'Un arbre fa una ombra de 10 m quan els raigs del sol formen 45° amb el terra. Quant fa l’arbre?'),
    N('10 m', '5 m', '14,1 m', '7,1 m'),
    T('altura = sombra · tg 45° = 10 · 1 = 10 m. El 7,1 m sale de usar el seno en vez de la tangente, y el 14,1 m es la longitud del rayo, la hipotenusa.', 'height = shadow · tan 45° = 10 · 1 = 10 m. 7.1 m comes from using sine instead of tangent, and 14.1 m is the length of the ray, the hypotenuse.', 'alçada = ombra · tg 45° = 10 · 1 = 10 m. El 7,1 m surt de fer servir el sinus en lloc de la tangent, i el 14,1 m és la longitud del raig, la hipotenusa.')),
  q('tr-10', 'eso', '🧗',
    T('Una escalera de 4 m apoyada en una pared forma 60° con el suelo. ¿A qué altura llega?', 'A 4 m ladder leaning against a wall makes 60° with the ground. How high does it reach?', 'Una escala de 4 m recolzada en una paret forma 60° amb el terra. A quina alçada arriba?'),
    N('3,46 m', '2 m', '6,93 m', '4 m'),
    T('La escalera es la hipotenusa y la altura el cateto opuesto a 60°: h = 4 · sen 60° = 4 · 0,866 ≈ 3,46 m. Con el coseno saldría 2 m, que es la distancia del pie a la pared.', 'The ladder is the hypotenuse and the height is the side opposite 60°: h = 4 · sin 60° = 4 · 0.866 ≈ 3.46 m. Cosine would give 2 m, which is the distance from the foot to the wall.', 'L’escala és la hipotenusa i l’alçada el catet oposat a 60°: h = 4 · sin 60° = 4 · 0,866 ≈ 3,46 m. Amb el cosinus sortirien 2 m, que és la distància del peu a la paret.')),
  q('tr-11', 'eso', '🧮',
    T('Si α es agudo y sen α = 0,6, ¿cuánto vale cos α?', 'If α is acute and sin α = 0.6, what is cos α?', 'Si α és agut i sin α = 0,6, quant val cos α?'),
    N('0,8', '0,4', '0,64', '1,6'),
    T('Con sen²α + cos²α = 1: cos²α = 1 − 0,36 = 0,64, y cos α = 0,8 (positivo, porque α es agudo). El 0,4 sale de hacer 1 − 0,6 sin elevar al cuadrado; el 0,64 es cos²α, falta la raíz.', 'Using sin²α + cos²α = 1: cos²α = 1 − 0.36 = 0.64, so cos α = 0.8 (positive, because α is acute). 0.4 comes from 1 − 0.6 without squaring; 0.64 is cos²α, the square root is missing.', 'Amb sin²α + cos²α = 1: cos²α = 1 − 0,36 = 0,64, i cos α = 0,8 (positiu, perquè α és agut). El 0,4 surt de fer 1 − 0,6 sense elevar al quadrat; el 0,64 és cos²α, hi falta l’arrel.')),
  q('tr-12', 'eso', '📏',
    T('Desde 20 m de la base de una torre se ve su punto más alto con un ángulo de elevación de 30°. ¿Cuánto mide la torre?', 'From 20 m away from the base of a tower, its top is seen at an angle of elevation of 30°. How tall is the tower?', 'Des de 20 m de la base d’una torre se’n veu el punt més alt amb un angle d’elevació de 30°. Quant fa la torre?'),
    N('11,55 m', '10 m', '17,32 m', '34,64 m'),
    T('altura = 20 · tg 30° = 20 · 0,577 ≈ 11,55 m. Con el seno saldrían 10 m, con el coseno 17,32 m y multiplicando por tg 60° (el otro ángulo), 34,64 m.', 'height = 20 · tan 30° = 20 · 0.577 ≈ 11.55 m. Sine would give 10 m, cosine 17.32 m, and multiplying by tan 60° (the other angle), 34.64 m.', 'alçada = 20 · tg 30° = 20 · 0,577 ≈ 11,55 m. Amb el sinus sortirien 10 m, amb el cosinus 17,32 m i multiplicant per tg 60° (l’altre angle), 34,64 m.')),

  // ── Bachillerato ────────────────────────────────────────────────────────
  q('tr-13', 'bachillerato', '⭕',
    T('¿Cuánto vale sen 120°?', 'What is sin 120°?', 'Quant val sin 120°?'),
    N('√3/2', '−√3/2', '1/2', '−1/2'),
    T('120° está en el segundo cuadrante, donde el seno es positivo, y es suplementario de 60°: sen 120° = sen 60° = √3/2. El que cambia de signo es el coseno: cos 120° = −1/2.', '120° is in the second quadrant, where sine is positive, and it is supplementary to 60°: sin 120° = sin 60° = √3/2. Cosine is the one that changes sign: cos 120° = −1/2.', '120° és al segon quadrant, on el sinus és positiu, i és suplementari de 60°: sin 120° = sin 60° = √3/2. El que canvia de signe és el cosinus: cos 120° = −1/2.')),
  q('tr-14', 'bachillerato', '⭕',
    T('¿Cuánto vale cos 180°?', 'What is cos 180°?', 'Quant val cos 180°?'),
    N('−1', '0', '1', 'π'),
    T('En la circunferencia goniométrica, el coseno es la coordenada x del punto. A 180° el punto está en (−1, 0): cos 180° = −1 y sen 180° = 0.', 'On the unit circle, cosine is the point’s x coordinate. At 180° the point is at (−1, 0): cos 180° = −1 and sin 180° = 0.', 'A la circumferència goniomètrica, el cosinus és la coordenada x del punt. A 180° el punt és a (−1, 0): cos 180° = −1 i sin 180° = 0.')),
  q('tr-15', 'bachillerato', '🧭',
    T('¿Qué razón trigonométrica es positiva en el tercer cuadrante (entre 180° y 270°)?', 'Which trigonometric ratio is positive in the third quadrant (between 180° and 270°)?', 'Quina raó trigonomètrica és positiva al tercer quadrant (entre 180° i 270°)?'),
    O(['La tangente', 'El seno', 'El coseno', 'Ninguna'], ['Tangent', 'Sine', 'Cosine', 'None'], ['La tangent', 'El sinus', 'El cosinus', 'Cap']),
    T('En el tercer cuadrante seno y coseno son negativos, y su cociente, la tangente, es positivo. Regla: en el primero todas positivas; en el segundo, el seno; en el tercero, la tangente; en el cuarto, el coseno.', 'In the third quadrant sine and cosine are negative, so their quotient, the tangent, is positive. Rule: in the first, all positive; second, sine; third, tangent; fourth, cosine.', 'Al tercer quadrant sinus i cosinus són negatius, i el seu quocient, la tangent, és positiu. Regla: al primer totes positives; al segon, el sinus; al tercer, la tangent; al quart, el cosinus.')),
  q('tr-16', 'bachillerato', '➕',
    T('¿Cuál es la fórmula del seno de una suma, sen(α + β)?', 'What is the formula for the sine of a sum, sin(α + β)?', 'Quina és la fórmula del sinus d’una suma, sin(α + β)?'),
    O(['sen α · cos β + cos α · sen β', 'sen α + sen β', 'sen α · sen β − cos α · cos β', 'cos α · cos β − sen α · sen β'], ['sin α · cos β + cos α · sin β', 'sin α + sin β', 'sin α · sin β − cos α · cos β', 'cos α · cos β − sin α · sin β'], ['sin α · cos β + cos α · sin β', 'sin α + sin β', 'sin α · sin β − cos α · cos β', 'cos α · cos β − sin α · sin β']),
    T('sen(α + β) = sen α cos β + cos α sen β. El seno de una suma no es la suma de senos: sen(30° + 60°) = sen 90° = 1, y sen 30° + sen 60° ≈ 1,37. La última opción es el coseno de la suma.', 'sin(α + β) = sin α cos β + cos α sin β. The sine of a sum is not the sum of sines: sin(30° + 60°) = sin 90° = 1, while sin 30° + sin 60° ≈ 1.37. The last option is the cosine of the sum.', 'sin(α + β) = sin α cos β + cos α sin β. El sinus d’una suma no és la suma de sinus: sin(30° + 60°) = sin 90° = 1, i sin 30° + sin 60° ≈ 1,37. L’última opció és el cosinus de la suma.')),
  q('tr-17', 'bachillerato', '✖️',
    T('¿A qué es igual cos 2α?', 'What is cos 2α equal to?', 'A què és igual cos 2α?'),
    O(['cos²α − sen²α', '2 · cos α', '2 · sen α · cos α', 'cos²α + sen²α'], ['cos²α − sin²α', '2 · cos α', '2 · sin α · cos α', 'cos²α + sin²α'], ['cos²α − sin²α', '2 · cos α', '2 · sin α · cos α', 'cos²α + sin²α']),
    T('Sale de cos(α + α) = cos α cos α − sen α sen α. 2 sen α cos α es sen 2α, y cos²α + sen²α vale siempre 1.', 'It comes from cos(α + α) = cos α cos α − sin α sin α. 2 sin α cos α is sin 2α, and cos²α + sin²α is always 1.', 'Surt de cos(α + α) = cos α cos α − sin α sin α. 2 sin α cos α és sin 2α, i cos²α + sin²α val sempre 1.')),
  q('tr-18', 'bachillerato', '🔺',
    T('¿Qué dice el teorema del seno para cualquier triángulo de lados a, b, c y ángulos opuestos A, B, C?', 'What does the law of sines say for any triangle with sides a, b, c and opposite angles A, B, C?', 'Què diu el teorema del sinus per a qualsevol triangle de costats a, b, c i angles oposats A, B, C?'),
    O(['a / sen A = b / sen B = c / sen C', 'a · sen A = b · sen B = c · sen C', 'a² = b² + c²', 'sen A + sen B + sen C = 1'], ['a / sin A = b / sin B = c / sin C', 'a · sin A = b · sin B = c · sin C', 'a² = b² + c²', 'sin A + sin B + sin C = 1'], ['a / sin A = b / sin B = c / sin C', 'a · sin A = b · sin B = c · sin C', 'a² = b² + c²', 'sin A + sin B + sin C = 1']),
    T('Los lados son proporcionales a los senos de los ángulos opuestos: el lado mayor está frente al ángulo mayor. Sirve cuando se conocen dos ángulos y un lado. a² = b² + c² es Pitágoras, que solo vale si A = 90°.', 'The sides are proportional to the sines of the opposite angles: the longest side faces the largest angle. It is used when two angles and a side are known. a² = b² + c² is Pythagoras, which only holds if A = 90°.', 'Els costats són proporcionals als sinus dels angles oposats: el costat més gran és davant de l’angle més gran. Serveix quan es coneixen dos angles i un costat. a² = b² + c² és Pitàgores, que només val si A = 90°.')),
  q('tr-19', 'bachillerato', '🔺',
    T('En un triángulo, b = 5, c = 8 y el ángulo que forman es A = 60°. ¿Cuánto mide el lado a?', 'In a triangle, b = 5, c = 8 and the angle between them is A = 60°. How long is side a?', 'En un triangle, b = 5, c = 8 i l’angle que formen és A = 60°. Quant fa el costat a?'),
    N('7', '√89 ≈ 9,43', '√129 ≈ 11,36', '13'),
    T('Teorema del coseno: a² = b² + c² − 2bc · cos A = 25 + 64 − 2 · 5 · 8 · 0,5 = 89 − 40 = 49, así que a = 7. Olvidar el último término da √89, y sumarlo en vez de restarlo, √129.', 'Law of cosines: a² = b² + c² − 2bc · cos A = 25 + 64 − 2 · 5 · 8 · 0.5 = 89 − 40 = 49, so a = 7. Forgetting the last term gives √89, and adding it instead of subtracting, √129.', 'Teorema del cosinus: a² = b² + c² − 2bc · cos A = 25 + 64 − 2 · 5 · 8 · 0,5 = 89 − 40 = 49, així que a = 7. Oblidar l’últim terme dona √89, i sumar-lo en lloc de restar-lo, √129.')),
  q('tr-20', 'bachillerato', '〰️',
    T('¿Cuál es el periodo de la función y = sen x?', 'What is the period of the function y = sin x?', 'Quin és el període de la funció y = sin x?'),
    O(['2π', 'π', 'π/2', '4π'], ['2π', 'π', 'π/2', '4π'], ['2π', 'π', 'π/2', '4π']),
    T('Cada 2π radianes (una vuelta completa) los valores del seno se repiten. La tangente, en cambio, tiene periodo π.', 'Every 2π radians (a full turn) the values of sine repeat. Tangent, on the other hand, has period π.', 'Cada 2π radiants (una volta completa) els valors del sinus es repeteixen. La tangent, en canvi, té període π.')),
  q('tr-21', 'bachillerato', '🔍',
    T('¿Qué ángulos entre 0° y 360° cumplen sen x = 1/2?', 'Which angles between 0° and 360° satisfy sin x = 1/2?', 'Quins angles entre 0° i 360° compleixen sin x = 1/2?'),
    O(['30° y 150°', 'Solo 30°', '30° y 210°', '30° y 330°'], ['30° and 150°', 'Only 30°', '30° and 210°', '30° and 330°'], ['30° i 150°', 'Només 30°', '30° i 210°', '30° i 330°']),
    T('El seno es positivo en el primer y el segundo cuadrante: 30° y su suplementario, 180° − 30° = 150°. A 210° y 330° el seno vale −1/2; 330° sería solución de cos x = √3/2.', 'Sine is positive in the first and second quadrants: 30° and its supplement, 180° − 30° = 150°. At 210° and 330° the sine is −1/2; 330° would solve cos x = √3/2.', 'El sinus és positiu al primer i al segon quadrant: 30° i el seu suplementari, 180° − 30° = 150°. A 210° i 330° el sinus val −1/2; 330° seria solució de cos x = √3/2.')),
  q('tr-22', 'bachillerato', '⚖️',
    T('¿Qué identidad se obtiene al dividir sen²α + cos²α = 1 entre cos²α?', 'Which identity do you get by dividing sin²α + cos²α = 1 by cos²α?', 'Quina identitat s’obté en dividir sin²α + cos²α = 1 entre cos²α?'),
    O(['1 + tg²α = 1 / cos²α', '1 + tg²α = 1 / sen²α', 'tg²α = 1 + cos²α', 'tg α + 1 = sen α'], ['1 + tan²α = 1 / cos²α', '1 + tan²α = 1 / sin²α', 'tan²α = 1 + cos²α', 'tan α + 1 = sin α'], ['1 + tg²α = 1 / cos²α', '1 + tg²α = 1 / sin²α', 'tg²α = 1 + cos²α', 'tg α + 1 = sin α']),
    T('sen²α / cos²α + 1 = 1 / cos²α, y sen²α / cos²α = tg²α. Sirve para calcular el coseno cuando se conoce la tangente.', 'sin²α / cos²α + 1 = 1 / cos²α, and sin²α / cos²α = tan²α. It is useful for finding the cosine when the tangent is known.', 'sin²α / cos²α + 1 = 1 / cos²α, i sin²α / cos²α = tg²α. Serveix per calcular el cosinus quan es coneix la tangent.')),
  q('tr-23', 'bachillerato', '🔄',
    T('¿Cuántos grados son 3π/4 radianes?', 'How many degrees is 3π/4 radians?', 'Quants graus són 3π/4 radiants?'),
    N('135°', '45°', '270°', '240°'),
    T('Se multiplica por 180/π: 3π/4 · 180/π = 3 · 45 = 135°. π/4 son 45°, así que 3π/4 es el triple.', 'Multiply by 180/π: 3π/4 · 180/π = 3 · 45 = 135°. π/4 is 45°, so 3π/4 is three times that.', 'Es multiplica per 180/π: 3π/4 · 180/π = 3 · 45 = 135°. π/4 són 45°, així que 3π/4 és el triple.')),
  q('tr-24', 'bachillerato', '🧮',
    T('Si α está en el segundo cuadrante y sen α = 3/5, ¿cuánto vale cos α?', 'If α is in the second quadrant and sin α = 3/5, what is cos α?', 'Si α és al segon quadrant i sin α = 3/5, quant val cos α?'),
    N('−4/5', '4/5', '−3/5', '2/5'),
    T('cos²α = 1 − 9/25 = 16/25, así que cos α = ±4/5. En el segundo cuadrante el coseno es negativo: −4/5. Olvidar el signo del cuadrante da 4/5.', 'cos²α = 1 − 9/25 = 16/25, so cos α = ±4/5. In the second quadrant cosine is negative: −4/5. Forgetting the quadrant’s sign gives 4/5.', 'cos²α = 1 − 9/25 = 16/25, així que cos α = ±4/5. Al segon quadrant el cosinus és negatiu: −4/5. Oblidar el signe del quadrant dona 4/5.')),
]

export const PREGUNTAS_ESO = PREGUNTAS.filter(p => p.nivel === 'eso')
export const PREGUNTAS_BACH = PREGUNTAS
