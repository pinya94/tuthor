// /ranking — rankings de clase sin cuenta.
//   /ranking          el alumno se une con un código; el profe (con cuenta)
//                     crea rankings y ve los suyos
//   /ranking/:codigo  el ranking de una clase por juego: para unirse, para
//                     mirarlo y para proyectarlo en la pizarra; su dueño
//                     además lo modera (quitar apodos) y lo cierra
// Lógica en src/lib/rankingClase.js; lo que escribe el alumno, en
// api/ranking-clase.js.
import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import AuthModal from '../components/AuthModal'
import { FormUnirse } from '../components/RankingClaseFin'
import { gameLabel, gameEmoji, GAMES } from '../lib/games'
import { normalizaCodigo, codigoValido } from '../lib/apodo'
import {
  miRanking, salirDelRanking, escuchaRanking, cuentaAlumnos, porJuego, posiciones,
  crearRanking, misRankings, cerrarRanking, borrarAlumno, borrarRanking,
} from '../lib/rankingClase'

const ORIGEN = 'https://www.tuthor.es'
const tarjeta = 'rounded-2xl bg-[#141b2e] border border-white/[0.08] p-4'
const botonGris = 'rounded-xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.1] px-3 py-2 text-white/85 text-sm font-semibold'

function useMio() {
  const [mio, setMio] = useState(miRanking)
  useEffect(() => {
    const cambia = () => setMio(miRanking())
    window.addEventListener('tuthor:ranking-clase', cambia)
    return () => window.removeEventListener('tuthor:ranking-clase', cambia)
  }, [])
  return mio
}

export default function RankingClase() {
  const { codigo } = useParams()
  const c = normalizaCodigo(codigo)
  return codigo ? <UnRanking codigo={c} /> : <Inicio />
}

// ── /ranking ────────────────────────────────────────────────────────────────
function Inicio() {
  const { tr, localPath } = useLang()
  const { user } = useAuth()
  const navigate = useNavigate()
  const mio = useMio()
  const [mios, setMios] = useState(null)
  const [nombre, setNombre] = useState('')
  const [creando, setCreando] = useState(false)
  const [auth, setAuth] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
    let vivo = true
    misRankings(user.uid).then(r => { if (vivo) setMios(r) }).catch(() => { if (vivo) setMios([]) })
    return () => { vivo = false }
  }, [user])

  const crea = async e => {
    e.preventDefault()
    setCreando(true); setError('')
    try {
      const cod = await crearRanking(user.uid, nombre)
      navigate(localPath(`/ranking/${cod}`))
    } catch { setError(tr({ es: 'No se ha podido crear. Prueba otra vez.', en: 'It couldn’t be created. Try again.', ca: 'No s’ha pogut crear. Torna-ho a provar.' })) }
    setCreando(false)
  }

  return (
    <div className="relative z-10 max-w-3xl mx-auto px-4 py-8">
      <SEOHead path="/ranking" noindex
        title={tr({ es: 'Ranking de clase — Tuthor', en: 'Class ranking — Tuthor', ca: 'Rànquing de classe — Tuthor' })}
        description={tr({ es: 'Ranking de clase con apodos y sin cuentas: el profe reparte un código y los alumnos compiten en los juegos de Tuthor.', en: 'A class ranking with nicknames and no accounts: the teacher shares a code and students compete in Tuthor’s games.', ca: 'Rànquing de classe amb sobrenoms i sense comptes: el profe reparteix un codi i els alumnes competeixen als jocs de Tuthor.' })} />
      <h1 className="text-3xl font-black text-white mb-1">🏆 {tr({ es: 'Ranking de clase', en: 'Class ranking', ca: 'Rànquing de classe' })}</h1>
      <p className="text-white/55 text-sm mb-6 max-w-xl">
        {tr({ es: 'Tu profe reparte un código, cada uno elige un apodo y, al acabar cada partida, tu récord sube solo al ranking de la clase. Sin cuentas ni correos.', en: 'Your teacher shares a code, everyone picks a nickname and, at the end of each game, your best score goes up to the class ranking. No accounts or emails.', ca: 'El teu profe reparteix un codi, cadascú tria un sobrenom i, en acabar cada partida, el teu rècord puja sol al rànquing de la classe. Sense comptes ni correus.' })}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <section className={tarjeta}>
          <h2 className="text-white font-black mb-1">🎒 {tr({ es: 'Soy alumno', en: 'I’m a student', ca: 'Sóc alumne' })}</h2>
          {mio ? (
            <div className="text-sm text-white/70 space-y-3">
              <p>{tr({ es: 'Estás en', en: 'You’re in', ca: 'Ets a' })} <b className="text-white">{mio.nombre}</b> {tr({ es: 'como', en: 'as', ca: 'com' })} <b className="text-amber-200">{mio.apodo}</b>.</p>
              <div className="flex gap-2">
                <Link to={localPath(`/ranking/${mio.codigo}`)} className="rounded-xl bg-amber-400 text-black font-black px-4 py-2 text-sm">{tr({ es: 'Ver el ranking', en: 'See the ranking', ca: 'Veure el rànquing' })}</Link>
                <Link to={localPath('/juegos')} className={botonGris}>🎮 {tr({ es: 'A jugar', en: 'Play', ca: 'A jugar' })}</Link>
              </div>
              <button type="button" onClick={salirDelRanking} className="text-white/35 text-xs hover:text-white/60">{tr({ es: 'Salir de este ranking', en: 'Leave this ranking', ca: 'Sortir d’aquest rànquing' })}</button>
            </div>
          ) : (
            <FormUnirse onUnido={() => navigate(localPath(`/ranking/${miRanking().codigo}`))} />
          )}
        </section>

        <section className={tarjeta}>
          <h2 className="text-white font-black mb-1">📚 {tr({ es: 'Soy profe', en: 'I’m a teacher', ca: 'Sóc profe' })}</h2>
          {!user ? (
            <div className="text-sm text-white/60 space-y-3">
              <p>{tr({ es: 'Crea un ranking para tu clase en un minuto. Tú sí necesitas cuenta (gratis), tus alumnos no.', en: 'Create a ranking for your class in a minute. You need a (free) account; your students don’t.', ca: 'Crea un rànquing per a la teva classe en un minut. Tu sí que necessites compte (gratis), els teus alumnes no.' })}</p>
              <button type="button" onClick={() => setAuth(true)} className="rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold px-4 py-2 text-sm">{tr({ es: 'Entrar o registrarme', en: 'Log in or sign up', ca: 'Entrar o registrar-me' })}</button>
            </div>
          ) : (
            <>
              <form onSubmit={crea} className="flex gap-2 mb-3">
                <input value={nombre} onChange={e => setNombre(e.target.value)} required maxLength={60}
                  placeholder={tr({ es: 'Nombre (ej. 3º ESO B · Química)', en: 'Name (e.g. Year 9B · Chemistry)', ca: 'Nom (ex. 3r ESO B · Química)' })}
                  className="flex-1 min-w-0 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-teal-500" />
                <button type="submit" disabled={creando} className="shrink-0 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold px-3 py-2 text-sm disabled:opacity-50">
                  {creando ? '…' : tr({ es: '+ Crear', en: '+ Create', ca: '+ Crear' })}
                </button>
              </form>
              {error && <p className="text-red-300 text-xs mb-2">{error}</p>}
              {mios == null ? <p className="text-white/30 text-xs">…</p> : mios.length === 0
                ? <p className="text-white/35 text-xs">{tr({ es: 'Aún no has creado ninguno.', en: 'You haven’t created any yet.', ca: 'Encara no n’has creat cap.' })}</p>
                : (
                  <ul className="space-y-1.5">
                    {mios.map(r => (
                      <li key={r.codigo}>
                        <Link to={localPath(`/ranking/${r.codigo}`)} className="flex items-center justify-between gap-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] px-3 py-2">
                          <span className="text-white text-sm font-bold truncate">{r.nombre}{r.cerrado ? ' 🔒' : ''}</span>
                          <span className="shrink-0 font-mono text-teal-300 text-xs">{r.codigo}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
            </>
          )}
        </section>
      </div>
      {auth && <AuthModal onClose={() => setAuth(false)} defaultMode="register" />}
    </div>
  )
}

// ── /ranking/:codigo ────────────────────────────────────────────────────────
function UnRanking({ codigo }) {
  const { tr, lang, localPath } = useLang()
  const { user } = useAuth()
  const navigate = useNavigate()
  const mio = useMio()
  const [ranking, setRanking] = useState(undefined)
  const [entradas, setEntradas] = useState([])
  const [proyectar, setProyectar] = useState(false)
  const [qr, setQr] = useState(null)
  const [copiado, setCopiado] = useState(false)
  const dueno = !!user && ranking?.teacherId === user.uid
  const enlace = `${ORIGEN}${lang === 'es' ? '' : `/${lang}`}/ranking/${codigo}`

  const [nAlumnos, setNAlumnos] = useState(null)

  // En directo: cada récord nuevo aparece al momento (también proyectado)
  useEffect(() => {
    if (!codigoValido(codigo)) return
    return escuchaRanking(codigo, { onRanking: setRanking, onEntradas: setEntradas, onError: () => setRanking(null) })
  }, [codigo])

  // Cuántos se han unido (aunque aún no hayan jugado): solo para el profe
  const contar = useCallback(() => { cuentaAlumnos(codigo).then(setNAlumnos).catch(() => {}) }, [codigo])
  useEffect(() => {
    if (!dueno) return
    contar()
    const t = setInterval(contar, 20000)
    return () => clearInterval(t)
  }, [dueno, contar])

  if (ranking === undefined && codigoValido(codigo)) return <div className="min-h-[60vh] grid place-items-center text-white/30 text-sm">…</div>
  if (!ranking) {
    return (
      <div className="relative z-10 max-w-md mx-auto px-4 py-12 text-center">
        <SEOHead path={`/ranking/${codigo}`} noindex title="Tuthor" description="" />
        <p className="text-5xl mb-3">🔍</p>
        <p className="text-white font-black text-lg mb-2">{tr({ es: 'No hay ningún ranking con ese código', en: 'There’s no ranking with that code', ca: 'No hi ha cap rànquing amb aquest codi' })}</p>
        <Link to={localPath('/ranking')} className="text-amber-200 text-sm font-bold">{tr({ es: '← Probar con otro código', en: '← Try another code', ca: '← Provar amb un altre codi' })}</Link>
      </div>
    )
  }

  const grupos = porJuego(entradas)
  const estoyAqui = mio?.codigo === codigo
  const quita = async f => {
    if (!window.confirm(tr({ es: `¿Quitar a «${f.apodo}» del ranking, con todas sus puntuaciones?`, en: `Remove “${f.apodo}” from the ranking, with all their scores?`, ca: `Treure «${f.apodo}» del rànquing, amb totes les seves puntuacions?` }))) return
    await borrarAlumno(codigo, f.pid)
    contar()
  }
  const copia = async () => { try { await navigator.clipboard.writeText(enlace); setCopiado(true); setTimeout(() => setCopiado(false), 2000) } catch { /* sin portapapeles */ } }
  const verQr = async () => { const QRCode = (await import('qrcode')).default; setQr(await QRCode.toDataURL(enlace, { width: 640, margin: 2 })) }

  return (
    <div className={`relative z-10 mx-auto px-4 py-6 ${proyectar ? 'max-w-6xl' : 'max-w-3xl'}`}>
      <SEOHead path={`/ranking/${codigo}`} noindex title={`${ranking.nombre} — ${tr({ es: 'Ranking de clase', en: 'Class ranking', ca: 'Rànquing de classe' })}`} description="" />
      <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
        <div className="min-w-0">
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest">🏆 {tr({ es: 'Ranking de clase', en: 'Class ranking', ca: 'Rànquing de classe' })}{ranking.cerrado ? ` · 🔒 ${tr({ es: 'cerrado', en: 'closed', ca: 'tancat' })}` : ''}</p>
          <h1 className={`text-white font-black leading-tight ${proyectar ? 'text-5xl' : 'text-3xl'}`}>{ranking.nombre}</h1>
        </div>
        <div className="text-right">
          <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest">{tr({ es: 'Código', en: 'Code', ca: 'Codi' })}</p>
          <p className={`font-mono font-black text-amber-300 tracking-[0.2em] ${proyectar ? 'text-5xl' : 'text-2xl'}`}>{codigo}</p>
        </div>
      </div>

      {proyectar && <p className="text-white/60 text-lg mb-4">{tr({ es: 'Entra en', en: 'Go to', ca: 'Entra a' })} <b className="text-white">tuthor.es/ranking</b> {tr({ es: 'y escribe el código', en: 'and type the code', ca: 'i escriu el codi' })}</p>}

      {!proyectar && !estoyAqui && !ranking.cerrado && !dueno && (
        <section className={`${tarjeta} mb-4`}>
          <p className="text-white font-black mb-2">{tr({ es: 'Entra con tu apodo', en: 'Join with your nickname', ca: 'Entra amb el teu sobrenom' })}</p>
          <FormUnirse codigoInicial={codigo} />
        </section>
      )}
      {!proyectar && estoyAqui && (
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 rounded-xl border border-amber-400/25 bg-amber-400/[0.06] px-3 py-2">
          <p className="text-white/75 text-sm">{tr({ es: 'Juegas como', en: 'You play as', ca: 'Jugues com' })} <b className="text-amber-200">{mio.apodo}</b>. {tr({ es: 'Al acabar cada partida, tu récord sube solo.', en: 'At the end of each game, your best score goes up on its own.', ca: 'En acabar cada partida, el teu rècord puja sol.' })}</p>
          <div className="flex gap-2">
            <Link to={localPath('/juegos')} className="rounded-xl bg-amber-400 text-black font-black px-3 py-1.5 text-sm">🎮 {tr({ es: 'A jugar', en: 'Play', ca: 'A jugar' })}</Link>
            <button type="button" onClick={() => { salirDelRanking(); navigate(localPath('/ranking')) }} className="text-white/35 text-xs hover:text-white/60">{tr({ es: 'Salir', en: 'Leave', ca: 'Sortir' })}</button>
          </div>
        </div>
      )}

      {dueno && !proyectar && (
        <section className={`${tarjeta} mb-4`}>
          <p className="text-white/45 text-[11px] font-bold uppercase tracking-widest mb-2">{tr({ es: 'Solo lo ves tú', en: 'Only you see this', ca: 'Només ho veus tu' })} · {nAlumnos ?? '…'} 👤</p>
          <p className="text-white/70 text-sm mb-3">{tr({ es: 'Pasa el enlace o el código a tus alumnos: eligen un apodo y juegan. Puedes quitar cualquier apodo con la ✕.', en: 'Give your students the link or the code: they pick a nickname and play. You can remove any nickname with the ✕.', ca: 'Passa l’enllaç o el codi als teus alumnes: trien un sobrenom i juguen. Pots treure qualsevol sobrenom amb la ✕.' })}</p>
          <div className="flex flex-wrap gap-2">
            <a className={botonGris} target="_blank" rel="noopener noreferrer" href={`https://classroom.google.com/share?url=${encodeURIComponent(enlace)}`}>🏫 Google Classroom</a>
            <button type="button" className={botonGris} onClick={copia}>{copiado ? '✅' : '🔗'} {copiado ? tr({ es: '¡Copiado!', en: 'Copied!', ca: 'Copiat!' }) : tr({ es: 'Copiar enlace', en: 'Copy link', ca: 'Copia l’enllaç' })}</button>
            <button type="button" className={botonGris} onClick={verQr}>📱 QR</button>
            <button type="button" className={botonGris} onClick={async () => { await cerrarRanking(codigo, !ranking.cerrado) }}>
              {ranking.cerrado ? `🔓 ${tr({ es: 'Reabrir', en: 'Reopen', ca: 'Reobrir' })}` : `🔒 ${tr({ es: 'Cerrar (nadie más suma)', en: 'Close (no more scores)', ca: 'Tancar (ningú més suma)' })}`}
            </button>
            <button type="button" className={`${botonGris} text-red-300`} onClick={async () => {
              if (!window.confirm(tr({ es: '¿Borrar este ranking entero? No se puede deshacer.', en: 'Delete this whole ranking? This can’t be undone.', ca: 'Esborrar aquest rànquing sencer? No es pot desfer.' }))) return
              await borrarRanking(codigo)
              navigate(localPath('/ranking'))
            }}>🗑️ {tr({ es: 'Borrar', en: 'Delete', ca: 'Esborrar' })}</button>
          </div>
          {qr && (
            <div className="mt-3 text-center">
              <img src={qr} alt={enlace} className="mx-auto w-64 h-64 rounded-xl bg-white p-2" />
              <p className="text-white/50 text-xs mt-1 break-all">{enlace}</p>
            </div>
          )}
        </section>
      )}

      <div className="flex justify-end mb-3">
        <button type="button" onClick={() => setProyectar(p => !p)} className={botonGris}>
          {proyectar ? `✕ ${tr({ es: 'Dejar de proyectar', en: 'Stop projecting', ca: 'Deixar de projectar' })}` : `📽️ ${tr({ es: 'Proyectar en la pizarra', en: 'Project on the board', ca: 'Projectar a la pissarra' })}`}
        </button>
      </div>

      {grupos.length === 0 ? (
        <div className={`${tarjeta} text-center py-10`}>
          <p className="text-4xl mb-2">🎮</p>
          <p className="text-white font-bold">{tr({ es: 'Todavía nadie ha jugado', en: 'Nobody has played yet', ca: 'Encara no ha jugat ningú' })}</p>
          <p className="text-white/45 text-sm mt-1">{tr({ es: 'Al acabar cualquier juego, la puntuación aparece aquí.', en: 'When anyone finishes a game, the score shows up here.', ca: 'En acabar qualsevol joc, la puntuació apareix aquí.' })}</p>
        </div>
      ) : (
        <div className={`grid gap-4 ${proyectar ? 'md:grid-cols-2 xl:grid-cols-3' : 'sm:grid-cols-2'}`}>
          {grupos.map(({ juego, filas }) => {
            const pos = posiciones(filas)
            const visibles = proyectar ? filas.slice(0, 10) : filas
            return (
              <section key={juego} className={tarjeta}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  {GAMES[juego]?.route
                    ? <Link to={localPath(GAMES[juego].route)} className={`text-white font-black hover:underline ${proyectar ? 'text-xl' : ''}`}>{gameEmoji(juego)} {gameLabel(juego, lang)}</Link>
                    : <p className={`text-white font-black ${proyectar ? 'text-xl' : ''}`}>{gameEmoji(juego)} {gameLabel(juego, lang)}</p>}
                  <span className="text-white/35 text-xs shrink-0">{filas.length} 👤</span>
                </div>
                <ol className="space-y-1">
                  {visibles.map((f, i) => (
                    <li key={f.id} className={`flex items-center gap-2 rounded-lg px-2 py-1 ${proyectar ? 'text-lg' : 'text-sm'} ${estoyAqui && f.pid === mio.pid ? 'bg-amber-400/20 text-white font-black' : 'text-white/80'}`}>
                      <span className="w-7 text-white/45 tabular-nums">{pos[i] <= 3 ? ['🥇', '🥈', '🥉'][pos[i] - 1] : `${pos[i]}.`}</span>
                      <span className="flex-1 truncate">{f.apodo}</span>
                      <span className="tabular-nums font-bold">{f.puntos.toLocaleString()}</span>
                      {dueno && !proyectar && <button type="button" onClick={() => quita(f)} title={tr({ es: 'Quitar del ranking', en: 'Remove from the ranking', ca: 'Treure del rànquing' })} className="text-white/25 hover:text-red-300 px-1">✕</button>}
                    </li>
                  ))}
                </ol>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
