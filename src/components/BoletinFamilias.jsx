import { useEffect, useMemo, useState } from 'react'
import { TAG_META } from '../lib/observations'
import { getGradeColumns } from '../lib/grades'
import { getAttendanceRange } from '../lib/attendance'
import { getClassObservations } from '../lib/observations'
import { trimestresDelCurso, generarBoletin } from '../lib/report'

// El boletín para familias: notas + asistencia + observaciones de UN alumno
// en UN periodo, en una sola página pensada para imprimir o guardar en PDF.
// Sin librería de PDF: window.print() ya deja "Guardar como PDF" en
// cualquier navegador moderno, y la clase .imprimir-solo-esto (src/index.css)
// es lo que hace que solo se imprima el boletín y no el resto de la app.

const HOY = () => new Date().toISOString().slice(0, 10)
const tr3 = (o, lang) => o?.[lang] ?? o?.es ?? ''

function fechaLegible(iso, lang) {
  const [a, m, d] = iso.split('-').map(Number)
  return new Date(a, m - 1, d).toLocaleDateString(lang === 'en' ? 'en-GB' : lang === 'ca' ? 'ca-ES' : 'es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
}

// Para el createdAt de una observación: Timestamp de Firestore normalmente,
// pero puede llegar como Date normal si viene de la actualización optimista
// al añadir una nota (ver Observaciones.jsx). Sin año: dentro del boletín ya
// se sabe el periodo por la cabecera, así que el año sería ruido repetido en
// cada línea.
function fechaCorta(fecha, lang) {
  const d = fecha?.toDate ? fecha.toDate() : fecha instanceof Date ? fecha : null
  if (!d) return ''
  return d.toLocaleDateString(lang === 'en' ? 'en-GB' : lang === 'ca' ? 'ca-ES' : 'es-ES', { day: 'numeric', month: 'short' })
}

function Bloque({ titulo, children }) {
  return (
    <div className="mb-5">
      <h3 className="text-[11px] uppercase tracking-widest font-bold text-black/40 mb-2 print:text-black/60">{titulo}</h3>
      {children}
    </div>
  )
}

function Papel({ boletin, alumno, claseName, lang, tr }) {
  const periodoLegible = `${fechaLegible(boletin.periodo.desde, lang)} — ${fechaLegible(boletin.periodo.hasta, lang)}`
  return (
    <div className="imprimir-solo-esto bg-white text-black rounded-2xl p-6 sm:p-8 print:rounded-none print:p-0">
      <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-black/10">
        <div>
          <p className="text-black/40 text-[11px] uppercase tracking-widest font-bold">{claseName}</p>
          <h2 className="text-black text-2xl font-black">{alumno}</h2>
        </div>
        <p className="text-black/50 text-[12.5px] font-semibold text-right shrink-0">{periodoLegible}</p>
      </div>

      <Bloque titulo={tr({ es: 'Notas', en: 'Grades', ca: 'Notes' })}>
        {boletin.notas.lista.length === 0 ? (
          <p className="text-black/40 text-[13px]">{tr({ es: 'Sin evaluaciones en este periodo.', en: 'No assessments this period.', ca: 'Sense avaluacions en aquest període.' })}</p>
        ) : (
          <>
            <div className="divide-y divide-black/5">
              {boletin.notas.lista.map((n, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 text-[13.5px]">
                  <span className="text-black/70">{n.nombre}</span>
                  <span className="font-bold text-black">{n.nota.toFixed(1)}</span>
                </div>
              ))}
            </div>
            {boletin.notas.media != null && (
              <div className="flex items-center justify-between pt-2 mt-1 border-t border-black/10">
                <span className="text-black/50 text-[12.5px] font-bold uppercase tracking-wide">{tr({ es: 'Media', en: 'Average', ca: 'Mitjana' })}</span>
                <span className="font-black text-lg text-black">{boletin.notas.media.toFixed(1)}</span>
              </div>
            )}
          </>
        )}
      </Bloque>

      <Bloque titulo={tr({ es: 'Asistencia', en: 'Attendance', ca: 'Assistència' })}>
        {boletin.asistencia.total === 0 ? (
          <p className="text-black/40 text-[13px]">{tr({ es: 'Sin días registrados en este periodo.', en: 'No days recorded this period.', ca: 'Sense dies registrats en aquest període.' })}</p>
        ) : (
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              [boletin.asistencia.presente, tr({ es: 'Presente', en: 'Present', ca: 'Present' })],
              [boletin.asistencia.ausente, tr({ es: 'Faltas', en: 'Absent', ca: 'Faltes' })],
              [boletin.asistencia.retraso, tr({ es: 'Retrasos', en: 'Late', ca: 'Retards' })],
              [boletin.asistencia.justificada, tr({ es: 'Justif.', en: 'Excused', ca: 'Justif.' })],
            ].map(([valor, label]) => (
              <div key={label} className="rounded-lg bg-black/[0.03] py-2">
                <p className="text-lg font-black text-black">{valor}</p>
                <p className="text-black/40 text-[10px] uppercase tracking-wide font-bold">{label}</p>
              </div>
            ))}
            <div className="col-span-4 flex items-center justify-between pt-2 mt-1 border-t border-black/10">
              <span className="text-black/50 text-[12.5px] font-bold uppercase tracking-wide">{tr({ es: 'Asistencia total', en: 'Overall attendance', ca: 'Assistència total' })}</span>
              <span className="font-black text-lg text-black">{boletin.asistencia.porcentaje}%</span>
            </div>
          </div>
        )}
      </Bloque>

      <Bloque titulo={tr({ es: 'Observaciones', en: 'Notes', ca: 'Observacions' })}>
        {boletin.observaciones.length === 0 ? (
          <p className="text-black/40 text-[13px]">{tr({ es: 'Sin anotaciones en este periodo.', en: 'No notes this period.', ca: 'Sense anotacions en aquest període.' })}</p>
        ) : (
          <div className="space-y-1.5">
            {boletin.observaciones.map((o, i) => (
              <p key={i} className="text-[13px] text-black/75">
                <span className="text-black/40 text-[11px] font-semibold mr-1.5 tabular-nums">{fechaCorta(o.createdAt, lang)}</span>
                <span className="mr-1">{TAG_META[o.tag]?.emoji}</span>{o.text}
              </p>
            ))}
          </div>
        )}
      </Bloque>
    </div>
  )
}

export default function BoletinFamilias({ classId, claseName, students, lang, tr }) {
  const trimestres = useMemo(() => trimestresDelCurso(), [])
  const [alumnoUid, setAlumnoUid] = useState(null)
  const [periodoId, setPeriodoId] = useState(trimestres[0].id)
  const [desde, setDesde] = useState(trimestres[0].desde)
  const [hasta, setHasta] = useState(trimestres[0].hasta)
  const [datos, setDatos] = useState(null) // { columnas, dias, observaciones } de la clase entera
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([getGradeColumns(classId), getClassObservations(classId)])
      .then(([columnas, observaciones]) => setDatos(d => ({ ...(d || {}), columnas, observaciones })))
      .catch(() => setError(tr({ es: 'No se pudieron cargar las notas y observaciones.', en: 'Could not load grades and notes.', ca: 'No s\'han pogut carregar les notes i observacions.' })))
  }, [classId]) // eslint-disable-line react-hooks/exhaustive-deps

  // La asistencia se recarga cada vez que cambia el rango: es la única de
  // las tres fuentes que se lee por rango (getAttendanceRange), no de golpe.
  useEffect(() => {
    getAttendanceRange(classId, desde, hasta)
      .then(dias => setDatos(d => ({ ...(d || {}), dias })))
      .catch(() => setError(tr({ es: 'No se pudo cargar la asistencia.', en: 'Could not load attendance.', ca: "No s'ha pogut carregar l'assistència." })))
  }, [classId, desde, hasta]) // eslint-disable-line react-hooks/exhaustive-deps

  function elegirPeriodo(id) {
    setPeriodoId(id)
    const t = trimestres.find(x => x.id === id)
    if (t) { setDesde(t.desde); setHasta(t.hasta) }
  }

  const cargando = !datos || !datos.columnas || !datos.dias || !datos.observaciones
  const boletin = (!cargando && alumnoUid)
    ? generarBoletin({ uid: alumnoUid, columnas: datos.columnas, dias: datos.dias, observaciones: datos.observaciones, desde, hasta })
    : null

  if (students.length === 0) {
    return (
      <p className="text-white/30 text-sm">
        {tr({ es: 'Todavía no se ha unido ningún alumno. Comparte el código de la clase.', en: 'No students have joined yet. Share the class code.', ca: 'Encara no s\'hi ha unit cap alumne. Comparteix el codi de la classe.' })}
      </p>
    )
  }

  return (
    <div>
      <div className="no-imprimir">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {students.map(s => (
            <button key={s.uid} type="button" onClick={() => setAlumnoUid(s.uid)}
              className={`text-[12.5px] font-semibold px-2.5 py-1.5 rounded-lg border transition-colors ${
                alumnoUid === s.uid ? 'bg-teal-500 border-teal-400 text-black' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
              }`}>
              {s.name}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-5">
          {trimestres.map(t => (
            <button key={t.id} type="button" onClick={() => elegirPeriodo(t.id)}
              className={`text-[12px] font-bold px-2.5 py-1.5 rounded-lg border transition-colors ${
                periodoId === t.id ? 'bg-white/15 border-white/25 text-white' : 'border-white/10 text-white/40 hover:text-white/70'
              }`}>
              {tr3(t.label, lang)}
            </button>
          ))}
          <span className="text-white/20 mx-1">·</span>
          <input type="date" value={desde} max={hasta}
            onChange={e => { setPeriodoId(null); setDesde(e.target.value) }}
            className="bg-black/30 border border-white/10 rounded-lg px-2 py-1.5 text-white text-[12px] [color-scheme:dark]" />
          <span className="text-white/30 text-[12px]">—</span>
          <input type="date" value={hasta} min={desde} max={HOY()}
            onChange={e => { setPeriodoId(null); setHasta(e.target.value) }}
            className="bg-black/30 border border-white/10 rounded-lg px-2 py-1.5 text-white text-[12px] [color-scheme:dark]" />
        </div>

        {error && <p className="text-red-400 text-[12.5px] mb-3">{error}</p>}

        {!alumnoUid && (
          <p className="text-white/30 text-sm mb-4">
            {tr({ es: 'Elige un alumno para ver su boletín.', en: 'Pick a student to see their report.', ca: 'Tria un alumne per veure el seu butlletí.' })}
          </p>
        )}
      </div>

      {alumnoUid && cargando && <p className="text-white/30 text-sm">{tr({ es: 'Cargando…', en: 'Loading…', ca: 'Carregant…' })}</p>}

      {alumnoUid && boletin && (
        <>
          <button type="button" onClick={() => window.print()}
            className="no-imprimir mb-4 text-[12.5px] font-bold px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-colors">
            🖨️ {tr({ es: 'Imprimir / Guardar PDF', en: 'Print / Save as PDF', ca: 'Imprimir / Desar PDF' })}
          </button>
          <Papel boletin={boletin} alumno={students.find(s => s.uid === alumnoUid)?.name || alumnoUid} claseName={claseName} lang={lang} tr={tr} />
        </>
      )}
    </div>
  )
}
