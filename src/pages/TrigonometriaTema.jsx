// /estudiar/matematicas/trigonometria: el tema con sus formatos (el juego
// Ángulo Recto, su examen y el examen de teoría) y una explicación breve de
// las razones trigonométricas con ejemplos. Antes la ficha del temario
// llevaba directa al examen porque solo había uno.
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import CourseSchema from '../components/CourseSchema'
import BreadcrumbSchema from '../components/BreadcrumbSchema'

const PATH = '/estudiar/matematicas/trigonometria'

export default function TrigonometriaTema() {
  const { lang, localPath, tr } = useLang()
  const titulo = tr({ es: 'Trigonometría', en: 'Trigonometry', ca: 'Trigonometria' })
  const desc = tr({
    es: 'Trigonometría para 4.º de ESO y Bachillerato: seno, coseno y tangente, cateto opuesto y contiguo, ángulos notables, calcular lados y ángulos y problemas. Juego Ángulo Recto, examen con el juego y examen de teoría.',
    en: 'Trigonometry for upper secondary and sixth form: sine, cosine and tangent, opposite and adjacent sides, special angles, finding sides and angles, and word problems. The Right Angle game, an exam with the game and a theory exam.',
    ca: 'Trigonometria per a 4t d’ESO i Batxillerat: sinus, cosinus i tangent, catet oposat i contigu, angles notables, calcular costats i angles i problemes. Joc Angle Recte, examen amb el joc i examen de teoria.',
  })

  const opciones = [
    {
      to: '/juegos/angulo-recto', emoji: '📐', gradient: 'from-amber-500 to-rose-600',
      titulo: tr({ es: 'Ángulo Recto (juego)', en: 'Right Angle (game)', ca: 'Angle Recte (joc)' }),
      descripcion: tr({ es: 'Triángulos a escala con el ángulo marcado arriba o abajo: razones, Pitágoras, lados, ángulos y problemas contra reloj.', en: 'Triangles to scale with the angle marked at the top or bottom: ratios, Pythagoras, sides, angles and problems against the clock.', ca: 'Triangles a escala amb l’angle marcat a dalt o a baix: raons, Pitàgores, costats, angles i problemes contra rellotge.' }),
      detalles: [tr({ es: '3 niveles', en: '3 levels', ca: '3 nivells' }), tr({ es: '60 segundos', en: '60 seconds', ca: '60 segons' }), tr({ es: 'Ranking', en: 'Leaderboard', ca: 'Rànquing' })],
    },
    {
      to: '/examen/angulo-recto-test', emoji: '📐', gradient: 'from-rose-500 to-fuchsia-700',
      titulo: tr({ es: 'Ángulo Recto (examen con el juego)', en: 'Right Angle (exam with the game)', ca: 'Angle Recte (examen amb el joc)' }),
      descripcion: tr({ es: 'Los mismos triángulos, sin reloj y con nota: diez preguntas de razones, lados, ángulos y problemas.', en: 'The same triangles, no timer and with a mark: ten questions on ratios, sides, angles and problems.', ca: 'Els mateixos triangles, sense rellotge i amb nota: deu preguntes de raons, costats, angles i problemes.' }),
      detalles: [tr({ es: '3 niveles', en: '3 levels', ca: '3 nivells' }), tr({ es: '10 preguntas', en: '10 questions', ca: '10 preguntes' }), tr({ es: 'Sin cronómetro', en: 'No timer', ca: 'Sense cronòmetre' })],
    },
    {
      to: '/examen/trigonometria', emoji: '📝', gradient: 'from-violet-500 to-indigo-700',
      titulo: tr({ es: 'Examen de teoría', en: 'Theory exam', ca: 'Examen de teoria' }),
      descripcion: tr({ es: 'Tipo test sobre razones trigonométricas, relaciones entre ellas, ángulos notables y resolución de triángulos, con explicación en cada respuesta.', en: 'Multiple choice on trig ratios, the relations between them, special angles and solving triangles, with an explanation for each answer.', ca: 'Tipus test sobre raons trigonomètriques, relacions entre elles, angles notables i resolució de triangles, amb explicació a cada resposta.' }),
      detalles: [tr({ es: 'Opción múltiple', en: 'Multiple choice', ca: 'Opció múltiple' }), tr({ es: 'ESO y Bachillerato', en: 'Secondary & Sixth form', ca: 'ESO i Batxillerat' }), tr({ es: 'Nota final', en: 'Final mark', ca: 'Nota final' })],
    },
  ]

  const ejemplos = [
    { cuenta: tr({ es: 'sen α = opuesto ÷ hipotenusa', en: 'sin α = opposite ÷ hypotenuse', ca: 'sin α = oposat ÷ hipotenusa' }), que: tr({ es: 'En un triángulo 3-4-5 con α frente al 3: sen α = 3/5', en: 'In a 3-4-5 triangle with α facing the 3: sin α = 3/5', ca: 'En un triangle 3-4-5 amb α davant del 3: sin α = 3/5' }) },
    { cuenta: tr({ es: 'cos α = contiguo ÷ hipotenusa', en: 'cos α = adjacent ÷ hypotenuse', ca: 'cos α = contigu ÷ hipotenusa' }), que: tr({ es: 'En el mismo triángulo: cos α = 4/5', en: 'In the same triangle: cos α = 4/5', ca: 'En el mateix triangle: cos α = 4/5' }) },
    { cuenta: tr({ es: 'tan α = opuesto ÷ contiguo', en: 'tan α = opposite ÷ adjacent', ca: 'tg α = oposat ÷ contigu' }), que: tr({ es: 'Y tan α = 3/4. Además, sen² α + cos² α = 1', en: 'And tan α = 3/4. Also, sin² α + cos² α = 1', ca: 'I tg α = 3/4. A més, sin² α + cos² α = 1' }) },
    { cuenta: tr({ es: 'altura = 5 · sen 60° ≈ 4,3 m', en: 'height = 5 · sin 60° ≈ 4.3 m', ca: 'alçada = 5 · sin 60° ≈ 4,3 m' }), que: tr({ es: 'Escalera de 5 m apoyada a 60° del suelo', en: 'A 5 m ladder leaning at 60° to the ground', ca: 'Escala de 5 m recolzada a 60° del terra' }) },
  ]

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <SEOHead title={titulo} description={desc} path={PATH} />
      <CourseSchema name={titulo} description={desc} path={PATH} lang={lang} subject={tr({ es: 'Matemáticas', en: 'Mathematics', ca: 'Matemàtiques' })} />
      <BreadcrumbSchema lang={lang} items={[
        { name: tr({ es: 'Estudiar', en: 'Study', ca: 'Estudiar' }), path: '/estudiar' },
        { name: tr({ es: 'Matemáticas', en: 'Mathematics', ca: 'Matemàtiques' }), path: '/estudiar/matematicas' },
        { name: titulo, path: PATH },
      ]} />
      <div className="max-w-2xl mx-auto w-full mb-6">
        <p className="text-white/30 text-xs mb-4">
          <Link to={localPath('/estudiar/matematicas')} className="hover:text-white/60 transition-colors">{tr({ es: 'Matemáticas', en: 'Mathematics', ca: 'Matemàtiques' })}</Link>
          {' '}/{' '}<span className="text-white/50">{titulo}</span>
        </p>
        <div className="flex items-center gap-4">
          <span className="text-5xl">📐</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{titulo}</h1>
            <p className="text-white/40 text-sm mt-0.5">{tr({ es: 'Seno, coseno, tangente y resolución de triángulos', en: 'Sine, cosine, tangent and solving triangles', ca: 'Sinus, cosinus, tangent i resolució de triangles' })}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full space-y-4">
        <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">{tr({ es: 'Modos disponibles', en: 'Available modes', ca: 'Modes disponibles' })}</p>
        {opciones.map(o => (
          <Link key={o.to} to={localPath(o.to)}
            className="block w-full group relative rounded-2xl overflow-hidden text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/40">
            <div className={`bg-gradient-to-br ${o.gradient} p-6`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">{o.emoji}</span>
                    <h2 className="font-black text-white text-xl">{o.titulo}</h2>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">{o.descripcion}</p>
                  <div className="flex flex-wrap gap-2">
                    {o.detalles.map(d => <span key={d} className="text-xs font-semibold bg-black/25 text-white/80 px-2.5 py-1 rounded-full border border-white/10">{d}</span>)}
                  </div>
                </div>
                <div className="shrink-0 mt-1 w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
                  <span className="text-white font-black text-lg">→</span>
                </div>
              </div>
            </div>
          </Link>
        ))}

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 mt-6">
          <h2 className="text-white font-black text-lg mb-2">{tr({ es: 'Lo primero: qué lado es cada uno', en: 'First things first: which side is which', ca: 'El primer: quin costat és cadascun' })}</h2>
          <p className="text-white/70 text-sm leading-relaxed mb-2">
            {tr({
              es: 'En un triángulo rectángulo, la hipotenusa es el lado más largo, el que está enfrente del ángulo recto. Los otros dos son los catetos, y su nombre depende del ángulo agudo con el que se trabaje: el cateto opuesto es el que está delante de ese ángulo y el contiguo (o adyacente) es el que lo forma junto con la hipotenusa. Por eso, si se cambia de ángulo, el opuesto pasa a ser el contiguo y al revés: es el error más frecuente.',
              en: 'In a right-angled triangle the hypotenuse is the longest side, the one opposite the right angle. The other two are the legs, and their names depend on which acute angle you are working with: the opposite side faces that angle and the adjacent side forms it together with the hypotenuse. So if you switch angles, the opposite side becomes the adjacent one and vice versa: it is the most common mistake.',
              ca: 'En un triangle rectangle, la hipotenusa és el costat més llarg, el que hi ha davant de l’angle recte. Els altres dos són els catets, i el seu nom depèn de l’angle agut amb què es treballi: el catet oposat és el que hi ha davant d’aquest angle i el contigu (o adjacent) és el que el forma juntament amb la hipotenusa. Per això, si es canvia d’angle, l’oposat passa a ser el contigu i a l’inrevés: és l’error més freqüent.',
            })}
          </p>
          <p className="text-white/70 text-sm leading-relaxed mb-3">
            {tr({
              es: 'Las razones trigonométricas son cocientes entre lados y solo dependen del ángulo, no del tamaño del triángulo. Para hallar un lado se elige la razón que une el lado conocido con el buscado y se despeja; para hallar un ángulo se calcula la razón y se usa la tecla inversa de la calculadora (sen⁻¹, cos⁻¹ o tan⁻¹). Los ángulos de 30°, 45° y 60° tienen valores exactos que conviene saber de memoria: sen 30° = 1/2, sen 45° = √2/2 y sen 60° = √3/2.',
              en: 'Trig ratios are quotients of sides and depend only on the angle, not on the size of the triangle. To find a side, pick the ratio that links the known side with the one you want and rearrange; to find an angle, work out the ratio and use the inverse key on the calculator (sin⁻¹, cos⁻¹ or tan⁻¹). The 30°, 45° and 60° angles have exact values worth knowing by heart: sin 30° = 1/2, sin 45° = √2/2 and sin 60° = √3/2.',
              ca: 'Les raons trigonomètriques són quocients entre costats i només depenen de l’angle, no de la mida del triangle. Per trobar un costat es tria la raó que uneix el costat conegut amb el buscat i s’aïlla; per trobar un angle es calcula la raó i es fa servir la tecla inversa de la calculadora (sin⁻¹, cos⁻¹ o tg⁻¹). Els angles de 30°, 45° i 60° tenen valors exactes que convé saber de memòria: sin 30° = 1/2, sin 45° = √2/2 i sin 60° = √3/2.',
            })}
          </p>
          <ul className="space-y-1.5">
            {ejemplos.map(e => (
              <li key={e.cuenta} className="flex flex-wrap items-baseline gap-x-2 text-sm">
                <span className="font-bold text-amber-200 tabular-nums">{e.cuenta}</span>
                <span className="text-white/55">{e.que}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
