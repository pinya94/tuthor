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

// ── Preguntas repetidas dentro del mismo banco ───────────────────────────────
// Esto se descubrió al imprimir las tarjetas: en la hoja de Electricidad salían
// dos veces "¿Qué hace un interruptor…?" con respuestas distintas. Pero el
// problema no era de las tarjetas — el examen online sirve del mismo banco, así
// que un alumno podía sacar la misma pregunta dos veces en el mismo examen y
// una de las dos versiones contaba como la buena.
//
// Había cinco parejas así, todas de una segunda tanda de preguntas que se
// añadió sin mirar las que ya estaban.
//
// La comparación NO ordena las palabras a propósito: en Estados de la Materia
// hay parejas deliberadas ("¿Cómo se llama el paso de sólido a líquido?" y
// "…de líquido a sólido") que con las palabras ordenadas serían idénticas y
// aquí no lo son. El orden ES la pregunta.
const PALABRAS_VACIAS = new Set(['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'en', 'y', 'o', 'a', 'que', 'se', 'su', 'sus', 'es', 'son', 'con', 'para', 'al', 'lo'])
const normalizar = texto => String(texto ?? '')
  .toLowerCase()
  .normalize('NFD').replace(/\p{Diacritic}/gu, '')
  .replace(/[^a-z0-9 ]/g, ' ')
  .split(/\s+/)
  .filter(palabra => palabra && !PALABRAS_VACIAS.has(palabra))
  .join(' ')

// Dos preguntas son la misma si su texto normalizado coincide, o si una es la
// otra con palabras AÑADIDAS AL FINAL: así se caza "¿Qué hace un interruptor en
// un circuito?" contra "…en un circuito eléctrico?", que es la pareja que sacó
// todo esto a la luz. Compararlas como conjuntos de palabras habría valido
// también, pero entonces "de sólido a líquido" y "de líquido a sólido" serían
// la misma pregunta, y son dos preguntas distintas a propósito.
const esLaMisma = (a, b) => {
  if (a === b) return true
  const [corta, larga] = a.length < b.length ? [a, b] : [b, a]
  // Con menos de tres palabras con contenido el enunciado es tan corto que dos
  // preguntas distintas pueden empezar igual sin ser la misma. Tres es el
  // mínimo que hace falta: "hace interruptor circuito" son exactamente tres, y
  // es la pareja real que hay que cazar.
  if (corta.split(' ').length < 3) return false
  return larga.startsWith(corta + ' ')
}

describe('los bancos no repiten preguntas', () => {
  it.each(TEMAS_CON_TARJETAS_DE_EXAMEN)('%s no pregunta dos veces lo mismo', async clave => {
    const [materia, tema] = clave.split('/')
    const def = await cargarTarjetasDeExamen(materia, tema)
    const vistas = []
    const repetidas = []
    for (const v of def.variantes('es')) {
      for (const t of def.tarjetas(v.id, 'es')) {
        // El emoji va delante del enunciado en la tarjeta y no es la pregunta.
        const clean = normalizar(t.frente)
        if (!clean) continue
        const gemela = vistas.find(previa => esLaMisma(previa.clean, clean))
        if (gemela) repetidas.push(`"${t.frente}" ≈ "${gemela.texto}"`)
        else vistas.push({ clean, texto: t.frente })
      }
    }
    expect(repetidas, `${clave}: ${repetidas.join(' · ')}`).toEqual([])
  })
})

// ── Preguntas que no se pueden contestar sin las opciones ────────────────────
// "¿Cuál de estos animales es un mamífero? → Delfín" funciona en el examen
// online, donde el alumno ve las cuatro opciones. En una tarjeta impresa no van
// las opciones: la pregunta no tiene respuesta única y castiga al que sabe —
// quien conteste "perro" acierta y el dorso le dice que no. Había once así
// repartidas por seis temas; se filtran en imprimibleDeBanco.
describe('las tarjetas se pueden contestar sin ver las opciones', () => {
  const DEPENDE = /cu[aá]l de (estas|estos|las siguientes|los siguientes)|de las siguientes|de los siguientes|which of (these|the following)|quin[a]? d[e’']aquest[s]?|choose the|selecciona/i

  it.each(TEMAS_CON_TARJETAS_DE_EXAMEN)('%s no imprime ninguna que dependa de las opciones', async clave => {
    const [materia, tema] = clave.split('/')
    const def = await cargarTarjetasDeExamen(materia, tema)
    const malas = []
    for (const v of def.variantes('es')) {
      for (const lang of IDIOMAS) {
        for (const t of def.tarjetas(v.id, lang)) {
          if (DEPENDE.test(t.frente)) malas.push(`[${v.id}/${lang}] ${t.frente}`)
        }
      }
    }
    expect(malas, `${clave}: ${malas.join(' · ')}`).toEqual([])
  })

  it('filtrar no deja ningún tema sin material', async () => {
    // El filtro se come preguntas de verdad: si un nivel se quedara por debajo
    // del mínimo, su botón desaparecería sin que nadie se enterase.
    for (const clave of TEMAS_CON_TARJETAS_DE_EXAMEN) {
      const [materia, tema] = clave.split('/')
      const def = await cargarTarjetasDeExamen(materia, tema)
      expect(def.variantes('es').length, `${clave} se quedó sin ningún nivel`).toBeGreaterThan(0)
    }
  })

  it('el filtro no se lleva por delante una pregunta normal', () => {
    const banco = { emoji: '🧪', nombre: { es: 'P', en: 'T', ca: 'P' } }
    const q = (id, texto) => ({
      id, nivel: 'eso',
      pregunta: { es: texto, en: texto, ca: texto },
      correcta: { es: 'R', en: 'A', ca: 'R' },
    })
    const def = imprimibleDeBanco(banco, [
      q(1, '¿Qué es la fotosíntesis?'),
      q(2, '¿Cuál de estos animales es un mamífero?'),
      q(3, '¿Cuántos huesos tiene el cuerpo humano?'),
      q(4, '¿Cuál es la unidad de fuerza?'),
    ], 'biologia')
    // Se va solo la 2: "¿Cuál ES la unidad…?" pregunta por un dato único y se
    // queda, aunque empiece igual que la que sí depende de las opciones.
    expect(def.tarjetas('eso', 'es').map(t => t.frente)).toEqual([
      '¿Qué es la fotosíntesis?',
      '¿Cuántos huesos tiene el cuerpo humano?',
      '¿Cuál es la unidad de fuerza?',
    ])
  })
})
