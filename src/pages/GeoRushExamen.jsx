import { useState, useMemo, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { PAISES, NOMBRES_PAISES } from '../data/paises'

const REGION_FILTER = {
  europa:  p => p.continente === 'Europa' || p.continente === 'Europa/Asia',
  america: p => p.continente === 'América',
  asia:    p => p.continente === 'Asia' || p.continente === 'Europa/Asia',
  africa:  p => p.continente === 'África',
  oceania: p => p.continente === 'Oceanía',
}

const TOTAL = 10

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

function generarPistas(pais) {
  const pobRef = pais.poblacion > 100000000 ? 100000000 : pais.poblacion > 50000000 ? 50000000 : 20000000
  const areaRef = pais.area > 500000 ? 500000 : pais.area > 100000 ? 100000 : 50000

  const obligatorias = shuffle([
    { texto: `Hemisferio ${pais.hemisferio === 'ambos' ? 'norte y sur' : pais.hemisferio}`, tipo: 'obligatoria' },
    { texto: `Tiene ${pais.area >= areaRef ? 'más' : 'menos'} de ${areaRef.toLocaleString()} km²`, tipo: 'obligatoria' },
    { texto: `Tiene ${pais.poblacion >= pobRef ? 'más' : 'menos'} de ${(pobRef / 1000000).toFixed(0)}M habitantes`, tipo: 'obligatoria' },
    { texto: pais.guerras === 'ambas' ? 'Participó en ambas guerras mundiales'
      : pais.guerras === 'I' ? 'Participó en la I Guerra Mundial'
      : pais.guerras === 'II' ? 'Participó en la II Guerra Mundial'
      : 'No participó en guerras mundiales', tipo: 'obligatoria' },
  ]).slice(0, 3)

  const regalos = shuffle([
    { texto: `Montaña: ${pais.montana}`, tipo: 'regalo' },
    { texto: `Río: ${pais.rio}`, tipo: 'regalo' },
    { texto: `Idioma: ${pais.idioma}`, tipo: 'regalo' },
    { texto: `Famoso: ${pais.famoso}`, tipo: 'regalo' },
  ]).slice(0, 2)

  const result = [obligatorias[0]]
  const resto = shuffle([...obligatorias.slice(1), ...regalos])
  result.push(...resto)
  return result
}

function calificacion(aciertos) {
  if (aciertos >= 9)  return { label: 'Sobresaliente', color: 'text-green-400' }
  if (aciertos >= 7)  return { label: 'Notable',       color: 'text-blue-400'  }
  if (aciertos === 6) return { label: 'Bien',           color: 'text-yellow-300'}
  if (aciertos === 5) return { label: 'Suficiente',     color: 'text-orange-400'}
  return { label: 'Insuficiente', color: 'text-red-400' }
}

function AutocompleteInput({ value, onChange, onSubmit, disabled, focusKey }) {
  const [focused, setFocused] = useState(false)
  const [hlIdx, setHlIdx] = useState(-1)
  const ref = useRef(null)

  useEffect(() => { if (!disabled) ref.current?.focus() }, [focusKey, disabled])

  const filtered = useMemo(() => {
    if (!value || value.length < 1) return []
    const norm = normalize(value)
    return NOMBRES_PAISES.filter(n => normalize(n).includes(norm)).slice(0, 6)
  }, [value])

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
        onKeyDown={handleKey} disabled={disabled} placeholder="Escribe un país…"
        className="w-full bg-white/10 border-2 border-white/20 focus:border-[#EDAE49] rounded-xl px-4 py-3 text-white text-lg placeholder:text-white/25 outline-none transition-colors disabled:opacity-40"
        autoComplete="off" />
      {focused && filtered.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-[#1a1a2e] border border-white/20 rounded-xl overflow-hidden shadow-2xl max-h-48 overflow-y-auto">
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

export default function GeoRushExamen() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const location = useLocation()
  const { region, titulo, backPath } = location.state || {}

  const pool = useMemo(() => {
    const filter = REGION_FILTER[region]
    if (!filter) return []
    return shuffle(PAISES.filter(filter)).slice(0, TOTAL)
  }, [region])

  const [idx, setIdx]             = useState(0)
  const [aciertos, setAciertos]   = useState(0)
  const [historial, setHistorial] = useState([])
  const [fase, setFase]           = useState('jugando') // 'jugando' | 'resultado'

  // Per-country state
  const [pistas, setPistas]       = useState([])
  const [pistaIdx, setPistaIdx]   = useState(0)
  const [inputVal, setInputVal]   = useState('')
  const [feedback, setFeedback]   = useState(null)
  const [resueltoPais, setResueltoPais] = useState(false)

  function iniciarPais(paisIdx) {
    const pais = pool[paisIdx]
    if (!pais) return
    setPistas(generarPistas(pais))
    setPistaIdx(0)
    setInputVal('')
    setFeedback(null)
    setResueltoPais(false)
  }

  useState(() => { if (pool.length > 0) iniciarPais(0) })

  if (!region || pool.length < TOTAL) {
    return (
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="text-center text-white/50">
          <p className="text-lg mb-4">No hay suficientes países para esta región.</p>
          <button onClick={() => navigate(backPath ? localPath(backPath) : -1)} className="text-[#EDAE49] hover:underline">← Volver</button>
        </div>
      </div>
    )
  }

  const paisActual = pool[idx]

  function handleRespuesta(val) {
    const nombreInput = val || inputVal
    const paisResp = PAISES.find(p => p.nombre === nombreInput)
    if (!paisResp) {
      setFeedback({ ok: false, msg: 'País no reconocido' })
      setTimeout(() => setFeedback(null), 1200)
      return
    }

    if (nombreInput === paisActual.nombre) {
      setAciertos(a => a + 1)
      setHistorial(h => [...h, { passed: true }])
      setFeedback({ ok: true, msg: `🎉 ¡${paisActual.nombre}!` })
      setResueltoPais(true)
      setTimeout(() => siguientePais(), 1500)
      return
    }

    // Advance clue
    setInputVal('')
    const pista = pistas[pistaIdx]
    if (pista?.tipo === 'regalo') {
      setFeedback({ ok: 'neutral', msg: `No es ${nombreInput} — siguiente pista` })
    } else {
      setFeedback({ ok: false, msg: `No es ${nombreInput}` })
    }
    setTimeout(() => {
      setFeedback(null)
      if (pistaIdx + 1 < pistas.length) {
        setPistaIdx(i => i + 1)
      } else {
        setHistorial(h => [...h, { passed: false }])
        setFeedback({ ok: false, msg: `Era ${paisActual.nombre}` })
        setResueltoPais(true)
        setTimeout(() => siguientePais(), 2000)
      }
    }, 1000)
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
    const cal = calificacion(aciertos)
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="max-w-md w-full">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center mb-4">
            <div className="text-5xl mb-3">{aprobado ? '🎉' : '😬'}</div>
            <div className={`text-xs uppercase tracking-widest font-semibold mb-1 ${aprobado ? 'text-green-400' : 'text-red-400'}`}>
              {aprobado ? 'Aprobado' : 'Suspenso'}
            </div>
            <h2 className="text-2xl font-black text-white mb-1">{cal.label}</h2>
            <p className={`text-5xl font-black mb-1 ${cal.color}`}>{aciertos}/{TOTAL}</p>
            <p className="text-white/40 text-sm">Países acertados — Geografía de {titulo}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-3 font-semibold">Detalle</p>
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
            Repetir examen
          </button>
          <button onClick={() => navigate(backPath ? localPath(backPath) : -1)}
            className="w-full py-3 text-white/40 hover:text-white/70 text-sm transition-colors">
            ← Volver a Geografía
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
          ← Salir
        </button>
        <span className="text-white/40 text-sm font-bold">🌍 {titulo} · {idx + 1}/{TOTAL}</span>
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

        {/* Pistas */}
        <div className="mb-5 md:mb-0">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-7">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white/30 text-xs font-semibold uppercase tracking-widest">País {idx + 1}</h2>
              <span className="text-white/20 text-xs">{pistaIdx + 1}/{pistas.length}</span>
            </div>
            <div className="space-y-2">
              {pistas.map((p, i) => {
                const revelada = i < pistaIdx || resueltoPais
                const activa = i === pistaIdx && !resueltoPais
                const bloqueada = i > pistaIdx && !resueltoPais
                const icono = p.tipo === 'regalo' ? '🎁' : '🔒'

                if (bloqueada) return (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm bg-white/3 border border-white/5 text-white/15">
                    <span className="text-base opacity-40">{icono}</span>
                    <span>Pista oculta</span>
                  </div>
                )
                return (
                  <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                    activa ? 'bg-[#EDAE49]/15 border border-[#EDAE49]/40 text-white'
                      : 'bg-white/5 border border-white/10 text-white/50'
                  }`}>
                    <span className="text-base">{revelada ? '✅' : icono}</span>
                    <span>{p.texto}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="flex flex-col gap-4">
          {!resueltoPais && (
            <>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">{pistas[pistaIdx]?.tipo === 'regalo' ? '🎁' : '🔒'}</span>
                  <p className="text-white/30 text-xs uppercase tracking-widest">
                    {pistas[pistaIdx]?.tipo === 'regalo' ? 'Pista regalo' : 'Escribe un país que cumpla'}
                  </p>
                </div>
                <p className="text-white font-bold text-sm">{pistas[pistaIdx]?.texto}</p>
              </div>
              <AutocompleteInput value={inputVal} onChange={setInputVal} onSubmit={handleRespuesta}
                disabled={!!feedback} focusKey={`${idx}-${pistaIdx}`} />
            </>
          )}
          {feedback && (
            <div className={`text-center py-2 rounded-xl font-bold text-sm ${
              feedback.ok === true ? 'bg-green-500/20 text-green-400'
                : feedback.ok === 'neutral' ? 'bg-white/10 text-white/60'
                : 'bg-red-500/20 text-red-400'
            }`}>{feedback.msg}</div>
          )}
        </div>
      </div>
    </div>
  )
}
