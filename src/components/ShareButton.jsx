import { useState } from 'react'

export default function ShareButton({ text, lang }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(text)
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try { await navigator.clipboard.writeText(value) } catch { return }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const btnLabel = lang === 'en' ? '🔗 Share result' : lang === 'ca' ? '🔗 Compartir resultat' : '🔗 Compartir resultado'
  const copyLabel = copied
    ? (lang === 'en' ? '✓ Copied!' : lang === 'ca' ? '✓ Copiat!' : '✓ ¡Copiado!')
    : (lang === 'en' ? 'Copy' : 'Copiar')

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full bg-white/8 hover:bg-white/15 border border-white/15 text-white/70 hover:text-white font-semibold py-3 rounded-xl transition-all text-sm"
      >
        {btnLabel}
      </button>
      {open && (
        <div className="mt-2 space-y-2">
          <textarea
            value={value}
            onChange={e => setValue(e.target.value)}
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-sm resize-none focus:outline-none focus:border-violet-500/50"
          />
          <button
            onClick={handleCopy}
            className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-2.5 rounded-lg text-sm transition-colors"
          >
            {copyLabel}
          </button>
        </div>
      )}
    </div>
  )
}
