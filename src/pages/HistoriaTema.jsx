import { useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { EVENTOS_HISTORIA, calcularMargen } from '../data/historiaEvents'
import { PORTADAS } from '../data/portadas'
import { topicFormats, formatLevels, defaultLevel, TOPIC_CATALOG } from '../lib/topicCatalog'
import { useLang } from '../context/LangContext'
import PageMeta from '../components/PageMeta'
import CourseSchema from '../components/CourseSchema'
import BreadcrumbSchema from '../components/BreadcrumbSchema'

const NIVELES = {
  es: [
    { id: 'primaria', label: 'Primaria', emoji: '🎒' },
    { id: 'eso',      label: 'ESO',      emoji: '📖' },
    { id: 'bachillerato', label: 'Bachillerato', emoji: '🎓' },
  ],
  en: [
    { id: 'primaria', label: 'Primary', emoji: '🎒' },
    { id: 'eso',      label: 'Secondary', emoji: '📖' },
    { id: 'bachillerato', label: 'Sixth Form', emoji: '🎓' },
  ],
  ca: [
    { id: 'primaria', label: 'Primària', emoji: '🎒' },
    { id: 'eso',      label: 'ESO',      emoji: '📖' },
    { id: 'bachillerato', label: 'Batxillerat', emoji: '🎓' },
  ],
}

const TEMAS_META = {
  es: {
    primaria: { titulo: 'Grandes Hitos',          emoji: '🌍', descripcion: 'Los momentos más importantes que cambiaron el mundo.' },
    gce:      { titulo: 'Guerra Civil Española',   emoji: '⚔️', descripcion: 'De la Segunda República al franquismo, 1931–1978.' },
    wwii:     { titulo: 'Segunda Guerra Mundial',  emoji: '⚔️', descripcion: 'El conflicto más grande de la historia, 1939–1945.' },
    roma:     { titulo: 'Antigua Roma',            emoji: '🏛️', descripcion: 'Desde la fundación de Roma hasta la caída del Imperio.' },
    usa:      { titulo: 'Independencia Americana', emoji: '🦅', descripcion: 'De las colonias británicas a los Estados Unidos, 1773–1789.' },
    franquismo: { titulo: 'Franquismo y Transición', emoji: '🕊️', descripcion: 'De la dictadura de Franco a la Constitución de 1978, 1939–1982.' },
    prehistoria: { titulo: 'Prehistoria', emoji: '🦴', descripcion: 'Del Paleolítico al Neolítico: nómadas, fuego, agricultura y sedentarismo.' },
    'edad-media': { titulo: 'Edad Media', emoji: '🏰', descripcion: 'Feudalismo, Al-Ándalus y la Reconquista, 476–1492.' },
    'edad-moderna': { titulo: 'Edad Moderna', emoji: '⛵', descripcion: 'Reyes Católicos, Descubrimiento de América e Ilustración, 1492–1789.' },
  },
  en: {
    primaria: { titulo: 'Great Milestones',        emoji: '🌍', descripcion: 'The most important moments that changed the world.' },
    gce:      { titulo: 'Spanish Civil War',        emoji: '⚔️', descripcion: 'From the Second Republic to Franco, 1931–1978.' },
    wwii:     { titulo: 'World War II',             emoji: '⚔️', descripcion: 'The greatest conflict in history, 1939–1945.' },
    roma:     { titulo: 'Ancient Rome',             emoji: '🏛️', descripcion: 'From the founding of Rome to the fall of the Empire.' },
    usa:      { titulo: 'American Independence',    emoji: '🦅', descripcion: 'From the British colonies to the United States, 1773–1789.' },
    franquismo: { titulo: 'Francoism & Transition', emoji: '🕊️', descripcion: 'From Franco\'s dictatorship to the 1978 Constitution, 1939–1982.' },
    prehistoria: { titulo: 'Prehistory', emoji: '🦴', descripcion: 'From the Palaeolithic to the Neolithic: nomads, fire, agriculture and settled life.' },
    'edad-media': { titulo: 'The Middle Ages', emoji: '🏰', descripcion: 'Feudalism, Al-Andalus and the Reconquista, 476–1492.' },
    'edad-moderna': { titulo: 'The Early Modern Period', emoji: '⛵', descripcion: 'The Catholic Monarchs, the discovery of America and the Enlightenment, 1492–1789.' },
  },
  ca: {
    primaria: { titulo: 'Grans Fites',              emoji: '🌍', descripcion: 'Els moments més importants que van canviar el món.' },
    gce:      { titulo: 'Guerra Civil Espanyola',    emoji: '⚔️', descripcion: 'De la Segona República al franquisme, 1931–1978.' },
    wwii:     { titulo: 'Segona Guerra Mundial',     emoji: '⚔️', descripcion: 'El conflicte més gran de la història, 1939–1945.' },
    roma:     { titulo: 'Antiga Roma',               emoji: '🏛️', descripcion: 'Des de la fundació de Roma fins a la caiguda de l\'Imperi.' },
    usa:      { titulo: 'Independència Americana',   emoji: '🦅', descripcion: 'De les colònies britàniques als Estats Units, 1773–1789.' },
    franquismo: { titulo: 'Franquisme i Transició', emoji: '🕊️', descripcion: 'De la dictadura de Franco a la Constitució del 1978, 1939–1982.' },
    prehistoria: { titulo: 'Prehistòria', emoji: '🦴', descripcion: 'Del Paleolític al Neolític: nòmades, foc, agricultura i sedentarisme.' },
    'edad-media': { titulo: 'Edat Mitjana', emoji: '🏰', descripcion: 'Feudalisme, Al-Àndalus i la Reconquesta, 476–1492.' },
    'edad-moderna': { titulo: 'Edat Moderna', emoji: '⛵', descripcion: 'Reis Catòlics, Descobriment d\'Amèrica i Il·lustració, 1492–1789.' },
  },
}

// Qué formatos y niveles existen para cada tema sale del catálogo único
// (src/lib/topicCatalog.js), el mismo que usa el profesor al asignar tareas:
// aquí solo se decide CÓMO se ve cada tarjeta, no CUÁL está disponible.

export default function HistoriaTema() {
  const navigate       = useNavigate()
  const location       = useLocation()
  const { lang, localPath } = useLang()
  const { categoria }  = useParams()
  const temasMeta      = TEMAS_META[lang] || TEMAS_META.es
  const nivelesArr     = NIVELES[lang] || NIVELES.es
  const meta           = temasMeta[categoria]
  const [nivel, setNivel] = useState(location.state?.nivel || defaultLevel('historia', categoria) || 'primaria')

  const en = lang === 'en'
  const ca = lang === 'ca'

  if (!meta) { navigate(localPath('/estudiar/historia')); return null }

  const pageMeta = <PageMeta title={meta.titulo} description={meta.descripcion} path={`/estudiar/historia/${categoria}`} lang={lang} />
  const courseSchema = <CourseSchema name={meta.titulo} description={meta.descripcion} path={`/estudiar/historia/${categoria}`} lang={lang} subject={en ? 'History' : ca ? 'Història' : 'Historia'} />
  const breadcrumb = <BreadcrumbSchema lang={lang} items={[
    { name: en ? 'Study' : ca ? 'Estudiar' : 'Estudiar', path: '/estudiar' },
    { name: en ? 'History' : ca ? 'Història' : 'Historia', path: '/estudiar/historia' },
    { name: meta.titulo, path: `/estudiar/historia/${categoria}` },
  ]} />

  // Niveles y formatos disponibles: los decide el catálogo único
  const nivelesTema = TOPIC_CATALOG.historia.temas[categoria]?.niveles ?? []
  const nivelesDisponibles = nivelesArr.filter(n => nivelesTema.includes(n.id))
  const formatosDisponibles = new Set(topicFormats('historia', categoria).map(f => f.id))
  const disponible = id => formatosDisponibles.has(id) &&
    (formatLevels('historia', categoria, id).length === 0 || formatLevels('historia', categoria, id).includes(nivel))

  const eventos = EVENTOS_HISTORIA.filter(e =>
    e.categoria === categoria && (!e.nivel || e.nivel.includes(nivel))
  )
  const margen  = calcularMargen(categoria, nivel)

  const ltConfig = nivel === 'primaria'
    ? { lives: 5, winAt: Math.min(10, eventos.length), livesLabel: ca ? '5 vides' : en ? '5 lives' : '5 vidas', winLabel: ca ? `Col·loca ${Math.min(10, eventos.length)} → Aprovat` : en ? `Place ${Math.min(10, eventos.length)} → Pass` : `Coloca ${Math.min(10, eventos.length)} → Apruebas` }
    : { lives: 3, winAt: null, livesLabel: ca ? '3 vides' : en ? '3 lives' : '3 vidas', winLabel: ca ? `Col·loca ${eventos.length} → Aprovat` : en ? `Place ${eventos.length} → Pass` : `Coloca ${eventos.length} → Apruebas` }

  const portadasDelTema = PORTADAS.filter(p => p.temas?.includes(categoria))

  const modos = [
    // Hasta ahora TODOS los temas de historia tenían Línea del Tiempo, así que
    // nunca hizo falta comprobar disponible('linea-temporal') aquí (a
    // diferencia de las otras tres). Franquismo es el primer tema sin eventos
    // reales — sin este guard se ofrecería un juego vacío (0 eventos).
    disponible('linea-temporal') && {
      id: 'linea',
      titulo: ca ? 'Línia del Temps' : en ? 'Timeline' : 'Línea del Tiempo',
      descripcion: ca ? 'Col·loca els esdeveniments en ordre cronològic sense veure l\'any. Pura intuïció històrica.' : en ? 'Place events in chronological order without seeing the year. Pure historical intuition.' : 'Coloca los eventos en orden cronológico sin ver el año. Solo intuición histórica.',
      emoji: '📜',
      gradient: 'from-violet-600 to-indigo-700',
      detalles: [ltConfig.livesLabel, ltConfig.winLabel, `${eventos.length} ${ca ? 'esdeveniments' : en ? 'events' : 'eventos'}`],
      action: () => navigate(localPath('/examen/linea-temporal'), {
        state: { categoria, nivel, backPath: `/estudiar/historia/${categoria}` }
      }),
    },
    disponible('quien-es-quien') && {
      id: 'personajes',
      titulo: ca ? 'Qui és qui?' : en ? 'Who is Who?' : '¿Quién es quién?',
      descripcion: ca ? 'Ratlla personatges amb cada pista fins a endevinar el secret. Les pistes canvien a cada partida.' : en ? 'Cross out figures with each clue until you guess the secret one. Clues change every game.' : 'Tacha personajes con cada pista hasta adivinar al secreto. Las pistas cambian en cada partida.',
      emoji: '🕵️',
      gradient: 'from-violet-700 to-purple-900',
      detalles: [ca ? '12 personatges per partida' : en ? '12 figures per game' : '12 personajes por partida', ca ? '300 pts si encertes a la 1a pista' : en ? '300 pts on 1st clue' : '300 pts si aciertas a la 1ª pista', ca ? '2 intents' : en ? '2 attempts' : '2 intentos'],
      action: () => navigate(localPath('/juegos/quien-es-quien'), {
        state: { pool: categoria, backPath: `/estudiar/historia/${categoria}` }
      }),
    },
    disponible('portadas') && {
      id: 'portadas',
      titulo: ca ? 'Portades' : en ? 'Headlines' : 'Portadas',
      descripcion: ca ? 'Llegeix titulars reals de diaris històrics i decideix si són veritat o mentida. 10 portades, nota al final.' : en ? 'Read real historical newspaper headlines and decide if they are true or false. 10 headlines, graded.' : 'Lee titulares reales de periódicos históricos y decide si son verdad o mentira. 10 portadas, nota al final.',
      emoji: '📰',
      gradient: 'from-stone-600 to-neutral-800',
      detalles: [`${portadasDelTema.length} ${ca ? 'titulars' : en ? 'headlines' : 'titulares'}`, `10 ${ca ? 'per examen' : en ? 'per exam' : 'por examen'}`, ca ? 'Veritat o mentida' : en ? 'True or false' : 'Verdad o mentira'],
      action: () => navigate(localPath('/examen/portadas'), {
        state: { categoria, backPath: `/estudiar/historia/${categoria}` }
      }),
    },
    disponible('juego-fechas') && {
      id: 'fechas',
      titulo: ca ? 'Joc de Dates' : en ? 'Date Game' : 'Juego de Fechas',
      descripcion: ca ? `Escriu l'any exacte de cada esdeveniment. Marge de ±${margen} anys. Una vida.` : en ? `Write the exact year of each event. Margin of ±${margen} years. One life.` : `Escribe el año exacto de cada evento. Margen de ±${margen} años. Una vida.`,
      emoji: '📅',
      gradient: 'from-amber-500 to-orange-600',
      detalles: [ca ? '1 vida' : en ? '1 life' : '1 vida', `±${margen} ${ca ? 'anys de marge' : en ? 'years margin' : 'años de margen'}`, `${eventos.length} ${ca ? 'preguntes' : en ? 'questions' : 'preguntas'}`],
      action: () => navigate(localPath('/examen/historia'), {
        state: {
          examen: { id: categoria, ...meta },
          nivel,
          backPath: `/estudiar/historia/${categoria}`,
        }
      }),
    },
    // El id del examen ES la categoria (gce, wwii, roma, usa, primaria): ver
    // topicCatalog.js. A diferencia de los otros tres modos (una sola página
    // compartida por todos los temas), cada tema tiene aquí su propia página
    // de examen — por eso navega a /examen/<categoria> en vez de a una ruta fija.
    disponible('teoria') && {
      id: 'teoria',
      titulo: ca ? 'Teoria (tipus test)' : en ? 'Theory (quiz)' : 'Teoría (tipo test)',
      descripcion: ca ? '10 preguntes tipus test amb explicació a cada resposta. Nota al final.' : en ? '10 multiple-choice questions with an explanation for every answer. Graded at the end.' : '10 preguntas tipo test con explicación en cada respuesta. Nota al final.',
      emoji: '📝',
      gradient: 'from-emerald-600 to-teal-800',
      detalles: [`10 ${ca ? 'preguntes' : en ? 'questions' : 'preguntas'}`, ca ? 'Explicació a cada resposta' : en ? 'Explanation each answer' : 'Explicación en cada respuesta'],
      action: () => navigate(localPath(`/examen/${categoria}`), {
        state: { backPath: `/estudiar/historia/${categoria}` }
      }),
    },
  ].filter(Boolean)

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      {pageMeta}{courseSchema}{breadcrumb}

      {/* Breadcrumb + nivel switcher */}
      <div className="max-w-2xl mx-auto w-full mb-6">
        <p className="text-white/30 text-xs mb-4">
          <button onClick={() => navigate(localPath('/estudiar/historia'))} className="hover:text-white/60 transition-colors">{lang === 'ca' ? 'Història' : lang === 'en' ? 'History' : 'Historia'}</button>
          {' '}/{'  '}<span className="text-white/50">{meta.titulo}</span>
        </p>

        {/* Selector de nivel */}
        <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl w-fit">
          {nivelesDisponibles.map(n => (
            <button
              key={n.id}
              onClick={() => setNivel(n.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                nivel === n.id
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              <span className="text-base">{n.emoji}</span>
              <span className="hidden sm:inline">{n.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cabecera del tema */}
      <div className="max-w-2xl mx-auto w-full mb-6">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{meta.emoji}</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{meta.titulo}</h1>
            <p className="text-white/40 text-sm mt-0.5">{meta.descripcion}</p>
          </div>
        </div>
      </div>

      {/* Modos de juego */}
      <div className="max-w-2xl mx-auto w-full space-y-4">
        <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">
          {lang === 'ca' ? 'Modes disponibles' : lang === 'en' ? 'Available modes' : 'Modos disponibles'} · {nivelesArr.find(n => n.id === nivel)?.label}
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
          !disponible('quien-es-quien') && { id: 'personajes', titulo: 'Personatges Històrics', emoji: '👤', desc: 'Qui sóc? Endevina a partir de pistes.' },
          { id: 'mapas', titulo: 'Mapes Històrics', emoji: '🗺️', desc: 'Identifica territoris i batalles.' },
        ] : en ? [
          !disponible('quien-es-quien') && { id: 'personajes', titulo: 'Historical Figures', emoji: '👤', desc: 'Who am I? Guess from clues.' },
          { id: 'mapas', titulo: 'Historical Maps', emoji: '🗺️', desc: 'Identify territories and battles.' },
        ] : [
          !disponible('quien-es-quien') && { id: 'personajes', titulo: 'Personajes Históricos', emoji: '👤', desc: '¿Quién soy? Adivina a partir de pistas.' },
          { id: 'mapas', titulo: 'Mapas Históricos', emoji: '🗺️', desc: 'Identifica territorios y batallas.' },
        ]).filter(Boolean).map(m => (
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
