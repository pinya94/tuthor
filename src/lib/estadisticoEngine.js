// ── Motor de Estadístico Exprés ──────────────────────────────────────────
// Generación de datasets para el juego (src/pages/EstadisticoExpres.jsx) y
// sus 4 exámenes por medida (media/mediana/moda/rango) — misma fuente, para
// que "calcula la media" signifique exactamente lo mismo en todos.
//
// Los datos se generan al revés para que la respuesta sea siempre un entero
// exacto (mismo patrón que Punto de Equilibrio): para "media" se fija primero
// el resultado y se reparten desviaciones que suman cero; para "mediana" se
// descarta el sorteo si el par central no promedia a un entero.

export const RANGOS = {
  facil:   { n: [4, 5], rango: [1, 15] },
  medio:   { n: [5, 7], rango: [1, 25] },
  dificil: { n: [6, 9], rango: [1, 40] },
}

export function rng(min, max) { return min + Math.floor(Math.random() * (max - min + 1)) }
export function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }
export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function generarMedia(dif) {
  const n = rng(...dif.n)
  for (let intento = 0; intento < 12; intento++) {
    const media = rng(...dif.rango)
    const desviaciones = Array.from({ length: n - 1 }, () => rng(-5, 5))
    const ultima = -desviaciones.reduce((a, b) => a + b, 0)
    const valores = [...desviaciones, ultima].map(d => media + d)
    if (valores.every(v => v >= 0 && v <= dif.rango[1] + 15)) {
      return { tipo: 'media', valores: shuffle(valores), respuesta: media }
    }
  }
  const media = rng(...dif.rango) // red de seguridad: dataset constante, media trivial
  return { tipo: 'media', valores: Array.from({ length: n }, () => media), respuesta: media }
}

export function generarMediana(dif) {
  const n = rng(...dif.n)
  for (let intento = 0; intento < 12; intento++) {
    const valores = Array.from({ length: n }, () => rng(...dif.rango))
    const ordenado = [...valores].sort((a, b) => a - b)
    if (n % 2 === 1) {
      return { tipo: 'mediana', valores, respuesta: ordenado[(n - 1) / 2] }
    }
    const suma = ordenado[n / 2 - 1] + ordenado[n / 2]
    if (suma % 2 === 0) return { tipo: 'mediana', valores, respuesta: suma / 2 }
  }
  const valores = Array.from({ length: 5 }, () => rng(...dif.rango)) // red de seguridad: n impar, siempre exacta
  const ordenado = [...valores].sort((a, b) => a - b)
  return { tipo: 'mediana', valores, respuesta: ordenado[2] }
}

export function generarModa(dif) {
  const n = rng(...dif.n)
  const base = new Set()
  while (base.size < n - 1) base.add(rng(...dif.rango))
  const distintos = [...base]
  const modaVal = pick(distintos)
  return { tipo: 'moda', valores: shuffle([...distintos, modaVal]), respuesta: modaVal }
}

export function generarRango(dif) {
  const n = rng(...dif.n)
  const valores = Array.from({ length: n }, () => rng(...dif.rango))
  return { tipo: 'rango', valores, respuesta: Math.max(...valores) - Math.min(...valores) }
}

export function generarRonda(dif, tipos) {
  const tipo = pick(tipos)
  if (tipo === 'media') return generarMedia(dif)
  if (tipo === 'mediana') return generarMediana(dif)
  if (tipo === 'moda') return generarModa(dif)
  return generarRango(dif)
}

// Explicación en texto plano por idioma ('es'|'en'|'ca') — la usan tanto el
// juego (que la envuelve con tr()) como los exámenes (que reciben `l` tal
// cual de MechanicExam).
export function explicacion(ronda, l) {
  const { tipo, valores, respuesta } = ronda
  if (tipo === 'media') {
    const suma = valores.reduce((a, b) => a + b, 0)
    return {
      es: `Suma: ${valores.join(' + ')} = ${suma}. Media = ${suma} ÷ ${valores.length} = ${respuesta}.`,
      en: `Sum: ${valores.join(' + ')} = ${suma}. Mean = ${suma} ÷ ${valores.length} = ${respuesta}.`,
      ca: `Suma: ${valores.join(' + ')} = ${suma}. Mitjana = ${suma} ÷ ${valores.length} = ${respuesta}.`,
    }[l]
  }
  if (tipo === 'mediana') {
    const ordenado = [...valores].sort((a, b) => a - b)
    return {
      es: `Ordenados: ${ordenado.join(', ')} → el valor central es ${respuesta}.`,
      en: `Sorted: ${ordenado.join(', ')} → the middle value is ${respuesta}.`,
      ca: `Ordenats: ${ordenado.join(', ')} → el valor central és ${respuesta}.`,
    }[l]
  }
  if (tipo === 'moda') {
    return {
      es: `El ${respuesta} aparece 2 veces; el resto, solo 1 → moda = ${respuesta}.`,
      en: `${respuesta} appears twice; the rest, only once → mode = ${respuesta}.`,
      ca: `El ${respuesta} apareix 2 vegades; la resta, només 1 → moda = ${respuesta}.`,
    }[l]
  }
  const max = Math.max(...valores), min = Math.min(...valores)
  return {
    es: `Rango = máximo − mínimo = ${max} − ${min} = ${respuesta}.`,
    en: `Range = maximum − minimum = ${max} − ${min} = ${respuesta}.`,
    ca: `Rang = màxim − mínim = ${max} − ${min} = ${respuesta}.`,
  }[l]
}
