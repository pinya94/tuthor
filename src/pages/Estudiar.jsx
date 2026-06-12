import { useNavigate } from 'react-router-dom'

const MATERIAS = [
  { id: 'historia', titulo: 'Historia', subtitulo: 'Eventos, épocas y personajes clave', emoji: '🏛️', gradient: 'from-amber-500 to-orange-600', ready: true, path: '/estudiar/historia' },
  { id: 'geografia', titulo: 'Geografía', subtitulo: 'Mapas, ríos y capitales del mundo', emoji: '🌍', gradient: 'from-teal-500 to-cyan-600', ready: false },
  { id: 'ciencias', titulo: 'Ciencias', subtitulo: 'Biología, física y química', emoji: '🔬', gradient: 'from-green-500 to-emerald-600', ready: false },
  { id: 'matematicas', titulo: 'Matemáticas', subtitulo: 'Álgebra, geometría y cálculo', emoji: '📐', gradient: 'from-blue-500 to-indigo-600', ready: false },
  { id: 'ingles', titulo: 'Inglés', subtitulo: 'Vocabulario y gramática', emoji: '🇬🇧', gradient: 'from-rose-500 to-pink-600', ready: false },
  { id: 'lengua', titulo: 'Lengua', subtitulo: 'Literatura y ortografía', emoji: '✍️', gradient: 'from-violet-500 to-purple-600', ready: false },
]

export default function Estudiar() {
  const navigate = useNavigate()
  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-white">¿Qué quieres estudiar?</h1>
        <p className="text-white/40 mt-1 text-sm">Elige una materia para empezar</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto w-full">
        {MATERIAS.map(m => (
          <button
            key={m.id}
            onClick={() => m.ready && navigate(m.path)}
            className={`group relative rounded-2xl overflow-hidden text-left transition-all duration-300 ${
              m.ready ? 'hover:scale-[1.03] hover:shadow-xl hover:shadow-black/40 cursor-pointer' : 'opacity-50 cursor-default'
            }`}
          >
            <div className={`bg-gradient-to-br ${m.gradient} p-5 h-full`}>
              {!m.ready && (
                <span className="absolute top-2 right-2 bg-black/40 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Pronto
                </span>
              )}
              <span className="text-4xl block mb-2">{m.emoji}</span>
              <h3 className="font-black text-white text-base leading-tight">{m.titulo}</h3>
              <p className="text-white/65 text-xs mt-1 leading-relaxed">{m.subtitulo}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
