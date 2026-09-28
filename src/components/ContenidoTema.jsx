import { CONTENIDO_TEMA } from '../data/estudioTemaContenido'

const norm = lang => (lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es')

// title/description de un tema con contenido propio, o null. Lo usan las
// páginas de estudio para su PageMeta; el prerender resuelve lo mismo en
// scripts/seoMeta.mjs a partir del mismo CONTENIDO_TEMA.
export function contenidoMeta(tema, lang) {
  const c = CONTENIDO_TEMA[tema]
  if (!c) return null
  const L = norm(lang)
  return { title: c.metaTitle[L] || c.metaTitle.es, desc: c.metaDesc[L] || c.metaDesc.es }
}

// Bloque de contenido propio (resumen + puntos clave) de una página de estudio
// por tema. Devuelve null si el tema no tiene contenido, así que se puede
// colocar sin condiciones en cualquier página de tema (ciencias, geografía,
// historia). La misma fuente alimenta el prerender (seoMeta.mjs).
export default function ContenidoTema({ tema, lang = 'es', className = '' }) {
  const c = CONTENIDO_TEMA[tema]
  if (!c) return null
  const L = norm(lang)
  const pick = obj => obj[L] ?? obj.es
  const tResumen = L === 'ca' ? 'Resum' : L === 'en' ? 'Summary' : 'Resumen'
  const tPuntos = L === 'ca' ? 'Punts clau' : L === 'en' ? 'Key points' : 'Puntos clave'

  return (
    <article className={`max-w-2xl mx-auto w-full mb-8 rounded-2xl border border-white/10 bg-black/20 p-5 sm:p-7 ${className}`}>
      <h2 className="text-white font-black text-lg sm:text-xl mb-3">{tResumen}</h2>
      <div className="space-y-3">
        {pick(c.resumen).map((p, i) => (
          <p key={i} className="text-white/70 text-[15px] leading-relaxed">{p}</p>
        ))}
      </div>
      <h2 className="text-white font-black text-lg sm:text-xl mt-6 mb-3">{tPuntos}</h2>
      <ul className="space-y-2">
        {pick(c.puntosClave).map((punto, i) => (
          <li key={i} className="flex items-start gap-2.5 text-white/70 text-[15px] leading-relaxed">
            <span className="text-amber-400 shrink-0 mt-0.5" aria-hidden="true">▸</span>
            <span>{punto}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}
