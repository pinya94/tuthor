// Claves de dificultad de juegos y exámenes → nivel 1-3 (para BarrasNivel).
const CLAVES_NIVEL = [/facil|easy|basic|primaria/, /medio|medium|normal|eso/, /dificil|hard|avanz|experto|bach/]

export function nivelDeClave(clave, i = 0) {
  const k = String(clave || '').toLowerCase()
  const n = CLAVES_NIVEL.findIndex(re => re.test(k))
  return n >= 0 ? n + 1 : Math.min(i + 1, 3)
}

// ¿La clave es una dificultad? Hay exámenes cuyos "niveles" son modos
// (por nombre / por función / mezclado): ahí unas barras mentirían.
export function esClaveDeNivel(clave) {
  const k = String(clave || '').toLowerCase()
  return CLAVES_NIVEL.some(re => re.test(k))
}
