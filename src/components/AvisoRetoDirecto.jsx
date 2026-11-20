// «🔴 Tu profe ha abierto un reto en directo · Entrar» — franja bajo la navbar
// en toda la web, para el alumno con cuenta cuya clase tiene un reto en
// directo abierto (AvisosClaseContext, en vivo). No sale si ya está dentro
// del reto, ni en la pantalla que proyecta el profe, ni si la ha cerrado.
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAvisosClase } from '../context/AvisosClaseContext'
import { useConBarraLateral } from './SideNav'

const CERRADOS = 'tuthor_reto_aviso_cerrado'
const leerCerrados = () => { try { return JSON.parse(sessionStorage.getItem(CERRADOS) || '[]') } catch { return [] } }

export default function AvisoRetoDirecto() {
  const { tr, localPath } = useLang()
  const { pathname, search } = useLocation()
  const { retoDirecto: r, esProfe } = useAvisosClase()
  const [cerrados, setCerrados] = useState(leerCerrados)
  const conBarra = useConBarraLateral()
  if (!r || esProfe || cerrados.includes(r.codigo)) return null
  const p = pathname.replace(/^\/(en|ca)(?=\/|$)/, '')
  if (p.startsWith('/reto') || p.startsWith('/profesor/reto') || new URLSearchParams(search).has('reto')) return null
  const cerrar = () => {
    const n = [...cerrados, r.codigo]
    try { sessionStorage.setItem(CERRADOS, JSON.stringify(n)) } catch { /* sin almacenamiento */ }
    setCerrados(n)
  }
  return (
    <div className={`relative z-40 bg-red-600/90 text-white ${conBarra ? 'lg:pl-52' : ''}`}>
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-3 text-sm">
        <span className="animate-pulse" aria-hidden="true">🔴</span>
        <span className="flex-1 font-semibold">
          {tr({ es: 'Tu profe ha abierto un reto en directo', en: 'Your teacher has started a live challenge', ca: 'El teu profe ha obert un repte en directe' })}
          {r.className && <span className="font-normal text-white/80"> · {r.className}</span>}
        </span>
        <Link to={localPath(`/reto/${r.codigo}`)} className="px-3 py-1 rounded-lg bg-white text-red-700 font-black">
          {tr({ es: 'Entrar', en: 'Join', ca: 'Entrar' })} →
        </Link>
        <button type="button" onClick={cerrar} aria-label={tr({ es: 'Cerrar aviso', en: 'Close', ca: 'Tancar avís' })} className="text-white/70 hover:text-white px-1">✕</button>
      </div>
    </div>
  )
}
