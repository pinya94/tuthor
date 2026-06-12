import { useNavigate } from 'react-router-dom'
import Thumbnail from '../components/Thumbnail'
import { SUBJECTS } from '../data/constants'

export default function Nivel({ title, nivel }) {
  const navigate = useNavigate()

  function handleClick(sub) {
    if (!sub.ready) return
    navigate(`/estudiar/${nivel}/${sub.title.toLowerCase()}`)
  }

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <div className="text-center mb-6">
        <p className="text-white/40 text-sm mb-1">Estudiar · {title}</p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Elige una asignatura</h1>
        <p className="text-white/40 mt-1 text-sm">Selecciona la materia que quieres repasar</p>
      </div>
      <div className="overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto w-full pb-4">
          {SUBJECTS.map(sub => (
            <Thumbnail
              key={sub.title}
              title={sub.title}
              subtitle={sub.subtitle}
              emoji={sub.emoji}
              gradient={sub.gradient}
              comingSoon={!sub.ready}
              onClick={() => handleClick(sub)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
