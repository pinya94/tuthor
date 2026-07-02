import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'

export default function FuncionesTema() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const en = lang === 'en'
  const ca = lang === 'ca'

  const juegos = [
    {
      id: 'trayectoria',
      titulo: 'Trayectoria',
      descripcion: ca
        ? 'Joc roguelike de funcions. Tria la funció correcta per marcar gol. Ves superant rondes i desbloqueja millores.'
        : en
        ? 'Functions roguelike game. Pick the right function to score. Survive rounds and unlock power-ups.'
        : 'Juego roguelike de funciones. Elige la función correcta para marcar gol. Supera rondas y desbloquea mejoras.',
      emoji: '⚽',
      gradient: 'from-violet-500 to-purple-600',
      detalles: [
        ca ? 'Mode lliure' : en ? 'Free mode' : 'Modo libre',
        ca ? 'Temps limitat' : en ? 'Time limit' : 'Tiempo limitado',
        ca ? 'Millores permanents' : en ? 'Permanent upgrades' : 'Mejoras permanentes',
      ],
      action: () => navigate(localPath('/juegos/trayectoria')),
    },
    {
      id: 'examen',
      titulo: ca ? 'Examen de pràctica' : en ? 'Practice exam' : 'Examen de práctica',
      descripcion: ca
        ? '10 preguntes sense temps: rectes, paràboles i funcions a trossos. Descobreix la teva nota al final.'
        : en
        ? '10 questions with no time limit: lines, parabolas and piecewise functions. See your grade at the end.'
        : '10 preguntas sin tiempo: rectas, parábolas y funciones a trozos. Descubre tu nota al final.',
      emoji: '📝',
      gradient: 'from-amber-500 to-orange-600',
      detalles: [
        ca ? '10 preguntes' : en ? '10 questions' : '10 preguntas',
        ca ? 'Sense temps' : en ? 'No time limit' : 'Sin tiempo',
        ca ? 'Nota final' : en ? 'Final grade' : 'Nota final',
      ],
      action: () => navigate(localPath('/examen/trayectoria')),
    },
  ]

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <div className="max-w-2xl mx-auto w-full mb-6">
        <p className="text-white/30 text-xs mb-4">
          <button onClick={() => navigate(localPath('/estudiar/matematicas'))} className="hover:text-white/60 transition-colors">
            {ca ? 'Matemàtiques' : en ? 'Mathematics' : 'Matemáticas'}
          </button>
          {' '}/{' '}<span className="text-white/50">{ca ? 'Funcions' : en ? 'Functions' : 'Funciones'}</span>
        </p>
        <div className="flex items-center gap-4">
          <span className="text-5xl">⚽</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {ca ? 'Funcions' : en ? 'Functions' : 'Funciones'}
            </h1>
            <p className="text-white/40 text-sm mt-0.5">
              {ca ? 'Rectes, paràboles i funcions a trossos' : en ? 'Lines, parabolas and piecewise functions' : 'Rectas, parábolas y funciones a trozos'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full space-y-4">
        <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">
          {ca ? 'Modes disponibles' : en ? 'Available modes' : 'Modos disponibles'}
        </p>
        {juegos.map(j => (
          <button key={j.id} onClick={j.action}
            className="w-full group relative rounded-2xl overflow-hidden text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/40">
            <div className={`bg-gradient-to-br ${j.gradient} p-6`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">{j.emoji}</span>
                    <h3 className="font-black text-white text-xl">{j.titulo}</h3>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">{j.descripcion}</p>
                  <div className="flex flex-wrap gap-2">
                    {j.detalles.map(d => (
                      <span key={d} className="text-xs font-semibold bg-black/25 text-white/80 px-2.5 py-1 rounded-full border border-white/10">{d}</span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
                    <span className="text-white font-black text-lg">→</span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
