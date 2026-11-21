// Piano en pantalla (y teclado del ordenador) para tocar sin instrumento ni
// micro. Do4 a Mi5; las teclas del ordenador van como en un piano: la fila
// A S D F G H J K L Ñ son las blancas y W E T Y U O P, las negras.
import { useEffect } from 'react'
import { TECLAS } from '../../lib/tocaOrquesta'

const BLANCAS = [60, 62, 64, 65, 67, 69, 71, 72, 74, 76]
const NEGRAS = [61, 63, 66, 68, 70, 73, 75] // entre blancas: tras 60, 62, 65, 67, 69, 72, 74
const NOM = { es: ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'], ca: ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'], en: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] }
const LETRA = Object.fromEntries(Object.entries(TECLAS).filter(([k]) => k !== ';').map(([k, m]) => [m, k.toUpperCase()]))

export default function PianoPantalla({ activa, onPulsa, onSuelta, l = 'es' }) {
  useEffect(() => {
    const abajo = ev => {
      if (ev.repeat || ev.ctrlKey || ev.metaKey || ev.altKey) return
      const m = TECLAS[ev.key.toLowerCase()]
      if (m == null) return
      ev.preventDefault()
      onPulsa(m)
    }
    const arriba = ev => { const m = TECLAS[ev.key.toLowerCase()]; if (m != null) onSuelta(m) }
    window.addEventListener('keydown', abajo)
    window.addEventListener('keyup', arriba)
    return () => { window.removeEventListener('keydown', abajo); window.removeEventListener('keyup', arriba) }
  }, [onPulsa, onSuelta])

  const ancho = 100 / BLANCAS.length
  const pos = m => { const i = BLANCAS.indexOf(m - 1); return (i + 1) * ancho }
  const props = m => ({
    onPointerDown: ev => { ev.preventDefault(); ev.currentTarget.setPointerCapture?.(ev.pointerId); onPulsa(m) },
    onPointerUp: () => onSuelta(m), onPointerCancel: () => onSuelta(m), onPointerLeave: () => onSuelta(m),
  })
  const nombres = NOM[l] ?? NOM.es
  return (
    <div className="relative h-36 select-none touch-none" role="group" aria-label="Piano">
      {BLANCAS.map((m, i) => (
        <button key={m} type="button" {...props(m)} aria-label={nombres[[0, 2, 4, 5, 7, 9, 11].indexOf(m % 12)]}
          className={`absolute top-0 bottom-0 border border-slate-400 rounded-b-lg flex flex-col justify-end items-center pb-1.5 ${activa === m ? 'bg-amber-200' : 'bg-white'}`}
          style={{ left: `${i * ancho}%`, width: `${ancho}%` }}>
          <span className="text-[11px] font-bold text-slate-600">{nombres[[0, 2, 4, 5, 7, 9, 11].indexOf(m % 12)]}</span>
          <span className="hidden sm:block text-[10px] text-slate-400">{LETRA[m]}</span>
        </button>
      ))}
      {NEGRAS.map(m => (
        <button key={m} type="button" {...props(m)} aria-label={`${nombres[[0, 2, 4, 5, 7, 9, 11].indexOf((m - 1) % 12)]}♯`}
          className={`absolute top-0 h-[60%] z-10 rounded-b-md flex items-end justify-center pb-1 ${activa === m ? 'bg-amber-500' : 'bg-slate-900'}`}
          style={{ left: `calc(${pos(m)}% - ${ancho * 0.3}%)`, width: `${ancho * 0.6}%` }}>
          <span className="hidden sm:block text-[10px] text-white/60">{LETRA[m]}</span>
        </button>
      ))}
    </div>
  )
}
