// Portada tipo plataforma de juegos (nov-2026): lo primero que se ve son
// los juegos. El destacado del mes y el orden de «los más jugados» salen de
// DATOS, no de gustos: GA4 → Páginas y pantallas, últimos 28 días, juegos
// ordenados por usuarios × tiempo de interacción (el tiempo topado a 10 min
// para que una sola clase muy larga no lo decida todo).
//
// CÓMO ACTUALIZARLO (una vez al mes): mirar ese informe, poner aquí el
// primero como DESTACADO (si no repite del mes anterior, mejor el segundo)
// y reordenar MAS_JUGADOS. Son slugs de ruta (/juegos/<slug>); un test
// comprueba que todos existen en el catálogo.

// Foto del 22-oct al 18-nov 2026: Nombra el Compuesto 29 jugadores y 6 min
// de media, Fuerza Neta 18 y 8,4 min, Clave Dicotómica 11 y 7,3 min…
export const DESTACADO = {
  mes: '2026-11',
  slug: 'nombra-compuesto',
  motivo: { es: 'El más jugado este mes', en: 'Most played this month', ca: 'El més jugat aquest mes' },
}

export const MAS_JUGADOS = [
  'nombra-compuesto', 'fuerza-neta', 'clave-dicotomica', 'corrige-el-texto', 'escalera-unidades',
  'bajo-presion', 'placas-movimiento', 'el-laboratorio', 'spicy', 'climograma', 'mide-el-verso',
  'verbos-irregulares', 'numpath', 'coordenadas', 'europa-27', 'cambio-estado', 'senal-a-senal',
  'geomapa', 'balanza-algebraica', 'que-estilo', 'analiza-frases', 'portero', 'medidor-ph',
  'compas-completo', 'rios-montanas', 'lee-la-etiqueta', 'detective-textos', 'epocas-historicas',
]
