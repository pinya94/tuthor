// El movimiento (cinemática) — Física y Química, 2.º-4.º de ESO y 1.º de
// Bachillerato. Trayectoria, distancia y desplazamiento, velocidad media,
// MRU y MRUA (ecuaciones y gráficas x-t y v-t), caída libre y movimiento
// circular uniforme.
//
// Las cuentas están comprobadas y salen exactas; en caída libre se dice
// siempre el valor de g que se usa.
//
// La respuesta buena va siempre la PRIMERA en `opciones`: ExamenMC baraja el
// orden al servir cada pregunta (lib/ordenOpciones.js).
function q(id, nivel, emoji, pregunta, opciones, explicacion) {
  const correcta = { es: opciones.es[0], en: opciones.en[0], ca: opciones.ca[0] }
  return { id, nivel, emoji, pregunta, opciones, correcta, explicacion }
}
const T = (es, en, ca) => ({ es, en, ca })
const O = (es, en, ca) => ({ es, en, ca })
const N = (...xs) => ({ es: xs, en: xs, ca: xs })

export const PREGUNTAS = [
  // ── ESO ─────────────────────────────────────────────────────────────────
  q('mv-01', 'eso', '🛤️',
    T('¿Qué es la trayectoria de un móvil?', 'What is the path (trajectory) of a moving object?', 'Què és la trajectòria d’un mòbil?'),
    O(['La línea que dibuja al moverse', 'La distancia en línea recta entre la salida y la llegada', 'La velocidad que lleva', 'El tiempo que tarda'],
      ['The line it traces as it moves', 'The straight-line distance between start and finish', 'The speed it has', 'The time it takes'],
      ['La línia que dibuixa en moure’s', 'La distància en línia recta entre la sortida i l’arribada', 'La velocitat que porta', 'El temps que triga']),
    T('La trayectoria es el camino que sigue el móvil, recto o curvo. La distancia en línea recta entre el principio y el final es otra cosa: el desplazamiento.',
      'The path is the route the object follows, straight or curved. The straight-line distance between start and end is something else: the displacement.',
      'La trajectòria és el camí que segueix el mòbil, recte o corb. La distància en línia recta entre el principi i el final és una altra cosa: el desplaçament.')),

  q('mv-02', 'eso', '🔁',
    T('Corres 100 m hasta una pared y vuelves al punto de salida. ¿Qué distancia has recorrido y cuál es tu desplazamiento?', 'You run 100 m to a wall and come back to the start. What distance have you covered and what is your displacement?', 'Corres 100 m fins a una paret i tornes al punt de sortida. Quina distància has recorregut i quin és el teu desplaçament?'),
    O(['Distancia 200 m; desplazamiento 0 m', 'Distancia 100 m; desplazamiento 100 m', 'Distancia 200 m; desplazamiento 200 m', 'Distancia 0 m; desplazamiento 200 m'],
      ['Distance 200 m; displacement 0 m', 'Distance 100 m; displacement 100 m', 'Distance 200 m; displacement 200 m', 'Distance 0 m; displacement 200 m'],
      ['Distància 200 m; desplaçament 0 m', 'Distància 100 m; desplaçament 100 m', 'Distància 200 m; desplaçament 200 m', 'Distància 0 m; desplaçament 200 m']),
    T('La distancia recorrida suma todo el camino (100 + 100). El desplazamiento solo mira dónde acabas respecto a dónde empezaste: en el mismo sitio, así que es cero.',
      'Distance adds up the whole route (100 + 100). Displacement only looks at where you end up compared with where you started: the same place, so it is zero.',
      'La distància recorreguda suma tot el camí (100 + 100). El desplaçament només mira on acabes respecte d’on vas començar: al mateix lloc, així que és zero.')),

  q('mv-03', 'eso', '🚗',
    T('Un coche recorre 120 km en 2 horas. ¿Cuál es su velocidad media?', 'A car covers 120 km in 2 hours. What is its average speed?', 'Un cotxe recorre 120 km en 2 hores. Quina és la seva velocitat mitjana?'),
    N('60 km/h', '240 km/h', '120 km/h', '30 km/h'),
    T('Velocidad media = distancia ÷ tiempo = 120 km ÷ 2 h = 60 km/h.', 'Average speed = distance ÷ time = 120 km ÷ 2 h = 60 km/h.', 'Velocitat mitjana = distància ÷ temps = 120 km ÷ 2 h = 60 km/h.')),

  q('mv-04', 'eso', '🔄',
    T('¿Cuántos m/s son 36 km/h?', 'How many m/s is 36 km/h?', 'Quants m/s són 36 km/h?'),
    N('10 m/s', '36 m/s', '129,6 m/s', '3,6 m/s'),
    T('Para pasar de km/h a m/s se divide entre 3,6 (1 km = 1000 m y 1 h = 3600 s): 36 ÷ 3,6 = 10 m/s.', 'To go from km/h to m/s divide by 3.6 (1 km = 1000 m and 1 h = 3600 s): 36 ÷ 3.6 = 10 m/s.', 'Per passar de km/h a m/s es divideix entre 3,6 (1 km = 1000 m i 1 h = 3600 s): 36 ÷ 3,6 = 10 m/s.')),

  q('mv-05', 'eso', '➡️',
    T('¿Qué caracteriza a un movimiento rectilíneo uniforme (MRU)?', 'What characterises uniform linear motion?', 'Què caracteritza un moviment rectilini uniforme (MRU)?'),
    O(['Trayectoria recta y velocidad constante', 'Trayectoria recta y velocidad que aumenta siempre lo mismo', 'Trayectoria circular y velocidad constante', 'Cualquier trayectoria con el móvil parado'],
      ['A straight path and constant velocity', 'A straight path and velocity that always increases by the same amount', 'A circular path and constant speed', 'Any path with the object at rest'],
      ['Trajectòria recta i velocitat constant', 'Trajectòria recta i velocitat que augmenta sempre el mateix', 'Trajectòria circular i velocitat constant', 'Qualsevol trajectòria amb el mòbil aturat']),
    T('En el MRU el móvil va en línea recta y recorre distancias iguales en tiempos iguales: su velocidad no cambia y la aceleración es cero.', 'In uniform linear motion the object moves in a straight line covering equal distances in equal times: its velocity does not change and the acceleration is zero.', 'En el MRU el mòbil va en línia recta i recorre distàncies iguals en temps iguals: la velocitat no canvia i l’acceleració és zero.')),

  q('mv-06', 'eso', '📈',
    T('En una gráfica posición-tiempo de un MRU, ¿qué indica la pendiente de la recta?', 'On a position-time graph of uniform motion, what does the slope of the line show?', 'En una gràfica posició-temps d’un MRU, què indica el pendent de la recta?'),
    O(['La velocidad', 'La aceleración', 'La distancia total', 'El tiempo de salida'],
      ['The velocity', 'The acceleration', 'The total distance', 'The starting time'],
      ['La velocitat', 'L’acceleració', 'La distància total', 'El temps de sortida']),
    T('La pendiente es lo que sube la posición por cada segundo: Δx ÷ Δt, que es justo la velocidad. Cuanto más empinada, más rápido.', 'The slope is how much the position rises each second: Δx ÷ Δt, which is exactly the velocity. The steeper it is, the faster.', 'El pendent és el que puja la posició per cada segon: Δx ÷ Δt, que és justament la velocitat. Com més costeruda, més ràpid.')),

  q('mv-07', 'eso', '⏸️',
    T('En una gráfica posición-tiempo, la línea es horizontal durante un tramo. ¿Qué hace el móvil?', 'On a position-time graph, the line is horizontal for a stretch. What is the object doing?', 'En una gràfica posició-temps, la línia és horitzontal durant un tram. Què fa el mòbil?'),
    O(['Está parado', 'Va a velocidad constante', 'Acelera', 'Va marcha atrás'],
      ['It is at rest', 'It moves at constant velocity', 'It is accelerating', 'It is going backwards'],
      ['Està aturat', 'Va a velocitat constant', 'Accelera', 'Va marxa enrere']),
    T('Si la posición no cambia mientras pasa el tiempo, el móvil está quieto: velocidad cero. Una línea horizontal en una gráfica velocidad-tiempo, en cambio, significaría velocidad constante.', 'If the position does not change as time passes, the object is still: zero velocity. A horizontal line on a velocity-time graph, by contrast, would mean constant velocity.', 'Si la posició no canvia mentre passa el temps, el mòbil és quiet: velocitat zero. Una línia horitzontal en una gràfica velocitat-temps, en canvi, voldria dir velocitat constant.')),

  q('mv-08', 'eso', '📉',
    T('En una gráfica velocidad-tiempo, la línea es horizontal a 5 m/s. ¿Qué movimiento es?', 'On a velocity-time graph, the line is horizontal at 5 m/s. What motion is it?', 'En una gràfica velocitat-temps, la línia és horitzontal a 5 m/s. Quin moviment és?'),
    O(['Un MRU a 5 m/s', 'Un móvil parado en la posición 5', 'Un MRUA con aceleración de 5 m/s²', 'Un móvil que frena'],
      ['Uniform motion at 5 m/s', 'An object at rest at position 5', 'Uniformly accelerated motion at 5 m/s²', 'An object slowing down'],
      ['Un MRU a 5 m/s', 'Un mòbil aturat a la posició 5', 'Un MRUA amb acceleració de 5 m/s²', 'Un mòbil que frena']),
    T('En la gráfica v-t la altura es la velocidad: si no cambia, la velocidad es constante (MRU). Ojo: no hay que confundirla con la gráfica x-t.', 'On a v-t graph the height is the velocity: if it does not change, velocity is constant (uniform motion). Careful not to confuse it with the x-t graph.', 'A la gràfica v-t l’altura és la velocitat: si no canvia, la velocitat és constant (MRU). Compte: no s’ha de confondre amb la gràfica x-t.')),

  q('mv-09', 'eso', '⚡',
    T('Una moto pasa de 0 a 20 m/s en 5 s. ¿Cuál es su aceleración?', 'A motorbike goes from 0 to 20 m/s in 5 s. What is its acceleration?', 'Una moto passa de 0 a 20 m/s en 5 s. Quina és la seva acceleració?'),
    N('4 m/s²', '100 m/s²', '20 m/s²', '0,25 m/s²'),
    T('Aceleración = cambio de velocidad ÷ tiempo = (20 − 0) ÷ 5 = 4 m/s²: gana 4 m/s cada segundo.', 'Acceleration = change in velocity ÷ time = (20 − 0) ÷ 5 = 4 m/s²: it gains 4 m/s every second.', 'Acceleració = canvi de velocitat ÷ temps = (20 − 0) ÷ 5 = 4 m/s²: guanya 4 m/s cada segon.')),

  q('mv-10', 'eso', '📏',
    T('¿En qué unidad del Sistema Internacional se mide la aceleración?', 'In which SI unit is acceleration measured?', 'En quina unitat del Sistema Internacional es mesura l’acceleració?'),
    N('m/s²', 'm/s', 'km/h', 'N'),
    T('La aceleración es cuánto cambia la velocidad (m/s) por cada segundo: (m/s)/s = m/s². El newton (N) es la unidad de fuerza.', 'Acceleration is how much the velocity (m/s) changes each second: (m/s)/s = m/s². The newton (N) is the unit of force.', 'L’acceleració és quant canvia la velocitat (m/s) per cada segon: (m/s)/s = m/s². El newton (N) és la unitat de força.')),

  q('mv-11', 'eso', '🚆',
    T('Vas sentado en un tren en marcha. ¿Estás en reposo o en movimiento?', 'You are sitting on a moving train. Are you at rest or moving?', 'Vas assegut en un tren en marxa. Estàs en repòs o en moviment?'),
    O(['Depende del sistema de referencia: en reposo respecto al tren y en movimiento respecto a la vía', 'En movimiento siempre', 'En reposo siempre', 'Ni una cosa ni otra: el tren es el que se mueve'],
      ['It depends on the frame of reference: at rest relative to the train, moving relative to the track', 'Always moving', 'Always at rest', 'Neither: only the train moves'],
      ['Depèn del sistema de referència: en repòs respecte del tren i en moviment respecte de la via', 'En moviment sempre', 'En repòs sempre', 'Ni una cosa ni l’altra: el tren és el que es mou']),
    T('El movimiento es relativo: hay que decir respecto a qué se mide. Para tu compañero de asiento no te mueves; para alguien en el andén, vas a la velocidad del tren.', 'Motion is relative: you have to say what it is measured against. To the person next to you, you are not moving; to someone on the platform, you are going at the train’s speed.', 'El moviment és relatiu: cal dir respecte de què es mesura. Per al teu company de seient no et mous; per a algú a l’andana, vas a la velocitat del tren.')),

  q('mv-12', 'eso', '🧮',
    T('Un móvil en MRU sale de x₀ = 5 m con v = 3 m/s. ¿Dónde está a los 4 s?', 'An object in uniform motion starts at x₀ = 5 m with v = 3 m/s. Where is it after 4 s?', 'Un mòbil en MRU surt de x₀ = 5 m amb v = 3 m/s. On és als 4 s?'),
    N('17 m', '12 m', '20 m', '8 m'),
    T('Ecuación del MRU: x = x₀ + v · t = 5 + 3 · 4 = 17 m. Si se olvida la posición inicial sale 12 m, que es lo que ha avanzado, no dónde está.', 'Uniform motion equation: x = x₀ + v · t = 5 + 3 · 4 = 17 m. Forgetting the starting position gives 12 m, which is how far it has moved, not where it is.', 'Equació del MRU: x = x₀ + v · t = 5 + 3 · 4 = 17 m. Si s’oblida la posició inicial surt 12 m, que és el que ha avançat, no on és.')),

  q('mv-13', 'eso', '🛑',
    T('Un coche frena hasta pararse. ¿Cómo es su aceleración?', 'A car brakes to a stop. What is its acceleration like?', 'Un cotxe frena fins a aturar-se. Com és la seva acceleració?'),
    O(['De sentido contrario a la velocidad (negativa si avanza en sentido positivo)', 'Cero, porque al final está parado', 'Del mismo sentido que la velocidad', 'Infinita en el momento de frenar'],
      ['Opposite to the velocity (negative if it is moving in the positive direction)', 'Zero, because it ends up stopped', 'In the same direction as the velocity', 'Infinite at the moment of braking'],
      ['De sentit contrari a la velocitat (negativa si avança en sentit positiu)', 'Zero, perquè al final està aturat', 'Del mateix sentit que la velocitat', 'Infinita en el moment de frenar']),
    T('Frenar también es acelerar: la velocidad cambia. Como baja, la aceleración apunta en sentido contrario al movimiento.', 'Braking is also accelerating: the velocity changes. Since it decreases, the acceleration points opposite to the motion.', 'Frenar també és accelerar: la velocitat canvia. Com que baixa, l’acceleració apunta en sentit contrari al moviment.')),

  q('mv-14', 'eso', '📐',
    T('En una gráfica velocidad-tiempo, ¿qué representa el área bajo la línea?', 'On a velocity-time graph, what does the area under the line represent?', 'En una gràfica velocitat-temps, què representa l’àrea sota la línia?'),
    O(['El desplazamiento', 'La aceleración', 'La velocidad media', 'El tiempo total'],
      ['The displacement', 'The acceleration', 'The average velocity', 'The total time'],
      ['El desplaçament', 'L’acceleració', 'La velocitat mitjana', 'El temps total']),
    T('Velocidad × tiempo = distancia: en la gráfica v-t, eso es el área entre la línea y el eje del tiempo. La pendiente de esa misma gráfica es la aceleración.', 'Velocity × time = distance: on a v-t graph that is the area between the line and the time axis. The slope of the same graph is the acceleration.', 'Velocitat × temps = distància: a la gràfica v-t, això és l’àrea entre la línia i l’eix del temps. El pendent d’aquesta mateixa gràfica és l’acceleració.')),

  // ── Bachillerato ────────────────────────────────────────────────────────
  q('mv-15', 'bachillerato', '🏎️',
    T('Un coche va a 10 m/s y acelera a 2 m/s² durante 5 s. ¿Qué velocidad alcanza?', 'A car travels at 10 m/s and accelerates at 2 m/s² for 5 s. What speed does it reach?', 'Un cotxe va a 10 m/s i accelera a 2 m/s² durant 5 s. Quina velocitat assoleix?'),
    N('20 m/s', '10 m/s', '12 m/s', '35 m/s'),
    T('MRUA: v = v₀ + a · t = 10 + 2 · 5 = 20 m/s.', 'Uniform acceleration: v = v₀ + a · t = 10 + 2 · 5 = 20 m/s.', 'MRUA: v = v₀ + a · t = 10 + 2 · 5 = 20 m/s.')),

  q('mv-16', 'bachillerato', '📏',
    T('Un móvil parte del reposo con a = 4 m/s². ¿Qué distancia recorre en 3 s?', 'An object starts from rest with a = 4 m/s². How far does it go in 3 s?', 'Un mòbil surt del repòs amb a = 4 m/s². Quina distància recorre en 3 s?'),
    N('18 m', '12 m', '36 m', '6 m'),
    T('x = v₀ · t + ½ · a · t² = 0 + ½ · 4 · 9 = 18 m. Si se olvida el ½ sale 36 m; si se multiplica a · t, 12 m (eso es la velocidad final).', 'x = v₀ · t + ½ · a · t² = 0 + ½ · 4 · 9 = 18 m. Forgetting the ½ gives 36 m; multiplying a · t gives 12 m (that is the final velocity).', 'x = v₀ · t + ½ · a · t² = 0 + ½ · 4 · 9 = 18 m. Si s’oblida el ½ surt 36 m; si es multiplica a · t, 12 m (això és la velocitat final).')),

  q('mv-17', 'bachillerato', '🧮',
    T('Un móvil parte del reposo con a = 2 m/s². ¿Qué velocidad lleva tras recorrer 25 m?', 'An object starts from rest with a = 2 m/s². What is its velocity after travelling 25 m?', 'Un mòbil surt del repòs amb a = 2 m/s². Quina velocitat porta després de recórrer 25 m?'),
    N('10 m/s', '50 m/s', '100 m/s', '5 m/s'),
    T('Sin el tiempo se usa v² = v₀² + 2 · a · Δx = 0 + 2 · 2 · 25 = 100, así que v = 10 m/s.', 'Without the time, use v² = v₀² + 2 · a · Δx = 0 + 2 · 2 · 25 = 100, so v = 10 m/s.', 'Sense el temps es fa servir v² = v₀² + 2 · a · Δx = 0 + 2 · 2 · 25 = 100, així que v = 10 m/s.')),

  q('mv-18', 'bachillerato', '⬇️',
    T('Se deja caer una piedra (g = 9,8 m/s², sin rozamiento). ¿Qué velocidad lleva a los 2 s?', 'A stone is dropped (g = 9.8 m/s², no air resistance). What is its velocity after 2 s?', 'Es deixa caure una pedra (g = 9,8 m/s², sense fregament). Quina velocitat porta als 2 s?'),
    N('19,6 m/s', '9,8 m/s', '39,2 m/s', '4,9 m/s'),
    T('La caída libre es un MRUA con a = g: v = g · t = 9,8 · 2 = 19,6 m/s.', 'Free fall is uniformly accelerated motion with a = g: v = g · t = 9.8 · 2 = 19.6 m/s.', 'La caiguda lliure és un MRUA amb a = g: v = g · t = 9,8 · 2 = 19,6 m/s.')),

  q('mv-19', 'bachillerato', '🔨',
    T('En el vacío se sueltan a la vez un martillo y una pluma desde la misma altura. ¿Cuál llega antes?', 'In a vacuum, a hammer and a feather are dropped together from the same height. Which lands first?', 'En el buit es deixen anar alhora un martell i una ploma des de la mateixa altura. Quin arriba abans?'),
    O(['Llegan a la vez', 'El martillo, porque pesa más', 'La pluma, porque es más ligera', 'Depende de la forma de cada uno'],
      ['They land together', 'The hammer, because it is heavier', 'The feather, because it is lighter', 'It depends on their shapes'],
      ['Arriben alhora', 'El martell, perquè pesa més', 'La ploma, perquè és més lleugera', 'Depèn de la forma de cadascun']),
    T('Sin aire, todos los cuerpos caen con la misma aceleración g, pesen lo que pesen. Lo comprobó un astronauta del Apolo 15 en la Luna. En la Tierra la pluma tarda más solo por el rozamiento con el aire.', 'Without air, all bodies fall with the same acceleration g, whatever they weigh. An Apollo 15 astronaut tested it on the Moon. On Earth the feather takes longer only because of air resistance.', 'Sense aire, tots els cossos cauen amb la mateixa acceleració g, pesin el que pesin. Ho va comprovar un astronauta de l’Apollo 15 a la Lluna. A la Terra la ploma triga més només pel fregament amb l’aire.')),

  q('mv-20', 'bachillerato', '⬆️',
    T('Se lanza una pelota hacia arriba. En el punto más alto, ¿qué velocidad y qué aceleración tiene?', 'A ball is thrown straight up. At the highest point, what are its velocity and acceleration?', 'Es llança una pilota cap amunt. Al punt més alt, quina velocitat i quina acceleració té?'),
    O(['Velocidad 0 y aceleración g hacia abajo', 'Velocidad 0 y aceleración 0', 'Velocidad máxima y aceleración 0', 'Velocidad g y aceleración 0'],
      ['Velocity 0 and acceleration g downwards', 'Velocity 0 and acceleration 0', 'Maximum velocity and acceleration 0', 'Velocity g and acceleration 0'],
      ['Velocitat 0 i acceleració g cap avall', 'Velocitat 0 i acceleració 0', 'Velocitat màxima i acceleració 0', 'Velocitat g i acceleració 0']),
    T('Arriba se para un instante (v = 0), pero la gravedad sigue tirando de ella: la aceleración sigue siendo g. Si fuera cero, se quedaría flotando allí.', 'At the top it stops for an instant (v = 0), but gravity keeps pulling: the acceleration is still g. If it were zero, the ball would stay hanging there.', 'A dalt s’atura un instant (v = 0), però la gravetat continua estirant-la: l’acceleració continua sent g. Si fos zero, es quedaria surant allà.')),

  q('mv-21', 'bachillerato', '⭕',
    T('Un coche toma una curva a velocidad constante de 50 km/h. ¿Tiene aceleración?', 'A car takes a bend at a steady 50 km/h. Does it have acceleration?', 'Un cotxe pren un revolt a velocitat constant de 50 km/h. Té acceleració?'),
    O(['Sí: la dirección de la velocidad cambia, así que hay aceleración centrípeta', 'No, porque la velocidad no cambia', 'Solo si frena', 'Solo si la curva es cuesta abajo'],
      ['Yes: the direction of the velocity changes, so there is centripetal acceleration', 'No, because the speed does not change', 'Only if it brakes', 'Only if the bend goes downhill'],
      ['Sí: la direcció de la velocitat canvia, així que hi ha acceleració centrípeta', 'No, perquè la velocitat no canvia', 'Només si frena', 'Només si el revolt és costa avall']),
    T('La velocidad es un vector: aunque el velocímetro marque lo mismo, en una curva cambia su dirección. Ese cambio es la aceleración centrípeta, que apunta hacia el centro de la curva.', 'Velocity is a vector: even if the speedometer reads the same, on a bend its direction changes. That change is the centripetal acceleration, pointing towards the centre of the bend.', 'La velocitat és un vector: encara que el velocímetre marqui el mateix, en un revolt en canvia la direcció. Aquest canvi és l’acceleració centrípeta, que apunta cap al centre del revolt.')),

  q('mv-22', 'bachillerato', '🎠',
    T('Un tiovivo da una vuelta cada 4 s. ¿Cuál es su frecuencia?', 'A merry-go-round makes one turn every 4 s. What is its frequency?', 'Uns cavallets fan una volta cada 4 s. Quina és la seva freqüència?'),
    N('0,25 Hz', '4 Hz', '0,5 Hz', '25 Hz'),
    T('La frecuencia es el número de vueltas por segundo, la inversa del periodo: f = 1 ÷ T = 1 ÷ 4 = 0,25 Hz.', 'Frequency is the number of turns per second, the inverse of the period: f = 1 ÷ T = 1 ÷ 4 = 0.25 Hz.', 'La freqüència és el nombre de voltes per segon, la inversa del període: f = 1 ÷ T = 1 ÷ 4 = 0,25 Hz.')),

  q('mv-23', 'bachillerato', '💿',
    T('Un disco da una vuelta cada 2 s. ¿Cuál es su velocidad angular?', 'A disc makes one turn every 2 s. What is its angular velocity?', 'Un disc fa una volta cada 2 s. Quina és la seva velocitat angular?'),
    N('π rad/s', '2π rad/s', '0,5 rad/s', '4π rad/s'),
    T('Una vuelta son 2π radianes: ω = 2π ÷ T = 2π ÷ 2 = π rad/s.', 'One turn is 2π radians: ω = 2π ÷ T = 2π ÷ 2 = π rad/s.', 'Una volta són 2π radians: ω = 2π ÷ T = 2π ÷ 2 = π rad/s.')),

  q('mv-24', 'bachillerato', '🏃',
    T('Un ciclista va 10 s a 6 m/s y luego 10 s a 2 m/s, en línea recta. ¿Cuál es su velocidad media?', 'A cyclist rides 10 s at 6 m/s then 10 s at 2 m/s, in a straight line. What is the average velocity?', 'Un ciclista va 10 s a 6 m/s i després 10 s a 2 m/s, en línia recta. Quina és la seva velocitat mitjana?'),
    N('4 m/s', '8 m/s', '3 m/s', '6 m/s'),
    T('Velocidad media = distancia total ÷ tiempo total = (60 + 20) ÷ 20 = 4 m/s. Aquí coincide con la media de 6 y 2 porque los dos tramos duran lo mismo; con tramos de distinta duración no coincidiría.', 'Average velocity = total distance ÷ total time = (60 + 20) ÷ 20 = 4 m/s. Here it matches the mean of 6 and 2 because both stretches last the same time; with stretches of different length it would not.', 'Velocitat mitjana = distància total ÷ temps total = (60 + 20) ÷ 20 = 4 m/s. Aquí coincideix amb la mitjana de 6 i 2 perquè els dos trams duren el mateix; amb trams de durada diferent no coincidiria.')),
]

// Convención de src/data: el nivel bajo se filtra y el alto usa el banco
// ENTERO (ver memoria «bancos-examen»).
export const PREGUNTAS_ESO = PREGUNTAS.filter(p => p.nivel === 'eso')
export const PREGUNTAS_BACH = PREGUNTAS
