import { useState, useMemo, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { ELEMENTOS, TIPOS } from '../data/tablaperiodica'
import PageMeta from '../components/PageMeta'
import QuizSchema from '../components/QuizSchema'

const TOTAL = 10
const MAX_ERRORS = 2

// ── Categorías simplificadas para pregunta "classify" ───────────────────────
const TIPO_A_CATEGORIA = {
  'gas-noble':            'gas-noble',
  'halogeno':             'halogeno',
  'no-metal':             'no-metal',
  'semimetal':            'semimetal',
  'metal-alcalino':       'metal',
  'metal-alcalinotérreo': 'metal',
  'metal-transicion':     'metal',
  'otro-metal':           'metal',
}
const CATEGORIAS = ['metal', 'no-metal', 'semimetal', 'gas-noble', 'halogeno']
const CATEGORIA_LABEL = {
  'metal':    { es: 'Metal',     en: 'Metal',      ca: 'Metall'   },
  'no-metal': { es: 'No metal',  en: 'Non-metal',  ca: 'No metall'},
  'semimetal':{ es: 'Semimetal', en: 'Metalloid',  ca: 'Semimetall'},
  'gas-noble':{ es: 'Gas noble', en: 'Noble gas',  ca: 'Gas noble'},
  'halogeno': { es: 'Halógeno',  en: 'Halogen',    ca: 'Halogen'  },
}

// ── Tipos de pregunta por nivel ──────────────────────────────────────────────
const Q_POOL = {
  primaria: [
    'symbol-to-name','symbol-to-name','symbol-to-name','symbol-to-name','symbol-to-name',
  ],
  eso: [
    'symbol-to-name','symbol-to-name','symbol-to-name',
    'name-to-symbol','name-to-symbol',
    'z-to-name','z-to-name',
    'classify',
  ],
  bachillerato: [
    'symbol-to-name','symbol-to-name',
    'name-to-symbol','name-to-symbol',
    'z-to-name','z-to-name',
    'classify','classify',
    'grupo','periodo',
  ],
}

const NIVEL_LABELS = {
  primaria:     { es:'Primaria',     en:'Primary',   ca:'Primària'   },
  eso:          { es:'ESO',          en:'Secondary', ca:'ESO'        },
  bachillerato: { es:'Bachillerato', en:'A-Level',   ca:'Batxillerat'},
}

// ── Helpers ──────────────────────────────────────────────────────────────────
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

function pickRandom(arr, n, exclude = []) {
  return shuffle(arr.filter(x => !exclude.includes(x))).slice(0, n)
}

function calificacion(aciertos, lang) {
  const en = lang === 'en', ca = lang === 'ca'
  if (aciertos >= 9)  return { label: en ? 'Outstanding' : ca ? 'Excel·lent'  : 'Sobresaliente', color: 'text-green-400'  }
  if (aciertos >= 7)  return { label: en ? 'Good'        : ca ? 'Notable'     : 'Notable',       color: 'text-blue-400'   }
  if (aciertos === 6) return { label: en ? 'Fair'        : ca ? 'Bé'          : 'Bien',          color: 'text-yellow-300' }
  if (aciertos === 5) return { label: en ? 'Pass'        : ca ? 'Suficient'   : 'Suficiente',    color: 'text-orange-400' }
  return                     { label: en ? 'Fail'        : ca ? 'Insuficient' : 'Insuficiente',  color: 'text-red-400'    }
}

function getNombre(e, lang) {
  return lang === 'en' ? e.nombreEn : lang === 'ca' ? e.nombreCa : e.nombre
}

function getCatLabel(cat, lang) {
  return lang === 'en' ? CATEGORIA_LABEL[cat].en : lang === 'ca' ? CATEGORIA_LABEL[cat].ca : CATEGORIA_LABEL[cat].es
}

// ── Generador de preguntas ───────────────────────────────────────────────────
function buildQuestion(elemento, qType, lang, todosLosElementos) {
  const nombre = getNombre(elemento, lang)
  const cat = TIPO_A_CATEGORIA[elemento.tipo]

  if (qType === 'symbol-to-name') {
    return {
      type: qType,
      elemento,
      pregunta: lang === 'en' ? 'What is the name of this element?' : lang === 'ca' ? 'Com es diu aquest element?' : '¿Cómo se llama este elemento?',
      inputType: 'text-nombre',
      correct: nombre,
      hint: `${TIPOS[elemento.tipo][lang === 'en' ? 'labelEn' : lang === 'ca' ? 'labelCa' : 'label']} · ${lang === 'en' ? 'Group' : lang === 'ca' ? 'Grup' : 'Grupo'} ${elemento.grupo}`,
    }
  }
  if (qType === 'name-to-symbol') {
    return {
      type: qType,
      elemento,
      pregunta: lang === 'en' ? 'What is the chemical symbol?' : lang === 'ca' ? 'Quin és el símbol químic?' : '¿Cuál es el símbolo químico?',
      inputType: 'text-symbol',
      correct: elemento.symbol,
      hint: `Z = ${elemento.z}`,
    }
  }
  if (qType === 'z-to-name') {
    return {
      type: qType,
      elemento,
      pregunta: lang === 'en' ? `Which element has atomic number Z = ${elemento.z}?` : lang === 'ca' ? `Quin element té número atòmic Z = ${elemento.z}?` : `¿Qué elemento tiene número atómico Z = ${elemento.z}?`,
      inputType: 'text-nombre',
      correct: nombre,
      hint: elemento.symbol,
    }
  }
  if (qType === 'classify') {
    const wrongCats = pickRandom(CATEGORIAS, 3, [cat])
    const opciones = shuffle([cat, ...wrongCats])
    return {
      type: qType,
      elemento,
      pregunta: lang === 'en' ? 'What type of element is this?' : lang === 'ca' ? 'Quin tipus d\'element és?' : '¿Qué tipo de elemento es?',
      inputType: 'choice',
      correct: cat,
      opciones,
      hint: null,
    }
  }
  if (qType === 'grupo') {
    const allGrupos = [...new Set(todosLosElementos.map(e => e.grupo))]
    const wrongGrupos = pickRandom(allGrupos, 3, [elemento.grupo])
    const opciones = shuffle([elemento.grupo, ...wrongGrupos])
    return {
      type: qType,
      elemento,
      pregunta: lang === 'en' ? `Which group does ${nombre} belong to?` : lang === 'ca' ? `A quin grup pertany el ${nombre}?` : `¿En qué grupo está el ${nombre}?`,
      inputType: 'choice-num',
      correct: elemento.grupo,
      opciones,
      hint: null,
    }
  }
  if (qType === 'periodo') {
    const wrongPeriodos = pickRandom([1,2,3,4,5,6,7], 3, [elemento.periodo])
    const opciones = shuffle([elemento.periodo, ...wrongPeriodos])
    return {
      type: qType,
      elemento,
      pregunta: lang === 'en' ? `Which period does ${nombre} belong to?` : lang === 'ca' ? `A quin període pertany el ${nombre}?` : `¿En qué periodo está el ${nombre}?`,
      inputType: 'choice-num',
      correct: elemento.periodo,
      opciones,
      hint: null,
    }
  }
}

// ── Componente carta del elemento ────────────────────────────────────────────
function ElementCard({ elemento, qType, showHint, hint }) {
  const tipo = TIPOS[elemento.tipo]

  if (qType === 'z-to-name') {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 py-10">
        <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">Número atómico</p>
        <p className="text-white font-black" style={{ fontSize: 'clamp(4rem,18vw,7rem)' }}>
          {elemento.z}
        </p>
        {showHint && (
          <p className="text-[#EDAE49] font-bold text-lg">→ {hint}</p>
        )}
      </div>
    )
  }

  if (qType === 'name-to-symbol') {
    return (
      <div className={`bg-gradient-to-br ${tipo.color} rounded-2xl flex flex-col items-center justify-center gap-2 py-10`}>
        <p className="text-white/60 text-xs uppercase tracking-widest font-semibold">Z = {elemento.z}</p>
        <p className="text-white font-black text-4xl sm:text-5xl text-center px-4">{elemento.nombre}</p>
        {showHint && (
          <p className="text-white/70 text-sm font-semibold">{hint}</p>
        )}
      </div>
    )
  }

  // symbol-to-name / classify / grupo / periodo
  return (
    <div className={`bg-gradient-to-br ${tipo.color} rounded-2xl flex flex-col items-center justify-center gap-1 py-8`}
      style={{ minHeight: '180px' }}>
      <span className="text-white/50 text-xs font-bold self-start px-5">Z = {elemento.z}</span>
      <span className="text-white font-black text-center leading-none px-4"
        style={{ fontSize: 'clamp(3.5rem,15vw,7rem)' }}>
        {elemento.symbol}
      </span>
      {showHint && hint && (
        <span className="text-white/80 text-xs font-semibold mt-1 text-center px-4">
          {hint}
        </span>
      )}
    </div>
  )
}

// ── Input texto ──────────────────────────────────────────────────────────────
function TextInput({ value, onChange, onSubmit, disabled, focusKey, placeholder, short }) {
  const ref = useRef(null)
  useEffect(() => { if (!disabled) ref.current?.focus() }, [focusKey, disabled])

  return (
    <input ref={ref} type="text" value={value}
      onChange={e => onChange(e.target.value)}
      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); onSubmit(value) } }}
      disabled={disabled}
      placeholder={placeholder}
      maxLength={short ? 3 : 50}
      className={`w-full bg-white/10 border-2 border-white/20 focus:border-[#EDAE49] rounded-xl px-4 py-3 text-white text-lg placeholder:text-white/25 outline-none transition-colors disabled:opacity-40 ${short ? 'text-center tracking-widest uppercase' : ''}`}
      autoComplete="off"
    />
  )
}

// ── Opciones múltiple ────────────────────────────────────────────────────────
function ChoiceButtons({ opciones, onSelect, disabled, correct, revealed, lang, isNum }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {opciones.map(op => {
        const label = isNum ? `${lang === 'en' ? 'Group' : lang === 'ca' ? 'Grup' : 'Grupo / Período'} ${op}` : getCatLabel(op, lang)
        const isCorrect = op === correct
        const base = 'py-3 px-4 rounded-xl font-bold text-sm transition-all border-2'
        const style = revealed
          ? isCorrect ? `${base} bg-green-500/20 border-green-400 text-green-400` : `${base} bg-white/5 border-white/10 text-white/30`
          : disabled ? `${base} bg-white/5 border-white/10 text-white/30` : `${base} bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40 cursor-pointer`
        return (
          <button key={op} onClick={() => !disabled && onSelect(op)} className={style} disabled={disabled}>
            {isNum ? op : label}
          </button>
        )
      })}
    </div>
  )
}

// ── Componente principal ─────────────────────────────────────────────────────
export default function TablaPeriodicaExamen() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const { user } = useAuth()
  const location = useLocation()
  const { backPath, nivel: nivelInicial } = location.state || {}
  const en = lang === 'en', ca = lang === 'ca'

  const [nivelSel, setNivelSel] = useState(nivelInicial || null)

  const { pool, questions } = useMemo(() => {
    if (!nivelSel) return { pool: [], questions: [] }
    const filtrados = ELEMENTOS.filter(e => e.niveles.includes(nivelSel))
    const shuffled = shuffle(filtrados)
    const qTypePool = shuffle([...Q_POOL[nivelSel]])
    const total = Math.min(TOTAL, shuffled.length)
    const pool = shuffled.slice(0, total)
    const questions = pool.map((el, i) => {
      const qType = qTypePool[i % qTypePool.length]
      return buildQuestion(el, qType, lang, filtrados)
    })
    return { pool, questions }
  }, [nivelSel, lang])

  const [idx, setIdx]             = useState(0)
  const [aciertos, setAciertos]   = useState(0)
  const [historial, setHistorial] = useState([])
  const [fase, setFase]           = useState('jugando')
  const [errores, setErrores]     = useState(0)
  const [showHint, setShowHint]   = useState(false)
  const [inputVal, setInputVal]   = useState('')
  const [feedback, setFeedback]   = useState(null)
  const [resuelto, setResuelto]   = useState(false)
  const [choiceRevealed, setChoiceRevealed] = useState(false)

  function resetQ() {
    setErrores(0); setShowHint(false); setInputVal('')
    setFeedback(null); setResuelto(false); setChoiceRevealed(false)
  }

  const q = questions[idx]
  const backTo = backPath ? localPath(backPath) : localPath('/estudiar/quimica')

  // Guardar al terminar el examen (una sola vez por partida)
  const startRef = useRef(Date.now())
  const savedRef = useRef(false)
  useEffect(() => {
    if (fase !== 'resultado' || savedRef.current || !user) return
    savedRef.current = true
    saveActivity(user.uid, {
      type: 'examen', game: 'tabla-periodica', category: 'tabla-periodica',
      score: aciertos * 100, passed: aciertos >= 5,
      timeSpent: Math.round((Date.now() - startRef.current) / 1000),
      coinsEarned: Math.min(aciertos * 20, 200),
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }, [fase]) // eslint-disable-line react-hooks/exhaustive-deps

  // Reiniciar el flag al empezar una nueva partida
  useEffect(() => { if (fase === 'jugando') savedRef.current = false }, [fase])

  function handleCorrect() {
    setAciertos(a => a + 1)
    setHistorial(h => [...h, { passed: true }])
    setFeedback({ ok: true, msg: `🎉 ${q.correct}` })
    setResuelto(true)
    setTimeout(() => siguiente(), 1500)
  }

  function handleWrong() {
    const newErr = errores + 1
    setErrores(newErr)
    setInputVal('')
    if (newErr >= MAX_ERRORS) {
      setHistorial(h => [...h, { passed: false }])
      setFeedback({ ok: false, msg: en ? `It was: ${q.correct}` : ca ? `Era: ${q.correct}` : `Era: ${q.correct}` })
      setResuelto(true)
      setChoiceRevealed(true)
      setTimeout(() => siguiente(), 2000)
    } else {
      setShowHint(true)
      setFeedback({ ok: false, msg: en ? 'Wrong — check the hint' : ca ? 'Incorrecte — mira la pista' : 'Incorrecto — mira la pista' })
      setTimeout(() => setFeedback(null), 1600)
    }
  }

  function handleTextSubmit(val) {
    const input = (val || inputVal).trim()
    if (!input) return
    if (q.inputType === 'text-nombre') {
      const match = ELEMENTOS.find(e =>
        normalize(e.nombre) === normalize(input) ||
        normalize(e.nombreEn) === normalize(input) ||
        normalize(e.nombreCa) === normalize(input)
      )
      if (!match) {
        setFeedback({ ok: false, msg: en ? 'Not recognised' : ca ? 'No reconegut' : 'No reconocido' })
        setTimeout(() => setFeedback(null), 1200)
        return
      }
      if (normalize(getNombre(match, lang)) === normalize(q.correct)) handleCorrect()
      else handleWrong()
    } else {
      // symbol: compare case-insensitive
      if (normalize(input) === normalize(q.correct)) handleCorrect()
      else handleWrong()
    }
  }

  function handleChoice(op) {
    if (resuelto) return
    if (op === q.correct) handleCorrect()
    else handleWrong()
  }

  function siguiente() {
    if (idx + 1 >= pool.length) setFase('resultado')
    else { setIdx(i => i + 1); resetQ() }
  }

  const isChoice = q && (q.inputType === 'choice' || q.inputType === 'choice-num')

  const pageMeta = <PageMeta
    title={en ? 'Periodic Table Exam' : ca ? 'Examen Taula Periòdica' : 'Examen Tabla Periódica'}
    description={en ? 'Identify elements by symbol, name or properties. Interactive periodic table exam on Tuthor.' : ca ? 'Identifica elements per símbols, nom o propietats. Examen interactiu de la taula periòdica.' : 'Identifica elementos por símbolo, nombre o propiedades. Examen interactivo de la tabla periódica.'}
    path="/examen/tabla-periodica" lang={lang} />
  const quizSchema = <QuizSchema
    name={en ? 'Periodic Table Exam' : ca ? 'Examen Taula Periòdica' : 'Examen Tabla Periódica'}
    description={en ? 'Identify elements by symbol, name or properties. Interactive periodic table exam on Tuthor.' : ca ? 'Identifica elements per símbols, nom o propietats.' : 'Identifica elementos por símbolo, nombre o propiedades en la tabla periódica.'}
    path="/examen/tabla-periodica" lang={lang}
    subject={en ? 'Chemistry — Periodic Table' : ca ? 'Química — Taula Periòdica' : 'Química — Tabla Periódica'}
    level="secondary" />

  // ── SELECTOR DE NIVEL ──────────────────────────────────────────────────────
  if (!nivelSel) {
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {pageMeta}{quizSchema}
        <div className="max-w-sm w-full text-center">
          <div className="text-5xl mb-4">⚗️</div>
          <h1 className="text-white font-black text-2xl mb-2">
            {en ? 'Periodic Table' : ca ? 'Taula Periòdica' : 'Tabla Periódica'}
          </h1>
          <p className="text-white/40 text-sm mb-8">
            {en ? 'Select a level to start' : ca ? 'Selecciona un nivell per començar' : 'Selecciona un nivel para empezar'}
          </p>
          <div className="flex flex-col gap-3">
            {Object.entries(NIVEL_LABELS).map(([key, labels]) => {
              const count = ELEMENTOS.filter(e => e.niveles.includes(key)).length
              const tipos = [...new Set(Q_POOL[key])].length
              return (
                <button key={key} onClick={() => setNivelSel(key)}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-2xl px-6 py-4 text-left transition-all flex items-center justify-between group">
                  <div>
                    <p className="text-white font-bold">{lang === 'en' ? labels.en : lang === 'ca' ? labels.ca : labels.es}</p>
                    <p className="text-white/30 text-xs mt-0.5">
                      {count} {en ? 'elements' : ca ? 'elements' : 'elementos'} · {tipos} {en ? 'question types' : ca ? 'tipus de pregunta' : 'tipos de pregunta'}
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )
            })}
          </div>
          <button onClick={() => navigate(backTo)} className="mt-6 text-white/30 hover:text-white/60 text-sm transition-colors">
            {en ? '← Back' : '← Volver'}
          </button>
        </div>
      </div>
    )
  }

  // ── RESULTADO ──────────────────────────────────────────────────────────────
  if (fase === 'resultado') {
    const aprobado = aciertos >= 5
    const cal = calificacion(aciertos, lang)
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
            <p className="text-white/40 text-sm mb-3">
              {en ? 'Periodic Table' : ca ? 'Taula Periòdica' : 'Tabla Periódica'} · {lang === 'en' ? NIVEL_LABELS[nivelSel].en : lang === 'ca' ? NIVEL_LABELS[nivelSel].ca : NIVEL_LABELS[nivelSel].es}
            </p>
            <div className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/30 rounded-full px-3 py-1">
              <span className="text-amber-400 text-sm">💰</span>
              <span className="text-amber-400 font-black text-sm">+{Math.min(aciertos * 20, 200)}</span>
              <span className="text-amber-400/60 text-xs">{en ? 'coins' : ca ? 'monedes' : 'monedas'}</span>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-3 font-semibold">{en ? 'Detail' : ca ? 'Detall' : 'Detalle'}</p>
            <div className="flex gap-2 flex-wrap">
              {historial.map((h, i) => (
                <div key={i} className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-xs font-bold ${h.passed ? 'bg-green-400/20 border-green-400 text-green-400' : 'bg-red-400/20 border-red-400 text-red-400'}`}>{i + 1}</div>
              ))}
            </div>
          </div>
          <button onClick={() => { setIdx(0); setAciertos(0); setHistorial([]); setFase('jugando'); setNivelSel(null); resetQ() }}
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

  // ── JUGANDO ────────────────────────────────────────────────────────────────
  if (!q) return null

  const Q_TYPE_LABEL = {
    'symbol-to-name': { es:'Símbolo → Nombre', en:'Symbol → Name',   ca:'Símbol → Nom'    },
    'name-to-symbol': { es:'Nombre → Símbolo', en:'Name → Symbol',   ca:'Nom → Símbol'    },
    'z-to-name':      { es:'Z → Nombre',       en:'Z → Name',        ca:'Z → Nom'         },
    'classify':       { es:'Clasifica',         en:'Classify',        ca:'Classifica'      },
    'grupo':          { es:'Grupo',             en:'Group',           ca:'Grup'            },
    'periodo':        { es:'Periodo',           en:'Period',          ca:'Període'         },
  }

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 md:px-8 py-5 max-w-lg mx-auto w-full">
      {pageMeta}
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => navigate(backTo)} className="text-white/40 hover:text-white/70 text-sm transition-colors">
          {en ? '← Exit' : '← Salir'}
        </button>
        <span className="text-white/40 text-sm font-bold">
          ⚗️ {en ? 'Periodic Table' : ca ? 'Taula Periòdica' : 'Tabla Periódica'} · {idx + 1}/{pool.length}
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
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-white/30 text-xs font-semibold uppercase tracking-widest">{q.pregunta}</p>
            <span className="text-white/20 text-xs bg-white/5 px-2 py-0.5 rounded-full">
              {lang === 'en' ? Q_TYPE_LABEL[q.type].en : lang === 'ca' ? Q_TYPE_LABEL[q.type].ca : Q_TYPE_LABEL[q.type].es}
            </span>
          </div>
          <ElementCard elemento={q.elemento} qType={q.type} showHint={showHint} hint={q.hint} />
        </div>

        {feedback && (
          <div className={`text-center py-2 px-4 rounded-xl text-sm font-bold ${feedback.ok ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {feedback.msg}
          </div>
        )}

        {!resuelto && isChoice && (
          <ChoiceButtons
            opciones={q.opciones}
            onSelect={handleChoice}
            disabled={!!feedback}
            correct={q.correct}
            revealed={choiceRevealed}
            lang={lang}
            isNum={q.inputType === 'choice-num'}
          />
        )}

        {resuelto && isChoice && (
          <ChoiceButtons
            opciones={q.opciones}
            onSelect={() => {}}
            disabled={true}
            correct={q.correct}
            revealed={true}
            lang={lang}
            isNum={q.inputType === 'choice-num'}
          />
        )}

        {!resuelto && !isChoice && (
          <TextInput
            value={inputVal}
            onChange={setInputVal}
            onSubmit={handleTextSubmit}
            disabled={!!feedback}
            focusKey={`${idx}-${errores}`}
            short={q.inputType === 'text-symbol'}
            placeholder={
              q.inputType === 'text-symbol'
                ? (en ? 'Symbol…' : ca ? 'Símbol…' : 'Símbolo…')
                : (en ? 'Element name…' : ca ? "Nom de l'element…" : 'Nombre del elemento…')
            }
          />
        )}

        {!resuelto && !isChoice && (
          <button onClick={() => handleTextSubmit(inputVal)}
            disabled={!inputVal.trim() || !!feedback}
            className="w-full py-3 bg-[#EDAE49] hover:bg-amber-400 disabled:opacity-30 text-black font-black rounded-xl transition-all">
            {en ? 'Confirm' : ca ? 'Confirmar' : 'Confirmar'}
          </button>
        )}

        <p className="text-white/20 text-xs text-center">
          {errores}/{MAX_ERRORS} {en ? 'errors' : ca ? 'errors' : 'errores'}
        </p>
      </div>
    </div>
  )
}
