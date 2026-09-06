// Integridad de los bancos de preguntas de examen (src/data/*.js).
//
// Son 1.249 preguntas escritas a mano, en tres idiomas, repartidas en 56
// ficheros que se editan por tandas y meses aparte. Nada las validaba: un
// despiste no da error, da una pregunta rota que solo se descubre cuando un
// alumno la contesta. Y las dos formas de romperse castigan justo al que sabe:
//
//   - La respuesta correcta no coincide con ninguna opción (pasaba en
//     ecosistemas/ec-10 en catalán, donde la correcta decía "variedad" —en
//     castellano— y la opción "varietat"): la pregunta no tiene respuesta
//     posible, se elija lo que se elija.
//   - Una opción repetida, y encima siendo la correcta (pasaba en sn-02, con
//     "árboles" dos veces, y en pa-12 con "lied"): el alumno elige un texto
//     correcto y le cuenta como fallo porque el índice no es el bueno.
//
// Se recorren TODOS los ficheros de datos con import.meta.glob en vez de una
// lista: un banco nuevo entra en el test sin que nadie se acuerde de añadirlo,
// que es exactamente lo que falla cuando la lista es manual.
import { describe, it, expect } from 'vitest'

const modulos = import.meta.glob('../../data/*.js')
const LANGS = ['es', 'en', 'ca']
const SUFIJO = { es: '', en: 'En', ca: 'Ca' }

// Dos formas conviven en el repo y las dos se examinan: la nueva, con objetos
// { es, en, ca }, y la heredada de preguntasDiarias, con sufijos
// (opcionesEn/correctaCa). No se unifican aquí a propósito — este test valida
// lo que hay, no propone reescribirlo.
function normaliza(p, lang) {
  if (p.pregunta && typeof p.pregunta === 'object') {
    return { enunciado: p.pregunta[lang], opciones: p.opciones?.[lang], correcta: p.correcta }
  }
  const s = SUFIJO[lang]
  return {
    enunciado: p[`pregunta${s}`] ?? p.pregunta,
    opciones: p[`opciones${s}`] ?? p.opciones,
    correcta: p[`correcta${s}`] ?? p.correcta,
  }
}

async function cadaPregunta() {
  const vistas = new Set()
  const lista = []
  for (const [ruta, cargar] of Object.entries(modulos)) {
    let mod
    // Un fichero de datos que no se pueda importar es problema de otro test.
    try { mod = await cargar() } catch { continue }
    const fichero = ruta.replace('../../data/', '').replace('.js', '')
    for (const valor of Object.values(mod)) {
      if (!Array.isArray(valor)) continue
      for (const p of valor) {
        if (!p?.opciones || p.pregunta === undefined) continue
        // El mismo banco se exporta varias veces (PREGUNTAS, PREGUNTAS_ESO…):
        // cada pregunta se revisa una sola vez.
        const marca = `${fichero}|${p.id}`
        if (vistas.has(marca)) continue
        vistas.add(marca)
        lista.push({ donde: marca, p })
      }
    }
  }
  return lista
}

describe('bancos de preguntas', () => {
  it('hay bancos que revisar (si esto baja de golpe, el glob dejó de encontrarlos)', async () => {
    // Sin esta comprobación, romper el glob dejaría los demás tests en verde
    // sin revisar ni una pregunta.
    expect((await cadaPregunta()).length).toBeGreaterThan(1000)
  })

  it('la respuesta correcta está entre las opciones, en los tres idiomas', async () => {
    const rotas = []
    for (const { donde, p } of await cadaPregunta()) {
      for (const lang of LANGS) {
        const { opciones, correcta } = normaliza(p, lang)
        if (!Array.isArray(opciones)) continue
        // Dos maneras de señalar la buena: por índice o por texto.
        if (typeof correcta === 'number') {
          if (!Number.isInteger(correcta) || correcta < 0 || correcta >= opciones.length) {
            rotas.push(`${donde} (${lang}): índice ${correcta} fuera de rango`)
          }
          continue
        }
        const texto = typeof correcta === 'object' ? correcta?.[lang] : correcta
        if (texto === undefined) { rotas.push(`${donde} (${lang}): sin respuesta correcta`); continue }
        if (!opciones.includes(texto)) rotas.push(`${donde} (${lang}): "${texto}" no está entre las opciones`)
      }
    }
    expect(rotas).toEqual([])
  })

  it('ninguna pregunta repite una opción', async () => {
    // Si la repetida es la correcta, hay dos textos buenos y solo uno cuenta.
    const rotas = []
    for (const { donde, p } of await cadaPregunta()) {
      for (const lang of LANGS) {
        const { opciones } = normaliza(p, lang)
        if (!Array.isArray(opciones)) continue
        const repes = opciones.filter((o, i) => opciones.indexOf(o) !== i)
        if (repes.length) rotas.push(`${donde} (${lang}): repite ${JSON.stringify([...new Set(repes)])}`)
      }
    }
    expect(rotas).toEqual([])
  })

  it('ninguna opción está vacía', async () => {
    const rotas = []
    for (const { donde, p } of await cadaPregunta()) {
      for (const lang of LANGS) {
        const { opciones } = normaliza(p, lang)
        if (!Array.isArray(opciones)) continue
        if (opciones.some(o => !String(o ?? '').trim())) rotas.push(`${donde} (${lang})`)
      }
    }
    expect(rotas).toEqual([])
  })

  it('toda pregunta tiene enunciado en los tres idiomas', async () => {
    const rotas = []
    for (const { donde, p } of await cadaPregunta()) {
      for (const lang of LANGS) {
        const { enunciado } = normaliza(p, lang)
        if (!String(enunciado ?? '').trim()) rotas.push(`${donde} (${lang})`)
      }
    }
    expect(rotas).toEqual([])
  })

  it('las opciones son las mismas en número en los tres idiomas', async () => {
    // Traducir una lista y dejarse una opción descoloca el índice correcto:
    // el alumno de ese idioma ve marcada como buena otra respuesta.
    const rotas = []
    for (const { donde, p } of await cadaPregunta()) {
      const cuentas = LANGS
        .map(lang => normaliza(p, lang).opciones)
        .filter(Array.isArray)
        .map(o => o.length)
      if (new Set(cuentas).size > 1) rotas.push(`${donde}: ${cuentas.join(' / ')}`)
    }
    expect(rotas).toEqual([])
  })
})
