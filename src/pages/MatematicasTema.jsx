import { useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { MODOS, GRADOS, GRADO_IDS } from '../lib/mathEngine'

export default function MatematicasTema() {
  const navigate = useNavigate()
  const location = useLocation()
  const { modo: modoId } = useParams()
  const modo = MODOS[modoId]
  const [nivel, setNivel] = useState(location.state?.nivel || 'primaria')

  if (!modo) { navigate('/estudiar/matematicas'); return null }

  const grado = GRADOS[nivel]

  const juegos = [
    {
      id: 'examen',
      titulo: 'Examen de práctica',
      descripcion: '10 operaciones directas. Escribe el resultado exacto y descubre tu nota al final.',
      emoji: '📝',
      gradient: 'from-amber-500 to-orange-600',
      detalles: ['10 preguntas', 'Respuesta exacta', 'Nota final'],
      action: () => navigate(`/estudiar/matematicas/${modoId}/examen`, { state: { nivel } }),
    },
    {
      id: 'acercate',
      titulo: 'Acércate al número',
      descripcion: 'Combina los números con las operaciones permitidas hasta llegar exactamente al objetivo.',
      emoji: '🎯',
      gradient: 'from-pink-500 to-rose-600',
      detalles: [
        `Objetivo ${grado.objMin}-${grado.objMax}`,
        `${grado.count} números`,
        `${grado.tiempo}s`,
      ],
      action: () => navigate(`/estudiar/matematicas/${modoId}/jugar`, { state: { nivel } }),
    },
  ]

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">

      {/* Breadcrumb + nivel switcher */}
      <div className="max-w-2xl mx-auto w-full mb-6">
        <p className="text-white/30 text-xs mb-4">
          <button onClick={() => navigate('/estudiar/matematicas')} className="hover:text-white/60 transition-colors">Matemáticas</button>
          {' '}/{'  '}<span className="text-white/50">{modo.titulo}</span>
        </p>

        <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl w-fit">
          {GRADO_IDS.map(id => (
            <button
              key={id}
              onClick={() => setNivel(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                nivel === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'
              }`}
            >
              <span className="text-base">{GRADOS[id].emoji}</span>
              <span className="hidden sm:inline">{GRADOS[id].label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cabecera del tema */}
      <div className="max-w-2xl mx-auto w-full mb-6">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{modo.emoji}</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{modo.titulo}</h1>
            <p className="text-white/40 text-sm mt-0.5">Practica {modo.titulo.toLowerCase()} jugando, sin darte cuenta.</p>
          </div>
        </div>
      </div>

      {/* Juegos disponibles */}
      <div className="max-w-2xl mx-auto w-full space-y-4">
        <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">
          Modos disponibles · {grado.label}
        </p>

        {juegos.map(j => (
          <button
            key={j.id}
            onClick={j.action}
            className="w-full group relative rounded-2xl overflow-hidden text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/40"
          >
            <div className={`bg-gradient-to-br ${j.gradient} p-6`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">{j.emoji}</span>
                    <h3 className="font-black text-white text-xl">{j.titulo}</h3>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">{j.descripcion}</p>
                  <div className="flex flex-wrap gap-2">
                    {j.detalles.map(d => (
                      <span key={d} className="text-xs font-semibold bg-black/25 text-white/80 px-2.5 py-1 rounded-full border border-white/10">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
                    <span className="text-white font-black text-lg">→</span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
