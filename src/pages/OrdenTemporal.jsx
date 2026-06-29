import { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEventosLineaTemporal, getCorrectPos, sortEventos } from '../data/historiaEvents'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { saveActivity } from '../lib/activity'
import CoinsAnimation from '../components/CoinsAnimation'

const MAX_LIVES = 3

function formatYear(y) {
  return y < 0 ? `${Math.abs(y)} a.C.` : `${y}`
}

// ── INTRO ──────────────────────────────────────────────────────────────────────
function Intro({ onStart, lang }) {
  const en = lang === 'en'
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <span className="text-6xl mb-4 block">📜</span>
          <h1 className="text-3xl font-black text-white mb-2">{lang === 'ca' ? 'Línia Temporal' : lang === 'en' ? 'Timeline' : 'Línea Temporal'}</h1>
          <p className="text-white/50 text-sm">{lang === 'ca' ? 'Ordena la història del món' : lang === 'en' ? 'Sort the history of the world' : 'Ordena la historia del mundo'}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 space-y-4">
          {(lang === 'ca' ? [
            { icon: '🃏', title: 'Col·loca la carta al seu lloc', desc: 'Apareix un esdeveniment amb l\'any ocult. Prem el forat correcte a la teva línia del temps.' },
            { icon: '❤️', title: '3 vides', desc: 'Cada error et costa una vida. L\'any es revela sempre per aprendre.' },
            { icon: '📈', title: 'La línia creix amb cada encert', desc: 'Com més cartes col·loquis bé, més difícil. Hi ha 70+ esdeveniments!' },
          ] : en ? [
            { icon: '🃏', title: 'Place the card correctly', desc: 'An event appears with the year hidden. Tap the right gap in your timeline.' },
            { icon: '❤️', title: '3 lives', desc: 'Each mistake costs a life. The year is always revealed so you learn.' },
            { icon: '📈', title: 'The timeline grows', desc: 'The more cards you place correctly, the harder it gets. 70+ events!' },
          ] : [
            { icon: '🃏', title: 'Coloca la carta en su sitio', desc: 'Aparece un evento con el año oculto. Pulsa el hueco correcto en tu línea del tiempo.' },
            { icon: '❤️', title: '3 vidas', desc: 'Cada error te cuesta una vida. El año se revela siempre para aprender.' },
            { icon: '📈', title: 'La línea crece con cada acierto', desc: 'Cuantas más cartas coloques bien, más difícil. ¡Hay 70+ eventos!' },
          ]).map(r => (
            <div key={r.title} className="flex items-start gap-4">
              <span className="text-2xl">{r.icon}</span>
              <div>
                <p className="font-bold text-white text-sm">{r.title}</p>
                <p className="text-white/50 text-xs mt-0.5">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={onStart} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-colors text-lg">
          {lang === 'ca' ? 'Començar →' : en ? 'Start →' : 'Empezar →'}
        </button>
      </div>
    </div>
  )
}

// ── GAME OVER ──────────────────────────────────────────────────────────────────
function GameOver({ score, placed, onRepetir, onSalir, lang }) {
  const en = lang === 'en'
  const [showCoins, setShowCoins] = useState(false)
  const [coinsDone, setCoinsDone] = useState(false)
  let nota, notaColor
  if (placed >= 20)      { nota = lang === 'ca' ? 'HISTORIADOR EXPERT' : en ? 'EXPERT HISTORIAN' : 'HISTORIADOR EXPERTO'; notaColor = 'text-violet-400' }
  else if (placed >= 12) { nota = lang === 'ca' ? 'BON NIVELL' : en ? 'GOOD LEVEL' : 'BUEN NIVEL'; notaColor = 'text-blue-400' }
  else if (placed >= 6)  { nota = lang === 'ca' ? 'EN PROGRÉS' : en ? 'IN PROGRESS' : 'EN PROGRESO'; notaColor = 'text-amber-400' }
  else                   { nota = lang === 'ca' ? 'CONTINUA PRACTICANT' : en ? 'KEEP PRACTISING' : 'SIGUE PRACTICANDO'; notaColor = 'text-white/60' }

  useEffect(() => { if (score > 0) setShowCoins(true) }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{lang === 'ca' ? 'Partida acabada' : en ? 'Game over' : 'Partida terminada'}</p>
          <h1 className={`text-3xl font-black mb-1 ${notaColor}`}>{nota}</h1>
        </div>

        {showCoins && !coinsDone && (
          <div className="mb-6"><CoinsAnimation points={score} onDone={() => setCoinsDone(true)} /></div>
        )}

        {(coinsDone || !showCoins) && (
          <>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[{ val: score, label: lang === 'ca' ? 'Punts' : en ? 'Points' : 'Puntos', emoji: '⭐' }, { val: placed, label: lang === 'ca' ? 'Col·locades' : en ? 'Placed' : 'Colocadas', emoji: '✅' }].map(s => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <span className="text-2xl block mb-1">{s.emoji}</span>
                  <p className="text-2xl font-black text-white">{s.val}</p>
                  <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={onRepetir} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl transition-colors">{lang === 'ca' ? 'Jugar una altra vegada ↺' : en ? 'Play again ↺' : 'Jugar otra vez ↺'}</button>
              <button onClick={onSalir}   className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 font-medium py-3 rounded-xl transition-colors">{lang === 'ca' ? 'Tornar als Jocs' : en ? 'Back to Games' : 'Volver a Juegos'}</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ── MAIN ────────────────────────────────────────────────────────────────────────
export default function OrdenTemporal() {
  const navigate  = useNavigate()
  const { lang, localPath, lt } = useLang()
  const { user }  = useAuth()
  const [fase, setFase]             = useState('intro')
  const [timeline, setTimeline]     = useState([])
  const [pending, setPending]       = useState([])
  const [current, setCurrent]       = useState(null)
  const [lives, setLives]           = useState(MAX_LIVES)
  const [score, setScore]           = useState(0)
  const [phase, setPhase]           = useState('placing')
  const [chosenSlot, setChosenSlot] = useState(null)
  const [correctSlot, setCorrectSlot] = useState(null)
  const [wasCorrect, setWasCorrect] = useState(null)
  const tlRef      = useRef(null)
  const startRef   = useRef(null)
  const dragRef    = useRef({ active: false, startX: 0, scrollLeft: 0 })

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
  // wheel nativo con {passive:false} para poder hacer preventDefault
  useEffect(() => {
    const el = tlRef.current; if (!el) return
    const handler = e => { e.preventDefault(); el.scrollLeft += e.deltaY + e.deltaX }
    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  })

  // Scroll al slot correcto cuando el usuario se equivoca (especialmente en móvil)
  useEffect(() => {
    if (phase !== 'revealing' || wasCorrect !== false || correctSlot === null) return
    const el = tlRef.current; if (!el) return
    const CELL = 210 // aprox card + slot + margen
    const target = correctSlot * CELL - el.clientWidth / 2 + 24
    el.scrollTo({ left: Math.max(0, target), behavior: 'smooth' })
  }, [phase, wasCorrect, correctSlot])

  function startGame() {
    const all = getEventosLineaTemporal()
    setTimeline([all[0]])
    setPending(all.slice(2))
    setCurrent(all[1])
    setLives(MAX_LIVES); setScore(0)
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

    let newTimeline = timeline, newLives = lives, newScore = score
    if (ok) {
      newTimeline = [...timeline]; newTimeline.splice(slot, 0, current)
      setTimeline(newTimeline)
      newScore = score + Math.max(20, 50 - timeline.length * 2); setScore(newScore)
    } else {
      newLives = lives - 1; setLives(newLives)
    }

    setTimeout(() => {
      if (newLives <= 0 || pending.length === 0) {
        const t = startRef.current ? Math.round((Date.now() - startRef.current) / 1000) : 0
        if (user) saveActivity(user.uid, { type: 'juego', game: 'orden-temporal', score: newScore, passed: newTimeline.length >= 8, timeSpent: t }).catch(() => {})
        setFase('gameover'); return
      }
      setCurrent(pending[0]); setPending(p => p.slice(1))
      setPhase('placing'); setChosenSlot(null); setCorrectSlot(null); setWasCorrect(null)
      setTimeout(() => {
        const el = tlRef.current
        if (el) el.scrollTo({ left: (el.scrollWidth - el.clientWidth) / 2, behavior: 'smooth' })
      }, 100)
    }, 2000)
  }

  if (fase === 'intro')    return <div className="relative z-10"><Intro onStart={startGame} lang={lang} /></div>
  if (fase === 'gameover') return <div className="relative z-10"><GameOver score={score} placed={timeline.length} onRepetir={startGame} onSalir={() => navigate(localPath('/juegos'))} lang={lang} /></div>

  const dif = { fácil: 'text-green-400 bg-green-500/10 border-green-500/30', medio: 'text-amber-400 bg-amber-500/10 border-amber-500/30', difícil: 'text-red-400 bg-red-500/10 border-red-500/30' }
  const progress = Math.round((timeline.length / (timeline.length + pending.length + 1)) * 100)

  return (
    <div className="relative z-10 flex flex-col" style={{ height: 'calc(100vh - 4rem)' }}>

      {/* ── HEADER ── */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-2 shrink-0 border-b border-white/10 bg-black/20">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: MAX_LIVES }).map((_, i) => (
            <span key={i} className={`text-xl sm:text-2xl transition-all ${i < lives ? '' : 'opacity-20 grayscale'}`}>❤️</span>
          ))}
        </div>
        <div className="text-center">
          <p className="text-white font-black text-lg sm:text-xl leading-none">{score} pts</p>
          <p className="text-white/30 text-xs">{timeline.length} {lang === 'ca' ? 'col·locades' : lang === 'en' ? 'placed' : 'colocadas'}</p>
        </div>
        <div className="text-right">
          <p className="text-white/50 text-sm font-semibold">{pending.length + 1} {lang === 'ca' ? 'restants' : lang === 'en' ? 'remaining' : 'restantes'}</p>
          <div className="w-16 h-1.5 bg-white/10 rounded-full mt-1 ml-auto overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* ── CARTA ACTUAL ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-4 min-h-0">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-4 text-center font-semibold">
          {phase === 'placing' ? (lang === 'ca' ? 'On va aquesta carta?' : lang === 'en' ? 'Where does this card go?' : '¿Dónde va esta carta?') : wasCorrect ? (lang === 'ca' ? '✓ Correcte!' : lang === 'en' ? '✓ Correct!' : '✓ ¡Correcto!') : (lang === 'ca' ? '✗ Incorrecte' : lang === 'en' ? '✗ Incorrect' : '✗ Incorrecto')}
        </p>

        {current && (
          <div className={`w-full max-w-2xl rounded-2xl border-2 p-6 sm:p-8 transition-all duration-300 ${
            phase === 'revealing'
              ? wasCorrect ? 'border-green-500/70 bg-green-500/10' : 'border-red-500/70 bg-red-500/10'
              : 'border-white/20 bg-white/5 backdrop-blur-sm'
          }`}>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">{lt(current, 'nombre')}</h2>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-6">{lt(current, 'descripcion')}</p>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-bold px-4 py-1.5 rounded-full border ${dif[current.dificultad]}`}>{current.dificultad}</span>
              <span className={`text-4xl sm:text-5xl font-black tabular-nums transition-all duration-500 ${phase === 'revealing' ? 'text-amber-400' : 'text-white/15'}`}>
                {phase === 'revealing' ? formatYear(current.año) : '????'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── LÍNEA DEL TIEMPO ── */}
      <div className="shrink-0 border-t border-white/10 bg-black/30 backdrop-blur-sm" style={{ minHeight: '11rem' }}>
        <div className="flex items-center justify-between px-4 pt-2 pb-1">
          <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">{lang === 'ca' ? 'La teva línia del temps' : lang === 'en' ? 'Your timeline' : 'Tu línea del tiempo'}</p>
          {phase === 'revealing' && !wasCorrect
            ? <p className="text-green-400 text-xs font-semibold animate-pulse">{lang === 'ca' ? '↑ posició correcta en verd' : lang === 'en' ? '↑ correct position in green' : '↑ posición correcta en verde'}</p>
            : timeline.length > 2 && <p className="text-white/20 text-xs">{lang === 'ca' ? '← llisca →' : lang === 'en' ? '← scroll →' : '← desliza →'}</p>
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
          <div
            className="flex items-stretch px-3 gap-0"
            style={{ minWidth: 'max-content', minHeight: '7.5rem' }}
          >
            <SlotBtn index={0} phase={phase} chosen={chosenSlot} correct={correctSlot} onPlace={placeCard} />

            {timeline.map((ev, i) => {
              const big = timeline.length <= 4
              return (
                <div key={ev.id} className="flex items-stretch gap-0">
                  <div className={`flex flex-col justify-between bg-white/10 border border-white/20 rounded-xl mx-1 p-3 transition-all duration-300 ${big ? 'min-w-[150px] max-w-[170px]' : 'min-w-[110px] max-w-[130px]'}`}>
                    <p className={`text-white font-bold leading-snug line-clamp-3 ${big ? 'text-sm' : 'text-xs'}`}>{lt(ev, 'nombre')}</p>
                    <p className={`text-amber-400 font-black mt-1 ${big ? 'text-lg' : 'text-sm'}`}>{formatYear(ev.año)}</p>
                  </div>
                  <SlotBtn index={i + 1} phase={phase} chosen={chosenSlot} correct={correctSlot} onPlace={placeCard} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── SLOT BUTTON ────────────────────────────────────────────────────────────────
function SlotBtn({ index, phase, chosen, correct, onPlace }) {
  const isChosen  = phase === 'revealing' && chosen === index
  const isCorrect = phase === 'revealing' && correct === index
  const isActive  = phase === 'placing'

  let cls = 'border-white/20 bg-white/5 text-white/40 hover:border-amber-400 hover:bg-amber-500/20 hover:text-amber-300 hover:scale-105'
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
      {isActive && <span className="text-[9px] font-bold uppercase tracking-wide opacity-40 mt-0.5">aquí</span>}
    </button>
  )
}
