// Punto Muerto (economía · el punto de equilibrio o umbral de rentabilidad,
// Economía de la Empresa de Bachillerato).
//
// Una empresa con costes fijos (CF), un precio de venta (P) y un coste
// variable por unidad (CVu). El gráfico dibuja los ingresos (P · Q) y los
// costes totales (CF + CVu · Q): se cruzan en el punto muerto, Q* = CF / (P − CVu).
//
// Tipos de pregunta (y la trampa de cada uno):
//   leer         el cruce en el gráfico                     (leer el corte con el eje de costes)
//   zona         con Q unidades, ¿beneficio o pérdida?      (mirar solo los ingresos)
//   calcular     Q* = CF / (P − CVu)                         (dividir entre P y olvidar el CVu)
//   beneficio    B = (P − CVu) · Q − CF                      (olvidar los costes fijos)
//   sensibilidad sube CF, P o CVu: ¿qué le pasa a Q*?       (creer que más precio = más unidades)
//   precio       el precio mínimo para no perder vendiendo Q (CF / Q sin sumar el CVu)
//
// Los números se generan al revés (primero Q* y el margen; de ahí CF y P),
// así todas las respuestas son enteras, como en el examen de punto de equilibrio.

const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
export const num = (n, l = 'es') => n.toLocaleString(l === 'en' ? 'en-GB' : l === 'ca' ? 'ca-ES' : 'es-ES', { maximumFractionDigits: 2 })
export const eur = (n, l = 'es') => (n < 0 ? '−' : '') + (l === 'en' ? `€${num(Math.abs(n), l)}` : `${num(Math.abs(n), l)} €`)
export const sigla = (k, l) => (l === 'en' ? { CF: 'FC', CVu: 'VCu', P: 'P' }[k] : k)

export const NIVELES = {
  facil:   { tipos: ['leer', 'leer', 'zona', 'zona', 'calcular'] },
  medio:   { tipos: ['calcular', 'calcular', 'beneficio', 'sensibilidad', 'zona'] },
  dificil: { tipos: ['calcular', 'beneficio', 'beneficio', 'sensibilidad', 'precio', 'precio'] },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
// Opciones numéricas distintas y positivas (o con signo en el beneficio).
function opciones(rand, bueno, cands, { positivas = true } = {}) {
  const out = []
  for (const c of cands) {
    if (c == null || !Number.isFinite(c) || c === bueno || out.includes(c)) continue
    if (positivas && c <= 0) continue
    if (Math.round(c * 100) !== c * 100) continue // como mucho dos decimales
    out.push(c)
    if (out.length === 3) break
  }
  return out.length === 3 ? baraja(rand, [bueno, ...out]) : null
}

let seq = 0
export function empresa(rand) {
  const Q = elige(rand, [100, 200, 250, 400, 500, 800, 1000, 1500, 2000])
  const m = elige(rand, [2, 4, 5, 6, 8, 10, 12, 15, 20])
  const CVu = elige(rand, [3, 4, 5, 6, 8, 10, 12, 15, 20, 25])
  return { CF: Q * m, P: CVu + m, CVu, Qe: Q }
}

export const SENSIBILIDAD = [
  ['CF', +1, 'sube'], ['CF', -1, 'baja'], ['P', +1, 'baja'], ['P', -1, 'sube'], ['CVu', +1, 'sube'], ['CVu', -1, 'baja'],
]

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const e = empresa(rand)
    const base = { id: ++seq, nivel, tipo, ...e }
    const { CF, P, CVu, Qe } = e
    const m = P - CVu

    if (tipo === 'leer') {
      // El cruce cae siempre en una marca del eje: Q*/2, Q*, 3Q*/2 o 2Q*.
      const ops = baraja(rand, [Qe / 2, Qe, (3 * Qe) / 2, 2 * Qe])
      return { ...base, bueno: Qe, opciones: ops }
    }
    if (tipo === 'zona') {
      const q = elige(rand, [Qe / 2, Qe, (3 * Qe) / 2])
      const bueno = q < Qe ? 'perdidas' : q > Qe ? 'beneficio' : 'equilibrio'
      return { ...base, q, bueno, opciones: ['perdidas', 'equilibrio', 'beneficio'] }
    }
    if (tipo === 'calcular') {
      const ops = opciones(rand, Qe, [Math.round(CF / P), Math.round(CF / CVu), Qe * 2, Math.round(CF / (P + CVu)), Qe / 2])
      if (!ops) continue
      return { ...base, bueno: Qe, opciones: ops }
    }
    if (tipo === 'beneficio') {
      const q = elige(rand, [Qe / 2, (3 * Qe) / 2, 2 * Qe, Qe * 3])
      const B = m * q - CF
      const ops = opciones(rand, B, [P * q - CF, m * q, -B, P * q, CF - m * q], { positivas: false })
      if (!ops) continue
      return { ...base, q, bueno: B, opciones: ops }
    }
    if (tipo === 'sensibilidad') {
      const [que, dir, bueno] = elige(rand, SENSIBILIDAD)
      return { ...base, que, dir, bueno, opciones: ['sube', 'baja', 'igual'] }
    }
    // precio: el mínimo para cubrir costes vendiendo Q* unidades
    const ops = opciones(rand, P, [Math.round((CF / Qe) * 100) / 100, CVu, P * 2, CVu + m * 2, Math.max(1, CVu - m)])
    if (!ops) continue
    return { ...base, bueno: P, opciones: ops }
  }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
export const esCorrecta = (r, o) => o === r.bueno

// ── Textos ────────────────────────────────────────────────────────────────
const ZONA = {
  perdidas: ['Pérdidas', 'Loss', 'Pèrdues'],
  equilibrio: ['Ni gana ni pierde', 'Breaks even', 'Ni guanya ni perd'],
  beneficio: ['Beneficio', 'Profit', 'Benefici'],
}
const DIR = { sube: ['Sube', 'Goes up', 'Puja'], baja: ['Baja', 'Goes down', 'Baixa'], igual: ['No cambia', 'Stays the same', 'No canvia'] }
const ix = l => (l === 'en' ? 1 : l === 'ca' ? 2 : 0)
const uds = (n, l) => s(l, `${num(n, l)} unidades`, `${num(n, l)} units`, `${num(n, l)} unitats`)

export function textoOpcion(o, r, l) {
  switch (r.tipo) {
    case 'zona': return ZONA[o][ix(l)]
    case 'sensibilidad': return DIR[o][ix(l)]
    case 'beneficio': return o < 0 ? s(l, `Pérdidas de ${eur(-o, l)}`, `Loss of ${eur(-o, l)}`, `Pèrdues de ${eur(-o, l)}`) : o === 0 ? s(l, '0 €', '€0', '0 €') : eur(o, l)
    case 'precio': return eur(o, l)
    default: return uds(o, l)
  }
}

// [sube, baja] en los tres idiomas, con la concordancia de cada uno.
const CAMBIO = {
  CF: [['suben los costes fijos', 'fixed costs go up', 'pugen els costos fixos'], ['bajan los costes fijos', 'fixed costs go down', 'baixen els costos fixos']],
  P: [['sube el precio de venta', 'the selling price goes up', 'puja el preu de venda'], ['baja el precio de venta', 'the selling price goes down', 'baixa el preu de venda']],
  CVu: [['sube el coste variable unitario', 'the variable cost per unit goes up', 'puja el cost variable unitari'], ['baja el coste variable unitario', 'the variable cost per unit goes down', 'baixa el cost variable unitari']],
}
export function enunciado(r, l) {
  switch (r.tipo) {
    case 'leer': return s(l, '¿En cuántas unidades está el punto muerto?', 'At how many units is the break-even point?', 'En quantes unitats hi ha el punt mort?')
    case 'zona': return s(l, `Si vende ${uds(r.q, l)}, ¿qué obtiene la empresa?`, `If it sells ${uds(r.q, l)}, what does the firm make?`, `Si en ven ${uds(r.q, l)}, què obté l’empresa?`)
    case 'calcular': return s(l, '¿Cuántas unidades tiene que vender para no perder dinero?', 'How many units must it sell not to lose money?', 'Quantes unitats ha de vendre per no perdre diners?')
    case 'beneficio': return s(l, `Si vende ${uds(r.q, l)}, ¿cuál es el resultado?`, `If it sells ${uds(r.q, l)}, what is the result?`, `Si en ven ${uds(r.q, l)}, quin és el resultat?`)
    case 'sensibilidad': {
      const cambio = CAMBIO[r.que][r.dir > 0 ? 0 : 1][ix(l)]
      return s(l, `Si ${cambio} y lo demás no cambia, ¿qué le pasa al punto muerto?`, `If ${cambio} and nothing else changes, what happens to the break-even point?`, `Si ${cambio} i la resta no canvia, què li passa al punt mort?`)
    }
    default: return s(l, `Quiere cubrir costes vendiendo ${uds(r.Qe, l)}. ¿Qué precio mínimo tiene que cobrar?`, `It wants to cover costs selling ${uds(r.Qe, l)}. What is the minimum price it must charge?`, `Vol cobrir costos venent ${uds(r.Qe, l)}. Quin preu mínim ha de cobrar?`)
  }
}

export function explicacion(r, l) {
  const { CF, P, CVu, Qe } = r
  const m = P - CVu
  const cf = sigla('CF', l), cvu = sigla('CVu', l)
  const margen = s(l, `margen por unidad = P − ${cvu} = ${num(P, l)} − ${num(CVu, l)} = ${num(m, l)} €`, `margin per unit = P − ${cvu} = ${num(P, l)} − ${num(CVu, l)} = €${num(m, l)}`, `marge per unitat = P − ${cvu} = ${num(P, l)} − ${num(CVu, l)} = ${num(m, l)} €`)
  const qe = s(l, `Q* = ${cf} / margen = ${num(CF, l)} / ${num(m, l)} = ${uds(Qe, l)}`, `Q* = ${cf} / margin = ${num(CF, l)} / ${num(m, l)} = ${uds(Qe, l)}`, `Q* = ${cf} / marge = ${num(CF, l)} / ${num(m, l)} = ${uds(Qe, l)}`)
  switch (r.tipo) {
    case 'leer': return s(l, `Es donde se cruzan la recta de ingresos y la de costes totales: ${uds(Qe, l)}. A la izquierda los costes son mayores (pérdidas); a la derecha, los ingresos (beneficio).`, `It is where the revenue line crosses the total cost line: ${uds(Qe, l)}. To the left costs are higher (loss); to the right, revenue (profit).`, `És on es creuen la recta d’ingressos i la de costos totals: ${uds(Qe, l)}. A l’esquerra els costos són més grans (pèrdues); a la dreta, els ingressos (benefici).`)
    case 'zona': return s(l, `El punto muerto está en ${uds(Qe, l)}. `, `The break-even point is at ${uds(Qe, l)}. `, `El punt mort és a ${uds(Qe, l)}. `)
      + (r.bueno === 'perdidas' ? s(l, 'Por debajo, los ingresos no cubren los costes: pérdidas.', 'Below it, revenue does not cover costs: a loss.', 'Per sota, els ingressos no cobreixen els costos: pèrdues.')
        : r.bueno === 'beneficio' ? s(l, 'Por encima, cada unidad de más deja su margen como beneficio.', 'Above it, every extra unit adds its margin as profit.', 'Per sobre, cada unitat de més deixa el seu marge com a benefici.')
          : s(l, 'Justo ahí ingresos y costes son iguales: ni gana ni pierde.', 'Right there revenue equals costs: it breaks even.', 'Just aquí ingressos i costos són iguals: ni guanya ni perd.'))
    case 'calcular': return `${margen}; ${qe}. ` + s(l, `Dividir solo entre el precio (${cf} / P) olvida que cada unidad también cuesta ${num(CVu, l)} € fabricarla.`, `Dividing by the price alone (${cf} / P) forgets that each unit also costs €${num(CVu, l)} to make.`, `Dividir només pel preu (${cf} / P) oblida que cada unitat també costa ${num(CVu, l)} € de fabricar.`)
    case 'beneficio': {
      const B = r.bueno
      return s(l, `B = margen · Q − ${cf} = ${num(m, l)} · ${num(r.q, l)} − ${num(CF, l)} = ${eur(B, l)}. `, `Profit = margin · Q − ${cf} = ${num(m, l)} · ${num(r.q, l)} − ${num(CF, l)} = ${eur(B, l)}. `, `B = marge · Q − ${cf} = ${num(m, l)} · ${num(r.q, l)} − ${num(CF, l)} = ${eur(B, l)}. `)
        + s(l, `Los costes fijos se pagan aunque no se venda nada; hasta ${uds(Qe, l)} solo sirven para cubrirlos.`, `Fixed costs are paid even if nothing is sold; up to ${uds(Qe, l)} sales only cover them.`, `Els costos fixos es paguen encara que no es vengui res; fins a ${uds(Qe, l)} només serveixen per cobrir-los.`)
    }
    case 'sensibilidad': {
      const motivo = r.que === 'CF'
        ? s(l, `Q* = ${cf} / margen: con más costes fijos hacen falta más unidades para cubrirlos, y con menos, menos.`, `Q* = ${cf} / margin: with higher fixed costs you need more units to cover them, and fewer with lower ones.`, `Q* = ${cf} / marge: amb més costos fixos calen més unitats per cobrir-los, i amb menys, menys.`)
        : r.que === 'P'
          ? s(l, `Un precio mayor ensancha el margen (P − ${cvu}), así que cada venta cubre más costes fijos y el punto muerto baja; un precio menor lo sube.`, `A higher price widens the margin (P − ${cvu}), so each sale covers more fixed cost and break-even falls; a lower price raises it.`, `Un preu més alt eixampla el marge (P − ${cvu}), així que cada venda cobreix més costos fixos i el punt mort baixa; un preu més baix el puja.`)
          : s(l, `Un ${cvu} mayor estrecha el margen (P − ${cvu}), así que hacen falta más ventas: el punto muerto sube; uno menor lo baja.`, `A higher ${cvu} narrows the margin (P − ${cvu}), so more sales are needed: break-even rises; a lower one lowers it.`, `Un ${cvu} més gran estreny el marge (P − ${cvu}), així que calen més vendes: el punt mort puja; un de més petit el baixa.`)
      return motivo
    }
    default: return s(l, `El precio tiene que cubrir el ${cvu} y su parte de los costes fijos: P = ${cvu} + ${cf} / Q = ${num(CVu, l)} + ${num(CF, l)} / ${num(Qe, l)} = ${eur(P, l)}. Cobrar solo ${cf} / Q olvida lo que cuesta fabricar cada unidad.`, `The price has to cover the ${cvu} and its share of fixed costs: P = ${cvu} + ${cf} / Q = ${num(CVu, l)} + ${num(CF, l)} / ${num(Qe, l)} = ${eur(P, l)}. Charging only ${cf} / Q forgets what each unit costs to make.`, `El preu ha de cobrir el ${cvu} i la seva part dels costos fixos: P = ${cvu} + ${cf} / Q = ${num(CVu, l)} + ${num(CF, l)} / ${num(Qe, l)} = ${eur(P, l)}. Cobrar només ${cf} / Q oblida el que costa fabricar cada unitat.`)
  }
}

export function datos(r, l) {
  // Lo que sale en la ficha de la empresa (en «precio» no se da el precio).
  const out = [[`${sigla('CF', l)}`, eur(r.CF, l)]]
  if (r.tipo !== 'precio') out.push(['P', s(l, `${eur(r.P, l)} / ud.`, `${eur(r.P, l)} / unit`, `${eur(r.P, l)} / u.`)])
  out.push([`${sigla('CVu', l)}`, s(l, `${eur(r.CVu, l)} / ud.`, `${eur(r.CVu, l)} / unit`, `${eur(r.CVu, l)} / u.`)])
  return out
}

export function schemaQuestion(r, l) {
  const d = datos(r, l).map(([k, v]) => `${k} = ${v}`).join(', ') + '. '
  return {
    question: `${d}${enunciado(r, l)}`,
    correctAnswer: textoOpcion(r.bueno, r, l),
    wrongAnswers: r.opciones.filter(o => o !== r.bueno).map(o => textoOpcion(o, r, l)),
  }
}
