// Arte de los temas dentro de cada materia (TemarioGrid y las rejillas de
// gramática y ortografía). Clave = `<materia>/<tema>`: 'historia/roma',
// 'fisica/fuerzas', 'gramatica/verbos'…
import { ARTE_TEMAS_HISTORIA } from './temasHistoria'
import { ARTE_TEMAS_CIENCIAS } from './temasCiencias'
import { ARTE_TEMAS_MATEMATICAS } from './temasMatematicas'
import { ARTE_TEMAS_GEOGRAFIA } from './temasGeografia'
import { ARTE_TEMAS_LENGUA } from './temasLengua'
import { ARTE_TEMAS_VARIOS } from './temasVarios'

export const ARTE_TEMAS = {
  ...ARTE_TEMAS_HISTORIA,
  ...ARTE_TEMAS_CIENCIAS,
  ...ARTE_TEMAS_MATEMATICAS,
  ...ARTE_TEMAS_GEOGRAFIA,
  ...ARTE_TEMAS_LENGUA,
  ...ARTE_TEMAS_VARIOS,
}

// Un dibujo suelto por su clave (cabeceras de las rejillas).
export function ArteTema({ id, className }) {
  const Arte = ARTE_TEMAS[id]
  return Arte ? <Arte className={className} /> : null
}
