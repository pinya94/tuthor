// Texto propio de los exámenes con envoltorio especial (mapas, ciclos, línea
// del tiempo, diagnóstico…), que no pasan por ExamenMC ni MechanicExam.
// Sin él, el buscador recibía en esas URLs el título y poco más, o incluso un
// mensaje de error (ver memoria «adsense-contenido-poco-valor»).
import { useLang } from '../context/LangContext'

// Bloque «Sobre este examen»: 1-3 párrafos {es,en,ca} escritos para ESA página.
export function SobreExamen({ parrafos, titulo, className = '' }) {
  const { tr } = useLang()
  if (!parrafos?.length) return null
  return (
    <section className={`w-full max-w-md mx-auto mt-10 text-left ${className}`}>
      <h2 className="text-white font-bold text-lg mb-2">{tr(titulo ?? { es: 'Sobre este examen', en: 'About this exam', ca: 'Sobre aquest examen' })}</h2>
      {parrafos.map((p, i) => <p key={i} className="text-white/55 text-sm leading-relaxed mb-3">{tr(p)}</p>)}
    </section>
  )
}

// Pantalla para cuando se entra en el examen sin haber elegido región o tema
// (directo desde el buscador o un enlace): en vez de «No hay suficientes…», se
// explica el examen y se deja elegir.
export function SelectorExamen({ emoji, titulo, intro, opciones, onElegir, parrafos }) {
  const { tr } = useLang()
  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-sm w-full text-center">
        <div className="text-5xl mb-4">{emoji}</div>
        <h1 className="text-white font-black text-2xl mb-2">{tr(titulo)}</h1>
        <p className="text-white/50 text-sm mb-6">{tr(intro)}</p>
        <div className="flex flex-col gap-3">
          {opciones.map(o => (
            <button key={o.id} onClick={() => onElegir(o)}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-2xl px-6 py-4 text-left transition-all flex items-center justify-between group">
              <span>
                <span className="block text-white font-bold">{tr(o.label)}</span>
                {o.sub && <span className="block text-white/35 text-xs mt-0.5">{tr(o.sub)}</span>}
              </span>
              <span className="text-white/30 group-hover:text-[#EDAE49] font-black text-lg">→</span>
            </button>
          ))}
        </div>
      </div>
      <SobreExamen parrafos={parrafos} />
    </div>
  )
}
