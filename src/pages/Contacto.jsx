import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'

export default function Contacto() {
  const { lang, localPath } = useLang()
  const navigate = useNavigate()
  const en = lang === 'en'
  const ca = lang === 'ca'

  const [name, setName]     = useState('')
  const [email, setEmail]   = useState('')
  const [msg, setMsg]       = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const { db } = await import('../lib/firebase')
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore')
      await addDoc(collection(db, 'contactMessages'), {
        name, email, message: msg, createdAt: serverTimestamp(), read: false,
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
          {ca ? 'Contacte' : en ? 'Contact' : 'Contacto'}
        </h1>
        <p className="text-white/50 text-sm mb-8">
          {ca ? 'Escriu-nos per qualsevol dubte o suggeriment.'
            : en ? 'Write to us for any question or suggestion.'
            : 'Escríbenos para cualquier duda o sugerencia.'}
        </p>

        {status === 'ok' ? (
          <div className="flex flex-col items-center gap-4 py-12 text-center bg-white/5 border border-white/10 rounded-2xl">
            <span className="text-5xl">✅</span>
            <p className="font-black text-white text-xl">
              {ca ? 'Missatge enviat!' : en ? 'Message sent!' : '¡Mensaje enviado!'}
            </p>
            <p className="text-white/50 text-sm">
              {ca ? 'Respondrem aviat.' : en ? "We'll reply soon." : 'Responderemos pronto.'}
            </p>
            <button onClick={() => navigate(localPath('/'))}
              className="mt-2 px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-xl transition-colors">
              {ca ? 'Tornar a l\'inici' : en ? 'Back to home' : 'Volver al inicio'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" required value={name} onChange={e => setName(e.target.value)}
              placeholder={ca ? 'Nom' : en ? 'Name' : 'Nombre'}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-teal-500 transition-colors" />
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder={ca ? 'Correu electrònic' : en ? 'Email' : 'Correo electrónico'}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-teal-500 transition-colors" />
            <textarea required value={msg} onChange={e => setMsg(e.target.value)} rows={5}
              placeholder={ca ? 'El teu missatge...' : en ? 'Your message...' : 'Tu mensaje...'}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-teal-500 transition-colors resize-none" />
            {status === 'error' && (
              <p className="text-red-400 text-sm">
                {ca ? 'Error en enviar. Prova de nou.' : en ? 'Error sending. Please try again.' : 'Error al enviar. Inténtalo de nuevo.'}
              </p>
            )}
            <button type="submit" disabled={status === 'sending'}
              className="w-full px-6 py-3.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99]">
              {status === 'sending'
                ? (ca ? 'Enviant...' : en ? 'Sending...' : 'Enviando...')
                : (ca ? 'Enviar missatge' : en ? 'Send message' : 'Enviar mensaje')}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
