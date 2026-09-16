import { useState } from 'react'
import { useLang } from '../context/LangContext'
import NivelPicker from './NivelPicker'
import { useNivel, coincideNivel } from '../lib/nivel'

// El filtro por nivel ya NO es estado local de esta rejilla. Antes cada hub
// tenía el suyo, arrancaba en "Todas" y se olvidaba al navegar: el alumno
// volvía a ver los tres niveles mezclados en cada materia y en cada visita.
// Ahora sale del curso del alumno (src/lib/nivel.js), que se pregunta una
// vez y vale para todo el sitio.
//
// Lo que NO cambia: un tema de otro curso se sigue viendo, en gris. Esconderlo
// dejaría a alguien sin saber que existe, y el objetivo es justo el contrario
// — que se vea todo lo que hay, con lo suyo destacado.

export default function TemarioGrid({ items, onSelect, placeholder = 'Buscar...', groups = null }) {
  const { tr } = useLang()
  const [query, setQuery] = useState('')
  const nivel = useNivel()

  function disponible(item) {
    if (item.ready === false) return false
    return coincideNivel(item, nivel)
  }

  const filtrados = items.filter(item => {
    if (!query.trim()) return true
    const q = query.toLowerCase()
    return item.titulo.toLowerCase().includes(q) ||
      item.subtitulo?.toLowerCase().includes(q) ||
      (item.tags || []).some(t => t.toLowerCase().includes(q))
  })

  function renderCard(item) {
    // Dos estados distintos que antes se pintaban igual y decían lo mismo
    // ("No disponible"):
    //
    //   · sinHacer  — el tema no existe todavía. No se puede abrir.
    //   · otroCurso — el tema existe, pero no es del curso elegido. SÍ se
    //     puede abrir: el curso ordena, no prohíbe. Un alumno de ESO que
    //     quiere repasar algo de Primaria, o mirar por encima algo de
    //     Bachillerato, tiene todo el derecho — y "No disponible" le decía
    //     que estaba roto.
    const sinHacer = item.ready === false
    const otroCurso = !sinHacer && !disponible(item)
    const apagado = sinHacer || otroCurso
    return (
      <button
        key={item.id}
        disabled={sinHacer}
        onClick={() => !sinHacer && onSelect(item, nivel)}
        className={`group relative rounded-2xl overflow-hidden text-left transition-all duration-300 ${
          sinHacer
            ? 'opacity-40 cursor-not-allowed'
            : otroCurso
              ? 'opacity-45 hover:opacity-90 hover:scale-[1.03] cursor-pointer'
              : 'hover:scale-[1.03] hover:shadow-xl hover:shadow-black/40 cursor-pointer'
        }`}
      >
        <div className={`bg-gradient-to-br ${item.gradient} p-5 aspect-square flex flex-col justify-between`}>
          {apagado && (
            <span className="absolute top-2 right-2 bg-black/40 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {sinHacer
                ? tr({ es: 'Pronto', en: 'Soon', ca: 'Aviat' })
                : tr({ es: 'Otro curso', en: 'Another year', ca: 'Un altre curs' })}
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
  }

  const sinResultados = (
    <div className="col-span-full text-center py-12">
      <p className="text-3xl mb-3">🔎</p>
      <p className="text-white/40 text-sm">{tr({ es: 'No se encontraron resultados para', en: 'No results found for', ca: "No s'han trobat resultats per a" })} <span className="text-white/60">"{query}"</span></p>
      <button onClick={() => setQuery('')} className="mt-3 text-amber-400 text-sm hover:underline">{tr({ es: 'Limpiar búsqueda', en: 'Clear search', ca: 'Netejar cerca' })}</button>
    </div>
  )

  return (
    <>
      <div className="max-w-3xl mx-auto w-full mb-5">
        <NivelPicker variant="inline" />
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

      {/* Modo agrupado por disciplina (opcional): una sección por grupo, cada
          una con su cabecera; los grupos sin resultados tras filtrar se ocultan.
          El filtro por nivel se aplica dentro del grupo mediante el orden real
          (Todas primero). Si no hay `groups`, rejilla plana como siempre. */}
      {groups ? (
        filtrados.length === 0 ? (
          <div className="max-w-3xl mx-auto w-full">{sinResultados}</div>
        ) : (
          <div className="max-w-3xl mx-auto w-full space-y-8">
            {groups.map(g => {
              const delGrupo = filtrados.filter(i => i.disciplina === g.id)
              if (delGrupo.length === 0) return null
              return (
                <section key={g.id}>
                  <h2 className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest font-bold mb-3">
                    <span className="text-base">{g.emoji}</span>{tr(g.label)}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {delGrupo.map(renderCard)}
                  </div>
                </section>
              )
            })}
          </div>
        )
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto w-full">
          {filtrados.length === 0 ? sinResultados : filtrados.map(renderCard)}
        </div>
      )}
    </>
  )
}
