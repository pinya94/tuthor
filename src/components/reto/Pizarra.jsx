// La pizarra de una partida en directo: la ve toda la clase en el proyector y
// la maneja el profe. Sala (código, QR y apodos que van entrando) → pregunta
// (grande, con cuenta atrás y cuántos han respondido) → solución (la misma
// pregunta corregida, cuántos acertaron y el top 5) → … → podio.
//
// Cada pregunta la genera AQUÍ el generador del juego y viaja a los móviles
// como texto: todos contestan exactamente la misma.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../../context/LangContext'
import { escuchaColeccion, lanzaPregunta, muestraSolucion, terminaDirecto, reiniciaDirecto, posiciones } from '../../lib/rankingClase'
import { NotaProfe } from './ExamenReto'

const ORIGEN = 'https://www.tuthor.es'
const MEDALLA = ['🥇', '🥈', '🥉']
const boton = 'rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black px-6 py-3 text-lg disabled:opacity-40'
const botonGris = 'rounded-xl border border-white/10 bg-white/[0.06] hover:bg-white/[0.12] px-4 py-2 text-white/80 font-bold'

export default function Pizarra({ codigo, reto, title, lv, difficulty, genRound, renderQuestion, l }) {
  const { tr, lang, localPath } = useLang()
  const dir = useMemo(() => reto.directo ?? { estado: 'sala', i: -1 }, [reto.directo])
  const n = reto.nPreguntas ?? 10
  const T = (reto.segundos ?? 30) * 1000
  const enlace = `${ORIGEN}${lang === 'es' ? '' : `/${lang}`}/reto/${codigo}`
  const [alumnos, setAlumnos] = useState([])
  const [marcador, setMarcador] = useState([])
  const [respuestas, setRespuestas] = useState([])
  const [qr, setQr] = useState(null)
  const [ocupado, setOcupado] = useState(false)
  const ronda = useMemo(() => { try { return dir.ronda ? JSON.parse(dir.ronda) : null } catch { return null } }, [dir.ronda])

  useEffect(() => escuchaColeccion(codigo, 'alumnos', setAlumnos), [codigo])
  useEffect(() => escuchaColeccion(codigo, 'marcador', setMarcador), [codigo])
  useEffect(() => {
    if (dir.i < 0) return
    return escuchaColeccion(codigo, 'respuestas', setRespuestas, ['i', '==', dir.i])
  }, [codigo, dir.i])
  useEffect(() => {
    let vivo = true
    import('qrcode').then(m => m.default.toDataURL(enlace, { width: 520, margin: 1 })).then(u => { if (vivo) setQr(u) }).catch(() => {})
    return () => { vivo = false }
  }, [enlace])

  const lanza = useCallback(async i => {
    setOcupado(true)
    try { await lanzaPregunta(codigo, i, genRound(difficulty)) } finally { setOcupado(false) }
  }, [codigo, genRound, difficulty])
  const solucion = useCallback(() => muestraSolucion(codigo, dir), [codigo, dir])

  const filas = [...marcador].sort((a, b) => b.puntos - a.puntos)
  const pos = posiciones(filas)
  const respondidas = dir.estado === 'pregunta' || dir.estado === 'solucion' ? respuestas.filter(r => r.i === dir.i) : []
  const acertadas = respondidas.filter(r => r.correcta).length

  // ── Sala ──
  if (dir.estado === 'sala' || dir.i < 0) {
    return (
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] items-start">
          <div>
            <p className="text-white/45 text-sm font-bold uppercase tracking-widest">📺 {tr({ es: 'Partida en directo', en: 'Live game', ca: 'Partida en directe' })} · {title?.[l] ?? title?.es} · {lv?.emoji} {lv?.label?.[l] ?? lv?.label?.es ?? ''}</p>
            <h1 className="text-white font-black text-4xl md:text-5xl leading-tight mt-1">{reto.nombre}</h1>
            <p className="text-white/70 text-xl md:text-2xl mt-6">{tr({ es: 'Entra en', en: 'Go to', ca: 'Entra a' })} <b className="text-white">tuthor.es/reto</b> {tr({ es: 'con el código', en: 'with the code', ca: 'amb el codi' })}</p>
            <p className="font-mono font-black text-amber-300 tracking-[0.25em] text-6xl md:text-8xl mt-2">{codigo}</p>
            <div className="mt-5 max-w-xl"><NotaProfe nota={reto.nota} /></div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button type="button" className={boton} disabled={ocupado || alumnos.length === 0} onClick={() => lanza(0)}>
                ▶ {tr({ es: 'Empezar', en: 'Start', ca: 'Començar' })} · {n} {tr({ es: 'preguntas', en: 'questions', ca: 'preguntes' })} · {reto.segundos ?? 30}s
              </button>
              {marcador.length > 0 && <button type="button" className={botonGris} onClick={() => reiniciaDirecto(codigo)}>↺ {tr({ es: 'Borrar puntos anteriores', en: 'Clear previous scores', ca: 'Esborrar punts anteriors' })}</button>}
            </div>
          </div>
          {qr && <img src={qr} alt={enlace} className="w-full max-w-[360px] rounded-2xl bg-white p-3 mx-auto" />}
        </div>
        <div className="mt-8">
          <p className="text-white/50 font-bold mb-2">{alumnos.length} {tr({ es: alumnos.length === 1 ? 'alumno dentro' : 'alumnos dentro', en: alumnos.length === 1 ? 'student in' : 'students in', ca: alumnos.length === 1 ? 'alumne dins' : 'alumnes dins' })}</p>
          <div className="flex flex-wrap gap-2">
            {alumnos.map(a => <span key={a.id} className="rounded-xl bg-white/10 px-3 py-1.5 text-white font-bold text-lg">{a.apodo}</span>)}
          </div>
        </div>
      </div>
    )
  }

  // ── Podio ──
  if (dir.estado === 'fin') {
    return (
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-white/45 text-sm font-bold uppercase tracking-widest">{reto.nombre}</p>
        <h1 className="text-white font-black text-5xl mt-1 mb-8">🏆 {tr({ es: 'Podio', en: 'Podium', ca: 'Podi' })}</h1>
        <div className="flex items-end justify-center gap-3 mb-8">
          {[1, 0, 2].map(k => filas[k] && (
            <div key={k} className="w-40">
              <p className="text-5xl">{MEDALLA[pos[k] - 1] ?? ''}</p>
              <p className="text-white font-black text-2xl truncate">{filas[k].apodo}</p>
              <p className="text-amber-300 font-black tabular-nums">{filas[k].puntos.toLocaleString()}</p>
              <div className={`mt-2 rounded-t-xl bg-gradient-to-b from-amber-400/40 to-amber-400/5 ${k === 0 ? 'h-40' : k === 1 ? 'h-28' : 'h-20'}`} />
            </div>
          ))}
        </div>
        <Clasificacion filas={filas} pos={pos} desde={3} tr={tr} />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" className={botonGris} onClick={() => reiniciaDirecto(codigo)}>↺ {tr({ es: 'Volver a jugar', en: 'Play again', ca: 'Tornar a jugar' })}</button>
          <Link to={localPath(`/ranking/${codigo}`)} className={botonGris}>📋 {tr({ es: 'Resultados', en: 'Results', ca: 'Resultats' })}</Link>
        </div>
      </div>
    )
  }

  // ── Pregunta y solución ──
  const ultima = dir.i + 1 >= n
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between gap-3 mb-3">
        <p className="text-white/60 font-bold text-lg">{tr({ es: 'Pregunta', en: 'Question', ca: 'Pregunta' })} {dir.i + 1}/{n}</p>
        <p className="font-mono text-amber-300/80 font-black tracking-widest">{codigo}</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
        {/* La pregunta, grande y sin tocar: se contesta en los móviles */}
        <div className={`mx-auto w-full max-w-[640px] ${dir.estado === 'pregunta' ? 'pointer-events-none select-none' : ''}`} style={{ zoom: 1.25 }}>
          {ronda && <div key={`${dir.i}-${dir.estado}`}>{renderQuestion({ round: ronda, phase: dir.estado === 'solucion' ? 'result' : 'choose', onAnswer: () => {}, l, qIndex: dir.i })}</div>}
        </div>
        <div className="space-y-4">
          {dir.estado === 'pregunta'
            ? <CuentaAtras key={dir.i} T={T} inicio={dir.inicio} respondidas={respondidas.length} total={alumnos.length} onFin={solucion} tr={tr} />
            : (
              <div className="rounded-2xl bg-[#141b2e] border border-white/[0.08] p-4 text-center">
                <p className="text-green-300 font-black text-4xl tabular-nums">{acertadas}<span className="text-white/40 text-2xl">/{respondidas.length}</span></p>
                <p className="text-white/60 font-bold">{tr({ es: 'han acertado', en: 'got it right', ca: 'l’han encertada' })}</p>
              </div>
            )}
          {dir.estado === 'solucion' && (
            <>
              <div className="rounded-2xl bg-[#141b2e] border border-white/[0.08] p-4">
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2">Top 5</p>
                <Clasificacion filas={filas.slice(0, 5)} pos={pos} tr={tr} />
              </div>
              <button type="button" className={`${boton} w-full`} disabled={ocupado} onClick={() => (ultima ? terminaDirecto(codigo, dir) : lanza(dir.i + 1))}>
                {ultima ? `🏆 ${tr({ es: 'Ver el podio', en: 'See the podium', ca: 'Veure el podi' })}` : `${tr({ es: 'Siguiente pregunta', en: 'Next question', ca: 'Següent pregunta' })} →`}
              </button>
            </>
          )}
          {dir.estado === 'pregunta' && <button type="button" className={`${botonGris} w-full`} onClick={solucion}>{tr({ es: 'Mostrar la solución ya', en: 'Show the answer now', ca: 'Mostrar la solució ja' })}</button>}
        </div>
      </div>
    </div>
  )
}

// La cuenta atrás de la pregunta: al acabar el tiempo, o cuando ya han
// respondido todos, pasa sola a la solución.
function CuentaAtras({ T, inicio, respondidas, total, onFin, tr }) {
  // El inicio lo pone el servidor; mientras llega, el reloj de la pizarra
  const [t0] = useState(() => Date.now())
  const [ahora, setAhora] = useState(() => Date.now())
  const hecho = useRef(false)
  const desde = inicio?.toMillis ? Math.min(inicio.toMillis(), t0 + 1500) : t0
  const queda = Math.max(0, T - (ahora - desde))
  useEffect(() => {
    const t = setInterval(() => setAhora(Date.now()), 200)
    return () => clearInterval(t)
  }, [])
  useEffect(() => {
    if (hecho.current) return
    if (queda <= 0 || (total > 0 && respondidas >= total)) {
      hecho.current = true
      // Un respiro para que lleguen las últimas respuestas
      const t = setTimeout(onFin, queda <= 0 ? 1200 : 400)
      return () => clearTimeout(t)
    }
  }, [queda, respondidas, total, onFin])
  const segs = Math.ceil(queda / 1000)
  return (
    <div className="rounded-2xl bg-[#141b2e] border border-white/[0.08] p-4 text-center">
      <p className={`font-black text-7xl tabular-nums ${segs <= 5 ? 'text-red-300' : 'text-white'}`}>{segs}</p>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden mt-2">
        <div className={`h-full ${segs <= 5 ? 'bg-red-400' : 'bg-amber-400'}`} style={{ width: `${(queda / T) * 100}%` }} />
      </div>
      <p className="text-white/70 font-bold text-xl mt-3 tabular-nums">{respondidas}/{total} {tr({ es: 'han respondido', en: 'have answered', ca: 'han respost' })}</p>
    </div>
  )
}

function Clasificacion({ filas, pos, desde = 0, tr }) {
  if (!filas.length) return <p className="text-white/40 text-sm">{tr({ es: 'Aún sin puntos', en: 'No points yet', ca: 'Encara sense punts' })}</p>
  return (
    <ol className="space-y-1 text-left max-w-md mx-auto">
      {filas.slice(desde).map((f, i) => (
        <li key={f.pid} className="flex items-center gap-3 rounded-lg bg-white/[0.04] px-3 py-1.5 text-lg">
          <span className="w-8 text-white/45 tabular-nums">{pos[i + desde] <= 3 ? MEDALLA[pos[i + desde] - 1] : `${pos[i + desde]}.`}</span>
          <span className="flex-1 text-white font-bold truncate">{f.apodo}</span>
          <span className="text-amber-300 font-black tabular-nums">{f.puntos.toLocaleString()}</span>
        </li>
      ))}
    </ol>
  )
}
