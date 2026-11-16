// Una ronda de Ojo y Oído (ver lib/ojoOido): el ojo o el oído dibujados en
// corte. Se toca una parte (por nombre, por función o «la siguiente») o, en
// el recorrido, todas en orden: un toque equivocado termina la ronda.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { PARTES, enunciado, esCorrecta, explicacion } from '../../lib/ojoOido'

// Zonas de cada parte: `s` = trazo (se toca a lo largo de la línea, con
// grosor w), `f` = relleno. Las mismas formas sirven para resaltar al corregir.
const ZONAS = {
  esclerotica: { s: 'M120 74.6 A92 92 0 1 1 120 165.4', w: 14, lab: [200, 228] },
  cornea: { s: 'M120 72 Q72 120 120 168', w: 18, lab: [78, 56] },
  iris: { f: 'M118 76H134V106H118Z M118 134H134V164H118Z', lab: [150, 60] },
  pupila: { f: 'M118 106H134V134H118Z', lab: [96, 196] },
  cristalino: { f: 'M146 88 A16 32 0 1 1 146 152 A16 32 0 1 1 146 88Z', lab: [196, 150] },
  retina: { s: 'M227.4 44.8 A80 80 0 0 1 227.4 195.2', w: 16, lab: [252, 26] },
  'nervio-optico': { f: 'M286 104L350 96V144L286 136Z', lab: [306, 178] },
  pabellon: { f: 'M58 28C18 40 14 120 40 168C52 192 70 206 84 196C92 188 80 176 74 164C62 140 60 110 72 84C80 66 96 60 96 46C96 30 76 22 58 28Z', lab: [72, 232] },
  conducto: { f: 'M80 104L162 106V134L80 136Z', lab: [116, 152] },
  timpano: { f: 'M158 96H174V144H158Z', lab: [168, 176] },
  canales: { f: 'M238 52A28 28 0 1 1 237.9 52Z', lab: [276, 36] },
  huesecillos: { f: 'M176 92H220V128H176Z', lab: [168, 76] },
  coclea: { f: 'M246 116A24 24 0 1 1 245.9 116Z', lab: [244, 188] },
  trompa: { s: 'M196 142Q206 188 252 224', w: 20, lab: [292, 222] },
  'nervio-auditivo': { f: 'M266 130L348 116V142L268 152Z', lab: [296, 108] },
}
// Orden de las zonas táctiles: las de encima ganan donde se solapan
const ORDEN = {
  ojo: ['esclerotica', 'nervio-optico', 'retina', 'cornea', 'iris', 'pupila', 'cristalino'],
  oido: ['pabellon', 'conducto', 'trompa', 'nervio-auditivo', 'canales', 'coclea', 'timpano', 'huesecillos'],
}

function Ojo() {
  return (
    <g className="pointer-events-none">
      <path d="M286 104L350 96V144L286 136Z" fill="#facc15" stroke="#a16207" strokeWidth="2" />
      <path d="M120 74.6 A92 92 0 1 1 120 165.4Z" fill="#17304f" />
      <path d="M120 74.6 A92 92 0 1 1 120 165.4" fill="none" stroke="#e2e8f0" strokeWidth="9" />
      <path d="M227.4 44.8 A80 80 0 0 1 227.4 195.2" fill="none" stroke="#f97316" strokeWidth="6" />
      <path d="M120 72 Q72 120 120 168" fill="#7dd3fc22" stroke="#7dd3fc" strokeWidth="4" />
      <rect x="121" y="78" width="8" height="28" rx="3" fill="#a16207" />
      <rect x="121" y="134" width="8" height="28" rx="3" fill="#a16207" />
      <ellipse cx="146" cy="120" rx="11" ry="28" fill="#e0f2fe" fillOpacity=".85" stroke="#bae6fd" strokeWidth="2" />
      <path d="M14 108H62M14 132H62" stroke="#fde68a" strokeWidth="2" strokeDasharray="5 4" />
      <path d="M58 103L66 108L58 113M58 127L66 132L58 137" fill="none" stroke="#fde68a" strokeWidth="2" />
    </g>
  )
}
function Oido() {
  return (
    <g className="pointer-events-none">
      <rect x="140" y="16" width="214" height="214" rx="26" fill="#2a2235" />
      <path d="M266 130L348 116V142L268 152Z" fill="#facc15" stroke="#a16207" strokeWidth="2" />
      <path d="M58 28C18 40 14 120 40 168C52 192 70 206 84 196C92 188 80 176 74 164C62 140 60 110 72 84C80 66 96 60 96 46C96 30 76 22 58 28Z" fill="#f4c7a1" stroke="#c28b63" strokeWidth="2" />
      <path d="M80 106L164 108V132L80 134Z" fill="#e8b48c" stroke="#a8714a" strokeWidth="2" />
      <ellipse cx="194" cy="116" rx="26" ry="28" fill="#3b2f4a" />
      <path d="M196 142Q206 188 252 224" fill="none" stroke="#c4b5fd" strokeWidth="9" strokeLinecap="round" />
      <ellipse cx="166" cy="120" rx="4" ry="22" fill="#fda4af" stroke="#e11d48" strokeWidth="1.5" />
      <path d="M170 104L186 98L188 108L176 113Z" fill="#f5f5f4" stroke="#a8a29e" />
      <path d="M187 97L201 96L203 113L191 115Z" fill="#f5f5f4" stroke="#a8a29e" />
      <path d="M201 110L216 109L217 124L205 125Z" fill="#f5f5f4" stroke="#a8a29e" />
      <ellipse cx="226" cy="116" rx="10" ry="12" fill="#a78bfa" fillOpacity=".45" />
      <ellipse cx="226" cy="78" rx="11" ry="18" fill="none" stroke="#34d399" strokeWidth="4" />
      <ellipse cx="250" cy="84" rx="17" ry="10" fill="none" stroke="#34d399" strokeWidth="4" />
      <ellipse cx="240" cy="64" rx="8" ry="13" fill="none" stroke="#34d399" strokeWidth="4" />
      <path d="M246 140m-4 0a4 4 0 1 1 8 0a8 8 0 1 1-16 0a12 12 0 1 1 24 0a16 16 0 1 1-32 0" fill="none" stroke="#a78bfa" strokeWidth="5" />
      <path d="M4 112q6 8 0 16M12 106q10 14 0 28" fill="none" stroke="#fde68a" strokeWidth="2" />
    </g>
  )
}

function Zona({ id, color, onClick, activa }) {
  const z = ZONAS[id]
  if (z.s) return <path d={z.s} fill="none" stroke={color ?? 'transparent'} strokeOpacity={color ? 0.6 : 0} strokeWidth={z.w} strokeLinecap="round" onClick={onClick} className={activa ? 'cursor-pointer' : 'pointer-events-none'} style={{ pointerEvents: activa ? 'stroke' : 'none' }} />
  return <path d={z.f} fill={color ?? 'transparent'} fillOpacity={color ? 0.5 : 0} onClick={onClick} className={activa ? 'cursor-pointer' : 'pointer-events-none'} style={{ pointerEvents: activa ? 'all' : 'none' }} />
}
function Etiqueta({ id, texto, color }) {
  const [x, y] = ZONAS[id].lab
  return (
    <text x={x} y={y} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={color} stroke="#0b1530" strokeWidth="4" paintOrder="stroke" className="pointer-events-none">{texto}</text>
  )
}

export default function PreguntaOjoOido({ ronda: r, revelado, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const [tocadas, setTocadas] = useState([])
  const corto = id => PARTES[id].nom[l].replace(/ \(.*\)$/, '')

  function toca(id) {
    if (revelado) return
    if (r.tipo !== 'ruta') { setTocadas([id]); onResponder(id); return }
    const sig = [...tocadas, id]
    setTocadas(sig)
    if (id !== r.ruta[tocadas.length] || sig.length === r.ruta.length) onResponder(sig)
  }

  const respuesta = r.tipo === 'ruta' ? tocadas : tocadas[0]
  const acierto = revelado && esCorrecta(r, respuesta)
  const verde = '#22c55e', rojo = '#ef4444', ambar = '#fbbf24'
  const color = {}, etiquetas = {}
  if (r.tipo === 'ruta') {
    tocadas.forEach((p, i) => { const bien = p === r.ruta[i]; color[p] = bien ? ambar : rojo; etiquetas[p] = [`${i + 1}`, bien ? ambar : rojo] })
    // Al corregir: el recorrido bueno numerado en verde y, en rojo, la parte
    // tocada que no forma parte de él
    if (revelado) {
      r.ruta.forEach((p, i) => { color[p] = verde; etiquetas[p] = [`${i + 1}. ${corto(p)}`, verde] })
      tocadas.forEach(p => { if (!r.ruta.includes(p)) { color[p] = rojo; etiquetas[p] = [`✗ ${corto(p)}`, rojo] } })
    }
  } else if (revelado) {
    color[r.objetivo] = verde; etiquetas[r.objetivo] = [corto(r.objetivo), verde]
    if (tocadas[0] && tocadas[0] !== r.objetivo) { color[tocadas[0]] = rojo; etiquetas[tocadas[0]] = [corto(tocadas[0]), rojo] }
  }

  const pista = r.tipo === 'ruta' && !revelado
    ? tr({ es: `Llevas ${tocadas.length} de ${r.ruta.length}`, en: `${tocadas.length} of ${r.ruta.length} done`, ca: `En portes ${tocadas.length} de ${r.ruta.length}` })
    : ''

  return (
    <div className="w-full">
      <div className="rounded-xl px-3 py-3 text-center border border-white/15 bg-white/5 mb-2 min-h-[4.5rem] flex items-center justify-center">
        <p className="font-black text-lg sm:text-xl text-amber-200 leading-snug">{enunciado(r, l)}</p>
      </div>
      <p className="text-center text-xs text-white/50 font-bold mb-2 min-h-[1rem]">
        {r.organo === 'ojo' ? tr({ es: 'El ojo, en corte', en: 'The eye, cross-section', ca: 'L’ull, en secció' }) : tr({ es: 'El oído, en corte', en: 'The ear, cross-section', ca: 'L’orella, en secció' })}
        {pista && ` · ${pista}`}
      </p>
      <div className="rounded-2xl border border-white/10 bg-[#0b1530] overflow-hidden">
        <svg viewBox="0 0 360 240" className="w-full h-auto block select-none" role="img"
          aria-label={r.organo === 'ojo' ? tr({ es: 'Dibujo del ojo en corte', en: 'Cross-section of the eye', ca: 'Dibuix de l’ull en secció' }) : tr({ es: 'Dibujo del oído en corte', en: 'Cross-section of the ear', ca: 'Dibuix de l’orella en secció' })}>
          {r.organo === 'ojo' ? <Ojo /> : <Oido />}
          {ORDEN[r.organo].map(id => <Zona key={id} id={id} color={color[id]} activa={!revelado} onClick={() => toca(id)} />)}
          {Object.entries(etiquetas).map(([id, [t, c]]) => <Etiqueta key={`e${id}`} id={id} texto={t} color={c} />)}
        </svg>
      </div>

      {revelado && (
        <div className={`mt-3 rounded-xl px-3 py-2.5 border ${acierto ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
          <p className={`font-black text-center ${acierto ? 'text-green-400' : 'text-red-400'}`}>
            {acierto ? tr({ es: '✓ Correcto', en: '✓ Correct', ca: '✓ Correcte' }) : tr({ es: '✗ Incorrecto', en: '✗ Incorrect', ca: '✗ Incorrecte' })}
          </p>
          <p className="mt-1 text-white/75 text-sm">💡 {explicacion(r, l)}</p>
        </div>
      )}
    </div>
  )
}
