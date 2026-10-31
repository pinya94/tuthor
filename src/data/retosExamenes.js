// Exámenes que se pueden mandar como reto (deberes o en directo): los que usan
// la mecánica de un juego (MechanicExam) y los tipo test (ExamenMC); los dos
// saben montar un reto con ?reto=CODIGO. Las claves son las de
// src/lib/exams.js. El test de retos comprueba que cada una existe y que su
// página usa MechanicExam (o ExamenMC, en RETOS_TEST): un examen nuevo se
// añade aquí y ya se puede mandar.
export const RETOS_EXAMENES = [
  'climograma-test', 'quien-decide-test', 'europa-27-test', 'rios-montanas-test', 'rios-montanas-mundo-test', 'rios-montanas-eeuu-test', 'piramide-poblacion-test', 'coordenadas-test',
  'lee-grafico-tendencia', 'lee-grafico-variacion', 'lee-grafico-relacion', 'lee-grafico-medida', 'lee-grafico-tabla',
  'senal-a-senal-test', 'ojo-al-mensaje-test', 'la-orquesta-test', 'compas-completo-test', 'punto-muerto-test',
  'oferta-demanda-test', 'salta-recta-test', 'estadistico-media-test', 'estadistico-mediana-test', 'estadistico-moda-test',
  'estadistico-rango-test', 'rebajas-test', 'sigue-serie-test', 'escala-universo-test', 'angulo-recto-test',
  'bloques-primos-test', 'reparte-pastel-test', 'reloj-horas-test', 'el-cambio-test', 'numeros-romanos-test',
  'escalera-unidades-test', 'redondeo-test', 'tablas-multiplicar-test', 'figuras-compuestas', 'funciones-grafica-test',
  'balanza-algebraica-test', 'fuerza-neta-test', 'balanza-test', 'balanza-ecuaciones-test', 'genetica-test',
  'rayos-x-test', 'microscopio-test', 'cadena-alimentaria-test', 'circuito-cerrado-test', 'rayo-de-luz-test',
  'placas-movimiento-test', 'brote-test', 'arbol-vida-test', 'ciclo-rocas-test', 'el-tiempo-test',
  'newton-accion-test', 'termometro-test', 'cadena-energia-test', 'lee-el-movimiento-test', 'engranajes-test',
  'flota-o-se-hunde-test', 'clave-dicotomica-test', 'lee-la-etiqueta-test', 'el-laboratorio-test', 'nombra-compuesto-test',
  'cadena-carbono-test', 'receta-quimica-test', 'que-enlace-test', 'prepara-disolucion-test', 'medidor-ph-test',
  'encuentra-elemento-test', 'orbita-test', 'la-biblioteca-test', 'detective-textos-test', 'cazafiguras-test',
  'coma-a-coma-test', 'que-letra-test', 'mide-el-verso-test', 'la-galeria-test', 'que-estilo-test',
  'quien-lo-penso-antigua-test', 'quien-lo-penso-moderna-test', 'cambio-estado-test', 'nombres-cambio-test', 'ordena-frase-test',
]

// Los tipo test (ExamenMC): una pregunta con sus opciones, un solo intento
export const RETOS_TEST = [
  'acidos-bases', 'algebra', 'antigua', 'arte-arquitectura', 'arte-pintura',
  'atmosfera-clima', 'atomos-moleculas', 'calor-temperatura', 'celula', 'cuerpo-humano',
  'dinamica', 'disoluciones', 'divisibilidad', 'ecosistemas', 'edad-media',
  'edad-moderna', 'electricidad', 'energia', 'enlace-quimico', 'enteros-racionales',
  'entreguerras', 'espana-xix', 'espanol-figuras-test', 'espanol-gramatica-adjetivos-test', 'espanol-gramatica-adverbios-test',
  'espanol-gramatica-determinantes-test', 'espanol-gramatica-morfologia-test', 'espanol-gramatica-nexos-test', 'espanol-gramatica-pronombres-test', 'espanol-gramatica-sintaxis-test',
  'espanol-gramatica-sustantivos-test', 'espanol-gramatica-verbos-test', 'espanol-literatura-test', 'espanol-ortografia-acentuacion-test', 'espanol-ortografia-bv-test',
  'espanol-ortografia-gj-test', 'espanol-ortografia-letras-test', 'espanol-ortografia-puntuacion-test', 'espanol-textos-test', 'estadistica',
  'estados-materia', 'estequiometria', 'evolucion', 'filosofia-antigua', 'filosofia-moderna',
  'finanzas-personales', 'formulacion', 'fracciones', 'franquismo', 'fuerzas',
  'funciones', 'gce', 'genetica', 'geografia-constitucion-test', 'geografia-fisica-test',
  'geografia-humana-test', 'geografia-ue-test', 'geometria', 'guerra-fria', 'historia-ciencia',
  'ingles-grammar-adjectives-test', 'ingles-grammar-adverbs-test', 'ingles-grammar-articles-test', 'ingles-grammar-conditionals-test', 'ingles-grammar-connectors-test',
  'ingles-grammar-modals-test', 'ingles-grammar-nouns-test', 'ingles-grammar-passive-test', 'ingles-grammar-past-simple-test', 'ingles-grammar-present-perfect-test',
  'ingles-grammar-present-simple-test', 'ingles-grammar-pronouns-test', 'ingles-grammar-verbs-test', 'internet-seguro', 'maquinas',
  'mercado', 'mezclas-separacion', 'movimiento', 'musica-instrumentos-test', 'musica-ritmo-test',
  'nutricion', 'ondas-luz', 'placas-tectonicas', 'porcentajes', 'potencias',
  'prehistoria', 'presion-fluidos', 'primaria', 'primera-guerra-mundial', 'primeros-auxilios',
  'quimica-organica', 'revolucion-francesa', 'revolucion-industrial', 'rocas-minerales', 'roma',
  'salud-enfermedad', 'seguridad-vial', 'seres-vivos', 'sistema-solar', 'sucesiones',
  'trigonometria', 'usa', 'wwii',
]

export const RETOS_TODOS = [...RETOS_EXAMENES, ...RETOS_TEST]
export const esTest = id => RETOS_TEST.includes(id)

// El nombre de un examen sin «(con el juego)»: en un reto ya se sabe
export const sinColetilla = t => t.replace(/\s*\((con el juego|with the game|amb el joc)\)\s*$/i, '')

// El examen con el que se juega un reto a partir de un juego o examen (su id
// o el slug de su ruta): el propio examen, o el «-test» del juego. null si ese
// juego no se puede jugar como reto.
export const examenDeReto = id => (!id ? null : RETOS_TODOS.includes(id) ? id : RETOS_TODOS.includes(`${id}-test`) ? `${id}-test` : null)
