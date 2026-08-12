// Datos de los 8 planetas para el juego Órbita (src/pages/Orbita.jsx) y su
// lógica (src/lib/orbita.js). Distancia media real al Sol en Unidades
// Astronómicas (1 UA = distancia Tierra-Sol) — determina el orden y las
// proporciones de las zonas del juego. El `dato` es un hecho concreto y
// verificable, no una curiosidad vaga, para que el juego enseñe algo nuevo
// en cada ronda además de reforzar el orden.
function planeta(id, distanciaUA, emoji, nombre, dato) {
  return { id, distanciaUA, emoji, nombre, dato }
}

// Orden real desde el Sol. Distancias medias en UA (fuente: valores estándar
// de mecánica orbital, redondeados a 2 decimales).
export const PLANETAS = [
  planeta('mercurio', 0.39, '⚪',
    { es: 'Mercurio', en: 'Mercury', ca: 'Mercuri' },
    { es: 'El más pequeño y el más rápido: da la vuelta al Sol en solo 88 días.', en: 'The smallest and fastest: it orbits the Sun in just 88 days.', ca: 'El més petit i el més ràpid: fa la volta al Sol en només 88 dies.' }),
  planeta('venus', 0.72, '🟡',
    { es: 'Venus', en: 'Venus', ca: 'Venus' },
    { es: 'El más caliente del sistema solar, con más de 460°C — y su día dura más que su año.', en: 'The hottest in the solar system, over 460°C — and its day lasts longer than its year.', ca: 'El més calent del sistema solar, amb més de 460°C — i el seu dia dura més que el seu any.' }),
  planeta('tierra', 1.00, '🔵',
    { es: 'Tierra', en: 'Earth', ca: 'Terra' },
    { es: 'El único planeta con vida conocida: agua líquida, atmósfera con oxígeno y la distancia justa al Sol.', en: 'The only planet with known life: liquid water, an oxygen atmosphere and just the right distance from the Sun.', ca: 'L\'únic planeta amb vida coneguda: aigua líquida, atmosfera amb oxigen i la distància justa al Sol.' }),
  planeta('marte', 1.52, '🔴',
    { es: 'Marte', en: 'Mars', ca: 'Mart' },
    { es: 'El planeta rojo: alberga el Monte Olimpo, el volcán más grande de todo el sistema solar.', en: 'The red planet: home to Olympus Mons, the largest volcano in the entire solar system.', ca: 'El planeta vermell: alberga el Mont Olimp, el volcà més gran de tot el sistema solar.' }),
  planeta('jupiter', 5.20, '🟠',
    { es: 'Júpiter', en: 'Jupiter', ca: 'Júpiter' },
    { es: 'El gigante más grande: caben más de 1.000 Tierras dentro, y su Gran Mancha Roja es una tormenta mayor que la Tierra.', en: 'The largest giant: over 1,000 Earths would fit inside, and its Great Red Spot is a storm bigger than Earth.', ca: 'El gegant més gran: hi caben més de 1.000 Terres, i la seva Gran Taca Vermella és una tempesta més gran que la Terra.' }),
  planeta('saturno', 9.58, '🟤',
    { es: 'Saturno', en: 'Saturn', ca: 'Saturn' },
    { es: 'Famoso por sus anillos de hielo y roca — es tan poco denso que flotaría en agua.', en: 'Famous for its rings of ice and rock — it is so light it would float in water.', ca: 'Famós pels seus anells de gel i roca — és tan poc dens que flotaria en aigua.' }),
  planeta('urano', 19.18, '🔵',
    { es: 'Urano', en: 'Uranus', ca: 'Urà' },
    { es: 'Gira "tumbado de lado": su eje está inclinado casi 98° respecto a su órbita.', en: 'It spins "on its side": its axis is tilted almost 98° relative to its orbit.', ca: 'Gira "ajagut de costat": el seu eix està inclinat gairebé 98° respecte a la seva òrbita.' }),
  planeta('neptuno', 30.07, '🟣',
    { es: 'Neptuno', en: 'Neptune', ca: 'Neptú' },
    { es: 'El planeta más lejano y el más ventoso: sus vientos superan los 2.000 km/h, los más rápidos del sistema solar.', en: 'The farthest and windiest planet: its winds exceed 2,000 km/h, the fastest in the solar system.', ca: 'El planeta més llunyà i el més ventós: els seus vents superen els 2.000 km/h, els més ràpids del sistema solar.' }),
]

export function getPlaneta(id) {
  return PLANETAS.find(p => p.id === id)
}
