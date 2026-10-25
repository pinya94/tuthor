// Una ronda de ¿Qué estilo es?, sin opciones: emparejar edificios o arcos
// dibujados con su nombre, u ordenar columnas o edificios del más antiguo al
// más moderno. La usan el juego (contra reloj) y el examen (MechanicExam).
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { enunciado, explicacion, dibujoDe, nombreDe } from '../../lib/queEstilo'
import Edificio from './Edificio'

function Dibujo({ r, it, t }) {
  return <Edificio ronda={dibujoDe(r, it)} t={t} recortado />
}

function Empareja({ r, revelado, onResponder, l, t }) {
  const [sel, setSel] = useState(null)
  const [pares, setPares] = useState({}) // elemento → nombre puesto
  const usados = new Set(Object.values(pares))
  const elige = k => {
    if (revelado || sel == null || usados.has(k)) return
    const n = { ...pares, [sel]: k }
    setPares(n)
    setSel(null)
    if (r.items.every(it => n[it] != null)) onResponder(`empareja:${r.items.filter(it => nombreDe(r, n[it], l) !== nombreDe(r, it, l)).length}`)
  }
  const bien = it => nombreDe(r, pares[it], l) === nombreDe(r, it, l)
  const tono = it => (revelado ? (bien(it) ? 'border-green-400 bg-green-500/10' : 'border-red-400 bg-red-500/10') : sel === it ? 'border-amber-300 bg-amber-300/10' : pares[it] ? 'border-white/30' : 'border-white/10')
  const edificios = r.pregunta === 'estilo'
  return (
    <>
      <div className={`grid gap-2 mb-3 ${edificios ? 'grid-cols-1' : 'grid-cols-3'}`}>
        {r.items.map(it => (
          <button key={it} disabled={revelado} onClick={() => setSel(s => (s === it ? null : it))}
            className={`rounded-xl border-2 bg-[#0b1226] p-1.5 flex ${edificios ? 'flex-row items-center gap-2' : 'flex-col items-center'} ${tono(it)}`}>
            <span className={edificios ? 'w-[58%] shrink-0' : 'w-full'}><Dibujo r={r} it={it} t={t} /></span>
            <span className="flex-1 text-white text-[12px] font-bold leading-tight text-center min-h-[2.2em]">
              {pares[it] ? nombreDe(r, pares[it], l) : edificios ? '?' : ''}
              {revelado && !bien(it) && <span className="block text-green-300">{nombreDe(r, it, l)}</span>}
            </span>
          </button>
        ))}
      </div>
      {!revelado && (
        <div className={`grid gap-1.5 ${edificios ? 'grid-cols-3' : 'grid-cols-1'}`}>
          {r.nombres.map(k => (
            <button key={k} disabled={usados.has(k) || sel == null} onClick={() => elige(k)}
              className="py-2.5 px-1 rounded-xl border border-white/15 bg-white/[0.06] text-white text-sm font-bold disabled:opacity-30">
              {nombreDe(r, k, l)}
            </button>
          ))}
        </div>
      )}
    </>
  )
}

// Ordenar: cada toque da el siguiente número; tocar uno ya numerado lo quita
// (y a los que van detrás).
function Ordena({ r, revelado, elegida, onResponder, tr, t }) {
  const [orden, setOrden] = useState([])
  const mostrado = revelado ? String(elegida ?? '').split('>').filter(Boolean) : orden
  const toca = it => {
    if (revelado) return
    const k = orden.indexOf(it)
    if (k >= 0) { setOrden(orden.slice(0, k)); return }
    const n = [...orden, it]
    setOrden(n)
    if (n.length === r.items.length) onResponder(n.join('>'))
  }
  const columnas = r.pregunta === 'columna'
  return (
    <>
      <div className={`grid gap-2 ${columnas && r.items.length === 3 ? 'grid-cols-3' : columnas ? 'grid-cols-4' : 'grid-cols-2'}`}>
        {r.items.map(it => {
          const k = mostrado.indexOf(it)
          const bueno = r.orden.indexOf(it)
          const color = revelado ? (k === bueno ? 'border-green-400' : 'border-red-400') : k >= 0 ? 'border-amber-300' : 'border-white/10'
          return (
            <button key={it} disabled={revelado} onClick={() => toca(it)} className={`relative rounded-xl border-2 bg-[#0b1226] p-1 ${color}`}>
              <Dibujo r={r} it={it} t={t} />
              {k >= 0 && <span className={`absolute top-1 left-1 w-6 h-6 rounded-full text-sm font-black flex items-center justify-center ${revelado ? (k === bueno ? 'bg-green-400 text-black' : 'bg-red-400 text-black') : 'bg-amber-300 text-black'}`}>{k + 1}</span>}
              {revelado && k !== bueno && <span className="absolute top-1 right-1 w-6 h-6 rounded-full bg-green-400/90 text-black text-sm font-black flex items-center justify-center">{bueno + 1}</span>}
            </button>
          )
        })}
      </div>
      {!revelado && (
        <p className="text-white/40 text-xs text-center mt-2">
          {tr({ es: '1 = el más antiguo · toca otra vez para quitarlo', en: '1 = the oldest · tap again to remove it', ca: '1 = el més antic · torna-hi a tocar per treure’l' })}
        </p>
      )}
    </>
  )
}

export default function PreguntaEstilo({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const t = { aria: tr({ es: 'Dibujo de arquitectura', en: 'Architectural drawing', ca: 'Dibuix d’arquitectura' }) }
  const props = { r: ronda, revelado, elegida, onResponder, l, tr, t }
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(ronda, l)}</p>
      {ronda.mecanica === 'ordena' ? <Ordena {...props} /> : <Empareja {...props} />}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
