// English grammar · Modal verbs (Primaria y ESO). Enunciados, opciones y
// explicaciones en inglés en los tres idiomas: es lo que se examina.
//
// Los modales se solapan mucho (may/might/could para la posibilidad,
// must/have to para la obligación, would/used to para hábitos pasados). En
// cada pregunta solo hay UNA opción válida: las otras formas que también
// valdrían no se ponen como distractor, y el enunciado precisa el sentido
// cuando hace falta («asking for permission», «you’re not sure»).
// La buena va la PRIMERA; ExamenMC baraja el orden.
const EN = s => ({ es: s, en: s, ca: s })
function q(id, nivel, emoji, pregunta, opciones, explicacion) {
  const o = { es: opciones, en: opciones, ca: opciones }
  return { id, nivel, emoji, pregunta: EN(pregunta), opciones: o, correcta: EN(opciones[0]), explicacion: EN(explicacion) }
}

const TODAS = [
  // ── Primaria ──
  q('md-01', 'primaria', '⛑️', 'You ___ wear a helmet on a motorbike. It’s the law.', ['must', 'may', 'might', 'could'],
    '"Must" expresses obligation. "May" and "might" are for possibility and "could" for ability or possibility.'),
  q('md-02', 'primaria', '🚻', 'Asking for permission: "___ I go to the toilet, please?"', ['Can', 'Must', 'Have', 'Will'],
    '"Can I…?" asks for permission. "Must I…?" asks if something is obligatory.'),
  q('md-03', 'primaria', '🗣️', 'She ___ three languages.', ['can speak', 'cans speak', 'can to speak', 'can speaks'],
    'Modal verbs never take -s, and the next verb is the base form without "to": she can speak.'),
  q('md-04', 'primaria', '📐', 'After a modal verb (can, must, should…), we use…', ['the base form of the verb, without "to"', 'the -ing form', 'the past participle', '"to" + the base form'],
    '"You should go", "I can swim", "We must listen". The exceptions are "ought to" and "have to", which carry "to".'),
  q('md-05', 'primaria', '🚫', 'What is the negative of "I can swim"?', ['I can’t swim.', 'I don’t can swim.', 'I not can swim.', 'I can not to swim.'],
    'Modals make the negative by adding "not" directly: cannot / can’t. They never use do/does.'),
  q('md-06', 'primaria', '🍬', 'Giving advice: "You ___ eat so many sweets. They’re bad for your teeth."', ['shouldn’t', 'couldn’t', 'needn’t', 'wouldn’t'],
    '"Should / shouldn’t" give advice. "Needn’t" means it isn’t necessary, which is a different idea.'),
  q('md-07', 'primaria', '🏊', 'When I was five, I ___ swim.', ['could', 'can', 'must', 'should'],
    '"Could" is the past of "can" for ability: when I was five, I was able to swim.'),
  q('md-08', 'primaria', '😴', 'You look tired. You ___ go to bed.', ['should', 'mustn’t', 'can’t', 'needn’t'],
    '"Should" gives advice: it’s a good idea to go to bed.'),
  q('md-09', 'primaria', '⛔', '"You mustn’t touch that." This means…', ['It is forbidden to touch it.', 'It isn’t necessary to touch it.', 'You are allowed to touch it.', 'It’s a good idea to touch it.'],
    '"Mustn’t" is a prohibition. Careful: "don’t have to" means something different — it isn’t necessary.'),
  q('md-10', 'primaria', '🆓', '"You don’t have to come." This means…', ['It isn’t necessary for you to come.', 'You are not allowed to come.', 'You must come.', 'You can’t come.'],
    '"Don’t have to" = no obligation: you can come if you want, but you don’t need to. "Mustn’t" would be a prohibition.'),

  // ── ESO ──
  q('md-11', 'eso', '🧥', 'He’s wearing a coat, a scarf and boots. It ___ be cold outside.', ['must', 'can’t', 'mustn’t', 'needn’t'],
    'Deduction: "must" = I’m almost sure it’s true because of the evidence.'),
  q('md-12', 'eso', '🗼', 'That ___ be Tom at the door — he’s in Paris this week.', ['can’t', 'must', 'mustn’t', 'should'],
    'Negative deduction: "can’t" = I’m sure it isn’t true. (Not "mustn’t", which is a prohibition.)'),
  q('md-13', 'eso', '☂️', 'Take an umbrella. It ___ rain later, but I’m not sure.', ['might', 'must', 'mustn’t', 'can’t'],
    '"Might" expresses possibility: perhaps it will rain. "Must" would mean you are sure.'),
  q('md-14', 'eso', '💧', 'The ground is wet. It ___ rained last night.', ['must have', 'must', 'can’t have', 'should'],
    'Deduction about the past: must have + past participle. The wet ground is the evidence.'),
  q('md-15', 'eso', '😤', 'You knew about the party and didn’t invite me! You ___ me.', ['should have told', 'must tell', 'could tell', 'should tell'],
    '"Should have + past participle" criticises something in the past that didn’t happen.'),
  q('md-16', 'eso', '🙏', 'A polite request: "___ you help me with this box, please?"', ['Could', 'Must', 'Should', 'Need'],
    '"Could you…?" is a polite request. "Must you…?" sounds like a complaint.'),
  q('md-17', 'eso', '⏰', 'Yesterday I ___ get up at six to catch the train.', ['had to', 'must', 'musted', 'have to'],
    '"Must" has no past form: for past obligation we use "had to".'),
  q('md-18', 'eso', '🚗', 'Next year I’ll be eighteen and I ___ drive.', ['will be able to', 'will can', 'can will', 'could'],
    '"Can" has no future form: we use "will be able to".'),
  q('md-19', 'eso', '🥛', '"You needn’t have bought milk — we had some." This means…', ['You bought milk, but it wasn’t necessary.', 'You didn’t buy milk, and that was fine.', 'You must buy milk.', 'You were not allowed to buy milk.'],
    '"Needn’t have + past participle": you did it, but it wasn’t necessary.'),
  q('md-20', 'eso', '📵', 'At our school we ___ use mobile phones in class.', ['aren’t allowed to', 'don’t allowed to', 'can’t to', 'mustn’t to'],
    '"Be allowed to" talks about permission given by rules: we aren’t allowed to. After "can’t" and "mustn’t" there is no "to".'),
  q('md-21', 'eso', '💊', '"You ought to see a doctor." This means…', ['It would be a good idea to see a doctor.', 'You are forbidden to see a doctor.', 'You were able to see a doctor.', 'It isn’t necessary to see a doctor.'],
    '"Ought to" gives advice, like "should".'),
  q('md-22', 'eso', '🚌', 'She’s late. Maybe she missed the bus — I’m not sure. She ___ missed the bus.', ['might have', 'must have', 'can’t have', 'should have'],
    '"Might have + past participle" = a possibility about the past. "Must have" would mean you are sure.'),
  q('md-23', 'eso', '⚽', 'When we were kids, we ___ play in the park every afternoon.', ['would', 'will', 'should', 'must'],
    '"Would" can describe repeated actions in the past, like "used to": we would play in the park every afternoon.'),
  q('md-24', 'eso', '🎒', 'Offering help: "___ I carry your bag?"', ['Shall', 'Must', 'Do', 'Will'],
    '"Shall I…?" is used to offer help or make a suggestion.'),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(p => p.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
export { TODAS as PREGUNTAS }
