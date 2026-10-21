// Una ronda de El Laboratorio, sin opciones: las mezclas se llevan al
// instrumento que las separa (o a homogénea / heterogénea), los métodos se
// unen con su propiedad y, con tres componentes, se montan los pasos en
// orden eligiéndolos entre más instrumentos de los que hacen falta. La usan
// el juego (contra reloj) y el examen (MechanicExam).
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { METODOS, MEZCLAS, PROPIEDADES, enunciado, explicacion, nombreMezcla, nombreMetodo, nombreDe, nombreCaja, cajaDe, esCorrecta, respuestaBuena } from '../../lib/laboratorio'
import VasoMezcla from './VasoMezcla'

const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const tx = (o, l) => o[l] ?? o.es
const vasoDe = id => { const m = MEZCLAS.find(x => x.id === id); return { mezcla: m.id, componentes: m.componentes, seco: !!m.seco } }

function Clasifica({ r, revelado, onResponder, l, tr }) {
  const [puestas, setPuestas] = useState({})
  const activa = r.items.findIndex(i => !puestas[i])
  const pon = c => {
    if (revelado || activa < 0) return
    const n = { ...puestas, [r.items[activa]]: c }
    setPuestas(n)
    if (r.items.every(i => n[i])) onResponder(`clasifica:${r.items.filter(i => n[i] !== cajaDe(r, i)).length}`)
  }
  const item = activa >= 0 ? r.items[activa] : null
  return (
    <>
      {item && !revelado && (
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
          <p className="text-white/40 text-xs text-center">{activa + 1} / {r.items.length}</p>
          <p className="text-white font-black text-center leading-tight">{nombreDe(item, l)}</p>
          <div className="max-w-[210px] mx-auto"><VasoMezcla ronda={vasoDe(item)} aria={tr({ es: 'Vaso con la mezcla', en: 'Beaker with the mixture', ca: 'Got amb la mescla' })} /></div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        {r.cajas.map(c => (
          <button key={c} disabled={revelado || activa < 0} onClick={() => pon(c)} className="rounded-xl border-2 border-dashed border-white/20 bg-white/[0.04] hover:bg-white/[0.08] p-2 min-h-[4.5rem] text-left">
            <span className="block text-white font-black text-[13px]">{r.tipo !== 'tipo' && <span className="mr-1">{METODOS[c].emoji}</span>}{nombreCaja(r, c, l)}</span>
            {r.items.filter(i => puestas[i] === c).map(i => (
              <span key={i} className={`block mt-1 rounded-md px-1.5 py-1 text-[11.5px] font-bold text-white leading-tight ${revelado ? (cajaDe(r, i) === c ? 'bg-green-500/25 ring-1 ring-green-400' : 'bg-red-500/25 ring-1 ring-red-400') : 'bg-white/10'}`}>
                {nombreDe(i, l)}
                {revelado && cajaDe(r, i) !== c && <span className="block text-green-300">→ {nombreCaja(r, cajaDe(r, i), l)}</span>}
              </span>
            ))}
          </button>
        ))}
      </div>
    </>
  )
}

// Une cada método (izquierda) con su propiedad (derecha): toca uno y luego el otro.
function Empareja({ r, revelado, onResponder, l, tr }) {
  const [pares, setPares] = useState({})
  const [sel, setSel] = useState(r.metodos.find(m => !pares[m]))
  const unidas = Object.values(pares)
  const une = p => {
    if (revelado || !sel) return
    const n = { ...Object.fromEntries(Object.entries(pares).filter(([, v]) => v !== p)), [sel]: p }
    setPares(n)
    setSel(r.metodos.find(m => !n[m]) ?? null)
  }
  const listo = r.metodos.every(m => pares[m])
  const estado = m => (revelado ? (pares[m] === METODOS[m].propiedad ? 'border-green-400 bg-green-500/15' : 'border-red-400 bg-red-500/15') : sel === m ? 'border-amber-300 bg-amber-300/15' : 'border-white/15 bg-white/[0.05]')
  const letra = m => String.fromCharCode(65 + r.metodos.indexOf(m))
  return (
    <>
      <div className="grid grid-cols-[0.8fr_1.2fr] gap-2 mb-3">
        <div className="space-y-2">
          {r.metodos.map(m => (
            <button key={m} disabled={revelado} onClick={() => setSel(m)} className={`w-full min-h-[3.6rem] rounded-xl border-2 px-2 py-1.5 text-left text-white text-sm font-black ${estado(m)}`}>
              <span className="text-amber-300 mr-1">{letra(m)}</span>{METODOS[m].emoji} {nombreMetodo(m, l)}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {r.props.map(p => {
            const de = r.metodos.find(m => pares[m] === p)
            return (
              <button key={p} disabled={revelado} onClick={() => une(p)} className={`w-full min-h-[3.6rem] rounded-xl border px-2 py-1.5 text-left text-white text-[12px] font-bold leading-snug ${de ? 'border-white/30 bg-white/[0.08]' : 'border-white/15 bg-white/[0.03]'}`}>
                {de && <span className="text-amber-300 font-black mr-1">{letra(de)}</span>}{tx(PROPIEDADES[p], l)}
              </button>
            )
          })}
        </div>
      </div>
      {revelado
        ? !r.metodos.every(m => pares[m] === METODOS[m].propiedad) && <p className="text-green-300 text-sm font-bold text-center mb-1">{r.metodos.map(m => `${letra(m)} → ${tx(PROPIEDADES[METODOS[m].propiedad], l).split(':')[0]}`).join(' · ')}</p>
        : <button className={boton} disabled={!listo || unidas.length < r.metodos.length} onClick={() => onResponder(`empareja:${r.metodos.filter(m => pares[m] !== METODOS[m].propiedad).length}`)}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>}
    </>
  )
}

// Monta los pasos: toca instrumentos de la mesa para ir llenando los huecos.
function Ordena({ r, revelado, elegida, onResponder, l, tr }) {
  const [pasos, setPasos] = useState([])
  const pon = m => { if (!revelado && pasos.length < r.huecos && !pasos.includes(m)) setPasos([...pasos, m]) }
  const quita = k => { if (!revelado) setPasos(pasos.filter((_, i) => i !== k)) }
  const ok = revelado && esCorrecta(r, elegida)
  const mostrados = revelado ? String(elegida ?? '').split('>').filter(Boolean) : pasos
  return (
    <>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
        <p className="text-white font-black text-center leading-tight">{nombreMezcla(r, l)}</p>
        <div className="max-w-[210px] mx-auto"><VasoMezcla ronda={r} aria={tr({ es: 'Vaso con la mezcla', en: 'Beaker with the mixture', ca: 'Got amb la mescla' })} /></div>
      </div>
      <div className="space-y-1.5 mb-3">
        {Array.from({ length: r.huecos }, (_, k) => {
          const m = mostrados[k]
          return (
            <button key={k} disabled={revelado || !m} onClick={() => quita(k)}
              className={`w-full flex items-center gap-2 rounded-xl border-2 px-3 py-2 text-left text-white text-sm font-bold ${revelado ? (ok ? 'border-green-400 bg-green-500/15' : 'border-red-400 bg-red-500/15') : m ? 'border-white/25 bg-white/[0.07]' : 'border-dashed border-amber-300/50 bg-amber-300/5'}`}>
              <span className="text-amber-300 font-black w-5">{k + 1}.</span>
              {m ? <>{METODOS[m].emoji} {nombreMetodo(m, l)}{!revelado && <span className="ml-auto text-white/40 text-xs">✕</span>}</> : <span className="text-white/35">…</span>}
            </button>
          )
        })}
      </div>
      {revelado
        ? !ok && <p className="text-green-300 text-sm font-bold text-center">{respuestaBuena(r).split('>').map(m => nombreMetodo(m, l)).join(' → ')}</p>
        : (
          <>
            <div className="grid grid-cols-2 gap-1.5 mb-3">
              {r.paleta.map(m => (
                <button key={m} disabled={pasos.includes(m) || pasos.length >= r.huecos} onClick={() => pon(m)}
                  className="rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 py-2 px-2 text-white text-sm font-bold disabled:opacity-30">
                  {METODOS[m].emoji} {nombreMetodo(m, l)}
                </button>
              ))}
            </div>
            <button className={boton} disabled={pasos.length < r.huecos} onClick={() => onResponder(pasos.join('>'))}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
          </>
        )}
    </>
  )
}

export default function PreguntaLab({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const props = { r: ronda, revelado, elegida, onResponder, l, tr }
  const cuerpo = ronda.mecanica === 'clasifica' ? <Clasifica {...props} />
    : ronda.mecanica === 'empareja' ? <Empareja {...props} />
    : <Ordena {...props} />
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(ronda, l)}</p>
      {cuerpo}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
