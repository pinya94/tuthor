// English grammar · Conditionals & wishes (ESO y Bachillerato). Como en el
// resto de exámenes de inglés, enunciados, opciones y explicaciones van en
// inglés en los tres idiomas de la interfaz: es lo que se examina.
//
// Una sola respuesta válida por pregunta: nunca dos opciones que un nativo
// aceptaría (p. ej. «would live» y «would be living» no salen juntas).
// La buena va la PRIMERA; ExamenMC baraja el orden.
const EN = s => ({ es: s, en: s, ca: s })
function q(id, nivel, emoji, pregunta, opciones, explicacion) {
  const o = { es: opciones, en: opciones, ca: opciones }
  return { id, nivel, emoji, pregunta: EN(pregunta), opciones: o, correcta: EN(opciones[0]), explicacion: EN(explicacion) }
}

const TODAS = [
  // ── ESO ──
  q('cd-01', 'eso', '❄️', 'If you heat ice, it ___.', ['melts', 'melted', 'would melt', 'melting'],
    'Zero conditional (general truths): If + present simple, present simple. Heating ice always makes it melt.'),
  q('cd-02', 'eso', '🌧️', 'If it rains tomorrow, we ___ at home.', ['will stay', 'would stay', 'stayed', 'would have stayed'],
    'First conditional (a real possibility in the future): If + present simple, will + base verb.'),
  q('cd-03', 'eso', '📚', 'If you ___ hard, you will pass the exam.', ['study', 'will study', 'studied', 'would study'],
    'In the if-clause of a first conditional we use the present simple, never "will": "If you study…", not "If you will study…".'),
  q('cd-04', 'eso', '💶', 'If I ___ a million euros, I would travel round the world.', ['had', 'have', 'will have', 'would have'],
    'Second conditional (imaginary situations now): If + past simple, would + base verb. "Had" is past, but the meaning is present and unreal.'),
  q('cd-05', 'eso', '🤔', 'If I were you, I ___ that.', ['wouldn’t do', 'won’t do', 'didn’t do', 'don’t do'],
    '"If I were you" introduces advice with the second conditional, so the main clause takes would/wouldn’t + base verb.'),
  q('cd-06', 'eso', '🎩', 'Which is the correct way to give advice in formal English?', ['If I were you, I’d apologise.', 'If I am you, I’d apologise.', 'If I will be you, I’d apologise.', 'If I be you, I’d apologise.'],
    'In the second conditional, "were" is used for all persons in formal English: "If I were you…". (In informal speech you also hear "If I was…".)'),
  q('cd-07', 'eso', '📝', 'If she had studied, she ___ the exam.', ['would have passed', 'would pass', 'will pass', 'had passed'],
    'Third conditional (an unreal past): If + past perfect, would have + past participle. She didn’t study, so she didn’t pass.'),
  q('cd-08', 'eso', '🚆', 'If we ___ earlier, we wouldn’t have missed the train.', ['had left', 'left', 'would leave', 'have left'],
    'Third conditional: the if-clause takes the past perfect (had + past participle). We didn’t leave early, so we missed the train.'),
  q('cd-09', 'eso', '🕊️', '"If I had wings, I would fly." What type of conditional is it?', ['Second conditional', 'First conditional', 'Third conditional', 'Zero conditional'],
    'Past simple + would + base verb = second conditional: an imaginary situation in the present (I don’t have wings).'),
  q('cd-10', 'eso', '🎨', '"If you mix red and blue, you get purple." What type of conditional is it?', ['Zero conditional', 'First conditional', 'Second conditional', 'Third conditional'],
    'Present simple in both clauses = zero conditional: something that is always true.'),
  q('cd-11', 'eso', '⏰', '"Unless you hurry, you will be late." This means…', ['If you don’t hurry, you will be late.', 'If you hurry, you will be late.', 'Because you hurry, you will be late.', 'Although you hurry, you will be late.'],
    '"Unless" means "if… not": unless you hurry = if you don’t hurry.'),
  q('cd-12', 'eso', '📞', 'I will call you when I ___ home.', ['get', 'will get', 'got', 'would get'],
    'After time words like when, as soon as, before or until, we use the present simple for the future, just as in the if-clause.'),
  q('cd-13', 'eso', '☀️', 'Which sentence is a first conditional?', ['If it’s sunny, we’ll go to the beach.', 'If it were sunny, we’d go to the beach.', 'If it had been sunny, we’d have gone to the beach.', 'If it’s sunny, we always go to the beach.'],
    'First conditional = If + present simple, will + base verb: a real future possibility. The last one is a zero conditional (a habit).'),
  q('cd-14', 'eso', '👻', 'What would you do if you ___ a ghost?', ['saw', 'see', 'will see', 'had seen'],
    'The main clause has "would do", so this is a second conditional and the if-clause needs the past simple: "if you saw a ghost".'),

  // ── Bachillerato ──
  q('cd-15', 'bachillerato', '🏙️', 'If I had taken that job, I ___ in London now.', ['would be living', 'will be living', 'would have lived', 'had lived'],
    'Mixed conditional: a past condition (had taken) with a present result (now) → would + base verb (here, continuous: would be living).'),
  q('cd-16', 'bachillerato', '🎉', 'If she weren’t so shy, she ___ to the party last night.', ['would have gone', 'would go', 'will go', 'went'],
    'Mixed conditional the other way round: a present situation (she is shy) with a past result (last night) → would have + past participle.'),
  q('cd-17', 'bachillerato', '🔁', '"Had I known, I would have told you." This is the same as…', ['If I had known, I would have told you.', 'If I knew, I would tell you.', 'When I knew, I told you.', 'Because I knew, I told you.'],
    'Inversion in formal English: "Had I known…" = "If I had known…" (third conditional without "if").'),
  q('cd-18', 'bachillerato', '🆘', '"Should you need any help, call me." This means…', ['If you need any help, call me.', 'You should need help.', 'You must call me.', 'If you needed help, you called me.'],
    'Formal inversion with "should": "Should you need…" = "If you need…" (first conditional, slightly more tentative).'),
  q('cd-19', 'bachillerato', '📏', 'I wish I ___ taller.', ['were', 'am', 'will be', 'have been'],
    'Wishes about the present take the past simple (or "were"): "I wish I were taller" — I am not tall, and I would like to be.'),
  q('cd-20', 'bachillerato', '🎈', 'I wish I ___ to the party yesterday.', ['had gone', 'went', 'would go', 'have gone'],
    'Regrets about the past take the past perfect: "I wish I had gone" — I didn’t go, and now I’m sorry.'),
  q('cd-21', 'bachillerato', '✅', '"You can go out provided that you finish your homework." This means you can go out…', ['only if you finish your homework', 'even if you don’t finish your homework', 'because you have finished your homework', 'before you finish your homework'],
    '"Provided (that)", "providing" and "as long as" mean "only if": they set a condition.'),
  q('cd-22', 'bachillerato', '⌛', 'If only I ___ more time!', ['had', 'have', 'will have', 'having'],
    '"If only" works like "I wish" but stronger. For the present, it takes the past simple: "If only I had more time (now)".'),
  q('cd-23', 'bachillerato', '🤝', '"But for your help, I would have failed." This means…', ['If it hadn’t been for your help, I would have failed.', 'Because of your help, I failed.', 'Although you helped me, I failed.', 'Without failing, I helped you.'],
    '"But for" = "if it hadn’t been for / without": your help is the only reason I didn’t fail.'),
  q('cd-24', 'bachillerato', '🏠', 'It’s late. It’s time we ___ home.', ['went', 'go', 'will go', 'have gone'],
    '"It’s (high) time + subject + past simple" says something should already be happening: "It’s time we went home". (Without a subject: "It’s time to go".)'),
]

export const PREGUNTAS_ESO = TODAS.filter(p => p.nivel === 'eso')
export const PREGUNTAS_BACH = TODAS
export { TODAS as PREGUNTAS }
