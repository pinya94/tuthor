import { ESTADO_META, estadoDe, totalesPorAlumno } from '../lib/attendance'
import { promedioColumna, promedioAlumno, suspenso, porcentajeDeColumna, pesoDe, PESO_POR_DEFECTO } from '../lib/grades'

// Las hojas en papel de los datos de la clase: el cuaderno de notas y el parte
// de asistencia. Aparte del boletín de familias (BoletinFamilias.jsx), que es
// de UN alumno: estas dos son de la clase entera, que es lo que un profesor
// necesita llevar encima en una reunión, en una evaluación o el día que el
// portátil no arranca.
//
// Blancas y negras, y no por estética: se imprimen en la fotocopiadora del
// centro, que casi siempre es en blanco y negro. Por eso la asistencia usa
// LETRAS (F, R, J) donde la pantalla usa cuadraditos de color — un cuadro rojo
// y uno ámbar salen del mismo gris y el parte se vuelve inservible.
//
// Impresión con .imprimir-solo-esto / .no-imprimir (src/index.css), las mismas
// dos clases que el boletín y los imprimibles. Sin librería de PDF:
// window.print() ya deja "Guardar como PDF" en cualquier navegador.

const hoyLegible = lang => new Date().toLocaleDateString(
  lang === 'en' ? 'en-GB' : lang === 'ca' ? 'ca-ES' : 'es-ES',
  { day: 'numeric', month: 'long', year: 'numeric' },
)

const nota1dec = n => (n == null ? '—' : Number.isInteger(n) ? String(n) : n.toFixed(1))

function Cabecera({ titulo, clase, subtitulo, lang, tr }) {
  return (
    <>
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40 mb-1">
        {clase}{subtitulo ? ` · ${subtitulo}` : ''}
      </p>
      <h1 className="text-2xl font-black leading-tight mb-1">{titulo}</h1>
      <p className="text-black/50 text-[12px] mb-5">
        {tr({ es: 'Generado el', en: 'Generated on', ca: 'Generat el' })} {hoyLegible(lang)} · tuthor.es
      </p>
    </>
  )
}

// ── Cuaderno de notas ────────────────────────────────────────────────────────
// Filas de alumnos, columnas de evaluaciones, medias por los dos lados.
export function HojaNotas({ clase, alumnos, columnas, periodo, lang, tr }) {
  // El porcentaje solo se imprime si el profesor ha ponderado de verdad. Con
  // todas las columnas al mismo peso, un "33%" impreso bajo cada una parece un
  // reparto elegido y no lo es: es simplemente una media normal.
  const ponderado = columnas.some(c => pesoDe(c) !== PESO_POR_DEFECTO)
  return (
    <div className="imprimir-solo-esto bg-white text-black rounded-2xl p-6 sm:p-8 print:rounded-none print:p-0">
      <Cabecera
        titulo={tr({ es: 'Cuaderno de notas', en: 'Gradebook', ca: 'Quadern de notes' })}
        clase={clase} subtitulo={periodo} lang={lang} tr={tr}
      />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[12px]">
          <thead>
            <tr>
              <th className="text-left border border-black/40 px-2 py-1.5 font-black">
                {tr({ es: 'Alumno', en: 'Student', ca: 'Alumne' })}
              </th>
              {columnas.map(c => (
                // `break-all` y no `truncate`: en papel no hay hover que
                // rescate un nombre cortado, así que se parte y se lee entero.
                <th key={c.id} className="border border-black/40 px-1.5 py-1.5 font-bold break-all min-w-[52px]">
                  {c.name}
                  {/* El porcentaje va impreso: sin él, una media ponderada
                      parece un error de cálculo en el papel. */}
                  {ponderado && (
                    <span className="block font-normal text-black/50 text-[10px]">{Math.round(porcentajeDeColumna(columnas, c.id))}%</span>
                  )}
                </th>
              ))}
              <th className="border border-black/40 px-2 py-1.5 font-black bg-black/[0.06]">
                {tr({ es: 'Media', en: 'Average', ca: 'Mitjana' })}
              </th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map(a => {
              const media = promedioAlumno(columnas, a.uid)
              return (
                <tr key={a.uid}>
                  <td className="border border-black/40 px-2 py-1 font-semibold">{a.name}</td>
                  {columnas.map(c => {
                    const n = c.values?.[a.uid]
                    return (
                      // El suspenso va en negrita y sobre gris, no en rojo:
                      // impreso en blanco y negro, el color no se distingue.
                      <td key={c.id}
                        className={`border border-black/40 px-1.5 py-1 text-center ${suspenso(n) ? 'font-black bg-black/[0.10]' : ''}`}>
                        {nota1dec(n)}
                      </td>
                    )
                  })}
                  <td className="border border-black/40 px-2 py-1 text-center font-black bg-black/[0.06]">
                    {nota1dec(media)}
                  </td>
                </tr>
              )
            })}
            <tr>
              <td className="border border-black/40 px-2 py-1 font-black bg-black/[0.06]">
                {tr({ es: 'Media de la clase', en: 'Class average', ca: 'Mitjana de la classe' })}
              </td>
              {columnas.map(c => (
                <td key={c.id} className="border border-black/40 px-1.5 py-1 text-center font-black bg-black/[0.06]">
                  {nota1dec(promedioColumna(c))}
                </td>
              ))}
              <td className="border border-black/40 bg-black/[0.06]" />
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-[10px] text-black/45 mt-4">
        {tr({
          es: 'Un guion (—) es una nota sin poner, no un cero: no cuenta para ninguna media. Las notas en negrita están suspendidas. El porcentaje bajo cada evaluación es lo que pesa en la media.',
          en: 'A dash (—) is a missing grade, not a zero: it counts towards no average. Grades in bold are fails. The percentage under each assessment is how much it weighs in the average.',
          ca: 'Un guió (—) és una nota sense posar, no un zero: no compta per a cap mitjana. Les notes en negreta estan suspeses. El percentatge sota cada avaluació és el que pesa a la mitjana.',
        })}
      </p>
      {columnas.length > 6 && (
        <p className="text-[10px] text-black/45 mt-1">
          {tr({
            es: 'Con muchas evaluaciones, elige orientación horizontal en el diálogo de impresión.',
            en: 'With many assessments, choose landscape orientation in the print dialog.',
            ca: 'Amb moltes avaluacions, tria orientació horitzontal al diàleg d\'impressió.',
          })}
        </p>
      )}
    </div>
  )
}

// ── Parte de asistencia ──────────────────────────────────────────────────────
// Alumnos en filas, días en columnas, y una LETRA por casilla.
const LETRA = { ausente: 'F', retraso: 'R', justificada: 'J' }

const numeroDia = iso => Number(iso.split('-')[2])
const esFinde = iso => {
  const [a, m, d] = iso.split('-').map(Number)
  const dow = new Date(a, m - 1, d).getDay()
  return dow === 0 || dow === 6
}

export function HojaAsistencia({ clase, alumnos, dias, mes, lang, tr }) {
  // Los fines de semana se quitan del papel: ocupan casi un tercio del ancho
  // para no decir nada. En pantalla se dejan porque ahí sobra sitio y ayudan
  // a orientarse; aquí el espacio es el problema.
  const fechas = Object.keys(dias).sort().filter(iso => !esFinde(iso))
  const totales = totalesPorAlumno(dias, alumnos.map(a => a.uid))

  return (
    <div className="imprimir-solo-esto bg-white text-black rounded-2xl p-6 sm:p-8 print:rounded-none print:p-0">
      <Cabecera
        titulo={tr({ es: 'Parte de asistencia', en: 'Attendance register', ca: 'Part d\'assistència' })}
        clase={clase} subtitulo={mes} lang={lang} tr={tr}
      />

      {fechas.length === 0 ? (
        <p className="text-black/60 text-[13px]">
          {tr({
            es: 'No se ha pasado lista ningún día laborable de este mes.',
            en: 'The register has not been taken on any weekday this month.',
            ca: 'No s\'ha passat llista cap dia laborable d\'aquest mes.',
          })}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[11px]">
            <thead>
              <tr>
                <th className="text-left border border-black/40 px-2 py-1.5 font-black">
                  {tr({ es: 'Alumno', en: 'Student', ca: 'Alumne' })}
                </th>
                {fechas.map(iso => (
                  <th key={iso} className="border border-black/40 px-1 py-1.5 font-bold w-[18px]">{numeroDia(iso)}</th>
                ))}
                <th className="border border-black/40 px-1.5 py-1.5 font-black bg-black/[0.06]">F</th>
                <th className="border border-black/40 px-1.5 py-1.5 font-black bg-black/[0.06]">R</th>
                <th className="border border-black/40 px-1.5 py-1.5 font-black bg-black/[0.06]">J</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map(a => (
                <tr key={a.uid}>
                  <td className="border border-black/40 px-2 py-1 font-semibold whitespace-nowrap">{a.name}</td>
                  {fechas.map(iso => {
                    const estado = estadoDe(dias[iso], a.uid)
                    return (
                      <td key={iso} className="border border-black/40 px-1 py-1 text-center font-bold">
                        {LETRA[estado] ?? ''}
                      </td>
                    )
                  })}
                  <td className="border border-black/40 px-1.5 py-1 text-center font-black bg-black/[0.06]">{totales[a.uid]?.ausente ?? 0}</td>
                  <td className="border border-black/40 px-1.5 py-1 text-center font-black bg-black/[0.06]">{totales[a.uid]?.retraso ?? 0}</td>
                  <td className="border border-black/40 px-1.5 py-1 text-center font-black bg-black/[0.06]">{totales[a.uid]?.justificada ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-[10px] text-black/45 mt-4">
        <span className="font-bold">F</span> = {tr(ESTADO_META.ausente.label)} ·{' '}
        <span className="font-bold">R</span> = {tr(ESTADO_META.retraso.label)} ·{' '}
        <span className="font-bold">J</span> = {tr(ESTADO_META.justificada.label)} ·{' '}
        {tr({
          es: 'una casilla en blanco es asistencia normal. Solo salen los días laborables en los que se pasó lista.',
          en: 'a blank cell means normal attendance. Only weekdays on which the register was taken are shown.',
          ca: 'una casella en blanc és assistència normal. Només surten els dies laborables en què es va passar llista.',
        })}
      </p>
    </div>
  )
}

// ── Asistencia de un periodo largo ───────────────────────────────────────────
// Un trimestre son unos 60 días de clase y un curso entero pasa de 175: la
// rejilla día a día de aquí arriba no se puede estirar tanto, ni en horizontal
// ni reduciendo la letra. Así que para un periodo largo la hoja CAMBIA DE
// FORMA en vez de tamaño: una columna por MES con las faltas de cada alumno, y
// los totales del periodo al final. Es lo que se necesita de un curso entero —
// quién falta y cuándo empezó a faltar— y cabe en un folio.
//
// El detalle día a día sigue disponible mes a mes: son dos vistas del mismo
// dato, no una peor que la otra.
const NOMBRE_MES = (clave, lang) => {
  const [a, m] = clave.split('-').map(Number)
  return new Date(a, m - 1, 1)
    .toLocaleDateString(lang === 'en' ? 'en-GB' : lang === 'ca' ? 'ca-ES' : 'es-ES', { month: 'short' })
    .replace(/\.$/, '')
    .replace(/^\p{L}/u, c => c.toUpperCase())
}

export function HojaAsistenciaResumen({ clase, alumnos, dias, periodo, lang, tr }) {
  const fechas = Object.keys(dias).filter(iso => !esFinde(iso))
  const meses = [...new Set(fechas.map(iso => iso.slice(0, 7)))].sort()

  // Faltas por alumno y mes, y cuántos días se pasó lista en cada mes: tres
  // faltas de cuatro días registrados no es lo mismo que tres de veinte, y sin
  // ese dato la tabla se lee mal.
  const porMes = {}
  const diasConLista = {}
  for (const clave of meses) {
    const delMes = Object.fromEntries(fechas.filter(iso => iso.startsWith(clave)).map(iso => [iso, dias[iso]]))
    diasConLista[clave] = Object.keys(delMes).length
    porMes[clave] = totalesPorAlumno(delMes, alumnos.map(a => a.uid))
  }
  const totales = totalesPorAlumno(
    Object.fromEntries(fechas.map(iso => [iso, dias[iso]])),
    alumnos.map(a => a.uid),
  )

  return (
    <div className="imprimir-solo-esto bg-white text-black rounded-2xl p-6 sm:p-8 print:rounded-none print:p-0">
      <Cabecera
        titulo={tr({ es: 'Asistencia por meses', en: 'Attendance by month', ca: 'Assistència per mesos' })}
        clase={clase} subtitulo={periodo} lang={lang} tr={tr}
      />

      {meses.length === 0 ? (
        <p className="text-black/60 text-[13px]">
          {tr({
            es: 'No se ha pasado lista ningún día de este periodo.',
            en: 'The register has not been taken on any day in this period.',
            ca: 'No s\'ha passat llista cap dia d\'aquest període.',
          })}
        </p>
      ) : (
        <table className="w-full border-collapse text-[12px]">
          <thead>
            <tr>
              <th className="text-left border border-black/40 px-2 py-1.5 font-black">
                {tr({ es: 'Alumno', en: 'Student', ca: 'Alumne' })}
              </th>
              {meses.map(m => (
                <th key={m} className="border border-black/40 px-1.5 py-1.5 font-bold">{NOMBRE_MES(m, lang)}</th>
              ))}
              <th className="border border-black/40 px-1.5 py-1.5 font-black bg-black/[0.06]">F</th>
              <th className="border border-black/40 px-1.5 py-1.5 font-black bg-black/[0.06]">R</th>
              <th className="border border-black/40 px-1.5 py-1.5 font-black bg-black/[0.06]">J</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map(a => (
              <tr key={a.uid}>
                <td className="border border-black/40 px-2 py-1 font-semibold">{a.name}</td>
                {meses.map(m => {
                  const f = porMes[m]?.[a.uid]?.ausente ?? 0
                  return (
                    <td key={m} className={`border border-black/40 px-1.5 py-1 text-center ${f > 0 ? 'font-black' : 'text-black/30'}`}>
                      {f}
                    </td>
                  )
                })}
                <td className="border border-black/40 px-1.5 py-1 text-center font-black bg-black/[0.06]">{totales[a.uid]?.ausente ?? 0}</td>
                <td className="border border-black/40 px-1.5 py-1 text-center font-black bg-black/[0.06]">{totales[a.uid]?.retraso ?? 0}</td>
                <td className="border border-black/40 px-1.5 py-1 text-center font-black bg-black/[0.06]">{totales[a.uid]?.justificada ?? 0}</td>
              </tr>
            ))}
            <tr>
              <td className="border border-black/40 px-2 py-1 font-black bg-black/[0.06]">
                {tr({ es: 'Días con lista pasada', en: 'Days registered', ca: 'Dies amb llista passada' })}
              </td>
              {meses.map(m => (
                <td key={m} className="border border-black/40 px-1.5 py-1 text-center font-black bg-black/[0.06]">{diasConLista[m]}</td>
              ))}
              <td className="border border-black/40 bg-black/[0.06]" colSpan={3} />
            </tr>
          </tbody>
        </table>
      )}

      <p className="text-[10px] text-black/45 mt-4">
        {tr({
          es: 'Cada casilla de mes son las FALTAS de ese mes. Las tres últimas columnas son los totales del periodo: F faltas, R retrasos, J justificadas. La última fila dice cuántos días se pasó lista en cada mes, para poder leer las faltas en proporción.',
          en: 'Each month cell shows that month\'s ABSENCES. The last three columns are the period totals: F absences, R lates, J excused. The bottom row shows how many days the register was taken each month, so the absences can be read in proportion.',
          ca: 'Cada casella de mes són les FALTES d\'aquell mes. Les tres últimes columnes són els totals del període: F faltes, R retards, J justificades. L\'última fila diu quants dies es va passar llista cada mes.',
        })}
      </p>
    </div>
  )
}
