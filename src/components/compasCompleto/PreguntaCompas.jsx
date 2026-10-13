// Una ronda de Compás Completo: la figura suelta o el compás dibujado en el
// pentagrama. En «¿qué compás es?» no se pinta la cifra de compás (es la
// respuesta); al corregir aparece.
import { useLang } from '../../context/LangContext'
import Pentagrama from './Pentagrama'
import { deClave, enunciado, textoOpcion, explicacion } from '../../lib/compasCompleto'

export default function PreguntaCompas({ ronda, revelado, elegida, onResponder }) {
  const { lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const notas = r.notas ? r.notas.map(k => (k === '|' ? '|' : deClave(k))) : [deClave(r.figura)]
  const compas = r.tipo === 'hueco' ? r.compas : r.tipo === 'compas' && revelado ? r.compas : null
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-4 mb-3 flex justify-center">
        <Pentagrama notas={notas} compas={compas} hueco={r.tipo === 'hueco' ? r.hueco : -1} revelado={revelado} final={!!r.notas}
          className={r.notas ? 'w-full block mx-auto' : 'w-48 block mx-auto'} />
      </div>
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      <div className={`grid gap-2 ${r.opciones.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {r.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-3 px-2 rounded-xl border text-white text-[15px] font-bold leading-snug transition-all ${clase(o)}`}>
            {textoOpcion(o, r, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
