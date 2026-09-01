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

  q('det-11', 'primaria',
    { es: "¿Cuál de estas palabras es un determinante?", en: "Which of these words is a determiner?", ca: "Quina d'aquestes paraules és un determinant?" },
    { es: ["correr","aquel","bonito","rápidamente"], en: ["correr","aquel","bonito","rápidamente"], ca: ["córrer","aquell","bonic","ràpidament"] },
    1, '👉',
    { es: "\"Aquel\" acompaña al sustantivo y lo señala: es un determinante demostrativo.", en: "\"Aquel\" (that) accompanies the noun and points at it: a demonstrative determiner.", ca: "\"Aquell\" acompanya el substantiu i l'assenyala: és un determinant demostratiu." }),

  q('det-12', 'primaria',
    { es: "¿Qué tipo de determinante es \"mi\" en \"mi casa\"?", en: "What kind of determiner is \"mi\" in \"mi casa\"?", ca: "Quin tipus de determinant és \"la meva\" a \"la meva casa\"?" },
    { es: ["Artículo","Posesivo","Numeral","Demostrativo"], en: ["Artículo","Posesivo","Numeral","Demostrativo"], ca: ["Article","Possessiu","Numeral","Demostratiu"] },
    1, '🏠',
    { es: "Los posesivos (mi, tu, su, nuestro) dicen de quién es lo que nombra el sustantivo.", en: "Possessives (mi, tu, su) say who the noun belongs to.", ca: "Els possessius diuen de qui és allò que anomena el substantiu." }),

  q('det-13', 'primaria',
    { es: "¿Cuántos determinantes hay en \"las tres casas\"?", en: "How many determiners are in \"las tres casas\"?", ca: "Quants determinants hi ha a \"les tres cases\"?" },
    { es: ["Uno","Dos","Tres","Ninguno"], en: ["Uno","Dos","Tres","Ninguno"], ca: ["Un","Dos","Tres","Cap"] },
    1, '🔢',
    { es: "Dos: el artículo \"las\" y el numeral \"tres\". Los dos acompañan a \"casas\".", en: "Two: the article \"las\" and the numeral \"tres\".", ca: "Dos: l'article \"les\" i el numeral \"tres\"." }),

  q('det-14', 'primaria',
    { es: "¿Cuál es el artículo correcto para \"agua\"?", en: "Which article is correct for \"agua\"?", ca: "Quin és l'article correcte per a \"aigua\"?" },
    { es: ["la agua","el agua","lo agua","los agua"], en: ["la agua","el agua","lo agua","los agua"], ca: ["la aigua","l'aigua","lo aigua","els aigua"] },
    1, '💧',
    { es: "\"Agua\" es femenino, pero empieza por a- tónica y lleva \"el\" en singular para que no suenen dos aes juntas. En plural, \"las aguas\".", en: "\"Agua\" is feminine but takes \"el\" in the singular to avoid two stressed a-sounds together.", ca: "\"Aigua\" és femenina; en castellà porta \"el\" en singular per evitar dues as seguides." }),

  q('det-15', 'primaria',
    { es: "En \"esta silla\", ¿qué es \"esta\"?", en: "In \"esta silla\", what is \"esta\"?", ca: "A \"aquesta cadira\", què és \"aquesta\"?" },
    { es: ["Un sustantivo","Un determinante demostrativo","Un verbo","Un adjetivo calificativo"], en: ["Un sustantivo","Un determinante demostrativo","Un verbo","Un adjetivo calificativo"], ca: ["Un substantiu","Un determinant demostratiu","Un verb","Un adjectiu qualificatiu"] },
    1, '💺',
    { es: "Los demostrativos (este, ese, aquel) señalan a qué distancia está lo que nombramos.", en: "Demonstratives (este, ese, aquel) show how far away the thing is.", ca: "Els demostratius assenyalen a quina distància és allò que anomenem." }),

  q('det-16', 'primaria',
    { es: "¿Qué determinante falta: \"___ niños juegan\"?", en: "Which determiner is missing: \"___ niños juegan\"?", ca: "Quin determinant falta: \"___ nens juguen\"?" },
    { es: ["El","La","Los","Las"], en: ["El","La","Los","Las"], ca: ["El","La","Els","Les"] },
    2, '🧒',
    { es: "\"Niños\" es masculino plural, así que el artículo también: \"los niños\".", en: "\"Niños\" is masculine plural → \"los\".", ca: "\"Nens\" és masculí plural, així que l'article també: \"els\"." }),

  q('det-17', 'eso',
    { es: "¿En qué se diferencia un determinante de un pronombre?", en: "How does a determiner differ from a pronoun?", ca: "En què es diferencia un determinant d'un pronom?" },
    { es: ["En nada, son lo mismo","El determinante acompaña al sustantivo; el pronombre lo sustituye","El determinante siempre va detrás","El pronombre solo se usa en plural"], en: ["En nada, son lo mismo","El determinante acompaña al sustantivo; el pronombre lo sustituye","El determinante siempre va detrás","El pronombre solo se usa en plural"], ca: ["En res, són el mateix","El determinant acompanya el substantiu; el pronom el substitueix","El determinant sempre va darrere","El pronom només s'usa en plural"] },
    1, '🔀',
    { es: "\"Este libro\" → determinante (acompaña). \"Este es mío\" → pronombre (sustituye al sustantivo). La misma palabra cambia de clase según su función.", en: "\"Este libro\" → determiner. \"Este es mío\" → pronoun. The same word changes class depending on its role.", ca: "\"Aquest llibre\" → determinant. \"Aquest és meu\" → pronom. La mateixa paraula canvia de classe segons la funció." }),

  q('det-18', 'eso',
    { es: "¿Qué tipo de determinante es \"algunos\"?", en: "What kind of determiner is \"algunos\"?", ca: "Quin tipus de determinant és \"alguns\"?" },
    { es: ["Indefinido","Numeral","Posesivo","Demostrativo"], en: ["Indefinido","Numeral","Posesivo","Demostrativo"], ca: ["Indefinit","Numeral","Possessiu","Demostratiu"] },
    0, '❔',
    { es: "Los indefinidos (algún, varios, muchos, pocos) dan una cantidad imprecisa, a diferencia de los numerales, que la dan exacta.", en: "Indefinites (algún, varios, muchos) give an imprecise quantity, unlike numerals.", ca: "Els indefinits donen una quantitat imprecisa, a diferència dels numerals." }),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(x => x.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
