// Palabras para Pon la Tilde (lengua · acentuación).
//
// La palabra se muestra SIN tilde y partida en sílabas, y el jugador tiene que
// hacer las dos cosas que pide la regla, en el orden en que se piensan:
//   1. dónde cae el golpe de voz (la sílaba tónica)
//   2. si por eso le toca tilde o no
//
// Enseñar solo "las esdrújulas llevan tilde" no sirve de nada si el alumno no
// sabe cuál es la esdrújula. Por eso la primera pregunta es siempre dónde cae
// el acento: el tipo de palabra sale de ahí, y la regla se aplica después.
//
// `escrita` es la forma correcta. De comparar `escrita` con `palabra` sale si
// lleva tilde o no, así que los datos no pueden contradecir a la regla: no hay
// un campo `lleva` que se pueda quedar mal puesto. Un test lo verifica contra
// la regla general para todas las que no son hiato.
//
// `hiato: true` marca las que llevan tilde por romper un diptongo (día, país,
// baúl) y no por la regla de agudas/llanas/esdrújulas. Son la excepción que
// más se falla, así que están a propósito, pero avisadas.

// palabra sin tilde · sílabas · índice de la tónica · forma correcta
const w = (palabra, silabas, tonica, escrita, hiato = false) =>
  ({ palabra, silabas, tonica, escrita, hiato })

export const PALABRAS = [
  // ── Agudas CON tilde (acaban en vocal, n o s) ──────────────────────────────
  w('cancion', ['can', 'cion'], 1, 'canción'),
  w('jamon', ['ja', 'mon'], 1, 'jamón'),
  w('sofa', ['so', 'fa'], 1, 'sofá'),
  w('cafe', ['ca', 'fe'], 1, 'café'),
  w('camion', ['ca', 'mion'], 1, 'camión'),
  w('autobus', ['au', 'to', 'bus'], 2, 'autobús'),
  w('jardin', ['jar', 'din'], 1, 'jardín'),
  w('raton', ['ra', 'ton'], 1, 'ratón'),
  w('compas', ['com', 'pas'], 1, 'compás'),
  w('alla', ['a', 'lla'], 1, 'allá'),
  w('salio', ['sa', 'lio'], 1, 'salió'),
  w('ademas', ['a', 'de', 'mas'], 2, 'además'),

  // ── Agudas SIN tilde (acaban en otra consonante) ───────────────────────────
  w('reloj', ['re', 'loj'], 1, 'reloj'),
  w('pared', ['pa', 'red'], 1, 'pared'),
  w('feliz', ['fe', 'liz'], 1, 'feliz'),
  w('papel', ['pa', 'pel'], 1, 'papel'),
  w('ciudad', ['ciu', 'dad'], 1, 'ciudad'),
  w('cantar', ['can', 'tar'], 1, 'cantar'),
  w('nariz', ['na', 'riz'], 1, 'nariz'),
  w('color', ['co', 'lor'], 1, 'color'),
  w('verdad', ['ver', 'dad'], 1, 'verdad'),
  w('profesor', ['pro', 'fe', 'sor'], 2, 'profesor'),

  // ── Llanas CON tilde (NO acaban en vocal, n ni s) ──────────────────────────
  w('arbol', ['ar', 'bol'], 0, 'árbol'),
  w('lapiz', ['la', 'piz'], 0, 'lápiz'),
  w('azucar', ['a', 'zu', 'car'], 1, 'azúcar'),
  w('cesped', ['ces', 'ped'], 0, 'césped'),
  w('dificil', ['di', 'fi', 'cil'], 1, 'difícil'),
  w('facil', ['fa', 'cil'], 0, 'fácil'),
  w('util', ['u', 'til'], 0, 'útil'),
  w('caracter', ['ca', 'rac', 'ter'], 1, 'carácter'),
  w('marmol', ['mar', 'mol'], 0, 'mármol'),
  w('debil', ['de', 'bil'], 0, 'débil'),

  // ── Llanas SIN tilde (acaban en vocal, n o s) ──────────────────────────────
  w('mesa', ['me', 'sa'], 0, 'mesa'),
  w('libro', ['li', 'bro'], 0, 'libro'),
  w('ventana', ['ven', 'ta', 'na'], 1, 'ventana'),
  w('camisa', ['ca', 'mi', 'sa'], 1, 'camisa'),
  w('joven', ['jo', 'ven'], 0, 'joven'),
  w('examen', ['e', 'xa', 'men'], 1, 'examen'),
  w('zapatos', ['za', 'pa', 'tos'], 1, 'zapatos'),
  w('caminaba', ['ca', 'mi', 'na', 'ba'], 2, 'caminaba'),
  w('bicicleta', ['bi', 'ci', 'cle', 'ta'], 2, 'bicicleta'),
  w('pelota', ['pe', 'lo', 'ta'], 1, 'pelota'),
  w('cuaderno', ['cua', 'der', 'no'], 1, 'cuaderno'),

  // ── Esdrújulas (SIEMPRE con tilde) ─────────────────────────────────────────
  w('murcielago', ['mur', 'cie', 'la', 'go'], 1, 'murciélago'),
  w('pajaro', ['pa', 'ja', 'ro'], 0, 'pájaro'),
  w('musica', ['mu', 'si', 'ca'], 0, 'música'),
  w('medico', ['me', 'di', 'co'], 0, 'médico'),
  w('lampara', ['lam', 'pa', 'ra'], 0, 'lámpara'),
  w('camara', ['ca', 'ma', 'ra'], 0, 'cámara'),
  w('telefono', ['te', 'le', 'fo', 'no'], 1, 'teléfono'),
  w('brujula', ['bru', 'ju', 'la'], 0, 'brújula'),
  w('miercoles', ['mier', 'co', 'les'], 0, 'miércoles'),
  w('platano', ['pla', 'ta', 'no'], 0, 'plátano'),
  w('rapido', ['ra', 'pi', 'do'], 0, 'rápido'),
  w('ultimo', ['ul', 'ti', 'mo'], 0, 'último'),
  w('sabado', ['sa', 'ba', 'do'], 0, 'sábado'),
  w('kilometro', ['ki', 'lo', 'me', 'tro'], 1, 'kilómetro'),
  w('esdrujula', ['es', 'dru', 'ju', 'la'], 1, 'esdrújula'),

  // ── Sobresdrújulas (siempre con tilde, y casi siempre verbos con pronombres) ─
  w('digamelo', ['di', 'ga', 'me', 'lo'], 0, 'dígamelo'),
  w('cuentaselo', ['cuen', 'ta', 'se', 'lo'], 0, 'cuéntaselo'),
  // Los adverbios en -mente se quedan fuera a propósito: llevan DOS golpes de
  // voz (rá-pi-da-MEN-te) y conservan la tilde del adjetivo, así que preguntar
  // "cuál es la sílaba tónica" no tiene una respuesta limpia.
  w('devuelvemelo', ['de', 'vuel', 've', 'me', 'lo'], 1, 'devuélvemelo'),

  // ── Hiatos: llevan tilde por romper el diptongo, no por la regla general ────
  w('dia', ['di', 'a'], 0, 'día', true),
  w('pais', ['pa', 'is'], 1, 'país', true),
  w('baul', ['ba', 'ul'], 1, 'baúl', true),
  w('rio', ['ri', 'o'], 0, 'río', true),
  w('maiz', ['ma', 'iz'], 1, 'maíz', true),
  w('reune', ['re', 'u', 'ne'], 1, 'reúne', true),
  w('oido', ['o', 'i', 'do'], 1, 'oído', true),
  w('policia', ['po', 'li', 'ci', 'a'], 2, 'policía', true),
  w('frio', ['fri', 'o'], 0, 'frío', true),
  w('bahia', ['ba', 'hi', 'a'], 1, 'bahía', true),
]
