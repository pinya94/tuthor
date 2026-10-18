// Una ronda de Pirámide de población (ver lib/piramide): se toca la fila de la
// pirámide que pide el enunciado o se coloca cada pirámide pequeña en la caja
// de su tipo. La usan el juego (contra reloj) y el examen (MechanicExam).
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { enunciado, explicacion, NOMBRE_TIPO } from '../../lib/piramide'
import PiramideSVG from './PiramideSVG'

function Clasifica({ r, revelado, onResponder, tr, l, t }) {
  const [puestas, setPuestas] = useState({})
  const activa = r.piramides.findIndex((_, i) => puestas[i] == null)
  const colocar = c => {
    if (revelado || activa < 0) return
    const n = { ...puestas, [activa]: c }
    setPuestas(n)
    if (r.piramides.every((_, i) => n[i] != null)) onResponder(`clasifica:${r.piramides.filter((x, i) => n[i] !== x.tipo).length}`)
  }
  const nom = c => NOMBRE_TIPO[c][l] ?? NOMBRE_TIPO[c].es
  return (
    <>
      {activa >= 0 && !revelado && (
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
          <p className="text-white/40 text-xs text-center">{activa + 1} / {r.piramides.length}</p>
          <PiramideSVG ronda={r.piramides[activa]} revelado={false} t={t} className="w-full h-auto max-h-[300px]" />
        </div>
      )}
      <div className="grid grid-cols-3 gap-2">
        {r.cajas.map(c => (
          <button key={c} disabled={revelado || activa < 0} onClick={() => colocar(c)} className="rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] px-1.5 py-2 min-h-[4.5rem] text-center">
            <span className="block text-white text-[12px] font-black leading-tight">{nom(c)}</span>
            <span className="grid grid-cols-2 gap-1 mt-1">
              {r.piramides.map((x, i) => puestas[i] === c && (
                <span key={i} className={`rounded-md p-0.5 ${revelado ? (x.tipo === c ? 'ring-2 ring-green-400' : 'ring-2 ring-red-400') : 'ring-1 ring-white/20'}`}>
                  <PiramideSVG ronda={x} revelado={false} t={t} etiquetas={false} />
                </span>
              ))}
            </span>
            {revelado && r.piramides.some((x, i) => puestas[i] === c && x.tipo !== c) && (
              <span className="block text-[10px] text-red-300 mt-1 leading-tight">→ {r.piramides.filter((x, i) => puestas[i] === c && x.tipo !== c).map(x => nom(x.tipo)).join(', ')}</span>
            )}
          </button>
        ))}
      </div>
      {!revelado && <p className="text-white/40 text-[11px] text-center mt-2">{tr({ es: 'Toca la caja del tipo de esta pirámide', en: 'Tap the box for this pyramid’s type', ca: 'Toca la caixa del tipus d’aquesta piràmide' })}</p>}
    </>
  )
}

export default function PreguntaPiramide({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const t = {
    aria: tr({ es: 'Pirámide de población', en: 'Population pyramid', ca: 'Piràmide de població' }),
    hombres: tr({ es: 'Hombres', en: 'Men', ca: 'Homes' }),
    mujeres: tr({ es: 'Mujeres', en: 'Women', ca: 'Dones' }),
  }
  const tocada = elegida != null && /^\d+$/.test(String(elegida)) ? Number(elegida) : null
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(ronda, l)}</p>
      {ronda.mecanica === 'clasifica'
        ? <Clasifica r={ronda} revelado={revelado} onResponder={onResponder} tr={tr} l={l} t={t} />
        : (
          <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2">
            <PiramideSVG ronda={ronda} revelado={revelado} t={t} onFila={revelado ? null : i => onResponder(String(i))}
              verdes={ronda.validos} rojas={tocada != null && !ronda.validos.includes(tocada) ? [tocada] : []} />
          </div>
        )}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
