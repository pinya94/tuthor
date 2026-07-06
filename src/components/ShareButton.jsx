import { useState } from 'react'

export default function ShareButton({ text, lang, className }) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    if (navigator.share) {
      try { await navigator.share({ text }) } catch { /* cancelled */ }
      return
    }
    try { await navigator.clipboard.writeText(text) } catch { return }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const label = copied
    ? (lang === 'en' ? '✓ Copied!' : lang === 'ca' ? '✓ Copiat!' : '✓ ¡Copiado!')
    : (lang === 'en' ? '🔗 Share result' : lang === 'ca' ? '🔗 Compartir resultat' : '🔗 Compartir resultado')

  return (
    <button
      onClick={handleShare}
      className={className ?? 'w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 rounded-xl transition'}
    >
      {label}
    </button>
  )
}
