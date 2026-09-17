// ── /recursos/mcm-mcd: mínimo común múltiplo y máximo común divisor ─────────
//
// El alumno escribe sus números y ve la factorización en primos de cada uno, el
// m.c.m. (cada primo al MAYOR exponente) y el m.c.d. (solo los primos comunes,
// al MENOR exponente). Todo entero y exacto: no hay decimales ni redondeos.
//
// Solo matemática; los textos de explicación viven en la página (i18n).

export const RUTA = '/recursos/mcm-mcd'
export const EJEMPLOS = ['12, 18', '8, 12, 20', '24, 36', '15, 25', '6, 9, 15']
export const MAX_NUM = 100000
export const MAX_CANT = 8

const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }
const sup = e => String(e).split('').map(d => SUP[d]).join('')
const potTexto = (p, e) => (e === 1 ? `${p}` : `${p}${sup(e)}`)

// Factoriza n (entero ≥ 1) en primos. Devuelve [{ p, e }] ordenado por primo.
export function factorizar(n) {
  const f = []
  let m = n
  for (let p = 2; p * p <= m; p++) {
    if (m % p === 0) {
      let e = 0
      while (m % p === 0) { m /= p; e++ }
      f.push({ p, e })
    }
  }
  if (m > 1) f.push({ p: m, e: 1 })
  return f
}

export function trocear(texto) {
  return String(texto ?? '').split(/[\s,;]+/).map(s => s.trim()).filter(Boolean)
}

const prod = arr => arr.reduce((a, { p, e }) => a * p ** e, 1)

// Devuelve { ok, numeros, factorTexto, mcm, mcd, mcmTexto, mcdTexto, coprimos }
// o { ok: false, error, detalle }.
export function resolver(texto) {
  const trozos = trocear(texto)
  if (trozos.length < 2) return { ok: false, error: 'pocos' }
  if (trozos.length > MAX_CANT) return { ok: false, error: 'muchos' }
  const numeros = []
  for (const t of trozos) {
    if (!/^\d+$/.test(t)) return { ok: false, error: 'invalido', detalle: t }
    const n = parseInt(t, 10)
    if (n < 1 || n > MAX_NUM) return { ok: false, error: 'rango', detalle: t }
    numeros.push(n)
  }

  const facts = numeros.map(n => ({ n, f: factorizar(n) }))
  const primos = [...new Set(facts.flatMap(x => x.f.map(y => y.p)))].sort((a, b) => a - b)
  const expo = (x, p) => x.f.find(y => y.p === p)?.e ?? 0

  // m.c.m.: cada primo al mayor exponente que aparezca.
  const mcmFactores = primos.map(p => ({ p, e: Math.max(...facts.map(x => expo(x, p))) })).filter(x => x.e > 0)
  // m.c.d.: solo los primos presentes en TODOS (min > 0), al menor exponente.
  const mcdFactores = primos.map(p => ({ p, e: Math.min(...facts.map(x => expo(x, p))) })).filter(x => x.e > 0)

  const mcm = prod(mcmFactores)
  const mcd = mcdFactores.length ? prod(mcdFactores) : 1
  const factorTexto = facts.map(({ n, f }) => `${n} = ${f.length ? f.map(({ p, e }) => potTexto(p, e)).join(' · ') : '1'}`)
  const mcmTexto = mcmFactores.length ? `${mcmFactores.map(({ p, e }) => potTexto(p, e)).join(' · ')} = ${mcm}` : `${mcm}`
  const mcdTexto = mcdFactores.length ? `${mcdFactores.map(({ p, e }) => potTexto(p, e)).join(' · ')} = ${mcd}` : '1'
  return { ok: true, numeros, factorTexto, mcm, mcd, mcmTexto, mcdTexto, coprimos: mcd === 1 }
}

// Variantes con URL propia. El cálculo es el mismo (salen los dos); cada tipo
// cambia título, intro y ejemplos para posicionar por lo que se busca.
export const TIPOS = [
  {
    slug: '', emoji: '🔢',
    titulo: { es: 'Calcular el m.c.m. y el m.c.d.', en: 'Calculate the LCM and the GCD', ca: 'Calcular el m.c.m. i el m.c.d.' },
    intro: {
      es: 'Escribe tus números y obtén la factorización en primos de cada uno, el mínimo común múltiplo y el máximo común divisor, paso a paso. Todo exacto, sin decimales.',
      en: 'Type your numbers and get the prime factorisation of each, the lowest common multiple and the greatest common divisor, step by step. Exact, no decimals.',
      ca: 'Escriu els teus números i obtén la factorització en primers de cadascun, el mínim comú múltiple i el màxim comú divisor, pas a pas. Tot exacte, sense decimals.',
    },
  },
  {
    slug: 'minimo-comun-multiplo', emoji: '🔺',
    titulo: { es: 'Calcular el mínimo común múltiplo (m.c.m.)', en: 'Calculate the lowest common multiple (LCM)', ca: 'Calcular el mínim comú múltiple (m.c.m.)' },
    intro: {
      es: 'Escribe tus números y calcula el mínimo común múltiplo: se factoriza cada uno en primos y se toma cada factor al MAYOR exponente. Con el m.c.d. de propina.',
      en: 'Type your numbers and get the lowest common multiple: factorise each into primes and take every factor to its HIGHEST power. Plus the GCD.',
      ca: 'Escriu els teus números i calcula el mínim comú múltiple: es factoritza cadascun en primers i es pren cada factor al MAJOR exponent. Amb el m.c.d. de propina.',
    },
  },
  {
    slug: 'maximo-comun-divisor', emoji: '🔻',
    titulo: { es: 'Calcular el máximo común divisor (m.c.d.)', en: 'Calculate the greatest common divisor (GCD)', ca: 'Calcular el màxim comú divisor (m.c.d.)' },
    intro: {
      es: 'Escribe tus números y calcula el máximo común divisor: se factoriza cada uno en primos y se toman solo los factores comunes, al MENOR exponente. Con el m.c.m. de propina.',
      en: 'Type your numbers and get the greatest common divisor: factorise each into primes and take only the common factors, to their LOWEST power. Plus the LCM.',
      ca: 'Escriu els teus números i calcula el màxim comú divisor: es factoritza cadascun en primers i es prenen només els factors comuns, al MENOR exponent. Amb el m.c.m. de propina.',
    },
  },
]

export const rutaDe = tipo => (tipo.slug ? `${RUTA}/${tipo.slug}` : RUTA)
export const tipoPorSlug = slug => TIPOS.find(t => t.slug === (slug ?? '')) ?? null
