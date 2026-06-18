import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { PORTADAS } from '../data/portadas'

const DIFS = {
  facil:   { label: 'Fácil',   emoji: '🟢', tiempoInicio: 60, suma: 10, resta: 10 },
  medio:   { label: 'Medio',   emoji: '🟡', tiempoInicio: 30, suma:  5, resta: 10 },
  dificil: { label: 'Difícil', emoji: '🔴', tiempoInicio: 20, suma:  3, resta: 15 },
}

const CAT_STYLE = {
  política:   'bg-blue-500/20 text-blue-300 border-blue-500/30',
  ciencia:    'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  guerra:     'bg-red-500/20 text-red-300 border-red-500/30',
  cultura:    'bg-purple-500/20 text-purple-300 border-purple-500/30',
  deportes:   'bg-orange-500/20 text-orange-300 border-orange-500/30',
  catástrofe: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  espacio:    'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function PortadaCard({ p }) {
  const catStyle = CAT_STYLE[p.categoria] || 'bg-white/10 text-white/50 border-white/10'
  return (
    <div
      className="bg-[#f5f0e3] rounded-2xl overflow-hidden shadow-2xl border border-[#c8b89a]"
      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
    >
      {/* Barra superior gruesa */}
      <div className="h-2.5 bg-gray-900" />

      {/* Cabecera del periódico */}
      <div className="px-4 pt-2 pb-2 border-b-2 border-gray-800 text-center">
        <p className="text-[9px] uppercase tracking-widest text-gray-500 mb-0.5">
          {p.lugar} · {p.mes}
        </p>
        <h1 className="text-xl font-black uppercase tracking-wide text-gray-900 leading-tight">
          {p.periodico}
        </h1>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[8px] text-gray-400">Edición especial</span>
          <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded border ${catStyle}`}>
            {p.categoria}
          </span>
          <span className="text-[8px] text-gray-400">Precio: 10 ctos.</span>
        </div>
      </div>

      {/* Línea decorativa doble */}
      <div className="mx-3 mt-0 border-t-2 border-b border-gray-700" style={{ marginTop: '2px', paddingTop: '1px' }} />

      {/* Contenido */}
      <div className="px-4 py-3">
        <h2 className="text-base font-black leading-snug text-gray-900 mb-2">
          {p.titular}
        </h2>
        <div className="border-t border-b border-gray-300 py-2">
          <p className="text-[11px] leading-relaxed text-gray-600">
            {p.subtitular}
          </p>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="h-1.5 bg-gray-900 mx-4 mb-3 rounded-sm" />
    </div>
  )
}

export default function Portadas() {
  const navigate = useNavigate()
  const [fase, setFase]         = useState('intro')
  const [difId, setDifId]       = useState('medio')
  const [portadas, setPortadas] = useState([])
  const [idx, setIdx]           = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [aciertos, setAciertos] = useState(0)
  const [total, setTotal]       = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [levelKey, setLevelKey] = useState(0)

  const timerRef  = useRef(null)
  const tiempoRef = useRef(null)

  const dif     = DIFS[difId]
  const portada = portadas[idx]

  function iniciar(selectedDif) {
    const d = DIFS[selectedDif]
    setDifId(selectedDif)
    setPortadas(shuffle(PORTADAS))
    setIdx(0)
    setTimeLeft(d.tiempoInicio)
    setAciertos(0)
    setTotal(0)
    setFeedback(null)
    setFase('jugando')
    setLevelKey(k => k + 1)
  }

  // Timer
  useEffect(() => {
    if (fase !== 'jugando') return
    tiempoRef.current = timeLeft

    timerRef.current = setInterval(() => {
      tiempoRef.current -= 1
      setTimeLeft(tiempoRef.current)
      if (tiempoRef.current <= 0) {
        clearInterval(timerRef.current)
        setFase('fin')
      }
    }, 1000)

    return () => clearInterval(timerRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelKey])

  function handleRespuesta(respuesta) {
    clearInterval(timerRef.current)
    const correcto = respuesta === portada.veracidad
    const delta    = correcto ? dif.suma : -dif.resta
    setAciertos(a => correcto ? a + 1 : a)
    setTotal(t => t + 1)
    setFeedback({ correcto, delta, portada })
    setFase('feedback')
  }

  function continuar() {
    const newTime = timeLeft + feedback.delta
    const nextIdx = idx + 1
    if (newTime <= 0 || nextIdx >= portadas.length) {
      setFase('fin')
      return
    }
    setTimeLeft(newTime)
    setIdx(nextIdx)
    setFeedback(null)
    setFase('jugando')
    setLevelKey(k => k + 1)
  }

  // ── INTRO ─────────────────────────────────────────────────────────────────
  if (fase === 'intro') {
    const d = DIFS[difId]
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="max-w-md w-full">
          <button onClick={() => navigate('/juegos')}
            className="text-white/30 hover:text-white/60 text-sm mb-6 flex items-center gap-1 transition-colors">
            ← Volver
          </button>
          <div className="text-center mb-6">
            <span className="text-6xl block mb-3">📰</span>
            <h1 className="text-3xl font-black text-white mb-1">Portadas</h1>
            <p className="text-white/40 text-sm">Lee el titular histórico y decide: ¿verdad o mentira?</p>
          </div>

          {/* Selector dificultad */}
          <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl mb-5 w-fit mx-auto">
            {Object.entries(DIFS).map(([id, d]) => (
              <button key={id} onClick={() => setDifId(id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  difId === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'
                }`}>
                {d.emoji} {d.label}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5 space-y-2.5 text-sm">
            {[
              ['⏱️', 'Tiempo inicial', `${d.tiempoInicio} segundos`],
              ['✅', 'Al acertar',     `+${d.suma}s`],
              ['❌', 'Al fallar',      `−${d.resta}s`],
              ['📰', 'Portadas',       `${PORTADAS.length} titulares históricos`],
            ].map(([e, k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4">
                <span className="text-white/40 shrink-0">{e} {k}</span>
                <span className="text-white font-semibold text-right">{v}</span>
              </div>
            ))}
          </div>

          {/* Cómo funciona */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">Cómo funciona</p>
            <div className="space-y-2">
              {[
                ['📰', 'Aparece la portada de un periódico histórico real'],
                ['🤔', 'Decide si el titular es VERDAD o MENTIRA'],
                ['⏱️', 'Si aciertas ganas tiempo; si fallas lo pierdes'],
                ['💡', 'Siempre verás la explicación: así aprendes de verdad'],
              ].map(([e, t]) => (
                <div key={t} className="flex items-start gap-3 text-sm text-white/50">
                  <span className="text-base w-5 shrink-0 text-center">{e}</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => iniciar(difId)}
            className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/30">
            ¡Empezar! →
          </button>
        </div>
      </div>
    )
  }

  // ── JUGANDO ───────────────────────────────────────────────────────────────
  if (fase === 'jugando' && portada) {
    const timerPct   = Math.min(100, (timeLeft / dif.tiempoInicio) * 100)
    const timerColor = timeLeft > 15 ? 'bg-green-400' : timeLeft > 7 ? 'bg-yellow-400' : 'bg-red-500 animate-pulse'

    return (
      <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 py-4 max-w-md mx-auto w-full">

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => setFase('intro')} className="text-white/40 hover:text-white/70 text-sm transition-colors">
            ← Salir
          </button>
          <div className="flex items-center gap-3 text-xs text-white/40">
            <span>✓ {aciertos}</span>
            <span>✗ {total - aciertos}</span>
          </div>
        </div>

        {/* Timer */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-white/40 mb-1">
            <span>Tiempo</span>
            <span className={`font-bold tabular-nums ${timeLeft <= 7 ? 'text-red-400' : ''}`}>{timeLeft}s</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${timerColor}`}
              style={{ width: `${timerPct}%` }}
            />
          </div>
        </div>

        {/* Portada */}
        <div className="flex-1 flex flex-col justify-center mb-4">
          <PortadaCard p={portada} />
        </div>

        {/* Botones respuesta */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleRespuesta(true)}
            className="py-5 bg-green-700 hover:bg-green-600 text-white font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
          >
            ✓ VERDAD
          </button>
          <button
            onClick={() => handleRespuesta(false)}
            className="py-5 bg-red-700 hover:bg-red-600 text-white font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
          >
            ✗ MENTIRA
          </button>
        </div>
      </div>
    )
  }

  // ── FEEDBACK ──────────────────────────────────────────────────────────────
  if (fase === 'feedback' && feedback) {
    const { correcto, delta, portada: p } = feedback
    const newTime = timeLeft + delta
    const acabaAqui = newTime <= 0

    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-6">
        <div className="max-w-md w-full space-y-3">

          {/* Badge resultado */}
          <div className={`rounded-2xl p-5 border text-center ${
            correcto
              ? 'bg-green-900/30 border-green-500/40'
              : 'bg-red-900/30 border-red-500/40'
          }`}>
            <div className="text-5xl mb-2">{correcto ? '✅' : '❌'}</div>
            <h2 className={`text-2xl font-black ${correcto ? 'text-green-400' : 'text-red-400'}`}>
              {correcto ? '¡Correcto!' : '¡Incorrecto!'}
            </h2>
            <div className={`text-lg font-bold mt-0.5 ${delta > 0 ? 'text-green-300' : 'text-red-300'}`}>
              {delta > 0 ? `+${delta}s` : `${delta}s`}
              {acabaAqui && <span className="text-white/50 text-sm ml-2">— ¡tiempo agotado!</span>}
            </div>
          </div>

          {/* La respuesta correcta */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-2">El titular era…</p>
            <div className={`flex items-center gap-2 font-black text-base mb-3 ${p.veracidad ? 'text-green-400' : 'text-red-400'}`}>
              <span>{p.veracidad ? '✓' : '✗'}</span>
              <span>{p.veracidad ? 'VERDAD' : 'MENTIRA'}</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">{p.explicacion}</p>
          </div>

          {/* Botón continuar */}
          <button
            onClick={continuar}
            className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02]"
          >
            {acabaAqui ? 'Ver resultado →' : 'Continuar →'}
          </button>
        </div>
      </div>
    )
  }

  // ── FIN ───────────────────────────────────────────────────────────────────
  if (fase === 'fin') {
    const pct = total > 0 ? Math.round((aciertos / total) * 100) : 0
    const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '📰' : pct >= 40 ? '🤔' : '😬'
    const shareText = `📰 Portadas históricas: ${aciertos}/${total} titulares acertados (${pct}%)\n${dif.emoji} Modo ${dif.label} — ¿cuánto sabes de historia?\n🎮 https://www.tuthor.es/juegos/portadas`

    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-6">
        <div className="max-w-md w-full">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center mb-4">
            <div className="text-6xl mb-3">{emoji}</div>
            <h2 className="text-2xl font-black text-white mb-1">¡Tiempo agotado!</h2>
            <p className="text-white/40 text-sm mb-5">Modo {dif.label}</p>

            <div className="grid grid-cols-2 gap-3 mb-2">
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/40 text-xs mb-1">Aciertos</p>
                <p className="text-white font-black text-3xl">{aciertos}/{total}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/40 text-xs mb-1">Precisión</p>
                <p className="text-white font-black text-3xl">{pct}%</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigator.clipboard.writeText(shareText).then(() => alert('¡Copiado!'))}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 rounded-xl transition"
            >
              🔗 Compartir resultado
            </button>
            <button
              onClick={() => iniciar(difId)}
              className="w-full bg-[#EDAE49] hover:bg-amber-400 text-black font-black py-3 rounded-xl transition"
            >
              Intentarlo de nuevo
            </button>
            <button
              onClick={() => setFase('intro')}
              className="w-full text-white/40 hover:text-white/70 text-sm py-2 transition"
            >
              Cambiar dificultad
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
