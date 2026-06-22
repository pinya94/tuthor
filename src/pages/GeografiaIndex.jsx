import { useNavigate } from 'react-router-dom'

const TEMAS = [
  { id: 'europa',  titulo: 'Europa',          emoji: '🇪🇺', desc: 'De Islandia a Chipre. Identifica los países europeos.' },
  { id: 'america', titulo: 'América',         emoji: '🌎', desc: 'Del Canadá a la Patagonia. Países americanos.' },
  { id: 'asia',    titulo: 'Asia',            emoji: '🌏', desc: 'El continente más grande. De Japón a Turquía.' },
  { id: 'africa',  titulo: 'África',          emoji: '🌍', desc: 'De Marruecos a Sudáfrica. El continente más diverso.' },
  { id: 'oceania', titulo: 'Oceanía',         emoji: '🏝️', desc: 'Australia, Nueva Zelanda y las islas del Pacífico.' },
  { id: 'espana',  titulo: 'España',          emoji: '🇪🇸', desc: 'Las comunidades autónomas y provincias españolas.', proximamente: true },
  { id: 'eeuu',    titulo: 'Estados Unidos',  emoji: '🇺🇸', desc: 'Los 50 estados americanos.', proximamente: true },
]

export default function GeografiaIndex() {
  const navigate = useNavigate()

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <div className="max-w-2xl mx-auto w-full">
        <p className="text-white/30 text-xs mb-4">
          <button onClick={() => navigate('/estudiar')} className="hover:text-white/60 transition-colors">Estudiar</button>
          {' '}/{' '}<span className="text-white/50">Geografía</span>
        </p>

        <div className="flex items-center gap-4 mb-8">
          <span className="text-5xl">🌍</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">Geografía</h1>
            <p className="text-white/40 text-sm mt-0.5">Elige una región y descubre los modos de juego disponibles</p>
          </div>
        </div>

        <div className="space-y-3">
          {TEMAS.map(t => (
            <button
              key={t.id}
              onClick={() => !t.proximamente && navigate(`/estudiar/geografia/${t.id}`)}
              className={`w-full group relative rounded-2xl overflow-hidden text-left transition-all duration-300 ${
                t.proximamente ? 'opacity-50 cursor-default' : 'hover:scale-[1.02] hover:shadow-xl hover:shadow-black/40'
              }`}
            >
              <div className="bg-gradient-to-br from-teal-600 to-cyan-800 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-4xl">{t.emoji}</span>
                    <div>
                      <h3 className="font-black text-white text-lg">{t.titulo}</h3>
                      <p className="text-white/60 text-sm mt-0.5">{t.desc}</p>
                    </div>
                  </div>
                  {t.proximamente ? (
                    <span className="text-xs font-bold text-white/30 border border-white/15 px-2 py-0.5 rounded-full shrink-0">Pronto</span>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors shrink-0">
                      <span className="text-white font-black text-lg">→</span>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
