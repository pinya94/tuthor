// «Dilo en Inglés»: conversaciones con guion para practicar a HABLAR inglés.
// El personaje habla (síntesis de voz del navegador) y tú contestas con el
// micro (reconocimiento de voz del navegador) o escribiendo. Sin IA: cada
// respuesta se compara con los patrones del turno (lib/diloIngles.js).
//
// Honestidad: no corrige la pronunciación, comprueba si se te entiende.
// Privacidad: en Chrome la voz la pasa a texto Google; aquí no se guarda nada
// (ni audio ni texto) y el micro solo se abre al pulsar el botón.
import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { trackEvent } from '../lib/analytics'
import { corrigeVarias, PUNTOS } from '../lib/diloIngles'
import { SITUACIONES } from '../data/diloIngles'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, ComoSeJuega } from '../components/IntroJuego'

const ahora = () => Date.now()
const Reconocedor = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null

function vozInglesa() {
  const voces = window.speechSynthesis?.getVoices?.() ?? []
  return voces.find(v => v.lang === 'en-GB') || voces.find(v => v.lang?.startsWith('en-GB')) || voces.find(v => v.lang?.startsWith('en'))
}
function hablar(texto, lento = false) {
  try {
    const s = window.speechSynthesis
    if (!s) return
    s.cancel()
    const u = new SpeechSynthesisUtterance(texto)
    u.lang = 'en-GB'
    const v = vozInglesa()
    if (v) u.voice = v
    u.rate = lento ? 0.7 : 0.95
    s.speak(u)
  } catch { /* sin voz: queda el texto */ }
}

const COLOR = {
  verde: 'border-emerald-400/60 bg-emerald-950/60 text-emerald-100',
  amarillo: 'border-amber-400/60 bg-amber-950/60 text-amber-100',
  rojo: 'border-red-400/60 bg-red-950/60 text-red-100',
}
const TITULO = { verde: '💚 ¡Perfecto!', amarillo: '💛 Se entiende…', rojo: '🔴 Así no' }
const TITULO_NO_RECONOCIDA = '🤔 No te he entendido'

export default function DiloEnIngles() {
  const { user } = useAuth()
  const { localPath } = useLang()
  const [screen, setScreen] = useState('intro')
  const [sit, setSit] = useState(null)
  const [i, setI] = useState(0)
  const [intentos, setIntentos] = useState(0)
  const [resultado, setResultado] = useState(null) // { nivel, nota, texto, final }
  const [cuenta, setCuenta] = useState({ verde: 0, amarillo: 0, rojo: 0, puntos: 0 })
  const [notas, setNotas] = useState([])           // lo que se puede mejorar, para el final
  const [escuchando, setEscuchando] = useState(false)
  const [parcial, setParcial] = useState('')
  const [escrito, setEscrito] = useState('')
  const [ayuda, setAyuda] = useState(false)
  const [verTexto, setVerTexto] = useState(true)
  const [errorMic, setErrorMic] = useState(null)
  const recRef = useRef(null)
  const inicio = useRef(0)

  const situacion = sit ? SITUACIONES.find(s => s.id === sit) : null
  const turno = situacion?.turnos[i]

  // El personaje dice su frase al llegar a cada turno
  useEffect(() => { if (screen === 'jugando' && turno) hablar(turno.dice) }, [screen, turno])
  // Las voces del navegador cargan tarde: al llegar, se vuelve a pedir la lista
  useEffect(() => {
    const s = window.speechSynthesis
    if (!s) return
    s.getVoices()
    s.onvoiceschanged = () => s.getVoices()
    return () => { s.onvoiceschanged = null; s.cancel() }
  }, [])
  useEffect(() => () => recRef.current?.abort?.(), [])

  const empezar = id => {
    setSit(id); setI(0); setIntentos(0); setResultado(null); setAyuda(false); setEscrito(''); setParcial('')
    setCuenta({ verde: 0, amarillo: 0, rojo: 0, puntos: 0 }); setNotas([]); setErrorMic(null)
    inicio.current = ahora()
    setScreen('jugando')
    trackEvent('dilo_ingles_situacion', { item_id: id })
  }

  const evalua = (textos, via) => {
    if (!turno || resultado?.final) return
    const r = corrigeVarias(turno, textos)
    trackEvent('dilo_ingles_respuesta', { item_id: via, nivel: r.nivel })
    const final = r.nivel !== 'rojo' || intentos >= 1
    setResultado({ ...r, final })
    if (r.nivel === 'rojo') setIntentos(n => n + 1)
    if (final) {
      setCuenta(c => ({ ...c, [r.nivel]: c[r.nivel] + 1, puntos: c.puntos + PUNTOS[r.nivel] }))
      if (r.nota || r.nivel === 'rojo') setNotas(n => [...n, { dice: turno.dice, nota: r.nota, modelo: turno.modelo }])
    } else if (r.nota) {
      // un error con explicación cuenta para el resumen aunque luego se acierte
      setNotas(n => [...n, { dice: turno.dice, nota: r.nota, modelo: turno.modelo }])
    }
  }

  const escuchar = () => {
    if (!Reconocedor || escuchando) return
    setErrorMic(null); setParcial(''); setResultado(r => (r?.final ? r : null))
    window.speechSynthesis?.cancel()
    const rec = new Reconocedor()
    rec.lang = 'en-GB'
    rec.interimResults = true
    rec.maxAlternatives = 4
    rec.continuous = false
    let finales = null
    rec.onresult = ev => {
      const res = ev.results[ev.results.length - 1]
      setParcial(res[0].transcript)
      if (res.isFinal) finales = Array.from(res).map(a => a.transcript)
    }
    rec.onerror = ev => {
      setErrorMic(ev.error === 'not-allowed' || ev.error === 'service-not-allowed'
        ? 'El navegador no deja usar el micrófono. Dale permiso o escribe la respuesta.'
        : ev.error === 'no-speech' ? 'No te he oído. Pulsa el micro y habla cerca.' : 'El reconocimiento de voz ha fallado. Prueba otra vez o escribe la respuesta.')
    }
    rec.onend = () => {
      setEscuchando(false)
      if (finales?.length) evalua(finales, 'voz')
    }
    recRef.current = rec
    setEscuchando(true)
    try { rec.start() } catch { setEscuchando(false) }
  }
  const parar = () => recRef.current?.stop()

  const enviarEscrito = ev => {
    ev.preventDefault()
    if (!escrito.trim()) return
    evalua([escrito], 'texto')
    setParcial(escrito)
    setEscrito('')
  }

  const reintentar = () => { setResultado(null); setParcial('') }
  const seguir = () => {
    if (i + 1 < situacion.turnos.length) {
      setI(i + 1); setIntentos(0); setResultado(null); setAyuda(false); setParcial('')
    } else {
      setScreen('fin')
      const segundos = Math.round((ahora() - inicio.current) / 1000)
      if (user) {
        saveActivity(user.uid, {
          type: 'juego', game: 'dilo-en-ingles', category: sit, score: cuenta.puntos, timeSpent: segundos,
          coinsEarned: computeCoins('dilo-en-ingles', { score: cuenta.puntos }), userName: user.displayName, userPhoto: user.photoURL,
        }).catch(() => {})
      }
    }
  }

  const head = (
    <SEOHead path="/juegos/dilo-en-ingles"
      title="Dilo en Inglés: practica a hablar inglés con situaciones reales"
      description="Juego para practicar speaking: el camarero, el recepcionista o un señor por la calle te hablan en inglés y contestas con el micrófono o escribiendo. Gratis y sin registro." />
  )

  if (screen === 'intro') return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
      {head}
      <div className="max-w-2xl w-full">
        <CabeceraJuego slug="dilo-en-ingles" badge="Inglés · Hablar" titulo="🎙️ Dilo en Inglés"
          sub="Te hablan en inglés y contestas con tu voz (o escribiendo)" />
        <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-3">Elige una situación</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {SITUACIONES.map(s => (
            <button key={s.id} type="button" onClick={() => empezar(s.id)}
              className="flex items-end gap-3 rounded-2xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.1] hover:border-white/25 p-3 text-left transition-colors">
              <img src={s.img} alt="" className="w-20 h-20 object-contain object-bottom shrink-0" />
              <span className="min-w-0">
                <span className="block text-white font-black text-lg leading-tight">{s.emoji} {s.titulo}</span>
                <span className="block text-white/50 text-sm leading-snug mt-1">{s.intro}</span>
                <span className="inline-block mt-1.5 text-[11px] font-bold text-sky-300 bg-sky-400/10 rounded px-1.5 py-0.5">{s.nivel} · {s.turnos.length} frases</span>
              </span>
            </button>
          ))}
        </div>
        {!Reconocedor && (
          <p className="mt-4 rounded-xl bg-amber-950/50 border border-amber-400/30 text-amber-100 text-sm px-4 py-3">
            Tu navegador no reconoce la voz (va en Chrome y Edge). Puedes jugar igual escribiendo las respuestas.
          </p>
        )}
        <ComoSeJuega>
          <div className="space-y-2 text-white/70 text-sm">
            <p>El personaje te habla en inglés (y lo ves escrito). Pulsa el micrófono y contesta en voz alta, o escribe la respuesta. Si te atascas, «¿Qué digo?» te da una pista en castellano.</p>
            <p>💚 Perfecto · 💛 Se entiende, pero hay una forma mejor (te dice cuál) · 🔴 Es un error típico o no es lo que toca. Con el rojo tienes otro intento.</p>
            <p>Ojo: no corrige la pronunciación. El reconocedor escribe la frase más parecida que conoce, así que lo que comprueba es si se te entiende, como en una conversación de verdad.</p>
            <p className="text-white/45 text-xs">🔒 En Chrome, tu voz la convierte en texto Google (en Edge, Microsoft). Tuthor no guarda ni el audio ni el texto, y el micrófono solo se abre cuando pulsas el botón.</p>
          </div>
        </ComoSeJuega>
      </div>
    </div>
  )

  if (screen === 'fin') {
    const total = situacion.turnos.length
    const msg = cuenta.verde === total ? '¡Conversación perfecta!' : cuenta.rojo === 0 ? '¡Te han entendido en todo!' : cuenta.rojo <= 1 ? '¡Muy bien! Casi todo entendido' : 'Buen intento: repite la situación y mejorarás'
    return (
      <GameEndScreen game="dilo-en-ingles" emoji="🎙️" title={situacion.titulo} score={cuenta.puntos} message={msg}
        stats={[
          { label: 'perfectas', value: cuenta.verde, emoji: '💚' },
          { label: 'se entiende', value: cuenta.amarillo, emoji: '💛' },
          { label: 'a mejorar', value: cuenta.rojo, emoji: '🔴' },
        ]}
        shareText={`He practicado inglés hablando: «${situacion.titulo}» en Tuthor 🎙️ https://tuthor.es/juegos/dilo-en-ingles`}
        user={user} lang="es" onPlayAgain={() => empezar(sit)}
        secondaryActions={[{ label: 'Otra situación', onClick: () => setScreen('intro') }]}>
        {notas.length > 0 && (
          <div className="mt-4 text-left rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-white font-bold mb-2">Para la próxima vez</p>
            <ul className="space-y-2 text-sm">
              {notas.map((n, k) => (
                <li key={k} className="text-white/70"><span className="text-white/40">«{n.dice}»</span><br />{n.nota && <>{n.nota} </>}<span className="text-emerald-300">→ {n.modelo}</span></li>
              ))}
            </ul>
          </div>
        )}
      </GameEndScreen>
    )
  }

  if (!turno) return null
  const total = situacion.turnos.length
  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-3 sm:px-4 py-4">
      {head}
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-3">
          <button type="button" onClick={() => setScreen('intro')} className="text-white/50 hover:text-white text-sm">← Situaciones</button>
          <p className="text-white/70 font-bold text-sm">{situacion.emoji} {situacion.titulo}</p>
          <p className="text-white font-bold text-sm">{cuenta.puntos} pts</p>
        </div>
        <div className="flex gap-1 mb-4">
          {situacion.turnos.map((_, k) => <span key={k} className={`h-1.5 flex-1 rounded-full ${k < i ? 'bg-emerald-400' : k === i ? 'bg-white/60' : 'bg-white/10'}`} />)}
        </div>

        <div className="flex items-end gap-3">
          <img src={situacion.img} alt={situacion.personaje} className="w-24 sm:w-36 shrink-0 object-contain object-bottom" draggable="false" />
          <div className="relative flex-1 mb-4 rounded-2xl bg-white text-slate-900 p-4 shadow-xl">
            <p className="text-xs font-bold text-slate-500 mb-1">{situacion.personaje}</p>
            <p className={`text-lg sm:text-2xl font-bold leading-snug ${verTexto ? '' : 'blur-sm select-none'}`}>{turno.dice}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <button type="button" onClick={() => hablar(turno.dice)} className="rounded-lg bg-slate-100 hover:bg-slate-200 text-sm font-bold px-3 py-1.5">🔊 Otra vez</button>
              <button type="button" onClick={() => hablar(turno.dice, true)} className="rounded-lg bg-slate-100 hover:bg-slate-200 text-sm font-bold px-3 py-1.5">🐢 Despacio</button>
              <button type="button" onClick={() => setVerTexto(v => !v)} className="rounded-lg bg-slate-100 hover:bg-slate-200 text-sm font-bold px-3 py-1.5">{verTexto ? '👂 Solo escuchar' : '👀 Ver el texto'}</button>
            </div>
            <span className="absolute -left-2 bottom-6 w-4 h-4 bg-white rotate-45" aria-hidden="true" />
          </div>
        </div>

        {!resultado?.final && (
          <>
            <div className="text-center mb-3">
              {ayuda
                ? <p className="inline-block rounded-xl bg-sky-950/60 border border-sky-400/30 text-sky-100 px-4 py-2 text-sm sm:text-base">💡 {turno.ayuda}</p>
                : <button type="button" onClick={() => setAyuda(true)} className="text-sky-300 hover:text-sky-200 text-sm font-bold">💡 ¿Qué digo?</button>}
            </div>
            {Reconocedor && (
              <div className="flex flex-col items-center">
                <button type="button" onClick={escuchando ? parar : escuchar} aria-label={escuchando ? 'Parar' : 'Hablar'}
                  className={`w-24 h-24 rounded-full text-4xl shadow-xl transition-all ${escuchando ? 'bg-red-500 animate-pulse scale-105' : 'bg-amber-400 hover:bg-amber-300'}`}>
                  {escuchando ? '⏹️' : '🎙️'}
                </button>
                <p className="text-white/60 text-sm mt-2 min-h-[1.5rem]">{escuchando ? (parcial ? `«${parcial}»` : 'Te escucho…') : 'Pulsa y habla en inglés'}</p>
              </div>
            )}
            <form onSubmit={enviarEscrito} className="flex gap-2 mt-3 max-w-md mx-auto">
              <input value={escrito} onChange={ev => setEscrito(ev.target.value)} placeholder={Reconocedor ? '…o escríbelo aquí' : 'Escribe tu respuesta en inglés'}
                className="flex-1 min-w-0 rounded-xl bg-white/10 border border-white/15 text-white px-3 py-2.5 placeholder-white/35 focus:outline-none focus:border-white/40" autoComplete="off" />
              <button type="submit" className="rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold px-4">Enviar</button>
            </form>
            {errorMic && <p className="text-red-300 text-sm text-center mt-2">{errorMic}</p>}
          </>
        )}

        {resultado && (
          <div className={`mt-4 rounded-2xl border-2 p-4 ${COLOR[resultado.nivel]}`} role="status">
            <p className="font-black text-lg">{resultado.vacio ? '🔴 No te he entendido' : resultado.nivel === 'rojo' && !resultado.nota ? TITULO_NO_RECONOCIDA : TITULO[resultado.nivel]}</p>
            {resultado.texto && <p className="text-sm opacity-80 mt-0.5">Has dicho: «{resultado.texto}»</p>}
            {resultado.nota && <p className="mt-2">{resultado.nota}</p>}
            {!resultado.nota && resultado.nivel === 'rojo' && !resultado.vacio && <p className="mt-2">No la he reconocido como respuesta a esta pregunta. {resultado.final ? 'Si crees que estaba bien, puede que lo esté: aquí tienes otra forma de decirlo.' : 'Mira la pista y prueba otra vez.'}</p>}
            {(resultado.nivel !== 'verde' && resultado.final) && (
              <p className="mt-2 font-bold">Una forma de decirlo: <span className="text-white">{turno.modelo}</span>
                <button type="button" onClick={() => hablar(turno.modelo.split(' / ')[0])} className="ml-2 text-sm underline">🔊</button></p>
            )}
            <div className="mt-3">
              {resultado.final
                ? <button type="button" onClick={seguir} className="rounded-xl bg-white text-slate-900 font-black px-5 py-2.5">{i + 1 < total ? 'Seguir ▸' : 'Terminar ▸'}</button>
                : <button type="button" onClick={reintentar} className="rounded-xl bg-white text-slate-900 font-black px-5 py-2.5">Probar otra vez</button>}
            </div>
          </div>
        )}
        <p className="text-center text-white/25 text-xs mt-6"><a href={localPath('/privacidad')} className="underline">Privacidad</a>: Tuthor no guarda tu voz ni lo que dices.</p>
      </div>
    </div>
  )
}
