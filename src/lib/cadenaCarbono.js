// Cadena de Carbono (química · química orgánica, 4.º de ESO y Bachillerato).
//
// Sale una molécula dibujada en fórmula semidesarrollada (la cadena en fila,
// el grupo funcional arriba y las ramas abajo) y hay que reconocerla.
//
// Tipos de pregunta (y la trampa que cada uno pone a prueba):
//   familia     alcano, alcohol, cetona…           (aldehído ↔ cetona, alcohol ↔ ácido)
//   nombre      su nombre IUPAC                    (numerar desde el extremo equivocado, contar mal)
//   formula     su fórmula molecular               (olvidar que cada doble enlace quita 2 H)
//   estructura  del nombre a la fórmula            (localizador en otro carbono, otra familia)
//   isomero     cuál es un isómero suyo            (confundir «parecida» con «misma fórmula»)
//
// Una molécula es { fam, n, loc, rama }: n carbonos en la cadena principal,
// loc el localizador del doble/triple enlace o del grupo (0 si no hace
// falta) y rama el carbono del que cuelga un metilo (solo alcanos, 0 si no).
// Nombres IUPAC actuales (but-2-eno, propan-2-ol), como en el examen del tema.

const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
const SUB = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉' }
export const sub = k => String(k).split('').map(c => SUB[c]).join('')

export const FAMILIAS = ['alcano', 'alqueno', 'alquino', 'alcohol', 'aldehido', 'cetona', 'acido', 'amina']
export const FAMILIA = {
  alcano:   { es: 'Alcano', en: 'Alkane', ca: 'Alcà' },
  alqueno:  { es: 'Alqueno', en: 'Alkene', ca: 'Alquè' },
  alquino:  { es: 'Alquino', en: 'Alkyne', ca: 'Alquí' },
  alcohol:  { es: 'Alcohol', en: 'Alcohol', ca: 'Alcohol' },
  aldehido: { es: 'Aldehído', en: 'Aldehyde', ca: 'Aldehid' },
  cetona:   { es: 'Cetona', en: 'Ketone', ca: 'Cetona' },
  acido:    { es: 'Ácido carboxílico', en: 'Carboxylic acid', ca: 'Àcid carboxílic' },
  amina:    { es: 'Amina', en: 'Amine', ca: 'Amina' },
}
const UN = {
  alcano:   ['un alcano', 'an alkane', 'un alcà'],
  alqueno:  ['un alqueno', 'an alkene', 'un alquè'],
  alquino:  ['un alquino', 'an alkyne', 'un alquí'],
  alcohol:  ['un alcohol', 'an alcohol', 'un alcohol'],
  aldehido: ['un aldehído', 'an aldehyde', 'un aldehid'],
  cetona:   ['una cetona', 'a ketone', 'una cetona'],
  acido:    ['un ácido carboxílico', 'a carboxylic acid', 'un àcid carboxílic'],
  amina:    ['una amina', 'an amine', 'una amina'],
}
const RASGO = {
  alcano:   ['solo enlaces simples entre carbonos', 'only single bonds between carbons', 'només enllaços simples entre carbonis'],
  alqueno:  ['un enlace doble C=C', 'a C=C double bond', 'un enllaç doble C=C'],
  alquino:  ['un enlace triple C≡C', 'a C≡C triple bond', 'un enllaç triple C≡C'],
  alcohol:  ['un grupo –OH', 'an –OH group', 'un grup –OH'],
  aldehido: ['un grupo –CHO al final de la cadena', 'a –CHO group at the end of the chain', 'un grup –CHO al final de la cadena'],
  cetona:   ['un C=O en medio de la cadena', 'a C=O in the middle of the chain', 'un C=O al mig de la cadena'],
  acido:    ['un grupo –COOH al final de la cadena', 'a –COOH group at the end of the chain', 'un grup –COOH al final de la cadena'],
  amina:    ['un grupo –NH₂', 'an –NH₂ group', 'un grup –NH₂'],
}
const TERM = {
  alcano: ['-ano', '-ane', '-à'], alqueno: ['-eno', '-ene', '-è'], alquino: ['-ino', '-yne', '-í'],
  alcohol: ['-ol', '-ol', '-ol'], aldehido: ['-al', '-al', '-al'], cetona: ['-ona', '-one', '-ona'],
  acido: ['ácido …-oico', '…-oic acid', 'àcid …-oic'], amina: ['-amina', '-amine', '-amina'],
}
// Lo que se numera: el sitio del doble enlace o del grupo («más cercano al…»).
const LUGAR = {
  alqueno: ['al doble enlace', 'the double bond', 'a l’enllaç doble'],
  alquino: ['al triple enlace', 'the triple bond', 'a l’enllaç triple'],
  alcohol: ['al –OH', 'the –OH', 'a l’–OH'],
  amina:   ['al –NH₂', 'the –NH₂', 'a l’–NH₂'],
  cetona:  ['al C=O', 'the C=O', 'al C=O'],
}
const ix = l => (l === 'en' ? 1 : l === 'ca' ? 2 : 0)
const PREF = {
  es: ['met', 'et', 'prop', 'but', 'pent', 'hex'],
  en: ['meth', 'eth', 'prop', 'but', 'pent', 'hex'],
  ca: ['met', 'et', 'prop', 'but', 'pent', 'hex'],
}

// ── Moléculas ─────────────────────────────────────────────────────────────
export const clave = m => `${m.fam}|${m.n}|${m.loc}|${m.rama}`
export const deClave = k => { const [fam, n, loc, rama] = k.split('|'); return { fam, n: +n, loc: +loc, rama: +rama } }

// ¿El nombre lleva localizador? (but-1-eno sí; propeno, butanona no)
export function conLoc({ fam, n, rama }) {
  if (rama) return true
  if (fam === 'alqueno' || fam === 'alquino') return n >= 4
  if (fam === 'alcohol' || fam === 'amina') return n >= 3
  if (fam === 'cetona') return n >= 5
  return false
}

// Molécula bien numerada (el localizador más bajo posible).
export function valida({ fam, n, loc, rama }) {
  if (!FAMILIAS.includes(fam) || n < 1 || n > 6) return false
  if (rama && (fam !== 'alcano' || n < 3 || n > 5 || rama < 2 || rama > Math.ceil(n / 2))) return false
  switch (fam) {
    case 'alcano': return loc === 0
    case 'alqueno': case 'alquino': return n >= 2 && loc >= 1 && loc <= Math.floor(n / 2)
    case 'alcohol': case 'amina': return loc >= 1 && loc <= Math.ceil(n / 2)
    case 'aldehido': case 'acido': return loc === 1
    case 'cetona': return n >= 3 && loc >= 2 && loc <= Math.ceil(n / 2)
  }
  return false
}

export const TODAS = (() => {
  const out = []
  for (const fam of FAMILIAS) for (let n = 1; n <= 6; n++) for (let loc = 0; loc <= 3; loc++) for (const rama of [0, 2, 3]) {
    const m = { fam, n, loc, rama }
    if (valida(m)) out.push(m)
  }
  return out
})()

// Nombre (acepta un localizador mal puesto: así se construyen las trampas).
export function nombre({ fam, n, loc, rama }, l = 'es') {
  const P = PREF[l][n - 1]
  const L = conLoc({ fam, n, rama })
  switch (fam) {
    case 'alcano': return rama ? `${rama}-${s(l, 'metil', 'methyl', 'metil')}${P}${s(l, 'ano', 'ane', 'à')}` : `${P}${s(l, 'ano', 'ane', 'à')}`
    case 'alqueno': return L ? `${P}-${loc}-${s(l, 'eno', 'ene', 'è')}` : `${P}${s(l, 'eno', 'ene', 'è')}`
    case 'alquino': return L ? `${P}-${loc}-${s(l, 'ino', 'yne', 'í')}` : `${P}${s(l, 'ino', 'yne', 'í')}`
    case 'alcohol': return L ? `${P}an-${loc}-ol` : `${P}anol`
    case 'aldehido': return `${P}anal`
    case 'cetona': return L ? `${P}an-${loc}-${s(l, 'ona', 'one', 'ona')}` : `${P}an${s(l, 'ona', 'one', 'ona')}`
    case 'acido': return s(l, `ácido ${P}anoico`, `${P}anoic acid`, `àcid ${P}anoic`)
    default: return L ? `${P}an-${loc}-${s(l, 'amina', 'amine', 'amina')}` : `${P}an${s(l, 'amina', 'amine', 'amina')}`
  }
}

// Átomos: C, H, O, N.
export function atomos({ fam, n, rama }) {
  const C = n + (rama ? 1 : 0)
  const H = { alcano: 2 * C + 2, alqueno: 2 * n, alquino: 2 * n - 2, alcohol: 2 * n + 2, aldehido: 2 * n, cetona: 2 * n, acido: 2 * n, amina: 2 * n + 3 }[fam]
  const O = { alcohol: 1, aldehido: 1, cetona: 1, acido: 2 }[fam] ?? 0
  const N = fam === 'amina' ? 1 : 0
  return { C, H, O, N }
}
export const formulaClave = a => `C${a.C}H${a.H}O${a.O}N${a.N}`
export function verFormula(k) {
  const [, C, H, O, N] = k.match(/C(\d+)H(\d+)O(\d+)N(\d+)/).map(Number)
  const p = (el, x) => (x === 0 ? '' : x === 1 ? el : el + sub(x))
  return p('C', C) + p('H', H) + p('O', O) + p('N', N)
}

// Los carbonos de la cadena, numerados como manda el nombre (1 = el extremo
// del grupo). Cada uno: etiqueta (CH₃, CH₂, C…), lo que lleva arriba (OH,
// NH₂, =O) o abajo (CH₃ de la rama) y el enlace con el siguiente.
export function carbonos({ fam, n, loc, rama }) {
  const enl = Array(n).fill(1) // enl[i]: enlace entre el carbono i+1 y el i+2
  if (fam === 'alqueno') enl[loc - 1] = 2
  if (fam === 'alquino') enl[loc - 1] = 3
  const cs = []
  for (let i = 1; i <= n; i++) {
    const vecinos = (i > 1 ? enl[i - 2] : 0) + (i < n ? enl[i - 1] : 0)
    let arriba = null, abajo = null, ocupa = 0, etiqueta
    if ((fam === 'alcohol' || fam === 'amina') && i === loc) { arriba = fam === 'alcohol' ? 'OH' : 'NH₂'; ocupa = 1 }
    if (fam === 'cetona' && i === loc) { arriba = 'O'; ocupa = 2 }
    if (rama && i === rama) { abajo = 'CH₃'; ocupa = 1 }
    const h = 4 - vecinos - ocupa - ((fam === 'aldehido' || fam === 'acido') && i === 1 ? 3 : 0)
    if (fam === 'aldehido' && i === 1) etiqueta = n === 1 ? 'HCHO' : 'CHO'
    else if (fam === 'acido' && i === 1) etiqueta = n === 1 ? 'HCOOH' : 'COOH'
    else etiqueta = 'C' + (h === 0 ? '' : h === 1 ? 'H' : 'H' + sub(h))
    cs.push({ num: i, etiqueta, h, arriba, abajo, doble: arriba === 'O', enlace: i < n ? enl[i - 1] : 0 })
  }
  return cs
}

// Hidrógenos contados en el dibujo (el test los compara con atomos()).
export function hDelDibujo(m) {
  return carbonos(m).reduce((t, c) => {
    const extra = c.etiqueta === 'CHO' ? 1 : c.etiqueta === 'HCHO' ? 2 : c.etiqueta === 'COOH' ? 1 : c.etiqueta === 'HCOOH' ? 2 : c.h
    return t + extra + (c.arriba === 'OH' ? 1 : c.arriba === 'NH₂' ? 2 : 0) + (c.abajo ? 3 : 0)
  }, 0)
}

// El grupo de un extremo se escribe al final, como en los libros: CH₃–CH₂OH.
const alFinal = ({ fam, n, loc }) => n > 1 && (fam === 'aldehido' || fam === 'acido' || ((fam === 'alcohol' || fam === 'amina') && loc === 1))

export function condensada(m) {
  let cs = carbonos(m)
  if (alFinal(m)) cs = [...cs].reverse()
  const n = cs.length
  const B = { 1: '–', 2: '=', 3: '≡' }
  let out = ''
  cs.forEach((c, k) => {
    const extremo = k === 0 || k === n - 1
    let t = c.etiqueta
    if (c.arriba === 'O') t = c.etiqueta + 'O'
    else if (c.arriba) t = extremo ? t + c.arriba : `${t}(${c.arriba})`
    if (c.abajo) t = `${t}(${c.abajo})`
    out += t
    if (k < n - 1) {
      // el enlace entre c y el siguiente en el orden escrito
      const a = c.num, b = cs[k + 1].num
      out += B[cs.find(x => x.num === Math.min(a, b)).enlace]
    }
  })
  return out
}

// ── Niveles y rondas ──────────────────────────────────────────────────────
export const NIVELES = {
  facil:   { tipos: ['familia', 'familia', 'nombre', 'nombre', 'formula'] },
  medio:   { tipos: ['familia', 'nombre', 'nombre', 'formula', 'estructura'] },
  dificil: { tipos: ['nombre', 'nombre', 'estructura', 'isomero', 'formula'] },
}
const POOL = {
  facil: TODAS.filter(m => !conLoc(m)),
  medio: TODAS.filter(m => !m.rama),
  dificil: TODAS,
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}

const CONFUNDE = {
  alcano: ['alqueno', 'alquino', 'alcohol'], alqueno: ['alcano', 'alquino', 'alcohol'], alquino: ['alqueno', 'alcano', 'cetona'],
  alcohol: ['aldehido', 'acido', 'amina'], aldehido: ['cetona', 'acido', 'alcohol'], cetona: ['aldehido', 'alcohol', 'acido'],
  acido: ['aldehido', 'alcohol', 'cetona'], amina: ['alcohol', 'alcano', 'aldehido'],
}
const CAMBIA = {
  alcano: ['alqueno', 'alquino', 'alcohol'], alqueno: ['alcano', 'alquino'], alquino: ['alqueno', 'alcano'],
  alcohol: ['aldehido', 'cetona', 'acido'], aldehido: ['cetona', 'alcohol', 'acido'], cetona: ['aldehido', 'alcohol'],
  acido: ['aldehido', 'alcohol'], amina: ['alcohol', 'alcano'],
}
// La misma cadena con otra familia (el localizador que le toque).
function otraFamilia(m, fam) {
  const loc = fam === 'alcano' ? 0 : fam === 'aldehido' || fam === 'acido' ? 1 : fam === 'cetona' ? Math.max(2, m.loc) : Math.max(1, m.loc)
  return { fam, n: m.n, loc, rama: 0 }
}
// Moléculas parecidas (bien nombradas): otra posición, ±1 carbono, otra familia.
function vecinas(m) {
  const out = []
  for (const x of TODAS) if (x.fam === m.fam && x.n === m.n && clave(x) !== clave(m)) out.push(x)
  for (const d of [1, -1, 2]) out.push({ ...m, n: m.n + d })
  for (const f of CAMBIA[m.fam]) out.push(otraFamilia(m, f))
  if (m.rama) out.push({ fam: 'alcano', n: m.n + 1, loc: 0, rama: 0 }, { fam: 'alcano', n: m.n + 1, loc: 0, rama: m.rama })
  return out.filter(valida)
}
// El mismo nombre numerado desde el otro extremo (but-3-eno): nombre mal puesto.
function alReves(m) {
  if (!conLoc(m)) return null
  if (m.rama) return m.n + 1 - m.rama === m.rama ? null : { ...m, rama: m.n + 1 - m.rama }
  const otro = m.fam === 'alqueno' || m.fam === 'alquino' ? m.n - m.loc : m.n + 1 - m.loc
  return otro === m.loc ? null : { ...m, loc: otro }
}

let seq = 0

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    let pool = POOL[nivel] ?? POOL.facil
    // En difícil, sobre todo moléculas con localizador o rama.
    if (nivel === 'dificil' && rand() < 0.75) pool = pool.filter(conLoc)
    const m = elige(rand, pool)
    const espejo = rand() < 0.5 // dibujarla al revés: el 1 no siempre está a la izquierda
    const base = { id: ++seq, nivel, tipo, mol: clave(m), espejo }

    if (tipo === 'familia') {
      const ops = [m.fam, ...baraja(rand, CONFUNDE[m.fam])]
      return { ...base, bueno: m.fam, opciones: baraja(rand, ops) }
    }

    if (tipo === 'nombre') {
      const trampa = alReves(m)
      const resto = baraja(rand, vecinas(m))
      const cands = [...(trampa ? [trampa] : []), ...resto].map(clave)
      const ops = unicas([clave(m), ...cands], 4)
      if (!ops) continue
      return { ...base, bueno: clave(m), opciones: baraja(rand, ops) }
    }

    if (tipo === 'estructura') {
      const cands = baraja(rand, vecinas(m)).map(clave)
      const ops = unicas([clave(m), ...cands], 4, condensada)
      if (!ops) continue
      return { ...base, espejo: false, bueno: clave(m), opciones: baraja(rand, ops) }
    }

    if (tipo === 'formula') {
      const a = atomos(m)
      const k = formulaClave(a)
      const cands = [
        { ...a, H: a.H - 2 }, { ...a, H: a.H + 2 },
        a.O ? { ...a, O: 0 } : a.N ? { ...a, N: 0 } : { ...a, H: a.H + 4 },
        { ...a, C: a.C + 1 }, { ...a, O: a.O + 1 },
      ].filter(x => x.H > 0).map(formulaClave)
      const ops = unicas([k, ...cands], 4)
      if (!ops) continue
      return { ...base, bueno: k, opciones: baraja(rand, ops) }
    }

    // isomero
    const f = formulaClave(atomos(m))
    const isos = TODAS.filter(x => clave(x) !== clave(m) && formulaClave(atomos(x)) === f)
    if (!isos.length) continue
    const bueno = clave(elige(rand, isos))
    const otras = baraja(rand, [...vecinas(m), ...TODAS.filter(x => atomos(x).C === atomos(m).C)])
      .filter(x => formulaClave(atomos(x)) !== f).map(clave)
    const ops = unicas([bueno, ...otras], 4)
    if (!ops) continue
    return { ...base, bueno, opciones: baraja(rand, ops) }
  }
}

// Primeras `k` claves distintas (y con textos distintos en los tres idiomas).
function unicas(claves, k, texto) {
  const out = [], vistos = new Set()
  for (const c of claves) {
    const t = texto ? texto(deClave(c)) : null
    const ts = texto ? [t] : c.includes('|') ? ['es', 'en', 'ca'].map(l => nombre(deClave(c), l)) : [c]
    if (out.includes(c) || ts.some(x => vistos.has(x))) continue
    out.push(c); ts.forEach(x => vistos.add(x))
    if (out.length === k) return out
  }
  return null
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
export const esCorrecta = (r, o) => o === r.bueno
export const molecula = r => deClave(r.mol)

// ── Textos ────────────────────────────────────────────────────────────────
export function textoOpcion(o, r, l) {
  switch (r.tipo) {
    case 'familia': return FAMILIA[o][l] ?? FAMILIA[o].es
    case 'formula': return verFormula(o)
    case 'estructura': return condensada(deClave(o))
    default: return nombre(deClave(o), l)
  }
}

export function enunciado(r, l) {
  switch (r.tipo) {
    case 'familia': return s(l, '¿A qué familia pertenece esta molécula?', 'Which family does this molecule belong to?', 'A quina família pertany aquesta molècula?')
    case 'nombre': return s(l, '¿Cómo se llama esta molécula?', 'What is this molecule called?', 'Com es diu aquesta molècula?')
    case 'formula': return s(l, '¿Cuál es su fórmula molecular?', 'What is its molecular formula?', 'Quina és la seva fórmula molecular?')
    case 'estructura': return s(l, `¿Cuál es la fórmula semidesarrollada de: ${nombre(molecula(r), l)}?`, `What is the condensed structural formula of: ${nombre(molecula(r), l)}?`, `Quina és la fórmula semidesenvolupada de: ${nombre(molecula(r), l)}?`)
    default: return s(l, '¿Cuál de estas es un isómero de la molécula del dibujo?', 'Which of these is an isomer of the molecule in the drawing?', 'Quina d’aquestes és un isòmer de la molècula del dibuix?')
  }
}

function porQueNombre(m, l) {
  const i = ix(l)
  const P = PREF[l][m.n - 1]
  const cadena = s(l, `La cadena tiene ${m.n} carbono${m.n > 1 ? 's' : ''}: prefijo ${P}-.`, `The chain has ${m.n} carbon${m.n > 1 ? 's' : ''}: prefix ${P}-.`, `La cadena té ${m.n} carboni${m.n > 1 ? 's' : ''}: prefix ${P}-.`)
  if (m.rama) {
    return s(l,
      `La cadena más larga tiene ${m.n} carbonos (${P}ano) y de ella cuelga un metilo, –CH₃. Se numera desde el extremo más cercano a la rama: queda en el carbono ${m.rama}, así que es ${nombre(m, l)}. Numerada al revés saldría ${m.n + 1 - m.rama}, que no vale.`,
      `The longest chain has ${m.n} carbons (${P}ane) and a methyl, –CH₃, hangs from it. Number from the end nearest the branch: it is on carbon ${m.rama}, so it is ${nombre(m, l)}. Numbered the other way it would be ${m.n + 1 - m.rama}, which is wrong.`,
      `La cadena més llarga té ${m.n} carbonis (${P}à) i en penja un metil, –CH₃. Es numera des de l’extrem més proper a la branca: queda al carboni ${m.rama}, així que és ${nombre(m, l)}. Numerada al revés sortiria ${m.n + 1 - m.rama}, que no val.`)
  }
  const rasgo = s(l, `Tiene ${RASGO[m.fam][i]}: terminación ${TERM[m.fam][i]}.`, `It has ${RASGO[m.fam][i]}: ending ${TERM[m.fam][i]}.`, `Té ${RASGO[m.fam][i]}: terminació ${TERM[m.fam][i]}.`)
  const loc = conLoc(m)
    ? ' ' + s(l, `Se numera desde el extremo más cercano ${LUGAR[m.fam][i]}: queda en el carbono ${m.loc}.`, `Number from the end nearest ${LUGAR[m.fam][i]}: it is on carbon ${m.loc}.`, `Es numera des de l’extrem més proper ${LUGAR[m.fam][i]}: queda al carboni ${m.loc}.`)
    : ''
  return `${cadena} ${rasgo}${loc}`
}

export function explicacion(r, l) {
  const m = molecula(r)
  const i = ix(l)
  switch (r.tipo) {
    case 'familia':
      return s(l, `Tiene ${RASGO[m.fam][i]}: es ${UN[m.fam][i]}, y su nombre acaba en ${TERM[m.fam][i]} (${nombre(m, l)}).`, `It has ${RASGO[m.fam][i]}: it is ${UN[m.fam][i]}, and its name ends in ${TERM[m.fam][i]} (${nombre(m, l)}).`, `Té ${RASGO[m.fam][i]}: és ${UN[m.fam][i]}, i el seu nom acaba en ${TERM[m.fam][i]} (${nombre(m, l)}).`)
    case 'nombre': return `${porQueNombre(m, l)} → ${nombre(m, l)}.`
    case 'estructura': return `${porQueNombre(m, l)} → ${condensada(m)}.`
    case 'formula': {
      const a = atomos(m)
      const regla = { alcano: 'CₙH₂ₙ₊₂', alqueno: 'CₙH₂ₙ', alquino: 'CₙH₂ₙ₋₂' }[m.fam]
      const extra = regla
        ? s(l, ` Es la fórmula general de su familia, ${regla}: cada enlace doble quita 2 hidrógenos y el triple, 4.`, ` That is the general formula of its family, ${regla}: each double bond removes 2 hydrogens and a triple bond, 4.`, ` És la fórmula general de la seva família, ${regla}: cada enllaç doble treu 2 hidrògens i el triple, 4.`)
        : s(l, ' No hay que olvidar los hidrógenos del grupo funcional ni sus átomos de O o N.', ' Do not forget the hydrogens in the functional group, or its O or N atoms.', ' No s’han d’oblidar els hidrògens del grup funcional ni els seus àtoms d’O o N.')
      return s(l,
        `${a.C} carbono${a.C > 1 ? 's' : ''} y, contando los hidrógenos de cada uno (cada carbono forma 4 enlaces), ${a.H} hidrógenos: ${verFormula(r.bueno)}.${extra}`,
        `${a.C} carbon${a.C > 1 ? 's' : ''} and, counting the hydrogens on each one (every carbon forms 4 bonds), ${a.H} hydrogens: ${verFormula(r.bueno)}.${extra}`,
        `${a.C} carboni${a.C > 1 ? 's' : ''} i, comptant els hidrògens de cadascun (cada carboni forma 4 enllaços), ${a.H} hidrògens: ${verFormula(r.bueno)}.${extra}`)
    }
    default: {
      const b = deClave(r.bueno)
      const F = verFormula(formulaClave(atomos(m)))
      const clase = b.fam !== m.fam ? s(l, 'de función', 'functional isomers', 'de funció') : b.rama !== m.rama || b.n !== m.n ? s(l, 'de cadena', 'chain isomers', 'de cadena') : s(l, 'de posición', 'position isomers', 'de posició')
      return s(l,
        `${nombre(m, l)} y ${nombre(b, l)} tienen la misma fórmula molecular, ${F}, pero los átomos están unidos de otra forma: son isómeros ${clase}. Las otras opciones se parecen, pero tienen otra fórmula.`,
        `${nombre(m, l)} and ${nombre(b, l)} have the same molecular formula, ${F}, but the atoms are joined differently: they are ${clase}. The other options look similar but have a different formula.`,
        `${nombre(m, l)} i ${nombre(b, l)} tenen la mateixa fórmula molecular, ${F}, però els àtoms estan units d’una altra manera: són isòmers ${clase}. Les altres opcions s’hi assemblen, però tenen una altra fórmula.`)
    }
  }
}

export function schemaQuestion(r, l) {
  const m = molecula(r)
  const dibujo = r.tipo === 'estructura' ? '' : `${condensada(m)}. `
  return {
    question: `${dibujo}${enunciado(r, l)}`,
    correctAnswer: textoOpcion(r.bueno, r, l),
    wrongAnswers: r.opciones.filter(o => o !== r.bueno).map(o => textoOpcion(o, r, l)),
  }
}
