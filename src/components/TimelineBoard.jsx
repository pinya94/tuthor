// Tablero de la Línea del Tiempo, compartido por el juego (OrdenTemporal) y el
// examen (ExamenLineaTemporal): antes cada uno tenía su propia copia del mismo
// tablero horizontal, que en móvil era incómodo (tira que se desliza en
// horizontal buscando un hueco estrecho).
//
// Aquí la línea es RESPONSIVE:
//   · Móvil  → vertical. Se desliza con el dedo (natural) y cada hueco es un
//              botón a todo el ancho — objetivo de toque grande, sin cazar.
//   · Escritorio → horizontal, como una línea del tiempo de toda la vida.
//
// El componente es autónomo: gestiona su scroll (rueda en horizontal, táctil
// nativo en vertical) y lleva a la vista el hueco correcto al fallar. El padre
// solo le pasa el estado de la partida y llama a `onPlace(slot)`.
import { useState, useRef, useEffect, useCallback } from 'react'

function useIsNarrow() {
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      && window.matchMedia('(max-width: 639px)').matches
  )
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia('(max-width: 639px)')
    const onChange = e => setNarrow(e.matches)
    mq.addEventListener('change', onChange)
    // Sincroniza por si el ancho cambió entre el primer render y el efecto
    // (hidratación, cambio de pestaña…). Es intencionado.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNarrow(mq.matches)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return narrow
}

function formatYear(y) {
  return y < 0 ? `${Math.abs(y)} a.C.` : `${y}`
}

const DIF_CLS = {
  fácil:   'text-green-400 bg-green-500/10 border-green-500/30',
  medio:   'text-amber-400 bg-amber-500/10 border-amber-500/30',
  difícil: 'text-red-400 bg-red-500/10 border-red-500/30',
}
const DIF_LABEL = {
  es: { fácil: 'fácil', medio: 'medio', difícil: 'difícil' },
  en: { fácil: 'easy', medio: 'medium', difícil: 'hard' },
  ca: { fácil: 'fàcil', medio: 'mitjà', difícil: 'difícil' },
}

// Acentos por juego: ambero (OrdenTemporal) y violeta (examen).
const ACCENTS = {
  amber: {
    slotH: 'hover:border-amber-400 hover:bg-amber-500/20 hover:text-amber-300 hover:scale-105',
    slotV: 'active:bg-amber-500/25 active:border-amber-400',
  },
  violet: {
    slotH: 'hover:border-violet-400 hover:bg-violet-500/20 hover:text-violet-300 hover:scale-105',
    slotV: 'active:bg-violet-500/25 active:border-violet-400',
  },
}

const T = {
  donde: { es: '¿Dónde va esta carta?', en: 'Where does this card go?', ca: 'On va aquesta carta?' },
  ok:    { es: '✓ ¡Correcto!', en: '✓ Correct!', ca: '✓ Correcte!' },
  ko:    { es: '✗ Incorrecto', en: '✗ Wrong', ca: '✗ Incorrecte' },
  tuLinea: { es: 'Tu línea del tiempo', en: 'Your timeline', ca: 'La teva línia del temps' },
  huecoVerde: { es: 'el hueco verde', en: 'the green gap', ca: 'el buit verd' },
  tocaHueco: { es: 'toca un hueco', en: 'tap a gap', ca: 'toca un buit' },
  correctaVerde: { es: '↑ posición correcta en verde', en: '↑ correct position in green', ca: '↑ posició correcta en verd' },
  desliza: { es: '← desliza →', en: '← scroll →', ca: '← llisca →' },
  colocarAqui: { es: '＋ Colocar aquí', en: '＋ Place here', ca: '＋ Col·locar aquí' },
  aquiIba: { es: '↑ aquí iba', en: '↑ it went here', ca: '↑ aquí anava' },
}
const tr = (obj, lang) => obj[lang] ?? obj.es

export default function TimelineBoard({
  current, timeline, phase, wasCorrect, chosenSlot, correctSlot, onPlace,
  lt, lang = 'es', accent = 'amber',
}) {
  const narrow = useIsNarrow()
  const scrollRef = useRef(null)
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0 })
  const acc = ACCENTS[accent] ?? ACCENTS.amber

  // Escritorio: la rueda del ratón desplaza la línea horizontal.
  useEffect(() => {
    if (narrow) return
    const el = scrollRef.current; if (!el) return
    const handler = e => { e.preventDefault(); el.scrollLeft += e.deltaY + e.deltaX }
    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  })

  // Al aparecer una carta nueva (escritorio), centra la línea.
  useEffect(() => {
    if (narrow || phase !== 'placing') return
    const el = scrollRef.current; if (!el) return
    el.scrollTo({ left: (el.scrollWidth - el.clientWidth) / 2, behavior: 'smooth' })
  }, [current, narrow, phase])

  // Al fallar, lleva a la vista el hueco correcto (vale para vertical y horizontal).
  useEffect(() => {
    if (phase !== 'revealing' || wasCorrect !== false || correctSlot === null) return
    scrollRef.current?.querySelector('[data-correct-slot]')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
  }, [phase, wasCorrect, correctSlot])

  const onMouseDown = useCallback(e => {
    const el = scrollRef.current; if (!el) return
    dragRef.current = { active: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft }
    el.style.cursor = 'grabbing'
  }, [])
  const onMouseUp = useCallback(() => {
    dragRef.current.active = false
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab'
  }, [])
  const onMouseMove = useCallback(e => {
    if (!dragRef.current.active || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    scrollRef.current.scrollLeft = dragRef.current.scrollLeft - (x - dragRef.current.startX)
  }, [])

  if (narrow) {
    // ───────────── MÓVIL: línea VERTICAL ─────────────
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <div className="shrink-0 px-4 pt-3 pb-1">
          <StatusLabel phase={phase} wasCorrect={wasCorrect} lang={lang} />
          <CurrentCard current={current} phase={phase} wasCorrect={wasCorrect} lt={lt} lang={lang} compact />
        </div>

        <div className="flex items-center justify-between px-4 pt-3 pb-1 shrink-0">
          <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">{tr(T.tuLinea, lang)}</p>
          {phase === 'revealing' && !wasCorrect
            ? <p className="text-green-400 text-xs font-semibold animate-pulse">{tr(T.huecoVerde, lang)}</p>
            : phase === 'placing' && <p className="text-white/25 text-xs">{tr(T.tocaHueco, lang)}</p>}
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 pb-6 min-h-0"
          style={{ scrollbarWidth: 'none', overscrollBehaviorY: 'contain', WebkitOverflowScrolling: 'touch' }}>
          <SlotRow index={0} phase={phase} chosen={chosenSlot} correct={correctSlot} onPlace={onPlace} lang={lang} acc={acc} />
          {timeline.map((ev, i) => (
            <div key={ev.id}>
              <MiniRow ev={ev} lt={lt} />
              <SlotRow index={i + 1} phase={phase} chosen={chosenSlot} correct={correctSlot} onPlace={onPlace} lang={lang} acc={acc} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ───────────── ESCRITORIO: línea HORIZONTAL ─────────────
  return (
    <>
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-4 min-h-0">
        <StatusLabel phase={phase} wasCorrect={wasCorrect} lang={lang} />
        <CurrentCard current={current} phase={phase} wasCorrect={wasCorrect} lt={lt} lang={lang} />
      </div>

      <div className="shrink-0 border-t border-white/10 bg-black/30 backdrop-blur-sm" style={{ minHeight: '11rem' }}>
        <div className="flex items-center justify-between px-4 pt-2 pb-1">
          <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">{tr(T.tuLinea, lang)}</p>
          {phase === 'revealing' && !wasCorrect
            ? <p className="text-green-400 text-xs font-semibold animate-pulse">{tr(T.correctaVerde, lang)}</p>
            : timeline.length > 2 && <p className="text-white/20 text-xs">{tr(T.desliza, lang)}</p>}
        </div>

        <div ref={scrollRef} className="overflow-x-auto pb-3"
          style={{ scrollbarWidth: 'none', cursor: 'grab', touchAction: 'pan-x', WebkitOverflowScrolling: 'touch', overscrollBehaviorX: 'contain' }}
          onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseLeave={onMouseUp} onMouseMove={onMouseMove}>
          <div className="flex items-stretch px-3 gap-0" style={{ minWidth: 'max-content', minHeight: '7.5rem' }}>
            <SlotBtn index={0} phase={phase} chosen={chosenSlot} correct={correctSlot} onPlace={onPlace} lang={lang} acc={acc} />
            {timeline.map((ev, i) => {
              const big = timeline.length <= 4
              return (
                <div key={ev.id} className="flex items-stretch gap-0">
                  <div className={`flex flex-col justify-between bg-white/10 border border-white/20 rounded-xl mx-1 p-3 transition-all duration-300 ${big ? 'min-w-[150px] max-w-[170px]' : 'min-w-[110px] max-w-[130px]'}`}>
                    <p className={`text-white font-bold leading-snug line-clamp-3 ${big ? 'text-sm' : 'text-xs'}`}>{lt(ev, 'nombre')}</p>
                    <p className={`text-amber-400 font-black mt-1 ${big ? 'text-lg' : 'text-sm'}`}>{formatYear(ev.año)}</p>
                  </div>
                  <SlotBtn index={i + 1} phase={phase} chosen={chosenSlot} correct={correctSlot} onPlace={onPlace} lang={lang} acc={acc} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

// ── Piezas ──────────────────────────────────────────────────────────────────
function StatusLabel({ phase, wasCorrect, lang }) {
  const txt = phase === 'placing' ? tr(T.donde, lang) : wasCorrect ? tr(T.ok, lang) : tr(T.ko, lang)
  const color = phase === 'revealing' ? (wasCorrect ? 'text-green-400' : 'text-red-400') : 'text-white/40'
  return <p className={`text-xs uppercase tracking-widest mb-2 text-center font-semibold ${color}`}>{txt}</p>
}

function CurrentCard({ current, phase, wasCorrect, lt, lang, compact }) {
  if (!current) return null
  const state = phase === 'revealing'
    ? (wasCorrect ? 'border-green-500/70 bg-green-500/10' : 'border-red-500/70 bg-red-500/10')
    : 'border-white/20 bg-white/5 backdrop-blur-sm'
  const difTxt = (DIF_LABEL[lang] ?? DIF_LABEL.es)[current.dificultad] ?? current.dificultad
  return (
    <div className={`w-full max-w-2xl mx-auto rounded-2xl border-2 transition-all duration-300 ${state} ${compact ? 'p-4' : 'p-6 sm:p-8'}`}>
      <h2 className={`font-black text-white leading-tight ${compact ? 'text-xl mb-1.5' : 'text-3xl sm:text-4xl mb-3'}`}>{lt(current, 'nombre')}</h2>
      <p className={`text-white/60 leading-relaxed ${compact ? 'text-sm mb-3 line-clamp-2' : 'text-base sm:text-lg mb-6'}`}>{lt(current, 'descripcion')}</p>
      <div className="flex items-center justify-between">
        <span className={`font-bold rounded-full border ${compact ? 'text-xs px-3 py-1' : 'text-sm px-4 py-1.5'} ${DIF_CLS[current.dificultad]}`}>{difTxt}</span>
        <span className={`font-black tabular-nums transition-all duration-500 ${phase === 'revealing' ? 'text-amber-400' : 'text-white/15'} ${compact ? 'text-3xl' : 'text-4xl sm:text-5xl'}`}>
          {phase === 'revealing' ? formatYear(current.año) : '????'}
        </span>
      </div>
    </div>
  )
}

// Hueco a todo el ancho (móvil, vertical)
function SlotRow({ index, phase, chosen, correct, onPlace, lang, acc }) {
  const isChosen  = phase === 'revealing' && chosen === index
  const isCorrect = phase === 'revealing' && correct === index
  const isActive  = phase === 'placing'

  let cls = `border-white/15 text-white/45 ${acc.slotV}`
  if (isChosen && isCorrect) cls = 'border-green-400 bg-green-500/25 text-green-300'
  else if (isChosen)         cls = 'border-red-400 bg-red-500/25 text-red-300'
  else if (isCorrect)        cls = 'border-green-400 bg-green-500/20 text-green-300 animate-pulse'

  const label = isChosen && isCorrect ? '✓' : isChosen ? '✗' : isCorrect ? tr(T.aquiIba, lang) : tr(T.colocarAqui, lang)

  return (
    <button
      {...(isCorrect ? { 'data-correct-slot': true } : {})}
      onClick={() => isActive && onPlace(index)}
      disabled={!isActive}
      className={`w-full my-1.5 py-3 rounded-xl border-2 border-dashed text-sm font-bold uppercase tracking-wide transition-all duration-150 ${isActive ? 'cursor-pointer active:scale-[0.98]' : 'cursor-default'} ${cls}`}
      style={{ touchAction: 'manipulation' }}
    >
      {label}
    </button>
  )
}

// Carta ya colocada (móvil, vertical)
function MiniRow({ ev, lt }) {
  return (
    <div className="flex items-center gap-3 bg-white/10 border border-white/15 rounded-xl px-3 py-2.5">
      <p className="text-white font-semibold text-sm leading-snug line-clamp-2 flex-1">{lt(ev, 'nombre')}</p>
      <span className="text-amber-400 font-black tabular-nums shrink-0">{formatYear(ev.año)}</span>
    </div>
  )
}

// Hueco estrecho entre cartas (escritorio, horizontal)
function SlotBtn({ index, phase, chosen, correct, onPlace, lang, acc }) {
  const isChosen  = phase === 'revealing' && chosen === index
  const isCorrect = phase === 'revealing' && correct === index
  const isActive  = phase === 'placing'

  let cls = `border-white/20 bg-white/5 text-white/40 ${acc.slotH}`
  if (isChosen && isCorrect) cls = 'border-green-400 bg-green-500/25 text-green-300'
  else if (isChosen)         cls = 'border-red-400 bg-red-500/25 text-red-300'
  else if (isCorrect)        cls = 'border-green-400/60 bg-green-500/15 text-green-400 animate-pulse'

  return (
    <button
      {...(isCorrect ? { 'data-correct-slot': true } : {})}
      onClick={() => isActive && onPlace(index)}
      disabled={!isActive}
      className={`flex-shrink-0 flex flex-col items-center justify-center border-2 rounded-xl transition-all duration-150 mx-0.5 self-stretch ${isActive ? 'cursor-pointer active:scale-95' : 'cursor-default'} ${cls}`}
      style={{ width: 56, touchAction: 'manipulation' }}
    >
      <span className="text-2xl font-black leading-none">
        {isChosen && isCorrect ? '✓' : isChosen ? '✗' : isCorrect ? '↑' : '+'}
      </span>
      {isActive && <span className="text-[9px] font-bold uppercase tracking-wide opacity-40 mt-0.5">{lang === 'en' ? 'here' : lang === 'ca' ? 'aquí' : 'aquí'}</span>}
    </button>
  )
}
