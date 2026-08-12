// Lógica del juego Coordenadas (src/pages/Coordenadas.jsx) — mover dos
// sliders (latitud y longitud) para señalar dónde crees que está un país,
// mismo espíritu deliberado (sin reloj) que orbita.js: el reto es saber,
// no ser rápido. La distancia real decide perfecto/cerca/fallo.
import { PAISES_COORDS } from '../data/coordenadasPaises'

// Distancia entre dos puntos de la Tierra en km (fórmula del semiverseno).
export function distanciaKm(lat1, lon1, lat2, lon2) {
  const R = 6371
  const toRad = d => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// Umbrales pensados a escala de mapamundi (para referencia: España mide
// ~1.000 km de punta a punta): 400 km es "diste con el país o el vecino
// inmediato", 1.500 km es "acertaste la región".
export function evaluarDistancia(km) {
  if (km <= 400) return 'perfecto'
  if (km <= 1500) return 'cerca'
  return 'fallo'
}

// Baraja los países sin repetición (Fisher-Yates), mismo patrón que
// orbita.js / Diagnostico.jsx.
export function nuevoMazo() {
  const a = [...PAISES_COORDS]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── Examen (CoordenadasExamen.jsx, con MechanicExam) ────────────────────────
// A diferencia del juego (tolerancia fija, tiers de puntos), el examen es
// acierto/fallo simple con una tolerancia que se endurece por nivel.
const TOLERANCIA_NIVEL = { facil: 800, medio: 500, dificil: 250 }

// Mismo filtro por continente que GeoRushExamen.jsx/GeografiaTema.jsx (RUS y
// TUR pueden salir en Europa o Asia, como allí). El examen compartido de
// cada región recibe `region` por location.state — ver topicCatalog.js.
export const REGION_FILTER = {
  europa:  p => p.continente === 'Europa' || p.continente === 'Europa/Asia',
  america: p => p.continente === 'América',
  asia:    p => p.continente === 'Asia' || p.continente === 'Europa/Asia',
  africa:  p => p.continente === 'África',
  oceania: p => p.continente === 'Oceanía',
}

export function paisesDeRegion(region) {
  const filter = REGION_FILTER[region]
  return filter ? PAISES_COORDS.filter(filter) : PAISES_COORDS
}

// `region` opcional: sin ella (modo arcade global) usa el pool completo. Con
// región, sortea SOLO entre sus países — con reposición, a diferencia de
// GeoRush/GeoMapa: aquí no hace falta que las 10 preguntas sean distintas
// (Oceanía apenas tiene 3 países en el pool curado y aun así debe poder
// examinarse, aunque repita alguno).
export function genRound(difficulty = 'medio', region = null) {
  const pool = region ? paisesDeRegion(region) : PAISES_COORDS
  const candidatos = pool.length > 0 ? pool : PAISES_COORDS
  const pais = candidatos[Math.floor(Math.random() * candidatos.length)]
  return { pais, tolerancia: TOLERANCIA_NIVEL[difficulty] ?? 500 }
}

export function isCorrectGuess(round, guess) {
  const km = distanciaKm(guess.lat, guess.lon, round.pais.lat, round.pais.lon)
  return km <= round.tolerancia
}
