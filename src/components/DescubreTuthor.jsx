// «Más de este tema» y «Esto es Tuthor», al pie de cada juego, examen y ficha.
//
// Quien entra desde Google a un juego o a un examen veía solo esa página. Este
// bloque le dice, sin salir de ella, qué más hay del MISMO tema (resumen,
// examen, otros juegos) y —si no tiene cuenta, o sea, si probablemente es su
// primera visita— qué es Tuthor y cuánto hay, con dos salidas claras: todos
// los juegos y todo el temario. Con sesión, la segunda parte sobra.
import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { relacionados, cifrasTuthor, idDeRuta } from '../lib/descubre'

export default function DescubreTuthor({ id, className = 'mt-8' }) {
  const { tr, lang, localPath } = useLang()
  const { user } = useAuth()
  const { pathname } = useLocation()
  const pagina = id ?? idDeRuta(pathname)
  const rel = useMemo(() => relacionados(pagina, lang), [pagina, lang])
  const cifras = useMemo(() => cifrasTuthor(), [])
  const visitante = user === null
  if (!rel && !visitante) return null

  return (
    <section className={`${className} rounded-2xl border border-white/[0.08] bg-[#141b2e] p-4 sm:p-5 text-left`}>
      {rel && rel.items.length > 0 && (
        <div>
          <p className="text-white/45 text-[11px] font-bold uppercase tracking-widest">
            {tr({ es: 'Más para practicar', en: 'More practice on', ca: 'Més per practicar' })} · {rel.materia}
          </p>
          <p className="text-white font-black text-base mt-0.5 mb-3">{rel.tema}</p>
          <div className="flex flex-wrap gap-2">
            {rel.items.map(i => (
              <Link key={i.ruta} to={localPath(i.ruta)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-violet-600/20 hover:border-violet-400/40 px-3 py-2 text-[13px] font-semibold text-white/80 hover:text-white transition-colors">
                <span aria-hidden="true">{i.emoji}</span>{i.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {visitante && (
        <div className={rel && rel.items.length > 0 ? 'mt-4 pt-4 border-t border-white/[0.08]' : ''}>
          <p className="text-amber-300/90 text-[11px] font-bold uppercase tracking-widest">
            {tr({ es: 'Esto es Tuthor', en: 'This is Tuthor', ca: 'Això és Tuthor' })}
          </p>
          <p className="text-white font-black text-lg leading-snug mt-0.5">
            {tr({ es: 'Todo lo que tienes que estudiar, de Primaria a Bachillerato', en: 'Everything you need to study, from primary to sixth form', ca: 'Tot el que has d’estudiar, de Primària a Batxillerat' })}
          </p>
          <p className="text-white/55 text-sm mt-1">
            {tr({
              es: `${cifras.juegos} juegos y ${cifras.examenes} exámenes con explicación en ${cifras.materias} materias. Gratis y sin registrarte.`,
              en: `${cifras.juegos} games and ${cifras.examenes} explained quizzes across ${cifras.materias} subjects. Free, no sign-up.`,
              ca: `${cifras.juegos} jocs i ${cifras.examenes} exàmens amb explicació en ${cifras.materias} matèries. Gratis i sense registrar-te.`,
            })}
          </p>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <Link to={localPath('/juegos')} className="text-center rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm py-2.5 transition-colors">
              {tr({ es: 'Ver todos los juegos', en: 'See all games', ca: 'Veure tots els jocs' })}
            </Link>
            <Link to={localPath('/temario')} className="text-center rounded-xl border border-white/15 hover:border-white/30 text-white font-bold text-sm py-2.5 transition-colors">
              {tr({ es: 'Ver todo el temario', en: 'See the whole syllabus', ca: 'Veure tot el temari' })}
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}
