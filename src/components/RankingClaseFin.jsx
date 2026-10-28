// Ranking de clase al final de una partida. Si el alumno ya se unió (código
// del profe + apodo), su récord sube solo y ve el top de su clase en este
// juego; si no, un botón discreto para unirse con el código. Sin cuenta: ver
// src/lib/rankingClase.js.
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { miRanking, unirse, enviarPuntos, leeEntradas, posiciones, salirDelRanking, ERRORES } from '../lib/rankingClase'

export function FormUnirse({ codigoInicial = '', onUnido, compacto = false, conNota = false }) {
  const { tr } = useLang()
  const [codigo, setCodigo] = useState(codigoInicial)
  const { user } = useAuth()
  // Con sesión, su nombre de pila y la inicial del apellido (se puede cambiar)
  const [apodo, setApodo] = useState(() => {
    const p = String(user?.displayName ?? '').trim().split(/\s+/).filter(Boolean)
    return p.length ? `${p[0]}${p[1] ? ` ${p[1][0]}.` : ''}`.slice(0, 16) : ''
  })
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)
  const envia = async e => {
    e.preventDefault()
    setEnviando(true); setError('')
    try { onUnido?.(await unirse(codigo, apodo)) } catch (err) { setError(tr(ERRORES[err.message] ?? ERRORES.red)) }
    setEnviando(false)
  }
  const campo = 'w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-amber-400'
  return (
    <form onSubmit={envia} className="space-y-2 text-left">
      {!codigoInicial && (
        <input value={codigo} onChange={e => setCodigo(e.target.value.toUpperCase())} maxLength={8} required autoCapitalize="characters"
          placeholder={tr({ es: 'Código de tu profe (6 letras)', en: 'Your teacher’s code (6 characters)', ca: 'Codi del teu profe (6 lletres)' })}
          className={`${campo} font-mono tracking-widest uppercase`} />
      )}
      <input value={apodo} onChange={e => setApodo(e.target.value)} maxLength={16} required
        placeholder={conNota ? tr({ es: 'Tu nombre', en: 'Your name', ca: 'El teu nom' }) : tr({ es: 'Tu apodo', en: 'Your nickname', ca: 'El teu sobrenom' })} className={campo} />
      <p className="text-white/40 text-[11px] leading-snug">
        {conNota
          ? tr({ es: 'Escribe el nombre que te pida tu profe (mira su nota). Lo verá tu profe. No hace falta cuenta.', en: 'Type the name your teacher asks for (see their note). Your teacher will see it. No account needed.', ca: 'Escriu el nom que et demani el teu profe (mira la seva nota). El veurà el teu profe. No cal compte.' })
          : tr({ es: 'Usa un apodo, no tu nombre y apellidos. Tu profe lo verá y puede borrarlo. No hace falta cuenta.', en: 'Use a nickname, not your full name. Your teacher will see it and can delete it. No account needed.', ca: 'Fes servir un sobrenom, no el teu nom i cognoms. El teu profe el veurà i el pot esborrar. No cal compte.' })}
      </p>
      {error && <p className="text-red-300 text-xs font-bold">{error}</p>}
      <button type="submit" disabled={enviando}
        className={`w-full rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black ${compacto ? 'py-2 text-sm' : 'py-3'} disabled:opacity-50`}>
        {enviando ? '…' : tr({ es: 'Entrar', en: 'Join', ca: 'Entrar' })}
      </button>
    </form>
  )
}

export default function RankingClaseFin({ game, score }) {
  const { tr, localPath } = useLang()
  const [mio, setMio] = useState(miRanking)
  const [abierto, setAbierto] = useState(false)
  const [filas, setFilas] = useState(null)
  const [record, setRecord] = useState(false)
  const enviado = useRef(null)

  useEffect(() => {
    const cambia = () => setMio(miRanking())
    window.addEventListener('tuthor:ranking-clase', cambia)
    return () => window.removeEventListener('tuthor:ranking-clase', cambia)
  }, [])

  // Al estar dentro (o al entrar ahora): sube esta partida una sola vez y lee el top
  useEffect(() => {
    if (!mio || enviado.current === mio.codigo) return
    enviado.current = mio.codigo
    let vivo = true
    ;(async () => {
      // Una partida a cero no entra: solo ensuciaría el ranking
      const r = score > 0 ? await enviarPuntos(game, score) : null
      if (!vivo) return
      if (r?.record) setRecord(true)
      try { const f = await leeEntradas(mio.codigo, game); if (vivo) setFilas(f) } catch { if (vivo) setFilas([]) }
    })()
    return () => { vivo = false }
  }, [mio, game, score])

  if (!mio) {
    return (
      <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] p-3 text-left">
        {abierto ? (
          <>
            <p className="text-white font-black text-sm mb-2">🏆 {tr({ es: 'Ranking de tu clase', en: 'Your class ranking', ca: 'Rànquing de la teva classe' })}</p>
            <FormUnirse compacto onUnido={() => setMio(miRanking())} />
          </>
        ) : (
          <button type="button" onClick={() => setAbierto(true)} className="w-full text-center text-amber-200/90 text-sm font-bold">
            🏆 {tr({ es: '¿Tu profe te ha dado un código de ranking?', en: 'Has your teacher given you a ranking code?', ca: 'El teu profe t’ha donat un codi de rànquing?' })}
          </button>
        )}
      </div>
    )
  }

  const pos = filas ? posiciones(filas) : []
  const yo = filas?.findIndex(f => f.pid === mio.pid) ?? -1
  const top = filas?.slice(0, 5) ?? []
  return (
    <div className="mt-5 rounded-2xl border border-amber-400/25 bg-amber-400/[0.05] p-3 text-left">
      <div className="flex items-baseline justify-between gap-2 mb-2">
        <p className="text-white font-black text-sm truncate">🏆 {mio.nombre}</p>
        <p className="text-white/40 text-[11px] shrink-0">{tr({ es: 'como', en: 'as', ca: 'com' })} <b className="text-amber-200">{mio.apodo}</b></p>
      </div>
      {record && <p className="text-amber-300 font-black text-sm mb-2">{tr({ es: '¡Nuevo récord en el ranking de tu clase!', en: 'New record in your class ranking!', ca: 'Nou rècord al rànquing de la teva classe!' })}</p>}
      {filas == null ? <p className="text-white/40 text-xs">…</p> : filas.length === 0 ? (
        <p className="text-white/45 text-xs">{tr({ es: 'Nadie de tu clase tiene puntos en este juego todavía.', en: 'Nobody in your class has scored in this game yet.', ca: 'Ningú de la teva classe té punts en aquest joc encara.' })}</p>
      ) : (
        <ol className="space-y-1">
          {top.map((f, i) => (
            <li key={f.id} className={`flex items-center gap-2 rounded-lg px-2 py-1 text-sm ${i === yo ? 'bg-amber-400/20 text-white font-black' : 'text-white/80'}`}>
              <span className="w-6 text-white/45 tabular-nums">{pos[i]}.</span>
              <span className="flex-1 truncate">{f.apodo}</span>
              <span className="tabular-nums font-bold">{f.puntos.toLocaleString()}</span>
            </li>
          ))}
          {yo >= 5 && (
            <li className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm bg-amber-400/20 text-white font-black">
              <span className="w-6 tabular-nums">{pos[yo]}.</span><span className="flex-1 truncate">{filas[yo].apodo}</span><span className="tabular-nums">{filas[yo].puntos.toLocaleString()}</span>
            </li>
          )}
        </ol>
      )}
      <div className="flex justify-between items-center mt-2">
        <Link to={localPath(`/reto/${mio.codigo}/clase`)} className="text-amber-200 text-xs font-bold hover:underline">{tr({ es: 'Ver todo el ranking →', en: 'See the full ranking →', ca: 'Veure tot el rànquing →' })}</Link>
        <button type="button" onClick={salirDelRanking} className="text-white/30 text-[11px] hover:text-white/60">{tr({ es: 'Salir', en: 'Leave', ca: 'Sortir' })}</button>
      </div>
    </div>
  )
}
