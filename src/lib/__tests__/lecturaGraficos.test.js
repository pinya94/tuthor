// Invariantes del motor de Lee el Gráfico.
//
// Un generador aleatorio no se puede comprobar con tres ejemplos: el caso que
// rompe sale una vez de cada mil. Así que se generan miles de preguntas y se
// comprueba que TODAS cumplen las reglas. Escribiendo esto salieron dos fallos
// reales que no se habrían visto jugando un rato: poblaciones negativas (2.154
// de 21.000) y preguntas de variación con solo tres opciones (910).
import { describe, it, expect } from 'vitest'
import { RANGOS, CONTEXTOS, CONTEXTO_IDS, generarPregunta, generarDatos, formatear } from '../lecturaGraficos'

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
    // Tendencia son tres (crece, decrece, estable) y "qué serie es mayor" son
    // dos (A o B). El resto, cuatro.
    const esperadas = { tendencia: 3, 'serie-mayor': 2 }
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
    cada((p, nivel, dif) => {
      expect(p.valores).toHaveLength(dif.n)
      expect(p.etiquetas).toHaveLength(dif.n)
      if (p.segunda) expect(p.segunda).toHaveLength(dif.n)
    })
  })

  it('la dificultad difícil trae siempre dos series y la fácil solo una', () => {
    for (let i = 0; i < 300; i++) {
      expect(generarPregunta(RANGOS.dificil, 'es').segunda).not.toBeNull()
      expect(generarPregunta(RANGOS.facil, 'es').segunda).toBeNull()
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

  it('generarDatos declara la tendencia que ha generado', () => {
    for (let i = 0; i < 500; i++) {
      const d = generarDatos(RANGOS.medio)
      expect(['sube', 'baja', 'estable']).toContain(d.tendencia)
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
