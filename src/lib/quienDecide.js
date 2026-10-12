// ¿Quién Decide? (geografía e historia · la Constitución y el Estado, ESO y Bachillerato).
//
// El Estado en un organigrama: la Corona, las Cortes (Congreso y Senado), el
// Gobierno, el poder judicial, el Tribunal Constitucional, el Defensor del
// Pueblo y las comunidades autónomas. Las preguntas:
//   organo       qué órgano hace esto                (Congreso ↔ Senado, TC ↔ Supremo)
//   poder        qué poder es                        (aprobar ↔ aplicar ↔ juzgar)
//   numero       los números de la Constitución      (350, 169, 12, 1978…)
//   derecho      fundamental, principio rector o deber (vivienda «es fundamental»)
//   competencia  del Estado o de la comunidad autónoma
//   ley          el camino de una ley: el paso siguiente
//
// Todo según el texto de 1978 y sus artículos; cada caso tiene una sola
// respuesta posible (nada de competencias compartidas como educación o sanidad).

const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
const T = (es, en, ca) => ({ es, en, ca })
export const tx = (o, l) => o[l] ?? o.es

export const ORGANOS = {
  rey:       { nombre: T('El rey', 'The King', 'El rei'), poder: null },
  congreso:  { nombre: T('Congreso de los Diputados', 'Congress of Deputies', 'Congrés dels Diputats'), poder: 'legislativo' },
  senado:    { nombre: T('Senado', 'Senate', 'Senat'), poder: 'legislativo' },
  gobierno:  { nombre: T('Gobierno', 'Government', 'Govern'), poder: 'ejecutivo' },
  cgpj:      { nombre: T('Consejo General del Poder Judicial', 'General Council of the Judiciary', 'Consell General del Poder Judicial'), poder: 'judicial' },
  supremo:   { nombre: T('Tribunal Supremo', 'Supreme Court', 'Tribunal Suprem'), poder: 'judicial' },
  tc:        { nombre: T('Tribunal Constitucional', 'Constitutional Court', 'Tribunal Constitucional'), poder: null },
  defensor:  { nombre: T('Defensor del Pueblo', 'Ombudsman', 'Defensor del Poble'), poder: null },
  ccaa:      { nombre: T('Comunidades autónomas', 'Autonomous communities', 'Comunitats autònomes'), poder: null },
}
export const PODERES = {
  legislativo: T('Poder legislativo', 'Legislative power', 'Poder legislatiu'),
  ejecutivo: T('Poder ejecutivo', 'Executive power', 'Poder executiu'),
  judicial: T('Poder judicial', 'Judicial power', 'Poder judicial'),
}

// [órgano, caso, artículo]
export const CASOS_ORGANO = [
  ['congreso', T('Vota la investidura del presidente del Gobierno.', 'It votes to invest the Prime Minister.', 'Vota la investidura del president del Govern.'), 99],
  ['congreso', T('Puede derribar al Gobierno con una moción de censura.', 'It can bring down the Government with a motion of no confidence.', 'Pot fer caure el Govern amb una moció de censura.'), 113],
  ['congreso', T('Tiene 350 miembros elegidos en las elecciones generales.', 'It has 350 members elected in the general election.', 'Té 350 membres escollits a les eleccions generals.'), 68],
  ['congreso', T('Tiene 30 días para convalidar o derogar un decreto-ley.', 'It has 30 days to confirm or repeal a decree-law.', 'Té 30 dies per convalidar o derogar un decret llei.'), 86],
  ['senado', T('La Constitución la define como la cámara de representación territorial.', 'The Constitution defines it as the chamber of territorial representation.', 'La Constitució la defineix com la cambra de representació territorial.'), 69],
  ['senado', T('Debe aprobar por mayoría absoluta las medidas del artículo 155.', 'It must approve the measures of Article 155 by an absolute majority.', 'Ha d’aprovar per majoria absoluta les mesures de l’article 155.'), 155],
  ['senado', T('Puede vetar una ley que llega del Congreso, aunque el Congreso puede levantar el veto.', 'It can veto a bill coming from Congress, although Congress can override the veto.', 'Pot vetar una llei que arriba del Congrés, encara que el Congrés pot aixecar el veto.'), 90],
  ['gobierno', T('Dirige la política interior y exterior, la Administración y la defensa del Estado.', 'It directs domestic and foreign policy, the civil service and the defence of the State.', 'Dirigeix la política interior i exterior, l’Administració i la defensa de l’Estat.'), 97],
  ['gobierno', T('Puede dictar decretos-leyes en caso de extraordinaria y urgente necesidad.', 'It can issue decree-laws in cases of extraordinary and urgent need.', 'Pot dictar decrets llei en cas d’extraordinària i urgent necessitat.'), 86],
  ['gobierno', T('Declara el estado de alarma, como máximo para 15 días.', 'It declares a state of alarm, for 15 days at most.', 'Declara l’estat d’alarma, com a màxim per a 15 dies.'), 116],
  ['gobierno', T('Elabora los Presupuestos Generales del Estado y los presenta a las Cortes.', 'It drafts the State Budget and presents it to Parliament.', 'Elabora els Pressupostos Generals de l’Estat i els presenta a les Corts.'), 134],
  ['rey', T('Es el jefe del Estado, símbolo de su unidad y permanencia.', 'It is the head of State, the symbol of its unity and permanence.', 'És el cap de l’Estat, símbol de la seva unitat i permanència.'), 56],
  ['rey', T('Sanciona y promulga las leyes que aprueban las Cortes.', 'It gives royal assent to and promulgates the laws passed by Parliament.', 'Sanciona i promulga les lleis que aproven les Corts.'), 62],
  ['rey', T('Propone el candidato a presidente del Gobierno tras consultar a los grupos políticos.', 'It proposes the candidate for Prime Minister after consulting the political groups.', 'Proposa el candidat a president del Govern després de consultar els grups polítics.'), 99],
  ['tc', T('Decide si una ley es contraria a la Constitución.', 'It decides whether a law goes against the Constitution.', 'Decideix si una llei és contrària a la Constitució.'), 161],
  ['tc', T('Resuelve los recursos de amparo constitucional por vulneración de derechos fundamentales.', 'It rules on constitutional appeals (amparo) for violations of fundamental rights.', 'Resol els recursos d’empara constitucional per vulneració de drets fonamentals.'), 161],
  ['tc', T('Sus 12 magistrados no forman parte del poder judicial.', 'Its 12 judges are not part of the judiciary.', 'Els seus 12 magistrats no formen part del poder judicial.'), 159],
  ['cgpj', T('Es el órgano de gobierno de los jueces: los nombra, los asciende y los sanciona.', 'It is the governing body of the judges: it appoints, promotes and disciplines them.', 'És l’òrgan de govern dels jutges: els nomena, els ascendeix i els sanciona.'), 122],
  ['supremo', T('Es el órgano judicial superior en toda España, salvo en garantías constitucionales.', 'It is the highest court in all of Spain, except on constitutional guarantees.', 'És l’òrgan judicial superior a tot Espanya, excepte en garanties constitucionals.'), 123],
  ['defensor', T('Lo eligen las Cortes para defender los derechos de los ciudadanos frente a la Administración.', 'Parliament appoints it to defend citizens’ rights against the civil service.', 'L’escullen les Corts per defensar els drets dels ciutadans davant l’Administració.'), 54],
  ['ccaa', T('Se rigen por su Estatuto de Autonomía y tienen su propio parlamento y gobierno.', 'They are governed by their Statute of Autonomy and have their own parliament and government.', 'Es regeixen pel seu Estatut d’Autonomia i tenen el seu propi parlament i govern.'), 147],
]
const CONFUNDE = {
  congreso: ['senado', 'gobierno', 'tc'], senado: ['congreso', 'gobierno', 'ccaa'], gobierno: ['congreso', 'rey', 'senado'],
  rey: ['gobierno', 'congreso', 'tc'], tc: ['supremo', 'cgpj', 'defensor'], cgpj: ['supremo', 'tc', 'gobierno'],
  supremo: ['tc', 'cgpj', 'defensor'], defensor: ['tc', 'supremo', 'congreso'], ccaa: ['senado', 'gobierno', 'congreso'],
}

export const CASOS_PODER = [
  ['legislativo', '📜', T('Aprobar una nueva ley de educación.', 'Passing a new education act.', 'Aprovar una nova llei d’educació.')],
  ['legislativo', '💰', T('Aprobar los Presupuestos Generales del Estado.', 'Approving the State Budget.', 'Aprovar els Pressupostos Generals de l’Estat.')],
  ['legislativo', '✏️', T('Reformar el Código Penal para castigar un delito nuevo.', 'Amending the Criminal Code to punish a new offence.', 'Reformar el Codi Penal per castigar un delicte nou.')],
  ['ejecutivo', '🏢', T('Dirigir los ministerios y la Administración del Estado.', 'Running the ministries and the State administration.', 'Dirigir els ministeris i l’Administració de l’Estat.')],
  ['ejecutivo', '🌍', T('Dirigir la política exterior de España.', 'Directing Spain’s foreign policy.', 'Dirigir la política exterior d’Espanya.')],
  ['ejecutivo', '🚦', T('Aplicar las leyes y gobernar el día a día.', 'Applying the laws and governing day to day.', 'Aplicar les lleis i governar el dia a dia.')],
  ['judicial', '⚖️', T('Juzgar a una persona acusada de un delito.', 'Trying a person accused of a crime.', 'Jutjar una persona acusada d’un delicte.')],
  ['judicial', '🏠', T('Resolver un pleito entre dos vecinos por una obra.', 'Settling a dispute between two neighbours over building work.', 'Resoldre un plet entre dos veïns per una obra.')],
  ['judicial', '📄', T('Dictar una sentencia de divorcio.', 'Issuing a divorce ruling.', 'Dictar una sentència de divorci.')],
]

// [pregunta, respuesta, distractores, unidad, explicación]
export const NUMEROS = [
  { id: 'diputados', q: T('¿Cuántos diputados tiene el Congreso?', 'How many deputies does Congress have?', 'Quants diputats té el Congrés?'), r: 350, d: [300, 400, 266],
    e: T('350, elegidos cada cuatro años por provincias. La Constitución permite entre 300 y 400 y la ley electoral fija 350.', '350, elected every four years by province. The Constitution allows between 300 and 400 and the electoral law sets 350.', '350, escollits cada quatre anys per províncies. La Constitució permet entre 300 i 400 i la llei electoral en fixa 350.') },
  { id: 'mayoria', q: T('¿Cuántos votos son la mayoría absoluta del Congreso?', 'How many votes is an absolute majority in Congress?', 'Quants vots són la majoria absoluta del Congrés?'), r: 176, d: [175, 200, 210],
    e: T('La mitad de 350 más uno: 176. Con 175 hay empate, no mayoría absoluta.', 'Half of 350 plus one: 176. With 175 it is a tie, not an absolute majority.', 'La meitat de 350 més un: 176. Amb 175 hi ha empat, no majoria absoluta.') },
  { id: 'articulos', q: T('¿Cuántos artículos tiene la Constitución de 1978?', 'How many articles does the 1978 Constitution have?', 'Quants articles té la Constitució del 1978?'), r: 169, d: [100, 205, 250],
    e: T('169 artículos, ordenados en un título preliminar y diez títulos, más disposiciones adicionales, transitorias, una derogatoria y una final.', '169 articles, arranged in a preliminary title and ten titles, plus additional, transitional, repealing and final provisions.', '169 articles, ordenats en un títol preliminar i deu títols, més disposicions addicionals, transitòries, una derogatòria i una final.') },
  { id: 'anyo', q: T('¿En qué año se aprobó en referéndum la Constitución?', 'In what year was the Constitution approved by referendum?', 'En quin any es va aprovar en referèndum la Constitució?'), r: 1978, d: [1975, 1977, 1982],
    e: T('El 6 de diciembre de 1978, hoy Día de la Constitución. 1975 es la muerte de Franco y 1977, las primeras elecciones democráticas.', 'On 6 December 1978, now Constitution Day. 1975 is Franco’s death and 1977 the first democratic elections.', 'El 6 de desembre de 1978, avui Dia de la Constitució. El 1975 és la mort de Franco i el 1977, les primeres eleccions democràtiques.') },
  { id: 'tc', q: T('¿Cuántos magistrados tiene el Tribunal Constitucional?', 'How many judges does the Constitutional Court have?', 'Quants magistrats té el Tribunal Constitucional?'), r: 12, d: [9, 15, 20],
    e: T('12, nombrados por nueve años: cuatro a propuesta del Congreso, cuatro del Senado, dos del Gobierno y dos del CGPJ.', '12, appointed for nine years: four proposed by Congress, four by the Senate, two by the Government and two by the CGPJ.', '12, nomenats per nou anys: quatre a proposta del Congrés, quatre del Senat, dos del Govern i dos del CGPJ.') },
  { id: 'ccaa', q: T('¿En cuántas comunidades autónomas se organiza España?', 'How many autonomous communities is Spain divided into?', 'En quantes comunitats autònomes s’organitza Espanya?'), r: 17, d: [15, 19, 50],
    e: T('17 comunidades autónomas y 2 ciudades autónomas, Ceuta y Melilla. 50 son las provincias.', '17 autonomous communities and 2 autonomous cities, Ceuta and Melilla. 50 is the number of provinces.', '17 comunitats autònomes i 2 ciutats autònomes, Ceuta i Melilla. 50 són les províncies.') },
  { id: 'legislatura', q: T('¿Cuántos años dura como máximo una legislatura?', 'How many years can a parliament last at most?', 'Quants anys dura com a màxim una legislatura?'), r: 4, d: [3, 5, 6],
    e: T('Cuatro años; puede acabar antes si el presidente disuelve las Cortes y convoca elecciones.', 'Four years; it can end sooner if the Prime Minister dissolves Parliament and calls an election.', 'Quatre anys; pot acabar abans si el president dissol les Corts i convoca eleccions.') },
  { id: 'edad', q: T('¿A qué edad se alcanza la mayoría de edad según la Constitución?', 'At what age does the Constitution set adulthood?', 'A quina edat s’arriba a la majoria d’edat segons la Constitució?'), r: 18, d: [16, 21, 14],
    e: T('Artículo 12: a los 18 años, y con ella el derecho a votar en las elecciones generales.', 'Article 12: at 18, and with it the right to vote in general elections.', 'Article 12: als 18 anys, i amb ella el dret a votar a les eleccions generals.') },
  { id: 'senadores', q: T('¿Cuántos senadores elige cada provincia de la Península?', 'How many senators does each mainland province elect?', 'Quants senadors escull cada província de la Península?'), r: 4, d: [2, 3, 5],
    e: T('Cuatro por provincia peninsular (artículo 69); las islas y Ceuta y Melilla eligen otros números, y los parlamentos autonómicos designan más senadores.', 'Four per mainland province (Article 69); the islands, Ceuta and Melilla elect other numbers, and regional parliaments appoint further senators.', 'Quatre per província peninsular (article 69); les illes i Ceuta i Melilla n’escullen altres nombres, i els parlaments autonòmics en designen més.') },
  { id: 'alarma', q: T('¿Cuántos días dura como máximo el estado de alarma sin prórroga del Congreso?', 'How many days can a state of alarm last at most without an extension from Congress?', 'Quants dies dura com a màxim l’estat d’alarma sense pròrroga del Congrés?'), r: 15, d: [7, 30, 60],
    e: T('Artículo 116: el Gobierno lo declara para 15 días como máximo; para prorrogarlo necesita la autorización del Congreso.', 'Article 116: the Government declares it for 15 days at most; extending it requires Congress’s authorisation.', 'Article 116: el Govern el declara per a 15 dies com a màxim; per prorrogar-lo necessita l’autorització del Congrés.') },
]

export const DERECHOS = {
  fundamental: T('Derecho fundamental (protegido con recurso de amparo)', 'Fundamental right (protected by an amparo appeal)', 'Dret fonamental (protegit amb recurs d’empara)'),
  rector: T('Principio rector de la política social y económica', 'Guiding principle of social and economic policy', 'Principi rector de la política social i econòmica'),
  deber: T('Deber de los ciudadanos', 'Duty of citizens', 'Deure dels ciutadans'),
}
export const CASOS_DERECHO = [
  ['fundamental', T('La libertad de expresión', 'Freedom of expression', 'La llibertat d’expressió'), 20],
  ['fundamental', T('El derecho a la educación', 'The right to education', 'El dret a l’educació'), 27],
  ['fundamental', T('La libertad religiosa', 'Freedom of religion', 'La llibertat religiosa'), 16],
  ['fundamental', T('El derecho de huelga', 'The right to strike', 'El dret de vaga'), 28],
  ['fundamental', T('La inviolabilidad del domicilio', 'The inviolability of the home', 'La inviolabilitat del domicili'), 18],
  ['fundamental', T('El derecho a la vida', 'The right to life', 'El dret a la vida'), 15],
  ['rector', T('El derecho a una vivienda digna', 'The right to decent housing', 'El dret a un habitatge digne'), 47],
  ['rector', T('El derecho a la protección de la salud', 'The right to health protection', 'El dret a la protecció de la salut'), 43],
  ['rector', T('El derecho a un medio ambiente adecuado', 'The right to a suitable environment', 'El dret a un medi ambient adequat'), 45],
  ['rector', T('El acceso a la cultura', 'Access to culture', 'L’accés a la cultura'), 44],
  ['rector', T('La protección de la familia', 'Protection of the family', 'La protecció de la família'), 39],
  ['deber', T('Contribuir a los gastos públicos pagando impuestos', 'Contributing to public spending by paying taxes', 'Contribuir a les despeses públiques pagant impostos'), 31],
  ['deber', T('Conocer el castellano, lengua oficial del Estado', 'Knowing Castilian Spanish, the official language of the State', 'Conèixer el castellà, llengua oficial de l’Estat'), 3],
]

export const COMPETENCIAS = {
  estado: [
    T('Defensa y Fuerzas Armadas', 'Defence and the Armed Forces', 'Defensa i Forces Armades'),
    T('Relaciones internacionales', 'International relations', 'Relacions internacionals'),
    T('Nacionalidad e inmigración', 'Nationality and immigration', 'Nacionalitat i immigració'),
    T('Sistema monetario', 'The monetary system', 'Sistema monetari'),
    T('Legislación penal', 'Criminal law', 'Legislació penal'),
    T('Hacienda general y deuda del Estado', 'General finance and State debt', 'Hisenda general i deute de l’Estat'),
  ],
  ccaa: [
    T('Urbanismo y vivienda', 'Town planning and housing', 'Urbanisme i habitatge'),
    T('Agricultura y ganadería', 'Agriculture and livestock', 'Agricultura i ramaderia'),
    T('Turismo en su territorio', 'Tourism within its territory', 'Turisme al seu territori'),
    T('Promoción del deporte', 'Promoting sport', 'Promoció de l’esport'),
    T('Asistencia social', 'Social assistance', 'Assistència social'),
    T('Museos y bibliotecas de la comunidad', 'The community’s museums and libraries', 'Museus i biblioteques de la comunitat'),
    T('Carreteras que no salen de la comunidad', 'Roads that stay within the community', 'Carreteres que no surten de la comunitat'),
  ],
}

export const PASOS_LEY = [
  { id: 'iniciativa', t: T('El Gobierno presenta un proyecto de ley (o un grupo parlamentario, una proposición)', 'The Government introduces a bill (or a parliamentary group, a private member’s bill)', 'El Govern presenta un projecte de llei (o un grup parlamentari, una proposició)') },
  { id: 'congreso', t: T('El Congreso lo debate, con enmiendas, y lo aprueba', 'Congress debates it, with amendments, and passes it', 'El Congrés el debat, amb esmenes, i l’aprova') },
  { id: 'senado', t: T('El Senado tiene dos meses para aprobarlo, enmendarlo o vetarlo', 'The Senate has two months to pass it, amend it or veto it', 'El Senat té dos mesos per aprovar-lo, esmenar-lo o vetar-lo') },
  { id: 'vuelta', t: T('Si el Senado lo ha cambiado o vetado, vuelve al Congreso, que tiene la última palabra', 'If the Senate has changed or vetoed it, it returns to Congress, which has the final say', 'Si el Senat l’ha canviat o vetat, torna al Congrés, que té l’última paraula') },
  { id: 'sancion', t: T('El rey sanciona y promulga la ley', 'The King gives royal assent and promulgates the law', 'El rei sanciona i promulga la llei') },
  { id: 'boe', t: T('Se publica en el Boletín Oficial del Estado (BOE)', 'It is published in the Official State Gazette (BOE)', 'Es publica al Butlletí Oficial de l’Estat (BOE)') },
  { id: 'vigor', t: T('Entra en vigor (a los 20 días de publicarse, si no dice otra cosa)', 'It comes into force (20 days after publication, unless it says otherwise)', 'Entra en vigor (als 20 dies de publicar-se, si no diu una altra cosa)') },
]

export const NIVELES = {
  facil:   { tipos: ['poder', 'poder', 'organo', 'organo', 'numero'] },
  medio:   { tipos: ['poder', 'organo', 'organo', 'numero', 'derecho', 'competencia'] },
  dificil: { tipos: ['organo', 'organo', 'numero', 'derecho', 'competencia', 'ley', 'ley'] },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
let seq = 0
const recientes = []
const tema = r => `${r.tipo}:${r.caso ?? r.num ?? r.paso ?? r.bueno}`

export function genRonda(nivel = 'facil', opts = {}) {
  for (let intento = 0; ; intento++) {
    const r = genUna(nivel, opts)
    if (intento < 20 && recientes.includes(tema(r))) continue
    recientes.push(tema(r))
    if (recientes.length > 6) recientes.shift()
    return r
  }
}

function genUna(nivel, { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const tipo = elige(rand, cfg.tipos)
  const base = { id: ++seq, nivel, tipo }

  if (tipo === 'organo') {
    const k = Math.floor(rand() * CASOS_ORGANO.length)
    const id = CASOS_ORGANO[k][0]
    return { ...base, caso: k, bueno: id, opciones: baraja(rand, [id, ...CONFUNDE[id]]) }
  }
  if (tipo === 'poder') {
    const k = Math.floor(rand() * CASOS_PODER.length)
    return { ...base, caso: k, bueno: CASOS_PODER[k][0], opciones: Object.keys(PODERES) }
  }
  if (tipo === 'numero') {
    const k = Math.floor(rand() * NUMEROS.length)
    const n = NUMEROS[k]
    return { ...base, num: n.id, bueno: n.r, opciones: [n.r, ...n.d].sort((a, b) => a - b) }
  }
  if (tipo === 'derecho') {
    const k = Math.floor(rand() * CASOS_DERECHO.length)
    return { ...base, caso: k, bueno: CASOS_DERECHO[k][0], opciones: Object.keys(DERECHOS) }
  }
  if (tipo === 'competencia') {
    // Una del Estado entre tres autonómicas, o al revés.
    const alReves = rand() < 0.4
    const [raro, comun] = alReves ? ['ccaa', 'estado'] : ['estado', 'ccaa']
    const b = `${raro}:${Math.floor(rand() * COMPETENCIAS[raro].length)}`
    const otros = baraja(rand, COMPETENCIAS[comun].map((_, i) => `${comun}:${i}`)).slice(0, 3)
    return { ...base, alReves, bueno: b, opciones: baraja(rand, [b, ...otros]) }
  }
  // ley: se enseñan los pasos hasta k y se pregunta el siguiente
  const k = 1 + Math.floor(rand() * (PASOS_LEY.length - 1)) // pasos ya dados: 1..6
  const bueno = PASOS_LEY[k].id
  // Tras el Senado, el siguiente puede ser «vuelta» o, si no cambió nada, la sanción:
  // por eso la sanción no sale como opción ahí.
  const pool = PASOS_LEY.slice(k + 1).map(p => p.id).filter(id => !(bueno === 'vuelta' && id === 'sancion'))
  // «El Congreso lo aprueba» se parece demasiado a «vuelve al Congreso»: fuera en ese caso.
  const antes = PASOS_LEY.slice(0, k).map(p => p.id).filter(id => !(bueno === 'vuelta' && id === 'congreso'))
  const cands = baraja(rand, [...pool, ...antes]).slice(0, 3)
  return { ...base, paso: k, bueno, opciones: baraja(rand, [bueno, ...cands]) }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
export const esCorrecta = (r, o) => o === r.bueno

// ── Textos ────────────────────────────────────────────────────────────────
const competencia = (o, l) => { const [g, i] = o.split(':'); return tx(COMPETENCIAS[g][+i], l) }
const paso = id => PASOS_LEY.find(p => p.id === id)

export function textoOpcion(o, r, l) {
  switch (r.tipo) {
    case 'organo': return tx(ORGANOS[o].nombre, l)
    case 'poder': return tx(PODERES[o], l)
    case 'numero': return o.toLocaleString(l === 'en' ? 'en-GB' : 'es-ES', { useGrouping: o >= 10000 })
    case 'derecho': return tx(DERECHOS[o], l)
    case 'competencia': return competencia(o, l)
    default: return tx(paso(o).t, l)
  }
}

export function enunciado(r, l) {
  switch (r.tipo) {
    case 'organo': return s(l, '¿Qué órgano del Estado es?', 'Which body of the State is this?', 'Quin òrgan de l’Estat és?')
    case 'poder': return s(l, '¿Qué poder del Estado se encarga de esto?', 'Which power of the State does this?', 'Quin poder de l’Estat se n’encarrega?')
    case 'numero': return tx(NUMEROS.find(n => n.id === r.num).q, l)
    case 'derecho': return s(l, '¿Qué es, según la Constitución?', 'What is it, according to the Constitution?', 'Què és, segons la Constitució?')
    case 'competencia': return r.alReves
      ? s(l, '¿Cuál de estas competencias puede asumir una comunidad autónoma?', 'Which of these powers can an autonomous community take on?', 'Quina d’aquestes competències pot assumir una comunitat autònoma?')
      : s(l, '¿Cuál de estas es competencia exclusiva del Estado?', 'Which of these is an exclusive power of the State?', 'Quina d’aquestes és competència exclusiva de l’Estat?')
    default: return s(l, '¿Cuál es el paso siguiente para hacer una ley?', 'What is the next step in making a law?', 'Quin és el pas següent per fer una llei?')
  }
}

const ix = l => (l === 'en' ? 1 : l === 'ca' ? 2 : 0)
const art = (n, l) => s(l, `Artículo ${n}.`, `Article ${n}.`, `Article ${n}.`)

export function explicacion(r, l) {
  switch (r.tipo) {
    case 'organo': {
      const [id, , n] = CASOS_ORGANO[r.caso]
      return `${tx(ORGANOS[id].nombre, l)}. ${art(n, l)} ${PISTA_ORGANO[id][ix(l)]}`
    }
    case 'poder': return PISTA_PODER[r.bueno][ix(l)]
    case 'numero': return tx(NUMEROS.find(n => n.id === r.num).e, l)
    case 'derecho': {
      const [, , n] = CASOS_DERECHO[r.caso]
      return `${art(n, l)} ${PISTA_DERECHO[r.bueno][ix(l)]}`
    }
    case 'competencia': return s(l,
      `${competencia(r.bueno, l)}: ${r.alReves ? 'la pueden asumir las comunidades autónomas (artículo 148)' : 'es competencia exclusiva del Estado (artículo 149)'}. Las demás son ${r.alReves ? 'exclusivas del Estado' : 'de las que pueden asumir las comunidades'}.`,
      `${competencia(r.bueno, l)}: ${r.alReves ? 'autonomous communities can take it on (Article 148)' : 'it is an exclusive power of the State (Article 149)'}. The others are ${r.alReves ? 'exclusive to the State' : 'among those the communities can take on'}.`,
      `${competencia(r.bueno, l)}: ${r.alReves ? 'la poden assumir les comunitats autònomes (article 148)' : 'és competència exclusiva de l’Estat (article 149)'}. Les altres són ${r.alReves ? 'exclusives de l’Estat' : 'de les que poden assumir les comunitats'}.`)
    default: return s(l,
      `El orden es: iniciativa, Congreso, Senado, vuelta al Congreso si hace falta, sanción del rey, publicación en el BOE y entrada en vigor. El Congreso tiene la última palabra: puede levantar el veto del Senado.`,
      `The order is: initiative, Congress, Senate, back to Congress if needed, royal assent, publication in the BOE and entry into force. Congress has the final say: it can override the Senate’s veto.`,
      `L’ordre és: iniciativa, Congrés, Senat, tornada al Congrés si cal, sanció del rei, publicació al BOE i entrada en vigor. El Congrés té l’última paraula: pot aixecar el veto del Senat.`)
  }
}
const PISTA_ORGANO = {
  congreso: ['Es la cámara más importante de las Cortes: inviste al presidente y lo puede derribar.', 'It is the more important chamber of Parliament: it invests the Prime Minister and can bring them down.', 'És la cambra més important de les Corts: inviste el president i el pot fer caure.'],
  senado: ['Es la segunda cámara de las Cortes, la de representación territorial; en las leyes, el Congreso tiene la última palabra.', 'It is the second chamber of Parliament, representing the territories; on laws, Congress has the final say.', 'És la segona cambra de les Corts, la de representació territorial; en les lleis, el Congrés té l’última paraula.'],
  gobierno: ['Es el poder ejecutivo: el presidente y los ministros gobiernan y aplican las leyes.', 'It is the executive: the Prime Minister and ministers govern and apply the laws.', 'És el poder executiu: el president i els ministres governen i apliquen les lleis.'],
  rey: ['Es el jefe del Estado en una monarquía parlamentaria: sus actos necesitan el refrendo del Gobierno.', 'It is the head of State in a parliamentary monarchy: its acts need the Government’s countersignature.', 'És el cap de l’Estat en una monarquia parlamentària: els seus actes necessiten el refrendament del Govern.'],
  tc: ['Vigila que se cumpla la Constitución y no forma parte del poder judicial: no hay que confundirlo con el Tribunal Supremo.', 'It upholds the Constitution and is not part of the judiciary: do not confuse it with the Supreme Court.', 'Vetlla perquè es compleixi la Constitució i no forma part del poder judicial: no s’ha de confondre amb el Tribunal Suprem.'],
  cgpj: ['Gobierna a los jueces para que no dependan del Gobierno, pero no juzga.', 'It governs the judges so that they do not depend on the Government, but it does not try cases.', 'Governa els jutges perquè no depenguin del Govern, però no jutja.'],
  supremo: ['Es la cúspide de los tribunales; solo el Tribunal Constitucional está por encima en lo constitucional.', 'It is the top of the courts; only the Constitutional Court is above it on constitutional matters.', 'És el cim dels tribunals; només el Tribunal Constitucional és per sobre en allò constitucional.'],
  defensor: ['Cualquier persona puede escribirle gratis con una queja contra la Administración.', 'Anyone can write to it free of charge with a complaint against the administration.', 'Qualsevol persona li pot escriure gratis amb una queixa contra l’Administració.'],
  ccaa: ['España es un Estado autonómico: 17 comunidades con su Estatuto, su parlamento y su gobierno.', 'Spain is a State of autonomies: 17 communities with their Statute, parliament and government.', 'Espanya és un Estat autonòmic: 17 comunitats amb el seu Estatut, el seu parlament i el seu govern.'],
}
const PISTA_PODER = {
  legislativo: ['Hacer, cambiar o aprobar leyes y presupuestos es el poder legislativo: las Cortes Generales (Congreso y Senado).', 'Making, changing or passing laws and budgets is the legislative power: Parliament (Congress and Senate).', 'Fer, canviar o aprovar lleis i pressupostos és el poder legislatiu: les Corts Generals (Congrés i Senat).'],
  ejecutivo: ['Gobernar y aplicar las leyes es el poder ejecutivo: el Gobierno, con su presidente y sus ministros.', 'Governing and applying the laws is the executive power: the Government, with its Prime Minister and ministers.', 'Governar i aplicar les lleis és el poder executiu: el Govern, amb el president i els ministres.'],
  judicial: ['Juzgar y hacer cumplir lo juzgado es el poder judicial: jueces y magistrados independientes.', 'Judging and enforcing judgments is the judicial power: independent judges and magistrates.', 'Jutjar i fer complir allò jutjat és el poder judicial: jutges i magistrats independents.'],
}
const PISTA_DERECHO = {
  fundamental: ['Está entre los derechos fundamentales (artículos 14 a 29): los más protegidos, con recurso de amparo ante el Tribunal Constitucional.', 'It is among the fundamental rights (Articles 14 to 29): the most protected, with an amparo appeal to the Constitutional Court.', 'És entre els drets fonamentals (articles 14 a 29): els més protegits, amb recurs d’empara davant el Tribunal Constitucional.'],
  rector: ['Es un principio rector (artículos 39 a 52): guía a los poderes públicos, pero no se puede reclamar directamente ante un juez como un derecho fundamental.', 'It is a guiding principle (Articles 39 to 52): it guides the authorities, but cannot be claimed directly before a judge like a fundamental right.', 'És un principi rector (articles 39 a 52): guia els poders públics, però no es pot reclamar directament davant un jutge com un dret fonamental.'],
  deber: ['Es un deber: algo que la Constitución exige a los ciudadanos, no un derecho que se les reconoce.', 'It is a duty: something the Constitution requires of citizens, not a right granted to them.', 'És un deure: una cosa que la Constitució exigeix als ciutadans, no un dret que se’ls reconeix.'],
}

export function schemaQuestion(r, l) {
  const extra = r.tipo === 'organo' ? `${tx(CASOS_ORGANO[r.caso][1], l)} `
    : r.tipo === 'poder' ? `${tx(CASOS_PODER[r.caso][2], l)} `
    : r.tipo === 'derecho' ? `${tx(CASOS_DERECHO[r.caso][1], l)}. `
    : r.tipo === 'ley' ? `${PASOS_LEY.slice(0, r.paso).map(p => tx(p.t, l)).join(' → ')} → ? ` : ''
  return {
    question: `${extra}${enunciado(r, l)}`,
    correctAnswer: textoOpcion(r.bueno, r, l),
    wrongAnswers: r.opciones.filter(o => o !== r.bueno).map(o => textoOpcion(o, r, l)),
  }
}
