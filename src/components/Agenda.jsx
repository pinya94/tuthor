import { useEffect, useMemo, useState } from 'react'
import {
  TIPOS, TIPO_META, TITULO_MAX, tituloValido, NOMBRES_DIAS, nombreDelMes,
  rejillaDelMes, mesAnterior, mesSiguiente, eventosDeTareas, eventosDeAsistencia, porDia,
  getClassEvents, createEvent, updateEvent, deleteEvent,
} from '../lib/agenda'
import { getAllAttendance } from '../lib/attendance'

// El calendario del aula: el mes en una rejilla y, debajo, el día que se toque
// con todo lo que hay en él.
//
// El mes solo tiene sitio para dos o tres líneas por casilla, así que la
// rejilla enseña lo justo para saber DÓNDE mirar (el emoji del tipo y el
// título recortado de las dos primeras cosas) y el detalle vive abajo. Meter ahí los
// títulos enteros da un mes ilegible en cuanto hay dos cosas el mismo día, que
// es exactamente cuando el calendario sirve para algo.
//
// Lo que se pinta viene de tres sitios y solo uno se puede editar:
//   · los eventos propios del profesor, que se crean y se borran aquí;
//   · las tareas con fecha de entrega, que se tocan en Deberes;
//   · los días con faltas, que se tocan en Asistencia.
// Los dos últimos salen con candado a propósito — ver src/lib/agenda.js.

const tr3 = (o, lang) => o?.[lang] ?? o?.es ?? ''

function fechaLegible(dia, lang) {
  const [a, m, d] = dia.split('-').map(Number)
  return new Date(a, m - 1, d).toLocaleDateString(
    lang === 'en' ? 'en-GB' : lang === 'ca' ? 'ca-ES' : 'es-ES',
    { weekday: 'long', day: 'numeric', month: 'long' },
  )
}

export default function Agenda({ classId, assignments = [], etiquetaDeTarea, lang, tr }) {
  const [mes, setMes] = useState(() => new Date())
  const [propios, setPropios] = useState([])
  const [faltas, setFaltas] = useState({})
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [diaAbierto, setDiaAbierto] = useState(null)

  const [titulo, setTitulo] = useState('')
  const [tipo, setTipo] = useState('examen')
  const [editando, setEditando] = useState(null) // id del evento propio en edición
  const [guardando, setGuardando] = useState(false)

  const rejilla = useMemo(() => rejillaDelMes(mes), [mes])

  // Los eventos propios se traen UNA vez (la subcolección entera, ver
  // agenda.js): pasar de mes no vuelve a pedir nada. La asistencia sí va por
  // rango, porque ahí un curso entero son cientos de días.
  useEffect(() => {
    let vivo = true
    ;(async () => {
      try {
        const lista = await getClassEvents(classId)
        if (vivo) setPropios(lista)
      } catch {
        if (vivo) setError(tr({ es: 'No se ha podido cargar la agenda.', en: 'Could not load the calendar.', ca: "No s'ha pogut carregar l'agenda." }))
      } finally {
        if (vivo) setCargando(false)
      }
    })()
    return () => { vivo = false }
  }, [classId, tr])

  // También una sola vez, y por el mismo motivo: getAllAttendance se trae la
  // subcolección entera igual que hacía la versión por rango, así que pedirla
  // en cada cambio de mes era descargar lo mismo doce veces para mirar un
  // curso. El filtro por día ya lo hace la rejilla al pintar.
  useEffect(() => {
    let vivo = true
    ;(async () => {
      try {
        const dias = await getAllAttendance(classId)
        if (vivo) setFaltas(dias)
      } catch {
        // La asistencia es un extra del calendario: si falla, el mes se pinta
        // igual con los eventos y las tareas en vez de quedarse en un error.
        if (vivo) setFaltas({})
      }
    })()
    return () => { vivo = false }
  }, [classId])

  const eventos = useMemo(() => [
    ...propios.map(e => ({ ...e, propio: true })),
    ...eventosDeTareas(assignments, etiquetaDeTarea),
    ...eventosDeAsistencia(faltas),
  ], [propios, assignments, etiquetaDeTarea, faltas])

  const delDia = useMemo(() => porDia(eventos), [eventos])

  function abrir(dia) {
    setDiaAbierto(d => (d === dia ? null : dia))
    setEditando(null)
    setTitulo('')
    setError('')
  }

  async function guardar(e) {
    e.preventDefault()
    if (!tituloValido(titulo) || !diaAbierto) return
    setGuardando(true)
    setError('')
    try {
      if (editando) {
        await updateEvent(classId, editando, { titulo, tipo })
        setPropios(list => list.map(ev => (ev.id === editando ? { ...ev, titulo: titulo.trim(), tipo } : ev)))
      } else {
        const id = await createEvent(classId, { dia: diaAbierto, titulo, tipo })
        setPropios(list => [...list, { id, dia: diaAbierto, titulo: titulo.trim(), tipo }])
      }
      setTitulo('')
      setEditando(null)
    } catch {
      setError(tr({ es: 'No se ha podido guardar.', en: 'Could not save.', ca: "No s'ha pogut desar." }))
    } finally {
      setGuardando(false)
    }
  }

  async function borrar(id) {
    // Sin confirmación: es una línea de texto que el profesor acaba de
    // escribir y volver a escribirla cuesta menos que leer un "¿seguro?".
    const previos = propios
    setPropios(list => list.filter(e => e.id !== id))
    try {
      await deleteEvent(classId, id)
    } catch {
      setPropios(previos)
      setError(tr({ es: 'No se ha podido borrar.', en: 'Could not delete.', ca: "No s'ha pogut esborrar." }))
    }
  }

  function editar(ev) {
    setEditando(ev.id)
    setTitulo(ev.titulo)
    setTipo(ev.tipo)
  }

  const dias = NOMBRES_DIAS[lang] ?? NOMBRES_DIAS.es
  const abiertos = diaAbierto ? (delDia[diaAbierto] ?? []) : []

  return (
    <section className="mb-8 rounded-2xl border border-white/10 p-4" style={{ background: 'rgba(17,20,29,0.86)' }}>
      <div className="flex items-center justify-between gap-3 mb-3">
        <button type="button" onClick={() => setMes(mesAnterior)}
          className="px-3 py-1.5 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 text-[13px] font-bold transition-colors">
          ←
        </button>
        <p className="text-white font-black text-[15px] first-letter:uppercase">{nombreDelMes(mes, lang)}</p>
        <div className="flex items-center gap-1.5">
          <button type="button" onClick={() => setMes(new Date())}
            className="px-3 py-1.5 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 text-[12px] font-bold transition-colors">
            {tr({ es: 'Hoy', en: 'Today', ca: 'Avui' })}
          </button>
          <button type="button" onClick={() => setMes(mesSiguiente)}
            className="px-3 py-1.5 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 text-[13px] font-bold transition-colors">
            →
          </button>
        </div>
      </div>

      {error && <p className="text-red-400 text-[13px] mb-3">{error}</p>}

      <div className="grid grid-cols-7 gap-1 mb-1">
        {dias.map((d, i) => (
          <p key={i} className="text-center text-[11px] font-bold text-white/30 uppercase tracking-wider py-1">{d}</p>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {rejilla.map(c => {
          const suyos = delDia[c.dia] ?? []
          const seleccionado = diaAbierto === c.dia
          return (
            <button key={c.dia} type="button" onClick={() => abrir(c.dia)}
              className={`min-h-[62px] sm:min-h-[76px] p-1.5 rounded-lg border text-left transition-colors ${
                seleccionado ? 'border-teal-500 bg-teal-500/10'
                  : c.delMes ? 'border-white/10 bg-white/[0.03] hover:border-white/30'
                    : 'border-transparent bg-white/[0.01] hover:border-white/10'
              }`}>
              <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold mb-0.5 ${
                c.hoy ? 'bg-teal-500 text-black'
                  : c.delMes ? (c.finDeSemana ? 'text-white/30' : 'text-white/70')
                    : 'text-white/15'
              }`}>
                {c.numero}
              </span>
              {suyos.slice(0, 2).map(ev => (
                <span key={ev.id} className="block text-[9.5px] leading-tight truncate text-white/55">
                  {ev.derivado === 'asistencia'
                    ? [ev.faltas > 0 && `✕ ${ev.faltas}`, ev.retrasos > 0 && `⏱ ${ev.retrasos}`].filter(Boolean).join(' · ')
                    : `${TIPO_META[ev.tipo]?.emoji ?? '📌'} ${ev.titulo}`}
                </span>
              ))}
              {suyos.length > 2 && (
                <span className="block text-[9.5px] text-white/30">+{suyos.length - 2}</span>
              )}
            </button>
          )
        })}
      </div>

      {cargando && <p className="text-white/30 text-[13px] mt-3">{tr({ es: 'Cargando…', en: 'Loading…', ca: 'Carregant…' })}</p>}

      {diaAbierto && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-white font-bold text-[14px] first-letter:uppercase mb-3">{fechaLegible(diaAbierto, lang)}</p>

          <div className="space-y-1.5 mb-4">
            {abiertos.length === 0 && (
              <p className="text-white/30 text-[13px]">{tr({ es: 'Nada apuntado este día.', en: 'Nothing on this day.', ca: 'Res apuntat aquest dia.' })}</p>
            )}
            {abiertos.map(ev => ev.derivado === 'asistencia' ? (
              <div key={ev.id} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/[0.02]">
                <span className="text-[13px]">{ev.faltas > 0 ? '✕' : '⏱'}</span>
                <p className="text-white/60 text-[13px] flex-1">
                  {[
                    ev.faltas > 0 && `${ev.faltas} ${tr({ es: ev.faltas === 1 ? 'falta' : 'faltas', en: ev.faltas === 1 ? 'absence' : 'absences', ca: ev.faltas === 1 ? 'falta' : 'faltes' })}`,
                    ev.retrasos > 0 && `${ev.retrasos} ${tr({ es: ev.retrasos === 1 ? 'retraso' : 'retrasos', en: ev.retrasos === 1 ? 'late' : 'lates', ca: ev.retrasos === 1 ? 'retard' : 'retards' })}`,
                  ].filter(Boolean).join(' · ')}
                </p>
                <span className="text-white/25 text-[11px]">{tr({ es: 'Asistencia', en: 'Attendance', ca: 'Assistència' })}</span>
              </div>
            ) : (
              <div key={ev.id} className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${TIPO_META[ev.tipo]?.color ?? TIPO_META.nota.color}`}>
                <span className="text-[13px]">{TIPO_META[ev.tipo]?.emoji ?? '📌'}</span>
                <p className="text-[13px] font-semibold flex-1 min-w-0 break-words">{ev.titulo}</p>
                {ev.propio ? (
                  <>
                    <button type="button" onClick={() => editar(ev)}
                      className="text-white/40 hover:text-white text-[11px] font-bold transition-colors">
                      {tr({ es: 'Editar', en: 'Edit', ca: 'Editar' })}
                    </button>
                    <button type="button" onClick={() => borrar(ev.id)}
                      className="text-white/40 hover:text-red-400 text-[11px] font-bold transition-colors">
                      {tr({ es: 'Borrar', en: 'Delete', ca: 'Esborrar' })}
                    </button>
                  </>
                ) : (
                  // Sale de Deberes: borrarlo desde aquí tendría que borrar la
                  // tarea de todos los alumnos, con lo que ya hayan entregado
                  // dentro. Se dice de dónde viene en vez de dejar un botón
                  // que no se puede ofrecer.
                  <span className="text-white/25 text-[11px] shrink-0">{tr({ es: 'Deberes', en: 'Homework', ca: 'Deures' })}</span>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={guardar} className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-1">
              {TIPOS.map(t => (
                <button key={t} type="button" onClick={() => setTipo(t)}
                  className={`text-[11.5px] font-bold px-2.5 py-1.5 rounded-lg border transition-colors ${
                    tipo === t ? TIPO_META[t].color : 'border-white/10 text-white/40 hover:text-white/70'
                  }`}>
                  {TIPO_META[t].emoji} {tr3(TIPO_META[t].label, lang)}
                </button>
              ))}
            </div>
            <input
              value={titulo}
              onChange={e => setTitulo(e.target.value.slice(0, TITULO_MAX))}
              placeholder={tr({ es: 'Examen de fracciones…', en: 'Fractions test…', ca: 'Examen de fraccions…' })}
              className="flex-1 min-w-[180px] px-3 py-2 rounded-xl bg-black/30 border border-white/10 text-white text-[13px] placeholder-white/25 focus:border-teal-500/50 focus:outline-none"
            />
            <button type="submit" disabled={!tituloValido(titulo) || guardando}
              className="text-[12.5px] font-bold px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-40 disabled:hover:bg-teal-600 text-white transition-colors">
              {editando ? tr({ es: 'Guardar', en: 'Save', ca: 'Desar' }) : tr({ es: 'Apuntar', en: 'Add', ca: 'Apuntar' })}
            </button>
            {editando && (
              <button type="button" onClick={() => { setEditando(null); setTitulo('') }}
                className="text-white/40 hover:text-white text-[12px] font-bold transition-colors">
                {tr({ es: 'Cancelar', en: 'Cancel', ca: 'Cancel·lar' })}
              </button>
            )}
          </form>
        </div>
      )}
    </section>
  )
}
