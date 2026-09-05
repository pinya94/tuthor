import { useParams, Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import { FICHAS_ES, FICHAS_EN, FICHAS_CA } from '../data/infoJuegosFichas'
import AdSlot from '../components/AdSlot'

// Superficie oscura casi opaca: legibilidad sobre el fondo del bosque
const SURF = 'rgba(17,20,29,0.86)'

const UI = {
  es: { back: '← Volver al catálogo', jugar: 'Jugar a', probar: 'Probar', ahora: 'ahora →', beneficiosH2: '🧠 Beneficios Pedagógicos', ejemploH2: '💡 Ejemplo Práctico', papelPre: '¿Prefieres aprender sin pantallas? Prueba esta versión analógica:', altH2: '🎲 Juegos similares que te pueden gustar', altPre: 'Si te gusta', altPost: ', estos juegos trabajan habilidades parecidas:', listoH2: '¿Listo para probarlo?', listoSub: 'Accede gratis y empieza a mejorar ahora.', notFound: 'Juego no encontrado', recursosTitulo: 'Material listo para imprimir', recursosSub: 'Tarjetas ya escritas para recortar: historia, geografía, química y más. Gratis, sin registro.' },
  en: { back: '← Back to catalogue', jugar: 'Play', probar: 'Try', ahora: 'now →', beneficiosH2: '🧠 Pedagogical Benefits', ejemploH2: '💡 Practical Example', papelPre: 'Prefer to learn without screens? Try this analogue version:', altH2: '🎲 Similar activities you might enjoy', altPre: 'If you like', altPost: ', these activities work similar skills:', listoH2: 'Ready to try it?', listoSub: 'Access for free and start improving now.', notFound: 'Game not found', recursosTitulo: 'Ready-to-print material', recursosSub: 'Cards already written, ready to cut out: history, geography, chemistry and more. Free, no sign-up.' },
  ca: { back: '← Tornar al catàleg', jugar: 'Jugar a', probar: 'Provar', ahora: 'ara →', beneficiosH2: '🧠 Beneficis Pedagògics', ejemploH2: '💡 Exemple Pràctic', papelPre: 'Prefereixes aprendre sense pantalles? Prova aquesta versió analògica:', altH2: '🎲 Jocs similars que et poden agradar', altPre: 'Si t\'agrada', altPost: ', aquests jocs treballen habilitats semblants:', listoH2: 'Preparat per provar-ho?', listoSub: 'Accedeix gratis i comença a millorar ara.', notFound: 'Joc no trobat', recursosTitulo: 'Material a punt per imprimir', recursosSub: 'Targetes ja escrites per retallar: història, geografia, química i més. Gratis, sense registre.' },
}

export default function InfoJuegoFicha() {
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
          <Link to={localPath('/info/juegos')} className="text-[#EDAE49] hover:underline">{ui.back}</Link>
        </div>
      </div>
    )
  }

  const seoPath = lang==='en' ? `/en/info/juegos/${slug}` : lang==='ca' ? `/ca/info/juegos/${slug}` : `/info/juegos/${slug}`
  const seoDesc = `${ficha.intro.slice(0, 150)}...`

  return (
    <div className="relative z-10">
      <SEOHead title={`${ficha.titulo} — ${ficha.subtitulo}`} description={seoDesc} path={seoPath} lang={lang} />
      {/* Header oscuro */}
      <div className="px-4 sm:px-8 py-10 max-w-3xl mx-auto">
        <Link to={localPath('/info/juegos')} className="text-white/30 hover:text-white/60 text-sm mb-8 inline-flex items-center gap-1 transition-colors">
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
          <Link to={localPath(ficha.path)}
            className="inline-block py-3 px-8 bg-[#EDAE49] hover:bg-amber-400 text-black font-black rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-amber-500/30">
            {ui.jugar} {ficha.titulo} →
          </Link>
        </header>
      </div>

      {/* Contenido (mismo mundo noche) */}
      <div className="text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 pb-12">

          <p className="text-white/60 leading-relaxed text-lg mb-8">{ficha.intro}</p>

          <div className={`bg-gradient-to-br ${ficha.gradient} rounded-2xl h-48 sm:h-64 flex items-center justify-center mb-10 relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="relative text-center">
              <span className="text-8xl sm:text-9xl drop-shadow-2xl">{ficha.emoji}</span>
              <p className="text-white/70 text-sm font-bold mt-2">{ficha.asignatura} · {ficha.niveles}</p>
            </div>
          </div>

          {/* CTA 1 */}
          <div className={`text-center mb-10 ${ficha.examPath ? 'flex flex-col sm:flex-row gap-3 justify-center' : ''}`}>
            <Link to={localPath(ficha.path)}
              className="inline-block py-4 px-10 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-amber-500/30">
              {ui.jugar} {ficha.titulo} →
            </Link>
            {ficha.examPath && (
              <Link to={localPath(ficha.examPath)}
                className="inline-block py-4 px-10 bg-violet-600 hover:bg-violet-500 text-white font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-violet-600/30">
                {lang === 'en' ? 'Take the exam →' : lang === 'ca' ? 'Fer l\'examen →' : 'Hacer el examen →'}
              </Link>
            )}
          </div>

          <AdSlot placement="inArticle" className="mb-10" />

          {/* Beneficios */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-white mb-6">{ui.beneficiosH2}</h2>
            <div className="space-y-4">
              {ficha.beneficios.map(b => (
                <div key={b.titulo} className="rounded-2xl border border-white/10 p-6" style={{ background: SURF }}>
                  <h3 className="font-black text-white text-lg mb-2">{b.titulo}</h3>
                  <p className="text-white/60 leading-relaxed">{b.texto}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-white mb-4">{ui.ejemploH2}</h2>
            <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-6">
              <p className="text-amber-100/90 leading-relaxed italic">"{ficha.ejemplo}"</p>
            </div>
          </section>

          {/* CTA 2 */}
          <div className="text-center mb-10">
            <Link to={localPath(ficha.path)}
              className="inline-block py-4 px-10 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-amber-500/30">
              {ui.probar} {ficha.titulo} {ui.ahora}
            </Link>
          </div>

          <AdSlot placement="inArticle" className="mb-10" />

          {/* En papel */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-white mb-2">📝 {ficha.enPapel.titulo}</h2>
            <p className="text-white/55 mb-5">{ui.papelPre}</p>
            <div className="rounded-2xl border border-white/10 p-6" style={{ background: SURF }}>
              <ol className="space-y-3">
                {ficha.enPapel.pasos.map((p, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-7 h-7 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-black text-sm flex items-center justify-center shrink-0">{i + 1}</span>
                    <p className="text-white/65 leading-relaxed pt-0.5">{p}</p>
                  </li>
                ))}
              </ol>
            </div>
            {/* Esta sección dice cómo montar la actividad; /recursos trae el
                material ya hecho. Enlazarlas desde las 36 fichas es también
                lo que le da entradas a esa página desde el buscador. */}
            <Link to={localPath('/recursos')}
              className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-teal-500/25 bg-teal-500/[0.06] px-5 py-4 hover:border-teal-500/50 transition-colors">
              <span>
                <span className="block text-white font-bold text-[15px]">🖨️ {ui.recursosTitulo}</span>
                <span className="block text-white/50 text-[13px] mt-0.5">{ui.recursosSub}</span>
              </span>
              <span className="text-teal-300 font-bold shrink-0">→</span>
            </Link>
          </section>

          {/* Alternativas */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-white mb-2">{ui.altH2}</h2>
            <p className="text-white/55 mb-5">{ui.altPre} {ficha.titulo}{ui.altPost}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {ficha.alternativas.map(a => (
                <div key={a.nombre} className="rounded-2xl border border-white/10 p-5" style={{ background: SURF }}>
                  <h3 className="font-bold text-white mb-1">{a.nombre}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <AdSlot placement="inArticle" className="mb-10" />

          {/* CTA final */}
          <footer className="text-center pt-4">
            <h2 className="text-2xl font-black text-white mb-3">{ui.listoH2}</h2>
            <p className="text-white/55 mb-6">{ui.listoSub}</p>
            <Link to={localPath(ficha.path)}
              className="inline-block py-4 px-10 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-amber-500/30">
              {ui.jugar} {ficha.titulo} →
            </Link>
          </footer>
        </div>
      </div>
    </div>
  )
}
