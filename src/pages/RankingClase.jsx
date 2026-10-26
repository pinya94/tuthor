// Un reto de clase visto desde fuera de la partida. Dos caras separadas:
//   /reto/:codigo/clase      (alumno) el ranking libre de su clase: entrar con
//                            su apodo y ver el top de cada juego (los deberes
//                            y el directo se juegan en su examen, ver RetoEntrada)
//   /profesor/reto/:codigo   (profe) gestionarlo: compartir, abrir la pizarra,
//                            ver notas o marcador, quitar apodos, cerrar, borrar
// /ranking y /ranking/:codigo son enlaces antiguos y redirigen.
// Lógica en src/lib/rankingClase.js; lo que escribe el alumno, en
// api/ranking-clase.js; la partida y los deberes, en components/reto.
import { useCallback, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import { FormUnirse } from '../components/RankingClaseFin'
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

export default function RankingClase({ profe = false }) {
  const { codigo } = useParams()
  const { localPath } = useLang()
  const c = normalizaCodigo(codigo)
  return codigo ? <UnRanking codigo={c} profe={profe} /> : <Navigate to={localPath('/reto')} replace />
}

// Enlaces antiguos /ranking/:codigo → la puerta del reto (que lleva a su sitio)
export function RedirigeRanking() {
  const { codigo } = useParams()
  const { localPath } = useLang()
  return <Navigate to={localPath(codigo ? `/reto/${normalizaCodigo(codigo)}` : '/reto')} replace />
}

// ── /ranking/:codigo ────────────────────────────────────────────────────────
function UnRanking({ codigo, profe }) {
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
  // Las herramientas del profe, solo en su zona (/profesor/reto/…)
  const gestiona = profe && dueno
  const modo = ranking?.modo ?? 'ranking'
  const esReto = modo !== 'ranking'
  // Se comparte siempre /reto/CODIGO: lleva a cada uno a su sitio
  const enlace = `${ORIGEN}${lang === 'es' ? '' : `/${lang}`}/reto/${codigo}`

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
    if (!gestiona) return
    contar()
    const t = setInterval(contar, 20000)
    return () => clearInterval(t)
  }, [gestiona, contar])

  if (ranking === undefined && codigoValido(codigo)) return <div className="min-h-[60vh] grid place-items-center text-white/30 text-sm">…</div>
  if (!ranking) {
    return (
      <div className="relative z-10 max-w-md mx-auto px-4 py-12 text-center">
        <SEOHead path={`/reto/${codigo}`} noindex title="Tuthor" description="" />
        <p className="text-5xl mb-3">🔍</p>
        <p className="text-white font-black text-lg mb-2">{tr({ es: 'No hay ningún reto con ese código', en: 'There’s no challenge with that code', ca: 'No hi ha cap repte amb aquest codi' })}</p>
        <Link to={localPath('/reto')} className="text-amber-200 text-sm font-bold">{tr({ es: '← Probar con otro código', en: '← Try another code', ca: '← Provar amb un altre codi' })}</Link>
      </div>
    )
  }

  if (profe && !dueno) {
    return (
      <div className="relative z-10 max-w-md mx-auto px-4 py-12 text-center">
        <SEOHead path={`/profesor/reto/${codigo}`} noindex title="Tuthor" description="" />
        <p className="text-5xl mb-3">🔒</p>
        <p className="text-white font-black text-lg mb-2">{user ? tr({ es: 'Este reto lo gestiona otro profe', en: 'Another teacher manages this challenge', ca: 'Aquest repte el gestiona un altre profe' }) : tr({ es: 'Entra con tu cuenta de profe para gestionarlo', en: 'Log in with your teacher account to manage it', ca: 'Entra amb el teu compte de profe per gestionar-lo' })}</p>
        <Link to={localPath(`/reto/${codigo}`)} className="text-amber-200 text-sm font-bold">{tr({ es: 'Ir al reto como alumno →', en: 'Go to the challenge as a student →', ca: 'Anar al repte com a alumne →' })}</Link>
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
      <SEOHead path={`/reto/${codigo}`} noindex title={`${ranking.nombre} — ${tr(MODO[modo].label)}`} description="" />
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
      {!profe && dueno && (
        <Link to={localPath(`/profesor/reto/${codigo}`)} className="block mb-4 rounded-xl border border-teal-400/30 bg-teal-500/10 text-teal-200 font-bold text-center py-2.5 text-sm">
          {tr({ es: 'Eres el profe de este reto: gestionarlo →', en: 'You’re this challenge’s teacher: manage it →', ca: 'Ets el profe d’aquest repte: gestionar-lo →' })}
        </Link>
      )}
      {!profe && !proyectar && !dueno && !ranking.cerrado && (esReto ? (
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
            <button type="button" onClick={() => { salirDelRanking(); navigate(localPath('/reto')) }} className="text-white/35 text-xs hover:text-white/60">{tr({ es: 'Salir', en: 'Leave', ca: 'Sortir' })}</button>
          </div>
        </div>
      ))}

      {gestiona && !proyectar && (
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
              navigate(localPath('/profesor?tab=retos'))
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

      {modo === 'deberes' ? <Notas filas={entradas} dueno={gestiona} quita={quita} yo={estoyAqui} tr={tr} />
        : modo === 'directo' ? <Marcador filas={marcador} dueno={gestiona} quita={quita} yo={estoyAqui} tr={tr} />
          : (
            <>
              <div className="flex justify-end mb-3">
                <button type="button" onClick={() => setProyectar(p => !p)} className={botonGris}>
                  {proyectar ? `✕ ${tr({ es: 'Dejar de proyectar', en: 'Stop projecting', ca: 'Deixar de projectar' })}` : `📽️ ${tr({ es: 'Proyectar en la pizarra', en: 'Project on the board', ca: 'Projectar a la pissarra' })}`}
                </button>
              </div>
              <PorJuego entradas={entradas} proyectar={proyectar} dueno={gestiona} quita={quita} yo={estoyAqui} tr={tr} lang={lang} localPath={localPath} />
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
