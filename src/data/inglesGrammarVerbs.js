// Questions and options always in English (an English exam is not translated).
const EN = s => ({ es: s, en: s, ca: s })
const O = a => ({ es: a, en: a, ca: a })
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const TODAS = [
  q('v-01', 'primaria', EN('Which word is a verb?'),
    O(['table', 'blue', 'jump', 'slowly']), 2, '🏃',
    EN('A verb expresses an action or state. "Jump" is an action → verb.')),

  q('v-02', 'primaria', EN('What is the past simple of "go"?'),
    O(['goed', 'went', 'gone', 'going']), 1, '➡️',
    EN('"Go" is irregular: its past simple is "went". "Gone" is the past participle (have gone).')),

  q('v-03', 'primaria', EN('What is the past simple of "play"?'),
    O(['play', 'plays', 'played', 'playing']), 2, '⚽',
    EN('Regular verbs add -ed in the past simple: play→played, want→wanted, help→helped.')),

  q('v-04', 'primaria', EN('Third person singular (he/she/it) of "watch"?'),
    O(['watch', 'watchs', 'watches', 'watching']), 2, '📺',
    EN('Verbs ending in -ch, -sh, -ss, -x or -o add -es for he/she/it: watch→watches, go→goes.')),

  q('v-05', 'primaria', EN('What is the -ing form of "run"?'),
    O(['runing', 'running', 'runned', 'runs']), 1, '🏃',
    EN('Short verbs ending in one vowel + one consonant double the consonant: run→running, sit→sitting.')),

  q('v-06', 'primaria', EN('In "She reads books every day", which word is the verb?'),
    O(['She', 'reads', 'books', 'every']), 1, '📖',
    EN('"Reads" is the action → verb. "She" is a pronoun and "books" is a noun.')),

  q('v-07', 'eso', EN('What is the past participle of "eat"?'),
    O(['eated', 'ate', 'eaten', 'eating']), 2, '🍽️',
    EN('"Eat" is irregular: eat / ate / eaten. The past participle is used with "have": I have eaten.')),

  q('v-08', 'eso', EN('Which of these is an irregular verb?'),
    O(['walk', 'talk', 'buy', 'jump']), 2, '🔀',
    EN('"Buy" is irregular: buy / bought / bought. Regular verbs just add -ed (walked, talked).')),

  q('v-09', 'eso', EN('Third person singular of "have"?'),
    O(['have', 'haves', 'has', 'having']), 2, '✋',
    EN('"Have" is irregular in the third person singular: he/she/it has.')),

  q('v-10', 'eso', EN('Which of these is a modal verb?'),
    O(['run', 'can', 'book', 'happy']), 1, '🔑',
    EN('Modal verbs express ability, permission or obligation: can, could, must, should, may, will.')),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(x => x.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
