// Editor de un examen de la biblioteca del profesor (/profesor/examenes/:id,
// 'nuevo' para crear). Preguntas de seis tipos con imagen (foto o dibujo),
// vista previa como la verá el alumno, guardar, imprimir y asignar.
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { getTeacherProfile, hasTeacherAccess } from '../lib/classes'
import { getExamen, crearExamen, guardarExamen } from '../lib/examenesProfesor'
import {
  TIPOS, MAX_PREGUNTAS, examenNuevo, preguntaNueva, nuevoId, problemas, problemasExamen,
  puntosTotales, cursoEscolarActual,
} from '../lib/examenModelo'
import PreguntaEditor, { NOMBRE_TIPO } from '../components/examenes/PreguntaEditor'
import PreguntaAlumno from '../components/examenes/PreguntaAlumno'
import AsignarExamen from '../components/examenes/AsignarExamen'
import SEOHead from '../components/SEOHead'

const campo = 'w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-teal-500 transition-colors'
const ICONO_TIPO = { test: '🔘', multiple: '☑️', vf: '✔️', numerica: '🔢', corta: '✍️', desarrollo: '📝' }

function cursosEscolares() {
  const actual = +cursoEscolarActual().slice(0, 4)
  return [-2, -1, 0, 1, 2].map(d => `${actual + d}-${actual + d + 1}`)
}

export default function EditorExamen() {
  const { examId } = useParams()
  const { user } = useAuth()
  const { tr, localPath } = useLang()
  const navigate = useNavigate()

  const [examen, setExamen] = useState(null)
  const [id, setId] = useState(examId === 'nuevo' ? null : examId)
  const [sucio, setSucio] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const [vista, setVista] = useState('editar') // 'editar' | 'previa'
  const [intentoGuardar, setIntentoGuardar] = useState(false)
  const [asignando, setAsignando] = useState(false)

  useEffect(() => {
    if (user === undefined) return
    if (!user) { navigate(localPath('/profesores'), { replace: true }); return }
    ;(async () => {
      try {
        const perfil = await getTeacherProfile(user.uid)
        if (!hasTeacherAccess(perfil)) { navigate(localPath('/profesores'), { replace: true }); return }
        if (examId === 'nuevo') { setExamen(examenNuevo()); return }
        const ex = await getExamen(examId)
        if (!ex || ex.teacherId !== user.uid) { navigate(localPath('/profesor?tab=examenes'), { replace: true }); return }
        setExamen(ex)
      } catch {
        setError(tr({ es: 'No se pudo cargar el examen.', en: 'Could not load the exam.', ca: 'No s’ha pogut carregar l’examen.' }))
      }
    })()
  }, [user, examId]) // eslint-disable-line react-hooks/exhaustive-deps

  // Aviso al salir con cambios sin guardar
  useEffect(() => {
    if (!sucio) return
    const h = e => { e.preventDefault(); e.returnValue = '' }
    window.addEventListener('beforeunload', h)
    return () => window.removeEventListener('beforeunload', h)
  }, [sucio])

  const cambiar = cambios => { setExamen(ex => ({ ...ex, ...cambios })); setSucio(true); setMensaje('') }
  const cambiarPreguntas = fn => cambiar({ preguntas: fn(examen.preguntas) })

  const total = useMemo(() => (examen ? puntosTotales(examen.preguntas) : 0), [examen])
  const errores = examen ? [...problemasExamen(examen), ...examen.preguntas.flatMap((p, i) => problemas(p).map(() => i))] : []
  const valido = examen && errores.length === 0

  async function guardar() {
    setIntentoGuardar(true)
    if (!valido) { setError(tr({ es: 'Revisa lo marcado en amarillo antes de guardar.', en: 'Check what is marked in yellow before saving.', ca: 'Revisa el que està marcat en groc abans de desar.' })); return }
    setGuardando(true); setError('')
    try {
      if (id) await guardarExamen(id, examen)
      else {
        const nuevo = await crearExamen(user.uid, examen)
        setId(nuevo)
        navigate(localPath(`/profesor/examenes/${nuevo}`), { replace: true })
      }
      setSucio(false)
      setMensaje(tr({ es: 'Guardado ✓', en: 'Saved ✓', ca: 'Desat ✓' }))
    } catch {
      setError(tr({ es: 'No se pudo guardar. Inténtalo de nuevo.', en: 'Could not save. Please try again.', ca: 'No s’ha pogut desar. Torna-ho a intentar.' }))
    }
    setGuardando(false)
  }

  if (error && !examen) return <div className="min-h-[60vh] grid place-items-center text-white/50 text-sm">{error}</div>
  if (!examen) return <div className="min-h-[60vh] grid place-items-center text-white/30 text-sm">{tr({ es: 'Cargando…', en: 'Loading…', ca: 'Carregant…' })}</div>

  const preguntas = examen.preguntas
  const botonArriba = 'text-[12.5px] font-bold px-3 py-1.5 rounded-lg border border-white/15 text-white/70 hover:bg-white/5 transition-colors disabled:opacity-40'

  return (
    <div className="relative z-10 min-h-[calc(100vh-4rem)] px-3 sm:px-6 py-6 pb-28">
      <SEOHead title={tr({ es: 'Editor de exámenes', en: 'Exam editor', ca: 'Editor d’exàmens' })} path="/profesor" noindex />
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button type="button" onClick={() => navigate(localPath('/profesor?tab=examenes'))} className="text-white/50 hover:text-white text-sm">← {tr({ es: 'Mis exámenes', en: 'My exams', ca: 'Els meus exàmens' })}</button>
          <span className="flex-1" />
          <button type="button" onClick={() => setVista(v => (v === 'editar' ? 'previa' : 'editar'))} className={botonArriba}>
            {vista === 'editar' ? `👁 ${tr({ es: 'Vista del alumno', en: 'Student view', ca: 'Vista de l’alumne' })}` : `✏️ ${tr({ es: 'Volver a editar', en: 'Back to editing', ca: 'Tornar a editar' })}`}
          </button>
          <button type="button" disabled={!id || sucio} onClick={() => window.open(localPath(`/profesor/examenes/${id}/imprimir`), '_blank')} className={botonArriba}
            title={sucio ? tr({ es: 'Guarda antes de imprimir', en: 'Save before printing', ca: 'Desa abans d’imprimir' }) : ''}>🖨 {tr({ es: 'Imprimir', en: 'Print', ca: 'Imprimir' })}</button>
          <button type="button" disabled={!id || sucio || !valido} onClick={() => setAsignando(true)} className={botonArriba}>📤 {tr({ es: 'Asignar a una clase', en: 'Assign to a class', ca: 'Assignar a una classe' })}</button>
        </div>

        {vista === 'editar' ? (
          <>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-3 mb-4">
              <input value={examen.titulo} maxLength={120} onChange={e => cambiar({ titulo: e.target.value })}
                placeholder={tr({ es: 'Título del examen (ej. Examen tema 3: Fracciones)', en: 'Exam title (e.g. Unit 3 test: Fractions)', ca: 'Títol de l’examen (ex. Examen tema 3: Fraccions)' })}
                className={`${campo} text-base font-bold ${intentoGuardar && !examen.titulo.trim() ? 'border-amber-500/60' : ''}`} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input value={examen.materia} maxLength={60} onChange={e => cambiar({ materia: e.target.value })} placeholder={tr({ es: 'Materia', en: 'Subject', ca: 'Matèria' })} className={campo} />
                <input value={examen.curso} maxLength={60} onChange={e => cambiar({ curso: e.target.value })} placeholder={tr({ es: 'Curso (ej. 2º ESO)', en: 'Year group (e.g. Year 8)', ca: 'Curs (ex. 2n ESO)' })} className={campo} />
                <select value={examen.cursoEscolar} onChange={e => cambiar({ cursoEscolar: e.target.value })} className={campo}>
                  {[...new Set([...cursosEscolares(), examen.cursoEscolar])].sort().map(c => <option key={c} value={c} className="bg-[#0d0d1a]">{tr({ es: 'Curso', en: 'School year', ca: 'Curs' })} {c}</option>)}
                </select>
              </div>
              <textarea value={examen.instrucciones} maxLength={1500} rows={2} onChange={e => cambiar({ instrucciones: e.target.value })}
                placeholder={tr({ es: 'Instrucciones para el alumno (opcional): material permitido, cómo puntúa…', en: 'Instructions for students (optional): allowed materials, how it is marked…', ca: 'Instruccions per a l’alumne (opcional): material permès, com puntua…' })}
                className={`${campo} resize-y`} />
            </div>

            <div className="space-y-3">
              {preguntas.map((p, i) => (
                <PreguntaEditor key={p.id} p={p} n={i + 1} total={preguntas.length} uid={user.uid} mostrarAvisos={intentoGuardar}
                  onChange={np => cambiarPreguntas(ps => ps.map(x => (x.id === p.id ? np : x)))}
                  onMover={d => cambiarPreguntas(ps => { const a = [...ps]; const j = i + d; [a[i], a[j]] = [a[j], a[i]]; return a })}
                  onDuplicar={() => cambiarPreguntas(ps => [...ps.slice(0, i + 1), { ...structuredClone(p), id: nuevoId() }, ...ps.slice(i + 1)])}
                  onQuitar={() => cambiarPreguntas(ps => ps.filter(x => x.id !== p.id))} />
              ))}
            </div>

            {preguntas.length < MAX_PREGUNTAS && (
              <div className="mt-4 rounded-2xl border border-dashed border-white/15 p-3">
                <p className="text-white/40 text-[12px] font-bold mb-2">+ {tr({ es: 'Añadir pregunta', en: 'Add a question', ca: 'Afegir pregunta' })}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TIPOS.map(t => (
                    <button key={t} type="button" onClick={() => cambiarPreguntas(ps => [...ps, preguntaNueva(t)])}
                      className="text-left text-[12.5px] font-semibold px-3 py-2 rounded-xl border border-white/10 text-white/75 hover:bg-white/5">
                      {ICONO_TIPO[t]} {tr(NOMBRE_TIPO[t])}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <div>
              <h1 className="text-white font-black text-xl">{examen.titulo || '—'}</h1>
              <p className="text-white/40 text-sm">{[examen.materia, examen.curso].filter(Boolean).join(' · ')} · {preguntas.length} {tr({ es: 'preguntas', en: 'questions', ca: 'preguntes' })} · {total} pt</p>
              {examen.instrucciones && <p className="text-white/60 text-[13px] mt-2 whitespace-pre-wrap">{examen.instrucciones}</p>}
            </div>
            {preguntas.map((p, i) => <PreguntaAlumno key={p.id} p={p} n={i + 1} solucion />)}
          </div>
        )}
      </div>

      {/* Barra fija: resumen y guardar */}
      <div className="fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-[#0b1020]/95 backdrop-blur px-3 py-2.5">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <p className="text-white/60 text-[12.5px] flex-1">
            {preguntas.length} {tr({ es: 'preguntas', en: 'questions', ca: 'preguntes' })} · <b className="text-white">{total} pt</b>
            <span className="hidden sm:inline text-white/35"> · {tr({ es: 'la nota se da sobre 10', en: 'the mark is given out of 10', ca: 'la nota es dona sobre 10' })}</span>
            {error && <span className="block text-red-400 text-[12px]">{error}</span>}
            {!error && (sucio ? <span className="block text-amber-300/80 text-[11.5px]">{tr({ es: 'Cambios sin guardar', en: 'Unsaved changes', ca: 'Canvis sense desar' })}</span> : mensaje && <span className="block text-green-400 text-[11.5px]">{mensaje}</span>)}
          </p>
          <button type="button" onClick={guardar} disabled={guardando}
            className="px-5 py-2.5 rounded-xl bg-[#EDAE49] text-black font-black text-sm hover:bg-amber-400 disabled:opacity-50">
            {guardando ? tr({ es: 'Guardando…', en: 'Saving…', ca: 'Desant…' }) : tr({ es: 'Guardar', en: 'Save', ca: 'Desar' })}
          </button>
        </div>
      </div>

      {asignando && <AsignarExamen uid={user.uid} examen={{ ...examen, id }} onCerrar={() => setAsignando(false)} />}
    </div>
  )
}
