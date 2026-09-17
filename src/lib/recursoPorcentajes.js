// ── /recursos/porcentajes: porcentajes y regla de tres, exactos ─────────────
//
// Cuatro cálculos, cada uno con sus casillas: "el X % de N", "¿qué % es A de
// B?", la regla de tres directa y aumentos/descuentos. Todo con fracciones
// exactas (reutiliza lib/expresion) y se muestra como decimal exacto o
// "fracción ≈ decimal" (numTexto), así "1 de 3" sale "100/3 ≈ 33,33 %".

import { frac, sumar, restar, multiplicar, dividir, ErrorExpresion } from './expresion'
import { numTexto } from './recursoEstadistica'

export const RUTA = '/recursos/porcentajes'

const T = (l, es, en, ca) => ({ es, en, ca })[l] ?? es

// "2,5" / "2.5" / "15" → fracción exacta. Lanza si no es un número válido ≥ 0.
export function leerNumero(texto) {
  const s = String(texto ?? '').trim().replace(',', '.')
  if (!/^\d+(\.\d+)?$/.test(s)) throw new ErrorExpresion('numero', String(texto ?? ''))
  const [ent, dec = ''] = s.split('.')
  return frac(parseInt(ent + dec, 10), 10 ** dec.length)
}

const pct = (fr, l) => `${numTexto(fr, l)} %`

// Cada modo: sus campos y su cálculo. calcular(valores, lang) devuelve
// { ok, resultados:[{etiqueta, valor}], pasos:[string] } o { ok:false, error }.
export const MODOS = {
  'porcentaje-de': {
    campos: [
      { id: 'x', etiqueta: { es: 'Porcentaje (%)', en: 'Percentage (%)', ca: 'Percentatge (%)' }, placeholder: '15' },
      { id: 'n', etiqueta: { es: 'De la cantidad', en: 'Of the amount', ca: 'De la quantitat' }, placeholder: '80' },
    ],
    ejemplo: { x: '15', n: '80' },
    calcular(v, l) {
      try {
        const X = leerNumero(v.x), N = leerNumero(v.n)
        const res = multiplicar(dividir(X, frac(100)), N)
        return {
          ok: true,
          resultados: [{ etiqueta: T(l, `El ${v.x} % de ${v.n}`, `${v.x}% of ${v.n}`, `El ${v.x} % de ${v.n}`), valor: numTexto(res, l) }],
          pasos: [
            T(l, `El ${v.x} % significa ${v.x}/100.`, `${v.x}% means ${v.x}/100.`, `El ${v.x} % significa ${v.x}/100.`),
            T(l, `(${v.x}/100) × ${v.n} = ${numTexto(res, l)}`, `(${v.x}/100) × ${v.n} = ${numTexto(res, l)}`, `(${v.x}/100) × ${v.n} = ${numTexto(res, l)}`),
          ],
        }
      } catch { return { ok: false, error: 'incompleta' } }
    },
  },
  'que-porcentaje': {
    campos: [
      { id: 'a', etiqueta: { es: 'Número (parte)', en: 'Number (part)', ca: 'Número (part)' }, placeholder: '18' },
      { id: 'b', etiqueta: { es: 'Del total', en: 'Of the total', ca: 'Del total' }, placeholder: '60' },
    ],
    ejemplo: { a: '18', b: '60' },
    calcular(v, l) {
      try {
        const A = leerNumero(v.a), B = leerNumero(v.b)
        if (B.n === 0) return { ok: false, error: 'cero' }
        const res = multiplicar(dividir(A, B), frac(100))
        return {
          ok: true,
          resultados: [{ etiqueta: T(l, `${v.a} es, de ${v.b},`, `${v.a} out of ${v.b} is`, `${v.a} és, de ${v.b},`), valor: pct(res, l) }],
          pasos: [
            T(l, `Dividimos la parte entre el total: ${v.a} ÷ ${v.b}.`, `Divide the part by the total: ${v.a} ÷ ${v.b}.`, `Dividim la part entre el total: ${v.a} ÷ ${v.b}.`),
            T(l, `(${v.a} ÷ ${v.b}) × 100 = ${pct(res, l)}`, `(${v.a} ÷ ${v.b}) × 100 = ${pct(res, l)}`, `(${v.a} ÷ ${v.b}) × 100 = ${pct(res, l)}`),
          ],
        }
      } catch { return { ok: false, error: 'incompleta' } }
    },
  },
  'regla-de-tres': {
    campos: [
      { id: 'a', etiqueta: { es: 'Si esto…', en: 'If this…', ca: 'Si això…' }, placeholder: '3' },
      { id: 'b', etiqueta: { es: '…es esto', en: '…is this', ca: '…és això' }, placeholder: '12' },
      { id: 'c', etiqueta: { es: '¿Cuánto es esto?', en: 'how much is this?', ca: 'Quant és això?' }, placeholder: '5' },
    ],
    ejemplo: { a: '3', b: '12', c: '5' },
    calcular(v, l) {
      try {
        const A = leerNumero(v.a), B = leerNumero(v.b), C = leerNumero(v.c)
        if (A.n === 0) return { ok: false, error: 'cero' }
        const x = dividir(multiplicar(B, C), A)
        return {
          ok: true,
          resultados: [{ etiqueta: T(l, `${v.c} corresponde a`, `${v.c} corresponds to`, `${v.c} correspon a`), valor: numTexto(x, l) }],
          pasos: [
            T(l, `Proporción directa: si ${v.a} → ${v.b}, entonces ${v.c} → x.`, `Direct proportion: if ${v.a} → ${v.b}, then ${v.c} → x.`, `Proporció directa: si ${v.a} → ${v.b}, llavors ${v.c} → x.`),
            T(l, `x = (${v.b} × ${v.c}) ÷ ${v.a} = ${numTexto(x, l)}`, `x = (${v.b} × ${v.c}) ÷ ${v.a} = ${numTexto(x, l)}`, `x = (${v.b} × ${v.c}) ÷ ${v.a} = ${numTexto(x, l)}`),
          ],
        }
      } catch { return { ok: false, error: 'incompleta' } }
    },
  },
  'variacion': {
    campos: [
      { id: 'n', etiqueta: { es: 'Cantidad', en: 'Amount', ca: 'Quantitat' }, placeholder: '50' },
      { id: 'x', etiqueta: { es: 'Porcentaje (%)', en: 'Percentage (%)', ca: 'Percentatge (%)' }, placeholder: '20' },
    ],
    ejemplo: { n: '50', x: '20' },
    calcular(v, l) {
      try {
        const N = leerNumero(v.n), X = leerNumero(v.x)
        const f = dividir(X, frac(100))
        const aum = multiplicar(N, sumar(frac(1), f))
        const desc = multiplicar(N, restar(frac(1), f))
        return {
          ok: true,
          resultados: [
            { etiqueta: T(l, `Aumentar ${v.x} %`, `Increase by ${v.x}%`, `Augmentar ${v.x} %`), valor: numTexto(aum, l) },
            { etiqueta: T(l, `Descontar ${v.x} %`, `Discount ${v.x}%`, `Descomptar ${v.x} %`), valor: numTexto(desc, l) },
          ],
          pasos: [
            T(l, `Aumentar: ${v.n} × (1 + ${v.x}/100) = ${numTexto(aum, l)}`, `Increase: ${v.n} × (1 + ${v.x}/100) = ${numTexto(aum, l)}`, `Augmentar: ${v.n} × (1 + ${v.x}/100) = ${numTexto(aum, l)}`),
            T(l, `Descontar: ${v.n} × (1 − ${v.x}/100) = ${numTexto(desc, l)}`, `Discount: ${v.n} × (1 − ${v.x}/100) = ${numTexto(desc, l)}`, `Descomptar: ${v.n} × (1 − ${v.x}/100) = ${numTexto(desc, l)}`),
          ],
        }
      } catch { return { ok: false, error: 'incompleta' } }
    },
  },
}

// Variantes con URL propia. Cada una fija el modo por defecto y el enfoque SEO.
export const TIPOS = [
  {
    slug: '', emoji: '💯', modo: 'porcentaje-de',
    titulo: { es: 'Calculadora de porcentajes', en: 'Percentage calculator', ca: 'Calculadora de percentatges' },
    intro: {
      es: 'Calcula el X % de una cantidad, qué porcentaje es un número de otro, la regla de tres y aumentos o descuentos, paso a paso. Todo exacto.',
      en: 'Work out X% of an amount, what percentage one number is of another, direct proportion and increases or discounts, step by step. All exact.',
      ca: 'Calcula el X % d\'una quantitat, quin percentatge és un número d\'un altre, la regla de tres i augments o descomptes, pas a pas. Tot exacte.',
    },
  },
  {
    slug: 'regla-de-tres', emoji: '📐', modo: 'regla-de-tres',
    titulo: { es: 'Regla de tres online, paso a paso', en: 'Rule of three online, step by step', ca: 'Regla de tres en línia, pas a pas' },
    intro: {
      es: 'Resuelve una regla de tres directa: si una cantidad corresponde a otra, calcula cuánto le toca a una tercera, paso a paso y exacto.',
      en: 'Solve a direct rule of three: if one amount matches another, work out the value for a third, step by step and exact.',
      ca: 'Resol una regla de tres directa: si una quantitat correspon a una altra, calcula quant li toca a una tercera, pas a pas i exacte.',
    },
  },
  {
    slug: 'aumento-y-descuento', emoji: '🏷️', modo: 'variacion',
    titulo: { es: 'Aumentos y descuentos porcentuales', en: 'Percentage increases and discounts', ca: 'Augments i descomptes percentuals' },
    intro: {
      es: 'Sube o baja una cantidad un porcentaje: el precio con el descuento, el sueldo con la subida, el IVA. Verás las dos, paso a paso.',
      en: 'Raise or lower an amount by a percentage: the price with the discount, the salary with the rise, the VAT. You get both, step by step.',
      ca: 'Puja o baixa una quantitat un percentatge: el preu amb el descompte, el sou amb la pujada, l\'IVA. Veuràs les dues, pas a pas.',
    },
  },
  {
    slug: 'que-porcentaje-es', emoji: '🔍', modo: 'que-porcentaje',
    titulo: { es: '¿Qué porcentaje es un número de otro?', en: 'What percentage is one number of another?', ca: 'Quin percentatge és un número d\'un altre?' },
    intro: {
      es: 'Averigua qué porcentaje representa una parte sobre un total: cuánto has sacado sobre el máximo, qué parte del total es una cantidad, paso a paso.',
      en: 'Find out what percentage a part is of a total: your score out of the maximum, what share of the total an amount is, step by step.',
      ca: 'Esbrina quin percentatge representa una part sobre un total: quant has tret sobre el màxim, quina part del total és una quantitat, pas a pas.',
    },
  },
]

export const rutaDe = tipo => (tipo.slug ? `${RUTA}/${tipo.slug}` : RUTA)
export const tipoPorSlug = slug => TIPOS.find(t => t.slug === (slug ?? '')) ?? null
