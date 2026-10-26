// Un examen con mecánica abierto como RETO de clase (?reto=CODIGO): lo monta
// MechanicExam en vez de su examen normal, con el mismo generador, la misma
// corrección y la misma pantalla de pregunta de cada juego. Así cualquier
// examen con mecánica se puede mandar de deberes o jugar en directo sin
// tocarlo. Tres caras:
//   el profe, en directo       → la pizarra (Pizarra.jsx)
//   el alumno, en directo      → su móvil (Movil.jsx)
//   el alumno, de deberes      → el examen con la nota del profe; su mejor nota sube al reto
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../../context/LangContext'
import { useAuth } from '../../context/AuthContext'
import { FormUnirse } from '../RankingClaseFin'
import Pizarra from './Pizarra'
import Movil from './Movil'
import { escuchaReto, miembroDe, enviarNota, nivelDelReto } from '../../lib/rankingClase'
import { codigoValido, normalizaCodigo } from '../../lib/apodo'

const caja = 'rounded-2xl bg-[#141b2e] border border-white/[0.08] p-5'

export function NotaProfe({ nota }) {
  const { tr } = useLang()
  if (!nota) return null
  return (
    <div className="rounded-xl border border-amber-400/30 bg-amber-400/[0.07] px-3 py-2.5 text-left">
      <p className="text-amber-200/80 text-[11px] font-bold uppercase tracking-widest mb-0.5">{tr({ es: 'Nota de tu profe', en: 'Note from your teacher', ca: 'Nota del teu profe' })}</p>
      <p className="text-white text-sm whitespace-pre-line">{nota}</p>
    </div>
  )
}

export default function ExamenReto({ codigo: crudo, gameId, title, levels, genRound, isCorrect, renderQuestion, pageMeta }) {
  const { tr, l, localPath } = useLangL()
  const { user } = useAuth()
  const codigo = normalizaCodigo(crudo)
  const [reto, setReto] = useState(undefined)
  const [yo, setYo] = useState(() => miembroDe(codigo))

  useEffect(() => {
    if (!codigoValido(codigo)) return
    return escuchaReto(codigo, setReto, () => setReto(null))
  }, [codigo])
  useEffect(() => {
    const cambia = () => setYo(miembroDe(codigo))
    window.addEventListener('tuthor:ranking-clase', cambia)
    return () => window.removeEventListener('tuthor:ranking-clase', cambia)
  }, [codigo])

  const marco = hijo => <div className="relative z-10 max-w-xl mx-auto px-4 py-6">{pageMeta}{hijo}</div>
  if (reto === undefined && codigoValido(codigo)) return marco(<p className="text-white/30 text-sm text-center py-20">…</p>)
  if (!reto) {
    return marco(
      <div className={`${caja} text-center`}>
        <p className="text-4xl mb-2">🔍</p>
        <p className="text-white font-black">{tr({ es: 'No hay ningún reto con ese código', en: 'There’s no challenge with that code', ca: 'No hi ha cap repte amb aquest codi' })}</p>
        <Link to={localPath('/reto')} className="text-amber-200 text-sm font-bold">{tr({ es: '← Probar con otro código', en: '← Try another code', ca: '← Provar amb un altre codi' })}</Link>
      </div>,
    )
  }

  const dueno = !!user && user.uid === reto.teacherId
  const { lv, difficulty } = nivelDelReto(levels, reto.nivel)
  const comun = { codigo, reto, gameId, title, lv, difficulty, genRound, isCorrect, renderQuestion, l }

  if (reto.examen !== gameId) {
    return marco(<div className={`${caja} text-center text-white/70`}>{tr({ es: 'Este reto es de otro examen.', en: 'This challenge is for a different exam.', ca: 'Aquest repte és d’un altre examen.' })} <Link to={localPath(`/reto/${codigo}`)} className="text-amber-200 font-bold">{tr({ es: 'Ir al reto →', en: 'Go to the challenge →', ca: 'Anar al repte →' })}</Link></div>)
  }
  if (dueno && reto.modo === 'directo') return <>{pageMeta}<Pizarra {...comun} /></>

  if (!yo) {
    return marco(
      <div className={`${caja} space-y-3`}>
        <p className="text-white/45 text-[11px] font-bold uppercase tracking-widest">{reto.modo === 'directo' ? '📺 ' + tr({ es: 'Partida en directo', en: 'Live game', ca: 'Partida en directe' }) : '🏠 ' + tr({ es: 'Deberes', en: 'Homework', ca: 'Deures' })}</p>
        <h1 className="text-white font-black text-2xl leading-tight">{reto.nombre}</h1>
        <NotaProfe nota={reto.nota} />
        {reto.cerrado
          ? <p className="text-red-300 text-sm font-bold">{tr({ es: 'Tu profe ha cerrado este reto.', en: 'Your teacher has closed this challenge.', ca: 'El teu profe ha tancat aquest repte.' })}</p>
          : <FormUnirse codigoInicial={codigo} conNota={!!reto.nota} onUnido={() => setYo(miembroDe(codigo))} />}
      </div>,
    )
  }

  if (reto.modo === 'directo') return <>{pageMeta}<Movil {...comun} yo={yo} /></>
  return marco(<Deberes {...comun} yo={yo} dueno={dueno} />)
}

// tr y l a la vez (todas las caras usan los dos)
function useLangL() {
  const ctx = useLang()
  const l = ctx.lang === 'en' ? 'en' : ctx.lang === 'ca' ? 'ca' : 'es'
  return { ...ctx, l }
}

// ── Deberes: el examen, con la nota del profe, y la nota sube al reto ──────
function Deberes({ codigo, reto, gameId, title, lv, difficulty, genRound, isCorrect, renderQuestion, l, yo, dueno }) {
  const { tr, localPath } = useLang()
  const n = reto.nPreguntas ?? 10
  const [rondas, setRondas] = useState(null)
  const [i, setI] = useState(0)
  const [fase, setFase] = useState('choose')
  const [aciertos, setAciertos] = useState(0)
  const [fin, setFin] = useState(null) // respuesta del servidor al acabar

  const empieza = () => { setRondas(Array.from({ length: n }, () => genRound(difficulty))); setI(0); setFase('choose'); setAciertos(0); setFin(null) }
  const responde = a => {
    if (fase !== 'choose') return
    if (isCorrect(rondas[i], a)) setAciertos(x => x + 1)
    setFase('result')
  }
  const siguiente = async () => {
    if (i + 1 < n) { setI(i + 1); setFase('choose'); return }
    const nota = Math.round((aciertos / n) * 100)
    setRondas(null)
    setFin({ nota, ...(await enviarNota(codigo, gameId, nota)) })
  }

  if (fin) {
    const sobre10 = (fin.nota / 10).toLocaleString(undefined, { maximumFractionDigits: 1 })
    return (
      <div className={`${caja} text-center space-y-3`}>
        <p className="text-white/45 text-sm">{reto.nombre}</p>
        <p className="text-6xl font-black text-white tabular-nums">{sobre10}<span className="text-2xl text-white/40">/10</span></p>
        {fin.error
          ? <p className="text-red-300 text-sm font-bold">{tr({ es: 'No se ha podido enviar la nota. Comprueba la conexión y repítelo.', en: 'Your mark couldn’t be sent. Check your connection and try again.', ca: 'No s’ha pogut enviar la nota. Comprova la connexió i repeteix-ho.' })}</p>
          : <p className="text-green-300 text-sm font-bold">✓ {tr({ es: `Enviada a tu profe como «${yo.apodo}».`, en: `Sent to your teacher as “${yo.apodo}”.`, ca: `Enviada al teu profe com a «${yo.apodo}».` })}{fin.mejor > fin.nota ? ' ' + tr({ es: `Cuenta tu mejor nota (${fin.mejor / 10}).`, en: `Your best mark counts (${fin.mejor / 10}).`, ca: `Compta la teva millor nota (${fin.mejor / 10}).` }) : ''}</p>}
        <button type="button" onClick={empieza} className="w-full py-3 rounded-xl bg-white/10 text-white font-bold">{tr({ es: 'Repetir (cuenta la mejor)', en: 'Try again (best one counts)', ca: 'Repetir (compta la millor)' })}</button>
      </div>
    )
  }

  if (!rondas) {
    return (
      <div className={`${caja} space-y-4`}>
        <div>
          <p className="text-white/45 text-[11px] font-bold uppercase tracking-widest">🏠 {tr({ es: 'Deberes', en: 'Homework', ca: 'Deures' })} · {tr({ es: 'como', en: 'as', ca: 'com' })} <span className="text-amber-200">{yo.apodo}</span></p>
          <h1 className="text-white font-black text-2xl leading-tight">{reto.nombre}</h1>
          <p className="text-white/55 text-sm mt-1">{title?.[l] ?? title?.es} · {n} {tr({ es: 'preguntas', en: 'questions', ca: 'preguntes' })} · {lv?.emoji} {lv?.label?.[l] ?? lv?.label?.es ?? ''}</p>
        </div>
        <NotaProfe nota={reto.nota} />
        {reto.cerrado
          ? <p className="text-red-300 text-sm font-bold">{tr({ es: 'Tu profe ha cerrado este reto.', en: 'Your teacher has closed this challenge.', ca: 'El teu profe ha tancat aquest repte.' })}</p>
          : <button type="button" onClick={empieza} className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-lg">{tr({ es: 'Empezar →', en: 'Start →', ca: 'Començar →' })}</button>}
        {dueno && <Link to={localPath(`/profesor/reto/${codigo}`)} className="block text-center text-teal-300 text-sm font-bold">{tr({ es: 'Eres el profe: ver las notas →', en: 'You’re the teacher: see the marks →', ca: 'Ets el profe: veure les notes →' })}</Link>}
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2 px-1">
        <p className="text-white/40 text-xs uppercase tracking-widest truncate">{reto.nombre}</p>
        <p className="text-white font-bold text-sm tabular-nums">{i + 1}/{n} · {aciertos}</p>
      </div>
      {renderQuestion({ round: rondas[i], phase: fase, onAnswer: responde, l, qIndex: i })}
      {fase === 'result' && (
        <button type="button" onClick={siguiente} className="w-full mt-3 py-3 rounded-xl bg-[#EDAE49] text-black font-black">
          {i + 1 < n ? tr({ es: 'Siguiente →', en: 'Next →', ca: 'Següent →' }) : tr({ es: 'Ver mi nota →', en: 'See my mark →', ca: 'Veure la meva nota →' })}
        </button>
      )}
    </div>
  )
}
