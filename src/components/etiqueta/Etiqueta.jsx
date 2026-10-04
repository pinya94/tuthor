// Una etiqueta nutricional como la de un envase de verdad: fondo blanco,
// tabla del reglamento europeo (energía, grasas, saturadas, hidratos,
// azúcares, fibra, proteínas, sal) por 100 g o 100 ml, y la ración debajo.
// `resalta`: la fila que había que mirar (al corregir).
import { useLang } from '../../context/LangContext'

// [clave, nombre completo, nombre corto (cuando hay varias etiquetas en fila), sangrado]
const FILAS = [
  ['kcal', { es: 'Valor energético', en: 'Energy', ca: 'Valor energètic' }, { es: 'Energía', en: 'Energy', ca: 'Energia' }, false],
  ['grasas', { es: 'Grasas', en: 'Fat', ca: 'Greixos' }, null, false],
  ['saturadas', { es: 'de las cuales saturadas', en: 'of which saturates', ca: 'dels quals saturats' }, { es: 'saturadas', en: 'saturates', ca: 'saturats' }, true],
  ['hidratos', { es: 'Hidratos de carbono', en: 'Carbohydrate', ca: 'Hidrats de carboni' }, { es: 'Hidratos', en: 'Carbs', ca: 'Hidrats' }, false],
  ['azucares', { es: 'de los cuales azúcares', en: 'of which sugars', ca: 'dels quals sucres' }, { es: 'azúcares', en: 'sugars', ca: 'sucres' }, true],
  ['fibra', { es: 'Fibra alimentaria', en: 'Fibre', ca: 'Fibra alimentària' }, { es: 'Fibra', en: 'Fibre', ca: 'Fibra' }, false],
  ['proteinas', { es: 'Proteínas', en: 'Protein', ca: 'Proteïnes' }, null, false],
  ['sal', { es: 'Sal', en: 'Salt', ca: 'Sal' }, null, false],
]

export default function Etiqueta({ p, resalta, compacta = false, corta = false, marca }) {
  const { tr, lang } = useLang()
  const num = x => (lang === 'en' ? String(x) : String(x).replace('.', ','))
  const ud = p.liquido ? 'ml' : 'g'
  const anillo = marca === 'bien' ? 'ring-4 ring-green-400' : marca === 'mal' ? 'ring-4 ring-red-400' : ''
  return (
    <div className={`rounded-xl bg-white text-slate-900 shadow-lg ${compacta ? 'p-1.5' : 'p-2.5'} ${anillo}`}>
      <p className={`font-black leading-tight ${compacta ? 'text-[11px]' : 'text-sm'} mb-1`}>{p.emoji} {tr(p.nombre)}</p>
      <div className="border-t-[3px] border-b border-slate-900">
        <div className={`flex justify-between font-bold ${compacta ? 'text-[9px]' : 'text-[11px]'} py-0.5 border-b border-slate-900`}>
          {corta
            ? <span>{tr({ es: 'Por', en: 'Per', ca: 'Per' })} 100 {ud}</span>
            : <><span>{tr({ es: 'Información nutricional', en: 'Nutrition information', ca: 'Informació nutricional' })}</span><span>100 {ud}</span></>}
        </div>
        {FILAS.map(([k, nombre, nombreCorto, sangrado]) => (
          <div key={k} className={`flex justify-between gap-1 ${compacta ? 'text-[9.5px]' : 'text-[12px]'} leading-snug py-[1px] border-b border-slate-300 last:border-0 ${sangrado ? 'pl-2 italic' : 'font-semibold'} ${resalta === k ? 'bg-yellow-300' : ''}`}>
            <span className="truncate">{corta && nombreCorto ? (sangrado ? '· ' : '') + tr(nombreCorto) : tr(nombre)}</span>
            <span className="font-bold tabular-nums shrink-0">{k === 'kcal' ? `${p.kcal} kcal` : `${num(p[k])} g`}</span>
          </div>
        ))}
      </div>
      <p className={`${compacta ? 'text-[9px]' : 'text-[11px]'} text-slate-600 mt-1 leading-tight`}>{tr({ es: 'Ración', en: 'Serving', ca: 'Ració' })}: {tr(p.nombreRacion)}</p>
    </div>
  )
}
