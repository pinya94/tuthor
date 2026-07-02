import { useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { MODOS, GRADOS, GRADO_IDS } from '../lib/mathEngine'
import { useLang } from '../context/LangContext'

export default function MatematicasTema() {
  const navigate = useNavigate()
  const location = useLocation()
  const { lang, localPath } = useLang()
  const { modo: modoId } = useParams()
  const modo = MODOS[modoId]
  const [nivel, setNivel] = useState(location.state?.nivel || 'primaria')
  const en = lang === 'en'
  const ca = lang === 'ca'

  if (!modo) { navigate(localPath('/estudiar/matematicas')); return null }

  const grado = GRADOS[nivel]

  const juegos = [
    {
      id: 'examen',
      titulo: ca ? 'Examen de pràctica' : en ? 'Practice exam' : 'Examen de práctica',
      descripcion: ca ? '10 operacions directes. Escriu el resultat exacte i descobreix la teva nota al final.' : en ? '10 direct operations. Write the exact answer and see your grade.' : '10 operaciones directas. Escribe el resultado exacto y descubre tu nota al final.',
      emoji: '📝',
      gradient: 'from-amber-500 to-orange-600',
      detalles: [ca ? '10 preguntes' : en ? '10 questions' : '10 preguntas', ca ? 'Resposta exacta' : en ? 'Exact answer' : 'Respuesta exacta', ca ? 'Nota final' : en ? 'Final grade' : 'Nota final'],
      action: () => navigate(localPath(`/estudiar/matematicas/${modoId}/examen`), { state: { nivel } }),
    },
    ...(modoId === 'funciones' ? [{
      id: 'funciones-mc',
      titulo: ca ? 'Examen de teoria' : en ? 'Theory exam' : 'Examen de teoría',
      descripcion: ca ? '10 preguntes d\'opció múltiple sobre funcions lineals, pendents, eixos i gràfiques. Amb explicació després de cada resposta.' : en ? '10 multiple-choice questions on linear functions, slopes, axes and graphs. With explanation after each answer.' : '10 preguntas de opción múltiple sobre funciones lineales, pendientes, ejes y gráficas. Con explicación tras cada respuesta.',
      emoji: '📈',
      gradient: 'from-violet-500 to-purple-700',
      detalles: [ca ? '10 preguntes' : en ? '10 questions' : '10 preguntas', ca ? 'Opció múltiple' : en ? 'Multiple choice' : 'Opción múltiple', ca ? 'Explicació inclosa' : en ? 'Explanation included' : 'Explicación incluida'],
      action: () => navigate(localPath('/examen/funciones')),
    }] : []),
    {
      id: 'acercate',
      titulo: ca ? 'Apropa\'t al nombre' : en ? 'Target Number' : 'Acércate al número',
      descripcion: ca ? '10 puzzles: combina els nombres amb les operacions permeses fins arribar a l\'objectiu. S\'aprova amb 5 o més encerts.' : en ? '10 puzzles: combine numbers with allowed operations to reach the target. Pass with 5 or more correct.' : '10 puzzles: combina los números con las operaciones permitidas hasta llegar al objetivo. Se aprueba con 5 o más acertados.',
      emoji: '🎯',
      gradient: 'from-pink-500 to-rose-600',
      detalles: ['10 puzzles', ca ? 'Aproves amb 5+' : en ? 'Pass with 5+' : 'Apruebas con 5+', `${grado.tiempo}s ${ca ? 'per puzzle' : en ? 'per puzzle' : 'por puzzle'}`],
      action: () => navigate(localPath(`/estudiar/matematicas/${modoId}/jugar`), { state: { nivel, modoExamen: true } }),
    },
    {
      id: 'numpath',
      titulo: 'NumPath',
      descripcion: ca ? '10 taulers: navega fins a les metes amb la puntuació exacta usant les operacions permeses. S\'aprova amb 5 o més.' : en ? '10 grids: navigate to goals with the exact score using the allowed operations. Pass with 5 or more.' : '10 tableros: navega hasta las metas con la puntuación exacta usando las operaciones permitidas. Se aprueba con 5 o más.',
      emoji: '🧮',
      gradient: 'from-yellow-500 to-orange-500',
      detalles: [ca ? '10 taulers' : en ? '10 boards' : '10 tableros', ca ? 'Aproves amb 5+' : en ? 'Pass with 5+' : 'Apruebas con 5+', modo.ops.join(' ')],
      action: () => navigate(localPath('/juegos/numpath'), { state: { modoExamen: true, ops: modo.ops, nivel, backPath: `/estudiar/matematicas/${modoId}` } }),
    },
  ]

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">

      <div className="max-w-2xl mx-auto w-full mb-6">
        <p className="text-white/30 text-xs mb-4">
          <button onClick={() => navigate(localPath('/estudiar/matematicas'))} className="hover:text-white/60 transition-colors">{ca ? 'Matemàtiques' : en ? 'Mathematics' : 'Matemáticas'}</button>
          {' '}/{'  '}<span className="text-white/50">{ca ? (modo.tituloCa || modo.titulo) : en ? (modo.tituloEn || modo.titulo) : modo.titulo}</span>
        </p>

        <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl w-fit">
          {GRADO_IDS.map(id => (
            <button
              key={id}
              onClick={() => setNivel(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                nivel === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'
              }`}
            >
              <span className="text-base">{GRADOS[id].emoji}</span>
              <span className="hidden sm:inline">{ca ? (GRADOS[id].labelCa || GRADOS[id].label) : en ? (GRADOS[id].labelEn || GRADOS[id].label) : GRADOS[id].label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full mb-6">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{modo.emoji}</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{ca ? (modo.tituloCa || modo.titulo) : en ? (modo.tituloEn || modo.titulo) : modo.titulo}</h1>
            <p className="text-white/40 text-sm mt-0.5">{ca ? `Practica ${(modo.tituloCa || modo.titulo).toLowerCase()} jugant, sense adonar-te'n.` : en ? `Practise ${(modo.tituloEn || modo.titulo).toLowerCase()} by playing.` : `Practica ${modo.titulo.toLowerCase()} jugando, sin darte cuenta.`}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full space-y-4">
        <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">
          {ca ? 'Modes disponibles' : en ? 'Available modes' : 'Modos disponibles'} · {ca ? (grado.labelCa || grado.label) : en ? (grado.labelEn || grado.label) : grado.label}
        </p>

        {juegos.map(j => (
          <button
            key={j.id}
            onClick={j.action}
            className="w-full group relative rounded-2xl overflow-hidden text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/40"
          >
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
                      <span key={d} className="text-xs font-semibold bg-black/25 text-white/80 px-2.5 py-1 rounded-full border border-white/10">
                        {d}
                      </span>
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
