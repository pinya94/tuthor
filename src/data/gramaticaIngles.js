function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

// English grammar exam — questions always in English regardless of app language
const EN = s => ({ es: s, en: s, ca: s })
// Opciones iguales en los tres idiomas: en un examen de inglés las respuestas
// son inglés y no se traducen. Mismo helper que los demás bancos de inglés.
const O = a => ({ es: a, en: a, ca: a })

const TODAS = [
  q('gi-01', 'primaria',
    EN('Which word is a noun?'),
    { es: ['run', 'beautiful', 'table', 'quickly'], en: ['run', 'beautiful', 'table', 'quickly'], ca: ['run', 'beautiful', 'table', 'quickly'] },
    2, '📚',
    EN('"Table" is a noun — it names a thing. "Run" is a verb, "beautiful" is an adjective, "quickly" is an adverb.')
  ),
  q('gi-02', 'primaria',
    EN('Choose the correct article: "___ apple a day keeps the doctor away."'),
    { es: ['A', 'An', 'The', 'Some'], en: ['A', 'An', 'The', 'Some'], ca: ['A', 'An', 'The', 'Some'] },
    1, '🍎',
    EN('Use "an" before words that start with a vowel sound: an apple, an egg, an hour. Use "a" before consonant sounds.')
  ),
  q('gi-03', 'primaria',
    EN('What is the plural of "child"?'),
    { es: ['childs', 'childes', 'children', 'child'], en: ['childs', 'childes', 'children', 'child'], ca: ['childs', 'childes', 'children', 'child'] },
    2, '👧',
    EN('"Children" is an irregular plural. Common irregular plurals: child→children, man→men, woman→women, tooth→teeth, mouse→mice.')
  ),
  q('gi-04', 'primaria',
    EN('Which sentence is correct?'),
    {
      es: ['She don\'t like cats.', 'She doesn\'t likes cats.', 'She doesn\'t like cats.', 'She not like cats.'],
      en: ['She don\'t like cats.', 'She doesn\'t likes cats.', 'She doesn\'t like cats.', 'She not like cats.'],
      ca: ['She don\'t like cats.', 'She doesn\'t likes cats.', 'She doesn\'t like cats.', 'She not like cats.'],
    },
    2, '🐱',
    EN('For he/she/it in present simple negative, use "doesn\'t" + base verb (no -s). "She doesn\'t like" — the verb stays in base form after doesn\'t.')
  ),
  q('gi-05', 'primaria',
    EN('Choose the correct form: "I ___ to school every day."'),
    { es: ['go', 'goes', 'going', 'am go'], en: ['go', 'goes', 'going', 'am go'], ca: ['go', 'goes', 'going', 'am go'] },
    0, '🏫',
    EN('Present simple for habits/routines. With "I", use the base form: I go, I eat, I play. The -s form (goes) is only for he/she/it.')
  ),
  q('gi-06', 'primaria',
    EN('What is the past tense of "go"?'),
    { es: ['goed', 'gone', 'went', 'going'], en: ['goed', 'gone', 'went', 'going'], ca: ['goed', 'gone', 'went', 'going'] },
    2, '⏳',
    EN('"Went" is the irregular past tense of "go". Common irregular verbs: go→went, see→saw, eat→ate, have→had, come→came.')
  ),
  q('gi-07', 'primaria',
    EN('Which question is correct?'),
    {
      es: ['Where you live?', 'Where do you live?', 'Where live you?', 'Where does you live?'],
      en: ['Where you live?', 'Where do you live?', 'Where live you?', 'Where does you live?'],
      ca: ['Where you live?', 'Where do you live?', 'Where live you?', 'Where does you live?'],
    },
    1, '❓',
    EN('WH- questions in present simple: question word + do/does + subject + base verb. "Where do you live?" — "does" is only for he/she/it.')
  ),
  q('gi-08', 'primaria',
    EN('Choose the correct word: "This is ___ book." (the book belongs to her)'),
    { es: ['her', 'hers', 'she', 'his'], en: ['her', 'hers', 'she', 'his'], ca: ['her', 'hers', 'she', 'his'] },
    0, '📕',
    EN('"Her" before a noun is a possessive adjective: her book, his pen, their house. "Hers" is a possessive pronoun (used alone): "This book is hers."')
  ),
  q('gi-09', 'eso',
    EN('Which sentence uses the present perfect correctly?'),
    {
      es: ['I have seen that film yesterday.', 'I saw that film already.', 'I have already seen that film.', 'I did see that film.'],
      en: ['I have seen that film yesterday.', 'I saw that film already.', 'I have already seen that film.', 'I did see that film.'],
      ca: ['I have seen that film yesterday.', 'I saw that film already.', 'I have already seen that film.', 'I did see that film.'],
    },
    2, '🎬',
    EN('Present perfect: have/has + past participle. Don\'t use it with specific past times (yesterday, last week). "Already" goes between have and the past participle.')
  ),
  q('gi-10', 'eso',
    EN('Complete: "If it rains tomorrow, we ___ stay at home."'),
    { es: ['would', 'will', 'should', 'shall'], en: ['would', 'will', 'should', 'shall'], ca: ['would', 'will', 'should', 'shall'] },
    1, '🌧️',
    EN('First conditional (real future possibility): If + present simple, will + base verb. "If it rains, we will stay." Second conditional uses "would": If it rained, we would stay.')
  ),
  q('gi-11', 'eso',
    EN('What does "give up" mean?'),
    {
      es: ['to donate something', 'to quit or stop trying', 'to offer a gift', 'to increase something'],
      en: ['to donate something', 'to quit or stop trying', 'to offer a gift', 'to increase something'],
      ca: ['to donate something', 'to quit or stop trying', 'to offer a gift', 'to increase something'],
    },
    1, '🏳️',
    EN('"Give up" is a phrasal verb meaning to stop trying or to surrender. "Don\'t give up!" Other common phrasal verbs: give in (yield), give away (donate), give back (return).')
  ),
  q('gi-12', 'eso',
    EN('Choose the correct passive sentence for "Someone stole my bike."'),
    {
      es: ['My bike has been stolen.', 'My bike was stolen.', 'My bike is stolen.', 'My bike stolen.'],
      en: ['My bike has been stolen.', 'My bike was stolen.', 'My bike is stolen.', 'My bike stolen.'],
      ca: ['My bike has been stolen.', 'My bike was stolen.', 'My bike is stolen.', 'My bike stolen.'],
    },
    1, '🚲',
    EN('Passive: subject + was/were + past participle. Past simple passive = was/were + p.p. "Someone stole" (active) → "My bike was stolen" (passive). The agent is omitted when unknown.')
  ),
  q('gi-13', 'eso',
    EN('Which word correctly completes: "She is ___ than her brother." (tall)'),
    { es: ['more tall', 'taller', 'tallest', 'most tall'], en: ['more tall', 'taller', 'tallest', 'most tall'], ca: ['more tall', 'taller', 'tallest', 'most tall'] },
    1, '📏',
    EN('Comparative of short adjectives (1-2 syllables): add -er. tall→taller, fast→faster. Long adjectives use "more": more intelligent. Superlatives: tallest / most intelligent.')
  ),
  q('gi-14', 'eso',
    EN('Which sentence uses a relative clause correctly?'),
    {
      es: ['The man who he lives next door is a doctor.', 'The man who lives next door is a doctor.', 'The man which lives next door is a doctor.', 'The man lives next door is a doctor.'],
      en: ['The man who he lives next door is a doctor.', 'The man who lives next door is a doctor.', 'The man which lives next door is a doctor.', 'The man lives next door is a doctor.'],
      ca: ['The man who he lives next door is a doctor.', 'The man who lives next door is a doctor.', 'The man which lives next door is a doctor.', 'The man lives next door is a doctor.'],
    },
    1, '👨‍⚕️',
    EN('Use "who" for people, "which" for things, "that" for both. Don\'t repeat the subject: NOT "the man who he lives" — just "the man who lives".')
  ),
  q('gi-15', 'eso',
    EN('Choose the correct reported speech: He said, "I am tired."'),
    {
      es: ['He said that he is tired.', 'He said that he was tired.', 'He said that I am tired.', 'He said that he be tired.'],
      en: ['He said that he is tired.', 'He said that he was tired.', 'He said that I am tired.', 'He said that he be tired.'],
      ca: ['He said that he is tired.', 'He said that he was tired.', 'He said that I am tired.', 'He said that he be tired.'],
    },
    1, '💬',
    EN('In reported speech, tenses shift back: am/is → was, are → were, will → would, can → could. Pronouns also change: "I" → "he/she".')
  ),
  q('gi-16', 'eso',
    EN('What is the difference between "I used to play" and "I am used to playing"?'),
    {
      es: [
        'No hay diferencia, son intercambiables',
        '"Used to play" = past habit; "used to playing" = accustomed to it',
        '"Used to play" = current habit; "used to playing" = past habit',
        'Only "used to play" is grammatically correct',
      ],
      en: [
        'There is no difference, they are interchangeable',
        '"Used to play" = past habit; "used to playing" = accustomed to it',
        '"Used to play" = current habit; "used to playing" = past habit',
        'Only "used to play" is grammatically correct',
      ],
      ca: [
        'No hi ha diferència, són intercanviables',
        '"Used to play" = hàbit passat; "used to playing" = acostumat a fer-ho',
        '"Used to play" = hàbit actual; "used to playing" = hàbit passat',
        'Only "used to play" is grammatically correct',
      ],
    },
    1, '🔄',
    EN('"Used to + infinitive" expresses a past habit that no longer exists. "Be used to + -ing" means being accustomed to something (can be present, past or future).')
  ),

  q('gi-17', 'primaria',
    EN("Which word is a verb?"),
    { es: ["happy","swim","chair","slowly"], en: ["happy","swim","chair","slowly"], ca: ["happy","swim","chair","slowly"] },
    1, '🏊',
    EN("\"Swim\" is an action, so it is a verb. \"Happy\" is an adjective, \"chair\" a noun and \"slowly\" an adverb.")),

  q('gi-18', 'primaria',
    EN("Complete: \"There ___ three books on the table.\""),
    { es: ["is","are","be","am"], en: ["is","are","be","am"], ca: ["is","are","be","am"] },
    1, '📚',
    EN("\"Three books\" is plural, so it takes \"are\". Singular would be \"There is a book\".")),

  q('gi-20', 'primaria',
    EN("Complete: \"This is ___ book.\" (it belongs to me)"),
    { es: ["I","my","me","mine book"], en: ["I","my","me","mine book"], ca: ["I","my","me","mine book"] },
    1, '📖',
    EN("Possessive adjectives go before the noun: my, your, his, her, our, their. \"Mine\" stands alone: \"This book is mine\".")),

  q('gi-21', 'primaria',
    EN("Which sentence is correct?"),
    { es: ["She have a dog.","She has a dog.","She haves a dog.","She having a dog."], en: ["She have a dog.","She has a dog.","She haves a dog.","She having a dog."], ca: ["She have a dog.","She has a dog.","She haves a dog.","She having a dog."] },
    1, '🐕',
    EN("With he/she/it the verb \"have\" becomes \"has\". It is irregular: not \"haves\".")),
  q('gi-40', 'primaria', EN('What is the plural of "man"?'),
    O(['mans', 'mens', 'men', 'manes']),
    2, '👨',
    EN('"Man" becomes "men": an irregular plural that changes the vowel instead of adding -s. The same family: woman→women, foot→feet, tooth→teeth, goose→geese.')),
  q('gi-41', 'primaria', EN('Complete: "I ___ a student and she ___ a teacher."'),
    O(['am / is', 'is / am', 'are / is', 'am / are']),
    0, '🎓',
    EN('The verb "be" changes with every person: I am, you are, he/she/it is, we/they are. It is the most irregular verb in English and the first one worth memorising.')),
  q('gi-42', 'primaria', EN('Which word is an adjective?'),
    O(['quickly', 'happy', 'run', 'house']),
    1, '😀',
    EN('"Happy" describes a noun: a happy child. "Quickly" is an adverb (it ends in -ly), "run" is a verb and "house" is a noun. In English the adjective goes BEFORE the noun, unlike Spanish.')),
  q('gi-43', 'primaria', EN('Where does the adjective go: "a car red" or "a red car"?'),
    O(['a car red', 'a red car', 'Both are correct', 'It depends on the colour']),
    1, '🚗',
    EN('In English the adjective always comes before the noun: a red car, a big house, an old book. This is the opposite of Spanish ("un coche rojo") and one of the mistakes Spanish speakers make most.')),
  q('gi-44', 'primaria', EN('Complete: "There ___ a book on the table."'),
    O(['are', 'is', 'have', 'has']),
    1, '📕',
    EN('"There is" for one thing, "there are" for several: there is a book / there are three books. Careful: it is NOT "there have" — English uses "be" here where Spanish uses "haber".')),
  q('gi-45', 'primaria', EN('Which sentence asks about possession?'),
    O(['Who is that?', 'Whose bag is this?', 'Where is the bag?', 'What is that?']),
    1, '🎒',
    EN('"Whose" asks who something belongs to. Do not confuse it with "who\'s", which sounds identical but means "who is". They are two different words that happen to sound the same.')),
  q('gi-46', 'primaria', EN('Complete: "She is taller ___ her brother."'),
    O(['that', 'than', 'then', 'as']),
    1, '📏',
    EN('Comparisons use "than": taller than, faster than, better than. "Then" means "afterwards" and is a different word — the two are mixed up constantly, even by native speakers.')),
  q('gi-47', 'primaria', EN('What is the comparative of "good"?'),
    O(['gooder', 'more good', 'better', 'best']),
    2, '👍',
    EN('"Good" is irregular: good → better → best. Most short adjectives just add -er (taller, faster), but a few change completely: bad→worse→worst, far→further→furthest.')),
  q('gi-48', 'primaria', EN('Complete: "I have two ___."'),
    O(['childs', 'children', 'childrens', 'child']),
    1, '👶',
    EN('"Children" is already plural, so "childrens" does not exist. It is a leftover from Old English, where -en was a normal plural ending — today only "children" and "oxen" keep it.')),
  q('gi-49', 'primaria', EN('Which sentence is correct?'),
    O(['I have 15 years old.', 'I am 15 years old.', 'I have 15 years.', 'I am 15 years.']),
    1, '🎂',
    EN('English says "I AM 15 years old", using the verb "be". Spanish says "tengo 15 años" with "have", and translating that word for word is one of the most recognisable Spanish-speaker mistakes.')),
  q('gi-50', 'primaria', EN('Complete: "___ you like chocolate?"'),
    O(['Are', 'Do', 'Is', 'Have']),
    1, '🍫',
    EN('Questions in the present simple use the auxiliary "do" (or "does" for he/she/it). "Are you like chocolate?" is wrong because "like" is already the verb — you cannot have two.')),
  q('gi-51', 'primaria', EN('Complete: "My sister and I ___ going to the park."'),
    O(['am', 'is', 'are', 'be']),
    2, '🏞️',
    EN('"My sister and I" is the same as "we", so the verb is "are". When the subject is two people joined by "and", it always counts as plural even if each one is singular.')),
  q('gi-52', 'primaria', EN('Which word is a preposition of place?'),
    O(['under', 'quickly', 'because', 'happy']),
    0, '📦',
    EN('"Under" says where something is: under the table. The other basic ones are in, on, at, over, behind, between, next to. "Because" joins ideas, "quickly" is an adverb and "happy" an adjective.')),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(q => q.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
