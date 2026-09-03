import { useEffect, useMemo, useState } from 'react'
import {
  ESTADO_META, diaISO, estadoDe, siguienteEstado, conMarca, resumenDelDia, totalesPorAlumno,
  getAttendance, setAttendance, getAttendanceMonth,
} from '../lib/attendance'

// Pasar lista. Un toque sobre el alumno cicla presente → falta → retraso →
// justificada: son treinta decisiones seguidas y un desplegable por alumno las
// convertiría en noventa toques.
//
// El día se guarda entero en cada toque (setDoc del documento del día) en vez
// de campo a campo: son treinta claves como mucho, y así "el día está pasado"
// —que es la existencia del documento— nunca depende de qué escritura llegó.

const COLORES = {
  presente:    'bg-white/5 border-white/10 text-white/70',
  ausente:     'bg-red-500/15 border-red-500/40 text-red-300',
  retraso:     'bg-amber-500/15 border-amber-500/40 text-amber-300',
  justificada: 'bg-sky-500/15 border-sky-500/40 text-sky-300',
}

function fechaLegible(dia, lang) {
  const [a, m, d] = dia.split('-').map(Number)
  return new Date(a, m - 1, d).toLocaleDateString(
    lang === 'en' ? 'en-GB' : lang === 'ca' ? 'ca-ES' : 'es-ES',
    { weekday: 'long', day: 'numeric', month: 'long' },
  )
}

const tr3 = (o, lang) => o?.[lang] ?? o?.es ?? ''

export default function Asistencia({ classId, students, lang, tr }) {
  const hoy = useMemo(() => diaISO(), [])
  const [dia, setDia] = useState(hoy)
  const [marks, setMarks] = useState({})
  const [pasado, setPasado] = useState(false)   // ¿existe el documento de ese día?
  const [mes, setMes] = useState({})            // { 'YYYY-MM-DD': marks } del mes en curso
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const studentIds = useMemo(() => students.map(s => s.uid), [students])

  // El día se carga en el efecto y no en un callback aparte para no tocar
  // estado de forma síncrona dentro del efecto (cascading renders). `vivo`
  // corta la respuesta de un día que ya no es el que se está mirando: cambiar
  // de fecha dos veces seguidas pintaría la lista del primero.
  useEffect(() => {
    let vivo = true
    getAttendance(classId, dia)
      .then(m => {
        if (!vivo) return
        setMarks(m ?? {})
        setPasado(m !== null)
        setCargando(false)
      })
      .catch(() => {
        if (!vivo) return
        setError(tr({ es: 'No se pudo cargar la asistencia.', en: 'Could not load attendance.', ca: "No s'ha pogut carregar l'assistència." }))
        setCargando(false)
      })
    return () => { vivo = false }
  }, [classId, dia]) // eslint-disable-line react-hooks/exhaustive-deps

  // El mes se lee una vez al abrir el módulo: es una sola query a la
  // subcolección, y es lo que permite contestar "¿cuántas lleva?" sin abrir
  // día por día.
  useEffect(() => {
    getAttendanceMonth(classId).then(setMes).catch(() => {})
  }, [classId])

  async function marcar(uid) {
    const estado = siguienteEstado(estadoDe(marks, uid))
    const nuevas = conMarca(marks, uid, estado)
    const previas = marks
    setMarks(nuevas); setPasado(true); setError('')
    try {
      await setAttendance(classId, dia, nuevas)
      setMes(m => ({ ...m, [dia]: nuevas }))
    } catch {
      setMarks(previas)
      setError(tr({ es: 'No se pudo guardar.', en: 'Could not save.', ca: 'No s\'ha pogut desar.' }))
    }
  }

  // Pasar lista sin faltas también es pasar lista: crea el documento del día
  // vacío, que es lo que distingue "todos presentes" de "hoy no la he pasado".
  async function marcarTodosPresentes() {
    setMarks({}); setPasado(true); setError('')
    try {
      await setAttendance(classId, dia, {})
      setMes(m => ({ ...m, [dia]: {} }))
    } catch {
      setError(tr({ es: 'No se pudo guardar.', en: 'Could not save.', ca: 'No s\'ha pogut desar.' }))
    }
  }

  const resumen = resumenDelDia(marks, studentIds)
  const totales = totalesPorAlumno(mes, studentIds)

  if (students.length === 0) {
    return (
      <p className="text-white/30 text-sm">
        {tr({
          es: 'Todavía no se ha unido ningún alumno. Comparte el código de la clase.',
          en: 'No students have joined yet. Share the class code.',
          ca: "Encara no s'hi ha unit cap alumne. Comparteix el codi de la classe.",
        })}
      </p>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <input type="date" value={dia} max={hoy}
          onChange={e => { if (e.target.value) { setCargando(true); setDia(e.target.value) } }}
          className="bg-black/30 border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-[13px] [color-scheme:dark]" />
        {dia !== hoy && (
          <button type="button" onClick={() => { setCargando(true); setDia(hoy) }}
            className="text-[12px] font-bold px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 transition-colors">
            {tr({ es: 'Hoy', en: 'Today', ca: 'Avui' })}
          </button>
        )}
        <button type="button" onClick={marcarTodosPresentes} disabled={cargando}
          className="text-[12px] font-bold px-3 py-1.5 rounded-lg border border-teal-500 bg-teal-600 hover:bg-teal-500 text-white transition-colors disabled:opacity-30 ml-auto">
          {tr({ es: 'Todos presentes', en: 'All present', ca: 'Tots presents' })}
        </button>
      </div>

      <p className="text-white/45 text-[13px] mb-1 first-letter:uppercase">{fechaLegible(dia, lang)}</p>
      <p className="text-white/30 text-[12px] mb-4">
        {pasado
          ? `${resumen.presente} ${tr({ es: 'presentes', en: 'present', ca: 'presents' })} · ${resumen.ausente} ${tr({ es: 'faltas', en: 'absent', ca: 'faltes' })} · ${resumen.retraso} ${tr({ es: 'retrasos', en: 'late', ca: 'retards' })} · ${resumen.justificada} ${tr({ es: 'justificadas', en: 'excused', ca: 'justificades' })}`
          : tr({ es: 'Este día todavía no está pasado.', en: 'This day has not been taken yet.', ca: 'Aquest dia encara no està passat.' })}
      </p>

      {error && <p className="text-red-400 text-[12.5px] mb-3">{error}</p>}

      <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.04] mb-4">
        {students.map((s, i) => {
          const estado = estadoDe(marks, s.uid)
          const t = totales[s.uid] || { ausente: 0, retraso: 0, justificada: 0 }
          return (
            <button key={s.uid} type="button" onClick={() => marcar(s.uid)} disabled={cargando}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-white/5 disabled:opacity-40 ${i > 0 ? 'border-t border-white/5' : ''}`}>
              <span className="flex-1 text-white font-semibold text-[13.5px] truncate">{s.name}</span>
              {(t.ausente > 0 || t.retraso > 0) && (
                <span className="text-white/30 text-[11px] tabular-nums shrink-0">
                  {tr({ es: 'mes', en: 'month', ca: 'mes' })}: {t.ausente > 0 && `${t.ausente}✕`} {t.retraso > 0 && `${t.retraso}⏱`}
                </span>
              )}
              <span className={`shrink-0 text-[11.5px] font-bold px-2.5 py-1 rounded-lg border min-w-[92px] text-center ${COLORES[estado]}`}>
                {tr3(ESTADO_META[estado].label, lang)}
              </span>
            </button>
          )
        })}
      </div>

      <p className="text-white/25 text-[11.5px]">
        {tr({
          es: 'Toca a un alumno para cambiar su estado: presente → falta → retraso → justificada. Solo se guardan las faltas, así que quien se una más tarde no arrastra las de antes.',
          en: 'Tap a student to cycle their status: present → absent → late → excused. Only absences are stored, so anyone joining later does not inherit earlier ones.',
          ca: "Toca un alumne per canviar el seu estat: present → falta → retard → justificada. Només es desen les faltes, així qui s'hi uneixi més tard no arrossega les d'abans.",
        })}
      </p>
    </div>
  )
}
