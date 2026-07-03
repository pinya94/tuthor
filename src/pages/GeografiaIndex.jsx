import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import TemarioGrid from '../components/TemarioGrid'

const TEMAS = [
  {
    id: 'espana',
    titulo: 'España', tituloEn: 'Spain', tituloCa: 'Espanya',
    subtitulo: 'Las 17 comunidades autónomas', subtituloEn: 'The 17 autonomous communities', subtituloCa: 'Les 17 comunitats autònomes',
    emoji: '🗺️', gradient: 'from-red-600 to-rose-800',
    tags: ['españa', 'comunidades', 'peninsula', 'spain', 'espanya'],
    niveles: ['primaria'],
  },
  {
    id: 'eeuu',
    titulo: 'Estados Unidos', tituloEn: 'United States', tituloCa: 'Estats Units',
    subtitulo: 'Los 50 estados americanos', subtituloEn: 'All 50 US states', subtituloCa: 'Els 50 estats americans',
    emoji: '🗽', gradient: 'from-blue-600 to-indigo-800',
    tags: ['estados unidos', 'usa', 'estados', 'north america', 'estats units'],
    niveles: ['primaria', 'eso'],
  },
  {
    id: 'europa',
    titulo: 'Europa', tituloEn: 'Europe', tituloCa: 'Europa',
    subtitulo: 'De Islandia a Chipre', subtituloEn: 'From Iceland to Cyprus', subtituloCa: "D'Islàndia a Xipre",
    emoji: '🇪🇺', gradient: 'from-teal-500 to-cyan-700',
    tags: ['europa', 'europe', 'países europeos', 'balcanes', 'escandinavia'],
    niveles: ['eso'],
  },
  {
    id: 'america',
    titulo: 'América', tituloEn: 'The Americas', tituloCa: 'Amèrica',
    subtitulo: 'Del Canadá a la Patagonia', subtituloEn: 'From Canada to Patagonia', subtituloCa: 'Del Canadà a la Patagònia',
    emoji: '🌎', gradient: 'from-emerald-500 to-teal-700',
    tags: ['america', 'americas', 'latinoamerica', 'sudamerica', 'norte', 'sur'],
    niveles: ['eso'],
  },
  {
    id: 'asia',
    titulo: 'Asia', tituloEn: 'Asia', tituloCa: 'Àsia',
    subtitulo: 'De Japón a Turquía', subtituloEn: 'From Japan to Turkey', subtituloCa: 'Del Japó a Turquia',
    emoji: '🌏', gradient: 'from-orange-500 to-amber-700',
    tags: ['asia', 'japon', 'china', 'india', 'oriente', 'japan', 'turkey'],
    niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'africa',
    titulo: 'África', tituloEn: 'Africa', tituloCa: 'Àfrica',
    subtitulo: 'De Marruecos a Sudáfrica', subtituloEn: 'From Morocco to South Africa', subtituloCa: 'Del Marroc a Sud-àfrica',
    emoji: '🌍', gradient: 'from-yellow-500 to-orange-700',
    tags: ['africa', 'marruecos', 'nigeria', 'egipto', 'sahara', 'morocco'],
    niveles: ['bachillerato'],
  },
  {
    id: 'oceania',
    titulo: 'Oceanía', tituloEn: 'Oceania', tituloCa: 'Oceania',
    subtitulo: 'Australia y el Pacífico', subtituloEn: 'Australia and the Pacific', subtituloCa: "Austràlia i el Pacífic",
    emoji: '🏝️', gradient: 'from-cyan-500 to-sky-700',
    tags: ['oceania', 'australia', 'pacifico', 'nueva zelanda', 'pacific', 'new zealand'],
    niveles: ['bachillerato'],
  },
]

export default function GeografiaIndex() {
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
          {ca ? 'Estudiar · Geografia' : en ? 'Study · Geography' : 'Estudiar · Geografía'}
        </p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {ca ? 'Tria una regió' : en ? 'Pick a region' : 'Elige una región'}
        </h1>
        <p className="text-white/40 mt-1 text-sm">
          {ca ? 'Selecciona quina zona del món vols repassar'
            : en ? 'Select the part of the world you want to revise'
            : 'Selecciona qué zona del mundo quieres repasar'}
        </p>
      </div>

      <TemarioGrid
        items={items}
        onSelect={item => navigate(localPath(`/estudiar/geografia/${item.id}`))}
        placeholder={ca ? 'Cercar regió, país...' : en ? 'Search region, country...' : 'Buscar región, país...'}
      />
    </div>
  )
}
