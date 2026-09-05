// Invariantes de las preparaciones del microscopio. Lo que de verdad
// importa: que la marca caiga DENTRO de la foto (una marca fuera señala al
// vacío y la pregunta no tiene respuesta posible), que siempre haya cuatro
// opciones distintas con la correcta entre ellas, y que los distractores
// sean del mismo bicho siempre que se pueda — si no, se acierta por
// eliminación sin saber nada.
import { describe, it, expect } from 'vitest'
import { PREPARACIONES, GRUPOS } from '../../data/preparaciones'
import {
  OPCIONES_POR_RONDA, preparacionesDe, gruposDisponibles,
  opcionesPara, nuevaRonda, barajar,
} from '../preparaciones'

describe('datos de las preparaciones', () => {
  it('cada preparación tiene título en los tres idiomas, foto y crédito', () => {
    for (const p of PREPARACIONES) {
      for (const lang of ['es', 'en', 'ca']) {
        expect(p.titulo[lang], `${p.id}.titulo.${lang}`).toBeTruthy()
      }
      expect(p.foto, `${p.id}.foto`).toMatch(/^\/microscopio\/.+\.(jpg|png|webp)$/)
      // El crédito no es opcional: son fotos de terceros aunque la licencia
      // no obligue a atribuir (ver PROCEDENCIA.md).
      expect(p.credito, `${p.id} sin crédito`).toBeTruthy()
      expect(GRUPOS[p.grupo], `${p.id}: grupo "${p.grupo}" no existe`).toBeDefined()
    }
  })

  it('cada zona está nombrada en los tres idiomas y tiene su dato', () => {
    for (const p of PREPARACIONES) {
      expect(p.zonas.length, `${p.id} sin zonas`).toBeGreaterThan(0)
      for (const z of p.zonas) {
        for (const lang of ['es', 'en', 'ca']) {
          expect(z.nombre[lang], `${p.id}/${z.id}.nombre.${lang}`).toBeTruthy()
          expect(z.dato[lang], `${p.id}/${z.id}.dato.${lang}`).toBeTruthy()
        }
      }
    }
  })

  it('ninguna marca se sale de la foto', () => {
    // En porcentaje: el círculo entero (centro ± radio) tiene que caber en
    // 0-100. Una marca que se sale señala fuera de la imagen.
    for (const p of PREPARACIONES) {
      for (const { id, marca } of p.zonas) {
        expect(marca.r, `${p.id}/${id}: radio no positivo`).toBeGreaterThan(0)
        expect(marca.cx - marca.r, `${p.id}/${id} se sale por la izquierda`).toBeGreaterThanOrEqual(0)
        expect(marca.cx + marca.r, `${p.id}/${id} se sale por la derecha`).toBeLessThanOrEqual(100)
        expect(marca.cy - marca.r, `${p.id}/${id} se sale por arriba`).toBeGreaterThanOrEqual(0)
        expect(marca.cy + marca.r, `${p.id}/${id} se sale por abajo`).toBeLessThanOrEqual(100)
      }
    }
  })

  it('dentro de una preparación no hay dos zonas con el mismo nombre', () => {
    // Serían dos opciones idénticas en la misma pregunta: una de las dos
    // sería correcta y no habría forma de elegirla.
    for (const p of PREPARACIONES) {
      const nombres = p.zonas.map(z => z.nombre.es)
      expect(new Set(nombres).size, `${p.id}: nombres repetidos`).toBe(nombres.length)
    }
  })

  it('hay suficientes nombres distintos en total para llenar las opciones', () => {
    const todos = new Set(PREPARACIONES.flatMap(p => p.zonas.map(z => z.nombre.es)))
    expect(todos.size).toBeGreaterThanOrEqual(OPCIONES_POR_RONDA)
  })
})

describe('gruposDisponibles', () => {
  it('solo devuelve grupos que tienen preparaciones detrás', () => {
    for (const g of gruposDisponibles()) {
      expect(preparacionesDe(g).length, `grupo ${g} vacío`).toBeGreaterThan(0)
    }
  })
})

describe('opcionesPara', () => {
  const piojo = PREPARACIONES.find(p => p.id === 'piojo')

  it('incluye la respuesta correcta y no repite ninguna', () => {
    for (const z of piojo.zonas) {
      const op = opcionesPara(piojo, z)
      expect(op).toContain(z.nombre.es)
      expect(new Set(op).size).toBe(op.length)
      expect(op).toHaveLength(OPCIONES_POR_RONDA)
    }
  })

  it('agota las zonas de la MISMA preparación antes de salir fuera', () => {
    // Preguntar por la pata de un piojo ofreciendo "cristal cúbico" se
    // acertaría sin saber nada: las otras partes del mismo bicho son los
    // distractores que obligan a mirar la foto. Solo cuando no llegan a
    // cuatro se completa con otras preparaciones.
    for (const p of PREPARACIONES) {
      const op = opcionesPara(p, p.zonas[0])
      const propios = p.zonas.map(z => z.nombre.es)
      const usados = propios.filter(n => op.includes(n)).length
      expect(usados, `${p.id}: no usó todas sus propias zonas`)
        .toBe(Math.min(propios.length, OPCIONES_POR_RONDA))
    }
  })

  it('completa con otras preparaciones cuando la propia no llega', () => {
    // La hoja solo tiene dos zonas: las otras dos opciones vienen de fuera.
    const hoja = PREPARACIONES.find(p => p.id === 'hoja')
    const op = opcionesPara(hoja, hoja.zonas[0])
    expect(op).toHaveLength(OPCIONES_POR_RONDA)
    expect(new Set(op).size).toBe(OPCIONES_POR_RONDA)
  })

  it('funciona en inglés y catalán', () => {
    for (const lang of ['en', 'ca']) {
      const op = opcionesPara(piojo, piojo.zonas[0], lang)
      expect(op).toContain(piojo.zonas[0].nombre[lang])
      expect(op.every(Boolean)).toBe(true)
    }
  })
})

describe('nuevaRonda', () => {
  it('devuelve foto, zona señalada y opciones que la incluyen', () => {
    const r = nuevaRonda('todas', 'es', () => 0)
    expect(r.preparacion).toBeDefined()
    expect(r.zona).toBeDefined()
    expect(r.opciones).toContain(r.zona.nombre.es)
    expect(r.opciones).toHaveLength(OPCIONES_POR_RONDA)
  })

  it('la zona pertenece siempre a la preparación que se enseña', () => {
    // Señalar en la foto del piojo una zona de la hoja sería una pregunta
    // sin respuesta correcta visible.
    for (let i = 0; i < 40; i++) {
      const r = nuevaRonda()
      expect(r.preparacion.zonas).toContain(r.zona)
    }
  })

  it('filtrando por grupo solo salen preparaciones de ese grupo', () => {
    for (const g of gruposDisponibles()) {
      for (let i = 0; i < 10; i++) {
        expect(nuevaRonda(g).preparacion.grupo).toBe(g)
      }
    }
  })

  it('un grupo sin preparaciones da null, no revienta', () => {
    expect(nuevaRonda('grupo-inventado')).toBe(null)
  })
})

describe('barajar', () => {
  it('no pierde ni duplica elementos', () => {
    const original = ['a', 'b', 'c', 'd']
    const mezclado = barajar(original)
    expect([...mezclado].sort()).toEqual(['a', 'b', 'c', 'd'])
    expect(original).toEqual(['a', 'b', 'c', 'd']) // no muta
  })

  it('la correcta no cae siempre en la misma posición', () => {
    // Sin barajar de verdad, la primera opción sería siempre la respuesta y
    // el juego se resolvería sin mirar la foto.
    const posiciones = new Set()
    for (let i = 0; i < 60; i++) {
      posiciones.add(nuevaRonda('todas', 'es').opciones.indexOf(
        nuevaRonda('todas', 'es').zona.nombre.es,
      ))
    }
    expect(posiciones.size).toBeGreaterThan(1)
  })
})
