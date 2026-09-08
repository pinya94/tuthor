// Internet Seguro — privacidad, contraseñas, estafas y convivencia en red
//
// Tercer bloque de vida práctica. Es material educativo: enseña a reconocer
// situaciones y a quién acudir, no sustituye el criterio de una familia ni el
// protocolo de un centro. Ante acoso o contacto de un adulto desconocido, la
// respuesta correcta siempre incluye contárselo a una persona adulta de
// confianza, y por eso esa opción aparece en las preguntas que lo tratan.
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

export const PREGUNTAS = [

  // ── CONTRASEÑAS Y CUENTAS ───────────────────────────────────────────────
  q('is-01', 'primaria',
    { es: '¿Cómo es una buena contraseña?', en: 'What makes a good password?', ca: 'Com és una bona contrasenya?' },
    { es: ['Larga y difícil de adivinar, distinta en cada servicio', 'Corta, para acordarse', 'Tu fecha de nacimiento', 'La misma en todas partes'], en: ['Long and hard to guess, different for each service', 'Short, so you remember it', 'Your date of birth', 'The same everywhere'], ca: ['Llarga i difícil d\'endevinar, diferent a cada servei', 'Curta, per recordar-la', 'La teva data de naixement', 'La mateixa a tot arreu'] },
    { es: 'Larga y difícil de adivinar, distinta en cada servicio', en: 'Long and hard to guess, different for each service', ca: 'Llarga i difícil d\'endevinar, diferent a cada servei' },
    '🔑',
    { es: 'La longitud importa más que los símbolos raros: cuatro palabras sin relación son más seguras y más fáciles de recordar que "P4ss!". Y distinta en cada sitio, porque si roban una, no abren las demás.', en: 'Length matters more than odd symbols: four unrelated words are safer and easier to remember than "P4ss!". And different everywhere, because if one is stolen the others still hold.', ca: 'La longitud importa més que els símbols estranys: quatre paraules sense relació són més segures que "P4ss!".' }),

  q('is-02', 'primaria',
    { es: 'Tu mejor amigo te pide la contraseña de tu cuenta. ¿Se la das?', en: 'Your best friend asks for your account password. Do you give it?', ca: 'El teu millor amic et demana la contrasenya del teu compte. L\'hi dones?' },
    { es: ['No: una contraseña no se comparte, ni con amigos', 'Sí, si es de confianza', 'Sí, pero se la cambias luego', 'Solo si él te da la suya'], en: ['No: a password is not shared, not even with friends', 'Yes, if you trust them', 'Yes, but change it later', 'Only if they give you theirs'], ca: ['No: una contrasenya no es comparteix, ni amb amics', 'Sí, si és de confiança', 'Sí, però després la canvies', 'Només si ell et dona la seva'] },
    { es: 'No: una contraseña no se comparte, ni con amigos', en: 'No: a password is not shared, not even with friends', ca: 'No: una contrasenya no es comparteix, ni amb amics' },
    '🤐',
    { es: 'No es cuestión de desconfiar: las amistades cambian, los móviles se pierden y una contraseña compartida deja de ser secreta para siempre. Además, lo que pase con esa cuenta seguirá siendo responsabilidad tuya.', en: 'It is not about distrust: friendships change, phones get lost and a shared password stops being a secret for good. And whatever happens with that account is still your responsibility.', ca: 'No és qüestió de desconfiar: les amistats canvien, els mòbils es perden i una contrasenya compartida deixa de ser secreta.' }),

  q('is-03', 'primaria',
    { es: '¿Qué es la verificación en dos pasos?', en: 'What is two-step verification?', ca: 'Què és la verificació en dos passos?' },
    { es: ['Un segundo comprobante además de la contraseña, como un código al móvil', 'Escribir la contraseña dos veces', 'Tener dos cuentas', 'Cambiar la contraseña cada mes'], en: ['A second check besides the password, like a code to your phone', 'Typing the password twice', 'Having two accounts', 'Changing the password monthly'], ca: ['Una segona comprovació a més de la contrasenya, com un codi al mòbil', 'Escriure la contrasenya dues vegades', 'Tenir dos comptes', 'Canviar la contrasenya cada mes'] },
    { es: 'Un segundo comprobante además de la contraseña, como un código al móvil', en: 'A second check besides the password, like a code to your phone', ca: 'Una segona comprovació a més de la contrasenya, com un codi al mòbil' },
    '🔐',
    { es: 'Es la medida que más protege por lo poco que cuesta activarla: aunque alguien averigüe tu contraseña, sin ese segundo código no entra. Ese código no se le da a NADIE, ni a quien diga ser del servicio.', en: 'It is the measure that protects most for how little it costs to switch on: even if someone learns your password, without that second code they cannot get in. That code is given to NOBODY, not even someone claiming to be from the service.', ca: 'Encara que algú esbrini la teva contrasenya, sense aquest segon codi no hi entra. Aquest codi no es dona a NINGÚ.' }),

  // ── DATOS PERSONALES Y PRIVACIDAD ───────────────────────────────────────
  q('is-04', 'primaria',
    { es: '¿Qué datos NO conviene publicar en internet?', en: 'Which details should you NOT publish online?', ca: 'Quines dades NO convé publicar a internet?' },
    { es: ['Dirección, colegio, teléfono y rutinas diarias', 'Tu color favorito', 'Tu película preferida', 'Tu opinión sobre un libro'], en: ['Address, school, phone number and daily routines', 'Your favourite colour', 'Your favourite film', 'Your opinion about a book'], ca: ['Adreça, escola, telèfon i rutines diàries', 'El teu color preferit', 'La teva pel·lícula preferida', 'La teva opinió sobre un llibre'] },
    { es: 'Dirección, colegio, teléfono y rutinas diarias', en: 'Address, school, phone number and daily routines', ca: 'Adreça, escola, telèfon i rutines diàries' },
    '🏠',
    { es: 'Por separado parecen datos inofensivos, pero juntos permiten saber dónde encontrarte y cuándo. Una foto con el uniforme del colegio o el escudo de fondo ya dice más de lo que parece.', en: 'Separately they look harmless, but together they show where to find you and when. A photo in a school uniform or with the crest in the background already says more than you think.', ca: 'Per separat semblen dades inofensives, però juntes permeten saber on trobar-te i quan.' }),

  q('is-05', 'primaria',
    { es: '¿Qué significa tener el perfil privado en una red social?', en: 'What does having a private profile on social media mean?', ca: 'Què significa tenir el perfil privat en una xarxa social?' },
    { es: ['Que solo ven lo que publicas las personas que tú aceptas', 'Que nadie puede verte nunca', 'Que la red no guarda tus datos', 'Que puedes publicar lo que quieras sin consecuencias'], en: ['Only people you accept can see what you post', 'Nobody can ever see you', 'The network stores no data about you', 'You can post anything with no consequences'], ca: ['Que només veuen el que publiques les persones que tu acceptes', 'Que ningú no pot veure\'t mai', 'Que la xarxa no guarda les teves dades', 'Que pots publicar el que vulguis sense conseqüències'] },
    { es: 'Que solo ven lo que publicas las personas que tú aceptas', en: 'Only people you accept can see what you post', ca: 'Que només veuen el que publiques les persones que tu acceptes' },
    '🔒',
    { es: 'Es lo primero que conviene revisar al abrir una cuenta, porque muchas vienen públicas por defecto. Ojo: privado no significa invisible — cualquiera de tus contactos puede hacer una captura y reenviarla.', en: 'It is the first thing to check when opening an account, since many are public by default. Note: private does not mean invisible — any of your contacts can screenshot and forward it.', ca: 'És el primer que convé revisar en obrir un compte. Compte: privat no vol dir invisible.' }),

  q('is-06', 'primaria',
    { es: 'Quieres subir una foto en la que sale un amigo. ¿Qué haces?', en: 'You want to post a photo with a friend in it. What do you do?', ca: 'Vols pujar una foto on surt un amic. Què fas?' },
    { es: ['Pedirle permiso antes de publicarla', 'Subirla, que es tu foto', 'Subirla y borrarla si se queja', 'Subirla tapándole la cara con un emoji'], en: ['Ask their permission before posting it', 'Post it, it is your photo', 'Post it and delete it if they complain', 'Post it covering their face with an emoji'], ca: ['Demanar-li permís abans de publicar-la', 'Pujar-la, que és la teva foto', 'Pujar-la i esborrar-la si es queixa', 'Pujar-la tapant-li la cara amb un emoji'] },
    { es: 'Pedirle permiso antes de publicarla', en: 'Ask their permission before posting it', ca: 'Demanar-li permís abans de publicar-la' },
    '📸',
    { es: 'Cada persona tiene derecho sobre su propia imagen, y eso no depende de quién hiciera la foto. Preguntar cuesta un mensaje y evita un problema que después ya no se arregla del todo.', en: 'Everyone has rights over their own image, whoever took the photo. Asking costs one message and avoids a problem that afterwards is never fully fixed.', ca: 'Cada persona té dret sobre la seva pròpia imatge, i això no depèn de qui fes la foto.' }),

  q('is-07', 'primaria',
    { es: '¿Qué es la huella digital que dejamos en internet?', en: 'What is the digital footprint we leave online?', ca: 'Què és l\'empremta digital que deixem a internet?' },
    { es: ['El rastro de todo lo que publicamos y hacemos, que puede quedar años', 'La marca del dedo en la pantalla', 'El historial del navegador solamente', 'La firma electrónica'], en: ['The trail of everything we post and do, which can last for years', 'The fingerprint on the screen', 'Only the browser history', 'An electronic signature'], ca: ['El rastre de tot el que publiquem i fem, que pot quedar anys', 'La marca del dit a la pantalla', 'Només l\'historial del navegador', 'La signatura electrònica'] },
    { es: 'El rastro de todo lo que publicamos y hacemos, que puede quedar años', en: 'The trail of everything we post and do, which can last for years', ca: 'El rastre de tot el que publiquem i fem, que pot quedar anys' },
    '👣',
    { es: 'Borrar una publicación no la borra de todas partes: puede estar en capturas, en copias o en la memoria de un buscador. La pregunta útil antes de publicar es si te importaría que lo viera dentro de diez años quien menos te apetece.', en: 'Deleting a post does not delete it everywhere: it may live in screenshots, copies or a search engine\'s cache. The useful question before posting is whether you would mind the last person you would want seeing it in ten years.', ca: 'Esborrar una publicació no l\'esborra de tot arreu: pot ser en captures o en còpies.' }),

  q('is-08', 'primaria',
    { es: 'Alguien que no conoces te pide ser tu amigo en una red social. ¿Qué haces?', en: 'Someone you do not know asks to be your friend online. What do you do?', ca: 'Algú que no coneixes et demana ser amic teu en una xarxa social. Què fas?' },
    { es: ['No aceptar: en redes solo se añade a gente que conoces en persona', 'Aceptar, por si acaso es alguien del cole', 'Aceptar y ver de qué habla', 'Aceptar si tiene amigos en común'], en: ['Do not accept: online you only add people you know in person', 'Accept, in case they are from school', 'Accept and see what they talk about', 'Accept if you have friends in common'], ca: ['No acceptar: a les xarxes només s\'afegeix gent que coneixes en persona', 'Acceptar, per si de cas és algú de l\'escola', 'Acceptar i veure de què parla', 'Acceptar si té amics en comú'] },
    { es: 'No aceptar: en redes solo se añade a gente que conoces en persona', en: 'Do not accept: online you only add people you know in person', ca: 'No acceptar: a les xarxes només s\'afegeix gent que coneixes en persona' },
    '🚫',
    { es: 'Tener amigos en común no garantiza nada: es fácil añadir a mucha gente para parecer conocido. Un perfil se crea en dos minutos con la foto de cualquiera.', en: 'Having friends in common guarantees nothing: it is easy to add lots of people to look familiar. A profile takes two minutes to create with anyone\'s photo.', ca: 'Tenir amics en comú no garanteix res: és fàcil afegir molta gent per semblar conegut.' }),

  q('is-09', 'primaria',
    { es: 'Alguien que has conocido por internet te propone quedar en persona. ¿Qué haces?', en: 'Someone you met online suggests meeting in person. What do you do?', ca: 'Algú que has conegut per internet et proposa quedar en persona. Què fas?' },
    { es: ['Contárselo a un adulto de confianza y no ir por tu cuenta', 'Ir, pero avisando a un amigo', 'Ir a un sitio con mucha gente', 'Ir solo si ya habéis hablado mucho'], en: ['Tell a trusted adult and do not go on your own', 'Go, but tell a friend', 'Go somewhere crowded', 'Go only if you have talked a lot'], ca: ['Explicar-ho a un adult de confiança i no anar-hi pel teu compte', 'Anar-hi, però avisant un amic', 'Anar a un lloc amb molta gent', 'Anar-hi només si ja heu parlat molt'] },
    { es: 'Contárselo a un adulto de confianza y no ir por tu cuenta', en: 'Tell a trusted adult and do not go on your own', ca: 'Explicar-ho a un adult de confiança i no anar-hi pel teu compte' },
    '🛟',
    { es: 'Llevar mucho tiempo hablando no significa conocer a alguien: al otro lado puede haber cualquiera. Un adulto que sepa lo que pasa puede acompañarte o parar la cosa a tiempo, y no te va a regañar por contarlo.', en: 'Having talked for a long time is not knowing someone: anyone could be on the other side. An adult who knows what is going on can go with you or stop it in time, and will not tell you off for speaking up.', ca: 'Portar molt de temps parlant no vol dir conèixer algú: a l\'altre costat hi pot haver qualsevol.' }),

  // ── ESTAFAS Y ENGAÑOS ───────────────────────────────────────────────────
  q('is-10', 'primaria',
    { es: '¿Qué es el phishing?', en: 'What is phishing?', ca: 'Què és el phishing?' },
    { es: ['Un engaño que imita a una empresa conocida para robarte datos o contraseñas', 'Un tipo de virus que borra archivos', 'Un juego online', 'Una forma de comprar más barato'], en: ['A scam imitating a known company to steal your data or passwords', 'A virus that deletes files', 'An online game', 'A way to buy cheaper'], ca: ['Un engany que imita una empresa coneguda per robar-te dades o contrasenyes', 'Un tipus de virus que esborra arxius', 'Un joc en línia', 'Una manera de comprar més barat'] },
    { es: 'Un engaño que imita a una empresa conocida para robarte datos o contraseñas', en: 'A scam imitating a known company to steal your data or passwords', ca: 'Un engany que imita una empresa coneguda per robar-te dades o contrasenyes' },
    '🎣',
    { es: 'El nombre viene de "pescar": lanzan miles de mensajes a ver quién pica. Casi siempre llevan prisa ("tu cuenta se bloqueará hoy"), porque el objetivo es que hagas clic antes de pararte a pensar.', en: 'The name comes from fishing: they cast thousands of messages to see who bites. They nearly always carry urgency ("your account will be blocked today"), because the aim is that you click before stopping to think.', ca: 'El nom ve de "pescar": llancen milers de missatges a veure qui pica. Gairebé sempre porten pressa.' }),

  q('is-11', 'primaria',
    { es: 'Te llega un correo diciendo que has ganado un móvil y que pinches en un enlace. ¿Qué haces?', en: 'An email says you have won a phone and asks you to click a link. What do you do?', ca: 'Et arriba un correu dient que has guanyat un mòbil i que cliquis un enllaç. Què fas?' },
    { es: ['Borrarlo: si no has participado en nada, no has ganado nada', 'Pinchar para ver qué es', 'Reenviarlo a tus amigos', 'Contestar preguntando'], en: ['Delete it: if you entered nothing, you won nothing', 'Click to see what it is', 'Forward it to your friends', 'Reply asking about it'], ca: ['Esborrar-lo: si no has participat en res, no has guanyat res', 'Clicar per veure què és', 'Reenviar-lo als teus amics', 'Contestar preguntant'] },
    { es: 'Borrarlo: si no has participado en nada, no has ganado nada', en: 'Delete it: if you entered nothing, you won nothing', ca: 'Esborrar-lo: si no has participat en res, no has guanyat res' },
    '🎁',
    { es: 'Contestar tampoco es inofensivo: confirma que la dirección existe y que alguien la lee, así que llegarán más. La regla más útil de internet sigue siendo que si algo parece demasiado bueno, no es verdad.', en: 'Replying is not harmless either: it confirms the address exists and is read, so more will come. The most useful rule online is still that if something looks too good, it is not true.', ca: 'Contestar tampoc no és inofensiu: confirma que l\'adreça existeix i que algú la llegeix.' }),

  q('is-12', 'primaria',
    { es: '¿De dónde conviene descargar aplicaciones y juegos?', en: 'Where should you download apps and games from?', ca: 'D\'on convé descarregar aplicacions i jocs?' },
    { es: ['De las tiendas oficiales del móvil o el ordenador', 'De cualquier página que los tenga gratis', 'De enlaces que te pasen por chat', 'De la primera web que salga al buscar'], en: ['From the official app stores', 'From any site offering them free', 'From links sent to you in chat', 'From the first site in the search results'], ca: ['De les botigues oficials del mòbil o l\'ordinador', 'De qualsevol pàgina que els tingui gratis', 'D\'enllaços que et passin per xat', 'De la primera web que surti en cercar'] },
    { es: 'De las tiendas oficiales del móvil o el ordenador', en: 'From the official app stores', ca: 'De les botigues oficials del mòbil o l\'ordinador' },
    '📲',
    { es: 'Las tiendas oficiales revisan las aplicaciones antes de publicarlas. Una versión "gratis" de un juego de pago en una web cualquiera suele venir con algo dentro, y ese algo no lo ves hasta que ya está instalado.', en: 'Official stores review apps before publishing them. A "free" version of a paid game on some random site usually carries something inside, and you do not see it until it is installed.', ca: 'Les botigues oficials revisen les aplicacions abans de publicar-les.' }),

  q('is-13', 'primaria',
    { es: 'Un juego online te pide el número de la tarjeta de tus padres para "verificar tu cuenta". ¿Qué haces?', en: 'An online game asks for your parents\' card number to "verify your account". What do you do?', ca: 'Un joc en línia et demana el número de la targeta dels teus pares per "verificar el compte". Què fas?' },
    { es: ['No darlo y avisar a un adulto: ningún juego necesita eso para verificar', 'Darlo, si el juego es conocido', 'Poner un número inventado', 'Preguntar en el chat del juego'], en: ['Do not give it and tell an adult: no game needs that to verify', 'Give it, if the game is well known', 'Make up a number', 'Ask in the game chat'], ca: ['No donar-lo i avisar un adult: cap joc necessita això per verificar', 'Donar-lo, si el joc és conegut', 'Posar un número inventat', 'Preguntar al xat del joc'] },
    { es: 'No darlo y avisar a un adulto: ningún juego necesita eso para verificar', en: 'Do not give it and tell an adult: no game needs that to verify', ca: 'No donar-lo i avisar un adult: cap joc necessita això per verificar' },
    '💳',
    { es: 'Verificar una cuenta no tiene nada que ver con pagar. Los datos bancarios solo se ponen en el momento de comprar algo, en la pantalla de pago de la tienda oficial, y siempre con un adulto delante.', en: 'Verifying an account has nothing to do with paying. Bank details only go in when actually buying, on the official store\'s payment screen, and always with an adult present.', ca: 'Verificar un compte no té res a veure amb pagar. Les dades bancàries només es posen en comprar.' }),

  q('is-14', 'primaria',
    { es: '¿Es seguro hacer compras o entrar al banco desde una wifi pública?', en: 'Is it safe to shop or use online banking on public wifi?', ca: 'És segur fer compres o entrar al banc des d\'una wifi pública?' },
    { es: ['No: mejor esperar a una red de confianza o usar los datos del móvil', 'Sí, si la red tiene contraseña', 'Sí, si es de una cafetería conocida', 'Sí, siempre'], en: ['No: better wait for a trusted network or use mobile data', 'Yes, if the network has a password', 'Yes, if it is a known café', 'Yes, always'], ca: ['No: millor esperar una xarxa de confiança o fer servir les dades del mòbil', 'Sí, si la xarxa té contrasenya', 'Sí, si és d\'una cafeteria coneguda', 'Sí, sempre'] },
    { es: 'No: mejor esperar a una red de confianza o usar los datos del móvil', en: 'No: better wait for a trusted network or use mobile data', ca: 'No: millor esperar una xarxa de confiança o fer servir les dades del mòbil' },
    '📶',
    { es: 'En una red abierta cualquiera puede estar escuchando, e incluso montar una red falsa con el nombre del sitio. Para mirar el tiempo no pasa nada; para meter una contraseña o una tarjeta, mejor no.', en: 'On an open network anyone can be listening, or even set up a fake one using the venue\'s name. For checking the weather it is fine; for entering a password or a card, better not.', ca: 'En una xarxa oberta qualsevol pot estar escoltant, i fins i tot muntar una xarxa falsa amb el nom del lloc.' }),

  // ── CONVIVENCIA Y BULOS ─────────────────────────────────────────────────
  q('is-15', 'primaria',
    { es: 'Un compañero recibe mensajes ofensivos en un grupo de clase. ¿Qué es lo mejor que puedes hacer?', en: 'A classmate is getting offensive messages in a class group. What is best to do?', ca: 'Un company rep missatges ofensius en un grup de classe. Què és el millor que pots fer?' },
    { es: ['Apoyarle, no reenviar nada y contárselo a un adulto', 'Reírte para no quedar mal', 'No hacer nada, no va contigo', 'Contestar tú también a los que insultan'], en: ['Support them, forward nothing and tell an adult', 'Laugh along so as not to stand out', 'Do nothing, it is not your business', 'Insult the attackers back'], ca: ['Donar-li suport, no reenviar res i explicar-ho a un adult', 'Riure per no quedar malament', 'No fer res, no va amb tu', 'Contestar tu també als qui insulten'] },
    { es: 'Apoyarle, no reenviar nada y contárselo a un adulto', en: 'Support them, forward nothing and tell an adult', ca: 'Donar-li suport, no reenviar res i explicar-ho a un adult' },
    '🤝',
    { es: 'El ciberacoso se sostiene por el público: cada reenvío y cada risa lo alimentan. Quien no hace nada tampoco es neutral, y basta con que una persona reaccione distinto para que el grupo cambie.', en: 'Cyberbullying survives on its audience: every forward and every laugh feeds it. Doing nothing is not neutral either, and it takes only one person reacting differently for the group to shift.', ca: 'El ciberassetjament se sosté pel públic: cada reenviament i cada rialla l\'alimenten.' }),

  q('is-16', 'primaria',
    { es: 'Si alguien te acosa por internet, ¿qué NO hay que hacer?', en: 'If someone harasses you online, what should you NOT do?', ca: 'Si algú t\'assetja per internet, què NO cal fer?' },
    { es: ['Contestarle y borrar los mensajes', 'Guardar capturas de pantalla', 'Bloquear a esa persona', 'Contárselo a un adulto'], en: ['Reply and delete the messages', 'Save screenshots', 'Block that person', 'Tell an adult'], ca: ['Contestar-li i esborrar els missatges', 'Guardar captures de pantalla', 'Bloquejar aquella persona', 'Explicar-ho a un adult'] },
    { es: 'Contestarle y borrar los mensajes', en: 'Reply and delete the messages', ca: 'Contestar-li i esborrar els missatges' },
    '🛑',
    { es: 'Contestar suele alimentar el acoso, y borrar destruye la única prueba que hay. El orden correcto es guardar capturas, bloquear, denunciar en la propia aplicación y contarlo a un adulto.', en: 'Replying usually feeds the harassment, and deleting destroys the only evidence there is. The right order is: save screenshots, block, report in the app itself and tell an adult.', ca: 'Contestar sol alimentar l\'assetjament, i esborrar destrueix l\'única prova que hi ha.' }),

  q('is-17', 'primaria',
    { es: 'Ves una noticia increíble en una red social. ¿Cómo compruebas si es verdad?', en: 'You see an incredible news story on social media. How do you check it?', ca: 'Veus una notícia increïble en una xarxa social. Com comproves si és veritat?' },
    { es: ['Buscar si la cuentan medios conocidos y mirar la fecha y la fuente', 'Fijarte en cuántos "me gusta" tiene', 'Creerla si la comparte alguien conocido', 'Compartirla por si acaso'], en: ['Check whether known media report it and look at the date and source', 'Look at how many likes it has', 'Believe it if someone you know shared it', 'Share it just in case'], ca: ['Buscar si ho expliquen mitjans coneguts i mirar la data i la font', 'Fixar-te en quants "m\'agrada" té', 'Creure-la si la comparteix algú conegut', 'Compartir-la per si de cas'] },
    { es: 'Buscar si la cuentan medios conocidos y mirar la fecha y la fuente', en: 'Check whether known media report it and look at the date and source', ca: 'Buscar si ho expliquen mitjans coneguts i mirar la data i la font' },
    '🔍',
    { es: 'Los bulos se comparten más que las noticias ciertas, porque están escritos para indignar. Dos trucos rápidos: mirar la fecha, porque muchos son noticias viejas recicladas, y buscar el titular en un buscador.', en: 'Hoaxes are shared more than true news, because they are written to outrage. Two quick tricks: check the date, since many are recycled old stories, and search the headline.', ca: 'Els bulls es comparteixen més que les notícies certes, perquè estan escrits per indignar.' }),

  q('is-18', 'primaria',
    { es: '¿Por qué conviene descansar de las pantallas?', en: 'Why is it good to take breaks from screens?', ca: 'Per què convé descansar de les pantalles?' },
    { es: ['Porque cansan la vista, quitan horas de sueño y de otras actividades', 'Porque gastan batería', 'Porque son caras', 'Porque no sirven para nada'], en: ['Because they tire your eyes and take hours from sleep and other activities', 'Because they use battery', 'Because they are expensive', 'Because they are useless'], ca: ['Perquè cansen la vista, treuen hores de son i d\'altres activitats', 'Perquè gasten bateria', 'Perquè són cares', 'Perquè no serveixen de res'] },
    { es: 'Porque cansan la vista, quitan horas de sueño y de otras actividades', en: 'Because they tire your eyes and take hours from sleep and other activities', ca: 'Perquè cansen la vista, treuen hores de son i d\'altres activitats' },
    '😴',
    { es: 'La pantalla por la noche retrasa el sueño porque su luz le dice al cerebro que todavía es de día. Y lo que se estudia se fija durmiendo, así que quitarle horas al sueño sale caro por partida doble.', en: 'Screens at night delay sleep because their light tells the brain it is still daytime. And what you study is fixed while you sleep, so cutting sleep costs you twice over.', ca: 'La pantalla de nit endarrereix la son perquè la seva llum diu al cervell que encara és de dia.' }),

  q('is-19', 'primaria',
    { es: '¿Qué son las cookies de una página web?', en: 'What are a website\'s cookies?', ca: 'Què són les galetes d\'una pàgina web?' },
    { es: ['Pequeños archivos que guardan información sobre tu visita', 'Un tipo de virus', 'Anuncios emergentes', 'Imágenes de la web'], en: ['Small files storing information about your visit', 'A kind of virus', 'Pop-up adverts', 'Images on the site'], ca: ['Petits arxius que guarden informació sobre la teva visita', 'Un tipus de virus', 'Anuncis emergents', 'Imatges de la web'] },
    { es: 'Pequeños archivos que guardan información sobre tu visita', en: 'Small files storing information about your visit', ca: 'Petits arxius que guarden informació sobre la teva visita' },
    '🍪',
    { es: 'Algunas son necesarias para que la web funcione, como recordar que has iniciado sesión. Otras sirven para seguirte por internet y enseñarte anuncios: esas se pueden rechazar, y por eso sale el aviso.', en: 'Some are needed for the site to work, like remembering you are logged in. Others track you across the internet to show adverts: those can be refused, which is why the banner appears.', ca: 'Algunes són necessàries perquè la web funcioni. D\'altres serveixen per seguir-te i ensenyar-te anuncis.' }),

  q('is-20', 'primaria',
    { es: 'Alguien te pide por chat una foto tuya en ropa interior o desnudo. ¿Qué haces?', en: 'Someone asks you in chat for a photo of you in underwear or naked. What do you do?', ca: 'Algú et demana per xat una foto teva en roba interior o despullat. Què fas?' },
    { es: ['No enviarla nunca y contárselo enseguida a un adulto de confianza', 'Enviarla si es alguien de confianza', 'Enviarla sin que se te vea la cara', 'Decirle que no y no contárselo a nadie'], en: ['Never send it and tell a trusted adult straight away', 'Send it if you trust them', 'Send it without showing your face', 'Say no and tell nobody'], ca: ['No enviar-la mai i explicar-ho de seguida a un adult de confiança', 'Enviar-la si és algú de confiança', 'Enviar-la sense que se\'t vegi la cara', 'Dir-li que no i no explicar-ho a ningú'] },
    { es: 'No enviarla nunca y contárselo enseguida a un adulto de confianza', en: 'Never send it and tell a trusted adult straight away', ca: 'No enviar-la mai i explicar-ho de seguida a un adult de confiança' },
    '🛡️',
    { es: 'Que un adulto pida algo así a un menor es delito, y la culpa nunca es de quien lo recibe. Contarlo cuanto antes es lo que permite pararlo; callar es justo lo que espera quien lo hace.', en: 'An adult asking a minor for that is a crime, and the fault never lies with the person who received it. Telling someone early is what stops it; staying silent is exactly what the other person is counting on.', ca: 'Que un adult demani això a un menor és delicte, i la culpa mai no és de qui ho rep.' }),

  q('is-21', 'primaria',
    { es: '¿Qué debes hacer antes de aceptar los permisos de una aplicación?', en: 'What should you do before accepting an app\'s permissions?', ca: 'Què has de fer abans d\'acceptar els permisos d\'una aplicació?' },
    { es: ['Mirar qué pide y si tiene sentido para lo que hace la app', 'Aceptar todo para que funcione', 'Aceptar y cambiarlo nunca', 'Rechazar todo siempre'], en: ['Look at what it asks and whether it makes sense for the app', 'Accept everything so it works', 'Accept and never change it', 'Refuse everything always'], ca: ['Mirar què demana i si té sentit per al que fa l\'app', 'Acceptar-ho tot perquè funcioni', 'Acceptar i no canviar-ho mai', 'Rebutjar-ho tot sempre'] },
    { es: 'Mirar qué pide y si tiene sentido para lo que hace la app', en: 'Look at what it asks and whether it makes sense for the app', ca: 'Mirar què demana i si té sentit per al que fa l\'app' },
    '⚙️',
    { es: 'Una linterna no necesita tus contactos ni tu ubicación, y una calculadora tampoco el micrófono. Si lo que pide no encaja con lo que hace, la aplicación está sacando algo más de ti.', en: 'A torch app does not need your contacts or location, and a calculator does not need the microphone. If what it asks does not match what it does, the app is getting something else out of you.', ca: 'Una llanterna no necessita els teus contactes ni la teva ubicació.' }),

  q('is-22', 'primaria',
    { es: '¿Qué significa que un enlace empiece por "https" y tenga un candado?', en: 'What does it mean when a link starts with "https" and shows a padlock?', ca: 'Què significa que un enllaç comenci per "https" i tingui un cadenat?' },
    { es: ['Que la conexión va cifrada, aunque eso no garantiza que la web sea de fiar', 'Que la web es totalmente segura y verdadera', 'Que la web es oficial del gobierno', 'Que no tiene anuncios'], en: ['The connection is encrypted, though that does not make the site trustworthy', 'The site is completely safe and genuine', 'The site is official government', 'It has no adverts'], ca: ['Que la connexió va xifrada, encara que això no garanteix que la web sigui de fiar', 'Que la web és totalment segura i verídica', 'Que la web és oficial del govern', 'Que no té anuncis'] },
    { es: 'Que la conexión va cifrada, aunque eso no garantiza que la web sea de fiar', en: 'The connection is encrypted, though that does not make the site trustworthy', ca: 'Que la connexió va xifrada, encara que això no garanteix que la web sigui de fiar' },
    '🔓',
    { es: 'Es un malentendido muy extendido: el candado dice que nadie espía por el camino, no que al otro lado haya gente honrada. Hoy casi todas las webs de estafa también llevan candado.', en: 'It is a very common misunderstanding: the padlock says nobody is snooping en route, not that honest people are at the other end. Today almost all scam sites have a padlock too.', ca: 'El cadenat diu que ningú no espia pel camí, no que a l\'altre costat hi hagi gent honrada.' }),

  q('is-23', 'primaria',
    { es: 'Antes de escribir algo en un chat de clase, ¿qué conviene preguntarse?', en: 'Before writing something in a class chat, what should you ask yourself?', ca: 'Abans d\'escriure alguna cosa en un xat de classe, què convé preguntar-se?' },
    { es: ['Si se lo dirías a esa persona a la cara', 'Si es gracioso', 'Si van a contestar rápido', 'Si lo entiende todo el mundo'], en: ['Whether you would say it to that person\'s face', 'Whether it is funny', 'Whether they will reply fast', 'Whether everyone will understand it'], ca: ['Si l\'hi diries a aquella persona a la cara', 'Si és graciós', 'Si contestaran ràpid', 'Si ho entén tothom'] },
    { es: 'Si se lo dirías a esa persona a la cara', en: 'Whether you would say it to that person\'s face', ca: 'Si l\'hi diries a aquella persona a la cara' },
    '💬',
    { es: 'Detrás de la pantalla no se ve la cara del otro, y eso hace que se escriban cosas que nadie diría en persona. Además, en un chat no hay tono: una broma se lee como un ataque con muchísima facilidad.', en: 'Behind a screen you cannot see the other person\'s face, so people write things nobody would say out loud. And chat has no tone: a joke reads as an attack very easily.', ca: 'Darrere la pantalla no es veu la cara de l\'altre. I en un xat no hi ha to: una broma es llegeix com un atac.' }),

  q('is-24', 'primaria',
    { es: '¿Qué se puede hacer con un comentario o vídeo que te hace sentir mal?', en: 'What can you do about a comment or video that makes you feel bad?', ca: 'Què es pot fer amb un comentari o vídeo que et fa sentir malament?' },
    { es: ['Denunciarlo en la propia aplicación, bloquear y contarlo', 'Aguantarse', 'Contestar más fuerte', 'Cerrar la cuenta y ya'], en: ['Report it in the app itself, block and tell someone', 'Put up with it', 'Hit back harder', 'Just close your account'], ca: ['Denunciar-ho a la mateixa aplicació, bloquejar i explicar-ho', 'Aguantar-se', 'Contestar més fort', 'Tancar el compte i prou'] },
    { es: 'Denunciarlo en la propia aplicación, bloquear y contarlo', en: 'Report it in the app itself, block and tell someone', ca: 'Denunciar-ho a la mateixa aplicació, bloquejar i explicar-ho' },
    '🚩',
    { es: 'Todas las redes tienen un botón de denuncia, aunque esté escondido en el menú de tres puntos. Cerrar la cuenta no arregla nada y encima te deja sin las pruebas.', en: 'Every network has a report button, even if hidden in the three-dot menu. Closing your account fixes nothing and leaves you without the evidence.', ca: 'Totes les xarxes tenen un botó de denúncia. Tancar el compte no arregla res i et deixa sense proves.' }),

  q('is-25', 'primaria',
    { es: '¿Por qué muchas redes sociales piden tener 14 años o más?', en: 'Why do many social networks require you to be 14 or older?', ca: 'Per què moltes xarxes socials demanen tenir 14 anys o més?' },
    { es: ['Porque a partir de esa edad la ley española permite consentir el uso de tus datos', 'Porque los menores no saben usarlas', 'Porque no hay sitio para todos', 'Es solo una recomendación sin base'], en: ['Because from that age Spanish law lets you consent to your data being used', 'Because minors cannot use them', 'Because there is no room for everyone', 'It is just a baseless recommendation'], ca: ['Perquè a partir d\'aquesta edat la llei espanyola permet consentir l\'ús de les teves dades', 'Perquè els menors no saben fer-les servir', 'Perquè no hi ha lloc per a tothom', 'És només una recomanació sense base'] },
    { es: 'Porque a partir de esa edad la ley española permite consentir el uso de tus datos', en: 'Because from that age Spanish law lets you consent to your data being used', ca: 'Perquè a partir d\'aquesta edat la llei espanyola permet consentir l\'ús de les teves dades' },
    '🔞',
    { es: 'No es un capricho de la empresa: es protección de datos. Por debajo de esa edad hace falta permiso de madre, padre o tutor, porque una cuenta implica ceder información personal a cambio del servicio.', en: 'It is not a company whim: it is data protection. Below that age a parent or guardian must consent, because an account means handing over personal information in exchange for the service.', ca: 'No és un caprici de l\'empresa: és protecció de dades. Per sota d\'aquesta edat cal permís de mare, pare o tutor.' }),

  // ── ESO ─────────────────────────────────────────────────────────────────
  q('is-30', 'eso',
    { es: '¿Qué es el grooming?', en: 'What is grooming?', ca: 'Què és el grooming?' },
    { es: ['Un adulto que gana la confianza de un menor en internet con fines sexuales', 'Un tipo de estafa bancaria', 'Un virus informático', 'Una técnica para posicionar webs'], en: ['An adult gaining a minor\'s trust online for sexual purposes', 'A kind of bank fraud', 'A computer virus', 'A technique for ranking websites'], ca: ['Un adult que guanya la confiança d\'un menor a internet amb finalitats sexuals', 'Un tipus d\'estafa bancària', 'Un virus informàtic', 'Una tècnica per posicionar webs'] },
    { es: 'Un adulto que gana la confianza de un menor en internet con fines sexuales', en: 'An adult gaining a minor\'s trust online for sexual purposes', ca: 'Un adult que guanya la confiança d\'un menor a internet amb finalitats sexuals' },
    '⚠️',
    { es: 'Suele empezar despacio y sin nada raro: interés, halagos, regalos en un juego, y poco a poco secretos que "no hay que contar a nadie". Esa petición de secreto es la señal más clara, y es delito en España.', en: 'It usually starts slowly with nothing odd: interest, flattery, gifts in a game, and gradually secrets "not to tell anyone". That request for secrecy is the clearest sign, and it is a crime in Spain.', ca: 'Sol començar a poc a poc: interès, afalacs, regals en un joc, i secrets que "no s\'han d\'explicar a ningú".' }),

  q('is-31', 'eso',
    { es: 'Alguien amenaza con difundir una imagen íntima tuya si no haces algo. ¿Qué se debe hacer?', en: 'Someone threatens to spread an intimate image of you unless you comply. What should you do?', ca: 'Algú amenaça de difondre una imatge íntima teva si no fas alguna cosa. Què cal fer?' },
    { es: ['No ceder, guardar pruebas y pedir ayuda a un adulto o a la policía', 'Ceder para que no la publique', 'Borrar todo y no contarlo', 'Negociar con esa persona'], en: ['Do not give in, keep evidence and get help from an adult or the police', 'Give in so it is not published', 'Delete everything and tell nobody', 'Negotiate with that person'], ca: ['No cedir, guardar proves i demanar ajuda a un adult o a la policia', 'Cedir perquè no la publiqui', 'Esborrar-ho tot i no explicar-ho', 'Negociar amb aquella persona'] },
    { es: 'No ceder, guardar pruebas y pedir ayuda a un adulto o a la policía', en: 'Do not give in, keep evidence and get help from an adult or the police', ca: 'No cedir, guardar proves i demanar ajuda a un adult o a la policia' },
    '🆘',
    { es: 'Se llama sextorsión y es un delito grave. Ceder nunca funciona: quien extorsiona vuelve a pedir más. La víctima no ha hecho nada malo, y en España el 017 atiende estos casos de forma gratuita y confidencial.', en: 'It is called sextortion and is a serious crime. Giving in never works: the extortionist comes back for more. The victim has done nothing wrong, and in Spain the 017 line handles these cases free and confidentially.', ca: 'Se\'n diu sextorsió i és un delicte greu. Cedir no funciona mai: qui extorsiona torna a demanar més.' }),

  q('is-32', 'eso',
    { es: '¿Qué es una burbuja de filtro en redes sociales?', en: 'What is a filter bubble on social media?', ca: 'Què és una bombolla de filtre a les xarxes socials?' },
    { es: ['Que el algoritmo te enseña sobre todo lo que ya piensas y te gusta', 'Un filtro para las fotos', 'Un modo de privacidad', 'Una carpeta de mensajes'], en: ['The algorithm mostly shows you what you already think and like', 'A photo filter', 'A privacy mode', 'A message folder'], ca: ['Que l\'algoritme t\'ensenya sobretot el que ja penses i t\'agrada', 'Un filtre per a les fotos', 'Un mode de privacitat', 'Una carpeta de missatges'] },
    { es: 'Que el algoritmo te enseña sobre todo lo que ya piensas y te gusta', en: 'The algorithm mostly shows you what you already think and like', ca: 'Que l\'algoritme t\'ensenya sobretot el que ja penses i t\'agrada' },
    '🌀',
    { es: 'La red no busca informarte sino que sigas mirando, y lo que más engancha es lo que confirma lo que ya crees. El efecto es que parece que todo el mundo opina como tú, aunque no sea así.', en: 'The network does not aim to inform you but to keep you watching, and what hooks best is what confirms what you already believe. The effect is that everyone seems to agree with you, when they do not.', ca: 'La xarxa no busca informar-te sinó que continuïs mirant, i el que més enganxa és el que confirma el que ja creus.' }),

  q('is-33', 'eso',
    { es: '¿Qué derecho permite pedir que se retiren datos tuyos obsoletos de un buscador?', en: 'Which right lets you ask a search engine to remove outdated data about you?', ca: 'Quin dret permet demanar que es retirin dades teves obsoletes d\'un cercador?' },
    { es: ['El derecho al olvido', 'El derecho de reunión', 'El derecho de autor', 'El derecho de réplica'], en: ['The right to be forgotten', 'Freedom of assembly', 'Copyright', 'The right of reply'], ca: ['El dret a l\'oblit', 'El dret de reunió', 'El dret d\'autor', 'El dret de rèplica'] },
    { es: 'El derecho al olvido', en: 'The right to be forgotten', ca: 'El dret a l\'oblit' },
    '⚖️',
    { es: 'Está reconocido en la normativa europea de protección de datos. No borra la información de internet, pero obliga al buscador a dejar de enlazarla al buscar tu nombre, que en la práctica es casi lo mismo.', en: 'It is recognised in European data protection law. It does not erase the information from the internet, but it forces the search engine to stop linking it to your name, which in practice is almost the same.', ca: 'No esborra la informació d\'internet, però obliga el cercador a deixar d\'enllaçar-la en buscar el teu nom.' }),

  q('is-34', 'eso',
    { es: 'Compras online en una web que no conoces. ¿Qué señal debería hacerte desconfiar más?', en: 'Buying from an unfamiliar online shop, which sign should worry you most?', ca: 'Compres en línia en una web que no coneixes. Quin senyal t\'hauria de fer desconfiar més?' },
    { es: ['Precios muy por debajo del mercado y solo admite transferencia o bizum', 'Que la web esté en español', 'Que tenga fotos de los productos', 'Que pida tu correo electrónico'], en: ['Prices far below market and only bank transfer accepted', 'That the site is in Spanish', 'That it has product photos', 'That it asks for your email'], ca: ['Preus molt per sota del mercat i només admet transferència o bizum', 'Que la web sigui en català', 'Que tingui fotos dels productes', 'Que demani el teu correu electrònic'] },
    { es: 'Precios muy por debajo del mercado y solo admite transferencia o bizum', en: 'Prices far below market and only bank transfer accepted', ca: 'Preus molt per sota del mercat i només admet transferència o bizum' },
    '🛒',
    { es: 'Esos dos indicios juntos son casi definitivos. La transferencia no tiene vuelta atrás, mientras que una tarjeta permite reclamar al banco: por eso el estafador insiste en cobrar por una vía sin marcha atrás.', en: 'Those two clues together are nearly conclusive. A transfer cannot be reversed, whereas a card lets you claim through the bank: that is why the scammer insists on a one-way payment method.', ca: 'La transferència no té marxa enrere, mentre que una targeta permet reclamar al banc.' }),

  q('is-35', 'eso',
    { es: '¿Qué es un deepfake?', en: 'What is a deepfake?', ca: 'Què és un deepfake?' },
    { es: ['Un vídeo o audio falso generado con inteligencia artificial que parece real', 'Una noticia exagerada', 'Un perfil sin foto', 'Un enlace roto'], en: ['A fake video or audio made with AI that looks real', 'An exaggerated news story', 'A profile with no photo', 'A broken link'], ca: ['Un vídeo o àudio fals generat amb intel·ligència artificial que sembla real', 'Una notícia exagerada', 'Un perfil sense foto', 'Un enllaç trencat'] },
    { es: 'Un vídeo o audio falso generado con inteligencia artificial que parece real', en: 'A fake video or audio made with AI that looks real', ca: 'Un vídeo o àudio fals generat amb intel·ligència artificial que sembla real' },
    '🎭',
    { es: 'Ya no vale el "lo he visto en un vídeo, será verdad". Se usan para estafas —imitando la voz de un familiar pidiendo dinero— y para acosar poniendo la cara de alguien en imágenes que nunca existieron.', en: 'The days of "I saw it in a video so it must be true" are over. They are used for scams — imitating a relative\'s voice asking for money — and for harassment, putting someone\'s face into images that never existed.', ca: 'Ja no val el "ho he vist en un vídeo, serà veritat". S\'usen per a estafes i per assetjar.' }),

  q('is-36', 'eso',
    { es: 'Recibes un SMS de tu banco con un enlace para "desbloquear la cuenta". ¿Qué haces?', en: 'You get a bank SMS with a link to "unblock your account". What do you do?', ca: 'Reps un SMS del teu banc amb un enllaç per "desbloquejar el compte". Què fas?' },
    { es: ['No pinchar y entrar al banco por su app o web escribiéndola tú', 'Pinchar, que viene del número del banco', 'Contestar al SMS preguntando', 'Reenviarlo para consultar'], en: ['Do not click and open the bank through its app or by typing the address yourself', 'Click, it comes from the bank\'s number', 'Reply to the SMS asking', 'Forward it to check'], ca: ['No clicar i entrar al banc per la seva app o web escrivint-la tu', 'Clicar, que ve del número del banc', 'Contestar l\'SMS preguntant', 'Reenviar-lo per consultar'] },
    { es: 'No pinchar y entrar al banco por su app o web escribiéndola tú', en: 'Do not click and open the bank through its app or by typing the address yourself', ca: 'No clicar i entrar al banc per la seva app o web escrivint-la tu' },
    '🏦',
    { es: 'Se llama smishing, y el remitente no prueba nada: se puede falsificar para que el mensaje aparezca en la misma conversación que los SMS reales del banco. Ningún banco pide claves ni códigos por SMS, correo ni teléfono.', en: 'It is called smishing, and the sender proves nothing: it can be spoofed so the message lands in the same thread as the bank\'s real texts. No bank asks for passwords or codes by SMS, email or phone.', ca: 'Se\'n diu smishing, i el remitent no prova res: es pot falsificar perquè aparegui a la mateixa conversa que els SMS reals.' }),

  q('is-37', 'eso',
    { es: '¿Qué conviene hacer si te enteras de que ha habido una filtración de datos de un servicio que usas?', en: 'What should you do if a service you use suffers a data breach?', ca: 'Què convé fer si t\'assabentes que hi ha hagut una filtració de dades d\'un servei que fas servir?' },
    { es: ['Cambiar esa contraseña y también donde la hubieras repetido, y activar la verificación en dos pasos', 'No hacer nada si no te han robado dinero', 'Borrar la aplicación', 'Esperar a que el servicio lo arregle'], en: ['Change that password and anywhere you reused it, and turn on two-step verification', 'Do nothing if no money was taken', 'Delete the app', 'Wait for the service to fix it'], ca: ['Canviar aquella contrasenya i també on l\'haguessis repetit, i activar la verificació en dos passos', 'No fer res si no t\'han robat diners', 'Esborrar l\'aplicació', 'Esperar que el servei ho arregli'] },
    { es: 'Cambiar esa contraseña y también donde la hubieras repetido, y activar la verificación en dos pasos', en: 'Change that password and anywhere you reused it, and turn on two-step verification', ca: 'Canviar aquella contrasenya i també on l\'haguessis repetit, i activar la verificació en dos passos' },
    '🔄',
    { es: 'Los atacantes prueban automáticamente las contraseñas robadas en otros servicios, y por eso una filtración en una tienda cualquiera puede acabar en tu correo. Es exactamente el motivo de no repetir contraseñas.', en: 'Attackers automatically try stolen passwords on other services, which is why a breach at some shop can end up in your email. It is exactly why passwords should not be reused.', ca: 'Els atacants proven automàticament les contrasenyes robades en altres serveis.' }),

]

export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
// El nivel alto usa el banco ENTERO: quien va por ESO también responde las de
// primaria, y filtrando aquí el examen se quedaría en 8 preguntas.
export const PREGUNTAS_ESO = PREGUNTAS
