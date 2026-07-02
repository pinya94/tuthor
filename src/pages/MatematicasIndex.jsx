import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import TemarioGrid from '../components/TemarioGrid'
import { MODOS, MODO_IDS } from '../lib/mathEngine'

// Examenes que van directo al examen (no usan el motor aritmético)
const EXAM_DIRECTO = {
  geometria: '/examen/geometria',
}

const EXTRAS = [
  {
    id: 'geometria',
    titulo: 'Geometría', tituloEn: 'Geometry', tituloCa: 'Geometria',
    emoji: '📐', gradient: 'from-pink-500 to-rose-700',
    tags: ['area', 'perimetro', 'pitagoras', 'angulos', 'volumen', 'triangulo'],
  },
]

export default function MatematicasIndex() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const en = lang === 'en'
  const ca = lang === 'ca'

  const ITEMS = [
    ...MODO_IDS.map(id => ({
      id,
      titulo: ca ? (MODOS[id].tituloCa || MODOS[id].titulo) : en ? (MODOS[id].tituloEn || MODOS[id].titulo) : MODOS[id].titulo,
      emoji: MODOS[id].emoji,
      gradient: MODOS[id].gradient,
      tags: MODOS[id].ops,
    })),
    ...EXTRAS.map(e => ({
      id: e.id,
      titulo: ca ? e.tituloCa : en ? e.tituloEn : e.titulo,
      emoji: e.emoji,
      gradient: e.gradient,
      tags: e.tags,
    })),
  ]

  function handleSelect(item) {
    if (EXAM_DIRECTO[item.id]) {
      navigate(localPath(EXAM_DIRECTO[item.id]))
    } else {
      navigate(localPath(`/estudiar/matematicas/${item.id}`))
    }
  }

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <div className="text-center mb-6">
        <p className="text-white/40 text-sm mb-1">{ca ? 'Estudiar · Matemàtiques' : en ? 'Study · Mathematics' : 'Estudiar · Matemáticas'}</p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">{ca ? 'Tria què practicar' : en ? 'Pick what to practise' : 'Elige qué practicar'}</h1>
        <p className="text-white/40 mt-1 text-sm">{ca ? 'Selecciona quina operació vols repassar' : en ? 'Select the operation you want to revise' : 'Selecciona qué operación quieres repasar'}</p>
      </div>

      <TemarioGrid items={ITEMS} onSelect={handleSelect} placeholder={ca ? 'Cercar operació...' : en ? 'Search operation...' : 'Buscar operación...'} />
    </div>
  )
}
