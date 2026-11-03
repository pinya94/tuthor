// Tabla de Verdad: lógica proposicional de Filosofía (1.º de Bachillerato).
//
// Todo se calcula: las fórmulas son árboles y su tabla, su clase (tautología,
// contradicción, contingencia) y la validez de un argumento salen de evaluar
// todas las filas, así que nada depende de una respuesta escrita a mano.
//
// Mecánicas (nada de elegir entre cuatro):
//   tabla      rellenar la columna de la fórmula tocando V/F en cada fila
//   formaliza  montar la fórmula de una frase con fichas (p, q, ¬, ∧, ∨, →, ↔,
//              paréntesis); vale cualquier fórmula EQUIVALENTE, como en un libro
//              que acepte ¬q → ¬p por «si p, q»
//   clasifica  fórmulas a sus cajas: tautología, contradicción, contingencia
//   argumento  argumentos a «válido / no válido» o, en difícil, a su regla
//              (modus ponens, tollens… y las dos falacias formales)

export const tx = (o, l) => o[l] ?? o.es
const s = (l, es, en, ca) => ({ es, en, ca })[l] ?? es
const cap = t => t.charAt(0).toUpperCase() + t.slice(1)

// ── Fórmulas ──────────────────────────────────────────────────────────────
export const at = v => ({ op: 'var', v })
export const no = a => ({ op: 'not', a })
const bin = op => (a, b) => ({ op, a, b })
export const y = bin('and'), o = bin('or'), si = bin('imp'), sii = bin('iff')
const p = at('p'), q = at('q'), r = at('r')

export const SIMBOLO = { not: '¬', and: '∧', or: '∨', imp: '→', iff: '↔' }
const esBin = f => f.op in { and: 1, or: 1, imp: 1, iff: 1 }

export function texto(f) {
  if (f.op === 'var') return f.v
  if (f.op === 'not') return '¬' + (esBin(f.a) ? `(${texto(f.a)})` : texto(f.a))
  const par = x => (esBin(x) ? `(${texto(x)})` : texto(x))
  return `${par(f.a)} ${SIMBOLO[f.op]} ${par(f.b)}`
}

export function evalua(f, v) {
  switch (f.op) {
    case 'var': return v[f.v]
    case 'not': return !evalua(f.a, v)
    case 'and': return evalua(f.a, v) && evalua(f.b, v)
    case 'or': return evalua(f.a, v) || evalua(f.b, v)
    case 'imp': return !evalua(f.a, v) || evalua(f.b, v)
    default: return evalua(f.a, v) === evalua(f.b, v)
  }
}

export function variables(...fs) {
  const vs = new Set()
  const mira = f => { if (f.op === 'var') vs.add(f.v); else { mira(f.a); if (f.b) mira(f.b) } }
  fs.forEach(mira)
  return [...vs].sort()
}

// Orden de los libros: la primera variable cambia más despacio y empieza en V.
export function filas(vars) {
  const n = vars.length
  return Array.from({ length: 2 ** n }, (_, i) => Object.fromEntries(vars.map((v, k) => [v, !((i >> (n - 1 - k)) & 1)])))
}
export const columna = (f, vars = variables(f)) => filas(vars).map(fila => evalua(f, fila))

export function clase(f) {
  const c = columna(f)
  return c.every(Boolean) ? 'tautologia' : c.some(Boolean) ? 'contingencia' : 'contradiccion'
}
export function equivalentes(f, g) {
  const vars = variables(f, g)
  return filas(vars).every(fila => evalua(f, fila) === evalua(g, fila))
}
// Válido: en ninguna fila las premisas son verdaderas y la conclusión falsa.
export function esValido(premisas, conclusion) {
  const vars = variables(...premisas, conclusion)
  return filas(vars).every(fila => !premisas.every(x => evalua(x, fila)) || evalua(conclusion, fila))
}

// Fichas → fórmula. Precedencia de los libros: ¬, ∧, ∨, →, ↔ (→ asocia a la derecha).
export function lee(fichas) {
  let i = 0
  const mira = () => fichas[i]
  const toma = t => (fichas[i] === t ? (i++, true) : false)
  function atomo() {
    if (toma('(')) { const f = bicond(); return f && toma(')') ? f : null }
    const t = mira()
    if (t === 'p' || t === 'q' || t === 'r') { i++; return at(t) }
    return null
  }
  function unario() { if (toma('¬')) { const a = unario(); return a && no(a) } return atomo() }
  function cadena(sig, simb, mk) {
    let f = sig()
    while (f && toma(simb)) { const b = sig(); f = b && mk(f, b) }
    return f
  }
  const conj = () => cadena(unario, '∧', y)
  const disy = () => cadena(conj, '∨', o)
  function cond() { const a = disy(); if (a && toma('→')) { const b = cond(); return b && si(a, b) } return a }
  const bicond = () => cadena(cond, '↔', sii)
  const f = bicond()
  return f && i === fichas.length ? f : null
}

// ── Frases para formalizar ────────────────────────────────────────────────
export const ATOMOS = [
  { si: { es: 'llueve', en: 'it rains', ca: 'plou' }, no: { es: 'no llueve', en: 'it does not rain', ca: 'no plou' } },
  { si: { es: 'estudio', en: 'I study', ca: 'estudio' }, no: { es: 'no estudio', en: 'I do not study', ca: 'no estudio' } },
  { si: { es: 'apruebo el examen', en: 'I pass the exam', ca: 'aprovo l’examen' }, no: { es: 'no apruebo el examen', en: 'I do not pass the exam', ca: 'no aprovo l’examen' } },
  { si: { es: 'la tienda está abierta', en: 'the shop is open', ca: 'la botiga és oberta' }, no: { es: 'la tienda no está abierta', en: 'the shop is not open', ca: 'la botiga no és oberta' } },
  { si: { es: 'hace frío', en: 'it is cold', ca: 'fa fred' }, no: { es: 'no hace frío', en: 'it is not cold', ca: 'no fa fred' } },
  { si: { es: 'Ana juega', en: 'Ana plays', ca: 'l’Ana juga' }, no: { es: 'Ana no juega', en: 'Ana does not play', ca: 'l’Ana no juga' } },
  { si: { es: 'el tren llega tarde', en: 'the train is late', ca: 'el tren arriba tard' }, no: { es: 'el tren no llega tarde', en: 'the train is not late', ca: 'el tren no arriba tard' } },
  { si: { es: 'me mojo', en: 'I get wet', ca: 'em mullo' }, no: { es: 'no me mojo', en: 'I do not get wet', ca: 'no em mullo' } },
]

// a y b son los átomos de p y q; cada plantilla da la frase y su fórmula.
const FRASES = {
  y: { nivel: 1, f: y(p, q), t: (a, b) => ({ es: `${cap(a.si.es)} y ${b.si.es}`, en: `${cap(a.si.en)} and ${b.si.en}`, ca: `${cap(a.si.ca)} i ${b.si.ca}` }) },
  o: { nivel: 1, f: o(p, q), t: (a, b) => ({ es: `${cap(a.si.es)} o ${b.si.es}`, en: `${cap(a.si.en)} or ${b.si.en}`, ca: `${cap(a.si.ca)} o ${b.si.ca}` }) },
  si: { nivel: 1, f: si(p, q), t: (a, b) => ({ es: `Si ${a.si.es}, ${b.si.es}`, en: `If ${a.si.en}, ${b.si.en}`, ca: `Si ${a.si.ca}, ${b.si.ca}` }) },
  no: { nivel: 1, f: no(p), t: a => ({ es: cap(a.no.es), en: cap(a.no.en), ca: cap(a.no.ca) }) },
  noY: { nivel: 1, f: y(no(p), q), t: (a, b) => ({ es: `${cap(a.no.es)} y ${b.si.es}`, en: `${cap(a.no.en)} and ${b.si.en}`, ca: `${cap(a.no.ca)} i ${b.si.ca}` }) },
  pero: { nivel: 2, f: y(p, q), t: (a, b) => ({ es: `${cap(a.si.es)}, pero ${b.si.es}`, en: `${cap(a.si.en)}, but ${b.si.en}`, ca: `${cap(a.si.ca)}, però ${b.si.ca}` }) },
  ni: { nivel: 2, f: y(no(p), no(q)), t: (a, b) => ({ es: `Ni ${a.si.es} ni ${b.si.es}`, en: `${cap(a.no.en)} and ${b.no.en}`, ca: `Ni ${a.si.ca} ni ${b.si.ca}` }) },
  siNo: { nivel: 2, f: si(no(p), q), t: (a, b) => ({ es: `Si ${a.no.es}, ${b.si.es}`, en: `If ${a.no.en}, ${b.si.en}`, ca: `Si ${a.no.ca}, ${b.si.ca}` }) },
  siEntoncesNo: { nivel: 2, f: si(p, no(q)), t: (a, b) => ({ es: `Si ${a.si.es}, ${b.no.es}`, en: `If ${a.si.en}, ${b.no.en}`, ca: `Si ${a.si.ca}, ${b.no.ca}` }) },
  sii: { nivel: 2, f: sii(p, q), t: (a, b) => ({ es: `${cap(a.si.es)} si y solo si ${b.si.es}`, en: `${cap(a.si.en)} if and only if ${b.si.en}`, ca: `${cap(a.si.ca)} si i només si ${b.si.ca}` }) },
  // Las dos trampas de orden: «p si q» es q → p; «p solo si q» es p → q.
  siDetras: { nivel: 3, f: si(q, p), t: (a, b) => ({ es: `${cap(a.si.es)} si ${b.si.es}`, en: `${cap(a.si.en)} if ${b.si.en}`, ca: `${cap(a.si.ca)} si ${b.si.ca}` }) },
  soloSi: { nivel: 3, f: si(p, q), t: (a, b) => ({ es: `${cap(a.si.es)} solo si ${b.si.es}`, en: `${cap(a.si.en)} only if ${b.si.en}`, ca: `${cap(a.si.ca)} només si ${b.si.ca}` }) },
  oNoY: { nivel: 3, f: o(p, y(no(p), q)), t: (a, b) => ({ es: `${cap(a.si.es)}, o bien ${a.no.es} y ${b.si.es}`, en: `${cap(a.si.en)}, or else ${a.no.en} and ${b.si.en}`, ca: `${cap(a.si.ca)}, o bé ${a.no.ca} i ${b.si.ca}` }) },
}
export const FRASES_IDS = Object.keys(FRASES)
export const fraseDe = r => FRASES[r.plantilla]
export const textoFrase = (r, l) => tx(FRASES[r.plantilla].t(ATOMOS[r.atomos[0]], ATOMOS[r.atomos[1]]), l)
export const leyenda = (r, l) => [['p', ATOMOS[r.atomos[0]]], ['q', ATOMOS[r.atomos[1]]]].map(([v, a]) => `${v} = ${tx(a.si, l)}`)

// ── Clases y argumentos ───────────────────────────────────────────────────
export const CLASES = {
  tautologia: { es: 'Tautología', en: 'Tautology', ca: 'Tautologia' },
  contradiccion: { es: 'Contradicción', en: 'Contradiction', ca: 'Contradicció' },
  contingencia: { es: 'Contingencia', en: 'Contingency', ca: 'Contingència' },
}
export const TAUTOLOGIAS = [o(p, no(p)), si(y(p, q), p), si(p, o(p, q)), si(y(si(p, q), p), q), no(y(p, no(p))), sii(si(p, q), si(no(q), no(p))), si(p, p), si(y(p, q), o(p, q)), o(si(p, q), si(q, p))]
export const CONTRADICCIONES = [y(p, no(p)), no(o(p, no(p))), y(si(p, q), y(p, no(q))), y(sii(p, q), sii(p, no(q))), no(si(p, p)), y(o(p, q), y(no(p), no(q)))]

export const REGLAS = {
  mp: { valido: true, nombre: { es: 'Modus ponens', en: 'Modus ponens', ca: 'Modus ponens' }, premisas: [si(p, q), p], conclusion: q },
  mt: { valido: true, nombre: { es: 'Modus tollens', en: 'Modus tollens', ca: 'Modus tollens' }, premisas: [si(p, q), no(q)], conclusion: no(p) },
  sd: { valido: true, nombre: { es: 'Silogismo disyuntivo', en: 'Disjunctive syllogism', ca: 'Sil·logisme disjuntiu' }, premisas: [o(p, q), no(p)], conclusion: q },
  sh: { valido: true, nombre: { es: 'Silogismo hipotético', en: 'Hypothetical syllogism', ca: 'Sil·logisme hipotètic' }, premisas: [si(p, q), si(q, r)], conclusion: si(p, r) },
  ac: { valido: false, nombre: { es: 'Falacia: afirmar el consecuente', en: 'Fallacy: affirming the consequent', ca: 'Fal·làcia: afirmar el conseqüent' }, premisas: [si(p, q), q], conclusion: p },
  na: { valido: false, nombre: { es: 'Falacia: negar el antecedente', en: 'Fallacy: denying the antecedent', ca: 'Fal·làcia: negar l’antecedent' }, premisas: [si(p, q), no(p)], conclusion: no(q) },
}
export const VALIDEZ = {
  valido: { es: 'Válido', en: 'Valid', ca: 'Vàlid' },
  invalido: { es: 'No válido', en: 'Invalid', ca: 'No vàlid' },
}

// Un argumento en palabras: cada variable, a su átomo (afirmado o negado).
function enPalabras(f, atomos, l) {
  const lit = x => (x.op === 'var' ? tx(atomos[x.v].si, l) : tx(atomos[x.a.v].no, l))
  if (f.op === 'var' || f.op === 'not') return cap(lit(f))
  if (f.op === 'imp') return s(l, `Si ${lit(f.a)}, ${lit(f.b)}`, `If ${lit(f.a)}, ${lit(f.b)}`, `Si ${lit(f.a)}, ${lit(f.b)}`)
  return cap(`${lit(f.a)} ${s(l, 'o', 'or', 'o')} ${lit(f.b)}`)
}
export function lineasArgumento(arg, l) {
  const regla = REGLAS[arg.regla]
  if (!arg.atomos) return { premisas: regla.premisas.map(texto), conclusion: texto(regla.conclusion) }
  const atomos = { p: ATOMOS[arg.atomos[0]], q: ATOMOS[arg.atomos[1]], r: ATOMOS[arg.atomos[2]] }
  return { premisas: regla.premisas.map(f => enPalabras(f, atomos, l) + '.'), conclusion: enPalabras(regla.conclusion, atomos, l) + '.' }
}

// ── Rondas ────────────────────────────────────────────────────────────────
export const NIVELES = {
  facil:   { tipos: ['tabla', 'tabla', 'formaliza', 'argumento'], frase: 1 },
  medio:   { tipos: ['tabla', 'formaliza', 'clasifica', 'argumento'], frase: 2 },
  dificil: { tipos: ['tabla', 'formaliza', 'clasifica', 'argumento'], frase: 3 },
}
const OPS = [y, o, si, sii]

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
let seq = 0

export function genFormula(nivel, rand = Math.random) {
  const lit = v => (rand() < 0.25 ? no(at(v)) : at(v))
  if (nivel === 'facil') return elige(rand, OPS)(lit('p'), lit('q'))
  if (nivel === 'medio') {
    if (rand() < 0.3) return no(elige(rand, OPS)(at('p'), at('q')))
    const dentro = elige(rand, OPS)(lit('p'), lit('q'))
    const fuera = lit(elige(rand, ['p', 'q']))
    return rand() < 0.5 ? elige(rand, OPS)(dentro, fuera) : elige(rand, OPS)(fuera, dentro)
  }
  const [a, b, c] = baraja(rand, ['p', 'q', 'r'])
  const dentro = elige(rand, OPS)(lit(a), lit(b))
  return rand() < 0.5 ? elige(rand, OPS)(dentro, lit(c)) : elige(rand, OPS)(lit(c), dentro)
}

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const tipo = elige(rand, cfg.tipos)
  const base = { id: ++seq, nivel, tipo }

  if (tipo === 'tabla') {
    const f = genFormula(nivel, rand)
    return { ...base, formula: f, bueno: 'tabla:0' }
  }

  if (tipo === 'formaliza') {
    const plantilla = elige(rand, FRASES_IDS.filter(id => FRASES[id].nivel <= cfg.frase && (cfg.frase === 1 || FRASES[id].nivel >= cfg.frase - 1)))
    const atomos = baraja(rand, ATOMOS.map((_, i) => i)).slice(0, 2)
    return { ...base, plantilla, atomos, bueno: 'formaliza:ok' }
  }

  if (tipo === 'clasifica') {
    let contingente
    do contingente = genFormula(nivel === 'dificil' ? 'medio' : nivel, rand)
    while (clase(contingente) !== 'contingencia')
    const formulas = baraja(rand, [elige(rand, TAUTOLOGIAS), elige(rand, CONTRADICCIONES), contingente, rand() < 0.5 ? elige(rand, TAUTOLOGIAS) : genFormula('medio', rand)])
      .filter((f, i, a) => a.findIndex(g => texto(g) === texto(f)) === i).slice(0, 3)
    return { ...base, formulas, bueno: 'clasifica:0' }
  }

  // argumento: siempre alguno válido y alguno no; en difícil, cuatro reglas distintas
  const ids = Object.keys(REGLAS)
  let reglas
  do reglas = baraja(rand, ids).slice(0, nivel === 'dificil' ? 4 : 3)
  while (!reglas.some(id => REGLAS[id].valido) || reglas.every(id => REGLAS[id].valido))
  const args = reglas.map(regla => ({ regla, ...(nivel === 'medio' ? { atomos: baraja(rand, ATOMOS.map((_, i) => i)).slice(0, 3) } : {}) }))
  return { ...base, args, cajas: nivel === 'dificil' ? 'reglas' : 'validez', bueno: 'argumento:0' }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
// Respuestas: «tabla:fallos», «formaliza:ok|mal», «clasifica:fallos», «argumento:fallos».
export const esCorrecta = (r, x) => x === r.bueno
export const cajaArgumento = (r, a) => (r.cajas === 'reglas' ? a.regla : REGLAS[a.regla].valido ? 'valido' : 'invalido')
export const VF = l => (l === 'en' ? ['T', 'F'] : ['V', 'F'])

// ── Textos ────────────────────────────────────────────────────────────────
export function enunciado(r, l) {
  if (r.tipo === 'tabla') return s(l, 'Completa la tabla de verdad', 'Complete the truth table', 'Completa la taula de veritat')
  if (r.tipo === 'formaliza') return s(l, 'Formaliza la frase', 'Formalise the sentence', 'Formalitza la frase')
  if (r.tipo === 'clasifica') return s(l, '¿Tautología, contradicción o contingencia?', 'Tautology, contradiction or contingency?', 'Tautologia, contradicció o contingència?')
  return r.cajas === 'reglas'
    ? s(l, '¿Qué regla (o qué falacia) es cada argumento?', 'Which rule (or fallacy) is each argument?', 'Quina regla (o quina fal·làcia) és cada argument?')
    : s(l, '¿Es válido cada argumento?', 'Is each argument valid?', 'És vàlid cada argument?')
}

const NOTA_IMP = {
  es: 'Un condicional solo es falso cuando el antecedente es verdadero y el consecuente falso.',
  en: 'A conditional is only false when the antecedent is true and the consequent false.',
  ca: 'Un condicional només és fals quan l’antecedent és vertader i el conseqüent fals.',
}
export function explicacion(r, l) {
  const [V, F] = VF(l)
  if (r.tipo === 'tabla') {
    const col = columna(r.formula, variables(r.formula)).map(b => (b ? V : F)).join(' ')
    return `${texto(r.formula)}: ${col}.` + (JSON.stringify(r.formula).includes('"imp"') ? ' ' + tx(NOTA_IMP, l) : '')
  }
  if (r.tipo === 'formaliza') {
    const pl = r.plantilla
    let t = `«${textoFrase(r, l)}» = ${texto(fraseDe(r).f)}.`
    if (pl === 'pero') t += ' ' + s(l, '«Pero» une igual que «y»: es una conjunción.', '“But” joins like “and”: it is a conjunction.', '«Però» uneix igual que «i»: és una conjunció.')
    if (pl === 'ni') t += ' ' + s(l, '«Ni… ni…» niega las dos cosas a la vez.', 'Both are denied at once.', '«Ni… ni…» nega les dues coses alhora.')
    if (pl === 'siDetras') t += ' ' + s(l, 'Lo que va detrás del «si» es el antecedente, aunque esté al final.', 'What follows “if” is the antecedent, even at the end.', 'El que va darrere del «si» és l’antecedent, encara que sigui al final.')
    if (pl === 'soloSi') t += ' ' + s(l, '«Solo si» introduce el consecuente: la condición necesaria.', '“Only if” introduces the consequent: the necessary condition.', '«Només si» introdueix el conseqüent: la condició necessària.')
    return t
  }
  if (r.tipo === 'clasifica') return r.formulas.map(f => `${texto(f)}: ${tx(CLASES[clase(f)], l).toLowerCase()}`).join(' · ') + '. ' + s(l, 'Tautología: siempre V; contradicción: siempre F; contingencia: unas filas V y otras F.', `Tautology: always ${V}; contradiction: always F; contingency: some rows ${V}, some F.`, 'Tautologia: sempre V; contradicció: sempre F; contingència: unes files V i altres F.')
  return r.args.map(a => {
    const g = REGLAS[a.regla]
    return `${tx(g.nombre, l)}: ${g.premisas.map(texto).join(', ')} ⊢ ${texto(g.conclusion)} (${tx(VALIDEZ[g.valido ? 'valido' : 'invalido'], l).toLowerCase()})`
  }).join(' · ') + '.'
}

// Para los buscadores y el examen en texto.
export function schemaQuestion(r, l) {
  const [V, F] = VF(l)
  if (r.tipo === 'tabla') {
    const col = c => c.map(b => (b ? V : F)).join(' ')
    const c = columna(r.formula)
    const buena = col(c)
    // Las falsas: la misma columna con una fila cambiada (el error típico)
    const malas = [0, c.length - 1, Math.floor(c.length / 2)].map(k => col(c.map((b, i) => (i === k ? !b : b))))
    return { question: s(l, `¿Cuál es la columna de la tabla de verdad de ${texto(r.formula)}?`, `What is the truth-table column of ${texto(r.formula)}?`, `Quina és la columna de la taula de veritat de ${texto(r.formula)}?`), correctAnswer: buena, wrongAnswers: malas }
  }
  if (r.tipo === 'formaliza') {
    const f = fraseDe(r).f
    const malas = [y(p, q), o(p, q), si(p, q), si(q, p), sii(p, q), y(no(p), no(q))].filter(g => !equivalentes(g, f)).map(texto).slice(0, 3)
    return { question: s(l, `¿Cómo se formaliza «${textoFrase(r, l)}» (${leyenda(r, l).join(', ')})?`, `How is “${textoFrase(r, l)}” formalised (${leyenda(r, l).join(', ')})?`, `Com es formalitza «${textoFrase(r, l)}» (${leyenda(r, l).join(', ')})?`), correctAnswer: texto(f), wrongAnswers: malas }
  }
  if (r.tipo === 'clasifica') {
    const f = r.formulas[0]
    const c = clase(f)
    return { question: s(l, `¿Qué es ${texto(f)}?`, `What is ${texto(f)}?`, `Què és ${texto(f)}?`), correctAnswer: tx(CLASES[c], l), wrongAnswers: Object.keys(CLASES).filter(x => x !== c).map(x => tx(CLASES[x], l)) }
  }
  const a = r.args[0]
  const g = REGLAS[a.regla]
  return { question: s(l, `¿Qué es el argumento ${g.premisas.map(texto).join(', ')} ⊢ ${texto(g.conclusion)}?`, `What is the argument ${g.premisas.map(texto).join(', ')} ⊢ ${texto(g.conclusion)}?`, `Què és l’argument ${g.premisas.map(texto).join(', ')} ⊢ ${texto(g.conclusion)}?`), correctAnswer: tx(g.nombre, l), wrongAnswers: Object.keys(REGLAS).filter(x => x !== a.regla).slice(0, 3).map(x => tx(REGLAS[x].nombre, l)) }
}
