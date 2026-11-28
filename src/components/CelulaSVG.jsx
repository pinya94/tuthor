/**
 * La célula animal o vegetal de «Bajo el Microscopio»: una ilustración de
 * verdad (LadyofHats / Mariana Ruiz, dominio público, ver
 * public/microscopio/celula/CREDITOS.md) con una capa INVISIBLE de zonas
 * encima, una por orgánulo.
 *
 * Las zonas salen de scripts/celula-arte.mjs (src/data/celulaZonas.js): se
 * calculan pintando cada forma del dibujo de un color plano y leyendo los
 * píxeles, así que cada zona es justo lo que se VE de ese orgánulo y no hay
 * dos que se solapen. Antes el dibujo era esquemático y el orden de pintado
 * decidía quién se llevaba el clic (el citoplasma tapaba media membrana).
 *
 * Móvil: los orgánulos pequeños (ribosomas, centriolos, nucléolo) miden pocos
 * píxeles en un teléfono. Con el dedo y en pantallas estrechas el primer toque
 * AMPLÍA (lupa) y el segundo responde — el mismo patrón que Ojo y Oído.
 * Teclado: Tab recorre las zonas de izquierda a derecha («Zona 3 de 14»,
 * nunca el nombre) y Enter o Espacio responden.
 *
 * Props:
 *   tipo      'animal' | 'vegetal'
 *   onPick    (id) => void — null para bloquear (fase de resultado)
 *   elegido   id que ha pulsado el jugador (puede ser «otro-n»: una
 *             estructura real que no está en el banco; cuenta como fallo)
 *   correcto  id que había que pulsar; solo se pasa al revelar
 *   revelado  true tras responder: apaga el resto y marca el veredicto
 *   depurar   pinta todas las zonas semitransparentes (auditoría)
 */
import { useId, useRef, useState } from 'react'
import { useLang } from '../context/LangContext'
import { CELULA_ARTE } from '../data/celulaZonas'

const LUPA = 2.6
const TACTIL = typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches
const COLOR = { verde: '#22c55e', rojo: '#ef4444', blanco: '#ffffff' }

// Las dos ilustraciones se piden en cuanto se carga el juego: si no, la
// primera ronda de cada tipo enseña un recuadro vacío mientras llega el SVG.
if (typeof window !== 'undefined') {
  for (const a of Object.values(CELULA_ARTE)) { const im = new Image(); im.src = a.img }
}

// Ancho/alto de cada ilustración, para que la página reserve el hueco justo
export const aspectoCelula = tipo => CELULA_ARTE[tipo].vista[2] / CELULA_ARTE[tipo].vista[3]

// Orden del tabulador: de izquierda a derecha por dónde cae cada zona
const PORTAB = Object.fromEntries(Object.entries(CELULA_ARTE).map(([t, a]) =>
  [t, [...a.zonas].sort((p, q) => p.centro[0] - q.centro[0] || p.centro[1] - q.centro[1])]))

function Zona({ z, tono, fondo = 0.22 }) {
  return (
    <path d={z.d} fillRule="evenodd" fill={COLOR[tono]} fillOpacity={fondo}
      stroke={COLOR[tono]} strokeWidth="2.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke"
      className="pointer-events-none" />
  )
}

export default function CelulaSVG({ tipo, onPick, elegido, correcto, revelado, depurar = false }) {
  const { tr } = useLang()
  const arte = CELULA_ARTE[tipo]
  const uid = useId().replace(/:/g, '')
  const [zoom, setZoom] = useState(null) // { tipo, caja }
  const [foco, setFoco] = useState(null)
  const svgRef = useRef(null)
  const puntero = useRef(TACTIL ? 'touch' : 'mouse')

  const vista = arte.vista
  // Al corregir se vuelve a la célula entera
  const caja = !revelado && zoom?.tipo === tipo ? zoom.caja : vista
  const ampliado = caja !== vista
  const activo = Boolean(onPick) && !revelado
  const porId = Object.fromEntries(arte.zonas.map(z => [z.id, z]))
  const tab = PORTAB[tipo]

  function toca(id) {
    if (!activo) return
    setZoom(null)
    onPick(id)
  }
  const usaLupa = () => (puntero.current === 'touch' || (TACTIL && puntero.current !== 'mouse'))
    && (svgRef.current?.clientWidth ?? 999) < 560 && !ampliado
  function amplia(ev) {
    const ctm = svgRef.current?.getScreenCTM?.()
    if (!ctm) return
    const p = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(ctm.inverse())
    const [vx, vy, vw, vh] = vista
    const w = vw / LUPA, h = vh / LUPA
    const x = Math.min(Math.max(p.x - w / 2, vx), vx + vw - w), y = Math.min(Math.max(p.y - h / 2, vy), vy + vh - h)
    setZoom({ tipo, caja: [x, y, w, h] })
  }
  const pulsa = (id, ev) => { if (!activo) return; if (usaLupa()) amplia(ev); else toca(id) }

  // Qué se resalta: al revelar, verde lo correcto y rojo lo pulsado si era
  // otra cosa; antes de revelar (examen: se elige y luego se confirma), en
  // blanco lo elegido.
  const marcas = []
  if (revelado) {
    if (porId[correcto]) marcas.push([correcto, 'verde'])
    if (elegido && elegido !== correcto && porId[elegido]) marcas.push([elegido, 'rojo'])
  } else if (elegido && porId[elegido]) marcas.push([elegido, 'blanco'])

  const nombre = tipo === 'vegetal'
    ? tr({ es: 'Ilustración de una célula vegetal', en: 'Illustration of a plant cell', ca: 'Il·lustració d’una cèl·lula vegetal' })
    : tr({ es: 'Ilustración de una célula animal', en: 'Illustration of an animal cell', ca: 'Il·lustració d’una cèl·lula animal' })

  return (
    <div className="w-full">
      <div className="relative rounded-xl overflow-hidden bg-[#eef3f8]">
        <svg ref={svgRef} viewBox={caja.join(' ')} className="w-full h-auto block select-none"
          role="group" aria-label={nombre} data-tipo={tipo} data-elegido={elegido ?? ''}
          style={{ touchAction: 'manipulation' }}
          onPointerDown={ev => { puntero.current = ev.pointerType }}>
          <image href={arte.img} x={vista[0]} y={vista[1]} width={vista[2]} height={vista[3]}
            preserveAspectRatio="none" onClick={ev => { if (activo && usaLupa()) amplia(ev) }} />

          {/* Al revelar, todo lo demás se apaga */}
          {revelado && marcas.length > 0 && (
            <>
              <mask id={`apaga-${uid}`}>
                <rect x={vista[0]} y={vista[1]} width={vista[2]} height={vista[3]} fill="white" />
                {marcas.map(([id]) => <path key={id} d={porId[id].d} fillRule="evenodd" fill="black" />)}
              </mask>
              <rect x={vista[0]} y={vista[1]} width={vista[2]} height={vista[3]} fill="#0f172a" fillOpacity="0.6"
                mask={`url(#apaga-${uid})`} className="pointer-events-none" />
            </>
          )}

          {/* Zonas táctiles: invisibles, una partición del dibujo */}
          {arte.zonas.map(z => (
            <path key={z.id} d={z.d} fillRule="evenodd" fill="transparent" data-zona={z.id}
              onClick={ev => pulsa(z.id, ev)}
              className={activo ? 'cursor-pointer' : ''} style={{ pointerEvents: activo ? 'all' : 'none' }} />
          ))}

          {depurar && arte.zonas.map((z, i) => (
            <path key={`dep-${z.id}`} d={z.d} fillRule="evenodd"
              fill={`hsl(${(i * 47) % 360} 85% 50%)`} fillOpacity="0.45"
              stroke="#000" strokeWidth="1" vectorEffect="non-scaling-stroke" className="pointer-events-none" />
          ))}

          {marcas.map(([id, tono]) => <Zona key={`m-${id}`} z={porId[id]} tono={tono} fondo={tono === 'blanco' ? 0.3 : 0.22} />)}

          {/* Foco del teclado: contorno blanco con halo oscuro */}
          {foco && activo && porId[foco] && (
            <g className="pointer-events-none">
              <path d={porId[foco].d} fillRule="evenodd" fill="none" stroke="#0b1530" strokeWidth="6" vectorEffect="non-scaling-stroke" />
              <path d={porId[foco].d} fillRule="evenodd" fill="#38bdf8" fillOpacity="0.2" stroke="#fff" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
            </g>
          )}

          {/* Zonas para el teclado, de izquierda a derecha y sin nombre */}
          {activo && tab.map((z, k) => (
            <rect key={`k-${z.id}`} x={z.centro[0] - 1} y={z.centro[1] - 1} width="2" height="2" fill="transparent"
              tabIndex={0} role="button"
              aria-label={tr({ es: `Zona ${k + 1} de ${tab.length}`, en: `Area ${k + 1} of ${tab.length}`, ca: `Zona ${k + 1} de ${tab.length}` })}
              onFocus={() => setFoco(z.id)} onBlur={() => setFoco(f => (f === z.id ? null : f))}
              onKeyDown={ev => {
                if (ev.repeat || !['Enter', ' '].includes(ev.key)) return
                ev.preventDefault(); ev.stopPropagation(); toca(z.id)
              }}
              className="pointer-events-none outline-none" />
          ))}
        </svg>
        {ampliado && (
          <button type="button" onClick={() => setZoom(null)}
            className="absolute top-2 right-2 rounded-lg bg-slate-900/85 text-white text-sm font-bold px-3 py-1.5 shadow">
            {tr({ es: '🔍 Ver entera', en: '🔍 Whole cell', ca: '🔍 Veure-la sencera' })}
          </button>
        )}
      </div>
      {revelado && (
        <p className="text-center text-[10px] text-white/30 mt-1">
          {tr({ es: 'Ilustración: LadyofHats (Mariana Ruiz), dominio público', en: 'Illustration: LadyofHats (Mariana Ruiz), public domain', ca: 'Il·lustració: LadyofHats (Mariana Ruiz), domini públic' })}
        </p>
      )}
      {activo && TACTIL && (
        <p className="sm:hidden text-center text-[11px] text-white/45 mt-1.5">
          {ampliado
            ? tr({ es: 'Toca la parte para responder', en: 'Tap the part to answer', ca: 'Toca la part per respondre' })
            : tr({ es: 'Toca una zona para acercarla; luego toca la parte', en: 'Tap an area to zoom in, then tap the part', ca: 'Toca una zona per acostar-la; després toca la part' })}
        </p>
      )}
    </div>
  )
}

// El orgánulo SUELTO, recortado de la misma ilustración, para el nivel fácil
// («así se ve»). Se recorta con la forma de su zona: se ve el orgánulo y nada
// de lo que lo rodea, así que enseña cómo es sin chivar dónde está.
export function OrganuloIcono({ id, tipo, className = 'w-12 h-12' }) {
  const uid = useId().replace(/:/g, '')
  const t = tipo && CELULA_ARTE[tipo]?.zonas.some(z => z.id === id) ? tipo
    : CELULA_ARTE.animal.zonas.some(z => z.id === id) ? 'animal' : 'vegetal'
  const arte = CELULA_ARTE[t]
  const z = arte.zonas.find(q => q.id === id)
  if (!z) return null
  // Se enseña UNA pieza (una mitocondria, no las dos en las esquinas). Los
  // ribosomas son puntitos: recortados por su zona quedarían como manchas, así
  // que se enseña un racimo con lo que tiene alrededor, muy de cerca.
  const ribo = id === 'ribosoma'
  let [x, y, w, h] = z.pieza
  if (ribo) { w = h = 26; x = z.centro[0] - 13; y = z.centro[1] - 13 }
  const lado = Math.max(w, h) * (ribo ? 1 : 1.08)
  const vb = [x + w / 2 - lado / 2, y + h / 2 - lado / 2, lado, lado]
  const v = arte.vista
  return (
    <svg viewBox={vb.join(' ')} className={className} aria-hidden="true">
      <clipPath id={`ico-${uid}`}><path d={z.d} fillRule="evenodd" clipRule="evenodd" /></clipPath>
      <image href={arte.img} x={v[0]} y={v[1]} width={v[2]} height={v[3]} preserveAspectRatio="none"
        clipPath={ribo ? undefined : `url(#ico-${uid})`} />
    </svg>
  )
}
