// Una ronda de La Fábrica de Palabras (ver lib/fabricaPalabras):
//   construir  toca una pieza para pegarla a la base y mira la palabra montada
//   parejas    toca una palabra de la izquierda y luego su pareja de la derecha
// Juego solo en castellano (games.js `idiomas: ['es']`): textos sin traducir.
import { useState } from 'react'
import {
  palabra, montar, respuestaPalabra, respuestaParejas, esCorrecta, enunciado, explicacion, pistaFallo,
} from '../../lib/fabricaPalabras'

const COLORES = ['#38BDF8', '#F472B6', '#FBBF24', '#A78BFA']
const boton = 'w-full rounded-xl bg-amber-400 hover:bg-amber-300 py-2.5 text-black font-black disabled:opacity-40'

function Veredicto({ ok, children }) {
  return (
    <div className={`rounded-xl px-3 py-2.5 mb-3 text-sm font-black border ${ok ? 'bg-green-500/15 border-green-500/40 text-green-300' : 'bg-red-500/15 border-red-500/40 text-red-300'}`}>
      {children}
    </div>
  )
}

function Construir({ r, revelado, onResponder }) {
  const w = palabra(r.w)
  const [elegida, setElegida] = useState(null)
  const esSuf = r.lado === 'suf'
  const pre = esSuf ? null : elegida
  const suf = esSuf ? elegida : null
  const resp = elegida ? respuestaPalabra(r, pre, suf) : null
  const ok = revelado && esCorrecta(r, resp)
  const hueco = (
    <span className={`min-w-[4.5rem] px-3 py-3 rounded-xl border-2 border-dashed text-2xl font-black text-center ${elegida ? (revelado ? (ok ? 'border-green-400 text-green-300 bg-green-500/10' : 'border-red-400 text-red-300 bg-red-500/10') : 'border-amber-300 text-amber-200 bg-amber-400/10') : 'border-white/25 text-white/30'}`}>
      {elegida ?? (esSuf ? '-…' : '…-')}
    </span>
  )
  return (
    <>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-5 mb-3">
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {!esSuf && hueco}
          <span className="px-3 py-3 rounded-xl bg-white/10 border border-white/20 text-2xl font-black text-white">{esSuf ? `${w.base}-` : w.base}</span>
          {esSuf && hueco}
        </div>
        <p className={`text-center text-3xl font-black mt-4 min-h-[2.5rem] ${revelado ? (ok ? 'text-green-300' : 'text-red-300') : 'text-white'}`}>
          {elegida ? montar(pre, w.base, suf) : ' '}
        </p>
      </div>
      <p className="text-center text-[11px] uppercase tracking-widest text-white/45 font-bold mb-2">{esSuf ? 'Sufijos' : 'Prefijos'}</p>
      <div className="grid grid-cols-4 gap-2 mb-3">
        {r.piezas.map(p => (
          <button key={p} type="button" disabled={revelado} onClick={() => setElegida(p)}
            className={`rounded-xl py-3 font-black text-lg border transition-colors ${elegida === p ? 'bg-amber-400 text-black border-amber-200' : 'bg-white/[0.07] text-white border-white/15 hover:bg-white/15'}`}>
            {p}
          </button>
        ))}
      </div>
      {revelado
        ? <Veredicto ok={ok}>{ok ? `✓ ¡Correcto! ${w.palabra}` : `✗ ${pistaFallo(r, resp) ?? ''} Era: ${w.palabra}`}</Veredicto>
        : <button type="button" disabled={!elegida} onClick={() => onResponder(resp)} className={boton}>Comprobar</button>}
    </>
  )
}

function Parejas({ r, revelado, onResponder }) {
  // uniones: izquierda → derecha
  const [union, setUnion] = useState({})
  const [sel, setSel] = useState(null)
  const color = palabraIzq => COLORES[r.izq.indexOf(palabraIzq)]
  const izqDe = der => Object.keys(union).find(k => union[k] === der)
  const buenaDe = Object.fromEntries(r.pares)
  const tocaIzq = a => { if (revelado) return; if (union[a]) { const u = { ...union }; delete u[a]; setUnion(u); setSel(null); return } setSel(a) }
  const tocaDer = b => {
    if (revelado) return
    const previa = izqDe(b)
    if (previa) { const u = { ...union }; delete u[previa]; setUnion(u); return }
    if (sel) { setUnion({ ...union, [sel]: b }); setSel(null) }
  }
  const completo = Object.keys(union).length === r.izq.length
  const resp = completo ? respuestaParejas(Object.entries(union)) : null
  const ok = revelado && esCorrecta(r, resp)
  const estilo = (activo, c, bien) => {
    if (revelado) return bien ? 'border-green-400 bg-green-500/15 text-green-200' : 'border-red-400 bg-red-500/15 text-red-200'
    if (c) return 'text-white'
    return activo ? 'border-amber-300 bg-amber-400/15 text-white' : 'border-white/15 bg-white/[0.07] text-white hover:bg-white/15'
  }
  return (
    <>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-3">
        <div className="space-y-2">
          {r.izq.map(a => {
            const c = union[a] ? color(a) : null
            return (
              <button key={a} type="button" disabled={revelado} onClick={() => tocaIzq(a)}
                className={`w-full rounded-xl py-3 px-2 font-black text-base border-2 transition-colors ${estilo(sel === a, c, union[a] === buenaDe[a])}`}
                style={c && !revelado ? { borderColor: c, background: `${c}26` } : undefined}>
                {a}
              </button>
            )
          })}
        </div>
        <div className="space-y-2">
          {r.der.map(b => {
            const a = izqDe(b)
            const c = a ? color(a) : null
            return (
              <button key={b} type="button" disabled={revelado} onClick={() => tocaDer(b)}
                className={`w-full rounded-xl py-3 px-2 font-black text-base border-2 transition-colors ${estilo(false, c, a && buenaDe[a] === b)}`}
                style={c && !revelado ? { borderColor: c, background: `${c}26` } : undefined}>
                {b}
              </button>
            )
          })}
        </div>
      </div>
      {revelado
        ? <Veredicto ok={ok}>{ok ? '✓ ¡Todas bien!' : `✗ Las parejas eran: ${r.pares.map(([a, b]) => `${a} – ${b}`).join(', ')}`}</Veredicto>
        : (
          <>
            <button type="button" disabled={!completo} onClick={() => onResponder(resp)} className={boton}>Comprobar</button>
            <p className="text-center text-xs text-white/40 mt-2">Toca una palabra de la izquierda y luego su pareja; tócala otra vez para soltarla</p>
          </>
        )}
    </>
  )
}

export default function PreguntaFabrica({ ronda, revelado, onResponder }) {
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug text-lg">{enunciado(ronda)}</p>
      {ronda.pares ? <Parejas r={ronda} revelado={revelado} onResponder={onResponder} /> : <Construir r={ronda} revelado={revelado} onResponder={onResponder} />}
      {revelado && <p className="text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda)}</p>}
    </div>
  )
}

