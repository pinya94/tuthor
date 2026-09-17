// Questions and options always in English (an English exam is not translated).
const EN = s => ({ es: s, en: s, ca: s })
const O = a => ({ es: a, en: a, ca: a })
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const TODAS = [
  q('con-01', 'primaria', EN('Which word is a preposition?'),
    O(['run', 'on', 'happy', 'dog']), 1, '📍',
    EN('Prepositions show place, time or direction: on, in, under, at, to, from. "The book is on the table."')),

  q('con-02', 'primaria', EN('Which word is a conjunction?'),
    O(['table', 'and', 'blue', 'run']), 1, '🔗',
    EN('Conjunctions join words or clauses: and, or, but, because, so. "Bread and butter."')),

  q('con-03', 'primaria', EN('Complete: "The cat is ___ the table."'),
    O(['on', 'and', 'but', 'run']), 0, '🐱',
    EN('"On" is a preposition of place: on the table, on the wall. It shows where something is.')),

  q('con-04', 'primaria', EN('Complete: "I like tea ___ coffee." (both)'),
    O(['and', 'on', 'under', 'but']), 0, '☕',
    EN('"And" joins two things you add together: tea and coffee.')),

  q('con-05', 'primaria', EN('Complete: "I wanted to go ___ it rained."'),
    O(['but', 'and', 'on', 'to']), 0, '🌧️',
    EN('"But" shows contrast between two ideas: I wanted to go, but it rained.')),

  q('con-06', 'primaria', EN('Complete: "She stayed home ___ she was ill."'),
    O(['because', 'and', 'on', 'but']), 0, '🤒',
    EN('"Because" gives the reason: she stayed home because she was ill.')),

  q('con-07', 'eso', EN('Which of these is a subordinating conjunction?'),
    O(['and', 'but', 'because', 'or']), 2, '🧩',
    EN('Subordinating conjunctions start a dependent clause: because, although, when, if, while. "And/but/or" are coordinating.')),

  q('con-08', 'eso', EN('Complete: "___ it was raining, we went out." (contrast)'),
    O(['Although', 'And', 'On', 'But']), 0, '☂️',
    EN('"Although" introduces a contrast at the start of a clause: Although it was raining, we went out.')),

  q('con-09', 'eso', EN('Complete: "See you ___ Monday."'),
    O(['on', 'in', 'at', 'of']), 0, '📅',
    EN('Use "on" with days and dates: on Monday, on 3rd May. Use "in" for months/years and "at" for clock times.')),

  q('con-10', 'eso', EN('Complete: "I wake up early ___ the morning."'),
    O(['on', 'in', 'at', 'of']), 1, '🌅',
    EN('Use "in" for parts of the day: in the morning, in the afternoon. But "at night".')),
  q('con-11', 'primaria', EN('Complete: "The toy is ___ the box." (it is inside)'),
    O(['in', 'and', 'but', 'so']), 0, '📦',
    EN('"In" shows something is inside: in the box, in the room. It is a preposition of place.')),

  q('con-12', 'primaria', EN('Complete: "I was tired, ___ I went to bed." (result)'),
    O(['so', 'but', 'or', 'because']), 0, '😴',
    EN('"So" introduces a result or consequence: I was tired, so I went to bed.')),

  q('con-13', 'eso', EN('Complete: "___ you study, you will pass." (condition)'),
    O(['If', 'But', 'And', 'So']), 0, '🤔',
    EN('"If" introduces a condition: If you study, you will pass. It is a subordinating conjunction.')),

  q('con-14', 'eso', EN('Complete: "She is afraid ___ spiders."'),
    O(['of', 'on', 'at', 'in']), 0, '🕷️',
    EN('Some adjectives take a fixed preposition: afraid of, good at, interested in, proud of.')),

  q('con-15', 'eso', EN('Complete: "I like neither tea ___ coffee."'),
    O(['or', 'nor', 'and', 'but']), 1, '☕',
    EN('The pair is "neither … nor …": I like neither tea nor coffee. ("Either … or …" is the positive pair.)')),

  q('con-16', 'eso', EN('Complete: "The class starts ___ 9 o\'clock."'),
    O(['on', 'in', 'at', 'of']), 2, '🕘',
    EN('Use "at" with clock times: at 9 o\'clock, at midnight. Use "on" for days and "in" for months.')),
  q('con-17', 'primaria', EN('Which word is a preposition?'),
    O(['and', 'under', 'run', 'red']), 1, '⬇️',
    EN('Prepositions show position: under, on, in, over, behind. "The cat is under the table."')),

  q('con-18', 'primaria', EN('Which word joins two words together?'),
    O(['and', 'cat', 'run', 'blue']), 0, '➕',
    EN('"And" is a conjunction: it joins words. "Salt and pepper."')),

  q('con-19', 'primaria', EN('Complete: "The book is ___ the shelf." (on top of it)'),
    O(['on', 'and', 'but', 'so']), 0, '📖',
    EN('"On" is a preposition of place meaning the surface: on the shelf, on the floor.')),

  q('con-20', 'primaria', EN('Complete: "bread ___ butter"'),
    O(['and', 'but', 'on', 'so']), 0, '🍞',
    EN('"And" joins two things that go together: bread and butter, salt and pepper.')),

  q('con-21', 'primaria', EN('Complete: "I like dogs ___ cats." (both)'),
    O(['and', 'but', 'or', 'so']), 0, '🐶',
    EN('"And" adds two things you both like: I like dogs and cats.')),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(x => x.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
