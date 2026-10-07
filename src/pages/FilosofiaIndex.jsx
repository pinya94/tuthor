import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import { ArteMateria } from '../components/arte/materias'
import TarjetaArte from '../components/TarjetaArte'
import { ARTE_TEMAS } from '../components/arte/temas'

// Filosofía: dos temas por épocas, cada uno con su examen tipo test (ESO y
// Bachillerato, pensado para la PAU de Historia de la Filosofía).
const TEMAS = [
  {
    id: 'antigua-medieval', path: '/examen/filosofia-antigua',
    titulo: { es: 'Filosofía antigua y medieval', en: 'Ancient and medieval philosophy', ca: 'Filosofia antiga i medieval' },
    subtitulo: { es: 'De Tales a Ockham: Sócrates, Platón, Aristóteles, Agustín y Tomás', en: 'From Thales to Ockham: Socrates, Plato, Aristotle, Augustine and Aquinas', ca: 'De Tales a Ockham: Sòcrates, Plató, Aristòtil, Agustí i Tomàs' },
  },
  {
    id: 'moderna-contemporanea', path: '/examen/filosofia-moderna',
    titulo: { es: 'Filosofía moderna y contemporánea', en: 'Modern and contemporary philosophy', ca: 'Filosofia moderna i contemporània' },
    subtitulo: { es: 'De Descartes a Arendt: Hume, Kant, Marx, Nietzsche y Ortega', en: 'From Descartes to Arendt: Hume, Kant, Marx, Nietzsche and Ortega', ca: 'De Descartes a Arendt: Hume, Kant, Marx, Nietzsche i Ortega' },
  },
]

export default function FilosofiaIndex() {
  const { lang, localPath, tr } = useLang()
  const seo = {
    title: tr({ es: 'Filosofía — historia de la filosofía para la PAU', en: 'Philosophy — history of philosophy revision', ca: 'Filosofia — història de la filosofia per a la PAU' }),
    desc: tr({
      es: 'Historia de la Filosofía para Bachillerato y la PAU: de los presocráticos a Platón y Aristóteles, y de Descartes a Kant, Marx, Nietzsche y Ortega. Exámenes tipo test explicados.',
      en: 'History of philosophy for sixth form: from the Presocratics to Plato and Aristotle, and from Descartes to Kant, Marx, Nietzsche and Ortega. Explained multiple-choice quizzes.',
      ca: 'Història de la Filosofia per a Batxillerat i la PAU: dels presocràtics a Plató i Aristòtil, i de Descartes a Kant, Marx, Nietzsche i Ortega. Exàmens tipus test explicats.',
    }),
  }
  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <SEOHead title={seo.title} description={seo.desc} path="/estudiar/filosofia" lang={lang} />
      <div className="text-center mb-6">
        <ArteMateria id="filosofia" />
        <p className="text-white/40 text-sm mb-1">{tr({ es: 'Estudiar · Filosofía', en: 'Study · Philosophy', ca: 'Estudiar · Filosofia' })}</p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">{tr({ es: 'Elige una época', en: 'Pick a period', ca: 'Tria una època' })}</h1>
        <p className="text-white/40 mt-1 text-sm">{tr({ es: 'Autores, conceptos y tesis para ESO y Bachillerato', en: 'Authors, concepts and theses for secondary school', ca: 'Autors, conceptes i tesis per a ESO i Batxillerat' })}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto w-full">
        {TEMAS.map(t => (
          <TarjetaArte key={t.id} Arte={ARTE_TEMAS[`filosofia/${t.id}`]} titulo={tr(t.titulo)} sub={tr(t.subtitulo)} to={localPath(t.path)} />
        ))}
      </div>
    </div>
  )
}
