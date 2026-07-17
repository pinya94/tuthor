// ── Mazo de eventos de "Spicy" ───────────────────────────────────────────────
// Cada evento: ventana de edad, texto {es,en,ca}, señales de riesgo visibles
// y opciones cuya función aplicar(p, ctx) muta la partida. Los números de
// riesgo van SIEMPRE ocultos dentro de los activos (oculto: {...}); el jugador
// solo ve las señales. Ver src/lib/spicyEngine.js (SENALES y crearCtx).
//
// Cantidades: en € "de hoy" (año 0 de la partida); el motor las escala con la
// inflación acumulada. En los textos, {nombre} se interpola ya escalado.
//
// `texto` (del evento o de una opción) puede ser un objeto {es,en,ca} o una
// función (p) => {es,en,ca} para texto que depende del estado de la partida.
// Cuando el texto de una opción muestra un sueldo/precio que también se
// aplica en `aplicar`, usar escala(p, mismaBase) en ambos sitios: así la
// etiqueta nunca se desincroniza de lo que realmente se cobra o se paga.
import { escala, fmt, techoSalarial, pensionDesde } from '../lib/spicyEngine'

export const EVENTOS = [

  // ══ INFANCIA (6-15) ══════════════════════════════════════════════════════
  {
    id: 'cromo-especial',
    edad: [8, 9],
    prob: 0.5,
    cantidades: { precio: 10 },
    texto: {
      es: 'En el patio venden un cromo de edición limitada de tu ídolo. Cuesta {precio} — toda tu paga del mes. Tu amigo dice que "algún día valdrá una fortuna".',
      en: 'A limited-edition trading card of your idol is for sale at school. It costs {precio} — your whole monthly allowance. Your friend says "one day it\'ll be worth a fortune".',
      ca: 'Al pati venen un cromo d\'edició limitada del teu ídol. Costa {precio} — tota la paga del mes. El teu amic diu que "algun dia valdrà una fortuna".',
    },
    opciones: [
      {
        id: 'comprar',
        texto: { es: 'Comprarlo — es único', en: 'Buy it — it\'s unique', ca: 'Comprar-lo — és únic' },
        aplicar: (p, ctx) => {
          if (!ctx.puedePagar(ctx.cant('precio'))) {
            return { rechazo: true, nota: { es: 'No te llega la paga para el cromo — y a los 8 años nadie te fía. Te quedas mirándolo. Aprender que sin dinero no hay compra también es aprender.', en: 'Your allowance isn\'t enough for the card — and at 8 nobody lends you money. You just stare at it. Learning that no money means no purchase is learning too.', ca: 'No t\'arriba la paga per al cromo — i als 8 anys ningú et fia. Et quedes mirant-lo. Aprendre que sense diners no hi ha compra també és aprendre.' } }
          }
          ctx.dinero(-ctx.cant('precio'))
          // El destino del cromo se decide AHORA con la seed (30% se revaloriza)
          ctx.flag(ctx.rng() < 0.3 ? 'cromo-bueno' : 'cromo-malo')
          ctx.flag('cromo')
          return { nota: { es: 'El cromo es tuyo. ¿Inversión o capricho? El tiempo lo dirá.', en: 'The card is yours. Investment or whim? Time will tell.', ca: 'El cromo és teu. Inversió o caprici? El temps ho dirà.' } }
        },
      },
      {
        id: 'hucha',
        texto: { es: 'A la hucha', en: 'Into the piggy bank', ca: 'A la guardiola' },
        aplicar: () => ({ nota: { es: 'Tu paga sigue en la hucha. Aburrido, pero sigue ahí.', en: 'Your allowance stays in the piggy bank. Boring, but still there.', ca: 'La paga segueix a la guardiola. Avorrit, però segueix allà.' } }),
      },
    ],
  },
  {
    id: 'consola-segunda-mano',
    edad: [8, 9],
    prob: 0.5,
    cantidades: { precio: 12 },
    texto: {
      es: 'Tu prima mayor vende su consola vieja por {precio} — "funciona perfecta", dice. Nueva costaría cinco veces más. Sin garantía, claro.',
      en: 'Your older cousin is selling her old console for {precio} — "works perfectly", she says. New it would cost five times more. No warranty, of course.',
      ca: 'La teva cosina gran ven la seva consola vella per {precio} — "funciona perfecta", diu. Nova costaria cinc vegades més. Sense garantia, és clar.',
    },
    opciones: [
      {
        id: 'comprar',
        texto: { es: 'Comprársela', en: 'Buy it from her', ca: 'Comprar-la-hi' },
        aplicar: (p, ctx) => {
          if (!ctx.puedePagar(ctx.cant('precio'))) {
            return { rechazo: true, nota: { es: 'No te llega. Tu prima se la vende a otro primo. Sin dinero no hay trato — a ninguna edad, pero de niño menos.', en: 'You can\'t afford it. Your cousin sells it to another cousin. No money, no deal — at any age, but as a kid even more so.', ca: 'No t\'arriba. La teva cosina la ven a un altre cosí. Sense diners no hi ha tracte — a qualsevol edat, però de nen menys.' } }
          }
          ctx.dinero(-ctx.cant('precio'))
          if (ctx.rng() < 0.7) {
            ctx.bienestar(5)
            return { nota: { es: 'Funciona de maravilla: tardes enteras de juego por una fracción del precio. Comprar de segunda mano tiene riesgo — esta vez pagó.', en: 'Works like a charm: whole afternoons of gaming for a fraction of the price. Buying second-hand has risk — this time it paid.', ca: 'Funciona de meravella: tardes senceres de joc per una fracció del preu. Comprar de segona mà té risc — aquesta vegada va pagar.' } }
          }
          ctx.bienestar(-3)
          return { nota: { es: 'A las tres semanas no enciende. Sin garantía no hay reclamación: lo barato a veces sale caro… y a veces no — hoy no fue tu día.', en: 'Three weeks in, it won\'t turn on. No warranty, no claim: cheap sometimes turns out expensive… and sometimes not — today wasn\'t your day.', ca: 'A les tres setmanes no s\'encén. Sense garantia no hi ha reclamació: el barat de vegades surt car… i de vegades no — avui no va ser el teu dia.' } }
        },
      },
      {
        id: 'no',
        texto: { es: 'Seguir ahorrando', en: 'Keep saving', ca: 'Seguir estalviant' },
        aplicar: () => ({ nota: { es: 'La hucha sigue intacta. La consola de tu prima acabará en otras manos — a saber si funcionaba.', en: 'The piggy bank stays intact. Your cousin\'s console will end up in other hands — who knows if it worked.', ca: 'La guardiola segueix intacta. La consola de la teva cosina acabarà en altres mans — vés a saber si funcionava.' } }),
      },
    ],
  },
  {
    id: 'puesto-limonada',
    edad: [10, 11],
    prob: 0.5,
    cantidades: { material: 15 },
    texto: {
      es: 'Fiesta del barrio este finde. Se te ocurre montar un puesto de limonada y galletas: el material cuesta {material} de tu hucha. Puede petarlo… o puede llover.',
      en: 'Neighbourhood fair this weekend. You think of setting up a lemonade-and-cookies stand: supplies cost {material} from your piggy bank. It could be a hit… or it could rain.',
      ca: 'Festa del barri aquest cap de setmana. Se t\'acut muntar una parada de llimonada i galetes: el material costa {material} de la teva guardiola. Pot petar-ho… o pot ploure.',
    },
    opciones: [
      {
        id: 'montar',
        texto: { es: 'Montar el puesto ({material})', en: 'Set up the stand ({material})', ca: 'Muntar la parada ({material})' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('material')
          if (!ctx.puedePagar(c)) {
            return { rechazo: true, nota: { es: 'No tienes ni para el material. Sin dinero no se monta ni un puesto de limonada — el primer capital siempre es el más difícil.', en: 'You can\'t even cover the supplies. No money, not even a lemonade stand — the first capital is always the hardest.', ca: 'No tens ni per al material. Sense diners no es munta ni una parada de llimonada — el primer capital sempre és el més difícil.' } }
          }
          ctx.dinero(-c)
          const r = ctx.rng()
          if (r < 0.5) {
            ctx.dinero(c * 3)
            ctx.bienestar(5)
            return { nota: { es: 'Se vendió TODO. Triplicaste lo invertido y encima fue divertido: tu primer negocio con beneficios. Que no se te suba: también pudo llover.', en: 'EVERYTHING sold. You tripled your stake and it was fun too: your first profitable business. Don\'t let it go to your head: it could also have rained.', ca: 'Es va vendre TOT. Vas triplicar la inversió i a sobre va ser divertit: el teu primer negoci amb beneficis. Que no se\'t pugi al cap: també podia ploure.' } }
          }
          if (r < 0.8) {
            ctx.dinero(c)
            return { nota: { es: 'Vendiste lo justo para recuperar el material. Beneficio: cero. Aprendizaje: montar algo cuesta más de lo que parece — eso ya lo tienes.', en: 'You sold just enough to recover the supplies. Profit: zero. Learning: setting something up costs more than it looks — that you now have.', ca: 'Vas vendre just per recuperar el material. Benefici: zero. Aprenentatge: muntar alguna cosa costa més del que sembla — això ja ho tens.' } }
          }
          ctx.bienestar(-2)
          return { nota: { es: 'Diluvió. Nadie salió a la calle y las galletas acabaron de merienda familiar. Tu primer negocio en pérdidas — hasta los buenos planes dependen del cielo.', en: 'It poured. Nobody came out and the cookies became the family snack. Your first loss-making business — even good plans depend on the sky.', ca: 'Va diluviar. Ningú va sortir al carrer i les galetes van acabar de berenar familiar. El teu primer negoci en pèrdues — fins i tot els bons plans depenen del cel.' } }
        },
      },
      {
        id: 'no',
        texto: { es: 'Mejor ir a la fiesta y ya', en: 'Just enjoy the fair', ca: 'Millor anar a la festa i ja' },
        aplicar: (p, ctx) => {
          ctx.bienestar(2)
          return { nota: { es: 'Tarde de churros y atracciones. El puesto de limonada lo montó otro niño — le fue bien, dicen.', en: 'An afternoon of churros and rides. Another kid set up the lemonade stand — went well for him, they say.', ca: 'Tarda de xurros i atraccions. La parada de llimonada la va muntar un altre nen — li va anar bé, diuen.' } }
        },
      },
    ],
  },
  {
    id: 'apuesta-recreo',
    edad: [12, 13],
    prob: 0.45,
    cantidades: { apuesta: 5 },
    texto: {
      es: 'Torneo de fútbol del recreo. Tus amigos apuestan {apuesta} por cabeza a que gana la clase de al lado. "Es dinero fácil", dicen. Nadie sabe realmente quién ganará.',
      en: 'Playground football tournament. Your friends bet {apuesta} each that the class next door wins. "Easy money", they say. Nobody actually knows who\'ll win.',
      ca: 'Torneig de futbol del pati. Els teus amics aposten {apuesta} per cap que guanya la classe del costat. "Són diners fàcils", diuen. Ningú sap realment qui guanyarà.',
    },
    opciones: [
      {
        id: 'apostar',
        texto: { es: 'Apostar tus {apuesta}', en: 'Bet your {apuesta}', ca: 'Apostar els teus {apuesta}' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('apuesta')
          if (!ctx.puedePagar(c)) {
            return { rechazo: true, nota: { es: 'No tienes ni para la apuesta. Te libras, sin saberlo, de perder — la hucha vacía a veces protege.', en: 'You can\'t even cover the bet. You\'re spared a loss without knowing it — an empty piggy bank sometimes protects.', ca: 'No tens ni per a l\'aposta. Et lliures, sense saber-ho, de perdre — la guardiola buida de vegades protegeix.' } }
          }
          if (ctx.rng() < 0.5) {
            ctx.dinero(c)
            ctx.bienestar(3)
            ctx.flag('racha-apuestas')
            return { nota: { es: 'Ganasteis y doblaste. Ojo con la trampa: acertar una apuesta hace creer que "se te da bien" — el azar no lleva la cuenta de tus rachas. Puede que esta victoria te salga cara más adelante.', en: 'You won and doubled up. Mind the trap: winning a bet makes you think you\'re "good at it" — chance keeps no record of your streaks. This win might cost you later.', ca: 'Vau guanyar i vas doblar. Compte amb la trampa: encertar una aposta fa creure que "se\'t dona bé" — l\'atzar no porta el compte de les teves ratxes. Potser aquesta victòria et surt cara més endavant.' } }
          }
          ctx.dinero(-c)
          return { nota: { es: 'Perdisteis. El "dinero fácil" casi siempre viaja en dirección contraria. Barata, como lección, no está mal.', en: 'You lost. "Easy money" almost always travels the other way. As lessons go, this one was cheap.', ca: 'Vau perdre. Els "diners fàcils" gairebé sempre viatgen en direcció contrària. Barata, com a lliçó, no està malament.' } }
        },
      },
      {
        id: 'no',
        texto: { es: 'Guardarte el dinero', en: 'Keep your money', ca: 'Guardar-te els diners' },
        aplicar: () => ({ nota: { es: 'Te llamaron rancio cinco minutos. Tu hucha ni se enteró del torneo.', en: 'They called you boring for five minutes. Your piggy bank never even heard about the tournament.', ca: 'Et van dir rànci cinc minuts. La teva guardiola ni es va assabentar del torneig.' } }),
      },
    ],
  },
  {
    id: 'paga-semanal',
    edad: [9, 10],
    // Solo aparece si en tu casa hay costumbre de paga (media/acomodada)
    condicion: p => p.familia !== 'humilde',
    slider: {
      etiqueta: { es: 'Cuánto ahorras cada mes', en: 'How much you save monthly', ca: 'Quant estalvies cada mes' },
      izq: { es: 'Todo a disfrutar', en: 'All on fun', ca: 'Tot a gaudir' },
      der: { es: 'Todo a la hucha', en: 'All to savings', ca: 'Tot a la guardiola' },
      defecto: 0.5,
    },
    texto: {
      es: 'Tus padres empiezan a darte una paga mensual para chuches, cromos y el cine con amigos. No es mucho, pero es tuya. Cada mes puedes guardarte una parte en la hucha. ¿Cuánto ahorras de aquí en adelante?',
      en: 'Your parents start giving you a monthly allowance for sweets, cards and the cinema with friends. It\'s not much, but it\'s yours. Each month you can save part of it. How much do you save from now on?',
      ca: 'Els teus pares comencen a donar-te una paga mensual per a llaminadures, cromos i el cine amb amics. No és molt, però és teva. Cada mes en pots guardar una part. Quant estalvies d\'ara endavant?',
    },
    opciones: [
      {
        id: 'repartir',
        texto: { es: 'Repartir así cada mes', en: 'Split it this way each month', ca: 'Repartir-ho així cada mes' },
        aplicar: (p, ctx, extra) => {
          const ahorroPct = typeof extra === 'number' ? extra : 0.5
          const pagaMes = ctx.pagaMesFamilia * p.indice
          p.pagaAhorroMes = Math.round(pagaMes * ahorroPct)
          ctx.bienestar(Math.round((1 - ahorroPct) * 5))
          if (ahorroPct >= 0.8) ctx.flag('ahorrador-precoz')
          return { nota:
            ahorroPct >= 0.8 ? { es: `Guardarás casi toda la paga (${ctx.f(p.pagaAhorroMes)}/mes). Poco a poco la hucha crece — el hábito de apartar, aunque sea poco, es lo que de mayor marca la diferencia.`, en: `You'll save almost all your allowance (${ctx.f(p.pagaAhorroMes)}/mo). Bit by bit the piggy bank grows — the habit of setting aside, however little, is what makes the difference later.`, ca: `Guardaràs gairebé tota la paga (${ctx.f(p.pagaAhorroMes)}/mes). A poc a poc la guardiola creix — l'hàbit d'apartar, encara que sigui poc, és el que de gran marca la diferència.` }
            : ahorroPct <= 0.2 ? { es: `Casi todo a disfrutar (${ctx.f(p.pagaAhorroMes)}/mes a la hucha). Cine y chuches con amigos — eres un niño, también toca. La hucha crecerá despacito.`, en: `Almost all on fun (${ctx.f(p.pagaAhorroMes)}/mo to savings). Cinema and sweets with friends — you're a kid, that matters too. The piggy bank grows slowly.`, ca: `Gairebé tot a gaudir (${ctx.f(p.pagaAhorroMes)}/mes a la guardiola). Cine i llaminadures amb amics — ets un nen, també toca. La guardiola creixerà a poc a poc.` }
            : { es: `Mitad y mitad (${ctx.f(p.pagaAhorroMes)}/mes a la hucha). Chuches Y ahorro: el equilibrio que de mayor se agradece haber practicado pronto.`, en: `Half and half (${ctx.f(p.pagaAhorroMes)}/mo to savings). Sweets AND savings: the balance you'll be glad you practised early.`, ca: `Meitat i meitat (${ctx.f(p.pagaAhorroMes)}/mes a la guardiola). Llaminadures I estalvi: l'equilibri que de gran s'agraeix haver practicat aviat.` }
          }
        },
      },
    ],
  },
  {
    id: 'pedir-paga',
    edad: [10, 12],
    // Si en casa no dan paga: ves que tus amigos sí tienen. ¿La pides?
    condicion: p => p.familia === 'humilde' && p.pagaAhorroMes === 0,
    texto: {
      es: 'Tus amigos tienen paga y tú no. En casa el dinero está justo — lo sabes, lo notas en las conversaciones. Podrías pedirla igualmente… o no.',
      en: 'Your friends get an allowance and you don\'t. Money is tight at home — you know it, you feel it in the conversations. You could ask anyway… or not.',
      ca: 'Els teus amics tenen paga i tu no. A casa els diners estan justos — ho saps, ho notes a les converses. Podries demanar-la igualment… o no.',
    },
    opciones: [
      {
        id: 'pedir',
        texto: { es: 'Pedirla de todas formas', en: 'Ask for it anyway', ca: 'Demanar-la igualment' },
        aplicar: (p, ctx) => {
          if (ctx.rng() < 0.5) {
            p.pagaAhorroMes = Math.round(3 * p.indice)
            ctx.bienestar(2)
            return { nota: { es: 'Hacen un esfuerzo: una paga pequeña, la que pueden. Aprendes pronto que el dinero en tu casa se estira, no sobra — una lección que a otros les llega tarde.', en: 'They make an effort: a small allowance, what they can manage. You learn early that money at home stretches, it doesn\'t overflow — a lesson others learn late.', ca: 'Fan un esforç: una paga petita, la que poden. Aprens aviat que els diners a casa teva s\'estiren, no sobren — una lliçó que a d\'altres els arriba tard.' } }
          }
          ctx.bienestar(-3)
          return { nota: { es: 'Te explican, sin dramas, que ahora mismo no puede ser. Duele un poco, pero entiendes algo que vale más que la paga: cómo funciona el dinero de verdad en una casa.', en: 'They explain, without drama, that right now it\'s not possible. It stings a little, but you understand something worth more than the allowance: how money really works in a household.', ca: 'T\'expliquen, sense drames, que ara mateix no pot ser. Fa una mica de mal, però entens una cosa que val més que la paga: com funciona el diner de debò en una casa.' } }
        },
      },
      {
        id: 'no',
        texto: { es: 'No pedir nada', en: 'Don\'t ask', ca: 'No demanar res' },
        aplicar: (p, ctx) => {
          ctx.flag('consciente-pronto')
          ctx.bienestar(1)
          return { nota: { es: 'Decides no añadir presión. A cambio, empiezas a fijarte en cómo ganar tu propio dinero — el que nadie te tiene que dar.', en: 'You choose not to add pressure. In return, you start looking at how to earn your own money — the kind nobody has to give you.', ca: 'Decideixes no afegir pressió. A canvi, comences a fixar-te en com guanyar els teus propis diners — els que ningú t\'ha de donar.' } }
        },
      },
    ],
  },
  {
    id: 'videojuego-rebajas',
    edad: [12, 13],
    prob: 0.85,
    cantidades: { hoy: 70, rebajado: 25 },
    texto: {
      es: 'Sale el videojuego del año: {hoy} de lanzamiento. Todos tus amigos ya lo tienen y juegan juntos cada tarde. Dicen que "seguro que baja pronto"… pero eso nunca se sabe.',
      en: 'The game of the year is out: {hoy} at launch. All your friends have it and play together every evening. They say "it\'ll surely drop soon"… but you never know that.',
      ca: 'Surt el videojoc de l\'any: {hoy} de llançament. Tots els teus amics ja el tenen i juguen junts cada tarda. Diuen que "segur que baixa aviat"… però això mai se sap.',
    },
    opciones: [
      {
        id: 'hoy',
        texto: { es: 'Comprarlo hoy y jugar con todos', en: 'Buy it today and play with everyone', ca: 'Comprar-lo avui i jugar amb tots' },
        aplicar: (p, ctx) => {
          if (!ctx.puedePagar(ctx.cant('hoy'))) {
            return { rechazo: true, nota: { es: 'No te llega para el juego a precio de salida. Tendrás que esperar sí o sí — a veces la cartera decide por ti.', en: 'You can\'t afford it at launch price. You\'ll have to wait whether you like it or not — sometimes your wallet decides for you.', ca: 'No t\'arriba per al joc a preu de sortida. Hauràs d\'esperar sí o sí — de vegades la cartera decideix per tu.' } }
          }
          ctx.dinero(-ctx.cant('hoy'))
          ctx.bienestar(5)
          return { nota: { es: 'Pagaste precio completo y jugaste la temporada entera con tu gente. Caro por caro, barato por lo demás — según cómo lo mires.', en: 'You paid full price and played the whole season with your people. Expensive one way, cheap another — depends how you look at it.', ca: 'Vas pagar preu complet i vas jugar la temporada sencera amb la teva gent. Car per car, barat per la resta — segons com ho miris.' } }
        },
      },
      {
        id: 'esperar',
        texto: { es: 'Esperar a que baje de precio', en: 'Wait for the price to drop', ca: 'Esperar que baixi de preu' },
        aplicar: (p, ctx) => {
          const r = ctx.rng()
          const compra = ctx.puedePagar(ctx.cant('rebajado'))   // solo compra si le llega
          if (r < 0.5) {
            if (compra) ctx.dinero(-ctx.cant('rebajado'))
            ctx.bienestar(2)
            return { nota: { es: 'Bajó a los pocos meses: mismo juego por un tercio, y aún llegaste a las partidas con tus amigos. Esta vez esperar salió redondo — no siempre sale.', en: 'It dropped within months: same game for a third, and you still made it to the matches with your friends. Waiting paid off this time — it doesn\'t always.', ca: 'Va baixar al cap de pocs mesos: el mateix joc per un terç, i encara vas arribar a les partides amb els teus amics. Aquesta vegada esperar va sortir rodó — no sempre surt.' } }
          }
          if (r < 0.8) {
            if (compra) ctx.dinero(-ctx.cant('rebajado'))
            ctx.bienestar(-4)
            return { nota: { es: 'Tardó casi un año en bajar. Lo compraste barato… y ya no jugaba nadie: la temporada fue de los demás y tú la viste desde el banquillo. El precio no era solo dinero.', en: 'It took nearly a year to drop. You bought it cheap… and nobody was playing anymore: the season belonged to the others and you watched from the bench. The price wasn\'t only money.', ca: 'Va trigar gairebé un any a baixar. El vas comprar barat… i ja no hi jugava ningú: la temporada va ser dels altres i tu la vas veure des de la banqueta. El preu no era només diners.' } }
          }
          ctx.bienestar(-3)
          return { nota: { es: 'Edición limitada: nunca bajó. Te quedaste sin juego, con el dinero en la hucha y con medio grupo hablando de pantallas que no viste. Esperar también es una apuesta.', en: 'Limited edition: it never dropped. You ended up with no game, money still in the piggy bank and half the group talking about levels you never saw. Waiting is a bet too.', ca: 'Edició limitada: mai va baixar. Et vas quedar sense joc, amb els diners a la guardiola i mig grup parlant de pantalles que no vas veure. Esperar també és una aposta.' } }
        },
      },
      {
        id: 'no',
        texto: { es: 'Pasar — no es tan importante', en: 'Skip it — it\'s not that important', ca: 'Passar — no és tan important' },
        aplicar: (p, ctx) => {
          ctx.bienestar(-5)
          return { nota: { es: 'Te lo guardas. La hucha sigue intacta, pero las tardes con tus amigos hablando del juego te dejan un poco fuera — no todo lo que cuenta se mide en euros.', en: 'You pass. The piggy bank stays intact, but the evenings with your friends talking about the game leave you a little out of it — not everything that matters is measured in euros.', ca: 'T\'ho guardes. La guardiola segueix intacta, però les tardes amb els teus amics parlant del joc et deixen una mica fora — no tot el que compta es mesura en euros.' } }
        },
      },
    ],
  },
  {
    id: 'curro-verano',
    edad: [14, 15],
    cantidades: { sueldo: 350 },
    texto: {
      es: 'Verano. Puedes repartir folletos y cuidar perros por unos {sueldo}, o descansar como todos tus amigos.',
      en: 'Summer. You can hand out flyers and walk dogs for about {sueldo}, or rest like all your friends.',
      ca: 'Estiu. Pots repartir fulletons i cuidar gossos per uns {sueldo}, o descansar com tots els teus amics.',
    },
    opciones: [
      {
        id: 'trabajar',
        texto: { es: 'Trabajar el verano', en: 'Work the summer', ca: 'Treballar l\'estiu' },
        aplicar: (p, ctx) => {
          ctx.dinero(ctx.cant('sueldo'))
          ctx.flag('curro-temprano')
          ctx.bienestar(-2)
          return { nota: { es: 'Tu primer dinero ganado. Sabe distinto al regalado — aunque el verano se te hizo corto.', en: 'Your first earned money. It tastes different from gifted money — though summer felt short.', ca: 'Els teus primers diners guanyats. Tenen un gust diferent dels regalats — encara que l\'estiu se t\'ha fet curt.' } }
        },
      },
      {
        id: 'descansar',
        texto: { es: 'Disfrutar el verano', en: 'Enjoy the summer', ca: 'Gaudir l\'estiu' },
        aplicar: (p, ctx) => {
          ctx.bienestar(6)
          return { nota: { es: 'Un verano de piscina y amigos. Eso también cuenta — solo que no en la hucha.', en: 'A summer of pool and friends. That counts too — just not in the piggy bank.', ca: 'Un estiu de piscina i amics. Això també compta — però no a la guardiola.' } }
        },
      },
    ],
  },

  // ══ LA BIFURCACIÓN DE LOS 16 ═══════════════════════════════════════════════
  {
    id: 'estudios-16',
    edad: [16, 16],
    texto: {
      es: 'Los 16: toca elegir. Bachillerato (2 años, más teórico, la vía clásica hacia la universidad), un Grado de FP de nivel medio (2 años, más práctico, un oficio concreto), o ponerte a trabajar ya y empezar a cobrar desde el primer mes. Bachillerato y FP son públicos: en casa no vas a pagar matrícula por esto. Ningún camino garantiza nada — cada uno cambia tus probabilidades, y al terminar volverás a decidir.',
      en: 'Sixteen: time to choose. Sixth form / Bachillerato (2 years, more theoretical, the classic route to university), an intermediate vocational course (2 years, more practical, a specific trade), or start working now and earn from month one. Sixth form and vocational training are public: your family won\'t pay tuition for this. No path guarantees anything — each changes your odds, and once you finish you\'ll decide again.',
      ca: 'Els 16: toca triar. Batxillerat (2 anys, més teòric, la via clàssica cap a la universitat), un Grau d\'FP de nivell mitjà (2 anys, més pràctic, un ofici concret), o posar-te a treballar ja i començar a cobrar des del primer mes. Batxillerat i FP són públics: a casa no pagaràs matrícula per això. Cap camí garanteix res — cadascun canvia les teves probabilitats, i en acabar tornaràs a decidir.',
    },
    opciones: [
      {
        id: 'bachillerato',
        texto: { es: 'Bachillerato (2 años)', en: 'Sixth form (2 years)', ca: 'Batxillerat (2 anys)' },
        aplicar: (p) => {
          p.estudios = { tipo: 'bachillerato', añosRestantes: 2, mediaJornada: false }
          return { nota: { es: 'Matriculado. Público y gratuito: en casa no notan la matrícula. Es la vía más teórica — y la que deja la puerta abierta a la universidad cuando termines.', en: 'Enrolled. Public and free: your family won\'t feel the tuition. It\'s the more theoretical route — and the one that keeps university open to you once you finish.', ca: 'Matriculat. Públic i gratuït: a casa no ho noten. És la via més teòrica — i la que deixa la porta oberta a la universitat quan acabis.' } }
        },
      },
      {
        id: 'fp-medio',
        texto: { es: 'Grado de FP medio (2 años)', en: 'Intermediate vocational course (2 years)', ca: 'Grau d\'FP mitjà (2 anys)' },
        aplicar: (p) => {
          p.estudios = { tipo: 'fp-medio', añosRestantes: 2, mediaJornada: false }
          return { nota: { es: 'Matriculado. Dos años de taller y prácticas: al mercado le gustan los oficios. Al terminar podrás seguir con un grado superior o ponerte a trabajar con lo aprendido.', en: 'Enrolled. Two years of workshop and internships: the market likes trades. Once you finish you can continue with an advanced course or start working with what you\'ve learned.', ca: 'Matriculat. Dos anys de taller i pràctiques: al mercat li agraden els oficis. En acabar podràs seguir amb un grau superior o posar-te a treballar amb el que has après.' } }
        },
      },
      {
        id: 'trabajar',
        texto: { es: 'Trabajar ya', en: 'Start working now', ca: 'Treballar ja' },
        aplicar: (p) => {
          p.ingresos = Math.round(10000 * p.indice)
          return { nota: { es: 'Primer contrato, primera nómina. Mientras otros siguen en clase tú ya ahorras — tu ventaja es el tiempo, tu riesgo es el techo. Ninguna de las dos cosas está escrita.', en: 'First contract, first payslip. While others stay in class you\'re already saving — your edge is time, your risk is the ceiling. Neither is set in stone.', ca: 'Primer contracte, primera nòmina. Mentre altres segueixen a classe tu ja estalvies — el teu avantatge és el temps, el teu risc és el sostre. Cap de les dues coses està escrita.' } }
        },
      },
    ],
  },
  {
    id: 'trabajo-estudiante',
    edad: [17, 22],
    condicion: p => p.estudios != null && !p.estudios.mediaJornada,
    cantidades: { sueldoSinTitulo: 11000 },
    texto: {
      es: 'Buscas un trabajillo para estudiante y te salen dos ofertas muy distintas. Una da más dinero pero come más horas y flexibilidad; la otra paga menos pero te deja estudiar. También puedes centrarte solo en la carrera.',
      en: 'You look for a student job and two very different offers come up. One pays more but eats more hours and flexibility; the other pays less but leaves you room to study. You can also just focus on your degree.',
      ca: 'Busques una feineta d\'estudiant i et surten dues ofertes molt diferents. Una dona més diners però menja més hores i flexibilitat; l\'altra paga menys però et deixa estudiar. També pots centrar-te només en la carrera.',
    },
    opciones: [
      {
        id: 'camarero',
        // La misma base (8400) que fija sueldoJornada abajo: la etiqueta muestra
        // exactamente lo que vas a cobrar, no una cifra fija que la inflación desmiente.
        texto: p => {
          const mes = fmt(Math.round(escala(p, 8400) / 12))
          return { es: `Camarero de findes — ${mes}/mes, turnos duros`, en: `Weekend waiter — ${mes}/mo, tough shifts`, ca: `Cambrer de caps de setmana — ${mes}/mes, torns durs` }
        },
        aplicar: (p, ctx) => {
          p.estudios.mediaJornada = true
          p.estudios.sueldoJornada = 8400
          p.estudios.riesgoExtra = 0.13   // menos horas de estudio
          ctx.flag('curro-temprano')
          ctx.bienestar(-6)
          return { nota: { es: 'Buen dinero para un estudiante, pero los findes son de bandeja y los lunes de ojeras. Sube bastante el riesgo de suspender algún curso — el tiempo no es infinito.', en: 'Good money for a student, but weekends are all trays and Mondays all eye-bags. It raises your chance of failing a year quite a bit — time isn\'t infinite.', ca: 'Bons diners per a un estudiant, però els caps de setmana són de safata i els dilluns d\'ulleres. Puja força el risc de suspendre algun curs — el temps no és infinit.' } }
        },
      },
      {
        id: 'biblioteca',
        texto: p => {
          const mes = fmt(Math.round(escala(p, 5400) / 12))
          return { es: `Becario en la biblioteca — ${mes}/mes, flexible`, en: `Library assistant — ${mes}/mo, flexible`, ca: `Becari a la biblioteca — ${mes}/mes, flexible` }
        },
        aplicar: (p, ctx) => {
          p.estudios.mediaJornada = true
          p.estudios.sueldoJornada = 5400
          p.estudios.riesgoExtra = 0.04   // casi no afecta a las notas
          ctx.flag('curro-temprano')
          ctx.bienestar(-2)
          return { nota: { es: 'Menos dinero, pero entre usuario y usuario estudias, y los horarios se adaptan a tus exámenes. Compaginar sin hundir las notas también es una habilidad.', en: 'Less money, but between users you study, and the hours flex around your exams. Juggling without sinking your grades is a skill too.', ca: 'Menys diners, però entre usuari i usuari estudies, i els horaris s\'adapten als teus exàmens. Compaginar sense enfonsar les notes també és una habilitat.' } }
        },
      },
      {
        id: 'no',
        texto: { es: 'Centrarte solo en estudiar', en: 'Just focus on studying', ca: 'Centrar-te només a estudiar' },
        aplicar: (p) => {
          if (p.flags.includes('necesita-trabajar')) {
            return { rechazo: true, nota: { es: 'Ojalá, pero en tu casa no llegan a mantenerte sin más: sin ingresos no hay banco que te preste, así que no trabajar no es una opción. Elige uno de los dos empleos, o deja los estudios.', en: 'You wish, but your family can\'t simply support you: with no income, no bank will lend to you, so not working isn\'t an option. Pick one of the two jobs, or drop out.', ca: 'Tant de bo, però a casa teva no arriben a mantenir-te sense més: sense ingressos cap banc et presta, així que no treballar no és una opció. Tria una de les dues feines, o deixa els estudis.' } }
          }
          return { nota: { es: 'Todas las horas para los libros. La cuenta no crece, las probabilidades de aprobar sí. También es una inversión — solo que no se ve en el banco.', en: 'All hours for the books. Your account doesn\'t grow, your odds of passing do. That\'s an investment too — it just doesn\'t show at the bank.', ca: 'Totes les hores per als llibres. El compte no creix, les probabilitats d\'aprovar sí. També és una inversió — només que no es veu al banc.' } }
        },
      },
      {
        id: 'dejar',
        texto: { es: 'Dejar los estudios y ponerte a trabajar', en: 'Drop out and get a job', ca: 'Deixar els estudis i posar-te a treballar' },
        aplicar: (p, ctx) => {
          p.estudios = null
          p.ingresos = ctx.cant('sueldoSinTitulo')
          ctx.bienestar(-6)
          return { nota: { es: 'Dejas los estudios. Entras al mercado sin título — menos techo, pero una nómina ya desde este mes. No es un camino peor por definición: es otro camino, con otras probabilidades.', en: 'You drop out. You enter the job market without a degree — a lower ceiling, but a payslip from this month on. It\'s not a worse path by definition: it\'s a different one, with different odds.', ca: 'Deixes els estudis. Entres al mercat sense títol — menys sostre, però una nòmina ja des d\'aquest mes. No és un camí pitjor per definició: és un altre camí, amb altres probabilitats.' } }
        },
      },
    ],
  },

  // ══ ADULTO (22-64) ═══════════════════════════════════════════════════════
  {
    id: 'master',
    edad: [23, 26],
    condicion: p => p.estudios == null && p.ingresos > 0,
    cantidades: { precio: 8000 },
    texto: {
      es: 'Llevas unos años trabajando y ves el techo: sin más formación, no pasarás de ahí. Un máster de especialización cuesta {precio}. Nadie te garantiza nada — pero abre puertas que hoy ni ves.',
      en: 'You\'ve worked a few years and you can see the ceiling: without more training, you won\'t get past it. A specialist master\'s costs {precio}. Nobody guarantees anything — but it opens doors you can\'t even see today.',
      ca: 'Portes uns anys treballant i veus el sostre: sense més formació, no passaràs d\'aquí. Un màster d\'especialització costa {precio}. Ningú et garanteix res — però obre portes que avui ni veus.',
    },
    senales: ['iliquido'],
    opciones: [
      {
        id: 'estudiar',
        texto: { es: 'Pagarte el máster ({precio})', en: 'Pay for the master\'s ({precio})', ca: 'Pagar-te el màster ({precio})' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('precio')
          if (p.dinero < c) {
            return { rechazo: true, nota: { es: `Cuesta ${ctx.f(c)} y no los tienes. Los ahorros de la infancia y los primeros sueldos son los que pagan estas puertas — esta se queda cerrada.`, en: `It costs ${ctx.f(c)} and you don't have it. Childhood savings and first salaries are what pay for these doors — this one stays shut.`, ca: `Costa ${ctx.f(c)} i no els tens. Els estalvis de la infància i els primers sous són els que paguen aquestes portes — aquesta es queda tancada.` } }
          }
          ctx.dinero(-c)
          ctx.flag('formacion')
          // El máster no es garantía: en ~1 de cada 5 vidas el sector cambia y no llega a amortizarse
          ctx.flag(ctx.rng() < 0.8 ? 'master-util' : 'master-caduco')
          ctx.experiencia({ es: 'Máster de especialización', en: 'Specialist master\'s', ca: 'Màster d\'especialització' })
          return { nota: { es: 'Un año duro de trabajar y estudiar. Formarte suele abrir puertas — pero es una apuesta, no una garantía. El tiempo dirá si esta se amortiza.', en: 'A tough year of working and studying. Training usually opens doors — but it\'s a bet, not a guarantee. Time will tell whether this one pays off.', ca: 'Un any dur de treballar i estudiar. Formar-te sol obrir portes — però és una aposta, no una garantia. El temps dirà si aquesta s\'amortitza.' } }
        },
      },
      {
        id: 'no',
        texto: { es: 'Seguir como estás', en: 'Carry on as you are', ca: 'Seguir com estàs' },
        aplicar: () => ({ nota: { es: 'El dinero se queda en tu cuenta. El techo también se queda donde estaba.', en: 'The money stays in your account. The ceiling stays where it was too.', ca: 'Els diners es queden al teu compte. El sostre també es queda on era.' } }),
      },
    ],
  },
  {
    id: 'primer-colchon',
    edad: [25, 26],
    cantidades: { ahorro: 3000 },
    texto: {
      es: 'Tras un año trabajando te sobran {ahorro}. Tu banco de siempre te ofrece un depósito a plazo fijo: poco interés, pero seguro. También puedes dejarlo en la cuenta… o darte un capricho de una vez.',
      en: 'After a year of work you have {ahorro} spare. Your lifelong bank offers a fixed-term deposit: low interest, but safe. You could also leave it in your account… or splurge.',
      ca: 'Després d\'un any treballant et sobren {ahorro}. El teu banc de sempre t\'ofereix un dipòsit a termini fix: poc interès, però segur. També pots deixar-los al compte… o donar-te un caprici.',
    },
    senales: ['entidad-seria'],
    opciones: [
      {
        id: 'deposito',
        texto: { es: 'Meterlo en el depósito', en: 'Put it in the deposit', ca: 'Posar-los al dipòsit' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('ahorro')
          ctx.dinero(-c)
          ctx.activo({ id: 'inv-deposito', tipo: 'deposito', invertido: c, senales: ['entidad-seria'], nombre: { es: 'Depósito a plazo fijo', en: 'Fixed-term deposit', ca: 'Dipòsit a termini fix' } })
          return { nota: { es: 'Seguro y tranquilo. Ojo: si el interés es menor que la inflación, tu dinero "crece" pero compra menos.', en: 'Safe and calm. Careful: if interest is below inflation, your money "grows" but buys less.', ca: 'Segur i tranquil. Ull: si l\'interès és menor que la inflació, els teus diners "creixen" però compren menys.' } }
        },
      },
      {
        id: 'cuenta',
        texto: { es: 'Dejarlo en la cuenta', en: 'Leave it in the account', ca: 'Deixar-los al compte' },
        aplicar: (p, ctx) => {
          ctx.flag('sabe-invertir')
          return { nota: { es: 'Disponible al instante… y desprotegido: la inflación se lo irá comiendo en silencio.', en: 'Instantly available… and unprotected: inflation will quietly eat it.', ca: 'Disponible a l\'instant… i desprotegit: la inflació se\'ls anirà menjant en silenci.' } }
        },
      },
      {
        id: 'mochilero',
        texto: { es: 'Tres meses de mochilero por Asia', en: 'Three months backpacking across Asia', ca: 'Tres mesos de motxiller per Àsia' },
        aplicar: (p, ctx) => {
          ctx.dinero(-Math.round(ctx.cant('ahorro') * 0.8))
          ctx.flag('viaje-mochilero')
          ctx.bienestar(10)
          ctx.experiencia({ es: 'Mochilero por Asia', en: 'Backpacking across Asia', ca: 'Motxiller per Àsia' })
          return { nota: { es: 'Dinero convertido en mundo. Vuelves con la mochila rota, mil historias y contactos de todas partes. ¿Quién sabe qué puertas abre esto?', en: 'Money turned into world. You come back with a broken backpack, a thousand stories and contacts from everywhere. Who knows what doors this opens?', ca: 'Diners convertits en món. Tornes amb la motxilla trencada, mil històries i contactes de tot arreu. Qui sap quines portes obre això?' } }
        },
      },
    ],
  },
  {
    id: 'cripto-gimnasio',
    edad: [27, 28],
    cantidades: { entrada: 3000 },
    texto: {
      es: 'Un conocido del gimnasio te enseña su móvil: "Mira lo que he ganado este mes con esta cripto nueva. Rentabilidad garantizada, pero hay que entrar YA — quedan pocas plazas". Pide {entrada} de entrada mínima.',
      en: 'A guy from the gym shows you his phone: "Look what I made this month with this new crypto. Guaranteed returns, but you must get in NOW — few spots left". Minimum entry: {entrada}.',
      ca: 'Un conegut del gimnàs t\'ensenya el mòbil: "Mira què he guanyat aquest mes amb aquesta cripto nova. Rendibilitat garantida, però cal entrar JA — queden poques places". Demana {entrada} d\'entrada mínima.',
    },
    senales: ['garantizado', 'presion', 'no-regulado', 'conocido'],
    opciones: [
      {
        id: 'entrar',
        texto: { es: 'Entrar con {entrada}', en: 'Go in with {entrada}', ca: 'Entrar amb {entrada}' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('entrada')
          ctx.dinero(-c)
          ctx.activo({ id: 'cripto-1', tipo: 'turbio', invertido: c, senales: ['garantizado', 'presion', 'no-regulado', 'conocido'], oculto: { pQuiebraAnual: 0.35, retorno: 0.30, vol: 0.5, horizonte: 3 }, nombre: { es: 'La cripto del gimnasio', en: 'The gym crypto', ca: 'La cripto del gimnàs' } })
          return { nota: { es: 'Dentro. Ahora, a esperar. Recuerda quién te lo vendió y cómo.', en: 'You\'re in. Now, wait. Remember who sold it to you and how.', ca: 'Dins. Ara, a esperar. Recorda qui t\'ho va vendre i com.' } }
        },
      },
      {
        id: 'pasar',
        texto: { es: 'Sonreír y cambiar de tema', en: 'Smile and change the subject', ca: 'Somriure i canviar de tema' },
        aplicar: (p, ctx) => {
          ctx.flag('esquivo-cripto')
          return { nota: { es: '"Garantizado", prisa y sin regular: tres banderas rojas en una frase. Sea lo que sea eso, que lo disfrute otro.', en: '"Guaranteed", urgency and unregulated: three red flags in one sentence. Whatever that is, let someone else enjoy it.', ca: '"Garantit", pressa i sense regular: tres banderes vermelles en una frase. Sigui el que sigui, que ho gaudeixi un altre.' } }
        },
      },
    ],
  },
  {
    id: 'traslado-capital',
    edad: [29, 30],
    prob: 0.75,
    condicion: p => p.ingresos > 0 && !p.estudios && p.paroMeses === 0 && p.ingresos < techoSalarial(p) * 0.98,
    texto: {
      es: 'Tu empresa abre sede en la capital y te quiere allí: +25% de sueldo. La letra pequeña: los alquileres son un 40% más caros y tu gente se queda a 400 km.',
      en: 'Your company opens an office in the capital and wants you there: +25% salary. The small print: rents are 40% higher and your people stay 400 km behind.',
      ca: 'La teva empresa obre seu a la capital i t\'hi vol: +25% de sou. La lletra petita: els lloguers són un 40% més cars i la teva gent es queda a 400 km.',
    },
    opciones: [
      {
        id: 'ir',
        texto: { es: 'Aceptar el traslado (+25%)', en: 'Take the relocation (+25%)', ca: 'Acceptar el trasllat (+25%)' },
        aplicar: (p, ctx) => {
          p.ingresos = Math.min(techoSalarial(p), Math.round(p.ingresos * 1.25))
          p.alquilerAnual = Math.round(p.alquilerAnual * 1.4)
          ctx.bienestar(-5)
          ctx.flag('capital')
          return { nota: { es: 'Más sueldo, más alquiler, menos domingos en familia. Haz la cuenta completa: la subida real es la diferencia entre lo que entra de más y lo que se va de más — y lo que pesa la distancia.', en: 'More salary, more rent, fewer family Sundays. Do the full maths: the real raise is what extra comes in minus what extra goes out — and what the distance weighs.', ca: 'Més sou, més lloguer, menys diumenges en família. Fes el compte complet: la pujada real és la diferència entre el que entra de més i el que se\'n va de més — i el que pesa la distància.' } }
        },
      },
      {
        id: 'quedarse',
        texto: { es: 'Quedarte en tu ciudad', en: 'Stay in your city', ca: 'Quedar-te a la teva ciutat' },
        aplicar: (p, ctx) => {
          ctx.bienestar(3)
          return { nota: { es: 'Menos ceros en la nómina, más vida alrededor. En la capital muchos sueldos grandes se los come el alquiler — la cuenta no siempre sale.', en: 'Fewer zeros on the payslip, more life around you. In the capital many big salaries get eaten by rent — the maths doesn\'t always work out.', ca: 'Menys zeros a la nòmina, més vida al voltant. A la capital molts sous grans se\'ls menja el lloguer — el compte no sempre surt.' } }
        },
      },
    ],
  },
  {
    id: 'pareja',
    edad: [26, 28],
    prob: 0.85,
    cantidades: { alquilerCompartido: 5500 },
    texto: {
      es: 'Llevas un año con alguien y la cosa va en serio. Toca hablar de futuro: ¿juntáis vidas (y gastos), o cada cual en su casa?',
      en: 'You\'ve been with someone for a year and it\'s getting serious. Time to talk future: join lives (and expenses), or keep separate homes?',
      ca: 'Portes un any amb algú i la cosa va de debò. Toca parlar de futur: ajunteu vides (i despeses), o cadascú a casa seva?',
    },
    opciones: [
      {
        id: 'juntos',
        texto: { es: 'Mudaros juntos', en: 'Move in together', ca: 'Mudar-vos junts' },
        aplicar: (p, ctx) => {
          ctx.flag('pareja')
          ctx.flag('convive')
          if (p.vivienda === 'familia') {
            // Mudarse en pareja también es independizarse: sales de casa de tus padres
            p.vivienda = 'alquiler'
            p.alquilerAnual = Math.round(ctx.cant('alquilerCompartido') * (p.flags.includes('capital') ? 1.4 : 1))
            ctx.recalcularGastos()
            ctx.bienestar(8)
            return { nota: { es: `Salís de casa de vuestras familias a un piso juntos: tu parte del alquiler son ${ctx.f(Math.round(p.alquilerAnual / 12))}/mes. Dos sueldos reparten mejor los gastos — y la vida cambia entera.`, en: `You both leave your family homes for a flat together: your share of the rent is ${ctx.f(Math.round(p.alquilerAnual / 12))}/mo. Two salaries split costs better — and life changes entirely.`, ca: `Sortiu de casa de les vostres famílies a un pis junts: la teva part del lloguer són ${ctx.f(Math.round(p.alquilerAnual / 12))}/mes. Dos sous reparteixen millor les despeses — i la vida canvia sencera.` } }
          }
          p.alquilerAnual = Math.round(p.alquilerAnual * 0.65)
          ctx.bienestar(8)
          return { nota: { es: `Dos sueldos, un alquiler: tu gasto de vivienda baja a ${ctx.f(Math.round(p.alquilerAnual / 12))}/mes. Compartir la vida también es la decisión financiera más grande que casi nadie mira como tal.`, en: `Two salaries, one rent: your housing cost drops to ${ctx.f(Math.round(p.alquilerAnual / 12))}/mo. Sharing your life is also the biggest financial decision almost nobody treats as one.`, ca: `Dos sous, un lloguer: la teva despesa d'habitatge baixa a ${ctx.f(Math.round(p.alquilerAnual / 12))}/mes. Compartir la vida també és la decisió financera més gran que gairebé ningú mira com a tal.` } }
        },
      },
      {
        id: 'separados',
        texto: { es: 'Seguir juntos, cada cual su casa', en: 'Stay together, separate homes', ca: 'Seguir junts, cadascú a casa seva' },
        aplicar: (p, ctx) => {
          ctx.flag('pareja')
          ctx.bienestar(4)
          return { nota: { es: 'La relación avanza a su ritmo, las cuentas siguen separadas. Ni mejor ni peor: otra manera de organizarse.', en: 'The relationship moves at its own pace, the finances stay separate. Not better or worse: another way to organise.', ca: 'La relació avança al seu ritme, els comptes segueixen separats. Ni millor ni pitjor: una altra manera d\'organitzar-se.' } }
        },
      },
      {
        id: 'solo',
        texto: { es: 'No es tu momento — lo dejáis', en: 'It\'s not your moment — you break up', ca: 'No és el teu moment — ho deixeu' },
        aplicar: (p, ctx) => {
          ctx.bienestar(-3)
          return { nota: { es: 'Duele un tiempo. Tu vida sigue siendo tuya entera — con sus gastos enteros también.', en: 'It hurts for a while. Your life stays entirely yours — with its expenses entirely yours too.', ca: 'Fa mal un temps. La teva vida segueix sent teva sencera — amb les despeses senceres també.' } }
        },
      },
    ],
  },
  {
    id: 'casa-o-alquiler',
    edad: [31, 33],
    condicion: p => p.vivienda !== 'propia',
    cantidades: { precio: 180000, entrada: 36000 },
    texto: {
      es: 'Encuentras un piso que te encaja: {precio}. El banco pide {entrada} de entrada y una hipoteca de 25 años con cuota fija (si tienes pareja y vais a medias, tu parte de la entrada baja casi a la mitad). O puedes seguir de alquiler, libre de ataduras… y de escrituras.',
      en: 'You find a flat that suits you: {precio}. The bank asks {entrada} down plus a 25-year fixed mortgage (if you have a partner and split it, your share of the deposit nearly halves). Or keep renting, free of ties… and of deeds.',
      ca: 'Trobes un pis que t\'encaixa: {precio}. El banc demana {entrada} d\'entrada i una hipoteca de 25 anys amb quota fixa (si tens parella i aneu a mitges, la teva part de l\'entrada baixa gairebé a la meitat). O pots seguir de lloguer, lliure de lligams… i d\'escriptures.',
    },
    senales: ['iliquido'],
    opciones: [
      {
        id: 'comprar',
        texto: { es: 'Comprar el piso', en: 'Buy the flat', ca: 'Comprar el pis' },
        aplicar: (p, ctx) => {
          // En pareja compras (y posees) tu mitad: entrada, hipoteca y piso a medias
          const parte = ctx.tieneFlag('pareja') ? 0.55 : 1
          const entrada = Math.round(ctx.cant('entrada') * parte)
          const precio = Math.round(ctx.cant('precio') * parte)
          if (p.dinero < entrada) {
            ctx.flag('alquiler-vitalicio')
            return { rechazo: true, nota: { es: `Tu parte de la entrada son ${ctx.f(entrada)} y no los tienes. Sin ahorro previo, esta puerta no se abre — sigues de alquiler.`, en: `Your share of the deposit is ${ctx.f(entrada)} and you don't have it. Without prior savings, this door won't open — you keep renting.`, ca: `La teva part de l'entrada són ${ctx.f(entrada)} i no els tens. Sense estalvi previ, aquesta porta no s'obre — segueixes de lloguer.` } }
          }
          ctx.dinero(-entrada)
          p.vivienda = 'propia'
          p.alquilerAnual = 0
          p.hipoteca = { pendiente: precio - entrada, cuota: Math.round(((precio - entrada) * 1.35) / 25), años: 25 }
          ctx.activo({ id: 'casa-1', tipo: 'casa', invertido: precio, valor: precio, senales: ['iliquido'], nombre: parte < 1 ? { es: 'Tu mitad del piso', en: 'Your half of the flat', ca: 'La teva meitat del pis' } : { es: 'Tu piso', en: 'Your flat', ca: 'El teu pis' } })
          ctx.flag('hipoteca')
          return { nota: parte < 1
            ? { es: 'Vuestro (bueno, del banco durante 25 años). Entre dos sueldos la cuota pesa la mitad — la ventaja financiera menos romántica de la pareja.', en: 'Yours together (well, the bank\'s for 25 years). Between two salaries the payment weighs half — the least romantic financial perk of a couple.', ca: 'Vostre (bé, del banc durant 25 anys). Entre dos sous la quota pesa la meitat — l\'avantatge financer menys romàntic de la parella.' }
            : { es: 'Tuya (bueno, del banco durante 25 años). La cuota es fija: la inflación jugará a tu favor esta vez.', en: 'Yours (well, the bank\'s for 25 years). The payment is fixed: inflation will work in your favour this time.', ca: 'Teu (bé, del banc durant 25 anys). La quota és fixa: la inflació jugarà a favor teu aquesta vegada.' } }
        },
      },
      {
        id: 'alquiler',
        texto: { es: 'Seguir de alquiler', en: 'Keep renting', ca: 'Seguir de lloguer' },
        aplicar: (p, ctx) => {
          ctx.flag('alquiler-vitalicio')
          return { nota: { es: 'Flexibilidad total. El riesgo: el alquiler sube con la inflación todos los años, para siempre.', en: 'Total flexibility. The risk: rent rises with inflation every year, forever.', ca: 'Flexibilitat total. El risc: el lloguer puja amb la inflació cada any, per sempre.' } }
        },
      },
    ],
  },
  {
    id: 'fondo-indexado',
    edad: [35, 36],
    cantidades: { mucho: 6000, poco: 1500 },
    texto: {
      es: 'Tu banco te ofrece un fondo indexado global: un trocito de las 1.500 mayores empresas del mundo. Regulado, comisiones bajas, y te avisan: "esto es a 15-20 años vista; habrá sustos por el camino".',
      en: 'Your bank offers a global index fund: a slice of the world\'s 1,500 biggest companies. Regulated, low fees, and they warn you: "this is for 15-20 years; there will be scares along the way".',
      ca: 'El teu banc t\'ofereix un fons indexat global: un trosset de les 1.500 empreses més grans del món. Regulat, comissions baixes, i t\'avisen: "això és a 15-20 anys vista; hi haurà ensurts pel camí".',
    },
    senales: ['entidad-seria', 'diversificado', 'iliquido'],
    opciones: [
      {
        id: 'fuerte',
        texto: { es: 'Invertir {mucho}', en: 'Invest {mucho}', ca: 'Invertir {mucho}' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('mucho')
          if (p.dinero < c) return { rechazo: true, nota: { es: 'No llegas a esa cantidad. Puedes empezar con menos.', en: 'You can\'t reach that amount. You can start smaller.', ca: 'No arribes a aquesta quantitat. Pots començar amb menys.' } }
          ctx.dinero(-c)
          ctx.activo({ id: 'fondo-1', tipo: 'fondo', invertido: c, senales: ['entidad-seria', 'diversificado'], nombre: { es: 'Fondo indexado global', en: 'Global index fund', ca: 'Fons indexat global' } })
          return { nota: { es: 'Invertido. La regla de oro: no mirarlo cada día y NO vender en pánico cuando caiga. Porque caerá.', en: 'Invested. The golden rule: don\'t check it daily and do NOT panic-sell when it drops. Because it will.', ca: 'Invertit. La regla d\'or: no mirar-lo cada dia i NO vendre en pànic quan caigui. Perquè caurà.' } }
        },
      },
      {
        id: 'suave',
        texto: { es: 'Empezar con {poco}', en: 'Start with {poco}', ca: 'Començar amb {poco}' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('poco')
          ctx.dinero(-c)
          ctx.activo({ id: 'fondo-1', tipo: 'fondo', invertido: c, senales: ['entidad-seria', 'diversificado'], nombre: { es: 'Fondo indexado global', en: 'Global index fund', ca: 'Fons indexat global' } })
          return { nota: { es: 'Un comienzo prudente. Lo importante del interés compuesto no es la cantidad: es empezar pronto.', en: 'A prudent start. What matters with compound interest isn\'t the amount: it\'s starting early.', ca: 'Un començament prudent. L\'important de l\'interès compost no és la quantitat: és començar aviat.' } }
        },
      },
      {
        id: 'no',
        texto: { es: '"La bolsa es un casino"', en: '"The stock market is a casino"', ca: '"La borsa és un casino"' },
        aplicar: () => ({ nota: { es: 'Te quedas fuera. Un fondo diversificado a décadas no es un casino — pero es tu decisión, y al menos no era un timo.', en: 'You stay out. A diversified fund over decades isn\'t a casino — but it\'s your call, and at least it wasn\'t a scam.', ca: 'Et quedes fora. Un fons diversificat a dècades no és un casino — però és decisió teva, i almenys no era una estafa.' } }),
      },
    ],
  },
  {
    id: 'startup-oferta',
    edad: [40, 41],
    prob: 0.8,
    condicion: p => p.ingresos > 0 && !p.estudios && p.paroMeses === 0 && p.ingresos < techoSalarial(p) * 0.98,
    texto: {
      es: 'Una startup te ficha: +30% de sueldo, oficina bonita, futbolín. Aún no gana dinero — "estamos en fase de crecimiento", dicen. Tu empresa actual es aburrida pero lleva 40 años en pie.',
      en: 'A startup wants you: +30% salary, nice office, table football. It doesn\'t make money yet — "we\'re in growth phase", they say. Your current company is boring but has stood for 40 years.',
      ca: 'Una startup et fitxa: +30% de sou, oficina bonica, futbolí. Encara no guanya diners — "estem en fase de creixement", diuen. La teva empresa actual és avorrida però fa 40 anys que aguanta.',
    },
    senales: ['presion'],
    opciones: [
      {
        id: 'saltar',
        texto: { es: 'Saltar a la startup (+30%)', en: 'Jump to the startup (+30%)', ca: 'Saltar a la startup (+30%)' },
        aplicar: (p, ctx) => {
          p.ingresos = Math.min(techoSalarial(p), Math.round(p.ingresos * 1.3))
          ctx.flag('startup')
          return { nota: { es: 'Sueldazo. Pero pregúntate: si viene una crisis, ¿quién paga tu nómina — los beneficios que no tienen, o los inversores que se asustan?', en: 'Great salary. But ask yourself: if a crisis comes, who pays your wage — the profits they don\'t have, or investors who get scared?', ca: 'Souàs. Però pregunta\'t: si ve una crisi, qui paga la teva nòmina — els beneficis que no tenen, o els inversors que s\'espanten?' } }
        },
      },
      {
        id: 'quedarse',
        texto: { es: 'Quedarte donde estás', en: 'Stay where you are', ca: 'Quedar-te on ets' },
        aplicar: (p, ctx) => {
          p.ingresos = Math.min(techoSalarial(p), Math.round(p.ingresos * 1.08))
          ctx.flag('empleo-estable')
          return { nota: { es: 'Te suben un poco por no irte. Menos brillo, más cimientos.', en: 'They give you a small raise to stay. Less shine, more foundations.', ca: 'Et pugen una mica per no marxar. Menys brillantor, més fonaments.' } }
        },
      },
    ],
  },
  {
    id: 'cromo-vender-bueno',
    edad: [34, 35],
    requiere: ['cromo-bueno'],
    cantidades: { oferta: 400 },
    texto: {
      es: 'Ordenando cajas encuentras EL CROMO de tu infancia. Lo buscas por curiosidad: un coleccionista ofrece {oferta}. Tu ídolo se retiró siendo leyenda y la edición era de verdad limitada.',
      en: 'Sorting boxes you find THE CARD from your childhood. You look it up: a collector offers {oferta}. Your idol retired a legend and the edition really was limited.',
      ca: 'Ordenant caixes trobes EL CROMO de la teva infància. El busques per curiositat: un col·leccionista ofereix {oferta}. El teu ídol es va retirar sent llegenda i l\'edició era de debò limitada.',
    },
    opciones: [
      {
        id: 'vender',
        texto: { es: 'Vender por {oferta}', en: 'Sell for {oferta}', ca: 'Vendre per {oferta}' },
        aplicar: (p, ctx) => {
          ctx.dinero(ctx.cant('oferta'))
          ctx.autopsia({ tipo: 'neutra', titulo: { es: 'El cromo de la infancia', en: 'The childhood card', ca: 'El cromo de la infància' }, senales: [], texto: { es: 'Multiplicaste por 40 lo que pagaste. Pero ojo con la lección: solo 3 de cada 10 cromos "de edición limitada" acaban valiendo algo. Este era de los buenos — y aun así, nadie podía saberlo entonces.', en: 'You made 40x what you paid. But mind the lesson: only 3 in 10 "limited edition" cards end up worth anything. This was one of the good ones — and even so, nobody could have known back then.', ca: 'Vas multiplicar per 40 el que vas pagar. Però compte amb la lliçó: només 3 de cada 10 cromos "d\'edició limitada" acaben valent alguna cosa. Aquest era dels bons — i tot i així, ningú podia saber-ho llavors.' } })
          return { nota: { es: '¡Vendido! De la paga de un mes a {oferta}. La paciencia (y la suerte) pagan.', en: 'Sold! From a month\'s allowance to {oferta}. Patience (and luck) pay.', ca: 'Venut! De la paga d\'un mes a {oferta}. La paciència (i la sort) paguen.' } }
        },
      },
      {
        id: 'guardar',
        texto: { es: 'Guardarlo — es historia tuya', en: 'Keep it — it\'s your history', ca: 'Guardar-lo — és història teva' },
        aplicar: () => ({ nota: { es: 'Hay cosas que no se miden en euros. El cromo se queda contigo.', en: 'Some things aren\'t measured in euros. The card stays with you.', ca: 'Hi ha coses que no es mesuren en euros. El cromo es queda amb tu.' } }),
      },
    ],
  },
  {
    id: 'cromo-vender-malo',
    edad: [34, 35],
    requiere: ['cromo-malo'],
    texto: {
      es: 'Ordenando cajas encuentras el cromo "de edición limitada" de tu infancia. Lo buscas ilusionado: hay miles a la venta por céntimos. Resulta que "limitada" era el eslogan, no la tirada.',
      en: 'Sorting boxes you find your childhood "limited edition" card. You look it up excitedly: thousands for sale for pennies. Turns out "limited" was the slogan, not the print run.',
      ca: 'Ordenant caixes trobes el cromo "d\'edició limitada" de la teva infància. El busques il·lusionat: n\'hi ha milers a la venda per cèntims. Resulta que "limitada" era l\'eslògan, no el tiratge.',
    },
    opciones: [
      {
        id: 'ok',
        texto: { es: 'Sonreír y guardarlo de recuerdo', en: 'Smile and keep it as a memento', ca: 'Somriure i guardar-lo de record' },
        aplicar: (p, ctx) => {
          ctx.autopsia({ tipo: 'neutra', titulo: { es: 'El cromo de la infancia', en: 'The childhood card', ca: 'El cromo de la infància' }, senales: [], texto: { es: '7 de cada 10 objetos "de coleccionista" nunca se revalorizan. Comprar cosas esperando que suban de precio es especular, no ahorrar — está bien saberlo desde niño.', en: '7 in 10 "collector" items never gain value. Buying things hoping they\'ll appreciate is speculating, not saving — good to learn as a kid.', ca: '7 de cada 10 objectes "de col·leccionista" mai es revaloritzen. Comprar coses esperant que pugin de preu és especular, no estalviar — està bé saber-ho des de petit.' } })
          return { nota: { es: 'Nostalgia: gratis. Lección sobre especular: pagada hace años, a precio de niño.', en: 'Nostalgia: free. Lesson on speculation: paid years ago, at kid prices.', ca: 'Nostàlgia: gratis. Lliçó sobre especular: pagada fa anys, a preu de nen.' } }
        },
      },
    ],
  },
  {
    id: 'roadtrip',
    edad: [28, 42],
    prob: 0.7,
    condicion: p => p.ingresos > 0 && !p.estudios && p.paroMeses === 0,
    cantidades: { coste: 900 },
    texto: {
      es: 'Tus amigos de siempre montan LA ruta: dos semanas en furgoneta por la costa. El problema: el trabajo va a tope y no te quedan vacaciones. El viaje cuesta {coste}… más lo que decidas jugarte.',
      en: 'Your lifelong friends plan THE route: two weeks in a van down the coast. The problem: work is slammed and you have no leave left. The trip costs {coste}… plus whatever you decide to gamble.',
      ca: 'Els teus amics de sempre munten LA ruta: dues setmanes en furgoneta per la costa. El problema: la feina va a tope i no et queden vacances. El viatge costa {coste}… més el que decideixis jugar-te.',
    },
    opciones: [
      {
        id: 'sin-sueldo',
        texto: { es: 'Pedir dos semanas sin sueldo e ir', en: 'Ask for two unpaid weeks and go', ca: 'Demanar dues setmanes sense sou i anar-hi' },
        aplicar: (p, ctx) => {
          ctx.dinero(-ctx.cant('coste') - Math.round(p.ingresos * 0.04))
          ctx.bienestar(9)
          ctx.experiencia({ es: 'El roadtrip con los de siempre', en: 'The road trip with the old crew', ca: 'El roadtrip amb els de sempre' })
          return { nota: { es: 'Dos semanas de sal, risas y gasolineras. Te costó el viaje más medio mes de nómina — por la puerta grande y sin deberle nada a nadie.', en: 'Two weeks of salt, laughter and petrol stations. It cost you the trip plus half a month\'s pay — through the front door, owing nobody anything.', ca: 'Dues setmanes de sal, riures i benzineres. Et va costar el viatge més mig mes de nòmina — per la porta gran i sense deure res a ningú.' } }
        },
      },
      {
        id: 'morro',
        texto: { es: 'Escaparte "teletrabajando"', en: 'Sneak off while "working remotely"', ca: 'Escapar-te "teletreballant"' },
        aplicar: (p, ctx) => {
          ctx.dinero(-ctx.cant('coste'))
          ctx.experiencia({ es: 'El roadtrip con los de siempre', en: 'The road trip with the old crew', ca: 'El roadtrip amb els de sempre' })
          if (ctx.rng() < 0.35) {
            ctx.bienestar(2)
            p.ingresos = Math.round(p.ingresos * 0.97)
            return { nota: { es: 'Te pillaron: una videollamada con las olas de fondo. Bronca, marrón en tu expediente y adiós a la subida de este año. El viaje fue épico igualmente — tú decides si la cuenta sale.', en: 'You got caught: one video call with waves in the background. A telling-off, a mark on your record and no raise this year. The trip was epic anyway — you decide if the maths works.', ca: 'Et van enxampar: una videotrucada amb les onades de fons. Bronca, taca a l\'expedient i adéu a la pujada d\'enguany. El viatge va ser èpic igualment — tu decideixes si el compte surt.' } }
          }
          ctx.bienestar(8)
          return { nota: { es: 'Colaste. Wifi de camping, reuniones desde la furgoneta y nadie notó nada. Esta vez. La estadística de los que lo repiten cada año es menos amable.', en: 'You got away with it. Campsite wifi, meetings from the van and nobody noticed. This time. The statistics for repeat offenders are less kind.', ca: 'Vas colar-ho. Wifi de càmping, reunions des de la furgoneta i ningú va notar res. Aquesta vegada. L\'estadística dels que ho repeteixen cada any és menys amable.' } }
        },
      },
      {
        id: 'no',
        texto: { es: 'Quedarte currando', en: 'Stay and work', ca: 'Quedar-te currant' },
        aplicar: (p, ctx) => {
          ctx.bienestar(-6)
          return { nota: { es: 'El grupo del móvil echa humo con fotos de calas. El trabajo ni se enteró de tu sacrificio. Apunta esta sensación: volverá cuando mires atrás.', en: 'The group chat is on fire with cove photos. Work never even noticed your sacrifice. Note this feeling: it will return when you look back.', ca: 'El grup del mòbil treu fum amb fotos de cales. La feina ni es va assabentar del teu sacrifici. Apunta aquesta sensació: tornarà quan miris enrere.' } }
        },
      },
    ],
  },
  {
    id: 'boda-amigo',
    edad: [33, 34],
    prob: 0.85,
    cantidades: { coste: 1200 },
    texto: {
      es: 'Tu amigo del alma se casa en otra punta del país. Entre viaje, hotel, traje y regalo se te van {coste}. Justo este año ibas apurado.',
      en: 'Your best friend is getting married across the country. Travel, hotel, suit and gift add up to {coste}. And money is tight this year.',
      ca: 'El teu amic de l\'ànima es casa a l\'altra punta del país. Entre viatge, hotel, vestit i regal se te\'n van {coste}. Just aquest any anaves apurat.',
    },
    opciones: [
      {
        id: 'ir',
        texto: { es: 'Ir — es tu amigo del alma', en: 'Go — he\'s your best friend', ca: 'Anar-hi — és el teu amic de l\'ànima' },
        aplicar: (p, ctx) => {
          ctx.dinero(-ctx.cant('coste'))
          ctx.flag('red-social')
          ctx.bienestar(6)
          ctx.experiencia({ es: 'La boda de tu mejor amigo', en: 'Your best friend\'s wedding', ca: 'La boda del teu millor amic' })
          return { nota: { es: 'Bailas hasta las tantas y conoces a gente de todas partes. Las relaciones no salen en el extracto del banco, pero también son patrimonio.', en: 'You dance till late and meet people from everywhere. Relationships don\'t show on your bank statement, but they\'re wealth too.', ca: 'Balles fins a la matinada i coneixes gent de tot arreu. Les relacions no surten a l\'extracte del banc, però també són patrimoni.' } }
        },
      },
      {
        id: 'excusarse',
        texto: { es: 'Excusarte y enviar un regalo', en: 'Make excuses and send a gift', ca: 'Excusar-te i enviar un regal' },
        aplicar: (p, ctx) => {
          ctx.dinero(-Math.round(ctx.cant('coste') * 0.15))
          ctx.bienestar(-4)
          return { nota: { es: 'Ahorras casi todo el coste. Tu amigo dice que lo entiende. Las cosas que no se hacen también dejan huella.', en: 'You save almost the whole cost. Your friend says he understands. The things left undone leave a mark too.', ca: 'Estalvies gairebé tot el cost. El teu amic diu que ho entén. Les coses que no es fan també deixen empremta.' } }
        },
      },
    ],
  },
  {
    id: 'tu-boda',
    edad: [36, 37],
    requiere: ['pareja'],
    cantidades: { grande: 15000, intima: 2500 },
    texto: {
      es: 'Tu pareja y tú decidís casaros. La pregunta de los {grande}: ¿el bodorrio con todos los que os importan, o algo íntimo y usar el resto para vivir?',
      en: 'You and your partner decide to get married. The {grande} question: the big wedding with everyone you love, or something intimate and use the rest to live?',
      ca: 'La teva parella i tu decidiu casar-vos. La pregunta dels {grande}: el bodorrio amb tots els que us importen, o una cosa íntima i fer servir la resta per viure?',
    },
    opciones: [
      {
        id: 'grande',
        texto: { es: 'La gran boda ({grande})', en: 'The big wedding ({grande})', ca: 'La gran boda ({grande})' },
        aplicar: (p, ctx) => {
          ctx.dinero(-ctx.cant('grande'))
          ctx.flag('red-social')
          ctx.bienestar(10)
          ctx.experiencia({ es: 'Vuestra gran boda', en: 'Your big wedding', ca: 'La vostra gran boda' })
          return { nota: { es: 'Un día irrepetible con todos los tuyos. Caro, sí. ¿Tirado? Eso no lo dicen los números — lo dirás tú dentro de 30 años.', en: 'An unrepeatable day with everyone you love. Expensive, yes. Wasted? Numbers can\'t tell you that — you\'ll tell yourself in 30 years.', ca: 'Un dia irrepetible amb tots els teus. Car, sí. Llençat? Això no ho diuen els números — ho diràs tu d\'aquí a 30 anys.' } }
        },
      },
      {
        id: 'intima',
        texto: { es: 'Algo íntimo ({intima})', en: 'Something intimate ({intima})', ca: 'Una cosa íntima ({intima})' },
        aplicar: (p, ctx) => {
          ctx.dinero(-ctx.cant('intima'))
          ctx.bienestar(7)
          ctx.experiencia({ es: 'Vuestra boda íntima', en: 'Your intimate wedding', ca: 'La vostra boda íntima' })
          return { nota: { es: 'Veinte personas, un restaurante pequeño y cero deudas. El matrimonio es el mismo; la cuenta, no.', en: 'Twenty people, a small restaurant and zero debt. The marriage is the same; the bill isn\'t.', ca: 'Vint persones, un restaurant petit i zero deutes. El matrimoni és el mateix; el compte, no.' } }
        },
      },
    ],
  },
  {
    id: 'socio-viaje',
    edad: [38, 39],
    requiere: ['viaje-mochilero'],
    cantidades: { parte: 8000 },
    texto: {
      es: '¿Te acuerdas de Nadia, la que conociste en aquel viaje por Asia? Su empresa de rutas sostenibles ya factura bien y va a abrir en España. Se acordó de ti: te ofrece entrar como socio con {parte}. Te enseña cuentas auditadas y clientes reales.',
      en: 'Remember Nadia, from that trip across Asia? Her sustainable-routes company is billing well and expanding to Spain. She remembered you: she offers you a stake for {parte}, showing audited accounts and real clients.',
      ca: 'Recordes la Nadia, la que vas conèixer en aquell viatge per Àsia? La seva empresa de rutes sostenibles ja factura bé i obrirà a Espanya. Es va recordar de tu: t\'ofereix entrar com a soci amb {parte}. T\'ensenya comptes auditats i clients reals.',
    },
    senales: ['conocido', 'negocio-real', 'iliquido'],
    opciones: [
      {
        id: 'entrar',
        texto: { es: 'Entrar con tus ahorros ({parte})', en: 'Go in with your savings ({parte})', ca: 'Entrar amb els teus estalvis ({parte})' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('parte')
          if (p.dinero < c) return { rechazo: true, nota: { es: 'No tienes el dinero líquido. Quedaba la opción del préstamo — pero ya has dicho que con ahorros, y no llegan.', en: 'You don\'t have the cash. The loan was an option — but you said savings, and they don\'t stretch.', ca: 'No tens els diners líquids. Quedava l\'opció del préstec — però has dit que amb estalvis, i no arriben.' } }
          ctx.dinero(-c)
          ctx.activo({ id: 'negocio-nadia', tipo: 'negocio', invertido: c, senales: ['conocido', 'negocio-real', 'iliquido'], oculto: { pQuiebraAnual: 0.06, renta: 0.13 }, nombre: { es: 'La empresa de Nadia', en: 'Nadia\'s company', ca: 'L\'empresa de la Nadia' } })
          return { nota: { es: 'Dentro. Aquel viaje de los 25 acaba de convertirse en la inversión con mejor pinta de tu vida. Las experiencias también componen interés.', en: 'You\'re in. That trip at 25 just became the best-looking investment of your life. Experiences compound too.', ca: 'Dins. Aquell viatge dels 25 acaba de convertir-se en la inversió amb més bona pinta de la teva vida. Les experiències també componen interès.' } }
        },
      },
      {
        id: 'prestamo',
        texto: { es: 'Entrar pidiendo un préstamo', en: 'Go in with a loan', ca: 'Entrar demanant un préstec' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('parte')
          ctx.prestamo({ importe: c, años: 5 })
          ctx.activo({ id: 'negocio-nadia', tipo: 'negocio', invertido: c, senales: ['conocido', 'negocio-real', 'iliquido'], oculto: { pQuiebraAnual: 0.06, renta: 0.13 }, nombre: { es: 'La empresa de Nadia', en: 'Nadia\'s company', ca: 'L\'empresa de la Nadia' } })
          return { nota: { es: 'Dentro, con dinero del banco. Endeudarse para invertir no es malo en sí: multiplica el resultado, sea cual sea. Si la empresa va, las rentas pagarán las cuotas; si cae, las cuotas seguirán llegando igual.', en: 'You\'re in, with the bank\'s money. Borrowing to invest isn\'t inherently bad: it multiplies the outcome, whatever it is. If the company thrives, the income pays the instalments; if it falls, the instalments keep coming anyway.', ca: 'Dins, amb diners del banc. Endeutar-se per invertir no és dolent en si: multiplica el resultat, sigui quin sigui. Si l\'empresa va bé, les rendes pagaran les quotes; si cau, les quotes seguiran arribant igual.' } }
        },
      },
      {
        id: 'no',
        texto: { es: 'Desearle suerte', en: 'Wish her luck', ca: 'Desitjar-li sort' },
        aplicar: () => ({ nota: { es: 'Quizá fue prudencia, quizá miedo. Los negocios de los amigos que salen bien son los que más se recuerdan… desde fuera.', en: 'Maybe prudence, maybe fear. Friends\' businesses that work out are the ones you remember most… from the outside.', ca: 'Potser va ser prudència, potser por. Els negocis dels amics que surten bé són els que més es recorden… des de fora.' } }),
      },
    ],
  },
  {
    id: 'segunda-carrera',
    edad: [33, 45],
    prob: 0.55,
    condicion: p => p.ingresos > 0 && !p.estudios && p.paroMeses === 0 && p.ingresos < techoSalarial(p) * 0.98,
    cantidades: { coste: 6000 },
    texto: {
      es: 'Tu trabajo se ha estancado y hay un campo que te tira desde siempre. Estudiar otra carrera a distancia, por las tardes: {coste} y dos años sin apenas vida social. Nadie te asegura que el mercado premie el cambio.',
      en: 'Your job has stalled and there\'s a field that has always pulled at you. Studying another degree remotely, in the evenings: {coste} and two years with barely any social life. Nobody guarantees the market will reward the switch.',
      ca: 'La teva feina s\'ha estancat i hi ha un camp que et tira des de sempre. Estudiar una altra carrera a distància, per les tardes: {coste} i dos anys gairebé sense vida social. Ningú t\'assegura que el mercat premiï el canvi.',
    },
    senales: ['iliquido'],
    opciones: [
      {
        id: 'estudiar',
        texto: { es: 'Reinventarte ({coste})', en: 'Reinvent yourself ({coste})', ca: 'Reinventar-te ({coste})' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('coste')
          if (p.dinero < c) return { rechazo: true, nota: { es: 'No te lo puedes permitir ahora. La espinita se queda.', en: 'You can\'t afford it right now. The itch remains.', ca: 'No t\'ho pots permetre ara. L\'espineta es queda.' } }
          ctx.dinero(-c)
          ctx.bienestar(-4)
          ctx.experiencia({ es: `Reinventarte a los ${p.edad}`, en: `Reinventing yourself at ${p.edad}`, ca: `Reinventar-te als ${p.edad}` })
          if (ctx.rng() < 0.6) {
            p.ingresos = Math.min(techoSalarial(p), Math.round(p.ingresos * 1.18))
            return { nota: { es: 'Dos años duros… y funciona: cambias de campo con subida. Reinventarse de adulto es caro en tiempo y dinero — esta vez salió a cuenta.', en: 'Two hard years… and it works: you switch fields with a raise. Reinventing yourself as an adult is expensive in time and money — this time it paid.', ca: 'Dos anys durs… i funciona: canvies de camp amb pujada. Reinventar-se d\'adult és car en temps i diners — aquesta vegada va sortir a compte.' } }
          }
          return { nota: { es: 'Acabas la carrera… y el cambio no llega: en tu zona ese sector paga igual o menos. El título no siempre mueve el mercado. Aprendiste, eso nadie lo devuelve — pero la cuenta no salió.', en: 'You finish the degree… and the switch never comes: in your area that sector pays the same or less. A diploma doesn\'t always move the market. You learned, nobody takes that back — but the maths didn\'t work out.', ca: 'Acabes la carrera… i el canvi no arriba: a la teva zona aquest sector paga igual o menys. El títol no sempre mou el mercat. Vas aprendre, això ningú ho torna — però el compte no va sortir.' } }
        },
      },
      {
        id: 'no',
        texto: { es: 'Dejarlo estar', en: 'Let it be', ca: 'Deixar-ho estar' },
        aplicar: () => ({ nota: { es: 'Quizá era el momento, quizá no. Las espinitas no cotizan, pero pesan.', en: 'Maybe it was the moment, maybe not. Itches aren\'t listed anywhere, but they weigh.', ca: 'Potser era el moment, potser no. Les espinetes no cotitzen, però pesen.' } }),
      },
    ],
  },
  {
    id: 'emprender',
    edad: [34, 46],
    prob: 0.6,
    condicion: p => p.ingresos > 0 && !p.estudios && p.paroMeses === 0,
    cantidades: { inversion: 15000 },
    senales: ['negocio-real', 'iliquido'],
    texto: {
      es: 'La idea que llevas años rumiando ya tiene números: montar tu propio negocio sin dejar (aún) el trabajo cuesta {inversion}. Conoces el sector, has hecho el plan… y sabes que la mayoría no sobrevive 5 años.',
      en: 'The idea you\'ve been chewing on for years finally has numbers: starting your own business without (yet) quitting your job costs {inversion}. You know the sector, you\'ve done the plan… and you know most don\'t survive 5 years.',
      ca: 'La idea que fa anys que rumies ja té números: muntar el teu propi negoci sense deixar (encara) la feina costa {inversion}. Coneixes el sector, has fet el pla… i saps que la majoria no sobreviu 5 anys.',
    },
    opciones: [
      {
        id: 'ahorros',
        texto: { es: 'Montarlo con tus ahorros ({inversion})', en: 'Start it with your savings ({inversion})', ca: 'Muntar-lo amb els teus estalvis ({inversion})' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('inversion')
          if (p.dinero < c) return { rechazo: true, nota: { es: 'No llegas con ahorros. Quedaba el préstamo — pero has dicho ahorros, y no dan.', en: 'Your savings don\'t stretch. The loan was there — but you said savings, and they don\'t reach.', ca: 'No hi arribes amb estalvis. Quedava el préstec — però has dit estalvis, i no donen.' } }
          ctx.dinero(-c)
          ctx.activo({ id: 'mi-negocio', tipo: 'negocio', invertido: c, senales: ['negocio-real', 'iliquido'], oculto: { pQuiebraAnual: 0.16, renta: 0.18 }, nombre: { es: 'Tu propio negocio', en: 'Your own business', ca: 'El teu propi negoci' } })
          return { nota: { es: 'En marcha. Es tuyo: las alegrías y los sustos también. Emprender es la inversión con más varianza que existe — y la única donde tú eres parte del activo.', en: 'It\'s running. It\'s yours: the joys and the scares too. A business is the highest-variance investment there is — and the only one where you\'re part of the asset.', ca: 'En marxa. És teu: les alegries i els ensurts també. Emprendre és la inversió amb més variància que existeix — i l\'única on tu ets part de l\'actiu.' } }
        },
      },
      {
        id: 'prestamo',
        texto: { es: 'Montarlo con un préstamo', en: 'Start it with a loan', ca: 'Muntar-lo amb un préstec' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('inversion')
          ctx.prestamo({ importe: c, años: 5 })
          ctx.activo({ id: 'mi-negocio', tipo: 'negocio', invertido: c, senales: ['negocio-real', 'iliquido'], oculto: { pQuiebraAnual: 0.16, renta: 0.18 }, nombre: { es: 'Tu propio negocio', en: 'Your own business', ca: 'El teu propi negoci' } })
          return { nota: { es: 'En marcha, con el banco de copiloto. Financiar un negocio con plan y sector conocido es de los usos más legítimos de la deuda — lo que no la hace menos picante si viene mal dada.', en: 'It\'s running, with the bank riding shotgun. Financing a planned business in a sector you know is one of debt\'s most legitimate uses — which doesn\'t make it less spicy if things go south.', ca: 'En marxa, amb el banc de copilot. Finançar un negoci amb pla i sector conegut és dels usos més legítims del deute — cosa que no el fa menys picant si ve mal dat.' } }
        },
      },
      {
        id: 'no',
        texto: { es: 'Seguir rumiándola', en: 'Keep chewing on it', ca: 'Seguir rumiant-la' },
        aplicar: () => ({ nota: { es: 'La idea vuelve al cajón. A veces es prudencia; a veces, dentro de 20 años, se llama arrepentimiento. Imposible saberlo hoy.', en: 'The idea goes back in the drawer. Sometimes that\'s prudence; sometimes, 20 years later, it\'s called regret. Impossible to know today.', ca: 'La idea torna al calaix. De vegades és prudència; de vegades, d\'aquí a 20 anys, es diu penediment. Impossible saber-ho avui.' } }),
      },
    ],
  },
  {
    id: 'cripto-seria',
    edad: [38, 50],
    prob: 0.6,
    cantidades: { compra: 3000 },
    senales: ['volatil', 'no-regulado'],
    texto: {
      es: 'Años después del "chollo" del gimnasio, las criptomonedas grandes siguen existiendo. Una plataforma conocida, comisiones claras y cero promesas: puede doblar en dos años o valer la mitad. ¿Metes {compra}?',
      en: 'Years after the gym "bargain", the big cryptocurrencies still exist. A well-known platform, clear fees and zero promises: it could double in two years or be worth half. Do you put in {compra}?',
      ca: 'Anys després del "xollo" del gimnàs, les criptomonedes grans segueixen existint. Una plataforma coneguda, comissions clares i zero promeses: pot doblar en dos anys o valer la meitat. Hi poses {compra}?',
    },
    opciones: [
      {
        id: 'comprar',
        texto: { es: 'Comprar {compra} y aguantar', en: 'Buy {compra} and hold', ca: 'Comprar {compra} i aguantar' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('compra')
          if (p.dinero < c) return { rechazo: true, nota: { es: 'No tienes ese dinero suelto — y esto solo se juega con dinero que puedas ver caer.', en: 'You don\'t have that money spare — and this is only played with money you can watch fall.', ca: 'No tens aquests diners solts — i això només es juga amb diners que puguis veure caure.' } }
          ctx.dinero(-c)
          ctx.activo({ id: 'cripto-seria-1', tipo: 'turbio', invertido: c, senales: ['volatil', 'no-regulado'], oculto: { pQuiebraAnual: 0.06, retorno: 0.10, vol: 0.55, horizonte: 6 }, nombre: { es: 'Tus criptomonedas', en: 'Your crypto', ca: 'Les teves criptomonedes' } })
          return { nota: { es: 'Sin humo esta vez: nadie te prometió nada y sabes lo que compras — volatilidad pura. La regla: solo lo que puedas ver caer a la mitad sin perder el sueño.', en: 'No smoke this time: nobody promised anything and you know what you\'re buying — pure volatility. The rule: only what you can watch halve without losing sleep.', ca: 'Sense fum aquesta vegada: ningú et va prometre res i saps què compres — volatilitat pura. La regla: només el que puguis veure caure a la meitat sense perdre la son.' } }
        },
      },
      {
        id: 'no',
        texto: { es: 'Pasar — no lo necesitas', en: 'Pass — you don\'t need it', ca: 'Passar — no ho necessites' },
        aplicar: () => ({ nota: { es: 'También es una respuesta correcta: nadie se arruinó por no comprar algo. Dormir tranquilo tiene su propia rentabilidad.', en: 'Also a correct answer: nobody ever went broke by not buying something. Sleeping well has its own return.', ca: 'També és una resposta correcta: ningú es va arruïnar per no comprar una cosa. Dormir tranquil té la seva pròpia rendibilitat.' } }),
      },
    ],
  },
  {
    id: 'cartas-pokemon',
    edad: [35, 45],
    prob: 0.55,
    cantidades: { caja: 900 },
    senales: ['especulativo'],
    texto: {
      es: 'Nostalgia en subasta: una caja SELLADA de las cartas de tu infancia por {caja}. En los foros juran que "solo puede subir" — los mismos foros que compran todos a la vez.',
      en: 'Nostalgia at auction: a SEALED box of your childhood trading cards for {caja}. The forums swear it "can only go up" — the same forums where everyone buys at once.',
      ca: 'Nostàlgia en subhasta: una caixa PRECINTADA de les cartes de la teva infància per {caja}. Als fòrums juren que "només pot pujar" — els mateixos fòrums que compren tots alhora.',
    },
    opciones: [
      {
        id: 'comprar',
        texto: { es: 'Comprar la caja ({caja})', en: 'Buy the box ({caja})', ca: 'Comprar la caixa ({caja})' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('caja')
          ctx.dinero(-c)
          ctx.activo({ id: 'cartas-1', tipo: 'turbio', invertido: c, senales: ['especulativo'], oculto: { pQuiebraAnual: 0.04, retorno: 0.03, vol: 0.5, horizonte: 7 }, nombre: { es: 'La caja sellada de cartas', en: 'The sealed card box', ca: 'La caixa precintada de cartes' } })
          return { nota: { es: 'A la estantería, sin abrir. Los coleccionables no producen nada: valen exactamente lo que otro nostálgico pague el día que vendas. Eso puede ser mucho — o nada.', en: 'Onto the shelf, unopened. Collectibles produce nothing: they\'re worth exactly what another nostalgic pays the day you sell. That can be a lot — or nothing.', ca: 'A la prestatgeria, sense obrir. Els col·leccionables no produeixen res: valen exactament el que un altre nostàlgic pagui el dia que venguis. Això pot ser molt — o res.' } }
        },
      },
      {
        id: 'no',
        texto: { es: 'Sonreír y cerrar la subasta', en: 'Smile and close the auction', ca: 'Somriure i tancar la subhasta' },
        aplicar: () => ({ nota: { es: 'El niño que fuiste ya vivió esas cartas gratis. La nostalgia es tuya; la caja, que se la quede otro.', en: 'The kid you were already lived those cards for free. The nostalgia is yours; someone else can keep the box.', ca: 'El nen que vas ser ja va viure aquestes cartes gratis. La nostàlgia és teva; la caixa, que se la quedi un altre.' } }),
      },
    ],
  },
  {
    id: 'relojes',
    edad: [47, 55],
    condicion: p => p.ingresos > 0 && !p.estudios,
    prob: 0.5,
    cantidades: { reloj: 6000 },
    senales: ['especulativo', 'iliquido'],
    texto: {
      es: 'Un compañero te enseña su muñeca: "esto nunca baja, es oro con correa". Hay un modelo con lista de espera que "se revaloriza seguro": {reloj}. Elegante, sí. ¿Inversión?',
      en: 'A colleague shows you his wrist: "this never drops, it\'s gold with a strap". There\'s a waitlisted model that "appreciates for sure": {reloj}. Elegant, yes. An investment?',
      ca: 'Un company t\'ensenya el canell: "això mai baixa, és or amb corretja". Hi ha un model amb llista d\'espera que "es revaloritza segur": {reloj}. Elegant, sí. Inversió?',
    },
    opciones: [
      {
        id: 'comprar',
        texto: { es: 'Comprar el reloj ({reloj})', en: 'Buy the watch ({reloj})', ca: 'Comprar el rellotge ({reloj})' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('reloj')
          if (p.dinero < c) return { rechazo: true, nota: { es: 'La lista de espera seguirá sin ti. Tu cuenta lo agradece.', en: 'The waitlist will go on without you. Your account is grateful.', ca: 'La llista d\'espera seguirà sense tu. El teu compte ho agraeix.' } }
          ctx.dinero(-c)
          ctx.bienestar(3)
          ctx.activo({ id: 'reloj-1', tipo: 'turbio', invertido: c, senales: ['especulativo', 'iliquido'], oculto: { pQuiebraAnual: 0.04, retorno: 0.04, vol: 0.28, horizonte: 8 }, nombre: { es: 'El reloj de colección', en: 'The collector\'s watch', ca: 'El rellotge de col·lecció' } })
          return { nota: { es: 'Precioso en la muñeca — disfrútalo, que eso ya lo has cobrado. Como inversión depende de modas y de que otro pague más: "nunca baja"… hasta que baja.', en: 'Gorgeous on the wrist — enjoy it, that part you\'ve already collected. As an investment it depends on fashion and someone paying more: "never drops"… until it drops.', ca: 'Preciós al canell — gaudeix-lo, que això ja ho has cobrat. Com a inversió depèn de modes i que un altre pagui més: "mai baixa"… fins que baixa.' } }
        },
      },
      {
        id: 'no',
        texto: { es: 'Tu reloj de siempre va bien', en: 'Your usual watch works fine', ca: 'El teu rellotge de sempre va bé' },
        aplicar: () => ({ nota: { es: 'Da la misma hora. Cuando "todo el mundo sabe" que algo solo puede subir, sospecha: esa frase ha pagado muchos áticos… de los que venden.', en: 'It tells the same time. When "everybody knows" something can only go up, be suspicious: that phrase has paid for many penthouses… of the sellers.', ca: 'Dona la mateixa hora. Quan "tothom sap" que una cosa només pot pujar, sospita: aquesta frase ha pagat molts àtics… dels que venen.' } }),
      },
    ],
  },
  {
    id: 'master-caduco',
    edad: [42, 43],
    requiere: ['formacion', 'master-caduco'],
    condicion: p => p.ingresos > 0 && !p.estudios && p.paroMeses === 0,
    texto: {
      es: 'Malas noticias silenciosas: tu sector ha pivotado y aquel máster que pagaste apenas cuenta ya en las entrevistas. Nadie te devuelve el dinero ni el año.',
      en: 'Quiet bad news: your sector has pivoted and that master\'s you paid for barely counts in interviews anymore. Nobody refunds the money or the year.',
      ca: 'Males notícies silencioses: el teu sector ha pivotat i aquell màster que vas pagar gairebé ja no compta a les entrevistes. Ningú et torna els diners ni l\'any.',
    },
    opciones: [
      {
        id: 'asumir',
        texto: { es: 'Asumirlo y seguir', en: 'Accept it and move on', ca: 'Assumir-ho i seguir' },
        aplicar: (p, ctx) => {
          ctx.autopsia({ tipo: 'neutra', titulo: { es: 'El máster que no se amortizó', en: 'The master\'s that never paid off', ca: 'El màster que no es va amortitzar' }, senales: [], texto: { es: 'Formarse suele compensar, pero no es una garantía: a ~1 de cada 5 personas el mercado les cambia debajo de los pies. Fue una buena apuesta con mal dado — no una mala decisión.', en: 'Training usually pays, but it\'s no guarantee: for ~1 in 5 people the market shifts under their feet. It was a good bet with a bad roll — not a bad decision.', ca: 'Formar-se sol compensar, però no és una garantia: a ~1 de cada 5 persones el mercat els canvia sota els peus. Va ser una bona aposta amb mal dau — no una mala decisió.' } })
          return { nota: { es: 'La formación no caduca del todo — aprendiste a aprender. Pero el ascenso que esperabas no vendrá por esa puerta.', en: 'Training never fully expires — you learned how to learn. But the promotion you hoped for won\'t come through that door.', ca: 'La formació no caduca del tot — vas aprendre a aprendre. Però l\'ascens que esperaves no vindrà per aquesta porta.' } }
        },
      },
    ],
  },
  {
    id: 'ascenso',
    edad: [42, 43],
    requiere: ['formacion', 'master-util'],
    condicion: p => p.ingresos > 0 && !p.estudios && p.paroMeses === 0 && p.ingresos < techoSalarial(p) * 0.98,
    texto: {
      es: 'Se abre una plaza de dirección y tu máster te pone el primero de la lista. Más sueldo (+30%)… y más horas, más viajes, más teléfono encendido a las 22h.',
      en: 'A management position opens and your master\'s puts you first in line. More salary (+30%)… and more hours, more travel, more phone on at 10pm.',
      ca: 'S\'obre una plaça de direcció i el teu màster et posa el primer de la llista. Més sou (+30%)… i més hores, més viatges, més telèfon encès a les 22h.',
    },
    opciones: [
      {
        id: 'aceptar',
        texto: { es: 'Aceptar la dirección (+30%)', en: 'Take the management job (+30%)', ca: 'Acceptar la direcció (+30%)' },
        aplicar: (p, ctx) => {
          p.ingresos = Math.min(techoSalarial(p), Math.round(p.ingresos * 1.3))
          ctx.bienestar(-8)
          return { nota: { es: 'El máster de los 23 por fin se paga solo — con intereses. La factura ahora es de tiempo, no de dinero.', en: 'The master\'s from age 23 finally pays for itself — with interest. The bill now comes in time, not money.', ca: 'El màster dels 23 per fi es paga sol — amb interessos. La factura ara és de temps, no de diners.' } }
        },
      },
      {
        id: 'rechazar',
        texto: { es: 'Rechazarla y proteger tu tiempo', en: 'Turn it down and protect your time', ca: 'Rebutjar-la i protegir el teu temps' },
        aplicar: (p, ctx) => {
          ctx.bienestar(6)
          ctx.experiencia({ es: 'Elegiste tiempo sobre dinero', en: 'You chose time over money', ca: 'Vas triar temps sobre diners' })
          return { nota: { es: 'Menos sueldo del que podrías tener, más tardes tuyas. Hay gente que se arrepiente de esto y gente que se arrepiente de lo contrario.', en: 'Less salary than you could have, more afternoons of your own. Some people regret this, and some regret the opposite.', ca: 'Menys sou del que podries tenir, més tardes teves. Hi ha gent que se\'n penedeix d\'això i gent que se\'n penedeix del contrari.' } }
        },
      },
    ],
  },
  {
    id: 'contacto-boda',
    edad: [44, 45],
    requiere: ['red-social'],
    condicion: p => p.ingresos > 0 && !p.estudios && p.paroMeses === 0 && p.ingresos < techoSalarial(p) * 0.98,
    texto: {
      es: 'Te llama alguien que conociste en una boda hace años: dirige una empresa consolidada y busca a alguien de tu perfil. Oferta seria: +15% de sueldo y estabilidad de las de antes.',
      en: 'Someone you met at a wedding years ago calls: they run an established company and want someone with your profile. A serious offer: +15% salary and old-school stability.',
      ca: 'Et truca algú que vas conèixer en una boda fa anys: dirigeix una empresa consolidada i busca algú del teu perfil. Oferta seriosa: +15% de sou i estabilitat de les d\'abans.',
    },
    senales: ['conocido', 'entidad-seria'],
    opciones: [
      {
        id: 'aceptar',
        texto: { es: 'Aceptar la oferta (+15%)', en: 'Take the offer (+15%)', ca: 'Acceptar l\'oferta (+15%)' },
        aplicar: (p, ctx) => {
          p.ingresos = Math.min(techoSalarial(p), Math.round(p.ingresos * 1.15))
          ctx.flag('empleo-estable')
          return { nota: { es: 'Aquella boda a la que fuiste "aunque ibas apurado" acaba de subirte el sueldo. Nadie contrata a un desconocido: la red se cultiva antes de necesitarla.', en: 'That wedding you attended "even though money was tight" just raised your salary. Nobody hires a stranger: networks are built before you need them.', ca: 'Aquella boda a la qual vas anar "encara que anaves apurat" acaba de pujar-te el sou. Ningú contracta un desconegut: la xarxa es cultiva abans de necessitar-la.' } }
        },
      },
      {
        id: 'no',
        texto: { es: 'Quedarte donde estás', en: 'Stay where you are', ca: 'Quedar-te on ets' },
        aplicar: () => ({ nota: { es: 'Estar a gusto también cotiza. La oferta queda en buenos términos — la red sigue ahí.', en: 'Being happy where you are has value too. The offer ends on good terms — the network is still there.', ca: 'Estar a gust també cotitza. L\'oferta queda en bons termes — la xarxa segueix aquí.' } }),
      },
    ],
  },
  {
    id: 'bar-socio',
    edad: [46, 47],
    prob: 0.8,
    cantidades: { parte: 10000 },
    texto: {
      es: 'Tu mejor amiga monta un bar en un buen local. Lleva 10 años en hostelería y tiene el plan hecho. Te ofrece ser socio con {parte}. Te enseña las cuentas: no promete nada, "los bares son duros, pero este puede ir bien".',
      en: 'Your best friend opens a bar in a good spot. She has 10 years in hospitality and a solid plan. She offers you a stake for {parte}. She shows you the numbers: no promises, "bars are tough, but this one could work".',
      ca: 'La teva millor amiga munta un bar en un bon local. Porta 10 anys a l\'hostaleria i té el pla fet. T\'ofereix ser soci amb {parte}. T\'ensenya els comptes: no promet res, "els bars són durs, però aquest pot anar bé".',
    },
    senales: ['conocido', 'negocio-real', 'iliquido'],
    opciones: [
      {
        id: 'socio',
        texto: { es: 'Entrar como socio ({parte})', en: 'Become a partner ({parte})', ca: 'Entrar com a soci ({parte})' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('parte')
          if (p.dinero < c) return { rechazo: true, nota: { es: 'No tienes ese dinero disponible. Le deseas suerte de corazón.', en: 'You don\'t have that money available. You sincerely wish her luck.', ca: 'No tens aquests diners disponibles. Li desitges sort de tot cor.' } }
          ctx.dinero(-c)
          ctx.activo({ id: 'bar-1', tipo: 'negocio', invertido: c, senales: ['conocido', 'negocio-real', 'iliquido'], oculto: { pQuiebraAnual: 0.11, renta: 0.12 }, nombre: { es: 'El bar de tu amiga', en: 'Your friend\'s bar', ca: 'El bar de la teva amiga' } })
          return { nota: { es: 'Socio. Esto no es la cripto del gimnasio: negocio real, cuentas sobre la mesa y sin promesas mágicas. Sigue siendo arriesgado — la mitad de los bares cierran.', en: 'Partner. This isn\'t the gym crypto: real business, numbers on the table, no magic promises. Still risky — half of all bars close.', ca: 'Soci. Això no és la cripto del gimnàs: negoci real, comptes sobre la taula i sense promeses màgiques. Segueix sent arriscat — la meitat dels bars tanquen.' } }
        },
      },
      {
        id: 'prestamo',
        texto: { es: 'Entrar pidiendo un préstamo', en: 'Go in with a loan', ca: 'Entrar demanant un préstec' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('parte')
          ctx.prestamo({ importe: c, años: 5 })
          ctx.activo({ id: 'bar-1', tipo: 'negocio', invertido: c, senales: ['conocido', 'negocio-real', 'iliquido'], oculto: { pQuiebraAnual: 0.11, renta: 0.12 }, nombre: { es: 'El bar de tu amiga', en: 'Your friend\'s bar', ca: 'El bar de la teva amiga' } })
          return { nota: { es: 'Socio con dinero prestado: apalancado. Si el bar funciona, sus rentas pagan las cuotas y todos contentos. Si cierra, deberás las cuotas de algo que ya no existe. Más picante que entrar con ahorros.', en: 'A partner with borrowed money: leveraged. If the bar works, its income pays the instalments and everyone\'s happy. If it closes, you\'ll owe instalments on something that no longer exists. Spicier than going in with savings.', ca: 'Soci amb diners prestats: palanquejat. Si el bar funciona, les rendes paguen les quotes i tots contents. Si tanca, deuràs les quotes d\'una cosa que ja no existeix. Més picant que entrar amb estalvis.' } }
        },
      },
      {
        id: 'no',
        texto: { es: 'Apoyarla, pero sin invertir', en: 'Support her, but not invest', ca: 'Donar-li suport, però sense invertir' },
        aplicar: () => ({ nota: { es: 'Decisión respetable: mezclar dinero y amistad tiene un riesgo que no sale en las cuentas.', en: 'A respectable call: mixing money and friendship carries a risk that doesn\'t show in the numbers.', ca: 'Decisió respectable: barrejar diners i amistat té un risc que no surt als comptes.' } }),
      },
    ],
  },
  {
    id: 'herencia',
    edad: [48, 49],
    prob: 0.5,
    cantidades: { herencia: 15000 },
    texto: {
      es: 'Tu tía abuela te deja {herencia} en herencia. Dinero caído del cielo — y las decisiones con dinero regalado son las que más retratan.',
      en: 'Your great-aunt leaves you {herencia}. Money from the sky — and decisions with gifted money reveal the most.',
      ca: 'La teva tia àvia et deixa {herencia} d\'herència. Diners caiguts del cel — i les decisions amb diners regalats són les que més retraten.',
    },
    opciones: [
      {
        id: 'amortizar',
        texto: { es: 'Amortizar hipoteca', en: 'Pay down the mortgage', ca: 'Amortitzar hipoteca' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('herencia')
          if (!p.hipoteca) return { rechazo: true, nota: { es: 'No tienes hipoteca que amortizar. El dinero se queda en tu cuenta.', en: 'You have no mortgage to pay down. The money stays in your account.', ca: 'No tens hipoteca per amortitzar. Els diners es queden al teu compte.' } }
          p.hipoteca.pendiente = Math.max(0, p.hipoteca.pendiente - c)
          p.hipoteca.años = Math.max(1, p.hipoteca.años - 4)
          return { nota: { es: 'Cuatro años menos de hipoteca. Deber menos también es una forma de ganar.', en: 'Four fewer years of mortgage. Owing less is also a way of winning.', ca: 'Quatre anys menys d\'hipoteca. Deure menys també és una manera de guanyar.' } }
        },
      },
      {
        id: 'invertir',
        texto: { es: 'Al fondo indexado', en: 'Into the index fund', ca: 'Al fons indexat' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('herencia')
          ctx.dinero(-0) // el dinero entra y sale hacia el fondo
          const fondo = p.activos.find(a => a.tipo === 'fondo' && a.estado === 'vivo')
          if (fondo) { fondo.valor += c; fondo.invertido += c }
          else ctx.activo({ id: 'fondo-1', tipo: 'fondo', invertido: c, senales: ['entidad-seria', 'diversificado'], nombre: { es: 'Fondo indexado global', en: 'Global index fund', ca: 'Fons indexat global' } })
          return { nota: { es: 'La herencia, a trabajar a largo plazo. Tu tía abuela habría sonreído.', en: 'The inheritance goes to work long-term. Your great-aunt would smile.', ca: 'L\'herència, a treballar a llarg termini. La teva tia àvia hauria somrigut.' } }
        },
      },
      {
        id: 'colchon',
        texto: { es: 'A la cuenta, por si acaso', en: 'Into the account, just in case', ca: 'Al compte, per si de cas' },
        aplicar: (p, ctx) => {
          ctx.dinero(ctx.cant('herencia'))
          return { nota: { es: 'Un colchón más gordo. Tener 6 meses de gastos a mano es sensato; más que eso, es dejar que la inflación muerda.', en: 'A fatter cushion. Having 6 months of expenses handy is wise; beyond that, you\'re letting inflation bite.', ca: 'Un coixí més gruixut. Tenir 6 mesos de despeses a mà és assenyat; més que això, és deixar que la inflació mossegui.' } }
        },
      },
    ],
  },
  {
    id: 'burnout',
    edad: [48, 49],
    condicion: p => p.bienestar < 40 && p.ingresos > 0 && !p.estudios && p.paroMeses === 0,
    texto: {
      es: 'El médico te mira por encima de las gafas: tensión alta, ansiedad, insomnio. "Su cuerpo lleva años pagando lo que su agenda no quiere pagar." Algo tiene que cambiar.',
      en: 'The doctor looks at you over her glasses: high blood pressure, anxiety, insomnia. "Your body has been paying for years what your calendar refuses to pay." Something has to change.',
      ca: 'La metgessa et mira per sobre de les ulleres: tensió alta, ansietat, insomni. "El seu cos fa anys que paga el que la seva agenda no vol pagar." Alguna cosa ha de canviar.',
    },
    opciones: [
      {
        id: 'frenar',
        texto: { es: 'Bajar el ritmo (−15% de ingresos)', en: 'Slow down (−15% income)', ca: 'Baixar el ritme (−15% d\'ingressos)' },
        aplicar: (p, ctx) => {
          p.ingresos = Math.round(p.ingresos * 0.85)
          ctx.bienestar(18)
          ctx.experiencia({ es: 'Aprendiste a frenar a tiempo', en: 'You learned to brake in time', ca: 'Vas aprendre a frenar a temps' })
          return { nota: { es: 'Menos nómina, más vida. La salud es el único activo que, cuando quiebra del todo, no tiene rescate.', en: 'Less payslip, more life. Health is the only asset that has no bailout when it fully collapses.', ca: 'Menys nòmina, més vida. La salut és l\'únic actiu que, quan fa fallida del tot, no té rescat.' } }
        },
      },
      {
        id: 'apretar',
        texto: { es: 'Apretar los dientes y seguir', en: 'Grit your teeth and push on', ca: 'Serrar les dents i seguir' },
        aplicar: (p, ctx) => {
          ctx.bienestar(-10)
          return { nota: { es: 'La nómina sigue intacta. El cuerpo toma nota y guarda la factura para más adelante.', en: 'The payslip stays intact. Your body takes note and saves the bill for later.', ca: 'La nòmina segueix intacta. El cos en pren nota i guarda la factura per a més endavant.' } }
        },
      },
    ],
  },
  {
    id: 'nivel-de-vida',
    edad: [50, 51],
    condicion: p => p.ingresos > 0 && !p.estudios && p.paroMeses === 0,
    texto: {
      es: 'Ganas más que nunca y lo notas: restaurantes mejores, ropa mejor, "¿por qué no?" más a menudo. Puedes subirte el tren de vida de verdad… o mantener el de siempre y que la diferencia trabaje.',
      en: 'You earn more than ever and it shows: better restaurants, better clothes, more frequent "why nots". You can genuinely upgrade your lifestyle… or keep the old one and let the difference work for you.',
      ca: 'Guanyes més que mai i es nota: restaurants millors, roba millor, "per què no?" més sovint. Pots pujar-te el tren de vida de debò… o mantenir el de sempre i que la diferència treballi.',
    },
    opciones: [
      {
        id: 'subir',
        texto: { es: 'Vivir mejor cada día (+30% de gastos)', en: 'Live better every day (+30% expenses)', ca: 'Viure millor cada dia (+30% de despeses)' },
        aplicar: (p, ctx) => {
          p.nivelVidaFactor *= 1.3
          ctx.recalcularGastos()
          ctx.bienestar(8)
          ctx.experiencia({ es: 'Años de vivir bien', en: 'Years of living well', ca: 'Anys de viure bé' })
          return { nota: { es: 'La vida sabe mejor. Ojo al detalle: los gastos que suben casi nunca vuelven a bajar — acabas de mover tu listón para siempre.', en: 'Life tastes better. Mind the detail: expenses that go up almost never come back down — you just moved your bar for good.', ca: 'La vida té més bon gust. Ull al detall: les despeses que pugen gairebé mai tornen a baixar — acabes de moure el teu llistó per sempre.' } }
        },
      },
      {
        id: 'mantener',
        texto: { es: 'Mantener tu nivel de siempre', en: 'Keep your usual lifestyle', ca: 'Mantenir el teu nivell de sempre' },
        aplicar: (p, ctx) => {
          ctx.flag('frugal')
          ctx.bienestar(-3)
          return { nota: { es: 'Cada subida de sueldo se convierte en ahorro en vez de en costumbre. Es la jugada silenciosa que más patrimonios ha construido… y también hay que saber disfrutar por el camino.', en: 'Every raise becomes savings instead of habit. It\'s the quiet move that has built the most fortunes… though you also need to enjoy the ride.', ca: 'Cada pujada de sou es converteix en estalvi en lloc de costum. És la jugada silenciosa que més patrimonis ha construït… i també cal saber gaudir pel camí.' } }
        },
      },
    ],
  },
  {
    id: 'imprevisto',
    edad: [55, 56],
    prob: 0.85,
    cantidades: { golpe: 4000, financiado: 5500 },
    texto: {
      es: 'Mala semana: la caldera revienta y al coche le toca una reparación seria. Total: {golpe}, y no pueden esperar. El taller ofrece financiarlo "cómodamente" (pagarías {financiado} en total).',
      en: 'Bad week: the boiler bursts and the car needs serious repairs. Total: {golpe}, and it can\'t wait. The garage offers to finance it "comfortably" (you\'d pay {financiado} in total).',
      ca: 'Mala setmana: la caldera rebenta i al cotxe li toca una reparació seriosa. Total: {golpe}, i no poden esperar. El taller ofereix finançar-ho "còmodament" (pagaries {financiado} en total).',
    },
    opciones: [
      {
        id: 'contado',
        texto: { es: 'Pagarlo del colchón ({golpe})', en: 'Pay it from savings ({golpe})', ca: 'Pagar-ho del coixí ({golpe})' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('golpe')
          if (p.dinero < c) return { rechazo: true, nota: { es: 'No tienes colchón que gastar: no te llega para pagarlo al contado. Toca financiarlo.', en: 'You don\'t have a cushion to spend: you can\'t cover it in cash. Time to finance it.', ca: 'No tens coixí per gastar: no t\'arriba per pagar-ho al comptat. Toca finançar-ho.' } }
          ctx.dinero(-c)
          return { nota: { es: 'Duele, pero se paga y se olvida. Exactamente para esto existe el colchón de emergencia: los imprevistos no avisan, se presentan.', en: 'It hurts, but you pay and move on. This is exactly what the emergency fund is for: surprises don\'t warn you, they just show up.', ca: 'Fa mal, però es paga i s\'oblida. Exactament per a això existeix el coixí d\'emergència: els imprevistos no avisen, es presenten.' } }
        },
      },
      {
        id: 'financiar',
        texto: { es: 'Financiarlo a plazos', en: 'Finance it in instalments', ca: 'Finançar-ho a terminis' },
        aplicar: (p, ctx) => {
          const golpe = ctx.cant('golpe')
          const financiado = ctx.cant('financiado')
          ctx.prestamo({ importe: golpe, años: 3, interes: financiado / golpe - 1 })
          return { nota: { es: `Pagarás ${ctx.f(financiado)} en total por un problema de ${ctx.f(golpe)}, en cuotas durante 3 años: la diferencia es el precio de no descapitalizarte de golpe. A veces compensa (si ese dinero está trabajando en otro sitio); si simplemente no había colchón, sale caro.`, en: `You'll pay ${ctx.f(financiado)} in total for a ${ctx.f(golpe)} problem, in instalments over 3 years: the difference is the price of not draining your cash at once. Sometimes it's worth it (if that money is working elsewhere); if there simply was no cushion, it's expensive.`, ca: `Pagaràs ${ctx.f(financiado)} en total per un problema de ${ctx.f(golpe)}, en quotes durant 3 anys: la diferència és el preu de no descapitalitzar-te de cop. De vegades compensa (si aquests diners treballen en un altre lloc); si simplement no hi havia coixí, surt car.` } }
        },
      },
    ],
  },
  {
    id: 'coche',
    edad: [53, 54],
    prob: 0.85,
    cantidades: { nuevo: 32000, cuotaTotal: 39000, usado: 9500 },
    texto: {
      es: 'Tu coche dice basta. El concesionario te tienta: uno nuevo por {nuevo}, "financiado cómodamente" (pagarás {cuotaTotal} en total). O uno de segunda mano decente al contado por {usado}.',
      en: 'Your car gives up. The dealer tempts you: a new one for {nuevo}, "comfortably financed" (you\'ll pay {cuotaTotal} in total). Or a decent used one for {usado} cash.',
      ca: 'El teu cotxe diu prou. El concessionari et tempta: un de nou per {nuevo}, "finançat còmodament" (pagaràs {cuotaTotal} en total). O un de segona mà decent al comptat per {usado}.',
    },
    opciones: [
      {
        id: 'nuevo',
        texto: { es: 'Nuevo financiado', en: 'New, financed', ca: 'Nou finançat' },
        aplicar: (p, ctx) => {
          // "Financiado cómodamente": un préstamo a cuotas, no un pago de golpe
          const precio = ctx.cant('nuevo')
          const total = ctx.cant('cuotaTotal')
          ctx.prestamo({ importe: precio, años: 5, interes: total / precio - 1 })
          ctx.bienestar(4)
          return { nota: { es: `Huele a nuevo y da gusto conducirlo. Ahora hay una cuota fija cada mes durante 5 años — en total, ${ctx.f(total)}. Ni héroe ni villano: una compra con su coste.`, en: `That new car smell, and it's a joy to drive. Now there's a fixed instalment every month for 5 years — ${ctx.f(total)} in total. Neither hero nor villain: a purchase with its cost.`, ca: `Olor de nou i dona gust conduir-lo. Ara hi ha una quota fixa cada mes durant 5 anys — en total, ${ctx.f(total)}. Ni heroi ni vilà: una compra amb el seu cost.` } }
        },
      },
      {
        id: 'usado',
        texto: { es: 'Segunda mano al contado', en: 'Used, cash', ca: 'Segona mà al comptat' },
        aplicar: (p, ctx) => {
          ctx.dinero(-ctx.cant('usado'))
          return { nota: { es: 'Te lleva igual de bien a los mismos sitios. Un coche nuevo pierde un 20% de valor al salir del concesionario — este ya lo perdió por ti.', en: 'It takes you to the same places just as well. A new car loses 20% of its value leaving the lot — this one already lost it for you.', ca: 'Et porta igual de bé als mateixos llocs. Un cotxe nou perd un 20% de valor en sortir del concessionari — aquest ja el va perdre per tu.' } }
        },
      },
    ],
  },
  {
    id: 'timo-paraiso',
    edad: [59, 60],
    prob: 0.85,
    cantidades: { mucho: 20000, poco: 5000 },
    texto: {
      es: 'Un "gestor patrimonial" que conociste en una cena te ofrece algo "solo para gente selecta": una sociedad en un paraíso fiscal con retorno garantizado del 18% anual. Papeles impecables, palabras complicadas, y una cuenta atrás: "el fondo se cierra el viernes".',
      en: 'A "wealth manager" you met at a dinner offers something "only for select people": an offshore company with a guaranteed 18% yearly return. Impeccable papers, complicated words, and a countdown: "the fund closes on Friday".',
      ca: 'Un "gestor patrimonial" que vas conèixer en un sopar t\'ofereix una cosa "només per a gent selecta": una societat en un paradís fiscal amb retorn garantit del 18% anual. Papers impecables, paraules complicades, i un compte enrere: "el fons es tanca divendres".',
    },
    senales: ['garantizado', 'no-regulado', 'presion', 'fuente-turbia'],
    opciones: [
      {
        id: 'fuerte',
        texto: { es: 'Entrar con {mucho}', en: 'Go in with {mucho}', ca: 'Entrar amb {mucho}' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('mucho')
          if (p.dinero < c) return { rechazo: true, nota: { es: 'No tienes esa cantidad líquida. El "gestor" pierde tu teléfono al instante.', en: 'You don\'t have that much liquid. The "manager" instantly loses your number.', ca: 'No tens aquesta quantitat líquida. El "gestor" perd el teu telèfon a l\'instant.' } }
          ctx.dinero(-c)
          ctx.activo({ id: 'paraiso-1', tipo: 'turbio', invertido: c, senales: ['garantizado', 'no-regulado', 'presion', 'fuente-turbia'], oculto: { pQuiebraAnual: 0.5, retorno: 0.18, vol: 0.1, horizonte: 3 }, nombre: { es: 'La sociedad del paraíso fiscal', en: 'The offshore company', ca: 'La societat del paradís fiscal' } })
          return { nota: { es: 'Hecho. Todo muy elegante. Demasiado elegante.', en: 'Done. All very elegant. Too elegant.', ca: 'Fet. Tot molt elegant. Massa elegant.' } }
        },
      },
      {
        id: 'suave',
        texto: { es: 'Probar "solo" con {poco}', en: '"Just" try with {poco}', ca: 'Provar "només" amb {poco}' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('poco')
          ctx.dinero(-c)
          ctx.activo({ id: 'paraiso-1', tipo: 'turbio', invertido: c, senales: ['garantizado', 'no-regulado', 'presion', 'fuente-turbia'], oculto: { pQuiebraAnual: 0.5, retorno: 0.18, vol: 0.1, horizonte: 3 }, nombre: { es: 'La sociedad del paraíso fiscal', en: 'The offshore company', ca: 'La societat del paradís fiscal' } })
          return { nota: { es: 'Entras "con poco para probar". Así empiezan casi todas las historias que acaban mal.', en: 'You go in "small, just to try". That\'s how almost every story that ends badly begins.', ca: 'Entres "amb poc per provar". Així comencen gairebé totes les històries que acaben malament.' } }
        },
      },
      {
        id: 'huir',
        texto: { es: 'Rechazarlo educadamente', en: 'Politely decline', ca: 'Rebutjar-ho educadament' },
        aplicar: (p, ctx) => {
          ctx.flag('esquivo-paraiso')
          return { nota: { es: 'Un 18% "garantizado" no existe: si existiera, no te lo ofrecerían a ti en una cena. Bien visto.', en: 'A "guaranteed" 18% doesn\'t exist: if it did, they wouldn\'t be offering it to YOU at a dinner. Well spotted.', ca: 'Un 18% "garantit" no existeix: si existís, no t\'ho oferirien a tu en un sopar. Ben vist.' } }
        },
      },
    ],
  },
  {
    id: 'subida-alquiler',
    edad: [51, 52],
    requiere: ['alquiler-vitalicio'],
    condicion: p => p.vivienda === 'alquiler',
    texto: {
      es: 'Carta del casero: te sube el alquiler un 25% "por precios de mercado". Llevas 20 años pagando puntualmente y el barrio se ha puesto de moda.',
      en: 'Letter from the landlord: rent goes up 25% "due to market prices". You\'ve paid on time for 20 years and the neighbourhood is now trendy.',
      ca: 'Carta del casero: et puja el lloguer un 25% "per preus de mercat". Portes 20 anys pagant puntualment i el barri s\'ha posat de moda.',
    },
    opciones: [
      {
        id: 'aceptar',
        texto: { es: 'Aceptar y quedarte', en: 'Accept and stay', ca: 'Acceptar i quedar-te' },
        aplicar: (p, ctx) => {
          p.alquilerAnual = Math.round(p.alquilerAnual * 1.25)
          ctx.autopsia({ tipo: 'neutra', titulo: { es: 'Alquiler de por vida', en: 'Renting for life', ca: 'Lloguer de per vida' }, senales: [], texto: { es: 'Este es el riesgo silencioso de alquilar para siempre: el precio no lo controlas tú. Quien compró hace 20 años paga hoy una cuota fija que la inflación encogió.', en: 'This is the silent risk of renting forever: you don\'t control the price. Whoever bought 20 years ago pays a fixed amount that inflation has shrunk.', ca: 'Aquest és el risc silenciós de llogar per sempre: el preu no el controles tu. Qui va comprar fa 20 anys paga avui una quota fixa que la inflació va encongir.' } })
          return { nota: { es: 'Tu barrio, tu casa (de otro). Pagas la comodidad de no mudarte.', en: 'Your neighbourhood, your home (someone else\'s). You pay for the comfort of not moving.', ca: 'El teu barri, casa teva (d\'un altre). Pagues la comoditat de no mudar-te.' } }
        },
      },
      {
        id: 'mudarse',
        texto: { es: 'Mudarte a un barrio más barato', en: 'Move to a cheaper area', ca: 'Mudar-te a un barri més barat' },
        aplicar: (p, ctx) => {
          p.alquilerAnual = Math.round(p.alquilerAnual * 0.9)
          ctx.dinero(-escalaMudanza(p))
          return { nota: { es: 'Alquiler contenido a cambio de mudanza y más distancia. Defenderse de los precios también es gestionar dinero.', en: 'Rent contained in exchange for moving and a longer commute. Defending against prices is money management too.', ca: 'Lloguer contingut a canvi de mudança i més distància. Defensar-se dels preus també és gestionar diners.' } }
        },
      },
    ],
  },
  {
    id: 'plan-pensiones',
    edad: [57, 58],
    cantidades: { aporte: 12000 },
    texto: {
      es: 'Tu banco insiste: "la pensión pública no te dará para el mismo nivel de vida". Te ofrece un plan de pensiones: metes {aporte} ahora, desgravas impuestos, y no podrás tocarlo hasta jubilarte.',
      en: 'Your bank insists: "the public pension won\'t match your lifestyle". They offer a pension plan: put in {aporte} now, get tax relief, and you can\'t touch it until retirement.',
      ca: 'El teu banc insisteix: "la pensió pública no et donarà per al mateix nivell de vida". T\'ofereix un pla de pensions: hi poses {aporte} ara, desgraves impostos, i no podràs tocar-lo fins a jubilar-te.',
    },
    senales: ['entidad-seria', 'iliquido'],
    opciones: [
      {
        id: 'abrir',
        texto: { es: 'Abrir el plan ({aporte})', en: 'Open the plan ({aporte})', ca: 'Obrir el pla ({aporte})' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('aporte')
          if (p.dinero < c) return { rechazo: true, nota: { es: 'No te lo puedes permitir ahora mismo.', en: 'You can\'t afford it right now.', ca: 'No t\'ho pots permetre ara mateix.' } }
          ctx.dinero(-c)
          ctx.flag('plan-pensiones')
          return { nota: { es: 'Hecho: tu yo de 70 años te lo agradecerá cada mes. Lo bloqueado, bloqueado está — esa es la parte dura.', en: 'Done: your 70-year-old self will thank you monthly. What\'s locked stays locked — that\'s the hard part.', ca: 'Fet: el teu jo de 70 anys t\'ho agrairà cada mes. El que està bloquejat, bloquejat està — aquesta és la part dura.' } }
        },
      },
      {
        id: 'no',
        texto: { es: 'Confiar en la pensión pública', en: 'Trust the public pension', ca: 'Confiar en la pensió pública' },
        aplicar: () => ({ nota: { es: 'Decisión tomada. La pensión pública existe, pero suele ser bastante menor que el último sueldo — lo notarás.', en: 'Decision made. The public pension exists, but it\'s usually well below your last salary — you\'ll feel it.', ca: 'Decisió presa. La pensió pública existeix, però sol ser força menor que l\'últim sou — ho notaràs.' } }),
      },
    ],
  },
  {
    id: 'prejubilacion',
    edad: [61, 62],
    prob: 0.75,
    condicion: p => p.ingresos > 0 && !p.estudios && p.paroMeses === 0,
    cantidades: { indemnizacion: 65000 },
    texto: {
      es: 'Tu empresa ofrece prejubilaciones: {indemnizacion} de indemnización si te vas ya. Si te quedas, sueldo normal hasta los 67. Tu cuerpo pide descanso; tu cuenta pide cabeza.',
      en: 'Your company offers early retirement: {indemnizacion} severance if you leave now. If you stay, normal salary until 67. Your body wants rest; your account wants sense.',
      ca: 'La teva empresa ofereix prejubilacions: {indemnizacion} d\'indemnització si marxes ja. Si et quedes, sou normal fins als 67. El teu cos demana descans; el teu compte demana seny.',
    },
    opciones: [
      {
        id: 'irse',
        texto: { es: 'Aceptar e irte ({indemnizacion})', en: 'Accept and leave ({indemnizacion})', ca: 'Acceptar i marxar ({indemnizacion})' },
        aplicar: (p, ctx) => {
          ctx.dinero(ctx.cant('indemnizacion'))
          // Desde ya cobras tu pensión (no un sueldo reducido "de mentira"): a
          // los 67 no se vuelve a recalcular ni se anuncia una segunda jubilación.
          p.ingresos = pensionDesde(p, p.ingresos)
          ctx.flag('prejubilado')
          ctx.bienestar(10)
          return { nota: { es: `Libertad anticipada. Tu pensión desde ya: ${ctx.f(Math.round(p.ingresos / 12))}/mes. La indemnización parece mucha — repártela mentalmente entre los años que faltan hasta los 67 y parece menos.`, en: `Early freedom. Your pension from now on: ${ctx.f(Math.round(p.ingresos / 12))}/mo. The severance seems big — spread it mentally over the years until 67 and it seems smaller.`, ca: `Llibertat anticipada. La teva pensió des d'ara: ${ctx.f(Math.round(p.ingresos / 12))}/mes. La indemnització sembla molta — reparteix-la mentalment entre els anys que falten fins als 67 i sembla menys.` } }
        },
      },
      {
        id: 'quedarse',
        texto: { es: 'Seguir hasta los 67', en: 'Stay until 67', ca: 'Seguir fins als 67' },
        aplicar: () => ({ nota: { es: 'Más años de sueldo completo y más pensión después. Menos tardes libres ahora. Todo tiene precio.', en: 'More years of full salary and a bigger pension later. Fewer free afternoons now. Everything has a price.', ca: 'Més anys de sou complet i més pensió després. Menys tardes lliures ara. Tot té preu.' } }),
      },
    ],
  },

  // ══ JUBILACIÓN (67+) ═════════════════════════════════════════════════════
  {
    id: 'vender-casa-jubilado',
    edad: [68, 72],
    requiere: ['casa-pagada'],
    texto: {
      es: 'La casa se te ha quedado grande y el barrio vale oro. Puedes venderla, comprar algo pequeño y embolsarte la diferencia — o quedarte donde está tu vida entera.',
      en: 'The house is now too big and the neighbourhood is gold. You could sell, buy something small and pocket the difference — or stay where your whole life is.',
      ca: 'La casa se t\'ha quedat gran i el barri val or. Pots vendre-la, comprar una cosa petita i embutxacar-te la diferència — o quedar-te on hi ha tota la teva vida.',
    },
    opciones: [
      {
        id: 'vender',
        texto: { es: 'Vender y mudarte a algo pequeño', en: 'Sell and downsize', ca: 'Vendre i mudar-te a una cosa petita' },
        aplicar: (p, ctx) => {
          const casa = p.activos.find(a => a.tipo === 'casa' && a.estado === 'vivo')
          if (!casa) return { rechazo: true, nota: { es: 'No tienes casa en propiedad.', en: 'You don\'t own a house.', ca: 'No tens casa en propietat.' } }
          const liberado = Math.round(casa.valor * 0.45)
          casa.valor = Math.round(casa.valor * 0.55)
          ctx.dinero(liberado)
          return { nota: { es: `Vendida. Liberas ${ctx.f(liberado)} para vivir la jubilación: el ladrillo por fin se convierte en vida.`, en: `Sold. You free up ${ctx.f(liberado)} to live your retirement: bricks finally turn into life.`, ca: `Venuda. Alliberes ${ctx.f(liberado)} per viure la jubilació: el maó per fi es converteix en vida.` } }
        },
      },
      {
        id: 'quedarse',
        texto: { es: 'Quedarte en tu casa', en: 'Stay in your home', ca: 'Quedar-te a casa teva' },
        aplicar: () => ({ nota: { es: 'Tu casa, tus recuerdos. El patrimonio seguirá en ladrillos — a veces la mejor inversión es no moverse.', en: 'Your home, your memories. The wealth stays in bricks — sometimes the best investment is not moving.', ca: 'Casa teva, els teus records. El patrimoni seguirà en maons — de vegades la millor inversió és no moure\'s.' } }),
      },
    ],
  },
  {
    id: 'viaje-jubilacion',
    edad: [73, 75],
    cantidades: { viaje: 12000 },
    texto: {
      es: 'Toda la vida diciendo "algún día". El crucero por los fiordos y el mes en Japón cuestan {viaje}. Tu salud aún acompaña. ¿Es ahora o es nunca?',
      en: 'A whole life saying "someday". The fjords cruise and a month in Japan cost {viaje}. Your health still holds. Is it now or never?',
      ca: 'Tota la vida dient "algun dia". El creuer pels fiords i el mes al Japó costen {viaje}. La teva salut encara acompanya. És ara o és mai?',
    },
    opciones: [
      {
        id: 'ir',
        texto: { es: 'Es ahora ({viaje})', en: 'It\'s now ({viaje})', ca: 'És ara ({viaje})' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('viaje')
          if (p.dinero < c) return { rechazo: true, nota: { es: 'No te llega. El "algún día" se queda en eso — la jubilación se disfruta con lo sembrado antes.', en: 'You can\'t afford it. "Someday" stays a someday — retirement is enjoyed with what was sown earlier.', ca: 'No t\'arriba. L\'"algun dia" es queda en això — la jubilació es gaudeix amb el que s\'ha sembrat abans.' } }
          ctx.dinero(-c)
          ctx.bienestar(12)
          ctx.experiencia({ es: 'El gran viaje de tu vida', en: 'The great trip of your life', ca: 'El gran viatge de la teva vida' })
          return { nota: { es: 'Fiordos al amanecer y cerezos en flor. Para ESTO ahorraste 50 años: el dinero que no se convierte en vida solo es un número que hereda otro.', en: 'Fjords at dawn and cherry blossoms. THIS is what you saved 50 years for: money that never becomes life is just a number someone else inherits.', ca: 'Fiords a l\'alba i cirerers en flor. Per AIXÒ vas estalviar 50 anys: els diners que no es converteixen en vida només són un número que hereta un altre.' } }
        },
      },
      {
        id: 'no',
        texto: { es: 'Mejor lo guardo', en: 'Better keep it', ca: 'Millor ho guardo' },
        aplicar: (p, ctx) => {
          ctx.bienestar(-4)
          return { nota: { es: 'El dinero se queda. La foto de los fiordos, en el salvapantallas. Guardar también tiene un coste — solo que no sale en el banco.', en: 'The money stays. The fjords photo stays on the screensaver. Keeping money has a cost too — it just doesn\'t show at the bank.', ca: 'Els diners es queden. La foto dels fiords, al salvapantalles. Guardar també té un cost — només que no surt al banc.' } }
        },
      },
    ],
  },
  {
    id: 'timo-telefono',
    edad: [73, 78],
    texto: {
      es: 'Suena el teléfono: "Le llamamos del departamento de seguridad de su banco. Han detectado un cargo sospechoso. Para proteger su dinero, necesitamos que nos confirme sus claves y haga una transferencia a una cuenta segura. Es urgente."',
      en: 'The phone rings: "This is your bank\'s security department. We\'ve detected a suspicious charge. To protect your money, we need you to confirm your codes and transfer to a safe account. It\'s urgent."',
      ca: 'Sona el telèfon: "Li truquem del departament de seguretat del seu banc. Hem detectat un càrrec sospitós. Per protegir els seus diners, necessitem que ens confirmi les claus i faci una transferència a un compte segur. És urgent."',
    },
    senales: ['urgencia-tel', 'presion'],
    opciones: [
      {
        id: 'obedecer',
        texto: { es: 'Seguir las instrucciones', en: 'Follow the instructions', ca: 'Seguir les instruccions' },
        aplicar: (p, ctx) => {
          const robado = Math.max(0, Math.round(p.dinero * 0.35))
          ctx.dinero(-robado)
          ctx.autopsia({ tipo: 'mala', titulo: { es: 'La llamada del "banco"', en: 'The call from the "bank"', ca: 'La trucada del "banc"' }, senales: ['urgencia-tel', 'presion'], texto: { es: 'Era phishing. Tu banco NUNCA te llama para pedirte claves ni transferencias. La urgencia es la herramienta: quieren que actúes antes de pensar. Ante la duda: cuelga y llama TÚ al número oficial.', en: 'It was phishing. Your bank NEVER calls asking for codes or transfers. Urgency is the tool: they want you to act before you think. When in doubt: hang up and call the official number YOURSELF.', ca: 'Era phishing. El teu banc MAI et truca per demanar-te claus ni transferències. La urgència és l\'eina: volen que actuïs abans de pensar. Davant el dubte: penja i truca TU al número oficial.' } })
          return { nota: { es: `Al día siguiente, tu cuenta tiene ${ctx.f(robado)} menos. El "departamento de seguridad" no existía.`, en: `Next day, your account is ${ctx.f(robado)} lighter. The "security department" didn't exist.`, ca: `L'endemà, el teu compte té ${ctx.f(robado)} menys. El "departament de seguretat" no existia.` } }
        },
      },
      {
        id: 'colgar',
        texto: { es: 'Colgar y llamar tú al banco', en: 'Hang up and call the bank yourself', ca: 'Penjar i trucar tu al banc' },
        aplicar: (p, ctx) => {
          ctx.autopsia({ tipo: 'buena', titulo: { es: 'La llamada del "banco"', en: 'The call from the "bank"', ca: 'La trucada del "banc"' }, senales: ['urgencia-tel', 'presion'], texto: { es: 'Reflejo perfecto: quien te llama con urgencia pidiendo claves nunca es tu banco. Cortar y llamar tú al número oficial desactiva el 100% de estos timos.', en: 'Perfect reflex: whoever calls you urgently asking for codes is never your bank. Hanging up and calling the official number yourself defuses 100% of these scams.', ca: 'Reflex perfecte: qui et truca amb urgència demanant claus mai és el teu banc. Tallar i trucar tu al número oficial desactiva el 100% d\'aquestes estafes.' } })
          return { nota: { es: 'Tu banco te lo confirma: ningún cargo sospechoso, ninguna llamada suya. Acabas de esquivar el timo más común de tu generación.', en: 'Your bank confirms: no suspicious charge, no call from them. You just dodged your generation\'s most common scam.', ca: 'El teu banc t\'ho confirma: cap càrrec sospitós, cap trucada seva. Acabes d\'esquivar l\'estafa més comuna de la teva generació.' } }
        },
      },
    ],
  },
  {
    id: 'nieto-universidad',
    edad: [76, 80],
    prob: 0.6,
    cantidades: { ayuda: 10000 },
    texto: {
      es: 'Tu nieta ha entrado en la universidad que quería, en otra ciudad. A su familia no le llega para la residencia. Tú podrías ayudar con {ayuda}.',
      en: 'Your granddaughter got into the university she wanted, in another city. Her family can\'t cover the residence hall. You could help with {ayuda}.',
      ca: 'La teva neta ha entrat a la universitat que volia, en una altra ciutat. A la seva família no li arriba per a la residència. Tu podries ajudar amb {ayuda}.',
    },
    opciones: [
      {
        id: 'ayudar',
        texto: { es: 'Ayudarla ({ayuda})', en: 'Help her ({ayuda})', ca: 'Ajudar-la ({ayuda})' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('ayuda')
          if (p.dinero < c) return { rechazo: true, nota: { es: 'Quisieras, pero no llegas. Le ayudas con lo que puedes.', en: 'You wish you could, but can\'t. You help with what you can.', ca: 'Voldries, però no hi arribes. L\'ajudes amb el que pots.' } }
          ctx.dinero(-c)
          ctx.flag('legado')
          ctx.bienestar(8)
          return { nota: { es: 'Para esto también sirve el dinero bien gestionado: para poder decir "sí" cuando importa.', en: 'This is also what well-managed money is for: being able to say "yes" when it matters.', ca: 'Per a això també serveixen els diners ben gestionats: per poder dir "sí" quan importa.' } }
        },
      },
      {
        id: 'no',
        texto: { es: 'No puedes comprometerte', en: 'You can\'t commit to it', ca: 'No pots comprometre\'t' },
        aplicar: () => ({ nota: { es: 'Cada uno conoce sus números. Decir "no" a tiempo también es responsabilidad financiera.', en: 'Everyone knows their own numbers. Saying "no" in time is also financial responsibility.', ca: 'Cadascú coneix els seus números. Dir "no" a temps també és responsabilitat financera.' } }),
      },
    ],
  },

  {
    id: 'poker-oficina',
    edad: [24, 32],
    prob: 0.6,
    requiere: ['racha-apuestas'],
    condicion: p => p.ingresos > 0 && !p.estudios,
    cantidades: { entrada: 500 },
    texto: {
      es: 'Póker con gente de la oficina, entrada de {entrada}. En el fondo piensas en aquella apuesta del recreo que ganaste — "esto se me da bien". Nadie más en la mesa piensa eso de sí mismo.',
      en: 'Poker with people from the office, buy-in of {entrada}. Deep down you\'re thinking of that playground bet you won — "I\'m good at this". Nobody else at the table thinks that about themselves.',
      ca: 'Pòquer amb gent de l\'oficina, entrada de {entrada}. En el fons penses en aquella aposta del pati que vas guanyar — "això se m\'hi dona bé". Ningú més a la taula pensa això de si mateix.',
    },
    opciones: [
      {
        id: 'jugar',
        texto: { es: 'Jugar — se te da bien esto', en: 'Play — you\'re good at this', ca: 'Jugar — se\'t dona bé això' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('entrada')
          if (p.dinero < c) return { rechazo: true, nota: { es: 'No te llega la entrada. Esta vez la cartera decide por ti — y probablemente te hace un favor.', en: 'You can\'t cover the buy-in. This time your wallet decides for you — and probably does you a favour.', ca: 'No t\'arriba l\'entrada. Aquesta vegada la cartera decideix per tu — i probablement et fa un favor.' } }
          ctx.dinero(-c)
          // La racha de la infancia no cambia las probabilidades reales: aquí son peores de lo que la confianza sugiere
          if (ctx.rng() < 0.25) {
            ctx.dinero(c * 2.5)
            ctx.bienestar(4)
            ctx.autopsia({ tipo: 'neutra', titulo: { es: 'La racha del recreo', en: 'The playground streak', ca: 'La ratxa del pati' }, senales: [], texto: { es: 'Ganaste otra vez — y eso, paradójicamente, es el peor resultado posible: refuerza una confianza que las probabilidades reales no respaldan. Solo 1 de cada 4 partidas como esta se ganan.', en: 'You won again — and that, paradoxically, is the worst possible outcome: it reinforces a confidence the real odds don\'t back up. Only 1 in 4 games like this are won.', ca: 'Vas guanyar una altra vegada — i això, paradoxalment, és el pitjor resultat possible: reforça una confiança que les probabilitats reals no avalen. Només 1 de cada 4 partides com aquesta es guanyen.' } })
            return { nota: { es: 'Ganas de nuevo. Ojo: ganar aquí es la trampa perfecta para volver a sentarte a esta mesa con más dinero la próxima vez.', en: 'You win again. Watch out: winning here is the perfect trap to sit at this table with more money next time.', ca: 'Guanyes de nou. Compte: guanyar aquí és la trampa perfecta per tornar-te a asseure a aquesta taula amb més diners la propera vegada.' } }
          }
          ctx.bienestar(-4)
          ctx.autopsia({ tipo: 'mala', titulo: { es: 'La racha del recreo', en: 'The playground streak', ca: 'La ratxa del pati' }, senales: [], texto: { es: 'La suerte de los 12 años no era una habilidad — era suerte, y ya se había gastado. Confiar en una racha pasada para justificar un riesgo nuevo es uno de los sesgos más caros que existen.', en: 'The luck you had at 12 wasn\'t a skill — it was luck, and it had already been spent. Trusting a past streak to justify a new risk is one of the costliest biases there is.', ca: 'La sort dels 12 anys no era una habilitat — era sort, i ja s\'havia gastat. Confiar en una ratxa passada per justificar un risc nou és un dels biaixos més cars que existeixen.' } })
          return { nota: { es: 'Pierdes. La racha de la infancia no predecía nada — y esta vez la cuenta la pagas tú.', en: 'You lose. The childhood streak predicted nothing — and this time you\'re the one paying for it.', ca: 'Perds. La ratxa de la infància no predeia res — i aquesta vegada la paga la pagues tu.' } }
        },
      },
      {
        id: 'no',
        texto: { es: 'Pasar de la partida', en: 'Skip the game', ca: 'Passar de la partida' },
        aplicar: (p, ctx) => {
          ctx.flag('esquivo-racha')
          return { nota: { es: 'Decides que una victoria a los 12 años no dice nada sobre un póker a los 28. Reconocer que una racha pasada no es una garantía también es una habilidad — y de las que no se ven en la mesa.', en: 'You decide that a win at 12 says nothing about poker at 28. Recognising that a past streak isn\'t a guarantee is also a skill — one that doesn\'t show at the table.', ca: 'Decideixes que una victòria als 12 anys no diu res sobre un pòquer als 28. Reconèixer que una ratxa passada no és una garantia també és una habilitat — i de les que no es veuen a la taula.' } }
        },
      },
    ],
  },

  {
    id: 'independizarse',
    edad: [24, 26],
    condicion: p => p.vivienda === 'familia' && !p.estudios,
    cantidades: { alquiler: 8400 },
    texto: {
      es: 'Tus amigos van cayendo uno a uno: piso compartido, estudio diminuto, las llaves de su propia vida. En casa se está bien (y barato)… pero la pregunta ya está encima de la mesa: ¿te independizas?',
      en: 'Your friends are dropping one by one: shared flat, tiny studio, the keys to their own life. Home is comfortable (and cheap)… but the question is on the table: do you move out?',
      ca: 'Els teus amics van caient un a un: pis compartit, estudi diminut, les claus de la seva pròpia vida. A casa s\'hi està bé (i barat)… però la pregunta ja és sobre la taula: t\'independitzes?',
    },
    opciones: [
      {
        id: 'irse',
        texto: { es: 'Independizarte ya', en: 'Move out now', ca: 'Independitzar-te ja' },
        aplicar: (p, ctx) => {
          p.vivienda = 'alquiler'
          p.alquilerAnual = Math.round(ctx.cant('alquiler') * (p.flags.includes('capital') ? 1.4 : 1))
          ctx.recalcularGastos()
          ctx.bienestar(4)
          return { nota: { es: `Llaves propias. Alquiler: ${ctx.f(Math.round(p.alquilerAnual / 12))}/mes, más facturas, comida y transporte — ahorrarás mucho menos, pero la vida es tuya. Las dos cosas son verdad a la vez.`, en: `Your own keys. Rent: ${ctx.f(Math.round(p.alquilerAnual / 12))}/mo, plus bills, food and transport — you'll save much less, but the life is yours. Both things are true at once.`, ca: `Claus pròpies. Lloguer: ${ctx.f(Math.round(p.alquilerAnual / 12))}/mes, més factures, menjar i transport — estalviaràs molt menys, però la vida és teva. Les dues coses són veritat alhora.` } }
        },
      },
      {
        id: 'quedarse',
        texto: { es: 'Quedarte en casa y seguir ahorrando', en: 'Stay home and keep saving', ca: 'Quedar-te a casa i seguir estalviant' },
        aplicar: (p, ctx) => {
          ctx.bienestar(-2)
          return { nota: { es: 'Te quedas. Cada mes que pasa en casa es dinero que otros gastan en alquiler — la jugada financiera es buena. La cara B: la independencia también se entrena, y eso no sale en el extracto.', en: 'You stay. Every month at home is money others spend on rent — financially it\'s a smart play. The flip side: independence is also a skill you train, and that doesn\'t show on a statement.', ca: 'Et quedes. Cada mes que passa a casa són diners que altres gasten en lloguer — la jugada financera és bona. La cara B: la independència també s\'entrena, i això no surt a l\'extracte.' } }
        },
      },
    ],
  },

  // ══ CICLO VITAL: familia, vivienda y herencia ══════════════════════════════
  {
    id: 'padres-te-echan',
    edad: [18, 22],
    prob: 0.18,
    condicion: p => p.vivienda === 'familia',
    cantidades: { alquiler: 8400 },
    texto: {
      es: 'Las cosas en casa se han puesto tensas — o simplemente hace falta tu habitación. Tus padres te dicen que ya toca volar solo. No lo habías planeado tú: te toca ahora.',
      en: 'Things at home have gotten tense — or your room is simply needed. Your parents tell you it\'s time to fly solo. You didn\'t plan this one: it\'s happening now.',
      ca: 'Les coses a casa s\'han posat tenses — o simplement fa falta la teva habitació. Els teus pares et diuen que ja toca volar sol. No ho havies planejat tu: et toca ara.',
    },
    opciones: [
      {
        id: 'ok',
        texto: { es: 'Buscar piso ya', en: 'Find a flat now', ca: 'Buscar pis ja' },
        aplicar: (p, ctx) => {
          p.vivienda = 'alquiler'
          p.alquilerAnual = Math.round(ctx.cant('alquiler') * (p.flags.includes('capital') ? 1.4 : 1))
          ctx.recalcularGastos()
          ctx.bienestar(p.ingresos > 0 ? -5 : -10)
          const alquilerMes = ctx.f(Math.round(p.alquilerAnual / 12))
          return { nota: p.ingresos > 0
            ? { es: `Duele que no fuera tu decisión, pero tienes sueldo: te las apañas. Bienvenido a pagar alquiler (${alquilerMes}/mes) antes de lo que esperabas.`, en: `It stings that it wasn't your call, but you have a salary: you manage. Welcome to paying rent (${alquilerMes}/mo) earlier than expected.`, ca: `Fa mal que no fos decisió teva, però tens sou: te'n surts. Benvingut a pagar lloguer (${alquilerMes}/mes) abans del que esperaves.` }
            : { es: `Sin sueldo fijo, el alquiler (${alquilerMes}/mes) va a rozar el límite cada mes. Nadie te preguntó si estabas listo — la vida tampoco suele preguntar.`, en: `With no steady salary, the rent (${alquilerMes}/mo) will scrape the limit every month. Nobody asked if you were ready — life rarely does.`, ca: `Sense sou fix, el lloguer (${alquilerMes}/mes) fregarà el límit cada mes. Ningú et va preguntar si estaves llest — la vida tampoc sol preguntar.` }
          }
        },
      },
      {
        id: 'padres',
        texto: { es: 'Pedir ayuda a tus padres para el primer tramo', en: 'Ask your parents to help with the first stretch', ca: 'Demanar ajuda als teus pares pel primer tram' },
        aplicar: (p, ctx) => {
          const pAyuda = { humilde: 0.35, media: 0.65, acomodada: 0.9 }[p.familia]
          p.vivienda = 'alquiler'
          p.alquilerAnual = Math.round(ctx.cant('alquiler') * (p.flags.includes('capital') ? 1.4 : 1))
          ctx.recalcularGastos()
          if (ctx.rng() < pAyuda) {
            const ayuda = Math.round(p.alquilerAnual * 0.5)
            ctx.dinero(ayuda)
            ctx.bienestar(-3)
            return { nota: { es: `Aceptan ayudarte: ${ctx.f(ayuda)} para arrancar. No es gratis del todo — cuesta el orgullo — pero amortigua el golpe de independizarte sin haberlo elegido.`, en: `They agree to help: ${ctx.f(ayuda)} to get started. It's not entirely free — it costs some pride — but it cushions the blow of moving out without choosing to.`, ca: `Accepten ajudar-te: ${ctx.f(ayuda)} per començar. No és del tot gratis — costa l'orgull — però amorteix el cop d'independitzar-te sense haver-ho triat.` } }
          }
          ctx.bienestar(-9)
          return { nota: { es: 'No pueden ayudarte más de lo que ya hacen. Te independizas igual, pero sin colchón.', en: 'They can\'t help beyond what they already do. You move out anyway, but with no cushion.', ca: 'No et poden ajudar més del que ja fan. T\'independitzes igualment, però sense coixí.' } }
        },
      },
      {
        id: 'dejar-estudios',
        texto: { es: 'Dejar los estudios y ponerte a trabajar ya', en: 'Drop your studies and get a job now', ca: 'Deixar els estudis i posar-te a treballar ja' },
        aplicar: (p, ctx) => {
          if (!p.estudios) {
            return { rechazo: true, nota: { es: 'Ya no estás estudiando: esta puerta no aplica.', en: 'You\'re not studying anymore: this option doesn\'t apply.', ca: 'Ja no estàs estudiant: aquesta porta no aplica.' } }
          }
          p.estudios = null
          p.ingresos = Math.round(escala(p, 12000))
          p.vivienda = 'alquiler'
          p.alquilerAnual = Math.round(ctx.cant('alquiler') * (p.flags.includes('capital') ? 1.4 : 1))
          ctx.recalcularGastos()
          ctx.bienestar(-8)
          return { nota: { es: `Vivir solo y estudiar sin ingresos no se sostiene: dejas la carrera y entras a trabajar (${ctx.f(Math.round(p.ingresos / 12))}/mes). Duele soltar los estudios — pero el alquiler no espera a que te gradúes.`, en: `Living alone and studying with no income doesn't add up: you drop the degree and start working (${ctx.f(Math.round(p.ingresos / 12))}/mo). Letting go of your studies hurts — but rent won't wait for you to graduate.`, ca: `Viure sol i estudiar sense ingressos no es sosté: deixes la carrera i entres a treballar (${ctx.f(Math.round(p.ingresos / 12))}/mes). Fa mal deixar els estudis — però el lloguer no espera que et graduïs.` } }
        },
      },
    ],
  },
  {
    id: 'tener-hijos',
    edad: [26, 37],
    prob: 0.65,
    cantidades: { inicial: 2500, obras: 12000 },
    texto: {
      es: 'La pregunta de fondo: ¿queréis tener un hijo? Cambia la vida entera — y también las cuentas: cuna, ropa, pediatra al principio, y después, años de gasto fijo que no negocia con la inflación.',
      en: 'The big question: do you want to have a child? It changes your whole life — and your accounts too: crib, clothes, paediatrician at first, then years of a fixed cost that doesn\'t negotiate with inflation.',
      ca: 'La pregunta de fons: voleu tenir un fill? Canvia la vida sencera — i també els comptes: bressol, roba, pediatra al principi, i després, anys de despesa fixa que no negocia amb la inflació.',
    },
    opciones: [
      {
        id: 'si',
        texto: { es: 'Sí, adelante', en: 'Yes, let\'s do it', ca: 'Sí, endavant' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('inicial')
          ctx.dinero(-c)
          p.hijos = [...(p.hijos ?? []), { edadNacimiento: p.edad }]
          ctx.flag('padre')
          ctx.bienestar(10)
          const extra = { es: '', en: '', ca: '' }
          if (p.vivienda === 'alquiler') {
            p.alquilerAnual = Math.round(p.alquilerAnual * 1.3)
            const alquilerMes = ctx.f(Math.round(p.alquilerAnual / 12))
            extra.es = ` Necesitáis una habitación más: os cambiáis a un piso más grande — el alquiler sube a ${alquilerMes}/mes.`
            extra.en = ` You need one more room: you move to a bigger flat — rent goes up to ${alquilerMes}/mo.`
            extra.ca = ` Necessiteu una habitació més: us canvieu a un pis més gran — el lloguer puja a ${alquilerMes}/mes.`
          } else if (p.vivienda === 'propia' && !p.flags.includes('casa-ampliada')) {
            const importe = ctx.cant('obras')
            ctx.prestamo({ importe, años: 10, interes: 0.2 })
            ctx.flag('casa-ampliada')
            extra.es = ` Vuestro piso se queda pequeño: pedís un préstamo de ${ctx.f(importe)} para ampliarlo.`
            extra.en = ` Your flat is too small now: you take out a ${ctx.f(importe)} loan to extend it.`
            extra.ca = ` El vostre pis es queda petit: demaneu un préstec de ${ctx.f(importe)} per ampliar-lo.`
          }
          ctx.recalcularGastos()
          return { nota: { es: `Bienvenido a la familia. Gastos del primer año: ${ctx.f(c)}.${extra.es} A partir de ahora, una parte fija del sueldo es suya — hasta que cumpla 18.`, en: `Welcome to the family. First-year costs: ${ctx.f(c)}.${extra.en} From now on, a fixed slice of your salary is theirs — until they turn 18.`, ca: `Benvingut a la família. Despeses del primer any: ${ctx.f(c)}.${extra.ca} A partir d'ara, una part fixa del sou és seva — fins que en faci 18.` } }
        },
      },
      {
        id: 'no',
        texto: { es: 'Ahora no', en: 'Not right now', ca: 'Ara no' },
        aplicar: (p, ctx) => {
          ctx.bienestar(1)
          return { nota: { es: 'Seguís centrados en lo vuestro. También es una decisión legítima — y una que no todo el mundo se plantea con calculadora en mano.', en: 'You stay focused on your own thing. It\'s a legitimate choice too — one not everybody weighs with a calculator in hand.', ca: 'Seguiu centrats en el vostre. També és una decisió legítima — i una que no tothom es planteja amb calculadora a la mà.' } }
        },
      },
    ],
  },
  {
    id: 'separacion',
    edad: [40, 55],
    prob: 0.25,
    requiere: ['convive'],
    cantidades: { alquilerSolo: 8400 },
    texto: {
      es: 'Después de tantos años, la relación se ha apagado. Os separáis. Toca deshacer una vida compartida — empezando por la casa.',
      en: 'After all these years, the relationship has faded. You\'re splitting up. Time to undo a shared life — starting with the house.',
      ca: 'Després de tants anys, la relació s\'ha apagat. Us separeu. Toca desfer una vida compartida — començant per la casa.',
    },
    opciones: [
      {
        id: 'ok',
        texto: { es: 'Seguir adelante, cada uno por su lado', en: 'Move on, each your own way', ca: 'Seguir endavant, cadascú pel seu costat' },
        aplicar: (p, ctx) => {
          ctx.bienestar(-10)
          ctx.flag('separado')
          const casa2 = p.activos.find(a => a.tipo === 'casa2' && a.estado === 'vivo' && a.uso !== 'ocupada')
          if (casa2) {
            casa2.uso = 'vive'
            if (p.vivienda === 'alquiler') p.alquilerAnual = 0
            ctx.recalcularGastos()
            return { nota: { es: 'Duele, pero al menos no empiezas de cero: te mudas a tu segunda vivienda. Tener un colchón inmobiliario también sirve para esto.', en: 'It hurts, but at least you\'re not starting from zero: you move into your second home. Having a property cushion is good for this too.', ca: 'Fa mal, però almenys no comences de zero: et mudes a la teva segona vivenda. Tenir un coixí immobiliari també serveix per a això.' } }
          }
          if (p.vivienda === 'propia') {
            const casa = p.activos.find(a => a.tipo === 'casa' && a.estado === 'vivo')
            if (casa) {
              const deuda = p.hipoteca?.pendiente ?? 0
              const neto = Math.max(0, casa.valor - deuda)
              p.dinero += Math.round(neto * 0.5)
              casa.estado = 'vendido'
              p.hipoteca = null
            }
            p.vivienda = 'alquiler'
            p.alquilerAnual = Math.round(ctx.cant('alquilerSolo'))
            ctx.recalcularGastos()
            return { nota: { es: `Vendéis el piso y repartís: con tu mitad, vuelves de alquiler (${ctx.f(Math.round(p.alquilerAnual / 12))}/mes) — solo, con todos los gastos para ti.`, en: `You sell the flat and split it: with your half, you go back to renting (${ctx.f(Math.round(p.alquilerAnual / 12))}/mo) — alone, with every cost on you.`, ca: `Veneu el pis i repartiu: amb la teva meitat, tornes de lloguer (${ctx.f(Math.round(p.alquilerAnual / 12))}/mes) — sol, amb totes les despeses per a tu.` } }
          }
          p.alquilerAnual = Math.round(ctx.cant('alquilerSolo') * (p.flags.includes('capital') ? 1.4 : 1))
          ctx.recalcularGastos()
          return { nota: { es: `Buscas piso para ti solo (${ctx.f(Math.round(p.alquilerAnual / 12))}/mes): sin dos sueldos, el alquiler completo pesa más.`, en: `You find a place on your own (${ctx.f(Math.round(p.alquilerAnual / 12))}/mo): without two salaries, the full rent weighs more.`, ca: `Busques pis per a tu sol (${ctx.f(Math.round(p.alquilerAnual / 12))}/mes): sense dos sous, el lloguer complet pesa més.` } }
        },
      },
    ],
  },
  {
    id: 'herencia-padres',
    edad: [45, 60],
    prob: 0.8,
    cantidades: { humilde: 1500, media: 15000, acomodada: 40000 },
    texto: {
      es: 'Tus padres han fallecido. Entre el duelo toca ocuparte de la herencia — lo que dejan (o no dejan) también cuenta cómo vivieron ellos el dinero.',
      en: 'Your parents have passed away. Between the grief, you have to deal with the inheritance — what they leave (or don\'t) also tells the story of how they lived with money.',
      ca: 'Els teus pares han mort. Entre el dol toca ocupar-te de l\'herència — el que deixen (o no deixen) també explica com van viure ells els diners.',
    },
    opciones: [
      {
        id: 'aceptar',
        texto: { es: 'Ocuparte de todo', en: 'Take care of it all', ca: 'Ocupar-te de tot' },
        aplicar: (p, ctx) => {
          ctx.bienestar(-8)
          const monto = ctx.cant(p.familia)
          const extra = { es: '', en: '', ca: '' }
          if (p.familia === 'humilde') {
            if (ctx.rng() < 0.5) {
              ctx.dinero(monto)
              extra.es = `Dejan ${ctx.f(monto)} — los ahorros de toda una vida de estirar cada mes.`
              extra.en = `They leave ${ctx.f(monto)} — a lifetime of stretching every month.`
              extra.ca = `Deixen ${ctx.f(monto)} — els estalvis de tota una vida estirant cada mes.`
            } else {
              extra.es = 'No dejan prácticamente nada — vivieron al día, como pudieron. La herencia más grande que te dejan no está en el banco.'
              extra.en = 'They leave almost nothing — they lived day to day, as best they could. The biggest thing they leave you isn\'t in the bank.'
              extra.ca = 'No deixen pràcticament res — van viure al dia, com van poder. L\'herència més gran que et deixen no és al banc.'
            }
          } else if (p.familia === 'media') {
            ctx.dinero(monto)
            extra.es = `Dejan ${ctx.f(monto)} de ahorros de toda la vida.`
            extra.en = `They leave ${ctx.f(monto)} in lifetime savings.`
            extra.ca = `Deixen ${ctx.f(monto)} d'estalvis de tota la vida.`
            if (ctx.rng() < 0.3 && !p.activos.some(a => a.tipo === 'casa2' && a.estado === 'vivo')) {
              ctx.activo({ id: 'casa2', tipo: 'casa2', invertido: Math.round(monto * 3), uso: 'vacia', senales: ['iliquido'], nombre: { es: 'La casa de tus padres', en: 'Your parents\' house', ca: 'La casa dels teus pares' } })
              extra.es += ' Y además, la casa del pueblo: ahora es tuya. Decide qué hacer con ella.'
              extra.en += ' And on top of that, the family house: it\'s yours now. Decide what to do with it.'
              extra.ca += ' I a més, la casa del poble: ara és teva. Decideix què fer-ne.'
            }
          } else {
            ctx.dinero(monto)
            extra.es = `Dejan ${ctx.f(monto)}.`
            extra.en = `They leave ${ctx.f(monto)}.`
            extra.ca = `Deixen ${ctx.f(monto)}.`
            if (ctx.rng() < 0.55 && !p.activos.some(a => a.tipo === 'casa2' && a.estado === 'vivo')) {
              ctx.activo({ id: 'casa2', tipo: 'casa2', invertido: Math.round(monto * 4), uso: 'vacia', senales: ['iliquido'], nombre: { es: 'La casa familiar', en: 'The family house', ca: 'La casa familiar' } })
              extra.es += ' Y la casa familiar: ahora es tuya. Decide qué hacer con ella.'
              extra.en += ' And the family house: it\'s yours now. Decide what to do with it.'
              extra.ca += ' I la casa familiar: ara és teva. Decideix què fer-ne.'
            }
          }
          return { nota: { es: `Despides a tus padres con cariño. ${extra.es}`, en: `You say goodbye to your parents with love. ${extra.en}`, ca: `Acomiades els teus pares amb estimació. ${extra.ca}` } }
        },
      },
    ],
  },
]

// La mudanza cuesta ~2000€ de hoy, escalados a la edad del evento
function escalaMudanza(p) {
  const v = 2000 * p.indice
  return Math.round(v / 100) * 100
}
