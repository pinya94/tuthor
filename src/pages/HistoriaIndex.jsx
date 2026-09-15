import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import TemarioGrid from '../components/TemarioGrid'
import SEOEstatico from '../components/SEOEstatico'

const TEMAS = [
  {
    id: 'primaria',
    titulo: 'Grandes Hitos de la Historia', tituloEn: 'Great Milestones of History', tituloCa: 'Grans Fites de la Història',
    subtitulo: 'Los momentos que cambiaron el mundo', subtituloEn: 'The moments that changed the world', subtituloCa: 'Els moments que van canviar el món',
    emoji: '🌍', gradient: 'from-emerald-500 to-teal-700',
    tags: ['universal', 'básico', 'fácil'], niveles: ['primaria'],
  },
  {
    id: 'gce',
    titulo: 'Guerra Civil Española', tituloEn: 'Spanish Civil War', tituloCa: 'Guerra Civil Espanyola',
    subtitulo: 'De la República al franquismo — 1931–1978', subtituloEn: 'From the Republic to Franco — 1931–1978', subtituloCa: 'De la República al franquisme — 1931–1978',
    emoji: '⚔️', gradient: 'from-red-600 to-rose-800',
    tags: ['españa', 'siglo xx', 'conflicto'], niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'wwii',
    titulo: 'Segunda Guerra Mundial', tituloEn: 'World War II', tituloCa: 'Segona Guerra Mundial',
    subtitulo: 'El conflicto que cambió el mundo — 1939–1945', subtituloEn: 'The conflict that changed the world — 1939–1945', subtituloCa: 'El conflicte que va canviar el món — 1939–1945',
    emoji: '⚔️', gradient: 'from-slate-600 to-zinc-800',
    tags: ['universal', 'siglo xx', 'conflicto'], niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'roma',
    titulo: 'Antigua Roma', tituloEn: 'Ancient Rome', tituloCa: 'Antiga Roma',
    subtitulo: 'De Rómulo a la caída del Imperio — 753 a.C.–476 d.C.', subtituloEn: 'From Romulus to the fall of the Empire — 753 BC–476 AD', subtituloCa: 'De Ròmul a la caiguda de l\'Imperi — 753 aC–476 dC',
    emoji: '🏛️', gradient: 'from-amber-600 to-orange-800',
    tags: ['antigua', 'europa', 'imperio'], niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'usa',
    titulo: 'Independencia Americana', tituloEn: 'American Independence', tituloCa: 'Independència Americana',
    subtitulo: 'De las colonias a los Estados Unidos — 1773–1789', subtituloEn: 'From the colonies to the United States — 1773–1789', subtituloCa: 'De les colònies als Estats Units — 1773–1789',
    emoji: '🦅', gradient: 'from-blue-600 to-indigo-800',
    tags: ['moderna', 'américas', 'democracia'], niveles: ['bachillerato'],
  },
  // Faltaban aquí aunque tenían página, examen y ficha desde agosto: solo se
  // llegaba a ellos desde fuera del hub. Van en orden cronológico.
  {
    id: 'prehistoria',
    titulo: "Prehistoria", tituloEn: "Prehistory", tituloCa: "Prehistòria",
    subtitulo: "Del Paleolítico al Neolítico", subtituloEn: "From the Palaeolithic to the Neolithic", subtituloCa: "Del Paleolític al Neolític",
    emoji: '🦴', gradient: 'from-yellow-700 to-amber-900',
    tags: ['prehistoria', 'fuego', 'neolítico'], niveles: ['primaria', 'eso', 'bachillerato'],
  },

  {
    id: 'antigua',
    titulo: "Edad Antigua", tituloEn: "Antiquity", tituloCa: "Edat Antiga",
    subtitulo: "Mesopotamia, Egipto y Grecia", subtituloEn: "Mesopotamia, Egypt and Greece", subtituloCa: "Mesopotàmia, Egipte i Grècia",
    emoji: '🏛️', gradient: 'from-orange-500 to-amber-700',
    tags: ['antigua', 'egipto', 'grecia'], niveles: ['primaria', 'eso', 'bachillerato'],
  },

  {
    id: 'edad-media',
    titulo: "Edad Media", tituloEn: "The Middle Ages", tituloCa: "Edat Mitjana",
    subtitulo: "Feudalismo, Al-Ándalus y Reconquista — 476–1492", subtituloEn: "Feudalism, Al-Andalus and the Reconquista — 476–1492", subtituloCa: "Feudalisme, Al-Àndalus i Reconquesta — 476–1492",
    emoji: '🏰', gradient: 'from-stone-500 to-stone-800',
    tags: ['medieval', 'europa', 'españa'], niveles: ['primaria', 'eso', 'bachillerato'],
  },

  {
    id: 'edad-moderna',
    titulo: "Edad Moderna", tituloEn: "The Early Modern Period", tituloCa: "Edat Moderna",
    subtitulo: "De Colón a la Ilustración — 1492–1789", subtituloEn: "From Columbus to the Enlightenment — 1492–1789", subtituloCa: "De Colom a la Il·lustració — 1492–1789",
    emoji: '⛵', gradient: 'from-blue-800 to-cyan-950',
    tags: ['moderna', 'imperio', 'américas'], niveles: ['primaria', 'eso', 'bachillerato'],
  },

  {
    id: 'revolucion-francesa',
    titulo: "Revolución Francesa y Napoleón", tituloEn: "The French Revolution and Napoleon", tituloCa: "Revolució Francesa i Napoleó",
    subtitulo: "De la Bastilla a Waterloo — 1789–1815", subtituloEn: "From the Bastille to Waterloo — 1789–1815", subtituloCa: "De la Bastilla a Waterloo — 1789–1815",
    emoji: '⚜️', gradient: 'from-blue-700 to-red-800',
    tags: ['contemporánea', 'europa', 'revolución'], niveles: ['eso', 'bachillerato'],
  },

  {
    id: 'revolucion-industrial',
    titulo: "Revolución Industrial", tituloEn: "The Industrial Revolution", tituloCa: "Revolució Industrial",
    subtitulo: "Vapor, fábricas y obreros — siglos XVIII–XIX", subtituloEn: "Steam, factories and workers — 18th–19th centuries", subtituloCa: "Vapor, fàbriques i obrers — segles XVIII–XIX",
    emoji: '🏭', gradient: 'from-stone-600 to-zinc-900',
    tags: ['contemporánea', 'economía', 'sociedad'], niveles: ['eso', 'bachillerato'],
  },

  {
    id: 'primera-guerra-mundial',
    titulo: "Primera Guerra Mundial", tituloEn: "World War I", tituloCa: "Primera Guerra Mundial",
    subtitulo: "La Gran Guerra — 1914–1918", subtituloEn: "The Great War — 1914–1918", subtituloCa: "La Gran Guerra — 1914–1918",
    emoji: '🎖️', gradient: 'from-amber-800 to-stone-900',
    tags: ['universal', 'siglo xx', 'conflicto'], niveles: ['eso', 'bachillerato'],
  },

  {
    id: 'guerra-fria',
    titulo: "Guerra Fría", tituloEn: "The Cold War", tituloCa: "Guerra Freda",
    subtitulo: "Estados Unidos contra la URSS — 1947–1991", subtituloEn: "The United States versus the USSR — 1947–1991", subtituloCa: "Els Estats Units contra l'URSS — 1947–1991",
    emoji: '🚀', gradient: 'from-sky-800 to-slate-900',
    tags: ['universal', 'siglo xx', 'bloques'], niveles: ['eso', 'bachillerato'],
  },

  {
    id: 'franquismo',
    titulo: "Franquismo y Transición", tituloEn: "Francoism & Transition", tituloCa: "Franquisme i Transició",
    subtitulo: "De la dictadura a la Constitución — 1939–1982", subtituloEn: "From dictatorship to the Constitution — 1939–1982", subtituloCa: "De la dictadura a la Constitució — 1939–1982",
    emoji: '🕊️', gradient: 'from-red-800 to-yellow-800',
    tags: ['españa', 'siglo xx', 'democracia'], niveles: ['eso', 'bachillerato'],
  },
]

export default function HistoriaIndex() {
  const navigate = useNavigate()
  const { lang, localPath, lt } = useLang()

  const temas = TEMAS.map(t => ({ ...t, titulo: lt(t, 'titulo'), subtitulo: lt(t, 'subtitulo') }))

  function handleSelect(tema) {
    navigate(localPath(`/estudiar/historia/${tema.id}`))
  }

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <SEOEstatico path="/estudiar/historia" />
      <div className="text-center mb-6">
        <p className="text-white/40 text-sm mb-1">{lang === 'ca' ? 'Estudiar · Història' : lang === 'en' ? 'Study · History' : 'Estudiar · Historia'}</p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">{lang === 'ca' ? 'Tria un tema' : lang === 'en' ? 'Pick a topic' : 'Elige un tema'}</h1>
        <p className="text-white/40 mt-1 text-sm">{lang === 'ca' ? 'Selecciona quin període vols repassar' : lang === 'en' ? 'Select the period you want to revise' : 'Selecciona qué período quieres repasar'}</p>
      </div>

      <TemarioGrid items={temas} onSelect={handleSelect} placeholder={lang === 'ca' ? 'Cercar tema, època, país...' : lang === 'en' ? 'Search topic, era, country...' : 'Buscar tema, época, país...'} />
    </div>
  )
}
