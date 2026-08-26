/**
 * ExamenMC — componente genérico para exámenes de opción múltiple con explicación.
 *
 * Props:
 *   titulo      { es, en, ca }     — nombre del examen
 *   emoji       string             — emoji del tema
 *   nivelInfo   { [key]: { label: {es,en,ca}, pool: () => Array } }
 *   backFallback string            — ruta de vuelta si no viene state.backPath
 *   gameId      string             — identificador para saveActivity (p.ej. "celula")
 */
import { useState, useMemo, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import CoinsAnimation from './CoinsAnimation'
import SupportBlock from './SupportBlock'
import PageMeta from './PageMeta'
import QuizSchema from './QuizSchema'
import AuthModal from './AuthModal'

const TOTAL      = 10
const MAX_ERRORS = 2

// ── Helpers ──────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function get(obj, lang) {
  return lang === 'en' ? obj.en : lang === 'ca' ? obj.ca : obj.es
}

// La respuesta correcta puede darse como índice numérico (posición en las
// opciones) o como objeto de texto {es,en,ca}. Devuelve siempre el texto.
function correctText(q, lang) {
  return typeof q.correcta === 'number' ? get(q.opciones, lang)[q.correcta] : get(q.correcta, lang)
}

function calificacion(aciertos, lang) {
  const en = lang === 'en', ca = lang === 'ca'
  if (aciertos >= 9)  return { label: en ? 'Outstanding' : ca ? 'Excel·lent'  : 'Sobresaliente', color: 'text-green-400'  }
  if (aciertos >= 7)  return { label: en ? 'Good'        : ca ? 'Notable'     : 'Notable',       color: 'text-blue-400'   }
  if (aciertos === 6) return { label: en ? 'Fair'        : ca ? 'Bé'          : 'Bien',          color: 'text-yellow-300' }
  if (aciertos === 5) return { label: en ? 'Pass'        : ca ? 'Suficient'   : 'Suficiente',    color: 'text-orange-400' }
  return                     { label: en ? 'Fail'        : ca ? 'Insuficient' : 'Insuficiente',  color: 'text-red-400'    }
}

// ── Sub-componentes ───────────────────────────────────────────────────────────
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

// ── Componente principal ──────────────────────────────────────────────────────
export default function ExamenMC({ titulo, emoji, nivelInfo, backFallback, gameId }) {
  const navigate               = useNavigate()
  const { lang, localPath }    = useLang()
  const location               = useLocation()
  const { user }               = useAuth()
  const en = lang === 'en', ca = lang === 'ca'

  const { backPath, nivel: nivelInicial } = location.state || {}
  const backTo = backPath ? localPath(backPath) : localPath(backFallback)

  const tituloStr = get(titulo, lang)

  const metaTitle = en ? `${tituloStr} Exam` : ca ? `Examen de ${tituloStr}` : `Examen de ${tituloStr}`
  const metaDesc  = en
    ? `Practice ${tituloStr} with an interactive 10-question exam on Tuthor. Instant feedback after each answer.`
    : ca
    ? `Practica ${tituloStr} amb un examen interactiu de 10 preguntes a Tuthor. Retroalimentació immediata.`
    : `Practica ${tituloStr} con un examen interactivo de 10 preguntas en Tuthor. Retroalimentación inmediata.`
  const pageMeta = <PageMeta title={metaTitle} description={metaDesc} path={`/examen/${gameId}`} lang={lang} />

  // ── Estado ────────────────────────────────────────────────────────────────
  const [nivelSel, setNivelSel]   = useState(nivelInicial || null)
  const [idx, setIdx]             = useState(0)
  const [aciertos, setAciertos]   = useState(0)
  const [historial, setHistorial] = useState([])
  const [fase, setFase]           = useState('jugando')   // 'jugando' | 'coins' | 'resultado'
  const [showAuth, setShowAuth]   = useState(false)
  const [errores, setErrores]     = useState(0)
  const [feedback, setFeedback]   = useState(null)
  const [resuelto, setResuelto]   = useState(false)
  const [revealed, setRevealed]   = useState(false)
  const [showExplicacion, setShowExplicacion] = useState(false)
  const startRef                  = useRef(null)

  const pool = useMemo(() => {
    if (!nivelSel) return []
    startRef.current = Date.now()
    return shuffle(nivelInfo[nivelSel].pool()).slice(0, TOTAL)
  }, [nivelSel])

  const schemaQuestions = pool.length > 0 ? pool.map(q => {
    const pregunta  = get(q.pregunta, lang)
    const correcta  = correctText(q, lang)
    const todas     = get(q.opciones, lang)
    return {
      question:      pregunta,
      correctAnswer: correcta,
      wrongAnswers:  todas.filter(o => o !== correcta),
    }
  }) : undefined

  const quizSchema = <QuizSchema
    name={metaTitle}
    description={metaDesc}
    path={`/examen/${gameId}`}
    lang={lang}
    subject={tituloStr}
    questions={schemaQuestions} />

  function resetQ() {
    setErrores(0); setFeedback(null)
    setResuelto(false); setRevealed(false); setShowExplicacion(false)
  }

  function resetAll() {
    setIdx(0); setAciertos(0); setHistorial([])
    setFase('jugando'); setNivelSel(null); resetQ()
  }

  // ── Handlers ──────────────────────────────────────────────────────────────
  function handleChoice(op) {
    if (resuelto) return
    const q       = pool[idx]
    const correcta = correctText(q, lang)
    if (op === correcta) {
      const newAciertos = aciertos + 1
      setAciertos(newAciertos)
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
        setResuelto(true); setRevealed(true); setShowExplicacion(true)
      } else {
        setFeedback({ ok: false, msg: en ? 'Incorrect — try again' : ca ? 'Incorrecte — torna-ho a intentar' : 'Incorrecto — inténtalo de nuevo' })
        setTimeout(() => setFeedback(null), 1400)
      }
    }
  }

  function siguiente(currentAciertos) {
    if (idx + 1 >= pool.length) {
      // Guardar resultado en Firebase si hay usuario autenticado
      const timeSpent = startRef.current ? Math.round((Date.now() - startRef.current) / 1000) : 0
      const score  = currentAciertos * 100
      const passed = currentAciertos >= 5
      const coinsEarned = aciertos * 20
      if (user) {
        saveActivity(user.uid, {
          type: 'examen', game: gameId,
          category: gameId, score, passed, timeSpent, coinsEarned,
          userName: user.displayName, userPhoto: user.photoURL,
        }).catch(() => {})
      }
      setFase('coins')
    } else {
      setIdx(i => i + 1); resetQ()
    }
  }

  // ── PANTALLA: SELECTOR DE NIVEL ───────────────────────────────────────────
  if (!nivelSel) {
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {pageMeta}{quizSchema}
        <div className="max-w-sm w-full text-center">
          <div className="text-5xl mb-4">{emoji}</div>
          <h1 className="text-white font-black text-2xl mb-2">{tituloStr}</h1>
          <p className="text-white/40 text-sm mb-6">
            {en ? 'Select a level to start' : ca ? 'Selecciona un nivell per començar' : 'Selecciona un nivel para empezar'}
          </p>
          <SupportBlock variant="top" className="mb-6" />
          <div className="flex flex-col gap-3">
            {Object.entries(nivelInfo).map(([key, info]) => (
              <button key={key} onClick={() => setNivelSel(key)}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-2xl px-6 py-4 text-left transition-all flex items-center justify-between group">
                <div>
                  <p className="text-white font-bold">{get(info.label, lang)}</p>
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

  // ── PANTALLA: COINS ANIMATION ─────────────────────────────────────────────
  if (fase === 'coins') {
    return <CoinsAnimation coins={Math.min(aciertos * 20, 200)} onDone={() => setFase('resultado')} />
  }

  // ── PANTALLA: RESULTADO ───────────────────────────────────────────────────
  if (fase === 'resultado') {
    const aprobado = aciertos >= 5
    const cal      = calificacion(aciertos, lang)
    const coins    = Math.min(aciertos * 20, 200) // = coinsEarned guardado y animado
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {pageMeta}{quizSchema}
        <div className="max-w-md w-full">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center mb-4">
            <div className="text-5xl mb-3">{aprobado ? '🎉' : '😬'}</div>
            <div className={`text-xs uppercase tracking-widest font-semibold mb-1 ${aprobado ? 'text-green-400' : 'text-red-400'}`}>
              {aprobado ? (en ? 'Passed' : ca ? 'Aprovat' : 'Aprobado') : (en ? 'Failed' : ca ? 'Suspès' : 'Suspenso')}
            </div>
            <h2 className="text-2xl font-black text-white mb-1">{cal.label}</h2>
            <p className={`text-5xl font-black mb-1 ${cal.color}`}>{aciertos}/{pool.length}</p>
            <p className="text-white/40 text-sm mb-3">{tituloStr} · {get(nivelInfo[nivelSel].label, lang)}</p>
            <div className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/30 rounded-full px-3 py-1">
              <span className="text-amber-400 text-sm">💰</span>
              <span className="text-amber-400 font-black text-sm">+{coins}</span>
              <span className="text-amber-400/60 text-xs">{en ? 'coins' : ca ? 'monedes' : 'monedas'}</span>
            </div>
          </div>

          {/* Prompt de registro si no hay usuario */}
          {!user && (
            <div className="bg-violet-500/10 border border-violet-500/30 rounded-2xl p-4 mb-4 text-center">
              <p className="text-violet-300 font-bold text-sm mb-1">
                {en ? '💰 Save your coins!' : ca ? '💰 Guarda les teves monedes!' : '💰 ¡Guarda tus monedas!'}
              </p>
              <p className="text-white/40 text-xs mb-3">
                {en ? 'Sign up to keep your coins and spend them on exclusive avatar frames in the shop.'
                  : ca ? "Registra't per conservar les monedes i gastar-les en marcs exclusius a la botiga."
                  : 'Regístrate para conservar tus monedas y gastarlas en marcos exclusivos en la tienda.'}
              </p>
              <button
                onClick={() => setShowAuth(true)}
                className="bg-violet-600 hover:bg-violet-500 text-white font-black text-sm px-6 py-2.5 rounded-xl transition-all"
              >
                {en ? '✨ Sign up — it\'s free' : ca ? "✨ Registra't — és gratis" : '✨ Regístrate — es gratis'}
              </button>
            </div>
          )}
          {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5 mt-4">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-3 font-semibold">
              {en ? 'Detail' : ca ? 'Detall' : 'Detalle'}
            </p>
            <div className="flex gap-2 flex-wrap">
              {historial.map((h, i) => (
                <div key={i} className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-xs font-bold
                  ${h.passed ? 'bg-green-400/20 border-green-400 text-green-400' : 'bg-red-400/20 border-red-400 text-red-400'}`}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <button onClick={resetAll}
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

  // ── PANTALLA: JUGANDO ─────────────────────────────────────────────────────
  const q          = pool[idx]
  if (!q) return null
  const pregunta   = get(q.pregunta, lang)
  const opciones   = get(q.opciones, lang)
  const correcta   = correctText(q, lang)
  const explicacion = get(q.explicacion, lang)

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 md:px-8 py-5 max-w-lg mx-auto w-full">
      {pageMeta}
      {/* Cabecera */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => navigate(backTo)} className="text-white/40 hover:text-white/70 text-sm transition-colors">
          {en ? '← Exit' : '← Salir'}
        </button>
        <span className="text-white/40 text-sm font-bold">{emoji} {tituloStr} · {idx + 1}/{pool.length}</span>
      </div>

      {/* Barra de progreso */}
      <div className="mb-4">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#EDAE49] rounded-full transition-all duration-300"
            style={{ width: `${(idx / pool.length) * 100}%` }} />
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

      {/* Contenido */}
      <div className="flex-1 flex flex-col gap-4">
        <QuestionCard pregunta={pregunta} emoji={q.emoji} />

        {feedback && (
          <div className={`text-center py-2 px-4 rounded-xl text-sm font-bold
            ${feedback.ok ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {feedback.msg}
          </div>
        )}

        <ChoiceButtons
          opciones={opciones}
          onSelect={handleChoice}
          disabled={!!feedback || resuelto}
          correcta={correcta}
          revealed={revealed || resuelto}
        />

        {showExplicacion && (
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
            <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-1">
              {en ? 'Explanation' : ca ? 'Explicació' : 'Explicación'}
            </p>
            <p className="text-white/70 text-sm leading-relaxed">{explicacion}</p>
          </div>
        )}

        {resuelto && (
          <button onClick={() => siguiente(aciertos)}
            className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black rounded-2xl transition-all">
            {idx + 1 >= pool.length
              ? (en ? 'Finish & see coins →' : ca ? 'Acabar i veure monedes →' : 'Terminar y ver monedas →')
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
