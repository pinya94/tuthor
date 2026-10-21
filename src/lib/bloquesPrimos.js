// Bloques Primos (matemáticas · divisibilidad, 5.º-6.º de Primaria y ESO).
//
// Cada número se dibuja como una fila de bloques: uno por factor primo, con
// un color por primo (2 azul, 3 verde, 5 naranja…). Con los bloques a la vista
// el mcd y el mcm dejan de ser una receta que se olvida: el mcd son los
// bloques que tienen LOS DOS números, y el mcm, todos los bloques sin repetir
// los comunes.
//
// Tipos de pregunta (y la trampa que cada uno pone a prueba):
//   divisible  ¿cuál es divisible entre d?   (9 ≠ 3; acabar en 5 no basta para 10)
//   primo      ¿cuál es primo?               (51, 91, 119… parecen primos)
//   descomp    la descomposición correcta    (un 4 o un 9 no son primos; exponentes)
//   mcd / mcm  de dos números con bloques    (confundir mcd y mcm; multiplicar a·b)
//   problema   enunciado de la vida real      (¿coincidir? mcm · ¿trozos iguales? mcd)
//   tres       mcd o mcm de tres números
//
// Las respuestas son números enteros, salvo en `descomp`, donde la opción es
// una descomposición (objeto {primo: exponente}) identificada por su clave.

export const COLORES = {
  2: '#3B82F6', 3: '#22C55E', 5: '#F59E0B', 7: '#A855F7', 11: '#EC4899', 13: '#14B8A6',
}
export const colorPrimo = p => COLORES[p] || '#64748B'

export const NIVELES = {
  facil:   { tipos: ['divisible', 'primo', 'descomp', 'mcd', 'mcm'], primos: [2, 3, 5, 7], max: 100, criterios: [2, 3, 5, 10], conBloques: true },
  medio:   { tipos: ['divisible', 'descomp', 'mcd', 'mcm', 'problema', 'problema'], primos: [2, 3, 5, 7, 11], max: 240, criterios: [2, 3, 4, 5, 9, 10], conBloques: true },
  dificil: { tipos: ['descomp', 'mcd', 'mcm', 'problema', 'problema', 'tres'], primos: [2, 3, 5, 7, 11, 13], max: 600, criterios: [3, 4, 9, 11], conBloques: false },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const entre = (rand, a, b) => a + Math.floor(rand() * (b - a + 1))
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}

// ── Aritmética ────────────────────────────────────────────────────────────
export function factoriza(n) {
  const f = {}
  let m = n
  for (let p = 2; p * p <= m; p++) while (m % p === 0) { f[p] = (f[p] || 0) + 1; m /= p }
  if (m > 1) f[m] = (f[m] || 0) + 1
  return f
}
export const esPrimo = n => n > 1 && Object.keys(factoriza(n)).length === 1 && factoriza(n)[n] === 1
export const mcd2 = (a, b) => (b ? mcd2(b, a % b) : a)
export const mcm2 = (a, b) => (a / mcd2(a, b)) * b
export const mcdDe = ns => ns.reduce(mcd2)
export const mcmDe = ns => ns.reduce(mcm2)
const primoMayor = n => Math.max(...Object.keys(factoriza(n)).map(Number))
const nBloques = n => Object.values(factoriza(n)).reduce((s, e) => s + e, 0)

// Clave canónica de una descomposición: «2^3*3^1*5^1».
export const clave = f => Object.keys(f).map(Number).sort((a, b) => a - b).filter(p => f[p] > 0).map(p => `${p}^${f[p]}`).join('*')
const deClave = k => Object.fromEntries(k.split('*').map(s => s.split('^').map(Number)))

const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }
const sup = e => String(e).split('').map(d => SUP[d]).join('')
// «2³ · 3 · 5». Acepta un objeto o su clave.
export function escribe(f) {
  const o = typeof f === 'string' ? deClave(f) : f
  return Object.keys(o).map(Number).sort((a, b) => a - b).filter(p => o[p] > 0)
    .map(p => (o[p] > 1 ? `${p}${sup(o[p])}` : `${p}`)).join(' · ')
}

// ── Textos ────────────────────────────────────────────────────────────────
const tx = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
export const num = (n, l = 'es') => n.toLocaleString(l === 'en' ? 'en-GB' : l === 'ca' ? 'ca-ES' : 'es-ES')

// Contextos de problema. `op` dice qué se busca; `pide` es la pregunta.
const PROBLEMAS = {
  autobuses: { op: 'mcm', rango: [6, 30], unidad: { es: 'min', en: 'min', ca: 'min' },
    texto: (a, b) => ({
      es: `Un autobús sale cada ${a} minutos y otro cada ${b} minutos. Acaban de salir juntos. ¿Dentro de cuántos minutos volverán a salir a la vez?`,
      en: `One bus leaves every ${a} minutes and another every ${b} minutes. They have just left together. In how many minutes will they leave at the same time again?`,
      ca: `Un autobús surt cada ${a} minuts i un altre cada ${b} minuts. Acaben de sortir junts. D’aquí a quants minuts tornaran a sortir alhora?`,
    }) },
  piscina: { op: 'mcm', rango: [2, 15], unidad: { es: 'días', en: 'days', ca: 'dies' },
    texto: (a, b) => ({
      es: `Lucía va a la piscina cada ${a} días y Marcos cada ${b} días. Hoy han coincidido. ¿Dentro de cuántos días volverán a coincidir?`,
      en: `Lucía goes to the pool every ${a} days and Marcos every ${b} days. Today they met there. In how many days will they meet again?`,
      ca: `La Lucía va a la piscina cada ${a} dies i en Marcos cada ${b} dies. Avui han coincidit. D’aquí a quants dies tornaran a coincidir?`,
    }) },
  faros: { op: 'mcm', rango: [4, 24], unidad: { es: 's', en: 's', ca: 's' },
    texto: (a, b) => ({
      es: `Un faro se enciende cada ${a} segundos y otro cada ${b} segundos. Se acaban de encender a la vez. ¿Cuántos segundos pasarán hasta que vuelvan a encenderse juntos?`,
      en: `One lighthouse flashes every ${a} seconds and another every ${b} seconds. They have just flashed together. How many seconds until they flash together again?`,
      ca: `Un far s’encén cada ${a} segons i un altre cada ${b} segons. Acaben d’encendre’s alhora. Quants segons passaran fins que tornin a encendre’s junts?`,
    }) },
  caramelos: { op: 'mcm', rango: [4, 20], unidad: { es: 'caramelos', en: 'sweets', ca: 'caramels' },
    texto: (a, b) => ({
      es: `¿Cuál es el menor número de caramelos que se puede repartir en bolsas de ${a} o en bolsas de ${b} sin que sobre ninguno?`,
      en: `What is the smallest number of sweets that can be packed into bags of ${a} or into bags of ${b} with none left over?`,
      ca: `Quin és el nombre més petit de caramels que es pot repartir en bosses de ${a} o en bosses de ${b} sense que en sobri cap?`,
    }) },
  cuerdas: { op: 'mcd', rango: [24, 180], unidad: { es: 'cm', en: 'cm', ca: 'cm' },
    texto: (a, b) => ({
      es: `Tenemos dos cuerdas de ${a} cm y ${b} cm. Queremos cortarlas en trozos iguales, lo más largos posible y sin que sobre nada. ¿Cuánto medirá cada trozo?`,
      en: `We have two ropes of ${a} cm and ${b} cm. We want to cut them into equal pieces, as long as possible, with nothing left over. How long will each piece be?`,
      ca: `Tenim dues cordes de ${a} cm i ${b} cm. Volem tallar-les en trossos iguals, tan llargs com es pugui i sense que en sobri res. Quant farà cada tros?`,
    }) },
  lotes: { op: 'mcd', rango: [12, 120], unidad: { es: 'lotes', en: 'packs', ca: 'lots' },
    texto: (a, b) => ({
      es: `Hay ${a} lápices y ${b} gomas. Queremos hacer lotes iguales (todos con los mismos lápices y las mismas gomas) sin que sobre nada. ¿Cuántos lotes, como máximo?`,
      en: `There are ${a} pencils and ${b} rubbers. We want to make identical packs (all with the same pencils and the same rubbers) with nothing left over. What is the largest number of packs?`,
      ca: `Hi ha ${a} llapis i ${b} gomes. Volem fer lots iguals (tots amb els mateixos llapis i les mateixes gomes) sense que en sobri res. Quants lots, com a màxim?`,
    }) },
  baldosas: { op: 'mcd', rango: [60, 600], unidad: { es: 'cm', en: 'cm', ca: 'cm' },
    texto: (a, b) => ({
      es: `Un suelo mide ${a} cm por ${b} cm. Queremos cubrirlo con baldosas cuadradas iguales, lo más grandes posible y sin cortar ninguna. ¿Cuánto medirá el lado de cada baldosa?`,
      en: `A floor measures ${a} cm by ${b} cm. We want to cover it with identical square tiles, as big as possible, without cutting any. How long will each tile’s side be?`,
      ca: `Un terra fa ${a} cm per ${b} cm. Volem cobrir-lo amb rajoles quadrades iguals, tan grans com es pugui i sense tallar-ne cap. Quant farà el costat de cada rajola?`,
    }) },
}

// ── Generador ─────────────────────────────────────────────────────────────
// Rellena hasta 3 distractores enteros, positivos, distintos y ≠ bueno.
function opciones(rand, bueno, candidatos, ok = v => v > 0) {
  const vistos = new Set([bueno])
  const out = []
  for (const c of candidatos) {
    if (c == null) continue
    if (typeof c === 'number' && (!Number.isInteger(c) || !ok(c))) continue
    if (!vistos.has(c)) { vistos.add(c); out.push(c) }
    if (out.length === 3) break
  }
  return out.length === 3 ? baraja(rand, [bueno, ...out]) : null
}

// Un número «de bloques»: compuesto, con primos de la paleta y no demasiados bloques.
function compuesto(rand, cfg, min, max) {
  for (let i = 0; i < 200; i++) {
    const n = entre(rand, min, max)
    if (esPrimo(n) || primoMayor(n) > cfg.primos[cfg.primos.length - 1] || nBloques(n) > 7) continue
    return n
  }
  return null
}

// Dos números con un divisor común > 1, sin que uno divida al otro.
function pareja(rand, cfg, min, max) {
  for (let i = 0; i < 400; i++) {
    const a = compuesto(rand, cfg, min, max)
    const b = compuesto(rand, cfg, min, max)
    if (!a || !b || a === b) continue
    const g = mcd2(a, b)
    if (g === 1 || a % b === 0 || b % a === 0) continue
    if (mcm2(a, b) > 3000) continue
    return [a, b]
  }
  return null
}

let seq = 0

// La ronda clásica de un tipo (con opciones): la usan las mecánicas y el
// texto del schema (ver «Mecánicas» al final).
function genVieja(nivel, tipo, rand) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const base = { id: ++seq, nivel, tipo, conBloques: cfg.conBloques }

    if (tipo === 'divisible') {
      const d = elige(rand, cfg.criterios)
      const [lo, hi] = nivel === 'facil' ? [100, 999] : [1000, 9999]
      let bueno = 0
      for (let i = 0; i < 50 && !bueno; i++) { const n = entre(rand, lo, hi); if (n % d === 0) bueno = n }
      if (!bueno) continue
      // Las trampas: múltiplos de 3 que no lo son de 9, acabados en 5 para el 10…
      const trampa = { 9: n => n % 3 === 0, 10: n => n % 5 === 0, 4: n => n % 2 === 0, 3: n => (n % 10) % 3 === 0, 11: n => n % 10 === 1 }[d]
      const cands = []
      for (let i = 0; i < 300 && cands.length < 3; i++) {
        const n = entre(rand, lo, hi)
        if (n % d === 0 || cands.includes(n)) continue
        if (trampa && cands.length < 2 && !trampa(n)) continue
        cands.push(n)
      }
      const ops = opciones(rand, bueno, cands)
      if (!ops) continue
      return { ...base, divisor: d, bueno, opciones: ops }
    }

    if (tipo === 'primo') {
      const primos = []
      for (let n = 23; n < 200; n++) if (esPrimo(n)) primos.push(n)
      const bueno = elige(rand, primos)
      // Compuestos «con cara de primo»: impares, no acaban en 5, no son múltiplos de 3 a simple vista.
      const caraDePrimo = []
      for (let n = 21; n < 220; n += 2) if (!esPrimo(n) && n % 5 !== 0 && n % 3 !== 0) caraDePrimo.push(n)
      const otros = baraja(rand, caraDePrimo.concat([51, 57, 87, 111, 117]))
      const ops = opciones(rand, bueno, otros)
      if (!ops) continue
      return { ...base, bueno, opciones: ops }
    }

    if (tipo === 'descomp') {
      const [lo, hi] = nivel === 'facil' ? [12, 100] : nivel === 'medio' ? [40, 600] : [120, 2000]
      const n = compuesto(rand, { ...cfg, primos: cfg.primos }, lo, hi)
      if (!n) continue
      const f = factoriza(n)
      const ps = Object.keys(f).map(Number)
      if (ps.length < 2 && f[ps[0]] < 3) continue
      const k = clave(f)
      const cands = []
      // Un compuesto dentro: 2·2 → 4, 3·3 → 9 (el valor cuadra, pero no es primo).
      for (const [p, c] of [[2, 4], [3, 9]]) if (f[p] >= 2) {
        cands.push(clave({ ...f, [p]: f[p] - 2, [c]: 1 }))
      }
      // Un exponente de más o de menos.
      for (const p of baraja(rand, ps)) {
        cands.push(clave({ ...f, [p]: f[p] + 1 }))
        if (f[p] > 1) cands.push(clave({ ...f, [p]: f[p] - 1 }))
      }
      // Un primo cambiado por otro.
      const p0 = elige(rand, ps)
      const otro = cfg.primos.find(q => !f[q] && q !== p0)
      if (otro) { const g = { ...f }; delete g[p0]; g[otro] = f[p0]; cands.push(clave(g)) }
      const ops = opciones(rand, k, baraja(rand, cands.slice(0, 2)).concat(cands.slice(2)), () => true)
      if (!ops) continue
      return { ...base, n, bueno: k, opciones: ops }
    }

    if (tipo === 'mcd' || tipo === 'mcm') {
      const par = pareja(rand, cfg, nivel === 'facil' ? 6 : 12, cfg.max)
      if (!par) continue
      const [a, b] = par
      const g = mcd2(a, b), m = mcm2(a, b)
      if (nivel === 'facil' && m > 400) continue
      const bueno = tipo === 'mcd' ? g : m
      const fg = factoriza(g)
      const pg = Number(Object.keys(fg)[0])
      const cands = tipo === 'mcd'
        ? [m, g * pg, g / pg, Math.min(a, b), a * b > 3000 ? null : a * b]
        : [g, a * b, m / Math.max(...Object.keys(factoriza(m)).map(Number)), m * 2]
      const ops = opciones(rand, bueno, cands)
      if (!ops) continue
      return { ...base, op: tipo, nums: [a, b], bueno, opciones: ops }
    }

    if (tipo === 'problema') {
      const ctxId = elige(rand, Object.keys(PROBLEMAS))
      const ctx = PROBLEMAS[ctxId]
      const par = pareja(rand, { ...cfg, primos: [2, 3, 5, 7] }, ctx.rango[0], ctx.rango[1])
      if (!par) continue
      const [a, b] = par.sort((x, y) => x - y)
      const g = mcd2(a, b), m = mcm2(a, b)
      if (ctx.op === 'mcm' && m > 400) continue
      const bueno = ctx.op === 'mcd' ? g : m
      const cands = ctx.op === 'mcd' ? [m, a * b > 6000 ? null : a * b, b - a, b, a / 2] : [g, a * b, a + b, b * 2]
      const ops = opciones(rand, bueno, cands)
      if (!ops) continue
      return { ...base, op: ctx.op, contexto: ctxId, nums: [a, b], bueno, opciones: ops }
    }

    // tres
    const op = rand() < 0.5 ? 'mcd' : 'mcm'
    const ns = []
    for (let i = 0; i < 60 && ns.length < 3; i++) {
      const n = compuesto(rand, cfg, 12, op === 'mcd' ? 300 : 90)
      if (n && !ns.includes(n)) ns.push(n)
    }
    if (ns.length < 3) continue
    ns.sort((x, y) => x - y)
    const g = mcdDe(ns), m = mcmDe(ns)
    if (op === 'mcd' && g === 1) continue
    if (op === 'mcm' && (m > 3000 || ns.some(n => n === m))) continue
    const bueno = op === 'mcd' ? g : m
    const cands = op === 'mcd' ? [mcd2(ns[0], ns[1]), mcd2(ns[1], ns[2]), g * 2, m] : [mcm2(ns[0], ns[1]), mcm2(ns[1], ns[2]), m * 2, g]
    const ops = opciones(rand, bueno, cands, v => v > 0 && v <= 6000)
    if (!ops) continue
    return { ...base, tipo: 'tres', op, nums: ns, bueno, opciones: ops }
  }
}


// ── Enunciados, opciones y explicación ────────────────────────────────────
export function textoOpcion(o, r, l) {
  if (r.tipo === 'descomp') return escribe(o)
  if (r.tipo === 'problema') return `${num(o, l)} ${PROBLEMAS[r.contexto].unidad[l] ?? PROBLEMAS[r.contexto].unidad.es}`
  return num(o, l)
}

function enunciadoViejo(r, l) {
  switch (r.tipo) {
    case 'divisible': return tx(l, `¿Cuál de estos números es divisible entre ${r.divisor}?`, `Which of these numbers is divisible by ${r.divisor}?`, `Quin d’aquests nombres és divisible entre ${r.divisor}?`)
    case 'primo': return tx(l, '¿Cuál de estos números es primo?', 'Which of these numbers is prime?', 'Quin d’aquests nombres és primer?')
    case 'descomp': return tx(l, `¿Cuál es la descomposición en factores primos de ${num(r.n, l)}?`, `What is the prime factorisation of ${num(r.n, l)}?`, `Quina és la descomposició en factors primers de ${num(r.n, l)}?`)
    case 'problema': { const t = PROBLEMAS[r.contexto].texto(...r.nums); return t[l] ?? t.es }
    default: {
      const ns = lista(r.nums.map(n => num(n, l)), l)
      return r.op === 'mcd'
        ? tx(l, `¿Cuál es el máximo común divisor de ${ns}?`, `What is the highest common factor of ${ns}?`, `Quin és el màxim comú divisor de ${ns}?`)
        : tx(l, `¿Cuál es el mínimo común múltiplo de ${ns}?`, `What is the lowest common multiple of ${ns}?`, `Quin és el mínim comú múltiple de ${ns}?`)
    }
  }
}

// «12, 18 y 30»
const lista = (xs, l) => xs.slice(0, -1).join(', ') + tx(l, ' y ', ' and ', ' i ') + xs[xs.length - 1]

const sigla = (op, l) => (op === 'mcd' ? tx(l, 'mcd', 'HCF', 'mcd') : tx(l, 'mcm', 'LCM', 'mcm'))

const CRITERIO = {
  2: { es: 'acaba en cifra par (0, 2, 4, 6, 8)', en: 'it ends in an even digit (0, 2, 4, 6, 8)', ca: 'acaba en xifra parella (0, 2, 4, 6, 8)' },
  3: { es: 'la suma de sus cifras es múltiplo de 3', en: 'the sum of its digits is a multiple of 3', ca: 'la suma de les seves xifres és múltiple de 3' },
  4: { es: 'sus dos últimas cifras forman un múltiplo de 4', en: 'its last two digits form a multiple of 4', ca: 'les seves dues últimes xifres formen un múltiple de 4' },
  5: { es: 'acaba en 0 o en 5', en: 'it ends in 0 or 5', ca: 'acaba en 0 o en 5' },
  9: { es: 'la suma de sus cifras es múltiplo de 9', en: 'the sum of its digits is a multiple of 9', ca: 'la suma de les seves xifres és múltiple de 9' },
  10: { es: 'acaba en 0', en: 'it ends in 0', ca: 'acaba en 0' },
  11: { es: 'la diferencia entre la suma de las cifras en posición par y en posición impar es 0 o múltiplo de 11', en: 'the difference between the sums of its alternate digits is 0 or a multiple of 11', ca: 'la diferència entre la suma de les xifres en posició parella i en posició senar és 0 o múltiple d’11' },
}
const sumaCifras = n => String(n).split('').reduce((s, d) => s + +d, 0)

function explicacionVieja(r, l) {
  switch (r.tipo) {
    case 'divisible': {
      const c = CRITERIO[r.divisor]
      const extra = r.divisor === 3 || r.divisor === 9
        ? tx(l, ` ${num(r.bueno, l)}: ${String(r.bueno).split('').join(' + ')} = ${sumaCifras(r.bueno)}.`, ` ${num(r.bueno, l)}: ${String(r.bueno).split('').join(' + ')} = ${sumaCifras(r.bueno)}.`, ` ${num(r.bueno, l)}: ${String(r.bueno).split('').join(' + ')} = ${sumaCifras(r.bueno)}.`)
        : ''
      const nota = r.divisor === 9 ? tx(l, ' Ojo: que sea múltiplo de 3 no basta para el 9.', ' Careful: being a multiple of 3 is not enough for 9.', ' Compte: que sigui múltiple de 3 no n’hi ha prou per al 9.')
        : r.divisor === 10 ? tx(l, ' Acabar en 5 vale para el 5, no para el 10.', ' Ending in 5 works for 5, not for 10.', ' Acabar en 5 val per al 5, no per al 10.') : ''
      return `${tx(l, `Un número es divisible entre ${r.divisor} si ${c.es}.`, `A number is divisible by ${r.divisor} if ${c.en}.`, `Un nombre és divisible entre ${r.divisor} si ${c.ca}.`)}${extra}${nota} ${num(r.bueno, l)} : ${r.divisor} = ${num(r.bueno / r.divisor, l)}.`
    }
    case 'primo': {
      const otros = r.opciones.filter(o => o !== r.bueno).map(o => `${num(o, l)} = ${escribe(factoriza(o))}`).join('; ')
      return tx(l, `${num(r.bueno, l)} solo se divide entre 1 y entre sí mismo. Los otros parecen primos, pero no: ${otros}.`, `${num(r.bueno, l)} can only be divided by 1 and itself. The others look prime, but they are not: ${otros}.`, `${num(r.bueno, l)} només es divideix entre 1 i entre si mateix. Els altres semblen primers, però no: ${otros}.`)
    }
    case 'descomp': {
      const f = factoriza(r.n)
      const pasos = []
      let m = r.n
      for (const p of Object.keys(f).map(Number).sort((a, b) => a - b)) for (let i = 0; i < f[p]; i++) { pasos.push(`${num(m, l)} : ${p}`); m /= p }
      return tx(l, `Se divide entre primos, de menor a mayor, hasta llegar a 1: ${pasos.join(' → ')} → 1. Por eso ${num(r.n, l)} = ${escribe(f)}. Un 4 o un 9 no valen: no son primos.`, `Divide by primes, smallest first, until you reach 1: ${pasos.join(' → ')} → 1. So ${num(r.n, l)} = ${escribe(f)}. A 4 or a 9 won’t do: they are not prime.`, `Es divideix entre primers, de menor a major, fins a arribar a 1: ${pasos.join(' → ')} → 1. Per això ${num(r.n, l)} = ${escribe(f)}. Un 4 o un 9 no valen: no són primers.`)
    }
    default: {
      const ds = r.nums.map(n => `${num(n, l)} = ${escribe(factoriza(n))}`).join('; ')
      const regla = r.op === 'mcd'
        ? tx(l, 'los factores comunes con el menor exponente', 'the common factors with the lowest power', 'els factors comuns amb l’exponent més petit')
        : tx(l, 'todos los factores, comunes y no comunes, con el mayor exponente', 'every factor, common or not, with the highest power', 'tots els factors, comuns i no comuns, amb l’exponent més gran')
      const res = `${sigla(r.op, l)} = ${escribe(factoriza(r.bueno))} = ${num(r.bueno, l)}`
      const porque = r.tipo === 'problema'
        ? (r.op === 'mcm'
          ? tx(l, `Buscamos un número que sea múltiplo de ${r.nums[0]} y de ${r.nums[1]} a la vez, el más pequeño → mcm. `, `We want a number that is a multiple of both ${r.nums[0]} and ${r.nums[1]}, the smallest one → LCM. `, `Busquem un nombre que sigui múltiple de ${r.nums[0]} i de ${r.nums[1]} alhora, el més petit → mcm. `)
          : tx(l, `Buscamos un número que divida exacto a ${r.nums[0]} y a ${r.nums[1]}, el mayor posible → mcd. `, `We want a number that divides both ${r.nums[0]} and ${r.nums[1]} exactly, as big as possible → HCF. `, `Busquem un nombre que divideixi exactament ${r.nums[0]} i ${r.nums[1]}, el més gran possible → mcd. `))
        : ''
      return `${porque}${ds}. ${tx(l, `Se toman ${regla}: ${res}.`, `Take ${regla}: ${res}.`, `Es prenen ${regla}: ${res}.`)}`
    }
  }
}

// JSON-LD / ejemplos: la pregunta entera en texto.
function schemaVieja(r, l) {
  return {
    question: enunciadoViejo(r, l),
    correctAnswer: textoOpcion(r.bueno, r, l),
    wrongAnswers: r.opciones.filter(o => o !== r.bueno).map(o => textoOpcion(o, r, l)),
  }
}

// Para los bloques: columnas por primo, alineadas entre los números.
export function columnas(nums) {
  const fs = nums.map(factoriza)
  const ps = [...new Set(fs.flatMap(f => Object.keys(f).map(Number)))].sort((a, b) => a - b)
  return ps.map(p => ({ p, exps: fs.map(f => f[p] || 0), max: Math.max(...fs.map(f => f[p] || 0)), min: Math.min(...fs.map(f => f[p] || 0)) }))
}

// ── Mecánicas ─────────────────────────────────────────────────────────────
// Sin opciones (genVieja sigue dando la ronda y el texto del schema):
//   criba      (divisible)  ocho números: tocar todos los divisibles entre d
//   caza       (primo)      ocho números: tocar todos los primos
//   rompe      (descomp)    dividir el número entre primos, bloque a bloque,
//                           hasta llegar a 1; un 4 o un 9 son trampa
//   construye  (mcd, mcm, tres, problema)  montar el resultado con bloques
//                           (+ y − en cada primo); la respuesta es el número
export const MECANICA_DE_TIPO = { divisible: 'criba', primo: 'caza', descomp: 'rompe', mcd: 'construye', mcm: 'construye', tres: 'construye', problema: 'construye' }
// Las fichas para romper el número: los primos del nivel y dos trampas.
export const fichasRompe = cfg => [...cfg.primos, 4, 9]

const recientes = []
export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (let intento = 0; ; intento++) {
    const tipo = elige(rand, cfg.tipos)
    const r = genVieja(nivel, tipo, rand)
    const tema = `${r.tipo}${r.n ?? ''}${(r.nums ?? []).join()}${r.divisor ?? ''}${r.bueno}`
    if (intento < 20 && recientes.includes(tema)) continue
    const out = { ...r, mecanica: MECANICA_DE_TIPO[r.tipo] }
    if (r.tipo === 'divisible') {
      // A las cuatro de antes (una buena y tres trampas) se suman cuatro más,
      // con uno o dos divisibles: así hay que mirar todos, no buscar «el bueno».
      const [lo, hi] = nivel === 'facil' ? [100, 999] : [1000, 9999]
      const extra = []
      const quiero = 1 + Math.floor(rand() * 2)
      for (let i = 0; i < 400 && extra.length < 4; i++) {
        const n = entre(rand, lo, hi)
        if (r.opciones.includes(n) || extra.includes(n)) continue
        const div = n % r.divisor === 0
        if (div && extra.filter(x => x % r.divisor === 0).length >= quiero) continue
        if (!div && extra.filter(x => x % r.divisor !== 0).length >= 4 - quiero) continue
        extra.push(n)
      }
      if (extra.length < 4) continue
      out.numeros = baraja(rand, [...r.opciones, ...extra])
      out.validos = out.numeros.filter(n => n % r.divisor === 0)
    }
    if (r.tipo === 'primo') {
      const primos = []
      for (let n = 23; n < 200; n++) if (esPrimo(n)) primos.push(n)
      const caraDePrimo = []
      for (let n = 21; n < 220; n += 2) if (!esPrimo(n) && n % 5 !== 0 && n % 3 !== 0) caraDePrimo.push(n)
      const masPrimos = baraja(rand, primos.filter(p => !r.opciones.includes(p))).slice(0, 1 + Math.floor(rand() * 2))
      const masTrampas = baraja(rand, caraDePrimo.filter(n => !r.opciones.includes(n))).slice(0, 4 - masPrimos.length)
      out.numeros = baraja(rand, [...r.opciones, ...masPrimos, ...masTrampas])
      out.validos = out.numeros.filter(esPrimo)
    }
    if (r.tipo === 'descomp') out.fichas = fichasRompe(cfg)
    recientes.push(tema)
    if (recientes.length > 6) recientes.shift()
    return out
  }
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)

export function respuestaBuena(r) {
  if (r.mecanica === 'construye') return String(r.bueno)
  return `${r.mecanica}:0`
}
export function esCorrecta(r, o) {
  if (o == null) return false
  if (!r.mecanica) return o === r.bueno
  if (r.mecanica === 'construye') return Number(o) === r.bueno
  return o === respuestaBuena(r)
}
export const isCorrect = esCorrecta

export function enunciado(r, l) {
  switch (r.mecanica) {
    case 'criba': return tx(l, `Toca todos los números divisibles entre ${r.divisor}`, `Tap every number divisible by ${r.divisor}`, `Toca tots els nombres divisibles entre ${r.divisor}`)
    case 'caza': return tx(l, 'Toca todos los números primos', 'Tap every prime number', 'Toca tots els nombres primers')
    case 'rompe': return tx(l, `Rompe ${num(r.n, l)} en factores primos: toca un primo que lo divida, hasta llegar a 1`, `Break ${num(r.n, l)} into prime factors: tap a prime that divides it, until you reach 1`, `Trenca ${num(r.n, l)} en factors primers: toca un primer que el divideixi, fins arribar a 1`)
    case 'construye': {
      if (r.tipo === 'problema') return `${enunciadoViejo(r, l)} ${tx(l, 'Constrúyelo con bloques.', 'Build it with blocks.', 'Construeix-ho amb blocs.')}`
      const ns = lista(r.nums.map(n => num(n, l)), l)
      return r.op === 'mcd'
        ? tx(l, `Construye con bloques el máximo común divisor de ${ns}`, `Build the highest common factor of ${ns} with blocks`, `Construeix amb blocs el màxim comú divisor de ${ns}`)
        : tx(l, `Construye con bloques el mínimo común múltiplo de ${ns}`, `Build the lowest common multiple of ${ns} with blocks`, `Construeix amb blocs el mínim comú múltiple de ${ns}`)
    }
    default: return enunciadoViejo(r, l)
  }
}

export function explicacion(r, l) {
  if (r.mecanica === 'criba') {
    const c = CRITERIO[r.divisor]
    const si = r.validos.map(n => num(n, l)).join(', ')
    return tx(l, `Un número es divisible entre ${r.divisor} si ${c.es}. Lo son: ${si}.`, `A number is divisible by ${r.divisor} if ${c.en}. These are: ${si}.`, `Un nombre és divisible entre ${r.divisor} si ${c.ca}. Ho són: ${si}.`)
      + (r.divisor === 9 ? tx(l, ' Ojo: múltiplo de 3 no basta para el 9.', ' Careful: a multiple of 3 is not enough for 9.', ' Compte: múltiple de 3 no n’hi ha prou per al 9.') : r.divisor === 10 ? tx(l, ' Acabar en 5 vale para el 5, no para el 10.', ' Ending in 5 works for 5, not for 10.', ' Acabar en 5 val per al 5, no per al 10.') : '')
  }
  if (r.mecanica === 'caza') {
    const no = r.numeros.filter(n => !esPrimo(n)).map(n => `${num(n, l)} = ${escribe(factoriza(n))}`).join('; ')
    const si = r.validos.map(n => num(n, l)).join(', ')
    return tx(l, `Primos: ${si}. Los demás parecen primos pero no lo son: ${no}.`, `Primes: ${si}. The others look prime but are not: ${no}.`, `Primers: ${si}. Els altres semblen primers però no ho són: ${no}.`)
  }
  return explicacionVieja(r, l)
}

export function schemaQuestion(r, l) {
  return schemaVieja(r, l)
}
