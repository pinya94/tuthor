// Tablas de multiplicar — multiplicación (y división inversa en difícil) a
// contrarreloj, con 4 opciones. Los distractores son errores plausibles
// (fila de al lado, ±un factor) para que elegir bien signifique saberla.

function pick(arr, rand) { return arr[Math.floor(rand() * arr.length)] }
function randInt(rand, min, max) { return min + Math.floor(rand() * (max - min + 1)) }

function baraja(arr, rand) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Distractores plausibles para a·b (=p). Errores típicos: fila contigua,
// un factor de más o de menos, sumar en vez de multiplicar.
function distractoresMult(a, b, p) {
  const cands = [
    (a + 1) * b, (a - 1) * b, a * (b + 1), a * (b - 1),
    p + a, p - a, p + b, p - b, a + b, p + 1, p - 1,
  ]
  return cands.filter(x => x > 0 && x !== p)
}

// Devuelve { tipo, a, b, texto, resultado, opciones }
export function nuevaPregunta(difId = 'facil', rand = Math.random) {
  let a, b, tipo = 'mult'

  if (difId === 'facil') {
    // tablas fáciles: 2, 5, 10 (× 1..10)
    a = pick([2, 5, 10], rand)
    b = randInt(rand, 1, 10)
    if (rand() < 0.5) [a, b] = [b, a]
  } else if (difId === 'medio') {
    a = randInt(rand, 1, 10)
    b = randInt(rand, 1, 10)
  } else {
    // difícil: tablas altas y, la mitad de las veces, división inversa
    a = randInt(rand, 2, 10)
    b = randInt(rand, 2, 10)
    if (rand() < 0.5) tipo = 'div'
  }

  const p = a * b
  let texto, resultado, distract
  if (tipo === 'div') {
    // p ÷ b = a
    texto = `${p} ÷ ${b}`
    resultado = a
    distract = [a + 1, a - 1, a + 2, a - 2, b, b + 1].filter(x => x > 0 && x !== a)
  } else {
    texto = `${a} × ${b}`
    resultado = p
    distract = distractoresMult(a, b, p)
  }

  // 3 distractores únicos
  const uniq = []
  for (const x of baraja([...new Set(distract)], rand)) {
    if (uniq.length >= 3) break
    if (!uniq.includes(x)) uniq.push(x)
  }
  // relleno defensivo por si faltaran (números pequeños)
  let extra = 1
  while (uniq.length < 3) { const c = resultado + extra; if (c > 0 && c !== resultado && !uniq.includes(c)) uniq.push(c); extra++ }

  const opciones = baraja([resultado, ...uniq], rand)
  return { tipo, a, b, texto, resultado, opciones }
}

export function esCorrecta(pregunta, eleccion) {
  return Number(eleccion) === pregunta.resultado
}
