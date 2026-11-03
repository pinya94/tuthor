// Una ronda de Cuentas Claras (ver lib/cuentasClaras):
//   presupuesto  tocar un gasto y luego su caja
//   regla        teclear las tres partes del sueldo
//   interes, inflacion, deuda   teclear el resultado
//   ordena       tocar los planes de más a menos dinero (tocar uno puesto lo quita)
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { GASTOS, CAJAS, enunciado, explicacion, vale, euros, ordenBueno, textoPlan, finalPlan, respuesta, tx } from '../../lib/cuentasClaras'

const CAMPO = 'rounded-xl border-2 bg-white/5 px-3 py-2 text-center font-black text-lg outline-none'
const COMPROBAR = 'w-full rounded-xl bg-amber-400 hover:bg-amber-300 py-2.5 text-black font-black disabled:opacity-40'
const comprobar = tr => tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })

function Presupuesto({ r, revelado, onResponder, l, tr }) {
  const [puestas, setPuestas] = useState({})
  const [activo, setActivo] = useState(0)
  const coloca = c => {
    if (revelado || activo === null) return
    const n = { ...puestas, [activo]: c }
    setPuestas(n)
    const sig = r.gastos.findIndex((_, i) => n[i] === undefined)
    setActivo(sig >= 0 ? sig : null)
    if (sig < 0) onResponder(`presupuesto:${r.gastos.filter((g, i) => n[i] !== GASTOS[g].caja).length}`)
  }
  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-3 min-h-[2.75rem]">
        {r.gastos.map((g, i) => puestas[i] === undefined && (
          <button key={i} type="button" onClick={() => setActivo(i)} className={`rounded-xl px-3 py-2 text-white text-sm font-bold ${activo === i ? 'bg-emerald-600 ring-2 ring-amber-300' : 'bg-white/10'}`}>{tx(GASTOS[g].nombre, l)}</button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {Object.keys(CAJAS).map(c => (
          <button key={c} type="button" disabled={revelado || activo === null} onClick={() => coloca(c)} className="rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] px-1.5 py-2 min-h-[6rem] text-left">
            <span className="block text-white text-[13px] font-black text-center">{tx(CAJAS[c], l)}</span>
            <span className="flex flex-col gap-1 mt-1">
              {r.gastos.map((g, i) => puestas[i] === c && (
                <span key={i} className={`rounded-md px-1 py-0.5 text-[11px] leading-tight text-white bg-white/10 ${revelado ? (GASTOS[g].caja === c ? 'ring-2 ring-green-400' : 'ring-2 ring-red-400') : ''}`}>{tx(GASTOS[g].nombre, l)}</span>
              ))}
            </span>
          </button>
        ))}
      </div>
      {!revelado && <p className="text-center text-xs text-white/40 mt-3">{tr({ es: 'Toca un gasto y luego su caja', en: 'Tap an expense and then its box', ca: 'Toca una despesa i després la seva caixa' })}</p>}
    </>
  )
}

function Campo({ valor, setValor, ok, revelado, autoFocus, sufijo, l }) {
  const euro = sufijo === '€'
  return (
    <span className="inline-flex items-center gap-1.5">
      {euro && l === 'en' && <span className="text-white/60 font-black">€</span>}
      <input value={valor} onChange={e => setValor(e.target.value)} disabled={revelado} inputMode="decimal" autoFocus={autoFocus} autoComplete="off"
        className={`${CAMPO} w-[7.5rem] ${revelado ? (ok ? 'border-green-400 text-green-300' : 'border-red-400 text-red-300') : 'border-emerald-400/60 text-white focus:border-amber-300'}`} />
      {(!euro || l !== 'en') && <span className="text-white/60 font-black">{sufijo}</span>}
    </span>
  )
}

function Regla({ r, revelado, onResponder, l, tr }) {
  const [v, setV] = useState({ necesidad: '', deseo: '', ahorro: '' })
  const listo = Object.values(v).every(x => x.trim())
  const envia = e => { e.preventDefault(); if (!revelado && listo) onResponder(Object.keys(v).every(k => vale(r, v[k], k)) ? 'regla:ok' : 'regla:mal') }
  const pct = { necesidad: 50, deseo: 30, ahorro: 20 }
  return (
    <form onSubmit={envia} className="space-y-2">
      {Object.keys(CAJAS).map((k, i) => (
        <div key={k} className="flex items-center justify-between gap-2 rounded-xl bg-white/[0.05] px-3 py-2">
          <span className="text-white font-bold text-sm">{tx(CAJAS[k], l)} <span className="text-white/40">({pct[k]} %)</span></span>
          <span className="text-right">
            <Campo valor={v[k]} setValor={x => setV(o => ({ ...o, [k]: x }))} ok={vale(r, v[k], k)} revelado={revelado} autoFocus={i === 0} sufijo="€" l={l} />
            {revelado && !vale(r, v[k], k) && <span className="block text-green-300 text-sm font-black">{euros(r.partes[k], l)}</span>}
          </span>
        </div>
      ))}
      {!revelado && <button type="submit" disabled={!listo} className={COMPROBAR}>{comprobar(tr)}</button>}
    </form>
  )
}

function Teclea({ r, revelado, onResponder, l, tr }) {
  const [v, setV] = useState('')
  const envia = e => { e.preventDefault(); if (!revelado && v.trim()) onResponder(`${r.tipo}:${vale(r, v) ? 'ok' : 'mal'}`) }
  const pagos = r.tipo === 'deuda'
  return (
    <form onSubmit={envia}>
      <div className="flex flex-col items-center mb-3">
        <Campo valor={v} setValor={setV} ok={vale(r, v)} revelado={revelado} autoFocus sufijo={pagos ? tr({ es: 'pagos', en: 'payments', ca: 'pagaments' }) : '€'} l={l} />
        {revelado && !vale(r, v) && <span className="text-green-300 text-sm font-black mt-1">{pagos ? r.pagos : euros(respuesta(r), l)}</span>}
        {!pagos && !revelado && <span className="text-white/40 text-xs mt-1">{tr({ es: 'En euros, sin céntimos (redondea)', en: 'In euros, no cents (round it)', ca: 'En euros, sense cèntims (arrodoneix)' })}</span>}
      </div>
      {!revelado && <button type="submit" disabled={!v.trim()} className={COMPROBAR}>{comprobar(tr)}</button>}
    </form>
  )
}

function Ordena({ r, revelado, onResponder, l, tr }) {
  const [orden, setOrden] = useState([])
  const bueno = ordenBueno(r)
  const toca = i => {
    if (revelado) return
    if (orden.includes(i)) { setOrden(o => o.filter(x => x !== i)); return }
    const n = [...orden, i]
    setOrden(n)
    if (n.length === r.planes.length) onResponder(n.every((x, k) => x === bueno[k]) ? 'ordena:ok' : 'ordena:mal')
  }
  return (
    <>
      <div className="space-y-2">
        {r.planes.map((p, i) => {
          const pos = orden.indexOf(i)
          const ok = revelado && bueno[pos] === i
          return (
            <button key={i} type="button" onClick={() => toca(i)} className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left border-2 ${revelado ? (ok ? 'border-green-400' : 'border-red-400') : pos >= 0 ? 'border-emerald-400 bg-emerald-500/10' : 'border-white/10 bg-white/[0.05]'}`}>
              <span className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center font-black ${pos >= 0 ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/30'}`}>{pos >= 0 ? pos + 1 : '·'}</span>
              <span className="text-white text-sm font-bold flex-1">{textoPlan(p, l)}</span>
              {revelado && <span className="text-white/70 text-xs font-black">{euros(finalPlan(p, r.anios), l)}<span className="block text-green-300">#{bueno.indexOf(i) + 1}</span></span>}
            </button>
          )
        })}
      </div>
      {!revelado && <p className="text-center text-xs text-white/40 mt-3">{tr({ es: 'Toca primero el que más dinero da; toca uno puesto para quitarlo', en: 'Tap the one that gives most money first; tap a numbered one to remove it', ca: 'Toca primer el que dona més diners; toca’n un de posat per treure’l' })}</p>}
    </>
  )
}

export default function PreguntaCuentas({ ronda, revelado, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const props = { r: ronda, revelado, onResponder, tr, l }
  const Cuerpo = { presupuesto: Presupuesto, regla: Regla, ordena: Ordena }[ronda.tipo] ?? Teclea
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(ronda, l)}</p>
      <Cuerpo {...props} />
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
