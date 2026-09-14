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
  TEXTOS_POR_EXAMEN, corregirRonda, notaExamen, preguntasSchema, fraseConHueco,
  CATEGORIA_POR_IDIOMA, categoriaDe, idiomaDeTema, EXAMEN_POR_IDIOMA,
} from '../corrigeTexto'
import { findTopic, taskMatchesPlay } from '../topicCatalog'
import { EXAMS } from '../exams'

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

describe('el examen', () => {
  // Marca en una ronda las posiciones que se piden: `faltas` de sus errores
  // y `buenas` de sus palabras bien escritas.
  const marcar = (ronda, faltas, buenas = 0) => {
    const errores = ronda.tokens.map((t, i) => (t.error ? i : -1)).filter(i => i >= 0)
    const correctas = ronda.tokens.map((t, i) => (t.palabra && !t.error ? i : -1)).filter(i => i >= 0)
    return new Set([...errores.slice(0, faltas), ...correctas.slice(0, buenas)])
  }

  it('trae cuatro textos distintos', () => {
    cadaBanco(idioma => {
      const p = generarPartida('medio', [], idioma, TEXTOS_POR_EXAMEN)
      expect(new Set(p.map(r => r.id)).size, idioma).toBe(TEXTOS_POR_EXAMEN)
    })
  })

  it('corregirRonda cuenta lo mismo que se ha marcado', () => {
    cadaBanco(idioma => {
      const r = generarRonda(textosDe(idioma)[0].id, 'medio', idioma)
      expect(corregirRonda(r, marcar(r, 2, 3)), idioma).toEqual({
        encontrados: 2, sinMarcar: r.nErrores - 2, deMas: 3, total: r.nErrores,
      })
    })
  })

  it('un texto perfecto es un diez y uno sin tocar, un cero', () => {
    cadaBanco(idioma => {
      const r = generarRonda(textosDe(idioma)[1].id, 'medio', idioma)
      expect(notaExamen(corregirRonda(r, marcar(r, r.nErrores))), idioma).toBe(10)
      expect(notaExamen(corregirRonda(r, new Set())), idioma).toBe(0)
    })
  })

  it('marcar el texto entero no aprueba', () => {
    // Lo mismo que rompería el juego sin penalización, en versión examen:
    // tocar todas las palabras encuentra todas las faltas a la fuerza.
    cadaBanco(idioma => {
      for (const r of generarPartida('dificil', [], idioma, TEXTOS_POR_EXAMEN)) {
        const todas = new Set(r.tokens.map((t, i) => (t.palabra ? i : -1)).filter(i => i >= 0))
        expect(notaExamen(corregirRonda(r, todas)), `${idioma}/${r.id}`).toBe(0)
      }
    })
  })

  it('cada palabra buena marcada anula una falta encontrada, sin bajar de cero', () => {
    expect(notaExamen({ encontrados: 10, deMas: 0, total: 20 })).toBe(5)
    expect(notaExamen({ encontrados: 10, deMas: 2, total: 20 })).toBe(4)
    expect(notaExamen({ encontrados: 1, deMas: 9, total: 20 })).toBe(0)
    expect(notaExamen({ total: 0 })).toBe(0)
  })

  it('cada falta da una pregunta con su frase, y la frase sale tal cual del texto bien escrito', () => {
    // Sin la frase, «si» o «sí» no tiene respuesta: las dos formas existen.
    // Por eso se comprueba que el contexto, con la palabra buena en el hueco,
    // es literalmente un trozo del texto original: ni otra falta colada ni un
    // corte a mitad de palabra.
    cadaBanco(idioma => {
      for (const r of generarPartida('dificil', [], idioma, TEXTOS_POR_EXAMEN)) {
        const original = textosDe(idioma).find(t => t.id === r.id).texto
        const qs = preguntasSchema(r, 'es')
        expect(qs.length, `${idioma}/${r.id}`).toBe(r.nErrores)
        r.tokens.forEach((t, i) => {
          if (!t.error) return
          const { antes, despues } = fraseConHueco(r, i)
          expect(original, `${idioma}/${r.id}: ${t.correcta}`).toContain(antes + t.correcta + despues)
        })
        for (const q of qs) {
          expect(q.question, `${idioma}/${r.id}`).toContain('___')
          expect(q.correctAnswer, `${idioma}/${r.id}`).not.toBe(q.wrongAnswers[0])
        }
      }
    })
  })
})

describe('idioma del texto → tareas del catálogo', () => {
  it('cada idioma guarda una categoría distinta, y la inversa la recupera', () => {
    const cats = Object.values(CATEGORIA_POR_IDIOMA)
    expect(new Set(cats).size).toBe(cats.length)
    for (const idioma of IDIOMA_IDS) expect(idiomaDeTema(categoriaDe(idioma))).toBe(idioma)
    expect(idiomaDeTema('otra-cosa')).toBeNull()
  })

  it('el castellano es un tema de Lengua, el inglés uno de Inglés y el catalán ninguno', () => {
    const materia = idioma => findTopic({ gameId: 'corrige-el-texto', category: categoriaDe(idioma) })?.materia ?? null
    expect(materia('es')).toBe('lengua')
    expect(materia('en')).toBe('ingles')
    expect(materia('ca')).toBeNull()
  })

  it('una tarea de Lengua no se completa jugando el texto en otro idioma', () => {
    // El fallo que había: la categoría era siempre 'correccion'.
    const tarea = { kind: 'catalog', gameId: 'corrige-el-texto', category: categoriaDe('es') }
    expect(taskMatchesPlay(tarea, { gameId: 'corrige-el-texto', category: categoriaDe('es') })).toBe(true)
    expect(taskMatchesPlay(tarea, { gameId: 'corrige-el-texto', category: categoriaDe('en') })).toBe(false)
    expect(taskMatchesPlay(tarea, { gameId: 'corrige-el-texto', category: categoriaDe('ca') })).toBe(false)
  })

  it('cada examen está registrado en la materia del tema de su idioma', () => {
    for (const [idioma, examId] of Object.entries(EXAMEN_POR_IDIOMA)) {
      const exam = EXAMS[examId]
      expect(exam?.path, examId).toBe(`examen/${examId}`)
      const juego = findTopic({ gameId: 'corrige-el-texto', category: categoriaDe(idioma) })
      const delExamen = findTopic({ gameId: examId, category: examId })
      expect(delExamen?.materia, examId).toBe(juego.materia)
      expect(delExamen?.tema, examId).toBe(juego.tema)
      expect(exam.subject, examId).toBe(juego.materia)
    }
  })
})
