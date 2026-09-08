// Invariantes de los imprimibles. Lo que de verdad importa: que una tarjeta
// nunca salga a imprimir sin las dos caras (un frente vacío o un dorso vacío
// es papel gastado en balde), que las variantes que se ofrecen tengan
// contenido de verdad detrás, y que un id inventado no tumbe el panel.
import { describe, it, expect } from 'vitest'
import { IMPRIMIBLES, IMPRIMIBLE_IDS, MAX_TARJETAS, MIN_TARJETAS_GRUPO, tarjetasDe, variantesDe, intercalarPorDorso, imprimiblesDeTema } from '../materialImprimible'
import { PAISES } from '../../data/paises'

describe('catálogo de imprimibles', () => {
  it('cada imprimible tiene título, descripción y cómo usarlo en los tres idiomas', () => {
    for (const id of IMPRIMIBLE_IDS) {
      const d = IMPRIMIBLES[id]
      for (const campo of ['asignatura', 'titulo', 'desc', 'comoUsarlo']) {
        for (const lang of ['es', 'en', 'ca']) {
          expect(d[campo][lang], `${id}.${campo}.${lang}`).toBeTruthy()
        }
      }
      expect(d.emoji).toBeTruthy()
    }
  })

  it('toda variante ofrecida tiene tarjetas de verdad detrás', () => {
    // Ofrecer un grupo vacío es prometer una hoja que sale en blanco.
    for (const id of IMPRIMIBLE_IDS) {
      for (const v of IMPRIMIBLES[id].variantes('es')) {
        expect(v.n, `${id}/${v.id} dice tener ${v.n}`).toBeGreaterThan(0)
        expect(tarjetasDe(id, v.id).length, `${id}/${v.id} sin tarjetas`).toBeGreaterThan(0)
      }
    }
  })

  it('el recuento anunciado coincide con las tarjetas reales (hasta el tope)', () => {
    for (const id of IMPRIMIBLE_IDS) {
      for (const v of IMPRIMIBLES[id].variantes('es')) {
        expect(tarjetasDe(id, v.id).length).toBe(Math.min(v.n, MAX_TARJETAS))
      }
    }
  })

  it('ninguna tarjeta sale con una cara vacía', () => {
    for (const id of IMPRIMIBLE_IDS) {
      for (const v of IMPRIMIBLES[id].variantes('es')) {
        for (const t of tarjetasDe(id, v.id)) {
          expect(String(t.frente ?? '').trim(), `${id}/${v.id} frente vacío`).not.toBe('')
          expect(String(t.dorso ?? '').trim(), `${id}/${v.id} dorso vacío`).not.toBe('')
        }
      }
    }
  })

  it('nunca pasa del tope de recorte', () => {
    for (const id of IMPRIMIBLE_IDS) {
      for (const v of IMPRIMIBLES[id].variantes('es')) {
        expect(tarjetasDe(id, v.id).length).toBeLessThanOrEqual(MAX_TARJETAS)
      }
    }
  })

  it('en inglés y catalán también salen las dos caras', () => {
    for (const lang of ['en', 'ca']) {
      for (const id of IMPRIMIBLE_IDS) {
        const v = IMPRIMIBLES[id].variantes(lang)[0]
        expect(v.label, `${id} sin etiqueta en ${lang}`).toBeTruthy()
        for (const t of tarjetasDe(id, v.id, lang)) {
          expect(String(t.frente ?? '').trim()).not.toBe('')
          expect(String(t.dorso ?? '').trim()).not.toBe('')
        }
      }
    }
  })
})

describe('imprimiblesDeTema', () => {
  it('una página de historia ofrece el material de SU época, no uno genérico', () => {
    const r = imprimiblesDeTema('historia', 'edad-media')
    expect(r.map(x => x.id).sort()).toEqual(['historia-eventos', 'historia-portadas'].filter(
      id => IMPRIMIBLES[id].variantes('es').some(v => v.id === 'edad-media'),
    ).sort())
    for (const x of r) {
      expect(x.varianteId).toBe('edad-media')
      expect(tarjetasDe(x.id, x.varianteId).length).toBeGreaterThan(0)
    }
  })

  it('solo ofrece el imprimible si esa época tiene material dentro', () => {
    // roma tiene eventos pero no portadas: ofrecer las dos sería mandar al
    // profesor a una hoja vacía.
    for (const x of imprimiblesDeTema('historia', 'roma')) {
      expect(tarjetasDe(x.id, x.varianteId).length, `${x.id}/roma vacío`).toBeGreaterThan(0)
    }
  })

  it('fuera de historia el tema mapea al imprimible entero', () => {
    expect(imprimiblesDeTema('quimica', 'tabla-periodica')).toEqual([{ id: 'quimica-elementos', varianteId: null }])
    expect(imprimiblesDeTema('biologia', 'ecosistemas')).toEqual([{ id: 'biologia-cadena', varianteId: null }])
  })

  it('un tema sin material da lista vacía (la página no pinta nada)', () => {
    expect(imprimiblesDeTema('quimica', 'acidos-bases')).toEqual([])
    expect(imprimiblesDeTema('historia', 'tema-inventado')).toEqual([])
    expect(imprimiblesDeTema(null, null)).toEqual([])
    expect(imprimiblesDeTema('historia', undefined)).toEqual([])
  })
})

describe('intercalarPorDorso', () => {
  it('los titulares no salen en bloques de la misma respuesta', () => {
    // PORTADAS trae primero los verdaderos y luego los falsos: sin
    // intercalar, recortar la hoja y repartir por bloques le daba a un grupo
    // entero solo VERDAD, y ahí no hay nada que decidir.
    for (const v of IMPRIMIBLES['historia-portadas'].variantes('es')) {
      const dorsos = tarjetasDe('historia-portadas', v.id).map(t => t.dorso)
      const cuenta = {}
      for (const d of dorsos) cuenta[d] = (cuenta[d] ?? 0) + 1
      const [mayor, menor] = Object.values(cuenta).sort((a, b) => b - a)

      let racha = 1, peor = 1
      for (let i = 1; i < dorsos.length; i++) {
        racha = dorsos[i] === dorsos[i - 1] ? racha + 1 : 1
        peor = Math.max(peor, racha)
      }
      // El tope no es fijo: con 10 verdades y 3 bulos es imposible bajar de
      // rachas de ~3, y exigir menos sería exigir algo que no existe. Lo que
      // sí se puede exigir es que la racha no pase de lo que impone la
      // proporción — que es justo lo que el intercalado tiene que lograr.
      const techo = Math.ceil(mayor / (menor + 1)) + 1
      expect(peor, `${v.id}: racha de ${peor} (techo ${techo}, ${mayor}/${menor})`).toBeLessThanOrEqual(techo)
    }
  })

  it('no pierde ni duplica tarjetas', () => {
    const original = [
      { frente: 'a', dorso: 'X' }, { frente: 'b', dorso: 'X' }, { frente: 'c', dorso: 'X' },
      { frente: 'd', dorso: 'Y' }, { frente: 'e', dorso: 'Y' },
    ]
    const salida = intercalarPorDorso(original)
    expect(salida).toHaveLength(original.length)
    expect(salida.map(t => t.frente).sort()).toEqual(['a', 'b', 'c', 'd', 'e'])
  })

  it('es determinista: dos llamadas dan el mismo orden', () => {
    // Reimprimir una hoja tiene que dar exactamente la misma hoja.
    const a = tarjetasDe('historia-portadas', 'gce').map(t => t.frente)
    const b = tarjetasDe('historia-portadas', 'gce').map(t => t.frente)
    expect(a).toEqual(b)
  })
})

describe('tarjetasDe', () => {
  it('un id o una variante que no existen dan lista vacía, no un error', () => {
    expect(tarjetasDe('no-existe', 'nada')).toEqual([])
    expect(tarjetasDe('historia-eventos', 'epoca-inventada')).toEqual([])
    expect(tarjetasDe('historia-eventos', null)).toEqual([])
    expect(tarjetasDe(undefined, undefined)).toEqual([])
  })

  it('las tarjetas de historia llevan el año como dorso', () => {
    const edadMedia = tarjetasDe('historia-eventos', 'edad-media')
    expect(edadMedia.length).toBeGreaterThan(0)
    for (const t of edadMedia) expect(t.dorso).toMatch(/^-?\d{1,4}$/)
  })
})

// ── Los tres sets con datos ya estructurados ─────────────────────────────────
// Estos no inventan contenido: reparten datos que ya usaban los juegos. Lo que
// hay que vigilar es justo eso — que sigan cuadrando con su fuente cuando la
// fuente cambie, y que ningún grupo quede tan pequeño que la hoja no sirva.
describe('orgánulos, órganos y planetas', () => {
  it('el número que anuncia el botón es el que se imprime de verdad', () => {
    // `n` sale en el botón antes de abrir la hoja: si miente, el profesor
    // imprime otra cosa distinta de la que le habíamos dicho.
    for (const id of IMPRIMIBLE_IDS) {
      for (const v of IMPRIMIBLES[id].variantes('es')) {
        expect(tarjetasDe(id, v.id, 'es').length, `${id}/${v.id}`).toBe(v.n)
      }
    }
  })

  it('ningún grupo ofrecido se queda por debajo de una baraja', () => {
    // Un botón que imprime cuatro tarjetas no es material: es un montoncito
    // de recortes con el que no se puede jugar ni clasificar nada, y encima
    // esconde entre botones el reparto que sí sirve. Se mira lo que ENSEÑA
    // variantesDe, no lo que existe: los grupos pequeños siguen dentro del
    // reparto completo, que es donde valen para algo.
    for (const id of IMPRIMIBLE_IDS) {
      const usables = variantesDe(id, 'es')
      expect(usables.length, `${id} no ofrece ningún reparto`).toBeGreaterThan(0)
      for (const v of usables) {
        expect(v.n, `${id}/${v.id} solo da ${v.n}`).toBeGreaterThanOrEqual(MIN_TARJETAS_GRUPO)
      }
    }
  })

  it('todo imprimible ofrece un reparto con el que se puede hacer su actividad', () => {
    // La regla que faltaba y que rompía tres hojas a la vez: las variantes
    // partían el material justo por donde la actividad necesitaba mezclarlo.
    // Con nueve productores no se monta una cadena alimentaria y con cinco
    // halógenos no se monta la tabla periódica. Cada imprimible tiene que
    // tener al menos un reparto marcado `completo`, que es el que trae el
    // material entero y el que sale primero en el panel.
    for (const id of IMPRIMIBLE_IDS) {
      const usables = variantesDe(id, 'es')
      const completos = usables.filter(v => v.completo)
      // Historia y capitales reparten por unidad didáctica (época,
      // continente): ahí cada grupo ES una baraja que se usa sola, así que no
      // necesitan uno "completo" aparte del que ya tengan.
      const porUnidad = ['historia-eventos', 'historia-portadas'].includes(id)
      if (porUnidad) continue
      expect(completos.length, `${id} no ofrece el material entero`).toBeGreaterThan(0)
      // Y va primero: es lo que el profesor tiene que ver antes que nada.
      expect(usables[0].completo, `${id}: el primer botón no es el reparto entero`).toBe(true)
    }
  })

  it('los orgánulos exclusivos avisan de en qué célula van, y los comunes no', () => {
    // Sin la pista, quien tiene el cloroplasto en la mano no puede saber si le
    // tocaba estar en la célula animal: es lo que hace comprobable el juego.
    const vegetal = tarjetasDe('biologia-organulos', 'vegetal', 'es')
    const cloroplasto = vegetal.find(t => t.frente.toLowerCase().includes('cloroplasto'))
    expect(cloroplasto?.pista).toBe('Solo en la vegetal')
    expect(vegetal.find(t => t.frente === 'Núcleo')?.pista).toBe(null)

    // Y ninguna célula ofrece un orgánulo que no le toca.
    const animal = tarjetasDe('biologia-organulos', 'animal', 'es')
    expect(animal.some(t => t.frente.toLowerCase().includes('cloroplasto'))).toBe(false)
  })

  it('"todos los sistemas" incluye los órganos que no tienen botón propio', () => {
    const todos = tarjetasDe('biologia-organos', 'todos', 'es')
    expect(todos.some(t => t.pista === 'Sistema Circulatorio')).toBe(true)
    expect(todos.some(t => t.pista === 'Sistema Nervioso')).toBe(true)
  })

  it('los planetas son los ocho y nada más', () => {
    // Un solo reparto a propósito: partirlos en rocosos y gigantes daba dos
    // hojas de cuatro tarjetas con las que no se puede hacer la actividad
    // —ordenar por distancia y ver el salto del cinturón de asteroides— y
    // encima dejaba media hoja en blanco.
    expect(variantesDe('geologia-planetas', 'es').map(v => v.id)).toEqual(['todos'])
    const ocho = tarjetasDe('geologia-planetas', 'todos', 'es')
    expect(ocho).toHaveLength(8)
    expect(ocho.some(t => t.frente.includes('Mercurio'))).toBe(true)
    expect(ocho.some(t => t.frente.includes('Neptuno'))).toBe(true)
  })

  it('la hoja que la actividad necesita entera trae de verdad todos los grupos', () => {
    // El fallo que tenían tres imprimibles a la vez: las variantes partían el
    // material justo por donde la actividad necesitaba mezclarlo. Con una hoja
    // de nueve productores no se monta ninguna cadena alimentaria, y con una
    // de países de Europa no hay nada que clasificar por continente. Cada uno
    // ofrece ahora el reparto completo, y esto vigila que lo siga siendo.
    const cadena = tarjetasDe('biologia-cadena', 'todos', 'es')
    const roles = new Set(cadena.map(t => t.dorso))
    expect(roles.size, 'la cadena completa no trae los cinco roles').toBe(5)

    const mundo = tarjetasDe('geografia-capitales', 'mundo', 'es')
    const continentes = new Set(mundo.map(t => PAISES.find(p => t.frente.endsWith(p.nombre))?.continente))
    // Oceanía es la que se cae sola si algún día esto se cambia por "los N
    // más poblados del mundo": Australia es la 45ª del planeta.
    expect([...continentes].some(c => c?.includes('Oceanía')), 'el mundo se ha quedado sin Oceanía').toBe(true)
    expect(continentes.size, 'faltan continentes en el reparto del mundo').toBeGreaterThanOrEqual(5)

    // Los períodos 1-4 tienen que ser un bloque SEGUIDO: una tabla con huecos
    // no se puede montar sobre la mesa, que es para lo que sirve la hoja.
    const zs = tarjetasDe('quimica-elementos', 'periodos-1-4', 'es')
      .map(t => Number(String(t.dorso).match(/Z=(\d+)/)[1]))
    expect(zs).toEqual(Array.from({ length: 36 }, (_, i) => i + 1))
  })

  it('el reparto completo sale mezclado, no agrupado por su respuesta', () => {
    // Se recorta por filas y se reparte: si la hoja va agrupada, un grupo se
    // lleva los nueve productores y otro los descomponedores. Basta con que
    // ningún rol salga entero de seguido.
    const dorsos = tarjetasDe('biologia-cadena', 'todos', 'es').map(t => t.dorso)
    let racha = 1
    let peor = 1
    for (let i = 1; i < dorsos.length; i++) {
      racha = dorsos[i] === dorsos[i - 1] ? racha + 1 : 1
      peor = Math.max(peor, racha)
    }
    expect(peor, `hay ${peor} tarjetas seguidas del mismo rol`).toBeLessThanOrEqual(3)
  })

  it('las hojas que no caben en la tira van en formato plegable', () => {
    // En el reparto de tira el dorso ocupa un tercio de columna, y ahí no
    // entra de todo. Son tres cosas distintas las que no caben, y las tres se
    // vieron impresas antes de estar aquí:
    //
    //   · una frase entera, que sale en una tira de palabras sueltas;
    //   · una PALABRA larga, que no se parte por ningún sitio bueno
    //     ("Descomponedor" salía cortada en seco en la cadena alimentaria);
    //   · un dorso más largo que el frente, que es la tira al revés: los
    //     elementos tenían dos letras delante y quince detrás, con dos
    //     tercios de tarjeta en blanco.
    const MAX_FRASE = 40
    const MAX_PALABRA = 12
    // La palabra larga suelta no obliga a cambiar de reparto: con break-words
    // se parte en dos líneas, que es feo pero se lee, y la única capital del
    // mundo que se pasa es Sri Jayawardenepura Kotte. Lo que no puede ser es
    // que le pase a media hoja: ahí el formato está mal elegido, no el dato.
    const TOLERANCIA_PALABRA_LARGA = 0.1
    for (const id of IMPRIMIBLE_IDS) {
      const d = IMPRIMIBLES[id]
      if (d.formato === 'plegable') continue
      for (const v of variantesDe(id, 'es')) {
        const tarjetas = tarjetasDe(id, v.id, 'es')
        let noCaben = 0
        for (const t of tarjetas) {
          const dorso = String(t.dorso)
          const palabra = dorso.split(/\s+/).reduce((m, p) => Math.max(m, p.length), 0)
          if (palabra > MAX_PALABRA) noCaben++
          expect(dorso.length, `${id}: dorso de ${dorso.length} caracteres ("${dorso}")`).toBeLessThanOrEqual(MAX_FRASE)
          // La tira al revés: dos letras delante y quince detrás deja dos
          // tercios de tarjeta en blanco y el dorso partido.
          expect(dorso.length, `${id}: el dorso ("${dorso}") es más largo que el frente ("${t.frente}")`)
            .toBeLessThanOrEqual(String(t.frente).length + MAX_PALABRA)
        }
        expect(noCaben / tarjetas.length, `${id}/${v.id}: ${noCaben} de ${tarjetas.length} dorsos no caben de una pieza en la tira`)
          .toBeLessThanOrEqual(TOLERANCIA_PALABRA_LARGA)
      }
    }
  })

  it('los tres idiomas dan la misma cantidad de tarjetas y ninguna vacía', () => {
    for (const id of IMPRIMIBLE_IDS) {
      for (const v of IMPRIMIBLES[id].variantes('es')) {
        for (const lang of ['es', 'en', 'ca']) {
          const t = tarjetasDe(id, v.id, lang)
          expect(t.length, `${id}/${v.id}/${lang}`).toBe(v.n)
          for (const c of t) {
            expect(String(c.frente).trim(), `${id}/${v.id}/${lang} frente vacío`).not.toBe('')
            expect(String(c.dorso).trim(), `${id}/${v.id}/${lang} dorso vacío`).not.toBe('')
          }
        }
      }
    }
  })
})
