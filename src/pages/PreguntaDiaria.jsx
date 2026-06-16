import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getDailyStatus, saveDailyChallenge } from '../lib/activity'
import { getDesafioDeHoy } from '../data/preguntasDiarias'
import AuthModal from '../components/AuthModal'
import CombinaNumeros from '../components/CombinaNumeros'

export default function PreguntaDiaria() {
  const { user } = useAuth()
  const [selected, setSelected]   = useState(null)
  const [answered, setAnswered]   = useState(false)
  const [dailyDone, setDailyDone] = useState(false)
  const [streak, setStreak]       = useState(0)
  const [loading, setLoading]     = useState(true)
  const [showAuth, setShowAuth]   = useState(false)

  const desafio  = getDesafioDeHoy()
  const esMate   = desafio.tipo === 'matematicas'
  const pregunta = desafio.tipo === 'trivia' ? desafio.pregunta : null

  useEffect(() => {
    if (!user) { setLoading(false); return }
    getDailyStatus(user.uid).then(({ done, streak: s }) => {
      setDailyDone(done); setStreak(s); setLoading(false)
    })
  }, [user])

  async function confirmar() {
    if (!selected || answered) return
    setAnswered(true)
    if (user) {
      const saved = await saveDailyChallenge(user.uid, selected === pregunta.correcta)
      if (saved) setStreak(s => s + 1)
    }
  }

  async function handleMathFinish(result) {
    setAnswered(true)
    if (user) {
      const saved = await saveDailyChallenge(user.uid, result.passed)
      if (saved) setStreak(s => s + 1)
    }
  }

  const correct = pregunta?.correcta

  return (
    <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-6">
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      <div className="max-w-lg w-full bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-2xl">

        {/* Cabecera */}
        <div className="bg-gradient-to-r from-orange-500 to-rose-600 px-6 sm:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-xs font-medium">Reto de hoy</p>
              <h2 className="text-2xl font-black text-white mt-0.5">Pregunta Diaria</h2>
            </div>
            <div className="text-right">
              <p className="text-orange-100 text-xs">Racha diaria</p>
              <p className="text-3xl font-black text-white">🔥 {streak}</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="px-6 py-12 text-center text-white/30 text-sm">Cargando...</div>
        ) : dailyDone ? (
          /* ── Ya completado hoy ── */
          <div className="px-6 sm:px-8 py-10 text-center">
            <p className="text-5xl mb-4">✅</p>
            <h3 className="text-xl font-black text-white mb-2">¡Ya lo hiciste hoy!</h3>
            <p className="text-white/40 text-sm mb-6">Vuelve mañana para un nuevo reto y seguir tu racha.</p>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4">
              <p className="text-amber-400 font-bold text-lg">🔥 {streak} {streak === 1 ? 'día' : 'días'} seguidos</p>
              <p className="text-white/30 text-xs mt-1">¡No rompas la racha!</p>
            </div>
          </div>
        ) : esMate ? (
          /* ── Reto de cálculo mental (mismo motor que Acércate, sin selección) ── */
          <>
            <div className="px-6 sm:px-8 py-6">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
                {desafio.modo.emoji} {desafio.modo.titulo} · {desafio.grado.label}
              </p>
              <CombinaNumeros
                ops={desafio.modo.ops}
                cfg={desafio.grado}
                nivelLabel={{ emoji: desafio.grado.emoji, label: desafio.grado.label }}
                onFinish={handleMathFinish}
              />
            </div>
            <div className="px-6 sm:px-8 pb-8">
              {!answered && !user && (
                <p className="text-center text-white/30 text-xs">
                  <button onClick={() => setShowAuth(true)} className="underline hover:text-white/60">Inicia sesión</button> para guardar tu racha
                </p>
              )}
              {answered && !user && (
                <button onClick={() => setShowAuth(true)} className="w-full bg-amber-500/20 border border-amber-500/30 text-amber-400 font-semibold py-2.5 rounded-xl text-sm hover:bg-amber-500/30 transition-colors">
                  Inicia sesión para guardar tu racha 🔥
                </button>
              )}
              <p className="text-center text-white/20 text-xs mt-4">Nuevo reto mañana · Vuelve cada día</p>
            </div>
          </>
        ) : (
          /* ── Pregunta de trivia ── */
          <>
            <div className="px-6 sm:px-8 py-6">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">{pregunta.categoria}</p>
              <h3 className="text-xl font-bold text-white leading-snug mb-6">{pregunta.pregunta}</h3>
              <div className="grid grid-cols-2 gap-3">
                {pregunta.opciones.map(op => (
                  <button
                    key={op}
                    onClick={() => !answered && setSelected(op)}
                    className={`py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all text-left
                      ${answered
                        ? op === correct
                          ? 'border-green-500 bg-green-500/20 text-green-400'
                          : op === selected && selected !== correct
                            ? 'border-red-500 bg-red-500/20 text-red-400'
                            : 'border-white/10 text-white/30'
                        : selected === op
                          ? 'border-violet-500 bg-violet-500/20 text-white'
                          : 'border-white/10 text-white/70 hover:border-violet-400 hover:bg-violet-500/10'
                      }`}
                  >
                    {op}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-6 sm:px-8 pb-8">
              {!answered ? (
                <>
                  <button
                    onClick={confirmar}
                    disabled={!selected}
                    className="w-full bg-violet-600 disabled:opacity-30 text-white font-bold py-3 rounded-xl hover:bg-violet-700 transition-colors disabled:cursor-not-allowed"
                  >
                    Confirmar respuesta →
                  </button>
                  {!user && (
                    <p className="text-center text-white/30 text-xs mt-3">
                      <button onClick={() => setShowAuth(true)} className="underline hover:text-white/60">Inicia sesión</button> para guardar tu racha
                    </p>
                  )}
                </>
              ) : (
                <>
                  <div className={`text-center py-3 rounded-xl font-bold mb-3 ${selected === correct ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {selected === correct ? '🎉 ¡Correcto!' : `❌ Era: ${correct}`}
                  </div>
                  {pregunta.explicacion && (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <p className="text-white/60 text-sm leading-relaxed">💡 {pregunta.explicacion}</p>
                    </div>
                  )}
                  {!user && (
                    <button onClick={() => setShowAuth(true)} className="mt-4 w-full bg-amber-500/20 border border-amber-500/30 text-amber-400 font-semibold py-2.5 rounded-xl text-sm hover:bg-amber-500/30 transition-colors">
                      Inicia sesión para guardar tu racha 🔥
                    </button>
                  )}
                </>
              )}
              <p className="text-center text-white/20 text-xs mt-4">Nueva pregunta mañana · Vuelve cada día</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
