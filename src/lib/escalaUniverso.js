// Escala del Universo (matemáticas · potencias y notación científica, ESO).
//
// Una regla de potencias de 10, del átomo (10⁻¹⁰ m) a la Vía Láctea
// (10²¹ m), con tamaños reales.
//
// Tipos de pregunta (y la trampa que cada uno pone a prueba):
//   escribir     un número → notación científica   («12,7·10⁶»: vale lo mismo, pero no es notación científica)
//   leer         notación científica → número       (correr la coma un sitio de más o de menos)
//   comparar     qué es mayor / cuántas veces        (fijarse en la mantisa y no en el exponente)
//   propiedad    producto, cociente, potencia de potencia (sumar donde hay que multiplicar…)
//   valor        a⁰, a⁻ⁿ, potencias de base negativa (a⁰ = 0; a⁻ⁿ negativo)
//   operar       multiplicar y dividir en notación científica (no normalizar la mantisa)
//
// Los números en notación científica se guardan como clave «mantisa e exponente»
// («1.27e7»), con la mantisa en texto para no arrastrar decimales flotantes.

const T = (es, en, ca) => ({ es, en, ca })
const tx = (o, l) => o[l] ?? o.es
const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
const decSep = l => (l === 'en' ? '.' : ',')

export const NIVELES = {
  facil:   { mecanicas: ['regla', 'regla', 'coma', 'exponente'], tol: 1, operar: false, pequenos: false, props: ['producto', 'cociente'] },
  medio:   { mecanicas: ['regla', 'coma', 'coma', 'exponente', 'valor'], tol: 0, operar: false, pequenos: true, props: ['producto', 'cociente', 'potencia'] },
  dificil: { mecanicas: ['regla', 'coma', 'exponente', 'exponente', 'valor'], tol: 0, operar: true, pequenos: true, props: ['producto', 'cociente', 'potencia', 'mixta'] },
}

// Tamaños reales en metros (aproximados al valor de los libros).
export const OBJETOS = {
  atomo: { m: '1', e: -10, emoji: '⚛️', n: T('un átomo de hidrógeno', 'a hydrogen atom', 'un àtom d’hidrogen') },
  virus: { m: '1', e: -7, emoji: '🦠', n: T('un virus de la gripe', 'a flu virus', 'un virus de la grip') },
  bacteria: { m: '2', e: -6, emoji: '🧫', n: T('una bacteria', 'a bacterium', 'un bacteri') },
  globulo: { m: '8', e: -6, emoji: '🔴', n: T('un glóbulo rojo', 'a red blood cell', 'un glòbul vermell') },
  pelo: { m: '7', e: -5, emoji: '💇', n: T('el grosor de un pelo', 'the width of a hair', 'el gruix d’un cabell') },
  arena: { m: '5', e: -4, emoji: '🏖️', n: T('un grano de arena', 'a grain of sand', 'un gra de sorra') },
  hormiga: { m: '5', e: -3, emoji: '🐜', n: T('una hormiga', 'an ant', 'una formiga') },
  everest: { m: '8.85', e: 3, emoji: '🏔️', n: T('la altura del Everest', 'the height of Everest', 'l’alçada de l’Everest') },
  tierra: { m: '1.27', e: 7, emoji: '🌍', n: T('el diámetro de la Tierra', 'the diameter of the Earth', 'el diàmetre de la Terra') },
  luna: { m: '3.84', e: 8, emoji: '🌙', n: T('la distancia de la Tierra a la Luna', 'the distance from the Earth to the Moon', 'la distància de la Terra a la Lluna') },
  sol: { m: '1.39', e: 9, emoji: '☀️', n: T('el diámetro del Sol', 'the diameter of the Sun', 'el diàmetre del Sol') },
  ua: { m: '1.5', e: 11, emoji: '🌅', n: T('la distancia de la Tierra al Sol', 'the distance from the Earth to the Sun', 'la distància de la Terra al Sol') },
  anoLuz: { m: '9.46', e: 15, emoji: '✨', n: T('un año luz', 'one light year', 'un any llum') },
  galaxia: { m: '1', e: 21, emoji: '🌌', n: T('el diámetro de la Vía Láctea', 'the diameter of the Milky Way', 'el diàmetre de la Via Làctia') },
}
export const REGLA = { min: -10, max: 21 }

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const entre = (rand, a, b) => a + Math.floor(rand() * (b - a + 1))
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
function opciones(rand, bueno, candidatos) {
  const vistos = new Set([bueno])
  const out = []
  for (const c of candidatos) {
    if (c == null || vistos.has(c)) continue
    vistos.add(c); out.push(c)
    if (out.length === 3) break
  }
  return out.length === 3 ? baraja(rand, [bueno, ...out]) : null
}

// ── Notación científica como texto exacto ────────────────────────────────
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }
export const sup = n => String(n).split('').map(c => SUP[c]).join('')
export const clave = (m, e) => `${m}e${e}`
export const deClave = k => { const [m, e] = k.split('e'); return { m, e: +e } }

// Mueve la coma de la mantisa: «1.27», +1 → «12.7».
function corre(m, d) {
  const [ent, dec = ''] = m.split('.')
  let digitos = ent + dec, coma = ent.length + d
  while (coma > digitos.length) digitos += '0'
  while (coma <= 0) { digitos = '0' + digitos; coma++ }
  const a = digitos.slice(0, coma).replace(/^0+(?=\d)/, '') || '0'
  const b = digitos.slice(coma).replace(/0+$/, '')
  return b ? `${a}.${b}` : a
}

// «1,27 · 10⁷»
export function cientifica(k, l = 'es') {
  const { m, e } = deClave(k)
  return `${m.replace('.', decSep(l))} · 10${sup(e)}`
}

// El número escrito entero: «12 700 000» o «0,000008» (espacio fino para los miles).
export function decimal(k, l = 'es') {
  const { m, e } = deClave(k)
  const v = corre(m, e)
  const [ent, dec] = v.split('.')
  const miles = ent.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return dec ? `${miles}${decSep(l)}${dec}` : miles
}

// Valor numérico (solo para comparar y para los tests).
export const valorDe = k => { const { m, e } = deClave(k); return Number(m) * 10 ** e }

// ── Propiedades de las potencias ──────────────────────────────────────────
// Una potencia como clave «b^e» («2^7»), con la base entre paréntesis si es negativa.
const pot = (b, e) => `${b}^${e}`
export function potencia(k) {
  const [b, e] = k.split('^')
  const base = +b < 0 ? `(${b.replace('-', '−')})` : b
  return `${base}${sup(e)}`
}

let seq = 0

// El generador de preguntas de siempre: da la ronda de un tipo con sus opciones.
function genVieja(nivel, tipo, rand) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const base = { id: ++seq, nivel, tipo }

    if (tipo === 'escribir' || tipo === 'leer') {
      const ids = Object.keys(OBJETOS).filter(id => (cfg.pequenos ? true : OBJETOS[id].e >= 0) && Math.abs(OBJETOS[id].e) <= 12)
      const id = elige(rand, ids)
      const { m, e } = OBJETOS[id]
      const bueno = clave(m, e)
      if (tipo === 'escribir') {
        // Mismo valor sin normalizar, exponente uno de más o de menos, y el signo cambiado.
        const ops = opciones(rand, bueno, [clave(corre(m, 1), e - 1), clave(m, e + 1), clave(m, e - 1), clave(m, -e), clave(corre(m, -1), e + 1)])
        if (!ops) continue
        return { ...base, objeto: id, bueno, opciones: ops }
      }
      const ops = opciones(rand, bueno, [clave(m, e + 1), clave(m, e - 1), clave(m, e + 2), clave(m, -e)])
      if (!ops) continue
      return { ...base, objeto: id, bueno, opciones: ops }
    }

    if (tipo === 'comparar') {
      const ids = baraja(rand, Object.keys(OBJETOS))
      const [a, b] = ids
      const ea = OBJETOS[a].e, eb = OBJETOS[b].e
      // Exponentes cercanos: con el Sol contra una bacteria no hay nada que pensar.
      if (ea === eb || Math.abs(ea - eb) > 4) continue
      if (nivel === 'dificil') {
        // ¿Cuántas veces mayor? Solo potencias exactas de 10 (mantisa 1).
        const pares = Object.keys(OBJETOS).filter(id => OBJETOS[id].m === '1')
        const [x, y] = baraja(rand, pares)
        const d = OBJETOS[x].e - OBJETOS[y].e
        if (d <= 0) continue
        const bueno = pot(10, d)
        const ops = opciones(rand, bueno, [pot(10, OBJETOS[x].e + OBJETOS[y].e), pot(10, d + 1), pot(10, d - 1), pot(10, OBJETOS[x].e), pot(10, 2 * d)].filter(k => +k.split('^')[1] > 0)) // «10⁻¹⁷ veces mayor» no tiene sentido
        if (!ops) continue
        return { ...base, pide: 'veces', objetos: [x, y], bueno, opciones: ops }
      }
      // ¿Cuál es mayor? Con trampa: el de mayor mantisa tiene menor exponente.
      const mayor = ea > eb ? a : b, menor = ea > eb ? b : a
      if (Number(OBJETOS[menor].m) <= Number(OBJETOS[mayor].m)) continue
      return { ...base, pide: 'mayor', objetos: baraja(rand, [a, b]), bueno: mayor, opciones: baraja(rand, [a, b]) }
    }

    if (tipo === 'propiedad') {
      const p = elige(rand, cfg.props)
      const b = elige(rand, [2, 3, 5, 7, 10])
      const m = entre(rand, 2, 9), n = entre(rand, 2, 6)
      let expr, bueno, cands
      if (p === 'producto') { expr = `${potencia(pot(b, m))} · ${potencia(pot(b, n))}`; bueno = pot(b, m + n); cands = [pot(b, m * n), pot(b * b, m + n), pot(b, Math.abs(m - n)), pot(b * b, m * n)] }
      else if (p === 'cociente') {
        if (m <= n) continue
        expr = `${potencia(pot(b, m))} : ${potencia(pot(b, n))}`; bueno = pot(b, m - n); cands = [pot(b, m + n), pot(1, m - n), pot(b, Math.round(m / n) === m / n ? m / n : m + 1), pot(b, n - m)]
      } else if (p === 'potencia') { expr = `(${potencia(pot(b, m))})${sup(n)}`; bueno = pot(b, m * n); cands = [pot(b, m + n), pot(b * n, m), pot(b, m ** n > 99 ? m * n + 1 : m ** n)] }
      else {
        // (bᵐ · bⁿ) : bᵏ
        const k = entre(rand, 1, m + n - 1)
        expr = `(${potencia(pot(b, m))} · ${potencia(pot(b, n))}) : ${potencia(pot(b, k))}`; bueno = pot(b, m + n - k); cands = [pot(b, m * n - k), pot(b, m + n + k), pot(b, (m + n) / k === Math.floor((m + n) / k) ? (m + n) / k : m + n - k + 1)]
      }
      // Fuera los exponentes 0 o negativos y los que valen lo mismo que la buena (2⁶ = 4³).
      const valor = k => { const [x, y] = k.split('^').map(Number); return x ** y }
      const ops = opciones(rand, bueno, cands.filter(c => !/\^0$|\^-/.test(c) && valor(c) !== valor(bueno)))
      if (!ops) continue
      return { ...base, prop: p, expr, bueno, opciones: ops }
    }

    if (tipo === 'valor') {
      const caso = elige(rand, ['cero', 'negativo', 'negativo', 'baseNeg'])
      if (caso === 'cero') {
        const b = elige(rand, [5, 7, 12, 25, 100, 2026])
        return { ...base, caso, b, expr: `${b}${sup(0)}`, bueno: '1', opciones: baraja(rand, ['1', '0', String(b), '−1']) }
      }
      if (caso === 'negativo') {
        const b = elige(rand, [2, 3, 4, 5, 10]), n = elige(rand, [1, 2, 3])
        const v = b ** n
        // Con n = 1, «−v» y «−b·n» coinciden: opciones() descarta el repetido y tira del de reserva.
        const ops = opciones(rand, `1/${v}`, [`−${v}`, `−${b * n}`, String(v), `1/${b * n + 1}`])
        if (!ops) continue
        return { ...base, caso, b, n, expr: `${b}${sup(-n)}`, bueno: `1/${v}`, opciones: ops }
      }
      const b = elige(rand, [2, 3, 5]), n = elige(rand, [2, 3, 4])
      const v = (-b) ** n
      const fmt = x => (x < 0 ? `−${-x}` : String(x))
      const ops = opciones(rand, fmt(v), [fmt(-v), fmt(-b * n), fmt(b * n)])
      if (!ops) continue
      return { ...base, caso, b, n, expr: `(−${b})${sup(n)}`, bueno: fmt(v), opciones: ops }
    }

    // operar: (a·10ᵖ)·(b·10^q) o (a·10ᵖ):(b·10^q), mantisas enteras.
    const div = rand() < 0.5
    const p = entre(rand, 2, 12), q = entre(rand, 2, 8)
    let a, b2, m, e
    if (!div) {
      a = entre(rand, 2, 9); b2 = entre(rand, 2, 9)
      m = a * b2; e = p + q
    } else {
      b2 = entre(rand, 2, 5); m = entre(rand, 2, 9) * 1; a = m * b2
      if (a > 9) continue
      e = p - q
      if (e === 0) continue
    }
    // Normalizar: 20 · 10⁵ → 2 · 10⁶
    let mm = String(m), ee = e
    if (m >= 10) { mm = corre(String(m), -1); ee = e + 1 }
    const bueno = clave(mm, ee)
    const cands = div
      ? [clave(mm, p + q), clave(String(a - b2 > 0 ? a - b2 : a + b2), ee), clave(mm, ee + 1), clave(mm, -ee)]
      : [clave(String(m), e), clave(mm, p * q), clave(String(a + b2), ee), clave(mm, ee - 1)]
    // «20 · 10⁵» vale lo mismo pero no está normalizado: es una trampa, no una respuesta.
    const ops = opciones(rand, bueno, cands)
    if (!ops) continue
    return { ...base, div, a, b: b2, p, q, bueno, opciones: ops }
  }
}


// ── Textos ────────────────────────────────────────────────────────────────
const nObj = (id, l) => tx(OBJETOS[id].n, l)

export function textoOpcion(o, r, l) {
  switch (r.tipo) {
    case 'escribir': case 'operar': return cientifica(o, l)
    case 'leer': return `${decimal(o, l)} m`
    case 'comparar': return r.pide === 'mayor' ? `${OBJETOS[o].emoji} ${nObj(o, l)}` : `${potencia(o)} ${s(l, 'veces', 'times', 'vegades')}`
    case 'propiedad': return potencia(o)
    default: return o
  }
}

function enunciadoViejo(r, l) {
  switch (r.tipo) {
    case 'escribir': return s(l, `${cap(nObj(r.objeto, l))} mide ${decimal(r.bueno, l)} m. ¿Cómo se escribe en notación científica?`, `${cap(nObj(r.objeto, l))} measures ${decimal(r.bueno, l)} m. How is it written in scientific notation?`, `${cap(nObj(r.objeto, l))} fa ${decimal(r.bueno, l)} m. Com s’escriu en notació científica?`)
    case 'leer': return s(l, `${cap(nObj(r.objeto, l))} mide ${cientifica(r.bueno, l)} m. ¿Qué número es?`, `${cap(nObj(r.objeto, l))} measures ${cientifica(r.bueno, l)} m. What number is that?`, `${cap(nObj(r.objeto, l))} fa ${cientifica(r.bueno, l)} m. Quin nombre és?`)
    case 'comparar': {
      const [a, b] = r.objetos
      const da = cientifica(clave(OBJETOS[a].m, OBJETOS[a].e), l), db = cientifica(clave(OBJETOS[b].m, OBJETOS[b].e), l)
      return r.pide === 'mayor'
        ? s(l, `${cap(nObj(a, l))}: ${da} m. ${cap(nObj(b, l))}: ${db} m. ¿Cuál es mayor?`, `${cap(nObj(a, l))}: ${da} m. ${cap(nObj(b, l))}: ${db} m. Which is bigger?`, `${cap(nObj(a, l))}: ${da} m. ${cap(nObj(b, l))}: ${db} m. Quin és més gran?`)
        : s(l, `${cap(nObj(a, l))} mide ${da} m y ${nObj(b, l)}, ${db} m. ¿Cuántas veces mayor es lo primero?`, `${cap(nObj(a, l))} measures ${da} m and ${nObj(b, l)} ${db} m. How many times bigger is the first?`, `${cap(nObj(a, l))} fa ${da} m i ${nObj(b, l)}, ${db} m. Quantes vegades més gran és el primer?`)
    }
    case 'propiedad': return s(l, `Escribe como una sola potencia: ${r.expr}`, `Write as a single power: ${r.expr}`, `Escriu com una sola potència: ${r.expr}`)
    case 'valor': return s(l, `¿Cuánto vale ${r.expr}?`, `What is ${r.expr}?`, `Quant val ${r.expr}?`)
    default: {
      const op = r.div ? ':' : '·'
      return s(l, `Calcula en notación científica: (${r.a} · 10${sup(r.p)}) ${op} (${r.b} · 10${sup(r.q)})`, `Work out in scientific notation: (${r.a} · 10${sup(r.p)}) ${r.div ? '÷' : '×'} (${r.b} · 10${sup(r.q)})`, `Calcula en notació científica: (${r.a} · 10${sup(r.p)}) ${op} (${r.b} · 10${sup(r.q)})`)
    }
  }
}
const cap = t => t.charAt(0).toUpperCase() + t.slice(1)

function explicacionVieja(r, l) {
  switch (r.tipo) {
    case 'escribir': case 'leer': {
      const { e } = deClave(r.bueno)
      const sentido = e >= 0
        ? s(l, `la coma se mueve ${e} lugares a la izquierda: el exponente es ${e}`, `the decimal point moves ${e} places to the left: the exponent is ${e}`, `la coma es mou ${e} llocs a l’esquerra: l’exponent és ${e}`)
        : s(l, `la coma se mueve ${-e} lugares a la derecha: el exponente es −${-e}`, `the decimal point moves ${-e} places to the right: the exponent is −${-e}`, `la coma es mou ${-e} llocs a la dreta: l’exponent és −${-e}`)
      return s(l,
        `${decimal(r.bueno, l)} = ${cientifica(r.bueno, l)}. En notación científica la mantisa va entre 1 y 10 (una sola cifra antes de la coma) y ${sentido}. Los números pequeños llevan exponente negativo.`,
        `${decimal(r.bueno, l)} = ${cientifica(r.bueno, l)}. In scientific notation the leading number is between 1 and 10 (one digit before the point) and ${sentido}. Small numbers have a negative exponent.`,
        `${decimal(r.bueno, l)} = ${cientifica(r.bueno, l)}. En notació científica la mantissa va entre 1 i 10 (una sola xifra abans de la coma) i ${sentido}. Els nombres petits porten exponent negatiu.`)
    }
    case 'comparar': {
      if (r.pide === 'mayor') return s(l, `Manda el exponente: 10${sup(OBJETOS[r.bueno].e)} es mayor que 10${sup(OBJETOS[r.objetos.find(o => o !== r.bueno)].e)}, aunque la otra mantisa sea más grande. Solo si los exponentes coinciden se mira la mantisa.`, `The exponent decides: 10${sup(OBJETOS[r.bueno].e)} is bigger than 10${sup(OBJETOS[r.objetos.find(o => o !== r.bueno)].e)}, even though the other leading number is larger. Only when the exponents match do you look at the leading number.`, `Mana l’exponent: 10${sup(OBJETOS[r.bueno].e)} és més gran que 10${sup(OBJETOS[r.objetos.find(o => o !== r.bueno)].e)}, encara que l’altra mantissa sigui més gran. Només si els exponents coincideixen es mira la mantissa.`)
      const [a, b] = r.objetos
      return s(l, `Para saber cuántas veces mayor, se divide: 10${sup(OBJETOS[a].e)} : 10${sup(OBJETOS[b].e)} = 10${sup(OBJETOS[a].e - OBJETOS[b].e)} (se restan los exponentes).`, `To find how many times bigger, divide: 10${sup(OBJETOS[a].e)} ÷ 10${sup(OBJETOS[b].e)} = 10${sup(OBJETOS[a].e - OBJETOS[b].e)} (subtract the exponents).`, `Per saber quantes vegades més gran, es divideix: 10${sup(OBJETOS[a].e)} : 10${sup(OBJETOS[b].e)} = 10${sup(OBJETOS[a].e - OBJETOS[b].e)} (es resten els exponents).`)
    }
    case 'propiedad': {
      const regla = {
        producto: s(l, 'Producto de potencias de la misma base: se deja la base y se SUMAN los exponentes.', 'Product of powers with the same base: keep the base and ADD the exponents.', 'Producte de potències de la mateixa base: es deixa la base i se SUMEN els exponents.'),
        cociente: s(l, 'Cociente de potencias de la misma base: se deja la base y se RESTAN los exponentes.', 'Quotient of powers with the same base: keep the base and SUBTRACT the exponents.', 'Quocient de potències de la mateixa base: es deixa la base i es RESTEN els exponents.'),
        potencia: s(l, 'Potencia de una potencia: se deja la base y se MULTIPLICAN los exponentes.', 'Power of a power: keep the base and MULTIPLY the exponents.', 'Potència d’una potència: es deixa la base i es MULTIPLIQUEN els exponents.'),
        mixta: s(l, 'Primero el producto (se suman los exponentes) y después el cociente (se restan).', 'First the product (add the exponents), then the quotient (subtract them).', 'Primer el producte (se sumen els exponents) i després el quocient (es resten).'),
      }[r.prop]
      return `${regla} ${r.expr} = ${potencia(r.bueno)}. ${s(l, 'La base nunca se multiplica por sí misma en estas reglas.', 'The base is never multiplied by itself in these rules.', 'La base mai no es multiplica per si mateixa en aquestes regles.')}`
    }
    case 'valor':
      if (r.caso === 'cero') return s(l, `Cualquier número (distinto de 0) elevado a 0 vale 1: ${r.b}⁰ = 1. Sale de dividir una potencia entre sí misma: ${r.b}³ : ${r.b}³ = ${r.b}⁰ = 1.`, `Any number (other than 0) to the power 0 is 1: ${r.b}⁰ = 1. It comes from dividing a power by itself: ${r.b}³ ÷ ${r.b}³ = ${r.b}⁰ = 1.`, `Qualsevol nombre (diferent de 0) elevat a 0 val 1: ${r.b}⁰ = 1. Surt de dividir una potència entre si mateixa: ${r.b}³ : ${r.b}³ = ${r.b}⁰ = 1.`)
      if (r.caso === 'negativo') return s(l, `Un exponente negativo no da un número negativo: da el inverso. ${r.expr} = 1/${r.b}${sup(r.n)} = ${r.bueno}.`, `A negative exponent does not give a negative number: it gives the reciprocal. ${r.expr} = 1/${r.b}${sup(r.n)} = ${r.bueno}.`, `Un exponent negatiu no dona un nombre negatiu: dona l’invers. ${r.expr} = 1/${r.b}${sup(r.n)} = ${r.bueno}.`)
      return s(l, `Una base negativa con exponente par da positivo y con exponente impar, negativo: ${r.expr} = ${r.bueno}. Ojo: (−${r.b})² no es lo mismo que −${r.b}².`, `A negative base with an even exponent gives a positive result and with an odd one, negative: ${r.expr} = ${r.bueno}. Careful: (−${r.b})² is not the same as −${r.b}².`, `Una base negativa amb exponent parell dona positiu i amb exponent senar, negatiu: ${r.expr} = ${r.bueno}. Compte: (−${r.b})² no és el mateix que −${r.b}².`)
    default: {
      const crudo = r.div ? `${r.a / r.b} · 10${sup(r.p - r.q)}` : `${r.a * r.b} · 10${sup(r.p + r.q)}`
      const pasos = r.div
        ? s(l, `se dividen las mantisas (${r.a} : ${r.b}) y se restan los exponentes (${r.p} − ${r.q})`, `divide the leading numbers (${r.a} ÷ ${r.b}) and subtract the exponents (${r.p} − ${r.q})`, `es divideixen les mantisses (${r.a} : ${r.b}) i es resten els exponents (${r.p} − ${r.q})`)
        : s(l, `se multiplican las mantisas (${r.a} · ${r.b}) y se suman los exponentes (${r.p} + ${r.q})`, `multiply the leading numbers (${r.a} × ${r.b}) and add the exponents (${r.p} + ${r.q})`, `es multipliquen les mantisses (${r.a} · ${r.b}) i se sumen els exponents (${r.p} + ${r.q})`)
      const norm = !r.div && r.a * r.b >= 10
        ? s(l, ` La mantisa ${r.a * r.b} pasa de 10: se corre la coma y el exponente sube uno.`, ` The leading number ${r.a * r.b} is over 10: move the point and raise the exponent by one.`, ` La mantissa ${r.a * r.b} passa de 10: es corre la coma i l’exponent puja un.`)
        : ''
      return s(l, `Primero ${pasos}: ${crudo}.${norm} Resultado: ${cientifica(r.bueno, l)}.`, `First ${pasos}: ${crudo}.${norm} Result: ${cientifica(r.bueno, l)}.`, `Primer ${pasos}: ${crudo}.${norm} Resultat: ${cientifica(r.bueno, l)}.`)
    }
  }
}

function schemaVieja(r, l) {
  return {
    question: enunciadoViejo(r, l),
    correctAnswer: textoOpcion(r.bueno, r, l),
    wrongAnswers: r.opciones.filter(o => o !== r.bueno).map(o => textoOpcion(o, r, l)),
  }
}

// Qué objetos se marcan en la regla (al corregir).
export function marcasRegla(r) {
  if (r.tipo === 'escribir' || r.tipo === 'leer') return [r.objeto]
  if (r.tipo === 'comparar') return r.objetos
  return []
}

// ── Mecánicas ─────────────────────────────────────────────────────────────
// Encima del generador de arriba (que sigue dando las opciones para el texto
// del examen y de los buscadores), cada ronda se juega sin elegir:
//   regla      colocar tres objetos en la regla de potencias de 10
//   coma       correr la coma: de 12 700 000 a 1,27 · 10⁷, o al revés
//   exponente  ajustar el exponente con − y + (y, en difícil, escribir la
//              mantisa de una operación en notación científica)
//   valor      escribir con un teclado cuánto vale 5⁰, 2⁻³ o (−2)³
let seqN = 0
const recientes = []
const temaDe = r => r.objeto ?? (r.objetos ? r.objetos.join() : r.expr ?? `${r.a}${r.p}${r.b}${r.q}`)
export function genRonda(nivel = 'facil', opts = {}) {
  for (let intento = 0; ; intento++) {
    const r = genNueva(nivel, opts)
    if (intento < 20 && recientes.includes(temaDe(r))) continue
    recientes.push(temaDe(r))
    if (recientes.length > 6) recientes.shift()
    return r
  }
}
function genNueva(nivel, { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const tipo = elige(rand, cfg.mecanicas)
    if (tipo === 'regla') {
      // Tres objetos con exponentes separados (al menos 2) para que se distingan.
      const ids = baraja(rand, Object.keys(OBJETOS))
      const out = []
      for (const id of ids) {
        if (out.some(x => Math.abs(OBJETOS[x].e - OBJETOS[id].e) < 2)) continue
        out.push(id)
        if (out.length === 3) break
      }
      if (out.length < 3) continue
      return { id: ++seqN, nivel, tipo, objetos: out, tol: cfg.tol, bueno: 'regla:ok' }
    }
    if (tipo === 'coma') {
      const modo = nivel === 'facil' || rand() < 0.6 ? 'escribir' : 'leer'
      return { ...genVieja(nivel, modo, rand), id: ++seqN, tipo, modo }
    }
    if (tipo === 'exponente') {
      const sub = cfg.operar && rand() < 0.4 ? 'operar' : 'propiedad'
      return { ...genVieja(nivel, sub, rand), id: ++seqN, tipo, sub }
    }
    return { ...genVieja(nivel, 'valor', rand), id: ++seqN }
  }
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)

const menos = t => String(t).replace(/−/g, '-').replace(/\s/g, '')
// Respuestas: regla «regla:ok|no»; coma, la clave a la que se ha llegado;
// exponente, «b^n» o la clave del resultado; valor, el texto tecleado.
export function esCorrecta(r, o) {
  if (r.tipo === 'regla') return o === 'regla:ok'
  if (r.tipo === 'exponente' && r.sub === 'operar') {
    const { m, e } = deClave(String(o))
    const n = Number(m)
    return n >= 1 && n < 10 && clave(String(n), e) === clave(String(Number(deClave(r.bueno).m)), deClave(r.bueno).e)
  }
  if (r.tipo === 'valor') return menos(o) === menos(r.bueno)
  if (r.tipo === 'coma') return o === metaComa(r)
  return o === r.bueno
}
// La regla: vale si cada objeto está en su exponente (con la tolerancia del nivel).
export const reglaBien = (r, puestos) => r.objetos.every(id => puestos[id] != null && Math.abs(puestos[id] - OBJETOS[id].e) <= r.tol)
// Lo que se ve al correr la coma: el número normalizado de la ronda llevado al exponente d.
export const conExponente = (r, d) => { const { m, e } = deClave(r.bueno); return clave(corre(m, e - d), d) }
// A dónde hay que llevar la coma: a la notación científica, o al número entero (exponente 0).
export const metaComa = r => (r.modo === 'leer' ? conExponente(r, 0) : r.bueno)
export const objeto = id => OBJETOS[id]

export function enunciado(r, l) {
  if (r.tipo === 'regla') return s(l, 'Coloca cada objeto en la regla, en su potencia de 10 (en metros)', 'Place each object on the ruler at its power of 10 (in metres)', 'Col·loca cada objecte a la regla, a la seva potència de 10 (en metres)')
  if (r.tipo === 'coma') {
    const o = nObj(r.objeto, l)
    return r.modo === 'escribir'
      ? s(l, `${cap(o)} mide ${decimal(r.bueno, l)} m. Corre la coma hasta escribirlo en notación científica`, `${cap(o)} measures ${decimal(r.bueno, l)} m. Move the point until it is in scientific notation`, `${cap(o)} fa ${decimal(r.bueno, l)} m. Mou la coma fins a escriure-ho en notació científica`)
      : s(l, `${cap(o)} mide ${cientifica(r.bueno, l)} m. Corre la coma hasta escribir el número entero`, `${cap(o)} measures ${cientifica(r.bueno, l)} m. Move the point until the whole number is written out`, `${cap(o)} fa ${cientifica(r.bueno, l)} m. Mou la coma fins a escriure el nombre sencer`)
  }
  if (r.tipo === 'exponente') return enunciadoViejo({ ...r, tipo: r.sub }, l)
  return enunciadoViejo(r, l)
}

export function explicacion(r, l) {
  if (r.tipo === 'regla') {
    const lista = [...r.objetos].sort((a, b) => OBJETOS[a].e - OBJETOS[b].e).map(id => `${OBJETOS[id].emoji} ${nObj(id, l)}: ${cientifica(clave(OBJETOS[id].m, OBJETOS[id].e), l)} m`).join(' · ')
    return `${lista}. ${s(l, 'En la regla cada marca es diez veces la anterior: lo que manda es el exponente.', 'On the ruler each mark is ten times the previous one: the exponent is what matters.', 'A la regla cada marca és deu vegades l’anterior: el que mana és l’exponent.')}`
  }
  if (r.tipo === 'coma') return explicacionVieja({ ...r, tipo: 'escribir' }, l)
  if (r.tipo === 'exponente') return explicacionVieja({ ...r, tipo: r.sub }, l)
  return explicacionVieja(r, l)
}

export function schemaQuestion(r, l) {
  if (r.tipo === 'regla') {
    const id = r.objetos[0], e = OBJETOS[id].e
    return {
      question: s(l, `¿Cuál es el orden de magnitud de ${nObj(id, l)}, en metros?`, `What is the order of magnitude of ${nObj(id, l)}, in metres?`, `Quin és l’ordre de magnitud de ${nObj(id, l)}, en metres?`),
      correctAnswer: `10${sup(e)}`, wrongAnswers: [e + 2, e - 2, -e || e + 4].map(x => `10${sup(x)}`),
    }
  }
  if (r.tipo === 'coma') return schemaVieja({ ...r, tipo: r.modo }, l)
  if (r.tipo === 'exponente') return schemaVieja({ ...r, tipo: r.sub }, l)
  return schemaVieja(r, l)
}
