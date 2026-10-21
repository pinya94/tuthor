// Una ronda de Bloques Primos: el enunciado, los números como filas de bloques
// (un bloque por factor primo, alineados por columnas de primo) y cómo se
// responde, sin opciones: tocando divisibles o primos, rompiendo el número
// entre primos o construyendo el mcd/mcm con bloques. Al corregir se marcan los bloques que forman el mcd (los que
// tienen todos los números) o el mcm (de cada primo, la fila más larga) y
// aparece la fila del resultado. La usan el juego (contra reloj) y el examen.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { enunciado, explicacion, columnas, colorPrimo, factoriza, escribe, num, esCorrecta, esPrimo, NIVELES } from '../../lib/bloquesPrimos'

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

const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'

// Ocho números para tocar (criba y caza).
function Toca({ r, revelado, onResponder, tr, l }) {
  const [sel, setSel] = useState([])
  const toca = n => !revelado && setSel(s => (s.includes(n) ? s.filter(x => x !== n) : [...s, n]))
  const fallos = r.numeros.filter(n => sel.includes(n) !== r.validos.includes(n)).length
  return (
    <>
      <div className="grid grid-cols-4 gap-2 mb-3">
        {r.numeros.map(n => {
          const marcado = sel.includes(n), valido = r.validos.includes(n)
          const cls = revelado
            ? (valido ? (marcado ? 'bg-green-500/30 border-green-400 text-white' : 'border-green-400 border-dashed text-green-300') : (marcado ? 'bg-red-500/30 border-red-400 text-white' : 'border-white/10 text-white/40'))
            : (marcado ? 'bg-amber-400/25 border-amber-300 text-white' : 'border-white/15 bg-white/[0.06] text-white')
          return <button key={n} disabled={revelado} onClick={() => toca(n)} className={`py-3 rounded-xl border-2 font-black text-[15px] tabular-nums transition-all active:scale-95 ${cls}`}>{num(n, l)}</button>
        })}
      </div>
      {!revelado && <button className={boton} onClick={() => onResponder(`${r.mecanica}:${fallos}`)}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>}
    </>
  )
}

// Romper el número: cada toque en un primo que lo divide añade un bloque.
function Rompe({ r, revelado, onResponder, tr, l }) {
  const [pasos, setPasos] = useState([]) // primos ya sacados
  const [errores, setErrores] = useState(0)
  const [aviso, setAviso] = useState(null)
  const queda = pasos.reduce((m, p) => m / p, r.n)
  const divide = p => {
    if (revelado || queda === 1) return
    if (!esPrimo(p)) {
      setErrores(e => e + 1)
      setAviso(tr({ es: `${p} no es primo: hay que romperlo en ${escribe(factoriza(p))}`, en: `${p} is not prime: it breaks into ${escribe(factoriza(p))}`, ca: `${p} no és primer: cal trencar-lo en ${escribe(factoriza(p))}` }))
      return
    }
    if (queda % p !== 0) {
      setErrores(e => e + 1)
      setAviso(tr({ es: `${num(queda, l)} no se puede dividir entre ${p}`, en: `${num(queda, l)} cannot be divided by ${p}`, ca: `${num(queda, l)} no es pot dividir entre ${p}` }))
      return
    }
    setAviso(null)
    const n = [...pasos, p]
    setPasos(n)
    if (queda / p === 1) onResponder(`rompe:${errores}`)
  }
  return (
    <>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-4 mb-3 text-center">
        <p className="text-white font-black text-4xl tabular-nums mb-2">{num(queda, l)}</p>
        <div className="flex flex-wrap justify-center gap-1 min-h-[1.75rem]">
          {[...pasos].sort((x, y) => x - y).map((p, i) => <Bloque key={i} p={p} />)}
        </div>
        <p className="text-white/50 text-xs mt-2 tabular-nums">{num(r.n, l)} = {pasos.length ? [...pasos].sort((x, y) => x - y).join(' · ') : '…'}{queda > 1 ? ` · ${num(queda, l)}` : ''}</p>
        {aviso && <p className="text-red-300 text-sm font-bold mt-2">{aviso}</p>}
      </div>
      {!revelado && (
        <div className="grid grid-cols-4 gap-2">
          {r.fichas.map(p => (
            <button key={p} onClick={() => divide(p)} className="py-3 rounded-xl text-white font-black text-lg active:scale-95 shadow" style={{ background: esPrimo(p) ? colorPrimo(p) : '#475569' }}>: {p}</button>
          ))}
        </div>
      )}
    </>
  )
}

// Construir el resultado con bloques: + y − por primo.
function Construye({ r, revelado, elegida, onResponder, tr, l, sigla }) {
  const cols = columnas(r.nums)
  const primos = r.conBloques && r.tipo !== 'problema' ? cols.map(c => c.p) : NIVELES[r.nivel].primos
  const [exp, setExp] = useState({})
  const valor = primos.reduce((v, p) => v * p ** (exp[p] || 0), 1)
  const cambia = (p, d) => setExp(e => ({ ...e, [p]: Math.max(0, Math.min(6, (e[p] || 0) + d)) }))
  const mostrar = revelado || (r.conBloques && r.tipo !== 'problema')
  const ok = revelado && esCorrecta(r, elegida)
  const marca = !revelado ? null : i => (j, k) => (r.op === 'mcd' ? k < cols[j].min : i === cols[j].exps.indexOf(cols[j].max) && k < cols[j].max)
  return (
    <>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-4 mb-3 overflow-x-auto">
        <div className="flex flex-col items-start gap-1.5 w-fit mx-auto">
          {r.nums.map((n, i) => <Fila key={n} etiqueta={num(n, l)} cols={cols} exps={cols.map(c => c.exps[i])} marca={marca?.(i)} oculta={!mostrar} />)}
        </div>
        {revelado && <p className="text-center text-white/60 text-xs mt-3">{sigla} = {escribe(factoriza(r.bueno))} = <b className="text-white">{num(r.bueno, l)}</b></p>}
      </div>
      <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-3 mb-3">
        <div className="flex flex-wrap items-center justify-center gap-1 min-h-[1.9rem] mb-2">
          {primos.flatMap(p => Array.from({ length: exp[p] || 0 }, (_, k) => <Bloque key={`${p}-${k}`} p={p} />))}
          {!primos.some(p => exp[p]) && <span className="text-white/30 text-sm">{tr({ es: 'Añade bloques', en: 'Add blocks', ca: 'Afegeix blocs' })}</span>}
        </div>
        <p className="text-center font-black text-2xl tabular-nums mb-2">
          <span className="text-white/60 text-base">{sigla} = </span>
          <span className={revelado ? (ok ? 'text-green-300' : 'text-red-300') : 'text-amber-300'}>{num(revelado ? Number(elegida) : valor, l)}</span>
          {revelado && !ok && <span className="text-green-300 text-lg"> → {num(r.bueno, l)}</span>}
        </p>
        {!revelado && (
          <div className="flex flex-wrap justify-center gap-2">
            {primos.map(p => (
              <span key={p} className="flex items-center gap-1 rounded-xl bg-white/[0.06] px-1.5 py-1">
                <button onClick={() => cambia(p, -1)} className="w-8 h-8 rounded-lg bg-white/10 text-white font-black">−</button>
                <span className="w-8 h-8 rounded-md flex items-center justify-center text-white font-black" style={{ background: colorPrimo(p) }}>{p}</span>
                <button onClick={() => cambia(p, 1)} className="w-8 h-8 rounded-lg bg-white/10 text-white font-black">+</button>
              </span>
            ))}
          </div>
        )}
      </div>
      {!revelado && <button className={boton} disabled={valor === 1 && !primos.some(p => exp[p])} onClick={() => onResponder(String(valor))}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>}
    </>
  )
}

export default function PreguntaPrimos({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const sigla = r.op === 'mcd' ? tr({ es: 'mcd', en: 'HCF', ca: 'mcd' }) : tr({ es: 'mcm', en: 'LCM', ca: 'mcm' })
  const props = { r, revelado, elegida, onResponder, tr, l, sigla }
  let cuerpo
  if (r.mecanica === 'criba' || r.mecanica === 'caza') cuerpo = <Toca {...props} />
  else if (r.mecanica === 'rompe') cuerpo = <Rompe {...props} />
  else cuerpo = <Construye {...props} />
  const okRompe = r.mecanica === 'rompe' && revelado
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      {cuerpo}
      {okRompe && (
        <p className={`text-center text-sm font-bold mt-2 ${esCorrecta(r, elegida) ? 'text-green-300' : 'text-red-300'}`}>
          {esCorrecta(r, elegida) ? tr({ es: 'Sin un solo error', en: 'Without a single mistake', ca: 'Sense cap error' }) : tr({ es: `Con ${String(elegida).split(':')[1]} intento(s) fallido(s)`, en: `With ${String(elegida).split(':')[1]} failed attempt(s)`, ca: `Amb ${String(elegida).split(':')[1]} intent(s) fallit(s)` })}
        </p>
      )}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
