// El Cambio — lógica del juego del dinero (euros). La usan el juego
// (src/pages/ElCambio.jsx) y su examen.
//
// Se trabaja SIEMPRE en céntimos (enteros) para no arrastrar errores de coma
// flotante. Dos modos:
//   · 'forma'  — forma una cantidad exacta con monedas y billetes.
//   · 'cambio' — algo cuesta X, pagas con un billete Y: forma el cambio (Y − X).
//
// Dificultades:
//   · Fácil:   formar, hasta 2 €, de 10 en 10 céntimos (monedas).
//   · Medio:   formar, hasta 10 €, de 5 en 5 céntimos (monedas y billetes).
//   · Difícil: dar el cambio de un billete, hasta 20 €.

// Denominaciones en céntimos. `tipo` decide cómo se dibuja (moneda/billete).
export const DENOMINACIONES = [
  { v: 5,    tipo: 'moneda', label: '5c',  color: '#b45309' },
  { v: 10,   tipo: 'moneda', label: '10c', color: '#b45309' },
  { v: 20,   tipo: 'moneda', label: '20c', color: '#a16207' },
  { v: 50,   tipo: 'moneda', label: '50c', color: '#a16207' },
  { v: 100,  tipo: 'moneda', label: '1 €', color: '#ca8a04' },
  { v: 200,  tipo: 'moneda', label: '2 €', color: '#ca8a04' },
  { v: 500,  tipo: 'billete', label: '5 €',  color: '#6b7280' },
  { v: 1000, tipo: 'billete', label: '10 €', color: '#dc2626' },
  { v: 2000, tipo: 'billete', label: '20 €', color: '#2563eb' },
]

export function formatoEuro(cents) {
  return (cents / 100).toFixed(2).replace('.', ',') + ' €'
}

const rndPaso = (a, b, paso, rand) => {
  const n = Math.floor(rand() * ((b - a) / paso + 1))
  return a + n * paso
}
const BILLETES = [200, 500, 1000, 2000]

// Denominaciones disponibles en la paleta según la dificultad.
export function denomsDe(difId) {
  if (difId === 'facil') return DENOMINACIONES.filter(d => d.v >= 5 && d.v <= 200)
  return DENOMINACIONES
}

export function nuevaRonda(difId = 'facil', rand = Math.random) {
  if (difId === 'dificil') {
    const precio = rndPaso(105, 1900, 5, rand)               // 1,05 € … 19,00 €
    const pago = BILLETES.find(b => b > precio) ?? 2000       // el billete más pequeño que llega
    return { modo: 'cambio', precio, pago, objetivo: pago - precio }
  }
  if (difId === 'medio') {
    return { modo: 'forma', objetivo: rndPaso(50, 1000, 5, rand) } // 0,50 € … 10,00 €
  }
  return { modo: 'forma', objetivo: rndPaso(20, 200, 10, rand) }   // 0,20 € … 2,00 €
}

// ¿La bandeja (suma en céntimos) coincide con lo pedido?
export function esCorrecta(ronda, totalCents) {
  return totalCents === ronda.objetivo
}
