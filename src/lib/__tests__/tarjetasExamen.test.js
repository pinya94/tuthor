// Invariantes de las tarjetas de repaso hechas con los bancos de examen.
//
// Lo que de verdad puede romperse aquí no es el reparto (eso es una función de
// cinco líneas): es la CONEXIÓN con diecisiete ficheros de datos que se editan
// por otros motivos. Un banco que cambia de nombre de export, un tema que se
// renombra, un nivel que se queda sin preguntas — nada de eso da error, todo
// da una hoja vacía o media hoja. De ahí que casi todos los tests carguen los
// bancos de verdad en vez de datos de mentira.
import { describe, it, expect } from 'vitest'
import {
  TEMAS_CON_TARJETAS_DE_EXAMEN, temaTieneTarjetasDeExamen,
  cargarTarjetasDeExamen, imprimibleDeBanco,
} from '../tarjetasExamen'
import { MAX_TARJETAS } from '../materialImprimible'
import { TEMA_DISCIPLINA } from '../../data/ciencias'

const IDIOMAS = ['es', 'en', 'ca']

describe('el mapa de temas', () => {
  it('todos los temas apuntan a un tema de ciencias que existe', () => {
    // Si alguien renombra un tema en ciencias.js, aquí se queda una clave
    // huérfana: el botón simplemente deja de salir, sin ruido.
    for (const clave of TEMAS_CON_TARJETAS_DE_EXAMEN) {
      const [materia, tema] = clave.split('/')
      expect(TEMA_DISCIPLINA[tema], `${clave}: el tema no existe en ciencias.js`).toBe(materia)
    }
  })

  it('temaTieneTarjetasDeExamen dice que sí solo a los del mapa', () => {
    expect(temaTieneTarjetasDeExamen('biologia', 'celula')).toBe(true)
    expect(temaTieneTarjetasDeExamen('biologia', 'tema-inventado')).toBe(false)
    expect(temaTieneTarjetasDeExamen('historia', 'roma')).toBe(false)
  })
})

describe('cada banco real', () => {
  it.each(TEMAS_CON_TARJETAS_DE_EXAMEN)('%s da tarjetas con contenido', async clave => {
    const [materia, tema] = clave.split('/')
    const def = await cargarTarjetasDeExamen(materia, tema)
    expect(def, `${clave}: no cargó`).not.toBe(null)

    const variantes = def.variantes('es')
    expect(variantes.length, `${clave}: ningún nivel llega al mínimo`).toBeGreaterThan(0)

    for (const v of variantes) {
      const tarjetas = def.tarjetas(v.id, 'es')
      // El número del botón tiene que ser el que sale impreso.
      expect(tarjetas.length, `${clave}/${v.id}: el botón anuncia ${v.n}`).toBe(v.n)
      expect(tarjetas.length).toBeLessThanOrEqual(MAX_TARJETAS)
      for (const t of tarjetas) {
        expect(String(t.frente).trim(), `${clave}/${v.id}: pregunta vacía`).not.toBe('')
        expect(String(t.dorso).trim(), `${clave}/${v.id}: respuesta vacía`).not.toBe('')
      }
    }
  })

  it.each(TEMAS_CON_TARJETAS_DE_EXAMEN)('%s reparte el banco ENTERO, no un trozo', async clave => {
    // Este es el test que justifica el campo `clave` del mapa. Unos ficheros
    // exportan PREGUNTAS con todo y otros solo PREGUNTAS_ESO, que en ellos ES
    // el banco entero. Elegir mal no da error: da media hoja en silencio. Si
    // el banco tuviera preguntas de primaria y aquí solo saliera el nivel de
    // ESO, sabríamos que se está leyendo el export equivocado.
    const [materia, tema] = clave.split('/')
    const def = await cargarTarjetasDeExamen(materia, tema)
    const total = def.variantes('es').reduce((n, v) => n + v.n, 0)
    expect(total, `${clave}: solo ${total} tarjetas en total`).toBeGreaterThanOrEqual(10)
  })

  it.each(TEMAS_CON_TARJETAS_DE_EXAMEN)('%s está traducido en los tres idiomas', async clave => {
    const [materia, tema] = clave.split('/')
    const def = await cargarTarjetasDeExamen(materia, tema)
    for (const lang of IDIOMAS) {
      expect(def.titulo[lang], `${clave}: título sin ${lang}`).toBeTruthy()
      expect(def.desc[lang]).toBeTruthy()
      expect(def.comoUsarlo[lang]).toBeTruthy()
      expect(def.asignatura[lang]).toBeTruthy()
      for (const v of def.variantes(lang)) {
        const tarjetas = def.tarjetas(v.id, lang)
        expect(tarjetas.length, `${clave}/${v.id}/${lang}`).toBe(v.n)
        for (const t of tarjetas) {
          expect(String(t.dorso).trim(), `${clave}/${v.id}/${lang}: respuesta vacía`).not.toBe('')
        }
      }
    }
  })

  it('todas van en formato plegable', async () => {
    // Las respuestas son frases enteras; en el reparto de tira (un tercio de
    // columna) salen ilegibles. Ver HojasImprimibles.jsx.
    for (const clave of TEMAS_CON_TARJETAS_DE_EXAMEN) {
      const [materia, tema] = clave.split('/')
      const def = await cargarTarjetasDeExamen(materia, tema)
      expect(def.formato, clave).toBe('plegable')
    }
  })
})

describe('imprimibleDeBanco', () => {
  const banco = { emoji: '🧪', nombre: { es: 'Prueba', en: 'Test', ca: 'Prova' } }
  const pregunta = (nivel, i) => ({
    nivel,
    emoji: '❓',
    pregunta: { es: `P${i}`, en: `Q${i}`, ca: `P${i}` },
    correcta: { es: `R${i}`, en: `A${i}`, ca: `R${i}` },
  })

  it('esconde los niveles que no llenan una hoja', () => {
    // Dos preguntas de bachillerato no son un juego de tarjetas: es peor
    // ofrecer el botón que no ofrecerlo.
    const def = imprimibleDeBanco(banco, [
      ...Array.from({ length: 6 }, (_, i) => pregunta('eso', i)),
      pregunta('bachillerato', 90),
      pregunta('bachillerato', 91),
    ], 'quimica')
    expect(def.variantes('es').map(v => v.id)).toEqual(['eso'])
  })

  it('recorta a MAX_TARJETAS y lo dice en el botón', () => {
    const def = imprimibleDeBanco(banco, Array.from({ length: 80 }, (_, i) => pregunta('eso', i)), 'quimica')
    const [v] = def.variantes('es')
    expect(v.n).toBe(MAX_TARJETAS)
    expect(def.tarjetas('eso', 'es')).toHaveLength(MAX_TARJETAS)
  })

  it('los niveles salen de menor a mayor, no en el orden del banco', () => {
    const def = imprimibleDeBanco(banco, [
      ...Array.from({ length: 4 }, (_, i) => pregunta('bachillerato', i)),
      ...Array.from({ length: 4 }, (_, i) => pregunta('eso', 10 + i)),
      ...Array.from({ length: 4 }, (_, i) => pregunta('primaria', 20 + i)),
    ], 'fisica')
    expect(def.variantes('es').map(v => v.id)).toEqual(['primaria', 'eso', 'bachillerato'])
  })

  it('una variante que no existe da lista vacía, no un error', () => {
    const def = imprimibleDeBanco(banco, [pregunta('eso', 1)], 'quimica')
    expect(def.tarjetas('nivel-inventado', 'es')).toEqual([])
  })
})

describe('cargarTarjetasDeExamen', () => {
  it('un tema sin banco da null en vez de reventar', async () => {
    expect(await cargarTarjetasDeExamen('historia', 'roma')).toBe(null)
    expect(await cargarTarjetasDeExamen('biologia', 'no-existe')).toBe(null)
    expect(await cargarTarjetasDeExamen(undefined, undefined)).toBe(null)
  })
})
