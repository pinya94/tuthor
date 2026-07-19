import { useState } from 'react'
import { useLang } from '../context/LangContext'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Ordena por arrastre (o toque) las tarjetas de tipo 'orden' de un escenario.
// Dos formas de interactuar, ambas siempre activas:
//  - Arrastrar con el ratón (draggable nativo) una tarjeta hasta un hueco.
//  - Tocar una tarjeta para seleccionarla y tocar un hueco para colocarla —
//    necesario en móvil, donde el drag nativo de HTML5 no funciona bien.
export default function ReaccionPasosDragDrop({ pasos, onConfirm }) {
  const { tr } = useLang()
  const [pool, setPool] = useState(() => shuffle(pasos))
  const [slots, setSlots] = useState(() => Array(pasos.length).fill(null))
  const [seleccionado, setSeleccionado] = useState(null) // id de la tarjeta tocada en el pool

  const completo = slots.every(Boolean)

  function colocarEn(index) {
    if (slots[index] || !seleccionado) return
    const paso = pool.find(p => p.id === seleccionado)
    if (!paso) return
    setSlots(s => s.map((v, i) => (i === index ? paso : v)))
    setPool(p => p.filter(x => x.id !== seleccionado))
    setSeleccionado(null)
  }

  function quitarDe(index) {
    const paso = slots[index]
    if (!paso) return
    setSlots(s => s.map((v, i) => (i === index ? null : v)))
    setPool(p => [...p, paso])
    setSeleccionado(null)
  }

  function onDragStart(e, id) {
    e.dataTransfer.setData('text/plain', id)
    setSeleccionado(id)
  }

  function onDrop(e, index) {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain') || seleccionado
    if (!id || slots[index]) return
    const paso = pool.find(p => p.id === id)
    if (!paso) return
    setSlots(s => s.map((v, i) => (i === index ? paso : v)))
    setPool(p => p.filter(x => x.id !== id))
    setSeleccionado(null)
  }

  return (
    <div className="max-w-md w-full mx-auto">
      <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3 text-center">
        {tr({ es: 'Ordena los pasos', en: 'Order the steps', ca: 'Ordena els passos' })}
      </p>

      <div className="space-y-2 mb-6">
        {slots.map((paso, i) => (
          <div
            key={i}
            onDragOver={e => e.preventDefault()}
            onDrop={e => onDrop(e, i)}
            onClick={() => (paso ? quitarDe(i) : colocarEn(i))}
            className={`min-h-[3.25rem] rounded-xl border-2 border-dashed flex items-center gap-3 px-4 py-3 transition-colors cursor-pointer ${
              paso
                ? 'border-white/20 bg-white/10 border-solid'
                : seleccionado
                ? 'border-amber-400/60 bg-amber-400/5'
                : 'border-white/10'
            }`}
          >
            <span className="text-white/30 font-black text-sm w-5 shrink-0">{i + 1}</span>
            {paso ? (
              <span className="text-white text-sm">{tr(paso.texto)}</span>
            ) : (
              <span className="text-white/20 text-sm">
                {tr({ es: 'Toca una tarjeta y luego aquí', en: 'Tap a card, then here', ca: 'Toca una targeta i després aquí' })}
              </span>
            )}
          </div>
        ))}
      </div>

      {pool.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {pool.map(paso => (
            <div
              key={paso.id}
              draggable
              onDragStart={e => onDragStart(e, paso.id)}
              onClick={() => setSeleccionado(s => (s === paso.id ? null : paso.id))}
              className={`rounded-xl border px-4 py-3 text-sm text-white cursor-grab active:cursor-grabbing transition-colors ${
                seleccionado === paso.id
                  ? 'border-amber-400 bg-amber-400/20 ring-2 ring-amber-400/50'
                  : 'border-white/15 bg-white/5 hover:bg-white/10'
              }`}
            >
              {tr(paso.texto)}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => onConfirm(slots.map(s => s.id))}
        disabled={!completo}
        className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 disabled:bg-white/10 disabled:text-white/30 text-black font-black text-lg rounded-xl transition-all"
      >
        {tr({ es: 'Confirmar orden', en: 'Confirm order', ca: 'Confirma l\'ordre' })}
      </button>
    </div>
  )
}
