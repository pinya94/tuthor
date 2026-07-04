import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'

export default function ReportarBug() {
  const { lang, localPath } = useLang()
  const navigate = useNavigate()
  const en = lang === 'en'
  const ca = lang === 'ca'

  const [name, setName]     = useState('')
  const [email, setEmail]   = useState('')
  const [page, setPage]     = useState('')
  const [msg, setMsg]       = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const { db } = await import('../lib/firebase')
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore')
      await addDoc(collection(db, 'bugReports'), {
        name, email, page, message: msg, createdAt: serverTimestamp(), read: false,
      })
      setStatus('ok')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="relative z-10 min-h-[calc(100vh-4rem)] flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link to={localPath('/')} className="inline-flex items-center gap-1 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors">
          ← {ca ? 'Tornar' : en ? 'Back' : 'Volver'}
        </Link>

        <h1 className="text-3xl font-black text-white mb-2">
          {ca ? 'Reportar un error' : en ? 'Report a bug' : 'Reportar un bug'}
        </h1>
        <p className="text-white/50 text-sm mb-8">
          {ca ? "Alguna cosa no funciona? Explica'ns-ho i ho arreglem."
            : en ? "Something not working? Let us know and we'll fix it."
            : 'Algo no funciona bien? Cuéntanoslo y lo arreglamos.'}
        </p>

        {status === 'ok' ? (
          <div className="flex flex-col items-center gap-4 py-12 text-center bg-white/5 border border-white/10 rounded-2xl">
            <span className="text-5xl">✅</span>
            <p className="font-black text-white text-xl">
              {ca ? 'Report enviat!' : en ? 'Report sent!' : '¡Reporte enviado!'}
            </p>
            <p className="text-white/50 text-sm">
              {ca ? 'Gràcies, ho revisarem aviat.' : en ? "Thanks, we'll look into it." : 'Gracias, lo revisaremos pronto.'}
            </p>
            <button onClick={() => navigate(localPath('/'))}
              className="mt-2 px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm rounded-xl transition-colors">
              {ca ? 'Tornar a l\'inici' : en ? 'Back to home' : 'Volver al inicio'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder={ca ? 'Nom (opcional)' : en ? 'Name (optional)' : 'Nombre (opcional)'}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-violet-500 transition-colors" />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder={ca ? 'Correu (opcional)' : en ? 'Email (optional)' : 'Correo (opcional)'}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-violet-500 transition-colors" />
            <input type="text" value={page} onChange={e => setPage(e.target.value)}
              placeholder={ca ? 'On has vist l\'error? (opcional)' : en ? 'Where did you see the bug? (optional)' : '¿Dónde has visto el error? (opcional)'}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-violet-500 transition-colors" />
            <textarea required value={msg} onChange={e => setMsg(e.target.value)} rows={5}
              placeholder={ca ? 'Descriu el problema...' : en ? 'Describe the problem...' : 'Describe el problema...'}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-violet-500 transition-colors resize-none" />
            {status === 'error' && (
              <p className="text-red-400 text-sm">
                {ca ? 'Error en enviar. Prova de nou.' : en ? 'Error sending. Please try again.' : 'Error al enviar. Inténtalo de nuevo.'}
              </p>
            )}
            <button type="submit" disabled={status === 'sending'}
              className="w-full px-6 py-3.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99]">
              {status === 'sending'
                ? (ca ? 'Enviant...' : en ? 'Sending...' : 'Enviando...')
                : (ca ? 'Enviar report' : en ? 'Send report' : 'Enviar reporte')}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
