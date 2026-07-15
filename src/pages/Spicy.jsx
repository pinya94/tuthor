import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import {
  crearPartida, avanzarMes, elegirOpcion, interpolar,
  patrimonio, patrimonioReal, notaFinanciera, fmt, escala, SENALES,
  MODOS_VIDA, CLASES_INVERSION, cambiarModoVida, invertir, venderActivo, buscarEmpleo,
} from '../lib/spicyEngine'

const SURF = 'rgba(17,20,29,0.86)'
const MESES = {
  es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  en: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
  ca: ['gen', 'feb', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'oct', 'nov', 'des'],
}

export default function Spicy() {
  const { lang, tr, localPath } = useLang()
  const { user } = useAuth()
  const navigate = useNavigate()

  // La partida es un objeto mutable (lo muta el motor). `tick` fuerza el
  // re-render en cada mes simulado; el resto de estados gobiernan las pausas.
  const [partida, setPartida] = useState(null)
  const [, setTick] = useState(0)
  const [fase, setFase] = useState('intro')          // intro | jugando | fin
  const [vista, setVista] = useState(null)           // { logs, evento }
  const [feedback, setFeedback] = useState(null)     // { nota } tras elegir
  const [accion, setAccion] = useState(null)         // null | 'invertir' | 'vender' | 'vida'
  const [accionNota, setAccionNota] = useState(null) // feedback de acciones libres
  const [corriendo, setCorriendo] = useState(false)  // el reloj de la vida avanza
  const [sliderVal, setSliderVal] = useState(0.5)    // deslizador del evento activo
  const logsRef = useRef([])                         // feed acumulado (no re-render por sí solo)
  const savedRef = useRef(false)

  function empezar() {
    const nueva = crearPartida()
    setPartida(nueva)
    savedRef.current = false
    logsRef.current = []
    setFeedback(null)
    setAccion(null)
    setAccionNota(null)
    setVista({ logs: [], evento: null })
    setFase('jugando')
    setCorriendo(true)
  }

  // El reloj: mientras `corriendo` y no haya evento/pausa, avanza un mes cada tijeretazo
  useEffect(() => {
    if (fase !== 'jugando') return
    if (!corriendo || vista?.evento || feedback || accion) return
    const p = partida
    const t = setTimeout(() => {
      const autopsiasAntes = p.autopsias.length
      const r = avanzarMes(p)
      for (const l of r.logs) logsRef.current.push({ edad: p.edad, mes: p.mes, ...l })
      for (const a of p.autopsias.slice(autopsiasAntes)) logsRef.current.push({ edad: a.edad, tipo: 'autopsia', autopsia: a })
      if (logsRef.current.length > 60) logsRef.current = logsRef.current.slice(-60)
      if (r.fin) {
        if (!savedRef.current) {
          savedRef.current = true
          const score = notaFinanciera(p)
          if (user && score > 0) {
            saveActivity(user.uid, {
              type: 'juego', game: 'spicy', score, passed: patrimonioReal(p) > 0,
              timeSpent: 0, coinsEarned: computeCoins('spicy', { score }),
              userName: user.displayName, userPhoto: user.photoURL,
            }).catch(() => {})
          }
        }
        setCorriendo(false); setFase('fin'); return
      }
      if (r.evento) {
        setSliderVal(r.evento.slider?.defecto ?? 0.5)
        setVista({ logs: logsRef.current.slice(), evento: r.evento })
        setCorriendo(false)
        return
      }
      setVista({ logs: logsRef.current.slice(), evento: null })
      setTick(x => x + 1)
    }, 80)
    return () => clearTimeout(t)
  }, [corriendo, fase, vista, feedback, accion, partida, user])

  function elegir(opcion) {
    const res = elegirOpcion(partida, vista.evento, opcion, vista.evento.slider ? sliderVal : undefined)
    if (res?.rechazo) { setAccionNota(res.nota); return }   // no gastó: sigue la decisión abierta
    setFeedback(res ? { ...res, evento: vista.evento } : { nota: null })
  }

  // Tras leer el feedback de una decisión, reanuda el reloj
  function seguir() {
    setFeedback(null)
    setVista(v => ({ ...v, evento: null }))
    setCorriendo(true)
  }

  // Acciones libres: no consumen tiempo, solo dinero/estado. Abrir una pausa el reloj.
  function ejecutarAccion(fn) {
    const res = fn(partida)
    setAccion(null)
    setTick(x => x + 1)
    if (res?.nota) setAccionNota(res.nota)
  }


  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (fase === 'intro') {
    return (
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <SEOHead
          title={tr({ es: 'Spicy — juego de educación financiera', en: 'Spicy — financial education game', ca: 'Spicy — joc d\'educació financera' })}
          description={tr({ es: 'Vive una vida entera tomando decisiones con dinero: ahorro, inflación, inversión, vivienda y timos. Aprende a leer las señales de riesgo jugando.', en: 'Live a whole life making money decisions: saving, inflation, investing, housing and scams. Learn to read risk signals by playing.', ca: 'Viu una vida sencera prenent decisions amb diners: estalvi, inflació, inversió, habitatge i estafes. Aprèn a llegir els senyals de risc jugant.' })}
          path="/juegos/spicy"
        />
        <div className="max-w-md w-full">
          <button onClick={() => navigate(localPath('/juegos'))}
            className="text-white/30 hover:text-white/60 text-sm mb-6 flex items-center gap-1 transition-colors">
            {tr({ es: '← Volver a juegos', en: '← Back to games', ca: '← Tornar a jocs' })}
          </button>
          <div className="text-center mb-8">
            <span className="text-6xl block mb-3">🌶️</span>
            <h1 className="text-3xl font-black text-white mb-2">Spicy</h1>
            <p className="text-white/40 text-sm mb-3">{tr({ es: 'Decisiones que pican', en: 'Decisions with a kick', ca: 'Decisions que piquen' })}</p>
            <p className="text-white/50 text-sm leading-relaxed">
              {tr({
                es: 'Empiezas con 5 años y los meses corren solos. Cuando la vida te planta una decisión, el tiempo se para: ahorrar o gastar, estudiar o trabajar, comprar o alquilar, invertir o esperar. Y mientras el reloj corre, puedes mover tus ahorros cuando quieras. La inflación no descansa — y nadie te dirá los riesgos con números: aprende a leer las señales.',
                en: 'You start at 5 and the months run on their own. When life drops a decision, time stops: save or spend, study or work, buy or rent, invest or wait. And while the clock ticks, you can move your savings whenever you want. Inflation never rests — and nobody tells you the risks in numbers: learn to read the signals.',
                ca: 'Comences amb 5 anys i els mesos corren sols. Quan la vida et planta una decisió, el temps es para: estalviar o gastar, estudiar o treballar, comprar o llogar, invertir o esperar. I mentre el rellotge corre, pots moure els teus estalvis quan vulguis. La inflació no descansa — i ningú et dirà els riscos amb números: aprèn a llegir els senyals.',
              })}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 p-4 mb-6 text-sm text-white/50 space-y-2" style={{ background: SURF }}>
            <p>🎯 {tr({ es: 'Objetivo: acabar con el máximo patrimonio. Ojo: los precios suben toda la vida — lo que cuenta es lo que puedas comprar.', en: 'Goal: end with the most wealth. Careful: prices rise your whole life — what counts is what you can buy.', ca: 'Objectiu: acabar amb el màxim patrimoni. Ull: els preus pugen tota la vida — el que compta és el que puguis comprar.' })}</p>
            <p>🧐 {tr({ es: 'Fíjate en las señales: "garantizado", prisas, sin regular… o entidad seria y diversificada.', en: 'Watch the signals: "guaranteed", urgency, unregulated… or serious and diversified institutions.', ca: 'Fixa\'t en els senyals: "garantit", presses, sense regular… o entitat seriosa i diversificada.' })}</p>
            <p>🌟 {tr({ es: 'Gastar no siempre es perder: hay experiencias que abren caminos que el dinero quieto nunca abrirá.', en: 'Spending isn\'t always losing: some experiences open paths that idle money never will.', ca: 'Gastar no sempre és perdre: hi ha experiències que obren camins que els diners aturats mai obriran.' })}</p>
            <p>🔁 {tr({ es: 'Cada vida es distinta: crisis, burbujas y golpes de suerte cambian en cada partida.', en: 'Every life is different: crises, bubbles and strokes of luck change every run.', ca: 'Cada vida és diferent: crisis, bombolles i cops de sort canvien a cada partida.' })}</p>
          </div>
          <button onClick={empezar}
            className="w-full bg-[#EDAE49] hover:bg-amber-400 text-black font-black py-4 text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-amber-500/30">
            {tr({ es: 'Nacer 👶', en: 'Be born 👶', ca: 'Néixer 👶' })}
          </button>
        </div>
      </div>
    )
  }

  const p = partida

  // ── FIN ────────────────────────────────────────────────────────────────────
  if (fase === 'fin') {
    const nota = notaFinanciera(p)
    const real = Math.round(patrimonioReal(p))
    const mejores = p.autopsias.filter(a => a.tipo === 'buena')
    const peores = p.autopsias.filter(a => a.tipo === 'mala')
    const shareText = tr({
      es: `He jugado a Spicy en Tuthor: ${p.edadFinal} años y un patrimonio de ${fmt(real)} (en euros de hoy) 💰🌶️ ¿Gestionas tú mejor una vida? https://tuthor.es/juegos/spicy`,
      en: `I played Spicy on Tuthor: ${p.edadFinal} years and ${fmt(real)} in today's money 💰🌶️ Can you manage a life better? https://tuthor.es/juegos/spicy`,
      ca: `He jugat a Spicy a Tuthor: ${p.edadFinal} anys i un patrimoni de ${fmt(real)} (en euros d'avui) 💰🌶️ Gestiones tu millor una vida? https://tuthor.es/juegos/spicy`,
    })
    return (
      <GameEndScreen
        game="spicy"
        emoji="🌶️"
        title={tr({ es: `Una vida completa — ${p.edadFinal} años`, en: `A full life — ${p.edadFinal} years`, ca: `Una vida completa — ${p.edadFinal} anys` })}
        score={nota}
        scoreLabel={{ es: 'nota financiera', en: 'financial score', ca: 'nota financera' }}
        message={tr(
          real >= 180000 && p.bienestar >= 60 ? { es: '🏆 Rico y con una vida bien vivida — la partida redonda', en: '🏆 Wealthy and a life well lived — the perfect run', ca: '🏆 Ric i amb una vida ben viscuda — la partida rodona' }
          : real >= 180000 && p.bienestar < 35 ? { es: '💼 Rico… y hecho polvo. ¿Para quién era todo ese dinero?', en: '💼 Rich… and worn out. Who was all that money for?', ca: '💼 Ric… i fet pols. Per a qui eren tots aquests diners?' }
          : real >= 180000 ? { es: '💰 Patrimonio sólido… aunque algo austero. ¿Te dejaste vivir?', en: '💰 Solid wealth… though a bit austere. Did you let yourself live?', ca: '💰 Patrimoni sòlid… encara que una mica auster. Et vas deixar viure?' }
          : real >= 45000 && p.bienestar >= 60 ? { es: '👍 Equilibrio entre cartera y vida — así se hace', en: '👍 Balance between wallet and life — that\'s how it\'s done', ca: '👍 Equilibri entre cartera i vida — així es fa' }
          : real >= 45000 ? { es: '👍 Una vida financiera razonable', en: '👍 A reasonable financial life', ca: '👍 Una vida financera raonable' }
          : real > 0 && p.bienestar >= 65 ? { es: '🌟 Una vida riquísima en experiencias, justita de cartera', en: '🌟 A life rich in experiences, tight on wallet', ca: '🌟 Una vida riquíssima en experiències, justeta de cartera' }
          : real > 0 ? { es: 'Llegaste justo — la próxima vida, empieza a ahorrar antes', en: 'You barely made it — next life, start saving earlier', ca: 'Vas arribar just — la pròxima vida, comença a estalviar abans' }
          : { es: '💸 Acabaste en números rojos. Cada vida enseña algo', en: '💸 You ended in the red. Every life teaches something', ca: '💸 Vas acabar en números vermells. Cada vida ensenya alguna cosa' }
        )}
        stats={[
          { label: tr({ es: 'Poder de compra', en: 'Purchasing power', ca: 'Poder de compra' }), value: fmt(real), emoji: '💰' },
          { label: tr({ es: 'Bienestar', en: 'Wellbeing', ca: 'Benestar' }), value: `${p.bienestar}/100`, emoji: '❤️' },
          { label: tr({ es: 'Experiencias vividas', en: 'Experiences lived', ca: 'Experiències viscudes' }), value: p.experiencias.length, emoji: '🌟' },
          { label: tr({ es: 'Decisiones', en: 'Decisions', ca: 'Decisions' }), value: p.historial.length, emoji: '🧭' },
        ]}
        shareText={shareText}
        onPlayAgain={empezar}
        playAgainLabel={tr({ es: '🔁 Vivir otra vida', en: '🔁 Live another life', ca: '🔁 Viure una altra vida' })}
        secondaryActions={[{ label: tr({ es: 'Volver a juegos', en: 'Back to games', ca: 'Tornar a jocs' }), onClick: () => navigate(localPath('/juegos')) }]}
        user={user} lang={lang}
      >
        <p className="text-white/40 text-xs mt-4 leading-relaxed">
          {tr({
            es: `Tu cuenta marca ${fmt(patrimonio(p))}, pero los precios se han multiplicado x${p.indice.toFixed(1).replace('.', ',')} desde que naciste: ese dinero compra lo que ${fmt(real)} compraban entonces. Eso es la inflación.`,
            en: `Your account shows ${fmt(patrimonio(p))}, but prices have multiplied x${p.indice.toFixed(1)} since you were born: that money buys what ${fmt(real)} bought back then. That's inflation.`,
            ca: `El teu compte marca ${fmt(patrimonio(p))}, però els preus s'han multiplicat x${p.indice.toFixed(1).replace('.', ',')} des que vas néixer: aquests diners compren el que ${fmt(real)} compraven llavors. Això és la inflació.`,
          })}
        </p>
        {p.experiencias.length > 0 && (
          <p className="text-white/50 text-xs mt-3">
            🌟 {p.experiencias.map(e => tr(e.titulo)).join(' · ')}
          </p>
        )}
        {(mejores.length > 0 || peores.length > 0) && (
          <div className="mt-5 text-left space-y-2">
            {[...peores.slice(0, 2), ...mejores.slice(0, 2)].map((a, i) => (
              <div key={i} className={`rounded-xl border p-3 ${a.tipo === 'mala' ? 'border-red-500/25 bg-red-500/10' : 'border-emerald-500/25 bg-emerald-500/10'}`}>
                <p className="text-white font-bold text-sm mb-0.5">{a.tipo === 'mala' ? '📉' : '🌱'} {tr(a.titulo)} · {a.edad} {tr({ es: 'años', en: 'y/o', ca: 'anys' })}</p>
                <p className="text-white/60 text-xs leading-relaxed">{tr(a.texto)}</p>
              </div>
            ))}
          </div>
        )}
      </GameEndScreen>
    )
  }

  // ── JUGANDO ────────────────────────────────────────────────────────────────
  const activosVivos = p.activos.filter(a => a.estado === 'vivo')
  const vendibles = activosVivos.filter(a => ['fondo', 'acciones', 'cripto', 'coleccion', 'deposito'].includes(a.tipo))
  const real = Math.round(patrimonioReal(p))
  const vidaPct = Math.min(100, Math.round(((p.edad - 5) / (p.edadFinal - 5)) * 100))
  const cuotasMes = (p.hipoteca?.cuota ?? 0) / 12 + (p.prestamos ?? []).reduce((a, pr) => a + pr.cuotaMes, 0)
  const extraEstudios = p.estudios?.mediaJornada ? escala(p, 6000) : 0
  const netoMes = Math.round((p.ingresos + extraEstudios - p.gastos - p.alquilerAnual) / 12 - cuotasMes)
  const mesLabel = (MESES[lang] ?? MESES.es)[p.mes]
  const ev = vista?.evento
  const respondido = feedback !== null

  return (
    <div className="relative z-10 px-4 py-6 max-w-2xl mx-auto">
      {/* HUD */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        <div className="rounded-xl border border-white/10 py-2 px-3" style={{ background: SURF }}>
          <p className="text-white/30 text-[9px] uppercase tracking-wider font-semibold">{tr({ es: 'Edad', en: 'Age', ca: 'Edat' })}</p>
          <p className="text-white font-black text-xl leading-tight">{p.edad} <span className="text-white/30 text-xs font-semibold">· {mesLabel}</span></p>
          <div className="h-1 bg-white/10 rounded-full mt-1">
            <div className="h-1 rounded-full bg-[#EDAE49]" style={{ width: `${vidaPct}%` }} />
          </div>
        </div>
        <div className="rounded-xl border border-white/10 py-2 px-3" style={{ background: SURF }}>
          <p className="text-white/30 text-[9px] uppercase tracking-wider font-semibold">❤️ {tr({ es: 'Bienestar', en: 'Wellbeing', ca: 'Benestar' })}</p>
          <p className={`font-black text-xl leading-tight ${p.bienestar >= 60 ? 'text-emerald-300' : p.bienestar >= 35 ? 'text-amber-300' : 'text-red-400'}`}>{p.bienestar}</p>
          <div className="h-1 bg-white/10 rounded-full mt-1">
            <div className={`h-1 rounded-full ${p.bienestar >= 60 ? 'bg-emerald-400' : p.bienestar >= 35 ? 'bg-amber-400' : 'bg-red-500'}`} style={{ width: `${p.bienestar}%` }} />
          </div>
        </div>
        <div className="rounded-xl border border-white/10 py-2 px-3" style={{ background: SURF }}>
          <p className="text-white/30 text-[9px] uppercase tracking-wider font-semibold">{tr({ es: 'Dinero', en: 'Cash', ca: 'Diners' })}</p>
          <p className={`font-black text-lg leading-tight ${p.dinero < 0 ? 'text-red-400' : 'text-white'}`}>{fmt(p.dinero)}</p>
          <p className={`text-[10px] ${netoMes >= 0 ? 'text-emerald-400/60' : 'text-red-400/70'}`}>
            {netoMes >= 0 ? '+' : ''}{fmt(netoMes)}/{tr({ es: 'mes', en: 'mo', ca: 'mes' })} {tr({ es: 'tras gastos', en: 'after costs', ca: 'després de despeses' })}
          </p>
        </div>
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 py-2 px-3">
          <p className="text-amber-400/70 text-[9px] uppercase tracking-wider font-semibold">{tr({ es: 'Patrimonio', en: 'Wealth', ca: 'Patrimoni' })}</p>
          <p className="text-amber-300 font-black text-lg leading-tight">{fmt(patrimonio(p))}</p>
          <p className="text-white/25 text-[10px]">🛒 {tr({ es: 'compra como', en: 'buys like', ca: 'compra com' })} {fmt(real)}</p>
        </div>
      </div>

      {/* Cartera con evolución */}
      {(activosVivos.length > 0 || p.hipoteca) && (
        <div className="rounded-xl border border-white/10 px-3 py-2 mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ background: SURF }}>
          {activosVivos.map(a => {
            const cambio = a.invertido > 0 ? Math.round((a.valor / a.invertido - 1) * 100) : 0
            const conMercado = ['fondo', 'acciones', 'cripto', 'coleccion', 'deposito'].includes(a.tipo)
            return (
              <span key={a.id} className="text-white/50">
                {a.tipo === 'casa' ? '🏠' : a.tipo === 'fondo' ? '📈' : a.tipo === 'acciones' ? '📊' : a.tipo === 'cripto' ? '🪙' : a.tipo === 'coleccion' ? '🃏' : a.tipo === 'deposito' ? '🏦' : a.tipo === 'negocio' ? '🏪' : '❓'}{' '}
                {tr(a.nombre)}: <span className="text-white/80 font-semibold">{fmt(a.valor)}</span>
                {conMercado && <span className={`ml-1 font-semibold ${cambio >= 0 ? 'text-emerald-400/80' : 'text-red-400/80'}`}>{cambio >= 0 ? '▲' : '▼'}{Math.abs(cambio)}%</span>}
              </span>
            )
          })}
          {p.hipoteca && (
            <span className="text-white/50">📋 {tr({ es: 'Hipoteca pendiente', en: 'Mortgage left', ca: 'Hipoteca pendent' })}: <span className="text-red-300/80 font-semibold">-{fmt(p.hipoteca.pendiente)}</span></span>
          )}
          {(p.prestamos ?? []).map((pr, i) => (
            <span key={i} className="text-white/50">💳 {tr({ es: 'Préstamo', en: 'Loan', ca: 'Préstec' })}: <span className="text-red-300/80 font-semibold">-{fmt(pr.pendiente)}</span></span>
          ))}
        </div>
      )}

      {/* Barra de acciones libres — se desbloquean cuando la vida te las presenta */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {p.flags.includes('sabe-invertir') && (
          <button onClick={() => { setAccion(accion === 'invertir' ? null : 'invertir'); setAccionNota(null) }}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${accion === 'invertir' ? 'bg-amber-500/25 border-amber-500/50 text-amber-300' : 'bg-white/5 border-white/10 text-white/60 hover:text-white'}`}>
            📈 {tr({ es: 'Invertir', en: 'Invest', ca: 'Invertir' })}
          </button>
        )}
        {p.flags.includes('sabe-invertir') && vendibles.length > 0 && (
          <button onClick={() => { setAccion(accion === 'vender' ? null : 'vender'); setAccionNota(null) }}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${accion === 'vender' ? 'bg-amber-500/25 border-amber-500/50 text-amber-300' : 'bg-white/5 border-white/10 text-white/60 hover:text-white'}`}>
            💸 {tr({ es: 'Vender', en: 'Sell', ca: 'Vendre' })}
          </button>
        )}
        {p.edad >= 18 && (
          <button onClick={() => { setAccion(accion === 'vida' ? null : 'vida'); setAccionNota(null) }}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${accion === 'vida' ? 'bg-amber-500/25 border-amber-500/50 text-amber-300' : 'bg-white/5 border-white/10 text-white/60 hover:text-white'}`}>
            {MODOS_VIDA[p.modoVida].emoji} {tr({ es: 'Nivel de gasto', en: 'Spending level', ca: 'Nivell de despesa' })}: {tr(MODOS_VIDA[p.modoVida].label)}
          </button>
        )}
        {p.edad >= 16 && p.ingresos > 0 && !p.estudios && !p.flags.includes('jubilado') && (
          <button onClick={() => ejecutarAccion(pp => buscarEmpleo(pp))}
            className="text-xs font-bold px-3 py-1.5 rounded-lg border bg-white/5 border-white/10 text-white/60 hover:text-white transition-colors">
            💼 {tr({ es: 'Buscar otro empleo', en: 'Look for another job', ca: 'Buscar una altra feina' })}
          </button>
        )}
      </div>

      {/* Panel de acción abierta */}
      {accion === 'invertir' && (
        <div className="rounded-xl border border-white/10 p-3 mb-3 space-y-2" style={{ background: SURF }}>
          <p className="text-white/40 text-xs">{tr({ es: `Dinero disponible: ${fmt(p.dinero)}. Elige clase y cuánto:`, en: `Available cash: ${fmt(p.dinero)}. Pick a class and how much:`, ca: `Diners disponibles: ${fmt(p.dinero)}. Tria classe i quant:` })}</p>
          {Object.entries(CLASES_INVERSION).map(([clase, def]) => (
            <div key={clase} className="flex flex-wrap items-center gap-1.5">
              <span className="text-white/70 text-xs font-semibold w-36">{def.emoji} {tr(def.label)}</span>
              <span className="text-white/25 text-[10px] mr-1">{def.senales.map(s => SENALES[s]?.emoji).join('')}</span>
              {[0.25, 0.5, 0.9].map(f => {
                const importe = Math.floor(p.dinero * f)
                return (
                  <button key={f} disabled={importe < 50}
                    onClick={() => ejecutarAccion(pp => invertir(pp, clase, importe))}
                    className="text-[11px] font-bold px-2 py-1 rounded bg-white/10 hover:bg-amber-500/25 border border-white/10 text-white/70 disabled:opacity-25 transition-colors">
                    {Math.round(f * 100)}% ({fmt(importe)})
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      )}
      {accion === 'vender' && (
        <div className="rounded-xl border border-white/10 p-3 mb-3 space-y-1.5" style={{ background: SURF }}>
          {vendibles.map(a => (
            <button key={a.id} onClick={() => ejecutarAccion(pp => venderActivo(pp, a.id))}
              className="w-full text-left text-xs font-semibold px-3 py-2 rounded-lg bg-white/5 hover:bg-amber-500/20 border border-white/10 text-white/70 transition-colors">
              {tr(a.nombre)} — {tr({ es: 'vender por', en: 'sell for', ca: 'vendre per' })} ~{fmt(a.valor * (a.tipo === 'coleccion' ? 0.85 : 1))}
              {a.tipo === 'coleccion' && <span className="text-white/35"> ({tr({ es: 'con descuento de iliquidez', en: 'illiquidity haircut applied', ca: 'amb descompte d\'iliquiditat' })})</span>}
            </button>
          ))}
        </div>
      )}
      {accion === 'vida' && (
        <div className="rounded-xl border border-white/10 p-3 mb-3 flex flex-wrap gap-1.5" style={{ background: SURF }}>
          {Object.entries(MODOS_VIDA).map(([modo, def]) => (
            <button key={modo} disabled={modo === p.modoVida}
              onClick={() => ejecutarAccion(pp => cambiarModoVida(pp, modo))}
              className={`text-xs font-bold px-3 py-2 rounded-lg border transition-colors ${modo === p.modoVida ? 'bg-amber-500/25 border-amber-500/50 text-amber-300' : 'bg-white/5 border-white/10 text-white/60 hover:text-white'}`}>
              {def.emoji} {tr(def.label)} ({Math.round((def.factor - 1) * 100) >= 0 ? '+' : ''}{Math.round((def.factor - 1) * 100)}%)
            </button>
          ))}
        </div>
      )}
      {accionNota && (
        <div className="rounded-xl border border-white/15 bg-white/5 p-3 mb-3">
          <p className="text-white/60 text-xs leading-relaxed">{tr(accionNota)}</p>
        </div>
      )}

      {/* Feed de años */}
      {vista?.logs.length > 0 && (
        <div className="space-y-2 mb-4 max-h-56 overflow-y-auto pr-1">
          {vista.logs.map((l, i) => l.tipo === 'autopsia' ? (
            <div key={i} className={`rounded-xl border p-3 ${l.autopsia.tipo === 'mala' ? 'border-red-500/25 bg-red-500/10' : l.autopsia.tipo === 'buena' ? 'border-emerald-500/25 bg-emerald-500/10' : 'border-amber-500/25 bg-amber-500/10'}`}>
              <p className="text-white font-bold text-xs mb-1">💡 {tr({ es: 'Lección', en: 'Lesson', ca: 'Lliçó' })} — {tr(l.autopsia.titulo)}</p>
              <p className="text-white/60 text-xs leading-relaxed">{tr(l.autopsia.texto)}</p>
              {l.autopsia.senales?.length > 0 && (
                <p className="text-white/35 text-[10px] mt-1.5">
                  {tr({ es: 'Señales que había', en: 'The signals were', ca: 'Els senyals eren' })}: {l.autopsia.senales.map(s => `${SENALES[s]?.emoji ?? ''} ${tr(SENALES[s]?.label ?? {})}`).join(' · ')}
                </p>
              )}
            </div>
          ) : (
            <div key={i} className="flex gap-2 items-start text-sm">
              <span className="text-white/25 text-[11px] font-bold tabular-nums shrink-0 mt-0.5 w-12">
                {l.edad}<span className="text-white/15 font-medium">·{(MESES[lang] ?? MESES.es)[l.mes ?? 0]}</span>
              </span>
              <p className={`leading-snug ${l.tipo === 'malo' ? 'text-red-300/80' : l.tipo === 'bueno' ? 'text-emerald-300/80' : 'text-white/55'}`}>{tr(l.texto)}</p>
            </div>
          ))}
        </div>
      )}

      {/* Carta de decisión */}
      {ev && !respondido && (
        <div className="rounded-2xl border-2 border-[#EDAE49]/50 p-5" style={{ background: SURF }}>
          <p className="text-amber-400/70 text-[10px] uppercase tracking-widest font-semibold mb-2">
            {tr({ es: 'Decisión', en: 'Decision', ca: 'Decisió' })} · {p.edad} {tr({ es: 'años', en: 'years old', ca: 'anys' })}
          </p>
          <p className="text-white leading-relaxed mb-3">{tr(interpolar(p, ev, ev.texto))}</p>
          {ev.senales?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {ev.senales.map(s => (
                <span key={s} className="text-[10px] font-semibold bg-white/5 border border-white/10 text-white/50 px-2 py-0.5 rounded-full">
                  {SENALES[s]?.emoji} {tr(SENALES[s]?.label ?? {})}
                </span>
              ))}
            </div>
          )}
          {/* Deslizador de reparto (p. ej. la paga) */}
          {ev.slider && (
            <div className="mb-4">
              <div className="flex justify-between text-[11px] text-white/40 mb-1">
                <span>{tr(ev.slider.izq)}</span>
                <span>{tr(ev.slider.der)}</span>
              </div>
              <input type="range" min="0" max="100" value={Math.round(sliderVal * 100)}
                onChange={e => setSliderVal(Number(e.target.value) / 100)}
                className="w-full accent-[#EDAE49]" />
              <p className="text-center text-amber-300 font-bold text-sm mt-1">
                {tr(ev.slider.etiqueta)}: {Math.round(sliderVal * 100)}%
              </p>
            </div>
          )}
          <div className="space-y-2">
            {ev.opciones.map(op => (
              <button key={op.id} onClick={() => elegir(op)}
                className="w-full text-left bg-white/10 hover:bg-white/20 border border-white/15 hover:border-amber-500/40 text-white font-semibold px-4 py-3 rounded-xl transition-all">
                {tr(interpolar(p, ev, op.texto))}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Feedback tras decidir */}
      {respondido && feedback?.nota && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 mb-4">
          <p className="text-amber-100/90 text-sm leading-relaxed">{tr(interpolar(p, feedback.evento, feedback.nota))}</p>
        </div>
      )}

      {/* Tras una decisión: reanudar la vida */}
      {respondido && (
        <button onClick={seguir}
          className="w-full bg-[#EDAE49] hover:bg-amber-400 text-black font-black py-4 rounded-2xl transition-all hover:scale-[1.01] mt-1">
          {tr({ es: 'Seguir viviendo →', en: 'Keep living →', ca: 'Seguir vivint →' })}
        </button>
      )}

      {/* Control del reloj cuando la vida fluye (sin evento pendiente) */}
      {!ev && !respondido && (
        <div className="flex items-center gap-3 mt-1">
          <button onClick={() => setCorriendo(c => !c)}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-2xl transition-all">
            {corriendo ? tr({ es: '⏸ Pausar el tiempo', en: '⏸ Pause time', ca: '⏸ Pausar el temps' })
                       : tr({ es: '▶ Dejar correr la vida', en: '▶ Let life run', ca: '▶ Deixar córrer la vida' })}
          </button>
          {corriendo && <span className="text-white/25 text-xs animate-pulse whitespace-nowrap">{tr({ es: 'pasan los meses…', en: 'months tick by…', ca: 'passen els mesos…' })}</span>}
        </div>
      )}
    </div>
  )
}
