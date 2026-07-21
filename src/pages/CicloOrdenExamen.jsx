import { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { CICLOS, getPasos, getCorrectPosCiclo } from '../data/ciclosCientificos'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { saveActivity } from '../lib/activity'
import SEOHead from '../components/SEOHead'
import QuizSchema from '../components/QuizSchema'
import CoinsAnimation from '../components/CoinsAnimation'

const MAX_LIVES = 3

const DIFICULTAD = {
  fácil:   { es: 'fácil',   en: 'easy',   ca: 'fàcil',   cls: 'text-green-400 bg-green-500/10 border-green-500/30' },
  medio:   { es: 'medio',   en: 'medium', ca: 'mitjà',   cls: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  difícil: { es: 'difícil', en: 'hard',   ca: 'difícil', cls: 'text-red-400 bg-red-500/10 border-red-500/30' },
}

function formatPaso(orden, tr) {
  return tr({ es: `Paso ${orden}`, en: `Step ${orden}`, ca: `Pas ${orden}` })
}

// ── INTRO ──────────────────────────────────────────────────────────────────────
function Intro({ ciclo, total, onStart, tr }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <span className="text-6xl mb-4 block">{ciclo.emoji}</span>
          <h1 className="text-3xl font-black text-white mb-2">{tr(ciclo.label)}</h1>
          <p className="text-white/50 text-sm">{tr({ es: 'Ordena antes o después', en: 'Sort before or after', ca: 'Ordena abans o després' })}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 space-y-4">
          <p className="text-white/60 text-sm leading-relaxed">{tr(ciclo.descripcion)}</p>
          <div className="border-t border-white/10 pt-4 space-y-3">
            {[
              { icon: '🃏', title: tr({ es: 'Coloca cada paso en su posición', en: 'Place each step in position', ca: 'Col·loca cada pas en la seva posició' }), desc: tr({ es: 'El paso está oculto. Decide si va antes o después de los que ya tienes.', en: "The step is hidden. Decide if it goes before or after the ones you already have.", ca: 'El pas està amagat. Decideix si va abans o després dels que ja tens.' }) },
              { icon: '❤️', title: tr({ es: `${MAX_LIVES} vidas`, en: `${MAX_LIVES} lives`, ca: `${MAX_LIVES} vides` }), desc: tr({ es: 'Cada error te cuesta una vida.', en: 'Each mistake costs a life.', ca: 'Cada error et costa una vida.' }) },
              { icon: '🏆', title: tr({ es: `Coloca los ${total} pasos → Apruebas`, en: `Place all ${total} steps → Pass`, ca: `Col·loca els ${total} passos → Aproves` }), desc: tr({ es: `Este proceso tiene ${total} pasos.`, en: `This process has ${total} steps.`, ca: `Aquest procés té ${total} passos.` }) },
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
        <button onClick={onStart} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-colors text-lg">
          {tr({ es: 'Empezar →', en: 'Start →', ca: 'Començar →' })}
        </button>
      </div>
    </div>
  )
}

// ── RESULTADO ─────────────────────────────────────────────────────────────────
function Resultado({ placed, lives, total, ciclo, onRepetir, onSalir, tr }) {
  const aprobado = placed >= total

  let nota, notaColor
  if (!aprobado)                nota = tr({ es: 'SUSPENSO', en: 'FAIL', ca: 'SUSPÈS' }),           notaColor = 'text-red-400'
  else if (lives === MAX_LIVES) nota = tr({ es: 'SOBRESALIENTE', en: 'OUTSTANDING', ca: 'EXCEL·LENT' }), notaColor = 'text-violet-400'
  else if (lives >= 2)          nota = tr({ es: 'NOTABLE', en: 'GOOD', ca: 'NOTABLE' }),            notaColor = 'text-blue-400'
  else                          nota = tr({ es: 'APROBADO', en: 'PASS', ca: 'APROVAT' }),           notaColor = 'text-green-400'

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{tr({ es: 'Resultado', en: 'Result', ca: 'Resultat' })}</p>
          <h1 className={`text-4xl font-black mb-1 ${notaColor}`}>{nota}</h1>
          <p className="text-white/40 text-sm">
            {aprobado
              ? tr({ es: `Has colocado los ${total} pasos de ${tr(ciclo.label)} correctamente`, en: `You placed all ${total} steps of ${tr(ciclo.label)} correctly`, ca: `Has col·locat els ${total} passos de ${tr(ciclo.label)} correctament` })
              : tr({ es: `Colocaste ${placed} de ${total} pasos necesarios`, en: `You placed ${placed} of ${total} steps needed`, ca: `Vas col·locar ${placed} de ${total} passos necessaris` })}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { val: placed, label: tr({ es: 'Colocados', en: 'Placed', ca: 'Col·locats' }), emoji: '✅' },
            { val: total, label: tr({ es: 'Para aprobar', en: 'To pass', ca: 'Per aprovar' }), emoji: '🎯' },
            { val: lives, label: tr({ es: 'Vidas restantes', en: 'Lives left', ca: 'Vides restants' }), emoji: '❤️' },
          ].map(s => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <span className="text-xl block mb-1">{s.emoji}</span>
              <p className="text-xl font-black text-white">{s.val}</p>
              <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <button onClick={onRepetir} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors">
            {tr({ es: 'Repetir ↺', en: 'Retry ↺', ca: 'Repetir ↺' })}
          </button>
          <button onClick={onSalir} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 font-medium py-3 rounded-xl transition-colors">
            {tr({ es: 'Volver', en: 'Back', ca: 'Tornar' })}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── JUEGO ──────────────────────────────────────────────────────────────────────
export default function CicloOrdenExamen() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const { lang, localPath, tr } = useLang()
  const { categoria } = useParams()
  const { backPath } = location.state || {}

  const ciclo = CICLOS[categoria]
  const allSteps = getPasos(categoria)

  const [fase, setFase]       = useState('intro')
  const [timeline, setTL]     = useState([])
  const [pending, setPending] = useState([])
  const [current, setCurrent] = useState(null)
  const [lives, setLives]     = useState(MAX_LIVES)
  const [placed, setPlaced]   = useState(0)
  const [phase, setPhase]     = useState('placing')
  const [coinsToShow, setCoinsToShow] = useState(0)
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

  useEffect(() => {
    if (!ciclo) navigate(localPath('/estudiar/quimica/ciclos-naturaleza'))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  if (!ciclo) return null

  const total = allSteps.length
  const tituloStr = tr(ciclo.label)
  const descStr = tr(ciclo.descripcion)

  const pageMeta = <SEOHead
    title={tr({ es: `Examen de ${tituloStr}`, en: `${tituloStr} Exam`, ca: `Examen de ${tituloStr}` })}
    description={tr({ es: `Ordena los pasos de ${tituloStr} antes o después. ${descStr}`, en: `Sort the steps of ${tituloStr} before or after. ${descStr}`, ca: `Ordena els passos de ${tituloStr} abans o després. ${descStr}` })}
    path={`/examen/ciclo/${categoria}`} lang={lang} />
  const quizSchema = <QuizSchema
    name={tr({ es: `Examen de ${tituloStr}`, en: `${tituloStr} Exam`, ca: `Examen de ${tituloStr}` })}
    description={descStr}
    path={`/examen/ciclo/${categoria}`} lang={lang}
    subject={tr({ es: 'Ciencias', en: 'Science', ca: 'Ciències' })}
    level="secondary" />

  function startGame() {
    const shuffled = [...allSteps].sort(() => Math.random() - 0.5)
    setTL([shuffled[0]])
    setPending(shuffled.slice(2))
    setCurrent(shuffled[1])
    // Empieza en 1: la primera carta se coloca gratis como semilla de la línea.
    setLives(MAX_LIVES); setPlaced(1)
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
    const correct = getCorrectPosCiclo(current, timeline)
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

    const won = newPlaced >= total

    setTimeout(() => {
      if (won || newLives <= 0 || pending.length === 0) {
        const timeSpent = startRef.current ? Math.round((Date.now() - startRef.current) / 1000) : 0
        const passed = newPlaced >= total
        const coins  = Math.min(Math.round((newPlaced / total) * 200), 200)
        setCoinsToShow(coins)
        if (user) saveActivity(user.uid, {
          type: 'examen', game: 'ciclo-cientifico', category: categoria,
          score: newPlaced * 10, coinsEarned: coins, passed, timeSpent,
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
      {pageMeta}{quizSchema}
      <Intro ciclo={ciclo} total={total} onStart={startGame} tr={tr} />
    </div>
  )

  if (fase === 'resultado') return (
    <div className="relative z-10">
      {pageMeta}{quizSchema}
      <Resultado
        placed={placed} lives={lives} total={total} ciclo={ciclo}
        onRepetir={startGame}
        onSalir={() => navigate(localPath(backPath || '/estudiar/quimica/ciclos-naturaleza'))}
        tr={tr}
      />
      {coinsToShow > 0 && <CoinsAnimation coins={coinsToShow} />}
    </div>
  )

  const progress = Math.round((placed / total) * 100)

  return (
    <div className="relative z-10 flex flex-col" style={{ height: 'calc(100vh - 4rem)' }}>
      {pageMeta}{quizSchema}
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-2 shrink-0 border-b border-white/10 bg-black/20">
        <div className="flex items-center gap-1">
          {Array.from({ length: MAX_LIVES }).map((_, i) => (
            <span key={i} className={`text-xl transition-all ${i < lives ? '' : 'opacity-20 grayscale'}`}>❤️</span>
          ))}
        </div>
        <div className="text-center">
          <p className="text-white font-black text-base leading-none">{placed}/{total}</p>
          <p className="text-white/30 text-xs">{tr({ es: 'colocados', en: 'placed', ca: 'col·locats' })}</p>
        </div>
        <div className="text-right">
          <p className="text-white/50 text-sm font-semibold">{pending.length + 1} {tr({ es: 'restantes', en: 'remaining', ca: 'restants' })}</p>
          <div className="w-16 h-1.5 bg-white/10 rounded-full mt-1 ml-auto overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* PASO ACTUAL */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-4 min-h-0">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-4 text-center font-semibold">
          {phase === 'placing'
            ? tr({ es: '¿Dónde va este paso?', en: 'Where does this step go?', ca: 'On va aquest pas?' })
            : wasCorrect
              ? tr({ es: '✓ ¡Correcto!', en: '✓ Correct!', ca: '✓ Correcte!' })
              : tr({ es: '✗ Incorrecto', en: '✗ Wrong', ca: '✗ Incorrecte' })}
        </p>
        {current && (
          <div className={`w-full max-w-2xl rounded-2xl border-2 p-6 sm:p-8 transition-all duration-300 ${
            phase === 'revealing'
              ? wasCorrect ? 'border-green-500/70 bg-green-500/10' : 'border-red-500/70 bg-red-500/10'
              : 'border-white/20 bg-white/5 backdrop-blur-sm'
          }`}>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">{tr(current.nombre)}</h2>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-6">{tr(current.descripcion)}</p>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-bold px-4 py-1.5 rounded-full border ${DIFICULTAD[current.dificultad].cls}`}>{tr(DIFICULTAD[current.dificultad])}</span>
              <span className={`text-2xl sm:text-3xl font-black tabular-nums transition-all duration-500 ${phase === 'revealing' ? 'text-emerald-400' : 'text-white/15'}`}>
                {phase === 'revealing' ? formatPaso(current.orden, tr) : '????'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* LÍNEA DEL PROCESO */}
      <div className="shrink-0 border-t border-white/10 bg-black/30 backdrop-blur-sm" style={{ minHeight: '11rem' }}>
        <div className="flex items-center justify-between px-4 pt-2 pb-1">
          <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">{tr({ es: 'Tu línea del proceso', en: 'Your process timeline', ca: 'La teva línia del procés' })}</p>
          {phase === 'revealing' && !wasCorrect
            ? <p className="text-green-400 text-xs font-semibold animate-pulse">{tr({ es: '↑ posición correcta en verde', en: '↑ correct position in green', ca: '↑ posició correcta en verd' })}</p>
            : timeline.length > 2 && <p className="text-white/20 text-xs">{tr({ es: '← desliza →', en: '← scroll →', ca: '← llisca →' })}</p>
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
            <SlotBtn index={0} phase={phase} chosen={chosenSlot} correct={correctSlot} onPlace={placeCard} tr={tr} />
            {timeline.map((ev, i) => {
              const big = timeline.length <= 4
              return (
                <div key={ev.id} className="flex items-stretch gap-0">
                  <div className={`flex flex-col justify-between bg-white/10 border border-white/20 rounded-xl mx-1 p-3 transition-all duration-300 ${big ? 'min-w-[150px] max-w-[170px]' : 'min-w-[110px] max-w-[130px]'}`}>
                    <p className={`text-white font-bold leading-snug line-clamp-3 ${big ? 'text-sm' : 'text-xs'}`}>{tr(ev.nombre)}</p>
                    <p className={`text-emerald-400 font-black mt-1 ${big ? 'text-base' : 'text-xs'}`}>{formatPaso(ev.orden, tr)}</p>
                  </div>
                  <SlotBtn index={i + 1} phase={phase} chosen={chosenSlot} correct={correctSlot} onPlace={placeCard} tr={tr} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function SlotBtn({ index, phase, chosen, correct, onPlace, tr }) {
  const isChosen  = phase === 'revealing' && chosen === index
  const isCorrect = phase === 'revealing' && correct === index
  const isActive  = phase === 'placing'

  let cls = 'border-white/20 bg-white/5 text-white/40 hover:border-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 hover:scale-105'
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
      {isActive && <span className="text-[9px] font-bold uppercase tracking-wide opacity-40 mt-0.5">{tr({ es: 'aquí', en: 'here', ca: 'aquí' })}</span>}
    </button>
  )
}
