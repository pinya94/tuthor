// Plantillas de Analiza la Frase en este idioma. Las palabras y las reglas de
// qué puede ir con qué están en frasesLexico.js (común a es, ca y en).
import { makeTemplates } from '../lib/grammarGen'

export const TEMPLATES_ES = makeTemplates('es')
