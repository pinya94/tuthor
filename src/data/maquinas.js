// Máquinas y mecanismos — Física (y Tecnología), Primaria + ESO. Las máquinas
// simples (palanca y sus tres grados, plano inclinado, cuña, tornillo, rueda,
// polea fija y móvil) y los mecanismos de 1º-2º de ESO: ley de la palanca,
// polipastos, engranajes y poleas con correa, biela-manivela, piñón-cremallera
// y leva. Tuthor no tiene materia de Tecnología: el tema vive en Física, que
// es donde está la ley de la palanca, y su juego de palancas es Balanza.
//
// Las cuentas (palanca, poleas, relación de transmisión) están comprobadas.
//
// La respuesta buena va siempre la PRIMERA en `opciones`: ExamenMC baraja el
// orden al servir cada pregunta (lib/ordenOpciones.js).
function q(id, nivel, emoji, pregunta, opciones, explicacion) {
  // La correcta se guarda como TEXTO (lo que leen ExamenMC y las tarjetas
  // imprimibles de lib/tarjetasExamen.js): el de la primera opción.
  const correcta = { es: opciones.es[0], en: opciones.en[0], ca: opciones.ca[0] }
  return { id, nivel, emoji, pregunta, opciones, correcta, explicacion }
}
const T = (es, en, ca) => ({ es, en, ca })
const O = (es, en, ca) => ({ es, en, ca })
const N = (...xs) => ({ es: xs, en: xs, ca: xs })

export const PREGUNTAS = [
  // ── Primaria ────────────────────────────────────────────────────────────
  q('mq-01', 'primaria', '🔧',
    T("¿Qué hace una máquina simple?", "What does a simple machine do?", "Què fa una màquina simple?"),
    O(["Cambia el tamaño o la dirección de una fuerza para que cueste menos hacer un trabajo", "Fabrica energía de la nada", "Funciona siempre con un motor eléctrico", "Hace que los objetos pesen menos"],
      ["It changes the size or direction of a force so a job takes less effort", "It creates energy out of nothing", "It always runs on an electric motor", "It makes objects weigh less"],
      ["Canvia la mida o la direcció d’una força perquè costi menys fer una feina", "Fabrica energia del no-res", "Funciona sempre amb un motor elèctric", "Fa que els objectes pesin menys"]),
    T("Una palanca, una rampa o una polea no crean energía ni quitan peso: reparten el esfuerzo de otra manera, por ejemplo empujando con menos fuerza durante más recorrido.",
      "A lever, a ramp or a pulley do not create energy or remove weight: they share out the effort differently, for example pushing with less force over a longer distance.",
      "Una palanca, una rampa o una politja no creen energia ni treuen pes: reparteixen l’esforç d’una altra manera, per exemple empenyent amb menys força durant més recorregut.")),

  q('mq-02', 'primaria', '⚖️',
    T("¿Cuáles son las tres partes de una palanca?", "What are the three parts of a lever?", "Quines són les tres parts d’una palanca?"),
    O(["Punto de apoyo, potencia y resistencia", "Rueda, eje y cuerda", "Motor, cable y freno", "Base, tornillo y tuerca"],
      ["Fulcrum, effort and load", "Wheel, axle and rope", "Motor, cable and brake", "Base, screw and nut"],
      ["Punt de suport, potència i resistència", "Roda, eix i corda", "Motor, cable i fre", "Base, cargol i femella"]),
    T("La palanca es una barra que gira sobre un punto de apoyo (fulcro). La potencia es la fuerza que hacemos y la resistencia, el peso que queremos mover.",
      "A lever is a bar that turns on a fulcrum. The effort is the force we apply and the load is the weight we want to move.",
      "La palanca és una barra que gira sobre un punt de suport (fulcre). La potència és la força que fem i la resistència, el pes que volem moure.")),

  q('mq-03', 'primaria', '✂️',
    T("¿Qué máquina simple son unas tijeras?", "What simple machine is a pair of scissors?", "Quina màquina simple són unes tisores?"),
    O(["Dos palancas unidas por un punto de apoyo", "Una polea", "Un plano inclinado", "Una rueda con eje"],
      ["Two levers joined at a fulcrum", "A pulley", "An inclined plane", "A wheel and axle"],
      ["Dues palanques unides per un punt de suport", "Una politja", "Un pla inclinat", "Una roda amb eix"]),
    T("El tornillo que une las dos hojas es el punto de apoyo. Por eso se corta mejor lo grueso cerca del tornillo: ahí la resistencia está más cerca del apoyo.",
      "The screw joining the two blades is the fulcrum. That is why thick things cut more easily close to the screw: the load is nearer the fulcrum there.",
      "El cargol que uneix les dues fulles és el punt de suport. Per això es talla millor el que és gruixut a prop del cargol: allà la resistència és més a prop del suport.")),

  q('mq-04', 'primaria', '📐',
    T("¿Para qué sirve una rampa (plano inclinado)?", "What is a ramp (inclined plane) for?", "Per a què serveix una rampa (pla inclinat)?"),
    O(["Para subir una carga con menos fuerza, a cambio de recorrer más distancia", "Para subir una carga con menos fuerza y menos distancia", "Para que la carga pese menos", "Solo para bajar cosas"],
      ["To raise a load with less force, in exchange for moving it further", "To raise a load with less force and less distance", "To make the load lighter", "Only for bringing things down"],
      ["Per pujar una càrrega amb menys força, a canvi de recórrer més distància", "Per pujar una càrrega amb menys força i menys distància", "Perquè la càrrega pesi menys", "Només per baixar coses"]),
    T("Cuanto más larga y suave es la rampa, menos fuerza hace falta, pero más camino hay que recorrer. Lo que se gana en fuerza se paga en distancia.",
      "The longer and gentler the ramp, the less force you need, but the further you have to go. What you gain in force you pay for in distance.",
      "Com més llarga i suau és la rampa, menys força cal, però més camí s’ha de recórrer. El que es guanya en força es paga en distància.")),

  q('mq-05', 'primaria', '🏳️',
    T("En lo alto de un mástil hay una polea fija para izar la bandera. ¿Qué ventaja da?", "There is a fixed pulley at the top of a flagpole to raise the flag. What is its advantage?", "Al capdamunt d’un pal hi ha una politja fixa per hissar la bandera. Quin avantatge dona?"),
    O(["Cambia la dirección: tiras hacia abajo y la bandera sube", "Reduce el peso de la bandera a la mitad", "Hace que la bandera suba sola", "Ninguna: es solo decorativa"],
      ["It changes direction: you pull down and the flag goes up", "It halves the weight of the flag", "It makes the flag rise on its own", "None: it is just decoration"],
      ["Canvia la direcció: estires cap avall i la bandera puja", "Redueix el pes de la bandera a la meitat", "Fa que la bandera pugi sola", "Cap: és només decorativa"]),
    T("Una polea fija no reduce la fuerza, pero permite tirar en la dirección más cómoda. Para reducir la fuerza hace falta una polea móvil.",
      "A fixed pulley does not reduce the force, but lets you pull in the most comfortable direction. To reduce the force you need a movable pulley.",
      "Una politja fixa no redueix la força, però permet estirar en la direcció més còmoda. Per reduir la força cal una politja mòbil.")),

  q('mq-06', 'primaria', '🔩',
    T("¿Qué es, en realidad, un tornillo?", "What is a screw, really?", "Què és, en realitat, un cargol?"),
    O(["Un plano inclinado enrollado alrededor de un cilindro", "Una palanca muy corta", "Una polea con dientes", "Una rueda sin eje"],
      ["An inclined plane wrapped around a cylinder", "A very short lever", "A pulley with teeth", "A wheel without an axle"],
      ["Un pla inclinat enrotllat al voltant d’un cilindre", "Una palanca molt curta", "Una politja amb dents", "Una roda sense eix"]),
    T("La rosca es una rampa en espiral: con muchas vueltas de poca fuerza el tornillo avanza poco a poco y aprieta mucho.",
      "The thread is a spiral ramp: with many low-force turns the screw moves forward little by little and grips very tightly.",
      "La rosca és una rampa en espiral: amb moltes voltes de poca força el cargol avança a poc a poc i estreny molt.")),

  q('mq-07', 'primaria', '🔪',
    T("El filo de un hacha o de un cuchillo es una…", "The blade of an axe or a knife is a…", "El tall d’una destral o d’un ganivet és una…"),
    O(["Cuña: dos planos inclinados unidos que separan el material", "Polea", "Palanca de primer grado", "Rueda"],
      ["Wedge: two inclined planes joined together that split the material", "Pulley", "First-class lever", "Wheel"],
      ["Falca: dos plans inclinats units que separen el material", "Politja", "Palanca de primer grau", "Roda"]),
    T("La cuña convierte el golpe hacia abajo en dos empujes hacia los lados. Cuanto más fino es el filo, más fácil es separar.",
      "The wedge turns a downward blow into two sideways pushes. The thinner the edge, the easier it splits.",
      "La falca converteix el cop cap avall en dues empentes cap als costats. Com més fi és el tall, més fàcil és separar.")),

  q('mq-08', 'primaria', '🎠',
    T("En un balancín, el apoyo está en el centro. ¿Qué tipo de palanca es?", "On a seesaw, the fulcrum is in the middle. What kind of lever is it?", "En un balancí, el suport és al centre. Quin tipus de palanca és?"),
    O(["De primer grado: el apoyo está entre la potencia y la resistencia", "De segundo grado: la resistencia está en medio", "De tercer grado: la potencia está en medio", "No es una palanca"],
      ["First class: the fulcrum is between the effort and the load", "Second class: the load is in the middle", "Third class: the effort is in the middle", "It is not a lever"],
      ["De primer grau: el suport és entre la potència i la resistència", "De segon grau: la resistència és al mig", "De tercer grau: la potència és al mig", "No és una palanca"]),
    T("El grado lo decide lo que queda en medio. Apoyo en medio: primer grado (balancín, tijeras, alicates).",
      "The class depends on what sits in the middle. Fulcrum in the middle: first class (seesaw, scissors, pliers).",
      "El grau el decideix el que queda al mig. Suport al mig: primer grau (balancí, tisores, alicates).")),

  q('mq-09', 'primaria', '🛒',
    T("En una carretilla, la rueda es el apoyo, la carga va en medio y tú levantas por los mangos. ¿Qué palanca es?", "In a wheelbarrow, the wheel is the fulcrum, the load sits in the middle and you lift by the handles. What lever is it?", "En una carretilla, la roda és el suport, la càrrega va al mig i tu aixeques pels mànecs. Quina palanca és?"),
    O(["De segundo grado", "De primer grado", "De tercer grado", "Un plano inclinado"],
      ["Second class", "First class", "Third class", "An inclined plane"],
      ["De segon grau", "De primer grau", "De tercer grau", "Un pla inclinat"]),
    T("Con la resistencia en medio, el brazo de la potencia siempre es más largo que el de la resistencia: por eso la carretilla ayuda a levantar mucho peso. Igual que el cascanueces.",
      "With the load in the middle, the effort arm is always longer than the load arm: that is why a wheelbarrow helps lift heavy loads. The same goes for a nutcracker.",
      "Amb la resistència al mig, el braç de la potència sempre és més llarg que el de la resistència: per això la carretilla ajuda a aixecar molt de pes. Igual que el trencanous.")),

  q('mq-10', 'primaria', '🎣',
    T("En unas pinzas de cocina la fuerza se hace en medio. ¿Qué palanca son?", "With kitchen tongs, the force is applied in the middle. What lever are they?", "En unes pinces de cuina la força es fa al mig. Quina palanca són?"),
    O(["De tercer grado", "De primer grado", "De segundo grado", "Una cuña"],
      ["Third class", "First class", "Second class", "A wedge"],
      ["De tercer grau", "De primer grau", "De segon grau", "Una falca"]),
    T("Con la potencia en medio hay que hacer MÁS fuerza que la resistencia, pero se gana precisión y movimiento en la punta. Así funcionan las pinzas, la caña de pescar o tu antebrazo.",
      "With the effort in the middle you need MORE force than the load, but you gain precision and movement at the tip. Tongs, a fishing rod and your forearm work like this.",
      "Amb la potència al mig cal fer MÉS força que la resistència, però es guanya precisió i moviment a la punta. Així funcionen les pinces, la canya de pescar o el teu avantbraç.")),

  q('mq-11', 'primaria', '💪',
    T("Quieres mover una roca con una barra y una piedra de apoyo. ¿Dónde pones el apoyo para hacer menos fuerza?", "You want to move a rock with a bar and a stone as fulcrum. Where do you put the fulcrum to use less force?", "Vols moure una roca amb una barra i una pedra de suport. On poses el suport per fer menys força?"),
    O(["Muy cerca de la roca", "Muy cerca de tus manos", "Justo en medio de la barra", "Da igual dónde"],
      ["Very close to the rock", "Very close to your hands", "Right in the middle of the bar", "It makes no difference"],
      ["Molt a prop de la roca", "Molt a prop de les teves mans", "Just al mig de la barra", "Tant és on"]),
    T("Cuanto más largo es tu brazo de palanca comparado con el de la roca, menos fuerza necesitas. Con el apoyo pegado a la roca, tu lado es mucho más largo.",
      "The longer your lever arm compared with the rock’s, the less force you need. With the fulcrum right next to the rock, your side is much longer.",
      "Com més llarg és el teu braç de palanca comparat amb el de la roca, menys força necessites. Amb el suport enganxat a la roca, el teu costat és molt més llarg.")),

  q('mq-12', 'primaria', '⚙️',
    T("Dos engranajes están encajados. Si el primero gira a la derecha, ¿cómo gira el segundo?", "Two gears are meshed. If the first turns clockwise, how does the second turn?", "Dos engranatges estan encaixats. Si el primer gira cap a la dreta, com gira el segon?"),
    O(["Hacia la izquierda, en sentido contrario", "También hacia la derecha", "No gira", "Depende del color"],
      ["Anticlockwise, the opposite way", "Clockwise as well", "It does not turn", "It depends on the colour"],
      ["Cap a l’esquerra, en sentit contrari", "També cap a la dreta", "No gira", "Depèn del color"]),
    T("Los dientes empujan en el punto de contacto, así que cada rueda dentada invierte el giro. Con tres en fila, la tercera vuelve a girar como la primera.",
      "The teeth push at the point of contact, so each gear reverses the turn. With three in a row, the third turns the same way as the first again.",
      "Les dents empenyen al punt de contacte, així que cada roda dentada inverteix el gir. Amb tres en fila, la tercera torna a girar com la primera.")),

  q('mq-13', 'primaria', '🚲',
    T("En una bicicleta, ¿cómo llega el movimiento de los pedales a la rueda de atrás?", "On a bicycle, how does the movement of the pedals reach the back wheel?", "En una bicicleta, com arriba el moviment dels pedals a la roda del darrere?"),
    O(["Con una cadena que une el plato y el piñón", "Con una correa de goma que une las dos ruedas", "Con una palanca de segundo grado", "Con un plano inclinado"],
      ["Through a chain linking the chainring and the sprocket", "Through a rubber belt linking both wheels", "Through a second-class lever", "Through an inclined plane"],
      ["Amb una cadena que uneix el plat i el pinyó", "Amb una corretja de goma que uneix les dues rodes", "Amb una palanca de segon grau", "Amb un pla inclinat"]),
    T("Es una transmisión por cadena: dos ruedas dentadas separadas que giran en el mismo sentido. Cambiar de marcha es cambiar el tamaño de plato o piñón.",
      "It is a chain drive: two separate toothed wheels that turn the same way. Changing gear means changing the size of the chainring or sprocket.",
      "És una transmissió per cadena: dues rodes dentades separades que giren en el mateix sentit. Canviar de marxa és canviar la mida del plat o del pinyó.")),

  q('mq-14', 'primaria', '🚪',
    T("El pomo de una puerta o un destornillador son ejemplos de…", "A door knob or a screwdriver are examples of…", "El pom d’una porta o un tornavís són exemples de…"),
    O(["Rueda y eje: girar la parte ancha con poca fuerza mueve con fuerza la estrecha", "Polea móvil", "Cuña", "Palanca de tercer grado"],
      ["Wheel and axle: turning the wide part with little force turns the narrow part strongly", "A movable pulley", "A wedge", "A third-class lever"],
      ["Roda i eix: girar la part ampla amb poca força mou amb força la part estreta", "Politja mòbil", "Falca", "Palanca de tercer grau"]),
    T("El mango ancho del destornillador hace de rueda y la punta, de eje. Por eso cuesta tanto abrir una puerta a la que le falta el pomo.",
      "The wide handle of the screwdriver is the wheel and the tip is the axle. That is why a door with its knob missing is so hard to open.",
      "El mànec ample del tornavís fa de roda i la punta, d’eix. Per això costa tant obrir una porta a la qual falta el pom.")),

  // ── ESO ─────────────────────────────────────────────────────────────────
  q('mq-15', 'eso', '🧮',
    T("Una palanca levanta una carga de 600 N situada a 0,5 m del apoyo. Si empujas a 2 m del apoyo, ¿qué fuerza necesitas?", "A lever lifts a 600 N load placed 0.5 m from the fulcrum. If you push 2 m from the fulcrum, what force do you need?", "Una palanca aixeca una càrrega de 600 N situada a 0,5 m del suport. Si empenys a 2 m del suport, quina força necessites?"),
    N('150 N', '300 N', '1200 N', '2400 N'),
    T("Ley de la palanca: F · dF = R · dR. F · 2 = 600 · 0,5 = 300, así que F = 150 N. Con un brazo cuatro veces más largo, la fuerza es cuatro veces menor.",
      "Law of the lever: F · dF = R · dR. F · 2 = 600 · 0.5 = 300, so F = 150 N. With an arm four times longer, the force is four times smaller.",
      "Llei de la palanca: F · dF = R · dR. F · 2 = 600 · 0,5 = 300, així que F = 150 N. Amb un braç quatre vegades més llarg, la força és quatre vegades més petita.")),

  q('mq-16', 'eso', '🏋️',
    T("Una polea móvil sostiene un peso de 400 N. Sin contar rozamientos, ¿con qué fuerza hay que tirar?", "A movable pulley holds a 400 N weight. Ignoring friction, how hard do you have to pull?", "Una politja mòbil sosté un pes de 400 N. Sense comptar fregaments, amb quina força cal estirar?"),
    N('200 N', '400 N', '100 N', '800 N'),
    T("En la polea móvil el peso cuelga de dos tramos de cuerda y cada uno aguanta la mitad: F = P / 2 = 200 N. A cambio, hay que recoger el doble de cuerda.",
      "In a movable pulley the weight hangs from two sections of rope and each holds half: F = W / 2 = 200 N. In exchange, you have to pull in twice as much rope.",
      "A la politja mòbil el pes penja de dos trams de corda i cadascun n’aguanta la meitat: F = P / 2 = 200 N. A canvi, cal recollir el doble de corda.")),

  q('mq-17', 'eso', '🏗️',
    T("Un polipasto reparte un peso de 800 N entre 4 tramos de cuerda. ¿Qué fuerza hay que hacer (sin rozamiento)?", "A block and tackle shares an 800 N weight between 4 sections of rope. What force is needed (ignoring friction)?", "Un polispast reparteix un pes de 800 N entre 4 trams de corda. Quina força cal fer (sense fregament)?"),
    N('200 N', '400 N', '800 N', '3200 N'),
    T("En un polipasto la fuerza es el peso dividido entre los tramos que lo sostienen: 800 / 4 = 200 N. Por eso las grúas tienen tantas vueltas de cable.",
      "In a block and tackle the force is the weight divided by the sections holding it up: 800 / 4 = 200 N. That is why cranes have so many turns of cable.",
      "En un polispast la força és el pes dividit entre els trams que el sostenen: 800 / 4 = 200 N. Per això les grues tenen tantes voltes de cable.")),

  q('mq-18', 'eso', '⚙️',
    T("Un engranaje motor de 10 dientes gira a 200 rpm y mueve otro de 40 dientes. ¿A qué velocidad gira el segundo?", "A 10-tooth driver gear turns at 200 rpm and drives a 40-tooth gear. How fast does the second one turn?", "Un engranatge motor de 10 dents gira a 200 rpm i en mou un altre de 40 dents. A quina velocitat gira el segon?"),
    N('50 rpm', '800 rpm', '200 rpm', '20 rpm'),
    T("Se cumple n1 · z1 = n2 · z2: 200 · 10 = n2 · 40, n2 = 50 rpm. Rueda grande movida por una pequeña: sistema reductor, más lento pero con más fuerza.",
      "n1 · z1 = n2 · z2: 200 · 10 = n2 · 40, so n2 = 50 rpm. A big gear driven by a small one is a reduction system: slower but with more force.",
      "Es compleix n1 · z1 = n2 · z2: 200 · 10 = n2 · 40, n2 = 50 rpm. Roda gran moguda per una de petita: sistema reductor, més lent però amb més força.")),

  q('mq-19', 'eso', '🔄',
    T("Una polea de 20 cm de diámetro gira a 300 rpm y, con una correa, mueve otra de 60 cm. ¿A cuántas rpm gira la grande?", "A 20 cm diameter pulley turns at 300 rpm and, with a belt, drives a 60 cm one. How many rpm does the big one turn at?", "Una politja de 20 cm de diàmetre gira a 300 rpm i, amb una corretja, en mou una altra de 60 cm. A quantes rpm gira la gran?"),
    N('100 rpm', '900 rpm', '300 rpm', '60 rpm'),
    T("Con correa se cumple n1 · d1 = n2 · d2: 300 · 20 = n2 · 60, así que n2 = 100 rpm. La polea tres veces más grande va tres veces más despacio.",
      "With a belt, n1 · d1 = n2 · d2: 300 · 20 = n2 · 60, so n2 = 100 rpm. The pulley three times bigger turns three times more slowly.",
      "Amb corretja es compleix n1 · d1 = n2 · d2: 300 · 20 = n2 · 60, així que n2 = 100 rpm. La politja tres vegades més gran va tres vegades més a poc a poc.")),

  q('mq-20', 'eso', '⚡',
    T("¿Ahorra trabajo una máquina simple?", "Does a simple machine save work?", "Estalvia treball una màquina simple?"),
    O(["No: lo que se gana en fuerza se pierde en distancia, y el trabajo es el mismo (o algo más, por el rozamiento)", "Sí: reduce el trabajo a la mitad", "Sí, si es una palanca de primer grado", "Solo si no hay rozamiento"],
      ["No: what is gained in force is lost in distance, and the work is the same (or a bit more, because of friction)", "Yes: it halves the work", "Yes, if it is a first-class lever", "Only if there is no friction"],
      ["No: el que es guanya en força es perd en distància, i el treball és el mateix (o una mica més, pel fregament)", "Sí: redueix el treball a la meitat", "Sí, si és una palanca de primer grau", "Només si no hi ha fregament"]),
    T("Trabajo = fuerza × distancia. Si la polea móvil divide la fuerza entre dos, la cuerda recorre el doble. La máquina hace el trabajo más cómodo, no más pequeño.",
      "Work = force × distance. If a movable pulley halves the force, the rope travels twice as far. The machine makes the work easier, not smaller.",
      "Treball = força × distància. Si la politja mòbil divideix la força entre dos, la corda recorre el doble. La màquina fa el treball més còmode, no més petit.")),

  q('mq-21', 'eso', '🚂',
    T("¿Qué hace el mecanismo biela-manivela?", "What does a crank and connecting rod mechanism do?", "Què fa el mecanisme biela-manovella?"),
    O(["Transforma un giro en un movimiento de vaivén en línea recta, y al revés", "Cambia el sentido de giro de dos ruedas", "Reduce el peso de una carga", "Une dos ejes con una correa"],
      ["It turns rotation into a back-and-forth straight-line motion, and vice versa", "It reverses the direction of two wheels", "It reduces the weight of a load", "It joins two shafts with a belt"],
      ["Transforma un gir en un moviment de vaivé en línia recta, i a l’inrevés", "Canvia el sentit de gir de dues rodes", "Redueix el pes d’una càrrega", "Uneix dos eixos amb una corretja"]),
    T("En un motor de coche el pistón sube y baja, y la biela y el cigüeñal lo convierten en giro. Las locomotoras de vapor lo llevaban a la vista en las ruedas.",
      "In a car engine the piston goes up and down, and the connecting rod and crankshaft turn that into rotation. Steam locomotives had it on show on their wheels.",
      "En un motor de cotxe el pistó puja i baixa, i la biela i el cigonyal el converteixen en gir. Les locomotores de vapor el duien a la vista a les rodes.")),

  q('mq-22', 'eso', '🦷',
    T("Un piñón que gira engrana con una barra dentada recta (cremallera). ¿Qué consigue?", "A turning pinion meshes with a straight toothed bar (rack). What does it achieve?", "Un pinyó que gira engrana amb una barra dentada recta (cremallera). Què aconsegueix?"),
    O(["Convertir el giro en un desplazamiento en línea recta", "Multiplicar la velocidad de giro", "Invertir el sentido de giro de otro piñón", "Convertir un vaivén en giro continuo sin dientes"],
      ["Turning rotation into straight-line movement", "Multiplying the speed of rotation", "Reversing the turn of another pinion", "Turning back-and-forth motion into continuous rotation without teeth"],
      ["Convertir el gir en un desplaçament en línia recta", "Multiplicar la velocitat de gir", "Invertir el sentit de gir d’un altre pinyó", "Convertir un vaivé en gir continu sense dents"]),
    T("Es el mecanismo de la dirección de muchos coches (giras el volante y las ruedas se desplazan) y de algunas puertas correderas y trenes de cremallera.",
      "It is the steering mechanism of many cars (you turn the wheel and the wheels shift sideways) and is used in some sliding doors and rack railways.",
      "És el mecanisme de la direcció de molts cotxes (gires el volant i les rodes es desplacen) i d’algunes portes corredisses i trens de cremallera.")),

  q('mq-23', 'eso', '🥚',
    T("¿Para qué sirve una leva?", "What is a cam for?", "Per a què serveix una lleva?"),
    O(["Al girar, empuja una pieza (seguidor) que sube y baja a ritmo", "Para unir dos poleas lejanas", "Para levantar pesos con una cuerda", "Para frenar una rueda"],
      ["As it turns, it pushes a part (the follower) that rises and falls in rhythm", "To link two distant pulleys", "To lift weights with a rope", "To brake a wheel"],
      ["En girar, empeny una peça (seguidor) que puja i baixa a ritme", "Per unir dues politges llunyanes", "Per aixecar pesos amb una corda", "Per frenar una roda"]),
    T("La leva es una rueda con forma irregular (de huevo, por ejemplo). En el motor, el árbol de levas abre y cierra las válvulas en el momento justo.",
      "A cam is an irregularly shaped wheel (egg-shaped, for example). In an engine, the camshaft opens and closes the valves at just the right moment.",
      "La lleva és una roda de forma irregular (d’ou, per exemple). Al motor, l’arbre de lleves obre i tanca les vàlvules en el moment just.")),

  q('mq-24', 'eso', '🐌',
    T("Un tornillo sinfín mueve una rueda dentada (corona) de 30 dientes. ¿Cuántas vueltas da el sinfín para que la corona dé una?", "A worm gear drives a 30-tooth wheel. How many turns does the worm make for the wheel to turn once?", "Un cargol sens fi mou una roda dentada (corona) de 30 dents. Quantes voltes fa el sens fi perquè la corona en faci una?"),
    N('30', '1', '15', '3'),
    T("Cada vuelta del sinfín avanza un solo diente de la corona, así que hacen falta 30 vueltas. Es un reductor enorme en poco espacio: clavijas de guitarra, puertas de garaje.",
      "Each turn of the worm moves the wheel on by just one tooth, so it takes 30 turns. It is a huge reduction in a small space: guitar tuning pegs, garage doors.",
      "Cada volta del sens fi avança una sola dent de la corona, així que calen 30 voltes. És un reductor enorme en poc espai: clavilles de guitarra, portes de garatge.")),
]

// Convención de src/data: el nivel bajo se filtra y el alto usa el banco
// ENTERO (ver memoria «bancos-examen»).
export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
export const PREGUNTAS_ESO = PREGUNTAS
