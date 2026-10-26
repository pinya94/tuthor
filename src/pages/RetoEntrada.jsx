// /reto y /reto/:codigo — la puerta de los retos de clase. Con el código lleva
// a su sitio: un ranking libre a /ranking/CODIGO, y unos deberes o una partida
// en directo al examen de su juego con ?reto=CODIGO (allí MechanicExam monta
// el reto: la pizarra si eres el profe, el móvil o los deberes si no).
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import { leeRanking } from '../lib/rankingClase'
import { normalizaCodigo, codigoValido } from '../lib/apodo'
import { examRoute } from '../lib/exams'

export default function RetoEntrada() {
  const { codigo } = useParams()
  const { tr, localPath } = useLang()
  const navigate = useNavigate()
  const [escrito, setEscrito] = useState('')
  const [error, setError] = useState('')
  const [buscando, setBuscando] = useState(!!codigo)

  const ve = async crudo => {
    const c = normalizaCodigo(crudo)
    if (!codigoValido(c)) { setError(tr({ es: 'Son 6 letras y números.', en: 'It’s 6 letters and numbers.', ca: 'Són 6 lletres i números.' })); setBuscando(false); return }
    setBuscando(true); setError('')
    try {
      const r = await leeRanking(c)
      const ruta = r && r.modo && r.modo !== 'ranking' ? examRoute(r.examen) : null
      if (!r) { setError(tr({ es: 'No hay ningún reto con ese código.', en: 'There’s no challenge with that code.', ca: 'No hi ha cap repte amb aquest codi.' })); setBuscando(false); return }
      navigate(ruta ? `${localPath(ruta)}?reto=${c}` : localPath(`/ranking/${c}`), { replace: true })
    } catch { setError(tr({ es: 'No se ha podido conectar. Prueba otra vez.', en: 'Couldn’t connect. Try again.', ca: 'No s’ha pogut connectar. Torna-ho a provar.' })); setBuscando(false) }
  }

  useEffect(() => {
    if (!codigo) return
    let vivo = true
    Promise.resolve().then(() => { if (vivo) ve(codigo) })
    return () => { vivo = false }
  }, [codigo]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative z-10 max-w-md mx-auto px-4 py-12">
      <SEOHead path="/reto" noindex title={tr({ es: 'Entrar en un reto — Tuthor', en: 'Join a challenge — Tuthor', ca: 'Entrar en un repte — Tuthor' })} description="" />
      <div className="rounded-2xl bg-[#141b2e] border border-white/[0.08] p-6 text-center">
        <p className="text-5xl mb-2">🏆</p>
        <h1 className="text-white font-black text-2xl mb-1">{tr({ es: 'Entrar en un reto', en: 'Join a challenge', ca: 'Entrar en un repte' })}</h1>
        <p className="text-white/55 text-sm mb-5">{tr({ es: 'Escribe el código que te ha dado tu profe.', en: 'Type the code your teacher gave you.', ca: 'Escriu el codi que t’ha donat el teu profe.' })}</p>
        {buscando ? <p className="text-white/40">…</p> : (
          <form onSubmit={e => { e.preventDefault(); ve(escrito) }} className="space-y-3">
            <input value={escrito} onChange={e => setEscrito(e.target.value.toUpperCase())} maxLength={8} autoFocus autoCapitalize="characters"
              placeholder="ABC234" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-center font-mono text-3xl tracking-[0.3em] text-white placeholder-white/20 outline-none focus:border-amber-400" />
            {error && <p className="text-red-300 text-sm font-bold">{error}</p>}
            <button type="submit" className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black py-3">{tr({ es: 'Entrar →', en: 'Join →', ca: 'Entrar →' })}</button>
          </form>
        )}
      </div>
    </div>
  )
}
