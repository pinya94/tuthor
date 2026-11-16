import { useLang } from '../context/LangContext'
import SEOEstatico from '../components/SEOEstatico'
import { ArteMateria } from '../components/arte/materias'
import TarjetaArte from '../components/TarjetaArte'
import { ARTE_TEMAS } from '../components/arte/temas'
import { ARTE_JUEGOS, slugDeRuta } from '../components/arte'
import { Link } from 'react-router-dom'
import { PRINCIPALES, BASICOS, AVANZADOS } from '../data/temasGramaticaIngles'

const CATEGORIAS = [
  { id: 'grammar', titulo: { es: 'Grammar', en: 'Grammar', ca: 'Grammar' }, emoji: '📝', gradient: 'from-blue-500 to-indigo-600', path: '/estudiar/idiomas/ingles/grammar' },
  { id: 'word-order', titulo: { es: 'Word order', en: 'Word order', ca: 'Word order' }, emoji: '🔤', gradient: 'from-cyan-500 to-blue-700', path: '/juegos/ordena-frase',
    sub: { es: 'Ordena la frase jugando', en: 'Order the sentence by playing', ca: 'Ordena la frase jugant' } },
  { id: 'irregular-verbs', titulo: { es: 'Irregular verbs', en: 'Irregular verbs', ca: 'Irregular verbs' }, emoji: '🔁', gradient: 'from-sky-500 to-cyan-700', path: '/juegos/verbos-irregulares',
    sub: { es: 'Pasado y participio: go · went · gone', en: 'Past simple and participle: go · went · gone', ca: 'Passat i participi: go · went · gone' } },
  // Con tema: sin él, Corrige el Texto abre en el idioma de la interfaz, y
  // desde Inglés lo que toca es el texto en inglés.
  { id: 'spelling', titulo: { es: 'Spelling', en: 'Spelling', ca: 'Spelling' }, emoji: '🔍', gradient: 'from-amber-500 to-orange-700', path: '/juegos/corrige-el-texto', state: { tema: 'spelling' },
    sub: { es: 'Encuentra las faltas de un texto en inglés', en: 'Find the mistakes in an English text', ca: "Troba les faltes d'un text en anglès" } },
]

export default function InglesIndex() {
  const { lang, localPath, tr } = useLang()

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <SEOEstatico path="/estudiar/idiomas/ingles" />
      <div className="text-center mb-8">
        <p className="text-white/40 text-sm mb-1">Estudiar · English</p>
        <ArteMateria id="ingles" />
        <h1 className="text-2xl sm:text-3xl font-black text-white">English</h1>
        <p className="text-white/40 mt-1 text-sm">
          {{ es: 'Selecciona una categoría', en: 'Select a category', ca: 'Selecciona una categoria' }[lang]}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto w-full">
        {CATEGORIAS.map(cat => (
          <TarjetaArte key={cat.id} titulo={cat.titulo[lang] || cat.titulo.es} sub={cat.sub && (cat.sub[lang] ?? cat.sub.es)}
            Arte={cat.id === 'grammar' ? ARTE_TEMAS['lengua/gramatica'] : ARTE_JUEGOS[slugDeRuta(cat.path)]}
            to={localPath(cat.path)} state={cat.state} />
        ))}
      </div>

      {/* Todos los temas de gramática a un toque: así cada tema queda a 2
          clics de la portada y su examen a 3 (antes, 3 y 4). */}
      <section className="max-w-3xl mx-auto w-full mt-6 rounded-2xl border border-white/[0.08] bg-[#141b2e] p-4">
        <h2 className="text-white font-bold mb-3">📝 {tr({ es: 'Temas de gramática', en: 'Grammar topics', ca: 'Temes de gramàtica' })}</h2>
        {[[PRINCIPALES, null], [BASICOS, { es: 'Primaria y 1.º-2.º de ESO', en: 'The basics', ca: 'Primària i 1r-2n d’ESO' }], [AVANZADOS, { es: '3.º y 4.º de ESO', en: 'Year 10 and 11', ca: '3r i 4t d’ESO' }]].map(([lista, titulo], i) => (
          <div key={i} className={i ? 'mt-3' : ''}>
            {titulo && <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-1.5">{tr(titulo)}</p>}
            <div className="flex flex-wrap gap-2">
              {lista.map(([slug, nombre]) => (
                <Link key={slug} to={localPath(`/estudiar/idiomas/ingles/grammar/${slug}`)}
                  className="rounded-full border border-white/15 bg-white/5 hover:bg-white/10 px-3 py-1.5 text-sm text-white/80">{nombre}</Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
