// Tablero de ordenar cartas, compartido por los tres juegos que tienen la
// MISMA mecánica: colocar una carta (con su valor oculto) en el hueco correcto
// de una línea que crece.
//   · Línea del Tiempo — juego (OrdenTemporal) y examen (ExamenLineaTemporal):
//     ordena eventos históricos por año.
//   · Orden de un ciclo (CicloOrdenExamen): ordena los pasos de un proceso.
// Antes cada uno tenía su propia copia del tablero horizontal, que en móvil era
// incómodo (una tira que se desliza en horizontal buscando un hueco estrecho).
//
// Aquí la línea es RESPONSIVE:
//   · Móvil  → vertical. Se desliza con el dedo (natural) y cada hueco es un
//              botón a todo el ancho — objetivo de toque grande, sin cazar.
//   · Escritorio → horizontal, como una línea de toda la vida.
//
// El componente es autónomo: gestiona su scroll (rueda en horizontal, táctil
// nativo en vertical) y lleva a la vista el hueco correcto al fallar. El padre
// solo le pasa el estado de la partida, cómo leer cada carta (accessors) y
// llama a `onPlace(slot)`.
import { useState, useRef, useEffect, useCallback } from 'react'

// Usamos la línea vertical (huecos a todo el ancho, scroll con el dedo) en
// cualquier dispositivo TÁCTIL —móvil y también tablet (iPad, etc.)— y en
// ventanas estrechas. En escritorio con ratón, la horizontal de siempre.
// Decidir por "puntero grueso" y no solo por ancho es lo que arregla el tablet:
// un iPad en horizontal es ancho pero se juega con el dedo.
const TOUCH_LAYOUT_QUERY = '(pointer: coarse), (max-width: 639px)'

function useIsNarrow() {
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      && window.matchMedia(TOUCH_LAYOUT_QUERY).matches
  )
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia(TOUCH_LAYOUT_QUERY)
    const onChange = e => setNarrow(e.matches)
    mq.addEventListener('change', onChange)
    // Sincroniza por si cambió entre el primer render y el efecto
    // (hidratación, rotar la tablet…). Es intencionado.
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

// Acentos por juego: ámbar (Línea del Tiempo), violeta (examen), esmeralda
// (ciclo), azul (ordenar números).
const ACCENTS = {
  amber:   { slotH: 'hover:border-amber-400 hover:bg-amber-500/20 hover:text-amber-300 hover:scale-105',     slotV: 'active:bg-amber-500/25 active:border-amber-400',     value: 'text-amber-400' },
  violet:  { slotH: 'hover:border-violet-400 hover:bg-violet-500/20 hover:text-violet-300 hover:scale-105',   slotV: 'active:bg-violet-500/25 active:border-violet-400',   value: 'text-amber-400' },
  emerald: { slotH: 'hover:border-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 hover:scale-105', slotV: 'active:bg-emerald-500/25 active:border-emerald-400', value: 'text-emerald-400' },
  sky:     { slotH: 'hover:border-sky-400 hover:bg-sky-500/20 hover:text-sky-300 hover:scale-105',           slotV: 'active:bg-sky-500/25 active:border-sky-400',         value: 'text-sky-400' },
}

const T = {
  donde: { es: '¿Dónde va esta carta?', en: 'Where does this card go?', ca: 'On va aquesta carta?' },
  ok:    { es: '✓ ¡Correcto!', en: '✓ Correct!', ca: '✓ Correcte!' },
  ko:    { es: '✗ Incorrecto', en: '✗ Wrong', ca: '✗ Incorrecte' },
  tuLinea: { es: 'Tu línea', en: 'Your timeline', ca: 'La teva línia' },
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
  // Accessors opcionales: por defecto se comportan como la Línea del Tiempo.
  getName, getDesc, getReveal, getBadge, getMarker, tuLineaLabel,
}) {
  const narrow = useIsNarrow()
  const scrollRef = useRef(null)
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0 })
  const acc = ACCENTS[accent] ?? ACCENTS.amber

  // Cómo leer cada carta. Los defaults reproducen la Línea del Tiempo (usa `lt`
  // y el año); el ciclo pasa sus propios accessors (usa `tr` y "Paso N de M").
  const name   = getName   ?? (it => lt(it, 'nombre'))
  const desc   = getDesc   ?? (it => lt(it, 'descripcion'))
  const reveal = getReveal ?? (it => formatYear(it.año))
  const badge  = getBadge  ?? (it => ({ text: (DIF_LABEL[lang] ?? DIF_LABEL.es)[it.dificultad] ?? it.dificultad, cls: DIF_CLS[it.dificultad] }))
  const marker = getMarker ?? (() => null)
  const acitem = { name, desc, reveal, badge, marker, value: acc.value }

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

  const lineaLabel = tuLineaLabel ? tr(tuLineaLabel, lang) : tr(T.tuLinea, lang)

  if (narrow) {
    // ───────────── MÓVIL: línea VERTICAL ─────────────
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <div className="shrink-0 px-4 pt-3 pb-1">
          <StatusLabel phase={phase} wasCorrect={wasCorrect} lang={lang} />
          <CurrentCard current={current} phase={phase} wasCorrect={wasCorrect} ac={acitem} compact />
        </div>

        <div className="flex items-center justify-between px-4 pt-3 pb-1 shrink-0">
          <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">{lineaLabel}</p>
          {phase === 'revealing' && !wasCorrect
            ? <p className="text-green-400 text-xs font-semibold animate-pulse">{tr(T.huecoVerde, lang)}</p>
            : phase === 'placing' && <p className="text-white/25 text-xs">{tr(T.tocaHueco, lang)}</p>}
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 pb-6 min-h-0"
          style={{ scrollbarWidth: 'none', overscrollBehaviorY: 'contain', WebkitOverflowScrolling: 'touch' }}>
          <SlotRow index={0} phase={phase} chosen={chosenSlot} correct={correctSlot} onPlace={onPlace} lang={lang} acc={acc} />
          {timeline.map((ev, i) => (
            <div key={ev.id}>
              <MiniRow ev={ev} ac={acitem} />
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
        <CurrentCard current={current} phase={phase} wasCorrect={wasCorrect} ac={acitem} />
      </div>

      <div className="shrink-0 border-t border-white/10 bg-black/30 backdrop-blur-sm" style={{ minHeight: '11rem' }}>
        <div className="flex items-center justify-between px-4 pt-2 pb-1">
          <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">{lineaLabel}</p>
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
              const mk = acitem.marker(ev)
              return (
                <div key={ev.id} className="flex items-stretch gap-0">
                  <div className={`flex flex-col justify-between bg-white/10 border border-white/20 rounded-xl mx-1 p-3 transition-all duration-300 ${big ? 'min-w-[150px] max-w-[170px]' : 'min-w-[110px] max-w-[130px]'} ${mk?.ring ?? ''}`}>
                    <div>
                      {mk && <p className={`text-[9px] font-bold uppercase tracking-wide mb-1 ${mk.cls}`}>{mk.text}</p>}
                      <p className={`text-white font-bold leading-snug line-clamp-3 ${big ? 'text-sm' : 'text-xs'}`}>{acitem.name(ev)}</p>
                    </div>
                    <p className={`font-black mt-1 ${acitem.value} ${big ? 'text-lg' : 'text-sm'}`}>{acitem.reveal(ev)}</p>
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

function CurrentCard({ current, phase, wasCorrect, ac, compact }) {
  if (!current) return null
  const state = phase === 'revealing'
    ? (wasCorrect ? 'border-green-500/70 bg-green-500/10' : 'border-red-500/70 bg-red-500/10')
    : 'border-white/20 bg-white/5 backdrop-blur-sm'
  const b = ac.badge(current)
  return (
    <div className={`w-full max-w-2xl mx-auto rounded-2xl border-2 transition-all duration-300 ${state} ${compact ? 'p-4' : 'p-6 sm:p-8'}`}>
      <h2 className={`font-black text-white leading-tight ${compact ? 'text-xl mb-1.5' : 'text-3xl sm:text-4xl mb-3'}`}>{ac.name(current)}</h2>
      {ac.desc(current) && <p className={`text-white/60 leading-relaxed ${compact ? 'text-sm mb-3 line-clamp-2' : 'text-base sm:text-lg mb-6'}`}>{ac.desc(current)}</p>}
      <div className="flex items-center justify-between">
        <span className={`font-bold rounded-full border ${compact ? 'text-xs px-3 py-1' : 'text-sm px-4 py-1.5'} ${b.cls}`}>{b.text}</span>
        <span className={`font-black tabular-nums transition-all duration-500 ${phase === 'revealing' ? ac.value : 'text-white/15'} ${compact ? 'text-2xl' : 'text-3xl sm:text-4xl'}`}>
          {phase === 'revealing' ? ac.reveal(current) : '????'}
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
function MiniRow({ ev, ac }) {
  const mk = ac.marker(ev)
  return (
    <div className={`flex items-center gap-3 bg-white/10 border border-white/15 rounded-xl px-3 py-2.5 ${mk?.ring ?? ''}`}>
      <div className="flex-1 min-w-0">
        {mk && <p className={`text-[9px] font-bold uppercase tracking-wide ${mk.cls}`}>{mk.text}</p>}
        <p className="text-white font-semibold text-sm leading-snug line-clamp-2">{ac.name(ev)}</p>
      </div>
      <span className={`font-black tabular-nums shrink-0 ${ac.value}`}>{ac.reveal(ev)}</span>
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
      {isActive && <span className="text-[9px] font-bold uppercase tracking-wide opacity-40 mt-0.5">{lang === 'en' ? 'here' : 'aquí'}</span>}
    </button>
  )
}
