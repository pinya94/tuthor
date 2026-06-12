import { useNavigate } from 'react-router-dom'
import Thumbnail from '../components/Thumbnail'
import { LEVELS } from '../data/constants'

export default function Estudiar() {
  const navigate = useNavigate()
  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-white">Elige tu nivel y empieza a repasar</h1>
        <p className="text-white/40 mt-1 text-sm">Tests y temarios organizados por etapa educativa</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto w-full">
        {LEVELS.map(level => (
          <Thumbnail
            key={level.title}
            title={level.title}
            subtitle={level.subtitle}
            emoji={level.emoji}
            gradient={level.gradient}
            onClick={() => navigate(level.path)}
          />
        ))}
      </div>
    </div>
  )
}
