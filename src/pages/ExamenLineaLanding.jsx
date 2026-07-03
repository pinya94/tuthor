import { useNavigate, useParams } from 'react-router-dom'

const CATEGORIAS = [
  {
    id: 'wwii',
    label: 'Segunda Guerra Mundial',
    emoji: '⚔️',
    gradient: 'from-red-600 to-rose-800',
    desc: '12 eventos · 1939–1945',
    niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'gce',
    label: 'Guerra Civil Española',
    emoji: '⚔️',
    gradient: 'from-orange-600 to-red-700',
    desc: '10 eventos · 1931–1978',
    niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'roma',
    label: 'Antigua Roma',
    emoji: '🏛️',
    gradient: 'from-amber-600 to-yellow-700',
    desc: '10 eventos · 753 a.C.–476 d.C.',
    niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'usa',
    label: 'Independencia Americana',
    emoji: '🦅',
    gradient: 'from-blue-600 to-indigo-700',
    desc: '8 eventos · 1773–1789',
    niveles: ['bachillerato'],
  },
]

export default function ExamenLineaLanding() {
  const navigate = useNavigate()
  const { nivel } = useParams()
  const title = nivel === 'eso' ? 'ESO' : 'Bachillerato'
  const base = `/estudiar/${nivel}/historia`

  const categorias = CATEGORIAS.filter(c => c.niveles.includes(nivel))

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <div className="text-center mb-8">
        <p className="text-white/40 text-sm mb-1">Estudiar · {title} · Historia · Línea del Tiempo</p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Elige el tema</h1>
        <p className="text-white/40 mt-1 text-sm">Ordena los eventos cronológicamente</p>
      </div>

      <div className="max-w-2xl mx-auto w-full space-y-3">
        {categorias.map(cat => (
          <button
            key={cat.id}
            onClick={() => navigate('/examen/linea-temporal', {
              state: { categoria: cat.id, nivel, backPath: `${base}/linea` }
            })}
            className="w-full group flex items-center gap-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/40 rounded-2xl p-5 transition-all text-left"
          >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-3xl shrink-0`}>
              {cat.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-black text-white text-lg leading-tight">{cat.label}</h3>
              <p className="text-white/40 text-sm mt-0.5">{cat.desc}</p>
            </div>
            <span className="text-white/20 group-hover:text-white/60 text-xl transition-colors shrink-0">→</span>
          </button>
        ))}
      </div>
    </div>
  )
}
