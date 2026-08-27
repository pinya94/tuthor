import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { useAccessStatus, PLANS } from '../lib/access'
import AuthModal from './AuthModal'

// Los márgenes muertos a los lados en pantallas anchas — el usuario los
// marcó a mano en una captura de /app: el contenido va en una columna
// centrada (max-w-*) y en monitores grandes sobra un montón de sitio sin
// usar, en TODA la web (landing, /app, cada juego, cada examen), porque
// todos comparten la misma columna centrada.
//
// Se monta UNA vez en el layout raíz (App.jsx), no página por página —
// mismo motivo que AccessGate: es más barato y no hay que tocar cada
// pantalla para que aparezca en todas.
//
// Solo en pantallas muy anchas (2xl, 1536px+): por debajo de eso la columna
// central + dos raíles ya no caben con holgura, y se ve apretado en vez de
// "espacio aprovechado". En móvil no existe layout con márgenes que llenar,
// así que ahí no se pinta nada — la versión de "espacio distinto para
// móvil" ya está resuelta: son los SupportBlock de dentro de cada página.
//
// Izquierda = iGraal, derecha = Hazte Pro: dos huecos, dos mensajes
// distintos, en vez de repetir el mismo dos veces.
const IGRAAL_URL = 'https://es.igraal.com/padrinazgo?padrino=AG_638200fb04960&utm_medium=inf&utm_source=premium'

const COPY = {
  es: {
    igraalTitle: '💚 Llévate 10€',
    igraalBody: 'Regístrate en iGraal y consigue 10€ de regalo. Cashback en tus compras de siempre, y una parte apoya a Tuthor.',
    igraalCta: 'Descubrir →',
    proTitle: '✨ Hazte Pro',
    proBody: 'Sin publicidad y con el panel de seguimiento completo.',
    proCta: 'Hazte Pro →',
    sponsored: 'Patrocinado',
  },
  en: {
    igraalTitle: '💚 Get €10',
    igraalBody: 'Sign up to iGraal and get a €10 gift. Cashback on your everyday shopping, and a share supports Tuthor.',
    igraalCta: 'Discover →',
    proTitle: '✨ Go Pro',
    proBody: 'No ads and the full tracking panel.',
    proCta: 'Go Pro →',
    sponsored: 'Sponsored',
  },
  ca: {
    igraalTitle: '💚 Emporta\'t 10€',
    igraalBody: "Registra't a iGraal i aconsegueix 10€ de regal. Cashback en les teves compres de sempre, i una part dona suport a Tuthor.",
    igraalCta: 'Descobrir →',
    proTitle: '✨ Fes-te Pro',
    proBody: 'Sense publicitat i amb el panell de seguiment complet.',
    proCta: 'Fes-te Pro →',
    sponsored: 'Patrocinat',
  },
}

const railBase = 'hidden 2xl:flex flex-col gap-1.5 fixed top-1/2 -translate-y-1/2 z-20 w-[200px] rounded-2xl border p-4'

export default function SideRails() {
  const { user } = useAuth()
  const { lang, localPath } = useLang()
  const navigate = useNavigate()
  const access = useAccessStatus()
  const [showAuth, setShowAuth] = useState(false)

  if (access === null) return null // aún no se sabe si es Pro
  if (access.allowed) return null  // ya es Pro: nada que venderle aquí

  const c = COPY[lang] || COPY.es
  const price = PLANS.pro.price.toFixed(2).replace('.', ',')

  function handlePro() {
    if (!user) { setShowAuth(true); return }
    navigate(localPath('/mi-plan'))
  }

  return (
    <>
      <a
        href={IGRAAL_URL}
        target="_blank"
        rel="sponsored noopener noreferrer"
        aria-label={c.sponsored}
        className={`${railBase} left-4 border-amber-500/25 bg-amber-500/10 hover:bg-amber-500/15 backdrop-blur-sm transition-colors`}
      >
        <p className="text-[9px] font-bold uppercase tracking-widest text-amber-400/70">{c.sponsored}</p>
        <p className="text-white font-black text-sm leading-snug">{c.igraalTitle}</p>
        <p className="text-white/55 text-xs leading-relaxed">{c.igraalBody}</p>
        <span className="mt-1 text-amber-400 font-bold text-xs">{c.igraalCta}</span>
      </a>

      <button
        onClick={handlePro}
        className={`${railBase} right-4 border-violet-500/25 bg-violet-500/10 hover:bg-violet-500/15 backdrop-blur-sm transition-colors text-left`}
      >
        <p className="text-[9px] font-bold uppercase tracking-widest text-violet-400/70">Tuthor</p>
        <p className="text-white font-black text-sm leading-snug">{c.proTitle}</p>
        <p className="text-white/55 text-xs leading-relaxed">{c.proBody} {price}€/mes.</p>
        <span className="mt-1 text-violet-400 font-bold text-xs">{c.proCta}</span>
      </button>

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={() => { setShowAuth(false); navigate(localPath('/mi-plan')) }}
        />
      )}
    </>
  )
}
