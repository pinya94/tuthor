// Questions and options always in English (an English exam is not translated).
const EN = s => ({ es: s, en: s, ca: s })
const O = a => ({ es: a, en: a, ca: a })
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const TODAS = [
  q('adj-01', 'primaria', EN('Which word is an adjective?'),
    O(['quickly', 'happy', 'run', 'dog']), 1, '😊',
    EN('An adjective describes a noun. "Happy" tells us how someone feels → adjective.')),

  q('adj-02', 'primaria', EN('What is the comparative of "big"?'),
    O(['biger', 'bigger', 'more big', 'biggest']), 1, '📏',
    EN('Short adjectives add -er (and double the final consonant here): big→bigger. "Biggest" is the superlative.')),

  q('adj-03', 'primaria', EN('What is the superlative of "good"?'),
    O(['goodest', 'gooder', 'best', 'more good']), 2, '🏆',
    EN('"Good" is irregular: good / better / best. "Best" is the superlative.')),

  q('adj-04', 'primaria', EN('In "a red car drives fast", which word is the adjective?'),
    O(['a', 'red', 'car', 'drives']), 1, '🚗',
    EN('"Red" describes the noun "car" → adjective. "Car" is a noun and "drives" is a verb.')),

  q('adj-05', 'primaria', EN('What is the comparative of "beautiful"?'),
    O(['beautifuler', 'more beautiful', 'beautifulest', 'most beautiful']), 1, '🌸',
    EN('Long adjectives (two or more syllables) use "more": more beautiful. The superlative is "most beautiful".')),

  q('adj-06', 'primaria', EN('Which word order is correct?'),
    O(['a red big ball', 'a big red ball', 'a ball big red', 'big a red ball']), 1, '⚽',
    EN('In English, size comes before colour: a big red ball (opinion → size → colour → noun).')),

  q('adj-07', 'eso', EN('What is the superlative of "happy"?'),
    O(['happiest', 'happyest', 'most happy', 'happier']), 0, '😄',
    EN('Adjectives ending in consonant + y change y→i and add -est: happy→happiest, easy→easiest.')),

  q('adj-08', 'eso', EN('What is the comparative of "far"?'),
    O(['farrer', 'further', 'more far', 'farest']), 1, '🛣️',
    EN('"Far" is irregular: far / further (or farther) / furthest.')),

  q('adj-09', 'eso', EN('Complete: "The film was very ___."'),
    O(['bored', 'boring', 'bore', 'bores']), 1, '🎬',
    EN('-ing adjectives describe what causes the feeling (the film is boring); -ed adjectives describe the feeling (I am bored).')),

  q('adj-10', 'eso', EN('Which of these is a possessive adjective?'),
    O(['mine', 'my', 'me', 'I']), 1, '🔑',
    EN('A possessive adjective goes before a noun: my book, your dog. "Mine" is a possessive pronoun (it stands alone).')),
  q('adj-11', 'primaria', EN('What is the opposite of "big"?'),
    O(['small', 'bigger', 'biggest', 'tall']), 0, '🐜',
    EN('The opposite (antonym) of "big" is "small". "Bigger" and "biggest" are just degrees of big.')),

  q('adj-12', 'primaria', EN('In "a tall green tree", how many adjectives are there?'),
    O(['None', 'One', 'Two', 'Three']), 2, '🌳',
    EN('Two adjectives describe the tree: "tall" (size) and "green" (colour).')),

  q('adj-13', 'eso', EN('What is the comparative of "good"?'),
    O(['gooder', 'better', 'more good', 'best']), 1, '👍',
    EN('"Good" is irregular: good / better / best. "Better" is the comparative, "best" the superlative.')),

  q('adj-14', 'eso', EN('Complete: "I was ___ by the film." (interest)'),
    O(['interesting', 'interested', 'interest', 'interests']), 1, '🎬',
    EN('-ed adjectives describe how a person feels: I was interested. -ing describes the thing: the film was interesting.')),

  q('adj-15', 'eso', EN('What is the superlative of "expensive"?'),
    O(['expensivest', 'the most expensive', 'more expensive', 'expensiver']), 1, '💰',
    EN('Long adjectives use most for the superlative: the most expensive. "More expensive" is the comparative.')),

  q('adj-16', 'eso', EN('Which word order is correct?'),
    O(['a round small table', 'a small round table', 'a table small round', 'small a round table']), 1, '🍴',
    EN('Size comes before shape: a small round table (opinion → size → shape → noun).')),
  q('adj-17', 'primaria', EN('Which word is an adjective?'),
    O(['run', 'small', 'dog', 'quickly']), 1, '🐘',
    EN('An adjective describes a noun. "Small" tells us the size → adjective.')),

  q('adj-18', 'primaria', EN('Which word is a colour (an adjective)?'),
    O(['table', 'blue', 'run', 'sing']), 1, '🔵',
    EN('Colours describe nouns, so they are adjectives: blue, red, green, yellow.')),

  q('adj-19', 'primaria', EN('Which word can fill the gap: "a ___ cat"?'),
    O(['big', 'run', 'sing', 'and']), 0, '🐱',
    EN('An adjective goes before the noun to describe it: a big cat, a black cat.')),

  q('adj-20', 'primaria', EN('What is the opposite of "hot"?'),
    O(['hotter', 'cold', 'hottest', 'warm']), 1, '❄️',
    EN('The opposite of "hot" is "cold". Both are adjectives that describe temperature.')),

  q('adj-21', 'primaria', EN('What is the comparative of "small"?'),
    O(['smaller', 'more small', 'smallest', 'small']), 0, '🐭',
    EN('Short adjectives add -er for the comparative: small→smaller, tall→taller.')),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(x => x.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
