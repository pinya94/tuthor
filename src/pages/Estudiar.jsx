import { useNavigate, Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import RecursosInteractivos from '../components/RecursosInteractivos'
import { MATERIAS_ESTUDIO } from '../data/materiasEstudio'
import { ARTE_MATERIAS } from '../components/arte/materias'
import { Lista } from '../components/Iconos'


export default function Estudiar() {
  const navigate = useNavigate()
  const { lang, localPath, t, tr } = useLang()

  const seoData = {
    es: { title: 'Estudiar — Historia, Geografía, Matemáticas', desc: 'Temarios interactivos y tests por niveles: Primaria, ESO y Bachillerato. Historia, geografía, ciencias, matemáticas, inglés y lengua.', path: '/estudiar' },
    en: { title: 'Study — History, Geography, Maths', desc: 'Interactive syllabuses and tests by level: Primary, Secondary and Sixth Form. History, geography, science, maths, English and Spanish.', path: '/en/estudiar' },
    ca: { title: 'Estudiar — Història, Geografia, Matemàtiques', desc: 'Temaris interactius i tests per nivells: Primària, ESO i Batxillerat. Història, geografia, ciències, matemàtiques, anglès i llengua.', path: '/ca/estudiar' },
  }[lang] || {}

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <SEOHead title={seoData.title} description={seoData.desc} path={seoData.path} lang={lang} />
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-white">{t('estudiar.titulo', '¿Qué quieres estudiar?')}</h1>
        <p className="text-white/40 mt-1 text-sm">{t('estudiar.subtitulo', 'Elige una materia para empezar')}</p>
      </div>

      {/* El atajo al mapa completo, ANTES de la rejilla de materias. Esta
          página pide elegir una materia sin haber enseñado nunca qué hay
          dentro de cada una; quien no sabe por dónde empezar necesita ver el
          índice primero, no doce azulejos de colores. */}
      <Link
        to={localPath('/temario')}
        className="group max-w-3xl mx-auto w-full mb-5 flex items-center gap-3 rounded-2xl border border-violet-400/25 bg-violet-600/10 hover:bg-violet-600/20 hover:border-violet-400/50 px-4 py-3.5 transition-colors"
      >
        <Lista className="w-7 h-7 shrink-0" />
        <span className="min-w-0 flex-1">
          <span className="block text-white font-bold text-sm">
            {tr({ es: 'Ver todo el temario', en: 'See the full syllabus', ca: 'Veure tot el temari' })}
          </span>
          <span className="block text-white/50 text-xs mt-0.5">
            {tr({
              es: 'Todas las materias, temas y exámenes en una sola página',
              en: 'Every subject, topic and quiz on a single page',
              ca: 'Totes les matèries, temes i exàmens en una sola pàgina',
            })}
          </span>
        </span>
        <span className="shrink-0 text-violet-300 group-hover:translate-x-0.5 transition-transform" aria-hidden="true">→</span>
      </Link>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto w-full">
        {MATERIAS_ESTUDIO.map(m => {
          const Arte = ARTE_MATERIAS[m.id]
          return (
            <Link
              key={m.id}
              to={localPath(m.path)}
              className="group rounded-2xl overflow-hidden bg-[#141b2e] border border-white/[0.08] hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40"
            >
              <div className="relative w-full aspect-video">
                <Arte className="absolute inset-0 w-full h-full p-2 transition-transform duration-500 ease-out group-hover:scale-[1.05]" />
              </div>
              <div className="px-3.5 py-3 border-t border-white/[0.06]">
                <h3 className="font-black text-white text-sm sm:text-base leading-tight">{tr(m.titulo)}</h3>
                <p className="text-white/50 text-xs mt-1 leading-snug line-clamp-2">{tr(m.subtitulo)}</p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Los recursos también desde aquí: quien entra a estudiar muchas veces
          tiene un ejercicio concreto delante. */}
      <section className="max-w-3xl mx-auto w-full mt-10">
        <div className="flex items-end justify-between gap-3 mb-3">
          <div>
            <h2 className="text-white font-black text-lg">{tr({ es: 'Recursos', en: 'Resources', ca: 'Recursos' })}</h2>
            <p className="text-white/40 text-[13px]">{tr({ es: 'Resuelve tu ejercicio paso a paso o explora en 3D.', en: 'Solve your exercise step by step or explore in 3D.', ca: 'Resol el teu exercici pas a pas o explora en 3D.' })}</p>
          </div>
          <button onClick={() => navigate(localPath('/recursos'))} className="text-sky-300/80 hover:text-sky-300 text-sm font-bold shrink-0">
            {tr({ es: 'Ver todos →', en: 'See all →', ca: 'Veure-ho tot →' })}
          </button>
        </div>
        <RecursosInteractivos />
      </section>
    </div>
  )
}
