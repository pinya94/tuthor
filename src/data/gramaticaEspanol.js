function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const TODAS = [
  q('ge-01', 'primaria',
    { es: '¿Cuál de estas palabras es un sustantivo?', en: '¿Cuál de estas palabras es un sustantivo?', ca: '¿Cuál de estas palabras es un sustantivo?' },
    { es: ['correr', 'rápido', 'mesa', 'muy'], en: ['correr', 'rápido', 'mesa', 'muy'], ca: ['correr', 'rápido', 'mesa', 'muy'] },
    2, '📚',
    { es: 'Los sustantivos nombran personas, animales o cosas. "Mesa" es una cosa, por tanto es sustantivo.', en: 'Los sustantivos nombran personas, animales o cosas. "Mesa" es una cosa, por tanto es sustantivo.', ca: 'Los sustantivos nombran personas, animales o cosas. "Mesa" es una cosa, por tanto es sustantivo.' }
  ),
  q('ge-02', 'primaria',
    { es: '¿Cuál de estas palabras es un adjetivo?', en: '¿Cuál de estas palabras es un adjetivo?', ca: '¿Cuál de estas palabras es un adjetivo?' },
    { es: ['saltar', 'grande', 'árbol', 'y'], en: ['saltar', 'grande', 'árbol', 'y'], ca: ['saltar', 'grande', 'árbol', 'y'] },
    1, '🎨',
    { es: 'Los adjetivos califican o determinan al sustantivo. "Grande" describe cómo es algo.', en: 'Los adjetivos califican o determinan al sustantivo. "Grande" describe cómo es algo.', ca: 'Los adjetivos califican o determinan al sustantivo. "Grande" describe cómo es algo.' }
  ),
  q('ge-03', 'primaria',
    { es: '¿Cuál es el plural de "pez"?', en: '¿Cuál es el plural de "pez"?', ca: '¿Cuál es el plural de "pez"?' },
    { es: ['pezs', 'peces', 'pezas', 'pezos'], en: ['pezs', 'peces', 'pezas', 'pezos'], ca: ['pezs', 'peces', 'pezas', 'pezos'] },
    1, '🐟',
    { es: 'Las palabras terminadas en "-z" forman el plural cambiando la z por c y añadiendo -es: pez → peces.', en: 'Las palabras terminadas en "-z" forman el plural cambiando la z por c y añadiendo -es: pez → peces.', ca: 'Las palabras terminadas en "-z" forman el plural cambiando la z por c y añadiendo -es: pez → peces.' }
  ),
  q('ge-04', 'primaria',
    { es: '¿Qué tipo de oración es "¿Tienes hambre?"?', en: '¿Qué tipo de oración es "¿Tienes hambre?"?', ca: '¿Qué tipo de oración es "¿Tienes hambre?"?' },
    { es: ['Exclamativa', 'Enunciativa', 'Interrogativa', 'Imperativa'], en: ['Exclamativa', 'Enunciativa', 'Interrogativa', 'Imperativa'], ca: ['Exclamativa', 'Enunciativa', 'Interrogativa', 'Imperativa'] },
    2, '❓',
    { es: 'Las oraciones interrogativas hacen una pregunta. Se escriben entre signos de interrogación: ¿ ?', en: 'Las oraciones interrogativas hacen una pregunta. Se escriben entre signos de interrogación: ¿ ?', ca: 'Las oraciones interrogativas hacen una pregunta. Se escriben entre signos de interrogación: ¿ ?' }
  ),
  q('ge-05', 'primaria',
    { es: '¿Cuál de estas palabras lleva tilde?', en: '¿Cuál de estas palabras lleva tilde?', ca: '¿Cuál de estas palabras lleva tilde?' },
    { es: ['cafe', 'mesa', 'árbol', 'libro'], en: ['cafe', 'mesa', 'árbol', 'libro'], ca: ['cafe', 'mesa', 'árbol', 'libro'] },
    2, '´',
    { es: '"Árbol" es una palabra esdrújula (acento en la antepenúltima sílaba: ÁR-bol) y siempre lleva tilde.', en: '"Árbol" es una palabra esdrújula (acento en la antepenúltima sílaba: ÁR-bol) y siempre lleva tilde.', ca: '"Árbol" es una palabra esdrújula (acento en la antepenúltima sílaba: ÁR-bol) y siempre lleva tilde.' }
  ),
  q('ge-06', 'primaria',
    { es: '¿Cuál de estas palabras está bien escrita?', en: '¿Cuál de estas palabras está bien escrita?', ca: '¿Cuál de estas palabras está bien escrita?' },
    { es: ['vever', 'beber', 'bever', 'veber'], en: ['vever', 'beber', 'bever', 'veber'], ca: ['vever', 'beber', 'bever', 'veber'] },
    1, '✍️',
    { es: '"Beber" se escribe con b. Las palabras que empiezan por "bi-", "bu-", "be-" suelen escribirse con b.', en: '"Beber" se escribe con b. Las palabras que empiezan por "bi-", "bu-", "be-" suelen escribirse con b.', ca: '"Beber" se escribe con b. Las palabras que empiezan por "bi-", "bu-", "be-" suelen escribirse con b.' }
  ),
  q('ge-07', 'primaria',
    { es: '¿Qué es el sujeto de una oración?', en: '¿Qué es el sujeto de una oración?', ca: '¿Qué es el sujeto de una oración?' },
    {
      es: ['Lo que hace el verbo', 'De quién o de qué se habla', 'El final de la oración', 'El adjetivo principal'],
      en: ['Lo que hace el verbo', 'De quién o de qué se habla', 'El final de la oración', 'El adjetivo principal'],
      ca: ['Lo que hace el verbo', 'De quién o de qué se habla', 'El final de la oración', 'El adjetivo principal'],
    },
    1, '🔍',
    { es: 'El sujeto es de quién o de qué habla la oración. En "María corre", el sujeto es "María".', en: 'El sujeto es de quién o de qué habla la oración. En "María corre", el sujeto es "María".', ca: 'El sujeto es de quién o de qué habla la oración. En "María corre", el sujeto es "María".' }
  ),
  q('ge-08', 'primaria',
    { es: 'En "Los niños juegan en el parque", ¿cuál es el verbo?', en: 'En "Los niños juegan en el parque", ¿cuál es el verbo?', ca: 'En "Los niños juegan en el parque", ¿cuál es el verbo?' },
    { es: ['niños', 'parque', 'juegan', 'los'], en: ['niños', 'parque', 'juegan', 'los'], ca: ['niños', 'parque', 'juegan', 'los'] },
    2, '⚽',
    { es: '"Juegan" es el verbo: expresa la acción que realiza el sujeto "los niños".', en: '"Juegan" es el verbo: expresa la acción que realiza el sujeto "los niños".', ca: '"Juegan" es el verbo: expresa la acción que realiza el sujeto "los niños".' }
  ),
  q('ge-09', 'eso',
    { es: '¿Qué tipo de palabra es "rápidamente"?', en: '¿Qué tipo de palabra es "rápidamente"?', ca: '¿Qué tipo de palabra es "rápidamente"?' },
    { es: ['Adjetivo', 'Verbo', 'Adverbio', 'Sustantivo'], en: ['Adjetivo', 'Verbo', 'Adverbio', 'Sustantivo'], ca: ['Adjetivo', 'Verbo', 'Adverbio', 'Sustantivo'] },
    2, '💨',
    { es: '"Rápidamente" es un adverbio de modo. Los adverbios modifican al verbo, al adjetivo o a otro adverbio. Muchos se forman añadiendo -mente a un adjetivo.', en: '"Rápidamente" es un adverbio de modo. Los adverbios modifican al verbo, al adjetivo o a otro adverbio. Muchos se forman añadiendo -mente a un adjetivo.', ca: '"Rápidamente" es un adverbio de modo. Los adverbios modifican al verbo, al adjetivo o a otro adverbio. Muchos se forman añadiendo -mente a un adjetivo.' }
  ),
  q('ge-10', 'eso',
    { es: '¿Cuál de estas oraciones tiene un complemento directo?', en: '¿Cuál de estas oraciones tiene un complemento directo?', ca: '¿Cuál de estas oraciones tiene un complemento directo?' },
    {
      es: ['Llueve mucho', 'María trabaja en Madrid', 'Pedro compró un libro', 'El niño duerme'],
      en: ['Llueve mucho', 'María trabaja en Madrid', 'Pedro compró un libro', 'El niño duerme'],
      ca: ['Llueve mucho', 'María trabaja en Madrid', 'Pedro compró un libro', 'El niño duerme'],
    },
    2, '📖',
    { es: 'El CD es el elemento que recibe directamente la acción del verbo. En "Pedro compró un libro", "un libro" es el CD (¿qué compró? → un libro).', en: 'El CD es el elemento que recibe directamente la acción del verbo. En "Pedro compró un libro", "un libro" es el CD (¿qué compró? → un libro).', ca: 'El CD es el elemento que recibe directamente la acción del verbo. En "Pedro compró un libro", "un libro" es el CD (¿qué compró? → un libro).' }
  ),
  q('ge-11', 'eso',
    { es: '¿Qué tipo de oración es "El examen fue aprobado por todos"?', en: '¿Qué tipo de oración es "El examen fue aprobado por todos"?', ca: '¿Qué tipo de oración es "El examen fue aprobado por todos"?' },
    { es: ['Activa', 'Pasiva', 'Imperativa', 'Negativa'], en: ['Activa', 'Pasiva', 'Imperativa', 'Negativa'], ca: ['Activa', 'Pasiva', 'Imperativa', 'Negativa'] },
    1, '🔄',
    { es: 'Es una oración pasiva: el sujeto gramatical ("el examen") recibe la acción en lugar de realizarla. La pasiva se forma con "ser" + participio.', en: 'Es una oración pasiva: el sujeto gramatical ("el examen") recibe la acción en lugar de realizarla. La pasiva se forma con "ser" + participio.', ca: 'Es una oración pasiva: el sujeto gramatical ("el examen") recibe la acción en lugar de realizarla. La pasiva se forma con "ser" + participio.' }
  ),
  q('ge-12', 'eso',
    { es: '¿Cuál de estas palabras es un pronombre personal?', en: '¿Cuál de estas palabras es un pronombre personal?', ca: '¿Cuál de estas palabras es un pronombre personal?' },
    { es: ['este', 'ella', 'aquel', 'mío'], en: ['este', 'ella', 'aquel', 'mío'], ca: ['este', 'ella', 'aquel', 'mío'] },
    1, '👤',
    { es: '"Ella" es un pronombre personal de 3ª persona del singular. Los pronombres personales son: yo, tú, él, ella, nosotros, vosotros, ellos, ellas.', en: '"Ella" es un pronombre personal de 3ª persona del singular. Los pronombres personales son: yo, tú, él, ella, nosotros, vosotros, ellos, ellas.', ca: '"Ella" es un pronombre personal de 3ª persona del singular. Los pronombres personales son: yo, tú, él, ella, nosotros, vosotros, ellos, ellas.' }
  ),
  q('ge-13', 'eso',
    { es: '¿En qué caso se usa "hay" (haber) y no "ay" ni "ahí"?', en: '¿En qué caso se usa "hay" (haber) y no "ay" ni "ahí"?', ca: '¿En qué caso se usa "hay" (haber) y no "ay" ni "ahí"?' },
    {
      es: ['Para indicar un lugar: "___ está el libro"', 'Como verbo existencial: "___ mucha gente"', 'Como interjección de dolor: "___!"', 'Para señalar: "mira ___ arriba"'],
      en: ['Para indicar un lugar: "___ está el libro"', 'Como verbo existencial: "___ mucha gente"', 'Como interjección de dolor: "___!"', 'Para señalar: "mira ___ arriba"'],
      ca: ['Para indicar un lugar: "___ está el libro"', 'Como verbo existencial: "___ mucha gente"', 'Como interjección de dolor: "___!"', 'Para señalar: "mira ___ arriba"'],
    },
    1, '📍',
    { es: '"Hay" = verbo haber (existencia): "hay mucha gente". "Ahí" = lugar. "Ay" = interjección de dolor.', en: '"Hay" = verbo haber (existencia): "hay mucha gente". "Ahí" = lugar. "Ay" = interjección de dolor.', ca: '"Hay" = verbo haber (existencia): "hay mucha gente". "Ahí" = lugar. "Ay" = interjección de dolor.' }
  ),
  q('ge-14', 'eso',
    { es: '¿Cuántas sílabas tiene la palabra "murciélago"?', en: '¿Cuántas sílabas tiene la palabra "murciélago"?', ca: '¿Cuántas sílabas tiene la palabra "murciélago"?' },
    { es: ['3', '4', '5', '6'], en: ['3', '4', '5', '6'], ca: ['3', '4', '5', '6'] },
    2, '🦇',
    { es: 'Mur-cié-la-go → 4 sílabas. Es una palabra esdrújula (acento en la antepenúltima sílaba).', en: 'Mur-cié-la-go → 4 sílabas. Es una palabra esdrújula (acento en la antepenúltima sílaba).', ca: 'Mur-cié-la-go → 4 sílabas. Es una palabra esdrújula (acento en la antepenúltima sílaba).' }
  ),
  q('ge-15', 'eso',
    { es: '¿Qué función sintáctica tiene "a su hermano" en "Llamé a su hermano"?', en: '¿Qué función sintáctica tiene "a su hermano" en "Llamé a su hermano"?', ca: '¿Qué función sintáctica tiene "a su hermano" en "Llamé a su hermano"?' },
    {
      es: ['Complemento directo', 'Complemento indirecto', 'Complemento circunstancial', 'Sujeto'],
      en: ['Complemento directo', 'Complemento indirecto', 'Complemento circunstancial', 'Sujeto'],
      ca: ['Complemento directo', 'Complemento indirecto', 'Complemento circunstancial', 'Sujeto'],
    },
    0, '📞',
    { es: 'Aunque lleva "a", "a su hermano" es CD porque sustituye por "lo": "Lo llamé". Si fuera CI, la sustitución sería "le".', en: 'Aunque lleva "a", "a su hermano" es CD porque sustituye por "lo": "Lo llamé". Si fuera CI, la sustitución sería "le".', ca: 'Aunque lleva "a", "a su hermano" es CD porque sustituye por "lo": "Lo llamé". Si fuera CI, la sustitución sería "le".' }
  ),
  q('ge-16', 'eso',
    { es: '¿Cuál de estas oraciones usa correctamente "sino" (en lugar de "si no")?', en: '¿Cuál de estas oraciones usa correctamente "sino" (en lugar de "si no")?', ca: '¿Cuál de estas oraciones usa correctamente "sino" (en lugar de "si no")?' },
    {
      es: ['"No es tonto, sino listo"', '"Sino vienes, me voy"', '"Sino llueve, salimos"', '"Sino quieres, no pasa nada"'],
      en: ['"No es tonto, sino listo"', '"Sino vienes, me voy"', '"Sino llueve, salimos"', '"Sino quieres, no pasa nada"'],
      ca: ['"No es tonto, sino listo"', '"Sino vienes, me voy"', '"Sino llueve, salimos"', '"Sino quieres, no pasa nada"'],
    },
    0, '✅',
    { es: '"Sino" (conjunción adversativa) une dos elementos contrapuestos: "No es A, sino B". "Si no" (condicional negado) introduce una condición: "Si no llueve, salimos".', en: '"Sino" (conjunción adversativa) une dos elementos contrapuestos: "No es A, sino B". "Si no" (condicional negado) introduce una condición: "Si no llueve, salimos".', ca: '"Sino" (conjunción adversativa) une dos elementos contrapuestos: "No es A, sino B". "Si no" (condicional negado) introduce una condición: "Si no llueve, salimos".' }
  ),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(q => q.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
