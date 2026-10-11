// Una ronda de Prepara la Disolución: vasos de precipitados dibujados
// (altura según el volumen; color según la concentración, que solo se ve de
// verdad al corregir: antes todos tienen el mismo tono, porque en «¿cuál está
// más concentrado?» el color daría la respuesta). La usan el juego (contra
// reloj) y el examen (MechanicExam).
import { useLang } from '../../context/LangContext'
import { enunciado, textoOpcion, explicacion, intensidad, num, MEZCLAS, SOLUBLES, SOLUTOS_MOL } from '../../lib/disoluciones'

// Color sólido de lila pálido (diluida) a violeta intenso (concentrada): con
// transparencia, sobre el fondo oscuro, lo diluido parecía MÁS oscuro.
const PALIDO = [221, 214, 254], INTENSO = [109, 40, 217], NEUTRO = '#A78BFA'
const colorDe = x => `rgb(${PALIDO.map((v, i) => Math.round(v + (INTENSO[i] - v) * x)).join(',')})`

// Un vaso de precipitados de 0 a `max` mL, con marcas cada cuarto.
function Vaso({ x, mL, max, c, revelado, arriba, abajo, poso = 0, oculto, tono }) {
  const H = 110, top = 30
  const alto = Math.max(6, (mL / max) * H)
  const relleno = revelado ? colorDe(tono ?? intensidad(c)) : NEUTRO
  return (
    <g>
      <text x={x + 36} y={top - 10} textAnchor="middle" fontSize="13" fontWeight="900" fill={oculto ? '#FCD34D' : '#FFFFFF'}>{arriba}</text>
      <rect x={x + 4} y={top + H - alto} width="64" height={alto} fill={relleno} />
      {poso > 0 && <path d={`M${x + 12} ${top + H} Q${x + 36} ${top + H - 8 - Math.min(14, poso / 3)} ${x + 60} ${top + H} Z`} fill="#E2E8F0" />}
      {[0.25, 0.5, 0.75].map(f => <line key={f} x1={x + 54} x2={x + 68} y1={top + H - f * H} y2={top + H - f * H} stroke="#64748B" strokeWidth="1" />)}
      <path d={`M${x} ${top - 4} L${x} ${top + H} Q${x} ${top + H + 6} ${x + 6} ${top + H + 6} L${x + 66} ${top + H + 6} Q${x + 72} ${top + H + 6} ${x + 72} ${top + H} L${x + 72} ${top - 4}`} stroke="#CBD5E1" strokeWidth="2.5" fill="none" />
      <text x={x + 36} y={top + H + 24} textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#CBD5E1">{abajo}</text>
    </g>
  )
}

function Dibujo({ r, revelado, l, tr }) {
  const mL = v => `${num(v, l)} mL`
  switch (r.tipo) {
    case 'gL': {
      const arriba = r.despeje === 'm' ? (revelado ? `${num(r.g, l)} g` : '? g') : `${num(r.g, l)} g`
      const abajo = r.despeje === 'V' ? (revelado ? mL(r.mL) : '? mL') : mL(r.mL)
      return (
        <svg viewBox="0 0 180 170" className="w-full max-w-[220px] mx-auto h-auto" role="img" aria-label="Vaso">
          <Vaso x={54} mL={r.mL} max={Math.max(r.mL, 500) * 1.15} c={r.c} revelado={revelado} arriba={arriba} abajo={abajo} oculto={r.despeje === 'm' && !revelado} />
        </svg>
      )
    }
    case 'comparar': {
      const max = Math.max(...r.vasos.map(v => v.mL)) * 1.1
      const cMax = Math.max(...r.vasos.map(v => v.c))
      return (
        <svg viewBox="0 0 270 170" className="w-full h-auto" role="img" aria-label="Tres vasos">
          {r.vasos.map((v, i) => (
            <g key={i}>
              <Vaso x={8 + i * 88} mL={v.mL} max={max} c={v.c} tono={0.1 + 0.9 * (v.c / cMax)} revelado={revelado} arriba={`${num(v.g, l)} g`} abajo={mL(v.mL)} />
              <text x={44 + i * 88} y={92} textAnchor="middle" fontSize="20" fontWeight="900" fill="#FFFFFF" stroke="#0b1226" strokeWidth="3" style={{ paintOrder: 'stroke' }}>{'ABC'[i]}</text>
            </g>
          ))}
        </svg>
      )
    }
    case 'solubilidad': {
      const S = SOLUBLES[r.soluble]
      return (
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 180 170" className="w-40 shrink-0 h-auto" role="img" aria-label="Vaso">
            <Vaso x={54} mL={r.agua} max={300} c={60} revelado={revelado} arriba={`+ ${num(r.echas, l)} g`} abajo={`${r.agua} g ${tr({ es: 'agua', en: 'water', ca: 'aigua' })}`} poso={revelado ? r.bueno : 0} />
          </svg>
          <p className="text-white/70 text-sm leading-snug">
            {tr({ es: 'Solubilidad', en: 'Solubility', ca: 'Solubilitat' })}: <b className="text-white">{S.s} g / 100 g</b>
            {revelado && <><br />{tr({ es: 'Caben', en: 'It holds', ca: 'Hi caben' })} <b className="text-white">{num(r.cabe, l)} g</b></>}
          </p>
        </div>
      )
    }
    case 'diluir':
      return (
        <svg viewBox="0 0 270 170" className="w-full h-auto" role="img" aria-label="Dilución">
          <Vaso x={14} mL={r.v1} max={r.v2 * 1.1} c={r.c1} revelado arriba={`${r.c1} g/L`} abajo={mL(r.v1)} />
          <text x={135} y={86} textAnchor="middle" fontSize="13" fontWeight="800" fill="#93C5FD">+ {tr({ es: 'agua', en: 'water', ca: 'aigua' })} →</text>
          <Vaso x={184} mL={r.v2} max={r.v2 * 1.1} c={r.bueno} revelado={revelado} arriba={revelado ? `${num(r.bueno, l)} g/L` : '? g/L'} abajo={mL(r.v2)} oculto={!revelado} />
        </svg>
      )
    case 'molaridad': {
      const S = SOLUTOS_MOL[r.soluto]
      return (
        <svg viewBox="0 0 180 170" className="w-full max-w-[220px] mx-auto h-auto" role="img" aria-label="Vaso">
          <Vaso x={54} mL={r.mL} max={2300} c={60} revelado={revelado} arriba={`${num(r.g, l)} g ${S.f}`} abajo={mL(r.mL)} />
        </svg>
      )
    }
    case 'pct':
      return (
        <div className="flex items-center justify-center gap-2 text-center">
          <div className="rounded-xl bg-white/10 px-3 py-2"><p className="text-white font-black tabular-nums">{num(r.soluto, l)} g</p><p className="text-white/50 text-[11px] font-bold">{tr({ es: 'azúcar', en: 'sugar', ca: 'sucre' })}</p></div>
          <span className="text-white/40 font-black">+</span>
          <div className="rounded-xl bg-sky-500/20 px-3 py-2"><p className="text-white font-black tabular-nums">{num(r.disolvente, l)} g</p><p className="text-white/50 text-[11px] font-bold">{tr({ es: 'agua', en: 'water', ca: 'aigua' })}</p></div>
          <span className="text-white/40 font-black">=</span>
          <div className={`rounded-xl px-3 py-2 ${revelado ? 'bg-violet-500/30' : 'bg-white/5 border border-dashed border-white/20'}`}><p className="text-white font-black tabular-nums">{revelado ? `${num(r.soluto + r.disolvente, l)} g` : '? g'}</p><p className="text-white/50 text-[11px] font-bold">{tr({ es: 'disolución', en: 'solution', ca: 'dissolució' })}</p></div>
        </div>
      )
    default: return null
  }
}

export default function PreguntaDisolucion({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const conDibujo = r.tipo !== 'partes'
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  return (
    <div className="w-full">
      {conDibujo && (
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-3 mb-3">
          <Dibujo r={r} revelado={revelado} l={l} tr={tr} />
        </div>
      )}
      {!conDibujo && <p className="text-center text-5xl leading-none mb-2" aria-hidden="true">{MEZCLAS.find(m => m.id === r.mezcla).emoji}</p>}
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      <div className={`grid gap-2 ${r.opciones.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {r.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-2.5 px-2 rounded-xl border text-white text-sm font-bold leading-snug tabular-nums transition-all ${clase(o)}`}>
            {textoOpcion(o, r, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
