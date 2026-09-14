// ── /recursos/estadistica: los parámetros de tus datos, paso a paso ─────────
//
// Tercer recurso interactivo. El alumno pega sus datos ("3, 5, 7, 7, 9") o la
// tabla de frecuencias del ejercicio, y ve la tabla completa, media, mediana,
// moda, rango, varianza y desviación típica, cada una con sus pasos, y el
// diagrama de barras.
//
// Tres decisiones:
//
// 1. Todo se calcula en FRACCIONES exactas (lib/expresion.js) y se escribe
//    como lo escribiría el alumno: si el resultado tiene decimales finitos va en
//    decimal (6,2); si no, en fracción con su aproximación (5/3 ≈ 1,67). Una
//    media de 6,199999999 no es un redondeo, es un error a ojos de quien la lee.
//
// 2. La coma. "2,5" es un decimal en España, y "3,5,7" es una lista. Regla:
//    una coma seguida de espacio separa ("3, 5, 7"); si en el texto hay ";",
//    espacios o saltos de línea, esos separan y las comas son decimales
//    ("2,5; 3,1" o "2,5 3,1"); si no hay nada de eso, la coma separa ("3,5,7").
//    La página enseña siempre los datos leídos, para que se vea la
//    interpretación.
//
// 3. Sin cuartiles. Cada libro de texto usa un método distinto y dan valores
//    distintos para los mismos datos: un recurso que no coincide con el libro
//    del alumno le hace dudar de su libro o de sí mismo.

import { frac, fracTexto, sumar, restar, multiplicar, dividir, valor, MENOS, ErrorExpresion } from './expresion'
import { tri, aprox } from './problemasFunciones'
import { leerNumero } from './problemasRectas'

const T = (l, es, en, ca) => ({ es, en, ca })[l]

export const RUTA = '/recursos/estadistica'
export const MAX_DATOS = 1000

export const EJEMPLOS_LISTA = ['3, 5, 7, 7, 9', '4 8 6 2', '1,5; 2; 2,5; 2; 3', '12 15 11 15 18 12 15 20']
export const EJEMPLOS_TABLA = [
  { valores: ['0', '1', '2', '3'], frecuencias: ['4', '6', '8', '2'] },
  { valores: ['5', '6', '7', '8', '9', '10'], frecuencias: ['2', '5', '9', '7', '4', '3'] },
]

// ── Números como los escribe un alumno ──────────────────────────────────────

// ¿Tiene la fracción una expresión decimal finita? Solo si el denominador no
// tiene más factores primos que 2 y 5.
function decimalFinito(fr) {
  let d = fr.d
  while (d % 2 === 0) d /= 2
  while (d % 5 === 0) d /= 5
  return d === 1
}

export function numTexto(fr, l = 'es') {
  if (fr.d === 1) return fracTexto(fr)
  if (decimalFinito(fr)) {
    const s = Math.abs(valor(fr)).toFixed(10).replace(/0+$/, '').replace(/\.$/, '')
    return `${fr.n < 0 ? MENOS : ''}${l === 'en' ? s : s.replace('.', ',')}`
  }
  return `${fracTexto(fr)} ≈ ${aprox(valor(fr), l)}`
}

// Solo el número, sin la aproximación: para meterlo dentro de una operación.
const corto = (fr, l) => (fr.d === 1 || decimalFinito(fr) ? numTexto(fr, l) : fracTexto(fr))

// √(n/d) simplificada: √(104/25) = 2√26/5.
function raizTexto(fr, l) {
  const k = fr.n * fr.d
  let fuera = 1, dentro = k
  for (let p = 2; p * p <= dentro; p++) {
    while (dentro % (p * p) === 0) { dentro /= p * p; fuera *= p }
  }
  const v = Math.sqrt(valor(fr))
  // El número de fuera y el denominador se simplifican entre sí: √104/5 es
  // 10√26/25 antes de simplificar y 2√26/5 después (lo cazó un test).
  const c = frac(fuera, fr.d)
  if (dentro === 1) return numTexto(c, l)
  const cuerpo = `${c.n === 1 ? '' : c.n}√${dentro}`
  return `${c.d === 1 ? cuerpo : `${cuerpo}/${c.d}`} ≈ ${aprox(v, l)}`
}

// ── Leer ────────────────────────────────────────────────────────────────────

export function trocearLista(texto) {
  const t = String(texto ?? '').trim()
  if (!t) return []
  const conSeparadores = t.replace(/,\s+/g, ';')
  return /[;\s]/.test(conSeparadores)
    ? conSeparadores.split(/[;\s]+/).filter(Boolean)
    : conSeparadores.split(',').filter(Boolean)
}

const numeroDato = trozo => {
  try {
    return leerNumero(trozo)
  } catch {
    throw new ErrorExpresion('dato', trozo)
  }
}

// Una lista → pares { x, f } ordenados por x.
export function leerLista(texto) {
  const trozos = trocearLista(texto)
  if (!trozos.length) throw new ErrorExpresion('vacia')
  if (trozos.length > MAX_DATOS) throw new ErrorExpresion('demasiados', String(MAX_DATOS))
  const cuenta = new Map()
  for (const t of trozos) {
    const x = numeroDato(t)
    const k = `${x.n}/${x.d}`
    cuenta.set(k, { x, f: (cuenta.get(k)?.f ?? 0) + 1 })
  }
  return [...cuenta.values()].sort((a, b) => valor(a.x) - valor(b.x))
}

// Una tabla de frecuencias. Devuelve { pares } o lanza con la fila que falla
// en `detalle` ("2:frecuencia") para marcar la casilla.
export function leerTabla(valores, frecuencias) {
  const cuenta = new Map()
  valores.forEach((v, i) => {
    const fTexto = String(frecuencias[i] ?? '').trim()
    if (!String(v ?? '').trim() && !fTexto) return // fila vacía: se ignora
    let x
    try { x = leerNumero(v) } catch { throw Object.assign(new ErrorExpresion('dato', String(v)), { fila: i, columna: 'valor' }) }
    const f = Number(fTexto.replace(',', '.'))
    if (!fTexto || !Number.isInteger(f) || f < 0) throw Object.assign(new ErrorExpresion('frecuencia', fTexto), { fila: i, columna: 'frecuencia' })
    const k = `${x.n}/${x.d}`
    cuenta.set(k, { x, f: (cuenta.get(k)?.f ?? 0) + f })
  })
  const pares = [...cuenta.values()].filter(p => p.f > 0).sort((a, b) => valor(a.x) - valor(b.x))
  if (!pares.length) throw new ErrorExpresion('vacia')
  if (pares.reduce((s, p) => s + p.f, 0) > 100000) throw new ErrorExpresion('demasiados', '100000')
  return pares
}

// ── Calcular ────────────────────────────────────────────────────────────────

// La operación escrita, cortada si es larga: nadie lee 40 sumandos.
function operacion(partes, max = 10) {
  return partes.length > max ? `${partes.slice(0, max - 1).join(' + ')} + … + ${partes[partes.length - 1]}` : partes.join(' + ')
}

export function calcular(pares) {
  const N = pares.reduce((s, p) => s + p.f, 0)
  const Nf = frac(N)
  const conFrecuencias = pares.some(p => p.f > 1)

  // Tabla de frecuencias
  let acumulada = 0
  const tabla = pares.map(p => {
    acumulada += p.f
    const hi = frac(p.f, N)
    return {
      x: p.x, fi: p.f, Fi: acumulada, hi,
      texto: l => ({ x: corto(p.x, l), hi: corto(hi, l), pct: `${aprox((p.f / N) * 100, l)} %` }),
    }
  })

  // Media
  const suma = pares.reduce((s, p) => sumar(s, multiplicar(p.x, frac(p.f))), frac(0))
  const media = dividir(suma, Nf)

  // Mediana: posiciones centrales, leídas con la frecuencia acumulada.
  const enPosicion = pos => tabla.find(t => t.Fi >= pos).x
  const impar = N % 2 === 1
  const posiciones = impar ? [(N + 1) / 2] : [N / 2, N / 2 + 1]
  const centrales = posiciones.map(enPosicion)
  const mediana = impar ? centrales[0] : dividir(sumar(centrales[0], centrales[1]), frac(2))

  // Moda
  const fmax = Math.max(...pares.map(p => p.f))
  const modas = pares.length > 1 && pares.every(p => p.f === fmax) ? [] : pares.filter(p => p.f === fmax).map(p => p.x)

  // Rango
  const min = pares[0].x, max = pares[pares.length - 1].x
  const rango = restar(max, min)

  // Varianza y desviación típica (poblacionales, las de ESO)
  const varianza = dividir(pares.reduce((s, p) => {
    const d = restar(p.x, media)
    return sumar(s, multiplicar(frac(p.f), multiplicar(d, d)))
  }, frac(0)), Nf)

  // ── Pasos ──
  const secciones = []
  const sumandos = l => pares.map(p => (p.f === 1 ? corto(p.x, l) : `${corto(p.x, l)}·${p.f}`))

  secciones.push({ id: 'media', titulo: tri(l => T(l, 'Media (x̄)', 'Mean (x̄)', 'Mitjana (x̄)')), pasos: [
    tri(l => (conFrecuencias
      ? T(l, 'Sumamos todos los datos: cada valor por las veces que aparece.', 'Add up all the data: each value times how often it appears.', 'Sumem totes les dades: cada valor per les vegades que apareix.')
      : T(l, 'Sumamos todos los datos.', 'Add up all the data.', 'Sumem totes les dades.'))),
    tri(l => `${operacion(sumandos(l))} = ${corto(suma, l)}`),
    tri(l => T(l,
      `Dividimos entre el número de datos, N = ${N}: x̄ = ${corto(suma, l)} / ${N} = ${numTexto(media, l)}`,
      `Divide by the number of data values, N = ${N}: x̄ = ${corto(suma, l)} / ${N} = ${numTexto(media, l)}`,
      `Dividim pel nombre de dades, N = ${N}: x̄ = ${corto(suma, l)} / ${N} = ${numTexto(media, l)}`)),
  ] })

  secciones.push({ id: 'mediana', titulo: tri(l => T(l, 'Mediana (Me)', 'Median (Me)', 'Mediana (Me)')), pasos: [
    tri(l => T(l,
      `Con los datos ordenados, la mediana es el valor del centro. Hay N = ${N} datos, que es ${impar ? 'impar' : 'par'}.`,
      `With the data sorted, the median is the middle value. There are N = ${N} values, which is ${impar ? 'odd' : 'even'}.`,
      `Amb les dades ordenades, la mediana és el valor del centre. Hi ha N = ${N} dades, que és ${impar ? 'senar' : 'parell'}.`)),
    tri(l => (impar
      ? T(l,
        `Posición central: (N + 1) / 2 = ${posiciones[0]}. El dato ${posiciones[0]}º es ${corto(centrales[0], l)}.`,
        `Middle position: (N + 1) / 2 = ${posiciones[0]}. Value number ${posiciones[0]} is ${corto(centrales[0], l)}.`,
        `Posició central: (N + 1) / 2 = ${posiciones[0]}. La dada ${posiciones[0]}a és ${corto(centrales[0], l)}.`)
      : T(l,
        `Hay dos datos en el centro, los que ocupan las posiciones ${posiciones[0]} y ${posiciones[1]}: ${corto(centrales[0], l)} y ${corto(centrales[1], l)}.`,
        `There are two middle values, in positions ${posiciones[0]} and ${posiciones[1]}: ${corto(centrales[0], l)} and ${corto(centrales[1], l)}.`,
        `Hi ha dues dades al centre, les que ocupen les posicions ${posiciones[0]} i ${posiciones[1]}: ${corto(centrales[0], l)} i ${corto(centrales[1], l)}.`))),
    ...(conFrecuencias ? [tri(l => T(l,
      'Para encontrar una posición, se busca la primera fila cuya frecuencia acumulada (Fᵢ) llega a ese número.',
      'To find a position, look for the first row whose cumulative frequency (Fᵢ) reaches that number.',
      'Per trobar una posició, es busca la primera fila la freqüència acumulada (Fᵢ) de la qual arriba a aquest nombre.'))] : []),
    tri(l => (impar
      ? `Me = ${numTexto(mediana, l)}`
      : `Me = (${corto(centrales[0], l)} + ${corto(centrales[1], l)}) / 2 = ${numTexto(mediana, l)}`)),
  ] })

  secciones.push({ id: 'moda', titulo: tri(l => T(l, 'Moda (Mo)', 'Mode (Mo)', 'Moda (Mo)')), pasos: [
    tri(l => {
      if (!modas.length) {
        return T(l,
          `Todos los valores aparecen el mismo número de veces (${fmax}): no hay moda.`,
          `Every value appears the same number of times (${fmax}): there is no mode.`,
          `Tots els valors apareixen el mateix nombre de vegades (${fmax}): no hi ha moda.`)
      }
      const lista = modas.map(m => corto(m, l)).join(T(l, ' y ', ' and ', ' i '))
      return modas.length === 1
        ? T(l, `El valor que más se repite es ${lista}, ${fmax} ${fmax === 1 ? 'vez' : 'veces'}: Mo = ${lista}.`, `The most repeated value is ${lista}, ${fmax} ${fmax === 1 ? 'time' : 'times'}: Mo = ${lista}.`, `El valor que més es repeteix és ${lista}, ${fmax} ${fmax === 1 ? 'vegada' : 'vegades'}: Mo = ${lista}.`)
        : T(l, `Hay empate: ${lista} aparecen ${fmax} veces cada uno. Tiene ${modas.length} modas.`, `There is a tie: ${lista} each appear ${fmax} times. It has ${modas.length} modes.`, `Hi ha empat: ${lista} apareixen ${fmax} vegades cadascun. Té ${modas.length} modes.`)
    }),
  ] })

  secciones.push({ id: 'rango', titulo: tri(l => T(l, 'Rango', 'Range', 'Rang')), pasos: [
    tri(l => T(l,
      `Máximo − mínimo = ${corto(max, l)} − ${corto(min, l).replace(/^−/, '(−') + (min.n < 0 ? ')' : '')} = ${numTexto(rango, l)}`,
      `Maximum − minimum = ${corto(max, l)} − ${corto(min, l).replace(/^−/, '(−') + (min.n < 0 ? ')' : '')} = ${numTexto(rango, l)}`,
      `Màxim − mínim = ${corto(max, l)} − ${corto(min, l).replace(/^−/, '(−') + (min.n < 0 ? ')' : '')} = ${numTexto(rango, l)}`)),
  ] })

  secciones.push({ id: 'desviacion', titulo: tri(l => T(l, 'Varianza y desviación típica', 'Variance and standard deviation', 'Variància i desviació típica')), pasos: [
    tri(l => T(l,
      'Cuánto se separan los datos de la media, de media. Para cada valor: la distancia a la media, al cuadrado, por su frecuencia.',
      'How far the data are from the mean, on average. For each value: its distance to the mean, squared, times its frequency.',
      'Quant se separen les dades de la mitjana, de mitjana. Per a cada valor: la distància a la mitjana, al quadrat, per la seva freqüència.')),
    tri(l => `σ² = Σ fᵢ·(xᵢ − x̄)² / N = (${operacion(pares.map(p => `${p.f === 1 ? '' : `${p.f}·`}(${corto(p.x, l)} − ${corto(media, l)})²`), 6)}) / ${N} = ${numTexto(varianza, l)}`),
    tri(l => `σ = √σ² = ${raizTexto(varianza, l)}`),
  ] })

  const resumen = [
    { id: 'n', etiqueta: tri(l => T(l, 'Datos (N)', 'Data (N)', 'Dades (N)')), valor: tri(() => String(N)) },
    { id: 'media', etiqueta: tri(l => T(l, 'Media', 'Mean', 'Mitjana')), valor: tri(l => numTexto(media, l)) },
    { id: 'mediana', etiqueta: tri(l => T(l, 'Mediana', 'Median', 'Mediana')), valor: tri(l => numTexto(mediana, l)) },
    { id: 'moda', etiqueta: tri(l => T(l, 'Moda', 'Mode', 'Moda')), valor: tri(l => (modas.length ? modas.map(m => corto(m, l)).join(', ') : T(l, 'No hay', 'None', 'No n\'hi ha'))) },
    { id: 'rango', etiqueta: tri(l => T(l, 'Rango', 'Range', 'Rang')), valor: tri(l => numTexto(rango, l)) },
    { id: 'desviacion', etiqueta: tri(l => T(l, 'Desviación típica', 'Standard deviation', 'Desviació típica')), valor: tri(l => raizTexto(varianza, l)) },
  ]

  return {
    ok: true,
    N,
    media: valor(media), mediana: valor(mediana), modas: modas.map(valor), rango: valor(rango),
    varianza: valor(varianza), desviacion: Math.sqrt(valor(varianza)),
    datosOrdenados: N <= 60 ? pares.flatMap(p => Array(p.f).fill(p.x)) : null,
    tabla, resumen, secciones,
    barras: pares.map(p => ({ x: valor(p.x), etiqueta: l => corto(p.x, l), f: p.f })),
  }
}

// Mismo contrato que los otros recursos: { ok, … } o { ok: false, error }.
// `error.campo` es 'lista', o 'fila-<i>-valor' / 'fila-<i>-frecuencia'.
export function resolverEstadistica({ modo, lista, valores = [], frecuencias = [] }) {
  try {
    const pares = modo === 'tabla' ? leerTabla(valores, frecuencias) : leerLista(lista)
    return calcular(pares)
  } catch (e) {
    if (!(e instanceof ErrorExpresion)) throw e
    const campo = e.fila !== undefined ? `fila-${e.fila}-${e.columna}` : modo === 'tabla' ? null : 'lista'
    return { ok: false, error: { campo, codigo: e.codigo, detalle: e.detalle } }
  }
}
