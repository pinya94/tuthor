// Recurso «Ensayo con la orquesta» (/recursos/ensayo-orquesta): para tocar
// con toda la clase delante del proyector. Sin micro ni puntos: con 25
// alumnos tocando, el micro no sirve. El juego con corrección es «Toca con la
// Orquesta».
//
// Organización (22-nov-2026, a petición del usuario):
//   · Un menú plegable «Preparar el ensayo»: la obra, qué voces toca la clase
//     y con qué instrumento cada una. Las voces van por FUNCIÓN (melodía,
//     acompañamiento, acordes, percusión…), y se tocan con lo que haya.
//   · La partitura solo enseña las voces que toca la clase, cada una escrita
//     para su instrumento (transportada y en su clave); los acordes, con las
//     posiciones del ukelele, la guitarra o el piano.
//   · Ensayo guiado por pasos (lib/planEnsayo) o modo libre.
import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { OBRAS, OBRA_POR_DEFECTO } from '../data/tocaOrquesta/obras'
import { INSTRUMENTOS, PIANO, musicXMLPartitura, notasParte, numCompases, negrasPorCompas } from '../lib/tocaOrquesta'
import { planEnsayo } from '../lib/planEnsayo'
import Partitura from '../components/tocaOrquesta/Partitura'
import DiagramaAcorde, { INSTRUMENTOS_ACORDES } from '../components/tocaOrquesta/DiagramaAcorde'
import SEOHead from '../components/SEOHead'

const T = (es, en, ca) => ({ es, en, ca })
const VOL = { melodia: 0.9, armonia: 0.55, acompanamiento: 0.55, bajo: 0.8, laminas: 0.6, acordes: 0.35, percusion: 0.5 }
// Para qué sirve cada voz (ayuda al elegir quién la toca)
const PAPEL = {
  melodia: T('La parte principal, la que se canta.', 'The main tune, the one you sing.', 'La part principal, la que es canta.'),
  laminas: T('Dos notas que se alternan y sostienen la melodía.', 'Two alternating notes that support the tune.', 'Dues notes que s’alternen i sostenen la melodia.'),
  acordes: T('Rasgueo de acordes: Sol y Re7.', 'Strummed chords: G and D7.', 'Rasgueig d’acords: Sol i Re7.'),
  percusion: T('El ritmo: claves, pandero, caja, palmas…', 'The rhythm: claves, tambourine, drum, clapping…', 'El ritme: claus, pandero, caixa, picar de mans…'),
  armonia: T('Una segunda voz por debajo de la melodía.', 'A second part below the tune.', 'Una segona veu per sota de la melodia.'),
  acompanamiento: T('Notas largas en la zona media.', 'Long notes in the middle range.', 'Notes llargues a la zona mitjana.'),
}
PAPEL.bajo = T('La nota más grave de cada acorde.', 'The lowest note of each chord.', 'La nota més greu de cada acord.')
// Con qué se puede tocar una voz de melodía (escrita para ese instrumento)
const MELODICOS = ['flautaDulce', 'laminas', 'violin', 'flauta', 'clarinete', 'trompeta', 'saxo', 'trompa', 'viola', 'chelo', 'piano']
const NOMBRE_ACORDES = { ukelele: T('Ukelele', 'Ukulele', 'Ukelele'), guitarra: T('Guitarra', 'Guitar', 'Guitarra'), piano: T('Piano o teclado', 'Piano or keyboard', 'Piano o teclat') }
const instPorDefecto = obraId => Object.fromEntries(Object.entries(OBRAS[obraId].voces).map(([v, voz]) => [v, voz.tipo === 'acordes' ? 'ukelele' : voz.inst]))

export default function RecursoEnsayo() {
  const { lang, localPath, tr } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const [params] = useSearchParams()
  const [obraId, setObraId] = useState(() => (OBRAS[params.get('obra')] ? params.get('obra') : OBRA_POR_DEFECTO))
  const obra = OBRAS[obraId]
  const vocesObra = useMemo(() => Object.keys(OBRAS[obraId].voces), [obraId])
  const n = numCompases(obraId)
  const ncomp = negrasPorCompas(obraId)

  // Preparar el ensayo: qué voces toca la clase y con qué instrumento
  const [preparando, setPreparando] = useState(true)
  const [vocesClase, setVocesClase] = useState(() => Object.keys(OBRAS[obraId].voces))
  const [insts, setInsts] = useState(() => instPorDefecto(obraId))
  const clase = useMemo(() => vocesObra.filter(v => vocesClase.includes(v)), [vocesObra, vocesClase]) // en el orden de la partitura

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
  const [modo, setModo] = useState('guiado') // guiado · libre
  const [paso, setPaso] = useState(0)
  const [hechos, setHechos] = useState({})
  const plan = useMemo(() => planEnsayo(obraId, vocesClase), [obraId, vocesClase])
  const actual = plan[Math.min(paso, plan.length - 1)]

  const motorRef = useRef(null)
  const relojRef = useRef(0)
  const escenaRef = useRef(null)

  // Solo las voces de la clase, cada una escrita para su instrumento
  const xml = useMemo(() => musicXMLPartitura(obraId, clase, l, insts), [obraId, clase, l, insts])
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

  const para = useCallback(() => {
    clearInterval(relojRef.current)
    motorRef.current?.para()
    setTocando(false)
    setPosicion(null)
  }, [])

  const reiniciaPlan = () => { setPaso(0); setHechos({}) }
  const cambiaObra = id => {
    para()
    setObraId(id)
    setApagadas({}); setSolo(null)
    setDesde(1); setHasta(numCompases(id))
    setVocesClase(Object.keys(OBRAS[id].voces)); setInsts(instPorDefecto(id)); reiniciaPlan()
  }
  const alternaVoz = v => {
    const on = vocesClase.includes(v)
    if (on && vocesClase.length === 1) return // siempre al menos una
    setVocesClase(x => (on ? x.filter(y => y !== v) : [...x, v]))
    reiniciaPlan()
  }

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
  function pantallaCompleta() {
    if (document.fullscreenElement) document.exitFullscreen?.()
    else escenaRef.current?.requestFullscreen?.().catch(() => {})
  }

  const nombreVoz = v => tr(obra.voces[v].nombre)
  const nombreInst = (v, id = insts[v]) => (obra.voces[v].tipo === 'acordes' ? tr(NOMBRE_ACORDES[id]) : id === 'piano' ? tr(PIANO.nombre) : INSTRUMENTOS[id] ? tr(INSTRUMENTOS[id].nombre) : '')
  const conInst = v => (obra.voces[v].tipo === 'percusion' ? nombreVoz(v) : `${nombreVoz(v)} (${nombreInst(v).toLowerCase()})`)
  const nombreGrupos = vs => vs.map(nombreVoz).join(' + ')
  const cifras = clase.includes('acordes') ? [...new Set(Object.values(obra.cifrado))] : []
  const opcionesCompas = Array.from({ length: n }, (_, i) => i + 1)
  const pill = on => `px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${on ? 'bg-white/15 border-white/30 text-white' : 'bg-white/5 border-white/10 text-white/45 hover:text-white/80'}`
  const selectCls = 'bg-white/10 border border-white/15 rounded-lg px-2 py-1 text-white text-sm disabled:opacity-40'

  return (
    <div className="relative z-10 min-h-[calc(100vh-4rem)] px-3 sm:px-4 py-6">
      <SEOHead
        title={tr({ es: 'Ensayo con la orquesta: el Himno de la alegría para tocar en clase', en: 'Orchestra rehearsal: Ode to Joy to play in class', ca: 'Assaig amb l’orquestra: l’Himne de l’alegria per tocar a classe' })}
        description={tr({ es: 'Ensayo guiado para tocar en clase: eliges qué voces toca tu clase (melodía, acompañamiento, acordes, percusión) y con qué instrumento, y la partitura sale para cada uno, con los acordes de ukelele, guitarra o piano. Por partes, en conjuntos y todos juntos. Gratis.', en: 'Guided rehearsal to play in class: choose which parts your class plays (melody, accompaniment, chords, percussion) and on what instrument, and the score appears for each, with ukulele, guitar or piano chords. In sections, in ensembles and all together. Free.', ca: 'Assaig guiat per tocar a classe: tries quines veus toca la teva classe (melodia, acompanyament, acords, percussió) i amb quin instrument, i la partitura surt per a cadascun, amb els acords d’ukelele, guitarra o piano. Per parts, en conjunts i tots junts. Gratis.' })}
        path="/recursos/ensayo-orquesta" />
      <div className="max-w-5xl mx-auto">
        <p className="text-white/40 text-xs uppercase tracking-widest">{tr({ es: 'Recurso de Música · para la clase', en: 'Music resource · for the class', ca: 'Recurs de Música · per a la classe' })}</p>
        <h1 className="text-white text-2xl sm:text-3xl font-black mt-1">🏫 {tr({ es: 'Ensayo con la orquesta', en: 'Orchestra rehearsal', ca: 'Assaig amb l’orquestra' })}</h1>
        <p className="text-white/60 text-sm mt-1 max-w-2xl">
          {tr({ es: 'Elige qué voces toca tu clase y con qué instrumentos, y ensayad paso a paso: cada grupo por partes, luego en conjuntos y al final todos, con la orquesta poniendo lo que falta.', en: 'Choose which parts your class plays and on what instruments, and rehearse step by step: each group in sections, then in ensembles and finally all together, with the orchestra filling in the rest.', ca: 'Tria quines veus toca la teva classe i amb quins instruments, i assagieu pas a pas: cada grup per parts, després en conjunts i al final tots, amb l’orquestra posant el que falta.' })}
        </p>

        {/* ── Preparar el ensayo (menú plegable) ── */}
        <section className="mt-4 rounded-2xl bg-white/[0.04] border border-white/10">
          <button type="button" onClick={() => setPreparando(p => !p)} aria-expanded={preparando}
            className="w-full flex items-center justify-between gap-2 px-4 py-3 text-left">
            <span className="min-w-0">
              <span className="block text-white font-bold">⚙️ {tr({ es: 'Preparar el ensayo', en: 'Set up the rehearsal', ca: 'Preparar l’assaig' })}</span>
              {!preparando && <span className="block text-white/55 text-xs truncate">{tr(obra.titulo)} · {tr(obra.version)} · {clase.map(conInst).join(', ')}</span>}
            </span>
            <span className="text-white/60 text-sm shrink-0">{preparando ? '▲' : tr({ es: 'Cambiar ▼', en: 'Change ▼', ca: 'Canviar ▼' })}</span>
          </button>
          {preparando && (
            <div className="px-4 pb-4 space-y-3">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-widest mb-1.5">1. {tr({ es: 'Obra', en: 'Piece', ca: 'Obra' })}</p>
                <div className="flex flex-wrap gap-1.5">
                  {Object.keys(OBRAS).map(id => (
                    <button key={id} type="button" disabled={tocando} onClick={() => cambiaObra(id)} className={pill(obraId === id)}>
                      {id === 'himno-alegria' ? '🎻' : '🏫'} {tr(OBRAS[id].titulo)} · {tr(OBRAS[id].version)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-white/50 text-xs uppercase tracking-widest mb-1.5">2. {tr({ es: '¿Qué voces toca tu clase y con qué?', en: 'Which parts does your class play, and on what?', ca: 'Quines veus toca la teva classe i amb què?' })}</p>
                <ul className="space-y-1.5">
                  {vocesObra.map(v => {
                    const on = vocesClase.includes(v)
                    const voz = obra.voces[v]
                    return (
                      <li key={v} className={`flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border px-3 py-2 ${on ? 'border-emerald-400/40 bg-emerald-500/[0.07]' : 'border-white/10 bg-white/[0.02]'}`}>
                        <button type="button" disabled={tocando} onClick={() => alternaVoz(v)} aria-pressed={on}
                          className={`w-6 h-6 rounded-md border flex items-center justify-center text-sm font-black ${on ? 'bg-emerald-400 border-emerald-300 text-black' : 'border-white/30 text-transparent'}`}>✓</button>
                        <span className="min-w-[9rem]">
                          <span className={`block font-bold ${on ? 'text-white' : 'text-white/45'}`}>{nombreVoz(v)}</span>
                          <span className="block text-white/40 text-xs">{tr(PAPEL[v])}</span>
                        </span>
                        {on && voz.tipo !== 'percusion' && (
                          <label className="ml-auto flex items-center gap-1.5 text-white/60 text-xs">
                            {tr({ es: 'Con', en: 'On', ca: 'Amb' })}
                            <select value={insts[v]} disabled={tocando} onChange={e => setInsts(x => ({ ...x, [v]: e.target.value }))} className={selectCls}>
                              {(voz.tipo === 'acordes' ? INSTRUMENTOS_ACORDES : MELODICOS).map(id => <option key={id} value={id} className="text-black">{nombreInst(v, id)}</option>)}
                            </select>
                          </label>
                        )}
                        {on && voz.tipo === 'percusion' && <span className="ml-auto text-white/40 text-xs">{tr({ es: 'Con lo que tengáis', en: 'With whatever you have', ca: 'Amb el que tingueu' })}</span>}
                      </li>
                    )
                  })}
                </ul>
                <p className="text-white/40 text-xs mt-1.5">{tr({ es: 'La partitura sale solo con las voces marcadas, cada una escrita para su instrumento (transportada y en su clave). Las que no toca la clase las puede poner la orquesta.', en: 'The score shows only the ticked parts, each written for its instrument (transposed and in its clef). The orchestra can play the parts the class doesn’t.', ca: 'La partitura surt només amb les veus marcades, cadascuna escrita per al seu instrument (transportada i en la seva clau). Les que no toca la classe les pot posar l’orquestra.' })}</p>
              </div>
              <button type="button" onClick={() => setPreparando(false)} className="px-5 py-2.5 rounded-xl bg-[#EDAE49] text-black font-black">
                ✓ {tr({ es: 'Listo, a ensayar', en: 'Done, let’s rehearse', ca: 'Fet, a assajar' })}
              </button>
            </div>
          )}
        </section>

        {/* ── Modo ── */}
        <div className="flex gap-1.5 mt-3">
          {[['guiado', tr({ es: '📋 Ensayo guiado', en: '📋 Guided rehearsal', ca: '📋 Assaig guiat' })], ['libre', tr({ es: '🎛️ Libre', en: '🎛️ Free', ca: '🎛️ Lliure' })]].map(([id, txt]) => (
            <button key={id} type="button" onClick={() => { para(); setModo(id); if (id === 'guiado') aplicaPaso(actual) }} className={`px-3 py-1.5 rounded-lg text-sm font-bold ${modo === id ? 'bg-[#EDAE49] text-black' : 'bg-white/10 text-white/70'}`}>{txt}</button>
          ))}
        </div>

        <div ref={escenaRef} className={`mt-3 ${enPantalla ? 'bg-[#0b1020] p-4 overflow-auto' : ''}`}>
          {modo === 'guiado' && (
            <div className="mb-3">
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
                  🔊 {actual.suenan.length ? (actual.suenan.length === vocesObra.length ? tr({ es: 'Suenan todas las voces', en: 'Every part plays', ca: 'Sonen totes les veus' }) : `${tr({ es: 'Suena', en: 'Speaker plays', ca: 'Sona' })}: ${nombreGrupos(actual.suenan)}`) : tr({ es: 'Solo el metrónomo', en: 'Only the metronome', ca: 'Només el metrònom' })}
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

          {modo === 'libre' && (
            <div className="mb-3 rounded-2xl bg-white/[0.06] border border-white/15 px-4 py-3">
              <div className="flex flex-wrap items-center gap-2">
                {tocando
                  ? <button type="button" onClick={para} className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-black">⏹ {tr({ es: 'Parar', en: 'Stop', ca: 'Aturar' })}</button>
                  : <button type="button" onClick={() => toca()} className="px-5 py-2.5 rounded-xl bg-[#EDAE49] text-black font-black">▶ {tr({ es: 'Tocar', en: 'Play', ca: 'Tocar' })}</button>}
                <span className="text-white/60 text-sm">{tempo} % · {tr({ es: `compases ${Math.min(desde, hasta)}-${Math.max(desde, hasta)}`, en: `bars ${Math.min(desde, hasta)}-${Math.max(desde, hasta)}`, ca: `compassos ${Math.min(desde, hasta)}-${Math.max(desde, hasta)}` })}{bucle ? ` · ${tr({ es: 'en bucle', en: 'looping', ca: 'en bucle' })}` : ''}</span>
                <button type="button" onClick={pantallaCompleta} className="ml-auto px-3 py-2.5 rounded-xl bg-white/10 text-white text-xs font-bold">⛶ {enPantalla ? tr({ es: 'Salir', en: 'Exit', ca: 'Sortir' }) : tr({ es: 'Proyector', en: 'Projector', ca: 'Projector' })}</button>
              </div>
              <details className="mt-2">
                <summary className="cursor-pointer text-white/70 text-sm font-bold">🎛️ {tr({ es: 'Qué suena, tempo y compases', en: 'What plays, tempo and bars', ca: 'Què sona, tempo i compassos' })}</summary>
                <div className="mt-2 space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {vocesObra.map(v => (
                      <span key={v} className={`inline-flex items-center rounded-lg border ${suena(v) ? 'border-emerald-400/50 bg-emerald-500/10' : 'border-white/10 bg-white/5'}`}>
                        <button type="button" onClick={() => { setSolo(null); setApagadas(x => ({ ...x, [v]: !x[v] })) }}
                          className={`px-2.5 py-1.5 text-xs font-bold ${suena(v) ? 'text-white' : 'text-white/40 line-through'}`} aria-pressed={suena(v)}>
                          {suena(v) ? '🔊' : '🔇'} {nombreVoz(v)}
                        </button>
                        <button type="button" onClick={() => setSolo(s => (s === v ? null : v))}
                          className={`px-2 py-1.5 text-[11px] font-black border-l border-white/10 ${solo === v ? 'text-amber-300' : 'text-white/40'}`}>SOLO</button>
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/70 text-sm">
                    <label className="flex items-center gap-2">
                      <span>{tr({ es: 'Tempo', en: 'Tempo', ca: 'Tempo' })} {tempo} %</span>
                      <input type="range" min="40" max="120" step="10" value={tempo} disabled={tocando} onChange={e => setTempo(Number(e.target.value))} className="w-28" />
                    </label>
                    <label className="flex items-center gap-1.5">
                      {tr({ es: 'Compases', en: 'Bars', ca: 'Compassos' })}
                      <select value={desde} disabled={tocando} onChange={e => setDesde(Number(e.target.value))} className={selectCls}>
                        {opcionesCompas.map(c => <option key={c} value={c} className="text-black">{c}</option>)}
                      </select>
                      –
                      <select value={hasta} disabled={tocando} onChange={e => setHasta(Number(e.target.value))} className={selectCls}>
                        {opcionesCompas.map(c => <option key={c} value={c} className="text-black">{c}</option>)}
                      </select>
                    </label>
                    <label className="flex items-center gap-1.5"><input type="checkbox" checked={bucle} disabled={tocando} onChange={e => setBucle(e.target.checked)} /> {tr({ es: 'En bucle', en: 'Loop', ca: 'En bucle' })}</label>
                    <label className="flex items-center gap-1.5"><input type="checkbox" checked={metronomo} disabled={tocando} onChange={e => setMetronomo(e.target.checked)} /> {tr({ es: 'Metrónomo', en: 'Metronome', ca: 'Metrònom' })}</label>
                  </div>
                  <p className="text-white/40 text-xs">{tr({ es: 'También puedes tocar un compás de la partitura para empezar ahí y otro para marcar el final.', en: 'You can also tap a bar on the score to start there, and another to mark the end.', ca: 'També pots tocar un compàs de la partitura per començar-hi i un altre per marcar el final.' })}</p>
                </div>
              </details>
            </div>
          )}

          <Partitura xml={xml} negrasCompas={ncomp} posicion={posicion} nombres zoom={enPantalla ? 1.15 : null}
            rango={desde !== 1 || hasta !== n ? [Math.min(desde, hasta), Math.max(desde, hasta)] : null}
            onCompas={c => {
              if (tocando || modo !== 'libre') return
              if (!marcando) { setDesde(c); setHasta(n); setMarcando(true) } else { setHasta(Math.max(c, desde)); setMarcando(false) }
            }} />

          {cifras.length > 0 && (
            <div className="mt-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3">
              <p className="text-white font-bold text-sm mb-2">{insts.acordes === 'piano' ? '🎹' : '🎸'} {tr({ es: `Acordes con ${nombreInst('acordes').toLowerCase()}`, en: `Chords on ${nombreInst('acordes').toLowerCase()}`, ca: `Acords amb ${nombreInst('acordes').toLowerCase()}` })}</p>
              <div className="flex flex-wrap gap-6">{cifras.map(c => <DiagramaAcorde key={c} instrumento={insts.acordes} cifra={c} l={l} />)}</div>
              <p className="text-white/40 text-xs mt-2">{insts.acordes === 'ukelele'
                ? tr({ es: 'Cuerdas Sol, Do, Mi, La de izquierda a derecha; ○ al aire. Un rasgueo por cada golpe de la línea.', en: 'Strings G, C, E, A from left to right; ○ open. One strum for each beat on the line.', ca: 'Cordes Sol, Do, Mi, La d’esquerra a dreta; ○ a l’aire. Un rasgueig per cada cop de la línia.' })
                : insts.acordes === 'guitarra'
                  ? tr({ es: 'Cuerdas Mi, La, Re, Sol, Si, Mi de izquierda a derecha (la más grave primero); ○ al aire, × no se toca. Un rasgueo por cada golpe.', en: 'Strings E, A, D, G, B, E from left to right (lowest first); ○ open, × not played. One strum per beat.', ca: 'Cordes Mi, La, Re, Sol, Si, Mi d’esquerra a dreta (la més greu primer); ○ a l’aire, × no es toca. Un rasgueig per cada cop.' })
                  : tr({ es: 'Las teclas naranjas, a la vez, con la mano derecha; la izquierda puede tocar la primera nota más grave. Un acorde por cada golpe.', en: 'The orange keys together with your right hand; your left hand can play the first note lower down. One chord per beat.', ca: 'Les tecles taronja, alhora, amb la mà dreta; l’esquerra pot tocar la primera nota més greu. Un acord per cada cop.' })}</p>
            </div>
          )}
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white/70">
            <p className="text-white font-bold mb-1">{tr({ es: 'Cómo usarlo en clase', en: 'How to use it in class', ca: 'Com fer-lo servir a classe' })}</p>
            <p>{tr({ es: 'Prepara el ensayo con las voces que toca tu clase y el instrumento de cada grupo. Después sigue los pasos: escuchar, cada grupo por partes y despacio, los conjuntos y todos juntos. La versión escuela va en Sol: la flauta dulce solo necesita Si, La, Sol, Do y Re, y los acordes son dos.', en: 'Set up the rehearsal with the parts your class plays and each group’s instrument. Then follow the steps: listen, each group in sections and slowly, the ensembles and everyone together. The school version is in G: the recorder only needs B, A, G, C and D, and there are just two chords.', ca: 'Prepara l’assaig amb les veus que toca la teva classe i l’instrument de cada grup. Després segueix els passos: escoltar, cada grup per parts i a poc a poc, els conjunts i tots junts. La versió escola va en Sol: la flauta dolça només necessita Si, La, Sol, Do i Re, i els acords són dos.' })}</p>
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
