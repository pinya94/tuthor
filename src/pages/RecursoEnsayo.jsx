// Recurso «Ensayo con la orquesta» (/recursos/ensayo-orquesta): para tocar
// con toda la clase delante del proyector. Todas las voces a la vez en la
// partitura, cada una se puede silenciar o dejar sola, con tempo, tramo
// (desde-hasta) y bucle. Sin micro ni puntos: con 25 alumnos tocando, el micro
// no sirve. El juego con corrección es «Toca con la Orquesta».
import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { OBRAS, OBRA_POR_DEFECTO } from '../data/tocaOrquesta/obras'
import { musicXMLPartitura, notasParte, numCompases, negrasPorCompas } from '../lib/tocaOrquesta'
import Partitura from '../components/tocaOrquesta/Partitura'
import { planEnsayo } from '../lib/planEnsayo'
import SEOHead from '../components/SEOHead'

const VOL = { melodia: 0.9, armonia: 0.55, acompanamiento: 0.55, bajo: 0.8, laminas: 0.6, acordes: 0.35, percusion: 0.5 }
// Posiciones del ukelele (cuerdas Sol Do Mi La; traste de cada una, 0 = al aire)
const UKELELE = { G: [0, 2, 3, 2], D7: [2, 0, 2, 0], F: [2, 0, 1, 0], C7: [0, 0, 0, 1], C: [0, 0, 0, 3] }
const LATINO = { G: 'Sol', D7: 'Re7', F: 'Fa', C7: 'Do7', C: 'Do' }

function DiagramaUkelele({ cifra, l }) {
  const trastes = UKELELE[cifra]
  if (!trastes) return null
  const x = i => 14 + i * 16, y = f => 18 + f * 18
  return (
    <figure className="text-center">
      <svg viewBox="0 0 76 96" className="w-16 h-20 mx-auto" role="img" aria-label={`${LATINO[cifra]}: ${trastes.join(' ')}`}>
        <rect x="12" y="16" width="52" height="4" fill="#E2E8F0" />
        {[1, 2, 3, 4].map(f => <line key={f} x1="14" x2="62" y1={y(f)} y2={y(f)} stroke="#94A3B8" strokeWidth="1.5" />)}
        {[0, 1, 2, 3].map(i => <line key={i} x1={x(i)} x2={x(i)} y1="18" y2={y(4)} stroke="#CBD5E1" strokeWidth="1.5" />)}
        {trastes.map((f, i) => (f === 0
          ? <circle key={i} cx={x(i)} cy="9" r="3.5" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
          : <circle key={i} cx={x(i)} cy={y(f) - 9} r="5" fill="#EDAE49" />))}
      </svg>
      <figcaption className="text-white font-black text-sm">{l === 'en' ? cifra : `${LATINO[cifra]} (${cifra})`}</figcaption>
    </figure>
  )
}

export default function RecursoEnsayo() {
  const { lang, localPath, tr } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const [params] = useSearchParams()
  const [obraId, setObraId] = useState(() => (OBRAS[params.get('obra')] ? params.get('obra') : OBRA_POR_DEFECTO))
  const obra = OBRAS[obraId]
  const vocesObra = useMemo(() => Object.keys(OBRAS[obraId].voces), [obraId])
  const n = numCompases(obraId)
  const ncomp = negrasPorCompas(obraId)

  const [apagadas, setApagadas] = useState({})
  const [solo, setSolo] = useState(null)
  const [tempo, setTempo] = useState(70)
  const [desde, setDesde] = useState(1)
  const [hasta, setHasta] = useState(n)
  const [bucle, setBucle] = useState(false)
  const [metronomo, setMetronomo] = useState(true)
  const [tocando, setTocando] = useState(false)
  const [posicion, setPosicion] = useState(null)
  const [enPantalla, setEnPantalla] = useState(false)
  const [marcando, setMarcando] = useState(false) // tras tocar el compás de inicio, falta el final
  // Ensayo guiado: qué voces toca la clase, el plan de pasos y en cuál vamos
  const [modo, setModo] = useState('guiado') // guiado · libre
  const [vocesClase, setVocesClase] = useState(() => Object.keys(OBRAS[obraId].voces))
  const [paso, setPaso] = useState(0)
  const [hechos, setHechos] = useState({})
  const plan = useMemo(() => planEnsayo(obraId, vocesClase), [obraId, vocesClase])
  const actual = plan[Math.min(paso, plan.length - 1)]

  const motorRef = useRef(null)
  const relojRef = useRef(0)
  const escenaRef = useRef(null)

  const xml = useMemo(() => musicXMLPartitura(obraId, vocesObra, l), [obraId, vocesObra, l])
  const suena = v => (solo ? solo === v : !apagadas[v])

  // Silenciar/dejar sola una voz también mientras suena (cada voz tiene su canal)
  useEffect(() => {
    const m = motorRef.current
    if (!m) return
    for (const v of vocesObra) m.canal(v).gain.setTargetAtTime(suena(v) ? 1 : 0, m.ctx.currentTime, 0.02)
  })

  useEffect(() => () => { clearInterval(relojRef.current); motorRef.current?.cierra() }, [])
  useEffect(() => {
    const f = () => setEnPantalla(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', f)
    return () => document.removeEventListener('fullscreenchange', f)
  }, [])

  const cambiaObra = id => {
    para()
    setObraId(id)
    setApagadas({}); setSolo(null)
    setDesde(1); setHasta(numCompases(id))
    setVocesClase(Object.keys(OBRAS[id].voces)); setPaso(0); setHechos({})
  }

  const para = useCallback(() => {
    clearInterval(relojRef.current)
    motorRef.current?.para()
    setTocando(false)
    setPosicion(null)
  }, [])

  async function toca(cfg = { tempo, desde, hasta, bucle, metronomo, suenan: vocesObra.filter(v => suena(v)) }) {
    if (!motorRef.current) {
      const { creaMotor } = await import('../lib/tocaOrquestaAudio')
      motorRef.current = creaMotor()
    }
    const m = motorRef.current
    if (m.ctx.state === 'suspended') await m.ctx.resume()
    // Las notas suenan con las alturas del arreglo (de concierto)
    const concierto = v => notasParte({ obraId, vozId: '', sonido: 0, trans: 0 }, v)
    await Promise.all(vocesObra.map(v => m.carga(obra.voces[v].timbre, concierto(v).map(x => x.suena))))
    for (const v of vocesObra) m.canal(v).gain.value = cfg.suenan.includes(v) ? 1 : 0
    const spq = 60 / (obra.tempo * cfg.tempo / 100)
    const a = Math.min(cfg.desde, cfg.hasta), b = Math.max(cfg.desde, cfg.hasta)
    const q0 = (a - 1) * ncomp, q1 = b * ncomp
    const dur = (q1 - q0) * spq
    const porVoz = vocesObra.map(v => [v, concierto(v).filter(x => x.inicio >= q0 && x.inicio < q1)])
    const programa = inicio => {
      for (const [v, ns] of porVoz) for (const x of ns) m.nota(obra.voces[v].timbre, x.suena, inicio + (x.inicio - q0) * spq, x.dur * spq, VOL[v] ?? 0.7, m.canal(v))
      if (cfg.metronomo) for (let k = 0; k < q1 - q0; k++) m.click(inicio + k * spq, k % ncomp === 0, 0.35)
    }
    const cuenta = ncomp * spq
    let vuelta = m.ctx.currentTime + 0.3 + cuenta
    for (let k = 0; k < ncomp; k++) m.click(vuelta - cuenta + k * spq, k === 0)
    programa(vuelta)
    let siguiente = false
    setTocando(true)
    relojRef.current = setInterval(() => {
      const t = m.ctx.currentTime - vuelta
      if (t >= 0 && t < dur) {
        const neg = t / spq
        setPosicion({ compas: a + Math.floor(neg / ncomp), negra: neg % ncomp })
      }
      // En bucle: la vuelta siguiente se programa un segundo antes, sin hueco
      if (cfg.bucle && !siguiente && t > dur - 1) { programa(vuelta + dur); siguiente = true }
      if (t >= dur) {
        if (cfg.bucle) { vuelta += dur; siguiente = false } else para()
      }
    }, 16)
  }

  function aplicaPaso(p) {
    setApagadas(Object.fromEntries(vocesObra.map(v => [v, !p.suenan.includes(v)])))
    setSolo(null)
    setTempo(p.tempo); setDesde(p.desde); setHasta(p.hasta); setBucle(p.bucle); setMetronomo(p.metronomo)
  }
  function empiezaPaso() {
    aplicaPaso(actual)
    setHechos(h => ({ ...h, [actual.id]: true }))
    toca(actual)
  }
  function irAPaso(i) {
    para()
    setPaso(i)
    aplicaPaso(plan[i])
  }
  const nombreGrupos = vs => vs.map(v => tr(obra.voces[v].grupo)).join(' + ')

  function pantallaCompleta() {
    if (document.fullscreenElement) document.exitFullscreen?.()
    else escenaRef.current?.requestFullscreen?.().catch(() => {})
  }

  const cifras = obra.voces.acordes ? [...new Set(Object.values(obra.cifrado))] : []
  const opcionesCompas = Array.from({ length: n }, (_, i) => i + 1)
  const pill = on => `px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${on ? 'bg-white/15 border-white/30 text-white' : 'bg-white/5 border-white/10 text-white/45 hover:text-white/80'}`

  return (
    <div className="relative z-10 min-h-[calc(100vh-4rem)] px-3 sm:px-4 py-6">
      <SEOHead
        title={tr({ es: 'Ensayo con la orquesta: todas las voces a la vez para tocar en clase', en: 'Orchestra rehearsal: every part at once to play in class', ca: 'Assaig amb l’orquestra: totes les veus alhora per tocar a classe' })}
        description={tr({ es: 'El Himno de la alegría para flauta dulce, láminas, ukelele y percusión, o para orquesta: la partitura de todas las voces en el proyector, con cada voz que se puede silenciar, tempo, tramo y bucle. Gratis.', en: 'Ode to Joy for recorder, tuned percussion, ukulele and percussion, or for orchestra: every part on the projector, mute any part, set the tempo, a passage and a loop. Free.', ca: 'L’Himne de l’alegria per a flauta dolça, làmines, ukelele i percussió, o per a orquestra: la partitura de totes les veus al projector, amb cada veu que es pot silenciar, tempo, tram i bucle. Gratis.' })}
        path="/recursos/ensayo-orquesta" />
      <div className="max-w-5xl mx-auto">
        <p className="text-white/40 text-xs uppercase tracking-widest">{tr({ es: 'Recurso de Música · para la clase', en: 'Music resource · for the class', ca: 'Recurs de Música · per a la classe' })}</p>
        <h1 className="text-white text-2xl sm:text-3xl font-black mt-1">🏫 {tr({ es: 'Ensayo con la orquesta', en: 'Orchestra rehearsal', ca: 'Assaig amb l’orquestra' })}</h1>
        <p className="text-white/60 text-sm mt-1 max-w-2xl">
          {tr({ es: 'Proyecta la partitura de todas las voces y tocad juntos con el acompañamiento de fondo. Cada grupo de la clase toca una voz; las demás las pone la orquesta. Silencia una voz cuando ya la toque la clase, déjala sola para ensayarla o repite un tramo en bucle.', en: 'Project every part and play together with the backing. Each group in the class plays one part; the orchestra plays the others. Mute a part once the class plays it, solo it to practise, or loop a passage.', ca: 'Projecta la partitura de totes les veus i toqueu junts amb l’acompanyament de fons. Cada grup de la classe toca una veu; les altres les posa l’orquestra. Silencia una veu quan ja la toqui la classe, deixa-la sola per assajar-la o repeteix un tram en bucle.' })}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {Object.keys(OBRAS).map(id => (
            <button key={id} type="button" onClick={() => cambiaObra(id)} className={pill(obraId === id)}>
              {id === 'himno-alegria' ? '🎻' : '🏫'} {tr(OBRAS[id].titulo)} · {tr(OBRAS[id].version)}
            </button>
          ))}
        </div>

        <div className="flex gap-1.5 mt-3">
          {[['guiado', tr({ es: '📋 Ensayo guiado', en: '📋 Guided rehearsal', ca: '📋 Assaig guiat' })], ['libre', tr({ es: '🎛️ Libre', en: '🎛️ Free', ca: '🎛️ Lliure' })]].map(([id, txt]) => (
            <button key={id} type="button" onClick={() => { para(); setModo(id); if (id === 'guiado') aplicaPaso(actual) }} className={`px-3 py-1.5 rounded-lg text-sm font-bold ${modo === id ? 'bg-[#EDAE49] text-black' : 'bg-white/10 text-white/70'}`}>{txt}</button>
          ))}
        </div>

        <div ref={escenaRef} className={`mt-3 ${enPantalla ? 'bg-[#0b1020] p-4 overflow-auto' : ''}`}>
          {modo === 'guiado' && (
            <div className="mb-3">
              <div className="flex flex-wrap items-center gap-1.5 mb-2 text-sm">
                <span className="text-white/60 mr-1">{tr({ es: '¿Qué toca tu clase?', en: 'What does your class play?', ca: 'Què toca la teva classe?' })}</span>
                {vocesObra.map(v => {
                  const on = vocesClase.includes(v)
                  return (
                    <button key={v} type="button" disabled={tocando} aria-pressed={on}
                      onClick={() => { setVocesClase(x => (on ? x.filter(y => y !== v) : [...x, v])); setPaso(0); setHechos({}) }}
                      className={pill(on)}>{on ? '✓ ' : ''}{tr(obra.voces[v].grupo)}</button>
                  )
                })}
              </div>
              {/* Los pasos del plan: se puede saltar a cualquiera */}
              <ol className="flex gap-1.5 overflow-x-auto pb-1.5">
                {plan.map((p, i) => (
                  <li key={p.id} className="shrink-0">
                    <button type="button" disabled={tocando} onClick={() => irAPaso(i)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border whitespace-nowrap ${i === paso ? 'bg-sky-500/25 border-sky-300 text-white' : hechos[p.id] ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-100' : 'bg-white/5 border-white/10 text-white/50'}`}>
                      {hechos[p.id] && i !== paso ? '✓ ' : `${i + 1}. `}{tr(p.titulo)}
                    </button>
                  </li>
                ))}
              </ol>
              <div className="rounded-2xl bg-white/[0.06] border border-white/15 px-4 py-3">
                <p className="text-white/40 text-xs uppercase tracking-widest">{tr({ es: `Paso ${paso + 1} de ${plan.length}`, en: `Step ${paso + 1} of ${plan.length}`, ca: `Pas ${paso + 1} de ${plan.length}` })}</p>
                <p className="text-white font-black text-2xl sm:text-3xl leading-tight mt-0.5">
                  {actual.tocan.length ? `🎵 ${tr({ es: 'Tocan', en: 'Playing', ca: 'Toquen' })}: ${nombreGrupos(actual.tocan)}` : `👂 ${tr({ es: 'Escuchamos', en: 'We listen', ca: 'Escoltem' })}`}
                </p>
                <p className="text-white/75 text-sm mt-1">
                  🔊 {actual.suenan.length ? (actual.fase === 'escuchar' || actual.suenan.length === vocesObra.length ? tr({ es: 'Suenan todas las voces', en: 'Every part plays', ca: 'Sonen totes les veus' }) : `${tr({ es: 'Suena', en: 'Speaker plays', ca: 'Sona' })}: ${nombreGrupos(actual.suenan)}`) : tr({ es: 'Solo el metrónomo', en: 'Only the metronome', ca: 'Només el metrònom' })}
                  {actual.metronomo && actual.suenan.length ? ` · ${tr({ es: 'metrónomo', en: 'metronome', ca: 'metrònom' })}` : ''}
                  {' · '}{tr({ es: `compases ${actual.desde}-${actual.hasta}`, en: `bars ${actual.desde}-${actual.hasta}`, ca: `compassos ${actual.desde}-${actual.hasta}` })}
                  {' · '}{actual.tempo} %{actual.bucle ? ` · ${tr({ es: 'en bucle', en: 'looping', ca: 'en bucle' })}` : ''}
                </p>
                <p className="text-white/50 text-sm mt-1">💡 {tr(actual.consejo)}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {tocando
                    ? <button type="button" onClick={para} className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-black">⏹ {tr({ es: 'Parar', en: 'Stop', ca: 'Aturar' })}</button>
                    : <button type="button" onClick={empiezaPaso} className="px-5 py-2.5 rounded-xl bg-[#EDAE49] text-black font-black">▶ {tr({ es: 'Empezar este paso', en: 'Start this step', ca: 'Començar aquest pas' })}</button>}
                  <button type="button" disabled={paso === 0} onClick={() => irAPaso(paso - 1)} className="px-3 py-2.5 rounded-xl bg-white/10 text-white font-bold disabled:opacity-30">← {tr({ es: 'Anterior', en: 'Back', ca: 'Anterior' })}</button>
                  <button type="button" disabled={paso >= plan.length - 1} onClick={() => irAPaso(paso + 1)} className="px-3 py-2.5 rounded-xl bg-white/10 text-white font-bold disabled:opacity-30">{tr({ es: 'Siguiente paso', en: 'Next step', ca: 'Pas següent' })} →</button>
                  <button type="button" onClick={pantallaCompleta} className="ml-auto px-3 py-2.5 rounded-xl bg-white/10 text-white text-xs font-bold">⛶ {enPantalla ? tr({ es: 'Salir', en: 'Exit', ca: 'Sortir' }) : tr({ es: 'Proyector', en: 'Projector', ca: 'Projector' })}</button>
                </div>
              </div>
            </div>
          )}
          {modo === 'libre' && (<>
          {/* Voces: suena / silenciada / sola */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {vocesObra.map(v => (
              <span key={v} className={`inline-flex items-center rounded-lg border ${suena(v) ? 'border-emerald-400/50 bg-emerald-500/10' : 'border-white/10 bg-white/5'}`}>
                <button type="button" onClick={() => { setSolo(null); setApagadas(x => ({ ...x, [v]: !x[v] })) }}
                  className={`px-2.5 py-1.5 text-xs font-bold ${suena(v) ? 'text-white' : 'text-white/40 line-through'}`}
                  aria-pressed={suena(v)} title={tr({ es: 'Sonar / silenciar', en: 'Play / mute', ca: 'Sonar / silenciar' })}>
                  {suena(v) ? '🔊' : '🔇'} {tr(obra.voces[v].nombre)}
                </button>
                <button type="button" onClick={() => setSolo(s => (s === v ? null : v))}
                  className={`px-2 py-1.5 text-[11px] font-black border-l border-white/10 ${solo === v ? 'text-amber-300' : 'text-white/40'}`}>
                  {tr({ es: 'SOLO', en: 'SOLO', ca: 'SOLO' })}
                </button>
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3 text-white/70 text-sm">
            {tocando
              ? <button type="button" onClick={para} className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-black">⏹ {tr({ es: 'Parar', en: 'Stop', ca: 'Aturar' })}</button>
              : <button type="button" onClick={() => toca()} className="px-5 py-2.5 rounded-xl bg-[#EDAE49] text-black font-black">▶ {tr({ es: 'Tocar', en: 'Play', ca: 'Tocar' })}</button>}
            <label className="flex items-center gap-2">
              <span>{tr({ es: 'Tempo', en: 'Tempo', ca: 'Tempo' })} {tempo} %</span>
              <input type="range" min="40" max="120" step="10" value={tempo} disabled={tocando} onChange={e => setTempo(Number(e.target.value))} className="w-28" />
            </label>
            <label className="flex items-center gap-1.5">
              {tr({ es: 'Compases', en: 'Bars', ca: 'Compassos' })}
              <select value={desde} disabled={tocando} onChange={e => setDesde(Number(e.target.value))} className="bg-white/10 rounded px-1 py-0.5 text-white">
                {opcionesCompas.map(c => <option key={c} value={c} className="text-black">{c}</option>)}
              </select>
              –
              <select value={hasta} disabled={tocando} onChange={e => setHasta(Number(e.target.value))} className="bg-white/10 rounded px-1 py-0.5 text-white">
                {opcionesCompas.map(c => <option key={c} value={c} className="text-black">{c}</option>)}
              </select>
            </label>
            <label className="flex items-center gap-1.5"><input type="checkbox" checked={bucle} disabled={tocando} onChange={e => setBucle(e.target.checked)} /> {tr({ es: 'En bucle', en: 'Loop', ca: 'En bucle' })}</label>
            <label className="flex items-center gap-1.5"><input type="checkbox" checked={metronomo} disabled={tocando} onChange={e => setMetronomo(e.target.checked)} /> {tr({ es: 'Metrónomo', en: 'Metronome', ca: 'Metrònom' })}</label>
            <button type="button" onClick={pantallaCompleta} className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-bold">
              ⛶ {enPantalla ? tr({ es: 'Salir de pantalla completa', en: 'Exit full screen', ca: 'Sortir de pantalla completa' }) : tr({ es: 'Pantalla completa (proyector)', en: 'Full screen (projector)', ca: 'Pantalla completa (projector)' })}
            </button>
          </div>

          </>)}

          <Partitura xml={xml} negrasCompas={ncomp} posicion={posicion} nombres zoom={enPantalla ? 1.15 : null}
            rango={desde !== 1 || hasta !== n ? [Math.min(desde, hasta), Math.max(desde, hasta)] : null}
            onCompas={c => {
              if (tocando) return
              if (!marcando) { setDesde(c); setHasta(n); setMarcando(true) } else { setHasta(Math.max(c, desde)); setMarcando(false) }
            }} />
          <p className="text-white/40 text-xs mt-1.5">{tr({ es: 'Toca un compás de la partitura para empezar ahí y otro para marcar el final del tramo.', en: 'Tap a bar on the score to start there, and another to mark the end of the passage.', ca: 'Toca un compàs de la partitura per començar-hi i un altre per marcar el final del tram.' })}</p>

          {cifras.length > 0 && (
            <div className="mt-4 rounded-xl bg-white/5 border border-white/10 px-4 py-3">
              <p className="text-white font-bold text-sm mb-2">🎸 {tr({ es: 'Acordes del ukelele', en: 'Ukulele chords', ca: 'Acords de l’ukelele' })}</p>
              <div className="flex gap-6">{cifras.map(c => <DiagramaUkelele key={c} cifra={c} l={l} />)}</div>
              <p className="text-white/40 text-xs mt-2">{tr({ es: 'Cuerdas Sol, Do, Mi, La (de izquierda a derecha). Un rasgueo por cada golpe de la línea.', en: 'Strings G, C, E, A (left to right). One strum for each beat on the line.', ca: 'Cordes Sol, Do, Mi, La (d’esquerra a dreta). Un rasgueig per cada cop de la línia.' })}</p>
            </div>
          )}
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white/70">
            <p className="text-white font-bold mb-1">{tr({ es: 'Cómo usarlo en clase', en: 'How to use it in class', ca: 'Com fer-lo servir a classe' })}</p>
            <p>{tr({ es: '1) Escuchad la obra entera con todas las voces. 2) Cada grupo ensaya su voz sola, despacio y en bucle. 3) Silenciad las voces que ya toca la clase y subid el tempo poco a poco. La versión escuela va en Sol: la flauta dulce solo necesita Si, La, Sol, Do y Re, y el ukelele, dos acordes.', en: '1) Listen to the whole piece with every part. 2) Each group practises its part alone, slowly and in a loop. 3) Mute the parts the class already plays and raise the tempo little by little. The school version is in G: the recorder only needs B, A, G, C and D, and the ukulele two chords.', ca: '1) Escolteu l’obra sencera amb totes les veus. 2) Cada grup assaja la seva veu sola, a poc a poc i en bucle. 3) Silencieu les veus que ja toca la classe i pugeu el tempo de mica en mica. La versió escola va en Sol: la flauta dolça només necessita Si, La, Sol, Do i Re, i l’ukelele, dos acords.' })}</p>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white/70">
            <p className="text-white font-bold mb-1">{tr({ es: '¿Y en casa?', en: 'And at home?', ca: 'I a casa?' })}</p>
            <p>{tr({ es: 'Con el juego cada alumno toca su voz y el micro le corrige nota y entrada, compás a compás.', en: 'With the game each student plays their part and the microphone checks every note and entry, bar by bar.', ca: 'Amb el joc cada alumne toca la seva veu i el micro li corregeix nota i entrada, compàs a compàs.' })}</p>
            <Link to={localPath('/juegos/toca-con-la-orquesta')} className="inline-block mt-2 px-3 py-1.5 rounded-lg bg-[#EDAE49] text-black font-bold">🎻 {tr({ es: 'Toca con la Orquesta', en: 'Play with the Orchestra', ca: 'Toca amb l’Orquestra' })}</Link>
          </div>
        </div>
        <p className="text-white/30 text-xs mt-4">{tr({ es: 'Arreglos propios de Tuthor a partir de la obra de Beethoven (dominio público). Sonidos: FluidR3 GM (Frank Wen), CC BY 3.0. Partitura: OpenSheetMusicDisplay.', en: 'Tuthor’s own arrangements of Beethoven’s work (public domain). Sounds: FluidR3 GM (Frank Wen), CC BY 3.0. Score: OpenSheetMusicDisplay.', ca: 'Arranjaments propis de Tuthor a partir de l’obra de Beethoven (domini públic). Sons: FluidR3 GM (Frank Wen), CC BY 3.0. Partitura: OpenSheetMusicDisplay.' })}</p>
      </div>
    </div>
  )
}
