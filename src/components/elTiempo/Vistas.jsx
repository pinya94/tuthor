// Dibujos del juego El Tiempo: iconos del cielo y de la ropa, la tarjeta de
// previsión de una app, la gráfica por horas y el radar de lluvia.
import { HORAS, RADAR_W, RADAR_H, KM_CASILLA, NOMBRE_DIR } from '../../lib/elTiempo'

// ── Cielo ────────────────────────────────────────────────────────────────
function Sol({ cx = 32, cy = 32, r = 11 }) {
  return (
    <g>
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4
        return <line key={i} x1={cx + Math.cos(a) * (r + 4)} y1={cy + Math.sin(a) * (r + 4)} x2={cx + Math.cos(a) * (r + 10)} y2={cy + Math.sin(a) * (r + 10)} stroke="#FBBF24" strokeWidth="3.5" strokeLinecap="round" />
      })}
      <circle cx={cx} cy={cy} r={r} fill="#FBBF24" />
    </g>
  )
}
function Nube({ x = 0, y = 0, c = '#E2E8F0' }) {
  return <path transform={`translate(${x} ${y})`} d="M14 46h34a11 11 0 0 0 0-22 15 15 0 0 0-28-3 10 10 0 0 0-6 25Z" fill={c} />
}
export function IconoCielo({ cielo, className = 'w-16 h-16' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {cielo === 'sol' && <Sol />}
      {cielo === 'solNube' && <><Sol cx={24} cy={24} r={9} /><Nube x={4} y={6} /></>}
      {cielo === 'nube' && <><Nube x={-4} y={-6} c="#94A3B8" /><Nube x={4} y={2} /></>}
      {cielo === 'lluvia' && (
        <>
          <Nube x={0} y={-6} c="#94A3B8" />
          {[18, 30, 42].map((x, i) => <path key={x} d={`M${x} ${48 + (i % 2) * 3}l-4 9`} stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" />)}
        </>
      )}
    </svg>
  )
}

// ── Ropa ─────────────────────────────────────────────────────────────────
export function IconoPrenda({ prenda, className = 'w-10 h-10' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {prenda === 'camiseta' && (
        <path d="M17 6l-11 6 4 9 5-3v24h18V18l5 3 4-9-11-6c-1 4-4 6-7 6s-6-2-7-6Z" fill="#F87171" />
      )}
      {prenda === 'chaqueta' && (
        <>
          <path d="M16 6 5 12l2 22 6-1V40h22v-7l6 1 2-22-11-6-8 6Z" fill="#60A5FA" />
          <path d="M24 12v28" stroke="#1E3A8A" strokeWidth="2" />
          <path d="M24 12l-6-6M24 12l6-6" stroke="#1E3A8A" strokeWidth="2" />
          <rect x="13" y="34" width="22" height="5" rx="1.5" fill="#3B82F6" />
        </>
      )}
      {prenda === 'abrigo' && (
        <>
          <path d="M16 4 6 10l1 30h6v6h22v-6h6l1-30-10-6-8 7Z" fill="#A16207" />
          <path d="M24 11v35" stroke="#422006" strokeWidth="2" />
          {[18, 26, 34].map(y => <circle key={y} cx="27.5" cy={y} r="1.8" fill="#FDE68A" />)}
          <path d="M16 4l8 7 8-7" fill="none" stroke="#FDE68A" strokeWidth="2.5" />
        </>
      )}
    </svg>
  )
}
export function IconoParaguas({ className = 'w-10 h-10' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M4 24a20 20 0 0 1 40 0c-3-3-6-3-10 0-3-3-7-3-10 0-3-3-7-3-10 0-4-3-7-3-10 0Z" fill="#A78BFA" />
      <path d="M24 24v16a4 4 0 0 1-8 0" fill="none" stroke="#E2E8F0" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M24 4v2" stroke="#E2E8F0" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}
export function IconoSol({ className = 'w-10 h-10' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M4 20h40" stroke="#E2E8F0" strokeWidth="2.5" />
      <rect x="6" y="18" width="15" height="11" rx="5" fill="#0F172A" stroke="#E2E8F0" strokeWidth="2" />
      <rect x="27" y="18" width="15" height="11" rx="5" fill="#0F172A" stroke="#E2E8F0" strokeWidth="2" />
      <rect x="15" y="33" width="18" height="10" rx="3" fill="#FDE68A" />
      <path d="M19 38h10" stroke="#B45309" strokeWidth="2" />
    </svg>
  )
}

// Contenido de un botón de opción: los dibujos del traje y su nombre.
export function DibujoTraje({ traje }) {
  return (
    <span className="flex items-center justify-center gap-0.5">
      <IconoPrenda prenda={traje.prenda} />
      {traje.paraguas && <IconoParaguas />}
      {traje.sol && <IconoSol />}
    </span>
  )
}

// ── Tarjeta de previsión (formato app) ─────────────────────────────────
export function TarjetaPrevision({ datos, cfg, t }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-sky-900/70 to-indigo-950/70 border border-white/[0.08] p-4 flex items-center gap-4">
      <IconoCielo cielo={datos.cielo} className="w-20 h-20 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-white text-4xl font-black leading-none">{datos.temp}°</p>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-sm font-bold">
          <span className="text-sky-300">☂ {datos.lluvia} %</span>
          {cfg.viento && <span className="text-slate-200">💨 {datos.viento} km/h</span>}
          {cfg.uv && <span className="text-amber-300">UV {datos.uv}</span>}
        </div>
        <p className="text-white/40 text-[11px] mt-1">{t.leyenda}</p>
      </div>
    </div>
  )
}

// ── Gráfica por horas ──────────────────────────────────────────────────
// Temperatura (línea) arriba y probabilidad de lluvia (barras) abajo, de 8 a
// 22 h, con la salida sombreada.
export function GraficaHoras({ datos, cfg, t }) {
  const W = 330, H = 210, x0 = 22, x1 = W - 8
  const xs = i => x0 + (i * (x1 - x0)) / (HORAS.length - 1)
  const tmin = Math.min(...datos.temps) - 2, tmax = Math.max(...datos.temps) + 2
  const yT = v => 20 + ((tmax - v) / (tmax - tmin)) * 70
  const yL0 = 190, alto = 70
  const iIni = HORAS.indexOf(datos.inicio), iFin = HORAS.indexOf(datos.fin)
  const ancho = (x1 - x0) / (HORAS.length - 1)
  return (
    <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2">
      {cfg.viento && <p className="text-slate-200 text-xs font-bold px-2 pt-1">💨 {t.vientoTodoDia} {datos.viento} km/h</p>}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={t.aria}>
        <rect x={xs(iIni) - ancho / 2} y="4" width={(iFin - iIni) * ancho} height={H - 12} rx="6" fill="#EDAE49" fillOpacity=".14" stroke="#EDAE49" strokeOpacity=".6" strokeDasharray="4 3" />
        {/* lluvia */}
        {datos.lluvias.map((p, i) => (
          <g key={i}>
            <rect x={xs(i) - 7} y={yL0 - (p / 100) * alto} width="14" height={(p / 100) * alto} rx="2" fill="#38BDF8" fillOpacity={0.35 + p / 160} />
            {p >= 20 && <text x={xs(i)} y={yL0 - (p / 100) * alto - 3} fontSize="8.5" fill="#BAE6FD" textAnchor="middle" fontWeight="700">{p}</text>}
          </g>
        ))}
        <line x1={x0 - 6} x2={x1} y1={yL0} y2={yL0} stroke="#ffffff30" />
        <text x={x0 - 18} y={yL0 - alto + 6} fontSize="8" fill="#7DD3FC" fontWeight="700">%</text>
        {/* temperatura */}
        <polyline points={datos.temps.map((v, i) => `${xs(i)},${yT(v)}`).join(' ')} fill="none" stroke="#F97316" strokeWidth="2.5" strokeLinejoin="round" />
        {datos.temps.map((v, i) => (
          <g key={i}>
            <circle cx={xs(i)} cy={yT(v)} r="2.6" fill="#F97316" />
            {(i % 2 === 0 || (i >= iIni && i < iFin)) && <text x={xs(i)} y={yT(v) - 6} fontSize="9" fill="#FED7AA" textAnchor="middle" fontWeight="800">{v}°</text>}
          </g>
        ))}
        {HORAS.map((h, i) => i % 2 === 0 && <text key={h} x={xs(i)} y={H - 4} fontSize="8.5" fill="#94A3B8" textAnchor="middle">{h}h</text>)}
      </svg>
      <div className="flex justify-center gap-4 text-[11px] font-bold pb-1">
        <span className="text-orange-300">— {t.temperatura}</span>
        <span className="text-sky-300">▮ {t.probLluvia}</span>
        <span className="text-amber-300">▭ {t.tuSalida}</span>
      </div>
    </div>
  )
}

// ── Radar ──────────────────────────────────────────────────────────────
export const COLOR_LLUVIA = { 1: '#60A5FA', 2: '#FACC15', 3: '#EF4444' }
export function Radar({ datos, revelado, t, l }) {
  const C = 34, W = RADAR_W * C, H = RADAR_H * C
  const { ahora, luego, ciudad, dir, kmh } = datos
  const flecha = { este: [1, 0], oeste: [-1, 0], norte: [0, -1], sur: [0, 1] }[dir]
  return (
    <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2">
      <svg viewBox={`-2 -2 ${W + 4} ${H + 4}`} className="w-full h-auto" role="img" aria-label={t.aria}>
        <rect x="0" y="0" width={W} height={H} rx="8" fill="#14532D" fillOpacity=".55" />
        {/* costa decorativa */}
        <path d={`M0 ${H * 0.72} Q${W * 0.25} ${H * 0.62} ${W * 0.45} ${H * 0.82} T${W} ${H * 0.86} V${H} H0Z`} fill="#0C4A6E" fillOpacity=".7" />
        {Array.from({ length: RADAR_W + 1 }, (_, i) => <line key={'v' + i} x1={i * C} x2={i * C} y1="0" y2={H} stroke="#ffffff14" />)}
        {Array.from({ length: RADAR_H + 1 }, (_, i) => <line key={'h' + i} y1={i * C} y2={i * C} x1="0" x2={W} stroke="#ffffff14" />)}
        {ahora.map((c, i) => <rect key={i} x={c.x * C + 1} y={c.y * C + 1} width={C - 2} height={C - 2} rx="5" fill={COLOR_LLUVIA[c.i]} fillOpacity={revelado ? 0.3 : 0.85} />)}
        {revelado && luego.filter(c => c.x >= 0 && c.x < RADAR_W && c.y >= 0 && c.y < RADAR_H).map((c, i) => (
          <rect key={'l' + i} x={c.x * C + 2} y={c.y * C + 2} width={C - 4} height={C - 4} rx="5" fill={COLOR_LLUVIA[c.i]} fillOpacity=".9" stroke="#fff" strokeWidth="1.5" />
        ))}
        {/* ciudad */}
        <circle cx={ciudad.x * C + C / 2} cy={ciudad.y * C + C / 2} r="7" fill="#fff" stroke="#0F172A" strokeWidth="3" />
        <text x={ciudad.x * C + C / 2} y={ciudad.y * C + C / 2 + (ciudad.y >= RADAR_H - 2 ? -12 : 22)} fontSize="11" fill="#fff" textAnchor="middle" fontWeight="800" stroke="#0F172A" strokeWidth="3" paintOrder="stroke">{ciudad.nombre}</text>
        {/* flecha de movimiento junto a la mancha */}
        {(() => {
          const cx = ahora.reduce((s, c) => s + c.x, 0) / ahora.length * C + C / 2
          const cy = ahora.reduce((s, c) => s + c.y, 0) / ahora.length * C + C / 2
          const L = 40
          const ex = cx + flecha[0] * L, ey = cy + flecha[1] * L
          const ang = Math.atan2(flecha[1], flecha[0]) * 180 / Math.PI
          return (
            <g>
              <line x1={cx} y1={cy} x2={ex} y2={ey} stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M0 0l-10-6v12Z" fill="#fff" transform={`translate(${ex} ${ey}) rotate(${ang})`} />
            </g>
          )
        })()}
      </svg>
      <div className="flex flex-wrap justify-between gap-2 px-1 pt-1.5 text-[11px] font-bold">
        <span className="text-white/80">➜ {t.haciaDir} {NOMBRE_DIR[dir][l] ?? NOMBRE_DIR[dir].es} · {kmh} km/h</span>
        <span className="text-white/50">▢ = {KM_CASILLA} km</span>
      </div>
      <div className="flex gap-3 px-1 pb-1 text-[11px] font-bold">
        {[1, 2, 3].map(i => <span key={i} className="flex items-center gap-1 text-white/70"><span className="w-3 h-3 rounded-sm" style={{ background: COLOR_LLUVIA[i] }} />{t.intensidad[i]}</span>)}
      </div>
    </div>
  )
}
