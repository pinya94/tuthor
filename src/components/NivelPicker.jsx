import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { NIVELES, setNivel, marcarPreguntado, useNivel } from '../lib/nivel'

// El selector de curso. Dos variantes de la MISMA pieza, para que no haya dos
// ideas distintas de qué cursos existen ni dos sitios donde cambiarlo:
//
//   · `card`   — la tarjeta de /app. Aparece una sola vez, a quien no ha
//     elegido curso y no la ha cerrado nunca (useDebePreguntarNivel). No es
//     un modal: se puede ignorar y seguir navegando, que es justo lo que hace
//     que no se sienta como una puerta más antes de ver el producto.
//   · `inline` — la fila de pastillas que sustituye al filtro por nivel que
//     TemarioGrid tenía por su cuenta. Antes ese filtro arrancaba en "Todas"
//     en cada hub y en cada visita; ahora arranca en el curso del alumno y lo
//     que se elija aquí vale para todo el sitio.
//
// "Todas" sigue existiendo siempre y a la vista: el curso es una ayuda, no un
// candado, y un alumno de ESO que quiere repasar algo de Primaria tiene que
// poder hacerlo sin ir a buscar un ajuste.

const SURF = 'rgba(17,20,29,0.86)'

export default function NivelPicker({ variant = 'card', onDone, className = '' }) {
  const { user } = useAuth()
  const { tr } = useLang()
  const nivel = useNivel()

  // El uid solo se pasa para SUBIR el nivel a la cuenta. En modo niño se pasa
  // igual: padre e hijo comparten uid y el curso es del crío, que es quien
  // estudia — las rules le dejan escribir este campo (solo le cierran
  // teacherProfile y los campos de pago).
  const uid = user?.uid ?? null

  function elegir(id) {
    setNivel(id, uid)
    onDone?.(id)
  }

  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        <Pastilla
          activa={!nivel}
          onClick={() => { setNivel(null, uid); marcarPreguntado() }}
          emoji="📚"
          label={tr({ es: 'Todas', en: 'All', ca: 'Totes' })}
        />
        {NIVELES.map(n => (
          <Pastilla
            key={n.id}
            activa={nivel === n.id}
            onClick={() => elegir(n.id)}
            emoji={n.emoji}
            label={tr(n.label)}
          />
        ))}
      </div>
    )
  }

  return (
    <section
      className={`rounded-2xl border border-amber-400/25 p-5 ${className}`}
      style={{ background: 'linear-gradient(135deg, rgba(237,174,73,.14), rgba(139,92,246,.06)), ' + SURF }}
    >
      <p className="text-white font-black text-lg leading-tight mb-1">
        {tr({ es: '¿En qué curso estás?', en: 'What year are you in?', ca: 'A quin curs ets?' })}
      </p>
      <p className="text-white/55 text-sm leading-relaxed mb-4">
        {tr({
          es: 'Lo preguntamos una sola vez. A partir de ahí, los temas y los exámenes que veas serán los de tu curso — sin tener que filtrar en cada pantalla.',
          en: 'We ask just once. From then on, the topics and exams you see are the ones for your year — no filtering on every screen.',
          ca: 'Ho preguntem una sola vegada. A partir d\'aquí, els temes i els exàmens que vegis seran els del teu curs — sense haver de filtrar a cada pantalla.',
        })}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
        {NIVELES.map(n => (
          <button
            key={n.id}
            onClick={() => elegir(n.id)}
            // El nombre accesible se declara a mano: el contenido del botón es
            // un emoji aria-hidden y dos spans anidados, y algunos lectores no
            // lo componen en una etiqueta útil.
            aria-label={tr({
              es: `Estoy en ${n.label.es}`,
              en: `I am in ${n.label.en}`,
              ca: `Sóc a ${n.label.ca}`,
            })}
            className="group flex items-center gap-3 sm:flex-col sm:items-start rounded-xl border border-white/10 hover:border-amber-400/50 bg-white/[0.04] hover:bg-white/[0.08] px-4 py-3 text-left transition-all"
          >
            <span className="text-2xl" aria-hidden="true">{n.emoji}</span>
            <span className="sm:mt-1">
              <span className="block text-white font-bold text-sm">{tr(n.label)}</span>
              <span className="block text-white/40 text-xs">
                {tr({ es: `${n.edades} años`, en: `${n.edades} years`, ca: `${n.edades} anys` })}
              </span>
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={() => { marcarPreguntado(); onDone?.(null) }}
        className="text-white/40 hover:text-white/70 text-xs font-semibold transition-colors"
      >
        {tr({ es: 'Prefiero verlo todo', en: 'I would rather see everything', ca: 'Prefereixo veure-ho tot' })}
      </button>
    </section>
  )
}

function Pastilla({ activa, onClick, emoji, label }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-sm font-bold transition-all border ${
        activa
          ? 'bg-violet-600 text-white border-transparent'
          : 'bg-white/5 text-white/60 border-white/10 hover:text-white hover:bg-white/10'
      }`}
    >
      {emoji} {label}
    </button>
  )
}
