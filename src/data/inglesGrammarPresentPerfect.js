const EN = s => ({ es: s, en: s, ca: s })
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
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(q => q.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
