// /reto y /reto/:codigo — «🔑 Tengo un código» del menú: la única casilla
// para cualquier código que dé el profe (el profe crea y gestiona en su zona,
// /profesor). Primero se busca un reto: un ranking libre va a
// /reto/CODIGO/clase, y unos deberes o una partida en directo al examen de su
// juego con ?reto=CODIGO (allí MechanicExam monta el reto: la pizarra si eres
// el profe, el móvil o los deberes si no). Si no es un reto, se mira si es el
// código de una clase: con sesión se une en /clase; sin ella hay que entrar,
// porque estar en una clase es estar con tu cuenta.
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import SEOHead from '../components/SEOHead'
import AuthModal from '../components/AuthModal'
import { esCodigoDeClase } from '../lib/classes'
import { leeRanking } from '../lib/rankingClase'
import { normalizaCodigo, codigoValido } from '../lib/apodo'
import { examRoute } from '../lib/exams'

export default function RetoEntrada() {
  const { codigo } = useParams()
  const { tr, localPath } = useLang()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [escrito, setEscrito] = useState('')
  const [error, setError] = useState('')
  const [buscando, setBuscando] = useState(!!codigo)
  // El código era de una clase y no hay sesión: se ofrece entrar
  const [pideCuenta, setPideCuenta] = useState(false)
  // Código a volver a probar en cuanto haya sesión
  const [reintenta, setReintenta] = useState(null)

  const ve = async crudo => {
    const c = normalizaCodigo(crudo)
    if (!codigoValido(c)) { setError(tr({ es: 'Son 6 letras y números.', en: 'It’s 6 letters and numbers.', ca: 'Són 6 lletres i números.' })); setBuscando(false); return }
    setBuscando(true); setError('')
    try {
      const r = await leeRanking(c)
      const ruta = r && r.modo && r.modo !== 'ranking' ? examRoute(r.examen) : null
      if (!r) {
        if (user && await esCodigoDeClase(c).catch(() => false)) { navigate(`${localPath('/clase')}?unirse=${c}`, { replace: true }); return }
        setError(user
          ? tr({ es: 'No hay ningún reto ni ninguna clase con ese código.', en: 'There’s no challenge or class with that code.', ca: 'No hi ha cap repte ni cap classe amb aquest codi.' })
          : tr({ es: 'No hay ningún reto con ese código. Si es el código de tu clase, entra con tu cuenta para unirte.', en: 'There’s no challenge with that code. If it’s your class code, sign in to join.', ca: 'No hi ha cap repte amb aquest codi. Si és el codi de la teva classe, entra amb el teu compte per unir-t’hi.' }))
        setPideCuenta(!user)
        setBuscando(false); return
      }
      navigate(ruta ? `${localPath(ruta)}?reto=${c}` : localPath(`/reto/${c}/clase`), { replace: true })
    } catch { setError(tr({ es: 'No se ha podido conectar. Prueba otra vez.', en: 'Couldn’t connect. Try again.', ca: 'No s’ha pogut connectar. Torna-ho a provar.' })); setBuscando(false) }
  }

  useEffect(() => {
    if (!codigo) return
    let vivo = true
    Promise.resolve().then(() => { if (vivo) ve(codigo) })
    return () => { vivo = false }
  }, [codigo]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!user || !reintenta) return
    let vivo = true
    Promise.resolve().then(() => { if (vivo) { setReintenta(null); ve(reintenta) } })
    return () => { vivo = false }
  }, [user, reintenta]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative z-10 max-w-md mx-auto px-4 py-12">
      <SEOHead path="/reto" noindex title={tr({ es: "Tengo un código — Tuthor", en: "I have a code — Tuthor", ca: "Tinc un codi — Tuthor" })} description="" />
      <div className="rounded-2xl bg-[#141b2e] border border-white/[0.08] p-6 text-center">
        <p className="text-5xl mb-2">🔑</p>
        <h1 className="text-white font-black text-2xl mb-1">{tr({ es: 'Tengo un código', en: 'I have a code', ca: 'Tinc un codi' })}</h1>
        <p className="text-white/55 text-sm mb-5">{tr({ es: 'El que te ha dado tu profe: el de un reto o el de tu clase.', en: 'The one your teacher gave you: for a challenge or for your class.', ca: 'El que t’ha donat el teu profe: el d’un repte o el de la teva classe.' })}</p>
        {buscando ? <p className="text-white/40">…</p> : (
          <form onSubmit={e => { e.preventDefault(); ve(escrito) }} className="space-y-3">
            <input value={escrito} onChange={e => setEscrito(e.target.value.toUpperCase())} maxLength={8} autoFocus autoCapitalize="characters"
              placeholder="ABC234" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-center font-mono text-3xl tracking-[0.3em] text-white placeholder-white/20 outline-none focus:border-amber-400" />
            {error && <p className="text-red-300 text-sm font-bold">{error}</p>}
            <button type="submit" className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black py-3">{tr({ es: 'Entrar →', en: 'Join →', ca: 'Entrar →' })}</button>
            {pideCuenta && (
              <button type="button" onClick={() => setPideCuenta('modal')} className="w-full rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-bold py-2.5 text-sm">
                👤 {tr({ es: 'Entrar con mi cuenta', en: 'Sign in', ca: 'Entrar amb el meu compte' })}
              </button>
            )}
          </form>
        )}
      </div>
      {/* Al entrar, se vuelve a probar el mismo código: ahora sí se puede
          saber si es de una clase */}
      {pideCuenta === 'modal' && <AuthModal onClose={() => setPideCuenta(true)} onSuccess={() => { setPideCuenta(false); setReintenta(escrito || codigo) }} />}
      {/* Lo del profe está en su zona; aquí solo el camino para llegar */}
      <p className="text-center mt-6">
        <Link to={user ? `${localPath('/profesor')}?tab=retos` : `${localPath('/profesores')}#retos`} className="text-white/40 hover:text-white/70 text-xs font-bold">
          {tr({ es: '¿Eres profe? Los retos se crean desde tu panel →', en: 'Teacher? Challenges are created from your dashboard →', ca: 'Ets profe? Els reptes es creen des del teu tauler →' })}
        </Link>
      </p>
    </div>
  )
}
