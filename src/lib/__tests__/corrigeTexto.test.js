// Invariantes de Corrige el Texto, sobre los TRES bancos.
//
// El contenido está escrito a mano y la partida lo estropea a propósito, así
// que hay dos clases de fallo posibles y las dos son invisibles jugando un
// rato: una trampa mal escrita (la palabra "correcta" no está en el texto, o
// aparece dos veces y se estropea la que no era) y una corrupción que se lleva
// por delante otra parte del texto.
//
// Castellano, inglés y catalán no comparten ni una falta —en inglés no hay
// tildes, en catalán hay ela geminada— pero sí comparten qué es un banco bien
// hecho, así que cada test recorre los tres y dice en cuál falla. Escribiendo
// el banco inglés esto cazó veintitantas trampas sobre palabras que no estaban
// en el texto: las escribí de memoria en vez de mirarlo.
import { describe, it, expect } from 'vitest'
import {
  IDIOMA_IDS, familiasDe, nivelesDe, nivelIdsDe, textosDe, TEXTOS_POR_PARTIDA,
  PENALIZACION, TIEMPO_TOPE, tokenizar, trampasUsables,
  generarRonda, generarPartida, tiempoFinal, puntosDe,
} from '../corrigeTexto'

const MUESTRA = 120
const palabrasDe = texto => tokenizar(texto).filter(p => p.palabra).map(p => p.s)

// Recorre los tres bancos. `donde` etiqueta el fallo con el idioma, que si no
// hay que ir buscándolo a mano entre sesenta textos.
const cadaBanco = fn => { for (const idioma of IDIOMA_IDS) fn(idioma) }
const cadaTexto = fn => cadaBanco(idioma => {
  for (const t of textosDe(idioma)) fn(t, idioma, `${idioma}/${t.id}`)
})
const cadaNivel = fn => cadaBanco(idioma => {
  for (const nivel of nivelIdsDe(idioma)) fn(nivel, idioma, `${idioma}/${nivel}`)
})

describe('los tres bancos existen y tienen la misma forma', () => {
  it('cada idioma trae familias, niveles y textos', () => {
    cadaBanco(idioma => {
      expect(Object.keys(familiasDe(idioma)).length, idioma).toBeGreaterThan(2)
      expect(nivelIdsDe(idioma), idioma).toEqual(['facil', 'medio', 'dificil'])
      expect(textosDe(idioma).length, idioma).toBeGreaterThanOrEqual(12)
    })
  })

  it('un idioma que no existe cae al castellano en vez de reventar', () => {
    expect(textosDe('xx')).toEqual(textosDe('es'))
    expect(() => generarRonda(textosDe('es')[0].id, 'medio', 'xx')).not.toThrow()
  })

  it('las familias de cada nivel existen en su propio banco', () => {
    cadaNivel((nivel, idioma, donde) => {
      for (const fam of nivelesDe(idioma)[nivel].familias) {
        expect(familiasDe(idioma)[fam], `${donde}: ${fam}`).toBeTruthy()
      }
    })
  })

  it('cada familia se nombra y se explica en los tres idiomas de interfaz', () => {
    cadaBanco(idioma => {
      for (const [id, fam] of Object.entries(familiasDe(idioma))) {
        for (const l of ['es', 'en', 'ca']) {
          expect(fam.label?.[l], `${idioma}/${id}.label.${l}`).toBeTruthy()
          expect(fam.regla?.[l], `${idioma}/${id}.regla.${l}`).toBeTruthy()
        }
      }
    })
  })
})

describe('los bancos están bien escritos', () => {
  it('la palabra correcta de cada trampa aparece UNA vez en su texto', () => {
    // Es lo que permite localizar la trampa sin escribir índices a mano. Si
    // apareciera dos veces se estropearía la primera, que puede no ser la que
    // el autor tenía en la cabeza; si no apareciera, la trampa no haría nada y
    // el texto saldría con menos fallos de los que promete el marcador.
    cadaTexto((t, idioma, donde) => {
      const palabras = palabrasDe(t.texto)
      for (const [correcta] of t.trampas) {
        expect(palabras.filter(p => p === correcta).length, `${donde}: "${correcta}"`).toBe(1)
      }
    })
  })

  it('ninguna palabra lleva dos trampas', () => {
    cadaTexto((t, idioma, donde) => {
      const correctas = t.trampas.map(([c]) => c)
      expect(new Set(correctas).size, donde).toBe(correctas.length)
    })
  })

  it('la versión mal escrita es otra palabra, y una sola', () => {
    cadaTexto((t, idioma, donde) => {
      for (const [correcta, mal, familia] of t.trampas) {
        expect(mal, `${donde}: ${correcta}`).not.toBe(correcta)
        expect(tokenizar(mal).filter(p => p.palabra).length, `${donde}: "${mal}"`).toBe(1)
        expect(familiasDe(idioma)[familia], `${donde}: familia ${familia}`).toBeTruthy()
      }
    })
  })

  it('la palabra mal escrita no está ya en el texto por otro sitio', () => {
    // Si "there" ya aparece en la frase, ver otro "there" no delata nada: la
    // trampa se vuelve invisible aunque esté puesta.
    //
    // Los HOMÓFONOS son la excepción, y a propósito: ahí la palabra mal puesta
    // es una palabra de verdad y de las más corrientes que hay. En "sube a
    // estudiar sin él" la trampa es quitarle el acento, y "el" sale diez veces
    // más en el texto como artículo; en inglés pasa igual con too y to. Eso no
    // hace invisible la trampa, la hace buena: obliga a juzgar CADA aparición
    // en su sitio, que es exactamente de lo que va la tilde diacrítica.
    //
    // Donde sí importa es en las faltas de escritura: "runing" no puede estar
    // ya en el texto, porque entonces no hay nada que delate cuál sobra.
    const HOMOFONAS = ['homofono', 'homofon']
    // En castellano la tilde diacrítica (él/el) vive en la familia de tildes,
    // no en la de homófonos, así que hace falta la segunda condición: si la
    // única diferencia es el acento, es el mismo caso.
    const sinTildes = p => p.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    cadaTexto((t, idioma, donde) => {
      const palabras = palabrasDe(t.texto)
      for (const [correcta, mal, familia] of t.trampas) {
        if (HOMOFONAS.includes(familia)) continue
        if (sinTildes(correcta) === sinTildes(mal)) continue
        expect(palabras, `${donde}: "${mal}" ya está en el texto`).not.toContain(mal)
      }
    })
  })

  it('los ids de texto no se repiten dentro de su banco', () => {
    cadaBanco(idioma => {
      const ids = textosDe(idioma).map(t => t.id)
      expect(new Set(ids).size, idioma).toBe(ids.length)
    })
  })

  it('cada texto tiene título en los tres idiomas de interfaz', () => {
    cadaTexto((t, idioma, donde) => {
      for (const l of ['es', 'en', 'ca']) expect(t.titulo?.[l], `${donde}.titulo.${l}`).toBeTruthy()
    })
  })

  it('los textos caben en una pantalla', () => {
    // Entre 60 y 120 palabras. Más largo obliga a hacer scroll con el reloj
    // corriendo, y eso mide el móvil y la paciencia, no la vista para el error.
    cadaTexto((t, idioma, donde) => {
      const n = palabrasDe(t.texto).length
      expect(n, `${donde} tiene ${n} palabras`).toBeGreaterThanOrEqual(60)
      expect(n, `${donde} tiene ${n} palabras`).toBeLessThanOrEqual(120)
    })
  })

  it('cada texto tiene trampas de sobra para los tres niveles', () => {
    // "De sobra" y no "justas": si un texto tuviera exactamente las tres
    // trampas del nivel fácil, saldrían siempre las mismas tres y jugarlo dos
    // veces sería recordar, no corregir.
    cadaTexto((t, idioma) => {
      for (const nivel of nivelIdsDe(idioma)) {
        const usables = trampasUsables(t, nivel, idioma).length
        expect(usables, `${idioma}/${t.id} en ${nivel}`).toBeGreaterThan(nivelesDe(idioma)[nivel].errores)
      }
    })
  })
})

describe('estropear el texto no lo rompe', () => {
  it('deshacer los errores devuelve el texto original, letra por letra', () => {
    // La invariante que lo cubre todo: si al sustituir cada palabra estropeada
    // por su correcta sale exactamente el texto de partida, entonces ni se ha
    // perdido puntuación, ni se ha cambiado una palabra que no tocaba, ni se
    // ha estropeado la aparición equivocada de una palabra repetida. También
    // vigila el tokenizador: el punt volat de col·legi y el apóstrofo de don't
    // tienen que quedar DENTRO de la palabra.
    cadaTexto((t, idioma, donde) => {
      for (const nivel of nivelIdsDe(idioma)) {
        for (let i = 0; i < 6; i++) {
          const r = generarRonda(t.id, nivel, idioma)
          const rehecho = r.tokens.map(k => (k.error ? k.correcta : k.s)).join('')
          expect(rehecho, `${donde}/${nivel}`).toBe(t.texto)
        }
      }
    })
  })

  it('salen tantos errores como dice el marcador, ni uno más', () => {
    // El número se le enseña al jugador, así que tiene que ser verdad: si
    // dijera 4 y hubiera 3, se quedaría buscando uno que no existe.
    cadaTexto((t, idioma, donde) => {
      for (const nivel of nivelIdsDe(idioma)) {
        for (let i = 0; i < 4; i++) {
          const r = generarRonda(t.id, nivel, idioma)
          expect(r.tokens.filter(k => k.error).length, `${donde}/${nivel}`)
            .toBe(nivelesDe(idioma)[nivel].errores)
          expect(r.nErrores).toBe(r.tokens.filter(k => k.error).length)
        }
      }
    })
  })

  it('cada nivel solo usa sus familias de falta', () => {
    cadaTexto((t, idioma, donde) => {
      for (const nivel of nivelIdsDe(idioma)) {
        for (let i = 0; i < 4; i++) {
          for (const k of generarRonda(t.id, nivel, idioma).tokens) {
            if (k.error) expect(nivelesDe(idioma)[nivel].familias, `${donde}/${nivel}`).toContain(k.familia)
          }
        }
      }
    })
  })

  it('en difícil entra siempre la falta que solo delata la frase', () => {
    // Es lo que diferencia el nivel: una palabra BIEN escrita puesta donde no
    // va. Dejarlo al azar puro haría que la mitad de los textos difíciles
    // fueran el nivel medio con un fallo más. La familia se llama homofono en
    // castellano e inglés y homofon en catalán, porque el nombre sale en
    // pantalla.
    cadaTexto((t, idioma, donde) => {
      const fam = ['homofono', 'homofon'].find(f => familiasDe(idioma)[f])
      if (!fam || !nivelesDe(idioma).dificil.familias.includes(fam)) return
      if (!t.trampas.some(([, , f]) => f === fam)) return
      for (let i = 0; i < 12; i++) {
        const r = generarRonda(t.id, 'dificil', idioma)
        expect(r.tokens.some(k => k.error && k.familia === fam), donde).toBe(true)
      }
    })
  })

  it('los errores cambian de sitio entre partidas del mismo texto', () => {
    // La razón de ser del sorteo: con veinte textos fijos, siete partidas
    // bastarían para haberlos visto todos y a partir de ahí se recordaría
    // dónde estaba el fallo en vez de leerlo.
    cadaTexto((t, idioma, donde) => {
      const combinaciones = new Set()
      for (let i = 0; i < MUESTRA; i++) {
        const r = generarRonda(t.id, 'dificil', idioma)
        combinaciones.add(r.tokens.map((k, j) => (k.error ? j : '')).join(','))
      }
      expect(combinaciones.size, donde).toBeGreaterThan(4)
    })
  })
})

describe('la partida y su puntuación', () => {
  it('cada partida trae tres textos distintos, en el idioma pedido', () => {
    cadaBanco(idioma => {
      const ids = textosDe(idioma).map(t => t.id)
      for (let i = 0; i < 60; i++) {
        const p = generarPartida('medio', [], idioma)
        expect(p.length, idioma).toBe(TEXTOS_POR_PARTIDA)
        expect(new Set(p.map(r => r.id)).size, idioma).toBe(TEXTOS_POR_PARTIDA)
        for (const r of p) expect(ids, idioma).toContain(r.id)
      }
    })
  })

  it('no repite los textos de la partida anterior', () => {
    cadaBanco(idioma => {
      for (let i = 0; i < 60; i++) {
        const antes = generarPartida('medio', [], idioma)
        const ahora = generarPartida('medio', antes.map(r => r.id), idioma)
        for (const r of ahora) expect(antes.map(x => x.id), idioma).not.toContain(r.id)
      }
    })
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
    cadaBanco(idioma => {
      const partida = generarPartida('dificil', [], idioma)
      const deMas = partida.reduce((a, r) => a + r.tokens.filter(k => k.palabra && !k.error).length, 0)
      expect(puntosDe(tiempoFinal({ segundos: 10, deMas })), idioma).toBe(0)
    })
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
