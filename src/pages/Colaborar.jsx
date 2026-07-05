import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import PageMeta from '../components/PageMeta'

export default function Colaborar() {
  const { lang, localPath } = useLang()
  const navigate = useNavigate()
  const en = lang === 'en'
  const ca = lang === 'ca'

  const metaTitle = ca ? 'Col·laborar o anunciar-se' : en ? 'Collaborate or advertise' : 'Colaborar o anunciarse'
  const metaDesc  = ca
    ? 'Acadèmia, editorial o projecte educatiu? Explica\'ns com podem treballar junts a Tuthor.'
    : en
    ? 'School, publisher or ed-tech project? Tell us how we can work together at Tuthor.'
    : '¿Academia, editorial o proyecto educativo? Cuéntanos cómo podemos trabajar juntos en Tuthor.'

  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [company, setCompany] = useState('')
  const [msg, setMsg]         = useState('')
  const [status, setStatus]   = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const { db } = await import('../lib/firebase')
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore')
      await addDoc(collection(db, 'colabMessages'), {
        name, email, company, message: msg, createdAt: serverTimestamp(), read: false,
      })
      setStatus('ok')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="relative z-10 min-h-[calc(100vh-4rem)] flex items-start justify-center px-4 py-12">
      <PageMeta title={metaTitle} description={metaDesc} path="/colaborar" lang={lang} />
      <div className="w-full max-w-md">
        <Link to={localPath('/')} className="inline-flex items-center gap-1 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors">
          ← {ca ? 'Tornar' : en ? 'Back' : 'Volver'}
        </Link>

        <h1 className="text-3xl font-black text-white mb-2">
          {ca ? 'Col·laborar o anunciar-se' : en ? 'Collaborate or advertise' : 'Colaborar o anunciarse'}
        </h1>
        <p className="text-white/50 text-sm mb-8">
          {ca ? 'Acadèmia, editorial o projecte educatiu? Explica\'ns com podem treballar junts.'
            : en ? "School, publisher or ed-tech project? Tell us how we can work together."
            : '¿Academia, editorial o proyecto educativo? Cuéntanos cómo podemos trabajar juntos.'}
        </p>

        {status === 'ok' ? (
          <div className="flex flex-col items-center gap-4 py-12 text-center bg-white/5 border border-white/10 rounded-2xl">
            <span className="text-5xl">✅</span>
            <p className="font-black text-white text-xl">
              {ca ? 'Missatge enviat!' : en ? 'Message sent!' : '¡Mensaje enviado!'}
            </p>
            <p className="text-white/50 text-sm">
              {ca ? 'Et respondrem aviat.' : en ? "We'll reply soon." : 'Te respondemos pronto.'}
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
            <input type="text" value={company} onChange={e => setCompany(e.target.value)}
              placeholder={ca ? 'Empresa / Projecte (opcional)' : en ? 'Company / Project (optional)' : 'Empresa / Proyecto (opcional)'}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-teal-500 transition-colors" />
            <textarea required value={msg} onChange={e => setMsg(e.target.value)} rows={5}
              placeholder={ca ? 'Com podem col·laborar?' : en ? 'How can we collaborate?' : '¿Cómo podemos colaborar?'}
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
