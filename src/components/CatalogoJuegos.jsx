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
import { ESTADO_JUGAR } from '../lib/arranqueDirecto'
import ChipsPlegables from './ChipsPlegables'
import { ETAPAS, esDeEtapa } from '../data/cursosJuegos'

// La etapa elegida se recuerda en este navegador: un niño de Primaria no
// tiene por qué ver primero formulación química (revisión 20-nov).
const CLAVE_ETAPA = 'tuthor_etapa'
const etapaGuardada = () => { try { const e = localStorage.getItem(CLAVE_ETAPA); return ETAPAS.includes(e) ? e : 'todas' } catch { return 'todas' } }

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
  const [etapa, setEtapa] = useState(etapaGuardada)
  const juegos = juegosDelCatalogo(lang).filter(g => esDeEtapa(g.slug, etapa))
  const conJuegos = SUBJECT_DEFS.filter(s => juegos.some(g => g.materia === s.id))
  const eligeEtapa = e => {
    setEtapa(e)
    try { localStorage.setItem(CLAVE_ETAPA, e) } catch { /* sin almacenamiento: solo esta visita */ }
    // Si la materia elegida no tiene juegos en esa etapa, vuelta a todos
    if (materia !== 'todas' && !juegosDelCatalogo(lang).some(g => g.materia === materia && esDeEtapa(g.slug, e))) setMateria('todas')
    trackEvent('catalogo_etapa', { item_id: e })
  }
  const NOMBRE_ETAPA = {
    todas: tr({ es: 'Todos', en: 'All', ca: 'Tots' }),
    primaria: tr({ es: 'Primaria', en: 'Primary', ca: 'Primària' }),
    eso: tr({ es: 'ESO', en: 'Secondary', ca: 'ESO' }),
    bachillerato: tr({ es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' }),
  }
  // El destacado ya sale arriba: fuera de «los más jugados», pero sí en su materia
  const visibles = materia === 'todas' ? juegos.filter(g => g.slug !== excluir) : juegos.filter(g => g.materia === materia)
  const chip = activo => `shrink-0 px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors ${activo ? 'bg-white text-black border-white' : 'bg-white/[0.05] text-white/75 border-white/10 hover:bg-white/[0.12]'}`

  return (
    <section className={className}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-white/45 text-sm font-semibold shrink-0">{tr({ es: 'Curso:', en: 'Level:', ca: 'Curs:' })}</span>
        <div role="radiogroup" aria-label={tr({ es: 'Curso', en: 'Level', ca: 'Curs' })} className="inline-flex rounded-full bg-white/[0.06] border border-white/10 p-0.5 min-w-0">
          {['todas', ...ETAPAS].map(e => (
            <button key={e} type="button" role="radio" aria-checked={etapa === e} onClick={() => eligeEtapa(e)}
              className={`px-2.5 sm:px-3.5 py-1 rounded-full text-[13px] sm:text-sm font-bold transition-colors whitespace-nowrap ${etapa === e ? 'bg-amber-400 text-slate-900' : 'text-white/70 hover:text-white'}`}>
              {NOMBRE_ETAPA[e]}
            </button>
          ))}
        </div>
      </div>
      <ChipsPlegables activo={materia} claseChip={chip}
        items={[{ id: 'todas', label: `🔥 ${tr({ es: 'Los más jugados', en: 'Most played', ca: 'Els més jugats' })}` },
          ...conJuegos.map(s => ({ id: s.id, label: `${s.emoji} ${s.label[lang] ?? s.label.es}` }))]}
        onElige={id => { setMateria(id); if (id !== 'todas') trackEvent('catalogo_materia', { item_id: id }) }} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-3">
        {visibles.map(g => (
          <Thumbnail key={g.path} title={lt(g)} subtitle={lt(g, 'subtitle')} emoji={g.emoji} gradient={g.gradient}
            slug={g.slug} to={localPath(g.path)} state={ESTADO_JUGAR} />
        ))}
      </div>
    </section>
  )
}
