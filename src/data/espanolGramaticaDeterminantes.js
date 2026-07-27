function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const TODAS = [
  q('det-01', 'primaria',
    { es: '¿Cuál de estas palabras es un artículo?', en: 'Which of these words is an article?', ca: 'Quina d\'aquestes paraules és un article?' },
    { es: ['casa', 'la', 'grande', 'corre'], en: ['casa', 'la', 'grande', 'corre'], ca: ['casa', 'la', 'gran', 'corre'] },
    1, '📖',
    { es: 'Los artículos son: el, la, los, las (determinados) y un, una, unos, unas (indeterminados). Acompañan al sustantivo.', en: 'Articles are: el, la, los, las (definite) and un, una… (indefinite).', ca: 'Els articles són: el, la, els, les (determinats) i un, una… (indeterminats).' }),

  q('det-02', 'primaria',
    { es: '¿Cuál es un artículo indeterminado?', en: 'Which is an indefinite article?', ca: 'Quin és un article indeterminat?' },
    { es: ['el', 'los', 'una', 'la'], en: ['el', 'los', 'una', 'la'], ca: ['el', 'els', 'una', 'la'] },
    2, '❓',
    { es: 'Los indeterminados (un, una, unos, unas) presentan algo no conocido. Los determinados (el, la, los, las), algo ya conocido.', en: 'Indefinite articles (un, una…) present something not yet known; definite ones (el, la…), something known.', ca: 'Els indeterminats (un, una…) presenten quelcom no conegut; els determinats (el, la…), quelcom conegut.' }),

  q('det-03', 'primaria',
    { es: 'En "este libro es mío", ¿qué es "este"?', en: 'In "este libro es mío", what is "este"?', ca: 'A "aquest llibre és meu", què és "aquest"?' },
    { es: ['Un demostrativo', 'Un verbo', 'Un sustantivo', 'Un adverbio'], en: ['A demonstrative', 'A verb', 'A noun', 'An adverb'], ca: ['Un demostratiu', 'Un verb', 'Un substantiu', 'Un adverbi'] },
    0, '👉',
    { es: 'Los demostrativos (este, ese, aquel…) señalan la distancia: este (cerca), ese (media), aquel (lejos).', en: 'Demonstratives (este, ese, aquel) show distance: este (near), ese (medium), aquel (far).', ca: 'Els demostratius (aquest, aquell…) indiquen la distància.' }),

  q('det-04', 'primaria',
    { es: '¿Cuál es un determinante posesivo?', en: 'Which is a possessive determiner?', ca: 'Quin és un determinant possessiu?' },
    { es: ['mi', 'y', 'muy', 'con'], en: ['mi (my)', 'y (and)', 'muy (very)', 'con (with)'], ca: ['el meu', 'i', 'molt', 'amb'] },
    0, '🔑',
    { es: 'Los posesivos (mi, tu, su, nuestro…) indican de quién es algo: "mi casa", "tu perro".', en: 'Possessives (mi, tu, su…) show ownership: "mi casa" (my house).', ca: 'Els possessius (el meu, el teu, el seu…) indiquen de qui és una cosa.' }),

  q('det-05', 'primaria',
    { es: '¿Qué artículo acompaña a "agua"?', en: 'Which article goes with "agua"?', ca: 'Quin article acompanya "aigua"?' },
    { es: ['el agua', 'la agua', 'lo agua', 'las agua'], en: ['el agua', 'la agua', 'lo agua', 'las agua'], ca: ['l\'aigua', 'el aigua', 'lo aigua', 'les aigua'] },
    0, '💧',
    { es: '"Agua" es femenino, pero como empieza por "a-" tónica se usa "el agua" (en singular) para evitar cacofonía. En plural: "las aguas".', en: '"Agua" is feminine, but takes "el" in the singular (el agua) because it starts with a stressed "a-". Plural: las aguas.', ca: 'En català es fa l\'elisió: "l\'aigua".' }),

  q('det-06', 'primaria',
    { es: '¿Cuál es un numeral?', en: 'Which is a numeral determiner?', ca: 'Quin és un numeral?' },
    { es: ['bonito', 'tres', 'salta', 'aquí'], en: ['bonito', 'tres', 'salta', 'aquí'], ca: ['bonic', 'tres', 'salta', 'aquí'] },
    1, '🔢',
    { es: 'Los numerales indican cantidad exacta (cardinales: dos, tres) u orden (ordinales: primero, segundo).', en: 'Numerals give exact quantity (cardinals: dos, tres) or order (ordinals: primero, segundo).', ca: 'Els numerals indiquen quantitat exacta (cardinals) o ordre (ordinals).' }),

  q('det-07', 'eso',
    { es: '¿Cuál es un determinante indefinido?', en: 'Which is an indefinite determiner?', ca: 'Quin és un determinant indefinit?' },
    { es: ['algunos', 'segundo', 'este', 'nuestro'], en: ['algunos (some)', 'segundo (second)', 'este (this)', 'nuestro (our)'], ca: ['alguns', 'segon', 'aquest', 'el nostre'] },
    0, '🤷',
    { es: 'Los indefinidos expresan cantidad imprecisa: algunos, varios, muchos, pocos, ningún. "Segundo" es ordinal, "este" demostrativo, "nuestro" posesivo.', en: 'Indefinites express imprecise quantity: algunos, varios, muchos, ningún.', ca: 'Els indefinits expressen quantitat imprecisa: alguns, molts, pocs, cap.' }),

  q('det-08', 'eso',
    { es: 'La diferencia entre determinante y pronombre es que el determinante…', en: 'The difference between a determiner and a pronoun is that the determiner…', ca: 'La diferència entre determinant i pronom és que el determinant…' },
    { es: ['Acompaña a un sustantivo', 'Sustituye a un sustantivo', 'Es siempre un verbo', 'No existe'], en: ['Accompanies a noun', 'Replaces a noun', 'Is always a verb', 'Does not exist'], ca: ['Acompanya un substantiu', 'Substitueix un substantiu', 'És sempre un verb', 'No existeix'] },
    0, '🔗',
    { es: 'El determinante acompaña al sustantivo ("este libro"); el pronombre lo sustituye ("este es mío"). Muchas palabras pueden ser ambas cosas según su uso.', en: 'A determiner accompanies a noun ("este libro"); a pronoun replaces it ("este es mío").', ca: 'El determinant acompanya el substantiu; el pronom el substitueix.' }),

  q('det-09', 'eso',
    { es: 'En "sus dos primeros libros", ¿cuántos determinantes hay?', en: 'In "sus dos primeros libros", how many determiners are there?', ca: 'A "els seus dos primers llibres", quants determinants hi ha?' },
    { es: ['Uno', 'Dos', 'Tres', 'Ninguno'], en: ['One', 'Two', 'Three', 'None'], ca: ['Un', 'Dos', 'Tres', 'Cap'] },
    2, '📚',
    { es: 'Hay tres: "sus" (posesivo), "dos" (numeral cardinal) y "primeros" (numeral ordinal). Un sustantivo puede llevar varios determinantes.', en: 'Three: "sus" (possessive), "dos" (cardinal) and "primeros" (ordinal).', ca: 'Tres: "els seus" (possessiu), "dos" (cardinal) i "primers" (ordinal).' }),

  q('det-10', 'eso',
    { es: 'La contracción "al" equivale a…', en: 'The contraction "al" is equivalent to…', ca: 'La contracció "al" equival a…' },
    { es: ['a + el', 'a + la', 'de + el', 'a + lo'], en: ['a + el', 'a + la', 'de + el', 'a + lo'], ca: ['a + el', 'a + la', 'de + el', 'a + lo'] },
    0, '🔀',
    { es: 'En español solo hay dos contracciones obligatorias: "al" (a + el) y "del" (de + el): "voy al parque", "vengo del cine".', en: 'Spanish has two mandatory contractions: "al" (a + el) and "del" (de + el).', ca: 'En català: al (a+el), del (de+el), pel (per+el), i els plurals als, dels, pels.' }),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(x => x.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
