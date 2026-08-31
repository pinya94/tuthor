// La Pieza que Falta (inglés) — rellenar el hueco con las piezas correctas.
// Lógica pura (sin React), determinista salvo por el `rand` que se le pase.
//
// Cubre los cinco temas de gramática inglesa que hasta ahora solo tenían
// examen tipo test (present simple, past simple, present perfect, articles,
// passive). Una sola mecánica para los cinco: eso es lo que hace que valga la
// pena — el catálogo los declara como cinco formatos del MISMO juego.
//
// Por qué piezas y no opciones a elegir: la respuesta correcta muchas veces
// son DOS o TRES trozos ("has written", "will be built"). Con un test de
// cuatro opciones el alumno reconoce la respuesta; montándola tiene que saber
// que el tiempo lo marca el auxiliar y el significado el participio. Es la
// diferencia entre reconocer y producir.
//
// Cada frase declara:
//   texto  la frase con ___ donde va el hueco
//   pista  el trozo del texto que DELATA la respuesta (every day, yesterday,
//          since 2010…). Se resalta al mostrarla: es la información que hay
//          que aprender a buscar. null si esa frase no tiene una.
//   sol    las piezas correctas, EN ORDEN
//   dis    distractores. Nunca repiten una pieza de `sol` (ver genRound).
//   rule   la regla que enseña, en los tres idiomas

// Sin artículo. Se muestra como una pieza más para que "no poner nada" sea una
// decisión visible: es lo que más falla el hispanohablante, porque en español
// el artículo casi siempre está.
export const SIN_ARTICULO = '—'

export const TEMAS = {
  'present-simple': {
    label: { es: 'Present Simple', en: 'Present Simple', ca: 'Present Simple' },
    emoji: '🔁',
    desc: {
      es: 'Rutinas y verdades generales. La -s de la tercera persona.',
      en: 'Routines and general truths. The third-person -s.',
      ca: 'Rutines i veritats generals. La -s de la tercera persona.',
    },
  },
  'past-simple': {
    label: { es: 'Past Simple', en: 'Past Simple', ca: 'Past Simple' },
    emoji: '⏪',
    desc: {
      es: 'Lo que ya terminó. Regulares en -ed e irregulares.',
      en: 'What is already finished. Regular -ed and irregular verbs.',
      ca: 'El que ja va acabar. Regulars en -ed i irregulars.',
    },
  },
  'present-perfect': {
    label: { es: 'Present Perfect', en: 'Present Perfect', ca: 'Present Perfect' },
    emoji: '🔗',
    desc: {
      es: 'El pasado que sigue contando. have/has + participio.',
      en: 'The past that still counts. have/has + participle.',
      ca: 'El passat que encara compta. have/has + participi.',
    },
  },
  articles: {
    label: { es: 'Articles', en: 'Articles', ca: 'Articles' },
    emoji: '🅰️',
    desc: {
      es: 'a, an, the… y cuándo no va ninguno.',
      en: 'a, an, the… and when none of them goes.',
      ca: 'a, an, the… i quan no n’hi va cap.',
    },
  },
  passive: {
    label: { es: 'Passive Voice', en: 'Passive Voice', ca: 'Passive Voice' },
    emoji: '🔄',
    desc: {
      es: 'Cuando importa la acción, no quién la hace. be + participio.',
      en: 'When the action matters, not who does it. be + participle.',
      ca: "Quan importa l'acció, no qui la fa. be + participi.",
    },
  },
}

export const TEMA_IDS = Object.keys(TEMAS)

// Jugando, el juego SIEMPRE mezcla los cinco temas: no hay selector. Practicar
// un tema aislado ya lo cubre su examen tipo test, y ahí el propio título de la
// pantalla te está dando media respuesta — si sabes que toca present perfect,
// "has" ya no es una decisión. Mezclado, la única pista es la frase, que es
// justo lo que hay que aprender a leer.
//
// El filtro por tema sigue existiendo porque el catálogo lo usa: una tarea de
// profesor (materia → tema → formato) llega con su tema y se juega solo ese.
export const MEZCLA = 'mixto'

// ── Reglas ───────────────────────────────────────────────────────────────────
// Se comparten entre frases: la misma regla explicada una sola vez, bien.
const R = {
  ps3: {
    es: 'Con he/she/it el verbo lleva -s: “she goes”. Es el fallo más repetido: en español la persona ya la marca la terminación del verbo.',
    en: 'With he/she/it the verb takes -s: “she goes”. It is the most repeated mistake for Spanish speakers.',
    ca: 'Amb he/she/it el verb porta -s: “she goes”. És l’error més repetit: en català la persona ja la marca la terminació del verb.',
  },
  psEs: {
    es: 'Verbos acabados en -ch, -sh, -ss, -x, -o añaden -es: watch→watches, go→goes. Consonante + y: study→studies.',
    en: 'Verbs ending in -ch, -sh, -ss, -x, -o add -es: watch→watches, go→goes. Consonant + y: study→studies.',
    ca: 'Verbs acabats en -ch, -sh, -ss, -x, -o afegeixen -es: watch→watches, go→goes. Consonant + y: study→studies.',
  },
  psAux: {
    es: 'En negativas y preguntas manda el auxiliar: don’t/doesn’t y do/does. El verbo principal vuelve a la forma base, SIN -s.',
    en: 'In negatives and questions the auxiliary carries it: don’t/doesn’t and do/does. The main verb goes back to the base form, with NO -s.',
    ca: 'En negatives i preguntes mana l’auxiliar: don’t/doesn’t i do/does. El verb principal torna a la forma base, SENSE -s.',
  },
  psSignal: {
    es: 'Marcadores de present simple: every day, always, usually, never, on Mondays. Hablan de costumbre, no de ahora mismo.',
    en: 'Present simple markers: every day, always, usually, never, on Mondays. They talk about habits, not about right now.',
    ca: 'Marcadors de present simple: every day, always, usually, never, on Mondays. Parlen de costum, no d’ara mateix.',
  },
  psFreq: {
    es: 'Los adverbios de frecuencia (always, never, usually) van ANTES del verbo principal: “he never eats”.',
    en: 'Frequency adverbs (always, never, usually) go BEFORE the main verb: “he never eats”.',
    ca: 'Els adverbis de freqüència (always, never, usually) van ABANS del verb principal: “he never eats”.',
  },
  psTruth: {
    es: 'El present simple también sirve para verdades generales y hechos científicos: “water boils at 100 degrees”.',
    en: 'The present simple is also used for general truths and scientific facts: “water boils at 100 degrees”.',
    ca: 'El present simple també serveix per a veritats generals i fets científics: “water boils at 100 degrees”.',
  },
  psBeFreq: {
    es: 'Con el verbo “be” el adverbio de frecuencia va DETRÁS: “he is never late”. Con cualquier otro verbo va delante: “he never arrives late”.',
    en: 'With the verb “be” the frequency adverb goes AFTER: “he is never late”. With any other verb it goes before: “he never arrives late”.',
    ca: 'Amb el verb “be” l’adverbi de freqüència va DARRERE: “he is never late”. Amb qualsevol altre verb va davant: “he never arrives late”.',
  },
  pastReg: {
    es: 'Los verbos regulares forman el pasado con -ed: finish→finished, stay→stayed. La misma forma para todas las personas.',
    en: 'Regular verbs form the past with -ed: finish→finished, stay→stayed. Same form for every person.',
    ca: 'Els verbs regulars formen el passat amb -ed: finish→finished, stay→stayed. La mateixa forma per a totes les persones.',
  },
  pastIrr: {
    es: 'Irregular: no hay regla, se aprende de memoria (go→went, send→sent, lose→lost). “goed” o “sended” no existen.',
    en: 'Irregular: no rule, you learn it by heart (go→went, send→sent, lose→lost). “goed” or “sended” do not exist.',
    ca: 'Irregular: no hi ha regla, s’aprèn de memòria (go→went, send→sent, lose→lost). “goed” o “sended” no existeixen.',
  },
  pastRead: {
    es: '“Read” se escribe igual en presente y en pasado, pero en pasado se pronuncia /red/. La frase es la única pista.',
    en: '“Read” is spelt the same in present and past, but the past is pronounced /red/. The sentence is the only clue.',
    ca: '“Read” s’escriu igual en present i en passat, però en passat es pronuncia /red/. La frase és l’única pista.',
  },
  pastAux: {
    es: 'Con did/didn’t el verbo vuelve a la forma base: “didn’t know”, nunca “didn’t knew”. El pasado ya lo marca “did”.',
    en: 'With did/didn’t the verb goes back to the base form: “didn’t know”, never “didn’t knew”. “Did” already marks the past.',
    ca: 'Amb did/didn’t el verb torna a la forma base: “didn’t know”, mai “didn’t knew”. El passat ja el marca “did”.',
  },
  pastBe: {
    es: 'El verbo “be” no usa did: tiene su propio pasado, was (I/he/she/it) y were (you/we/they).',
    en: 'The verb “be” does not use did: it has its own past, was (I/he/she/it) and were (you/we/they).',
    ca: 'El verb “be” no fa servir did: té el seu propi passat, was (I/he/she/it) i were (you/we/they).',
  },
  pastSignal: {
    es: 'Marcadores de past simple: yesterday, last week, in 2019, two days ago. Señalan un momento TERMINADO.',
    en: 'Past simple markers: yesterday, last week, in 2019, two days ago. They point at a FINISHED moment.',
    ca: 'Marcadors de past simple: yesterday, last week, in 2019, two days ago. Assenyalen un moment ACABAT.',
  },
  pastBorn: {
    es: '“Nacer” en inglés es pasivo y casi siempre en pasado: was/were born. “I born” no existe.',
    en: '“Be born” is passive and almost always in the past: was/were born. “I born” does not exist.',
    ca: '“Néixer” en anglès és passiu i gairebé sempre en passat: was/were born. “I born” no existeix.',
  },
  ppForm: {
    es: 'Present perfect = have/has + participio. Con he/she/it toca “has”. El participio no cambia nunca.',
    en: 'Present perfect = have/has + participle. With he/she/it it is “has”. The participle never changes.',
    ca: 'Present perfect = have/has + participi. Amb he/she/it toca “has”. El participi no canvia mai.',
  },
  ppSince: {
    es: '“Since” marca el punto de inicio (since 2010) y “for” la duración (for ten years). Los dos piden present perfect.',
    en: '“Since” marks the starting point (since 2010) and “for” the duration (for ten years). Both take present perfect.',
    ca: '“Since” marca el punt d’inici (since 2010) i “for” la durada (for ten years). Tots dos demanen present perfect.',
  },
  ppEver: {
    es: 'ever, never, just, already y yet viven en el present perfect: hablan de la experiencia hasta hoy, sin fecha concreta.',
    en: 'ever, never, just, already and yet live in the present perfect: they talk about experience up to today, with no date.',
    ca: 'ever, never, just, already i yet viuen en el present perfect: parlen de l’experiència fins avui, sense data concreta.',
  },
  ppBeenGone: {
    es: '“Has been to” = fue y ya ha vuelto. “Has gone to” = se fue y sigue allí. No son intercambiables.',
    en: '“Has been to” = went and is back. “Has gone to” = went and is still there. They are not interchangeable.',
    ca: '“Has been to” = hi va anar i ja ha tornat. “Has gone to” = hi va anar i encara hi és. No són intercanviables.',
  },
  ppVsPast: {
    es: 'Trampa: con un momento terminado y concreto (last night, yesterday) NO va present perfect, va past simple.',
    en: 'Trap: with a finished, specific moment (last night, yesterday) you do NOT use present perfect, you use past simple.',
    ca: 'Parany: amb un moment acabat i concret (last night, yesterday) NO va present perfect, va past simple.',
  },
  artAn: {
    es: '“An” va antes de SONIDO vocálico, no de letra vocal: an hour (h muda) pero a university (suena “yu”).',
    en: '“An” goes before a vowel SOUND, not a vowel letter: an hour (silent h) but a university (it sounds “yu”).',
    ca: '“An” va abans de SO vocàlic, no de lletra vocal: an hour (h muda) però a university (sona “iu”).',
  },
  artFirst: {
    es: 'La primera vez que algo aparece: a/an. A partir de ahí ya sabemos cuál es, y pasa a ser “the”.',
    en: 'The first time something appears: a/an. From then on we know which one it is, so it becomes “the”.',
    ca: 'La primera vegada que apareix una cosa: a/an. A partir d’aquí ja sabem quina és, i passa a ser “the”.',
  },
  artThe: {
    es: '“The” para lo único (the sun), lo que el contexto ya identifica, los superlativos y los instrumentos musicales.',
    en: '“The” for what is unique (the sun), what context already identifies, superlatives and musical instruments.',
    ca: '“The” per al que és únic (the sun), el que el context ja identifica, els superlatius i els instruments musicals.',
  },
  artZero: {
    es: 'Hablando EN GENERAL (plurales e incontables) el inglés no pone artículo: “I like music”, “dogs are friendly”.',
    en: 'Talking IN GENERAL (plurals and uncountables) English uses no article: “I like music”, “dogs are friendly”.',
    ca: 'Parlant EN GENERAL (plurals i incomptables) l’anglès no hi posa article: “I like music”, “dogs are friendly”.',
  },
  artInst: {
    es: 'Con school, hospital, church o prison sin artículo se habla de para qué SIRVEN, no del edificio.',
    en: 'With school, hospital, church or prison, no article means the PURPOSE, not the building.',
    ca: 'Amb school, hospital, church o prison sense article es parla de per a què SERVEIXEN, no de l’edifici.',
  },
  artNames: {
    es: 'Montañas, lagos y países en singular van sin artículo (Everest, Spain). Sí lo llevan cordilleras y plurales (the Alps).',
    en: 'Single mountains, lakes and countries take no article (Everest, Spain). Ranges and plurals do (the Alps).',
    ca: 'Muntanyes, llacs i països en singular van sense article (Everest, Spain). Sí que en porten serralades i plurals (the Alps).',
  },
  artJob: {
    es: 'Las profesiones LLEVAN a/an en inglés aunque en español no lleven nada: “es médico” → “he is a doctor”.',
    en: 'Jobs DO take a/an in English even though Spanish uses no article: “es médico” → “he is a doctor”.',
    ca: 'Les professions PORTEN a/an en anglès encara que en català no en portin: “és metge” → “he is a doctor”.',
  },
  artNations: {
    es: 'Con una nacionalidad como grupo entero va “the”: “the Japanese eat…”, “the Spanish are…”.',
    en: 'With a nationality as a whole group you use “the”: “the Japanese eat…”, “the Spanish are…”.',
    ca: 'Amb una nacionalitat com a grup sencer va “the”: “the Japanese eat…”, “the Spanish are…”.',
  },
  artMeal: {
    es: 'Deportes y comidas van sin artículo: “play football”, “have breakfast”. En español sí lo llevan, y de ahí el error.',
    en: 'Sports and meals take no article: “play football”, “have breakfast”. Spanish uses one, hence the mistake.',
    ca: 'Esports i menjars van sense article: “play football”, “have breakfast”. En català sí que en porten, i d’aquí l’error.',
  },
  pasForm: {
    es: 'Pasiva = be + participio. El sujeto no hace la acción, la recibe: “English is spoken”.',
    en: 'Passive = be + participle. The subject does not do the action, it receives it: “English is spoken”.',
    ca: 'Passiva = be + participi. El subjecte no fa l’acció, la rep: “English is spoken”.',
  },
  pasTense: {
    es: 'El tiempo lo marca “be”, nunca el participio: is built (ahora), was built (antes). El participio se queda igual.',
    en: 'The tense is carried by “be”, never by the participle: is built (now), was built (before). The participle stays.',
    ca: 'El temps el marca “be”, mai el participi: is built (ara), was built (abans). El participi es queda igual.',
  },
  pasAgree: {
    es: '“Be” concuerda con el sujeto: singular is/was, plural are/were. Es lo que delata que el sujeto va en plural.',
    en: '“Be” agrees with the subject: singular is/was, plural are/were. That is what gives away a plural subject.',
    ca: '“Be” concorda amb el subjecte: singular is/was, plural are/were. És el que delata que el subjecte va en plural.',
  },
  pasBy: {
    es: '“By” introduce quién hace la acción, y solo se pone si aporta algo: “written by Shakespeare”.',
    en: '“By” introduces who does the action, and is only added when it matters: “written by Shakespeare”.',
    ca: '“By” introdueix qui fa l’acció, i només s’hi posa si aporta alguna cosa: “written by Shakespeare”.',
  },
  pasFuture: {
    es: 'Pasiva en futuro: will + be + participio. Detrás de will, “be” va siempre en forma base.',
    en: 'Future passive: will + be + participle. After will, “be” is always in its base form.',
    ca: 'Passiva en futur: will + be + participi. Darrere de will, “be” va sempre en forma base.',
  },
}

const f = (id, tema, texto, pista, sol, dis, rule) => ({ id, tema, texto, pista, sol, dis, rule })

// ── El banco de frases ───────────────────────────────────────────────────────
export const FRASES = [
  // ── Present simple ─────────────────────────────────────────────────────────
  f('ps-01', 'present-simple', 'She ___ to school every day.', 'every day', ['goes'], ['go', 'going', 'went'], R.ps3),
  f('ps-02', 'present-simple', 'He ___ TV every evening.', 'every evening', ['watches'], ['watch', 'watchs', 'watched'], R.psEs),
  f('ps-03', 'present-simple', 'They ___ football on Saturdays.', 'on Saturdays', ['play'], ['plays', 'played', 'playing'], R.ps3),
  f('ps-04', 'present-simple', 'She ___ coffee.', null, ["doesn't", 'like'], ["don't", 'likes', 'not'], R.psAux),
  f('ps-05', 'present-simple', '___ she like pizza?', null, ['Does'], ['Do', 'Is', 'Did'], R.psAux),
  f('ps-06', 'present-simple', 'They ___ in London.', null, ["don't", 'live'], ["doesn't", 'lives', 'not'], R.psAux),
  f('ps-07', 'present-simple', 'He ___ every night.', 'every night', ['studies'], ['studys', 'study', 'studied'], R.psEs),
  f('ps-08', 'present-simple', 'My father ___ to work by bus.', null, ['goes'], ['go', 'gos', 'going'], R.psEs),
  f('ps-09', 'present-simple', 'Water ___ at 100 degrees.', null, ['boils'], ['boil', 'boiled', 'boiling'], R.psTruth),
  f('ps-10', 'present-simple', "I ___ meat. I'm a vegetarian.", null, ["don't", 'eat'], ["doesn't", 'eats', 'not'], R.psAux),
  f('ps-11', 'present-simple', '___ your parents work here?', null, ['Do'], ['Does', 'Are', 'Did'], R.psAux),
  f('ps-12', 'present-simple', 'The shop ___ at nine.', null, ['opens'], ['open', 'opened', 'opening'], R.ps3),
  f('ps-13', 'present-simple', 'We usually ___ dinner at eight.', 'usually', ['have'], ['has', 'had', 'having'], R.psSignal),
  f('ps-14', 'present-simple', 'He ___ fish.', null, ['never', 'eats'], ['eat', 'not', 'eating'], R.psFreq),

  f('ps-15', 'present-simple', 'My sister ___ the piano every Sunday.', 'every Sunday', ['plays'], ['play', 'playes', 'playing'], R.ps3),
  f('ps-16', 'present-simple', 'Cats ___ a lot during the day.', 'during the day', ['sleep'], ['sleeps', 'sleeping', 'slept'], R.ps3),
  f('ps-17', 'present-simple', 'The bus ___ at half past seven.', 'at half past seven', ['leaves'], ['leave', 'leafs', 'leaving'], R.ps3),
  f('ps-18', 'present-simple', '___ your brother play tennis?', null, ['Does'], ['Do', 'Is', 'Did'], R.psAux),
  f('ps-19', 'present-simple', 'We ___ TV on school nights.', 'on school nights', ["don't", 'watch'], ["doesn't", 'watches', 'not'], R.psAux),
  f('ps-20', 'present-simple', 'She ___ her room every Saturday.', 'every Saturday', ['tidies'], ['tidys', 'tidy', 'tidied'], R.psEs),
  f('ps-21', 'present-simple', 'The Earth ___ around the Sun.', null, ['goes'], ['go', 'going', 'went'], R.psTruth),
  f('ps-22', 'present-simple', 'He ___ late for class.', null, ['is', 'never'], ['are', 'being', 'not'], R.psBeFreq),
  f('ps-23', 'present-simple', 'My parents ___ in a hospital.', null, ['work'], ['works', 'working', 'worked'], R.ps3),
  f('ps-24', 'present-simple', 'It ___ a lot here in winter.', null, ['rains'], ['rain', 'raining', 'rained'], R.psTruth),
  f('ps-25', 'present-simple', 'I ___ up at seven every morning.', 'every morning', ['get'], ['gets', 'getting', 'got'], R.psSignal),
  f('ps-26', 'present-simple', 'She ___ English and French.', null, ['speaks'], ['speak', 'speakes', 'speaking'], R.ps3),
  f('ps-27', 'present-simple', '___ they live near the school?', null, ['Do'], ['Does', 'Are', 'Did'], R.psAux),
  f('ps-28', 'present-simple', 'The museum ___ on Mondays.', 'on Mondays', ["doesn't", 'open'], ["don't", 'opens', 'not'], R.psAux),
  f('ps-29', 'present-simple', 'He ___ his teeth twice a day.', 'twice a day', ['brushes'], ['brush', 'brushs', 'brushing'], R.psEs),
  f('ps-30', 'present-simple', 'Water ___ when it gets cold enough.', null, ['freezes'], ['freeze', 'freezing', 'froze'], R.psTruth),
  f('ps-31', 'present-simple', 'We ___ to the beach in summer.', 'in summer', ['go'], ['goes', 'going', 'went'], R.ps3),
  f('ps-32', 'present-simple', 'My dog ___ when the postman comes.', 'when the postman comes', ['barks'], ['bark', 'barkes', 'barking'], R.ps3),
  f('ps-33', 'present-simple', 'He ___ coffee, only tea.', null, ["doesn't", 'drink'], ["don't", 'drinks', 'not'], R.psAux),
  f('ps-34', 'present-simple', 'I ___ do my homework at night.', null, ['usually'], ['am', 'usual', 'being'], R.psFreq),

  // Tanda con marcador SIEMPRE visible y sujetos variados: el análisis del
  // banco enseñó que dos de cada tres frases de present simple no tenían nada
  // subrayado, justo en el tema donde el marcador es la estrategia a aprender.
  f('ps-35', 'present-simple', 'Anna ___ to the gym twice a week.', 'twice a week', ['goes'], ['go', 'going', 'gone'], R.psSignal),
  f('ps-36', 'present-simple', 'My cousins ___ us every summer.', 'every summer', ['visit'], ['visits', 'visiting', 'visited'], R.ps3),
  f('ps-37', 'present-simple', 'The teacher ___ our homework on Fridays.', 'on Fridays', ['checks'], ['check', 'checkes', 'checking'], R.ps3),
  f('ps-38', 'present-simple', 'Tom ___ hardly ever late.', 'hardly ever', ['is'], ['are', 'be', 'being'], R.psBeFreq),
  f('ps-39', 'present-simple', 'We ___ at home at weekends.', 'at weekends', ['stay'], ['stays', 'staying', 'stayed'], R.psSignal),
  f('ps-40', 'present-simple', 'She ___ the piano in the mornings.', 'in the mornings', ['practises'], ['practise', 'practising', 'practised'], R.ps3),
  f('ps-41', 'present-simple', 'My grandmother ___ watches television.', 'watches television', ['rarely'], ['is', 'rare', 'being'], R.psFreq),
  f('ps-42', 'present-simple', 'The shops ___ at ten on Sundays.', 'on Sundays', ['open'], ['opens', 'opening', 'opened'], R.ps3),
  f('ps-43', 'present-simple', 'Our team ___ three times a week.', 'three times a week', ['trains'], ['train', 'training', 'trained'], R.ps3),
  f('ps-44', 'present-simple', 'Sara and Luis ___ Spanish all the time.', 'all the time', ['speak'], ['speaks', 'speaking', 'spoken'], R.ps3),
  f('ps-45', 'present-simple', 'It ___ dark at six in winter.', 'in winter', ['gets'], ['get', 'getting', 'got'], R.psTruth),
  f('ps-46', 'present-simple', 'The baby ___ ten hours every night.', 'every night', ['sleeps'], ['sleep', 'sleeping', 'slept'], R.ps3),
  f('ps-47', 'present-simple', '___ your sister study medicine?', null, ['Does'], ['Do', 'Is', 'Did'], R.psAux),
  f('ps-48', 'present-simple', 'They ___ meat on Fridays.', 'on Fridays', ["don't", 'eat'], ["doesn't", 'eats', 'not'], R.psAux),
  f('ps-49', 'present-simple', 'The museum ___ free on Sundays.', 'on Sundays', ['is'], ['are', 'be', 'being'], R.ps3),
  f('ps-50', 'present-simple', 'Penguins ___ in very cold places.', null, ['live'], ['lives', 'living', 'lived'], R.psTruth),
  f('ps-51', 'present-simple', 'He ___ his grandparents once a month.', 'once a month', ['visits'], ['visit', 'visites', 'visiting'], R.ps3),
  f('ps-52', 'present-simple', 'We ___ the bus to school every morning.', 'every morning', ['take'], ['takes', 'taking', 'took'], R.psSignal),
  f('ps-53', 'present-simple', 'She ___ has lunch at work.', 'has lunch at work', ['sometimes'], ['is', 'some', 'being'], R.psFreq),
  f('ps-54', 'present-simple', 'The sun ___ in the east.', null, ['rises'], ['rise', 'rising', 'rose'], R.psTruth),

  // ── Past simple ────────────────────────────────────────────────────────────
  f('pa-01', 'past-simple', 'I ___ to the cinema yesterday.', 'yesterday', ['went'], ['go', 'goed', 'gone'], R.pastIrr),
  f('pa-02', 'past-simple', 'She ___ her homework last night.', 'last night', ['finished'], ['finish', 'finishes', 'finishing'], R.pastReg),
  f('pa-03', 'past-simple', 'They ___ football in 2019.', 'in 2019', ['played'], ['play', 'plays', 'playing'], R.pastSignal),
  f('pa-04', 'past-simple', 'He ___ the answer.', null, ["didn't", 'know'], ["doesn't", 'knew', 'not'], R.pastAux),
  f('pa-05', 'past-simple', '___ you see the film?', null, ['Did'], ['Do', 'Was', 'Have'], R.pastAux),
  f('pa-06', 'past-simple', 'We ___ a great time at the party.', 'at the party', ['had'], ['have', 'haved', 'has'], R.pastIrr),
  f('pa-07', 'past-simple', 'She ___ me an email two days ago.', 'two days ago', ['sent'], ['send', 'sended', 'sends'], R.pastIrr),
  f('pa-08', 'past-simple', 'I ___ my keys this morning.', 'this morning', ['lost'], ['lose', 'losed', 'loosed'], R.pastIrr),
  f('pa-09', 'past-simple', 'They ___ in Paris last summer.', 'last summer', ['stayed'], ['stay', 'stayd', 'staied'], R.pastReg),
  f('pa-10', 'past-simple', '___ she at home yesterday?', 'yesterday', ['Was'], ['Did', 'Were', 'Is'], R.pastBe),
  f('pa-11', 'past-simple', 'We ___ tired after the trip.', null, ['were'], ['was', 'are', 'been'], R.pastBe),
  f('pa-12', 'past-simple', 'He ___ for the exam.', null, ["didn't", 'study'], ["doesn't", 'studied', 'not'], R.pastAux),
  f('pa-13', 'past-simple', 'Shakespeare ___ Hamlet.', null, ['wrote'], ['write', 'writed', 'written'], R.pastIrr),
  f('pa-14', 'past-simple', 'I ___ that book last month.', 'last month', ['read'], ['readed', 'reads', 'reading'], R.pastRead),

  f('pa-15', 'past-simple', 'We ___ pizza for dinner last night.', 'last night', ['ate'], ['eat', 'eated', 'eaten'], R.pastIrr),
  f('pa-16', 'past-simple', 'She ___ the window because it was hot.', 'it was hot', ['opened'], ['open', 'opens', 'opening'], R.pastReg),
  f('pa-17', 'past-simple', 'They ___ to Rome in 2018.', 'in 2018', ['flew'], ['fly', 'flied', 'flown'], R.pastIrr),
  f('pa-18', 'past-simple', '___ he finish the exam?', null, ['Did'], ['Do', 'Was', 'Has'], R.pastAux),
  f('pa-19', 'past-simple', 'I ___ my homework yesterday.', 'yesterday', ['did'], ['do', 'done', 'doed'], R.pastIrr),
  f('pa-20', 'past-simple', 'The concert ___ at nine last Friday.', 'last Friday', ['started'], ['start', 'starts', 'starting'], R.pastReg),
  f('pa-21', 'past-simple', 'He ___ the bus this morning.', 'this morning', ['missed'], ['miss', 'misses', 'missing'], R.pastReg),
  f('pa-22', 'past-simple', 'The film ___ really boring.', null, ['was'], ['were', 'is', 'been'], R.pastBe),
  f('pa-23', 'past-simple', 'She ___ me the truth.', null, ['told'], ['tell', 'telled', 'telling'], R.pastIrr),
  f('pa-24', 'past-simple', 'They ___ the match 3-0 last week.', 'last week', ['won'], ['win', 'winned', 'winning'], R.pastIrr),
  f('pa-25', 'past-simple', 'I ___ him at the station.', null, ['saw'], ['see', 'seed', 'seen'], R.pastIrr),
  f('pa-26', 'past-simple', 'She ___ a beautiful song.', null, ['sang'], ['sing', 'singed', 'sung'], R.pastIrr),
  f('pa-27', 'past-simple', 'He ___ the film at all.', null, ["didn't", 'like'], ["doesn't", 'liked', 'not'], R.pastAux),
  f('pa-28', 'past-simple', '___ the shops open yesterday?', 'yesterday', ['Were'], ['Was', 'Did', 'Are'], R.pastBe),
  f('pa-29', 'past-simple', 'My grandfather ___ in 1935.', 'in 1935', ['was', 'born'], ['were', 'is', 'borned'], R.pastBorn),
  f('pa-30', 'past-simple', 'She ___ her keys on the table.', null, ['left'], ['leave', 'leaves', 'leaving'], R.pastIrr),
  f('pa-31', 'past-simple', 'We ___ that film last weekend.', 'last weekend', ['watched'], ['watch', 'watches', 'watching'], R.pastReg),
  f('pa-32', 'past-simple', 'He ___ his leg playing football.', null, ['broke'], ['break', 'breaked', 'broken'], R.pastIrr),
  f('pa-33', 'past-simple', 'They ___ a new house two years ago.', 'two years ago', ['bought'], ['buy', 'buyed', 'buying'], R.pastIrr),
  f('pa-34', 'past-simple', 'She ___ to answer every question.', null, ['tried'], ['try', 'trys', 'trying'], R.pastReg),

  f('pa-35', 'past-simple', 'We ___ in Lisbon in 2005.', 'in 2005', ['lived'], ['live', 'lives', 'living'], R.pastReg),
  f('pa-36', 'past-simple', 'The teacher ___ us the exam last Tuesday.', 'last Tuesday', ['gave'], ['give', 'gived', 'given'], R.pastIrr),
  f('pa-37', 'past-simple', 'Anna ___ her bike a week ago.', 'a week ago', ['sold'], ['sell', 'selled', 'selling'], R.pastIrr),
  f('pa-38', 'past-simple', 'When I ___ a child, I hated fish.', 'hated', ['was'], ['were', 'am', 'been'], R.pastBe),
  f('pa-39', 'past-simple', 'They ___ the house last Christmas.', 'last Christmas', ['painted'], ['paint', 'paints', 'painting'], R.pastReg),
  f('pa-40', 'past-simple', 'My brother ___ to drive at eighteen.', 'at eighteen', ['learnt'], ['learn', 'learns', 'learning'], R.pastIrr),
  f('pa-41', 'past-simple', 'The film ___ two hours ago.', 'two hours ago', ['ended'], ['end', 'ends', 'ending'], R.pastReg),
  f('pa-42', 'past-simple', '___ you at the concert last night?', 'last night', ['Were'], ['Was', 'Did', 'Are'], R.pastBe),
  f('pa-43', 'past-simple', 'She ___ anything at the party.', null, ["didn't", 'say'], ["doesn't", 'said', 'not'], R.pastAux),
  f('pa-44', 'past-simple', 'Columbus ___ America in 1492.', 'in 1492', ['reached'], ['reach', 'reaches', 'reaching'], R.pastReg),
  f('pa-45', 'past-simple', 'They ___ back the day before yesterday.', 'the day before yesterday', ['came'], ['come', 'comed', 'coming'], R.pastIrr),
  f('pa-46', 'past-simple', 'The dog ___ all night.', 'all night', ['barked'], ['bark', 'barks', 'barking'], R.pastReg),
  f('pa-47', 'past-simple', 'My parents ___ married in 1998.', 'in 1998', ['got'], ['get', 'gets', 'getting'], R.pastIrr),
  f('pa-48', 'past-simple', '___ she call you yesterday?', 'yesterday', ['Did'], ['Do', 'Was', 'Has'], R.pastAux),
  f('pa-49', 'past-simple', 'He ___ me his notes last week.', 'last week', ['lent'], ['lend', 'lended', 'lending'], R.pastIrr),
  f('pa-50', 'past-simple', 'The shop ___ at eight last night.', 'last night', ['closed'], ['close', 'closes', 'closing'], R.pastReg),
  f('pa-51', 'past-simple', 'I ___ my grandmother last weekend.', 'last weekend', ['visited'], ['visit', 'visits', 'visiting'], R.pastReg),
  f('pa-52', 'past-simple', 'We ___ our tickets online in June.', 'in June', ['booked'], ['book', 'books', 'booking'], R.pastReg),
  f('pa-53', 'past-simple', 'They ___ us about the change.', null, ["didn't", 'tell'], ["doesn't", 'told', 'not'], R.pastAux),
  f('pa-54', 'past-simple', 'The Titanic ___ in 1912.', 'in 1912', ['sank'], ['sink', 'sinked', 'sunk'], R.pastIrr),

  // ── Present perfect ────────────────────────────────────────────────────────
  f('pp-01', 'present-perfect', "I ___ my keys. I can't find them.", null, ['have', 'lost'], ['has', 'lose', 'losed'], R.ppForm),
  f('pp-02', 'present-perfect', 'She ___ here since 2010.', 'since 2010', ['has', 'lived'], ['have', 'live', 'lives'], R.ppSince),
  f('pp-03', 'present-perfect', 'They ___ finished the project yet.', 'yet', ["haven't"], ["hasn't", "didn't", "don't"], R.ppEver),
  f('pp-04', 'present-perfect', '___ you ever been to London?', 'ever', ['Have'], ['Has', 'Did', 'Are'], R.ppEver),
  f('pp-05', 'present-perfect', 'He ___ just arrived.', 'just', ['has'], ['have', 'is', 'did'], R.ppEver),
  f('pp-06', 'present-perfect', 'We ___ known each other for ten years.', 'for ten years', ['have'], ['has', 'are', 'had'], R.ppSince),
  f('pp-07', 'present-perfect', 'She ___ never eaten sushi.', 'never', ['has'], ['have', 'is', 'did'], R.ppEver),
  f('pp-08', 'present-perfect', 'I ___ already seen that film.', 'already', ['have'], ['has', 'am', 'did'], R.ppEver),
  f('pp-09', 'present-perfect', 'My sister ___ to Japan three times.', 'three times', ['has', 'been'], ['have', 'was', 'gone'], R.ppBeenGone),
  f('pp-10', 'present-perfect', '___ they released the new song yet?', 'yet', ['Have'], ['Has', 'Did', 'Do'], R.ppEver),
  f('pp-11', 'present-perfect', 'The children ___ their homework.', null, ['have', 'done'], ['has', 'did', 'doing'], R.ppForm),
  f('pp-12', 'present-perfect', 'He ___ in this company since March.', 'since March', ['has', 'worked'], ['have', 'works', 'working'], R.ppSince),
  f('pp-13', 'present-perfect', 'I ___ that film last night.', 'last night', ['saw'], ['have', 'has', 'seen'], R.ppVsPast),
  f('pp-14', 'present-perfect', 'We ___ never visited Rome.', 'never', ['have'], ['has', 'are', 'did'], R.ppEver),

  f('pp-15', 'present-perfect', 'They ___ just arrived from the airport.', 'just', ['have'], ['has', 'are', 'did'], R.ppEver),
  f('pp-16', 'present-perfect', 'I ___ this city since I was a child.', 'since', ['have', 'known'], ['has', 'know', 'knew'], R.ppSince),
  f('pp-17', 'present-perfect', 'She ___ her homework yet.', 'yet', ["hasn't", 'done'], ["haven't", 'did', 'doing'], R.ppEver),
  f('pp-18', 'present-perfect', 'We ___ in this house for ten years.', 'for ten years', ['have', 'lived'], ['has', 'live', 'living'], R.ppSince),
  f('pp-19', 'present-perfect', '___ he ever tried sushi?', 'ever', ['Has'], ['Have', 'Did', 'Is'], R.ppEver),
  f('pp-20', 'present-perfect', 'My parents ___ to Paris twice.', 'twice', ['have', 'been'], ['has', 'were', 'gone'], R.ppBeenGone),
  f('pp-21', 'present-perfect', "He ___ his passport, so he can't travel.", null, ['has', 'lost'], ['have', 'lose', 'losed'], R.ppForm),
  f('pp-22', 'present-perfect', 'I ___ that book yesterday.', 'yesterday', ['finished'], ['have', 'has', 'finish'], R.ppVsPast),
  f('pp-23', 'present-perfect', 'They ___ never seen snow.', 'never', ['have'], ['has', 'are', 'did'], R.ppEver),
  f('pp-24', 'present-perfect', 'The train ___ already left.', 'already', ['has'], ['have', 'is', 'did'], R.ppEver),
  f('pp-25', 'present-perfect', 'How long ___ you worked here?', 'How long', ['have'], ['has', 'did', 'are'], R.ppSince),
  f('pp-26', 'present-perfect', 'She ___ three books this year.', 'this year', ['has', 'written'], ['have', 'wrote', 'writing'], R.ppForm),
  f('pp-27', 'present-perfect', 'We ___ friends since school.', 'since school', ['have', 'been'], ['has', 'were', 'being'], R.ppSince),
  f('pp-28', 'present-perfect', 'He ___ the car twice this week.', 'this week', ['has', 'washed'], ['have', 'washes', 'washing'], R.ppForm),
  f('pp-29', 'present-perfect', '___ you finished your homework?', null, ['Have'], ['Has', 'Did', 'Are'], R.ppEver),
  f('pp-30', 'present-perfect', 'They ___ to London last summer.', 'last summer', ['went'], ['have', 'has', 'gone'], R.ppVsPast),
  f('pp-31', 'present-perfect', 'My sister ___ to Australia; she comes back in May.', 'comes back in May', ['has', 'gone'], ['have', 'been', 'was'], R.ppBeenGone),
  f('pp-32', 'present-perfect', 'It ___ a lot this week.', 'this week', ['has', 'rained'], ['have', 'rains', 'raining'], R.ppForm),
  f('pp-33', 'present-perfect', 'You ___ eaten all the biscuits!', null, ['have'], ['has', 'are', 'did'], R.ppForm),
  f('pp-34', 'present-perfect', 'I ___ him since 2019.', 'since 2019', ["haven't", 'seen'], ["hasn't", 'saw', 'seeing'], R.ppSince),

  f('pp-35', 'present-perfect', 'I ___ three emails so far today.', 'so far', ['have', 'written'], ['has', 'wrote', 'writing'], R.ppForm),
  f('pp-36', 'present-perfect', 'She ___ very hard lately.', 'lately', ['has', 'worked'], ['have', 'works', 'working'], R.ppEver),
  f('pp-37', 'present-perfect', 'We ___ that film twice this month.', 'this month', ['have', 'seen'], ['has', 'saw', 'seeing'], R.ppForm),
  f('pp-38', 'present-perfect', '___ your parents arrived yet?', 'yet', ['Have'], ['Has', 'Did', 'Are'], R.ppEver),
  f('pp-39', 'present-perfect', 'He ___ ill since Monday.', 'since Monday', ['has', 'been'], ['have', 'was', 'being'], R.ppSince),
  f('pp-40', 'present-perfect', 'They ___ that car for a long time.', 'for a long time', ['have', 'had'], ['has', 'having', 'was'], R.ppSince),
  f('pp-41', 'present-perfect', 'I ___ this song three times today.', 'today', ['have', 'heard'], ['has', 'hear', 'hearing'], R.ppForm),
  f('pp-42', 'present-perfect', 'The bus ___ just left.', 'just', ['has'], ['have', 'is', 'did'], R.ppEver),
  f('pp-43', 'present-perfect', 'How many times ___ you been to Paris?', 'How many times', ['have'], ['has', 'did', 'are'], R.ppEver),
  f('pp-44', 'present-perfect', 'My laptop ___ since yesterday.', 'since yesterday', ["hasn't", 'worked'], ["haven't", 'work', 'working'], R.ppSince),
  f('pp-45', 'present-perfect', 'The team ___ every match this season.', 'this season', ['has', 'won'], ['have', 'win', 'winning'], R.ppForm),
  f('pp-46', 'present-perfect', 'I ___ my homework, so I can go out.', 'so I can go out', ['have', 'finished'], ['has', 'finish', 'finishing'], R.ppForm),
  f('pp-47', 'present-perfect', 'They ___ to us recently.', 'recently', ["haven't", 'written'], ["hasn't", 'wrote', 'writing'], R.ppEver),
  f('pp-48', 'present-perfect', 'Anna ___ three languages in her life.', 'in her life', ['has', 'learnt'], ['have', 'learn', 'learning'], R.ppEver),
  f('pp-49', 'present-perfect', '___ anyone seen my phone?', null, ['Has'], ['Have', 'Did', 'Is'], R.ppEver),
  f('pp-50', 'present-perfect', 'The price ___ up twice this year.', 'this year', ['has', 'gone'], ['have', 'went', 'going'], R.ppForm),
  f('pp-51', 'present-perfect', 'We ___ already eaten, thanks.', 'already', ['have'], ['has', 'are', 'did'], R.ppEver),
  f('pp-52', 'present-perfect', 'He ___ that book yet.', 'yet', ["hasn't", 'read'], ["haven't", 'reads', 'reading'], R.ppEver),
  f('pp-53', 'present-perfect', 'I ___ him at the party last Saturday.', 'last Saturday', ['met'], ['have', 'has', 'meet'], R.ppVsPast),
  f('pp-54', 'present-perfect', 'Up to now, nobody ___ complained.', 'Up to now', ['has'], ['have', 'did', 'is'], R.ppEver),

  // ── Articles ───────────────────────────────────────────────────────────────
  f('ar-01', 'articles', 'She is ___ engineer.', 'engineer', ['an'], ['a', 'the', SIN_ARTICULO], R.artAn),
  f('ar-02', 'articles', 'He bought ___ new car.', null, ['a'], ['an', 'the', SIN_ARTICULO], R.artAn),
  f('ar-03', 'articles', 'It takes ___ hour to get there.', 'hour', ['an'], ['a', 'the', SIN_ARTICULO], R.artAn),
  f('ar-04', 'articles', 'He is ___ university student.', 'university', ['a'], ['an', 'the', SIN_ARTICULO], R.artAn),
  f('ar-05', 'articles', 'I saw a dog. ___ dog was very big.', 'I saw a dog', ['The'], ['A', 'An', SIN_ARTICULO], R.artFirst),
  f('ar-06', 'articles', '___ sun is very bright today.', 'sun', ['The'], ['A', 'An', SIN_ARTICULO], R.artThe),
  f('ar-07', 'articles', 'I like ___ music.', 'music', [SIN_ARTICULO], ['a', 'an', 'the'], R.artZero),
  f('ar-08', 'articles', '___ dogs are friendly animals.', 'dogs', [SIN_ARTICULO], ['The', 'A', 'An'], R.artZero),
  f('ar-09', 'articles', 'She plays ___ piano.', 'piano', ['the'], ['a', 'an', SIN_ARTICULO], R.artThe),
  f('ar-10', 'articles', 'He goes to ___ school by bike.', 'school', [SIN_ARTICULO], ['a', 'an', 'the'], R.artInst),
  f('ar-11', 'articles', 'Can you pass me ___ salt, please?', null, ['the'], ['a', 'an', SIN_ARTICULO], R.artThe),
  f('ar-12', 'articles', 'We had ___ umbrella in the car.', 'umbrella', ['an'], ['a', 'the', SIN_ARTICULO], R.artAn),
  f('ar-13', 'articles', '___ Everest is the highest mountain.', 'Everest', [SIN_ARTICULO], ['The', 'A', 'An'], R.artNames),
  f('ar-14', 'articles', 'My mother is ___ best cook in town.', 'best', ['the'], ['a', 'an', SIN_ARTICULO], R.artThe),

  f('ar-15', 'articles', 'She wants to be ___ actress.', 'actress', ['an'], ['a', 'the', SIN_ARTICULO], R.artAn),
  f('ar-16', 'articles', 'He plays ___ football every weekend.', 'football', [SIN_ARTICULO], ['a', 'an', 'the'], R.artMeal),
  f('ar-17', 'articles', 'We had ___ breakfast at eight.', 'breakfast', [SIN_ARTICULO], ['a', 'an', 'the'], R.artMeal),
  f('ar-18', 'articles', 'There is ___ apple on the table.', 'apple', ['an'], ['a', 'the', SIN_ARTICULO], R.artAn),
  f('ar-19', 'articles', 'My father is ___ doctor.', 'doctor', ['a'], ['an', 'the', SIN_ARTICULO], R.artJob),
  f('ar-20', 'articles', '___ Nile is the longest river in Africa.', 'Nile', ['The'], ['A', 'An', SIN_ARTICULO], R.artNames),
  f('ar-21', 'articles', 'She went to ___ hospital to visit her aunt.', 'to visit her aunt', ['the'], ['a', 'an', SIN_ARTICULO], R.artInst),
  f('ar-22', 'articles', 'He gave me ___ advice.', 'advice', [SIN_ARTICULO], ['a', 'an', 'the'], R.artZero),
  f('ar-23', 'articles', '___ children love ice cream.', 'children', [SIN_ARTICULO], ['The', 'A', 'An'], R.artZero),
  f('ar-24', 'articles', 'This is ___ most difficult exercise.', 'most difficult', ['the'], ['a', 'an', SIN_ARTICULO], R.artThe),
  f('ar-25', 'articles', 'She is ___ honest person.', 'honest', ['an'], ['a', 'the', SIN_ARTICULO], R.artAn),
  f('ar-26', 'articles', 'We saw ___ elephant at the zoo.', 'elephant', ['an'], ['a', 'the', SIN_ARTICULO], R.artAn),
  f('ar-27', 'articles', 'I go to ___ bed at eleven.', 'bed', [SIN_ARTICULO], ['a', 'an', 'the'], R.artInst),
  f('ar-28', 'articles', '___ Spain is in the south of Europe.', 'Spain', [SIN_ARTICULO], ['The', 'A', 'An'], R.artNames),
  f('ar-29', 'articles', 'Can you close ___ door, please?', null, ['the'], ['a', 'an', SIN_ARTICULO], R.artThe),
  f('ar-30', 'articles', 'He is ___ European student.', 'European', ['a'], ['an', 'the', SIN_ARTICULO], R.artAn),
  f('ar-31', 'articles', "I don't like ___ coffee.", 'coffee', [SIN_ARTICULO], ['a', 'an', 'the'], R.artZero),
  f('ar-32', 'articles', 'They live in ___ old house.', 'old', ['an'], ['a', 'the', SIN_ARTICULO], R.artAn),
  f('ar-33', 'articles', '___ moon is very big tonight.', 'moon', ['The'], ['A', 'An', SIN_ARTICULO], R.artThe),
  f('ar-34', 'articles', 'My brother works as ___ teacher.', 'teacher', ['a'], ['an', 'the', SIN_ARTICULO], R.artJob),

  f('ar-35', 'articles', 'He wants to be ___ astronaut.', 'astronaut', ['an'], ['a', 'the', SIN_ARTICULO], R.artJob),
  f('ar-36', 'articles', 'We go to ___ church on Sundays.', 'church', [SIN_ARTICULO], ['a', 'an', 'the'], R.artInst),
  f('ar-37', 'articles', 'She had ___ lunch with her boss.', 'lunch', [SIN_ARTICULO], ['a', 'an', 'the'], R.artMeal),
  f('ar-38', 'articles', 'That was ___ unusual answer.', 'unusual', ['an'], ['a', 'the', SIN_ARTICULO], R.artAn),
  f('ar-39', 'articles', 'My uncle is ___ pilot.', 'pilot', ['a'], ['an', 'the', SIN_ARTICULO], R.artJob),
  f('ar-40', 'articles', '___ Alps are in Europe.', 'Alps', ['The'], ['A', 'An', SIN_ARTICULO], R.artNames),
  f('ar-41', 'articles', 'I play ___ guitar in a band.', 'guitar', ['the'], ['a', 'an', SIN_ARTICULO], R.artThe),
  f('ar-42', 'articles', 'She gave me ___ information about the trip.', 'information', [SIN_ARTICULO], ['a', 'an', 'the'], R.artZero),
  f('ar-43', 'articles', 'There was ___ accident on the road.', 'accident', ['an'], ['a', 'the', SIN_ARTICULO], R.artAn),
  f('ar-44', 'articles', 'He is ___ tallest boy in the class.', 'tallest', ['the'], ['a', 'an', SIN_ARTICULO], R.artThe),
  f('ar-45', 'articles', '___ water boils at 100 degrees.', 'water', [SIN_ARTICULO], ['The', 'A', 'An'], R.artZero),
  f('ar-46', 'articles', 'They stayed in ___ hotel near the beach.', 'hotel', ['a'], ['an', 'the', SIN_ARTICULO], R.artAn),
  f('ar-47', 'articles', 'We visited ___ United Kingdom last year.', 'United Kingdom', ['the'], ['a', 'an', SIN_ARTICULO], R.artNames),
  f('ar-48', 'articles', 'She is ___ only child.', 'only', ['an'], ['a', 'the', SIN_ARTICULO], R.artAn),
  f('ar-49', 'articles', "I don't have ___ time for this.", 'time', [SIN_ARTICULO], ['a', 'an', 'the'], R.artZero),
  f('ar-50', 'articles', 'Look at ___ sky!', 'sky', ['the'], ['a', 'an', SIN_ARTICULO], R.artThe),
  f('ar-51', 'articles', 'He went to ___ prison for five years.', 'for five years', [SIN_ARTICULO], ['a', 'an', 'the'], R.artInst),
  f('ar-52', 'articles', 'My sister works as ___ nurse.', 'nurse', ['a'], ['an', 'the', SIN_ARTICULO], R.artJob),
  f('ar-53', 'articles', '___ Japanese eat a lot of fish.', 'Japanese', ['The'], ['A', 'An', SIN_ARTICULO], R.artNations),
  f('ar-54', 'articles', 'She bought ___ orange dress.', 'orange', ['an'], ['a', 'the', SIN_ARTICULO], R.artAn),

  // ── Passive ────────────────────────────────────────────────────────────────
  f('pv-01', 'passive', 'The window ___ broken by the boy.', 'by the boy', ['was'], ['is', 'were', 'has'], R.pasBy),
  f('pv-02', 'passive', 'English ___ all over the world.', null, ['is', 'spoken'], ['are', 'speaks', 'speaking'], R.pasForm),
  f('pv-03', 'passive', 'The letters ___ yesterday.', 'yesterday', ['were', 'sent'], ['was', 'send', 'sending'], R.pasAgree),
  f('pv-04', 'passive', 'This house ___ in 1920.', 'in 1920', ['was', 'built'], ['were', 'build', 'building'], R.pasTense),
  f('pv-05', 'passive', 'The car ___ every week.', 'every week', ['is', 'washed'], ['are', 'was', 'washing'], R.pasTense),
  f('pv-06', 'passive', 'Hamlet ___ by Shakespeare.', 'by Shakespeare', ['was', 'written'], ['were', 'wrote', 'writing'], R.pasBy),
  f('pv-07', 'passive', 'The rooms ___ cleaned every morning.', 'rooms', ['are'], ['is', 'was', 'be'], R.pasAgree),
  f('pv-08', 'passive', 'My bike ___ last night.', 'last night', ['was', 'stolen'], ['were', 'stole', 'stealing'], R.pasTense),
  f('pv-09', 'passive', 'These photos ___ by my father.', 'These photos', ['were', 'taken'], ['was', 'took', 'taking'], R.pasAgree),
  f('pv-10', 'passive', 'The results ___ tomorrow.', 'tomorrow', ['will', 'be', 'announced'], ['are', 'was', 'announcing'], R.pasFuture),
  f('pv-11', 'passive', 'Rice ___ in China.', null, ['is', 'grown'], ['are', 'grows', 'growing'], R.pasForm),
  f('pv-12', 'passive', 'The bridge ___ two years ago.', 'two years ago', ['was', 'repaired'], ['were', 'repair', 'repairing'], R.pasTense),
  f('pv-13', 'passive', 'A new hospital ___ next year.', 'next year', ['will', 'be', 'built'], ['is', 'was', 'building'], R.pasFuture),
  f('pv-14', 'passive', 'The thief ___ by the police.', 'by the police', ['was', 'caught'], ['were', 'catch', 'catching'], R.pasBy),
  f('pv-15', 'passive', 'The homework ___ every Friday.', 'every Friday', ['is', 'collected'], ['are', 'was', 'collecting'], R.pasTense),
  f('pv-16', 'passive', 'These cars ___ in Germany.', 'These cars', ['are', 'made'], ['is', 'makes', 'making'], R.pasAgree),
  f('pv-17', 'passive', 'The museum ___ in 1890.', 'in 1890', ['was', 'opened'], ['were', 'opens', 'opening'], R.pasTense),
  f('pv-18', 'passive', 'The windows ___ last week.', 'last week', ['were', 'cleaned'], ['was', 'clean', 'cleaning'], R.pasAgree),
  f('pv-19', 'passive', 'This song ___ by millions of people.', null, ['is', 'loved'], ['are', 'loves', 'loving'], R.pasForm),
  f('pv-20', 'passive', 'The winner ___ tomorrow.', 'tomorrow', ['will', 'be', 'chosen'], ['is', 'was', 'choosing'], R.pasFuture),
  f('pv-21', 'passive', 'The letter ___ this morning.', 'this morning', ['was', 'delivered'], ['were', 'delivers', 'delivering'], R.pasTense),
  f('pv-22', 'passive', 'Coffee ___ in Brazil.', null, ['is', 'produced'], ['are', 'produces', 'producing'], R.pasForm),
  f('pv-23', 'passive', 'The tickets ___ online.', 'tickets', ['are', 'sold'], ['is', 'sells', 'selling'], R.pasAgree),
  f('pv-24', 'passive', 'The old tree ___ by the storm.', 'by the storm', ['was', 'destroyed'], ['were', 'destroys', 'destroying'], R.pasBy),
  f('pv-25', 'passive', 'The results ___ by email.', null, ['will', 'be', 'sent'], ['are', 'was', 'sending'], R.pasFuture),
  f('pv-26', 'passive', 'This picture ___ by my grandmother.', 'by my grandmother', ['was', 'painted'], ['were', 'paints', 'painting'], R.pasBy),
  f('pv-27', 'passive', 'The problem ___ in five minutes.', null, ['was', 'solved'], ['were', 'solves', 'solving'], R.pasTense),
  f('pv-28', 'passive', 'Our school ___ every summer.', 'every summer', ['is', 'painted'], ['are', 'paints', 'painting'], R.pasTense),
  f('pv-29', 'passive', 'The bikes ___ in the garage.', 'bikes', ['are', 'kept'], ['is', 'keeps', 'keeping'], R.pasAgree),
  f('pv-30', 'passive', 'The film ___ in New Zealand.', null, ['was', 'filmed'], ['were', 'films', 'filming'], R.pasTense),
  f('pv-31', 'passive', 'Millions of emails ___ every day.', 'every day', ['are', 'sent'], ['is', 'sends', 'sending'], R.pasAgree),
  f('pv-32', 'passive', 'The cake ___ by my mother.', 'by my mother', ['was', 'made'], ['were', 'makes', 'making'], R.pasBy),
  f('pv-33', 'passive', 'The road ___ next month.', 'next month', ['will', 'be', 'repaired'], ['is', 'was', 'repairing'], R.pasFuture),
  f('pv-34', 'passive', 'The keys ___ on the table.', 'keys', ['were', 'left'], ['was', 'leaves', 'leaving'], R.pasAgree),
  f('pv-35', 'passive', 'The trees ___ every spring.', 'every spring', ['are', 'cut'], ['is', 'cuts', 'cutting'], R.pasTense),
  f('pv-36', 'passive', 'The prize ___ to the winner tomorrow.', 'tomorrow', ['will', 'be', 'given'], ['is', 'was', 'giving'], R.pasFuture),
  f('pv-37', 'passive', 'This bridge ___ in 1975.', 'in 1975', ['was', 'finished'], ['were', 'finishes', 'finishing'], R.pasTense),
  f('pv-38', 'passive', 'The report ___ by two teachers.', 'by two teachers', ['was', 'checked'], ['were', 'checks', 'checking'], R.pasBy),
  f('pv-39', 'passive', 'Our uniforms ___ every year.', 'every year', ['are', 'replaced'], ['is', 'replaces', 'replacing'], R.pasAgree),
  f('pv-40', 'passive', 'The museum ___ at six every day.', 'every day', ['is', 'closed'], ['are', 'closes', 'closing'], R.pasTense),
  f('pv-41', 'passive', 'These songs ___ in the seventies.', 'in the seventies', ['were', 'recorded'], ['was', 'records', 'recording'], R.pasAgree),
  f('pv-42', 'passive', 'The email ___ by mistake.', 'by mistake', ['was', 'deleted'], ['were', 'deletes', 'deleting'], R.pasTense),
  f('pv-43', 'passive', 'A new library ___ next summer.', 'next summer', ['will', 'be', 'opened'], ['is', 'was', 'opening'], R.pasFuture),
  f('pv-44', 'passive', 'The tickets ___ in ten minutes.', 'tickets', ['were', 'sold'], ['was', 'sells', 'selling'], R.pasAgree),
  f('pv-45', 'passive', 'This word ___ in modern English.', null, ["isn't", 'used'], ["aren't", 'uses', 'using'], R.pasForm),
  f('pv-46', 'passive', 'The children ___ to the zoo by their teacher.', 'by their teacher', ['were', 'taken'], ['was', 'takes', 'taking'], R.pasBy),
  f('pv-47', 'passive', 'Breakfast ___ from seven to ten.', 'from seven to ten', ['is', 'served'], ['are', 'serves', 'serving'], R.pasTense),
  f('pv-48', 'passive', 'My car ___ every winter.', 'every winter', ['is', 'checked'], ['are', 'checks', 'checking'], R.pasTense),
  f('pv-49', 'passive', 'The letters ___ tomorrow morning.', 'tomorrow morning', ['will', 'be', 'posted'], ['are', 'was', 'posting'], R.pasFuture),
  f('pv-50', 'passive', 'That building ___ by a famous architect.', 'by a famous architect', ['was', 'designed'], ['were', 'designs', 'designing'], R.pasBy),
  f('pv-51', 'passive', 'These books ___ by children.', 'These books', ['are', 'read'], ['is', 'reads', 'reading'], R.pasAgree),
  f('pv-52', 'passive', 'The window ___ during the storm.', 'during the storm', ['was', 'broken'], ['were', 'breaks', 'breaking'], R.pasTense),
  f('pv-53', 'passive', 'The results ___ on the website every Friday.', 'every Friday', ['are', 'published'], ['is', 'publishes', 'publishing'], R.pasTense),
  f('pv-54', 'passive', 'The thieves ___ the next day.', 'the next day', ['were', 'arrested'], ['was', 'arrest', 'arresting'], R.pasAgree),
]

export function frasesDe(tema) {
  return tema && tema !== MEZCLA ? FRASES.filter(fr => fr.tema === tema) : FRASES
}

// Baraja una copia (Fisher-Yates) con el `rand` que se le pase, para que un
// reto diario pueda sembrarlo por fecha y salga igual para todo el mundo.
function barajar(arr, rand) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    const t = a[i]; a[i] = a[j]; a[j] = t
  }
  return a
}

// `evitar` son los ids de las últimas frases jugadas: se saltan mientras
// queden otras. Sin esto, con 14 frases por tema, repetir dentro de la misma
// partida es constante y deja de enseñar nada nuevo.
export function genRound(tema, { rand = Math.random, evitar = [] } = {}) {
  const pool = frasesDe(tema)
  if (pool.length === 0) return null
  const frescas = pool.filter(fr => !evitar.includes(fr.id))
  const elegibles = frescas.length > 0 ? frescas : pool
  const fr = elegibles[Math.floor(rand() * elegibles.length)]
  const [pre, post] = fr.texto.split('___')
  return {
    id: fr.id,
    tema: fr.tema,
    pre,
    post,
    pista: fr.pista,
    sol: fr.sol,
    // Un distractor que coincida con una pieza de la solución se cae: con la
    // misma pieza dos veces, colocar "la otra" sería en realidad correcto y el
    // juego marcaría un fallo que no lo es.
    chips: barajar([...fr.sol, ...fr.dis.filter(d => !fr.sol.includes(d))], rand),
    rule: fr.rule,
  }
}

export function esCorrecta(round, piezas) {
  if (!round || piezas.length !== round.sol.length) return false
  return piezas.every((p, i) => p.toLowerCase() === round.sol[i].toLowerCase())
}

// La frase ya resuelta, para enseñarla entera al revelar. El artículo cero no
// se escribe (es justo lo que enseña: ahí no va nada), y por eso hay que
// recoger el espacio que deja antes de la puntuación.
export function solucionTexto(round) {
  const hueco = round.sol.filter(p => p !== SIN_ARTICULO).join(' ')
  return `${round.pre}${hueco}${round.post}`.replace(/\s+([.,?!])/g, '$1').replace(/\s{2,}/g, ' ').trim()
}
