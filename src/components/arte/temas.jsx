// Arte de los temas dentro de cada materia (tarjetas de TemarioGrid).
// Clave = `<materia>/<tema>`: 'historia/roma', 'fisica/fuerzas'…
import { ARTE_TEMAS_HISTORIA } from './temasHistoria'
import { ARTE_TEMAS_CIENCIAS } from './temasCiencias'
import { ARTE_TEMAS_MATEMATICAS } from './temasMatematicas'
import { ARTE_TEMAS_GEOGRAFIA } from './temasGeografia'

export const ARTE_TEMAS = {
  ...ARTE_TEMAS_HISTORIA,
  ...ARTE_TEMAS_CIENCIAS,
  ...ARTE_TEMAS_MATEMATICAS,
  ...ARTE_TEMAS_GEOGRAFIA,
}
