// "¿Eres profesor?": una tarjeta pequeña en la home para quien entra sin
// sesión. Enseña de un vistazo lo que hay para una clase (el aula dibujada y
// tres cosas que se hacen con ella) y lleva a /profesores, que lo cuenta
// entero. No compite con las puertas de arriba: va debajo, compacta.
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { ArteAula } from './arte/aula'
import { Libro } from './Iconos'
import { Pupitre, Cuaderno } from './IconosProfesor'

const COSAS = [
  {
    Icono: Pupitre, fondo: 'bg-amber-500/12',
    texto: { es: 'El plano de tu aula: sienta a cada alumno y saca a uno a la pizarra.', en: 'Your classroom plan: seat each student and pick one for the board.', ca: "El plànol de la teva aula: asseu cada alumne i treu-ne un a la pissarra." },
  },
  {
    Icono: Libro, fondo: 'bg-blue-500/12',
    texto: { es: 'Mandas un juego o un examen y se corrige solo: ves quién lo ha hecho.', en: 'Set a game or a quiz and it marks itself: you see who has done it.', ca: "Envies un joc o un examen i es corregeix sol: veus qui l'ha fet." },
  },
  {
    Icono: Cuaderno, fondo: 'bg-red-500/12',
    texto: { es: 'Notas, asistencia y el boletín para las familias, también en papel.', en: 'Grades, attendance and the family report, on paper too.', ca: 'Notes, assistència i el butlletí per a les famílies, també en paper.' },
  },
]

export default function EresProfesor({ className = '' }) {
  const { tr, localPath } = useLang()
  return (
    <section className={`rounded-2xl bg-[#141b2e] border border-white/[0.08] overflow-hidden grid sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] ${className}`}>
      <div className="relative bg-teal-500/[0.06] border-b sm:border-b-0 sm:border-r border-white/[0.06] flex items-center justify-center p-3">
        <ArteAula alumnos={14} className="w-full max-w-[300px] aspect-video" />
      </div>
      <div className="p-5">
        <p className="text-teal-300 text-[11px] font-bold uppercase tracking-widest mb-1">
          {tr({ es: '¿Eres profesor?', en: 'Are you a teacher?', ca: 'Ets professor?' })}
        </p>
        <h2 className="text-white font-black text-xl leading-tight mb-3">
          {tr({ es: 'Lleva tu clase a Tuthor', en: 'Bring your class to Tuthor', ca: 'Porta la teva classe a Tuthor' })}
        </h2>
        <ul className="space-y-2 mb-4">
          {COSAS.map(({ Icono, fondo, texto }) => (
            <li key={texto.es} className="flex items-center gap-3 text-white/70 text-[13px] leading-snug">
              <span className={`shrink-0 w-8 h-8 rounded-lg ${fondo} grid place-items-center`}><Icono className="w-5 h-5" /></span>
              {tr(texto)}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link to={localPath('/profesores')}
            className="inline-flex items-center rounded-xl bg-teal-600 hover:bg-teal-500 px-4 py-2.5 text-white text-sm font-black transition-colors">
            {tr({ es: 'Crear mi clase →', en: 'Create my class →', ca: 'Crear la meva classe →' })}
          </Link>
          <span className="text-white/40 text-xs">{tr({ es: 'Gratis · en beta', en: 'Free · in beta', ca: 'Gratis · en beta' })}</span>
        </div>
      </div>
    </section>
  )
}
