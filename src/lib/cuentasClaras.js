// Cuentas Claras: finanzas personales (Economía, ESO y Bachillerato).
//
// Todo se calcula con céntimos enteros y la respuesta se da en euros enteros
// (redondeados, con ±1 € de margen), así que nada depende de una cuenta
// escrita a mano. Los gastos del presupuesto son solo los que ningún libro
// discute (alquiler = necesidad, cine = deseo, fondo de emergencia = ahorro):
// el móvil, la ropa o el coche quedan fuera porque dependen de cada caso.
//
// Mecánicas (nada de elegir entre cuatro):
//   presupuesto  cada gasto a su caja: necesidad, deseo o ahorro
//   regla        la regla 50/30/20: teclear las tres partes de un sueldo
//   interes      teclear el dinero final (simple o compuesto)
//   inflacion    teclear lo que costará algo dentro de unos años
//   ordena       tocar los planes de ahorro de más a menos dinero final
//   deuda        teclear en cuántos pagos se salda una tarjeta

export const tx = (o, l) => o[l] ?? o.es
const s = (l, es, en, ca) => ({ es, en, ca })[l] ?? es

// ── Presupuesto ───────────────────────────────────────────────────────────
export const CAJAS = {
  necesidad: { es: 'Necesidad', en: 'Need', ca: 'Necessitat' },
  deseo: { es: 'Deseo', en: 'Want', ca: 'Desig' },
  ahorro: { es: 'Ahorro', en: 'Savings', ca: 'Estalvi' },
}
const G = (caja, es, en, ca) => ({ caja, nombre: { es, en, ca } })
export const GASTOS = [
  G('necesidad', 'Alquiler del piso', 'Rent for the flat', 'Lloguer del pis'),
  G('necesidad', 'Factura de la luz', 'Electricity bill', 'Factura de la llum'),
  G('necesidad', 'Compra semanal del súper', 'Weekly supermarket shop', 'Compra setmanal del súper'),
  G('necesidad', 'Abono de transporte para ir al trabajo', 'Travel pass to get to work', 'Abonament de transport per anar a la feina'),
  G('necesidad', 'Factura del agua', 'Water bill', 'Factura de l’aigua'),
  G('necesidad', 'Seguro médico obligatorio del trabajo', 'Compulsory work health insurance', 'Assegurança mèdica obligatòria de la feina'),
  G('necesidad', 'Medicinas recetadas', 'Prescribed medicines', 'Medicaments receptats'),
  G('deseo', 'Entradas de cine', 'Cinema tickets', 'Entrades de cinema'),
  G('deseo', 'Un videojuego nuevo', 'A new video game', 'Un videojoc nou'),
  G('deseo', 'Cena en un restaurante', 'Dinner at a restaurant', 'Sopar en un restaurant'),
  G('deseo', 'Entrada para un concierto', 'A concert ticket', 'Entrada per a un concert'),
  G('deseo', 'Suscripción a una plataforma de series', 'Streaming subscription', 'Subscripció a una plataforma de sèries'),
  G('deseo', 'Viaje de fin de semana', 'Weekend trip', 'Viatge de cap de setmana'),
  G('deseo', 'Zapatillas de edición limitada', 'Limited-edition trainers', 'Sabatilles d’edició limitada'),
  G('ahorro', 'Fondo de emergencia', 'Emergency fund', 'Fons d’emergència'),
  G('ahorro', 'Hucha para la entrada de un piso', 'Saving for a house deposit', 'Guardiola per a l’entrada d’un pis'),
  G('ahorro', 'Plan de pensiones', 'Pension plan', 'Pla de pensions'),
  G('ahorro', 'Depósito a plazo fijo', 'Fixed-term deposit', 'Dipòsit a termini fix'),
]

// ── Cuentas (en céntimos enteros) ─────────────────────────────────────────
// Interés compuesto anual: cada año se suma el interés al capital (redondeo
// al céntimo cada año, como hace un banco).
export function compuesto(c0, pct, anios) {
  let c = c0 * 100
  for (let i = 0; i < anios; i++) c = Math.round(c * (1 + pct / 100))
  return c / 100
}
export const simple = (c0, pct, anios) => Math.round(c0 * 100 * (1 + (pct / 100) * anios)) / 100
// Tarjeta: cada mes se suma el interés mensual y luego se paga la cuota; el
// último pago es lo que quede. Devuelve nº de pagos e intereses totales.
export function deuda(debe, pctMes, cuota) {
  let b = debe * 100, pagos = 0, intereses = 0
  while (b > 0) {
    const i = Math.round(b * pctMes / 100)
    intereses += i
    b += i - cuota * 100
    pagos++
    if (pagos > 600) return null
  }
  return { pagos, intereses: intereses / 100 }
}

// Lo tecleado → número: «1.157», «1157,63», «1,157.6» o «1 157».
export function leeNumero(t) {
  let x = String(t).trim().replace(/\s|€/g, '')
  if (!x) return null
  const dec = x.match(/[.,](\d{1,2})$/)
  let entero = dec ? x.slice(0, -dec[0].length) : x
  entero = entero.replace(/[.,]/g, '')
  if (!/^\d+$/.test(entero)) return null
  return Number(entero) + (dec ? Number(dec[1].padEnd(2, '0')) / 100 : 0)
}
export const cerca = (escrito, bueno) => { const n = leeNumero(escrito); return n !== null && Math.abs(n - Math.round(bueno)) <= 1 }
// 1.157,63 € en castellano y catalán; €1,157.63 en inglés británico
export function euros(n, l) {
  const num = new Intl.NumberFormat(l === 'en' ? 'en-GB' : l === 'ca' ? 'ca-ES' : 'es-ES', { maximumFractionDigits: 2, minimumFractionDigits: Number.isInteger(n) ? 0 : 2, useGrouping: true }).format(n)
  return l === 'en' ? `€${num}` : `${num} €`
}
const eur = (n, l) => euros(n, l)

// ── Planes para ordenar ───────────────────────────────────────────────────
// { c: capital inicial, pct, modo: 'colchon' | 'simple' | 'compuesto' }
export function finalPlan(pl, anios) {
  if (pl.modo === 'colchon') return pl.c
  return pl.modo === 'simple' ? simple(pl.c, pl.pct, anios) : compuesto(pl.c, pl.pct, anios)
}
export function textoPlan(pl, l) {
  if (pl.modo === 'colchon') return s(l, `${eur(pl.c, l)} guardados en casa`, `${eur(pl.c, l)} kept at home`, `${eur(pl.c, l)} guardats a casa`)
  const m = pl.modo === 'simple' ? s(l, 'interés simple', 'simple interest', 'interès simple') : s(l, 'interés compuesto', 'compound interest', 'interès compost')
  return s(l, `${eur(pl.c, l)} al ${pl.pct} % anual, ${m}`, `${eur(pl.c, l)} at ${pl.pct}% a year, ${m}`, `${eur(pl.c, l)} al ${pl.pct} % anual, ${m}`)
}

// ── Rondas ────────────────────────────────────────────────────────────────
export const NIVELES = {
  facil:   { tipos: ['presupuesto', 'presupuesto', 'regla', 'interes'] },
  medio:   { tipos: ['presupuesto', 'regla', 'interes', 'inflacion', 'ordena'] },
  dificil: { tipos: ['interes', 'inflacion', 'ordena', 'deuda'] },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const entre = (rand, a, b) => a + Math.floor(rand() * (b - a + 1))
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
let seq = 0

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const tipo = elige(rand, cfg.tipos)
  const base = { id: ++seq, nivel, tipo }

  if (tipo === 'presupuesto') {
    // Al menos uno de cada caja
    const por = c => baraja(rand, GASTOS.map((g, i) => i).filter(i => GASTOS[i].caja === c))
    const n = por('necesidad'), d = por('deseo'), a = por('ahorro')
    const gastos = baraja(rand, [n[0], d[0], a[0], ...baraja(rand, [n[1], d[1], a[1], n[2], d[2]]).slice(0, nivel === 'facil' ? 1 : 2)])
    return { ...base, gastos, bueno: 'presupuesto:0' }
  }

  if (tipo === 'regla') {
    const sueldo = entre(rand, 8, 30) * 100 // múltiplos de 100: las tres partes salen enteras
    return { ...base, sueldo, partes: { necesidad: sueldo * 5 / 10, deseo: sueldo * 3 / 10, ahorro: sueldo * 2 / 10 }, bueno: 'regla:ok' }
  }

  if (tipo === 'interes') {
    const modo = nivel === 'facil' ? 'simple' : nivel === 'medio' ? elige(rand, ['simple', 'compuesto']) : 'compuesto'
    for (;;) {
      const c = elige(rand, nivel === 'facil' ? [100, 200, 500, 1000] : [500, 800, 1000, 1500, 2000, 3000, 5000])
      const pct = elige(rand, nivel === 'facil' ? [2, 5, 10] : [2, 3, 4, 5, 6, 8])
      const anios = nivel === 'facil' ? entre(rand, 1, 3) : nivel === 'medio' ? entre(rand, 2, 3) : entre(rand, 3, 10)
      // Simple y compuesto tienen que dar respuestas distintas (≥ 3 €): si no,
      // la ronda no distingue quien sabe la diferencia de quien no
      if (nivel !== 'facil' && Math.abs(compuesto(c, pct, anios) - simple(c, pct, anios)) < 3) continue
      const fin = modo === 'simple' ? simple(c, pct, anios) : compuesto(c, pct, anios)
      return { ...base, modo, c, pct, anios, fin, bueno: 'interes:ok' }
    }
  }

  if (tipo === 'inflacion') {
    const precio = elige(rand, [200, 250, 300, 400, 500, 800, 1000])
    const pct = elige(rand, [2, 3, 4, 5, 6])
    const anios = nivel === 'medio' ? entre(rand, 1, 2) : entre(rand, 3, 8)
    const cosa = elige(rand, COSAS)
    return { ...base, precio, pct, anios, cosa, fin: compuesto(precio, pct, anios), bueno: 'inflacion:ok' }
  }

  if (tipo === 'ordena') {
    const anios = nivel === 'medio' ? entre(rand, 3, 5) : entre(rand, 8, 20)
    for (;;) {
      const c = elige(rand, [1000, 2000])
      const pl = baraja(rand, [
        { c, modo: 'colchon' },
        { c, pct: elige(rand, [3, 4, 5]), modo: 'simple' },
        { c, pct: elige(rand, [3, 4, 5]), modo: 'compuesto' },
        { c: c / 2, pct: elige(rand, [8, 10, 12]), modo: 'compuesto' },
        { c, pct: elige(rand, [1, 2]), modo: 'compuesto' },
      ]).slice(0, 4)
      const fins = pl.map(x => finalPlan(x, anios))
      // Sin empates ni casi empates: entre dos planes, al menos 10 € de diferencia
      const ord = [...fins].sort((a, b) => b - a)
      if (ord.some((x, i) => i > 0 && ord[i - 1] - x < 10)) continue
      return { ...base, anios, planes: pl, bueno: 'ordena:ok' }
    }
  }

  // deuda: el interés del primer mes siempre es menor que la cuota
  for (;;) {
    const debe = elige(rand, [300, 500, 600, 800, 1000, 1200])
    const pctMes = elige(rand, [1, 1.5, 2])
    const cuota = elige(rand, [40, 50, 60, 80, 100])
    if (debe * pctMes / 100 >= cuota * 0.6) continue
    const d = deuda(debe, pctMes, cuota)
    if (!d || d.pagos > 48) continue
    return { ...base, debe, pctMes, cuota, ...d, bueno: 'deuda:ok' }
  }
}

const COSAS = [
  { es: 'una bici', en: 'a bike', ca: 'una bici' },
  { es: 'un portátil', en: 'a laptop', ca: 'un portàtil' },
  { es: 'la compra de un mes', en: 'a month’s shopping', ca: 'la compra d’un mes' },
  { es: 'un viaje', en: 'a trip', ca: 'un viatge' },
]

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
// Respuestas: «presupuesto:fallos», y «<tipo>:ok|mal» para los de teclear y ordenar.
export const esCorrecta = (r, x) => x === r.bueno
export const ordenBueno = (r) => r.planes.map((p, i) => i).sort((a, b) => finalPlan(r.planes[b], r.anios) - finalPlan(r.planes[a], r.anios))
export const respuesta = r => (r.tipo === 'deuda' ? r.pagos : r.fin)

// ── Textos ────────────────────────────────────────────────────────────────
export function enunciado(r, l) {
  switch (r.tipo) {
    case 'presupuesto': return s(l, '¿Necesidad, deseo o ahorro?', 'Need, want or savings?', 'Necessitat, desig o estalvi?')
    case 'regla': return s(l, `Cobras ${eur(r.sueldo, l)} al mes. Repártelos con la regla 50/30/20`, `You earn ${eur(r.sueldo, l)} a month. Split it with the 50/30/20 rule`, `Cobres ${eur(r.sueldo, l)} al mes. Reparteix-los amb la regla 50/30/20`)
    case 'interes': {
      const m = r.modo === 'simple'
        ? s(l, 'con interés simple (el interés se calcula siempre sobre lo que pusiste)', 'with simple interest (always calculated on what you put in)', 'amb interès simple (l’interès es calcula sempre sobre el que vas posar)')
        : s(l, 'con interés compuesto (cada año el interés se suma y también da interés)', 'with compound interest (each year the interest is added and earns interest too)', 'amb interès compost (cada any l’interès se suma i també dona interès)')
      return s(l, `Metes ${eur(r.c, l)} al ${r.pct} % anual durante ${r.anios} ${r.anios === 1 ? 'año' : 'años'}, ${m}. ¿Cuánto tendrás al final?`,
        `You put ${eur(r.c, l)} in at ${r.pct}% a year for ${r.anios} ${r.anios === 1 ? 'year' : 'years'}, ${m}. How much will you have at the end?`,
        `Poses ${eur(r.c, l)} al ${r.pct} % anual durant ${r.anios} ${r.anios === 1 ? 'any' : 'anys'}, ${m}. Quant tindràs al final?`)
    }
    case 'inflacion': return s(l, `Hoy ${tx(r.cosa, 'es')} cuesta ${eur(r.precio, l)}. Si los precios suben un ${r.pct} % cada año, ¿cuánto costará dentro de ${r.anios} ${r.anios === 1 ? 'año' : 'años'}?`,
      `Today ${tx(r.cosa, 'en')} costs ${eur(r.precio, l)}. If prices rise by ${r.pct}% every year, how much will it cost in ${r.anios} ${r.anios === 1 ? 'year' : 'years'}?`,
      `Avui ${tx(r.cosa, 'ca')} costa ${eur(r.precio, l)}. Si els preus pugen un ${r.pct} % cada any, quant costarà d’aquí a ${r.anios} ${r.anios === 1 ? 'any' : 'anys'}?`)
    case 'ordena': return s(l, `Ordena los planes de más a menos dinero al cabo de ${r.anios} años`, `Order the plans from most to least money after ${r.anios} years`, `Ordena els plans de més a menys diners al cap de ${r.anios} anys`)
    default: return s(l, `Debes ${eur(r.debe, l)} en la tarjeta. Cada mes el banco suma un ${r.pctMes} % de lo que debes y tú pagas ${eur(r.cuota, l)}. ¿En cuántos pagos la saldas?`,
      `You owe ${eur(r.debe, l)} on a credit card. Each month the bank adds ${r.pctMes}% of what you owe and you pay ${eur(r.cuota, l)}. How many payments will it take to clear it?`,
      `Deus ${eur(r.debe, l)} a la targeta. Cada mes el banc suma un ${r.pctMes} % del que deus i tu pagues ${eur(r.cuota, l)}. En quants pagaments la saldes?`)
  }
}
// 5 % → «1,05» (o «1.05» en inglés)
const factor = (pct, l) => (1 + pct / 100).toFixed(2).replace('.', l === 'en' ? '.' : ',')

export function explicacion(r, l) {
  switch (r.tipo) {
    case 'presupuesto': return r.gastos.map(i => `${tx(GASTOS[i].nombre, l)}: ${tx(CAJAS[GASTOS[i].caja], l).toLowerCase()}`).join(' · ') + '. ' + s(l, 'Necesidad es lo que no puedes dejar de pagar; deseo, lo que te gusta pero podrías quitar; ahorro, lo que apartas para el futuro.', 'A need is what you cannot stop paying; a want is what you enjoy but could cut; savings are what you set aside for later.', 'Necessitat és el que no pots deixar de pagar; desig, el que t’agrada però podries treure; estalvi, el que reserves per al futur.')
    case 'regla': return s(l, `50 % para necesidades (${eur(r.partes.necesidad, l)}), 30 % para deseos (${eur(r.partes.deseo, l)}) y 20 % para ahorro (${eur(r.partes.ahorro, l)}).`, `50% for needs (${eur(r.partes.necesidad, l)}), 30% for wants (${eur(r.partes.deseo, l)}) and 20% for savings (${eur(r.partes.ahorro, l)}).`, `50 % per a necessitats (${eur(r.partes.necesidad, l)}), 30 % per a desitjos (${eur(r.partes.deseo, l)}) i 20 % per a estalvi (${eur(r.partes.ahorro, l)}).`)
    case 'interes': {
      if (r.modo === 'simple') {
        const ganado = Math.round(r.c * r.pct / 100 * 100) / 100
        return s(l, `Cada año ganas el ${r.pct} % de ${eur(r.c, l)} = ${eur(ganado, l)}. En ${r.anios}: ${eur(r.c, l)} + ${r.anios} × ${eur(ganado, l)} = ${eur(r.fin, l)}.`, `Each year you earn ${r.pct}% of ${eur(r.c, l)} = ${eur(ganado, l)}. Over ${r.anios}: ${eur(r.c, l)} + ${r.anios} × ${eur(ganado, l)} = ${eur(r.fin, l)}.`, `Cada any guanyes el ${r.pct} % de ${eur(r.c, l)} = ${eur(ganado, l)}. En ${r.anios}: ${eur(r.c, l)} + ${r.anios} × ${eur(ganado, l)} = ${eur(r.fin, l)}.`)
      }
      const f = `${eur(r.c, l)} × ${factor(r.pct, l)}^${r.anios}`
      return s(l, `Cada año se multiplica por ${factor(r.pct, l)}: ${f} = ${eur(r.fin, l)}. Con interés simple serían ${eur(simple(r.c, r.pct, r.anios), l)}: la diferencia es el interés de los intereses.`, `Each year it is multiplied by ${factor(r.pct, l)}: ${f} = ${eur(r.fin, l)}. With simple interest it would be ${eur(simple(r.c, r.pct, r.anios), l)}: the difference is interest on the interest.`, `Cada any es multiplica per ${factor(r.pct, l)}: ${f} = ${eur(r.fin, l)}. Amb interès simple serien ${eur(simple(r.c, r.pct, r.anios), l)}: la diferència és l’interès dels interessos.`)
    }
    case 'inflacion': return s(l, `Los precios suben sobre lo que ya subieron: ${eur(r.precio, l)} × ${factor(r.pct, l)}^${r.anios} = ${eur(r.fin, l)}. Con los mismos ${eur(r.precio, l)} de hoy ya no llegarías.`, `Prices rise on top of earlier rises: ${eur(r.precio, l)} × ${factor(r.pct, l)}^${r.anios} = ${eur(r.fin, l)}. Today’s ${eur(r.precio, l)} would no longer be enough.`, `Els preus pugen sobre el que ja van pujar: ${eur(r.precio, l)} × ${factor(r.pct, l)}^${r.anios} = ${eur(r.fin, l)}. Amb els mateixos ${eur(r.precio, l)} d’avui ja no n’hi hauria prou.`)
    case 'ordena': {
      // La nota dice solo lo que pasa en ESTA ronda
      const ob = ordenBueno(r)
      const max = Math.max(...r.planes.map(x => x.c))
      const pos = k => ob.indexOf(k)
      const conMenos = r.planes.findIndex(p => p.c < max)
      const remonta = conMenos >= 0 && r.planes.some((p, k) => p.c === max && pos(conMenos) < pos(k))
      const simpleK = r.planes.findIndex(p => p.modo === 'simple')
      const compK = r.planes.findIndex(p => p.modo === 'compuesto' && p.c === max && p.pct >= (r.planes[simpleK]?.pct ?? Infinity))
      let nota = s(l, 'Lo que decide es el tipo de interés y el tiempo: con el compuesto, cada año se gana sobre lo ya ganado.', 'What decides it is the interest rate and the time: with compound interest, each year you earn on what you have already earned.', 'El que decideix és el tipus d’interès i el temps: amb el compost, cada any es guanya sobre el que ja s’ha guanyat.')
      if (compK >= 0 && simpleK >= 0) nota += ' ' + s(l, `Al mismo tipo o más, el compuesto gana al simple.`, `At the same rate or higher, compound beats simple.`, `Al mateix tipus o més, el compost guanya el simple.`)
      if (remonta) nota += ' ' + s(l, 'Y un tipo alto puede ganar aunque se empiece con menos.', 'And a high rate can win even when starting with less.', 'I un tipus alt pot guanyar encara que es comenci amb menys.')
      return ob.map(k => `${textoPlan(r.planes[k], l)}: ${eur(finalPlan(r.planes[k], r.anios), l)}`).join(' · ') + '. ' + nota
    }
    default: return s(l, `Saldas la tarjeta en ${r.pagos} pagos (el último, más pequeño) y pagas ${eur(r.intereses, l)} de intereses. Cuanto menor la cuota, más meses y más intereses.`, `You clear the card in ${r.pagos} payments (the last one smaller) and pay ${eur(r.intereses, l)} in interest. The smaller the payment, the more months and the more interest.`, `Saldes la targeta en ${r.pagos} pagaments (l’últim, més petit) i pagues ${eur(r.intereses, l)} d’interessos. Com més petita la quota, més mesos i més interessos.`)
  }
}

// Para los buscadores y el examen en texto.
export function schemaQuestion(r, l) {
  if (r.tipo === 'presupuesto') {
    const g = GASTOS[r.gastos[0]]
    return { question: s(l, `«${tx(g.nombre, l)}»: ¿necesidad, deseo o ahorro?`, `“${tx(g.nombre, l)}”: need, want or savings?`, `«${tx(g.nombre, l)}»: necessitat, desig o estalvi?`), correctAnswer: tx(CAJAS[g.caja], l), wrongAnswers: Object.keys(CAJAS).filter(c => c !== g.caja).map(c => tx(CAJAS[c], l)) }
  }
  if (r.tipo === 'regla') return { question: s(l, `Con la regla 50/30/20 y un sueldo de ${eur(r.sueldo, l)}, ¿cuánto va a ahorro?`, `With the 50/30/20 rule and a ${eur(r.sueldo, l)} salary, how much goes to savings?`, `Amb la regla 50/30/20 i un sou de ${eur(r.sueldo, l)}, quant va a estalvi?`), correctAnswer: eur(r.partes.ahorro, l), wrongAnswers: [eur(r.partes.deseo, l), eur(r.partes.necesidad, l), eur(r.sueldo * 0.1, l)] }
  const bueno = Math.round(respuesta(r))
  const malas = (r.tipo === 'deuda' ? [bueno - 3, bueno + 4, Math.ceil(r.debe / r.cuota) === bueno ? bueno + 7 : Math.ceil(r.debe / r.cuota)] : [bueno + Math.max(5, Math.round(bueno * 0.08)), bueno - Math.max(5, Math.round(bueno * 0.06)), r.tipo === 'interes' && r.modo === 'compuesto' ? Math.round(simple(r.c, r.pct, r.anios)) : bueno + Math.max(9, Math.round(bueno * 0.15))])
    .filter((x, i, a) => x !== bueno && x > 0 && a.indexOf(x) === i)
  const fmt = n => (r.tipo === 'deuda' ? String(n) : eur(n, l))
  if (r.tipo === 'ordena') {
    const ob = ordenBueno(r)
    return { question: s(l, `¿Qué plan da más dinero al cabo de ${r.anios} años?`, `Which plan gives the most money after ${r.anios} years?`, `Quin pla dona més diners al cap de ${r.anios} anys?`), correctAnswer: textoPlan(r.planes[ob[0]], l), wrongAnswers: ob.slice(1).map(i => textoPlan(r.planes[i], l)) }
  }
  return { question: enunciado(r, l), correctAnswer: fmt(bueno), wrongAnswers: malas.map(fmt) }
}

// ¿Vale lo tecleado? Euros: ±1 € (los céntimos no se piden); pagos: exacto.
export function vale(r, escrito, parte) {
  if (r.tipo === 'regla') return cerca(escrito, r.partes[parte])
  if (r.tipo === 'deuda') return leeNumero(escrito) === r.pagos
  return cerca(escrito, r.fin)
}
