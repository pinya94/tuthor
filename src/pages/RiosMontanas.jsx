import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, REGIONES, genRonda, esCorrecta, delNivel, elementosDe, tx } from '../lib/riosMontanas'
import PreguntaRios from '../components/riosMontanas/PreguntaRios'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const REVEAL_MS = 3500 // lo justo para ver en el mapa dónde estaba
// La partida es un recorrido: un mapa entero (todos sus ríos y montañas del
// nivel) y luego el siguiente, sin repetir; al acabar el último, se acaba.
// En castellano y catalán, España, Europa y el mundo; en inglés, Estados Unidos, Europa y el mundo.
const RECORRIDO = { es: ['espana', 'europa', 'mundo'], ca: ['espana', 'europa', 'mundo'], en: ['eeuu', 'europa', 'mundo'] }
const AVISO_MS = 2600
const mmss = t => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`
// Puntos: 10 por acierto y hasta 10 más por rapidez. El extra baja de 10 a 0
// entre «rápido» y «lento» (segundos); las preguntas de varias piezas tienen más margen.
const RAPIDEZ = { busca: [4, 15], extremos: [4, 15], etiqueta: [10, 35], vertiente: [10, 35] }
const puntosDe = (tipo, segundos) => {
  const [rapido, lento] = RAPIDEZ[tipo] ?? [5, 20]
  return 10 + Math.round(10 * Math.min(1, Math.max(0, (lento - segundos) / (lento - rapido))))
}

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Los grandes ríos y montañas de España, Europa y el mundo', en: 'The great rivers and mountains of the United States, Europe and the world', ca: 'Els grans rius i muntanyes d’Espanya, Europa i el món' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Más ríos y cordilleras, y a qué mar u océano va cada río', en: 'More rivers and ranges, and which sea or ocean each river reaches', ca: 'Més rius i serralades, i a quin mar o oceà va cada riu' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Todo, más dónde nace y dónde desemboca cada río', en: 'Everything, plus where each river rises and where it reaches the sea', ca: 'Tot, i on neix i on desemboca cada riu' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[rios-montanas] los niveles de la pantalla no coinciden con NIVELES')
}

export default function RiosMontanas() {
  const { lang, localPath, tr } = useLang()
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const backPath = location.state?.backPath

  const [screen, setScreen] = useState('intro')
  const [nivel, setNivel] = useState('facil')
  const [segundos, setSegundos] = useState(0)
  const [puntos, setPuntos] = useState(0)
  const [ganado, setGanado] = useState(0)
  const [aciertos, setAciertos] = useState(0)
  const [preguntas, setPreguntas] = useState(0)
  const [streak, setStreak] = useState(0)
  const [ronda, setRonda] = useState(null)
  const [elegida, setElegida] = useState(null)
  const [phase, setPhase] = useState('choose')
  // Mapa en curso del recorrido y lo que ya ha salido de cada uno; aviso al cambiar
  const [aviso, setAviso] = useState(null)
  const recorridoRef = useRef({ i: 0, vistos: new Set() })
  const [progreso, setProgreso] = useState({ i: 0, vistos: 0 })

  const timerRef = useRef(null)
  const nextRef = useRef(null)
  const inicioRondaRef = useRef(0)
  const marcadorRef = useRef({ puntos: 0, segundos: 0 })
  useEffect(() => { marcadorRef.current = { puntos, segundos } }, [puntos, segundos])

  // La siguiente ronda; null si ya se ha recorrido todo
  const siguiente = niv => {
    const orden = RECORRIDO[l]
    const rec = recorridoRef.current
    let pendientes = delNivel(niv, orden[rec.i]).map(e => e.id).filter(id => !rec.vistos.has(id))
    if (!pendientes.length) {
      if (rec.i === orden.length - 1) return null
      const antes = orden[rec.i]
      rec.i++
      rec.vistos = new Set()
      pendientes = delNivel(niv, orden[rec.i]).map(e => e.id)
      setAviso({ antes, ahora: orden[rec.i] })
      setTimeout(() => setAviso(null), AVISO_MS)
    }
    const r = genRonda(niv, { region: orden[rec.i], prefiere: pendientes })
    for (const id of elementosDe(r)) rec.vistos.add(id)
    setProgreso({ i: rec.i, vistos: rec.vistos.size })
    return r
  }

  const next = niv => {
    const r = siguiente(niv)
    if (!r) { finish(); return }
    setRonda(r)
    setElegida(null)
    setPhase('choose')
  }
  // Cuándo empezó la ronda en pantalla (para los puntos por rapidez)
  useEffect(() => { inicioRondaRef.current = Date.now() }, [ronda])

  const startGame = (niv = 'facil') => {
    recorridoRef.current = { i: 0, vistos: new Set() }
    setAviso(null)
    setNivel(niv); setScreen('playing')
    setPuntos(0); setAciertos(0); setPreguntas(0); setStreak(0); setSegundos(0)
    next(niv)
  }

  function finish() {
    clearTimeout(nextRef.current)
    clearInterval(timerRef.current)
    setScreen('end')
    const { puntos: pts, segundos: t } = marcadorRef.current
    if (user) {
      saveActivity(user.uid, {
        type: 'juego', game: 'rios-montanas', category: 'relieve-espana',
        score: pts, timeSpent: t,
        coinsEarned: computeCoins('rios-montanas', { score: pts }),
        userName: user.displayName, userPhoto: user.photoURL,
      }).catch(() => {})
    }
  }

  // El reloj cuenta hacia arriba: cuánto se tarda en recorrerlo todo
  useEffect(() => {
    if (screen !== 'playing') return
    timerRef.current = setInterval(() => setSegundos(t => t + 1), 1000)
    return () => clearInterval(timerRef.current)
  }, [screen])

  useEffect(() => () => clearTimeout(nextRef.current), [])

  function responder(r) {
    if (phase !== 'choose') return
    setElegida(r); setPhase('result')
    setPreguntas(n => n + 1)
    if (esCorrecta(ronda, r)) {
      const p = puntosDe(ronda.tipo, (Date.now() - inicioRondaRef.current) / 1000)
      setGanado(p)
      setPuntos(x => x + p)
      setAciertos(a => a + 1)
      setStreak(x => x + 1)
    } else {
      setGanado(0)
      setStreak(0)
    }
    nextRef.current = setTimeout(() => next(nivel), REVEAL_MS)
  }

  const seo = {
    title: tr({ es: 'Ríos y Montañas — Juego de los ríos y el relieve de España y del mundo en el mapa', en: 'Rivers and Mountains — Map game of the rivers and mountains of the United States and the world', ca: 'Rius i Muntanyes — Joc dels rius i el relleu d’Espanya i del món al mapa' }),
    desc: tr({
      es: 'Sitúa en el mapa de España el Ebro, el Tajo, el Duero, el Guadalquivir, los Pirineos, el Sistema Central o Sierra Morena; reparte los ríos por vertientes y encuentra dónde nacen y desembocan. Y en el mapa del mundo: Nilo, Amazonas, Himalaya, Andes. Juego gratis para Primaria y ESO.',
      en: 'Find the Mississippi, Missouri, Colorado, Rio Grande, the Rocky Mountains or the Appalachians on the map of the United States; sort the rivers by the sea they reach and find where they rise and end. Then the world map: the Nile, the Amazon, the Himalayas, the Andes. Free geography game for primary and secondary.',
      ca: 'Situa al mapa d’Espanya l’Ebre, el Tajo, el Duero, el Guadalquivir, els Pirineus, el Sistema Central o Serra Morena; reparteix els rius per vessants i troba on neixen i desemboquen. I al mapa del món: Nil, Amazones, Himàlaia, Andes. Joc gratis per a Primària i ESO.',
    }),
    path: '/juegos/rios-montanas',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="rios-montanas"
            badge={tr({ es: 'Geografía · Relieve', en: 'Geography · Relief', ca: 'Geografia · Relleu' })}
            titulo={tr({ es: '🏞️ Ríos y Montañas', en: '🏞️ Rivers and Mountains', ca: '🏞️ Rius i Muntanyes' })}
            sub={tr({ es: 'Los ríos y las montañas de España, Europa y el mundo, en su sitio del mapa', en: 'The rivers and mountains of the United States, Europe and the world, in their place on the map', ca: 'Els rius i les muntanyes d’Espanya, Europa i el món, al seu lloc del mapa' })} />

          <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{tr({ es: 'Elige nivel', en: 'Choose a level', ca: 'Tria nivell' })}</p>
          <div className="flex flex-wrap justify-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl mb-2">
            {Object.entries(DIFS).map(([id, d], i) => (
              <button key={id} onClick={() => setNivel(id)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${nivel === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}>
                <NivelBarras clave={id} i={i} />{tr(d.label)}
              </button>
            ))}
          </div>
          <p className="text-white/40 text-xs text-center mb-5">{tr(DIFS[nivel].desc)}</p>

          <button onClick={() => startGame(nivel)}
            className="w-full py-3.5 rounded-2xl bg-[#EDAE49] text-black font-black text-lg hover:bg-amber-400 transition-colors">
            {tr({ es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' })}
          </button>
          <ComoSeJuega>
            <div className="space-y-2 text-white/70 text-sm">
              <p>{tr({ es: 'Sale un mapa (de España, de Europa o del mundo) con los ríos en azul y las cordilleras en marrón. Nada se elige de una lista:', en: 'A map appears (of the United States, of Europe or of the world) with the rivers in blue and the mountain ranges in brown. Nothing is picked from a list:', ca: 'Surt un mapa (d’Espanya, d’Europa o del món) amb els rius en blau i les serralades en marró. Res no es tria d’una llista:' })}</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>{tr({ es: '👆 Tocas en el mapa el río o el sistema montañoso que se pide.', en: '👆 You tap the river or mountain range asked for on the map.', ca: '👆 Toques al mapa el riu o el sistema muntanyós que es demana.' })}</li>
                <li>{tr({ es: '🔢 Pones cada nombre en su número del mapa (sobra uno).', en: '🔢 You put each name on its number on the map (one is left over).', ca: '🔢 Poses cada nom al seu número del mapa (en sobra un).' })}</li>
                <li>{tr({ es: '🌊 Repartes los ríos según el mar al que van: en España, por vertientes; en el mundo, por océanos.', en: '🌊 You sort the rivers by the sea they reach: Pacific, Gulf of Mexico or Atlantic in the US, oceans in the world.', ca: '🌊 Reparteixes els rius segons el mar on van: a Espanya, per vessants; al món, per oceans.' })}</li>
                <li>{tr({ es: '📍 En difícil, tocas dónde nace o dónde desemboca un río.', en: '📍 On hard, you tap where a river rises or reaches the sea.', ca: '📍 En difícil, toques on neix o on desemboca un riu.' })}</li>
              </ul>
              <p className="text-white/40 text-xs pt-1">{tr({ es: '🗺️ Se recorre cada mapa entero, sin repetir, y la partida acaba al terminar. ⚡ Acierto: 10 puntos, y hasta 10 más si contestas rápido.', en: '🗺️ You go through each whole map without repeats, and the game ends when you finish. ⚡ Correct: 10 points, plus up to 10 more if you answer fast.', ca: '🗺️ Es recorre cada mapa sencer, sense repetir, i la partida s’acaba en acabar. ⚡ Encert: 10 punts, i fins a 10 més si contestes ràpid.' })}</p>
            </div>
          </ComoSeJuega>
        </div>
      </div>
    )
  }

  if (screen === 'end') {
    const pts = puntos
    const nota = preguntas ? aciertos / preguntas : 0
    const msg = tr({
      es: nota < 0.4 ? '¡Sigue practicando!' : nota < 0.7 ? 'Buen recorrido' : nota < 0.9 ? '¡Te orientas muy bien!' : '¡Conoces el mapa como un geógrafo! 🏞️',
      en: nota < 0.4 ? 'Keep practising!' : nota < 0.7 ? 'A good journey' : nota < 0.9 ? 'You find your way very well!' : 'You know the map like a geographer! 🏞️',
      ca: nota < 0.4 ? 'Segueix practicant!' : nota < 0.7 ? 'Bon recorregut' : nota < 0.9 ? 'T’orientes molt bé!' : 'Coneixes el mapa com un geògraf! 🏞️',
    })
    const shareText = tr({
      es: `He hecho ${puntos} puntos recorriendo España y el mundo en Ríos y Montañas de Tuthor 🏞️ — ¿te sabes el mapa? https://tuthor.es/juegos/rios-montanas`,
      en: `I scored ${puntos} points going round the US and the world in Rivers and Mountains on Tuthor 🏞️ — do you know the map? https://tuthor.es/en/juegos/rios-montanas`,
      ca: `He fet ${puntos} punts recorrent Espanya i el món a Rius i Muntanyes de Tuthor 🏞️ — et saps el mapa? https://tuthor.es/ca/juegos/rios-montanas`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="rios-montanas" emoji="🏞️" title={tr({ es: '¡Recorrido completo!', en: 'Journey complete!', ca: 'Recorregut complet!' })} score={pts} message={msg}
        stats={[
          { label: tr({ es: 'aciertos', en: 'correct', ca: 'encerts' }), value: `${aciertos}/${preguntas}`, emoji: '✅' },
          { label: tr({ es: 'tiempo', en: 'time', ca: 'temps' }), value: mmss(segundos), emoji: '⏱️' },
        ]}
        shareText={shareText} user={user} lang={l}
        onPlayAgain={() => startGame(nivel)} secondaryActions={secondary} />
    )
  }

  if (!ronda) return null
  const isResult = phase === 'result'
  const acierto = isResult && esCorrecta(ronda, elegida)
  const orden = RECORRIDO[l]

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-3 sm:px-4 py-4">
      {head}
      <div className="w-full max-w-[560px] flex items-center justify-between mb-2 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">{DIFS[nivel].emoji} {tr(DIFS[nivel].label)}</p>
          <p className="text-white font-bold text-lg flex items-center gap-2">
            {puntos} {tr({ es: 'puntos', en: 'points', ca: 'punts' })}
            {streak >= 2 && <span className="flex items-center gap-0.5 text-orange-400 text-sm font-black"><Racha className="w-4 h-4" />{streak}</span>}
          </p>
        </div>
        <span className="font-black text-white/70 tabular-nums">⏱️ {mmss(segundos)}</span>
      </div>
      {/* Por dónde va el recorrido: cada mapa con lo que ya ha salido */}
      <div className="w-full max-w-[560px] flex gap-2 mb-3 px-1">
        {orden.map((g, i) => {
          const total = delNivel(nivel, g).length
          const hechos = i < progreso.i ? total : i === progreso.i ? Math.min(total, progreso.vistos) : 0
          return (
            <div key={g} className="flex-1">
              <p className={`text-[11px] font-bold mb-1 ${i === progreso.i ? 'text-white' : 'text-white/40'}`}>{tx(REGIONES[g].nombre, l).replace(/^./, c => c.toUpperCase())} · {hechos}/{total}</p>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden"><div className="h-full bg-emerald-400 transition-all" style={{ width: `${(100 * hechos) / total}%` }} /></div>
            </div>
          )
        })}
      </div>

      <div className="w-full max-w-[560px]">
        {aviso && (
          <p className="mb-3 rounded-xl border border-emerald-400/40 bg-emerald-500/15 px-3 py-2 text-center text-sm font-black text-emerald-200">
            {tr({
              es: `✅ ¡Ya has recorrido ${tx(REGIONES[aviso.antes].nombre, 'es')}! Ahora, ${tx(REGIONES[aviso.ahora].nombre, 'es')} ${aviso.ahora === 'mundo' ? '🌍' : '🏞️'}`,
              en: `✅ You have covered ${tx(REGIONES[aviso.antes].nombre, 'en')}! Now, ${tx(REGIONES[aviso.ahora].nombre, 'en')} ${aviso.ahora === 'mundo' ? '🌍' : '🏞️'}`,
              ca: `✅ Ja has recorregut ${tx(REGIONES[aviso.antes].nombre, 'ca')}! Ara, ${tx(REGIONES[aviso.ahora].nombre, 'ca')} ${aviso.ahora === 'mundo' ? '🌍' : '🏞️'}`,
            })}
          </p>
        )}
        <PreguntaRios key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
        {isResult && (
          <p className="text-center text-xs font-bold mt-2">
            {acierto
              ? <span className="text-green-400">+{ganado}{ganado > 10 ? ` (⚡ +${ganado - 10})` : ''}{streak >= 2 ? ` · 🔥 ${streak}` : ''}</span>
              : <span className="text-red-400">+0</span>}
          </p>
        )}
      </div>
    </div>
  )
}
