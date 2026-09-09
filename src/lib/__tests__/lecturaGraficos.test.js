// Invariantes del motor de Lee el Gráfico.
//
// Un generador aleatorio no se puede comprobar con tres ejemplos: el caso que
// rompe sale una vez de cada mil. Así que se generan miles de preguntas y se
// comprueba que TODAS cumplen las reglas. Escribiendo esto salieron dos fallos
// reales que no se habrían visto jugando un rato: poblaciones negativas (2.154
// de 21.000) y preguntas de variación con solo tres opciones (910).
import { describe, it, expect } from 'vitest'
import { RANGOS, CONTEXTOS, CONTEXTO_IDS, PARES, PAR_IDS, generarPregunta, generarDatos, formatear } from '../lecturaGraficos'

const MUESTRA = 2000

function cada(fn) {
  for (const [nivel, dif] of Object.entries(RANGOS)) {
    for (let i = 0; i < MUESTRA; i++) fn(generarPregunta(dif, 'es'), nivel, dif)
  }
}

describe('la pregunta siempre se puede contestar', () => {
  it('la respuesta correcta está entre las opciones', () => {
    cada((p, nivel) => {
      expect(p.opciones, `${nivel}/${p.tipo}: la correcta no está`).toContain(p.correcta)
    })
  })

  it('no hay opciones repetidas', () => {
    // Dos opciones idénticas convierten una pregunta de cuatro en una de tres,
    // y si además una de ellas es la correcta, en una con dos aciertos.
    cada((p, nivel) => {
      expect(new Set(p.opciones).size, `${nivel}/${p.tipo}: ${p.opciones.join(' | ')}`).toBe(p.opciones.length)
    })
  })

  it('cada tipo ofrece el número de opciones que le toca', () => {
    // Tendencia son tres (crece, decrece, estable) y las de dos salidas —¿mejora
    // o empeora?— son dos: inventar dos opciones más para llegar a cuatro
    // significaría inventar dos respuestas que no existen. El resto, cuatro.
    // Las de dos salidas —¿mejora o empeora?, ¿Marta o Iván?— son de dos:
    // inventar dos opciones más sería inventar respuestas que no existen.
    const esperadas = {
      tendencia: 3,
      'serie-mayor': 2, 'derivada-tendencia': 2,
      'mejor-media': 2, 'mas-regular': 2, 'comparar-puntos': 2,
    }
    cada((p, nivel) => {
      expect(p.opciones.length, `${nivel}/${p.tipo}`).toBe(esperadas[p.tipo] ?? 4)
    })
  })

  it('no queda ningún marcador de plantilla sin sustituir', () => {
    cada(p => expect(p.pregunta, 'plantilla a medio rellenar').not.toMatch(/[{}]/))
  })
})

describe('los datos son dibujables y tienen sentido', () => {
  it('ningún valor es negativo ni infinito', () => {
    // Una población de −34.000 habitantes no es un gráfico difícil: es uno roto.
    cada((p, nivel) => {
      for (const v of [...p.valores, ...(p.segunda ?? [])]) {
        expect(Number.isFinite(v), `${nivel}: valor no finito`).toBe(true)
        expect(v, `${nivel}/${p.contexto.id}: valor negativo`).toBeGreaterThanOrEqual(0)
      }
    })
  })

  it('hay tantos valores como etiquetas del eje', () => {
    // Ya no se compara con dif.n: cada familia de la dificultad difícil trae
    // los puntos que necesita (cinco para una media, cuatro evaluaciones para
    // un duelo). Lo que no puede fallar nunca es que sobren o falten
    // etiquetas, porque entonces hay barras sin año debajo.
    cada((p, nivel) => {
      expect(p.etiquetas, `${nivel}/${p.tipo}`).toHaveLength(p.valores.length)
      if (p.segunda) expect(p.segunda, `${nivel}/${p.tipo}`).toHaveLength(p.valores.length)
      expect(p.valores.length, `${nivel}/${p.tipo}: muy pocos puntos`).toBeGreaterThanOrEqual(4)
    })
  })

  it('la fácil es de una sola serie y la difícil reparte entre sus tres familias', () => {
    for (let i = 0; i < 300; i++) expect(generarPregunta(RANGOS.facil, 'es').segunda).toBeNull()
    const vistas = {}
    for (let i = 0; i < 3000; i++) {
      const f = generarPregunta(RANGOS.dificil, 'es').familia
      vistas[f] = (vistas[f] ?? 0) + 1
    }
    // Que estén las tres y ninguna se coma la partida: difícil dejó de ser
    // una sola mecánica repetida justamente por esto.
    for (const f of ['relacion', 'medida', 'grupos']) {
      expect(vistas[f] / 3000, `${f} sale el ${Math.round((vistas[f] ?? 0) / 30)} % de las veces`).toBeGreaterThan(0.2)
    }
  })
})

describe('la respuesta coincide con lo que se ve en el dibujo', () => {
  it('lo que dice de la tendencia se ve comparando el primer punto con el último', () => {
    // Es la regla más importante del motor: si el ruido pudiera invertir el
    // paso, el juego diría "está creciendo" sobre una gráfica que baja.
    cada(p => {
      if (p.tipo !== 'tendencia') return
      const d = p.valores.at(-1) - p.valores[0]
      if (p.tendencia === 'sube') expect(d, 'dice que sube y no sube').toBeGreaterThan(0)
      if (p.tendencia === 'baja') expect(d, 'dice que baja y no baja').toBeLessThan(0)
      if (p.tendencia === 'estable') expect(Math.abs(d), 'dice estable y se mueve').toBeLessThanOrEqual(2)
    })
  })

  it('el máximo y el mínimo señalados son el máximo y el mínimo, y son únicos', () => {
    // La unicidad importa tanto como el valor: si dos puntos empatan en el
    // máximo, hay dos respuestas buenas y solo una cuenta como acierto.
    cada(p => {
      if (p.tipo !== 'maximo' && p.tipo !== 'minimo') return
      const i = p.etiquetas.indexOf(p.correcta)
      const objetivo = p.tipo === 'maximo' ? Math.max(...p.valores) : Math.min(...p.valores)
      expect(p.valores[i], `${p.tipo} mal señalado`).toBe(objetivo)
      expect(p.valores.filter(v => v === objetivo), `${p.tipo} empatado: hay dos respuestas buenas`).toHaveLength(1)
    })
  })

  it('sobre una serie plana solo se pregunta por la tendencia', () => {
    // Sin esto salían preguntas sin respuesta única —el máximo empata con el
    // mínimo— y variaciones de "+0 hab.", que además de inútiles parecen un
    // error del juego. Se vio jugando, no en los tests: de ahí este.
    cada(p => {
      if (p.tendencia !== 'estable') return
      expect(p.tipo, 'una recta horizontal no da para esta pregunta').toBe('tendencia')
    })
  })

  it('el tramo de mayor subida es único', () => {
    cada(p => {
      if (p.tipo !== 'mayor-subida') return
      const saltos = p.valores.slice(1).map((v, i) => v - p.valores[i])
      const mejor = Math.max(...saltos)
      expect(saltos.filter(d => d === mejor), 'dos tramos suben lo mismo').toHaveLength(1)
    })
  })

  it('no se pregunta por una variación de cero', () => {
    cada(p => {
      if (p.tipo !== 'variacion') return
      expect(p.bruto, 'variación de 0: la pregunta no dice nada').not.toBe(0)
    })
  })

  it('el tramo de mayor subida es el de mayor subida, no el del valor más alto', () => {
    // Confundir los dos es el error clásico al leer una gráfica, así que el
    // motor no puede cometerlo él.
    cada(p => {
      if (p.tipo !== 'mayor-subida') return
      const saltos = p.valores.slice(1).map((v, i) => v - p.valores[i])
      const i = p.etiquetas.indexOf(p.correcta.split(' → ')[0])
      expect(saltos[i], 'no es el mayor aumento').toBe(Math.max(...saltos))
    })
  })

  it('donde dice que se cruzan las series, se cruzan', () => {
    cada(p => {
      if (p.tipo !== 'cruce') return
      const i = p.etiquetas.indexOf(p.correcta)
      if (i === 0) return
      expect(p.segunda[i] > p.valores[i], 'ahí B no supera a A').toBe(true)
      expect(p.segunda.slice(0, i).every((v, k) => v <= p.valores[k]), 'ya se habían cruzado antes').toBe(true)
    })
  })

  it('la variación es la resta de los dos puntos que la pregunta señala', () => {
    // Los dos tipos con aritmética son los únicos donde el motor puede dar una
    // respuesta que NO se deduce del gráfico, y eran justo los que no estaban
    // comprobados. Se mira el valor sin formatear (`bruto`) en vez de
    // desmontar la cadena "−36.000 hab.", que es como se cuelan los errores.
    cada(p => {
      if (p.tipo !== 'variacion') return
      const [a, b] = p.marcar
      expect(p.bruto, 'la variación no es la resta de los puntos marcados').toBe(p.valores[b] - p.valores[a])
      // Y el signo del texto tiene que coincidir con el del número.
      expect(p.correcta.startsWith(p.bruto >= 0 ? '+' : '−'), `signo mal en "${p.correcta}"`).toBe(true)
    })
  })

  it('el porcentaje sale de los datos y va redondeado a múltiplos de 5', () => {
    // La pregunta dice "aproximadamente" a propósito: exigir el decimal exacto
    // convertiría un ejercicio de lectura en uno de calculadora.
    cada(p => {
      if (p.tipo !== 'porcentaje') return
      const [a, b] = p.marcar
      const real = ((p.valores[b] - p.valores[a]) / p.valores[a]) * 100
      // Math.abs porque en JavaScript −35 % 5 da −0, y toBe(0) distingue el
      // cero negativo del positivo: fallaría por el signo, no por el resto.
      expect(Math.abs(p.bruto % 5), 'no está redondeado a múltiplo de 5').toBe(0)
      expect(Math.abs(p.bruto - real), `${p.bruto} % se aleja demasiado del ${real.toFixed(1)} % real`).toBeLessThanOrEqual(2.5)
    })
  })

  it('la serie mayor señalada es la mayor en ese punto', () => {
    cada(p => {
      if (p.tipo !== 'serie-mayor') return
      const i = p.marcar[0]
      expect(p.correcta).toBe(p.valores[i] >= p.segunda[i] ? 'A' : 'B')
    })
  })
})

describe('contextos', () => {
  it('todos tienen sus textos en los tres idiomas', () => {
    for (const id of CONTEXTO_IDS) {
      const c = CONTEXTOS[id]
      for (const campo of ['materia', 'sujeto', 'magnitud', 'ejeX', 'unidad']) {
        for (const lang of ['es', 'en', 'ca']) {
          expect(c[campo]?.[lang], `${id}.${campo}.${lang}`).toBeDefined()
        }
      }
      expect(['linea', 'barras'], `${id}: tipo de gráfico raro`).toContain(c.grafico)
    }
  })

  it('el formato aplica la escala del contexto', () => {
    // 45 en un gráfico de población son 45.000 habitantes, no 45.
    expect(formatear(45, CONTEXTOS.poblacion, 'es')).toContain('45.000')
    expect(formatear(23, CONTEXTOS.temperatura, 'es')).toContain('23')
    expect(formatear(23, CONTEXTOS.temperatura, 'es')).toContain('°C')
  })

  it('se puede pedir un contexto concreto y lo respeta', () => {
    for (const id of CONTEXTO_IDS) {
      expect(generarPregunta(RANGOS.medio, 'es', id).contexto.id).toBe(id)
    }
  })

  it('generarDatos declara la forma que ha generado, y la respeta si se le pide una', () => {
    const FORMAS = ['sube', 'baja', 'estable', 'pico', 'valle']
    for (let i = 0; i < 500; i++) {
      expect(FORMAS).toContain(generarDatos(RANGOS.medio).tendencia)
    }
    // Pedir una forma concreta es lo que permite que la pregunta del máximo
    // salga sobre un pico en vez de sobre una recta.
    for (const f of FORMAS) {
      for (let i = 0; i < 100; i++) {
        expect(generarDatos(RANGOS.medio, f).tendencia, `pedí ${f} y no lo dio`).toBe(f)
      }
    }
  })

  it('un pico tiene su máximo dentro, no en un extremo', () => {
    // Es toda la razón de que exista esta forma: con series monótonas, "¿cuándo
    // fue el máximo?" se acertaba mirando solo el primer y el último punto.
    for (let i = 0; i < 400; i++) {
      const { valores } = generarDatos(RANGOS.medio, 'pico')
      const i2 = valores.indexOf(Math.max(...valores))
      expect(i2, 'el pico está en un extremo').toBeGreaterThan(0)
      expect(i2, 'el pico está en un extremo').toBeLessThan(valores.length - 1)
    }
    for (let i = 0; i < 400; i++) {
      const { valores } = generarDatos(RANGOS.medio, 'valle')
      const i2 = valores.indexOf(Math.min(...valores))
      expect(i2).toBeGreaterThan(0)
      expect(i2).toBeLessThan(valores.length - 1)
    }
  })
})

describe('el reparto de preguntas no se hace monótono', () => {
  it('las series planas son minoría', () => {
    // Una serie estable solo admite una pregunta, así que si salieran un
    // tercio de las veces, un tercio de la partida sería idéntico. Se vio
    // jugando: cuatro "se mantiene estable" en ocho rondas seguidas.
    let estables = 0
    const N = 3000
    for (let i = 0; i < N; i++) if (generarPregunta(RANGOS.medio, 'es').tendencia === 'estable') estables++
    expect(estables / N, `${Math.round(estables / N * 100)} % de series planas`).toBeLessThan(0.28)
    expect(estables, 'las estables han desaparecido del todo').toBeGreaterThan(0)
  })

  it('en dificultad media salen al menos cuatro tipos de pregunta distintos', () => {
    const tipos = new Set()
    for (let i = 0; i < 1500; i++) tipos.add(generarPregunta(RANGOS.medio, 'es').tipo)
    expect(tipos.size, `solo salen: ${[...tipos].join(', ')}`).toBeGreaterThanOrEqual(4)
  })
})

// ── Dificultad difícil: pares de series con relación ─────────────────────────
// La primera versión pintaba dos series llamadas A y B y preguntaba cuándo se
// cruzaban. No significaba nada. Ahora son las dos mitades de una cuenta
// —ingresos y gastos, nacimientos y defunciones— y se pregunta por lo que sale
// de restarlas, que es lo que preguntaría un profesor.
describe('pares de series con relación real', () => {
  // Solo la familia 'relacion': difícil también trae medias y duelos, que no
  // tienen derivada ninguna.
  const cadaPar = fn => {
    for (let i = 0; i < 6000; i++) {
      const p = generarPregunta(RANGOS.dificil, 'es')
      if (p.familia === 'relacion') fn(p)
    }
  }

  it('la magnitud derivada es exactamente la resta de las dos series', () => {
    // Si el gráfico y la derivada se separaran, el juego preguntaría por un
    // beneficio que no se puede sacar de las barras dibujadas.
    cadaPar(p => {
      expect(p.valores.map((v, i) => v - p.segunda[i]), `${p.par.id}: la derivada no cuadra`).toEqual(p.derivada)
    })
  })

  it('las dos series son positivas y caen en la cuadrícula', () => {
    // Ni ingresos ni defunciones negativos, y todo en múltiplos de 5 para que
    // "¿cuál fue el beneficio?" se pueda leer y no haya que medir píxeles.
    cadaPar(p => {
      for (const v of [...p.valores, ...p.segunda]) {
        expect(v, `${p.par.id}: valor negativo`).toBeGreaterThanOrEqual(0)
        expect(v % 5, `${p.par.id}: ${v} no cae en la cuadrícula`).toBe(0)
      }
    })
  })

  it('las series llevan nombre, no "A" y "B"', () => {
    cadaPar(p => {
      expect(p.leyenda).toHaveLength(2)
      expect(p.leyenda[0], 'serie sin nombre').not.toBe('A')
      expect(p.leyenda[0].length, 'nombre vacío').toBeGreaterThan(2)
    })
  })

  it('el año de pérdidas es el único año de pérdidas', () => {
    cadaPar(p => {
      if (p.tipo !== 'signo-año') return
      const i = p.etiquetas.indexOf(p.correcta)
      expect(p.derivada[i], 'el año señalado no es negativo').toBeLessThan(0)
      expect(p.derivada.filter(v => v < 0), 'hay más de un año en negativo').toHaveLength(1)
    })
  })

  it('el año de mayor beneficio lo es de verdad, y solo uno', () => {
    cadaPar(p => {
      if (p.tipo !== 'derivada-max') return
      const i = p.etiquetas.indexOf(p.correcta)
      const tope = Math.max(...p.derivada)
      expect(p.derivada[i], 'no es el máximo de la derivada').toBe(tope)
      expect(p.derivada.filter(v => v === tope), 'dos años empatados en el máximo').toHaveLength(1)
    })
  })

  it('el cambio de signo es único y está donde dice', () => {
    // Vale en las dos direcciones: de pérdidas a beneficios y al revés.
    cadaPar(p => {
      if (p.tipo !== 'cambio-signo') return
      const i = p.etiquetas.indexOf(p.correcta)
      expect(i, 'el primer año no puede ser un cambio').toBeGreaterThan(0)
      expect(Math.sign(p.derivada[i]), 'ahí no cambia el signo').not.toBe(Math.sign(p.derivada[i - 1]))
      expect(p.derivada.slice(i).every(v => Math.sign(v) === Math.sign(p.derivada[i])), 'el signo vuelve a cambiar').toBe(true)
      expect(p.derivada.slice(0, i).every(v => Math.sign(v) === Math.sign(p.derivada[0])), 'ya cambiaba antes').toBe(true)
    })
  })

  it('el valor preguntado es la derivada de ese año', () => {
    cadaPar(p => {
      if (p.tipo !== 'derivada-valor') return
      expect(p.bruto).toBe(p.derivada[p.marcar[0]])
    })
  })

  it('mejorar y empeorar salen a partes parecidas', () => {
    // La primera versión solo generaba series que iban a mejor: el 83 % de las
    // respuestas eran "mejora" y se acertaba sin mirar el gráfico. Ahora las
    // tres historias —un año malo, remontar y hundirse— salen por igual.
    let mejora = 0, total = 0
    for (let i = 0; i < 4000; i++) {
      const p = generarPregunta(RANGOS.dificil, 'es')
      if (p.tipo !== 'derivada-tendencia') continue
      total++
      if (/Mejora/.test(p.correcta)) mejora++
    }
    const ratio = mejora / total
    expect(ratio, `${Math.round(ratio * 100)} % de "mejora": se acierta sin mirar`).toBeGreaterThan(0.3)
    expect(ratio, `${Math.round(ratio * 100)} % de "mejora"`).toBeLessThan(0.7)
  })

  it('no queda ningún artículo mal concordado', () => {
    // "el variación de socios" es lo que salía antes de calcular el género.
    cadaPar(p => {
      expect(p.pregunta, `concordancia: "${p.pregunta}"`).not.toMatch(/\bel (variación|evolución|balanza)/)
      expect(p.pregunta, 'plantilla sin rellenar').not.toMatch(/[{}]/)
    })
  })
})

// ── Las otras dos familias de la dificultad difícil ──────────────────────────
describe('familia "medida": sacar la media o la mediana de un gráfico', () => {
  const cadaMedida = fn => {
    for (let i = 0; i < 6000; i++) {
      const p = generarPregunta(RANGOS.dificil, 'es')
      if (p.familia === 'medida') fn(p)
    }
  }

  it('la media que da por buena es la media de las barras dibujadas', () => {
    cadaMedida(p => {
      if (p.tipo !== 'media') return
      const real = p.valores.reduce((a, b) => a + b, 0) / p.valores.length
      expect(p.bruto, `media mal: ${p.valores.join(',')}`).toBe(real)
    })
  })

  it('la media sale siempre entera: no hay que discutir si tocaba redondear', () => {
    cadaMedida(p => {
      const suma = p.valores.reduce((a, b) => a + b, 0)
      expect(suma % p.valores.length, `${p.valores.join(',')} no promedia a un entero`).toBe(0)
    })
  })

  it('la mediana es el valor central de verdad', () => {
    cadaMedida(p => {
      if (p.tipo !== 'mediana') return
      const orden = [...p.valores].sort((a, b) => a - b)
      expect(p.bruto).toBe(orden[Math.floor(orden.length / 2)])
    })
  })

  it('media y mediana nunca coinciden, y la otra siempre está entre las opciones', () => {
    // Si coincidieran, acertar no demostraría haber entendido cuál era cuál.
    // Y como confundirlas es EL error del tema, la otra medida tiene que estar
    // ahí para poder caer en él.
    cadaMedida(p => {
      if (p.tipo !== 'media' && p.tipo !== 'mediana') return
      const orden = [...p.valores].sort((a, b) => a - b)
      const media = p.valores.reduce((a, b) => a + b, 0) / p.valores.length
      const mediana = orden[Math.floor(orden.length / 2)]
      expect(media, 'media y mediana coinciden').not.toBe(mediana)
      const otra = p.tipo === 'media' ? mediana : media
      expect(p.opciones.some(o => o.startsWith(String(otra))), 'falta la otra medida como distractor').toBe(true)
    })
  })

  it('el recuento de valores por encima de la media es el real', () => {
    cadaMedida(p => {
      if (p.tipo !== 'sobre-media') return
      const media = p.valores.reduce((a, b) => a + b, 0) / p.valores.length
      expect(p.bruto).toBe(p.valores.filter(v => v > media).length)
    })
  })
})

describe('familia "grupos": dos protagonistas y sus marcas', () => {
  const cadaDuelo = fn => {
    for (let i = 0; i < 6000; i++) {
      const p = generarPregunta(RANGOS.dificil, 'es')
      if (p.familia === 'grupos') fn(p)
    }
  }
  const media = xs => xs.reduce((a, b) => a + b, 0) / xs.length
  const rango = xs => Math.max(...xs) - Math.min(...xs)

  it('las dos medias son enteras y distintas', () => {
    // Empatadas, "¿quién tiene mejor media?" no tiene respuesta.
    cadaDuelo(p => {
      expect(media(p.valores) % 1, 'media con decimales').toBe(0)
      expect(media(p.segunda) % 1, 'media con decimales').toBe(0)
      expect(media(p.valores), 'las dos medias empatan').not.toBe(media(p.segunda))
    })
  })

  it('quien gana en media es quien de verdad tiene la media más alta', () => {
    cadaDuelo(p => {
      if (p.tipo !== 'mejor-media') return
      const gana = media(p.valores) > media(p.segunda) ? p.leyenda[0] : p.leyenda[1]
      expect(p.correcta).toBe(gana)
    })
  })

  it('el más regular es el de menor diferencia entre su mejor y su peor marca', () => {
    cadaDuelo(p => {
      if (p.tipo !== 'mas-regular') return
      expect(rango(p.valores), 'los dos rangos empatan').not.toBe(rango(p.segunda))
      const regular = rango(p.valores) < rango(p.segunda) ? p.leyenda[0] : p.leyenda[1]
      expect(p.correcta).toBe(regular)
    })
  })

  it('la media pedida es la del protagonista que nombra la pregunta', () => {
    cadaDuelo(p => {
      if (p.tipo !== 'media-de-uno') return
      const deA = p.pregunta.includes(p.leyenda[0])
      expect(p.bruto, `la media no es la de ${deA ? p.leyenda[0] : p.leyenda[1]}`)
        .toBe(media(deA ? p.valores : p.segunda))
    })
  })

  it('los dos protagonistas tienen nombre propio', () => {
    cadaDuelo(p => {
      expect(p.leyenda[0]).not.toBe(p.leyenda[1])
      expect(p.leyenda[0].length).toBeGreaterThan(2)
    })
  })
})

// ── Que el juego no se pueda ganar sin mirar el gráfico ──────────────────────
// Estos tres salieron de una revisión con números, no de jugar: son atajos que
// un alumno encuentra en tres rondas y que vacían el ejercicio.
describe('no hay atajos para acertar sin mirar', () => {
  it('el máximo no cae casi siempre en el primer o el último punto', () => {
    // Medía el 100 % antes de que la pregunta pudiera pedir la forma que
    // necesita. Con eso, contestar "un extremo" a ciegas ganaba siempre.
    let extremo = 0, total = 0
    for (const dif of [RANGOS.facil, RANGOS.medio]) {
      for (let i = 0; i < 3000; i++) {
        const p = generarPregunta(dif, 'es')
        if (p.tipo !== 'maximo' && p.tipo !== 'minimo') continue
        total++
        const i2 = p.etiquetas.indexOf(p.correcta)
        if (i2 === 0 || i2 === p.valores.length - 1) extremo++
      }
    }
    const ratio = extremo / total
    expect(ratio, `${Math.round(ratio * 100)} % en un extremo: se acierta sin mirar`).toBeLessThan(0.55)
    // Y tampoco al revés: si NUNCA estuviera en un extremo, "descarta los
    // extremos" sería otra regla que aprenderse sin leer el gráfico.
    expect(ratio, 'nunca está en un extremo: eso también es un atajo').toBeGreaterThan(0.15)
  })

  it('las preguntas que exigen leer un valor no salen con el eje truncado', () => {
    // "¿Cuánto cambió entre 2015 y 2016?" con el eje recortado y sin cifras
    // encima de las barras es adivinar. Salían así el 100 %.
    cada(p => {
      if (p.tipo !== 'variacion' && p.tipo !== 'porcentaje') return
      expect(p.ejeTruncado && !p.etiquetarValores, `${p.tipo} con el eje truncado y sin cifras`).toBe(false)
    })
  })

  it('las preguntas de media se pueden hacer de cabeza', () => {
    // Promediar 27, 35, 39 y 43 no es leer un gráfico, es aritmética a mano.
    // Los datos de las preguntas con cuenta van siempre juntos; los duelos de
    // números grandes se quedan con las de comparar, que no exigen calcular.
    const CON_CUENTA = ['media', 'mediana', 'media-de-uno']
    for (let i = 0; i < 6000; i++) {
      const p = generarPregunta(RANGOS.dificil, 'es')
      if (!CON_CUENTA.includes(p.tipo)) continue
      const serie = p.tipo === 'media-de-uno' && p.pregunta.includes(p.leyenda[1]) ? p.segunda : p.valores
      const recorrido = Math.max(...serie) - Math.min(...serie)
      expect(recorrido, `${p.contexto.id}/${p.tipo}: ${serie.join(', ')} está muy disperso`).toBeLessThanOrEqual(9)
      expect(Math.max(...serie), `${p.contexto.id}: números demasiado grandes para hacerlo de cabeza`).toBeLessThanOrEqual(30)
    }
  })
})

describe('comparar dos puntos: la lectura más básica', () => {
  it('el punto señalado es de verdad el más alto de los dos', () => {
    cada(p => {
      if (p.tipo !== 'comparar-puntos') return
      const [a, b] = p.marcar
      const alto = p.valores[a] > p.valores[b] ? p.etiquetas[a] : p.etiquetas[b]
      expect(p.correcta).toBe(alto)
    })
  })

  it('los dos puntos están a distinta altura y no son vecinos', () => {
    // Si empatan no hay respuesta, y si son consecutivos en una serie que sube
    // la respuesta es automática sin mirar: siempre el de la derecha.
    cada(p => {
      if (p.tipo !== 'comparar-puntos') return
      const [a, b] = p.marcar
      expect(p.valores[a], 'los dos puntos empatan').not.toBe(p.valores[b])
      expect(Math.abs(b - a), 'son dos puntos consecutivos').toBeGreaterThanOrEqual(2)
    })
  })
})

describe('hay variedad suficiente para que no se repita', () => {
  it('cada nivel ofrece al menos cuatro tipos de pregunta', () => {
    for (const [nivel, dif] of Object.entries(RANGOS)) {
      const tipos = new Set()
      for (let i = 0; i < 2000; i++) tipos.add(generarPregunta(dif, 'es').tipo)
      expect(tipos.size, `${nivel} solo tiene: ${[...tipos].join(', ')}`).toBeGreaterThanOrEqual(4)
    }
  })

  it('los datos vienen de muchos escenarios distintos, no de dos', () => {
    // Es lo que evita que la partida se reconozca a los cinco minutos: los
    // mismos tipos de pregunta sobre población, vivienda, luz, préstamos de
    // biblioteca, energía, migraciones, goles, notas o cafeterías.
    const escenarios = new Set()
    for (const dif of Object.values(RANGOS)) {
      for (let i = 0; i < 3000; i++) escenarios.add(generarPregunta(dif, 'es').contexto.id)
    }
    expect(escenarios.size, `solo ${escenarios.size} escenarios`).toBeGreaterThanOrEqual(18)
  })
})

describe('el castellano de las preguntas está bien escrito', () => {
  it('ningún sujeto en plural detrás de un verbo en singular', () => {
    // "¿Qué está haciendo los usuarios de una aplicación?" — se ha colado dos
    // veces al añadir contextos nuevos, así que lo vigila un test en vez de mi
    // memoria. La solución es escribir el sujeto en singular ("el número de
    // usuarios"), no inventar una plantilla por número gramatical.
    const MAL = /(está haciendo|le pasa a|Mirando todo el periodo, ¿qué le pasa a) (los|las) /
    for (const lang of ['es']) {
      for (const dif of Object.values(RANGOS)) {
        for (let i = 0; i < 3000; i++) {
          const p = generarPregunta(dif, lang)
          expect(p.pregunta, `concordancia: "${p.pregunta}"`).not.toMatch(MAL)
        }
      }
    }
  })

  it('no queda ningún artículo mal concordado en las magnitudes derivadas', () => {
    for (const dif of Object.values(RANGOS)) {
      for (let i = 0; i < 2000; i++) {
        const p = generarPregunta(dif, 'es')
        expect(p.pregunta).not.toMatch(/\bel (variación|evolución|media|mitjana)\b/)
        expect(p.pregunta).not.toMatch(/\bla (beneficio|saldo|balance|crecimiento)\b/)
      }
    }
  })
})

// ── Familia "tabla": clasificaciones con desempate ───────────────────────────
describe('familia "tabla": leer una clasificación', () => {
  const cadaTabla = fn => {
    for (let i = 0; i < 8000; i++) {
      const p = generarPregunta(RANGOS.dificil, 'es')
      if (p.familia === 'tabla') fn(p)
    }
  }

  it('la regla de desempate va SIEMPRE escrita en el enunciado', () => {
    // Es lo que separa esto de un examen de fútbol. Dar por sabido que
    // desempata la diferencia de goles penalizaría a quien no siga el deporte
    // por algo que no tiene que ver con leer datos.
    cadaTabla(p => {
      if (p.tipo !== 'tabla-ganador') return
      expect(p.pregunta, `sin la regla: "${p.pregunta}"`).toMatch(/Desempata/)
    })
  })

  it('los dos primeros empatan a puntos: sin empate, el desempate sobra', () => {
    cadaTabla(p => {
      expect(p.filas[0].puntos, 'los dos primeros no empatan').toBe(p.filas[1].puntos)
      expect(p.filas[1].puntos, 'la tabla no está ordenada').toBeGreaterThan(p.filas[2].puntos)
    })
  })

  it('todas las diferencias son distintas, y son a favor menos en contra', () => {
    cadaTabla(p => {
      for (const f of p.filas) expect(f.dif, `${f.nombre}`).toBe(f.gf - f.gc)
      const difs = p.filas.map(f => f.dif)
      expect(new Set(difs).size, 'dos equipos con la misma diferencia').toBe(difs.length)
    })
  })

  it('el primero es el de mejor diferencia entre los dos empatados', () => {
    cadaTabla(p => {
      if (p.tipo !== 'tabla-ganador') return
      const [a, b] = p.filas
      expect(p.correcta).toBe(a.dif > b.dif ? a.nombre : b.nombre)
    })
  })

  it('la mejor diferencia de la tabla no siempre es la del líder', () => {
    // Si lo fuera, la pregunta se contestaría mirando la primera fila.
    let distinta = 0, total = 0
    for (let i = 0; i < 8000; i++) {
      const p = generarPregunta(RANGOS.dificil, 'es')
      if (p.tipo !== 'tabla-mejor-dif') continue
      total++
      if (p.correcta !== p.filas[0].nombre) distinta++
    }
    expect(distinta / total, 'siempre gana el líder: se contesta sin mirar').toBeGreaterThan(0.3)
  })

  it('no es solo de fútbol', () => {
    // Un torneo de clase y un concurso de ciencias usan la misma mecánica, y
    // eso deja claro que lo que se examina no es deporte.
    const vistas = new Set()
    cadaTabla(p => vistas.add(p.comp.id))
    expect(vistas.size, `solo salen: ${[...vistas].join(', ')}`).toBeGreaterThanOrEqual(3)
  })
})
