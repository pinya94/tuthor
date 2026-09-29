// "Mi clase" del alumno, solo la parte visual (Clase.jsx carga los datos).
// Separada para poder pintarla con datos de ejemplo al revisarla.
import { tareaVencida, fechaCortaDeTarea } from '../lib/assignments'
import { GAMES } from '../lib/games'
import { EXAMS } from '../lib/exams'
import { SUBJECTS } from '../lib/statsAggregation'
import { catalogTaskLabel, catalogTaskRoute } from '../lib/topicCatalog'
import { TAG_META } from '../lib/observations'
import { ARTE_JUEGOS, ArteJuego, slugDeRuta } from './arte'
import { Acierto, Fallo, Bombilla, Estrella, Pizarra, AnilloNota } from './Iconos'
import { Chincheta, Libreta } from './IconosProfesor'
import RecursosInteractivos from './RecursosInteractivos'

const TARJETA = 'rounded-2xl bg-[#141b2e] border border-white/[0.08]'
const sinEmojis = s => String(s || '').replace(/(?:\p{Extended_Pictographic}|\u{FE0F})+\s?/gu, '').trim()

function etiquetaTarea(task, lang) {
  if (task.kind !== 'catalog') return task.title
  return sinEmojis(catalogTaskLabel(task, lang, { games: GAMES, exams: EXAMS, subjects: SUBJECTS }))
}

function rutaTarea(task) {
  if (task.kind === 'quiz') return `/clase/examen/${task.id}`
  return catalogTaskRoute(task, { games: GAMES, exams: EXAMS })
}

function fechaLegible(createdAt, lang) {
  const d = createdAt?.toDate ? createdAt.toDate() : createdAt instanceof Date ? createdAt : null
  if (!d) return ''
  return d.toLocaleDateString(lang === 'en' ? 'en-GB' : lang === 'ca' ? 'ca-ES' : 'es-ES', { day: 'numeric', month: 'short' })
}

// Miniatura de la tarea: el dibujo del juego si lo tiene; si no, un icono.
function Miniatura({ task }) {
  const slug = task.kind === 'catalog' ? slugDeRuta(rutaTarea(task)) : null
  if (slug && ARTE_JUEGOS[slug]) {
    return <ArteJuego slug={slug} className="shrink-0 w-20 sm:w-24 aspect-video rounded-lg bg-white/[0.04]" />
  }
  const Icono = task.kind === 'quiz' ? Bombilla : Chincheta
  return (
    <span className="shrink-0 w-20 sm:w-24 aspect-video rounded-lg bg-white/[0.04] grid place-items-center">
      <Icono className="w-7 h-7" />
    </span>
  )
}

function Tarea({ task, uid, lang, tr, onAbrir }) {
  const c = task.completions?.[uid]
  const hecha = !!c?.done
  const vencida = !hecha && tareaVencida(task.dueDate)
  const ruta = !hecha ? rutaTarea(task) : null

  const estado = hecha ? (
    <span className={`shrink-0 inline-flex items-center gap-1.5 text-[12.5px] font-bold px-2.5 py-1 rounded-full ${c.passed === false ? 'bg-rose-500/12 text-rose-300' : 'bg-green-500/12 text-green-300'}`}>
      {c.passed === false ? <Fallo className="w-4 h-4" /> : <Acierto className="w-4 h-4" />}
      {c.passed === false
        ? tr({ es: 'No aprobado', en: 'Not passed', ca: 'No aprovat' })
        : c.passed === true ? tr({ es: 'Aprobado', en: 'Passed', ca: 'Aprovat' }) : tr({ es: 'Hecha', en: 'Done', ca: 'Feta' })}
      {c.score != null && <span className="text-white/45 font-semibold tabular-nums">· {c.score} pts</span>}
    </span>
  ) : ruta ? (
    <span className="shrink-0 px-3.5 py-2 rounded-xl bg-[#EDAE49] group-hover:bg-amber-400 text-black text-[13px] font-black transition-colors">
      {tr({ es: 'Jugar', en: 'Play', ca: 'Jugar' })} →
    </span>
  ) : (
    <span className={`shrink-0 text-[12.5px] font-bold ${vencida ? 'text-rose-300' : 'text-white/40'}`}>
      {vencida ? tr({ es: 'Vencida', en: 'Overdue', ca: 'Vençuda' }) : tr({ es: 'Pendiente', en: 'Pending', ca: 'Pendent' })}
    </span>
  )

  const dentro = (
    <>
      <Miniatura task={task} />
      <div className="flex-1 min-w-0 text-left">
        <p className="text-white text-[14.5px] font-bold leading-snug line-clamp-2">{etiquetaTarea(task, lang)}</p>
        <p className="text-white/45 text-[12px] mt-1">
          {task.className}
          {task.dueDate && (
            <span className={vencida ? 'text-rose-300 font-semibold' : ''}>
              {' · '}{tr({ es: 'vence', en: 'due', ca: 'venç' })} {fechaCortaDeTarea(task.dueDate, lang)}
            </span>
          )}
        </p>
      </div>
      {estado}
    </>
  )
  const cls = `group w-full ${TARJETA} ${vencida ? 'border-rose-500/30' : ''} p-2.5 pr-3.5 flex items-center gap-3.5`
  return ruta ? (
    <button type="button" onClick={() => onAbrir(ruta)} className={`${cls} hover:border-white/20 transition-colors`}>{dentro}</button>
  ) : (
    <div className={`${cls} ${hecha ? 'opacity-80' : ''}`}>{dentro}</div>
  )
}

const ICONO_OBS = { positiva: Estrella, neutra: Libreta, negativa: Fallo }

export default function ClaseAlumno({ clases, tareas, observaciones, uid, lang, tr, onAbrir, unirse }) {
  const pendientes = tareas.filter(t => !t.completions?.[uid]?.done)
    .sort((a, b) => (a.dueDate?.toMillis?.() ?? Infinity) - (b.dueDate?.toMillis?.() ?? Infinity))
  const hechas = tareas.filter(t => t.completions?.[uid]?.done)
  const obs = [...observaciones].sort((a, b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0))

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Cabecera: la clase y cómo vas */}
      <section className={`${TARJETA} shadow-xl shadow-black/30 p-5 sm:p-6 mb-6 flex flex-wrap items-center gap-5`}>
        <span className="shrink-0 w-14 h-14 rounded-2xl bg-teal-500/12 grid place-items-center">
          <Pizarra className="w-8 h-8" />
        </span>
        <div className="flex-1 min-w-[180px]">
          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{tr({ es: 'Mi clase', en: 'My class', ca: 'La meva classe' })}</h1>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {clases.map(c => (
              <span key={c.id} className="text-xs font-bold text-teal-200 bg-teal-500/12 border border-teal-400/20 rounded-full px-2.5 py-1">{c.name}</span>
            ))}
          </div>
        </div>
        {tareas.length > 0 && (
          <div className="flex items-center gap-3">
            <AnilloNota valor={hechas.length} total={tareas.length} className="w-16 h-16" />
            <div>
              <p className="text-white font-black text-lg leading-none">
                {pendientes.length} <span className="text-white/50 text-sm font-bold">{tr(pendientes.length === 1 ? { es: 'pendiente', en: 'to do', ca: 'pendent' } : { es: 'pendientes', en: 'to do', ca: 'pendents' })}</span>
              </p>
              <p className="text-white/40 text-xs mt-1">{hechas.length} {tr({ es: 'hechas', en: 'done', ca: 'fetes' })}</p>
            </div>
          </div>
        )}
      </section>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
        {/* Tareas */}
        <div>
          <h2 className="text-white font-black text-lg mb-3">{tr({ es: 'Por hacer', en: 'To do', ca: 'Per fer' })}</h2>
          {pendientes.length === 0 ? (
            <div className={`${TARJETA} px-5 py-6 flex items-center gap-4 mb-8`}>
              <Acierto className="w-9 h-9 shrink-0" />
              <p className="text-white/60 text-sm">{tr({ es: 'No tienes tareas pendientes. ¡Todo al día!', en: 'Nothing to do. All caught up!', ca: 'No tens tasques pendents. Tot al dia!' })}</p>
            </div>
          ) : (
            <div className="space-y-2.5 mb-8">
              {pendientes.map(t => <Tarea key={t.id} task={t} uid={uid} lang={lang} tr={tr} onAbrir={onAbrir} />)}
            </div>
          )}

          {hechas.length > 0 && (
            <>
              <h2 className="text-white/70 font-black text-base mb-3">{tr({ es: 'Hechas', en: 'Done', ca: 'Fetes' })}</h2>
              <div className="space-y-2.5">
                {hechas.map(t => <Tarea key={t.id} task={t} uid={uid} lang={lang} tr={tr} onAbrir={onAbrir} />)}
              </div>
            </>
          )}
        </div>

        {/* Lateral: lo que te dice tu profesor y unirte a otra clase */}
        <aside className="space-y-4">
          {obs.length > 0 && (
            <section className={`${TARJETA} p-4`}>
              <h2 className="text-white font-black text-[15px] mb-3">{tr({ es: 'Tu profesor dice', en: 'Your teacher says', ca: 'El teu professor diu' })}</h2>
              <div className="space-y-2">
                {obs.map(o => {
                  const m = TAG_META[o.tag] ?? TAG_META.neutra
                  const Icono = ICONO_OBS[o.tag] ?? Libreta
                  return (
                    <div key={o.id} className={`rounded-xl border px-3 py-2.5 flex gap-2.5 ${m.color}`}>
                      <Icono className="w-4 h-4 shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-[13.5px] leading-snug whitespace-pre-wrap break-words">{o.text}</p>
                        <p className="text-[11px] opacity-60 mt-1">{clases.length > 1 ? `${o.className} · ` : ''}{fechaLegible(o.createdAt, lang)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )}
          <section className={`${TARJETA} p-4`}>{unirse}</section>
        </aside>
      </div>

      {/* Recursos: para los deberes, abajo y a lo ancho */}
      <section className="mt-10">
        <h2 className="text-white font-black text-lg mb-1">{tr({ es: 'Recursos para tus deberes', en: 'Help with your homework', ca: 'Recursos per als deures' })}</h2>
        <p className="text-white/40 text-[13px] mb-3">
          {tr({ es: 'Escribe el ejercicio y te lo resolvemos paso a paso.', en: 'Type the exercise and we solve it step by step.', ca: "Escriu l'exercici i te'l resolem pas a pas." })}
        </p>
        <RecursosInteractivos />
      </section>
    </div>
  )
}
