// Los dibujos de ¿Qué estilo es?: un edificio por estilo (con variantes) y
// los elementos sueltos (arcos y columnas). Cada dibujo enseña los rasgos de
// libro que identifican el estilo —y solo esos—, de modo que la respuesta
// se puede razonar mirando: el arco, las columnas, el rosetón, el frontón…
// Ver la tabla de vecinos parecidos en lib/queEstilo.js.
const W = 320, H = 220, SUELO = 206
const HUECO = '#1E293B'

// ── Arcos ────────────────────────────────────────────────────────────────
// Curva de un arco de anchura w apoyado en (x, y): va de (x, y) a (x+w, y).
function curvaArco(tipo, x, y, w) {
  const r = w / 2
  if (tipo === 'apuntado') return `A${w} ${w} 0 0 1 ${x + r} ${y - 0.866 * w}A${w} ${w} 0 0 1 ${x + w} ${y}`
  if (tipo === 'herradura') { const R = 0.62 * w; return `A${R} ${R} 0 1 1 ${x + w} ${y}` }
  if (tipo === 'lobulado') {
    const n = 5, cx = x + r
    let d = ''
    for (let k = 1; k <= n; k++) {
      const a = Math.PI - (k * Math.PI) / n
      const px = cx + r * Math.cos(a), py = y - r * Math.sin(a)
      const cuerda = 2 * r * Math.sin(Math.PI / (2 * n))
      d += `A${cuerda * 0.62} ${cuerda * 0.62} 0 0 1 ${px.toFixed(1)} ${py.toFixed(1)}`
    }
    return d
  }
  return `A${r} ${r} 0 0 1 ${x + w} ${y}`
}
// Hueco con forma de arco, desde el suelo `abajo` hasta la clave.
const hueco = (tipo, x, y, w, abajo) => `M${x} ${abajo}V${y}${curvaArco(tipo, x, y, w)}V${abajo}Z`
// Rosca del arco (las dovelas): una banda por fuera del hueco.
function Rosca({ tipo, x, y, w, c, g = 6, bicolor }) {
  const d = `M${x - g / 2} ${y}${curvaArco(tipo, x - g / 2, y, w + g)}`
  return (
    <>
      <path d={d} stroke={bicolor ? '#B91C1C' : c} strokeWidth={g} fill="none" />
      {bicolor && <path d={d} stroke="#F5E6C8" strokeWidth={g} strokeDasharray="5 5" fill="none" />}
    </>
  )
}

// ── Columnas ─────────────────────────────────────────────────────────────
function Columna({ orden, x, arriba, abajo, w, c = '#E7DCC4', s = '#B9A57E' }) {
  const capH = orden === 'dorica' ? w * 0.55 : orden === 'jonica' ? w * 0.6 : w * 1.15
  const baseH = orden === 'dorica' ? 0 : w * 0.35
  const f0 = arriba + capH, f1 = abajo - baseH
  const fuste = orden === 'salomonica'
    ? (() => {
        const n = 24, amp = w * 0.16, vueltas = 3.5
        const izq = [], der = []
        for (let i = 0; i <= n; i++) {
          const yy = f0 + ((f1 - f0) * i) / n, dx = amp * Math.sin((i / n) * vueltas * 2 * Math.PI)
          izq.push(`${(x - w / 2 + dx).toFixed(1)} ${yy.toFixed(1)}`); der.unshift(`${(x + w / 2 + dx).toFixed(1)} ${yy.toFixed(1)}`)
        }
        const espiras = []
        for (let k = 0; k < vueltas * 2; k++) {
          const ya = f0 + ((f1 - f0) * k) / (vueltas * 2)
          espiras.push(<path key={k} d={`M${x - w / 2} ${ya + 2}Q${x} ${ya + (f1 - f0) / (vueltas * 2) * 0.2} ${x + w / 2} ${ya + (f1 - f0) / (vueltas * 2) - 2}`} stroke={s} strokeWidth={Math.max(1.5, w * 0.12)} fill="none" />)
        }
        return <><path d={`M${izq.join('L')}L${der.join('L')}Z`} fill={c} />{espiras}</>
      })()
    : (
      <>
        <rect x={x - w / 2} y={f0} width={w} height={f1 - f0} fill={c} />
        <rect x={x + w * 0.18} y={f0} width={w * 0.32} height={f1 - f0} fill={s} fillOpacity=".55" />
        {orden !== 'corintia' && [-0.22, 0, 0.22].map(k => <path key={k} d={`M${x + k * w} ${f0 + 2}V${f1 - 2}`} stroke={s} strokeWidth="1" />)}
      </>
    )
  let capitel
  if (orden === 'dorica') {
    capitel = (
      <>
        <path d={`M${x - w / 2} ${arriba + capH}L${x - w * 0.68} ${arriba + capH * 0.42}H${x + w * 0.68}L${x + w / 2} ${arriba + capH}Z`} fill={c} />
        <rect x={x - w * 0.75} y={arriba} width={w * 1.5} height={capH * 0.42} fill={c} stroke={s} strokeWidth="1" />
      </>
    )
  } else if (orden === 'jonica') {
    const r = w * 0.27
    capitel = (
      <>
        <rect x={x - w * 0.62} y={arriba + capH * 0.25} width={w * 1.24} height={capH * 0.45} fill={c} />
        <rect x={x - w * 0.7} y={arriba} width={w * 1.4} height={capH * 0.25} fill={c} stroke={s} strokeWidth="1" />
        {[-1, 1].map(k => (
          <g key={k}>
            <circle cx={x + k * w * 0.62} cy={arriba + capH * 0.55} r={r} fill={c} stroke={s} strokeWidth="1.5" />
            <circle cx={x + k * w * 0.62} cy={arriba + capH * 0.55} r={r * 0.45} fill="none" stroke={s} strokeWidth="1.2" />
          </g>
        ))}
      </>
    )
  } else {
    // corintia (y la salomónica, que la lleva encima): cesta de hojas.
    capitel = (
      <>
        <path d={`M${x - w / 2} ${arriba + capH}L${x - w * 0.72} ${arriba + capH * 0.18}H${x + w * 0.72}L${x + w / 2} ${arriba + capH}Z`} fill={c} />
        {[0.55, 0.85].map((fy, fila) => [-0.4, 0, 0.4].map(k => (
          <path key={`${fila}${k}`} d={`M${x + k * w - w * 0.16} ${arriba + capH * (fy + 0.15)}Q${x + k * w} ${arriba + capH * (fy - 0.3)} ${x + k * w + w * 0.16} ${arriba + capH * (fy + 0.15)}`} stroke="#6B8E5A" strokeWidth={Math.max(1.4, w * 0.09)} fill="none" />
        )))}
        {[-1, 1].map(k => <circle key={k} cx={x + k * w * 0.62} cy={arriba + capH * 0.26} r={w * 0.13} fill="none" stroke={s} strokeWidth="1.2" />)}
        <rect x={x - w * 0.8} y={arriba} width={w * 1.6} height={capH * 0.17} fill={c} stroke={s} strokeWidth="1" />
      </>
    )
  }
  return (
    <g>
      {fuste}
      {capitel}
      {baseH > 0 && <rect x={x - w * 0.68} y={f1} width={w * 1.36} height={baseH} rx={baseH * 0.3} fill={c} stroke={s} strokeWidth="1" />}
    </g>
  )
}

const Fronton = ({ x0, x1, y, alto, c, s }) => (
  <>
    <path d={`M${x0} ${y}L${(x0 + x1) / 2} ${y - alto}L${x1} ${y}Z`} fill={c} />
    <path d={`M${x0 + 10} ${y - 3}L${(x0 + x1) / 2} ${y - alto + 6}L${x1 - 10} ${y - 3}Z`} fill={s} fillOpacity=".55" />
  </>
)

// ── Edificios ────────────────────────────────────────────────────────────
function Griego({ variante }) {
  const c = '#E7DCC4', s = '#B9A57E', orden = variante === 'jonico' ? 'jonica' : 'dorica'
  const xs = [56, 98, 139, 181, 222, 264]
  return (
    <>
      <rect x="28" y="196" width="264" height="10" fill={s} />
      <rect x="34" y="186" width="252" height="10" fill={c} />
      <rect x="40" y="176" width="240" height="10" fill={s} />
      <rect x="52" y="96" width="216" height="80" fill="#7C6A48" />
      {xs.map(x => <Columna key={x} orden={orden} x={x} arriba={96} abajo={176} w={orden === 'dorica' ? 21 : 17} c={c} s={s} />)}
      <rect x="40" y="84" width="240" height="12" fill={c} stroke={s} />
      <rect x="40" y="72" width="240" height="12" fill={c} />
      {orden === 'dorica'
        ? Array.from({ length: 11 }, (_, i) => <rect key={i} x={50 + i * 21.5} y="73" width="7" height="10" fill={s} />)
        : <path d="M40 78H280" stroke={s} strokeWidth="1" />}
      <rect x="34" y="68" width="252" height="4" fill={s} />
      <Fronton x0={34} x1={286} y={68} alto={34} c={c} s={s} />
    </>
  )
}

function Romano({ variante }) {
  if (variante === 'acueducto') {
    const c = '#A8A293', s = '#787263'
    return (
      <>
        <rect x="6" y="64" width="308" height="142" fill={c} />
        {Array.from({ length: 6 }, (_, i) => <path key={`a${i}`} d={hueco('medio-punto', 14 + i * 50, 132, 40, SUELO)} fill={HUECO} />)}
        <rect x="6" y="98" width="308" height="6" fill={s} />
        {Array.from({ length: 12 }, (_, i) => <path key={`b${i}`} d={hueco('medio-punto', 12 + i * 25.5, 84, 19, 98)} fill={HUECO} />)}
        <rect x="6" y="58" width="308" height="8" fill={s} />
        {[150, 180].map(y => <path key={y} d={`M6 ${y}H314`} stroke={s} strokeWidth="1" strokeOpacity=".7" />)}
      </>
    )
  }
  if (variante === 'anfiteatro') {
    const c = '#D8C7A3', s = '#A8916A'
    const piso = (y0, y1, ancho, n, orden) => (
      <g>
        {Array.from({ length: n }, (_, i) => <path key={i} d={hueco('medio-punto', 26 + i * ancho + 4, y1 - (y1 - y0) * 0.45, ancho - 8, y1 - 2)} fill={HUECO} />)}
        {Array.from({ length: n + 1 }, (_, i) => <Columna key={`c${i}`} orden={orden} x={26 + i * ancho} arriba={y0 + 3} abajo={y1 - 2} w={5} c={c} s={s} />)}
        <rect x="20" y={y0 - 4} width="284" height="5" fill={s} />
      </g>
    )
    return (
      <>
        <defs><clipPath id="ruina"><path d="M20 206V36H230L242 46V58L262 66V82L282 92V206Z" /></clipPath></defs>
        <path d="M20 206V36H230L242 46V58L262 66V82L282 92V206Z" fill={c} />
        {/* la ruina recorta pisos y columnas: el lado derecho está derrumbado */}
        <g clipPath="url(#ruina)">
          {piso(152, 206, 34, 8, 'dorica')}
          {piso(102, 152, 34, 8, 'jonica')}
          {piso(58, 102, 34, 8, 'corintia')}
        </g>
        {Array.from({ length: 6 }, (_, i) => <rect key={i} x={40 + i * 32} y="42" width="9" height="9" fill={HUECO} />)}
      </>
    )
  }
  // arco de triunfo
  const c = '#D8C7A3', s = '#A8916A'
  return (
    <>
      <rect x="62" y="44" width="196" height="162" fill={c} />
      <rect x="62" y="44" width="196" height="34" fill={s} fillOpacity=".5" />
      {[54, 62, 70].map(y => <path key={y} d={`M96 ${y}H224`} stroke={s} strokeWidth="2.2" />)}
      <rect x="56" y="78" width="208" height="6" fill={s} />
      <path d={hueco('medio-punto', 130, 140, 60, SUELO)} fill={HUECO} />
      <Rosca tipo="medio-punto" x={130} y={140} w={60} c={s} />
      {[78, 106, 214, 242].map(x => (
        <g key={x}>
          <rect x={x - 9} y="176" width="18" height="30" fill={s} />
          <Columna orden="corintia" x={x} arriba={90} abajo={176} w={11} c={c} s={s} />
        </g>
      ))}
      <rect x="88" y="104" width="10" height="44" fill={s} fillOpacity=".45" />
      <rect x="222" y="104" width="10" height="44" fill={s} fillOpacity=".45" />
    </>
  )
}

function Islamico({ variante }) {
  if (variante === 'arqueria') {
    const c = '#E5C9A0', s = '#A47C4C'
    const fila = (sombra, dy, esc) => (
      <g opacity={sombra}>
        {Array.from({ length: 5 }, (_, i) => {
          const x = 30 + i * 52
          return (
            <g key={i}>
              <path d={`M${x + 4} ${84 + dy}V${120 + dy}H${x + 44}V${84 + dy}Z`} fill={c} />
              <Rosca tipo="medio-punto" x={x + 4} y={96 + dy} w={44} c={s} g={7 * esc} bicolor />
              <Rosca tipo="herradura" x={x + 9} y={150 + dy} w={34} c={s} g={7 * esc} bicolor />
            </g>
          )
        })}
        {Array.from({ length: 6 }, (_, i) => (
          <g key={`c${i}`}>
            <rect x={30 + i * 52 - 5} y={96 + dy} width="10" height="54" fill={c} />
            <rect x={30 + i * 52 - 3.5} y={150 + dy} width="7" height={56 - dy} fill="#6B7280" />
            <rect x={30 + i * 52 - 6} y={146 + dy} width="12" height="5" fill={c} />
          </g>
        ))}
      </g>
    )
    return (
      <>
        <rect x="0" y="40" width={W} height={166} fill="#2A1F14" />
        <rect x="0" y="40" width={W} height="40" fill="#3B2A1A" />
        {fila(0.45, -14, 0.8)}
        {fila(1, 0, 1)}
      </>
    )
  }
  // portada con alfiz y alminar
  const c = '#E5C9A0', s = '#A47C4C'
  return (
    <>
      <rect x="20" y="78" width="214" height="128" fill={c} />
      {Array.from({ length: 13 }, (_, i) => <path key={i} d={`M${20 + i * 16.5} 78V70H${26 + i * 16.5}V64H${30 + i * 16.5}V70H${36.5 + i * 16.5}V78Z`} fill={c} />)}
      {[62, 112, 162].map(x => (
        <g key={x}>
          <path d={hueco('lobulado', x + 12, 104, 26, 118)} fill={s} fillOpacity=".65" />
        </g>
      ))}
      <rect x="92" y="122" width="70" height="84" fill="none" stroke="#B91C1C" strokeWidth="3" />
      <path d={hueco('herradura', 106, 168, 42, SUELO)} fill={HUECO} />
      <Rosca tipo="herradura" x={106} y={168} w={42} c={s} g={7} bicolor />
      {/* alminar */}
      <rect x="246" y="30" width="48" height="176" fill={c} />
      <rect x="252" y="60" width="36" height="70" fill="none" stroke={s} strokeWidth="1.5" />
      {Array.from({ length: 5 }, (_, i) => <path key={i} d={`M252 ${60 + i * 14}L270 ${74 + i * 14}L288 ${60 + i * 14}`} stroke={s} strokeWidth="1.3" fill="none" />)}
      <path d={hueco('herradura', 262, 154, 16, 176)} fill={HUECO} />
      {Array.from({ length: 4 }, (_, i) => <path key={i} d={`M${246 + i * 12} 30V22H${252 + i * 12}V30Z`} fill={c} />)}
      <rect x="260" y="8" width="20" height="14" fill={c} />
      <path d="M266 8V0M274 8V2" stroke="#FBBF24" strokeWidth="2" />
    </>
  )
}

function Romanico({ variante }) {
  const c = '#B8916A', s = '#7A5A3C'
  return (
    <>
      <path d="M70 206V92L150 56L230 92V206Z" fill={c} />
      <rect x="70" y="92" width="12" height="114" fill={s} fillOpacity=".5" />
      <rect x="218" y="92" width="12" height="114" fill={s} fillOpacity=".5" />
      {Array.from({ length: 9 }, (_, i) => <rect key={i} x={84 + i * 15} y={97 - Math.abs(4 - i) * -0} width="5" height="5" fill={s} />)}
      <path d="M70 92L150 56L230 92" stroke={s} strokeWidth="4" fill="none" />
      {[76, 64, 52].map((w, i) => <path key={w} d={`M${150 - w / 2} 206V158${curvaArco('medio-punto', 150 - w / 2, 158, w)}V206`} fill={i % 2 ? c : '#9C7553'} stroke={s} strokeWidth="1.5" />)}
      <path d={hueco('medio-punto', 130, 158, 40, SUELO)} fill={HUECO} />
      <path d={hueco('medio-punto', 144, 112, 12, 132)} fill={HUECO} />
      {variante === 'torre'
        ? (
          <>
            <rect x="230" y="34" width="50" height="172" fill={c} stroke={s} strokeWidth="1.5" />
            <path d="M226 34L255 14L284 34Z" fill={s} />
            {[56, 104].map(y => (
              <g key={y}>
                <path d={hueco('medio-punto', 240, y + 8, 12, y + 26)} fill={HUECO} />
                <path d={hueco('medio-punto', 258, y + 8, 12, y + 26)} fill={HUECO} />
              </g>
            ))}
            <path d="M230 90H280M230 140H280" stroke={s} strokeWidth="2" />
          </>
        )
        : (
          <>
            <path d="M126 66V40H138V34H162V40H174V66L150 56Z" fill={c} />
            <path d={hueco('medio-punto', 133, 50, 12, 64)} fill={HUECO} />
            <path d={hueco('medio-punto', 155, 50, 12, 64)} fill={HUECO} />
            <circle cx="139" cy="56" r="4" fill="#B45309" /><circle cx="161" cy="56" r="4" fill="#B45309" />
          </>
        )}
    </>
  )
}

const Roseton = ({ cx, cy, r }) => (
  <g>
    <circle cx={cx} cy={cy} r={r + 3} fill="#6B6457" />
    <circle cx={cx} cy={cy} r={r} fill="#1E3A8A" />
    {Array.from({ length: 12 }, (_, i) => {
      const a = (i * Math.PI) / 6
      return <path key={i} d={`M${cx} ${cy}L${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)}`} stroke="#CBBFA8" strokeWidth="1.6" />
    })}
    {Array.from({ length: 12 }, (_, i) => {
      const a = (i * Math.PI) / 6 + Math.PI / 12
      return <circle key={`p${i}`} cx={cx + r * 0.68 * Math.cos(a)} cy={cy + r * 0.68 * Math.sin(a)} r={r * 0.17} fill={i % 2 ? '#DC2626' : '#FBBF24'} fillOpacity=".8" />
    })}
    <circle cx={cx} cy={cy} r={r * 0.28} fill="#CBBFA8" />
  </g>
)
const Lanceta = ({ x, y, w, h, vidriera }) => (
  <path d={hueco('apuntado', x, y + 0.866 * w, w, y + h)} fill={vidriera ? '#1D4ED8' : HUECO} fillOpacity={vidriera ? 0.85 : 1} />
)
const Pinaculo = ({ x, y, h, c }) => <path d={`M${x - 4} ${y}L${x} ${y - h}L${x + 4} ${y}Z`} fill={c} />

function Gotico({ variante }) {
  const c = '#CBBFA8', s = '#6B6457'
  if (variante === 'arbotantes') {
    return (
      <>
        <path d="M120 206V64L160 30L200 64V206Z" fill={c} />
        {[132, 172].map(x => <Lanceta key={x} x={x} y={72} w={16} h={56} vidriera />)}
        {/* naves laterales, más bajas, con su tejado a un agua */}
        <path d="M76 206V130L120 112V206ZM244 206V130L200 112V206Z" fill="#B3A68D" stroke={s} strokeWidth="1.5" />
        {[88, 214].map(x => <Lanceta key={x} x={x} y={146} w={14} h={40} vidriera />)}
        {[[36, 1], [284, -1]].map(([x, k]) => (
          <g key={x}>
            <rect x={x - 10} y="96" width="20" height="110" fill={c} stroke={s} strokeWidth="1.5" />
            <Pinaculo x={x} y={96} h={26} c={c} />
            <path d={`M${x + k * 10} 112Q${x + k * 52} 92 ${k > 0 ? 120 : 200} 96`} stroke={c} strokeWidth="7" fill="none" />
            <path d={`M${x + k * 10} 140Q${x + k * 40} 124 ${k > 0 ? 76 : 244} 128`} stroke={c} strokeWidth="6" fill="none" />
          </g>
        ))}
        <Pinaculo x={160} y={30} h={22} c={c} />
      </>
    )
  }
  return (
    <>
      {[[46, 110], [210, 274]].map(([a, b]) => (
        <g key={a}>
          <rect x={a} y="62" width={b - a} height="144" fill={c} />
          <path d={`M${a + 4} 62L${(a + b) / 2} 4L${b - 4} 62Z`} fill={c} stroke={s} strokeWidth="1.2" />
          <Pinaculo x={a + 3} y={62} h={18} c={c} /><Pinaculo x={b - 3} y={62} h={18} c={c} />
          <Lanceta x={a + 12} y={84} w={14} h={58} /><Lanceta x={b - 26} y={84} w={14} h={58} />
          <Lanceta x={(a + b) / 2 - 6} y={150} w={12} h={34} />
        </g>
      ))}
      <path d="M110 206V66L160 28L210 66V206Z" fill={c} />
      <Roseton cx={160} cy={92} r={21} />
      {[72, 58, 44].map((w, i) => <path key={w} d={`M${160 - w / 2} 206V184${curvaArco('apuntado', 160 - w / 2, 184, w)}V206`} fill={i % 2 ? c : '#B3A68D'} stroke={s} strokeWidth="1.3" />)}
      <path d={hueco('apuntado', 142, 184, 36, SUELO)} fill={HUECO} />
      <path d="M118 128L160 104L202 128" stroke={s} strokeWidth="2.5" fill="none" />
      <Pinaculo x={118} y={130} h={16} c={c} /><Pinaculo x={202} y={130} h={16} c={c} />
    </>
  )
}

function Renacimiento({ variante }) {
  const c = '#E9DDC7', s = '#BFAE90'
  if (variante === 'palacio') {
    return (
      <>
        <rect x="30" y="52" width="260" height="154" fill={c} />
        {Array.from({ length: 5 }, (_, fila) => Array.from({ length: 9 }, (_, i) => (
          <rect key={`${fila}${i}`} x={30 + i * 29 - (fila % 2 ? 14 : 0)} y={150 + fila * 11.2} width="28" height="10" rx="2" fill={s} fillOpacity=".75" />
        )))}
        <rect x="30" y="148" width="260" height="58" fill="none" />
        <path d={hueco('medio-punto', 147, 182, 26, SUELO)} fill={HUECO} />
        <rect x="26" y="144" width="268" height="5" fill={s} />
        <rect x="26" y="98" width="268" height="4" fill={s} />
        {[54, 100, 146, 192, 238].map((x, i) => (
          <g key={x}>
            <rect x={x} y="114" width="20" height="28" fill={HUECO} />
            {i % 2
              ? <path d={`M${x - 3} 112Q${x + 10} 100 ${x + 23} 112Z`} fill={s} />
              : <path d={`M${x - 3} 112L${x + 10} 103L${x + 23} 112Z`} fill={s} />}
            <rect x={x} y="66" width="20" height="24" fill={HUECO} />
          </g>
        ))}
        <rect x="20" y="42" width="280" height="10" fill={s} />
        <rect x="24" y="38" width="272" height="4" fill={c} />
      </>
    )
  }
  return (
    <>
      <rect x="128" y="52" width="64" height="26" fill={c} stroke={s} />
      {[136, 152, 168, 182].map(x => <rect key={x} x={x - 2} y="58" width="6" height="12" fill={HUECO} />)}
      <path d="M124 52Q124 14 160 10Q196 14 196 52Z" fill="#B45309" />
      {[140, 160, 180].map(x => <path key={x} d={`M${x} 52Q${x + (x - 160) * 0.05} 22 160 10`} stroke="#E9DDC7" strokeWidth="1.5" fill="none" />)}
      <rect x="154" y="0" width="12" height="11" fill={c} />
      <rect x="60" y="120" width="200" height="86" fill={c} />
      <rect x="110" y="78" width="100" height="42" fill={c} />
      <path d="M60 120Q70 120 80 112T110 100V120Z M260 120Q250 120 240 112T210 100V120Z" fill={c} stroke={s} strokeWidth="1.5" />
      <circle cx="96" cy="112" r="4" fill="none" stroke={s} strokeWidth="1.5" /><circle cx="224" cy="112" r="4" fill="none" stroke={s} strokeWidth="1.5" />
      {[70, 116, 204, 250].map(x => <rect key={x} x={x - 5} y="124" width="10" height="82" fill={s} fillOpacity=".7" />)}
      {[122, 198].map(x => <rect key={x} x={x - 4} y="82" width="8" height="38" fill={s} fillOpacity=".7" />)}
      <rect x="56" y="116" width="208" height="5" fill={s} />
      <Fronton x0={106} x1={214} y={78} alto={24} c={c} s={s} />
      <circle cx="160" cy="98" r="10" fill={HUECO} stroke={s} strokeWidth="2" />
      <path d={hueco('medio-punto', 145, 176, 30, SUELO)} fill={HUECO} />
      <path d="M140 160L160 148L180 160Z" fill={s} />
    </>
  )
}

function Barroco({ variante }) {
  const c = '#DDB57E', s = '#9A6B32'
  const torres = variante === 'torres'
  return (
    <>
      {torres && [[44, 98], [222, 276]].map(([a, b]) => (
        <g key={a}>
          <rect x={a} y="78" width={b - a} height="128" fill={c} />
          <rect x={a + 6} y="52" width={b - a - 12} height="26" fill={c} stroke={s} />
          <rect x={a + 12} y="34" width={b - a - 24} height="18" fill={c} stroke={s} />
          <ellipse cx={(a + b) / 2} cy="28" rx={(b - a) / 2 - 12} ry="9" fill={s} />
          <path d={`M${(a + b) / 2} 19V4`} stroke={s} strokeWidth="2.5" /><circle cx={(a + b) / 2} cy="4" r="3" fill="#FBBF24" />
          <path d={hueco('medio-punto', (a + b) / 2 - 7, 62, 14, 76)} fill={HUECO} />
          {[a + 4, b - 4].map(x => <circle key={x} cx={x} cy="74" r="4" fill={s} />)}
        </g>
      ))}
      <path d="M98 206V58Q98 44 116 46Q130 48 132 36Q140 22 160 22Q180 22 188 36Q190 48 204 46Q222 44 222 58V206Z" fill={c} />
      {!torres && (
        <>
          <path d="M98 150Q74 150 64 172Q58 190 70 206H98Z M222 150Q246 150 256 172Q262 190 250 206H222Z" fill={c} stroke={s} strokeWidth="1.5" />
          <circle cx="76" cy="176" r="6" fill="none" stroke={s} strokeWidth="2" /><circle cx="244" cy="176" r="6" fill="none" stroke={s} strokeWidth="2" />
        </>
      )}
      {[112, 132, 188, 208].map(x => <Columna key={x} orden="salomonica" x={x} arriba={126} abajo={204} w={11} c={c} s={s} />)}
      <path d={hueco('medio-punto', 142, 168, 36, SUELO)} fill={HUECO} />
      <rect x="100" y="118" width="120" height="8" fill={s} />
      <path d="M102 116Q112 96 140 104M218 116Q208 96 180 104" stroke={s} strokeWidth="5" fill="none" strokeLinecap="round" />
      <ellipse cx="160" cy="100" rx="11" ry="14" fill={s} /><ellipse cx="160" cy="100" rx="6" ry="8" fill="#FBBF24" fillOpacity=".7" />
      {!torres && [118, 202].map(x => <Columna key={x} orden="salomonica" x={x} arriba={54} abajo={114} w={9} c={c} s={s} />)}
      <ellipse cx="160" cy="66" rx="15" ry="11" fill={HUECO} stroke={s} strokeWidth="3" />
      {[[104, 52], [216, 52], [160, 18]].map(([x, y]) => <g key={x}><path d={`M${x} ${y}V${y - 8}`} stroke={s} strokeWidth="2" /><circle cx={x} cy={y - 10} r="3.5" fill={s} /></g>)}
      {[[124, 44], [196, 44]].map(([x, y]) => <path key={x} d={`M${x - 8} ${y}q4 -10 8 -4t8 -2`} stroke={s} strokeWidth="2" fill="none" />)}
    </>
  )
}

function Neoclasico() {
  const ladrillo = '#C98F74', c = '#EDE6DA', s = '#B8AE9C'
  const xs = [114, 132, 151, 169, 188, 206]
  return (
    <>
      <rect x="12" y="78" width="296" height="128" fill={ladrillo} />
      <rect x="8" y="72" width="304" height="7" fill={c} />
      {Array.from({ length: 38 }, (_, i) => <rect key={i} x={10 + i * 8} y="62" width="3" height="10" fill={c} />)}
      <rect x="8" y="60" width="304" height="3" fill={c} />
      <rect x="12" y="136" width="296" height="5" fill={c} />
      {[24, 50, 76, 222, 248, 274].map(x => (
        <g key={x}>
          <rect x={x} y="94" width="14" height="28" fill={HUECO} stroke={c} strokeWidth="2" />
          <rect x={x} y="152" width="14" height="32" fill={HUECO} stroke={c} strokeWidth="2" />
        </g>
      ))}
      <rect x="100" y="86" width="120" height="104" fill="#8C6A57" />
      <rect x="148" y="150" width="24" height="40" fill={HUECO} />
      {xs.map(x => <Columna key={x} orden="dorica" x={x} arriba={92} abajo={190} w={12} c={c} s={s} />)}
      <rect x="100" y="80" width="120" height="12" fill={c} stroke={s} />
      <Fronton x0={96} x1={224} y={80} alto={24} c={c} s={s} />
      <rect x="92" y="190" width="136" height="8" fill={c} /><rect x="86" y="198" width="148" height="8" fill={s} />
    </>
  )
}

const EDIFICIOS = { griego: Griego, romano: Romano, islamico: Islamico, romanico: Romanico, gotico: Gotico, renacimiento: Renacimiento, barroco: Barroco, neoclasico: Neoclasico }

// ── Elementos sueltos ────────────────────────────────────────────────────
function ArcoSuelto({ tipo }) {
  const c = '#D6C4A0', s = '#9C8460', w = 100
  return (
    <>
      <rect x="70" y="10" width="180" height="196" fill={c} />
      {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M70 ${30 + i * 22}H250`} stroke={s} strokeWidth="1" strokeOpacity=".5" />)}
      <Rosca tipo={tipo} x={110} y={132} w={w} c={s} g={12} />
      <path d={hueco(tipo, 110, 132, w, SUELO)} fill={HUECO} />
      <path d="M104 132H116M204 132H216" stroke={s} strokeWidth="4" />
    </>
  )
}
function ColumnaSuelta({ tipo }) {
  const c = '#E7DCC4', s = '#B9A57E'
  return (
    <>
      <rect x="96" y="14" width="128" height="16" fill={c} stroke={s} />
      <Columna orden={tipo} x={160} arriba={30} abajo={192} w={tipo === 'dorica' ? 36 : 30} c={c} s={s} />
      <rect x="112" y="192" width="96" height="14" fill={s} />
    </>
  )
}

export default function Edificio({ ronda, t }) {
  const r = ronda
  let dibujo
  if (r.pregunta === 'arco') dibujo = <ArcoSuelto tipo={r.bueno} />
  else if (r.pregunta === 'columna') dibujo = <ColumnaSuelta tipo={r.bueno} />
  else { const E = EDIFICIOS[r.estilo]; dibujo = <E variante={r.variante} /> }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={t.aria}>
      <rect x="0" y={SUELO} width={W} height={H - SUELO} fill="#334155" />
      {dibujo}
    </svg>
  )
}
