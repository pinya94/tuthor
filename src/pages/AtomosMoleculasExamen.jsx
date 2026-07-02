import { useState, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/atomosMoleculas'

const TOTAL = 10
const MAX_ERRORS = 2

const NIVEL_INFO = {
  primaria: { label: { es:'Primaria', en:'Primary',   ca:'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso:      { label: { es:'ESO',      en:'Secondary', ca:'ESO'      }, pool: () => PREGUNTAS_ESO      },
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function calificacion(aciertos, lang) {
  const en = lang === 'en', ca = lang === 'ca'
  if (aciertos >= 9)  return { label: en ? 'Outstanding' : ca ? 'Excel·lent'  : 'Sobresaliente', color: 'text-green-400'  }
  if (aciertos >= 7)  return { label: en ? 'Good'        : ca ? 'Notable'     : 'Notable',       color: 'text-blue-400'   }
  if (aciertos === 6) return { label: en ? 'Fair'        : ca ? 'Bé'          : 'Bien',          color: 'text-yellow-300' }
  if (aciertos === 5) return { label: en ? 'Pass'        : ca ? 'Suficient'   : 'Suficiente',    color: 'text-orange-400' }
  return                     { label: en ? 'Fail'        : ca ? 'Insuficient' : 'Insuficiente',  color: 'text-red-400'    }
}

function getText(obj, lang) {
  return lang === 'en' ? obj.en : lang === 'ca' ? obj.ca : obj.es
}

function QuestionCard({ pregunta, emoji }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-4 text-center">
      <span className="text-6xl leading-none">{emoji}</span>
      <p className="text-white font-bold text-lg leading-snug">{pregunta}</p>
    </div>
  )
}

function ChoiceButtons({ opciones, onSelect, disabled, correcta, revealed }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {opciones.map(op => {
        const isCorrect = op === correcta
        const base = 'py-3 px-3 rounded-xl font-bold text-sm transition-all border-2 text-center'
        const style = revealed
          ? isCorrect
            ? `${base} bg-green-500/20 border-green-400 text-green-400`
            : `${base} bg-white/5 border-white/10 text-white/30`
          : disabled
            ? `${base} bg-white/5 border-white/10 text-white/30`
            : `${base} bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40 cursor-pointer`
        return (
          <button key={op} onClick={() => !disabled && onSelect(op)} className={style} disabled={disabled}>
            {op}
          </button>
        )
      })}
    </div>
  )
}

export default function AtomosMoleculasExamen() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const location = useLocation()
  const { backPath } = location.state || {}
  const en = lang === 'en', ca = lang === 'ca'

  const [nivelSel, setNivelSel] = useState(null)
  const pool = useMemo(() => {
    if (!nivelSel) return []
    return shuffle(NIVEL_INFO[nivelSel].pool()).slice(0, TOTAL)
  }, [nivelSel])

  const [idx, setIdx]             = useState(0)
  const [aciertos, setAciertos]   = useState(0)
  const [historial, setHistorial] = useState([])
  const [fase, setFase]           = useState('jugando')
  const [errores, setErrores]     = useState(0)
  const [feedback, setFeedback]   = useState(null)
  const [resuelto, setResuelto]   = useState(false)
  const [revealed, setRevealed]   = useState(false)
  const [showExplicacion, setShowExplicacion] = useState(false)

  function reset() { setErrores(0); setFeedback(null); setResuelto(false); setRevealed(false); setShowExplicacion(false) }

  const q = pool[idx]
  const backTo = backPath ? localPath(backPath) : localPath('/estudiar/quimica/atomos-moleculas')

  function handleChoice(op) {
    if (resuelto) return
    const correcta = getText(q.correcta, lang)
    if (op === correcta) {
      setAciertos(a => a + 1)
      setHistorial(h => [...h, { passed: true }])
      setFeedback({ ok: true, msg: `✅ ${correcta}` })
      setResuelto(true)
      setShowExplicacion(true)
    } else {
      const newErr = errores + 1
      setErrores(newErr)
      if (newErr >= MAX_ERRORS) {
        setHistorial(h => [...h, { passed: false }])
        setFeedback({ ok: false, msg: en ? `The answer was: ${correcta}` : ca ? `La resposta era: ${correcta}` : `La respuesta era: ${correcta}` })
        setResuelto(true)
        setRevealed(true)
        setShowExplicacion(true)
      } else {
        setFeedback({ ok: false, msg: en ? 'Incorrect — try again' : ca ? 'Incorrecte — torna-ho a intentar' : 'Incorrecto — inténtalo de nuevo' })
        setTimeout(() => setFeedback(null), 1400)
      }
    }
  }

  function siguiente() {
    if (idx + 1 >= pool.length) setFase('resultado')
    else { setIdx(i => i + 1); reset() }
  }

  if (!nivelSel) {
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="max-w-sm w-full text-center">
          <div className="text-5xl mb-4">⚛️</div>
          <h1 className="text-white font-black text-2xl mb-2">
            {en ? 'Atoms & Molecules' : ca ? 'Àtoms i Molècules' : 'Átomos y Moléculas'}
          </h1>
          <p className="text-white/40 text-sm mb-8">
            {en ? 'Select a level to start' : ca ? 'Selecciona un nivell per començar' : 'Selecciona un nivel para empezar'}
          </p>
          <div className="flex flex-col gap-3">
            {Object.entries(NIVEL_INFO).map(([key, info]) => (
              <button key={key} onClick={() => setNivelSel(key)}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-2xl px-6 py-4 text-left transition-all flex items-center justify-between group">
                <div>
                  <p className="text-white font-bold">{getText(info.label, lang)}</p>
                  <p className="text-white/30 text-xs mt-0.5">
                    {info.pool().length} {en ? 'questions available' : ca ? 'preguntes disponibles' : 'preguntas disponibles'}
                  </p>
                </div>
                <svg className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
          <button onClick={() => navigate(backTo)} className="mt-6 text-white/30 hover:text-white/60 text-sm transition-colors">
            {en ? '← Back' : '← Volver'}
          </button>
        </div>
      </div>
    )
  }

  if (fase === 'resultado') {
    const aprobado = aciertos >= 5
    const cal = calificacion(aciertos, lang)
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="max-w-md w-full">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center mb-4">
            <div className="text-5xl mb-3">{aprobado ? '🎉' : '😬'}</div>
            <div className={`text-xs uppercase tracking-widest font-semibold mb-1 ${aprobado ? 'text-green-400' : 'text-red-400'}`}>
              {aprobado ? (en ? 'Passed' : ca ? 'Aprovat' : 'Aprobado') : (en ? 'Failed' : ca ? 'Suspès' : 'Suspenso')}
            </div>
            <h2 className="text-2xl font-black text-white mb-1">{cal.label}</h2>
            <p className={`text-5xl font-black mb-1 ${cal.color}`}>{aciertos}/{pool.length}</p>
            <p className="text-white/40 text-sm">
              {en ? 'Atoms & Molecules' : ca ? 'Àtoms i Molècules' : 'Átomos y Moléculas'} · {getText(NIVEL_INFO[nivelSel].label, lang)}
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-3 font-semibold">{en ? 'Detail' : ca ? 'Detall' : 'Detalle'}</p>
            <div className="flex gap-2 flex-wrap">
              {historial.map((h, i) => (
                <div key={i} className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-xs font-bold ${h.passed ? 'bg-green-400/20 border-green-400 text-green-400' : 'bg-red-400/20 border-red-400 text-red-400'}`}>{i + 1}</div>
              ))}
            </div>
          </div>
          <button onClick={() => { setIdx(0); setAciertos(0); setHistorial([]); setFase('jugando'); setNivelSel(null); reset() }}
            className="w-full py-3 bg-[#EDAE49] hover:bg-amber-400 text-black font-black rounded-2xl transition-all mb-2">
            {en ? 'Retake exam' : ca ? 'Repetir examen' : 'Repetir examen'}
          </button>
          <button onClick={() => navigate(backTo)} className="w-full py-3 text-white/40 hover:text-white/70 text-sm transition-colors">
            {en ? '← Back' : '← Volver'}
          </button>
        </div>
      </div>
    )
  }

  if (!q) return null

  const pregunta = getText(q.pregunta, lang)
  const opciones = getText(q.opciones, lang)
  const correcta = getText(q.correcta, lang)
  const explicacion = getText(q.explicacion, lang)

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 md:px-8 py-5 max-w-lg mx-auto w-full">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => navigate(backTo)} className="text-white/40 hover:text-white/70 text-sm transition-colors">
          {en ? '← Exit' : '← Salir'}
        </button>
        <span className="text-white/40 text-sm font-bold">
          ⚛️ {en ? 'Atoms' : ca ? 'Àtoms' : 'Átomos'} · {idx + 1}/{pool.length}
        </span>
      </div>

      <div className="mb-4">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#EDAE49] rounded-full transition-all duration-300" style={{ width: `${(idx / pool.length) * 100}%` }} />
        </div>
        <div className="flex gap-1.5 mt-2">
          {historial.map((h, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${h.passed ? 'bg-green-400' : 'bg-red-400'}`} />
          ))}
          <div className="h-1.5 flex-1 rounded-full bg-white/30" />
          {Array.from({ length: pool.length - historial.length - 1 }).map((_, i) => (
            <div key={`p-${i}`} className="h-1.5 flex-1 rounded-full bg-white/10" />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <QuestionCard pregunta={pregunta} emoji={q.emoji} />

        {feedback && (
          <div className={`text-center py-2 px-4 rounded-xl text-sm font-bold ${feedback.ok ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {feedback.msg}
          </div>
        )}

        <ChoiceButtons opciones={opciones} onSelect={handleChoice} disabled={!!feedback || resuelto} correcta={correcta} revealed={revealed || resuelto} />

        {showExplicacion && (
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
            <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-1">
              {en ? 'Explanation' : ca ? 'Explicació' : 'Explicación'}
            </p>
            <p className="text-white/70 text-sm leading-relaxed">{explicacion}</p>
          </div>
        )}

        {resuelto && (
          <button onClick={siguiente}
            className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black rounded-2xl transition-all">
            {idx + 1 >= pool.length
              ? (en ? 'See results' : ca ? 'Veure resultats' : 'Ver resultados')
              : (en ? 'Next question →' : ca ? 'Següent pregunta →' : 'Siguiente pregunta →')}
          </button>
        )}

        <p className="text-white/20 text-xs text-center">
          {errores}/{MAX_ERRORS} {en ? 'errors' : ca ? 'errors' : 'errores'}
        </p>
      </div>
    </div>
  )
}
