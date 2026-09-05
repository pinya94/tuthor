import { useState } from 'react'
import { useLang } from '../context/LangContext'
import { FICHAS_ES, FICHAS_EN, FICHAS_CA } from '../data/infoJuegosFichas'
import { IMPRIMIBLES, IMPRIMIBLE_IDS, tarjetasDe } from '../lib/materialImprimible'
import { HojaActividad, HojaTarjetas, VisorHoja } from './HojasImprimibles'

// Recursos del profesor, en dos apartados que NO son lo mismo:
//
//   · Actividades — la versión en papel de cada juego (el `enPapel` que ya
//     vivía en infoJuegosFichas.js). Son INSTRUCCIONES: "escribe 15-20
//     eventos en tarjetas y repártelas".
//   · Imprimibles — el material de verdad (src/lib/materialImprimible.js).
//     Trae esas tarjetas YA escritas con los datos de los juegos, listas
//     para recortar.
//
// Mezclarlos era el fallo de la primera versión: todo se anunciaba como
// "fichas para imprimir" cuando la mitad solo decía qué hacer, y el profesor
// se encontraba una hoja que le mandaba a él fabricar el material.
//
// Impresión: .imprimir-solo-esto / .no-imprimir (src/index.css), las mismas
// dos clases que ya usa el boletín. Sin librería de PDF.

const FICHAS_POR_LANG = { es: FICHAS_ES, en: FICHAS_EN, ca: FICHAS_CA }

export default function RecursosImprimibles() {
  const { lang, tr } = useLang()
  const [seccion, setSeccion] = useState('imprimibles') // 'imprimibles' | 'actividades'
  const [filtro, setFiltro] = useState('todas')
  const [abierta, setAbierta] = useState(null) // { tipo, ... }

  const fichas = FICHAS_POR_LANG[lang] ?? FICHAS_ES
  // Solo las que tienen actividad en papel: una ficha nueva sin `enPapel` no
  // debe colarse como una hoja en blanco.
  const conPapel = Object.entries(fichas).filter(([, f]) => f.enPapel?.pasos?.length > 0)
  const asignaturas = [...new Set(conPapel.map(([, f]) => f.asignatura))].sort()
  const visibles = conPapel.filter(([, f]) => filtro === 'todas' || f.asignatura === filtro)

  const SECCIONES = [
    { id: 'imprimibles', label: tr({ es: '🖨️ Imprimibles', en: '🖨️ Printables', ca: '🖨️ Imprimibles' }) },
    { id: 'actividades', label: tr({ es: '📋 Actividades', en: '📋 Activities', ca: '📋 Activitats' }) },
  ]

  return (
    <>
      <section>
        <div className="inline-flex gap-1 p-1 bg-black/25 border border-white/10 rounded-xl mb-4">
          {SECCIONES.map(s => (
            <button key={s.id} type="button" onClick={() => setSeccion(s.id)}
              className={`text-[12.5px] font-bold px-4 py-2 rounded-lg transition-colors ${
                seccion === s.id ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white/70'
              }`}>
              {s.label}
            </button>
          ))}
        </div>

        {seccion === 'imprimibles' ? (
          <>
            <p className="text-white/45 text-[13px] leading-snug mb-4 max-w-xl">
              {tr({
                es: 'Material ya hecho: tarjetas escritas y listas para recortar.',
                en: 'Ready-made material: cards already written, ready to cut out.',
                ca: 'Material ja fet: targetes escrites i a punt per retallar.',
              })}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 items-start">
              {IMPRIMIBLE_IDS.map(id => {
                const d = IMPRIMIBLES[id]
                return (
                  <div key={id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-white text-[14px] font-bold mb-1">
                      {d.emoji} {d.titulo[lang] ?? d.titulo.es}
                    </p>
                    <p className="text-white/40 text-[12px] leading-snug mb-3">{d.desc[lang] ?? d.desc.es}</p>
                    <div className="flex flex-wrap gap-1">
                      {d.variantes(lang).map(v => (
                        <button key={v.id} type="button"
                          onClick={() => setAbierta({ tipo: 'tarjetas', id, varianteId: v.id })}
                          className="text-[11.5px] font-bold px-2.5 py-1.5 rounded-lg border border-white/10 text-white/55 hover:border-teal-500/40 hover:text-white transition-colors">
                          {v.label} <span className="text-white/25">{v.n}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <>
            <p className="text-white/45 text-[13px] leading-snug mb-4 max-w-xl">
              {tr({
                es: `${conPapel.length} formas de llevar un juego al papel. Son instrucciones: el material lo pones tú.`,
                en: `${conPapel.length} ways to take a game to paper. These are instructions: you provide the material.`,
                ca: `${conPapel.length} maneres de portar un joc al paper. Són instruccions: el material el poses tu.`,
              })}
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
              {[{ id: 'todas', label: tr({ es: 'Todas', en: 'All', ca: 'Totes' }) }, ...asignaturas.map(a => ({ id: a, label: a }))].map(a => (
                <button key={a.id} type="button" onClick={() => setFiltro(a.id)}
                  className={`text-[11px] font-bold px-2 py-1 rounded-lg border transition-colors ${
                    filtro === a.id ? 'bg-white/15 border-white/25 text-white' : 'border-white/10 text-white/40 hover:text-white/70'
                  }`}>
                  {a.label}
                </button>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {visibles.map(([slug, f]) => (
                <button key={slug} type="button" onClick={() => setAbierta({ tipo: 'actividad', slug })}
                  className="w-full flex items-center gap-2.5 text-left px-3 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-teal-500/40 hover:bg-white/5 transition-colors">
                  <span className="text-base shrink-0">{f.emoji}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-white text-[12.5px] font-semibold truncate">{f.titulo}</span>
                    <span className="block text-white/35 text-[10.5px] truncate">{f.enPapel.titulo}</span>
                  </span>
                  <span className="text-white/20 text-[11px] shrink-0">📋</span>
                </button>
              ))}
            </div>
          </>
        )}
      </section>

      {abierta && (
        <VisorHoja onClose={() => setAbierta(null)} tr={tr}>
          {abierta.tipo === 'actividad'
            ? <HojaActividad ficha={fichas[abierta.slug]} tr={tr} />
            : (() => {
              const d = IMPRIMIBLES[abierta.id]
              const variante = d.variantes(lang).find(v => v.id === abierta.varianteId)
              return <HojaTarjetas imprimible={d} variante={variante} tarjetas={tarjetasDe(abierta.id, abierta.varianteId, lang)} tr={tr} lang={lang} />
            })()}
        </VisorHoja>
      )}
    </>
  )
}
