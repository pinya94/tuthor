import { useState, useRef, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/laOrquesta'
import PreguntaOrquesta from '../components/laOrquesta/PreguntaOrquesta'
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
             desc: { es: 'Sienta a los músicos en la orquesta y une cada dibujo con su nombre', en: 'Seat the musicians and match each drawing with its name', ca: 'Seu els músics a l’orquestra i uneix cada dibuix amb el seu nom' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Y además, las subfamilias: cuerda frotada, pulsada o percutida…', en: 'Plus the subfamilies: bowed, plucked or struck strings…', ca: 'I a més, les subfamílies: corda fregada, pinçada o percudida…' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Cómo produce el sonido cada uno y Hornbostel-Sachs', en: 'How each one makes its sound, and Hornbostel-Sachs', ca: 'Com produeix el so cadascun i Hornbostel-Sachs' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[la-orquesta] los niveles de la pantalla no coinciden con NIVELES')
}

export default function LaOrquesta() {
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

  const next = useCallback(niv => {
    setRonda(genRonda(niv))
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
          type: 'juego', game: 'la-orquesta', category: 'instrumentos',
          score: pts, timeSpent: jugadoSeg, // tiempo REAL de juego, sin las pausas de lectura
          coinsEarned: computeCoins('la-orquesta', { score: pts }),
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

    empezar()
    next(niv)
  }, [next, empezar])

  function responder(r) {
    if (ritmo.fase !== 'jugando' || !ronda) return
    setElegida(r)
    const bien = esCorrecta(ronda, r)
    if (bien) { aciertosRef.current += 1; setAciertos(aciertosRef.current); setStreak(x => x + 1) } else setStreak(0)
    ritmo.responder(bien, ronda.inst.length)
  }

  const seo = {
    title: tr({ es: 'La Orquesta — Juego de instrumentos musicales y sus familias', en: 'The Orchestra — Musical instruments and their families game', ca: 'L’Orquestra — Joc d’instruments musicals i les seves famílies' }),
    desc: tr({
      es: 'Sienta a la orquesta: cada instrumento dibujado a su zona del plano, cuerda, viento madera, viento metal o percusión. Une dibujos y nombres y clasifícalos por cómo suenan. Juego de música gratis.',
      en: 'Seat the orchestra: each drawn instrument to its section, strings, woodwind, brass or percussion. Match drawings and names and sort them by how they sound. Free music game.',
      ca: 'Seu l’orquestra: cada instrument dibuixat a la seva zona, corda, vent fusta, vent metall o percussió. Uneix dibuixos i noms i classifica’ls per com sonen. Joc de música gratis.',
    }),
    path: '/juegos/la-orquesta',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  // Desde la cuadrícula de juegos se entra jugando (ver lib/arranqueDirecto)
  useArranqueDirecto(startGame)

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="la-orquesta"
            badge={tr({ es: 'Música · Instrumentos', en: 'Music · Instruments', ca: 'Música · Instruments' })}
            titulo={tr({ es: '🎻 La Orquesta', en: '🎻 The Orchestra', ca: '🎻 L’Orquestra' })}
            sub={tr({ es: 'Sienta a cada músico en su sitio', en: 'Seat every musician in their place', ca: 'Seu cada músic al seu lloc' })} />

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
              <p>{tr({ es: 'Sienta a la orquesta: toca un instrumento dibujado y luego su zona del plano. Normalmente la cuerda va junto al director, después el viento madera, el viento metal y, al fondo, la percusión (cada orquesta tiene sus variaciones). La familia no la decide el material: la flauta y el saxofón son de metal pero de viento madera, y el piano es de cuerda.', en: 'Seat the orchestra: tap a drawn instrument and then its section of the plan. Usually strings sit beside the conductor, then woodwind, brass and percussion at the back (each orchestra varies it a little). Material does not decide the family: the flute is metal but woodwind, and the piano is a string instrument.', ca: 'Seu l’orquestra: toca un instrument dibuixat i després la seva zona del plànol. Normalment la corda va al costat del director, després el vent fusta, el vent metall i, al fons, la percussió (cada orquestra hi fa variacions). La família no la decideix el material.' })}</p>
              <p>{tr({ es: 'Otras rondas: unir cada dibujo con su nombre y clasificar los instrumentos por subfamilia, por cómo producen el sonido (arco, lengüeta, labios, macillos…) o según Hornbostel-Sachs (cordófonos, aerófonos, membranófonos e idiófonos).', en: 'Other rounds: match each drawing with its name and sort instruments by subfamily, by how they make their sound or by Hornbostel-Sachs.', ca: 'Altres rondes: unir cada dibuix amb el seu nom i classificar els instruments per subfamília, per com produeixen el so o segons Hornbostel-Sachs.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Buen oído!' : '¡Concertino! 🎻',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Good ear!' : 'Concertmaster! 🎻',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Bona orella!' : 'Concertino! 🎻',
    })
    const shareText = tr({
      es: `He reconocido ${aciertos} instrumentos en La Orquesta de Tuthor 🎻 — ¿puedes superarme? https://tuthor.es/juegos/la-orquesta`,
      en: `I recognised ${aciertos} instruments in The Orchestra on Tuthor 🎻 — can you beat me? https://tuthor.es/juegos/la-orquesta`,
      ca: `He reconegut ${aciertos} instruments a L’Orquestra de Tuthor 🎻 — em pots superar? https://tuthor.es/juegos/la-orquesta`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="la-orquesta" emoji="🎻" title={tr({ es: 'Fin de la partida', en: 'Game over', ca: 'Fi de la partida' })} score={pts} message={msg}
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
        <PreguntaOrquesta key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
        <PanelRespuesta fase={ritmo.fase} delta={ritmo.delta} racha={streak} onSeguir={ritmo.seguir} />
      </div>
    </div>
  )
}
