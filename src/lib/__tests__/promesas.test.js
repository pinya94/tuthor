// Que la landing no prometa lo que el código tiene apagado.
//
// Cicatriz concreta: la landing vendió durante meses "le pasas un código
// corto, lo escribe y entra" y "el niño no puede acceder a los ajustes"
// mientras CHILD_CODE_LOGIN_ENABLED estaba a false. Las dos eran falsas —sin
// sesión de hijo no hay código ni modo restringido— y nadie se enteró porque
// apagar el flag escondió la UI pero no tocó el copy de venta.
//
// Es la clase de fallo que no da error: la página se pinta perfecta y miente.
// Un padre se registra esperando algo que no existe.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { CHILD_CODE_LOGIN_ENABLED } from '../childCode.js'
import { MONETIZATION_ENABLED } from '../access.js'

const LANDING = readFileSync(new URL('../../pages/Landing.jsx', import.meta.url), 'utf8')

describe('el copy de la landing conoce los interruptores', () => {
  it('importa CHILD_CODE_LOGIN_ENABLED', () => {
    expect(
      LANDING,
      'Landing.jsx vende el modelo padre-hijo, así que tiene que leer el flag que lo enciende. ' +
      'Ver lib/childCode.js.',
    ).toContain("import { CHILD_CODE_LOGIN_ENABLED } from '../lib/childCode'")
  })

  it('ramifica el copy con él, no lo escribe fijo', () => {
    // Si alguien vuelve a escribir la promesa sin condición, esto cae.
    const ramas = LANDING.match(/CHILD_CODE_LOGIN_ENABLED \?/g) ?? []
    expect(
      ramas.length,
      'El copy que depende del código del hijo tiene que ir en una rama ' +
      '`CHILD_CODE_LOGIN_ENABLED ? … : …`, como ya se hace con MONETIZATION_ENABLED.',
    ).toBeGreaterThanOrEqual(2)
  })

  it('sigue ramificando también el copy de pago', () => {
    // El mismo patrón, para el otro interruptor: si se apaga la monetización
    // y el copy no lo sabe, la página promete un plan que no se puede pagar.
    expect(LANDING.match(/MONETIZATION_ENABLED/g)?.length ?? 0).toBeGreaterThanOrEqual(2)
  })
})

describe('con el código del hijo apagado, no se promete', () => {
  // Estas frases solo pueden salir en la rama del flag encendido. Se buscan
  // en el copy que se publica HOY, reconstruyendo qué rama se compila.
  const PROMESAS_DE_CODIGO = [
    'Le pasas un código corto',
    'código de acceso único',
    'El niño no puede acceder a los ajustes',
  ]

  it('la rama apagada no contiene ninguna de las frases del código', () => {
    if (CHILD_CODE_LOGIN_ENABLED) {
      // Encendido: las frases SÍ deben existir, es su estado correcto.
      for (const frase of PROMESAS_DE_CODIGO) {
        expect(LANDING, `con el flag encendido falta la promesa "${frase}"`).toContain(frase)
      }
      return
    }
    // Apagado: cada frase que siga en el fichero tiene que estar dentro de la
    // rama VERDADERA de un ternario del flag.
    //
    // No vale con mirar "¿hay un ternario más arriba?": las tarjetas van
    // seguidas, así que el ternario de la anterior siempre queda cerca y eso
    // aprobaba cualquier cosa. Lo que decide es si entre el ternario y la
    // frase se ha cruzado el `} : {` que abre la rama falsa.
    for (const frase of PROMESAS_DE_CODIGO) {
      const i = LANDING.indexOf(frase)
      if (i < 0) continue
      const antes = LANDING.slice(0, i)
      const ternario = antes.lastIndexOf('CHILD_CODE_LOGIN_ENABLED ?')
      expect(
        ternario,
        `"${frase}" no tiene ningún ternario del flag por delante: se publica siempre.`,
      ).toBeGreaterThan(-1)
      const entre = antes.slice(ternario)
      expect(
        entre.includes('} : {'),
        `"${frase}" está en la rama FALSA del flag (o fuera de la rama verdadera): ` +
        'se estaría publicando una promesa que el código tiene apagada.',
      ).toBe(false)
    }
  })
})

describe('los interruptores son booleanos de verdad', () => {
  it('para que las ramas de copy sean predecibles', () => {
    expect(typeof CHILD_CODE_LOGIN_ENABLED).toBe('boolean')
    expect(typeof MONETIZATION_ENABLED).toBe('boolean')
  })
})
