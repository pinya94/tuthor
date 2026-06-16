import { useNavigate } from 'react-router-dom'
import TemarioGrid from '../components/TemarioGrid'

const TEMAS = [
  {
    id: 'primaria',
    titulo: 'Grandes Hitos de la Historia',
    subtitulo: 'Los momentos que cambiaron el mundo',
    emoji: '🌍',
    gradient: 'from-emerald-500 to-teal-700',
    tags: ['universal', 'básico', 'fácil'],
    niveles: ['primaria'],
  },
  {
    id: 'gce',
    titulo: 'Guerra Civil Española',
    subtitulo: 'De la República al franquismo — 1931–1978',
    emoji: '🇪🇸',
    gradient: 'from-red-600 to-rose-800',
    tags: ['españa', 'siglo xx', 'conflicto'],
    niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'wwii',
    titulo: 'Segunda Guerra Mundial',
    subtitulo: 'El conflicto que cambió el mundo — 1939–1945',
    emoji: '⚔️',
    gradient: 'from-slate-600 to-zinc-800',
    tags: ['universal', 'siglo xx', 'conflicto'],
    niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'roma',
    titulo: 'Antigua Roma',
    subtitulo: 'De Rómulo a la caída del Imperio — 753 a.C.–476 d.C.',
    emoji: '🏛️',
    gradient: 'from-amber-600 to-orange-800',
    tags: ['antigua', 'europa', 'imperio'],
    niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'usa',
    titulo: 'Independencia Americana',
    subtitulo: 'De las colonias a los Estados Unidos — 1773–1789',
    emoji: '🦅',
    gradient: 'from-blue-600 to-indigo-800',
    tags: ['moderna', 'américas', 'democracia'],
    niveles: ['bachillerato'],
  },
]

export default function HistoriaIndex() {
  const navigate = useNavigate()

  function handleSelect(tema, nivelFiltro) {
    const nivelInicial = nivelFiltro === 'todas' ? undefined : nivelFiltro
    navigate(`/estudiar/historia/${tema.id}`, { state: nivelInicial ? { nivel: nivelInicial } : undefined })
  }

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <div className="text-center mb-6">
        <p className="text-white/40 text-sm mb-1">Estudiar · Historia</p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Elige un tema</h1>
        <p className="text-white/40 mt-1 text-sm">Selecciona qué período quieres repasar</p>
      </div>

      <TemarioGrid items={TEMAS} onSelect={handleSelect} placeholder="Buscar tema, época, país..." />

      <div className="max-w-3xl mx-auto w-full mt-6">
        <p className="text-white/20 text-xs text-center">Más temas próximamente: Edad Media, Revolución Francesa, Historia de España contemporánea...</p>
      </div>
    </div>
  )
}
