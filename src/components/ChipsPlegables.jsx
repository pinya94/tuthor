// Fila de chips (materias) SIN scroll horizontal: plegada enseña las primeras
// que caben (3 en el móvil, 5 en tablet, 7 en el ordenador) y «Ver más ▾»;
// desplegada, todas en varias líneas. El chip activo se ve siempre, aunque
// esté entre los plegados. Sustituye a la barra con scroll de la portada y de
// «¿A qué jugáis?» (el usuario, 20-nov: «este scroll es una patada»).
import { useState } from 'react'
import { useLang } from '../context/LangContext'

// Qué chips se ven plegados según el ancho (índice dentro de la lista)
const visiblePlegado = i => (i < 3 ? 'inline-flex' : i < 5 ? 'hidden sm:inline-flex' : i < 7 ? 'hidden lg:inline-flex' : 'hidden')

export default function ChipsPlegables({ items, activo, onElige, claseChip }) {
  const { tr } = useLang()
  const [abierto, setAbierto] = useState(false)
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it, i) => (
        <button key={it.id} type="button" onClick={() => onElige(it.id)}
          className={`${claseChip(activo === it.id)} items-center ${abierto || activo === it.id ? 'inline-flex' : visiblePlegado(i)}`}>
          {it.label}
        </button>
      ))}
      {items.length > 3 && (
        <button type="button" onClick={() => setAbierto(v => !v)}
          className={`${claseChip(false)} items-center ${abierto ? 'inline-flex' : items.length <= 5 ? 'inline-flex sm:hidden' : items.length <= 7 ? 'inline-flex lg:hidden' : 'inline-flex'}`}>
          {abierto ? tr({ es: 'Ver menos ▴', en: 'Show less ▴', ca: 'Veure’n menys ▴' }) : tr({ es: 'Ver más ▾', en: 'Show more ▾', ca: 'Veure’n més ▾' })}
        </button>
      )}
    </div>
  )
}
