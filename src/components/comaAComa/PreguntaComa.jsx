// Una ronda de Coma a Coma, sin opciones. «Puntúa»: tres frases con huecos;
// cada toque en un hueco cambia el signo (solo entre el bueno y sus malos
// escritos a mano) y al corregir se pinta en verde o rojo. «Empareja»: tres
// frases con el signo ya puesto y resaltado, cada una con su regla.
import { useState } from 'react'
import { FRASES, REGLAS, enunciado, explicacion } from '../../lib/comaAComa'

const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const partes = signo => (signo.includes('|') ? signo.split('|') : [signo, signo])

// Una frase con sus huecos; `signo` = lo puesto (null = sin tocar).
function Frase({ i, signo, onToca, estado }) {
  const f = FRASES[i]
  const trozos = f.t.split('▢')
  const [a, b] = signo == null ? [null, null] : partes(signo)
  const color = estado === 'bien' ? 'border-green-400 bg-green-500/20 text-green-200' : estado === 'mal' ? 'border-red-400 bg-red-500/20 text-red-200' : 'border-amber-300 bg-amber-300/10 text-amber-200'
  return (
    <p className="text-white font-bold text-lg leading-loose">
      {trozos.map((t, k) => (
        <span key={k}>
          {t}
          {k < trozos.length - 1 && (
            <button type="button" onClick={onToca} disabled={!onToca}
              className={`inline-flex items-center justify-center min-w-[1.6rem] h-7 mx-0.5 px-1 align-middle rounded-md border-2 border-dashed font-black ${color}`}>
              {signo == null ? '' : (k === 0 ? a : b) || '–'}
            </button>
          )}
        </span>
      ))}
    </p>
  )
}

function Puntua({ r, revelado, onResponder }) {
  const [vuelta, setVuelta] = useState({}) // frase → índice en r.signos[frase]
  const puesto = i => (vuelta[i] == null ? null : r.signos[i][vuelta[i]])
  const toca = i => setVuelta(v => ({ ...v, [i]: v[i] == null ? 0 : (v[i] + 1) % r.signos[i].length }))
  const listo = r.items.every(i => vuelta[i] != null)
  return (
    <>
      <div className="space-y-2 mb-3">
        {r.items.map(i => (
          <div key={i} className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-4 py-3">
            <Frase i={i} signo={puesto(i)} onToca={revelado ? null : () => toca(i)}
              estado={revelado ? (puesto(i) === FRASES[i].ok ? 'bien' : 'mal') : null} />
            {revelado && puesto(i) !== FRASES[i].ok && (
              <div className="mt-1"><Frase i={i} signo={FRASES[i].ok} estado="bien" /></div>
            )}
          </div>
        ))}
      </div>
      {!revelado && (
        <>
          <p className="text-white/40 text-xs text-center mb-2">Toca un hueco para cambiar el signo · «–» es ningún signo</p>
          <button className={boton} disabled={!listo} onClick={() => onResponder(`puntua:${r.items.filter(i => puesto(i) !== FRASES[i].ok).length}`)}>Comprobar</button>
        </>
      )}
    </>
  )
}

function Empareja({ r, revelado, onResponder }) {
  const [pares, setPares] = useState({})
  const [sel, setSel] = useState(r.items[0])
  const letra = i => String.fromCharCode(65 + r.items.indexOf(i))
  const une = regla => {
    if (revelado || sel == null) return
    const n = { ...Object.fromEntries(Object.entries(pares).filter(([, v]) => v !== regla)), [sel]: regla }
    setPares(n)
    setSel(r.items.find(i => !n[i]) ?? null)
  }
  const listo = r.items.every(i => pares[i])
  return (
    <>
      <div className="space-y-2 mb-3">
        {r.items.map(i => {
          const f = FRASES[i]
          const estado = revelado ? (pares[i] === f.regla ? 'border-green-400 bg-green-500/10' : 'border-red-400 bg-red-500/10') : sel === i ? 'border-amber-300 bg-amber-300/10' : 'border-white/10 bg-[#0b1226]'
          return (
            <button key={i} type="button" disabled={revelado} onClick={() => setSel(i)} className={`w-full text-left rounded-2xl border-2 px-3 py-2 ${estado}`}>
              <span className="text-amber-300 font-black mr-1.5">{letra(i)}</span>
              <span className="text-white font-bold">{f.t.split('▢').map((t, k, arr) => <span key={k}>{t}{k < arr.length - 1 && <span className="text-amber-300 bg-amber-300/15 rounded px-0.5 font-black">{partes(f.ok)[k === 0 ? 0 : 1] || '·'}</span>}</span>)}</span>
              {revelado && pares[i] !== f.regla && <span className="block text-green-300 text-xs font-bold mt-0.5">→ {REGLAS[f.regla].nombre}</span>}
            </button>
          )
        })}
      </div>
      <div className="grid grid-cols-1 gap-1.5 mb-3">
        {r.reglas.map(g => {
          const de = r.items.find(i => pares[i] === g)
          return (
            <button key={g} disabled={revelado} onClick={() => une(g)}
              className={`rounded-xl border px-3 py-2 text-left text-sm font-bold text-white ${de != null ? 'border-white/30 bg-white/[0.08]' : 'border-white/15 bg-white/[0.03]'}`}>
              {de != null && <span className="text-amber-300 font-black mr-1.5">{letra(de)}</span>}{REGLAS[g].nombre}
            </button>
          )
        })}
      </div>
      {!revelado && <button className={boton} disabled={!listo} onClick={() => onResponder(`empareja:${r.items.filter(i => pares[i] !== FRASES[i].regla).length}`)}>Comprobar</button>}
    </>
  )
}

export default function PreguntaComa({ ronda, revelado, onResponder }) {
  const r = ronda
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r)}</p>
      {r.mecanica === 'empareja' ? <Empareja r={r} revelado={revelado} onResponder={onResponder} /> : <Puntua r={r} revelado={revelado} onResponder={onResponder} />}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r)}</p>}
    </div>
  )
}
