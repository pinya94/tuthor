// Portada (nov-2026): una plataforma de juegos educativos, al estilo de las
// webs de minijuegos. Entras y lo principal son los juegos: el destacado del
// mes en grande, el juego del día y la cuadrícula de todos, primero los más
// jugados. Estudiar, la zona de profes, los códigos de clase y el perfil van
// en la barra lateral (SideNav) y en el menú, no aquí.
//
// Por qué: GA4 (22-oct → 18-nov) daba 30 s de media en la portada antigua,
// que explicaba todo lo que se puede hacer (titular, buscador, puertas,
// materias, recompensas, invitaciones…), mientras que quien entra a un juego
// se queda 5-10 min. El texto de abajo sigue ahí para Google/AdSense: toda
// página necesita contenido propio en el HTML prerenderizado.
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import JuegoDestacado from '../components/JuegoDestacado'
import JuegoDelDia from '../components/JuegoDelDia'
import CatalogoJuegos from '../components/CatalogoJuegos'
import SEOHead from '../components/SEOHead'
import AdSlot from '../components/AdSlot'
import { cifrasTuthor } from '../lib/descubre'
import { DESTACADO } from '../data/destacados'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { getStats } from '../lib/activity'
import { rachaVigente } from '../lib/statsAggregation'

const cifras = cifrasTuthor()

// Igual que STATIC_META['/'] en lib/staticMeta.js (la que ve el prerender).
const SEO = {
  es: { title: 'Juegos educativos gratis: aprende jugando', desc: 'Más de 100 juegos educativos gratis para Primaria, ESO y Bachillerato: matemáticas, lengua, inglés, ciencias, historia y más. Entra y juega, sin registrarte.' },
  en: { title: 'Free educational games: learn by playing', desc: 'Over 100 free educational games for primary and secondary school: maths, English, science, history and more. Just open one and play, no sign-up.' },
  ca: { title: 'Jocs educatius gratis: aprèn jugant', desc: 'Més de 100 jocs educatius gratis per a Primària, ESO i Batxillerat: matemàtiques, llengua, anglès, ciències, història i més. Entra i juga, sense registrar-te.' },
}

function Saludo({ user }) {
  const { tr, localPath } = useLang()
  const [stats, setStats] = useState(null)
  useEffect(() => { getStats(user.uid).then(setStats).catch(() => {}) }, [user])
  const racha = stats ? rachaVigente(stats) : 0
  return (
    <Link to={localPath('/perfil')} className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] px-4 py-2.5 text-sm">
      <span className="text-white/80 font-semibold truncate">
        {tr({ es: 'Hola', en: 'Hi', ca: 'Hola' })}, {user.displayName?.split(' ')[0] || ''}
      </span>
      <span className="flex items-center gap-3 text-white/70 shrink-0">
        {racha > 0 && <span className="text-orange-300 font-bold">🔥 {racha}</span>}
        {stats?.coins != null && <span className="text-amber-300 font-bold">💰 {stats.coins}</span>}
        <span className="text-white/45">{tr({ es: 'Mi perfil', en: 'My profile', ca: 'El meu perfil' })} →</span>
      </span>
    </Link>
  )
}

export default function Home() {
  const { lang, tr, localPath } = useLang()
  const { user } = useAuth()
  const seo = SEO[lang] || SEO.es

  return (
    <div className="relative z-10 px-4 sm:px-6 lg:px-8">
      <SEOHead title={seo.title} description={seo.desc} path="/" lang={lang} />
      <div className="max-w-6xl mx-auto pt-4 sm:pt-6 pb-16">
        <h1 className="text-white/90 font-black text-lg sm:text-xl mb-3">
          🎮 {tr({ es: 'Juegos educativos gratis', en: 'Free educational games', ca: 'Jocs educatius gratis' })}
          <span className="text-white/45 font-semibold text-sm sm:text-base"> · {tr({ es: 'aprende jugando, sin registrarte', en: 'learn by playing, no sign-up', ca: 'aprèn jugant, sense registrar-te' })}</span>
        </h1>

        {user && <Saludo user={user} />}

        <div className="grid lg:grid-cols-[1fr_300px] gap-3 sm:gap-4 mt-3">
          <JuegoDestacado />
          <JuegoDelDia variante="grande" className="hidden lg:block" />
        </div>
        <JuegoDelDia className="mt-3 lg:hidden" />

        <CatalogoJuegos excluir={DESTACADO.slug} className="mt-6" />

        <AdSlot placement="inArticle" className="mt-8" />

        {/* Texto propio para buscadores (y para quien quiera saber qué es esto) */}
        <section className="mt-10 max-w-3xl text-white/60 text-[15px] leading-relaxed space-y-3">
          <h2 className="text-white font-black text-lg">{tr({ es: 'Juegos para aprender de verdad', en: 'Games to really learn', ca: 'Jocs per aprendre de debò' })}</h2>
          <p>{tr({
            es: `Tuthor es una plataforma de juegos educativos gratis: ${cifras.juegos} juegos y ${cifras.examenes} exámenes con solución de ${cifras.materias} materias, de Primaria a Bachillerato. Cada juego trabaja un tema del temario —formular compuestos, ajustar fuerzas, conjugar verbos, leer un climograma— y se juega en el móvil o en el ordenador, sin instalar nada y sin cuenta.`,
            en: `Tuthor is a free educational games platform: ${cifras.juegos} games and ${cifras.examenes} quizzes with answers across ${cifras.materias} subjects, from primary to sixth form. Each game practises one topic of the curriculum and works on a phone or a computer, with nothing to install and no account needed.`,
            ca: `Tuthor és una plataforma de jocs educatius gratis: ${cifras.juegos} jocs i ${cifras.examenes} exàmens amb solució de ${cifras.materias} matèries, de Primària a Batxillerat. Cada joc treballa un tema del temari i es juga al mòbil o a l’ordinador, sense instal·lar res i sense compte.`,
          })}</p>
          <p>{tr({
            es: 'Si lo que quieres es estudiar un tema concreto, en Estudiar tienes el resumen, los ejemplos y los ejercicios de cada uno, con su juego y su examen. Y si eres profe, puedes lanzar un juego en directo a tu clase o ponerlo de deberes: los alumnos entran con un código, sin cuentas.',
            en: 'If you want to study a specific topic, Study has the summary, examples and exercises for each one, with its game and its quiz. And if you are a teacher, you can run a game live with your class or set it as homework: students join with a code, no accounts.',
            ca: 'Si el que vols és estudiar un tema concret, a Estudiar tens el resum, els exemples i els exercicis de cadascun, amb el seu joc i el seu examen. I si ets profe, pots llançar un joc en directe a la teva classe o posar-lo de deures: els alumnes entren amb un codi, sense comptes.',
          })}</p>
          <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm pt-2">
            <Link to={localPath('/estudiar')} className="text-sky-300 hover:underline">📚 {tr({ es: 'Estudiar por temas', en: 'Study by topic', ca: 'Estudiar per temes' })}</Link>
            <Link to={localPath('/profesores')} className="text-sky-300 hover:underline">🍎 {tr({ es: 'Para profes', en: 'For teachers', ca: 'Per a profes' })}</Link>
            <Link to={localPath('/para-familias')} className="text-sky-300 hover:underline">👪 {tr({ es: 'Para familias', en: 'For families', ca: 'Per a famílies' })}</Link>
            <Link to={localPath('/reportar-bug')} className="text-white/45 hover:underline">{tr({ es: 'Reportar un fallo', en: 'Report a bug', ca: 'Reportar un error' })}</Link>
            <Link to={localPath('/colaborar')} className="text-white/45 hover:underline">{tr({ es: 'Colaborar', en: 'Collaborate', ca: 'Col·laborar' })}</Link>
            <Link to={localPath('/contacto')} className="text-white/45 hover:underline">{tr({ es: 'Contacto', en: 'Contact', ca: 'Contacte' })}</Link>
          </nav>
        </section>
      </div>
    </div>
  )
}
