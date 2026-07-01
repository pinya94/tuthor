import { useNavigate, Link } from 'react-router-dom'
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
        <p className="text-white/40 text-sm mb-1">{ca ? 'Estudiar · Matemàtiques' : en ? 'Study · Mathematics' : 'Estudiar · Matemáticas'}</p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">{ca ? 'Tria què practicar' : en ? 'Pick what to practise' : 'Elige qué practicar'}</h1>
        <p className="text-white/40 mt-1 text-sm">{ca ? 'Selecciona quina operació vols repassar' : en ? 'Select the operation you want to revise' : 'Selecciona qué operación quieres repasar'}</p>
      </div>

      <TemarioGrid items={ITEMS} onSelect={handleSelect} placeholder={ca ? 'Cercar operació...' : en ? 'Search operation...' : 'Buscar operación...'} />

      {/* Funciones — Trayectoria exam */}
      <div className="max-w-3xl mx-auto w-full mt-6">
        <p className="text-white/30 text-xs uppercase tracking-widest mb-3">
          {ca ? 'Funcions' : en ? 'Functions' : 'Funciones'}
        </p>
        <Link to={localPath('/examen/trayectoria')}
          className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all">
          <span className="text-3xl">⚽</span>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-white text-base">
              {ca ? 'Funcions matemàtiques · Trayectoria' : en ? 'Mathematical functions · Trajectory' : 'Funciones matemáticas · Trayectoria'}
            </p>
            <p className="text-white/40 text-xs mt-0.5">
              {ca ? 'Rectes, paràboles i funcions a trossos · 10 preguntes · Sense temps'
                : en ? 'Lines, parabolas & piecewise functions · 10 questions · No time limit'
                : 'Rectas, parábolas y funciones a trozos · 10 preguntas · Sin tiempo'}
            </p>
          </div>
          <span className="text-white/30 text-lg">→</span>
        </Link>
      </div>
    </div>
  )
}
