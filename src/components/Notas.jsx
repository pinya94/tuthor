import { useEffect, useState } from 'react'
import {
  NOTA_MAX, parseNota, notaValida, promedioColumna, promedioAlumno, suspenso,
  getGradeColumns, createGradeColumn, setGrade, deleteGradeColumn,
} from '../lib/grades'

// El cuaderno de notas. Cada columna es una evaluación; cada celda, un input
// directo — es una tabla de calificar, y en una tabla de calificar se
// escriben las notas, no se ciclan tocando (a diferencia de Asistencia, donde
// solo hay cuatro estados posibles).
//
// Guardado al perder el foco (blur) o con Enter, no en cada tecla: escribir
// "7.5" tecla a tecla no puede disparar una escritura por cada "7", "7.", …

const nota1dec = n => (n == null ? '' : Number.isInteger(n) ? String(n) : n.toFixed(1))

function Celda({ valor, onGuardar }) {
  const [texto, setTexto] = useState(nota1dec(valor))
  const [valorPrevio, setValorPrevio] = useState(valor)
  const [guardando, setGuardando] = useState(false)

  // El valor de fuera manda cuando cambia por otra vía (otra pestaña del
  // profesor, o revertir un guardado fallido), salvo mientras se está
  // escribiendo. Ajuste en el propio render (no en un efecto) siguiendo el
  // patrón que recomienda React para "derivar estado de una prop que
  // cambia": si no, cada letra que teclea alguien se pisaría con el último
  // valor confirmado del servidor.
  if (valor !== valorPrevio) {
    setValorPrevio(valor)
    setTexto(nota1dec(valor))
  }

  async function confirmar() {
    const n = parseNota(texto)
    if (n === undefined) { setTexto(nota1dec(valor)); return } // no numérico: se descarta
    if (n === valor) return
    setGuardando(true)
    const ok = await onGuardar(n)
    setGuardando(false)
    if (!ok) setTexto(nota1dec(valor))
  }

  const invalida = valor != null && suspenso(valor)
  return (
    <input
      value={texto}
      disabled={guardando}
      onChange={e => setTexto(e.target.value)}
      onBlur={confirmar}
      onKeyDown={e => { if (e.key === 'Enter') e.currentTarget.blur() }}
      placeholder="—"
      inputMode="decimal"
      className={`w-14 text-center rounded-lg border py-1.5 text-[13px] font-bold bg-black/20 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-colors disabled:opacity-40 ${
        invalida ? 'border-red-500/40 text-red-300' : 'border-white/10 text-white'
      }`}
    />
  )
}

function Media({ valor }) {
  if (valor == null) return <span className="text-white/20">—</span>
  return <span className={suspenso(valor) ? 'text-red-400' : 'text-green-400'}>{valor.toFixed(1)}</span>
}

export default function Notas({ classId, students, tr }) {
  const [columnas, setColumnas] = useState(null) // null = cargando
  const [error, setError] = useState('')
  const [nuevaCol, setNuevaCol] = useState('')
  const [creando, setCreando] = useState(false)
  const [borrarConfirm, setBorrarConfirm] = useState(null) // colId pendiente de un segundo toque

  useEffect(() => {
    getGradeColumns(classId)
      .then(setColumnas)
      .catch(() => { setError(tr({ es: 'No se pudo cargar el cuaderno.', en: 'Could not load the gradebook.', ca: 'No s\'ha pogut carregar el quadern.' })); setColumnas([]) })
  }, [classId, tr])

  async function anadirColumna(e) {
    e.preventDefault()
    const nombre = nuevaCol.trim()
    if (!nombre) return
    setCreando(true); setError('')
    try {
      const id = await createGradeColumn(classId, nombre)
      setColumnas(cs => [...cs, { id, name: nombre, values: {} }])
      setNuevaCol('')
    } catch {
      setError(tr({ es: 'No se pudo crear la columna.', en: 'Could not create the column.', ca: 'No s\'ha pogut crear la columna.' }))
    }
    setCreando(false)
  }

  async function guardarNota(colId, uid, valor) {
    // Optimista: se pinta ya, y solo se revierte (Celda vuelve al valor
    // anterior) si Firestore rechaza la escritura.
    setColumnas(cs => cs.map(c => c.id !== colId ? c : {
      ...c, values: valor === null
        ? Object.fromEntries(Object.entries(c.values).filter(([u]) => u !== uid))
        : { ...c.values, [uid]: valor },
    }))
    try {
      await setGrade(classId, colId, uid, valor)
      return true
    } catch {
      setError(tr({ es: 'No se pudo guardar la nota.', en: 'Could not save the grade.', ca: 'No s\'ha pogut desar la nota.' }))
      const original = await getGradeColumns(classId).catch(() => null)
      if (original) setColumnas(original)
      return false
    }
  }

  async function borrarColumna(colId) {
    if (borrarConfirm !== colId) { setBorrarConfirm(colId); return }
    setBorrarConfirm(null)
    const previas = columnas
    setColumnas(cs => cs.filter(c => c.id !== colId))
    try {
      await deleteGradeColumn(classId, colId)
    } catch {
      setColumnas(previas)
      setError(tr({ es: 'No se pudo borrar la columna.', en: 'Could not delete the column.', ca: 'No s\'ha pogut esborrar la columna.' }))
    }
  }

  if (students.length === 0) {
    return (
      <p className="text-white/30 text-sm">
        {tr({
          es: 'Todavía no se ha unido ningún alumno. Comparte el código de la clase.',
          en: 'No students have joined yet. Share the class code.',
          ca: 'Encara no s\'hi ha unit cap alumne. Comparteix el codi de la classe.',
        })}
      </p>
    )
  }

  if (columnas === null) {
    return <p className="text-white/30 text-sm">{tr({ es: 'Cargando…', en: 'Loading…', ca: 'Carregant…' })}</p>
  }

  return (
    <div>
      {error && <p className="text-red-400 text-[12.5px] mb-3">{error}</p>}

      {columnas.length === 0 ? (
        <p className="text-white/30 text-sm mb-4">
          {tr({
            es: 'Todavía no hay ninguna evaluación. Añade la primera columna abajo.',
            en: 'No assessment yet. Add the first column below.',
            ca: 'Encara no hi ha cap avaluació. Afegeix la primera columna a sota.',
          })}
        </p>
      ) : (
        <div className="overflow-x-auto -mx-1 mb-2">
          <table className="w-full border-collapse min-w-[420px]">
            <thead>
              <tr>
                <th className="text-left text-white/35 text-[10.5px] uppercase tracking-wider font-bold px-1 pb-2 sticky left-0 bg-[rgba(13,15,22,.94)]">
                  {tr({ es: 'Alumno', en: 'Student', ca: 'Alumne' })}
                </th>
                {columnas.map(col => (
                  <th key={col.id} className="px-1.5 pb-2 min-w-[92px]">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-white text-[12px] font-bold truncate max-w-[100px]" title={col.name}>{col.name}</span>
                      <button type="button" onClick={() => borrarColumna(col.id)}
                        title={tr({ es: 'Borrar columna', en: 'Delete column', ca: 'Esborrar columna' })}
                        className={`shrink-0 text-[11px] px-1 rounded transition-colors ${
                          borrarConfirm === col.id ? 'text-red-300 bg-red-500/20 font-bold' : 'text-white/20 hover:text-red-400'
                        }`}>
                        {borrarConfirm === col.id ? tr({ es: '¿Sí?', en: 'Sure?', ca: 'Sí?' }) : '✕'}
                      </button>
                    </div>
                  </th>
                ))}
                <th className="px-1.5 pb-2 text-white/35 text-[10.5px] uppercase tracking-wider font-bold min-w-[64px]">
                  {tr({ es: 'Media', en: 'Average', ca: 'Mitjana' })}
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={s.uid} className={i > 0 ? 'border-t border-white/5' : ''}>
                  <td className="text-white font-semibold text-[13px] py-1.5 px-1 truncate max-w-[140px] sticky left-0 bg-[rgba(13,15,22,.94)]">
                    {s.name}
                  </td>
                  {columnas.map(col => (
                    <td key={col.id} className="text-center py-1.5 px-1.5">
                      <Celda valor={notaValida(col.values?.[s.uid]) ? col.values[s.uid] : null}
                        onGuardar={valor => guardarNota(col.id, s.uid, valor)} />
                    </td>
                  ))}
                  <td className="text-center py-1.5 px-1.5 text-[13px] font-bold">
                    <Media valor={promedioAlumno(columnas, s.uid)} />
                  </td>
                </tr>
              ))}
              <tr className="border-t border-white/10">
                <td className="text-white/35 text-[10.5px] uppercase tracking-wider font-bold py-2 px-1 sticky left-0 bg-[rgba(13,15,22,.94)]">
                  {tr({ es: 'Media', en: 'Average', ca: 'Mitjana' })}
                </td>
                {columnas.map(col => (
                  <td key={col.id} className="text-center py-2 px-1.5 text-[13px] font-bold">
                    <Media valor={promedioColumna(col)} />
                  </td>
                ))}
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <form onSubmit={anadirColumna} className="flex items-center gap-2">
        <input value={nuevaCol} onChange={e => setNuevaCol(e.target.value)} maxLength={80}
          placeholder={tr({ es: 'Nombre de la evaluación (p.ej. Examen tema 3)', en: 'Assessment name (e.g. Unit 3 test)', ca: "Nom de l'avaluació (p.ex. Examen tema 3)" })}
          className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-[13px] placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-teal-400" />
        <button type="submit" disabled={creando || !nuevaCol.trim()}
          className="shrink-0 text-[12.5px] font-bold px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 disabled:opacity-30 text-white transition-colors">
          + {tr({ es: 'Columna', en: 'Column', ca: 'Columna' })}
        </button>
      </form>

      <p className="text-white/25 text-[11.5px] mt-3">
        {tr({
          es: `Escribe una nota de 0 a ${NOTA_MAX} y pulsa Intro o haz clic fuera para guardarla. Deja el campo vacío para borrarla: no es lo mismo "sin nota" que un 0.`,
          en: `Type a grade from 0 to ${NOTA_MAX} and press Enter or click away to save it. Leave it blank to clear it: "no grade" and a 0 are not the same thing.`,
          ca: `Escriu una nota de 0 a ${NOTA_MAX} i prem Intro o clica fora per desar-la. Deixa el camp buit per esborrar-la: no és el mateix "sense nota" que un 0.`,
        })}
      </p>
    </div>
  )
}
