import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NIVELES_FILTRO = [
  { id: 'todas',        label: 'Todas',        emoji: '📚' },
  { id: 'primaria',     label: 'Primaria',     emoji: '🎒' },
  { id: 'eso',          label: 'ESO',          emoji: '📖' },
  { id: 'bachillerato', label: 'Bachillerato', emoji: '🎓' },
]

const TEMAS = [
  {
    id: 'primaria',
    titulo: 'Grandes Hitos de la Historia',
    subtitulo: 'Los momentos que cambiaron el mundo',
    emoji: '🌍',
    tags: ['universal', 'básico', 'fácil'],
    eventos: 15,
    niveles: ['primaria'],
  },
  {
    id: 'gce',
    titulo: 'Guerra Civil Española',
    subtitulo: 'De la República al franquismo — 1931–1978',
    emoji: '🇪🇸',
    tags: ['españa', 'siglo xx', 'conflicto'],
    eventos: 10,
    niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'wwii',
    titulo: 'Segunda Guerra Mundial',
    subtitulo: 'El conflicto que cambió el mundo — 1939–1945',
    emoji: '⚔️',
    tags: ['universal', 'siglo xx', 'conflicto'],
    eventos: 12,
    niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'roma',
    titulo: 'Antigua Roma',
    subtitulo: 'De Rómulo a la caída del Imperio — 753 a.C.–476 d.C.',
    emoji: '🏛️',
    tags: ['antigua', 'europa', 'imperio'],
    eventos: 10,
    niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'usa',
    titulo: 'Independencia Americana',
    subtitulo: 'De las colonias a los Estados Unidos — 1773–1789',
    emoji: '🦅',
    tags: ['moderna', 'américas', 'democracia'],
    eventos: 8,
    niveles: ['bachillerato'],
  },
]

export default function HistoriaIndex() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [nivelFiltro, setNivelFiltro] = useState('todas')

  const filtrados = TEMAS.filter(t => {
    const matchQuery = !query.trim() || (
      t.titulo.toLowerCase().includes(query.toLowerCase()) ||
      t.subtitulo.toLowerCase().includes(query.toLowerCase()) ||
      t.tags.some(tag => tag.includes(query.toLowerCase()))
    )
    return matchQuery
  })

  function nivelAplicaATema(tema) {
    if (nivelFiltro === 'todas') return true
    return tema.niveles.includes(nivelFiltro)
  }

  function handleTemaClick(tema) {
    if (!nivelAplicaATema(tema)) return
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

      {/* Filtro de nivel */}
      <div className="max-w-2xl mx-auto w-full mb-5">
        <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl w-fit">
          {NIVELES_FILTRO.map(n => (
            <button
              key={n.id}
              onClick={() => setNivelFiltro(n.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                nivelFiltro === n.id
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              <span className="text-base">{n.emoji}</span>
              <span className="hidden sm:inline">{n.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Buscador */}
      <div className="max-w-2xl mx-auto w-full mb-6">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg">🔍</span>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar tema, época, país..."
            className="w-full bg-white/5 border border-white/10 focus:border-amber-500/60 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/25 outline-none transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors px-1"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Lista de temas */}
      <div className="max-w-2xl mx-auto w-full space-y-3">
        {filtrados.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-3xl mb-3">🔎</p>
            <p className="text-white/40 text-sm">No se encontraron temas para <span className="text-white/60">"{query}"</span></p>
            <button onClick={() => setQuery('')} className="mt-3 text-amber-400 text-sm hover:underline">Limpiar búsqueda</button>
          </div>
        ) : (
          filtrados.map(tema => {
            const disponible = nivelAplicaATema(tema)
            return (
              <button
                key={tema.id}
                onClick={() => handleTemaClick(tema)}
                disabled={!disponible}
                className={`w-full group flex items-center gap-4 border rounded-2xl p-5 transition-all text-left ${
                  disponible
                    ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-amber-500/40 cursor-pointer'
                    : 'bg-white/2 border-white/5 opacity-40 cursor-not-allowed'
                }`}
              >
                <span className="text-4xl shrink-0">{tema.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-white text-base sm:text-lg leading-tight">{tema.titulo}</h3>
                  <p className="text-white/40 text-sm mt-0.5 truncate">{tema.subtitulo}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-xs text-white/25">{tema.eventos} eventos</span>
                    {!disponible && nivelFiltro !== 'todas' && (
                      <span className="text-xs text-white/30 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                        No disponible en {NIVELES_FILTRO.find(n => n.id === nivelFiltro)?.label}
                      </span>
                    )}
                    {disponible && tema.tags.map(tag => (
                      <span key={tag} className="text-xs text-amber-400/70 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {disponible && (
                  <span className="text-white/20 group-hover:text-white/60 text-xl transition-colors shrink-0">→</span>
                )}
              </button>
            )
          })
        )}
      </div>

      {/* Pronto */}
      <div className="max-w-2xl mx-auto w-full mt-6">
        <p className="text-white/20 text-xs text-center">Más temas próximamente: Edad Media, Revolución Francesa, Historia de España contemporánea...</p>
      </div>
    </div>
  )
}
