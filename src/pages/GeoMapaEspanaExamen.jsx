import { useState, useMemo, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import SpainMap from '../components/SpainMap'
import { COMUNIDADES, NOMBRES_COMUNIDADES, NOMBRES_COMUNIDADES_EN, NOMBRES_COMUNIDADES_CA } from '../data/espanaRegiones'
import PageMeta from '../components/PageMeta'

const TOTAL = 10
const MAX_ERRORS = 2

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

function calificacion(aciertos, lang) {
  const en = lang === 'en', ca = lang === 'ca'
  if (aciertos >= 9)  return { label: en ? 'Outstanding' : ca ? 'Excel·lent'  : 'Sobresaliente', color: 'text-green-400' }
  if (aciertos >= 7)  return { label: en ? 'Good'        : ca ? 'Notable'     : 'Notable',       color: 'text-blue-400'  }
  if (aciertos === 6) return { label: en ? 'Fair'        : ca ? 'Bé'          : 'Bien',          color: 'text-yellow-300'}
  if (aciertos === 5) return { label: en ? 'Pass'        : ca ? 'Suficient'   : 'Suficiente',    color: 'text-orange-400'}
  return                     { label: en ? 'Fail'        : ca ? 'Insuficient' : 'Insuficiente',  color: 'text-red-400' }
}

function AutocompleteInput({ value, onChange, onSubmit, disabled, focusKey, lang }) {
  const [focused, setFocused] = useState(false)
  const [hlIdx, setHlIdx] = useState(-1)
  const ref = useRef(null)

  useEffect(() => { if (!disabled) ref.current?.focus() }, [focusKey, disabled])

  const nombres = lang === 'en' ? NOMBRES_COMUNIDADES_EN : lang === 'ca' ? NOMBRES_COMUNIDADES_CA : NOMBRES_COMUNIDADES
  const filtered = useMemo(() => {
    if (!value || value.length < 1) return []
    const norm = normalize(value)
    return nombres.filter(n => normalize(n).includes(norm)).slice(0, 6)
  }, [value, nombres])

  function select(name) { onChange(name); setFocused(false); setHlIdx(-1); setTimeout(() => onSubmit(name), 50) }
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
        placeholder={lang === 'en' ? 'Type a community…' : lang === 'ca' ? 'Escriu una comunitat…' : 'Escribe una comunidad…'}
        className="w-full bg-white/10 border-2 border-white/20 focus:border-[#EDAE49] rounded-xl px-4 py-3 text-white text-lg placeholder:text-white/25 outline-none transition-colors disabled:opacity-40"
        autoComplete="off" />
      {focused && filtered.length > 0 && (
        <div className="absolute z-50 w-full bottom-full mb-1 bg-[#1a1a2e] border border-white/20 rounded-xl overflow-hidden shadow-2xl max-h-48 overflow-y-auto">
          {filtered.map((name, i) => (
            <button key={name} onMouseDown={() => select(name)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${i === hlIdx ? 'bg-[#EDAE49]/20 text-[#EDAE49]' : 'text-white/70 hover:bg-white/10'}`}>{name}</button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function GeoMapaEspanaExamen() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const { user } = useAuth()
  const location = useLocation()
  const { backPath } = location.state || {}
  const en = lang === 'en'
  const ca = lang === 'ca'

  const pageMeta = <PageMeta
    title={en ? 'Spain Map Exam' : ca ? 'Examen Mapa d\'Espanya' : 'Examen Mapa de España'}
    description={en ? 'Identify Spanish regions on an interactive map. 10 questions, instant feedback.' : ca ? 'Identifica les comunitats autònomes d\'Espanya al mapa. 10 preguntes, retroalimentació immediata.' : 'Identifica las comunidades autónomas de España en el mapa interactivo. 10 preguntas, feedback inmediato.'}
    path="/examen/geomapa-espana" lang={lang} />

  const pool = useMemo(() => shuffle(COMUNIDADES).slice(0, TOTAL), [])

  const [idx, setIdx]             = useState(0)
  const [aciertos, setAciertos]   = useState(0)
  const [historial, setHistorial] = useState([])
  const [fase, setFase]           = useState('jugando')

  // Guardar al terminar (una vez por partida)
  const savedRef = useRef(false)
  useEffect(() => {
    if (fase !== 'resultado' || savedRef.current || !user) return
    savedRef.current = true
    saveActivity(user.uid, {
      type: 'examen', game: 'geomapa-espana-examen', category: 'geomapa-espana-examen',
      score: aciertos * 100, passed: aciertos >= 5,
      coinsEarned: Math.min(aciertos * 20, 200),
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }, [fase]) // eslint-disable-line react-hooks/exhaustive-deps
  const [errores, setErrores]     = useState(0)
  const [showCapital, setShowCapital] = useState(false)
  const [inputVal, setInputVal]   = useState('')
  const [feedback, setFeedback]   = useState(null)
  const [resueltoPais, setResueltoPais] = useState(false)

  function getNombre(c) {
    return lang === 'en' ? c.nombreEn : lang === 'ca' ? c.nombreCa : c.nombre
  }
  function getCapital(c) {
    return lang === 'en' ? (c.capitalEn || c.capital) : c.capital
  }

  function iniciar() {
    setErrores(0); setShowCapital(false); setInputVal(''); setFeedback(null); setResueltoPais(false)
  }

  const comunidadActual = pool[idx]

  function handleRespuesta(val) {
    const input = (val || inputVal).trim()
    // find matching comunidad by any language name
    const match = COMUNIDADES.find(c =>
      normalize(c.nombre) === normalize(input) ||
      normalize(c.nombreEn) === normalize(input) ||
      normalize(c.nombreCa) === normalize(input)
    )
    if (!match) {
      setFeedback({ ok: false, msg: en ? 'Not recognised' : ca ? 'No reconegut' : 'No reconocido' })
      setTimeout(() => setFeedback(null), 1200)
      return
    }
    if (match.geoName === comunidadActual.geoName) {
      setAciertos(a => a + 1)
      setHistorial(h => [...h, { passed: true }])
      setFeedback({ ok: true, msg: `🎉 ${getNombre(comunidadActual)}!` })
      setResueltoPais(true)
      setTimeout(() => siguienteRegion(), 1500)
      return
    }
    const newErrores = errores + 1
    setErrores(newErrores)
    setInputVal('')
    if (newErrores >= MAX_ERRORS) {
      setHistorial(h => [...h, { passed: false }])
      setFeedback({ ok: false, msg: en ? `It was ${getNombre(comunidadActual)}` : ca ? `Era ${getNombre(comunidadActual)}` : `Era ${getNombre(comunidadActual)}` })
      setResueltoPais(true)
      setTimeout(() => siguienteRegion(), 2000)
      return
    }
    setShowCapital(true)
    setFeedback({ ok: false, msg: en ? `Not that — capital: ${getCapital(comunidadActual)}` : ca ? `No és — capital: ${getCapital(comunidadActual)}` : `No es esa — capital: ${getCapital(comunidadActual)}` })
    setTimeout(() => setFeedback(null), 1800)
  }

  function siguienteRegion() {
    if (idx + 1 >= TOTAL) { setFase('resultado') }
    else { setIdx(i => i + 1); iniciar() }
  }

  // RESULTADO
  if (fase === 'resultado') {
    const aprobado = aciertos >= 5
    const cal = calificacion(aciertos, lang)
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {pageMeta}
        <div className="max-w-md w-full">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center mb-4">
            <div className="text-5xl mb-3">{aprobado ? '🎉' : '😬'}</div>
            <div className={`text-xs uppercase tracking-widest font-semibold mb-1 ${aprobado ? 'text-green-400' : 'text-red-400'}`}>
              {aprobado ? (en ? 'Passed' : ca ? 'Aprovat' : 'Aprobado') : (en ? 'Failed' : ca ? 'Suspès' : 'Suspenso')}
            </div>
            <h2 className="text-2xl font-black text-white mb-1">{cal.label}</h2>
            <p className={`text-5xl font-black mb-1 ${cal.color}`}>{aciertos}/{TOTAL}</p>
            <p className="text-white/40 text-sm">{en ? 'Regions identified · Spain' : ca ? 'Regions identificades · Espanya' : 'Comunidades identificadas · España'}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-3 font-semibold">{en ? 'Detail' : ca ? 'Detall' : 'Detalle'}</p>
            <div className="flex gap-2 flex-wrap">
              {historial.map((h, i) => (
                <div key={i} className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-xs font-bold ${h.passed ? 'bg-green-400/20 border-green-400 text-green-400' : 'bg-red-400/20 border-red-400 text-red-400'}`}>{i + 1}</div>
              ))}
            </div>
          </div>
          <button onClick={() => { setIdx(0); setAciertos(0); setHistorial([]); setFase('jugando'); iniciar() }}
            className="w-full py-3 bg-[#EDAE49] hover:bg-amber-400 text-black font-black rounded-2xl transition-all mb-2">
            {en ? 'Retake exam' : ca ? 'Repetir examen' : 'Repetir examen'}
          </button>
          <button onClick={() => navigate(backPath ? localPath(backPath) : localPath('/estudiar/geografia/espana'))}
            className="w-full py-3 text-white/40 hover:text-white/70 text-sm transition-colors">
            {en ? '← Back' : '← Volver'}
          </button>
        </div>
      </div>
    )
  }

  // JUGANDO
  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 md:px-8 py-5 max-w-3xl mx-auto w-full">
      {pageMeta}
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => navigate(backPath ? localPath(backPath) : localPath('/estudiar/geografia/espana'))}
          className="text-white/40 hover:text-white/70 text-sm transition-colors">{en ? '← Exit' : '← Salir'}</button>
        <span className="text-white/40 text-sm font-bold">🗺️ {en ? 'Spain' : ca ? 'Espanya' : 'España'} · {idx + 1}/{TOTAL}</span>
      </div>

      <div className="mb-5">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#EDAE49] rounded-full transition-all duration-300" style={{ width: `${(idx / TOTAL) * 100}%` }} />
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

      <div className="flex-1 flex flex-col">
        <div className="bg-black/40 border border-white/10 rounded-2xl p-2 sm:p-3 mb-4">
          <div className="flex items-center justify-between mb-2 px-1">
            <h2 className="text-white/30 text-xs font-semibold uppercase tracking-widest">
              {en ? `Region ${idx + 1}` : ca ? `Regió ${idx + 1}` : `Comunidad ${idx + 1}`}
            </h2>
            <span className="text-white/20 text-xs">{errores}/{MAX_ERRORS} {en ? 'errors' : 'errores'}</span>
          </div>
          <SpainMap highlight={comunidadActual.geoName} />
        </div>

        {showCapital && (
          <div className="flex gap-3 mb-4">
            <div className="flex-1 text-center py-3 rounded-xl border bg-amber-500/10 border-amber-500/30 text-white">
              <span className="text-xl block mb-1">🏛️</span>
              <span className="text-sm font-bold text-white">{getCapital(comunidadActual)}</span>
              <span className="text-xs text-white/50 block">{en ? 'Hint: capital' : ca ? 'Pista: capital' : 'Pista: capital'}</span>
            </div>
          </div>
        )}

        {feedback && (
          <div className={`text-center py-2 px-4 rounded-xl mb-3 text-sm font-bold ${feedback.ok ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {feedback.msg}
          </div>
        )}

        {!resueltoPais && (
          <AutocompleteInput value={inputVal} onChange={setInputVal} onSubmit={handleRespuesta}
            disabled={!!feedback} focusKey={`${idx}-${errores}`} lang={lang} />
        )}
      </div>
    </div>
  )
}
