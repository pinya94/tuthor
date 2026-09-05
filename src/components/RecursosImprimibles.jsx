import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useLang } from '../context/LangContext'
import { FICHAS_ES, FICHAS_EN, FICHAS_CA } from '../data/infoJuegosFichas'

// Fichas para imprimir: la actividad "en papel" que CADA juego ya tenía
// escrita (enPapel + alternativas en infoJuegosFichas.js) pero que solo se
// veía en la ficha pública de SEO /info/juegos/:slug — es decir, en el sitio
// donde el profesor no entra nunca. Aquí no se inventa contenido: se saca el
// que ya existe (36 juegos × es/en/ca) y se le da un sitio fijo en el panel.
//
// Por qué en el panel y no como pestaña del aula: la barra del aula ya lleva
// 7 módulos y fue justo lo que hubo que arreglar para que no se escondieran.
// Además una ficha en papel no es de una clase concreta —es del catálogo—,
// así que colgarla de /profesor/clase/:id sería mentir sobre a qué pertenece.
//
// La impresión reutiliza .imprimir-solo-esto / .no-imprimir (src/index.css),
// las mismas dos clases que ya usa el boletín de familias: sin librería de
// PDF, window.print() deja "Guardar como PDF" en cualquier navegador.

const FICHAS_POR_LANG = { es: FICHAS_ES, en: FICHAS_EN, ca: FICHAS_CA }

// La hoja que se imprime. Blanca y negra a propósito: se va a un papel de
// verdad, así que ni fondo oscuro ni degradados que se coman el tóner.
function Hoja({ ficha, tr }) {
  return (
    <div className="imprimir-solo-esto bg-white text-black rounded-2xl p-6 sm:p-8 print:rounded-none print:p-0">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40 mb-1">
        {ficha.asignatura} · {ficha.niveles}
      </p>
      <h1 className="text-2xl font-black leading-tight mb-1">{ficha.enPapel.titulo}</h1>
      <p className="text-black/50 text-sm mb-6">
        {tr({ es: 'Versión en papel de', en: 'Paper version of', ca: 'Versió en paper de' })} {ficha.emoji} {ficha.titulo}
      </p>

      <ol className="space-y-3 mb-7">
        {ficha.enPapel.pasos.map((p, i) => (
          <li key={i} className="flex gap-3">
            <span className="w-6 h-6 shrink-0 rounded-full border-2 border-black/70 font-black text-[12px] flex items-center justify-center">
              {i + 1}
            </span>
            <p className="text-[14px] leading-relaxed pt-0.5">{p}</p>
          </li>
        ))}
      </ol>

      {ficha.alternativas?.length > 0 && (
        <>
          <h2 className="text-sm font-black uppercase tracking-wider text-black/50 border-t border-black/15 pt-4 mb-3">
            {tr({ es: 'Para ampliar', en: 'To go further', ca: 'Per ampliar' })}
          </h2>
          <ul className="space-y-2">
            {ficha.alternativas.map(a => (
              <li key={a.nombre} className="text-[13px] leading-relaxed">
                <span className="font-bold">{a.nombre}.</span> <span className="text-black/70">{a.desc}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      <p className="text-[10px] text-black/35 mt-8 pt-3 border-t border-black/10">tuthor.es</p>
    </div>
  )
}

export default function RecursosImprimibles() {
  const { lang, tr } = useLang()
  const [abierta, setAbierta] = useState(null) // slug de la ficha abierta
  const [filtro, setFiltro] = useState('todas')

  const fichas = FICHAS_POR_LANG[lang] ?? FICHAS_ES
  // Solo las que tienen actividad en papel: hoy son todas, pero una ficha
  // nueva sin enPapel no debe colarse como una hoja en blanco.
  const conPapel = Object.entries(fichas).filter(([, f]) => f.enPapel?.pasos?.length > 0)
  const asignaturas = [...new Set(conPapel.map(([, f]) => f.asignatura))].sort()
  const visibles = conPapel.filter(([, f]) => filtro === 'todas' || f.asignatura === filtro)

  const ficha = abierta && fichas[abierta]

  return (
    <>
      <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <h2 className="text-white font-black text-[15px] mb-0.5">
          🖨️ {tr({ es: 'Fichas para imprimir', en: 'Printable worksheets', ca: 'Fitxes per imprimir' })}
        </h2>
        <p className="text-white/40 text-[12px] leading-snug mb-3">
          {tr({
            es: `${conPapel.length} actividades en papel, listas para el aula sin pantallas.`,
            en: `${conPapel.length} paper activities, ready for a screen-free class.`,
            ca: `${conPapel.length} activitats en paper, llestes per a l'aula sense pantalles.`,
          })}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {[{ id: 'todas', label: tr({ es: 'Todas', en: 'All', ca: 'Totes' }) }, ...asignaturas.map(a => ({ id: a, label: a }))].map(a => (
            <button key={a.id} type="button" onClick={() => setFiltro(a.id)}
              className={`text-[11px] font-bold px-2 py-1 rounded-lg border transition-colors ${
                filtro === a.id ? 'bg-white/15 border-white/25 text-white' : 'border-white/10 text-white/40 hover:text-white/70'
              }`}>
              {a.label}
            </button>
          ))}
        </div>

        <div className="space-y-1 max-h-[360px] overflow-y-auto pr-0.5">
          {visibles.map(([slug, f]) => (
            <button key={slug} type="button" onClick={() => setAbierta(slug)}
              className="w-full flex items-center gap-2.5 text-left px-2.5 py-2 rounded-xl border border-white/[0.07] hover:border-teal-500/40 hover:bg-white/5 transition-colors">
              <span className="text-base shrink-0">{f.emoji}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-white text-[12.5px] font-semibold truncate">{f.titulo}</span>
                <span className="block text-white/35 text-[10.5px] truncate">{f.enPapel.titulo}</span>
              </span>
              <span className="text-white/20 text-[11px] shrink-0">🖨️</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Portal a <body> a propósito: este panel vive dentro del envoltorio
          `relative z-10` del panel del profesor, que es un contexto de
          apilamiento — cualquier z-index de aquí dentro sigue quedando por
          debajo de la navbar (z-50), que está fuera. Es el mismo gotcha que
          ya está documentado en App.jsx para los raíles. */}
      {ficha && createPortal(
        <div className="fixed inset-0 z-[90] overflow-y-auto bg-black/75 backdrop-blur-sm p-4 sm:p-8">
          <div className="mx-auto w-full max-w-2xl">
            <div className="no-imprimir flex items-center justify-between gap-3 mb-3">
              <button type="button" onClick={() => setAbierta(null)}
                className="text-white/60 hover:text-white text-[13px] font-bold transition-colors">
                ← {tr({ es: 'Volver', en: 'Back', ca: 'Tornar' })}
              </button>
              <button type="button" onClick={() => window.print()}
                className="text-[12.5px] font-bold px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-colors">
                🖨️ {tr({ es: 'Imprimir', en: 'Print', ca: 'Imprimir' })}
              </button>
            </div>
            <Hoja ficha={ficha} tr={tr} />
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
