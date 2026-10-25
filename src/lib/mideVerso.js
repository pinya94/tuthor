// Mide el verso (Lengua · métrica, de 5.º de Primaria a Bachillerato): un
// fragmento de un poema de dominio público y preguntas para medirlo.
//
// Todas las respuestas salen de lib/metrica.js (sílabas, acento, rima,
// estrofa), y el test comprueba que coinciden con el metro conocido de cada
// poema: aquí no hay nada contado a mano.
//
// Tipos de pregunta:
//   silabas   ¿cuántas sílabas métricas tiene el verso señalado?
//   final     ¿cómo es su última palabra? (aguda +1, llana, esdrújula −1)
//   nombre    ¿cómo se llama un verso así? (octosílabo, endecasílabo…)
//   rima      ¿qué rima tienen estos dos versos? (consonante, asonante, libre)
//   estrofa   ¿qué estrofa forman los cuatro? (redondilla, cuarteta, cuarteto, romance)
import { FRAGMENTOS } from '../data/versos'
import { medir, tipoRima, estrofa, NOMBRE_METRO, silabear } from './metrica'

export const NIVELES = {
  facil:   { tipos: ['silabas', 'final', 'rima'], metros: [8] },
  medio:   { tipos: ['silabas', 'silabas', 'nombre', 'rima', 'final'], metros: [7, 8, 9, 11] },
  dificil: { tipos: ['silabas', 'silabas', 'nombre', 'estrofa', 'rima'], metros: [7, 8, 9, 11, 14] },
}
export const ESTROFAS = ['redondilla', 'cuarteta', 'cuarteto', 'romance']
const RIMAS = ['consonante', 'asonante', 'libre']
const FINALES = ['aguda', 'llana', 'esdrujula']

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => [...xs].sort(() => rand() - 0.5)

// Todos los versos sueltos, con su medida.
const VERSOS = FRAGMENTOS.flatMap(f => f.versos.map((v, i) => ({ f, i, m: medir(v) })))

let seq = 0

// La ronda clásica de un tipo (con opciones): la usan las mecánicas (ver
// «Mecánicas» al final).
function genVieja(nivel, pregunta, rand, evitar) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const base = { id: ++seq, nivel, pregunta }
    if (pregunta === 'estrofa') {
      const f = elige(rand, FRAGMENTOS.filter(x => x.estrofa))
      if (f.id === evitar) continue
      return { ...base, clave: f.id, fragmento: f, marcados: [0, 1, 2, 3], bueno: estrofa(f.versos), opciones: ESTROFAS }
    }
    if (pregunta === 'rima') {
      const f = elige(rand, FRAGMENTOS)
      const pares = []
      for (let i = 0; i < f.versos.length; i++) for (let j = i + 1; j < f.versos.length; j++) pares.push([i, j, tipoRima(f.versos[i], f.versos[j])])
      // Tres de cada cuatro, un par que rima: si no, casi todo saldría «libre».
      const quiere = rand() < 0.75 ? pares.filter(p => p[2] !== 'libre') : pares.filter(p => p[2] === 'libre')
      if (!quiere.length) continue
      const [i, j, tipo] = elige(rand, quiere)
      return { ...base, clave: `${f.id}${i}${j}`, fragmento: f, marcados: [i, j], bueno: tipo, opciones: RIMAS }
    }
    const v = elige(rand, VERSOS.filter(x => cfg.metros.includes(x.m.silabas)))
    const clave = `${v.f.id}${v.i}`
    if (clave === evitar) continue
    const comun = { ...base, clave, fragmento: v.f, marcados: [v.i], medida: v.m }
    if (pregunta === 'final') return { ...comun, bueno: v.m.final, opciones: FINALES }
    if (pregunta === 'nombre') {
      const n = v.m.silabas
      const otros = baraja(rand, [7, 8, 9, 11, 14, 6, 10].filter(x => x !== n)).slice(0, 3)
      return { ...comun, bueno: n, opciones: [n, ...otros].sort((a, b) => a - b) }
    }
    // silabas: fallos típicos = contar sin sinalefas ni ley del acento final (las
    // fonológicas) y quedarse a una de distancia.
    const n = v.m.silabas
    const ops = [n]
    for (const x of baraja(rand, [v.m.fonologicas, n + 1, n - 1, n + 2, n - 2])) if (x > 2 && !ops.includes(x) && ops.length < 4) ops.push(x)
    return { ...comun, bueno: n, opciones: ops.sort((a, b) => a - b) }
  }
}


// ── Textos ───────────────────────────────────────────────────────────────
const T = (es, en, ca) => ({ es, en, ca })
const tx = (o, l) => o[l] ?? o.es

const NOMBRE_METRO_T = {
  6: T('Hexasílabo (6)', 'Hexasyllable (6)', 'Hexasíl·lab (6)'),
  7: T('Heptasílabo (7)', 'Heptasyllable (7)', 'Heptasíl·lab (7)'),
  8: T('Octosílabo (8)', 'Octosyllable (8)', 'Octosíl·lab (8)'),
  9: T('Eneasílabo (9)', 'Enneasyllable (9)', 'Eneasíl·lab (9)'),
  10: T('Decasílabo (10)', 'Decasyllable (10)', 'Decasíl·lab (10)'),
  11: T('Endecasílabo (11)', 'Hendecasyllable (11)', 'Endecasíl·lab (11)'),
  14: T('Alejandrino (14)', 'Alexandrine (14)', 'Alexandrí (14)'),
}
const NOMBRE_ESTROFA = {
  redondilla: T('Redondilla (8 · abba)', 'Redondilla (8 · abba)', 'Redondilla (8 · abba)'),
  cuarteta: T('Cuarteta (8 · abab)', 'Cuarteta (8 · abab)', 'Quarteta (8 · abab)'),
  cuarteto: T('Cuarteto (11 · ABBA)', 'Cuarteto (11 · ABBA)', 'Quartet (11 · ABBA)'),
  romance: T('Romance (8 · rima en los pares)', 'Romance (8 · even lines rhyme)', 'Romanç (8 · rima als parells)'),
}
const NOMBRE_RIMA = {
  consonante: T('Consonante', 'Full rhyme (consonante)', 'Consonant'),
  asonante: T('Asonante', 'Assonance (asonante)', 'Assonant'),
  libre: T('No riman', 'They don’t rhyme', 'No rimen'),
}
const NOMBRE_FINAL = {
  aguda: T('Aguda: se suma una sílaba', 'Stressed on the last syllable (aguda): add one', 'Aguda: se suma una síl·laba'),
  llana: T('Llana: se queda igual', 'Stressed on the second-to-last (llana): no change', 'Plana: es queda igual'),
  esdrujula: T('Esdrújula: se resta una sílaba', 'Stressed on the third-to-last (esdrújula): subtract one', 'Esdrúixola: es resta una síl·laba'),
}

export function textoOpcion(o, ronda, l) {
  switch (ronda.pregunta) {
    case 'estrofa': return tx(NOMBRE_ESTROFA[o], l)
    case 'rima': return tx(NOMBRE_RIMA[o], l)
    case 'final': return tx(NOMBRE_FINAL[o], l)
    case 'nombre': return tx(NOMBRE_METRO_T[o], l)
    default: return String(o)
  }
}

function enunciadoViejo(ronda, l) {
  return tx({
    silabas: T('¿Cuántas sílabas métricas tiene el verso señalado?', 'How many metrical syllables does the marked line have?', 'Quantes síl·labes mètriques té el vers assenyalat?'),
    final: T('¿Cómo es la última palabra del verso señalado, y qué se hace al contar?', 'What is the last word of the marked line like, and what do you do when counting?', 'Com és l’última paraula del vers assenyalat, i què es fa en comptar?'),
    nombre: T('¿Cómo se llama un verso como el señalado?', 'What is a line like the marked one called?', 'Com es diu un vers com l’assenyalat?'),
    rima: T('¿Qué rima tienen los dos versos señalados?', 'What kind of rhyme do the two marked lines have?', 'Quina rima tenen els dos versos assenyalats?'),
    estrofa: T('¿Qué estrofa forman estos cuatro versos?', 'Which stanza do these four lines form?', 'Quina estrofa formen aquests quatre versos?'),
  }[ronda.pregunta], l)
}

// La cuenta, verso por verso: «Con-diez-ca-ño-nes…: 8 sílabas».
export function cuenta(m, l) {
  const partes = m.tramos.map(t => {
    const base = t.segs.length
    const ajuste = t.ajuste === 1 ? ` + 1 (${tx(T('aguda', 'stressed last', 'aguda'), l)})` : t.ajuste === -1 ? ` − 1 (${tx(T('esdrújula', 'stressed third-to-last', 'esdrúixola'), l)})` : ''
    return ajuste ? `${t.segs.join('-')} → ${base}${ajuste} = ${t.metricas}` : `${t.segs.join('-')} → ${t.metricas}`
  })
  return partes.join(' | ')
}

function explicacionVieja(ronda, l) {
  const r = ronda, f = r.fragmento
  switch (r.pregunta) {
    case 'silabas': case 'nombre': {
      const sin = r.medida.tramos.some(t => t.sinalefas) ? tx(T(' (‿ = sinalefa: la vocal final de una palabra y la inicial de la siguiente forman una sola sílaba)', ' (‿ = synalepha: the final vowel of one word and the first vowel of the next make one syllable)', ' (‿ = sinalefa: la vocal final d’una paraula i la inicial de la següent formen una sola síl·laba)'), l) : ''
      const ces = r.medida.tramos.length > 1 ? tx(T(' Es un verso compuesto: cada hemistiquio se cuenta por separado.', ' It is a compound line: each half is counted separately.', ' És un vers compost: cada hemistiqui es compta per separat.'), l) : ''
      const nom = r.pregunta === 'nombre' ? ` ${tx(T('Un verso de', 'A line of', 'Un vers de'), l)} ${r.bueno} ${tx(T('sílabas es un', 'syllables is an', 'síl·labes és un'), l)} ${NOMBRE_METRO[r.bueno]}.` : ''
      return `${cuenta(r.medida, l)}${sin}.${ces}${nom}`
    }
    case 'final': {
      const ult = r.medida.ultima
      return tx({
        aguda: T(`«${ult}» es aguda: tras ella se cuenta una sílaba más, porque la voz se alarga en la sílaba tónica.`, `"${ult}" is stressed on the last syllable (aguda): you add one syllable, because the voice lingers on the stressed syllable.`, `«${ult}» és aguda: s’hi compta una síl·laba més, perquè la veu s’allarga en la síl·laba tònica.`),
        llana: T(`«${ult}» es llana: el verso se queda con las sílabas que tiene. Es lo más frecuente en español.`, `"${ult}" is stressed on the second-to-last syllable (llana): the line keeps its syllables. It is the most common case in Spanish.`, `«${ult}» és plana: el vers es queda amb les síl·labes que té. És el més freqüent en castellà.`),
        esdrujula: T(`«${ult}» es esdrújula: se resta una sílaba.`, `"${ult}" is stressed on the third-to-last syllable (esdrújula): subtract one syllable.`, `«${ult}» és esdrúixola: es resta una síl·laba.`),
      }[r.bueno], l)
    }
    case 'rima': {
      const [a, b] = r.marcados.map(i => f.versos[i])
      const pa = a.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]/g, '').trim().split(/\s+/).pop()
      const pb = b.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]/g, '').trim().split(/\s+/).pop()
      return tx({
        consonante: T(`«${pa}» y «${pb}» coinciden en vocales y consonantes desde la vocal tónica: rima consonante.`, `"${pa}" and "${pb}" match in vowels and consonants from the stressed vowel on: full rhyme (consonante).`, `«${pa}» i «${pb}» coincideixen en vocals i consonants des de la vocal tònica: rima consonant.`),
        asonante: T(`«${pa}» y «${pb}» coinciden solo en las vocales desde la vocal tónica: rima asonante.`, `"${pa}" and "${pb}" match only in the vowels from the stressed vowel on: assonance (asonante).`, `«${pa}» i «${pb}» coincideixen només en les vocals des de la vocal tònica: rima assonant.`),
        libre: T(`«${pa}» y «${pb}» no coinciden ni en las vocales desde la tónica: no riman.`, `"${pa}" and "${pb}" don’t even match in the vowels from the stressed one: they don’t rhyme.`, `«${pa}» i «${pb}» no coincideixen ni en les vocals des de la tònica: no rimen.`),
      }[r.bueno], l)
    }
    default: return tx({
      redondilla: T('Cuatro octosílabos con rima consonante abba: el primero con el cuarto y el segundo con el tercero. Es una redondilla.', 'Four eight-syllable lines with full rhyme abba: first with fourth and second with third. It is a redondilla.', 'Quatre octosíl·labs amb rima consonant abba: el primer amb el quart i el segon amb el tercer. És una redondilla.'),
      cuarteta: T('Cuatro octosílabos con rima consonante abab, alterna. Es una cuarteta.', 'Four eight-syllable lines with alternating full rhyme abab. It is a cuarteta.', 'Quatre octosíl·labs amb rima consonant abab, alterna. És una quarteta.'),
      cuarteto: T('Cuatro endecasílabos con rima consonante ABBA (mayúsculas: versos de arte mayor). Los sonetos empiezan con dos cuartetos.', 'Four eleven-syllable lines with full rhyme ABBA (capitals: long lines). Sonnets begin with two cuartetos.', 'Quatre endecasíl·labs amb rima consonant ABBA (majúscules: versos d’art major). Els sonets comencen amb dos quartets.'),
      romance: T('Octosílabos con rima asonante en los pares y los impares sueltos: es un romance (aquí, un fragmento).', 'Eight-syllable lines with assonance on the even lines and the odd ones unrhymed: it is a romance (here, an excerpt).', 'Octosíl·labs amb rima assonant als parells i els senars lliures: és un romanç (aquí, un fragment).'),
    }[r.bueno], l)
  }
}

// Sin el poema delante no hay pregunta posible.
export function schemaQuestion() {
  return null
}

// ── Mecánicas ─────────────────────────────────────────────────────────────
// Sin opciones (genVieja sigue dando la ronda y el texto del schema):
//   teclea     (silabas)  el número de sílabas métricas
//   tonica     (final)    tocar la sílaba tónica de la última palabra
//   clasifica  (nombre)   tres versos a la caja de su nombre (octosílabo…)
//   clasifica  (rima)     tres parejas de palabras finales a consonante / asonante / no riman
//   esquema    (estrofa)  poner a cada verso su letra de rima (a, b o –)
export const MECANICA_DE_TIPO = { silabas: 'teclea', final: 'tonica', nombre: 'clasifica', rima: 'clasifica', estrofa: 'esquema' }
// Esquema de cada estrofa (en minúsculas; el romance deja sueltos los impares)
export const ESQUEMA = { redondilla: 'abba', cuarteto: 'abba', cuarteta: 'abab', serventesio: 'abab', romance: '-a-a' }

const ultimaPalabra = v => v.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ |]/g, '').replace(/\|/g, ' ').trim().split(/\s+/).pop()

// Un esquema escrito por el jugador, con las letras renombradas por orden de
// aparición: «baab» y «abba» son el mismo esquema.
export function normaliza(esq) {
  const mapa = {}
  let sig = 0
  return [...esq].map(c => (c === '-' ? '-' : (mapa[c] ??= 'ab'[sig++] ?? 'c'))).join('')
}

const recientes = []
export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const pregunta = elige(rand, cfg.tipos)
  for (let intento = 0; ; intento++) {
    const r = { ...genVieja(nivel, pregunta, rand), mecanica: MECANICA_DE_TIPO[pregunta] }
    if (pregunta === 'final') {
      // La tónica de una palabra de una sola sílaba no se elige: fuera
      const { silabas, tonica } = silabear(r.medida.ultima)
      if (silabas.length < 2) continue
      r.silabasUltima = silabas
      r.tonica = tonica
    }
    if (pregunta === 'nombre') {
      // Tres versos de medidas distintas (del nivel), cada uno a su caja
      const metros = baraja(rand, [...new Set(VERSOS.filter(x => cfg.metros.includes(x.m.silabas)).map(x => x.m.silabas))])
      if (metros.length < 2) continue
      const tres = metros.slice(0, 3)
      r.items = tres.map(n => { const v = elige(rand, VERSOS.filter(x => x.m.silabas === n)); return `${FRAGMENTOS.indexOf(v.f)}:${v.i}` })
      const extra = [7, 8, 9, 11, 14].filter(n => !tres.includes(n))
      r.cajas = baraja(rand, [...tres, ...(tres.length < 3 ? extra.slice(0, 3 - tres.length) : [])])
    }
    if (pregunta === 'rima') {
      // Una pareja de cada tipo, de fragmentos al azar
      const pares = { consonante: [], asonante: [], libre: [] }
      for (const f of FRAGMENTOS) for (let i = 0; i < f.versos.length; i++) for (let j = i + 1; j < f.versos.length; j++) {
        const a = ultimaPalabra(f.versos[i]), b = ultimaPalabra(f.versos[j])
        if (a.toLowerCase() !== b.toLowerCase()) pares[tipoRima(f.versos[i], f.versos[j])].push(`${FRAGMENTOS.indexOf(f)}:${i}:${j}`)
      }
      r.items = baraja(rand, RIMAS.map(t => elige(rand, pares[t])))
      r.cajas = RIMAS
    }
    if (pregunta === 'estrofa' && !ESQUEMA[r.bueno]) continue
    const t = `${pregunta}${r.clave}${(r.items ?? []).join()}`
    if (intento < 20 && recientes.includes(t)) continue
    recientes.push(t)
    if (recientes.length > 6) recientes.shift()
    return r
  }
}
export const genRound = difficulty => genRonda(difficulty)

// Datos de un elemento al clasificar
export function cajaDe(r, it) {
  const [fi, i, j] = it.split(':').map(Number)
  const f = FRAGMENTOS[fi]
  return r.pregunta === 'nombre' ? medir(f.versos[i]).silabas : tipoRima(f.versos[i], f.versos[j])
}
export function textoItem(r, it) {
  const [fi, i, j] = it.split(':').map(Number)
  const f = FRAGMENTOS[fi]
  return r.pregunta === 'nombre' ? f.versos[i].replace(/\s*\|\s*/g, '  ') : `${ultimaPalabra(f.versos[i])} / ${ultimaPalabra(f.versos[j])}`
}
export const nombreCaja = (r, c, l) => (r.pregunta === 'nombre' ? tx(NOMBRE_METRO_T[c], l) : tx(NOMBRE_RIMA[c], l))

export function respuestaBuena(r) {
  if (r.mecanica === 'clasifica') return 'clasifica:0'
  if (r.mecanica === 'tonica') return String(r.tonica)
  if (r.mecanica === 'esquema') return ESQUEMA[r.bueno]
  return String(r.bueno)
}
export function esCorrecta(r, o) {
  if (o == null) return false
  if (!r.mecanica) return o === r.bueno
  if (r.mecanica === 'teclea') return Number(String(o).trim()) === r.bueno
  if (r.mecanica === 'esquema') return normaliza(String(o)) === ESQUEMA[r.bueno]
  return o === respuestaBuena(r)
}
export const isCorrect = esCorrecta

export function enunciado(r, l) {
  switch (r.mecanica) {
    case 'teclea': return `${enunciadoViejo(r, l)} ${tx(T('Escribe el número.', 'Type the number.', 'Escriu el número.'), l)}`
    case 'tonica': return tx(T(`Toca la sílaba tónica de «${r.medida.ultima}», la última palabra del verso señalado`, `Tap the stressed syllable of "${r.medida.ultima}", the last word of the marked line`, `Toca la síl·laba tònica de «${r.medida.ultima}», l’última paraula del vers assenyalat`), l)
    case 'clasifica': return r.pregunta === 'nombre'
      ? tx(T('Mide cada verso y llévalo a la caja de su nombre', 'Measure each line and put it in the box for its name', 'Mesura cada vers i porta’l a la caixa del seu nom'), l)
      : tx(T('¿Cómo riman estas parejas de palabras finales? Lleva cada una a su caja', 'How do these pairs of line endings rhyme? Put each in its box', 'Com rimen aquestes parelles de paraules finals? Porta cadascuna a la seva caixa'), l)
    case 'esquema': return tx(T('Pon a cada verso su letra de rima: los que riman entre sí, la misma letra; los sueltos, «–»', 'Give each line its rhyme letter: lines that rhyme together get the same letter; unrhymed ones, “–”', 'Posa a cada vers la seva lletra de rima: els que rimen entre si, la mateixa lletra; els solts, «–»'), l)
    default: return enunciadoViejo(r, l)
  }
}

export function explicacion(r, l) {
  if (r.mecanica === 'clasifica') {
    return r.items.map(it => `«${textoItem(r, it).replace(/[,.;:]+$/, '')}» → ${nombreCaja(r, cajaDe(r, it), l).toLowerCase()}`).join(' · ')
  }
  if (r.mecanica === 'esquema') return `${ESQUEMA[r.bueno]}: ${explicacionVieja(r, l)}`
  return explicacionVieja(r, l)
}
