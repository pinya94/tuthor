// Una ronda de La Biblioteca (solo castellano):
//   estanteria / generos  baldas de madera (por época, en orden, o por
//                         género); se toca un libro y luego su balda
//   autores / rasgos      unir cada libro (o descripción) con su autor (o época)
//   orden                 tocar los libros del más antiguo al más moderno
import { useState } from 'react'
import { OBRAS, EPOCAS, enunciado, explicacion, cajaDe, nombreCaja, anyo } from '../../lib/laBiblioteca'

const LOMOS = ['#7C2D12', '#1E3A8A', '#14532D', '#581C87', '#9A3412', '#0F766E', '#7F1D1D', '#3F3F46']
const COLORES = ['bg-sky-500', 'bg-fuchsia-500', 'bg-amber-500', 'bg-emerald-500']
const lomo = k => LOMOS[k % LOMOS.length]

function Libro({ k, activo, onClick, pequeno }) {
  return (
    <button type="button" onClick={onClick}
      className={`rounded-md text-left text-white shadow-md transition-all border-l-[6px] border-black/30 ${pequeno ? 'px-1.5 py-1 text-[10.5px] max-w-[7.5rem]' : 'px-3 py-2 text-[14px]'} ${activo ? 'ring-2 ring-amber-300 scale-[1.03]' : ''}`}
      style={{ background: lomo(k) }}>
      <span className="block font-serif font-bold leading-tight">{OBRAS[k].titulo}</span>
    </button>
  )
}

// Baldas: se toca un libro de arriba y luego la balda.
function Baldas({ r, revelado, onResponder }) {
  const [puestas, setPuestas] = useState({})
  const [activo, setActivo] = useState(r.libros[0])
  const colocar = c => {
    if (revelado || activo == null) return
    const n = { ...puestas, [activo]: c }
    setPuestas(n)
    const sig = r.libros.find(k => !n[k])
    setActivo(sig ?? null)
    if (sig == null) onResponder(`clasifica:${r.libros.filter(k => n[k] !== cajaDe(r, k)).length}`)
  }
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r)}</p>
      <div className="flex flex-wrap justify-center gap-2 mb-3 min-h-[3rem]">
        {r.libros.filter(k => !puestas[k]).map(k => <Libro key={k} k={k} activo={activo === k} onClick={() => setActivo(k)} />)}
      </div>
      <div className="space-y-2">
        {r.cajas.map(c => (
          <button key={c} disabled={revelado || activo == null} onClick={() => colocar(c)} className="block w-full text-left">
            <span className="flex items-end gap-1.5 min-h-[2.4rem] px-2 flex-wrap">
              {r.libros.filter(k => puestas[k] === c).map(k => (
                <span key={k} className={`rounded-md ${revelado ? (cajaDe(r, k) === c ? 'ring-2 ring-green-400' : 'ring-2 ring-red-400') : ''}`}><Libro k={k} pequeno /></span>
              ))}
            </span>
            <span className="block h-2.5 rounded-sm bg-gradient-to-b from-[#a16207] to-[#713f12] shadow" />
            <span className="block text-amber-100/80 text-[12px] font-bold mt-0.5 px-1">{nombreCaja(r, c)}</span>
          </button>
        ))}
      </div>
    </>
  )
}

// Unir: libros con autores, o descripciones con épocas.
function Unir({ r, revelado, onResponder }) {
  const izq = r.tipo === 'autores' ? r.libros : r.epocas
  const der = r.tipo === 'autores' ? r.autores : r.nombres
  const bueno = x => (r.tipo === 'autores' ? OBRAS[x].autor : x)
  const [union, setUnion] = useState({})
  const [activo, setActivo] = useState(izq[0])
  const une = v => {
    if (revelado || activo == null) return
    const n = Object.fromEntries(Object.entries(union).filter(([, x]) => x !== v))
    n[activo] = v
    setUnion(n)
    const sig = izq.find(x => !n[x])
    setActivo(sig ?? null)
    if (sig == null) onResponder(`${r.tipo}:${izq.filter(x => n[x] !== bueno(x)).length}`)
  }
  const colorDe = v => { const k = izq.findIndex(x => union[x] === v); return k >= 0 ? COLORES[k] : 'bg-white/15' }
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r)}</p>
      <div className="space-y-1.5 mb-3">
        {izq.map((x, k) => {
          const bien = revelado && union[x] === bueno(x)
          return (
            <button key={x} onClick={() => !revelado && setActivo(x)}
              className={`block w-full text-left rounded-xl px-3 py-2 transition-all ${activo === x && !revelado ? 'bg-white/15 ring-2 ring-amber-300' : 'bg-white/5'} ${revelado ? (bien ? 'ring-2 ring-green-400' : 'ring-2 ring-red-400') : ''}`}>
              <span className="flex items-start gap-2">
                <span className={`mt-1 w-3 h-3 rounded-full shrink-0 ${union[x] ? COLORES[k] : 'bg-white/15'}`} />
                <span className={`text-white leading-snug ${r.tipo === 'autores' ? 'font-serif font-bold text-[15px]' : 'text-[13.5px]'}`}>{r.tipo === 'autores' ? OBRAS[x].titulo : EPOCAS[x].rasgos[0]}</span>
              </span>
              {revelado && <span className={`block text-xs font-bold mt-1 ${bien ? 'text-green-300' : 'text-red-300'}`}>{r.tipo === 'autores' ? `${OBRAS[x].autor} · ${anyo(OBRAS[x])}` : EPOCAS[x].nombre}</span>}
            </button>
          )
        })}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {der.map(v => (
          <button key={v} disabled={revelado} onClick={() => une(v)} className="rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] py-2 px-2 text-white text-[13px] font-bold flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full shrink-0 ${colorDe(v)}`} />{r.tipo === 'autores' ? v : EPOCAS[v].nombre}
          </button>
        ))}
      </div>
    </>
  )
}

function Orden({ r, revelado, onResponder }) {
  const [seq, setSeq] = useState([])
  const bueno = r.bueno.split(',').map(Number)
  const toca = k => {
    if (revelado || seq.includes(k)) return
    const s2 = [...seq, k]
    setSeq(s2)
    if (s2.length === r.libros.length) onResponder(s2.join(','))
  }
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r)}</p>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
        <div className="flex items-end gap-1.5 min-h-[4.5rem] px-1">
          {r.libros.map((_, i) => {
            const k = seq[i]
            return (
              <div key={i} className="flex-1 text-center">
                {k != null
                  ? <span className={`block rounded-md ${revelado ? (k === bueno[i] ? 'ring-2 ring-green-400' : 'ring-2 ring-red-400') : ''}`}><Libro k={k} pequeno /></span>
                  : <span className="block h-12 rounded-md border border-dashed border-white/20" />}
                {revelado && <span className="block text-[10px] mt-1" style={{ color: k === bueno[i] ? '#4ADE80' : '#94A3B8' }}>{k === bueno[i] ? anyo(OBRAS[k]) : OBRAS[bueno[i]].titulo}</span>}
              </div>
            )
          })}
        </div>
        <span className="block h-2.5 rounded-sm bg-gradient-to-b from-[#a16207] to-[#713f12] mt-1" />
        <p className="flex justify-between text-[10px] text-white/40 font-bold mt-1 px-1"><span>← más antiguo</span><span>más moderno →</span></p>
      </div>
      {!revelado && (
        <div className="flex flex-wrap justify-center gap-2">
          {r.libros.filter(k => !seq.includes(k)).map(k => <Libro key={k} k={k} onClick={() => toca(k)} />)}
          {seq.length > 0 && <button onClick={() => setSeq(seq.slice(0, -1))} className="w-full py-2 rounded-xl text-white/60 text-sm font-bold bg-white/[0.03]">↶ Deshacer</button>}
        </div>
      )}
    </>
  )
}

export default function PreguntaLibro({ ronda, revelado, onResponder }) {
  const props = { r: ronda, revelado, onResponder }
  return (
    <div className="w-full">
      {ronda.tipo === 'estanteria' || ronda.tipo === 'generos' ? <Baldas {...props} />
        : ronda.tipo === 'orden' ? <Orden {...props} />
        : <Unir {...props} />}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda)}</p>}
    </div>
  )
}
