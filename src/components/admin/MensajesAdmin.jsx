// Mensajes de un formulario público en /admin (contacto, bugs, colaboraciones).
// Las rules dejan al admin leerlos, cambiarlos y borrarlos. Archivar los quita
// de la bandeja sin perderlos («Ver archivados» los enseña); borrar es para
// siempre.
import { useState } from 'react'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { NOMBRE_IDIOMA } from '../../lib/idiomaUsuario'

export default function MensajesAdmin({ title, col, messages, setMessages, showCompany = false, showPage = false }) {
  const [verArchivados, setVerArchivados] = useState(false)
  const [error, setError] = useState(null)
  const cambia = async (id, patch) => {
    try {
      await updateDoc(doc(db, col, id), patch)
      setMessages(ms => ms.map(m => (m.id === id ? { ...m, ...patch } : m)))
    } catch (e) { setError(e.message) }
  }
  const borra = async m => {
    if (!confirm(`¿Borrar para siempre el mensaje de ${m.name || m.email || 'esta persona'}? No se puede deshacer.`)) return
    try {
      await deleteDoc(doc(db, col, m.id))
      setMessages(ms => ms.filter(x => x.id !== m.id))
    } catch (e) { setError(e.message) }
  }
  const activos = messages.filter(m => !m.archived)
  const visibles = verArchivados ? messages.filter(m => m.archived) : activos
  const unread = activos.filter(m => !m.read).length
  const archivados = messages.length - activos.length
  const btn = 'shrink-0 text-xs px-2 py-1 rounded-lg border transition-colors'

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between gap-2 mb-4">
        <h2 className="text-white font-bold">
          {title}
          {unread > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-violet-500 text-white text-xs font-bold rounded-full">{unread} nuevo{unread !== 1 ? 's' : ''}</span>
          )}
        </h2>
        <button onClick={() => setVerArchivados(v => !v)} className="text-white/40 hover:text-white/70 text-xs">
          {verArchivados ? '← Volver a la bandeja' : `Ver archivados (${archivados})`}
        </button>
      </div>
      {error && <p className="text-red-400 text-xs mb-2">No se ha podido: {error}</p>}
      {visibles.length === 0 ? (
        <p className="text-white/30 text-sm">{verArchivados ? 'No hay nada archivado' : 'Sin mensajes'}</p>
      ) : (
        <div className="space-y-3">
          {visibles.map(m => (
            <div key={m.id} className={`rounded-xl p-4 border transition-all ${m.read ? 'bg-white/3 border-white/5' : 'bg-violet-500/10 border-violet-500/30'}`}>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                {!m.read && <span className="w-2 h-2 rounded-full bg-violet-400 shrink-0" />}
                <p className="text-white font-semibold text-sm">{m.name || '—'}</p>
                {m.email && <a href={`mailto:${m.email}`} className="text-white/40 hover:text-white/70 text-xs underline">{m.email}</a>}
                {m.idioma && <span className="text-sky-300/80 text-xs border border-sky-400/30 px-1.5 py-0.5 rounded">{NOMBRE_IDIOMA[m.idioma] ?? m.idioma}</span>}
                {showCompany && m.company && (
                  <span className="text-teal-400/70 text-xs border border-teal-500/20 px-1.5 py-0.5 rounded">{m.company}</span>
                )}
                {showPage && m.page && (
                  <span className="text-violet-400/70 text-xs border border-violet-500/20 px-1.5 py-0.5 rounded">📍 {m.page}</span>
                )}
              </div>
              <p className="text-white/70 text-sm whitespace-pre-wrap break-words">{m.message}</p>
              {m.createdAt?.toDate && (
                <p className="text-white/25 text-xs mt-2">
                  {m.createdAt.toDate().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              )}
              <div className="flex flex-wrap gap-2 mt-3">
                <button onClick={() => cambia(m.id, { read: !m.read })}
                  className={`${btn} text-violet-300 border-violet-500/30 hover:border-violet-400/60`}>
                  {m.read ? '● Marcar como no leído' : '✓ Marcar como leído'}
                </button>
                <button onClick={() => cambia(m.id, m.archived ? { archived: false } : { archived: true, read: true })}
                  className={`${btn} text-white/70 border-white/15 hover:border-white/40`}>
                  {m.archived ? '↩ Desarchivar' : '🗄️ Archivar'}
                </button>
                <button onClick={() => borra(m)}
                  className={`${btn} text-red-300 border-red-500/30 hover:border-red-400/60`}>
                  🗑️ Borrar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
