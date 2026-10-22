// Una ronda de La Receta Química. En las de reacción, la ecuación ajustada en
// fichas (coeficiente en grande: es la «receta») con el dato debajo de su
// sustancia y un «?» bajo la que se busca; al corregir se rellena. En la del
// reactivo limitante, al corregir se marca cuál se acaba y cuál sobra. En las
// de un solo compuesto, la fórmula en grande y, al corregir, sus átomos.
// Sin opciones: los resultados se teclean (el de Avogadro, cifra y
// exponente) y en el limitante se elige el reactivo que se acaba y se teclea
// lo que sobra del otro.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { enunciado, textoOpcion, explicacion, reaccion, COMPUESTOS, MASA_ATOMICA, num, esCorrecta, leeNumero, unidad, sobra } from '../../lib/recetaQuimica'

const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const tecla = 'rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 text-white text-lg font-black py-2.5'
const comprobar = { es: 'Comprobar', en: 'Check', ca: 'Comprovar' }
const SUPS = '⁰¹²³⁴⁵⁶⁷⁸⁹'
const sup = e => String(e).split('').map(c => SUPS[c]).join('')

// Teclado numérico con coma (o punto en inglés).
function Teclado({ setV, l, max = 7 }) {
  const sep = l === 'en' ? '.' : ','
  const escribe = t => setV(x => (t === '⌫' ? x.slice(0, -1) : t === sep ? (x.includes(sep) || !x ? x : x + t) : x.length < max ? x + t : x))
  return (
    <div className="grid grid-cols-4 gap-1.5 mb-3">
      {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', sep, '⌫'].map(t => <button key={t} className={tecla} onClick={() => escribe(t)}>{t}</button>)}
    </div>
  )
}

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

function Teclea({ r, revelado, elegida, onResponder, l, tr }) {
  const [v, setV] = useState('')
  const ok = revelado && esCorrecta(r, elegida)
  return (
    <>
      <div className="rounded-xl bg-white/5 border border-white/10 py-2 mb-2 text-center">
        <span className="text-amber-300 font-black text-2xl tabular-nums">{(revelado ? String(elegida ?? '') : v) || '?'} {unidad(r)}</span>
        {revelado && <span className={`ml-2 font-black ${ok ? 'text-green-300' : 'text-red-300'}`}>{ok ? '✓' : `→ ${textoOpcion(r.bueno, r, l)}`}</span>}
      </div>
      {!revelado && (
        <>
          <Teclado setV={setV} l={l} />
          <button className={boton} disabled={leeNumero(v) == null} onClick={() => onResponder(v)}>{tr(comprobar)}</button>
        </>
      )}
    </>
  )
}

// Notación científica: la cifra con el teclado y el exponente con − y +.
function Cientifica({ r, revelado, elegida, onResponder, l, tr }) {
  const [v, setV] = useState('')
  const [e, setE] = useState(23)
  const ok = revelado && esCorrecta(r, elegida)
  const [mv, ev] = revelado ? String(elegida ?? '|').split('|') : [v, e]
  return (
    <>
      <div className="rounded-xl bg-white/5 border border-white/10 py-2 mb-2 text-center">
        <span className="text-amber-300 font-black text-2xl tabular-nums">{mv || '?'} · 10{sup(ev)}</span>
        {revelado && <span className={`ml-2 font-black ${ok ? 'text-green-300' : 'text-red-300'}`}>{ok ? '✓' : `→ ${textoOpcion(r.bueno, r, l)}`}</span>}
      </div>
      {!revelado && (
        <>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-white/60 text-xs font-bold">{tr({ es: 'Exponente', en: 'Exponent', ca: 'Exponent' })}</span>
            <button onClick={() => setE(x => Math.max(20, x - 1))} className="w-9 h-9 rounded-lg bg-white/10 text-white text-xl font-black active:scale-95">−</button>
            <span className="w-8 text-center text-amber-300 font-black text-xl">{e}</span>
            <button onClick={() => setE(x => Math.min(26, x + 1))} className="w-9 h-9 rounded-lg bg-white/10 text-white text-xl font-black active:scale-95">+</button>
          </div>
          <Teclado setV={setV} l={l} max={6} />
          <button className={boton} disabled={leeNumero(v) == null} onClick={() => onResponder(`${v}|${e}`)}>{tr(comprobar)}</button>
        </>
      )}
    </>
  )
}

// El limitante: cuál se acaba (o ninguno) y cuántos moles sobran del otro.
function Limitante({ r, revelado, elegida, onResponder, l, tr }) {
  const [id, setId] = useState(null)
  const [v, setV] = useState('')
  const ok = revelado && esCorrecta(r, elegida)
  const reactivos = reaccion(r).r.map(([, x]) => x)
  const [idE, vE] = revelado ? String(elegida ?? '|').split('|') : [id, v]
  const nombre = x => (x === 'ninguno' ? tr({ es: 'Ninguno', en: 'Neither', ca: 'Cap' }) : COMPUESTOS[x].f)
  return (
    <>
      <p className="text-white/50 text-xs font-bold mb-1">{tr({ es: 'Se acaba primero', en: 'Runs out first', ca: 'S’acaba primer' })}</p>
      <div className="grid grid-cols-3 gap-1.5 mb-3">
        {[...reactivos, 'ninguno'].map(x => (
          <button key={x} disabled={revelado} onClick={() => { setId(x); if (x === 'ninguno') setV('0') }}
            className={`rounded-xl border px-2 py-2.5 font-black ${idE === x ? (revelado ? (x === r.bueno ? 'border-green-400 bg-green-500/20' : 'border-red-400 bg-red-500/20') : 'border-amber-300 bg-amber-300/20') : revelado && x === r.bueno ? 'border-green-400 bg-green-500/10' : 'border-white/15 bg-white/[0.06]'} text-white`}>
            {nombre(x)}
          </button>
        ))}
      </div>
      <div className="rounded-xl bg-white/5 border border-white/10 py-2 mb-2 text-center">
        <span className="text-white/60 text-sm font-bold mr-1">{tr({ es: 'Sobran', en: 'Left over', ca: 'Sobren' })}</span>
        <span className="text-amber-300 font-black text-2xl tabular-nums">{vE || '?'} mol</span>
        {revelado && <span className={`ml-2 font-black ${ok ? 'text-green-300' : 'text-red-300'}`}>{ok ? '✓' : `→ ${num(sobra(r), l)} mol`}</span>}
      </div>
      {!revelado && (
        <>
          <Teclado setV={setV} l={l} />
          <button className={boton} disabled={!id || leeNumero(v) == null} onClick={() => onResponder(`${id}|${v}`)}>{tr(comprobar)}</button>
        </>
      )}
    </>
  )
}

export default function PreguntaReceta({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const conEcuacion = !!r.reaccion
  const props = { r, revelado, elegida, onResponder, l, tr }
  const cuerpo = r.mecanica === 'limitante' ? <Limitante {...props} />
    : r.mecanica === 'cientifica' ? <Cientifica {...props} />
    : <Teclea {...props} />

  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-2 py-4 mb-3">
        {conEcuacion ? <Ecuacion r={r} revelado={revelado} l={l} tr={tr} /> : <Compuesto r={r} revelado={revelado} l={l} />}
      </div>
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      {cuerpo}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
