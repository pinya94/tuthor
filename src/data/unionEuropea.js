// La Unión Europea — Geografía, ESO + Bachillerato (3º-4º ESO: España en la UE;
// Geografía de 2º de Bachillerato). Qué es, cómo se formó, el mercado único, el
// euro y Schengen, y sus instituciones: quién propone, quién aprueba y quién
// juzga.
//
// Cifras elegidas para que no caduquen: 27 Estados miembros (desde la salida del
// Reino Unido en 2020) y 24 lenguas oficiales. No se pregunta cuántos países
// usan el euro ni cuántos eurodiputados hay, porque cambian con cada ampliación.
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
  // ── ESO ─────────────────────────────────────────────────────────────────
  q('ue-01', 'eso', '🌍',
    T("¿Cuántos Estados miembros tiene la Unión Europea desde la salida del Reino Unido?", "How many member states has the European Union had since the United Kingdom left?", "Quants estats membres té la Unió Europea des de la sortida del Regne Unit?"),
    N('27', '28', '12', '50'),
    T("Eran 28 hasta 2020; con el Brexit quedaron 27. No hay que confundirlo con las 12 estrellas de la bandera, que nunca han indicado el número de países.",
      "There were 28 until 2020; after Brexit, 27 remained. Do not confuse it with the 12 stars on the flag, which have never stood for the number of countries.",
      "N’eren 28 fins al 2020; amb el Brexit en van quedar 27. No s’ha de confondre amb les 12 estrelles de la bandera, que mai no han indicat el nombre de països.")),

  q('ue-02', 'eso', '📅',
    T("¿En qué año entró España en la Comunidad Europea?", "In which year did Spain join the European Community?", "En quin any va entrar Espanya a la Comunitat Europea?"),
    N('1986', '1957', '1975', '2002'),
    T("España y Portugal entraron juntos el 1 de enero de 1986, una vez consolidada la democracia. 1957 es el Tratado de Roma y 2002, la llegada de las monedas y billetes de euro.",
      "Spain and Portugal joined together on 1 January 1986, once democracy was established. 1957 is the Treaty of Rome and 2002 the arrival of euro notes and coins.",
      "Espanya i Portugal hi van entrar junts l’1 de gener de 1986, un cop consolidada la democràcia. 1957 és el Tractat de Roma i 2002, l’arribada de les monedes i bitllets d’euro.")),

  q('ue-03', 'eso', '💶',
    T("¿Usan el euro todos los países de la Unión Europea?", "Do all European Union countries use the euro?", "Fan servir l’euro tots els països de la Unió Europea?"),
    O(["No: algunos, como Suecia, Polonia o Dinamarca, conservan su propia moneda", "Sí, es obligatorio desde el primer día", "No: solo lo usan España, Francia y Alemania", "Sí, y también el Reino Unido"],
      ["No: some, such as Sweden, Poland or Denmark, keep their own currency", "Yes, it is compulsory from day one", "No: only Spain, France and Germany use it", "Yes, and so does the United Kingdom"],
      ["No: alguns, com Suècia, Polònia o Dinamarca, conserven la seva pròpia moneda", "Sí, és obligatori des del primer dia", "No: només el fan servir Espanya, França i Alemanya", "Sí, i també el Regne Unit"]),
    T("Los países que usan el euro forman la zona euro. Para entrar hay que cumplir unos requisitos económicos, y Dinamarca negoció quedarse fuera.",
      "The countries using the euro form the eurozone. To join they must meet economic requirements, and Denmark negotiated an opt-out.",
      "Els països que fan servir l’euro formen la zona euro. Per entrar-hi cal complir uns requisits econòmics, i Dinamarca va negociar quedar-ne fora.")),

  q('ue-04', 'eso', '🏛️',
    T("¿En qué ciudad tienen su sede la Comisión Europea y el Consejo?", "In which city are the European Commission and the Council based?", "En quina ciutat tenen la seu la Comissió Europea i el Consell?"),
    O(["Bruselas", "París", "Berlín", "Madrid"],
      ["Brussels", "Paris", "Berlin", "Madrid"],
      ["Brussel·les", "París", "Berlín", "Madrid"]),
    T("Bruselas (Bélgica) es la capital de hecho de la UE. Otras instituciones están repartidas: el Parlamento celebra sus plenos en Estrasburgo y el Tribunal de Justicia está en Luxemburgo.",
      "Brussels (Belgium) is the de facto capital of the EU. Other institutions are spread out: Parliament holds its plenary sessions in Strasbourg and the Court of Justice is in Luxembourg.",
      "Brussel·les (Bèlgica) és la capital de fet de la UE. Altres institucions estan repartides: el Parlament fa els plens a Estrasburg i el Tribunal de Justícia és a Luxemburg.")),

  q('ue-05', 'eso', '⭐',
    T("¿Qué significan las 12 estrellas de la bandera europea?", "What do the 12 stars on the European flag mean?", "Què signifiquen les 12 estrelles de la bandera europea?"),
    O(["Unidad, solidaridad y armonía: el 12 es un símbolo de plenitud, no el número de países", "Los 12 primeros países miembros", "Los 12 meses del año", "Las 12 instituciones de la UE"],
      ["Unity, solidarity and harmony: 12 is a symbol of completeness, not the number of countries", "The first 12 member countries", "The 12 months of the year", "The 12 EU institutions"],
      ["Unitat, solidaritat i harmonia: el 12 és un símbol de plenitud, no el nombre de països", "Els 12 primers països membres", "Els 12 mesos de l’any", "Les 12 institucions de la UE"]),
    T("La bandera es anterior a la Unión: la adoptó el Consejo de Europa en 1955. Por eso no cambia cuando entra o sale un país.",
      "The flag is older than the Union: the Council of Europe adopted it in 1955. That is why it does not change when a country joins or leaves.",
      "La bandera és anterior a la Unió: la va adoptar el Consell d’Europa el 1955. Per això no canvia quan hi entra o en surt un país.")),

  q('ue-06', 'eso', '🛂',
    T("¿Qué permite el espacio Schengen?", "What does the Schengen Area allow?", "Què permet l’espai Schengen?"),
    O(["Viajar entre los países que lo forman sin controles de pasaporte en las fronteras interiores", "Pagar con euros en cualquier país del mundo", "Votar en las elecciones de cualquier país", "Trabajar sin contrato"],
      ["Travelling between its member countries without passport checks at internal borders", "Paying in euros in any country in the world", "Voting in any country’s elections", "Working without a contract"],
      ["Viatjar entre els països que el formen sense controls de passaport a les fronteres interiors", "Pagar amb euros a qualsevol país del món", "Votar a les eleccions de qualsevol país", "Treballar sense contracte"]),
    T("Schengen no coincide exactamente con la UE: lo forman casi todos sus miembros y también países de fuera, como Suiza o Noruega.",
      "Schengen does not match the EU exactly: most members belong to it, and so do some non-members such as Switzerland and Norway.",
      "Schengen no coincideix exactament amb la UE: el formen gairebé tots els seus membres i també països de fora, com Suïssa o Noruega.")),

  q('ue-07', 'eso', '🗳️',
    T("¿Cómo se elige el Parlamento Europeo?", "How is the European Parliament chosen?", "Com s’elegeix el Parlament Europeu?"),
    O(["Lo votan directamente los ciudadanos de la UE cada cinco años", "Lo nombran los reyes y presidentes de cada país", "Lo elige la Comisión Europea", "Es hereditario"],
      ["EU citizens vote for it directly every five years", "The kings and presidents of each country appoint it", "The European Commission chooses it", "It is hereditary"],
      ["El voten directament els ciutadans de la UE cada cinc anys", "El nomenen els reis i presidents de cada país", "L’elegeix la Comissió Europea", "És hereditari"]),
    T("Es la única institución europea elegida por sufragio directo. Cada país elige un número de eurodiputados según su población.",
      "It is the only European institution elected directly. Each country elects a number of MEPs according to its population.",
      "És l’única institució europea elegida per sufragi directe. Cada país elegeix un nombre d’eurodiputats segons la seva població.")),

  q('ue-08', 'eso', '🤝',
    T("¿Cuántos países firmaron en 1957 el Tratado de Roma, que creó la Comunidad Económica Europea?", "How many countries signed the 1957 Treaty of Rome, which created the European Economic Community?", "Quants països van signar el 1957 el Tractat de Roma, que va crear la Comunitat Econòmica Europea?"),
    N('6', '12', '27', '2'),
    T("Fueron Francia, Alemania Occidental, Italia, Bélgica, Países Bajos y Luxemburgo. Después de dos guerras mundiales, unir sus economías hacía muy difícil otra guerra entre ellos.",
      "They were France, West Germany, Italy, Belgium, the Netherlands and Luxembourg. After two world wars, tying their economies together made another war between them very hard.",
      "Van ser França, l’Alemanya Occidental, Itàlia, Bèlgica, els Països Baixos i Luxemburg. Després de dues guerres mundials, unir les economies feia molt difícil una altra guerra entre ells.")),

  q('ue-09', 'eso', '🔎',
    T("¿Cuál de estos países NO fue fundador de la Comunidad Europea?", "Which of these countries was NOT a founder of the European Community?", "Quin d’aquests països NO va ser fundador de la Comunitat Europea?"),
    O(["España", "Francia", "Italia", "Bélgica"],
      ["Spain", "France", "Italy", "Belgium"],
      ["Espanya", "França", "Itàlia", "Bèlgica"]),
    T("En 1957 España vivía bajo la dictadura de Franco, y la Comunidad solo admitía democracias. Entró en 1986.",
      "In 1957 Spain was under Franco’s dictatorship, and the Community only admitted democracies. It joined in 1986.",
      "El 1957 Espanya vivia sota la dictadura de Franco, i la Comunitat només admetia democràcies. Hi va entrar el 1986.")),

  q('ue-10', 'eso', '🚪',
    T("¿Qué país abandonó la Unión Europea en 2020?", "Which country left the European Union in 2020?", "Quin país va abandonar la Unió Europea el 2020?"),
    O(["El Reino Unido", "Suiza", "Noruega", "Grecia"],
      ["The United Kingdom", "Switzerland", "Norway", "Greece"],
      ["El Regne Unit", "Suïssa", "Noruega", "Grècia"]),
    T("Tras el referéndum de 2016, el Reino Unido salió el 31 de enero de 2020: es el Brexit. Suiza y Noruega nunca han sido miembros.",
      "After the 2016 referendum, the United Kingdom left on 31 January 2020: that is Brexit. Switzerland and Norway have never been members.",
      "Després del referèndum del 2016, el Regne Unit en va sortir el 31 de gener de 2020: és el Brexit. Suïssa i Noruega no n’han estat mai membres.")),

  q('ue-11', 'eso', '🎓',
    T("¿Qué es el programa Erasmus+?", "What is the Erasmus+ programme?", "Què és el programa Erasmus+?"),
    O(["Un programa de la UE para estudiar, formarse o hacer prácticas en otro país europeo", "Una moneda digital europea", "El himno de la Unión Europea", "Un tratado de defensa"],
      ["An EU programme for studying, training or doing work placements in another European country", "A European digital currency", "The anthem of the European Union", "A defence treaty"],
      ["Un programa de la UE per estudiar, formar-se o fer pràctiques en un altre país europeu", "Una moneda digital europea", "L’himne de la Unió Europea", "Un tractat de defensa"]),
    T("Empezó en 1987 con estudiantes universitarios y hoy incluye también institutos, formación profesional y profesorado. España es uno de los países que más estudiantes envía y recibe.",
      "It began in 1987 for university students and now also covers schools, vocational training and teachers. Spain is one of the countries that sends and receives the most students.",
      "Va començar el 1987 amb estudiants universitaris i avui inclou també instituts, formació professional i professorat. Espanya és un dels països que més estudiants envia i rep.")),

  q('ue-12', 'eso', '📦',
    T("El mercado único se basa en cuatro libertades de circulación. ¿Cuáles?", "The single market is based on four freedoms of movement. Which ones?", "El mercat únic es basa en quatre llibertats de circulació. Quines?"),
    O(["Personas, mercancías, servicios y capitales", "Coches, trenes, aviones y barcos", "Ideas, religiones, idiomas y costumbres", "Solo mercancías"],
      ["People, goods, services and capital", "Cars, trains, planes and ships", "Ideas, religions, languages and customs", "Goods only"],
      ["Persones, mercaderies, serveis i capitals", "Cotxes, trens, avions i vaixells", "Idees, religions, idiomes i costums", "Només mercaderies"]),
    T("Un ciudadano europeo puede vivir y trabajar en otro país de la UE, y un producto se vende en los 27 sin aranceles entre ellos.",
      "A European citizen can live and work in another EU country, and a product can be sold in all 27 without tariffs between them.",
      "Un ciutadà europeu pot viure i treballar en un altre país de la UE, i un producte es ven als 27 sense aranzels entre ells.")),

  q('ue-13', 'eso', '🗣️',
    T("¿Cuántas lenguas oficiales tiene la Unión Europea?", "How many official languages does the European Union have?", "Quantes llengües oficials té la Unió Europea?"),
    N('24', '1', '3', '27'),
    T("Cada ley se publica en todas ellas y cualquier ciudadano puede dirigirse a las instituciones en su lengua oficial. No son 27 porque varios países comparten idioma, como Austria y Alemania.",
      "Every law is published in all of them and any citizen can write to the institutions in their official language. There are not 27 because several countries share a language, like Austria and Germany.",
      "Cada llei es publica en totes i qualsevol ciutadà es pot adreçar a les institucions en la seva llengua oficial. No en són 27 perquè diversos països comparteixen idioma, com Àustria i Alemanya.")),

  q('ue-14', 'eso', '🎶',
    T("¿Cuál es el lema de la Unión Europea?", "What is the motto of the European Union?", "Quin és el lema de la Unió Europea?"),
    O(["«Unida en la diversidad»", "«Libertad, igualdad, fraternidad»", "«Plus ultra»", "«Todos para uno»"],
      ["«United in diversity»", "«Liberty, equality, fraternity»", "«Plus ultra»", "«All for one»"],
      ["«Units en la diversitat»", "«Llibertat, igualtat, fraternitat»", "«Plus ultra»", "«Tots per a un»"]),
    T("Expresa que los países cooperan sin renunciar a sus lenguas y culturas. «Libertad, igualdad, fraternidad» es el lema de Francia y «Plus ultra», el de España.",
      "It means the countries cooperate without giving up their languages and cultures. «Liberty, equality, fraternity» is France’s motto and «Plus ultra» is Spain’s.",
      "Expressa que els països cooperen sense renunciar a les seves llengües i cultures. «Llibertat, igualtat, fraternitat» és el lema de França i «Plus ultra», el d’Espanya.")),

  // ── Bachillerato ────────────────────────────────────────────────────────
  q('ue-15', 'bachillerato', '📜',
    T("¿Qué función principal tiene la Comisión Europea?", "What is the main role of the European Commission?", "Quina funció principal té la Comissió Europea?"),
    O(["Proponer las leyes europeas y vigilar que se cumplan (es el órgano ejecutivo)", "Juzgar a los países que incumplen", "Fijar los tipos de interés del euro", "Elegir a los eurodiputados"],
      ["Proposing EU laws and making sure they are applied (it is the executive body)", "Trying countries that break the rules", "Setting euro interest rates", "Electing MEPs"],
      ["Proposar les lleis europees i vetllar perquè es compleixin (és l’òrgan executiu)", "Jutjar els països que incompleixen", "Fixar els tipus d’interès de l’euro", "Elegir els eurodiputats"]),
    T("La Comisión tiene un comisario por cada Estado miembro y defiende el interés común, no el de su país. Casi toda ley europea empieza con una propuesta suya.",
      "The Commission has one commissioner per member state and defends the common interest, not that of their own country. Almost every EU law starts with a proposal from it.",
      "La Comissió té un comissari per cada estat membre i defensa l’interès comú, no el del seu país. Gairebé tota llei europea comença amb una proposta seva.")),

  q('ue-16', 'bachillerato', '⚖️',
    T("¿Quién aprueba normalmente las leyes de la UE?", "Who normally passes EU laws?", "Qui aprova normalment les lleis de la UE?"),
    O(["El Parlamento Europeo y el Consejo de la UE, juntos", "Solo la Comisión Europea", "El Tribunal de Justicia", "El Banco Central Europeo"],
      ["The European Parliament and the Council of the EU, together", "The European Commission alone", "The Court of Justice", "The European Central Bank"],
      ["El Parlament Europeu i el Consell de la UE, junts", "Només la Comissió Europea", "El Tribunal de Justícia", "El Banc Central Europeu"]),
    T("Es el procedimiento legislativo ordinario: la Comisión propone, y el Parlamento (que representa a los ciudadanos) y el Consejo (que representa a los gobiernos) deben ponerse de acuerdo.",
      "This is the ordinary legislative procedure: the Commission proposes, and Parliament (representing citizens) and the Council (representing governments) must agree.",
      "És el procediment legislatiu ordinari: la Comissió proposa, i el Parlament (que representa els ciutadans) i el Consell (que representa els governs) s’han de posar d’acord.")),

  q('ue-17', 'bachillerato', '👥',
    T("¿Quién forma el Consejo Europeo?", "Who makes up the European Council?", "Qui forma el Consell Europeu?"),
    O(["Los jefes de Estado o de Gobierno de los Estados miembros, con su presidente y el de la Comisión", "Los ministros de cada área de los 27 países", "Los eurodiputados más votados", "Los jueces de cada país"],
      ["The heads of state or government of the member states, with its president and the Commission’s", "The ministers for each policy area from the 27 countries", "The MEPs with the most votes", "The judges of each country"],
      ["Els caps d’Estat o de Govern dels estats membres, amb el seu president i el de la Comissió", "Els ministres de cada àrea dels 27 països", "Els eurodiputats més votats", "Els jutges de cada país"]),
    T("El Consejo Europeo marca las grandes orientaciones políticas en sus cumbres. No hay que confundirlo con el Consejo de la UE, donde se reúnen los ministros de cada materia, ni con el Consejo de Europa, que no es de la UE.",
      "The European Council sets the broad political direction at its summits. Do not confuse it with the Council of the EU, where ministers for each area meet, or with the Council of Europe, which is not part of the EU.",
      "El Consell Europeu marca les grans orientacions polítiques a les cimeres. No s’ha de confondre amb el Consell de la UE, on es reuneixen els ministres de cada matèria, ni amb el Consell d’Europa, que no és de la UE.")),

  q('ue-18', 'bachillerato', '🏦',
    T("¿Qué hace el Banco Central Europeo, con sede en Fráncfort?", "What does the European Central Bank, based in Frankfurt, do?", "Què fa el Banc Central Europeu, amb seu a Frankfurt?"),
    O(["Dirige la política monetaria del euro: fija los tipos de interés para mantener estables los precios", "Presta dinero a los ciudadanos para comprar casa", "Cobra los impuestos de toda la UE", "Aprueba los presupuestos de cada país"],
      ["It runs the euro’s monetary policy: it sets interest rates to keep prices stable", "It lends money to citizens to buy homes", "It collects taxes for the whole EU", "It approves each country’s budget"],
      ["Dirigeix la política monetària de l’euro: fixa els tipus d’interès per mantenir estables els preus", "Presta diners als ciutadans per comprar casa", "Cobra els impostos de tota la UE", "Aprova els pressupostos de cada país"]),
    T("Su objetivo principal es que la inflación se mantenga baja y estable, en torno al 2 %. Es independiente de los gobiernos.",
      "Its main aim is to keep inflation low and stable, around 2%. It is independent of governments.",
      "El seu objectiu principal és que la inflació es mantingui baixa i estable, al voltant del 2 %. És independent dels governs.")),

  q('ue-19', 'bachillerato', '🏰',
    T("¿Dónde tiene su sede el Tribunal de Justicia de la Unión Europea?", "Where is the Court of Justice of the European Union based?", "On té la seu el Tribunal de Justícia de la Unió Europea?"),
    O(["Luxemburgo", "La Haya", "Estrasburgo", "Ginebra"],
      ["Luxembourg", "The Hague", "Strasbourg", "Geneva"],
      ["Luxemburg", "la Haia", "Estrasburg", "Ginebra"]),
    T("Vigila que el derecho europeo se interprete igual en todos los países. En La Haya está la Corte Internacional de Justicia (de la ONU), y en Estrasburgo, el Tribunal Europeo de Derechos Humanos, que no es de la UE.",
      "It makes sure EU law is interpreted the same way everywhere. The Hague hosts the UN’s International Court of Justice, and Strasbourg the European Court of Human Rights, which is not an EU body.",
      "Vetlla perquè el dret europeu s’interpreti igual a tots els països. A la Haia hi ha la Cort Internacional de Justícia (de l’ONU), i a Estrasburg, el Tribunal Europeu de Drets Humans, que no és de la UE.")),

  q('ue-20', 'bachillerato', '✍️',
    T("¿Qué tratado de 1992 creó la Unión Europea y la ciudadanía europea?", "Which 1992 treaty created the European Union and European citizenship?", "Quin tractat del 1992 va crear la Unió Europea i la ciutadania europea?"),
    O(["El Tratado de Maastricht", "El Tratado de Roma", "El Tratado de Lisboa", "El Tratado de Versalles"],
      ["The Maastricht Treaty", "The Treaty of Rome", "The Treaty of Lisbon", "The Treaty of Versailles"],
      ["El Tractat de Maastricht", "El Tractat de Roma", "El Tractat de Lisboa", "El Tractat de Versalles"]),
    T("Maastricht convirtió una comunidad económica en una unión también política, creó la ciudadanía europea y fijó el camino hacia el euro. Lisboa (2007) es la reforma vigente de los tratados.",
      "Maastricht turned an economic community into a political union too, created European citizenship and set out the path to the euro. Lisbon (2007) is the current reform of the treaties.",
      "Maastricht va convertir una comunitat econòmica en una unió també política, va crear la ciutadania europea i va fixar el camí cap a l’euro. Lisboa (2007) és la reforma vigent dels tractats.")),

  q('ue-21', 'bachillerato', '🏭',
    T("¿Con qué se empezó, en 1951, la integración europea?", "What did European integration start with, in 1951?", "Amb què va començar, el 1951, la integració europea?"),
    O(["Con la Comunidad Europea del Carbón y del Acero (CECA)", "Con la creación del euro", "Con el espacio Schengen", "Con el Parlamento Europeo elegido por los ciudadanos"],
      ["With the European Coal and Steel Community (ECSC)", "With the creation of the euro", "With the Schengen Area", "With a directly elected European Parliament"],
      ["Amb la Comunitat Europea del Carbó i de l’Acer (CECA)", "Amb la creació de l’euro", "Amb l’espai Schengen", "Amb el Parlament Europeu elegit pels ciutadans"]),
    T("Poner en común el carbón y el acero, las materias primas de la guerra, era la forma de hacerla «materialmente imposible», según la Declaración Schuman de 1950.",
      "Pooling coal and steel, the raw materials of war, was the way to make war «materially impossible», according to the 1950 Schuman Declaration.",
      "Posar en comú el carbó i l’acer, les matèries primeres de la guerra, era la manera de fer-la «materialment impossible», segons la Declaració Schuman del 1950.")),

  q('ue-22', 'bachillerato', '💰',
    T("¿En qué año empezaron a circular los billetes y monedas de euro?", "In which year did euro notes and coins enter circulation?", "En quin any van començar a circular els bitllets i monedes d’euro?"),
    N('2002', '1999', '1986', '1992'),
    T("El euro nació en 1999 como moneda para transferencias y cuentas, pero el dinero en efectivo llegó el 1 de enero de 2002. En España sustituyó a la peseta.",
      "The euro was born in 1999 as a currency for transfers and accounts, but cash arrived on 1 January 2002. In Spain it replaced the peseta.",
      "L’euro va néixer el 1999 com a moneda per a transferències i comptes, però els diners en efectiu van arribar l’1 de gener de 2002. A Espanya va substituir la pesseta.")),

  q('ue-23', 'bachillerato', '📑',
    T("¿Qué regula el artículo 50 del Tratado de la Unión Europea?", "What does Article 50 of the Treaty on European Union govern?", "Què regula l’article 50 del Tractat de la Unió Europea?"),
    O(["Cómo un Estado miembro puede salir de la Unión", "Cómo se elige al presidente de la Comisión", "Los requisitos para entrar en el euro", "El número de lenguas oficiales"],
      ["How a member state can leave the Union", "How the Commission president is chosen", "The requirements for joining the euro", "The number of official languages"],
      ["Com un estat membre pot sortir de la Unió", "Com s’elegeix el president de la Comissió", "Els requisits per entrar a l’euro", "El nombre de llengües oficials"]),
    T("Lo introdujo el Tratado de Lisboa y el único que lo ha usado es el Reino Unido: lo activó en 2017 y negoció su salida hasta 2020.",
      "It was introduced by the Treaty of Lisbon and the only country to use it is the United Kingdom: it triggered it in 2017 and negotiated its exit until 2020.",
      "El va introduir el Tractat de Lisboa i l’únic que l’ha fet servir és el Regne Unit: el va activar el 2017 i va negociar la sortida fins al 2020.")),

  q('ue-24', 'bachillerato', '🌾',
    T("¿Qué es la PAC?", "What is the CAP?", "Què és la PAC?"),
    O(["La Política Agraria Común: ayudas y normas comunes para la agricultura y la ganadería", "El Parlamento de Asuntos Comerciales", "Un plan para crear una moneda única", "La policía de fronteras europea"],
      ["The Common Agricultural Policy: shared support and rules for farming", "The Parliament for Commercial Affairs", "A plan to create a single currency", "The European border police"],
      ["La Política Agrària Comuna: ajuts i normes comunes per a l’agricultura i la ramaderia", "El Parlament d’Afers Comercials", "Un pla per crear una moneda única", "La policia de fronteres europea"]),
    T("Es una de las políticas más antiguas de la UE y una de las partidas más grandes de su presupuesto. En España tiene un peso muy grande en el mundo rural.",
      "It is one of the EU’s oldest policies and one of the biggest items in its budget. In Spain it matters a great deal in rural areas.",
      "És una de les polítiques més antigues de la UE i una de les partides més grans del seu pressupost. A Espanya té un pes molt gran al món rural.")),
]

// Convención de src/data: el nivel bajo se filtra y el alto usa el banco
// ENTERO (ver memoria «bancos-examen»).
export const PREGUNTAS_ESO = PREGUNTAS.filter(p => p.nivel === 'eso')
export const PREGUNTAS_BACHILLERATO = PREGUNTAS
