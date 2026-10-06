// Una ronda de Rebajas: la etiqueta del producto con el recorrido del precio
// (precio → % → precio), la pregunta y las opciones. La incógnita es un «?»
// que al corregir se convierte en la respuesta. Para comparar ofertas, dos
// tiendas lado a lado. La usan el juego (contra reloj) y el examen.
import { useLang } from '../../context/LangContext'
import { PRODUCTOS, IVA, enunciado, textoOpcion, explicacion, nombreProducto, textoOferta, eur, pct } from '../../lib/rebajas'

function Precio({ valor, nota, incognita, revelado, tachado }) {
  const oculto = incognita && !revelado
  return (
    <div className={`min-w-0 rounded-xl px-2.5 py-2 text-center border ${incognita ? (revelado ? 'border-green-400/60 bg-green-500/15' : 'border-dashed border-amber-300/70 bg-amber-300/10') : 'border-white/10 bg-white/[0.05]'}`}>
      {nota && <p className="text-white/45 text-[10.5px] font-bold uppercase tracking-wide leading-tight">{nota}</p>}
      <p className={`font-black tabular-nums leading-tight text-[19px] sm:text-[22px] ${oculto ? 'text-amber-300' : incognita ? 'text-green-300' : 'text-white'} ${tachado && revelado ? 'line-through decoration-red-400/80' : ''}`}>
        {oculto ? '?' : valor}
      </p>
    </div>
  )
}

function Etiqueta({ texto, nota, incognita, revelado, sube }) {
  const oculto = incognita && !revelado
  return (
    <div className="shrink-0 text-center">
      <span className={`inline-block rounded-full px-2.5 py-1 font-black text-[14px] tabular-nums ${oculto ? 'bg-amber-300/20 text-amber-200 border border-dashed border-amber-300/70' : sube ? 'bg-sky-500/80 text-white' : 'bg-red-500/85 text-white'}`}>
        {oculto ? (sube ? '+? %' : '−? %') : texto}
      </span>
      {nota && <p className="text-white/45 text-[10px] font-bold mt-0.5 leading-tight">{nota}</p>}
    </div>
  )
}

const Flecha = () => <span className="shrink-0 text-white/30 font-black">→</span>

export default function PreguntaRebajas({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const prod = PRODUCTOS[r.producto]
  const e = c => eur(c, l)
  const signo = p => (p > 0 ? '+' : '−') + pct(Math.abs(p), l)
  const T = {
    antes: tr({ es: 'Antes', en: 'Before', ca: 'Abans' }),
    ahora: tr({ es: 'Ahora', en: 'Now', ca: 'Ara' }),
    pagas: tr({ es: 'Pagas', en: 'You pay', ca: 'Pagues' }),
    ahorras: tr({ es: 'Te ahorras', en: 'You save', ca: 'T’estalvies' }),
    sinIva: tr({ es: 'Sin IVA', en: 'Without VAT', ca: 'Sense IVA' }),
    conIva: tr({ es: 'Con IVA', en: 'With VAT', ca: 'Amb IVA' }),
    iva: tr({ es: 'IVA', en: 'VAT', ca: 'IVA' }),
    final: tr({ es: 'Al final', en: 'In the end', ca: 'Al final' }),
    rebaja: tr({ es: 'rebaja', en: 'sale', ca: 'rebaixa' }),
    extra: tr({ es: 'extra en caja', en: 'extra at the till', ca: 'extra a la caixa' }),
    sube: tr({ es: 'sube', en: 'goes up', ca: 'puja' }),
    baja: tr({ es: 'baja', en: 'goes down', ca: 'baixa' }),
  }

  let flujo
  switch (r.tipo) {
    case 'final': flujo = [<Precio revelado={revelado} key="a" nota={T.antes} valor={e(r.antes)} tachado />, <Etiqueta revelado={revelado} key="b" texto={signo(r.pct)} />, <Precio revelado={revelado} key="c" nota={T.pagas} valor={e(r.bueno)} incognita />]; break
    case 'ahorro': flujo = [<Precio revelado={revelado} key="a" nota={T.antes} valor={e(r.antes)} />, <Etiqueta revelado={revelado} key="b" texto={signo(r.pct)} />, <Precio revelado={revelado} key="c" nota={T.ahorras} valor={e(r.bueno)} incognita />]; break
    case 'quePct': flujo = [<Precio revelado={revelado} key="a" nota={T.antes} valor={e(r.antes)} tachado />, <Etiqueta revelado={revelado} key="b" texto={signo(-r.bueno)} incognita />, <Precio revelado={revelado} key="c" nota={T.ahora} valor={e(r.ahora)} />]; break
    case 'iva': flujo = [<Precio revelado={revelado} key="a" nota={T.sinIva} valor={e(r.sinIva)} />, <Etiqueta revelado={revelado} key="b" texto={signo(IVA)} nota={T.iva} sube />, <Precio revelado={revelado} key="c" nota={T.conIva} valor={e(r.bueno)} incognita />]; break
    case 'sinIva': flujo = [<Precio revelado={revelado} key="a" nota={T.sinIva} valor={e(r.bueno)} incognita />, <Etiqueta revelado={revelado} key="b" texto={signo(IVA)} nota={T.iva} sube />, <Precio revelado={revelado} key="c" nota={T.conIva} valor={e(r.conIva)} />]; break
    case 'original': flujo = [<Precio revelado={revelado} key="a" nota={T.antes} valor={e(r.bueno)} incognita />, <Etiqueta revelado={revelado} key="b" texto={signo(r.pct)} />, <Precio revelado={revelado} key="c" nota={T.ahora} valor={e(r.ahora)} />]; break
    // Los dos porcentajes, uno debajo del otro y en orden: en fila no caben
    // cuatro piezas en un móvil.
    case 'encadenado':
    case 'doble': flujo = [
      <Precio revelado={revelado} key="a" nota={T.antes} valor={e(r.antes)} />,
      <div key="b" className="flex flex-col items-center gap-1.5">
        <Etiqueta revelado={revelado} texto={signo(r.pasos[0])} sube={r.pasos[0] > 0} nota={r.tipo === 'doble' ? T.rebaja : r.pasos[0] > 0 ? T.sube : T.baja} />
        <Etiqueta revelado={revelado} texto={signo(r.pasos[1])} sube={r.pasos[1] > 0} nota={r.tipo === 'doble' ? T.extra : r.pasos[1] > 0 ? T.sube : T.baja} />
      </div>,
      <Precio revelado={revelado} key="d" nota={T.final} valor={e(r.bueno)} incognita />,
    ]; break
    default: flujo = null
  }

  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }

  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-3 mb-3">
        <p className="flex items-center justify-center gap-2 text-white font-bold mb-3">
          <span className="text-3xl leading-none">{prod.emoji}</span>
          <span>{nombreProducto(r, l)}</span>
          {r.tipo === 'comparar' && <span className="text-white/55 font-semibold text-sm">· {e(r.precioUnidad)} {tr({ es: 'cada uno', en: 'each', ca: 'cadascun' })}</span>}
        </p>
        {flujo ? (
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            {flujo.flatMap((x, i) => (i ? [<Flecha key={`f${i}`} />, x] : [x]))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {r.ofertas.map((id, i) => {
              const letra = i ? 'B' : 'A'
              const gana = revelado && (r.bueno === letra || r.bueno === 'igual')
              return (
                <div key={id} className={`rounded-xl border p-2.5 text-center ${gana ? 'border-green-400/60 bg-green-500/10' : 'border-white/10 bg-white/[0.04]'}`}>
                  <p className="text-white/45 text-[11px] font-bold uppercase tracking-wide">{textoOpcion(letra, r, l)}</p>
                  <p className="mt-1 inline-block rounded-lg bg-red-500/85 text-white font-black text-[13.5px] px-2 py-1 leading-tight">{textoOferta(id, l)}</p>
                  <p className={`mt-1.5 font-black tabular-nums text-[17px] ${revelado ? 'text-white' : 'text-amber-300'}`}>
                    {revelado ? e(r.costes[i]) : '?'}
                  </p>
                  <p className="text-white/40 text-[10.5px]">{tr({ es: `por ${r.n}`, en: `for ${r.n}`, ca: `per ${r.n}` })}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <div className={`grid gap-2 ${r.opciones.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {r.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-3 px-2 rounded-xl border text-white text-sm font-bold tabular-nums transition-all ${clase(o)}`}>
            {textoOpcion(o, r, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
