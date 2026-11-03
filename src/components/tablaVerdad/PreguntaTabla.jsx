// Una ronda de Tabla de Verdad (ver lib/tablaVerdad):
//   tabla      tocar cada casilla de la columna de la fórmula (vacía → V → F)
//   formaliza  montar la fórmula con fichas; ⌫ borra la última
//   clasifica  tocar una fórmula y luego su caja
//   argumento  tocar un argumento y luego su caja (válido / no válido o regla)
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import {
  texto, variables, filas, columna, clase, lee, equivalentes, fraseDe, textoFrase, leyenda, lineasArgumento,
  cajaArgumento, enunciado, explicacion, CLASES, REGLAS, VALIDEZ, VF, tx,
} from '../../lib/tablaVerdad'

const FORMULA = 'font-mono font-black tracking-wide'
const CAJA = 'rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] px-2 py-2 min-h-[4.2rem] text-left'

function Tabla({ r, revelado, onResponder, l, tr }) {
  const vars = variables(r.formula)
  const fs = filas(vars)
  const buena = columna(r.formula, vars)
  const [V, F] = VF(l)
  const [marcas, setMarcas] = useState(() => fs.map(() => null))
  const toca = i => { if (!revelado) setMarcas(m => m.map((x, k) => (k === i ? x !== true : x))) }
  const listo = marcas.every(x => x !== null)
  const letra = b => (b ? V : F)
  return (
    <>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] overflow-hidden mb-3">
        <table className="w-full text-center">
          <thead>
            <tr className="bg-white/[0.06] text-white/70 text-sm">
              {vars.map(v => <th key={v} className={`py-2 ${FORMULA}`}>{v}</th>)}
              <th className={`py-2 text-amber-300 ${FORMULA}`}>{texto(r.formula)}</th>
            </tr>
          </thead>
          <tbody>
            {fs.map((fila, i) => {
              const ok = revelado && marcas[i] === buena[i]
              return (
                <tr key={i} className="border-t border-white/[0.06]">
                  {vars.map(v => <td key={v} className={`py-1.5 ${FORMULA} ${fila[v] ? 'text-sky-300' : 'text-rose-300'}`}>{letra(fila[v])}</td>)}
                  <td className="py-1">
                    <button type="button" onClick={() => toca(i)}
                      className={`w-14 h-9 rounded-lg border-2 ${FORMULA} text-lg ${revelado ? (ok ? 'border-green-400 text-green-300' : 'border-red-400 text-red-300') : marcas[i] === null ? 'border-dashed border-white/25 text-white/25' : marcas[i] ? 'border-sky-400 text-sky-200 bg-sky-500/15' : 'border-rose-400 text-rose-200 bg-rose-500/15'}`}>
                      {marcas[i] === null ? '?' : letra(marcas[i])}
                      {revelado && !ok && <span className="text-green-300 text-xs ml-1">{letra(buena[i])}</span>}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {!revelado && (
        <>
          <button type="button" disabled={!listo} onClick={() => onResponder(`tabla:${marcas.filter((x, i) => x !== buena[i]).length}`)}
            className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 py-2.5 text-black font-black disabled:opacity-40">
            {tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}
          </button>
          <p className="text-center text-xs text-white/40 mt-2">{tr({ es: `Toca cada casilla para cambiar entre ${V} y ${F}`, en: `Tap each cell to switch between ${V} and ${F}`, ca: `Toca cada casella per canviar entre ${V} i ${F}` })}</p>
        </>
      )}
    </>
  )
}

const FICHAS = ['p', 'q', '¬', '∧', '∨', '→', '↔', '(', ')']

function Formaliza({ r, revelado, onResponder, l, tr }) {
  const [puestas, setPuestas] = useState([])
  const f = lee(puestas)
  const envia = () => { if (!revelado && puestas.length) onResponder(f && equivalentes(f, fraseDe(r).f) ? 'formaliza:ok' : 'formaliza:mal') }
  const ok = revelado && f && equivalentes(f, fraseDe(r).f)
  return (
    <>
      <p className="rounded-xl bg-white/[0.06] border border-white/10 px-3 py-3 text-white text-[17px] leading-snug text-center mb-2">«{textoFrase(r, l)}»</p>
      <p className="text-center text-white/50 text-xs mb-3">{leyenda(r, l).join(' · ')}</p>
      <div className={`min-h-[3.25rem] rounded-xl border-2 px-3 py-2 mb-3 flex items-center justify-center text-xl ${FORMULA} ${revelado ? (ok ? 'border-green-400 text-green-300' : 'border-red-400 text-red-300') : 'border-sky-400/60 text-white'}`}>
        {puestas.length ? puestas.join(' ') : <span className="text-white/25 text-base">…</span>}
      </div>
      {revelado && !ok && <p className={`text-center text-green-300 mb-2 ${FORMULA}`}>{texto(fraseDe(r).f)}</p>}
      {!revelado && (
        <>
          <div className="grid grid-cols-5 gap-2 mb-2">
            {FICHAS.map(t => (
              <button key={t} type="button" onClick={() => setPuestas(x => [...x, t])} className={`rounded-xl bg-sky-500 hover:bg-sky-400 py-2 text-white text-lg shadow-[0_3px_0_#0369a1] ${FORMULA}`}>{t}</button>
            ))}
            <button type="button" onClick={() => setPuestas(x => x.slice(0, -1))} className="rounded-xl bg-white/15 hover:bg-white/25 py-2 text-white text-lg font-black" aria-label={tr({ es: 'Borrar', en: 'Delete', ca: 'Esborrar' })}>⌫</button>
          </div>
          <button type="button" disabled={!puestas.length} onClick={envia} className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 py-2.5 text-black font-black disabled:opacity-40">
            {tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}
          </button>
          {puestas.length > 0 && !f && <p className="text-center text-xs text-amber-300/80 mt-2">{tr({ es: 'Aún no es una fórmula completa', en: 'Not a complete formula yet', ca: 'Encara no és una fórmula completa' })}</p>}
        </>
      )}
    </>
  )
}

// Fichas que se colocan en cajas (clasifica y argumento comparten la mecánica)
function Cajas({ items, cajas, cajaBuena, revelado, onFin, ficha, etiqueta, tr, grande }) {
  const [puestas, setPuestas] = useState({})
  const [activo, setActivo] = useState(0)
  const coloca = c => {
    if (revelado || activo === null) return
    const n = { ...puestas, [activo]: c }
    setPuestas(n)
    const sig = items.findIndex((_, i) => n[i] === undefined)
    setActivo(sig >= 0 ? sig : null)
    if (sig < 0) onFin(items.filter((x, i) => n[i] !== cajaBuena(x)).length)
  }
  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-3 min-h-[2.75rem]">
        {items.map((x, i) => puestas[i] === undefined && (
          <button key={i} type="button" onClick={() => setActivo(i)} className={`rounded-xl px-3 py-2 text-white text-left ${activo === i ? 'bg-sky-500 ring-2 ring-amber-300' : 'bg-white/10'}`}>{ficha(x)}</button>
        ))}
      </div>
      <div className={`grid gap-2 ${grande ? 'grid-cols-2' : cajas.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {cajas.map(c => (
          <button key={c} type="button" disabled={revelado || activo === null} onClick={() => coloca(c)} className={CAJA}>
            <span className="block text-white text-[12px] font-black leading-tight">{etiqueta(c)}</span>
            <span className="flex flex-col gap-1 mt-1">
              {items.map((x, i) => puestas[i] === c && (
                <span key={i} className={`rounded-md px-1.5 py-0.5 text-[11px] text-white bg-white/10 ${revelado ? (cajaBuena(x) === c ? 'ring-2 ring-green-400' : 'ring-2 ring-red-400') : ''}`}>{ficha(x, true)}</span>
              ))}
            </span>
          </button>
        ))}
      </div>
      {!revelado && <p className="text-center text-xs text-white/40 mt-3">{tr({ es: 'Toca una ficha y luego su caja', en: 'Tap a card and then its box', ca: 'Toca una fitxa i després la seva caixa' })}</p>}
    </>
  )
}

function Clasifica({ r, revelado, onResponder, l, tr }) {
  return (
    <Cajas items={r.formulas} cajas={Object.keys(CLASES)} cajaBuena={clase} revelado={revelado} tr={tr}
      onFin={n => onResponder(`clasifica:${n}`)}
      ficha={f => <span className={FORMULA}>{texto(f)}</span>}
      etiqueta={c => tx(CLASES[c], l)} />
  )
}

function Argumento({ r, revelado, onResponder, l, tr }) {
  const reglas = r.cajas === 'reglas'
  const cajas = reglas ? Object.keys(REGLAS) : ['valido', 'invalido']
  const ficha = (a, peque) => {
    const ln = lineasArgumento(a, l)
    const mono = !a.atomos
    return (
      <span className={`block ${peque ? 'text-[11px]' : 'text-[13px]'} leading-snug ${mono ? FORMULA : 'font-semibold'}`}>
        {ln.premisas.map((x, i) => <span key={i} className="block">{x}</span>)}
        <span className="block border-t border-white/30 mt-0.5 pt-0.5">∴ {ln.conclusion}</span>
      </span>
    )
  }
  return (
    <Cajas items={r.args} cajas={cajas} cajaBuena={a => cajaArgumento(r, a)} revelado={revelado} tr={tr} grande
      onFin={n => onResponder(`argumento:${n}`)} ficha={ficha}
      etiqueta={c => (reglas ? tx(REGLAS[c].nombre, l) : tx(VALIDEZ[c], l))} />
  )
}

export default function PreguntaTabla({ ronda, revelado, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const props = { r: ronda, revelado, onResponder, tr, l }
  const Cuerpo = { tabla: Tabla, formaliza: Formaliza, clasifica: Clasifica, argumento: Argumento }[ronda.tipo]
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(ronda, l)}</p>
      <Cuerpo {...props} />
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
