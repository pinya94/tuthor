// ¿Quién lo Pensó? (filosofía · historia de la filosofía, ESO y Bachillerato).
//
// Ideas parafraseadas (no citas largas) de los filósofos que se estudian, de
// Tales a Arendt. Se pregunta:
//   idea      quién defendió esta idea
//   concepto  cuál es el concepto clave de este filósofo
//   corriente a qué corriente o escuela pertenece
//   orden     cuál de cuatro filósofos vivió antes
//
// Como en el examen de filosofía, cada idea se atribuye a UN autor y los
// distractores son de otros; las ideas que comparten varios (la dialéctica de
// Hegel y de Marx, el contrato social…) llevan `tambien`, y esos autores no
// salen como opción falsa.

const T = (es, en, ca) => ({ es, en, ca })
const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
export const tx = (o, l) => o[l] ?? o.es

// [id, nombre, nace, muere (negativos = a. C.), época, corriente, concepto, ideas [[texto, también]]]
const F = (id, nombre, nace, muere, epoca, corriente, concepto, ideas) => ({ id, nombre, nace, muere, epoca, corriente, concepto, ideas })
export const FILOSOFOS = [
  F('tales', T('Tales de Mileto', 'Thales of Miletus', 'Tales de Milet'), -624, -546, 'antigua', 'presocraticos',
    T('El arché es el agua', 'The arché is water', 'L’arkhé és l’aigua'), [
      [T('El principio (arché) del que nacen todas las cosas es el agua.', 'The first principle (arché) from which everything comes is water.', 'El principi (arkhé) del qual neixen totes les coses és l’aigua.'), []],
      [T('Se le considera el primer filósofo y se dice que predijo un eclipse de sol.', 'He is considered the first philosopher and is said to have predicted a solar eclipse.', 'Se’l considera el primer filòsof i es diu que va predir un eclipsi de sol.'), []],
    ]),
  F('heraclito', T('Heráclito', 'Heraclitus', 'Heràclit'), -535, -475, 'antigua', 'presocraticos',
    T('Todo fluye (panta rei)', 'Everything flows (panta rhei)', 'Tot flueix (panta rei)'), [
      [T('Nadie se baña dos veces en el mismo río: todo cambia sin parar.', 'No one bathes twice in the same river: everything is always changing.', 'Ningú no es banya dues vegades al mateix riu: tot canvia sense parar.'), []],
      [T('El fuego es el principio de todo, y la realidad es una lucha de contrarios.', 'Fire is the principle of everything, and reality is a struggle of opposites.', 'El foc és el principi de tot, i la realitat és una lluita de contraris.'), []],
    ]),
  F('parmenides', T('Parménides', 'Parmenides', 'Parmènides'), -515, -450, 'antigua', 'presocraticos',
    T('El ser es y el no ser no es', 'Being is and non-being is not', 'L’ésser és i el no-ésser no és'), [
      [T('El cambio es una ilusión: el ser es único, eterno e inmóvil.', 'Change is an illusion: being is one, eternal and unmoving.', 'El canvi és una il·lusió: l’ésser és únic, etern i immòbil.'), []],
    ]),
  F('democrito', T('Demócrito', 'Democritus', 'Demòcrit'), -460, -370, 'antigua', 'atomismo',
    T('Átomos y vacío', 'Atoms and the void', 'Àtoms i buit'), [
      [T('Todo está formado por partículas indivisibles, los átomos, que se mueven en el vacío.', 'Everything is made of indivisible particles, atoms, moving in the void.', 'Tot està format per partícules indivisibles, els àtoms, que es mouen en el buit.'), []],
    ]),
  F('protagoras', T('Protágoras', 'Protagoras', 'Protàgores'), -485, -411, 'antigua', 'sofistas',
    T('El hombre es la medida de todas las cosas', 'Man is the measure of all things', 'L’home és la mesura de totes les coses'), [
      [T('No hay una verdad absoluta: cada persona es la medida de lo que es verdad para ella.', 'There is no absolute truth: each person is the measure of what is true for them.', 'No hi ha una veritat absoluta: cada persona és la mesura del que és veritat per a ella.'), []],
      [T('Cobraba por enseñar retórica a los jóvenes que querían triunfar en la asamblea de Atenas.', 'He charged money to teach rhetoric to young men who wanted to succeed in the Athenian assembly.', 'Cobrava per ensenyar retòrica als joves que volien triomfar a l’assemblea d’Atenes.'), []],
    ]),
  F('socrates', T('Sócrates', 'Socrates', 'Sòcrates'), -470, -399, 'antigua', 'clasica',
    T('Solo sé que no sé nada', 'I know that I know nothing', 'Només sé que no sé res'), [
      [T('No escribió nada: lo conocemos por los diálogos de su discípulo Platón.', 'He wrote nothing: we know him through the dialogues of his pupil Plato.', 'No va escriure res: el coneixem pels diàlegs del seu deixeble Plató.'), []],
      [T('Preguntaba en la plaza hasta que el otro descubría su propia ignorancia: la mayéutica.', 'He questioned people in the square until they discovered their own ignorance: maieutics.', 'Preguntava a la plaça fins que l’altre descobria la seva pròpia ignorància: la maièutica.'), []],
      [T('Quien conoce el bien obra bien: el mal nace de la ignorancia.', 'Whoever knows the good does good: evil comes from ignorance.', 'Qui coneix el bé obra bé: el mal neix de la ignorància.'), ['platon']],
    ]),
  F('platon', T('Platón', 'Plato', 'Plató'), -427, -347, 'antigua', 'clasica',
    T('El mundo de las Ideas', 'The world of Forms', 'El món de les Idees'), [
      [T('Hay dos mundos: el sensible, que cambia, y el de las Ideas, eterno y perfecto.', 'There are two worlds: the changing world of the senses and the eternal, perfect world of Forms.', 'Hi ha dos móns: el sensible, que canvia, i el de les Idees, etern i perfecte.'), []],
      [T('En el mito de la caverna, los prisioneros toman las sombras por la realidad.', 'In the allegory of the cave, the prisoners take shadows for reality.', 'Al mite de la caverna, els presoners prenen les ombres per la realitat.'), []],
      [T('En la ciudad justa deben gobernar los filósofos.', 'In the just city, philosophers should rule.', 'A la ciutat justa han de governar els filòsofs.'), []],
    ]),
  F('aristoteles', T('Aristóteles', 'Aristotle', 'Aristòtil'), -384, -322, 'antigua', 'clasica',
    T('Sustancia: materia y forma', 'Substance: matter and form', 'Substància: matèria i forma'), [
      [T('Las cosas están hechas de materia y forma, y no hay un mundo de las Ideas separado.', 'Things are made of matter and form, and there is no separate world of Forms.', 'Les coses estan fetes de matèria i forma, i no hi ha un món de les Idees separat.'), []],
      [T('El ser humano es por naturaleza un animal político, que vive en la polis.', 'Human beings are by nature political animals, who live in the polis.', 'L’ésser humà és per naturalesa un animal polític, que viu a la polis.'), []],
      [T('La virtud es el término medio entre dos extremos: el valor está entre la cobardía y la temeridad.', 'Virtue is the mean between two extremes: courage lies between cowardice and recklessness.', 'La virtut és el terme mitjà entre dos extrems: el valor és entre la covardia i la temeritat.'), []],
    ]),
  F('epicuro', T('Epicuro', 'Epicurus', 'Epicur'), -341, -270, 'antigua', 'helenismo',
    T('La felicidad es el placer moderado', 'Happiness is moderate pleasure', 'La felicitat és el plaer moderat'), [
      [T('La felicidad es no sufrir en el cuerpo ni inquietarse en el alma (la ataraxia), con placeres sencillos.', 'Happiness is having no pain in the body and no disturbance in the soul (ataraxia), with simple pleasures.', 'La felicitat és no patir en el cos ni inquietar-se en l’ànima (l’ataràxia), amb plaers senzills.'), []],
      [T('No hay que temer a la muerte: cuando ella está, nosotros ya no estamos.', 'There is no need to fear death: when it is here, we are no longer here.', 'No cal tenir por de la mort: quan ella hi és, nosaltres ja no hi som.'), []],
    ]),
  F('zenon', T('Zenón de Citio', 'Zeno of Citium', 'Zenó de Cítion'), -334, -262, 'antigua', 'helenismo',
    T('Vivir de acuerdo con la naturaleza', 'Live in agreement with nature', 'Viure d’acord amb la naturalesa'), [
      [T('Fundó la escuela que se reunía en un pórtico pintado de Atenas: la Stoa.', 'He founded the school that met at a painted porch in Athens: the Stoa.', 'Va fundar l’escola que es reunia en un pòrtic pintat d’Atenes: l’Stoa.'), []],
      [T('Hay que aceptar con serenidad lo que no depende de nosotros y dominar las pasiones.', 'We must calmly accept what does not depend on us and master our passions.', 'Cal acceptar amb serenitat el que no depèn de nosaltres i dominar les passions.'), []],
    ]),
  F('agustin', T('Agustín de Hipona', 'Augustine of Hippo', 'Agustí d’Hipona'), 354, 430, 'antigua', 'medieval',
    T('Cree para entender', 'Believe so that you may understand', 'Creu per entendre'), [
      [T('«Cree para entender»: la fe guía a la razón hacia la verdad.', '“Believe so that you may understand”: faith guides reason towards the truth.', '«Creu per entendre»: la fe guia la raó cap a la veritat.'), []],
      [T('En La ciudad de Dios distingue la ciudad terrena de la ciudad de Dios.', 'In The City of God he distinguishes the earthly city from the city of God.', 'A La ciutat de Déu distingeix la ciutat terrenal de la ciutat de Déu.'), []],
    ]),
  F('tomas', T('Tomás de Aquino', 'Thomas Aquinas', 'Tomàs d’Aquino'), 1225, 1274, 'antigua', 'medieval',
    T('Las cinco vías', 'The five ways', 'Les cinc vies'), [
      [T('Demostró la existencia de Dios con cinco vías que parten de lo que vemos en el mundo.', 'He proved God’s existence with five ways that start from what we see in the world.', 'Va demostrar l’existència de Déu amb cinc vies que parteixen del que veiem al món.'), []],
      [T('Adaptó la filosofía de Aristóteles al pensamiento cristiano.', 'He adapted Aristotle’s philosophy to Christian thought.', 'Va adaptar la filosofia d’Aristòtil al pensament cristià.'), []],
    ]),
  F('ockham', T('Guillermo de Ockham', 'William of Ockham', 'Guillem d’Ockham'), 1287, 1347, 'antigua', 'medieval',
    T('La navaja de Ockham', 'Ockham’s razor', 'La navalla d’Ockham'), [
      [T('No hay que multiplicar los entes sin necesidad: la explicación más simple suele ser la buena.', 'Entities should not be multiplied without necessity: the simplest explanation is usually right.', 'No cal multiplicar els ens sense necessitat: l’explicació més simple sol ser la bona.'), []],
      [T('Solo existen los individuos; los universales son nombres (nominalismo).', 'Only individuals exist; universals are just names (nominalism).', 'Només existeixen els individus; els universals són noms (nominalisme).'), []],
    ]),
  F('descartes', T('René Descartes', 'René Descartes', 'René Descartes'), 1596, 1650, 'moderna', 'racionalismo',
    T('Pienso, luego existo', 'I think, therefore I am', 'Penso, per tant existeixo'), [
      [T('Dudó de todo hasta encontrar una verdad indudable: pienso, luego existo.', 'He doubted everything until he found a truth beyond doubt: I think, therefore I am.', 'Va dubtar de tot fins a trobar una veritat indubtable: penso, per tant existeixo.'), []],
      [T('Distinguió la sustancia que piensa (la mente) de la sustancia extensa (el cuerpo).', 'He distinguished the thinking substance (the mind) from the extended substance (the body).', 'Va distingir la substància que pensa (la ment) de la substància extensa (el cos).'), []],
    ]),
  F('hobbes', T('Thomas Hobbes', 'Thomas Hobbes', 'Thomas Hobbes'), 1588, 1679, 'moderna', 'contractualismo',
    T('El hombre es un lobo para el hombre', 'Man is a wolf to man', 'L’home és un llop per a l’home'), [
      [T('En el estado de naturaleza hay una guerra de todos contra todos.', 'In the state of nature there is a war of all against all.', 'En l’estat de naturalesa hi ha una guerra de tots contra tots.'), []],
      [T('Para tener paz, los hombres ceden su poder a un soberano absoluto: el Leviatán.', 'To have peace, people hand their power to an absolute sovereign: the Leviathan.', 'Per tenir pau, els homes cedeixen el seu poder a un sobirà absolut: el Leviatan.'), []],
    ]),
  F('locke', T('John Locke', 'John Locke', 'John Locke'), 1632, 1704, 'moderna', 'empirismo',
    T('La mente es una hoja en blanco', 'The mind is a blank slate', 'La ment és un full en blanc'), [
      [T('Al nacer, la mente es una hoja en blanco (tabula rasa): todo lo aprendemos por la experiencia.', 'At birth the mind is a blank slate (tabula rasa): we learn everything through experience.', 'En néixer, la ment és un full en blanc (tabula rasa): tot ho aprenem per l’experiència.'), []],
      [T('El gobierno nace del consentimiento y debe proteger la vida, la libertad y la propiedad.', 'Government comes from consent and must protect life, liberty and property.', 'El govern neix del consentiment i ha de protegir la vida, la llibertat i la propietat.'), []],
    ]),
  F('hume', T('David Hume', 'David Hume', 'David Hume'), 1711, 1776, 'moderna', 'empirismo',
    T('La causalidad es costumbre', 'Causation is custom', 'La causalitat és costum'), [
      [T('Nunca vemos la causa: solo que un hecho sigue a otro, y la costumbre nos hace esperarlo.', 'We never see the cause: only that one event follows another, and custom makes us expect it.', 'Mai no veiem la causa: només que un fet en segueix un altre, i el costum ens el fa esperar.'), []],
      [T('Del «es» no se puede deducir el «debe»: la moral nace del sentimiento, no de la razón.', 'You cannot derive “ought” from “is”: morality comes from feeling, not reason.', 'Del «és» no se’n pot deduir el «ha de»: la moral neix del sentiment, no de la raó.'), []],
    ]),
  F('rousseau', T('Jean-Jacques Rousseau', 'Jean-Jacques Rousseau', 'Jean-Jacques Rousseau'), 1712, 1778, 'moderna', 'contractualismo',
    T('La voluntad general', 'The general will', 'La voluntat general'), [
      [T('El ser humano nace bueno y es la sociedad la que lo corrompe.', 'Human beings are born good and it is society that corrupts them.', 'L’ésser humà neix bo i és la societat la que el corromp.'), []],
      [T('La soberanía reside en la voluntad general del pueblo, que expresa el contrato social.', 'Sovereignty lies in the general will of the people, expressed by the social contract.', 'La sobirania resideix en la voluntat general del poble, que expressa el contracte social.'), ['hobbes', 'locke']],
    ]),
  F('kant', T('Immanuel Kant', 'Immanuel Kant', 'Immanuel Kant'), 1724, 1804, 'moderna', 'ilustracion',
    T('El imperativo categórico', 'The categorical imperative', 'L’imperatiu categòric'), [
      [T('Obra de modo que la norma de tu acción pueda valer como ley universal.', 'Act so that the rule of your action could hold as a universal law.', 'Obra de manera que la norma de la teva acció pugui valer com a llei universal.'), []],
      [T('«¡Atrévete a saber!»: la Ilustración es salir de la minoría de edad.', '“Dare to know!”: the Enlightenment is leaving immaturity behind.', '«Gosa saber!»: la Il·lustració és sortir de la minoria d’edat.'), []],
      [T('Conocemos las cosas como se nos aparecen (fenómenos), no como son en sí mismas.', 'We know things as they appear to us (phenomena), not as they are in themselves.', 'Coneixem les coses com se’ns apareixen (fenòmens), no com són en si mateixes.'), []],
    ]),
  F('hegel', T('G. W. F. Hegel', 'G. W. F. Hegel', 'G. W. F. Hegel'), 1770, 1831, 'moderna', 'idealismo',
    T('La dialéctica del Espíritu', 'The dialectic of Spirit', 'La dialèctica de l’Esperit'), [
      [T('Todo lo real es racional, y todo lo racional es real.', 'All that is real is rational, and all that is rational is real.', 'Tot allò real és racional, i tot allò racional és real.'), []],
      [T('La historia es el despliegue del Espíritu hacia la libertad, avanzando por contradicciones.', 'History is the unfolding of Spirit towards freedom, moving forward through contradictions.', 'La història és el desplegament de l’Esperit cap a la llibertat, avançant per contradiccions.'), ['marx']],
    ]),
  F('marx', T('Karl Marx', 'Karl Marx', 'Karl Marx'), 1818, 1883, 'moderna', 'marxismo',
    T('La lucha de clases', 'Class struggle', 'La lluita de classes'), [
      [T('La historia de la humanidad es la historia de la lucha de clases.', 'The history of humanity is the history of class struggle.', 'La història de la humanitat és la història de la lluita de classes.'), []],
      [T('El obrero está alienado: lo que produce con su trabajo no le pertenece.', 'The worker is alienated: what he produces with his labour does not belong to him.', 'L’obrer està alienat: el que produeix amb la seva feina no li pertany.'), []],
      [T('Los filósofos han interpretado el mundo; de lo que se trata es de transformarlo.', 'Philosophers have interpreted the world; the point is to change it.', 'Els filòsofs han interpretat el món; del que es tracta és de transformar-lo.'), []],
    ]),
  F('mill', T('John Stuart Mill', 'John Stuart Mill', 'John Stuart Mill'), 1806, 1873, 'moderna', 'utilitarismo',
    T('La mayor felicidad para el mayor número', 'The greatest happiness of the greatest number', 'La màxima felicitat per al màxim nombre'), [
      [T('Una acción es buena si produce la mayor felicidad para el mayor número de personas.', 'An action is good if it produces the greatest happiness for the greatest number of people.', 'Una acció és bona si produeix la màxima felicitat per al màxim nombre de persones.'), []],
      [T('La libertad de alguien solo se puede limitar para evitar que haga daño a otros.', 'Someone’s freedom may only be limited to stop them harming others.', 'La llibertat d’algú només es pot limitar per evitar que faci mal a altres.'), []],
    ]),
  F('nietzsche', T('Friedrich Nietzsche', 'Friedrich Nietzsche', 'Friedrich Nietzsche'), 1844, 1900, 'moderna', 'vitalismo',
    T('Dios ha muerto', 'God is dead', 'Déu ha mort'), [
      [T('«Dios ha muerto»: los valores tradicionales han perdido su fundamento.', '“God is dead”: traditional values have lost their foundation.', '«Déu ha mort»: els valors tradicionals han perdut el seu fonament.'), []],
      [T('Propone el superhombre, que crea sus propios valores y dice sí a la vida.', 'He proposes the overman, who creates his own values and says yes to life.', 'Proposa el superhome, que crea els seus propis valors i diu sí a la vida.'), []],
    ]),
  F('ortega', T('José Ortega y Gasset', 'José Ortega y Gasset', 'José Ortega y Gasset'), 1883, 1955, 'moderna', 'vitalismo',
    T('Yo soy yo y mi circunstancia', 'I am I and my circumstance', 'Jo sóc jo i la meva circumstància'), [
      [T('«Yo soy yo y mi circunstancia»: no se puede separar a la persona de su mundo.', '“I am I and my circumstance”: a person cannot be separated from their world.', '«Jo sóc jo i la meva circumstància»: no es pot separar la persona del seu món.'), []],
      [T('La razón tiene que estar al servicio de la vida: es el raciovitalismo.', 'Reason must serve life: this is ratio-vitalism.', 'La raó ha d’estar al servei de la vida: és el raciovitalisme.'), []],
    ]),
  F('sartre', T('Jean-Paul Sartre', 'Jean-Paul Sartre', 'Jean-Paul Sartre'), 1905, 1980, 'moderna', 'existencialismo',
    T('La existencia precede a la esencia', 'Existence precedes essence', 'L’existència precedeix l’essència'), [
      [T('La existencia precede a la esencia: primero existimos y después nos hacemos.', 'Existence precedes essence: first we exist and then we make ourselves.', 'L’existència precedeix l’essència: primer existim i després ens fem.'), []],
      [T('Estamos condenados a ser libres: siempre somos responsables de lo que elegimos.', 'We are condemned to be free: we are always responsible for what we choose.', 'Estem condemnats a ser lliures: sempre som responsables del que triem.'), []],
    ]),
  F('beauvoir', T('Simone de Beauvoir', 'Simone de Beauvoir', 'Simone de Beauvoir'), 1908, 1986, 'moderna', 'existencialismo',
    T('No se nace mujer: se llega a serlo', 'One is not born a woman: one becomes one', 'No es neix dona: s’hi arriba a ser'), [
      [T('«No se nace mujer: se llega a serlo»; en El segundo sexo analiza la opresión de las mujeres.', '“One is not born, but becomes, a woman”; in The Second Sex she analyses women’s oppression.', '«No es neix dona: s’hi arriba a ser»; a El segon sexe analitza l’opressió de les dones.'), []],
    ]),
  F('arendt', T('Hannah Arendt', 'Hannah Arendt', 'Hannah Arendt'), 1906, 1975, 'moderna', 'politica',
    T('La banalidad del mal', 'The banality of evil', 'La banalitat del mal'), [
      [T('Tras asistir al juicio de Eichmann habló de la banalidad del mal.', 'After attending Eichmann’s trial she spoke of the banality of evil.', 'Després d’assistir al judici d’Eichmann va parlar de la banalitat del mal.'), []],
      [T('Estudió los orígenes del totalitarismo, de los nazis al estalinismo.', 'She studied the origins of totalitarianism, from the Nazis to Stalinism.', 'Va estudiar els orígens del totalitarisme, dels nazis a l’estalinisme.'), []],
    ]),
]
export const filosofo = id => FILOSOFOS.find(f => f.id === id)

export const CORRIENTES = {
  presocraticos: T('Presocráticos', 'Presocratics', 'Presocràtics'),
  atomismo: T('Atomismo', 'Atomism', 'Atomisme'),
  sofistas: T('Sofistas', 'Sophists', 'Sofistes'),
  clasica: T('Filosofía clásica griega', 'Classical Greek philosophy', 'Filosofia clàssica grega'),
  helenismo: T('Helenismo', 'Hellenistic philosophy', 'Hel·lenisme'),
  medieval: T('Filosofía medieval cristiana', 'Medieval Christian philosophy', 'Filosofia medieval cristiana'),
  racionalismo: T('Racionalismo', 'Rationalism', 'Racionalisme'),
  empirismo: T('Empirismo', 'Empiricism', 'Empirisme'),
  contractualismo: T('Contractualismo', 'Social contract theory', 'Contractualisme'),
  ilustracion: T('Ilustración (criticismo)', 'Enlightenment (critical philosophy)', 'Il·lustració (criticisme)'),
  idealismo: T('Idealismo alemán', 'German idealism', 'Idealisme alemany'),
  marxismo: T('Materialismo histórico (marxismo)', 'Historical materialism (Marxism)', 'Materialisme històric (marxisme)'),
  utilitarismo: T('Utilitarismo', 'Utilitarianism', 'Utilitarisme'),
  vitalismo: T('Vitalismo', 'Vitalism', 'Vitalisme'),
  existencialismo: T('Existencialismo', 'Existentialism', 'Existencialisme'),
  politica: T('Filosofía política del siglo XX', '20th-century political philosophy', 'Filosofia política del segle XX'),
}

// Corrientes a las que TAMBIÉN se adscribe un autor: no salen como opción falsa.
export const TAMBIEN_CORRIENTE = { locke: ['contractualismo'], hobbes: ['empirismo'], rousseau: ['ilustracion'] }

export const NIVELES = {
  facil:   { tipos: ['idea', 'idea', 'concepto'] },
  medio:   { tipos: ['idea', 'idea', 'concepto', 'corriente'] },
  dificil: { tipos: ['idea', 'concepto', 'corriente', 'orden'] },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
let seq = 0
const recientes = []

// `epoca` limita a 'antigua' o 'moderna' (los exámenes de cada tema).
export function genRonda(nivel = 'facil', opts = {}) {
  for (let intento = 0; ; intento++) {
    const r = genUna(nivel, opts)
    const tema = `${r.tipo}:${r.fil ?? ''}:${r.idea ?? ''}`
    if (intento < 20 && recientes.includes(tema)) continue
    recientes.push(tema)
    if (recientes.length > 8) recientes.shift()
    return r
  }
}

function genUna(nivel, { rand = Math.random, epoca = null } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const pool = epoca ? FILOSOFOS.filter(f => f.epoca === epoca) : FILOSOFOS
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const base = { id: ++seq, nivel, tipo, epoca }
    if (tipo === 'orden') {
      // Cuatro filósofos que no se solapen en vida: el que vivió antes es claro.
      const cuatro = baraja(rand, pool).slice(0, 4)
      const ord = [...cuatro].sort((a, b) => a.nace - b.nace)
      if (ord.some((f, i) => i > 0 && f.nace < ord[i - 1].muere)) continue
      return { ...base, bueno: ord[0].id, opciones: cuatro.map(f => f.id) }
    }
    const f = elige(rand, pool)
    if (tipo === 'idea') {
      const i = Math.floor(rand() * f.ideas.length)
      const tambien = f.ideas[i][1]
      // Distractores de la misma época (más difíciles), sin los que también lo defendieron.
      const otros = baraja(rand, pool.filter(x => x.id !== f.id && !tambien.includes(x.id)))
      const cerca = otros.sort((a, b) => Math.abs(a.nace - f.nace) - Math.abs(b.nace - f.nace)).slice(0, 6)
      return { ...base, fil: f.id, idea: i, bueno: f.id, opciones: baraja(rand, [f.id, ...baraja(rand, cerca).slice(0, 3).map(x => x.id)]) }
    }
    if (tipo === 'concepto') {
      const otros = baraja(rand, pool.filter(x => x.id !== f.id)).slice(0, 3)
      return { ...base, fil: f.id, bueno: f.id, opciones: baraja(rand, [f.id, ...otros.map(x => x.id)]) }
    }
    // corriente
    const vetadas = TAMBIEN_CORRIENTE[f.id] ?? []
    const otras = baraja(rand, [...new Set(pool.map(x => x.corriente))].filter(c => c !== f.corriente && !vetadas.includes(c))).slice(0, 3)
    if (otras.length < 3) continue
    return { ...base, fil: f.id, bueno: f.corriente, opciones: baraja(rand, [f.corriente, ...otras]) }
  }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
export const esCorrecta = (r, o) => o === r.bueno

// ── Textos ────────────────────────────────────────────────────────────────
export const fechas = (f, l) => {
  const y = n => (n < 0 ? s(l, `${-n} a. C.`, `${-n} BC`, `${-n} aC`) : String(n))
  return `${y(f.nace)} – ${y(f.muere)}`
}
export function textoOpcion(o, r, l) {
  if (r.tipo === 'concepto') return tx(filosofo(o).concepto, l)
  if (r.tipo === 'corriente') return tx(CORRIENTES[o], l)
  return tx(filosofo(o).nombre, l)
}
export function enunciado(r, l) {
  if (r.tipo === 'idea') return s(l, '¿Quién lo pensó?', 'Who thought this?', 'Qui ho va pensar?')
  if (r.tipo === 'concepto') return s(l, '¿Cuál es su idea más conocida?', 'What is their best-known idea?', 'Quina és la seva idea més coneguda?')
  if (r.tipo === 'corriente') return s(l, '¿A qué corriente o escuela pertenece?', 'Which school or movement do they belong to?', 'A quin corrent o escola pertany?')
  return s(l, '¿Quién vivió antes?', 'Who lived first?', 'Qui va viure abans?')
}
export function explicacion(r, l) {
  if (r.tipo === 'orden') {
    const ord = r.opciones.map(filosofo).sort((a, b) => a.nace - b.nace)
    return s(l, 'De más antiguo a más moderno: ', 'From earliest to latest: ', 'Del més antic al més modern: ') + ord.map(f => `${tx(f.nombre, l)} (${fechas(f, l)})`).join(' → ') + '.'
  }
  const f = filosofo(r.fil)
  const base = `${tx(f.nombre, l)} (${fechas(f, l)}), ${tx(CORRIENTES[f.corriente], l).toLowerCase()}: «${tx(f.concepto, l)}».`
  if (r.tipo === 'idea') {
    const tambien = f.ideas[r.idea][1]
    return base + (tambien.length ? ' ' + s(l, `(También la defendió ${tambien.map(id => tx(filosofo(id).nombre, l)).join(' y ')}, por eso no sale como opción.)`, `(${tambien.map(id => tx(filosofo(id).nombre, l)).join(' and ')} also held it, so it is not offered as an option.)`, `(També la va defensar ${tambien.map(id => tx(filosofo(id).nombre, l)).join(' i ')}, per això no surt com a opció.)`) : '')
  }
  return base
}
export function schemaQuestion(r, l) {
  const f = r.fil ? filosofo(r.fil) : null
  const q = r.tipo === 'idea' ? `${tx(f.ideas[r.idea][0], l)} ` : f ? `${tx(f.nombre, l)}. ` : ''
  return {
    question: `${q}${enunciado(r, l)}`,
    correctAnswer: textoOpcion(r.bueno, r, l),
    wrongAnswers: r.opciones.filter(o => o !== r.bueno).map(o => textoOpcion(o, r, l)),
  }
}
