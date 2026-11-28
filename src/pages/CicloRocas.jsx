import { useState, useRef, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta, crearBolsa, accionesDe } from '../lib/cicloRocas'
import PreguntaRocas from '../components/cicloRocas/PreguntaRocas'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { HudPartida, PanelRespuesta } from '../components/RitmoPartida'
import { useRitmoPartida } from '../lib/useRitmoPartida'
import { PERFILES } from '../lib/ritmoPartida'
import { useArranqueDirecto } from '../lib/arranqueDirecto'

// Ritmo (nov-2026, ver lib/ritmoPartida): perfil «construcción», porque cada
// ronda son varias piezas. 60 s de juego, +1 s por pieza de una ronda acertada
// (con tope de +30 s en toda la partida: se acaba siempre), −5 s por fallo. Al
// acertar, confirmación breve (1,1 s); al fallar, corrección concreta con el
// reloj parado y «Seguir». Antes: 90 s, +6 s por acierto y 4,5 s de espera
// obligatoria tras cada respuesta (una partida «de 90 s» duraba ~4 min).
const PERFIL = 'construccion'
const P = PERFILES[PERFIL]

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Pon su proceso a las flechas del ciclo y lleva rocas a su tipo', en: 'Label the cycle’s arrows and sort rocks by type', ca: 'Posa el procés a les fletxes del cicle i porta roques al seu tipus' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'También: une cada metamórfica con su roca de origen', en: 'Also: match each metamorphic rock with its parent rock', ca: 'També: uneix cada metamòrfica amb la seva roca d’origen' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Plutónicas y volcánicas, clases de sedimentarias y rutas por el ciclo', en: 'Plutonic and volcanic, kinds of sedimentary rock and routes through the cycle', ca: 'Plutòniques i volcàniques, menes de sedimentàries i rutes pel cicle' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[ciclo-rocas] los niveles de la pantalla no coinciden con NIVELES')
}

export default function CicloRocas() {
  const { lang, localPath, tr } = useLang()
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const backPath = location.state?.backPath

  const [screen, setScreen] = useState('intro')
  const [nivel, setNivel] = useState('facil')
  const [aciertos, setAciertos] = useState(0)
  const [streak, setStreak] = useState(0)
  const [ronda, setRonda] = useState(null)
  const [elegida, setElegida] = useState(null)
  const [jugado, setJugado] = useState(0)

  const nivelRef = useRef('facil')
  const aciertosRef = useRef(0)
  // Bolsa de mecánicas de la partida (ver crearBolsa) y la ronda anterior, para
  // no repetirla. En refs: genRonda no puede ir dentro de un updater de setState
  // (StrictMode lo llama dos veces y sacaría dos de la bolsa).
  const bolsaRef = useRef(null)
  const rondaRef = useRef(null)

  const next = useCallback(niv => {
    const r = genRonda(niv, { evitar: rondaRef.current?.clave, bolsa: bolsaRef.current })
    rondaRef.current = r
    setRonda(r)
    setElegida(null)
  }, [])

  const ritmo = useRitmoPartida(PERFIL, {
    onSiguiente: () => next(nivelRef.current),
    onFin: ({ jugadoSeg }) => {
      setJugado(jugadoSeg)
      setScreen('end')
      const pts = aciertosRef.current * 10
      if (user) {
        saveActivity(user.uid, {
          type: 'juego', game: 'ciclo-rocas', category: 'rocas-minerales',
          score: pts, timeSpent: jugadoSeg, // tiempo REAL de juego, sin las pausas de lectura
          coinsEarned: computeCoins('ciclo-rocas', { score: pts }),
          userName: user.displayName, userPhoto: user.photoURL,
        }).catch(() => {})
      }
    },
  })
  const { empezar } = ritmo

  // Empezar o reempezar (también al cambiar de nivel en plena partida): todo a
  // cero, para que nunca se mezclen puntos de dos niveles en una partida.
  const startGame = useCallback((niv = 'facil') => {
    setNivel(niv); nivelRef.current = niv
    setScreen('playing')
    aciertosRef.current = 0
    setAciertos(0); setStreak(0); setJugado(0)
    bolsaRef.current = crearBolsa(niv)
    rondaRef.current = null
    empezar()
    next(niv)
  }, [next, empezar])

  function responder(r) {
    if (ritmo.fase !== 'jugando' || !ronda) return
    setElegida(r)
    const bien = esCorrecta(ronda, r)
    if (bien) { aciertosRef.current += 1; setAciertos(aciertosRef.current); setStreak(x => x + 1) } else setStreak(0)
    ritmo.responder(bien, accionesDe(ronda))
  }

  const seo = {
    title: tr({ es: 'Ciclo de las rocas — Juego de rocas ígneas, sedimentarias y metamórficas', en: 'The Rock Cycle — Igneous, sedimentary and metamorphic rocks game', ca: 'Cicle de les roques — Joc de roques ígnies, sedimentàries i metamòrfiques' }),
    desc: tr({
      es: 'El ciclo de las rocas y muestras de rocas reales: granito, basalto, pómez, caliza, arenisca, mármol, pizarra, gneis… Di qué proceso las transforma, de qué tipo son y de dónde vienen. Juego de geología gratis.',
      en: 'The rock cycle and samples of real rocks: granite, basalt, pumice, limestone, sandstone, marble, slate, gneiss… Say which process transforms them, what type they are and where they come from. Free geology game.',
      ca: 'El cicle de les roques i mostres de roques reals: granit, basalt, pedra tosca, calcària, gres, marbre, pissarra, gneis… Digues quin procés les transforma, de quin tipus són i d’on vénen. Joc de geologia gratis.',
    }),
    path: '/juegos/ciclo-rocas',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  // Desde la cuadrícula de juegos se entra jugando (ver lib/arranqueDirecto)
  useArranqueDirecto(startGame)

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="ciclo-rocas"
            badge={tr({ es: 'Geología · Rocas y minerales', en: 'Geology · Rocks and minerals', ca: 'Geologia · Roques i minerals' })}
            titulo={tr({ es: '⛰️ Ciclo de las rocas', en: '⛰️ The Rock Cycle', ca: '⛰️ Cicle de les roques' })}
            sub={tr({ es: 'Magma, sedimentos y metamorfismo: cómo una roca se convierte en otra', en: 'Magma, sediments and metamorphism: how one rock becomes another', ca: 'Magma, sediments i metamorfisme: com una roca es converteix en una altra' })} />

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
              <p>{tr({ es: 'Las rocas no son eternas: cambian de una clase a otra en un ciclo que dura millones de años. El magma se enfría y forma rocas ígneas; la meteorización y la erosión las rompen en sedimentos, que el agua, el viento o el hielo transportan y depositan, y que se compactan y cementan en rocas sedimentarias; la presión y la temperatura las transforman en metamórficas sin fundirlas, y si se funden vuelven a ser magma.', en: 'Rocks are not eternal: they change from one kind to another in a cycle lasting millions of years. Magma cools into igneous rocks; weathering and erosion break them into sediments, which water, wind or ice transport and deposit, and which are compacted and cemented into sedimentary rocks; pressure and temperature turn them into metamorphic rocks without melting them, and if they melt they become magma again.', ca: 'Les roques no són eternes: canvien d’una mena a una altra en un cicle que dura milions d’anys. El magma es refreda i forma roques ígnies; la meteorització i l’erosió les trenquen en sediments, que l’aigua, el vent o el gel transporten i dipositen, i que es compacten i cimenten en roques sedimentàries; la pressió i la temperatura les transformen en metamòrfiques sense fondre-les, i si es fonen tornen a ser magma.' })}</p>
              <p>{tr({ es: 'No hay opciones: pones su proceso a las flechas numeradas del ciclo, llevas cada muestra de roca a la caja de su tipo, unes cada metamórfica con su roca de origen y trazas la ruta de una roca a otra tocando las flechas. En las muestras se ve lo que delata a cada roca: los cristales grandes delatan que se enfrió despacio bajo tierra, los agujeros de la pómez son burbujas de gas y las bandas del gneis, una roca muy deformada por la presión.', en: 'There are no options: you label the numbered arrows of the cycle with their process, drop each rock sample into the box for its type, match each metamorphic rock with its parent rock and trace the route from one rock to another by tapping the arrows. The samples show what gives each rock away: large crystals reveal slow cooling underground, the holes in pumice are gas bubbles and the bands in gneiss show a rock heavily deformed by pressure.', ca: 'No hi ha opcions: poses el procés a les fletxes numerades del cicle, portes cada mostra de roca a la caixa del seu tipus, uneixes cada metamòrfica amb la seva roca d’origen i traces la ruta d’una roca a una altra tocant les fletxes. A les mostres es veu el que delata cada roca: els cristalls grans delaten que es va refredar a poc a poc sota terra, els forats de la pedra tosca són bombolles de gas i les bandes del gneis, una roca molt deformada per la pressió.' })}</p>
              <p className="text-white/40 text-xs pt-1">⏱️ {P.base} s · {tr({ es: `Ronda acertada: +10 y +${P.porAccion} s por pieza (hasta +${P.bonusMax} s en la partida) · Fallo −${P.porFallo} s · El reloj se para mientras lees la corrección`, en: `Correct round: +10 and +${P.porAccion} s per piece (up to +${P.bonusMax} s per game) · Wrong −${P.porFallo} s · The clock stops while you read the correction`, ca: `Ronda encertada: +10 i +${P.porAccion} s per peça (fins a +${P.bonusMax} s a la partida) · Error −${P.porFallo} s · El rellotge s’atura mentre llegeixes la correcció` })}</p>
            </div>
          </ComoSeJuega>
        </div>
      </div>
    )
  }

  if (screen === 'end') {
    const pts = aciertos * 10
    const msg = tr({
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Tienes ojo de geólogo!' : '¡Duro como el granito! ⛰️',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'You have a geologist’s eye!' : 'Hard as granite! ⛰️',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Tens ull de geòleg!' : 'Dur com el granit! ⛰️',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} preguntas del ciclo de las rocas en Tuthor ⛰️ — ¿puedes superarme? https://tuthor.es/juegos/ciclo-rocas`,
      en: `I got ${aciertos} rock cycle questions right on Tuthor ⛰️ — can you beat me? https://tuthor.es/juegos/ciclo-rocas`,
      ca: `He encertat ${aciertos} preguntes del cicle de les roques a Tuthor ⛰️ — em pots superar? https://tuthor.es/juegos/ciclo-rocas`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="ciclo-rocas" emoji="⛰️" title={tr({ es: 'Fin de la partida', en: 'Game over', ca: 'Fi de la partida' })} score={pts} message={msg}
        stats={[
          { label: tr({ es: 'aciertos', en: 'correct', ca: 'encerts' }), value: aciertos, emoji: '✅' },
          { label: tr({ es: 'nivel', en: 'level', ca: 'nivell' }), value: tr(DIFS[nivel].label), emoji: DIFS[nivel].emoji },
          { label: tr({ es: 'segundos', en: 'seconds', ca: 'segons' }), value: jugado, emoji: '⏱️' },
        ]}
        shareText={shareText} user={user} lang={l}
        onPlayAgain={() => startGame(nivel)} secondaryActions={secondary} />
    )
  }

  if (!ronda) return null
  const isResult = ritmo.fase === 'acierto' || ritmo.fase === 'fallo'

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-3 sm:px-4 py-4">
      {head}
      <HudPartida niveles={DIFS} nivel={nivel} onCambiarNivel={startGame} puntos={aciertos * 10} racha={streak}
        restante={ritmo.restante} total={ritmo.total} fase={ritmo.fase} onTerminar={ritmo.terminar} />
      <div className="w-full max-w-[480px]">
        <PreguntaRocas key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
        <PanelRespuesta fase={ritmo.fase} delta={ritmo.delta} racha={streak} onSeguir={ritmo.seguir} />
      </div>
    </div>
  )
}
