// La partitura de la parte (OpenSheetMusicDisplay, BSD) con dos capas encima:
// el cursor que avanza al tempo y el color de cada compás tras corregir
// (verde/amarillo/rojo, como la app de estudio). OSMD se carga aquí, con
// import() dinámico: solo lo descarga quien abre este juego.
import { useEffect, useRef, useState } from 'react'

const COLOR = { ok: 'rgba(34,197,94,.22)', warn: 'rgba(245,158,11,.28)', bad: 'rgba(239,68,68,.25)' }

// Cajas de cada compás en píxeles, y la x de cada nota con su tiempo (en negras)
function geometria(osmd, dx, dy) {
  const esc = 10 * osmd.zoom
  return osmd.GraphicSheet.MeasureList.map(fila => {
    const gm = fila?.[0]
    if (!gm) return null
    const b = gm.PositionAndShape
    const x = b.AbsolutePosition.x * esc + dx, y = b.AbsolutePosition.y * esc + dy
    const w = b.Size.width * esc, h = 4 * esc // alto del pentagrama (4 espacios)
    const puntos = gm.staffEntries.map(se => ({
      x: se.PositionAndShape.AbsolutePosition.x * esc + dx,
      negra: se.relInMeasureTimestamp.RealValue * 4,
    }))
    return { x, y, w, h, puntos }
  })
}

function xEn(caja, negra, negrasCompas) {
  const pts = [{ x: caja.x + 6, negra: 0 }, ...caja.puntos, { x: caja.x + caja.w - 4, negra: negrasCompas }]
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i], b = pts[i + 1]
    if (negra >= a.negra && negra <= b.negra) return a.x + ((b.x - a.x) * (negra - a.negra)) / Math.max(1e-6, b.negra - a.negra)
  }
  return caja.x
}

export default function Partitura({ xml, negrasCompas = 4, posicion = null, colores = null, onCompas }) {
  const caja = useRef(null)
  const osmdRef = useRef(null)
  const [cajas, setCajas] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    let vivo = true
    let ro
    ;(async () => {
      try {
        const { OpenSheetMusicDisplay } = await import('opensheetmusicdisplay')
        if (!vivo || !caja.current) return
        caja.current.innerHTML = ''
        const osmd = new OpenSheetMusicDisplay(caja.current, {
          autoResize: false, backend: 'svg', drawTitle: false, drawSubtitle: false, drawComposer: false,
          drawPartNames: false, drawMeasureNumbers: true, autoBeam: true, drawingParameters: 'compacttight',
        })
        osmdRef.current = osmd
        await osmd.load(xml)
        if (!vivo) return
        const dibuja = () => {
          osmd.Zoom = caja.current.clientWidth < 500 ? 0.75 : 1
          osmd.render()
          setCajas(geometria(osmd, caja.current.offsetLeft, caja.current.offsetTop))
        }
        dibuja()
        let ancho = caja.current.clientWidth
        ro = new ResizeObserver(() => {
          const a = caja.current?.clientWidth
          if (a && Math.abs(a - ancho) > 20) { ancho = a; dibuja() }
        })
        ro.observe(caja.current)
      } catch {
        if (vivo) setError(true)
      }
    })()
    return () => { vivo = false; ro?.disconnect() }
  }, [xml])

  const actual = posicion ? cajas[posicion.compas - 1] : null
  return (
    <div className="relative rounded-xl bg-[#fdfaf3] p-1 overflow-hidden">
      <div ref={caja} className="w-full min-h-[120px]" />
      {error && <p className="text-red-600 text-sm p-3">No se ha podido dibujar la partitura.</p>}
      {/* Colores por compás (tras corregir); tocar un compás lo señala */}
      {cajas.map((c, i) => c && (
        <button key={i} type="button" tabIndex={-1} aria-hidden="true"
          onClick={() => onCompas?.(i + 1)}
          className="absolute rounded-sm"
          style={{ left: c.x, top: c.y - 10, width: c.w, height: c.h + 20, background: colores?.[i + 1] ? COLOR[colores[i + 1]] : 'transparent', cursor: onCompas ? 'pointer' : 'default' }} />
      ))}
      {actual && (
        <>
          <div className="absolute rounded-sm pointer-events-none" style={{ left: actual.x, top: actual.y - 10, width: actual.w, height: actual.h + 20, background: 'rgba(237,174,73,.18)' }} />
          <div className="absolute w-[3px] rounded pointer-events-none bg-amber-500" style={{ left: xEn(actual, posicion.negra, negrasCompas) - 1, top: actual.y - 14, height: actual.h + 28 }} />
        </>
      )}
    </div>
  )
}
