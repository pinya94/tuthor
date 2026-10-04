// Una pregunta de un examen del profesor tal como la ve el alumno. La usan la
// tarea (respondiendo), la vista previa del editor y la corrección (en solo
// lectura, con la solución y los puntos).
import { useLang } from '../../context/LangContext'
import { textoSolucion } from '../../lib/examenModelo'
import ImagenExamen from './ImagenExamen'

const letra = i => String.fromCharCode(97 + i)

export default function PreguntaAlumno({ p, n, valor, onChange, soloLectura = false, solucion = false, resultado = null }) {
  const { tr } = useLang()
  const set = v => !soloLectura && onChange?.(v)
  const marca = (ok) => (solucion ? (ok ? 'border-green-500/60 bg-green-500/10' : '') : '')

  return (
    <div className="rounded-2xl border border-white/10 p-4" style={{ background: 'rgba(17,20,29,.7)' }}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <p className="text-white font-semibold text-[14px] whitespace-pre-wrap">{n}. {p.enunciado}</p>
        <span className="shrink-0 text-[11px] font-bold text-white/40 tabular-nums">
          {resultado ? `${resultado.puntos}/` : ''}{p.puntos} {tr({ es: 'pt', en: 'pt', ca: 'pt' })}
        </span>
      </div>
      {p.imagen && <ImagenExamen imagen={p.imagen} className="mb-3" />}

      {(p.tipo === 'test' || p.tipo === 'multiple') && (
        <div className="space-y-2">
          {p.tipo === 'multiple' && <p className="text-white/40 text-[11px]">{tr({ es: 'Puede haber varias correctas: marca todas.', en: 'There may be several correct answers: tick them all.', ca: 'Hi pot haver diverses correctes: marca-les totes.' })}</p>}
          {p.opciones.map((o, j) => {
            const elegida = p.tipo === 'test' ? valor === j : (valor ?? []).includes(j)
            return (
              <label key={j} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-colors ${soloLectura ? '' : 'cursor-pointer'} ${elegida ? 'bg-teal-500/15 border-teal-500/50' : 'border-white/10 hover:bg-white/5'} ${marca(p.correctas.includes(j))}`}>
                <input type={p.tipo === 'test' ? 'radio' : 'checkbox'} checked={elegida} disabled={soloLectura}
                  onChange={() => set(p.tipo === 'test' ? j : (elegida ? (valor ?? []).filter(x => x !== j) : [...(valor ?? []), j]))}
                  className="shrink-0 accent-teal-500" />
                <span className="text-white/50 text-[12px] font-bold">{letra(j)})</span>
                <span className="text-white/85 text-[13.5px]">{o}</span>
              </label>
            )
          })}
        </div>
      )}

      {p.tipo === 'vf' && (
        <div className="grid grid-cols-2 gap-2">
          {[true, false].map(v => (
            <button key={String(v)} type="button" disabled={soloLectura} onClick={() => set(v)}
              className={`py-2.5 rounded-xl border text-[13.5px] font-bold transition-colors ${valor === v ? 'bg-teal-500/15 border-teal-500/50 text-white' : 'border-white/10 text-white/70 hover:bg-white/5'} ${marca(p.correcta === v)}`}>
              {v ? tr({ es: 'Verdadero', en: 'True', ca: 'Vertader' }) : tr({ es: 'Falso', en: 'False', ca: 'Fals' })}
            </button>
          ))}
        </div>
      )}

      {p.tipo === 'numerica' && (
        <div className="flex items-center gap-2">
          <input inputMode="decimal" value={valor ?? ''} readOnly={soloLectura} onChange={e => set(e.target.value)}
            placeholder={tr({ es: 'Tu resultado', en: 'Your answer', ca: 'El teu resultat' })}
            className="w-40 bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white text-[14px] tabular-nums outline-none focus:border-teal-500" />
          {p.unidad && <span className="text-white/60 text-[13px]">{p.unidad}</span>}
        </div>
      )}

      {p.tipo === 'corta' && (
        <input value={valor ?? ''} readOnly={soloLectura} onChange={e => set(e.target.value)} maxLength={200}
          placeholder={tr({ es: 'Tu respuesta', en: 'Your answer', ca: 'La teva resposta' })}
          className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white text-[14px] outline-none focus:border-teal-500" />
      )}

      {p.tipo === 'desarrollo' && (
        <textarea value={valor ?? ''} readOnly={soloLectura} onChange={e => set(e.target.value)} maxLength={8000}
          rows={Math.min(14, Math.max(4, p.lineas || 6))}
          placeholder={tr({ es: 'Escribe tu respuesta. Puedes explicar los pasos y el cálculo.', en: 'Write your answer. You can explain the steps and the working.', ca: 'Escriu la teva resposta. Pots explicar els passos i el càlcul.' })}
          className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white text-[14px] leading-relaxed outline-none focus:border-teal-500 resize-y" />
      )}

      {solucion && (
        <p className="mt-2 text-[12px] text-green-300/90">
          <b>{p.tipo === 'desarrollo' ? tr({ es: 'Criterios', en: 'Marking criteria', ca: 'Criteris' }) : tr({ es: 'Solución', en: 'Answer', ca: 'Solució' })}:</b> {textoSolucion(p, tr)}
        </p>
      )}
    </div>
  )
}
