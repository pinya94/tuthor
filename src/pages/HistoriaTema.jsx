import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EVENTOS_HISTORIA, calcularMargen } from '../data/historiaEvents'

const NIVELES = [
  { id: 'primaria', label: 'Primaria', emoji: '🎒' },
  { id: 'eso',      label: 'ESO',      emoji: '📖' },
  { id: 'bachillerato', label: 'Bachillerato', emoji: '🎓' },
]

const TEMAS_META = {
  primaria: { titulo: 'Grandes Hitos',          emoji: '🌍', descripcion: 'Los momentos más importantes que cambiaron el mundo.' },
  gce:      { titulo: 'Guerra Civil Española',   emoji: '🇪🇸', descripcion: 'De la Segunda República al franquismo, 1931–1978.' },
  wwii:     { titulo: 'Segunda Guerra Mundial',  emoji: '⚔️', descripcion: 'El conflicto más grande de la historia, 1939–1945.' },
  roma:     { titulo: 'Antigua Roma',            emoji: '🏛️', descripcion: 'Desde la fundación de Roma hasta la caída del Imperio.' },
  usa:      { titulo: 'Independencia Americana', emoji: '🦅', descripcion: 'De las colonias británicas a los Estados Unidos, 1773–1789.' },
}

// Qué niveles tienen Juego de Fechas disponible para cada categoría
const NIVELES_FECHAS = {
  primaria: [],                          // demasiado amplio para escribir año exacto
  gce:      ['eso', 'bachillerato'],
  wwii:     ['eso', 'bachillerato'],
  roma:     ['eso', 'bachillerato'],
  usa:      ['bachillerato'],
}

// Nivel por defecto para cada categoría
const NIVEL_DEFAULT = {
  primaria: 'primaria',
  gce:      'eso',
  wwii:     'eso',
  roma:     'eso',
  usa:      'bachillerato',
}

export default function HistoriaTema() {
  const navigate     = useNavigate()
  const { categoria } = useParams()
  const meta         = TEMAS_META[categoria]
  const [nivel, setNivel] = useState(NIVEL_DEFAULT[categoria] || 'primaria')

  if (!meta) { navigate('/estudiar/historia'); return null }

  const eventos = EVENTOS_HISTORIA.filter(e => e.categoria === categoria)
  const margen  = calcularMargen(categoria)
  const tieneFechas = (NIVELES_FECHAS[categoria] || []).includes(nivel)

  // Configuración de Línea Temporal según nivel
  const ltConfig = nivel === 'primaria'
    ? { lives: 5, winAt: 10, livesLabel: '5 vidas', winLabel: 'Coloca 10 → Apruebas' }
    : { lives: 3, winAt: null, livesLabel: '3 vidas', winLabel: `Coloca ${eventos.length} → Apruebas` }

  const modos = [
    {
      id: 'linea',
      titulo: 'Línea del Tiempo',
      descripcion: 'Coloca los eventos en orden cronológico sin ver el año. Solo intuición histórica.',
      emoji: '📜',
      gradient: 'from-violet-600 to-indigo-700',
      detalles: [ltConfig.livesLabel, ltConfig.winLabel, `${eventos.length} eventos`],
      action: () => navigate('/examen/linea-temporal', {
        state: { categoria, nivel, backPath: `/estudiar/historia/${categoria}` }
      }),
    },
    tieneFechas && {
      id: 'fechas',
      titulo: 'Juego de Fechas',
      descripcion: 'Escribe el año exacto de cada evento. Margen de ±' + margen + ' años. Una vida.',
      emoji: '📅',
      gradient: 'from-amber-500 to-orange-600',
      detalles: ['1 vida', `±${margen} años de margen`, `${eventos.length} preguntas`],
      action: () => navigate('/examen/historia', {
        state: {
          examen: { id: categoria, ...meta },
          nivel,
          backPath: `/estudiar/historia/${categoria}`,
        }
      }),
    },
  ].filter(Boolean)

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">

      {/* Breadcrumb + nivel switcher */}
      <div className="max-w-2xl mx-auto w-full mb-6">
        <p className="text-white/30 text-xs mb-4">
          <button onClick={() => navigate('/estudiar/historia')} className="hover:text-white/60 transition-colors">Historia</button>
          {' '}/{'  '}<span className="text-white/50">{meta.titulo}</span>
        </p>

        {/* Selector de nivel */}
        <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl w-fit">
          {NIVELES.map(n => (
            <button
              key={n.id}
              onClick={() => setNivel(n.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                nivel === n.id
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              <span className="text-base">{n.emoji}</span>
              <span className="hidden sm:inline">{n.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cabecera del tema */}
      <div className="max-w-2xl mx-auto w-full mb-6">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{meta.emoji}</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{meta.titulo}</h1>
            <p className="text-white/40 text-sm mt-0.5">{meta.descripcion}</p>
          </div>
        </div>
      </div>

      {/* Modos de juego */}
      <div className="max-w-2xl mx-auto w-full space-y-4">
        <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">
          Modos disponibles · {NIVELES.find(n => n.id === nivel)?.label}
        </p>

        {modos.map(modo => (
          <button
            key={modo.id}
            onClick={modo.action}
            className="w-full group relative rounded-2xl overflow-hidden text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/40"
          >
            <div className={`bg-gradient-to-br ${modo.gradient} p-6`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">{modo.emoji}</span>
                    <h3 className="font-black text-white text-xl">{modo.titulo}</h3>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">{modo.descripcion}</p>
                  <div className="flex flex-wrap gap-2">
                    {modo.detalles.map(d => (
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

        {/* Próximamente */}
        {[
          { id: 'personajes', titulo: 'Personajes Históricos', emoji: '👤', desc: '¿Quién soy? Adivina a partir de pistas.' },
          { id: 'mapas',      titulo: 'Mapas Históricos',      emoji: '🗺️', desc: 'Identifica territorios y batallas.' },
        ].map(m => (
          <div key={m.id} className="w-full rounded-2xl bg-white/3 border border-white/8 p-5 opacity-50">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{m.emoji}</span>
              <div>
                <h3 className="font-bold text-white/60 text-base">{m.titulo}</h3>
                <p className="text-white/30 text-xs mt-0.5">{m.desc}</p>
              </div>
              <span className="ml-auto text-xs font-bold text-white/30 border border-white/15 px-2 py-0.5 rounded-full">Pronto</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
