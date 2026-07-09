import { useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { MODOS, GRADOS } from '../lib/mathEngine'
import CombinaNumeros from '../components/CombinaNumeros'
import CoinsAnimation from '../components/CoinsAnimation'

const TOTAL_RONDAS = 10

function calificacion(aciertos, en) {
  if (aciertos >= 9)  return { label: en ? 'Outstanding' : 'Sobresaliente', nota: aciertos === 10 ? 10 : 9, color: 'text-green-400' }
  if (aciertos >= 7)  return { label: en ? 'Good' : 'Notable',              nota: aciertos,                color: 'text-blue-400'  }
  if (aciertos === 6) return { label: en ? 'Fair' : 'Bien',                 nota: 6,                       color: 'text-yellow-300'}
  if (aciertos === 5) return { label: en ? 'Pass' : 'Suficiente',           nota: 5,                       color: 'text-orange-400'}
  return { label: en ? 'Fail' : 'Insuficiente', nota: Math.max(1, aciertos), color: 'text-red-400' }
}

export default function MatematicasPractica() {
  const navigate   = useNavigate()
  const location   = useLocation()
  const { lang, localPath } = useLang()
  const en = lang === 'en'
  const { modo }   = useParams()
  const { user }   = useAuth()
  const [runId, setRunId] = useState(0)

  const modoExamen = location.state?.modoExamen === true
  const modoCfg    = MODOS[modo] || MODOS.combinado
  const gradoId    = location.state?.nivel || 'primaria'
  const grado      = GRADOS[gradoId] || GRADOS.primaria

  // Exam-mode state
  const [exRonda,    setExRonda]    = useState(1)
  const [exAciertos, setExAciertos] = useState(0)
  const [exHistorial, setExHistorial] = useState([]) // {passed} per round
  const [exFase,     setExFase]     = useState('jugando') // 'jugando' | 'resultado'
  const [exCoins,    setExCoins]    = useState(0)

  function handleFinish({ pts, passed, timeSpent }) {
    if (user && !modoExamen) {
      saveActivity(user.uid, {
        type: 'juego', game: 'matematicas', category: `${modo}-${gradoId}`,
        score: pts, passed, timeSpent,
        coinsEarned: computeCoins('matematicas', { score: pts }),
      }).catch(() => {})
    }

    if (modoExamen) {
      const nuevosAciertos = exAciertos + (passed ? 1 : 0)
      const nuevosHistorial = [...exHistorial, { passed }]
      setExAciertos(nuevosAciertos)
      setExHistorial(nuevosHistorial)
      if (exRonda >= TOTAL_RONDAS) {
        const coinsEarned = nuevosAciertos * 20
        if (user) {
          saveActivity(user.uid, {
            type: 'examen', game: 'matematicas', category: `${modo}-${gradoId}`,
            score: nuevosAciertos * 100, passed: nuevosAciertos >= 5,
            timeSpent, coinsEarned,
          }).catch(() => {})
        }
        setExCoins(coinsEarned)
        setExFase('resultado')
      }
    }
  }

  function siguienteRonda() {
    setExRonda(r => r + 1)
    setRunId(r => r + 1)
  }

  // ── Resultado del examen ──────────────────────────────────────────────────
  if (modoExamen && exFase === 'resultado') {
    const aprobado = exAciertos >= 5
    const cal = calificacion(exAciertos, en)
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {exCoins > 0 && <CoinsAnimation coins={exCoins} />}
        <div className="max-w-md w-full">
          <p className="text-white/30 text-xs mb-6 text-center">
            <button onClick={() => navigate(localPath('/estudiar/matematicas'))} className="hover:text-white/60 transition-colors">{en ? 'Mathematics' : 'Matemáticas'}</button>
            {' '}/{' '}
            <button onClick={() => navigate(localPath(`/estudiar/matematicas/${modo}`))} className="hover:text-white/60 transition-colors">{en ? (modoCfg.tituloEn || modoCfg.titulo) : modoCfg.titulo}</button>
            {' '}/{' '}<span className="text-white/50">{en ? 'Exam' : 'Examen'}</span>
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center mb-4">
            <div className="text-5xl mb-3">{aprobado ? '🎉' : '😬'}</div>
            <div className={`text-xs uppercase tracking-widest font-semibold mb-1 ${aprobado ? 'text-green-400' : 'text-red-400'}`}>
              {aprobado ? (en ? 'Passed' : 'Aprobado') : (en ? 'Failed' : 'Suspenso')}
            </div>
            <h2 className="text-2xl font-black text-white mb-1">{cal.label}</h2>
            <p className={`text-5xl font-black mb-1 ${cal.color}`}>{exAciertos}/{TOTAL_RONDAS}</p>
            <p className="text-white/40 text-sm">{en ? `Grade: ${cal.nota} · You reached the target in ${exAciertos} of ${TOTAL_RONDAS} puzzles` : `Nota: ${cal.nota} · Acercaste al objetivo en ${exAciertos} de ${TOTAL_RONDAS} puzzles`}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-3 font-semibold">{en ? 'Detail per puzzle' : 'Detalle por puzzle'}</p>
            <div className="flex gap-2 flex-wrap">
              {exHistorial.map((h, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center gap-1 w-8 h-8 rounded-full border-2 text-xs font-bold justify-center ${
                    h.passed ? 'bg-green-400/20 border-green-400 text-green-400' : 'bg-red-400/20 border-red-400 text-red-400'
                  }`}
                  title={h.passed ? (en ? 'Exact' : 'Exacto') : (en ? 'Not exact' : 'No exacto')}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setExRonda(1); setExAciertos(0); setExHistorial([]); setExFase('jugando'); setRunId(r => r + 1)
            }}
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

  // ── Modo práctica libre o puzzle activo del examen ────────────────────────
  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-3 sm:px-6 py-4">
      <p className="text-white/30 text-xs mb-4 text-center">
        <button onClick={() => navigate('/estudiar/matematicas')} className="hover:text-white/60 transition-colors">Matemáticas</button>
        {' '}/{' '}
        <button onClick={() => navigate(localPath(`/estudiar/matematicas/${modo}`))} className="hover:text-white/60 transition-colors">{en ? (modoCfg.tituloEn || modoCfg.titulo) : modoCfg.titulo}</button>
        {' '}/{' '}
        <span className="text-white/50">
          {modoExamen ? `${en ? 'Exam' : 'Examen'} · Puzzle ${exRonda}/${TOTAL_RONDAS}` : (en ? 'Target Number' : 'Acércate al número')}
        </span>
      </p>

      {modoExamen && (
        <div className="max-w-lg mx-auto w-full mb-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#EDAE49] rounded-full transition-all duration-300"
                style={{ width: `${((exRonda - 1) / TOTAL_RONDAS) * 100}%` }}
              />
            </div>
            <span className="text-white/50 text-sm tabular-nums">{exRonda}/{TOTAL_RONDAS}</span>
          </div>
          <div className="flex gap-1.5 mt-2 justify-center">
            {exHistorial.map((h, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full ${h.passed ? 'bg-green-400' : 'bg-red-400'}`}
              />
            ))}
            {Array.from({ length: TOTAL_RONDAS - exHistorial.length }).map((_, i) => (
              <div
                key={`p-${i}`}
                className={`w-4 h-4 rounded-full border ${
                  i === 0 ? 'border-white/60 bg-white/10' : 'border-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <CombinaNumeros
        key={runId}
        ops={modoCfg.ops}
        cfg={grado}
        nivelLabel={{ emoji: grado.emoji, label: en ? (grado.labelEn || grado.label) : grado.label }}
        onFinish={handleFinish}
        onPlayAgain={modoExamen
          ? (exRonda < TOTAL_RONDAS ? siguienteRonda : null)
          : () => setRunId(r => r + 1)
        }
        playAgainLabel={modoExamen ? `Puzzle ${exRonda + 1} →` : 'Otra ronda'}
        onExit={modoExamen ? null : () => navigate(localPath(`/estudiar/matematicas/${modo}`))}
      />
    </div>
  )
}
