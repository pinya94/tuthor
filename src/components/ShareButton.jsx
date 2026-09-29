import { useState } from 'react'
import { Enlace } from './Iconos'

export default function ShareButton({ text, lang }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(text)
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try { await navigator.clipboard.writeText(value) } catch { return }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const btnLabel = { es: 'Compartir resultado', en: 'Share result', ca: 'Compartir resultat' }[lang] ?? 'Compartir resultado'
  const copyLabel = copied
    ? (lang === 'en' ? '✓ Copied!' : lang === 'ca' ? '✓ Copiat!' : '✓ ¡Copiado!')
    : (lang === 'en' ? 'Copy' : 'Copiar')

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] text-white/70 hover:text-white font-semibold py-3 rounded-xl transition-all text-sm"
      >
        <Enlace className="w-4 h-4" />
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
