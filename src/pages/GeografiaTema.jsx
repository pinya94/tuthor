import { useNavigate, useParams } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { PAISES } from '../data/paises'

const REGION_FILTER = {
  europa:  p => p.continente === 'Europa' || p.continente === 'Europa/Asia',
  america: p => p.continente === 'América',
  asia:    p => p.continente === 'Asia' || p.continente === 'Europa/Asia',
  africa:  p => p.continente === 'África',
  oceania: p => p.continente === 'Oceanía',
}

const TEMAS_META = {
  es: {
    europa:  { titulo: 'Europa',   emoji: '🇪🇺', descripcion: 'De Islandia a Chipre, pasando por los Balcanes y Escandinavia.' },
    america: { titulo: 'América',  emoji: '🌎', descripcion: 'Del Canadá a la Patagonia. Norte, Centro y Sudamérica.' },
    asia:    { titulo: 'Asia',     emoji: '🌏', descripcion: 'El continente más grande y diverso. De Japón a Turquía.' },
    africa:  { titulo: 'África',   emoji: '🌍', descripcion: 'De Marruecos a Sudáfrica. El continente más variado del planeta.' },
    oceania: { titulo: 'Oceanía',  emoji: '🏝️', descripcion: 'Australia, Nueva Zelanda y las islas del Pacífico.' },
  },
  en: {
    europa:  { titulo: 'Europe',       emoji: '🇪🇺', descripcion: 'From Iceland to Cyprus, through the Balkans and Scandinavia.' },
    america: { titulo: 'The Americas', emoji: '🌎', descripcion: 'From Canada to Patagonia. North, Central and South America.' },
    asia:    { titulo: 'Asia',         emoji: '🌏', descripcion: 'The largest and most diverse continent. From Japan to Turkey.' },
    africa:  { titulo: 'Africa',       emoji: '🌍', descripcion: 'From Morocco to South Africa. The most varied continent on the planet.' },
    oceania: { titulo: 'Oceania',      emoji: '🏝️', descripcion: 'Australia, New Zealand and the Pacific islands.' },
  },
  ca: {
    europa:  { titulo: 'Europa',       emoji: '🇪🇺', descripcion: 'D\'Islàndia a Xipre, passant pels Balcans i Escandinàvia.' },
    america: { titulo: 'Amèrica',      emoji: '🌎', descripcion: 'Del Canadà a la Patagònia. Nord, Centre i Sudamèrica.' },
    asia:    { titulo: 'Àsia',         emoji: '🌏', descripcion: 'El continent més gran i divers. Del Japó a Turquia.' },
    africa:  { titulo: 'Àfrica',       emoji: '🌍', descripcion: 'Del Marroc a Sud-àfrica. El continent més variat del planeta.' },
    oceania: { titulo: 'Oceania',      emoji: '🏝️', descripcion: 'Austràlia, Nova Zelanda i les illes del Pacífic.' },
  },
}

export default function GeografiaTema() {
  const navigate    = useNavigate()
  const { lang, localPath } = useLang()
  const en = lang === 'en'
  const ca = lang === 'ca'
  const { region }  = useParams()
  const temasMeta   = TEMAS_META[lang] || TEMAS_META.es
  const meta        = temasMeta[region]

  if (!meta) { navigate(localPath('/estudiar/geografia')); return null }

  const filter      = REGION_FILTER[region]
  const paisesCount = filter ? PAISES.filter(filter).length : 0
  const paisesMapaCount = filter ? PAISES.filter(p => filter(p) && p.area >= 30000).length : 0

  const modos = [
    {
      id: 'georush',
      titulo: 'GeoRush',
      descripcion: ca
        ? 'Endevina el país a partir de pistes geogràfiques, demogràfiques i històriques. 10 països per examen.'
        : en
        ? 'Guess the country from geographical, demographic and historical clues. 10 countries per exam.'
        : 'Adivina el país a partir de pistas geográficas, demográficas e históricas. 10 países por examen.',
      emoji: '🌍',
      gradient: 'from-teal-500 to-cyan-700',
      detalles: [`${paisesCount} ${ca ? 'països' : en ? 'countries' : 'países'}`, `10 ${ca ? 'per examen' : en ? 'per exam' : 'por examen'}`, `5 ${ca ? 'pistes mixtes' : en ? 'mixed clues' : 'pistas mixtas'} (3🔒 + 2🎁)`],
      action: () => navigate(localPath('/examen/geografia'), {
        state: { region, titulo: meta.titulo, backPath: `/estudiar/geografia/${region}` }
      }),
    },
    {
      id: 'geomapa',
      titulo: 'GeoMapa',
      descripcion: ca
        ? 'Identifica el país il·luminat al mapa mundial. Si falles, reps pistes: bandera i capital.'
        : en
        ? 'Identify the highlighted country on the world map. If you miss, you get hints: flag and capital.'
        : 'Identifica el país iluminado en el mapa mundial. Si fallas, recibes pistas: bandera y capital.',
      emoji: '🗺️',
      gradient: 'from-purple-500 to-violet-700',
      detalles: [`${paisesMapaCount} ${ca ? 'països' : en ? 'countries' : 'países'}`, `10 ${ca ? 'per examen' : en ? 'per exam' : 'por examen'}`, `3 ${ca ? 'intents per país' : en ? 'attempts per country' : 'intentos por país'}`],
      action: () => navigate(localPath('/examen/geomapa'), {
        state: { region, titulo: meta.titulo, backPath: `/estudiar/geografia/${region}` }
      }),
    },
  ]

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <div className="max-w-2xl mx-auto w-full mb-6">
        <p className="text-white/30 text-xs mb-4">
          <button onClick={() => navigate(localPath('/estudiar'))} className="hover:text-white/60 transition-colors">{ca ? 'Estudiar' : en ? 'Study' : 'Estudiar'}</button>
          {' '}/{' '}
          <button onClick={() => navigate(localPath('/estudiar/geografia'))} className="hover:text-white/60 transition-colors">{ca ? 'Geografia' : en ? 'Geography' : 'Geografía'}</button>
          {' '}/{' '}<span className="text-white/50">{meta.titulo}</span>
        </p>

        <div className="flex items-center gap-4">
          <span className="text-5xl">{meta.emoji}</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{meta.titulo}</h1>
            <p className="text-white/40 text-sm mt-0.5">{meta.descripcion}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full space-y-4">
        <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">
          {ca ? 'Modes disponibles' : en ? 'Available modes' : 'Modos disponibles'}
        </p>

        {modos.map(modo => (
          <button
            key={modo.id}
            onClick={modo.action}
            className="w-full group relative rounded-2xl overflow-hidden text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/40"
          >
            <div className={`bg-gradient-to-br ${modo.gradient} p-6`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">{modo.emoji}</span>
                    <h3 className="font-black text-white text-xl">{modo.titulo}</h3>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">{modo.descripcion}</p>
                  <div className="flex flex-wrap gap-2">
                    {modo.detalles.map(d => (
                      <span key={d} className="text-xs font-semibold bg-black/25 text-white/80 px-2.5 py-1 rounded-full border border-white/10">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
                    <span className="text-white font-black text-lg">→</span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}

        {/* Próximamente */}
        {(ca ? [
          { id: 'capitales', titulo: 'Capitals del Món', emoji: '🏙️', desc: 'Identifica la capital de cada país.' },
          { id: 'banderas', titulo: 'Banderes', emoji: '🏳️', desc: 'Reconeix els països per la seva bandera.' },
        ] : en ? [
          { id: 'capitales', titulo: 'World Capitals', emoji: '🏙️', desc: 'Identify the capital of each country.' },
          { id: 'banderas', titulo: 'Flags', emoji: '🏳️', desc: 'Recognise countries by their flag.' },
        ] : [
          { id: 'capitales', titulo: 'Capitales del Mundo', emoji: '🏙️', desc: 'Identifica la capital de cada país.' },
          { id: 'banderas', titulo: 'Banderas', emoji: '🏳️', desc: 'Reconoce los países por su bandera.' },
        ]).map(m => (
          <div key={m.id} className="w-full rounded-2xl bg-white/3 border border-white/8 p-5 opacity-50">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{m.emoji}</span>
              <div>
                <h3 className="font-bold text-white/60 text-base">{m.titulo}</h3>
                <p className="text-white/30 text-xs mt-0.5">{m.desc}</p>
              </div>
              <span className="ml-auto text-xs font-bold text-white/30 border border-white/15 px-2 py-0.5 rounded-full">{ca ? 'Aviat' : en ? 'Soon' : 'Pronto'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
