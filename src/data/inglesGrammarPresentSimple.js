// Questions always in English — language-independent
const EN = s => ({ es: s, en: s, ca: s })
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const TODAS = [
  q('ps-01', 'primaria', EN('Which sentence is correct?'),
    { es: ['She go to school.', 'She goes to school.', 'She gos to school.', 'She going to school.'], en: ['She go to school.', 'She goes to school.', 'She gos to school.', 'She going to school.'], ca: ['She go to school.', 'She goes to school.', 'She gos to school.', 'She going to school.'] },
    1, '🏫', EN('With he/she/it in present simple, add -s or -es to the verb. "Go" → "goes".')),

  q('ps-02', 'primaria', EN('Complete: "He ___ (watch) TV every evening."'),
    { es: ['watch', 'watchs', 'watches', 'watching'], en: ['watch', 'watchs', 'watches', 'watching'], ca: ['watch', 'watchs', 'watches', 'watching'] },
    2, '📺', EN('Verbs ending in -ch, -sh, -ss, -x, -o add -es in 3rd person: watch→watches, go→goes, fix→fixes.')),

  q('ps-03', 'primaria', EN('Make it negative: "They play football."'),
    { es: ["They don't plays football.", "They doesn't play football.", "They don't play football.", "They not play football."], en: ["They don't plays football.", "They doesn't play football.", "They don't play football.", "They not play football."], ca: ["They don't plays football.", "They doesn't play football.", "They don't play football.", "They not play football."] },
    2, '⚽', EN('"Don\'t" is used with I/you/we/they. "Doesn\'t" is for he/she/it. After don\'t/doesn\'t, use the base verb (no -s).')),

  q('ps-04', 'primaria', EN('Which word is a signal word for present simple?'),
    { es: ['now', 'at the moment', 'every day', 'yesterday'], en: ['now', 'at the moment', 'every day', 'yesterday'], ca: ['now', 'at the moment', 'every day', 'yesterday'] },
    2, '📅', EN('"Every day/week/year", "always", "usually", "often", "sometimes" signal present simple habits. "Now/at the moment" signal present continuous.')),

  q('ps-05', 'primaria', EN('Which question is correct?'),
    { es: ['Does she likes pizza?', 'Does she like pizza?', 'Do she likes pizza?', 'Is she like pizza?'], en: ['Does she likes pizza?', 'Does she like pizza?', 'Do she likes pizza?', 'Is she like pizza?'], ca: ['Does she likes pizza?', 'Does she like pizza?', 'Do she likes pizza?', 'Is she like pizza?'] },
    1, '🍕', EN('Questions with he/she/it: Does + subject + base verb (no -s). "Does she like?" — the -s moves to "does", not the main verb.')),

  q('ps-06', 'primaria', EN('Complete: "He ___ (study) every night."'),
    { es: ['studys', 'studyes', 'studies', 'studying'], en: ['studys', 'studyes', 'studies', 'studying'], ca: ['studys', 'studyes', 'studies', 'studying'] },
    2, '📚', EN('Verbs ending in consonant + y: change y → i and add -es. Study→studies, try→tries, fly→flies. (But: play→plays — vowel before y.)')),

  q('ps-07', 'primaria', EN('What does "He doesn\'t eat meat." mean?'),
    { es: ['He eats meat.', 'He ate meat.', 'He will eat meat.', 'He never eats meat.'], en: ['He eats meat.', 'He ate meat.', 'He will eat meat.', 'He never eats meat.'], ca: ['He eats meat.', 'He ate meat.', 'He will eat meat.', 'He never eats meat.'] },
    3, '🥩', EN('"Doesn\'t + base verb" is the present simple negative. "He doesn\'t eat meat" = he never eats meat (as a habit).')),

  q('ps-08', 'eso', EN('Which sentence uses a stative verb correctly?'),
    { es: ["I am knowing the answer.", "I know the answer.", "I am knowing answer.", "I knowing the answer."], en: ["I am knowing the answer.", "I know the answer.", "I am knowing answer.", "I knowing the answer."], ca: ["I am knowing the answer.", "I know the answer.", "I am knowing answer.", "I knowing the answer."] },
    1, '🧠', EN('Stative verbs (know, like, love, hate, believe, understand, want, need) don\'t usually take continuous form. Use simple: "I know", not "I am knowing".')),

  q('ps-09', 'eso', EN('Choose the correct adverb position: "She ___ late."'),
    { es: ['always is', 'is always', 'always being', 'being always'], en: ['always is', 'is always', 'always being', 'being always'], ca: ['always is', 'is always', 'always being', 'being always'] },
    1, '⏰', EN('Adverbs of frequency (always, usually, often, sometimes, never) go AFTER the verb "to be": "She is always late." But BEFORE other verbs: "She always arrives late."')),

  q('ps-10', 'eso', EN('"Do you like coffee?" — Choose the correct short answer.'),
    { es: ['Yes, I like.', 'Yes, I do.', 'Yes, I am.', 'Yes, I does.'], en: ['Yes, I like.', 'Yes, I do.', 'Yes, I am.', 'Yes, I does.'], ca: ['Yes, I like.', 'Yes, I do.', 'Yes, I am.', 'Yes, I does.'] },
    1, '☕', EN('Short answers use the auxiliary: "Yes, I do." / "No, I don\'t." Never repeat the main verb: NOT "Yes, I like."')),

  q('ps-11', 'eso', EN('What is the difference between present simple and present continuous?'),
    { es: ['No difference', 'Simple = habit/fact; Continuous = happening now', 'Simple = now; Continuous = habit', 'Simple = future; Continuous = past'], en: ['No difference', 'Simple = habit/fact; Continuous = happening now', 'Simple = now; Continuous = habit', 'Simple = future; Continuous = past'], ca: ['No difference', 'Simple = habit/fact; Continuous = happening now', 'Simple = now; Continuous = habit', 'Simple = future; Continuous = past'] },
    1, '🔄', EN('Present simple: habits, facts, routines ("I walk to school"). Present continuous: actions happening right now ("I am walking to school now").')),

  q('ps-12', 'eso', EN('"Water ___ at 100°C." Choose the correct form.'),
    { es: ['is boiling', 'boils', 'boil', 'boiled'], en: ['is boiling', 'boils', 'boil', 'boiled'], ca: ['is boiling', 'boils', 'boil', 'boiled'] },
    1, '💧', EN('Scientific facts use present simple: "Water boils at 100°C." The sun rises in the east. Light travels at 300,000 km/s.')),

  q('ps-13', 'eso', EN('Which sentence is correct? (have/has)'),
    { es: ['She have a car.', 'She have got car.', 'She has a car.', 'She haves a car.'], en: ['She have a car.', 'She have got car.', 'She has a car.', 'She haves a car.'], ca: ['She have a car.', 'She have got car.', 'She has a car.', 'She haves a car.'] },
    2, '🚗', EN('"Have" is irregular in 3rd person: I/you/we/they HAVE, but he/she/it HAS. Never "haves".')),

  q('ps-14', 'eso', EN('Choose the correct form for a timetabled event: "The train ___ at 9 am."'),
    { es: ['is leaving', 'leaves', 'will leave', 'left'], en: ['is leaving', 'leaves', 'will leave', 'left'], ca: ['is leaving', 'leaves', 'will leave', 'left'] },
    1, '🚂', EN('Present simple can express scheduled future events (timetables, programmes): "The train leaves at 9 am." "The match starts at 7 pm."')),

  q('ps-15', 'eso', EN('"He ___ (not/understand) the question." Complete correctly.'),
    { es: ["He don't understand the question.", "He doesn't understands the question.", "He doesn't understand the question.", "He not understands the question."], en: ["He don't understand the question.", "He doesn't understands the question.", "He doesn't understand the question.", "He not understands the question."], ca: ["He don't understand the question.", "He doesn't understands the question.", "He doesn't understand the question.", "He not understands the question."] },
    2, '🤔', EN('"Understand" is a stative verb. Negative 3rd person: doesn\'t + base verb. "He doesn\'t understand." — no -s on the main verb.')),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(q => q.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
