import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOEstatico from '../components/SEOEstatico'
import { TEMAS_GRAMATICA, TEMAS_ORTOGRAFIA } from '../data/temasEspanol'
import { ArteMateria } from '../components/arte/materias'
import TarjetaArte from '../components/TarjetaArte'
import { ARTE_TEMAS } from '../components/arte/temas'

const CATEGORIAS = [
  { id: 'gramatica', arte: 'lengua/gramatica', titulo: { es: 'Gramática', en: 'Grammar', ca: 'Gramàtica' }, emoji: '📚', gradient: 'from-red-500 to-orange-500', path: '/estudiar/idiomas/espanol/gramatica' },
  { id: 'ortografia', arte: 'ortografia/acentuacion', titulo: { es: 'Ortografía', en: 'Spelling', ca: 'Ortografia' }, emoji: '✍️', gradient: 'from-yellow-500 to-amber-600', path: '/estudiar/idiomas/espanol/ortografia' },
  // Literatura tiene un solo examen, así que no necesita índice propio: la
  // tarjeta lleva directa a la prueba, como hace Matemáticas con Porcentajes.
  { id: 'literatura', arte: 'lengua/literatura', titulo: { es: 'Literatura', en: 'Literature', ca: 'Literatura' }, emoji: '🖋️', gradient: 'from-indigo-500 to-blue-700', path: '/examen/espanol-literatura-test' },
  // Los textos (tipologías, funciones del lenguaje, propiedades): un solo examen,
  // la tarjeta va directa a él como Literatura.
  { id: 'textos', arte: 'lengua/textos', titulo: { es: 'Los Textos', en: 'Types of Text', ca: 'Els Textos' }, emoji: '📝', gradient: 'from-teal-500 to-cyan-700', path: '/examen/espanol-textos-test' },
  // Figuras literarias: reconocerlas en versos y frases; un solo examen.
  // Métrica: el juego Mide el verso (y su examen, enlazado desde el juego).
  { id: 'metrica', arte: 'lengua/metrica', titulo: { es: 'Métrica', en: 'Metre', ca: 'Mètrica' }, emoji: '✒️', gradient: 'from-rose-600 to-amber-700', path: '/juegos/mide-el-verso' },
  { id: 'figuras', arte: 'lengua/figuras', titulo: { es: 'Figuras Literarias', en: 'Figures of Speech', ca: 'Figures Literàries' }, emoji: '🎭', gradient: 'from-fuchsia-500 to-purple-700', path: '/examen/espanol-figuras-test' },
]

export default function EspanolIndex() {
  const { lang, tr, localPath } = useLang()

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <SEOEstatico path="/estudiar/idiomas/espanol" />
      <div className="text-center mb-8">
        <p className="text-white/40 text-sm mb-1">Estudiar · Español</p>
        <ArteMateria id="espanol" />
        <h1 className="text-2xl sm:text-3xl font-black text-white">Español</h1>
        <p className="text-white/40 mt-1 text-sm">
          {{ es: 'Selecciona una categoría', en: 'Select a category', ca: 'Selecciona una categoria' }[lang]}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto w-full">
        {CATEGORIAS.map(cat => (
          <TarjetaArte key={cat.id} Arte={ARTE_TEMAS[cat.arte]} titulo={cat.titulo[lang] || cat.titulo.es}
            to={localPath(cat.path)} />
        ))}
      </div>

      {/* Atajo: los temas de gramática y ortografía a la vista, sin pasar por
          su índice (que sigue existiendo para quien quiera verlos con dibujo) */}
      <div className="max-w-3xl mx-auto w-full mt-8 space-y-4">
        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest text-center">
          {tr({ es: 'O ve directo a un tema', en: 'Or go straight to a topic', ca: 'O ves directe a un tema' })}
        </p>
        {[
          { titulo: { es: 'Gramática', en: 'Grammar', ca: 'Gramàtica' }, temas: TEMAS_GRAMATICA.map(t => ({ ...t, path: `/estudiar/idiomas/espanol/gramatica/${t.id}` })) },
          { titulo: { es: 'Ortografía', en: 'Spelling', ca: 'Ortografia' }, temas: TEMAS_ORTOGRAFIA.map(t => ({ ...t, path: `/examen/${t.gameId}` })) },
        ].map(g => (
          <div key={g.titulo.es}>
            <p className="text-white/60 text-sm font-bold mb-2">{tr(g.titulo)}</p>
            <div className="flex flex-wrap gap-2">
              {g.temas.map(t => (
                <Link key={t.id} to={localPath(t.path)}
                  className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white/80 hover:text-white text-sm transition-colors">
                  {tr(t.titulo)}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
