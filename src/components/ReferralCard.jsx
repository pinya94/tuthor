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
export default function ReferralCard() {
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
