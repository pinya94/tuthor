// /top — Ranking general: «Hoy» y «Este mes», por puntos (las monedas de cada
// partida). Cada jugador sale con su apodo automático (lib/ranking.js), nunca
// con su nombre. Sin cuenta se ve igual y se invita a registrarse para salir.
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import AuthModal from '../components/AuthModal'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { periodos, getTop, getMiPuesto, apodoTexto, apodoDe } from '../lib/ranking'

const MEDALLA = ['🥇', '🥈', '🥉']

export default function Top() {
  const { lang, tr, localPath } = useLang()
  const { user } = useAuth()
  const [tab, setTab] = useState('hoy')
  const [datos, setDatos] = useState({}) // { hoy: { top, mio }, mes: {…} }
  const [auth, setAuth] = useState(false)
  const per = periodos()

  useEffect(() => {
    let vivo = true
    const periodo = per[tab]
    Promise.all([getTop(periodo, 20), user ? getMiPuesto(periodo, user.uid) : null])
      .then(([top, mio]) => { if (vivo) setDatos(d => ({ ...d, [tab]: { top, mio } })) })
    return () => { vivo = false }
  }, [tab, user, per[tab]]) // eslint-disable-line react-hooks/exhaustive-deps

  const actual = datos[tab]
  const miApodo = user ? apodoTexto(apodoDe(user.uid), lang) : null
  const pestaña = activo => `flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${activo ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`

  return (
    <div className="relative z-10 px-4 sm:px-6 py-6">
      <SEOHead title={tr({ es: 'Ranking de jugadores', en: 'Player leaderboard', ca: 'Rànquing de jugadors' })}
        description={tr({ es: 'Quién ha conseguido más puntos hoy y este mes en los juegos educativos de Tuthor.', en: 'Who has scored the most points today and this month in Tuthor’s educational games.', ca: 'Qui ha aconseguit més punts avui i aquest mes als jocs educatius de Tuthor.' })}
        path="/top" lang={lang} />
      <div className="max-w-xl mx-auto">
        <h1 className="text-white font-black text-2xl sm:text-3xl">🏆 {tr({ es: 'Ranking', en: 'Leaderboard', ca: 'Rànquing' })}</h1>
        <p className="text-white/55 text-sm mt-1">{tr({ es: 'Los puntos son las monedas que ganas en cada partida, en cualquier juego.', en: 'Points are the coins you earn in every game you play.', ca: 'Els punts són les monedes que guanyes a cada partida, a qualsevol joc.' })}</p>

        <div className="flex gap-1 p-1 mt-4 rounded-xl bg-white/[0.06] border border-white/10">
          <button type="button" className={pestaña(tab === 'hoy')} onClick={() => setTab('hoy')}>{tr({ es: 'Hoy', en: 'Today', ca: 'Avui' })}</button>
          <button type="button" className={pestaña(tab === 'mes')} onClick={() => setTab('mes')}>{tr({ es: 'Este mes', en: 'This month', ca: 'Aquest mes' })}</button>
        </div>

        {user ? (
          <div className="mt-3 rounded-xl border border-amber-400/30 bg-amber-400/[0.07] px-4 py-3 text-sm">
            <p className="text-white/80">
              {tr({ es: 'Tú sales como', en: 'You appear as', ca: 'Tu surts com' })} <strong className="text-white">{miApodo.emoji} {miApodo.texto}</strong>
            </p>
            <p className="text-amber-200 font-bold mt-0.5">
              {actual?.mio
                ? tr({ es: `Vas el ${actual.mio.puesto}.º de ${actual.mio.total}, con ${actual.mio.puntos} puntos`, en: `You are #${actual.mio.puesto} of ${actual.mio.total}, with ${actual.mio.puntos} points`, ca: `Vas el ${actual.mio.puesto}è de ${actual.mio.total}, amb ${actual.mio.puntos} punts` })
                : tr({ es: 'Aún no has puntuado en este periodo: juega una partida y entras.', en: 'No points yet in this period: play a game and you’re in.', ca: 'Encara no has puntuat en aquest període: juga una partida i hi entres.' })}
            </p>
          </div>
        ) : (
          <button type="button" onClick={() => setAuth(true)} className="mt-3 w-full text-left rounded-xl border border-violet-400/30 bg-violet-500/10 hover:bg-violet-500/20 px-4 py-3 text-sm text-white/85">
            ✨ {tr({ es: 'Entra con tu cuenta para salir en el ranking (con un apodo, nunca con tu nombre).', en: 'Sign in to appear on the leaderboard (with a nickname, never your name).', ca: 'Entra amb el teu compte per sortir al rànquing (amb un àlies, mai amb el teu nom).' })}
          </button>
        )}

        <ol className="mt-4 space-y-1.5">
          {!actual ? <li className="text-white/40 text-sm">{tr({ es: 'Cargando…', en: 'Loading…', ca: 'Carregant…' })}</li>
            : actual.top.length === 0 ? <li className="text-white/50 text-sm">{tr({ es: 'Nadie ha puntuado todavía. ¡El primer puesto está libre!', en: 'Nobody has scored yet. First place is up for grabs!', ca: 'Ningú no ha puntuat encara. El primer lloc és lliure!' })}</li>
            : actual.top.map((e, i) => {
              const a = apodoTexto(e.apodo, lang)
              const yo = user && e.uid === user.uid
              return (
                <li key={e.uid} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 border ${yo ? 'border-amber-400/50 bg-amber-400/10' : 'border-white/10 bg-white/[0.04]'}`}>
                  <span className="w-7 text-center font-black text-white/70">{MEDALLA[i] ?? i + 1}</span>
                  <span className="text-2xl" aria-hidden="true">{a.emoji}</span>
                  <span className="flex-1 text-white font-semibold truncate">{a.texto}{yo && <span className="text-amber-300 text-xs font-bold"> · {tr({ es: 'tú', en: 'you', ca: 'tu' })}</span>}</span>
                  <span className="text-amber-300 font-black tabular-nums">{e.puntos}</span>
                </li>
              )
            })}
        </ol>

        <Link to={localPath('/')} className="mt-6 inline-block px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black">
          🎮 {tr({ es: 'A jugar', en: 'Go play', ca: 'A jugar' })}
        </Link>
      </div>
      {auth && <AuthModal onClose={() => setAuth(false)} onSuccess={() => setAuth(false)} />}
    </div>
  )
}
