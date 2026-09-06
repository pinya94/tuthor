const EN = s => ({ es: s, en: s, ca: s })
// Opciones iguales en los tres idiomas: en un examen de inglés las
// respuestas son inglés y no se traducen.
const O = a => ({ es: a, en: a, ca: a })
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const TODAS = [
  q('pp-01', 'primaria', EN('How do we form the present perfect?'),
    { es: ['be + past participle', 'have/has + past participle', 'did + infinitive', 'was/were + -ing'], en: ['be + past participle', 'have/has + past participle', 'did + infinitive', 'was/were + -ing'], ca: ['be + past participle', 'have/has + past participle', 'did + infinitive', 'was/were + -ing'] },
    1, '⚙️', EN('Present perfect = have/has + past participle. "I have eaten." "She has gone." Never use "did" with present perfect.')),

  q('pp-02', 'primaria', EN('Choose the correct sentence:'),
    { es: ['I have saw that film.', 'I have seen that film.', 'I has seen that film.', 'I have see that film.'], en: ['I have saw that film.', 'I have seen that film.', 'I has seen that film.', 'I have see that film.'], ca: ['I have saw that film.', 'I have seen that film.', 'I has seen that film.', 'I have see that film.'] },
    1, '🎬', EN('"Seen" is the past participle of "see" (see→saw→seen). Use "have" with I/you/we/they. "Has" is for he/she/it.')),

  q('pp-03', 'primaria', EN('Complete: "She ___ (never / try) sushi."'),
    { es: ['She has never tried sushi.', 'She never has tried sushi.', 'She has tried never sushi.', 'She never tried sushi.'], en: ['She has never tried sushi.', 'She never has tried sushi.', 'She has tried never sushi.', 'She never tried sushi.'], ca: ['She has never tried sushi.', 'She never has tried sushi.', 'She has tried never sushi.', 'She never tried sushi.'] },
    0, '🍣', EN('"Never" goes between have/has and the past participle: "She has never tried sushi." This is a correct present perfect with "never".')),

  q('pp-04', 'primaria', EN('"Have you finished your homework ___?" Choose the correct word.'),
    { es: ['already', 'yet', 'just', 'ever'], en: ['already', 'yet', 'just', 'ever'], ca: ['already', 'yet', 'just', 'ever'] },
    1, '📝', EN('"Yet" is used in questions and negatives: "Have you finished yet?" / "I haven\'t finished yet." "Already" is for affirmatives: "I have already finished."')),

  q('pp-05', 'primaria', EN('I ___ just ___ (eat) lunch. Choose the correct form.'),
    { es: ['I just ate lunch.', 'I have just eating lunch.', 'I have just eaten lunch.', 'I just have eaten lunch.'], en: ['I just ate lunch.', 'I have just eating lunch.', 'I have just eaten lunch.', 'I just have eaten lunch.'], ca: ['I just ate lunch.', 'I have just eating lunch.', 'I have just eaten lunch.', 'I just have eaten lunch.'] },
    2, '🍽️', EN('"Just" goes between have/has and the past participle to show something very recently happened: "I have just eaten."')),

  q('pp-06', 'eso', EN('Which sentence correctly uses "for" or "since"?'),
    { es: ['I have lived here since three years.', 'I have lived here for 2010.', 'I have lived here for three years.', 'I have lived here since three years ago.'], en: ['I have lived here since three years.', 'I have lived here for 2010.', 'I have lived here for three years.', 'I have lived here since three years ago.'], ca: ['I have lived here since three years.', 'I have lived here for 2010.', 'I have lived here for three years.', 'I have lived here since three years ago.'] },
    2, '🏠', EN('"For" + duration (for 3 years, for a long time). "Since" + point in time (since 2010, since Monday). "I have lived here for three years."')),

  q('pp-07', 'eso', EN('Choose the correct sentence:'),
    { es: ['I have seen her yesterday.', 'I saw her yesterday.', 'I have saw her yesterday.', 'I did see her yesterday.'], en: ['I have seen her yesterday.', 'I saw her yesterday.', 'I have saw her yesterday.', 'I did see her yesterday.'], ca: ['I have seen her yesterday.', 'I saw her yesterday.', 'I have saw her yesterday.', 'I did see her yesterday.'] },
    1, '👀', EN('With specific past times (yesterday, last week, in 2010), use PAST SIMPLE, NOT present perfect. "I saw her yesterday" — not "I have seen her yesterday".')),

  q('pp-08', 'eso', EN('"Have you ever ___ (be) to Japan?"'),
    { es: ['Have you ever been to Japan?', 'Have you ever went to Japan?', 'Have you ever go to Japan?', 'Did you ever been to Japan?'], en: ['Have you ever been to Japan?', 'Have you ever went to Japan?', 'Have you ever go to Japan?', 'Did you ever been to Japan?'], ca: ['Have you ever been to Japan?', 'Have you ever went to Japan?', 'Have you ever go to Japan?', 'Did you ever been to Japan?'] },
    0, '🇯🇵', EN('"Have you ever been to Japan?" — "Been" is the past participle of "be". "Ever" goes between have and the past participle in questions.')),

  q('pp-09', 'eso', EN('What is the past participle of "write"?'),
    { es: ['writed', 'wrote', 'written', 'writing'], en: ['writed', 'wrote', 'written', 'writing'], ca: ['writed', 'wrote', 'written', 'writing'] },
    2, '✍️', EN('Write → wrote (past simple) → written (past participle). Other -en participles: break→broken, drive→driven, speak→spoken.')),

  q('pp-10', 'eso', EN('"She ___ already ___ (finish) the exam." Choose correctly.'),
    { es: ['She already has finished the exam.', 'She has finished already the exam.', 'She has already finished the exam.', 'She already finished the exam.'], en: ['She already has finished the exam.', 'She has finished already the exam.', 'She has already finished the exam.', 'She already finished the exam.'], ca: ['She already has finished the exam.', 'She has finished already the exam.', 'She has already finished the exam.', 'She already finished the exam.'] },
    2, '✅', EN('"Already" goes between have/has and the past participle: "She has already finished." In affirmative sentences, already signals something happened sooner than expected.')),

  q('pp-11', 'eso', EN('Complete: "I ___ (not / see) that film yet."'),
    { es: ["I haven't seen that film yet.", "I didn't see that film yet.", "I haven't saw that film yet.", "I don't see that film yet."], en: ["I haven't seen that film yet.", "I didn't see that film yet.", "I haven't saw that film yet.", "I don't see that film yet."], ca: ["I haven't seen that film yet.", "I didn't see that film yet.", "I haven't saw that film yet.", "I don't see that film yet."] },
    0, '🎥', EN('"Yet" is used in present perfect negatives/questions. "I haven\'t seen it yet." — note: past participle "seen", not "saw".')),

  q('pp-12', 'eso', EN('Which is NOT a present perfect signal word?'),
    { es: ['already', 'just', 'last year', 'ever'], en: ['already', 'just', 'last year', 'ever'], ca: ['already', 'just', 'last year', 'ever'] },
    2, '⚠️', EN('"Last year" is a specific finished past time → use past simple. Already/just/ever/never/yet/since/for all work with present perfect.')),

  q('pp-13', 'eso', EN('"How long ___ you ___ (know) her?"'),
    { es: ['How long do you know her?', 'How long have you known her?', 'How long did you knew her?', 'How long have you knew her?'], en: ['How long do you know her?', 'How long have you known her?', 'How long did you knew her?', 'How long have you knew her?'], ca: ['How long do you know her?', 'How long have you known her?', 'How long did you knew her?', 'How long have you knew her?'] },
    1, '👫', EN('"How long have you known her?" — "known" is the past participle of "know". Use present perfect with "how long" for states that started in the past and continue now.')),

  q('pp-14', 'eso', EN('What is the past participle of "go"?'),
    { es: ['gone', 'went', 'goed', 'going'], en: ['gone', 'went', 'goed', 'going'], ca: ['gone', 'went', 'goed', 'going'] },
    0, '🚀', EN('"Go" → went (past simple) → gone (past participle). "She has gone to Paris." Note: "been" (from "be" or "go") means returned: "She has been to Paris" = she visited and came back.')),

  q('pp-15', 'eso', EN('Complete: "They ___ (live) here since they were children."'),
    { es: ['They lived here since they were children.', 'They have lived here since they were children.', 'They are living here since they were children.', 'They live here since they were children.'], en: ['They lived here since they were children.', 'They have lived here since they were children.', 'They are living here since they were children.', 'They live here since they were children.'], ca: ['They lived here since they were children.', 'They have lived here since they were children.', 'They are living here since they were children.', 'They live here since they were children.'] },
    1, '🏘️', EN('"Since" + past time with present perfect shows an action/state that started in the past and continues now. "They have lived here since they were children."')),

  q('pp-17', 'primaria', EN("Complete: \"She ___ finished her homework.\""),
    O(["have","has","is","did"]),
    1, '✅', EN("With he/she/it it is \"has\"; with I/you/we/they, \"have\".")),

  q('pp-18', 'primaria', EN("Which word goes with the present perfect?"),
    O(["yesterday","last year","already","in 2010"]),
    2, '⏳', EN("already, yet, just, ever and never belong to the present perfect. Yesterday, last year and in 2010 are finished time → past simple.")),

  q('pp-19', 'primaria', EN("Complete: \"I ___ never been to Japan.\""),
    O(["have","has","am","did"]),
    0, '🗾', EN("With \"I\" the auxiliary is \"have\". \"Never\" is the clue: it talks about experience up to today, with no date.")),

  q('pp-21', 'primaria', EN("Complete: \"They ___ just arrived.\""),
    O(["have","has","are","were"]),
    0, '🛬', EN("\"They\" takes \"have\". And \"just\" means it happened a moment ago and still counts now.")),

  q('pp-22', 'primaria', EN("Which sentence is correct?"),
    O(["I have saw that film.","I have seen that film.","I have see that film.","I has seen that film."]),
    1, '🎥', EN("see → saw (past) → seen (participle). After have/has comes the participle: \"have seen\".")),

  q('pp-23', 'primaria', EN("Complete the question: \"___ you ever eaten sushi?\""),
    O(["Have","Has","Did","Are"]),
    0, '🍣', EN("Questions with \"ever\" ask about experience → present perfect. With \"you\", the auxiliary is \"have\".")),

  q('pp-24', 'eso', EN("\"She has gone to Paris\" means…"),
    O(["She is in Paris now","She visited Paris and came back","She will go to Paris","She lives in Paris"]),
    0, '🗼', EN("\"Has gone to\" = went and is still there. \"Has been to\" = went and is back. They are not interchangeable.")),

  q('pp-25', 'eso', EN("Which sentence is WRONG?"),
    O(["I have lived here since 2010.","I have lived here for ten years.","I have seen him yesterday.","I have already eaten."]),
    2, '❌', EN("With a finished, specific moment (yesterday) you use the past simple: \"I saw him yesterday\". The present perfect does not take a closed date.")),
  q('pp-40', 'primaria', EN('Complete: "He ___ lived here for ten years."'),
    O(['have', 'has', 'is', 'had']),
    1, '🏘️',
    EN('"He" takes "has"; I/you/we/they take "have". It is the only place the present perfect changes with the person — the participle stays the same for everyone.')),
  q('pp-41', 'primaria', EN('What is the past participle of "eat"?'),
    O(['ate', 'eaten', 'eated', 'eating']),
    1, '🍽️',
    EN('Eat → ate → eaten. The three forms matter: "ate" is the past simple (I ate) and "eaten" the participle (I have eaten). Mixing them up — "I have ate" — is the classic slip.')),
  q('pp-42', 'primaria', EN('Which time word goes with the present perfect?'),
    O(['yesterday', 'ever', 'last week', 'in 1990']),
    1, '⏳',
    EN('Ever, never, already, yet, just and since all point to time that is still open. The other three are finished times, and finished time always takes the past simple instead.')),
  q('pp-43', 'primaria', EN('Where does "yet" go in a sentence?'),
    O(['At the beginning', 'At the end, in questions and negatives', 'Right after the subject', 'It can go anywhere']),
    1, '🔚',
    EN('"Have you finished yet?" / "I haven\'t finished yet." It goes at the end and only in questions and negatives. Its positive partner is "already", which goes in the middle: "I have already finished."')),
  q('pp-44', 'primaria', EN('Complete: "I have known her ___ 2010."'),
    O(['for', 'since', 'from', 'during']),
    1, '📆',
    EN('"Since" marks the point when it started (since 2010, since Monday) and "for" the length (for ten years, for a week). It is the difference between a moment on the calendar and a stretch of time.')),
  q('pp-45', 'primaria', EN('Complete: "We have lived here ___ five years."'),
    O(['since', 'for', 'ago', 'from']),
    1, '📏',
    EN('"Five years" is a length, so it takes "for". Quick test: if what follows is a date or an event, use since; if it is an amount of time, use for.')),
  q('pp-46', 'primaria', EN('What does "I have lost my keys" tell you?'),
    O(['I lost them and then found them', 'I lost them and I still do not have them', 'I will lose them', 'Someone else lost them']),
    1, '🔑',
    EN('The present perfect links a past action to NOW: the loss happened before, but the problem is present. That is why "I have lost my keys" means you still cannot get in.')),
  q('pp-47', 'primaria', EN('Which sentence is correct?'),
    O(['I have seen him yesterday.', 'I saw him yesterday.', 'I have saw him yesterday.', 'I has seen him yesterday.']),
    1, '👋',
    EN('"Yesterday" is a finished time, so it needs the past simple: I saw him. The present perfect never goes with a finished time expression, however recent it is.')),
  q('pp-48', 'primaria', EN('What is the past participle of "do"?'),
    O(['did', 'done', 'doed', 'doing']),
    1, '✅',
    EN('Do → did → done. "Did" is the past simple (I did it) and "done" the participle (I have done it). Same pattern as go → went → gone and see → saw → seen.')),
  q('pp-49', 'primaria', EN('Complete: "She ___ never been to London."'),
    O(['have', 'has', 'is', 'did']),
    1, '🗼',
    EN('"She" takes "has", and "never" slots between the auxiliary and the participle: has never been. Never already makes the sentence negative, so you do not add "not" as well.')),
  q('pp-50', 'primaria', EN('Complete the question: "How long ___ you lived here?"'),
    O(['do', 'did', 'have', 'are']),
    2, '🏠',
    EN('"How long" asks about something that started in the past and continues now, which is exactly what the present perfect is for: How long have you lived here? — and you answer with for or since.')),
  q('pp-51', 'primaria', EN('What is the past participle of "be"?'),
    O(['was', 'were', 'been', 'being']),
    2, '🔵',
    EN('Be → was/were → been. "Been" only appears with have: I have been to Paris. Do not confuse it with "being", which is the -ing form and never follows have on its own.')),
  q('pp-52', 'primaria', EN('What is the difference between "I have been to Paris" and "I have gone to Paris"?'),
    O(['They mean the same', 'Been means I went and came back; gone means I am still there', 'Gone means I came back', 'Been is incorrect English']),
    1, '🗼',
    EN('"Been" is a completed round trip: I went and I am back. "Gone" means the person left and has not returned, so you cannot say it about yourself while you are here.')),
  q('pp-53', 'primaria', EN('Complete: "They ___ finished their homework already."'),
    O(['has', 'have', 'is', 'was']),
    1, '📝',
    EN('"They" is plural, so it takes "have". And "already" sits between the auxiliary and the participle: have already finished — never at the very end, which is where "yet" goes.')),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(q => q.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
