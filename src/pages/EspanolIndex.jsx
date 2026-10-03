import { useLang } from '../context/LangContext'
import SEOEstatico from '../components/SEOEstatico'
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
  { id: 'figuras', arte: 'lengua/figuras', titulo: { es: 'Figuras Literarias', en: 'Figures of Speech', ca: 'Figures Literàries' }, emoji: '🎭', gradient: 'from-fuchsia-500 to-purple-700', path: '/examen/espanol-figuras-test' },
]

export default function EspanolIndex() {
  const { lang, localPath } = useLang()

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
    </div>
  )
}
