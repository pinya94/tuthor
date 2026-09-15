// El recurso de ecuaciones y la lista de recursos interactivos que lo pone en
// /clase, en el panel del profesor y en /recursos.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolverEcuacion, EJEMPLOS } from '../recursoEcuaciones'
import { RECURSOS_INTERACTIVOS } from '../recursosInteractivos'
import { STATIC_META } from '../staticMeta'

const sol = t => resolverEcuacion(t).soluciones.map(s => s.texto.es)

describe('resolver ecuaciones', () => {
  it('todos los ejemplos de la página tienen solución', () => {
    for (const ej of EJEMPLOS) {
      const r = resolverEcuacion(ej)
      expect(r.ok, ej).toBe(true)
      expect(r.soluciones.length, ej).toBeGreaterThan(0)
    }
  })

  it('primer grado con x a los dos lados', () => {
    expect(sol('2x + 3 = x − 1')).toEqual(['x = −4'])
  })

  it('con paréntesis y con fracciones', () => {
    expect(sol('3(x − 2) = x + 4')).toEqual(['x = 5'])
    expect(sol('x/2 + 1/3 = 1')).toEqual(['x = 4/3'])
  })

  it('empieza por la ecuación tal como se escribió, y enseña el paso de operar', () => {
    const pasos = resolverEcuacion('3(x − 2) = x + 4').secciones[0].pasos.map(p => p.es)
    expect(pasos[0]).toBe('3(x − 2) = x + 4')
    expect(pasos[1]).toContain('quitamos paréntesis')
    expect(pasos[2]).toBe('3x − 6 = x + 4')
    // Sin nada que operar no se repite la misma línea dos veces.
    const simple = resolverEcuacion('2x + 3 = x − 1').secciones[0].pasos.map(p => p.es)
    expect(simple[0]).toBe('2x + 3 = x − 1')
    expect(simple[1]).toContain('Pasamos todo')
    expect(resolverEcuacion('x^2 = 4').secciones[0].pasos[1].es).toContain('Pasamos todo')
    // Igualada ya a 0: ni "pasamos todo" ni la misma ecuación repetida.
    const yaCero = resolverEcuacion('x² − 5x + 6 = 0').secciones[0].pasos.map(p => p.es)
    expect(yaCero.some(p => p.includes('Pasamos todo'))).toBe(false)
    expect(yaCero.filter(p => p === 'x² − 5x + 6 = 0')).toHaveLength(1)
  })

  it('segundo grado; sin = se entiende = 0', () => {
    expect(sol('x² − 5x + 6')).toEqual(['x = 2', 'x = 3'])
    expect(sol('x² − 5x + 6 = 0')).toEqual(['x = 2', 'x = 3'])
  })

  it('las raíces irracionales salen exactas', () => {
    const [a, b] = sol('x² = 2x + 1')
    expect(a).toContain('1 − √2')
    expect(b).toContain('1 + √2')
  })

  it('la comprobación sustituye en los dos lados', () => {
    const comp = resolverEcuacion('3(x − 2) = x + 4').secciones.find(s => s.titulo.es === 'Comprobación')
    expect(comp.pasos.at(-1).es).toContain('izquierda = 9, derecha = 9 ✓')
  })

  it('una identidad tiene infinitas soluciones y una imposible, ninguna', () => {
    const id = resolverEcuacion('2(x + 1) = 2x + 2')
    expect(id.datos.find(d => d.etiqueta.es === 'Soluciones').valor.es).toBe('Infinitas')
    expect(sol('2x + 1 = 2x + 5')).toEqual([])
  })

  it('las soluciones caen donde se cruzan las gráficas de los dos lados', () => {
    const r = resolverEcuacion('x² = x + 2')
    for (const p of r.puntos) {
      const [izq, der] = r.funciones
      expect(Math.abs(izq.f(p.x) - der.f(p.x))).toBeLessThan(1e-9)
    }
  })

  it('lo que no es polinomio se resuelve aproximado', () => {
    const r = resolverEcuacion('1/x = x')
    expect(r.exacta).toBe(false)
    expect(r.soluciones.map(s => Math.round(s.x))).toEqual([-1, 1])
  })

  it('cada error dice qué pasa', () => {
    expect(resolverEcuacion('2x = 3 = 4').error.codigo).toBe('igual')
    expect(resolverEcuacion('2x + 3 =').error.codigo).toBe('incompleta')
    expect(resolverEcuacion('').error.codigo).toBe('vacia')
  })
})

describe('recursos interactivos', () => {
  const app = readFileSync('src/App.jsx', 'utf8')
  const sitemap = readFileSync('public/sitemap.xml', 'utf8')

  it('cada recurso tiene ruta, meta y sitemap en los tres idiomas', () => {
    for (const r of RECURSOS_INTERACTIVOS) {
      expect(app, r.path).toContain(`path="${r.path.slice(1)}"`)
      expect(STATIC_META[r.path], r.path).toBeTruthy()
      for (const prefijo of ['', '/en', '/ca']) {
        expect(sitemap, `${prefijo}${r.path}`).toContain(`<loc>https://www.tuthor.es${prefijo}${r.path}</loc>`)
      }
      for (const l of ['es', 'en', 'ca']) {
        expect(r.titulo[l], `${r.id}/${l}`).toBeTruthy()
        expect(r.desc[l], `${r.id}/${l}`).toBeTruthy()
        // La tarjeta grande de /recursos: sin estos se vería con el párrafo
        // largo y un botón genérico.
        expect(r.corto?.[l], `${r.id}/${l}: falta corto`).toBeTruthy()
        expect(r.accion?.[l], `${r.id}/${l}: falta accion`).toBeTruthy()
        for (const e of r.etiquetas ?? []) expect(e[l], `${r.id}/${l}: etiqueta`).toBeTruthy()
      }
      // Cada recurso sale en uno de los dos bloques de /recursos; con otro
      // valor no aparecería en ninguno.
      expect(['resolver', 'explorar'], `${r.id}: tipo`).toContain(r.tipo)
    }
  })

  it('se llega a los recursos desde la barra, desde Estudiar y desde el hub de su materia', () => {
    // Pidió el usuario tras no encontrarlos: estaban solo en Mi clase (con
    // sesión) y en una página titulada "para profesores".
    expect(readFileSync('src/components/Navbar.jsx', 'utf8')).toContain("localPath('/recursos')")
    expect(readFileSync('src/pages/Estudiar.jsx', 'utf8')).toContain('<RecursosInteractivos')
    const hubs = {
      matematicas: 'src/pages/MatematicasIndex.jsx',
      geografia: 'src/pages/GeografiaIndex.jsx',
      geologia: 'src/pages/QuimicaIndex.jsx',
    }
    for (const r of RECURSOS_INTERACTIVOS) {
      expect(r.materias?.length, `${r.id}: sin materia`).toBeGreaterThan(0)
      for (const m of r.materias) {
        expect(hubs[m], `${r.id}: la materia "${m}" no tiene hub que enseñe sus recursos`).toBeTruthy()
        expect(readFileSync(hubs[m], 'utf8'), hubs[m]).toContain('<RecursosInteractivos')
      }
    }
  })

  it('Mi clase, el panel del profesor y /recursos enseñan la lista', () => {
    // Lo pidió el usuario: los recursos tienen que estar dentro de "Clase",
    // tengas clase o no. Si alguien quita la sección de una de las tres
    // páginas, esto lo dice.
    for (const f of ['src/pages/Clase.jsx', 'src/pages/ProfesorPanel.jsx', 'src/pages/Recursos.jsx']) {
      expect(readFileSync(f, 'utf8'), f).toContain('<RecursosInteractivos')
    }
  })
})
