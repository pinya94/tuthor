// Invariantes de la agenda. Lo que importa aquí son las FECHAS: un
// calendario que enseña un examen el día de antes es peor que no tener
// calendario, porque nadie vuelve a comprobarlo a mano.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  TIPOS, TIPO_META, tituloValido, tipoValido, NOMBRES_DIAS,
  rejillaDelMes, mesAnterior, mesSiguiente, eventosDeTareas, eventosDeAsistencia, porDia,
} from '../agenda'

describe('rejilla del mes', () => {
  it('siempre son 42 casillas, empiece el mes en el día que empiece', () => {
    // Alto fijo a propósito: si la rejilla cambiara de alto al pasar de mes,
    // el resto de la página daría un salto en cada flecha.
    for (const mes of [0, 1, 4, 8, 11]) {
      expect(rejillaDelMes(new Date(2026, mes, 1))).toHaveLength(42)
    }
  })

  it('la semana empieza en lunes', () => {
    // El 1 de marzo de 2026 es domingo: tiene que caer en la ÚLTIMA columna de
    // la primera fila, no en la primera. Con la semana en domingo, un profesor
    // cuenta mal la semana.
    const rejilla = rejillaDelMes(new Date(2026, 2, 1))
    expect(rejilla[6].dia).toBe('2026-03-01')
    expect(rejilla[6].delMes).toBe(true)
    expect(rejilla[0].dia).toBe('2026-02-23') // el lunes anterior
    expect(rejilla[0].delMes).toBe(false)
    expect(NOMBRES_DIAS.es[0]).toBe('L')
  })

  it('los días de los meses vecinos vienen marcados, no escondidos', () => {
    // Un examen del día 2 del mes siguiente se tiene que ver desde el final
    // de este.
    const rejilla = rejillaDelMes(new Date(2026, 1, 1)) // febrero de 2026
    const delMes = rejilla.filter(c => c.delMes)
    expect(delMes).toHaveLength(28)
    expect(delMes[0].dia).toBe('2026-02-01')
    expect(delMes[27].dia).toBe('2026-02-28')
    expect(rejilla.filter(c => !c.delMes).length).toBe(42 - 28)
  })

  it('ningún día se repite ni se salta, tampoco en los meses del cambio de hora', () => {
    // Este test encontró el fallo de verdad. Sumando 24 h en milisegundos, el
    // domingo de octubre en que se ATRASA el reloj dura 25 horas: la casilla
    // siguiente caía en el mismo día del calendario, y octubre salía con un
    // día repetido y el último perdido. En marzo, que dura 23, no pasaba —de
    // ahí que a simple vista pareciera bien.
    for (const [año, mes] of [[2026, 9], [2026, 2], [2027, 9], [2027, 2], [2026, 5]]) {
      const dias = rejillaDelMes(new Date(año, mes, 1)).map(c => c.dia)
      const etiqueta = `${año}-${mes + 1}`
      expect(new Set(dias).size, `${etiqueta}: días repetidos`).toBe(42)
      expect(dias, `${etiqueta}: días desordenados`).toEqual([...dias].sort())
    }
    // Y los dos domingos del cambio siguen estando, cada uno el suyo.
    expect(rejillaDelMes(new Date(2026, 9, 1)).map(c => c.dia)).toContain('2026-10-25')
    expect(rejillaDelMes(new Date(2026, 2, 1)).map(c => c.dia)).toContain('2026-03-29')
  })

  it('las flechas van al mes de al lado, sin saltarse enero ni diciembre', () => {
    expect(mesAnterior(new Date(2026, 0, 15)).getMonth()).toBe(11)
    expect(mesAnterior(new Date(2026, 0, 15)).getFullYear()).toBe(2025)
    expect(mesSiguiente(new Date(2026, 11, 15)).getMonth()).toBe(0)
    expect(mesSiguiente(new Date(2026, 11, 15)).getFullYear()).toBe(2027)
  })

  it('marca hoy una sola vez', () => {
    const hoy = new Date()
    expect(rejillaDelMes(hoy).filter(c => c.hoy)).toHaveLength(1)
  })
})

describe('lo que aparece solo', () => {
  const tarea = (id, extra) => ({ id, kind: 'text', title: `T${id}`, ...extra })

  it('una fecha de entrega en texto no se corre un día', () => {
    // 'new Date("2026-03-12")' es medianoche UTC: en cuanto el navegador va
    // por detrás de Greenwich, eso es el día 11. Es el fallo clásico de los
    // calendarios y el formulario de Deberes guarda justo ese formato.
    const [ev] = eventosDeTareas([tarea('a', { dueDate: '2026-03-12' })])
    expect(ev.dia).toBe('2026-03-12')
  })

  it('acepta también un Timestamp de Firestore', () => {
    const dueDate = { toDate: () => new Date(2026, 2, 12, 9, 30) }
    const [ev] = eventosDeTareas([tarea('b', { dueDate })])
    expect(ev.dia).toBe('2026-03-12')
  })

  it('las tareas sin fecha no salen en el calendario', () => {
    expect(eventosDeTareas([tarea('c'), tarea('d', { dueDate: null })])).toEqual([])
  })

  it('un examen se distingue de una entrega', () => {
    // Es la diferencia que importa al mirar el mes: dos exámenes el mismo día
    // es un problema, dos juegos mandados no.
    const eventos = eventosDeTareas([
      { id: '1', kind: 'quiz', title: 'Mi examen', dueDate: '2026-03-10' },
      { id: '2', kind: 'catalog', gameId: 'sistema-solar-examen', dueDate: '2026-03-10' },
      { id: '3', kind: 'catalog', gameId: 'numpath', dueDate: '2026-03-10' },
      { id: '4', kind: 'text', title: 'Ficha 3', dueDate: '2026-03-10' },
    ], t => t.title || t.gameId)
    expect(eventos.map(e => e.tipo)).toEqual(['examen', 'examen', 'entrega', 'entrega'])
  })

  it('los días con faltas salen con su recuento, y los días limpios no', () => {
    // Marcar el día que se pasó lista y no faltó nadie llenaría el mes de
    // señales que no dicen nada.
    const eventos = eventosDeAsistencia({
      '2026-03-02': { u1: 'ausente', u2: 'retraso' },
      '2026-03-03': {},
    })
    expect(eventos).toHaveLength(1)
    expect(eventos[0]).toMatchObject({ dia: '2026-03-02', faltas: 2, derivado: 'asistencia' })
  })

  it('lo apuntado por el profesor va antes que lo deducido', () => {
    const mapa = porDia([
      { id: 'falta:2026-03-02', dia: '2026-03-02', derivado: 'asistencia' },
      { id: 'tarea:1', dia: '2026-03-02', derivado: 'tarea' },
      { id: 'propio', dia: '2026-03-02' },
    ])
    expect(mapa['2026-03-02'].map(e => e.id)).toEqual(['propio', 'falta:2026-03-02', 'tarea:1'])
  })

  it('los ids de lo derivado no chocan con los de lo propio', () => {
    // Los tres orígenes acaban en la misma lista y React los usa como key: un
    // id repetido pinta una sola tarjeta donde hay dos cosas.
    const eventos = [
      ...eventosDeTareas([tarea('x', { dueDate: '2026-03-02' })]),
      ...eventosDeAsistencia({ '2026-03-02': { u1: 'ausente' } }),
      { id: 'x', dia: '2026-03-02' },
    ]
    expect(new Set(eventos.map(e => e.id)).size).toBe(eventos.length)
  })
})

describe('validación', () => {
  it('un título vacío o de más de 80 no vale', () => {
    expect(tituloValido('Examen de fracciones')).toBe(true)
    expect(tituloValido('   ')).toBe(false)
    expect(tituloValido('')).toBe(false)
    expect(tituloValido(null)).toBe(false)
    expect(tituloValido('x'.repeat(80))).toBe(true)
    expect(tituloValido('x'.repeat(81))).toBe(false)
  })

  it('los tipos son los mismos que acepta firestore.rules', () => {
    // Si esta lista crece sin tocar las reglas, el evento nuevo se escribe en
    // el cliente y lo rechaza el servidor con un error que no dice por qué —y
    // las reglas no las despliega Vercel, así que el fallo aparecería en
    // producción y no en el build. Se lee el fichero de reglas de verdad.
    const reglas = readFileSync(new URL('../../../firestore.rules', import.meta.url), 'utf8')
    const linea = reglas.match(/request\.resource\.data\.tipo in \[([^\]]+)\]/)
    expect(linea, 'firestore.rules no valida `tipo` en /events').toBeTruthy()
    const enLasReglas = [...linea[1].matchAll(/'([^']+)'/g)].map(m => m[1])
    expect(enLasReglas.sort()).toEqual([...TIPOS].sort())

    expect(TIPOS.every(tipoValido)).toBe(true)
    for (const t of TIPOS) {
      expect(TIPO_META[t], `falta el meta de ${t}`).toBeTruthy()
      for (const lang of ['es', 'en', 'ca']) expect(TIPO_META[t].label[lang]).toBeTruthy()
    }
  })
})
