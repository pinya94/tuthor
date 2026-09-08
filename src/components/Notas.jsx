import { useEffect, useState } from 'react'
import {
  NOTA_MAX, parseNota, notaValida, promedioColumna, promedioAlumno, suspenso,
  pesoDe, pesoValido, porcentajeDeColumna, PESO_POR_DEFECTO,
  notasDeTarea, cuantasNotasTiene, crearColumnaConNotas,
  getGradeColumns, createGradeColumn, setGrade, setColumnPeso, deleteGradeColumn,
} from '../lib/grades'
import { trimestresDelCurso, trimestreDe } from '../lib/report'
import { getClassAssignments } from '../lib/assignments'
import { catalogTaskLabel } from '../lib/topicCatalog'
import { GAMES } from '../lib/games'
import { EXAMS } from '../lib/exams'
import { SUBJECTS } from '../lib/statsAggregation'
import { VisorHoja } from './HojasImprimibles'
import { HojaNotas } from './HojasDeClase'

// El cuaderno de notas. Cada columna es una evaluación; cada celda, un input
// directo — es una tabla de calificar, y en una tabla de calificar se
// escriben las notas, no se ciclan tocando (a diferencia de Asistencia, donde
// solo hay cuatro estados posibles).
//
// Guardado al perder el foco (blur) o con Enter, no en cada tecla: escribir
// "7.5" tecla a tecla no puede disparar una escritura por cada "7", "7.", …
//
// El trimestre de una columna es opcional y solo se decide al crearla (no
// hay edición posterior en esta versión): organiza el propio cuaderno cuando
// hay muchas evaluaciones en un curso, filtrando la tabla y las medias por
// trimestre. "Curso completo" (el cuarto id de trimestresDelCurso) no
// aparece aquí a propósito: una columna pertenece a UN trimestre o a
// ninguno, nunca "a los tres a la vez".
const TRIMESTRES = trimestresDelCurso().filter(t => t.id !== 'curso')

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

// El peso de una columna, editable en su propia cabecera. Mismo criterio que
// Celda: se guarda al salir del campo o con Enter, no en cada tecla.
//
// Al lado va el porcentaje REAL que representa esa columna, calculado con los
// pesos de todas. Es lo que convierte "×3" en algo que un profesor reconoce:
// él piensa en "el examen es el 60%", no en múltiplos.
function PesoCelda({ columna, columnas, onGuardar, tr }) {
  const [texto, setTexto] = useState(String(pesoDe(columna)))
  const [previo, setPrevio] = useState(pesoDe(columna))
  const actual = pesoDe(columna)
  if (actual !== previo) { setPrevio(actual); setTexto(String(actual)) }

  async function confirmar() {
    const n = Number(texto.replace(',', '.'))
    if (!pesoValido(n)) { setTexto(String(actual)); return }
    if (n === actual) return
    if (!await onGuardar(n)) setTexto(String(actual))
  }

  const pct = porcentajeDeColumna(columnas, columna.id)
  return (
    <span className="flex items-center justify-center gap-1 mt-0.5">
      <span className="text-white/25 text-[10px]">×</span>
      <input
        value={texto}
        onChange={e => setTexto(e.target.value)}
        onBlur={confirmar}
        onKeyDown={e => { if (e.key === 'Enter') e.currentTarget.blur() }}
        title={tr({ es: 'Cuánto pesa esta columna en la media', en: 'How much this column weighs in the average', ca: 'Quant pesa aquesta columna a la mitjana' })}
        className="w-6 bg-transparent text-center text-[10.5px] font-bold text-white/60 border-b border-white/10 outline-none focus:border-teal-400 focus:text-white"
      />
      {/* Un 0% se pinta apagado: esa columna está a la vista pero no cuenta. */}
      <span className={`text-[10px] ${pct > 0 ? 'text-white/30' : 'text-white/15'}`}>{Math.round(pct)}%</span>
    </span>
  )
}

// El selector de tarea: lista lo que ya está corregido y cuántas notas trae
// cada cosa, para poder decidir antes de crear la columna. Solo salen las que
// tienen al menos una nota convertible — una tarea que nadie ha hecho todavía
// no es una columna, es una columna vacía.
function TraerTarea({ classId, lang, tr, trimestre, onCreada, onCerrar }) {
  const [tareas, setTareas] = useState(null)
  const [creando, setCreando] = useState(null)
  const [fallo, setFallo] = useState('')

  useEffect(() => {
    let vivo = true
    getClassAssignments(classId)
      .then(ts => { if (vivo) setTareas(ts.filter(t => cuantasNotasTiene(t) > 0)) })
      .catch(() => { if (vivo) setFallo(tr({ es: 'No se pudieron cargar las tareas.', en: 'Could not load the tasks.', ca: 'No s\'han pogut carregar les tasques.' })) })
    return () => { vivo = false }
  }, [classId, tr])

  async function traer(tarea) {
    setCreando(tarea.id); setFallo('')
    try {
      const nombre = (tarea.kind === 'catalog'
        ? catalogTaskLabel(tarea, lang, { games: GAMES, exams: EXAMS, subjects: SUBJECTS })
        : tarea.title) || tr({ es: 'Tarea', en: 'Task', ca: 'Tasca' })
      await onCreada(nombre.slice(0, 80), notasDeTarea(tarea))
      onCerrar()
    } catch {
      setFallo(tr({ es: 'No se pudo crear la columna.', en: 'Could not create the column.', ca: 'No s\'ha pogut crear la columna.' }))
      setCreando(null)
    }
  }

  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-3 mb-3">
      <div className="flex items-center justify-between gap-2 mb-2">
        <p className="text-white/70 text-[12.5px] font-bold">
          {tr({ es: 'Traer una tarea ya corregida', en: 'Bring in a task Tuthor has marked', ca: 'Portar una tasca ja corregida' })}
        </p>
        <button type="button" onClick={onCerrar} className="text-white/40 hover:text-white text-[12px] font-bold">✕</button>
      </div>

      {fallo && <p className="text-red-400 text-[12px] mb-2">{fallo}</p>}

      {tareas === null ? (
        // Si la lectura falló ya no se está cargando: sin esto se quedaba el
        // "Cargando…" para siempre debajo del error. La comprobación va DENTRO
        // de la rama de null y no en su condición: sacarla fuera hacía que el
        // caso "null + error" cayera en la rama siguiente y reventara con
        // tareas.length.
        fallo ? null : <p className="text-white/30 text-[12.5px]">{tr({ es: 'Cargando…', en: 'Loading…', ca: 'Carregant…' })}</p>
      ) : tareas.length === 0 ? (
        <p className="text-white/30 text-[12.5px]">
          {tr({
            es: 'Todavía no hay ninguna tarea con notas. Aparecerán aquí en cuanto tus alumnos hagan un examen que hayas mandado.',
            en: 'No task has grades yet. They will show up here as soon as your students take an exam you have set.',
            ca: 'Encara no hi ha cap tasca amb notes. Apareixeran aquí quan els teus alumnes facin un examen que hagis manat.',
          })}
        </p>
      ) : (
        <div className="flex flex-col gap-1.5">
          {tareas.map(t => {
            const nombre = (t.kind === 'catalog'
              ? catalogTaskLabel(t, lang, { games: GAMES, exams: EXAMS, subjects: SUBJECTS })
              : t.title) || tr({ es: 'Tarea', en: 'Task', ca: 'Tasca' })
            return (
              <button key={t.id} type="button" disabled={creando !== null} onClick={() => traer(t)}
                className="flex items-center justify-between gap-3 text-left px-2.5 py-2 rounded-lg border border-white/10 hover:border-teal-500/40 hover:bg-teal-500/5 disabled:opacity-30 transition-colors">
                <span className="text-white text-[12.5px] font-semibold truncate">{nombre}</span>
                <span className="shrink-0 text-white/40 text-[11.5px]">
                  {creando === t.id
                    ? tr({ es: 'Trayendo…', en: 'Bringing…', ca: 'Portant…' })
                    : `${cuantasNotasTiene(t)} ${tr({ es: 'notas', en: 'grades', ca: 'notes' })}`}
                </span>
              </button>
            )
          })}
        </div>
      )}

      <p className="text-white/25 text-[11px] mt-2 leading-relaxed">
        {tr({
          es: `Se crea una columna con las notas sobre 10 y el trimestre que tengas elegido${trimestre ? '' : ''}. Quien no la haya hecho se queda sin nota, no con un cero. Después puedes editarla como cualquier otra.`,
          en: 'It creates a column with the grades out of 10 and the term you have selected. Anyone who has not done it is left with no grade, not a zero. You can edit it afterwards like any other.',
          ca: 'Es crea una columna amb les notes sobre 10 i el trimestre que tinguis triat. Qui no l\'hagi feta es queda sense nota, no amb un zero. Després la pots editar com qualsevol altra.',
        })}
      </p>
    </div>
  )
}

export default function Notas({ classId, students, claseName, lang, tr }) {
  const [columnas, setColumnas] = useState(null) // null = cargando
  const [enPapel, setEnPapel] = useState(false)
  const [traendo, setTraendo] = useState(false)
  const [error, setError] = useState('')
  const [nuevaCol, setNuevaCol] = useState('')
  const [nuevoTrimestre, setNuevoTrimestre] = useState(() => trimestreDe())
  const [creando, setCreando] = useState(false)
  const [borrarConfirm, setBorrarConfirm] = useState(null) // colId pendiente de un segundo toque
  const [filtro, setFiltro] = useState('todas') // 'todas' | '1' | '2' | '3'
  // Ponderar es opcional. Por defecto la media es la de toda la vida —todas
  // las columnas valen igual— y no se enseña ningún control de peso: el
  // profesor que quiera "el examen vale el 60%" lo enciende él.
  const [ponderarManual, setPonderarManual] = useState(false)
  const [quitarPesosConfirm, setQuitarPesosConfirm] = useState(false)

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
      const id = await createGradeColumn(classId, nombre, nuevoTrimestre)
      setColumnas(cs => [...cs, { id, name: nombre, trimestre: nuevoTrimestre, values: {} }])
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

  async function guardarPeso(colId, peso) {
    // Optimista igual que las notas: se pinta ya —y con él el porcentaje de
    // TODAS las columnas, que depende del reparto— y solo se revierte si
    // Firestore rechaza la escritura.
    const previas = columnas
    setColumnas(cs => cs.map(c => (c.id === colId ? { ...c, peso } : c)))
    try {
      await setColumnPeso(classId, colId, peso)
      return true
    } catch {
      setColumnas(previas)
      setError(tr({ es: 'No se pudo cambiar el peso.', en: 'Could not change the weight.', ca: 'No s\'ha pogut canviar el pes.' }))
      return false
    }
  }

  // Encender la ponderación es solo enseñar los controles. Apagarla, en
  // cambio, no puede limitarse a esconderlos: si quedara algún peso distinto
  // de 1, la media seguiría siendo ponderada sin que nada lo explicase en
  // pantalla. Por eso apagar devuelve de verdad todos los pesos a 1, y como
  // eso sí borra un ajuste del profesor, pide un segundo toque igual que el
  // botón de borrar columna.
  async function alternarPonderacion() {
    if (!ponderando) { setPonderarManual(true); return }
    if (!hayPesos) { setPonderarManual(false); return }
    if (!quitarPesosConfirm) { setQuitarPesosConfirm(true); return }
    setQuitarPesosConfirm(false)
    const previas = columnas
    const aRestablecer = columnas.filter(c => pesoDe(c) !== PESO_POR_DEFECTO)
    setColumnas(cs => cs.map(c => ({ ...c, peso: PESO_POR_DEFECTO })))
    try {
      await Promise.all(aRestablecer.map(c => setColumnPeso(classId, c.id, PESO_POR_DEFECTO)))
      setPonderarManual(false)
    } catch {
      setColumnas(previas)
      setError(tr({ es: 'No se pudieron quitar los pesos.', en: 'Could not remove the weights.', ca: 'No s\'han pogut treure els pesos.' }))
    }
  }

  async function traerTarea(nombre, values) {
    const id = await crearColumnaConNotas(classId, nombre, nuevoTrimestre, values)
    setColumnas(cs => [...cs, { id, name: nombre, trimestre: nuevoTrimestre, values }])
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

  const columnasFiltradas = filtro === 'todas' ? columnas : columnas.filter(c => c.trimestre === filtro)

  // Se mira sobre TODAS las columnas, no sobre las del trimestre visible: un
  // peso puesto en el primer trimestre sigue siendo un peso, y el botón no
  // puede aparecer apagado mientras exista.
  const hayPesos = columnas.some(c => pesoDe(c) !== PESO_POR_DEFECTO)
  const ponderando = ponderarManual || hayPesos

  return (
    <div>
      {columnas.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {[{ id: 'todas', label: { es: 'Todas', en: 'All', ca: 'Totes' } }, ...TRIMESTRES].map(t => (
            <button key={t.id} type="button" onClick={() => setFiltro(t.id)}
              className={`text-[12px] font-bold px-2.5 py-1.5 rounded-lg border transition-colors ${
                filtro === t.id ? 'bg-white/15 border-white/25 text-white' : 'border-white/10 text-white/40 hover:text-white/70'
              }`}>
              {tr(t.label)}
            </button>
          ))}
          <button type="button" onClick={alternarPonderacion}
            title={tr({
              es: 'Dar un peso distinto a cada columna en la media',
              en: 'Give each column a different weight in the average',
              ca: 'Donar un pes diferent a cada columna a la mitjana',
            })}
            className={`ml-auto text-[12px] font-bold px-2.5 py-1.5 rounded-lg border transition-colors ${
              quitarPesosConfirm
                ? 'border-red-400/40 text-red-300 bg-red-500/10'
                : ponderando ? 'bg-white/15 border-white/25 text-white' : 'border-white/10 text-white/40 hover:text-white/70'
            }`}>
            ⚖️ {quitarPesosConfirm
              ? tr({ es: '¿Quitar pesos?', en: 'Remove weights?', ca: 'Treure pesos?' })
              : tr({ es: 'Ponderar', en: 'Weighting', ca: 'Ponderar' })}
          </button>
          <button type="button" onClick={() => setEnPapel(true)}
            className="text-[12px] font-bold px-2.5 py-1.5 rounded-lg border border-teal-500/30 text-teal-300 hover:bg-teal-500/10 transition-colors">
            🖨️ {tr({ es: 'En papel', en: 'On paper', ca: 'En paper' })}
          </button>
        </div>
      )}

      {error && <p className="text-red-400 text-[12.5px] mb-3">{error}</p>}

      {columnasFiltradas.length === 0 ? (
        <p className="text-white/30 text-sm mb-4">
          {columnas.length === 0
            ? tr({
              es: 'Todavía no hay ninguna evaluación. Añade la primera columna abajo.',
              en: 'No assessment yet. Add the first column below.',
              ca: 'Encara no hi ha cap avaluació. Afegeix la primera columna a sota.',
            })
            : tr({
              es: 'Ninguna evaluación en este trimestre todavía.',
              en: 'No assessments in this term yet.',
              ca: 'Cap avaluació en aquest trimestre encara.',
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
                {columnasFiltradas.map(col => (
                  <th key={col.id} className="px-1.5 pb-2 min-w-[92px]">
                    <div className="flex items-center justify-center gap-1">
                      {col.trimestre && filtro === 'todas' && (
                        <span className="shrink-0 text-white/25 text-[9.5px] font-bold">{col.trimestre}º</span>
                      )}
                      <span className="text-white text-[12px] font-bold truncate max-w-[100px]" title={col.name}>{col.name}</span>
                      <button type="button" onClick={() => borrarColumna(col.id)}
                        title={tr({ es: 'Borrar columna', en: 'Delete column', ca: 'Esborrar columna' })}
                        className={`shrink-0 text-[11px] px-1 rounded transition-colors ${
                          borrarConfirm === col.id ? 'text-red-300 bg-red-500/20 font-bold' : 'text-white/20 hover:text-red-400'
                        }`}>
                        {borrarConfirm === col.id ? tr({ es: '¿Sí?', en: 'Sure?', ca: 'Sí?' }) : '✕'}
                      </button>
                    </div>
                    {ponderando && (
                      <PesoCelda columna={col} columnas={columnasFiltradas} tr={tr}
                        onGuardar={peso => guardarPeso(col.id, peso)} />
                    )}
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
                  {columnasFiltradas.map(col => (
                    <td key={col.id} className="text-center py-1.5 px-1.5">
                      <Celda valor={notaValida(col.values?.[s.uid]) ? col.values[s.uid] : null}
                        onGuardar={valor => guardarNota(col.id, s.uid, valor)} />
                    </td>
                  ))}
                  <td className="text-center py-1.5 px-1.5 text-[13px] font-bold">
                    <Media valor={promedioAlumno(columnasFiltradas, s.uid)} />
                  </td>
                </tr>
              ))}
              <tr className="border-t border-white/10">
                <td className="text-white/35 text-[10.5px] uppercase tracking-wider font-bold py-2 px-1 sticky left-0 bg-[rgba(13,15,22,.94)]">
                  {tr({ es: 'Media', en: 'Average', ca: 'Mitjana' })}
                </td>
                {columnasFiltradas.map(col => (
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

      {traendo && (
        <TraerTarea classId={classId} lang={lang} tr={tr} trimestre={nuevoTrimestre}
          onCreada={traerTarea} onCerrar={() => setTraendo(false)} />
      )}

      <form onSubmit={anadirColumna} className="flex items-center gap-2 flex-wrap">
        <input value={nuevaCol} onChange={e => setNuevaCol(e.target.value)} maxLength={80}
          placeholder={tr({ es: 'Nombre de la evaluación (p.ej. Examen tema 3)', en: 'Assessment name (e.g. Unit 3 test)', ca: "Nom de l'avaluació (p.ex. Examen tema 3)" })}
          className="flex-1 min-w-[160px] bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-[13px] placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-teal-400" />
        <select value={nuevoTrimestre} onChange={e => setNuevoTrimestre(e.target.value)}
          className="shrink-0 bg-black/30 border border-white/10 rounded-lg px-2 py-2 text-white/70 text-[12.5px] outline-none focus:border-teal-500 transition-colors">
          {TRIMESTRES.map(t => (
            <option key={t.id} value={t.id} className="bg-[#0d0d1a]">{tr(t.label)}</option>
          ))}
        </select>
        <button type="button" onClick={() => setTraendo(t => !t)}
          className="shrink-0 text-[12.5px] font-bold px-3 py-2 rounded-lg border border-teal-500/30 text-teal-300 hover:bg-teal-500/10 transition-colors">
          ↓ {tr({ es: 'Traer tarea', en: 'Bring task', ca: 'Portar tasca' })}
        </button>
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

      {enPapel && (
        <VisorHoja onClose={() => setEnPapel(false)} tr={tr} ancho="max-w-5xl">
          <HojaNotas
            clase={claseName}
            alumnos={students}
            columnas={columnasFiltradas}
            periodo={filtro === 'todas'
              ? tr({ es: 'Todas las evaluaciones', en: 'All assessments', ca: 'Totes les avaluacions' })
              : tr(TRIMESTRES.find(t => t.id === filtro)?.label ?? {})}
            lang={lang}
            tr={tr}
          />
        </VisorHoja>
      )}
    </div>
  )
}
