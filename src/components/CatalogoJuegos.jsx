// La cuadrícula de juegos de la portada y de /juegos: chips por materia y
// todos los juegos con su dibujo, primero los más jugados (data/destacados).
// Es lo principal de Tuthor desde nov-2026: entras y juegas, sin explicaciones.
import { useState } from 'react'
import Thumbnail from './Thumbnail'
import { slugDeRuta } from './arte'
import { GAMES as CATALOGO } from '../data/constants'
import { GAMES as REGISTRO, disponibleEn } from '../lib/games'
import { SUBJECT_DEFS } from '../lib/statsAggregation'
import { MAS_JUGADOS } from '../data/destacados'
import { useLang } from '../context/LangContext'
import { trackEvent } from '../lib/analytics'

// Materia de cada juego del catálogo, por su ruta (el registro manda)
const MATERIA_POR_RUTA = {}
for (const g of Object.values(REGISTRO)) if (g.route && !MATERIA_POR_RUTA[g.route]) MATERIA_POR_RUTA[g.route] = g.subject

export function juegosDelCatalogo(lang) {
  const rango = slug => { const i = MAS_JUGADOS.indexOf(slug); return i < 0 ? 999 : i }
  return CATALOGO
    .filter(g => g.ready && g.path && disponibleEn(slugDeRuta(g.path), lang))
    .map(g => ({ ...g, slug: slugDeRuta(g.path), materia: MATERIA_POR_RUTA[g.path] ?? 'otros' }))
    .sort((a, b) => rango(a.slug) - rango(b.slug))
}

export default function CatalogoJuegos({ excluir = null, className = '' }) {
  const { lang, lt, tr, localPath } = useLang()
  const [materia, setMateria] = useState('todas')
  const juegos = juegosDelCatalogo(lang)
  const conJuegos = SUBJECT_DEFS.filter(s => juegos.some(g => g.materia === s.id))
  // El destacado ya sale arriba: fuera de «los más jugados», pero sí en su materia
  const visibles = materia === 'todas' ? juegos.filter(g => g.slug !== excluir) : juegos.filter(g => g.materia === materia)
  const chip = activo => `shrink-0 px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors ${activo ? 'bg-white text-black border-white' : 'bg-white/[0.05] text-white/75 border-white/10 hover:bg-white/[0.12]'}`

  return (
    <section className={className}>
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap" role="tablist">
        <button type="button" className={chip(materia === 'todas')} onClick={() => setMateria('todas')}>
          🔥 {tr({ es: 'Los más jugados', en: 'Most played', ca: 'Els més jugats' })}
        </button>
        {conJuegos.map(s => (
          <button key={s.id} type="button" className={chip(materia === s.id)}
            onClick={() => { setMateria(s.id); trackEvent('catalogo_materia', { item_id: s.id }) }}>
            {s.emoji} {s.label[lang] ?? s.label.es}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-3">
        {visibles.map(g => (
          <Thumbnail key={g.path} title={lt(g)} subtitle={lt(g, 'subtitle')} emoji={g.emoji} gradient={g.gradient}
            slug={g.slug} to={localPath(g.path)} />
        ))}
      </div>
    </section>
  )
}
