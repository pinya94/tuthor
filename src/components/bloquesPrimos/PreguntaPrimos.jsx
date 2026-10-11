// Una ronda de Bloques Primos: el enunciado, los números como filas de bloques
// (un bloque por factor primo, alineados por columnas de primo) y las
// opciones. Al corregir se marcan los bloques que forman el mcd (los que
// tienen todos los números) o el mcm (de cada primo, la fila más larga) y
// aparece la fila del resultado. La usan el juego (contra reloj) y el examen.
import { useLang } from '../../context/LangContext'
import { enunciado, textoOpcion, explicacion, columnas, colorPrimo, factoriza, escribe, num } from '../../lib/bloquesPrimos'

function Bloque({ p, apagado, marcado }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-7 h-7 rounded-md text-white font-black text-[12.5px] tabular-nums shadow-sm transition-all duration-300 ${apagado ? 'opacity-25' : ''} ${marcado ? 'ring-2 ring-white ring-offset-1 ring-offset-[#0b1226]' : ''}`}
      style={{ background: colorPrimo(p) }}>
      {p}
    </span>
  )
}
const Hueco = () => <span className="inline-block w-7 h-7 rounded-md border border-dashed border-white/10" />

// Una fila: el número y sus bloques, columna a columna (cada columna reserva
// el máximo de bloques de ese primo para que las filas queden alineadas).
function Fila({ etiqueta, cols, exps, marca, oculta }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-14 shrink-0 text-right text-white font-black tabular-nums text-[15px]">{etiqueta}</span>
      <span className="text-white/30 font-bold">=</span>
      {oculta ? (
        <span className="text-amber-300/80 font-black text-lg tracking-widest">? ? ?</span>
      ) : (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {cols.map((c, j) => (
            <span key={c.p} className="flex gap-0.5">
              {Array.from({ length: c.max }, (_, k) => (k < exps[j]
                ? <Bloque key={k} p={c.p} marcado={marca?.(j, k)} apagado={marca && !marca(j, k)} />
                : <Hueco key={k} />))}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function PreguntaPrimos({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const sigla = r.op === 'mcd' ? tr({ es: 'mcd', en: 'HCF', ca: 'mcd' }) : tr({ es: 'mcm', en: 'LCM', ca: 'mcm' })

  let dibujo = null
  if (r.nums) {
    const cols = columnas(r.nums)
    const mostrar = revelado || (r.conBloques && r.tipo !== 'problema')
    // mcd: en cada columna, los bloques que tienen todas las filas.
    // mcm: en cada columna, los de la fila más larga (la primera si empatan).
    const marca = !revelado ? null : i => (j, k) => (r.op === 'mcd'
      ? k < cols[j].min
      : i === cols[j].exps.indexOf(cols[j].max) && k < cols[j].max)
    const res = cols.map(c => (r.op === 'mcd' ? c.min : c.max))
    dibujo = (
      <div className="flex flex-col items-start gap-1.5 w-fit mx-auto">
        {r.nums.map((n, i) => (
          <Fila key={n} etiqueta={num(n, l)} cols={cols} exps={cols.map(c => c.exps[i])} marca={marca?.(i)} oculta={!mostrar} />
        ))}
        {revelado && (
          <div className="pt-1.5 mt-0.5 border-t border-white/10 w-full">
            <Fila etiqueta={sigla} cols={cols} exps={res} />
          </div>
        )}
      </div>
    )
  } else if (r.tipo === 'descomp') {
    const n = r.n
    const cols = columnas([n])
    dibujo = (
      <div className="flex flex-col items-center gap-2">
        {revelado
          ? <Fila etiqueta={num(n, l)} cols={cols} exps={cols.map(c => c.exps[0])} />
          : <p className="text-white font-black text-4xl tabular-nums">{num(n, l)}</p>}
      </div>
    )
  }

  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }

  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      {dibujo && (
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-4 mb-3 overflow-x-auto">
          {dibujo}
          {revelado && r.nums && (
            <p className="text-center text-white/60 text-xs mt-3">
              {sigla} = {escribe(factoriza(r.bueno))} = <b className="text-white">{num(r.bueno, l)}</b>
            </p>
          )}
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        {r.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-3 px-2 rounded-xl border text-white font-bold tabular-nums transition-all ${r.tipo === 'descomp' ? 'text-[15px]' : 'text-base'} ${clase(o)}`}>
            {textoOpcion(o, r, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
