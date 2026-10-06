// El gráfico de oferta (S) y demanda (D). Con una noticia: curvas genéricas
// y, al corregir, la curva desplazada (discontinua) con el nuevo equilibrio y
// flechas en los ejes de precio y cantidad; si no se desplaza ninguna, una
// flecha A LO LARGO de la demanda. Con ecuaciones: las rectas de verdad a
// escala, el precio fijado (si lo hay) y, al corregir, el equilibrio o el
// hueco entre lo que se demanda y lo que se ofrece.
import { NOTICIAS } from '../../lib/ofertaDemanda'

const W = 300, H = 222
const X0 = 42, Y0 = 192, X1 = 284, Y1 = 18 // origen abajo a la izquierda
const AZUL = '#60A5FA', ROSA = '#F472B6', AMBAR = '#FBBF24', VERDE = '#4ADE80'

// Intersección de dos rectas dadas por dos puntos cada una.
function corte([a, b], [c, d]) {
  const den = (a.x - b.x) * (c.y - d.y) - (a.y - b.y) * (c.x - d.x)
  const t = ((a.x - c.x) * (c.y - d.y) - (a.y - c.y) * (c.x - d.x)) / den
  return { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) }
}

function Ejes({ t }) {
  return (
    <g>
      <path d={`M${X0} ${Y1 - 6}V${Y0}H${X1 + 6}`} stroke="#94A3B8" strokeWidth="2" fill="none" />
      <path d={`M${X0 - 4} ${Y1}l4 -8l4 8Z M${X1} ${Y0 - 4}l8 4l-8 4Z`} fill="#94A3B8" />
      <text x={X0 - 8} y={Y1 + 4} textAnchor="end" fontSize="11" fontWeight="700" fill="#CBD5E1">{t.precio}</text>
      <text x={X1 + 2} y={Y0 + 16} textAnchor="end" fontSize="11" fontWeight="700" fill="#CBD5E1">{t.cantidad}</text>
    </g>
  )
}

const Guias = ({ p, color }) => (
  <path d={`M${X0} ${p.y}H${p.x}V${Y0}`} stroke={color} strokeWidth="1.3" strokeDasharray="3 3" fill="none" />
)

function Noticia({ ronda, revelado, t }) {
  const n = NOTICIAS[ronda.noticia]
  const D = [{ x: 72, y: 40 }, { x: 252, y: 172 }]
  const S = [{ x: 72, y: 172 }, { x: 252, y: 40 }]
  const E = corte(D, S)
  let nueva = null, E2 = null
  if (revelado && n.curva) {
    const dx = 46 * n.dir
    const base = n.curva === 'D' ? D : S
    nueva = base.map(p => ({ x: p.x + dx, y: p.y }))
    E2 = corte(n.curva === 'D' ? nueva : D, n.curva === 'S' ? nueva : S)
  }
  return (
    <g>
      <line x1={D[0].x} y1={D[0].y} x2={D[1].x} y2={D[1].y} stroke={AZUL} strokeWidth="3" strokeLinecap="round" />
      <line x1={S[0].x} y1={S[0].y} x2={S[1].x} y2={S[1].y} stroke={ROSA} strokeWidth="3" strokeLinecap="round" />
      <text x={D[1].x + 4} y={D[1].y + 4} fontSize="13" fontWeight="800" fill={AZUL}>D</text>
      <text x={S[1].x + 4} y={S[1].y + 4} fontSize="13" fontWeight="800" fill={ROSA}>{t.oferta}</text>
      <Guias p={E} color="#64748B" />
      <circle cx={E.x} cy={E.y} r="5" fill="#F8FAFC" />
      <text x={E.x - 14} y={E.y - 8} fontSize="11" fontWeight="700" fill="#F8FAFC">E</text>
      {nueva && (
        <g>
          <line x1={nueva[0].x} y1={nueva[0].y} x2={nueva[1].x} y2={nueva[1].y} stroke={n.curva === 'D' ? AZUL : ROSA} strokeWidth="3" strokeDasharray="7 5" strokeLinecap="round" />
          <text x={Math.min(nueva[1].x + 4, W - 16)} y={nueva[1].y + (n.curva === 'D' ? -8 : -6)} fontSize="12" fontWeight="800" fill={n.curva === 'D' ? AZUL : ROSA}>{n.curva === 'D' ? 'D' : t.oferta}′</text>
          <Guias p={E2} color={AMBAR} />
          <circle cx={E2.x} cy={E2.y} r="5" fill={AMBAR} />
          <text x={E2.x + 8} y={E2.y - 6} fontSize="11" fontWeight="700" fill={AMBAR}>E′</text>
          {/* flechas del cambio en los ejes */}
          <path d={`M${X0 - 14} ${E.y}V${E2.y}`} stroke={AMBAR} strokeWidth="2.5" markerEnd="url(#punta)" />
          <path d={`M${E.x} ${Y0 + 12}H${E2.x}`} stroke={AMBAR} strokeWidth="2.5" markerEnd="url(#punta)" />
        </g>
      )}
      {/* movimiento a lo largo de D: si el precio sube, hacia arriba a la
          izquierda (se compra menos); si baja, hacia abajo a la derecha */}
      {revelado && !n.curva && (() => {
        const k = n.dir > 0 ? -1 : 1
        const fin = { x: E.x + k * 44, y: E.y + k * 32 }
        return (
          <g>
            <path d={`M${E.x + k * 6} ${E.y + k * 4.4}L${fin.x} ${fin.y}`} stroke={AMBAR} strokeWidth="3" markerEnd="url(#punta)" />
            <circle cx={fin.x + k * 4} cy={fin.y + k * 3} r="4.5" fill={AMBAR} />
            <text x={E.x + 12} y={n.dir > 0 ? E.y - 44 : E.y + 54} fontSize="10.5" fontWeight="700" fill={AMBAR}>{t.alolargo}</text>
          </g>
        )
      })()}
    </g>
  )
}

function Ecuaciones({ ronda, revelado, t }) {
  const e = ronda.ec
  // Ventana hasta el doble del precio de equilibrio: con todo el rango de la
  // demanda, lo interesante quedaba aplastado abajo.
  const pMax = Math.min(e.a / e.b, 2 * e.P) * 1.08
  const qMax = Math.max(e.a, e.c + e.d * pMax) * 1.05
  const X = q => X0 + (q / qMax) * (X1 - X0)
  const Y = p => Y0 - (p / pMax) * (Y0 - Y1)
  // demanda: de (Q=a, P=0) a (Q=0, P=a/b); oferta: Q = c + dP
  const dem = `M${X(e.a)} ${Y(0)}L${X(e.a - e.b * pMax)} ${Y(pMax)}`
  const pIni = Math.max(0, -e.c / e.d)
  const ofe = `M${X(e.c + e.d * pIni)} ${Y(pIni)}L${X(e.c + e.d * pMax)} ${Y(pMax)}`
  const E = { x: X(e.Q), y: Y(e.P) }
  return (
    <g>
      <defs><clipPath id="caja"><rect x={X0} y={Y1 - 4} width={X1 - X0 + 6} height={Y0 - Y1 + 4} /></clipPath></defs>
      <g clipPath="url(#caja)">
        <path d={dem} stroke={AZUL} strokeWidth="3" fill="none" />
        <path d={ofe} stroke={ROSA} strokeWidth="3" fill="none" />
      </g>
      <text x={X(e.a - e.b * pMax * 0.92) + 8} y={Y(pMax * 0.92)} fontSize="12" fontWeight="800" fill={AZUL}>D</text>
      <text x={X(e.c + e.d * pMax * 0.92) - 16} y={Y(pMax * 0.92)} fontSize="12" fontWeight="800" fill={ROSA}>{t.oferta}</text>
      {ronda.p0 !== undefined && (
        <g>
          <path d={`M${X0} ${Y(ronda.p0)}H${X1}`} stroke={AMBAR} strokeWidth="1.6" strokeDasharray="5 4" />
          <text x={X0 + 4} y={Y(ronda.p0) - 5} fontSize="10.5" fontWeight="700" fill={AMBAR}>{ronda.p0} €</text>
          {revelado && (
            <g>
              <path d={`M${X(Math.min(ronda.qd, ronda.qs))} ${Y(ronda.p0)}H${X(Math.max(ronda.qd, ronda.qs))}`} stroke={AMBAR} strokeWidth="5" strokeLinecap="round" />
              <text x={X(Math.max(ronda.qd, ronda.qs)) + 6} y={Y(ronda.p0) + (ronda.p0 > e.P ? -6 : 14)} fontSize="10.5" fontWeight="700" fill={AMBAR}>
                {ronda.qd > ronda.qs ? t.escasez : t.excedente} {Math.abs(ronda.qd - ronda.qs)}
              </text>
            </g>
          )}
        </g>
      )}
      {revelado && (
        <g>
          <Guias p={E} color={VERDE} />
          <circle cx={E.x} cy={E.y} r="5" fill={VERDE} />
          <text x={X0 - 4} y={E.y + 4} textAnchor="end" fontSize="10" fontWeight="700" fill={VERDE}>{e.P}</text>
          <text x={E.x} y={Y0 + 13} textAnchor="middle" fontSize="10" fontWeight="700" fill={VERDE}>{e.Q}</text>
        </g>
      )}
    </g>
  )
}

export default function GraficoMercado({ ronda, revelado, t }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[260px]" role="img" aria-label={t.aria}>
      <defs>
        <marker id="punta" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10Z" fill={AMBAR} />
        </marker>
      </defs>
      <Ejes t={t} />
      {ronda.noticia !== undefined ? <Noticia ronda={ronda} revelado={revelado} t={t} /> : <Ecuaciones ronda={ronda} revelado={revelado} t={t} />}
    </svg>
  )
}
