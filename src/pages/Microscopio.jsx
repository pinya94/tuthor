import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { CELULAS } from '../data/organulos'
import { MODOS, genRound, esCorrecta, enunciado } from '../lib/microscopio'
import { nuevaRonda } from '../lib/preparaciones'
import CelulaSVG from '../components/CelulaSVG'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 3
const REVEAL_MS = 3000
const MEMORIA = 5

const C = {
  badge:   { es: 'Biología · La célula', en: 'Biology · The cell', ca: 'Biologia · La cèl·lula' },
  title:   { es: '🔬 Bajo el Microscopio', en: '🔬 Under the Microscope', ca: '🔬 Sota el Microscopi' },
  sub:     { es: 'Toca el orgánulo que se te pide', en: 'Tap the organelle you are asked for', ca: 'Toca l\'orgànul que se\'t demana' },
  queEs:   { es: '¿De qué va?', en: 'What is it about?', ca: 'De què va?' },
  q1:      { es: 'Aparece una célula dibujada —a veces animal, a veces vegetal— y tienes que tocar la parte que se te pide.', en: 'A drawn cell appears — sometimes animal, sometimes plant — and you tap the part you are asked for.', ca: 'Apareix una cèl·lula dibuixada —a vegades animal, a vegades vegetal— i has de tocar la part que se\'t demana.' },
  q2:      { es: 'Unas veces te dicen el nombre y otras solo lo que hace, que es como se pregunta en un examen.', en: 'Sometimes you get the name, sometimes only what it does — which is how an exam asks.', ca: 'De vegades et diuen el nom i d\'altres només què fa, que és com es pregunta en un examen.' },
  q3:      { es: 'Fíjate en qué célula te ha tocado: los cloroplastos y la pared solo están en la vegetal, y los centriolos solo en la animal.', en: 'Watch which cell you got: chloroplasts and the wall are only in the plant one, centrioles only in the animal one.', ca: 'Fixa\'t en quina cèl·lula t\'ha tocat: els cloroplasts i la paret només són a la vegetal.' },
  q4:      { es: 'O cambia a preparaciones reales: fotos de verdad al microscopio —un piojo, una pulga, una hoja, sangre, sal— con una zona señalada que tienes que identificar.', en: 'Or switch to real slides: actual microscope photos —a louse, a flea, a leaf, blood, salt— with one area circled for you to identify.', ca: 'O canvia a preparacions reals: fotos de veritat al microscopi —un poll, una puça, una fulla, sang, sal— amb una zona marcada que has d\'identificar.' },
  how:     { es: 'Cómo funciona', en: 'How it works', ca: 'Com funciona' },
  modo:    { es: '¿Cómo quieres que te pregunte?', en: 'How should it ask you?', ca: 'Com vols que et pregunti?' },
  ptsVal:  { es: 'Acierto +1 y +3s · Fallo −5s', en: 'Correct +1 and +3s · Wrong −5s', ca: 'Encert +1 i +3s · Error −5s' },
  start:   { es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' },
  fuente:  { es: '¿Qué quieres mirar?', en: 'What do you want to look at?', ca: 'Què vols mirar?' },
  fCelula: { es: '🧫 Célula dibujada', en: '🧫 Drawn cell', ca: '🧫 Cèl·lula dibuixada' },
  fPrep:   { es: '📷 Preparaciones reales', en: '📷 Real slides', ca: '📷 Preparacions reals' },
  quEs:    { es: '¿Qué es lo señalado?', en: 'What is circled?', ca: 'Què és el que està marcat?' },
  buscar:  { es: 'Toca', en: 'Tap', ca: 'Toca' },
  elQue:   { es: 'Toca el que…', en: 'Tap the one that…', ca: 'Toca el que…' },
  end:     { es: 'Tiempo', en: "Time's up", ca: 'Temps' },
  hits:    { es: 'aciertos', en: 'correct', ca: 'encerts' },
  scoreLbl:{ es: 'puntos', en: 'points', ca: 'punts' },
  era:     { es: 'Era', en: 'It was', ca: 'Era' },
  back:    { es: '← Volver', en: '← Back', ca: '← Tornar' },
  otroModo:{ es: 'Cambiar de modo', en: 'Change mode', ca: 'Canviar de mode' },
}
const T = (k, l) => C[k]?.[l] ?? C[k]?.es ?? k

function IntroScreen({ onStart, l }) {
  const [modo, setModo] = useState('mixto')
  // 'celula' = la célula dibujada de siempre (se PULSA el orgánulo, cada uno
  // es una forma del SVG). 'prep' = fotos reales con una zona ya señalada, y
  // se IDENTIFICA entre opciones: sobre una foto no hay formas que pulsar.
  const [fuente, setFuente] = useState('celula')
  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{T('badge', l)}</p>
        <h1 className="text-3xl font-black text-white text-center mb-1">{T('title', l)}</h1>
        <p className="text-white/40 text-sm text-center mb-6">{T('sub', l)}</p>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 mb-3">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{T('queEs', l)}</p>
          <div className="space-y-2 text-white/70 text-sm">
            <p>{T('q1', l)}</p>
            <p>{T('q2', l)}</p>
            <p>{T('q3', l)}</p>
            <p>{T('q4', l)}</p>
          </div>
        </div>

        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-2">{T('fuente', l)}</p>
        <div className="grid grid-cols-2 gap-1.5 mb-4">
          {[{ id: 'celula', txt: T('fCelula', l) }, { id: 'prep', txt: T('fPrep', l) }].map(f => (
            <button key={f.id} onClick={() => setFuente(f.id)}
              className={`px-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                fuente === f.id ? 'bg-white/15 border-white/20 text-white' : 'bg-white/5 border-white/10 text-white/40 hover:text-white/70'}`}>
              {f.txt}
            </button>
          ))}
        </div>

        {/* El modo de pregunta (nombre / función) solo aplica a la célula: en
            las fotos siempre se pregunta lo mismo, qué es lo señalado. */}
        {fuente === 'celula' && (
          <>
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-2">{T('modo', l)}</p>
            <div className="grid grid-cols-3 gap-1.5 mb-4">
              {Object.entries(MODOS).map(([id, m]) => (
                <button key={id} onClick={() => setModo(id)}
                  className={`px-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                    modo === id ? 'bg-white/15 border-white/20 text-white' : 'bg-white/5 border-white/10 text-white/40 hover:text-white/70'}`}>
                  {m.label[l] ?? m.label.es}
                </button>
              ))}
            </div>
          </>
        )}

        <p className="text-white/40 text-xs text-center mb-5">⏱️ {GAME_TIME}s · {T('ptsVal', l)}</p>

        <button onClick={() => onStart(modo, fuente)}
          className="w-full py-3.5 rounded-2xl bg-[#EDAE49] text-black font-black text-lg hover:bg-amber-400 transition-colors">
          {T('start', l)}
        </button>
      </div>
    </div>
  )
}

export default function Microscopio() {
  const { lang, localPath } = useLang()
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'

  const backPath = location.state?.backPath

  const [screen, setScreen] = useState('intro')
  const [modo, setModo] = useState('mixto')
  const [fuente, setFuente] = useState('celula')
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [correctCount, setCorrectCount] = useState(0)
  const [streak, setStreak] = useState(0)
  const [round, setRound] = useState(null)
  const [elegido, setElegido] = useState(null)
  const [phase, setPhase] = useState('choose')

  const timerRef = useRef(null)
  const nextRef = useRef(null)
  const vistosRef = useRef([])
  const correctRef = useRef(0)
  useEffect(() => { correctRef.current = correctCount }, [correctCount])

  const next = useCallback((m, f) => {
    // Dos generadores, una sola pantalla: la ronda de preparación se
    // reconoce por traer `preparacion`. La memoria de vistos evita repetir
    // lo mismo seguido en los dos casos.
    const r = f === 'prep'
      ? nuevaRonda('todas', l)
      : genRound(m, { evitar: vistosRef.current })
    vistosRef.current = [r.preparacion ? `${r.preparacion.id}:${r.zona.id}` : r.organulo.id, ...vistosRef.current].slice(0, MEMORIA)
    setRound(r)
    setElegido(null)
    setPhase('choose')
  }, [l])

  const startGame = useCallback((m, f = 'celula') => {
    setModo(m)
    setFuente(f)
    setScreen('playing')
    setCorrectCount(0); setStreak(0)
    setTimeLeft(GAME_TIME)
    vistosRef.current = []
    next(m, f)
  }, [next])

  // Declarada antes del reloj que la llama, para que el intervalo no se quede
  // atado a una versión vieja.
  function finish() {
    clearTimeout(nextRef.current)
    setScreen('end')
    const pts = correctRef.current * 10
    if (user) {
      saveActivity(user.uid, {
        type: 'juego', game: 'microscopio',
        // Sin categoría en las preparaciones: si guardaran 'celula', un
        // alumno completaría una tarea de la célula nombrando patas de
        // pulga (ver taskMatchesPlay en topicCatalog.js).
        category: fuente === 'celula' ? 'celula' : null,
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('microscopio', { score: pts }),
        userName: user.displayName, userPhoto: user.photoURL,
      }).catch(() => {})
    }
  }

  useEffect(() => {
    // Parado mientras se lee la explicación: el tiempo de leer por qué era esa
    // la respuesta no debe costar la partida.
    if (screen !== 'playing' || phase === 'result') return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); finish(); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [screen, phase]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => clearTimeout(nextRef.current), [])

  // En la célula `id` es el id del orgánulo pulsado; en una preparación es
  // el texto de la opción elegida, que se compara con el nombre de la zona.
  const acierta = (r, id) => (r.preparacion
    ? id === (r.zona.nombre[l] ?? r.zona.nombre.es)
    : esCorrecta(r, id))

  function pick(id) {
    if (phase !== 'choose') return
    setElegido(id)
    setPhase('result')
    if (acierta(round, id)) {
      setCorrectCount(c => c + 1)
      setStreak(s => s + 1)
      setTimeLeft(t => t + CORRECT_TIME)
    } else {
      setStreak(0)
      setTimeLeft(t => Math.max(0, t - WRONG_TIME))
    }
    nextRef.current = setTimeout(() => next(modo, fuente), REVEAL_MS)
  }

  const seo = {
    es: { title: 'Bajo el Microscopio — La célula y preparaciones reales', desc: 'Toca el orgánulo que se te pide sobre una célula animal o vegetal (núcleo, mitocondrias, cloroplastos…) o identifica lo señalado en fotos de verdad al microscopio: un piojo, una pulga, una hoja, sangre y cristales de sal. Juego de biología gratis.', path: '/juegos/microscopio' },
    en: { title: 'Under the Microscope — The cell and real slides', desc: 'Tap the organelle you are asked for on an animal or plant cell (nucleus, mitochondria, chloroplasts…) or identify what is circled in real microscope photos: a louse, a flea, a leaf, blood and salt crystals. Free biology game.', path: '/en/juegos/microscopio' },
    ca: { title: 'Sota el Microscopi — La cèl·lula i preparacions reals', desc: 'Toca l\'orgànul que se\'t demana sobre una cèl·lula animal o vegetal, o identifica el que està marcat en fotos de veritat al microscopi: un poll, una puça, una fulla, sang i cristalls de sal. Joc de biologia gratis.', path: '/ca/juegos/microscopio' },
  }[l]

  if (screen === 'intro') {
    return (<><SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} /><IntroScreen onStart={startGame} l={l} /></>)
  }

  if (screen === 'end') {
    const pts = correctCount * 10
    const msg = {
      es: correctCount === 0 ? '¡Sigue practicando!' : correctCount < 5 ? 'Buen comienzo' : correctCount < 10 ? '¡Bien hecho!' : '¡Célula dominada! 🔬',
      en: correctCount === 0 ? 'Keep practising!' : correctCount < 5 ? 'Good start' : correctCount < 10 ? 'Well done!' : 'Cell mastered! 🔬',
      ca: correctCount === 0 ? 'Segueix practicant!' : correctCount < 5 ? 'Bon començament' : correctCount < 10 ? 'Ben fet!' : 'Cèl·lula dominada! 🔬',
    }[l]
    const shareText = l === 'en'
      ? `I found ${correctCount} organelles in Under the Microscope 🔬 — can you beat me? https://tuthor.es/juegos/microscopio`
      : l === 'ca'
      ? `He trobat ${correctCount} orgànuls a Sota el Microscopi 🔬 — pots superar-me? https://tuthor.es/juegos/microscopio`
      : `He encontrado ${correctCount} orgánulos en Bajo el Microscopio 🔬 — ¿puedes superarme? https://tuthor.es/juegos/microscopio`
    const secondary = [{ label: T('otroModo', l), onClick: () => setScreen('intro') }]
    if (backPath) secondary.push({ label: T('back', l), onClick: () => navigate(localPath(backPath)) })
    return (
      <GameEndScreen game="microscopio" emoji="🔬" title={T('end', l)} score={pts} message={msg}
        stats={[{ label: T('hits', l), value: correctCount, emoji: '✅' }]}
        shareText={shareText} user={user} lang={l}
        onPlayAgain={() => startGame(modo, fuente)}
        secondaryActions={secondary} />
    )
  }

  if (!round) return null

  const timerColor = timeLeft > GAME_TIME * 0.66 ? '#22c55e' : timeLeft > GAME_TIME * 0.28 ? '#f59e0b' : '#ef4444'
  const timerPct = timeLeft / GAME_TIME
  const isResult = phase === 'result'
  const acerto = isResult && acierta(round, elegido)
  const esPrep = Boolean(round.preparacion)
  const celula = esPrep ? null : CELULAS[round.tipo]
  const nombreZona = esPrep ? (round.zona.nombre[l] ?? round.zona.nombre.es) : null

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-2 sm:px-4 py-4">
      <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />

      <div className="w-full max-w-[560px] flex items-center justify-between mb-3 px-1">
        <div>
          {/* En preparaciones NO se nombra la foto hasta responder: decir
              "piojo humano" aquí resolvería la pregunta sin mirar la marca,
              porque bastaría descartar las opciones de los otros bichos. */}
          <p className="text-white/40 text-xs uppercase tracking-widest">
            {esPrep
              ? `📷 ${T('fPrep', l)}`
              : `${celula.emoji} ${celula.label[l] ?? celula.label.es}`}
          </p>
          <p className="text-white font-bold text-lg flex items-center gap-2">
            {correctCount} {T('scoreLbl', l)}
            {streak >= 2 && <span className="text-orange-400 text-sm font-black">🔥 {streak}</span>}
          </p>
        </div>
        <div className="relative w-14 h-14">
          <svg className="absolute inset-0" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="24" fill="none" stroke="#ffffff15" strokeWidth="4" />
            <circle cx="28" cy="28" r="24" fill="none" stroke={timerColor} strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 24}`} strokeDashoffset={`${2 * Math.PI * 24 * (1 - timerPct)}`}
              strokeLinecap="round" style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dashoffset 1s linear' }} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-black text-sm" style={{ color: timerColor }}>{timeLeft}</span>
          </div>
        </div>
      </div>

      <p className="text-white/50 text-xs uppercase tracking-widest mb-1">
        {esPrep ? T('quEs', l) : round.preguntaPor === 'nombre' ? T('buscar', l) : T('elQue', l)}
      </p>
      <p className="text-white text-lg sm:text-xl font-bold mb-3 text-center px-2 min-h-[56px]">
        {esPrep ? T('quEs', l) : enunciado(round, l)}
      </p>

      {esPrep ? (
        <>
          {/* La marca va como capa encima, nunca tocando el fichero: además
              de ser más simple, evita crear una obra derivada de la foto
              (ver public/microscopio/PROCEDENCIA.md). Se dimensiona en % del
              ANCHO con aspect-square para que siga siendo un círculo sea
              cual sea la proporción de la imagen. */}
          <div className="relative w-full max-w-[420px] rounded-2xl overflow-hidden border border-white/10 mb-3">
            <img src={round.preparacion.foto} alt="" className="w-full block" />
            <span
              className="absolute rounded-full border-[3px] border-cyan-300 shadow-[0_0_0_9999px_rgba(0,0,0,0.35)] aspect-square pointer-events-none"
              style={{
                left: `${round.zona.marca.cx - round.zona.marca.r}%`,
                top: `${round.zona.marca.cy - round.zona.marca.r}%`,
                width: `${round.zona.marca.r * 2}%`,
              }}
            />
          </div>

          <div className="w-full max-w-[420px] grid grid-cols-2 gap-2 mb-3">
            {round.opciones.map(op => {
              const esta = elegido === op
              const buena = isResult && op === nombreZona
              return (
                <button key={op} type="button" disabled={isResult} onClick={() => pick(op)}
                  className={`px-3 py-3 rounded-xl text-[13px] font-bold border transition-colors ${
                    buena ? 'bg-green-500/20 border-green-500/50 text-green-300'
                      : esta ? 'bg-red-500/20 border-red-500/50 text-red-300'
                      : 'bg-white/5 border-white/10 text-white/75 hover:bg-white/10'}`}>
                  {op}
                </button>
              )
            })}
          </div>
        </>
      ) : (
        <div className="w-full max-w-[520px] rounded-2xl border border-white/10 bg-white/5 p-3 mb-3">
          <CelulaSVG tipo={round.tipo} onPick={isResult ? null : pick}
            elegido={elegido} correcto={isResult ? round.organulo.id : null} revelado={isResult} />
        </div>
      )}

      {isResult && (
        <div className="w-full max-w-[520px] px-1 space-y-2">
          <p className={`text-center font-black ${acerto ? 'text-green-400' : 'text-red-400'}`}>
            {acerto ? '✓' : '✗'} {T('era', l)}: {esPrep ? nombreZona : (round.organulo.nombre[l] ?? round.organulo.nombre.es)}
          </p>
          {/* El detalle es lo que de verdad enseña: sale siempre, se acierte o no */}
          <div className="rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">
            <p className="text-white/70 text-sm">
              💡 {esPrep
                ? (round.zona.dato[l] ?? round.zona.dato.es)
                : (round.organulo.detalle[l] ?? round.organulo.detalle.es)}
            </p>
          </div>
          {/* Ahora sí: qué era la foto y de quién es. Antes de responder, ese
              título habría dado la respuesta. */}
          {esPrep && (
            <p className="text-center text-white/35 text-[11px]">
              {round.preparacion.titulo[l] ?? round.preparacion.titulo.es} · {round.preparacion.credito}
            </p>
          )}
          <p className="text-center text-xs font-bold">
            {acerto
              ? <span className="text-green-400">+1 · +{CORRECT_TIME}s ⏱️{streak >= 2 ? ` · 🔥 ${streak}` : ''}</span>
              : <span className="text-red-400">−{WRONG_TIME}s ⏱️</span>}
          </p>
        </div>
      )}
    </div>
  )
}
