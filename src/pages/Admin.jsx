import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../lib/firebase'
import { doc, getDoc, collection, getDocs, query, orderBy, limit, updateDoc } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'
import { formatTime } from '../lib/activity'

const ADMIN_EMAILS = [
  'pinya1994@gmail.com',
  'consiguetualgogratis@gmail.com',
  'consiguetualgogratis@tuthor.app',
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

function MessagesSection({ title, messages, onMarkRead, showCompany = false }) {
  const unread = messages.filter(m => !m.read).length
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-bold">
          {title}
          {unread > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-violet-500 text-white text-xs font-bold rounded-full">{unread} nuevo{unread !== 1 ? 's' : ''}</span>
          )}
        </h2>
        <p className="text-white/30 text-xs">{messages.length} total</p>
      </div>
      {messages.length === 0 ? (
        <p className="text-white/30 text-sm">Sin mensajes todavía</p>
      ) : (
        <div className="space-y-3">
          {messages.map(m => (
            <div key={m.id} className={`rounded-xl p-4 border transition-all ${m.read ? 'bg-white/3 border-white/5' : 'bg-violet-500/10 border-violet-500/30'}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {!m.read && <span className="w-2 h-2 rounded-full bg-violet-400 shrink-0" />}
                    <p className="text-white font-semibold text-sm">{m.name || '—'}</p>
                    <p className="text-white/40 text-xs">{m.email || ''}</p>
                    {showCompany && m.company && (
                      <span className="text-teal-400/70 text-xs border border-teal-500/20 px-1.5 py-0.5 rounded">{m.company}</span>
                    )}
                  </div>
                  <p className="text-white/70 text-sm whitespace-pre-wrap break-words">{m.message}</p>
                  {m.createdAt?.toDate && (
                    <p className="text-white/25 text-xs mt-2">
                      {m.createdAt.toDate().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>
                {!m.read && (
                  <button onClick={() => onMarkRead(m.id)}
                    className="shrink-0 text-xs text-violet-400 hover:text-violet-300 border border-violet-500/30 hover:border-violet-400/50 px-2 py-1 rounded-lg transition-colors">
                    ✓ Leído
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
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
  const [loadingData, setLoadingData]   = useState(true)

  useEffect(() => {
    if (user === undefined) return
    if (!isAdmin(user)) { navigate('/', { replace: true }); return }
    loadAll()
  }, [user])

  async function loadAll() {
    setLoadingData(true)
    try {
      const [statsSnap, usersSnap, msgsSnap, colabsSnap] = await Promise.all([
        getDoc(doc(db, '_stats', 'global')),
        getDocs(query(collection(db, 'users'), orderBy('lastLogin', 'desc'), limit(50))),
        getDocs(query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'), limit(50))),
        getDocs(query(collection(db, 'colabMessages'), orderBy('createdAt', 'desc'), limit(50))),
      ])
      setGlobalStats(statsSnap.exists() ? statsSnap.data() : null)
      setUsers(usersSnap.docs.map(d => ({ id: d.id, ...d.data() })))
      setMessages(msgsSnap.docs.map(d => ({ id: d.id, ...d.data() })))
      setColabs(colabsSnap.docs.map(d => ({ id: d.id, ...d.data() })))
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
        <MessagesSection title="💬 Mensajes de contacto" messages={messages} onMarkRead={async (id) => {
          await updateDoc(doc(db, 'contactMessages', id), { read: true })
          setMessages(ms => ms.map(m => m.id === id ? { ...m, read: true } : m))
        }} />

        {/* Colaboraciones */}
        <MessagesSection title="📣 Colaboraciones y anuncios" messages={colabs} showCompany onMarkRead={async (id) => {
          await updateDoc(doc(db, 'colabMessages', id), { read: true })
          setColabs(cs => cs.map(c => c.id === id ? { ...c, read: true } : c))
        }} />

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
