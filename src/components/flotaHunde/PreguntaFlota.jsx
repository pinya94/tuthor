// Una ronda de ¿Flota o se hunde? (ver lib/flotaHunde) y cómo se responde,
// sin opciones: se reparten objetos entre «flota» y «se hunde», se elige la
// botella del líquido o se coloca el bloque a la altura a la que flotará. La
// usan el juego (contra reloj) y el examen (MechanicExam).
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { LIQUIDOS, OBJETOS, enunciado, explicacion, esCorrecta, nombreObjeto, nombreLiquido, datoObjeto, num } from '../../lib/flotaHunde'
import VasoFlota from './VasoFlota'

const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'

function Ficha({ color, titulo, dato }) {
  return (
    <div className="flex-1 min-w-0 rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2">
      <p className="flex items-start gap-1.5 text-white text-[13px] font-bold leading-tight">
        <span className="shrink-0 w-3 h-3 mt-px rounded-sm border border-black/30" style={{ background: color }} />
        <span className="min-w-0">{titulo}</span>
      </p>
      <p className="text-white/60 text-[12px] tabular-nums mt-0.5">
        {dato.split(' · ').map((d, i) => <span key={i}>{i > 0 && ' · '}<span className="whitespace-nowrap">{d}</span></span>)}
      </p>
    </div>
  )
}

// Cuatro objetos, uno detrás de otro, a «flota» o a «se hunde».
function Clasifica({ r, revelado, onResponder, tr, l }) {
  const [puestos, setPuestos] = useState({})
  const rl = LIQUIDOS[r.liquido].rho
  const activo = r.items.findIndex((_, i) => puestos[i] == null)
  const nombre = x => OBJETOS[x.objeto].nombre[l] ?? OBJETOS[x.objeto].nombre.es
  const dato = x => datoObjeto({ ...x }, l)
  const pon = lado => {
    if (revelado || activo < 0) return
    const n = { ...puestos, [activo]: lado }
    setPuestos(n)
    if (r.items.every((_, i) => n[i])) onResponder(`clasifica:${r.items.filter((x, i) => n[i] !== (x.rho < rl ? 'flota' : 'hunde')).length}`)
  }
  const caja = (lado, titulo, icono) => (
    <button disabled={revelado || activo < 0} onClick={() => pon(lado)} className="rounded-2xl border-2 border-dashed border-white/20 bg-white/[0.04] hover:bg-white/[0.08] p-2 min-h-[7rem] text-left">
      <span className="block text-white font-black text-sm mb-1">{icono} {titulo}</span>
      <span className="flex flex-col gap-1">
        {r.items.map((x, i) => puestos[i] === lado && (
          <span key={i} className={`rounded-lg px-2 py-1 text-[12px] font-bold text-white flex items-center gap-1.5 ${revelado ? ((x.rho < rl) === (lado === 'flota') ? 'bg-green-500/25 ring-1 ring-green-400' : 'bg-red-500/25 ring-1 ring-red-400') : 'bg-white/10'}`}>
            <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: OBJETOS[x.objeto].color }} />{nombre(x)}
          </span>
        ))}
      </span>
    </button>
  )
  return (
    <>
      <div className="flex gap-2 mb-2">
        {activo >= 0 && !revelado
          ? <Ficha color={OBJETOS[r.items[activo].objeto].color} titulo={`${activo + 1}/4 · ${nombre(r.items[activo])}`} dato={dato(r.items[activo])} />
          : <div className="flex-1" />}
        <Ficha color={LIQUIDOS[r.liquido].color} titulo={nombreLiquido(r, l)} dato={`ρ = ${num(rl, l)} g/cm³`} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {caja('flota', tr({ es: 'Flota', en: 'Floats', ca: 'Sura' }), '⬆')}
        {caja('hunde', tr({ es: 'Se hunde', en: 'Sinks', ca: 'S’enfonsa' }), '⬇')}
      </div>
    </>
  )
}

// Cuatro botellas: se toca la del líquido.
function Botellas({ r, revelado, elegida, onResponder, tr, l }) {
  const obj = OBJETOS[r.objeto]
  return (
    <>
      <div className="flex gap-2 mb-2">
        <Ficha color={obj.color} titulo={nombreObjeto(r, l)} dato={datoObjeto(r, l)} />
      </div>
      {revelado && elegida && (
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-2">
          <VasoFlota ronda={{ ...r, liquido: elegida }} revelado aria={tr({ es: 'Vaso con el líquido elegido', en: 'Glass with the chosen liquid', ca: 'Got amb el líquid triat' })} />
        </div>
      )}
      <div className="grid grid-cols-4 gap-2">
        {r.botellas.map(b => {
          const liq = LIQUIDOS[b]
          const marca = revelado ? (r.validos.includes(b) ? 'ring-2 ring-green-400' : b === elegida ? 'ring-2 ring-red-400' : 'opacity-50') : ''
          return (
            <button key={b} disabled={revelado} onClick={() => onResponder(b)} className={`rounded-xl bg-white/[0.04] border border-white/10 p-1.5 flex flex-col items-center gap-1 active:scale-95 ${marca}`}>
              <svg viewBox="0 0 40 64" className="w-9 h-14" aria-hidden="true">
                <path d="M15 2h10v10l7 8v38a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V20l7-8z" fill="none" stroke="#CBD5E1" strokeWidth="2" />
                <path d="M9.5 30h21v28a2.5 2.5 0 0 1-2.5 2.5H12a2.5 2.5 0 0 1-2.5-2.5z" fill={liq.color} fillOpacity=".8" />
              </svg>
              <span className="text-white text-[10.5px] font-bold leading-tight text-center">{nombreLiquido({ liquido: b }, l)}</span>
              <span className="text-white/55 text-[10px] tabular-nums">{num(liq.rho, l)}</span>
            </button>
          )
        })}
      </div>
    </>
  )
}

// El bloque: se sube o se baja hasta la línea de flotación, o al fondo.
function Coloca({ r, revelado, elegida, onResponder, tr, l }) {
  const [f, setF] = useState(0)
  const rl = LIQUIDOS[r.liquido].rho
  const vista = revelado ? r : { ...r, rho: f === 'hunde' ? rl * 2 : (rl * Math.max(f, 1)) / 100 }
  const ok = revelado && esCorrecta(r, elegida)
  const texto = x => (x === 'hunde' ? tr({ es: 'al fondo', en: 'on the bottom', ca: 'al fons' }) : `${x} % ${tr({ es: 'bajo el líquido', en: 'under the surface', ca: 'sota el líquid' })}`)
  const paso = d => setF(x => Math.max(0, Math.min(95, (x === 'hunde' ? 95 : x) + d)))
  return (
    <>
      <div className="flex gap-2 mb-2">
        <Ficha color="#A78BFA" titulo={nombreObjeto(r, l)} dato={datoObjeto(r, l)} />
        <Ficha color={LIQUIDOS[r.liquido].color} titulo={nombreLiquido(r, l)} dato={`ρ = ${num(rl, l)} g/cm³`} />
      </div>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-2">
        <VasoFlota ronda={vista} revelado={revelado || f !== 0} aria={tr({ es: 'Vaso con el líquido y el bloque', en: 'Glass with the liquid and the block', ca: 'Got amb el líquid i el bloc' })} />
      </div>
      {revelado ? (
        <p className={`text-center text-sm font-bold ${ok ? 'text-green-300' : 'text-red-300'}`}>{texto(elegida)} {ok ? '✓' : `→ ${texto(r.bueno)}`}</p>
      ) : (
        <>
          <div className="flex items-center justify-center gap-2 mb-2">
            <button className="w-12 h-12 rounded-full bg-white/10 text-white text-xl font-black" onClick={() => paso(-5)} aria-label="−5 %">⬆</button>
            <p className="min-w-[8rem] text-center text-amber-300 font-black text-lg tabular-nums leading-tight">{f === 0 ? '—' : texto(f)}</p>
            <button className="w-12 h-12 rounded-full bg-white/10 text-white text-xl font-black" onClick={() => paso(5)} aria-label="+5 %">⬇</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="py-3 rounded-2xl bg-white/10 text-white font-bold" onClick={() => setF('hunde')}>{tr({ es: '⤓ Al fondo', en: '⤓ To the bottom', ca: '⤓ Al fons' })}</button>
            <button className={boton} disabled={f === 0} onClick={() => onResponder(String(f))}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
          </div>
        </>
      )}
    </>
  )
}

export default function PreguntaFlota({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const props = { r: ronda, revelado, elegida, onResponder, tr, l }
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(ronda, l)}</p>
      {ronda.mecanica === 'clasifica' ? <Clasifica {...props} /> : ronda.mecanica === 'liquido' ? <Botellas {...props} /> : <Coloca {...props} />}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
