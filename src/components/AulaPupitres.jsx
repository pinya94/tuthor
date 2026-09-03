import { useMemo, useState } from 'react'
import { formatTime } from '../lib/activity'
import StudentSubjects from './StudentSubjects'
import {
  MAX_FILAS, MAX_COLUMNAS,
  normalizar, mesas, sinSitio, sentar, levantar, vaciar, sortear, redimensionar, alAzar,
} from '../lib/seating'

// El plano del aula. Está pensado para dos usos distintos a la vez:
//
//   · proyectado en clase — por eso las mesas son grandes, el contraste es
//     alto y hay una franja de PIZARRA que dice hacia dónde mira el plano;
//   · en el móvil del profesor mientras pasea entre las filas — por eso se
//     coloca a la gente tocando (elegir alumno → tocar mesa) y no arrastrando,
//     que en pantalla táctil falla la mitad de las veces.
//
// Toda la lógica del plano vive en src/lib/seating.js y está testeada aparte:
// aquí solo se pinta y se guarda.

const NOMBRE_CORTO = nombre => (nombre || '').trim().split(/\s+/)[0] || '—'
const RECUERDA_AZAR = 5 // cuántos "sale a la pizarra" recuerda para no repetir

function Boton({ children, onClick, disabled, tono = 'suave' }) {
  const tonos = {
    suave: 'bg-white/5 hover:bg-white/10 border-white/10 text-white/70',
    fuerte: 'bg-teal-600 hover:bg-teal-500 border-teal-500 text-white',
  }
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      className={`text-[12px] font-bold px-3 py-1.5 rounded-lg border transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${tonos[tono]}`}>
      {children}
    </button>
  )
}

function Stepper({ label, value, min, max, onChange }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-white/35 text-[11px] uppercase tracking-wider font-bold">{label}</span>
      <div className="flex items-center gap-1 bg-black/30 border border-white/10 rounded-lg px-1">
        <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min}
          className="w-6 h-6 text-white/50 hover:text-white disabled:opacity-25 font-black">−</button>
        <span className="text-white text-[13px] font-black tabular-nums w-4 text-center">{value}</span>
        <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max}
          className="w-6 h-6 text-white/50 hover:text-white disabled:opacity-25 font-black">+</button>
      </div>
    </div>
  )
}

export default function AulaPupitres({ clase, students, onSave, lang, tr }) {
  const studentIds = useMemo(() => students.map(s => s.uid), [students])
  const porUid = useMemo(() => Object.fromEntries(students.map(s => [s.uid, s])), [students])

  // El plano que se pinta sale SIEMPRE de normalizar(): un dato viejo en
  // Firestore (un alumno que se fue, un aula que encogió) no puede pintar una
  // mesa fantasma aunque nadie haya vuelto a guardar.
  const [plano, setPlano] = useState(() => normalizar(clase.seating, studentIds))
  const [elegido, setElegido] = useState(null)     // alumno seleccionado para sentar
  const [abierto, setAbierto] = useState(null)     // alumno cuya ficha se está viendo
  const [azar, setAzar] = useState(null)           // el que acaba de salir a la pizarra
  const [ultimos, setUltimos] = useState([])
  const [error, setError] = useState('')

  const libres = sinSitio(plano, studentIds)

  // Optimista: se pinta ya y se revierte si Firestore dice que no. Colocar a
  // treinta alumnos esperando a la red cada vez sería inusable en clase.
  async function guardar(nuevo) {
    const previo = plano
    setPlano(nuevo)
    setError('')
    try {
      await onSave(nuevo)
    } catch {
      setPlano(previo)
      setError(tr({ es: 'No se pudo guardar el plano.', en: 'Could not save the plan.', ca: 'No s\'ha pogut desar el plànol.' }))
    }
  }

  function tocarMesa(mesa) {
    if (elegido) {
      guardar(sentar(plano, elegido, mesa.index))
      setElegido(null)
      return
    }
    if (mesa.uid) setAbierto(a => (a === mesa.uid ? null : mesa.uid))
  }

  function sacarAlAzar() {
    const uid = alAzar(studentIds, { evitar: ultimos })
    if (!uid) return
    setAzar(uid)
    setUltimos(u => [uid, ...u].slice(0, RECUERDA_AZAR))
  }

  const alumnoAbierto = abierto ? porUid[abierto] : null

  return (
    <div>
      {/* ── Barra de herramientas ── */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Boton onClick={sacarAlAzar} disabled={students.length === 0} tono="fuerte">
          🎲 {tr({ es: 'Sale a la pizarra', en: 'To the board', ca: 'Surt a la pissarra' })}
        </Boton>
        <Boton onClick={() => { setElegido(null); guardar(sortear(plano, studentIds)) }} disabled={students.length === 0}>
          🔀 {tr({ es: 'Sortear sitios', en: 'Shuffle seats', ca: 'Sortejar llocs' })}
        </Boton>
        <Boton onClick={() => { setElegido(null); setAbierto(null); guardar(vaciar(plano)) }}
          disabled={Object.keys(plano.spots).length === 0}>
          🗑️ {tr({ es: 'Vaciar', en: 'Clear', ca: 'Buidar' })}
        </Boton>
        <div className="flex items-center gap-3 ml-auto">
          <Stepper label={tr({ es: 'Filas', en: 'Rows', ca: 'Files' })} value={plano.rows} min={1} max={MAX_FILAS}
            onChange={n => guardar(redimensionar(plano, n, plano.cols))} />
          <Stepper label={tr({ es: 'Columnas', en: 'Columns', ca: 'Columnes' })} value={plano.cols} min={1} max={MAX_COLUMNAS}
            onChange={n => guardar(redimensionar(plano, plano.rows, n))} />
        </div>
      </div>

      {error && <p className="text-red-400 text-[12.5px] mb-3">{error}</p>}

      {azar && (
        <div className="mb-4 rounded-2xl border border-teal-500/40 bg-teal-500/10 px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-teal-300/70 text-[10.5px] uppercase tracking-widest font-bold">
              {tr({ es: 'Sale a la pizarra', en: 'To the board', ca: 'Surt a la pissarra' })}
            </p>
            <p className="text-white font-black text-xl">{porUid[azar]?.name || azar}</p>
          </div>
          <button type="button" onClick={() => setAzar(null)} className="text-white/40 hover:text-white text-lg px-1">✕</button>
        </div>
      )}

      {/* ── La pizarra: sin esto el plano no dice hacia dónde mira ── */}
      <div className="rounded-t-xl border border-white/10 bg-white/[0.07] py-1.5 text-center">
        <span className="text-white/35 text-[10.5px] uppercase tracking-[0.3em] font-bold">
          {tr({ es: 'Pizarra', en: 'Board', ca: 'Pissarra' })}
        </span>
      </div>

      <div className="border border-t-0 border-white/10 rounded-b-xl p-2.5 sm:p-4 bg-black/20 mb-4">
        <div className="grid gap-1.5 sm:gap-2" style={{ gridTemplateColumns: `repeat(${plano.cols}, minmax(0, 1fr))` }}>
          {mesas(plano).map(mesa => {
            const alumno = mesa.uid ? porUid[mesa.uid] : null
            const esteAbierto = abierto && mesa.uid === abierto
            return (
              <button key={mesa.index} type="button" onClick={() => tocarMesa(mesa)}
                className={`aspect-[4/3] rounded-lg border text-[11px] sm:text-[12.5px] font-bold px-1 flex items-center justify-center text-center leading-tight transition-all ${
                  alumno
                    ? esteAbierto
                      ? 'bg-teal-500 border-teal-400 text-black'
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/15'
                    : elegido
                      ? 'border-dashed border-teal-500/60 bg-teal-500/5 text-teal-300/60 hover:bg-teal-500/15'
                      : 'border-dashed border-white/10 text-white/15 hover:border-white/20'
                }`}>
                <span className="line-clamp-2 break-words">{alumno ? NOMBRE_CORTO(alumno.name) : '·'}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Sin sitio: de aquí se sacan los alumnos, tocando ── */}
      {students.length === 0 ? (
        <p className="text-white/30 text-sm">
          {tr({
            es: 'Todavía no se ha unido ningún alumno. Comparte el código de la clase.',
            en: 'No students have joined yet. Share the class code.',
            ca: 'Encara no s\'hi ha unit cap alumne. Comparteix el codi de la classe.',
          })}
        </p>
      ) : libres.length > 0 && (
        <div className="mb-4">
          <p className="text-white/35 text-[10.5px] uppercase tracking-wider font-bold mb-2">
            {tr({ es: 'Sin sitio', en: 'Not seated', ca: 'Sense lloc' })} · {libres.length}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {libres.map(uid => (
              <button key={uid} type="button" onClick={() => setElegido(e => (e === uid ? null : uid))}
                className={`text-[12.5px] font-semibold px-2.5 py-1.5 rounded-lg border transition-colors ${
                  elegido === uid
                    ? 'bg-teal-500 border-teal-400 text-black'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                }`}>
                {porUid[uid]?.name || uid}
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="text-white/25 text-[11.5px] mb-4">
        {elegido
          ? tr({ es: '👆 Ahora toca la mesa donde quieres sentarlo.', en: '👆 Now tap the desk where they sit.', ca: '👆 Ara toca la taula on vols asseure\'l.' })
          : tr({
            es: 'Toca un alumno de "sin sitio" para colocarlo, o una mesa ocupada para ver sus resultados.',
            en: 'Tap a student under "not seated" to place them, or an occupied desk to see their results.',
            ca: 'Toca un alumne de "sense lloc" per col·locar-lo, o una taula ocupada per veure els seus resultats.',
          })}
      </p>

      {/* ── Ficha del alumno cuya mesa se ha tocado ── */}
      {alumnoAbierto && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <p className="text-white font-black text-lg">{alumnoAbierto.name}</p>
              <p className="text-white/45 text-[12.5px] mt-0.5">
                💰 {alumnoAbierto.coins} · 🔥 {alumnoAbierto.streak} · ⏱ {formatTime(alumnoAbierto.totalTime)} · 📝 {alumnoAbierto.examsTaken || 0}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Boton onClick={() => { guardar(levantar(plano, alumnoAbierto.uid)); setAbierto(null) }}>
                {tr({ es: 'Levantar', en: 'Unseat', ca: 'Aixecar' })}
              </Boton>
              <button type="button" onClick={() => setAbierto(null)} className="text-white/40 hover:text-white text-lg px-1">✕</button>
            </div>
          </div>
          <StudentSubjects subjectEntries={alumnoAbierto.subjectEntries} lang={lang} tr={tr} />
        </div>
      )}
    </div>
  )
}
