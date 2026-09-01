const EN = s => ({ es: s, en: s, ca: s })
// Opciones iguales en los tres idiomas: en un examen de inglés las respuestas
// SON inglés, así que no se traducen. Evita repetir el mismo array tres veces.
const O = a => ({ es: a, en: a, ca: a })
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const TODAS = [
  q('pv-01', 'primaria', EN('How is the passive voice formed?'),
    { es: ['have + past participle', 'be + past participle', 'do + infinitive', 'will + base verb'], en: ['have + past participle', 'be + past participle', 'do + infinitive', 'will + base verb'], ca: ['have + past participle', 'be + past participle', 'do + infinitive', 'will + base verb'] },
    1, '⚙️', EN('Passive = subject + be (in the right tense) + past participle. "The book is written." "The cake was eaten." Be changes tense; the participle stays the same.')),

  q('pv-02', 'primaria', EN('Change to passive: "Someone cleans the office every day."'),
    { es: ['The office is being cleaned every day.', 'The office is cleaned every day.', 'The office cleans every day.', 'The office was cleaned every day.'], en: ['The office is being cleaned every day.', 'The office is cleaned every day.', 'The office cleans every day.', 'The office was cleaned every day.'], ca: ['The office is being cleaned every day.', 'The office is cleaned every day.', 'The office cleans every day.', 'The office was cleaned every day.'] },
    1, '🏢', EN('Present simple passive: is/are + past participle. "The office is cleaned every day." We drop "someone" because the agent is not important.')),

  q('pv-03', 'primaria', EN('Change to passive: "They built this bridge in 1901."'),
    { es: ['This bridge built in 1901.', 'This bridge is built in 1901.', 'This bridge was built in 1901.', 'This bridge were built in 1901.'], en: ['This bridge built in 1901.', 'This bridge is built in 1901.', 'This bridge was built in 1901.', 'This bridge were built in 1901.'], ca: ['This bridge built in 1901.', 'This bridge is built in 1901.', 'This bridge was built in 1901.', 'This bridge were built in 1901.'] },
    2, '🌉', EN('Past simple passive: was/were + past participle. "Bridge" is singular → "was". "Built" is the past participle of "build".')),

  q('pv-04', 'primaria', EN('Which sentence is passive?'),
    { es: ['The dog bit the man.', 'The man was bitten by the dog.', 'The dog is biting the man.', 'The man bit the dog.'], en: ['The dog bit the man.', 'The man was bitten by the dog.', 'The dog is biting the man.', 'The man bit the dog.'], ca: ['The dog bit the man.', 'The man was bitten by the dog.', 'The dog is biting the man.', 'The man bit the dog.'] },
    1, '🐕', EN('"The man was bitten by the dog." — passive structure: subject + was + past participle (bitten) + by + agent (the dog).')),

  q('pv-05', 'eso', EN('Change to passive: "They have cancelled the concert."'),
    { es: ['The concert has been cancelled.', 'The concert was cancelled.', 'The concert is cancelled.', 'The concert has cancelled.'], en: ['The concert has been cancelled.', 'The concert was cancelled.', 'The concert is cancelled.', 'The concert has cancelled.'], ca: ['The concert has been cancelled.', 'The concert was cancelled.', 'The concert is cancelled.', 'The concert has cancelled.'] },
    0, '🎤', EN('Present perfect passive: have/has + been + past participle. "The concert has been cancelled." "Been" is always needed between have/has and the main participle.')),

  q('pv-06', 'eso', EN('Change to passive: "They will send the package tomorrow."'),
    { es: ['The package will be send tomorrow.', 'The package will be sent tomorrow.', 'The package is sent tomorrow.', 'The package will sent tomorrow.'], en: ['The package will be send tomorrow.', 'The package will be sent tomorrow.', 'The package is sent tomorrow.', 'The package will sent tomorrow.'], ca: ['The package will be send tomorrow.', 'The package will be sent tomorrow.', 'The package is sent tomorrow.', 'The package will sent tomorrow.'] },
    1, '📦', EN('Future passive: will + be + past participle. "The package will be sent tomorrow." "Send" → past participle = "sent".')),

  q('pv-07', 'eso', EN('When is the passive most useful?'),
    { es: ['When the agent is important and known', 'When the agent is unknown, unimportant or obvious', 'Only in formal writing', 'Only in questions'], en: ['When the agent is important and known', 'When the agent is unknown, unimportant or obvious', 'Only in formal writing', 'Only in questions'], ca: ['When the agent is important and known', 'When the agent is unknown, unimportant or obvious', 'Only in formal writing', 'Only in questions'] },
    1, '🔍', EN('Use passive when: the agent is unknown ("My bike was stolen"), unimportant ("The road is repaired every year"), or when we want to focus on the action, not the doer.')),

  q('pv-08', 'eso', EN('"The thief ___ (arrest) by the police." Choose correctly.'),
    { es: ['The thief is arrested by the police.', 'The thief was arrested by the police.', 'The thief arrested by the police.', 'The thief were arrested by the police.'], en: ['The thief is arrested by the police.', 'The thief was arrested by the police.', 'The thief arrested by the police.', 'The thief were arrested by the police.'], ca: ['The thief is arrested by the police.', 'The thief was arrested by the police.', 'The thief arrested by the police.', 'The thief were arrested by the police.'] },
    1, '👮', EN('"The thief was arrested by the police." Past simple passive + by + agent. "Thief" is singular → "was".')),

  q('pv-09', 'eso', EN('What is the past participle of "write"?'),
    { es: ['wrote', 'written', 'writed', 'writing'], en: ['wrote', 'written', 'writed', 'writing'], ca: ['wrote', 'written', 'writed', 'writing'] },
    1, '✍️', EN('"Write" → wrote (past simple) → written (past participle). "This letter was written by Shakespeare." Always use the past participle, not the past simple, in passives.')),

  q('pv-10', 'eso', EN('Make this passive sentence active: "The windows are cleaned by Maria."'),
    { es: ['Maria cleans the windows.', 'Maria cleaned the windows.', 'Maria is cleaning the windows.', 'The windows clean Maria.'], en: ['Maria cleans the windows.', 'Maria cleaned the windows.', 'Maria is cleaning the windows.', 'The windows clean Maria.'], ca: ['Maria cleans the windows.', 'Maria cleaned the windows.', 'Maria is cleaning the windows.', 'The windows clean Maria.'] },
    0, '🖼️', EN('Active: Maria (subject) + cleans (present simple) + the windows (object). The "by + agent" becomes the subject in the active sentence.')),

  q('pv-11', 'eso', EN('"English ___ all over the world." Choose correctly.'),
    { es: ['speaks', 'is spoken', 'is speaking', 'has spoken'], en: ['speaks', 'is spoken', 'is speaking', 'has spoken'], ca: ['speaks', 'is spoken', 'is speaking', 'has spoken'] },
    1, '🌍', EN('"English is spoken all over the world." Present simple passive. The agent (people) is omitted because it is obvious and unimportant.')),

  q('pv-12', 'eso', EN('Choose the passive modal: "This rule ___ (must / follow)."'),
    { es: ['This rule must followed.', 'This rule must be followed.', 'This rule is must followed.', 'This rule must being followed.'], en: ['This rule must followed.', 'This rule must be followed.', 'This rule is must followed.', 'This rule must being followed.'], ca: ['This rule must followed.', 'This rule must be followed.', 'This rule is must followed.', 'This rule must being followed.'] },
    1, '📋', EN('Modal passive: modal + be + past participle. "This rule must be followed." Same pattern with: can be done, should be checked, might be cancelled.')),

  q('pv-13', 'eso', EN('Change to passive: "They are building a new hospital."'),
    { es: ['A new hospital is built.', 'A new hospital was being built.', 'A new hospital is being built.', 'A new hospital has been built.'], en: ['A new hospital is built.', 'A new hospital was being built.', 'A new hospital is being built.', 'A new hospital has been built.'], ca: ['A new hospital is built.', 'A new hospital was being built.', 'A new hospital is being built.', 'A new hospital has been built.'] },
    2, '🏥', EN('Present continuous passive: is/are + being + past participle. "A new hospital is being built." The continuous aspect is preserved with "being".')),

  q('pv-14', 'eso', EN('"Two people ___ (injure) in the accident." Choose correctly.'),
    { es: ['Two people was injured in the accident.', 'Two people were injured in the accident.', 'Two people injured in the accident.', 'Two people are injured in the accident.'], en: ['Two people was injured in the accident.', 'Two people were injured in the accident.', 'Two people injured in the accident.', 'Two people are injured in the accident.'], ca: ['Two people was injured in the accident.', 'Two people were injured in the accident.', 'Two people injured in the accident.', 'Two people are injured in the accident.'] },
    1, '🚑', EN('"Two people were injured" — plural subject → "were". Past simple passive. News and reports often use passive to describe events.')),

  q('pv-15', 'eso', EN('Which sentence correctly uses "by" in the passive?'),
    { es: ["This book was written by me.", "This book was written by I.", "This book is written by Shakespeare yesterday.", "This book was written from Shakespeare."], en: ["This book was written by me.", "This book was written by I.", "This book is written by Shakespeare yesterday.", "This book was written from Shakespeare."], ca: ["This book was written by me.", "This book was written by I.", "This book is written by Shakespeare yesterday.", "This book was written from Shakespeare."] },
    0, '📘', EN('"By" + object pronoun in passive: by me/him/her/us/them. Never "by I/he/she/we/they". "By" introduces the agent in passive sentences.')),

  q('pv-16', 'primaria', EN('Which sentence is passive?'),
    O(['The dog chased the cat.', 'The cat was chased by the dog.', 'The cat chased the dog.', 'The dog is chasing.']),
    1, '🐈', EN('In a passive sentence the subject RECEIVES the action. "The cat was chased" — the cat does not chase, it is chased.')),

  q('pv-17', 'primaria', EN('Complete: "English ___ in many countries."'),
    O(['is spoken', 'speaks', 'is speaking', 'spoke']),
    0, '🌍', EN('English does not speak; it IS spoken. Present simple passive = is/are + past participle.')),

  q('pv-18', 'primaria', EN('Change to passive: "They built this house in 1990."'),
    O(['This house built in 1990.', 'This house was built in 1990.', 'This house is built in 1990.', 'This house has built in 1990.']),
    1, '🏠', EN('Past simple passive = was/were + past participle. "In 1990" is finished time, so it is "was built", not "is built".')),

  q('pv-19', 'primaria', EN('Complete: "The letters ___ yesterday."'),
    O(['was sent', 'were sent', 'are sent', 'sent']),
    1, '✉️', EN('"Letters" is plural, so "be" goes plural too: were. The participle "sent" never changes.')),

  q('pv-20', 'primaria', EN('What does "by" introduce in a passive sentence?'),
    O(['The time of the action', 'The person or thing doing the action', 'The place', 'The object']),
    1, '👤', EN('"By" introduces the agent — who or what does the action: "written BY Shakespeare", "broken BY the storm".')),

  q('pv-21', 'primaria', EN('Complete: "The windows ___ every week."'),
    O(['is cleaned', 'are cleaned', 'clean', 'were cleaning']),
    1, '🏢', EN('"Windows" is plural → are. "Every week" is a routine → present simple passive.')),

  q('pv-22', 'primaria', EN('Which is the past participle of "write"?'),
    O(['wrote', 'written', 'writing', 'writed']),
    1, '✍️', EN('write → wrote (past) → written (participle). The passive always takes the PARTICIPLE: "was written", never "was wrote".')),

  q('pv-23', 'primaria', EN('Complete: "This song ___ by millions of people."'),
    O(['is loved', 'are loved', 'loves', 'loving']),
    0, '🎵', EN('"This song" is singular → is. The song does not love anyone; it is loved.')),

  q('pv-24', 'primaria', EN('Change to passive: "The teacher checks the homework."'),
    O(['The homework is checked.', 'The homework checks.', 'The homework was checked.', 'The homework checking.']),
    0, '📝', EN('The object ("the homework") becomes the subject, and the verb goes to be + participle in the same tense: checks → is checked.')),

  q('pv-25', 'primaria', EN('In a passive sentence, which word carries the tense?'),
    O(['The past participle', 'The verb "be"', 'The subject', 'The word "by"']),
    1, '⏱️', EN('"Be" is what moves: is built (now), was built (before), will be built (later). The participle stays exactly the same.')),

  q('pv-26', 'eso', EN('Passive of "They will announce the results tomorrow."'),
    O(['The results will announced tomorrow.', 'The results will be announced tomorrow.', 'The results are announced tomorrow.', 'The results will being announced.']),
    1, '📢', EN('Future passive = will + BE + participle. After "will", "be" always stays in its base form.')),

  q('pv-27', 'eso', EN('Which of these sentences CANNOT be made passive?'),
    O(['She wrote a letter.', 'They arrived late.', 'He built a house.', 'We ate the cake.']),
    1, '🚫', EN('Only verbs with an object can go passive: the object becomes the subject. "Arrive" has no object (it is intransitive), so there is nothing to promote.')),

  q('pv-28', 'eso', EN('Passive of "Someone has stolen my bike."'),
    O(['My bike has stolen.', 'My bike has been stolen.', 'My bike is stolen by someone.', 'My bike was stealing.']),
    1, '🚲', EN('Present perfect passive = has/have + BEEN + participle. And "by someone" is dropped: an unknown agent adds nothing.')),

  q('pv-29', 'eso', EN('When do we usually leave out "by + agent"?'),
    O(['Always', 'When the agent is unknown or does not matter', 'When the sentence is long', 'When the verb is irregular']),
    1, '🤷', EN('That is the whole point of the passive: "My wallet was stolen" — we do not know by whom, and it does not matter. You add "by" only when it tells you something.')),

  q('pv-30', 'eso', EN('Passive of "They gave Anna a prize", with Anna as the subject.'),
    O(['Anna was given a prize.', 'A prize was given Anna.', 'Anna gave a prize.', 'Anna is giving a prize.']),
    0, '🏆', EN('Verbs with two objects (give, send, offer, tell) have two passives, and English prefers the person: "Anna was given a prize".')),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(q => q.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
