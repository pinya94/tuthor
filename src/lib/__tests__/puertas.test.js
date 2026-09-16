// Las puertas de /app y las salidas del mapa del temario.
//
// Son enlaces que el usuario ve en la PRIMERA pantalla, así que romperlos es
// caro y silencioso: una tarjeta que lleva a una ruta inexistente enseña el
// 404 justo al que acaba de llegar, y una imagen que no existe deja un hueco
// negro donde está la puerta principal del producto.
import { describe, it, expect } from 'vitest'
import { existsSync } from 'node:fs'
import { readFileSync } from 'node:fs'
import { PUERTAS, MAIN_CARDS } from '../../data/constants.js'
import { TOPIC_SUBJECT_IDS } from '../topicCatalog.js'

const APP = readFileSync(new URL('../../App.jsx', import.meta.url), 'utf8')
const TEMARIO_PAGE = readFileSync(new URL('../../pages/Temario.jsx', import.meta.url), 'utf8')

// `path` es absoluto ('/diaria'); en App.jsx las rutas van sin barra inicial
// porque cuelgan del <Route path="/"> de cada idioma.
function esRutaDeclarada(path) {
  const sinBarra = path.replace(/^\//, '')
  return APP.includes(`path="${sinBarra}"`)
}

function rutaPublica(path) {
  return existsSync(new URL(`../../../public${path}`, import.meta.url))
}

describe('las puertas de /app', () => {
  it('son tres y ninguna repite destino', () => {
    expect(PUERTAS).toHaveLength(3)
    expect(new Set(PUERTAS.map(p => p.path)).size).toBe(PUERTAS.length)
  })

  it('cada una lleva a una ruta que existe de verdad', () => {
    for (const p of PUERTAS) {
      expect(esRutaDeclarada(p.path), `la puerta "${p.id}" apunta a ${p.path}, que no es una ruta de App.jsx`).toBe(true)
    }
  })

  it('cada una trae su imagen y la variante -sm que pide HeroCard', () => {
    // HeroCard construye el srcSet sustituyendo .webp por -sm.webp sin
    // comprobar nada: si falta, el navegador se queda sin la fuente pequeña.
    for (const p of PUERTAS) {
      expect(p.image, `${p.id} sin imagen`).toMatch(/\.webp$/)
      expect(rutaPublica(p.image), `falta public${p.image}`).toBe(true)
      const sm = p.image.replace('.webp', '-sm.webp')
      expect(rutaPublica(sm), `falta public${sm} (la usa el srcSet de HeroCard)`).toBe(true)
    }
  })

  it('cada una está en los tres idiomas', () => {
    for (const p of PUERTAS) {
      for (const campo of ['title', 'subtitle']) {
        expect(p[campo], `${p.id}.${campo}`).toBeTruthy()
        expect(p[`${campo}En`], `${p.id}.${campo}En`).toBeTruthy()
        expect(p[`${campo}Ca`], `${p.id}.${campo}Ca`).toBeTruthy()
      }
    }
  })

  it('la navbar conserva sus propias etiquetas: son dos listas con dos trabajos', () => {
    // MAIN_CARDS son etiquetas de SITIO (la navbar: ya sabes adónde vas) y
    // PUERTAS son nombres de NECESIDAD (la portada: aún estás eligiendo).
    // Fundirlas volvería a poner "Juegos" de título en la portada, que es de
    // donde se venía.
    expect(MAIN_CARDS.map(c => c.title)).toEqual(['Reto de hoy', 'Juegos', 'Estudiar'])
    expect(PUERTAS.map(p => p.title)).not.toEqual(MAIN_CARDS.map(c => c.title))
  })
})

describe('el mapa del temario sale hacia las materias', () => {
  it('toda materia del catálogo tiene un hub declarado en App.jsx', () => {
    const excepciones = { lengua: '/estudiar/idiomas/espanol', ingles: '/estudiar/idiomas/ingles' }
    // El mapa de excepciones de Temario.jsx tiene que ser el mismo, o el
    // enlace "Ver la materia" de lengua e inglés caería en un 404.
    for (const [id, ruta] of Object.entries(excepciones)) {
      expect(TEMARIO_PAGE, `Temario.jsx no mapea ${id} a ${ruta}`).toContain(ruta)
    }
    for (const materia of TOPIC_SUBJECT_IDS) {
      const ruta = excepciones[materia] ?? `/estudiar/${materia}`
      expect(esRutaDeclarada(ruta), `la materia "${materia}" no tiene hub: falta ${ruta} en App.jsx`).toBe(true)
    }
  })
})
