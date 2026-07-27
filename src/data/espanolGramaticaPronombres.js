function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const TODAS = [
  q('pro-01', 'primaria',
    { es: '¿Cuál de estas palabras es un pronombre personal?', en: 'Which of these is a personal pronoun?', ca: 'Quina d\'aquestes és un pronom personal?' },
    { es: ['casa', 'ella', 'verde', 'correr'], en: ['casa', 'ella (she)', 'verde', 'correr'], ca: ['casa', 'ella', 'verd', 'córrer'] },
    1, '🙋',
    { es: 'Los pronombres personales sustituyen a las personas: yo, tú, él, ella, nosotros, vosotros, ellos.', en: 'Personal pronouns replace people: yo, tú, él, ella…', ca: 'Els pronoms personals substitueixen les persones: jo, tu, ell, ella…' }),

  q('pro-02', 'primaria',
    { es: 'En "yo leo un libro", ¿cuál es el pronombre?', en: 'In "yo leo un libro", which word is the pronoun?', ca: 'A "jo llegeixo un llibre", quin és el pronom?' },
    { es: ['yo', 'leo', 'libro', 'un'], en: ['yo', 'leo', 'libro', 'un'], ca: ['jo', 'llegeixo', 'llibre', 'un'] },
    0, '📖',
    { es: '"Yo" sustituye a la persona que habla → pronombre personal. "Leo" es verbo y "libro" es sustantivo.', en: '"Yo" (I) replaces the speaker → personal pronoun.', ca: '"Jo" substitueix la persona que parla → pronom personal.' }),

  q('pro-03', 'primaria',
    { es: '¿Qué pronombre sustituye a "María y yo"?', en: 'Which pronoun replaces "María y yo"?', ca: 'Quin pronom substitueix "la Maria i jo"?' },
    { es: ['ellos', 'nosotros', 'vosotros', 'ellas'], en: ['ellos (they)', 'nosotros (we)', 'vosotros (you pl.)', 'ellas'], ca: ['ells', 'nosaltres', 'vosaltres', 'elles'] },
    1, '👥',
    { es: '"María y yo" incluye a quien habla → primera persona del plural: "nosotros/nosotras".', en: '"María and I" includes the speaker → first person plural: "nosotros".', ca: '"La Maria i jo" inclou qui parla → primera persona del plural: "nosaltres".' }),

  q('pro-04', 'primaria',
    { es: 'En "dámelo", ¿cuántos pronombres hay?', en: 'In "dámelo", how many pronouns are there?', ca: 'A "dona-me\'l", quants pronoms hi ha?' },
    { es: ['Ninguno', 'Uno', 'Dos', 'Tres'], en: ['None', 'One', 'Two', 'Three'], ca: ['Cap', 'Un', 'Dos', 'Tres'] },
    2, '🤲',
    { es: '"Dámelo" = da + me + lo. "Me" (a mí) y "lo" (el objeto) son dos pronombres unidos al verbo.', en: '"Dámelo" = da + me + lo: two pronouns ("me" and "lo") attached to the verb.', ca: '"Dona-me\'l" = dona + me + el: dos pronoms.' }),

  q('pro-05', 'primaria',
    { es: '¿Cuál es un pronombre en la frase "esa es mía"?', en: 'Which word is a pronoun in "esa es mía"?', ca: 'Quina paraula és un pronom a "aquella és meva"?' },
    { es: ['esa', 'es', 'y', 'la'], en: ['esa (that one)', 'es', 'y', 'la'], ca: ['aquella', 'és', 'i', 'la'] },
    0, '👉',
    { es: '"Esa" no acompaña a ningún sustantivo, lo sustituye ("esa cosa") → pronombre demostrativo.', en: '"Esa" stands alone, replacing a noun → demonstrative pronoun.', ca: '"Aquella" no acompanya cap substantiu, el substitueix → pronom demostratiu.' }),

  q('pro-06', 'primaria',
    { es: '¿Qué tipo de pronombre es "mío"?', en: 'What type of pronoun is "mío"?', ca: 'Quin tipus de pronom és "meu"?' },
    { es: ['Personal', 'Posesivo', 'Numeral', 'Relativo'], en: ['Personal', 'Possessive', 'Numeral', 'Relative'], ca: ['Personal', 'Possessiu', 'Numeral', 'Relatiu'] },
    1, '🔑',
    { es: 'Los pronombres posesivos indican posesión y sustituyen al nombre: "el mío", "la tuya", "los nuestros".', en: 'Possessive pronouns show ownership and replace the noun: "el mío" (mine).', ca: 'Els pronoms possessius indiquen possessió: "el meu", "la teva".' }),

  q('pro-07', 'eso',
    { es: 'En "el libro que leí", ¿qué clase de pronombre es "que"?', en: 'In "el libro que leí", what kind of pronoun is "que"?', ca: 'A "el llibre que vaig llegir", quina classe de pronom és "que"?' },
    { es: ['Personal', 'Demostrativo', 'Relativo', 'Posesivo'], en: ['Personal', 'Demonstrative', 'Relative', 'Possessive'], ca: ['Personal', 'Demostratiu', 'Relatiu', 'Possessiu'] },
    2, '🔗',
    { es: '"Que" es un pronombre relativo: se refiere a un antecedente ("el libro") e introduce una oración subordinada.', en: '"Que" is a relative pronoun: it refers back to an antecedent ("el libro") and introduces a subordinate clause.', ca: '"Que" és un pronom relatiu: es refereix a un antecedent i introdueix una subordinada.' }),

  q('pro-08', 'eso',
    { es: 'En "se lava las manos", el pronombre "se" es…', en: 'In "se lava las manos", the pronoun "se" is…', ca: 'A "es renta les mans", el pronom "es" és…' },
    { es: ['Relativo', 'Reflexivo', 'Posesivo', 'Interrogativo'], en: ['Relative', 'Reflexive', 'Possessive', 'Interrogative'], ca: ['Relatiu', 'Reflexiu', 'Possessiu', 'Interrogatiu'] },
    1, '🧼',
    { es: 'El pronombre reflexivo indica que la acción recae sobre el propio sujeto: se lava (a sí mismo), me peino, te vistes.', en: 'A reflexive pronoun shows the action falls on the subject itself: "se lava" (washes himself).', ca: 'El pronom reflexiu indica que l\'acció recau sobre el mateix subjecte: "es renta".' }),

  q('pro-09', 'eso',
    { es: '¿Cuál es un pronombre interrogativo?', en: 'Which is an interrogative pronoun?', ca: 'Quin és un pronom interrogatiu?' },
    { es: ['quién', 'este', 'suyo', 'alguno'], en: ['quién (who)', 'este', 'suyo', 'alguno'], ca: ['qui', 'aquest', 'seu', 'algun'] },
    0, '❓',
    { es: 'Los interrogativos preguntan y llevan tilde: qué, quién, cuál, cuánto, dónde. "¿Quién ha venido?"', en: 'Interrogative pronouns ask questions and carry an accent: qué, quién, cuál, cuánto.', ca: 'Els interrogatius pregunten: qui, què, quin, quant.' }),

  q('pro-10', 'eso',
    { es: 'En "lo compré ayer", el pronombre "lo" funciona como…', en: 'In "lo compré ayer", the pronoun "lo" functions as…', ca: 'A "el vaig comprar ahir", el pronom "el" funciona com a…' },
    { es: ['Sujeto', 'Complemento directo', 'Complemento circunstancial', 'Atributo'], en: ['Subject', 'Direct object', 'Adverbial', 'Attribute'], ca: ['Subjecte', 'Complement directe', 'Complement circumstancial', 'Atribut'] },
    1, '🎯',
    { es: '"Lo" sustituye al complemento directo ("compré el libro" → "lo compré"). Los pronombres átonos lo, la, los, las hacen de CD.', en: '"Lo" replaces the direct object ("compré el libro" → "lo compré").', ca: '"El" substitueix el complement directe ("vaig comprar el llibre" → "el vaig comprar").' }),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(x => x.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
