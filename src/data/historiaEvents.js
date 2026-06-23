// Eventos históricos para el modo examen de Tuthor
// Cada evento: { id, nombre, descripcion, año, dificultad, categoria, nivel }
// nivel: qué cursos ven este evento ['primaria'] | ['eso','bachillerato'] | ['bachillerato']

export const EVENTOS_HISTORIA = [

  // ── SEGUNDA GUERRA MUNDIAL ────────────────────────────────────────────────
  { id: 'wwii_01', nombre: "Inicio de la Segunda Guerra Mundial", nombreEn: "Start of World War II", año: 1939, descripcion: "Alemania invade Polonia. Reino Unido y Francia declaran la guerra.", descripcionEn: "Germany invades Poland. The United Kingdom and France declare war.", dificultad: "fácil", categoria: "wwii", nivel: ['eso','bachillerato'] },
  { id: 'wwii_02', nombre: "Evacuación de Dunkerque", nombreEn: "Evacuation of Dunkirk", año: 1940, mes: 5, descripcion: "330.000 soldados aliados evacuados bajo fuego nazi.", descripcionEn: "330,000 Allied soldiers evacuated under Nazi fire.", dificultad: "medio", categoria: "wwii", nivel: ['eso','bachillerato'] },
  { id: 'wwii_03', nombre: "Batalla de Gran Bretaña", nombreEn: "Battle of Britain", año: 1940, mes: 7, descripcion: "La RAF defiende los cielos británicos de la Luftwaffe.", descripcionEn: "The RAF defends British skies from the Luftwaffe.", dificultad: "medio", categoria: "wwii", nivel: ['eso','bachillerato'] },
  { id: 'wwii_04', nombre: "Operación Barbarroja", nombreEn: "Operation Barbarossa", año: 1941, mes: 6, descripcion: "Alemania invade la Unión Soviética con 3 millones de soldados.", descripcionEn: "Germany invades the Soviet Union with 3 million soldiers.", dificultad: "medio", categoria: "wwii", nivel: ['eso','bachillerato'] },
  { id: 'wwii_05', nombre: "Ataque a Pearl Harbor", nombreEn: "Attack on Pearl Harbor", año: 1941, mes: 12, descripcion: "Japón ataca la base naval americana. EEUU entra en la guerra.", descripcionEn: "Japan attacks the American naval base. The US enters the war.", dificultad: "fácil", categoria: "wwii", nivel: ['eso','bachillerato'] },
  { id: 'wwii_06', nombre: "Batalla de Stalingrado", nombreEn: "Battle of Stalingrad", año: 1942, descripcion: "El punto de inflexión del frente oriental. Derrota nazi decisiva.", descripcionEn: "The turning point of the Eastern Front. Decisive Nazi defeat.", dificultad: "fácil", categoria: "wwii", nivel: ['eso','bachillerato'] },
  { id: 'wwii_13', nombre: "Batalla de Midway", nombreEn: "Battle of Midway", año: 1942, mes: 6, descripcion: "La armada japonesa es destruida. Punto de inflexión en el Pacífico.", descripcionEn: "The Japanese fleet is destroyed. Turning point in the Pacific.", dificultad: "difícil", categoria: "wwii", nivel: ['bachillerato'] },
  { id: 'wwii_14', nombre: "Conferencia de Teherán", nombreEn: "Tehran Conference", año: 1943, mes: 11, descripcion: "Churchill, Roosevelt y Stalin planifican juntos la derrota definitiva de Hitler.", descripcionEn: "Churchill, Roosevelt and Stalin jointly plan Hitler's final defeat.", dificultad: "difícil", categoria: "wwii", nivel: ['bachillerato'] },
  { id: 'wwii_07', nombre: "Desembarco de Normandía (Día D)", nombreEn: "Normandy Landings (D-Day)", año: 1944, mes: 6, descripcion: "La mayor operación anfibia de la historia en las playas francesas.", descripcionEn: "The largest amphibious operation in history on the French beaches.", dificultad: "fácil", categoria: "wwii", nivel: ['eso','bachillerato'] },
  { id: 'wwii_08', nombre: "Liberación de París", nombreEn: "Liberation of Paris", año: 1944, mes: 8, descripcion: "Las tropas aliadas y la Resistencia liberan la capital francesa.", descripcionEn: "Allied troops and the Resistance liberate the French capital.", dificultad: "medio", categoria: "wwii", nivel: ['eso','bachillerato'] },
  { id: 'wwii_09', nombre: "Batalla de las Ardenas", nombreEn: "Battle of the Bulge", año: 1944, mes: 12, descripcion: "La última gran ofensiva alemana en el frente occidental.", descripcionEn: "The last major German offensive on the Western Front.", dificultad: "difícil", categoria: "wwii", nivel: ['bachillerato'] },
  { id: 'wwii_12', nombre: "Conferencia de Yalta", nombreEn: "Yalta Conference", año: 1945, mes: 2, descripcion: "Churchill, Roosevelt y Stalin dividen el mundo de posguerra.", descripcionEn: "Churchill, Roosevelt and Stalin divide the post-war world.", dificultad: "difícil", categoria: "wwii", nivel: ['bachillerato'] },
  { id: 'wwii_10', nombre: "Rendición de Alemania", nombreEn: "Surrender of Germany", año: 1945, mes: 5, descripcion: "Firma del armisticio. Fin de la guerra en Europa.", descripcionEn: "The armistice is signed. End of the war in Europe.", dificultad: "fácil", categoria: "wwii", nivel: ['eso','bachillerato'] },
  { id: 'wwii_11', nombre: "Bombas atómicas sobre Japón", nombreEn: "Atomic bombs on Japan", año: 1945, mes: 8, descripcion: "Hiroshima y Nagasaki. El fin de la guerra en el Pacífico.", descripcionEn: "Hiroshima and Nagasaki. The end of the war in the Pacific.", dificultad: "fácil", categoria: "wwii", nivel: ['eso','bachillerato'] },

  // ── GUERRA CIVIL ESPAÑOLA ─────────────────────────────────────────────────
  { id: 'gce_01', nombre: "Segunda República Española", nombreEn: "Second Spanish Republic", año: 1931, descripcion: "Alfonso XIII parte al exilio. España se convierte en República.", descripcionEn: "Alfonso XIII goes into exile. Spain becomes a Republic.", dificultad: "medio", categoria: "gce", nivel: ['eso','bachillerato'] },
  { id: 'gce_02', nombre: "Revolución de Asturias", nombreEn: "Asturias Revolution", año: 1934, descripcion: "Mineros asturianos se levantan. El ejército reprime duramente.", descripcionEn: "Asturian miners rise up. The army cracks down harshly.", dificultad: "difícil", categoria: "gce", nivel: ['bachillerato'] },
  { id: 'gce_03', nombre: "Victoria del Frente Popular", nombreEn: "Popular Front Victory", año: 1936, mes: 2, descripcion: "La coalición de izquierdas gana las elecciones generales.", descripcionEn: "The left-wing coalition wins the general elections.", dificultad: "medio", categoria: "gce", nivel: ['eso','bachillerato'] },
  { id: 'gce_04', nombre: "Inicio de la Guerra Civil Española", nombreEn: "Start of the Spanish Civil War", año: 1936, mes: 7, descripcion: "El golpe de estado de Franco inicia tres años de guerra fratricida.", descripcionEn: "Franco's coup d'état begins three years of fratricidal war.", dificultad: "fácil", categoria: "gce", nivel: ['eso','bachillerato'] },
  { id: 'gce_15', nombre: "Pacto de No Intervención", nombreEn: "Non-Intervention Pact", año: 1936, mes: 8, descripcion: "Las potencias europeas acuerdan no intervenir en España, pero Alemania e Italia lo incumplen.", descripcionEn: "European powers agree not to intervene in Spain, but Germany and Italy break the pact.", dificultad: "difícil", categoria: "gce", nivel: ['bachillerato'] },
  { id: 'gce_05', nombre: "Bombardeo de Guernica", nombreEn: "Bombing of Guernica", año: 1937, descripcion: "La Legión Cóndor nazi arrasa la ciudad vasca. Picasso lo inmortaliza.", descripcionEn: "The Nazi Condor Legion devastates the Basque town. Picasso immortalizes it.", dificultad: "fácil", categoria: "gce", nivel: ['eso','bachillerato'] },
  { id: 'gce_13', nombre: "Batalla del Jarama", nombreEn: "Battle of Jarama", año: 1937, mes: 2, descripcion: "Intento franquista de cortar la carretera Madrid-Valencia. La República resiste.", descripcionEn: "Francoist attempt to cut the Madrid-Valencia road. The Republic holds.", dificultad: "difícil", categoria: "gce", nivel: ['bachillerato'] },
  { id: 'gce_14', nombre: "Batalla de Guadalajara", nombreEn: "Battle of Guadalajara", año: 1937, mes: 3, descripcion: "Las tropas italianas del CTV son derrotadas. Gran victoria propagandística republicana.", descripcionEn: "The Italian CTV troops are defeated. A major Republican propaganda victory.", dificultad: "difícil", categoria: "gce", nivel: ['bachillerato'] },
  { id: 'gce_11', nombre: "Hechos de Mayo", nombreEn: "May Days", año: 1937, mes: 5, descripcion: "Enfrentamientos entre anarquistas y comunistas en Barcelona. Crisis interna del bando republicano.", descripcionEn: "Clashes between anarchists and communists in Barcelona. Internal crisis in the Republican side.", dificultad: "difícil", categoria: "gce", nivel: ['bachillerato'] },
  { id: 'gce_12', nombre: "Campaña del Norte", nombreEn: "Northern Campaign", año: 1937, mes: 6, descripcion: "Franco conquista el País Vasco, Santander y Asturias. La industria del norte cae en manos rebeldes.", descripcionEn: "Franco conquers the Basque Country, Santander and Asturias. Northern industry falls to the rebels.", dificultad: "difícil", categoria: "gce", nivel: ['bachillerato'] },
  { id: 'gce_06', nombre: "Batalla del Ebro", nombreEn: "Battle of the Ebro", año: 1938, descripcion: "La mayor batalla de la guerra civil. Derrota republicana definitiva.", descripcionEn: "The largest battle of the civil war. Definitive Republican defeat.", dificultad: "medio", categoria: "gce", nivel: ['eso','bachillerato'] },
  { id: 'gce_07', nombre: "Caída de Barcelona", nombreEn: "Fall of Barcelona", año: 1939, mes: 1, descripcion: "Las tropas franquistas entran en Cataluña. El exilio masivo comienza.", descripcionEn: "Francoist troops enter Catalonia. The mass exile begins.", dificultad: "fácil", categoria: "gce", nivel: ['eso','bachillerato'] },
  { id: 'gce_08', nombre: "Fin de la Guerra Civil Española", nombreEn: "End of the Spanish Civil War", año: 1939, mes: 4, descripcion: "Franco proclama el final de la guerra. Comienza la dictadura.", descripcionEn: "Franco declares the war over. The dictatorship begins.", dificultad: "fácil", categoria: "gce", nivel: ['eso','bachillerato'] },
  { id: 'gce_09', nombre: "Muerte de Franco", nombreEn: "Death of Franco", año: 1975, descripcion: "El dictador muere en la cama. Comienza la Transición Democrática.", descripcionEn: "The dictator dies in his bed. The Democratic Transition begins.", dificultad: "fácil", categoria: "gce", nivel: ['eso','bachillerato'] },
  { id: 'gce_10', nombre: "Constitución Española", nombreEn: "Spanish Constitution", año: 1978, descripcion: "España aprueba su carta magna. La democracia queda consolidada.", descripcionEn: "Spain approves its constitution. Democracy is consolidated.", dificultad: "fácil", categoria: "gce", nivel: ['eso','bachillerato'] },

  // ── ANTIGUA ROMA ──────────────────────────────────────────────────────────
  { id: 'roma_01', nombre: "Fundación de Roma", nombreEn: "Founding of Rome", año: -753, descripcion: "Según la leyenda, Rómulo funda la ciudad eterna a orillas del Tíber.", descripcionEn: "According to legend, Romulus founds the eternal city on the banks of the Tiber.", dificultad: "medio", categoria: "roma", nivel: ['eso','bachillerato'] },
  { id: 'roma_02', nombre: "Nace la República Romana", nombreEn: "Birth of the Roman Republic", año: -509, descripcion: "Se expulsa al último rey etrusco. Roma pasa a ser república.", descripcionEn: "The last Etruscan king is expelled. Rome becomes a republic.", dificultad: "difícil", categoria: "roma", nivel: ['bachillerato'] },
  { id: 'roma_03', nombre: "Inicio de las Guerras Púnicas", nombreEn: "Start of the Punic Wars", año: -264, descripcion: "Roma y Cartago luchan por el control del Mediterráneo.", descripcionEn: "Rome and Carthage fight for control of the Mediterranean.", dificultad: "difícil", categoria: "roma", nivel: ['bachillerato'] },
  { id: 'roma_04', nombre: "Cruce del Rubicón por César", nombreEn: "Caesar Crosses the Rubicon", año: -49, descripcion: "César desafía al Senado. Comienza la guerra civil romana.", descripcionEn: "Caesar defies the Senate. The Roman civil war begins.", dificultad: "medio", categoria: "roma", nivel: ['eso','bachillerato'] },
  { id: 'roma_05', nombre: "Asesinato de Julio César", nombreEn: "Assassination of Julius Caesar", año: -44, descripcion: "Los idus de marzo. 23 puñaladas en el Senado romano.", descripcionEn: "The Ides of March. 23 stab wounds in the Roman Senate.", dificultad: "fácil", categoria: "roma", nivel: ['eso','bachillerato'] },
  { id: 'roma_06', nombre: "Augusto, primer emperador", nombreEn: "Augustus, First Emperor", año: -27, descripcion: "Octavio recibe el título de Augusto. Comienza el Imperio Romano.", descripcionEn: "Octavian receives the title of Augustus. The Roman Empire begins.", dificultad: "medio", categoria: "roma", nivel: ['eso','bachillerato'] },
  { id: 'roma_07', nombre: "Erupción del Vesubio", nombreEn: "Eruption of Vesuvius", año: 79, descripcion: "Pompeya y Herculano quedan sepultadas bajo las cenizas volcánicas.", descripcionEn: "Pompeii and Herculaneum are buried under volcanic ash.", dificultad: "fácil", categoria: "roma", nivel: ['eso','bachillerato'] },
  { id: 'roma_08', nombre: "Edicto de Milán", nombreEn: "Edict of Milan", año: 313, descripcion: "Constantino legaliza el cristianismo en el Imperio Romano.", descripcionEn: "Constantine legalizes Christianity in the Roman Empire.", dificultad: "difícil", categoria: "roma", nivel: ['bachillerato'] },
  { id: 'roma_09', nombre: "División del Imperio Romano", nombreEn: "Division of the Roman Empire", año: 395, descripcion: "Teodosio divide el Imperio entre sus dos hijos.", descripcionEn: "Theodosius divides the Empire between his two sons.", dificultad: "difícil", categoria: "roma", nivel: ['bachillerato'] },
  { id: 'roma_10', nombre: "Caída del Imperio Romano de Occidente", nombreEn: "Fall of the Western Roman Empire", año: 476, descripcion: "Rómulo Augústulo es depuesto. Fin del mundo antiguo.", descripcionEn: "Romulus Augustulus is deposed. End of the ancient world.", dificultad: "medio", categoria: "roma", nivel: ['eso','bachillerato'] },

  // ── PRIMARIA: HITOS HISTÓRICOS BÁSICOS ───────────────────────────────────
  { id: 'pri_01', nombre: "Descubrimiento de América", nombreEn: "Discovery of America", año: 1492, descripcion: "Cristóbal Colón llega a las Bahamas creyendo que era Asia.", descripcionEn: "Christopher Columbus reaches the Bahamas believing it was Asia.", dificultad: "fácil", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_02', nombre: "Caída del Imperio Romano de Occidente", nombreEn: "Fall of the Western Roman Empire", año: 476, descripcion: "Los bárbaros acaban con el gran Imperio Romano.", descripcionEn: "The barbarians bring down the great Roman Empire.", dificultad: "fácil", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_03', nombre: "Revolución Francesa", nombreEn: "French Revolution", año: 1789, descripcion: "El pueblo de Francia se rebela contra el rey. Nace la democracia.", descripcionEn: "The people of France rebel against the king. Democracy is born.", dificultad: "fácil", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_04', nombre: "Llegada del hombre a la Luna", nombreEn: "Moon Landing", año: 1969, descripcion: "Neil Armstrong da el primer paso humano en la Luna.", descripcionEn: "Neil Armstrong takes the first human step on the Moon.", dificultad: "fácil", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_05', nombre: "Primer vuelo de los hermanos Wright", nombreEn: "First Flight by the Wright Brothers", año: 1903, descripcion: "El primer avión de la historia vuela durante 12 segundos.", descripcionEn: "The first airplane in history flies for 12 seconds.", dificultad: "fácil", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_06', nombre: "Invención de la imprenta", nombreEn: "Invention of the Printing Press", año: 1440, descripcion: "Gutenberg inventa la imprenta. Los libros llegan a todo el mundo.", descripcionEn: "Gutenberg invents the printing press. Books reach the whole world.", dificultad: "fácil", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_07', nombre: "Caída del Muro de Berlín", nombreEn: "Fall of the Berlin Wall", año: 1989, descripcion: "El muro que separaba una ciudad entera se derrumba.", descripcionEn: "The wall that divided an entire city comes down.", dificultad: "fácil", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_08', nombre: "Inicio de la Segunda Guerra Mundial", nombreEn: "Start of World War II", año: 1939, descripcion: "El conflicto más grande de la historia comienza en Europa.", descripcionEn: "The largest conflict in history begins in Europe.", dificultad: "fácil", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_09', nombre: "Fundación de Roma", nombreEn: "Founding of Rome", año: -753, descripcion: "Según la leyenda, Rómulo funda la ciudad más poderosa del mundo.", descripcionEn: "According to legend, Romulus founds the most powerful city in the world.", dificultad: "fácil", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_10', nombre: "Primer Juego Olímpico moderno", nombreEn: "First Modern Olympic Games", año: 1896, descripcion: "Atenas acoge los primeros Juegos Olímpicos de la era moderna.", descripcionEn: "Athens hosts the first Olympic Games of the modern era.", dificultad: "fácil", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_11', nombre: "Hundimiento del Titanic", nombreEn: "Sinking of the Titanic", año: 1912, descripcion: "El barco más grande del mundo se hunde en su primer viaje.", descripcionEn: "The largest ship in the world sinks on its maiden voyage.", dificultad: "fácil", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_12', nombre: "España gana el Mundial de fútbol", nombreEn: "Spain Wins the FIFA World Cup", año: 2010, descripcion: "La selección española gana su primer campeonato del mundo.", descripcionEn: "The Spanish national team wins its first world championship.", dificultad: "fácil", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_13', nombre: "Fin de la Edad Media", nombreEn: "End of the Middle Ages", año: 1453, descripcion: "La caída de Constantinopla marca el fin de la Edad Media.", descripcionEn: "The fall of Constantinople marks the end of the Middle Ages.", dificultad: "medio", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_14', nombre: "Revolución Industrial", nombreEn: "Industrial Revolution", año: 1760, descripcion: "Las máquinas de vapor cambian el trabajo y la vida de las personas.", descripcionEn: "Steam engines change work and people's lives.", dificultad: "medio", categoria: "primaria", nivel: ['primaria'] },
  { id: 'pri_15', nombre: "Independencia de los Estados Unidos", nombreEn: "United States Independence", año: 1776, descripcion: "Las colonias americanas se declaran libres de Gran Bretaña.", descripcionEn: "The American colonies declare themselves free from Great Britain.", dificultad: "medio", categoria: "primaria", nivel: ['primaria'] },

  // ── INDEPENDENCIA AMERICANA ───────────────────────────────────────────────
  { id: 'usa_01', nombre: "Motín del Té de Boston", nombreEn: "Boston Tea Party", año: 1773, descripcion: "Colonos americanos arrojan té al mar protestando contra impuestos.", descripcionEn: "American colonists dump tea into the sea protesting against taxes.", dificultad: "medio", categoria: "usa", nivel: ['bachillerato'] },
  { id: 'usa_02', nombre: "Primer Congreso Continental", nombreEn: "First Continental Congress", año: 1774, descripcion: "Las colonias se unen por primera vez para coordinar su resistencia.", descripcionEn: "The colonies unite for the first time to coordinate their resistance.", dificultad: "difícil", categoria: "usa", nivel: ['bachillerato'] },
  { id: 'usa_03', nombre: "Declaración de Independencia", nombreEn: "Declaration of Independence", año: 1776, descripcion: "Las 13 colonias se declaran nación libre e independiente.", descripcionEn: "The 13 colonies declare themselves a free and independent nation.", dificultad: "fácil", categoria: "usa", nivel: ['bachillerato'] },
  { id: 'usa_04', nombre: "Batalla de Saratoga", nombreEn: "Battle of Saratoga", año: 1777, descripcion: "Victoria americana que convence a Francia de entrar en la guerra.", descripcionEn: "American victory that convinces France to enter the war.", dificultad: "difícil", categoria: "usa", nivel: ['bachillerato'] },
  { id: 'usa_05', nombre: "Batalla de Yorktown", nombreEn: "Battle of Yorktown", año: 1781, descripcion: "La última gran batalla. La rendición británica sella la independencia.", descripcionEn: "The last major battle. The British surrender seals independence.", dificultad: "medio", categoria: "usa", nivel: ['bachillerato'] },
  { id: 'usa_06', nombre: "Tratado de París", nombreEn: "Treaty of Paris", año: 1783, descripcion: "Gran Bretaña reconoce oficialmente la independencia americana.", descripcionEn: "Great Britain officially recognizes American independence.", dificultad: "medio", categoria: "usa", nivel: ['bachillerato'] },
  { id: 'usa_07', nombre: "Constitución de los Estados Unidos", nombreEn: "United States Constitution", año: 1787, descripcion: "Se redacta la constitución más duradera de la historia moderna.", descripcionEn: "The longest-lasting constitution in modern history is drafted.", dificultad: "fácil", categoria: "usa", nivel: ['bachillerato'] },
  { id: 'usa_08', nombre: "George Washington, primer presidente", nombreEn: "George Washington, First President", año: 1789, descripcion: "Washington es elegido primer presidente de los Estados Unidos.", descripcionEn: "Washington is elected first president of the United States.", dificultad: "fácil", categoria: "usa", nivel: ['bachillerato'] },

  // ── EVENTOS GLOBALES (para Línea Temporal) ────────────────────────────────
  { id: 'glob_01', nombre: "Invasión árabe de la Península Ibérica", nombreEn: "Moorish Invasion of the Iberian Peninsula", año: 711, descripcion: "Los musulmanes cruzan el Estrecho de Gibraltar y conquistan casi toda España.", descripcionEn: "The Moors cross the Strait of Gibraltar and conquer most of Spain.", dificultad: "medio", categoria: "global" },
  { id: 'glob_02', nombre: "Coronación de Carlomagno", nombreEn: "Coronation of Charlemagne", año: 800, descripcion: "El papa León III corona a Carlomagno como emperador de Occidente en Roma.", descripcionEn: "Pope Leo III crowns Charlemagne as Emperor of the West in Rome.", dificultad: "medio", categoria: "global" },
  { id: 'glob_03', nombre: "Batalla de Hastings", nombreEn: "Battle of Hastings", año: 1066, descripcion: "Guillermo el Conquistador derrota al rey Harold. Nace la Inglaterra medieval.", descripcionEn: "William the Conqueror defeats King Harold. Medieval England is born.", dificultad: "medio", categoria: "global" },
  { id: 'glob_04', nombre: "Primera Cruzada", nombreEn: "First Crusade", año: 1096, descripcion: "El papa Urbano II convoca a los cristianos a liberar Jerusalén.", descripcionEn: "Pope Urban II calls on Christians to liberate Jerusalem.", dificultad: "difícil", categoria: "global" },
  { id: 'glob_05', nombre: "Magna Carta", nombreEn: "Magna Carta", año: 1215, descripcion: "El rey Juan sin Tierra firma la primera carta de derechos de la historia.", descripcionEn: "King John signs the first bill of rights in history.", dificultad: "medio", categoria: "global" },
  { id: 'glob_06', nombre: "Peste Negra en Europa", nombreEn: "Black Death in Europe", año: 1347, descripcion: "La pandemia de peste bubónica mata a un tercio de la población europea.", descripcionEn: "The bubonic plague pandemic kills a third of Europe's population.", dificultad: "fácil", categoria: "global" },
  { id: 'glob_07', nombre: "Caída de Constantinopla", nombreEn: "Fall of Constantinople", año: 1453, descripcion: "Los otomanos conquistan la capital del Imperio Bizantino. Fin de la Edad Media.", descripcionEn: "The Ottomans conquer the capital of the Byzantine Empire. End of the Middle Ages.", dificultad: "fácil", categoria: "global" },
  { id: 'glob_08', nombre: "Reforma Protestante", nombreEn: "Protestant Reformation", año: 1517, descripcion: "Lutero clava sus 95 tesis. Europa se divide entre católicos y protestantes.", descripcionEn: "Luther posts his 95 theses. Europe splits between Catholics and Protestants.", dificultad: "medio", categoria: "global" },
  { id: 'glob_09', nombre: "Revolución Inglesa (Gloriosa)", nombreEn: "Glorious Revolution", año: 1688, descripcion: "El parlamento inglés limita el poder del rey. Nace la democracia moderna.", descripcionEn: "The English parliament limits the king's power. Modern democracy is born.", dificultad: "difícil", categoria: "global" },
  { id: 'glob_10', nombre: "Revolución Americana", nombreEn: "American Revolution", año: 1776, descripcion: "Las colonias americanas se declaran independientes de Gran Bretaña.", descripcionEn: "The American colonies declare independence from Great Britain.", dificultad: "fácil", categoria: "global" },
  { id: 'glob_11', nombre: "Revolución Francesa", nombreEn: "French Revolution", año: 1789, descripcion: "El pueblo toma la Bastilla. Fin del Antiguo Régimen en Francia.", descripcionEn: "The people storm the Bastille. End of the Ancien Régime in France.", dificultad: "fácil", categoria: "global" },
  { id: 'glob_12', nombre: "Batalla de Waterloo", nombreEn: "Battle of Waterloo", año: 1815, descripcion: "Napoleón sufre su derrota definitiva. Fin del Imperio napoleónico.", descripcionEn: "Napoleon suffers his final defeat. End of the Napoleonic Empire.", dificultad: "fácil", categoria: "global" },
  { id: 'glob_13', nombre: "Abolición de la esclavitud en EEUU", nombreEn: "Abolition of Slavery in the US", año: 1865, descripcion: "La Guerra Civil americana termina. Lincoln promulga la 13ª enmienda.", descripcionEn: "The American Civil War ends. Lincoln enacts the 13th Amendment.", dificultad: "fácil", categoria: "global" },
  { id: 'glob_14', nombre: "Revolución Rusa", nombreEn: "Russian Revolution", año: 1917, descripcion: "Los bolcheviques toman el poder. Nace la Unión Soviética.", descripcionEn: "The Bolsheviks seize power. The Soviet Union is born.", dificultad: "fácil", categoria: "global" },
  { id: 'glob_15', nombre: "Gran Depresión", nombreEn: "Great Depression", año: 1929, descripcion: "El crack de Wall Street hunde la economía mundial durante una década.", descripcionEn: "The Wall Street crash plunges the world economy for a decade.", dificultad: "fácil", categoria: "global" },
  { id: 'glob_16', nombre: "Creación de la ONU", nombreEn: "Creation of the United Nations", año: 1945, descripcion: "Tras la Segunda Guerra Mundial, 51 países fundan la Organización de Naciones Unidas.", descripcionEn: "After World War II, 51 countries found the United Nations.", dificultad: "medio", categoria: "global" },
  { id: 'glob_17', nombre: "Declaración Universal de los DDHH", nombreEn: "Universal Declaration of Human Rights", año: 1948, descripcion: "La ONU proclama los derechos fundamentales de todos los seres humanos.", descripcionEn: "The UN proclaims the fundamental rights of all human beings.", dificultad: "medio", categoria: "global" },
  { id: 'glob_18', nombre: "Sputnik, primer satélite artificial", nombreEn: "Sputnik, First Artificial Satellite", año: 1957, descripcion: "La URSS lanza el primer objeto fabricado por el hombre al espacio.", descripcionEn: "The USSR launches the first man-made object into space.", dificultad: "medio", categoria: "global" },
  { id: 'glob_19', nombre: "Llegada del hombre a la Luna", nombreEn: "Moon Landing", año: 1969, descripcion: "Neil Armstrong da el primer paso humano fuera de la Tierra.", descripcionEn: "Neil Armstrong takes the first human step beyond Earth.", dificultad: "fácil", categoria: "global" },
  { id: 'glob_20', nombre: "Caída del Muro de Berlín", nombreEn: "Fall of the Berlin Wall", año: 1989, descripcion: "Alemania se reúne. Comienza el fin de la Guerra Fría.", descripcionEn: "Germany reunites. The end of the Cold War begins.", dificultad: "fácil", categoria: "global" },
  { id: 'glob_21', nombre: "Disolución de la Unión Soviética", nombreEn: "Dissolution of the Soviet Union", año: 1991, descripcion: "El bloque comunista se desintegra. Fin de la Guerra Fría.", descripcionEn: "The communist bloc disintegrates. End of the Cold War.", dificultad: "medio", categoria: "global" },
  { id: 'glob_22', nombre: "Atentados del 11 de septiembre", nombreEn: "September 11 Attacks", año: 2001, descripcion: "Al-Qaeda derriba las Torres Gemelas. El mundo cambia para siempre.", descripcionEn: "Al-Qaeda brings down the Twin Towers. The world changes forever.", dificultad: "fácil", categoria: "global" },
]

// ── CATÁLOGO DE EXÁMENES ─────────────────────────────────────────────────────
// niveles: en qué cursos aparece este examen

export const EXAMENES_HISTORIA = [
  {
    id: 'primaria',
    nombre: 'Grandes hitos de la Historia',
    emoji: '🌍',
    descripcion: 'Los momentos más importantes que cambiaron el mundo',
    niveles: ['primaria'],
  },
  {
    id: 'gce',
    nombre: 'Guerra Civil Española',
    emoji: '🇪🇸',
    descripcion: 'De la República al franquismo — una herida en la historia de España',
    niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'wwii',
    nombre: 'Segunda Guerra Mundial',
    emoji: '⚔️',
    descripcion: 'El conflicto que cambió el mundo para siempre',
    niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'roma',
    nombre: 'Antigua Roma',
    emoji: '🏛️',
    descripcion: 'Desde Rómulo hasta la caída del Imperio Romano',
    niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'usa',
    nombre: 'Independencia Americana',
    emoji: '🦅',
    descripcion: 'De la colonia británica a los Estados Unidos de América',
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
    return {
      id: `auto_${e.id}`,
      pregunta: `¿En qué año ocurrió: "${e.nombre}"?`,
      opciones,
      correcta: correctaStr,
      categoria: `Historia · ${e.dificultad === 'fácil' ? 'Primaria' : e.dificultad === 'medio' ? 'ESO' : 'Bachillerato'}`,
      explicacion: e.descripcion,
    }
  })
}
