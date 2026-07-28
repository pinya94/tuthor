// Balanza de ecuaciones — química, lógica pura (sin React), 100% determinista.
//
// Equilibrar una ecuación química = elegir los coeficientes enteros más pequeños
// que igualan el número de átomos de cada elemento a ambos lados de la flecha.
// La "balanza" se equilibra cuando, elemento a elemento, hay los mismos átomos.
//
// Partimos SIEMPRE de ecuaciones ya equilibradas (curadas, químicamente reales):
// el jugador reconstruye los coeficientes. Así nunca se genera una ecuación
// imposible ni con química inventada, y la respuesta correcta es exacta.
//
// Variedad extra: cada reacción puede presentarse invertida (productos ↔
// reactivos). El campo `rev` controla la honestidad química de esa inversión:
//   'real'     → el sentido inverso también ocurre (equilibrios, electrólisis,
//                fotosíntesis…): se invierte sin ninguna advertencia.
//   'practice' → el inverso NO ocurre así en la realidad (p. ej. "des-quemar"):
//                se marca `practiceOnly` y la UI avisa de que en la realidad
//                ocurre al revés (didáctico, enseña el sentido correcto).
//   'no'       → no se invierte nunca (quedaría absurda o trivial).

const rnd = (a, b, rand) => a + Math.floor(rand() * (b - a + 1))
const pick = (arr, rand) => arr[rnd(0, arr.length - 1, rand)]

// Parser de fórmulas sin paréntesis: 'H2O' -> {H:2, O:1}, 'C2H5OH' -> {C:2,H:6,O:1}.
export function parseFormula(f) {
  const atoms = {}
  const re = /([A-Z][a-z]?)(\d*)/g
  let m
  while ((m = re.exec(f)) !== null) {
    if (!m[1]) continue
    atoms[m[1]] = (atoms[m[1]] || 0) + (m[2] ? parseInt(m[2], 10) : 1)
  }
  return atoms
}

function gcd(a, b) { return b === 0 ? Math.abs(a) : gcd(b, a % b) }
function gcdAll(nums) { return nums.reduce((g, n) => gcd(g, n), 0) }

// Cuenta de átomos de un lado dados sus coeficientes.
function sideCount(species, coefs) {
  const total = {}
  species.forEach((sp, i) => {
    const atoms = parseFormula(sp.f)
    for (const el in atoms) total[el] = (total[el] || 0) + atoms[el] * (coefs[i] || 0)
  })
  return total
}

// Desglose por elemento (para el marcador y el feedback): [{el, left, right, ok}].
export function elementTally(round, coefs) {
  const nL = round.left.length
  const left = sideCount(round.left, coefs.slice(0, nL))
  const right = sideCount(round.right, coefs.slice(nL))
  const els = [...new Set([...Object.keys(left), ...Object.keys(right)])]
  return els.map(el => ({
    el,
    left: left[el] || 0,
    right: right[el] || 0,
    ok: (left[el] || 0) === (right[el] || 0),
  }))
}

// ¿Los coeficientes equilibran la ecuación? (mismos átomos de cada elemento).
export function isBalanced(round, coefs) {
  return elementTally(round, coefs).every(t => t.ok)
}

// Correcto en el JUEGO: equilibrado Y en su forma más simple (mcd de coefs = 1).
// Así se acepta cualquier solución válida mínima, no un múltiplo (p.ej. 4,2,4).
export function isCorrectCoefs(round, coefs) {
  if (!coefs || coefs.length !== round.left.length + round.right.length) return false
  if (coefs.some(c => !Number.isInteger(c) || c < 1)) return false
  return isBalanced(round, coefs) && gcdAll(coefs) === 1
}

// Átomos totales de un lado (para inclinar la balanza, cosmético).
export function totalAtoms(species, coefs) {
  const t = sideCount(species, coefs)
  return Object.values(t).reduce((s, n) => s + n, 0)
}

// ── Pool de ecuaciones equilibradas (forma mínima, químicamente reales) ────────
// coefs = coeficientes correctos en el orden [reactivos..., productos...].
// rev = honestidad de la inversión (ver cabecera).
const EQUATIONS = {
  easy: [
    { left: ['H2', 'O2'],  right: ['H2O'],  coefs: [2, 1, 2], rev: 'real' },      // ↔ electrólisis del agua
    { left: ['N2', 'H2'],  right: ['NH3'],  coefs: [1, 3, 2], rev: 'real' },      // ↔ Haber (equilibrio)
    { left: ['H2', 'N2'],  right: ['NH3'],  coefs: [3, 1, 2], rev: 'real' },
    { left: ['N2', 'O2'],  right: ['NO'],   coefs: [1, 1, 2], rev: 'real' },      // NO se descompone en N2+O2
    { left: ['C', 'O2'],   right: ['CO2'],  coefs: [1, 1, 1], rev: 'no' },
    { left: ['C', 'O2'],   right: ['CO'],   coefs: [2, 1, 2], rev: 'practice' },
    { left: ['CO', 'O2'],  right: ['CO2'],  coefs: [2, 1, 2], rev: 'practice' },
    { left: ['H2', 'Cl2'], right: ['HCl'],  coefs: [1, 1, 2], rev: 'practice' },
    { left: ['H2', 'Br2'], right: ['HBr'],  coefs: [1, 1, 2], rev: 'practice' },
    { left: ['Na', 'Cl2'], right: ['NaCl'], coefs: [2, 1, 2], rev: 'no' },
    { left: ['S', 'O2'],   right: ['SO2'],  coefs: [1, 1, 1], rev: 'no' },
    { left: ['Mg', 'O2'],  right: ['MgO'],  coefs: [2, 1, 2], rev: 'practice' },
    { left: ['Ca', 'O2'],  right: ['CaO'],  coefs: [2, 1, 2], rev: 'practice' },
    { left: ['Zn', 'O2'],  right: ['ZnO'],  coefs: [2, 1, 2], rev: 'practice' },
    { left: ['Cu', 'O2'],  right: ['CuO'],  coefs: [2, 1, 2], rev: 'practice' },
    { left: ['K', 'O2'],   right: ['K2O'],  coefs: [4, 1, 2], rev: 'no' },
    { left: ['Li', 'O2'],  right: ['Li2O'], coefs: [4, 1, 2], rev: 'no' },
    // +20 (ampliación 2026-07-28)
    { left: ['H2', 'F2'],  right: ['HF'],   coefs: [1, 1, 2], rev: 'practice' },
    { left: ['H2', 'I2'],  right: ['HI'],   coefs: [1, 1, 2], rev: 'real' },     // HI ⇌ H2 + I2
    { left: ['K', 'Cl2'],  right: ['KCl'],  coefs: [2, 1, 2], rev: 'no' },
    { left: ['Li', 'Cl2'], right: ['LiCl'], coefs: [2, 1, 2], rev: 'no' },
    { left: ['Al', 'Br2'], right: ['AlBr3'],coefs: [2, 3, 2], rev: 'no' },
    { left: ['Na', 'O2'],  right: ['Na2O'], coefs: [4, 1, 2], rev: 'no' },
    { left: ['Ba', 'O2'],  right: ['BaO'],  coefs: [2, 1, 2], rev: 'practice' },
    { left: ['Sr', 'O2'],  right: ['SrO'],  coefs: [2, 1, 2], rev: 'practice' },
    { left: ['Fe', 'Cl2'], right: ['FeCl3'],coefs: [2, 3, 2], rev: 'no' },
    { left: ['Na', 'S'],   right: ['Na2S'], coefs: [2, 1, 1], rev: 'no' },
    { left: ['K', 'S'],    right: ['K2S'],  coefs: [2, 1, 1], rev: 'no' },
    { left: ['Ag', 'S'],   right: ['Ag2S'], coefs: [2, 1, 1], rev: 'no' },
    { left: ['B', 'O2'],   right: ['B2O3'], coefs: [4, 3, 2], rev: 'practice' },
    { left: ['P', 'Cl2'],  right: ['PCl3'], coefs: [2, 3, 2], rev: 'no' },
    { left: ['P', 'Cl2'],  right: ['PCl5'], coefs: [2, 5, 2], rev: 'no' },
    { left: ['Na', 'H2'],  right: ['NaH'],  coefs: [2, 1, 2], rev: 'no' },
    { left: ['Li', 'N2'],  right: ['Li3N'], coefs: [6, 1, 2], rev: 'no' },
    { left: ['Ag', 'Cl2'], right: ['AgCl'], coefs: [2, 1, 2], rev: 'no' },
    { left: ['Al', 'S'],   right: ['Al2S3'],coefs: [2, 3, 1], rev: 'no' },
    { left: ['N2', 'O2'],  right: ['NO2'],  coefs: [1, 2, 2], rev: 'real' },
  ],
  medium: [
    { left: ['CH4', 'O2'],   right: ['CO2', 'H2O'],  coefs: [1, 2, 1, 2], rev: 'practice' },
    { left: ['C3H8', 'O2'],  right: ['CO2', 'H2O'],  coefs: [1, 5, 3, 4], rev: 'practice' },
    { left: ['Fe', 'O2'],    right: ['Fe2O3'],       coefs: [4, 3, 2], rev: 'practice' },
    { left: ['Al', 'O2'],    right: ['Al2O3'],       coefs: [4, 3, 2], rev: 'practice' },
    { left: ['Al', 'Cl2'],   right: ['AlCl3'],       coefs: [2, 3, 2], rev: 'no' },
    { left: ['NO', 'O2'],    right: ['NO2'],         coefs: [2, 1, 2], rev: 'real' },   // NO2 ⇌ NO + O2
    { left: ['CaCO3'],       right: ['CaO', 'CO2'],  coefs: [1, 1, 1], rev: 'real' },   // CaO + CO2 → CaCO3
    { left: ['KClO3'],       right: ['KCl', 'O2'],   coefs: [2, 2, 3], rev: 'no' },
    { left: ['H2O2'],        right: ['H2O', 'O2'],   coefs: [2, 2, 1], rev: 'no' },
    { left: ['HgO'],         right: ['Hg', 'O2'],    coefs: [2, 2, 1], rev: 'real' },   // Hg + O2 → HgO
    { left: ['SO2', 'O2'],   right: ['SO3'],         coefs: [2, 1, 2], rev: 'real' },   // proceso de contacto
    { left: ['P', 'O2'],     right: ['P2O5'],        coefs: [4, 5, 2], rev: 'practice' },
    { left: ['Na', 'H2O'],   right: ['NaOH', 'H2'],  coefs: [2, 2, 2, 1], rev: 'no' },
    { left: ['Mg', 'N2'],    right: ['Mg3N2'],       coefs: [3, 1, 1], rev: 'no' },
    // +20 (ampliación 2026-07-28)
    { left: ['K', 'H2O'],    right: ['KOH', 'H2'],   coefs: [2, 2, 2, 1], rev: 'no' },
    { left: ['Li', 'H2O'],   right: ['LiOH', 'H2'],  coefs: [2, 2, 2, 1], rev: 'no' },
    { left: ['C2H2', 'O2'],  right: ['CO2', 'H2O'],  coefs: [2, 5, 4, 2], rev: 'practice' },
    { left: ['CO2', 'C'],    right: ['CO'],          coefs: [1, 1, 2], rev: 'real' },   // Boudouard
    { left: ['Fe2O3', 'H2'], right: ['Fe', 'H2O'],   coefs: [1, 3, 2, 3], rev: 'practice' },
    { left: ['CuO', 'C'],    right: ['Cu', 'CO2'],   coefs: [2, 1, 2, 1], rev: 'practice' },
    { left: ['WO3', 'H2'],   right: ['W', 'H2O'],    coefs: [1, 3, 1, 3], rev: 'practice' },
    { left: ['Zn', 'HCl'],   right: ['ZnCl2', 'H2'], coefs: [1, 2, 1, 1], rev: 'no' },
    { left: ['Mg', 'HCl'],   right: ['MgCl2', 'H2'], coefs: [1, 2, 1, 1], rev: 'no' },
    { left: ['Ca', 'HCl'],   right: ['CaCl2', 'H2'], coefs: [1, 2, 1, 1], rev: 'no' },
    { left: ['Fe', 'H2O'],   right: ['Fe3O4', 'H2'], coefs: [3, 4, 1, 4], rev: 'practice' },
    { left: ['NaHCO3'],      right: ['Na2CO3', 'H2O', 'CO2'], coefs: [2, 1, 1, 1], rev: 'practice' },
    { left: ['CaCO3', 'HCl'],right: ['CaCl2', 'H2O', 'CO2'],  coefs: [1, 2, 1, 1, 1], rev: 'no' },
    { left: ['NO2', 'H2O'],  right: ['HNO3', 'NO'],  coefs: [3, 1, 2, 1], rev: 'no' },
    { left: ['N2O5'],        right: ['NO2', 'O2'],   coefs: [2, 4, 1], rev: 'practice' },
    { left: ['NH4NO3'],      right: ['N2O', 'H2O'],  coefs: [1, 1, 2], rev: 'no' },
    { left: ['Ag2O'],        right: ['Ag', 'O2'],    coefs: [2, 4, 1], rev: 'real' },   // Ag + O2 → Ag2O
    { left: ['Mg', 'CO2'],   right: ['MgO', 'C'],    coefs: [2, 1, 2, 1], rev: 'practice' },
    { left: ['Cl2', 'NaOH'], right: ['NaCl', 'NaClO', 'H2O'], coefs: [1, 2, 1, 1, 1], rev: 'no' },
    { left: ['Na2O', 'H2O'], right: ['NaOH'],        coefs: [1, 1, 2], rev: 'no' },
  ],
  hard: [
    { left: ['C2H6', 'O2'],    right: ['CO2', 'H2O'], coefs: [2, 7, 4, 6], rev: 'practice' },
    { left: ['C2H4', 'O2'],    right: ['CO2', 'H2O'], coefs: [1, 3, 2, 2], rev: 'practice' },
    { left: ['C6H12O6', 'O2'], right: ['CO2', 'H2O'], coefs: [1, 6, 6, 6], rev: 'real' },   // ↔ fotosíntesis
    { left: ['C2H5OH', 'O2'],  right: ['CO2', 'H2O'], coefs: [1, 3, 2, 3], rev: 'practice' },
    { left: ['CH3OH', 'O2'],   right: ['CO2', 'H2O'], coefs: [2, 3, 2, 4], rev: 'practice' },
    { left: ['H2S', 'O2'],     right: ['SO2', 'H2O'], coefs: [2, 3, 2, 2], rev: 'practice' },
    { left: ['NH3', 'O2'],     right: ['NO', 'H2O'],  coefs: [4, 5, 4, 6], rev: 'practice' },
    { left: ['Fe2O3', 'CO'],   right: ['Fe', 'CO2'],  coefs: [1, 3, 2, 3], rev: 'practice' },
    { left: ['Al', 'HCl'],     right: ['AlCl3', 'H2'],coefs: [2, 6, 2, 3], rev: 'no' },
    { left: ['Fe', 'HCl'],     right: ['FeCl2', 'H2'],coefs: [1, 2, 1, 1], rev: 'no' },
    // +20 (ampliación 2026-07-28)
    { left: ['C3H4', 'O2'],    right: ['CO2', 'H2O'], coefs: [1, 4, 3, 2], rev: 'practice' },
    { left: ['C4H8', 'O2'],    right: ['CO2', 'H2O'], coefs: [1, 6, 4, 4], rev: 'practice' },
    { left: ['C5H12', 'O2'],   right: ['CO2', 'H2O'], coefs: [1, 8, 5, 6], rev: 'practice' },
    { left: ['CH3COOH', 'O2'], right: ['CO2', 'H2O'], coefs: [1, 2, 2, 2], rev: 'practice' },
    { left: ['HCOOH', 'O2'],   right: ['CO2', 'H2O'], coefs: [2, 1, 2, 2], rev: 'practice' },
    { left: ['KClO4'],         right: ['KCl', 'O2'],  coefs: [1, 1, 2], rev: 'no' },
    { left: ['KNO3'],          right: ['KNO2', 'O2'], coefs: [2, 2, 1], rev: 'no' },
    { left: ['NaNO3'],         right: ['NaNO2', 'O2'],coefs: [2, 2, 1], rev: 'no' },
    { left: ['Al', 'Fe2O3'],   right: ['Al2O3', 'Fe'],coefs: [2, 1, 1, 2], rev: 'practice' },  // termita
    { left: ['Cr2O3', 'Al'],   right: ['Al2O3', 'Cr'],coefs: [1, 2, 1, 2], rev: 'practice' },
    { left: ['Fe3O4', 'CO'],   right: ['Fe', 'CO2'],  coefs: [1, 4, 3, 4], rev: 'practice' },
    { left: ['SiO2', 'C'],     right: ['Si', 'CO'],   coefs: [1, 2, 1, 2], rev: 'practice' },
    { left: ['SiO2', 'C'],     right: ['SiC', 'CO'],  coefs: [1, 3, 1, 2], rev: 'practice' },
    { left: ['TiO2', 'C', 'Cl2'], right: ['TiCl4', 'CO'], coefs: [1, 2, 2, 1, 2], rev: 'no' },
    { left: ['CH4', 'H2O'],    right: ['CO', 'H2'],   coefs: [1, 1, 1, 3], rev: 'real' },   // reformado con vapor
    { left: ['CS2', 'O2'],     right: ['CO2', 'SO2'], coefs: [1, 3, 1, 2], rev: 'practice' },
    { left: ['FeS', 'O2'],     right: ['Fe2O3', 'SO2'],coefs: [4, 7, 2, 4], rev: 'practice' },
    { left: ['PbS', 'O2'],     right: ['PbO', 'SO2'], coefs: [2, 3, 2, 2], rev: 'practice' },
    { left: ['ZnS', 'O2'],     right: ['ZnO', 'SO2'], coefs: [2, 3, 2, 2], rev: 'practice' },
    { left: ['NH3', 'CuO'],    right: ['Cu', 'N2', 'H2O'], coefs: [2, 3, 3, 1, 3], rev: 'no' },
  ],
}

const TIER_POOLS = {
  facil:   ['easy'],
  medio:   ['easy', 'medium'],
  dificil: ['medium', 'hard'],
}
const MAXCOEF = { easy: 6, medium: 6, hard: 8 }

// Construye una ronda a partir de una entrada del pool, en el sentido pedido.
function buildRound(e, tier, reversed) {
  const nL = e.left.length
  const leftCoefs = e.coefs.slice(0, nL)
  const rightCoefs = e.coefs.slice(nL)
  const base = { tier, maxCoef: MAXCOEF[tier], initial: e.coefs.map(() => 1) }
  if (!reversed) {
    return { ...base, left: e.left.map(f => ({ f })), right: e.right.map(f => ({ f })),
      answer: e.coefs.slice(), reversed: false, practiceOnly: false }
  }
  return { ...base, left: e.right.map(f => ({ f })), right: e.left.map(f => ({ f })),
    answer: rightCoefs.concat(leftCoefs), reversed: true, practiceOnly: e.rev === 'practice' }
}

const REVERSE_CHANCE = 0.4

export function genRound(uiDiff = 'facil', rand = Math.random) {
  const tier = pick(TIER_POOLS[uiDiff] || ['easy'], rand)
  const e = pick(EQUATIONS[tier], rand)
  const reversed = e.rev !== 'no' && rand() < REVERSE_CHANCE
  return buildRound(e, tier, reversed)
}

// Solo para tests: todas las rondas presentables (directas + inversas válidas).
export function allRounds() {
  const out = []
  for (const [tier, arr] of Object.entries(EQUATIONS)) {
    for (const e of arr) {
      out.push(buildRound(e, tier, false))
      if (e.rev !== 'no') out.push(buildRound(e, tier, true))
    }
  }
  return out
}
