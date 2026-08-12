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
