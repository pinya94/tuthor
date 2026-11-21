// Una ronda de Ojo y Oído (ver lib/ojoOido): el ojo o el oído en corte. Se
// toca una parte (por nombre, por función o «la siguiente») o, en el
// recorrido, todas en orden: un toque equivocado termina la ronda.
//
// Ilustraciones: public/ojo-oido/{ojo,oido}.webp, generadas con IA (ChatGPT)
// por encargo del propietario para Tuthor en noviembre de 2026, sin texto ni
// material de terceros; revisadas a nivel Primaria/ESO (la pupila es un óvalo
// negro por perspectiva: licencia aceptada). La imagen no lleva marcas: zonas,
// resaltados y etiquetas son capas del SVG.
//
// Móvil: las capas del ojo miden 5-12 px en un teléfono. Por eso (1) cada zona
// táctil llega hasta la mitad del camino con sus vecinas y se extiende hacia
// lo que no es de nadie (humor vítreo, fondo), y (2) en pantallas táctiles
// estrechas el primer toque AMPLÍA (lupa ×2,5) y el segundo responde.
// Teclado: Tab recorre las zonas de izquierda a derecha («Zona 3 de 7», nunca
// el nombre) y Enter responde.
import { useRef, useState } from 'react'
import { useLang } from '../../context/LangContext'
import { PARTES, enunciado, esCorrecta, explicacion } from '../../lib/ojoOido'

// ── Geometría (coordenadas de la imagen original, 1672 × 941) ──────────────
const W = 1672, H = 941
const ESCENA = {
  ojo: { img: '/ojo-oido/ojo.webp', vista: [230, 0, 1260, 941] },
  oido: { img: '/ojo-oido/oido.webp', vista: [80, 0, 1520, 941] },
}
const pol = pts => `M${pts.map(p => p.join(' ')).join('L')}Z`
const elipse = (cx, cy, rx, ry) => `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${2 * rx} 0a${rx} ${ry} 0 1 0 ${-2 * rx} 0Z`
// Anillo elíptico entre dos elipses del mismo centro, de un ángulo a otro (grados; 0 = derecha, positivo hacia abajo)
function anillo(cx, cy, rxi, ryi, rxo, ryo, a0, a1) {
  const pt = (rx, ry, a) => { const t = (a * Math.PI) / 180; return [Math.round(cx + rx * Math.cos(t)), Math.round(cy + ry * Math.sin(t))] }
  const n = 36, fuera = [], dentro = []
  for (let k = 0; k <= n; k++) { const a = a0 + ((a1 - a0) * k) / n; fuera.push(pt(rxo, ryo, a)); dentro.unshift(pt(rxi, ryi, a)) }
  return pol([...fuera, ...dentro])
}

// d = zona táctil (ampliada en las capas finas); forma = lo que se resalta al
// corregir cuando la zona es más grande que la estructura (no enseñar una
// retina el triple de gruesa); lab = [texto x, y, punto x, y]
export const ZONAS = {
  // Ojo: globo con centro ~(850, 470); retina en rx≈340/ry≈377, coroides hasta 358/395, esclerótica hasta 412/455
  esclerotica: { d: anillo(850, 470, 358, 395, 430, 471, -140, 140), forma: anillo(850, 470, 366, 402, 414, 457, -140, 140), lab: [1390, 190, 1190, 230] },
  retina: { d: anillo(850, 470, 309, 345, 358, 395, -134, 134), forma: anillo(850, 470, 336, 372, 352, 389, -134, 134), lab: [900, 250, 900, 92] },
  'nervio-optico': { d: pol([[1185, 505], [1465, 560], [1470, 715], [1185, 645]]), lab: [1330, 820, 1400, 650] },
  cornea: { d: anillo(560, 475, 225, 250, 305, 330, 104, 256), forma: anillo(560, 475, 262, 282, 292, 312, 104, 256), lab: [330, 215, 318, 330] },
  cristalino: { d: elipse(600, 480, 88, 178), lab: [820, 470, 688, 470] },
  iris: { d: pol([[500, 240], [465, 295], [438, 360], [420, 430], [420, 520], [435, 600], [462, 662], [500, 715], [528, 712], [532, 650], [525, 600], [515, 560], [515, 400], [525, 330], [530, 280], [524, 240]]), lab: [420, 70, 470, 300] },
  pupila: { d: elipse(488, 477, 30, 98), lab: [380, 905, 488, 560] },
  // Oído
  pabellon: { d: pol([[110, 300], [160, 110], [260, 30], [400, 30], [470, 130], [470, 300], [430, 400], [350, 410], [330, 500], [350, 620], [420, 660], [420, 900], [330, 915], [230, 840], [160, 680], [110, 500]]), lab: [270, 925, 250, 700] },
  conducto: { d: pol([[340, 430], [500, 420], [740, 410], [800, 605], [700, 585], [500, 600], [410, 640], [340, 600]]), lab: [560, 790, 560, 510] },
  timpano: { d: pol([[725, 405], [780, 400], [855, 500], [860, 620], [805, 625], [745, 520]]), lab: [660, 200, 790, 500] },
  huesecillos: { d: pol([[770, 300], [870, 300], [960, 330], [960, 400], [1085, 400], [1090, 510], [950, 505], [900, 470], [860, 505], [850, 505], [845, 430], [800, 420], [770, 360]]), lab: [860, 175, 860, 360] },
  canales: { d: pol([[940, 260], [990, 190], [1090, 170], [1110, 110], [1180, 80], [1280, 105], [1305, 180], [1270, 300], [1200, 350], [1120, 362], [1060, 348], [990, 348], [945, 320]]), lab: [1150, 40, 1150, 150] },
  coclea: { d: elipse(1240, 500, 175, 175), lab: [1440, 740, 1320, 600] },
  trompa: { d: pol([[995, 630], [1075, 595], [1235, 755], [1395, 890], [1290, 938], [1135, 795]]), lab: [1400, 905, 1300, 860] },
  'nervio-auditivo': { d: pol([[1210, 320], [1350, 275], [1560, 225], [1595, 300], [1440, 350], [1400, 430], [1340, 400], [1300, 360], [1230, 350]]), lab: [1450, 130, 1500, 260] },
}
// Orden de pintado de las zonas táctiles: las de encima ganan donde se solapan
export const ORDEN = {
  ojo: ['esclerotica', 'retina', 'nervio-optico', 'cornea', 'cristalino', 'iris', 'pupila'],
  oido: ['pabellon', 'conducto', 'trompa', 'nervio-auditivo', 'canales', 'coclea', 'timpano', 'huesecillos'],
}
// Orden del tabulador: de izquierda a derecha por dónde está cada parte (no por la respuesta)
const PORTAB = Object.fromEntries(Object.entries(ORDEN).map(([o, ids]) => [o, [...ids].sort((a, b) => ZONAS[a].lab[2] - ZONAS[b].lab[2])]))

const LUPA = 2.5
const TACTIL = typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches
const COLOR = { verde: ['#22c55e', '#15803d'], rojo: ['#ef4444', '#b91c1c'], ambar: ['#f59e0b', '#b45309'] } // [relleno, texto]

function Etiqueta({ id, texto, tono, escala, caja }) {
  const [x0, y, ax, ay] = ZONAS[id].lab
  const [c, t] = COLOR[tono]
  const fs = 42 * escala
  // que el texto no se salga por los lados del encuadre (anchura aproximada)
  const medio = (texto.length * fs * 0.56) / 2 + 8 * escala
  const x = Math.min(Math.max(x0, caja[0] + medio), caja[0] + caja[2] - medio)
  return (
    <g className="pointer-events-none">
      <line x1={x} y1={y + (y < ay ? fs * 0.3 : -fs * 0.9)} x2={ax} y2={ay} stroke={t} strokeWidth={5 * escala} />
      <circle cx={ax} cy={ay} r={9 * escala} fill={c} stroke="#fff" strokeWidth={3 * escala} />
      <text x={x} y={y} textAnchor="middle" fontSize={fs} fontWeight="800" fill={t} stroke="#fff" strokeWidth={12 * escala} paintOrder="stroke">{texto}</text>
    </g>
  )
}

export default function PreguntaOjoOido({ ronda: r, revelado, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const [tocadas, setTocadas] = useState([])
  const [zoom, setZoom] = useState(null)      // { id de ronda, caja }
  const [foco, setFoco] = useState(null)      // zona con el foco del teclado
  const svgRef = useRef(null)
  const puntero = useRef(TACTIL ? 'touch' : 'mouse')
  const corto = id => PARTES[id].nom[l].replace(/ \(.*\)$/, '')

  const esc = ESCENA[r.organo]
  // Al corregir se vuelve a la imagen entera, para que se vean todas las etiquetas
  const caja = !revelado && zoom?.ronda === r.id ? zoom.caja : esc.vista
  const ampliado = caja !== esc.vista
  const escala = caja[2] / esc.vista[2] // las etiquetas encogen con la lupa

  function toca(id) {
    if (revelado) return
    if (r.tipo !== 'ruta') { setTocadas([id]); onResponder(id); return }
    const sig = [...tocadas, id]
    setTocadas(sig)
    setZoom(null)
    if (id !== r.ruta[tocadas.length] || sig.length === r.ruta.length) onResponder(sig)
  }
  // Lupa: solo con el dedo y en pantallas estrechas, y solo si aún no está ampliado
  const usaLupa = () => (puntero.current === 'touch' || (TACTIL && puntero.current !== 'mouse')) && (svgRef.current?.clientWidth ?? 999) < 560 && !ampliado
  function amplia(ev) {
    const svg = svgRef.current
    const ctm = svg?.getScreenCTM?.()
    if (!ctm) return
    const p = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(ctm.inverse())
    const [vx, vy, vw, vh] = esc.vista
    const w = vw / LUPA, h = vh / LUPA
    const x = Math.min(Math.max(p.x - w / 2, vx), vx + vw - w), y = Math.min(Math.max(p.y - h / 2, vy), vy + vh - h)
    setZoom({ ronda: r.id, caja: [x, y, w, h] })
  }
  const pulsa = (id, ev) => { if (revelado) return; if (usaLupa()) amplia(ev); else toca(id) }

  const respuesta = r.tipo === 'ruta' ? tocadas : tocadas[0]
  const acierto = revelado && esCorrecta(r, respuesta)
  const color = {}, etiquetas = {}
  if (r.tipo === 'ruta') {
    tocadas.forEach((p, i) => { const bien = p === r.ruta[i]; color[p] = bien ? 'ambar' : 'rojo'; etiquetas[p] = [`${i + 1}`, bien ? 'ambar' : 'rojo'] })
    // Al corregir: el recorrido bueno numerado en verde y, en rojo, la parte
    // tocada que no forma parte de él
    if (revelado) {
      r.ruta.forEach((p, i) => { color[p] = 'verde'; etiquetas[p] = [`${i + 1}. ${corto(p)}`, 'verde'] })
      tocadas.forEach(p => { if (!r.ruta.includes(p)) { color[p] = 'rojo'; etiquetas[p] = [`✗ ${corto(p)}`, 'rojo'] } })
    }
  } else if (revelado) {
    color[r.objetivo] = 'verde'; etiquetas[r.objetivo] = [corto(r.objetivo), 'verde']
    if (tocadas[0] && tocadas[0] !== r.objetivo) { color[tocadas[0]] = 'rojo'; etiquetas[tocadas[0]] = [corto(tocadas[0]), 'rojo'] }
  }

  const pista = r.tipo === 'ruta' && !revelado
    ? tr({ es: `Llevas ${tocadas.length} de ${r.ruta.length}`, en: `${tocadas.length} of ${r.ruta.length} done`, ca: `En portes ${tocadas.length} de ${r.ruta.length}` })
    : ''
  const tab = PORTAB[r.organo]

  return (
    <div className="w-full">
      <div className="rounded-xl px-3 py-3 text-center border border-white/15 bg-white/5 mb-2 min-h-[4.5rem] flex items-center justify-center" aria-live="polite">
        <p className="font-black text-lg sm:text-xl text-amber-200 leading-snug">{enunciado(r, l)}</p>
      </div>
      <p className="text-center text-xs text-white/50 font-bold mb-2 min-h-[1rem]">
        {r.organo === 'ojo' ? tr({ es: 'El ojo, en corte', en: 'The eye, cross-section', ca: 'L’ull, en secció' }) : tr({ es: 'El oído, en corte', en: 'The ear, cross-section', ca: 'L’orella, en secció' })}
        {pista && ` · ${pista}`}
      </p>
      <div className="relative rounded-2xl border border-white/10 bg-white overflow-hidden">
        <svg ref={svgRef} viewBox={caja.join(' ')} className="w-full h-auto block select-none touch-manipulation" role="group"
          onPointerDown={ev => { puntero.current = ev.pointerType }}
          aria-label={r.organo === 'ojo' ? tr({ es: 'Ilustración del ojo en corte', en: 'Cross-section of the eye', ca: 'Il·lustració de l’ull en secció' }) : tr({ es: 'Ilustración del oído en corte', en: 'Cross-section of the ear', ca: 'Il·lustració de l’orella en secció' })}>
          <image href={esc.img} x="0" y="0" width={W} height={H} preserveAspectRatio="none"
            onClick={ev => { if (!revelado && usaLupa()) amplia(ev) }} />
          {ORDEN[r.organo].map(id => (
            <path key={id} data-zona={id} d={ZONAS[id].d} fill="transparent"
              onClick={ev => pulsa(id, ev)}
              className={revelado ? '' : 'cursor-pointer'} style={{ pointerEvents: revelado ? 'none' : 'all' }} />
          ))}
          {Object.entries(color).map(([id, c]) => (
            <path key={`r${id}`} d={ZONAS[id].forma ?? ZONAS[id].d} fill={COLOR[c][0]} fillOpacity="0.22" stroke={COLOR[c][0]} strokeWidth={6 * escala} strokeLinejoin="round" className="pointer-events-none" />
          ))}
          {/* Foco del teclado: contorno blanco con halo oscuro, visible sobre la ilustración */}
          {foco && !revelado && (
            <g className="pointer-events-none">
              <path d={ZONAS[foco].d} fill="none" stroke="#0b1530" strokeWidth={14 * escala} strokeLinejoin="round" />
              <path d={ZONAS[foco].d} fill="#38bdf8" fillOpacity="0.15" stroke="#fff" strokeWidth={6 * escala} strokeLinejoin="round" />
            </g>
          )}
          {Object.entries(etiquetas).map(([id, [t, tono]]) => <Etiqueta key={`e${id}`} id={id} texto={t} tono={tono} escala={escala} caja={caja} />)}
          {/* Zonas para el teclado, en orden de izquierda a derecha y sin nombre */}
          {!revelado && tab.map((id, k) => (
            <rect key={`k${id}`} x={ZONAS[id].lab[2] - 1} y={ZONAS[id].lab[3] - 1} width="2" height="2" fill="transparent"
              tabIndex={0} role="button" aria-label={tr({ es: `Zona ${k + 1} de ${tab.length}`, en: `Area ${k + 1} of ${tab.length}`, ca: `Zona ${k + 1} de ${tab.length}` })}
              onFocus={() => setFoco(id)} onBlur={() => setFoco(f => (f === id ? null : f))}
              onClick={() => toca(id)}
              onKeyDown={ev => {
                if (!ev.repeat && (ev.key === 'Enter' || ev.key === ' ')) {
                  ev.preventDefault()
                  toca(id)
                }
              }}
              className="pointer-events-none outline-none" />
          ))}
        </svg>
        {ampliado && (
          <button type="button" onClick={() => setZoom(null)}
            className="absolute top-2 right-2 rounded-lg bg-slate-900/85 text-white text-sm font-bold px-3 py-1.5 shadow">
            {tr({ es: '🔍 Ver entero', en: '🔍 Whole picture', ca: '🔍 Veure-ho sencer' })}
          </button>
        )}
      </div>
      {!revelado && TACTIL && (
        <p className="sm:hidden text-center text-[11px] text-white/45 mt-1.5">
          {ampliado
            ? tr({ es: 'Toca la parte para responder', en: 'Tap the part to answer', ca: 'Toca la part per respondre' })
            : tr({ es: 'Toca una zona para acercarla; luego toca la parte', en: 'Tap an area to zoom in, then tap the part', ca: 'Toca una zona per acostar-la; després toca la part' })}
        </p>
      )}

      {revelado && (
        <div className={`mt-3 rounded-xl px-3 py-2.5 border ${acierto ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`} aria-live="polite">
          <p className={`font-black text-center ${acierto ? 'text-green-400' : 'text-red-400'}`}>
            {acierto ? tr({ es: '✓ Correcto', en: '✓ Correct', ca: '✓ Correcte' }) : tr({ es: '✗ Incorrecto', en: '✗ Incorrect', ca: '✗ Incorrecte' })}
          </p>
          <p className="mt-1 text-white/75 text-sm">💡 {explicacion(r, l)}</p>
        </div>
      )}
    </div>
  )
}
