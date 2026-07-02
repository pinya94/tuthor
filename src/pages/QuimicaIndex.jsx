import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import TemarioGrid from '../components/TemarioGrid'

const TEMAS = [
  {
    id: 'tabla-periodica',
    titulo: 'Tabla Periódica', tituloEn: 'Periodic Table', tituloCa: 'Taula Periòdica',
    subtitulo: 'Símbolos, nombres y grupos de los elementos', subtituloEn: 'Symbols, names and groups of elements', subtituloCa: 'Símbols, noms i grups dels elements',
    emoji: '⚗️', gradient: 'from-violet-500 to-purple-700',
    tags: ['elementos', 'simbolos', 'quimica', 'tabla', 'periodic table', 'elements'],
    niveles: ['primaria', 'eso', 'bachillerato'],
  },
  {
    id: 'estados-materia',
    titulo: 'Estados de la Materia', tituloEn: 'States of Matter', tituloCa: 'Estats de la Matèria',
    subtitulo: 'Sólido, líquido, gas y cambios de estado', subtituloEn: 'Solid, liquid, gas and changes of state', subtituloCa: 'Sòlid, líquid, gas i canvis d\'estat',
    emoji: '🧪', gradient: 'from-teal-500 to-cyan-700',
    tags: ['estados', 'solido', 'liquido', 'gas', 'fusion', 'evaporacion', 'materia', 'states', 'matter'],
    niveles: ['primaria', 'eso'],
  },
  {
    id: 'mezclas-separacion',
    titulo: 'Mezclas y Separación', tituloEn: 'Mixtures & Separation', tituloCa: 'Mescles i Separació',
    subtitulo: 'Homogéneas, heterogéneas y métodos de separación', subtituloEn: 'Homogeneous, heterogeneous and separation methods', subtituloCa: 'Homogènies, heterogènies i mètodes de separació',
    emoji: '🔀', gradient: 'from-orange-500 to-amber-600',
    tags: ['mezclas', 'separacion', 'filtracion', 'destilacion', 'decantacion', 'mixtures', 'separation'],
    niveles: ['primaria', 'eso'],
  },
  {
    id: 'acidos-bases',
    titulo: 'Ácidos y Bases', tituloEn: 'Acids & Bases', tituloCa: 'Àcids i Bases',
    subtitulo: 'pH, indicadores y neutralización', subtituloEn: 'pH, indicators and neutralisation', subtituloCa: 'pH, indicadors i neutralització',
    emoji: '🧴', gradient: 'from-green-500 to-emerald-700',
    tags: ['acidos', 'bases', 'ph', 'neutralizacion', 'indicadores', 'acids', 'bases', 'neutralisation'],
    niveles: ['eso'],
  },
  {
    id: 'atomos-moleculas',
    titulo: 'Átomos y Moléculas', tituloEn: 'Atoms & Molecules', tituloCa: 'Àtoms i Molècules',
    subtitulo: 'Estructura atómica, elementos y compuestos', subtituloEn: 'Atomic structure, elements and compounds', subtituloCa: 'Estructura atòmica, elements i compostos',
    emoji: '⚛️', gradient: 'from-blue-500 to-indigo-700',
    tags: ['atomos', 'moleculas', 'protones', 'neutrones', 'electrones', 'atoms', 'molecules', 'electrons'],
    niveles: ['primaria', 'eso'],
  },
  {
    id: 'sistema-solar',
    titulo: 'Sistema Solar', tituloEn: 'Solar System', tituloCa: 'Sistema Solar',
    subtitulo: 'Planetas, astros, movimientos y características', subtituloEn: 'Planets, celestial bodies, movements and features', subtituloCa: 'Planetes, astres, moviments i característiques',
    emoji: '🌍', gradient: 'from-indigo-500 to-purple-700',
    tags: ['planetas', 'sol', 'luna', 'orbita', 'rotacion', 'traslacion', 'sistema solar', 'planets', 'solar system'],
    niveles: ['primaria', 'eso'],
  },
  {
    id: 'celula',
    titulo: 'La Célula', tituloEn: 'The Cell', tituloCa: 'La Cèl·lula',
    subtitulo: 'Tipos, orgánulos y funciones celulares', subtituloEn: 'Types, organelles and cell functions', subtituloCa: 'Tipus, orgànuls i funcions cel·lulars',
    emoji: '🔬', gradient: 'from-green-500 to-teal-700',
    tags: ['celula', 'nucleo', 'mitocondria', 'cloroplasto', 'procariota', 'eucariota', 'cell', 'organelle'],
    niveles: ['eso'],
  },
  {
    id: 'geometria',
    titulo: 'Geometría', tituloEn: 'Geometry', tituloCa: 'Geometria',
    subtitulo: 'Ángulos, áreas, perímetros y volúmenes', subtituloEn: 'Angles, areas, perimeters and volumes', subtituloCa: 'Angles, àrees, perímetres i volums',
    emoji: '📐', gradient: 'from-pink-500 to-rose-700',
    tags: ['triangulo', 'circulo', 'area', 'perimetro', 'pitagoras', 'volumen', 'geometry', 'triangle', 'area'],
    niveles: ['primaria', 'eso'],
  },
]

export default function QuimicaIndex() {
  const navigate = useNavigate()
  const { lang, localPath, lt } = useLang()
  const ca = lang === 'ca', en = lang === 'en'

  const items = TEMAS.map(t => ({
    ...t,
    titulo:    lt(t, 'titulo'),
    subtitulo: lt(t, 'subtitulo'),
  }))

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <div className="text-center mb-6">
        <p className="text-white/40 text-sm mb-1">
          {ca ? 'Estudiar · Ciències' : en ? 'Study · Science' : 'Estudiar · Ciencias'}
        </p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {ca ? 'Tria un tema' : en ? 'Pick a topic' : 'Elige un tema'}
        </h1>
        <p className="text-white/40 mt-1 text-sm">
          {ca ? 'Química i ciències naturals per a tots els nivells'
            : en ? 'Chemistry and natural sciences for all levels'
            : 'Química y ciencias naturales para todos los niveles'}
        </p>
      </div>

      <TemarioGrid
        items={items}
        onSelect={item => navigate(localPath(`/estudiar/quimica/${item.id}`))}
        placeholder={ca ? 'Cercar tema...' : en ? 'Search topic...' : 'Buscar tema...'}
      />
    </div>
  )
}
