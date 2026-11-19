// Línea bajo las monedas de GameEndScreen: «🏆 Hoy vas el 12.º» con enlace al
// ranking (/top). Con cuenta, saveActivity ya suma los puntos (evento
// tuthor:ranking-actualizado). Sin cuenta, se suman aquí como invitado, con
// apodo (sesión anónima, lib/ranking.js → sumarComoInvitado).
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { periodos, getMiPuesto, sumarComoInvitado, apodoTexto, apodoDe } from '../lib/ranking'

export default function PuestoRanking({ user, coins }) {
  const { lang, tr, localPath } = useLang()
  const [mio, setMio] = useState(null)
  const [invitado, setInvitado] = useState(null) // uid anónimo con el que se sumó
  const sumado = useRef(false)

  useEffect(() => {
    if (!coins || user === undefined) return
    let vivo = true
    if (user) {
      const leer = () => getMiPuesto(periodos().hoy, user.uid).then(m => { if (vivo && m) setMio(m) })
      window.addEventListener('tuthor:ranking-actualizado', leer)
      const t = setTimeout(leer, 4000) // por si el evento llegó antes de montar
      return () => { vivo = false; window.removeEventListener('tuthor:ranking-actualizado', leer); clearTimeout(t) }
    }
    if (sumado.current) return
    sumado.current = true
    sumarComoInvitado(coins).then(uid => {
      if (!vivo || !uid) return
      setInvitado(uid)
      return getMiPuesto(periodos().hoy, uid).then(m => { if (vivo && m) setMio(m) })
    })
    return () => { vivo = false }
  }, [user, coins])

  if (!coins) return null
  if (!mio) {
    if (user) return null
    return (
      <Link to={localPath('/top')} className="block mt-2 text-xs text-white/50 hover:text-white/80">
        🏆 {tr({ es: 'Ver el ranking de hoy', en: 'See today’s leaderboard', ca: 'Veure el rànquing d’avui' })} →
      </Link>
    )
  }
  const apodo = invitado ? apodoTexto(apodoDe(invitado), lang) : null
  return (
    <Link to={localPath('/top')} className="inline-block mt-2 text-sm font-bold text-amber-300 hover:text-amber-200">
      🏆 {tr({ es: `Hoy vas el ${mio.puesto}.º de ${mio.total}`, en: `Today you’re #${mio.puesto} of ${mio.total}`, ca: `Avui vas el ${mio.puesto}è de ${mio.total}` })}
      {apodo && <span className="text-white/60 font-semibold"> {tr({ es: 'como', en: 'as', ca: 'com' })} {apodo.emoji} {apodo.texto}</span>}
      {' · '}{tr({ es: 'ver ranking', en: 'see leaderboard', ca: 'veure rànquing' })} →
    </Link>
  )
}
