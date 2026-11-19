// Monta el Verbo (solo castellano): se completa la tabla de un tiempo verbal.
// Cada persona tiene una parte fija (cant- / cantar- / ___ cantado) y un
// hueco; las fichas de la bandeja se colocan en orden (yo → ellos). Entre
// las fichas hay trampas: terminaciones de otro tiempo o de otra
// conjugación, o la forma «regularizada» de un irregular (hació, pedió).
//
//   facil    regulares: presente, pretérito perfecto simple y futuro
//   medio    regulares: imperfecto, condicional y los compuestos (he/había/habré cantado)
//   dificil  subjuntivo (presente e imperfecto) e irregulares (presente y perfecto simple)
//
// Los regulares se conjugan con las reglas; se eligen verbos SIN cambios
// ortográficos ni de raíz (nada de buscar → busqué, leer → leyó, pensar →
// pienso), y sin participio irregular (escribir, abrir, romper). Los
// irregulares van escritos a mano. El test compara con formas conocidas.
// El imperfecto de subjuntivo usa la forma en -ra; la de -se no sale nunca
// como trampa (también vale).

export const NIVELES = { facil: {}, medio: {}, dificil: {} }
export const PERSONAS = ['yo', 'tú', 'él / ella', 'nosotros', 'vosotros', 'ellos']

export const REGULARES = {
  ar: ['cantar', 'hablar', 'bailar', 'mirar', 'nadar', 'trabajar', 'caminar', 'escuchar', 'ayudar', 'comprar', 'saltar', 'lavar', 'cenar', 'preparar', 'viajar'],
  er: ['comer', 'beber', 'correr', 'aprender', 'vender', 'temer', 'comprender', 'responder', 'meter', 'deber'],
  ir: ['vivir', 'subir', 'partir', 'recibir', 'decidir', 'permitir', 'unir', 'discutir', 'sufrir', 'asistir'],
}

// Terminaciones por tiempo y conjugación (er e ir comparten muchas)
const T = {
  presente: { ar: ['o', 'as', 'a', 'amos', 'áis', 'an'], er: ['o', 'es', 'e', 'emos', 'éis', 'en'], ir: ['o', 'es', 'e', 'imos', 'ís', 'en'] },
  indefinido: { ar: ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'], er: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'], ir: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'] },
  imperfecto: { ar: ['aba', 'abas', 'aba', 'ábamos', 'abais', 'aban'], er: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'], ir: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'] },
  futuro: { todas: ['é', 'ás', 'á', 'emos', 'éis', 'án'] },
  condicional: { todas: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'] },
  subjPresente: { ar: ['e', 'es', 'e', 'emos', 'éis', 'en'], er: ['a', 'as', 'a', 'amos', 'áis', 'an'], ir: ['a', 'as', 'a', 'amos', 'áis', 'an'] },
  subjImperfecto: { ar: ['ara', 'aras', 'ara', 'áramos', 'arais', 'aran'], er: ['iera', 'ieras', 'iera', 'iéramos', 'ierais', 'ieran'], ir: ['iera', 'ieras', 'iera', 'iéramos', 'ierais', 'ieran'] },
}
// Trampas típicas para cada tiempo (se descartan las que coincidan con una buena)
const TR = {
  presente: { ar: ['es', 'emos', 'aste', 'ó', 'en'], er: ['as', 'amos', 'imos', 'ís', 'an'], ir: ['emos', 'éis', 'as', 'amos', 'an'] },
  indefinido: { ar: ['iste', 'ió', 'aba', 'emos', 'ieron'], er: ['aste', 'ó', 'aron', 'ía', 'emos'], ir: ['aste', 'ó', 'aron', 'ía', 'emos'] },
  imperfecto: { ar: ['ía', 'ías', 'é', 'aste', 'íamos'], er: ['aba', 'abas', 'ió', 'emos', 'ábamos'], ir: ['aba', 'abas', 'ió', 'imos', 'ábamos'] },
  futuro: { todas: ['ía', 'ían', 'on', 'emo', 'ás'] },
  condicional: { todas: ['é', 'án', 'emos', 'ás', 'á'] },
  subjPresente: { ar: ['a', 'as', 'amos', 'o', 'an'], er: ['e', 'es', 'emos', 'o', 'en'], ir: ['e', 'es', 'imos', 'o', 'en'] },
  subjImperfecto: { ar: ['iera', 'ieras', 'aba', 'ará', 'iéramos'], er: ['ara', 'aras', 'ía', 'erá', 'áramos'], ir: ['ara', 'aras', 'ía', 'irá', 'áramos'] },
}
const AUX = {
  perfecto: ['he', 'has', 'ha', 'hemos', 'habéis', 'han'],
  pluscuamperfecto: ['había', 'habías', 'había', 'habíamos', 'habíais', 'habían'],
  futuroPerfecto: ['habré', 'habrás', 'habrá', 'habremos', 'habréis', 'habrán'],
}

export const TIEMPOS = {
  presente: 'Presente de indicativo',
  indefinido: 'Pretérito perfecto simple',
  imperfecto: 'Pretérito imperfecto',
  futuro: 'Futuro simple',
  condicional: 'Condicional simple',
  perfecto: 'Pretérito perfecto compuesto',
  pluscuamperfecto: 'Pretérito pluscuamperfecto',
  futuroPerfecto: 'Futuro compuesto',
  subjPresente: 'Presente de subjuntivo',
  subjImperfecto: 'Pretérito imperfecto de subjuntivo',
}

// Irregulares escritos a mano: forma completa por persona + trampas
// (forma regularizada o de otro tiempo; nunca una forma válida del hueco).
const I = (inf, presente, indefinido, trP, trI) => ({ inf, presente: presente.split(' '), indefinido: indefinido.split(' '), trampas: { presente: trP.split(' '), indefinido: trI.split(' ') } })
export const IRREGULARES = [
  I('ser', 'soy eres es somos sois son', 'fui fuiste fue fuimos fuisteis fueron', 'seo era fui', 'era seré sido'),
  I('estar', 'estoy estás está estamos estáis están', 'estuve estuviste estuvo estuvimos estuvisteis estuvieron', 'estuve esté estó', 'estó estaron esté'),
  I('ir', 'voy vas va vamos vais van', 'fui fuiste fue fuimos fuisteis fueron', 'iba vaya vo', 'iba vaya iré'),
  I('tener', 'tengo tienes tiene tenemos tenéis tienen', 'tuve tuviste tuvo tuvimos tuvisteis tuvieron', 'teno tenen tuve', 'tenió tení tenieron'),
  I('hacer', 'hago haces hace hacemos hacéis hacen', 'hice hiciste hizo hicimos hicisteis hicieron', 'haco hice hazo', 'hació hací hacieron'),
  I('decir', 'digo dices dice decimos decís dicen', 'dije dijiste dijo dijimos dijisteis dijeron', 'deco dije decen', 'dijieron decí decieron'),
  I('poder', 'puedo puedes puede podemos podéis pueden', 'pude pudiste pudo pudimos pudisteis pudieron', 'podo poden pude', 'podió podí podieron'),
  I('querer', 'quiero quieres quiere queremos queréis quieren', 'quise quisiste quiso quisimos quisisteis quisieron', 'quero queren quise', 'querió querí querieron'),
  I('venir', 'vengo vienes viene venimos venís vienen', 'vine viniste vino vinimos vinisteis vinieron', 'veno venen vine', 'venió vení venieron'),
  I('poner', 'pongo pones pone ponemos ponéis ponen', 'puse pusiste puso pusimos pusisteis pusieron', 'pono puse poní', 'ponió poní ponieron'),
  I('saber', 'sé sabes sabe sabemos sabéis saben', 'supe supiste supo supimos supisteis supieron', 'sabo supe sepo', 'sabió sabí sabieron'),
  I('salir', 'salgo sales sale salimos salís salen', 'salí saliste salió salimos salisteis salieron', 'salo salió salgas', 'salgó salgué saliera'),
  I('pedir', 'pido pides pide pedimos pedís piden', 'pedí pediste pidió pedimos pedisteis pidieron', 'pedes peden pidió', 'pedió pedieron pidí'),
  I('dormir', 'duermo duermes duerme dormimos dormís duermen', 'dormí dormiste durmió dormimos dormisteis durmieron', 'dormo dormen durmió', 'dormió dormieron durmí'),
  I('jugar', 'juego juegas juega jugamos jugáis juegan', 'jugué jugaste jugó jugamos jugasteis jugaron', 'jugen juegamos jugué', 'jugé juegó juegué'),
]

const conj = inf => inf.slice(-2)
const raiz = inf => inf.slice(0, -2)
const elige = (xs, rand) => xs[Math.floor(rand() * xs.length)]
function barajar(xs, rand) {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
const participio = inf => raiz(inf) + (conj(inf) === 'ar' ? 'ado' : 'ido')

// Las seis casillas de un tiempo: { antes, ok, despues } (antes/despues fijos)
export function tabla(inf, tiempo) {
  if (AUX[tiempo]) return AUX[tiempo].map(a => ({ antes: '', ok: a, despues: participio(inf) }))
  const fam = T[tiempo].todas ?? T[tiempo][conj(inf)]
  const fijo = T[tiempo].todas ? inf : raiz(inf)
  return fam.map(t => ({ antes: fijo, ok: t, despues: '' }))
}

export const forma = c => [c.antes, c.ok].filter(Boolean).join('') + (c.despues ? ' ' + c.despues : '')

function trampasRegular(inf, tiempo, buenas, n, rand) {
  let cand
  if (AUX[tiempo]) cand = Object.entries(AUX).filter(([t]) => t !== tiempo).flatMap(([, xs]) => xs).concat(['hay', 'haya', 'hube'])
  else cand = TR[tiempo].todas ?? TR[tiempo][conj(inf)]
  return barajar([...new Set(cand)].filter(t => !buenas.includes(t)), rand).slice(0, n)
}

const TIEMPOS_NIVEL = {
  facil: ['presente', 'indefinido', 'futuro'],
  medio: ['imperfecto', 'condicional', 'perfecto', 'pluscuamperfecto', 'futuroPerfecto'],
  dificil: ['subjPresente', 'subjImperfecto', 'irrPresente', 'irrIndefinido', 'irrPresente', 'irrIndefinido'],
}

const recientes = []
export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const tiempos = TIEMPOS_NIVEL[nivel] ?? TIEMPOS_NIVEL.facil
  for (let intento = 0; ; intento++) {
    const t = elige(tiempos, rand)
    let r
    if (t.startsWith('irr')) {
      const v = elige(IRREGULARES, rand), tiempo = t === 'irrPresente' ? 'presente' : 'indefinido'
      const casillas = v[tiempo].map(f => ({ antes: '', ok: f, despues: '' }))
      const buenas = v[tiempo]
      r = { inf: v.inf, tiempo, irregular: true, casillas, trampas: v.trampas[tiempo].filter(x => !buenas.includes(x)).slice(0, 2) }
    } else {
      const c = elige(['ar', 'ar', 'er', 'ir'], rand)
      const inf = elige(REGULARES[c], rand)
      const casillas = tabla(inf, t)
      r = { inf, tiempo: t, irregular: false, casillas, trampas: trampasRegular(inf, t, casillas.map(x => x.ok), nivel === 'dificil' ? 3 : 2, rand) }
    }
    const id = `${r.inf}-${r.tiempo}`
    if (recientes.includes(id) && intento < 10) continue
    recientes.push(id); if (recientes.length > 12) recientes.shift()
    return { ...r, id, nivel, fichas: barajar([...r.casillas.map(x => x.ok), ...r.trampas], rand) }
  }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)

// respuesta = array de 6 fichas en orden de persona
export function esCorrecta(r, resp) {
  return Array.isArray(resp) && resp.length === r.casillas.length && r.casillas.every((c, i) => resp[i] === c.ok)
}

export function explicacion(r) {
  const t = r.tiempo, c = conj(r.inf)
  if (r.irregular) {
    return r.tiempo === 'presente'
      ? `${r.inf} es irregular en presente: no sigue la regla de su conjugación (fíjate en la raíz de yo y en las que cambian).`
      : `${r.inf} es irregular en el pretérito perfecto simple: cambia la raíz y, en muchos, yo y él no llevan tilde (hice, hizo).`
  }
  const E = {
    presente: { ar: 'Presente de la 1.ª conjugación: -o, -as, -a, -amos, -áis, -an.', er: 'Presente de la 2.ª conjugación: -o, -es, -e, -emos, -éis, -en.', ir: 'Presente de la 3.ª conjugación: -o, -es, -e, -imos, -ís, -en (nosotros y vosotros con i).' },
    indefinido: { ar: 'Perfecto simple en -ar: -é, -aste, -ó, -amos, -asteis, -aron.', er: 'Perfecto simple en -er/-ir: -í, -iste, -ió, -imos, -isteis, -ieron.', ir: 'Perfecto simple en -er/-ir: -í, -iste, -ió, -imos, -isteis, -ieron.' },
    imperfecto: { ar: 'El imperfecto de la 1.ª conjugación lleva -aba- (cantaba, cantábamos).', er: 'El imperfecto de la 2.ª y 3.ª conjugación lleva -ía- (comía, comíamos).', ir: 'El imperfecto de la 2.ª y 3.ª conjugación lleva -ía- (vivía, vivíamos).' },
    futuro: 'El futuro se forma con el infinitivo entero + -é, -ás, -á, -emos, -éis, -án.',
    condicional: 'El condicional se forma con el infinitivo entero + -ía, -ías, -ía, -íamos, -íais, -ían.',
    perfecto: 'Pretérito perfecto compuesto = presente de haber (he, has, ha, hemos, habéis, han) + participio.',
    pluscuamperfecto: 'Pluscuamperfecto = imperfecto de haber (había, habías…) + participio.',
    futuroPerfecto: 'Futuro compuesto = futuro de haber (habré, habrás…) + participio.',
    subjPresente: { ar: 'El presente de subjuntivo de los verbos en -ar cambia la a por e: cante, cantes, cantemos.', er: 'El presente de subjuntivo de los verbos en -er/-ir lleva a: coma, comas, comamos.', ir: 'El presente de subjuntivo de los verbos en -er/-ir lleva a: viva, vivas, vivamos.' },
    subjImperfecto: { ar: 'Imperfecto de subjuntivo en -ar: -ara, -aras, -ara, -áramos, -arais, -aran.', er: 'Imperfecto de subjuntivo en -er/-ir: -iera, -ieras, -iera, -iéramos, -ierais, -ieran.', ir: 'Imperfecto de subjuntivo en -er/-ir: -iera, -ieras, -iera, -iéramos, -ierais, -ieran.' },
  }
  const e = E[t]
  return typeof e === 'string' ? e : e[c]
}

export function schemaQuestion(r) {
  const i = 0
  const c = r.casillas[i]
  const mal = r.trampas.map(t => forma({ ...c, ok: t }))
  const otras = r.casillas.filter(x => x.ok !== c.ok).map(forma)
  return {
    question: `Conjuga «${r.inf}» en ${TIEMPOS[r.tiempo].toLowerCase()}, persona ${PERSONAS[i]}`,
    correctAnswer: forma(c),
    wrongAnswers: [...new Set([...mal, ...otras])].filter(x => x !== forma(c)).slice(0, 3),
  }
}
