function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const TODAS = [
  q('bv-01', 'primaria',
    { es: '¿Cuál es la ortografía correcta?', en: 'Which is the correct spelling?', ca: 'Quina és l\'ortografia correcta?' },
    { es: ['veber', 'beber', 'vever', 'bever'], en: ['veber', 'beber', 'vever', 'bever'], ca: ['veber', 'beure', 'vever', 'bever'] },
    1, '🥤',
    { es: '"Beber" se escribe con b. Regla: las palabras que empiezan por be-, bi-, bus- suelen escribirse con b: beber, bicicleta, buscar.', en: '"Beber" is spelled with b. Words starting with be-, bi-, bus- usually use b: beber, bicicleta, buscar.', ca: '"Beure" en català s\'escriu amb b. En castellà, "beber" s\'escriu amb b.' }),

  q('bv-02', 'primaria',
    { es: '¿Con qué letra se escribe el imperfecto "-aba"?', en: 'Which letter is used in the imperfect "-aba" ending?', ca: 'Amb quina lletra s\'escriu l\'imperfet "-aba"?' },
    { es: ['v: -ava', 'b: -aba', 'Puede ser b o v', 'Ninguna de las anteriores'], en: ['v: -ava', 'b: -aba', 'Can be b or v', 'None of the above'], ca: ['v: -ava', 'b: -aba', 'Pot ser b o v', 'Cap de les anteriors'] },
    1, '⏳',
    { es: 'El imperfecto de indicativo de los verbos -AR siempre se escribe con b: cantaba, saltaba, miraba, hablaba. Nunca con v.', en: 'The imperfect indicative of -AR verbs always uses b: cantaba, saltaba, miraba. Never v.', ca: 'L\'imperfet d\'indicatiu dels verbs -AR sempre s\'escriu amb b: cantava, saltava, mirava. Mai amb v.' }),

  q('bv-03', 'primaria',
    { es: '¿Cuál de estas palabras va con "b"?', en: 'Which of these words uses "b"?', ca: 'Quina d\'aquestes paraules va amb "b"?' },
    { es: ['_eneno', '_aliente', '_ueno', '_ejez'], en: ['_enom', '_aliente', '_ueno', '_ejez'], ca: ['_eneno', '_alent', '_o', '_ellesa'] },
    2, '😊',
    { es: '"Bueno" se escribe con b. Regla: después de la sílaba bue-, bui-, se usa b: bueno, buitre, buey.', en: '"Bueno" uses b. After bue-, bui-, use b: bueno, buitre, buey.', ca: '"Bo" en català. En castellà, "bueno" s\'escriu amb b (bue- sempre porta b).' }),

  q('bv-04', 'primaria',
    { es: '¿Con qué letra se escriben las palabras que empiezan por "vice-"?', en: 'Which letter do words starting with "vice-" use?', ca: 'Amb quina lletra s\'escriuen les paraules que comencen per "vice-"?' },
    { es: ['b', 'v', 'Puede ser b o v', 'Depende de la palabra'], en: ['b', 'v', 'Can be b or v', 'Depends on the word'], ca: ['b', 'v', 'Pot ser b o v', 'Depèn de la paraula'] },
    1, '👔',
    { es: 'El prefijo "vice-" siempre se escribe con v: vicepresidente, vicedirector, vicerrector. Del mismo modo: villa-, vino-, vid-, vid-.', en: 'The prefix "vice-" always uses v: vicepresidente, vicedirector. Similarly: villa-, vine-, vid-.', ca: 'El prefix "vice-" sempre s\'escriu amb v: vicepresident, vicedirector.' }),

  q('bv-05', 'primaria',
    { es: '¿Cuál de estas palabras se escribe con "v"?', en: 'Which of these words uses "v"?', ca: 'Quina d\'aquestes paraules s\'escriu amb "v"?' },
    { es: ['_ravo', '_lusa', '_iso', '_arca'], en: ['_rave', '_louse', '_ase', '_ark'], ca: ['_rau', '_llusa', '_ase', '_arca'] },
    2, '👁️',
    { es: '"Viso" (brillo, aspecto) se escribe con v. Regla: las palabras que empiezan por vi- de significado "ver" o relacionado suelen llevar v: viso, vista, visión, visual.', en: '"Viso" (sheen/appearance) uses v. Words starting with vi- related to seeing often use v: vista, visión, visual.', ca: '"Vista, visió, visual" s\'escriuen amb v en català i en castellà.' }),

  q('bv-06', 'eso',
    { es: '¿Los verbos terminados en "-bir" se escriben con b o con v?', en: 'Do verbs ending in "-bir" use b or v?', ca: 'Els verbs acabats en "-bir" s\'escriuen amb b o amb v?' },
    { es: ['Con v', 'Con b, con excepciones (vivir, servir, hervir)', 'Siempre con b, sin excepciones', 'Puede ser b o v'], en: ['With v', 'With b, with exceptions (vivir, servir, hervir)', 'Always b, no exceptions', 'Can be b or v'], ca: ['Amb v', 'Amb b, amb excepcions (viure, servir, bullir)', 'Sempre amb b, sense excepcions', 'Pot ser b o v'] },
    1, '✍️',
    { es: 'Los verbos en -bir se escriben con b: escribir, recibir, subir, percibir. Excepciones con v: vivir, servir, hervir.', en: 'Verbs ending in -bir use b: escribir, recibir, subir. Exceptions with v: vivir, servir, hervir.', ca: 'Els verbs en -bir s\'escriuen amb b: escriure (escrib-), rebre, pujar. Excepcions: viure, servir, bullir.' }),

  q('bv-07', 'eso',
    { es: 'Después de la letra "m", ¿se usa "b" o "v"?', en: 'After the letter "m", do we use "b" or "v"?', ca: 'Després de la lletra "m", s\'usa "b" o "v"?' },
    { es: ['Siempre "v"', 'Siempre "b"', 'Puede ser b o v', 'Depende del origen de la palabra'], en: ['Always "v"', 'Always "b"', 'Can be b or v', 'Depends on word origin'], ca: ['Sempre "v"', 'Sempre "b"', 'Pot ser b o v', 'Depèn de l\'origen de la paraula'] },
    1, '📜',
    { es: 'Después de "m" siempre se escribe "b": también, cambio, ambos, hombre, sombra,ombigo... Nunca "mv".', en: 'After "m", always use "b": también, cambio, ambos, hombre, sombra. Never "mv".', ca: 'Després de "m" sempre s\'escriu "b": també, canvi... Wait: "canvi" porta v. En castellà: cambio (b).' }),

  q('bv-08', 'eso',
    { es: '¿Los adjetivos terminados en "-ivo/-iva" llevan "b" o "v"?', en: 'Do adjectives ending in "-ivo/-iva" use "b" or "v"?', ca: 'Els adjectius acabats en "-ivo/-iva" porten "b" o "v"?' },
    { es: ['"b": -ibo/-iba', '"v": -ivo/-iva', 'Puede ser b o v', 'Ninguna, se eliminan'], en: ['"b": -ibo/-iba', '"v": -ivo/-iva', 'Can be b or v', 'Neither'], ca: ['"b": -ibo/-iba', '"v": -ivo/-iva', 'Pot ser b o v', 'Cap'] },
    1, '📝',
    { es: 'Los adjetivos terminados en -ivo/-iva siempre se escriben con v: activo, pasivo, positivo, negativo, creativo, destructivo.', en: 'Adjectives ending in -ivo/-iva always use v: activo, pasivo, positivo, negativo, creativo.', ca: 'Els adjectius acabats en -iu/-iva s\'escriuen amb v en castellà: activo, pasivo, positivo.' }),

  q('bv-09', 'eso',
    { es: '¿Cuál de estas palabras es correcta?', en: 'Which of these words is correctly spelled?', ca: 'Quina d\'aquestes paraules és correcta?' },
    { es: ['obtener', 'ovtener', 'obteber', 'obtenér'], en: ['obtain', 'ovtain', 'obtaib', 'obtáin'], ca: ['obtenir', 'ovtenir', 'obtenib', 'obteniré'] },
    0, '✅',
    { es: '"Obtener" se escribe con b. Regla: después de "ob-" se escribe b: obtener, objeto, obra, obispo, obvio.', en: '"Obtener" uses b. After "ob-", use b: obtener, objeto, obra, obispo, obvio.', ca: '"Obtenir" s\'escriu amb b. Regla: darrere de "ob-" s\'escriu b: obtenir, objecte, obra.' }),

  q('bv-10', 'eso',
    { es: '¿Cuál es la regla para "b" después de consonante?', en: 'What is the rule for "b" after a consonant?', ca: 'Quina és la regla per a "b" darrere de consonant?' },
    { es: ['Siempre se escribe v', 'Después de l, m, n, r → siempre b', 'Puede ser b o v', 'Depende de la vocal siguiente'], en: ['Always use v', 'After l, m, n, r → always b', 'Can be b or v', 'Depends on the next vowel'], ca: ['Sempre s\'escriu v', 'Darrere de l, m, n, r → sempre b', 'Pot ser b o v', 'Depèn de la vocal següent'] },
    1, '🔤',
    { es: 'Después de las consonantes l, m, n, r siempre se escribe b: alba, cambio, enviar, árbol, también, combate, bomba.', en: 'After consonants l, m, n, r, always use b: alba, cambio, enviar, árbol, también, combate, bomba.', ca: 'Darrere de les consonants l, m, n, r sempre s\'escriu b: alba, canvi (excepció: v en català), enviar, arbre.' }),

  q('bv-11', 'eso',
    { es: '"El avión vo_ó muy alto." ¿B o V?', en: '"El avión vo_ó muy alto." B or V?', ca: '"L\'avió va vo_ar molt alt." B o V?' },
    { es: ['vobo (b)', 'voló (no es b ni v, es l)', 'vovó (v+v)', 'bobó (b+b)'], en: ['vobo (b)', 'voló (not b or v, it\'s l)', 'vovó (v+v)', 'bobó (b+b)'], ca: ['vobo (b)', 'va volar (no és b ni v, és l)', 'vovó (v+v)', 'bobó (b+b)'] },
    1, '✈️',
    { es: '"Voló" viene del verbo "volar" (conjugado: voló). "Volar" se escribe con v. El contexto cambia: "el avión voló" no tiene b ni doble v.', en: '"Voló" comes from "volar" (conjugated). "Volar" uses v. The answer is "voló" (l in the middle, not b or v).', ca: '"Va volar" → el verb "volar" s\'escriu amb v.' }),

  q('bv-12', 'eso',
    { es: '¿Cuál es la ortografía correcta de la forma verbal?', en: 'Which is the correct spelling of this verb form?', ca: 'Quina és l\'ortografia correcta d\'aquesta forma verbal?' },
    { es: ['yo tubo (haber)', 'yo tuvo (tener)', 'yo tuve (tener)', 'yo tuba (tener)'], en: ['yo tubo (to have)', 'yo tuvo (to have)', 'yo tuve (to have)', 'yo tuba (to have)'], ca: ['jo tubo (tenir)', 'jo tuvo (tenir)', 'jo vaig tenir (tenir)', 'jo tuba (tenir)'] },
    2, '🔧',
    { es: '"Tuve" es el pretérito indefinido de "tener" (1ª pers. sing.) → con v. "Tubo" es un sustantivo (tubo de ensayo). Distinción importante: tubo (objeto) / tuve (verbo).', en: '"Tuve" = past simple of "tener" (1st sg) → uses v. "Tubo" = a tube (noun). Important distinction: tubo (noun) / tuve (verb).', ca: '"Tuve" = pretèrit indefinit de "tenir" → porta v. "Tubo" = tub (substantiu).' }),

  q('bv-13', 'eso',
    { es: '"Había" e "iba", ¿se escriben con b o con v?', en: '"Había" and "iba" — b or v?', ca: '"Havia" i "anava" — b o v?' },
    { es: ['Con v: havía, iva', 'Con b: había, iba', 'Puede ser b o v', 'Con v "había" y con b "iba"'], en: ['With v: havía, iva', 'With b: había, iba', 'Can be b or v', 'v for había, b for iba'], ca: ['Amb v: havia, anava', 'Amb b: havia, anava', 'Pot ser b o v', 'v per havia, b per anava'] },
    1, '⏳',
    { es: '"Había" (imperfecto de haber) e "iba" (imperfecto de ir) se escriben con b. Regla del imperfecto -aba: aplica también a "haber" e "ir" por analogía histórica.', en: '"Había" (imperfect of haber) and "iba" (imperfect of ir) both use b. This follows the -aba/ía imperfect rule with b.', ca: '"Havia" (imperfet de haver) i "anava" (imperfet d\'anar) s\'escriuen amb v en català.' }),

  q('bv-14', 'eso',
    { es: '¿Cuál de estas palabras es incorrecta?', en: 'Which of these words is misspelled?', ca: 'Quina d\'aquestes paraules és incorrecta?' },
    { es: ['bienvenida', 'bienvevida', 'ambiente', 'barco'], en: ['bienvenida', 'bienvevida', 'ambiente', 'barco'], ca: ['benvinguda', 'bienvevida', 'ambient', 'vaixell'] },
    1, '❌',
    { es: '"Bienvevida" es incorrecta. La forma correcta es "bienvenida" (bien + venida). "Veni-" viene de "venir", que se escribe con v.', en: '"Bienvevida" is wrong. The correct form is "bienvenida" (bien + venida). "Venir" uses v.', ca: '"Bienvevida" és incorrecta. La forma correcta és "bienvenida" = bien + venida.' }),

  q('bv-15', 'eso',
    { es: '"Tubo" vs "tuvo": ¿cuál es la diferencia?', en: '"Tubo" vs "tuvo": what is the difference?', ca: '"Tubo" vs "tuvo": quina és la diferència?' },
    { es: ['Son sinónimos', '"Tubo" = objeto cilíndrico; "tuvo" = pasado de tener', '"Tuvo" = objeto; "tubo" = pasado de tener', 'Son la misma palabra con distinta pronunciación'], en: ['They are synonyms', '"Tubo" = cylindrical object; "tuvo" = past of tener', '"Tuvo" = object; "tubo" = past of tener', 'Same word, different pronunciation'], ca: ['Són sinònims', '"Tubo" = objecte cilíndric; "tuvo" = passat de tenir', '"Tuvo" = objecte; "tubo" = passat de tenir', 'Mateixa paraula, pronunciació diferent'] },
    1, '🔬',
    { es: '"Tubo" (con b) = objeto cilíndrico (tubo de ensayo, tubo de pasta). "Tuvo" (con v) = 3ª pers. sing. pretérito indefinido de "tener". Homófonos con diferente ortografía.', en: '"Tubo" (b) = cylindrical tube. "Tuvo" (v) = 3rd pers. sing. past simple of "tener". Homophones with different spellings.', ca: '"Tub" (b) = objecte cilíndric. "Va tenir" (v) = passat de "tenir".' }),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(q => q.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
