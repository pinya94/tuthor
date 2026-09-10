// En un examen DE castellano, las palabras castellanas que se analizan no se
// traducen. Suena obvio escrito, pero las traducciones al inglés y al catalán
// llegaron hasta las opciones y convirtieron preguntas correctas en falsas:
//
//   · "¿Cuál lleva tilde?" daba en catalán cafe/taula/arbre/llibre, con
//     "arbre" marcada como correcta — y "arbre" no lleva accent en catalán.
//   · "¿Plural de feliz?" daba feliços/felices/feliçs/feliç con "felices"
//     correcta: es el plural castellano, no el catalán, que es "feliços".
//
// Estos tests fijan la regla y comprueban que ningún banco se le escapa.
import { describe, it, expect } from 'vitest'
import { esMaterialEspanol, opcionesDeExamen, preguntaDeExamen } from '../../data/espanolMaterial'

const BANCOS = import.meta.glob('../../data/espanol*.js', { eager: true })
const preguntasDe = mod => mod.PREGUNTAS ?? mod.PREGUNTAS_ESO ?? []

// Bancos de verdad: espanolMaterial.js entra en el glob y no tiene preguntas.
const CON_PREGUNTAS = Object.entries(BANCOS).filter(([, m]) => preguntasDe(m).length > 0)

describe('la regla', () => {
  it('una palabra suelta es material; una afirmación, no', () => {
    expect(esMaterialEspanol(['comer', 'verde', 'mesa', 'correr'])).toBe(true)
    expect(esMaterialEspanol(['blanco', 'blanca', 'blancos', 'blancas'])).toBe(true)
    expect(esMaterialEspanol(['más… que', 'tan… como'])).toBe(true)
    expect(esMaterialEspanol(['Para nombrar cosas', 'Para expresar una acción'])).toBe(false)
    expect(esMaterialEspanol(['Es un error de estilo.'])).toBe(false)
  })

  it('contar y responder sí o no no es material, aunque sea corto', () => {
    // "Ninguno/Uno/Dos/Tres" son respuestas, no palabras que se analicen: en
    // catalán tienen que poder decir "Cap/Un/Dos/Tres".
    expect(esMaterialEspanol(['Ninguno', 'Uno', 'Dos', 'Tres'])).toBe(false)
    expect(esMaterialEspanol(['Sí', 'No'])).toBe(false)
    expect(esMaterialEspanol(['Verdadero', 'Falso'])).toBe(false)
  })

  it('el material se enseña igual en los tres idiomas', () => {
    const o = opcionesDeExamen({
      es: ['blanco', 'blanca'], en: ['white', 'white'], ca: ['blanc', 'blanca'],
    })
    expect(o.en).toEqual(['blanco', 'blanca'])
    expect(o.ca).toEqual(['blanco', 'blanca'])
  })

  it('la prosa conserva su traducción', () => {
    const o = opcionesDeExamen({
      es: ['Para nombrar cosas', 'Para unir dos frases'],
      en: ['To name things', 'To join two clauses'],
      ca: ['Per anomenar coses', 'Per unir dues frases'],
    })
    expect(o.en[0]).toBe('To name things')
    expect(o.ca[0]).toBe('Per anomenar coses')
  })
})

describe('lo que la pregunta cita se queda en castellano', () => {
  it('sustituye lo entrecomillado por la versión castellana', () => {
    const p = preguntaDeExamen({
      es: 'Quin és el plural de "feliz"?'.replace('Quin és el plural', '¿Cuál es el plural'),
      ca: 'Quin és el plural de "feliç"?',
      en: 'What is the plural of "happy"?',
    })
    expect(p.ca).toContain('"feliz"')
    expect(p.en).toContain('"feliz"')
    expect(p.ca).toContain('Quin és el plural')
  })

  it('si no cuadra el número de comillas, no toca nada', () => {
    // Emparejar mal es peor que no emparejar: quedaría una cita puesta donde
    // no va y nadie lo notaría hasta leerla.
    const p = preguntaDeExamen({
      es: 'En "el perro" y "la casa"',
      ca: 'A "el gos"',
    })
    expect(p.ca).toBe('A "el gos"')
  })

  it('ningún banco traduce lo que cita', () => {
    const citas = t => [...String(t ?? '').matchAll(/"([^"]*)"/g)].map(m => m[1])
    for (const [ruta, mod] of CON_PREGUNTAS) {
      for (const p of preguntasDe(mod)) {
        const es = citas(p.pregunta?.es)
        if (!es.length) continue
        for (const l of ['en', 'ca']) {
          const otras = citas(p.pregunta?.[l])
          if (otras.length !== es.length) continue
          expect(otras, ruta.split('/').pop() + ' ' + p.id + ' [' + l + ']: ' + p.pregunta[l]).toEqual(es)
        }
      }
    }
  })
})

describe('los bancos de español la cumplen', () => {
  it('ningún banco traduce el material lingüístico', () => {
    // El fallo que esto impide: añadir un banco nuevo copiando otro y
    // olvidarse de pasar las opciones por opcionesDeExamen.
    for (const [ruta, mod] of CON_PREGUNTAS) {
      for (const p of preguntasDe(mod)) {
        if (!esMaterialEspanol(p.opciones?.es)) continue
        const dónde = `${ruta.split('/').pop()} ${p.id}`
        expect(p.opciones.en, dónde).toEqual(p.opciones.es)
        expect(p.opciones.ca, dónde).toEqual(p.opciones.es)
      }
    }
  })

  it('la respuesta correcta está entre las opciones, en los tres idiomas', () => {
    // El fallo que casi cuelo: tres bancos (G/J, puntuación y literatura)
    // guardan la correcta como TEXTO por idioma, no como índice. Al pasar las
    // opciones a castellano sin tocar la correcta, la respuesta buena dejaba
    // de estar entre las opciones y la pregunta se volvía imposible.
    for (const [ruta, mod] of CON_PREGUNTAS) {
      for (const p of preguntasDe(mod)) {
        if (typeof p.correcta !== 'object' || p.correcta === null) continue
        for (const l of ['es', 'en', 'ca']) {
          expect(p.opciones[l], ruta.split('/').pop() + ' ' + p.id + ' (' + l + ')')
            .toContain(p.correcta[l])
        }
      }
    }
  })

  it('cada pregunta sigue teniendo tantas opciones como antes', () => {
    // Copiar las de castellano no puede cambiar cuántas hay: el índice de la
    // respuesta correcta apunta a una posición concreta.
    for (const [ruta, mod] of CON_PREGUNTAS) {
      for (const p of preguntasDe(mod)) {
        const dónde = `${ruta.split('/').pop()} ${p.id}`
        for (const l of ['es', 'en', 'ca']) {
          expect(p.opciones[l]?.length, `${dónde} (${l})`).toBe(p.opciones.es.length)
        }
        if (typeof p.correcta === 'number') {
          expect(p.correcta, dónde).toBeLessThan(p.opciones.es.length)
          expect(p.correcta, dónde).toBeGreaterThanOrEqual(0)
        }
      }
    }
  })

  it('la explicación no lleva notas de quien la escribió', () => {
    // Se coló una: "càmera, música, metge (metge no, però sí: mèdic)".
    for (const [ruta, mod] of CON_PREGUNTAS) {
      for (const p of preguntasDe(mod)) {
        for (const l of ['es', 'en', 'ca']) {
          const t = p.explicacion?.[l] ?? ''
          expect(t, `${ruta.split('/').pop()} ${p.id} (${l}): ${t}`)
            // Sin la /i y sin palabras corrientes: 'TODO' en minúsculas es la
            // palabra española 'todo', que sale en media docena de explicaciones.
            .not.toMatch(/\bno,? per[oò] s[ií]\b|\bTODO\b|\bFIXME\b|\[revisar\]/)
        }
      }
    }
  })
})
