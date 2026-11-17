// Piezas extra de ¿Por Qué Pasó? (17-nov): 2 causas y 2 consecuencias más
// por hecho, para que al repetirse un hecho salgan piezas distintas (5 + 5 en
// total). Se suman en causasHistoria.js. Mismas reglas: concretas, con
// nombres o fechas, para que no encajen en otro hecho.
const T = (es, en, ca) => ({ es, en, ca })
const X = (causas, consecuencias) => ({ causas, consecuencias })

export const EXTRA = {
  neolitico: X(
    [T('Tierras fértiles junto a ríos, como en el Creciente Fértil', 'Fertile land beside rivers, as in the Fertile Crescent', 'Terres fèrtils al costat de rius, com al Creixent Fèrtil'),
      T('Necesidad de tener comida segura todo el año', 'The need for a secure food supply all year round', 'Necessitat de tenir menjar segur tot l’any')],
    [T('Herramientas de piedra pulida, como la hoz y el hacha', 'Polished stone tools, such as the sickle and the axe', 'Eines de pedra polida, com la falç i la destral'),
      T('Propiedad de la tierra y primeras desigualdades', 'Land ownership and the first inequalities', 'Propietat de la terra i primeres desigualtats')]),
  'caida-roma': X(
    [T('Un ejército lleno de mercenarios germanos', 'An army full of Germanic mercenaries', 'Un exèrcit ple de mercenaris germànics'),
      T('Emperadores asesinados y golpes militares', 'Emperors murdered and military coups', 'Emperadors assassinats i cops militars')],
    [T('Europa occidental se divide en muchos reinos pequeños', 'Western Europe splits into many small kingdoms', 'Europa occidental es divideix en molts regnes petits'),
      T('El Imperio de Oriente (bizantino) dura mil años más', 'The Eastern (Byzantine) Empire lasts another thousand years', 'L’Imperi d’Orient (bizantí) dura mil anys més')]),
  711: X(
    [T('Crisis del reino visigodo: hambre y epidemias', 'Crisis in the Visigothic kingdom: famine and epidemics', 'Crisi del regne visigot: fam i epidèmies'),
      T('Es fácil cruzar el estrecho de Gibraltar desde África', 'The Strait of Gibraltar is easy to cross from Africa', 'És fàcil travessar l’estret de Gibraltar des d’Àfrica')],
    [T('Córdoba, capital del califato y gran ciudad de Europa', 'Córdoba, capital of the caliphate and a great European city', 'Còrdova, capital del califat i gran ciutat d’Europa'),
      T('Comienza la Reconquista, que durará casi 800 años', 'The Reconquista begins and lasts almost 800 years', 'Comença la Reconquesta, que durarà gairebé 800 anys')]),
  cruzadas: X(
    [T('El emperador bizantino Alejo I pide ayuda a Occidente', 'Byzantine Emperor Alexios I asks the West for help', 'L’emperador bizantí Aleix I demana ajuda a Occident'),
      T('El papa promete el perdón de los pecados a los cruzados', 'The Pope promises crusaders forgiveness for their sins', 'El papa promet el perdó dels pecats als croats')],
    [T('Órdenes militares como los templarios', 'Military orders such as the Templars', 'Ordes militars com els templers'),
      T('Llegan a Europa el azúcar y las especias de Oriente', 'Sugar and spices from the East reach Europe', 'Arriben a Europa el sucre i les espècies d’Orient')]),
  'peste-negra': X(
    [T('Llega desde Asia por las rutas comerciales del mar Negro', 'It arrives from Asia along the Black Sea trade routes', 'Arriba des d’Àsia per les rutes comercials del mar Negre'),
      T('La medicina medieval no sabía cómo frenar el contagio', 'Medieval medicine did not know how to stop it spreading', 'La medicina medieval no sabia com aturar el contagi')],
    [T('Persecución de judíos, acusados de envenenar los pozos', 'Jews persecuted, accused of poisoning wells', 'Persecució de jueus, acusats d’enverinar els pous'),
      T('Aldeas abandonadas y campos sin cultivar', 'Abandoned villages and untilled fields', 'Llogarets abandonats i camps sense conrear')]),
  imprenta: X(
    [T('Gutenberg adapta las prensas de uva y de aceite', 'Gutenberg adapts wine and olive presses', 'Gutenberg adapta les premses de raïm i d’oli'),
      T('Una tinta al aceite que se fija bien al metal', 'An oil-based ink that sticks well to metal', 'Una tinta a l’oli que es fixa bé al metall')],
    [T('La Biblia de Gutenberg, primer gran libro impreso', 'The Gutenberg Bible, the first great printed book', 'La Bíblia de Gutenberg, primer gran llibre imprès'),
      T('Más libros en lenguas vernáculas, no solo en latín', 'More books in everyday languages, not just Latin', 'Més llibres en llengües vernacles, no només en llatí')]),
  america: X(
    [T('Los turcos toman Constantinopla (1453) y dificultan el comercio con Oriente', 'The Turks take Constantinople (1453) and hinder trade with the East', 'Els turcs prenen Constantinoble (1453) i dificulten el comerç amb Orient'),
      T('Tras la toma de Granada, Castilla puede financiar otras empresas', 'After taking Granada, Castile can fund other ventures', 'Després de la presa de Granada, Castella pot finançar altres empreses')],
    [T('Tratado de Tordesillas (1494) entre Castilla y Portugal', 'The Treaty of Tordesillas (1494) between Castile and Portugal', 'Tractat de Tordesillas (1494) entre Castella i Portugal'),
      T('Llegan a América el caballo, el trigo y la vaca', 'Horses, wheat and cattle reach America', 'Arriben a Amèrica el cavall, el blat i la vaca')]),
  reforma: X(
    [T('Príncipes alemanes molestos con el poder del papa', 'German princes resentful of the Pope’s power', 'Prínceps alemanys molestos amb el poder del papa'),
      T('Humanistas que piden leer la Biblia directamente', 'Humanists calling for people to read the Bible directly', 'Humanistes que demanen llegir la Bíblia directament')],
    [T('Enrique VIII rompe con Roma: nace la Iglesia anglicana', 'Henry VIII breaks with Rome: the Church of England is born', 'Enric VIII trenca amb Roma: neix l’Església anglicana'),
      T('Nace la Compañía de Jesús (1540)', 'The Society of Jesus is founded (1540)', 'Neix la Companyia de Jesús (1540)')]),
  ilustracion: X(
    [T('Influencia de Locke y del parlamento inglés', 'The influence of Locke and the English Parliament', 'Influència de Locke i del parlament anglès'),
      T('Salones y cafés donde se debatían ideas nuevas', 'Salons and coffee houses where new ideas were debated', 'Salons i cafès on es debatien idees noves')],
    [T('Beccaria critica la tortura y la pena de muerte', 'Beccaria criticises torture and the death penalty', 'Beccaria critica la tortura i la pena de mort'),
      T('Reformas de Carlos III en España', 'Charles III’s reforms in Spain', 'Reformes de Carles III a Espanya')]),
  'independencia-eeuu': X(
    [T('Gran Bretaña, endeudada tras la guerra de los Siete Años, sube impuestos', 'Britain, in debt after the Seven Years’ War, raises taxes', 'La Gran Bretanya, endeutada després de la guerra dels Set Anys, apuja impostos'),
      T('Los británicos prohíben colonizar al oeste de los Apalaches', 'Britain forbids settlement west of the Appalachians', 'Els britànics prohibeixen colonitzar a l’oest dels Apalatxes')],
    [T('George Washington, primer presidente (1789)', 'George Washington becomes the first president (1789)', 'George Washington, primer president (1789)'),
      T('Francia, aliada de los colonos, queda endeudada', 'France, the colonists’ ally, is left in debt', 'França, aliada dels colons, queda endeutada')]),
  'rev-francesa': X(
    [T('Bancarrota de la monarquía de Luis XVI', 'The bankruptcy of Louis XVI’s monarchy', 'Fallida de la monarquia de Lluís XVI'),
      T('Convocatoria de los Estados Generales (1789)', 'The calling of the Estates-General (1789)', 'Convocatòria dels Estats Generals (1789)')],
    [T('Ejecución de Luis XVI en la guillotina (1793)', 'Louis XVI is guillotined (1793)', 'Execució de Lluís XVI a la guillotina (1793)'),
      T('Napoleón Bonaparte llega al poder', 'Napoleon Bonaparte comes to power', 'Napoleó Bonaparte arriba al poder')]),
  'rev-industrial': X(
    [T('Capital acumulado gracias al comercio colonial', 'Capital built up through colonial trade', 'Capital acumulat gràcies al comerç colonial'),
      T('Inventos textiles como la lanzadera volante', 'Textile inventions such as the flying shuttle', 'Invents tèxtils com la llançadora volant')],
    [T('Trabajo infantil y jornadas de 14 horas en las fábricas', 'Child labour and 14-hour days in the factories', 'Treball infantil i jornades de 14 hores a les fàbriques'),
      T('Humo de carbón y ríos contaminados en las ciudades industriales', 'Coal smoke and polluted rivers in industrial towns', 'Fum de carbó i rius contaminats a les ciutats industrials')]),
  'guerra-independencia': X(
    [T('Tratado de Fontainebleau (1807) entre Godoy y Napoleón', 'The Treaty of Fontainebleau (1807) between Godoy and Napoleon', 'Tractat de Fontainebleau (1807) entre Godoy i Napoleó'),
      T('Motín de Aranjuez: cae Godoy y abdica Carlos IV', 'The Mutiny of Aranjuez: Godoy falls and Charles IV abdicates', 'Motí d’Aranjuez: cau Godoy i abdica Carles IV')],
    [T('Fernando VII vuelve y restablece el absolutismo (1814)', 'Ferdinand VII returns and restores absolutism (1814)', 'Ferran VII torna i restableix l’absolutisme (1814)'),
      T('La palabra «guerrilla» pasa a otros idiomas', 'The word «guerrilla» passes into other languages', 'La paraula «guerrilla» passa a altres idiomes')]),
  secesion: X(
    [T('El movimiento abolicionista crece en el Norte', 'The abolitionist movement grows in the North', 'El moviment abolicionista creix al Nord'),
      T('Los estados del Sur se separan y forman la Confederación', 'The Southern states secede and form the Confederacy', 'Els estats del Sud se separen i formen la Confederació')],
    [T('Asesinato de Lincoln (1865)', 'Lincoln’s assassination (1865)', 'Assassinat de Lincoln (1865)'),
      T('Reconstrucción del Sur derrotado', 'The Reconstruction of the defeated South', 'Reconstrucció del Sud derrotat')]),
  98: X(
    [T('Insurrección en Filipinas (1896)', 'The uprising in the Philippines (1896)', 'Insurrecció a les Filipines (1896)'),
      T('Una flota española anticuada frente a la de EE. UU.', 'An outdated Spanish fleet against the US Navy', 'Una flota espanyola antiquada davant la dels EUA')],
    [T('Cuba se independiza bajo la influencia de EE. UU.', 'Cuba becomes independent under US influence', 'Cuba s’independitza sota la influència dels EUA'),
      T('EE. UU. se convierte en potencia mundial', 'The USA becomes a world power', 'Els EUA es converteixen en potència mundial')]),
  igm: X(
    [T('Nacionalismos enfrentados en los Balcanes', 'Rival nationalisms in the Balkans', 'Nacionalismes enfrontats als Balcans'),
      T('Francia quiere recuperar Alsacia y Lorena', 'France wants to win back Alsace and Lorraine', 'França vol recuperar Alsàcia i Lorena')],
    [T('Creación de la Sociedad de Naciones (1919)', 'The League of Nations is set up (1919)', 'Creació de la Societat de Nacions (1919)'),
      T('Las mujeres ocupan puestos en las fábricas', 'Women take jobs in the factories', 'Les dones ocupen llocs a les fàbriques')]),
  'rev-rusa': X(
    [T('Revolución de febrero: el zar abdica', 'The February Revolution: the Tsar abdicates', 'Revolució de febrer: el tsar abdica'),
      T('Lenin promete «paz, pan y tierra»', 'Lenin promises «peace, bread and land»', 'Lenin promet «pau, pa i terra»')],
    [T('Nacionalización de tierras y fábricas', 'Land and factories are nationalised', 'Nacionalització de terres i fàbriques'),
      T('Ejecución del zar y su familia (1918)', 'The Tsar and his family are executed (1918)', 'Execució del tsar i la seva família (1918)')]),
  crack: X(
    [T('Salarios bajos que frenaban el consumo en EE. UU.', 'Low wages holding back spending in the USA', 'Salaris baixos que frenaven el consum als EUA'),
      T('Caída de los precios agrícolas en EE. UU.', 'Falling farm prices in the USA', 'Caiguda dels preus agrícoles als EUA')],
    [T('EE. UU. retira sus préstamos y la crisis llega a Europa', 'The USA calls in its loans and the crisis reaches Europe', 'Els EUA retiren els préstecs i la crisi arriba a Europa'),
      T('Proteccionismo: los países suben los aranceles', 'Protectionism: countries raise tariffs', 'Proteccionisme: els països apugen els aranzels')]),
  nazismo: X(
    [T('Propaganda de Goebbels y mítines de masas', 'Goebbels’s propaganda and mass rallies', 'Propaganda de Goebbels i mítings de masses'),
      T('Hindenburg nombra canciller a Hitler (enero de 1933)', 'Hindenburg appoints Hitler chancellor (January 1933)', 'Hindenburg nomena canceller Hitler (gener de 1933)')],
    [T('Incendio del Reichstag y persecución de opositores', 'The Reichstag fire and the persecution of opponents', 'Incendi del Reichstag i persecució d’opositors'),
      T('Primer campo de concentración en Dachau (1933)', 'The first concentration camp at Dachau (1933)', 'Primer camp de concentració a Dachau (1933)')]),
  gce: X(
    [T('Asesinato de Calvo Sotelo (julio de 1936)', 'The murder of Calvo Sotelo (July 1936)', 'Assassinat de Calvo Sotelo (juliol de 1936)'),
      T('Huelgas y desórdenes tras ganar el Frente Popular (1936)', 'Strikes and unrest after the Popular Front won (1936)', 'Vagues i desordres després de guanyar el Front Popular (1936)')],
    [T('Cartillas de racionamiento hasta 1952', 'Ration books until 1952', 'Cartilles de racionament fins al 1952'),
      T('Censura y prohibición de partidos y sindicatos', 'Censorship and a ban on parties and unions', 'Censura i prohibició de partits i sindicats')]),
  iigm: X(
    [T('Pacto germano-soviético (agosto de 1939)', 'The Nazi-Soviet Pact (August 1939)', 'Pacte germanosoviètic (agost de 1939)'),
      T('La Sociedad de Naciones no logra frenar las agresiones', 'The League of Nations fails to stop aggression', 'La Societat de Nacions no aconsegueix frenar les agressions')],
    [T('Juicios de Núremberg a los dirigentes nazis', 'The Nuremberg trials of Nazi leaders', 'Judicis de Nuremberg als dirigents nazis'),
      T('Plan Marshall para reconstruir Europa occidental', 'The Marshall Plan to rebuild Western Europe', 'Pla Marshall per reconstruir l’Europa occidental')]),
  'guerra-fria': X(
    [T('Discurso del «telón de acero» de Churchill (1946)', 'Churchill’s «Iron Curtain» speech (1946)', 'Discurs del «teló d’acer» de Churchill (1946)'),
      T('Doctrina Truman para frenar el comunismo (1947)', 'The Truman Doctrine to contain communism (1947)', 'Doctrina Truman per frenar el comunisme (1947)')],
    [T('Nacen la OTAN (1949) y el Pacto de Varsovia (1955)', 'NATO (1949) and the Warsaw Pact (1955) are founded', 'Neixen l’OTAN (1949) i el Pacte de Varsòvia (1955)'),
      T('Construcción del muro de Berlín (1961)', 'The Berlin Wall is built (1961)', 'Construcció del mur de Berlín (1961)')]),
  descolonizacion: X(
    [T('Soldados de las colonias que lucharon en la Segunda Guerra Mundial', 'Colonial soldiers who fought in the Second World War', 'Soldats de les colònies que van lluitar a la Segona Guerra Mundial'),
      T('Líderes locales formados en universidades europeas', 'Local leaders educated at European universities', 'Líders locals formats a universitats europees')],
    [T('Conferencia de Bandung (1955) y los países no alineados', 'The Bandung Conference (1955) and the Non-Aligned countries', 'Conferència de Bandung (1955) i els països no alineats'),
      T('Guerras de independencia, como la de Argelia (1954-1962)', 'Wars of independence, such as Algeria’s (1954-1962)', 'Guerres d’independència, com la d’Algèria (1954-1962)')]),
  transicion: X(
    [T('Crisis económica del petróleo de 1973', 'The 1973 oil crisis', 'Crisi econòmica del petroli de 1973'),
      T('Presión de partidos y sindicatos clandestinos', 'Pressure from underground parties and unions', 'Pressió de partits i sindicats clandestins')],
    [T('Ley de Amnistía (1977)', 'The Amnesty Law (1977)', 'Llei d’Amnistia (1977)'),
      T('Entrada de España en la Comunidad Europea (1986)', 'Spain joins the European Community (1986)', 'Entrada d’Espanya a la Comunitat Europea (1986)')]),
  muro: X(
    [T('Hungría abre su frontera con Austria (1989)', 'Hungary opens its border with Austria (1989)', 'Hongria obre la frontera amb Àustria (1989)'),
      T('Miles de alemanes del Este huyen al Oeste', 'Thousands of East Germans flee to the West', 'Milers d’alemanys de l’Est fugen a l’Oest')],
    [T('La Unión Europea se amplía hacia el Este', 'The European Union expands eastwards', 'La Unió Europea s’amplia cap a l’Est'),
      T('EE. UU. queda como única superpotencia', 'The USA is left as the only superpower', 'Els EUA queden com a única superpotència')]),
}
