// Métrica española: separar en sílabas, contar sílabas métricas (sinalefa y
// ley del acento final), clasificar la rima y reconocer estrofas.
//
// La usa el juego Mide el verso. Las respuestas NO se escriben a mano: se
// calculan aquí, y el test comprueba que el cálculo coincide con el metro
// conocido de cada poema (data/versos.js). Un verso que el algoritmo no mide
// bien (porque el poeta usa una dialefa o una licencia que la regla general no
// prevé) no entra en el juego: así nunca se contradice a un libro de texto.
//
// Reglas aplicadas (las de cualquier libro de Lengua de ESO):
//   · Diptongo: vocal débil átona (i, u) junto a otra vocal. Dos fuertes, o una
//     débil con tilde (í, ú), forman hiato. La diéresis (ü, ï) también lo marca.
//   · Sinalefa: siempre que una palabra acaba en vocal y la siguiente empieza
//     por vocal (o h + vocal). No hay sinalefa ante hie-, hue-, hia-… (ahí la
//     h suena como consonante: «hierba», «hueso»).
//   · Final: aguda +1, llana igual, esdrújula −1.
//   · Cesura: en los versos compuestos (alejandrinos), marcada con «|», cada
//     hemistiquio se mide por separado.

const FUERTES = new Set('aeoáéíóúàèòï')
const DEBILES = new Set('iuü')
const VOCALES = new Set([...FUERTES, ...DEBILES])
const TILDES = new Set('áéíóú')
const SIN_TILDE = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ü: 'u', ï: 'i', à: 'a', è: 'e', ò: 'o' }
const INSEPARABLES = new Set(['pr', 'br', 'tr', 'dr', 'cr', 'kr', 'gr', 'fr', 'pl', 'bl', 'cl', 'kl', 'gl', 'fl'])

const limpia = p => p.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñÏï]/g, '')

// Unidades de una palabra: dígrafos como una sola consonante y la «y» como
// vocal cuando va sola o al final tras vocal (rey, hoy, muy).
function unidades(palabra) {
  const w = palabra, l = palabra.toLowerCase()
  const us = []
  for (let i = 0; i < w.length; i++) {
    const c = l[i], sig = l[i + 1], sig2 = l[i + 2]
    if ((c === 'c' && sig === 'h') || (c === 'l' && sig === 'l') || (c === 'r' && sig === 'r')) { us.push({ t: w.slice(i, i + 2), k: 'C' }); i++; continue }
    if ((c === 'q' || c === 'g') && sig === 'u' && sig2 && 'eiéí'.includes(sig2)) { us.push({ t: w.slice(i, i + 2), k: 'C' }); i++; continue }
    if (c === 'y') {
      const sola = l.length === 1
      const final = i === l.length - 1 && i > 0 && VOCALES.has(l[i - 1])
      us.push({ t: w[i], k: sola || final ? 'V' : 'C', debil: true })
      continue
    }
    if (VOCALES.has(c)) us.push({ t: w[i], k: 'V', debil: DEBILES.has(c) })
    else us.push({ t: w[i], k: 'C' })
  }
  return us
}

// Separa una palabra en sílabas. Devuelve { silabas, tonica }.
export function silabear(palabraOriginal) {
  const palabra = limpia(palabraOriginal)
  const us = unidades(palabra)
  // Núcleos: secuencias de vocales unidas por diptongo/triptongo.
  const grupos = [] // { tipo: 'C'|'N', us: [] }
  for (const u of us) {
    const ult = grupos[grupos.length - 1]
    if (u.k === 'C') {
      if (ult && ult.tipo === 'C') ult.us.push(u)
      else grupos.push({ tipo: 'C', us: [u] })
      continue
    }
    if (ult && ult.tipo === 'N') {
      const prev = ult.us[ult.us.length - 1]
      // Hiato: dos fuertes seguidas (una débil con tilde o con diéresis cuenta como fuerte).
      // La diéresis sobre la i (ruïdo) también separa.
      if ((!prev.debil && !u.debil) || u.t.toLowerCase() === 'ï' || prev.t.toLowerCase() === 'ï') { grupos.push({ tipo: 'N', us: [u] }); continue }
      ult.us.push(u)
      continue
    }
    grupos.push({ tipo: 'N', us: [u] })
  }
  // Reparte consonantes entre núcleos.
  const silabas = []
  let actual = ''
  grupos.forEach((g, gi) => {
    if (g.tipo === 'N') {
      // Dos núcleos seguidos (hiato): la sílaba anterior se cierra aquí.
      if (gi > 0 && grupos[gi - 1].tipo === 'N') { silabas.push(actual); actual = '' }
      actual += g.us.map(u => u.t).join('')
      return
    }
    const cs = g.us
    const esPrimero = gi === 0, esUltimo = gi === grupos.length - 1
    if (esPrimero) { actual += cs.map(u => u.t).join(''); return }
    if (esUltimo) { actual += cs.map(u => u.t).join(''); return }
    let nVan // cuántas consonantes pasan a la sílaba siguiente
    const par = cs.length >= 2 ? (cs[cs.length - 2].t + cs[cs.length - 1].t).toLowerCase() : ''
    if (cs.length === 1) nVan = 1
    else if (cs.length === 2) nVan = INSEPARABLES.has(par) ? 2 : 1
    else if (cs.length === 3) nVan = INSEPARABLES.has(par) ? 2 : 1
    else nVan = 2
    actual += cs.slice(0, cs.length - nVan).map(u => u.t).join('')
    silabas.push(actual)
    actual = cs.slice(cs.length - nVan).map(u => u.t).join('')
  })
  if (actual) silabas.push(actual)
  // Sílaba tónica.
  let tonica = silabas.findIndex(s => [...s.toLowerCase()].some(c => TILDES.has(c)))
  if (tonica < 0) {
    const fin = palabra.toLowerCase().slice(-1)
    tonica = silabas.length === 1 ? 0 : 'aeiouns'.includes(fin) ? silabas.length - 2 : silabas.length - 1
  }
  return { silabas, tonica }
}

export function acento(palabra) {
  const { silabas, tonica } = silabear(palabra)
  const tras = silabas.length - 1 - tonica
  return tras === 0 ? 'aguda' : tras === 1 ? 'llana' : 'esdrujula'
}

const empiezaPorVocal = p => {
  const l = limpia(p).toLowerCase()
  if (!l) return false
  if (l === 'y') return true
  if (l[0] === 'y') return false
  if (l[0] === 'h') {
    // hie-, hue-, hia-, hui-… suenan con consonante: sin sinalefa.
    if ('iu'.includes(l[1]) && VOCALES.has(l[2])) return false
    return VOCALES.has(l[1])
  }
  return VOCALES.has(l[0])
}
const acabaEnVocal = p => {
  const l = limpia(p).toLowerCase()
  return VOCALES.has(l.slice(-1)) || l.slice(-1) === 'y'
}

// Mide un tramo sin cesura. Devuelve sílabas métricas y su segmentación.
function medirTramo(texto) {
  const palabras = texto.split(/\s+/).filter(p => limpia(p))
  const segs = [] // sílabas métricas (cada una puede unir dos palabras)
  let fonologicas = 0, sinalefas = 0
  palabras.forEach((p, i) => {
    const { silabas } = silabear(p)
    fonologicas += silabas.length
    const unir = i > 0 && acabaEnVocal(palabras[i - 1]) && empiezaPorVocal(p)
    silabas.forEach((s, k) => {
      if (k === 0 && unir) { segs[segs.length - 1] += '‿' + s; sinalefas++ }
      else segs.push(s)
    })
  })
  const final = acento(palabras[palabras.length - 1])
  const ajuste = final === 'aguda' ? 1 : final === 'esdrujula' ? -1 : 0
  return { segs, fonologicas, sinalefas, final, ajuste, ultima: limpia(palabras[palabras.length - 1]), metricas: segs.length + ajuste }
}

// Mide un verso (con «|» para la cesura de los compuestos).
export function medir(verso) {
  const tramos = verso.split('|').map(t => medirTramo(t.trim()))
  return {
    tramos,
    silabas: tramos.reduce((s, t) => s + t.metricas, 0),
    fonologicas: tramos.reduce((s, t) => s + t.fonologicas, 0),
    final: tramos[tramos.length - 1].final,
    ultima: tramos[tramos.length - 1].ultima,
  }
}

// Parte del verso que rima: desde la vocal tónica de la última palabra.
export function terminacion(verso) {
  const palabras = verso.replace(/\|/g, ' ').split(/\s+/).filter(p => limpia(p))
  const ult = limpia(palabras[palabras.length - 1]).toLowerCase()
  const { silabas, tonica } = silabear(ult)
  const sil = silabas[tonica].toLowerCase()
  // En la sílaba tónica, la vocal que lleva el acento: la fuerte, o la débil con tilde.
  const vs = [...sil].map((c, i) => ({ c, i })).filter(({ c }) => VOCALES.has(c) || c === 'y')
  let v = vs.find(({ c }) => TILDES.has(c)) || vs.find(({ c }) => FUERTES.has(c)) || vs[vs.length - 1]
  if (!v) v = { i: 0 }
  const resto = sil.slice(v.i) + silabas.slice(tonica + 1).join('').toLowerCase()
  return [...resto].map(c => SIN_TILDE[c] || c).join('').replace(/y$/, 'i')
}
// Las vocales que cuentan para la asonancia: la tónica y las de las sílabas
// siguientes (sin las débiles de los diptongos átonos: «lirio» rima en i-o).
const vocalesRima = t => {
  const [primera, ...resto] = t
  const vs = [primera]
  let silaba = ''
  for (const c of resto) silaba += c
  const despues = silaba.replace(/[^aeiou]+/g, ' ').trim().split(/\s+/).filter(Boolean)
  for (const g of despues) vs.push(g.length > 1 ? g.replace(/[iu]/g, '') || g[g.length - 1] : g)
  return vs.join('')
}
export function tipoRima(v1, v2) {
  const a = terminacion(v1), b = terminacion(v2)
  if (a === b) return 'consonante'
  if (vocalesRima(a) === vocalesRima(b)) return 'asonante'
  return 'libre'
}

export const NOMBRE_METRO = {
  5: 'pentasílabo', 6: 'hexasílabo', 7: 'heptasílabo', 8: 'octosílabo', 9: 'eneasílabo',
  10: 'decasílabo', 11: 'endecasílabo', 12: 'dodecasílabo', 14: 'alejandrino',
}

// Estrofas de cuatro versos (y el romance) a partir de medidas y rimas.
export function estrofa(versos) {
  if (versos.length !== 4) return null
  const m = versos.map(v => medir(v).silabas)
  const r = (i, j) => tipoRima(versos[i], versos[j])
  const igual = m.every(x => x === m[0])
  if (!igual) return null
  const abba = r(0, 3) === 'consonante' && r(1, 2) === 'consonante' && r(0, 1) === 'libre'
  const abab = r(0, 2) === 'consonante' && r(1, 3) === 'consonante' && r(0, 1) === 'libre'
  if (m[0] === 8 && abba) return 'redondilla'
  if (m[0] === 8 && abab) return 'cuarteta'
  if (m[0] === 11 && abba) return 'cuarteto'
  if (m[0] === 11 && abab) return 'serventesio'
  if (m[0] === 8 && r(1, 3) === 'asonante' && r(0, 1) === 'libre' && r(0, 2) !== 'consonante' && r(2, 3) === 'libre') return 'romance'
  return null
}
