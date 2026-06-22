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
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-5 gap-4">
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
        <div className="rounded-lg border border-dashed border-white/10 bg-white/5 h-10 flex items-center justify-center">
          <span className="text-xs text-white/20 font-medium tracking-widest uppercase">Espacio publicitario</span>
        </div>
      </div>

      {/* ── SECCIONES SEO ─────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto w-full mt-8 space-y-10">

        <section className="text-center">
          <h2 className="text-xl sm:text-2xl font-black text-white mb-2">La forma inteligente de repasar sin aburrirte</h2>
          <p className="text-white/40 leading-relaxed text-sm sm:text-base">
            Tuthor convierte el repaso diario en partidas rápidas de 5 minutos. Matemáticas, historia,
            geografía — cada juego está diseñado sobre principios pedagógicos reales para que aprendas
            sin darte cuenta. Sin descargas, sin suscripciones. Solo entra y juega.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🕹️</span>
            <h2 className="text-xl font-black text-white">Jugar: diviértete mientras repasas</h2>
          </div>
          <p className="text-white/40 leading-relaxed text-sm mb-4">
            Nuestro catálogo de juegos educativos cubre cálculo mental, cronología histórica, geografía
            y pensamiento crítico. Cada título usa mecánicas de videojuego — roguelike, puzzles contra
            reloj, deducción por pistas — para que el repaso se sienta como un reto, no como una obligación.
          </p>
          <Link to="/info/juegos" className="text-[#EDAE49] hover:text-amber-300 text-sm font-bold transition-colors">
            Ver todos los juegos y su base científica →
          </Link>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">📚</span>
            <h2 className="text-xl font-black text-white">Estudiar: tus temas de examen, gamificados</h2>
          </div>
          <p className="text-white/40 leading-relaxed text-sm">
            Llevamos el repaso de exámenes al siguiente nivel. Los mismos juegos, pero adaptados al temario
            real: 10 preguntas de la Guerra Civil Española, un examen de cálculo mental por operaciones,
            portadas históricas de la Segunda Guerra Mundial. Aprueba con 5 o más aciertos y obtén tu nota.
            Cada tema tiene línea temporal, personajes históricos, fechas y portadas — todo interconectado
            para que el conocimiento se fije de verdad.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">⚡</span>
            <h2 className="text-xl font-black text-white">Reto Diario: el secreto está en el hábito</h2>
          </div>
          <p className="text-white/40 leading-relaxed text-sm">
            Estudiar a última hora no funciona. El verdadero aprendizaje se consolida día a día. Con el
            Reto Diario, solo necesitas 2 minutos para mantener tu cerebro activo: una pregunta de cultura
            general, un puzzle de cálculo mental, una portada histórica o un país misterioso. Mantén tu
            racha y crea un hábito de estudio sólido sin esfuerzo.
          </p>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">👥</span>
            <h2 className="text-xl font-black text-white">El Proyecto y el Equipo</h2>
          </div>
          <p className="text-white/40 leading-relaxed text-sm mb-6">
            Tuthor nace para transformar la forma en que los estudiantes se enfrentan a las materias
            escolares. Creemos que la gamificación y la ciencia pedagógica van de la mano: cada juego
            está diseñado para activar habilidades cognitivas reales — memoria de trabajo, pensamiento
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
