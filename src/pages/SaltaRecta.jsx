import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'

// ── Salta la Recta ───────────────────────────────────────────────────────
// Enteros y su regla de signos (ESO), con una recta numérica y una rana que
// salta. Dos tipos de ronda:
//  - salta: se da la posición de salida y una operación ("+4", "−7") — hay
//    que tocar en la recta dónde cae. Se marcan solo unos pocos puntos
//    candidatos (no cada entero de la recta), para que tocar sea fiable en
//    móvil aunque el rango sea grande.
//  - adivina: se ven salida y llegada — hay que acertar qué operación fue,
//    entre 4 opciones de texto.
//
// En dificil, algunas operaciones se escriben como doble signo ("−(−6)",
// "+(−6)") — la regla de "restar un negativo es sumar" es justo donde más se
// atascan los alumnos, y aquí se practica leyendo la operación, no solo
// calculándola.

const DIFS = {
  facil:   { rango: 10, magMax: 6,  dobleSigno: 0,    time: 75, bonus: 5 },
  medio:   { rango: 15, magMax: 9,  dobleSigno: 0.3,  time: 70, bonus: 4 },
  dificil: { rango: 20, magMax: 12, dobleSigno: 0.6,  time: 60, bonus: 4 },
}

const DIF_LABEL = {
  facil:   { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
  medio:   { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
  dificil: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
}

function rng(min, max) { return min + Math.floor(Math.random() * (max - min + 1)) }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

// Texto de una operación de valor d. A veces con doble signo (equivalente,
// pero hay que aplicar la regla de signos para leerlo: −(−n) = +n).
function textoOperacion(d, conDobleSigno) {
  if (!conDobleSigno) return d >= 0 ? `+${d}` : `−${Math.abs(d)}`
  return d >= 0 ? `−(−${d})` : `+(−${Math.abs(d)})`
}

function generarBase(dif) {
  const min = -dif.rango, max = dif.rango
  // deja hueco para que el salto quepa dentro del rango
  const S = rng(min + dif.magMax, max - dif.magMax)
  const mag = rng(1, dif.magMax)
  const d = pick([1, -1]) * mag
  const conDobleSigno = Math.random() < dif.dobleSigno
  return { S, d, min, max, conDobleSigno }
}

function candidatosSalta(S, d, min, max) {
  const correcto = S + d
  const salto = Math.max(1, Math.round(Math.abs(d) * 0.4))
  const posibles = [S - d, correcto + salto, correcto - salto, S, correcto + 1, correcto - 1]
  const candidatos = new Set([correcto])
  for (const c of posibles) {
    if (candidatos.size >= 4) break
    if (c >= min && c <= max && !candidatos.has(c)) candidatos.add(c)
  }
  let bump = 2
  while (candidatos.size < 4) {
    const up = correcto + bump, down = correcto - bump
    if (up <= max && !candidatos.has(up)) candidatos.add(up)
    else if (down >= min && !candidatos.has(down)) candidatos.add(down)
    bump++
  }
  return [...candidatos].sort((a, b) => a - b)
}

function opcionesAdivina(d, magMax, conDobleSigno) {
  const candidatos = new Set([d])
  const posibles = [-d, d + Math.max(1, Math.round(magMax * 0.3)), d - Math.max(1, Math.round(magMax * 0.3))]
  for (const c of posibles) {
    if (candidatos.size >= 4 || c === 0) continue
    candidatos.add(c)
  }
  let bump = 2
  while (candidatos.size < 4) {
    const c = d + bump
    if (c !== 0 && !candidatos.has(c)) candidatos.add(c)
    else { const c2 = d - bump; if (c2 !== 0 && !candidatos.has(c2)) candidatos.add(c2) }
    bump++
  }
  const valores = [...candidatos]
  // mismo estilo (doble signo o no) para las 4 opciones, si no se notaría cuál es la rara
  const opciones = valores.map(v => ({ valor: v, texto: textoOperacion(v, conDobleSigno) }))
  for (let i = opciones.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[opciones[i], opciones[j]] = [opciones[j], opciones[i]]
  }
  return opciones
}

function generarRonda(dif) {
  const tipo = pick(['salta', 'adivina'])
  const { S, d, min, max, conDobleSigno } = generarBase(dif)
  const E = S + d
  if (tipo === 'salta') {
    return { tipo, S, d, E, min, max, conDobleSigno, opTexto: textoOperacion(d, conDobleSigno), candidatos: candidatosSalta(S, d, min, max) }
  }
  return { tipo, S, d, E, min, max, conDobleSigno, opciones: opcionesAdivina(d, dif.magMax, conDobleSigno) }
}

function NumberLine({ min, max, S, marker, marcados, onTap, disabled }) {
  const pct = n => ((n - min) / (max - min)) * 100
  const refStep = max - min > 30 ? 5 : max - min > 15 ? 5 : 2
  const refTicks = []
  for (let n = Math.ceil(min / refStep) * refStep; n <= max; n += refStep) refTicks.push(n)

  return (
    <div className="relative w-full h-24 mt-8 mb-4 select-none">
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/15 -translate-y-1/2 rounded-full" />
      {refTicks.map(n => (
        <div key={n} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center" style={{ left: `${pct(n)}%` }}>
          <div className="w-px h-2.5 bg-white/20" />
          <span className="text-[10px] text-white/25 mt-1 tabular-nums">{n}</span>
        </div>
      ))}
      <div className="absolute top-1/2 -translate-x-1/2 text-2xl transition-all duration-500 ease-out" style={{ left: `${pct(marker)}%`, top: '18%' }}>
        🐸
      </div>
      {S !== null && (
        <div className="absolute -translate-x-1/2 flex flex-col items-center text-[10px] font-black text-lime-400" style={{ left: `${pct(S)}%`, top: '68%' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-lime-400 mb-1" />
          {S}
        </div>
      )}
      {marcados?.map(n => (
        <button key={n} disabled={disabled} onClick={() => onTap(n)}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-40 border-2 border-white/20 text-white text-xs font-black tabular-nums transition-all"
          style={{ left: `${pct(n)}%` }}>
          {n}
        </button>
      ))}
    </div>
  )
}

export default function SaltaRecta() {
  const navigate = useNavigate()
  const { lang, tr, localPath } = useLang()
  const { user } = useAuth()

  const [fase, setFase] = useState('intro') // intro | jugando | fin
  const [difId, setDifId] = useState('medio')
  const [ronda, setRonda] = useState(null)
  const [marker, setMarker] = useState(0)
  const [timeLeft, setTimeLeft] = useState(70)
  const [score, setScore] = useState(0)
  const [aciertos, setAciertos] = useState(0)
  const [rondasJugadas, setRondasJugadas] = useState(0)
  const [racha, setRacha] = useState(0)
  const [mejorRacha, setMejorRacha] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [bloqueado, setBloqueado] = useState(false)

  const timerRef = useRef(null)
  const timeRef = useRef(70)
  const scoreRef = useRef(0)
  const aciertosRef = useRef(0)
  const rondasRef = useRef(0)
  const mejorRachaRef = useRef(0)

  const dif = DIFS[difId]

  function nuevaRonda(d) {
    const r = generarRonda(d || dif)
    setRonda(r)
    setMarker(r.S)
    setFeedback(null)
    setBloqueado(false)
  }

  function startGame(selectedDif) {
    const id = selectedDif || difId
    const d = DIFS[id]
    setDifId(id)
    timeRef.current = d.time
    setTimeLeft(d.time)
    setScore(0); scoreRef.current = 0
    setAciertos(0); aciertosRef.current = 0
    setRondasJugadas(0); rondasRef.current = 0
    setRacha(0)
    setMejorRacha(0); mejorRachaRef.current = 0
    nuevaRonda(d)
    setFase('jugando')
  }

  useEffect(() => {
    if (fase !== 'jugando') return
    timerRef.current = setInterval(() => {
      timeRef.current -= 1
      setTimeLeft(timeRef.current)
      if (timeRef.current <= 0) {
        clearInterval(timerRef.current)
        saveOnEnd()
        setFase('fin')
      }
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [fase, difId])

  function resolver(acierto, posicionFinal) {
    if (bloqueado) return
    setBloqueado(true)
    setFeedback(acierto ? 'correct' : 'wrong')
    setMarker(posicionFinal)
    rondasRef.current += 1
    setRondasJugadas(rondasRef.current)

    if (acierto) {
      const nuevaRachaVal = racha + 1
      setRacha(nuevaRachaVal)
      if (nuevaRachaVal > mejorRachaRef.current) { mejorRachaRef.current = nuevaRachaVal; setMejorRacha(nuevaRachaVal) }
      const puntos = 100 + Math.min(nuevaRachaVal * 20, 200)
      scoreRef.current += puntos
      setScore(scoreRef.current)
      aciertosRef.current += 1
      setAciertos(aciertosRef.current)
      timeRef.current += dif.bonus
      setTimeLeft(timeRef.current)
    } else {
      setRacha(0)
    }

    setTimeout(() => nuevaRonda(), 900)
  }

  function tapSalta(n) {
    if (bloqueado || ronda.tipo !== 'salta') return
    resolver(n === ronda.E, n)
  }

  function tapAdivina(valor) {
    if (bloqueado || ronda.tipo !== 'adivina') return
    resolver(valor === ronda.d, ronda.E)
  }

  function saveOnEnd() {
    if (!user) return
    const finalScore = scoreRef.current
    if (finalScore <= 0) return
    saveActivity(user.uid, {
      type: 'juego', game: 'salta-recta', score: finalScore, passed: true, timeSpent: dif.time,
      coinsEarned: computeCoins('salta-recta', { score: finalScore }),
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }

  const seoTitle = tr({ es: 'Salta la Recta — Enteros y negativos', en: 'Jump the Number Line — Integers', ca: 'Salta la Recta — Enters i negatius' })
  const seoDesc = tr({
    es: 'Practica enteros y la regla de signos con una recta numérica: salta al resultado o adivina qué operación fue. A contrarreloj.',
    en: 'Practise integers and the sign rule with a number line: jump to the result or guess which operation it was. Against the clock.',
    ca: 'Practica enters i la regla de signes amb una recta numèrica: salta al resultat o endevina quina operació va ser. A contrarellotge.',
  })

  if (fase === 'intro') {
    const d = DIFS[difId]
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <SEOHead title={seoTitle} description={seoDesc} path="/juegos/salta-recta" lang={lang} />
        <div className="max-w-md w-full">
          <button onClick={() => navigate(localPath('/juegos'))}
            className="text-white/30 hover:text-white/60 text-sm mb-6 flex items-center gap-1 transition-colors">
            {tr({ es: '← Volver', en: '← Back', ca: '← Tornar' })}
          </button>
          <div className="text-center mb-7">
            <span className="text-7xl block mb-4">🐸</span>
            <h1 className="text-4xl font-black text-white mb-2">{tr({ es: 'Salta la Recta', en: 'Jump the Number Line', ca: 'Salta la Recta' })}</h1>
            <p className="text-white/40">{tr({ es: 'Enteros y negativos, saltando por la recta numérica', en: 'Integers and negatives, jumping the number line', ca: 'Enters i negatius, saltant per la recta numèrica' })}</p>
          </div>

          <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl mb-5 w-fit mx-auto">
            {Object.keys(DIFS).map(id => (
              <button key={id} onClick={() => setDifId(id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  difId === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'
                }`}>
                {tr(DIF_LABEL[id])}
              </button>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5 space-y-2.5 text-sm">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">{tr({ es: 'Reglas', en: 'Rules', ca: 'Regles' })}</p>
            {[
              ['⏱️', tr({ es: 'Tiempo inicial', en: 'Starting time', ca: 'Temps inicial' }), `${d.time}s`],
              ['🎁', tr({ es: 'Por acierto', en: 'Per correct answer', ca: 'Per encert' }), `+${d.bonus}s`],
              ['🔥', tr({ es: 'Racha', en: 'Streak', ca: 'Ratxa' }), tr({ es: 'más puntos por acierto seguido', en: 'more points for consecutive hits', ca: 'més punts per encert seguit' })],
            ].map(([e, k, v]) => (
              <div key={k} className="flex items-start justify-between gap-2">
                <span className="text-white/40 shrink-0">{e} {k}</span>
                <span className="text-white font-semibold text-right">{v}</span>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-7">
            <div className="space-y-2">
              {[
                ['🎯', tr({ es: 'Salta: te dan salida y operación — toca dónde cae', en: 'Jump: given start and operation — tap where it lands', ca: 'Salta: et donen sortida i operació — toca on cau' })],
                ['🤔', tr({ es: 'Adivina: ves salida y llegada — acierta la operación', en: 'Guess: see start and landing — guess the operation', ca: 'Endevina: veus sortida i arribada — encerta l\'operació' })],
              ].map(([e, t]) => (
                <div key={t} className="flex items-start gap-3 text-sm text-white/50">
                  <span className="text-base w-5 shrink-0 text-center">{e}</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => startGame(difId)}
            className="w-full py-4 bg-lime-500 hover:bg-lime-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-lime-500/30">
            {tr({ es: '¡Empezar! →', en: 'Start! →', ca: 'Comença! →' })}
          </button>
        </div>
      </div>
    )
  }

  if (fase === 'fin') {
    const shareText = tr({
      es: `He conseguido ${score} puntos en Salta la Recta 🐸 — ¿puedes superarme? https://tuthor.es/juegos/salta-recta`,
      en: `I scored ${score} points in Jump the Number Line 🐸 — can you beat me? https://tuthor.es/en/juegos/salta-recta`,
      ca: `He aconseguit ${score} punts a Salta la Recta 🐸 — em pots superar? https://tuthor.es/ca/juegos/salta-recta`,
    })
    return (
      <GameEndScreen
        game="salta-recta"
        emoji="🐸"
        title={`${tr({ es: '¡Tiempo agotado!', en: 'Time is up!', ca: 'Temps esgotat!' })} · ${tr(DIF_LABEL[difId])}`}
        score={score}
        stats={[
          { label: tr({ es: 'Aciertos', en: 'Correct', ca: 'Encerts' }), value: `${aciertos}/${rondasJugadas}`, emoji: '✅' },
          { label: tr({ es: 'Mejor racha', en: 'Best streak', ca: 'Millor ratxa' }), value: mejorRacha, emoji: '🔥' },
        ]}
        shareText={shareText}
        onPlayAgain={() => startGame(difId)}
        playAgainLabel={tr({ es: 'Intentarlo de nuevo', en: 'Try again', ca: 'Tornar-ho a provar' })}
        secondaryActions={[{ label: tr({ es: 'Cambiar dificultad', en: 'Change difficulty', ca: 'Canviar dificultat' }), onClick: () => setFase('intro') }]}
        user={user} lang={lang}
      />
    )
  }

  if (!ronda) return <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)]"><p className="text-white/30">...</p></div>

  const timerPct = Math.min(100, (timeLeft / dif.time) * 100)
  const timerColor = timeLeft > dif.time * 0.35 ? 'bg-green-400' : timeLeft > dif.time * 0.15 ? 'bg-yellow-400' : 'bg-red-500 animate-pulse'
  const cardBorder = feedback === 'correct' ? 'border-green-400 bg-green-500/10' : feedback === 'wrong' ? 'border-red-400 bg-red-500/10' : 'border-white/10 bg-white/5'

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-3 py-3 max-w-lg mx-auto w-full">
      <div className="flex items-center justify-between mb-2">
        <button onClick={() => setFase('intro')} className="text-white/40 hover:text-white/70 text-sm transition-colors">
          {tr({ es: '← Salir', en: '← Exit', ca: '← Sortir' })}
        </button>
        <div className="flex items-center gap-3 text-sm text-white/50">
          <span className="text-white font-bold tabular-nums">🐸 {score}</span>
          {racha >= 2 && <span className="text-amber-400 font-bold">🔥 {racha}</span>}
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-xs text-white/40 mb-1">
          <span>{tr({ es: 'Tiempo', en: 'Time', ca: 'Temps' })}</span>
          <span className={`font-bold tabular-nums ${timeLeft <= dif.time * 0.15 ? 'text-red-400' : ''}`}>{timeLeft}s</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 ${timerColor}`} style={{ width: `${timerPct}%` }} />
        </div>
      </div>

      <div className={`flex-1 flex flex-col justify-center rounded-2xl border-2 p-5 transition-all duration-200 ${cardBorder}`}>
        {ronda.tipo === 'salta' ? (
          <>
            <p className="text-lime-400 text-xs font-black uppercase tracking-widest text-center mb-3">{tr({ es: '¿Dónde cae?', en: 'Where does it land?', ca: 'On cau?' })}</p>
            <p className="text-white text-center text-sm leading-relaxed">
              {tr({ es: `Empieza en ${ronda.S} y salta`, en: `Starts at ${ronda.S} and jumps`, ca: `Comença a ${ronda.S} i salta` })}
            </p>
            <p className="text-white font-black text-3xl text-center tabular-nums">{ronda.opTexto}</p>
            <NumberLine min={ronda.min} max={ronda.max} S={ronda.S} marker={marker} marcados={ronda.candidatos} onTap={tapSalta} disabled={bloqueado} />
            {bloqueado && (
              <p className="text-white/50 text-sm text-center">
                {tr({ es: `${ronda.S} ${ronda.opTexto} = ${ronda.E}`, en: `${ronda.S} ${ronda.opTexto} = ${ronda.E}`, ca: `${ronda.S} ${ronda.opTexto} = ${ronda.E}` })}
              </p>
            )}
          </>
        ) : (
          <>
            <p className="text-lime-400 text-xs font-black uppercase tracking-widest text-center mb-3">{tr({ es: '¿Qué operación fue?', en: 'Which operation was it?', ca: 'Quina operació va ser?' })}</p>
            <p className="text-white text-center text-sm">
              {tr({ es: `De ${ronda.S} a ${ronda.E}`, en: `From ${ronda.S} to ${ronda.E}`, ca: `De ${ronda.S} a ${ronda.E}` })}
            </p>
            <NumberLine min={ronda.min} max={ronda.max} S={ronda.S} marker={marker} marcados={null} onTap={() => {}} disabled />
            <div className="grid grid-cols-2 gap-2 mt-3">
              {ronda.opciones.map(op => (
                <button key={op.texto} disabled={bloqueado} onClick={() => tapAdivina(op.valor)}
                  className={`py-3 px-2 border text-lg font-black rounded-xl tabular-nums transition-all ${
                    bloqueado
                      ? op.valor === ronda.d ? 'bg-green-500/20 border-green-400 text-green-400' : 'bg-white/5 border-white/10 text-white/30'
                      : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
                  }`}>
                  {op.texto}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
