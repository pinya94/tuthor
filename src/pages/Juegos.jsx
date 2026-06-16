import { useNavigate } from 'react-router-dom'
import Thumbnail from '../components/Thumbnail'
import { GAMES } from '../data/constants'

export default function Juegos() {
  const navigate = useNavigate()

  function handleClick(game) {
    if (!game.ready) return
    if (game.path) navigate(game.path)
    else if (game.url) window.open(game.url, '_blank')
  }

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-white">Aprende sin darte cuenta</h1>
        <p className="text-white/40 mt-1 text-sm">Juegos educativos para repasar mientras te diviertes</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto w-full pb-4">
          {[...GAMES].sort((a, b) => (b.ready ? 1 : 0) - (a.ready ? 1 : 0)).map(game => (
            <Thumbnail
              key={game.title}
              title={game.title}
              subtitle={game.subtitle}
              emoji={game.emoji}
              gradient={game.gradient}
              comingSoon={!game.ready}
              onClick={() => handleClick(game)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
