import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import SubscriptionCard from '../components/SubscriptionCard'

// Página propia para la suscripción, separada de Perfil.jsx (que ya iba muy
// cargado) — mismo hueco en la navegación que Tienda: un enlace más en el
// desplegable del avatar, no un apartado dentro de otra página.
//
// El hijo no llega aquí ni por enlace directo: comparte uid con el padre, así
// que sin esto podría escribir la URL a mano y ver (aunque no tocar, eso lo
// bloquea el servidor) la pantalla de facturación de la familia.
export default function MiPlan() {
  const navigate = useNavigate()
  const { user, childMode } = useAuth()
  const { lang, localPath, tr } = useLang()
  const ca = lang === 'ca'
  const en = lang === 'en'

  useEffect(() => {
    if (user === null || childMode) navigate(localPath('/perfil'))
  }, [user, childMode])

  if (!user || childMode) return null

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-8">
      <SEOHead
        title={tr({ es: 'Tu plan', en: 'Your plan', ca: 'El teu pla' })}
        description={tr({
          es: 'Gestiona tu suscripción de Tuthor: plan, facturas y baja.',
          en: 'Manage your Tuthor subscription: plan, invoices and cancellation.',
          ca: 'Gestiona la teva subscripció de Tuthor: pla, factures i baixa.',
        })}
        path="/mi-plan"
        lang={lang}
        noindex
      />

      <div className="max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(localPath('/perfil'))} className="text-white/40 hover:text-white/70 transition-colors text-sm">
            ← {tr({ es: 'Perfil', en: 'Profile', ca: 'Perfil' })}
          </button>
        </div>

        <h1 className="text-3xl font-black text-white mb-6">💳 {tr({ es: 'Tu plan', en: 'Your plan', ca: 'El teu pla' })}</h1>

        <SubscriptionCard />
      </div>
    </div>
  )
}
