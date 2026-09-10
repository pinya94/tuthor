// ── Corrige el Texto: motor de corrección de textos ─────────────────────────
//
// Todo lo que ya había de ortografía en Tuthor enseña la palabra sola y te
// dice qué buscar: Pon la Tilde parte la palabra en sílabas, y los exámenes de
// b/v y g/j preguntan por una palabra concreta. Corregir es otra cosa: nadie
// te señala dónde está el fallo ni de qué tipo es, y hay que decidir palabra
// por palabra si esa está bien puesta. Eso es lo que hace este juego.
//
// TRES DECISIONES QUE LO SOSTIENEN
//
// 1. Los errores se SORTEAN en cada partida. Con veinte textos fijos y tres
//    por partida, siete partidas bastan para haberlo visto todo, y a partir de
//    ahí ya no se corrige: se recuerda dónde estaba el fallo. Cada texto se
//    guarda BIEN escrito y con una lista de trampas posibles; cada partida
//    estropea unas cuantas y deja el resto en paz. Veinte textos con diez
//    trampas dan doscientas diez combinaciones cada uno.
//
// 2. Marcar una palabra correcta cuesta lo mismo que dejarse un error. Sin
//    eso, la estrategia ganadora es marcar las ochenta palabras del texto sin
//    leer ninguna, y el juego se rompe solo.
//
// 3. Se dice CUÁNTOS errores hay. Sin el número, el jugador nunca sabe si ha
//    terminado o le falta uno, y con el reloj corriendo eso es angustia, no
//    lectura. Es lo que hace cualquier ejercicio de corrección en papel.
//
// La puntuación es una sola cifra: el tiempo. Cada error sin marcar y cada
// palabra correcta marcada de más suman diez segundos al tiempo final. Así un
// lector lento pero minucioso puede ganar a uno rápido y descuidado, que es
// justo el hábito que interesa al corregir.

// Cada trampa es [correcta, mal, familia]. La palabra correcta tiene que
// aparecer UNA sola vez en su texto (hay test): así se localiza sin ambigüedad
// y no hace falta escribir índices a mano, que se desincronizan al retocar una
// coma.
export const FAMILIAS = {
  tilde: {
    id: 'tilde', emoji: '✏️',
    label: { es: 'Tildes', en: 'Accents', ca: 'Accents' },
    regla: {
      es: 'La tilde no es adorno: cambia dónde cae el golpe de voz, y a veces cambia la palabra entera.',
      en: 'The accent is not decoration: it moves the stress, and sometimes changes the word.',
      ca: "L'accent no és adorn: canvia on cau el cop de veu, i de vegades canvia la paraula.",
    },
  },
  bv: {
    id: 'bv', emoji: '🅱️',
    label: { es: 'B y V', en: 'B and V', ca: 'B i V' },
    regla: {
      es: 'B y V suenan igual, así que solo se aciertan sabiendo la palabra o su familia.',
      en: 'B and V sound the same, so you only get them right by knowing the word.',
      ca: 'B i V sonen igual, així que només s\'encerten sabent la paraula.',
    },
  },
  gj: {
    id: 'gj', emoji: '🌀',
    label: { es: 'G y J', en: 'G and J', ca: 'G i J' },
    regla: {
      es: 'Ante e/i, la G suena como la J. Los verbos en -ger y -gir la mantienen: recoger, dirigir.',
      en: 'Before e/i, G sounds like J. Verbs in -ger and -gir keep it: recoger, dirigir.',
      ca: 'Davant e/i, la G sona com la J. Els verbs en -ger i -gir la mantenen.',
    },
  },
  h: {
    id: 'h', emoji: '🔇',
    label: { es: 'La H muda', en: 'The silent H', ca: 'La H muda' },
    regla: {
      es: 'La H no suena, así que no avisa: hay que saber qué palabras la llevan.',
      en: 'The H is silent, so it never warns you: you have to know which words carry it.',
      ca: 'La H no sona, així que no avisa: cal saber quines paraules la porten.',
    },
  },
  lly: {
    id: 'lly', emoji: '🌊',
    label: { es: 'LL e Y', en: 'LL and Y', ca: 'LL i Y' },
    regla: {
      es: 'En casi toda España LL e Y suenan igual, y ahí es donde se cuela el error.',
      en: 'In most of Spain LL and Y sound the same, and that is where the mistake sneaks in.',
      ca: 'A gairebé tota Espanya LL i Y sonen igual, i és on s\'escola l\'error.',
    },
  },
  homofono: {
    id: 'homofono', emoji: '🎭',
    label: { es: 'Homófonos', en: 'Homophones', ca: 'Homòfons' },
    regla: {
      es: 'La palabra está bien escrita, pero es OTRA palabra. Solo la frase entera lo delata.',
      en: 'The word is spelled correctly, but it is a DIFFERENT word. Only the sentence gives it away.',
      ca: 'La paraula està ben escrita, però és UNA ALTRA paraula. Només la frase ho delata.',
    },
  },
}
export const FAMILIA_IDS = Object.keys(FAMILIAS)

// ── Los veinte textos ───────────────────────────────────────────────────────
// Escenas corrientes y contadas en pasado, que es donde se concentran las
// dudas de verdad: había/havía, tuvo/tubo, llevó/yevó. Entre 70 y 100 palabras
// cada uno: en un móvil eso es una pantalla, y leer con scroll y reloj a la vez
// mide el aparato y no al lector.
export const TEXTOS = [
  {
    id: 'excursion', emoji: '🚌',
    titulo: { es: 'La excursión al río', en: 'The trip to the river', ca: "L'excursió al riu" },
    texto: 'El sábado por la mañana salimos de excursión hacia el río. El autobús llegó tarde porque el conductor se había equivocado de calle, así que estuvimos media hora esperando en la puerta del colegio. Cuando por fin bajamos, la profesora nos hizo caminar en fila hasta el puente. Allí nos explicó qué animales viven en la orilla y recogió una piedra para enseñarnos las capas. Después comimos los bocadillos sentados en la hierba y volvimos cansados pero contentos.',
    trampas: [
      ['sábado', 'sabado', 'tilde'],
      ['excursión', 'excursion', 'tilde'],
      ['llegó', 'llego', 'tilde'],
      ['explicó', 'explico', 'tilde'],
      ['Después', 'Despues', 'tilde'],
      ['había', 'havía', 'bv'],
      ['estuvimos', 'estubimos', 'bv'],
      ['recogió', 'recojió', 'gj'],
      ['hizo', 'izo', 'h'],
      ['calle', 'caye', 'lly'],
      ['orilla', 'oriya', 'lly'],
      ['bocadillos', 'bocadiyos', 'lly'],
      ['hasta', 'asta', 'homofono'],
      ['hierba', 'hierva', 'homofono'],
    ],
  },
  {
    id: 'partido', emoji: '⚽',
    titulo: { es: 'El partido del domingo', en: 'Sunday match', ca: 'El partit del diumenge' },
    texto: 'El domingo jugamos la final contra el equipo del barrio de arriba. Al principio íbamos perdiendo, porque su delantero era rapidísimo y nuestro portero estuvo muy nervioso. En el descanso el entrenador nos dijo que no había que correr más, sino colocarse mejor. En la segunda parte marcamos dos goles y el árbitro señaló falta a nuestro favor justo antes del final. Cuando acabó el partido, la gente saltó al campo y nos llevó a hombros hasta el vestuario.',
    trampas: [
      ['íbamos', 'ibamos', 'tilde'],
      ['árbitro', 'arbitro', 'tilde'],
      ['señaló', 'señalo', 'tilde'],
      ['acabó', 'acabo', 'tilde'],
      ['saltó', 'salto', 'tilde'],
      ['estuvo', 'estubo', 'bv'],
      ['había', 'havía', 'bv'],
      ['nervioso', 'nerbioso', 'bv'],
      ['gente', 'jente', 'gj'],
      ['hombros', 'ombros', 'h'],
      ['llevó', 'yevó', 'lly'],
      ['hasta', 'asta', 'homofono'],
    ],
  },
  {
    id: 'receta', emoji: '🍲',
    titulo: { es: 'La receta de la abuela', en: "Grandma's recipe", ca: "La recepta de l'àvia" },
    texto: 'Mi abuela hace un arroz que no se parece a ningún otro. Primero sofríe la cebolla muy despacio, hasta que se queda casi transparente, y luego añade el pimiento cortado en tiras finas. Dice que el secreto está en no tener prisa. Mientras tanto hierve el caldo aparte y va recogiendo la espuma con una cuchara de madera. Cuando el arroz ya se encuentra en la cazuela, apaga el fuego y lo deja reposar cinco minutos tapado con un paño. Antes lo llevaba a la mesa en la misma olla, pero ahora usa una fuente blanca.',
    trampas: [
      ['ningún', 'ningun', 'tilde'],
      ['sofríe', 'sofrie', 'tilde'],
      ['está', 'esta', 'tilde'],
      ['hierve', 'hierbe', 'bv'],
      ['llevaba', 'llevava', 'bv'],
      ['recogiendo', 'recojiendo', 'gj'],
      ['hace', 'ace', 'h'],
      ['ahora', 'aora', 'h'],
      ['cebolla', 'ceboya', 'lly'],
      ['hasta', 'asta', 'homofono'],
    ],
  },
  {
    id: 'movil', emoji: '📱',
    titulo: { es: 'El móvil nuevo', en: 'The new phone', ca: 'El mòbil nou' },
    texto: 'Mi hermano se compró un móvil nuevo con el dinero que había ahorrado todo el año. Estuvo dos semanas comparando modelos y leyendo análisis en internet, y al final eligió el más barato de los tres que le gustaban. El primer día no lo soltó ni para comer. Mi madre le dijo que si seguía así se lo iba a guardar ella en un cajón hasta el verano. Ahora lo deja cargando en la cocina y sube a estudiar sin él.',
    trampas: [
      ['análisis', 'analisis', 'tilde'],
      ['cajón', 'cajon', 'tilde'],
      ['seguía', 'seguia', 'tilde'],
      ['él', 'el', 'tilde'],
      ['móvil', 'móbil', 'bv'],
      ['había', 'havía', 'bv'],
      ['Estuvo', 'Estubo', 'bv'],
      ['eligió', 'elijió', 'gj'],
      ['hermano', 'ermano', 'h'],
      ['Ahora', 'Aora', 'h'],
      ['hasta', 'asta', 'homofono'],
    ],
  },
  {
    id: 'biblioteca', emoji: '📚',
    titulo: { es: 'La biblioteca del barrio', en: 'The local library', ca: 'La biblioteca del barri' },
    texto: 'La biblioteca del barrio abre por las tardes y siempre está a rebosar. Hay una sala pequeña al fondo donde no se puede hablar, ni siquiera en voz baja, y otra más grande con mesas largas donde la gente estudia en grupo. El bibliotecario conoce a todo el mundo por su nombre y sabe qué libro va a gustarle a cada uno. El año pasado organizó un club de lectura y ahora hay que apuntarse en junio porque se llena en dos días.',
    trampas: [
      ['está', 'esta', 'tilde'],
      ['organizó', 'organizo', 'tilde'],
      ['días', 'dias', 'tilde'],
      ['sabe', 'save', 'bv'],
      ['libro', 'livro', 'bv'],
      ['gente', 'jente', 'gj'],
      ['hablar', 'ablar', 'h'],
      ['ahora', 'aora', 'h'],
      ['llena', 'yena', 'lly'],
      ['Hay', 'Ay', 'homofono'],
    ],
  },
  {
    id: 'huerto', emoji: '🌱',
    titulo: { es: 'El huerto del colegio', en: 'The school garden', ca: "L'hort de l'escola" },
    texto: 'En el patio de atrás hay un huerto que cuidamos por turnos. Cada clase tiene su bancal y un cuaderno donde apunta lo que ha plantado y el día que lo regó. Este año sembramos tomates, lechugas y calabacines, y solo se echaron a perder los tomates, porque el hongo llegó antes que nosotros. El conserje nos enseñó a hacer un cartel con el nombre de cada planta. El curso que viene queremos probar con habas, que aguantan bien el frío, y recoger la cosecha antes de las vacaciones.',
    trampas: [
      ['regó', 'rego', 'tilde'],
      ['enseñó', 'enseño', 'tilde'],
      ['frío', 'frio', 'tilde'],
      ['viene', 'biene', 'bv'],
      ['probar', 'provar', 'bv'],
      ['bien', 'vien', 'bv'],
      ['recoger', 'recojer', 'gj'],
      ['huerto', 'uerto', 'h'],
      ['hacer', 'acer', 'h'],
      ['echaron', 'hecharon', 'h'],
      ['llegó', 'yegó', 'lly'],
      ['hay', 'ay', 'homofono'],
    ],
  },
  {
    id: 'tren', emoji: '🚆',
    titulo: { es: 'Un viaje en tren', en: 'A train journey', ca: 'Un viatge en tren' },
    texto: 'Salimos de la estación a las siete y media, cuando todavía era de noche. El vagón iba medio vacío y pudimos sentarnos junto a la ventanilla. Durante la primera hora no se veía nada, pero al amanecer apareció el mar a la derecha y ya no miré el móvil en todo el trayecto. Mi hermana se durmió con la cabeza apoyada en el cristal y no la desperté hasta que el revisor recogió los billetes.',
    trampas: [
      ['estación', 'estacion', 'tilde'],
      ['todavía', 'todavia', 'tilde'],
      ['vacío', 'vacio', 'tilde'],
      ['veía', 'veia', 'tilde'],
      ['apareció', 'aparecio', 'tilde'],
      ['miré', 'mire', 'tilde'],
      ['vagón', 'bagón', 'bv'],
      ['iba', 'iva', 'bv'],
      ['recogió', 'recojió', 'gj'],
      ['hermana', 'ermana', 'h'],
      ['ventanilla', 'ventaniya', 'lly'],
      ['billetes', 'biyetes', 'lly'],
      ['hasta', 'asta', 'homofono'],
    ],
  },
  {
    id: 'concierto', emoji: '🎸',
    titulo: { es: 'El concierto del instituto', en: 'The school concert', ca: "El concert de l'institut" },
    texto: 'El grupo del instituto tocó en el salón de actos el viernes por la tarde. Habían ensayado dos meses y aun así el bajista se equivocó en la primera canción, aunque casi nadie se dio cuenta. La batería sonaba demasiado fuerte y el profesor de música tuvo que bajar el volumen desde la mesa. Al final todo el mundo aplaudió de pie, y ellos volvieron a salir para tocar una más. Ahora quieren grabar una maqueta, aunque todavía no han elegido el nombre.',
    trampas: [
      ['tocó', 'toco', 'tilde'],
      ['salón', 'salon', 'tilde'],
      ['equivocó', 'equivoco', 'tilde'],
      ['canción', 'cancion', 'tilde'],
      ['batería', 'bateria', 'tilde'],
      ['música', 'musica', 'tilde'],
      ['volumen', 'volúmen', 'tilde'],
      ['aplaudió', 'aplaudio', 'tilde'],
      ['Habían', 'Havían', 'bv'],
      ['bajar', 'vajar', 'bv'],
      ['volvieron', 'bolvieron', 'bv'],
      ['grabar', 'gravar', 'bv'],
      ['elegido', 'elejido', 'gj'],
      ['Ahora', 'Aora', 'h'],
      ['ellos', 'eyos', 'lly'],
      ['tuvo', 'tubo', 'homofono'],
    ],
  },
  {
    id: 'tormenta', emoji: '⛈️',
    titulo: { es: 'La tormenta', en: 'The storm', ca: 'La tempesta' },
    texto: 'La tormenta empezó a media tarde, cuando todavía había gente en la piscina. Primero cayeron cuatro gotas gordas y en dos minutos el agua bajaba por la calle como un río. Nos refugiamos en el portal de un edificio y desde allí vimos volar una silla de plástico hasta la acera de enfrente. Cuando escampó, el cielo se quedó de un color naranja rarísimo y todo el mundo salió a hacerle fotos con el móvil.',
    trampas: [
      ['empezó', 'empezo', 'tilde'],
      ['todavía', 'todavia', 'tilde'],
      ['río', 'rio', 'tilde'],
      ['allí', 'alli', 'tilde'],
      ['quedó', 'quedo', 'tilde'],
      ['rarísimo', 'rarisimo', 'tilde'],
      ['salió', 'salio', 'tilde'],
      ['había', 'havía', 'bv'],
      ['volar', 'bolar', 'bv'],
      ['móvil', 'móbil', 'bv'],
      ['gente', 'jente', 'gj'],
      ['hacerle', 'acerle', 'h'],
      ['calle', 'caye', 'lly'],
      ['silla', 'siya', 'lly'],
      ['hasta', 'asta', 'homofono'],
    ],
  },
  {
    id: 'perro', emoji: '🐕',
    titulo: { es: 'El perro perdido', en: 'The lost dog', ca: 'El gos perdut' },
    texto: 'Apareció un domingo por la mañana delante del portal, empapado y sin collar. Le pusimos agua en un cuenco y se la bebió entera sin levantar la cabeza. Mi padre dijo que no podíamos quedárnoslo, pero lo subió en brazos hasta el cuarto piso porque llovía otra vez. Al día siguiente hicimos carteles por el barrio y a la semana llamó una señora desde el pueblo de al lado. Vino a recogerlo llorando y nos trajo un bizcocho enorme.',
    trampas: [
      ['Apareció', 'Aparecio', 'tilde'],
      ['bebió', 'bebio', 'tilde'],
      ['podíamos', 'podiamos', 'tilde'],
      ['subió', 'subio', 'tilde'],
      ['llamó', 'llamo', 'tilde'],
      ['Vino', 'Bino', 'bv'],
      ['bizcocho', 'viscocho', 'bv'],
      ['recogerlo', 'recojerlo', 'gj'],
      ['hicimos', 'icimos', 'h'],
      ['collar', 'coyar', 'lly'],
      ['llovía', 'yovía', 'lly'],
      ['llorando', 'yorando', 'lly'],
      ['hasta', 'asta', 'homofono'],
    ],
  },
  {
    id: 'pueblo', emoji: '🏡',
    titulo: { es: 'Las vacaciones en el pueblo', en: 'Summer in the village', ca: 'Les vacances al poble' },
    texto: 'En agosto vamos al pueblo de mi madre, que está en la montaña y tiene ochenta vecinos contados. No hay cine ni centro comercial, así que pasamos el día en la plaza o subiendo al castillo por un camino que huele a tomillo. Por la noche se sientan todos fuera a tomar el fresco y los mayores cuentan las mismas historias del año pasado. A mí me gusta porque allí nadie tiene prisa. Antes de irnos siempre recogemos nueces del árbol de la entrada.',
    trampas: [
      ['está', 'esta', 'tilde'],
      ['así', 'asi', 'tilde'],
      ['mí', 'mi', 'tilde'],
      ['allí', 'alli', 'tilde'],
      ['árbol', 'arbol', 'tilde'],
      ['vamos', 'bamos', 'bv'],
      ['vecinos', 'becinos', 'bv'],
      ['recogemos', 'recojemos', 'gj'],
      ['huele', 'uele', 'h'],
      ['historias', 'istorias', 'h'],
      ['castillo', 'castiyo', 'lly'],
      ['hay', 'ay', 'homofono'],
    ],
  },
  {
    id: 'examen', emoji: '✏️',
    titulo: { es: 'El examen de matemáticas', en: 'The maths test', ca: "L'examen de matemàtiques" },
    texto: 'El examen de matemáticas era el jueves y yo llevaba dos semanas diciendo que me lo sabía. La noche antes abrí el cuaderno y descubrí que había cinco temas y no tres, así que me quedé estudiando hasta las dos. Al día siguiente aprobé por los pelos, y no por lo que estudié esa noche, sino por los ejercicios que hice en clase durante el mes. Ahora empiezo la semana anterior, aunque sea media hora al día.',
    trampas: [
      ['matemáticas', 'matematicas', 'tilde'],
      ['sabía', 'sabia', 'tilde'],
      ['abrí', 'abri', 'tilde'],
      ['descubrí', 'descubri', 'tilde'],
      ['estudié', 'estudie', 'tilde'],
      ['había', 'havía', 'bv'],
      ['aprobé', 'aprové', 'bv'],
      ['ejercicios', 'egercicios', 'gj'],
      ['hice', 'ice', 'h'],
      ['Ahora', 'Aora', 'h'],
      ['llevaba', 'yevaba', 'lly'],
      ['hasta', 'asta', 'homofono'],
    ],
  },
  {
    id: 'museo', emoji: '🏛️',
    titulo: { es: 'La visita al museo', en: 'The museum visit', ca: 'La visita al museu' },
    texto: 'Fuimos al museo un martes por la mañana, cuando no había casi nadie. La guía nos llevó primero a la sala de los mosaicos y nos explicó cómo se hacían, piedra a piedra, sin dibujo previo. Luego subimos a la planta de arriba, donde estaba la armadura que sale en todos los libros de texto. Es mucho más pequeña de lo que parece en las fotos. Al salir recogimos un folleto y compramos una postal en la tienda, y volvimos andando hasta la parada.',
    trampas: [
      ['guía', 'guia', 'tilde'],
      ['explicó', 'explico', 'tilde'],
      ['cómo', 'como', 'tilde'],
      ['más', 'mas', 'tilde'],
      ['había', 'havía', 'bv'],
      ['volvimos', 'bolvimos', 'bv'],
      ['recogimos', 'recojimos', 'gj'],
      ['hacían', 'acían', 'h'],
      ['llevó', 'yevó', 'lly'],
      ['hasta', 'asta', 'homofono'],
    ],
  },
  {
    id: 'teatro', emoji: '🎭',
    titulo: { es: 'La obra de teatro', en: 'The school play', ca: "L'obra de teatre" },
    texto: 'Este año el grupo de teatro montó una obra sobre un pueblo que se queda sin agua. Ensayaron desde noviembre en el gimnasio, porque el salón de actos estaba ocupado con las obras del techo. La protagonista se puso enferma dos días antes del estreno y tuvo que sustituirla una chica de primero que se sabía el papel entero de tanto oírlo desde la silla de al lado. Salió bordado, y al acabar la función el público estuvo aplaudiendo un rato largo y hubo que salir tres veces a saludar.',
    trampas: [
      ['montó', 'monto', 'tilde'],
      ['salón', 'salon', 'tilde'],
      ['días', 'dias', 'tilde'],
      ['sabía', 'sabia', 'tilde'],
      ['oírlo', 'oirlo', 'tilde'],
      ['Salió', 'Salio', 'tilde'],
      ['público', 'publico', 'tilde'],
      ['noviembre', 'nobiembre', 'bv'],
      ['estuvo', 'estubo', 'bv'],
      ['gimnasio', 'jimnasio', 'gj'],
      ['hubo', 'ubo', 'h'],
      ['silla', 'siya', 'lly'],
      ['tuvo', 'tubo', 'homofono'],
    ],
  },
  {
    id: 'robotica', emoji: '🤖',
    titulo: { es: 'El taller de robótica', en: 'The robotics club', ca: 'El taller de robòtica' },
    texto: 'Los miércoles por la tarde hay un taller de robótica en el aula de tecnología. Empezamos montando un coche que sigue una línea negra pintada en el suelo, y el primer día ninguno consiguió que diera la vuelta entera al circuito. El problema no era el motor, sino un sensor mal colocado que leía el reflejo de los fluorescentes, y lo descubrimos mirando la pantalla del ordenador. Cuando lo bajamos dos centímetros, el coche hizo el recorrido a la primera. Al final el profesor recogió las piezas en una caja.',
    trampas: [
      ['miércoles', 'miercoles', 'tilde'],
      ['robótica', 'robotica', 'tilde'],
      ['tecnología', 'tecnologia', 'tilde'],
      ['línea', 'linea', 'tilde'],
      ['consiguió', 'consiguio', 'tilde'],
      ['leía', 'leia', 'tilde'],
      ['centímetros', 'centimetros', 'tilde'],
      ['vuelta', 'buelta', 'bv'],
      ['bajamos', 'vajamos', 'bv'],
      ['recogió', 'recojió', 'gj'],
      ['hizo', 'izo', 'h'],
      ['pantalla', 'pantaya', 'lly'],
      ['hay', 'ay', 'homofono'],
    ],
  },
  {
    id: 'carrera', emoji: '🏃',
    titulo: { es: 'La carrera popular', en: 'The fun run', ca: 'La cursa popular' },
    texto: 'Mi padre corrió la carrera popular del barrio y quedó el cuadragésimo de trescientos. Se preparó tres meses saliendo a las siete de la mañana, incluso los días de lluvia. La noche antes no durmió bien de los nervios y por la mañana no quiso desayunar casi nada. En el kilómetro siete iba tan cansado que estuvo a punto de parar, pero vio a mi hermana en la acera gritando su nombre y aguantó hasta el final. Al cruzar la meta le recogieron el dorsal y le dieron una medalla de cartón.',
    trampas: [
      ['corrió', 'corrio', 'tilde'],
      ['quedó', 'quedo', 'tilde'],
      ['preparó', 'preparo', 'tilde'],
      ['días', 'dias', 'tilde'],
      ['durmió', 'durmio', 'tilde'],
      ['kilómetro', 'kilometro', 'tilde'],
      ['aguantó', 'aguanto', 'tilde'],
      ['bien', 'vien', 'bv'],
      ['iba', 'iva', 'bv'],
      ['estuvo', 'estubo', 'bv'],
      ['recogieron', 'recojieron', 'gj'],
      ['hermana', 'ermana', 'h'],
      ['lluvia', 'yuvia', 'lly'],
      ['medalla', 'medaya', 'lly'],
      ['hasta', 'asta', 'homofono'],
    ],
  },
  {
    id: 'mercado', emoji: '🥕',
    titulo: { es: 'El mercado de los sábados', en: 'Saturday market', ca: 'El mercat dels dissabtes' },
    texto: 'Los sábados por la mañana el mercado se llena de gente y hay que ir pronto si quieres pescado. Mi madre siempre compra en el mismo puesto, donde la conocen desde antes de que yo naciera. Mientras ella elige, yo doy una vuelta por el pasillo de la fruta, que huele a melón desde la entrada. Luego llevamos las bolsas entre los dos hasta el coche, y siempre pesan más de lo que parecía cuando las cogimos.',
    trampas: [
      ['sábados', 'sabados', 'tilde'],
      ['melón', 'melon', 'tilde'],
      ['más', 'mas', 'tilde'],
      ['parecía', 'parecia', 'tilde'],
      ['vuelta', 'buelta', 'bv'],
      ['bolsas', 'volsas', 'bv'],
      ['gente', 'jente', 'gj'],
      ['elige', 'elije', 'gj'],
      ['cogimos', 'cojimos', 'gj'],
      ['huele', 'uele', 'h'],
      ['llena', 'yena', 'lly'],
      ['llevamos', 'yevamos', 'lly'],
      ['hay', 'ay', 'homofono'],
      ['hasta', 'asta', 'homofono'],
    ],
  },
  {
    id: 'playa', emoji: '🌊',
    titulo: { es: 'La playa en invierno', en: 'The beach in winter', ca: 'La platja a l\'hivern' },
    texto: 'En invierno la playa es otra cosa. No hay sombrillas ni chiringuitos, solo dos o tres personas paseando con el abrigo cerrado y algún perro suelto corriendo detrás de las gaviotas. El agua está helada y nadie se mete, pero el ruido de las olas se oye mucho más porque no queda nadie hablando. Nosotros bajamos casi todos los domingos y volvemos con las manos frías y arena en los bolsillos. Alguna vez recogemos conchas y las dejamos en la estantería del pasillo.',
    trampas: [
      ['algún', 'algun', 'tilde'],
      ['está', 'esta', 'tilde'],
      ['más', 'mas', 'tilde'],
      ['frías', 'frias', 'tilde'],
      ['gaviotas', 'gabiotas', 'bv'],
      ['volvemos', 'bolvemos', 'bv'],
      ['recogemos', 'recojemos', 'gj'],
      ['helada', 'elada', 'h'],
      ['hablando', 'ablando', 'h'],
      ['playa', 'plalla', 'lly'],
      ['sombrillas', 'sombriyas', 'lly'],
      ['bolsillos', 'bolsiyos', 'lly'],
      ['hay', 'ay', 'homofono'],
    ],
  },
  {
    id: 'videojuego', emoji: '🎮',
    titulo: { es: 'El videojuego', en: 'The video game', ca: 'El videojoc' },
    texto: 'Me regalaron un videojuego por mi cumpleaños y lo terminé en cuatro tardes, lo cual dice más del juego que de mí. La historia empezaba fenomenal: un pueblo bajo el hielo y un personaje que no hablaba nunca. Pero a la mitad se convertía en pegar tiros y ya daba igual lo que hicieras. Lo mejor era el mapa, dibujado a mano, con caminos que llevaban a sitios donde no había nada hasta el borde del papel. Eso sí que estaba bien pensado.',
    trampas: [
      ['terminé', 'termine', 'tilde'],
      ['más', 'mas', 'tilde'],
      ['mí', 'mi', 'tilde'],
      ['convertía', 'convertia', 'tilde'],
      ['sí', 'si', 'tilde'],
      ['videojuego', 'bideojuego', 'bv'],
      ['había', 'havía', 'bv'],
      ['bien', 'vien', 'bv'],
      ['personaje', 'personage', 'gj'],
      ['historia', 'istoria', 'h'],
      ['hielo', 'ielo', 'h'],
      ['hablaba', 'ablaba', 'h'],
      ['hicieras', 'icieras', 'h'],
      ['llevaban', 'yevaban', 'lly'],
      ['hasta', 'asta', 'homofono'],
    ],
  },
  {
    id: 'mudanza', emoji: '📦',
    titulo: { es: 'La mudanza', en: 'Moving house', ca: 'La mudança' },
    texto: 'Nos mudamos en julio, con cuarenta grados y sin ascensor. Mi padre había calculado que cabía todo en dos viajes de furgoneta y al final hicieron falta cinco. Lo peor fueron los libros: cajas pequeñas que pesaban como si llevaran ladrillos dentro. Yo bajé la mía sola por la escalera y tuve que parar en cada rellano hasta arriba. Cuando terminamos, nos sentamos en el suelo del piso vacío a comer pizza, y desde allí la casa ya parecía nuestra.',
    trampas: [
      ['cabía', 'cabia', 'tilde'],
      ['bajé', 'baje', 'tilde'],
      ['mía', 'mia', 'tilde'],
      ['vacío', 'vacio', 'tilde'],
      ['allí', 'alli', 'tilde'],
      ['parecía', 'parecia', 'tilde'],
      ['había', 'havía', 'bv'],
      ['tuve', 'tube', 'bv'],
      ['viajes', 'viages', 'gj'],
      ['hicieron', 'icieron', 'h'],
      ['llevaran', 'yevaran', 'lly'],
      ['ladrillos', 'ladriyos', 'lly'],
      ['hasta', 'asta', 'homofono'],
    ],
  },
]
export const TEXTO_IDS = TEXTOS.map(t => t.id)

// ── Niveles ─────────────────────────────────────────────────────────────────
// Lo que cambia no es la longitud del texto (eso mediría la velocidad de
// lectura, no la vista para el error) sino QUÉ tipo de fallo se esconde y
// cuántos hay. El salto de verdad está en difícil: los homófonos son palabras
// bien escritas puestas donde no van, así que la letra no delata nada y hay
// que entender la frase entera.
export const NIVELES = {
  facil: {
    id: 'facil', emoji: '🟢',
    label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
    hint: { es: '3 fallos por texto · tildes y b/v', en: '3 mistakes per text · accents and b/v', ca: '3 errors per text · accents i b/v' },
    familias: ['tilde', 'bv'],
    errores: 3,
  },
  medio: {
    id: 'medio', emoji: '🟡',
    label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
    hint: { es: '4 fallos · + g/j, h muda y ll/y', en: '4 mistakes · + g/j, silent h and ll/y', ca: '4 errors · + g/j, h muda i ll/y' },
    familias: ['tilde', 'bv', 'gj', 'h', 'lly'],
    errores: 4,
  },
  dificil: {
    id: 'dificil', emoji: '🔴',
    label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
    hint: { es: '5 fallos · + homófonos (tuvo/tubo)', en: '5 mistakes · + homophones (tuvo/tubo)', ca: '5 errors · + homòfons (tuvo/tubo)' },
    familias: ['tilde', 'bv', 'gj', 'h', 'lly', 'homofono'],
    errores: 5,
  },
}
export const NIVEL_IDS = Object.keys(NIVELES)

export const TEXTOS_POR_PARTIDA = 3
// Lo que suma al tiempo final cada error sin marcar Y cada palabra correcta
// marcada de más. El mismo número para los dos casos a propósito: una sola
// regla que explicar, y ninguna de las dos formas de fallar sale más barata.
//
// DIEZ y no cinco, y esto lo decidió un test, no el gusto. Con cinco, leer
// deprisa dejándose la mitad de las faltas puntuaba MÁS que leer bien: un
// repaso cuidadoso de un texto cuesta cerca de un minuto y saca sus cinco
// fallos, o sea unos doce segundos de lectura por fallo encontrado; si
// saltárselo cuesta cinco, sale a cuenta no leer. La penalización tiene que
// ser mayor que el tiempo que se ahorra no mirando, o la prisa gana y el juego
// enseña justo lo contrario de lo que pretende. Hay test que lo comprueba.
export const PENALIZACION = 10
// De aquí se resta el tiempo final para tener puntos (más es mejor), porque el
// leaderboard ordena por `score` descendente y no sabe de segundos. Siete
// minutos es de sobra para tres textos incluso leyendo despacio.
export const TIEMPO_TOPE = 420

const rng = (a, b) => a + Math.floor(Math.random() * (b - a + 1))
const shuffle = arr => {
  const c = [...arr]
  for (let i = c.length - 1; i > 0; i--) {
    const j = rng(0, i)
    ;[c[i], c[j]] = [c[j], c[i]]
  }
  return c
}

// Palabras: letras del castellano, nada más. Todo lo demás (espacios, comas,
// dos puntos) queda como separador intocable, así que la puntuación del texto
// no se puede marcar ni romper.
const RE_PALABRA = /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+/g

// Parte el texto en piezas alternando palabra y separador. Se trabaja SIEMPRE
// sobre esta lista y nunca sobre la cadena: una palabra puede repetirse, y un
// replace() de cadena estropearía la primera aparición en vez de la que toca.
export function tokenizar(texto) {
  const piezas = []
  let ultimo = 0
  for (const m of texto.matchAll(RE_PALABRA)) {
    if (m.index > ultimo) piezas.push({ palabra: false, s: texto.slice(ultimo, m.index) })
    piezas.push({ palabra: true, s: m[0] })
    ultimo = m.index + m[0].length
  }
  if (ultimo < texto.length) piezas.push({ palabra: false, s: texto.slice(ultimo) })
  return piezas
}

// Trampas de este texto que valen para este nivel.
export function trampasUsables(texto, nivel) {
  const fams = NIVELES[nivel]?.familias ?? NIVELES.medio.familias
  return texto.trampas.filter(([, , fam]) => fams.includes(fam))
}

// Una ronda = un texto ya estropeado, con sus piezas listas para pintar.
export function generarRonda(textoId, nivel = 'medio') {
  const texto = TEXTOS.find(t => t.id === textoId) ?? TEXTOS[0]
  const cfg = NIVELES[nivel] ?? NIVELES.medio
  const usables = trampasUsables(texto, nivel)

  // En difícil entra SIEMPRE un homófono si el texto tiene alguno. Si se
  // dejara al azar puro, la mitad de los textos difíciles no traerían ninguno
  // y el nivel sería el medio con un fallo más, que no es lo prometido.
  const homofonos = usables.filter(([, , fam]) => fam === 'homofono')
  const forzada = cfg.familias.includes('homofono') && homofonos.length > 0
    ? [shuffle(homofonos)[0]]
    : []
  const resto = shuffle(usables.filter(t => !forzada.includes(t)))
  const elegidas = [...forzada, ...resto].slice(0, Math.min(cfg.errores, usables.length))

  const piezas = tokenizar(texto.texto)
  const palabras = piezas.map((p, i) => (p.palabra ? i : -1)).filter(i => i >= 0)
  const tokens = piezas.map(p => ({ ...p, error: false, correcta: null, familia: null }))

  for (const [correcta, mal, familia] of elegidas) {
    const i = palabras.find(k => piezas[k].s === correcta)
    if (i == null) continue
    tokens[i] = { palabra: true, s: mal, error: true, correcta, familia }
  }

  return {
    id: texto.id, emoji: texto.emoji, titulo: texto.titulo,
    nivel, tokens,
    nErrores: tokens.filter(t => t.error).length,
  }
}

// Tres textos distintos. `evitar` deja fuera los de la partida anterior para
// que jugar dos seguidas no repita el mismo texto con otros fallos.
export function generarPartida(nivel = 'medio', evitar = []) {
  const libres = TEXTO_IDS.filter(id => !evitar.includes(id))
  const pool = libres.length >= TEXTOS_POR_PARTIDA ? libres : TEXTO_IDS
  return shuffle(pool).slice(0, TEXTOS_POR_PARTIDA).map(id => generarRonda(id, nivel))
}

// El tiempo que cuenta: el del reloj más la penalización de todo lo que no se
// vio y de todo lo que se marcó sin estar mal.
export function tiempoFinal({ segundos = 0, sinMarcar = 0, deMas = 0 } = {}) {
  return segundos + PENALIZACION * (sinMarcar + deMas)
}

export function puntosDe(final) {
  return Math.max(0, Math.round(TIEMPO_TOPE - final))
}

export function formatoTiempo(segundos) {
  const s = Math.max(0, Math.round(segundos))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}
