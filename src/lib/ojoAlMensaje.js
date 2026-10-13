// Ojo al Mensaje (vida práctica · internet seguro).
//
// Llega un mensaje dibujado (SMS, correo, chat, mensaje privado de una red
// social o ventana emergente) y la mecánica tiene dos pasos:
//   1. TOCAR las trampas dentro del propio mensaje: el remitente raro, el
//      enlace falso, la prisa, que te pidan un código… Tocar algo normal
//      cuenta como fallo (si no, bastaría con tocarlo todo).
//   2. Dar el VEREDICTO: de fiar, timo (quieren tus datos o tu dinero) o
//      peligro (acoso, presión o un desconocido que se acerca: pide ayuda).
//
// Reglas para que no haya respuestas discutibles:
//   · Todas las marcas, webs y personas son inventadas.
//   · Los mensajes «de fiar» son de gente conocida y no piden nada raro; no
//     hay correos de empresa «de fiar», porque un correo así puede estar
//     falsificado y enseñaríamos a fiarse por las apariencias.
//   · Un timo y un peligro nunca se mezclan en el mismo mensaje (nada de
//     chantajes con fotos, que serían las dos cosas).
//   · Igual que en el examen de Internet Seguro: ante acoso o un desconocido,
//     la respuesta es siempre contárselo a un adulto de confianza.

const T = (es, en, ca) => ({ es, en, ca })
const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
export const tx = (o, l) => o[l] ?? o.es

export const VEREDICTOS = {
  fiar: { emoji: '✅', nombre: T('Es de fiar', 'It’s safe', 'És de fiar'),
    accion: T('Puedes contestar con normalidad.', 'You can reply as usual.', 'Pots contestar amb normalitat.') },
  timo: { emoji: '🎣', nombre: T('Es un timo', 'It’s a scam', 'És una estafa'),
    accion: T('No pulses nada, no contestes: bórralo y bloquea. Si dudas, pregunta a un adulto.', 'Don’t tap anything or reply: delete and block. If in doubt, ask an adult.', 'No premis res ni contestis: esborra’l i bloqueja. Si dubtes, pregunta a un adult.') },
  ayuda: { emoji: '🙋', nombre: T('Peligro: pide ayuda', 'Danger: get help', 'Perill: demana ajuda'),
    accion: T('No contestes, haz una captura y cuéntaselo a un adulto de confianza.', 'Don’t reply, take a screenshot and tell a trusted adult.', 'No contestis, fes una captura i explica-ho a un adult de confiança.') },
}
export const ORDEN_VEREDICTOS = ['fiar', 'timo', 'ayuda']

export const TRAMPAS = {
  remitente: T('Remitente raro: no es el número ni la cuenta oficial', 'Odd sender: not the official number or account', 'Remitent estrany: no és el número ni el compte oficial'),
  enlace: T('Enlace falso: la dirección no es la de la empresa', 'Fake link: the address isn’t the company’s', 'Enllaç fals: l’adreça no és la de l’empresa'),
  urgencia: T('Prisa y miedo: para que no te pares a pensar', 'Hurry and fear: so you don’t stop to think', 'Pressa i por: perquè no t’aturis a pensar'),
  datos: T('Te pide contraseñas o códigos: nadie de fiar los pide', 'Asks for passwords or codes: no one trustworthy does', 'Et demana contrasenyes o codis: ningú de fiar els demana'),
  dinero: T('Te pide pagar algo que no esperabas', 'Asks you to pay for something unexpected', 'Et demana pagar una cosa que no esperaves'),
  premio: T('Premio imposible: no has participado en nada', 'Impossible prize: you didn’t enter anything', 'Premi impossible: no has participat en res'),
  adjunto: T('Archivo que no esperabas: puede llevar un virus', 'A file you weren’t expecting: it may carry a virus', 'Arxiu que no esperaves: pot portar un virus'),
  desconocido: T('Alguien a quien no conoces en persona', 'Someone you don’t know in real life', 'Algú que no coneixes en persona'),
  personal: T('Pide fotos o dónde vives o estudias', 'Asks for photos or where you live or study', 'Demana fotos o on vius o estudies'),
  secreto: T('Pide que lo guardes en secreto: mala señal siempre', 'Asks you to keep it secret: always a bad sign', 'Demana que ho guardis en secret: mal senyal sempre'),
  quedar: T('Quiere quedar en persona con alguien que no conoces', 'Wants to meet in person when you don’t know them', 'Vol quedar en persona i no el coneixes'),
  amenaza: T('Amenaza o presiona para que hagas algo', 'Threatens or pressures you into doing something', 'Amenaça o pressiona perquè facis alguna cosa'),
  burla: T('Se ríe de alguien delante de todos', 'Mocks someone in front of everyone', 'Es riu d’algú davant de tothom'),
  riesgo: T('Te reta a hacer algo peligroso', 'Dares you to do something dangerous', 'Et repta a fer una cosa perillosa'),
}

// Un segmento: texto (o lista de alternativas) y, si lo es, la trampa.
const N = (...alts) => ({ alts })
const X = (trampa, ...alts) => ({ alts, trampa })

// nivel: desde qué nivel sale. canal: cómo se dibuja. El primer segmento es
// siempre el remitente (o el título, en una ventana emergente).
export const PLANTILLAS = [
  // ── Timos ───────────────────────────────────────────────────────────────
  { id: 'paquete', nivel: 'facil', canal: 'sms', veredicto: 'timo', segs: [
    X('remitente', T('+34 612 384 905', '+44 7700 900 384', '+34 612 384 905'), T('+34 698 201 557', '+44 7700 900 557', '+34 698 201 557')),
    N(T('Envíos Cometa:', 'Comet Parcels:', 'Enviaments Cometa:')),
    N(T('tu paquete no se ha podido entregar.', 'your parcel could not be delivered.', 'el teu paquet no s’ha pogut lliurar.')),
    X('dinero', T('Paga 1,99 € de gastos de reenvío', 'Pay £1.99 for redelivery', 'Paga 1,99 € de despeses de reenviament'), T('Abona 2,49 € de aduanas', 'Pay £2.49 in customs fees', 'Paga 2,49 € de duanes')),
    X('urgencia', T('antes de 24 horas o será devuelto.', 'within 24 hours or it will be returned.', 'abans de 24 hores o serà retornat.')),
    X('enlace', T('envios-cometa.reenvio-pago.top', 'comet-parcels.redelivery-pay.top', 'envios-cometa.reenvio-pago.top'), T('cometa-entregas.info/pagar', 'comet-deliveries.info/pay', 'cometa-entregas.info/pagar')),
  ], porque: T('Las empresas de envíos no cobran por SMS desde un móvil cualquiera. Si esperas un paquete, mira el seguimiento en la web o la app oficial, escribiéndola tú.', 'Delivery firms don’t charge you by text from a random mobile. If you’re expecting a parcel, check tracking on the official site or app, typing it yourself.', 'Les empreses d’enviaments no cobren per SMS des d’un mòbil qualsevol. Si esperes un paquet, mira el seguiment a la web o l’app oficial, escrivint-la tu.') },

  { id: 'banco', nivel: 'facil', canal: 'email', veredicto: 'timo', segs: [
    X('remitente', T('alertas@banco-girasol-seguridad.net', 'alerts@sunflower-bank-security.net', 'alertes@banc-girasol-seguretat.net')),
    N(T('Estimado cliente:', 'Dear customer,', 'Benvolgut client,')),
    N(T('hemos detectado un acceso extraño a su cuenta.', 'we have detected an unusual login to your account.', 'hem detectat un accés estrany al seu compte.')),
    X('urgencia', T('Si no la verifica HOY, quedará bloqueada.', 'If you don’t verify it TODAY, it will be locked.', 'Si no el verifica AVUI, quedarà bloquejat.')),
    X('datos', T('Escriba su contraseña y el código que le llegará por SMS', 'Enter your password and the code we text you', 'Escrigui la seva contrasenya i el codi que li arribarà per SMS')),
    X('enlace', T('👉 girasol-verifica.com/acceso', '👉 sunflower-verify.com/login', '👉 girasol-verifica.com/acces')),
    N(T('Atentamente, Banco Girasol', 'Kind regards, Sunflower Bank', 'Atentament, Banc Girasol')),
  ], porque: T('Un banco nunca te pide la contraseña ni el código del SMS por correo. El miedo a que «se bloquee hoy» es para que pulses sin pensar.', 'A bank never asks for your password or text code by email. The fear of it being “locked today” is to make you tap without thinking.', 'Un banc mai et demana la contrasenya ni el codi de l’SMS per correu. La por que «es bloquegi avui» és perquè premis sense pensar.') },

  { id: 'premio', nivel: 'facil', canal: 'popup', veredicto: 'timo', segs: [
    N(T('🎉 ¡Felicidades!', '🎉 Congratulations!', '🎉 Felicitats!')),
    X('premio', T('Has ganado un móvil nuevo', 'You’ve won a new phone', 'Has guanyat un mòbil nou'), T('Has ganado una consola', 'You’ve won a games console', 'Has guanyat una consola')),
    N(T('Eres nuestro visitante de hoy.', 'You are today’s visitor.', 'Ets el nostre visitant d’avui.')),
    X('datos', T('Escribe tu nombre, dirección y teléfono para recibirlo', 'Enter your name, address and phone number to get it', 'Escriu el teu nom, adreça i telèfon per rebre’l')),
    X('urgencia', T('⏱️ Solo quedan 2:59 minutos', '⏱️ Only 2:59 minutes left', '⏱️ Només queden 2:59 minuts')),
  ], porque: T('Nadie regala un móvil por entrar en una web. Lo que quieren son tus datos (o tu dinero, en el siguiente paso). Cierra la ventana.', 'No one gives away a phone for visiting a website. They want your details (or your money, in the next step). Close the window.', 'Ningú regala un mòbil per entrar en una web. El que volen són les teves dades (o els teus diners, en el pas següent). Tanca la finestra.') },

  { id: 'gemas', nivel: 'facil', canal: 'dm', veredicto: 'timo', segs: [
    X('remitente', T('PixelPlay_Oficial_Free', 'PixelPlay_Official_Free', 'PixelPlay_Oficial_Free'), T('pixelplay.soporte.regalos', 'pixelplay.support.gifts', 'pixelplay.suport.regals')),
    N(T('¡Hola, jugador! 👋', 'Hi, player! 👋', 'Hola, jugador! 👋')),
    N(T('Por nuestro aniversario', 'For our anniversary', 'Pel nostre aniversari')),
    X('premio', T('te regalamos 10.000 gemas', 'we’re giving you 10,000 gems', 'et regalem 10.000 gemmes')),
    X('datos', T('Solo tienes que mandarnos tu usuario y tu contraseña.', 'Just send us your username and password.', 'Només ens has d’enviar el teu usuari i la contrasenya.')),
  ], porque: T('Ningún juego te pide la contraseña para darte nada: con ella te roban la cuenta. Las cuentas oficiales no se llaman «Oficial_Free».', 'No game asks for your password to give you anything: with it they steal your account. Official accounts aren’t called “Official_Free”.', 'Cap joc et demana la contrasenya per donar-te res: amb ella et roben el compte. Els comptes oficials no es diuen «Oficial_Free».') },

  { id: 'adjunto', nivel: 'medio', canal: 'email', veredicto: 'timo', segs: [
    X('remitente', T('facturas@envio-factura24.com', 'invoices@send-invoice24.com', 'factures@envia-factura24.com')),
    N(T('Hola:', 'Hello,', 'Hola,')),
    N(T('le enviamos la factura de su compra.', 'please find the invoice for your purchase.', 'li enviem la factura de la seva compra.')),
    X('adjunto', T('📎 factura_0423.zip', '📎 invoice_0423.zip', '📎 factura_0423.zip'), T('📎 recibo_pago.exe', '📎 payment_receipt.exe', '📎 rebut_pagament.exe')),
    X('urgencia', T('Ábrala hoy o se le cobrará un recargo.', 'Open it today or a surcharge will apply.', 'Obri-la avui o se li cobrarà un recàrrec.')),
  ], porque: T('Una factura de algo que no has comprado, en un archivo comprimido o ejecutable, es la forma clásica de colar un virus. No lo abras.', 'An invoice for something you didn’t buy, in a zip or program file, is the classic way to slip in a virus. Don’t open it.', 'Una factura d’una cosa que no has comprat, en un arxiu comprimit o executable, és la manera clàssica de colar un virus. No l’obris.') },

  { id: 'amigo-hackeado', nivel: 'medio', canal: 'chat', veredicto: 'timo', segs: [
    N(T('Lucía', 'Lucy', 'Lucía'), T('Hugo', 'Hugo', 'Hugo')),
    N(T('¡Holaaa! 😊', 'Hiii! 😊', 'Holaaa! 😊')),
    N(T('Me he cambiado de móvil', 'I’ve got a new phone', 'He canviat de mòbil')),
    X('datos', T('y te va a llegar un código de 6 cifras por SMS, ¿me lo pasas?', 'and you’ll get a 6-digit code by text, can you send it to me?', 'i et arribarà un codi de 6 xifres per SMS, me’l passes?')),
    X('urgencia', T('Es urgente, porfa, rápido', 'It’s urgent, please, quick', 'És urgent, si us plau, ràpid')),
  ], porque: T('Aunque salga el nombre de tu amiga, alguien ha podido robarle la cuenta. Ese código sirve para robarte la tuya. Llámala para comprobarlo.', 'Even if it shows your friend’s name, someone may have stolen their account. That code is for stealing yours. Call them to check.', 'Encara que surti el nom de la teva amiga, algú li pot haver robat el compte. Aquest codi serveix per robar-te el teu. Truca-la per comprovar-ho.') },

  { id: 'suscripcion', nivel: 'medio', canal: 'sms', veredicto: 'timo', segs: [
    X('remitente', T('+34 744 019 362', '+44 7700 900 362', '+34 744 019 362')),
    N(T('StreamCine:', 'StreamCine:', 'StreamCine:')),
    N(T('no hemos podido cobrar tu suscripción.', 'we couldn’t take your subscription payment.', 'no hem pogut cobrar la teva subscripció.')),
    X('datos', T('Vuelve a escribir los datos de la tarjeta', 'Re-enter your card details', 'Torna a escriure les dades de la targeta')),
    X('enlace', T('streamcine.pagos-renovar.co', 'streamcine.renew-payments.co', 'streamcine.pagaments-renovar.co')),
  ], porque: T('Si de verdad hay un problema con un pago, lo verás entrando tú en la app. Un SMS con un enlace que pide la tarjeta es un timo.', 'If there really is a payment problem, you’ll see it by opening the app yourself. A text with a link asking for your card is a scam.', 'Si de debò hi ha un problema amb un pagament, el veuràs entrant tu a l’app. Un SMS amb un enllaç que demana la targeta és una estafa.') },

  { id: 'sorteo-influencer', nivel: 'medio', canal: 'dm', veredicto: 'timo', segs: [
    X('remitente', T('mario.gamer.oficiall', 'mario.gamer.officiall', 'mario.gamer.oficiall')),
    N(T('¡Gracias por seguirme! 💛', 'Thanks for following me! 💛', 'Gràcies per seguir-me! 💛')),
    X('premio', T('Has ganado mi sorteo de unos cascos', 'You’ve won my headphones giveaway', 'Has guanyat el meu sorteig d’uns auriculars')),
    X('dinero', T('Para enviártelos paga 3 € de envío aquí', 'To ship them, pay £3 postage here', 'Per enviar-te’ls paga 3 € d’enviament aquí')),
  ], porque: T('Es una cuenta que copia la de alguien famoso (fíjate en la letra repetida). Un premio de verdad nunca te pide pagar para recibirlo.', 'It’s an account copying someone famous (look at the repeated letter). A real prize never asks you to pay to get it.', 'És un compte que copia el d’algú famós (fixa’t en la lletra repetida). Un premi de debò mai et demana pagar per rebre’l.') },

  { id: 'banco-sutil', nivel: 'dificil', canal: 'sms', veredicto: 'timo', segs: [
    N(T('Banco Girasol', 'Sunflower Bank', 'Banc Girasol')),
    N(T('Se ha añadido un nuevo dispositivo a tu cuenta.', 'A new device has been added to your account.', 'S’ha afegit un dispositiu nou al teu compte.')),
    N(T('Si no has sido tú,', 'If this wasn’t you,', 'Si no has estat tu,')),
    X('enlace', T('cancélalo en bancogirasol.es-cancelar.com', 'cancel it at sunflowerbank.co.uk-cancel.com', 'cancel·la’l a bancgirasol.cat-cancellar.com'), T('cancélalo en banco-giraso1.com', 'cancel it at sunflower-bank1.com', 'cancel·la’l a banc-giraso1.com')),
  ], porque: T('El nombre del banco puede salir bien escrito como remitente: se puede falsificar. Lo que delata el timo es la dirección: lo que va justo antes de .com no es la web del banco. Entra tú en la app.', 'The bank’s name can appear correctly as the sender: it can be faked. What gives the scam away is the address: what comes right before .com isn’t the bank’s site. Open the app yourself.', 'El nom del banc pot sortir ben escrit com a remitent: es pot falsificar. El que delata l’estafa és l’adreça: el que va just abans de .com no és la web del banc. Entra tu a l’app.') },

  { id: 'trabajo', nivel: 'dificil', canal: 'chat', veredicto: 'timo', segs: [
    X('remitente', T('+1 (555) 019-3422', '+1 (555) 019-3422', '+1 (555) 019-3422')),
    N(T('Hola, soy Laura, de Recursos Humanos 😊', 'Hi, I’m Laura from HR 😊', 'Hola, soc la Laura, de Recursos Humans 😊')),
    X('premio', T('Ganarás 300 € al día dando «me gusta» a vídeos', 'Earn £300 a day liking videos', 'Guanyaràs 300 € al dia fent «m’agrada» a vídeos')),
    X('dinero', T('Para empezar, solo tienes que hacer un ingreso de 20 €', 'To start, you just need to pay in £20', 'Per començar, només cal que facis un ingrés de 20 €')),
  ], porque: T('Un trabajo que paga mucho por casi nada y en el que primero pagas tú no es un trabajo: es un timo. Y te escribe un número extranjero que no conoces.', 'A job that pays a lot for almost nothing, where you pay first, isn’t a job: it’s a scam. And it’s a foreign number you don’t know.', 'Una feina que paga molt per gairebé res i on primer pagues tu no és una feina: és una estafa. I t’escriu un número estranger que no coneixes.') },

  // ── Peligros: pide ayuda ───────────────────────────────────────────────
  { id: 'desconocido-fotos', nivel: 'facil', canal: 'dm', veredicto: 'ayuda', segs: [
    X('desconocido', T('dani_2010 · no os seguís', 'dani_2010 · you don’t follow each other', 'dani_2010 · no us seguiu')),
    N(T('Hola 😊 he visto tus vídeos, molan mucho.', 'Hi 😊 I saw your videos, they’re really cool.', 'Hola 😊 he vist els teus vídeos, molen molt.')),
    X('personal', T('¿A qué instituto vas?', 'Which school do you go to?', 'A quin institut vas?'), T('¿Por qué barrio vives?', 'Which area do you live in?', 'Per quin barri vius?')),
    X('personal', T('Mándame una foto tuya', 'Send me a photo of you', 'Envia’m una foto teva')),
    X('secreto', T('pero no se lo digas a tus padres, que no lo entienden.', 'but don’t tell your parents, they won’t get it.', 'però no ho diguis als teus pares, que no ho entenen.')),
  ], porque: T('Un desconocido que pide fotos y datos y además pide secreto es la señal más clara de peligro. No contestes y cuéntaselo a un adulto: no te vas a meter en ningún lío.', 'A stranger asking for photos and details, and for secrecy too, is the clearest danger sign. Don’t reply and tell an adult: you won’t be in any trouble.', 'Un desconegut que demana fotos i dades i a més demana secret és el senyal més clar de perill. No contestis i explica-ho a un adult: no et ficaràs en cap embolic.') },

  { id: 'quedar', nivel: 'facil', canal: 'chat', veredicto: 'ayuda', segs: [
    X('desconocido', T('Alex · amigo del juego online', 'Alex · friend from the online game', 'Alex · amic del joc en línia')),
    N(T('Llevamos semanas jugando juntos 😄', 'We’ve been playing together for weeks 😄', 'Fa setmanes que juguem junts 😄')),
    X('quedar', T('¿Quedamos el sábado en el centro comercial?', 'Shall we meet at the shopping centre on Saturday?', 'Quedem dissabte al centre comercial?')),
    X('secreto', T('No vengas con nadie, ni hace falta que lo sepa nadie.', 'Don’t bring anyone, and no one needs to know.', 'No vinguis amb ningú, ni cal que ho sàpiga ningú.')),
  ], porque: T('Jugar juntos no es conocerse: detrás puede haber cualquiera. Nunca quedes a solas con alguien de internet, y menos en secreto. Cuéntaselo a un adulto.', 'Playing together isn’t knowing each other: anyone could be behind it. Never meet someone from the internet alone, let alone in secret. Tell an adult.', 'Jugar junts no és conèixer-se: al darrere hi pot haver qualsevol. Mai quedis sol amb algú d’internet, i encara menys en secret. Explica-ho a un adult.') },

  { id: 'acoso-grupo', nivel: 'medio', canal: 'grupo', veredicto: 'ayuda', segs: [
    N(T('Grupo 3ºB 🤪', 'Class 3B group 🤪', 'Grup 3rB 🤪')),
    N(T('Marta: ¿quién tiene los deberes de mates?', 'Martha: who’s got the maths homework?', 'Marta: qui té els deures de mates?')),
    X('amenaza', T('Pablo: o nos los pasas o subimos esa foto tuya', 'Paul: send them or we post that photo of you', 'Pau: o ens els passes o pengem aquella foto teva')),
    X('burla', T('Pablo: 😂😂 se va a reír todo el insti', 'Paul: 😂😂 the whole school will laugh', 'Pau: 😂😂 se’n riurà tot l’insti')),
    N(T('Marta: ¿alguien sabe a qué hora es la excursión?', 'Martha: does anyone know what time the trip is?', 'Marta: algú sap a quina hora és l’excursió?')),
  ], porque: T('Amenazar con subir una foto y reírse en grupo es ciberacoso, aunque lo hagan compañeros. No respondas con insultos: guarda una captura y cuéntaselo a un adulto o a un profe.', 'Threatening to post a photo and laughing as a group is cyberbullying, even from classmates. Don’t hit back with insults: save a screenshot and tell an adult or a teacher.', 'Amenaçar de penjar una foto i riure’s en grup és ciberassetjament, encara que ho facin companys. No responguis amb insults: guarda una captura i explica-ho a un adult o a un professor.') },

  { id: 'reto', nivel: 'medio', canal: 'dm', veredicto: 'ayuda', segs: [
    X('desconocido', T('reto_semanal_ok · no os seguís', 'weekly_dare_ok · you don’t follow each other', 'repte_setmanal_ok · no us seguiu')),
    N(T('¿Te atreves con el reto de esta semana? 🔥', 'Dare to do this week’s challenge? 🔥', 'T’atreveixes amb el repte d’aquesta setmana? 🔥')),
    X('riesgo', T('Aguanta sin respirar un minuto y grábalo', 'Hold your breath for a minute and film it', 'Aguanta sense respirar un minut i grava-ho'), T('Salta de un muro alto y grábalo', 'Jump off a high wall and film it', 'Salta d’un mur alt i grava-ho')),
    X('amenaza', T('Si no lo haces, todos sabrán que te has rajado.', 'If you don’t, everyone will know you chickened out.', 'Si no ho fas, tothom sabrà que t’has fet enrere.')),
  ], porque: T('Los retos peligrosos de internet han causado accidentes graves. Nadie tiene derecho a presionarte. Cuéntaselo a un adulto.', 'Dangerous internet challenges have caused serious accidents. No one has the right to pressure you. Tell an adult.', 'Els reptes perillosos d’internet han causat accidents greus. Ningú té dret a pressionar-te. Explica-ho a un adult.') },

  { id: 'falso-amigo', nivel: 'dificil', canal: 'dm', veredicto: 'ayuda', segs: [
    X('desconocido', T('sara.13 · 2 amigos en común', 'sara.13 · 2 mutual friends', 'sara.13 · 2 amics en comú')),
    N(T('Holaa, conoces a Irene, ¿no? 😊', 'Hiya, you know Irene, right? 😊', 'Holaa, coneixes la Irene, oi? 😊')),
    N(T('Yo también tengo 13.', 'I’m 13 too.', 'Jo també en tinc 13.')),
    X('personal', T('¿Me pasas tu número para hablar por otra app?', 'Can you give me your number so we can chat on another app?', 'Em passes el teu número per parlar per una altra app?')),
    X('secreto', T('Mejor que no se entere nadie, que son muy cotillas.', 'Best not tell anyone, they’re so nosy.', 'Millor que no se n’assabenti ningú, que són molt xafarders.')),
  ], porque: T('Tener amigos en común no significa que sea quien dice ser: la edad y la foto se pueden inventar. Pedir pasar a otra app y guardar el secreto es la señal. Pide ayuda.', 'Mutual friends don’t mean they are who they say: age and photo can be made up. Asking to move to another app and keep it secret is the sign. Get help.', 'Tenir amics en comú no vol dir que sigui qui diu ser: l’edat i la foto es poden inventar. Demanar passar a una altra app i guardar el secret és el senyal. Demana ajuda.') },

  // ── De fiar: no hay nada que tocar ─────────────────────────────────────
  { id: 'mama', nivel: 'medio', canal: 'chat', veredicto: 'fiar', segs: [
    N(T('Mamá', 'Mum', 'Mama'), T('Papá', 'Dad', 'Papa')),
    N(T('Llego a las 8.', 'I’ll be home at 8.', 'Arribo a les 8.'), T('Salgo ya del trabajo.', 'Just leaving work.', 'Ja surto de la feina.')),
    N(T('¿Has sacado al perro?', 'Have you walked the dog?', 'Has tret el gos?'), T('¿Has hecho los deberes?', 'Have you done your homework?', 'Has fet els deures?')),
    N(T('Te quiero 😘', 'Love you 😘', 'T’estimo 😘')),
  ], porque: T('Es alguien de tu familia y no te pide nada raro: ni códigos, ni dinero, ni secretos.', 'It’s family and asks for nothing odd: no codes, no money, no secrets.', 'És algú de la teva família i no et demana res estrany: ni codis, ni diners, ni secrets.') },

  { id: 'grupo-clase', nivel: 'medio', canal: 'grupo', veredicto: 'fiar', segs: [
    N(T('Grupo 3ºB 🤪', 'Class 3B group 🤪', 'Grup 3rB 🤪')),
    N(T('Lucía: mañana es la excursión', 'Lucy: the trip is tomorrow', 'Lucía: demà és l’excursió')),
    N(T('Lucía: acordaos de traer la autorización firmada', 'Lucy: remember the signed permission slip', 'Lucía: recordeu portar l’autorització signada')),
    N(T('Hugo: y el almuerzo 🥪', 'Hugo: and lunch 🥪', 'Hugo: i l’esmorzar 🥪')),
  ], porque: T('Compañeros de clase hablando de clase: no hay enlaces, ni presión, ni nadie que se ría de nadie.', 'Classmates talking about school: no links, no pressure, no one mocking anyone.', 'Companys de classe parlant de classe: no hi ha enllaços, ni pressió, ni ningú que es rigui de ningú.') },

  { id: 'partido', nivel: 'dificil', canal: 'chat', veredicto: 'fiar', segs: [
    N(T('Iker', 'Jack', 'Iker')),
    N(T('¡¡Corre!!', 'Hurry!!', 'Corre!!')),
    N(T('El partido empieza a las 5', 'The match starts at 5', 'El partit comença a les 5')),
    N(T('y aún no has llegado 😂', 'and you’re still not here 😂', 'i encara no has arribat 😂')),
    N(T('Trae el balón.', 'Bring the ball.', 'Porta la pilota.')),
  ], porque: T('Hay prisa, pero es un amigo que conoces y no te pide datos, ni dinero, ni pulsar nada. La prisa solo es sospechosa cuando viene con algo de eso.', 'There’s a rush, but it’s a friend you know and he asks for no details, money or taps. Hurry is only suspicious when it comes with one of those.', 'Hi ha pressa, però és un amic que coneixes i no et demana dades, ni diners, ni prémer res. La pressa només és sospitosa quan ve amb alguna d’aquestes coses.') },

  { id: 'abuela', nivel: 'dificil', canal: 'chat', veredicto: 'fiar', segs: [
    N(T('Abuela', 'Grandma', 'Àvia')),
    N(T('¡Feliz cumpleaños, cariño! 🎂', 'Happy birthday, sweetheart! 🎂', 'Per molts anys, carinyo! 🎂')),
    N(T('Te he comprado un regalo', 'I’ve bought you a present', 'T’he comprat un regal')),
    N(T('y te lo doy el domingo en la comida.', 'and I’ll give it to you at Sunday lunch.', 'i te’l dono diumenge al dinar.')),
  ], porque: T('Un regalo no es un «premio imposible» cuando viene de tu abuela y te lo da en persona. No pide nada a cambio.', 'A present isn’t an “impossible prize” when it’s from your grandma and she gives it to you in person. She asks for nothing in return.', 'Un regal no és un «premi impossible» quan ve de la teva àvia i te’l dona en persona. No demana res a canvi.') },

  { id: 'profe', nivel: 'dificil', canal: 'email', veredicto: 'fiar', segs: [
    N(T('Carmen (tutora de 3ºB)', 'Ms Carter (3B form tutor)', 'Carme (tutora de 3rB)')),
    N(T('Hola a todos:', 'Hello everyone,', 'Hola a tothom,')),
    N(T('el examen de Lengua pasa al jueves.', 'the English test moves to Thursday.', 'l’examen de Llengua passa a dijous.')),
    N(T('Repasad el tema 4 del libro.', 'Revise unit 4 in the book.', 'Repasseu el tema 4 del llibre.')),
    N(T('Un saludo, Carmen', 'Best wishes, Ms Carter', 'Salutacions, Carme')),
  ], porque: T('Es tu tutora, habla de algo de clase y no te pide pulsar, pagar ni dar ningún dato.', 'It’s your form tutor, about school, and asks you to tap, pay or share nothing.', 'És la teva tutora, parla d’una cosa de classe i no et demana prémer, pagar ni donar cap dada.') },
]

const ORDEN_NIVEL = ['facil', 'medio', 'dificil']
export const NIVELES = {
  facil:   { cuenta: true },  // se ve cuántas trampas hay; sin mensajes de fiar
  medio:   { cuenta: false },
  dificil: { cuenta: false },
}
// Cuántos toques en algo normal se perdonan antes de dar la ronda por mala.
export const FALLOS_PERMITIDOS = 1

export const plantillasDe = nivel => PLANTILLAS.filter(p => {
  if (nivel === 'facil') return p.nivel === 'facil'
  return ORDEN_NIVEL.indexOf(p.nivel) <= ORDEN_NIVEL.indexOf(nivel)
})

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
let seq = 0
const recientes = []

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const pool = plantillasDe(nivel)
  // En difícil, que los mensajes nuevos de su nivel salgan más a menudo.
  const peso = p => (nivel === 'dificil' && p.nivel === 'dificil' ? 2 : 1)
  const bolsa = pool.flatMap(p => Array(peso(p)).fill(p))
  let p
  for (let i = 0; i < 30; i++) { p = elige(rand, bolsa); if (!recientes.includes(p.id)) break }
  recientes.push(p.id)
  if (recientes.length > Math.min(6, pool.length - 2)) recientes.shift()
  const segs = p.segs.map((sg, i) => ({ i, t: elige(rand, sg.alts), trampa: sg.trampa ?? null }))
  return {
    id: ++seq, nivel, plantilla: p.id, canal: p.canal, segs,
    trampas: segs.filter(x => x.trampa).length,
    bueno: p.veredicto, veredicto: p.veredicto,
    cuenta: NIVELES[nivel]?.cuenta ?? false,
  }
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)

// La respuesta llega como texto «veredicto:faltan:fallos» (así cabe en el
// examen, que guarda una respuesta por pregunta).
export const respuesta = (veredicto, faltan, fallos) => `${veredicto}:${faltan}:${fallos}`
export function leeRespuesta(o) {
  const [veredicto, faltan, fallos] = String(o).split(':')
  return { veredicto, faltan: +faltan || 0, fallos: +fallos || 0 }
}
export function esCorrecta(r, o) {
  const a = leeRespuesta(o)
  return a.veredicto === r.veredicto && a.faltan === 0 && a.fallos <= FALLOS_PERMITIDOS
}

// ── Textos ────────────────────────────────────────────────────────────────
export const plantilla = r => PLANTILLAS.find(p => p.id === r.plantilla)
export function enunciado(r, l) {
  if (r.cuenta) return s(l, `Toca las ${r.trampas} trampas y decide qué es`, `Tap the ${r.trampas} traps and decide what it is`, `Toca les ${r.trampas} trampes i decideix què és`)
  return s(l, 'Toca lo sospechoso (si lo hay) y decide qué es', 'Tap anything suspicious (if any) and decide what it is', 'Toca el que és sospitós (si n’hi ha) i decideix què és')
}
export function explicacion(r, l) {
  return `${tx(plantilla(r).porque, l)} ${tx(VEREDICTOS[r.veredicto].accion, l)}`
}
export function motivoFallo(r, o, l) {
  const a = leeRespuesta(o)
  if (a.veredicto !== r.veredicto) return null
  if (a.faltan) return s(l, `Bien visto, pero se te ${a.faltan === 1 ? 'escapó una trampa' : `escaparon ${a.faltan} trampas`}.`, `Right call, but you missed ${a.faltan === 1 ? 'one trap' : `${a.faltan} traps`}.`, `Ben vist, però se t’${a.faltan === 1 ? 'ha escapat una trampa' : `han escapat ${a.faltan} trampes`}.`)
  if (a.fallos > FALLOS_PERMITIDOS) return s(l, 'Bien visto, pero marcaste demasiadas cosas normales.', 'Right call, but you flagged too many normal things.', 'Ben vist, però vas marcar massa coses normals.')
  return null
}
export function schemaQuestion(r, l) {
  const texto = r.segs.map(x => tx(x.t, l)).join(' ')
  return {
    question: `«${texto}» ${s(l, '¿Qué es este mensaje?', 'What is this message?', 'Què és aquest missatge?')}`,
    correctAnswer: tx(VEREDICTOS[r.veredicto].nombre, l),
    wrongAnswers: ORDEN_VEREDICTOS.filter(v => v !== r.veredicto).map(v => tx(VEREDICTOS[v].nombre, l)),
  }
}
