// Versión en papel de un examen de la biblioteca (/profesor/examenes/:id/imprimir).
// Hoja blanca con cabecera (nombre, curso, fecha, nota), las preguntas con sus
// puntos e imágenes y el espacio de respuesta de cada tipo. «Con soluciones»
// marca las correctas y los criterios: la plantilla para corregir.
// Imprime solo la hoja gracias a .imprimir-solo-esto (index.css).
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { getExamen } from '../lib/examenesProfesor'
import { puntosTotales, textoSolucion } from '../lib/examenModelo'
import ImagenExamen from '../components/examenes/ImagenExamen'
import SEOHead from '../components/SEOHead'

const letra = i => String.fromCharCode(97 + i)

function Lineas({ n, cuadricula }) {
  if (cuadricula) {
    return <div className="mt-2 border border-slate-300" style={{ height: `${n * 9}mm`, backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '5mm 5mm' }} />
  }
  return <div className="mt-2">{Array.from({ length: n }, (_, i) => <div key={i} className="border-b border-slate-400" style={{ height: '9mm' }} />)}</div>
}

export default function ImprimirExamen() {
  const { examId } = useParams()
  const { user } = useAuth()
  const { tr, localPath } = useLang()
  const navigate = useNavigate()
  const [ex, setEx] = useState(null)
  const [soluciones, setSoluciones] = useState(false)
  const [cuadricula, setCuadricula] = useState(false)

  useEffect(() => {
    if (user === undefined) return
    if (!user) { navigate(localPath('/profesores'), { replace: true }); return }
    getExamen(examId).then(e => {
      if (!e || e.teacherId !== user.uid) navigate(localPath('/profesor?tab=examenes'), { replace: true })
      else setEx(e)
    }).catch(() => navigate(localPath('/profesor?tab=examenes'), { replace: true }))
  }, [user, examId]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!ex) return <div className="min-h-[60vh] grid place-items-center text-white/30 text-sm">{tr({ es: 'Cargando…', en: 'Loading…', ca: 'Carregant…' })}</div>

  const casilla = (marcada, redonda) => (
    <span className={`inline-block w-3.5 h-3.5 border-2 border-slate-700 align-middle mr-2 ${redonda ? 'rounded-full' : 'rounded-sm'} ${marcada ? 'bg-slate-800' : ''}`} />
  )
  const opcion = 'text-[13px] font-semibold px-3 py-1.5 rounded-lg border transition-colors'

  return (
    <div className="relative z-10 px-3 sm:px-6 py-6">
      <SEOHead title={tr({ es: 'Imprimir examen', en: 'Print exam', ca: 'Imprimir examen' })} path="/profesor" noindex />
      <div className="no-imprimir max-w-[210mm] mx-auto flex flex-wrap items-center gap-2 mb-4">
        <button type="button" onClick={() => navigate(localPath(`/profesor/examenes/${examId}`))} className="text-white/50 hover:text-white text-sm mr-2">← {tr({ es: 'Editor', en: 'Editor', ca: 'Editor' })}</button>
        <button type="button" onClick={() => setSoluciones(s => !s)} className={`${opcion} ${soluciones ? 'bg-teal-600 border-teal-600 text-white' : 'border-white/15 text-white/70'}`}>✓ {tr({ es: 'Con soluciones', en: 'With answers', ca: 'Amb solucions' })}</button>
        <button type="button" onClick={() => setCuadricula(c => !c)} className={`${opcion} ${cuadricula ? 'bg-teal-600 border-teal-600 text-white' : 'border-white/15 text-white/70'}`}>▦ {tr({ es: 'Cuadrícula para desarrollar', en: 'Grid for working', ca: 'Quadrícula per desenvolupar' })}</button>
        <span className="flex-1" />
        <button type="button" onClick={() => window.print()} className="px-4 py-2 rounded-xl bg-[#EDAE49] text-black font-black text-sm">🖨 {tr({ es: 'Imprimir / PDF', en: 'Print / PDF', ca: 'Imprimir / PDF' })}</button>
      </div>

      <div className="imprimir-solo-esto max-w-[210mm] mx-auto bg-white text-slate-900 rounded-2xl p-8 print:rounded-none print:p-0">
        <div className="border-b-2 border-slate-800 pb-3 mb-4">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h1 className="text-xl font-black leading-tight">{ex.titulo}{soluciones ? ` — ${tr({ es: 'SOLUCIONES', en: 'ANSWERS', ca: 'SOLUCIONS' })}` : ''}</h1>
              <p className="text-[12px] text-slate-600 mt-0.5">{[ex.materia, ex.curso, ex.cursoEscolar].filter(Boolean).join(' · ')}</p>
            </div>
            <div className="shrink-0 border-2 border-slate-800 rounded-lg px-3 py-1 text-center">
              <p className="text-[10px] font-bold uppercase text-slate-600">{tr({ es: 'Nota', en: 'Mark', ca: 'Nota' })}</p>
              <p className="text-lg font-black w-14">&nbsp;</p>
            </div>
          </div>
          {!soluciones && (
            <div className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 mt-3 text-[12.5px]">
              <p>{tr({ es: 'Nombre', en: 'Name', ca: 'Nom' })}: <span className="inline-block border-b border-slate-500 w-[85%]">&nbsp;</span></p>
              <p>{tr({ es: 'Fecha', en: 'Date', ca: 'Data' })}: <span className="inline-block border-b border-slate-500 w-24">&nbsp;</span></p>
            </div>
          )}
          <p className="text-[11.5px] text-slate-600 mt-2">{ex.preguntas.length} {tr({ es: 'preguntas', en: 'questions', ca: 'preguntes' })} · {puntosTotales(ex.preguntas)} {tr({ es: 'puntos', en: 'points', ca: 'punts' })}</p>
          {ex.instrucciones && <p className="text-[12.5px] mt-2 whitespace-pre-wrap">{ex.instrucciones}</p>}
        </div>

        <ol className="space-y-5">
          {ex.preguntas.map((p, i) => (
            <li key={p.id} style={{ breakInside: 'avoid' }}>
              <div className="flex justify-between gap-3">
                <p className="text-[13.5px] font-semibold whitespace-pre-wrap"><span className="font-black">{i + 1}.</span> {p.enunciado}</p>
                <span className="shrink-0 text-[11.5px] text-slate-600">({p.puntos} {tr({ es: 'pt', en: 'pt', ca: 'pt' })})</span>
              </div>
              {p.imagen && <ImagenExamen imagen={p.imagen} claro className="mt-2 max-w-[120mm]" />}

              {(p.tipo === 'test' || p.tipo === 'multiple') && (
                <div className="mt-2 space-y-1.5 pl-4">
                  {p.tipo === 'multiple' && <p className="text-[11px] text-slate-500 italic">{tr({ es: 'Puede haber varias correctas.', en: 'There may be several correct answers.', ca: 'Hi pot haver diverses correctes.' })}</p>}
                  {p.opciones.map((o, j) => (
                    <p key={j} className={`text-[13px] ${soluciones && p.correctas.includes(j) ? 'font-bold' : ''}`}>
                      {casilla(soluciones && p.correctas.includes(j), p.tipo === 'test')}{letra(j)}) {o}
                    </p>
                  ))}
                </div>
              )}
              {p.tipo === 'vf' && (
                <p className="mt-2 pl-4 text-[13px]">
                  {casilla(soluciones && p.correcta, true)}{tr({ es: 'Verdadero', en: 'True', ca: 'Vertader' })}
                  <span className="inline-block w-8" />
                  {casilla(soluciones && !p.correcta, true)}{tr({ es: 'Falso', en: 'False', ca: 'Fals' })}
                </p>
              )}
              {p.tipo === 'numerica' && (
                <>
                  {!soluciones && <Lineas n={3} cuadricula={cuadricula} />}
                  <p className="mt-2 pl-4 text-[13px]">{tr({ es: 'Resultado', en: 'Result', ca: 'Resultat' })}: {soluciones ? <b>{textoSolucion(p, tr)}</b> : <span className="inline-block border-b border-slate-500 w-40">&nbsp;</span>} {!soluciones && p.unidad}</p>
                </>
              )}
              {p.tipo === 'corta' && (
                <p className="mt-2 pl-4 text-[13px]">{soluciones ? <b>{textoSolucion(p, tr)}</b> : <span className="inline-block border-b border-slate-500 w-[70%]">&nbsp;</span>}</p>
              )}
              {p.tipo === 'desarrollo' && (soluciones
                ? <p className="mt-2 pl-4 text-[12.5px] whitespace-pre-wrap"><b>{tr({ es: 'Criterios', en: 'Marking criteria', ca: 'Criteris' })}:</b> {p.criterios || '—'}</p>
                : <Lineas n={p.lineas || 6} cuadricula={cuadricula} />)}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
