// El Mensajero: reported speech. Sale una frase en estilo directo y su
// versión indirecta con huecos; los huecos se rellenan con fichas de una
// bandeja que mezcla las correctas con las trampas de siempre (no cambiar el
// tiempo, no cambiar el pronombre, dejar el orden de pregunta…).
//
//   facil    afirmaciones: pronombre y tiempo verbal (am → was, can → could)
//   medio    más tiempos (present perfect, past simple, must, going to) y
//            palabras de tiempo y lugar (tomorrow → the next day, here → there)
//   dificil  preguntas (if/whether, where/what… sin do) y órdenes (told… to / not to)
//
// Las frases están escritas a mano (inglés británico). Las trampas son formas
// que un libro de texto marcaría mal: por eso no hay «saw» como trampa de un
// past simple (mantenerlo también se acepta) y se evitan las verdades
// permanentes, donde no cambiar el tiempo también vale.
//
// Sintaxis de cada frase indirecta: texto con huecos [ok|trampa1,trampa2].
//   ok puede llevar alternativas válidas con «/» (if/whether)
//   «=forma» tras el ok indica la forma de la frase directa (para explicar el cambio)
//   {N} es quien habla y {he} {his} {him} sus pronombres

export const HABLANTES = [
  { n: 'Tom', he: 'he', his: 'his', him: 'him' },
  { n: 'Anna', he: 'she', his: 'her', him: 'her' },
  { n: 'Leo', he: 'he', his: 'his', him: 'him' },
  { n: 'Lucy', he: 'she', his: 'her', him: 'her' },
  { n: 'Max', he: 'he', his: 'his', him: 'him' },
  { n: 'Emma', he: 'she', his: 'her', him: 'her' },
]

const F = (dir, ind, notas) => ({ dir, ind, notas })
export const BANCO = {
  facil: [
    F('“I am tired,” said {N}.', '{N} said (that) [{he}=I|I] [was=am|am,were] tired.', ['afirma']),
    F('“I like pizza,” said {N}.', '{N} said (that) [{he}=I|I] [liked=like|likes,like] pizza.', ['afirma']),
    F('“I’m watching TV,” said {N}.', '{N} said (that) [{he}=I|I] [was watching=am watching|is watching,were watching] TV.', ['afirma']),
    F('“I can swim,” said {N}.', '{N} said (that) [{he}=I|I] [could=can|can,would] swim.', ['afirma']),
    F('“I will help you,” {N} told me.', '{N} told me (that) [{he}=I|I] [would=will|will,could] help [me=you|you].', ['afirma']),
    F('“We are hungry,” said the children.', 'The children said (that) [they=we|we] [were=are|are,was] hungry.', ['afirma']),
    F('“I don’t like football,” said {N}.', '{N} said (that) [{he}=I|I] [didn’t like=don’t like|doesn’t like,don’t like] football.', ['afirma']),
    F('“My sister is at home,” said {N}.', '{N} said (that) [{his}=my|my] sister [was=is|is,were] at home.', ['afirma']),
    F('“I have a headache,” said {N}.', '{N} said (that) [{he}=I|I] [had=have|has,have] a headache.', ['afirma']),
    F('“I’m going to the cinema,” said {N}.', '{N} said (that) [{he}=I|I] [was going=am going|is going,am going] to the cinema.', ['afirma']),
    F('“I want an ice cream,” said {N}.', '{N} said (that) [{he}=I|I] [wanted=want|wants,want] an ice cream.', ['afirma']),
    F('“I can’t find my keys,” said {N}.', '{N} said (that) [{he}=I|I] [couldn’t=can’t|can’t,wouldn’t] find [{his}=my|my] keys.', ['afirma']),
    F('“You are late,” {N} told me.', '{N} told me (that) [I=you|you] [was=are|are,were] late.', ['afirma']),
    F('“I am not ready,” said {N}.', '{N} said (that) [{he}=I|I] [wasn’t=am not|isn’t,weren’t] ready.', ['afirma']),
  ],
  medio: [
    F('“I’ll call you tomorrow,” {N} told me.', '{N} told me (that) [{he}=I|I] [would=will|will] call me [the next day=tomorrow|tomorrow,the day before].', ['afirma', 'tiempo']),
    F('“I saw the film yesterday,” said {N}.', '{N} said (that) [{he}=I|I] [had seen=saw|has seen,sees] the film [the day before=yesterday|yesterday,the next day].', ['afirma', 'tiempo']),
    F('“I have finished my homework,” said {N}.', '{N} said (that) [{he}=I|I] [had finished=have finished|has finished,have finished] [{his}=my|my] homework.', ['afirma']),
    F('“We are leaving now,” said the twins.', 'The twins said (that) [they=we|we] [were leaving=are leaving|are leaving,was leaving] [then=now|now,today].', ['afirma', 'tiempo']),
    F('“I’m meeting Sara today,” said {N}.', '{N} said (that) [{he}=I|I] [was meeting=am meeting|is meeting,am meeting] Sara [that day=today|today,yesterday].', ['afirma', 'tiempo']),
    F('“I must go,” said {N}.', '{N} said (that) [{he}=I|I] [had to=must|must,has to] go.', ['afirma']),
    F('“I’m going to buy a bike next week,” said {N}.', '{N} said (that) [{he}=I|I] [was going to=am going to|is going to,am going to] buy a bike [the following week=next week|next week,last week].', ['afirma', 'tiempo']),
    F('“I bought this phone last month,” said {N}.', '{N} said (that) [{he}=I|I] [had bought=bought|has bought,buys] [that=this|this] phone [the month before=last month|last month,the next month].', ['afirma', 'tiempo']),
    F('“I have lived here for two years,” said {N}.', '{N} said (that) [{he}=I|I] [had lived=have lived|has lived,lives] [there=here|here] for two years.', ['afirma', 'tiempo']),
    F('“I met Paul two weeks ago,” said {N}.', '{N} said (that) [{he}=I|I] [had met=met|has met,meets] Paul two weeks [before=ago|ago].', ['afirma', 'tiempo']),
    F('“I can come tonight,” said {N}.', '{N} said (that) [{he}=I|I] [could=can|can,would] come [that night=tonight|tonight,last night].', ['afirma', 'tiempo']),
    F('“We have never been to London,” said the girls.', 'The girls said (that) [they=we|we] [had never been=have never been|have never been,has never been] to London.', ['afirma']),
    F('“I will see you tomorrow,” {N} told us.', '{N} told us (that) [{he}=I|I] [would=will|will] see [us=you|you] [the next day=tomorrow|tomorrow].', ['afirma', 'tiempo']),
    F('“These shoes are too small,” said {N}.', '{N} said (that) [those=these|these] shoes [were=are|are,was] too small.', ['afirma', 'tiempo']),
  ],
  dificil: [
    F('“Are you coming to the party?” {N} asked me.', '{N} asked me [if/whether|that] [I=you|you] [was coming=are coming|am coming,were coming] to the party.', ['siNo']),
    F('“Do you like jazz?” {N} asked me.', '{N} asked me [if/whether|that,do] [I=you|you] [liked=like|like,did like] jazz.', ['siNo']),
    F('“Can you swim?” {N} asked me.', '{N} asked me [if/whether|that] [I=you|you] [could=can|can] swim.', ['siNo']),
    F('“Have you finished?” {N} asked us.', '{N} asked us [if/whether|that] [we=you|you] [had finished=have finished|have finished,has finished].', ['siNo']),
    F('“Where do you live?” {N} asked me.', '{N} asked me where [I=you|did,you] [lived=live|live,living].', ['wh']),
    F('“What are you doing?” {N} asked me.', '{N} asked me what [I=you|was,you] [was doing=are doing|am doing,were doing].', ['wh']),
    F('“Why are you crying?” {N} asked the little girl.', '{N} asked the little girl why [she=you|was,you] [was crying=are crying|is crying,were crying].', ['wh']),
    F('“When does the film start?” {N} asked.', '{N} asked when the film [started=starts|starts,does start,did start].', ['wh']),
    F('“How old are you?” {N} asked me.', '{N} asked me how old [I=you|was,you] [was=are|am,were].', ['wh']),
    F('“Sit down,” the teacher told us.', 'The teacher told us [to sit|sit,sat,sitting] down.', ['orden']),
    F('“Don’t touch the cake,” Mum told {N}.', 'Mum told {N} [not to touch|don’t touch,didn’t touch,not touch] the cake.', ['orden']),
    F('“Close the window, please,” {N} asked me.', '{N} asked me [to close|close,closed,closing] the window.', ['orden']),
    F('“Don’t be late,” {N} told us.', '{N} told us [not to be|don’t be,weren’t,not be] late.', ['orden']),
    F('“Please help me,” {N} asked us.', '{N} asked us [to help|help,helped] [{him}=me|me].', ['orden']),
  ],
}
export const NIVELES = { facil: {}, medio: {}, dificil: {} }

const sust = (s, h) => s.replace(/\{N\}/g, h.n).replace(/\{he\}/g, h.he).replace(/\{his\}/g, h.his).replace(/\{him\}/g, h.him)

// «{N} said (that) [{he}=I|I] …» → partes: textos y huecos { ok: [...], trampas: [...], de }
export function partes(ind, h) {
  const out = []
  const re = /\[([^\]]+)\]/g
  let i = 0, m
  while ((m = re.exec(ind))) {
    if (m.index > i) out.push(sust(ind.slice(i, m.index), h))
    const [okDe, tr = ''] = m[1].split('|')
    const [ok, de] = okDe.split('=')
    out.push({ ok: ok.split('/').map(x => sust(x, h)), trampas: tr ? tr.split(',').map(x => sust(x, h)) : [], de: de ? sust(de, h) : null })
    i = m.index + m[0].length
  }
  if (i < ind.length) out.push(sust(ind.slice(i), h))
  return out
}

const baraja = (arr, rand) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}

// Fichas: todas las correctas (con sus alternativas) y las trampas, sin
// repetir una trampa que ya sea la ficha correcta de otro hueco.
export function bandeja(ps, rand = Math.random) {
  const huecos = ps.filter(p => typeof p !== 'string')
  const buenas = huecos.flatMap(h => h.ok)
  const malas = [...new Set(huecos.flatMap(h => h.trampas))].filter(t => !buenas.includes(t))
  return baraja([...buenas, ...malas], rand).map((texto, id) => ({ id, texto }))
}

const recientes = []
export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const banco = BANCO[nivel]
  let idx
  for (let k = 0; k < 20; k++) {
    idx = Math.floor(rand() * banco.length)
    if (!recientes.includes(`${nivel}:${idx}`)) break
  }
  recientes.push(`${nivel}:${idx}`); if (recientes.length > 8) recientes.shift()
  const h = HABLANTES[Math.floor(rand() * HABLANTES.length)]
  const f = banco[idx]
  const ps = partes(f.ind, h)
  return { id: `${nivel}:${idx}:${h.n}`, nivel, directa: sust(f.dir, h), partes: ps, fichas: bandeja(ps, rand), notas: f.notas }
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)

// Respuesta: array con el texto elegido para cada hueco, en orden
export function esCorrecta(r, elegidas) {
  if (!Array.isArray(elegidas)) return false
  const huecos = r.partes.filter(p => typeof p !== 'string')
  return huecos.length === elegidas.length && huecos.every((h, i) => h.ok.includes(elegidas[i]))
}

// La frase indirecta correcta, con «(that)» opcional y if/whether tal cual
export function fraseCorrecta(r) {
  return r.partes.map(p => (typeof p === 'string' ? p : p.ok.join(' / '))).join('').replace(/\s+/g, ' ').trim()
}
export function fraseCon(r, elegidas) {
  let i = 0
  return r.partes.map(p => (typeof p === 'string' ? p : elegidas[i++])).join('').replace(/\s+/g, ' ').trim()
}

const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
const NOTAS = {
  afirma: ['Al contar lo que alguien dijo con said o told, el verbo da un paso atrás en el pasado (am → was, will → would, can → could) y los pronombres cambian según quién habla.',
    'When you report what someone said with said or told, the verb moves one step back into the past (am → was, will → would, can → could) and the pronouns change to match who is speaking.',
    'Quan expliques el que algú va dir amb said o told, el verb fa un pas enrere cap al passat (am → was, will → would, can → could) i els pronoms canvien segons qui parla.'],
  tiempo: ['También cambian las palabras de tiempo y lugar: tomorrow → the next day, yesterday → the day before, now → then, here → there, this → that.',
    'Words for time and place change too: tomorrow → the next day, yesterday → the day before, now → then, here → there, this → that.',
    'També canvien les paraules de temps i lloc: tomorrow → the next day, yesterday → the day before, now → then, here → there, this → that.'],
  siNo: ['Las preguntas de sí o no se cuentan con if o whether, con el orden de una afirmación (sujeto + verbo) y sin signo de interrogación.',
    'Yes/no questions are reported with if or whether, in statement word order (subject + verb) and with no question mark.',
    'Les preguntes de sí o no s’expliquen amb if o whether, amb l’ordre d’una afirmació (subjecte + verb) i sense signe d’interrogació.'],
  wh: ['Las preguntas con where, what, why… conservan esa palabra, pero el sujeto va antes del verbo, desaparece do/does/did y el verbo da un paso atrás.',
    'Questions with where, what, why… keep that word, but the subject goes before the verb, do/does/did disappears and the verb moves one step back.',
    'Les preguntes amb where, what, why… conserven aquesta paraula, però el subjecte va abans del verb, desapareix do/does/did i el verb fa un pas enrere.'],
  orden: ['Las órdenes y las peticiones se cuentan con told o asked + persona + to + verbo; si son negativas, not to (told us not to be late).',
    'Commands and requests are reported with told or asked + person + to + verb; negative ones take not to (told us not to be late).',
    'Les ordres i les peticions s’expliquen amb told o asked + persona + to + verb; si són negatives, not to (told us not to be late).'],
}
export function explicacion(r, l) {
  const cambios = r.partes.filter(p => typeof p !== 'string' && p.de && p.de !== p.ok[0]).map(p => `${p.de} → ${p.ok[0]}`)
  const k = l === 'en' ? 1 : l === 'ca' ? 2 : 0
  const notas = r.notas.map(n => NOTAS[n][k]).join(' ')
  return cambios.length ? `${s(l, 'Cambios', 'Changes', 'Canvis')}: ${cambios.join(' · ')}. ${notas}` : notas
}

// Para el examen tipo test (schema): la frase buena contra frases con trampas
export function schemaQuestion(r, l) {
  const huecos = r.partes.filter(p => typeof p !== 'string')
  const correctAnswer = fraseCon(r, huecos.map(h => h.ok[0]))
  const malas = []
  huecos.forEach((h, i) => h.trampas.forEach(t => {
    const el = huecos.map(x => x.ok[0]); el[i] = t
    malas.push(fraseCon(r, el))
  }))
  malas.push(fraseCon(r, huecos.map(h => h.trampas[0] ?? h.ok[0])))
  const wrongAnswers = [...new Set(malas)].filter(m => m !== correctAnswer).slice(0, 3)
  return { question: s(l, `Pasa a estilo indirecto: ${r.directa}`, `Put into reported speech: ${r.directa}`, `Passa a estil indirecte: ${r.directa}`), correctAnswer, wrongAnswers }
}
