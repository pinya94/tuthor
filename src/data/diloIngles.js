// «Dilo en Inglés»: situaciones con guion. Inglés británico (the bill, lift).
// Cada turno: lo que dice el personaje (`dice`, en voz), la ayuda en castellano,
// una respuesta modelo y los patrones de lib/diloIngles.js:
//   mal    error típico de hispanohablante → rojo, con la explicación
//   brusco se entiende pero suena mal → amarillo (cuenta como superado)
//   bien   → verde
//   casi   se entiende pero incompleto → amarillo
// Regla de siempre: nada que un profe de inglés aceptaría puede salir en rojo.
// Lo americano correcto (elevator, check) va en amarillo con la nota, nunca en rojo.
//
// Personajes provisionales: los monjes del escape room (el usuario pasará los
// de verdad). `img` es la ruta de su dibujo.

const GRACIAS = ['thank', 'thanks', 'cheers', 'you too', 'ta']

export const SITUACIONES = [
  {
    id: 'restaurante', emoji: '🍽️', titulo: 'En el restaurante', nivel: 'A1-A2',
    personaje: 'El camarero', img: '/escape/sospechoso-bruno.webp',
    intro: 'Has entrado en un restaurante de Londres con un amigo. Pide mesa, bebida y comida, y al final pide la cuenta.',
    turnos: [
      { dice: 'Good evening! A table for how many?', ayuda: 'Sois dos personas.', modelo: 'A table for two, please.',
        bien: ['for (2|to|too)', '2', '(2|to|too) please'] },
      { dice: "Here's the menu. What would you like to drink?", ayuda: 'Pide una bebida con educación.', modelo: "I'd like an orange juice, please.",
        brusco: [
          { p: 'i want ... {BEBIDA}', nota: 'Se entiende, pero «I want» suena brusco al pedir. Mejor «I\'d like…» o «Can I have…, please?».' },
          { p: 'give me ... {BEBIDA}', nota: '«Give me» suena a orden. Mejor «Can I have…, please?».' },
        ],
        bien: ['(i would like|i will have|can i have|could i have|can i get|could i get|may i have|i would love) ... {BEBIDA}', '{BEBIDA} ... please'],
        casi: [{ p: '{BEBIDA}', nota: 'Se entiende, pero solo la bebida queda seco. Añade «please»: «An orange juice, please».' }] },
      { dice: 'And what would you like to eat?', ayuda: 'Pide un plato.', modelo: "I'll have the fish and chips, please.",
        brusco: [
          { p: 'i want ... {COMIDA}', nota: 'Se entiende, pero «I want» suena brusco al pedir. Mejor «I\'ll have…» o «I\'d like…, please».' },
          { p: 'give me ... {COMIDA}', nota: '«Give me» suena a orden. Mejor «Can I have…, please?».' },
        ],
        bien: ['(i would like|i will have|can i have|could i have|can i get|could i get|may i have|i would love|i will take|i will try) ... {COMIDA}', '{COMIDA} ... please'],
        casi: [{ p: '{COMIDA}', nota: 'Se entiende, pero queda seco. Mejor «I\'ll have the…, please».' }] },
      { dice: 'Would you like anything else?', ayuda: 'Di que no, gracias.', modelo: "No, thank you. That's all.",
        bien: ['no ... (thank|thanks)', 'that is all', 'that is it', 'nothing else', 'i am (fine|ok|good) ... (thank|thanks)', "that is everything"],
        casi: [{ p: 'no', nota: 'Un «No» a secas suena seco. Mejor «No, thank you».' }] },
      { dice: 'Is everything OK with your meal?', ayuda: 'Di que está muy bueno y pide la cuenta.', modelo: "Yes, it's delicious, thanks. Could we have the bill, please?",
        mal: [
          { p: '(the|an|my|our) account', nota: '«Account» es una cuenta del banco. La del restaurante es «the bill».' },
          { p: 'the count', nota: '«Count» es contar. La cuenta del restaurante es «the bill».' },
        ],
        brusco: [{ p: '(i want|give me) ... (bill|check)', nota: 'Suena brusco. Mejor «Could we have the bill, please?».' }],
        bien: ['(can|could|may) (i|we) (have|get|see) the bill', 'the bill ... please', 'bill please'],
        casi: [{ p: '(bill|check)', nota: 'Bien, pero pídela con educación: «Could we have the bill, please?». En Reino Unido se dice «the bill»; «the check» es de Estados Unidos.' }] },
    ],
  },
  {
    id: 'campamento', emoji: '⛺', titulo: 'El primer día de campamento', nivel: 'A1',
    personaje: 'El monitor', img: '/escape/sospechoso-lucas.webp',
    intro: 'Llegas a un campamento de verano en Inglaterra. El monitor quiere conocerte: preséntate.',
    turnos: [
      { dice: "Hi! Welcome to the summer camp. What's your name?", ayuda: 'Di cómo te llamas.', modelo: "My name's Marta. / I'm Marta.",
        bien: ['my name is *', 'i am *', 'call me *', '* is my name'],
        casi: [{ p: '*', nota: 'Se entiende. Con frase completa: «My name\'s…» o «I\'m…».' }] },
      { dice: 'Nice to meet you! How old are you?', ayuda: 'Di tu edad.', modelo: "I'm thirteen. / I'm thirteen years old.",
        mal: [
          { p: 'i have {NUM}', nota: 'En inglés la edad va con «to be», no con «have»: «I\'m 13» o «I\'m 13 years old».' },
          { p: 'i am {NUM} years$', nota: 'Si dices «years», añade «old»: «I\'m 13 years old».' },
        ],
        bien: ['i am {NUM}', '{NUM} years old'],
        casi: [{ p: '{NUM}', nota: 'Bien. Con frase completa: «I\'m 13».' }] },
      { dice: 'Where are you from?', ayuda: 'Di de dónde eres.', modelo: "I'm from Spain. / I'm Spanish.",
        mal: [
          { p: 'i am of', nota: 'El origen va con «from»: «I\'m from Spain».' },
          { p: 'i am (spain|catalonia|madrid|barcelona|valencia|seville|sevilla|bilbao|zaragoza|malaga|murcia|mexico|colombia|argentina|peru|morocco|romania)', nota: '«I am Spain» quiere decir que eres España. Se dice «I\'m from Spain» o «I\'m Spanish».' },
        ],
        bien: ['from *', 'i am (spanish|catalan|basque|galician|english|british|french|italian|portuguese|moroccan|romanian|colombian|mexican|argentinian|peruvian|venezuelan|ecuadorian|chinese|ukrainian)', 'i live in *'],
        casi: [{ p: '(spain|catalonia|madrid|barcelona|valencia|seville|sevilla|bilbao|zaragoza|malaga|murcia|mexico|colombia|argentina|peru|morocco|romania)', nota: 'Se entiende. Con frase completa: «I\'m from Spain».' }] },
      { dice: 'What do you like doing in your free time?', ayuda: 'Di qué te gusta hacer.', modelo: 'I like playing football and reading.',
        mal: [
          { p: 'i (like|love|enjoy) (play|read|swim|dance|watch|go|ride|draw|cook|sing|run|skate|paint|listen|write|travel|study|surf)', nota: 'Después de like, love o enjoy el verbo va en -ing: «I like playing football».' },
          { p: 'enjoy to', nota: 'Después de «enjoy» va -ing: «I enjoy reading».' },
        ],
        bien: ['i (like|love|enjoy) *', '{ING}', 'my (hobby|hobbies|favourite|favorite)'],
        casi: [] },
      { dice: 'Have you got any brothers or sisters?', ayuda: 'Di si tienes hermanos.', modelo: "Yes, I've got a sister. / No, I haven't. I'm an only child.",
        mal: [{ p: '{NUM2} (brother|sister)', nota: 'Con más de uno va en plural: «two brothers», «three sisters».' }],
        bien: ['(i have|i have got|i got) ... (brother|brothers|sister|sisters)', 'only child', '(no|yes) ... i (have|have not|do|do not|have got)', '(no|yes) ... (brother|brothers|sister|sisters)'],
        casi: [{ p: '(yes|no)', nota: 'Bien. Completa la frase: «Yes, I\'ve got a sister» o «No, I haven\'t».' }] },
    ],
  },
  {
    id: 'hotel', emoji: '🏨', titulo: 'Llegada al hotel', nivel: 'A2',
    personaje: 'El recepcionista', img: '/escape/sospechoso-gil.webp',
    intro: 'Llegas a un hotel de Edimburgo con tu familia. Tenéis una reserva: haz el check-in.',
    turnos: [
      { dice: 'Good afternoon! How can I help you?', ayuda: 'Di que tienes una reserva.', modelo: "Hello, I have a reservation. / I'd like to check in, please.",
        mal: [{ p: '(a|my|the) reserve', nota: '«Reserve» es un verbo (reservar). La reserva del hotel es «reservation» o «booking».' }],
        brusco: [{ p: 'i want to check in', nota: 'Se entiende, pero suena brusco. Mejor «I\'d like to check in, please».' }],
        bien: ['(i have|i have got|we have|we have got) a (reservation|booking)', '(i|we) would like to check in', 'check in', '(reservation|booking) (for|under|in the name)'],
        casi: [{ p: '(reservation|booking)', nota: 'Bien. Con frase completa: «I have a reservation».' }] },
      { dice: 'Of course. Can I have your name, please?', ayuda: 'Di tu nombre o tu apellido.', modelo: "Yes, it's Marta García.",
        bien: ['*'] },
      { dice: 'Thank you. Could you spell that, please?', ayuda: 'Deletréalo letra a letra, en inglés: «M… A… R…».', modelo: 'M - A - R - T - A.',
        bien: ['{LETRAS}'],
        casi: [{ p: '*', nota: 'No he oído las letras separadas. Deletrea despacio, una a una: «M… A… R… T… A».' }] },
      { dice: "You're in room two hundred and fourteen. Breakfast is from seven to ten. Do you have any questions?", ayuda: 'Pregunta algo: dónde está el ascensor, la contraseña del wifi o a qué hora es el check-out.', modelo: "Yes, what's the wifi password? / Where's the lift?",
        mal: [{ p: 'what hour', nota: 'Para la hora de algo se pregunta «What time…?»: «What time is check-out?».' }],
        brusco: [{ p: 'elevator', nota: 'Se entiende, pero en Reino Unido se dice «lift». «Elevator» es de Estados Unidos.' }],
        bien: ['what time ...', 'where is ...', 'is there ...', 'what is the ...', '(wifi|password|lift|breakfast|check out|checkout)', 'no ... (thank|thanks)', '(how|can|could) (i|we) ...', 'do you have ...'] },
      { dice: "Here's your key. Enjoy your stay!", ayuda: 'Da las gracias.', modelo: 'Thank you very much!',
        bien: GRACIAS },
    ],
  },
  {
    id: 'calle', emoji: '🗺️', titulo: 'Perdido por la ciudad', nivel: 'A2',
    personaje: 'Un señor por la calle', img: '/escape/sospechoso-tomas.webp',
    intro: 'Estás en York y no encuentras la estación de tren. Un señor se ofrece a ayudarte: escucha bien el camino.',
    turnos: [
      { dice: 'Hello! You look lost. Can I help you?', ayuda: 'Pregunta cómo llegar a la estación de tren.', modelo: 'Yes, please. How do I get to the train station?',
        mal: [
          { p: 'how i (get|go|can)', nota: 'En la pregunta falta «do»: «How do I get to the station?».' },
          { p: 'where is station', nota: 'Falta «the»: «Where is the station?».' },
        ],
        bien: ['(where|how do i get to|how can i get to|how do i go to|how can i go to|way to|is there|looking for|find) ... station'],
        casi: [{ p: 'station', nota: 'Se entiende, pero haz la pregunta entera: «How do I get to the station?».' }] },
      { dice: 'Go straight on and take the second street on the left. Then the station is on your right. Can you say that back to me?', ayuda: 'Repite el camino para comprobar que lo has entendido.', modelo: 'Straight on, second street on the left, and the station is on my right.',
        mal: [
          { p: '(first|third|fourth) ... (street|left|right)', nota: 'Era la SEGUNDA calle: «the second street on the left».' },
          { p: '(second|2) ... right ... left', nota: 'Al revés: la segunda a la IZQUIERDA y luego la estación a la DERECHA.' },
        ],
        bien: ['(second|2) ... left ... right'],
        casi: [{ p: '(second|2) ... left', nota: '¡Bien! Y al final, la estación está a la derecha: «on your right».' }] },
      { dice: "That's right! Anything else?", ayuda: 'Pregunta si está lejos.', modelo: 'Is it far?',
        mal: [{ p: 'is far', nota: 'Falta el sujeto «it»: «Is it far?».' }],
        bien: ['is it (far|near|close)', 'how far', 'how long ...', 'far from here'],
        casi: [{ p: '(far|near|close)', nota: 'Se entiende. La pregunta entera: «Is it far?».' }] },
      { dice: "No, it's only five minutes on foot. Have a good trip!", ayuda: 'Da las gracias y despídete.', modelo: 'Thank you so much! Goodbye!',
        bien: GRACIAS },
    ],
  },
]
