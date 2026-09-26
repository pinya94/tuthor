import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import AdSlot from '../components/AdSlot'
import { FICHAS_ES, FICHAS_EN, FICHAS_CA } from '../data/infoJuegosFichas'

// Superficie oscura casi opaca: legibilidad sobre el fondo del bosque
const SURF = 'rgba(17,20,29,0.86)'

const DATA = {
  es: {
    h1: 'Juegos Educativos Online',
    intro: 'Herramientas interactivas diseñadas por docentes para facilitar el estudio de asignaturas clave en Primaria, Secundaria y Bachillerato.',
    body: 'Nuestro método combina la ciencia pedagógica con la gamificación para mejorar el rendimiento escolar desde casa. Cada juego activa habilidades cognitivas reales mientras el alumno se divierte.',
    proximamente: 'Más juegos — Próximamente',
    proximamenteTexto: 'Seguimos ampliando el catálogo con nuevas mecánicas para todas las asignaturas. Todos los juegos siguen el mismo enfoque: aprender jugando, con base científica y adaptados a los temarios oficiales.',
    cta: 'Ir a jugar ahora →',
    verMas: 'Ver beneficios y jugar →',
  },
  en: {
    h1: 'Online Educational Games',
    intro: 'Interactive tools designed by teachers to make studying key subjects in Primary, Secondary and Sixth Form easier.',
    body: 'Our method combines pedagogical science with gamification to improve school performance from home. Every game activates real cognitive skills while the student has fun.',
    proximamente: 'More games — Coming soon',
    proximamenteTexto: 'We keep expanding the catalogue with new mechanics for every subject. All games follow the same approach: learning through play, evidence-based and aligned with official syllabuses.',
    cta: 'Start playing now →',
    verMas: 'See benefits & play →',
  },
  ca: {
    h1: 'Jocs Educatius en Línia',
    intro: 'Eines interactives dissenyades per docents per facilitar l\'estudi d\'assignatures clau a Primària, Secundària i Batxillerat.',
    body: 'El nostre mètode combina la ciència pedagògica amb la gamificació per millorar el rendiment escolar des de casa. Cada joc activa habilitats cognitives reals mentre l\'alumne es diverteix.',
    proximamente: 'Més jocs — Pròximament',
    proximamenteTexto: 'Seguim ampliant el catàleg amb noves mecàniques per a totes les assignatures. Tots els jocs segueixen el mateix enfocament: aprendre jugant, amb base científica i adaptats als temaris oficials.',
    cta: 'Anar a jugar ara →',
    verMas: 'Veure beneficis i jugar →',
  },
}

// Orden y textos de cada categoría. Las tarjetas se derivan del registro de
// fichas (infoJuegosFichas), agrupadas por la materia normalizada: así toda
// ficha —presente o futura— queda enlazada desde el hub, sin listas a mano.
const CATS = [
  { key: 'matematicas',
    es: { t: 'Matemáticas y Cálculo Mental', e: '📐', x: 'El bloque de matemáticas está diseñado para desarrollar la agilidad numérica y romper la barrera ante el cálculo abstracto. A través de mecánicas de puzzle y roguelike, los estudiantes interiorizan operaciones aritméticas de forma natural.' },
    en: { t: 'Maths & Mental Arithmetic', e: '📐', x: 'The maths module is designed to build numerical agility and break through the barrier of abstract calculation. Through puzzle and roguelike mechanics, students internalise arithmetic operations naturally.' },
    ca: { t: 'Matemàtiques i Càlcul Mental', e: '📐', x: 'El bloc de matemàtiques està dissenyat per desenvolupar l\'agilitat numèrica i trencar la barrera davant el càlcul abstracte. A través de mecàniques de puzzle i roguelike, els estudiants interioritzen operacions aritmètiques de forma natural.' } },
  { key: 'lengua',
    es: { t: 'Lengua e Idiomas', e: '🔍', x: 'Trabajar vocabulario, categorías gramaticales y ortografía de forma activa es mucho más eficaz que estudiar listas de palabras. Nuestros juegos de lengua plantean retos contextualizados que refuerzan el español, el catalán y el inglés.' },
    en: { t: 'Language & Grammar', e: '🔍', x: 'Actively working on vocabulary, word classes and spelling is far more effective than studying word lists. Our language games present contextualised challenges that reinforce Spanish, Catalan and English.' },
    ca: { t: 'Llengua i Idiomes', e: '🔍', x: 'Treballar vocabulari, categories gramaticals i ortografia de forma activa és molt més eficaç que estudiar llistes de paraules. Els nostres jocs de llengua plantegen reptes contextualitzats que reforcen el català, el castellà i l\'anglès.' } },
  { key: 'historia',
    es: { t: 'Historia y Ciencias Sociales', e: '⏳', x: 'Aprender fechas, contextos y personajes históricos no tiene por qué ser memorización pasiva. Nuestros juegos convierten los temarios oficiales en experiencias interactivas que fijan los conceptos de forma duradera.' },
    en: { t: 'History & Social Sciences', e: '⏳', x: 'Learning dates, contexts and historical figures does not have to be passive memorisation. Our games turn official syllabuses into interactive experiences that make concepts stick.' },
    ca: { t: 'Història i Ciències Socials', e: '⏳', x: 'Aprendre dates, contextos i personatges històrics no ha de ser memorització passiva. Els nostres jocs converteixen els temaris oficials en experiències interactives que fixen els conceptes de forma duradora.' } },
  { key: 'geografia',
    es: { t: 'Geografía', e: '🌍', x: 'La geografía cobra vida cuando tienes que pensar rápido. Aprende países, continentes, ríos y montañas a través de pistas progresivas que te obligan a conectar datos geográficos en tiempo real.' },
    en: { t: 'Geography', e: '🌍', x: 'Geography comes alive when you have to think fast. Learn countries, continents, rivers and mountains through progressive clues that force you to connect geographical data in real time.' },
    ca: { t: 'Geografia', e: '🌍', x: 'La geografia pren vida quan has de pensar ràpid. Aprèn països, continents, rius i muntanyes a través de pistes progressives que t\'obliguen a connectar dades geogràfiques en temps real.' } },
  { key: 'biologia',
    es: { t: 'Ciencias Naturales', e: '🔬', x: 'La biología y la geología se entienden mirando: la célula, los órganos, las cadenas alimentarias o el interior de la Tierra. Nuestros juegos convierten esos contenidos en retos visuales donde el alumno localiza, clasifica y predice en lugar de memorizar.' },
    en: { t: 'Natural Sciences', e: '🔬', x: 'Biology and geology are understood by looking: the cell, the organs, food chains or the inside of the Earth. Our games turn that content into visual challenges where the student locates, classifies and predicts instead of memorising.' },
    ca: { t: 'Ciències Naturals', e: '🔬', x: 'La biologia i la geologia s\'entenen mirant: la cèl·lula, els òrgans, les cadenes alimentàries o l\'interior de la Terra. Els nostres jocs converteixen aquests continguts en reptes visuals on l\'alumne localitza, classifica i prediu en lloc de memoritzar.' } },
  { key: 'fisica',
    es: { t: 'Física y Fuerzas', e: '🧭', x: 'La física se entiende mejor viéndola. Nuestros juegos convierten conceptos como las fuerzas, los vectores y el equilibrio en retos visuales donde el alumno predice el resultado y comprueba al instante si acertó.' },
    en: { t: 'Physics & Forces', e: '🧭', x: 'Physics is best understood by seeing it. Our games turn concepts like forces, vectors and equilibrium into visual challenges where the student predicts the outcome and checks instantly whether they were right.' },
    ca: { t: 'Física i Forces', e: '🧭', x: 'La física s\'entén millor veient-la. Els nostres jocs converteixen conceptes com les forces, els vectors i l\'equilibri en reptes visuals on l\'alumne prediu el resultat i comprova a l\'instant si ha encertat.' } },
  { key: 'quimica',
    es: { t: 'Química y Reacciones', e: '⚗️', x: 'Ajustar ecuaciones químicas suele ser puro cálculo abstracto. Nuestros juegos lo convierten en equilibrar una balanza: el alumno cambia los coeficientes y ve, elemento a elemento, cómo se cumple la ley de conservación de la masa.' },
    en: { t: 'Chemistry & Reactions', e: '⚗️', x: 'Balancing chemical equations is usually pure abstract calculation. Our games turn it into balancing a scale: the student changes the coefficients and sees, element by element, how the law of conservation of mass is met.' },
    ca: { t: 'Química i Reaccions', e: '⚗️', x: 'Ajustar equacions químiques sol ser pur càlcul abstracte. Els nostres jocs ho converteixen en equilibrar una balança: l\'alumne canvia els coeficients i veu, element a element, com es compleix la llei de conservació de la massa.' } },
  { key: 'economia',
    es: { t: 'Economía y Finanzas Personales', e: '💰', x: 'Entender el dinero de verdad requiere tomar decisiones, no memorizar definiciones. Nuestro simulador de vida financiera enseña inflación, interés compuesto, deuda y señales de estafa jugando una vida entera.' },
    en: { t: 'Economics & Personal Finance', e: '💰', x: 'Truly understanding money takes making decisions, not memorising definitions. Our financial life simulator teaches inflation, compound interest, debt and scam signals by playing out a whole life.' },
    ca: { t: 'Economia i Finances Personals', e: '💰', x: 'Entendre els diners de debò requereix prendre decisions, no memoritzar definicions. El nostre simulador de vida financera ensenya inflació, interès compost, deute i senyals d\'estafa jugant una vida sencera.' } },
  { key: 'musica',
    es: { t: 'Música', e: '🎼', x: 'Leer un pentagrama se aprende leyendo, no memorizando. Nuestro juego pone las notas en el piano de pantalla y el alumno las toca a contrarreloj, convirtiendo la lectura musical en un reflejo.' },
    en: { t: 'Music', e: '🎼', x: 'Reading a musical staff is learned by reading, not memorising. Our game puts the notes on the on-screen piano and the student plays them against the clock, turning music reading into a reflex.' },
    ca: { t: 'Música', e: '🎼', x: 'Llegir un pentagrama s\'aprèn llegint, no memoritzant. El nostre joc posa les notes al piano de pantalla i l\'alumne les toca a contrarellotge, convertint la lectura musical en un reflex.' } },
  { key: 'vida',
    es: { t: 'Vida Práctica', e: '🚑', x: 'Algunas cosas hay que tenerlas por reflejo. Nuestros juegos de vida práctica ponen al alumno ante emergencias reales a contrarreloj para que los primeros auxilios se conviertan en decisiones automáticas.' },
    en: { t: 'Life Skills', e: '🚑', x: 'Some things you need as a reflex. Our life-skills games put the student in front of real emergencies against the clock so first aid becomes an automatic decision.' },
    ca: { t: 'Vida Pràctica', e: '🚑', x: 'Algunes coses cal tenir-les per reflex. Els nostres jocs de vida pràctica posen l\'alumne davant d\'emergències reals a contrarellotge perquè els primers auxilis es converteixin en decisions automàtiques.' } },
]

// Normaliza el texto libre de `asignatura` (variable entre fichas e idiomas) a
// la clave de categoría. Si aparece una materia nueva sin mapear, el test de
// invariantes (registries) lo caza; en runtime cae en la última categoría.
export const SUBJECT_OF = {
  // Matemáticas
  'Matemáticas': 'matematicas', 'Mathematics': 'matematicas', 'Matemàtiques': 'matematicas',
  // Lengua e idiomas
  'Lengua': 'lengua', 'Inglés': 'lengua', 'Lengua e Idiomas': 'lengua',
  'Language': 'lengua', 'Languages': 'lengua', 'English': 'lengua', 'Spanish language': 'lengua',
  'Llengua': 'lengua', 'Anglès': 'lengua', 'Llengua i Idiomes': 'lengua',
  // Historia
  'Historia': 'historia', 'History': 'historia', 'Història': 'historia',
  // Geografía
  'Geografía': 'geografia', 'Geography': 'geografia', 'Geografia': 'geografia',
  // Ciencias naturales (biología + geología)
  'Biología': 'biologia', 'Biology': 'biologia', 'Biologia': 'biologia',
  'Geología': 'biologia', 'Geology': 'biologia', 'Geologia': 'biologia',
  // Física
  'Física': 'fisica', 'Physics': 'fisica',
  // Química
  'Química': 'quimica', 'Chemistry': 'quimica',
  // Economía
  'Economía': 'economia', 'Economics': 'economia', 'Economia': 'economia',
  // Música
  'Música': 'musica', 'Music': 'musica',
  // Vida práctica
  'Vida Práctica': 'vida', 'Life Skills': 'vida', 'Vida Pràctica': 'vida',
}

export function subjectKeyDe(asignatura) {
  return SUBJECT_OF[asignatura] || CATS[CATS.length - 1].key
}

// Agrupa las fichas de un idioma por categoría, respetando el orden de CATS.
export function agrupaFichas(fichas) {
  const porCat = {}
  for (const [slug, f] of Object.entries(fichas)) {
    const key = subjectKeyDe(f.asignatura)
    ;(porCat[key] ||= []).push({ slug, titulo: f.titulo, desc: f.subtitulo, emoji: f.emoji, gradient: f.gradient, tag: f.asignatura })
  }
  for (const key in porCat) porCat[key].sort((a, b) => a.titulo.localeCompare(b.titulo))
  return CATS.map(c => ({ cat: c, juegos: porCat[c.key] || [] })).filter(g => g.juegos.length)
}

export default function InfoJuegosHub() {
  const { lang, localPath } = useLang()
  const d = DATA[lang] || DATA.es
  const L = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const fichas = lang === 'ca' ? FICHAS_CA : lang === 'en' ? FICHAS_EN : FICHAS_ES
  const grupos = agrupaFichas(fichas)

  const seoHub = {
    es: { title: 'Guía de Juegos Educativos', desc: 'Descubre todos los juegos educativos de Tuthor: matemáticas, lengua, historia, geografía, ciencias, física y química. Beneficios pedagógicos, ejemplos y cómo jugar sin pantallas.' },
    en: { title: 'Educational Games Guide', desc: 'Discover all Tuthor educational games: maths, language, history, geography, science, physics and chemistry. Pedagogical benefits, examples and how to play without screens.' },
    ca: { title: 'Guia de Jocs Educatius', desc: 'Descobreix tots els jocs educatius de Tuthor: matemàtiques, llengua, història, geografia, ciències, física i química. Beneficis pedagògics, exemples i com jugar sense pantalles.' },
  }[lang] || {}

  return (
    <div className="relative z-10">
      <SEOHead title={seoHub.title} description={seoHub.desc} path={lang==='en'?'/en/info/juegos':lang==='ca'?'/ca/info/juegos':'/info/juegos'} lang={lang} />
      <div className="px-4 sm:px-8 py-10 max-w-4xl mx-auto">
        <Link to={localPath('/')} className="text-white/30 hover:text-white/60 text-sm mb-8 inline-flex items-center gap-1 transition-colors">
          ← {lang === 'en' ? 'Home' : lang === 'ca' ? 'Inici' : 'Inicio'}
        </Link>
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">{d.h1}</h1>
          <p className="text-white/50 max-w-2xl mx-auto leading-relaxed">{d.intro}</p>
        </header>
      </div>

      <div className="text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 pb-12 space-y-10">

          <p className="text-white/60 leading-relaxed max-w-2xl mx-auto text-center text-lg">{d.body}</p>

          <AdSlot placement="inArticle" className="my-8" />

          {grupos.map(({ cat, juegos }, gIdx) => {
            const cm = cat[L] || cat.es
            return (
              <section key={cat.key}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{cm.e}</span>
                  <h2 className="text-2xl font-black text-white">{cm.t}</h2>
                </div>
                <p className="text-white/60 leading-relaxed mb-6 max-w-3xl">{cm.x}</p>

                <div className="grid gap-4 sm:grid-cols-2">
                  {juegos.map(j => (
                    <Link key={j.slug} to={localPath(`/info/juegos/${j.slug}`)}
                      className="group rounded-2xl border border-white/10 hover:border-white/25 overflow-hidden transition-all hover:scale-[1.01]"
                      style={{ background: SURF }}>
                      <div className={`bg-gradient-to-br ${j.gradient} h-28 flex items-center justify-center relative overflow-hidden`}>
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                        <span className="text-5xl relative drop-shadow-lg group-hover:scale-110 transition-transform">{j.emoji}</span>
                        <div className="absolute bottom-2 right-3 flex gap-1.5">
                          <span className="text-[10px] font-bold bg-black/40 text-white/90 px-2 py-0.5 rounded-full">{j.tag}</span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-black text-white text-lg group-hover:text-amber-400 transition-colors mb-1">{j.titulo}</h3>
                        <p className="text-white/55 text-sm leading-relaxed mb-3">{j.desc}</p>
                        <span className="text-sm font-bold text-amber-400 group-hover:text-amber-300 transition-colors">{d.verMas}</span>
                      </div>
                    </Link>
                  ))}
                </div>

                {gIdx < grupos.length - 1 && (
                  <>
                    <AdSlot placement="inArticle" className="mt-8" />
                    <hr className="border-white/10 mt-6" />
                  </>
                )}
              </section>
            )
          })}

          <section>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🚀</span>
              <h2 className="text-2xl font-black text-white">{d.proximamente}</h2>
            </div>
            <p className="text-white/60 leading-relaxed max-w-3xl">{d.proximamenteTexto}</p>
          </section>

          <AdSlot placement="inArticle" className="my-8" />

          <footer className="text-center pt-4">
            <Link to={localPath('/juegos')}
              className="inline-block py-4 px-10 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-amber-500/30">
              {d.cta}
            </Link>
          </footer>
        </div>
      </div>
    </div>
  )
}
