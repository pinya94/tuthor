// Proporcionalidad y Porcentajes — primaria + ESO
//
// El bloque que faltaba entre fracciones (que toca el porcentaje de pasada) y
// finanzas personales (que lo da por sabido): regla de tres, magnitudes
// directa e inversamente proporcionales, escalas, repartos, y los aumentos y
// descuentos encadenados, que es donde la intuición falla de verdad.
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

export const PREGUNTAS = [

  // ── QUÉ ES UN PORCENTAJE ────────────────────────────────────────────────
  q('po-01', 'primaria',
    { es: '¿Qué significa exactamente 25 %?', en: 'What does 25% mean exactly?', ca: 'Què significa exactament 25 %?' },
    { es: ['25 de cada 100', '25 unidades', 'La cuarta parte de 25', '25 veces más'], en: ['25 out of every 100', '25 units', 'A quarter of 25', '25 times more'], ca: ['25 de cada 100', '25 unitats', 'La quarta part de 25', '25 vegades més'] },
    { es: '25 de cada 100', en: '25 out of every 100', ca: '25 de cada 100' },
    '💯',
    { es: 'Por ciento significa literalmente "de cada cien". Por eso un porcentaje es una fracción con denominador 100: 25 % es 25/100, que simplificado es 1/4, y en decimal 0,25. Son tres formas de escribir lo mismo.', en: 'Per cent literally means "out of a hundred". So a percentage is a fraction with denominator 100: 25% is 25/100, which simplifies to 1/4 and is 0.25 as a decimal. Three ways of writing the same thing.', ca: 'Per cent vol dir literalment "de cada cent". 25 % és 25/100, que simplificat és 1/4 i en decimal 0,25.' }),

  q('po-02', 'primaria',
    { es: '¿Cuánto es el 10 % de 250?', en: 'What is 10% of 250?', ca: 'Quant és el 10 % de 250?' },
    { es: ['25', '10', '2,5', '250'], en: ['25', '10', '2.5', '250'], ca: ['25', '10', '2,5', '250'] },
    { es: '25', en: '25', ca: '25' },
    '🔟',
    { es: 'El 10 % es dividir entre 10, así que basta con correr la coma un lugar: 250 → 25. Es el porcentaje más útil de todos, porque a partir de él salen los demás de cabeza: el 20 % es el doble, el 5 % la mitad.', en: '10% means dividing by 10, so you just move the decimal point one place: 250 → 25. It is the most useful percentage of all, because the others follow from it in your head: 20% is double, 5% is half.', ca: 'El 10 % és dividir entre 10: 250 → 25. A partir d\'aquí surten els altres de cap: el 20 % és el doble i el 5 % la meitat.' }),

  q('po-03', 'primaria',
    { es: '¿Cuánto es el 50 % de 84?', en: 'What is 50% of 84?', ca: 'Quant és el 50 % de 84?' },
    { es: ['42', '50', '34', '168'], en: ['42', '50', '34', '168'], ca: ['42', '50', '34', '168'] },
    { es: '42', en: '42', ca: '42' },
    '➗',
    { es: 'El 50 % es la mitad, sin más: 84 ÷ 2 = 42. Conviene reconocer los porcentajes fáciles de vista, porque evitan toda la cuenta: 50 % la mitad, 25 % la cuarta parte, 75 % tres cuartas partes.', en: '50% is simply half: 84 ÷ 2 = 42. It pays to recognise the easy percentages on sight, because they skip the whole calculation: 50% half, 25% a quarter, 75% three quarters.', ca: 'El 50 % és la meitat: 84 ÷ 2 = 42. Convé reconèixer els percentatges fàcils de vista.' }),

  q('po-04', 'primaria',
    { es: '¿Cómo se calcula el 15 % de 200?', en: 'How do you work out 15% of 200?', ca: 'Com es calcula el 15 % de 200?' },
    { es: ['200 × 15 ÷ 100 = 30', '200 ÷ 15 = 13,3', '200 + 15 = 215', '200 × 15 = 3.000'], en: ['200 × 15 ÷ 100 = 30', '200 ÷ 15 = 13.3', '200 + 15 = 215', '200 × 15 = 3,000'], ca: ['200 × 15 ÷ 100 = 30', '200 ÷ 15 = 13,3', '200 + 15 = 215', '200 × 15 = 3.000'] },
    { es: '200 × 15 ÷ 100 = 30', en: '200 × 15 ÷ 100 = 30', ca: '200 × 15 ÷ 100 = 30' },
    '🧮',
    { es: 'La regla general es multiplicar por el porcentaje y dividir entre 100. También sale de cabeza descomponiendo: el 10 % de 200 son 20, el 5 % es la mitad de eso, 10, y 20 + 10 = 30.', en: 'The general rule is multiply by the percentage and divide by 100. It also works in your head by splitting it up: 10% of 200 is 20, 5% is half of that, 10, and 20 + 10 = 30.', ca: 'La regla general és multiplicar pel percentatge i dividir entre 100. També surt de cap: 20 + 10 = 30.' }),

  q('po-05', 'primaria',
    { es: 'En una clase de 25 alumnos, 5 llevan gafas. ¿Qué porcentaje es?', en: 'In a class of 25 pupils, 5 wear glasses. What percentage is that?', ca: 'En una classe de 25 alumnes, 5 porten ulleres. Quin percentatge és?' },
    { es: ['20 %', '5 %', '25 %', '50 %'], en: ['20%', '5%', '25%', '50%'], ca: ['20 %', '5 %', '25 %', '50 %'] },
    { es: '20 %', en: '20%', ca: '20 %' },
    '👓',
    { es: 'Aquí la pregunta va al revés: se conoce la parte y el total y se busca el tanto por ciento. Se divide y se multiplica por 100: 5 ÷ 25 = 0,2, y 0,2 × 100 = 20 %.', en: 'Here the question runs backwards: you know the part and the total and want the percentage. Divide and multiply by 100: 5 ÷ 25 = 0.2, and 0.2 × 100 = 20%.', ca: 'Aquí la pregunta va a l\'inrevés: 5 ÷ 25 = 0,2, i 0,2 × 100 = 20 %.' }),

  q('po-06', 'primaria',
    { es: '¿Qué fracción es el 75 %?', en: 'Which fraction is 75%?', ca: 'Quina fracció és el 75 %?' },
    { es: ['3/4', '7/5', '1/75', '3/5'], en: ['3/4', '7/5', '1/75', '3/5'], ca: ['3/4', '7/5', '1/75', '3/5'] },
    { es: '3/4', en: '3/4', ca: '3/4' },
    '🍕',
    { es: '75 % es 75/100, y dividiendo arriba y abajo entre 25 queda 3/4. Los cuatro equivalentes que conviene saberse de memoria son 25 % = 1/4, 50 % = 1/2, 75 % = 3/4 y 100 % = el total entero.', en: '75% is 75/100, and dividing top and bottom by 25 leaves 3/4. The four equivalents worth memorising are 25% = 1/4, 50% = 1/2, 75% = 3/4 and 100% = the whole thing.', ca: '75 % és 75/100, i dividint dalt i baix entre 25 queda 3/4.' }),

  q('po-07', 'primaria',
    { es: '¿Qué significa que algo cuesta el 100 % de su precio?', en: 'What does it mean that something costs 100% of its price?', ca: 'Què vol dir que una cosa costa el 100 % del seu preu?' },
    { es: ['Que cuesta el precio entero, sin cambios', 'Que es gratis', 'Que cuesta el doble', 'Que está rebajado del todo'], en: ['That it costs the full price, unchanged', 'That it is free', 'That it costs double', 'That it is fully discounted'], ca: ['Que costa el preu sencer, sense canvis', 'Que és gratis', 'Que costa el doble', 'Que està rebaixat del tot'] },
    { es: 'Que cuesta el precio entero, sin cambios', en: 'That it costs the full price, unchanged', ca: 'Que costa el preu sencer, sense canvis' },
    '💯',
    { es: 'El 100 % es el todo, el punto de partida. Por encima de 100 hay más que el total —un 150 % es una vez y media— y por debajo, menos. Un 0 % es nada en absoluto.', en: '100% is the whole, the starting point. Above 100 there is more than the total — 150% is one and a half times — and below it, less. 0% is nothing at all.', ca: 'El 100 % és el tot, el punt de partida. Un 150 % és una vegada i mitja.' }),

  q('po-08', 'primaria',
    { es: 'Una camiseta de 20 € tiene un descuento del 10 %. ¿Cuánto cuesta ahora?', en: 'A €20 T-shirt has a 10% discount. What does it cost now?', ca: 'Una samarreta de 20 € té un descompte del 10 %. Quant costa ara?' },
    { es: ['18 €', '10 €', '19 €', '22 €'], en: ['€18', '€10', '€19', '€22'], ca: ['18 €', '10 €', '19 €', '22 €'] },
    { es: '18 €', en: '€18', ca: '18 €' },
    '🏷️',
    { es: 'El descuento es el 10 % de 20, es decir 2 €, y hay que restarlo: 20 − 2 = 18 €. El error típico es contestar 2 €, que es lo que te ahorras, no lo que pagas: conviene leer si preguntan el descuento o el precio final.', en: 'The discount is 10% of 20, that is €2, and it must be subtracted: 20 − 2 = €18. The typical error is answering €2, which is what you save, not what you pay: read whether they ask for the discount or the final price.', ca: 'El descompte és el 10 % de 20, és a dir 2 €, i cal restar-lo: 20 − 2 = 18 €.' }),

  q('po-09', 'primaria',
    { es: 'Un móvil de 300 € sube un 20 %. ¿Cuál es el precio nuevo?', en: 'A €300 phone goes up by 20%. What is the new price?', ca: 'Un mòbil de 300 € puja un 20 %. Quin és el preu nou?' },
    { es: ['360 €', '320 €', '240 €', '60 €'], en: ['€360', '€320', '€240', '€60'], ca: ['360 €', '320 €', '240 €', '60 €'] },
    { es: '360 €', en: '€360', ca: '360 €' },
    '📈',
    { es: 'El 20 % de 300 son 60, y como sube se suma: 300 + 60 = 360 €. Un atajo muy práctico es multiplicar directamente por 1,20, que ya incluye el precio y la subida en una sola operación.', en: '20% of 300 is 60, and since it rises you add: 300 + 60 = €360. A handy shortcut is multiplying straight by 1.20, which includes the price and the rise in one step.', ca: 'El 20 % de 300 són 60, i com que puja se suma: 300 + 60 = 360 €. Un drecera és multiplicar per 1,20.' }),

  q('po-10', 'primaria',
    { es: 'De 40 preguntas has acertado 30. ¿Qué porcentaje has acertado?', en: 'Out of 40 questions you got 30 right. What percentage is that?', ca: 'De 40 preguntes n\'has encertat 30. Quin percentatge has encertat?' },
    { es: ['75 %', '30 %', '70 %', '80 %'], en: ['75%', '30%', '70%', '80%'], ca: ['75 %', '30 %', '70 %', '80 %'] },
    { es: '75 %', en: '75%', ca: '75 %' },
    '✅',
    { es: '30 ÷ 40 = 0,75, y por 100 da 75 %. Es exactamente lo que hace una nota: convertir "tantos aciertos de tantos" en una escala común que se puede comparar con cualquier otro examen.', en: '30 ÷ 40 = 0.75, times 100 gives 75%. It is exactly what a grade does: turn "so many right out of so many" into a common scale comparable with any other test.', ca: '30 ÷ 40 = 0,75, i per 100 dona 75 %.' }),

  // ── PROPORCIONALIDAD Y REGLA DE TRES ────────────────────────────────────
  q('po-11', 'primaria',
    { es: '¿Qué son dos magnitudes directamente proporcionales?', en: 'What are two directly proportional quantities?', ca: 'Què són dues magnituds directament proporcionals?' },
    { es: ['Las que al aumentar una, la otra aumenta en la misma proporción', 'Las que al aumentar una, la otra disminuye', 'Las que no tienen relación', 'Las que siempre son iguales'], en: ['Ones where if one goes up, the other goes up in the same proportion', 'Ones where if one goes up, the other goes down', 'Ones with no relation', 'Ones that are always equal'], ca: ['Les que en augmentar una, l\'altra augmenta en la mateixa proporció', 'Les que en augmentar una, l\'altra disminueix', 'Les que no tenen relació', 'Les que sempre són iguals'] },
    { es: 'Las que al aumentar una, la otra aumenta en la misma proporción', en: 'Ones where if one goes up, the other goes up in the same proportion', ca: 'Les que en augmentar una, l\'altra augmenta en la mateixa proporció' },
    '📏',
    { es: 'El doble de kilos de manzanas cuesta el doble de dinero; el triple, el triple. Al dividir una magnitud entre la otra sale siempre el mismo número, que es el precio por kilo: eso se llama constante de proporcionalidad.', en: 'Twice the kilos of apples costs twice the money; three times, three times. Dividing one quantity by the other always gives the same number, the price per kilo: that is the constant of proportionality.', ca: 'El doble de quilos de pomes costa el doble de diners. En dividir una magnitud entre l\'altra surt sempre el mateix nombre.' }),

  q('po-12', 'primaria',
    { es: 'Si 3 bolígrafos cuestan 6 €, ¿cuánto cuestan 5 bolígrafos?', en: 'If 3 pens cost €6, how much do 5 pens cost?', ca: 'Si 3 bolígrafs costen 6 €, quant costen 5 bolígrafs?' },
    { es: ['10 €', '8 €', '11 €', '30 €'], en: ['€10', '€8', '€11', '€30'], ca: ['10 €', '8 €', '11 €', '30 €'] },
    { es: '10 €', en: '€10', ca: '10 €' },
    '🖊️',
    { es: 'El camino más claro es sacar primero el precio de uno: 6 ÷ 3 = 2 € cada bolígrafo, y 5 × 2 = 10 €. Se llama reducción a la unidad y funciona siempre, sin tener que recordar dónde va cada número en la regla de tres.', en: 'The clearest route is finding the price of one first: 6 ÷ 3 = €2 each, and 5 × 2 = €10. It is called reduction to unity and it always works, with no need to remember where each number goes in the rule of three.', ca: 'El camí més clar és treure primer el preu d\'un: 6 ÷ 3 = 2 € cada bolígraf, i 5 × 2 = 10 €.' }),

  q('po-13', 'primaria',
    { es: 'Un coche recorre 120 km en 2 horas a velocidad constante. ¿Cuánto recorre en 5 horas?', en: 'A car covers 120 km in 2 hours at constant speed. How far does it go in 5 hours?', ca: 'Un cotxe recorre 120 km en 2 hores a velocitat constant. Quant recorre en 5 hores?' },
    { es: ['300 km', '240 km', '600 km', '250 km'], en: ['300 km', '240 km', '600 km', '250 km'], ca: ['300 km', '240 km', '600 km', '250 km'] },
    { es: '300 km', en: '300 km', ca: '300 km' },
    '🚗',
    { es: 'En 1 hora recorre 120 ÷ 2 = 60 km, así que en 5 horas hace 5 × 60 = 300 km. Tiempo y distancia son directamente proporcionales solo si la velocidad no cambia: por eso el enunciado lo dice.', en: 'In 1 hour it covers 120 ÷ 2 = 60 km, so in 5 hours it does 5 × 60 = 300 km. Time and distance are directly proportional only if the speed does not change: that is why the question says so.', ca: 'En 1 hora recorre 120 ÷ 2 = 60 km, així que en 5 hores fa 5 × 60 = 300 km.' }),

  q('po-14', 'primaria',
    { es: 'Con 4 kg de harina salen 6 bizcochos. ¿Cuántos kilos hacen falta para 9 bizcochos?', en: 'With 4 kg of flour you get 6 cakes. How many kilos are needed for 9 cakes?', ca: 'Amb 4 kg de farina surten 6 pastissos. Quants quilos calen per a 9 pastissos?' },
    { es: ['6 kg', '7 kg', '5 kg', '13,5 kg'], en: ['6 kg', '7 kg', '5 kg', '13.5 kg'], ca: ['6 kg', '7 kg', '5 kg', '13,5 kg'] },
    { es: '6 kg', en: '6 kg', ca: '6 kg' },
    '🎂',
    { es: 'Cada bizcocho lleva 4 ÷ 6 = 0,666… kg, y por 9 salen 6 kg exactos. Se ve más fácil notando que 9 es una vez y media 6, así que hace falta una vez y media la harina: 4 + 2 = 6.', en: 'Each cake takes 4 ÷ 6 = 0.666… kg, and times 9 gives exactly 6 kg. It is easier to see that 9 is one and a half times 6, so you need one and a half times the flour: 4 + 2 = 6.', ca: '9 és una vegada i mitja 6, així que cal una vegada i mitja la farina: 4 + 2 = 6.' }),

  q('po-15', 'primaria',
    { es: '¿Qué son dos magnitudes inversamente proporcionales?', en: 'What are two inversely proportional quantities?', ca: 'Què són dues magnituds inversament proporcionals?' },
    { es: ['Las que al aumentar una, la otra disminuye en la misma proporción', 'Las que aumentan las dos a la vez', 'Las que no cambian nunca', 'Las que se suman entre sí'], en: ['Ones where if one goes up, the other goes down in the same proportion', 'Ones that both rise together', 'Ones that never change', 'Ones that add up together'], ca: ['Les que en augmentar una, l\'altra disminueix en la mateixa proporció', 'Les que augmenten totes dues alhora', 'Les que no canvien mai', 'Les que se sumen entre si'] },
    { es: 'Las que al aumentar una, la otra disminuye en la misma proporción', en: 'Ones where if one goes up, the other goes down in the same proportion', ca: 'Les que en augmentar una, l\'altra disminueix en la mateixa proporció' },
    '⚖️',
    { es: 'Si el doble de albañiles tardan la mitad de tiempo, esas dos magnitudes son inversamente proporcionales. Aquí lo que se mantiene constante no es el cociente sino el producto: el trabajo total no cambia.', en: 'If twice the builders take half the time, those quantities are inversely proportional. Here what stays constant is not the quotient but the product: the total work does not change.', ca: 'Si el doble de paletes triguen la meitat de temps, són inversament proporcionals. Aquí es manté constant el producte.' }),

  q('po-16', 'primaria',
    { es: '3 pintores tardan 8 días en pintar un edificio. ¿Cuánto tardarían 6 pintores igual de rápidos?', en: '3 painters take 8 days to paint a building. How long would 6 equally fast painters take?', ca: '3 pintors triguen 8 dies a pintar un edifici. Quant trigarien 6 pintors igual de ràpids?' },
    { es: ['4 días', '16 días', '11 días', '2 días'], en: ['4 days', '16 days', '11 days', '2 days'], ca: ['4 dies', '16 dies', '11 dies', '2 dies'] },
    { es: '4 días', en: '4 days', ca: '4 dies' },
    '🎨',
    { es: 'El doble de pintores tardan la mitad: 8 ÷ 2 = 4 días. Es proporcionalidad inversa, y se reconoce porque al aumentar una cantidad la otra baja. Si te sale un número mayor, has aplicado la directa por error.', en: 'Twice the painters take half the time: 8 ÷ 2 = 4 days. It is inverse proportionality, recognisable because as one amount rises the other falls. If you get a bigger number, you applied the direct rule by mistake.', ca: 'El doble de pintors triguen la meitat: 8 ÷ 2 = 4 dies. És proporcionalitat inversa.' }),

  q('po-17', 'primaria',
    { es: '¿Qué es una escala 1:100 en un plano?', en: 'What is a 1:100 scale on a plan?', ca: 'Què és una escala 1:100 en un plànol?' },
    { es: ['1 cm del plano son 100 cm en la realidad', '1 cm del plano son 100 m', 'El plano es 100 veces mayor que la realidad', 'Hay 100 planos iguales'], en: ['1 cm on the plan is 100 cm in reality', '1 cm on the plan is 100 m', 'The plan is 100 times bigger than reality', 'There are 100 identical plans'], ca: ['1 cm del plànol són 100 cm a la realitat', '1 cm del plànol són 100 m', 'El plànol és 100 vegades més gran que la realitat', 'Hi ha 100 plànols iguals'] },
    { es: '1 cm del plano son 100 cm en la realidad', en: '1 cm on the plan is 100 cm in reality', ca: '1 cm del plànol són 100 cm a la realitat' },
    '🗺️',
    { es: 'La escala es una proporción entre el dibujo y lo real, y las dos medidas van en la misma unidad. En un mapa de 1:100.000, un centímetro son 100.000 cm, o sea 1 km.', en: 'A scale is a proportion between drawing and reality, with both measurements in the same unit. On a 1:100,000 map, one centimetre is 100,000 cm, that is 1 km.', ca: 'L\'escala és una proporció entre el dibuix i el real, i les dues mesures van en la mateixa unitat.' }),

  q('po-18', 'primaria',
    { es: 'En un plano a escala 1:50, un pasillo mide 8 cm. ¿Cuánto mide en la realidad?', en: 'On a 1:50 plan a corridor measures 8 cm. How long is it in reality?', ca: 'En un plànol a escala 1:50, un passadís fa 8 cm. Quant fa a la realitat?' },
    { es: ['4 metros', '400 metros', '58 cm', '40 cm'], en: ['4 metres', '400 metres', '58 cm', '40 cm'], ca: ['4 metres', '400 metres', '58 cm', '40 cm'] },
    { es: '4 metros', en: '4 metres', ca: '4 metres' },
    '📐',
    { es: '8 × 50 = 400 cm, y 400 cm son 4 metros. El paso que más se olvida es el último: convertir a una unidad que se pueda imaginar. Un pasillo de 400 cm suena raro; uno de 4 metros, no.', en: '8 × 50 = 400 cm, and 400 cm is 4 metres. The step most often forgotten is the last one: converting to a unit you can picture. A 400 cm corridor sounds odd; a 4-metre one does not.', ca: '8 × 50 = 400 cm, i 400 cm són 4 metres.' }),

  q('po-19', 'primaria',
    { es: 'Repartes 60 caramelos entre 3 niños de forma proporcional a su edad: 2, 3 y 5 años. ¿Cuántos le tocan al mayor?', en: 'You share 60 sweets among 3 children in proportion to their ages: 2, 3 and 5. How many does the oldest get?', ca: 'Reparteixes 60 caramels entre 3 nens de manera proporcional a la seva edat: 2, 3 i 5 anys. Quants en toquen al gran?' },
    { es: ['30', '20', '25', '12'], en: ['30', '20', '25', '12'], ca: ['30', '20', '25', '12'] },
    { es: '30', en: '30', ca: '30' },
    '🍬',
    { es: 'Se suman las partes: 2 + 3 + 5 = 10. Cada parte vale 60 ÷ 10 = 6 caramelos, y el mayor se lleva 5 partes: 5 × 6 = 30. Comprobación rápida: 12 + 18 + 30 = 60.', en: 'Add the shares: 2 + 3 + 5 = 10. Each share is 60 ÷ 10 = 6 sweets, and the oldest takes 5 shares: 5 × 6 = 30. Quick check: 12 + 18 + 30 = 60.', ca: 'Se sumen les parts: 2 + 3 + 5 = 10. Cada part val 60 ÷ 10 = 6 caramels, i el gran s\'emporta 5 parts: 30.' }),

  q('po-20', 'primaria',
    { es: 'Un pantalón cuesta 30 € y está rebajado un 30 %. ¿Cuánto pagas?', en: 'Trousers cost €30 with a 30% discount. How much do you pay?', ca: 'Uns pantalons costen 30 € i estan rebaixats un 30 %. Quant pagues?' },
    { es: ['21 €', '9 €', '27 €', '20 €'], en: ['€21', '€9', '€27', '€20'], ca: ['21 €', '9 €', '27 €', '20 €'] },
    { es: '21 €', en: '€21', ca: '21 €' },
    '🛍️',
    { es: 'El 30 % de 30 son 9 €, y 30 − 9 = 21 €. Que el precio y el porcentaje sean el mismo número, 30, es una coincidencia que despista: el descuento no son 30 € ni el precio final 30 %.', en: '30% of 30 is €9, and 30 − 9 = €21. The price and the percentage both being 30 is a coincidence that misleads: the discount is not €30 and the final price is not 30%.', ca: 'El 30 % de 30 són 9 €, i 30 − 9 = 21 €.' }),

  q('po-21', 'primaria',
    { es: '¿Qué es más caro: un descuento del 20 % sobre 50 € o uno del 50 % sobre 20 €?', en: 'Which is dearer: 20% off €50 or 50% off €20?', ca: 'Què és més car: un descompte del 20 % sobre 50 € o un del 50 % sobre 20 €?' },
    { es: ['El primero: pagas 40 € frente a 10 €', 'El segundo: pagas más', 'Cuestan lo mismo', 'No se puede saber'], en: ['The first: you pay €40 against €10', 'The second: you pay more', 'They cost the same', 'It cannot be known'], ca: ['El primer: pagues 40 € davant de 10 €', 'El segon: pagues més', 'Costen el mateix', 'No es pot saber'] },
    { es: 'El primero: pagas 40 € frente a 10 €', en: 'The first: you pay €40 against €10', ca: 'El primer: pagues 40 € davant de 10 €' },
    '🤔',
    { es: 'Curiosamente el descuento en euros es el mismo en los dos casos, 10 €, porque el 20 % de 50 y el 50 % de 20 valen igual. Lo que cambia es el punto de partida, y por eso el precio final no tiene nada que ver.', en: 'Curiously the discount in euros is the same in both cases, €10, because 20% of 50 and 50% of 20 are equal. What differs is the starting price, which is why the final cost is nothing alike.', ca: 'El descompte en euros és el mateix, 10 €, però el punt de partida canvia i el preu final no s\'assembla gens.' }),

  q('po-22', 'primaria',
    { es: 'El IVA general en España es del 21 %. Un producto cuesta 100 € sin IVA. ¿Cuánto pagas con IVA?', en: 'General VAT in Spain is 21%. A product costs €100 before VAT. What do you pay with VAT?', ca: 'L\'IVA general a Espanya és del 21 %. Un producte costa 100 € sense IVA. Quant pagues amb IVA?' },
    { es: ['121 €', '21 €', '79 €', '112 €'], en: ['€121', '€21', '€79', '€112'], ca: ['121 €', '21 €', '79 €', '112 €'] },
    { es: '121 €', en: '€121', ca: '121 €' },
    '🧾',
    { es: 'El IVA se suma al precio: 100 + 21 = 121 €. En las tiendas el precio de la etiqueta ya lo lleva incluido, pero en presupuestos y facturas suele aparecer aparte, y por eso el total sorprende si no se ha contado.', en: 'VAT is added to the price: 100 + 21 = €121. In shops the label price already includes it, but in quotes and invoices it usually appears separately, which is why the total surprises you if you did not count it.', ca: 'L\'IVA se suma al preu: 100 + 21 = 121 €.' }),

  q('po-23', 'primaria',
    { es: 'En una encuesta, el 40 % de 300 personas prefiere el cine. ¿Cuántas personas son?', en: 'In a survey, 40% of 300 people prefer the cinema. How many people is that?', ca: 'En una enquesta, el 40 % de 300 persones prefereix el cinema. Quantes persones són?' },
    { es: ['120', '40', '180', '75'], en: ['120', '40', '180', '75'], ca: ['120', '40', '180', '75'] },
    { es: '120', en: '120', ca: '120' },
    '🎬',
    { es: '300 × 40 ÷ 100 = 120. Un porcentaje solo se puede traducir a personas si se sabe el total: por eso un titular que dice "el 40 % opina X" sin decir cuánta gente se ha preguntado informa mucho menos de lo que parece.', en: '300 × 40 ÷ 100 = 120. A percentage only becomes people if you know the total: that is why a headline saying "40% think X" without saying how many were asked tells you far less than it seems.', ca: '300 × 40 ÷ 100 = 120. Un percentatge només es pot traduir a persones si se sap el total.' }),

  q('po-24', 'primaria',
    { es: 'Has ahorrado 45 € de los 60 € que querías. ¿Qué porcentaje del objetivo llevas?', en: 'You have saved €45 of the €60 you wanted. What percentage of the goal is that?', ca: 'Has estalviat 45 € dels 60 € que volies. Quin percentatge de l\'objectiu portes?' },
    { es: ['75 %', '45 %', '60 %', '15 %'], en: ['75%', '45%', '60%', '15%'], ca: ['75 %', '45 %', '60 %', '15 %'] },
    { es: '75 %', en: '75%', ca: '75 %' },
    '🐷',
    { es: '45 ÷ 60 = 0,75, es decir el 75 %, tres cuartas partes. Al dividir siempre va arriba la parte y abajo el total: si sale un número mayor que 1, es que se han puesto al revés.', en: '45 ÷ 60 = 0.75, that is 75%, three quarters. When dividing, the part always goes on top and the total underneath: if you get a number bigger than 1, they are the wrong way round.', ca: '45 ÷ 60 = 0,75, és a dir el 75 %. En dividir sempre va a dalt la part i a baix el total.' }),

  q('po-25', 'primaria',
    { es: 'Un jersey costaba 40 € y ahora cuesta 30 €. ¿De cuánto es el descuento?', en: 'A jumper cost €40 and now costs €30. What is the discount?', ca: 'Un jersei costava 40 € i ara costa 30 €. De quant és el descompte?' },
    { es: ['25 %', '10 %', '30 %', '75 %'], en: ['25%', '10%', '30%', '75%'], ca: ['25 %', '10 %', '30 %', '75 %'] },
    { es: '25 %', en: '25%', ca: '25 %' },
    '🏷️',
    { es: 'La rebaja es de 10 €, y hay que compararla con el precio ORIGINAL: 10 ÷ 40 = 0,25, o sea el 25 %. Dividir entre 30 sería el error clásico: el porcentaje siempre se calcula sobre lo que había antes.', en: 'The reduction is €10, and it must be compared with the ORIGINAL price: 10 ÷ 40 = 0.25, that is 25%. Dividing by 30 is the classic error: the percentage is always taken on what there was before.', ca: 'La rebaixa és de 10 €, i cal comparar-la amb el preu ORIGINAL: 10 ÷ 40 = 0,25, és a dir el 25 %.' }),

  // ── ESO ─────────────────────────────────────────────────────────────────
  q('po-30', 'eso',
    { es: 'Un artículo sube un 10 % y después baja un 10 %. ¿Vuelve al precio inicial?', en: 'An item rises 10% and then falls 10%. Does it return to its original price?', ca: 'Un article puja un 10 % i després baixa un 10 %. Torna al preu inicial?' },
    { es: ['No: queda un 1 % por debajo del inicial', 'Sí, queda igual', 'No: queda un 1 % por encima', 'Depende del precio'], en: ['No: it ends 1% below the original', 'Yes, it stays the same', 'No: it ends 1% above', 'It depends on the price'], ca: ['No: queda un 1 % per sota de l\'inicial', 'Sí, queda igual', 'No: queda un 1 % per damunt', 'Depèn del preu'] },
    { es: 'No: queda un 1 % por debajo del inicial', en: 'No: it ends 1% below the original', ca: 'No: queda un 1 % per sota de l\'inicial' },
    '🔄',
    { es: 'Los porcentajes no se suman ni se restan entre sí, porque cada uno se aplica sobre una base distinta. Con 100 €: sube a 110, y el 10 % de 110 son 11, así que baja a 99. En índices: 1,10 × 0,90 = 0,99.', en: 'Percentages do not add or subtract with each other, because each applies to a different base. With €100: it rises to 110, and 10% of 110 is 11, so it drops to 99. As factors: 1.10 × 0.90 = 0.99.', ca: 'Els percentatges no se sumen entre si, perquè cadascun s\'aplica sobre una base diferent: 1,10 × 0,90 = 0,99.' }),

  q('po-31', 'eso',
    { es: '¿Por qué número se multiplica para aplicar de golpe un descuento del 15 %?', en: 'Which number do you multiply by to apply a 15% discount in one step?', ca: 'Per quin nombre es multiplica per aplicar de cop un descompte del 15 %?' },
    { es: ['Por 0,85', 'Por 0,15', 'Por 1,15', 'Por 15'], en: ['By 0.85', 'By 0.15', 'By 1.15', 'By 15'], ca: ['Per 0,85', 'Per 0,15', 'Per 1,15', 'Per 15'] },
    { es: 'Por 0,85', en: 'By 0.85', ca: 'Per 0,85' },
    '✖️',
    { es: 'Si quitas el 15 %, te queda el 85 %, y ese es el factor: 0,85. Se llama índice de variación y ahorra un paso, porque da directamente el precio final en vez del descuento. Para una subida del 15 % sería 1,15.', en: 'If you take off 15%, 85% remains, and that is the factor: 0.85. It is called the variation index and saves a step, since it gives the final price directly rather than the discount. For a 15% rise it would be 1.15.', ca: 'Si en treus el 15 %, et queda el 85 %, i aquest és el factor: 0,85. Per a una pujada del 15 % seria 1,15.' }),

  q('po-32', 'eso',
    { es: 'Un abrigo rebajado cuesta 80 € tras un descuento del 20 %. ¿Cuál era el precio original?', en: 'A discounted coat costs €80 after a 20% reduction. What was the original price?', ca: 'Un abric rebaixat costa 80 € després d\'un descompte del 20 %. Quin era el preu original?' },
    { es: ['100 €', '96 €', '64 €', '160 €'], en: ['€100', '€96', '€64', '€160'], ca: ['100 €', '96 €', '64 €', '160 €'] },
    { es: '100 €', en: '€100', ca: '100 €' },
    '🧥',
    { es: 'El problema va hacia atrás: 80 € es el 80 % del original, así que se divide en vez de multiplicar: 80 ÷ 0,80 = 100 €. Sumarle un 20 % a 80 daría 96 y estaría mal, porque ese 20 % se calcularía sobre la base equivocada.', en: 'The problem runs backwards: €80 is 80% of the original, so you divide instead of multiplying: 80 ÷ 0.80 = €100. Adding 20% to 80 would give 96 and be wrong, because that 20% would use the wrong base.', ca: '80 € és el 80 % de l\'original, així que es divideix: 80 ÷ 0,80 = 100 €.' }),

  q('po-33', 'eso',
    { es: 'En unas rebajas aplican un 20 % y luego otro 10 % sobre el precio ya rebajado. ¿Cuál es el descuento total?', en: 'A sale applies 20% and then another 10% on the already reduced price. What is the total discount?', ca: 'En unes rebaixes apliquen un 20 % i després un altre 10 % sobre el preu ja rebaixat. Quin és el descompte total?' },
    { es: ['28 %', '30 %', '25 %', '32 %'], en: ['28%', '30%', '25%', '32%'], ca: ['28 %', '30 %', '25 %', '32 %'] },
    { es: '28 %', en: '28%', ca: '28 %' },
    '🛒',
    { es: 'Se multiplican los factores: 0,80 × 0,90 = 0,72, así que pagas el 72 % y el descuento es del 28 %, no del 30 %. Es exactamente por eso que las tiendas anuncian "20 % + 10 % adicional" en vez de "30 %".', en: 'Multiply the factors: 0.80 × 0.90 = 0.72, so you pay 72% and the discount is 28%, not 30%. That is exactly why shops advertise "20% + an extra 10%" instead of "30%".', ca: 'Es multipliquen els factors: 0,80 × 0,90 = 0,72, així que pagues el 72 % i el descompte és del 28 %.' }),

  q('po-34', 'eso',
    { es: 'Una población pasa de 2.000 a 2.500 habitantes. ¿Cuál es la variación porcentual?', en: 'A population goes from 2,000 to 2,500. What is the percentage change?', ca: 'Una població passa de 2.000 a 2.500 habitants. Quina és la variació percentual?' },
    { es: ['Un aumento del 25 %', 'Un aumento del 20 %', 'Un aumento del 500 %', 'Un aumento del 50 %'], en: ['A 25% increase', 'A 20% increase', 'A 500% increase', 'A 50% increase'], ca: ['Un augment del 25 %', 'Un augment del 20 %', 'Un augment del 500 %', 'Un augment del 50 %'] },
    { es: 'Un aumento del 25 %', en: 'A 25% increase', ca: 'Un augment del 25 %' },
    '📊',
    { es: 'La fórmula es (final − inicial) ÷ inicial × 100: 500 ÷ 2.000 × 100 = 25 %. El denominador es siempre el valor de partida; usar el final daría un 20 %, que es otra cosa distinta.', en: 'The formula is (final − initial) ÷ initial × 100: 500 ÷ 2,000 × 100 = 25%. The denominator is always the starting value; using the final one would give 20%, which is something else.', ca: 'La fórmula és (final − inicial) ÷ inicial × 100: 500 ÷ 2.000 × 100 = 25 %.' }),

  q('po-35', 'eso',
    { es: 'Depositas 1.000 € al 3 % de interés simple anual. ¿Cuánto tienes al cabo de 2 años?', en: 'You deposit €1,000 at 3% simple annual interest. How much do you have after 2 years?', ca: 'Diposites 1.000 € al 3 % d\'interès simple anual. Quant tens al cap de 2 anys?' },
    { es: ['1.060 €', '1.030 €', '1.060,90 €', '1.006 €'], en: ['€1,060', '€1,030', '€1,060.90', '€1,006'], ca: ['1.060 €', '1.030 €', '1.060,90 €', '1.006 €'] },
    { es: '1.060 €', en: '€1,060', ca: '1.060 €' },
    '🏦',
    { es: 'En interés simple se gana lo mismo cada año sobre el capital inicial: 30 € por año, 60 € en dos. En interés compuesto el segundo año se calcularía sobre 1.030 y saldrían 1.060,90: esa diferencia mínima es la que se dispara con los años.', en: 'With simple interest you earn the same each year on the initial capital: €30 a year, €60 in two. With compound interest the second year would be on 1,030 and give €1,060.90: that tiny gap is what explodes over the years.', ca: 'En interès simple es guanya el mateix cada any sobre el capital inicial: 30 € l\'any, 60 € en dos.' }),

  q('po-36', 'eso',
    { es: '¿Qué relación cumplen dos magnitudes inversamente proporcionales?', en: 'What relation holds between two inversely proportional quantities?', ca: 'Quina relació compleixen dues magnituds inversament proporcionals?' },
    { es: ['Su producto es constante: x · y = k', 'Su cociente es constante: y/x = k', 'Su suma es constante', 'Su diferencia es constante'], en: ['Their product is constant: x · y = k', 'Their quotient is constant: y/x = k', 'Their sum is constant', 'Their difference is constant'], ca: ['El seu producte és constant: x · y = k', 'El seu quocient és constant: y/x = k', 'La seva suma és constant', 'La seva diferència és constant'] },
    { es: 'Su producto es constante: x · y = k', en: 'Their product is constant: x · y = k', ca: 'El seu producte és constant: x · y = k' },
    '⚖️',
    { es: 'En la directa lo constante es el cociente y la gráfica es una recta que pasa por el origen; en la inversa lo constante es el producto y la gráfica es una hipérbola, una curva que se acerca a los ejes sin tocarlos.', en: 'In direct proportion the quotient is constant and the graph is a line through the origin; in inverse proportion the product is constant and the graph is a hyperbola, a curve approaching the axes without touching them.', ca: 'En la directa el constant és el quocient i la gràfica és una recta per l\'origen; en la inversa, el producte i una hipèrbola.' }),

  q('po-37', 'eso',
    { es: 'Un depósito se llena con 4 grifos en 6 horas. ¿Cuánto tardarían 3 grifos iguales?', en: 'A tank fills with 4 taps in 6 hours. How long would 3 identical taps take?', ca: 'Un dipòsit s\'omple amb 4 aixetes en 6 hores. Quant trigarien 3 aixetes iguals?' },
    { es: ['8 horas', '4,5 horas', '18 horas', '2 horas'], en: ['8 hours', '4.5 hours', '18 hours', '2 hours'], ca: ['8 hores', '4,5 hores', '18 hores', '2 hores'] },
    { es: '8 horas', en: '8 hours', ca: '8 hores' },
    '🚰',
    { es: 'El producto se conserva: 4 × 6 = 24 horas-grifo de trabajo. Con 3 grifos, 24 ÷ 3 = 8 horas. Menos grifos, más tiempo, así que si el resultado hubiera salido menor que 6 sería señal de haberlo planteado como proporcionalidad directa.', en: 'The product is preserved: 4 × 6 = 24 tap-hours of work. With 3 taps, 24 ÷ 3 = 8 hours. Fewer taps, more time, so a result under 6 would signal you had treated it as direct proportion.', ca: 'El producte es conserva: 4 × 6 = 24 hores-aixeta. Amb 3 aixetes, 24 ÷ 3 = 8 hores.' }),

  q('po-38', 'eso',
    { es: 'En una tienda, 3 de cada 8 clientes compran. Si entran 200 personas, ¿cuántas compran?', en: 'In a shop, 3 out of every 8 customers buy. If 200 people come in, how many buy?', ca: 'En una botiga, 3 de cada 8 clients compren. Si hi entren 200 persones, quantes compren?' },
    { es: ['75', '80', '66', '24'], en: ['75', '80', '66', '24'], ca: ['75', '80', '66', '24'] },
    { es: '75', en: '75', ca: '75' },
    '🛒',
    { es: '3/8 de 200 es 200 × 3 ÷ 8 = 75. Como porcentaje, 3/8 es un 37,5 %. Fracción, porcentaje y proporción son la misma idea escrita de tres maneras, y conviene poder saltar de una a otra sin pensarlo.', en: '3/8 of 200 is 200 × 3 ÷ 8 = 75. As a percentage, 3/8 is 37.5%. Fraction, percentage and proportion are one idea written three ways, and it helps to jump between them without thinking.', ca: '3/8 de 200 és 200 × 3 ÷ 8 = 75. Com a percentatge, 3/8 és un 37,5 %.' }),

  q('po-39', 'eso',
    { es: 'El precio de un billete baja de 50 € a 35 €. ¿Qué porcentaje ha bajado?', en: 'A ticket drops from €50 to €35. By what percentage has it fallen?', ca: 'El preu d\'un bitllet baixa de 50 € a 35 €. Quin percentatge ha baixat?' },
    { es: ['30 %', '15 %', '70 %', '43 %'], en: ['30%', '15%', '70%', '43%'], ca: ['30 %', '15 %', '70 %', '43 %'] },
    { es: '30 %', en: '30%', ca: '30 %' },
    '🎫',
    { es: 'La bajada es de 15 €, y sobre los 50 de partida: 15 ÷ 50 = 0,3, un 30 %. El 70 % es lo que ahora se paga, no lo que se ha bajado: son las dos caras de la misma operación y se confunden con facilidad.', en: 'The drop is €15, on the starting 50: 15 ÷ 50 = 0.3, a 30% fall. The 70% is what you now pay, not the reduction: two sides of the same operation, easily mixed up.', ca: 'La baixada és de 15 €, i sobre els 50 de partida: 15 ÷ 50 = 0,3, un 30 %.' }),

  q('po-40', 'eso',
    { es: 'Un producto lleva un 21 % de IVA y el precio final es 121 €. ¿Cuál es el precio sin IVA?', en: 'A product carries 21% VAT and the final price is €121. What is the price before VAT?', ca: 'Un producte porta un 21 % d\'IVA i el preu final és 121 €. Quin és el preu sense IVA?' },
    { es: ['100 €', '95,59 €', '99,79 €', '105 €'], en: ['€100', '€95.59', '€99.79', '€105'], ca: ['100 €', '95,59 €', '99,79 €', '105 €'] },
    { es: '100 €', en: '€100', ca: '100 €' },
    '🧾',
    { es: 'Se divide entre 1,21: 121 ÷ 1,21 = 100 €. Restarle el 21 % a 121 daría 95,59 y sería un error, porque ese 21 % se estaría calculando sobre el precio con IVA en vez de sobre el de partida.', en: 'Divide by 1.21: 121 ÷ 1.21 = €100. Subtracting 21% from 121 would give 95.59 and be wrong, because that 21% would be taken on the price with VAT rather than on the base.', ca: 'Es divideix entre 1,21: 121 ÷ 1,21 = 100 €. Restar el 21 % a 121 seria un error.' }),

  q('po-41', 'eso',
    { es: 'Una moto cuesta 4.000 € y pierde un 20 % de valor cada año. ¿Cuánto vale a los 2 años?', en: 'A motorbike costs €4,000 and loses 20% of its value each year. What is it worth after 2 years?', ca: 'Una moto costa 4.000 € i perd un 20 % de valor cada any. Quant val als 2 anys?' },
    { es: ['2.560 €', '2.400 €', '3.200 €', '1.600 €'], en: ['€2,560', '€2,400', '€3,200', '€1,600'], ca: ['2.560 €', '2.400 €', '3.200 €', '1.600 €'] },
    { es: '2.560 €', en: '€2,560', ca: '2.560 €' },
    '🏍️',
    { es: 'Cada año se multiplica por 0,80: 4.000 × 0,80 × 0,80 = 2.560 €. Restar un 40 % de golpe daría 2.400 y estaría mal, porque el segundo año el 20 % se calcula sobre 3.200, no sobre los 4.000 iniciales.', en: 'Each year multiply by 0.80: 4,000 × 0.80 × 0.80 = €2,560. Taking 40% off in one go would give 2,400 and be wrong, because in year two the 20% is on 3,200, not on the original 4,000.', ca: 'Cada any es multiplica per 0,80: 4.000 × 0,80 × 0,80 = 2.560 €.' }),

  q('po-42', 'eso',
    { es: 'Mezclas 2 kg de café de 12 €/kg con 3 kg de 7 €/kg. ¿A cuánto sale el kilo de la mezcla?', en: 'You mix 2 kg of coffee at €12/kg with 3 kg at €7/kg. What does a kilo of the mix cost?', ca: 'Barreges 2 kg de cafè de 12 €/kg amb 3 kg de 7 €/kg. A quant surt el quilo de la barreja?' },
    { es: ['9 €/kg', '9,50 €/kg', '19 €/kg', '8 €/kg'], en: ['€9/kg', '€9.50/kg', '€19/kg', '€8/kg'], ca: ['9 €/kg', '9,50 €/kg', '19 €/kg', '8 €/kg'] },
    { es: '9 €/kg', en: '€9/kg', ca: '9 €/kg' },
    '☕',
    { es: 'Cuesta 2 × 12 + 3 × 7 = 45 € en total, por 5 kg: 45 ÷ 5 = 9 €/kg. La media de 12 y 7 sería 9,50, pero no vale, porque hay más kilos del barato: es una media ponderada, igual que la nota de un trimestre.', en: 'It costs 2 × 12 + 3 × 7 = €45 in total for 5 kg: 45 ÷ 5 = €9/kg. The plain average of 12 and 7 would be 9.50, but that is wrong because there are more kilos of the cheap one: it is a weighted average, like a term grade.', ca: 'Costa 2 × 12 + 3 × 7 = 45 € en total, per 5 kg: 45 ÷ 5 = 9 €/kg. És una mitjana ponderada.' }),

]

export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
// El nivel alto usa el banco ENTERO: quien va por ESO también puede resolver
// las de primaria, y filtrando aquí el examen se quedaría en 13 preguntas.
export const PREGUNTAS_ESO = PREGUNTAS
