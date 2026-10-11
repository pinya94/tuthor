// Una ronda de Newton en Acción: la caja con sus fuerzas como flechas.
// Sobre el suelo (empuje, rozamiento, peso y normal), en un plano inclinado
// (peso y normal; al corregir, las dos componentes del peso) o dentro de un
// ascensor (peso, normal y la aceleración). Al corregir aparece el valor
// buscado. En las de concepto, la escena con su emoji.
import { useLang } from '../../context/LangContext'
import { enunciado, textoOpcion, explicacion, num, CONCEPTOS } from '../../lib/newtonAccion'

const COL = { F: '#F59E0B', Fr: '#F87171', P: '#A78BFA', N: '#38BDF8', a: '#4ADE80' }

function Flecha({ x1, y1, x2, y2, c, texto, tx = 0, ty = 0, discontinua }) {
  const ang = Math.atan2(y2 - y1, x2 - x1)
  const p = (d, da) => `${x2 - d * Math.cos(ang + da)},${y2 - d * Math.sin(ang + da)}`
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2 - 8 * Math.cos(ang)} y2={y2 - 8 * Math.sin(ang)} stroke={c} strokeWidth="4" strokeLinecap="round" strokeDasharray={discontinua ? '5 4' : undefined} />
      <polygon points={`${x2},${y2} ${p(12, 0.45)} ${p(12, -0.45)}`} fill={c} />
      {texto && <text x={x2 + tx} y={y2 + ty} textAnchor="middle" fontSize="12" fontWeight="900" fill={c} stroke="#0b1226" strokeWidth="3" style={{ paintOrder: 'stroke' }}>{texto}</text>}
    </g>
  )
}

function Suelo({ r, revelado, l, tr }) {
  const cx = 150, base = 120
  const caja = <rect x={cx - 30} y={base - 50} width="60" height="50" rx="5" fill="#334155" stroke="#94A3B8" strokeWidth="2" />
  const masa = <text x={cx} y={base - 20} textAnchor="middle" fontSize="13" fontWeight="900" fill="#FFFFFF">{r.m} kg</text>
  const res = (texto) => revelado && <text x={cx + 70} y={base - 62} textAnchor="middle" fontSize="13" fontWeight="900" fill={COL.a}>{texto}</text>
  let flechas
  if (r.tipo === 'segunda') {
    const fTxt = r.despeje === 'F' && !revelado ? 'F = ?' : `F = ${r.F} N`
    flechas = <>
      <Flecha x1={cx + 30} y1={base - 25} x2={cx + 110} y2={base - 25} c={COL.F} texto={fTxt} ty={-10} tx={-20} />
      {res(r.despeje === 'a' ? `a = ${r.a} m/s² →` : r.despeje === 'm' ? `m = ${r.m} kg` : `F = ${r.F} N`)}
    </>
  } else if (r.tipo === 'rozamiento') {
    flechas = <>
      <Flecha x1={cx + 30} y1={base - 25} x2={cx + 110} y2={base - 25} c={COL.F} texto={`F = ${r.F} N`} ty={-10} tx={-20} />
      <Flecha x1={cx - 30} y1={base - 6} x2={cx - 95} y2={base - 6} c={COL.Fr} texto={revelado ? `Fr = ${r.quieta ? r.F : r.Fr} N` : 'Fr'} ty={-10} tx={14} />
      <Flecha x1={cx} y1={base} x2={cx} y2={base + 34} c={COL.P} texto="P" tx={14} ty={-4} />
      <Flecha x1={cx} y1={base - 50} x2={cx} y2={base - 84} c={COL.N} texto="N" tx={14} ty={10} />
      {res(r.bueno === 0 ? tr({ es: 'a = 0: no se mueve', en: 'a = 0: it does not move', ca: 'a = 0: no es mou' }) : `a = ${r.bueno} m/s² →`)}
    </>
  } else {
    // peso
    flechas = <>
      <Flecha x1={cx} y1={base - 25} x2={cx} y2={base + 38} c={COL.P} texto={revelado && r.caso !== 'masaLuna' ? `P = ${num(r.bueno, l)} N` : 'P'} tx={40} ty={-6} />
      <text x={40} y={40} fontSize="34">{r.caso === 'tierra' ? '🌍' : '🌙'}</text>
      {revelado && r.caso === 'masaLuna' && res(`m = ${r.m} kg`)}
    </>
  }
  return (
    <svg viewBox="0 0 300 168" className="w-full max-w-[340px] mx-auto h-auto" role="img" aria-label={tr({ es: 'Caja con sus fuerzas', en: 'Box with its forces', ca: 'Caixa amb les seves forces' })}>
      <line x1="10" x2="290" y1={base} y2={base} stroke={r.tipo === 'peso' && r.caso !== 'tierra' ? '#CBD5E1' : '#64748B'} strokeWidth="3" />
      {caja}{masa}{flechas}
    </svg>
  )
}

function Plano({ r, revelado, l, tr }) {
  const ang = (r.ang * Math.PI) / 180
  const L = 230, x0 = 30, y0 = 150
  const xT = x0 + L * Math.cos(ang) * 0.95, yT = y0 - L * Math.sin(ang) * 0.95
  const top = Math.min(0, yT - 20)
  // La caja, a mitad de la rampa y girada.
  const mx = x0 + L * 0.55 * Math.cos(ang), my = y0 - L * 0.55 * Math.sin(ang)
  const nx = -Math.sin(ang), ny = -Math.cos(ang) // normal hacia fuera (arriba-izquierda)
  const cx = mx + nx * 18, cy = my + ny * 18
  const largo = 60
  return (
    <svg viewBox={`0 ${top} 300 ${178 - top}`} className="w-full max-w-[340px] mx-auto h-auto" role="img" aria-label={tr({ es: 'Plano inclinado', en: 'Inclined plane', ca: 'Pla inclinat' })}>
      <polygon points={`${x0},${y0} ${xT},${y0} ${xT},${yT}`} fill="#1E293B" stroke="#64748B" strokeWidth="2" />
      <path d={`M${x0 + 34} ${y0} A34 34 0 0 0 ${x0 + 34 * Math.cos(ang)} ${y0 - 34 * Math.sin(ang)}`} stroke="#A78BFA" strokeWidth="2.5" fill="none" />
      <text x={x0 + 50} y={y0 - 6} fontSize="12" fontWeight="900" fill="#C4B5FD">{r.ang}°</text>
      <g transform={`rotate(${-r.ang} ${cx} ${cy})`}>
        <rect x={cx - 20} y={cy - 18} width="40" height="36" rx="4" fill="#334155" stroke="#94A3B8" strokeWidth="2" />
        {r.m && <text x={cx} y={cy + 5} textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">{r.m} kg</text>}
      </g>
      <Flecha x1={cx} y1={cy} x2={cx} y2={cy + largo} c={COL.P} texto="P" tx={12} />
      <Flecha x1={cx} y1={cy} x2={cx + nx * largo * Math.cos(ang)} y2={cy + ny * largo * Math.cos(ang)} c={COL.N} texto={revelado && r.pide === 'normal' ? `N ≈ ${num(r.bueno / 10, l)} N` : 'N'} tx={-10} ty={-6} />
      {revelado && <>
        <Flecha x1={cx} y1={cy} x2={cx - Math.cos(ang) * largo * Math.sin(ang)} y2={cy + Math.sin(ang) * largo * Math.sin(ang)} c={COL.a} discontinua texto={r.pide === 'a' ? `a ≈ ${num(r.bueno / 10, l)} m/s²` : 'P·sen α'} tx={12} ty={22} />
        <Flecha x1={cx} y1={cy} x2={cx - nx * largo * Math.cos(ang)} y2={cy - ny * largo * Math.cos(ang)} c={COL.P} discontinua texto="P·cos α" tx={30} ty={10} />
      </>}
    </svg>
  )
}

function Ascensor({ r, revelado, tr }) {
  const sube = r.caso === 'subeAcelera' || r.caso === 'subeFrena' || r.caso === 'constante'
  const aArriba = r.caso === 'subeAcelera'
  const aAbajo = r.caso === 'bajaAcelera' || r.caso === 'subeFrena'
  return (
    <svg viewBox="0 0 300 170" className="w-full max-w-[340px] mx-auto h-auto" role="img" aria-label={tr({ es: 'Ascensor', en: 'Lift', ca: 'Ascensor' })}>
      <rect x="90" y="14" width="120" height="146" rx="6" fill="#1E293B" stroke="#64748B" strokeWidth="2.5" />
      <line x1="150" y1="0" x2="150" y2="14" stroke="#64748B" strokeWidth="3" />
      <rect x="120" y="140" width="60" height="8" rx="2" fill="#94A3B8" />
      <text x="150" y="128" textAnchor="middle" fontSize="40">🧍</text>
      <text x="150" y="157" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0F172A">{r.m} kg</text>
      <Flecha x1={150} y1={140} x2={150} y2={revelado ? 40 : 60} c={COL.N} texto={revelado ? `N = ${r.bueno} N` : 'N = ?'} tx={0} ty={-8} />
      <text x="240" y="30" fontSize="20" fill="#CBD5E1">{sube ? '⬆' : '⬇'}</text>
      {aArriba && <Flecha x1={250} y1={120} x2={250} y2={70} c={COL.a} texto={`a = ${r.a}`} tx={0} ty={-8} />}
      {aAbajo && <Flecha x1={250} y1={70} x2={250} y2={120} c={COL.a} texto={`a = ${r.a}`} tx={0} ty={16} />}
      {r.caso === 'constante' && <text x="250" y="100" textAnchor="middle" fontSize="11" fontWeight="900" fill={COL.a}>v = cte</text>}
    </svg>
  )
}

export default function PreguntaNewton({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  const dibujo = r.tipo === 'plano' ? <Plano r={r} revelado={revelado} l={l} tr={tr} />
    : r.tipo === 'ascensor' ? <Ascensor r={r} revelado={revelado} tr={tr} />
    : r.tipo === 'concepto' ? null : <Suelo r={r} revelado={revelado} l={l} tr={tr} />
  return (
    <div className="w-full">
      {dibujo ? (
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">{dibujo}</div>
      ) : (
        <p className="text-center text-5xl leading-none mb-2" aria-hidden="true">{CONCEPTOS.find(c => c.id === r.concepto).emoji}</p>
      )}
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      <div className={`grid gap-2 ${r.tipo === 'concepto' ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {r.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-3 px-2 rounded-xl border text-white text-[15px] font-bold leading-snug tabular-nums transition-all ${clase(o)}`}>
            {textoOpcion(o, r, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
