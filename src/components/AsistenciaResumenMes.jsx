import { useEffect, useState } from 'react'
import { ESTADO_META, diasDelMes, estadoDe, totalesPorAlumno, getAttendanceMonth } from '../lib/attendance'
import { getAttendanceRange } from '../lib/attendance'
import { trimestresDelCurso } from '../lib/report'
import { VisorHoja } from './HojasImprimibles'
import { HojaAsistencia, HojaAsistenciaResumen } from './HojasDeClase'

// El resumen del mes: alumnos en filas, días en columnas, una casilla de color
// por cada uno. Es la vista que responde "¿quién falta mucho?" de un vistazo,
// que Asistencia.jsx (pasar lista día a día) no puede contestar sin abrir
// treinta días uno a uno.
//
// Una casilla vacía con borde punteado es un día SIN PASAR, no un acierto: la
// ausencia de marca en getAttendanceMonth significa "no hay documento", y eso
// no puede pintarse igual que "presente" o se confundiría un festivo (o un
// día que se olvidó pasar) con una clase perfecta.

const CASILLA = {
  presente:    'bg-white/15',
  ausente:     'bg-red-500',
  retraso:     'bg-amber-500',
  justificada: 'bg-sky-500',
}

const sumarMeses = (fecha, delta) => new Date(fecha.getFullYear(), fecha.getMonth() + delta, 1)
const esMesActual = fecha => {
  const hoy = new Date()
  return fecha.getFullYear() === hoy.getFullYear() && fecha.getMonth() === hoy.getMonth()
}
const nombreMes = (fecha, lang) => fecha.toLocaleDateString(
  lang === 'en' ? 'en-GB' : lang === 'ca' ? 'ca-ES' : 'es-ES', { month: 'long', year: 'numeric' },
).replace(/^\p{L}/u, c => c.toUpperCase())
const numeroDia = iso => Number(iso.split('-')[2])
const esFinde = iso => {
  const [a, m, d] = iso.split('-').map(Number)
  const dow = new Date(a, m - 1, d).getDay()
  return dow === 0 || dow === 6
}

// Los periodos que se pueden llevar al papel. "mes" es la rejilla día a día
// que ya se está mirando; los demás son demasiado largos para una rejilla —un
// trimestre son unos 60 días de clase y el curso pasa de 175— y se imprimen
// como resumen por meses. Ver HojaAsistenciaResumen.
const PERIODOS = [
  { id: 'mes', label: { es: 'Este mes', en: 'This month', ca: 'Aquest mes' } },
  ...trimestresDelCurso(),
]

export default function AsistenciaResumenMes({ classId, students, claseName, lang, tr }) {
  const [enPapel, setEnPapel] = useState(false)
  const [periodo, setPeriodo] = useState('mes')
  const [rango, setRango] = useState(null) // { id, dias } del periodo largo cargado
  const [cargandoRango, setCargandoRango] = useState(false)
  const [mesVisto, setMesVisto] = useState(() => new Date())
  const [dias, setDias] = useState(null) // null = cargando; { 'YYYY-MM-DD': marks }
  const [error, setError] = useState('')

  // `dias` se pone a null (→ "Cargando…") en los propios botones de mes, no
  // aquí dentro: llamar a setState de forma síncrona al entrar en un efecto
  // dispara un render en cascada evitable (react-hooks/set-state-in-effect).
  useEffect(() => {
    let vivo = true
    getAttendanceMonth(classId, mesVisto)
      .then(d => { if (vivo) { setDias(d); setError('') } })
      .catch(() => {
        if (!vivo) return
        setError(tr({ es: 'No se pudo cargar el resumen.', en: 'Could not load the summary.', ca: "No s'ha pogut carregar el resum." }))
        setDias({})
      })
    return () => { vivo = false }
  }, [classId, mesVisto]) // eslint-disable-line react-hooks/exhaustive-deps

  const irAMes = delta => { setDias(null); setMesVisto(m => sumarMeses(m, delta)) }

  // El rango largo se pide al elegirlo, no al montar: la mayoría de las veces
  // el profesor solo quiere el mes que ya está viendo, y getAttendanceRange se
  // trae la colección entera de asistencia de la clase.
  async function elegirPeriodo(id) {
    setPeriodo(id)
    if (id === 'mes' || rango?.id === id) return
    const p = PERIODOS.find(x => x.id === id)
    if (!p?.desde) return
    setCargandoRango(true)
    try {
      setRango({ id, dias: await getAttendanceRange(classId, p.desde, p.hasta) })
    } catch {
      setError(tr({ es: 'No se pudo cargar el periodo.', en: 'Could not load the period.', ca: 'No s\'ha pogut carregar el període.' }))
    }
    setCargandoRango(false)
  }

  if (students.length === 0) return null

  const diasArr = diasDelMes(mesVisto)
  const totales = dias ? totalesPorAlumno(dias, students.map(s => s.uid)) : {}

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <button type="button" onClick={() => irAMes(-1)}
          className="w-7 h-7 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white/60 transition-colors">‹</button>
        <p className="text-white/70 text-[13px] font-bold min-w-[130px] text-center">{nombreMes(mesVisto, lang)}</p>
        <button type="button" onClick={() => irAMes(1)} disabled={esMesActual(mesVisto)}
          className="w-7 h-7 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-25 disabled:cursor-not-allowed text-white/60 transition-colors">›</button>
        <button type="button" onClick={() => setEnPapel(true)} disabled={dias === null}
          className="ml-auto text-[12px] font-bold px-2.5 py-1.5 rounded-lg border border-teal-500/30 text-teal-300 hover:bg-teal-500/10 disabled:opacity-30 transition-colors">
          🖨️ {tr({ es: 'En papel', en: 'On paper', ca: 'En paper' })}
        </button>
      </div>

      {error && <p className="text-red-400 text-[12.5px] mb-3">{error}</p>}

      {dias === null ? (
        <p className="text-white/30 text-sm">{tr({ es: 'Cargando…', en: 'Loading…', ca: 'Carregant…' })}</p>
      ) : (
        <>
          <div className="overflow-x-auto -mx-1 mb-3">
            <table className="border-collapse">
              <thead>
                <tr>
                  <th className="text-left text-white/35 text-[10.5px] uppercase tracking-wider font-bold px-1 pb-1.5 sticky left-0 bg-[rgba(13,15,22,.94)]">
                    {tr({ es: 'Alumno', en: 'Student', ca: 'Alumne' })}
                  </th>
                  {diasArr.map(iso => (
                    <th key={iso} className={`px-[1.5px] pb-1.5 text-[9.5px] font-bold w-5 ${esFinde(iso) ? 'text-white/15' : 'text-white/35'}`}>
                      {numeroDia(iso)}
                    </th>
                  ))}
                  <th className="pl-2 text-white/35 text-[10.5px] uppercase tracking-wider font-bold text-right">
                    {tr({ es: 'Faltas', en: 'Absences', ca: 'Faltes' })}
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => {
                  const t = totales[s.uid] || { ausente: 0, retraso: 0, justificada: 0 }
                  return (
                    <tr key={s.uid} className={i > 0 ? 'border-t border-white/5' : ''}>
                      <td className="text-white font-semibold text-[12.5px] py-1 px-1 truncate max-w-[130px] sticky left-0 bg-[rgba(13,15,22,.94)]">
                        {s.name}
                      </td>
                      {diasArr.map(iso => {
                        const pasado = iso in dias
                        const estado = pasado ? estadoDe(dias[iso], s.uid) : null
                        return (
                          <td key={iso} className="px-[1.5px] py-1">
                            <span
                              title={pasado ? tr3(ESTADO_META[estado]?.label, lang) : tr({ es: 'Sin pasar', en: 'Not taken', ca: 'Sense passar' })}
                              className={`block w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[3px] ${
                                pasado ? CASILLA[estado] : 'border border-dashed border-white/10'
                              }`}
                            />
                          </td>
                        )
                      })}
                      <td className="pl-2 text-right text-[12px] font-bold tabular-nums">
                        {t.ausente + t.retraso + t.justificada === 0
                          ? <span className="text-white/20">—</span>
                          : <span className={t.ausente > 0 ? 'text-red-400' : 'text-white/50'}>
                              {t.ausente > 0 && `${t.ausente}✕`} {t.retraso > 0 && `${t.retraso}⏱`} {t.justificada > 0 && `${t.justificada}✓`}
                            </span>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-white/40">
            {Object.entries(ESTADO_META).filter(([id]) => id !== 'presente').map(([id, m]) => (
              <span key={id} className="inline-flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-[2px] ${CASILLA[id]}`} />
                {tr3(m.label, lang)}
              </span>
            ))}
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-[2px] border border-dashed border-white/15" />
              {tr({ es: 'Sin pasar', en: 'Not taken', ca: 'Sense passar' })}
            </span>
          </div>
        </>
      )}

      {enPapel && (
        <VisorHoja
          onClose={() => setEnPapel(false)} tr={tr} ancho="max-w-5xl"
          controles={
            <div className="flex flex-wrap items-center gap-1.5">
              {PERIODOS.map(p => (
                <button key={p.id} type="button" onClick={() => elegirPeriodo(p.id)}
                  className={`text-[11.5px] font-bold px-2 py-1 rounded-lg border transition-colors ${
                    periodo === p.id ? 'bg-white/15 border-white/25 text-white' : 'border-white/15 text-white/45 hover:text-white/80'
                  }`}>
                  {tr(p.label)}
                </button>
              ))}
            </div>
          }
        >
          {periodo === 'mes' ? (
            dias ? (
              <HojaAsistencia clase={claseName} alumnos={students} dias={dias}
                mes={nombreMes(mesVisto, lang)} lang={lang} tr={tr} />
            ) : <p className="text-white/50 text-sm">{tr({ es: 'Cargando…', en: 'Loading…', ca: 'Carregant…' })}</p>
          ) : cargandoRango || rango?.id !== periodo ? (
            <p className="text-white/50 text-sm">{tr({ es: 'Cargando…', en: 'Loading…', ca: 'Carregant…' })}</p>
          ) : (
            <HojaAsistenciaResumen clase={claseName} alumnos={students} dias={rango.dias}
              periodo={tr(PERIODOS.find(p => p.id === periodo)?.label ?? {})} lang={lang} tr={tr} />
          )}
        </VisorHoja>
      )}
    </div>
  )
}

function tr3(o, lang) { return o?.[lang] ?? o?.es ?? '' }
