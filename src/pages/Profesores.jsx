import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import AuthModal from '../components/AuthModal'
import { activateTeacherProfile, saveTeacherProfileDraft, getTeacherProfile, hasTeacherAccess } from '../lib/classes'

const STAGES = [
  { id: 'primaria', label: { es: 'Primaria', en: 'Primary', ca: 'Primària' } },
  { id: 'eso', label: { es: 'ESO', en: 'Secondary', ca: 'ESO' } },
  { id: 'bachillerato', label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' } },
  { id: 'otro', label: { es: 'Otro', en: 'Other', ca: 'Altre' } },
]

const STRIPE_PAYMENT_LINK = import.meta.env.VITE_STRIPE_PAYMENT_LINK

export default function Profesores() {
  const { user } = useAuth()
  const { lang, tr, localPath } = useLang()
  const navigate = useNavigate()

  const [checking, setChecking] = useState(true)
  const [showAuth, setShowAuth] = useState(false)
  const [accessMethod, setAccessMethod] = useState('pay') // 'pay' | 'code'
  const [schoolName, setSchoolName] = useState('')
  const [stage, setStage] = useState('eso')
  const [promoCode, setPromoCode] = useState('')
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (user === undefined) return
    if (!user) { setChecking(false); return }
    getTeacherProfile(user.uid).then(profile => {
      if (hasTeacherAccess(profile)) { navigate(localPath('/profesor'), { replace: true }); return }
      setChecking(false)
    }).catch(() => setChecking(false))
  }, [user])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!user) { setShowAuth(true); return }
    setStatus('sending')

    if (accessMethod === 'pay') {
      try {
        await saveTeacherProfileDraft(user.uid, { schoolName, stage })
        const url = new URL(STRIPE_PAYMENT_LINK)
        url.searchParams.set('client_reference_id', user.uid)
        if (user.email) url.searchParams.set('prefilled_email', user.email)
        window.location.href = url.toString()
      } catch {
        setStatus('error')
      }
      return
    }

    try {
      await activateTeacherProfile(user.uid, { schoolName, stage, promoCode: promoCode.trim().toUpperCase() })
      navigate(localPath('/profesor'))
    } catch (err) {
      setStatus(err?.code === 'permission-denied' ? 'invalid-code' : 'error')
    }
  }

  const metaTitle = tr({ es: 'Profesores y centros', en: 'Teachers & schools', ca: 'Professors i centres' })
  const metaDesc = tr({
    es: 'Crea clases, comparte un código con tus alumnos y consulta cómo estudian en Tuthor.',
    en: 'Create classes, share a code with your students and see how they study on Tuthor.',
    ca: 'Crea classes, comparteix un codi amb els teus alumnes i consulta com estudien a Tuthor.',
  })

  if (user === undefined || checking) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <p className="text-white/30 text-sm">{tr({ es: 'Cargando…', en: 'Loading…', ca: 'Carregant…' })}</p>
      </div>
    )
  }

  return (
    <div className="relative z-10 min-h-[calc(100vh-4rem)] flex items-start justify-center px-4 py-12">
      <SEOHead title={metaTitle} description={metaDesc} path="/profesores" lang={lang} />
      <div className="w-full max-w-md">
        <Link to={localPath('/')} className="inline-flex items-center gap-1 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors">
          ← {tr({ es: 'Volver', en: 'Back', ca: 'Tornar' })}
        </Link>

        <span className="text-4xl block mb-3">🎓</span>
        <h1 className="text-3xl font-black text-white mb-2">{metaTitle}</h1>
        <p className="text-white/50 text-sm mb-8">{metaDesc}</p>

        <ul className="space-y-2 mb-8 text-sm text-white/60">
          <li className="flex items-start gap-2">
            <span>🔑</span>
            {tr({
              es: 'Crea una clase y comparte su código: tus alumnos se vinculan con su cuenta de Tuthor de siempre.',
              en: 'Create a class and share its code: your students link it with their usual Tuthor account.',
              ca: 'Crea una classe i comparteix el seu codi: els teus alumnes es vinculen amb el seu compte de Tuthor de sempre.',
            })}
          </li>
          <li className="flex items-start gap-2">
            <span>📊</span>
            {tr({
              es: 'Consulta en un panel qué juegos y exámenes hacen, sus rachas y monedas.',
              en: 'See in one panel what games and exams they play, their streaks and coins.',
              ca: 'Consulta en un panell quins jocs i exàmens fan, les seves ratxes i monedes.',
            })}
          </li>
        </ul>

        <div className="flex items-end justify-between gap-3 mb-6 border border-white/10 rounded-2xl px-5 py-4 bg-white/[0.03]">
          <div>
            <p className="text-white font-black text-3xl leading-none">50€ <span className="text-white/40 text-sm font-semibold">/ {tr({ es: 'año', en: 'year', ca: 'any' })}</span></p>
            <p className="text-white/40 text-xs mt-1.5">{tr({ es: 'Por profesor, cancela cuando quieras', en: 'Per teacher, cancel anytime', ca: 'Per professor, cancel·la quan vulguis' })}</p>
          </div>
          <span className="text-3xl">🎓</span>
        </div>

        <p className="text-white/35 text-[11px] uppercase tracking-wider font-bold mb-2">
          {tr({ es: 'Método de acceso', en: 'Access method', ca: 'Mètode d\'accés' })}
        </p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button type="button" onClick={() => setAccessMethod('pay')}
            className={`rounded-xl border px-3 py-3 text-left transition-colors ${accessMethod === 'pay' ? 'border-teal-500/50 bg-teal-500/10' : 'border-white/10 bg-white/[0.03] hover:border-white/20'}`}>
            <span className="text-lg block mb-1">💳</span>
            <p className={`text-xs font-bold ${accessMethod === 'pay' ? 'text-white' : 'text-white/70'}`}>{tr({ es: 'Pagar', en: 'Pay', ca: 'Pagar' })}</p>
          </button>
          <button type="button" onClick={() => setAccessMethod('code')}
            className={`rounded-xl border px-3 py-3 text-left transition-colors ${accessMethod === 'code' ? 'border-teal-500/50 bg-teal-500/10' : 'border-white/10 bg-white/[0.03] hover:border-white/20'}`}>
            <span className="text-lg block mb-1">🎟️</span>
            <p className={`text-xs font-bold ${accessMethod === 'code' ? 'text-white' : 'text-white/70'}`}>{tr({ es: 'Código de acceso', en: 'Access code', ca: 'Codi d\'accés' })}</p>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" required value={schoolName} onChange={e => setSchoolName(e.target.value)}
            placeholder={tr({ es: 'Nombre del centro', en: 'School name', ca: 'Nom del centre' })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-teal-500 transition-colors" />
          <select value={stage} onChange={e => setStage(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-teal-500 transition-colors">
            {STAGES.map(s => (
              <option key={s.id} value={s.id} className="bg-[#0d0d1a]">{tr(s.label)}</option>
            ))}
          </select>
          {accessMethod === 'code' && (
            <input type="text" required value={promoCode} onChange={e => setPromoCode(e.target.value)}
              placeholder={tr({ es: 'Código de acceso', en: 'Access code', ca: 'Codi d\'accés' })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-teal-500 transition-colors" />
          )}

          {status === 'invalid-code' && (
            <p className="text-red-400 text-sm">
              {tr({ es: 'Código no válido. Comprueba que lo has escrito bien.', en: 'Invalid code. Check that you typed it correctly.', ca: 'Codi no vàlid. Comprova que l\'has escrit bé.' })}
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-sm">
              {tr({ es: 'Error al crear tu cuenta de profesor. Inténtalo de nuevo.', en: 'Error creating your teacher account. Please try again.', ca: 'Error en crear el teu compte de professor. Torna-ho a intentar.' })}
            </p>
          )}

          <button type="submit" disabled={status === 'sending'}
            className="w-full px-6 py-3.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99]">
            {status === 'sending'
              ? tr({ es: 'Un momento…', en: 'One moment…', ca: 'Un moment…' })
              : !user
              ? tr({ es: 'Iniciar sesión y empezar', en: 'Sign in and start', ca: 'Iniciar sessió i començar' })
              : accessMethod === 'pay'
              ? tr({ es: 'Pagar 50€/año →', en: 'Pay €50/year →', ca: 'Pagar 50€/any →' })
              : tr({ es: 'Empezar a dar clase', en: 'Start teaching', ca: 'Començar a fer classe' })}
          </button>
        </form>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  )
}
