import { Navigate, useParams, Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import PageMeta from '../components/PageMeta'
import ContenidoTema, { contenidoMeta } from '../components/ContenidoTema'
import { TEMAS_ORTOGRAFIA } from '../data/temasEspanol'
import { disponibleEn } from '../lib/games'

// Página de estudio de un tema de ortografía (/estudiar/idiomas/espanol/
// ortografia/<slug>): reglas, tablas y ejercicios resueltos (temaOrtografia.js)
// y, debajo, el examen tipo test y el juego del tema. Los juegos de ortografía
// solo existen en castellano: en en/ca se ofrece únicamente el examen.
const JUEGO_DE = {
  acentuacion: { id: 'pon-la-tilde', titulo: { es: 'Pon la Tilde', en: 'Spanish Accents', ca: 'Posa l’Accent' }, emoji: '✏️', gradient: 'from-rose-500 to-pink-700', desc: { es: 'Juego: toca la sílaba tónica de cada palabra y decide si lleva tilde.', en: 'Game: tap the stressed syllable of each word and decide whether it takes an accent.', ca: 'Joc: toca la síl·laba tònica de cada paraula i decideix si porta accent.' } },
  bv: { id: 'que-letra', titulo: { es: '¿Qué Letra Va?', en: 'Which Letter?', ca: 'Quina Lletra Va?' }, emoji: '🔠', gradient: 'from-teal-500 to-cyan-700', desc: { es: 'Juego: elige la letra que falta en cada palabra y aprende la regla de cada una.', en: 'Game: choose the missing letter in each word and learn the rule behind it.', ca: 'Joc: tria la lletra que falta a cada paraula i aprèn la regla de cadascuna.' } },
  gj: { id: 'que-letra', titulo: { es: '¿Qué Letra Va?', en: 'Which Letter?', ca: 'Quina Lletra Va?' }, emoji: '🔠', gradient: 'from-violet-500 to-purple-700', desc: { es: 'Juego: elige la letra que falta en cada palabra y aprende la regla de cada una.', en: 'Game: choose the missing letter in each word and learn the rule behind it.', ca: 'Joc: tria la lletra que falta a cada paraula i aprèn la regla de cadascuna.' } },
  letras: { id: 'que-letra', titulo: { es: '¿Qué Letra Va?', en: 'Which Letter?', ca: 'Quina Lletra Va?' }, emoji: '🔠', gradient: 'from-sky-500 to-indigo-700', desc: { es: 'Juego: elige la letra que falta en cada palabra y aprende la regla de cada una.', en: 'Game: choose the missing letter in each word and learn the rule behind it.', ca: 'Joc: tria la lletra que falta a cada paraula i aprèn la regla de cadascuna.' } },
  puntuacion: { id: 'coma-a-coma', titulo: { es: 'Coma a Coma', en: 'Coma a Coma', ca: 'Coma a Coma' }, emoji: '🖋️', gradient: 'from-rose-500 to-pink-700', desc: { es: 'Juego: pon el signo que falta en cada hueco de la frase.', en: 'Game: add the missing mark in each gap of the sentence.', ca: 'Joc: posa el signe que falta a cada buit de la frase.' } },
}

export default function EspanolOrtografiaTema() {
  const { lang, tr, localPath } = useLang()
  const { tema: slug } = useParams()
  const base = '/estudiar/idiomas/espanol/ortografia'
  const tema = TEMAS_ORTOGRAFIA.find(t => t.slug === slug)
  if (!tema) return <Navigate to={localPath(base)} replace />

  const meta = contenidoMeta(slug, lang)
  const juego = JUEGO_DE[tema.id]
  const modos = [
    {
      key: 'examen', to: `/examen/${tema.gameId}`, emoji: '📝', gradient: tema.gradient,
      titulo: { es: 'Examen tipo test', en: 'Multiple-choice exam', ca: 'Examen tipus test' },
      desc: { es: '10 preguntas de opción múltiple con la explicación de cada respuesta.', en: '10 multiple-choice questions with an explanation for every answer.', ca: '10 preguntes d’opció múltiple amb l’explicació de cada resposta.' },
    },
    ...(juego && disponibleEn(juego.id, lang) ? [{ key: 'juego', to: `/juegos/${juego.id}`, ...juego }] : []),
  ]

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <PageMeta title={meta?.title} description={meta?.desc} path={`${base}/${slug}`} lang={lang} />
      <div className="max-w-2xl mx-auto w-full mb-6">
        <p className="text-white/30 text-xs mb-4">
          <Link to={localPath('/estudiar')} className="hover:text-white/60 transition-colors">{tr({ es: 'Estudiar', en: 'Study', ca: 'Estudiar' })}</Link>
          {' / '}
          <Link to={localPath(base)} className="hover:text-white/60 transition-colors">{tr({ es: 'Ortografía', en: 'Spelling', ca: 'Ortografia' })}</Link>
          {' / '}
          <span className="text-white/50">{tr(tema.titulo)}</span>
        </p>
        <div className="flex items-center gap-4">
          <span className="text-5xl">{tema.emoji}</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{meta?.title ?? tr(tema.titulo)}</h1>
        </div>
      </div>

      <ContenidoTema tema={slug} lang={lang} />

      <div className="max-w-2xl mx-auto w-full space-y-4">
        <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">{tr({ es: 'Practica', en: 'Practise', ca: 'Practica' })}</p>
        {modos.map(m => (
          <Link key={m.key} to={localPath(m.to)} state={{ backPath: `${base}/${slug}` }}
            className="block w-full group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/40">
            <div className={`bg-gradient-to-br ${m.gradient} p-5 flex items-center gap-4`}>
              <span className="text-3xl">{m.emoji}</span>
              <div className="flex-1">
                <h2 className="font-black text-white text-lg">{tr(m.titulo)}</h2>
                <p className="text-white/75 text-sm leading-relaxed">{tr(m.desc)}</p>
              </div>
              <span className="w-10 h-10 shrink-0 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center text-white font-black text-lg">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
