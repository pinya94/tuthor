// Las cifras del catálogo que se anuncian de cara al público.
//
// Este test existe por una cicatriz concreta: la landing llegó a anunciar "34
// juegos y 110 exámenes" en dos sitios a la vez, y un comentario del código
// hablaba de 32, cuando los números reales eran 38 y 137. No hubo mala fe —
// un número escrito a mano en el copy no se entera de que se ha añadido un
// juego. La única defensa es que no se pueda escribir a mano.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { NUM_JUEGOS, NUM_EXAMENES, masDe } from '../cifras.js'
import { GAMES as CATALOGO } from '../../data/constants.js'
import { EXAMS } from '../exams.js'

describe('las cifras salen de los registros', () => {
  it('los juegos son las tarjetas jugables del catálogo', () => {
    expect(NUM_JUEGOS).toBe(CATALOGO.filter(g => g.ready !== false).length)
    expect(NUM_JUEGOS).toBeGreaterThan(0)
  })

  it('los exámenes son los vivos: los retirados no se cuentan', () => {
    const vivos = Object.values(EXAMS).filter(e => !e.retired).length
    const retirados = Object.values(EXAMS).filter(e => e.retired).length
    expect(NUM_EXAMENES).toBe(vivos)
    // Si algún día no quedan retirados el test sigue valiendo, pero mientras
    // los haya tiene que notarse que quedan fuera.
    if (retirados > 0) expect(NUM_EXAMENES).toBeLessThan(Object.keys(EXAMS).length)
  })

  it('masDe redondea a la baja y nunca promete de más', () => {
    expect(masDe(137)).toBe(130)
    expect(masDe(130)).toBe(130)
    expect(masDe(9)).toBe(0)
    for (const n of [NUM_JUEGOS, NUM_EXAMENES]) {
      expect(masDe(n), 'redondear no puede inflar la cifra').toBeLessThanOrEqual(n)
    }
  })
})

describe('la landing no escribe cifras de catálogo a mano', () => {
  const landing = readFileSync(new URL('../../pages/Landing.jsx', import.meta.url), 'utf8')

  // Los comentarios quedan fuera a propósito: el de cabecera CITA los números
  // viejos ("anunció 34 juegos y 110 exámenes") justo para explicar por qué
  // existe esta regla, y hacerle fallar al test por documentar la cicatriz
  // sería absurdo. Lo que se vigila es el copy que ve el visitante.
  const soloCodigo = landing
    .replace(/\/\*[\s\S]*?\*\//g, '')      // bloques /* */ y {/* */} de JSX
    .split('\n').filter(l => !/^\s*\/\//.test(l)).join('\n')  // líneas //

  it('no hay "<número> juegos/exámenes/jocs/games/quizzes" literal en el copy', () => {
    // Se buscan números de dos o tres cifras pegados a la palabra: es la
    // forma que tenían los que se quedaron obsoletos. Las interpolaciones
    // (`${NUM_JUEGOS} juegos`) no casan, que es justo lo que se quiere.
    const patron = /\b\d{2,3}\s+(juegos|jocs|games|exámenes|exàmens|quizzes|exams)\b/gi
    const encontrados = soloCodigo.match(patron) ?? []
    expect(
      encontrados,
      `Cifras escritas a mano en Landing.jsx: ${encontrados.join(', ')}. ` +
      'Usa NUM_JUEGOS / NUM_EXAMENES de src/lib/cifras.js — los números a mano se quedan obsoletos y acaban mintiendo.',
    ).toEqual([])
  })
})
