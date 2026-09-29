import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import TemarioGrid from '../components/TemarioGrid'
import { MODOS, MODO_IDS } from '../lib/mathEngine'
import SEOEstatico from '../components/SEOEstatico'
import RecursosInteractivos from '../components/RecursosInteractivos'
import { ArteMateria } from '../components/arte/materias'
import { TEMAS_MATEMATICAS_EXTRA } from '../data/temasMatematicas'

// Examenes que van directo al examen (no usan el motor aritmético)
// Porcentajes tiene un solo formato, así que una página de tema intermedia
// solo enseñaría una tarjeta: la ficha del temario lleva directa al examen.
const EXAM_DIRECTO = {
  porcentajes: '/examen/porcentajes',
}

const EXTRAS = TEMAS_MATEMATICAS_EXTRA

export default function MatematicasIndex() {
  const navigate = useNavigate()
  const { lang, localPath, tr } = useLang()
  const en = lang === 'en'
  const ca = lang === 'ca'

  const ITEMS = [
    ...MODO_IDS.map(id => ({
      id,
      titulo: ca ? (MODOS[id].tituloCa || MODOS[id].titulo) : en ? (MODOS[id].tituloEn || MODOS[id].titulo) : MODOS[id].titulo,
      emoji: MODOS[id].emoji,
      gradient: MODOS[id].gradient,
      tags: MODOS[id].ops,
      arte: `matematicas/${id}`,
    })),
    ...EXTRAS.map(e => ({
      id: e.id,
      titulo: ca ? e.tituloCa : en ? e.tituloEn : e.titulo,
      emoji: e.emoji,
      gradient: e.gradient,
      tags: e.tags,
      arte: `matematicas/${e.id}`,
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
      <SEOEstatico path="/estudiar/matematicas" />
      <div className="text-center mb-6">
        <ArteMateria id="matematicas" />
        <p className="text-white/40 text-sm mb-1">{ca ? 'Estudiar · Matemàtiques' : en ? 'Study · Mathematics' : 'Estudiar · Matemáticas'}</p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">{ca ? 'Tria què practicar' : en ? 'Pick what to practise' : 'Elige qué practicar'}</h1>
        <p className="text-white/40 mt-1 text-sm">{ca ? 'Selecciona quina operació vols repassar' : en ? 'Select the operation you want to revise' : 'Selecciona qué operación quieres repasar'}</p>
      </div>

      <TemarioGrid items={ITEMS} onSelect={handleSelect} hrefDe={item => localPath(EXAM_DIRECTO[item.id] || `/estudiar/matematicas/${item.id}`)} placeholder={ca ? 'Cercar operació...' : en ? 'Search operation...' : 'Buscar operación...'} />

      {/* Los recursos de esta materia, después del temario, que es a lo que se
          viene a un hub: con varias tarjetas encima empujarían los temas fuera
          de la pantalla. */}
      <section className="max-w-3xl mx-auto w-full mt-10">
        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{tr({ es: 'Resolver mis ejercicios', en: 'Solve my exercises', ca: 'Resoldre els meus exercicis' })}</p>
        <RecursosInteractivos materia="matematicas" />
      </section>
    </div>
  )
}
