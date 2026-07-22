import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'

const MATERIAS = [
  { id: 'historia', titulo: 'Historia', tituloEn: 'History', tituloCa: 'Història', subtitulo: 'Eventos, épocas y personajes clave', subtituloEn: 'Key events, periods & figures', subtituloCa: 'Esdeveniments, èpoques i personatges clau', emoji: '🏛️', gradient: 'from-amber-500 to-orange-600', ready: true, path: '/estudiar/historia' },
  { id: 'geografia', titulo: 'Geografía', tituloEn: 'Geography', tituloCa: 'Geografia', subtitulo: 'Países, continentes y regiones', subtituloEn: 'Countries, continents & regions', subtituloCa: 'Països, continents i regions', emoji: '🌍', gradient: 'from-teal-500 to-cyan-600', ready: true, path: '/estudiar/geografia' },
  { id: 'quimica', titulo: 'Química', tituloEn: 'Chemistry', tituloCa: 'Química', subtitulo: 'Tabla periódica, materia, mezclas y átomos', subtituloEn: 'Periodic table, matter, mixtures and atoms', subtituloCa: 'Taula periòdica, matèria, mescles i àtoms', emoji: '⚗️', gradient: 'from-violet-500 to-purple-700', ready: true, path: '/estudiar/quimica' },
  { id: 'fisica', titulo: 'Física', tituloEn: 'Physics', tituloCa: 'Física', subtitulo: 'Fuerzas, energía, electricidad, ondas y luz', subtituloEn: 'Forces, energy, electricity, waves and light', subtituloCa: 'Forces, energia, electricitat, ones i llum', emoji: '⚡', gradient: 'from-yellow-500 to-orange-600', ready: true, path: '/estudiar/fisica' },
  { id: 'biologia', titulo: 'Biología', tituloEn: 'Biology', tituloCa: 'Biologia', subtitulo: 'Célula, cuerpo humano, seres vivos y genética', subtituloEn: 'Cell, human body, living things and genetics', subtituloCa: 'Cèl·lula, cos humà, éssers vius i genètica', emoji: '🧬', gradient: 'from-green-500 to-emerald-600', ready: true, path: '/estudiar/biologia' },
  { id: 'geologia', titulo: 'Geología y el Universo', tituloEn: 'Geology & the Universe', tituloCa: "Geologia i l'Univers", subtitulo: 'Rocas, minerales y el sistema solar', subtituloEn: 'Rocks, minerals and the solar system', subtituloCa: 'Roques, minerals i el sistema solar', emoji: '🪐', gradient: 'from-stone-500 to-neutral-700', ready: true, path: '/estudiar/geologia' },
  { id: 'matematicas', titulo: 'Matemáticas', tituloEn: 'Mathematics', tituloCa: 'Matemàtiques', subtitulo: 'Cálculo mental: sumas, restas, multiplicaciones y más', subtituloEn: 'Mental maths: add, subtract & more', subtituloCa: 'Càlcul mental: sumes, restes i més', emoji: '📐', gradient: 'from-blue-500 to-indigo-600', ready: true, path: '/estudiar/matematicas' },
  { id: 'espanol', titulo: 'Español', tituloEn: 'Spanish', tituloCa: 'Castellà', subtitulo: 'Gramática y ortografía del español', subtituloEn: 'Spanish grammar and spelling', subtituloCa: 'Gramàtica i ortografia del castellà', emoji: '✏️', gradient: 'from-red-500 to-yellow-500', ready: true, path: '/estudiar/idiomas/espanol' },
  { id: 'ingles', titulo: 'English', tituloEn: 'English', tituloCa: 'Anglès', subtitulo: 'Grammar: tenses, articles, passive...', subtituloEn: 'Grammar: tenses, articles, passive...', subtituloCa: 'Gramàtica: temps, articles, passiva...', emoji: '💬', gradient: 'from-blue-700 to-red-600', ready: true, path: '/estudiar/idiomas/ingles' },
  { id: 'economia', titulo: 'Economía', tituloEn: 'Economics', tituloCa: 'Economia', subtitulo: 'Finanzas personales: inflación, deuda, inversión', subtituloEn: 'Personal finance: inflation, debt, investing', subtituloCa: 'Finances personals: inflació, deute, inversió', emoji: '💰', gradient: 'from-amber-500 to-red-700', ready: true, path: '/estudiar/economia' },
  { id: 'musica', titulo: 'Música', tituloEn: 'Music', tituloCa: 'Música', subtitulo: 'Lectura de partituras y ritmo', subtituloEn: 'Sheet music reading and rhythm', subtituloCa: 'Lectura de partitures i ritme', emoji: '🎼', gradient: 'from-indigo-500 to-fuchsia-700', ready: true, path: '/estudiar/musica' },
  { id: 'vida-practica', titulo: 'Primeros Auxilios', tituloEn: 'First Aid', tituloCa: 'Primers Auxilis', subtitulo: 'Atragantamiento, quemaduras, desmayo y más', subtituloEn: 'Choking, burns, fainting and more', subtituloCa: 'Ennuegament, cremades, desmai i més', emoji: '🚑', gradient: 'from-red-500 to-rose-700', ready: true, path: '/estudiar/vida-practica' },
]

export default function Estudiar() {
  const navigate = useNavigate()
  const { lang, localPath, t } = useLang()

  const seoData = {
    es: { title: 'Estudiar — Historia, Geografía, Matemáticas', desc: 'Temarios interactivos y tests por niveles: Primaria, ESO y Bachillerato. Historia, geografía, ciencias, matemáticas, inglés y lengua.', path: '/estudiar' },
    en: { title: 'Study — History, Geography, Maths', desc: 'Interactive syllabuses and tests by level: Primary, Secondary and Sixth Form. History, geography, science, maths, English and Spanish.', path: '/en/estudiar' },
    ca: { title: 'Estudiar — Història, Geografia, Matemàtiques', desc: 'Temaris interactius i tests per nivells: Primària, ESO i Batxillerat. Història, geografia, ciències, matemàtiques, anglès i llengua.', path: '/ca/estudiar' },
  }[lang] || {}

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <SEOHead title={seoData.title} description={seoData.desc} path={seoData.path} lang={lang} />
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-white">{t('estudiar.titulo', '¿Qué quieres estudiar?')}</h1>
        <p className="text-white/40 mt-1 text-sm">{t('estudiar.subtitulo', 'Elige una materia para empezar')}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto w-full">
        {MATERIAS.map(m => (
          <button
            key={m.id}
            onClick={() => m.ready && navigate(localPath(m.path))}
            className={`group relative rounded-2xl overflow-hidden text-left transition-all duration-300 ${
              m.ready ? 'hover:scale-[1.03] hover:shadow-xl hover:shadow-black/40 cursor-pointer' : 'opacity-50 cursor-default'
            }`}
          >
            <div className={`bg-gradient-to-br ${m.gradient} p-5 h-full`}>
              {!m.ready && (
                <span className="absolute top-2 right-2 bg-black/40 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {lang === 'ca' ? 'Aviat' : lang === 'en' ? 'Soon' : 'Pronto'}
                </span>
              )}
              <span className="text-4xl block mb-2">{m.emoji}</span>
              <h3 className="font-black text-white text-base leading-tight">{lang === 'ca' ? m.tituloCa : lang === 'en' ? m.tituloEn : m.titulo}</h3>
              <p className="text-white/65 text-xs mt-1 leading-relaxed line-clamp-2">{lang === 'ca' ? m.subtituloCa : lang === 'en' ? m.subtituloEn : m.subtitulo}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
