import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEventosLineaTemporal, getCorrectPos } from '../data/historiaEvents'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import TimelineBoard from '../components/TimelineBoard'

const MAX_LIVES = 3

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
function GameOver({ score, placed, onRepetir, onSalir, lang, user }) {
  const en = lang === 'en'
  let nota
  if (placed >= 20)      nota = lang === 'ca' ? 'HISTORIADOR EXPERT' : en ? 'EXPERT HISTORIAN' : 'HISTORIADOR EXPERTO'
  else if (placed >= 12) nota = lang === 'ca' ? 'BON NIVELL' : en ? 'GOOD LEVEL' : 'BUEN NIVEL'
  else if (placed >= 6)  nota = lang === 'ca' ? 'EN PROGRÉS' : en ? 'IN PROGRESS' : 'EN PROGRESO'
  else                   nota = lang === 'ca' ? 'CONTINUA PRACTICANT' : en ? 'KEEP PRACTISING' : 'SIGUE PRACTICANDO'

  const shareText = `He conseguido ${score.toLocaleString()} pts en Línea Temporal 📜 — ¿puedes superarme? https://tuthor.es/juegos/linea-temporal`

  return (
    <GameEndScreen
      game="orden-temporal"
      emoji="📜"
      title={lang === 'ca' ? 'Partida acabada' : en ? 'Game over' : 'Partida terminada'}
      score={score}
      message={nota}
      stats={[{ label: lang === 'ca' ? 'Col·locades' : en ? 'Placed' : 'Colocadas', value: placed, emoji: '✅' }]}
      shareText={shareText}
      onPlayAgain={onRepetir}
      playAgainLabel={lang === 'ca' ? 'Jugar una altra vegada ↺' : en ? 'Play again ↺' : 'Jugar otra vez ↺'}
      secondaryActions={[{ label: lang === 'ca' ? 'Tornar als Jocs' : en ? 'Back to Games' : 'Volver a Juegos', onClick: onSalir }]}
      user={user} lang={lang}
    />
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
  const startRef   = useRef(null)

  function startGame() {
    const all = getEventosLineaTemporal()
    setTimeline([all[0]])
    setPending(all.slice(2))
    setCurrent(all[1])
    setLives(MAX_LIVES); setScore(0)
    setFase('jugando'); setPhase('placing')
    setChosenSlot(null); setCorrectSlot(null); setWasCorrect(null)
    startRef.current = Date.now()
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
        if (user) saveActivity(user.uid, { type: 'juego', game: 'orden-temporal', score: newScore, passed: newTimeline.length >= 8, timeSpent: t, coinsEarned: computeCoins('orden-temporal', { score: newScore }) }).catch(() => {})
        setFase('gameover'); return
      }
      setCurrent(pending[0]); setPending(p => p.slice(1))
      setPhase('placing'); setChosenSlot(null); setCorrectSlot(null); setWasCorrect(null)
    }, 2000)
  }

  if (fase === 'intro')    return <div className="relative z-10"><SEOHead title={lang==='en'?'Timeline — Sort Historical Events':lang==='ca'?'Línia Temporal — Ordena Esdeveniments Històrics':'Línea Temporal — Ordena Eventos Históricos'} description={lang==='en'?'Place historical events in chronological order without dates. Test your historical knowledge in this free educational game.':lang==='ca'?'Col·loca esdeveniments històrics en ordre cronològic sense veure les dates. Posa a prova el teu coneixement.':'Coloca eventos históricos en orden cronológico sin ver las fechas. Pon a prueba tu conocimiento histórico.'} path={lang==='en'?'/en/juegos/linea-temporal':lang==='ca'?'/ca/juegos/linea-temporal':'/juegos/linea-temporal'} lang={lang} /><Intro onStart={startGame} lang={lang} /></div>
  if (fase === 'gameover') return <div className="relative z-10"><GameOver score={score} placed={timeline.length} onRepetir={startGame} onSalir={() => navigate(localPath('/juegos'))} lang={lang} user={user} /></div>

  const progress = Math.round((timeline.length / (timeline.length + pending.length + 1)) * 100)

  return (
    <div className="relative z-10 flex flex-col" style={{ height: 'calc(100dvh - 4rem)' }}>

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

      <TimelineBoard
        current={current} timeline={timeline} phase={phase} wasCorrect={wasCorrect}
        chosenSlot={chosenSlot} correctSlot={correctSlot} onPlace={placeCard}
        lt={lt} lang={lang} accent="amber"
      />
    </div>
  )
}
