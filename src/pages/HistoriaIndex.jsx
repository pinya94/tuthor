import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import TemarioGrid from '../components/TemarioGrid'

const TEMAS = [
  {
    id: 'primaria',
    titulo: 'Grandes Hitos de la Historia', tituloEn: 'Great Milestones of History',
    subtitulo: 'Los momentos que cambiaron el mundo', subtituloEn: 'The moments that changed the world',
    emoji: '🌍', gradient: 'from-emerald-500 to-teal-700',
    tags: ['universal', 'básico', 'fácil'], niveles: ['primaria'],
  },
  {
    id: 'gce',
    titulo: 'Guerra Civil Española', tituloEn: 'Spanish Civil War',
    subtitulo: 'De la República al franquismo — 1931–1978', subtituloEn: 'From the Republic to Franco — 1931–1978',
    emoji: '🇪🇸', gradient: 'from-red-600 to-rose-800',
    tags: ['españa', 'siglo xx', 'conflicto'], niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'wwii',
    titulo: 'Segunda Guerra Mundial', tituloEn: 'World War II',
    subtitulo: 'El conflicto que cambió el mundo — 1939–1945', subtituloEn: 'The conflict that changed the world — 1939–1945',
    emoji: '⚔️', gradient: 'from-slate-600 to-zinc-800',
    tags: ['universal', 'siglo xx', 'conflicto'], niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'roma',
    titulo: 'Antigua Roma', tituloEn: 'Ancient Rome',
    subtitulo: 'De Rómulo a la caída del Imperio — 753 a.C.–476 d.C.', subtituloEn: 'From Romulus to the fall of the Empire — 753 BC–476 AD',
    emoji: '🏛️', gradient: 'from-amber-600 to-orange-800',
    tags: ['antigua', 'europa', 'imperio'], niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'usa',
    titulo: 'Independencia Americana', tituloEn: 'American Independence',
    subtitulo: 'De las colonias a los Estados Unidos — 1773–1789', subtituloEn: 'From the colonies to the United States — 1773–1789',
    emoji: '🦅', gradient: 'from-blue-600 to-indigo-800',
    tags: ['moderna', 'américas', 'democracia'], niveles: ['bachillerato'],
  },
]

export default function HistoriaIndex() {
  const navigate = useNavigate()
  const { lang, localPath, lt } = useLang()

  const temas = TEMAS.map(t => ({ ...t, titulo: lt(t, 'titulo'), subtitulo: lt(t, 'subtitulo') }))

  function handleSelect(tema) {
    navigate(localPath(`/estudiar/historia/${tema.id}`))
  }

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <div className="text-center mb-6">
        <p className="text-white/40 text-sm mb-1">{lang === 'en' ? 'Study · History' : 'Estudiar · Historia'}</p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">{lang === 'en' ? 'Pick a topic' : 'Elige un tema'}</h1>
        <p className="text-white/40 mt-1 text-sm">{lang === 'en' ? 'Select the period you want to revise' : 'Selecciona qué período quieres repasar'}</p>
      </div>

      <TemarioGrid items={temas} onSelect={handleSelect} placeholder={lang === 'en' ? 'Search topic, era, country...' : 'Buscar tema, época, país...'} />

      <div className="max-w-3xl mx-auto w-full mt-6">
        <p className="text-white/20 text-xs text-center">{lang === 'en' ? 'More topics coming soon: Middle Ages, French Revolution, Modern Spanish History...' : 'Más temas próximamente: Edad Media, Revolución Francesa, Historia de España contemporánea...'}</p>
      </div>
    </div>
  )
}
