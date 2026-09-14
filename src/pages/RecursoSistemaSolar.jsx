import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOEstatico from '../components/SEOEstatico'
import SistemaSolar3D from '../components/SistemaSolar3D'
import { PLANETAS } from '../data/planetas'
import { IDS, FISICOS, KM_POR_UA, posicion, distanciaAlSol, distanciaEntre, apsides } from '../lib/orbitasPlanetas'

// /recursos/sistema-solar — el sistema solar en 3D con los planetas donde
// están de verdad en la fecha elegida (lib/orbitasPlanetas.js). Se gira, se
// hace avanzar el tiempo y se toca un planeta para ver sus datos.

const RUTA = '/recursos/sistema-solar'
// Los elementos orbitales del JPL que se usan valen de 1800 a 2050.
const MIN = new Date('1800-01-01T12:00:00Z')
const MAX = new Date('2050-12-31T12:00:00Z')
const ahora = () => new Date()

const VELOCIDADES = [
  { id: 'dia', dias: 1, label: { es: '1 día/s', en: '1 day/s', ca: '1 dia/s' } },
  { id: 'semana', dias: 7, label: { es: '1 semana/s', en: '1 week/s', ca: '1 setmana/s' } },
  { id: 'mes', dias: 30, label: { es: '1 mes/s', en: '1 month/s', ca: '1 mes/s' } },
  { id: 'anio', dias: 365, label: { es: '1 año/s', en: '1 year/s', ca: '1 any/s' } },
]
const VISTAS = [
  { id: 'arriba', el: 90, label: { es: 'Desde arriba', en: 'From above', ca: 'Des de dalt' } },
  { id: 'inclinada', el: 35, label: { es: 'Inclinada', en: 'Tilted', ca: 'Inclinada' } },
  { id: 'canto', el: 4, label: { es: 'De canto', en: 'Edge-on', ca: 'De cantell' } },
]

const TX = {
  recursos: { es: 'Recursos', en: 'Resources', ca: 'Recursos' },
  titulo: { es: 'El sistema solar en 3D', en: 'The solar system in 3D', ca: 'El sistema solar en 3D' },
  intro: {
    es: 'Los planetas están donde están de verdad en la fecha que elijas. Arrastra para girar, dale al play para que pase el tiempo y toca un planeta para ver sus datos.',
    en: 'The planets are where they really are on the date you choose. Drag to rotate, press play to let time pass and tap a planet to see its facts.',
    ca: 'Els planetes són on són de veritat en la data que triïs. Arrossega per girar, prem el play perquè passi el temps i toca un planeta per veure les seves dades.',
  },
  hoy: { es: 'Hoy', en: 'Today', ca: 'Avui' },
  play: { es: '▶ Avanzar', en: '▶ Play', ca: '▶ Avançar' },
  pausa: { es: '⏸ Parar', en: '⏸ Pause', ca: '⏸ Aturar' },
  distancias: { es: 'Distancias', en: 'Distances', ca: 'Distàncies' },
  comprimidas: { es: 'Comprimidas', en: 'Compressed', ca: 'Comprimides' },
  reales: { es: 'Reales', en: 'Real', ca: 'Reals' },
  tamanos: { es: 'Tamaños', en: 'Sizes', ca: 'Mides' },
  exagerados: { es: 'Exagerados', en: 'Enlarged', ca: 'Exagerades' },
  aEscala: { es: 'A escala', en: 'To scale', ca: 'A escala' },
  queVes: { es: '¿Qué estás viendo?', en: 'What are you looking at?', ca: 'Què estàs veient?' },
  fuente: {
    es: 'Las posiciones se calculan con los datos orbitales del JPL (NASA) y la ecuación de Kepler. Valen de 1800 a 2050.',
    en: "Positions are calculated from JPL (NASA) orbital data and Kepler's equation. They are valid from 1800 to 2050.",
    ca: "Les posicions es calculen amb les dades orbitals del JPL (NASA) i l'equació de Kepler. Valen de 1800 a 2050.",
  },
  distComprimida: {
    es: 'Las distancias están comprimidas. A escala real, si Neptuno cupiera en la pantalla, Mercurio, Venus, la Tierra y Marte quedarían amontonados junto al Sol. Pruébalo con «Reales».',
    en: 'Distances are compressed. At real scale, if Neptune fitted on screen, Mercury, Venus, Earth and Mars would be crammed next to the Sun. Try it with "Real".',
    ca: 'Les distàncies estan comprimides. A escala real, si Neptú cabés a la pantalla, Mercuri, Venus, la Terra i Mart quedarien amuntegats al costat del Sol. Prova-ho amb «Reals».',
  },
  distReal: {
    es: 'Distancias a escala: fíjate en lo juntos que están los cuatro planetas rocosos y lo lejos que quedan Urano y Neptuno. Acércate con el zoom para verlos.',
    en: 'Distances to scale: notice how close together the four rocky planets are and how far away Uranus and Neptune lie. Zoom in to see them.',
    ca: 'Distàncies a escala: fixa-t\'hi en com de junts són els quatre planetes rocosos i com de lluny queden Urà i Neptú. Apropa-t\'hi amb el zoom per veure\'ls.',
  },
  tamExagerado: {
    es: 'Los planetas están dibujados mucho más grandes de lo que son: a escala con estas distancias serían invisibles. El Sol tampoco está a escala: es unas 10 veces más ancho que Júpiter.',
    en: 'The planets are drawn much bigger than they are: to scale with these distances they would be invisible. The Sun is not to scale either: it is about 10 times wider than Jupiter.',
    ca: 'Els planetes estan dibuixats molt més grans del que són: a escala amb aquestes distàncies serien invisibles. El Sol tampoc no està a escala: és unes 10 vegades més ample que Júpiter.',
  },
  tamReal: {
    es: 'Tamaños a escala entre los planetas: en Júpiter cabrían 11 Tierras en fila. El Sol no está a escala, porque no cabría.',
    en: 'Sizes to scale between the planets: 11 Earths would fit across Jupiter. The Sun is not to scale, because it would not fit.',
    ca: 'Mides a escala entre els planetes: a Júpiter hi cabrien 11 Terres en fila. El Sol no està a escala, perquè no hi cabria.',
  },
  orbitas: {
    es: 'Las órbitas son las reales: elipses, pero casi círculos. La de la Tierra se aparta de un círculo menos de un 0,02 %; los libros las dibujan muy estiradas para que se note la forma. Lo que sí se ve es que el Sol no está en el centro: en naranja, el perihelio (lo más cerca del Sol) y el afelio (lo más lejos) del planeta elegido. Prueba con Mercurio o Marte y acércate con el zoom.',
    en: "The orbits are the real ones: ellipses, but almost circles. Earth's differs from a circle by less than 0.02%; textbooks draw them very stretched so the shape shows. What you can see is that the Sun is not at the centre: in orange, the perihelion (closest to the Sun) and aphelion (farthest) of the chosen planet. Try Mercury or Mars and zoom in.",
    ca: "Les òrbites són les reals: el·lipses, però gairebé cercles. La de la Terra s'aparta d'un cercle menys d'un 0,02 %; els llibres les dibuixen molt estirades perquè es noti la forma. El que sí que es veu és que el Sol no és al centre: en taronja, el periheli (el punt més a prop del Sol) i l'afeli (el més lluny) del planeta triat. Prova amb Mercuri o Mart i apropa-t'hi amb el zoom.",
  },
  orbita: { es: 'Órbita', en: 'Orbit', ca: 'Òrbita' },
  alSol: { es: 'Distancia al Sol', en: 'Distance to the Sun', ca: 'Distància al Sol' },
  aTierra: { es: 'Distancia a la Tierra', en: 'Distance to Earth', ca: 'Distància a la Terra' },
  diametro: { es: 'Diámetro', en: 'Diameter', ca: 'Diàmetre' },
  anio: { es: 'Año (vuelta al Sol)', en: 'Year (orbit of the Sun)', ca: 'Any (volta al Sol)' },
  dia: { es: 'Día (vuelta sobre sí mismo)', en: 'Day (one spin)', ca: 'Dia (volta sobre si mateix)' },
  lunas: { es: 'Lunas', en: 'Moons', ca: 'Llunes' },
  temperatura: { es: 'Temperatura media', en: 'Mean temperature', ca: 'Temperatura mitjana' },
  eje: { es: 'Inclinación del eje', en: 'Axial tilt', ca: "Inclinació de l'eix" },
  lunasNota: { es: 'confirmadas en 2025; se descubren nuevas a menudo', en: 'confirmed in 2025; new ones are found often', ca: "confirmades el 2025; se'n descobreixen de noves sovint" },
  practica: { es: 'Practica', en: 'Practise', ca: 'Practica' },
  juego: { es: '🔭 Órbita', en: '🔭 Orbit', ca: '🔭 Òrbita' },
  examen: { es: '📝 Examen del sistema solar', en: '📝 Solar system exam', ca: '📝 Examen del sistema solar' },
  mas: { es: '🧰 Más recursos', en: '🧰 More resources', ca: '🧰 Més recursos' },
}

const PLANETA = Object.fromEntries(PLANETAS.map(p => [p.id, p]))
const isoDia = f => f.toISOString().slice(0, 10)

export default function RecursoSistemaSolar() {
  const { lang, tr, localPath } = useLang()
  const [fecha, setFecha] = useState(() => ahora())
  const [jugando, setJugando] = useState(false)
  const [velocidad, setVelocidad] = useState(VELOCIDADES[1])
  const [camara, setCamara] = useState({ az: 300, el: 50 })
  const [zoom, setZoom] = useState(1)
  const [modoDistancia, setModoDistancia] = useState('comprimida')
  const [modoTamano, setModoTamano] = useState('exagerado')
  const [seleccionado, setSeleccionado] = useState('tierra')

  // El tiempo avanza según el tiempo REAL transcurrido, no por fotograma: la
  // velocidad es la misma en un móvil a 30 fps que en un ordenador a 144.
  //
  // Con un temporizador y no con requestAnimationFrame, a propósito. Con rAF
  // el reloj se congelaba entero en cuanto el navegador dejaba de pintar
  // (pestaña de fondo, ahorro de batería, una ventana oculta): verificándolo,
  // el navegador entregó 0 fotogramas en 3 segundos y la fecha no se movió.
  // 25 pasos por segundo sobran para un SVG, y el tope de medio segundo por
  // paso evita un salto de años al volver a una pestaña que estuvo dormida.
  useEffect(() => {
    if (!jugando) return
    let ultimo = performance.now()
    const id = setInterval(() => {
      const t = performance.now()
      const dt = Math.min(0.5, (t - ultimo) / 1000)
      ultimo = t
      setFecha(f => {
        const n = new Date(f.getTime() + dt * velocidad.dias * 86400000)
        return n > MAX ? MAX : n
      })
    }, 40)
    return () => clearInterval(id)
  }, [jugando, velocidad])

  const n = (v, dec = 0) => new Intl.NumberFormat(lang, { maximumFractionDigits: dec }).format(v)

  const id = seleccionado
  const fis = FISICOS[id]
  const pos = posicion(id, fecha)
  const rSol = distanciaAlSol(pos)
  const dTierra = id === 'tierra' ? null : distanciaEntre(pos, posicion('tierra', fecha))
  const mkm = ua => n((ua * KM_POR_UA) / 1e6)
  const ap = apsides(id)

  const datos = [
    [TX.alSol, tr({ es: `${n(rSol, 2)} UA · ${mkm(rSol)} millones de km`, en: `${n(rSol, 2)} AU · ${mkm(rSol)} million km`, ca: `${n(rSol, 2)} UA · ${mkm(rSol)} milions de km` })],
    [TX.orbita, tr({
      es: `perihelio ${n(ap.q, 3)} UA · afelio ${n(ap.Q, 3)} UA · excentricidad ${n(ap.e, 3)} (0 sería un círculo)`,
      en: `perihelion ${n(ap.q, 3)} AU · aphelion ${n(ap.Q, 3)} AU · eccentricity ${n(ap.e, 3)} (0 would be a circle)`,
      ca: `periheli ${n(ap.q, 3)} UA · afeli ${n(ap.Q, 3)} UA · excentricitat ${n(ap.e, 3)} (0 seria un cercle)`,
    })],
    ...(dTierra !== null ? [[TX.aTierra, tr({
      es: `${n(dTierra, 2)} UA · ${mkm(dTierra)} millones de km · la luz tarda ${n((dTierra * KM_POR_UA) / 299792.458 / 60)} min`,
      en: `${n(dTierra, 2)} AU · ${mkm(dTierra)} million km · light takes ${n((dTierra * KM_POR_UA) / 299792.458 / 60)} min`,
      ca: `${n(dTierra, 2)} UA · ${mkm(dTierra)} milions de km · la llum triga ${n((dTierra * KM_POR_UA) / 299792.458 / 60)} min`,
    })]] : []),
    [TX.diametro, tr({ es: `${n(fis.diametro)} km (${n(fis.diametro / FISICOS.tierra.diametro, 2)} Tierras)`, en: `${n(fis.diametro)} km (${n(fis.diametro / FISICOS.tierra.diametro, 2)} Earths)`, ca: `${n(fis.diametro)} km (${n(fis.diametro / FISICOS.tierra.diametro, 2)} Terres)` })],
    [TX.anio, fis.periodo < 400
      ? tr({ es: `${n(fis.periodo)} días`, en: `${n(fis.periodo)} days`, ca: `${n(fis.periodo)} dies` })
      : tr({ es: `${n(fis.periodo / 365.25, 1)} años`, en: `${n(fis.periodo / 365.25, 1)} years`, ca: `${n(fis.periodo / 365.25, 1)} anys` })],
    [TX.dia, (() => {
      const h = Math.abs(fis.dia)
      const base = h < 48
        ? tr({ es: `${n(h, 1)} horas`, en: `${n(h, 1)} hours`, ca: `${n(h, 1)} hores` })
        : tr({ es: `${n(h / 24)} días terrestres`, en: `${n(h / 24)} Earth days`, ca: `${n(h / 24)} dies terrestres` })
      return fis.dia < 0 ? `${base} ${tr({ es: '(gira al revés)', en: '(spins backwards)', ca: '(gira al revés)' })}` : base
    })()],
    [TX.lunas, fis.lunas >= 10 ? `${fis.lunas} (${tr(TX.lunasNota)})` : String(fis.lunas)],
    [TX.temperatura, `${n(fis.temperatura)} °C`],
    [TX.eje, `${n(fis.eje, 1)}°`],
  ]

  const fechaTexto = fecha.toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' })
  const chip = activo => `text-[12.5px] font-bold px-3 py-1.5 rounded-lg border transition-colors ${
    activo ? 'bg-white/15 border-white/25 text-white' : 'border-white/10 text-white/45 hover:text-white/80 hover:bg-white/5'}`

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOEstatico path={RUTA} />

      <p className="text-white/35 text-xs mb-3">
        <Link to={localPath('/recursos')} className="hover:text-white/60">{tr(TX.recursos)}</Link>
      </p>
      <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-2">🌌 {tr(TX.titulo)}</h1>
      <p className="text-white/55 text-[15px] leading-relaxed mb-5">{tr(TX.intro)}</p>

      {/* Tiempo */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <button type="button" onClick={() => setJugando(j => !j)}
          className="text-sm font-black px-4 py-2 rounded-xl bg-[#EDAE49] text-black hover:bg-amber-400 transition-colors">
          {tr(jugando ? TX.pausa : TX.play)}
        </button>
        {VELOCIDADES.map(v => (
          <button key={v.id} type="button" onClick={() => setVelocidad(v)} className={chip(velocidad.id === v.id)}>{tr(v.label)}</button>
        ))}
        <button type="button" onClick={() => { setJugando(false); setFecha(ahora()) }} className={chip(false)}>{tr(TX.hoy)}</button>
        <input type="date" value={isoDia(fecha)} min={isoDia(MIN)} max={isoDia(MAX)}
          onChange={e => {
            const d = new Date(`${e.target.value}T12:00:00Z`)
            if (!Number.isNaN(d.getTime()) && d >= MIN && d <= MAX) { setJugando(false); setFecha(d) }
          }}
          className="bg-black/30 border border-white/15 rounded-lg px-2 py-1.5 text-white text-sm [color-scheme:dark]" />
      </div>
      <p className="text-white font-black text-lg mb-3 tabular-nums">{fechaTexto}</p>

      <SistemaSolar3D fecha={fecha} camara={camara} zoom={zoom} modoDistancia={modoDistancia} modoTamano={modoTamano}
        seleccionado={seleccionado} onSeleccionar={setSeleccionado} onCamara={setCamara} />

      {/* Vista y escala */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        {VISTAS.map(v => (
          <button key={v.id} type="button" onClick={() => setCamara(c => ({ ...c, el: v.el }))} className={chip(Math.abs(camara.el - v.el) < 1)}>{tr(v.label)}</button>
        ))}
        <span className="w-px h-6 bg-white/10 mx-1" />
        <button type="button" onClick={() => setZoom(z => Math.max(0.5, z / 1.4))} className={chip(false)} aria-label="zoom −">−</button>
        <button type="button" onClick={() => setZoom(z => Math.min(12, z * 1.4))} className={chip(false)} aria-label="zoom +">+</button>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3 text-xs text-white/45">
        <span className="flex items-center gap-1.5">
          {tr(TX.distancias)}:
          <button type="button" onClick={() => setModoDistancia('comprimida')} className={chip(modoDistancia === 'comprimida')}>{tr(TX.comprimidas)}</button>
          <button type="button" onClick={() => setModoDistancia('real')} className={chip(modoDistancia === 'real')}>{tr(TX.reales)}</button>
        </span>
        <span className="flex items-center gap-1.5">
          {tr(TX.tamanos)}:
          <button type="button" onClick={() => setModoTamano('exagerado')} className={chip(modoTamano === 'exagerado')}>{tr(TX.exagerados)}</button>
          <button type="button" onClick={() => setModoTamano('real')} className={chip(modoTamano === 'real')}>{tr(TX.aEscala)}</button>
        </span>
      </div>

      {/* Planetas */}
      <div className="flex flex-wrap gap-1.5 mt-5 mb-3">
        {IDS.map(p => (
          <button key={p} type="button" onClick={() => setSeleccionado(p)} className={chip(p === seleccionado)}>
            <span className="inline-block w-2.5 h-2.5 rounded-full mr-1.5 align-middle" style={{ background: FISICOS[p].color }} />
            {tr(PLANETA[p].nombre)}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-[1.2fr_1fr] gap-3">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h2 className="text-white font-black text-xl mb-1">{PLANETA[id].emoji} {tr(PLANETA[id].nombre)}</h2>
          <p className="text-white/60 text-[14px] leading-relaxed mb-3">{tr(PLANETA[id].dato)}</p>
          <dl className="space-y-1.5">
            {datos.map(([k, v]) => (
              <div key={k.es} className="flex flex-wrap gap-x-2 text-[13.5px]">
                <dt className="text-white/45">{tr(k)}:</dt>
                <dd className="text-white font-semibold tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="rounded-2xl border border-white/10 bg-white/5 p-4 text-[13.5px] leading-relaxed text-white/60 space-y-2">
          <h2 className="text-white font-black text-base">{tr(TX.queVes)}</h2>
          <p>{tr(TX.orbitas)}</p>
          <p>{tr(modoDistancia === 'real' ? TX.distReal : TX.distComprimida)}</p>
          <p>{tr(modoTamano === 'real' ? TX.tamReal : TX.tamExagerado)}</p>
          <p className="text-white/40 text-xs">{tr(TX.fuente)}</p>
        </section>
      </div>

      <div className="mt-10 pt-6 border-t border-white/10">
        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{tr(TX.practica)}</p>
        <div className="flex flex-wrap gap-2">
          <Link to={localPath('/juegos/orbita')} className="text-sm font-bold px-4 py-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white">{tr(TX.juego)}</Link>
          <Link to={localPath('/examen/sistema-solar')} className="text-sm font-bold px-4 py-2 rounded-xl bg-violet-600/80 hover:bg-violet-600 text-white">{tr(TX.examen)}</Link>
          <Link to={localPath('/recursos')} className="text-sm font-bold px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white">{tr(TX.mas)}</Link>
        </div>
      </div>
    </div>
  )
}
