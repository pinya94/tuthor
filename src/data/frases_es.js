// Español — bolsas de palabras (etiquetadas) + plantillas de frase.
// El motor (grammarGen) rellena las plantillas respetando la concordancia y
// deriva las respuestas correctas por construcción.
import { makeGenderedTemplates } from '../lib/grammarGen'

const P = {
  det: {
    def: { ms: 'el', fs: 'la', mp: 'los', fp: 'las' },
    ind: { ms: 'un', fs: 'una', mp: 'unos', fp: 'unas' },
    pos: { ms: 'su', fs: 'su', mp: 'sus', fp: 'sus' },
    dem: { ms: 'este', fs: 'esta', mp: 'estos', fp: 'estas' },
  },
  // Cosas: objetos y lugares (nunca sujeto de un verbo de acción).
  sustCosa: [
    { forms: { sg: 'casa', pl: 'casas' }, gen: 'f' },
    { forms: { sg: 'coche', pl: 'coches' }, gen: 'm' },
    { forms: { sg: 'mesa', pl: 'mesas' }, gen: 'f' },
    { forms: { sg: 'libro', pl: 'libros' }, gen: 'm' },
    { forms: { sg: 'manzana', pl: 'manzanas' }, gen: 'f' },
    { forms: { sg: 'carta', pl: 'cartas' }, gen: 'f' },
    { forms: { sg: 'flor', pl: 'flores' }, gen: 'f' },
    { forms: { sg: 'árbol', pl: 'árboles' }, gen: 'm' },
    { forms: { sg: 'pelota', pl: 'pelotas' }, gen: 'f' },
    { forms: { sg: 'regalo', pl: 'regalos' }, gen: 'm' },
    { forms: { sg: 'cuadro', pl: 'cuadros' }, gen: 'm' },
    { forms: { sg: 'silla', pl: 'sillas' }, gen: 'f' },
  ],
  // Animales: solo como sujeto de verbos de acción (corre, salta, duerme…).
  sustAnimal: [
    { forms: { sg: 'perro', pl: 'perros' }, gen: 'm' },
    { forms: { sg: 'gato', pl: 'gatos' }, gen: 'm' },
    { forms: { sg: 'gata', pl: 'gatas' }, gen: 'f' },
    { forms: { sg: 'caballo', pl: 'caballos' }, gen: 'm' },
    { forms: { sg: 'vaca', pl: 'vacas' }, gen: 'f' },
  ],
  sustPer: [
    { forms: { sg: 'niño', pl: 'niños' }, gen: 'm' },
    { forms: { sg: 'niña', pl: 'niñas' }, gen: 'f' },
    { forms: { sg: 'profesor', pl: 'profesores' }, gen: 'm' },
    { forms: { sg: 'profesora', pl: 'profesoras' }, gen: 'f' },
    { forms: { sg: 'amigo', pl: 'amigos' }, gen: 'm' },
    { forms: { sg: 'amiga', pl: 'amigas' }, gen: 'f' },
    { forms: { sg: 'alumno', pl: 'alumnos' }, gen: 'm' },
    { forms: { sg: 'alumna', pl: 'alumnas' }, gen: 'f' },
  ],
  adj: [
    { forms: { ms: 'rojo', fs: 'roja', mp: 'rojos', fp: 'rojas' } },
    { forms: { ms: 'pequeño', fs: 'pequeña', mp: 'pequeños', fp: 'pequeñas' } },
    { forms: { ms: 'bonito', fs: 'bonita', mp: 'bonitos', fp: 'bonitas' } },
    { forms: { ms: 'viejo', fs: 'vieja', mp: 'viejos', fp: 'viejas' } },
    { forms: { ms: 'nuevo', fs: 'nueva', mp: 'nuevos', fp: 'nuevas' } },
    { forms: { ms: 'alto', fs: 'alta', mp: 'altos', fp: 'altas' } },
    { forms: { ms: 'rápido', fs: 'rápida', mp: 'rápidos', fp: 'rápidas' } },
    { forms: { ms: 'blanco', fs: 'blanca', mp: 'blancos', fp: 'blancas' } },
    { forms: { ms: 'grande', fs: 'grande', mp: 'grandes', fp: 'grandes' } },
    { forms: { ms: 'azul', fs: 'azul', mp: 'azules', fp: 'azules' } },
  ],
  // Adjetivos aptos para personas/animales (sin colores: evita "la niña roja").
  adjPer: [
    { forms: { ms: 'pequeño', fs: 'pequeña', mp: 'pequeños', fp: 'pequeñas' } },
    { forms: { ms: 'bonito', fs: 'bonita', mp: 'bonitos', fp: 'bonitas' } },
    { forms: { ms: 'viejo', fs: 'vieja', mp: 'viejos', fp: 'viejas' } },
    { forms: { ms: 'nuevo', fs: 'nueva', mp: 'nuevos', fp: 'nuevas' } },
    { forms: { ms: 'alto', fs: 'alta', mp: 'altos', fp: 'altas' } },
    { forms: { ms: 'rápido', fs: 'rápida', mp: 'rápidos', fp: 'rápidas' } },
    { forms: { ms: 'grande', fs: 'grande', mp: 'grandes', fp: 'grandes' } },
  ],
  verbTr: [
    { forms: { sg: 'come', pl: 'comen' } },
    { forms: { sg: 'lee', pl: 'leen' } },
    { forms: { sg: 'compra', pl: 'compran' } },
    { forms: { sg: 'pinta', pl: 'pintan' } },
    { forms: { sg: 'guarda', pl: 'guardan' } },
    { forms: { sg: 'rompe', pl: 'rompen' } },
  ],
  // Intransitivos válidos para personas y animales por igual.
  verbIntr: [
    { forms: { sg: 'corre', pl: 'corren' } },
    { forms: { sg: 'salta', pl: 'saltan' } },
    { forms: { sg: 'duerme', pl: 'duermen' } },
    { forms: { sg: 'juega', pl: 'juegan' } },
    { forms: { sg: 'pasea', pl: 'pasean' } },
    { forms: { sg: 'descansa', pl: 'descansan' } },
  ],
  verbCop: [
    { forms: { sg: 'es', pl: 'son' } },
    { forms: { sg: 'está', pl: 'están' } },
    { forms: { sg: 'parece', pl: 'parecen' } },
  ],
  verbDitr: [
    { forms: { sg: 'da', pl: 'dan' } },
    { forms: { sg: 'regala', pl: 'regalan' } },
    { forms: { sg: 'envía', pl: 'envían' } },
    { forms: { sg: 'presta', pl: 'prestan' } },
  ],
  pronSuj: [
    { t: 'Él', gen: 'm', num: 'sg' }, { t: 'Ella', gen: 'f', num: 'sg' },
    { t: 'Ellos', gen: 'm', num: 'pl' }, { t: 'Ellas', gen: 'f', num: 'pl' },
  ],
  adv: ['hoy', 'ayer', 'ahora', 'siempre', 'deprisa', 'despacio', 'lejos', 'cerca', 'pronto', 'tarde'],
  prepCC: ['en', 'sobre', 'con', 'por'],
}

export const TEMPLATES_ES = makeGenderedTemplates(P)
