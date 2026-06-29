import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getEventosPorCategoria, calcularMargen } from '../data/historiaEvents'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { saveActivity } from '../lib/activity'

// ── PANTALLA INTRO ─────────────────────────────────────────────────────────
function Intro({ examen, eventos, margen, onStart, en }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-6xl mb-4 block">{examen.emoji}</span>
          <h1 className="text-3xl font-black text-white mb-2">{examen.titulo || examen.nombre}</h1>
          <p className="text-white/50 text-sm">{examen.descripcion}</p>
        </div>

        {/* Reglas */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 space-y-4">
          <div className="flex items-start gap-4">
            <span className="text-2xl mt-0.5">❤️</span>
            <div>
              <p className="font-bold text-white text-sm">{en ? 'One life' : 'Una sola vida'}</p>
              <p className="text-white/50 text-xs mt-0.5">{en ? 'If you miss by more than the margin on any question, the exam ends. You can keep viewing the rest, but without scoring.' : 'Si te equivocas más del margen en una pregunta, el examen acaba. Puedes seguir viendo el resto, pero sin puntuación.'}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl mt-0.5">📏</span>
            <div>
              <p className="font-bold text-white text-sm">{en ? 'Margin for this exam' : 'Margen de este examen'}: <span className="text-violet-400">±{margen} {margen === 1 ? (en ? 'year' : 'año') : (en ? 'years' : 'años')}</span></p>
              <p className="text-white/50 text-xs mt-0.5">{en ? `Calculated from the historical range of the ${eventos.length} events. The more compressed the era, the less margin.` : `Calculado según el rango histórico de los ${eventos.length} eventos. Cuanto más comprimida la época, menos margen.`}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl mt-0.5">🏆</span>
            <div>
              <p className="font-bold text-white text-sm">{en ? 'Reach the end = pass' : 'Llegar al final = aprobar'}</p>
              <p className="text-white/50 text-xs mt-0.5">{en ? 'The closer to the exact year, the more points. The exact year gives a bonus.' : 'Cuanto más cerca del año exacto, más puntos. El año exacto da bonus.'}</p>
            </div>
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-xl transition-colors text-lg"
        >
          {en ? 'Start exam →' : 'Empezar examen →'}
        </button>
      </div>
    </div>
  )
}

// ── BARRA DE VIDA ──────────────────────────────────────────────────────────
function VidaBar({ vivo, en }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold transition-all ${
      vivo
        ? 'bg-red-500/20 border-red-500/40 text-red-400'
        : 'bg-white/5 border-white/10 text-white/30 line-through'
    }`}>
      <span>{vivo ? '❤️' : '💀'}</span>
      <span>{vivo ? (en ? 'One life' : 'Una vida') : (en ? 'Dead — spectator mode' : 'Muerto — modo espectador')}</span>
    </div>
  )
}

// ── PREGUNTA ───────────────────────────────────────────────────────────────
function Pregunta({ evento, margen, idx, total, vivo, onResponder, en, lt }) {
  const [input, setInput] = useState('')
  const [respondido, setRespondido] = useState(false)
  const [resultado, setResultado] = useState(null)
  const inputRef = useRef(null)

  useEffect(() => {
    setInput('')
    setRespondido(false)
    setResultado(null)
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [evento])

  const difColor = { fácil: 'text-green-400 bg-green-500/10 border-green-500/30', medio: 'text-amber-400 bg-amber-500/10 border-amber-500/30', difícil: 'text-red-400 bg-red-500/10 border-red-500/30' }

  function enviar() {
    const respuesta = parseInt(input)
    if (isNaN(respuesta)) return
    const diff = Math.abs(respuesta - evento.año)
    const exacto = diff === 0
    const dentro = diff <= margen
    const puntos = vivo ? (exacto ? 150 : dentro ? Math.round(100 * (1 - diff / margen)) : 0) : 0
    setResultado({ respuesta, diff, exacto, dentro, puntos })
    setRespondido(true)
    onResponder({ respuesta, diff, exacto, dentro, puntos, muereAqui: vivo && !dentro })
  }

  return (
    <div className="max-w-lg w-full mx-auto">
      {/* Progreso */}
      <div className="flex items-center justify-between mb-4 text-sm text-white/40">
        <span>{en ? 'Question' : 'Pregunta'} {idx + 1} {en ? 'of' : 'de'} {total}</span>
        <span className="text-white/20">{'█'.repeat(idx + 1)}{'░'.repeat(total - idx - 1)}</span>
      </div>

      {/* Card evento */}
      <div className={`bg-white/5 border rounded-2xl p-6 mb-4 transition-all ${
        respondido
          ? resultado.dentro ? 'border-green-500/40 bg-green-500/5' : 'border-red-500/40 bg-red-500/5'
          : 'border-white/10'
      }`}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <h2 className="font-black text-white text-xl leading-tight">{lt(evento, 'nombre')}</h2>
          <span className={`text-xs font-bold px-2 py-1 rounded-full border shrink-0 ${difColor[evento.dificultad]}`}>
            {en ? ({ fácil: 'easy', medio: 'medium', difícil: 'hard' }[evento.dificultad] || evento.dificultad) : evento.dificultad}
          </span>
        </div>
        <p className="text-white/50 text-sm leading-relaxed">{lt(evento, 'descripcion')}</p>
      </div>

      {/* Margen visible */}
      <p className="text-center text-white/30 text-xs mb-3">{en ? 'Allowed margin' : 'Margen permitido'}: <span className="text-violet-400 font-bold">±{margen} {margen === 1 ? (en ? 'year' : 'año') : (en ? 'years' : 'años')}</span></p>

      {/* Input */}
      {!respondido ? (
        <div className="flex gap-3">
          <input
            ref={inputRef}
            type="number"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && enviar()}
            placeholder={en ? "What year?" : "¿En qué año?"}
            className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-center text-xl font-bold placeholder:text-white/20 focus:outline-none focus:border-violet-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            onClick={enviar}
            disabled={!input}
            className="bg-violet-600 hover:bg-violet-700 disabled:opacity-30 text-white font-bold px-6 rounded-xl transition-colors"
          >
            →
          </button>
        </div>
      ) : (
        <div className={`rounded-xl p-4 text-center font-bold ${
          resultado.exacto ? 'bg-violet-500/20 border border-violet-500/40 text-violet-300'
          : resultado.dentro ? 'bg-green-500/20 border border-green-500/40 text-green-400'
          : 'bg-red-500/20 border border-red-500/40 text-red-400'
        }`}>
          {resultado.exacto
            ? `⭐ ${en ? 'Exact year!' : '¡Año exacto!'} +${resultado.puntos} pts`
            : resultado.dentro
              ? `✓ ${en ? 'Close' : 'Cerca'} — ${en ? `off by ${resultado.diff} ${resultado.diff === 1 ? 'year' : 'years'}. The year was ${evento.año}.` : `te has desviado ${resultado.diff} ${resultado.diff === 1 ? 'año' : 'años'}. El año era ${evento.año}.`} +${resultado.puntos} pts`
              : `✕ ${en ? `Too far — off by ${resultado.diff} years. The year was ${evento.año}.` : `Demasiado lejos — te has desviado ${resultado.diff} años. El año era ${evento.año}.`}`
          }
        </div>
      )}
    </div>
  )
}

// ── RESULTADO FINAL ────────────────────────────────────────────────────────
function Resultado({ historial, eventos, margen, aprobado, preguntaMuerte, onRepetir, onSalir, en, lt }) {
  const puntos = historial.reduce((s, h) => s + h.puntos, 0)
  const aciertos = historial.filter(h => h.dentro).length
  const exactos = historial.filter(h => h.exacto).length

  let nota, notaColor
  if (!aprobado) { nota = en ? 'FAILED' : 'SUSPENDIDO'; notaColor = 'text-red-400' }
  else {
    const pct = aciertos / eventos.length
    if (pct >= 0.9) { nota = en ? 'OUTSTANDING' : 'SOBRESALIENTE'; notaColor = 'text-violet-400' }
    else if (pct >= 0.7) { nota = en ? 'GOOD' : 'NOTABLE'; notaColor = 'text-blue-400' }
    else { nota = en ? 'PASSED' : 'APROBADO'; notaColor = 'text-green-400' }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-lg w-full">
        <div className="text-center mb-6">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{en ? 'Final result' : 'Resultado final'}</p>
          <h1 className={`text-4xl font-black mb-1 ${notaColor}`}>{nota}</h1>
          {!aprobado && (
            <p className="text-white/50 text-sm">{en ? `Failed on question ${preguntaMuerte + 1} of ${eventos.length}` : `Fallaste en la pregunta ${preguntaMuerte + 1} de ${eventos.length}`}</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { val: puntos, label: en ? 'Points' : 'Puntos' },
            { val: `${aciertos}/${historial.length}`, label: en ? 'Within margin' : 'Dentro del margen' },
            { val: exactos, label: en ? 'Exact years ⭐' : 'Años exactos ⭐' },
          ].map(s => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <p className="text-xl font-black text-white">{s.val}</p>
              <p className="text-white/40 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Desglose */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 max-h-64 overflow-y-auto space-y-2">
          {eventos.map((ev, i) => {
            const h = historial[i]
            if (!h) return (
              <div key={ev.id} className="flex items-center justify-between text-sm py-1 opacity-30">
                <span className="text-white/50 truncate mr-2">{i + 1}. {lt(ev, 'nombre')}</span>
                <span className="text-white/30 shrink-0">— {en ? 'unanswered' : 'sin responder'}</span>
              </div>
            )
            return (
              <div key={ev.id} className="flex items-center justify-between text-sm py-1 border-b border-white/5 last:border-0">
                <span className={`truncate mr-2 ${h.exacto ? 'text-violet-300' : h.dentro ? 'text-white' : 'text-red-400'}`}>
                  {i + 1}. {lt(ev, 'nombre')}
                </span>
                <span className={`shrink-0 font-mono text-xs ${h.exacto ? 'text-violet-400' : h.dentro ? 'text-green-400' : 'text-red-400'}`}>
                  {h.respuesta} {h.exacto ? '⭐' : h.dentro ? `✓ ±${h.diff}a` : `✕ ±${h.diff}a`}
                </span>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col gap-3">
          <button onClick={onRepetir} className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-colors">
            {en ? 'Retake exam ↺' : 'Repetir examen ↺'}
          </button>
          <button onClick={onSalir} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 font-medium py-3 rounded-xl transition-colors">
            {en ? 'Back to History' : 'Volver a Historia'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── COMPONENTE PRINCIPAL ───────────────────────────────────────────────────
export default function ExamenJuego() {
  const navigate = useNavigate()
  const { lang, localPath, lt } = useLang()
  const en = lang === 'en'
  const location = useLocation()
  const examen = location.state?.examen
  const nivel = location.state?.nivel
  const backPath = location.state?.backPath || '/estudiar'

  const [fase, setFase] = useState('intro') // intro | jugando | resultado
  const [eventos, setEventos] = useState([])
  const [margen, setMargen] = useState(1)
  const [idx, setIdx] = useState(0)
  const [historial, setHistorial] = useState([])
  const [vivo, setVivo] = useState(true)
  const [preguntaMuerte, setPreguntaMuerte] = useState(null)
  const startTimeRef = useRef(null)
  const { user } = useAuth()

  useEffect(() => {
    if (!examen) { navigate(-1); return }
    const evs = getEventosPorCategoria(examen.id, nivel)
    setEventos(evs)
    setMargen(calcularMargen(examen.id, nivel))
  }, [examen])

  if (!examen) return null

  function iniciar() {
    setFase('jugando')
    setIdx(0)
    setHistorial([])
    setVivo(true)
    setPreguntaMuerte(null)
    startTimeRef.current = Date.now()
  }

  function onResponder(resultado) {
    const nuevoHistorial = [...historial, resultado]
    setHistorial(nuevoHistorial)

    if (resultado.muereAqui) {
      setVivo(false)
      setPreguntaMuerte(idx)
    }

    // Auto-avanzar después de 1.8s si quedan preguntas
    const esUltima = idx >= eventos.length - 1
    setTimeout(() => {
      if (esUltima) {
        const timeSpent = startTimeRef.current ? Math.round((Date.now() - startTimeRef.current) / 1000) : 0
        const puntos = [...historial, resultado].reduce((s, h) => s + h.puntos, 0)
        const passed = vivo && !resultado.muereAqui
        if (user) {
          saveActivity(user.uid, {
            type: 'examen',
            game: 'juego-fechas',
            category: examen.id,
            score: puntos,
            passed,
            timeSpent,
          }).catch(() => {})
        }
        setFase('resultado')
      } else {
        setIdx(i => i + 1)
      }
    }, 1800)
  }

  const aprobado = vivo || preguntaMuerte === null


  if (fase === 'intro') {
    return (
      <div className="relative z-10">
        <Intro examen={examen} eventos={eventos} margen={margen} onStart={iniciar} en={en} />
      </div>
    )
  }

  if (fase === 'resultado') {
    return (
      <div className="relative z-10">
        <Resultado
          historial={historial}
          eventos={eventos}
          margen={margen}
          aprobado={aprobado}
          preguntaMuerte={preguntaMuerte}
          onRepetir={() => { iniciar(); setFase('jugando') }}
          onSalir={() => navigate(localPath(backPath))}
          en={en}
          lt={lt}
        />
      </div>
    )
  }

  // Fase jugando
  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-6">
      {/* Estado de vida */}
      <div className="mb-6">
        <VidaBar vivo={vivo} />
      </div>

      {eventos.length > 0 && idx < eventos.length && (
        <Pregunta
          key={idx}
          evento={eventos[idx]}
          margen={margen}
          idx={idx}
          total={eventos.length}
          vivo={vivo}
          onResponder={onResponder}
          en={en}
          lt={lt}
        />
      )}
    </div>
  )
}
