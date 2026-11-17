// ¿Cuánto Cabe?: volúmenes y áreas de cuerpos geométricos. Sale el cuerpo
// dibujado con sus medidas y se escribe el resultado con el teclado.
//
//   facil    cajas hechas de cubitos: V = largo · ancho · alto (se cuentan)
//   medio    volumen de prisma (ortoedro), cilindro, pirámide y cono
//   dificil  área total de ortoedro y cilindro, volumen de la esfera y área
//            lateral del cono (con la generatriz)
//
// Con π se acepta lo mismo con 3,14 que con el π de la calculadora: la
// respuesta vale si no se aleja del valor exacto más de 1 unidad o del 1 %
// (lo que sea mayor), y se pide redondeada a las unidades.

export const NIVELES = { facil: {}, medio: {}, dificil: {} }

const ent = (rand, a, b) => a + Math.floor(rand() * (b - a + 1))
const elige = (rand, arr) => arr[Math.floor(rand() * arr.length)]

// Cada problema: { cuerpo, medidas, magnitud: 'V'|'A'|'AL', exacto }
export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  let p
  if (nivel === 'facil') {
    const a = ent(rand, 2, 5), b = ent(rand, 2, 4), c = ent(rand, 1, 4)
    p = { cuerpo: 'cubitos', m: { a, b, c }, magnitud: 'V', exacto: a * b * c }
  } else if (nivel === 'medio') {
    const tipo = elige(rand, ['ortoedro', 'cilindro', 'piramide', 'cono'])
    if (tipo === 'ortoedro') { const a = ent(rand, 3, 12), b = ent(rand, 2, 10), c = ent(rand, 2, 10); p = { cuerpo: tipo, m: { a, b, c }, magnitud: 'V', exacto: a * b * c } }
    if (tipo === 'cilindro') { const r = ent(rand, 2, 8), h = ent(rand, 3, 15); p = { cuerpo: tipo, m: { r, h }, magnitud: 'V', exacto: Math.PI * r * r * h } }
    if (tipo === 'piramide') { const l = ent(rand, 2, 10) , h = 3 * ent(rand, 1, 5); p = { cuerpo: tipo, m: { l, h }, magnitud: 'V', exacto: (l * l * h) / 3 } }
    if (tipo === 'cono') { const r = ent(rand, 2, 8), h = 3 * ent(rand, 1, 5); p = { cuerpo: tipo, m: { r, h }, magnitud: 'V', exacto: (Math.PI * r * r * h) / 3 } }
  } else {
    const tipo = elige(rand, ['ortoedroA', 'cilindroA', 'esfera', 'conoAL'])
    if (tipo === 'ortoedroA') { const a = ent(rand, 2, 12), b = ent(rand, 2, 10), c = ent(rand, 2, 10); p = { cuerpo: 'ortoedro', m: { a, b, c }, magnitud: 'A', exacto: 2 * (a * b + a * c + b * c) } }
    if (tipo === 'cilindroA') { const r = ent(rand, 2, 8), h = ent(rand, 3, 15); p = { cuerpo: 'cilindro', m: { r, h }, magnitud: 'A', exacto: 2 * Math.PI * r * r + 2 * Math.PI * r * h } }
    if (tipo === 'esfera') { const r = ent(rand, 2, 9); p = { cuerpo: 'esfera', m: { r }, magnitud: 'V', exacto: (4 / 3) * Math.PI * r ** 3 } }
    if (tipo === 'conoAL') {
      // Generatriz entera: ternas pitagóricas (r, h, g)
      const [r, h, g] = elige(rand, [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 6, 10], [4, 3, 5]])
      p = { cuerpo: 'cono', m: { r, h, g }, magnitud: 'AL', exacto: Math.PI * r * g }
    }
  }
  return { id: `${nivel}:${p.cuerpo}:${p.magnitud}:${Object.values(p.m).join('-')}`, nivel, ...p }
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)

export const usaPi = r => ['cilindro', 'cono', 'esfera'].includes(r.cuerpo)
export function esCorrecta(r, x) {
  const n = Number(String(x ?? '').replace(',', '.'))
  if (!String(x ?? '').trim() || !Number.isFinite(n)) return false
  if (!usaPi(r)) return Math.abs(n - r.exacto) < 1e-9
  return Math.abs(n - r.exacto) <= Math.max(1, r.exacto * 0.01)
}

// ── Textos ────────────────────────────────────────────────────────────────
const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
const num = (n, l) => (Number.isInteger(n) ? String(n) : n.toFixed(2).replace('.', l === 'en' ? '.' : ','))
const unidad = r => (r.magnitud === 'V' ? 'cm³' : 'cm²')
export const NOMBRE = {
  cubitos: { es: 'la caja de cubitos', en: 'the box of cubes', ca: 'la caixa de cubets' },
  ortoedro: { es: 'el ortoedro', en: 'the cuboid', ca: 'l’ortoedre' },
  cilindro: { es: 'el cilindro', en: 'the cylinder', ca: 'el cilindre' },
  piramide: { es: 'la pirámide de base cuadrada', en: 'the square-based pyramid', ca: 'la piràmide de base quadrada' },
  cono: { es: 'el cono', en: 'the cone', ca: 'el con' },
  esfera: { es: 'la esfera', en: 'the sphere', ca: 'l’esfera' },
}
export function enunciado(r, l) {
  const que = r.magnitud === 'V'
    ? s(l, 'el volumen', 'the volume', 'el volum')
    : r.magnitud === 'A' ? s(l, 'el área total', 'the total surface area', 'l’àrea total') : s(l, 'el área lateral', 'the curved surface area', 'l’àrea lateral')
  if (r.cuerpo === 'cubitos') return s(l, '¿Cuántos cubitos de 1 cm³ forman la caja? (su volumen)', 'How many 1 cm³ cubes make up the box? (its volume)', 'Quants cubets d’1 cm³ formen la caixa? (el seu volum)')
  const pi = usaPi(r) ? s(l, ' Usa π ≈ 3,14 y redondea a las unidades.', ' Use π ≈ 3.14 and round to the nearest whole number.', ' Fes servir π ≈ 3,14 i arrodoneix a les unitats.') : ''
  // «de» + «el» = «del» (es y ca)
  const de = n => (n.startsWith('el ') ? `del ${n.slice(3)}` : `de ${n}`)
  return s(l, `Calcula ${que} ${de(NOMBRE[r.cuerpo].es)} (en ${unidad(r)}).${pi}`, `Work out ${que} of ${NOMBRE[r.cuerpo].en} (in ${unidad(r)}).${pi}`, `Calcula ${que} ${de(NOMBRE[r.cuerpo].ca)} (en ${unidad(r)}).${pi}`)
}

export function explicacion(r, l) {
  const { m } = r, u = unidad(r), res = `${num(Math.round(r.exacto), l)} ${u}`
  const aprox = usaPi(r) ? ` ≈ ${res}` : ` = ${res}`
  switch (`${r.cuerpo}:${r.magnitud}`) {
    case 'cubitos:V': return s(l,
      `Hay ${m.a} cubitos de largo, ${m.b} de ancho y ${m.c} capas de alto: V = ${m.a} · ${m.b} · ${m.c} = ${res}. Cada capa tiene ${m.a * m.b} cubitos.`,
      `There are ${m.a} cubes along, ${m.b} across and ${m.c} layers high: V = ${m.a} × ${m.b} × ${m.c} = ${res}. Each layer has ${m.a * m.b} cubes.`,
      `Hi ha ${m.a} cubets de llarg, ${m.b} d’ample i ${m.c} capes d’alt: V = ${m.a} · ${m.b} · ${m.c} = ${res}. Cada capa té ${m.a * m.b} cubets.`)
    case 'ortoedro:V': return `V = a · b · c = ${m.a} · ${m.b} · ${m.c}${aprox}.` + s(l, ' Volumen de un prisma: área de la base por la altura.', ' Volume of a prism: base area times height.', ' Volum d’un prisma: àrea de la base per l’altura.')
    case 'cilindro:V': return `V = π · r² · h = 3,14 · ${m.r}² · ${m.h}${aprox}.`.replace('3,14', l === 'en' ? '3.14' : '3,14') + s(l, ' Es un prisma de base circular: área del círculo por la altura.', ' It is a prism with a circular base: circle area times height.', ' És un prisma de base circular: àrea del cercle per l’altura.')
    case 'piramide:V': return `V = (l² · h) / 3 = (${m.l}² · ${m.h}) / 3${aprox}.` + s(l, ' Una pirámide es un tercio del prisma con la misma base y altura.', ' A pyramid is one third of the prism with the same base and height.', ' Una piràmide és un terç del prisma amb la mateixa base i altura.')
    case 'cono:V': return `V = (π · r² · h) / 3 = (3,14 · ${m.r}² · ${m.h}) / 3${aprox}.`.replace('3,14', l === 'en' ? '3.14' : '3,14') + s(l, ' Un cono es un tercio del cilindro con la misma base y altura.', ' A cone is one third of the cylinder with the same base and height.', ' Un con és un terç del cilindre amb la mateixa base i altura.')
    case 'ortoedro:A': return `A = 2 · (a·b + a·c + b·c) = 2 · (${m.a * m.b} + ${m.a * m.c} + ${m.b * m.c})${aprox}.` + s(l, ' Son seis caras rectangulares iguales dos a dos.', ' There are six rectangular faces, in equal pairs.', ' Són sis cares rectangulars iguals dues a dues.')
    case 'cilindro:A': return `A = 2·π·r² + 2·π·r·h = 2 · 3,14 · ${m.r}² + 2 · 3,14 · ${m.r} · ${m.h}${aprox}.`.replace(/3,14/g, l === 'en' ? '3.14' : '3,14') + s(l, ' Las dos bases (círculos) más el rectángulo del lateral, que mide 2πr de largo.', ' The two circular bases plus the curved side, a rectangle 2πr long.', ' Les dues bases (cercles) més el rectangle del lateral, que fa 2πr de llarg.')
    case 'esfera:V': return `V = (4/3) · π · r³ = (4/3) · 3,14 · ${m.r}³${aprox}.`.replace('3,14', l === 'en' ? '3.14' : '3,14')
    case 'cono:AL': return `AL = π · r · g = 3,14 · ${m.r} · ${m.g}${aprox}.`.replace('3,14', l === 'en' ? '3.14' : '3,14') + s(l, ` La generatriz g va del borde de la base al vértice: g² = r² + h² = ${m.r}² + ${m.h}² = ${m.g}².`, ` The slant height g runs from the edge of the base to the apex: g² = r² + h² = ${m.r}² + ${m.h}² = ${m.g}².`, ` La generatriu g va de la vora de la base al vèrtex: g² = r² + h² = ${m.r}² + ${m.h}² = ${m.g}².`)
    default: return res
  }
}

export function schemaQuestion(r, l) {
  const bueno = Math.round(r.exacto)
  const malos = [...new Set([Math.round(r.exacto * 3), Math.round(r.exacto / 3) || bueno + 7, bueno * 2, bueno + 10])].filter(x => x !== bueno).slice(0, 3)
  const u = unidad(r)
  return { question: enunciado(r, l), correctAnswer: `${bueno} ${u}`, wrongAnswers: malos.map(x => `${x} ${u}`) }
}
