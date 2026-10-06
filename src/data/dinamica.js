// Dinámica — Física y Química, 4.º de ESO y 1.º de Bachillerato. Las leyes
// de Newton, peso y masa, suma de fuerzas, rozamiento, plano inclinado,
// tensiones y sistemas de cuerpos, momento lineal e impulso, fuerza
// centrípeta y gravitación universal.
//
// Cada pregunta con números dice el valor de g que usa (10 m/s² casi
// siempre, para que las cuentas salgan exactas). Los distractores son los
// errores de siempre: seno por coseno, masa por peso, olvidar el rozamiento,
// la «fuerza centrífuga» o pensar que hace falta fuerza para seguir moviéndose.
//
// La respuesta buena va siempre la PRIMERA en `opciones`: ExamenMC baraja el
// orden al servir cada pregunta (lib/ordenOpciones.js).
function q(id, nivel, emoji, pregunta, opciones, explicacion) {
  const correcta = { es: opciones.es[0], en: opciones.en[0], ca: opciones.ca[0] }
  return { id, nivel, emoji, pregunta, opciones, correcta, explicacion }
}
const T = (es, en, ca) => ({ es, en, ca })
const O = (es, en, ca) => ({ es, en, ca })
// Opciones numéricas: iguales en los tres idiomas salvo la coma decimal.
const N = (...xs) => ({ es: xs, en: xs.map(x => x.replace(/(\d),(\d)/g, '$1.$2')), ca: xs })

export const PREGUNTAS = [
  // ── ESO ─────────────────────────────────────────────────────────────────
  q('di-01', 'eso', '🛰️',
    T('Una nave en el espacio, lejos de todo, apaga los motores. ¿Qué hace?', 'A spaceship in space, far from everything, switches off its engines. What does it do?', 'Una nau a l’espai, lluny de tot, apaga els motors. Què fa?'),
    O(['Sigue en línea recta a la misma velocidad', 'Va frenando poco a poco hasta pararse', 'Se para de golpe', 'Empieza a caer'],
      ['It carries on in a straight line at the same speed', 'It slows down little by little until it stops', 'It stops dead', 'It starts to fall'],
      ['Continua en línia recta a la mateixa velocitat', 'Va frenant de mica en mica fins a aturar-se', 'S’atura de cop', 'Comença a caure']),
    T('Primera ley de Newton (inercia): si la fuerza neta es cero, un cuerpo sigue en reposo o en movimiento rectilíneo uniforme. En la Tierra las cosas se paran porque hay rozamiento, no porque «se les acabe la fuerza».',
      'Newton’s first law (inertia): if the net force is zero, a body stays at rest or keeps moving in a straight line at constant speed. On Earth things stop because of friction, not because they "run out of force".',
      'Primera llei de Newton (inèrcia): si la força neta és zero, un cos continua en repòs o en moviment rectilini uniforme. A la Terra les coses s’aturen perquè hi ha fregament, no perquè «se’ls acabi la força».')),

  q('di-02', 'eso', '🛒',
    T('Empujas un carrito de 2 kg con una fuerza neta de 6 N. ¿Qué aceleración tiene?', 'You push a 2 kg trolley with a net force of 6 N. What is its acceleration?', 'Empenys un carretó de 2 kg amb una força neta de 6 N. Quina acceleració té?'),
    N('3 m/s²', '12 m/s²', '0,33 m/s²', '8 m/s²'),
    T('Segunda ley de Newton: F = m · a, así que a = F ÷ m = 6 ÷ 2 = 3 m/s². Multiplicar da 12; dividir al revés, 0,33.',
      'Newton’s second law: F = m · a, so a = F ÷ m = 6 ÷ 2 = 3 m/s². Multiplying gives 12; dividing the wrong way, 0.33.',
      'Segona llei de Newton: F = m · a, així que a = F ÷ m = 6 ÷ 2 = 3 m/s². Multiplicar dona 12; dividir al revés, 0,33.')),

  q('di-03', 'eso', '🧱',
    T('Empujas una pared con 50 N. ¿Con qué fuerza te empuja la pared a ti?', 'You push a wall with 50 N. With what force does the wall push you?', 'Empenys una paret amb 50 N. Amb quina força t’empeny la paret a tu?'),
    O(['50 N, en sentido contrario', '0 N: las paredes no empujan', 'Menos de 50 N, porque no se mueve', '100 N, el doble'],
      ['50 N, in the opposite direction', '0 N: walls do not push', 'Less than 50 N, because it does not move', '100 N, twice as much'],
      ['50 N, en sentit contrari', '0 N: les parets no empenyen', 'Menys de 50 N, perquè no es mou', '100 N, el doble']),
    T('Tercera ley de Newton (acción y reacción): si A empuja a B, B empuja a A con la misma fuerza y sentido contrario. Son dos fuerzas sobre cuerpos distintos, por eso no se anulan entre sí.',
      'Newton’s third law (action and reaction): if A pushes B, B pushes A with the same force in the opposite direction. They act on different bodies, which is why they do not cancel each other out.',
      'Tercera llei de Newton (acció i reacció): si A empeny B, B empeny A amb la mateixa força i sentit contrari. Són dues forces sobre cossos diferents, per això no s’anul·len entre si.')),

  q('di-04', 'eso', '🏋️',
    T('¿Cuánto pesa en la Tierra un objeto de 5 kg? (g = 9,8 m/s²)', 'What is the weight on Earth of a 5 kg object? (g = 9.8 m/s²)', 'Quant pesa a la Terra un objecte de 5 kg? (g = 9,8 m/s²)'),
    N('49 N', '5 N', '5 kg', '0,51 N'),
    T('El peso es una fuerza: P = m · g = 5 · 9,8 = 49 N. Los 5 kg son la masa, que se mide en kilogramos; el peso va en newtons.',
      'Weight is a force: W = m · g = 5 · 9.8 = 49 N. The 5 kg is the mass, measured in kilograms; weight is in newtons.',
      'El pes és una força: P = m · g = 5 · 9,8 = 49 N. Els 5 kg són la massa, que es mesura en quilograms; el pes va en newtons.')),

  q('di-05', 'eso', '🌙',
    T('Un astronauta tiene una masa de 60 kg en la Tierra. ¿Qué masa tiene en la Luna, donde la gravedad es unas seis veces menor?', 'An astronaut has a mass of 60 kg on Earth. What is their mass on the Moon, where gravity is about six times weaker?', 'Un astronauta té una massa de 60 kg a la Terra. Quina massa té a la Lluna, on la gravetat és unes sis vegades menor?'),
    N('60 kg', '10 kg', '360 kg', '0 kg'),
    T('La masa es la cantidad de materia y no cambia de un sitio a otro: sigue siendo 60 kg. Lo que baja a la sexta parte es el peso, de unos 588 N a unos 98 N.',
      'Mass is the amount of matter and does not change from place to place: it is still 60 kg. What drops to a sixth is the weight, from about 588 N to about 98 N.',
      'La massa és la quantitat de matèria i no canvia d’un lloc a un altre: continua sent 60 kg. El que baixa a la sisena part és el pes, d’uns 588 N a uns 98 N.')),

  q('di-06', 'eso', '📐',
    T('Sobre un cuerpo actúan dos fuerzas perpendiculares de 3 N y 4 N. ¿Cuánto vale la fuerza resultante?', 'Two perpendicular forces of 3 N and 4 N act on a body. What is the resultant force?', 'Sobre un cos actuen dues forces perpendiculars de 3 N i 4 N. Quant val la força resultant?'),
    N('5 N', '7 N', '1 N', '12 N'),
    T('Las fuerzas son vectores: si son perpendiculares, la resultante es la hipotenusa, √(3² + 4²) = √25 = 5 N. Solo se suman tal cual (7 N) si van en la misma dirección y sentido, y se restan (1 N) si van en sentidos contrarios.',
      'Forces are vectors: if they are perpendicular, the resultant is the hypotenuse, √(3² + 4²) = √25 = 5 N. They only add directly (7 N) if they point the same way, and subtract (1 N) if they point opposite ways.',
      'Les forces són vectors: si són perpendiculars, la resultant és la hipotenusa, √(3² + 4²) = √25 = 5 N. Només se sumen tal qual (7 N) si van en la mateixa direcció i sentit, i es resten (1 N) si van en sentits contraris.')),

  q('di-07', 'eso', '🛷',
    T('Un trineo se apoya en la nieve con una fuerza normal de 50 N y el coeficiente de rozamiento es 0,2. ¿Cuánto vale la fuerza de rozamiento?', 'A sled rests on snow with a normal force of 50 N and the coefficient of friction is 0.2. What is the friction force?', 'Un trineu es recolza a la neu amb una força normal de 50 N i el coeficient de fregament és 0,2. Quant val la força de fregament?'),
    N('10 N', '250 N', '0,004 N', '50,2 N'),
    T('F_roz = μ · N = 0,2 · 50 = 10 N. El rozamiento depende de lo mucho que se aprietan las superficies (la normal) y de cómo son (μ).',
      'F_friction = μ · N = 0.2 · 50 = 10 N. Friction depends on how hard the surfaces press together (the normal force) and what they are like (μ).',
      'F_freg = μ · N = 0,2 · 50 = 10 N. El fregament depèn de com de fort es premen les superfícies (la normal) i de com són (μ).')),

  q('di-08', 'eso', '🚗',
    T('Un coche va por una carretera recta a 90 km/h constantes. ¿Cuánto vale la fuerza neta sobre él?', 'A car travels along a straight road at a constant 90 km/h. What is the net force on it?', 'Un cotxe va per una carretera recta a 90 km/h constants. Quant val la força neta sobre ell?'),
    O(['Cero: el motor compensa exactamente el rozamiento', 'Una fuerza constante hacia delante', 'Una fuerza que crece con la velocidad', 'Depende de la masa del coche'],
      ['Zero: the engine exactly balances friction', 'A constant forward force', 'A force that grows with speed', 'It depends on the car’s mass'],
      ['Zero: el motor compensa exactament el fregament', 'Una força constant cap endavant', 'Una força que creix amb la velocitat', 'Depèn de la massa del cotxe']),
    T('Velocidad constante en línea recta significa aceleración cero, y por la segunda ley, fuerza neta cero. El motor sí empuja, pero lo justo para igualar el rozamiento y el aire.',
      'Constant speed in a straight line means zero acceleration and, by the second law, zero net force. The engine does push, but only enough to match friction and air resistance.',
      'Velocitat constant en línia recta vol dir acceleració zero, i per la segona llei, força neta zero. El motor sí que empeny, però el just per igualar el fregament i l’aire.')),

  q('di-09', 'eso', '📦',
    T('Empujas una caja de 10 kg con 50 N y el rozamiento es de 20 N. ¿Qué aceleración tiene?', 'You push a 10 kg box with 50 N and friction is 20 N. What is its acceleration?', 'Empenys una caixa de 10 kg amb 50 N i el fregament és de 20 N. Quina acceleració té?'),
    N('3 m/s²', '5 m/s²', '7 m/s²', '2 m/s²'),
    T('Primero la fuerza neta: 50 − 20 = 30 N, porque el rozamiento va en contra. Después, a = 30 ÷ 10 = 3 m/s². Olvidar el rozamiento da 5; sumarlo, 7.',
      'First the net force: 50 − 20 = 30 N, because friction opposes the motion. Then a = 30 ÷ 10 = 3 m/s². Forgetting friction gives 5; adding it, 7.',
      'Primer la força neta: 50 − 20 = 30 N, perquè el fregament va en contra. Després, a = 30 ÷ 10 = 3 m/s². Oblidar el fregament dona 5; sumar-lo, 7.')),

  q('di-10', 'eso', '📏',
    T('¿Qué es un newton (N)?', 'What is a newton (N)?', 'Què és un newton (N)?'),
    O(['La fuerza que da a 1 kg una aceleración de 1 m/s²', 'El peso de 1 kg en la Tierra', 'La masa de un cuerpo de 1 kg', 'La fuerza necesaria para mover cualquier objeto'],
      ['The force that gives 1 kg an acceleration of 1 m/s²', 'The weight of 1 kg on Earth', 'The mass of a 1 kg body', 'The force needed to move any object'],
      ['La força que dona a 1 kg una acceleració d’1 m/s²', 'El pes d’1 kg a la Terra', 'La massa d’un cos d’1 kg', 'La força necessària per moure qualsevol objecte']),
    T('Sale de F = m · a: 1 N = 1 kg · 1 m/s². El peso de 1 kg en la Tierra son unos 9,8 N, casi diez newtons.',
      'It comes from F = m · a: 1 N = 1 kg · 1 m/s². The weight of 1 kg on Earth is about 9.8 N, nearly ten newtons.',
      'Surt de F = m · a: 1 N = 1 kg · 1 m/s². El pes d’1 kg a la Terra són uns 9,8 N, gairebé deu newtons.')),

  // ── Bachillerato ────────────────────────────────────────────────────────
  q('di-11', 'bachillerato', '🎢',
    T('Un cuerpo baja por un plano inclinado 30° sin rozamiento. ¿Qué aceleración tiene? (g = 10 m/s²)', 'A body slides down a 30° incline with no friction. What is its acceleration? (g = 10 m/s²)', 'Un cos baixa per un pla inclinat 30° sense fregament. Quina acceleració té? (g = 10 m/s²)'),
    N('5 m/s²', '8,66 m/s²', '10 m/s²', '0 m/s²'),
    T('Solo tira hacia abajo del plano la componente del peso paralela a él, m · g · sen 30°. Así a = g · sen 30° = 10 · 0,5 = 5 m/s². Con el coseno (8,66) se usa la componente que aprieta contra el plano.',
      'Only the component of weight parallel to the slope pulls it down: m · g · sin 30°. So a = g · sin 30° = 10 · 0.5 = 5 m/s². Using cosine (8.66) takes the component that presses into the slope.',
      'Només tira cap avall del pla la component del pes paral·lela a ell, m · g · sin 30°. Així a = g · sin 30° = 10 · 0,5 = 5 m/s². Amb el cosinus (8,66) es fa servir la component que prem contra el pla.')),

  q('di-12', 'bachillerato', '⛷️',
    T('Un bloque de 4 kg descansa en un plano inclinado 60°. ¿Cuánto vale la fuerza normal? (g = 10 m/s²)', 'A 4 kg block rests on a 60° incline. What is the normal force? (g = 10 m/s²)', 'Un bloc de 4 kg reposa en un pla inclinat 60°. Quant val la força normal? (g = 10 m/s²)'),
    N('20 N', '34,6 N', '40 N', '0 N'),
    T('La normal equilibra la componente del peso perpendicular al plano: N = m · g · cos 60° = 4 · 10 · 0,5 = 20 N. Solo vale m · g (40 N) en un suelo horizontal.',
      'The normal force balances the component of weight perpendicular to the slope: N = m · g · cos 60° = 4 · 10 · 0.5 = 20 N. It only equals m · g (40 N) on level ground.',
      'La normal equilibra la component del pes perpendicular al pla: N = m · g · cos 60° = 4 · 10 · 0,5 = 20 N. Només val m · g (40 N) en un terra horitzontal.')),

  q('di-13', 'bachillerato', '⚽',
    T('¿Cuál es el momento lineal de un balón de 2 kg que se mueve a 3 m/s?', 'What is the linear momentum of a 2 kg ball moving at 3 m/s?', 'Quin és el moment lineal d’una pilota de 2 kg que es mou a 3 m/s?'),
    N('6 kg·m/s', '9 kg·m/s', '1,5 kg·m/s', '5 kg·m/s'),
    T('El momento lineal (o cantidad de movimiento) es p = m · v = 2 · 3 = 6 kg·m/s. Los 9 son la energía cinética, ½ · m · v², que es otra magnitud.',
      'Linear momentum is p = m · v = 2 · 3 = 6 kg·m/s. The 9 is the kinetic energy, ½ · m · v², which is a different quantity.',
      'El moment lineal (o quantitat de moviment) és p = m · v = 2 · 3 = 6 kg·m/s. Els 9 són l’energia cinètica, ½ · m · v², que és una altra magnitud.')),

  q('di-14', 'bachillerato', '⛸️',
    T('Dos patinadores en reposo, de 60 kg y 40 kg, se empujan. El de 60 kg sale a 2 m/s. ¿Cómo sale el de 40 kg?', 'Two skaters at rest, of 60 kg and 40 kg, push each other apart. The 60 kg one moves off at 2 m/s. How does the 40 kg one move?', 'Dos patinadors en repòs, de 60 kg i 40 kg, s’empenyen. El de 60 kg surt a 2 m/s. Com surt el de 40 kg?'),
    O(['A 3 m/s, en sentido contrario', 'A 2 m/s, en sentido contrario', 'A 1,33 m/s, en sentido contrario', 'A 3 m/s, en el mismo sentido'],
      ['At 3 m/s, in the opposite direction', 'At 2 m/s, in the opposite direction', 'At 1.33 m/s, in the opposite direction', 'At 3 m/s, in the same direction'],
      ['A 3 m/s, en sentit contrari', 'A 2 m/s, en sentit contrari', 'A 1,33 m/s, en sentit contrari', 'A 3 m/s, en el mateix sentit']),
    T('El momento lineal total se conserva y al principio era cero: 60 · 2 = 40 · v, así que v = 3 m/s, en sentido contrario para que la suma siga siendo cero. El más ligero sale más rápido.',
      'Total momentum is conserved and was zero at the start: 60 · 2 = 40 · v, so v = 3 m/s, in the opposite direction so the total stays zero. The lighter one moves off faster.',
      'El moment lineal total es conserva i al principi era zero: 60 · 2 = 40 · v, així que v = 3 m/s, en sentit contrari perquè la suma continuï sent zero. El més lleuger surt més ràpid.')),

  q('di-15', 'bachillerato', '🏏',
    T('Un bate golpea una pelota con una fuerza media de 20 N durante 0,5 s. ¿Qué impulso le comunica?', 'A bat hits a ball with an average force of 20 N for 0.5 s. What impulse does it give it?', 'Un bat colpeja una pilota amb una força mitjana de 20 N durant 0,5 s. Quin impuls li comunica?'),
    N('10 N·s', '40 N·s', '20,5 N·s', '0,025 N·s'),
    T('Impulso = F · Δt = 20 · 0,5 = 10 N·s, y es igual a lo que cambia el momento lineal de la pelota. Por eso al coger una pelota se acompaña con la mano: más tiempo, menos fuerza para el mismo cambio.',
      'Impulse = F · Δt = 20 · 0.5 = 10 N·s, and it equals the change in the ball’s momentum. That is why you draw your hand back when catching a ball: more time, less force for the same change.',
      'Impuls = F · Δt = 20 · 0,5 = 10 N·s, i és igual al que canvia el moment lineal de la pilota. Per això en agafar una pilota s’acompanya amb la mà: més temps, menys força per al mateix canvi.')),

  q('di-16', 'bachillerato', '🎡',
    T('Una bola de 1 kg gira atada a una cuerda en un círculo de 2 m de radio a 4 m/s. ¿Qué fuerza centrípeta necesita?', 'A 1 kg ball tied to a string goes round a circle of radius 2 m at 4 m/s. What centripetal force does it need?', 'Una bola d’1 kg gira lligada a una corda en un cercle de 2 m de radi a 4 m/s. Quina força centrípeta necessita?'),
    N('8 N', '2 N', '16 N', '32 N'),
    T('F_c = m · v² ÷ r = 1 · 16 ÷ 2 = 8 N, dirigida hacia el centro. Olvidar el cuadrado de la velocidad da 2 N; no dividir entre el radio, 16 N.',
      'F_c = m · v² ÷ r = 1 · 16 ÷ 2 = 8 N, pointing towards the centre. Forgetting to square the speed gives 2 N; not dividing by the radius, 16 N.',
      'F_c = m · v² ÷ r = 1 · 16 ÷ 2 = 8 N, dirigida cap al centre. Oblidar el quadrat de la velocitat dona 2 N; no dividir entre el radi, 16 N.')),

  q('di-17', 'bachillerato', '🏎️',
    T('Un coche toma una curva plana a velocidad constante. ¿Qué fuerza hace de fuerza centrípeta?', 'A car takes a flat bend at constant speed. Which force acts as the centripetal force?', 'Un cotxe pren un revolt pla a velocitat constant. Quina força fa de força centrípeta?'),
    O(['El rozamiento entre las ruedas y el asfalto', 'La fuerza centrífuga', 'El peso del coche', 'La fuerza del motor'],
      ['Friction between the tyres and the road', 'Centrifugal force', 'The car’s weight', 'The engine’s force'],
      ['El fregament entre les rodes i l’asfalt', 'La força centrífuga', 'El pes del cotxe', 'La força del motor']),
    T('Para girar hace falta una fuerza hacia el centro de la curva, y en una curva plana solo la da el rozamiento lateral de las ruedas. Por eso con hielo el coche se sale recto. La «fuerza centrífuga» no es una fuerza real: es la inercia vista desde dentro del coche.',
      'Turning needs a force towards the centre of the bend, and on a flat bend only the sideways friction of the tyres provides it. That is why on ice the car goes straight on. "Centrifugal force" is not a real force: it is inertia as felt from inside the car.',
      'Per girar cal una força cap al centre del revolt, i en un revolt pla només la dona el fregament lateral de les rodes. Per això amb gel el cotxe surt recte. La «força centrífuga» no és una força real: és la inèrcia vista des de dins del cotxe.')),

  q('di-18', 'bachillerato', '🌍',
    T('Según la ley de gravitación universal, si la distancia entre dos cuerpos se duplica, la fuerza entre ellos…', 'According to the law of universal gravitation, if the distance between two bodies doubles, the force between them…', 'Segons la llei de gravitació universal, si la distància entre dos cossos es duplica, la força entre ells…'),
    O(['se divide entre 4', 'se divide entre 2', 'se duplica', 'no cambia'],
      ['is divided by 4', 'is divided by 2', 'doubles', 'does not change'],
      ['es divideix entre 4', 'es divideix entre 2', 'es duplica', 'no canvia']),
    T('F = G · m₁ · m₂ ÷ d². La distancia va al cuadrado y abajo: el doble de distancia da 2² = 4 veces menos fuerza.',
      'F = G · m₁ · m₂ ÷ d². Distance is squared and in the denominator: twice the distance gives 2² = 4 times less force.',
      'F = G · m₁ · m₂ ÷ d². La distància va al quadrat i a baix: el doble de distància dona 2² = 4 vegades menys força.')),

  q('di-19', 'bachillerato', '🌌',
    T('Y si, a la misma distancia, se duplica la masa de uno de los dos cuerpos, la fuerza gravitatoria…', 'And if, at the same distance, the mass of one of the two bodies doubles, the gravitational force…', 'I si, a la mateixa distància, es duplica la massa d’un dels dos cossos, la força gravitatòria…'),
    O(['se duplica', 'se multiplica por 4', 'se divide entre 2', 'no cambia'],
      ['doubles', 'is multiplied by 4', 'is halved', 'does not change'],
      ['es duplica', 'es multiplica per 4', 'es divideix entre 2', 'no canvia']),
    T('En F = G · m₁ · m₂ ÷ d² las masas van multiplicando y sin cuadrado: doble masa, doble fuerza. Solo la distancia va al cuadrado.',
      'In F = G · m₁ · m₂ ÷ d² the masses multiply and are not squared: double the mass, double the force. Only distance is squared.',
      'A F = G · m₁ · m₂ ÷ d² les masses van multiplicant i sense quadrat: doble massa, doble força. Només la distància va al quadrat.')),

  q('di-20', 'bachillerato', '💡',
    T('Una lámpara de 3 kg cuelga en reposo de un cable. ¿Qué tensión soporta el cable? (g = 10 m/s²)', 'A 3 kg lamp hangs at rest from a cable. What is the tension in the cable? (g = 10 m/s²)', 'Un llum de 3 kg penja en repòs d’un cable. Quina tensió suporta el cable? (g = 10 m/s²)'),
    N('30 N', '3 N', '0 N', '60 N'),
    T('En reposo la fuerza neta es cero: la tensión hacia arriba iguala al peso hacia abajo, T = m · g = 3 · 10 = 30 N. Que no se mueva no quiere decir que no haya fuerzas.',
      'At rest the net force is zero: the upward tension equals the downward weight, T = m · g = 3 · 10 = 30 N. Not moving does not mean there are no forces.',
      'En repòs la força neta és zero: la tensió cap amunt iguala el pes cap avall, T = m · g = 3 · 10 = 30 N. Que no es mogui no vol dir que no hi hagi forces.')),

  q('di-21', 'bachillerato', '🏢',
    T('Una persona de 50 kg está sobre una báscula en un ascensor que acelera hacia arriba a 2 m/s². ¿Qué marca la báscula? (g = 10 m/s²)', 'A 50 kg person stands on scales in a lift accelerating upwards at 2 m/s². What do the scales read? (g = 10 m/s²)', 'Una persona de 50 kg és sobre una bàscula en un ascensor que accelera cap amunt a 2 m/s². Què marca la bàscula? (g = 10 m/s²)'),
    N('600 N', '500 N', '400 N', '100 N'),
    T('La báscula mide la normal. Hacia arriba: N − m · g = m · a, así que N = m · (g + a) = 50 · 12 = 600 N. Por eso al arrancar hacia arriba te notas más pesado; si acelerara hacia abajo marcaría 400 N.',
      'The scales measure the normal force. Upwards: N − m · g = m · a, so N = m · (g + a) = 50 · 12 = 600 N. That is why you feel heavier as the lift starts going up; accelerating downwards it would read 400 N.',
      'La bàscula mesura la normal. Cap amunt: N − m · g = m · a, així que N = m · (g + a) = 50 · 12 = 600 N. Per això en arrencar cap amunt et notes més pesant; si accelerés cap avall marcaria 400 N.')),

  q('di-22', 'bachillerato', '🚃',
    T('Dos bloques juntos, de 2 kg y 3 kg, están sobre una mesa sin rozamiento. Empujas el de 2 kg con 10 N y este empuja al de 3 kg. ¿Qué aceleración tienen?', 'Two blocks side by side, of 2 kg and 3 kg, sit on a frictionless table. You push the 2 kg one with 10 N and it pushes the 3 kg one. What is their acceleration?', 'Dos blocs junts, de 2 kg i 3 kg, són sobre una taula sense fregament. Empenys el de 2 kg amb 10 N i aquest empeny el de 3 kg. Quina acceleració tenen?'),
    N('2 m/s²', '5 m/s²', '3,33 m/s²', '50 m/s²'),
    T('Se mueven juntos, así que se tratan como un solo cuerpo de 5 kg: a = 10 ÷ 5 = 2 m/s². Usar solo la masa del bloque que empujas da 5.',
      'They move together, so treat them as a single 5 kg body: a = 10 ÷ 5 = 2 m/s². Using only the mass of the block you push gives 5.',
      'Es mouen junts, així que es tracten com un sol cos de 5 kg: a = 10 ÷ 5 = 2 m/s². Fer servir només la massa del bloc que empenys dona 5.')),

  q('di-23', 'bachillerato', '🚃',
    T('En los mismos bloques (2 kg y 3 kg empujados con 10 N), ¿con qué fuerza empuja el bloque de 2 kg al de 3 kg?', 'With the same blocks (2 kg and 3 kg pushed with 10 N), what force does the 2 kg block exert on the 3 kg block?', 'Amb els mateixos blocs (2 kg i 3 kg empesos amb 10 N), amb quina força empeny el bloc de 2 kg el de 3 kg?'),
    N('6 N', '10 N', '4 N', '0 N'),
    T('El bloque de 3 kg acelera a 2 m/s² y lo único que lo empuja es el otro bloque: F = 3 · 2 = 6 N. Los 10 N no llegan enteros; los 4 N que faltan se gastan en acelerar el propio bloque de 2 kg.',
      'The 3 kg block accelerates at 2 m/s² and the only thing pushing it is the other block: F = 3 · 2 = 6 N. The 10 N does not pass through in full; the missing 4 N goes into accelerating the 2 kg block itself.',
      'El bloc de 3 kg accelera a 2 m/s² i l’únic que l’empeny és l’altre bloc: F = 3 · 2 = 6 N. Els 10 N no hi arriben sencers; els 4 N que falten es gasten a accelerar el mateix bloc de 2 kg.')),

  q('di-24', 'bachillerato', '☁️',
    T('Un paracaidista con el paracaídas abierto baja a velocidad constante. ¿Cómo es la resistencia del aire?', 'A skydiver with the parachute open falls at constant speed. What is the air resistance like?', 'Un paracaigudista amb el paracaigudes obert baixa a velocitat constant. Com és la resistència de l’aire?'),
    O(['Igual a su peso', 'Menor que su peso, porque sigue bajando', 'Mayor que su peso', 'Cero, porque ya no acelera'],
      ['Equal to their weight', 'Less than their weight, because they are still falling', 'Greater than their weight', 'Zero, because they no longer accelerate'],
      ['Igual al seu pes', 'Menor que el seu pes, perquè continua baixant', 'Més gran que el seu pes', 'Zero, perquè ja no accelera']),
    T('Velocidad constante significa fuerza neta cero: el aire hacia arriba iguala exactamente al peso hacia abajo. Seguir bajando no necesita una fuerza neta hacia abajo, solo que no haya nada que lo frene más (primera ley).',
      'Constant speed means zero net force: the air pushing up exactly equals the weight pulling down. Carrying on downwards does not need a net downward force, only that nothing slows it further (first law).',
      'Velocitat constant vol dir força neta zero: l’aire cap amunt iguala exactament el pes cap avall. Continuar baixant no necessita una força neta cap avall, només que no hi hagi res que el freni més (primera llei).')),
]

export const PREGUNTAS_ESO = PREGUNTAS.filter(p => p.nivel === 'eso')
export const PREGUNTAS_BACH = PREGUNTAS
