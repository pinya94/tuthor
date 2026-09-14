// ── Órbitas y datos físicos de los 8 planetas ───────────────────────────────
//
// Para el recurso /recursos/sistema-solar, que dibuja dónde está cada planeta
// en una fecha concreta. Complementa data/planetas.js (nombre, emoji y dato del
// juego Órbita), que se cruza por `id`.
//
// ELEMENTOS ORBITALES — JPL, "Approximate Positions of the Planets", tabla 1
// (válida de 1800 a 2050), referidos a la eclíptica y el equinoccio J2000:
//   a  semieje mayor (UA)             e  excentricidad
//   I  inclinación (°)                L  longitud media (°) en J2000
//   w  longitud del perihelio (°)     O  longitud del nodo ascendente (°)
//   Lr variación de L en °/siglo
// Solo se aplica la variación de L. Las de los demás elementos son de
// centésimas de grado por siglo: entre 1950 y 2050 mueven un planeta menos de
// lo que ocupa su dibujo. Un test comprueba estos números contra oposiciones y
// conjunciones con fecha conocida, porque un dígito mal copiado no se ve a ojo
// y colocaría un planeta en otro sitio.
//
// DATOS FÍSICOS — NASA, Planetary Fact Sheet: diámetro ecuatorial (km),
// periodo orbital (días), rotación sideral (horas; negativa = retrógrada),
// temperatura media (°C) e inclinación del eje (°). Las LUNAS son las
// confirmadas a 2025 y la cifra de los gigantes cambia a menudo, así que la
// página lo dice.

export const ORBITAS = {
  mercurio: { a: 0.38709927, e: 0.20563593, I: 7.00497902, L: 252.25032350, w: 77.45779628, O: 48.33076593, Lr: 149472.67411175 },
  venus:    { a: 0.72333566, e: 0.00677672, I: 3.39467605, L: 181.97909950, w: 131.60246718, O: 76.67984255, Lr: 58517.81538729 },
  tierra:   { a: 1.00000261, e: 0.01671123, I: -0.00001531, L: 100.46457166, w: 102.93768193, O: 0, Lr: 35999.37244981 },
  marte:    { a: 1.52371034, e: 0.09339410, I: 1.84969142, L: -4.55343205, w: -23.94362959, O: 49.55953891, Lr: 19140.30268499 },
  jupiter:  { a: 5.20288700, e: 0.04838624, I: 1.30439695, L: 34.39644051, w: 14.72847983, O: 100.47390909, Lr: 3034.74612775 },
  saturno:  { a: 9.53667594, e: 0.05386179, I: 2.48599187, L: 49.95424423, w: 92.59887831, O: 113.66242448, Lr: 1222.49362201 },
  urano:    { a: 19.18916464, e: 0.04725744, I: 0.77263783, L: 313.23810451, w: 170.95427630, O: 74.01692503, Lr: 428.48202785 },
  neptuno:  { a: 30.06992276, e: 0.00859048, I: 1.77004347, L: -55.12002969, w: 44.96476227, O: 131.78422574, Lr: 218.45945325 },
}

export const FISICOS = {
  mercurio: { diametro: 4879, periodo: 87.97, dia: 1407.6, lunas: 0, temperatura: 167, eje: 0.03, color: '#a8a29e' },
  venus:    { diametro: 12104, periodo: 224.70, dia: -5832.5, lunas: 0, temperatura: 464, eje: 177.4, color: '#e8c07a' },
  tierra:   { diametro: 12756, periodo: 365.26, dia: 23.9, lunas: 1, temperatura: 15, eje: 23.4, color: '#3b82f6' },
  marte:    { diametro: 6792, periodo: 686.98, dia: 24.6, lunas: 2, temperatura: -65, eje: 25.2, color: '#dc6a45' },
  jupiter:  { diametro: 142984, periodo: 4332.59, dia: 9.9, lunas: 95, temperatura: -110, eje: 3.1, color: '#d9a066' },
  saturno:  { diametro: 120536, periodo: 10759.22, dia: 10.7, lunas: 274, temperatura: -140, eje: 26.7, color: '#e3c98f' },
  urano:    { diametro: 51118, periodo: 30688.5, dia: -17.2, lunas: 28, temperatura: -195, eje: 97.8, color: '#7dd3e0' },
  neptuno:  { diametro: 49528, periodo: 60182, dia: 16.1, lunas: 16, temperatura: -200, eje: 28.3, color: '#5b7cf0' },
}
