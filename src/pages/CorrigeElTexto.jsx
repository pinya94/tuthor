import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import {
  FAMILIAS, NIVELES, NIVEL_IDS, TEXTOS_POR_PARTIDA, PENALIZACION,
  generarPartida, tiempoFinal, puntosDe, formatoTiempo,
} from '../lib/corrigeTexto'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import ComoSeJuega from '../components/ComoSeJuega'

// Corrige el Texto: tres textos, todos los fallos marcados y el reloj como
// única nota. Lo que hace que se pueda puntuar solo por tiempo es que fallar
// también cuesta segundos — ver la explicación larga en lib/corrigeTexto.js.

const C = {
  // El badge dice el IDIOMA de los textos, no solo la materia: en inglés y
  // en catalán el jugador tiene que saber antes de empezar que lo que va a
  // corregir está en castellano (los textos no cambian con la interfaz).
  badge:   { es: 'Lengua · Ortografía', en: 'Spanish · Spelling', ca: 'Llengua castellana · Ortografia' },
  title:   { es: '🔍 Corrige el Texto', en: '🔍 Spot the Mistakes', ca: '🔍 Corregeix el Text' },
  sub:     { es: 'Tres textos, todos los fallos, el reloj corriendo', en: 'Three texts, every mistake, clock running', ca: 'Tres textos, tots els errors, el rellotge corrent' },
  queEs:   { es: '¿De qué va?', en: 'What is it about?', ca: 'De què va?' },
  q1:      { es: 'Sale un texto con algunas palabras mal escritas. Tócalas todas y dale a comprobar.', en: 'A text appears with some misspelled words. Tap them all and check.', ca: 'Surt un text amb algunes paraules mal escrites. Toca-les totes i comprova.' },
  q2:      { es: 'Te decimos cuántos fallos hay, pero no dónde están ni de qué tipo son. Eso es corregir.', en: 'We tell you how many mistakes there are, but not where or what kind. That is proofreading.', ca: 'Et diem quants errors hi ha, però no on són ni de quin tipus. Això és corregir.' },
  q3:      { es: 'Solo cuenta el tiempo. Cada fallo que se te escape suma 10 segundos, y cada palabra buena que marques, otros 10. Así que ir rápido sin mirar sale caro.', en: 'Only time counts. Every mistake you miss adds 10 seconds, and every correct word you mark adds 10 more. Rushing without looking is expensive.', ca: 'Només compta el temps. Cada error que se t\'escapi suma 10 segons, i cada paraula bona que marquis, 10 més. Anar de pressa sense mirar surt car.' },
  q4:      { es: 'Los fallos cambian de sitio en cada partida: el mismo texto nunca se corrige dos veces igual.', en: 'The mistakes move every game: the same text is never proofread the same way twice.', ca: 'Els errors canvien de lloc a cada partida: el mateix text no es corregeix mai dues vegades igual.' },
  nivel:   { es: 'Elige nivel', en: 'Choose a level', ca: 'Tria nivell' },
  texto:   { es: 'Texto', en: 'Text', ca: 'Text' },
  de:      { es: 'de', en: 'of', ca: 'de' },
  fallos:  { es: 'fallos que buscar', en: 'mistakes to find', ca: 'errors a buscar' },
  marcadas:{ es: 'marcadas', en: 'marked', ca: 'marcades' },
  comprobar:{ es: 'Comprobar', en: 'Check', ca: 'Comprovar' },
  siguiente:{ es: 'Siguiente texto →', en: 'Next text →', ca: 'Text següent →' },
  verResultado:{ es: 'Ver resultado', en: 'See result', ca: 'Veure resultat' },
  encontrados:{ es: 'Encontrados', en: 'Found', ca: 'Trobats' },
  escapados:{ es: 'Se te escaparon', en: 'Missed', ca: "Se t'han escapat" },
  deMas:   { es: 'Marcadas de más', en: 'Marked by mistake', ca: 'Marcades de més' },
  penal:   { es: 'de penalización', en: 'penalty', ca: 'de penalització' },
  sinPenal:{ es: 'Sin penalización: texto perfecto', en: 'No penalty: perfect text', ca: 'Sense penalització: text perfecte' },
  end:     { es: 'Tiempo final', en: 'Final time', ca: 'Temps final' },
  tReal:   { es: 'Reloj', en: 'Clock', ca: 'Rellotge' },
  tFinal:  { es: 'Con penalización', en: 'With penalty', ca: 'Amb penalització' },
  aciertos:{ es: 'Fallos cazados', en: 'Mistakes caught', ca: 'Errors caçats' },
  back:    { es: '← Volver', en: '← Back', ca: '← Tornar' },
  eraAsi:  { es: 'era', en: 'should be', ca: 'era' },
  // 'esta estaba bien' no: en un juego de tildes, un demostrativo sin acento
  // al lado de la palabra corregida invita a discutir justo lo que no toca.
  estaBien:{ es: 'está bien escrita', en: 'this one is fine', ca: 'està ben escrita' },
}
const T = (k, l) => C[k]?.[l] ?? C[k]?.es ?? k
const tr3 = (o, l) => o?.[l] ?? o?.es ?? ''

function IntroScreen({ onStart, l }) {
  const [nivel, setNivel] = useState('medio')
  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{T('badge', l)}</p>
        <h1 className="text-3xl font-black text-white text-center mb-1">{T('title', l)}</h1>
        <p className="text-white/40 text-sm text-center mb-6">{T('sub', l)}</p>

        <ComoSeJuega label={T('queEs', l)}>
          <p>{T('q1', l)}</p>
          <p>{T('q2', l)}</p>
          <p>{T('q3', l)}</p>
          <p>{T('q4', l)}</p>
        </ComoSeJuega>

        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-2 px-1">{T('nivel', l)}</p>
        <div className="space-y-2 mb-4">
          {NIVEL_IDS.map(id => (
            <button key={id} onClick={() => setNivel(id)}
              className={`w-full text-left px-4 py-3 rounded-2xl border transition-colors ${
                nivel === id ? 'border-[#EDAE49] bg-[#EDAE49]/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
              <p className="text-white font-black text-sm">{NIVELES[id].emoji} {tr3(NIVELES[id].label, l)}</p>
              <p className="text-white/50 text-xs mt-0.5">{tr3(NIVELES[id].hint, l)}</p>
            </button>
          ))}
        </div>

        <button onClick={() => onStart(nivel)}
          className="w-full py-3.5 rounded-2xl bg-[#EDAE49] text-black font-black text-lg hover:bg-amber-400 transition-colors">
          ▶ {tr3({ es: 'Empezar', en: 'Start', ca: 'Començar' }, l)}
        </button>
      </div>
    </div>
  )
}

export default function CorrigeElTexto() {
  const { lang, localPath } = useLang()
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const backPath = location.state?.backPath

  const [screen, setScreen] = useState('intro')
  const [nivel, setNivel] = useState('medio')
  const [rondas, setRondas] = useState([])
  const [idx, setIdx] = useState(0)
  // Índices de token marcados en el texto actual. Set nuevo en cada cambio
  // para que React vea el cambio de referencia.
  const [marcadas, setMarcadas] = useState(() => new Set())
  const [segundos, setSegundos] = useState(0)
  const [resultados, setResultados] = useState([])

  const timerRef = useRef(null)
  const vistosRef = useRef([])

  const empezar = useCallback(niv => {
    const p = generarPartida(niv, vistosRef.current)
    vistosRef.current = p.map(r => r.id)
    setNivel(niv)
    setRondas(p)
    setIdx(0)
    setMarcadas(new Set())
    setSegundos(0)
    setResultados([])
    setScreen('jugando')
  }, [])

  // El reloj corre SOLO mientras se marca. Durante la corrección está parado:
  // leer por qué fallaste no debería costar puntos, o nadie la leería.
  useEffect(() => {
    if (screen !== 'jugando') return
    timerRef.current = setInterval(() => setSegundos(s => s + 1), 1000)
    return () => clearInterval(timerRef.current)
  }, [screen])

  const ronda = rondas[idx] ?? null

  function alternar(i) {
    if (screen !== 'jugando') return
    setMarcadas(prev => {
      const s = new Set(prev)
      if (s.has(i)) s.delete(i); else s.add(i)
      return s
    })
  }

  function comprobar() {
    const errores = ronda.tokens.map((t, i) => (t.error ? i : -1)).filter(i => i >= 0)
    const encontrados = errores.filter(i => marcadas.has(i))
    const deMas = [...marcadas].filter(i => !ronda.tokens[i].error)
    setResultados(r => [...r, {
      id: ronda.id,
      encontrados: encontrados.length,
      sinMarcar: errores.length - encontrados.length,
      deMas: deMas.length,
    }])
    setScreen('revision')
  }

  function siguiente() {
    if (idx + 1 < rondas.length) {
      setIdx(i => i + 1)
      setMarcadas(new Set())
      setScreen('jugando')
      return
    }
    terminar()
  }

  function terminar() {
    clearInterval(timerRef.current)
    setScreen('end')
    const total = resultados.reduce((a, r) => ({
      encontrados: a.encontrados + r.encontrados,
      sinMarcar: a.sinMarcar + r.sinMarcar,
      deMas: a.deMas + r.deMas,
    }), { encontrados: 0, sinMarcar: 0, deMas: 0 })
    const final = tiempoFinal({ segundos, ...total })
    const pts = puntosDe(final)
    if (user) {
      saveActivity(user.uid, {
        type: 'juego', game: 'corrige-el-texto', category: 'correccion',
        score: pts, timeSpent: segundos,
        coinsEarned: computeCoins('corrige-el-texto', { score: pts }),
        userName: user.displayName, userPhoto: user.photoURL,
      }).catch(() => {})
    }
  }

  useEffect(() => () => clearInterval(timerRef.current), [])

  const seo = {
    es: { title: 'Corrige el Texto — Juego de ortografía: encuentra las faltas', desc: 'Tres textos con faltas escondidas: tildes, b/v, g/j, h muda, ll/y y homófonos como tuvo y tubo. Marca todas las palabras mal escritas contrarreloj. Los fallos cambian en cada partida. Juego de lengua gratis.', path: '/juegos/corrige-el-texto' },
    en: { title: 'Spot the Mistakes — Spanish spelling game', desc: 'Three short texts with hidden spelling mistakes: accents, b/v, g/j, silent h, ll/y and homophones. Mark every misspelled word against the clock. The mistakes move every game. Free Spanish game.', path: '/en/juegos/corrige-el-texto' },
    ca: { title: 'Corregeix el Text — Joc d\'ortografia castellana', desc: 'Tres textos amb faltes amagades: accents, b/v, g/j, h muda, ll/y i homòfons. Marca totes les paraules mal escrites contrarellotge. Els errors canvien a cada partida. Joc de llengua gratis.', path: '/ca/juegos/corrige-el-texto' },
  }[l]

  if (screen === 'intro') {
    return (<><SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} /><IntroScreen onStart={empezar} l={l} /></>)
  }

  if (screen === 'end') {
    const total = resultados.reduce((a, r) => ({
      encontrados: a.encontrados + r.encontrados,
      sinMarcar: a.sinMarcar + r.sinMarcar,
      deMas: a.deMas + r.deMas,
    }), { encontrados: 0, sinMarcar: 0, deMas: 0 })
    const final = tiempoFinal({ segundos, ...total })
    const pts = puntosDe(final)
    const limpio = total.sinMarcar === 0 && total.deMas === 0
    const msg = {
      es: limpio ? '¡Ni una falta se te escapó! 🔍' : total.sinMarcar <= 2 ? 'Muy buena vista' : 'Vuelve a leer más despacio',
      en: limpio ? 'Not a single one got past you! 🔍' : total.sinMarcar <= 2 ? 'Sharp eye' : 'Try reading more slowly',
      ca: limpio ? 'No se t\'ha escapat cap falta! 🔍' : total.sinMarcar <= 2 ? 'Molt bona vista' : 'Torna a llegir més a poc a poc',
    }[l]
    const shareText = l === 'en'
      ? `I proofread three texts in ${formatoTiempo(final)} in Spot the Mistakes 🔍 — can you beat me? https://tuthor.es/juegos/corrige-el-texto`
      : l === 'ca'
        ? `He corregit tres textos en ${formatoTiempo(final)} a Corregeix el Text 🔍 — pots superar-me? https://tuthor.es/juegos/corrige-el-texto`
        : `He corregido tres textos en ${formatoTiempo(final)} en Corrige el Texto 🔍 — ¿puedes superarme? https://tuthor.es/juegos/corrige-el-texto`
    const secondary = backPath ? [{ label: T('back', l), onClick: () => navigate(localPath(backPath)) }] : []
    return (
      <GameEndScreen game="corrige-el-texto" emoji="🔍" title={`${T('end', l)} · ${formatoTiempo(final)}`}
        score={pts} message={msg}
        stats={[
          { label: T('tReal', l), value: formatoTiempo(segundos), emoji: '⏱️' },
          { label: T('aciertos', l), value: total.encontrados, emoji: '✅' },
          { label: T('escapados', l), value: total.sinMarcar, emoji: '🙈' },
          { label: T('deMas', l), value: total.deMas, emoji: '❌' },
        ]}
        shareText={shareText} user={user} lang={l}
        onPlayAgain={() => empezar(nivel)} secondaryActions={secondary} />
    )
  }

  if (!ronda) return null

  const revisando = screen === 'revision'
  const res = revisando ? resultados[resultados.length - 1] : null
  const penal = res ? PENALIZACION * (res.sinMarcar + res.deMas) : 0

  // Color de cada palabra. Mientras se marca solo hay dos estados; al corregir,
  // se ve todo a la vez: lo cazado, lo que se escapó y lo marcado de más.
  const clase = (t, i) => {
    const marcada = marcadas.has(i)
    if (!revisando) {
      return marcada
        ? 'bg-[#EDAE49] text-black rounded px-0.5'
        : 'hover:bg-white/10 rounded px-0.5 cursor-pointer'
    }
    if (t.error && marcada) return 'bg-green-500/80 text-black rounded px-0.5 font-bold'
    if (t.error) return 'bg-red-500/80 text-white rounded px-0.5 font-bold'
    if (marcada) return 'bg-orange-500/70 text-black rounded px-0.5 line-through'
    return ''
  }

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-3 sm:px-4 py-4">
      <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />

      <div className="w-full max-w-[620px] flex items-center justify-between mb-3 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">
            {ronda.emoji} {T('texto', l)} {idx + 1} {T('de', l)} {TEXTOS_POR_PARTIDA}
          </p>
          <p className="text-white font-bold text-lg">{tr3(ronda.titulo, l)}</p>
        </div>
        <p className="text-2xl font-black tabular-nums" style={{ color: revisando ? '#ffffff55' : '#EDAE49' }}>
          {formatoTiempo(segundos)}
        </p>
      </div>

      {/* Cuántos fallos hay se dice siempre. Sin el número, el jugador no sabe
          nunca si ha terminado, y con el reloj encima eso es agobio y no
          lectura. */}
      <div className="w-full max-w-[620px] flex items-center justify-between mb-2 px-1">
        <p className="text-white/50 text-xs">
          <span className="text-white font-black">{ronda.nErrores}</span> {T('fallos', l)}
        </p>
        <p className="text-white/50 text-xs">
          <span className="text-white font-black">{marcadas.size}</span> {T('marcadas', l)}
        </p>
      </div>

      <div className="w-full max-w-[620px] rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 mb-3">
        <p className="text-white/85 text-[17px] sm:text-lg leading-[2]">
          {ronda.tokens.map((t, i) => (t.palabra
            ? <span key={i} onClick={() => alternar(i)} className={clase(t, i)}>{t.s}</span>
            : <span key={i}>{t.s}</span>
          ))}
        </p>
      </div>

      {!revisando && (
        <button onClick={comprobar}
          className="w-full max-w-[620px] py-3.5 rounded-2xl bg-[#EDAE49] text-black font-black text-lg hover:bg-amber-400 transition-colors">
          {T('comprobar', l)}
        </button>
      )}

      {revisando && (
        <div className="w-full max-w-[620px] space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-green-500/15 border border-green-500/30 py-2">
              <p className="text-green-400 text-xl font-black">{res.encontrados}</p>
              <p className="text-white/50 text-[11px]">{T('encontrados', l)}</p>
            </div>
            <div className="rounded-xl bg-red-500/15 border border-red-500/30 py-2">
              <p className="text-red-400 text-xl font-black">{res.sinMarcar}</p>
              <p className="text-white/50 text-[11px]">{T('escapados', l)}</p>
            </div>
            <div className="rounded-xl bg-orange-500/15 border border-orange-500/30 py-2">
              <p className="text-orange-400 text-xl font-black">{res.deMas}</p>
              <p className="text-white/50 text-[11px]">{T('deMas', l)}</p>
            </div>
          </div>

          <p className="text-center text-sm font-bold">
            {penal > 0
              ? <span className="text-orange-400">+{penal}s {T('penal', l)}</span>
              : <span className="text-green-400">✓ {T('sinPenal', l)}</span>}
          </p>

          {/* Una línea por fallo del texto, con la palabra buena y la regla de
              su familia: el repaso es donde se aprende, no el marcar. */}
          <div className="space-y-1.5">
            {ronda.tokens.map((t, i) => (t.error ? (
              <div key={i} className="rounded-xl px-3 py-2 bg-white/5 border border-white/10">
                <p className="text-sm">
                  <span className="text-red-400 line-through">{t.s}</span>
                  <span className="text-white/40"> · {T('eraAsi', l)} </span>
                  <span className="text-green-400 font-bold">{t.correcta}</span>
                  {!marcadas.has(i) && <span className="text-white/30 text-xs"> 🙈</span>}
                </p>
                <p className="text-white/50 text-xs mt-0.5">
                  {FAMILIAS[t.familia].emoji} <span className="text-white/70 font-semibold">{tr3(FAMILIAS[t.familia].label, l)}</span> · {tr3(FAMILIAS[t.familia].regla, l)}
                </p>
              </div>
            ) : null))}
            {[...marcadas].filter(i => !ronda.tokens[i].error).map(i => (
              <div key={`x${i}`} className="rounded-xl px-3 py-2 bg-orange-500/10 border border-orange-500/20">
                <p className="text-sm">
                  <span className="text-orange-300 font-bold">{ronda.tokens[i].s}</span>
                  <span className="text-white/40"> · {T('estaBien', l)}</span>
                </p>
              </div>
            ))}
          </div>

          <button onClick={siguiente}
            className="w-full py-3.5 rounded-2xl bg-[#EDAE49] text-black font-black text-lg hover:bg-amber-400 transition-colors">
            {idx + 1 < rondas.length ? T('siguiente', l) : T('verResultado', l)}
          </button>
        </div>
      )}
    </div>
  )
}
