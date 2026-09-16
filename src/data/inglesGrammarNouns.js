// Questions and options always in English (an English exam is not translated).
const EN = s => ({ es: s, en: s, ca: s })
const O = a => ({ es: a, en: a, ca: a })
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const TODAS = [
  q('n-01', 'primaria', EN('Which word is a noun?'),
    O(['run', 'happy', 'dog', 'quickly']), 2, '🐶',
    EN('A noun names a person, animal, place or thing. "Dog" is an animal → noun.')),

  q('n-02', 'primaria', EN('Which of these is a proper noun?'),
    O(['city', 'London', 'river', 'teacher']), 1, '🏙️',
    EN('Proper nouns name a specific person or place and are always capitalised: London, Anna, France.')),

  q('n-03', 'primaria', EN('What is the plural of "child"?'),
    O(['childs', 'childes', 'children', 'childrens']), 2, '🧒',
    EN('"Child" has an irregular plural: children. Other irregulars: man→men, foot→feet, mouse→mice.')),

  q('n-04', 'primaria', EN('What is the plural of "box"?'),
    O(['boxs', 'boxes', 'boxen', 'box']), 1, '📦',
    EN('Nouns ending in -s, -ss, -sh, -ch, -x or -o add -es: box→boxes, bus→buses, dish→dishes.')),

  q('n-05', 'primaria', EN('In "The cat sleeps on the sofa", which word is a noun?'),
    O(['The', 'cat', 'sleeps', 'on']), 1, '🐱',
    EN('"Cat" names an animal → noun. "Sleeps" is a verb and "on" is a preposition.')),

  q('n-06', 'primaria', EN('Which word is an uncountable noun?'),
    O(['apple', 'water', 'book', 'chair']), 1, '💧',
    EN('Uncountable nouns cannot be counted one by one and have no plural: water, milk, sugar, money, information.')),

  q('n-07', 'eso', EN('What is the plural of "leaf"?'),
    O(['leafs', 'leaves', 'leafes', 'leave']), 1, '🍂',
    EN('Nouns ending in -f or -fe usually change to -ves: leaf→leaves, knife→knives, wolf→wolves.')),

  q('n-08', 'eso', EN('Which of these is a collective noun?'),
    O(['player', 'team', 'ball', 'goal']), 1, '👥',
    EN('A collective noun names a group as one unit: team, family, class, herd, flock.')),

  q('n-09', 'eso', EN('Which of these is an abstract noun?'),
    O(['table', 'freedom', 'dog', 'car']), 1, '💭',
    EN('Abstract nouns name ideas or feelings you cannot touch: freedom, love, happiness, courage.')),

  q('n-10', 'eso', EN('Choose the correct possessive: the tail of one dog.'),
    O(["the dogs tail", "the dog's tail", "the dogs' tail", "the dog tail"]), 1, '🐕',
    EN("A singular owner takes apostrophe + s: the dog's tail. Several dogs would be: the dogs' tails.")),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(x => x.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
