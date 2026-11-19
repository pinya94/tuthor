// Línea bajo las monedas de GameEndScreen: «🏆 Hoy vas el 12.º» con enlace al
// ranking (/top). Espera a que saveActivity haya sumado los puntos (evento
// tuthor:ranking-actualizado); sin cuenta invita a entrar para salir en él.
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { periodos, getMiPuesto } from '../lib/ranking'

export default function PuestoRanking({ user, coins }) {
  const { tr, localPath } = useLang()
  const [mio, setMio] = useState(null)
  useEffect(() => {
    if (!user || !coins) return
    let vivo = true
    const leer = () => getMiPuesto(periodos().hoy, user.uid).then(m => { if (vivo && m) setMio(m) })
    window.addEventListener('tuthor:ranking-actualizado', leer)
    const t = setTimeout(leer, 4000) // por si el evento llegó antes de montar
    return () => { vivo = false; window.removeEventListener('tuthor:ranking-actualizado', leer); clearTimeout(t) }
  }, [user, coins])

  if (!coins) return null
  if (!user) {
    return (
      <Link to={localPath('/top')} className="block mt-2 text-xs text-white/50 hover:text-white/80">
        🏆 {tr({ es: 'Entra con tu cuenta y estos puntos cuentan para el ranking de hoy', en: 'Sign in and these points count towards today’s leaderboard', ca: 'Entra amb el teu compte i aquests punts compten per al rànquing d’avui' })} →
      </Link>
    )
  }
  if (!mio) return null
  return (
    <Link to={localPath('/top')} className="inline-block mt-2 text-sm font-bold text-amber-300 hover:text-amber-200">
      🏆 {tr({ es: `Hoy vas el ${mio.puesto}.º de ${mio.total}`, en: `Today you’re #${mio.puesto} of ${mio.total}`, ca: `Avui vas el ${mio.puesto}è de ${mio.total}` })} · {tr({ es: 'ver ranking', en: 'see leaderboard', ca: 'veure rànquing' })} →
    </Link>
  )
}
