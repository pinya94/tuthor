import { promedioAlumno } from './grades'
import { diaISO } from './attendance'

// El boletín para familias: junta Notas + Asistencia + Observaciones de UN
// alumno en UN periodo, en un solo objeto listo para pintar. No toca
// Firestore —recibe los datos ya leídos por las pantallas que los gestionan
// (Notas, Asistencia, Observaciones) y solo los combina— para no triplicar
// aquí las reglas de qué cuenta como "sin nota" o "sin pasar" que ya viven en
// grades.js y attendance.js.

const millisDe = fecha => fecha?.toMillis?.() ?? fecha?.getTime?.() ?? 0

// El curso empieza en septiembre. Antes de agosto, el curso "actual" es el
// que empezó el año pasado — es la única regla que hace falta para saber en
// qué mitad del calendario está cualquier fecha del curso.
function anoInicioCurso(fecha = new Date()) {
  return fecha.getMonth() >= 7 ? fecha.getFullYear() : fecha.getFullYear() - 1
}

// Fechas APROXIMADAS a propósito: la Semana Santa mueve el corte entre el 2º
// y el 3er trimestre unas semanas cada año, y varía por comunidad. Un día de
// más o de menos en el borde no reclasifica nada real: en esos días no hay
// clase, así que no hay notas ni asistencia que filtrar mal. El selector de
// fechas manual (en BoletinFamilias.jsx) es la vía para un rango exacto.
export function trimestresDelCurso(fecha = new Date()) {
  const a = anoInicioCurso(fecha)
  return [
    { id: '1', label: { es: '1er trimestre', en: 'Term 1', ca: '1r trimestre' }, desde: `${a}-09-01`, hasta: `${a}-12-22` },
    { id: '2', label: { es: '2º trimestre', en: 'Term 2', ca: '2n trimestre' }, desde: `${a + 1}-01-08`, hasta: `${a + 1}-03-31` },
    { id: '3', label: { es: '3er trimestre', en: 'Term 3', ca: '3r trimestre' }, desde: `${a + 1}-04-01`, hasta: `${a + 1}-06-22` },
    { id: 'curso', label: { es: 'Curso completo', en: 'Full year', ca: 'Curs complet' }, desde: `${a}-09-01`, hasta: `${a + 1}-07-31` },
  ]
}

// A qué trimestre pertenece una fecha — para preseleccionar un valor
// razonable al crear una columna de notas nueva (ver Notas.jsx). Fuera de los
// tres rangos (julio-agosto) se queda en el último: es la opción menos mala,
// y el profesor siempre puede cambiarla con el selector.
export function trimestreDe(fecha = new Date()) {
  const [t1, t2] = trimestresDelCurso(fecha)
  const iso = diaISO(fecha)
  if (iso <= t1.hasta) return t1.id
  if (iso <= t2.hasta) return t2.id
  return '3'
}

// Asistencia de UN alumno dentro de un mapa de días ya filtrado por rango
// (getAttendanceRange). "Presente" no está en el mapa —ver attendance.js—,
// así que se deriva: los días registrados que no son ninguna falta.
function resumenAsistenciaAlumno(dias, uid) {
  const diasIds = Object.keys(dias)
  let ausente = 0, retraso = 0, justificada = 0
  for (const id of diasIds) {
    const estado = dias[id]?.[uid]
    if (estado === 'ausente') ausente++
    else if (estado === 'retraso') retraso++
    else if (estado === 'justificada') justificada++
  }
  const total = diasIds.length
  const presente = total - ausente - retraso - justificada
  return {
    total, presente, ausente, retraso, justificada,
    // % de asistencia: los retrasos y las justificadas cuentan como que SÍ
    // vino, que es lo que le importa a una familia leyendo el boletín.
    porcentaje: total === 0 ? null : Math.round(((presente + retraso + justificada) / total) * 100),
  }
}

// Junta todo. Recibe las listas/mapas TAL COMO las devuelven ya
// getGradeColumns / getAttendanceRange / getClassObservations — nada de esto
// hace su propia llamada a Firestore.
export function generarBoletin({ uid, columnas, dias, observaciones, desde, hasta }) {
  const columnasDelPeriodo = columnas.filter(c => {
    const ms = millisDe(c.createdAt)
    return ms === 0 || (ms >= new Date(desde).getTime() && ms <= new Date(hasta + 'T23:59:59').getTime())
  })
  const notasDelAlumno = columnasDelPeriodo
    .filter(c => typeof c.values?.[uid] === 'number')
    .map(c => ({ nombre: c.name, nota: c.values[uid] }))

  const observacionesDelAlumno = observaciones
    .filter(o => o.uid === uid)
    .filter(o => {
      const ms = millisDe(o.createdAt)
      return ms >= new Date(desde).getTime() && ms <= new Date(hasta + 'T23:59:59').getTime()
    })
    .sort((a, b) => millisDe(b.createdAt) - millisDe(a.createdAt))

  return {
    periodo: { desde, hasta },
    notas: { lista: notasDelAlumno, media: promedioAlumno(columnasDelPeriodo, uid) },
    asistencia: resumenAsistenciaAlumno(dias, uid),
    observaciones: observacionesDelAlumno,
  }
}
