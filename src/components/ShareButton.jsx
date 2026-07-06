import { useState } from 'react'

export default function ShareButton({ text, lang }) {
  const [value, setValue] = useState(text)
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try { await navigator.clipboard.writeText(value) } catch { return }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyLabel = copied
    ? (lang === 'en' ? '✓ Copied!' : lang === 'ca' ? '✓ Copiat!' : '✓ ¡Copiado!')
    : (lang === 'en' ? 'Copy' : lang === 'ca' ? 'Copiar' : 'Copiar')

  const shareLabel = lang === 'en' ? '🔗 Share' : lang === 'ca' ? '🔗 Compartir' : '🔗 Compartir'

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-xl p-3 space-y-2">
      <p className="text-white/30 text-xs uppercase tracking-widest">{shareLabel}</p>
      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        rows={3}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-sm resize-none focus:outline-none focus:border-violet-500/50"
      />
      <button
        onClick={handleCopy}
        className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 rounded-lg text-sm transition-colors"
      >
        {copyLabel}
      </button>
    </div>
  )
}
