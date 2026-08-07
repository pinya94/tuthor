import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import HeroCard from '../components/HeroCard'
import { MAIN_CARDS } from '../data/constants'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { getStats, formatTime } from '../lib/activity'
import AuthModal from '../components/AuthModal'
import { FRAMES, BANNERS, AVATARS } from '../data/cosmetics'
import SEOHead from '../components/SEOHead'

const PREVIEW_FRAMES  = ['silver', 'gold', 'rainbow', 'galaxy', 'fire', 'neon']
const PREVIEW_BANNERS = ['banner_crimson', 'banner_ocean', 'banner_amber', 'banner_galaxy']
const PREVIEW_AVATARS = ['🐱', '🦊', '🐲', '🤖', '👽', '⭐']

// Superficie oscura casi opaca: legibilidad sobre el fondo del bosque
const SURF = 'rgba(17,20,29,0.86)'

function RewardsSection({ lang, navigate, user, onLogin }) {
  const en = lang === 'en', ca = lang === 'ca'
  const previewFrames = FRAMES.filter(f => PREVIEW_FRAMES.includes(f.id)).slice(0, 4)

  return (
    <section className="mb-8">
      <div className="rounded-2xl border border-violet-500/25 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(139,92,246,.2), rgba(237,174,73,.08)), ' + SURF }}>
        <div className="px-5 sm:px-6 py-4 flex items-center gap-4">
          <div className="flex-1">
            <p className="text-violet-300 text-xs font-bold uppercase tracking-widest mb-0.5">
              {ca ? 'Recompenses' : en ? 'Rewards' : 'Recompensas'}
            </p>
            <p className="text-white font-black text-base leading-tight">
              {ca ? 'Juga i guanya monedes 💰' : en ? 'Play and earn coins 💰' : 'Juega y gana monedas 💰'}
            </p>
            <p className="text-white/50 text-xs mt-0.5">
              {ca ? 'Marcs · Banners · Avatars' : en ? 'Frames · Banners · Avatars' : 'Marcos · Banners · Avatares'}
            </p>
          </div>
          {/* Preview frames inline */}
          <div className="flex gap-1.5 shrink-0">
            {previewFrames.map(frame => (
              <div key={frame.id} className={frame.animated ? 'frame-animated' : ''} style={{ ...frame.style, padding: 2, borderRadius: '50%', width: 36, height: 36 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1e1b4b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                  {frame.emoji}
                </div>
              </div>
            ))}
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '2px dashed rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: 'rgba(255,255,255,0.3)' }}>+</div>
          </div>
        </div>

        <div className="px-5 sm:px-6 pb-4">
          {user ? (
            <button onClick={() => navigate('/tienda')} className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-black rounded-xl transition-all text-sm">
              🛍 {ca ? 'Anar a la botiga' : en ? 'Go to shop' : 'Ir a la tienda'}
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 items-center">
              <button onClick={onLogin} className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-black rounded-xl transition-all text-sm">
                {ca ? '✨ Registra\'t gratis' : en ? '✨ Sign up free' : '✨ Regístrate gratis'}
              </button>
              <p className="text-white/40 text-xs shrink-0">
                {ca ? 'per desbloquejar la botiga' : en ? 'to unlock the shop' : 'para desbloquear la tienda'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { t, localPath, lang } = useLang()
  const en = lang === 'en'
  const ca = lang === 'ca'
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [showAuth, setShowAuth] = useState(false)

  useEffect(() => {
    if (user) getStats(user.uid).then(setStats)
    else setStats(null)
  }, [user])

  const seo = {
    es: { title: 'Estudia con juegos educativos', desc: 'Plataforma educativa gratuita con juegos de historia, geografía, matemáticas y más. Aprende jugando para Primaria, ESO y Bachillerato.' },
    en: { title: 'Study with educational games', desc: 'Free educational platform with games for history, geography, maths and more. Learn by playing for Primary, Secondary and Sixth Form.' },
    ca: { title: 'Estudia amb jocs educatius', desc: 'Plataforma educativa gratuïta amb jocs d\'història, geografia, matemàtiques i més. Aprèn jugant per a Primària, ESO i Batxillerat.' },
  }[lang] || {}

  return (
    <div className="relative z-10 px-4 sm:px-8">
      {/* path="/app", no "/": la raíz es la landing de venta desde el pivot a
          suscripción. Con "/" esta página declaraba como canónica la landing y
          Google la habría tratado como un duplicado suyo. */}
      <SEOHead title={seo.title} description={seo.desc} path="/app" lang={lang} />
      {/* ── HERO: ocupa toda la pantalla de aterrizaje ── */}
      <div className="flex flex-col min-h-[calc(100vh-4rem)] py-5 gap-4">
        {/* Título / propuesta de valor (h1 único, SEO) */}
        <div className="text-center pt-1">
          <span className="inline-block text-amber-400 bg-amber-500/12 border border-amber-500/30 text-[11px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
            {ca ? 'Gratis · Primària · ESO · Batxillerat' : en ? 'Free · Primary · Secondary · Sixth Form' : 'Gratis · Primaria · ESO · Bachillerato'}
          </span>
          <h1 className="text-3xl sm:text-[40px] font-black text-white leading-[1.1] tracking-tight max-w-[18ch] mx-auto" style={{ textWrap: 'balance' }}>
            {t('home.seo.titulo')}
          </h1>
          <p className="text-white/60 mt-3 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">{t('home.seo.subtitulo')}</p>
        </div>

        {/* Cards principales */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ minHeight: '280px' }}>
          {MAIN_CARDS.map(card => (
            <div key={card.id} className="min-h-[220px] sm:min-h-0">
              <HeroCard card={card} onClick={() => navigate(localPath(card.path))} priority={card.id === 'estudiar'} />
            </div>
          ))}
        </div>

      {/* Banner progreso */}
      <div className="space-y-2">
        {user && stats ? (
          <StatsWidget stats={stats} name={user.displayName?.split(' ')[0]} onVerMas={() => navigate(localPath('/perfil'))} en={en} lang={lang} />
        ) : user ? (
          <EmptyStatsWidget onVerMas={() => navigate(localPath('/perfil'))} en={en} lang={lang} />
        ) : (
          <LockedWidget onLogin={() => setShowAuth(true)} en={en} lang={lang} />
        )}
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
        {/* pass setShowAuth down via closure — used by RewardsSection */}
        <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="home-hero" style={{ minHeight: '50px' }} />
      </div>
      </div>

      {/* ── SECCIONES SEO (mismo mundo noche) ─────────────────────────────── */}
      <div className="text-white pb-16 mt-10">
        <div className="max-w-4xl mx-auto">

          {/* JUGAR */}
          <section className="mb-8">
            <div className="rounded-2xl border border-white/10 overflow-hidden sm:flex" style={{ background: SURF }}>
              <div className="sm:w-2/5 bg-gradient-to-br from-violet-950 to-indigo-900 flex items-center justify-center p-6 sm:p-8 min-h-[200px] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                <div className="relative text-center space-y-3">
                  <div className="flex justify-center gap-2">
                    {['7','×','6','+','3','=','?'].map((n, i) => (
                      <span key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black ${
                        n === '?' ? 'bg-amber-400 text-black' : n === '×' || n === '+' || n === '=' ? 'text-violet-300' : 'bg-white/10 text-white border border-white/20'
                      }`}>{n}</span>
                    ))}
                  </div>
                  <div className="bg-amber-400/20 border border-amber-400/40 rounded-xl px-4 py-2">
                    <span className="text-amber-300 text-xs font-bold">🎯 {t('common.objetivo')}: </span>
                    <span className="text-white font-black text-lg">45</span>
                  </div>
                  <div className="flex justify-center gap-3 text-xs text-white/50">
                    <span>⏱️ 32s</span>
                    <span>⭐ 1.240 {t('common.puntos')}</span>
                    <span>🔥 ×3</span>
                  </div>
                </div>
              </div>
              <div className="sm:w-3/5 p-6 sm:p-8">
                <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">{t('home.seo.jugar.tag')}</p>
                <h2 className="text-2xl font-black text-white mb-3">{t('home.seo.jugar.titulo')}</h2>
                <p className="text-white/60 leading-relaxed mb-5">{t('home.seo.jugar.texto')}</p>
                <Link to={localPath('/info/juegos')} className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold transition-colors">
                  {t('home.seo.jugar.link')}
                </Link>
              </div>
            </div>
          </section>

          <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="home-seo-1" style={{ minHeight: '90px', marginBottom: '2rem' }} />

          {/* ESTUDIAR + RETO DIARIO */}
          <section className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="rounded-2xl border border-white/10 p-6 sm:p-7 flex flex-col" style={{ background: SURF }}>
              <div className="bg-gradient-to-br from-indigo-950 to-blue-900 rounded-xl h-36 flex items-center justify-center mb-5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                <div className="relative text-center">
                  <p className="text-green-400 text-xs font-bold mb-1">✅ {t('common.aprobado')}</p>
                  <p className="text-white font-black text-2xl">Notable</p>
                  <p className="text-blue-300 font-black text-3xl">7/10</p>
                  <div className="flex gap-1 justify-center mt-2">
                    {[1,1,0,1,1,1,0,1,0,1].map((v, i) => (
                      <div key={i} className={`w-3 h-3 rounded-full ${v ? 'bg-green-400' : 'bg-red-400'}`} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">{t('home.seo.estudiar.tag')}</p>
              <h2 className="text-xl font-black text-white mb-3">{t('home.seo.estudiar.titulo')}</h2>
              <p className="text-white/60 leading-relaxed text-sm mb-5 flex-1">{t('home.seo.estudiar.texto')}</p>
              <Link to={localPath('/info/estudiar')} className="text-amber-400 hover:text-amber-300 text-sm font-bold transition-colors">
                {t('home.seo.estudiar.link')}
              </Link>
            </div>

            <div className="rounded-2xl border border-white/10 p-6 sm:p-7 flex flex-col" style={{ background: SURF }}>
              <div className="bg-gradient-to-br from-orange-950 to-rose-900 rounded-xl h-36 flex items-center justify-center mb-5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                <div className="relative text-center">
                  <p className="text-orange-300 text-xs font-bold mb-1">{t('home.seo.diaria.tag')}</p>
                  <p className="text-white font-black text-4xl">🔥 14</p>
                  <p className="text-orange-200/50 text-xs mt-1">14 {t('common.mejorRacha', 'days')}</p>
                  <div className="flex gap-1 justify-center mt-2">
                    {['L','M','X','J','V','S','D'].map((d, i) => (
                      <div key={i} className={`w-5 h-5 rounded text-[8px] font-bold flex items-center justify-center ${
                        i < 6 ? 'bg-orange-400/30 text-orange-300' : 'bg-white/10 text-white/30'
                      }`}>{d}</div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">{t('home.seo.diaria.tag')}</p>
              <h2 className="text-xl font-black text-white mb-3">{t('home.seo.diaria.titulo')}</h2>
              <p className="text-white/60 leading-relaxed text-sm mb-5 flex-1">{t('home.seo.diaria.texto')}</p>
              <Link to={localPath('/info/diaria')} className="text-amber-400 hover:text-amber-300 text-sm font-bold transition-colors">
                {t('home.seo.diaria.link')}
              </Link>
            </div>
          </section>

          <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="home-seo-2" style={{ minHeight: '90px', marginBottom: '2rem' }} />

          {/* RECOMPENSAS */}
          <RewardsSection lang={lang} navigate={navigate} user={user} onLogin={() => setShowAuth(true)} />

          {/* VIDEO */}
          <section className="rounded-2xl border border-white/10 p-6 sm:p-8 mb-8" style={{ background: SURF }}>
            <h2 className="text-2xl font-black text-white text-center mb-2">{t('home.seo.video.titulo')}</h2>
            <p className="text-white/55 text-center mb-6 max-w-lg mx-auto">{t('home.seo.video.subtitulo')}</p>
            <div className="aspect-video rounded-xl overflow-hidden bg-black/40 border border-white/10">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/QfN7qCTzFBM?si=wvU_yIXHbGE3oKik"
                title={t('home.seo.video.titulo')}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </section>

          {/* PATROCINADOR DESTACADO: Igraal */}
          <section className="mb-8">
            <a href="https://es.igraal.com/padrinazgo?padrino=AG_638200fb04960&utm_medium=inf&utm_source=premium"
              target="_blank" rel="noopener noreferrer"
              className="group block bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 rounded-2xl p-6 sm:p-8 transition-all hover:shadow-lg hover:shadow-green-900/40">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-green-100/70">
                      {lang === 'en' ? 'Featured sponsor' : lang === 'ca' ? 'Patrocinador destacat' : 'Patrocinador destacado'}
                    </span>
                  </div>
                  <h2 className="text-white font-black text-xl sm:text-2xl mb-1">
                    {lang === 'en' ? 'Save money with Igraal — and support Tuthor' : lang === 'ca' ? "Estalvia amb Igraal — i dóna suport a Tuthor" : 'Ahorra con Igraal — y apoya Tuthor'}
                  </h2>
                  <p className="text-green-100 text-sm leading-relaxed max-w-xl">
                    {lang === 'en'
                      ? 'Igraal is a free cashback platform where you earn money on your online purchases. Sign up through our link, get €10, and help us keep Tuthor free.'
                      : lang === 'ca'
                      ? "Igraal és una plataforma gratuïta de cashback on guanyes diners en les teves compres en línia. Registra't amb el nostre link, guanya 10€ i ajuda'ns a mantenir Tuthor gratuït."
                      : 'Igraal es una plataforma gratuita de cashback donde ganas dinero en tus compras online. Regístrate con nuestro enlace, llévate 10€ y ayúdanos a mantener Tuthor gratuito.'}
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-2 bg-white text-green-700 font-black px-6 py-3 rounded-xl text-sm group-hover:bg-green-50 transition-colors shadow-sm">
                    🎁 {lang === 'en' ? 'Get €10 free' : lang === 'ca' ? 'Aconsegueix 10€ gratis' : 'Consigue 10€ gratis'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </div>
            </a>
          </section>

          {/* COMUNIDAD */}
          <section className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              {/* Bug report */}
              <Link to={localPath('/reportar-bug')}
                className="group rounded-2xl border border-white/10 hover:border-violet-400/50 p-6 flex flex-col gap-3 transition-all" style={{ background: SURF }}>
                <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center text-xl">🐛</div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-sm">
                    {lang === 'en' ? 'Report a bug' : lang === 'ca' ? 'Reportar un error' : 'Reportar un bug'}
                  </h3>
                  <p className="text-white/50 text-xs mt-1 leading-relaxed">
                    {lang === 'en' ? "Something not working? Let us know and we'll fix it."
                      : lang === 'ca' ? "Alguna cosa no funciona? Explica'ns-ho i ho arreglem."
                      : 'Algo no funciona bien? Cuéntanoslo y lo arreglamos.'}
                  </p>
                </div>
                <span className="text-xs font-bold text-violet-400 group-hover:text-violet-300 flex items-center gap-1">
                  {lang === 'en' ? 'Open form' : lang === 'ca' ? 'Obrir formulari' : 'Abrir formulario'}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </span>
              </Link>

              {/* Ko-fi */}
              <a href="https://ko-fi.com/consiguetualgogratis" target="_blank" rel="noopener noreferrer"
                className="group rounded-2xl border border-white/10 hover:border-amber-400/50 p-6 flex flex-col gap-3 transition-all" style={{ background: SURF }}>
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-xl">☕</div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-sm">
                    {lang === 'en' ? 'Buy us a coffee' : lang === 'ca' ? "Convida'ns a un cafè" : 'Invítanos a un café'}
                  </h3>
                  <p className="text-white/50 text-xs mt-1 leading-relaxed">
                    {lang === 'en' ? 'Tuthor is free and always will be. A small donation helps us keep going.'
                      : lang === 'ca' ? "Tuthor és gratuït i sempre ho serà. Una petita donació ens ajuda a continuar."
                      : 'Tuthor es gratuito y siempre lo será. Una pequeña donación nos ayuda a seguir adelante.'}
                  </p>
                </div>
                <span className="text-xs font-bold text-amber-400 group-hover:text-amber-300 flex items-center gap-1">
                  {lang === 'en' ? 'Support on Ko-fi' : lang === 'ca' ? 'Donar a Ko-fi' : 'Apoyar en Ko-fi'}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </span>
              </a>

              {/* Colaborar */}
              <Link to={localPath('/colaborar')}
                className="group rounded-2xl border border-white/10 hover:border-emerald-400/50 p-6 flex flex-col gap-3 transition-all" style={{ background: SURF }}>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-xl">📣</div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-sm">
                    {lang === 'en' ? 'Collaborate or advertise' : lang === 'ca' ? "Col·laborar o anunciar-se" : 'Colaborar o anunciarse'}
                  </h3>
                  <p className="text-white/50 text-xs mt-1 leading-relaxed">
                    {lang === 'en' ? "School, publisher or ed-tech project? Let's talk about working together."
                      : lang === 'ca' ? 'Acadèmia, editorial o projecte educatiu? Parlem de com treballar junts.'
                      : '¿Academia, editorial o proyecto educativo? Hablemos de cómo trabajar juntos.'}
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-400 group-hover:text-emerald-300 flex items-center gap-1">
                  {lang === 'en' ? 'Write to us' : lang === 'ca' ? "Escriu-nos" : 'Escribirnos'}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </span>
              </Link>

            </div>
          </section>

          {/* CONTACTO */}
          <section className="rounded-2xl border border-white/10 p-6 sm:p-8 text-center" style={{ background: SURF }}>
            <h2 className="text-2xl font-black text-white mb-2">{t('home.seo.contacto.titulo')}</h2>
            <p className="text-white/55 mb-5 max-w-md mx-auto">{t('home.seo.contacto.texto')}</p>
            <Link to={localPath('/contacto')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm rounded-xl transition-all hover:scale-[1.02]">
              📧 {lang === 'ca' ? 'Escriu-nos' : lang === 'en' ? 'Write to us' : 'Escríbenos'}
            </Link>
          </section>

          <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="home-seo-footer" style={{ minHeight: '90px', marginTop: '2rem' }} />

          {/* CTA final */}
          <div className="text-center mt-8">
            <Link to={localPath('/juegos')}
              className="inline-block py-4 px-10 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-amber-500/30">
              {t('home.seo.cta')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatsWidget({ stats, name, onVerMas, en, lang }) {
  const ca = lang === 'ca'
  const streak = stats.streak || 0
  const items = [
    { emoji: '🔥', value: `${streak} ${ca ? (streak === 1 ? 'dia' : 'dies') : en ? (streak === 1 ? 'day' : 'days') : (streak !== 1 ? 'días' : 'día')}`, label: ca ? 'Ratxa' : en ? 'Streak' : 'Racha' },
    { emoji: '⏱️', value: formatTime(stats.totalTime), label: ca ? 'Temps total' : en ? 'Total time' : 'Tiempo total' },
    { emoji: '✅', value: stats.examsPassed ?? 0, label: ca ? 'Aprovats' : en ? 'Passed' : 'Aprobados' },
    { emoji: '🎮', value: stats.gamesPlayed ?? 0, label: ca ? 'Activitats' : en ? 'Activities' : 'Actividades' },
  ]
  return (
    <div className="rounded-xl border border-violet-500/30 bg-violet-600/10 backdrop-blur-sm">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
        <div>
          <p className="font-bold text-white text-sm">{ca ? `El teu progrés, ${name}` : en ? `Your progress, ${name}` : `Tu progreso, ${name}`}</p>
          <p className="text-white/40 text-xs">{ca ? 'Continua així 💪' : en ? 'Keep it up 💪' : 'Sigue así 💪'}</p>
        </div>
        <button
          onClick={onVerMas}
          className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
        >
          {ca ? 'Veure més →' : en ? 'See more →' : 'Ver más →'}
        </button>
      </div>
      <div className="grid grid-cols-4 divide-x divide-white/5 px-0">
        {items.map(item => (
          <div key={item.label} className="flex flex-col items-center py-3 px-2">
            <span className="text-lg mb-0.5">{item.emoji}</span>
            <span className="text-white font-black text-sm">{item.value}</span>
            <span className="text-white/30 text-xs">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function EmptyStatsWidget({ onVerMas, en, lang }) {
  const ca = lang === 'ca'
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="flex items-center justify-between px-5 py-2.5">
        <div className="flex items-center gap-3">
          <span className="text-lg">📊</span>
          <div>
            <p className="font-bold text-white text-sm">{ca ? 'El teu progrés' : en ? 'Your progress' : 'Tu progreso'}</p>
            <p className="text-white/40 text-xs">{ca ? 'Completa la teva primera activitat per veure estadístiques' : en ? 'Complete your first activity to see stats' : 'Completa tu primera actividad para ver stats'}</p>
          </div>
        </div>
        <button onClick={onVerMas} className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors">
          {ca ? 'Veure perfil →' : en ? 'See profile →' : 'Ver perfil →'}
        </button>
      </div>
    </div>
  )
}

function LockedWidget({ onLogin, en, lang }) {
  const ca = lang === 'ca'
  const preview = [
    { emoji: '🔥', label: ca ? 'Ratxa' : en ? 'Streak' : 'Racha' },
    { emoji: '💰', label: ca ? 'Monedes' : en ? 'Coins' : 'Monedas' },
    { emoji: '✅', label: ca ? 'Aprovats' : en ? 'Passed' : 'Aprobados' },
    { emoji: '🎮', label: ca ? 'Activitats' : en ? 'Activities' : 'Actividades' },
  ]
  return (
    <div className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
        <div>
          <p className="font-bold text-white text-sm">{ca ? 'El teu progrés' : en ? 'Your progress' : 'Tu progreso'}</p>
          <p className="text-white/40 text-xs">{ca ? 'Registra\'t per guardar monedes i personalitzar el perfil' : en ? 'Sign up to save coins and customise your profile' : 'Regístrate para guardar monedas y personalizar tu perfil'}</p>
        </div>
        <button
          onClick={onLogin}
          className="text-xs font-bold bg-violet-600 hover:bg-violet-700 text-white px-4 py-1.5 rounded-full transition-colors whitespace-nowrap"
        >
          {ca ? 'Iniciar sessió' : en ? 'Sign in' : 'Iniciar sesión'}
        </button>
      </div>
      <div className="grid grid-cols-4 divide-x divide-white/5">
        {preview.map(item => (
          <div key={item.label} className="flex flex-col items-center py-3 px-2 opacity-30">
            <span className="text-lg mb-0.5">{item.emoji}</span>
            <span className="text-white font-black text-sm">—</span>
            <span className="text-white/50 text-xs">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

