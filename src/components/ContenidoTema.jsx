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

// Una celda de tabla: texto igual en todos los idiomas (material en castellano)
// o un objeto {es, en, ca}.
const celda = (x, L) => (typeof x === 'string' ? x : x[L] ?? x.es)

// Bloque de contenido propio (resumen + puntos clave) de una página de estudio
// por tema. Devuelve null si el tema no tiene contenido, así que se puede
// colocar sin condiciones en cualquier página de tema (ciencias, geografía,
// historia). La misma fuente alimenta el prerender (seoMeta.mjs).
// Opcionales: `secciones` [{ titulo, texto?, tabla?: { columnas, filas }, lista? }]
// y `preguntas` [{ p, r }] — para los temas que la gente busca en Google y
// necesitan algo más que un resumen (tablas, ejemplos, dudas frecuentes).
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
      {c.secciones?.map((sec, i) => (
        <section key={i}>
          <h2 className="text-white font-black text-lg sm:text-xl mt-7 mb-3">{pick(sec.titulo)}</h2>
          {sec.texto && <div className="space-y-3 mb-3">{pick(sec.texto).map((t, j) => <p key={j} className="text-white/70 text-[15px] leading-relaxed">{t}</p>)}</div>}
          {sec.tabla && (
            <div className="overflow-x-auto -mx-1 mb-3">
              <table className="w-full text-left text-[13.5px] border-collapse">
                <thead>
                  <tr>{pick(sec.tabla.columnas).map((h, j) => <th key={j} className="text-amber-300 font-bold px-2 py-1.5 border-b border-white/15 align-bottom">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {sec.tabla.filas.map((fila, j) => (
                    <tr key={j} className="border-b border-white/[0.07]">
                      {fila.map((x, k) => <td key={k} className={`px-2 py-1.5 align-top ${k === 0 ? 'text-white font-semibold' : 'text-white/75'}`}>{celda(x, L)}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {sec.lista && (
            <ul className="space-y-2 mb-3">
              {pick(sec.lista).map((t, j) => (
                <li key={j} className="flex items-start gap-2.5 text-white/70 text-[15px] leading-relaxed">
                  <span className="text-amber-400 shrink-0 mt-0.5" aria-hidden="true">▸</span><span>{t}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
      {c.preguntas && (
        <section>
          <h2 className="text-white font-black text-lg sm:text-xl mt-7 mb-3">{L === 'ca' ? 'Preguntes freqüents' : L === 'en' ? 'Frequently asked questions' : 'Preguntas frecuentes'}</h2>
          <div className="space-y-4">
            {c.preguntas.map((q, i) => (
              <div key={i}>
                <h3 className="text-white font-bold text-[15px] mb-1">{pick(q.p)}</h3>
                <p className="text-white/70 text-[15px] leading-relaxed">{pick(q.r)}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
