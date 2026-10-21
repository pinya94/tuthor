// Retrato dibujado de un personaje de ¿Quién es Quién?: busto con la piel, el
// pelo, el bigote o la barba, las gafas, el sombrero y la ropa que lo
// delatan. Los rasgos salen de src/data/rostros.js; si un personaje no tiene,
// se dibuja un busto neutro de su género.
import { RASGOS } from '../../data/rostros'

const PIEL = ['#F3D2B8', '#E6B48F', '#CF9A70', '#A36C47', '#6B4430']
const PELO = { negro: '#1C1917', castano: '#5B3A1E', rubio: '#D9A842', pelirrojo: '#B4532A', canoso: '#9CA3AF', blanco: '#E7E5E4' }
const ORO = '#FACC15'
const LINEA = '#1C1917'

// Cabeza: centro (50, 46), media anchura 16, de la frente (27) a la barbilla (65).
function PeloDetras({ pelo, c }) {
  switch (pelo) {
    case 'melena': return <path d="M31 40 Q30 24 50 23 Q70 24 69 40 L71 70 Q60 74 50 72 Q40 74 29 70 Z" fill={c} />
    case 'largo': return <path d="M31 40 Q30 24 50 23 Q70 24 69 40 L73 86 Q50 92 27 86 Z" fill={c} />
    case 'corto_m': return <path d="M31 40 Q30 24 50 23 Q70 24 69 40 L70 60 Q66 63 62 61 L38 61 Q34 63 30 60 Z" fill={c} />
    case 'largo_h': return <path d="M32 38 Q31 24 50 23 Q69 24 68 38 L70 66 Q64 69 60 66 L40 66 Q36 69 30 66 Z" fill={c} />
    case 'calvo_largo': return <path d="M33 44 L30 68 Q34 71 38 67 L36 46 Z M67 44 L70 68 Q66 71 62 67 L64 46 Z" fill={c} />
    case 'peluca': return <path d="M48 60 L52 60 L53 74 L47 74 Z" fill={c} />
    case 'peluca_larga': return <path d="M30 36 Q28 18 50 18 Q72 18 70 36 L76 80 Q72 86 66 82 L60 70 L40 70 L34 82 Q28 86 24 80 Z" fill={c} />
    case 'alborotado': return <path d="M30 44 Q20 38 26 30 Q22 20 34 20 Q38 12 48 16 Q56 10 64 17 Q76 16 74 28 Q82 34 72 44 Z" fill={c} />
    case 'moño': return <circle cx="50" cy="20" r="8" fill={c} />
    default: return null
  }
}

function PeloDelante({ pelo, c }) {
  switch (pelo) {
    case 'corto': return <path d="M33 40 Q32 25 50 24.5 Q68 25 67 40 Q66 33 60 31 Q50 29 40 31 Q34 33 33 40 Z" fill={c} />
    case 'raya': return <path d="M33 41 Q32 24 50 24 Q68 24 67 41 Q66 32 58 30 Q46 30 42 35 Q40 30 36 33 Q34 36 33 41 Z" fill={c} />
    case 'atras': return <path d="M33 38 Q33 23 50 23 Q67 23 67 38 Q64 29 50 28.5 Q36 29 33 38 Z" fill={c} />
    case 'entradas': return <path d="M33 39 Q33 25 50 24.5 Q67 25 67 39 Q65 32 60 32 Q56 28 50 30 Q44 28 40 32 Q35 32 33 39 Z" fill={c} />
    case 'flequillo': return <path d="M33 40 Q32 24 50 24 Q68 24 67 38 Q60 30 52 31 Q46 34 38 40 Q35 38 33 40 Z" fill={c} />
    case 'rizado': return (
      <g fill={c}>
        {[[35, 33], [40, 27.5], [47, 25], [54, 25], [60, 27.5], [65, 33], [33, 40], [67, 40]].map(([x, y]) => <circle key={x + '-' + y} cx={x} cy={y} r="5" />)}
      </g>
    )
    case 'calvo_lados': case 'calvo_largo': return <path d="M33 47 Q32 38 36 36 L37 46 Z M67 47 Q68 38 64 36 L63 46 Z" fill={c} />
    case 'tonsura': return <path d="M32 42 Q31 30 38 28 Q50 34 62 28 Q69 30 68 42 Q64 36 50 37 Q36 36 32 42 Z" fill={c} />
    case 'peluca': return (
      <g fill={c}>
        <path d="M33 40 Q32 23 50 23 Q68 23 67 40 Q63 30 50 29 Q37 30 33 40 Z" />
        <ellipse cx="31.5" cy="44" rx="4" ry="3.2" /><ellipse cx="31.5" cy="50" rx="4" ry="3.2" />
        <ellipse cx="68.5" cy="44" rx="4" ry="3.2" /><ellipse cx="68.5" cy="50" rx="4" ry="3.2" />
      </g>
    )
    case 'peluca_larga': return <path d="M33 42 Q33 26 50 25 Q67 26 67 42 Q63 31 50 30 Q37 31 33 42 Z" fill={c} />
    case 'alborotado': return <path d="M33 40 Q34 27 42 28 Q46 24 50 28 Q55 24 58 29 Q66 27 67 40 Q62 33 50 33 Q38 33 33 40 Z" fill={c} />
    case 'melena': case 'largo': case 'corto_m': case 'largo_h': return <path d="M33 42 Q32 25 50 25 Q68 25 67 42 Q62 31 52 30 Q49 34 40 33 Q35 35 33 42 Z" fill={c} />
    case 'moño': case 'recogido': return (
      <g>
        <path d="M33 40 Q32 24 50 24 Q68 24 67 40 Q64 30 51 29 L50 31 L49 29 Q36 30 33 40 Z" fill={c} />
        {pelo === 'recogido' && <circle cx="67" cy="38" r="5.5" fill={c} />}
      </g>
    )
    default: return null
  }
}

function Barba({ barba, bigote, c }) {
  const piezas = []
  if (barba === 'corta') piezas.push(<path key="b" d="M34 50 Q35 66 50 68 Q65 66 66 50 Q63 60 56 60 Q50 57 44 60 Q37 60 34 50 Z" fill={c} />)
  if (barba === 'larga') piezas.push(<path key="b" d="M34 50 Q33 64 40 74 Q50 86 60 74 Q67 64 66 50 Q63 60 56 60 Q50 57 44 60 Q37 60 34 50 Z" fill={c} />)
  if (barba === 'puntiaguda') piezas.push(<path key="b" d="M36 54 Q38 64 50 74 Q62 64 64 54 Q60 61 50 61 Q40 61 36 54 Z" fill={c} />)
  if (barba === 'perilla') piezas.push(<path key="b" d="M45 60 Q50 59 55 60 L53 68 Q50 70 47 68 Z" fill={c} />)
  if (barba === 'collar') piezas.push(<path key="b" d="M33 48 Q34 66 50 69 Q66 66 67 48 L64 50 Q62 62 50 64 Q38 62 36 50 Z" fill={c} />)
  if (barba === 'corta' || barba === 'larga' || barba === 'perilla' || barba === 'puntiaguda') bigote = bigote ?? 'fino'
  if (bigote === 'fino') piezas.push(<path key="m" d="M43 55.5 Q50 53 57 55.5 Q50 55 43 55.5 Z" stroke={c} strokeWidth="1.8" fill={c} strokeLinejoin="round" />)
  if (bigote === 'cepillo') piezas.push(<rect key="m" x="46.5" y="53" width="7" height="3.6" rx="0.6" fill={c} />)
  if (bigote === 'grueso') piezas.push(<path key="m" d="M41 57 Q42 52 50 52.5 Q58 52 59 57 Q55 55.5 50 56 Q45 55.5 41 57 Z" fill={c} />)
  if (bigote === 'poblado') piezas.push(<path key="m" d="M40 58 Q40 51 50 51.5 Q60 51 60 58 Q56 55.5 50 56 Q44 55.5 40 58 Z" fill={c} />)
  return <>{piezas}</>
}

function Gafas({ gafas }) {
  if (gafas === 'redondas') return (
    <g fill="rgba(255,255,255,0.18)" stroke={LINEA} strokeWidth="1.4">
      <circle cx="43" cy="45" r="4.6" /><circle cx="57" cy="45" r="4.6" /><path d="M47.6 45 Q50 43.5 52.4 45" fill="none" />
    </g>
  )
  if (gafas === 'pasta') return (
    <g fill="rgba(255,255,255,0.15)" stroke={LINEA} strokeWidth="2.4">
      <rect x="37.5" y="41.5" width="10" height="7.5" rx="2" /><rect x="52.5" y="41.5" width="10" height="7.5" rx="2" /><path d="M47.5 44.5 L52.5 44.5" />
    </g>
  )
  return null
}

function Sombrero({ som }) {
  switch (som) {
    case 'gorra': return (
      <g>
        <path d="M30 31 Q31 16 50 15 Q69 16 70 31 Z" fill="#57534E" />
        <rect x="31" y="29" width="38" height="4" fill="#1C1917" />
        <path d="M34 33 Q50 40 66 33 L66 35 Q50 42 34 35 Z" fill="#1C1917" />
        <circle cx="50" cy="24" r="2.6" fill={ORO} />
      </g>
    )
    case 'kepi': return (
      <g>
        <path d="M34 32 L36 14 L64 14 L66 32 Z" fill="#1E3A8A" />
        <rect x="34" y="26" width="32" height="6" fill="#1C1917" />
        <path d="M37 18 L63 18 M37 22 L63 22" stroke={ORO} strokeWidth="1.2" />
        <path d="M34 32 Q50 38 66 32 L66 34 Q50 40 34 34 Z" fill="#1C1917" />
      </g>
    )
    case 'boina': return (
      <g>
        <path d="M30 33 Q26 20 46 18 Q66 16 70 28 L68 33 Z" fill="#111827" />
        <circle cx="38" cy="27" r="2.4" fill={ORO} /><circle cx="44" cy="25.5" r="2.4" fill="#E5E7EB" />
      </g>
    )
    case 'bicornio': return (
      <g>
        <path d="M18 34 Q30 6 50 14 Q70 6 82 34 Q66 26 50 28 Q34 26 18 34 Z" fill="#111827" />
        <circle cx="50" cy="21" r="3.4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.1" /><circle cx="50" cy="21" r="1.2" fill="#DC2626" />
      </g>
    )
    case 'tricornio': return <path d="M24 32 Q30 16 50 17 Q70 16 76 32 Q62 25 50 28 Q38 25 24 32 Z" fill="#111827" />
    case 'chistera': return (
      <g>
        <rect x="36" y="2" width="28" height="26" rx="1" fill="#111827" />
        <rect x="36" y="22" width="28" height="3" fill="#374151" />
        <rect x="28" y="27" width="44" height="4" rx="2" fill="#111827" />
      </g>
    )
    case 'fedora': return (
      <g>
        <path d="M35 29 Q35 15 50 15 Q65 15 65 29 Z" fill="#292524" />
        <path d="M44 16 Q50 20 56 16" stroke="#1C1917" strokeWidth="1.4" fill="none" />
        <rect x="35" y="25" width="30" height="3.2" fill="#0C0A09" />
        <ellipse cx="50" cy="30" rx="22" ry="3.2" fill="#292524" />
      </g>
    )
    case 'corona': return (
      <g>
        <path d="M34 30 L34 16 L40 23 L45 13 L50 21 L55 13 L60 23 L66 16 L66 30 Z" fill={ORO} stroke="#A16207" strokeWidth="1" />
        <circle cx="50" cy="26" r="2" fill="#DC2626" /><circle cx="41" cy="27" r="1.5" fill="#2563EB" /><circle cx="59" cy="27" r="1.5" fill="#2563EB" />
      </g>
    )
    case 'laurel': return (
      <g fill="#65A30D">
        {[[-1, 33, 30], [-1, 37, 26.5], [-1, 42, 24.5], [1, 58, 24.5], [1, 63, 26.5], [1, 67, 30]].map(([s, x, y]) => (
          <ellipse key={x} cx={x} cy={y} rx="3.4" ry="1.8" transform={`rotate(${s * 35} ${x} ${y})`} />
        ))}
      </g>
    )
    case 'casco': return (
      <g>
        <path d="M31 40 Q30 15 50 13 Q70 15 69 40 L66 40 Q66 26 50 25 Q34 26 34 40 Z" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
        <path d="M50 13 L50 25" stroke="#475569" strokeWidth="1.2" />
        <rect x="48.2" y="25" width="3.6" height="18" rx="1" fill="#94A3B8" stroke="#475569" strokeWidth="0.8" />
        <path d="M31 40 L31 56 Q34 60 36 55 L35 40 Z M69 40 L69 56 Q66 60 64 55 L65 40 Z" fill="#CBD5E1" />
      </g>
    )
    case 'tocado': return (
      <g>
        <path d="M32 40 Q31 22 50 22 Q69 22 68 40 L72 66 L64 66 L64 46 L36 46 L36 66 L28 66 Z" fill="#111827" />
        <path d="M32 33 Q50 26 68 33 L68 36 Q50 29 32 36 Z" fill={ORO} />
        <path d="M50 24 Q47 20 50 16 Q53 20 50 24 Z" fill={ORO} />
      </g>
    )
    case 'toca': return (
      <g>
        <path d="M29 44 Q28 18 50 18 Q72 18 71 44 L74 74 L26 74 Z" fill="#F5F5F4" />
        <path d="M34 42 Q34 26 50 26 Q66 26 66 42 Q66 60 50 66 Q34 60 34 42 Z" fill="#E7E5E4" />
      </g>
    )
    case 'toca_fr': return (
      <g>
        <path d="M30 46 Q28 20 50 19 Q72 20 70 46 L74 70 L64 70 L66 46 Q64 30 50 29 Q36 30 34 46 L36 70 L26 70 Z" fill="#111827" />
        <path d="M33 42 Q33 27 50 26 Q67 27 67 42" stroke={ORO} strokeWidth="1.8" fill="none" />
      </g>
    )
    case 'gorro': return <path d="M33 34 Q30 18 50 17 Q70 18 67 34 Q50 29 33 34 Z" fill="#111827" />
    case 'pluma': return (
      <g>
        <path d="M26 31 Q32 19 50 19 Q68 19 74 31 Q50 26 26 31 Z" fill="#111827" />
        <path d="M58 22 Q70 6 80 10 Q72 14 62 24 Z" fill="#F5F5F4" />
      </g>
    )
    default: return null
  }
}

// Ropa: los hombros, de y = 74 a 100.
function Ropa({ ropa, c, mujer }) {
  const hombros = 'M12 100 Q14 77 50 75 Q86 77 88 100 Z'
  switch (ropa) {
    case 'traje': case 'pajarita': return (
      <g>
        <path d={hombros} fill={c ?? '#1F2937'} />
        <path d="M42 75 L50 92 L58 75 Z" fill="#F8FAFC" />
        {ropa === 'traje'
          ? <path d="M48 78 L52 78 L53 92 L50 96 L47 92 Z" fill="#B91C1C" />
          : <path d="M43 76 L50 79 L57 76 L57 82 L50 79 L43 82 Z" fill="#111827" />}
        <path d="M42 75 L48 90 M58 75 L52 90" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" />
      </g>
    )
    case 'uniforme': return (
      <g>
        <path d={hombros} fill={c ?? '#57534E'} />
        <path d="M43 75 L50 84 L57 75 Z" fill="#E7E5E4" opacity="0.9" />
        <path d="M45 75 L50 81 L55 75" fill="#1C1917" />
        <rect x="16" y="80" width="14" height="4" rx="1" fill={ORO} transform="rotate(-14 23 82)" />
        <rect x="70" y="80" width="14" height="4" rx="1" fill={ORO} transform="rotate(14 77 82)" />
        <rect x="31" y="88" width="10" height="3" fill="#DC2626" /><rect x="31" y="91" width="10" height="3" fill="#2563EB" />
        <circle cx="50" cy="90" r="1.3" fill={ORO} /><circle cx="50" cy="96" r="1.3" fill={ORO} />
      </g>
    )
    case 'casaca': return (
      <g>
        <path d={hombros} fill={c ?? '#1E3A8A'} />
        <path d="M44 75 Q50 79 56 75 L58 82 Q54 92 50 90 Q46 92 42 82 Z" fill="#F8FAFC" />
        <path d="M44 84 Q47 89 50 87 Q53 89 56 84" stroke="#CBD5E1" strokeWidth="1" fill="none" />
        <circle cx="38" cy="90" r="1.3" fill={ORO} /><circle cx="62" cy="90" r="1.3" fill={ORO} />
      </g>
    )
    case 'gorguera': return (
      <g>
        <path d={hombros} fill={c ?? '#111827'} />
        <ellipse cx="50" cy="74" rx="15" ry="5" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="0.9" />
        <path d="M37 74 Q40 77 43 74 Q46 77 50 74 Q54 77 57 74 Q60 77 63 74" stroke="#CBD5E1" strokeWidth="0.9" fill="none" />
        {mujer && [36, 43, 50, 57, 64].map(x => <circle key={x} cx={x} cy={88 - Math.abs(50 - x) * 0.25} r="1.4" fill="#F8FAFC" />)}
      </g>
    )
    case 'armadura': return (
      <g>
        <path d={hombros} fill="#94A3B8" stroke="#475569" strokeWidth="1" />
        <path d="M20 86 Q30 80 38 84 M62 84 Q70 80 80 86" stroke="#475569" strokeWidth="1.6" fill="none" />
        <path d="M44 75 L56 75 L58 82 L42 82 Z" fill="#64748B" />
        {c && <path d="M50 84 L50 100 M43 91 L57 91" stroke={c} strokeWidth="3.5" />}
      </g>
    )
    case 'toga': return (
      <g>
        <path d={hombros} fill={c ?? '#F5F5F4'} />
        <path d="M14 98 Q30 80 58 76 Q40 88 36 100 Z" fill="rgba(0,0,0,0.12)" />
        <path d="M60 76 Q74 82 80 96" stroke="rgba(0,0,0,0.18)" strokeWidth="1.4" fill="none" />
      </g>
    )
    case 'manto': return (
      <g>
        <path d={hombros} fill={c ?? '#991B1B'} />
        <path d="M22 84 Q36 76 50 76 Q64 76 78 84 L76 88 Q64 81 50 81 Q36 81 24 88 Z" fill="#F8FAFC" />
        {[30, 40, 50, 60, 70].map(x => <circle key={x} cx={x} cy={x === 50 ? 79 : x === 40 || x === 60 ? 80 : 83} r="0.9" fill="#111827" />)}
      </g>
    )
    case 'habito': return (
      <g>
        <path d={hombros} fill={c ?? '#44403C'} />
        <path d="M30 78 Q50 70 70 78 Q66 88 50 88 Q34 88 30 78 Z" fill="rgba(0,0,0,0.25)" />
      </g>
    )
    case 'bata': return (
      <g>
        <path d={hombros} fill="#F8FAFC" />
        <path d="M42 75 L50 90 L58 75 Z" fill={c ?? '#334155'} />
        <path d="M40 75 L47 96 M60 75 L53 96" stroke="#CBD5E1" strokeWidth="1.5" />
        <rect x="64" y="88" width="9" height="6" rx="1" fill="none" stroke="#CBD5E1" strokeWidth="1" />
        <path d="M67 84 L67 89" stroke="#2563EB" strokeWidth="1.6" />
      </g>
    )
    case 'estampada': return (
      <g>
        <path d={hombros} fill={c ?? '#B45309'} />
        {[[26, 88], [38, 84], [62, 84], [74, 88], [32, 96], [50, 96], [68, 96]].map(([x, y]) => (
          <path key={x + '-' + y} d={`M${x - 3} ${y} L${x} ${y - 3} L${x + 3} ${y} L${x} ${y + 3} Z`} fill="#FDE68A" />
        ))}
        <path d="M44 75 L50 81 L56 75" stroke="#78350F" strokeWidth="1.5" fill="none" />
      </g>
    )
    case 'vestido': return (
      <g>
        <path d={hombros} fill={c ?? '#7C3AED'} />
        <path d="M42 75 Q50 84 58 75 Z" fill="var(--piel)" />
      </g>
    )
    case 'camisa': default: return (
      <g>
        <path d={hombros} fill={c ?? '#475569'} />
        <path d="M43 75 L50 82 L57 75 L54 74 L50 79 L46 74 Z" fill="rgba(255,255,255,0.35)" />
      </g>
    )
  }
}

export default function Retrato({ p, className = '' }) {
  const r = RASGOS[p.id] ?? {}
  const mujer = p.atributos?.genero === 'mujer'
  const piel = PIEL[r.piel ?? 0]
  const pelo = r.pelo ?? (mujer ? 'melena' : 'corto')
  const cPelo = PELO[r.cpelo ?? 'castano']
  const cBarba = PELO[r.cbarba ?? r.cpelo ?? 'castano']
  // El casco y los tocados tapan también los lados: debajo no asoma el pelo
  const tapaPelo = ['casco', 'tocado', 'toca', 'toca_fr'].includes(r.som)
  return (
    <svg viewBox="17 8 66 70" preserveAspectRatio="xMidYMin slice" className={className} style={{ '--piel': piel }} aria-hidden="true">
      <Ropa ropa={r.ropa ?? (mujer ? 'vestido' : 'camisa')} c={r.cropa} mujer={mujer} />
      {r.som !== 'toca' && <PeloDetras pelo={pelo} c={cPelo} />}
      {r.som === 'toca' && <Sombrero som="toca" />}
      <rect x="44" y="58" width="12" height="18" rx="3" fill={piel} />
      <ellipse cx="33.5" cy="47" rx="3" ry="4.5" fill={piel} />
      <ellipse cx="66.5" cy="47" rx="3" ry="4.5" fill={piel} />
      <ellipse cx="50" cy="46" rx="16" ry="19.5" fill={piel} />
      {/* ojos, cejas, nariz y boca */}
      <path d={r.cejas ? 'M38 38.5 Q43 35 48 38.5 M52 38.5 Q57 35 62 38.5' : 'M39 39.5 Q43 37.5 47 39.5 M53 39.5 Q57 37.5 61 39.5'} stroke={PELO[r.cpelo === 'blanco' || r.cpelo === 'canoso' ? 'canoso' : 'negro']} strokeWidth={r.cejas ? 3 : 1.5} strokeLinecap="round" fill="none" />
      <circle cx="43" cy="45" r="1.8" fill={LINEA} /><circle cx="57" cy="45" r="1.8" fill={LINEA} />
      {mujer && <path d="M40 43.5 L39 42 M46 43.5 L47 42 M54 43.5 L53 42 M60 43.5 L61 42" stroke={LINEA} strokeWidth="0.9" />}
      <path d="M50 46 L48 52 L51 52.5" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={r.sonrisa ? 'M44 57.5 Q50 62 56 57.5' : 'M45.5 58 Q50 60 54.5 58'} stroke={mujer ? '#BE123C' : '#7F1D1D'} strokeWidth={mujer ? 2.2 : 1.5} fill="none" strokeLinecap="round" />
      {mujer && <><circle cx="40" cy="51" r="2.6" fill="#F87171" opacity="0.28" /><circle cx="60" cy="51" r="2.6" fill="#F87171" opacity="0.28" /></>}
      <Barba barba={r.barba} bigote={r.bigote} c={cBarba} />
      {!tapaPelo && <PeloDelante pelo={pelo} c={cPelo} />}
      <Gafas gafas={r.gafas} />
      {r.ext?.includes('cigarro') && <g><rect x="54" y="58" width="13" height="3" rx="1" fill="#78350F" transform="rotate(12 54 58)" /><circle cx="67" cy="61" r="1.2" fill="#F97316" /></g>}
      {(mujer && !r.ext?.includes('sin_pendientes')) && <><circle cx="33" cy="53" r="1.8" fill={ORO} /><circle cx="67" cy="53" r="1.8" fill={ORO} /></>}
      {r.ext?.includes('perlas') && [38, 43, 50, 57, 62].map(x => <circle key={x} cx={x} cy={x === 50 ? 82 : x === 43 || x === 57 ? 81 : 78.5} r="1.6" fill="#F8FAFC" />)}
      {r.ext?.includes('collar_egipcio') && <path d="M36 76 Q50 90 64 76 L60 76 Q50 84 40 76 Z" fill={ORO} stroke="#0EA5E9" strokeWidth="1.2" />}
      {r.som !== 'toca' && <Sombrero som={r.som} />}
      {r.ext?.includes('gafas_piloto') && <g><circle cx="44" cy="24" r="4" fill="#94A3B8" stroke={LINEA} strokeWidth="1.2" /><circle cx="56" cy="24" r="4" fill="#94A3B8" stroke={LINEA} strokeWidth="1.2" /></g>}
    </svg>
  )
}
