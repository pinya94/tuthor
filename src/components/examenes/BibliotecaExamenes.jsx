// «Mis exámenes»: la biblioteca del profesor (pestaña del panel). Buscar,
// filtrar por curso escolar, editar, duplicar o copiar para el curso que
// viene, imprimir, asignar y borrar.
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../../context/LangContext'
import { listarExamenes, duplicarExamen, borrarExamen } from '../../lib/examenesProfesor'
import { puntosTotales, cursoSiguiente, esManual } from '../../lib/examenModelo'
import AsignarExamen from './AsignarExamen'

export default function BibliotecaExamenes({ uid }) {
  const { tr, localPath } = useLang()
  const navigate = useNavigate()
  const [examenes, setExamenes] = useState(null)
  const [busca, setBusca] = useState('')
  const [curso, setCurso] = useState('todos')
  const [asignar, setAsignar] = useState(null)
  const [error, setError] = useState('')
  const [ocupado, setOcupado] = useState(null)

  async function cargar() {
    try { setExamenes(await listarExamenes(uid)) } catch { setError(tr({ es: 'No se pudieron cargar tus exámenes.', en: 'Could not load your exams.', ca: 'No s’han pogut carregar els teus exàmens.' })); setExamenes([]) }
  }
  useEffect(() => { cargar() }, [uid]) // eslint-disable-line react-hooks/exhaustive-deps

  const cursos = useMemo(() => [...new Set((examenes ?? []).map(e => e.cursoEscolar).filter(Boolean))].sort().reverse(), [examenes])
  const lista = (examenes ?? []).filter(e =>
    (curso === 'todos' || e.cursoEscolar === curso) &&
    (!busca.trim() || `${e.titulo} ${e.materia} ${e.curso}`.toLowerCase().includes(busca.trim().toLowerCase())))

  async function duplicar(e, siguiente) {
    setOcupado(e.id)
    try {
      await duplicarExamen(uid, e, siguiente ? { siguienteCurso: true } : { sufijo: tr({ es: ' (copia)', en: ' (copy)', ca: ' (còpia)' }) })
      await cargar()
    } catch { setError(tr({ es: 'No se pudo copiar.', en: 'Could not copy it.', ca: 'No s’ha pogut copiar.' })) }
    setOcupado(null)
  }
  async function borrar(e) {
    if (!window.confirm(tr({ es: `¿Borrar «${e.titulo}» de tu biblioteca? Las tareas ya asignadas se conservan.`, en: `Delete «${e.titulo}» from your library? Tasks already assigned are kept.`, ca: `Esborrar «${e.titulo}» de la teva biblioteca? Les tasques ja assignades es conserven.` }))) return
    setOcupado(e.id)
    try { await borrarExamen(e.id); await cargar() } catch { setError(tr({ es: 'No se pudo borrar.', en: 'Could not delete it.', ca: 'No s’ha pogut esborrar.' })) }
    setOcupado(null)
  }

  const accion = 'text-[11.5px] font-bold px-2.5 py-1.5 rounded-lg border border-white/10 text-white/65 hover:bg-white/5 transition-colors disabled:opacity-40'

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3 mb-1">
        <h1 className="text-2xl font-black text-white">{tr({ es: 'Mis exámenes', en: 'My exams', ca: 'Els meus exàmens' })}</h1>
        <button type="button" onClick={() => navigate(localPath('/profesor/examenes/nuevo'))}
          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-xl">+ {tr({ es: 'Crear examen', en: 'Create exam', ca: 'Crear examen' })}</button>
      </div>
      <p className="text-white/50 text-sm mb-5 max-w-2xl">
        {tr({
          es: 'Se guardan aquí de un curso para otro. Preguntas tipo test, verdadero o falso, numéricas, de respuesta corta y de desarrollo (que corriges tú), con imágenes o dibujos. Asígnalos a una clase para hacerlos en Tuthor, o imprímelos.',
          en: 'They are kept here from one school year to the next. Multiple choice, true or false, numeric, short-answer and open questions (which you mark), with images or drawings. Assign them to a class to do in Tuthor, or print them.',
          ca: 'Es guarden aquí d’un curs per a l’altre. Preguntes tipus test, vertader o fals, numèriques, de resposta curta i de desenvolupament (que corregeixes tu), amb imatges o dibuixos. Assigna’ls a una classe per fer-los a Tuthor, o imprimeix-los.',
        })}
      </p>

      {(examenes?.length ?? 0) > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <input value={busca} onChange={e => setBusca(e.target.value)} placeholder={tr({ es: 'Buscar…', en: 'Search…', ca: 'Cercar…' })}
            className="flex-1 min-w-[160px] rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-teal-500" />
          <select value={curso} onChange={e => setCurso(e.target.value)} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none">
            <option value="todos" className="bg-[#0d0d1a]">{tr({ es: 'Todos los cursos', en: 'All school years', ca: 'Tots els cursos' })}</option>
            {cursos.map(c => <option key={c} value={c} className="bg-[#0d0d1a]">{c}</option>)}
          </select>
        </div>
      )}
      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

      {examenes === null ? <p className="text-white/30 text-sm">{tr({ es: 'Cargando…', en: 'Loading…', ca: 'Carregant…' })}</p>
        : examenes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center">
            <p className="text-white/50 text-sm mb-3">{tr({ es: 'Todavía no tienes exámenes guardados.', en: 'You have no saved exams yet.', ca: 'Encara no tens exàmens desats.' })}</p>
            <button type="button" onClick={() => navigate(localPath('/profesor/examenes/nuevo'))} className="px-4 py-2.5 bg-teal-600 text-white font-bold text-sm rounded-xl">+ {tr({ es: 'Crear el primero', en: 'Create your first', ca: 'Crear el primer' })}</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lista.map(e => {
              const manuales = e.preguntas.filter(esManual).length
              return (
                <div key={e.id} className="rounded-2xl bg-[#141b2e] border border-white/[0.08] p-4">
                  <button type="button" onClick={() => navigate(localPath(`/profesor/examenes/${e.id}`))} className="block text-left w-full">
                    <p className="text-white font-black leading-tight">{e.titulo}</p>
                    <p className="text-white/45 text-[12px] mt-1">
                      {[e.materia, e.curso, e.cursoEscolar].filter(Boolean).join(' · ')}
                    </p>
                    <p className="text-white/35 text-[12px] mt-0.5">
                      {e.preguntas.length} {tr({ es: 'preguntas', en: 'questions', ca: 'preguntes' })} · {puntosTotales(e.preguntas)} pt
                      {manuales > 0 && ` · ${manuales} ${tr({ es: 'de desarrollo', en: 'open', ca: 'de desenvolupament' })}`}
                    </p>
                  </button>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    <button type="button" className={accion} onClick={() => navigate(localPath(`/profesor/examenes/${e.id}`))}>✏️ {tr({ es: 'Editar', en: 'Edit', ca: 'Editar' })}</button>
                    <button type="button" className={accion} onClick={() => setAsignar(e)}>📤 {tr({ es: 'Asignar', en: 'Assign', ca: 'Assignar' })}</button>
                    <button type="button" className={accion} onClick={() => window.open(localPath(`/profesor/examenes/${e.id}/imprimir`), '_blank')}>🖨 {tr({ es: 'Imprimir', en: 'Print', ca: 'Imprimir' })}</button>
                    <button type="button" className={accion} disabled={ocupado === e.id} onClick={() => duplicar(e, true)} title={tr({ es: `Crea una copia para el curso ${cursoSiguiente(e.cursoEscolar)}`, en: `Make a copy for ${cursoSiguiente(e.cursoEscolar)}`, ca: `Crea una còpia per al curs ${cursoSiguiente(e.cursoEscolar)}` })}>
                      ⏭ {tr({ es: 'Copiar al curso siguiente', en: 'Copy to next year', ca: 'Copiar al curs següent' })}
                    </button>
                    <button type="button" className={accion} disabled={ocupado === e.id} onClick={() => duplicar(e, false)}>⧉ {tr({ es: 'Duplicar', en: 'Duplicate', ca: 'Duplicar' })}</button>
                    <button type="button" className={`${accion} hover:text-red-400`} disabled={ocupado === e.id} onClick={() => borrar(e)}>🗑</button>
                  </div>
                </div>
              )
            })}
            {lista.length === 0 && <p className="text-white/35 text-sm">{tr({ es: 'Ningún examen coincide.', en: 'No exams match.', ca: 'Cap examen coincideix.' })}</p>}
          </div>
        )}

      {asignar && <AsignarExamen uid={uid} examen={asignar} onCerrar={() => setAsignar(null)} />}
    </div>
  )
}
