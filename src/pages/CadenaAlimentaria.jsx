import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { genCadena, isNextEslabon } from '../lib/cadenaAlimentaria'
import { ROLES } from '../data/cadenaTrofica'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'

// Mecánica: "construye la cadena". Se sortea una cadena real (p. ej. hierba →
// conejo → zorro → águila), se baraja, y hay que ir tocando el SIGUIENTE
// eslabón correcto — no clasificar un organismo suelto (eso ya lo hace el
// examen, con la misma mecánica de siempre: ver CadenaAlimentariaExamen.jsx,
// que no ha cambiado). Contrarreloj, sin vidas, mismo esqueleto de
// Balanza/Circuito Cerrado, pero el premio/castigo es por FICHA tocada, no
// por pregunta — varias fichas por cadena, así que las cantidades son
// menores que en esos juegos para no desbordar el reloj.
const GAME_TIME = 40
const WRONG_TIME = 2
const CORRECT_TIME = 1
const PAUSA_CADENA_COMPLETA = 700 // ms que se ve la cadena entera antes de la siguiente

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' }, desc: { es: '5 cadenas de 3 eslabones, del productor al depredador', en: '5 chains of 3 links, from producer to predator', ca: '5 cadenes de 3 esglaons, del productor al depredador' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' }, desc: { es: '+7 cadenas de 4 eslabones: consumidor terciario o descomponedor', en: '+7 chains of 4 links: tertiary consumer or decomposer', ca: '+7 cadenes de 4 esglaons: consumidor terciari o descomponedor' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, desc: { es: 'Las mismas 12 cadenas, pero al revés: de la cima al productor', en: 'The same 12 chains, but backwards: from the top down to the producer', ca: 'Les mateixes 12 cadenes, però al revés: del cim al productor' } },
}

const UI = {
  es: {
    badge: 'Biología · Ecosistemas', titulo: '🌿 Cadena Alimentaria',
    sub: 'Reconstruye quién se come a quién', how: 'Cómo funciona',
    p1: 'Se baraja una cadena alimentaria real: hierba, conejo, zorro, águila...',
    p2: 'Toca las fichas en el orden correcto — del productor al último eslabón (a veces un depredador, a veces un descomponedor).',
    time: 'Tiempo', timeVal: '40 segundos', pts: 'Puntos', ptsVal: 'Ficha correcta +1 y +1s · Fallo −1 y −2s',
    volver: '← Volver', empezar: '🌿 ¡Empezar!', salir: '← Salir',
    empiezaPor: 'Empieza por:',
    finPartida: 'Partida terminada', reintentar: '🌿 Nueva partida', cambiarDif: 'Cambiar dificultad',
    aciertosLbl: 'Fichas correctas', cadenasLbl: 'Cadenas completas',
    examen: 'Examen con otra mecánica →',
    cadenaCompleta: '¡Cadena completa! 🎉',
  },
  en: {
    badge: 'Biology · Ecosystems', titulo: '🌿 Food Chain',
    sub: 'Rebuild who eats whom', how: 'How it works',
    p1: 'A real food chain gets shuffled: grass, rabbit, fox, eagle...',
    p2: 'Tap the tiles in the right order — from the producer to the last link (sometimes a predator, sometimes a decomposer).',
    time: 'Time', timeVal: '40 seconds', pts: 'Points', ptsVal: 'Right tile +1 and +1s · Wrong −1 and −2s',
    volver: '← Back', empezar: '🌿 Start!', salir: '← Exit',
    empiezaPor: 'Start with:',
    finPartida: 'Game over', reintentar: '🌿 New game', cambiarDif: 'Change difficulty',
    aciertosLbl: 'Correct tiles', cadenasLbl: 'Chains completed',
    examen: 'Exam with a different mechanic →',
    cadenaCompleta: 'Chain complete! 🎉',
  },
  ca: {
    badge: 'Biologia · Ecosistemes', titulo: '🌿 Cadena Alimentària',
    sub: 'Reconstrueix qui es menja qui', how: 'Com funciona',
    p1: 'Es barreja una cadena alimentària real: herba, conill, guineu, àliga...',
    p2: 'Toca les fitxes en l\'ordre correcte — del productor a l\'últim esglaó (a vegades un depredador, a vegades un descomponedor).',
    time: 'Temps', timeVal: '40 segons', pts: 'Punts', ptsVal: 'Fitxa correcta +1 i +1s · Errada −1 i −2s',
    volver: '← Enrere', empezar: '🌿 Comença!', salir: '← Sortir',
    empiezaPor: 'Comença per:',
    finPartida: 'Partida acabada', reintentar: '🌿 Nova partida', cambiarDif: 'Canvia dificultat',
    aciertosLbl: 'Fitxes correctes', cadenasLbl: 'Cadenes completes',
    examen: 'Examen amb una altra mecànica →',
    cadenaCompleta: 'Cadena completa! 🎉',
  },
}

const NOMBRE_KEY = { es: 'nombre', en: 'nombreEn', ca: 'nombreCa' }
const CADENA_NOMBRE_KEY = { es: 'nombre', en: 'nombreEn', ca: 'nombreCa' }

function lowerFirst(str) {
  return str ? str.charAt(0).toLowerCase() + str.slice(1) : str
}

// "Empieza por" describe el PRIMER eslabón real de la ronda (`secuencia[0]`),
// que ya viene orientado según `invertido` — así que nunca hay que
// distinguir a mano entre "empieza por el productor" y "empieza por el
// depredador": algunas cadenas (las 'ciclo-*') terminan en un descomponedor,
// no en un depredador, y decirlo mal sería un error real, no solo de estilo
// (un moho no es un depredador). Se deriva siempre del rol real del
// organismo, sea cual sea.
function rolInicialLabel(round, l) {
  const primero = round.secuencia[0]
  const rol = ROLES[primero.rol]
  const label = rol.label[l] ?? rol.label.es
  return l === 'en' ? `the ${lowerFirst(label)}` : `el ${lowerFirst(label)}` // es/ca: todos los roles son masculinos
}

function DifficultyScreen({ onSelect, t, l }) {
  const [dif, setDif] = useState('facil')
  const navigate = useNavigate()
  const { localPath } = useLang()
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full flex flex-col items-center">
        <button onClick={() => navigate(localPath('/juegos'))}
          className="self-start text-white/30 hover:text-white/60 text-sm mb-6 flex items-center gap-1 transition-colors">
          {t.volver}
        </button>
        <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{t.badge}</p>
        <h1 className="text-3xl font-black text-white text-center mb-1">{t.titulo}</h1>
        <p className="text-white/40 text-sm text-center mb-6">{t.sub}</p>

        <div className="flex flex-wrap justify-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl mb-3 mx-auto">
          {Object.entries(DIFS).map(([id, d]) => (
            <button key={id} onClick={() => setDif(id)}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${dif === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}>
              {d.emoji} {d.label[l] ?? d.label.es}
            </button>
          ))}
        </div>
        <p className="text-white/40 text-xs text-center mb-5">{DIFS[dif].desc[l] ?? DIFS[dif].desc.es}</p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4 w-full">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{t.how}</p>
          <div className="space-y-2">
            {[['🔀', t.p1], ['👆', t.p2]].map(([e, text]) => (
              <div key={text} className="flex items-start gap-3 text-sm text-white/50">
                <span className="text-base w-5 shrink-0 text-center">{e}</span><span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 w-full space-y-2.5 text-sm">
          {[['⏱️', t.time, t.timeVal], ['⭐', t.pts, t.ptsVal]].map(([e, k, v]) => (
            <div key={k} className="flex items-start justify-between gap-4">
              <span className="text-white/40 shrink-0 pt-0.5">{e} {k}</span>
              <span className="text-white font-semibold text-right">{v}</span>
            </div>
          ))}
        </div>

        <button onClick={() => onSelect(dif)}
          className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/30 mb-3">
          {t.empezar}
        </button>
        <button onClick={() => navigate(localPath('/examen/cadena-alimentaria-test'))}
          className="text-white/30 hover:text-white/60 text-sm transition-colors">
          {t.examen}
        </button>
      </div>
    </div>
  )
}

export default function CadenaAlimentaria() {
  const { lang } = useLang()
  const { user } = useAuth()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const t = UI[l]

  const [screen, setScreen] = useState('difficulty') // difficulty | playing | end
  const [dificultad, setDificultad] = useState('facil')
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [score, setScore] = useState(0)
  const [correctas, setCorrectas] = useState(0)
  const [cadenasCompletas, setCadenasCompletas] = useState(0)
  const [streak, setStreak] = useState(0)
  const [round, setRound] = useState(null)
  const [placed, setPlaced] = useState([])
  const [flash, setFlash] = useState(null) // { id, ok } — feedback momentáneo en una ficha
  const [chainDone, setChainDone] = useState(false)

  const timerRef = useRef(null)
  const flashTimeoutRef = useRef(null)
  const nextChainTimeoutRef = useRef(null)
  const scoreRef = useRef(0)
  const timeRef = useRef(GAME_TIME)
  const cadenasRef = useRef(0)
  const startedAtRef = useRef(0)
  useEffect(() => { scoreRef.current = score }, [score])
  useEffect(() => { timeRef.current = timeLeft }, [timeLeft])
  useEffect(() => { cadenasRef.current = cadenasCompletas }, [cadenasCompletas])

  const nextCadena = useCallback((dif) => {
    setRound(genCadena(dif))
    setPlaced([])
    setChainDone(false)
  }, [])

  function startGame(dif) {
    setDificultad(dif)
    setScreen('playing')
    setScore(0); setCorrectas(0); setCadenasCompletas(0); setStreak(0)
    setTimeLeft(GAME_TIME)
    startedAtRef.current = Date.now()
    nextCadena(dif)
  }

  useEffect(() => {
    if (screen !== 'playing') return
    timerRef.current = setInterval(() => {
      setTimeLeft(tl => {
        if (tl <= 1) { clearInterval(timerRef.current); setScreen('end'); return 0 }
        return tl - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [screen])

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current)
    if (nextChainTimeoutRef.current) clearTimeout(nextChainTimeoutRef.current)
  }, [])

  useEffect(() => {
    if (screen !== 'end' || !user?.uid) return
    const pts = scoreRef.current * 10
    saveActivity(user.uid, {
      type: 'juego', game: 'cadena-alimentaria', category: 'biologia',
      score: pts, passed: scoreRef.current > 0,
      coinsEarned: computeCoins('cadena-alimentaria', { score: pts }),
      timeSpent: GAME_TIME - timeRef.current,
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }, [screen, user])

  function tocarFicha(ficha) {
    if (chainDone || !round) return
    if (placed.some(p => p.id === ficha.id)) return // ya colocada

    if (isNextEslabon(round, placed, ficha.id)) {
      const newPlaced = [...placed, ficha]
      setPlaced(newPlaced)
      setCorrectas(c => c + 1)
      const ns = streak + 1
      setStreak(ns)
      const gain = Math.min(3, 1 + Math.floor((ns - 1) / 4))
      setScore(s => s + gain)
      setTimeLeft(tl => tl + CORRECT_TIME)
      setFlash({ id: ficha.id, ok: true })

      if (newPlaced.length === round.secuencia.length) {
        setChainDone(true)
        setCadenasCompletas(c => c + 1)
        nextChainTimeoutRef.current = setTimeout(() => nextCadena(dificultad), PAUSA_CADENA_COMPLETA)
      }
    } else {
      setStreak(0)
      setScore(s => Math.max(0, s - 1))
      setTimeLeft(tl => Math.max(0, tl - WRONG_TIME))
      setFlash({ id: ficha.id, ok: false })
    }

    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current)
    flashTimeoutRef.current = setTimeout(() => setFlash(null), 500)
  }

  const seo = {
    es: { title: 'Cadena Alimentaria — Reconstruye quién se come a quién', desc: 'Baraja una cadena alimentaria real y toca las fichas en el orden correcto, del productor al último eslabón: un depredador o un descomponedor. Contrarreloj. Juego de biología.', path: '/juegos/cadena-alimentaria' },
    en: { title: 'Food Chain — Rebuild who eats whom', desc: 'A real food chain gets shuffled — tap the tiles in the right order, from the producer to the last link: a predator or a decomposer. Against the clock. Biology game.', path: '/en/juegos/cadena-alimentaria' },
    ca: { title: 'Cadena Alimentària — Reconstrueix qui es menja qui', desc: 'Es barreja una cadena alimentària real i cal tocar les fitxes en l\'ordre correcte, del productor a l\'últim esglaó: un depredador o un descomponedor. Contrarellotge. Joc de biologia.', path: '/ca/juegos/cadena-alimentaria' },
  }[l]

  if (screen === 'difficulty') {
    return (<><SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} /><DifficultyScreen onSelect={startGame} t={t} l={l} /></>)
  }

  if (screen === 'end') {
    const pts = score * 10
    const msg = { es: cadenasCompletas === 0 ? '¡Sigue practicando!' : cadenasCompletas < 3 ? 'Buen comienzo' : cadenasCompletas < 7 ? '¡Bien hecho!' : '¡Maestro del ecosistema! 🌿', en: cadenasCompletas === 0 ? 'Keep practising!' : cadenasCompletas < 3 ? 'Good start' : cadenasCompletas < 7 ? 'Well done!' : 'Ecosystem master! 🌿', ca: cadenasCompletas === 0 ? 'Segueix practicant!' : cadenasCompletas < 3 ? 'Bon començament' : cadenasCompletas < 7 ? 'Ben fet!' : 'Mestre de l\'ecosistema! 🌿' }[l]
    const shareText = l === 'en'
      ? `I rebuilt ${cadenasCompletas} food chains in Food Chain 🌿 — can you beat me? https://tuthor.es/juegos/cadena-alimentaria`
      : l === 'ca'
      ? `He reconstruït ${cadenasCompletas} cadenes alimentàries a Cadena Alimentària 🌿 — pots superar-me? https://tuthor.es/juegos/cadena-alimentaria`
      : `He reconstruido ${cadenasCompletas} cadenas alimentarias en Cadena Alimentaria 🌿 — ¿puedes superarme? https://tuthor.es/juegos/cadena-alimentaria`
    return (
      <GameEndScreen game="cadena-alimentaria" emoji="🌿" title={t.finPartida} score={pts} message={msg}
        stats={[{ label: t.cadenasLbl, value: cadenasCompletas, emoji: '🔗' }, { label: t.aciertosLbl, value: correctas, emoji: '✅' }]}
        shareText={shareText} onPlayAgain={() => startGame(dificultad)} playAgainLabel={t.reintentar}
        secondaryActions={[{ label: t.cambiarDif, onClick: () => setScreen('difficulty') }]}
        user={user} lang={l} />
    )
  }

  if (!round) return null

  const timerPct = timeLeft / GAME_TIME
  const timerColor = timeLeft > 30 ? '#22c55e' : timeLeft > 10 ? '#f59e0b' : '#ef4444'
  const restantes = round.fichas.filter(f => !placed.some(p => p.id === f.id))

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-2 sm:px-4 py-4">
      <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />

      {/* Header */}
      <div className="w-full max-w-lg flex items-center justify-between mb-3 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">🌿 {DIFS[dificultad].label[l] ?? DIFS[dificultad].label.es}</p>
          <p className="text-white font-bold text-lg flex items-center gap-2">
            {score} {t.pts.toLowerCase()}
            {streak >= 3 && <span className="text-orange-400 text-sm font-black">🔥 {streak}</span>}
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

      <div className="w-full max-w-lg text-center mb-2">
        <p className="text-white/40 text-xs uppercase tracking-widest">
          {round.cadena.emoji} {round.cadena[CADENA_NOMBRE_KEY[l]]} · {t.empiezaPor} {rolInicialLabel(round, l)}
        </p>
      </div>

      {/* Cadena en construcción */}
      <div className="w-full max-w-lg bg-white/5 border border-white/10 rounded-2xl p-3 mb-3 min-h-[4.5rem] flex items-center flex-wrap gap-1.5 justify-center">
        {placed.length === 0 && <span className="text-white/25 text-xs">···</span>}
        {placed.map((p, i) => (
          <span key={p.id} className="flex items-center gap-1.5">
            <span className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-bold ${chainDone ? 'bg-green-500/20 text-green-300 border border-green-500/40' : 'bg-white/10 text-white'}`}>
              <span className="text-lg">{p.emoji}</span>{p[NOMBRE_KEY[l]]}
            </span>
            {i < placed.length - 1 && <span className="text-white/20">→</span>}
          </span>
        ))}
        {chainDone && <span className="w-full text-center text-green-400 font-black text-sm mt-1">{t.cadenaCompleta}</span>}
      </div>

      {/* Fichas por colocar */}
      <div className="w-full max-w-lg grid grid-cols-2 sm:grid-cols-3 gap-2">
        {restantes.map(f => {
          const isFlash = flash?.id === f.id
          let cls = 'border-white/10 bg-white/5 text-white hover:bg-white/10 active:scale-[0.97]'
          if (isFlash && flash.ok) cls = 'border-green-500/50 bg-green-500/15 text-green-300'
          if (isFlash && !flash.ok) cls = 'border-red-500/50 bg-red-500/15 text-red-300 animate-pulse'
          return (
            <button key={f.id} onClick={() => tocarFicha(f)} disabled={chainDone}
              className={`flex flex-col items-center gap-1 py-4 rounded-xl border font-semibold transition-all ${cls} ${chainDone ? 'opacity-40 cursor-default' : 'cursor-pointer'}`}>
              <span className="text-2xl">{f.emoji}</span>
              <span className="text-xs text-center px-1">{f[NOMBRE_KEY[l]]}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
