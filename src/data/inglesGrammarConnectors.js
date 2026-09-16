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
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(x => x.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
