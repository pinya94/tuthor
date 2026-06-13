import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const CARDS = [
  {
    emoji: '🐛',
    title: 'Reportar un bug',
    desc: 'Algo no funciona bien? Cuéntanoslo y lo arreglamos lo antes posible.',
    cta: 'Abrir formulario',
    href: 'mailto:consiguetualgogratis@gmail.com?subject=Bug%20en%20Tuthor&body=Describe%20el%20problema%3A',
    accent: 'violet',
  },
  {
    emoji: '🎬',
    title: 'Cómo construimos Tuthor',
    desc: 'Seguimos el proceso de creación en vídeo: tecnología, diseño y decisiones reales.',
    cta: 'Ver los vídeos',
    href: 'https://www.youtube.com/@Consiguetualgogratis',
    accent: 'red',
  },
  {
    emoji: '☕',
    title: 'Apoyar el proyecto',
    desc: 'Tuthor es gratuito. Si te gusta y quieres ayudarnos a crecer, puedes invitarnos a un café.',
    cta: 'Apoyar en Ko-fi',
    href: 'https://ko-fi.com/consiguetualgogratis',
    accent: 'yellow',
  },
  {
    emoji: '📣',
    title: 'Colaborar o anunciarse',
    desc: '¿Tienes una academia, editorial o proyecto educativo? Hablemos de cómo trabajar juntos.',
    cta: 'Escribirnos',
    href: 'mailto:consiguetualgogratis@gmail.com?subject=Colaboraci%C3%B3n%20con%20Tuthor',
    accent: 'green',
  },
]

const ACCENT = {
  violet: 'border-violet-500/30 hover:border-violet-500/60 group-hover:text-violet-400',
  red:    'border-red-500/30 hover:border-red-500/60 group-hover:text-red-400',
  yellow: 'border-yellow-500/30 hover:border-yellow-500/60 group-hover:text-yellow-400',
  green:  'border-green-500/30 hover:border-green-500/60 group-hover:text-green-400',
}

const EMOJI_BG = {
  violet: 'bg-violet-500/10',
  red:    'bg-red-500/10',
  yellow: 'bg-yellow-500/10',
  green:  'bg-green-500/10',
}

const CTA_COLOR = {
  violet: 'text-violet-400 group-hover:text-violet-300',
  red:    'text-red-400 group-hover:text-red-300',
  yellow: 'text-yellow-400 group-hover:text-yellow-300',
  green:  'text-green-400 group-hover:text-green-300',
}

export default function Comunidad() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-10">
      <div className="max-w-2xl mx-auto w-full">

        {/* Cabecera */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>

        <div className="mb-8">
          {user?.photoURL
            ? <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full mb-4 ring-1 ring-white/10" />
            : <div className="w-10 h-10 rounded-full bg-violet-600/40 flex items-center justify-center text-lg font-black text-white mb-4">
                {user?.displayName?.[0]?.toUpperCase() ?? '👋'}
              </div>
          }
          <h1 className="text-white font-black text-2xl sm:text-3xl leading-tight">
            Hola{user?.displayName ? `, ${user.displayName.split(' ')[0]}` : ''}
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Esto es lo que puedes hacer para ser parte de Tuthor.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CARDS.map(card => (
            <a
              key={card.title}
              href={card.href}
              target={card.href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className={`group bg-white/5 border ${ACCENT[card.accent]} rounded-2xl p-5 flex flex-col gap-3 transition-all hover:bg-white/[0.08] cursor-pointer`}
            >
              <div className={`w-10 h-10 rounded-xl ${EMOJI_BG[card.accent]} flex items-center justify-center text-xl`}>
                {card.emoji}
              </div>
              <div className="flex-1">
                <h2 className="text-white font-semibold text-sm">{card.title}</h2>
                <p className="text-white/40 text-xs mt-1 leading-relaxed">{card.desc}</p>
              </div>
              <div className={`flex items-center gap-1.5 text-xs font-medium ${CTA_COLOR[card.accent]} transition-colors`}>
                {card.cta}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Footer discreto */}
        <p className="text-center text-white/20 text-xs mt-10">
          Hecho con mucho café ☕ · <a href="/privacidad" className="hover:text-white/40 transition-colors">Privacidad</a>
        </p>
      </div>
    </div>
  )
}
