import { useState, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { PORTADAS } from '../data/portadas'

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

function calificacion(aciertos, en) {
  if (aciertos >= 9)  return { label: en ? 'Outstanding' : 'Sobresaliente', nota: aciertos === 10 ? 10 : 9, color: 'text-green-400' }
  if (aciertos >= 7)  return { label: en ? 'Good' : 'Notable',              nota: aciertos,                color: 'text-blue-400'  }
  if (aciertos === 6) return { label: en ? 'Fair' : 'Bien',                 nota: 6,                       color: 'text-yellow-300'}
  if (aciertos === 5) return { label: en ? 'Pass' : 'Suficiente',           nota: 5,                       color: 'text-orange-400'}
  return { label: en ? 'Fail' : 'Insuficiente', nota: Math.max(1, aciertos), color: 'text-red-400' }
}

function PortadaCard({ p, lang, lt }) {
  const catStyle = CAT_STYLE[p.categoria] || 'bg-white/10 text-white/50 border-white/10'
  return (
    <div
      className="bg-[#f5f0e3] rounded-2xl overflow-hidden shadow-2xl border border-[#c8b89a]"
      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
    >
      <div className="h-3 md:h-4 bg-gray-900" />
      <div className="px-5 md:px-10 pt-4 md:pt-6 pb-3 md:pb-5 border-b-2 border-gray-800 text-center">
        <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 mb-1">
          {p.lugar} · {p.mes}
        </p>
        <h1 className="text-2xl md:text-4xl font-black uppercase tracking-wide text-gray-900 leading-tight">
          {p.periodico}
        </h1>
        <div className="flex items-center justify-between mt-2 md:mt-3">
          <span className="text-[9px] md:text-xs text-gray-400">{lang === 'en' ? 'Special edition' : 'Edición especial'}</span>
          <span className={`text-[9px] md:text-xs font-bold uppercase px-2 py-0.5 rounded border ${catStyle}`}>
            {p.categoria}
          </span>
          <span className="text-[9px] md:text-xs text-gray-400">{lang === 'en' ? 'Price: 10 cts.' : 'Precio: 10 ctos.'}</span>
        </div>
      </div>
      <div className="mx-5 md:mx-10 border-t-2 border-b border-gray-700" style={{ marginTop: '3px', paddingTop: '1px' }} />
      <div className="px-5 md:px-10 py-4 md:py-6">
        <h2 className="text-lg md:text-2xl font-black leading-snug text-gray-900 mb-3">
          {lt(p, 'titular')}
        </h2>
        <div className="border-t border-b border-gray-300 py-2.5">
          <p className="text-xs md:text-sm leading-relaxed text-gray-600">
            {lt(p, 'subtitular')}
          </p>
        </div>
      </div>
      <div className="h-1.5 md:h-2 bg-gray-900 mx-5 md:mx-10 mb-4 md:mb-6 rounded-sm" />
    </div>
  )
}

const TOTAL = 10

export default function PortadasExamen() {
  const navigate   = useNavigate()
  const { lang, localPath, lt } = useLang()
  const en = lang === 'en'
  const location   = useLocation()
  const { categoria, backPath } = location.state || {}

  const pool = useMemo(() => {
    const filtered = PORTADAS.filter(p => p.temas?.includes(categoria))
    return shuffle(filtered).slice(0, TOTAL)
  }, [categoria])

  const [idx,        setIdx]        = useState(0)
  const [aciertos,   setAciertos]   = useState(0)
  const [historial,  setHistorial]  = useState([])
  const [feedback,   setFeedback]   = useState(null)
  const [fase,       setFase]       = useState('jugando') // 'jugando' | 'feedback' | 'resultado'

  if (!categoria || pool.length < TOTAL) {
    return (
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="text-center text-white/50">
          <p className="text-lg mb-4">{en ? 'Not enough headlines for this topic.' : 'No hay suficientes portadas para este tema.'}</p>
          <button onClick={() => navigate(-1)} className="text-[#EDAE49] hover:underline">← Volver</button>
        </div>
      </div>
    )
  }

  const portada = pool[idx]

  function handleRespuesta(respuesta) {
    const correcto = respuesta === portada.veracidad
    setFeedback({ correcto, portada })
    if (correcto) setAciertos(a => a + 1)
    setHistorial(h => [...h, { passed: correcto }])
    setFase('feedback')
  }

  function continuar() {
    if (idx + 1 >= TOTAL) {
      setFase('resultado')
    } else {
      setIdx(i => i + 1)
      setFeedback(null)
      setFase('jugando')
    }
  }

  // ── RESULTADO ─────────────────────────────────────────────────────────────
  if (fase === 'resultado') {
    const aprobado = aciertos >= 5
    const cal      = calificacion(aciertos, en)
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
            <p className="text-white/40 text-sm">{en ? 'Headlines guessed correctly in the Headlines exam' : 'Titulares acertados en el examen de Portadas'}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-3 font-semibold">{en ? 'Detail per headline' : 'Detalle por portada'}</p>
            <div className="flex gap-2 flex-wrap">
              {historial.map((h, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-xs font-bold ${
                    h.passed
                      ? 'bg-green-400/20 border-green-400 text-green-400'
                      : 'bg-red-400/20 border-red-400 text-red-400'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => { setIdx(0); setAciertos(0); setHistorial([]); setFeedback(null); setFase('jugando') }}
            className="w-full py-3 bg-[#EDAE49] hover:bg-amber-400 text-black font-black rounded-2xl transition-all mb-2"
          >
            {en ? 'Retake exam' : 'Repetir examen'}
          </button>
          <button
            onClick={() => navigate(backPath ? localPath(backPath) : -1)}
            className="w-full py-3 text-white/40 hover:text-white/70 text-sm transition-colors"
          >
            {en ? '← Back to topic' : '← Volver al tema'}
          </button>
        </div>
      </div>
    )
  }

  // ── FEEDBACK ──────────────────────────────────────────────────────────────
  if (fase === 'feedback' && feedback) {
    const { correcto, portada: p } = feedback
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-6">
        <div className="max-w-lg w-full space-y-4">
          <div className={`rounded-2xl p-6 border text-center ${
            correcto ? 'bg-green-900/30 border-green-500/40' : 'bg-red-900/30 border-red-500/40'
          }`}>
            <div className="text-5xl mb-2">{correcto ? '✅' : '❌'}</div>
            <h2 className={`text-3xl font-black ${correcto ? 'text-green-400' : 'text-red-400'}`}>
              {correcto ? (en ? 'Correct!' : '¡Correcto!') : (en ? 'Wrong!' : '¡Incorrecto!')}
            </h2>
            <p className="text-white/40 text-sm mt-1">{en ? `Headline ${idx + 1} of ${TOTAL}` : `Portada ${idx + 1} de ${TOTAL}`}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-2">{en ? 'The headline was…' : 'El titular era…'}</p>
            <div className={`flex items-center gap-2 font-black text-lg mb-3 ${p.veracidad ? 'text-green-400' : 'text-red-400'}`}>
              <span>{p.veracidad ? '✓' : '✗'}</span>
              <span>{p.veracidad ? (en ? 'TRUE' : 'VERDAD') : (en ? 'FALSE' : 'MENTIRA')}</span>
            </div>
            <p className="text-white/60 leading-relaxed">{lt(p, 'explicacion')}</p>
          </div>

          {/* Mini progreso */}
          <div className="flex gap-1.5 justify-center">
            {historial.map((h, i) => (
              <div key={i} className={`w-4 h-4 rounded-full ${h.passed ? 'bg-green-400' : 'bg-red-400'}`} />
            ))}
            {Array.from({ length: TOTAL - historial.length }).map((_, i) => (
              <div key={`p-${i}`} className="w-4 h-4 rounded-full border border-white/20" />
            ))}
          </div>

          <button
            onClick={continuar}
            className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02]"
          >
            {idx + 1 >= TOTAL ? (en ? 'See result →' : 'Ver resultado →') : (en ? `Headline ${idx + 2} →` : `Portada ${idx + 2} →`)}
          </button>
        </div>
      </div>
    )
  }

  // ── JUGANDO ───────────────────────────────────────────────────────────────
  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 md:px-8 py-5 max-w-4xl mx-auto w-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => navigate(backPath ? localPath(backPath) : -1)} className="text-white/40 hover:text-white/70 text-sm transition-colors">
          {en ? '← Exit' : '← Salir'}
        </button>
        <div className="flex items-center gap-3 text-sm text-white/50">
          <span className="font-bold text-white">{aciertos}</span>
          <span>{en ? 'correct' : 'aciertos'}</span>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-white/40 mb-1.5">
          <span>{en ? 'Headlines' : 'Portadas'}</span>
          <span className="font-bold">{idx + 1} / {TOTAL}</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#EDAE49] rounded-full transition-all duration-300"
            style={{ width: `${(idx / TOTAL) * 100}%` }}
          />
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

      {/* Layout dos columnas en desktop */}
      <div className="flex-1 flex flex-col md:grid md:grid-cols-[1fr_300px] md:gap-8 md:items-center">
        <div className="mb-5 md:mb-0">
          <PortadaCard p={portada} lang={lang} lt={lt} />
        </div>

        <div className="flex flex-col gap-4">
          <div className="hidden md:block bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-1">{en ? 'Headline' : 'Portada'}</p>
            <p className="text-white font-black text-3xl">{idx + 1}<span className="text-white/30 text-lg"> / {TOTAL}</span></p>
            <p className="text-white/40 text-sm mt-1">✓ {aciertos} {en ? 'correct' : 'acertadas'}</p>
          </div>

          <button
            onClick={() => handleRespuesta(true)}
            className="py-6 md:py-8 bg-green-700 hover:bg-green-600 text-white font-black text-2xl rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
          >
            {en ? '✓ TRUE' : '✓ VERDAD'}
          </button>
          <button
            onClick={() => handleRespuesta(false)}
            className="py-6 md:py-8 bg-red-700 hover:bg-red-600 text-white font-black text-2xl rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
          >
            {en ? '✗ FALSE' : '✗ MENTIRA'}
          </button>
        </div>
      </div>
    </div>
  )
}
