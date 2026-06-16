import { useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { MODOS, GRADOS } from '../lib/mathEngine'
import CombinaNumeros from '../components/CombinaNumeros'

export default function MatematicasPractica() {
  const navigate      = useNavigate()
  const location       = useLocation()
  const { modo }       = useParams()
  const { user }        = useAuth()
  const [runId, setRunId] = useState(0)

  const modoCfg = MODOS[modo] || MODOS.combinado
  const gradoId = location.state?.nivel || 'primaria'
  const grado   = GRADOS[gradoId] || GRADOS.primaria

  function handleFinish({ pts, passed, timeSpent }) {
    if (user) {
      saveActivity(user.uid, {
        type: 'juego', game: 'matematicas', category: `${modo}-${gradoId}`,
        score: pts, passed, timeSpent,
      }).catch(() => {})
    }
  }

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-3 sm:px-6 py-4">
      <p className="text-white/30 text-xs mb-4 text-center">
        <button onClick={() => navigate('/estudiar/matematicas')} className="hover:text-white/60 transition-colors">Matemáticas</button>
        {' '}/{'  '}
        <button onClick={() => navigate(`/estudiar/matematicas/${modo}`)} className="hover:text-white/60 transition-colors">{modoCfg.titulo}</button>
        {' '}/{'  '}<span className="text-white/50">Acércate al número</span>
      </p>

      <CombinaNumeros
        key={runId}
        ops={modoCfg.ops}
        cfg={grado}
        nivelLabel={{ emoji: grado.emoji, label: grado.label }}
        onFinish={handleFinish}
        onPlayAgain={() => setRunId(r => r + 1)}
        onExit={() => navigate(`/estudiar/matematicas/${modo}`)}
      />
    </div>
  )
}
