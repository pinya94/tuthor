// «Dilo en Inglés»: situaciones con guion, inglés británico (the bill, lift).
// Cada turno es una MISIÓN: el personaje dice algo (`dice`, en voz) y tú tienes
// que decir lo que pide `mision` con tus propias palabras. Así no hace falta
// adivinar la frase: se comprueba (lib/diloIngles.js · corrige)
//   claves  lo que la misión pide (el 5, «window»…). Si falta, se dice qué falta.
//   tono    al pedir algo: educado → verde; seco o «I want» → amarillo
//   mal     errores típicos de hispanohablante → rojo con la explicación
//   mejor   se entiende pero hay una forma mejor → amarillo
// Lo que no está fichado se acepta: no detecta TODOS los errores de gramática
// (la página lo explica). Regla de siempre: nada correcto puede salir en rojo;
// lo americano correcto (check, elevator) va en amarillo con la nota.
//
// Personajes: dibujos del usuario (public/escape/ingles-<rol>.webp).

const GRACIAS = { p: '(thank|thanks|cheers|ta)', falta: 'Da las gracias: «Thank you».' }

export const SITUACIONES = [
  {
    id: 'restaurante', emoji: '🍽️', titulo: 'En el restaurante', nivel: 'A1-A2',
    personaje: 'El camarero', img: '/escape/ingles-camarero.webp',
    intro: 'Vas a cenar a un restaurante de Londres con cuatro amigos. Pide mesa, bebida y comida, y al final paga.',
    turnos: [
      { dice: 'Good evening! How many people?', mision: 'Pide una mesa para cinco, junto a la ventana.', tono: true,
        modelo: 'Could we have a table for five by the window, please?',
        claves: [{ p: '5', falta: 'Di cuántos sois: «five».' }, { p: '(window|windows)', falta: 'Pide que sea junto a la ventana: «by the window».' }],
        mejor: [{ p: '{NUM} persons', nota: 'Se entiende, pero se dice «people»: «a table for five people».' }] },
      { dice: 'Of course, follow me. What would you like to drink?', mision: 'Pide una limonada.', tono: true,
        modelo: 'Could I have a lemonade, please?',
        claves: [{ p: 'lemonade', falta: 'Pide la bebida: «a lemonade».' }] },
      { dice: 'And what would you like to eat?', mision: 'Pregunta si tienen algún plato vegetariano.',
        modelo: 'Do you have anything vegetarian?',
        claves: [{ p: '(vegetarian|vegan)', falta: 'Pregunta por algo «vegetarian».' }],
        mal: [
          { p: '^you have', nota: 'En la pregunta falta «do»: «Do you have anything vegetarian?».' },
          { p: '^there is ... vegetarian', nota: 'Para preguntar, el verbo va delante: «Is there anything vegetarian?».' },
        ] },
      { dice: 'Yes, the vegetable curry is very good. Here you are! Anything else?', mision: 'Di que no quieres nada más y pide la cuenta.', tono: true,
        modelo: 'No, thank you. Could we have the bill, please?',
        claves: [{ p: '(no|nothing|that is all|that is it)', falta: 'Primero di que no quieres nada más: «No, thank you».' }, { p: '(bill|check)', falta: 'Pide la cuenta: «the bill».' }],
        mal: [
          { p: '(the|an|my|our) account', nota: '«Account» es una cuenta del banco. La del restaurante es «the bill».' },
          { p: 'the count', nota: '«Count» es contar. La cuenta del restaurante es «the bill».' },
        ],
        mejor: [{ p: 'check', nota: 'Se entiende, pero en Reino Unido se dice «the bill»; «the check» es de Estados Unidos.' }] },
      { dice: 'Will you pay by card or in cash?', mision: 'Di que pagarás con tarjeta.',
        modelo: "By card, please. / I'll pay by card.",
        claves: [{ p: 'card', falta: 'Di cómo pagas: «by card».' }],
        mal: [{ p: 'with card', nota: 'Se dice «by card» (o «with my card»): «I\'ll pay by card».' }] },
    ],
  },
  {
    id: 'campamento', emoji: '⛺', titulo: 'El primer día de campamento', nivel: 'A1',
    personaje: 'El monitor', img: '/escape/ingles-monitor.webp',
    intro: 'Llegas a un campamento de verano en Inglaterra. El monitor quiere conocerte: preséntate.',
    turnos: [
      { dice: "Hi! Welcome to the summer camp. What's your name?", mision: 'Di cómo te llamas.',
        modelo: "My name's Marta. / I'm Marta.", claves: [] },
      { dice: 'Nice to meet you! How old are you?', mision: 'Di que tienes trece años.',
        modelo: "I'm thirteen. / I'm thirteen years old.",
        claves: [{ p: '13', falta: 'Di tu edad: «thirteen».' }],
        mal: [
          { p: '(have|has) {NUM}', nota: 'En inglés la edad va con «to be», no con «have»: «I\'m 13» o «I\'m 13 years old».' },
          { p: 'i am {NUM} years$', nota: 'Si dices «years», añade «old»: «I\'m 13 years old».' },
        ] },
      { dice: 'Where are you from?', mision: 'Di que eres de España, de Valencia.',
        modelo: "I'm from Valencia, in Spain.",
        claves: [{ p: '(spain|spanish)', falta: 'Di el país: «Spain».' }, { p: 'valencia', falta: 'Di la ciudad: «Valencia».' }],
        mal: [
          { p: 'i am of', nota: 'El origen va con «from»: «I\'m from Spain».' },
          { p: 'i am (spain|valencia)', nota: '«I am Spain» quiere decir que eres España. Se dice «I\'m from Spain» o «I\'m Spanish».' },
        ] },
      { dice: 'What do you like doing in your free time?', mision: 'Di que te gusta jugar al fútbol y leer.',
        modelo: 'I like playing football and reading.',
        claves: [{ p: 'football', falta: 'Di el deporte: «football».' }, { p: '(read|reading|books)', falta: 'Di que te gusta leer: «reading».' }],
        mal: [
          { p: '(like|love|enjoy) (play|read|swim|dance|watch|go|ride|draw|cook|sing|run|skate|paint|listen|write)', nota: 'Después de like, love o enjoy el verbo va en -ing: «I like playing football».' },
          { p: 'enjoy to', nota: 'Después de «enjoy» va -ing: «I enjoy reading».' },
        ] },
      { dice: 'Have you got any brothers or sisters?', mision: 'Di que tienes dos hermanas.',
        modelo: "Yes, I've got two sisters.",
        claves: [{ p: '2', falta: 'Di cuántas: «two».' }, { p: '(sister|sisters)', falta: 'Di que son hermanas: «sisters».' }],
        mal: [{ p: '{NUM2} sister', nota: 'Con más de una va en plural: «two sisters».' }] },
    ],
  },
  {
    id: 'hotel', emoji: '🏨', titulo: 'Llegada al hotel', nivel: 'A2',
    personaje: 'El recepcionista', img: '/escape/ingles-recepcionista.webp',
    intro: 'Llegas a un hotel de Edimburgo con tu familia. Tenéis una reserva a nombre de García.',
    turnos: [
      { dice: 'Good afternoon! How can I help you?', mision: 'Di que tienes una reserva a nombre de García.',
        modelo: 'Hello, I have a reservation under the name García.',
        claves: [{ p: '(reservation|booking|reserved|booked)', falta: 'Di que tienes una reserva: «a reservation».' }, { p: 'garcia', falta: 'Di el nombre de la reserva: «García».' }],
        mal: [{ p: '(a|my|the) reserve', nota: '«Reserve» es un verbo (reservar). La reserva es «reservation» o «booking».' }] },
      { dice: 'Could you spell your surname, please?', mision: 'Deletrea el apellido en inglés: G-A-R-C-I-A.',
        modelo: 'G - A - R - C - I - A.',
        claves: [{ p: '{LETRAS}', falta: 'Di las letras una a una, despacio: «G… A… R… C… I… A».' }] },
      { dice: "Thank you. You're in room two hundred and fourteen. Do you have any questions?", mision: 'Pregunta a qué hora es el desayuno.',
        modelo: 'What time is breakfast?',
        claves: [{ p: 'breakfast', falta: 'Pregunta por el desayuno: «breakfast».' }],
        mal: [{ p: 'what hour', nota: 'Para la hora de algo se pregunta «What time…?»: «What time is breakfast?».' }] },
      { dice: 'Breakfast is from seven to ten. Anything else?', mision: 'Pide la contraseña del wifi.', tono: true,
        modelo: 'Could I have the wifi password, please?',
        claves: [{ p: '(wifi|internet)', falta: 'Di que es la del «wifi».' }, { p: '(password|code)', falta: 'Pide la contraseña: «the password».' }] },
      { dice: "Here's your key. The lift is on the left. Enjoy your stay!", mision: 'Da las gracias.',
        modelo: 'Thank you very much!', claves: [GRACIAS] },
    ],
  },
  {
    id: 'calle', emoji: '🗺️', titulo: 'Perdido por la ciudad', nivel: 'A2',
    personaje: 'Un chico por la calle', img: '/escape/ingles-calle.webp',
    intro: 'Estás en York y no encuentras la estación de tren. Un chico se ofrece a ayudarte: escucha bien el camino.',
    turnos: [
      { dice: 'Hello! You look lost. Can I help you?', mision: 'Pregunta cómo llegar a la estación de tren.',
        modelo: 'Yes, please. How do I get to the train station?',
        claves: [{ p: 'station', falta: 'Di adónde quieres ir: «the station».' }],
        mal: [
          { p: 'how i (get|go|can)', nota: 'En la pregunta falta «do»: «How do I get to the station?».' },
          { p: 'where is station', nota: 'Falta «the»: «Where is the station?».' },
        ] },
      { dice: 'Go straight on and take the second street on the left. Then the station is on your right. Can you say that back to me?', mision: 'Repite el camino para comprobar que lo has entendido.',
        modelo: 'Straight on, the second street on the left, and the station is on my right.',
        claves: [
          { p: '(second|2)', falta: '¿Qué calle era? La segunda: «the second».' },
          { p: 'left', falta: '¿Hacia dónde se gira? A la izquierda: «left».' },
          { p: 'right', falta: '¿Dónde queda la estación? A la derecha: «on your right».' },
        ],
        mal: [
          { p: '(first|third|fourth) ... (street|left|right)', nota: 'Era la SEGUNDA calle: «the second street on the left».' },
          { p: '(second|2) ... right ... left', nota: 'Al revés: la segunda a la IZQUIERDA y luego la estación a la DERECHA.' },
        ] },
      { dice: "That's right! Anything else?", mision: 'Pregunta si está lejos.',
        modelo: 'Is it far?',
        claves: [{ p: '(far|near|close|long|minutes)', falta: 'Pregunta por la distancia: «Is it far?».' }],
        mal: [{ p: '^is far', nota: 'Falta el sujeto «it»: «Is it far?».' }] },
      { dice: "No, it's only five minutes on foot. Have a good trip!", mision: 'Da las gracias y despídete.',
        modelo: 'Thank you so much! Goodbye!',
        claves: [GRACIAS, { p: '(bye|goodbye|see you|have a)', falta: 'Despídete: «Goodbye!».' }] },
    ],
  },
]
