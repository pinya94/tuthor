// Eventos históricos para el modo examen de Tuthor
// Cada evento: { id, nombre, descripcion, año, dificultad, categoria, nivel }
// nivel: qué cursos ven este evento ['primaria'] | ['eso','bachillerato'] | ['bachillerato']

export const EVENTOS_HISTORIA = [

  // ── SEGUNDA GUERRA MUNDIAL ────────────────────────────────────────────────
  { id: 'wwii_01', nombre: "Inicio de la Segunda Guerra Mundial", nombreEn: "Start of World War II", nombreCa: "Inici de la Segona Guerra Mundial", año: 1939, descripcion: "Alemania invade Polonia. Reino Unido y Francia declaran la guerra.", descripcionEn: "Germany invades Poland. The United Kingdom and France declare war.", descripcionCa: "Alemanya envaeix Polònia. El Regne Unit i França declaren la guerra.", dificultad: "fácil", categoria: "wwii", nivel: ['eso','bachillerato'] },
  { id: 'wwii_02', nombre: "Evacuación de Dunkerque", nombreEn: "Evacuation of Dunkirk", nombreCa: "Evacuació de Dunkerque", año: 1940, mes: 5, descripcion: "330.000 soldados aliados evacuados bajo fuego nazi.", descripcionEn: "330,000 Allied soldiers evacuated under Nazi fire.", descripcionCa: "330.000 soldats aliats evacuats sota foc nazi.", dificultad: "medio", categoria: "wwii", nivel: ['eso','bachillerato'] },
  { id: 'wwii_03', nombre: "Batalla de Gran Bretaña", nombreEn: "Battle of Britain", nombreCa: "Batalla de Gran Bretanya", año: 1940, mes: 7, descripcion: "La RAF defiende los cielos británicos de la Luftwaffe.", descripcionEn: "The RAF defends British skies from the Luftwaffe.", descripcionCa: "La RAF defensa els cels britànics de la Luftwaffe.", dificultad: "medio", categoria: "wwii", nivel: ['eso','bachillerato'] },
  { id: 'wwii_04', nombre: "Operación Barbarroja", nombreEn: "Operation Barbarossa", nombreCa: "Operació Barbarroja", año: 1941, mes: 6, descripcion: "Alemania invade la Unión Soviética con 3 millones de soldados.", descripcionEn: "Germany invades the Soviet Union with 3 million soldiers.", descripcionCa: "Alemanya envaeix la Unió Soviètica amb 3 milions de soldats.", dificultad: "medio", categoria: "wwii", nivel: ['eso','bachillerato'] },
  { id: 'wwii_05', nombre: "Ataque a Pearl Harbor", nombreEn: "Attack on Pearl Harbor", nombreCa: "Atac a Pearl Harbor", año: 1941, mes: 12, descripcion: "Japón ataca la base naval americana. EEUU entra en la guerra.", descripcionEn: "Japan attacks the American naval base. The US enters the war.", descripcionCa: "El Japó ataca la base naval americana. Els EUA entren a la guerra.", dificultad: "fácil", categoria: "wwii", nivel: ['eso','bachillerato'] },
  { id: 'wwii_06', nombre: "Batalla de Stalingrado", nombreEn: "Battle of Stalingrad", nombreCa: "Batalla de Stalingrad", año: 1942, descripcion: "El punto de inflexión del frente oriental. Derrota nazi decisiva.", descripcionEn: "The turning point of the Eastern Front. Decisive Nazi defeat.", descripcionCa: "El punt d'inflexió del front oriental. Derrota nazi decisiva.", dificultad: "fácil", categoria: "wwii", nivel: ['eso','bachillerato'] },
  { id: 'wwii_13', nombre: "Batalla de Midway", nombreEn: "Battle of Midway", nombreCa: "Batalla de Midway", año: 1942, mes: 6, descripcion: "La armada japonesa es destruida. Punto de inflexión en el Pacífico.", descripcionEn: "The Japanese fleet is destroyed. Turning point in the Pacific.", descripcionCa: "L'armada japonesa és destruïda. Punt d'inflexió al Pacífic.", dificultad: "difícil", categoria: "wwii", nivel: ['bachillerato'] },
  { id: 'wwii_14', nombre: "Conferencia de Teherán", nombreEn: "Tehran Conference", nombreCa: "Conferència de Teheran", año: 1943, mes: 11, descripcion: "Churchill, Roosevelt y Stalin planifican juntos la derrota definitiva de Hitler.", descripcionEn: "Churchill, Roosevelt and Stalin jointly plan Hitler's final defeat.", descripcionCa: "Churchill, Roosevelt i Stalin planifiquen junts la derrota definitiva de Hitler.", dificultad: "difícil", categoria: "wwii", nivel: ['bachillerato'] },
  { id: 'wwii_07', nombre: "Desembarco de Normandía (Día D)", nombreEn: "Normandy Landings (D-Day)", nombreCa: "Desembarcament de Normandia (Dia D)", año: 1944, mes: 6, descripcion: "La mayor operación anfibia de la historia en las playas francesas.", descripcionEn: "The largest amphibious operation in history on the French beaches.", descripcionCa: "La major operació amfíbia de la història a les platges franceses.", dificultad: "fácil", categoria: "wwii", nivel: ['eso','bachillerato'] },
  { id: 'wwii_08', nombre: "Liberación de París", nombreEn: "Liberation of Paris", nombreCa: "Alliberament de París", año: 1944, mes: 8, descripcion: "Las tropas aliadas y la Resistencia liberan la capital francesa.", descripcionEn: "Allied troops and the Resistance liberate the French capital.", descripcionCa: "Les tropes aliades i la Resistència alliberen la capital francesa.", dificultad: "medio", categoria: "wwii", nivel: ['eso','bachillerato'] },
  { id: 'wwii_09', nombre: "Batalla de las Ardenas", nombreEn: "Battle of the Bulge", nombreCa: "Batalla de les Ardenes", año: 1944, mes: 12, descripcion: "La última gran ofensiva alemana en el frente occidental.", descripcionEn: "The last major German offensive on the Western Front.", descripcionCa: "La darrera gran ofensiva alemanya al front occidental.", dificultad: "difícil", categoria: "wwii", nivel: ['bachillerato'] },
  { id: 'wwii_12', nombre: "Conferencia de Yalta", nombreEn: "Yalta Conference", nombreCa: "Conferència de Ialta", año: 1945, mes: 2, descripcion: "Churchill, Roosevelt y Stalin dividen el mundo de posguerra.", descripcionEn: "Churchill, Roosevelt and Stalin divide the post-war world.", descripcionCa: "Churchill, Roosevelt i Stalin es reparteixen el món de postguerra.", dificultad: "difícil", categoria: "wwii", nivel: ['bachillerato'] },
  { id: 'wwii_10', nombre: "Rendición de Alemania", nombreEn: "Surrender of Germany", nombreCa: "Rendició d'Alemanya", año: 1945, mes: 5, descripcion: "Firma del armisticio. Fin de la guerra en Europa.", descripcionEn: "The armistice is signed. End of the war in Europe.", descripcionCa: "Signatura de l'armistici. Fi de la guerra a Europa.", dificultad: "fácil", categoria: "wwii", nivel: ['eso','bachillerato'] },
  { id: 'wwii_11', nombre: "Bombas atómicas sobre Japón", nombreEn: "Atomic bombs on Japan", nombreCa: "Bombes atòmiques sobre el Japó", año: 1945, mes: 8, descripcion: "Hiroshima y Nagasaki. El fin de la guerra en el Pacífico.", descripcionEn: "Hiroshima and Nagasaki. The end of the war in the Pacific.", descripcionCa: "Hiroshima i Nagasaki. La fi de la guerra al Pacífic.", dificultad: "fácil", categoria: "wwii", nivel: ['eso','bachillerato'] },

  // ── GUERRA CIVIL ESPAÑOLA ─────────────────────────────────────────────────
  { id: 'gce_01', nombre: "Segunda República Española", nombreEn: "Second Spanish Republic", nombreCa: "Segona República Espanyola", año: 1931, descripcion: "Alfonso XIII parte al exilio. España se convierte en República.", descripcionEn: "Alfonso XIII goes into exile. Spain becomes a Republic.", descripcionCa: "Alfons XIII marxa a l'exili. Espanya es converteix en República.", dificultad: "medio", categoria: "gce", nivel: ['eso','bachillerato'] },
  { id: 'gce_02', nombre: "Revolución de Asturias", nombreEn: "Asturias Revolution", nombreCa: "Revolució d'Astúries", año: 1934, descripcion: "Mineros asturianos se levantan. El ejército reprime duramente.", descripcionEn: "Asturian miners rise up. The army cracks down harshly.", descripcionCa: "Els miners asturians s'alcen. L'exèrcit reprimeix durament.", dificultad: "difícil", categoria: "gce", nivel: ['bachillerato'] },
  { id: 'gce_03', nombre: "Victoria del Frente Popular", nombreEn: "Popular Front Victory", nombreCa: "Victòria del Front Popular", año: 1936, mes: 2, descripcion: "La coalición de izquierdas gana las elecciones generales.", descripcionEn: "The left-wing coalition wins the general elections.", descripcionCa: "La coalició d'esquerres guanya les eleccions generals.", dificultad: "medio", categoria: "gce", nivel: ['eso','bachillerato'] },
  { id: 'gce_04', nombre: "Inicio de la Guerra Civil Española", nombreEn: "Start of the Spanish Civil War", nombreCa: "Inici de la Guerra Civil Espanyola", año: 1936, mes: 7, descripcion: "El golpe de estado de Franco inicia tres años de guerra fratricida.", descripcionEn: "Franco's coup d'état begins three years of fratricidal war.", descripcionCa: "El cop d'estat de Franco inicia tres anys de guerra fratricida.", dificultad: "fácil", categoria: "gce", nivel: ['eso','bachillerato'] },
  { id: 'gce_15', nombre: "Pacto de No Intervención", nombreEn: "Non-Intervention Pact", nombreCa: "Pacte de No Intervenció", año: 1936, mes: 8, descripcion: "Las potencias europeas acuerdan no intervenir en España, pero Alemania e Italia lo incumplen.", descripcionEn: "European powers agree not to intervene in Spain, but Germany and Italy break the pact.", descripcionCa: "Les potències europees acorden no intervenir a Espanya, però Alemanya i Itàlia l'incompleixen.", dificultad: "difícil", categoria: "gce", nivel: ['bachillerato'] },
  { id: 'gce_05', nombre: "Bombardeo de Guernica", nombreEn: "Bombing of Guernica", nombreCa: "Bombardeig de Guernica", año: 1937, descripcion: "La Legión Cóndor nazi arrasa la ciudad vasca. Picasso lo inmortaliza.", descripcionEn: "The Nazi Condor Legion devastates the Basque town. Picasso immortalizes it.", descripcionCa: "La Legió Còndor nazi arrasa la ciutat basca. Picasso ho immortalitza.", dificultad: "fácil", categoria: "gce", nivel: ['eso','bachillerato'] },
  { id: 'gce_13', nombre: "Batalla del Jarama", nombreEn: "Battle of Jarama", nombreCa: "Batalla del Jarama", año: 1937, mes: 2, descripcion: "Intento franquista de cortar la carretera Madrid-Valencia. La República resiste.", descripcionEn: "Francoist attempt to cut the Madrid-Valencia road. The Republic holds.", descripcionCa: "Intent franquista de tallar la carretera Madrid-València. La República resisteix.", dificultad: "difícil", categoria: "gce", nivel: ['bachillerato'] },
  { id: 'gce_14', nombre: "Batalla de Guadalajara", nombreEn: "Battle of Guadalajara", nombreCa: "Batalla de Guadalajara", año: 1937, mes: 3, descripcion: "Las tropas italianas del CTV son derrotadas. Gran victoria propagandística republicana.", descripcionEn: "The Italian CTV troops are defeated. A major Republican propaganda victory.", descripcionCa: "Les tropes italianes del CTV són derrotades. Gran victòria propagandística republicana.", dificultad: "difícil", categoria: "gce", nivel: ['bachillerato'] },
  { id: 'gce_11', nombre: "Hechos de Mayo", nombreEn: "May Days", nombreCa: "Fets de Maig", año: 1937, mes: 5, descripcion: "Enfrentamientos entre anarquistas y comunistas en Barcelona. Crisis interna del bando republicano.", descripcionEn: "Clashes between anarchists and communists in Barcelona. Internal crisis in the Republican side.", descripcionCa: "Enfrontaments entre anarquistes i comunistes a Barcelona. Crisi interna del bàndol republicà.", dificultad: "difícil", categoria: "gce", nivel: ['bachillerato'] },
  { id: 'gce_12', nombre: "Campaña del Norte", nombreEn: "Northern Campaign", nombreCa: "Campanya del Nord", año: 1937, mes: 6, descripcion: "Franco conquista el País Vasco, Santander y Asturias. La industria del norte cae en manos rebeldes.", descripcionEn: "Franco conquers the Basque Country, Santander and Asturias. Northern industry falls to the rebels.", descripcionCa: "Franco conquesta el País Basc, Santander i Astúries. La indústria del nord cau en mans rebels.", dificultad: "difícil", categoria: "gce", nivel: ['bachillerato'] },
  { id: 'gce_06', nombre: "Batalla del Ebro", nombreEn: "Battle of the Ebro", nombreCa: "Batalla de l'Ebre", año: 1938, descripcion: "La mayor batalla de la guerra civil. Derrota republicana definitiva.", descripcionEn: "The largest battle of the civil war. Definitive Republican defeat.", descripcionCa: "La batalla més gran de la guerra civil. Derrota republicana definitiva.", dificultad: "medio", categoria: "gce", nivel: ['eso','bachillerato'] },
  { id: 'gce_07', nombre: "Caída de Barcelona", nombreEn: "Fall of Barcelona", nombreCa: "Caiguda de Barcelona", año: 1939, mes: 1, descripcion: "Las tropas franquistas entran en Cataluña. El exilio masivo comienza.", descripcionEn: "Francoist troops enter Catalonia. The mass exile begins.", descripcionCa: "Les tropes franquistes entren a Catalunya. L'exili massiu comença.", dificultad: "fácil", categoria: "gce", nivel: ['eso','bachillerato'] },
  { id: 'gce_08', nombre: "Fin de la Guerra Civil Española", nombreEn: "End of the Spanish Civil War", nombreCa: "Fi de la Guerra Civil Espanyola", año: 1939, mes: 4, descripcion: "Franco proclama el final de la guerra. Comienza la dictadura.", descripcionEn: "Franco declares the war over. The dictatorship begins.", descripcionCa: "Franco proclama la fi de la guerra. Comença la dictadura.", dificultad: "fácil", categoria: "gce", nivel: ['eso','bachillerato'] },
  { id: 'gce_09', nombre: "Muerte de Franco", nombreEn: "Death of Franco", nombreCa: "Mort de Franco", año: 1975, descripcion: "El dictador muere en la cama. Comienza la Transición Democrática.", descripcionEn: "The dictator dies in his bed. The Democratic Transition begins.", descripcionCa: "El dictador mor al llit. Comença la Transició Democràtica.", dificultad: "fácil", categoria: "gce", nivel: ['eso','bachillerato'] },
  { id: 'gce_10', nombre: "Constitución Española", nombreEn: "Spanish Constitution", nombreCa: "Constitució Espanyola", año: 1978, descripcion: "España aprueba su carta magna. La democracia queda consolidada.", descripcionEn: "Spain approves its constitution. Democracy is consolidated.", descripcionCa: "Espanya aprova la seva carta magna. La democràcia queda consolidada.", dificultad: "fácil", categoria: "gce", nivel: ['eso','bachillerato'] },

  // ── ANTIGUA ROMA ──────────────────────────────────────────────────────────
  { id: 'roma_01', nombre: "Fundación de Roma", nombreEn: "Founding of Rome", nombreCa: "Fundació de Roma", año: -753, descripcion: "Según la leyenda, Rómulo funda la ciudad eterna a orillas del Tíber.", descripcionEn: "According to legend, Romulus founds the eternal city on the banks of the Tiber.", descripcionCa: "Segons la llegenda, Ròmul funda la ciutat eterna a les ribes del Tíber.", dificultad: "medio", categoria: "roma", nivel: ['eso','bachillerato'] },
  { id: 'roma_02', nombre: "Nace la República Romana", nombreEn: "Birth of the Roman Republic", nombreCa: "Neix la República Romana", año: -509, descripcion: "Se expulsa al último rey etrusco. Roma pasa a ser república.", descripcionEn: "The last Etruscan king is expelled. Rome becomes a republic.", descripcionCa: "S'expulsa l'últim rei etrusc. Roma passa a ser república.", dificultad: "difícil", categoria: "roma", nivel: ['bachillerato'] },
  { id: 'roma_03', nombre: "Inicio de las Guerras Púnicas", nombreEn: "Start of the Punic Wars", nombreCa: "Inici de les Guerres Púniques", año: -264, descripcion: "Roma y Cartago luchan por el control del Mediterráneo.", descripcionEn: "Rome and Carthage fight for control of the Mediterranean.", descripcionCa: "Roma i Cartago lluiten pel control de la Mediterrània.", dificultad: "difícil", categoria: "roma", nivel: ['bachillerato'] },
  { id: 'roma_04', nombre: "Cruce del Rubicón por César", nombreEn: "Caesar Crosses the Rubicon", nombreCa: "Cèsar creua el Rubicó", año: -49, descripcion: "César desafía al Senado. Comienza la guerra civil romana.", descripcionEn: "Caesar defies the Senate. The Roman civil war begins.", descripcionCa: "Cèsar desafia el Senat. Comença la guerra civil romana.", dificultad: "medio", categoria: "roma", nivel: ['eso','bachillerato'] },
  { id: 'roma_05', nombre: "Asesinato de Julio César", nombreEn: "Assassination of Julius Caesar", nombreCa: "Assassinat de Juli Cèsar", año: -44, descripcion: "Los idus de marzo. 23 puñaladas en el Senado romano.", descripcionEn: "The Ides of March. 23 stab wounds in the Roman Senate.", descripcionCa: "Els idus de març. 23 punyalades al Senat romà.", dificultad: "fácil", categoria: "roma", nivel: ['eso','bachillerato'] },
  { id: 'roma_06', nombre: "Augusto, primer emperador", nombreEn: "Augustus, First Emperor", nombreCa: "August, primer emperador", año: -27, descripcion: "Octavio recibe el título de Augusto. Comienza el Imperio Romano.", descripcionEn: "Octavian receives the title of Augustus. The Roman Empire begins.", descripcionCa: "Octavi rep el títol d'August. Comença l'Imperi Romà.", dificultad: "medio", categoria: "roma", nivel: ['eso','bachillerato'] },
  { id: 'roma_07', nombre: "Erupción del Vesubio", nombreEn: "Eruption of Vesuvius", nombreCa: "Erupció del Vesuvi", año: 79, descripcion: "Pompeya y Herculano quedan sepultadas bajo las cenizas volcánicas.", descripcionEn: "Pompeii and Herculaneum are buried under volcanic ash.", descripcionCa: "Pompeia i Herculà queden sepultades sota les cendres volcàniques.", dificultad: "fácil", categoria: "roma", nivel: ['eso','bachillerato'] },
  { id: 'roma_08', nombre: "Edicto de Milán", nombreEn: "Edict of Milan", nombreCa: "Edicte de Milà", año: 313, descripcion: "Constantino legaliza el cristianismo en el Imperio Romano.", descripcionEn: "Constantine legalizes Christianity in the Roman Empire.", descripcionCa: "Constantí legalitza el cristianisme a l'Imperi Romà.", dificultad: "difícil", categoria: "roma", nivel: ['bachillerato'] },
  { id: 'roma_09', nombre: "División del Imperio Romano", nombreEn: "Division of the Roman Empire", nombreCa: "Divisió de l'Imperi Romà", año: 395, descripcion: "Teodosio divide el Imperio entre sus dos hijos.", descripcionEn: "Theodosius divides the Empire between his two sons.", descripcionCa: "Teodosi divideix l'Imperi entre els seus dos fills.", dificultad: "difícil", categoria: "roma", nivel: ['bachillerato'] },
  { id: 'roma_10', nombre: "Caída del Imperio Romano de Occidente", nombreEn: "Fall of the Western Roman Empire", nombreCa: "Caiguda de l'Imperi Romà d'Occident", año: 476, descripcion: "Rómulo Augústulo es depuesto. Fin del mundo antiguo.", descripcionEn: "Romulus Augustulus is deposed. End of the ancient world.", descripcionCa: "Ròmul Augústul és deposat. Fi del món antic.", dificultad: "medio", categoria: "roma", nivel: ['eso','bachillerato'] },

  // ── PRIMARIA: HITOS HISTÓRICOS BÁSICOS ───────────────────────────────────
  { id: 'pri_01', nombre: "Descubrimiento de América", nombreEn: "Discovery of America", nombreCa: "Descobriment d'Amèrica", año: 1492, descripcion: "Cristóbal Colón llega a las Bahamas creyendo que era Asia.", descripcionEn: "Christopher Columbus reaches the Bahamas believing it was Asia.", descripcionCa: "Cristòfor Colom arriba a les Bahames creient que era Àsia.", dificultad: "fácil", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_02', nombre: "Caída del Imperio Romano de Occidente", nombreEn: "Fall of the Western Roman Empire", nombreCa: "Caiguda de l'Imperi Romà d'Occident", año: 476, descripcion: "Los bárbaros acaban con el gran Imperio Romano.", descripcionEn: "The barbarians bring down the great Roman Empire.", descripcionCa: "Els bàrbars acaben amb el gran Imperi Romà.", dificultad: "fácil", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_03', nombre: "Revolución Francesa", nombreEn: "French Revolution", nombreCa: "Revolució Francesa", año: 1789, descripcion: "El pueblo de Francia se rebela contra el rey. Nace la democracia.", descripcionEn: "The people of France rebel against the king. Democracy is born.", descripcionCa: "El poble de França es rebel·la contra el rei. Neix la democràcia.", dificultad: "fácil", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_04', nombre: "Llegada del hombre a la Luna", nombreEn: "Moon Landing", nombreCa: "Arribada de l'home a la Lluna", año: 1969, descripcion: "Neil Armstrong da el primer paso humano en la Luna.", descripcionEn: "Neil Armstrong takes the first human step on the Moon.", descripcionCa: "Neil Armstrong fa el primer pas humà a la Lluna.", dificultad: "fácil", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_05', nombre: "Primer vuelo de los hermanos Wright", nombreEn: "First Flight by the Wright Brothers", nombreCa: "Primer vol dels germans Wright", año: 1903, descripcion: "El primer avión de la historia vuela durante 12 segundos.", descripcionEn: "The first airplane in history flies for 12 seconds.", descripcionCa: "El primer avió de la història vola durant 12 segons.", dificultad: "fácil", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_06', nombre: "Invención de la imprenta", nombreEn: "Invention of the Printing Press", nombreCa: "Invenció de la impremta", año: 1440, descripcion: "Gutenberg inventa la imprenta. Los libros llegan a todo el mundo.", descripcionEn: "Gutenberg invents the printing press. Books reach the whole world.", descripcionCa: "Gutenberg inventa la impremta. Els llibres arriben a tot el món.", dificultad: "fácil", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_07', nombre: "Caída del Muro de Berlín", nombreEn: "Fall of the Berlin Wall", nombreCa: "Caiguda del Mur de Berlín", año: 1989, descripcion: "El muro que separaba una ciudad entera se derrumba.", descripcionEn: "The wall that divided an entire city comes down.", descripcionCa: "El mur que separava tota una ciutat s'ensorra.", dificultad: "fácil", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_08', nombre: "Inicio de la Segunda Guerra Mundial", nombreEn: "Start of World War II", nombreCa: "Inici de la Segona Guerra Mundial", año: 1939, descripcion: "El conflicto más grande de la historia comienza en Europa.", descripcionEn: "The largest conflict in history begins in Europe.", descripcionCa: "El conflicte més gran de la història comença a Europa.", dificultad: "fácil", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_09', nombre: "Fundación de Roma", nombreEn: "Founding of Rome", nombreCa: "Fundació de Roma", año: -753, descripcion: "Según la leyenda, Rómulo funda la ciudad más poderosa del mundo.", descripcionEn: "According to legend, Romulus founds the most powerful city in the world.", descripcionCa: "Segons la llegenda, Ròmul funda la ciutat més poderosa del món.", dificultad: "fácil", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_10', nombre: "Primer Juego Olímpico moderno", nombreEn: "First Modern Olympic Games", nombreCa: "Primers Jocs Olímpics moderns", año: 1896, descripcion: "Atenas acoge los primeros Juegos Olímpicos de la era moderna.", descripcionEn: "Athens hosts the first Olympic Games of the modern era.", descripcionCa: "Atenes acull els primers Jocs Olímpics de l'era moderna.", dificultad: "fácil", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_11', nombre: "Hundimiento del Titanic", nombreEn: "Sinking of the Titanic", nombreCa: "Enfonsament del Titanic", año: 1912, descripcion: "El barco más grande del mundo se hunde en su primer viaje.", descripcionEn: "The largest ship in the world sinks on its maiden voyage.", descripcionCa: "El vaixell més gran del món s'enfonsa en el seu primer viatge.", dificultad: "fácil", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_12', nombre: "España gana el Mundial de fútbol", nombreEn: "Spain Wins the FIFA World Cup", nombreCa: "Espanya guanya el Mundial de futbol", año: 2010, descripcion: "La selección española gana su primer campeonato del mundo.", descripcionEn: "The Spanish national team wins its first world championship.", descripcionCa: "La selecció espanyola guanya el seu primer campionat del món.", dificultad: "fácil", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_13', nombre: "Fin de la Edad Media", nombreEn: "End of the Middle Ages", nombreCa: "Fi de l'Edat Mitjana", año: 1453, descripcion: "La caída de Constantinopla marca el fin de la Edad Media.", descripcionEn: "The fall of Constantinople marks the end of the Middle Ages.", descripcionCa: "La caiguda de Constantinoble marca la fi de l'Edat Mitjana.", dificultad: "medio", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_14', nombre: "Revolución Industrial", nombreEn: "Industrial Revolution", nombreCa: "Revolució Industrial", año: 1760, descripcion: "Las máquinas de vapor cambian el trabajo y la vida de las personas.", descripcionEn: "Steam engines change work and people's lives.", descripcionCa: "Les màquines de vapor canvien el treball i la vida de les persones.", dificultad: "medio", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_15', nombre: "Independencia de los Estados Unidos", nombreEn: "United States Independence", nombreCa: "Independència dels Estats Units", año: 1776, descripcion: "Las colonias americanas se declaran libres de Gran Bretaña.", descripcionEn: "The American colonies declare themselves free from Great Britain.", descripcionCa: "Les colònies americanes es declaren lliures de Gran Bretanya.", dificultad: "medio", categoria: "primaria", nivel: ['primaria'] },

  // ── INDEPENDENCIA AMERICANA ───────────────────────────────────────────────
  { id: 'usa_01', nombre: "Motín del Té de Boston", nombreEn: "Boston Tea Party", nombreCa: "Motí del Te de Boston", año: 1773, descripcion: "Colonos americanos arrojan té al mar protestando contra impuestos.", descripcionEn: "American colonists dump tea into the sea protesting against taxes.", descripcionCa: "Colons americans llencen te al mar protestant contra els impostos.", dificultad: "medio", categoria: "usa", nivel: ['bachillerato'] },
  { id: 'usa_02', nombre: "Primer Congreso Continental", nombreEn: "First Continental Congress", nombreCa: "Primer Congrés Continental", año: 1774, descripcion: "Las colonias se unen por primera vez para coordinar su resistencia.", descripcionEn: "The colonies unite for the first time to coordinate their resistance.", descripcionCa: "Les colònies s'uneixen per primera vegada per coordinar la seva resistència.", dificultad: "difícil", categoria: "usa", nivel: ['bachillerato'] },
  { id: 'usa_03', nombre: "Declaración de Independencia", nombreEn: "Declaration of Independence", nombreCa: "Declaració d'Independència", año: 1776, descripcion: "Las 13 colonias se declaran nación libre e independiente.", descripcionEn: "The 13 colonies declare themselves a free and independent nation.", descripcionCa: "Les 13 colònies es declaren nació lliure i independent.", dificultad: "fácil", categoria: "usa", nivel: ['bachillerato'] },
  { id: 'usa_04', nombre: "Batalla de Saratoga", nombreEn: "Battle of Saratoga", nombreCa: "Batalla de Saratoga", año: 1777, descripcion: "Victoria americana que convence a Francia de entrar en la guerra.", descripcionEn: "American victory that convinces France to enter the war.", descripcionCa: "Victòria americana que convenç França d'entrar a la guerra.", dificultad: "difícil", categoria: "usa", nivel: ['bachillerato'] },
  { id: 'usa_05', nombre: "Batalla de Yorktown", nombreEn: "Battle of Yorktown", nombreCa: "Batalla de Yorktown", año: 1781, descripcion: "La última gran batalla. La rendición británica sella la independencia.", descripcionEn: "The last major battle. The British surrender seals independence.", descripcionCa: "La darrera gran batalla. La rendició britànica segella la independència.", dificultad: "medio", categoria: "usa", nivel: ['bachillerato'] },
  { id: 'usa_06', nombre: "Tratado de París", nombreEn: "Treaty of Paris", nombreCa: "Tractat de París", año: 1783, descripcion: "Gran Bretaña reconoce oficialmente la independencia americana.", descripcionEn: "Great Britain officially recognizes American independence.", descripcionCa: "Gran Bretanya reconeix oficialment la independència americana.", dificultad: "medio", categoria: "usa", nivel: ['bachillerato'] },
  { id: 'usa_07', nombre: "Constitución de los Estados Unidos", nombreEn: "United States Constitution", nombreCa: "Constitució dels Estats Units", año: 1787, descripcion: "Se redacta la constitución más duradera de la historia moderna.", descripcionEn: "The longest-lasting constitution in modern history is drafted.", descripcionCa: "Es redacta la constitució més duradora de la història moderna.", dificultad: "fácil", categoria: "usa", nivel: ['bachillerato'] },
  { id: 'usa_08', nombre: "George Washington, primer presidente", nombreEn: "George Washington, First President", nombreCa: "George Washington, primer president", año: 1789, descripcion: "Washington es elegido primer presidente de los Estados Unidos.", descripcionEn: "Washington is elected first president of the United States.", descripcionCa: "Washington és elegit primer president dels Estats Units.", dificultad: "fácil", categoria: "usa", nivel: ['bachillerato'] },

  // ── EVENTOS GLOBALES (para Línea Temporal) ────────────────────────────────
  { id: 'glob_01', nombre: "Invasión árabe de la Península Ibérica", nombreEn: "Moorish Invasion of the Iberian Peninsula", nombreCa: "Invasió àrab de la Península Ibèrica", año: 711, descripcion: "Los musulmanes cruzan el Estrecho de Gibraltar y conquistan casi toda España.", descripcionEn: "The Moors cross the Strait of Gibraltar and conquer most of Spain.", descripcionCa: "Els musulmans creuen l'Estret de Gibraltar i conquesten gairebé tota Espanya.", dificultad: "medio", categoria: "global" },
  { id: 'glob_02', nombre: "Coronación de Carlomagno", nombreEn: "Coronation of Charlemagne", nombreCa: "Coronació de Carlemany", año: 800, descripcion: "El papa León III corona a Carlomagno como emperador de Occidente en Roma.", descripcionEn: "Pope Leo III crowns Charlemagne as Emperor of the West in Rome.", descripcionCa: "El papa Lleó III corona Carlemany com a emperador d'Occident a Roma.", dificultad: "medio", categoria: "global" },
  { id: 'glob_03', nombre: "Batalla de Hastings", nombreEn: "Battle of Hastings", nombreCa: "Batalla de Hastings", año: 1066, descripcion: "Guillermo el Conquistador derrota al rey Harold. Nace la Inglaterra medieval.", descripcionEn: "William the Conqueror defeats King Harold. Medieval England is born.", descripcionCa: "Guillem el Conqueridor derrota el rei Harold. Neix l'Anglaterra medieval.", dificultad: "medio", categoria: "global" },
  { id: 'glob_04', nombre: "Primera Cruzada", nombreEn: "First Crusade", nombreCa: "Primera Croada", año: 1096, descripcion: "El papa Urbano II convoca a los cristianos a liberar Jerusalén.", descripcionEn: "Pope Urban II calls on Christians to liberate Jerusalem.", descripcionCa: "El papa Urbà II convoca els cristians a alliberar Jerusalem.", dificultad: "difícil", categoria: "global" },
  { id: 'glob_05', nombre: "Magna Carta", nombreEn: "Magna Carta", nombreCa: "Magna Carta", año: 1215, descripcion: "El rey Juan sin Tierra firma la primera carta de derechos de la historia.", descripcionEn: "King John signs the first bill of rights in history.", descripcionCa: "El rei Joan sense Terra signa la primera carta de drets de la història.", dificultad: "medio", categoria: "global" },
  { id: 'glob_06', nombre: "Peste Negra en Europa", nombreEn: "Black Death in Europe", nombreCa: "Pesta Negra a Europa", año: 1347, descripcion: "La pandemia de peste bubónica mata a un tercio de la población europea.", descripcionEn: "The bubonic plague pandemic kills a third of Europe's population.", descripcionCa: "La pandèmia de pesta bubònica mata un terç de la població europea.", dificultad: "fácil", categoria: "global" },
  { id: 'glob_07', nombre: "Caída de Constantinopla", nombreEn: "Fall of Constantinople", nombreCa: "Caiguda de Constantinoble", año: 1453, descripcion: "Los otomanos conquistan la capital del Imperio Bizantino. Fin de la Edad Media.", descripcionEn: "The Ottomans conquer the capital of the Byzantine Empire. End of the Middle Ages.", descripcionCa: "Els otomans conquesten la capital de l'Imperi Bizantí. Fi de l'Edat Mitjana.", dificultad: "fácil", categoria: "global" },
  { id: 'glob_08', nombre: "Reforma Protestante", nombreEn: "Protestant Reformation", nombreCa: "Reforma Protestant", año: 1517, descripcion: "Lutero clava sus 95 tesis. Europa se divide entre católicos y protestantes.", descripcionEn: "Luther posts his 95 theses. Europe splits between Catholics and Protestants.", descripcionCa: "Luter clava les seves 95 tesis. Europa es divideix entre catòlics i protestants.", dificultad: "medio", categoria: "global" },
  { id: 'glob_09', nombre: "Revolución Inglesa (Gloriosa)", nombreEn: "Glorious Revolution", nombreCa: "Revolució Anglesa (Gloriosa)", año: 1688, descripcion: "El parlamento inglés limita el poder del rey. Nace la democracia moderna.", descripcionEn: "The English parliament limits the king's power. Modern democracy is born.", descripcionCa: "El parlament anglès limita el poder del rei. Neix la democràcia moderna.", dificultad: "difícil", categoria: "global" },
  { id: 'glob_10', nombre: "Revolución Americana", nombreEn: "American Revolution", nombreCa: "Revolució Americana", año: 1776, descripcion: "Las colonias americanas se declaran independientes de Gran Bretaña.", descripcionEn: "The American colonies declare independence from Great Britain.", descripcionCa: "Les colònies americanes es declaren independents de Gran Bretanya.", dificultad: "fácil", categoria: "global" },
  { id: 'glob_11', nombre: "Revolución Francesa", nombreEn: "French Revolution", nombreCa: "Revolució Francesa", año: 1789, descripcion: "El pueblo toma la Bastilla. Fin del Antiguo Régimen en Francia.", descripcionEn: "The people storm the Bastille. End of the Ancien Régime in France.", descripcionCa: "El poble pren la Bastilla. Fi de l'Antic Règim a França.", dificultad: "fácil", categoria: "global" },
  { id: 'glob_12', nombre: "Batalla de Waterloo", nombreEn: "Battle of Waterloo", nombreCa: "Batalla de Waterloo", año: 1815, descripcion: "Napoleón sufre su derrota definitiva. Fin del Imperio napoleónico.", descripcionEn: "Napoleon suffers his final defeat. End of the Napoleonic Empire.", descripcionCa: "Napoleó pateix la seva derrota definitiva. Fi de l'Imperi napoleònic.", dificultad: "fácil", categoria: "global" },
  { id: 'glob_13', nombre: "Abolición de la esclavitud en EEUU", nombreEn: "Abolition of Slavery in the US", nombreCa: "Abolició de l'esclavitud als EUA", año: 1865, descripcion: "La Guerra Civil americana termina. Lincoln promulga la 13ª enmienda.", descripcionEn: "The American Civil War ends. Lincoln enacts the 13th Amendment.", descripcionCa: "La Guerra Civil americana acaba. Lincoln promulga la 13a esmena.", dificultad: "fácil", categoria: "global" },
  { id: 'glob_14', nombre: "Revolución Rusa", nombreEn: "Russian Revolution", nombreCa: "Revolució Russa", año: 1917, descripcion: "Los bolcheviques toman el poder. Nace la Unión Soviética.", descripcionEn: "The Bolsheviks seize power. The Soviet Union is born.", descripcionCa: "Els bolxevics prenen el poder. Neix la Unió Soviètica.", dificultad: "fácil", categoria: "global" },
  { id: 'glob_15', nombre: "Gran Depresión", nombreEn: "Great Depression", nombreCa: "Gran Depressió", año: 1929, descripcion: "El crack de Wall Street hunde la economía mundial durante una década.", descripcionEn: "The Wall Street crash plunges the world economy for a decade.", descripcionCa: "El crac de Wall Street enfonsa l'economia mundial durant una dècada.", dificultad: "fácil", categoria: "global" },
  { id: 'glob_16', nombre: "Creación de la ONU", nombreEn: "Creation of the United Nations", nombreCa: "Creació de l'ONU", año: 1945, descripcion: "Tras la Segunda Guerra Mundial, 51 países fundan la Organización de Naciones Unidas.", descripcionEn: "After World War II, 51 countries found the United Nations.", descripcionCa: "Després de la Segona Guerra Mundial, 51 països funden l'Organització de les Nacions Unides.", dificultad: "medio", categoria: "global" },
  { id: 'glob_17', nombre: "Declaración Universal de los DDHH", nombreEn: "Universal Declaration of Human Rights", nombreCa: "Declaració Universal dels Drets Humans", año: 1948, descripcion: "La ONU proclama los derechos fundamentales de todos los seres humanos.", descripcionEn: "The UN proclaims the fundamental rights of all human beings.", descripcionCa: "L'ONU proclama els drets fonamentals de tots els éssers humans.", dificultad: "medio", categoria: "global" },
  { id: 'glob_18', nombre: "Sputnik, primer satélite artificial", nombreEn: "Sputnik, First Artificial Satellite", nombreCa: "Sputnik, primer satèl·lit artificial", año: 1957, descripcion: "La URSS lanza el primer objeto fabricado por el hombre al espacio.", descripcionEn: "The USSR launches the first man-made object into space.", descripcionCa: "L'URSS llança el primer objecte fabricat per l'home a l'espai.", dificultad: "medio", categoria: "global" },
  { id: 'glob_19', nombre: "Llegada del hombre a la Luna", nombreEn: "Moon Landing", nombreCa: "Arribada de l'home a la Lluna", año: 1969, descripcion: "Neil Armstrong da el primer paso humano fuera de la Tierra.", descripcionEn: "Neil Armstrong takes the first human step beyond Earth.", descripcionCa: "Neil Armstrong fa el primer pas humà fora de la Terra.", dificultad: "fácil", categoria: "global" },
  { id: 'glob_20', nombre: "Caída del Muro de Berlín", nombreEn: "Fall of the Berlin Wall", nombreCa: "Caiguda del Mur de Berlín", año: 1989, descripcion: "Alemania se reúne. Comienza el fin de la Guerra Fría.", descripcionEn: "Germany reunites. The end of the Cold War begins.", descripcionCa: "Alemanya es reunifica. Comença la fi de la Guerra Freda.", dificultad: "fácil", categoria: "global" },
  { id: 'glob_21', nombre: "Disolución de la Unión Soviética", nombreEn: "Dissolution of the Soviet Union", nombreCa: "Dissolució de la Unió Soviètica", año: 1991, descripcion: "El bloque comunista se desintegra. Fin de la Guerra Fría.", descripcionEn: "The communist bloc disintegrates. End of the Cold War.", descripcionCa: "El bloc comunista es desintegra. Fi de la Guerra Freda.", dificultad: "medio", categoria: "global" },
  { id: 'glob_22', nombre: "Atentados del 11 de septiembre", nombreEn: "September 11 Attacks", nombreCa: "Atemptats de l'11 de setembre", año: 2001, descripcion: "Al-Qaeda derriba las Torres Gemelas. El mundo cambia para siempre.", descripcionEn: "Al-Qaeda brings down the Twin Towers. The world changes forever.", descripcionCa: "Al-Qaeda enderroca les Torres Bessones. El món canvia per sempre.", dificultad: "fácil", categoria: "global" },
]

// ── CATÁLOGO DE EXÁMENES ─────────────────────────────────────────────────────
// niveles: en qué cursos aparece este examen

export const EXAMENES_HISTORIA = [
  {
    id: 'primaria',
    nombre: 'Grandes hitos de la Historia',
    nombreCa: 'Grans fites de la Història',
    emoji: '🌍',
    descripcion: 'Los momentos más importantes que cambiaron el mundo',
    descripcionCa: 'Els moments més importants que van canviar el món',
    niveles: ['primaria'],
  },
  {
    id: 'gce',
    nombre: 'Guerra Civil Española',
    nombreCa: 'Guerra Civil Espanyola',
    emoji: '🇪🇸',
    descripcion: 'De la República al franquismo — una herida en la historia de España',
    descripcionCa: 'De la República al franquisme — una ferida en la història d\'Espanya',
    niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'wwii',
    nombre: 'Segunda Guerra Mundial',
    nombreCa: 'Segona Guerra Mundial',
    emoji: '⚔️',
    descripcion: 'El conflicto que cambió el mundo para siempre',
    descripcionCa: 'El conflicte que va canviar el món per sempre',
    niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'roma',
    nombre: 'Antigua Roma',
    nombreCa: 'Antiga Roma',
    emoji: '🏛️',
    descripcion: 'Desde Rómulo hasta la caída del Imperio Romano',
    descripcionCa: 'Des de Ròmul fins a la caiguda de l\'Imperi Romà',
    niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'usa',
    nombre: 'Independencia Americana',
    nombreCa: 'Independència Americana',
    emoji: '🦅',
    descripcion: 'De la colonia británica a los Estados Unidos de América',
    descripcionCa: 'De la colònia britànica als Estats Units d\'Amèrica',
    niveles: ['bachillerato'],
  },
]

// ── HELPERS ───────────────────────────────────────────────────────────────────

// Valor de ordenación: año * 100 + mes (0 si no hay mes).
// Permite desempatar eventos del mismo año cuando ambos tienen mes conocido.
export function sortValue(e) {
  return e.año * 100 + (e.mes ?? 0)
}

// Posición correcta donde insertar `card` en la línea temporal `tl` (ya ordenada).
// Usa mes como desempate si ambos eventos lo tienen; si no, empata por año.
export function getCorrectPos(card, tl) {
  const cardVal = sortValue(card)
  const idx = tl.findIndex(e => {
    if (e.año === card.año && (e.mes == null || card.mes == null)) return false
    return sortValue(e) > cardVal
  })
  return idx === -1 ? tl.length : idx
}

export const PREGUNTAS_POR_EXAMEN = 10

export function getEventosPorCategoria(categoriaId, nivel = null) {
  const todos = EVENTOS_HISTORIA.filter(e =>
    e.categoria === categoriaId &&
    (!nivel || !e.nivel || e.nivel.includes(nivel))
  )
  const mezclados = todos.sort(() => Math.random() - 0.5)
  return mezclados.slice(0, PREGUNTAS_POR_EXAMEN)
}

export function calcularMargen(categoriaId, nivel = null) {
  const todos = EVENTOS_HISTORIA.filter(e =>
    e.categoria === categoriaId &&
    (!nivel || !e.nivel || e.nivel.includes(nivel))
  )
  const years = todos.map(e => e.año)
  const rango = Math.max(...years) - Math.min(...years)
  return Math.max(1, Math.round(rango / PREGUNTAS_POR_EXAMEN))
}

export function getExamenesPorNivel(nivel) {
  return EXAMENES_HISTORIA.filter(ex => ex.niveles.includes(nivel))
}

// Devuelve eventos únicos por año para Línea Temporal (sin años repetidos)
// Prefiere categorías con descripciones ricas sobre 'primaria'
export function getEventosLineaTemporal() {
  const byYear = new Map()
  for (const e of EVENTOS_HISTORIA) {
    const existing = byYear.get(e.año)
    if (!existing || existing.categoria === 'primaria') {
      byYear.set(e.año, e)
    }
  }
  return [...byYear.values()].sort(() => Math.random() - 0.5)
}

// Ordena un array de eventos por año+mes para inicializar la línea temporal.
export function sortEventos(eventos) {
  return [...eventos].sort((a, b) => sortValue(a) - sortValue(b))
}

// Hash determinista de un string → número entero positivo.
function hashStr(s) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

// Genera 3 años incorrectos plausibles para un evento dado.
// Los offsets son deterministas (basados en el id) para que la pregunta
// sea siempre la misma el mismo día.
function wrongYears(evento) {
  const base = hashStr(evento.id)
  const rango = Math.max(10, Math.abs(evento.año) > 500 ? 200 : 15)
  const pool = []
  let seed = base
  while (pool.length < 3) {
    seed = (seed * 1664525 + 1013904223) >>> 0
    const offset = (seed % rango) + 1
    const signed = seed % 2 === 0 ? offset : -offset
    const candidate = evento.año + signed
    if (!pool.includes(candidate) && candidate !== evento.año) pool.push(candidate)
  }
  return pool
}

// Convierte eventos históricos en preguntas de opción múltiple del formato
// PREGUNTAS_DIARIAS para que el banco diario incluya todos los eventos.
export function eventosToPreguntas(eventos) {
  return eventos.map(e => {
    const wrongOpts = wrongYears(e)
    const opciones = [e.año, ...wrongOpts]
      .sort(() => {
        // Orden determinista usando hash del id para que las opciones
        // no cambien entre renders
        const h = hashStr(e.id + String(e.año))
        return ((h >>> 0) % 3) - 1
      })
      .map(y => y < 0 ? `${Math.abs(y)} a.C.` : String(y))
    const correctaStr = e.año < 0 ? `${Math.abs(e.año)} a.C.` : String(e.año)
    const nivelEs = e.dificultad === 'fácil' ? 'Primaria' : e.dificultad === 'medio' ? 'ESO' : 'Bachillerato'
    const nivelEn = e.dificultad === 'fácil' ? 'Primary' : e.dificultad === 'medio' ? 'Secondary' : 'Sixth Form'
    const nivelCa = e.dificultad === 'fácil' ? 'Primària' : e.dificultad === 'medio' ? 'ESO' : 'Batxillerat'
    return {
      id: `auto_${e.id}`,
      pregunta: `¿En qué año ocurrió: "${e.nombre}"?`,
      preguntaEn: `In what year did this happen: "${e.nombreEn || e.nombre}"?`,
      preguntaCa: `En quin any va passar: "${e.nombreCa || e.nombre}"?`,
      opciones,
      opcionesEn: opciones,
      opcionesCa: opciones,
      correcta: correctaStr,
      correctaEn: correctaStr,
      correctaCa: correctaStr,
      categoria: `Historia · ${nivelEs}`,
      categoriaEn: `History · ${nivelEn}`,
      categoriaCa: `Història · ${nivelCa}`,
      explicacion: e.descripcion,
      explicacionEn: e.descripcionEn || e.descripcion,
      explicacionCa: e.descripcionCa || e.descripcion,
    }
  })
}
