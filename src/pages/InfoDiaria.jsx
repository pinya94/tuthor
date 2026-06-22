import { Link } from 'react-router-dom'

export default function InfoDiaria() {
  return (
    <div className="relative z-10 min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-10 max-w-3xl mx-auto">

      <Link to="/" className="text-white/30 hover:text-white/60 text-sm mb-8 inline-flex items-center gap-1 transition-colors">
        ← Inicio
      </Link>

      <header className="text-center mb-12">
        <span className="text-7xl block mb-4">⚡</span>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
          Reto Diario: El Hábito que Transforma el Estudio
        </h1>
        <p className="text-white/50 max-w-2xl mx-auto leading-relaxed">
          La ciencia es clara: estudiar poco cada día es mucho más efectivo que maratones de última
          hora. El Reto Diario de Tuthor te da un desafío nuevo cada mañana para mantener tu cerebro
          activo en solo 2 minutos.
        </p>
      </header>

      <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="info-diaria-top" style={{ minHeight: '90px', marginBottom: '3rem' }} />

      <section className="mb-10">
        <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
          <span className="text-3xl">🧠</span>
          ¿Por qué funciona el estudio diario?
        </h2>
        <div className="space-y-5">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="font-black text-white text-lg mb-2">Efecto Espaciado (Spaced Repetition)</h3>
            <p className="text-white/50 leading-relaxed">
              Décadas de investigación en psicología cognitiva demuestran que distribuir el estudio en
              sesiones cortas a lo largo del tiempo produce una retención hasta 3 veces superior a las
              sesiones intensivas. Cada reto diario es una micro-sesión de repaso que refuerza conexiones
              neuronales justo antes de que se debiliten.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="font-black text-white text-lg mb-2">Formación de Hábitos (Habit Loop)</h3>
            <p className="text-white/50 leading-relaxed">
              El sistema de rachas funciona como un bucle de hábito: la señal (la notificación o la rutina
              de abrir Tuthor), la rutina (resolver el reto del día) y la recompensa (mantener la racha
              y ver tu progreso). Tras 21 días consecutivos, el estudio diario se convierte en automático.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="font-black text-white text-lg mb-2">Recuperación Activa (Active Recall)</h3>
            <p className="text-white/50 leading-relaxed">
              A diferencia de releer apuntes (método pasivo), el reto diario obliga al cerebro a recuperar
              la información activamente. Responder "¿En qué año comenzó la Guerra Civil?" es mucho más
              efectivo que leer la fecha en un libro. Cada intento de recuperación fortalece la memoria.
            </p>
          </div>
        </div>
      </section>

      <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="info-diaria-mid" style={{ minHeight: '90px', marginBottom: '2.5rem' }} />

      <section className="mb-10">
        <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
          <span className="text-3xl">🎯</span>
          ¿Qué tipo de retos te esperan?
        </h2>
        <p className="text-white/50 leading-relaxed mb-6">
          Cada día rota entre cuatro tipos de desafío para mantener la variedad y activar distintas
          áreas cognitivas:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { emoji: '❓', titulo: 'Pregunta de cultura general', desc: 'Historia, geografía, ciencia, lengua — una pregunta con 4 opciones y explicación detallada de la respuesta.' },
            { emoji: '🧮', titulo: 'Puzzle de cálculo mental', desc: 'Combina números con operaciones para alcanzar el objetivo. El mismo motor que Acércate al Número, en una ronda rápida.' },
            { emoji: '📰', titulo: 'Portada histórica', desc: 'Lee un titular de periódico real y decide si es verdad o mentira. Pensamiento crítico aplicado a la historia.' },
            { emoji: '🌍', titulo: 'Adivina el país', desc: 'Pistas geográficas progresivas para descubrir un país misterioso. Conecta datos de geografía, cultura e historia.' },
          ].map(r => (
            <div key={r.titulo} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{r.emoji}</span>
                <h3 className="font-black text-white">{r.titulo}</h3>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
          <span className="text-3xl">🔥</span>
          El poder de la racha
        </h2>
        <p className="text-white/50 leading-relaxed">
          Tu racha es el número de días consecutivos que has completado el reto. Perderla duele
          — y eso es exactamente lo que la hace funcionar. El compromiso emocional con la racha
          convierte el estudio en algo personal: no estudias porque toca, sino porque no quieres
          romper tu récord. Es el mismo principio que usan Duolingo, Snapchat y las apps de fitness,
          aplicado al rendimiento académico.
        </p>
      </section>

      <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="info-diaria-bottom" style={{ minHeight: '90px', marginBottom: '2.5rem' }} />

      <footer className="text-center border-t border-white/10 pt-10">
        <h2 className="text-2xl font-black text-white mb-3">¿Listo para empezar tu racha?</h2>
        <p className="text-white/40 mb-6">Solo necesitas 2 minutos al día. Sin excusas.</p>
        <Link to="/diaria"
          className="inline-block py-4 px-10 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-amber-500/30">
          Jugar al reto de hoy →
        </Link>
      </footer>
    </div>
  )
}
