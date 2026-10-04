// Asignar un examen de la biblioteca a una clase: elegir la clase, toda la
// clase o algunos alumnos, y la fecha. Crea la tarea con una copia del examen
// (asignarExamen en lib/examenesProfesor.js).
import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useLang } from '../../context/LangContext'
import { getTeacherClasses, getClassWithStudents } from '../../lib/classes'
import { asignarExamen } from '../../lib/examenesProfesor'
import { desdeDiaISO } from '../../lib/attendance'

export default function AsignarExamen({ uid, examen, onCerrar, onHecho }) {
  const { tr, localPath } = useLang()
  const [clases, setClases] = useState(null)
  const [classId, setClassId] = useState('')
  const [alumnos, setAlumnos] = useState([])
  const [todos, setTodos] = useState(true)
  const [elegidos, setElegidos] = useState([])
  const [fecha, setFecha] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const [hecho, setHecho] = useState(null)

  useEffect(() => { getTeacherClasses(uid).then(setClases).catch(() => setClases([])) }, [uid])

  useEffect(() => {
    setAlumnos([]); setElegidos([])
    if (!classId) return
    getClassWithStudents(classId).then(async c => {
      const lista = await Promise.all((c?.studentIds ?? []).map(async id => {
        const s = await getDoc(doc(db, 'users', id)).catch(() => null)
        const d = s?.exists() ? s.data() : {}
        return { uid: id, name: d.name || d.email || id }
      }))
      setAlumnos(lista.sort((a, b) => a.name.localeCompare(b.name)))
    }).catch(() => setAlumnos([]))
  }, [classId])

  const clase = clases?.find(c => c.id === classId)
  const destinatarios = todos ? alumnos.map(a => a.uid) : elegidos

  async function asignar() {
    if (!clase || !destinatarios.length) return
    setEnviando(true); setError('')
    try {
      await asignarExamen(uid, { classId, className: clase.name }, examen, { studentIds: destinatarios, dueDate: fecha ? desdeDiaISO(fecha) : null })
      setHecho(clase)
      onHecho?.()
    } catch {
      setError(tr({ es: 'No se pudo asignar. Inténtalo de nuevo.', en: 'Could not assign it. Please try again.', ca: 'No s’ha pogut assignar. Torna-ho a intentar.' }))
    }
    setEnviando(false)
  }

  const campo = 'w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-teal-500'
  return createPortal(
    <div className="fixed inset-0 z-[70] bg-black/70 flex items-center justify-center p-4" onClick={onCerrar}>
      <div className="w-full max-w-md rounded-2xl bg-[#141b2e] border border-white/10 p-5 space-y-3" onClick={e => e.stopPropagation()}>
        <h2 className="text-white font-black text-lg">{tr({ es: 'Asignar a una clase', en: 'Assign to a class', ca: 'Assignar a una classe' })}</h2>
        <p className="text-white/50 text-[13px]">«{examen.titulo}»</p>
        {hecho ? (
          <>
            <p className="text-green-400 font-bold">✓ {tr({ es: `Asignado a ${hecho.name}.`, en: `Assigned to ${hecho.name}.`, ca: `Assignat a ${hecho.name}.` })}</p>
            <p className="text-white/50 text-[12.5px]">{tr({ es: 'Lo verás en la pestaña Deberes de la clase, con las respuestas de cada alumno para corregir.', en: 'You will find it in the class Tasks tab, with each student’s answers to mark.', ca: 'El veuràs a la pestanya Deures de la classe, amb les respostes de cada alumne per corregir.' })}</p>
            <div className="flex gap-2">
              <a href={localPath(`/profesor/clase/${hecho.id}`)} className="flex-1 text-center py-2.5 rounded-xl bg-teal-600 text-white font-bold text-sm">{tr({ es: 'Ir a la clase', en: 'Go to the class', ca: 'Anar a la classe' })}</a>
              <button type="button" onClick={onCerrar} className="flex-1 py-2.5 rounded-xl border border-white/15 text-white/70 font-bold text-sm">{tr({ es: 'Cerrar', en: 'Close', ca: 'Tancar' })}</button>
            </div>
          </>
        ) : (
          <>
            <select value={classId} onChange={e => setClassId(e.target.value)} className={campo}>
              <option value="" className="bg-[#0d0d1a]">{clases === null ? '…' : tr({ es: '-- Elige la clase --', en: '-- Pick the class --', ca: '-- Tria la classe --' })}</option>
              {(clases ?? []).map(c => <option key={c.id} value={c.id} className="bg-[#0d0d1a]">{c.name}</option>)}
            </select>
            {classId && (
              <>
                <div className="flex gap-2">
                  {[[true, { es: 'Toda la clase', en: 'Whole class', ca: 'Tota la classe' }], [false, { es: 'Alumnos concretos', en: 'Specific students', ca: 'Alumnes concrets' }]].map(([v, l]) => (
                    <button key={String(v)} type="button" onClick={() => setTodos(v)} className={`flex-1 text-xs font-bold py-2 rounded-lg border ${todos === v ? 'bg-violet-600 border-violet-600 text-white' : 'border-white/10 text-white/50'}`}>{tr(l)}</button>
                  ))}
                </div>
                {!todos && (
                  <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
                    {alumnos.map(a => {
                      const on = elegidos.includes(a.uid)
                      return <button key={a.uid} type="button" onClick={() => setElegidos(es => (on ? es.filter(x => x !== a.uid) : [...es, a.uid]))}
                        className={`text-[12px] px-2.5 py-1 rounded-full border ${on ? 'bg-violet-600 border-violet-600 text-white' : 'border-white/15 text-white/60'}`}>{a.name}</button>
                    })}
                  </div>
                )}
                {alumnos.length === 0 && <p className="text-amber-300/80 text-[12px]">{tr({ es: 'Esta clase aún no tiene alumnos.', en: 'This class has no students yet.', ca: 'Aquesta classe encara no té alumnes.' })}</p>}
                <label className="block text-white/50 text-[12px]">{tr({ es: 'Fecha de entrega (opcional)', en: 'Due date (optional)', ca: 'Data de lliurament (opcional)' })}
                  <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} className={`${campo} mt-1`} />
                </label>
              </>
            )}
            {error && <p className="text-red-400 text-[12.5px]">{error}</p>}
            <div className="flex gap-2 pt-1">
              <button type="button" onClick={onCerrar} className="flex-1 py-2.5 rounded-xl border border-white/15 text-white/70 font-bold text-sm">{tr({ es: 'Cancelar', en: 'Cancel', ca: 'Cancel·lar' })}</button>
              <button type="button" onClick={asignar} disabled={enviando || !destinatarios.length}
                className="flex-1 py-2.5 rounded-xl bg-[#EDAE49] text-black font-black text-sm disabled:opacity-40">
                {enviando ? '…' : tr({ es: 'Asignar', en: 'Assign', ca: 'Assignar' })}
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  )
}
