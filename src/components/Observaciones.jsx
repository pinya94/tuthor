import { useEffect, useMemo, useState } from 'react'
import { TAGS, TAG_META, TEXTO_MAX, textoValido, porAlumno, masRecientes, getClassObservations, addObservation, deleteObservation } from '../lib/observations'

// El cuaderno de observaciones. Dos vistas sobre los mismos datos:
//   · "Recientes" — lo último de toda la clase, para abrir el módulo y ver de
//     un vistazo qué se ha anotado estos días, sin elegir alumno primero;
//   · un alumno elegido — su timeline completo, de más reciente a más
//     antigua, con el formulario para añadir justo encima.
// No hay edición: una nota mal escrita se borra y se rehace (ver
// src/lib/observations.js para el porqué).

function fechaLegible(createdAt, lang) {
  const d = createdAt?.toDate ? createdAt.toDate() : createdAt instanceof Date ? createdAt : null
  if (!d) return ''
  return d.toLocaleDateString(
    lang === 'en' ? 'en-GB' : lang === 'ca' ? 'ca-ES' : 'es-ES',
    { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' },
  )
}

function Nota({ o, nombre, lang, onBorrar }) {
  const m = TAG_META[o.tag] ?? TAG_META.neutra
  return (
    <div className={`rounded-xl border px-3 py-2.5 ${m.color}`}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-[13px] leading-snug whitespace-pre-wrap break-words flex-1">
          <span className="mr-1">{m.emoji}</span>{o.text}
        </p>
        <button type="button" onClick={() => onBorrar(o.id)}
          className="shrink-0 text-current opacity-40 hover:opacity-90 transition-opacity px-1">✕</button>
      </div>
      <p className="text-[10.5px] opacity-50 mt-1">
        {nombre ? `${nombre} · ` : ''}{fechaLegible(o.createdAt, lang)}
      </p>
    </div>
  )
}

function FormularioNota({ onGuardar, tr }) {
  const [texto, setTexto] = useState('')
  const [tag, setTag] = useState('neutra')
  const [guardando, setGuardando] = useState(false)

  async function enviar(e) {
    e.preventDefault()
    if (!textoValido(texto)) return
    setGuardando(true)
    const ok = await onGuardar(texto.trim(), tag)
    setGuardando(false)
    if (ok) { setTexto(''); setTag('neutra') }
  }

  return (
    <form onSubmit={enviar} className="mb-4">
      <textarea value={texto} onChange={e => setTexto(e.target.value)} maxLength={TEXTO_MAX} rows={2}
        placeholder={tr({ es: 'Escribe una anotación…', en: 'Write a note…', ca: 'Escriu una anotació…' })}
        className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white text-[13px] placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-teal-400 mb-2" />
      <div className="flex items-center gap-2">
        <div className="flex gap-1 p-1 bg-white/5 border border-white/10 rounded-lg">
          {TAGS.map(t => (
            <button key={t} type="button" onClick={() => setTag(t)}
              className={`px-2.5 py-1 rounded-md text-[12px] font-bold transition-colors ${
                tag === t ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white/70'
              }`}>
              {TAG_META[t].emoji} {tr(TAG_META[t].label)}
            </button>
          ))}
        </div>
        <button type="submit" disabled={guardando || !textoValido(texto)}
          className="ml-auto text-[12.5px] font-bold px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 disabled:opacity-30 text-white transition-colors">
          {tr({ es: 'Añadir', en: 'Add', ca: 'Afegir' })}
        </button>
      </div>
    </form>
  )
}

export default function Observaciones({ classId, students, lang, tr }) {
  const [observaciones, setObservaciones] = useState(null) // null = cargando
  const [error, setError] = useState('')
  const [alumnoAbierto, setAlumnoAbierto] = useState(null) // uid, o null = vista "recientes"

  useEffect(() => {
    getClassObservations(classId)
      .then(setObservaciones)
      .catch(() => {
        setError(tr({ es: 'No se pudo cargar el cuaderno.', en: 'Could not load the notebook.', ca: 'No s\'ha pogut carregar el quadern.' }))
        setObservaciones([])
      })
  }, [classId, tr])

  const porUid = useMemo(() => Object.fromEntries(students.map(s => [s.uid, s.name])), [students])
  const grupos = useMemo(() => (observaciones ? porAlumno(observaciones) : new Map()), [observaciones])
  const recientes = useMemo(() => (observaciones ? masRecientes(observaciones) : []), [observaciones])

  async function guardar(texto, tag) {
    if (!alumnoAbierto) return false
    setError('')
    try {
      const id = await addObservation(classId, alumnoAbierto, texto, tag)
      setObservaciones(os => [...os, { id, uid: alumnoAbierto, text: texto, tag, createdAt: new Date() }])
      return true
    } catch {
      setError(tr({ es: 'No se pudo guardar la anotación.', en: 'Could not save the note.', ca: 'No s\'ha pogut desar l\'anotació.' }))
      return false
    }
  }

  async function borrar(obsId) {
    const previas = observaciones
    setObservaciones(os => os.filter(o => o.id !== obsId))
    try {
      await deleteObservation(classId, obsId)
    } catch {
      setObservaciones(previas)
      setError(tr({ es: 'No se pudo borrar.', en: 'Could not delete.', ca: 'No s\'ha pogut esborrar.' }))
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

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        <button type="button" onClick={() => setAlumnoAbierto(null)}
          className={`text-[12.5px] font-semibold px-2.5 py-1.5 rounded-lg border transition-colors ${
            alumnoAbierto === null ? 'bg-teal-500 border-teal-400 text-black' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
          }`}>
          {tr({ es: 'Recientes', en: 'Recent', ca: 'Recents' })}
        </button>
        {students.map(s => (
          <button key={s.uid} type="button" onClick={() => setAlumnoAbierto(s.uid)}
            className={`text-[12.5px] font-semibold px-2.5 py-1.5 rounded-lg border transition-colors ${
              alumnoAbierto === s.uid ? 'bg-teal-500 border-teal-400 text-black' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
            }`}>
            {s.name}{grupos.has(s.uid) ? ` · ${grupos.get(s.uid).length}` : ''}
          </button>
        ))}
      </div>

      {error && <p className="text-red-400 text-[12.5px] mb-3">{error}</p>}

      {observaciones === null ? (
        <p className="text-white/30 text-sm">{tr({ es: 'Cargando…', en: 'Loading…', ca: 'Carregant…' })}</p>
      ) : alumnoAbierto === null ? (
        recientes.length === 0 ? (
          <p className="text-white/30 text-sm">
            {tr({ es: 'Todavía no hay ninguna anotación. Elige un alumno para empezar.', en: 'No notes yet. Pick a student to start.', ca: 'Encara no hi ha cap anotació. Tria un alumne per començar.' })}
          </p>
        ) : (
          <div className="space-y-2">
            {recientes.map(o => (
              <Nota key={o.id} o={o} nombre={porUid[o.uid] || o.uid} lang={lang} onBorrar={borrar} />
            ))}
          </div>
        )
      ) : (
        <>
          <FormularioNota onGuardar={guardar} tr={tr} />
          {!grupos.has(alumnoAbierto) ? (
            <p className="text-white/30 text-sm">
              {tr({ es: 'Sin anotaciones todavía para este alumno.', en: 'No notes yet for this student.', ca: 'Encara sense anotacions per a aquest alumne.' })}
            </p>
          ) : (
            <div className="space-y-2">
              {grupos.get(alumnoAbierto).map(o => (
                <Nota key={o.id} o={o} nombre={null} lang={lang} onBorrar={borrar} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
