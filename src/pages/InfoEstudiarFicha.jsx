import { useParams, Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'

import { FICHAS_ES, FICHAS_EN, FICHAS_CA } from '../data/infoEstudiarFichas'

const UI = {
  es: {
    back: '← Volver a Estudiar',
    empezar: 'Empezar examen de',
    hacerExamen: 'Ir al examen →',
    estudiarTema: 'Estudiar el tema →',
    probar: 'Empezar',
    ahora: 'ahora →',
    beneficiosH2: '🧠 Beneficios Pedagógicos',
    ejemploH2: '💡 Ejemplo Práctico',
    consejosH2: '📝 Consejos de Estudio',
    consejosPre: 'Trucos y técnicas para dominar este tema más rápido:',
    relacionadosH2: '🔬 Temas relacionados que te pueden interesar',
    relacionadosPre: 'Si estás estudiando',
    relacionadosPost: ', estos temas del currículo se complementan:',
    listoH2: '¿Listo para empezar?',
    listoSub: 'Accede gratis y practica ahora mismo.',
    verMas: 'Ver más →',
    notFound: 'Tema no encontrado',
  },
  en: {
    back: '← Back to Study',
    empezar: 'Start exam:',
    hacerExamen: 'Go to exam →',
    estudiarTema: 'Study the topic →',
    probar: 'Start',
    ahora: 'now →',
    beneficiosH2: '🧠 Pedagogical Benefits',
    ejemploH2: '💡 Practical Example',
    consejosH2: '📝 Study Tips',
    consejosPre: 'Tricks and techniques to master this topic faster:',
    relacionadosH2: '🔬 Related topics you might find useful',
    relacionadosPre: 'If you are studying',
    relacionadosPost: ', these curriculum topics complement each other:',
    listoH2: 'Ready to start?',
    listoSub: 'Access for free and practise right now.',
    verMas: 'See more →',
    notFound: 'Topic not found',
  },
  ca: {
    back: '← Tornar a Estudiar',
    empezar: 'Començar examen de',
    hacerExamen: 'Anar a l\'examen →',
    estudiarTema: 'Estudiar el tema →',
    probar: 'Començar',
    ahora: 'ara →',
    beneficiosH2: '🧠 Beneficis Pedagògics',
    ejemploH2: '💡 Exemple Pràctic',
    consejosH2: '📝 Consells d\'Estudi',
    consejosPre: 'Trucs i tècniques per dominar aquest tema més ràpid:',
    relacionadosH2: '🔬 Temes relacionats que et poden interessar',
    relacionadosPre: 'Si estàs estudiant',
    relacionadosPost: ', aquests temes del currículum es complementen:',
    listoH2: 'Preparat per començar?',
    listoSub: 'Accedeix gratis i practica ara mateix.',
    verMas: 'Veure més →',
    notFound: 'Tema no trobat',
  },
}

export default function InfoEstudiarFicha() {
  const { slug } = useParams()
  const { lang, localPath } = useLang()
  const fichas = lang === 'ca' ? FICHAS_CA : lang === 'en' ? FICHAS_EN : FICHAS_ES
  const ui = UI[lang] || UI.es
  const ficha = fichas[slug]

  if (!ficha) {
    return (
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="text-center">
          <p className="text-white/50 text-lg mb-4">{ui.notFound}</p>
          <Link to={localPath('/info/estudiar')} className="text-[#EDAE49] hover:underline">{ui.back}</Link>
        </div>
      </div>
    )
  }

  const canonicalUrl = `https://www.tuthor.es${lang !== 'es' ? `/${lang}` : ''}/info/estudiar/${slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: ficha.titulo,
    description: ficha.intro,
    provider: { '@type': 'Organization', name: 'Tuthor', url: 'https://www.tuthor.es' },
    url: canonicalUrl,
    educationalLevel: ficha.niveles,
    about: { '@type': 'Thing', name: ficha.asignatura },
  }

  return (
    <div className="relative z-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Header oscuro */}
      <div className="px-4 sm:px-8 py-10 max-w-3xl mx-auto">
        <Link to={localPath('/info/estudiar')} className="text-white/30 hover:text-white/60 text-sm mb-8 inline-flex items-center gap-1 transition-colors">
          {ui.back}
        </Link>
        <header className="mb-4">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <span className="text-5xl sm:text-6xl shrink-0">{ficha.emoji}</span>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">{ficha.titulo}</h1>
              <p className="text-white/40 text-sm sm:text-lg">{ficha.subtitulo}</p>
            </div>
          </div>
          <div className="flex gap-3 mb-4">
            <span className="text-xs font-bold bg-white/10 text-white/60 px-3 py-1 rounded-full">{ficha.asignatura}</span>
            <span className="text-xs font-bold bg-white/10 text-white/60 px-3 py-1 rounded-full">{ficha.niveles}</span>
          </div>
          <Link to={localPath(ficha.examPath)}
            className="inline-block py-3 px-8 bg-[#EDAE49] hover:bg-amber-400 text-black font-black rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-amber-500/30">
            {ui.empezar} {ficha.titulo} →
          </Link>
        </header>
      </div>

      {/* Contenido claro */}
      <div className="bg-[#f5f5f0] text-gray-900 rounded-t-[2rem] sm:rounded-t-[3rem]">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12">

          <p className="text-gray-600 leading-relaxed text-lg mb-8">{ficha.intro}</p>

          <div className={`bg-gradient-to-br ${ficha.gradient} rounded-2xl h-48 sm:h-64 flex items-center justify-center mb-10 relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="relative text-center">
              <span className="text-8xl sm:text-9xl drop-shadow-2xl">{ficha.emoji}</span>
              <p className="text-white/60 text-sm font-bold mt-2">{ficha.asignatura} · {ficha.niveles}</p>
            </div>
          </div>

          {/* CTA 1 */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link to={localPath(ficha.examPath)}
              className="inline-block py-4 px-10 bg-teal-600 hover:bg-teal-500 text-white font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-teal-600/30 text-center">
              {ui.hacerExamen}
            </Link>
            <Link to={localPath(ficha.studyPath)}
              className="inline-block py-4 px-10 bg-violet-600 hover:bg-violet-500 text-white font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-violet-600/30 text-center">
              {ui.estudiarTema}
            </Link>
          </div>

          <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="info-estudiar-ficha-1" style={{ minHeight: '90px', marginBottom: '2.5rem' }} />

          {/* Beneficios */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-gray-900 mb-6">{ui.beneficiosH2}</h2>
            <div className="space-y-5">
              {ficha.beneficios.map(b => (
                <div key={b.titulo} className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h3 className="font-black text-gray-900 text-lg mb-2">{b.titulo}</h3>
                  <p className="text-gray-500 leading-relaxed">{b.texto}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-gray-900 mb-4">{ui.ejemploH2}</h2>
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6">
              <p className="text-teal-800 leading-relaxed italic">"{ficha.ejemplo}"</p>
            </div>
          </section>

          {/* CTA 2 */}
          <div className="text-center mb-10">
            <Link to={localPath(ficha.examPath)}
              className="inline-block py-4 px-10 bg-teal-600 hover:bg-teal-500 text-white font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-teal-600/30">
              {ui.probar} {ficha.titulo} {ui.ahora}
            </Link>
          </div>

          <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="info-estudiar-ficha-2" style={{ minHeight: '90px', marginBottom: '2.5rem' }} />

          {/* Consejos de estudio */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-gray-900 mb-2">{ui.consejosH2}</h2>
            <p className="text-gray-400 mb-5">{ui.consejosPre}</p>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <ol className="space-y-3">
                {ficha.consejos.map((c, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-7 h-7 rounded-full bg-teal-100 border border-teal-200 text-teal-700 font-black text-sm flex items-center justify-center shrink-0">{i + 1}</span>
                    <p className="text-gray-600 leading-relaxed pt-0.5">{c}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Temas relacionados */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-gray-900 mb-2">{ui.relacionadosH2}</h2>
            <p className="text-gray-400 mb-5">{ui.relacionadosPre} {ficha.titulo}{ui.relacionadosPost}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {ficha.relacionados.map(r => (
                <Link key={r.slug} to={localPath(`/info/estudiar/${r.slug}`)}
                  className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-teal-300 hover:shadow-sm transition-all group">
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">{r.nombre}</h3>
                  <p className="text-teal-600 text-sm font-semibold">{ui.verMas}</p>
                </Link>
              ))}
            </div>
          </section>

          <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="info-estudiar-ficha-3" style={{ minHeight: '90px', marginBottom: '2.5rem' }} />

          {/* CTA final */}
          <footer className="text-center pt-4">
            <h2 className="text-2xl font-black text-gray-900 mb-3">{ui.listoH2}</h2>
            <p className="text-gray-400 mb-6">{ui.listoSub}</p>
            <Link to={localPath(ficha.examPath)}
              className="inline-block py-4 px-10 bg-teal-600 hover:bg-teal-500 text-white font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-teal-600/30">
              {ui.empezar} {ficha.titulo} →
            </Link>
          </footer>
        </div>
      </div>
    </div>
  )
}

