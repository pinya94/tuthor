// Invariantes de Corrige el Texto.
//
// El banco es contenido escrito a mano y la partida lo estropea a propósito,
// así que hay dos clases de fallo posibles y las dos son invisibles jugando un
// rato: una trampa mal escrita (la palabra "correcta" no está en el texto, o
// aparece dos veces y se estropea la que no era) y una corrupción que se lleva
// por delante otra parte del texto. Aquí se comprueban las dos sobre los
// veinte textos y los tres niveles.
import { describe, it, expect } from 'vitest'
import {
  TEXTOS, TEXTO_IDS, FAMILIAS, NIVELES, NIVEL_IDS, TEXTOS_POR_PARTIDA,
  PENALIZACION, TIEMPO_TOPE, tokenizar, trampasUsables,
  generarRonda, generarPartida, tiempoFinal, puntosDe,
} from '../corrigeTexto'

const MUESTRA = 200
const palabrasDe = texto => tokenizar(texto).filter(p => p.palabra).map(p => p.s)

describe('el banco de textos está bien escrito', () => {
  it('la palabra correcta de cada trampa aparece UNA vez en su texto', () => {
    // Es lo que permite localizar la trampa sin escribir índices a mano. Si
    // apareciera dos veces se estropearía la primera, que puede no ser la que
    // el autor tenía en la cabeza; si no apareciera, la trampa no haría nada
    // y el texto saldría con menos fallos de los que promete el marcador.
    for (const t of TEXTOS) {
      const palabras = palabrasDe(t.texto)
      for (const [correcta] of t.trampas) {
        const veces = palabras.filter(p => p === correcta).length
        expect(veces, `${t.id}: "${correcta}"`).toBe(1)
      }
    }
  })

  it('ninguna palabra lleva dos trampas', () => {
    for (const t of TEXTOS) {
      const correctas = t.trampas.map(([c]) => c)
      expect(new Set(correctas).size, t.id).toBe(correctas.length)
    }
  })

  it('la versión mal escrita es otra palabra, y una sola', () => {
    for (const t of TEXTOS) {
      for (const [correcta, mal, familia] of t.trampas) {
        expect(mal, `${t.id}: ${correcta}`).not.toBe(correcta)
        expect(tokenizar(mal).filter(p => p.palabra).length, `${t.id}: "${mal}"`).toBe(1)
        expect(FAMILIAS[familia], `${t.id}: familia ${familia}`).toBeTruthy()
      }
    }
  })

  it('los ids de texto no se repiten', () => {
    expect(new Set(TEXTO_IDS).size).toBe(TEXTOS.length)
  })

  it('los textos caben en una pantalla', () => {
    // Entre 60 y 110 palabras. Más largo obliga a hacer scroll con el reloj
    // corriendo, y eso mide el móvil y la paciencia, no la vista para el error.
    for (const t of TEXTOS) {
      const n = palabrasDe(t.texto).length
      expect(n, `${t.id} tiene ${n} palabras`).toBeGreaterThanOrEqual(60)
      expect(n, `${t.id} tiene ${n} palabras`).toBeLessThanOrEqual(110)
    }
  })

  it('cada texto tiene trampas de sobra para los tres niveles', () => {
    // "De sobra" y no "justas": si un texto tuviera exactamente las tres
    // trampas del nivel fácil, saldrían siempre las mismas tres y jugarlo dos
    // veces sería recordar, no corregir.
    for (const t of TEXTOS) {
      for (const nivel of NIVEL_IDS) {
        const usables = trampasUsables(t, nivel).length
        expect(usables, `${t.id} en ${nivel}`).toBeGreaterThan(NIVELES[nivel].errores)
      }
    }
  })

  it('las familias de cada nivel existen', () => {
    for (const nivel of NIVEL_IDS) {
      for (const fam of NIVELES[nivel].familias) expect(FAMILIAS[fam], `${nivel}: ${fam}`).toBeTruthy()
    }
  })
})

describe('estropear el texto no lo rompe', () => {
  it('deshacer los errores devuelve el texto original, letra por letra', () => {
    // La invariante que lo cubre todo: si al sustituir cada palabra estropeada
    // por su correcta sale exactamente el texto de partida, entonces ni se ha
    // perdido puntuación, ni se ha cambiado una palabra que no tocaba, ni se
    // ha estropeado la aparición equivocada de una palabra repetida.
    for (const t of TEXTOS) {
      for (const nivel of NIVEL_IDS) {
        for (let i = 0; i < 10; i++) {
          const r = generarRonda(t.id, nivel)
          const rehecho = r.tokens.map(k => (k.error ? k.correcta : k.s)).join('')
          expect(rehecho, `${t.id}/${nivel}`).toBe(t.texto)
        }
      }
    }
  })

  it('salen tantos errores como dice el marcador, ni uno más', () => {
    // El número se le enseña al jugador, así que tiene que ser verdad: si
    // dijera 4 y hubiera 3, se quedaría buscando uno que no existe.
    for (const nivel of NIVEL_IDS) {
      for (const t of TEXTOS) {
        for (let i = 0; i < 5; i++) {
          const r = generarRonda(t.id, nivel)
          const reales = r.tokens.filter(k => k.error).length
          expect(reales, `${t.id}/${nivel}`).toBe(NIVELES[nivel].errores)
          expect(r.nErrores).toBe(reales)
        }
      }
    }
  })

  it('cada nivel solo usa sus familias de falta', () => {
    for (const nivel of NIVEL_IDS) {
      for (const t of TEXTOS) {
        for (let i = 0; i < 5; i++) {
          for (const k of generarRonda(t.id, nivel).tokens) {
            if (k.error) expect(NIVELES[nivel].familias, `${t.id}/${nivel}`).toContain(k.familia)
          }
        }
      }
    }
  })

  it('en difícil entra siempre un homófono si el texto tiene alguno', () => {
    // Es lo que diferencia el nivel: una palabra bien escrita puesta donde no
    // va. Dejarlo al azar puro haría que la mitad de los textos difíciles
    // fueran el nivel medio con un fallo más.
    for (const t of TEXTOS) {
      if (!t.trampas.some(([, , f]) => f === 'homofono')) continue
      for (let i = 0; i < 20; i++) {
        const r = generarRonda(t.id, 'dificil')
        expect(r.tokens.some(k => k.error && k.familia === 'homofono'), t.id).toBe(true)
      }
    }
  })

  it('los errores cambian de sitio entre partidas del mismo texto', () => {
    // La razón de ser del sorteo: con veinte textos fijos, siete partidas
    // bastarían para haberlos visto todos y a partir de ahí se recordaría
    // dónde estaba el fallo en vez de leerlo.
    for (const t of TEXTOS) {
      const combinaciones = new Set()
      for (let i = 0; i < MUESTRA; i++) {
        const r = generarRonda(t.id, 'dificil')
        combinaciones.add(r.tokens.map((k, j) => (k.error ? j : '')).join(','))
      }
      expect(combinaciones.size, t.id).toBeGreaterThan(5)
    }
  })
})

describe('la partida y su puntuación', () => {
  it('cada partida trae tres textos distintos', () => {
    for (let i = 0; i < MUESTRA; i++) {
      const p = generarPartida('medio')
      expect(p.length).toBe(TEXTOS_POR_PARTIDA)
      expect(new Set(p.map(r => r.id)).size).toBe(TEXTOS_POR_PARTIDA)
    }
  })

  it('no repite los textos de la partida anterior', () => {
    for (let i = 0; i < MUESTRA; i++) {
      const antes = generarPartida('medio')
      const ahora = generarPartida('medio', antes.map(r => r.id))
      for (const r of ahora) expect(antes.map(x => x.id)).not.toContain(r.id)
    }
  })

  it('dejarse un error y marcar una palabra buena cuestan lo mismo', () => {
    expect(tiempoFinal({ segundos: 60, sinMarcar: 1 }))
      .toBe(tiempoFinal({ segundos: 60, deMas: 1 }))
    expect(tiempoFinal({ segundos: 60, sinMarcar: 1 })).toBe(60 + PENALIZACION)
  })

  it('marcar el texto entero sin leer no puntúa', () => {
    // La estrategia que rompería el juego si marcar de más fuese gratis:
    // tocar las ochenta palabras garantiza encontrar todos los fallos. Con la
    // penalización simétrica, hacerlo en los tres textos deja la puntuación a
    // cero incluso yendo a toda velocidad.
    const partida = generarPartida('dificil')
    const deMas = partida.reduce((a, r) => a + r.tokens.filter(k => k.palabra && !k.error).length, 0)
    expect(puntosDe(tiempoFinal({ segundos: 10, deMas }))).toBe(0)
  })

  it('leer despacio y sin fallos gana a ir rápido dejándose la mitad', () => {
    // Es el incentivo que justifica puntuar solo por tiempo: el minucioso
    // lento tiene que poder ganar al rápido descuidado.
    const minucioso = tiempoFinal({ segundos: 200, sinMarcar: 0, deMas: 0 })
    const atropellado = tiempoFinal({ segundos: 90, sinMarcar: 8, deMas: 6 })
    expect(puntosDe(minucioso)).toBeGreaterThan(puntosDe(atropellado))
  })

  it('los puntos nunca son negativos y caben en el tope', () => {
    expect(puntosDe(TIEMPO_TOPE + 500)).toBe(0)
    expect(puntosDe(0)).toBe(TIEMPO_TOPE)
  })
})
