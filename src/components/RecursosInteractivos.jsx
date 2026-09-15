import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { RECURSOS_INTERACTIVOS } from '../lib/recursosInteractivos'

// Tarjetas de los recursos interactivos (lib/recursosInteractivos.js). La
// misma pieza en /clase, en la pestaña Recursos del profesor, en /recursos, en
// Estudiar y en el hub de cada materia.
//   · `compacto`  — una tarjeta por fila, para columnas estrechas (/clase).
//   · `materia`   — solo los recursos de esa materia (id de /estudiar/<id>). Si
//     no hay ninguno no se pinta nada, así un hub sin recursos no enseña un
//     hueco con título.
//   · `tipo`      — solo 'resolver' o solo 'explorar' (los bloques de /recursos).
//   · `destacado` — la tarjeta grande de /recursos: fondo opaco (el bosque
//     animado de la app se comía el texto de las translúcidas), icono en un
//     cuadro de color, una línea de texto y un botón que dice qué pasa.

// Clases completas y no construidas con el color: Tailwind solo genera las
// que encuentra escritas tal cual en el código.
const ACENTO = {
  funciones:       { icono: 'bg-sky-500/15 ring-sky-400/30',         boton: 'bg-sky-600 group-hover:bg-sky-500',         borde: 'hover:border-sky-400/50' },
  ecuaciones:      { icono: 'bg-emerald-500/15 ring-emerald-400/30', boton: 'bg-emerald-600 group-hover:bg-emerald-500', borde: 'hover:border-emerald-400/50' },
  estadistica:     { icono: 'bg-amber-500/15 ring-amber-400/30',     boton: 'bg-amber-600 group-hover:bg-amber-500',     borde: 'hover:border-amber-400/50' },
  'sistema-solar': { icono: 'bg-violet-500/15 ring-violet-400/30',   boton: 'bg-violet-600 group-hover:bg-violet-500',   borde: 'hover:border-violet-400/50' },
  globo:           { icono: 'bg-teal-500/15 ring-teal-400/30',       boton: 'bg-teal-600 group-hover:bg-teal-500',       borde: 'hover:border-teal-400/50' },
}
const ACENTO_DEFECTO = { icono: 'bg-white/10 ring-white/20', boton: 'bg-sky-600 group-hover:bg-sky-500', borde: 'hover:border-white/30' }

export default function RecursosInteractivos({ compacto = false, materia = null, tipo = null, destacado = false }) {
  const { tr, localPath } = useLang()
  const lista = RECURSOS_INTERACTIVOS
    .filter(r => !materia || r.materias?.includes(materia))
    .filter(r => !tipo || r.tipo === tipo)
  if (!lista.length) return null

  if (destacado) {
    return (
      <div className={`grid gap-4 grid-cols-1 sm:grid-cols-2 ${lista.length > 2 ? 'lg:grid-cols-3' : ''}`}>
        {lista.map(r => {
          const a = ACENTO[r.id] ?? ACENTO_DEFECTO
          return (
            <Link key={r.id} to={localPath(r.path)}
              className={`group flex flex-col rounded-2xl border border-white/10 bg-[#111827] p-5 shadow-lg shadow-black/30 transition-colors ${a.borde}`}>
              <div className="flex items-center gap-3.5">
                <span className={`w-14 h-14 shrink-0 rounded-2xl ring-1 grid place-items-center text-3xl ${a.icono}`} aria-hidden="true">{r.emoji}</span>
                <div className="min-w-0">
                  <p className="text-white/50 text-[11px] uppercase tracking-wider font-bold">{tr(r.materia)}</p>
                  <h3 className="text-white font-black text-[17px] leading-snug">{tr(r.titulo)}</h3>
                </div>
              </div>
              <p className="text-white/75 text-[14.5px] leading-relaxed mt-4 flex-1">{tr(r.corto ?? r.desc)}</p>
              {r.etiquetas?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {r.etiquetas.map(e => (
                    <span key={e.es} className="text-[11.5px] font-semibold text-white/70 bg-white/[0.07] border border-white/10 rounded-full px-2.5 py-0.5">{tr(e)}</span>
                  ))}
                </div>
              )}
              <span className={`mt-5 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-white font-bold text-sm transition-colors ${a.boton}`}>
                {tr(r.accion ?? { es: 'Abrir', en: 'Open', ca: 'Obrir' })}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          )
        })}
      </div>
    )
  }

  return (
    <div className={`grid gap-3 ${compacto ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
      {lista.map(r => (
        <Link key={r.id} to={localPath(r.path)}
          className="group block rounded-2xl border border-sky-500/25 bg-sky-500/[0.06] px-4 py-4 hover:bg-sky-500/10 hover:border-sky-400/40 transition-colors">
          <p className="text-white/35 text-[10.5px] uppercase tracking-wider font-bold mb-1">{tr(r.materia)}</p>
          <p className="text-white font-black text-[15px] mb-1">
            {r.emoji} {tr(r.titulo)}
            <span className="text-sky-300/60 group-hover:text-sky-300 ml-1.5 transition-colors">→</span>
          </p>
          <p className="text-white/50 text-[13px] leading-relaxed">{tr(r.desc)}</p>
        </Link>
      ))}
    </div>
  )
}
