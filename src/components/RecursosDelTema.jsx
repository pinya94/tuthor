import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { IMPRIMIBLES, imprimiblesDeTema, tarjetasDe } from '../lib/materialImprimible'
import { HojaTarjetas, VisorHoja } from './HojasImprimibles'
import { cargarTarjetasDeExamen } from '../lib/tarjetasExamen'

// El material en papel DE ESTE TEMA, dentro de la página que lo explica.
//
// Las páginas de /estudiar/<materia>/<tema> son texto que explica el tema y
// desde el que se lanzan los ejercicios: quien está ahí ya está preparando
// esa clase. Ofrecerle las tarjetas de esa misma época (no un enlace genérico
// a /recursos) es la diferencia entre un banner y algo que se usa.
//
// No se pinta nada si el tema no tiene material, así que se puede montar en
// cualquier página de tema sin comprobar antes si le toca.
//
// Dos orígenes, y por eso la lista se arma aquí en vez de venir hecha:
//   - Los imprimibles del catálogo (materialImprimible), que están cargados
//     desde el primer render.
//   - Las tarjetas de repaso del banco de examen del tema, que llegan por
//     import() dinámico porque los diecisiete bancos juntos son 417 KB y esta
//     es una página pública (ver tarjetasExamen.js). Aparecen cuando llegan;
//     el resto de la sección no las espera.

export default function RecursosDelTema({ materia, tema }) {
  const { lang, tr, localPath } = useLang()
  const [abierta, setAbierta] = useState(null) // { id, varianteId }
  // Se guarda de QUÉ tema es lo cargado, no solo el resultado. Así al cambiar
  // de tema no hace falta ponerlo a null dentro del efecto —que es una
  // cascada de renders y la regla react-hooks/set-state-in-effect la prohíbe—:
  // basta con no reconocer como suyo lo que sobró del tema anterior.
  const [cargado, setCargado] = useState(null) // { clave, def }
  const clave = materia + "/" + tema
  const deExamen = cargado?.clave === clave ? cargado.def : null

  useEffect(() => {
    // `vivo` y no un AbortController: no hay petición que cancelar, solo hay
    // que no escribir el resultado de un tema que ya no se está mirando (dos
    // navegaciones seguidas podrían llegar en cualquier orden).
    let vivo = true
    cargarTarjetasDeExamen(materia, tema).then(def => {
      if (vivo) setCargado({ clave: `${materia}/${tema}`, def })
    })
    return () => { vivo = false }
  }, [materia, tema])

  // Un solo tipo para los dos orígenes, así el resto del componente no tiene
  // que saber de dónde salió cada hoja.
  const fichas = [
    ...imprimiblesDeTema(materia, tema).map(({ id, varianteId }) => ({
      id,
      def: IMPRIMIBLES[id],
      varianteId,
      tarjetas: (v, l) => tarjetasDe(id, v, l),
    })),
    ...(deExamen ? [{
      id: 'examen',
      def: deExamen,
      varianteId: null,
      tarjetas: (v, l) => deExamen.tarjetas(v, l),
    }] : []),
  ]

  if (fichas.length === 0) return null

  const ficha = abierta && fichas.find(f => f.id === abierta.id)
  const variante = ficha?.def.variantes(lang).find(v => v.id === abierta.varianteId)

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-black text-white mb-2">
        🖨️ {tr({ es: 'Para trabajarlo en papel', en: 'To work on it on paper', ca: 'Per treballar-ho en paper' })}
      </h2>
      <p className="text-white/55 mb-5">
        {tr({
          es: 'Material listo para imprimir y recortar de este mismo tema. Sin registro.',
          en: 'Material ready to print and cut out, on this same topic. No sign-up.',
          ca: "Material a punt per imprimir i retallar d'aquest mateix tema. Sense registre.",
        })}
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {fichas.map(({ id, def: d, varianteId }) => {
          // Con varianteId concreto (historia) se va directo a la hoja; sin
          // él, se ofrece cada grupo del imprimible para que elija.
          const opciones = varianteId
            ? d.variantes(lang).filter(v => v.id === varianteId)
            : d.variantes(lang)
          if (opciones.length === 0) return null
          return (
            <div key={id} className="rounded-2xl border border-white/10 p-5" style={{ background: 'rgba(17,20,29,0.86)' }}>
              <p className="text-white font-bold text-[15px] mb-1">{d.emoji} {d.titulo[lang] ?? d.titulo.es}</p>
              <p className="text-white/50 text-[13px] leading-relaxed mb-3">{d.desc[lang] ?? d.desc.es}</p>
              <div className="flex flex-wrap gap-1.5">
                {opciones.map(v => (
                  <button key={v.id} type="button" onClick={() => setAbierta({ id, varianteId: v.id })}
                    className="text-[12px] font-bold px-3 py-1.5 rounded-lg border border-teal-500/30 text-teal-300 hover:bg-teal-500/10 transition-colors">
                    🖨️ {v.label} <span className="text-white/30">{v.n}</span>
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <Link to={localPath('/recursos')}
        className="inline-block mt-4 text-[13px] font-bold text-white/45 hover:text-white/80 transition-colors">
        {tr({ es: 'Ver todos los recursos imprimibles →', en: 'See all printable resources →', ca: 'Veure tots els recursos imprimibles →' })}
      </Link>

      {ficha && (
        <VisorHoja onClose={() => setAbierta(null)} tr={tr}>
          <HojaTarjetas
            imprimible={ficha.def}
            variante={variante}
            tarjetas={ficha.tarjetas(abierta.varianteId, lang)}
            tr={tr}
            lang={lang}
          />
        </VisorHoja>
      )}
    </section>
  )
}
