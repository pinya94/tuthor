// Una ronda de Oferta y demanda: la noticia (o las ecuaciones), el gráfico,
// la pregunta y las opciones. La usan el juego (contra reloj) y el examen.
import { useLang } from '../../context/LangContext'
import { enunciado, textoOpcion, explicacion, noticiaDe, ecuacionesTexto, letraOferta } from '../../lib/ofertaDemanda'
import GraficoMercado from './GraficoMercado'

export default function PreguntaMercado({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const n = ronda.noticia !== undefined ? noticiaDe(ronda) : null
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === ronda.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  const columnas = ronda.tipo === 'exceso' || ronda.opciones.length === 5 ? 'grid-cols-1' : 'grid-cols-2'
  return (
    <div className="w-full">
      {n ? (
        <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 mb-2">
          <p className="text-white/40 text-[10.5px] font-bold uppercase tracking-wide">📰 {tr({ es: 'Noticia', en: 'News', ca: 'Notícia' })}</p>
          <p className="text-white font-bold leading-snug">{n.texto[l] ?? n.texto.es}</p>
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 mb-2 flex flex-wrap justify-center gap-x-5 gap-y-1 font-mono text-[14px]">
          <span className="text-sky-300 font-bold">{ecuacionesTexto(ronda, l).qd}</span>
          <span className="text-pink-300 font-bold">{ecuacionesTexto(ronda, l).qs}</span>
        </div>
      )}
      <p className="text-white/85 text-sm text-center mb-2 leading-snug">{enunciado(ronda, l)}</p>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
        <GraficoMercado ronda={ronda} revelado={revelado} t={{
          aria: tr({ es: 'Gráfico de oferta y demanda', en: 'Supply and demand graph', ca: 'Gràfic d’oferta i demanda' }),
          precio: 'P', cantidad: 'Q', oferta: letraOferta(l),
          alolargo: tr({ es: 'a lo largo de D', en: 'along D', ca: 'al llarg de D' }),
          escasez: tr({ es: 'escasez', en: 'shortage', ca: 'escassetat' }),
          excedente: tr({ es: 'excedente', en: 'surplus', ca: 'excedent' }),
        }} />
      </div>
      <div className={`grid gap-2 ${columnas}`}>
        {ronda.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-2.5 px-3 rounded-xl border text-white text-sm font-bold tabular-nums transition-all ${clase(o)}`}>
            {textoOpcion(o, ronda, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
