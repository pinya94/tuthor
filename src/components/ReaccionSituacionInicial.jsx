import { useLang } from '../context/LangContext'
import { DISCLAIMER } from '../data/reaccionCasos'
import { RELOJ_INICIAL_MS, ACIERTO_MS, FALLO_MS } from '../lib/reaccionArcade'
import { CabeceraJuego, ComoSeJuega, IconoIntro } from './IntroJuego'

// Pantalla de inicio del arcade, con el formato común de las entradas: dibujo,
// una frase, botón de jugar y las reglas plegadas en "¿Cómo se juega?". El
// aviso de que no sustituye una formación oficial se queda siempre a la vista. Los segundos se leen de reaccionArcade.js para que este
// texto nunca se desincronice de los números reales del juego.
export default function ReaccionSituacionInicial({ onEmpezar, mejorPuntuacion }) {
  const { tr } = useLang()
  const inicioS = Math.round(RELOJ_INICIAL_MS / 1000)
  const aciertoS = Math.round(ACIERTO_MS / 1000)
  const falloS = Math.round(FALLO_MS / 1000)

  return (
    <div className="max-w-md w-full mx-auto">
      <CabeceraJuego slug="reaccion"
        badge={tr({ es: 'Salud · Primeros auxilios', en: 'Health · First aid', ca: 'Salut · Primers auxilis' })}
        titulo="Reacción"
        sub={tr({ es: 'Casos de emergencia uno tras otro: decide rápido.', en: 'Emergency cases one after another: decide fast.', ca: 'Casos d’emergència un darrere l’altre: decideix ràpid.' })} />
      {mejorPuntuacion > 0 && (
        <p className="text-center text-amber-400 text-sm font-bold -mt-3 mb-4">
          {tr({ es: 'Mejor puntuación', en: 'Best score', ca: 'Millor puntuació' })}: {mejorPuntuacion}
        </p>
      )}

      <button
        onClick={onEmpezar}
        className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/30 mb-3"
      >
        {tr({ es: '¡Reacciona!', en: 'React!', ca: 'Reacciona!' })}
      </button>
      <p className="text-amber-300/70 text-[11px] leading-snug text-center mb-1">{tr(DISCLAIMER)}</p>
      <ComoSeJuega>
        <div className="bg-[#141b2e] border border-white/[0.08] rounded-2xl p-4 space-y-2.5 text-sm text-white/60">
          <div className="flex items-start gap-3"><IconoIntro emoji="⏱️" /><span>{tr({ es: `Un reloj corre siempre: empieza en ${inicioS}s, acertar suma ${aciertoS}s y fallar resta ${falloS}s`, en: `A clock always runs: it starts at ${inicioS}s, a right answer adds ${aciertoS}s and a wrong one costs ${falloS}s`, ca: `Un rellotge corre sempre: comença en ${inicioS}s, encertar suma ${aciertoS}s i fallar resta ${falloS}s` })}</span></div>
          <div className="flex items-start gap-3"><IconoIntro emoji="🔴" /><span>{tr({ es: 'Una decisión peligrosa cuesta lo mismo que cualquier otro fallo, pero queda marcada aparte al final', en: 'A dangerous choice costs the same as any other mistake, but it’s flagged separately at the end', ca: 'Una decisió perillosa costa el mateix que qualsevol altre error, però queda marcada a part al final' })}</span></div>
          <div className="flex items-start gap-3"><IconoIntro emoji="🎁" /><span>{tr({ es: 'Cada 5 aciertos eliges una mejora (más tiempo, un escudo o más puntos)', en: 'Every 5 correct answers you pick an upgrade (more time, a shield or more points)', ca: 'Cada 5 encerts tries una millora (més temps, un escut o més punts)' })}</span></div>
          <div className="flex items-start gap-3"><IconoIntro emoji="⏳" /><span>{tr({ es: 'La partida acaba cuando el reloj llega a 0 — o si resuelves todos los casos', en: 'The run ends when the clock hits 0 — or if you resolve every case', ca: 'La partida s’acaba quan el rellotge arriba a 0 — o si resols tots els casos' })}</span></div>
        </div>
      </ComoSeJuega>
    </div>
  )
}
