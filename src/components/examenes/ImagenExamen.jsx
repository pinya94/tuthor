import { useEffect, useState } from 'react'
import { getImagen } from '../../lib/examenesProfesor'

// La imagen de una pregunta (foto o dibujo), que vive en imagenesExamen/{id}.
// Ocupa su sitio desde el principio (por su proporción) para que la página
// no salte al cargar.
export default function ImagenExamen({ imagen, className = '', claro = false }) {
  const [img, setImg] = useState(null)
  const [error, setError] = useState(false)
  useEffect(() => {
    let vivo = true
    setImg(null); setError(false)
    if (imagen?.id) getImagen(imagen.id).then(r => { if (vivo) { if (r) setImg(r); else setError(true) } }).catch(() => vivo && setError(true))
    return () => { vivo = false }
  }, [imagen?.id])
  if (!imagen?.id) return null
  const ratio = imagen.w && imagen.h ? `${imagen.w} / ${imagen.h}` : '4 / 3'
  return (
    <div className={`w-full max-w-[520px] rounded-lg overflow-hidden ${claro ? 'bg-white border border-slate-300' : 'bg-white/90'} ${className}`} style={{ aspectRatio: ratio }}>
      {img ? <img src={img.data} alt="" className="w-full h-full object-contain" />
        : <div className="w-full h-full grid place-items-center text-xs text-slate-500">{error ? '⚠' : '…'}</div>}
    </div>
  )
}
