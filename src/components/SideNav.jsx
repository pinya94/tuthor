// Barra lateral (escritorio, ≥1024 px) de la plataforma de juegos: lo de
// siempre a un clic, sin explicaciones en la portada. Solo en las páginas
// «de navegar» (portada, catálogos, estudiar, recursos, perfil…): dentro de un
// juego o un examen el ancho es para el juego. En el móvil hace de menú la
// hamburguesa de la Navbar.
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { getTeacherProfile, hasTeacherAccess } from '../lib/classes'
import { CURSOS_LANDING } from '../data/landingsCurso'

const CURSOS = Object.keys(CURSOS_LANDING)
const sinIdioma = p => p.replace(/^\/(en|ca)(?=\/|$)/, '') || '/'

// ¿Lleva barra lateral esta ruta?
export function conBarraLateral(pathname) {
  const p = sinIdioma(pathname).replace(/\/$/, '') || '/'
  if (p === '/' || p === '/juegos' || p === '/temario' || p === '/profesores' || p === '/perfil' || p === '/tienda') return true
  const m = p.match(/^\/juegos\/([^/]+)/)
  if (m) return CURSOS.includes(m[1]) // /juegos/eso, /juegos/eso/lengua… sí; un juego, no
  return /^\/(estudiar|recursos|info)(\/|$)/.test(p)
}
export function useConBarraLateral() {
  return conBarraLateral(useLocation().pathname)
}

export default function SideNav() {
  const { pathname } = useLocation()
  const { user, childMode } = useAuth()
  const { tr, localPath } = useLang()
  const [profe, setProfe] = useState(false)
  useEffect(() => {
    if (!user || childMode) return
    let vivo = true
    getTeacherProfile(user.uid).then(p => { if (vivo) setProfe(hasTeacherAccess(p)) }).catch(() => {})
    return () => { vivo = false }
  }, [user, childMode])
  if (!conBarraLateral(pathname)) return null
  const esProfe = Boolean(user) && !childMode && profe

  const p = sinIdioma(pathname)
  const items = [
    { to: '/', icono: '🎮', label: { es: 'Juegos', en: 'Games', ca: 'Jocs' }, activo: p === '/' || p.startsWith('/juegos') },
    { to: '/estudiar', icono: '📚', label: { es: 'Estudiar', en: 'Study', ca: 'Estudiar' }, activo: p.startsWith('/estudiar') || p === '/temario' },
    { to: '/recursos', icono: '🧰', label: { es: 'Recursos', en: 'Resources', ca: 'Recursos' }, activo: p.startsWith('/recursos') },
    null,
    esProfe
      ? { to: '/profesor', icono: '🍎', label: { es: 'Mis clases', en: 'My classes', ca: 'Les meves classes' } }
      : { to: '/profesores', icono: '🍎', label: { es: 'Soy profe', en: 'I’m a teacher', ca: 'Soc profe' }, activo: p === '/profesores' },
    user
      ? { to: '/clase', icono: '🎒', label: { es: 'Mi clase', en: 'My class', ca: 'La meva classe' } }
      : { to: '/reto', icono: '🔑', label: { es: 'Tengo un código', en: 'I have a code', ca: 'Tinc un codi' } },
    user && { to: '/perfil', icono: '👤', label: { es: 'Mi perfil', en: 'My profile', ca: 'El meu perfil' }, activo: p === '/perfil' },
    user && { to: '/tienda', icono: '🛍', label: { es: 'Tienda', en: 'Shop', ca: 'Botiga' }, activo: p === '/tienda' },
  ]

  return (
    <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-52 z-30 border-r border-white/10 bg-black/25 backdrop-blur-md overflow-y-auto">
      <nav className="p-3 flex flex-col gap-1">
        {items.map((it, i) => it === null
          ? <hr key={i} className="my-2 border-white/10" />
          : it && (
            <Link key={it.to} to={localPath(it.to)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${it.activo ? 'bg-white/15 text-white' : 'text-white/65 hover:text-white hover:bg-white/[0.08]'}`}>
              <span className="text-lg w-6 text-center" aria-hidden="true">{it.icono}</span>{tr(it.label)}
            </Link>
          ))}
      </nav>
      <p className="px-6 pt-2 text-white/35 text-xs leading-relaxed">
        {tr({ es: 'Aprende jugando. Gratis y sin registrarte.', en: 'Learn by playing. Free, no sign-up.', ca: 'Aprèn jugant. Gratis i sense registrar-te.' })}
      </p>
    </aside>
  )
}
