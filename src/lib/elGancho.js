// El Gancho: la palabrita que engancha la frase. Sale una frase con un hueco
// y se responde con UN toque: o el relativo (who, which, where, whose, when…)
// o la coletilla de pregunta (isn't she?, didn't they?, shall we?…).
//
//   facil    3 botones · who / which / where y coletillas con be
//   medio    3 botones · whose / when, which ≠ where; coletillas con do, did,
//            can, will, have…
//   dificil  4 botones · relativos entre comas (nunca «that»), which que
//            recoge toda la frase, what; coletillas con I'm, let's, nobody,
//            never, there is, 'd better…
//
// Frases escritas a mano, en inglés británico. Regla de la casa: ninguna
// trampa puede ser algo que un libro aceptaría. Por eso:
//   · «that» solo es trampa en oraciones entre comas o donde no cabe (en las
//     especificativas también valdría: ahí no sale nunca como opción);
//   · nada de coletillas de la misma polaridad (She plays tennis, does she?
//     existe para mostrar sorpresa) ni de «is she not?» (formal pero válida);
//   · «whom» y «am I not?» nunca salen como trampa (son correctas).

export const TEMAS = ['relative-pronouns', 'question-tags']
export const OPCIONES = { facil: 3, medio: 3, dificil: 4 }
export const NIVELES = { facil: {}, medio: {}, dificil: {} }
const NIVEL_N = { facil: 1, medio: 2, dificil: 3 }

// R(nivel, regla, frase con ___, buena, 'trampa|trampa|trampa')
const R = (n, regla, frase, ok, trampas) => ({ n, regla, frase, ok, trampas: trampas.split('|') })

const RELATIVOS = [
  // ── fácil: who / which / where
  R(1, 'who', 'The woman ___ lives next door is a nurse.', 'who', 'which|where|what'),
  R(1, 'which', 'This is the cake ___ my dad made.', 'which', 'who|where|what'),
  R(1, 'where', 'That’s the park ___ we play football.', 'where', 'which|who|what'),
  R(1, 'who', 'I have a friend ___ speaks three languages.', 'who', 'which|where|what'),
  R(1, 'which', 'The bus ___ goes to my school is red.', 'which', 'who|where|what'),
  R(1, 'where', 'This is the shop ___ I buy my comics.', 'where', 'which|who|what'),
  R(1, 'who', 'The teacher ___ helped me is called Mr Jones.', 'who', 'which|where|what'),
  R(1, 'which', 'I’ve lost the book ___ you gave me.', 'which', 'who|where|what'),
  R(1, 'where', 'This is the house ___ my grandma lives.', 'where', 'which|who|what'),
  R(1, 'who', 'The boy ___ won the race is my cousin.', 'who', 'which|where|what'),
  R(1, 'which', 'Where is the pen ___ was on the table?', 'which', 'who|where|what'),
  R(1, 'where', 'Madrid is the city ___ I was born.', 'where', 'which|who|what'),
  R(1, 'who', 'She’s the singer ___ wrote this song.', 'who', 'which|where|what'),
  R(1, 'which', 'The film ___ we watched was really funny.', 'which', 'who|where|what'),
  R(1, 'where', 'This is the beach ___ we go every summer.', 'where', 'which|who|what'),
  R(1, 'who', 'The players ___ scored the goals were very happy.', 'who', 'which|where|what'),
  R(1, 'which', 'I like songs ___ make me want to dance.', 'which', 'who|where|what'),
  R(1, 'where', 'That’s the hospital ___ my mum works.', 'where', 'which|who|what'),
  R(1, 'who', 'The man ___ fixed my bike was very kind.', 'who', 'which|where|what'),
  R(1, 'which', 'Do you like the jumper ___ I bought?', 'which', 'who|where|what'),
  R(1, 'where', 'The kitchen is the room ___ we cook.', 'where', 'which|who|what'),
  R(1, 'who', 'People ___ read a lot know lots of words.', 'who', 'which|where|what'),

  // ── medio: whose, when, y la trampa which ↔ where
  R(2, 'whose', 'The girl ___ dog barks all night lives upstairs.', 'whose', 'who|who’s|which'),
  R(2, 'when', 'Summer is the season ___ we go on holiday.', 'when', 'where|which|who'),
  R(2, 'which-no-where', 'The museum ___ we visited was huge.', 'which', 'where|who|when'),
  R(2, 'where', 'The village ___ we stayed was very quiet.', 'where', 'which|when|who'),
  R(2, 'whose', 'I know a boy ___ mother is a firefighter.', 'whose', 'who|who’s|which'),
  R(2, 'when', 'Do you remember the day ___ we met?', 'when', 'where|which|who'),
  R(2, 'whose', 'That’s the man ___ car was stolen.', 'whose', 'who|who’s|which'),
  R(2, 'where', 'The restaurant ___ we had lunch was Italian.', 'where', 'which|when|what'),
  R(2, 'which-no-where', 'The restaurant ___ we booked was full.', 'which', 'where|what|when'),
  R(2, 'when', '2020 was the year ___ the schools closed.', 'when', 'where|which|who'),
  R(2, 'whose', 'The writer ___ books I love is coming to town.', 'whose', 'who|who’s|which'),
  R(2, 'where', 'The hotel ___ my parents work has a pool.', 'where', 'which|when|who'),
  R(2, 'which', 'The present ___ she chose was perfect.', 'which', 'what|where|who'),
  R(2, 'when', 'Monday is the day ___ I have maths.', 'when', 'where|which|who'),
  R(2, 'whose', 'Students ___ homework is late will stay in at break.', 'whose', 'who|who’s|which'),
  R(2, 'which', 'It’s a game ___ everyone can play.', 'which', 'what|where|who'),
  R(2, 'whose', 'I met a woman ___ son plays for Barcelona.', 'whose', 'who|who’s|which'),
  R(2, 'when', 'Do you remember the night ___ the lights went out?', 'when', 'where|which|who'),
  R(2, 'which-no-where', 'The app ___ I use to study is free.', 'which', 'what|where|who'),
  R(2, 'where', 'This is the town ___ my grandparents met.', 'where', 'which|when|what'),
  R(2, 'whose', 'He’s the actor ___ face is on every bus.', 'whose', 'who|who’s|which'),
  R(2, 'which-no-where', 'Valencia is a city ___ I’d love to visit.', 'which', 'where|who|when'),

  // ── difícil: entre comas (sin that), which = toda la frase, what
  R(3, 'nodef', 'My brother, ___ lives in Bristol, is a doctor.', 'who', 'that|which|whose'),
  R(3, 'nodef', 'Paris, ___ I visited last year, is beautiful.', 'which', 'that|where|who'),
  R(3, 'clause', 'He passed the exam, ___ surprised everyone.', 'which', 'that|what|who'),
  R(3, 'nodef', 'The car, ___ engine was broken, stayed in the garage.', 'whose', 'which|that|who’s'),
  R(3, 'nodef', 'Seville, ___ my cousins live, is very hot in summer.', 'where', 'which|that|who'),
  R(3, 'nodef', 'My phone, ___ I bought last month, has stopped working.', 'which', 'that|what|who'),
  R(3, 'nodef', 'Shakespeare, ___ plays are still performed, was born in 1564.', 'whose', 'who|that|which'),
  R(3, 'clause', 'She didn’t answer my message, ___ was a bit rude.', 'which', 'that|what|who'),
  R(3, 'nodef', 'Mr Smith, ___ we all love, is retiring.', 'who', 'that|which|whose'),
  R(3, 'whose', 'The house ___ roof is blue belongs to my aunt.', 'whose', 'which|who’s|that'),
  R(3, 'nodef', 'In 1969, ___ the first man walked on the Moon, my grandad was ten.', 'when', 'which|that|where'),
  R(3, 'nodef', 'The Thames, ___ flows through London, is 346 km long.', 'which', 'that|who|where'),
  R(3, 'clause', 'It started to rain, ___ meant we had to go home.', 'which', 'that|what|who'),
  R(3, 'nodef', 'My best friend, ___ parents are Irish, speaks perfect English.', 'whose', 'who|that|who’s'),
  R(3, 'nodef', 'The library, ___ I do my homework, closes at eight.', 'where', 'which|that|what'),
  R(3, 'what', 'That’s exactly ___ I wanted!', 'what', 'which|that|who'),
  R(3, 'what', 'I didn’t understand ___ she said.', 'what', 'which|that|who'),
  R(3, 'nodef', 'Our teacher, ___ is from Wales, plays the harp.', 'who', 'that|which|whose'),
  R(3, 'whose', 'The book ___ cover is torn is mine.', 'whose', 'which|who’s|that'),
  R(3, 'nodef', 'We went to Granada, ___ we saw the Alhambra.', 'where', 'which|that|when'),
  R(3, 'clause', 'He forgot my birthday, ___ made me sad.', 'which', 'that|what|who'),
  R(3, 'what', '___ I need now is a long holiday.', 'What', 'Which|That|Who'),
]

const COLETILLAS = [
  // ── fácil: be (presente y pasado)
  R(1, 'be', 'She is from Italy, ___', 'isn’t she?', 'aren’t she?|doesn’t she?|isn’t it?'),
  R(1, 'be', 'You are hungry, ___', 'aren’t you?', 'isn’t you?|don’t you?|aren’t they?'),
  R(1, 'be', 'It’s cold today, ___', 'isn’t it?', 'isn’t he?|doesn’t it?|aren’t it?'),
  R(1, 'be', 'They are your cousins, ___', 'aren’t they?', 'isn’t they?|don’t they?|aren’t them?'),
  R(1, 'neg', 'He isn’t at home, ___', 'is he?', 'isn’t he?|does he?|is him?'),
  R(1, 'be', 'We are late, ___', 'aren’t we?', 'isn’t we?|don’t we?|aren’t us?'),
  R(1, 'pron', 'Tom is your brother, ___', 'isn’t he?', 'isn’t Tom?|doesn’t he?|aren’t he?'),
  R(1, 'neg', 'The test wasn’t hard, ___', 'was it?', 'wasn’t it?|did it?|was he?'),
  R(1, 'neg', 'You aren’t tired, ___', 'are you?', 'aren’t you?|do you?|is you?'),
  R(1, 'pron', 'Anna and Leo are friends, ___', 'aren’t they?', 'isn’t they?|aren’t we?|don’t they?'),
  R(1, 'pron', 'This is your bag, ___', 'isn’t it?', 'isn’t this?|doesn’t it?|aren’t it?'),
  R(1, 'pron', 'The windows are open, ___', 'aren’t they?', 'isn’t it?|don’t they?|aren’t it?'),
  R(1, 'neg', 'She wasn’t at school yesterday, ___', 'was she?', 'wasn’t she?|did she?|were she?'),
  R(1, 'neg', 'It isn’t your birthday today, ___', 'is it?', 'isn’t it?|does it?|is he?'),
  R(1, 'be', 'They were at the party, ___', 'weren’t they?', 'wasn’t they?|didn’t they?|weren’t them?'),
  R(1, 'pron', 'Your dad is a pilot, ___', 'isn’t he?', 'isn’t your dad?|doesn’t he?|aren’t he?'),
  R(1, 'neg', 'We aren’t in the same class, ___', 'are we?', 'aren’t we?|do we?|are us?'),
  R(1, 'be', 'The pizza was great, ___', 'wasn’t it?', 'wasn’t she?|didn’t it?|weren’t it?'),
  R(1, 'pron', 'Lucy is very tall, ___', 'isn’t she?', 'isn’t Lucy?|doesn’t she?|aren’t she?'),
  R(1, 'be', 'You were right, ___', 'weren’t you?', 'wasn’t you?|didn’t you?|weren’t they?'),
  R(1, 'pron', 'Those shoes are new, ___', 'aren’t they?', 'isn’t it?|aren’t those?|don’t they?'),
  R(1, 'be', 'He was born in Seville, ___', 'wasn’t he?', 'didn’t he?|weren’t he?|wasn’t it?'),

  // ── medio: do / does / did y auxiliares
  R(2, 'do', 'She plays tennis, ___', 'doesn’t she?', 'isn’t she?|don’t she?|didn’t she?'),
  R(2, 'do', 'You like pizza, ___', 'don’t you?', 'aren’t you?|doesn’t you?|didn’t you?'),
  R(2, 'did', 'They went to Paris, ___', 'didn’t they?', 'don’t they?|weren’t they?|haven’t they?'),
  R(2, 'aux', 'He can swim, ___', 'can’t he?', 'doesn’t he?|couldn’t he?|isn’t he?'),
  R(2, 'aux', 'You’ve finished, ___', 'haven’t you?', 'didn’t you?|aren’t you?|hasn’t you?'),
  R(2, 'aux', 'It will rain later, ___', 'won’t it?', 'doesn’t it?|isn’t it?|wouldn’t it?'),
  R(2, 'neg', 'She doesn’t eat meat, ___', 'does she?', 'doesn’t she?|is she?|did she?'),
  R(2, 'neg', 'You didn’t call me, ___', 'did you?', 'didn’t you?|do you?|were you?'),
  R(2, 'aux', 'We should leave now, ___', 'shouldn’t we?', 'don’t we?|aren’t we?|wouldn’t we?'),
  R(2, 'neg', 'They can’t come, ___', 'can they?', 'can’t they?|do they?|could they?'),
  R(2, 'aux', 'Leo has got a cat, ___', 'hasn’t he?', 'doesn’t he?|isn’t he?|hasn’t Leo?'),
  R(2, 'do', 'Your sister lives in London, ___', 'doesn’t she?', 'isn’t she?|don’t she?|doesn’t he?'),
  R(2, 'neg', 'You won’t tell anyone, ___', 'will you?', 'won’t you?|do you?|would you?'),
  R(2, 'did', 'He broke the window, ___', 'didn’t he?', 'doesn’t he?|wasn’t he?|hasn’t he?'),
  R(2, 'neg', 'They haven’t arrived yet, ___', 'have they?', 'haven’t they?|did they?|are they?'),
  R(2, 'do', 'The film starts at eight, ___', 'doesn’t it?', 'isn’t it?|don’t it?|doesn’t she?'),
  R(2, 'aux', 'You can drive, ___', 'can’t you?', 'don’t you?|aren’t you?|couldn’t you?'),
  R(2, 'aux', 'She has been to Japan, ___', 'hasn’t she?', 'didn’t she?|isn’t she?|hasn’t it?'),
  R(2, 'neg', 'We don’t have homework today, ___', 'do we?', 'don’t we?|are we?|did we?'),
  R(2, 'did', 'Max studied hard, ___', 'didn’t he?', 'doesn’t he?|wasn’t he?|didn’t Max?'),
  R(2, 'neg', 'It won’t take long, ___', 'will it?', 'won’t it?|does it?|is it?'),
  R(2, 'aux', 'You’d like some tea, ___', 'wouldn’t you?', 'hadn’t you?|don’t you?|won’t you?'),

  // ── difícil: las excepciones
  R(3, 'im', 'I’m late, ___', 'aren’t I?', 'amn’t I?|isn’t I?|don’t I?'),
  R(3, 'lets', 'Let’s go to the beach, ___', 'shall we?', 'don’t we?|will we?|let’s we?'),
  R(3, 'nobody', 'Nobody called, ___', 'did they?', 'didn’t they?|did he?|didn’t it?'),
  R(3, 'never', 'You never listen to me, ___', 'do you?', 'don’t you?|are you?|did you?'),
  R(3, 'there', 'There’s a problem, ___', 'isn’t there?', 'isn’t it?|isn’t they?|doesn’t there?'),
  R(3, 'nothing', 'Nothing happened, ___', 'did it?', 'didn’t it?|did they?|wasn’t it?'),
  R(3, 'everyone', 'Everyone was happy, ___', 'weren’t they?', 'wasn’t he?|wasn’t it?|didn’t they?'),
  R(3, 'never', 'She hardly ever goes out, ___', 'does she?', 'doesn’t she?|is she?|did she?'),
  R(3, 'there', 'There aren’t any eggs left, ___', 'are there?', 'aren’t there?|are they?|is it?'),
  R(3, 'im', 'I’m right, ___', 'aren’t I?', 'amn’t I?|isn’t it?|don’t I?'),
  R(3, 'had', 'You’d better hurry, ___', 'hadn’t you?', 'wouldn’t you?|didn’t you?|don’t you?'),
  R(3, 'everyone', 'Somebody left the door open, ___', 'didn’t they?', 'didn’t he?|didn’t it?|wasn’t it?'),
  R(3, 'did', 'He used to live here, ___', 'didn’t he?', 'hadn’t he?|wasn’t he?|doesn’t he?'),
  R(3, 'nobody', 'Neither of them came, ___', 'did they?', 'didn’t they?|did it?|didn’t it?'),
  R(3, 'nobody', 'No one is perfect, ___', 'are they?', 'aren’t they?|is it?|isn’t he?'),
  R(3, 'there', 'There was a lot of noise, ___', 'wasn’t there?', 'wasn’t it?|didn’t there?|weren’t there?'),
  R(3, 'had', 'You’d never seen snow before, ___', 'had you?', 'hadn’t you?|would you?|did you?'),
  R(3, 'im', 'I’m not invited, ___', 'am I?', 'aren’t I?|amn’t I?|do I?'),
  R(3, 'lets', 'Let’s not argue, ___', 'shall we?', 'don’t we?|will we?|do we?'),
  R(3, 'never', 'Few people came to the meeting, ___', 'did they?', 'didn’t they?|did it?|didn’t it?'),
  R(3, 'nothing', 'Everything is ready, ___', 'isn’t it?', 'aren’t they?|isn’t there?|doesn’t it?'),
  R(3, 'never', 'He rarely makes mistakes, ___', 'does he?', 'doesn’t he?|is he?|did he?'),
]

export const BANCO = [
  ...RELATIVOS.map((f, i) => ({ ...f, id: `rel-${String(i + 1).padStart(2, '0')}`, tema: 'relative-pronouns' })),
  ...COLETILLAS.map((f, i) => ({ ...f, id: `tag-${String(i + 1).padStart(2, '0')}`, tema: 'question-tags' })),
]

// La regla que decide cada hueco, para explicarla al fallar.
export const REGLAS = {
  who: { es: 'who = para personas.', en: 'who = for people.', ca: 'who = per a persones.' },
  which: { es: 'which = para cosas y animales.', en: 'which = for things and animals.', ca: 'which = per a coses i animals.' },
  where: { es: 'where = para lugares, cuando significa «en el que» (we play football there).', en: 'where = for places, when it means “in which” (we play football there).', ca: 'where = per a llocs, quan vol dir «en el qual» (we play football there).' },
  whose: { es: 'whose = de quién / cuyo: va delante de lo que se posee (whose dog = cuyo perro). who’s es «who is».', en: 'whose = possession: it goes before the thing owned (whose dog). who’s means “who is”.', ca: 'whose = de qui / del qual: va davant del que es posseeix (whose dog). who’s és «who is».' },
  when: { es: 'when = para momentos (el día, el año, la estación en que…).', en: 'when = for times (the day, the year, the season when…).', ca: 'when = per a moments (el dia, l’any, l’estació en què…).' },
  'which-no-where': { es: 'Es un lugar, pero visit, book o use no llevan preposición: «visitamos el museo», no «en el museo». Por eso which, no where.', en: 'It’s a place, but visit, book or use take a direct object: you visit the museum, not “in” it. So which, not where.', ca: 'És un lloc, però visit, book o use no porten preposició: «visitem el museu», no «al museu». Per això which, no where.' },
  nodef: { es: 'Entre comas (información extra) nunca se usa that: who para personas, which para cosas, where, when o whose.', en: 'Between commas (extra information) you never use that: who for people, which for things, or where, when, whose.', ca: 'Entre comes (informació extra) mai no es fa servir that: who per a persones, which per a coses, o where, when, whose.' },
  clause: { es: 'which, entre comas, puede referirse a toda la frase anterior (= «lo cual»). Ni that ni what.', en: 'which, after a comma, can refer to the whole previous sentence. Not that or what.', ca: 'which, entre comes, pot referir-se a tota la frase anterior (= «la qual cosa»). Ni that ni what.' },
  what: { es: 'what = «lo que» (the thing that). which y that necesitan un nombre delante.', en: 'what = “the thing that”. which and that need a noun before them.', ca: 'what = «el que» (the thing that). which i that necessiten un nom al davant.' },
  be: { es: 'Frase afirmativa → coletilla negativa con el mismo verbo be y el mismo tiempo (is → isn’t, were → weren’t).', en: 'Positive sentence → negative tag with the same verb be in the same tense (is → isn’t, were → weren’t).', ca: 'Frase afirmativa → coletilla negativa amb el mateix verb be i el mateix temps (is → isn’t, were → weren’t).' },
  pron: { es: 'La coletilla repite el verbo, pero el sujeto va en pronombre: Tom → he, Lucy → she, this → it, those shoes → they.', en: 'The tag repeats the verb, but the subject becomes a pronoun: Tom → he, Lucy → she, this → it, those shoes → they.', ca: 'La coletilla repeteix el verb, però el subjecte va en pronom: Tom → he, Lucy → she, this → it, those shoes → they.' },
  neg: { es: 'Frase negativa → coletilla afirmativa, con el mismo auxiliar (isn’t → is, didn’t → did, won’t → will).', en: 'Negative sentence → positive tag with the same auxiliary (isn’t → is, didn’t → did, won’t → will).', ca: 'Frase negativa → coletilla afirmativa, amb el mateix auxiliar (isn’t → is, didn’t → did, won’t → will).' },
  do: { es: 'Presente simple sin auxiliar → la coletilla usa do/does: she plays → doesn’t she?, you like → don’t you?', en: 'Present simple with no auxiliary → the tag uses do/does: she plays → doesn’t she?, you like → don’t you?', ca: 'Present simple sense auxiliar → la coletilla fa servir do/does: she plays → doesn’t she?, you like → don’t you?' },
  did: { es: 'Pasado simple (went, broke, studied, used to) → la coletilla usa did: didn’t he?', en: 'Past simple (went, broke, studied, used to) → the tag uses did: didn’t he?', ca: 'Passat simple (went, broke, studied, used to) → la coletilla fa servir did: didn’t he?' },
  aux: { es: 'Si hay auxiliar (can, will, should, have, ’d = would), la coletilla repite ese mismo auxiliar en negativo.', en: 'If there is an auxiliary (can, will, should, have, ’d = would), the tag repeats that same auxiliary in the negative.', ca: 'Si hi ha auxiliar (can, will, should, have, ’d = would), la coletilla repeteix aquest mateix auxiliar en negatiu.' },
  im: { es: 'I’m… → aren’t I? (amn’t I no existe). Y si es negativa, I’m not… → am I?', en: 'I’m… → aren’t I? (there is no “amn’t I”). If it’s negative, I’m not… → am I?', ca: 'I’m… → aren’t I? (amn’t I no existeix). I si és negativa, I’m not… → am I?' },
  lets: { es: 'Let’s… → shall we? (también con Let’s not).', en: 'Let’s… → shall we? (also with Let’s not).', ca: 'Let’s… → shall we? (també amb Let’s not).' },
  nobody: { es: 'Nobody, no one o neither hacen la frase negativa → coletilla afirmativa, y el sujeto pasa a they.', en: 'Nobody, no one or neither make the sentence negative → positive tag, and the subject becomes they.', ca: 'Nobody, no one o neither fan la frase negativa → coletilla afirmativa, i el subjecte passa a they.' },
  never: { es: 'Never, hardly, rarely o few ya hacen la frase negativa → la coletilla va en afirmativa.', en: 'Never, hardly, rarely or few already make the sentence negative → the tag is positive.', ca: 'Never, hardly, rarely o few ja fan la frase negativa → la coletilla va en afirmativa.' },
  there: { es: 'There is / there was… → la coletilla repite there: isn’t there?, are there?', en: 'There is / there was… → the tag repeats there: isn’t there?, are there?', ca: 'There is / there was… → la coletilla repeteix there: isn’t there?, are there?' },
  nothing: { es: 'Nothing y everything se recogen con it (nothing es negativo → did it?).', en: 'Nothing and everything become it in the tag (nothing is negative → did it?).', ca: 'Nothing i everything es recullen amb it (nothing és negatiu → did it?).' },
  everyone: { es: 'Everyone, somebody… se recogen con they en la coletilla (everyone was → weren’t they?).', en: 'Everyone, somebody… become they in the tag (everyone was → weren’t they?).', ca: 'Everyone, somebody… es recullen amb they a la coletilla (everyone was → weren’t they?).' },
  had: { es: '’d better y ’d + participio son had → la coletilla usa had: hadn’t you? / had you?', en: '’d better and ’d + past participle are had → the tag uses had: hadn’t you? / had you?', ca: '’d better i ’d + participi són had → la coletilla fa servir had: hadn’t you? / had you?' },
}

function barajar(xs, rand) {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}

// Últimas frases salidas: que no se repitan en la misma partida.
const recientes = []
const MEMORIA = 25

export function genRonda(nivel = 'facil', { rand = Math.random, tema } = {}) {
  const n = NIVEL_N[nivel] ?? 1
  const pool = BANCO.filter(f => f.n === n && (!tema || f.tema === tema))
  let cand = pool.filter(f => !recientes.includes(f.id))
  if (!cand.length) cand = pool
  // Un tema u otro a partes iguales (si no hay tema fijo), y luego la frase.
  if (!tema) {
    const t = TEMAS[Math.floor(rand() * TEMAS.length)]
    const delTema = cand.filter(f => f.tema === t)
    if (delTema.length) cand = delTema
  }
  const f = cand[Math.floor(rand() * cand.length)]
  recientes.push(f.id)
  if (recientes.length > MEMORIA) recientes.shift()
  const trampas = barajar(f.trampas, rand).slice(0, (OPCIONES[nivel] ?? 3) - 1)
  return { id: f.id, nivel, tema: f.tema, frase: f.frase, ok: f.ok, regla: f.regla, opciones: barajar([f.ok, ...trampas], rand) }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)

export const esCorrecta = (r, resp) => resp === r.ok

export const fraseCon = (r, palabra) => r.frase.replace('___', palabra)

export function explicacion(r, l) {
  return REGLAS[r.regla][l] ?? REGLAS[r.regla].es
}

export function schemaQuestion(r, l) {
  const f = BANCO.find(x => x.id === r.id)
  const q = { es: 'Completa', en: 'Complete', ca: 'Completa' }[l] ?? 'Completa'
  return { question: `${q}: ${r.frase}`, correctAnswer: r.ok, wrongAnswers: f.trampas.slice(0, 3) }
}
