import { useNavigate } from 'react-router-dom'
import HeroCard from '../components/HeroCard'
import { MAIN_CARDS } from '../data/constants'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-5 gap-4">
      {/* Título */}
      <div className="text-center">
        <h1 className="text-2xl font-black text-white">¿Qué quieres hacer hoy?</h1>
        <p className="text-white/40 mt-0.5 text-sm">Elige una sección y empieza ahora</p>
      </div>

      {/* Cards principales */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ minHeight: '280px' }}>
        {MAIN_CARDS.map(card => (
          <div key={card.id} className="min-h-[220px] sm:min-h-0">
            <HeroCard
              card={card}
              onClick={() => navigate(card.path)}
            />
          </div>
        ))}
      </div>

      {/* Banner progreso */}
      <div className="space-y-2">
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm opacity-50">
          <div className="flex items-center justify-between px-5 py-2.5 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="text-lg">📊</span>
              <div>
                <p className="font-bold text-white text-sm">Trackea tu progreso</p>
                <p className="text-white/40 text-xs">Rachas, puntos y ranking personal</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">Próximamente</span>
              <div className="bg-white/10 text-white/40 text-xs font-semibold px-4 py-2 rounded-lg cursor-not-allowed">
                🔒 Iniciar sesión
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-dashed border-white/10 bg-white/5 h-10 flex items-center justify-center">
          <span className="text-xs text-white/20 font-medium tracking-widest uppercase">Espacio publicitario</span>
        </div>
      </div>
    </div>
  )
}
