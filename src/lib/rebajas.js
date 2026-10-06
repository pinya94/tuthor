// Rebajas (matemáticas · porcentajes, primaria y ESO): etiquetas de precio de
// una tienda. Descuentos, IVA, el precio de antes y comparar ofertas.
//
// Todo el dinero va en CÉNTIMOS enteros: así «¿es la respuesta?» es una
// comparación exacta y nunca un 14,999999 €.
//
// Tipos de pregunta (y la trampa que cada uno pone a prueba):
//   final       precio con descuento            (restar el % como si fueran €)
//   ahorro      cuánto te ahorras               (dar el precio final)
//   quePct      qué % de descuento es           (dividir entre el precio NUEVO)
//   iva         sumar el 21 % de IVA            (sumar 21 €)
//   sinIva      quitar el IVA a un precio final (restar el 21 % del final)
//   original    precio de antes de la rebaja    (sumar el % al precio rebajado)
//   encadenado  sube un % y baja el mismo %     (creer que vuelve al inicio)
//   doble       descuento + descuento extra     (sumar los dos porcentajes)
//   comparar    3×2, «2.ª a mitad», −x %        (fiarse del número más grande)
//
// Niveles: facil → final, ahorro (porcentajes redondos); medio → final, quePct,
// iva, comparar; dificil → original, sinIva, encadenado, doble, comparar.

export const IVA = 21

export const PRODUCTOS = {
  camiseta:   { emoji: '👕', min: 8, max: 30, nombre: { es: 'Camiseta', en: 'T-shirt', ca: 'Samarreta' } },
  zapatillas: { emoji: '👟', min: 30, max: 120, nombre: { es: 'Zapatillas', en: 'Trainers', ca: 'Sabatilles' } },
  auriculares:{ emoji: '🎧', min: 20, max: 150, nombre: { es: 'Auriculares', en: 'Headphones', ca: 'Auriculars' } },
  videojuego: { emoji: '🎮', min: 20, max: 70, nombre: { es: 'Videojuego', en: 'Video game', ca: 'Videojoc' } },
  movil:      { emoji: '📱', min: 150, max: 900, nombre: { es: 'Móvil', en: 'Mobile phone', ca: 'Mòbil' } },
  mochila:    { emoji: '🎒', min: 15, max: 60, nombre: { es: 'Mochila', en: 'Backpack', ca: 'Motxilla' } },
  reloj:      { emoji: '⌚', min: 20, max: 200, nombre: { es: 'Reloj', en: 'Watch', ca: 'Rellotge' } },
  bici:       { emoji: '🚲', min: 150, max: 600, nombre: { es: 'Bicicleta', en: 'Bicycle', ca: 'Bicicleta' } },
  libro:      { emoji: '📚', min: 8, max: 30, nombre: { es: 'Libro', en: 'Book', ca: 'Llibre' } },
  gafas:      { emoji: '🕶️', min: 15, max: 120, nombre: { es: 'Gafas de sol', en: 'Sunglasses', ca: 'Ulleres de sol' } },
  portatil:   { emoji: '💻', min: 300, max: 1200, nombre: { es: 'Portátil', en: 'Laptop', ca: 'Portàtil' } },
  balon:      { emoji: '⚽', min: 10, max: 40, nombre: { es: 'Balón', en: 'Football', ca: 'Pilota' } },
  guitarra:   { emoji: '🎸', min: 80, max: 400, nombre: { es: 'Guitarra', en: 'Guitar', ca: 'Guitarra' } },
  camara:     { emoji: '📷', min: 100, max: 800, nombre: { es: 'Cámara', en: 'Camera', ca: 'Càmera' } },
}

export const NIVELES = {
  facil:   { tipos: ['final', 'final', 'ahorro'], pcts: [10, 20, 25, 50, 75] },
  medio:   { tipos: ['final', 'quePct', 'iva', 'comparar'], pcts: [5, 10, 15, 20, 25, 30, 35, 40, 60, 70] },
  dificil: { tipos: ['original', 'sinIva', 'encadenado', 'doble', 'comparar'], pcts: [10, 15, 20, 25, 30, 40, 50] },
}

// Ofertas para comparar. `paga(n)`: cuántas unidades se pagan de n (puede
// llevar medias: «la 2.ª a mitad de precio»).
export const OFERTAS = {
  '3x2':   { paga: n => Math.floor(n / 3) * 2 + (n % 3), minimo: 3 },
  '4x3':   { paga: n => Math.floor(n / 4) * 3 + (n % 4), minimo: 4 },
  'mitad': { paga: n => Math.floor(n / 2) * 1.5 + (n % 2), minimo: 2 },
  'p20':   { paga: n => n * 0.8, minimo: 1 },
  'p25':   { paga: n => n * 0.75, minimo: 1 },
  'p30':   { paga: n => n * 0.7, minimo: 1 },
  'p40':   { paga: n => n * 0.6, minimo: 1 },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => [...xs].sort(() => rand() - 0.5)
const entero = x => Math.abs(x - Math.round(x)) < 1e-6

// Un precio «de tienda» en euros dentro del rango del producto: múltiplo de 5
// si es caro, de 1 si es barato.
function precio(rand, prod) {
  const paso = prod.max >= 100 ? 5 : 1
  const n = Math.floor((prod.max - prod.min) / paso) + 1
  return prod.min + paso * Math.floor(rand() * n)
}

// Rellena hasta tener 3 distractores distintos, positivos y ≠ bueno.
function opcionesNum(rand, bueno, candidatos) {
  const vistos = new Set([bueno])
  const out = []
  for (const c of candidatos) {
    const v = Math.round(c)
    if (v > 0 && !vistos.has(v)) { vistos.add(v); out.push(v) }
    if (out.length === 3) break
  }
  return out.length === 3 ? [bueno, ...out].sort((a, b) => a - b) : null
}

let seq = 0

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const prodId = elige(rand, Object.keys(PRODUCTOS))
    const prod = PRODUCTOS[prodId]
    const base = { id: ++seq, nivel, tipo, producto: prodId }
    const p = elige(rand, cfg.pcts)
    const e = precio(rand, prod)
    const c = e * 100 // céntimos

    if (tipo === 'final' || tipo === 'ahorro') {
      const ahorro = (c * p) / 100
      if (!entero(ahorro)) continue
      // En fácil, cuentas «de cabeza»: el resultado en euros o medios euros.
      if (nivel === 'facil' && ahorro % 50 !== 0) continue
      const final = c - ahorro
      if (tipo === 'final') {
        const ops = opcionesNum(rand, final, [ahorro, c - p * 100, (c * (100 + p)) / 100, c - ahorro / 2, final + 100])
        if (!ops) continue
        return { ...base, unidad: 'eur', antes: c, pct: -p, bueno: final, opciones: ops }
      }
      const ops = opcionesNum(rand, ahorro, [final, p * 100, ahorro * 2, ahorro / 2, ahorro + 100])
      if (!ops) continue
      return { ...base, unidad: 'eur', antes: c, pct: -p, bueno: ahorro, opciones: ops }
    }

    if (tipo === 'quePct') {
      const ahora = (c * (100 - p)) / 100
      if (!entero(ahora) || ahora % 100 !== 0) continue // precios redondos: la cuenta va del %
      const dif = (c - ahora) / 100 // en euros
      const malaBase = (dif * 100 * 100) / ahora // dividir entre el precio nuevo
      const cands = [dif, entero(malaBase) ? malaBase : null, 100 - p, p + 5, p - 5, p * 2].filter(x => x !== null && x > 0 && x < 100)
      const ops = opcionesNum(rand, p, cands)
      if (!ops) continue
      return { ...base, unidad: 'pct', antes: c, ahora, bueno: p, opciones: ops }
    }

    if (tipo === 'iva' || tipo === 'sinIva') {
      // Precio sin IVA redondo; con IVA siempre sale exacto en céntimos.
      const sin = c
      const con = (sin * (100 + IVA)) / 100
      if (tipo === 'iva') {
        const ops = opcionesNum(rand, con, [sin + IVA * 100, (sin * IVA) / 100, (sin * 110) / 100, (sin * 112) / 100])
        if (!ops) continue
        return { ...base, unidad: 'eur', sinIva: sin, bueno: con, opciones: ops }
      }
      if (sin === 10000) continue // con 100 € «restar 21 €» acierta por casualidad
      const ops = opcionesNum(rand, sin, [(con * (100 - IVA)) / 100, con - IVA * 100, (con * 100) / 110, (con * 100) / 120])
      if (!ops) continue
      return { ...base, unidad: 'eur', conIva: con, bueno: sin, opciones: ops }
    }

    if (tipo === 'original') {
      const ahora = (c * (100 - p)) / 100
      if (!entero(ahora) || ahora % 100 !== 0) continue
      const ops = opcionesNum(rand, c, [(ahora * (100 + p)) / 100, ahora + p * 100, (ahora * 100) / (100 + p), c + 500])
      if (!ops) continue
      return { ...base, unidad: 'eur', ahora, pct: -p, bueno: c, opciones: ops }
    }

    if (tipo === 'encadenado') {
      if (![10, 20, 25, 50].includes(p)) continue // porcentajes redondos: la sorpresa es el resultado, no la cuenta
      const sube = rand() < 0.5
      const pasos = sube ? [p, -p] : [-p, p]
      const final = (c * (100 + pasos[0]) * (100 + pasos[1])) / 10000
      if (!entero(final)) continue
      const ops = opcionesNum(rand, final, [c, (c * (100 + pasos[0])) / 100, c + (c * p * p) / 10000, c - 2 * (c * p * p) / 10000])
      if (!ops) continue
      return { ...base, unidad: 'eur', antes: c, pasos, bueno: final, opciones: ops }
    }

    if (tipo === 'doble') {
      const extra = elige(rand, [10, 20, 50].filter(x => x !== p))
      const final = (c * (100 - p) * (100 - extra)) / 10000
      if (!entero(final)) continue
      const suma = (c * (100 - p - extra)) / 100
      if (suma <= 0) continue
      const ops = opcionesNum(rand, final, [suma, (c * (100 - p)) / 100, (c * (100 - extra)) / 100, final + 100])
      if (!ops) continue
      return { ...base, unidad: 'eur', antes: c, pasos: [-p, -extra], bueno: final, opciones: ops }
    }

    // comparar: dos tiendas, el mismo producto y n unidades. Al menos una
    // oferta es de unidades (3×2, 4×3, mitad): «−20 % contra −40 %» no tiene
    // nada que pensar.
    const ids = baraja(rand, Object.keys(OFERTAS)).slice(0, 2)
    if (ids.every(id => id.startsWith('p'))) continue
    const n = elige(rand, [2, 3, 4, 6])
    if (ids.some(id => OFERTAS[id].minimo > n)) continue
    // Las ofertas «3×2», «4×3», «mitad» son de unidades: tienen que dar gratis algo
    const unidad = prod.max >= 100 ? 500 : 100
    const pu = Math.round(c / unidad) * unidad
    const coste = id => Math.round(OFERTAS[id].paga(n) * pu)
    const [a, b] = ids.map(coste)
    if (!entero(OFERTAS[ids[0]].paga(n) * pu) || !entero(OFERTAS[ids[1]].paga(n) * pu)) continue
    const bueno = a < b ? 'A' : b < a ? 'B' : 'igual'
    return { ...base, unidad: 'tienda', n, precioUnidad: pu, ofertas: ids, costes: [a, b], bueno, opciones: ['A', 'B', 'igual'] }
  }
}

export const esCorrecta = (ronda, r) => r === ronda.bueno
export const genRound = difficulty => genRonda(difficulty)
export const isCorrect = esCorrecta

// ── Formato ──────────────────────────────────────────────────────────────
const tx = (l, es, en, ca) => ({ es, en, ca })[l] ?? es
const LOCALE = { es: 'es-ES', en: 'en-GB', ca: 'ca-ES' }

// Crear un Intl.NumberFormat es caro: uno por idioma y por «con/sin céntimos».
const FORMATOS = new Map()
function formato(l, decimales) {
  const k = l + decimales
  if (!FORMATOS.has(k)) {
    FORMATOS.set(k, new Intl.NumberFormat(LOCALE[l] ?? 'es-ES', {
      style: 'currency', currency: 'EUR', minimumFractionDigits: decimales, maximumFractionDigits: 2,
    }))
  }
  return FORMATOS.get(k)
}
export function eur(cent, l = 'es') {
  const v = cent / 100
  return formato(l, Number.isInteger(v) ? 0 : 2).format(v)
}
export const num = (x, l) => (l === 'en' ? String(x) : String(x).replace('.', ','))
export const pct = (x, l) => (l === 'en' ? `${x}%` : `${x} %`)
const factor = (p, l) => num(Math.round((100 + p)) / 100, l) // −25 → 0,75 · +21 → 1,21
const pctSigno = (p, l) => (p > 0 ? '+' : '−') + pct(Math.abs(p), l)

export const nombreProducto = (ronda, l) => PRODUCTOS[ronda.producto].nombre[l] ?? PRODUCTOS[ronda.producto].nombre.es

export function textoOferta(id, l) {
  if (id === '3x2') return tx(l, '3×2', '3 for 2', '3×2')
  if (id === '4x3') return tx(l, '4×3', '4 for 3', '4×3')
  if (id === 'mitad') return tx(l, '2.ª unidad a mitad de precio', '2nd one half price', '2a unitat a meitat de preu')
  return tx(l, `−${pct(+id.slice(1), l)} en todo`, `${pct(+id.slice(1), l)} off everything`, `−${pct(+id.slice(1), l)} en tot`)
}

export function textoOpcion(o, ronda, l) {
  if (ronda.unidad === 'eur') return eur(o, l)
  if (ronda.unidad === 'pct') return pct(o, l)
  if (o === 'A') return tx(l, 'Tienda A', 'Shop A', 'Botiga A')
  if (o === 'B') return tx(l, 'Tienda B', 'Shop B', 'Botiga B')
  return tx(l, 'Cuestan lo mismo', 'Same price', 'Costen el mateix')
}

export function enunciado(ronda, l) {
  switch (ronda.tipo) {
    case 'final': return tx(l, '¿Cuánto pagas con el descuento?', 'How much do you pay with the discount?', 'Quant pagues amb el descompte?')
    case 'ahorro': return tx(l, '¿Cuánto dinero te ahorras?', 'How much money do you save?', 'Quants diners t’estalvies?')
    case 'quePct': return tx(l, '¿Qué porcentaje de descuento le han hecho?', 'What percentage discount is it?', 'Quin percentatge de descompte li han fet?')
    case 'iva': return tx(l, `¿Cuánto cuesta con el IVA (${pct(IVA, l)})?`, `How much is it with VAT (${pct(IVA, l)})?`, `Quant costa amb l’IVA (${pct(IVA, l)})?`)
    case 'sinIva': return tx(l, `El precio ya incluye el IVA (${pct(IVA, l)}). ¿Cuánto es sin IVA?`, `The price already includes VAT (${pct(IVA, l)}). How much is it without VAT?`, `El preu ja inclou l’IVA (${pct(IVA, l)}). Quant és sense IVA?`)
    case 'original': return tx(l, '¿Cuánto costaba antes de la rebaja?', 'How much did it cost before the sale?', 'Quant costava abans de la rebaixa?')
    case 'encadenado': return tx(l, '¿Cuánto cuesta al final?', 'How much does it cost in the end?', 'Quant costa al final?')
    case 'doble': return tx(l, '¿Cuánto pagas en caja?', 'How much do you pay at the till?', 'Quant pagues a la caixa?')
    default: return tx(l, `Quieres ${ronda.n}. ¿Dónde pagas menos?`, `You want ${ronda.n}. Where do you pay less?`, `En vols ${ronda.n}. On pagues menys?`)
  }
}

export function explicacion(ronda, l) {
  const r = ronda
  switch (r.tipo) {
    case 'final': {
      const p = -r.pct
      return tx(l,
        `Un ${pct(p, l)} de descuento es pagar el ${pct(100 - p, l)}: ${eur(r.antes, l)} × ${factor(r.pct, l)} = ${eur(r.bueno, l)}.`,
        `${pct(p, l)} off means paying ${pct(100 - p, l)}: ${eur(r.antes, l)} × ${factor(r.pct, l)} = ${eur(r.bueno, l)}.`,
        `Un ${pct(p, l)} de descompte és pagar el ${pct(100 - p, l)}: ${eur(r.antes, l)} × ${factor(r.pct, l)} = ${eur(r.bueno, l)}.`)
    }
    case 'ahorro': {
      const p = -r.pct
      return tx(l,
        `Te ahorras el ${pct(p, l)} de ${eur(r.antes, l)}: ${eur(r.antes, l)} × ${num(p / 100, l)} = ${eur(r.bueno, l)}. Pagas ${eur(r.antes - r.bueno, l)}.`,
        `You save ${pct(p, l)} of ${eur(r.antes, l)}: ${eur(r.antes, l)} × ${num(p / 100, l)} = ${eur(r.bueno, l)}. You pay ${eur(r.antes - r.bueno, l)}.`,
        `T’estalvies el ${pct(p, l)} de ${eur(r.antes, l)}: ${eur(r.antes, l)} × ${num(p / 100, l)} = ${eur(r.bueno, l)}. Pagues ${eur(r.antes - r.bueno, l)}.`)
    }
    case 'quePct': {
      const dif = r.antes - r.ahora
      return tx(l,
        `Ha bajado ${eur(dif, l)}. El porcentaje se calcula sobre el precio de ANTES: ${eur(dif, l)} ÷ ${eur(r.antes, l)} = ${num(r.bueno / 100, l)} → ${pct(r.bueno, l)}.`,
        `It dropped by ${eur(dif, l)}. The percentage is worked out on the price BEFORE: ${eur(dif, l)} ÷ ${eur(r.antes, l)} = ${num(r.bueno / 100, l)} → ${pct(r.bueno, l)}.`,
        `Ha baixat ${eur(dif, l)}. El percentatge es calcula sobre el preu d’ABANS: ${eur(dif, l)} ÷ ${eur(r.antes, l)} = ${num(r.bueno / 100, l)} → ${pct(r.bueno, l)}.`)
    }
    case 'iva':
      return tx(l,
        `Sumar un ${pct(IVA, l)} es multiplicar por ${factor(IVA, l)}: ${eur(r.sinIva, l)} × ${factor(IVA, l)} = ${eur(r.bueno, l)}.`,
        `Adding ${pct(IVA, l)} means multiplying by ${factor(IVA, l)}: ${eur(r.sinIva, l)} × ${factor(IVA, l)} = ${eur(r.bueno, l)}.`,
        `Sumar un ${pct(IVA, l)} és multiplicar per ${factor(IVA, l)}: ${eur(r.sinIva, l)} × ${factor(IVA, l)} = ${eur(r.bueno, l)}.`)
    case 'sinIva':
      return tx(l,
        `El precio con IVA es el ${pct(100 + IVA, l)} del precio sin IVA, así que se divide: ${eur(r.conIva, l)} ÷ ${factor(IVA, l)} = ${eur(r.bueno, l)}. Restarle el ${pct(IVA, l)} al precio final no sirve: ese ${pct(IVA, l)} se calculó sobre una cantidad más pequeña.`,
        `The price with VAT is ${pct(100 + IVA, l)} of the price without it, so you divide: ${eur(r.conIva, l)} ÷ ${factor(IVA, l)} = ${eur(r.bueno, l)}. Taking ${pct(IVA, l)} off the final price does not work: that ${pct(IVA, l)} was worked out on a smaller amount.`,
        `El preu amb IVA és el ${pct(100 + IVA, l)} del preu sense IVA, així que es divideix: ${eur(r.conIva, l)} ÷ ${factor(IVA, l)} = ${eur(r.bueno, l)}. Restar el ${pct(IVA, l)} al preu final no serveix: aquest ${pct(IVA, l)} es va calcular sobre una quantitat més petita.`)
    case 'original': {
      const p = -r.pct
      return tx(l,
        `Pagar ${eur(r.ahora, l)} es pagar el ${pct(100 - p, l)} del precio de antes: ${eur(r.ahora, l)} ÷ ${factor(r.pct, l)} = ${eur(r.bueno, l)}. Sumarle un ${pct(p, l)} a ${eur(r.ahora, l)} no da lo mismo: el ${pct(p, l)} era de ${eur(r.bueno, l)}.`,
        `Paying ${eur(r.ahora, l)} is paying ${pct(100 - p, l)} of the old price: ${eur(r.ahora, l)} ÷ ${factor(r.pct, l)} = ${eur(r.bueno, l)}. Adding ${pct(p, l)} to ${eur(r.ahora, l)} is not the same: the ${pct(p, l)} was of ${eur(r.bueno, l)}.`,
        `Pagar ${eur(r.ahora, l)} és pagar el ${pct(100 - p, l)} del preu d’abans: ${eur(r.ahora, l)} ÷ ${factor(r.pct, l)} = ${eur(r.bueno, l)}. Sumar un ${pct(p, l)} a ${eur(r.ahora, l)} no dona el mateix: el ${pct(p, l)} era de ${eur(r.bueno, l)}.`)
    }
    case 'encadenado': {
      const [a, b] = r.pasos
      return tx(l,
        `Cada paso multiplica: ${eur(r.antes, l)} × ${factor(a, l)} × ${factor(b, l)} = ${eur(r.bueno, l)}. No vuelve a ${eur(r.antes, l)}: el segundo ${pct(Math.abs(b), l)} se calcula sobre otro precio.`,
        `Each step multiplies: ${eur(r.antes, l)} × ${factor(a, l)} × ${factor(b, l)} = ${eur(r.bueno, l)}. It does not go back to ${eur(r.antes, l)}: the second ${pct(Math.abs(b), l)} is worked out on a different price.`,
        `Cada pas multiplica: ${eur(r.antes, l)} × ${factor(a, l)} × ${factor(b, l)} = ${eur(r.bueno, l)}. No torna a ${eur(r.antes, l)}: el segon ${pct(Math.abs(b), l)} es calcula sobre un altre preu.`)
    }
    case 'doble': {
      const [a, b] = r.pasos
      const total = Math.round((1 - ((100 + a) * (100 + b)) / 10000) * 100)
      return tx(l,
        `Los descuentos seguidos se multiplican: ${eur(r.antes, l)} × ${factor(a, l)} × ${factor(b, l)} = ${eur(r.bueno, l)}. En total es un ${pct(total, l)}, no un ${pct(-a - b, l)}: el segundo descuento se aplica a un precio ya rebajado.`,
        `Successive discounts multiply: ${eur(r.antes, l)} × ${factor(a, l)} × ${factor(b, l)} = ${eur(r.bueno, l)}. In total it is ${pct(total, l)}, not ${pct(-a - b, l)}: the second discount applies to a price already reduced.`,
        `Els descomptes seguits es multipliquen: ${eur(r.antes, l)} × ${factor(a, l)} × ${factor(b, l)} = ${eur(r.bueno, l)}. En total és un ${pct(total, l)}, no un ${pct(-a - b, l)}: el segon descompte s’aplica a un preu ja rebaixat.`)
    }
    default: {
      const linea = (i, letra) => {
        const id = r.ofertas[i]
        const paga = OFERTAS[id].paga(r.n)
        return id.startsWith('p')
          ? `${letra}: ${r.n} × ${eur(r.precioUnidad, l)} × ${factor(-(+id.slice(1)), l)} = ${eur(r.costes[i], l)}`
          : `${letra}: ${tx(l, `pagas ${num(paga, l)} de ${r.n}`, `you pay for ${num(paga, l)} of ${r.n}`, `pagues ${num(paga, l)} de ${r.n}`)} → ${num(paga, l)} × ${eur(r.precioUnidad, l)} = ${eur(r.costes[i], l)}`
      }
      const fin = r.bueno === 'igual'
        ? tx(l, 'Sale igual en las dos.', 'It comes to the same in both.', 'Surt igual a les dues.')
        : tx(l, `Sale más barato en la tienda ${r.bueno}.`, `Shop ${r.bueno} is cheaper.`, `Surt més barat a la botiga ${r.bueno}.`)
      return `${linea(0, 'A')}. ${linea(1, 'B')}. ${fin}`
    }
  }
}

// JSON-LD / ejemplos: la pregunta entera en texto.
export function schemaQuestion(ronda, l) {
  const r = ronda
  const prod = nombreProducto(r, l)
  let datos
  switch (r.tipo) {
    case 'final': case 'ahorro': datos = `${prod}: ${eur(r.antes, l)}, ${pctSigno(r.pct, l)}.`; break
    case 'quePct': datos = `${prod}: ${tx(l, 'antes', 'before', 'abans')} ${eur(r.antes, l)}, ${tx(l, 'ahora', 'now', 'ara')} ${eur(r.ahora, l)}.`; break
    case 'iva': datos = `${prod}: ${eur(r.sinIva, l)} ${tx(l, 'sin IVA', 'without VAT', 'sense IVA')}.`; break
    case 'sinIva': datos = `${prod}: ${eur(r.conIva, l)} ${tx(l, 'con IVA', 'with VAT', 'amb IVA')}.`; break
    case 'original': datos = `${prod}: ${tx(l, 'ahora', 'now', 'ara')} ${eur(r.ahora, l)}, ${tx(l, 'rebajado un', 'reduced by', 'rebaixat un')} ${pct(-r.pct, l)}.`; break
    case 'encadenado': case 'doble': datos = `${prod}: ${eur(r.antes, l)}, ${r.pasos.map(p => pctSigno(p, l)).join(tx(l, ' y después ', ' and then ', ' i després '))}.`; break
    default: datos = `${prod}: ${eur(r.precioUnidad, l)}. A: ${textoOferta(r.ofertas[0], l)}. B: ${textoOferta(r.ofertas[1], l)}.`
  }
  return {
    question: `${datos} ${enunciado(r, l)}`,
    correctAnswer: textoOpcion(r.bueno, r, l),
    wrongAnswers: r.opciones.filter(o => o !== r.bueno).map(o => textoOpcion(o, r, l)),
  }
}
