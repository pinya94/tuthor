import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { RANGOS, generarPregunta } from '../lib/lecturaGraficos'
import GraficoDatos from '../components/GraficoDatos'
import TablaDatos from '../components/TablaDatos'
import GameEndScreen from '../components/GameEndScreen'
import SupportBlock from '../components/SupportBlock'
import SEOHead from '../components/SEOHead'

// ── Lee el Gráfico ───────────────────────────────────────────────────────────
// Se enseña una gráfica con datos y se pregunta POR ELLA: si crece o decrece,
// cuándo fue el máximo, entre qué dos años subió más, qué serie adelanta a
// cuál. La respuesta es un juicio sobre la forma, no una cuenta — que es lo que
// lo separa de Estadístico Exprés (calcular una medida) y de Caza la Función
// (ajustar una fórmula).
//
// Los datos son inventados pero el CONTEXTO no es decorado: los mismos números
// son la población de un pueblo, las ventas de una empresa o las temperaturas
// de una ciudad, y con eso cambian las unidades y lo que la respuesta
// significa. Leer un gráfico sin saber de qué habla es justamente lo que no se
// quiere enseñar.
//
// Contrarreloj y sin penalización por fallar: el objetivo es mirar rápido y
// decidir, no rumiar. La generación vive en lib/lecturaGraficos.js, con una
// batería de tests que genera miles de preguntas y comprueba que todas se
// pueden contestar mirando el dibujo.

const DIFS = {
  facil:   { ...RANGOS.facil,   time: 75, puntos: 10, bonus: 3 },
  medio:   { ...RANGOS.medio,   time: 70, puntos: 15, bonus: 3 },
  dificil: { ...RANGOS.dificil, time: 65, puntos: 22, bonus: 4 },
}

const DIF_LABEL = {
  facil:   { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
  medio:   { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
  dificil: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
}

// Los tres niveles son tres cosas distintas, no el mismo ejercicio con más
// puntos. Cada uno tiene su verbo, y por eso se dice en la tarjeta: leer el
// dato → leer la forma → calcular sobre los datos.
const DIF_QUE = {
  facil:   { es: 'LEER un dato', en: 'READ a value', ca: 'LLEGIR una dada' },
  medio:   { es: 'COMPARAR puntos', en: 'COMPARE points', ca: 'COMPARAR punts' },
  dificil: { es: 'CALCULAR con los datos', en: 'WORK IT OUT from the data', ca: 'CALCULAR amb les dades' },
}

const DIF_DESC = {
  facil: {
    es: 'Una sola serie. ¿Sube o baja? ¿Cuándo fue el máximo? La respuesta está en el dibujo.',
    en: 'One series. Going up or down? When was the peak? The answer is in the picture.',
    ca: 'Una sola sèrie. Puja o baixa? Quan va ser el màxim? La resposta és al dibuix.',
  },
  medio: {
    es: 'Hay que comparar dos puntos: cuánto cambió, dónde subió más. Y cuidado con los ejes que no empiezan en cero.',
    en: 'You compare two points: how much it changed, where it rose most. And watch for axes that skip zero.',
    ca: "Cal comparar dos punts: quant va canviar, on va pujar més. I compte amb els eixos que no comencen a zero.",
  },
  dificil: {
    es: 'La respuesta no está dibujada. Ingresos menos gastos, la media de unas notas, quién de los dos es mejor.',
    en: 'The answer is not drawn. Revenue minus costs, the mean of some marks, which of the two is better.',
    ca: 'La resposta no està dibuixada. Ingressos menys despeses, la mitjana d\'unes notes, qui dels dos és millor.',
  },
}

export default function LeeElGrafico() {
  const navigate = useNavigate()
  const { lang, tr, localPath } = useLang()
  const { user } = useAuth()

  const [fase, setFase] = useState('intro') // intro | jugando | fin
  const [difId, setDifId] = useState('medio')
  const [ronda, setRonda] = useState(null)
  const [timeLeft, setTimeLeft] = useState(70)
  const [score, setScore] = useState(0)
  const [aciertos, setAciertos] = useState(0)
  const [jugadas, setJugadas] = useState(0)
  const [racha, setRacha] = useState(0)
  const [mejorRacha, setMejorRacha] = useState(0)
  const [elegida, setElegida] = useState(null)

  const dif = DIFS[difId]
  const scoreRef = useRef(0)
  const timeRef = useRef(70)
  const finRef = useRef(false)

  function nuevaRonda(d = dif) {
    setElegida(null)
    setRonda(generarPregunta(d, lang))
  }

  function startGame(id) {
    const d = DIFS[id]
    setDifId(id)
    setScore(0); scoreRef.current = 0
    setAciertos(0); setJugadas(0); setRacha(0); setMejorRacha(0)
    setTimeLeft(d.time); timeRef.current = d.time
    finRef.current = false
    setFase('jugando')
    nuevaRonda(d)
  }

  function guardar() {
    if (!user) return
    const finalScore = scoreRef.current
    if (finalScore <= 0) return
    saveActivity(user.uid, {
      type: 'juego', game: 'lee-el-grafico', score: finalScore, passed: true, timeSpent: dif.time,
      coinsEarned: computeCoins('lee-el-grafico', { score: finalScore }),
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }

  // El reloj vive en un ref además de en el estado porque el bonus por acierto
  // lo modifica desde fuera del intervalo: leyendo solo el estado, dos aciertos
  // seguidos se pisarían el uno al otro.
  useEffect(() => {
    if (fase !== 'jugando') return
    const t = setInterval(() => {
      timeRef.current -= 1
      setTimeLeft(timeRef.current)
      if (timeRef.current <= 0) {
        clearInterval(t)
        if (!finRef.current) { finRef.current = true; guardar(); setFase('fin') }
      }
    }, 1000)
    return () => clearInterval(t)
  }, [fase]) // eslint-disable-line react-hooks/exhaustive-deps

  function responder(op) {
    if (elegida !== null) return
    setElegida(op)
    const bien = op === ronda.correcta
    setJugadas(j => j + 1)
    if (bien) {
      const suma = dif.puntos + Math.min(racha, 5) * 2
      scoreRef.current += suma
      setScore(scoreRef.current)
      setAciertos(a => a + 1)
      setRacha(r => { const n = r + 1; setMejorRacha(m => Math.max(m, n)); return n })
      timeRef.current += dif.bonus
      setTimeLeft(timeRef.current)
    } else {
      setRacha(0)
    }
    setTimeout(() => { if (!finRef.current) nuevaRonda() }, bien ? 900 : 1900)
  }

  const seoTitle = tr({
    es: 'Lee el Gráfico — Interpreta datos de población, ventas y clima',
    en: 'Read the Chart — Interpret population, sales and climate data',
    ca: 'Llegeix el Gràfic — Interpreta dades de població, vendes i clima',
  })
  const seoDesc = tr({
    es: 'Mira una gráfica y responde: ¿crece o decrece? ¿cuándo fue el máximo? ¿entre qué años subió más? Datos de demografía, empresa y clima, con la trampa del eje que no empieza en cero.',
    en: 'Look at a chart and answer: growing or shrinking? when was the peak? between which years did it rise most? Demographic, business and climate data, including the axis that skips zero.',
    ca: 'Mira un gràfic i respon: creix o decreix? quan va ser el màxim? Dades de demografia, empresa i clima, amb el parany de l\'eix que no comença a zero.',
  })

  if (fase === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <SEOHead title={seoTitle} description={seoDesc} path="/juegos/lee-el-grafico" lang={lang} />
        <div className="w-full max-w-md text-center">
          <span className="text-6xl block mb-4">📉</span>
          <h1 className="text-3xl font-black text-white mb-2">
            {tr({ es: 'Lee el Gráfico', en: 'Read the Chart', ca: 'Llegeix el Gràfic' })}
          </h1>
          <p className="text-white/55 mb-4 leading-relaxed">
            {tr({
              es: 'Sale una gráfica con datos y una pregunta sobre ella. Nada de fórmulas que memorizar: hay que mirar el dibujo y decidir.',
              en: 'You get a chart with data and a question about it. No formulas to memorise: look at the picture and decide.',
              ca: 'Surt un gràfic amb dades i una pregunta sobre ell. Res de fórmules per memoritzar: cal mirar el dibuix i decidir.',
            })}
          </p>

          {/* Qué clase de datos va a ver. Es lo que convierte el juego en algo
              reconocible: son los gráficos de clase, no gráficos abstractos. */}
          <p className="text-white/35 text-[12.5px] mb-6 leading-relaxed">
            {tr({
              es: 'Población de un pueblo, ingresos y gastos de una empresa, notas de dos alumnos, temperaturas, días de lluvia, socios de un club…',
              en: "A town's population, a company's revenue and costs, two students' marks, temperatures, rainy days, club members…",
              ca: "Població d'un poble, ingressos i despeses d'una empresa, notes de dos alumnes, temperatures, dies de pluja, socis d'un club…",
            })}
          </p>

          <p className="text-white/30 text-[11px] font-bold uppercase tracking-widest mb-2 text-left">
            {tr({ es: 'Elige por dónde empezar', en: 'Pick where to start', ca: 'Tria per on començar' })}
          </p>
          <div className="space-y-2 mb-6">
            {Object.keys(DIFS).map(id => (
              <button key={id} type="button" onClick={() => startGame(id)}
                className="w-full text-left rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-teal-500/40 p-4 transition-all">
                <div className="flex items-baseline justify-between gap-2 mb-0.5">
                  <p className="text-white font-bold text-[15px]">{tr(DIF_LABEL[id])}</p>
                  <p className="text-teal-300/70 text-[10.5px] font-bold uppercase tracking-wider shrink-0">{tr(DIF_QUE[id])}</p>
                </div>
                <p className="text-white/40 text-[12.5px] leading-snug">{tr(DIF_DESC[id])}</p>
              </button>
            ))}
          </div>

          <SupportBlock className="mb-5" />
          <button type="button" onClick={() => navigate(localPath('/juegos'))}
            className="text-white/30 hover:text-white/60 text-sm transition-colors">
            {tr({ es: '← Volver a los juegos', en: '← Back to games', ca: '← Tornar als jocs' })}
          </button>
        </div>
      </div>
    )
  }

  if (fase === 'fin') {
    return (
      <GameEndScreen
        game="lee-el-grafico"
        emoji="📉"
        title={`${tr({ es: '¡Tiempo agotado!', en: 'Time is up!', ca: 'Temps esgotat!' })} · ${tr(DIF_LABEL[difId])}`}
        score={score}
        stats={[
          { label: tr({ es: 'Aciertos', en: 'Correct', ca: 'Encerts' }), value: `${aciertos}/${jugadas}`, emoji: '✅' },
          { label: tr({ es: 'Mejor racha', en: 'Best streak', ca: 'Millor ratxa' }), value: mejorRacha, emoji: '🔥' },
        ]}
        shareText={tr({
          es: `He leído ${aciertos} gráficos bien en Lee el Gráfico (${score} puntos).`,
          en: `I read ${aciertos} charts correctly in Read the Chart (${score} points).`,
          ca: `He llegit ${aciertos} gràfics bé a Llegeix el Gràfic (${score} punts).`,
        })}
        onPlayAgain={() => startGame(difId)}
        playAgainLabel={tr({ es: 'Otra vez', en: 'Again', ca: 'Un altre cop' })}
        secondaryActions={[{ label: tr({ es: 'Cambiar dificultad', en: 'Change difficulty', ca: 'Canviar dificultat' }), onClick: () => setFase('intro') }]}
        user={user} lang={lang}
      />
    )
  }

  const ctx = ronda?.contexto
  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-6">
      <SEOHead title={seoTitle} description={seoDesc} path="/juegos/lee-el-grafico" lang={lang} />
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between gap-3 mb-3">
          <button type="button" onClick={() => setFase('intro')}
            className="text-white/40 hover:text-white text-[13px] font-bold transition-colors">
            ← {tr({ es: 'Salir', en: 'Exit', ca: 'Sortir' })}
          </button>
          <span className={`text-[13px] font-black tabular-nums ${timeLeft <= 10 ? 'text-red-400' : 'text-white/60'}`}>
            ⏱ {timeLeft}s
          </span>
          <span className="text-teal-300 text-[13px] font-black tabular-nums">{score}</span>
        </div>

        {ronda && (
          <>
            <div className="rounded-2xl border border-white/10 p-3 mb-3" style={{ background: 'rgba(17,20,29,0.86)' }}>
              <p className="text-white/40 text-[10.5px] font-bold uppercase tracking-widest text-center mb-1">
                {/* Cada familia tiene una cosa distinta que decir aquí: dos
                    series se nombran las dos, una serie suelta dice su
                    magnitud, y una serie de medida dice qué se mide. Sin
                    esto, las de media salían con la cabecera colgando:
                    "📕 Matemáticas ·" y nada detrás. */}
                {ctx.emoji} {tr(ctx.materia)}
                {ronda.leyenda ? ` · ${ronda.leyenda.join(" y ")}`
                  : ctx.magnitud ? ` · ${tr(ctx.magnitud)}`
                    : ctx.corto ? ` · ${tr(ctx.corto)}` : ""}
              </p>
              {/* Una clasificación no es un gráfico: se pinta como tabla. Es
                  el otro formato en el que llegan los datos en clase, y
                  leerlo es una destreza aparte. */}
              {ronda.formato === 'tabla' ? (
                <TablaDatos filas={ronda.filas} comp={ronda.comp} tr={tr}
                  marcarFila={ronda.marcarFila ?? null}
                  puntosLabel={tr({ es: 'Pts', en: 'Pts', ca: 'Pts' })} />
              ) : (
              <GraficoDatos
                valores={ronda.valores}
                segunda={ronda.segunda}
                etiquetas={ronda.etiquetas}
                tipo={ronda.grafico ?? ctx.grafico}
                ejeTruncado={ronda.ejeTruncado}
                marcar={ronda.marcar ?? []}
                leyenda={ronda.leyenda}
                etiquetarValores={ronda.etiquetarValores}
                formatEje={v => (ctx.escala >= 1000 ? `${v * ctx.escala / 1000}k` : String(v * ctx.escala))}
                titulo={tr(ctx.sujeto)}
              />
              )}
              {ronda.ejeTruncado && (
                // Se avisa en texto además de con la marca del eje: el objetivo
                // es que aprenda a desconfiar, no cazarle con una trampa muda.
                <p className="text-amber-400/70 text-[10.5px] text-center mt-1">
                  {tr({ es: '⚠ El eje no empieza en cero', en: '⚠ The axis does not start at zero', ca: '⚠ L\'eix no comença a zero' })}
                </p>
              )}
            </div>

            <p className="text-white font-bold text-[15px] text-center mb-3 leading-snug">{ronda.pregunta}</p>

            <div className="grid grid-cols-2 gap-2">
              {ronda.opciones.map(op => {
                const esCorrecta = op === ronda.correcta
                const elegidaEsta = elegida === op
                const estado = elegida === null ? 'idle' : esCorrecta ? 'bien' : elegidaEsta ? 'mal' : 'apagada'
                return (
                  <button key={op} type="button" onClick={() => responder(op)} disabled={elegida !== null}
                    className={`px-3 py-3 rounded-xl border text-[13px] font-bold transition-colors ${
                      estado === 'bien' ? 'border-green-500/60 bg-green-500/15 text-green-300'
                        : estado === 'mal' ? 'border-red-500/60 bg-red-500/15 text-red-300'
                          : estado === 'apagada' ? 'border-white/5 text-white/25'
                            : 'border-white/10 bg-white/5 text-white hover:border-teal-500/40 hover:bg-white/10'
                    }`}>
                    {op}
                  </button>
                )
              })}
            </div>

            <p className="text-white/25 text-[11px] text-center mt-3">
              {aciertos}/{jugadas} · {tr({ es: 'racha', en: 'streak', ca: 'ratxa' })} {racha}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
