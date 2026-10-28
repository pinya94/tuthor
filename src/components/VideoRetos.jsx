// «Vídeo» de los retos de clase: una animación de ~45 s hecha con la propia
// interfaz (no un fichero), con su musiquita (lib/musicaVideo.js). Así sale
// nítida a cualquier tamaño, pesa casi nada y se ve en castellano, inglés y
// catalán sin grabar tres vídeos. Escenas: crear el reto → proyectar el
// código → entrar desde el móvil → pregunta → solución y ranking → podio →
// también de deberes.
import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/LangContext'
import { creaMusica } from '../lib/musicaVideo'

const D = 45 // segundos
// [inicio, fin] de cada escena
const ESC = { titulo: [0, 4], crear: [4, 10.5], sala: [10.5, 16.5], movil: [16.5, 22], pregunta: [22, 31], solucion: [31, 36], podio: [36, 40], deberes: [40, D] }
const ROTULO = {
  titulo: { es: 'Nuevo en Tuthor: retos de clase', en: 'New in Tuthor: class challenges', ca: 'Nou a Tuthor: reptes de classe' },
  crear: { es: '1 · Desde tu aula, crea un reto: juego, nivel y tiempo', en: '1 · From your class, create a challenge: game, level and time', ca: '1 · Des de la teva aula, crea un repte: joc, nivell i temps' },
  sala: { es: '2 · Proyéctalo: tus alumnos entran con el código, sin cuenta', en: '2 · Project it: your students join with the code, no account', ca: '2 · Projecta’l: els alumnes entren amb el codi, sense compte' },
  movil: { es: '3 · Cada uno, desde su móvil: código, nombre… y dentro', en: '3 · Everyone on their phone: code, name… and they’re in', ca: '3 · Cadascú, des del mòbil: codi, nom… i a dins' },
  pregunta: { es: '4 · La pregunta, en la pizarra; responden en el móvil', en: '4 · The question on the board; they answer on their phones', ca: '4 · La pregunta, a la pissarra; responen al mòbil' },
  solucion: { es: '5 · Solución y ranking al momento: más rápido, más puntos', en: '5 · Answer and ranking straight away: faster means more points', ca: '5 · Solució i rànquing al moment: més ràpid, més punts' },
  podio: { es: '6 · Y al final… ¡el podio!', en: '6 · And at the end… the podium!', ca: '6 · I al final… el podi!' },
  deberes: { es: '¿Para casa? Mándalo de deberes y mira la nota de cada uno', en: 'For home? Set it as homework and see everyone’s mark', ca: 'Per a casa? Envia-ho de deures i mira la nota de cadascú' },
}
const NOMBRES = ['Luna', 'Rayo', 'Mar', 'Leo', 'Nora', 'Hugo', 'Vega', 'Pol', 'Alba', 'Iker', 'Sara', 'Dani', 'Noa', 'Teo', 'Lía', 'Gael', 'Abril', 'Marc', 'Ona', 'Bruno', 'Ainhoa', 'Unai', 'Carla', 'Max']
const CODIGO = 'K7Q3PM'

const p = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a))) // avance 0..1 entre a y b
const escena = t => Object.keys(ESC).find(k => t >= ESC[k][0] && t < ESC[k][1]) ?? 'deberes'

export default function VideoRetos() {
  const { tr } = useLang()
  const [t, setT] = useState(0)
  const [estado, setEstado] = useState('inicio') // inicio | play | pausa | fin
  const [mudo, setMudo] = useState(false)
  const reloj = useRef({ base: 0, desde: 0 })
  const musica = useRef(null)

  useEffect(() => {
    if (estado !== 'play') return
    let raf
    const tick = () => {
      const x = reloj.current.desde + (performance.now() - reloj.current.base) / 1000
      if (x >= D) { setT(D); setEstado('fin'); return }
      setT(x)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [estado])
  useEffect(() => () => musica.current?.cierra(), [])

  const play = () => {
    if (estado === 'pausa') {
      reloj.current = { base: performance.now(), desde: t }
      musica.current?.sigue()
    } else {
      musica.current?.cierra()
      musica.current = creaMusica(D)
      if (mudo) musica.current?.silencio(true)
      reloj.current = { base: performance.now(), desde: 0 }
      setT(0)
    }
    setEstado('play')
  }
  const pausa = () => { setEstado('pausa'); musica.current?.pausa() }
  const alternaMudo = () => { setMudo(m => { musica.current?.silencio(!m); return !m }) }

  const e = escena(t)
  return (
    <div className="w-full">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0b1226] to-[#1a1033] shadow-2xl shadow-black/40 select-none">
        {estado === 'inicio' ? <Portada tr={tr} onPlay={play} /> : (
          <>
            <div key={e} className="absolute inset-0 animate-[fadeIn_.5s_ease]">
              {e === 'titulo' && <Titulo t={t} tr={tr} />}
              {e === 'crear' && <Crear t={t} tr={tr} />}
              {e === 'sala' && <Sala t={t} tr={tr} />}
              {e === 'movil' && <EntraMovil t={t} tr={tr} />}
              {e === 'pregunta' && <Pregunta t={t} tr={tr} />}
              {e === 'solucion' && <Solucion t={t} tr={tr} />}
              {e === 'podio' && <Podio t={t} tr={tr} />}
              {e === 'deberes' && <Deberes t={t} tr={tr} />}
            </div>
            {/* Controles */}
            <div className="absolute left-0 right-0 bottom-0 flex items-center gap-2 px-3 py-1.5 bg-gradient-to-t from-black/70 to-transparent">
              <button type="button" onClick={estado === 'play' ? pausa : play} className="text-white text-sm w-7" aria-label={estado === 'play' ? 'Pausa' : 'Play'}>{estado === 'play' ? '❚❚' : estado === 'fin' ? '↺' : '▶'}</button>
              <div className="flex-1 h-1 rounded-full bg-white/20 overflow-hidden"><div className="h-full bg-amber-400" style={{ width: `${(t / D) * 100}%` }} /></div>
              <button type="button" onClick={alternaMudo} className="text-white/80 text-sm w-7" aria-label={mudo ? 'Activar sonido' : 'Silenciar'}>{mudo ? '🔇' : '🔊'}</button>
            </div>
          </>
        )}
      </div>
      {/* El rótulo, debajo: en un móvil, encima del dibujo lo tapaba */}
      {estado !== 'inicio' && <p key={e} className="mt-2 text-center text-white font-bold text-[15px] sm:text-lg leading-snug animate-[fadeIn_.4s_ease] min-h-[2.8em]">{tr(ROTULO[e])}</p>}
    </div>
  )
}

// ── Piezas ───────────────────────────────────────────────────────────────────
const txt = 'text-[clamp(9px,1.6vw,15px)]'

function Portada({ tr, onPlay }) {
  return (
    <button type="button" onClick={onPlay} className="absolute inset-0 flex flex-col items-center justify-center gap-[3%] group">
      <span className="text-[clamp(28px,7vw,72px)]">🏆</span>
      <span className="text-white font-black text-[clamp(16px,4vw,40px)] leading-tight text-center px-6">{tr({ es: 'Retos de clase', en: 'Class challenges', ca: 'Reptes de classe' })}</span>
      <span className="text-white/60 text-[clamp(10px,1.8vw,18px)] text-center px-6">{tr({ es: 'Como un concurso, con los juegos de Tuthor. En 45 segundos.', en: 'Like a quiz show, with Tuthor’s games. In 45 seconds.', ca: 'Com un concurs, amb els jocs de Tuthor. En 45 segons.' })}</span>
      <span className="mt-[2%] w-[clamp(48px,10vw,88px)] aspect-square rounded-full bg-amber-400 text-black grid place-items-center text-[clamp(18px,3.5vw,34px)] font-black shadow-lg group-hover:scale-110 transition-transform">▶</span>
    </button>
  )
}

function Titulo({ t }) {
  const { lang } = useLang()
  const a = p(t, 0.2, 1.4)
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ opacity: a, transform: `scale(${0.9 + 0.1 * a})` }}>
      <span className="rounded-full bg-amber-400 text-black font-black px-4 py-1 text-[clamp(10px,1.8vw,16px)] mb-[2%]">NUEVO · NEW</span>
      <span className="text-[clamp(30px,8vw,80px)]">📺 🏆 📱</span>
      <span className="text-white/70 text-[clamp(11px,2.2vw,22px)] mt-[2%]">{`tuthor.es${lang === 'es' ? '' : `/${lang}`}/reto`}</span>
    </div>
  )
}

// Un portátil con el formulario del reto que se va rellenando, con su cursor
function Crear({ t, tr }) {
  const [a] = ESC.crear
  const paso = k => t > a + 1 + k * 1.2
  const cursor = [[22, 30], [55, 46], [36, 62], [70, 62], [50, 80]][Math.min(4, Math.floor(Math.max(0, t - a - 0.5) / 1.2))]
  return (
    <div className="absolute inset-[6%_10%_9%] rounded-xl border-[3px] border-slate-500 bg-[#141b2e] p-[2.5%] flex flex-col gap-[3%]">
      <p className={`text-white/50 font-bold ${txt}`}>🏫 3º ESO B · <span className="text-teal-300">🏆 {tr({ es: 'Retos', en: 'Challenges', ca: 'Reptes' })}</span></p>
      <div className="grid grid-cols-3 gap-[2%]">
        {['📺', '🏠', '🏆'].map((m, i) => (
          <div key={m} className={`rounded-lg border-2 p-[4%] text-white font-black ${txt} ${i === 0 && paso(0) ? 'border-teal-400 bg-teal-500/20' : 'border-white/10'}`}>
            {m} {[tr({ es: 'En directo', en: 'Live', ca: 'En directe' }), tr({ es: 'Deberes', en: 'Homework', ca: 'Deures' }), tr({ es: 'Ranking', en: 'Ranking', ca: 'Rànquing' })][i]}
          </div>
        ))}
      </div>
      <div className={`rounded-lg border border-white/10 bg-white/5 px-[2%] py-[1.5%] text-white ${txt}`}>{paso(1) ? '🔣 Nombra el compuesto' : <span className="text-white/30">— {tr({ es: 'Elige un juego', en: 'Choose a game', ca: 'Tria un joc' })} —</span>}</div>
      <div className="flex gap-[3%]">
        <span className={`rounded-lg px-[2%] py-[1%] font-bold ${txt} ${paso(2) ? 'bg-teal-500/30 text-white' : 'bg-white/5 text-white/40'}`}>💛 {tr({ es: 'Medio', en: 'Medium', ca: 'Mitjà' })}</span>
        <span className={`rounded-lg px-[2%] py-[1%] font-bold ${txt} ${paso(3) ? 'bg-teal-500/30 text-white' : 'bg-white/5 text-white/40'}`}>⏱️ 20 s</span>
      </div>
      <div className={`mt-auto rounded-lg py-[2%] text-center font-black text-white ${txt} ${paso(4) ? 'bg-teal-400 scale-[0.97]' : 'bg-teal-600'} transition-all`}>📺 {tr({ es: 'Crear y abrir la pizarra', en: 'Create and open the board', ca: 'Crear i obrir la pissarra' })}</div>
      <span className="absolute text-[clamp(14px,2.6vw,26px)] transition-all duration-700 ease-out" style={{ left: `${cursor[0]}%`, top: `${cursor[1]}%` }}>👆</span>
    </div>
  )
}

function Qr() {
  // Un QR de mentira (decorativo): cuadros fijos
  const celdas = Array.from({ length: 81 }, (_, i) => ((i * 7 + (i >> 2) * 3) % 5 < 2))
  return (
    <div className="relative aspect-square w-full rounded-lg bg-white p-[8%]">
      <div className="grid grid-cols-9 gap-[2%] w-full h-full">
        {celdas.map((on, i) => <span key={i} className={on ? 'bg-black' : ''} />)}
      </div>
      {[['8%', '8%'], ['8%', 'auto'], ['auto', '8%']].map(([top, left], i) => (
        <span key={i} className="absolute w-[28%] aspect-square bg-white border-[5px] border-black p-[4%]" style={{ top: top === 'auto' ? undefined : top, bottom: top === 'auto' ? '8%' : undefined, left: left === 'auto' ? undefined : left, right: left === 'auto' ? '8%' : undefined }}>
          <span className="block w-full h-full bg-black" />
        </span>
      ))}
    </div>
  )
}

function Sala({ t, tr }) {
  const { lang } = useLang()
  const [a] = ESC.sala
  const n = Math.min(24, Math.floor(Math.max(0, t - a - 0.8) * 4.6))
  return (
    <div className="absolute inset-[5%_6%_9%] flex gap-[4%]">
      <div className="flex-1 min-w-0">
        <p className={`text-white/60 ${txt}`}>{tr({ es: 'Entra en', en: 'Go to', ca: 'Entra a' })} <b className="text-white">{`tuthor.es${lang === 'es' ? '' : `/${lang}`}/reto`}</b></p>
        <p className="font-mono font-black text-amber-300 tracking-[0.15em] text-[clamp(26px,7vw,72px)] leading-none my-[3%]">{CODIGO}</p>
        <p className={`text-white/60 font-bold mb-[2%] ${txt}`}>{n} {tr({ es: 'alumnos dentro', en: 'students in', ca: 'alumnes dins' })}</p>
        <div className="flex flex-wrap gap-[1.2%]">
          {NOMBRES.slice(0, n).map(x => <span key={x} className={`rounded-md bg-white/10 px-[2%] py-[0.6%] text-white font-bold animate-[fadeIn_.3s_ease] ${txt}`}>{x}</span>)}
        </div>
      </div>
      <div className="w-[26%] shrink-0"><Qr /></div>
    </div>
  )
}

function Movil({ children, className = '' }) {
  return (
    <div className={`aspect-[9/17] rounded-[1.4rem] border-[3px] border-slate-400 bg-[#0b1226] p-[4%] flex flex-col ${className}`}>
      <div className="mx-auto w-[30%] h-[2%] rounded-full bg-slate-600 mb-[6%]" />
      {children}
    </div>
  )
}

function EntraMovil({ t, tr }) {
  const [a] = ESC.movil
  const cod = CODIGO.slice(0, Math.floor(p(t, a + 0.5, a + 2) * 6))
  const nombre = 'Luna'.slice(0, Math.floor(p(t, a + 2.5, a + 3.3) * 4))
  const dentro = t > a + 3.9
  return (
    <div className="absolute inset-[4%_0_9%] flex justify-center">
      <Movil className="h-full">
        {dentro ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-[4%] animate-[fadeIn_.4s_ease]">
            <span className="text-[clamp(20px,4.5vw,44px)]">👀</span>
            <span className={`text-white font-black ${txt}`}>{tr({ es: '¡Ya estás dentro!', en: 'You’re in!', ca: 'Ja hi ets!' })}</span>
            <span className="text-white/50 text-[clamp(8px,1.2vw,12px)]">{tr({ es: 'Mira la pizarra', en: 'Watch the board', ca: 'Mira la pissarra' })}</span>
          </div>
        ) : (
          <div className="flex flex-col gap-[5%]">
            <span className="text-center text-[clamp(16px,3.2vw,32px)]">🏆</span>
            <div className="rounded-md border border-amber-400/60 bg-white/5 py-[6%] text-center font-mono font-black text-white tracking-widest text-[clamp(10px,1.8vw,18px)]">{cod || <span className="text-white/20">······</span>}</div>
            <div className={`rounded-md border border-white/15 bg-white/5 py-[6%] px-[6%] text-white ${txt}`}>{nombre || <span className="text-white/30">{tr({ es: 'Tu nombre', en: 'Your name', ca: 'El teu nom' })}</span>}</div>
            <div className={`rounded-md py-[6%] text-center font-black text-black ${txt} ${t > a + 3.5 ? 'bg-amber-300' : 'bg-amber-400'}`}>{tr({ es: 'Entrar', en: 'Join', ca: 'Entrar' })}</div>
          </div>
        )}
      </Movil>
    </div>
  )
}

function Pregunta({ t, tr }) {
  const [a] = ESC.pregunta
  const segs = Math.max(0, 20 - Math.floor((t - a) * 1.4))
  const resp = Math.min(23, Math.floor(p(t, a + 1.5, a + 8) * 23))
  const x = t > a + 2.5 ? 2 : 0, y = t > a + 4 ? 3 : 0
  const enviada = t > a + 5.5
  return (
    <div className="absolute inset-[4%_5%_9%] flex gap-[4%] items-stretch">
      <div className="flex-1 rounded-xl border-[3px] border-slate-500 bg-[#141b2e] p-[3%] flex flex-col">
        <p className={`text-white/50 font-bold ${txt}`}>{tr({ es: 'Pregunta', en: 'Question', ca: 'Pregunta' })} 3/10</p>
        <p className="text-white font-black text-[clamp(14px,3.4vw,34px)] my-auto text-center">{tr({ es: 'Sulfato de hierro(III)', en: 'Iron(III) sulfate', ca: 'Sulfat de ferro(III)' })}</p>
        <div className="flex items-end justify-between">
          <span className={`font-black tabular-nums text-[clamp(20px,5vw,52px)] ${segs <= 5 ? 'text-red-300' : 'text-white'}`}>{segs}</span>
          <span className={`text-white/70 font-bold ${txt}`}>{resp}/24 {tr({ es: 'han respondido', en: 'answered', ca: 'han respost' })}</span>
        </div>
      </div>
      <Movil className="h-full shrink-0">
        {enviada ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-[4%] animate-[fadeIn_.4s_ease]">
            <span className="text-[clamp(18px,4vw,40px)]">📨</span>
            <span className="text-white font-black text-[clamp(8px,1.3vw,13px)]">{tr({ es: 'Respuesta enviada', en: 'Answer sent', ca: 'Resposta enviada' })}</span>
          </div>
        ) : (
          <div className="flex flex-col gap-[6%] items-center">
            <span className="text-amber-300 font-black text-[clamp(11px,2.2vw,22px)] font-mono">Fe{x ? <sub>{x}</sub> : '?'}(SO<sub>4</sub>){y ? <sub>{y}</sub> : '?'}</span>
            {[['Fe', x], ['(SO₄)', y]].map(([el, v]) => (
              <div key={el} className="flex items-center gap-[8%] text-white text-[clamp(8px,1.3vw,13px)]">
                <span className="w-[2.5em] text-white/60 font-mono">{el}</span><span className="rounded bg-white/10 px-[0.5em]">−</span><b className="text-amber-300 w-[1em] text-center">{v || '?'}</b><span className="rounded bg-white/10 px-[0.5em]">+</span>
              </div>
            ))}
            <span className={`w-full rounded-md py-[5%] text-center font-black text-black text-[clamp(8px,1.3vw,13px)] ${x && y ? 'bg-amber-400' : 'bg-amber-400/30'}`}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</span>
          </div>
        )}
      </Movil>
    </div>
  )
}

const TOP = [['Rayo', 2840], ['Luna', 2715], ['Nora', 2590], ['Hugo', 2410], ['Mar', 2280]]
function Solucion({ t, tr }) {
  const [a] = ESC.solucion
  return (
    <div className="absolute inset-[4%_5%_9%] flex gap-[4%] items-stretch">
      <div className="flex-1 rounded-xl border-[3px] border-slate-500 bg-[#141b2e] p-[3%] flex gap-[4%]">
        <div className="flex-1 flex flex-col items-center justify-center">
          <span className="text-green-300 font-black font-mono text-[clamp(16px,4vw,40px)]">Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> ✓</span>
          <span className="text-green-300 font-black text-[clamp(14px,3vw,30px)] mt-[4%]">19<span className="text-white/40">/24</span></span>
          <span className={`text-white/60 ${txt}`}>{tr({ es: 'han acertado', en: 'got it right', ca: 'l’han encertada' })}</span>
        </div>
        <ol className="w-[42%] flex flex-col justify-center gap-[3%]">
          {TOP.map(([n, pts], i) => (
            <li key={n} className={`flex justify-between rounded-md bg-white/[0.06] px-[5%] py-[2%] text-white font-bold ${txt}`} style={{ opacity: p(t, a + 0.3 + i * 0.25, a + 0.6 + i * 0.25) }}>
              <span>{['🥇', '🥈', '🥉', '4.', '5.'][i]} {n}</span><span className="text-amber-300 tabular-nums">{pts.toLocaleString()}</span>
            </li>
          ))}
        </ol>
      </div>
      <Movil className="h-full shrink-0">
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-[4%]">
          <span className="text-[clamp(18px,4vw,40px)]">✅</span>
          <span className="text-green-300 font-black text-[clamp(12px,2.4vw,24px)]">+840</span>
          <span className="text-white/60 text-[clamp(8px,1.2vw,12px)]">{tr({ es: 'Vas 2.º de 24', en: 'You’re 2nd of 24', ca: 'Vas 2n de 24' })}</span>
        </div>
      </Movil>
    </div>
  )
}

function Podio({ t }) {
  const [a] = ESC.podio
  const alto = { 0: '62%', 1: '44%', 2: '30%' }
  return (
    <div className="absolute inset-[6%_10%_9%] flex items-end justify-center gap-[4%]">
      {[1, 0, 2].map(k => {
        const s = p(t, a + 0.3 + (2 - k) * 0.4, a + 0.9 + (2 - k) * 0.4)
        return (
          <div key={k} className="w-[24%] flex flex-col items-center justify-end h-full" style={{ opacity: s }}>
            <span className="text-[clamp(18px,4vw,44px)]">{['🥇', '🥈', '🥉'][k]}</span>
            <span className="text-white font-black text-[clamp(11px,2.2vw,22px)]">{TOP[k][0]}</span>
            <span className="text-amber-300 font-black tabular-nums text-[clamp(9px,1.6vw,16px)]">{(TOP[k][1] + 2400 - k * 300).toLocaleString()}</span>
            <div className="w-full rounded-t-lg bg-gradient-to-b from-amber-400/50 to-amber-400/10 mt-[6%] transition-all" style={{ height: `calc(${alto[k]} * ${s})` }} />
          </div>
        )
      })}
    </div>
  )
}

function Deberes({ tr }) {
  const filas = [['Lucía Pérez', 9.2, 2], ['Marc Soler', 8, 1], ['Ana Ruiz', 7.5, 3], ['Hugo Gil', 4.8, 1]]
  return (
    <div className="absolute inset-[5%_8%_9%] flex gap-[4%] items-center">
      <div className="flex-1 rounded-xl border-[3px] border-slate-500 bg-[#141b2e] p-[3%]">
        <p className={`text-white font-black mb-[3%] ${txt}`}>🏠 {tr({ es: 'Deberes · Nombra el compuesto', en: 'Homework · Name the Compound', ca: 'Deures · Anomena el compost' })}</p>
        <div className={`rounded-md border border-amber-400/30 bg-amber-400/10 px-[3%] py-[2%] text-amber-100 mb-[3%] text-[clamp(8px,1.3vw,13px)]`}>📝 {tr({ es: 'Poned vuestro nombre y apellido, que lo corrijo. Hasta el viernes.', en: 'Use your first name and surname, I’ll mark it. Due Friday.', ca: 'Poseu el vostre nom i cognom, que ho corregiré. Fins divendres.' })}</div>
        {filas.map(([n, nota, int]) => (
          <div key={n} className={`flex justify-between border-t border-white/10 py-[1.5%] text-white ${txt}`}>
            <span className="font-bold">{n}</span>
            <span><b className={nota >= 5 ? 'text-green-300' : 'text-red-300'}>{nota.toLocaleString()}</b> <span className="text-white/40">· {int} {tr({ es: 'intento(s)', en: 'attempt(s)', ca: 'intent(s)' })}</span></span>
          </div>
        ))}
      </div>
      <div className="w-[32%] text-center space-y-[6%]">
        <p className="text-white font-black text-[clamp(12px,2.6vw,26px)] leading-tight">{tr({ es: '80 juegos', en: '80 games', ca: '80 jocs' })}</p>
        <p className="text-white/70 font-bold text-[clamp(10px,1.8vw,18px)]">{tr({ es: 'Sin cuentas para los alumnos', en: 'No accounts for students', ca: 'Sense comptes per als alumnes' })}</p>
        <p className="text-amber-300 font-black text-[clamp(12px,2.4vw,24px)]">{tr({ es: 'Gratis', en: 'Free', ca: 'Gratis' })}</p>
      </div>
    </div>
  )
}
