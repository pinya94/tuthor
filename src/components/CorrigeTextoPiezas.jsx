import { useLang } from '../context/LangContext'
import { familiasDe } from '../lib/corrigeTexto'

// Las tres piezas de Corrige el Texto que comparten el juego y su examen: el
// texto donde se marcan las palabras, el recuento de un texto ya corregido y
// el repaso falta por falta. Viven aparte para que un mismo texto se vea y se
// corrija igual en los dos sitios; encima, el juego pone el reloj y el examen
// la nota.

const C = {
  encontrados: { es: 'Encontrados', en: 'Found', ca: 'Trobats' },
  escapados: { es: 'Se te escaparon', en: 'Missed', ca: "Se t'han escapat" },
  deMas: { es: 'Marcadas de más', en: 'Marked by mistake', ca: 'Marcades de més' },
  eraAsi: { es: 'era', en: 'should be', ca: 'era' },
  // 'esta estaba bien' no: en un juego de tildes, un demostrativo sin acento
  // al lado de la palabra corregida invita a discutir justo lo que no toca.
  estaBien: { es: 'está bien escrita', en: 'this one is fine', ca: 'està ben escrita' },
}

// Color de cada palabra. Mientras se marca solo hay dos estados; al corregir,
// se ve todo a la vez: lo cazado, lo que se escapó y lo marcado de más.
function clase(t, marcada, revisando) {
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

export function TextoMarcable({ ronda, marcadas, revisando, onAlternar }) {
  return (
    <div className="w-full max-w-[620px] rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 mb-3">
      <p className="text-white/85 text-[17px] sm:text-lg leading-[2]">
        {ronda.tokens.map((t, i) => (t.palabra
          ? <span key={i} onClick={revisando ? undefined : () => onAlternar(i)} className={clase(t, marcadas.has(i), revisando)}>{t.s}</span>
          : <span key={i}>{t.s}</span>
        ))}
      </p>
    </div>
  )
}

export function ResumenRonda({ res }) {
  const { tr } = useLang()
  return (
    <div className="grid grid-cols-3 gap-2 text-center">
      <div className="rounded-xl bg-green-500/15 border border-green-500/30 py-2">
        <p className="text-green-400 text-xl font-black">{res.encontrados}</p>
        <p className="text-white/50 text-[11px]">{tr(C.encontrados)}</p>
      </div>
      <div className="rounded-xl bg-red-500/15 border border-red-500/30 py-2">
        <p className="text-red-400 text-xl font-black">{res.sinMarcar}</p>
        <p className="text-white/50 text-[11px]">{tr(C.escapados)}</p>
      </div>
      <div className="rounded-xl bg-orange-500/15 border border-orange-500/30 py-2">
        <p className="text-orange-400 text-xl font-black">{res.deMas}</p>
        <p className="text-white/50 text-[11px]">{tr(C.deMas)}</p>
      </div>
    </div>
  )
}

// Una línea por falta del texto, con la palabra buena y la regla de su
// familia: el repaso es donde se aprende, no el marcar. Las familias salen del
// idioma de la RONDA, no del de la interfaz: un texto inglés se corrige con
// reglas del inglés aunque la pantalla esté en castellano.
export function RepasoFallos({ ronda, marcadas }) {
  const { tr } = useLang()
  const familias = familiasDe(ronda.idioma)
  return (
    <div className="space-y-1.5">
      {ronda.tokens.map((t, i) => (t.error ? (
        <div key={i} className="rounded-xl px-3 py-2 bg-white/5 border border-white/10">
          <p className="text-sm">
            <span className="text-red-400 line-through">{t.s}</span>
            <span className="text-white/40"> · {tr(C.eraAsi)} </span>
            <span className="text-green-400 font-bold">{t.correcta}</span>
            {!marcadas.has(i) && <span className="text-white/30 text-xs"> 🙈</span>}
          </p>
          <p className="text-white/50 text-xs mt-0.5">
            {familias[t.familia].emoji} <span className="text-white/70 font-semibold">{tr(familias[t.familia].label)}</span> · {tr(familias[t.familia].regla)}
          </p>
        </div>
      ) : null))}
      {[...marcadas].filter(i => !ronda.tokens[i].error).map(i => (
        <div key={`x${i}`} className="rounded-xl px-3 py-2 bg-orange-500/10 border border-orange-500/20">
          <p className="text-sm">
            <span className="text-orange-300 font-bold">{ronda.tokens[i].s}</span>
            <span className="text-white/40"> · {tr(C.estaBien)}</span>
          </p>
        </div>
      ))}
    </div>
  )
}
