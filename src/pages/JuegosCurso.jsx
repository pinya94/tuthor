// /juegos/<curso> y /juegos/<curso>/<materia>: páginas de entrada por curso
// para las búsquedas de padres y profes ("juegos de matemáticas para
// primaria"). El contenido vive en data/landingsCurso.js; aquí solo se pinta.
// Todo lo que lleva a otra página es un <Link>, para que el buscador lo siga.
import { Link, Navigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import TarjetaArte from '../components/TarjetaArte'
import { CURSOS_LANDING, landingDe, landingsDe, landingEquivalente } from '../data/landingsCurso'
import { GAMES as CATALOGO } from '../data/constants'
import { ARTE_JUEGOS, slugDeRuta } from '../components/arte'
import { ARTE_TEMAS } from '../components/arte/temas'
import { ARTE_MATERIAS, ArteMateria } from '../components/arte/materias'
import { ARTE_CURSOS } from '../components/arte/cursos'
import { Acierto } from '../components/Iconos'

const SITIO = 'https://www.tuthor.es'

function campo(obj, base, lang) {
  if (lang === 'en') return obj[`${base}En`] || obj[base]
  if (lang === 'ca') return obj[`${base}Ca`] || obj[base]
  return obj[base]
}

// Juego del catálogo por su slug de /juegos/<slug>.
function juegoDe(slug) {
  return CATALOGO.find(g => slugDeRuta(g.path) === slug) ?? null
}

function Migas({ items }) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-white/40 text-xs mb-5" aria-label="breadcrumb">
      {items.map(([txt, to], i) => (
        <span key={txt} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden="true">/</span>}
          {to ? <Link to={to} className="hover:text-white/70 transition-colors">{txt}</Link> : <span className="text-white/60">{txt}</span>}
        </span>
      ))}
    </nav>
  )
}

function Parrafos({ textos }) {
  return (
    <div className="space-y-3 max-w-2xl">
      {textos.map(t => <p key={t.slice(0, 24)} className="text-white/60 text-[15px] leading-relaxed">{t}</p>)}
    </div>
  )
}

// Lista de juegos como ItemList (JSON-LD): qué contiene la página.
function EsquemaLista({ nombre, urls }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: nombre,
    itemListElement: urls.map((url, i) => ({ '@type': 'ListItem', position: i + 1, url })),
  }
  return <Helmet><script type="application/ld+json">{JSON.stringify(data)}</script></Helmet>
}

function PaginaMateria({ curso, landing }) {
  const { lang, tr, localPath } = useLang()
  const c = CURSOS_LANDING[curso]
  const juegos = landing.juegos.map(juegoDe).filter(Boolean)
  const hermanas = landingsDe(curso).filter(l => l.materia !== landing.materia)
  const path = `/juegos/${curso}/${landing.materia}`

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead title={tr(landing.titulo)} description={tr(landing.metaDesc)} path={path} lang={lang} />
      <EsquemaLista nombre={tr(landing.titulo)} urls={juegos.map(g => SITIO + g.path)} />
      <Migas items={[[tr({ es: 'Juegos', en: 'Games', ca: 'Jocs' }), localPath('/juegos')], [tr(c.nombre), localPath(`/juegos/${curso}`)], [tr(landing.nombre)]]} />

      <header className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8">
        <ArteMateria id={landing.arteMateria} className="w-full max-w-[220px] aspect-video shrink-0" />
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">{tr(landing.titulo)}</h1>
          <Parrafos textos={tr(landing.intro)} />
        </div>
      </header>

      <section className="mb-10">
        <h2 className="text-white font-black text-lg mb-3">{tr({ es: 'Qué se practica', en: 'What children practise', ca: 'Què es practica' })}</h2>
        <ul className="grid sm:grid-cols-2 gap-2">
          {tr(landing.practica).map(p => (
            <li key={p} className="flex items-center gap-2.5 rounded-xl bg-[#141b2e] border border-white/[0.08] px-3.5 py-2.5 text-white/80 text-sm">
              <Acierto className="w-4 h-4 shrink-0" />{p}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-white font-black text-lg mb-3">
          {tr({ es: 'Juegos', en: 'Games', ca: 'Jocs' })} <span className="text-white/35 font-bold">· {juegos.length}</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {juegos.map(g => (
            <TarjetaArte key={g.path} Arte={ARTE_JUEGOS[slugDeRuta(g.path)]} titulo={campo(g, 'title', lang)}
              sub={campo(g, 'subtitle', lang)} to={localPath(g.path)} />
          ))}
        </div>
      </section>

      {landing.temas.length > 0 && (
        <section className="mb-10">
          <h2 className="text-white font-black text-lg mb-1">{tr({ es: 'Temas para estudiar', en: 'Topics to study', ca: 'Temes per estudiar' })}</h2>
          <p className="text-white/40 text-[13px] mb-3">{tr({ es: 'Con resumen, ejemplos y examen tipo test.', en: 'With a summary, examples and a multiple-choice test.', ca: 'Amb resum, exemples i examen tipus test.' })}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {landing.temas.map(t => (
              <TarjetaArte key={t.ruta} Arte={ARTE_TEMAS[t.arte]} titulo={tr(t.titulo)} to={localPath(t.ruta)} />
            ))}
          </div>
        </section>
      )}

      {/* La misma materia en los otros cursos (o su portada si allí no está):
          quien busca "primaria" y tiene un hijo en 1º de ESO pasa de una a otra. */}
      {Object.keys(CURSOS_LANDING).length > 1 && (
        <section className="mb-8">
          <h2 className="text-white/70 font-black text-base mb-3">{tr({ es: 'En otros cursos', en: 'In other years', ca: 'En altres cursos' })}</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(CURSOS_LANDING).filter(([otro]) => otro !== curso).map(([otro, oc]) => {
              const misma = landingEquivalente(otro, landing.materia)
              return (
                <Link key={otro} to={localPath(misma ? `/juegos/${otro}/${misma.materia}` : `/juegos/${otro}`)}
                  className="px-3.5 py-2 rounded-full bg-[#141b2e] border border-white/[0.08] hover:border-white/25 text-white/75 hover:text-white text-sm font-semibold transition-colors">
                  {misma ? tr(misma.titulo) : tr(oc.titulo)} →
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {hermanas.length > 0 && (
        <section>
          <h2 className="text-white/70 font-black text-base mb-3">{tr({ es: `Más juegos de ${tr(c.nombre)}`, en: `More ${tr(c.nombre).toLowerCase()} games`, ca: `Més jocs de ${tr(c.nombre)}` })}</h2>
          <div className="flex flex-wrap gap-2">
            {hermanas.map(l => (
              <Link key={l.materia} to={localPath(`/juegos/${curso}/${l.materia}`)}
                className="px-3.5 py-2 rounded-full bg-[#141b2e] border border-white/[0.08] hover:border-white/25 text-white/75 hover:text-white text-sm font-semibold transition-colors">
                {tr(l.nombre)}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function PaginaCurso({ curso }) {
  const { lang, tr, localPath } = useLang()
  const c = CURSOS_LANDING[curso]
  const materias = landingsDe(curso)
  const ArteCurso = ARTE_CURSOS[curso]

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead title={tr(c.titulo)} description={tr(c.metaDesc)} path={`/juegos/${curso}`} lang={lang} />
      <EsquemaLista nombre={tr(c.titulo)} urls={materias.map(l => `${SITIO}/juegos/${curso}/${l.materia}`)} />
      <Migas items={[[tr({ es: 'Juegos', en: 'Games', ca: 'Jocs' }), localPath('/juegos')], [tr(c.nombre)]]} />

      <header className="flex flex-col sm:flex-row sm:items-center gap-5 mb-10">
        {ArteCurso && <ArteCurso className="w-40 shrink-0" />}
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-1">{c.edades} {tr({ es: 'años', en: 'years', ca: 'anys' })}</p>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">{tr(c.titulo)}</h1>
          <Parrafos textos={tr(c.intro)} />
        </div>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {materias.map(l => (
          <TarjetaArte key={l.materia} Arte={ARTE_MATERIAS[l.arteMateria]} titulo={tr(l.nombre)}
            sub={`${l.juegos.length} ${tr(l.juegos.length === 1 ? { es: 'juego', en: 'game', ca: 'joc' } : { es: 'juegos', en: 'games', ca: 'jocs' })} · ${l.temas.length} ${tr({ es: 'temas', en: 'topics', ca: 'temes' })}`}
            to={localPath(`/juegos/${curso}/${l.materia}`)} />
        ))}
      </div>
    </div>
  )
}

// Solo hay rutas para los cursos de CURSOS_LANDING (App.jsx); una materia
// que no existe vuelve a la portada del curso.
export default function JuegosCurso({ curso }) {
  const { materia } = useParams()
  const { localPath } = useLang()
  if (!materia) return <PaginaCurso curso={curso} />
  const landing = landingDe(curso, materia)
  return landing ? <PaginaMateria curso={curso} landing={landing} /> : <Navigate to={localPath(`/juegos/${curso}`)} replace />
}
