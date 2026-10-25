// Una ronda de La Galería, sin opciones: llevar tres cuadros a la sala de su
// estilo o tres obras a su pintor, tocar el estilo de una obra (o de unos
// rasgos) en la línea de estilos, u ordenar cuatro obras en el tiempo. En los
// cuadros reales la cartela no sale hasta responder: el título delataría la
// respuesta. La usan el juego (contra reloj) y el examen (MechanicExam).
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import Cuadro from './Cuadro'
import { OBRAS, ESTILOS, ORDEN_ESTILOS, obra, enunciado, explicacion, tx, infoItem, claveItem } from '../../lib/laGaleria'

function Cartela({ o, conPintor, conAnyo = true, l, chica = false }) {
  return (
    <div className={`mx-auto rounded-md bg-[#F5F1E8] text-[#1F2937] shadow-lg text-left ${chica ? 'px-2.5 py-2 w-full' : 'max-w-[280px] px-4 py-3'}`}>
      <p className={`font-serif font-bold leading-tight ${chica ? 'text-[13px]' : 'text-lg'}`}>{tx(o.titulo, l)}</p>
      <p className={`mt-1 text-[#4B5563] ${chica ? 'text-[11px]' : 'text-sm'}`}>{conPintor ? (conAnyo ? `${o.pintor}, ${o.anyo}` : o.pintor) : '?'}</p>
    </div>
  )
}

function Obra({ o, l, alto = 'max-h-48 sm:max-h-64' }) {
  return (
    <figure className="mx-auto w-fit">
      <div className="rounded-sm bg-[#3b2a1a] p-1 shadow-xl ring-1 ring-[#c9a24b]/60">
        <img src={`/galeria/${o.img}.webp`} alt={tx(o.titulo, l)} draggable={false}
          className={`block ${alto} w-auto max-w-full select-none`} />
      </div>
    </figure>
  )
}

function Empareja({ r, revelado, onResponder, l }) {
  const [sel, setSel] = useState(null)
  const [pares, setPares] = useState({}) // elemento → nombre puesto
  const usados = new Set(Object.values(pares))
  const nombre = k => (r.tipo === 'pintor' ? k : tx(ESTILOS[k].nombre, l))
  const elige = k => {
    if (revelado || sel == null || usados.has(k)) return
    const n = { ...pares, [sel]: k }
    setPares(n)
    setSel(null)
    if (r.items.every(it => n[it] != null)) onResponder(`empareja:${r.items.filter(it => n[it] !== claveItem(r, it)).length}`)
  }
  const bien = it => pares[it] === claveItem(r, it)
  const tono = it => (revelado ? (bien(it) ? 'border-green-400 bg-green-500/10' : 'border-red-400 bg-red-500/10') : sel === it ? 'border-amber-300 bg-amber-300/10' : pares[it] ? 'border-white/30' : 'border-white/10')
  const dibujo = it => {
    const x = infoItem(it)
    if (x.obra == null) return <Cuadro estilo={x.estilo} semilla={x.semilla} className="w-full max-w-[150px] mx-auto block" />
    const o = OBRAS[x.obra]
    if (r.tipo === 'pintor') return <Cartela o={o} conPintor={revelado} conAnyo l={l} chica />
    return (
      <>
        <Obra o={o} l={l} alto="max-h-28" />
        {revelado && <p className="mt-1 text-white/60 text-[10px] leading-tight text-center">{tx(o.titulo, l)} · {o.anyo}</p>}
      </>
    )
  }
  return (
    <>
      <div className="grid grid-cols-1 gap-2 mb-3">
        {r.items.map(it => (
          <button key={it} disabled={revelado} onClick={() => setSel(s => (s === it ? null : it))}
            className={`rounded-xl border-2 bg-[#0b1226] p-2 flex items-center gap-2 ${tono(it)}`}>
            <span className="w-[58%] shrink-0">{dibujo(it)}</span>
            <span className="flex-1 text-white text-[13px] font-bold leading-tight text-center">
              {pares[it] ? nombre(pares[it]) : '?'}
              {revelado && !bien(it) && <span className="block text-green-300">{nombre(claveItem(r, it))}</span>}
            </span>
          </button>
        ))}
      </div>
      {!revelado && (
        <div className={`grid gap-1.5 ${r.tipo === 'pintor' ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {r.nombres.map(k => (
            <button key={k} disabled={usados.has(k) || sel == null} onClick={() => elige(k)}
              className="py-2.5 px-1 rounded-xl border border-white/15 bg-white/[0.06] text-white text-sm font-bold leading-tight disabled:opacity-30">
              {nombre(k)}
            </button>
          ))}
        </div>
      )}
    </>
  )
}

// La línea de estilos, de la Edad Media al pop art: se toca el bueno.
function Linea({ r, revelado, elegida, onResponder, l }) {
  const o = obra(r)
  const tarjeta = o ? (
    <>
      {o.img && r.fuente === 'real' && <Obra o={o} l={l} />}
      <div className="mt-3"><Cartela o={o} conPintor l={l} /></div>
    </>
  ) : <p className="text-white font-bold text-lg leading-snug text-center">{tx(ESTILOS[r.bueno].rasgo, l)}</p>
  return (
    <>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-4 mb-3">{tarjeta}</div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
        {ORDEN_ESTILOS.map((e, i) => {
          const color = revelado ? (e === r.bueno ? 'bg-green-500/30 text-green-100 ring-2 ring-green-400' : e === elegida ? 'bg-red-500/30 text-red-100 ring-2 ring-red-400' : 'bg-white/5 text-white/35')
            : 'bg-white/[0.07] text-white hover:bg-white/[0.14] active:scale-95'
          return (
            <button key={e} disabled={revelado} onClick={() => onResponder(e)} className={`rounded-lg px-1 py-2 text-[11px] font-bold leading-tight break-words hyphens-auto ${color}`}>
              <span className="block text-[9px] text-white/35">{i + 1}</span>
              {tx(ESTILOS[e].nombre, l)}
            </button>
          )
        })}
      </div>
    </>
  )
}

function Ordena({ r, revelado, elegida, onResponder, l, tr }) {
  const [orden, setOrden] = useState([])
  const mostrado = revelado ? String(elegida ?? '').split('>').filter(Boolean).map(Number) : orden
  const toca = k => {
    if (revelado) return
    const p = orden.indexOf(k)
    if (p >= 0) { setOrden(orden.slice(0, p)); return }
    const n = [...orden, k]
    setOrden(n)
    if (n.length === r.items.length) onResponder(n.join('>'))
  }
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {r.items.map(k => {
          const o = OBRAS[k]
          const p = mostrado.indexOf(k)
          const bueno = r.orden.indexOf(k)
          const color = revelado ? (p === bueno ? 'border-green-400' : 'border-red-400') : p >= 0 ? 'border-amber-300' : 'border-white/10'
          return (
            <button key={k} disabled={revelado} onClick={() => toca(k)} className={`relative rounded-xl border-2 bg-[#0b1226] p-2 flex flex-col items-center justify-center gap-1.5 ${color}`}>
              {o.img && r.fuente === 'real' && <Obra o={o} l={l} alto="max-h-24" />}
              <Cartela o={o} conPintor conAnyo={revelado} l={l} chica />
              {p >= 0 && <span className={`absolute top-1 left-1 w-6 h-6 rounded-full text-sm font-black flex items-center justify-center text-black ${revelado ? (p === bueno ? 'bg-green-400' : 'bg-red-400') : 'bg-amber-300'}`}>{p + 1}</span>}
              {revelado && p !== bueno && <span className="absolute top-1 right-1 w-6 h-6 rounded-full bg-green-400 text-black text-sm font-black flex items-center justify-center">{bueno + 1}</span>}
            </button>
          )
        })}
      </div>
      {!revelado && <p className="text-white/40 text-xs text-center mt-2">{tr({ es: '1 = la más antigua · toca otra vez para quitarla', en: '1 = the oldest · tap again to remove it', ca: '1 = la més antiga · torna-hi a tocar per treure-la' })}</p>}
    </>
  )
}

export default function PreguntaGaleria({ ronda, revelado, elegida, onResponder }) {
  const { lang, tr } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const props = { r: ronda, revelado, elegida, onResponder, l, tr }
  const cuerpo = ronda.mecanica === 'linea' ? <Linea {...props} /> : ronda.mecanica === 'ordena' ? <Ordena {...props} /> : <Empareja {...props} />
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(ronda, l)}</p>
      {cuerpo}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
