import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import PageMeta from '../components/PageMeta'
import ContenidoTema, { contenidoMeta } from '../components/ContenidoTema'

// /estudiar/matematicas/numeros-romanos: tema de matemáticas fuera del motor de
// MODOS (no es una operación con niveles), con contenido en temaMatematicas.js
// y, debajo, el juego y su examen.
const SLUG = 'numeros-romanos'
const BASE = '/estudiar/matematicas'
const MODOS = [
  { key: 'juego', to: '/juegos/numeros-romanos', emoji: '🏛️', gradient: 'from-amber-500 to-orange-700',
    titulo: { es: 'Números Romanos (juego)', en: 'Roman Numerals (game)', ca: 'Nombres Romans (joc)' },
    desc: { es: 'Construye cada número tocando los símbolos I, V, X, L, C, D y M, contra reloj.', en: 'Build each number by tapping the symbols I, V, X, L, C, D and M, against the clock.', ca: 'Construeix cada nombre tocant els símbols I, V, X, L, C, D i M, contra rellotge.' } },
  { key: 'examen', to: '/examen/numeros-romanos-test', emoji: '📝', gradient: 'from-stone-500 to-amber-800',
    titulo: { es: 'Examen de números romanos', en: 'Roman numerals exam', ca: 'Examen de nombres romans' },
    desc: { es: 'Con la mecánica del juego, sin cronómetro y con tres niveles.', en: 'Using the game mechanic, with no timer and three levels.', ca: 'Amb la mecànica del joc, sense cronòmetre i amb tres nivells.' } },
]

export default function NumerosRomanosTema() {
  const { lang, tr, localPath } = useLang()
  const meta = contenidoMeta(SLUG, lang)
  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <PageMeta title={meta?.title} description={meta?.desc} path={`${BASE}/${SLUG}`} lang={lang} />
      <div className="max-w-2xl mx-auto w-full mb-6">
        <p className="text-white/30 text-xs mb-4">
          <Link to={localPath('/estudiar')} className="hover:text-white/60 transition-colors">{tr({ es: 'Estudiar', en: 'Study', ca: 'Estudiar' })}</Link>
          {' / '}
          <Link to={localPath(BASE)} className="hover:text-white/60 transition-colors">{tr({ es: 'Matemáticas', en: 'Maths', ca: 'Matemàtiques' })}</Link>
          {' / '}
          <span className="text-white/50">{tr({ es: 'Números romanos', en: 'Roman numerals', ca: 'Nombres romans' })}</span>
        </p>
        <div className="flex items-center gap-4">
          <span className="text-5xl">🏛️</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{meta?.title}</h1>
        </div>
      </div>

      <ContenidoTema tema={SLUG} lang={lang} />

      <div className="max-w-2xl mx-auto w-full space-y-4">
        <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">{tr({ es: 'Practica', en: 'Practise', ca: 'Practica' })}</p>
        {MODOS.map(m => (
          <Link key={m.key} to={localPath(m.to)} state={{ backPath: `${BASE}/${SLUG}` }}
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
