import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { useAccessStatus, PLANS } from '../lib/access'
import AuthModal from './AuthModal'

// Bloque destacado con las DOS vías de apoyo, pensado para la pantalla de
// INICIO de un juego (antes de "▶ Empezar"), nunca durante la partida.
//
// Reemplaza a la variante 'banner' de IgraalCard (demasiado discreta —
// pedido explícito del usuario: "me parece poco visible"). Un solo bloque
// con las dos opciones en vez de dos tiras sueltas, para que lea como un
// apartado con intención, no como ruido de anuncios sueltos.
//
// Ninguna de las dos vías se enseña a quien ya es Pro: iGraal porque "sin
// publicidad" es lo que compra, y el propio botón de Pro porque no tiene
// sentido pedirle que se haga lo que ya es.
const IGRAAL_URL = 'https://es.igraal.com/padrinazgo?padrino=AG_638200fb04960&utm_medium=inf&utm_source=premium'

const COPY = {
  es: {
    title: '💛 Apoya a Tuthor',
    igraalTitle: 'Gana 10€',
    igraalSub: 'Regístrate en iGraal',
    proTitle: 'Hazte Pro',
    proSub: 'Sin publicidad',
  },
  en: {
    title: '💛 Support Tuthor',
    igraalTitle: 'Get €10',
    igraalSub: 'Sign up to iGraal',
    proTitle: 'Go Pro',
    proSub: 'No ads',
  },
  ca: {
    title: '💛 Dona suport a Tuthor',
    igraalTitle: 'Guanya 10€',
    igraalSub: "Registra't a iGraal",
    proTitle: 'Fes-te Pro',
    proSub: 'Sense publicitat',
  },
}

// `variant`:
//   'block' (por defecto) — los dos botones grandes, para donde se quiera
//            máximo peso visual.
//   'top'   — tira fina de una línea, para el principio de la página: mismo
//             tono que el resto de la UI (bg-white/5, texto apagado) en vez
//             de color sólido — "integrado", no "anuncio encima del sitio".
export default function SupportBlock({ className = '', variant = 'block' }) {
  const { user } = useAuth()
  const { lang, tr, localPath } = useLang()
  const navigate = useNavigate()
  const access = useAccessStatus()
  const [showAuth, setShowAuth] = useState(false)

  if (access === null) return null // aún no se sabe si es Pro
  if (access.allowed) return null  // ya es Pro: nada que venderle aquí

  const c = COPY[lang] || COPY.es
  const price = PLANS.pro.price.toFixed(2).replace('.', ',')
  const sponsored = tr({ es: 'Patrocinado', en: 'Sponsored', ca: 'Patrocinat' })

  function handlePro() {
    if (!user) { setShowAuth(true); return }
    navigate(localPath('/mi-plan'))
  }

  if (variant === 'top') {
    return (
      <>
        {/* 2xl:hidden — a partir de 1536px los SideRails ya enseñan estas dos
            mismas ofertas fijas en los márgenes. Sin esto se ven repetidas en
            la misma pantalla, que es justo lo que hace que una página parezca
            llena de anuncios en vez de tener un sitio para ellos. */}
        <div className={`2xl:hidden w-full flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/45 ${className}`}>
          <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/25">{sponsored}</span>
          <a href={IGRAAL_URL} target="_blank" rel="sponsored noopener noreferrer"
            className="font-semibold text-amber-300/70 hover:text-amber-300 transition-colors">
            💚 {c.igraalTitle} {tr({ es: 'con iGraal', en: 'with iGraal', ca: 'amb iGraal' })}
          </a>
          <span className="text-white/15">·</span>
          <button onClick={handlePro} className="font-semibold text-violet-300/70 hover:text-violet-300 transition-colors">
            ✨ {c.proTitle} — {c.proSub}, {price}€/{tr({ es: 'mes', en: 'mo', ca: 'mes' })}
          </button>
        </div>
        {showAuth && (
          <AuthModal
            onClose={() => setShowAuth(false)}
            onSuccess={() => { setShowAuth(false); navigate(localPath('/mi-plan')) }}
          />
        )}
      </>
    )
  }

  return (
    <div className={`rounded-2xl border border-white/10 bg-gradient-to-br from-amber-500/[0.09] via-white/[0.04] to-violet-500/[0.09] p-4 ${className}`}>
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <p className="text-white font-black text-sm">{c.title}</p>
        <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-white/25">{sponsored}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a
          href={IGRAAL_URL}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black px-3 py-3.5 text-center shadow-lg shadow-amber-500/10 transition-colors"
        >
          <span className="text-lg font-black leading-none">💚 {c.igraalTitle}</span>
          <span className="text-[11px] font-semibold opacity-70">{c.igraalSub}</span>
        </a>
        <button
          onClick={handlePro}
          className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white px-3 py-3.5 text-center shadow-lg shadow-violet-500/10 transition-colors"
        >
          <span className="text-lg font-black leading-none">✨ {c.proTitle}</span>
          <span className="text-[11px] font-semibold opacity-70">{c.proSub} · {price}€/mes</span>
        </button>
      </div>

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={() => { setShowAuth(false); navigate(localPath('/mi-plan')) }}
        />
      )}
    </div>
  )
}
