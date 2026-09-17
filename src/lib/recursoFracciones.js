// ── /recursos/fracciones: operar y simplificar fracciones, exacto ───────────
//
// Tres cálculos con casillas de numerador y denominador: sumar y restar (con
// denominador común), multiplicar y dividir (por el inverso) y simplificar
// (dividiendo entre el m.c.d.). Reutiliza las fracciones exactas de
// lib/expresion (frac ya reduce y normaliza el signo) y numTexto para el
// decimal. Solo matemática; los textos de explicación se arman por idioma.

import { frac, fracTexto, ErrorExpresion } from './expresion'
import { numTexto } from './recursoEstadistica'

export const RUTA = '/recursos/fracciones'

const T = (l, es, en, ca) => ({ es, en, ca })[l] ?? es
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1 }
const lcm = (a, b) => Math.abs((a / gcd(a, b)) * b)
const S = n => (n < 0 ? `−${Math.abs(n)}` : `${n}`) // entero con el menos tipográfico

// numerador: entero (con signo); denominador: entero positivo.
function leerEntero(t) {
  const s = String(t ?? '').trim().replace('−', '-')
  if (!/^-?\d+$/.test(s)) throw new ErrorExpresion('numero', String(t ?? ''))
  return parseInt(s, 10)
}
function leerNat(t) {
  const n = leerEntero(t)
  if (n < 1) throw new ErrorExpresion('numero', String(t ?? ''))
  return n
}

export const MODOS = {
  'suma-resta': {
    slots: [{ n: 'a', d: 'b' }, { n: 'c', d: 'd' }], op: '±',
    ejemplo: { a: '1', b: '2', c: '1', d: '3' },
    calcular(v, l) {
      try {
        const a = leerEntero(v.a), b = leerNat(v.b), c = leerEntero(v.c), d = leerNat(v.d)
        const L = lcm(b, d)
        const na = a * (L / b), nc = c * (L / d)
        const suma = frac(na + nc, L), resta = frac(na - nc, L)
        return {
          ok: true,
          resultados: [
            { etiqueta: `${a}/${b} + ${c}/${d}`, valor: fracTexto(suma) },
            { etiqueta: `${a}/${b} − ${c}/${d}`, valor: fracTexto(resta) },
          ],
          pasos: [
            T(l, `Denominador común: el m.c.m. de ${b} y ${d} es ${L}.`, `Common denominator: the LCM of ${b} and ${d} is ${L}.`, `Denominador comú: el m.c.m. de ${b} i ${d} és ${L}.`),
            T(l, `${a}/${b} = ${S(na)}/${L}   y   ${c}/${d} = ${S(nc)}/${L}`, `${a}/${b} = ${S(na)}/${L}   and   ${c}/${d} = ${S(nc)}/${L}`, `${a}/${b} = ${S(na)}/${L}   i   ${c}/${d} = ${S(nc)}/${L}`),
            T(l, `Suma: (${S(na)} + ${S(nc)})/${L} = ${S(na + nc)}/${L} = ${fracTexto(suma)}`, `Sum: (${S(na)} + ${S(nc)})/${L} = ${S(na + nc)}/${L} = ${fracTexto(suma)}`, `Suma: (${S(na)} + ${S(nc)})/${L} = ${S(na + nc)}/${L} = ${fracTexto(suma)}`),
            T(l, `Resta: (${S(na)} − ${S(nc)})/${L} = ${S(na - nc)}/${L} = ${fracTexto(resta)}`, `Difference: (${S(na)} − ${S(nc)})/${L} = ${S(na - nc)}/${L} = ${fracTexto(resta)}`, `Resta: (${S(na)} − ${S(nc)})/${L} = ${S(na - nc)}/${L} = ${fracTexto(resta)}`),
          ],
        }
      } catch { return { ok: false, error: 'incompleta' } }
    },
  },
  'multiplicar-dividir': {
    slots: [{ n: 'a', d: 'b' }, { n: 'c', d: 'd' }], op: '× ÷',
    ejemplo: { a: '2', b: '3', c: '4', d: '5' },
    calcular(v, l) {
      try {
        const a = leerEntero(v.a), b = leerNat(v.b), c = leerEntero(v.c), d = leerNat(v.d)
        if (c === 0) return { ok: false, error: 'cero' }
        const prod = frac(a * c, b * d), quot = frac(a * d, b * c)
        return {
          ok: true,
          resultados: [
            { etiqueta: `${a}/${b} × ${c}/${d}`, valor: fracTexto(prod) },
            { etiqueta: `${a}/${b} ÷ ${c}/${d}`, valor: fracTexto(quot) },
          ],
          pasos: [
            T(l, `Multiplicar: numerador por numerador y denominador por denominador: (${a}×${c})/(${b}×${d}) = ${S(a * c)}/${b * d} = ${fracTexto(prod)}`, `Multiply straight across: (${a}×${c})/(${b}×${d}) = ${S(a * c)}/${b * d} = ${fracTexto(prod)}`, `Multiplicar en línia: (${a}×${c})/(${b}×${d}) = ${S(a * c)}/${b * d} = ${fracTexto(prod)}`),
            T(l, `Dividir es multiplicar por el inverso: ${a}/${b} × ${d}/${c} = ${S(a * d)}/${b * c} = ${fracTexto(quot)}`, `Dividing is multiplying by the reciprocal: ${a}/${b} × ${d}/${c} = ${S(a * d)}/${b * c} = ${fracTexto(quot)}`, `Dividir és multiplicar per l'invers: ${a}/${b} × ${d}/${c} = ${S(a * d)}/${b * c} = ${fracTexto(quot)}`),
          ],
        }
      } catch { return { ok: false, error: 'incompleta' } }
    },
  },
  'simplificar': {
    slots: [{ n: 'a', d: 'b' }], op: '',
    ejemplo: { a: '12', b: '18' },
    calcular(v, l) {
      try {
        const a = leerEntero(v.a), b = leerNat(v.b)
        const g = gcd(a, b)
        const f = frac(a, b)
        const pasos = g === 1
          ? [T(l, `${a}/${b} ya es irreducible: el m.c.d. de ${Math.abs(a)} y ${b} es 1.`, `${a}/${b} is already in lowest terms: the GCD of ${Math.abs(a)} and ${b} is 1.`, `${a}/${b} ja és irreductible: el m.c.d. de ${Math.abs(a)} i ${b} és 1.`)]
          : [
            T(l, `Dividimos arriba y abajo entre su m.c.d.: el m.c.d. de ${Math.abs(a)} y ${b} es ${g}.`, `Divide top and bottom by their GCD: the GCD of ${Math.abs(a)} and ${b} is ${g}.`, `Dividim a dalt i a baix pel seu m.c.d.: el m.c.d. de ${Math.abs(a)} i ${b} és ${g}.`),
            T(l, `${a}/${b} = (${S(a)}÷${g})/(${b}÷${g}) = ${fracTexto(f)}`, `${a}/${b} = (${S(a)}÷${g})/(${b}÷${g}) = ${fracTexto(f)}`, `${a}/${b} = (${S(a)}÷${g})/(${b}÷${g}) = ${fracTexto(f)}`),
          ]
        pasos.push(T(l, `En decimal: ${numTexto(f, l)}`, `As a decimal: ${numTexto(f, l)}`, `En decimal: ${numTexto(f, l)}`))
        return { ok: true, resultados: [{ etiqueta: T(l, 'Fracción irreducible', 'Fraction in lowest terms', 'Fracció irreductible'), valor: fracTexto(f) }], pasos }
      } catch { return { ok: false, error: 'incompleta' } }
    },
  },
}

export const TIPOS = [
  {
    slug: '', emoji: '🍕', modo: 'suma-resta',
    titulo: { es: 'Sumar y restar fracciones', en: 'Add and subtract fractions', ca: 'Sumar i restar fraccions' },
    intro: {
      es: 'Escribe dos fracciones y súmalas o réstalas paso a paso: el denominador común con el m.c.m., y el resultado simplificado. Verás la suma y la resta.',
      en: 'Type two fractions and add or subtract them step by step: the common denominator with the LCM, and the simplified result. You get the sum and the difference.',
      ca: 'Escriu dues fraccions i suma-les o resta-les pas a pas: el denominador comú amb el m.c.m. i el resultat simplificat. Veuràs la suma i la resta.',
    },
  },
  {
    slug: 'multiplicar-y-dividir', emoji: '✖️', modo: 'multiplicar-dividir',
    titulo: { es: 'Multiplicar y dividir fracciones', en: 'Multiply and divide fractions', ca: 'Multiplicar i dividir fraccions' },
    intro: {
      es: 'Escribe dos fracciones y multiplícalas o divídelas paso a paso: multiplicar en línea, dividir por el inverso, y el resultado simplificado. Verás las dos.',
      en: 'Type two fractions and multiply or divide them step by step: multiply straight across, divide by the reciprocal, and the simplified result. You get both.',
      ca: 'Escriu dues fraccions i multiplica-les o divideix-les pas a pas: multiplicar en línia, dividir per l\'invers, i el resultat simplificat. Veuràs les dues.',
    },
  },
  {
    slug: 'simplificar', emoji: '✂️', modo: 'simplificar',
    titulo: { es: 'Simplificar fracciones', en: 'Simplify fractions', ca: 'Simplificar fraccions' },
    intro: {
      es: 'Escribe una fracción y obtén su forma irreducible: se divide numerador y denominador entre su máximo común divisor, paso a paso. También en decimal.',
      en: 'Type a fraction and get its lowest terms: divide the numerator and denominator by their greatest common divisor, step by step. Also as a decimal.',
      ca: 'Escriu una fracció i obtén la seva forma irreductible: es divideix numerador i denominador pel seu màxim comú divisor, pas a pas. També en decimal.',
    },
  },
]

export const rutaDe = tipo => (tipo.slug ? `${RUTA}/${tipo.slug}` : RUTA)
export const tipoPorSlug = slug => TIPOS.find(t => t.slug === (slug ?? '')) ?? null
