// ¿Qué Ves?: inglés de Primaria con una escena dibujada. Se genera un parque
// (niños con su mascota y lo que están haciendo, pájaros, patos, flores…) y
// frases sobre él con huecos que se llenan con fichas. Para acertar hay que
// mirar el dibujo (cuántos hay, de quién es, qué hace) y saber la gramática.
// Cubre cinco temas que solo tenían examen tipo test:
//   there-is-there-are · have-got · present-continuous · can · possessives
//
//   facil    un hueco por frase (la gramática)
//   medio    dos huecos: la gramática y lo que se ve en el dibujo
//   dificil  preguntas y negativas (Is Tom swimming? — No, he isn't.)
//
// Inglés británico (has got). Las trampas son formas que un libro marcaría
// mal (is/are cambiados, has/have, -s tras can, he/his…), y las del dibujo,
// datos de la escena que no son (otro número, otro niño, otra acción).

export const NOMBRES = [
  { n: 'Tom', he: 'he', his: 'his', He: 'He' }, { n: 'Anna', he: 'she', his: 'her', He: 'She' },
  { n: 'Leo', he: 'he', his: 'his', He: 'He' }, { n: 'Lucy', he: 'she', his: 'her', He: 'She' },
  { n: 'Max', he: 'he', his: 'his', He: 'He' }, { n: 'Emma', he: 'she', his: 'her', He: 'She' },
]
// Lo que hacen los niños: emoji de la escena y formas del verbo
export const ACCIONES = {
  run: { emoji: '🏃', ing: 'running', base: 'run', s: 'runs' },
  swim: { emoji: '🏊', ing: 'swimming', base: 'swim', s: 'swims', agua: true },
  bike: { emoji: '🚴', ing: 'riding a bike', base: 'ride a bike', s: 'rides a bike' },
  read: { emoji: '🧒', prop: '📖', ing: 'reading', base: 'read', s: 'reads' },
  eat: { emoji: '🧒', prop: '🍎', ing: 'eating an apple', base: 'eat an apple', s: 'eats an apple' },
  sing: { emoji: '🧒', prop: '🎤', ing: 'singing', base: 'sing', s: 'sings' },
  football: { emoji: '🧒', prop: '⚽', ing: 'playing football', base: 'play football', s: 'plays football' },
  sleep: { emoji: '😴', ing: 'sleeping', base: 'sleep', s: 'sleeps' },
}
export const MASCOTAS = {
  dog: { emoji: '🐶', a: 'a dog' }, cat: { emoji: '🐱', a: 'a cat' }, rabbit: { emoji: '🐰', a: 'a rabbit' },
  hamster: { emoji: '🐹', a: 'a hamster' }, turtle: { emoji: '🐢', a: 'a turtle' },
}
// Grupos que se cuentan (ninguno coincide con las mascotas)
export const GRUPOS = {
  birds: { emoji: '🐦', uno: 'bird', varios: 'birds', donde: 'in the sky' },
  ducks: { emoji: '🦆', uno: 'duck', varios: 'ducks', donde: 'in the pond' },
  flowers: { emoji: '🌷', uno: 'flower', varios: 'flowers', donde: 'in the garden' },
  butterflies: { emoji: '🦋', uno: 'butterfly', varios: 'butterflies', donde: 'near the flowers' },
}
const NUM = ['no', 'one', 'two', 'three', 'four', 'five']
// Capacidades sin discusión posible (y su negativa)
const PUEDE = [
  ['A bird', 'fly'], ['A fish', 'swim'], ['A duck', 'swim'], ['A dog', 'run'], ['A rabbit', 'jump'], ['A frog', 'jump'],
]
const NO_PUEDE = [['A fish', 'walk'], ['A dog', 'fly'], ['A cat', 'read'], ['A turtle', 'run fast'], ['A rabbit', 'swim like a fish']]

export const TEMAS = ['there-is-there-are', 'have-got', 'present-continuous', 'can', 'possessives']
export const NIVELES = { facil: {}, medio: {}, dificil: {} }

const elige = (rand, arr) => arr[Math.floor(rand() * arr.length)]
const baraja = (arr, rand) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a }

// Escena: 2 o 3 niños (acción y mascota distintas) y los cuatro grupos
export function genEscena(rand = Math.random) {
  const nombres = baraja(NOMBRES, rand)
  // al menos un chico y una chica, para que his/her se distinga
  const chico = nombres.find(x => x.he === 'he'), chica = nombres.find(x => x.he === 'she')
  const resto = nombres.filter(x => x !== chico && x !== chica)
  const ninos = baraja([chico, chica, ...(rand() < 0.5 ? [resto[0]] : [])], rand)
  const acciones = baraja(Object.keys(ACCIONES), rand)
  const mascotas = baraja(Object.keys(MASCOTAS), rand)
  return {
    ninos: ninos.map((p, i) => ({ ...p, accion: acciones[i], mascota: mascotas[i] })),
    grupos: Object.fromEntries(Object.keys(GRUPOS).map(g => [g, Math.floor(rand() * 6)])), // 0-5
  }
}

// Una frase: texto con huecos { ok: [...], trampas: [...], tipo: 'gram'|'dibujo' }
const H = (ok, trampas, tipo = 'gram') => ({ ok: [].concat(ok), trampas, tipo })

function frase(tema, nivel, esc, rand) {
  const dos = nivel !== 'facil'
  const nino = elige(rand, esc.ninos)
  const otro = elige(rand, esc.ninos.filter(x => x !== nino))
  if (tema === 'there-is-there-are') {
    const g = elige(rand, Object.keys(GRUPOS)), c = esc.grupos[g], G = GRUPOS[g]
    if (nivel === 'dificil') {
      if (c === 0) return { partes: ['There ', H("aren't any", ["isn't any", "aren't some"]), ` ${G.varios} ${G.donde}.`] }
      return { partes: ['How many ', G.varios, ' ', H('are there', ['there are', 'is there']), ` ${G.donde}? — There `, H(c === 1 ? 'is' : 'are', [c === 1 ? 'are' : 'is', 'am']), ' ', H(NUM[c], [NUM[c === 5 ? 4 : c + 1], NUM[c === 1 ? 2 : c - 1]].filter(x => x !== 'no'), 'dibujo'), '.'] }
    }
    if (c === 0) return { partes: ['There ', H("aren't", ["isn't", "don't"]), ` any ${G.varios} ${G.donde}.`] }
    const verbo = H(c === 1 ? 'is' : 'are', [c === 1 ? 'are' : 'is', 'am'])
    if (!dos) return { partes: ['There ', verbo, ` ${c === 1 ? 'a' : NUM[c]} ${c === 1 ? G.uno : G.varios} ${G.donde}.`] }
    const malos = [c + 1, c - 1, c + 2].filter(n => n >= 1 && n <= 5 && n !== c).slice(0, 2).map(n => NUM[n])
    return { partes: ['There ', verbo, ' ', H(c === 1 ? 'one' : NUM[c], malos, 'dibujo'), ` ${c === 1 ? G.uno : G.varios} ${G.donde}.`] }
  }
  if (tema === 'have-got') {
    const M = MASCOTAS[nino.mascota]
    if (nivel === 'dificil') {
      const ajena = MASCOTAS[otro.mascota]
      return { partes: [H('Has', ['Have', 'Is']), ` ${nino.n} got ${ajena.a}? — No, ${nino.he} `, H("hasn't", ["haven't", "isn't"]), '.'] }
    }
    if (!dos) return { partes: [`${nino.n} `, H('has got', ['have got', 'has get']), ` ${M.a}.`] }
    return { partes: [H(nino.n, [otro.n], 'dibujo'), ' ', H('has got', ['have got', 'is got']), ` ${M.a}.`] }
  }
  if (tema === 'present-continuous') {
    const A = ACCIONES[nino.accion], B = ACCIONES[otro.accion]
    if (nivel === 'dificil') {
      return { partes: [H('Is', ['Are', 'Does']), ` ${nino.n} ${B.ing}? — No, ${nino.he} `, H("isn't", ["aren't", "doesn't"]), `. ${nino.He} is ${A.ing}.`] }
    }
    if (!dos) return { partes: [`${nino.n} `, H('is', ['are', 'am']), ` ${A.ing}.`] }
    return { partes: [`${nino.n} `, H('is', ['are', 'am']), ' ', H(A.ing, [B.ing, A.s], 'dibujo'), '.'] }
  }
  if (tema === 'can') {
    if (nivel === 'dificil') {
      const [suj, v] = elige(rand, NO_PUEDE)
      return { partes: [`${suj} `, H("can't", ["doesn't can", "can't to"]), ` ${v}.`] }
    }
    const [suj, v] = elige(rand, PUEDE)
    if (!dos) return { partes: [`${suj} `, H('can', ['cans', 'can to']), ` ${v}.`] }
    const formas = { fly: ['flies', 'flying'], swim: ['swims', 'swimming'], run: ['runs', 'running'], jump: ['jumps', 'jumping'] }
    return { partes: [`${suj} `, H('can', ['cans', 'can to']), ' ', H(v, formas[v]), '.'] }
  }
  // possessives
  const M = MASCOTAS[nino.mascota]
  if (nivel === 'dificil') {
    return { partes: [`Look at ${nino.n}’s ${M.a.slice(2)}. `, H('Its', ["It's", nino.his === 'his' ? 'His' : 'Her']), ' name is Spot.'] }
  }
  const pos = H(nino.his, [nino.his === 'his' ? 'her' : 'his', nino.he])
  if (!dos) return { partes: [`${nino.n} has got ${M.a}. It is `, pos, ` ${M.a.slice(2)}.`] }
  return { partes: ['The ', M.a.slice(2), ' is ', H(`${nino.n}’s`, [`${otro.n}’s`], 'dibujo'), '. It is ', pos, ` ${M.a.slice(2)}.`] }
}

function bandeja(partes, rand) {
  const huecos = partes.filter(p => typeof p !== 'string')
  const buenas = huecos.flatMap(h => h.ok)
  const malas = [...new Set(huecos.flatMap(h => h.trampas))].filter(t => !buenas.includes(t))
  return baraja([...buenas, ...malas], rand).map((texto, id) => ({ id, texto }))
}

export function genRonda(nivel = 'facil', { rand = Math.random, tema = null } = {}) {
  const esc = genEscena(rand)
  const t = tema && TEMAS.includes(tema) ? tema : elige(rand, TEMAS)
  const { partes } = frase(t, nivel, esc, rand)
  return { id: `${nivel}:${t}:${Math.floor(rand() * 1e9)}`, nivel, tema: t, escena: esc, partes, fichas: bandeja(partes, rand) }
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)

export function esCorrecta(r, elegidas) {
  const huecos = r.partes.filter(p => typeof p !== 'string')
  return Array.isArray(elegidas) && elegidas.length === huecos.length && huecos.every((h, i) => h.ok.includes(elegidas[i]))
}
export function fraseCon(r, elegidas) {
  let i = 0
  return r.partes.map(p => (typeof p === 'string' ? p : elegidas[i++])).join('')
}
export const fraseCorrecta = r => fraseCon(r, r.partes.filter(p => typeof p !== 'string').map(h => h.ok[0]))

const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
const NOTAS = {
  'there-is-there-are': ['There is con una cosa (singular) y there are con varias (plural). Cuéntalas en el dibujo. En negativa y en pregunta va any; la pregunta es How many… are there?',
    'There is for one thing (singular) and there are for more than one (plural). Count them in the picture. Negatives and questions use any; the question is How many… are there?',
    'There is amb una cosa (singular) i there are amb diverses (plural). Compta-les al dibuix. En negativa i en pregunta va any; la pregunta és How many… are there?'],
  'have-got': ['He, she e it llevan has got; I, you, we y they, have got. La pregunta empieza por Has / Have y la respuesta corta es Yes, she has / No, she hasn’t.',
    'He, she and it take has got; I, you, we and they take have got. The question starts with Has / Have and the short answer is Yes, she has / No, she hasn’t.',
    'He, she i it porten has got; I, you, we i they, have got. La pregunta comença amb Has / Have i la resposta curta és Yes, she has / No, she hasn’t.'],
  'present-continuous': ['Para lo que está pasando ahora: am / is / are + verbo con -ing. Mira qué hace cada niño en el dibujo. La pregunta es Is he…? y la respuesta corta, No, he isn’t.',
    'For what is happening now: am / is / are + verb with -ing. Look at what each child is doing in the picture. The question is Is he…? and the short answer is No, he isn’t.',
    'Per al que està passant ara: am / is / are + verb amb -ing. Mira què fa cada nen al dibuix. La pregunta és Is he…? i la resposta curta, No, he isn’t.'],
  can: ['Can es igual para todos (sin -s) y va seguido del verbo sin to: A bird can fly. La negativa es can’t (o cannot).',
    'Can is the same for everyone (no -s) and is followed by the verb without to: A bird can fly. The negative is can’t (or cannot).',
    'Can és igual per a tothom (sense -s) i va seguit del verb sense to: A bird can fly. La negativa és can’t (o cannot).'],
  possessives: ['His si el dueño es un chico, her si es una chica, its si es un animal o una cosa (sin apóstrofo: it’s significa it is). El dueño se mira en el dibujo: la mascota está junto a él.',
    'His if the owner is a boy, her if the owner is a girl, its for an animal or thing (no apostrophe: it’s means it is). Check the owner in the picture: the pet is next to them.',
    'His si l’amo és un noi, her si és una noia, its si és un animal o una cosa (sense apòstrof: it’s vol dir it is). L’amo es mira al dibuix: la mascota és al seu costat.'],
}
export function explicacion(r, l) {
  return NOTAS[r.tema][l === 'en' ? 1 : l === 'ca' ? 2 : 0]
}

export function schemaQuestion(r, l) {
  const huecos = r.partes.filter(p => typeof p !== 'string')
  const correctAnswer = fraseCorrecta(r)
  const malas = []
  huecos.forEach((h, i) => h.trampas.forEach(t => { const e = huecos.map(x => x.ok[0]); e[i] = t; malas.push(fraseCon(r, e)) }))
  malas.push(fraseCon(r, huecos.map(h => h.trampas[0])))
  return { question: s(l, 'Completa la frase:', 'Complete the sentence:', 'Completa la frase:') + ' ' + fraseCon(r, huecos.map(() => '___')), correctAnswer, wrongAnswers: [...new Set(malas)].filter(m => m !== correctAnswer).slice(0, 3) }
}
