import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import HeroCard from '../components/HeroCard'
import { MAIN_CARDS } from '../data/constants'
import { useAuth } from '../context/AuthContext'
import { getStats, formatTime } from '../lib/activity'
import AuthModal from '../components/AuthModal'

export default function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [showAuth, setShowAuth] = useState(false)

  useEffect(() => {
    if (user) getStats(user.uid).then(setStats)
    else setStats(null)
  }, [user])

  return (
    <div className="relative z-10 px-4 sm:px-8">
      {/* ── HERO: ocupa toda la pantalla de aterrizaje ── */}
      <div className="flex flex-col min-h-[calc(100vh-4rem)] py-5 gap-4">
        {/* Título */}
        <div className="text-center">
          <h1 className="text-2xl font-black text-white">¿Qué quieres hacer hoy?</h1>
          <p className="text-white/40 mt-0.5 text-sm">Elige una sección y empieza ahora</p>
        </div>

        {/* Cards principales */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ minHeight: '280px' }}>
          {MAIN_CARDS.map(card => (
            <div key={card.id} className="min-h-[220px] sm:min-h-0">
              <HeroCard card={card} onClick={() => navigate(card.path)} />
            </div>
          ))}
        </div>

      {/* Banner progreso */}
      <div className="space-y-2">
        {user && stats ? (
          <StatsWidget stats={stats} name={user.displayName?.split(' ')[0]} onVerMas={() => navigate('/perfil')} />
        ) : user ? (
          <EmptyStatsWidget onVerMas={() => navigate('/perfil')} />
        ) : (
          <LockedWidget onLogin={() => setShowAuth(true)} />
        )}
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
        <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="home-hero" style={{ minHeight: '50px' }} />
      </div>
      </div>

      {/* ── TRANSICIÓN oscuro → claro ─────────────────────────────────────── */}
      <div className="h-24 bg-gradient-to-b from-transparent to-[#f5f5f0] mt-8" />

      {/* ── SECCIONES SEO (fondo claro) ───────────────────────────────────── */}
      <div className="bg-[#f5f5f0] text-gray-900 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">

          {/* Titular */}
          <div className="text-center pt-4 pb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
              La forma inteligente de repasar sin aburrirte
            </h2>
            <p className="text-gray-500 leading-relaxed max-w-xl mx-auto text-lg">
              Partidas rápidas de 5 minutos. Matemáticas, historia, geografía — diseñado
              sobre principios pedagógicos reales para que aprendas sin darte cuenta.
            </p>
          </div>

          {/* JUGAR */}
          <section className="mb-10">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden sm:flex">
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
                    <span className="text-amber-300 text-xs font-bold">🎯 Objetivo: </span>
                    <span className="text-white font-black text-lg">45</span>
                  </div>
                  <div className="flex justify-center gap-3 text-xs text-white/40">
                    <span>⏱️ 32s</span>
                    <span>⭐ 1.240 pts</span>
                    <span>🔥 ×3</span>
                  </div>
                </div>
              </div>
              <div className="sm:w-3/5 p-6 sm:p-8">
                <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-2">6 juegos disponibles</p>
                <h2 className="text-2xl font-black text-gray-900 mb-3">Jugar: diviértete mientras repasas</h2>
                <p className="text-gray-500 leading-relaxed mb-5">
                  Nuestro catálogo cubre cálculo mental, cronología histórica, geografía y pensamiento crítico.
                  Mecánicas de videojuego — roguelike, puzzles contra reloj, deducción por pistas — para que
                  el repaso se sienta como un reto, no como una obligación.
                </p>
                <Link to="/info/juegos" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-500 font-bold transition-colors">
                  Ver todos los juegos y su base científica →
                </Link>
              </div>
            </div>
          </section>

          <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="home-seo-1" style={{ minHeight: '90px', marginBottom: '2.5rem' }} />

          {/* ESTUDIAR + RETO DIARIO lado a lado en desktop */}
          <section className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 flex flex-col">
              <div className="bg-gradient-to-br from-indigo-950 to-blue-900 rounded-xl h-36 flex items-center justify-center mb-5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                <div className="relative text-center">
                  <p className="text-green-400 text-xs font-bold mb-1">✅ Aprobado</p>
                  <p className="text-white font-black text-2xl">Notable</p>
                  <p className="text-blue-300 font-black text-3xl">7/10</p>
                  <div className="flex gap-1 justify-center mt-2">
                    {[1,1,0,1,1,1,0,1,0,1].map((v, i) => (
                      <div key={i} className={`w-3 h-3 rounded-full ${v ? 'bg-green-400' : 'bg-red-400'}`} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-2">Historia · Mates · Geografía</p>
              <h2 className="text-xl font-black text-gray-900 mb-3">Tus exámenes, gamificados</h2>
              <p className="text-gray-500 leading-relaxed text-sm mb-5 flex-1">
                Juegos adaptados al temario real: 10 preguntas de la Guerra Civil, cálculo con divisiones,
                países de Europa. Nota al final. Cada tema combina múltiples juegos para que el conocimiento
                se fije de verdad.
              </p>
              <Link to="/info/estudiar" className="text-teal-600 hover:text-teal-500 text-sm font-bold transition-colors">
                Ver temas y exámenes →
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 flex flex-col">
              <div className="bg-gradient-to-br from-orange-950 to-rose-900 rounded-xl h-36 flex items-center justify-center mb-5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                <div className="relative text-center">
                  <p className="text-orange-300 text-xs font-bold mb-1">Racha diaria</p>
                  <p className="text-white font-black text-4xl">🔥 14</p>
                  <p className="text-orange-200/50 text-xs mt-1">14 días seguidos</p>
                  <div className="flex gap-1 justify-center mt-2">
                    {['L','M','X','J','V','S','D'].map((d, i) => (
                      <div key={i} className={`w-5 h-5 rounded text-[8px] font-bold flex items-center justify-center ${
                        i < 6 ? 'bg-orange-400/30 text-orange-300' : 'bg-white/10 text-white/30'
                      }`}>{d}</div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-2">2 minutos al día</p>
              <h2 className="text-xl font-black text-gray-900 mb-3">El secreto está en el hábito</h2>
              <p className="text-gray-500 leading-relaxed text-sm mb-5 flex-1">
                Estudiar a última hora no funciona. Un reto nuevo cada día: trivia, cálculo mental,
                portada histórica o país misterioso. Mantén tu racha y crea un hábito de estudio sólido
                sin esfuerzo.
              </p>
              <Link to="/info/diaria" className="text-teal-600 hover:text-teal-500 text-sm font-bold transition-colors">
                La ciencia detrás del reto diario →
              </Link>
            </div>
          </section>

          {/* CÓMO FUNCIONA */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-gray-900 text-center mb-8">Cómo funciona</h2>
            <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center">
              {[
                { num: '1', titulo: 'Elige tema', desc: 'Matemáticas, historia, geografía o el reto del día', emoji: '🎯' },
                { num: '2', titulo: 'Juega 5 min', desc: 'Partidas rápidas con mecánicas que enganchan', emoji: '🎮' },
                { num: '3', titulo: 'Domina', desc: 'Sin darte cuenta has repasado todo el temario', emoji: '🏆' },
              ].map(s => (
                <div key={s.num}>
                  <div className="w-14 h-14 rounded-full bg-teal-50 border-2 border-teal-200 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">{s.emoji}</span>
                  </div>
                  <h3 className="font-black text-gray-900 mb-1">{s.titulo}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="home-seo-2" style={{ minHeight: '90px', marginBottom: '2.5rem' }} />

          {/* EQUIPO */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-gray-900 mb-2">El Proyecto y el Equipo</h2>
              <p className="text-gray-500 leading-relaxed max-w-lg mx-auto">
                Tuthor nace para transformar la educación. Gamificación y ciencia pedagógica
                de la mano: memoria de trabajo, pensamiento crítico, flexibilidad cognitiva.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { nombre: 'Manel Vallés', rol: 'Desarrollo', emoji: '💻' },
                { nombre: 'Magí Tell', rol: 'Desarrollo', emoji: '💻' },
                { nombre: 'Pau Montejano', rol: 'Diseño', emoji: '🎨' },
                { nombre: 'Marc Peñalver', rol: 'Gestión', emoji: '📋' },
              ].map(m => (
                <div key={m.nombre} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-100 to-cyan-50 border-2 border-teal-200 flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <span className="text-2xl">{m.emoji}</span>
                  </div>
                  <p className="text-gray-900 font-bold text-sm">{m.nombre}</p>
                  <p className="text-gray-400 text-xs">{m.rol}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA final */}
          <div className="text-center mt-10">
            <Link to="/juegos"
              className="inline-block py-4 px-10 bg-teal-600 hover:bg-teal-500 text-white font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-teal-600/30">
              Empezar a jugar gratis →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatsWidget({ stats, name, onVerMas }) {
  const streak = stats.streak || 0
  const items = [
    { emoji: '🔥', value: `${streak} día${streak !== 1 ? 's' : ''}`, label: 'Racha' },
    { emoji: '⏱️', value: formatTime(stats.totalTime), label: 'Tiempo total' },
    { emoji: '✅', value: stats.examsPassed ?? 0, label: 'Aprobados' },
    { emoji: '🎮', value: stats.gamesPlayed ?? 0, label: 'Actividades' },
  ]
  return (
    <div className="rounded-xl border border-violet-500/30 bg-violet-600/10 backdrop-blur-sm">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
        <div>
          <p className="font-bold text-white text-sm">Tu progreso, {name}</p>
          <p className="text-white/40 text-xs">Sigue así 💪</p>
        </div>
        <button
          onClick={onVerMas}
          className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
        >
          Ver más →
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

function EmptyStatsWidget({ onVerMas }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="flex items-center justify-between px-5 py-2.5">
        <div className="flex items-center gap-3">
          <span className="text-lg">📊</span>
          <div>
            <p className="font-bold text-white text-sm">Tu progreso</p>
            <p className="text-white/40 text-xs">Completa tu primera actividad para ver stats</p>
          </div>
        </div>
        <button onClick={onVerMas} className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors">
          Ver perfil →
        </button>
      </div>
    </div>
  )
}

function LockedWidget({ onLogin }) {
  const preview = [
    { emoji: '🔥', label: 'Racha' },
    { emoji: '⏱️', label: 'Tiempo' },
    { emoji: '✅', label: 'Aprobados' },
    { emoji: '🎮', label: 'Actividades' },
  ]
  return (
    <div className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
        <div>
          <p className="font-bold text-white text-sm">Tu progreso</p>
          <p className="text-white/40 text-xs">Inicia sesión para ver tus estadísticas</p>
        </div>
        <button
          onClick={onLogin}
          className="text-xs font-bold bg-violet-600 hover:bg-violet-700 text-white px-4 py-1.5 rounded-full transition-colors"
        >
          Iniciar sesión
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
