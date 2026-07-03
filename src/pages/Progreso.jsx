import { useEffect } from 'react'

export default function Progreso() {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => document.head.removeChild(meta)
  }, [])

  return (
    <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-6">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-3xl font-black text-white mb-2">Próximamente</h2>
        <p className="text-white/40 mb-8 text-sm">Muy pronto podrás registrarte, guardar tu progreso y competir en el ranking global.</p>
        <div className="bg-white/5 rounded-2xl border-2 border-dashed border-white/10 p-6 blur-sm pointer-events-none select-none">
          <input disabled placeholder="tu@email.com" className="w-full border border-white/10 rounded-xl px-4 py-3 text-sm mb-3 bg-white/5 text-white" />
          <button disabled className="w-full bg-violet-600 text-white font-bold py-3 rounded-xl opacity-50">Crear cuenta gratis</button>
        </div>
        <p className="text-white/30 text-xs mt-4">Estamos trabajando en ello ⚡</p>
      </div>
    </div>
  )
}
