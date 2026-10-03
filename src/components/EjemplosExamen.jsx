// «Cómo es este examen»: lo que ve quien llega a /examen/<id> ANTES de elegir
// nivel. Sin esto, las ~90 páginas de ExamenMC servían al buscador unos 350
// caracteres casi idénticos (título + «Selecciona un nivel» + el aviso de
// cookies): exactamente la «plantilla sin contenido» por la que AdSense marca
// el sitio como de poco valor (memoria «adsense-contenido-poco-valor»).
//
// Las preguntas de ejemplo salen del propio banco, así que el texto es único en
// cada URL y es el que el alumno se va a encontrar. Se eligen de forma FIJA
// (repartidas por el banco, no al azar) para que cada build publique lo mismo
// en la misma URL. La respuesta va dentro de <details>: está en el HTML para
// quien lo lea sin JavaScript, pero el alumno decide si mirarla.
import { useLang } from '../context/LangContext'

const get = (o, lang) => (o == null || typeof o === 'string' ? o : (o[lang] ?? o.es))
const textoCorrecta = (q, lang) =>
  (typeof q.correcta === 'number' ? get(q.opciones, lang)?.[q.correcta] : get(q.correcta, lang))

// Primera, central y última del banco sin repetir: suelen caer en niveles y
// subtemas distintos, porque los bancos van ordenados por nivel.
export function elegirEjemplos(preguntas, n = 3) {
  if (preguntas.length <= n) return preguntas
  const idx = Array.from({ length: n }, (_, i) => Math.round((i * (preguntas.length - 1)) / (n - 1)))
  return [...new Set(idx)].map(i => preguntas[i])
}

export default function EjemplosExamen({ niveles, preguntas, titulo }) {
  const { tr, lang } = useLang()
  const ejemplos = elegirEjemplos(preguntas)
  if (!ejemplos.length) return null
  const resumenNiveles = niveles.map(n => `${n.label} (${n.total})`).join(', ')
  return (
    <section className="w-full max-w-md mt-10 text-left">
      <h2 className="text-white font-bold text-lg mb-2">{tr({ es: 'Cómo es este examen', en: 'What this exam is like', ca: 'Com és aquest examen' })}</h2>
      <p className="text-white/55 text-sm leading-relaxed mb-5">
        {tr({
          es: `El examen de ${titulo} tiene ${preguntas.length} preguntas tipo test repartidas en estos niveles: ${resumenNiveles}. Cada partida saca 10 al azar del nivel que elijas. Tienes dos intentos por pregunta, y después de cada una se explica la respuesta. Al final ves tu nota.`,
          en: `The ${titulo} exam has ${preguntas.length} multiple-choice questions across these levels: ${resumenNiveles}. Each attempt draws 10 at random from the level you choose. You get two tries per question, and each answer is explained afterwards. At the end you see your grade.`,
          ca: `L’examen de ${titulo} té ${preguntas.length} preguntes tipus test repartides en aquests nivells: ${resumenNiveles}. Cada partida en treu 10 a l’atzar del nivell que triïs. Tens dos intents per pregunta, i després de cadascuna s’explica la resposta. Al final veus la teva nota.`,
        })}
      </p>
      <h3 className="text-white/40 text-xs uppercase tracking-widest mb-3">{tr({ es: 'Preguntas de ejemplo', en: 'Sample questions', ca: 'Preguntes d’exemple' })}</h3>
      <ol className="space-y-3">
        {ejemplos.map((q, i) => {
          const opciones = [...(get(q.opciones, lang) ?? [])].sort((a, b) => String(a).localeCompare(String(b), lang))
          const explicacion = get(q.explicacion, lang)
          return (
            <li key={q.id ?? i} className="rounded-2xl bg-[#141b2e] border border-white/[0.08] p-4">
              <p className="text-white font-semibold text-sm mb-2">{i + 1}. {get(q.pregunta, lang)}</p>
              <ul className="text-white/60 text-sm space-y-1 mb-2 list-disc pl-5">
                {opciones.map(o => <li key={o}>{o}</li>)}
              </ul>
              <details className="text-sm">
                <summary className="cursor-pointer text-[#EDAE49] font-semibold select-none">{tr({ es: 'Ver la respuesta', en: 'Show the answer', ca: 'Veure la resposta' })}</summary>
                <p className="text-green-400 font-semibold mt-2">✅ {textoCorrecta(q, lang)}</p>
                {explicacion && <p className="text-white/60 leading-relaxed mt-1">{explicacion}</p>}
              </details>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
