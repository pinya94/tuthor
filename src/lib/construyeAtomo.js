// Construye el Átomo (química · estructura atómica, 3.º-4.º de ESO y 1.º de Bachillerato).
//
// Tipos de ronda:
//   atomo     «un átomo de oxígeno-16 (Z = 8)»  → protones, neutrones y electrones
//   notacion  «¹⁶₈O»                             → lo mismo, desde la notación
//   isotopo   «el isótopo del cloro con 20 neutrones»
//   ion       «³⁵₁₇Cl⁻»                           → los protones NO cambian
//   config    reparte los electrones en orbitales (4s antes que 3d)
//   tabla     con la configuración, toca el elemento en la tabla periódica
//
// Respuestas: `p17n18e18` (construir), `c:2,2,6,…` (electrones por subnivel,
// en el orden de llenado) y `z:16` (tabla).
//
// Fuera del juego: Cr (24) y Cu (29), porque los libros no se ponen de
// acuerdo (unos dan la configuración «de Moeller» 4s² 3d⁴ y otros la real
// 4s¹ 3d⁵); y las configuraciones de iones de metales de transición, que
// pierden antes el 4s que el 3d (lo de Bachillerato avanzado).
import { ELEMENTOS } from '../data/tablaperiodica'

const s = (l, es, en, ca) => ({ es, en, ca })[l] ?? es

export const el = z => ELEMENTOS.find(e => e.z === z)
export const nombre = (z, l) => (l === 'en' ? el(z).nombreEn : l === 'ca' ? el(z).nombreCa : el(z).nombre)
export const simbolo = z => el(z).symbol
export const Z_MAX = 36

// Número másico del isótopo más abundante (el que dan los libros por defecto)
export const A_COMUN = {
  1: 1, 2: 4, 3: 7, 4: 9, 5: 11, 6: 12, 7: 14, 8: 16, 9: 19, 10: 20,
  11: 23, 12: 24, 13: 27, 14: 28, 15: 31, 16: 32, 17: 35, 18: 40, 19: 39, 20: 40,
  21: 45, 22: 48, 23: 51, 24: 52, 25: 55, 26: 56, 27: 59, 28: 58, 29: 63, 30: 64,
  31: 69, 32: 74, 33: 75, 34: 80, 35: 79, 36: 84,
}

// Isótopos que existen de verdad (estables o los famosos: tritio, carbono-14, potasio-40)
export const ISOTOPOS = [
  [1, 1], [1, 2], [1, 3], [3, 6], [3, 7], [5, 10], [5, 11], [6, 12], [6, 13], [6, 14],
  [7, 14], [7, 15], [8, 16], [8, 17], [8, 18], [10, 20], [10, 22], [12, 24], [12, 25], [12, 26],
  [14, 28], [14, 29], [14, 30], [17, 35], [17, 37], [18, 40], [19, 39], [19, 40], [19, 41],
  [20, 40], [20, 44], [26, 54], [26, 56],
]

// Iones de libro: [Z, carga]
export const IONES = [
  [1, 1], [3, 1], [11, 1], [19, 1], [4, 2], [12, 2], [20, 2], [13, 3],
  [9, -1], [17, -1], [35, -1], [8, -2], [16, -2], [7, -3],
  [26, 2], [26, 3], [29, 2], [30, 2],
]

// Subniveles en el orden de llenado (diagrama de Moeller) hasta el kriptón
export const SUBNIVELES = [
  { id: '1s', n: 1, cap: 2 }, { id: '2s', n: 2, cap: 2 }, { id: '2p', n: 2, cap: 6 },
  { id: '3s', n: 3, cap: 2 }, { id: '3p', n: 3, cap: 6 }, { id: '4s', n: 4, cap: 2 },
  { id: '3d', n: 3, cap: 10 }, { id: '4p', n: 4, cap: 6 },
]
// Orden en el que se DIBUJAN (por capas): el 3d queda antes que el 4s y el
// alumno tiene que saber que el 4s se llena primero.
export const ORDEN_CAPAS = ['1s', '2s', '2p', '3s', '3p', '3d', '4s', '4p']
export const idx = id => SUBNIVELES.findIndex(x => x.id === id)

export function configDe(e) {
  let resto = e
  return SUBNIVELES.map(({ cap }) => { const k = Math.min(cap, resto); resto -= k; return k })
}
// Electrones por capa (para dibujar el átomo de Bohr): Fe → 2, 8, 14, 2
export function porCapa(e) {
  const c = configDe(e)
  const capas = [0, 0, 0, 0]
  SUBNIVELES.forEach((x, i) => { capas[x.n - 1] += c[i] })
  while (capas.length > 1 && capas[capas.length - 1] === 0) capas.pop()
  return e === 0 ? [] : capas
}

const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '+': '⁺', '-': '⁻' }
const SUB = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉' }
export const sup = x => String(x).split('').map(c => SUP[c] ?? c).join('')
export const sub = x => String(x).split('').map(c => SUB[c] ?? c).join('')
// Carga como superíndice: +1 → ⁺, −2 → ²⁻
export const cargaSup = q => (q === 0 ? '' : sup(`${Math.abs(q) === 1 ? '' : Math.abs(q)}${q > 0 ? '+' : '-'}`))
export const cargaTexto = q => (q === 0 ? '0' : q > 0 ? `+${q}` : `−${-q}`)
export const notacion = (z, a, q = 0) => `${sup(a)}${sub(z)}${simbolo(z)}${cargaSup(q)}`
export const ionTexto = (z, q) => `${simbolo(z)}${cargaSup(q)}`

// Configuración escrita en el orden de llenado: 1s² 2s² 2p⁶ 3s¹
export const textoConfig = c => SUBNIVELES.map((x, i) => (c[i] ? `${x.id}${sup(c[i])}` : '')).filter(Boolean).join(' ')

export const NIVELES = {
  facil: { tipos: ['atomo', 'atomo', 'notacion'], zMax: 20 },
  medio: { tipos: ['ion', 'ion', 'isotopo', 'notacion'], zMax: 30 },
  dificil: { tipos: ['config', 'config', 'tabla', 'tabla'], zMax: Z_MAX },
}

let seq = 0
const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const recientes = []
function nuevo(clave) {
  if (recientes.includes(clave)) return false
  recientes.push(clave)
  if (recientes.length > 8) recientes.shift()
  return true
}
const SIN_CONFIG = [24, 29]

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const tipo = elige(rand, cfg.tipos)
  const base = { id: ++seq, nivel, tipo }
  for (let intento = 0; ; intento++) {
    const libre = intento > 30
    if (tipo === 'atomo' || tipo === 'notacion') {
      // En fácil, a veces un isótopo menos común (carbono-14, cloro-37)
      const z = 1 + Math.floor(rand() * cfg.zMax)
      const isos = ISOTOPOS.filter(([iz]) => iz === z)
      const a = isos.length && rand() < 0.35 ? elige(rand, isos)[1] : A_COMUN[z]
      if (!libre && !nuevo(`${tipo}${z}-${a}`)) continue
      return { ...base, z, a, q: 0, bueno: `p${z}n${a - z}e${z}` }
    }
    if (tipo === 'isotopo') {
      const [z, a] = elige(rand, ISOTOPOS.filter(([iz]) => iz <= cfg.zMax))
      if (!libre && !nuevo(`i${z}-${a}`)) continue
      return { ...base, z, a, q: 0, bueno: `p${z}n${a - z}e${z}` }
    }
    if (tipo === 'ion') {
      const [z, q] = elige(rand, IONES.filter(([iz]) => iz <= cfg.zMax))
      const a = A_COMUN[z]
      if (!libre && !nuevo(`ion${z}${q}`)) continue
      return { ...base, z, a, q, bueno: `p${z}n${a - z}e${z - q}` }
    }
    if (tipo === 'config') {
      // A veces un ion sencillo de los grupos principales (Na⁺, Cl⁻, O²⁻…)
      const ion = rand() < 0.3
      const [z, q] = ion
        ? elige(rand, IONES.filter(([iz]) => iz <= 20 && iz !== 1))
        : [1 + Math.floor(rand() * cfg.zMax), 0]
      if (SIN_CONFIG.includes(z)) continue
      if (!libre && !nuevo(`c${z}${q}`)) continue
      return { ...base, z, q, bueno: `c:${configDe(z - q).join(',')}` }
    }
    // tabla
    const z = 1 + Math.floor(rand() * cfg.zMax)
    if (SIN_CONFIG.includes(z)) continue
    if (!libre && !nuevo(`t${z}`)) continue
    return { ...base, z, q: 0, config: configDe(z), bueno: `z:${z}` }
  }
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)
export const esCorrecta = (r, x) => x === r.bueno
export const respuestaAtomo = (p, n, e) => `p${p}n${n}e${e}`
export const respuestaConfig = c => `c:${c.join(',')}`
export const leeAtomo = x => {
  const m = /^p(\d+)n(\d+)e(\d+)$/.exec(x ?? '')
  return m ? { p: +m[1], n: +m[2], e: +m[3] } : null
}
export const leeConfig = x => (x?.startsWith('c:') ? x.slice(2).split(',').map(Number) : null)

const de = (z, l) => {
  const n = nombre(z, l)
  if (l === 'ca') return /^[AEIOUÀÈÉÍÒÓÚH]/i.test(n) ? `d’${n.toLowerCase()}` : `de ${n.toLowerCase()}`
  if (l === 'en') return n.toLowerCase()
  return `de ${n.toLowerCase()}`
}
// «el cloro», «l’oxigen», «the chlorine»
const elDe = (z, l) => {
  const n = nombre(z, l).toLowerCase()
  if (l === 'ca') return /^[aeiouàèéíòóúh]/.test(n) ? `l’${n}` : `el ${n}`
  if (l === 'en') return n
  return `el ${n}`
}
const ISO_NOMBRE = { '1-2': { es: 'deuterio', en: 'deuterium', ca: 'deuteri' }, '1-3': { es: 'tritio', en: 'tritium', ca: 'triti' } }

export function enunciado(r, l) {
  const nom = nombre(r.z, l)
  switch (r.tipo) {
    case 'atomo':
      return s(l, `Construye un átomo de ${nom.toLowerCase()}-${r.a} (Z = ${r.z})`, `Build an atom of ${nom.toLowerCase()}-${r.a} (Z = ${r.z})`, `Construeix un àtom ${de(r.z, l)}-${r.a} (Z = ${r.z})`)
    case 'notacion':
      return s(l, `Construye este átomo: ${notacion(r.z, r.a)}`, `Build this atom: ${notacion(r.z, r.a)}`, `Construeix aquest àtom: ${notacion(r.z, r.a)}`)
    case 'isotopo':
      return s(l, `Construye el isótopo ${de(r.z, l)} (Z = ${r.z}) que tiene ${r.a - r.z} neutrones`, `Build the isotope of ${de(r.z, l)} (Z = ${r.z}) that has ${r.a - r.z} neutrons`, `Construeix l’isòtop ${de(r.z, l)} (Z = ${r.z}) que té ${r.a - r.z} neutrons`)
    case 'ion':
      return s(l, `Construye el ion ${notacion(r.z, r.a, r.q)}`, `Build the ion ${notacion(r.z, r.a, r.q)}`, `Construeix l’ió ${notacion(r.z, r.a, r.q)}`)
    case 'config':
      return r.q
        ? s(l, `Reparte en orbitales los electrones del ion ${ionTexto(r.z, r.q)} (Z = ${r.z})`, `Fill the orbitals with the electrons of the ion ${ionTexto(r.z, r.q)} (Z = ${r.z})`, `Reparteix en orbitals els electrons de l’ió ${ionTexto(r.z, r.q)} (Z = ${r.z})`)
        : s(l, `Reparte en orbitales los electrones de un átomo ${de(r.z, l)} (Z = ${r.z})`, `Fill the orbitals with the electrons of a ${de(r.z, l)} atom (Z = ${r.z})`, `Reparteix en orbitals els electrons d’un àtom ${de(r.z, l)} (Z = ${r.z})`)
    default:
      return s(l, '¿Qué elemento tiene esta configuración? Tócalo en la tabla', 'Which element has this configuration? Tap it in the table', 'Quin element té aquesta configuració? Toca’l a la taula')
  }
}

// Bloque, grupo y periodo a partir de la configuración (para explicar la tabla)
export function ultimoSubnivel(c) {
  let k = -1
  c.forEach((x, i) => { if (x) k = i })
  return k
}
export function posicion(z) {
  const c = configDe(z)
  const k = ultimoSubnivel(c)
  const sn = SUBNIVELES[k]
  const periodo = Math.max(...SUBNIVELES.map((x, i) => (c[i] ? x.n : 0)))
  const tipo = sn.id[1]
  const ns = c[SUBNIVELES.findIndex(x => x.n === periodo && x.id.endsWith('s'))]
  let grupo, valencia
  if (z === 2) { grupo = 18; valencia = 2 }
  else if (tipo === 's') { grupo = c[k]; valencia = c[k] }
  else if (tipo === 'p') { valencia = ns + c[k]; grupo = 10 + valencia }
  else { grupo = 2 + c[k]; valencia = 2 }
  return { periodo, grupo, valencia, bloque: tipo, ultimo: `${sn.id}${sup(c[k])}` }
}

export function explicacion(r, l) {
  const nom = nombre(r.z, l)
  if (r.tipo === 'config' || r.tipo === 'tabla') {
    const e = r.z - r.q
    const conf = textoConfig(configDe(e))
    if (r.tipo === 'config') {
      const cuenta = r.q
        ? s(l, `El ${ionTexto(r.z, r.q)} tiene ${r.z} protones y carga ${cargaTexto(r.q)}: ${e} electrones.`, `${ionTexto(r.z, r.q)} has ${r.z} protons and a charge of ${cargaTexto(r.q)}: ${e} electrons.`, `El ${ionTexto(r.z, r.q)} té ${r.z} protons i càrrega ${cargaTexto(r.q)}: ${e} electrons.`)
        : s(l, `Un átomo neutro tiene tantos electrones como protones: ${e}.`, `A neutral atom has as many electrons as protons: ${e}.`, `Un àtom neutre té tants electrons com protons: ${e}.`)
      const orden = s(l, 'Se llenan en el orden 1s 2s 2p 3s 3p 4s 3d 4p: el 4s va antes que el 3d porque tiene menos energía.', 'They fill in the order 1s 2s 2p 3s 3p 4s 3d 4p: 4s comes before 3d because it has lower energy.', 'S’omplen en l’ordre 1s 2s 2p 3s 3p 4s 3d 4p: el 4s va abans que el 3d perquè té menys energia.')
      const gas = r.q && [2, 10, 18].includes(e)
        ? s(l, ` Queda igual que el gas noble ${nombre(e, l).toLowerCase()}: por eso forma ese ion.`, ` It ends up like the noble gas ${nombre(e, l).toLowerCase()}: that is why it forms this ion.`, ` Queda igual que el gas noble ${nombre(e, l).toLowerCase()}: per això forma aquest ió.`)
        : ''
      return `${cuenta} ${orden} → ${conf}.${gas}`
    }
    const p = posicion(r.z)
    const per = s(l, `La capa más alta es la ${p.periodo}: periodo ${p.periodo}.`, `The highest shell is ${p.periodo}: period ${p.periodo}.`, `La capa més alta és la ${p.periodo}: període ${p.periodo}.`)
    let gr
    if (r.z === 2) gr = s(l, 'El helio es la excepción: 1s² es su capa completa y va con los gases nobles, en el grupo 18.', 'Helium is the exception: 1s² is its full shell and it sits with the noble gases, in group 18.', 'L’heli és l’excepció: 1s² és la seva capa completa i va amb els gasos nobles, al grup 18.')
    else if (p.bloque === 's') gr = s(l, `Acaba en ${p.ultimo}: bloque s, grupo ${p.grupo}.`, `It ends in ${p.ultimo}: s block, group ${p.grupo}.`, `Acaba en ${p.ultimo}: bloc s, grup ${p.grupo}.`)
    else if (p.bloque === 'p') gr = s(l, `Acaba en ${p.ultimo}: bloque p, con ${p.valencia} electrones de valencia → grupo 10 + ${p.valencia} = ${p.grupo}.`, `It ends in ${p.ultimo}: p block, with ${p.valencia} valence electrons → group 10 + ${p.valencia} = ${p.grupo}.`, `Acaba en ${p.ultimo}: bloc p, amb ${p.valencia} electrons de valència → grup 10 + ${p.valencia} = ${p.grupo}.`)
    else gr = s(l, `Acaba en ${p.ultimo}: bloque d (metal de transición), grupo 2 + ${p.grupo - 2} = ${p.grupo}.`, `It ends in ${p.ultimo}: d block (transition metal), group 2 + ${p.grupo - 2} = ${p.grupo}.`, `Acaba en ${p.ultimo}: bloc d (metall de transició), grup 2 + ${p.grupo - 2} = ${p.grupo}.`)
    return `${per} ${gr} ${s(l, `Es el ${nom.toLowerCase()} (${simbolo(r.z)}, Z = ${r.z}).`, `It is ${nom.toLowerCase()} (${simbolo(r.z)}, Z = ${r.z}).`, `És ${elDe(r.z, l)} (${simbolo(r.z)}, Z = ${r.z}).`)}`
  }
  const n = r.a - r.z, e = r.z - r.q
  const pro = s(l, `Z = ${r.z}: ${r.z} protones (los protones deciden qué elemento es).`, `Z = ${r.z}: ${r.z} protons (the protons decide which element it is).`, `Z = ${r.z}: ${r.z} protons (els protons decideixen quin element és).`)
  const neu = s(l, `Neutrones = A − Z = ${r.a} − ${r.z} = ${n}.`, `Neutrons = A − Z = ${r.a} − ${r.z} = ${n}.`, `Neutrons = A − Z = ${r.a} − ${r.z} = ${n}.`)
  let ele
  if (r.q > 0) ele = s(l, `Carga ${cargaTexto(r.q)}: ha PERDIDO ${r.q} electr${r.q === 1 ? 'ón' : 'ones'} → ${r.z} − ${r.q} = ${e}.`, `Charge ${cargaTexto(r.q)}: it has LOST ${r.q} electron${r.q === 1 ? '' : 's'} → ${r.z} − ${r.q} = ${e}.`, `Càrrega ${cargaTexto(r.q)}: ha PERDUT ${r.q} electr${r.q === 1 ? 'ó' : 'ons'} → ${r.z} − ${r.q} = ${e}.`)
  else if (r.q < 0) ele = s(l, `Carga ${cargaTexto(r.q)}: ha GANADO ${-r.q} electr${r.q === -1 ? 'ón' : 'ones'} → ${r.z} + ${-r.q} = ${e}.`, `Charge ${cargaTexto(r.q)}: it has GAINED ${-r.q} electron${r.q === -1 ? '' : 's'} → ${r.z} + ${-r.q} = ${e}.`, `Càrrega ${cargaTexto(r.q)}: ha GUANYAT ${-r.q} electr${r.q === -1 ? 'ó' : 'ons'} → ${r.z} + ${-r.q} = ${e}.`)
  else ele = s(l, `Neutro: tantos electrones como protones, ${e}.`, `Neutral: as many electrons as protons, ${e}.`, `Neutre: tants electrons com protons, ${e}.`)
  let extra = ''
  if (r.q) extra = s(l, ' En un ion solo cambian los electrones: si cambiaras los protones, sería otro elemento.', ' In an ion only the electrons change: change the protons and it becomes another element.', ' En un ió només canvien els electrons: si canviessis els protons, seria un altre element.')
  else if (r.tipo === 'isotopo') extra = s(l, ` Todos los isótopos ${de(r.z, l)} tienen ${r.z} protones; cambian los neutrones. A = ${r.z} + ${n} = ${r.a}: es el ${nom.toLowerCase()}-${r.a}.`, ` All isotopes of ${de(r.z, l)} have ${r.z} protons; the neutrons change. A = ${r.z} + ${n} = ${r.a}: it is ${nom.toLowerCase()}-${r.a}.`, ` Tots els isòtops ${de(r.z, l)} tenen ${r.z} protons; canvien els neutrons. A = ${r.z} + ${n} = ${r.a}: és ${elDe(r.z, l)}-${r.a}.`)
  const iso = ISO_NOMBRE[`${r.z}-${r.a}`]
  if (iso) extra += s(l, ` El hidrógeno-${r.a} tiene nombre propio: ${iso.es}.`, ` Hydrogen-${r.a} has its own name: ${iso.en}.`, ` L’hidrogen-${r.a} té nom propi: ${iso.ca}.`)
  return `${pro} ${neu} ${ele}${extra}`
}

// Por qué ha fallado, en una frase (para el veredicto). null si no hay una causa clara.
export function pistaFallo(r, x, l) {
  if (r.tipo === 'tabla') return null
  if (r.tipo === 'config') {
    const c = leeConfig(x)
    if (!c) return null
    const total = c.reduce((a, b) => a + b, 0), e = r.z - r.q
    if (total !== e) return s(l, `Has puesto ${total} electrones y hacían falta ${e}.`, `You placed ${total} electrons and it needed ${e}.`, `Hi has posat ${total} electrons i en calien ${e}.`)
    if (c[idx('3d')] > 0 && c[idx('4s')] < 2) return s(l, 'El 4s se llena antes que el 3d.', '4s fills before 3d.', 'El 4s s’omple abans que el 3d.')
    return s(l, 'Hay que llenar cada subnivel antes de pasar al siguiente.', 'Each sublevel has to be full before moving on to the next.', 'Cal omplir cada subnivell abans de passar al següent.')
  }
  const v = leeAtomo(x)
  if (!v) return null
  const n = r.a - r.z, e = r.z - r.q
  if (v.p !== r.z && r.q && v.e === r.z && v.p === r.z - r.q) return s(l, 'Has cambiado los protones: en un ion solo cambian los electrones.', 'You changed the protons: in an ion only the electrons change.', 'Has canviat els protons: en un ió només canvien els electrons.')
  if (v.p !== r.z) return s(l, `Con ${v.p} protones ${v.p >= 1 && v.p <= Z_MAX ? `sería ${elDe(v.p, l)}` : 'no es este elemento'}.`, `With ${v.p} protons ${v.p >= 1 && v.p <= Z_MAX ? `it would be ${elDe(v.p, l)}` : 'it is not this element'}.`, `Amb ${v.p} protons ${v.p >= 1 && v.p <= Z_MAX ? `seria ${elDe(v.p, l)}` : 'no és aquest element'}.`)
  if (v.n === r.a) return s(l, 'A cuenta protones y neutrones juntos: los neutrones son A − Z.', 'A counts protons and neutrons together: the neutrons are A − Z.', 'A compta protons i neutrons junts: els neutrons són A − Z.')
  if (v.n !== n) return s(l, `Neutrones: ${r.a} − ${r.z} = ${n}.`, `Neutrons: ${r.a} − ${r.z} = ${n}.`, `Neutrons: ${r.a} − ${r.z} = ${n}.`)
  if (r.q && v.e === r.z + r.q) return s(l, 'Al revés: un ion positivo ha perdido electrones y uno negativo los ha ganado.', 'The other way round: a positive ion has lost electrons and a negative one has gained them.', 'Al revés: un ió positiu ha perdut electrons i un de negatiu n’ha guanyat.')
  if (v.e !== e) return r.q
    ? s(l, `Electrones: ${r.z} protones y carga ${cargaTexto(r.q)} → ${e}.`, `Electrons: ${r.z} protons and a charge of ${cargaTexto(r.q)} → ${e}.`, `Electrons: ${r.z} protons i càrrega ${cargaTexto(r.q)} → ${e}.`)
    : s(l, 'Un átomo neutro tiene tantos electrones como protones.', 'A neutral atom has as many electrons as protons.', 'Un àtom neutre té tants electrons com protons.')
  return null
}

// Versión tipo test para los datos estructurados del examen
export function schemaQuestion(r, l) {
  const q = enunciado(r, l)
  if (r.tipo === 'tabla') {
    const malos = [r.z - 1, r.z + 1, r.z + 8, r.z - 8, r.z - 2, r.z + 2].filter(z => z >= 1 && z <= Z_MAX && z !== r.z).slice(0, 3)
    return { question: `${q}: ${textoConfig(r.config)}`, correctAnswer: nombre(r.z, l), wrongAnswers: malos.map(z => nombre(z, l)) }
  }
  if (r.tipo === 'config') {
    const e = r.z - r.q
    const buena = textoConfig(configDe(e))
    const malas = [r.q ? r.z : e + 1, e - 1, e + 1, e + 2, e - 2, e + 3, e - 3].filter(x => x >= 1 && x <= Z_MAX).map(x => textoConfig(configDe(x)))
    return { question: q, correctAnswer: buena, wrongAnswers: [...new Set(malas)].filter(x => x !== buena).slice(0, 3) }
  }
  const n = r.a - r.z, e = r.z - r.q
  const t = (p, nn, ee) => s(l, `${p} protones, ${nn} neutrones y ${ee} electrones`, `${p} protons, ${nn} neutrons and ${ee} electrons`, `${p} protons, ${nn} neutrons i ${ee} electrons`)
  const malas = [t(r.z, r.a, e), t(r.z, n, r.z + r.q), t(e, n, e), t(r.z, n + 1, e), t(r.z, n, e + 1), t(r.a, n, e), t(r.z + 1, n, e + 1), t(r.z, n + 2, e)]
  const buena = t(r.z, n, e)
  return { question: q, correctAnswer: buena, wrongAnswers: [...new Set(malas)].filter(x => x !== buena).slice(0, 3) }
}
