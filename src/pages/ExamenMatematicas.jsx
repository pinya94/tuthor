import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { MODOS, GRADOS, rng } from '../lib/mathEngine'
import PageMeta from '../components/PageMeta'

const TOTAL = 10

function generarPregunta(ops, grado) {
  const op = ops[Math.floor(Math.random() * ops.length)]
  const max = Math.min(grado.numMax || 12, 12)

  let a, b, resp
  if (op === '+') {
    a = rng(1, max); b = rng(1, max); resp = a + b
  } else if (op === '-') {
    a = rng(2, max); b = rng(1, a); resp = a - b
  } else if (op === '×') {
    a = rng(2, Math.min(max, 10)); b = rng(2, Math.min(max, 10)); resp = a * b
  } else {
    b = rng(2, Math.min(max, 10)); resp = rng(2, Math.min(max, 10)); a = b * resp
  }

  const opLabel = op === '×' ? '×' : op === '÷' ? '÷' : op
  return { a, b, op: opLabel, resp }
}

function calificacion(aciertos, en) {
  if (aciertos === 10) return { label: en ? 'Outstanding' : 'Sobresaliente', nota: 10, color: 'text-green-400' }
  if (aciertos === 9)  return { label: en ? 'Outstanding' : 'Sobresaliente', nota: 9,  color: 'text-green-400' }
  if (aciertos === 8)  return { label: en ? 'Good' : 'Notable',              nota: 8,  color: 'text-blue-400'  }
  if (aciertos === 7)  return { label: en ? 'Good' : 'Notable',              nota: 7,  color: 'text-blue-400'  }
  if (aciertos === 6)  return { label: en ? 'Fair' : 'Bien',         nota: 6,  color: 'text-yellow-300'}
  if (aciertos === 5)  return { label: en ? 'Pass' : 'Suficiente',  nota: 5,  color: 'text-orange-400'}
  return { label: en ? 'Fail' : 'Insuficiente', nota: Math.max(1, aciertos), color: 'text-red-400' }
}

export default function ExamenMatematicas() {
  const navigate   = useNavigate()
  const { lang, localPath } = useLang()
  const en = lang === 'en'
  const location   = useLocation()
  const { modo }   = useParams()
  const modoCfg    = MODOS[modo] || MODOS.combinado
  const gradoId    = location.state?.nivel || 'primaria'
  const grado      = GRADOS[gradoId] || GRADOS.primaria

  const pageMeta = <PageMeta
    title={en ? `Maths Exam — ${modoCfg.tituloEn || modoCfg.titulo}` : `Examen Matemáticas — ${modoCfg.titulo}`}
    description={en ? `Practice ${modoCfg.tituloEn || modoCfg.titulo} with 10 questions and instant feedback on Tuthor.` : `Practica ${modoCfg.titulo} con 10 preguntas y feedback inmediato en Tuthor.`}
    path={`/examen/matematicas/${modo || 'combinado'}`} lang={lang} />

  const [preguntas]   = useState(() =>
    Array.from({ length: TOTAL }, () => generarPregunta(modoCfg.ops, grado))
  )
  const [idx, setIdx]         = useState(0)
  const [respuesta, setResp]  = useState('')
  const [historial, setHist]  = useState([])   // { pregunta, dada, correcto }
  const [feedback, setFb]     = useState(null) // 'correcto' | 'incorrecto'
  const [fase, setFase]       = useState('jugando') // 'jugando' | 'resultado'
  const inputRef = useRef(null)
  const { user } = useAuth()

  useEffect(() => { inputRef.current?.focus() }, [idx, feedback])

  // Guardar al terminar (una vez por partida)
  const startRef = useRef(Date.now())
  const savedRef = useRef(false)
  useEffect(() => {
    if (fase !== 'resultado' || savedRef.current || !user) return
    savedRef.current = true
    const aciertos = historial.filter(h => h.correcto).length
    saveActivity(user.uid, {
      type: 'examen', game: 'matematicas-examen', category: 'matematicas-examen',
      score: aciertos * 100, passed: aciertos >= 5,
      timeSpent: Math.round((Date.now() - startRef.current) / 1000),
      coinsEarned: Math.min(aciertos * 20, 200),
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }, [fase]) // eslint-disable-line react-hooks/exhaustive-deps

  function confirmar() {
    if (feedback) return
    const num = parseInt(respuesta, 10)
    if (isNaN(num)) return
    const p = preguntas[idx]
    const correcto = num === p.resp
    setFb(correcto ? 'correcto' : 'incorrecto')
    setHist(h => [...h, { pregunta: p, dada: num, correcto }])

    setTimeout(() => {
      setFb(null)
      setResp('')
      if (idx + 1 >= TOTAL) setFase('resultado')
      else setIdx(i => i + 1)
    }, 900)
  }

  if (fase === 'resultado') {
    const aciertos = historial.filter(h => h.correcto).length
    const cal = calificacion(aciertos, en)
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {pageMeta}
        <div className="max-w-md w-full">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center mb-4">
            <div className="text-5xl mb-3">{aciertos >= 5 ? '🎉' : '😬'}</div>
            <h2 className="text-2xl font-black text-white mb-1">{cal.label}</h2>
            <p className={`text-5xl font-black mb-1 ${cal.color}`}>{aciertos}/{TOTAL}</p>
            <p className="text-white/40 text-sm mb-3">{en ? 'Grade' : 'Nota'}: {cal.nota}</p>
            <div className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/30 rounded-full px-3 py-1">
              <span className="text-amber-400 text-sm">💰</span>
              <span className="text-amber-400 font-black text-sm">+{Math.min(aciertos * 20, 200)}</span>
              <span className="text-amber-400/60 text-xs">{en ? 'coins' : 'monedas'}</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5 space-y-2">
            {historial.map((h, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-white/60 font-mono">{h.pregunta.a} {h.pregunta.op} {h.pregunta.b} =</span>
                <span className={`font-bold ${h.correcto ? 'text-green-400' : 'text-red-400'}`}>
                  {h.dada} {h.correcto ? '✓' : `✗  (${h.pregunta.resp})`}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate(localPath(`/estudiar/matematicas/${modo}/examen`), { state: { nivel: gradoId }, replace: true })}
            className="w-full py-3 bg-[#EDAE49] hover:bg-amber-400 text-black font-black rounded-2xl transition-all mb-2"
          >
            {en ? 'Retake exam' : 'Repetir examen'}
          </button>
          <button
            onClick={() => navigate(localPath(`/estudiar/matematicas/${modo}`))}
            className="w-full py-3 text-white/40 hover:text-white/70 text-sm transition-colors"
          >
            {en ? '← Back to topic' : '← Volver al tema'}
          </button>
        </div>
      </div>
    )
  }

  const p = preguntas[idx]
  const bgFb = feedback === 'correcto' ? 'border-green-400/50 bg-green-400/5'
             : feedback === 'incorrecto' ? 'border-red-400/50 bg-red-400/5'
             : 'border-white/10'

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      {pageMeta}
      <div className="max-w-md w-full">
        <p className="text-white/30 text-xs mb-6 text-center">
          <button onClick={() => navigate(localPath(`/estudiar/matematicas/${modo}`))} className="hover:text-white/60 transition-colors">
            {en ? (modoCfg.tituloEn || modoCfg.titulo) : modoCfg.titulo}
          </button>
          {'  /  '}<span className="text-white/50">{en ? 'Exam' : 'Examen'}</span>
        </p>

        {/* Progreso */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#EDAE49] rounded-full transition-all duration-300"
              style={{ width: `${(idx / TOTAL) * 100}%` }}
            />
          </div>
          <span className="text-white/50 text-sm tabular-nums">{idx + 1}/{TOTAL}</span>
        </div>

        {/* Pregunta */}
        <div className={`border rounded-2xl p-8 text-center mb-4 transition-all duration-200 ${bgFb}`}>
          <p className="text-white/40 text-xs mb-4 uppercase tracking-widest">{en ? 'What is it?' : '¿Cuánto es?'}</p>
          <p className="text-5xl font-black text-white mb-6 font-mono">
            {p.a} {p.op} {p.b} = ?
          </p>

          {feedback ? (
            <div className={`text-3xl font-black ${feedback === 'correcto' ? 'text-green-400' : 'text-red-400'}`}>
              {feedback === 'correcto' ? `✓ ${p.resp}` : `✗ Era ${p.resp}`}
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="number"
                value={respuesta}
                onChange={e => setResp(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && confirmar()}
                placeholder={en ? 'Answer' : 'Respuesta'}
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-center text-xl font-bold placeholder:text-white/20 focus:outline-none focus:border-white/50"
              />
              <button
                onClick={confirmar}
                disabled={!respuesta.trim()}
                className="bg-white text-black font-bold px-5 rounded-xl disabled:opacity-30 hover:bg-white/90 transition"
              >
                →
              </button>
            </div>
          )}
        </div>

        {/* Aciertos parciales */}
        <div className="flex gap-1.5 justify-center">
          {Array.from({ length: TOTAL }).map((_, i) => {
            const h = historial[i]
            return (
              <div
                key={i}
                className={`w-5 h-5 rounded-full border ${
                  h ? (h.correcto ? 'bg-green-400 border-green-400' : 'bg-red-400 border-red-400')
                    : i === idx ? 'border-white/60 bg-white/10' : 'border-white/20'
                }`}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
