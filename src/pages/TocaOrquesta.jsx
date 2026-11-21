// «Toca con la Orquesta»: eliges obra, voz e instrumento y tocas tu parte con
// la orquesta de fondo mientras el micro te corrige nota y tiempo, compás a
// compás. Sin instrumento, con el piano en pantalla o el teclado.
// Idea y método de corrección: la app de estudio de partituras del usuario
// (cobla-estudio). Todo en el navegador: el micro no se graba ni se envía.
import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { OBRAS, OBRA_POR_DEFECTO, vocesJugables } from '../data/tocaOrquesta/obras'
import { INSTRUMENTOS, NIVELES, parte, musicXML, notasParte, numCompases, negrasPorCompas, corrige, textoFallo, midiAHz } from '../lib/tocaOrquesta'
import Partitura from '../components/tocaOrquesta/Partitura'
import PianoPantalla from '../components/tocaOrquesta/PianoPantalla'
import GameEndScreen from '../components/GameEndScreen'
import OpinionBeta from '../components/OpinionBeta'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'

const SLUG = 'toca-con-la-orquesta'
const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Al 60 % del tempo, con metrónomo; solo cuenta que la nota sea la buena', en: 'At 60% tempo with a metronome; only the right note counts', ca: 'Al 60 % del tempo, amb metrònom; només compta que la nota sigui la bona' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Al 80 % del tempo, con metrónomo; cuenta la nota y cuándo entras', en: 'At 80% tempo with a metronome; the note and when you come in both count', ca: 'Al 80 % del tempo, amb metrònom; compta la nota i quan entres' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'A tempo y sin metrónomo: solo la orquesta', en: 'Full tempo, no metronome: just the orchestra', ca: 'A tempo i sense metrònom: només l’orquestra' } },
}
const VOL = { melodia: 0.9, armonia: 0.55, acompanamiento: 0.55, bajo: 0.8, laminas: 0.6, acordes: 0.35, percusion: 0.5 }
const CLAVES = { sol: { es: 'Sol', en: 'Treble', ca: 'Sol' }, fa: { es: 'Fa', en: 'Bass', ca: 'Fa' }, do: { es: 'Do (viola)', en: 'Alto', ca: 'Do (viola)' } }
const leeLat = () => { try { return Number(localStorage.getItem('tocaOrquesta.lat')) || 120 } catch { return 120 } }
const guardaLat = v => { try { localStorage.setItem('tocaOrquesta.lat', String(v)) } catch { /* sin almacenamiento */ } }

export default function TocaOrquesta() {
  const { lang, localPath, tr } = useLang()
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const backPath = location.state?.backPath

  const [screen, setScreen] = useState('intro')
  const [obraId, setObraId] = useState(OBRA_POR_DEFECTO)
  const [vozId, setVozId] = useState('melodia')
  const [instId, setInstId] = useState('flautaDulce')
  const [semitonos, setSemitonos] = useState(0)
  const [claveOtro, setClaveOtro] = useState('sol')
  const [nivel, setNivel] = useState('facil')
  const [estado, setEstado] = useState('listo') // listo · cargando · tocando · escuchando · calibrando
  const [aviso, setAviso] = useState('')
  const [posicion, setPosicion] = useState(null)
  const [nivelMic, setNivelMic] = useState(0)
  const [latencia, setLatencia] = useState(leeLat)
  const [tecla, setTecla] = useState(null)
  const [resultado, setResultado] = useState(null)
  const [marcado, setMarcado] = useState(null) // compás tocado en la lista de fallos

  const motorRef = useRef(null)
  const rafRef = useRef(0)
  const framesRef = useRef([])
  const pulsadaRef = useRef(null)

  const obra = OBRAS[obraId]
  const p = useMemo(() => parte(obraId, vozId, instId, { semitonos, clave: claveOtro }), [obraId, vozId, instId, semitonos, claveOtro])
  const xml = useMemo(() => musicXML(p), [p])
  const conPiano = instId === 'piano'
  const ncomp = negrasPorCompas(obraId)

  const motor = useCallback(async () => {
    if (!motorRef.current) {
      const { creaMotor } = await import('../lib/tocaOrquestaAudio')
      motorRef.current = creaMotor()
    }
    if (motorRef.current.ctx.state === 'suspended') await motorRef.current.ctx.resume()
    return motorRef.current
  }, [])
  useEffect(() => () => { clearInterval(rafRef.current); motorRef.current?.cierra() }, [])

  function detener() {
    clearInterval(rafRef.current)
    motorRef.current?.para()
    setPosicion(null)
    setEstado('listo')
  }

  async function empezar(soloEscuchar = false) {
    if (estado === 'tocando' || estado === 'escuchando') return
    setAviso('')
    setEstado('cargando')
    const m = await motor()
    if (!soloEscuchar && !conPiano && !(await m.abreMicro())) {
      setAviso(tr({ es: 'No se ha podido abrir el micro. Dale permiso en el navegador o toca con el piano en pantalla.', en: 'The microphone could not be opened. Allow it in the browser or play with the on-screen piano.', ca: 'No s’ha pogut obrir el micro. Dona-hi permís al navegador o toca amb el piano en pantalla.' }))
      setEstado('listo')
      return
    }
    const voces = Object.keys(obra.voces)
    await Promise.all(voces.map(v => m.carga(obra.voces[v].timbre, notasParte(p, v).map(n => n.suena))))
    const spq = 60 / (obra.tempo * NIVELES[nivel].tempo)
    const cuenta = ncomp * spq
    const t0 = m.ctx.currentTime + 0.4 + cuenta
    for (let k = 0; k < ncomp; k++) m.click(t0 - cuenta + k * spq, k === 0)
    for (const v of voces) {
      const mia = v === vozId
      if (mia && !soloEscuchar) continue // tu parte no suena mientras tocas
      for (const n of notasParte(p, v)) m.nota(obra.voces[v].timbre, n.suena, t0 + n.inicio * spq, n.dur * spq, mia ? 1 : VOL[v])
    }
    const total = numCompases(obraId) * ncomp * spq
    if (NIVELES[nivel].metronomo && !soloEscuchar) {
      for (let k = 0; k < total / spq; k++) m.click(t0 + k * spq, k % ncomp === 0, 0.3)
    }
    const misNotas = notasParte(p)
    const minHz = midiAHz(Math.min(...misNotas.map(n => n.suena)) - 3)
    framesRef.current = []
    setEstado(soloEscuchar ? 'escuchando' : 'tocando')
    const lat = latencia / 1000
    const bucle = () => {
      const t = m.ctx.currentTime - t0
      if (t >= 0) {
        const neg = t / spq
        setPosicion({ compas: Math.min(numCompases(obraId), Math.floor(neg / ncomp) + 1), negra: neg % ncomp })
      }
      if (!soloEscuchar) {
        if (conPiano) {
          framesRef.current.push({ t, rms: pulsadaRef.current != null ? 1 : 0, m: pulsadaRef.current })
        } else {
          const f = m.escucha(minHz)
          if (f) { framesRef.current.push({ t: f.t - lat - t0, rms: f.rms, m: f.m }); setNivelMic(Math.min(1, f.rms * 8)) }
        }
      }
      if (t > total + 0.5) termina(soloEscuchar, spq, misNotas)
    }
    // Cada 16 ms (no requestAnimationFrame: se para si la ventana no está a la vista)
    rafRef.current = setInterval(bucle, 16)
  }

  function termina(soloEscuchar, spq, misNotas) {
    clearInterval(rafRef.current)
    motorRef.current?.para()
    setPosicion(null)
    setEstado('listo')
    if (soloEscuchar) return
    const notas = misNotas.map(n => ({ ...n, s0: n.inicio * spq, ds: n.dur * spq }))
    const r = corrige(notas, framesRef.current, { octavaLibre: true, tiempo: NIVELES[nivel].tiempo })
    setResultado(r)
    setMarcado(null)
    setScreen('fin')
    if (user) {
      saveActivity(user.uid, {
        type: 'juego', game: SLUG, category: obraId,
        score: r.pct, timeSpent: Math.round(numCompases(obraId) * ncomp * spq),
        coinsEarned: computeCoins(SLUG, { score: r.pct }),
        userName: user.displayName, userPhoto: user.photoURL,
      }).catch(() => {})
    }
  }

  async function calibrar() {
    setEstado('calibrando')
    setAviso(tr({ es: 'Toca una nota corta con cada golpe…', en: 'Play a short note with each click…', ca: 'Toca una nota curta amb cada cop…' }))
    const m = await motor()
    const r = await m.calibra()
    if (r.ms != null) {
      setLatencia(r.ms); guardaLat(r.ms)
      setAviso(tr({ es: `Listo: retardo del micro ${r.ms} ms.`, en: `Done: microphone delay ${r.ms} ms.`, ca: `Fet: retard del micro ${r.ms} ms.` }))
    } else {
      setAviso(tr({ es: 'No he oído bien las notas. Acércate al micro y usa auriculares.', en: 'I couldn’t hear the notes well. Get closer to the microphone and use headphones.', ca: 'No he sentit bé les notes. Acosta’t al micro i fes servir auriculars.' }))
    }
    setEstado('listo')
  }

  const pulsa = useCallback(async midi => {
    pulsadaRef.current = midi
    setTecla(midi)
    const m = await motor()
    m.nota('piano', midi, m.ctx.currentTime, 0.45)
  }, [motor])
  const suelta = useCallback(midi => {
    if (pulsadaRef.current === midi) { pulsadaRef.current = null; setTecla(null) }
  }, [])

  const seo = {
    title: tr({ es: 'Toca con la Orquesta — Toca tu instrumento con la orquesta y el micro te corrige', en: 'Play with the Orchestra — Play your instrument with the orchestra and get corrected', ca: 'Toca amb l’Orquestra — Toca el teu instrument amb l’orquestra i el micro et corregeix' }),
    desc: tr({
      es: 'Elige el Himno de la alegría de Beethoven, tu voz y tu instrumento (flauta dulce, xilófono, violín, flauta, clarinete, trompeta, saxo, trompa, viola o violonchelo) y tócala con la orquesta de fondo. El micro corrige cada nota y cada entrada, compás a compás. También con piano en pantalla. Gratis.',
      en: 'Choose Beethoven’s Ode to Joy, your part and your instrument (recorder, xylophone, violin, flute, clarinet, trumpet, sax, horn, viola or cello) and play it with the orchestra. The microphone checks every note and entry, bar by bar. On-screen piano too. Free.',
      ca: 'Tria l’Himne de l’alegria de Beethoven, la teva veu i el teu instrument (flauta dolça, xilòfon, violí, flauta, clarinet, trompeta, saxo, trompa, viola o violoncel) i toca-la amb l’orquestra de fons. El micro corregeix cada nota i cada entrada, compàs a compàs. També amb piano en pantalla. Gratis.',
    }),
    path: `/juegos/${SLUG}`,
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />
  const nombreInst = id => (id === 'piano' ? tr({ es: 'Sin instrumento: piano en pantalla', en: 'No instrument: on-screen piano', ca: 'Sense instrument: piano en pantalla' }) : tr(INSTRUMENTOS[id].nombre))

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug={SLUG}
            badge={tr({ es: 'Música · Interpretación', en: 'Music · Performance', ca: 'Música · Interpretació' })}
            titulo={tr({ es: '🎻 Toca con la Orquesta', en: '🎻 Play with the Orchestra', ca: '🎻 Toca amb l’Orquestra' })}
            sub={tr({ es: 'Tu instrumento, tu parte y la orquesta de fondo', en: 'Your instrument, your part and the orchestra behind you', ca: 'El teu instrument, la teva part i l’orquestra de fons' })} />
          <p className="text-center mb-4"><span className="rounded bg-violet-500 text-white text-[10px] font-black uppercase tracking-wide px-1.5 py-0.5">Beta</span></p>

          <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 mb-2">
            <p className="text-white font-bold">🎼 {tr(obra.titulo)}</p>
            <p className="text-white/50 text-xs">{obra.autor} · {tr(obra.origen)} · {tr({ es: 'arreglo de Tuthor', en: 'arranged by Tuthor', ca: 'arranjament de Tuthor' })}</p>
          </div>
          <div className="grid grid-cols-2 gap-1.5 mb-4">
            {Object.keys(OBRAS).map(id => (
              <button key={id} type="button" onClick={() => { setObraId(id); setVozId('melodia'); setInstId(id === 'himno-alegria' ? 'violin' : 'flautaDulce') }}
                className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${obraId === id ? 'bg-white/15 border-white/30 text-white' : 'bg-white/5 border-white/10 text-white/50 hover:text-white/80'}`}>
                {id === 'himno-alegria' ? '🎻' : '🏫'} {tr(OBRAS[id].version)}
              </button>
            ))}
          </div>

          <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{tr({ es: 'Tu voz', en: 'Your part', ca: 'La teva veu' })}</p>
          <div className="grid grid-cols-2 gap-1.5 mb-4">
            {vocesJugables(obraId).map(id => [id, obra.voces[id]]).map(([id, v]) => (
              <button key={id} type="button" onClick={() => setVozId(id)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold border transition-all ${vozId === id ? 'bg-white/15 border-white/30 text-white' : 'bg-white/5 border-white/10 text-white/50 hover:text-white/80'}`}>
                {tr(v.nombre)}
              </button>
            ))}
          </div>

          <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{tr({ es: 'Tu instrumento', en: 'Your instrument', ca: 'El teu instrument' })}</p>
          <div className="grid grid-cols-2 gap-1.5 mb-2">
            {[...Object.keys(INSTRUMENTOS), 'piano'].map(id => (
              <button key={id} type="button" onClick={() => setInstId(id)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold border text-left transition-all ${id === 'piano' ? 'col-span-2' : ''} ${instId === id ? 'bg-white/15 border-white/30 text-white' : 'bg-white/5 border-white/10 text-white/50 hover:text-white/80'}`}>
                {id === 'piano' ? '🎹' : INSTRUMENTOS[id].emoji} {nombreInst(id)}
              </button>
            ))}
          </div>
          {instId === 'otro' && (
            <div className="rounded-xl bg-white/5 border border-white/10 px-3 py-3 mb-2 space-y-2">
              <label className="flex items-center justify-between gap-2 text-white/80 text-sm">
                <span>{tr({ es: 'Semitonos que se escribe por encima de lo que suena', en: 'Semitones written above concert pitch', ca: 'Semitons que s’escriu per sobre del que sona' })}</span>
                <span className="flex items-center gap-1">
                  <button type="button" onClick={() => setSemitonos(s => Math.max(-12, s - 1))} className="w-8 h-8 rounded-lg bg-white/10 text-white font-black">−</button>
                  <span className="w-8 text-center text-white font-black">{semitonos > 0 ? `+${semitonos}` : semitonos}</span>
                  <button type="button" onClick={() => setSemitonos(s => Math.min(12, s + 1))} className="w-8 h-8 rounded-lg bg-white/10 text-white font-black">+</button>
                </span>
              </label>
              <p className="text-white/40 text-xs">{tr({ es: 'En Do: 0 · en Si♭: +2 · en Mi♭ (alto): +9 · en Fa: +7', en: 'In C: 0 · in B♭: +2 · in E♭ (alto): +9 · in F: +7', ca: 'En Do: 0 · en Si♭: +2 · en Mi♭ (alt): +9 · en Fa: +7' })}</p>
              <div className="flex items-center gap-1.5 text-sm">
                <span className="text-white/80 mr-1">{tr({ es: 'Clave', en: 'Clef', ca: 'Clau' })}</span>
                {Object.keys(CLAVES).map(c => (
                  <button key={c} type="button" onClick={() => setClaveOtro(c)}
                    className={`px-2.5 py-1 rounded-lg border ${claveOtro === c ? 'bg-white/15 border-white/30 text-white' : 'bg-white/5 border-white/10 text-white/50'}`}>{tr(CLAVES[c])}</button>
                ))}
              </div>
            </div>
          )}

          <p className="text-white/40 text-xs uppercase tracking-widest text-center mt-4 mb-2">{tr({ es: 'Elige nivel', en: 'Choose a level', ca: 'Tria nivell' })}</p>
          <div className="flex flex-wrap justify-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl mb-2">
            {Object.entries(DIFS).map(([id, d], i) => (
              <button key={id} onClick={() => setNivel(id)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${nivel === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}>
                <NivelBarras clave={id} i={i} />{tr(d.label)}
              </button>
            ))}
          </div>
          <p className="text-white/40 text-xs text-center mb-5">{tr(DIFS[nivel].desc)}</p>

          <button onClick={() => setScreen('tocar')}
            className="w-full py-3.5 rounded-2xl bg-[#EDAE49] text-black font-black text-lg hover:bg-amber-400 transition-colors">
            {tr({ es: '▶ Ver mi partitura', en: '▶ See my part', ca: '▶ Veure la meva partitura' })}
          </button>
          <Link to={localPath(`/recursos/ensayo-orquesta?obra=${obraId}`)}
            className="mt-2 block w-full py-3 rounded-2xl bg-white/10 border border-white/15 text-white font-bold text-center hover:bg-white/15">
            🏫 {tr({ es: 'Tocar con la clase (todas las voces en el proyector)', en: 'Play with the class (every part on the projector)', ca: 'Tocar amb la classe (totes les veus al projector)' })}
          </Link>
          <ComoSeJuega>
            <div className="space-y-2 text-white/70 text-sm">
              <p>{tr({ es: 'Elige tu voz y tu instrumento: la partitura sale ya transportada y en tu clave (el clarinete y la trompeta en Si♭, el saxo alto en Mi♭, la trompa en Fa, la viola en clave de Do y el violonchelo en clave de Fa). Con «Otro» eliges los semitonos y vale para cualquier instrumento.', en: 'Choose your part and instrument: the score appears already transposed and in your clef (clarinet and trumpet in B♭, alto sax in E♭, horn in F, viola in alto clef and cello in bass clef). With “Other” you choose the semitones, so it works for any instrument.', ca: 'Tria la teva veu i el teu instrument: la partitura surt ja transportada i en la teva clau (el clarinet i la trompeta en Si♭, el saxo alt en Mi♭, la trompa en Fa, la viola en clau de Do i el violoncel en clau de Fa). Amb «Altre» tries els semitons i serveix per a qualsevol instrument.' })}</p>
              <p>{tr({ es: 'Pulsa «Tocar»: suena un compás de cuenta y entra la orquesta. Tú tocas tu parte y el micro escucha. Al acabar, cada compás sale en verde (bien), amarillo (casi: un poco alta o baja, o te adelantas o llegas tarde) o rojo (otra nota o no se oye), con la lista de fallos.', en: 'Press “Play”: one bar is counted in and the orchestra comes in. You play your part and the microphone listens. At the end each bar turns green (good), yellow (nearly: a little sharp or flat, early or late) or red (wrong note or not heard), with the list of mistakes.', ca: 'Prem «Tocar»: sona un compàs de compte i entra l’orquestra. Tu toques la teva part i el micro escolta. En acabar, cada compàs surt en verd (bé), groc (gairebé: una mica alta o baixa, o t’avances o arribes tard) o vermell (una altra nota o no se sent), amb la llista d’errors.' })}</p>
              <p>{tr({ es: 'Usa auriculares: si la orquesta sale por el altavoz, el micro la oye. Calibra el micro una vez (toca con cada golpe) para que no te marque tarde. El sonido se analiza en tu dispositivo: no se graba ni se envía.', en: 'Use headphones: if the orchestra comes out of the speaker, the microphone hears it. Calibrate the microphone once (play with each click) so you aren’t marked late. Sound is analysed on your device: nothing is recorded or sent.', ca: 'Fes servir auriculars: si l’orquestra surt per l’altaveu, el micro la sent. Calibra el micro un cop (toca amb cada cop) perquè no et marqui tard. El so s’analitza al teu dispositiu: no es grava ni s’envia.' })}</p>
              <p className="text-white/40 text-xs pt-1">{tr({ es: 'Arreglo propio de Tuthor a partir de la obra de Beethoven (dominio público). Sonidos: FluidR3 GM (Frank Wen), licencia CC BY 3.0. Partitura: OpenSheetMusicDisplay.', en: 'Tuthor’s own arrangement of Beethoven’s work (public domain). Sounds: FluidR3 GM (Frank Wen), CC BY 3.0 licence. Score: OpenSheetMusicDisplay.', ca: 'Arranjament propi de Tuthor a partir de l’obra de Beethoven (domini públic). Sons: FluidR3 GM (Frank Wen), llicència CC BY 3.0. Partitura: OpenSheetMusicDisplay.' })}</p>
            </div>
          </ComoSeJuega>
        </div>
      </div>
    )
  }

  if (screen === 'fin' && resultado) {
    const r = resultado
    const verdes = Object.values(r.porCompas).filter(e => e === 'ok').length
    const msg = r.pct >= 85
      ? (nivel !== 'dificil' ? tr({ es: '¡Muy bien! Prueba el nivel siguiente.', en: 'Very good! Try the next level.', ca: 'Molt bé! Prova el nivell següent.' }) : tr({ es: '¡Lo dominas a tempo!', en: 'You’ve mastered it at full tempo!', ca: 'El domines a tempo!' }))
      : r.pct >= 60 ? tr({ es: 'Casi. Repite; mira en qué compases fallas.', en: 'Nearly. Try again; look at which bars you miss.', ca: 'Gairebé. Repeteix; mira en quins compassos falles.' })
      : tr({ es: 'Baja de nivel (va más lento) o escucha antes tu parte.', en: 'Go down a level (it’s slower) or listen to your part first.', ca: 'Baixa de nivell (va més lent) o escolta abans la teva part.' })
    const porCompas = {}
    r.fallos.forEach(x => { (porCompas[x.compas] = porCompas[x.compas] || []).push(x) })
    const shareText = tr({
      es: `He tocado el Himno de la alegría con la orquesta en Tuthor: ${r.pct} % 🎻 https://tuthor.es/juegos/${SLUG}`,
      en: `I played Ode to Joy with the orchestra on Tuthor: ${r.pct}% 🎻 https://tuthor.es/en/juegos/${SLUG}`,
      ca: `He tocat l’Himne de l’alegria amb l’orquestra a Tuthor: ${r.pct} % 🎻 https://tuthor.es/ca/juegos/${SLUG}`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar voz o instrumento', en: 'Change part or instrument', ca: 'Canviar veu o instrument' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game={SLUG} emoji="🎻" title={tr(obra.titulo)} score={r.pct} message={msg}
        stats={[{ label: tr({ es: 'notas bien', en: 'notes right', ca: 'notes bé' }), value: `${r.pct} %`, emoji: '🎯' }, { label: tr({ es: 'compases en verde', en: 'green bars', ca: 'compassos en verd' }), value: `${verdes}/${numCompases(obraId)}`, emoji: '💚' }]}
        shareText={shareText} user={user} lang={l}
        onPlayAgain={() => setScreen('tocar')} secondaryActions={secondary}>
        <div className="w-full max-w-2xl mx-auto mt-4 text-left">
          <Partitura xml={xml} negrasCompas={ncomp} colores={r.porCompas} onCompas={setMarcado} />
          <ul className="mt-3 space-y-1">
            {Object.keys(porCompas).map(Number).sort((a, b) => a - b).map(c => {
              const xs = porCompas[c]
              const malo = xs.some(x => x.estado === 'bad')
              return (
                <li key={c} className={`rounded-lg px-3 py-1.5 text-sm ${malo ? 'bg-red-500/15 text-red-100' : 'bg-amber-500/15 text-amber-100'} ${marcado === c ? 'ring-2 ring-white/60' : ''}`}>
                  <b>c.{c}</b> {[...new Set(xs.map(x => textoFallo(x, p.quintas, l)))].join('; ')}
                </li>
              )
            })}
            {r.fallos.length === 0 && <li className="rounded-lg px-3 py-1.5 text-sm bg-green-500/15 text-green-100">{tr({ es: 'Todo limpio 👏', en: 'All clean 👏', ca: 'Tot net 👏' })}</li>}
          </ul>
          <div className="mt-4">
            <OpinionBeta juego={SLUG} nombre="Toca con la Orquesta" pagina={`/juegos/${SLUG}`}
              contexto={`${obraId} · ${vozId} · ${instId}${instId === 'otro' ? ` (${semitonos})` : ''} · ${nivel} · ${r.pct}%`} />
          </div>
        </div>
      </GameEndScreen>
    )
  }

  const ocupado = estado !== 'listo'
  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-3 sm:px-4 py-4">
      {head}
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="min-w-0">
            <p className="text-white/40 text-xs uppercase tracking-widest truncate">{DIFS[nivel].emoji} {tr(DIFS[nivel].label)} · {tr(obra.voces[vozId].nombre)}</p>
            <p className="text-white font-bold truncate">{tr(obra.titulo)} · {nombreInst(instId)}</p>
          </div>
          <button type="button" disabled={ocupado} onClick={() => setScreen('intro')} className="shrink-0 text-white/60 text-xs underline disabled:opacity-30">
            {tr({ es: 'Cambiar', en: 'Change', ca: 'Canviar' })}
          </button>
        </div>

        <Partitura xml={xml} negrasCompas={ncomp} posicion={posicion} />

        <div className="flex flex-wrap gap-2 mt-3">
          {estado === 'tocando' || estado === 'escuchando' ? (
            <button type="button" onClick={detener} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-black">⏹ {tr({ es: 'Parar', en: 'Stop', ca: 'Aturar' })}</button>
          ) : (
            <>
              <button type="button" disabled={ocupado} onClick={() => empezar(false)} className="flex-1 min-w-[10rem] py-3 rounded-xl bg-[#EDAE49] text-black font-black disabled:opacity-50">
                {estado === 'cargando' ? '…' : `▶ ${tr({ es: 'Tocar con la orquesta', en: 'Play with the orchestra', ca: 'Tocar amb l’orquestra' })}`}
              </button>
              <button type="button" disabled={ocupado} onClick={() => empezar(true)} className="px-4 py-3 rounded-xl bg-white/10 text-white font-bold disabled:opacity-50">
                👂 {tr({ es: 'Escuchar mi parte', en: 'Hear my part', ca: 'Escoltar la meva part' })}
              </button>
            </>
          )}
        </div>

        {estado === 'tocando' && !conPiano && (
          <div className="mt-2 h-1.5 rounded bg-white/10 overflow-hidden" aria-hidden="true">
            <div className="h-full bg-green-400 transition-[width] duration-75" style={{ width: `${nivelMic * 100}%` }} />
          </div>
        )}
        {aviso && <p className="mt-2 text-amber-200 text-sm">{aviso}</p>}

        {conPiano ? (
          <div className="mt-3">
            <PianoPantalla activa={tecla} onPulsa={pulsa} onSuelta={suelta} l={l} />
            <p className="text-white/40 text-xs mt-1.5">{tr({ es: 'Toca las teclas en pantalla o con el teclado del ordenador (A S D F G H J K = Do Re Mi Fa Sol La Si Do). Vale cualquier octava.', en: 'Tap the keys on screen or use the computer keyboard (A S D F G H J K = C D E F G A B C). Any octave counts.', ca: 'Toca les tecles en pantalla o amb el teclat de l’ordinador (A S D F G H J K = Do Re Mi Fa Sol La Si Do). Val qualsevol octava.' })}</p>
          </div>
        ) : (
          <div className="mt-3 rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white/70 space-y-1.5">
            <p>🎧 {tr({ es: 'Con auriculares: si la orquesta sale por el altavoz, el micro también la oye.', en: 'Use headphones: if the orchestra comes out of the speaker, the microphone hears it too.', ca: 'Amb auriculars: si l’orquestra surt per l’altaveu, el micro també la sent.' })}</p>
            <p className="flex items-center gap-2 flex-wrap">
              <span>🎚️ {tr({ es: `Retardo del micro: ${latencia} ms`, en: `Microphone delay: ${latencia} ms`, ca: `Retard del micro: ${latencia} ms` })}</span>
              <button type="button" disabled={ocupado} onClick={calibrar} className="px-2.5 py-1 rounded-lg bg-white/10 text-white text-xs font-bold disabled:opacity-40">
                {estado === 'calibrando' ? '…' : tr({ es: 'Calibrar', en: 'Calibrate', ca: 'Calibrar' })}
              </button>
            </p>
            <p className="text-white/40 text-xs">{tr({ es: 'El sonido se analiza en tu dispositivo: no se graba ni se envía.', en: 'Sound is analysed on your device: nothing is recorded or sent.', ca: 'El so s’analitza al teu dispositiu: no es grava ni s’envia.' })}</p>
          </div>
        )}
      </div>
    </div>
  )
}
