// Una ronda de La Receta Química. En las de reacción, la ecuación ajustada en
// fichas (coeficiente en grande: es la «receta») con el dato debajo de su
// sustancia y un «?» bajo la que se busca; al corregir se rellena. En la del
// reactivo limitante, al corregir se marca cuál se acaba y cuál sobra. En las
// de un solo compuesto, la fórmula en grande y, al corregir, sus átomos.
import { useLang } from '../../context/LangContext'
import { enunciado, textoOpcion, explicacion, reaccion, COMPUESTOS, MASA_ATOMICA, num } from '../../lib/recetaQuimica'

function Ficha({ coef, id, abajo, color = 'border-white/15', nota }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`rounded-xl border-2 ${color} bg-white/[0.05] px-2 py-1.5 text-center min-w-[3.2rem]`}>
        <span className="text-amber-300 font-black text-lg mr-0.5">{coef > 1 ? coef : ''}</span>
        <span className="text-white font-black text-lg">{COMPUESTOS[id].f}</span>
      </div>
      {abajo && <span className="text-[13px] font-black tabular-nums">{abajo}</span>}
      {nota && <span className="text-[10px] font-bold">{nota}</span>}
    </div>
  )
}

function Ecuacion({ r, revelado, l, tr }) {
  const rx = reaccion(r)
  const debajo = id => {
    if (r.tipo === 'limitante') return r.cantidades[id] != null ? <span className="text-white">{r.cantidades[id]} mol</span> : null
    if (id === r.dato) return <span className="text-white">{r.tipo === 'masa' ? `${num(r.gA, l)} g` : `${num(r.nA, l)} mol`}</span>
    if (id === r.pide) return <span className={revelado ? 'text-green-300' : 'text-amber-300'}>{revelado ? textoOpcion(r.bueno, r, l) : '?'}</span>
    return null
  }
  const marca = id => {
    if (r.tipo !== 'limitante' || !revelado || r.cantidades[id] == null) return {}
    if (r.bueno === 'ninguno') return { color: 'border-green-400', nota: <span className="text-green-300">{tr({ es: 'justo', en: 'exact', ca: 'just' })}</span> }
    return id === r.bueno
      ? { color: 'border-red-400', nota: <span className="text-red-300">{tr({ es: 'se acaba', en: 'runs out', ca: 's’acaba' })}</span> }
      : { color: 'border-sky-400', nota: <span className="text-sky-300">{tr({ es: 'sobra', en: 'left over', ca: 'sobra' })}</span> }
  }
  const lado = sp => sp.flatMap(([c, id], i) => [
    i ? <span key={`+${id}`} className="text-white/40 font-black self-start mt-2">+</span> : null,
    <Ficha key={id} coef={c} id={id} abajo={debajo(id)} {...marca(id)} color={marca(id).color ?? (id === r.pide && !revelado ? 'border-amber-300 border-dashed' : id === r.pide ? 'border-green-400' : 'border-white/15')} />,
  ])
  return (
    <div className="flex flex-wrap items-start justify-center gap-1.5">
      {lado(rx.r)}
      <span className="text-white/50 font-black text-xl self-start mt-1.5 mx-0.5">→</span>
      {lado(rx.p)}
    </div>
  )
}

function Compuesto({ r, revelado, l }) {
  const c = COMPUESTOS[r.compuesto]
  return (
    <div className="text-center">
      <p className="text-white font-black text-5xl tracking-wide">{c.f}</p>
      {r.tipo === 'moles' && <p className="text-white/70 font-bold mt-2">{num(r.g, l)} g</p>}
      {r.tipo === 'avogadro' && <p className="text-white/70 font-bold mt-2">{num(r.n, l)} mol</p>}
      {revelado && r.tipo === 'masaMolar' && (
        <div className="flex flex-wrap justify-center gap-1.5 mt-3">
          {Object.entries(c.c).map(([el, k]) => (
            <span key={el} className="rounded-lg bg-white/10 px-2 py-1 text-xs font-bold text-white">
              {el}: {k > 1 ? `${k} · ` : ''}{MASA_ATOMICA[el]} = {k * MASA_ATOMICA[el]}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function PreguntaReceta({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const conEcuacion = !!r.reaccion
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-2 py-4 mb-3">
        {conEcuacion ? <Ecuacion r={r} revelado={revelado} l={l} tr={tr} /> : <Compuesto r={r} revelado={revelado} l={l} />}
      </div>
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      <div className={`grid gap-2 ${r.opciones.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2'}`}>
        {r.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-3 px-2 rounded-xl border text-white text-[15px] font-bold tabular-nums leading-snug transition-all ${clase(o)}`}>
            {textoOpcion(o, r, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
