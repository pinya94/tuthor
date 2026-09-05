import { createPortal } from 'react-dom'

// Las hojas que se imprimen y el visor que las envuelve, aparte para que las
// use tanto el panel de recursos (RecursosImprimibles) como las páginas de
// teoría (RecursosDelTema): la misma hoja, un único sitio donde arreglarla.
//
// Blancas y negras a propósito: van a papel de verdad, así que ni fondo
// oscuro ni degradados que se coman el tóner.
//
// Impresión con .imprimir-solo-esto / .no-imprimir (src/index.css), las
// mismas dos clases que ya usa el boletín de familias. Sin librería de PDF:
// window.print() deja "Guardar como PDF" en cualquier navegador.

export function HojaActividad({ ficha, tr }) {
  return (
    <div className="imprimir-solo-esto bg-white text-black rounded-2xl p-6 sm:p-8 print:rounded-none print:p-0">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40 mb-1">
        {ficha.asignatura} · {ficha.niveles}
      </p>
      <h1 className="text-2xl font-black leading-tight mb-1">{ficha.enPapel.titulo}</h1>
      <p className="text-black/50 text-sm mb-6">
        {tr({ es: 'Versión en papel de', en: 'Paper version of', ca: 'Versió en paper de' })} {ficha.emoji} {ficha.titulo}
      </p>

      <ol className="space-y-3 mb-7">
        {ficha.enPapel.pasos.map((p, i) => (
          <li key={i} className="flex gap-3">
            <span className="w-6 h-6 shrink-0 rounded-full border-2 border-black/70 font-black text-[12px] flex items-center justify-center">
              {i + 1}
            </span>
            <p className="text-[14px] leading-relaxed pt-0.5">{p}</p>
          </li>
        ))}
      </ol>

      {ficha.alternativas?.length > 0 && (
        <>
          <h2 className="text-sm font-black uppercase tracking-wider text-black/50 border-t border-black/15 pt-4 mb-3">
            {tr({ es: 'Para ampliar', en: 'To go further', ca: 'Per ampliar' })}
          </h2>
          <ul className="space-y-2">
            {ficha.alternativas.map(a => (
              <li key={a.nombre} className="text-[13px] leading-relaxed">
                <span className="font-bold">{a.nombre}.</span> <span className="text-black/70">{a.desc}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      <p className="text-[10px] text-black/35 mt-8 pt-3 border-t border-black/10">tuthor.es</p>
    </div>
  )
}

// Las tarjetas van en dos mitades con una línea de puntos en medio: se
// recorta por el borde y se dobla por los puntos, y queda el enunciado por
// una cara y la solución por la otra.
export function HojaTarjetas({ imprimible, variante, tarjetas, tr, lang }) {
  return (
    <div className="imprimir-solo-esto bg-white text-black rounded-2xl p-6 sm:p-8 print:rounded-none print:p-0">
      {/* `variante` puede no existir si el dato de origen cambió y ese grupo
          ya no está: mejor imprimir la hoja sin el subtítulo que reventar
          con un `variante.label` de undefined. */}
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40 mb-1">
        {imprimible.asignatura[lang] ?? imprimible.asignatura.es}
        {variante && ` · ${variante.label}`} · {tarjetas.length} {tr({ es: 'tarjetas', en: 'cards', ca: 'targetes' })}
      </p>
      <h1 className="text-2xl font-black leading-tight mb-2">
        {imprimible.titulo[lang] ?? imprimible.titulo.es}
      </h1>
      <p className="text-black/60 text-[13px] leading-relaxed mb-5">
        {imprimible.comoUsarlo[lang] ?? imprimible.comoUsarlo.es}
      </p>

      <div className="grid grid-cols-2 gap-2">
        {tarjetas.map((t, i) => (
          <div key={i} className="flex items-stretch border border-black/50 rounded-md overflow-hidden break-inside-avoid">
            <div className="flex-1 min-w-0 p-2.5">
              <p className="text-[12.5px] font-bold leading-snug">{t.frente}</p>
              {t.pista && <p className="text-[10px] text-black/55 leading-snug mt-1">{t.pista}</p>}
            </div>
            <div className="w-[34%] shrink-0 border-l border-dashed border-black/50 p-2.5 flex items-center justify-center">
              <p className="text-[13px] font-black text-center leading-snug">{t.dorso}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-black/35 mt-6 pt-3 border-t border-black/10">
        {tr({
          es: 'Recorta por el borde y dobla por la línea de puntos.',
          en: 'Cut along the outer edge and fold along the dotted line.',
          ca: 'Retalla per la vora i doblega per la línia de punts.',
        })} · tuthor.es
      </p>
    </div>
  )
}

// Portal a <body> a propósito: quien monta esto suele vivir dentro de un
// envoltorio `relative z-10` (el panel del profesor, las páginas de teoría),
// que es un contexto de apilamiento — cualquier z-index de dentro sigue
// quedando por debajo de la navbar (z-50), que está fuera. Es el mismo gotcha
// que ya está documentado en App.jsx para los raíles.
export function VisorHoja({ onClose, tr, children }) {
  return createPortal(
    <div className="fixed inset-0 z-[90] overflow-y-auto bg-black/75 backdrop-blur-sm p-4 sm:p-8">
      <div className="mx-auto w-full max-w-2xl">
        <div className="no-imprimir flex items-center justify-between gap-3 mb-3">
          <button type="button" onClick={onClose}
            className="text-white/60 hover:text-white text-[13px] font-bold transition-colors">
            ← {tr({ es: 'Volver', en: 'Back', ca: 'Tornar' })}
          </button>
          <button type="button" onClick={() => window.print()}
            className="text-[12.5px] font-bold px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-colors">
            🖨️ {tr({ es: 'Imprimir', en: 'Print', ca: 'Imprimir' })}
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  )
}
