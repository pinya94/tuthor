// Una ronda de Nombra el compuesto, sin opciones: la fórmula se escribe
// ajustando los subíndices, el nombre se monta con piezas (la primera
// palabra y el número romano, los prefijos, o hipo-/per- y -oso/-ico) y las
// fórmulas se llevan a la caja de su tipo. Al corregir, en los compuestos de
// metal se dibuja el cruce de valencias: Fe³⁺ y O²⁻ se intercambian los
// números y sale Fe₂O₃. La usan el juego y el examen.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import {
  ANIONES, METALES, TIPOS, ROMANOS, enunciado, explicacion, dato, esCorrecta, respuestaBuena,
  escribe, escribeAcido, nombreMontado, nombrePrefijosDe, nombreAcidoMontado, ACIDOS,
} from '../../lib/formulacion'

const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const chip = on => `rounded-xl border px-3 py-2 text-sm font-bold transition-all ${on ? 'border-amber-300 bg-amber-300/20 text-white' : 'border-white/15 bg-white/[0.06] text-white/85 hover:bg-white/[0.12]'}`
const tx = (o, l) => o[l] ?? o.es

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

// Un número con − y +, debajo de su elemento. Empieza vacío («?», valor 0):
// si empezara en 1, en NaCl o en NO la respuesta ya saldría puesta.
function Paso({ etiqueta, valor, min = 1, max = 7, onCambia, desactivado }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-white/60 text-xs font-bold font-mono">{etiqueta}</span>
      <div className="flex items-center gap-1.5">
        <button disabled={desactivado || valor <= min} onClick={() => onCambia(valor - 1)} className="w-9 h-9 rounded-lg bg-white/10 text-white text-xl font-black disabled:opacity-25 active:scale-95">−</button>
        <span className="w-7 text-center text-amber-300 font-black text-xl tabular-nums">{valor || '?'}</span>
        <button disabled={desactivado || valor >= max} onClick={() => onCambia(Math.max(min, valor + 1))} className="w-9 h-9 rounded-lg bg-white/10 text-white text-xl font-black disabled:opacity-25 active:scale-95">+</button>
      </div>
    </div>
  )
}

function Resultado({ r, elegida, revelado, l, texto }) {
  if (!revelado) return null
  const ok = esCorrecta(r, elegida)
  return <p className={`text-center text-sm font-black mt-2 ${ok ? 'text-green-300' : 'text-red-300'}`}>{ok ? '✓' : <>✗ → <span className="text-green-300">{texto(respuestaBuena(r), l)}</span></>}</p>
}

function Clasifica({ r, revelado, onResponder, l }) {
  const [puestas, setPuestas] = useState({})
  const activa = r.items.findIndex(c => !puestas[c.f])
  const tipoDe = c => ANIONES[c.anion].tipo
  const pon = t => {
    if (revelado || activa < 0) return
    const n = { ...puestas, [r.items[activa].f]: t }
    setPuestas(n)
    if (r.items.every(c => n[c.f])) onResponder(`clasifica:${r.items.filter(c => n[c.f] !== tipoDe(c)).length}`)
  }
  const item = activa >= 0 ? r.items[activa] : null
  return (
    <>
      {item && !revelado && (
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-4 mb-3 text-center">
          <p className="text-white/40 text-xs">{activa + 1} / {r.items.length}</p>
          <Formula f={item.f} className="text-white font-black text-4xl" />
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        {Object.keys(TIPOS).map(t => (
          <button key={t} disabled={revelado || activa < 0} onClick={() => pon(t)} className="rounded-xl border-2 border-dashed border-white/20 bg-white/[0.04] hover:bg-white/[0.08] p-2 min-h-[4.5rem] text-left">
            <span className="block text-white font-black text-[13px]">{tx(TIPOS[t], l)}</span>
            {r.items.filter(c => puestas[c.f] === t).map(c => (
              <span key={c.f} className={`inline-block mt-1 mr-1 rounded-md px-1.5 py-0.5 text-base font-black text-white ${revelado ? (tipoDe(c) === t ? 'bg-green-500/25 ring-1 ring-green-400' : 'bg-red-500/25 ring-1 ring-red-400') : 'bg-white/10'}`}>
                <Formula f={c.f} />
                {revelado && tipoDe(c) !== t && <span className="block text-green-300 text-[11px]">→ {tx(TIPOS[tipoDe(c)], l)}</span>}
              </span>
            ))}
          </button>
        ))}
      </div>
    </>
  )
}

// De nombre a fórmula: los dos subíndices (o H y O en un ácido).
function Construye({ r, revelado, elegida, onResponder, l, tr }) {
  const acido = r.mecanica === 'acido'
  const a = acido ? ACIDOS.find(x => x.f === r.acido) : null
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const f = acido ? escribeAcido(x, a.fam, y) : escribe(r.comp.metal, x, r.comp.anion, y)
  // Mientras falta algún número se ve el esqueleto: H?SO?, Fe?O?
  const ox = r.comp?.anion === 'OH' ? '(OH)' : r.comp?.anion
  const esqueleto = acido ? `H${x || '?'}${a.fam}O${y || '?'}` : `${r.comp.metal}${x || '?'}${ox}${y || '?'}`
  const mostrada = revelado ? String(elegida ?? '') : x && y ? f : esqueleto
  return (
    <>
      <div className="rounded-2xl bg-white/5 border border-white/10 py-3 mb-3 text-center">
        <Formula f={mostrada || '?'} className="text-amber-300 font-black text-4xl" />
        <Resultado r={r} elegida={elegida} revelado={revelado} l={l} texto={o => <Formula f={o} />} />
      </div>
      {!revelado && (
        <>
          <div className="flex justify-center gap-6 mb-4">
            <Paso etiqueta={acido ? 'H' : r.comp.metal} valor={x} max={acido ? 4 : 7} onCambia={setX} />
            <Paso etiqueta={acido ? 'O' : r.comp.anion === 'OH' ? '(OH)' : r.comp.anion} valor={y} max={acido ? 5 : 7} onCambia={setY} />
          </div>
          <button className={boton} disabled={!x || !y} onClick={() => onResponder(f)}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
        </>
      )}
    </>
  )
}

// De fórmula a nombre de Stock: la primera palabra y el número romano.
function Compone({ r, revelado, elegida, onResponder, l, tr }) {
  const [anion, setAnion] = useState(null)
  const [rom, setRom] = useState(null)
  const listo = anion != null && rom != null
  const texto = o => { const [an, ro] = o.split('|'); return nombreMontado(r.comp.metal, an, ro, l) }
  return (
    <>
      <div className="rounded-2xl bg-white/5 border border-white/10 py-3 px-2 mb-3 text-center min-h-[3.5rem]">
        <p className="text-amber-300 font-black text-xl first-letter:uppercase">{revelado ? texto(String(elegida ?? '|')) : anion ? nombreMontado(r.comp.metal, anion, rom ?? '', l) : '…'}</p>
        <Resultado r={r} elegida={elegida} revelado={revelado} l={l} texto={texto} />
      </div>
      {!revelado && (
        <>
          <p className="text-white/50 text-xs font-bold mb-1">{tr({ es: 'Primera palabra', en: 'Second word', ca: 'Primera paraula' /* en inglés va detrás: iron(III) chloride */ })}</p>
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {r.palabras.map(a => <button key={a} onClick={() => setAnion(a)} className={chip(anion === a)}>{tx(ANIONES[a].n, l)}</button>)}
          </div>
          <p className="text-white/50 text-xs font-bold mb-1">{tr({ es: `Número romano del ${tx(METALES[r.comp.metal].n, 'es')}`, en: `Roman numeral for ${tx(METALES[r.comp.metal].n, 'en')}`, ca: `Nombre romà del ${tx(METALES[r.comp.metal].n, 'ca')}` })}</p>
          <div className="grid grid-cols-5 gap-1.5 mb-3">
            {ROMANOS.map(ro => <button key={ro || 'nada'} onClick={() => setRom(ro)} className={chip(rom === ro) + ' px-1 text-[13px]'}>{ro || tr({ es: 'Ninguno', en: 'None', ca: 'Cap' })}</button>)}
          </div>
          <button className={boton} disabled={!listo} onClick={() => onResponder(`${anion}|${rom}`)}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
        </>
      )}
    </>
  )
}

// Por prefijos: cuántos átomos de cada elemento.
function Prefija({ r, revelado, elegida, onResponder, l, tr }) {
  const c = r.comp
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const texto = o => { const [a, b] = o.split(':').map(Number); return nombrePrefijosDe(c, a, b, l) }
  const el1 = c.nm ? c.el : c.metal, el2 = c.nm ? 'O' : c.anion
  return (
    <>
      <div className="rounded-2xl bg-white/5 border border-white/10 py-3 px-2 mb-3 text-center">
        <p className="text-amber-300 font-black text-xl first-letter:uppercase">{revelado ? texto(String(elegida ?? '1:1')) : x && y ? nombrePrefijosDe(c, x, y, l) : '…'}</p>
        <Resultado r={r} elegida={elegida} revelado={revelado} l={l} texto={texto} />
      </div>
      {!revelado && (
        <>
          <div className="flex justify-center gap-6 mb-4">
            <Paso etiqueta={el1} valor={x} onCambia={setX} />
            <Paso etiqueta={el2} valor={y} onCambia={setY} />
          </div>
          <button className={boton} disabled={!x || !y} onClick={() => onResponder(`${x}:${y}`)}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
        </>
      )}
    </>
  )
}

// De fórmula de ácido a nombre: hipo-/per- y -oso/-ico.
function NombraAcido({ r, revelado, elegida, onResponder, l, tr }) {
  const fam = ACIDOS.find(x => x.f === r.acido).fam
  const [pre, setPre] = useState(null)
  const [suf, setSuf] = useState(null)
  const texto = o => { const [p, s] = o.split('|'); return nombreAcidoMontado(fam, p, s, l) }
  return (
    <>
      <div className="rounded-2xl bg-white/5 border border-white/10 py-3 px-2 mb-3 text-center min-h-[3.5rem]">
        <p className="text-amber-300 font-black text-xl first-letter:uppercase">{revelado ? texto(String(elegida ?? '|ico')) : suf ? nombreAcidoMontado(fam, pre ?? '', suf, l) : '…'}</p>
        <Resultado r={r} elegida={elegida} revelado={revelado} l={l} texto={texto} />
      </div>
      {!revelado && (
        <>
          <p className="text-white/50 text-xs font-bold mb-1">{tr({ es: 'Delante', en: 'Prefix', ca: 'Davant' })}</p>
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {['', 'hipo', 'per'].map(p => <button key={p || 'nada'} onClick={() => setPre(p)} className={chip(pre === p)}>{p ? `${p === 'hipo' && l === 'en' ? 'hypo' : p}-` : tr({ es: 'Nada', en: 'None', ca: 'Res' })}</button>)}
          </div>
          <p className="text-white/50 text-xs font-bold mb-1">{tr({ es: 'Terminación', en: 'Ending', ca: 'Terminació' })}</p>
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {['oso', 'ico'].map(s => <button key={s} onClick={() => setSuf(s)} className={chip(suf === s)}>-{s === 'oso' ? tr({ es: 'oso', en: 'ous', ca: 'ós' }) : tr({ es: 'ico', en: 'ic', ca: 'ic' })}</button>)}
          </div>
          <button className={boton} disabled={pre == null || suf == null} onClick={() => onResponder(`${pre}|${suf}`)}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
        </>
      )}
    </>
  )
}

export default function PreguntaFormula({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const props = { r, revelado, elegida, onResponder, l, tr }
  const d = r.mecanica === 'clasifica' ? null : dato(r, l)
  const cuerpo = r.mecanica === 'clasifica' ? <Clasifica {...props} />
    : r.mecanica === 'compone' ? <Compone {...props} />
    : r.mecanica === 'prefija' ? <Prefija {...props} />
    : r.mecanica === 'acido' && r.pide !== 'formula' ? <NombraAcido {...props} />
    : <Construye {...props} />
  const conCruce = revelado && r.comp && !r.comp.nm && r.mecanica !== 'clasifica'
  return (
    <div className="w-full">
      {d && (
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-4 mb-3 text-center">
          {d.formula
            ? <Formula f={d.formula} className="text-white font-black text-4xl" />
            : <p className="text-white font-black text-2xl leading-tight first-letter:uppercase">{d.nombre}</p>}
          {conCruce && <CruceValencias c={r.comp} />}
        </div>
      )}
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      {cuerpo}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
