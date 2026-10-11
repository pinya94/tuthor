// Prepara la Disolución (química · disoluciones, ESO).
//
// Tipos de pregunta (y la trampa que cada uno pone a prueba):
//   partes       cuál es el soluto y cuál el disolvente   (el disolvente es el que hay en mayor cantidad)
//   gL           c = m / V en g/L, o despejar m o V       (no pasar los mL a litros)
//   comparar     qué vaso está más concentrado            (el que tiene más soluto no tiene por qué)
//   pct          % en masa = soluto / (soluto + disolvente) (dividir solo entre el disolvente)
//   solubilidad  cuánto queda sin disolver                 (creer que se disuelve todo)
//   diluir       c₁·V₁ = c₂·V₂ al añadir agua             (pensar que la concentración no cambia)
//   molaridad    M = n / V, con n = m / masa molar         (usar gramos en vez de moles)
//
// Todas las respuestas numéricas son exactas; la molaridad va en centésimas
// enteras (cM) para comparar sin decimales flotantes.

const T = (es, en, ca) => ({ es, en, ca })
const tx = (o, l) => o[l] ?? o.es
const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
export const num = (n, l = 'es') => n.toLocaleString(l === 'en' ? 'en-GB' : l === 'ca' ? 'ca-ES' : 'es-ES', { maximumFractionDigits: 2 })

export const NIVELES = {
  facil:   { tipos: ['partes', 'partes', 'gL', 'gL', 'comparar'], despejes: ['c'] },
  medio:   { tipos: ['gL', 'gL', 'comparar', 'pct', 'pct', 'solubilidad'], despejes: ['c', 'c', 'm'] },
  dificil: { tipos: ['gL', 'pct', 'solubilidad', 'diluir', 'diluir', 'molaridad', 'molaridad'], despejes: ['m', 'V'] },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
const exacto = x => Math.abs(x - Math.round(x)) < 1e-9
function opciones(rand, bueno, candidatos, ok = v => v > 0) {
  const vistos = new Set([bueno])
  const out = []
  for (const c of candidatos) {
    if (c == null || !Number.isFinite(c) || !exacto(c)) continue
    const v = Math.round(c)
    if (!ok(v) || vistos.has(v)) continue
    vistos.add(v); out.push(v)
    if (out.length === 3) break
  }
  return out.length === 3 ? baraja(rand, [bueno, ...out]) : null
}

// ── Bancos ────────────────────────────────────────────────────────────────
// Mezclas cotidianas con un soluto y un disolvente indiscutibles (el
// disolvente es el componente mayoritario).
export const COMPONENTES = {
  agua: T('Agua', 'Water', 'Aigua'),
  sal: T('Sal', 'Salt', 'Sal'),
  azucar: T('Azúcar', 'Sugar', 'Sucre'),
  co2: T('Dióxido de carbono', 'Carbon dioxide', 'Diòxid de carboni'),
  nitrogeno: T('Nitrógeno', 'Nitrogen', 'Nitrogen'),
  oxigeno: T('Oxígeno', 'Oxygen', 'Oxigen'),
  cobre: T('Cobre', 'Copper', 'Coure'),
  estano: T('Estaño', 'Tin', 'Estany'),
  acetico: T('Ácido acético', 'Acetic acid', 'Àcid acètic'),
  yodo: T('Yodo', 'Iodine', 'Iode'),
  alcohol: T('Alcohol', 'Alcohol', 'Alcohol'),
  hierro: T('Hierro', 'Iron', 'Ferro'),
  carbono: T('Carbono', 'Carbon', 'Carboni'),
}
export const MEZCLAS = [
  { id: 'aguaSalada', emoji: '🌊', soluto: 'sal', disolvente: 'agua', n: T('el agua del mar', 'seawater', 'l’aigua del mar') },
  { id: 'almibar', emoji: '🍯', soluto: 'azucar', disolvente: 'agua', n: T('el agua con azúcar', 'sugar water', 'l’aigua amb sucre') },
  { id: 'refresco', emoji: '🥤', soluto: 'co2', disolvente: 'agua', n: T('un refresco con gas', 'a fizzy drink', 'un refresc amb gas') },
  { id: 'aire', emoji: '🌬️', soluto: 'oxigeno', disolvente: 'nitrogeno', n: T('el aire (78 % nitrógeno, 21 % oxígeno)', 'air (78% nitrogen, 21% oxygen)', 'l’aire (78 % nitrogen, 21 % oxigen)') },
  { id: 'bronce', emoji: '🔔', soluto: 'estano', disolvente: 'cobre', n: T('el bronce (cobre con un poco de estaño)', 'bronze (copper with a little tin)', 'el bronze (coure amb una mica d’estany)') },
  { id: 'vinagre', emoji: '🥗', soluto: 'acetico', disolvente: 'agua', n: T('el vinagre', 'vinegar', 'el vinagre') },
  { id: 'yodo', emoji: '🧴', soluto: 'yodo', disolvente: 'alcohol', n: T('la tintura de yodo (yodo en alcohol)', 'tincture of iodine (iodine in alcohol)', 'la tintura de iode (iode en alcohol)') },
  { id: 'acero', emoji: '🔧', soluto: 'carbono', disolvente: 'hierro', n: T('el acero (hierro con un poco de carbono)', 'steel (iron with a little carbon)', 'l’acer (ferro amb una mica de carboni)') },
]

// Sustancias para la molaridad: masas molares redondas (g/mol).
export const SOLUTOS_MOL = {
  naoh: { f: 'NaOH', mm: 40 },
  glucosa: { f: 'C₆H₁₂O₆', mm: 180 },
  h2so4: { f: 'H₂SO₄', mm: 98 },
  nahco3: { f: 'NaHCO₃', mm: 84 },
}

// Solubilidad aproximada a 20 °C, en g por 100 g de agua.
export const SOLUBLES = {
  sal: { s: 36, n: T('sal (cloruro de sodio)', 'salt (sodium chloride)', 'sal (clorur de sodi)') },
  azucar: { s: 200, n: T('azúcar', 'sugar', 'sucre') },
  nitrato: { s: 32, n: T('nitrato de potasio', 'potassium nitrate', 'nitrat de potassi') },
  sulfato: { s: 20, n: T('sulfato de cobre', 'copper sulfate', 'sulfat de coure') },
}

// ── Generador ─────────────────────────────────────────────────────────────
let seq = 0

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const base = { id: ++seq, nivel, tipo }

    if (tipo === 'partes') {
      const mz = elige(rand, MEZCLAS)
      const pide = rand() < 0.5 ? 'soluto' : 'disolvente'
      const bueno = mz[pide]
      const otros = baraja(rand, Object.keys(COMPONENTES).filter(c => c !== mz.soluto && c !== mz.disolvente)).slice(0, 2)
      return { ...base, mezcla: mz.id, pide, bueno, opciones: baraja(rand, [mz.soluto, mz.disolvente, ...otros]) }
    }

    if (tipo === 'gL') {
      const despeje = elige(rand, cfg.despejes)
      const mL = elige(rand, [100, 200, 250, 400, 500, 750, 1000, 2000])
      const c = elige(rand, [2, 4, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 80])
      const g = (c * mL) / 1000
      if (!exacto(g) || g < 1) continue
      const L = mL / 1000
      if (despeje === 'c') {
        // g (no dividir), × 10 o ÷ 10 (litros mal pasados), g · L (multiplicar en vez de dividir)
        const ops = opciones(rand, c, [g, c * 10, c / 10, g * L, c * 2, c / 2])
        if (!ops) continue
        return { ...base, despeje, g, mL, c, bueno: c, opciones: ops }
      }
      if (despeje === 'm') {
        const ops = opciones(rand, g, [c * mL, c / L, g * 10, g / 10, c + mL / 100])
        if (!ops) continue
        return { ...base, despeje, g, mL, c, bueno: g, opciones: ops }
      }
      // V: la respuesta en mL
      // c / g al revés, g · c, y el volumen × 10 o ÷ 10
      const ops = opciones(rand, mL, [(c / g) * 1000, g * c, mL / 10, mL * 10, mL * 2])
      if (!ops) continue
      return { ...base, despeje, g, mL, c, bueno: mL, opciones: ops }
    }

    if (tipo === 'comparar') {
      // Tres vasos; el más concentrado NO es el que tiene más soluto.
      const vasos = []
      for (let i = 0; i < 40 && vasos.length < 3; i++) {
        const mL = elige(rand, [100, 200, 250, 500, 1000])
        const g = elige(rand, [5, 10, 15, 20, 25, 30, 40, 50])
        const c = (g * 1000) / mL
        if (c > 200) continue // más no es realista para sal o azúcar en agua
        if (vasos.some(v => v.c === c || v.g === g)) continue
        vasos.push({ g, mL, c })
      }
      if (vasos.length < 3) continue
      const iMaxC = vasos.reduce((b, v, i, a) => (v.c > a[b].c ? i : b), 0)
      const iMaxG = vasos.reduce((b, v, i, a) => (v.g > a[b].g ? i : b), 0)
      if (iMaxC === iMaxG) continue
      return { ...base, vasos, bueno: iMaxC, opciones: [0, 1, 2] }
    }

    if (tipo === 'pct') {
      const total = elige(rand, [100, 200, 250, 400, 500])
      const p = elige(rand, [2, 4, 5, 8, 10, 12, 15, 20, 25, 30, 40])
      const soluto = (total * p) / 100
      if (!exacto(soluto)) continue
      const disolvente = total - soluto
      const malo = (soluto / disolvente) * 100
      const ops = opciones(rand, p, [exacto(malo) ? malo : Math.round(malo) === p ? null : Math.round(malo), soluto, 100 - p, p * 2, p / 2 + 1, p + 10])
      if (!ops) continue
      return { ...base, soluto, disolvente, bueno: p, opciones: ops }
    }

    if (tipo === 'solubilidad') {
      const sId = elige(rand, Object.keys(SOLUBLES).filter(k => k !== 'azucar' || nivel === 'dificil'))
      const S = SOLUBLES[sId].s
      const agua = elige(rand, [50, 100, 200, 250])
      const cabe = (S * agua) / 100
      if (!exacto(cabe)) continue
      const echas = cabe + elige(rand, [0, 5, 10, 14, 20, 30, 40])
      const bueno = echas - cabe
      const ops = opciones(rand, bueno, [echas - S, S, 0, echas, bueno + 10, cabe], v => v >= 0)
      if (!ops) continue
      return { ...base, soluble: sId, agua, echas, cabe, bueno, opciones: ops }
    }

    if (tipo === 'diluir') {
      const v1 = elige(rand, [100, 200, 250, 500])
      const c1 = elige(rand, [10, 20, 40, 50, 60, 80, 100])
      const v2 = v1 * elige(rand, [2, 4, 5])
      const c2 = (c1 * v1) / v2
      if (!exacto(c2)) continue
      const ops = opciones(rand, c2, [c1, (c1 * v2) / v1, c1 - c2, c1 / 2 === c2 ? null : c1 / 2, c2 * 10])
      if (!ops) continue
      return { ...base, v1, c1, v2, bueno: c2, opciones: ops }
    }

    // molaridad
    const sId = elige(rand, Object.keys(SOLUTOS_MOL))
    const { mm } = SOLUTOS_MOL[sId]
    const n = elige(rand, [0.1, 0.2, 0.25, 0.5, 1, 2])
    const mL = elige(rand, [250, 500, 1000, 2000])
    const g = Math.round(n * mm * 100) / 100
    const cM = (n * 1000 / mL) * 100 // molaridad × 100
    if (!exacto(cM) || !exacto(g * 10)) continue
    const conGramos = (g / (mL / 1000)) * 100
    const sinLitros = (n / mL) * 100
    const ops = opciones(rand, Math.round(cM), [exacto(conGramos) ? conGramos : null, sinLitros * 1000 > 0 && exacto(n * mL * 100) ? n * mL * 100 : null, cM * 10, cM / 10, cM * 2, cM / 2], v => v > 0)
    if (!ops) continue
    return { ...base, soluto: sId, g, mL, n, bueno: Math.round(cM), opciones: ops }
  }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
export const esCorrecta = (r, o) => o === r.bueno

// ── Textos ────────────────────────────────────────────────────────────────
const LETRA = ['A', 'B', 'C']

export function textoOpcion(o, r, l) {
  switch (r.tipo) {
    case 'partes': return tx(COMPONENTES[o], l)
    case 'gL': return r.despeje === 'c' ? `${num(o, l)} g/L` : r.despeje === 'm' ? `${num(o, l)} g` : `${num(o, l)} mL`
    case 'comparar': return s(l, `Vaso ${LETRA[o]}`, `Beaker ${LETRA[o]}`, `Got ${LETRA[o]}`)
    case 'pct': return `${num(o, l)} %`
    case 'solubilidad': return `${num(o, l)} g`
    case 'diluir': return `${num(o, l)} g/L`
    default: return `${num(o / 100, l)} M`
  }
}

export function enunciado(r, l) {
  switch (r.tipo) {
    case 'partes': {
      const mz = MEZCLAS.find(m => m.id === r.mezcla)
      return r.pide === 'soluto'
        ? s(l, `En ${mz.n.es}, ¿cuál es el soluto?`, `In ${mz.n.en}, what is the solute?`, `En ${mz.n.ca}, quin és el solut?`)
        : s(l, `En ${mz.n.es}, ¿cuál es el disolvente?`, `In ${mz.n.en}, what is the solvent?`, `En ${mz.n.ca}, quin és el dissolvent?`)
    }
    case 'gL':
      if (r.despeje === 'c') return s(l, `Disuelves ${num(r.g, l)} g de sal y completas con agua hasta ${num(r.mL, l)} mL. ¿Qué concentración tiene?`, `You dissolve ${num(r.g, l)} g of salt and top up with water to ${num(r.mL, l)} mL. What is its concentration?`, `Dissols ${num(r.g, l)} g de sal i completes amb aigua fins a ${num(r.mL, l)} mL. Quina concentració té?`)
      if (r.despeje === 'm') return s(l, `Quieres ${num(r.mL, l)} mL de disolución a ${num(r.c, l)} g/L. ¿Cuántos gramos de soluto necesitas?`, `You want ${num(r.mL, l)} mL of solution at ${num(r.c, l)} g/L. How many grams of solute do you need?`, `Vols ${num(r.mL, l)} mL de dissolució a ${num(r.c, l)} g/L. Quants grams de solut necessites?`)
      return s(l, `Tienes ${num(r.g, l)} g de soluto y quieres una disolución a ${num(r.c, l)} g/L. ¿Hasta qué volumen completas con agua?`, `You have ${num(r.g, l)} g of solute and want a solution at ${num(r.c, l)} g/L. What volume do you top up to?`, `Tens ${num(r.g, l)} g de solut i vols una dissolució a ${num(r.c, l)} g/L. Fins a quin volum completes amb aigua?`)
    case 'comparar': return s(l, '¿Qué vaso tiene la disolución más concentrada?', 'Which beaker has the most concentrated solution?', 'Quin got té la dissolució més concentrada?')
    case 'pct': return s(l, `Disuelves ${num(r.soluto, l)} g de azúcar en ${num(r.disolvente, l)} g de agua. ¿Cuál es el porcentaje en masa de azúcar?`, `You dissolve ${num(r.soluto, l)} g of sugar in ${num(r.disolvente, l)} g of water. What is the percentage by mass of sugar?`, `Dissols ${num(r.soluto, l)} g de sucre en ${num(r.disolvente, l)} g d’aigua. Quin és el percentatge en massa de sucre?`)
    case 'solubilidad': {
      const S = SOLUBLES[r.soluble]
      return s(l,
        `La solubilidad de la ${S.n.es} es ${S.s} g por cada 100 g de agua. Echas ${num(r.echas, l)} g en ${r.agua} g de agua y remueves. ¿Cuánto queda sin disolver en el fondo?`,
        `The solubility of ${S.n.en} is ${S.s} g per 100 g of water. You add ${num(r.echas, l)} g to ${r.agua} g of water and stir. How much is left undissolved at the bottom?`,
        `La solubilitat de la ${S.n.ca} és ${S.s} g per cada 100 g d’aigua. Hi tires ${num(r.echas, l)} g en ${r.agua} g d’aigua i remenes. Quant en queda sense dissoldre al fons?`)
    }
    case 'diluir': return s(l, `Tienes ${r.v1} mL de una disolución a ${r.c1} g/L y añades agua hasta ${num(r.v2, l)} mL. ¿Qué concentración tiene ahora?`, `You have ${r.v1} mL of a solution at ${r.c1} g/L and add water up to ${num(r.v2, l)} mL. What is its concentration now?`, `Tens ${r.v1} mL d’una dissolució a ${r.c1} g/L i hi afegeixes aigua fins a ${num(r.v2, l)} mL. Quina concentració té ara?`)
    default: {
      const S = SOLUTOS_MOL[r.soluto]
      return s(l,
        `Disuelves ${num(r.g, l)} g de ${S.f} (masa molar ${S.mm} g/mol) y completas hasta ${num(r.mL, l)} mL. ¿Cuál es la molaridad?`,
        `You dissolve ${num(r.g, l)} g of ${S.f} (molar mass ${S.mm} g/mol) and top up to ${num(r.mL, l)} mL. What is the molarity?`,
        `Dissols ${num(r.g, l)} g de ${S.f} (massa molar ${S.mm} g/mol) i completes fins a ${num(r.mL, l)} mL. Quina és la molaritat?`)
    }
  }
}

export function explicacion(r, l) {
  switch (r.tipo) {
    case 'partes': {
      const mz = MEZCLAS.find(m => m.id === r.mezcla)
      return s(l,
        `El disolvente es el componente que hay en mayor cantidad (${tx(COMPONENTES[mz.disolvente], l).toLowerCase()}) y el soluto, el que está en menor cantidad y se disuelve en él (${tx(COMPONENTES[mz.soluto], l).toLowerCase()}). No hace falta que sean líquidos: también hay disoluciones de gases, como el aire, y de sólidos, como las aleaciones.`,
        `The solvent is the component present in the larger amount (${tx(COMPONENTES[mz.disolvente], l).toLowerCase()}) and the solute is the one in the smaller amount that dissolves in it (${tx(COMPONENTES[mz.soluto], l).toLowerCase()}). They do not have to be liquids: there are gas solutions, like air, and solid ones, like alloys.`,
        `El dissolvent és el component que hi ha en més quantitat (${tx(COMPONENTES[mz.disolvente], l).toLowerCase()}) i el solut, el que hi ha en menys quantitat i s’hi dissol (${tx(COMPONENTES[mz.soluto], l).toLowerCase()}). No cal que siguin líquids: també hi ha dissolucions de gasos, com l’aire, i de sòlids, com els aliatges.`)
    }
    case 'gL': {
      const L = num(r.mL / 1000, l)
      if (r.despeje === 'c') return s(l, `c = masa de soluto ÷ volumen en litros. ${num(r.mL, l)} mL = ${L} L, así que c = ${num(r.g, l)} ÷ ${L} = ${num(r.c, l)} g/L. El error típico es dividir entre los mL sin pasarlos a litros.`, `c = mass of solute ÷ volume in litres. ${num(r.mL, l)} mL = ${L} L, so c = ${num(r.g, l)} ÷ ${L} = ${num(r.c, l)} g/L. The usual mistake is dividing by the mL without converting to litres.`, `c = massa de solut ÷ volum en litres. ${num(r.mL, l)} mL = ${L} L, així que c = ${num(r.g, l)} ÷ ${L} = ${num(r.c, l)} g/L. L’error típic és dividir entre els mL sense passar-los a litres.`)
      if (r.despeje === 'm') return s(l, `m = c · V, con el volumen en litros: ${num(r.c, l)} g/L · ${L} L = ${num(r.g, l)} g.`, `m = c · V, with the volume in litres: ${num(r.c, l)} g/L · ${L} L = ${num(r.g, l)} g.`, `m = c · V, amb el volum en litres: ${num(r.c, l)} g/L · ${L} L = ${num(r.g, l)} g.`)
      return s(l, `V = m ÷ c = ${num(r.g, l)} ÷ ${num(r.c, l)} = ${L} L, que son ${num(r.mL, l)} mL.`, `V = m ÷ c = ${num(r.g, l)} ÷ ${num(r.c, l)} = ${L} L, which is ${num(r.mL, l)} mL.`, `V = m ÷ c = ${num(r.g, l)} ÷ ${num(r.c, l)} = ${L} L, que són ${num(r.mL, l)} mL.`)
    }
    case 'comparar': {
      const lineas = r.vasos.map((v, i) => `${LETRA[i]}: ${num(v.g, l)} g ÷ ${num(v.mL / 1000, l)} L = ${num(v.c, l)} g/L`).join('; ')
      return s(l, `Hay que dividir los gramos entre el volumen: ${lineas}. El vaso con más soluto no es el más concentrado si también tiene mucha más agua.`, `Divide the grams by the volume: ${lineas}. The beaker with the most solute is not the most concentrated if it also has much more water.`, `Cal dividir els grams entre el volum: ${lineas}. El got amb més solut no és el més concentrat si també té molta més aigua.`)
    }
    case 'pct': {
      const total = r.soluto + r.disolvente
      return s(l, `% en masa = masa de soluto ÷ masa de la disolución · 100, y la disolución es soluto + disolvente: ${num(r.soluto, l)} + ${num(r.disolvente, l)} = ${num(total, l)} g. ${num(r.soluto, l)} ÷ ${num(total, l)} · 100 = ${num(r.bueno, l)} %. Dividir solo entre el agua es el error típico.`, `% by mass = mass of solute ÷ mass of solution · 100, and the solution is solute + solvent: ${num(r.soluto, l)} + ${num(r.disolvente, l)} = ${num(total, l)} g. ${num(r.soluto, l)} ÷ ${num(total, l)} · 100 = ${num(r.bueno, l)}%. Dividing by the water alone is the usual mistake.`, `% en massa = massa de solut ÷ massa de la dissolució · 100, i la dissolució és solut + dissolvent: ${num(r.soluto, l)} + ${num(r.disolvente, l)} = ${num(total, l)} g. ${num(r.soluto, l)} ÷ ${num(total, l)} · 100 = ${num(r.bueno, l)} %. Dividir només entre l’aigua és l’error típic.`)
    }
    case 'solubilidad': {
      const S = SOLUBLES[r.soluble]
      const fin = r.bueno === 0
        ? s(l, 'Se disuelve todo: la disolución queda justo saturada.', 'It all dissolves: the solution is just saturated.', 'Es dissol tot: la dissolució queda just saturada.')
        : s(l, `Se disuelven ${num(r.cabe, l)} g y los otros ${num(r.bueno, l)} g se quedan en el fondo: la disolución está saturada.`, `${num(r.cabe, l)} g dissolve and the other ${num(r.bueno, l)} g stay at the bottom: the solution is saturated.`, `Es dissolen ${num(r.cabe, l)} g i els altres ${num(r.bueno, l)} g es queden al fons: la dissolució està saturada.`)
      return s(l, `En ${r.agua} g de agua caben ${S.s} · ${r.agua} ÷ 100 = ${num(r.cabe, l)} g como máximo. ${fin}`, `${r.agua} g of water can hold at most ${S.s} · ${r.agua} ÷ 100 = ${num(r.cabe, l)} g. ${fin}`, `En ${r.agua} g d’aigua hi caben ${S.s} · ${r.agua} ÷ 100 = ${num(r.cabe, l)} g com a màxim. ${fin}`)
    }
    case 'diluir': return s(l,
      `Al añadir agua, la cantidad de soluto no cambia, solo se reparte en más volumen: c₁ · V₁ = c₂ · V₂. ${r.c1} · ${r.v1} = c₂ · ${num(r.v2, l)}, así que c₂ = ${num(r.bueno, l)} g/L.`,
      `Adding water does not change the amount of solute, it just spreads it through more volume: c₁ · V₁ = c₂ · V₂. ${r.c1} · ${r.v1} = c₂ · ${num(r.v2, l)}, so c₂ = ${num(r.bueno, l)} g/L.`,
      `En afegir aigua, la quantitat de solut no canvia, només es reparteix en més volum: c₁ · V₁ = c₂ · V₂. ${r.c1} · ${r.v1} = c₂ · ${num(r.v2, l)}, així que c₂ = ${num(r.bueno, l)} g/L.`)
    default: {
      const S = SOLUTOS_MOL[r.soluto]
      return s(l,
        `Primero los moles: n = ${num(r.g, l)} g ÷ ${S.mm} g/mol = ${num(r.n, l)} mol. Luego M = n ÷ V en litros = ${num(r.n, l)} ÷ ${num(r.mL / 1000, l)} = ${num(r.bueno / 100, l)} mol/L. Dividir los gramos (y no los moles) entre el volumen da g/L, no molaridad.`,
        `First the moles: n = ${num(r.g, l)} g ÷ ${S.mm} g/mol = ${num(r.n, l)} mol. Then M = n ÷ V in litres = ${num(r.n, l)} ÷ ${num(r.mL / 1000, l)} = ${num(r.bueno / 100, l)} mol/L. Dividing the grams (not the moles) by the volume gives g/L, not molarity.`,
        `Primer els mols: n = ${num(r.g, l)} g ÷ ${S.mm} g/mol = ${num(r.n, l)} mol. Després M = n ÷ V en litres = ${num(r.n, l)} ÷ ${num(r.mL / 1000, l)} = ${num(r.bueno / 100, l)} mol/L. Dividir els grams (i no els mols) entre el volum dona g/L, no molaritat.`)
    }
  }
}

export function schemaQuestion(r, l) {
  const extra = r.tipo === 'comparar'
    ? ' ' + r.vasos.map((v, i) => `${LETRA[i]}: ${num(v.g, l)} g / ${num(v.mL, l)} mL.`).join(' ')
    : ''
  return {
    question: enunciado(r, l) + extra,
    correctAnswer: textoOpcion(r.bueno, r, l),
    wrongAnswers: r.opciones.filter(o => o !== r.bueno).map(o => textoOpcion(o, r, l)),
  }
}

// Intensidad del color de la disolución (0–1) según su concentración en g/L.
export const intensidad = c => Math.max(0.12, Math.min(1, c / 100))
