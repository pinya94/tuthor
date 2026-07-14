// ── Mazo de eventos de "Spicy" ───────────────────────────────────────────────
// Cada evento: ventana de edad, texto {es,en,ca}, señales de riesgo visibles
// y opciones cuya función aplicar(p, ctx) muta la partida. Los números de
// riesgo van SIEMPRE ocultos dentro de los activos (oculto: {...}); el jugador
// solo ve las señales. Ver src/lib/spicyEngine.js (SENALES y crearCtx).
//
// Cantidades: en € "de hoy" (año 0 de la partida); el motor las escala con la
// inflación acumulada. En los textos, {nombre} se interpola ya escalado.

export const EVENTOS = [

  // ══ INFANCIA (6-15) ══════════════════════════════════════════════════════
  {
    id: 'cromo-especial',
    edad: [8, 9],
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
    id: 'paga-semanal',
    edad: [10, 11],
    cantidades: { total: 90 },
    texto: {
      es: 'Este año te suben la paga. Si la gastas cada semana en chuches y cartas, se va sin darte cuenta. Si ahorras una parte, a final de año tendrás {total}.',
      en: 'Your allowance goes up this year. Spend it weekly on sweets and cards and it vanishes. Save part of it and you\'ll have {total} by year\'s end.',
      ca: 'Aquest any et pugen la paga. Si la gastes cada setmana en llaminadures, se\'n va sense adonar-te\'n. Si n\'estalvies una part, a final d\'any tindràs {total}.',
    },
    opciones: [
      {
        id: 'gastar',
        texto: { es: 'Disfrutarla cada semana', en: 'Enjoy it every week', ca: 'Gaudir-la cada setmana' },
        aplicar: () => ({ nota: { es: 'Un año dulce. En la hucha, eso sí, no queda nada.', en: 'A sweet year. Nothing left in the piggy bank though.', ca: 'Un any dolç. A la guardiola, això sí, no queda res.' } }),
      },
      {
        id: 'mitad',
        texto: { es: 'Ahorrar la mitad', en: 'Save half', ca: 'Estalviar la meitat' },
        aplicar: (p, ctx) => {
          ctx.dinero(Math.round(ctx.cant('total') / 2))
          return { nota: { es: 'Chuches Y ahorro. El equilibrio existe.', en: 'Sweets AND savings. Balance exists.', ca: 'Llaminadures I estalvi. L\'equilibri existeix.' } }
        },
      },
      {
        id: 'todo',
        texto: { es: 'Ahorrarla casi entera', en: 'Save almost all of it', ca: 'Estalviar-la gairebé sencera' },
        aplicar: (p, ctx) => {
          ctx.dinero(ctx.cant('total'))
          ctx.flag('ahorrador-precoz')
          return { nota: { es: 'Tu hucha engorda. Ahorrar de niño es fácil: no tienes facturas.', en: 'Your piggy bank grows. Saving as a kid is easy: no bills.', ca: 'La guardiola s\'engreixa. Estalviar de petit és fàcil: no tens factures.' } }
        },
      },
    ],
  },
  {
    id: 'videojuego-rebajas',
    edad: [12, 13],
    cantidades: { hoy: 70, rebajado: 25 },
    texto: {
      es: 'Sale el videojuego del año: {hoy} de lanzamiento. Todos tus amigos ya lo tienen. En 8 meses estará rebajado a {rebajado}.',
      en: 'The game of the year is out: {hoy} at launch. All your friends have it. In 8 months it\'ll be down to {rebajado}.',
      ca: 'Surt el videojoc de l\'any: {hoy} de llançament. Tots els teus amics ja el tenen. En 8 mesos estarà rebaixat a {rebajado}.',
    },
    opciones: [
      {
        id: 'hoy',
        texto: { es: 'Comprarlo hoy', en: 'Buy it today', ca: 'Comprar-lo avui' },
        aplicar: (p, ctx) => {
          ctx.dinero(-ctx.cant('hoy'))
          return { nota: { es: 'Lo juegas el primero. La impaciencia tiene precio, y lo has pagado.', en: 'You play it first. Impatience has a price, and you paid it.', ca: 'El jugues el primer. La impaciència té preu, i l\'has pagat.' } }
        },
      },
      {
        id: 'esperar',
        texto: { es: 'Esperar a las rebajas', en: 'Wait for the sale', ca: 'Esperar les rebaixes' },
        aplicar: (p, ctx) => {
          ctx.dinero(-ctx.cant('rebajado'))
          ctx.flag('paciente')
          return { nota: { es: 'Mismo juego, 8 meses después, por un tercio del precio. Esperar es la inversión más fácil que existe.', en: 'Same game, 8 months later, for a third of the price. Waiting is the easiest investment there is.', ca: 'El mateix joc, 8 mesos després, per un terç del preu. Esperar és la inversió més fàcil que existeix.' } }
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
          return { nota: { es: 'Tu primer dinero ganado. Sabe distinto al regalado.', en: 'Your first earned money. It tastes different from gifted money.', ca: 'Els teus primers diners guanyats. Tenen un gust diferent dels regalats.' } }
        },
      },
      {
        id: 'descansar',
        texto: { es: 'Disfrutar el verano', en: 'Enjoy the summer', ca: 'Gaudir l\'estiu' },
        aplicar: () => ({ nota: { es: 'Un verano de piscina y amigos. Eso también cuenta — solo que no en la hucha.', en: 'A summer of pool and friends. That counts too — just not in the piggy bank.', ca: 'Un estiu de piscina i amics. Això també compta — però no a la guardiola.' } }),
      },
    ],
  },

  // ══ ADULTO (22-64) ═══════════════════════════════════════════════════════
  {
    id: 'master',
    edad: [22, 24],
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
          ctx.experiencia({ es: 'Máster de especialización', en: 'Specialist master\'s', ca: 'Màster d\'especialització' })
          return { nota: { es: 'Un año duro de trabajar y estudiar. Invertir en ti no cotiza en bolsa, pero es el único activo que nadie puede quitarte.', en: 'A tough year of working and studying. Investing in yourself isn\'t listed on any exchange, but it\'s the only asset nobody can take from you.', ca: 'Un any dur de treballar i estudiar. Invertir en tu no cotitza a borsa, però és l\'únic actiu que ningú et pot prendre.' } }
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
          ctx.activo({ id: 'deposito-1', tipo: 'deposito', invertido: c, senales: ['entidad-seria'], nombre: { es: 'Depósito a plazo fijo', en: 'Fixed-term deposit', ca: 'Dipòsit a termini fix' } })
          return { nota: { es: 'Seguro y tranquilo. Ojo: si el interés es menor que la inflación, tu dinero "crece" pero compra menos.', en: 'Safe and calm. Careful: if interest is below inflation, your money "grows" but buys less.', ca: 'Segur i tranquil. Ull: si l\'interès és menor que la inflació, els teus diners "creixen" però compren menys.' } }
        },
      },
      {
        id: 'cuenta',
        texto: { es: 'Dejarlo en la cuenta', en: 'Leave it in the account', ca: 'Deixar-los al compte' },
        aplicar: () => ({ nota: { es: 'Disponible al instante… y desprotegido: la inflación se lo irá comiendo en silencio.', en: 'Instantly available… and unprotected: inflation will quietly eat it.', ca: 'Disponible a l\'instant… i desprotegit: la inflació se\'ls anirà menjant en silenci.' } }),
      },
      {
        id: 'mochilero',
        texto: { es: 'Tres meses de mochilero por Asia', en: 'Three months backpacking across Asia', ca: 'Tres mesos de motxiller per Àsia' },
        aplicar: (p, ctx) => {
          ctx.dinero(-Math.round(ctx.cant('ahorro') * 0.8))
          ctx.flag('viaje-mochilero')
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
    id: 'casa-o-alquiler',
    edad: [29, 31],
    cantidades: { precio: 180000, entrada: 36000 },
    texto: {
      es: 'Encuentras un piso que te encaja: {precio}. Necesitas {entrada} de entrada y una hipoteca de 25 años con cuota fija. O puedes seguir de alquiler, libre de ataduras… y de escrituras.',
      en: 'You find a flat that suits you: {precio}. You need {entrada} down plus a 25-year fixed mortgage. Or keep renting, free of ties… and of deeds.',
      ca: 'Trobes un pis que t\'encaixa: {precio}. Necessites {entrada} d\'entrada i una hipoteca de 25 anys amb quota fixa. O pots seguir de lloguer, lliure de lligams… i d\'escriptures.',
    },
    senales: ['iliquido'],
    opciones: [
      {
        id: 'comprar',
        texto: { es: 'Comprar (necesitas {entrada})', en: 'Buy (you need {entrada})', ca: 'Comprar (necessites {entrada})' },
        aplicar: (p, ctx) => {
          const entrada = ctx.cant('entrada'), precio = ctx.cant('precio')
          if (p.dinero < entrada) {
            ctx.flag('alquiler-vitalicio')
            return { rechazo: true, nota: { es: `El banco te pide ${ctx.f(entrada)} de entrada y no los tienes. Sin ahorro previo, esta puerta no se abre — sigues de alquiler.`, en: `The bank asks for ${ctx.f(entrada)} down and you don't have it. Without prior savings, this door won't open — you keep renting.`, ca: `El banc et demana ${ctx.f(entrada)} d'entrada i no els tens. Sense estalvi previ, aquesta porta no s'obre — segueixes de lloguer.` } }
          }
          ctx.dinero(-entrada)
          p.vivienda = 'propia'
          p.alquilerAnual = 0
          p.hipoteca = { pendiente: precio - entrada, cuota: Math.round(((precio - entrada) * 1.35) / 25), años: 25 }
          ctx.activo({ id: 'casa-1', tipo: 'casa', invertido: precio, valor: precio, senales: ['iliquido'], nombre: { es: 'Tu piso', en: 'Your flat', ca: 'El teu pis' } })
          ctx.flag('hipoteca')
          return { nota: { es: 'Tuya (bueno, del banco durante 25 años). La cuota es fija: la inflación jugará a tu favor esta vez.', en: 'Yours (well, the bank\'s for 25 years). The payment is fixed: inflation will work in your favour this time.', ca: 'Teu (bé, del banc durant 25 anys). La quota és fixa: la inflació jugarà a favor teu aquesta vegada.' } }
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
    edad: [34, 35],
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
    texto: {
      es: 'Una startup te ficha: +35% de sueldo, oficina bonita, futbolín. Aún no gana dinero — "estamos en fase de crecimiento", dicen. Tu empresa actual es aburrida pero lleva 40 años en pie.',
      en: 'A startup wants you: +35% salary, nice office, table football. It doesn\'t make money yet — "we\'re in growth phase", they say. Your current company is boring but has stood for 40 years.',
      ca: 'Una startup et fitxa: +35% de sou, oficina bonica, futbolí. Encara no guanya diners — "estem en fase de creixement", diuen. La teva empresa actual és avorrida però fa 40 anys que aguanta.',
    },
    senales: ['presion'],
    opciones: [
      {
        id: 'saltar',
        texto: { es: 'Saltar a la startup (+35%)', en: 'Jump to the startup (+35%)', ca: 'Saltar a la startup (+35%)' },
        aplicar: (p, ctx) => {
          p.ingresos = Math.round(p.ingresos * 1.35)
          ctx.flag('startup')
          return { nota: { es: 'Sueldazo. Pero pregúntate: si viene una crisis, ¿quién paga tu nómina — los beneficios que no tienen, o los inversores que se asustan?', en: 'Great salary. But ask yourself: if a crisis comes, who pays your wage — the profits they don\'t have, or investors who get scared?', ca: 'Souàs. Però pregunta\'t: si ve una crisi, qui paga la teva nòmina — els beneficis que no tenen, o els inversors que s\'espanten?' } }
        },
      },
      {
        id: 'quedarse',
        texto: { es: 'Quedarte donde estás', en: 'Stay where you are', ca: 'Quedar-te on ets' },
        aplicar: (p, ctx) => {
          p.ingresos = Math.round(p.ingresos * 1.08)
          ctx.flag('empleo-estable')
          return { nota: { es: 'Te suben un poco por no irte. Menos brillo, más cimientos.', en: 'They give you a small raise to stay. Less shine, more foundations.', ca: 'Et pugen una mica per no marxar. Menys brillantor, més fonaments.' } }
        },
      },
    ],
  },
  {
    id: 'cromo-vender-bueno',
    edad: [32, 33],
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
    edad: [32, 33],
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
    id: 'boda-amigo',
    edad: [33, 34],
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
          ctx.experiencia({ es: 'La boda de tu mejor amigo', en: 'Your best friend\'s wedding', ca: 'La boda del teu millor amic' })
          return { nota: { es: 'Bailas hasta las tantas y conoces a gente de todas partes. Las relaciones no salen en el extracto del banco, pero también son patrimonio.', en: 'You dance till late and meet people from everywhere. Relationships don\'t show on your bank statement, but they\'re wealth too.', ca: 'Balles fins a la matinada i coneixes gent de tot arreu. Les relacions no surten a l\'extracte del banc, però també són patrimoni.' } }
        },
      },
      {
        id: 'excusarse',
        texto: { es: 'Excusarte y enviar un regalo', en: 'Make excuses and send a gift', ca: 'Excusar-te i enviar un regal' },
        aplicar: (p, ctx) => {
          ctx.dinero(-Math.round(ctx.cant('coste') * 0.15))
          return { nota: { es: 'Ahorras casi todo el coste. Tu amigo dice que lo entiende. Las cosas que no se hacen también dejan huella.', en: 'You save almost the whole cost. Your friend says he understands. The things left undone leave a mark too.', ca: 'Estalvies gairebé tot el cost. El teu amic diu que ho entén. Les coses que no es fan també deixen empremta.' } }
        },
      },
    ],
  },
  {
    id: 'tu-boda',
    edad: [36, 37],
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
          ctx.experiencia({ es: 'Vuestra gran boda', en: 'Your big wedding', ca: 'La vostra gran boda' })
          return { nota: { es: 'Un día irrepetible con todos los tuyos. Caro, sí. ¿Tirado? Eso no lo dicen los números — lo dirás tú dentro de 30 años.', en: 'An unrepeatable day with everyone you love. Expensive, yes. Wasted? Numbers can\'t tell you that — you\'ll tell yourself in 30 years.', ca: 'Un dia irrepetible amb tots els teus. Car, sí. Llençat? Això no ho diuen els números — ho diràs tu d\'aquí a 30 anys.' } }
        },
      },
      {
        id: 'intima',
        texto: { es: 'Algo íntimo ({intima})', en: 'Something intimate ({intima})', ca: 'Una cosa íntima ({intima})' },
        aplicar: (p, ctx) => {
          ctx.dinero(-ctx.cant('intima'))
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
        texto: { es: 'Entrar como socio ({parte})', en: 'Become a partner ({parte})', ca: 'Entrar com a soci ({parte})' },
        aplicar: (p, ctx) => {
          const c = ctx.cant('parte')
          if (p.dinero < c) return { rechazo: true, nota: { es: 'No tienes el dinero. La puerta que abrió aquel viaje se cierra por falta de colchón — dolorosa combinación.', en: 'You don\'t have the money. The door that trip opened closes for lack of savings — a painful combination.', ca: 'No tens els diners. La porta que va obrir aquell viatge es tanca per falta de coixí — combinació dolorosa.' } }
          ctx.dinero(-c)
          ctx.activo({ id: 'negocio-nadia', tipo: 'negocio', invertido: c, senales: ['conocido', 'negocio-real', 'iliquido'], oculto: { pQuiebraAnual: 0.06, renta: 0.20 }, nombre: { es: 'La empresa de Nadia', en: 'Nadia\'s company', ca: 'L\'empresa de la Nadia' } })
          return { nota: { es: 'Dentro. Aquel viaje de los 25 acaba de convertirse en la inversión con mejor pinta de tu vida. Las experiencias también componen interés.', en: 'You\'re in. That trip at 25 just became the best-looking investment of your life. Experiences compound too.', ca: 'Dins. Aquell viatge dels 25 acaba de convertir-se en la inversió amb més bona pinta de la teva vida. Les experiències també componen interès.' } }
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
    id: 'ascenso',
    edad: [42, 43],
    requiere: ['formacion'],
    texto: {
      es: 'Se abre una plaza de dirección y tu máster te pone el primero de la lista. Más sueldo (+30%)… y más horas, más viajes, más teléfono encendido a las 22h.',
      en: 'A management position opens and your master\'s puts you first in line. More salary (+30%)… and more hours, more travel, more phone on at 10pm.',
      ca: 'S\'obre una plaça de direcció i el teu màster et posa el primer de la llista. Més sou (+30%)… i més hores, més viatges, més telèfon encès a les 22h.',
    },
    opciones: [
      {
        id: 'aceptar',
        texto: { es: 'Aceptar la dirección (+30%)', en: 'Take the management job (+30%)', ca: 'Acceptar la direcció (+30%)' },
        aplicar: (p) => {
          p.ingresos = Math.round(p.ingresos * 1.3)
          return { nota: { es: 'El máster de los 23 por fin se paga solo — con intereses. La factura ahora es de tiempo, no de dinero.', en: 'The master\'s from age 23 finally pays for itself — with interest. The bill now comes in time, not money.', ca: 'El màster dels 23 per fi es paga sol — amb interessos. La factura ara és de temps, no de diners.' } }
        },
      },
      {
        id: 'rechazar',
        texto: { es: 'Rechazarla y proteger tu tiempo', en: 'Turn it down and protect your time', ca: 'Rebutjar-la i protegir el teu temps' },
        aplicar: (p, ctx) => {
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
    texto: {
      es: 'Te llama alguien que conociste en una boda hace años: dirige una empresa consolidada y busca a alguien de tu perfil. Oferta seria: +20% de sueldo y estabilidad de las de antes.',
      en: 'Someone you met at a wedding years ago calls: they run an established company and want someone with your profile. A serious offer: +20% salary and old-school stability.',
      ca: 'Et truca algú que vas conèixer en una boda fa anys: dirigeix una empresa consolidada i busca algú del teu perfil. Oferta seriosa: +20% de sou i estabilitat de les d\'abans.',
    },
    senales: ['conocido', 'entidad-seria'],
    opciones: [
      {
        id: 'aceptar',
        texto: { es: 'Aceptar la oferta (+20%)', en: 'Take the offer (+20%)', ca: 'Acceptar l\'oferta (+20%)' },
        aplicar: (p, ctx) => {
          p.ingresos = Math.round(p.ingresos * 1.2)
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
          ctx.activo({ id: 'bar-1', tipo: 'negocio', invertido: c, senales: ['conocido', 'negocio-real', 'iliquido'], oculto: { pQuiebraAnual: 0.11, renta: 0.18 }, nombre: { es: 'El bar de tu amiga', en: 'Your friend\'s bar', ca: 'El bar de la teva amiga' } })
          return { nota: { es: 'Socio. Esto no es la cripto del gimnasio: negocio real, cuentas sobre la mesa y sin promesas mágicas. Sigue siendo arriesgado — la mitad de los bares cierran.', en: 'Partner. This isn\'t the gym crypto: real business, numbers on the table, no magic promises. Still risky — half of all bars close.', ca: 'Soci. Això no és la cripto del gimnàs: negoci real, comptes sobre la taula i sense promeses màgiques. Segueix sent arriscat — la meitat dels bars tanquen.' } }
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
          const fondo = p.activos.find(a => a.id === 'fondo-1' && a.estado === 'vivo')
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
    id: 'nivel-de-vida',
    edad: [50, 51],
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
          p.gastos = Math.round(p.gastos * 1.3)
          ctx.experiencia({ es: 'Años de vivir bien', en: 'Years of living well', ca: 'Anys de viure bé' })
          return { nota: { es: 'La vida sabe mejor. Ojo al detalle: los gastos que suben casi nunca vuelven a bajar — acabas de mover tu listón para siempre.', en: 'Life tastes better. Mind the detail: expenses that go up almost never come back down — you just moved your bar for good.', ca: 'La vida té més bon gust. Ull al detall: les despeses que pugen gairebé mai tornen a baixar — acabes de moure el teu llistó per sempre.' } }
        },
      },
      {
        id: 'mantener',
        texto: { es: 'Mantener tu nivel de siempre', en: 'Keep your usual lifestyle', ca: 'Mantenir el teu nivell de sempre' },
        aplicar: (p, ctx) => {
          ctx.flag('frugal')
          return { nota: { es: 'Cada subida de sueldo se convierte en ahorro en vez de en costumbre. Es la jugada silenciosa que más patrimonios ha construido… y también hay que saber disfrutar por el camino.', en: 'Every raise becomes savings instead of habit. It\'s the quiet move that has built the most fortunes… though you also need to enjoy the ride.', ca: 'Cada pujada de sou es converteix en estalvi en lloc de costum. És la jugada silenciosa que més patrimonis ha construït… i també cal saber gaudir pel camí.' } }
        },
      },
    ],
  },
  {
    id: 'imprevisto',
    edad: [55, 56],
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
          ctx.dinero(-ctx.cant('golpe'))
          return { nota: { es: 'Duele, pero se paga y se olvida. Exactamente para esto existe el colchón de emergencia: los imprevistos no avisan, se presentan.', en: 'It hurts, but you pay and move on. This is exactly what the emergency fund is for: surprises don\'t warn you, they just show up.', ca: 'Fa mal, però es paga i s\'oblida. Exactament per a això existeix el coixí d\'emergència: els imprevistos no avisen, es presenten.' } }
        },
      },
      {
        id: 'financiar',
        texto: { es: 'Financiarlo a plazos', en: 'Finance it in instalments', ca: 'Finançar-ho a terminis' },
        aplicar: (p, ctx) => {
          ctx.dinero(-ctx.cant('financiado'))
          return { nota: { es: 'Pagas {financiado} por un problema de {golpe}: la "comodidad" costó 1.500. Financiar imprevistos es alquilar dinero caro.', en: 'You pay {financiado} for a {golpe} problem: the "comfort" cost 1,500. Financing emergencies is renting expensive money.', ca: 'Pagues {financiado} per un problema de {golpe}: la "comoditat" va costar 1.500. Finançar imprevistos és llogar diners cars.' } }
        },
      },
    ],
  },
  {
    id: 'coche',
    edad: [53, 54],
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
          ctx.dinero(-ctx.cant('cuotaTotal'))
          return { nota: { es: 'Huele a nuevo. La financiación "cómoda" te costó {cuotaTotal} por un coche de {nuevo}: pagaste 7.000 por no esperar.', en: 'That new car smell. The "comfortable" financing cost you {cuotaTotal} for a {nuevo} car: you paid 7,000 for not waiting.', ca: 'Olor de nou. El finançament "còmode" et va costar {cuotaTotal} per un cotxe de {nuevo}: vas pagar 7.000 per no esperar.' } }
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
          p.ingresos = Math.round(p.ingresos * 0.35)
          ctx.flag('prejubilado')
          return { nota: { es: 'Libertad anticipada. La indemnización parece mucha — repártela mentalmente entre los años que faltan hasta la pensión y parece menos.', en: 'Early freedom. The severance seems big — spread it mentally over the years until your pension and it seems smaller.', ca: 'Llibertat anticipada. La indemnització sembla molta — reparteix-la mentalment entre els anys que falten fins a la pensió i sembla menys.' } }
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
          ctx.experiencia({ es: 'El gran viaje de tu vida', en: 'The great trip of your life', ca: 'El gran viatge de la teva vida' })
          return { nota: { es: 'Fiordos al amanecer y cerezos en flor. Para ESTO ahorraste 50 años: el dinero que no se convierte en vida solo es un número que hereda otro.', en: 'Fjords at dawn and cherry blossoms. THIS is what you saved 50 years for: money that never becomes life is just a number someone else inherits.', ca: 'Fiords a l\'alba i cirerers en flor. Per AIXÒ vas estalviar 50 anys: els diners que no es converteixen en vida només són un número que hereta un altre.' } }
        },
      },
      {
        id: 'no',
        texto: { es: 'Mejor lo guardo', en: 'Better keep it', ca: 'Millor ho guardo' },
        aplicar: () => ({ nota: { es: 'El dinero se queda. La foto de los fiordos, en el salvapantallas. Guardar también tiene un coste — solo que no sale en el banco.', en: 'The money stays. The fjords photo stays on the screensaver. Keeping money has a cost too — it just doesn\'t show at the bank.', ca: 'Els diners es queden. La foto dels fiords, al salvapantalles. Guardar també té un cost — només que no surt al banc.' } }),
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
]

// La mudanza cuesta ~2000€ de hoy, escalados a la edad del evento
function escalaMudanza(p) {
  const v = 2000 * p.indice
  return Math.round(v / 100) * 100
}
