const EN = s => ({ es: s, en: s, ca: s })
// Opciones iguales en los tres idiomas: en un examen de inglés las
// respuestas son inglés y no se traducen.
const O = a => ({ es: a, en: a, ca: a })
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const TODAS = [
  q('pa-01', 'primaria', EN('What is the past simple of "go"?'),
    { es: ['goed', 'gone', 'went', 'going'], en: ['goed', 'gone', 'went', 'going'], ca: ['goed', 'gone', 'went', 'going'] },
    2, '🚶', EN('"Went" is the irregular past of "go". Common irregulars: go→went, see→saw, eat→ate, have→had, come→came, take→took.')),

  q('pa-02', 'primaria', EN('Make the sentence past simple: "She walks to school."'),
    { es: ['She walk to school.', 'She walked to school.', 'She was walk to school.', 'She walks yesterday.'], en: ['She walk to school.', 'She walked to school.', 'She was walk to school.', 'She walks yesterday.'], ca: ['She walk to school.', 'She walked to school.', 'She was walk to school.', 'She walks yesterday.'] },
    1, '🚶‍♀️', EN('Regular verbs add -ed in past simple: walk→walked, talk→talked, play→played. All persons use the same form (no -s).')),

  q('pa-03', 'primaria', EN('Which signal word goes with past simple?'),
    { es: ['now', 'every day', 'yesterday', 'at the moment'], en: ['now', 'every day', 'yesterday', 'at the moment'], ca: ['now', 'every day', 'yesterday', 'at the moment'] },
    2, '📆', EN('"Yesterday", "last week/year", "ago", "in 2010", "when I was young" signal past simple. They all refer to a finished point in the past.')),

  q('pa-04', 'primaria', EN('Choose the negative: "He went to the party."'),
    { es: ["He didn't went to the party.", "He didn't go to the party.", "He don't go to the party.", "He wasn't go to the party."], en: ["He didn't went to the party.", "He didn't go to the party.", "He don't go to the party.", "He wasn't go to the party."], ca: ["He didn't went to the party.", "He didn't go to the party.", "He don't go to the party.", "He wasn't go to the party."] },
    1, '🎉', EN('"Didn\'t" + base verb (never past form!). "He didn\'t go." — NOT "didn\'t went". The past is shown by "did", not the main verb.')),

  q('pa-05', 'primaria', EN('Choose the correct question: "you / eat / pizza / last night"'),
    { es: ['You ate pizza last night?', 'Did you eat pizza last night?', 'Did you ate pizza last night?', 'Do you eat pizza last night?'], en: ['You ate pizza last night?', 'Did you eat pizza last night?', 'Did you ate pizza last night?', 'Do you eat pizza last night?'], ca: ['You ate pizza last night?', 'Did you eat pizza last night?', 'Did you ate pizza last night?', 'Do you eat pizza last night?'] },
    1, '🍕', EN('Past simple questions: Did + subject + base verb. "Did you eat?" — NOT "Did you ate?" The base verb always follows "did".')),

  q('pa-06', 'primaria', EN('What is the past simple of "stop"?'),
    { es: ['stoped', 'stopped', 'stopted', 'stopt'], en: ['stoped', 'stopped', 'stopted', 'stopt'], ca: ['stoped', 'stopped', 'stopted', 'stopt'] },
    1, '✋', EN('Verbs with one vowel + one consonant at the end: double the final consonant + -ed. Stop→stopped, plan→planned, drop→dropped.')),

  q('pa-07', 'primaria', EN('Complete: "They ___ (be) very happy yesterday."'),
    { es: ['was', 'were', 'are', 'been'], en: ['was', 'were', 'are', 'been'], ca: ['was', 'were', 'are', 'been'] },
    1, '😊', EN('"Was" = I/he/she/it. "Were" = you/we/they. "They were happy." — always use WERE with plural subjects.')),

  q('pa-08', 'eso', EN('What is the past simple of "try"?'),
    { es: ['tryed', 'tryed', 'tried', 'tryed'], en: ['tryied', 'tryed', 'tried', 'trying'], ca: ['tryied', 'tryed', 'tried', 'trying'] },
    2, '💪', EN('Verbs ending in consonant + y: change y → i and add -ed. Try→tried, study→studied, carry→carried. (But: play→played — vowel + y.)')),

  q('pa-09', 'eso', EN('Which sentence uses past simple correctly?'),
    { es: ['I have seen her yesterday.', 'I saw her yesterday.', 'I see her yesterday.', 'I was see her yesterday.'], en: ['I have seen her yesterday.', 'I saw her yesterday.', 'I see her yesterday.', 'I was see her yesterday.'], ca: ['I have seen her yesterday.', 'I saw her yesterday.', 'I see her yesterday.', 'I was see her yesterday.'] },
    1, '👀', EN('With specific past times (yesterday, last week, in 2010), use past simple — NOT present perfect. "I saw her yesterday" is correct.')),

  q('pa-10', 'eso', EN('"Did you enjoy the film?" — Correct short answer (negative):'),
    { es: ["No, I didn't enjoyed it.", "No, I don't.", "No, I didn't.", "No, I wasn't."], en: ["No, I didn't enjoyed it.", "No, I don't.", "No, I didn't.", "No, I wasn't."], ca: ["No, I didn't enjoyed it.", "No, I don't.", "No, I didn't.", "No, I wasn't."] },
    2, '🎬', EN('Short answers in past simple: "Yes, I did." / "No, I didn\'t." Never repeat the main verb in a short answer.')),

  q('pa-11', 'eso', EN('Complete: "She ___ (not/come) to the meeting."'),
    { es: ["She didn't came to the meeting.", "She didn't come to the meeting.", "She don't come to the meeting.", "She wasn't come to the meeting."], en: ["She didn't came to the meeting.", "She didn't come to the meeting.", "She don't come to the meeting.", "She wasn't come to the meeting."], ca: ["She didn't came to the meeting.", "She didn't come to the meeting.", "She don't come to the meeting.", "She wasn't come to the meeting."] },
    1, '📋', EN('"Didn\'t + base verb" — always the base form. "Come" not "came". The -ed or irregular form is NEVER used after didn\'t.')),

  q('pa-12', 'eso', EN('Past simple of "lie" (to tell a lie):'),
    { es: ['lied', 'lay', 'lain', 'lied'], en: ['lied', 'lay', 'lain', 'lied'], ca: ['lied', 'lay', 'lain', 'lied'] },
    0, '🤥', EN('"Lie" (tell a lie) is regular: lied. BUT "lie" (to be horizontal) is irregular: lie→lay→lain. Common mix-up!')),

  q('pa-13', 'eso', EN('What are the three forms of the verb "break"?'),
    { es: ['break / breaked / breaked', 'break / broke / broken', 'break / broked / broken', 'break / broke / broke'], en: ['break / breaked / breaked', 'break / broke / broken', 'break / broked / broken', 'break / broke / broke'], ca: ['break / breaked / breaked', 'break / broke / broken', 'break / broked / broken', 'break / broke / broke'] },
    1, '💔', EN('"Break" is irregular: break (infinitive) → broke (past simple) → broken (past participle). Learn the three forms together!')),

  q('pa-14', 'eso', EN('Choose the correct past simple of "carry":'),
    { es: ['carryed', 'carried', 'carred', 'carryied'], en: ['carryed', 'carried', 'carred', 'carryied'], ca: ['carryed', 'carried', 'carred', 'carryied'] },
    1, '🧳', EN('Consonant + y → change y to i + ed. Carry→carried, hurry→hurried, worry→worried.')),

  q('pa-15', 'eso', EN('When do we use past simple (not past continuous)?'),
    { es: ['For an action in progress at a past moment', 'For a completed action at a specific past time', 'For a habit in the present', 'For a future plan'], en: ['For an action in progress at a past moment', 'For a completed action at a specific past time', 'For a habit in the present', 'For a future plan'], ca: ['For an action in progress at a past moment', 'For a completed action at a specific past time', 'For a habit in the present', 'For a future plan'] },
    1, '✅', EN('Past simple = completed action at a specific past time: "I called her at 9." Past continuous = action in progress: "I was calling her when you arrived."')),

  q('pa-17', 'primaria', EN("Complete: \"She ___ her homework last night.\""),
    O(["finish","finished","finishes","finishing"]),
    1, '📚', EN("Regular verbs add -ed for the past: finish → finished. \"Last night\" is finished time.")),

  q('pa-18', 'primaria', EN("Complete the negative: \"He ___ come to the party.\""),
    O(["didn't","doesn't","not","wasn't"]),
    0, '🎉', EN("\"Didn't\" is the past negative for every person. And after it the verb goes back to its base form: \"didn't come\".")),

  q('pa-19', 'primaria', EN("Which question is correct?"),
    O(["Did you saw the film?","Did you see the film?","Do you saw the film?","Did you seeing the film?"]),
    1, '🎬', EN("\"Did\" already marks the past, so the main verb stays in its base form: \"Did you see?\", never \"Did you saw?\".")),

  q('pa-20', 'primaria', EN("Which word signals the past simple?"),
    O(["every day","yesterday","already","now"]),
    1, '📅', EN("yesterday, last week, in 2019 and two days ago point at a finished moment → past simple. \"Already\" belongs to the present perfect.")),

  q('pa-21', 'primaria', EN("Complete: \"We ___ tired after the trip.\""),
    O(["was","were","are","been"]),
    1, '😴', EN("The verb \"be\" has its own past and does not use \"did\": was for I/he/she/it, were for you/we/they.")),

  q('pa-22', 'primaria', EN("What is the past simple of \"buy\"?"),
    O(["buyed","bought","buys","buying"]),
    1, '🛒', EN("buy → bought. Irregular verbs have no rule: they are learnt by heart.")),

  q('pa-23', 'eso', EN("Why is \"He didn't went\" wrong?"),
    O(["\"Went\" is not a real verb","After \"did\" the verb goes back to its base form","\"Didn't\" cannot be used with \"he\"","It should use \"was\""]),
    1, '🚫', EN("The past is marked ONCE, by \"did\". Marking it twice (\"didn't went\") is the most repeated mistake: it is \"didn't go\".")),

  q('pa-24', 'eso', EN("Complete: \"I ___ that book last month.\" (read)"),
    O(["readed","read","reads","reading"]),
    1, '📖', EN("\"Read\" is spelt the same in the present and the past, but the past is pronounced /red/. \"Last month\" is the only clue.")),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(q => q.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
