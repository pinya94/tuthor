import { useState } from 'react'
import { useLang } from '../context/LangContext'

const NIVELES_FILTRO = {
  es: [
    { id: 'todas',        label: 'Todas',        emoji: '📚' },
    { id: 'primaria',     label: 'Primaria',     emoji: '🎒' },
    { id: 'eso',          label: 'ESO',          emoji: '📖' },
    { id: 'bachillerato', label: 'Bachillerato', emoji: '🎓' },
  ],
  en: [
    { id: 'todas',        label: 'All',          emoji: '📚' },
    { id: 'primaria',     label: 'Primary',      emoji: '🎒' },
    { id: 'eso',          label: 'Secondary',    emoji: '📖' },
    { id: 'bachillerato', label: 'Sixth Form',   emoji: '🎓' },
  ],
}

export default function TemarioGrid({ items, onSelect, placeholder = 'Buscar...' }) {
  const { lang } = useLang()
  const en = lang === 'en'
  const niveles = NIVELES_FILTRO[lang] || NIVELES_FILTRO.es
  const [query, setQuery]       = useState('')
  const [nivelFiltro, setNivel] = useState('todas')

  function disponible(item) {
    if (item.ready === false) return false
    if (nivelFiltro === 'todas' || !item.niveles) return true
    return item.niveles.includes(nivelFiltro)
  }

  const filtrados = items.filter(item => {
    if (!query.trim()) return true
    const q = query.toLowerCase()
    return item.titulo.toLowerCase().includes(q) ||
      item.subtitulo?.toLowerCase().includes(q) ||
      (item.tags || []).some(t => t.toLowerCase().includes(q))
  })

  return (
    <>
      <div className="max-w-3xl mx-auto w-full mb-5">
        <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl w-fit">
          {niveles.map(n => (
            <button
              key={n.id}
              onClick={() => setNivel(n.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                nivelFiltro === n.id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'
              }`}
            >
              <span className="text-base">{n.emoji}</span>
              <span className="hidden sm:inline">{n.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full mb-6">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg">🔍</span>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={placeholder}
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

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto w-full">
        {filtrados.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-3xl mb-3">🔎</p>
            <p className="text-white/40 text-sm">{en ? 'No results found for' : 'No se encontraron resultados para'} <span className="text-white/60">"{query}"</span></p>
            <button onClick={() => setQuery('')} className="mt-3 text-amber-400 text-sm hover:underline">{en ? 'Clear search' : 'Limpiar búsqueda'}</button>
          </div>
        ) : (
          filtrados.map(item => {
            const disp = disponible(item)
            return (
              <button
                key={item.id}
                disabled={!disp}
                onClick={() => disp && onSelect(item, nivelFiltro)}
                className={`group relative rounded-2xl overflow-hidden text-left transition-all duration-300 ${
                  disp ? 'hover:scale-[1.03] hover:shadow-xl hover:shadow-black/40 cursor-pointer' : 'opacity-40 cursor-not-allowed'
                }`}
              >
                <div className={`bg-gradient-to-br ${item.gradient} p-5 aspect-square flex flex-col justify-between`}>
                  {!disp && (
                    <span className="absolute top-2 right-2 bg-black/40 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {item.ready === false ? (en ? 'Soon' : 'Pronto') : (en ? 'Not available' : 'No disponible')}
                    </span>
                  )}
                  <span className="text-4xl">{item.emoji}</span>
                  <div>
                    <h3 className="font-black text-white text-base leading-tight">{item.titulo}</h3>
                    {item.subtitulo && <p className="text-white/65 text-xs mt-1 leading-relaxed line-clamp-2">{item.subtitulo}</p>}
                  </div>
                </div>
              </button>
            )
          })
        )}
      </div>
    </>
  )
}
