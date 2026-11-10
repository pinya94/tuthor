// Páginas de estudio de matemáticas fuera del motor de MODOS (mathEngine):
// temas con juego propio y mucha búsqueda que no tenían página. Se fusionan en
// CONTENIDO_TEMA con la clave = slug (/estudiar/matematicas/<slug>).
// Los ejemplos salen de aRomano(), la misma función que corrige el juego.
import { aRomano } from '../lib/romanos.js'

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

export const MATEMATICAS_TEMA = {
  'numeros-romanos': numerosRomanos,
}
