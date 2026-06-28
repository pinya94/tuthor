import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import TemarioGrid from '../components/TemarioGrid'
import { MODOS, MODO_IDS } from '../lib/mathEngine'

export default function MatematicasIndex() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const en = lang === 'en'
  const ca = lang === 'ca'

  const ITEMS = MODO_IDS.map(id => ({
    id,
    titulo: ca ? (MODOS[id].tituloCa || MODOS[id].titulo) : en ? (MODOS[id].tituloEn || MODOS[id].titulo) : MODOS[id].titulo,
    emoji: MODOS[id].emoji,
    gradient: MODOS[id].gradient,
    tags: MODOS[id].ops,
  }))

  function handleSelect(item) {
    navigate(localPath(`/estudiar/matematicas/${item.id}`))
  }

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <div className="text-center mb-6">
        <p className="text-white/40 text-sm mb-1">{ca ? 'Estudiar · Matemàtiques' : lang === 'en' ? 'Study · Mathematics' : 'Estudiar · Matemáticas'}</p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">{ca ? 'Tria què practicar' : lang === 'en' ? 'Pick what to practise' : 'Elige qué practicar'}</h1>
        <p className="text-white/40 mt-1 text-sm">{ca ? 'Selecciona quina operació vols repassar' : lang === 'en' ? 'Select the operation you want to revise' : 'Selecciona qué operación quieres repasar'}</p>
      </div>

      <TemarioGrid items={ITEMS} onSelect={handleSelect} placeholder={ca ? 'Cercar operació...' : lang === 'en' ? 'Search operation...' : 'Buscar operación...'} />
    </div>
  )
}
