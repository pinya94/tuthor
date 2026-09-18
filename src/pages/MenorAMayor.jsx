import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { nuevoMazo, posicionCorrecta } from '../lib/menorAMayor'
import GameEndScreen from '../components/GameEndScreen'
import SupportBlock from '../components/SupportBlock'
import SEOHead from '../components/SEOHead'
import TimelineBoard from '../components/TimelineBoard'

const MAX_VIDAS = 3
const CARTAS = 12

const DIFS = [
  { id: 'facil',   emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },     que: { es: 'Decimales y fracciones sencillas', en: 'Decimals and simple fractions', ca: 'Decimals i fraccions senzilles' } },
  { id: 'medio',   emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },   que: { es: 'Fracciones, decimales y porcentajes mezclados', en: 'Fractions, decimals and percentages mixed', ca: 'Fraccions, decimals i percentatges barrejats' } },
  { id: 'dificil', emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, que: { es: 'Todo lo anterior y números negativos', en: 'All of the above plus negative numbers', ca: 'Tot l\'anterior i nombres negatius' } },
]

const TIPO_LABEL = {
  fraccion:   { es: 'fracción', en: 'fraction', ca: 'fracció' },
  decimal:    { es: 'decimal', en: 'decimal', ca: 'decimal' },
  porcentaje: { es: 'porcentaje', en: 'percentage', ca: 'percentatge' },
  entero:     { es: 'entero', en: 'integer', ca: 'enter' },
}

export default function MenorAMayor() {
  const navigate = useNavigate()
  const { lang, localPath, tr } = useLang()
  const { user } = useAuth()

  const [fase, setFase]       = useState('intro') // intro | jugando | fin
  const [difId, setDifId]     = useState('medio')
  const [recta, setRecta]     = useState([])
  const [pending, setPending] = useState([])
  const [current, setCurrent] = useState(null)
  const [vidas, setVidas]     = useState(MAX_VIDAS)
  const [score, setScore]     = useState(0)
  const [colocadas, setColocadas] = useState(0)
  const [phase, setPhase]     = useState('placing')
  const [chosenSlot, setChosenSlot]   = useState(null)
  const [correctSlot, setCorrectSlot] = useState(null)
  const [wasCorrect, setWasCorrect]   = useState(null)
  const [saved, setSaved]     = useState(false)
  const startRef = useRef(null)

  function empezar(selected) {
    const mazo = nuevoMazo(selected, CARTAS)
    setDifId(selected)
    setRecta([mazo[0]])
    setPending(mazo.slice(2))
    setCurrent(mazo[1])
    setVidas(MAX_VIDAS); setScore(0); setColocadas(0)
    setPhase('placing'); setChosenSlot(null); setCorrectSlot(null); setWasCorrect(null)
    setSaved(false)
    setFase('jugando')
    startRef.current = Date.now()
  }

  function colocar(slot) {
    if (phase !== 'placing' || !current) return
    const correct = posicionCorrecta(current, recta)
    setChosenSlot(slot); setCorrectSlot(correct); setPhase('revealing')
    const ok = slot === correct
    setWasCorrect(ok)

    let nuevaRecta = recta, vidasR = vidas, scoreN = score, colN = colocadas
    if (ok) {
      nuevaRecta = [...recta]; nuevaRecta.splice(slot, 0, current)
      setRecta(nuevaRecta)
      scoreN = score + Math.max(20, 50 - recta.length * 2); setScore(scoreN)
      colN = colocadas + 1; setColocadas(colN)
    } else {
      vidasR = vidas - 1; setVidas(vidasR)
    }

    setTimeout(() => {
      if (vidasR <= 0 || pending.length === 0) {
        if (user && !saved) {
          setSaved(true)
          const t = startRef.current ? Math.round((Date.now() - startRef.current) / 1000) : 0
          saveActivity(user.uid, {
            type: 'juego', game: 'menor-a-mayor', category: difId,
            score: scoreN, passed: colN >= 6, timeSpent: t,
            coinsEarned: computeCoins('menor-a-mayor', { score: scoreN }),
            userName: user.displayName, userPhoto: user.photoURL,
          }).catch(() => {})
        }
        setFase('fin'); return
      }
      setCurrent(pending[0]); setPending(p => p.slice(1))
      setPhase('placing'); setChosenSlot(null); setCorrectSlot(null); setWasCorrect(null)
    }, 1700)
  }

  const seo = {
    es: { title: 'De Menor a Mayor — ordena fracciones, decimales y porcentajes', desc: 'Coloca cada número en su sitio en la recta, de menor a mayor: fracciones, decimales, porcentajes y negativos mezclados. Al colocarlo se revela su valor decimal. Juego de matemáticas gratis.', path: '/juegos/menor-a-mayor' },
    en: { title: 'Least to Greatest — order fractions, decimals and percentages', desc: 'Place each number in order from least to greatest: fractions, decimals, percentages and negatives mixed. Its decimal value is revealed when you place it. Free maths game.', path: '/en/juegos/menor-a-mayor' },
    ca: { title: 'De Menor a Major — ordena fraccions, decimals i percentatges', desc: 'Col·loca cada nombre al seu lloc a la recta, de menor a major: fraccions, decimals, percentatges i negatius barrejats. En col·locar-lo es revela el seu valor decimal. Joc de matemàtiques gratis.', path: '/ca/juegos/menor-a-mayor' },
  }[lang] ?? null

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (fase === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100dvh-4rem)] px-4 py-8">
        {seo && <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={lang} />}
        <div className="max-w-xl w-full flex flex-col items-center">
          <button onClick={() => navigate(localPath('/juegos'))}
            className="text-white/30 hover:text-white/60 text-sm mb-6 self-start transition-colors">
            {tr({ es: '← Volver', en: '← Back', ca: '← Tornar' })}
          </button>

          <SupportBlock variant="top" className="mb-5 w-full" />

          <div className="text-center mb-7">
            <span className="text-7xl block mb-4">📶</span>
            <h1 className="text-4xl font-black text-white mb-2">{tr({ es: 'De Menor a Mayor', en: 'Least to Greatest', ca: 'De Menor a Major' })}</h1>
            <p className="text-white/40">{tr({ es: 'Ordena números escritos de formas distintas', en: 'Order numbers written in different ways', ca: 'Ordena nombres escrits de maneres diferents' })}</p>
          </div>

          <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl mb-3 w-full sm:w-fit sm:mx-auto">
            {DIFS.map(d => (
              <button key={d.id} onClick={() => setDifId(d.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  difId === d.id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'
                }`}>
                {d.emoji} {tr(d.label)}
              </button>
            ))}
          </div>
          <p className="text-white/40 text-sm text-center mb-6">{tr(DIFS.find(d => d.id === difId).que)}</p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 w-full">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{tr({ es: 'Cómo funciona', en: 'How it works', ca: 'Com funciona' })}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                ['🃏', tr({ es: 'Aparece un número. Colócalo en su sitio en la recta, de menor a mayor.', en: 'A number appears. Place it in order on the line, least to greatest.', ca: 'Apareix un nombre. Col·loca\'l al seu lloc a la recta, de menor a major.' })],
                ['💡', tr({ es: 'Al colocarlo se revela su valor decimal — así aprendes a compararlos.', en: 'Its decimal value shows when you place it — so you learn to compare them.', ca: 'En col·locar-lo es revela el seu valor decimal — així aprens a comparar-los.' })],
                ['❤️', tr({ es: `Tienes ${MAX_VIDAS} vidas. Cada error cuesta una.`, en: `You have ${MAX_VIDAS} lives. Each mistake costs one.`, ca: `Tens ${MAX_VIDAS} vides. Cada error en costa una.` })],
                ['🏆', tr({ es: 'Coloca todas las que puedas antes de quedarte sin vidas.', en: 'Place as many as you can before you run out of lives.', ca: 'Col·loca\'n tantes com puguis abans de quedar-te sense vides.' })],
              ].map(([e, txt]) => (
                <div key={txt} className="flex items-start gap-2 text-sm text-white/50">
                  <span className="text-base w-5 shrink-0 text-center">{e}</span>
                  <span>{txt}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => empezar(difId)}
            className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-sky-500/30">
            {tr({ es: '¡Empezar! →', en: 'Start! →', ca: 'Començar! →' })}
          </button>
        </div>
      </div>
    )
  }

  // ── FIN ─────────────────────────────────────────────────────────────────────
  if (fase === 'fin') {
    const shareText = tr({
      es: `He ordenado ${colocadas} números y hecho ${score.toLocaleString()} pts en De Menor a Mayor 📶 — ¿puedes superarme? https://tuthor.es/juegos/menor-a-mayor`,
      en: `I ordered ${colocadas} numbers and scored ${score.toLocaleString()} pts in Least to Greatest 📶 — can you beat me? https://tuthor.es/juegos/menor-a-mayor`,
      ca: `He ordenat ${colocadas} nombres i he fet ${score.toLocaleString()} pts a De Menor a Major 📶 — pots superar-me? https://tuthor.es/juegos/menor-a-mayor`,
    })
    const dif = DIFS.find(d => d.id === difId)
    return (
      <GameEndScreen
        game="menor-a-mayor"
        emoji="📶"
        title={`${tr({ es: 'Partida terminada', en: 'Game over', ca: 'Partida acabada' })} · ${dif.emoji} ${tr(dif.label)}`}
        score={score}
        stats={[{ label: tr({ es: 'Ordenadas', en: 'Ordered', ca: 'Ordenades' }), value: colocadas, emoji: '✅' }]}
        shareText={shareText}
        onPlayAgain={() => empezar(difId)}
        playAgainLabel={tr({ es: 'Jugar otra vez ↺', en: 'Play again ↺', ca: 'Jugar una altra vegada ↺' })}
        secondaryActions={[{ label: tr({ es: 'Cambiar dificultad', en: 'Change difficulty', ca: 'Canviar dificultat' }), onClick: () => setFase('intro') }]}
        user={user} lang={lang}
      />
    )
  }

  // ── JUGANDO ───────────────────────────────────────────────────────────────
  const restantes = pending.length + 1
  const progreso = Math.round((colocadas / CARTAS) * 100)

  return (
    <div className="relative z-10 flex flex-col" style={{ height: 'calc(100dvh - 4rem)' }}>
      {seo && <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={lang} />}

      {/* HEADER */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-2 shrink-0 border-b border-white/10 bg-black/20">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: MAX_VIDAS }).map((_, i) => (
            <span key={i} className={`text-xl sm:text-2xl transition-all ${i < vidas ? '' : 'opacity-20 grayscale'}`}>❤️</span>
          ))}
        </div>
        <div className="text-center">
          <p className="text-white font-black text-lg sm:text-xl leading-none">{score} pts</p>
          <p className="text-white/30 text-xs">{colocadas} {tr({ es: 'ordenadas', en: 'ordered', ca: 'ordenades' })}</p>
        </div>
        <div className="text-right">
          <p className="text-white/50 text-sm font-semibold">{restantes} {tr({ es: 'restantes', en: 'remaining', ca: 'restants' })}</p>
          <div className="w-16 h-1.5 bg-white/10 rounded-full mt-1 ml-auto overflow-hidden">
            <div className="h-full bg-sky-500 rounded-full transition-all duration-500" style={{ width: `${progreso}%` }} />
          </div>
        </div>
      </div>

      <TimelineBoard
        current={current} timeline={recta} phase={phase} wasCorrect={wasCorrect}
        chosenSlot={chosenSlot} correctSlot={correctSlot} onPlace={colocar}
        lang={lang} accent="sky"
        tuLineaLabel={{ es: 'Tu recta, de menor a mayor', en: 'Your line, least to greatest', ca: 'La teva recta, de menor a major' }}
        getName={it => it.expr}
        getDesc={() => ''}
        getReveal={it => it.decimal}
        getBadge={it => ({ text: tr(TIPO_LABEL[it.tipo]), cls: 'text-sky-300 bg-sky-500/10 border-sky-500/30' })}
      />
    </div>
  )
}
