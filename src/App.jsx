import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/next"

// ── PARTÍCULAS ──────────────────────────────────────────
function Particles() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let particles = []
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: -Math.random() * 0.4 - 0.1,
        alpha: Math.random() * 0.5 + 0.1,
      })
    }
    let raf
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p, i) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139,92,246,${p.alpha})`
        ctx.fill()
        p.x += p.dx; p.y += p.dy
        if (p.y < -5 || p.x < -5 || p.x > canvas.width + 5) {
          particles[i] = { x: Math.random() * canvas.width, y: canvas.height + 5, r: Math.random() * 1.5 + 0.3, dx: (Math.random() - 0.5) * 0.3, dy: -Math.random() * 0.4 - 0.1, alpha: Math.random() * 0.5 + 0.1 }
        }
      })
      raf = requestAnimationFrame(animate)
    }
    animate()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}

// ── DATOS ───────────────────────────────────────────────
const MAIN_CARDS = [
  { id: 'estudiar', title: 'Estudiar', subtitle: 'Temarios y tests por nivel', emoji: '📚', gradient: 'from-blue-600 to-indigo-700', path: '/estudiar' },
  { id: 'juegos', title: 'Juegos', subtitle: 'Aprende jugando', emoji: '🎮', gradient: 'from-violet-600 to-purple-800', path: '/juegos' },
  { id: 'diaria', title: 'Pregunta Diaria', subtitle: 'Reto de hoy · Mantén tu racha', emoji: '🔥', gradient: 'from-orange-500 to-rose-600', path: '/diaria' },
]

const LEVELS = [
  { title: 'Primaria', subtitle: '6 - 12 años', emoji: '🎒', gradient: 'from-green-500 to-emerald-600', path: '/estudiar/primaria' },
  { title: 'ESO', subtitle: '12 - 16 años', emoji: '📖', gradient: 'from-blue-500 to-indigo-600', path: '/estudiar/eso' },
  { title: 'Bachillerato', subtitle: '16 - 18 años', emoji: '🎓', gradient: 'from-purple-600 to-violet-700', path: '/estudiar/bachillerato' },
]

const SUBJECTS = [
  { title: 'Historia', subtitle: 'Eventos y épocas clave', emoji: '🏛️', gradient: 'from-amber-500 to-orange-600', ready: true },
  { title: 'Geografía', subtitle: 'Mapas, ríos y capitales', emoji: '🌍', gradient: 'from-teal-500 to-cyan-600', ready: false },
  { title: 'Ciencias', subtitle: 'Biología, física y química', emoji: '🔬', gradient: 'from-green-500 to-emerald-600', ready: false },
  { title: 'Matemáticas', subtitle: 'Álgebra, geometría y más', emoji: '📐', gradient: 'from-blue-500 to-indigo-600', ready: false },
  { title: 'Inglés', subtitle: 'Vocabulario y gramática', emoji: '🇬🇧', gradient: 'from-rose-500 to-pink-600', ready: false },
  { title: 'Lengua', subtitle: 'Literatura y ortografía', emoji: '✍️', gradient: 'from-violet-500 to-purple-600', ready: false },
]

const GAMES = [
  { title: 'BIXO', subtitle: 'Viajero del tiempo', emoji: '🕰️', gradient: 'from-amber-500 to-orange-600', ready: true, url: 'https://consiguetualgogratis.netlify.app' },
  { title: 'GeoRush', subtitle: 'Capitales del mundo', emoji: '🌍', gradient: 'from-teal-400 to-cyan-600', ready: false },
  { title: 'MateChallenge', subtitle: 'Pitágoras y más', emoji: '📐', gradient: 'from-pink-500 to-rose-600', ready: false },
  { title: 'WordBattle', subtitle: 'Vocabulario en inglés', emoji: '🔤', gradient: 'from-blue-500 to-indigo-600', ready: false },
  { title: 'SciQuiz', subtitle: 'Ciencias naturales', emoji: '🔬', gradient: 'from-green-500 to-emerald-600', ready: false },
  { title: 'ChronoMap', subtitle: 'Geografía histórica', emoji: '🗺️', gradient: 'from-purple-500 to-violet-600', ready: false },
  { title: 'NumSpeed', subtitle: 'Cálculo mental rápido', emoji: '⚡', gradient: 'from-yellow-500 to-orange-500', ready: false },
  { title: 'LinguaRun', subtitle: 'Idiomas al sprint', emoji: '🏃', gradient: 'from-cyan-500 to-blue-600', ready: false },
  { title: 'AtomQuest', subtitle: 'Química elemental', emoji: '⚛️', gradient: 'from-rose-500 to-red-600', ready: false },
  { title: 'EcoWorld', subtitle: 'Medio ambiente', emoji: '🌱', gradient: 'from-emerald-500 to-green-700', ready: false },
  { title: 'ArtMaster', subtitle: 'Historia del arte', emoji: '🎨', gradient: 'from-fuchsia-500 to-pink-600', ready: false },
  { title: 'PhysicsX', subtitle: 'Física aplicada', emoji: '🚀', gradient: 'from-slate-500 to-slate-700', ready: false },
]

// ── THUMBNAIL ───────────────────────────────────────────
function Thumbnail({ title, subtitle, emoji, gradient, onClick, comingSoon = false, size = 'normal' }) {
  return (
    <button
      onClick={onClick}
      className={`group relative w-full rounded-2xl overflow-hidden text-left transition-all duration-300
        hover:scale-[1.03] hover:shadow-2xl hover:shadow-black/40 shadow-lg shadow-black/20 cursor-pointer`}
    >
      {/* Área imagen 16:9 */}
      <div className={`bg-gradient-to-br ${gradient} w-full aspect-video flex items-center justify-center relative`}>
        <span className={`drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300
          ${size === 'large' ? 'text-8xl' : 'text-6xl'}`}>
          {emoji}
        </span>
        {comingSoon && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
              🔒 Próximamente
            </span>
          </div>
        )}
        {/* Gradiente inferior para el texto */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />
        {/* Texto encima del gradiente */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="font-bold text-white text-sm leading-tight drop-shadow">{title}</h3>
          <p className="text-white/70 text-xs mt-0.5 drop-shadow">{subtitle}</p>
        </div>
      </div>
    </button>
  )
}

// ── NAVBAR ──────────────────────────────────────────────
function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <nav className="relative z-50 h-16 flex items-center justify-between px-8 bg-black/40 border-b border-white/10 backdrop-blur-md">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <span className="text-2xl">⚡</span>
        <span className="text-xl font-black text-white tracking-tight">Tuthor</span>
      </button>
      <div className="flex items-center gap-1">
        {MAIN_CARDS.map(c => (
          <button
            key={c.id}
            onClick={() => navigate(c.path)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all
              ${location.pathname.startsWith(c.path)
                ? 'bg-violet-600 text-white'
                : 'text-white/60 hover:text-white hover:bg-white/10'}`}
          >
            {c.title}
          </button>
        ))}
      </div>
    </nav>
  )
}

// ── HOME ────────────────────────────────────────────────
function Home() {
  const navigate = useNavigate()
  return (
    <div className="relative z-10 flex flex-col h-[calc(100vh-4rem)] px-8 py-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-black text-white">¿Qué quieres hacer hoy?</h1>
        <p className="text-white/40 mt-1 text-sm">Elige una sección y empieza ahora</p>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-5 max-w-5xl mx-auto w-full">
        {MAIN_CARDS.map(card => (
          <Thumbnail
            key={card.id}
            title={card.title}
            subtitle={card.subtitle}
            emoji={card.emoji}
            gradient={card.gradient}
            size="large"
            onClick={() => navigate(card.path)}
          />
        ))}
      </div>

      {/* Banner progreso + ad */}
      <div className="mt-5 max-w-5xl mx-auto w-full space-y-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm opacity-50">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-3">
              <span className="text-xl">📊</span>
              <div>
                <p className="font-bold text-white text-sm">Trackea tu progreso</p>
                <p className="text-white/40 text-xs">Rachas, puntos y ranking personal</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">Próximamente</span>
              <div className="bg-white/10 text-white/40 text-xs font-semibold px-4 py-2 rounded-xl cursor-not-allowed">
                🔒 Iniciar sesión
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-dashed border-white/10 bg-white/5 h-12 flex items-center justify-center">
          <span className="text-xs text-white/20 font-medium tracking-widest uppercase">Espacio publicitario</span>
        </div>
      </div>
    </div>
  )
}

// ── ESTUDIAR ────────────────────────────────────────────
function Estudiar() {
  const navigate = useNavigate()
  return (
    <div className="relative z-10 flex flex-col h-[calc(100vh-4rem)] px-8 py-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-black text-white">Elige tu nivel y empieza a repasar</h1>
        <p className="text-white/40 mt-1 text-sm">Tests y temarios organizados por etapa educativa</p>
      </div>
      <div className="flex-1 grid grid-cols-3 gap-5 max-w-5xl mx-auto w-full">
        {LEVELS.map(level => (
          <Thumbnail
            key={level.title}
            title={level.title}
            subtitle={level.subtitle}
            emoji={level.emoji}
            gradient={level.gradient}
            size="large"
            onClick={() => navigate(level.path)}
          />
        ))}
      </div>
    </div>
  )
}

// ── NIVEL (Primaria / ESO / Bachillerato) ───────────────
function Nivel({ title }) {
  return (
    <div className="relative z-10 flex flex-col h-[calc(100vh-4rem)] px-8 py-6">
      <div className="text-center mb-6">
        <p className="text-white/40 text-sm mb-1">Estudiar · {title}</p>
        <h1 className="text-3xl font-black text-white">Elige una asignatura</h1>
        <p className="text-white/40 mt-1 text-sm">Selecciona la materia que quieres repasar</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-4 gap-4 max-w-5xl mx-auto w-full pb-4">
          {SUBJECTS.map(sub => (
            <Thumbnail
              key={sub.title}
              title={sub.title}
              subtitle={sub.subtitle}
              emoji={sub.emoji}
              gradient={sub.gradient}
              comingSoon={!sub.ready}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── JUEGOS ──────────────────────────────────────────────
function Juegos() {
  return (
    <div className="relative z-10 flex flex-col h-[calc(100vh-4rem)] px-8 py-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-black text-white">Aprende sin darte cuenta</h1>
        <p className="text-white/40 mt-1 text-sm">Juegos educativos para repasar mientras te diviertes</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-4 gap-4 max-w-5xl mx-auto w-full pb-4">
          {GAMES.map(game => (
            <Thumbnail
              key={game.title}
              title={game.title}
              subtitle={game.subtitle}
              emoji={game.emoji}
              gradient={game.gradient}
              comingSoon={!game.ready}
              onClick={game.ready && game.url ? () => window.open(game.url, '_blank') : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── PREGUNTA DIARIA ─────────────────────────────────────
function PreguntaDiaria() {
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const correct = '1936'
  const options = ['1934', '1936', '1939', '1931']

  const handleAnswer = () => {
    if (selected) setAnswered(true)
  }

  return (
    <div className="relative z-10 flex items-center justify-center h-[calc(100vh-4rem)] px-6">
      <div className="max-w-lg w-full bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-2xl shadow-black/40">
        <div className="bg-gradient-to-r from-orange-500 to-rose-600 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-xs font-medium">Reto de hoy</p>
              <h2 className="text-2xl font-black text-white mt-0.5">Pregunta Diaria</h2>
            </div>
            <div className="text-right">
              <p className="text-orange-100 text-xs">Tu racha</p>
              <p className="text-3xl font-black text-white">🔥 0</p>
            </div>
          </div>
        </div>
        <div className="px-8 py-6">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">Historia · ESO</p>
          <h3 className="text-xl font-bold text-white leading-snug mb-6">
            ¿En qué año comenzó la Guerra Civil Española?
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {options.map(op => (
              <button
                key={op}
                onClick={() => !answered && setSelected(op)}
                className={`py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all
                  ${answered
                    ? op === correct
                      ? 'border-green-500 bg-green-500/20 text-green-400'
                      : op === selected && selected !== correct
                        ? 'border-red-500 bg-red-500/20 text-red-400'
                        : 'border-white/10 text-white/30'
                    : selected === op
                      ? 'border-violet-500 bg-violet-500/20 text-white'
                      : 'border-white/10 text-white/70 hover:border-violet-400 hover:bg-violet-500/10'
                  }`}
              >
                {op}
              </button>
            ))}
          </div>
        </div>
        <div className="px-8 pb-8">
          {!answered ? (
            <button
              onClick={handleAnswer}
              disabled={!selected}
              className="w-full bg-violet-600 disabled:opacity-30 text-white font-bold py-3 rounded-xl hover:bg-violet-700 transition-colors disabled:cursor-not-allowed"
            >
              Confirmar respuesta →
            </button>
          ) : (
            <div className={`text-center py-3 rounded-xl font-bold ${selected === correct ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {selected === correct ? '🎉 ¡Correcto! La respuesta es 1936' : `❌ Era ${correct}. ¡Sigue practicando!`}
            </div>
          )}
          <p className="text-center text-white/30 text-xs mt-3">Nueva pregunta mañana · Vuelve cada día</p>
        </div>
      </div>
    </div>
  )
}

// ── PROGRESO ────────────────────────────────────────────
function Progreso() {
  return (
    <div className="relative z-10 flex items-center justify-center h-[calc(100vh-4rem)] px-6">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-3xl font-black text-white mb-2">Próximamente</h2>
        <p className="text-white/40 mb-8 text-sm">Muy pronto podrás registrarte, guardar tu progreso y competir en el ranking global.</p>
        <div className="bg-white/5 rounded-2xl border-2 border-dashed border-white/10 p-6 blur-sm pointer-events-none select-none">
          <input disabled placeholder="tu@email.com" className="w-full border border-white/10 rounded-xl px-4 py-3 text-sm mb-3 bg-white/5 text-white" />
          <button disabled className="w-full bg-violet-600 text-white font-bold py-3 rounded-xl opacity-50">Crear cuenta gratis</button>
        </div>
        <p className="text-white/30 text-xs mt-4">Estamos trabajando en ello ⚡</p>
      </div>
    </div>
  )
}

// ── LAYOUT ──────────────────────────────────────────────
function Layout() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans overflow-hidden">
      <Particles />
      <Analytics />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/estudiar" element={<Estudiar />} />
        <Route path="/estudiar/primaria" element={<Nivel title="Primaria" />} />
        <Route path="/estudiar/eso" element={<Nivel title="ESO" />} />
        <Route path="/estudiar/bachillerato" element={<Nivel title="Bachillerato" />} />
        <Route path="/juegos" element={<Juegos />} />
        <Route path="/diaria" element={<PreguntaDiaria />} />
        <Route path="/progreso" element={<Progreso />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}