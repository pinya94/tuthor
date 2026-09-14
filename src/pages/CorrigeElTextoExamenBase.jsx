import { useState, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import {
  nivelesDe, nivelIdsDe, TEXTOS_POR_EXAMEN, generarPartida, corregirRonda,
  notaExamen, preguntasSchema, categoriaDe,
} from '../lib/corrigeTexto'
import { TextoMarcable, ResumenRonda, RepasoFallos } from '../components/CorrigeTextoPiezas'
import SEOHead from '../components/SEOHead'
import QuizSchema from '../components/QuizSchema'
import SupportBlock from '../components/SupportBlock'
import CoinsAnimation from '../components/CoinsAnimation'

// Examen de Corrige el Texto: la misma mecánica que el juego —marcar las
// palabras mal escritas sin que nadie diga dónde están— pero sin reloj y con
// nota sobre 10. Cambia qué se mide: el juego premia leer bien Y deprisa; el
// examen, solo leer bien.
//
// Por qué no usa MechanicExam, como el resto de exámenes de juego: aquel
// cuenta diez rondas de acierto o fallo, y un texto no se acierta o se falla.
// Tiene cinco faltas, se pueden encontrar tres, y marcar una palabra buena
// tiene que restar. La nota sale de notaExamen() (lib/corrigeTexto.js).
//
// Un examen por idioma (EXAMEN_POR_IDIOMA): el castellano cuelga de Lengua y
// el inglés de Inglés, cada uno con su id, porque las tareas del profesor y el
// perfil van por id de examen. Esta base es la misma para los dos.

// Las mismas que MechanicExam da por un diez, para que un examen no valga más
// que otro según la mecánica.
const MONEDAS_MAX = 200
const JUEGO = '/juegos/corrige-el-texto'
// Date.now() se llama solo en manejadores de clic, pero el compilador de React
// no distingue un manejador del render cuando la función se referencia desde el
// JSX y lo marca como impuro. Envuelto aquí, el aviso desaparece sin mover la
// llamada de sitio, que es donde tiene que estar.
const ahora = () => Date.now()

const TX = {
  reglas: [
    ['📋', { es: `${TEXTOS_POR_EXAMEN} textos, sin reloj`, en: `${TEXTOS_POR_EXAMEN} texts, no timer`, ca: `${TEXTOS_POR_EXAMEN} textos, sense rellotge` },
      { es: 'Marca las palabras mal escritas. Te decimos cuántas hay, no dónde.', en: 'Mark the misspelled words. You are told how many, not where.', ca: "Marca les paraules mal escrites. Et diem quantes n'hi ha, no on són." }],
    ['🎯', { es: 'Nota sobre 10', en: 'Mark out of 10', ca: 'Nota sobre 10' },
      { es: 'Cuentan las faltas que encuentres. Cada palabra bien escrita que marques resta una.', en: 'Every mistake you find counts. Each correct word you mark takes one away.', ca: 'Compten les faltes que trobis. Cada paraula ben escrita que marquis en resta una.' }],
    ['💡', { es: 'Corrección tras cada texto', en: 'Review after each text', ca: 'Correcció després de cada text' },
      { es: 'Verás cada falta con su regla antes de pasar al siguiente.', en: 'You will see each mistake with its rule before moving on.', ca: 'Veuràs cada falta amb la seva regla abans de passar al següent.' }],
  ],
  nivel: { es: 'Elige tu nivel', en: 'Choose your level', ca: 'Tria el teu nivell' },
  volver: { es: '← Volver al juego', en: '← Back to the game', ca: '← Tornar al joc' },
  texto: { es: 'Texto', en: 'Text', ca: 'Text' },
  de: { es: 'de', en: 'of', ca: 'de' },
  faltas: { es: 'faltas que buscar', en: 'mistakes to find', ca: 'faltes a buscar' },
  marcadas: { es: 'marcadas', en: 'marked', ca: 'marcades' },
  comprobar: { es: 'Comprobar', en: 'Check', ca: 'Comprovar' },
  notaTexto: { es: 'Nota de este texto', en: 'Mark for this text', ca: "Nota d'aquest text" },
  siguiente: { es: 'Siguiente texto →', en: 'Next text →', ca: 'Text següent →' },
  verNota: { es: 'Ver la nota →', en: 'See your mark →', ca: 'Veure la nota →' },
  hecho: { es: 'Examen completado', en: 'Exam complete', ca: 'Examen completat' },
  sobre10: { es: 'sobre 10', en: 'out of 10', ca: 'sobre 10' },
  encontradas: { es: 'Encontradas', en: 'Found', ca: 'Trobades' },
  escapadas: { es: 'Se escaparon', en: 'Missed', ca: "S'han escapat" },
  deMas: { es: 'Marcadas de más', en: 'Marked by mistake', ca: 'Marcades de més' },
  repetir: { es: '▶ Repetir con otros textos', en: '▶ Retry with other texts', ca: '▶ Repetir amb altres textos' },
  jugar: { es: 'Modo arcade 🔍', en: 'Arcade mode 🔍', ca: 'Mode arcade 🔍' },
}

const sumar = resultados => resultados.reduce((a, r) => ({
  encontrados: a.encontrados + r.encontrados,
  sinMarcar: a.sinMarcar + r.sinMarcar,
  deMas: a.deMas + r.deMas,
  total: a.total + r.total,
}), { encontrados: 0, sinMarcar: 0, deMas: 0, total: 0 })

export default function CorrigeElTextoExamenBase({ idioma, examId, badge, title, sub, metaTitle, metaDesc, subjectSchema }) {
  const { lang, tr, localPath } = useLang()
  const { user } = useAuth()

  const [screen, setScreen] = useState('intro') // intro | leyendo | revision | end
  const [nivel, setNivel] = useState('medio')
  const [rondas, setRondas] = useState([])
  const [idx, setIdx] = useState(0)
  const [marcadas, setMarcadas] = useState(() => new Set())
  const [resultados, setResultados] = useState([])
  const inicioRef = useRef(0)

  const metaPath = `/examen/${examId}`
  // El tema del juego en el mismo idioma: "volver al juego" tiene que abrir el
  // texto en la lengua del examen, no en la de la interfaz.
  const alJuego = { pathname: localPath(JUEGO), state: { tema: categoriaDe(idioma) } }
  const niveles = nivelesDe(idioma)
  const formato = new Intl.NumberFormat(lang, { maximumFractionDigits: 1 })

  // Preguntas de ejemplo para el JSON-LD, sacadas de dos textos sorteados.
  // Cambian en cada build, como en MechanicExam (ver su comentario): son
  // muestras del ejercicio, no un temario cerrado.
  const schema = useMemo(() => {
    const out = generarPartida('medio', [], idioma, 2).flatMap(r => preguntasSchema(r, lang)).slice(0, 12)
    return out.length ? out : undefined
  }, [idioma, lang])

  const seo = (
    <>
      <SEOHead title={tr(metaTitle)} description={tr(metaDesc)} path={metaPath} />
      <QuizSchema name={tr(metaTitle)} description={tr(metaDesc)} path={metaPath} lang={lang}
        subject={subjectSchema} level="secondary" questions={schema} />
    </>
  )

  function empezar(niv) {
    // Al repetir se evitan los textos del intento anterior: el mismo texto con
    // las faltas cambiadas de sitio ya no es un texto nuevo.
    setRondas(prev => generarPartida(niv, prev.map(r => r.id), idioma, TEXTOS_POR_EXAMEN))
    setNivel(niv)
    setIdx(0)
    setMarcadas(new Set())
    setResultados([])
    inicioRef.current = ahora()
    setScreen('leyendo')
  }

  function alternar(i) {
    if (screen !== 'leyendo') return
    setMarcadas(prev => {
      const s = new Set(prev)
      if (s.has(i)) s.delete(i); else s.add(i)
      return s
    })
  }

  function comprobar() {
    const r = corregirRonda(rondas[idx], marcadas)
    setResultados(prev => [...prev, { id: rondas[idx].id, ...r }])
    setScreen('revision')
  }

  function siguiente() {
    if (idx + 1 < rondas.length) {
      setIdx(i => i + 1)
      setMarcadas(new Set())
      setScreen('leyendo')
      return
    }
    // `resultados` ya trae el último texto: se añadió al comprobarlo.
    const nota = notaExamen(sumar(resultados))
    setScreen('end')
    if (user) {
      saveActivity(user.uid, {
        type: 'examen', game: examId, category: examId,
        score: Math.round(nota * 10), passed: nota >= 5,
        coinsEarned: Math.round((nota / 10) * MONEDAS_MAX),
        timeSpent: Math.round((ahora() - inicioRef.current) / 1000),
        userName: user.displayName, userPhoto: user.photoURL,
      }).catch(() => {})
    }
  }

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {seo}
        <div className="max-w-md w-full">
          <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{tr(badge)}</p>
          <h1 className="text-3xl font-black text-white text-center mb-1">{tr(title)}</h1>
          <p className="text-white/40 text-sm text-center mb-6">{tr(sub)}</p>
          <SupportBlock variant="top" className="mb-5" />
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 space-y-5">
            {TX.reglas.map(([emoji, t, d]) => (
              <div key={emoji} className="flex items-start gap-4">
                <span className="text-2xl mt-0.5">{emoji}</span>
                <div>
                  <p className="font-bold text-white text-sm">{tr(t)}</p>
                  <p className="text-white/50 text-xs mt-0.5">{tr(d)}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-3">{tr(TX.nivel)}</p>
          <div className="flex flex-col gap-3 mb-4">
            {nivelIdsDe(idioma).map(id => (
              <button key={id} onClick={() => empezar(id)}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#EDAE49]/50 rounded-2xl px-5 py-4 text-left transition-all flex items-center justify-between group">
                <div>
                  <p className="text-white font-bold">{niveles[id].emoji} {tr(niveles[id].label)}</p>
                  <p className="text-white/40 text-xs mt-0.5">{tr(niveles[id].hint)}</p>
                </div>
                <span className="text-white/30 group-hover:text-[#EDAE49] font-black text-lg transition-colors">→</span>
              </button>
            ))}
          </div>
          <Link to={alJuego.pathname} state={alJuego.state} className="block text-center text-white/40 hover:text-white/70 text-sm transition-colors">
            {tr(TX.volver)}
          </Link>
        </div>
      </div>
    )
  }

  if (screen === 'end') {
    const total = sumar(resultados)
    const nota = notaExamen(total)
    const emoji = nota === 10 ? '🏆' : nota >= 8 ? '⭐' : nota >= 6 ? '✅' : nota >= 4 ? '📚' : '💪'
    // El consejo depende de CÓMO se ha fallado, que es lo único útil que se le
    // puede decir a alguien con un seis.
    const msg = nota === 10
      ? { es: '¡Perfecto! No se te ha escapado ni una.', en: 'Perfect! Not a single one got past you.', ca: "Perfecte! No se t'ha escapat ni una." }
      : total.deMas > total.sinMarcar
        ? { es: 'Marcas de más: antes de tocar una palabra, asegúrate de que está mal.', en: 'Too many marks: before tapping a word, make sure it is wrong.', ca: "Marques de més: abans de tocar una paraula, assegura't que està malament." }
        : { es: 'Se te escapan faltas: lee más despacio, palabra por palabra.', en: 'Mistakes are slipping past: read more slowly, word by word.', ca: "Se t'escapen faltes: llegeix més a poc a poc, paraula per paraula." }
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {seo}
        <div className="max-w-md w-full">
          <p className="text-6xl text-center mb-3">{emoji}</p>
          <p className="text-white/40 text-sm text-center mb-1">{tr(TX.hecho)}</p>
          <p className="text-5xl font-black text-white text-center mb-1">{formato.format(nota)}</p>
          <p className="text-white/60 text-lg text-center mb-2">{tr(TX.sobre10)}</p>
          <p className="text-[#EDAE49] font-bold text-center mb-6">{tr(msg)}</p>

          <div className="grid grid-cols-3 gap-2 text-center mb-4">
            {[[TX.encontradas, total.encontrados, 'text-green-400'], [TX.escapadas, total.sinMarcar, 'text-red-400'], [TX.deMas, total.deMas, 'text-orange-400']].map(([k, v, color]) => (
              <div key={k.es} className="rounded-xl bg-white/5 border border-white/10 py-2">
                <p className={`${color} text-xl font-black`}>{v}</p>
                <p className="text-white/50 text-[11px]">{tr(k)}</p>
              </div>
            ))}
          </div>

          {/* La nota de cada texto por separado: una media esconde si el fallo
              fue un texto concreto o todos por igual. */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3 mb-6 space-y-1.5">
            {resultados.map((r, i) => {
              const n = notaExamen(r)
              return (
                <div key={r.id} className="flex items-center justify-between text-sm px-1">
                  <span className="text-white/70 truncate">{rondas[i]?.emoji} {tr(rondas[i]?.titulo)}</span>
                  <span className={`font-black tabular-nums ${n >= 5 ? 'text-green-400' : 'text-red-400'}`}>{formato.format(n)}</span>
                </div>
              )
            })}
          </div>

          <div className="flex flex-col gap-3">
            <button onClick={() => empezar(nivel)} className="px-6 py-3 rounded-full bg-[#EDAE49] text-black font-bold hover:bg-[#f5c16c] transition-colors">
              {tr(TX.repetir)}
            </button>
            <Link to={alJuego.pathname} state={alJuego.state} className="px-6 py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-colors text-center">
              {tr(TX.jugar)}
            </Link>
          </div>
        </div>
        {nota > 0 && <CoinsAnimation coins={Math.round((nota / 10) * MONEDAS_MAX)} />}
      </div>
    )
  }

  const ronda = rondas[idx]
  if (!ronda) return null
  const revisando = screen === 'revision'
  const res = revisando ? resultados[resultados.length - 1] : null

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-3 sm:px-4 py-4">
      {seo}
      <div className="w-full max-w-[620px] flex items-center justify-between mb-3 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">
            📝 {tr(TX.texto)} {idx + 1} {tr(TX.de)} {rondas.length}
          </p>
          <p className="text-white font-bold text-lg">{ronda.emoji} {tr(ronda.titulo)}</p>
        </div>
        {/* Sin reloj: en su lugar, cómo ha ido cada texto ya corregido. */}
        <div className="flex gap-1">
          {rondas.map((r, i) => {
            const hecho = resultados[i]
            const bg = !hecho ? (i === idx ? 'bg-white/60' : 'bg-white/15') : notaExamen(hecho) >= 5 ? 'bg-green-500' : 'bg-red-500'
            return <div key={r.id} className={`w-3 h-3 rounded-full ${bg} transition-colors`} />
          })}
        </div>
      </div>

      <div className="w-full max-w-[620px] flex items-center justify-between mb-2 px-1">
        <p className="text-white/50 text-xs">
          <span className="text-white font-black">{ronda.nErrores}</span> {tr(TX.faltas)}
        </p>
        <p className="text-white/50 text-xs">
          <span className="text-white font-black">{marcadas.size}</span> {tr(TX.marcadas)}
        </p>
      </div>

      <TextoMarcable ronda={ronda} marcadas={marcadas} revisando={revisando} onAlternar={alternar} />

      {!revisando && (
        <button onClick={comprobar}
          className="w-full max-w-[620px] py-3.5 rounded-2xl bg-[#EDAE49] text-black font-black text-lg hover:bg-amber-400 transition-colors">
          {tr(TX.comprobar)}
        </button>
      )}

      {revisando && (
        <div className="w-full max-w-[620px] space-y-3">
          <ResumenRonda res={res} />
          <p className="text-center text-sm font-bold text-white/70">
            {tr(TX.notaTexto)}: <span className={notaExamen(res) >= 5 ? 'text-green-400' : 'text-red-400'}>{formato.format(notaExamen(res))}</span>
          </p>
          <RepasoFallos ronda={ronda} marcadas={marcadas} />
          <button onClick={siguiente}
            className="w-full py-3.5 rounded-2xl bg-[#EDAE49] text-black font-black text-lg hover:bg-amber-400 transition-colors">
            {idx + 1 < rondas.length ? tr(TX.siguiente) : tr(TX.verNota)}
          </button>
        </div>
      )}
    </div>
  )
}
