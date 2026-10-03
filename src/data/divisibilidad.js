// Divisibilidad — Matemáticas, Primaria + ESO (5º-6º de Primaria y 1º de ESO).
// Múltiplos y divisores, criterios de divisibilidad, números primos y
// compuestos, descomposición en factores primos, m.c.m. y m.c.d., y los
// problemas de «cuándo coinciden» y «trozos iguales lo más grandes posible».
//
// Fracciones usa el m.c.m. de pasada para sumar con distinto denominador, pero
// no había ningún examen del tema en sí. Todas las cuentas de enunciados,
// opciones y explicaciones están comprobadas.
//
// La respuesta buena va siempre la PRIMERA en `opciones`: ExamenMC baraja el
// orden al servir cada pregunta (lib/ordenOpciones.js).
function q(id, nivel, emoji, pregunta, opciones, explicacion) {
  // La correcta se guarda como TEXTO (lo que leen ExamenMC y las tarjetas
  // imprimibles de lib/tarjetasExamen.js): el de la primera opción.
  const correcta = { es: opciones.es[0], en: opciones.en[0], ca: opciones.ca[0] }
  return { id, nivel, emoji, pregunta, opciones, correcta, explicacion }
}
const T = (es, en, ca) => ({ es, en, ca })
const O = (es, en, ca) => ({ es, en, ca })
// Opciones que son solo números: iguales en los tres idiomas.
const N = (...xs) => ({ es: xs, en: xs, ca: xs })

export const PREGUNTAS = [
  // ── Primaria ────────────────────────────────────────────────────────────
  q('dv-01', 'primaria', '✖️',
    T("¿Cuál de estos números es múltiplo de 7?", "Which of these numbers is a multiple of 7?", "Quin d’aquests nombres és múltiple de 7?"),
    N('35', '27', '45', '17'),
    T("35 = 7 × 5, así que está en la tabla del 7. Un múltiplo de un número es el resultado de multiplicarlo por otro número natural.",
      "35 = 7 × 5, so it is in the 7 times table. A multiple of a number is what you get when you multiply it by a natural number.",
      "35 = 7 × 5, així que és a la taula del 7. Un múltiple d’un nombre és el resultat de multiplicar-lo per un altre nombre natural.")),

  q('dv-02', 'primaria', '➗',
    T("¿Cuál de estos números es divisor de 24?", "Which of these numbers is a factor (divisor) of 24?", "Quin d’aquests nombres és divisor de 24?"),
    N('6', '5', '7', '9'),
    T("24 : 6 = 4 exacto, sin resto. Un divisor de un número es otro que lo divide exactamente. 5, 7 y 9 dejan resto al dividir 24.",
      "24 ÷ 6 = 4 exactly, with no remainder. A factor of a number divides it exactly. 5, 7 and 9 leave a remainder when dividing 24.",
      "24 : 6 = 4 exacte, sense residu. Un divisor d’un nombre és un altre que el divideix exactament. 5, 7 i 9 deixen residu en dividir 24.")),

  q('dv-03', 'primaria', '🧮',
    T("¿Cuáles son todos los divisores de 12?", "What are all the factors of 12?", "Quins són tots els divisors de 12?"),
    O(["1, 2, 3, 4, 6 y 12", "1, 2, 3, 4 y 6", "2, 4, 6, 8, 10 y 12", "12, 24, 36 y 48"],
      ["1, 2, 3, 4, 6 and 12", "1, 2, 3, 4 and 6", "2, 4, 6, 8, 10 and 12", "12, 24, 36 and 48"],
      ["1, 2, 3, 4, 6 i 12", "1, 2, 3, 4 i 6", "2, 4, 6, 8, 10 i 12", "12, 24, 36 i 48"]),
    T("Se buscan por parejas: 1 × 12, 2 × 6 y 3 × 4. El 1 y el propio número siempre son divisores. La última opción son múltiplos, no divisores.",
      "Find them in pairs: 1 × 12, 2 × 6 and 3 × 4. 1 and the number itself are always factors. The last option lists multiples, not factors.",
      "Es busquen per parelles: 1 × 12, 2 × 6 i 3 × 4. L’1 i el mateix nombre sempre són divisors. L’última opció són múltiples, no divisors.")),

  q('dv-04', 'primaria', '2️⃣',
    T("¿Cuándo es un número divisible entre 2?", "When is a number divisible by 2?", "Quan és un nombre divisible entre 2?"),
    O(["Cuando termina en 0, 2, 4, 6 u 8", "Cuando la suma de sus cifras es par", "Cuando empieza por una cifra par", "Cuando tiene dos cifras"],
      ["When it ends in 0, 2, 4, 6 or 8", "When the sum of its digits is even", "When it starts with an even digit", "When it has two digits"],
      ["Quan acaba en 0, 2, 4, 6 o 8", "Quan la suma de les xifres és parella", "Quan comença per una xifra parella", "Quan té dues xifres"]),
    T("Los números divisibles entre 2 son los pares, y se reconocen solo por la última cifra: 3.458 es par aunque empiece por 3.",
      "Numbers divisible by 2 are the even ones, and you can tell just from the last digit: 3,458 is even even though it starts with 3.",
      "Els nombres divisibles entre 2 són els parells, i es reconeixen només per l’última xifra: 3.458 és parell encara que comenci per 3.")),

  q('dv-05', 'primaria', '3️⃣',
    T("¿Cuál de estos números es divisible entre 3?", "Which of these numbers is divisible by 3?", "Quin d’aquests nombres és divisible entre 3?"),
    N('471', '382', '254', '140'),
    T("Criterio del 3: la suma de las cifras tiene que ser múltiplo de 3. En 471, 4 + 7 + 1 = 12, que sí lo es. En los otros la suma da 13, 11 y 5.",
      "Rule for 3: the sum of the digits must be a multiple of 3. In 471, 4 + 7 + 1 = 12, which is. For the others the sum is 13, 11 and 5.",
      "Criteri del 3: la suma de les xifres ha de ser múltiple de 3. A 471, 4 + 7 + 1 = 12, que sí que ho és. Als altres la suma dona 13, 11 i 5.")),

  q('dv-06', 'primaria', '5️⃣',
    T("¿Cuál de estos números es divisible entre 5?", "Which of these numbers is divisible by 5?", "Quin d’aquests nombres és divisible entre 5?"),
    N('1035', '1052', '2503', '5551'),
    T("Un número es divisible entre 5 si termina en 0 o en 5. Que tenga cincos en otras cifras no importa: solo cuenta la última.",
      "A number is divisible by 5 if it ends in 0 or 5. Having fives in other places does not matter: only the last digit counts.",
      "Un nombre és divisible entre 5 si acaba en 0 o en 5. Que tingui cincs en altres xifres no importa: només compta l’última.")),

  q('dv-07', 'primaria', '💎',
    T("¿Qué es un número primo?", "What is a prime number?", "Què és un nombre primer?"),
    O(["Un número que solo tiene dos divisores: el 1 y él mismo", "Un número que no se puede dividir entre nada", "Cualquier número impar", "El primer número de una serie"],
      ["A number with exactly two factors: 1 and itself", "A number that cannot be divided by anything", "Any odd number", "The first number in a sequence"],
      ["Un nombre que només té dos divisors: l’1 i ell mateix", "Un nombre que no es pot dividir entre res", "Qualsevol nombre senar", "El primer nombre d’una sèrie"]),
    T("2, 3, 5, 7, 11, 13… solo se dejan dividir exactamente entre 1 y entre sí mismos. No todos los impares son primos: 9 = 3 × 3. Y el 2 es primo y par.",
      "2, 3, 5, 7, 11, 13… can only be divided exactly by 1 and themselves. Not every odd number is prime: 9 = 3 × 3. And 2 is both prime and even.",
      "2, 3, 5, 7, 11, 13… només es deixen dividir exactament entre 1 i entre ells mateixos. No tots els senars són primers: 9 = 3 × 3. I el 2 és primer i parell.")),

  q('dv-08', 'primaria', '🔍',
    T("¿Cuál de estos números es primo?", "Which of these numbers is prime?", "Quin d’aquests nombres és primer?"),
    N('13', '15', '21', '27'),
    T("13 solo es divisible entre 1 y 13. Los otros parecen primos por ser impares, pero 15 = 3 × 5, 21 = 3 × 7 y 27 = 3 × 9.",
      "13 is only divisible by 1 and 13. The others look prime because they are odd, but 15 = 3 × 5, 21 = 3 × 7 and 27 = 3 × 9.",
      "13 només és divisible entre 1 i 13. Els altres semblen primers perquè són senars, però 15 = 3 × 5, 21 = 3 × 7 i 27 = 3 × 9.")),

  q('dv-09', 'primaria', '1️⃣',
    T("¿Es el 1 un número primo?", "Is 1 a prime number?", "És l’1 un nombre primer?"),
    O(["No: solo tiene un divisor, y un primo necesita exactamente dos", "Sí: es el primer primo", "Sí, porque es impar", "Solo en Primaria"],
      ["No: it has only one factor, and a prime needs exactly two", "Yes: it is the first prime", "Yes, because it is odd", "Only in primary school"],
      ["No: només té un divisor, i un primer en necessita exactament dos", "Sí: és el primer primer", "Sí, perquè és senar", "Només a Primària"]),
    T("El 1 no es primo ni compuesto. El primer número primo es el 2, que además es el único primo par.",
      "1 is neither prime nor composite. The first prime number is 2, which is also the only even prime.",
      "L’1 no és primer ni compost. El primer nombre primer és el 2, que a més és l’únic primer parell.")),

  q('dv-10', 'primaria', '4️⃣',
    T("¿Cuáles son los cinco primeros múltiplos de 4 (sin contar el 0)?", "What are the first five multiples of 4 (not counting 0)?", "Quins són els cinc primers múltiples de 4 (sense comptar el 0)?"),
    O(["4, 8, 12, 16 y 20", "1, 2, 4, 8 y 16", "4, 14, 24, 34 y 44", "2, 4, 6, 8 y 10"],
      ["4, 8, 12, 16 and 20", "1, 2, 4, 8 and 16", "4, 14, 24, 34 and 44", "2, 4, 6, 8 and 10"],
      ["4, 8, 12, 16 i 20", "1, 2, 4, 8 i 16", "4, 14, 24, 34 i 44", "2, 4, 6, 8 i 10"]),
    T("Son 4 × 1, 4 × 2, 4 × 3, 4 × 4 y 4 × 5: la tabla del 4. La segunda opción mezcla divisores de 16, y la última es la tabla del 2.",
      "They are 4 × 1, 4 × 2, 4 × 3, 4 × 4 and 4 × 5: the 4 times table. The second option mixes up factors of 16, and the last is the 2 times table.",
      "Són 4 × 1, 4 × 2, 4 × 3, 4 × 4 i 4 × 5: la taula del 4. La segona opció barreja divisors de 16, i l’última és la taula del 2.")),

  q('dv-11', 'primaria', '♾️',
    T("¿Cuántos múltiplos tiene un número?", "How many multiples does a number have?", "Quants múltiples té un nombre?"),
    O(["Infinitos", "Tantos como divisores", "Diez, los de su tabla", "Ninguno si es primo"],
      ["Infinitely many", "As many as it has factors", "Ten, those in its times table", "None if it is prime"],
      ["Infinits", "Tants com divisors", "Deu, els de la seva taula", "Cap si és primer"]),
    T("Siempre se puede multiplicar por un número más grande, así que los múltiplos no se acaban. Los divisores, en cambio, son pocos y nunca mayores que el número.",
      "You can always multiply by a bigger number, so the multiples never end. Factors, on the other hand, are few and never bigger than the number.",
      "Sempre es pot multiplicar per un nombre més gran, així que els múltiples no s’acaben. Els divisors, en canvi, són pocs i mai més grans que el nombre.")),

  q('dv-12', 'primaria', '🔟',
    T("¿Cuál de estos números es divisible entre 10?", "Which of these numbers is divisible by 10?", "Quin d’aquests nombres és divisible entre 10?"),
    N('340', '345', '304', '3401'),
    T("Un número es divisible entre 10 cuando termina en 0. El 304 tiene un cero, pero en medio: no vale.",
      "A number is divisible by 10 when it ends in 0. 304 has a zero, but in the middle: that does not count.",
      "Un nombre és divisible entre 10 quan acaba en 0. El 304 té un zero, però al mig: no val.")),

  q('dv-13', 'primaria', '🧱',
    T("¿Cuál de estos números es compuesto (no primo)?", "Which of these numbers is composite (not prime)?", "Quin d’aquests nombres és compost (no primer)?"),
    N('9', '7', '11', '2'),
    T("Un número compuesto tiene más de dos divisores. El 9 tiene tres: 1, 3 y 9. El 2, el 7 y el 11 son primos.",
      "A composite number has more than two factors. 9 has three: 1, 3 and 9. 2, 7 and 11 are prime.",
      "Un nombre compost té més de dos divisors. El 9 en té tres: 1, 3 i 9. El 2, el 7 i l’11 són primers.")),

  q('dv-14', 'primaria', '🍬',
    T("Hay 18 caramelos para repartir en bolsas iguales. ¿En qué caso SOBRARÍA alguno?", "There are 18 sweets to share into equal bags. In which case would some be LEFT OVER?", "Hi ha 18 caramels per repartir en bosses iguals. En quin cas en SOBRARIA algun?"),
    O(["En bolsas de 4", "En bolsas de 3", "En bolsas de 6", "En bolsas de 2"],
      ["In bags of 4", "In bags of 3", "In bags of 6", "In bags of 2"],
      ["En bosses de 4", "En bosses de 3", "En bosses de 6", "En bosses de 2"]),
    T("Solo se reparte sin que sobre nada si el tamaño de la bolsa es divisor de 18 (1, 2, 3, 6, 9 y 18). Con bolsas de 4 salen 4 bolsas y sobran 2.",
      "Nothing is left over only if the bag size is a factor of 18 (1, 2, 3, 6, 9 and 18). With bags of 4 you fill 4 bags and 2 are left over.",
      "Només es reparteix sense que en sobri cap si la mida de la bossa és divisor de 18 (1, 2, 3, 6, 9 i 18). Amb bosses de 4 surten 4 bosses i en sobren 2.")),

  // ── ESO ─────────────────────────────────────────────────────────────────
  q('dv-15', 'eso', '🌳',
    T("¿Cuál es la descomposición en factores primos de 60?", "What is the prime factorisation of 60?", "Quina és la descomposició en factors primers de 60?"),
    N('2² · 3 · 5', '2 · 3 · 5', '2³ · 3 · 5', '2² · 15'),
    T("60 : 2 = 30, 30 : 2 = 15, 15 : 3 = 5, 5 : 5 = 1. Queda 2 · 2 · 3 · 5 = 2² · 3 · 5. «2² · 15» no vale porque 15 no es primo, y 2³ · 3 · 5 sería 120.",
      "60 ÷ 2 = 30, 30 ÷ 2 = 15, 15 ÷ 3 = 5, 5 ÷ 5 = 1. That gives 2 · 2 · 3 · 5 = 2² · 3 · 5. «2² · 15» is wrong because 15 is not prime, and 2³ · 3 · 5 would be 120.",
      "60 : 2 = 30, 30 : 2 = 15, 15 : 3 = 5, 5 : 5 = 1. Queda 2 · 2 · 3 · 5 = 2² · 3 · 5. «2² · 15» no val perquè 15 no és primer, i 2³ · 3 · 5 seria 120.")),

  q('dv-16', 'eso', '🤝',
    T("¿Cuál es el máximo común divisor de 12 y 18?", "What is the highest common factor of 12 and 18?", "Quin és el màxim comú divisor de 12 i 18?"),
    N('6', '3', '36', '2'),
    T("Divisores de 12: 1, 2, 3, 4, 6, 12. Divisores de 18: 1, 2, 3, 6, 9, 18. El mayor que comparten es el 6. El 36 es su mínimo común múltiplo.",
      "Factors of 12: 1, 2, 3, 4, 6, 12. Factors of 18: 1, 2, 3, 6, 9, 18. The largest they share is 6. 36 is their lowest common multiple.",
      "Divisors de 12: 1, 2, 3, 4, 6, 12. Divisors de 18: 1, 2, 3, 6, 9, 18. El més gran que comparteixen és el 6. El 36 és el seu mínim comú múltiple.")),

  q('dv-17', 'eso', '🔁',
    T("¿Cuál es el mínimo común múltiplo de 4 y 6?", "What is the lowest common multiple of 4 and 6?", "Quin és el mínim comú múltiple de 4 i 6?"),
    N('12', '24', '2', '10'),
    T("Múltiplos de 4: 4, 8, 12, 16… Múltiplos de 6: 6, 12, 18… El primero que coincide es el 12. El 24 también es común, pero no el más pequeño.",
      "Multiples of 4: 4, 8, 12, 16… Multiples of 6: 6, 12, 18… The first one they share is 12. 24 is also common, but not the smallest.",
      "Múltiples de 4: 4, 8, 12, 16… Múltiples de 6: 6, 12, 18… El primer que coincideix és el 12. El 24 també és comú, però no el més petit.")),

  q('dv-18', 'eso', '📐',
    T("Con la descomposición en primos, ¿cómo se calcula el m.c.m.?", "Using prime factorisation, how do you find the LCM?", "Amb la descomposició en primers, com es calcula el m.c.m.?"),
    O(["Factores comunes y no comunes, con el mayor exponente", "Solo los factores comunes, con el menor exponente", "Solo los factores no comunes", "Sumando las dos descomposiciones"],
      ["Common and non-common factors, with the highest power", "Only the common factors, with the lowest power", "Only the non-common factors", "By adding the two factorisations"],
      ["Factors comuns i no comuns, amb l’exponent més gran", "Només els factors comuns, amb l’exponent més petit", "Només els factors no comuns", "Sumant les dues descomposicions"]),
    T("Ejemplo: 8 = 2³ y 12 = 2² · 3. Se cogen todos los factores (2 y 3) con el mayor exponente: 2³ · 3 = 24. La segunda opción es la regla del m.c.d.",
      "Example: 8 = 2³ and 12 = 2² · 3. Take every factor (2 and 3) with its highest power: 2³ · 3 = 24. The second option is the rule for the HCF.",
      "Exemple: 8 = 2³ i 12 = 2² · 3. S’agafen tots els factors (2 i 3) amb l’exponent més gran: 2³ · 3 = 24. La segona opció és la regla del m.c.d.")),

  q('dv-19', 'eso', '📏',
    T("Con la descomposición en primos, ¿cómo se calcula el m.c.d.?", "Using prime factorisation, how do you find the HCF?", "Amb la descomposició en primers, com es calcula el m.c.d.?"),
    O(["Solo los factores comunes, con el menor exponente", "Factores comunes y no comunes, con el mayor exponente", "Multiplicando los dos números", "Restando el menor al mayor"],
      ["Only the common factors, with the lowest power", "Common and non-common factors, with the highest power", "By multiplying the two numbers", "By subtracting the smaller from the larger"],
      ["Només els factors comuns, amb l’exponent més petit", "Factors comuns i no comuns, amb l’exponent més gran", "Multiplicant els dos nombres", "Restant el petit al gran"]),
    T("Ejemplo: 12 = 2² · 3 y 18 = 2 · 3². Comunes: el 2 y el 3, cada uno con su menor exponente: 2 · 3 = 6.",
      "Example: 12 = 2² · 3 and 18 = 2 · 3². Common factors: 2 and 3, each with its lowest power: 2 · 3 = 6.",
      "Exemple: 12 = 2² · 3 i 18 = 2 · 3². Comuns: el 2 i el 3, cadascun amb el seu exponent més petit: 2 · 3 = 6.")),

  q('dv-20', 'eso', '🚌',
    T("Un autobús pasa cada 12 minutos y otro cada 18. Si salen juntos a las 8:00, ¿a qué hora vuelven a coincidir?", "One bus comes every 12 minutes and another every 18. If they leave together at 8:00, when do they next coincide?", "Un autobús passa cada 12 minuts i un altre cada 18. Si surten junts a les 8:00, a quina hora tornen a coincidir?"),
    N('8:36', '8:30', '8:06', '9:00'),
    T("Coinciden en los múltiplos comunes, y la primera vez es el m.c.m.(12, 18) = 36 minutos después. «Cuándo vuelven a coincidir» casi siempre es un m.c.m.",
      "They coincide at the common multiples, and the first time is LCM(12, 18) = 36 minutes later. «When do they coincide again» is almost always an LCM.",
      "Coincideixen als múltiples comuns, i la primera vegada és el m.c.m.(12, 18) = 36 minuts després. «Quan tornen a coincidir» gairebé sempre és un m.c.m.")),

  q('dv-21', 'eso', '🎀',
    T("Hay dos cintas de 24 cm y 36 cm. Se quieren cortar en trozos iguales, lo más largos posible y sin que sobre nada. ¿Cuánto mide cada trozo?", "There are two ribbons, 24 cm and 36 cm long. You want to cut them into equal pieces, as long as possible, with nothing left over. How long is each piece?", "Hi ha dues cintes de 24 cm i 36 cm. Es volen tallar en trossos iguals, tan llargs com sigui possible i sense que en sobri res. Quant fa cada tros?"),
    N('12 cm', '6 cm', '72 cm', '4 cm'),
    T("El trozo tiene que dividir a 24 y a 36, y ser el mayor posible: es el m.c.d.(24, 36) = 12. Salen 2 + 3 = 5 trozos. «Lo más grande posible que reparte» es un m.c.d.",
      "The piece must divide both 24 and 36 and be as big as possible: it is HCF(24, 36) = 12. You get 2 + 3 = 5 pieces. «The largest size that shares exactly» is an HCF.",
      "El tros ha de dividir 24 i 36, i ser el més gran possible: és el m.c.d.(24, 36) = 12. Surten 2 + 3 = 5 trossos. «El més gran possible que reparteix» és un m.c.d.")),

  q('dv-22', 'eso', '🧩',
    T("Dos números son primos entre sí cuando su m.c.d. es 1. ¿Qué pareja lo es?", "Two numbers are coprime when their HCF is 1. Which pair is coprime?", "Dos nombres són primers entre si quan el seu m.c.d. és 1. Quina parella ho és?"),
    O(["8 y 15", "6 y 9", "10 y 25", "12 y 18"],
      ["8 and 15", "6 and 9", "10 and 25", "12 and 18"],
      ["8 i 15", "6 i 9", "10 i 25", "12 i 18"]),
    T("8 = 2³ y 15 = 3 · 5 no comparten ningún factor, así que su m.c.d. es 1, aunque ninguno de los dos sea primo. Las demás parejas comparten el 3, el 5 o el 6.",
      "8 = 2³ and 15 = 3 · 5 share no factor, so their HCF is 1, even though neither is prime. The other pairs share 3, 5 or 6.",
      "8 = 2³ i 15 = 3 · 5 no comparteixen cap factor, així que el seu m.c.d. és 1, encara que cap dels dos sigui primer. Les altres parelles comparteixen el 3, el 5 o el 6.")),

  q('dv-23', 'eso', '9️⃣',
    T("¿Cuál de estos números es divisible entre 9?", "Which of these numbers is divisible by 9?", "Quin d’aquests nombres és divisible entre 9?"),
    N('3861', '3862', '1234', '5550'),
    T("Criterio del 9: la suma de las cifras es múltiplo de 9. En 3861, 3 + 8 + 6 + 1 = 18. En los demás da 19, 10 y 15.",
      "Rule for 9: the sum of the digits is a multiple of 9. In 3861, 3 + 8 + 6 + 1 = 18. For the others it is 19, 10 and 15.",
      "Criteri del 9: la suma de les xifres és múltiple de 9. A 3861, 3 + 8 + 6 + 1 = 18. Als altres dona 19, 10 i 15.")),

  q('dv-24', 'eso', '🔗',
    T("Si m.c.d.(12, 18) = 6, ¿cuánto vale m.c.m.(12, 18)?", "If HCF(12, 18) = 6, what is LCM(12, 18)?", "Si m.c.d.(12, 18) = 6, quant val m.c.m.(12, 18)?"),
    N('36', '216', '72', '6'),
    T("Para dos números se cumple m.c.d. × m.c.m. = producto de los números. 12 × 18 = 216, y 216 : 6 = 36.",
      "For two numbers, HCF × LCM = the product of the numbers. 12 × 18 = 216, and 216 ÷ 6 = 36.",
      "Per a dos nombres es compleix m.c.d. × m.c.m. = producte dels nombres. 12 × 18 = 216, i 216 : 6 = 36.")),
]

// Convención de src/data: el nivel bajo se filtra y el alto usa el banco
// ENTERO (ver memoria «bancos-examen»).
export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
export const PREGUNTAS_ESO = PREGUNTAS
