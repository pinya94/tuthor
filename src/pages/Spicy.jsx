import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import {
  crearPartida, avanzarAño, elegirOpcion, interpolar,
  patrimonio, patrimonioReal, notaFinanciera, fmt, SENALES,
} from '../lib/spicyEngine'

const SURF = 'rgba(17,20,29,0.86)'

export default function Spicy() {
  const { lang, tr, localPath } = useLang()
  const { user } = useAuth()
  const navigate = useNavigate()

  const partidaRef = useRef(null)
  const [fase, setFase] = useState('intro')          // intro | jugando | fin
  const [vista, setVista] = useState(null)           // { logs, evento, spanDesde }
  const [feedback, setFeedback] = useState(null)     // { nota } tras elegir
  const savedRef = useRef(false)

  function empezar() {
    partidaRef.current = crearPartida()
    savedRef.current = false
    setFeedback(null)
    setFase('jugando')
    continuar(true)
  }

  // Avanza años hasta la siguiente decisión (o el final), acumulando el feed
  function continuar(primera = false) {
    const p = partidaRef.current
    const logs = []
    const spanDesde = p.edad + 1
    const autopsiasAntes = p.autopsias.length
    let evento = null
    for (;;) {
      const r = avanzarAño(p)
      for (const l of r.logs) logs.push({ edad: p.edad, ...l })
      if (r.fin) {
        guardar(p)
        setFase('fin')
        return
      }
      if (r.evento) { evento = r.evento; break }
      if (p.edad - spanDesde > 25) break // red de seguridad
    }
    // Autopsias generadas durante el avance → tarjetas de lección en el feed
    for (const a of p.autopsias.slice(autopsiasAntes)) {
      logs.push({ edad: a.edad, tipo: 'autopsia', autopsia: a })
    }
    setFeedback(null)
    setVista({ logs, evento, spanDesde, spanHasta: p.edad, primera })
  }

  function elegir(opcion) {
    const p = partidaRef.current
    const res = elegirOpcion(p, vista.evento, opcion)
    setFeedback(res ? { ...res, evento: vista.evento } : { nota: null })
  }

  function guardar(p) {
    if (savedRef.current) return
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
                es: 'De la hucha de los 8 años a la jubilación. Cada año pueden aparecer decisiones: ahorrar o gastar, comprar o alquilar, invertir o pasar. La inflación corre siempre — y nadie te dirá los riesgos con números: aprende a leer las señales.',
                en: 'From the piggy bank at 8 to retirement. Each year decisions may appear: save or spend, buy or rent, invest or pass. Inflation never stops — and nobody tells you the risks in numbers: learn to read the signals.',
                ca: 'De la guardiola dels 8 anys a la jubilació. Cada any poden aparèixer decisions: estalviar o gastar, comprar o llogar, invertir o passar. La inflació corre sempre — i ningú et dirà els riscos amb números: aprèn a llegir els senyals.',
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

  const p = partidaRef.current

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
          real >= 300000 && p.bienestar >= 60 ? { es: '🏆 Rico y con una vida bien vivida — la partida redonda', en: '🏆 Wealthy and a life well lived — the perfect run', ca: '🏆 Ric i amb una vida ben viscuda — la partida rodona' }
          : real >= 300000 && p.bienestar < 35 ? { es: '💼 Rico… y hecho polvo. ¿Para quién era todo ese dinero?', en: '💼 Rich… and worn out. Who was all that money for?', ca: '💼 Ric… i fet pols. Per a qui eren tots aquests diners?' }
          : real >= 300000 ? { es: '💰 Patrimonio sólido… aunque algo austero. ¿Te dejaste vivir?', en: '💰 Solid wealth… though a bit austere. Did you let yourself live?', ca: '💰 Patrimoni sòlid… encara que una mica auster. Et vas deixar viure?' }
          : real >= 60000 && p.bienestar >= 60 ? { es: '👍 Equilibrio entre cartera y vida — así se hace', en: '👍 Balance between wallet and life — that\'s how it\'s done', ca: '👍 Equilibri entre cartera i vida — així es fa' }
          : real >= 60000 ? { es: '👍 Una vida financiera razonable', en: '👍 A reasonable financial life', ca: '👍 Una vida financera raonable' }
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
  const real = Math.round(patrimonioReal(p))
  const vidaPct = Math.min(100, Math.round(((p.edad - 6) / (p.edadFinal - 6)) * 100))
  const cuotasAnual = (p.hipoteca?.cuota ?? 0) + (p.prestamos ?? []).reduce((a, pr) => a + pr.cuota, 0)
  const netoMes = Math.round((p.ingresos - p.gastos - p.alquilerAnual - cuotasAnual) / 12)
  const ev = vista?.evento
  const respondido = feedback !== null

  return (
    <div className="relative z-10 px-4 py-6 max-w-2xl mx-auto">
      {/* HUD */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        <div className="rounded-xl border border-white/10 py-2 px-3" style={{ background: SURF }}>
          <p className="text-white/30 text-[9px] uppercase tracking-wider font-semibold">{tr({ es: 'Edad', en: 'Age', ca: 'Edat' })}</p>
          <p className="text-white font-black text-xl leading-tight">{p.edad}</p>
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

      {/* Cartera */}
      {(activosVivos.length > 0 || p.hipoteca) && (
        <div className="rounded-xl border border-white/10 px-3 py-2 mb-4 flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ background: SURF }}>
          {activosVivos.map(a => (
            <span key={a.id} className="text-white/50">
              {a.tipo === 'casa' ? '🏠' : a.tipo === 'fondo' ? '📈' : a.tipo === 'deposito' ? '🏦' : a.tipo === 'negocio' ? '🏪' : a.tipo === 'cromo' ? '🃏' : '❓'}{' '}
              {tr(a.nombre)}: <span className="text-white/80 font-semibold">{fmt(a.valor)}</span>
            </span>
          ))}
          {p.hipoteca && (
            <span className="text-white/50">📋 {tr({ es: 'Hipoteca pendiente', en: 'Mortgage left', ca: 'Hipoteca pendent' })}: <span className="text-red-300/80 font-semibold">-{fmt(p.hipoteca.pendiente)}</span></span>
          )}
          {(p.prestamos ?? []).map((pr, i) => (
            <span key={i} className="text-white/50">💳 {tr({ es: 'Préstamo', en: 'Loan', ca: 'Préstec' })}: <span className="text-red-300/80 font-semibold">-{fmt(pr.pendiente)}</span></span>
          ))}
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
              <span className="text-white/25 text-xs font-bold tabular-nums shrink-0 mt-0.5">{l.edad}</span>
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

      {/* Continuar */}
      {(respondido || !ev) && (
        <button onClick={() => continuar()}
          className="w-full bg-[#EDAE49] hover:bg-amber-400 text-black font-black py-4 rounded-2xl transition-all hover:scale-[1.01] mt-1">
          {tr({ es: 'Seguir viviendo →', en: 'Keep living →', ca: 'Seguir vivint →' })}
        </button>
      )}
    </div>
  )
}
