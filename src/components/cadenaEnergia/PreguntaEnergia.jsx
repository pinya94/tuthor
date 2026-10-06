// Una ronda de Cadena de energía: según el tipo, la situación, el aparato con
// lo que entra y lo que sale, la cadena de formas con un eslabón en blanco,
// la barra de rendimiento (útil frente a perdida) o la piedra en lo alto.
// La incógnita es un «?» que se rellena al corregir. La usan el juego
// (contra reloj) y el examen (MechanicExam).
import { useLang } from '../../context/LangContext'
import { FORMAS, SITUACIONES, APARATOS, CADENAS, enunciado, textoOpcion, explicacion, nombreForma } from '../../lib/cadenaEnergia'

function Ficha({ forma, l, incognita, revelado, pequena }) {
  const oculta = incognita && !revelado
  const f = FORMAS[forma]
  return (
    <div className={`shrink-0 rounded-xl border text-center px-1.5 py-1.5 ${pequena ? 'w-[66px]' : 'w-[76px]'} ${oculta ? 'border-dashed border-amber-300/70 bg-amber-300/10' : incognita ? 'border-green-400/60 bg-green-500/15' : 'border-white/10 bg-white/[0.05]'}`}>
      <p className={`leading-none ${pequena ? 'text-xl' : 'text-2xl'}`}>{oculta ? '❓' : f.emoji}</p>
      <p className={`mt-1 font-bold leading-tight text-[10.5px] ${oculta ? 'text-amber-300' : incognita ? 'text-green-300' : 'text-white/80'}`}>{oculta ? '?' : nombreForma(forma, l)}</p>
    </div>
  )
}
const Flecha = () => <span className="shrink-0 text-white/35 font-black">→</span>

export default function PreguntaEnergia({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }

  let escena
  if (r.tipo === 'forma') {
    const s = SITUACIONES[r.situacion]
    escena = (
      <div className="flex items-center gap-3">
        <span className="text-5xl leading-none">{s.emoji}</span>
        <p className="text-white font-bold text-lg leading-snug">{s.texto[l] ?? s.texto.es}</p>
      </div>
    )
  } else if (r.tipo === 'transforma' || r.tipo === 'rendimiento') {
    const a = APARATOS[r.aparato]
    escena = (
      <div>
        <p className="text-center text-white font-bold mb-2"><span className="text-3xl align-middle mr-1.5">{a.emoji}</span>{a.nombre[l] ?? a.nombre.es}</p>
        {r.tipo === 'transforma' ? (
          <div className="flex items-center justify-center gap-2">
            <Ficha forma={a.entra} l={l} incognita={r.pide === 'entra'} revelado={revelado} />
            <Flecha />
            <span className="shrink-0 text-3xl">{a.emoji}</span>
            <Flecha />
            <Ficha forma={a.sale} l={l} incognita={r.pide === 'sale'} revelado={revelado} />
          </div>
        ) : (
          // Barra de rendimiento: lo útil en color y lo perdido en gris.
          <div>
            <div className="flex h-9 rounded-lg overflow-hidden border border-white/15 text-[11px] font-black">
              <div className="flex items-center justify-center bg-green-500/70 text-white" style={{ width: `${Math.max(r.pct, 14)}%` }}>
                {tr({ es: 'Útil', en: 'Useful', ca: 'Útil' })} {r.util} J
              </div>
              <div className="flex-1 flex items-center justify-center bg-slate-500/40 text-white/85">
                🔥 {r.pide === 'perdida' && !revelado ? '? J' : `${r.entra - r.util} J`}
              </div>
            </div>
            <p className="text-center text-white/60 text-[12px] mt-1.5">
              {tr({ es: 'Entran', en: 'In', ca: 'Entren' })} {r.entra} J
              {r.pide === 'rendimiento' && <> · {tr({ es: 'rendimiento', en: 'efficiency', ca: 'rendiment' })} <b className={revelado ? 'text-green-300' : 'text-amber-300'}>{revelado ? textoOpcion(r.pct, r, l) : '?'}</b></>}
            </p>
          </div>
        )}
      </div>
    )
  } else if (r.tipo === 'cadena') {
    const c = CADENAS[r.cadena]
    const pequena = c.formas.length > 3
    escena = (
      <div>
        <p className="text-center text-white font-bold mb-2"><span className="text-3xl align-middle mr-1.5">{c.emoji}</span>{c.nombre[l] ?? c.nombre.es}</p>
        <div className="flex items-center justify-center gap-1">
          {c.formas.flatMap((f, i) => {
            const ficha = <Ficha key={f + i} forma={f} l={l} incognita={i === r.hueco} revelado={revelado} pequena={pequena} />
            return i ? [<Flecha key={`a${i}`} />, ficha] : [ficha]
          })}
        </div>
      </div>
    )
  } else {
    // mgh: la piedra en el borde del acantilado, con la altura acotada desde
    // la cima; si cae, la trayectoria y dónde está (a mitad o en el suelo).
    const cima = 34, suelo = 132, medio = (cima + suelo) / 2, X = 98, XC = 124
    escena = (
      <svg viewBox="0 0 260 150" className="w-full h-auto max-h-[170px]" role="img" aria-label={tr({ es: 'Piedra en lo alto', en: 'Stone up high', ca: 'Pedra a dalt' })}>
        <defs><marker id="cae" viewBox="0 0 10 10" refX="5" refY="8" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 0L5 10Z" fill="#E7E5E4" /></marker></defs>
        <path d={`M20 ${suelo}H240`} stroke="#94A3B8" strokeWidth="3" />
        <path d={`M20 ${cima}H110V${suelo}H20Z`} fill="#57534E" />
        <circle cx={X} cy={cima - 10} r="10" fill="#A8A29E" stroke="#0f172a" strokeWidth="2" />
        <text x={X - 14} y={cima - 26} textAnchor="middle" fontSize="12" fontWeight="800" fill="#E7E5E4">{r.m} kg</text>
        <path d={`M200 ${cima}V${suelo}`} stroke="#FBBF24" strokeWidth="1.6" strokeDasharray="4 3" />
        <path d={`M194 ${cima}H206M194 ${suelo}H206`} stroke="#FBBF24" strokeWidth="1.6" />
        <text x="210" y={medio + 4} fontSize="12" fontWeight="800" fill="#FBBF24">{r.h} m</text>
        {r.pide !== 'ep' && (
          <g>
            <path d={`M${X + 12} ${cima - 14}Q${XC} ${cima - 14} ${XC} ${cima + 4}V${(r.pide === 'ec-mitad' ? medio : suelo) - 16}`} stroke="#E7E5E4" strokeWidth="1.6" strokeDasharray="3 4" fill="none" markerEnd="url(#cae)" />
            <circle cx={XC} cy={r.pide === 'ec-mitad' ? medio : suelo - 10} r="10" fill="none" stroke="#A8A29E" strokeWidth="2" strokeDasharray="3 3" />
          </g>
        )}
      </svg>
    )
  }

  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-3 mb-3">{escena}</div>
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      <div className="grid grid-cols-2 gap-2">
        {r.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-2.5 px-2 rounded-xl border text-white text-sm font-bold tabular-nums transition-all ${clase(o)}`}>
            {textoOpcion(o, r, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
