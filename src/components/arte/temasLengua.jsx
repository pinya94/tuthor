// Arte de los temas de lengua: gramática (clases de palabras, sintaxis),
// tiempos verbales del inglés y ortografía. Las clases de palabras son las
// mismas en castellano e inglés, así que sus dibujos no llevan texto y los
// comparten las dos gramáticas.
import { Lienzo, T, Flecha, FlechaCurva } from './base'

const ROSA = '#F472B6'
const CIELO = '#38BDF8'
const AMBAR = '#FBBF24'
const VERDE = '#34D399'

// Casilla para un objeto / palabra.
function Casilla({ x, y = 24, w = 56, h = 72 }) {
  return <rect x={x} y={y} width={w} height={h} rx="10" fill="#FFFFFF" fillOpacity=".05" stroke="#FFFFFF" strokeOpacity=".08" />
}

// ── CLASES DE PALABRAS ─────────────────────────────────────────────────────

// Sustantivos: las cosas con nombre (una casa, un gato, un árbol).
function Sustantivos(p) {
  return (
    <Lienzo {...p}>
      {[24, 92, 160].map(x => <Casilla key={x} x={x} />)}
      <path d="M34 66L52 50L70 66Z" fill="#FB7185" />
      <rect x="38" y="66" width="28" height="22" fill="#FDE68A" />
      <rect x="48" y="74" width="8" height="14" fill="#92400E" />
      <path d="M108 52L112 64L118 60ZM132 52L128 64L122 60Z" fill="#F59E0B" />
      <circle cx="120" cy="70" r="14" fill="#F59E0B" />
      <circle cx="115" cy="68" r="1.8" fill="#1C1917" />
      <circle cx="125" cy="68" r="1.8" fill="#1C1917" />
      <path d="M116 75Q120 78 124 75M104 72H112M128 72H136" stroke="#78350F" strokeWidth="1.3" strokeLinecap="round" />
      <rect x="184" y="70" width="8" height="18" fill="#92400E" />
      <circle cx="188" cy="60" r="15" fill="#22C55E" />
      {[34, 102, 170].map(x => <rect key={x} x={x} y="104" width="36" height="7" rx="3.5" fill={ROSA} />)}
    </Lienzo>
  )
}

// Adjetivos: cómo son las cosas — tamaño y color.
function Adjetivos(p) {
  return (
    <Lienzo {...p}>
      <circle cx="42" cy="92" r="10" fill={VERDE} />
      <circle cx="92" cy="78" r="24" fill={VERDE} />
      <path d="M36 110H118" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
      {/* paleta de colores */}
      <path d="M150 40Q196 28 214 56Q226 80 200 84Q188 84 190 96Q192 112 170 108Q140 102 138 74Q138 48 150 40Z" fill="#FDE68A" />
      <circle cx="202" cy="66" r="7" fill="#141b2e" />
      {[[160, 54, '#EF4444'], [182, 46, CIELO], [158, 78, ROSA], [174, 92, '#8B5CF6']].map(([x, y, c]) => <circle key={x + y} cx={x} cy={y} r="7" fill={c} />)}
      <path d="M200 102L228 128" stroke="#92400E" strokeWidth="4" strokeLinecap="round" />
      <path d="M196 98L204 106L198 110Z" fill="#EF4444" />
    </Lienzo>
  )
}

function Determinantes(p) {
  const fichas = [['el', 26, 28], ['la', 82, 28], ['un', 26, 74], ['una', 82, 74]]
  return (
    <Lienzo {...p}>
      {fichas.map(([t, x, y]) => (
        <g key={t}>
          <rect x={x} y={y} width="46" height="36" rx="9" fill="#F59E0B" fillOpacity=".2" stroke={AMBAR} strokeWidth="2" />
          <T x={x + 23} y={y + 24} s={17} c="#FDE68A">{t}</T>
        </g>
      ))}
      <Flecha x1={140} y1={68} x2={166} y2={68} c="#FDE68A" w={3} />
      <rect x="176" y="46" width="44" height="44" rx="10" fill={ROSA} />
      <path d="M198 56Q208 56 208 66Q208 80 198 80Q188 80 188 66Q188 56 198 56Z" fill="#FDF2F8" fillOpacity=".5" />
    </Lienzo>
  )
}

// Pronombres: una palabra que ocupa el sitio de un nombre.
function Pronombres(p) {
  return (
    <Lienzo {...p}>
      <rect x="28" y="50" width="70" height="36" rx="10" fill={ROSA} />
      <rect x="40" y="64" width="46" height="8" rx="4" fill="#FDF2F8" fillOpacity=".6" />
      <FlechaCurva x1={100} y1={52} cx={130} cy={22} x2={156} y2={52} c="#E2E8F0" w={2.5} />
      <FlechaCurva x1={156} y1={86} cx={130} cy={116} x2={100} y2={86} c="#E2E8F0" w={2.5} dash="4 4" />
      <circle cx="192" cy="54" r="12" fill={CIELO} />
      <path d="M172 96Q172 70 192 70Q212 70 212 96Z" fill={CIELO} />
    </Lienzo>
  )
}

// Verbos: la acción.
function Verbos(p) {
  return (
    <Lienzo {...p}>
      <path d="M54 50H92M44 66H88M58 82H94" stroke="#FFFFFF" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
      <circle cx="136" cy="30" r="11" fill="#FB923C" />
      <path d="M132 44L122 76M128 52L146 64M128 52L110 58M122 76L140 94L152 90M122 76L106 94L96 110" stroke="#FB923C" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M70 116H200" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
    </Lienzo>
  )
}

// Adverbios: cómo (rápido, despacio) y cuándo.
function Adverbios(p) {
  const tramos = [['#34D399', 180, 225], ['#FBBF24', 225, 270], ['#FB923C', 270, 315], ['#F87171', 315, 360]]
  const arco = (a0, a1) => {
    const r = 40, cx = 76, cy = 92
    const p0 = [cx + r * Math.cos(a0 * Math.PI / 180), cy + r * Math.sin(a0 * Math.PI / 180)]
    const p1 = [cx + r * Math.cos(a1 * Math.PI / 180), cy + r * Math.sin(a1 * Math.PI / 180)]
    return `M${p0[0].toFixed(1)} ${p0[1].toFixed(1)}A${r} ${r} 0 0 1 ${p1[0].toFixed(1)} ${p1[1].toFixed(1)}`
  }
  return (
    <Lienzo {...p}>
      {tramos.map(([c, a0, a1]) => <path key={c} d={arco(a0, a1)} stroke={c} strokeWidth="10" />)}
      <path d="M76 92L104 66" stroke="#F8FAFC" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="76" cy="92" r="6" fill="#F8FAFC" />
      <circle cx="178" cy="68" r="32" fill="#F0F9FF" stroke={CIELO} strokeWidth="5" />
      <path d="M178 68V48M178 68L192 76" stroke="#0C4A6E" strokeWidth="3.5" strokeLinecap="round" />
      {[0, 90, 180, 270].map(a => {
        const r = (a * Math.PI) / 180
        return <circle key={a} cx={178 + 24 * Math.cos(r)} cy={68 + 24 * Math.sin(r)} r="2" fill="#0C4A6E" />
      })}
    </Lienzo>
  )
}

// Nexos: lo que une dos palabras o dos frases.
function Nexos(p) {
  return (
    <Lienzo {...p}>
      <rect x="18" y="50" width="70" height="36" rx="10" fill={ROSA} />
      <rect x="152" y="50" width="70" height="36" rx="10" fill={CIELO} />
      <rect x="84" y="58" width="40" height="20" rx="10" stroke="#E2E8F0" strokeWidth="5" />
      <rect x="116" y="58" width="40" height="20" rx="10" stroke={AMBAR} strokeWidth="5" />
    </Lienzo>
  )
}

// Sintaxis: la oración y sus partes (sujeto y predicado, y dentro).
function Sintaxis(p) {
  const palabras = [[16, 34], [54, 44], [102, 38], [144, 36], [184, 40]]
  return (
    <Lienzo {...p}>
      {palabras.map(([x, w], i) => <rect key={x} x={x} y="28" width={w} height="26" rx="7" fill={i < 2 ? ROSA : CIELO} fillOpacity={i < 2 ? 0.9 : 0.75} />)}
      <path d="M16 62V70H98V62" stroke={ROSA} strokeWidth="3" strokeLinejoin="round" />
      <path d="M102 62V70H224V62" stroke={CIELO} strokeWidth="3" strokeLinejoin="round" />
      <path d="M144 80V88H224V80" stroke={AMBAR} strokeWidth="3" strokeLinejoin="round" />
      <T x={57} y={92} s={15} c="#F9A8D4">S</T>
      <T x={122} y={92} s={15} c="#7DD3FC">P</T>
      <T x={184} y={110} s={13} c="#FDE68A">CD</T>
    </Lienzo>
  )
}

// Género y número: gato → gata → gatos.
function Morfologia(p) {
  const formas = [['gat', 'o', CIELO, 18], ['gat', 'a', ROSA, 90], ['gat', 'os', '#A78BFA', 162]]
  return (
    <Lienzo {...p}>
      {formas.map(([raiz, fin, c, x]) => (
        <g key={x}>
          <rect x={x} y="44" width="62" height="44" rx="10" fill="#FFFFFF" fillOpacity=".05" stroke={c} strokeWidth="2.5" />
          <T x={x + 31} y={73} s={19} c="#E2E8F0">{raiz}<tspan fill={c}>{fin}</tspan></T>
        </g>
      ))}
      <Flecha x1={82} y1={66} x2={88} y2={66} c="#94A3B8" w={2} />
      <Flecha x1={154} y1={66} x2={160} y2={66} c="#94A3B8" w={2} />
    </Lienzo>
  )
}

// ── TIEMPOS VERBALES DEL INGLÉS ────────────────────────────────────────────

function PresentSimple(p) {
  const dias = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  return (
    <Lienzo {...p}>
      {dias.map((d, i) => (
        <g key={i}>
          <rect x={20 + i * 29} y="34" width="25" height="44" rx="6" fill="#FFFFFF" fillOpacity=".05" stroke={VERDE} strokeOpacity=".5" />
          <T x={32.5 + i * 29} y={50} s={10} c="#94A3B8">{d}</T>
          <path d={`M${26 + i * 29} 64l4 4 8-9`} stroke={VERDE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
      <T x={120} y={110} s={16} c="#6EE7B7">every day</T>
    </Lienzo>
  )
}

function Linea({ ahora = 196 }) {
  return (
    <g>
      <path d="M16 84H226" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
      <path d={`M${ahora} 66V102`} stroke={AMBAR} strokeWidth="3" strokeLinecap="round" />
      <T x={ahora} y={120} s={12} c="#FDE68A">now</T>
    </g>
  )
}

function PastSimple(p) {
  return (
    <Lienzo {...p}>
      <Linea />
      <circle cx="66" cy="84" r="8" fill="#FB923C" />
      <T x={66} y={120} s={12} c="#FDBA74">yesterday</T>
      <FlechaCurva x1={190} y1={62} cx={128} cy={16} x2={72} y2={70} c="#FDBA74" w={2.5} dash="5 4" />
      <T x={128} y={30} s={15} c="#FDBA74">-ed</T>
    </Lienzo>
  )
}

function PresentPerfect(p) {
  return (
    <Lienzo {...p}>
      <Linea />
      <rect x="66" y="78" width="130" height="12" rx="6" fill="#A78BFA" fillOpacity=".55" />
      <circle cx="66" cy="84" r="8" fill="#A78BFA" />
      <T x={130} y={46} s={16} c="#C4B5FD">have + done</T>
    </Lienzo>
  )
}

function Articles(p) {
  const fichas = [['a', CIELO, 'cat', 20], ['an', ROSA, 'apple', 92], ['the', AMBAR, 'sun', 164]]
  return (
    <Lienzo {...p}>
      {fichas.map(([t, c, obj, x]) => (
        <g key={t}>
          <rect x={x} y="30" width="56" height="48" rx="10" fill={c} fillOpacity=".18" stroke={c} strokeWidth="2.5" />
          <T x={x + 28} y={63} s={24} c={c}>{t}</T>
          <T x={x + 28} y={100} s={12} c="#94A3B8">{obj}</T>
        </g>
      ))}
    </Lienzo>
  )
}

// Pasiva: el objeto pasa delante y el sujeto va detrás, con "by".
function Passive(p) {
  return (
    <Lienzo {...p}>
      <rect x="20" y="22" width="52" height="28" rx="8" fill={CIELO} />
      <rect x="94" y="22" width="52" height="28" rx="8" fill={AMBAR} />
      <rect x="168" y="22" width="52" height="28" rx="8" fill={ROSA} />
      <rect x="20" y="86" width="52" height="28" rx="8" fill={ROSA} />
      <rect x="94" y="86" width="52" height="28" rx="8" fill={AMBAR} fillOpacity=".75" />
      <T x={184} y={105} s={13} c="#94A3B8">by</T>
      <rect x="196" y="86" width="36" height="28" rx="8" fill={CIELO} />
      <path d="M186 54Q140 70 58 82" stroke={ROSA} strokeWidth="2.5" strokeDasharray="4 3" />
      <path d="M52 54Q140 70 206 82" stroke={CIELO} strokeWidth="2.5" strokeDasharray="4 3" />
    </Lienzo>
  )
}

// ── ORTOGRAFÍA ─────────────────────────────────────────────────────────────

function Acentuacion(p) {
  return (
    <Lienzo {...p}>
      <T x={70} y={112} s={96} c="#F8FAFC">a</T>
      <path d="M70 50L86 30" stroke="#F43F5E" strokeWidth="9" strokeLinecap="round" />
      <rect x="140" y="52" width="40" height="34" rx="8" fill={ROSA} />
      <rect x="184" y="52" width="40" height="34" rx="8" fill="#FFFFFF" fillOpacity=".08" stroke="#FFFFFF" strokeOpacity=".15" />
      <T x={160} y={75} s={16} c="#FFFFFF">ár</T>
      <T x={204} y={75} s={16} c="#CBD5E1">bol</T>
    </Lienzo>
  )
}

function DosLetras({ a, b, ca, cb, ...p }) {
  return (
    <Lienzo {...p}>
      <rect x="24" y="24" width="76" height="86" rx="14" fill={ca} fillOpacity=".2" stroke={ca} strokeWidth="3" />
      <T x={62} y={88} s={60} c={ca}>{a}</T>
      <rect x="140" y="24" width="76" height="86" rx="14" fill={cb} fillOpacity=".2" stroke={cb} strokeWidth="3" />
      <T x={178} y={88} s={60} c={cb}>{b}</T>
      <circle cx="120" cy="67" r="12" fill="#1F2937" stroke="#94A3B8" strokeWidth="2" />
      <T x={120} y={73} s={15} c="#E2E8F0">?</T>
    </Lienzo>
  )
}
const BV = p => <DosLetras a="B" b="V" ca={ROSA} cb={CIELO} {...p} />
const GJ = p => <DosLetras a="G" b="J" ca="#A78BFA" cb={AMBAR} {...p} />

function Puntuacion(p) {
  return (
    <Lienzo {...p}>
      <T x={50} y={100} s={76} c={ROSA}>¿</T>
      <T x={112} y={100} s={76} c={CIELO}>?</T>
      <T x={160} y={100} s={60} c={AMBAR}>,</T>
      <T x={186} y={100} s={60} c={VERDE}>.</T>
      <T x={212} y={100} s={60} c="#A78BFA">;</T>
    </Lienzo>
  )
}

// Corregir un texto: el papel con la falta rodeada.
function Correccion(p) {
  return (
    <Lienzo {...p}>
      <rect x="44" y="12" width="120" height="112" rx="6" fill="#F8FAFC" />
      <path d="M58 32H150M58 48H136M58 64H150M58 80H112M58 96H146M58 112H124" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="96" cy="64" rx="22" ry="9" stroke="#EF4444" strokeWidth="2.5" />
      <path d="M114 58L126 52" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
      <g transform="rotate(35 196 78)">
        <rect x="190" y="30" width="12" height="70" rx="2" fill="#EF4444" />
        <path d="M190 100L196 114L202 100Z" fill="#FDE68A" />
        <rect x="190" y="26" width="12" height="8" rx="2" fill="#7F1D1D" />
      </g>
    </Lienzo>
  )
}

// ── PORTADAS ───────────────────────────────────────────────────────────────

// Gramática: una oración coloreada por clases de palabras.
function Gramatica(p) {
  const fila1 = [[18, 30, AMBAR], [52, 62, ROSA], [118, 50, VERDE], [172, 50, '#FB923C']]
  const fila2 = [[40, 44, CIELO], [88, 30, AMBAR], [122, 72, ROSA]]
  return (
    <Lienzo {...p}>
      {fila1.map(([x, w, c]) => <rect key={x} x={x} y="36" width={w} height="26" rx="7" fill={c} />)}
      {fila2.map(([x, w, c]) => <rect key={x} x={x} y="74" width={w} height="26" rx="7" fill={c} />)}
      <circle cx="202" cy="87" r="5" fill="#E2E8F0" />
    </Lienzo>
  )
}

function Literatura(p) {
  return (
    <Lienzo {...p}>
      <path d="M24 42V118Q64 108 104 118Q144 108 184 118V42Z" fill="#4338CA" />
      <path d="M28 38Q66 30 104 38V112Q66 104 28 112Z" fill="#EEF2FF" />
      <path d="M104 38Q142 30 180 38V112Q142 104 104 112Z" fill="#E0E7FF" />
      <path d="M38 52H94M38 62H90M38 72H94M38 82H80M114 52H170M114 62H162M114 72H170" stroke="#A5B4FC" strokeWidth="3" strokeLinecap="round" />
      {/* pluma */}
      <path d="M150 104Q176 60 222 14Q214 60 164 100Z" fill="#F8FAFC" />
      <path d="M150 104L200 42" stroke="#94A3B8" strokeWidth="1.5" />
      <path d="M146 110L152 100" stroke="#1C1917" strokeWidth="3" strokeLinecap="round" />
    </Lienzo>
  )
}

// Clave: `gramatica/<concepto>` (compartido castellano/inglés),
// `ingles/<tema>`, `ortografia/<tema>` y `lengua/<portada>`.
// Los textos: un emisor, su mensaje y el receptor, con tres clases de texto
// (diálogo, narración, instrucciones) como hojas.
function Textos(p) {
  return (
    <Lienzo {...p}>
      {/* emisor y receptor */}
      <circle cx="30" cy="54" r="12" fill="#FCD7B4" /><path d="M14 90Q30 70 46 90Z" fill="#14B8A6" />
      <circle cx="210" cy="54" r="12" fill="#FCD7B4" /><path d="M194 90Q210 70 226 90Z" fill="#F59E0B" />
      <Flecha x1={50} y1={60} x2={190} y2={60} c="#94A3B8" w={2} />
      {/* bocadillo: diálogo */}
      <path d="M62 22h40a6 6 0 0 1 6 6v16a6 6 0 0 1-6 6H78l-8 8v-8h-8a6 6 0 0 1-6-6V28a6 6 0 0 1 6-6Z" fill="#F8FAFC" />
      <path d="M66 32h32M66 40h22" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
      {/* hoja: narración */}
      <rect x="84" y="72" width="36" height="46" rx="4" fill="#E2E8F0" />
      <path d="M90 82h24M90 90h24M90 98h24M90 106h14" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
      {/* hoja: instrucciones numeradas */}
      <rect x="130" y="72" width="36" height="46" rx="4" fill="#CCFBF1" />
      <T x={138} y={87} s={9} c="#0F766E">1</T><T x={138} y={100} s={9} c="#0F766E">2</T><T x={138} y={113} s={9} c="#0F766E">3</T>
      <path d="M144 84h16M144 97h16M144 110h12" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M130 30h30M130 38h40" stroke="#5EEAD4" strokeWidth="3" strokeLinecap="round" strokeOpacity=".7" />
    </Lienzo>
  )
}

// Figuras literarias: un libro abierto del que sale la metáfora (ojos = luceros).
function Metrica(p) {
  // Un verso partido en sílabas con su sinalefa y la cuenta.
  const sil = ['Ver', 'de', 'que', 'te', 'quie', 'ro', 'ver', 'de']
  return (
    <Lienzo {...p}>
      <rect x="14" y="22" width="212" height="54" rx="6" fill="#FDF6E3" />
      {sil.map((s, i) => (
        <g key={i}>
          <rect x={20 + i * 25.5} y="34" width="22" height="28" rx="4" fill={i % 2 ? '#FDE68A' : '#FCD34D'} />
          <T x={31 + i * 25.5} y={53} s={11} c="#44403C">{s}</T>
        </g>
      ))}
      <T x={120} y={104} s={22} c="#FBBF24">8</T>
      <T x={160} y={104} s={12} c="#E7E5E4" a="start">sílabas</T>
      <path d="M40 92Q80 108 118 96" stroke="#F472B6" strokeWidth="2.5" fill="none" strokeDasharray="4 3" />
    </Lienzo>
  )
}

function Figuras(p) {
  return (
    <Lienzo {...p}>
      <path d="M120 106Q90 94 44 100V48Q90 42 120 54Z" fill="#F5F3FF" />
      <path d="M120 106Q150 94 196 100V48Q150 42 120 54Z" fill="#EDE9FE" />
      <path d="M120 54V106" stroke="#A78BFA" strokeWidth="2" />
      <path d="M54 62h50M54 72h44M54 82h50M136 62h50M140 72h46M136 82h40" stroke="#C4B5FD" strokeWidth="2.5" strokeLinecap="round" />
      {/* ojo = estrella */}
      <path d="M70 26Q84 14 98 26Q84 38 70 26Z" fill="#F8FAFC" />
      <circle cx="84" cy="26" r="5" fill="#7C3AED" />
      <T x={120} y={31} s={16} c="#E9D5FF">=</T>
      <path d="M156 12L160 22L170 22L162 28L165 38L156 32L147 38L150 28L142 22L152 22Z" fill="#FACC15" />
    </Lienzo>
  )
}

export const ARTE_TEMAS_LENGUA = {
  'gramatica/sustantivos': Sustantivos,
  'gramatica/adjetivos': Adjetivos,
  'gramatica/determinantes': Determinantes,
  'gramatica/pronombres': Pronombres,
  'gramatica/verbos': Verbos,
  'gramatica/adverbios': Adverbios,
  'gramatica/nexos': Nexos,
  'gramatica/sintaxis': Sintaxis,
  'gramatica/morfologia': Morfologia,
  'ingles/present-simple': PresentSimple,
  'ingles/past-simple': PastSimple,
  'ingles/present-perfect': PresentPerfect,
  'ingles/articles': Articles,
  'ingles/passive': Passive,
  'ortografia/acentuacion': Acentuacion,
  'ortografia/bv': BV,
  'ortografia/gj': GJ,
  'ortografia/puntuacion': Puntuacion,
  'ortografia/correccion': Correccion,
  'lengua/gramatica': Gramatica,
  'lengua/literatura': Literatura,
  'lengua/textos': Textos,
  'lengua/figuras': Figuras,
  'lengua/metrica': Metrica,
}

// La gramática inglesa usa los mismos conceptos con otro id.
export const CONCEPTO_INGLES = {
  nouns: 'sustantivos', verbs: 'verbos', adjectives: 'adjetivos',
  adverbs: 'adverbios', pronouns: 'pronombres', connectors: 'nexos',
}
