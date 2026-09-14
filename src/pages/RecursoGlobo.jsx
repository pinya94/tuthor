import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOEstatico from '../components/SEOEstatico'
import GloboTerraqueo from '../components/GloboTerraqueo'
import {
  PAISES_GLOBO, CONTINENTES, INCLINACION_EJE, nombrePais, capitalPais, paisEn, buscarPaises,
  puntoSubsolar, coordTexto, rotacionHacia,
} from '../lib/globo'

// /recursos/globo-terraqueo — la Tierra en 3D. Toda la geografía está en
// lib/globo.js; esta página guarda la vista, busca países y explica lo que se
// ve.

const RUTA = '/recursos/globo-terraqueo'
const ahora = () => new Date()
// performance.now() solo se llama en manejadores y temporizadores, pero el
// compilador de React no distingue volarA (llamada desde un clic) del render y
// la marca como impura. Envuelta aquí desaparece el aviso sin mover la llamada.
const reloj = () => performance.now()
const ESPANA = PAISES_GLOBO.find(g => g.pais?.iso === 'ESP')

const HEMISFERIO = {
  norte: { es: 'Norte', en: 'Northern', ca: 'Nord' },
  sur: { es: 'Sur', en: 'Southern', ca: 'Sud' },
  ambos: { es: 'Los dos: lo cruza el ecuador', en: 'Both: the equator crosses it', ca: "Els dos: el travessa l'equador" },
}

const TX = {
  recursos: { es: 'Recursos', en: 'Resources', ca: 'Recursos' },
  titulo: { es: 'El globo terráqueo en 3D', en: 'The globe in 3D', ca: 'El globus terraqüi en 3D' },
  intro: {
    es: 'Arrastra para girar la Tierra, toca un país para ver su ficha y pasa el dedo o el ratón por encima para leer la latitud y la longitud de cualquier punto.',
    en: 'Drag to spin the Earth, tap a country to see its facts and move your finger or mouse over it to read the latitude and longitude of any point.',
    ca: "Arrossega per girar la Terra, toca un país per veure'n la fitxa i passa-hi el dit o el ratolí per llegir la latitud i la longitud de qualsevol punt.",
  },
  buscar: { es: 'Buscar un país…', en: 'Search for a country…', ca: 'Cercar un país…' },
  lineas: { es: 'Ecuador y trópicos', en: 'Equator and tropics', ca: 'Equador i tròpics' },
  noche: { es: 'Día y noche ahora', en: 'Day and night now', ca: 'Dia i nit ara' },
  girar: { es: 'Girar solo', en: 'Auto-spin', ca: 'Girar sol' },
  puntero: { es: 'Bajo el puntero', en: 'Under the pointer', ca: 'Sota el punter' },
  pistaPuntero: { es: 'Pasa el ratón o toca el globo para leer las coordenadas.', en: 'Hover over or tap the globe to read the coordinates.', ca: 'Passa el ratolí o toca el globus per llegir les coordenades.' },
  mar: { es: 'mar', en: 'sea', ca: 'mar' },
  capital: { es: 'Capital', en: 'Capital', ca: 'Capital' },
  continente: { es: 'Continente', en: 'Continent', ca: 'Continent' },
  poblacion: { es: 'Población', en: 'Population', ca: 'Població' },
  superficie: { es: 'Superficie', en: 'Area', ca: 'Superfície' },
  hemisferio: { es: 'Hemisferio', en: 'Hemisphere', ca: 'Hemisferi' },
  idioma: { es: 'Idioma', en: 'Language', ca: 'Idioma' },
  rio: { es: 'Río principal', en: 'Main river', ca: 'Riu principal' },
  montana: { es: 'Montaña más alta', en: 'Highest mountain', ca: 'Muntanya més alta' },
  sinFicha: { es: 'Tuthor todavía no tiene ficha de este país.', en: 'Tuthor does not have facts for this country yet.', ca: "Tuthor encara no té fitxa d'aquest país." },
  tocaUno: { es: 'Toca un país del globo para ver su ficha.', en: 'Tap a country on the globe to see its facts.', ca: 'Toca un país del globus per veure la seva fitxa.' },
  queVes: { es: '¿Qué estás viendo?', en: 'What are you looking at?', ca: 'Què estàs veient?' },
  latLon: {
    es: 'La latitud dice cuánto al norte o al sur del ecuador está un punto (de 0° a 90°); la longitud, cuánto al este o al oeste del meridiano de Greenwich (de 0° a 180°). Con las dos, cualquier lugar de la Tierra tiene una dirección única.',
    en: 'Latitude says how far north or south of the equator a point is (0° to 90°); longitude, how far east or west of the Greenwich meridian (0° to 180°). Together, they give every place on Earth a unique address.',
    ca: "La latitud diu quant al nord o al sud de l'equador és un punt (de 0° a 90°); la longitud, quant a l'est o a l'oest del meridià de Greenwich (de 0° a 180°). Amb les dues, qualsevol lloc de la Terra té una adreça única.",
  },
  tropicos: {
    es: `Los trópicos están a ${INCLINACION_EJE}°, que es lo que está inclinado el eje de la Tierra: son el límite de hasta dónde puede llegar el Sol a estar en vertical. Más allá de los círculos polares hay al menos un día al año en que el Sol no sale y otro en que no se pone.`,
    en: `The tropics lie at ${INCLINACION_EJE}°, which is how much Earth's axis is tilted: they are the furthest the Sun can ever be directly overhead. Beyond the polar circles there is at least one day a year when the Sun does not rise and another when it does not set.`,
    ca: `Els tròpics són a ${INCLINACION_EJE}°, que és el que està inclinat l'eix de la Terra: són el límit fins on pot arribar el Sol a estar en vertical. Més enllà dels cercles polars hi ha almenys un dia a l'any en què el Sol no surt i un altre en què no es pon.`,
  },
  forma: {
    es: 'En un mapa plano, Groenlandia parece tan grande como África. En el globo se ve la verdad: África es unas 14 veces más grande. Toda proyección plana deforma algo; la esfera no.',
    en: 'On a flat map, Greenland looks as big as Africa. On the globe you see the truth: Africa is about 14 times larger. Every flat projection distorts something; the sphere does not.',
    ca: "En un mapa pla, Groenlàndia sembla tan gran com l'Àfrica. Al globus es veu la veritat: l'Àfrica és unes 14 vegades més gran. Tota projecció plana deforma alguna cosa; l'esfera no.",
  },
  practica: { es: 'Practica', en: 'Practise', ca: 'Practica' },
  coordenadas: { es: '🧭 Coordenadas', en: '🧭 Coordinates', ca: '🧭 Coordenades' },
  geomapa: { es: '🗺️ GeoMapa', en: '🗺️ GeoMap', ca: '🗺️ GeoMapa' },
  mas: { es: '🧰 Más recursos', en: '🧰 More resources', ca: '🧰 Més recursos' },
}

export default function RecursoGlobo() {
  const { lang, tr, localPath } = useLang()
  const [rotacion, setRotacion] = useState(() => rotacionHacia(...ESPANA.centro))
  const [zoom, setZoom] = useState(1)
  const [seleccionado, setSeleccionado] = useState(ESPANA.id)
  const [mostrarLineas, setMostrarLineas] = useState(true)
  const [fechaSol, setFechaSol] = useState(null)
  const [girando, setGirando] = useState(false)
  const [cursor, setCursor] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const vuelo = useRef(null)

  // Girar solo: 12° por segundo de tiempo REAL. Contando ticks, un navegador que
  // espacia los temporizadores (pestaña de fondo, ventana oculta) lo haría ir a
  // cámara lenta.
  useEffect(() => {
    if (!girando) return
    let ultimo = reloj()
    const id = setInterval(() => {
      const t = reloj()
      const dt = Math.min(0.5, (t - ultimo) / 1000)
      ultimo = t
      setRotacion(([l, p]) => [l + 12 * dt, p])
    }, 40)
    return () => clearInterval(id)
  }, [girando])

  // Día y noche: se actualiza cada minuto mientras está activo.
  useEffect(() => {
    if (!fechaSol) return
    const id = setInterval(() => setFechaSol(ahora()), 60000)
    return () => clearInterval(id)
  }, [fechaSol])

  useEffect(() => () => clearInterval(vuelo.current), [])

  // Llevar un país al centro girando, no de golpe: si salta, se pierde de vista
  // dónde estaba respecto a lo que se miraba antes, que es justo lo que enseña
  // un globo.
  function volarA(g) {
    clearInterval(vuelo.current)
    setGirando(false)
    const [destL, destP] = rotacionHacia(...g.centro)
    const [iniL, iniP] = rotacion
    const dL = ((((destL - iniL) % 360) + 540) % 360) - 180
    // 0,6 s de tiempo real, no 24 ticks: verificándolo con los temporizadores
    // espaciados de una ventana oculta, contar ticks alargaba el vuelo a más de
    // 20 segundos. Por tiempo, en el peor caso da un salto y llega igual.
    const inicio = reloj()
    vuelo.current = setInterval(() => {
      const t = Math.min(1, (reloj() - inicio) / 600)
      const suave = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
      setRotacion([iniL + dL * suave, iniP + (destP - iniP) * suave])
      if (t >= 1) clearInterval(vuelo.current)
    }, 25)
  }

  function elegir(g) {
    setSeleccionado(g.id)
    setBusqueda('')
    volarA(g)
  }

  const resultados = buscarPaises(busqueda)
  const elegido = PAISES_GLOBO.find(g => g.id === seleccionado) ?? null
  const bajoCursor = cursor ? paisEn(cursor[0], cursor[1]) : null
  const sol = fechaSol ? puntoSubsolar(fechaSol) : null
  const n = v => new Intl.NumberFormat(lang).format(v)
  const chip = activo => `text-[12.5px] font-bold px-3 py-1.5 rounded-lg border transition-colors ${
    activo ? 'bg-white/15 border-white/25 text-white' : 'border-white/10 text-white/45 hover:text-white/80 hover:bg-white/5'}`

  const p = elegido?.pais
  const datos = p ? [
    [TX.capital, `${capitalPais(elegido, lang)}${elegido.capital ? ` · ${coordTexto(elegido.capital.lat, elegido.capital.lon, lang)}` : ''}`],
    [TX.continente, tr(CONTINENTES[p.continente] ?? { es: p.continente })],
    [TX.poblacion, n(p.poblacion)],
    [TX.superficie, `${n(p.area)} km²`],
    [TX.hemisferio, tr(HEMISFERIO[p.hemisferio] ?? { es: p.hemisferio })],
    // Idioma, río y montaña vienen escritos en castellano en data/paises.js
    // ("Francés", "Loira"): en la interfaz inglesa no se enseñan antes que
    // enseñarlos a medio traducir.
    ...(lang === 'en' ? [] : [[TX.idioma, p.idioma], [TX.rio, p.rio], [TX.montana, p.montana]]),
  ].filter(([, v]) => v) : []

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SEOEstatico path={RUTA} />

      <p className="text-white/35 text-xs mb-3">
        <Link to={localPath('/recursos')} className="hover:text-white/60">{tr(TX.recursos)}</Link>
      </p>
      <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-2">🌍 {tr(TX.titulo)}</h1>
      <p className="text-white/55 text-[15px] leading-relaxed mb-5">{tr(TX.intro)}</p>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-5">
        <div>
          <div className="relative mb-3">
            <input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder={tr(TX.buscar)} aria-label={tr(TX.buscar)}
              className="w-full bg-black/30 border border-white/15 rounded-xl px-3 py-2.5 text-white outline-none focus:border-[#EDAE49]" />
            {resultados.length > 0 && (
              <div className="absolute z-20 left-0 right-0 mt-1 rounded-xl border border-white/15 bg-[#111827] overflow-hidden shadow-xl">
                {resultados.map(g => (
                  <button key={g.id} type="button" onClick={() => elegir(g)}
                    className="w-full text-left px-3 py-2 text-sm text-white/85 hover:bg-white/10">
                    {g.pais?.bandera} {nombrePais(g, lang)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <GloboTerraqueo rotacion={rotacion} zoom={zoom} seleccionado={seleccionado} mostrarLineas={mostrarLineas} fechaSol={fechaSol}
            onRotar={r => { clearInterval(vuelo.current); setRotacion(r) }}
            onSeleccionar={id => setSeleccionado(id)} onCursor={setCursor} />

          <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
            <button type="button" onClick={() => setZoom(z => Math.max(0.8, z / 1.3))} className={chip(false)} aria-label="zoom −">−</button>
            <button type="button" onClick={() => setZoom(z => Math.min(5, z * 1.3))} className={chip(false)} aria-label="zoom +">+</button>
            <button type="button" onClick={() => setMostrarLineas(v => !v)} className={chip(mostrarLineas)}>{tr(TX.lineas)}</button>
            <button type="button" onClick={() => setFechaSol(f => (f ? null : ahora()))} className={chip(!!fechaSol)}>🌗 {tr(TX.noche)}</button>
            <button type="button" onClick={() => setGirando(v => !v)} className={chip(girando)}>🔄 {tr(TX.girar)}</button>
          </div>

          <p className="text-center text-sm mt-3 min-h-[1.5rem] tabular-nums">
            {cursor
              ? <><span className="text-white/45">📍 {tr(TX.puntero)}: </span><span className="text-white font-bold">{coordTexto(cursor[1], cursor[0], lang)}</span><span className="text-white/55"> · {bajoCursor ? nombrePais(bajoCursor, lang) : tr(TX.mar)}</span></>
              : <span className="text-white/35">{tr(TX.pistaPuntero)}</span>}
          </p>
        </div>

        <div className="space-y-3">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
            {elegido ? (
              <>
                <h2 className="text-white font-black text-xl mb-2">{p?.bandera} {nombrePais(elegido, lang)}</h2>
                {p ? (
                  <dl className="space-y-1.5">
                    {datos.map(([k, v]) => (
                      <div key={k.es} className="text-[13.5px]">
                        <dt className="text-white/45 inline">{tr(k)}: </dt>
                        <dd className="text-white font-semibold inline">{v}</dd>
                      </div>
                    ))}
                  </dl>
                ) : <p className="text-white/50 text-sm">{tr(TX.sinFicha)}</p>}
              </>
            ) : <p className="text-white/50 text-sm">{tr(TX.tocaUno)}</p>}
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-4 text-[13.5px] leading-relaxed text-white/60 space-y-2">
            <h2 className="text-white font-black text-base">{tr(TX.queVes)}</h2>
            <p>{tr(TX.latLon)}</p>
            {mostrarLineas && <p>{tr(TX.tropicos)}</p>}
            {sol && (
              <p>
                {tr({
                  es: `Ahora mismo el Sol está en vertical sobre ${coordTexto(sol.lat, sol.lon, lang)}. La zona oscura es donde es de noche.`,
                  en: `Right now the Sun is directly overhead at ${coordTexto(sol.lat, sol.lon, lang)}. The dark area is where it is night.`,
                  ca: `Ara mateix el Sol està en vertical sobre ${coordTexto(sol.lat, sol.lon, lang)}. La zona fosca és on és de nit.`,
                })}
              </p>
            )}
            <p>{tr(TX.forma)}</p>
          </section>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-white/10">
        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{tr(TX.practica)}</p>
        <div className="flex flex-wrap gap-2">
          <Link to={localPath('/juegos/coordenadas')} className="text-sm font-bold px-4 py-2 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white">{tr(TX.coordenadas)}</Link>
          <Link to={localPath('/juegos/geomapa')} className="text-sm font-bold px-4 py-2 rounded-xl bg-sky-600/80 hover:bg-sky-600 text-white">{tr(TX.geomapa)}</Link>
          <Link to={localPath('/recursos')} className="text-sm font-bold px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white">{tr(TX.mas)}</Link>
        </div>
      </div>
    </div>
  )
}
