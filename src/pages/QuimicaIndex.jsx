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
