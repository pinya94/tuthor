// Arte de los temas dentro de cada materia (tarjetas de TemarioGrid).
// Clave = `<materia>/<tema>`: 'historia/roma', 'fisica/fuerzas'…
import { ARTE_TEMAS_HISTORIA } from './temasHistoria'
import { ARTE_TEMAS_CIENCIAS } from './temasCiencias'

export const ARTE_TEMAS = { ...ARTE_TEMAS_HISTORIA, ...ARTE_TEMAS_CIENCIAS }
