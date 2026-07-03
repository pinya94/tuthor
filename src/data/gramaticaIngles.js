function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

// English grammar exam — questions always in English regardless of app language
const EN = s => ({ es: s, en: s, ca: s })

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
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(q => q.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
