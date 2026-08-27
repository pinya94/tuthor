import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { getReferralLink } from '../lib/referral'

// Enlace de invitación: por cada amigo que se registra con él, quien invita
// gana un mes de Pro (ver api/apply-referral.js). Mismo hueco que ocupaba
// ChildCodeCard en Perfil.jsx — reemplaza esa tarjeta escondida, no convive
// con ella.
//
// No se monta en sesión de hijo: invitar es cosa del padre, igual que el
// resto de tarjetas de cuenta.
// `variant`:
//   'full'    (por defecto) — la tarjeta de Perfil, con el enlace a la vista.
//   'compact' — una línea con un botón, para colarla donde ya hay mucho que
//               leer (final de partida, hubs). Copia al portapapeles en vez
//               de enseñar el enlace: ocupa un tercio y hace lo mismo.
export default function ReferralCard({ variant = 'full', className = '' }) {
  const { user, childMode } = useAuth()
  const { tr, localPath } = useLang()
  const [copied, setCopied] = useState(false)

  if (!user || childMode) return null

  const link = getReferralLink(user.uid, localPath)

  function handleCopy() {
    navigator.clipboard?.writeText(link)
      .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
      .catch(() => { /* sin permiso de portapapeles: el enlace está a la vista */ })
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={handleCopy}
        className={`w-full flex items-center gap-3 rounded-2xl border border-violet-400/25 bg-gradient-to-r from-violet-500/[0.12] to-violet-500/[0.04] p-3.5 text-left hover:border-violet-400/45 transition-colors ${className}`}
      >
        <span className="grid place-items-center w-9 h-9 shrink-0 rounded-xl bg-violet-400/15 text-lg" aria-hidden="true">🎁</span>
        <span className="flex-1 min-w-0">
          <span className="block text-white font-black text-sm leading-tight">
            {tr({ es: 'Un mes de Pro gratis', en: 'A free month of Pro', ca: 'Un mes de Pro gratis' })}
          </span>
          <span className="block text-white/50 text-xs leading-snug">
            {tr({
              es: 'Por cada amigo que se registre con tu enlace.',
              en: 'For every friend who signs up with your link.',
              ca: 'Per cada amic que es registri amb el teu enllaç.',
            })}
          </span>
        </span>
        <span className="shrink-0 rounded-lg bg-violet-600 px-3 py-2 text-white text-xs font-bold">
          {copied
            ? tr({ es: '✓ Copiado', en: '✓ Copied', ca: '✓ Copiat' })
            : tr({ es: 'Copiar enlace', en: 'Copy link', ca: 'Copiar enllaç' })}
        </span>
      </button>
    )
  }

  return (
    <section className="rounded-2xl border border-violet-500/25 bg-violet-500/5 p-5">
      <h3 className="text-white font-black text-base mb-1">
        🎁 {tr({ es: 'Invita y gana un mes de Pro', en: 'Invite and get a month of Pro', ca: 'Convida i guanya un mes de Pro' })}
      </h3>
      <p className="text-white/50 text-sm mb-4">
        {tr({
          es: 'Por cada persona que se registre con tu enlace, te llevas un mes de Pro gratis (sin publicidad y panel completo).',
          en: "For every person who signs up with your link, you get a free month of Pro (no ads, full panel).",
          ca: 'Per cada persona que es registri amb el teu enllaç, t\'emportes un mes de Pro gratis (sense publicitat i panell complet).',
        })}
      </p>

      <div className="flex items-center gap-2">
        <code className="flex-1 min-w-0 truncate rounded-xl border border-white/10 bg-black/30 px-4 py-3 font-mono text-sm text-white/80">
          {link}
        </code>
        <button onClick={handleCopy}
          className="shrink-0 px-4 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold transition-colors">
          {copied
            ? tr({ es: '✓ Copiado', en: '✓ Copied', ca: '✓ Copiat' })
            : tr({ es: 'Copiar', en: 'Copy', ca: 'Copiar' })}
        </button>
      </div>
    </section>
  )
}
