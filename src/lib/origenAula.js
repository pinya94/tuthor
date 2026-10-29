// ¿Esta visita viene del aula virtual de un colegio? (Google Classroom, Alexia,
// Teams, Moodle, los portales educativos de las comunidades…). En Analytics se
// ve que hay profes que ya mandan juegos de Tuthor por su aula: a esas visitas
// se les enseña que el mismo juego se puede jugar en directo con la clase.
//
// document.referrer se mantiene durante toda la navegación dentro de la app
// (es una SPA), pero se pierde al recargar: por eso se guarda en la sesión.

const AULAS = /(^|\.)(classroom\.google\.com|alexiaclassroom\.com|alexia\.es|teams\.microsoft\.com|teams\.live\.com|clickedu\.eu|educamos\.com|edmodo\.com|schoology\.com|instructure\.com|seesaw\.me|xtec\.cat|educa\.madrid\.org|educa\.jcyl\.es|edu\.xunta\.gal|gva\.es|educarex\.es|juntadeandalucia\.es)$|moodle|aulavirtual|campusvirtual/i

const CLAVE = 'tuthor_origen_aula'

export function esAula(referrer) {
  try {
    return AULAS.test(new URL(referrer).hostname)
  } catch {
    return false
  }
}

export function vieneDeAula() {
  try {
    if (sessionStorage.getItem(CLAVE) === '1') return true
  } catch { /* sin almacenamiento: se mira solo el referrer */ }
  if (typeof document === 'undefined' || !esAula(document.referrer)) return false
  try { sessionStorage.setItem(CLAVE, '1') } catch { /* da igual */ }
  return true
}
