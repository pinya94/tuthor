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

      {/* ── SECCIONES SEO (debajo del fold) ───────────────────────────────── */}
      <div className="max-w-3xl mx-auto w-full mt-12 space-y-6 pb-12">

        <div className="text-center mb-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">La forma inteligente de repasar sin aburrirte</h2>
          <p className="text-white/50 leading-relaxed max-w-xl mx-auto">
            Tuthor convierte el repaso diario en partidas rápidas de 5 minutos. Matemáticas, historia,
            geografía — diseñado sobre principios pedagógicos reales.
          </p>
        </div>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🕹️</span>
            <div>
              <h2 className="text-xl font-black text-white">Jugar: diviértete mientras repasas</h2>
              <p className="text-white/30 text-xs uppercase tracking-widest mt-0.5">6 juegos disponibles</p>
            </div>
          </div>
          <p className="text-white/50 leading-relaxed mb-4">
            Nuestro catálogo de juegos educativos cubre cálculo mental, cronología histórica, geografía
            y pensamiento crítico. Cada título usa mecánicas de videojuego — roguelike, puzzles contra
            reloj, deducción por pistas — para que el repaso se sienta como un reto, no como una obligación.
          </p>
          <Link to="/info/juegos" className="text-[#EDAE49] hover:text-amber-300 text-sm font-bold transition-colors">
            Ver todos los juegos y su base científica →
          </Link>
        </section>

        <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="home-seo-1" style={{ minHeight: '90px' }} />

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">📚</span>
            <div>
              <h2 className="text-xl font-black text-white">Estudiar: tus exámenes, gamificados</h2>
              <p className="text-white/30 text-xs uppercase tracking-widest mt-0.5">Historia · Matemáticas · Geografía</p>
            </div>
          </div>
          <p className="text-white/50 leading-relaxed mb-4">
            Llevamos el repaso de exámenes al siguiente nivel. Juegos adaptados al temario real: la Guerra
            Civil Española, cálculo con divisiones, países de Europa. 10 preguntas, nota al final. Cada tema
            combina línea temporal, personajes, portadas y fechas para que el conocimiento se fije de verdad.
          </p>
          <Link to="/info/estudiar" className="text-[#EDAE49] hover:text-amber-300 text-sm font-bold transition-colors">
            Ver todos los temas y exámenes →
          </Link>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">⚡</span>
            <div>
              <h2 className="text-xl font-black text-white">Reto Diario: el secreto está en el hábito</h2>
              <p className="text-white/30 text-xs uppercase tracking-widest mt-0.5">2 minutos al día</p>
            </div>
          </div>
          <p className="text-white/50 leading-relaxed mb-4">
            Estudiar a última hora no funciona. Con el Reto Diario, solo necesitas 2 minutos para mantener
            tu cerebro activo: una pregunta de cultura general, un puzzle de cálculo mental, una portada
            histórica o un país misterioso. Mantén tu racha y crea un hábito de estudio sólido.
          </p>
          <Link to="/info/diaria" className="text-[#EDAE49] hover:text-amber-300 text-sm font-bold transition-colors">
            Descubre la ciencia detrás del reto diario →
          </Link>
        </section>

        <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="home-seo-2" style={{ minHeight: '90px' }} />

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">👥</span>
            <h2 className="text-xl font-black text-white">El Proyecto y el Equipo</h2>
          </div>
          <p className="text-white/50 leading-relaxed mb-6">
            Tuthor nace para transformar la forma en que los estudiantes se enfrentan a las materias
            escolares. Gamificación y ciencia pedagógica de la mano: memoria de trabajo, pensamiento
            crítico, flexibilidad cognitiva — mientras el alumno se divierte.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { nombre: 'Manel Vallés', rol: 'Desarrollo', emoji: '💻' },
              { nombre: 'Magí Tell', rol: 'Desarrollo', emoji: '💻' },
              { nombre: 'Pau Montejano', rol: 'Diseño', emoji: '🎨' },
              { nombre: 'Marc Peñalver', rol: 'Gestión', emoji: '📋' },
            ].map(m => (
              <div key={m.nombre} className="text-center">
                <div className="w-14 h-14 rounded-full bg-white/10 border border-white/15 flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">{m.emoji}</span>
                </div>
                <p className="text-white font-bold text-sm">{m.nombre}</p>
                <p className="text-white/30 text-xs">{m.rol}</p>
              </div>
            ))}
          </div>
        </section>
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
