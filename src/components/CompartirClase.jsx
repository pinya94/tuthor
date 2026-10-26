// «¿Eres profe? Compártelo con tu clase»: el enlace de esta misma página (en
// su idioma) a Google Classroom, copiado o en un QR grande para proyectar.
// Nació al ver en Analytics que dos colegios ya pegaban enlaces a mano en
// Google Classroom y en su aula virtual. Va dentro de DescubreTuthor, así que
// sale en la intro y el final de cada juego y en los exámenes.
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { trackEvent } from '../lib/analytics'

const ORIGEN = 'https://www.tuthor.es'

export default function CompartirClase() {
  const { tr, localPath } = useLang()
  const { pathname } = useLocation()
  const url = ORIGEN + pathname
  const [copiado, setCopiado] = useState(false)
  const [qr, setQr] = useState(null)

  // En Analytics: cuántas veces y por qué vía se comparte (evento estándar «share»)
  const cuenta = method => trackEvent('share', { method, content_type: 'clase', item_id: pathname })
  const copiar = async () => {
    cuenta('copiar')
    try {
      await navigator.clipboard.writeText(url)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch { /* sin portapapeles (http, permisos): el enlace se ve en el QR */ }
  }
  const verQr = async () => {
    cuenta('qr')
    // La librería solo se descarga si alguien pide el QR
    const QRCode = (await import('qrcode')).default
    setQr(await QRCode.toDataURL(url, { width: 640, margin: 2 }))
  }

  const boton = 'inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-teal-600/20 hover:border-teal-400/40 px-3 py-2 text-white/85 text-sm font-semibold transition-colors'
  return (
    <div>
      <p className="text-white/45 text-[11px] font-bold uppercase tracking-widest">
        {tr({ es: '¿Eres profe?', en: 'Are you a teacher?', ca: 'Ets profe?' })}
      </p>
      <p className="text-white font-black text-base mt-0.5 mb-3">
        {tr({ es: 'Compártelo con tu clase', en: 'Share it with your class', ca: 'Comparteix-ho amb la teva classe' })}
      </p>
      <div className="flex flex-wrap gap-2">
        <a className={boton} target="_blank" rel="noopener noreferrer"
          href={`https://classroom.google.com/share?url=${encodeURIComponent(url)}`} onClick={() => cuenta('classroom')}>
          <span aria-hidden="true">🏫</span>Google Classroom
        </a>
        <button type="button" className={boton} onClick={copiar}>
          <span aria-hidden="true">{copiado ? '✅' : '🔗'}</span>
          {copiado ? tr({ es: '¡Copiado!', en: 'Copied!', ca: 'Copiat!' }) : tr({ es: 'Copiar enlace', en: 'Copy link', ca: 'Copia l’enllaç' })}
        </button>
        <button type="button" className={boton} onClick={verQr}>
          <span aria-hidden="true">📱</span>{tr({ es: 'QR para proyectar', en: 'QR code to project', ca: 'QR per projectar' })}
        </button>
      </div>

      <Link to={`${localPath('/profesores')}#retos`} className="inline-block mt-3 text-amber-200/90 text-sm font-bold hover:underline">
        🏆 {tr({ es: 'Nuevo: juégalo con tu clase en directo, cada uno desde su móvil →', en: 'New: play it live with your class, everyone on their phone →', ca: 'Nou: juga-hi amb la classe en directe, cadascú des del mòbil →' })}
      </Link>

      {qr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4" onClick={() => setQr(null)}>
          <div className="w-full max-w-md rounded-2xl bg-white p-5 text-center" onClick={e => e.stopPropagation()}>
            <img src={qr} alt={tr({ es: 'Código QR de esta página', en: 'QR code for this page', ca: 'Codi QR d’aquesta pàgina' })} className="w-full h-auto" />
            <p className="mt-2 text-slate-700 text-sm font-semibold break-all">{url}</p>
            <p className="mt-1 text-slate-500 text-xs">{tr({ es: 'Los alumnos lo escanean con la cámara del móvil', en: 'Students scan it with their phone camera', ca: 'Els alumnes l’escanegen amb la càmera del mòbil' })}</p>
            <button type="button" onClick={() => setQr(null)} className="mt-4 w-full py-3 rounded-xl bg-slate-900 text-white font-bold">
              {tr({ es: 'Cerrar', en: 'Close', ca: 'Tanca' })}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
