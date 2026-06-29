import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { PAISES } from '../data/paises'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import CoinsAnimation from '../components/CoinsAnimation'
import WorldMap from '../components/WorldMap'

function flagToCode(emoji) {
  return [...emoji].map(c => String.fromCharCode(c.codePointAt(0) - 0x1F1E6 + 65)).join('').toLowerCase()
}

function FlagImg({ bandera, size = 48, className = '' }) {
  const code = flagToCode(bandera)
  return <img src={`https://flagcdn.com/w80/${code}.png`} alt={code} width={size} height={Math.round(size * 0.75)} className={`inline-block rounded shadow ${className}`} />
}

const TIEMPO_INICIO = 90

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function normalize(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
}

const UI = {
  es: {
    titulo: 'GeoMapa', desc: '¿Qué país está iluminado en el mapa?',
    volver: '← Volver', empezar: '¡Empezar! →',
    reglas: 'Reglas',
    paso1: 'Un país se ilumina en el mapa mundial',
    paso2: 'Si fallas, recibes una pista: la bandera',
    paso3: 'Si fallas de nuevo, recibes la capital',
    paso4: 'Sin acierto tras 3 intentos: −10s y siguiente',
    alAcertar: 'Al acertar', acertar: '+15s + puntos',
    alFallar: 'Sin acierto', fallar: '−10s',
    tiempo: 'Tiempo', puntos: 'Puntos',
    escribePais: 'Escribe un país…', enviar: 'Enviar',
    tiempoAgotado: '¡Tiempo agotado!', puntuacion: 'Puntuación',
    paises: 'Países', reintentar: 'Intentarlo de nuevo',
    salir: '← Salir', intentos: 'intentos', intento1: '1er intento',
    pistaFlag: 'Pista: bandera', pistaCapital: 'Pista: capital',
    noReconocido: 'País no reconocido', incorrecto: 'Incorrecto',
    correcto: '¡Correcto!', era: 'Era',
  },
  en: {
    titulo: 'GeoMap', desc: 'Which country is highlighted on the map?',
    volver: '← Back', empezar: 'Start! →',
    reglas: 'Rules',
    paso1: 'A country is highlighted on the world map',
    paso2: 'If you miss, you get a hint: the flag',
    paso3: 'If you miss again, you get the capital',
    paso4: 'No answer after 3 tries: −10s and next',
    alAcertar: 'On correct', acertar: '+15s + points',
    alFallar: 'No answer', fallar: '−10s',
    tiempo: 'Time', puntos: 'Points',
    escribePais: 'Type a country…', enviar: 'Submit',
    tiempoAgotado: 'Time is up!', puntuacion: 'Score',
    paises: 'Countries', reintentar: 'Try again',
    salir: '← Exit', intentos: 'attempts', intento1: '1st attempt',
    pistaFlag: 'Hint: flag', pistaCapital: 'Hint: capital',
    noReconocido: 'Country not recognised', incorrecto: 'Incorrect',
    correcto: 'Correct!', era: 'It was',
  },
  ca: {
    titulo: 'GeoMapa', desc: 'Quin país està il·luminat al mapa?',
    volver: '← Tornar', empezar: 'Començar! →',
    reglas: 'Regles',
    paso1: 'Un país s\'il·lumina al mapa mundial',
    paso2: 'Si falles, reps una pista: la bandera',
    paso3: 'Si tornes a fallar, reps la capital',
    paso4: 'Sense encert després de 3 intents: −10s i següent',
    alAcertar: 'En encertar', acertar: '+15s + punts',
    alFallar: 'Sense encert', fallar: '−10s',
    tiempo: 'Temps', puntos: 'Punts',
    escribePais: 'Escriu un país…', enviar: 'Enviar',
    tiempoAgotado: 'S\'ha acabat el temps!', puntuacion: 'Puntuació',
    paises: 'Països', reintentar: 'Tornar-ho a provar',
    salir: '← Sortir', intentos: 'intents', intento1: '1r intent',
    pistaFlag: 'Pista: bandera', pistaCapital: 'Pista: capital',
    noReconocido: 'País no reconegut', incorrecto: 'Incorrecte',
    correcto: 'Correcte!', era: 'Era',
  },
}

function AutocompleteInput({ value, onChange, onSubmit, paises, disabled, focusKey, placeholder }) {
  const [focused, setFocused] = useState(false)
  const [highlightIdx, setHighlightIdx] = useState(-1)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!disabled) inputRef.current?.focus()
  }, [focusKey, disabled])

  const filtered = useMemo(() => {
    if (!value || value.length < 1) return []
    const norm = normalize(value)
    return paises.filter(n => normalize(n).includes(norm)).slice(0, 6)
  }, [value, paises])

  function select(name) {
    onChange(name)
    setFocused(false)
    setHighlightIdx(-1)
    setTimeout(() => onSubmit(name), 50)
  }

  function handleKey(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlightIdx(i => Math.min(i + 1, filtered.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlightIdx(i => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter') {
      e.preventDefault()
      if (highlightIdx >= 0 && filtered[highlightIdx]) select(filtered[highlightIdx])
      else if (filtered.length === 1) select(filtered[0])
      else onSubmit(value)
    }
  }

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => { onChange(e.target.value); setHighlightIdx(-1) }}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 300)}
        onKeyDown={handleKey}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full bg-white/10 border-2 border-white/20 focus:border-[#EDAE49] rounded-xl px-4 py-3 text-white text-lg placeholder:text-white/25 outline-none transition-colors disabled:opacity-40"
        autoComplete="off"
      />
      {focused && filtered.length > 0 && (
        <div className="absolute z-50 w-full bottom-full mb-1 bg-[#1a1a2e] border border-white/20 rounded-xl overflow-hidden shadow-2xl max-h-48 overflow-y-auto">
          {filtered.map((name, i) => (
            <button key={name} onMouseDown={() => select(name)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                i === highlightIdx ? 'bg-[#EDAE49]/20 text-[#EDAE49]' : 'text-white/70 hover:bg-white/10'
              }`}>
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function GeoMapa() {
  const navigate = useNavigate()
  const { lang, localPath, lt } = useLang()
  const { user } = useAuth()
  const u = UI[lang] || UI.es
  const en = lang === 'en'

  // Excluir países demasiado pequeños para verse bien en el mapa 110m
  const MIN_AREA = 30000
  const paisesConIso = useMemo(() => PAISES.filter(p => p.iso && p.area >= MIN_AREA), [])
  const getName = useCallback(p => lt(p, 'nombre'), [lt])
  const nombresPaises = useMemo(() => paisesConIso.map(getName), [paisesConIso, getName])

  const [fase, setFase] = useState('intro')
  const [timeLeft, setTimeLeft] = useState(TIEMPO_INICIO)
  const [puntos, setPuntos] = useState(0)
  const [aciertos, setAciertos] = useState(0)
  const [paisActual, setPaisActual] = useState(null)
  const [intento, setIntento] = useState(0) // 0=mapa solo, 1=+bandera, 2=+capital
  const [inputVal, setInputVal] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [usados, setUsados] = useState([])
  const usadosRef = useRef([])
  const [levelKey, setLevelKey] = useState(0)
  const [showCoins, setShowCoins] = useState(false)
  const [coinsDone, setCoinsDone] = useState(false)
  const [combo, setCombo] = useState(0)

  const timerRef = useRef(null)
  const tiempoRef = useRef(TIEMPO_INICIO)
  const puntosRef = useRef(0)
  const startTimeRef = useRef(Date.now())

  useEffect(() => {
    if (fase !== 'jugando') return
    if (feedback?.freeze) return

    timerRef.current = setInterval(() => {
      tiempoRef.current -= 1
      setTimeLeft(tiempoRef.current)
      if (tiempoRef.current <= 0) {
        clearInterval(timerRef.current)
        const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000)
        if (user) saveActivity(user.uid, { type: 'juego', game: 'geomapa', score: puntosRef.current, passed: puntosRef.current >= 200, timeSpent: elapsed }).catch(() => {})
        setFase('fin')
      }
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [fase, levelKey, feedback?.freeze])

  function iniciar() {
    setTimeLeft(TIEMPO_INICIO)
    tiempoRef.current = TIEMPO_INICIO
    startTimeRef.current = Date.now()
    setPuntos(0)
    puntosRef.current = 0
    setAciertos(0)
    setUsados([])
    usadosRef.current = []
    setCombo(0)
    setShowCoins(false)
    setCoinsDone(false)
    setFase('jugando')
    siguientePais()
  }

  function siguientePais() {
    const disponibles = paisesConIso.filter(p => !usadosRef.current.includes(p.nombre))
    if (disponibles.length === 0) { setFase('fin'); return }
    const pais = disponibles[Math.floor(Math.random() * disponibles.length)]
    usadosRef.current = [...usadosRef.current, pais.nombre]
    setPaisActual(pais)
    setIntento(0)
    setInputVal('')
    setFeedback(null)
    setUsados(usadosRef.current)
    setLevelKey(k => k + 1)
  }

  function handleRespuesta(val) {
    const nombre = val || inputVal
    const paisResp = paisesConIso.find(p => getName(p) === nombre)
    if (!paisResp) {
      setFeedback({ ok: false, msg: u.noReconocido })
      setTimeout(() => setFeedback(null), 1000)
      return
    }

    if (paisResp.nombre === paisActual.nombre) {
      clearInterval(timerRef.current)
      const bonus = intento === 0 ? 15 : intento === 1 ? 10 : 5
      tiempoRef.current += bonus
      setTimeLeft(tiempoRef.current)
      const nuevoCombo = combo + 1
      setCombo(nuevoCombo)
      const basePts = intento === 0 ? 200 : intento === 1 ? 120 : 60
      const pts = basePts + nuevoCombo * 15
      setPuntos(p => { const n = p + pts; puntosRef.current = n; return n })
      setAciertos(n => n + 1)
      setFeedback({ ok: true, msg: `🎉 ${u.correcto} +${pts} pts · +${bonus}s`, freeze: true })
      setTimeout(() => {
        setFeedback(null)
        siguientePais()
      }, 1500)
    } else {
      setInputVal('')
      if (intento >= 2) {
        setCombo(0)
        tiempoRef.current = Math.max(0, tiempoRef.current - 10)
        setTimeLeft(tiempoRef.current)
        setFeedback({ ok: false, msg: `❌ ${u.era} ${getName(paisActual)} · −10s`, freeze: true })
        if (tiempoRef.current <= 0) {
          clearInterval(timerRef.current)
          const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000)
          if (user) saveActivity(user.uid, { type: 'juego', game: 'geomapa', score: puntosRef.current, passed: puntosRef.current >= 200, timeSpent: elapsed }).catch(() => {})
          setTimeout(() => setFase('fin'), 1500)
          return
        }
        setTimeout(() => {
          setFeedback(null)
          siguientePais()
        }, 2000)
      } else {
        setIntento(i => i + 1)
        setFeedback({ ok: false, msg: u.incorrecto })
        setTimeout(() => setFeedback(null), 800)
      }
    }
  }

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (fase === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="max-w-xl w-full">
          <button onClick={() => navigate(localPath('/juegos'))}
            className="text-white/30 hover:text-white/60 text-sm mb-6 flex items-center gap-1 transition-colors">
            {u.volver}
          </button>
          <div className="text-center mb-7">
            <span className="text-7xl block mb-4">🗺️</span>
            <h1 className="text-4xl font-black text-white mb-2">{u.titulo}</h1>
            <p className="text-white/40">{u.desc}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
            <WorldMap highlight="" className="rounded-xl overflow-hidden mb-4" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">{u.reglas}</p>
                {[
                  ['🗺️', u.paso1],
                  ['🏳️', u.paso2],
                  ['🏛️', u.paso3],
                  ['⏱️', u.paso4],
                ].map(([e, t]) => (
                  <div key={t} className="flex items-start gap-2 text-white/50">
                    <span className="text-base w-5 shrink-0 text-center">{e}</span>
                    <span className="text-xs">{t}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {[
                  ['⏱️', u.tiempo, `${TIEMPO_INICIO}s`],
                  ['✅', u.alAcertar, u.acertar],
                  ['❌', u.alFallar, u.fallar],
                ].map(([e, k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-2">
                    <span className="text-white/40 text-xs">{e} {k}</span>
                    <span className="text-white font-semibold text-xs text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button onClick={iniciar}
            className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/30">
            {u.empezar}
          </button>
        </div>
      </div>
    )
  }

  // ── FIN ────────────────────────────────────────────────────────────────────
  if (fase === 'fin') {
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-6">
        <div className="max-w-lg w-full">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center mb-5">
            <div className="text-6xl mb-3">🗺️</div>
            <h2 className="text-3xl font-black text-white mb-1">{u.tiempoAgotado}</h2>

            {puntos > 0 && !coinsDone && (
              <div className="my-6"><CoinsAnimation points={puntos} onDone={() => setCoinsDone(true)} /></div>
            )}

            {(coinsDone || puntos === 0) && (
              <>
                <div className="mb-4">
                  <p className="text-white/30 text-xs uppercase tracking-widest mb-1">{u.puntuacion}</p>
                  <p className="text-white font-black text-6xl tabular-nums">{puntos.toLocaleString()}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-white/40 text-xs mb-1">{u.paises}</p>
                  <p className="text-white font-black text-3xl">{aciertos}</p>
                </div>
              </>
            )}
          </div>
          <div className="space-y-3">
            <button onClick={iniciar}
              className="w-full bg-[#EDAE49] hover:bg-amber-400 text-black font-black py-4 text-lg rounded-xl transition">
              {u.reintentar}
            </button>
            <button onClick={() => navigate(localPath('/juegos'))}
              className="w-full text-white/40 hover:text-white/70 text-sm py-2 transition">
              {u.volver}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── JUGANDO ────────────────────────────────────────────────────────────────
  if (!paisActual) return null

  const timerPct = Math.min(100, (timeLeft / Math.max(TIEMPO_INICIO, timeLeft)) * 100)
  const timerColor = timeLeft > 20 ? 'bg-green-400' : timeLeft > 10 ? 'bg-yellow-400' : 'bg-red-500 animate-pulse'

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 md:px-8 py-5 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setFase('intro')} className="text-white/40 hover:text-white/70 text-sm transition-colors">
          {u.salir}
        </button>
        <div className="flex items-center gap-4 text-sm text-white/50">
          {combo >= 2 && <span className="text-amber-400 font-bold">🔥 ×{combo}</span>}
          <span className="text-white font-bold tabular-nums">{puntos.toLocaleString()} pts</span>
          <span className="text-white/30">🗺️ {aciertos}</span>
        </div>
      </div>

      {/* Timer */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-white/40 mb-1">
          <span>{u.tiempo}</span>
          <span className={`font-bold tabular-nums text-sm ${timeLeft <= 10 ? 'text-red-400' : ''}`}>{timeLeft}s</span>
        </div>
        <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 ${timerColor}`}
            style={{ width: `${timerPct}%` }} />
        </div>
      </div>

      {/* Map */}
      <div className="bg-black/40 border border-white/10 rounded-2xl p-3 mb-4">
        <WorldMap
          highlight={paisActual.iso}
          continent={paisActual.continente}
          hemisferio={paisActual.hemisferio}
          className="rounded-xl overflow-hidden"
        />
      </div>

      {/* Hints */}
      <div className="flex gap-3 mb-4">
        <div className={`flex-1 text-center py-3 rounded-xl border text-sm transition-all ${
          intento >= 1
            ? 'bg-amber-500/10 border-amber-500/30 text-white'
            : 'bg-white/5 border-white/10 text-white/20'
        }`}>
          {intento >= 1 ? (
            <><span className="block mb-1"><FlagImg bandera={paisActual.bandera} size={48} /></span><span className="text-xs text-white/50">{u.pistaFlag}</span></>
          ) : (
            <><span className="text-3xl block mb-1 opacity-30">🏳️</span><span className="text-xs">{u.pistaFlag}</span></>
          )}
        </div>
        <div className={`flex-1 text-center py-3 rounded-xl border text-sm transition-all ${
          intento >= 2
            ? 'bg-amber-500/10 border-amber-500/30 text-white'
            : 'bg-white/5 border-white/10 text-white/20'
        }`}>
          {intento >= 2 ? (
            <><span className="text-xl block mb-1">🏛️</span><span className="text-sm font-bold text-white">{lt(paisActual, 'capital')}</span></>
          ) : (
            <><span className="text-xl block mb-1 opacity-30">🏛️</span><span className="text-xs">{u.pistaCapital}</span></>
          )}
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`text-center py-2 px-4 rounded-xl mb-3 text-sm font-bold ${
          feedback.ok ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {feedback.msg}
        </div>
      )}

      {/* Input */}
      <div>
        <AutocompleteInput
          value={inputVal}
          onChange={setInputVal}
          onSubmit={handleRespuesta}
          paises={nombresPaises}
          disabled={!!feedback?.freeze}
          focusKey={`${levelKey}-${intento}`}
          placeholder={u.escribePais}
        />
        <p className="text-center text-white/20 text-xs mt-2">
          {intento === 0 ? u.intento1 : intento === 1 ? u.pistaFlag : u.pistaCapital}
          {' · '}{u.intentos} {intento + 1}/3
        </p>
      </div>
    </div>
  )
}
