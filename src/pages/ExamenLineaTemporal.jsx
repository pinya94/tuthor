import { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { EVENTOS_HISTORIA, getCorrectPos } from '../data/historiaEvents'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { saveActivity } from '../lib/activity'

const MAX_LIVES_PRIMARIA = 5
const WIN_AT_PRIMARIA    = 10
const MAX_LIVES_EXAM     = 3

function formatYear(y) {
  return y < 0 ? `${Math.abs(y)} a.C.` : `${y}`
}


// ── INTRO ──────────────────────────────────────────────────────────────────────
function Intro({ config, totalEvents, onStart, en }) {
  const { lives, winAt, label, emoji, descripcion } = config
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <span className="text-6xl mb-4 block">{emoji}</span>
          <h1 className="text-3xl font-black text-white mb-2">{label}</h1>
          <p className="text-white/50 text-sm">{en ? 'Timeline' : 'Línea del Tiempo'}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 space-y-4">
          <p className="text-white/60 text-sm leading-relaxed">{descripcion}</p>
          <div className="border-t border-white/10 pt-4 space-y-3">
            {[
              { icon: '🃏', title: en ? 'Place each card in position' : 'Coloca cada carta en su posición', desc: en ? 'The year is hidden. Decide if it goes before or after.' : 'El año está oculto. Decide si va antes o después de los que ya tienes.' },
              { icon: '❤️', title: `${lives} ${en ? 'lives' : 'vidas'}`, desc: en ? 'Each mistake costs a life.' : 'Cada error te cuesta una vida.' },
              { icon: '🏆', title: winAt ? (en ? `Place ${winAt} correctly → Pass` : `Coloca ${winAt} bien → Apruebas`) : (en ? 'Place all correctly → Pass' : 'Coloca todos bien → Apruebas'), desc: totalEvents ? (en ? `${totalEvents} events in this exam.` : `Hay ${totalEvents} eventos en este examen.`) : '' },
            ].map(r => (
              <div key={r.title} className="flex items-start gap-3">
                <span className="text-xl shrink-0">{r.icon}</span>
                <div>
                  <p className="text-white font-bold text-sm">{r.title}</p>
                  {r.desc && <p className="text-white/40 text-xs mt-0.5">{r.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={onStart} className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-xl transition-colors text-lg">
          {en ? 'Start →' : 'Empezar →'}
        </button>
      </div>
    </div>
  )
}

// ── RESULTADO ─────────────────────────────────────────────────────────────────
function Resultado({ placed, lives, config, onRepetir, onSalir, en }) {
  const { winAt, totalEvents } = config
  const target = winAt ?? totalEvents
  const aprobado = placed >= target

  let nota, notaColor
  if (!aprobado)          { nota = en ? 'FAIL' : 'SUSPENSO';              notaColor = 'text-red-400' }
  else if (placed >= totalEvents) { nota = en ? 'OUTSTANDING' : 'SOBRESALIENTE'; notaColor = 'text-violet-400' }
  else if (placed >= target * 1.3) { nota = en ? 'GOOD' : 'NOTABLE';      notaColor = 'text-blue-400' }
  else                    { nota = en ? 'PASS' : 'APROBADO';              notaColor = 'text-green-400' }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{en ? 'Result' : 'Resultado'}</p>
          <h1 className={`text-4xl font-black mb-1 ${notaColor}`}>{nota}</h1>
          <p className="text-white/40 text-sm">
            {aprobado
              ? (en ? `You placed ${placed} of ${totalEvents} events correctly` : `Has colocado ${placed} de ${totalEvents} eventos correctamente`)
              : (en ? `Only ${placed} of ${target} needed` : `Solo ${placed} de ${target} necesarios`)}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { val: placed, label: en ? 'Placed' : 'Colocadas', emoji: '✅' },
            { val: target, label: en ? 'To pass' : 'Para aprobar', emoji: '🎯' },
            { val: lives, label: en ? 'Lives left' : 'Vidas restantes', emoji: '❤️' },
          ].map(s => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <span className="text-xl block mb-1">{s.emoji}</span>
              <p className="text-xl font-black text-white">{s.val}</p>
              <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <button onClick={onRepetir} className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-colors">
            {en ? 'Retry ↺' : 'Repetir ↺'}
          </button>
          <button onClick={onSalir} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 font-medium py-3 rounded-xl transition-colors">
            {en ? 'Back' : 'Volver'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── JUEGO ──────────────────────────────────────────────────────────────────────
export default function ExamenLineaTemporal() {
  const navigate   = useNavigate()
  const location   = useLocation()
  const { user }   = useAuth()
  const { lang, localPath } = useLang()
  const en = lang === 'en'
  const { categoria, nivel, backPath } = location.state || {}

  // Configuración según nivel
  const isPrimaria = nivel === 'primaria'
  const maxLives   = isPrimaria ? MAX_LIVES_PRIMARIA : MAX_LIVES_EXAM
  const winAt      = isPrimaria ? WIN_AT_PRIMARIA : null // null = colocar todos

  const CONFIGS = en ? {
    primaria: { label: 'Great Milestones', emoji: '🌍', descripcion: 'The most important moments that changed the world. Perfect for revising key milestones of universal history.', lives: maxLives, winAt },
    wwii:     { label: 'World War II', emoji: '⚔️', descripcion: 'From the start of the conflict to the surrender of Japan. Master the chronology of the greatest conflict in history.', lives: maxLives, winAt },
    gce:      { label: 'Spanish Civil War', emoji: '🇪🇸', descripcion: 'From the Second Republic to Franco. Sort the events that marked three years of civil war.', lives: maxLives, winAt },
    roma:     { label: 'Ancient Rome', emoji: '🏛️', descripcion: 'From the founding of Rome to the fall of the Western Empire. Master the history of Roman civilisation.', lives: maxLives, winAt },
    usa:      { label: 'American Independence', emoji: '🦅', descripcion: 'From the Boston Tea Party to the American Constitution. Sort the events of the first modern democracy.', lives: maxLives, winAt },
  } : {
    primaria: { label: 'Grandes Hitos', emoji: '🌍', descripcion: 'Los momentos más importantes que cambiaron el mundo. Ideal para repasar los hitos clave de la historia universal.', lives: maxLives, winAt },
    wwii:     { label: 'Segunda Guerra Mundial', emoji: '⚔️', descripcion: 'Desde el inicio del conflicto hasta la rendición de Japón. Domina la cronología del mayor conflicto de la historia.', lives: maxLives, winAt },
    gce:      { label: 'Guerra Civil Española', emoji: '🇪🇸', descripcion: 'De la Segunda República al franquismo. Ordena los eventos que marcaron tres años de guerra fratricida.', lives: maxLives, winAt },
    roma:     { label: 'Antigua Roma', emoji: '🏛️', descripcion: 'Desde la fundación de Roma hasta la caída del Imperio de Occidente. Domina la historia de la civilización romana.', lives: maxLives, winAt },
    usa:      { label: 'Independencia Americana', emoji: '🦅', descripcion: 'Del motín del té a la Constitución americana. Ordena los eventos de la primera democracia moderna.', lives: maxLives, winAt },
  }

  const config = CONFIGS[categoria] || CONFIGS.primaria
  const allEvents = EVENTOS_HISTORIA.filter(e =>
    e.categoria === (categoria || 'primaria') &&
    (!nivel || !e.nivel || e.nivel.includes(nivel))
  )

  const [fase, setFase]       = useState('intro')
  const [timeline, setTL]     = useState([])
  const [pending, setPending] = useState([])
  const [current, setCurrent] = useState(null)
  const [lives, setLives]     = useState(maxLives)
  const [placed, setPlaced]   = useState(0)
  const [phase, setPhase]     = useState('placing')
  const [chosenSlot, setChosenSlot]   = useState(null)
  const [correctSlot, setCorrectSlot] = useState(null)
  const [wasCorrect, setWasCorrect]   = useState(null)
  const tlRef    = useRef(null)
  const startRef = useRef(null)
  const dragRef  = useRef({ active: false, startX: 0, scrollLeft: 0 })

  const onMouseDown = useCallback(e => {
    const el = tlRef.current; if (!el) return
    dragRef.current = { active: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft }
    el.style.cursor = 'grabbing'
  }, [])
  const onMouseUp = useCallback(() => {
    dragRef.current.active = false
    if (tlRef.current) tlRef.current.style.cursor = 'grab'
  }, [])
  const onMouseMove = useCallback(e => {
    if (!dragRef.current.active || !tlRef.current) return
    e.preventDefault()
    const x = e.pageX - tlRef.current.offsetLeft
    tlRef.current.scrollLeft = dragRef.current.scrollLeft - (x - dragRef.current.startX)
  }, [])

  useEffect(() => {
    const el = tlRef.current; if (!el) return
    const handler = e => { e.preventDefault(); el.scrollLeft += e.deltaY + e.deltaX }
    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  })

  // Scroll al slot correcto al equivocarse (especialmente útil en móvil)
  useEffect(() => {
    if (phase !== 'revealing' || wasCorrect !== false || correctSlot === null) return
    const el = tlRef.current; if (!el) return
    const CELL = 210
    const target = correctSlot * CELL - el.clientWidth / 2 + 24
    el.scrollTo({ left: Math.max(0, target), behavior: 'smooth' })
  }, [phase, wasCorrect, correctSlot])

  if (!categoria) { navigate(-1); return null }

  function startGame() {
    const shuffled = [...allEvents].sort(() => Math.random() - 0.5)
    setTL([shuffled[0]])
    setPending(shuffled.slice(2))
    setCurrent(shuffled[1])
    setLives(maxLives); setPlaced(0)
    setFase('jugando'); setPhase('placing')
    setChosenSlot(null); setCorrectSlot(null); setWasCorrect(null)
    startRef.current = Date.now()
    setTimeout(() => {
      const el = tlRef.current
      if (el) el.scrollTo({ left: (el.scrollWidth - el.clientWidth) / 2 })
    }, 50)
  }

  function placeCard(slot) {
    if (phase !== 'placing' || !current) return
    const correct = getCorrectPos(current, timeline)
    setChosenSlot(slot); setCorrectSlot(correct); setPhase('revealing')
    const ok = slot === correct
    setWasCorrect(ok)

    let newTL = timeline, newLives = lives, newPlaced = placed
    if (ok) {
      newTL = [...timeline]; newTL.splice(slot, 0, current)
      setTL(newTL)
      newPlaced = placed + 1; setPlaced(newPlaced)
    } else {
      newLives = lives - 1; setLives(newLives)
    }

    // ¿Condición de victoria?
    const target = winAt ?? allEvents.length
    const won    = newPlaced >= target

    setTimeout(() => {
      if (won || newLives <= 0 || pending.length === 0) {
        const timeSpent = startRef.current ? Math.round((Date.now() - startRef.current) / 1000) : 0
        const passed    = newPlaced >= target
        if (user) saveActivity(user.uid, {
          type: 'examen', game: 'linea-temporal', category: categoria,
          score: newPlaced * 10, passed, timeSpent,
        }).catch(() => {})
        setFase('resultado'); return
      }
      setCurrent(pending[0]); setPending(p => p.slice(1))
      setPhase('placing'); setChosenSlot(null); setCorrectSlot(null); setWasCorrect(null)
      setTimeout(() => {
        const el = tlRef.current
        if (el) el.scrollTo({ left: (el.scrollWidth - el.clientWidth) / 2, behavior: 'smooth' })
      }, 100)
    }, 2000)
  }

  if (fase === 'intro') return (
    <div className="relative z-10">
      <Intro config={{ ...config, totalEvents: allEvents.length }} totalEvents={allEvents.length} onStart={startGame} en={en} />
    </div>
  )

  if (fase === 'resultado') return (
    <div className="relative z-10">
      <Resultado
        placed={placed} lives={lives}
        config={{ ...config, totalEvents: allEvents.length }}
        onRepetir={startGame}
        onSalir={() => navigate(localPath(backPath || `/estudiar/${nivel}/historia`))}
        en={en}
      />
    </div>
  )

  const dif = { fácil: 'text-green-400 bg-green-500/10 border-green-500/30', medio: 'text-amber-400 bg-amber-500/10 border-amber-500/30', difícil: 'text-red-400 bg-red-500/10 border-red-500/30' }
  const target   = winAt ?? allEvents.length
  const progress = Math.round((placed / target) * 100)

  return (
    <div className="relative z-10 flex flex-col" style={{ height: 'calc(100vh - 4rem)' }}>

      {/* HEADER */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-2 shrink-0 border-b border-white/10 bg-black/20">
        <div className="flex items-center gap-1">
          {Array.from({ length: maxLives }).map((_, i) => (
            <span key={i} className={`text-xl transition-all ${i < lives ? '' : 'opacity-20 grayscale'}`}>❤️</span>
          ))}
        </div>
        <div className="text-center">
          <p className="text-white font-black text-base leading-none">{placed}/{target}</p>
          <p className="text-white/30 text-xs">{en ? 'placed' : 'colocadas'}</p>
        </div>
        <div className="text-right">
          <p className="text-white/50 text-sm font-semibold">{pending.length + 1} {en ? 'remaining' : 'restantes'}</p>
          <div className="w-16 h-1.5 bg-white/10 rounded-full mt-1 ml-auto overflow-hidden">
            <div className="h-full bg-violet-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* CARTA ACTUAL */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-4 min-h-0">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-4 text-center font-semibold">
          {phase === 'placing' ? (en ? 'Where does this card go?' : '¿Dónde va esta carta?') : wasCorrect ? (en ? '✓ Correct!' : '✓ ¡Correcto!') : (en ? '✗ Wrong' : '✗ Incorrecto')}
        </p>
        {current && (
          <div className={`w-full max-w-2xl rounded-2xl border-2 p-6 sm:p-8 transition-all duration-300 ${
            phase === 'revealing'
              ? wasCorrect ? 'border-green-500/70 bg-green-500/10' : 'border-red-500/70 bg-red-500/10'
              : 'border-white/20 bg-white/5 backdrop-blur-sm'
          }`}>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">{(en && current.nombreEn) || current.nombre}</h2>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-6">{(en && current.descripcionEn) || current.descripcion}</p>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-bold px-4 py-1.5 rounded-full border ${dif[current.dificultad]}`}>{en ? ({ fácil: 'easy', medio: 'medium', difícil: 'hard' }[current.dificultad] || current.dificultad) : current.dificultad}</span>
              <span className={`text-4xl sm:text-5xl font-black tabular-nums transition-all duration-500 ${phase === 'revealing' ? 'text-amber-400' : 'text-white/15'}`}>
                {phase === 'revealing' ? formatYear(current.año) : '????'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* LÍNEA DEL TIEMPO */}
      <div className="shrink-0 border-t border-white/10 bg-black/30 backdrop-blur-sm" style={{ minHeight: '11rem' }}>
        <div className="flex items-center justify-between px-4 pt-2 pb-1">
          <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">{en ? 'Your timeline' : 'Tu línea del tiempo'}</p>
          {phase === 'revealing' && !wasCorrect
            ? <p className="text-green-400 text-xs font-semibold animate-pulse">{en ? '↑ correct position in green' : '↑ posición correcta en verde'}</p>
            : timeline.length > 2 && <p className="text-white/20 text-xs">{en ? '← scroll →' : '← desliza →'}</p>
          }
        </div>
        <div
          ref={tlRef}
          className="overflow-x-auto pb-3"
          style={{ scrollbarWidth: 'none', cursor: 'grab' }}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onMouseMove={onMouseMove}
        >
          <div className="flex items-stretch px-3 gap-0" style={{ minWidth: 'max-content', minHeight: '7.5rem' }}>
            <SlotBtn index={0} phase={phase} chosen={chosenSlot} correct={correctSlot} onPlace={placeCard} en={en} />
            {timeline.map((ev, i) => {
              const big = timeline.length <= 4
              return (
                <div key={ev.id} className="flex items-stretch gap-0">
                  <div className={`flex flex-col justify-between bg-white/10 border border-white/20 rounded-xl mx-1 p-3 transition-all duration-300 ${big ? 'min-w-[150px] max-w-[170px]' : 'min-w-[110px] max-w-[130px]'}`}>
                    <p className={`text-white font-bold leading-snug line-clamp-3 ${big ? 'text-sm' : 'text-xs'}`}>{(en && ev.nombreEn) || ev.nombre}</p>
                    <p className={`text-amber-400 font-black mt-1 ${big ? 'text-lg' : 'text-sm'}`}>{formatYear(ev.año)}</p>
                  </div>
                  <SlotBtn index={i + 1} phase={phase} chosen={chosenSlot} correct={correctSlot} onPlace={placeCard} en={en} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function SlotBtn({ index, phase, chosen, correct, onPlace, en }) {
  const isChosen  = phase === 'revealing' && chosen === index
  const isCorrect = phase === 'revealing' && correct === index
  const isActive  = phase === 'placing'

  let cls = 'border-white/20 bg-white/5 text-white/40 hover:border-violet-400 hover:bg-violet-500/20 hover:text-violet-300 hover:scale-105'
  if (isChosen && isCorrect) cls = 'border-green-400 bg-green-500/25 text-green-300'
  else if (isChosen)         cls = 'border-red-400 bg-red-500/25 text-red-300'
  else if (isCorrect)        cls = 'border-green-400/60 bg-green-500/15 text-green-400 animate-pulse'

  return (
    <button
      onClick={() => isActive && onPlace(index)}
      disabled={!isActive}
      className={`flex-shrink-0 flex flex-col items-center justify-center border-2 rounded-xl transition-all duration-150 mx-0.5 self-stretch ${isActive ? 'cursor-pointer active:scale-95' : 'cursor-default'} ${cls}`}
      style={{ width: 48 }}
    >
      <span className="text-2xl font-black leading-none">
        {isChosen && isCorrect ? '✓' : isChosen ? '✗' : isCorrect ? '↑' : '+'}
      </span>
      {isActive && <span className="text-[9px] font-bold uppercase tracking-wide opacity-40 mt-0.5">{en ? 'here' : 'aquí'}</span>}
    </button>
  )
}
