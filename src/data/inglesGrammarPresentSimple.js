// Questions always in English — language-independent
const EN = s => ({ es: s, en: s, ca: s })
// Opciones iguales en los tres idiomas: en un examen de inglés las
// respuestas son inglés y no se traducen.
const O = a => ({ es: a, en: a, ca: a })
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

  q('ps-16', 'primaria', EN("Complete: \"He ___ football every day.\""),
    O(["play","plays","playing","played"]),
    1, '⚽', EN("With he/she/it the verb takes -s in the present simple: he plays. \"Every day\" tells you it is a routine.")),

  q('ps-17', 'primaria', EN("Complete the negative: \"They ___ like fish.\""),
    O(["doesn't","don't","not","aren't"]),
    1, '🐟', EN("\"Don't\" goes with I/you/we/they; \"doesn't\" with he/she/it. After both, the verb stays in its base form.")),

  q('ps-18', 'primaria', EN("Which question is correct?"),
    O(["Do she work here?","Does she work here?","Does she works here?","Is she work here?"]),
    1, '❓', EN("With he/she/it: Does + subject + BASE verb. The -s moves onto \"does\", so it is \"Does she work?\", never \"Does she works?\".")),

  q('ps-19', 'primaria', EN("Complete: \"My sister ___ to school by bus.\""),
    O(["go","goes","going","gos"]),
    1, '🚌', EN("Verbs ending in -o add -es: go → goes, do → does. \"Gos\" does not exist.")),

  q('ps-20', 'primaria', EN("Which word signals the present simple?"),
    O(["now","always","yesterday","tomorrow"]),
    1, '🔁', EN("always, usually, often, never and every day point at habits → present simple. \"Now\" points at the present continuous.")),

  q('ps-21', 'primaria', EN("Complete: \"Water ___ at 100 degrees.\""),
    O(["boil","boils","is boiling","boiled"]),
    1, '🌡️', EN("General truths and scientific facts go in the present simple: \"water boils at 100 degrees\".")),

  q('ps-22', 'primaria', EN("Where does \"never\" go?"),
    O(["She eats never meat.","She never eats meat.","Never she eats meat.","She eats meat never."]),
    1, '🥗', EN("Frequency adverbs go between the subject and the main verb: \"she never eats\". In Spanish they move around freely; in English they do not.")),

  q('ps-23', 'eso', EN("Which is correct with the verb \"be\"?"),
    O(["He never is late.","He is never late.","Never he is late.","He is late never."]),
    1, '⏰', EN("With \"be\" the adverb goes AFTER: \"he is never late\". With any other verb it goes before: \"he never arrives late\".")),

  q('ps-24', 'eso', EN("Complete: \"The train ___ at 7:15 every morning.\""),
    O(["leave","leaves","is leaving","left"]),
    1, '🚂', EN("Timetables and scheduled events take the present simple, even when they talk about the future: \"the train leaves at 7:15\".")),
  q('ps-40', 'primaria', EN('Which persons add -s to the verb in the present simple?'),
    O(['I, you, we, they', 'he, she, it', 'All of them', 'None of them']),
    1, '3️⃣',
    EN('Only the third person singular: he works, she lives, it rains. Every other person uses the base form. Forgetting this -s is the single most common present simple mistake.')),
  q('ps-41', 'primaria', EN('Complete: "She ___ (go) to work by car."'),
    O(['gos', 'goes', 'goies', 'go']),
    1, '🚙',
    EN('Verbs ending in -o, -s, -sh, -ch or -x add -es instead of just -s: go→goes, do→does, watch→watches, wash→washes, fix→fixes. It is the same rule that makes plurals like "boxes".')),
  q('ps-42', 'primaria', EN('Complete: "He ___ (fly) to London every month."'),
    O(['flys', 'flies', 'flyes', 'fly']),
    1, '✈️',
    EN('A consonant + y turns into -ies: fly→flies, study→studies, carry→carries. But a vowel + y just adds -s: play→plays, buy→buys. Exactly the same rule as the past simple -ied.')),
  q('ps-43', 'primaria', EN('Which sentence is correct?'),
    O(['He don\'t like fish.', 'He doesn\'t like fish.', 'He doesn\'t likes fish.', 'He not like fish.']),
    1, '🐟',
    EN('"He" takes "doesn\'t", and the -s moves to the auxiliary: doesn\'t LIKE, not "doesn\'t likes". The auxiliary carries the person, so the main verb goes back to its base form.')),
  q('ps-44', 'primaria', EN('Complete: "___ they live in Madrid?"'),
    O(['Does', 'Do', 'Are', 'Is']),
    1, '🏙️',
    EN('"They" takes "Do"; only he/she/it takes "Does". And after either one, the verb stays in its base form: Does she live? — never "Does she lives?".')),
  q('ps-45', 'primaria', EN('When do we use the present simple?'),
    O(['For things happening right now', 'For habits, routines and facts that are generally true', 'Only for the future', 'Only for finished actions']),
    1, '🔁',
    EN('It is the tense of what is always or usually true: I live in Spain, water boils at 100 degrees, she plays tennis on Sundays. For what is happening at this moment you use the present continuous instead.')),
  q('ps-46', 'primaria', EN('What is the difference between "I read" and "I am reading"?'),
    O(['No difference', 'The first is a habit; the second is happening right now', 'The first is the past', 'The second is the future']),
    1, '📚',
    EN('"I read every night" is a routine; "I am reading right now" is this moment. Spanish uses the simple present for both, which is why Spanish speakers under-use the continuous in English.')),
  q('ps-47', 'primaria', EN('Where does "usually" go in "She ___ gets up at seven"?'),
    O(['At the end', 'Before the main verb', 'After the object', 'It cannot be used here']),
    1, '⏰',
    EN('Adverbs of frequency go before the main verb: she usually gets up, they often play. But with the verb "be" they go AFTER it: she is usually late, never "she usually is late".')),
  q('ps-48', 'primaria', EN('Complete: "My brother and I ___ football on Saturdays."'),
    O(['plays', 'play', 'playes', 'is playing']),
    1, '⚽',
    EN('"My brother and I" equals "we", so no -s. The -s only belongs to a single third person: my brother PLAYS, but my brother and I PLAY.')),
  q('ps-49', 'primaria', EN('Which word is NOT a present simple signal word?'),
    O(['always', 'never', 'yesterday', 'every week']),
    2, '📅',
    EN('"Yesterday" points to finished time, which needs the past simple. The present simple goes with always, never, usually, often, sometimes, every day/week/year — all of them repeated or general.')),
  q('ps-50', 'primaria', EN('Complete: "The shop ___ at nine o\'clock every morning."'),
    O(['open', 'opens', 'is opening', 'opened']),
    1, '🏪',
    EN('"The shop" is a third person singular — the same as "it" — so it takes -s. And "every morning" tells you it is a routine, which is exactly what the present simple is for.')),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(q => q.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
