// Barra lateral (escritorio, ≥1024 px) de la plataforma de juegos: lo de
// siempre a un clic, sin explicaciones en la portada. Solo en las páginas
// «de navegar» (portada, catálogos, estudiar, recursos, perfil, paneles de
// clase…): dentro de un juego, un examen o la pantalla de un reto que se
// proyecta, el ancho es para eso. En el móvil hace de menú la hamburguesa de
// la Navbar.
//
// El bloque «Mi clase» cambia según quién eres (cada uno ve solo lo suyo):
//   profe            → Mis clases · Jugar con la clase · Mis exámenes
//   alumno con cuenta → Mi clase (con aviso de tareas pendientes)
//   sin cuenta       → Tengo un código
//   quien no es profe → Soy profe (la página que lo explica)
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { useAvisosClase } from '../context/AvisosClaseContext'
import { CURSOS_LANDING } from '../data/landingsCurso'

const CURSOS = Object.keys(CURSOS_LANDING)
const sinIdioma = p => p.replace(/^\/(en|ca)(?=\/|$)/, '') || '/'

// ¿Lleva barra lateral esta ruta?
export function conBarraLateral(pathname) {
  const p = sinIdioma(pathname).replace(/\/$/, '') || '/'
  if (['/', '/juegos', '/top', '/novedades', '/temario', '/profesores', '/perfil', '/tienda', '/profesor', '/clase'].includes(p)) return true
  const m = p.match(/^\/juegos\/([^/]+)/)
  if (m) return CURSOS.includes(m[1]) // /juegos/eso, /juegos/eso/lengua… sí; un juego, no
  // El aula de una clase sí; el editor de exámenes y el reto proyectado, no
  if (/^\/profesor\/clase\//.test(p)) return true
  return /^\/(estudiar|recursos|info)(\/|$)/.test(p)
}
export function useConBarraLateral() {
  return conBarraLateral(useLocation().pathname)
}

function Enlace({ it }) {
  const { tr, localPath } = useLang()
  return (
    <Link to={localPath(it.to)}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${it.activo ? 'bg-white/15 text-white' : 'text-white/65 hover:text-white hover:bg-white/[0.08]'}`}>
      <span className="text-lg w-6 text-center" aria-hidden="true">{it.icono}</span>
      <span className="flex-1">{tr(it.label)}</span>
      {it.aviso > 0 && <span title={it.avisoTitulo ? `${it.aviso} ${tr(it.avisoTitulo)}` : undefined} className="bg-red-500 text-white text-[10px] font-bold rounded-full min-w-5 h-5 px-1 grid place-items-center">{it.aviso}</span>}
    </Link>
  )
}

export default function SideNav() {
  const { pathname, search } = useLocation()
  const { user } = useAuth()
  const { tr, localPath } = useLang()
  // En vivo (AvisosClaseContext): tareas pendientes, si está en alguna clase
  // y, para el profe, entregas nuevas desde la última vez que miró
  const { esProfe, enClase, pendientes, entregasNuevas } = useAvisosClase()
  if (!conBarraLateral(pathname)) return null

  const p = sinIdioma(pathname)
  const tab = new URLSearchParams(search).get('tab') || 'clases'
  const enPanel = p === '/profesor' || p.startsWith('/profesor/')
  const principal = [
    { to: '/', icono: '🎮', label: { es: 'Juegos', en: 'Games', ca: 'Jocs' }, activo: p === '/' || p.startsWith('/juegos') },
    { to: '/estudiar', icono: '📚', label: { es: 'Estudiar', en: 'Study', ca: 'Estudiar' }, activo: p.startsWith('/estudiar') || p === '/temario' },
    { to: '/top', icono: '🏆', label: { es: 'Ranking', en: 'Leaderboard', ca: 'Rànquing' }, activo: p === '/top' },
    { to: '/recursos', icono: '🧰', label: { es: 'Recursos', en: 'Resources', ca: 'Recursos' }, activo: p.startsWith('/recursos') },
  ]
  const clase = esProfe
    ? [
      { to: '/profesor?tab=clases', icono: '🎓', label: { es: 'Mis clases', en: 'My classes', ca: 'Les meves classes' }, activo: enPanel && (tab === 'clases' || p.startsWith('/profesor/clase/')), aviso: entregasNuevas, avisoTitulo: { es: 'entregas nuevas', en: 'new submissions', ca: 'entregues noves' } },
      { to: '/profesor?tab=retos', icono: '📺', label: { es: 'Jugar con la clase', en: 'Play with the class', ca: 'Jugar amb la classe' }, activo: p === '/profesor' && tab === 'retos' },
      { to: '/profesor?tab=examenes', icono: '📝', label: { es: 'Mis exámenes', en: 'My exams', ca: 'Els meus exàmens' }, activo: p === '/profesor' && tab === 'examenes' },
    ]
    : [
      // Con cuenta y aún sin clase: «Unirme a una clase» (no «Mi clase», que
      // daba a entender que ya tenía una)
      !user ? { to: '/reto', icono: '🔑', label: { es: 'Tengo un código', en: 'I have a code', ca: 'Tinc un codi' } }
        : enClase === false ? { to: '/clase', icono: '🔑', label: { es: 'Unirme a una clase', en: 'Join a class', ca: 'Unir-me a una classe' }, activo: p === '/clase' }
        : { to: '/clase', icono: '🎒', label: { es: 'Mi clase', en: 'My class', ca: 'La meva classe' }, activo: p === '/clase', aviso: pendientes, avisoTitulo: { es: 'tareas sin hacer', en: 'tasks to do', ca: 'tasques per fer' } },
      { to: '/profesores', icono: '🍎', label: { es: 'Soy profe', en: 'I’m a teacher', ca: 'Soc profe' }, activo: p === '/profesores' },
    ]
  const cuenta = user ? [
    { to: '/perfil', icono: '👤', label: { es: 'Mi perfil', en: 'My profile', ca: 'El meu perfil' }, activo: p === '/perfil' },
    { to: '/tienda', icono: '🛍', label: { es: 'Tienda', en: 'Shop', ca: 'Botiga' }, activo: p === '/tienda' },
  ] : []

  const titulo = t => <p className="px-3 pt-1 pb-1 text-white/35 text-[11px] font-bold uppercase tracking-widest">{tr(t)}</p>
  return (
    <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-52 z-30 border-r border-white/10 bg-black/25 backdrop-blur-md overflow-y-auto">
      <nav className="p-3 flex flex-col gap-1">
        {principal.map(it => <Enlace key={it.to} it={it} />)}
        <hr className="my-2 border-white/10" />
        {titulo({ es: 'Mi clase', en: 'My class', ca: 'La meva classe' })}
        {clase.map(it => <Enlace key={it.to} it={it} />)}
        {cuenta.length > 0 && <hr className="my-2 border-white/10" />}
        {cuenta.map(it => <Enlace key={it.to} it={it} />)}
      </nav>
      <p className="px-6 pt-2 text-white/35 text-xs leading-relaxed">
        {tr({ es: 'Aprende jugando. Gratis y sin registrarte.', en: 'Learn by playing. Free, no sign-up.', ca: 'Aprèn jugant. Gratis i sense registrar-te.' })}
      </p>
      {/* Novedades: discreto, al pie (es para curiosos, no un destino del menú) */}
      <p className="px-6 pt-2 pb-4 text-xs">
        <Link to={localPath('/novedades')} className="text-white/35 hover:text-white/70 underline-offset-2 hover:underline">✨ {tr({ es: 'Novedades', en: 'What’s new', ca: 'Novetats' })}</Link>
      </p>
    </aside>
  )
}
