import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../lib/firebase'
import { doc, getDoc, collection, getDocs, query, orderBy, limit, setDoc } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'
import { FRAMES, BANNERS, AVATARS, DEFAULT_AVATAR_EMOJI } from '../data/cosmetics'
import { listarSolicitudes, resolverSolicitud } from '../lib/solicitudesProfe'
import { getTeacherClasses } from '../lib/classes'
import { NOMBRE_IDIOMA } from '../lib/idiomaUsuario'
import MensajesAdmin from '../components/admin/MensajesAdmin'
import { listarSuscritos, aCsv } from '../lib/novedades'

const ADMIN_EMAILS = [
  'pinya1994@gmail.com',
  'consiguetualgogratis@gmail.com',
  'consiguetualgogratis@tuthor.app',
  'manel.willx@gmail.com',
]
function isAdmin(user) {
  return user && ADMIN_EMAILS.includes(user.email)
}

const GAME_LABELS = {
  'linea-temporal':    '📜 Línea del Tiempo',
  'orden-temporal':    '🔀 Orden Temporal',
  'tuthor-time':       '⚡ Tuthor Time',
  'pregunta-diaria':   '🧠 Pregunta Diaria',
  'quien-es-quien':    '🕵️ ¿Quién es quién?',
  'juego-fechas':      '📅 Juego de Fechas',
}

// Lista de correo de novedades: solo quien lo activó en su perfil. Se genera
// al pulsar, desde Firestore, y se descarga como CSV: no queda copia en
// ningún sitio más que en el ordenador de quien la descarga.
// Solicitudes de acceso a la beta de profes (src/lib/solicitudesProfe.js):
// aprobar convierte la cuenta en profe al momento; el aviso al profe va por
// correo a mano (Tuthor no envía correos), con el texto ya escrito.
// Altas de profe por revisar (src/lib/solicitudesProfe.js). Desde el 31-oct-2026
// la cuenta se abre al momento: aquí se valida después, se pide que corrijan o
// aporten datos (lo ven en su panel) o se rechaza (spam: quita el acceso).
// Cada acción deja el correo al profe escrito, para enviarlo con un clic.
// Ficha completa de un profe: lo que puso en el alta, su perfil (users/{uid})
// y sus clases. Solo lee: las rules dejan al admin leer users y classes.
const fecha = v => (v?.toDate ? v.toDate() : v?.seconds ? new Date(v.seconds * 1000) : typeof v === 'string' || typeof v === 'number' ? new Date(v) : null)
const fechaTxt = v => { const d = fecha(v); return d && !isNaN(d) ? d.toLocaleString('es-ES') : '—' }
function Dato({ k, v }) {
  return (
    <div className="flex gap-2 text-xs">
      <span className="text-white/40 shrink-0 w-36">{k}</span>
      <span className="text-white/80 break-all">{v === undefined || v === null || v === '' ? '—' : String(v)}</span>
    </div>
  )
}
function FichaProfe({ f }) {
  const [d, setD] = useState(null)
  useEffect(() => {
    Promise.all([
      getDoc(doc(db, 'users', f.id)).then(x => (x.exists() ? x.data() : {})),
      getTeacherClasses(f.id).catch(() => []),
      getDoc(doc(db, 'users', f.id, 'stats', 'global')).then(x => (x.exists() ? x.data() : null)).catch(() => null),
    ]).then(([user, clases, stats]) => setD({ user, clases, stats })).catch(e => setD({ error: e.message }))
  }, [f.id])
  if (!d) return <p className="text-white/30 text-xs mt-2">Cargando ficha…</p>
  if (d.error) return <p className="text-red-300 text-xs mt-2">No se ha podido leer: {d.error}</p>
  const tp = d.user.teacherProfile ?? {}
  const alumnos = d.clases.reduce((n, c) => n + (c.studentIds?.length ?? 0), 0)
  const bruto = JSON.stringify({ solicitud: f, usuario: d.user }, (k, v) => (v && typeof v === 'object' && 'seconds' in v && 'nanoseconds' in v ? fechaTxt(v) : v), 2)
  return (
    <div className="mt-3 rounded-lg bg-white/[0.03] border border-white/10 p-3 space-y-3">
      <div className="space-y-1">
        <p className="text-white/60 text-[11px] font-bold uppercase tracking-wider">Lo que puso en el alta</p>
        <Dato k="Nombre" v={f.nombre} />
        <Dato k="Correo" v={f.email} />
        <Dato k="Centro y localidad" v={f.centro} />
        <Dato k="Etapa" v={f.etapa} />
        <Dato k="Qué da" v={f.materias} />
        <Dato k="Mensaje" v={f.mensaje} />
        <Dato k="Estado" v={f.estado} />
        <Dato k="Nota que le pediste" v={f.nota} />
        <Dato k="Fecha del alta" v={fechaTxt(f.createdAt)} />
        <Dato k="UID" v={f.id} />
      </div>
      <div className="space-y-1">
        <p className="text-white/60 text-[11px] font-bold uppercase tracking-wider">Cuenta</p>
        <Dato k="Nombre en la cuenta" v={d.user.displayName ?? d.user.name} />
        <Dato k="Idioma" v={d.user.idioma ? (NOMBRE_IDIOMA[d.user.idioma] ?? d.user.idioma) : 'sin dato (entró antes de guardarlo)'} />
        <Dato k="Cuenta de profe" v={tp.active ? 'activa' : 'desactivada'} />
        <Dato k="Centro (perfil)" v={tp.schoolName} />
        <Dato k="Etapa (perfil)" v={tp.stage} />
        <Dato k="Profe desde" v={fechaTxt(tp.createdAt)} />
        <Dato k="Validado por" v={tp.validadoPor ? `${tp.validadoPor} (${fechaTxt(tp.validadoEn)})` : ''} />
        <Dato k="Suscripción" v={tp.subscriptionStatus} />
        <Dato k="Monedas / racha" v={d.stats ? `${d.stats.coins ?? 0} / ${d.stats.streak ?? 0}` : ''} />
      </div>
      <div className="space-y-1">
        <p className="text-white/60 text-[11px] font-bold uppercase tracking-wider">Clases ({d.clases.length}) · {alumnos} alumnos con cuenta</p>
        {d.clases.length === 0
          ? <p className="text-white/40 text-xs">Todavía no ha creado ninguna clase.</p>
          : d.clases.map(c => (
            <p key={c.id} className="text-xs text-white/75">
              <span className="font-bold">{c.name}</span> · código {c.code} · {c.studentIds?.length ?? 0} con cuenta
              {c.roster?.length ? ` · ${c.roster.length} en la lista` : ''} · creada {fechaTxt(c.createdAt)}
            </p>
          ))}
      </div>
      <details>
        <summary className="text-white/40 text-xs cursor-pointer">Todos los datos en bruto</summary>
        <pre className="mt-2 text-[10px] text-white/60 whitespace-pre-wrap break-all max-h-80 overflow-auto">{bruto}</pre>
      </details>
    </div>
  )
}

function SolicitudesProfe() {
  const [filas, setFilas] = useState(null)
  const [ocupado, setOcupado] = useState('')
  const [verTodas, setVerTodas] = useState(false)
  const [fichaDe, setFichaDe] = useState(null) // uid con la ficha abierta
  const [notaDe, setNotaDe] = useState(null) // uid con el cuadro de «Pedir datos» abierto
  const [nota, setNota] = useState('')
  // Las resueltas en esta visita siguen a la vista aunque ya no estén «por
  // revisar»: si no, al validar desaparecía la fila y con ella el botón del
  // correo, y no se sabía si el aviso al profe había salido (no sale solo).
  const [recien, setRecien] = useState([])
  // Qué pasó con el correo automático de cada una resuelta ahora
  // (api/aprobar-profe.js): 'enviado' | 'sin_configurar' | 'error' | 'no_aplica'
  const [correoDe, setCorreoDe] = useState({})
  // Con el idioma de cada uno (users/{uid}.idioma), para escribirle en su lengua
  const carga = () => listarSolicitudes()
    .then(fs => Promise.all(fs.map(f => getDoc(doc(db, 'users', f.id)).then(u => ({ ...f, idioma: u.data()?.idioma ?? '' })).catch(() => f))))
    .then(setFilas).catch(() => setFilas([]))
  useEffect(() => { carga() }, [])
  const resuelve = async (uid, accion, texto = '') => {
    setOcupado(uid)
    try { const j = await resolverSolicitud(uid, accion, texto); setCorreoDe(c => ({ ...c, [uid]: j.correo })); setRecien(r => [...r, uid]); setNotaDe(null); setNota(''); await carga() } catch (e) { alert('No se ha podido: ' + e.message) }
    setOcupado('')
  }
  const correo = (f, asunto, cuerpo) => `mailto:${f.email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`
  // Los dos correos, en el idioma en que usa Tuthor cada profe (castellano si no se sabe)
  const avisoValidada = f => {
    const panel = f.idioma === 'en' ? 'https://www.tuthor.es/en/profesor' : f.idioma === 'ca' ? 'https://www.tuthor.es/ca/profesor' : 'https://www.tuthor.es/profesor'
    if (f.idioma === 'en') return correo(f, 'Your Tuthor teacher account has been verified', `Hello ${f.nombre},

We have reviewed your sign-up and everything is in order: your Tuthor teacher account (${f.email}) is now verified. You can keep using it as before at ${panel}

Thank you for using Tuthor with your students!`)
    if (f.idioma === 'ca') return correo(f, 'El teu compte de professor a Tuthor està validat', `Hola, ${f.nombre}:

Hem revisat la teva alta i tot és correcte: el teu compte de professor a Tuthor (${f.email}) queda validat. Pots continuar fent-lo servir com fins ara a ${panel}

Gràcies per fer servir Tuthor amb els teus alumnes!`)
    return correo(f, 'Tu cuenta de profe en Tuthor está validada', `Hola, ${f.nombre}:

Hemos revisado tu alta y todo está correcto: tu cuenta de profesor en Tuthor (${f.email}) queda validada. Puedes seguir usándola como hasta ahora en ${panel}

¡Gracias por usar Tuthor con tus alumnos!`)
  }
  const avisoRectificar = f => {
    const panel = f.idioma === 'en' ? 'https://www.tuthor.es/en/profesor' : f.idioma === 'ca' ? 'https://www.tuthor.es/ca/profesor' : 'https://www.tuthor.es/profesor'
    if (f.idioma === 'en') return correo(f, 'Your Tuthor teacher account: we need one more detail', `Hello ${f.nombre},

We have reviewed your Tuthor teacher sign-up and need you to correct or add the following:

${f.nota || '…'}

You can do it from your dashboard (${panel}), in the notice at the top. In the meantime you can keep using everything as normal.

Thank you!`)
    if (f.idioma === 'ca') return correo(f, 'El teu compte de professor a Tuthor: necessitem una dada', `Hola, ${f.nombre}:

Hem revisat la teva alta com a professor a Tuthor i necessitem que corregeixis o completis això:

${f.nota || '…'}

Ho pots fer des del teu tauler (${panel}), a l’avís de dalt. Mentrestant pots continuar fent-ho servir tot amb normalitat.

Gràcies!`)
    return correo(f, 'Tu cuenta de profe en Tuthor: necesitamos un dato', `Hola, ${f.nombre}:

Hemos revisado tu alta como profesor en Tuthor y necesitamos que corrijas o completes esto:

${f.nota || '…'}

Puedes hacerlo desde tu panel (${panel}), en el aviso de arriba. Mientras tanto puedes seguir usándolo todo con normalidad.

¡Gracias!`)
  }
  const visibles = (filas ?? []).filter(f => verTodas || f.estado === 'pendiente' || recien.includes(f.id))
  const pendientes = (filas ?? []).filter(f => f.estado === 'pendiente').length
  const color = { aprobada: 'text-green-300', rechazada: 'text-red-300', rectificar: 'text-orange-300', pendiente: 'text-amber-300' }
  const nombreEstado = { aprobada: 'validada', rechazada: 'rechazada', rectificar: 'esperando datos', pendiente: 'por revisar' }
  const boton = 'px-3 py-1.5 rounded-lg text-xs font-bold disabled:opacity-50'
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between gap-2 mb-1">
        <h2 className="text-white font-bold">📚 Altas de profes {pendientes > 0 && <span className="ml-1 rounded-full bg-amber-400 text-black text-xs font-black px-2 py-0.5">{pendientes}</span>}</h2>
        <button onClick={() => setVerTodas(v => !v)} className="text-white/40 hover:text-white/70 text-xs">{verTodas ? 'Solo por revisar' : 'Ver todas'}</button>
      </div>
      <p className="text-white/40 text-xs mb-4">La cuenta ya funciona desde el alta. Aquí se valida, se piden datos (el profe ve tu nota en su panel) o se rechaza (quita el acceso: solo para spam).</p>
      {filas === null ? <p className="text-white/30 text-sm">Cargando…</p> : visibles.length === 0 ? <p className="text-white/30 text-sm">{verTodas ? 'Ninguna todavía.' : 'Nada por revisar.'}</p> : (
        <div className="space-y-2">
          {visibles.map(f => (
            <div key={f.id} className="rounded-xl bg-black/20 border border-white/[0.06] p-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-white font-bold">{f.nombre} <span className="text-white/40 font-normal text-xs">{f.email}</span>
                  {f.idioma && <span className="ml-2 text-sky-300/80 font-normal text-xs border border-sky-400/30 rounded px-1.5 py-0.5">{NOMBRE_IDIOMA[f.idioma] ?? f.idioma}</span>}</p>
                <span className={`text-xs font-bold ${color[f.estado] ?? 'text-white/50'}`}>{nombreEstado[f.estado] ?? f.estado}</span>
              </div>
              <p className="text-white/60 text-sm">{f.centro} · {f.etapa}{f.materias ? ` · ${f.materias}` : ''}</p>
              {f.mensaje && <p className="text-white/50 text-sm italic mt-1">«{f.mensaje}»</p>}
              {f.estado === 'rectificar' && f.nota && <p className="text-orange-200/80 text-xs mt-1">Le pediste: «{f.nota}»</p>}
              <p className="text-white/30 text-[11px] mt-1">{f.createdAt?.toDate?.().toLocaleString('es-ES') ?? ''}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {f.estado !== 'aprobada' && <button disabled={ocupado === f.id} onClick={() => resuelve(f.id, 'validar')} className={`${boton} bg-green-600 hover:bg-green-500 text-white`}>✅ Validar</button>}
                {f.estado !== 'rechazada' && <button disabled={ocupado === f.id} onClick={() => { setNotaDe(n => (n === f.id ? null : f.id)); setNota('') }} className={`${boton} bg-orange-500/80 hover:bg-orange-500 text-white`}>✏️ Pedir datos</button>}
                {f.estado !== 'rechazada' && <button disabled={ocupado === f.id} onClick={() => { if (confirm(`¿Rechazar a ${f.nombre}? Pierde el acceso de profe.`)) resuelve(f.id, 'rechazar') }} className={`${boton} bg-white/10 hover:bg-white/20 text-white/80`}>✕ Rechazar</button>}
                <button onClick={() => setFichaDe(x => (x === f.id ? null : f.id))} className={`${boton} bg-sky-600/80 hover:bg-sky-500 text-white`}>{fichaDe === f.id ? '▲ Ocultar ficha' : '🗂️ Ver ficha'}</button>
                {recien.includes(f.id) && f.estado !== 'pendiente' && f.estado !== 'rechazada' && (correoDe[f.id] === 'enviado'
                  ? <p className="w-full text-green-300 text-xs font-bold">✅ Guardado y correo enviado a {f.email}.</p>
                  : <p className="w-full text-amber-200 text-xs font-bold">⚠️ Guardado, pero el correo no ha salido solo{correoDe[f.id] === 'sin_configurar' ? ' (falta configurar el Gmail en Vercel)' : ''}: pulsa el botón morado y envíalo desde tu correo.</p>)}
                {!recien.includes(f.id) && f.correoEnviadoEn && f.estado !== 'rechazada' && <span className="text-green-300/70 text-xs self-center">✉️ Correo enviado el {f.correoEnviadoEn.toDate?.().toLocaleDateString('es-ES') ?? ''}</span>}
                {f.estado === 'aprobada' && <a href={avisoValidada(f)} className={`${boton} bg-violet-600 hover:bg-violet-500 text-white`}>✉️ {f.correoEnviadoEn || correoDe[f.id] === 'enviado' ? 'Escribirle otra vez' : 'Avisarle de que está validada'}</a>}
                {f.estado === 'rectificar' && <a href={avisoRectificar(f)} className={`${boton} bg-violet-600 hover:bg-violet-500 text-white`}>✉️ Escribirle lo que falta</a>}
              </div>
              {fichaDe === f.id && <FichaProfe f={f} />}
              {notaDe === f.id && (
                <form onSubmit={e => { e.preventDefault(); if (nota.trim().length >= 3) resuelve(f.id, 'rectificar', nota.trim()) }} className="mt-2 space-y-2">
                  <textarea autoFocus rows={2} maxLength={600} value={nota} onChange={e => setNota(e.target.value)}
                    placeholder="Qué tiene que corregir o aportar (lo verá en su panel)"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-orange-400" />
                  <button type="submit" disabled={ocupado === f.id || nota.trim().length < 3} className={`${boton} bg-orange-500 hover:bg-orange-400 text-white`}>Enviarle la petición</button>
                </form>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ListaNovedades() {
  const [filas, setFilas] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  async function cargar() {
    setCargando(true); setError(null)
    try { setFilas(await listarSuscritos()) } catch (e) { setError(e.message) }
    setCargando(false)
  }

  function descargar() {
    const blob = new Blob([aCsv(filas)], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `tuthor-novedades-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  // Por idioma: así cada correo de novedades va en la lengua de quien lo recibe
  const idiomaDe = f => f.idioma || 'es'
  function copiar(idioma) {
    navigator.clipboard?.writeText(filas.filter(f => !idioma || idiomaDe(f) === idioma).map(f => f.email).join(', '))
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <h2 className="text-white font-bold mb-1">📬 Lista de novedades</h2>
      <p className="text-white/40 text-xs mb-4">
        Usuarios que han aceptado recibir correos en su perfil. Usa CCO (copia oculta) al enviar, y respeta las bajas: quien desactiva el interruptor desaparece de aquí.
      </p>
      {filas === null ? (
        <button onClick={cargar} disabled={cargando}
          className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold disabled:opacity-50">
          {cargando ? 'Cargando…' : 'Cargar lista'}
        </button>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-white font-bold text-sm mr-2">{filas.length} suscritos</span>
          <button onClick={descargar} disabled={!filas.length}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold disabled:opacity-40">Descargar CSV</button>
          <button onClick={() => copiar()} disabled={!filas.length}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold disabled:opacity-40">Copiar todos</button>
          {Object.entries(NOMBRE_IDIOMA).map(([k, n]) => {
            const cuantos = filas.filter(f => idiomaDe(f) === k).length
            return cuantos > 0 && (
              <button key={k} onClick={() => copiar(k)}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold">Copiar en {n} ({cuantos})</button>
            )
          })}
        </div>
      )}
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  )
}

function StatCard({ label, value, sub }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <p className="text-white/40 text-xs uppercase tracking-widest mb-1">{label}</p>
      <p className="text-3xl font-black text-white">{value}</p>
      {sub && <p className="text-white/30 text-xs mt-1">{sub}</p>}
    </div>
  )
}

function MiniBar({ label, value, max }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div className="flex items-center gap-3">
      <p className="text-white/60 text-sm w-44 truncate shrink-0">{label}</p>
      <div className="flex-1 bg-white/5 rounded-full h-2">
        <div
          className="h-2 rounded-full bg-violet-500 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-white font-bold text-sm w-10 text-right shrink-0">{value}</p>
    </div>
  )
}

function DevTools({ uid }) {
  const [status, setStatus] = useState('')

  async function giveAllCosmetics() {
    setStatus('⏳ Aplicando…')
    try {
      await setDoc(doc(db, 'users', uid, 'stats', 'global'), {
        ownedFrames:    FRAMES.map(f => f.id),
        equippedFrame:  'default',
        ownedBanners:   BANNERS.map(b => b.id),
        equippedBanner: 'banner_default',
        ownedAvatars:   AVATARS.map(a => a.id),
        equippedAvatar: DEFAULT_AVATAR_EMOJI,
        coins: 999999,
      }, { merge: true })
      setStatus('✅ ¡Todos los cosméticos asignados! Recarga la Tienda.')
    } catch (e) {
      setStatus(`❌ Error: ${e.message}`)
    }
  }

  return (
    <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5">
      <h2 className="text-amber-300 font-bold mb-3">🛠 Dev Tools</h2>
      <div className="flex items-center gap-4 flex-wrap">
        <button
          onClick={giveAllCosmetics}
          className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm px-4 py-2 rounded-xl transition-colors"
        >
          🎁 Darme todos los cosméticos
        </button>
        {status && <p className="text-amber-200 text-sm">{status}</p>}
      </div>
    </div>
  )
}

export default function Admin() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [globalStats, setGlobalStats]   = useState(null)
  const [users, setUsers]               = useState([])
  const [messages, setMessages]         = useState([])
  const [colabs, setColabs]             = useState([])
  const [bugs, setBugs]                 = useState([])
  const [loadingData, setLoadingData]   = useState(true)

  useEffect(() => {
    if (user === undefined) return
    if (!isAdmin(user)) { navigate('/', { replace: true }); return }
    loadAll()
  }, [user])

  async function loadAll() {
    setLoadingData(true)
    try {
      const [statsSnap, usersSnap, msgsSnap, colabsSnap, bugsSnap] = await Promise.all([
        getDoc(doc(db, '_stats', 'global')),
        getDocs(query(collection(db, 'users'), orderBy('lastLogin', 'desc'), limit(50))),
        getDocs(query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'), limit(50))),
        getDocs(query(collection(db, 'colabMessages'), orderBy('createdAt', 'desc'), limit(50))),
        getDocs(query(collection(db, 'bugReports'), orderBy('createdAt', 'desc'), limit(50))),
      ])
      setGlobalStats(statsSnap.exists() ? statsSnap.data() : null)
      setUsers(usersSnap.docs.map(d => ({ id: d.id, ...d.data() })))
      setMessages(msgsSnap.docs.map(d => ({ id: d.id, ...d.data() })))
      setColabs(colabsSnap.docs.map(d => ({ id: d.id, ...d.data() })))
      setBugs(bugsSnap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch (e) {
      console.error('Admin load error:', e)
    }
    setLoadingData(false)
  }

  if (user === undefined || loadingData) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <p className="text-white/30 text-sm">Cargando dashboard…</p>
      </div>
    )
  }

  if (!isAdmin(user)) return null

  // Stats procesadas
  const playsByGame = globalStats?.playsByGame ?? {}
  const maxPlays = Math.max(...Object.values(playsByGame), 1)
  const gamesSorted = Object.entries(playsByGame).sort((a, b) => b[1] - a[1])

  const dailySessions = globalStats?.dailySessions ?? {}
  const last7days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(Date.now() - i * 86400000)
    const key = d.toISOString().slice(0, 10)
    return { key, label: d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' }), count: dailySessions[key] ?? 0 }
  }).reverse()
  const maxDay = Math.max(...last7days.map(d => d.count), 1)

  const totalSessions = globalStats?.totalSessions ?? 0
  const totalUsers    = globalStats?.totalUsers ?? 0

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <div className="max-w-4xl mx-auto w-full space-y-6">

        {/* Cabecera */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white">🛠️ Admin Dashboard</h1>
            <p className="text-white/30 text-xs mt-0.5">Solo visible para {user.email}</p>
          </div>
          <button
            onClick={loadAll}
            className="text-white/40 hover:text-white/70 text-sm border border-white/10 px-3 py-1.5 rounded-lg transition-colors"
          >
            ↻ Actualizar
          </button>
        </div>

        <SolicitudesProfe />

        <ListaNovedades />

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Usuarios registrados" value={totalUsers.toLocaleString()} />
          <StatCard label="Sesiones totales" value={totalSessions.toLocaleString()} />
          <StatCard label="Usuarios recientes" value={users.length} sub="últimos 50 por login" />
          <StatCard label="Juegos distintos" value={Object.keys(playsByGame).length} />
        </div>

        {/* Actividad últimos 7 días */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h2 className="text-white font-bold mb-4">Sesiones — últimos 7 días</h2>
          <div className="flex items-end gap-2 h-24">
            {last7days.map(d => (
              <div key={d.key} className="flex-1 flex flex-col items-center gap-1">
                <p className="text-white/50 text-[10px]">{d.count || ''}</p>
                <div
                  className="w-full rounded-t bg-violet-500/70 transition-all"
                  style={{ height: `${Math.max(4, (d.count / maxDay) * 72)}px` }}
                />
                <p className="text-white/30 text-[9px] text-center leading-tight">{d.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Juegos más jugados */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h2 className="text-white font-bold mb-4">Juegos más jugados</h2>
          {gamesSorted.length === 0 ? (
            <p className="text-white/30 text-sm">Sin datos todavía</p>
          ) : (
            <div className="space-y-3">
              {gamesSorted.map(([game, count]) => (
                <MiniBar
                  key={game}
                  label={GAME_LABELS[game] ?? game}
                  value={count}
                  max={maxPlays}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mensajes de contacto */}
        <MensajesAdmin title="💬 Mensajes de contacto" col="contactMessages" messages={messages} setMessages={setMessages} />

        {/* Bugs */}
        <MensajesAdmin title="🐛 Bugs reportados" col="bugReports" messages={bugs} setMessages={setBugs} showPage />

        {/* Colaboraciones */}
        <MensajesAdmin title="📣 Colaboraciones y anuncios" col="colabMessages" messages={colabs} setMessages={setColabs} showCompany />

        {/* Dev Tools */}
        <DevTools uid={user.uid} />

        {/* Lista de usuarios */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h2 className="text-white font-bold mb-4">Usuarios recientes ({users.length})</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white/30 text-xs uppercase tracking-wide border-b border-white/10">
                  <th className="text-left pb-2 font-medium">Nombre</th>
                  <th className="text-left pb-2 font-medium">Email</th>
                  <th className="text-left pb-2 font-medium">Último acceso</th>
                  <th className="text-left pb-2 font-medium">Registro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map(u => (
                  <tr key={u.id} className="text-white/70">
                    <td className="py-2.5 pr-4 font-medium text-white">{u.name ?? '—'}</td>
                    <td className="py-2.5 pr-4 text-white/50">{u.email ?? '—'}</td>
                    <td className="py-2.5 pr-4 text-white/40 text-xs">
                      {u.lastLogin?.toDate
                        ? u.lastLogin.toDate().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                        : '—'}
                    </td>
                    <td className="py-2.5 text-white/40 text-xs">
                      {u.createdAt?.toDate
                        ? u.createdAt.toDate().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
