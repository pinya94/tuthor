// El periodo de entreguerras (1919-1939) — Historia, 4º ESO + Bachillerato.
// Tratado de Versalles, los felices años veinte, el crac del 29 y la Gran
// Depresión, la Revolución rusa y el estalinismo, el fascismo italiano, el
// nazismo, y el camino hacia la Segunda Guerra Mundial.
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

export const PREGUNTAS = [
  // ── ESO ─────────────────────────────────────────────────────────────────
  q('eg-01', 'eso', '📜',
    T("¿Qué tratado puso fin a la Primera Guerra Mundial para Alemania en 1919?", "Which treaty ended the First World War for Germany in 1919?", "Quin tractat va posar fi a la Primera Guerra Mundial per a Alemanya el 1919?"),
    O(["El Tratado de Versalles", "El Tratado de Tordesillas", "La Paz de Westfalia", "El Tratado de Roma"],
      ["The Treaty of Versailles", "The Treaty of Tordesillas", "The Peace of Westphalia", "The Treaty of Rome"],
      ["El Tractat de Versalles", "El Tractat de Tordesillas", "La Pau de Westfàlia", "El Tractat de Roma"]),
    T("Alemania tuvo que aceptar la culpa de la guerra, perder territorios y colonias, reducir su ejército y pagar enormes reparaciones. Muchos alemanes lo vivieron como una humillación.",
      "Germany had to accept blame for the war, lose territory and colonies, shrink its army and pay huge reparations. Many Germans felt it as a humiliation.",
      "Alemanya va haver d'acceptar la culpa de la guerra, perdre territoris i colònies, reduir l'exèrcit i pagar reparacions enormes. Molts alemanys ho van viure com una humiliació.")),

  q('eg-02', 'eso', '🕊️',
    T("¿Qué organismo internacional se creó en 1919 para mantener la paz?", "Which international body was created in 1919 to keep the peace?", "Quin organisme internacional es va crear el 1919 per mantenir la pau?"),
    O(["La Sociedad de Naciones", "La ONU", "La OTAN", "La Unión Europea"],
      ["The League of Nations", "The United Nations", "NATO", "The European Union"],
      ["La Societat de Nacions", "L'ONU", "L'OTAN", "La Unió Europea"]),
    T("La Sociedad de Naciones nació con los tratados de paz, pero fue débil: Estados Unidos no entró y no tenía ejército para imponer sus decisiones. La ONU la sustituyó en 1945.",
      "The League of Nations was born with the peace treaties but was weak: the United States never joined and it had no army to enforce its decisions. The UN replaced it in 1945.",
      "La Societat de Nacions va néixer amb els tractats de pau, però va ser feble: els Estats Units no hi van entrar i no tenia exèrcit per imposar les seves decisions. L'ONU la va substituir el 1945.")),

  q('eg-03', 'eso', '🎷',
    T("¿Cómo se conocen los años veinte en Estados Unidos por su prosperidad?", "What are the 1920s in the United States known as, because of their prosperity?", "Com es coneixen els anys vint als Estats Units per la seva prosperitat?"),
    O(["Los felices años veinte", "La Gran Depresión", "La Guerra Fría", "La Belle Époque"],
      ["The Roaring Twenties", "The Great Depression", "The Cold War", "The Belle Époque"],
      ["Els feliços anys vint", "La Gran Depressió", "La Guerra Freda", "La Belle Époque"]),
    T("Hubo crecimiento industrial, consumo en masa (coches, electrodomésticos), el jazz y la radio. Pero parte de esa riqueza se apoyaba en créditos y especulación en bolsa.",
      "There was industrial growth, mass consumption (cars, household appliances), jazz and radio. But part of that wealth rested on credit and stock-market speculation.",
      "Hi va haver creixement industrial, consum de masses (cotxes, electrodomèstics), el jazz i la ràdio. Però part d'aquesta riquesa es recolzava en crèdits i especulació a la borsa.")),

  q('eg-04', 'eso', '📉',
    T("¿Qué fue el crac del 29?", "What was the Wall Street Crash of 1929?", "Què va ser el crac del 29?"),
    O(["El hundimiento de la Bolsa de Nueva York en octubre de 1929", "Una guerra entre Francia y Alemania", "La caída del Imperio ruso", "Un terremoto en California"],
      ["The collapse of the New York Stock Exchange in October 1929", "A war between France and Germany", "The fall of the Russian Empire", "An earthquake in California"],
      ["L'enfonsament de la Borsa de Nova York l'octubre de 1929", "Una guerra entre França i Alemanya", "La caiguda de l'Imperi rus", "Un terratrèmol a Califòrnia"]),
    T("Las acciones se habían comprado a precios inflados, muchas con dinero prestado. Cuando empezaron a venderse en masa, los precios se desplomaron y arruinaron a inversores y bancos.",
      "Shares had been bought at inflated prices, many with borrowed money. When mass selling began, prices plunged, ruining investors and banks.",
      "Les accions s'havien comprat a preus inflats, moltes amb diners prestats. Quan es van començar a vendre en massa, els preus es van enfonsar i van arruïnar inversors i bancs.")),

  q('eg-05', 'eso', '🏚️',
    T("¿Cuál fue una consecuencia de la Gran Depresión?", "Which was a consequence of the Great Depression?", "Quina va ser una conseqüència de la Gran Depressió?"),
    O(["Un paro masivo: millones de personas perdieron su trabajo", "Una subida general de los sueldos", "El fin de todas las fábricas del mundo", "La desaparición de los bancos para siempre"],
      ["Mass unemployment: millions of people lost their jobs", "A general rise in wages", "The end of every factory in the world", "Banks disappearing for ever"],
      ["Un atur massiu: milions de persones van perdre la feina", "Una pujada general dels sous", "La fi de totes les fàbriques del món", "La desaparició dels bancs per sempre"]),
    T("Cerraron bancos y empresas y el comercio mundial se hundió. En Estados Unidos llegó a haber un 25 % de paro, y la crisis se extendió a Europa, sobre todo a Alemania.",
      "Banks and businesses closed and world trade collapsed. In the United States unemployment reached 25%, and the crisis spread to Europe, especially Germany.",
      "Van tancar bancs i empreses i el comerç mundial es va enfonsar. Als Estats Units l'atur va arribar al 25 %, i la crisi es va estendre a Europa, sobretot a Alemanya.")),

  q('eg-06', 'eso', '🏛️',
    T("¿Qué presidente de Estados Unidos aplicó el New Deal para salir de la crisis?", "Which US president introduced the New Deal to get out of the crisis?", "Quin president dels Estats Units va aplicar el New Deal per sortir de la crisi?"),
    O(["Franklin D. Roosevelt", "Abraham Lincoln", "John F. Kennedy", "George Washington"],
      ["Franklin D. Roosevelt", "Abraham Lincoln", "John F. Kennedy", "George Washington"],
      ["Franklin D. Roosevelt", "Abraham Lincoln", "John F. Kennedy", "George Washington"]),
    T("El New Deal (desde 1933) hizo que el Estado interviniera en la economía: obras públicas para crear empleo, control de los bancos y las primeras ayudas sociales, como las pensiones.",
      "The New Deal (from 1933) had the state step into the economy: public works to create jobs, control of banks and the first social benefits, such as pensions.",
      "El New Deal (des del 1933) va fer que l'Estat intervingués en l'economia: obres públiques per crear ocupació, control dels bancs i els primers ajuts socials, com les pensions.")),

  q('eg-07', 'eso', '🔴',
    T("¿Qué revolución de 1917 llevó a los bolcheviques al poder?", "Which 1917 revolution brought the Bolsheviks to power?", "Quina revolució del 1917 va portar els bolxevics al poder?"),
    O(["La Revolución rusa", "La Revolución francesa", "La Revolución industrial", "La Revolución mexicana"],
      ["The Russian Revolution", "The French Revolution", "The Industrial Revolution", "The Mexican Revolution"],
      ["La Revolució russa", "La Revolució francesa", "La Revolució industrial", "La Revolució mexicana"]),
    T("En 1917 cayó el zar y, en octubre, los bolcheviques de Lenin tomaron el poder. Tras una guerra civil fundaron en 1922 la URSS, el primer Estado comunista.",
      "In 1917 the tsar fell and, in October, Lenin's Bolsheviks seized power. After a civil war they founded the USSR in 1922, the first communist state.",
      "El 1917 va caure el tsar i, a l'octubre, els bolxevics de Lenin van prendre el poder. Després d'una guerra civil van fundar el 1922 la URSS, el primer Estat comunista.")),

  q('eg-08', 'eso', '🎖️',
    T("¿Quién fundó el fascismo y gobernó Italia desde 1922?", "Who founded fascism and ruled Italy from 1922?", "Qui va fundar el feixisme i va governar Itàlia des del 1922?"),
    O(["Benito Mussolini", "Adolf Hitler", "Iósif Stalin", "Francisco Franco"],
      ["Benito Mussolini", "Adolf Hitler", "Joseph Stalin", "Francisco Franco"],
      ["Benito Mussolini", "Adolf Hitler", "Ióssif Stalin", "Francisco Franco"]),
    T("Tras la marcha sobre Roma de 1922, el rey nombró a Mussolini jefe de Gobierno. Poco a poco suprimió partidos, sindicatos y libertades e instauró una dictadura.",
      "After the March on Rome in 1922, the king made Mussolini head of government. Step by step he abolished parties, trade unions and freedoms and set up a dictatorship.",
      "Després de la marxa sobre Roma del 1922, el rei va nomenar Mussolini cap de Govern. A poc a poc va suprimir partits, sindicats i llibertats i va instaurar una dictadura.")),

  q('eg-09', 'eso', '🗳️',
    T("¿Cómo llegó Hitler a canciller de Alemania en 1933?", "How did Hitler become Chancellor of Germany in 1933?", "Com va arribar Hitler a canceller d'Alemanya el 1933?"),
    O(["Por vía legal: su partido fue el más votado y el presidente lo nombró canciller", "Con un golpe militar victorioso", "Heredando el trono", "Tras ganar una guerra"],
      ["Legally: his party won the most votes and the president appointed him chancellor", "Through a successful military coup", "By inheriting the throne", "After winning a war"],
      ["Per via legal: el seu partit va ser el més votat i el president el va nomenar canceller", "Amb un cop militar victoriós", "Heretant el tron", "Després de guanyar una guerra"]),
    T("Con la crisis y el paro, el partido nazi pasó a ser el más votado. Hindenburg nombró canciller a Hitler en enero de 1933 y en pocos meses eliminó la democracia de la República de Weimar.",
      "With the crisis and unemployment, the Nazi party became the most voted. Hindenburg appointed Hitler chancellor in January 1933 and within months he did away with the Weimar Republic's democracy.",
      "Amb la crisi i l'atur, el partit nazi va passar a ser el més votat. Hindenburg va nomenar Hitler canceller el gener del 1933 i en pocs mesos va eliminar la democràcia de la República de Weimar.")),

  q('eg-10', 'eso', '⛓️',
    T("¿Qué rasgo compartían los regímenes totalitarios de entreguerras?", "Which feature did the totalitarian regimes between the wars share?", "Quin tret compartien els règims totalitaris d'entreguerres?"),
    O(["Un partido único y un líder que controlaban toda la vida del país y reprimían a la oposición", "Elecciones libres cada cuatro años", "Libertad total de prensa", "Varios partidos que gobernaban juntos"],
      ["A single party and a leader controlling the whole life of the country and crushing opposition", "Free elections every four years", "Complete press freedom", "Several parties governing together"],
      ["Un partit únic i un líder que controlaven tota la vida del país i reprimien l'oposició", "Eleccions lliures cada quatre anys", "Llibertat total de premsa", "Diversos partits que governaven junts"]),
    T("Fascismo, nazismo y estalinismo tenían ideologías distintas, pero los tres eran totalitarios: partido único, culto al líder, propaganda, policía política y control de la educación y la prensa.",
      "Fascism, Nazism and Stalinism had different ideologies, but all three were totalitarian: one party, a cult of the leader, propaganda, political police and control of education and the press.",
      "Feixisme, nazisme i estalinisme tenien ideologies diferents, però tots tres eren totalitaris: partit únic, culte al líder, propaganda, policia política i control de l'educació i la premsa.")),

  q('eg-11', 'eso', '✡️',
    T("¿Qué eran las Leyes de Núremberg de 1935?", "What were the 1935 Nuremberg Laws?", "Què eren les Lleis de Nuremberg del 1935?"),
    O(["Leyes nazis que quitaron la ciudadanía a los judíos y les prohibieron casarse con no judíos", "Un tratado de paz", "Leyes que daban el voto a la mujer", "Normas del comercio internacional"],
      ["Nazi laws that stripped Jews of citizenship and banned them from marrying non-Jews", "A peace treaty", "Laws giving women the vote", "Rules for international trade"],
      ["Lleis nazis que van treure la ciutadania als jueus i els van prohibir casar-se amb no jueus", "Un tractat de pau", "Lleis que donaven el vot a la dona", "Normes del comerç internacional"]),
    T("El antisemitismo era central en el nazismo. Estas leyes convirtieron la persecución en norma legal y fueron un paso hacia el Holocausto, el exterminio de seis millones de judíos.",
      "Antisemitism was central to Nazism. These laws turned persecution into law and were a step towards the Holocaust, the murder of six million Jews.",
      "L'antisemitisme era central en el nazisme. Aquestes lleis van convertir la persecució en norma legal i van ser un pas cap a l'Holocaust, l'extermini de sis milions de jueus.")),

  q('eg-12', 'eso', '🌾',
    T("¿Qué política aplicó Stalin en el campo soviético?", "What policy did Stalin impose on the Soviet countryside?", "Quina política va aplicar Stalin al camp soviètic?"),
    O(["La colectivización forzosa: las tierras pasaron a granjas colectivas del Estado", "El reparto de tierras a cada campesino como propiedad privada", "La prohibición de cultivar trigo", "La venta del campo a empresas extranjeras"],
      ["Forced collectivisation: land was taken into state collective farms", "Giving each peasant land as private property", "Banning wheat growing", "Selling farmland to foreign companies"],
      ["La col·lectivització forçosa: les terres van passar a granges col·lectives de l'Estat", "El repartiment de terres a cada pagès com a propietat privada", "La prohibició de conrear blat", "La venda del camp a empreses estrangeres"]),
    T("Desde 1929 los campesinos fueron obligados a entrar en granjas colectivas (koljoses). Quien se resistía era deportado. Junto con requisas de grano, provocó hambrunas como la de Ucrania (Holodomor).",
      "From 1929 peasants were forced into collective farms (kolkhozes). Those who resisted were deported. Together with grain seizures it caused famines such as Ukraine's (the Holodomor).",
      "Des del 1929 els pagesos van ser obligats a entrar a granges col·lectives (kolkhozos). Qui s'hi resistia era deportat. Juntament amb requises de gra, va provocar fams com la d'Ucraïna (Holodomor).")),

  q('eg-13', 'eso', '💣',
    T("¿Qué hecho de 1939 desencadenó la Segunda Guerra Mundial?", "Which event in 1939 set off the Second World War?", "Quin fet del 1939 va desencadenar la Segona Guerra Mundial?"),
    O(["La invasión alemana de Polonia", "El crac de la bolsa", "La Revolución rusa", "La creación de la Sociedad de Naciones"],
      ["The German invasion of Poland", "The stock market crash", "The Russian Revolution", "The founding of the League of Nations"],
      ["La invasió alemanya de Polònia", "El crac de la borsa", "La Revolució russa", "La creació de la Societat de Nacions"]),
    T("El 1 de septiembre de 1939 Alemania invadió Polonia y Francia y Reino Unido le declararon la guerra dos días después.",
      "On 1 September 1939 Germany invaded Poland, and France and Britain declared war on it two days later.",
      "L'1 de setembre de 1939 Alemanya va envair Polònia i França i el Regne Unit li van declarar la guerra dos dies després.")),

  q('eg-14', 'eso', '💸',
    T("¿Qué le pasó a la moneda alemana en 1923?", "What happened to the German currency in 1923?", "Què li va passar a la moneda alemanya el 1923?"),
    O(["Sufrió una hiperinflación: los precios subían tanto que el dinero casi no valía nada", "Se convirtió en la más fuerte del mundo", "Fue sustituida por el euro", "Dejó de usarse el papel moneda"],
      ["It suffered hyperinflation: prices rose so fast that money was almost worthless", "It became the strongest in the world", "It was replaced by the euro", "Paper money stopped being used"],
      ["Va patir una hiperinflació: els preus pujaven tant que els diners gairebé no valien res", "Es va convertir en la més forta del món", "Va ser substituïda per l'euro", "Es va deixar de fer servir el paper moneda"]),
    T("Para pagar deudas y reparaciones se imprimió dinero sin control. En noviembre de 1923 un dólar valía billones de marcos: los ahorros de la clase media desaparecieron.",
      "Money was printed without restraint to pay debts and reparations. In November 1923 one dollar was worth trillions of marks: middle-class savings vanished.",
      "Per pagar deutes i reparacions es va imprimir diner sense control. El novembre del 1923 un dòlar valia bilions de marcs: els estalvis de la classe mitjana van desaparèixer.")),

  // ── Bachillerato ────────────────────────────────────────────────────────
  q('eg-15', 'bachillerato', '🤝',
    T("¿Qué fue la política de apaciguamiento de Reino Unido y Francia?", "What was the British and French policy of appeasement?", "Què va ser la política d'apaivagament del Regne Unit i França?"),
    O(["Ceder ante las exigencias de Hitler para evitar una guerra, como en el Pacto de Múnich de 1938", "Declarar la guerra a Alemania en 1933", "Aliarse con la URSS contra Italia", "Invadir Alemania para quitarle las colonias"],
      ["Giving in to Hitler's demands to avoid war, as in the 1938 Munich Agreement", "Declaring war on Germany in 1933", "Allying with the USSR against Italy", "Invading Germany to take its colonies"],
      ["Cedir davant les exigències de Hitler per evitar una guerra, com al Pacte de Munic del 1938", "Declarar la guerra a Alemanya el 1933", "Aliar-se amb la URSS contra Itàlia", "Envair Alemanya per treure-li les colònies"]),
    T("En Múnich (1938) se permitió a Alemania quedarse con los Sudetes checoslovacos a cambio de promesas de paz. Hitler ocupó el resto de Checoslovaquia meses después: el apaciguamiento fracasó.",
      "At Munich (1938) Germany was allowed to take the Czechoslovak Sudetenland in exchange for promises of peace. Hitler occupied the rest of Czechoslovakia months later: appeasement had failed.",
      "A Munic (1938) es va permetre a Alemanya quedar-se els Sudets txecoslovacs a canvi de promeses de pau. Hitler va ocupar la resta de Txecoslovàquia mesos després: l'apaivagament va fracassar.")),

  q('eg-16', 'bachillerato', '✍️',
    T("¿Qué acordaron Alemania y la URSS en el pacto Ribbentrop-Mólotov de agosto de 1939?", "What did Germany and the USSR agree in the Molotov-Ribbentrop Pact of August 1939?", "Què van acordar Alemanya i la URSS al pacte Ribbentrop-Mólotov d'agost del 1939?"),
    O(["No atacarse y, en secreto, repartirse Polonia y el este de Europa", "Una alianza para atacar juntos a Estados Unidos", "Crear la Sociedad de Naciones", "Devolver a Alemania sus colonias africanas"],
      ["Not to attack each other and, secretly, to divide Poland and Eastern Europe", "An alliance to attack the United States together", "To create the League of Nations", "To return Germany's African colonies"],
      ["No atacar-se i, en secret, repartir-se Polònia i l'est d'Europa", "Una aliança per atacar junts els Estats Units", "Crear la Societat de Nacions", "Retornar a Alemanya les colònies africanes"]),
    T("El pacto de no agresión sorprendió porque nazis y comunistas eran enemigos ideológicos. Con él Hitler se aseguró de no luchar en dos frentes al invadir Polonia una semana después.",
      "The non-aggression pact was surprising because Nazis and communists were ideological enemies. With it Hitler made sure he would not fight on two fronts when he invaded Poland a week later.",
      "El pacte de no-agressió va sorprendre perquè nazis i comunistes eren enemics ideològics. Amb ell Hitler es va assegurar de no lluitar en dos fronts en envair Polònia una setmana després.")),

  q('eg-17', 'bachillerato', '🏭',
    T("¿Qué eran los planes quinquenales de Stalin?", "What were Stalin's Five-Year Plans?", "Què eren els plans quinquennals de Stalin?"),
    O(["Planes del Estado que fijaban la producción para industrializar la URSS a gran velocidad", "Planes para organizar elecciones cada cinco años", "Acuerdos comerciales con Estados Unidos", "Reformas para privatizar las empresas"],
      ["State plans that set production targets to industrialise the USSR at great speed", "Plans to hold elections every five years", "Trade agreements with the United States", "Reforms to privatise companies"],
      ["Plans de l'Estat que fixaven la producció per industrialitzar la URSS a gran velocitat", "Plans per organitzar eleccions cada cinc anys", "Acords comercials amb els Estats Units", "Reformes per privatitzar les empreses"]),
    T("Desde 1928 la economía soviética se planificó de forma centralizada, dando prioridad a la industria pesada. La URSS se industrializó muy deprisa, a costa de un enorme sacrificio de la población.",
      "From 1928 the Soviet economy was centrally planned, prioritising heavy industry. The USSR industrialised very fast, at the cost of enormous sacrifice by the population.",
      "Des del 1928 l'economia soviètica es va planificar de manera centralitzada, amb prioritat per a la indústria pesant. La URSS es va industrialitzar molt de pressa, a costa d'un sacrifici enorme de la població.")),

  q('eg-18', 'bachillerato', '🔥',
    T("¿Qué fue el incendio del Reichstag de 1933 para Hitler?", "What did the 1933 Reichstag fire mean for Hitler?", "Què va ser l'incendi del Reichstag del 1933 per a Hitler?"),
    O(["La excusa para suspender las libertades y perseguir a los comunistas", "El final de su carrera política", "El inicio de la Primera Guerra Mundial", "Una derrota electoral"],
      ["The pretext to suspend civil liberties and persecute communists", "The end of his political career", "The start of the First World War", "An election defeat"],
      ["L'excusa per suspendre les llibertats i perseguir els comunistes", "El final de la seva carrera política", "L'inici de la Primera Guerra Mundial", "Una derrota electoral"]),
    T("Tras el incendio del Parlamento, un decreto suspendió derechos básicos. Semanas después la Ley Habilitante dio a Hitler poder para legislar sin el Parlamento: la base legal de la dictadura.",
      "After the parliament fire, a decree suspended basic rights. Weeks later the Enabling Act gave Hitler power to make laws without parliament: the legal basis of the dictatorship.",
      "Després de l'incendi del Parlament, un decret va suspendre drets bàsics. Setmanes després la Llei d'Habilitació va donar a Hitler poder per legislar sense el Parlament: la base legal de la dictadura.")),

  q('eg-19', 'bachillerato', '🧭',
    T("¿Qué explicaba la teoría de Keynes sobre las crisis económicas?", "What did Keynes's theory say about economic crises?", "Què explicava la teoria de Keynes sobre les crisis econòmiques?"),
    O(["Que el Estado debe aumentar el gasto público para reactivar la demanda cuando cae", "Que el Estado no debe intervenir nunca", "Que las crisis se resuelven subiendo impuestos a los pobres", "Que hay que volver al trueque"],
      ["That the state should increase public spending to revive demand when it falls", "That the state should never intervene", "That crises are solved by raising taxes on the poor", "That we should go back to barter"],
      ["Que l'Estat ha d'augmentar la despesa pública per reactivar la demanda quan cau", "Que l'Estat no ha d'intervenir mai", "Que les crisis es resolen apujant impostos als pobres", "Que cal tornar al bescanvi"]),
    T("Frente al liberalismo clásico, Keynes defendió que en una depresión el Estado debe gastar e invertir para crear empleo y consumo. Sus ideas inspiraron las políticas económicas posteriores a 1945.",
      "Against classical liberalism, Keynes argued that in a depression the state must spend and invest to create jobs and consumption. His ideas shaped economic policy after 1945.",
      "Davant del liberalisme clàssic, Keynes va defensar que en una depressió l'Estat ha de gastar i invertir per crear ocupació i consum. Les seves idees van inspirar les polítiques econòmiques posteriors al 1945.")),

  q('eg-20', 'bachillerato', '🗺️',
    T("¿Qué fue el Anschluss de 1938?", "What was the Anschluss of 1938?", "Què va ser l'Anschluss del 1938?"),
    O(["La anexión de Austria por la Alemania nazi", "La invasión italiana de Etiopía", "La salida de Alemania de la Sociedad de Naciones", "Un tratado de paz entre Alemania y Francia"],
      ["The annexation of Austria by Nazi Germany", "The Italian invasion of Ethiopia", "Germany leaving the League of Nations", "A peace treaty between Germany and France"],
      ["L'annexió d'Àustria per l'Alemanya nazi", "La invasió italiana d'Etiòpia", "La sortida d'Alemanya de la Societat de Nacions", "Un tractat de pau entre Alemanya i França"]),
    T("Versalles prohibía unir Alemania y Austria, pero en 1938 el ejército alemán entró en Austria sin resistencia. Las potencias democráticas no reaccionaron, y Hitler siguió con los Sudetes.",
      "Versailles forbade uniting Germany and Austria, but in 1938 the German army entered Austria unopposed. The democratic powers did not react, and Hitler moved on to the Sudetenland.",
      "Versalles prohibia unir Alemanya i Àustria, però el 1938 l'exèrcit alemany va entrar a Àustria sense resistència. Les potències democràtiques no van reaccionar, i Hitler va continuar amb els Sudets.")),

  q('eg-21', 'bachillerato', '🎭',
    T("¿Qué papel tuvo la propaganda en los regímenes totalitarios?", "What role did propaganda play in the totalitarian regimes?", "Quin paper va tenir la propaganda en els règims totalitaris?"),
    O(["Controlar la opinión, exaltar al líder y señalar enemigos, con radio, cine, prensa y grandes desfiles", "Informar con libertad de las opiniones contrarias", "Vender productos de consumo", "Organizar elecciones libres"],
      ["Controlling opinion, glorifying the leader and pointing out enemies, through radio, film, press and huge parades", "Freely reporting opposing views", "Selling consumer goods", "Organising free elections"],
      ["Controlar l'opinió, exaltar el líder i assenyalar enemics, amb ràdio, cinema, premsa i grans desfilades", "Informar amb llibertat de les opinions contràries", "Vendre productes de consum", "Organitzar eleccions lliures"]),
    T("En Alemania, el ministerio de Goebbels controlaba todos los medios. Con la censura, la propaganda buscaba que la población creyera en el régimen y aceptara la persecución de sus «enemigos».",
      "In Germany, Goebbels's ministry controlled all media. Together with censorship, propaganda aimed to make people believe in the regime and accept the persecution of its 'enemies'.",
      "A Alemanya, el ministeri de Goebbels controlava tots els mitjans. Amb la censura, la propaganda buscava que la població cregués en el règim i acceptés la persecució dels seus «enemics».")),

  q('eg-22', 'bachillerato', '🎯',
    T("¿Por qué la crisis de 1929 favoreció el ascenso de los fascismos en Europa?", "Why did the 1929 crisis help fascism rise in Europe?", "Per què la crisi del 1929 va afavorir l'ascens dels feixismes a Europa?"),
    O(["El paro y la miseria hicieron perder confianza en la democracia y dieron votos a quien prometía orden y soluciones rápidas", "Porque los fascistas causaron el crac", "Porque los países se hicieron más ricos", "No tuvo ninguna relación"],
      ["Unemployment and poverty eroded trust in democracy and gave votes to those promising order and quick fixes", "Because the fascists caused the crash", "Because countries got richer", "It had no connection at all"],
      ["L'atur i la misèria van fer perdre confiança en la democràcia i van donar vots a qui prometia ordre i solucions ràpides", "Perquè els feixistes van causar el crac", "Perquè els països es van fer més rics", "No hi va tenir cap relació"]),
    T("En Alemania el partido nazi pasó del 2,6 % de los votos en 1928 al 37 % en 1932. El miedo al comunismo y el rencor por Versalles también empujaron a votantes hacia la extrema derecha.",
      "In Germany the Nazi vote went from 2.6% in 1928 to 37% in 1932. Fear of communism and resentment of Versailles also pushed voters to the far right.",
      "A Alemanya el partit nazi va passar del 2,6 % dels vots el 1928 al 37 % el 1932. La por del comunisme i el ressentiment per Versalles també van empènyer votants cap a l'extrema dreta.")),

  q('eg-23', 'bachillerato', '📰',
    T("¿Por qué se considera la Guerra Civil española (1936-1939) un anticipo de la Segunda Guerra Mundial?", "Why is the Spanish Civil War (1936-1939) seen as a prelude to the Second World War?", "Per què es considera la Guerra Civil espanyola (1936-1939) un avançament de la Segona Guerra Mundial?"),
    O(["Porque Alemania e Italia apoyaron a Franco y la URSS a la República, y probaron armas y tácticas", "Porque España invadió Polonia", "Porque la guerra empezó en Alemania", "Porque Estados Unidos luchó en ella con todo su ejército"],
      ["Because Germany and Italy backed Franco and the USSR backed the Republic, testing weapons and tactics", "Because Spain invaded Poland", "Because the war started in Germany", "Because the United States fought in it with its whole army"],
      ["Perquè Alemanya i Itàlia van donar suport a Franco i la URSS a la República, i van provar armes i tàctiques", "Perquè Espanya va envair Polònia", "Perquè la guerra va començar a Alemanya", "Perquè els Estats Units hi van lluitar amb tot el seu exèrcit"]),
    T("La aviación alemana bombardeó Guernica en 1937. Reino Unido y Francia optaron por la «no intervención», la misma pasividad que mostrarían ante Hitler hasta 1939.",
      "German aircraft bombed Guernica in 1937. Britain and France chose 'non-intervention', the same passivity they would show towards Hitler until 1939.",
      "L'aviació alemanya va bombardejar Guernica el 1937. El Regne Unit i França van optar per la «no intervenció», la mateixa passivitat que mostrarien davant de Hitler fins al 1939.")),

  q('eg-24', 'bachillerato', '⚔️',
    T("¿Qué territorio ocupó Alemania en 1936, desmilitarizado por el Tratado de Versalles?", "Which area, demilitarised by the Treaty of Versailles, did Germany occupy in 1936?", "Quin territori, desmilitaritzat pel Tractat de Versalles, va ocupar Alemanya el 1936?"),
    O(["Renania", "Alsacia", "Baviera", "Prusia Oriental"],
      ["The Rhineland", "Alsace", "Bavaria", "East Prussia"],
      ["Renània", "Alsàcia", "Baviera", "Prússia Oriental"]),
    T("Versalles prohibía tener tropas en Renania, junto a Francia. En 1936 Hitler las envió y nadie se lo impidió, lo que le convenció de que podía seguir rompiendo el tratado.",
      "Versailles banned troops from the Rhineland, next to France. In 1936 Hitler sent them in and no one stopped him, which convinced him he could keep breaking the treaty.",
      "Versalles prohibia tenir tropes a Renània, al costat de França. El 1936 Hitler les hi va enviar i ningú no l'hi va impedir, cosa que el va convèncer que podia continuar trencant el tractat.")),
]

// Convención de src/data: el nivel bajo se filtra y el alto usa el banco
// ENTERO (ver memoria «bancos-examen»).
export const PREGUNTAS_ESO = PREGUNTAS.filter(p => p.nivel === 'eso')
export const PREGUNTAS_BACHILLERATO = PREGUNTAS
