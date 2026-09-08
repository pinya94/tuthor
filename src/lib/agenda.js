import { db } from './firebase'
import { doc, collection, addDoc, updateDoc, deleteDoc, getDocs, serverTimestamp } from 'firebase/firestore'
import { diaISO } from './attendance'
import { EXAMS } from './exams'

// ── La agenda de la clase ────────────────────────────────────────────────────
// Un calendario por meses donde el profesor apunta lo suyo (un examen, una
// excursión, una reunión) y donde aparecen SOLAS las cosas de la clase que ya
// tienen fecha: las tareas y exámenes con fecha de entrega y los días en que se
// pasó lista con alguna falta.
//
// Ese "aparecen solas" es la razón de que la agenda valga la pena. Un
// calendario en blanco es una libreta más que llenar a mano, y esas ya las hay
// mejores en el móvil de cualquiera. Lo que aquí no se puede tener en otro
// sitio es ver el examen que mandaste para el jueves 12 al lado de la
// excursión del 14 y de los tres días que faltó medio grupo.
//
// De ahí la distinción que atraviesa todo el fichero: hay eventos PROPIOS
// (documentos en classes/{id}/events, se crean y se borran aquí) y eventos
// DERIVADOS (se calculan de las tareas y de la asistencia, y no se tocan desde
// el calendario). Borrar un examen desde la agenda tendría que borrar la tarea
// de todos los alumnos que ya la tienen asignada, con sus entregas dentro: eso
// se hace en Deberes, que es donde está el contexto para decidirlo.

export const TIPOS = ['examen', 'entrega', 'salida', 'reunion', 'nota']

export const TIPO_META = {
  examen:  { emoji: '📝', color: 'border-red-500/40 bg-red-500/10 text-red-300', label: { es: 'Examen', en: 'Exam', ca: 'Examen' } },
  entrega: { emoji: '📦', color: 'border-amber-500/40 bg-amber-500/10 text-amber-300', label: { es: 'Entrega', en: 'Deadline', ca: 'Lliurament' } },
  salida:  { emoji: '🚌', color: 'border-sky-500/40 bg-sky-500/10 text-sky-300', label: { es: 'Salida', en: 'Trip', ca: 'Sortida' } },
  reunion: { emoji: '👥', color: 'border-violet-500/40 bg-violet-500/10 text-violet-300', label: { es: 'Reunión', en: 'Meeting', ca: 'Reunió' } },
  nota:    { emoji: '📌', color: 'border-white/20 bg-white/5 text-white/70', label: { es: 'Nota', en: 'Note', ca: 'Nota' } },
}

export const TITULO_MAX = 80

export function tituloValido(texto) {
  const t = (texto ?? '').trim()
  return t.length >= 1 && t.length <= TITULO_MAX
}

export const tipoValido = t => TIPOS.includes(t)

// ── La rejilla del mes ───────────────────────────────────────────────────────
// La semana empieza en LUNES en los tres idiomas. No es una preferencia: es el
// primer día de la semana en España y en el Reino Unido, que son los sitios de
// donde salen es/ca y en-GB (el mismo locale que ya usa el resto del panel para
// las fechas). Con el domingo delante, un profesor cuenta mal la semana.

export const NOMBRES_DIAS = {
  es: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
  en: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  ca: ['Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds', 'Dg'],
}

export function nombreDelMes(fecha, lang = 'es') {
  const locale = lang === 'en' ? 'en-GB' : lang === 'ca' ? 'ca-ES' : 'es-ES'
  return fecha.toLocaleDateString(locale, { month: 'long', year: 'numeric' })
}

export const mesAnterior = fecha => new Date(fecha.getFullYear(), fecha.getMonth() - 1, 1)
export const mesSiguiente = fecha => new Date(fecha.getFullYear(), fecha.getMonth() + 1, 1)

// Las seis semanas que hacen falta para pintar el mes, con los días de los
// meses vecinos rellenando los huecos de los extremos.
//
// Siempre 42 casillas, aunque un febrero que empieza en lunes quepa en cuatro
// semanas: con una rejilla que cambia de alto, pasar de mes da un salto y el
// resto de la página baila. Los días de fuera del mes vienen marcados
// (`delMes: false`) para pintarlos apagados, no para esconderlos — un examen
// del día 2 del mes que viene se tiene que ver desde el final de este.
export function rejillaDelMes(fecha = new Date()) {
  const año = fecha.getFullYear()
  const mes = fecha.getMonth()
  // getDay() da 0 para domingo; con la semana en lunes el domingo es el 6.
  const desplazamiento = (new Date(año, mes, 1).getDay() + 6) % 7
  const hoy = diaISO()

  // Cada casilla se construye por NÚMERO DE DÍA (el constructor de Date
  // normaliza solo el 0 y el 32), nunca sumando 24 h en milisegundos. El
  // domingo que se atrasa el reloj en octubre dura 25 horas: sumando
  // milisegundos, esa casilla y la siguiente caían en el mismo día del
  // calendario y el mes se quedaba en 41 días distintos, con uno repetido y
  // el último perdido. Lo pilló el test, no la vista.
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(año, mes, 1 - desplazamiento + i)
    const dia = diaISO(d)
    return {
      dia,
      numero: d.getDate(),
      delMes: d.getMonth() === mes && d.getFullYear() === año,
      finDeSemana: d.getDay() === 0 || d.getDay() === 6,
      hoy: dia === hoy,
    }
  })
}

// ── De dónde salen los eventos que no se escriben a mano ─────────────────────

// El día de una tarea. `dueDate` puede llegar como Timestamp de Firestore o
// como string 'YYYY-MM-DD', y del string NO se hace new Date():
// 'new Date("2026-03-12")' se interpreta como UTC medianoche, que en cuanto el
// navegador va por detrás de Greenwich es el día 11. La fecha de entrega ya
// viene escrita en el formato que queremos.
//
// Lo usa también Deberes (ProfesorClase.jsx) para decidir si una tarea está
// vencida: si cada módulo calcula el día a su manera, el calendario enseña la
// tarea el jueves y la lista de al lado la da por vencida ese mismo jueves.
export function diaDeTarea(dueDate) {
  if (!dueDate) return null
  if (typeof dueDate === 'string') return dueDate.slice(0, 10)
  const d = dueDate?.toDate ? dueDate.toDate() : new Date(dueDate)
  return Number.isNaN(d.getTime()) ? null : diaISO(d)
}

// Un examen propio del profesor (kind 'quiz') y un examen del catálogo son un
// examen; un juego o una ficha del libro son una entrega. Es la diferencia que
// importa al mirar el mes: un día con dos exámenes es un problema, un día con
// dos juegos mandados no.
//
// Se pregunta al REGISTRO, no al nombre del id. La primera versión miraba si
// el gameId contenía "examen" y solo acertaba con 8 de los 120 exámenes:
// 'sistema-solar', 'fracciones' o 'espanol-literatura-test' se pintaban como
// entregas. Las claves de GAMES y de EXAMS no se solapan en ninguna (hay un
// test que lo comprueba), así que estar en EXAMS es la respuesta exacta.
const esExamen = t => t.kind === 'quiz' || (t.kind === 'catalog' && Boolean(EXAMS[t.gameId]))

export function eventosDeTareas(assignments = [], etiquetaDe = t => t.title || t.gameId || '') {
  return assignments
    .map(t => ({ tarea: t, dia: diaDeTarea(t.dueDate) }))
    .filter(x => x.dia)
    .map(({ tarea, dia }) => ({
      id: `tarea:${tarea.id}`,
      dia,
      tipo: esExamen(tarea) ? 'examen' : 'entrega',
      titulo: etiquetaDe(tarea),
      derivado: 'tarea',
    }))
}

// Los días con faltas. No se pinta el día que se pasó lista y no faltó nadie:
// eso es el caso normal y llenaría el mes de marcas que no dicen nada.
//
// Faltas y retrasos van SEPARADOS. Contarlo todo junto y llamarlo "3 sin
// asistir" era mentira en cuanto uno de los tres era un retraso: ese alumno
// vino. Justificada sí cuenta como falta —lo es, con papel— igual que en el
// resumen del mes de Asistencia.
export function eventosDeAsistencia(dias = {}) {
  return Object.entries(dias)
    .map(([dia, marks]) => {
      const estados = Object.values(marks || {})
      return {
        id: `falta:${dia}`,
        dia,
        tipo: 'nota',
        faltas: estados.filter(e => e === 'ausente' || e === 'justificada').length,
        retrasos: estados.filter(e => e === 'retraso').length,
        derivado: 'asistencia',
      }
    })
    .filter(e => e.faltas > 0 || e.retrasos > 0)
}

// Todo junto y agrupado por día, que es como lo pinta la rejilla. Los propios
// van primero dentro de cada día: lo que escribió el profesor manda sobre lo
// que hemos deducido nosotros.
export function porDia(eventos = []) {
  const mapa = {}
  for (const e of eventos) (mapa[e.dia] ??= []).push(e)
  for (const lista of Object.values(mapa)) {
    lista.sort((a, b) => Number(Boolean(a.derivado)) - Number(Boolean(b.derivado)))
  }
  return mapa
}

// ── Firestore ────────────────────────────────────────────────────────────────
// Mismo patrón que la asistencia: la subcolección entera de una vez y el
// filtro en el cliente. Un curso de agenda son unas decenas de documentos
// minúsculos, así que traerlos todos sale más barato que una query con índice
// compuesto — y de paso pasar de mes no vuelve a pedir nada.
const eventosRef = classId => collection(db, 'classes', classId, 'events')

export async function getClassEvents(classId) {
  const snap = await getDocs(eventosRef(classId))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function createEvent(classId, { dia, titulo, tipo }) {
  const ref = await addDoc(eventosRef(classId), {
    dia,
    titulo: titulo.trim(),
    tipo,
    createdAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateEvent(classId, eventId, { titulo, tipo }) {
  await updateDoc(doc(db, 'classes', classId, 'events', eventId), { titulo: titulo.trim(), tipo })
}

export async function deleteEvent(classId, eventId) {
  await deleteDoc(doc(db, 'classes', classId, 'events', eventId))
}
