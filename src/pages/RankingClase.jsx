// /ranking — retos de clase sin cuenta.
//   /ranking          el alumno entra con un código; el profe (con cuenta)
//                     crea retos (en directo, deberes o ranking libre) y ve los suyos
//   /ranking/:codigo  los resultados de un reto: el ranking libre por juego
//                     (para mirarlo o proyectarlo), las notas de unos deberes
//                     o el marcador de una partida en directo. Su dueño lo
//                     comparte, lo modera (quitar apodos) y lo cierra.
// Lógica en src/lib/rankingClase.js; lo que escribe el alumno, en
// api/ranking-clase.js; la partida y los deberes, en components/reto.
import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import AuthModal from '../components/AuthModal'
import { FormUnirse } from '../components/RankingClaseFin'
import { CrearReto, ListaRetos } from '../components/reto/RetosPanel'
import { gameLabel, gameEmoji, GAMES } from '../lib/games'
import { examLabel, examRoute, EXAMS } from '../lib/exams'
import { normalizaCodigo, codigoValido } from '../lib/apodo'
import {
  miRanking, miembroDe, salirDelRanking, escuchaRanking, escuchaColeccion, cuentaAlumnos, porJuego, posiciones,
  cerrarRanking, borrarAlumno, borrarRanking,
} from '../lib/rankingClase'

const ORIGEN = 'https://www.tuthor.es'
const tarjeta = 'rounded-2xl bg-[#141b2e] border border-white/[0.08] p-4'
const botonGris = 'rounded-xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.1] px-3 py-2 text-white/85 text-sm font-semibold'
const MEDALLA = ['🥇', '🥈', '🥉']
const MODO = {
  ranking: { emoji: '🏆', label: { es: 'Ranking de clase', en: 'Class ranking', ca: 'Rànquing de classe' } },
  deberes: { emoji: '🏠', label: { es: 'Deberes', en: 'Homework', ca: 'Deures' } },
  directo: { emoji: '📺', label: { es: 'Partida en directo', en: 'Live game', ca: 'Partida en directe' } },
}

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
  const [auth, setAuth] = useState(false)

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
      <SEOHead path="/ranking" noindex
        title={tr({ es: 'Retos de clase — Tuthor', en: 'Class challenges — Tuthor', ca: 'Reptes de classe — Tuthor' })}
        description={tr({ es: 'Retos de clase con apodos y sin cuentas: una partida en directo desde la pizarra, unos deberes o un ranking de la semana.', en: 'Class challenges with nicknames and no accounts: a live game from the board, homework or a weekly ranking.', ca: 'Reptes de classe amb sobrenoms i sense comptes: una partida en directe des de la pissarra, uns deures o un rànquing de la setmana.' })} />
      <h1 className="text-3xl font-black text-white mb-1">🏆 {tr({ es: 'Retos de clase', en: 'Class challenges', ca: 'Reptes de classe' })}</h1>
      <p className="text-white/55 text-sm mb-6 max-w-2xl">
        {tr({ es: 'Tu profe reparte un código y cada uno entra con un apodo, sin cuentas ni correos: para jugar todos a la vez desde la pizarra, para hacer unos deberes o para competir toda la semana.', en: 'Your teacher shares a code and everyone joins with a nickname, no accounts or emails: to play all at once from the board, to do homework or to compete all week.', ca: 'El teu profe reparteix un codi i cadascú entra amb un sobrenom, sense comptes ni correus: per jugar tots alhora des de la pissarra, per fer uns deures o per competir tota la setmana.' })}
      </p>

      <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start">
        <section className={tarjeta}>
          <h2 className="text-white font-black mb-2">🎒 {tr({ es: 'Soy alumno', en: 'I’m a student', ca: 'Sóc alumne' })}</h2>
          <EntrarConCodigo onCodigo={c => navigate(localPath(`/reto/${c}`))} />
          {mio && (
            <p className="text-white/55 text-xs mt-3">
              {tr({ es: 'Ranking de la semana:', en: 'Weekly ranking:', ca: 'Rànquing de la setmana:' })} <Link to={localPath(`/ranking/${mio.codigo}`)} className="text-amber-200 font-bold">{mio.nombre}</Link> · {tr({ es: 'como', en: 'as', ca: 'com' })} {mio.apodo} · <button type="button" onClick={salirDelRanking} className="underline">{tr({ es: 'salir', en: 'leave', ca: 'sortir' })}</button>
            </p>
          )}
        </section>

        <section className={tarjeta}>
          <h2 className="text-white font-black mb-2">📚 {tr({ es: 'Soy profe', en: 'I’m a teacher', ca: 'Sóc profe' })}</h2>
          {!user ? (
            <div className="text-sm text-white/60 space-y-3">
              <p>{tr({ es: 'Crea un reto para tu clase en un minuto. Tú sí necesitas cuenta (gratis), tus alumnos no.', en: 'Create a challenge for your class in a minute. You need a (free) account; your students don’t.', ca: 'Crea un repte per a la teva classe en un minut. Tu sí que necessites compte (gratis), els teus alumnes no.' })}</p>
              <button type="button" onClick={() => setAuth(true)} className="rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold px-4 py-2 text-sm">{tr({ es: 'Entrar o registrarme', en: 'Log in or sign up', ca: 'Entrar o registrar-me' })}</button>
            </div>
          ) : (
            <div className="space-y-5">
              <CrearReto uid={user.uid} />
              <div>
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2">{tr({ es: 'Tus retos', en: 'Your challenges', ca: 'Els teus reptes' })}</p>
                <ListaRetos uid={user.uid} />
              </div>
            </div>
          )}
        </section>
      </div>
      {auth && <AuthModal onClose={() => setAuth(false)} defaultMode="register" />}
    </div>
  )
}

// El código y nada más: el apodo se pide ya dentro del reto, con la nota del
// profe a la vista (puede pedir el nombre de verdad)
function EntrarConCodigo({ onCodigo }) {
  const { tr } = useLang()
  const [c, setC] = useState('')
  return (
    <form onSubmit={e => { e.preventDefault(); if (normalizaCodigo(c)) onCodigo(normalizaCodigo(c)) }} className="space-y-2">
      <input value={c} onChange={e => setC(e.target.value.toUpperCase())} maxLength={8} required autoCapitalize="characters" placeholder="ABC234"
        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-center font-mono text-2xl tracking-[0.3em] text-white placeholder-white/20 outline-none focus:border-amber-400" />
      <button type="submit" className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black py-3">{tr({ es: 'Entrar →', en: 'Join →', ca: 'Entrar →' })}</button>
      <p className="text-white/40 text-[11px] text-center">{tr({ es: 'El código te lo da tu profe. No hace falta cuenta.', en: 'Your teacher gives you the code. No account needed.', ca: 'El codi te’l dona el teu profe. No cal compte.' })}</p>
    </form>
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
  const [marcador, setMarcador] = useState([])
  const [proyectar, setProyectar] = useState(false)
  const [qr, setQr] = useState(null)
  const [copiado, setCopiado] = useState(false)
  const [nAlumnos, setNAlumnos] = useState(null)
  const dueno = !!user && ranking?.teacherId === user.uid
  const modo = ranking?.modo ?? 'ranking'
  const esReto = modo !== 'ranking'
  // Los retos se comparten por /reto (lleva a su examen); el ranking libre, por aquí
  const enlace = `${ORIGEN}${lang === 'es' ? '' : `/${lang}`}/${esReto ? 'reto' : 'ranking'}/${codigo}`

  // En directo: cada récord nuevo aparece al momento (también proyectado)
  useEffect(() => {
    if (!codigoValido(codigo)) return
    return escuchaRanking(codigo, { onRanking: setRanking, onEntradas: setEntradas, onError: () => setRanking(null) })
  }, [codigo])
  useEffect(() => {
    if (modo !== 'directo') return
    return escuchaColeccion(codigo, 'marcador', setMarcador)
  }, [codigo, modo])

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
        <p className="text-white font-black text-lg mb-2">{tr({ es: 'No hay ningún reto con ese código', en: 'There’s no challenge with that code', ca: 'No hi ha cap repte amb aquest codi' })}</p>
        <Link to={localPath('/ranking')} className="text-amber-200 text-sm font-bold">{tr({ es: '← Probar con otro código', en: '← Try another code', ca: '← Provar amb un altre codi' })}</Link>
      </div>
    )
  }

  const estoyAqui = esReto ? miembroDe(codigo) : (mio?.codigo === codigo ? mio : null)
  const quita = async f => {
    if (!window.confirm(tr({ es: `¿Quitar a «${f.apodo}», con todas sus puntuaciones?`, en: `Remove “${f.apodo}”, with all their scores?`, ca: `Treure «${f.apodo}», amb totes les seves puntuacions?` }))) return
    await borrarAlumno(codigo, f.pid)
    contar()
  }
  const copia = async () => { try { await navigator.clipboard.writeText(enlace); setCopiado(true); setTimeout(() => setCopiado(false), 2000) } catch { /* sin portapapeles */ } }
  const verQr = async () => { const QRCode = (await import('qrcode')).default; setQr(await QRCode.toDataURL(enlace, { width: 640, margin: 2 })) }
  const examen = ranking.examen && EXAMS[ranking.examen] ? `${EXAMS[ranking.examen].emoji ?? ''} ${examLabel(ranking.examen, lang)}` : null

  return (
    <div className={`relative z-10 mx-auto px-4 py-6 ${proyectar ? 'max-w-6xl' : 'max-w-3xl'}`}>
      <SEOHead path={`/ranking/${codigo}`} noindex title={`${ranking.nombre} — ${tr(MODO[modo].label)}`} description="" />
      <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
        <div className="min-w-0">
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{MODO[modo].emoji} {tr(MODO[modo].label)}{ranking.cerrado ? ` · 🔒 ${tr({ es: 'cerrado', en: 'closed', ca: 'tancat' })}` : ''}</p>
          <h1 className={`text-white font-black leading-tight ${proyectar ? 'text-5xl' : 'text-3xl'}`}>{ranking.nombre}</h1>
          {examen && <p className="text-white/55 text-sm mt-1">{examen} · {ranking.nPreguntas ?? 10} {tr({ es: 'preguntas', en: 'questions', ca: 'preguntes' })}{modo === 'directo' ? ` · ${ranking.segundos ?? 30}s` : ''}</p>}
        </div>
        <div className="text-right">
          <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest">{tr({ es: 'Código', en: 'Code', ca: 'Codi' })}</p>
          <p className={`font-mono font-black text-amber-300 tracking-[0.2em] ${proyectar ? 'text-5xl' : 'text-2xl'}`}>{codigo}</p>
        </div>
      </div>

      {proyectar && <p className="text-white/60 text-lg mb-4">{tr({ es: 'Entra en', en: 'Go to', ca: 'Entra a' })} <b className="text-white">tuthor.es/reto</b> {tr({ es: 'y escribe el código', en: 'and type the code', ca: 'i escriu el codi' })}</p>}

      {/* El alumno: entrar (los retos, en su examen con la nota del profe) */}
      {!proyectar && !dueno && !ranking.cerrado && (esReto ? (
        <Link to={localPath(`/reto/${codigo}`)} className="block mb-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-center py-3">
          {modo === 'directo' ? tr({ es: 'Entrar en la partida →', en: 'Join the game →', ca: 'Entrar a la partida →' }) : estoyAqui ? tr({ es: 'Hacer los deberes →', en: 'Do the homework →', ca: 'Fer els deures →' }) : tr({ es: 'Entrar y hacer los deberes →', en: 'Join and do the homework →', ca: 'Entrar i fer els deures →' })}
        </Link>
      ) : !estoyAqui ? (
        <section className={`${tarjeta} mb-4`}>
          <p className="text-white font-black mb-2">{tr({ es: 'Entra con tu apodo', en: 'Join with your nickname', ca: 'Entra amb el teu sobrenom' })}</p>
          <FormUnirse codigoInicial={codigo} />
        </section>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 rounded-xl border border-amber-400/25 bg-amber-400/[0.06] px-3 py-2">
          <p className="text-white/75 text-sm">{tr({ es: 'Juegas como', en: 'You play as', ca: 'Jugues com' })} <b className="text-amber-200">{estoyAqui.apodo}</b>. {tr({ es: 'Al acabar cada partida, tu récord sube solo.', en: 'At the end of each game, your best score goes up on its own.', ca: 'En acabar cada partida, el teu rècord puja sol.' })}</p>
          <div className="flex gap-2">
            <Link to={localPath('/juegos')} className="rounded-xl bg-amber-400 text-black font-black px-3 py-1.5 text-sm">🎮 {tr({ es: 'A jugar', en: 'Play', ca: 'A jugar' })}</Link>
            <button type="button" onClick={() => { salirDelRanking(); navigate(localPath('/ranking')) }} className="text-white/35 text-xs hover:text-white/60">{tr({ es: 'Salir', en: 'Leave', ca: 'Sortir' })}</button>
          </div>
        </div>
      ))}

      {dueno && !proyectar && (
        <section className={`${tarjeta} mb-4`}>
          <p className="text-white/45 text-[11px] font-bold uppercase tracking-widest mb-2">{tr({ es: 'Solo lo ves tú', en: 'Only you see this', ca: 'Només ho veus tu' })} · {nAlumnos ?? '…'} 👤</p>
          <p className="text-white/70 text-sm mb-3">
            {modo === 'deberes'
              ? tr({ es: 'Pasa el enlace o el código: cada uno entra con su nombre o apodo y hace el examen; aquí ves su mejor nota y cuántas veces lo ha intentado.', en: 'Share the link or the code: everyone joins with their name or nickname and does the exam; here you see their best mark and how many times they tried.', ca: 'Passa l’enllaç o el codi: cadascú entra amb el seu nom o sobrenom i fa l’examen; aquí veus la seva millor nota i quants cops ho ha intentat.' })
              : modo === 'directo'
                ? tr({ es: 'Abre la pizarra y proyéctala: tus alumnos entran con el código y responden en el móvil.', en: 'Open the board and project it: your students join with the code and answer on their phones.', ca: 'Obre la pissarra i projecta-la: els teus alumnes entren amb el codi i responen al mòbil.' })
                : tr({ es: 'Pasa el enlace o el código a tus alumnos: eligen un apodo y juegan. Puedes quitar cualquier apodo con la ✕.', en: 'Give your students the link or the code: they pick a nickname and play. You can remove any nickname with the ✕.', ca: 'Passa l’enllaç o el codi als teus alumnes: trien un sobrenom i juguen. Pots treure qualsevol sobrenom amb la ✕.' })}
          </p>
          {ranking.nota && <p className="text-amber-100/80 text-sm mb-3 whitespace-pre-line">📝 {ranking.nota}</p>}
          <div className="flex flex-wrap gap-2">
            {modo === 'directo' && <Link to={localPath(`/reto/${codigo}`)} className="rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black px-3 py-2 text-sm">📺 {tr({ es: 'Abrir la pizarra', en: 'Open the board', ca: 'Obrir la pissarra' })}</Link>}
            <a className={botonGris} target="_blank" rel="noopener noreferrer" href={`https://classroom.google.com/share?url=${encodeURIComponent(enlace)}`}>🏫 Google Classroom</a>
            <button type="button" className={botonGris} onClick={copia}>{copiado ? '✅' : '🔗'} {copiado ? tr({ es: '¡Copiado!', en: 'Copied!', ca: 'Copiat!' }) : tr({ es: 'Copiar enlace', en: 'Copy link', ca: 'Copia l’enllaç' })}</button>
            <button type="button" className={botonGris} onClick={verQr}>📱 QR</button>
            {modo === 'deberes' && examRoute(ranking.examen) && <Link to={`${localPath(examRoute(ranking.examen))}?reto=${codigo}`} className={botonGris}>👁️ {tr({ es: 'Verlo como alumno', en: 'See it as a student', ca: 'Veure-ho com a alumne' })}</Link>}
            <button type="button" className={botonGris} onClick={async () => { await cerrarRanking(codigo, !ranking.cerrado) }}>
              {ranking.cerrado ? `🔓 ${tr({ es: 'Reabrir', en: 'Reopen', ca: 'Reobrir' })}` : `🔒 ${tr({ es: 'Cerrar (nadie más suma)', en: 'Close (no more scores)', ca: 'Tancar (ningú més suma)' })}`}
            </button>
            <button type="button" className={`${botonGris} text-red-300`} onClick={async () => {
              if (!window.confirm(tr({ es: '¿Borrarlo entero? No se puede deshacer.', en: 'Delete it entirely? This can’t be undone.', ca: 'Esborrar-ho sencer? No es pot desfer.' }))) return
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

      {modo === 'deberes' ? <Notas filas={entradas} dueno={dueno} quita={quita} yo={estoyAqui} tr={tr} />
        : modo === 'directo' ? <Marcador filas={marcador} dueno={dueno} quita={quita} yo={estoyAqui} tr={tr} />
          : (
            <>
              <div className="flex justify-end mb-3">
                <button type="button" onClick={() => setProyectar(p => !p)} className={botonGris}>
                  {proyectar ? `✕ ${tr({ es: 'Dejar de proyectar', en: 'Stop projecting', ca: 'Deixar de projectar' })}` : `📽️ ${tr({ es: 'Proyectar en la pizarra', en: 'Project on the board', ca: 'Projectar a la pissarra' })}`}
                </button>
              </div>
              <PorJuego entradas={entradas} proyectar={proyectar} dueno={dueno} quita={quita} yo={estoyAqui} tr={tr} lang={lang} localPath={localPath} />
            </>
          )}
    </div>
  )
}

const vacio = (tr, texto) => (
  <div className={`${tarjeta} text-center py-10`}>
    <p className="text-4xl mb-2">🎮</p>
    <p className="text-white font-bold">{tr({ es: 'Todavía nadie ha jugado', en: 'Nobody has played yet', ca: 'Encara no ha jugat ningú' })}</p>
    <p className="text-white/45 text-sm mt-1">{tr(texto)}</p>
  </div>
)

// Deberes: la mejor nota de cada uno (sobre 10) y cuántas veces lo ha hecho
function Notas({ filas, dueno, quita, yo, tr }) {
  if (!filas.length) return vacio(tr, { es: 'Cuando alguien termine el examen, su nota aparece aquí.', en: 'When someone finishes the exam, their mark shows up here.', ca: 'Quan algú acabi l’examen, la seva nota apareix aquí.' })
  const ordenadas = [...filas].sort((a, b) => b.puntos - a.puntos || a.apodo.localeCompare(b.apodo))
  const media = filas.reduce((a, f) => a + f.puntos, 0) / filas.length / 10
  return (
    <section className={tarjeta}>
      <div className="flex items-baseline justify-between mb-2">
        <p className="text-white font-black">{filas.length} {tr({ es: 'entregados', en: 'handed in', ca: 'lliurats' })}</p>
        <p className="text-white/55 text-sm">{tr({ es: 'Media', en: 'Average', ca: 'Mitjana' })}: <b className="text-white">{media.toLocaleString(undefined, { maximumFractionDigits: 1 })}</b></p>
      </div>
      <table className="w-full text-sm">
        <thead><tr className="text-white/40 text-xs text-left"><th className="py-1 font-bold">{tr({ es: 'Nombre', en: 'Name', ca: 'Nom' })}</th><th className="py-1 font-bold text-right">{tr({ es: 'Nota', en: 'Mark', ca: 'Nota' })}</th><th className="py-1 font-bold text-right">{tr({ es: 'Intentos', en: 'Attempts', ca: 'Intents' })}</th>{dueno && <th />}</tr></thead>
        <tbody>
          {ordenadas.map(f => (
            <tr key={f.id} className={`border-t border-white/[0.06] ${yo && f.pid === yo.pid ? 'bg-amber-400/15' : ''}`}>
              <td className="py-1.5 text-white font-bold">{f.apodo}</td>
              <td className={`py-1.5 text-right font-black tabular-nums ${f.puntos >= 50 ? 'text-green-300' : 'text-red-300'}`}>{(f.puntos / 10).toLocaleString(undefined, { maximumFractionDigits: 1 })}</td>
              <td className="py-1.5 text-right text-white/60 tabular-nums">{f.intentos ?? 1}</td>
              {dueno && <td className="text-right"><button type="button" onClick={() => quita(f)} className="text-white/25 hover:text-red-300 px-1">✕</button></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

// En directo: el marcador de la última partida
function Marcador({ filas, dueno, quita, yo, tr }) {
  if (!filas.length) return vacio(tr, { es: 'Cuando empiece la partida, los puntos aparecen aquí.', en: 'When the game starts, the points show up here.', ca: 'Quan comenci la partida, els punts apareixen aquí.' })
  const ordenadas = [...filas].sort((a, b) => b.puntos - a.puntos)
  const pos = posiciones(ordenadas)
  return (
    <section className={tarjeta}>
      <ol className="space-y-1">
        {ordenadas.map((f, i) => (
          <li key={f.pid} className={`flex items-center gap-2 rounded-lg px-2 py-1 text-sm ${yo && f.pid === yo.pid ? 'bg-amber-400/20 text-white font-black' : 'text-white/80'}`}>
            <span className="w-7 text-white/45 tabular-nums">{pos[i] <= 3 ? MEDALLA[pos[i] - 1] : `${pos[i]}.`}</span>
            <span className="flex-1 truncate">{f.apodo}</span>
            <span className="text-white/45 text-xs">{f.aciertos} ✓</span>
            <span className="tabular-nums font-bold">{f.puntos.toLocaleString()}</span>
            {dueno && <button type="button" onClick={() => quita(f)} className="text-white/25 hover:text-red-300 px-1">✕</button>}
          </li>
        ))}
      </ol>
    </section>
  )
}

// Ranking libre: el top de cada juego
function PorJuego({ entradas, proyectar, dueno, quita, yo, tr, lang, localPath }) {
  const grupos = porJuego(entradas)
  if (!grupos.length) return vacio(tr, { es: 'Al acabar cualquier juego, la puntuación aparece aquí.', en: 'When anyone finishes a game, the score shows up here.', ca: 'En acabar qualsevol joc, la puntuació apareix aquí.' })
  return (
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
                <li key={f.id} className={`flex items-center gap-2 rounded-lg px-2 py-1 ${proyectar ? 'text-lg' : 'text-sm'} ${yo && f.pid === yo.pid ? 'bg-amber-400/20 text-white font-black' : 'text-white/80'}`}>
                  <span className="w-7 text-white/45 tabular-nums">{pos[i] <= 3 ? MEDALLA[pos[i] - 1] : `${pos[i]}.`}</span>
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
  )
}
