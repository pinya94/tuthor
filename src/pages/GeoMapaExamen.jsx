import { useState, useMemo, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { PAISES, NOMBRES_PAISES, NOMBRES_PAISES_EN } from '../data/paises'
import WorldMap from '../components/WorldMap'

const REGION_FILTER = {
  europa:  p => p.continente === 'Europa' || p.continente === 'Europa/Asia',
  america: p => p.continente === 'América',
  asia:    p => p.continente === 'Asia' || p.continente === 'Europa/Asia',
  africa:  p => p.continente === 'África',
  oceania: p => p.continente === 'Oceanía',
}

const TOTAL = 10
const MIN_AREA = 30000
const MAX_ERRORS = 3

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

function flagToCode(emoji) {
  return [...emoji].map(c => String.fromCharCode(c.codePointAt(0) - 0x1F1E6 + 65)).join('').toLowerCase()
}

function FlagImg({ bandera, size = 48 }) {
  const code = flagToCode(bandera)
  return <img src={`https://flagcdn.com/w80/${code}.png`} alt={code} width={size} height={Math.round(size * 0.75)} className="inline-block rounded shadow" />
}

function calificacion(aciertos, en) {
  if (aciertos >= 9)  return { label: en ? 'Outstanding' : 'Sobresaliente', color: 'text-green-400' }
  if (aciertos >= 7)  return { label: en ? 'Good' : 'Notable',              color: 'text-blue-400'  }
  if (aciertos === 6) return { label: en ? 'Fair' : 'Bien',                 color: 'text-yellow-300'}
  if (aciertos === 5) return { label: en ? 'Pass' : 'Suficiente',           color: 'text-orange-400'}
  return { label: en ? 'Fail' : 'Insuficiente', color: 'text-red-400' }
}

function AutocompleteInput({ value, onChange, onSubmit, disabled, focusKey, lang }) {
  const [focused, setFocused] = useState(false)
  const [hlIdx, setHlIdx] = useState(-1)
  const ref = useRef(null)

  useEffect(() => { if (!disabled) ref.current?.focus() }, [focusKey, disabled])

  const nombres = lang === 'en' ? NOMBRES_PAISES_EN : NOMBRES_PAISES
  const filtered = useMemo(() => {
    if (!value || value.length < 1) return []
    const norm = normalize(value)
    return nombres.filter(n => normalize(n).includes(norm)).slice(0, 6)
  }, [value, nombres])

  function select(name) {
    onChange(name); setFocused(false); setHlIdx(-1)
    setTimeout(() => onSubmit(name), 50)
  }
  function handleKey(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHlIdx(i => Math.min(i + 1, filtered.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHlIdx(i => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter') {
      e.preventDefault()
      if (hlIdx >= 0 && filtered[hlIdx]) select(filtered[hlIdx])
      else if (filtered.length === 1) select(filtered[0])
      else onSubmit(value)
    }
  }

  return (
    <div className="relative">
      <input ref={ref} type="text" value={value}
        onChange={e => { onChange(e.target.value); setHlIdx(-1) }}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        onKeyDown={handleKey} disabled={disabled}
        placeholder={lang === 'en' ? 'Type a country…' : 'Escribe un país…'}
        className="w-full bg-white/10 border-2 border-white/20 focus:border-[#EDAE49] rounded-xl px-4 py-3 text-white text-lg placeholder:text-white/25 outline-none transition-colors disabled:opacity-40"
        autoComplete="off" />
      {focused && filtered.length > 0 && (
        <div className="absolute z-50 w-full bottom-full mb-1 bg-[#1a1a2e] border border-white/20 rounded-xl overflow-hidden shadow-2xl max-h-48 overflow-y-auto">
          {filtered.map((name, i) => (
            <button key={name} onMouseDown={() => select(name)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                i === hlIdx ? 'bg-[#EDAE49]/20 text-[#EDAE49]' : 'text-white/70 hover:bg-white/10'
              }`}>{name}</button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function GeoMapaExamen() {
  const navigate = useNavigate()
  const { lang, localPath, lt } = useLang()
  const location = useLocation()
  const { region, titulo, backPath } = location.state || {}
  const en = lang === 'en'

  const pool = useMemo(() => {
    const filter = REGION_FILTER[region]
    if (!filter) return []
    return shuffle(PAISES.filter(p => filter(p) && p.area >= MIN_AREA)).slice(0, TOTAL)
  }, [region])

  const [idx, setIdx]             = useState(0)
  const [aciertos, setAciertos]   = useState(0)
  const [historial, setHistorial] = useState([])
  const [fase, setFase]           = useState('jugando')

  // Per-country state
  const [errores, setErrores]     = useState(0)
  const [showFlag, setShowFlag]   = useState(false)
  const [showCapital, setShowCapital] = useState(false)
  const [inputVal, setInputVal]   = useState('')
  const [feedback, setFeedback]   = useState(null)
  const [resueltoPais, setResueltoPais] = useState(false)

  function iniciarPais(paisIdx) {
    const pais = pool[paisIdx]
    if (!pais) return
    setErrores(0)
    setShowFlag(false)
    setShowCapital(false)
    setInputVal('')
    setFeedback(null)
    setResueltoPais(false)
  }

  useState(() => { if (pool.length > 0) iniciarPais(0) })

  if (!region || pool.length < TOTAL) {
    return (
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="text-center text-white/50">
          <p className="text-lg mb-4">{en ? 'Not enough countries for this region.' : 'No hay suficientes países para esta región.'}</p>
          <button onClick={() => navigate(backPath ? localPath(backPath) : -1)} className="text-[#EDAE49] hover:underline">{en ? '← Back' : '← Volver'}</button>
        </div>
      </div>
    )
  }

  const paisActual = pool[idx]

  function getName(p) { return lt(p, 'nombre') }

  function handleRespuesta(val) {
    const nombreInput = val || inputVal
    const paisResp = PAISES.find(p => getName(p) === nombreInput)
    if (!paisResp) {
      setFeedback({ ok: false, msg: en ? 'Country not recognised' : 'País no reconocido' })
      setTimeout(() => setFeedback(null), 1200)
      return
    }

    if (paisResp.nombre === paisActual.nombre) {
      setAciertos(a => a + 1)
      setHistorial(h => [...h, { passed: true }])
      setFeedback({ ok: true, msg: `🎉 ¡${getName(paisActual)}!` })
      setResueltoPais(true)
      setTimeout(() => siguientePais(), 1500)
      return
    }

    // Wrong answer
    const newErrores = errores + 1
    setErrores(newErrores)
    setInputVal('')

    if (newErrores >= MAX_ERRORS) {
      // Failed this country
      setHistorial(h => [...h, { passed: false }])
      setFeedback({ ok: false, msg: en ? `It was ${getName(paisActual)}` : `Era ${getName(paisActual)}` })
      setResueltoPais(true)
      setTimeout(() => siguientePais(), 2000)
      return
    }

    if (newErrores === 1) {
      setShowFlag(true)
      setFeedback({ ok: false, msg: en ? `Not ${nombreInput} — here's the flag` : `No es ${nombreInput} — aquí tienes la bandera` })
    } else if (newErrores === 2) {
      setShowCapital(true)
      const cap = lt(paisActual, 'capital')
      setFeedback({ ok: false, msg: en ? `Not ${nombreInput} — capital: ${cap}` : `No es ${nombreInput} — capital: ${cap}` })
    }
    setTimeout(() => setFeedback(null), 1500)
  }

  function siguientePais() {
    if (idx + 1 >= TOTAL) {
      setFase('resultado')
    } else {
      const next = idx + 1
      setIdx(next)
      iniciarPais(next)
    }
  }

  // ── RESULTADO ─────────────────────────────────────────────────────────────
  if (fase === 'resultado') {
    const aprobado = aciertos >= 5
    const cal = calificacion(aciertos, en)
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="max-w-md w-full">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center mb-4">
            <div className="text-5xl mb-3">{aprobado ? '🎉' : '😬'}</div>
            <div className={`text-xs uppercase tracking-widest font-semibold mb-1 ${aprobado ? 'text-green-400' : 'text-red-400'}`}>
              {aprobado ? (en ? 'Passed' : 'Aprobado') : (en ? 'Failed' : 'Suspenso')}
            </div>
            <h2 className="text-2xl font-black text-white mb-1">{cal.label}</h2>
            <p className={`text-5xl font-black mb-1 ${cal.color}`}>{aciertos}/{TOTAL}</p>
            <p className="text-white/40 text-sm">
              {en ? `Countries guessed — Geography of ${titulo}` : `Países acertados — Geografía de ${titulo}`}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-3 font-semibold">
              {en ? 'Detail' : 'Detalle'}
            </p>
            <div className="flex gap-2 flex-wrap">
              {historial.map((h, i) => (
                <div key={i} className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-xs font-bold ${
                  h.passed ? 'bg-green-400/20 border-green-400 text-green-400' : 'bg-red-400/20 border-red-400 text-red-400'
                }`}>{i + 1}</div>
              ))}
            </div>
          </div>

          <button onClick={() => { setIdx(0); setAciertos(0); setHistorial([]); setFase('jugando'); iniciarPais(0) }}
            className="w-full py-3 bg-[#EDAE49] hover:bg-amber-400 text-black font-black rounded-2xl transition-all mb-2">
            {en ? 'Retake exam' : 'Repetir examen'}
          </button>
          <button onClick={() => navigate(backPath ? localPath(backPath) : -1)}
            className="w-full py-3 text-white/40 hover:text-white/70 text-sm transition-colors">
            {en ? '← Back to Geography' : '← Volver a Geografía'}
          </button>
        </div>
      </div>
    )
  }

  // ── JUGANDO ───────────────────────────────────────────────────────────────
  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 md:px-8 py-5 max-w-3xl mx-auto w-full">

      <div className="flex items-center justify-between mb-3">
        <button onClick={() => navigate(backPath ? localPath(backPath) : -1)} className="text-white/40 hover:text-white/70 text-sm transition-colors">
          {en ? '← Exit' : '← Salir'}
        </button>
        <span className="text-white/40 text-sm font-bold">🗺️ {titulo} · {idx + 1}/{TOTAL}</span>
      </div>

      {/* Progress */}
      <div className="mb-5">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#EDAE49] rounded-full transition-all duration-300"
            style={{ width: `${(idx / TOTAL) * 100}%` }} />
        </div>
        <div className="flex gap-1.5 mt-2">
          {historial.map((h, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${h.passed ? 'bg-green-400' : 'bg-red-400'}`} />
          ))}
          <div className="h-1.5 flex-1 rounded-full bg-white/30" />
          {Array.from({ length: TOTAL - historial.length - 1 }).map((_, i) => (
            <div key={`p-${i}`} className="h-1.5 flex-1 rounded-full bg-white/10" />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col md:grid md:grid-cols-[1fr_320px] md:gap-8 md:items-start">

        {/* Map + hints */}
        <div className="mb-5 md:mb-0">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white/30 text-xs font-semibold uppercase tracking-widest">
                {en ? `Country ${idx + 1}` : `País ${idx + 1}`}
              </h2>
              <span className="text-white/20 text-xs">
                {errores}/{MAX_ERRORS} {en ? 'errors' : 'errores'}
              </span>
            </div>

            <WorldMap highlight={paisActual.iso} className="rounded-xl overflow-hidden" />

            {/* Hints revealed on wrong answers */}
            {(showFlag || showCapital) && (
              <div className="mt-4 space-y-2">
                {showFlag && (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm bg-[#EDAE49]/10 border border-[#EDAE49]/30 text-white">
                    <FlagImg bandera={paisActual.bandera} size={32} />
                    <span>{en ? 'Flag hint' : 'Pista: bandera'}</span>
                  </div>
                )}
                {showCapital && (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm bg-[#EDAE49]/10 border border-[#EDAE49]/30 text-white">
                    <span className="text-base">🏛️</span>
                    <span>{en ? 'Capital' : 'Capital'}: {lt(paisActual, 'capital')}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="flex flex-col gap-4">
          {!resueltoPais && (
            <>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">🗺️</span>
                  <p className="text-white/30 text-xs uppercase tracking-widest">
                    {en ? 'Which country is highlighted?' : '¿Qué país está resaltado?'}
                  </p>
                </div>
                <p className="text-white font-bold text-sm">
                  {en ? 'Look at the map and guess the country' : 'Mira el mapa y adivina el país'}
                </p>
              </div>
              <AutocompleteInput value={inputVal} onChange={setInputVal} onSubmit={handleRespuesta}
                disabled={!!feedback} focusKey={`${idx}-${errores}`} lang={lang} />
            </>
          )}
          {feedback && (
            <div className={`text-center py-2 rounded-xl font-bold text-sm ${
              feedback.ok === true ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}>{feedback.msg}</div>
          )}
        </div>
      </div>
    </div>
  )
}
