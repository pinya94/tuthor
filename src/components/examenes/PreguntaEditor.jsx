// Editor de UNA pregunta de la biblioteca de exámenes. Controlado: recibe la
// pregunta y devuelve la pregunta cambiada (onChange). Las imágenes se suben
// o se dibujan aquí mismo y se guardan al momento (imagenesExamen).
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { TIPOS, MAX_OPCIONES, MIN_OPCIONES, cambiarTipo, problemas } from '../../lib/examenModelo'
import { guardarImagen } from '../../lib/examenesProfesor'
import { comprimirImagen } from '../../lib/imagenes'
import ImagenExamen from './ImagenExamen'
import Pizarra from './Pizarra'

export const NOMBRE_TIPO = {
  test: { es: 'Test (una correcta)', en: 'Multiple choice (one answer)', ca: 'Test (una correcta)' },
  multiple: { es: 'Test (varias correctas)', en: 'Multiple choice (several answers)', ca: 'Test (diverses correctes)' },
  vf: { es: 'Verdadero / Falso', en: 'True / False', ca: 'Vertader / Fals' },
  numerica: { es: 'Respuesta numérica', en: 'Numeric answer', ca: 'Resposta numèrica' },
  corta: { es: 'Respuesta corta', en: 'Short answer', ca: 'Resposta curta' },
  desarrollo: { es: 'Desarrollo (lo corriges tú)', en: 'Open answer (you mark it)', ca: 'Desenvolupament (el corregeixes tu)' },
}

const AVISOS = {
  enunciado: { es: 'Falta el enunciado (o una imagen).', en: 'The question needs text (or an image).', ca: 'Falta l’enunciat (o una imatge).' },
  enunciadoLargo: { es: 'El enunciado es demasiado largo.', en: 'The question text is too long.', ca: 'L’enunciat és massa llarg.' },
  puntos: { es: 'Los puntos tienen que ser mayores que 0.', en: 'Points must be more than 0.', ca: 'Els punts han de ser més grans que 0.' },
  numOpciones: { es: 'Entre 2 y 6 opciones.', en: 'Between 2 and 6 options.', ca: 'Entre 2 i 6 opcions.' },
  opcionVacia: { es: 'Hay una opción vacía.', en: 'One option is empty.', ca: 'Hi ha una opció buida.' },
  opcionLarga: { es: 'Una opción es demasiado larga.', en: 'One option is too long.', ca: 'Una opció és massa llarga.' },
  sinCorrecta: { es: 'Marca la respuesta correcta.', en: 'Mark the correct answer.', ca: 'Marca la resposta correcta.' },
  sinValor: { es: 'Falta el resultado correcto.', en: 'The correct result is missing.', ca: 'Falta el resultat correcte.' },
  tolerancia: { es: 'El margen no puede ser negativo.', en: 'The margin cannot be negative.', ca: 'El marge no pot ser negatiu.' },
  sinAceptadas: { es: 'Escribe al menos una respuesta aceptada.', en: 'Add at least one accepted answer.', ca: 'Escriu almenys una resposta acceptada.' },
}

const input = 'bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-[13px] placeholder:text-white/25 outline-none focus:border-teal-500 transition-colors'
const chico = 'text-[11.5px] font-bold px-2 py-1 rounded-lg border border-white/10 text-white/60 hover:bg-white/5 transition-colors disabled:opacity-30'

export default function PreguntaEditor({ p, n, total, uid, onChange, onMover, onDuplicar, onQuitar, mostrarAvisos }) {
  const { tr } = useLang()
  const [pizarra, setPizarra] = useState(false)
  const [subiendo, setSubiendo] = useState(false)
  const [errorImg, setErrorImg] = useState('')
  const set = cambios => onChange({ ...p, ...cambios })
  const avisos = mostrarAvisos ? problemas(p) : []

  async function guardarFuente(fuente, esDibujo) {
    setSubiendo(true); setErrorImg('')
    try {
      const img = await comprimirImagen(fuente, { esDibujo })
      set({ imagen: await guardarImagen(uid, img) })
      setPizarra(false)
    } catch {
      setErrorImg(tr({ es: 'No se pudo guardar la imagen. Prueba con otra más pequeña.', en: 'Could not save the image. Try a smaller one.', ca: 'No s’ha pogut desar la imatge. Prova’n una de més petita.' }))
    }
    setSubiendo(false)
  }

  const opciones = p.opciones ?? []
  const aceptadas = p.aceptadas ?? []

  return (
    <div className={`rounded-2xl border ${avisos.length ? 'border-amber-500/40' : 'border-white/10'} bg-black/20 p-3 sm:p-4 space-y-3`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-white/40 text-[12px] font-black w-7">#{n}</span>
        <select value={p.tipo} onChange={e => onChange(cambiarTipo(p, e.target.value))}
          className={`${input} flex-1 min-w-[180px]`}>
          {TIPOS.map(t => <option key={t} value={t} className="bg-[#0d0d1a]">{tr(NOMBRE_TIPO[t])}</option>)}
        </select>
        <label className="flex items-center gap-1 text-white/50 text-[12px]">
          <input type="number" min="0.25" max="100" step="0.25" value={p.puntos} onChange={e => set({ puntos: e.target.value })} className={`${input} w-16 text-center`} />
          {tr({ es: 'pt', en: 'pt', ca: 'pt' })}
        </label>
        <div className="flex gap-1">
          <button type="button" onClick={() => onMover(-1)} disabled={n === 1} className={chico} title={tr({ es: 'Subir', en: 'Move up', ca: 'Pujar' })}>↑</button>
          <button type="button" onClick={() => onMover(1)} disabled={n === total} className={chico} title={tr({ es: 'Bajar', en: 'Move down', ca: 'Baixar' })}>↓</button>
          <button type="button" onClick={onDuplicar} className={chico} title={tr({ es: 'Duplicar', en: 'Duplicate', ca: 'Duplicar' })}>⧉</button>
          <button type="button" onClick={onQuitar} disabled={total === 1} className={`${chico} hover:text-red-400`} title={tr({ es: 'Quitar', en: 'Remove', ca: 'Treure' })}>✕</button>
        </div>
      </div>

      <textarea value={p.enunciado} onChange={e => set({ enunciado: e.target.value })} rows={2} maxLength={2000}
        placeholder={tr({ es: 'Enunciado de la pregunta…', en: 'Question text…', ca: 'Enunciat de la pregunta…' })}
        className={`${input} w-full resize-y leading-relaxed`} />

      {/* Imagen: subir una foto/esquema o dibujarla */}
      {p.imagen ? (
        <div className="flex items-start gap-2">
          <ImagenExamen imagen={p.imagen} className="max-w-[320px]" />
          <button type="button" onClick={() => set({ imagen: null })} className={`${chico} hover:text-red-400`}>{tr({ es: 'Quitar imagen', en: 'Remove image', ca: 'Treure imatge' })}</button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 items-center">
          <label className={`${chico} cursor-pointer`}>
            📷 {subiendo ? tr({ es: 'Subiendo…', en: 'Uploading…', ca: 'Pujant…' }) : tr({ es: 'Subir imagen', en: 'Upload image', ca: 'Pujar imatge' })}
            <input type="file" accept="image/*" className="hidden" disabled={subiendo} onChange={e => { const f = e.target.files?.[0]; e.target.value = ''; if (f) guardarFuente(f, false) }} />
          </label>
          <button type="button" onClick={() => setPizarra(true)} className={chico}>✏️ {tr({ es: 'Dibujar', en: 'Draw', ca: 'Dibuixar' })}</button>
          {errorImg && <span className="text-red-400 text-[11.5px]">{errorImg}</span>}
        </div>
      )}

      {(p.tipo === 'test' || p.tipo === 'multiple') && (
        <div className="space-y-1.5 pl-1">
          {opciones.map((o, j) => {
            const correcta = p.correctas.includes(j)
            return (
              <div key={j} className="flex items-center gap-2">
                <input type={p.tipo === 'test' ? 'radio' : 'checkbox'} name={`c-${p.id}`} checked={correcta}
                  onChange={() => set({ correctas: p.tipo === 'test' ? [j] : (correcta ? p.correctas.filter(x => x !== j) : [...p.correctas, j]) })}
                  className="shrink-0 accent-teal-500" title={tr({ es: 'Correcta', en: 'Correct', ca: 'Correcta' })} />
                <span className="text-white/40 text-[12px] font-bold w-4">{String.fromCharCode(97 + j)})</span>
                <input value={o} maxLength={300} onChange={e => set({ opciones: opciones.map((x, k) => (k === j ? e.target.value : x)) })}
                  placeholder={tr({ es: `Opción ${j + 1}`, en: `Option ${j + 1}`, ca: `Opció ${j + 1}` })} className={`${input} flex-1`} />
                {opciones.length > MIN_OPCIONES && (
                  <button type="button" className="text-white/25 hover:text-red-400 text-[12px] px-1"
                    onClick={() => set({
                      opciones: opciones.filter((_, k) => k !== j),
                      correctas: p.correctas.filter(x => x !== j).map(x => (x > j ? x - 1 : x)),
                    })}>✕</button>
                )}
              </div>
            )
          })}
          {opciones.length < MAX_OPCIONES && (
            <button type="button" onClick={() => set({ opciones: [...opciones, ''] })} className="text-teal-400/80 hover:text-teal-400 text-[12px] font-bold">+ {tr({ es: 'Opción', en: 'Option', ca: 'Opció' })}</button>
          )}
          <p className="text-white/30 text-[11px]">{p.tipo === 'test'
            ? tr({ es: 'Marca con el punto la correcta.', en: 'Mark the correct one with the dot.', ca: 'Marca amb el punt la correcta.' })
            : tr({ es: 'Marca todas las correctas. Puntúa solo si el alumno marca exactamente esas.', en: 'Tick every correct one. It scores only if the student ticks exactly those.', ca: 'Marca totes les correctes. Puntua només si l’alumne marca exactament aquestes.' })}</p>
        </div>
      )}

      {p.tipo === 'vf' && (
        <div className="flex gap-2">
          {[true, false].map(v => (
            <button key={String(v)} type="button" onClick={() => set({ correcta: v })}
              className={`flex-1 py-1.5 rounded-lg border text-[12.5px] font-bold ${p.correcta === v ? 'bg-teal-600 border-teal-600 text-white' : 'border-white/10 text-white/60'}`}>
              {tr({ es: 'Correcta:', en: 'Correct:', ca: 'Correcta:' })} {v ? tr({ es: 'Verdadero', en: 'True', ca: 'Vertader' }) : tr({ es: 'Falso', en: 'False', ca: 'Fals' })}
            </button>
          ))}
        </div>
      )}

      {p.tipo === 'numerica' && (
        <div className="flex flex-wrap items-end gap-3">
          <label className="text-white/50 text-[11.5px]">{tr({ es: 'Resultado correcto', en: 'Correct result', ca: 'Resultat correcte' })}
            <input inputMode="decimal" value={p.valor ?? ''} onChange={e => set({ valor: e.target.value.replace(',', '.') })} className={`${input} block w-32 mt-1`} />
          </label>
          <label className="text-white/50 text-[11.5px]">{tr({ es: 'Margen (±)', en: 'Margin (±)', ca: 'Marge (±)' })}
            <input inputMode="decimal" value={p.tolerancia ?? 0} onChange={e => set({ tolerancia: e.target.value.replace(',', '.') })} className={`${input} block w-24 mt-1`} />
          </label>
          <label className="text-white/50 text-[11.5px]">{tr({ es: 'Unidad (opcional)', en: 'Unit (optional)', ca: 'Unitat (opcional)' })}
            <input value={p.unidad ?? ''} maxLength={20} onChange={e => set({ unidad: e.target.value })} placeholder="m/s, €, cm²…" className={`${input} block w-28 mt-1`} />
          </label>
          <p className="text-white/30 text-[11px] w-full">{tr({ es: 'El alumno escribe un número (vale coma o punto). Si cae dentro del margen, suma los puntos.', en: 'The student types a number (comma or point). If it is within the margin, it scores.', ca: 'L’alumne escriu un número (val coma o punt). Si cau dins del marge, suma els punts.' })}</p>
        </div>
      )}

      {p.tipo === 'corta' && (
        <div className="space-y-1.5">
          {aceptadas.map((a, j) => (
            <div key={j} className="flex items-center gap-2">
              <input value={a} maxLength={120} onChange={e => set({ aceptadas: aceptadas.map((x, k) => (k === j ? e.target.value : x)) })}
                placeholder={tr({ es: 'Respuesta aceptada', en: 'Accepted answer', ca: 'Resposta acceptada' })} className={`${input} flex-1`} />
              {aceptadas.length > 1 && <button type="button" className="text-white/25 hover:text-red-400 text-[12px] px-1" onClick={() => set({ aceptadas: aceptadas.filter((_, k) => k !== j) })}>✕</button>}
            </div>
          ))}
          {aceptadas.length < 8 && <button type="button" onClick={() => set({ aceptadas: [...aceptadas, ''] })} className="text-teal-400/80 hover:text-teal-400 text-[12px] font-bold">+ {tr({ es: 'Otra respuesta válida', en: 'Another valid answer', ca: 'Una altra resposta vàlida' })}</button>}
          <p className="text-white/30 text-[11px]">{tr({ es: 'No cuentan mayúsculas, tildes ni espacios de más. Añade sinónimos o formas válidas.', en: 'Capitals, accents and extra spaces do not count. Add synonyms or other valid forms.', ca: 'No compten majúscules, accents ni espais de més. Afegeix sinònims o formes vàlides.' })}</p>
        </div>
      )}

      {p.tipo === 'desarrollo' && (
        <div className="space-y-2">
          <textarea value={p.criterios ?? ''} onChange={e => set({ criterios: e.target.value })} rows={2} maxLength={1500}
            placeholder={tr({ es: 'Criterios de corrección o solución (solo los ves tú, también al corregir)', en: 'Marking criteria or model answer (only you see them, also when marking)', ca: 'Criteris de correcció o solució (només els veus tu, també en corregir)' })}
            className={`${input} w-full resize-y`} />
          <label className="flex items-center gap-2 text-white/50 text-[11.5px]">
            {tr({ es: 'Líneas para responder en la versión impresa', en: 'Answer lines on the printed version', ca: 'Línies per respondre a la versió impresa' })}
            <input type="number" min="1" max="30" value={p.lineas ?? 6} onChange={e => set({ lineas: e.target.value })} className={`${input} w-16 text-center`} />
          </label>
        </div>
      )}

      {avisos.length > 0 && (
        <ul className="text-amber-300/90 text-[11.5px] space-y-0.5">{avisos.map(a => <li key={a}>⚠ {tr(AVISOS[a])}</li>)}</ul>
      )}

      {pizarra && <Pizarra onGuardar={c => guardarFuente(c, true)} onCerrar={() => setPizarra(false)} />}
    </div>
  )
}
