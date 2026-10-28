// «Juega con tus amigos»: una partida en directo de este juego o test para
// cualquiera con cuenta, sin ser profe (sale en la portada de los exámenes
// con mecánica y de los tipo test y, desde el juego, con ?amigos=1). Es la misma partida que la de clase —tu
// pantalla hace de pizarra y cada uno responde en su móvil—, pero sin clase,
// sin notas ni deberes, y caduca a las 24 h. Los retos de clase siguen siendo
// cosa del panel del profe.
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../../context/LangContext'
import { useAuth } from '../../context/AuthContext'
import AuthModal from '../AuthModal'
import { crearReto } from '../../lib/rankingClase'
import { RETOS_TODOS } from '../../data/retosExamenes'

const chip = on => `rounded-xl border px-3 py-2 text-sm font-bold ${on ? 'border-amber-400 bg-amber-400/20 text-white' : 'border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.08]'}`

export default function ConAmigos({ gameId, levels, title }) {
  const { tr, l } = useLangL()
  const { user } = useAuth()
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const [abierto, setAbierto] = useState(() => new URLSearchParams(search).get('amigos') === '1')
  const [nivel, setNivel] = useState(Math.min(1, (levels?.length ?? 1) - 1))
  const [segundos, setSegundos] = useState(30)
  const [n, setN] = useState(10)
  const [auth, setAuth] = useState(false)
  const [creando, setCreando] = useState(false)
  const [error, setError] = useState('')
  if (!RETOS_TODOS.includes(gameId)) return null

  const crea = async () => {
    if (!user) { setAuth(true); return }
    setCreando(true); setError('')
    try {
      const nombre = `${tr({ es: 'Con amigos', en: 'With friends', ca: 'Amb amics' })} · ${(title?.[l] ?? title?.es ?? '').replace(/^(?:\p{Extended_Pictographic}|️|\s)+/u, '').replace(/^(Examen|Exam)\s*(de |d’|:)?\s*/i, '')}`
      const codigo = await crearReto(user.uid, { nombre, modo: 'directo', amigos: true, examen: gameId, nivel, nPreguntas: n, segundos })
      // Tu pantalla pasa a ser la pizarra de la partida
      navigate(`${pathname}?reto=${codigo}`)
    } catch { setError(tr({ es: 'No se ha podido crear la partida. Prueba otra vez.', en: 'The game couldn’t be created. Try again.', ca: 'No s’ha pogut crear la partida. Torna-ho a provar.' })) }
    setCreando(false)
  }

  return (
    <div className="mb-4 rounded-2xl border border-amber-400/25 bg-amber-400/[0.05] p-4">
      {!abierto ? (
        <button type="button" onClick={() => setAbierto(true)} className="w-full flex items-center gap-3 text-left">
          <span className="text-2xl" aria-hidden="true">🎉</span>
          <span className="flex-1">
            <span className="block text-white font-black">{tr({ es: 'Juega con tus amigos', en: 'Play with your friends', ca: 'Juga amb els teus amics' })}</span>
            <span className="block text-white/55 text-xs">{tr({ es: 'Tu pantalla hace de pizarra y cada uno responde en su móvil, contra el reloj.', en: 'Your screen is the board and everyone answers on their phone, against the clock.', ca: 'La teva pantalla fa de pissarra i cadascú respon al mòbil, contra rellotge.' })}</span>
          </span>
          <span className="text-amber-300 font-black">→</span>
        </button>
      ) : (
        <div className="space-y-3">
          <p className="text-white font-black">🎉 {tr({ es: 'Partida con amigos', en: 'Game with friends', ca: 'Partida amb amics' })}</p>
          {levels?.length > 1 && (
            <div className="flex flex-wrap gap-1.5">
              {levels.map((lv, i) => <button key={lv.key} type="button" onClick={() => setNivel(i)} className={chip(nivel === i)}>{lv.emoji ? `${lv.emoji} ` : ''}{lv.label?.[l] ?? lv.label?.es}</button>)}
            </div>
          )}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-white/50 text-xs font-bold mr-1">{tr({ es: 'Preguntas', en: 'Questions', ca: 'Preguntes' })}</span>
            {[5, 10, 15].map(x => <button key={x} type="button" onClick={() => setN(x)} className={chip(n === x)}>{x}</button>)}
            <span className="text-white/50 text-xs font-bold ml-3 mr-1">{tr({ es: 'Segundos', en: 'Seconds', ca: 'Segons' })}</span>
            {[20, 30, 45].map(x => <button key={x} type="button" onClick={() => setSegundos(x)} className={chip(segundos === x)}>{x}</button>)}
          </div>
          {error && <p className="text-red-300 text-sm">{error}</p>}
          <button type="button" onClick={crea} disabled={creando} className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black disabled:opacity-50">
            {creando ? '…' : user ? tr({ es: 'Crear la partida →', en: 'Create the game →', ca: 'Crear la partida →' }) : tr({ es: 'Entra para crear la partida →', en: 'Log in to create the game →', ca: 'Entra per crear la partida →' })}
          </button>
          <p className="text-white/40 text-[11px]">{tr({ es: 'Tus amigos no necesitan cuenta: entran en tuthor.es/reto con el código. La partida caduca en 24 horas. ¿Eres profe? Los retos de clase, con notas, se crean en tu panel.', en: 'Your friends don’t need an account: they join at tuthor.es/reto with the code. The game expires in 24 hours. Teacher? Class challenges, with marks, are created in your dashboard.', ca: 'Els teus amics no necessiten compte: entren a tuthor.es/reto amb el codi. La partida caduca en 24 hores. Ets profe? Els reptes de classe, amb notes, es creen al teu tauler.' })}</p>
        </div>
      )}
      {auth && <AuthModal onClose={() => setAuth(false)} defaultMode="register" />}
    </div>
  )
}

function useLangL() {
  const ctx = useLang()
  return { ...ctx, l: ctx.lang === 'en' ? 'en' : ctx.lang === 'ca' ? 'ca' : 'es' }
}
