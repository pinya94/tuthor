// Una ronda de Nombra el compuesto: el nombre o la fórmula, la pregunta y
// las opciones (fórmulas con subíndices de verdad). Al corregir, en los
// compuestos de metal se dibuja el cruce de valencias: Fe³⁺ y O²⁻ se
// intercambian los números y sale Fe₂O₃. La usan el juego y el examen.
import { useLang } from '../../context/LangContext'
import { ANIONES, enunciado, textoOpcion, explicacion, dato, esFormula } from '../../lib/formulacion'

// «Fe2(SO4)3» → Fe₂(SO₄)₃ con <sub> de verdad.
export function Formula({ f, className = '' }) {
  const partes = f.split(/(\d+)/).filter(Boolean)
  return (
    <span className={`font-mono tracking-tight ${className}`}>
      {partes.map((p, i) => (/^\d+$/.test(p) ? <sub key={i} className="text-[0.62em]">{p}</sub> : <span key={i}>{p}</span>))}
    </span>
  )
}

const SUP = { 1: '', 2: '²', 3: '³', 4: '⁴' }

function CruceValencias({ c }) {
  const ca = ANIONES[c.anion].c
  return (
    <div className="flex items-center justify-center gap-3 mt-2">
      <div className="text-center">
        <p className="text-sky-300 font-black text-2xl font-mono">{c.metal}<sup className="text-sm">{SUP[c.v]}+</sup></p>
      </div>
      <svg viewBox="0 0 60 34" className="w-14 h-8 shrink-0" aria-hidden="true">
        <path d="M6 4L54 30M54 4L6 30" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M54 30l-8 -1l4 -6Z M6 30l4 -6l4 6Z" fill="#FBBF24" />
      </svg>
      <div className="text-center">
        <p className="text-pink-300 font-black text-2xl font-mono">{c.anion === 'OH' ? '(OH)' : c.anion}<sup className="text-sm">{SUP[ca]}−</sup></p>
      </div>
      <span className="text-white/40 font-black">→</span>
      <Formula f={c.f} className="text-green-300 font-black text-2xl" />
    </div>
  )
}

export default function PreguntaFormula({ ronda, revelado, elegida, onResponder }) {
  const { lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const d = dato(r, l)
  const opFormula = esFormula(r)
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  const conCruce = revelado && r.comp && !r.comp.nm && r.tipo !== 'tipo'
  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-5 mb-3 text-center">
        {d.formula
          ? <Formula f={d.formula} className="text-white font-black text-4xl" />
          : <p className="text-white font-black text-2xl leading-tight first-letter:uppercase">{d.nombre}</p>}
        {conCruce && <CruceValencias c={r.comp} />}
      </div>
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      <div className={`grid gap-2 ${opFormula ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {r.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-2.5 px-3 rounded-xl border text-white font-bold transition-all ${opFormula ? 'text-xl' : 'text-sm'} ${clase(o)}`}>
            {opFormula ? <Formula f={o} /> : textoOpcion(o, r, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
