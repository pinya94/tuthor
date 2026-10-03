// «Sobre este examen» de los exámenes con envoltorio propio (ni ExamenMC ni
// MechanicExam, que ya pintan el suyo). Lo pinta SobreExamenAuto debajo de la
// página según la URL (sin prefijo de idioma). Cada texto está escrito para su
// examen: describe la mecánica real y por qué sirve. No es una plantilla.
const T = (es, en, ca) => ({ es, en, ca })

export const SOBRE_EXAMEN = {
  '/examen/geomapa-espana': [
    T('En el mapa de España se marca una comunidad autónoma y hay que escribir cuál es. Si fallas, puedes ver su capital como pista. Entran las quince comunidades de la Península, en orden aleatorio, así que cada intento es distinto.',
      'A Spanish autonomous community is highlighted on the map and you type which one it is. If you miss, you can see its capital as a hint. The fifteen communities on the mainland come up in random order, so every attempt is different.',
      'Al mapa d’Espanya es marca una comunitat autònoma i cal escriure quina és. Si falles, pots veure’n la capital com a pista. Hi entren les quinze comunitats de la Península, en ordre aleatori, així que cada intent és diferent.'),
    T('Es el contenido de Ciencias Sociales de Primaria que más se pregunta: situar cada comunidad, saber cuáles son vecinas y relacionarlas con su capital. Se aprende mucho más rápido señalando que leyendo una lista.',
      'It is the most-asked topic of primary-school social studies in Spain: placing each community, knowing which are neighbours and linking them to their capital. You learn it much faster by pointing than by reading a list.',
      'És el contingut de Ciències Socials de Primària que més es pregunta: situar cada comunitat, saber quines són veïnes i relacionar-les amb la seva capital. S’aprèn molt més de pressa assenyalant que llegint una llista.'),
  ],
  '/examen/geomapa-eeuu': [
    T('En el mapa de Estados Unidos se marca un estado y hay que escribir su nombre. Si fallas, ves su capital como pista. Hay cincuenta estados y en cada intento salen diez al azar, desde los enormes del oeste hasta los pequeños de la costa este.',
      'A state is highlighted on the map of the United States and you type its name. If you miss, you see its capital as a hint. There are fifty states and each attempt draws ten at random, from the huge western ones to the small East Coast states.',
      'Al mapa dels Estats Units es marca un estat i cal escriure’n el nom. Si falles, en veus la capital com a pista. Hi ha cinquanta estats i a cada intent en surten deu a l’atzar, des dels enormes de l’oest fins als petits de la costa est.'),
    T('Muy útil para quien estudia inglés o historia de Estados Unidos: los nombres de los estados aparecen continuamente en noticias, películas y textos, y saber dónde está cada uno ayuda a entenderlos.',
      'Very useful for anyone studying English or US history: state names come up constantly in the news, films and texts, and knowing where each one is helps you understand them.',
      'Molt útil per a qui estudia anglès o història dels Estats Units: els noms dels estats apareixen contínuament en notícies, pel·lícules i textos, i saber on és cadascun ajuda a entendre’ls.'),
  ],
  '/examen/punto-equilibrio': [
    T('El punto de equilibrio es la cantidad que una empresa tiene que vender para no ganar ni perder: Q = CF / (P − CVu), los costes fijos entre el margen que deja cada unidad. En este examen hay que calcularlo y escribir el número, como en un examen de Economía de la Empresa de 2.º de Bachillerato, no elegir entre opciones.',
      'The break-even point is how many units a company must sell to make neither a profit nor a loss: Q = FC / (P − VCu), fixed costs divided by the margin each unit leaves. In this exam you calculate it and type the number, as in a real Business Economics exam, instead of picking from options.',
      'El punt d’equilibri és la quantitat que una empresa ha de vendre per no guanyar ni perdre: Q = CF / (P − CVu), els costos fixos entre el marge que deixa cada unitat. En aquest examen cal calcular-lo i escriure el número, com en un examen d’Economia de l’Empresa de 2n de Batxillerat, no triar entre opcions.'),
    T('Los datos se generan para que el resultado salga siempre entero, así que no hay discusiones de redondeo. En los niveles altos se añaden preguntas de beneficio o pérdida a partir de unas ventas dadas, y qué pasa con el punto de equilibrio si sube el precio o los costes.',
      'The figures are generated so the answer is always a whole number, so there are no rounding arguments. Higher levels add questions on profit or loss from a given level of sales, and on what happens to the break-even point if price or costs go up.',
      'Les dades es generen perquè el resultat surti sempre enter, així que no hi ha discussions d’arrodoniment. Als nivells alts s’hi afegeixen preguntes de benefici o pèrdua a partir d’unes vendes donades, i què passa amb el punt d’equilibri si puja el preu o els costos.'),
  ],
  '/examen/tabla-periodica': [
    T('Un examen de la tabla periódica que sube de dificultad con el curso. En Primaria se pregunta el nombre de elementos muy conocidos a partir de su símbolo (O, Fe, Au…). En ESO entran más elementos y más tipos de pregunta: del nombre al símbolo, el número atómico o a qué familia pertenece. En Bachillerato, casi toda la tabla.',
      'A periodic table exam that gets harder by school year. At primary level you name very well-known elements from their symbol (O, Fe, Au…). At secondary level more elements and question types come in: name to symbol, atomic number or which family they belong to. At sixth-form level, nearly the whole table.',
      'Un examen de la taula periòdica que puja de dificultat amb el curs. A Primària es pregunta el nom d’elements molt coneguts a partir del símbol (O, Fe, Au…). A l’ESO hi entren més elements i més tipus de pregunta: del nom al símbol, el número atòmic o a quina família pertany. Al Batxillerat, gairebé tota la taula.'),
    T('Los símbolos que más confunden son los que vienen del latín: Fe (hierro, ferrum), Au (oro, aurum), Na (sodio, natrium) o K (potasio, kalium). Repetir el examen varias veces es la forma más rápida de que dejen de parecer arbitrarios.',
      'The most confusing symbols are the ones from Latin: Fe (iron, ferrum), Au (gold, aurum), Na (sodium, natrium) or K (potassium, kalium). Retaking the exam a few times is the quickest way to stop them feeling arbitrary.',
      'Els símbols que més confonen són els que vénen del llatí: Fe (ferro, ferrum), Au (or, aurum), Na (sodi, natrium) o K (potassi, kalium). Repetir l’examen unes quantes vegades és la manera més ràpida que deixin de semblar arbitraris.'),
  ],
  '/examen/portero': [
    T('Cada pregunta es una función y una portería dividida en zonas. Hay que calcular f(x₀), el valor de la función en el punto donde está la portería, y decidir por qué zona va el balón para pararlo. Es evaluar una función, pero con una consecuencia que se ve.',
      'Each question is a function and a goal split into zones. You calculate f(x₀), the value of the function where the goal is, and decide which zone the ball is heading for so you can save it. It is evaluating a function, but with a consequence you can see.',
      'Cada pregunta és una funció i una porteria dividida en zones. Cal calcular f(x₀), el valor de la funció al punt on és la porteria, i decidir per quina zona va la pilota per aturar-la. És avaluar una funció, però amb una conseqüència que es veu.'),
    T('Entran rectas, parábolas y otras funciones de ESO y Bachillerato. Son diez preguntas sin cronómetro, para hacerlas con calma y con papel si hace falta.',
      'Lines, parabolas and other secondary and sixth-form functions come up. There are ten questions with no timer, to do calmly and on paper if needed.',
      'Hi entren rectes, paràboles i altres funcions d’ESO i Batxillerat. Són deu preguntes sense cronòmetre, per fer-les amb calma i amb paper si cal.'),
  ],
  '/examen/trayectoria': [
    T('El balón sale de un punto y la portería está en otro: de varias funciones posibles, ¿cuál es la trayectoria que mete gol? Hay que leer la expresión de cada una (una recta, una parábola, una función a trozos) y comprobar si pasa por donde tiene que pasar.',
      'The ball starts at one point and the goal is at another: of several possible functions, which trajectory scores? You read each expression (a line, a parabola, a piecewise function) and check whether it passes where it needs to.',
      'La pilota surt d’un punt i la porteria és en un altre: de diverses funcions possibles, quina és la trajectòria que fa gol? Cal llegir l’expressió de cadascuna (una recta, una paràbola, una funció a trossos) i comprovar si passa per on ha de passar.'),
    T('Son diez preguntas que van de fáciles a difíciles, sin tiempo. Entrena justo lo que más cuesta de las funciones: relacionar la fórmula con la forma de la gráfica sin tener que dibujarla entera.',
      'There are ten questions going from easy to hard, with no timer. It trains exactly what is hardest about functions: linking the formula to the shape of the graph without having to draw it all.',
      'Són deu preguntes que van de fàcils a difícils, sense temps. Entrena just el que més costa de les funcions: relacionar la fórmula amb la forma de la gràfica sense haver de dibuixar-la sencera.'),
  ],
  '/examen/menor-a-mayor-test': [
    T('Aparece un número —una fracción, un decimal, un porcentaje o un negativo— y hay que colocarlo en su sitio entre los que ya están ordenados de menor a mayor. Cada error cuesta una vida y enseña el valor decimal del número para entender por qué iba ahí.',
      'A number appears — a fraction, a decimal, a percentage or a negative — and you place it among those already ordered from least to greatest. Each mistake costs a life and shows the number’s decimal value so you see why it belonged there.',
      'Apareix un nombre —una fracció, un decimal, un percentatge o un negatiu— i cal col·locar-lo al seu lloc entre els que ja estan ordenats de menor a major. Cada error costa una vida i mostra el valor decimal del nombre per entendre per què anava allà.'),
    T('Comparar 3/4 con 0,7 o con un 72 % obliga a pasar todo a la misma forma, que es la destreza que de verdad se evalúa en Primaria y ESO. Al final hay nota, como en un examen.',
      'Comparing 3/4 with 0.7 or with 72% forces you to put everything in the same form, which is the skill really being tested in primary and secondary school. You get a grade at the end, like an exam.',
      'Comparar 3/4 amb 0,7 o amb un 72 % obliga a passar-ho tot a la mateixa forma, que és la destresa que de debò s’avalua a Primària i ESO. Al final hi ha nota, com en un examen.'),
  ],
  '/examen/corrige-el-texto-test': [
    T('Sale un texto en castellano con varias faltas escondidas y se dice cuántas hay, pero no dónde ni de qué tipo: tildes, b y v, g y j, la h o palabras que suenan igual y se escriben distinto. Hay que leerlo entero y marcar las palabras mal escritas, igual que al repasar un examen propio antes de entregarlo.',
      'A Spanish text appears with several hidden mistakes, and you are told how many there are but not where or what kind: accents, b and v, g and j, silent h, or words that sound the same but are spelt differently. You read it all and mark the misspelt words, just as you would when checking your own exam before handing it in.',
      'Surt un text en castellà amb diverses faltes amagades i es diu quantes n’hi ha, però no on ni de quin tipus: accents, b i v, g i j, la h o paraules que sonen igual i s’escriuen diferent. Cal llegir-lo sencer i marcar les paraules mal escrites, igual que en repassar un examen propi abans de lliurar-lo.'),
    T('Marcar una palabra correcta también resta, así que no compensa marcar por si acaso. Son cuatro textos, sin reloj, con nota sobre diez y, al corregir, la regla de cada falta.',
      'Marking a correct word also counts against you, so marking just in case does not pay. There are four texts, no timer, a mark out of ten and, on correction, the rule behind each mistake.',
      'Marcar una paraula correcta també resta, així que no compensa marcar per si de cas. Són quatre textos, sense rellotge, amb nota sobre deu i, en corregir, la regla de cada falta.'),
  ],
  '/examen/corrige-el-texto-en-test': [
    T('Sale un texto en inglés con varias faltas escondidas y se dice cuántas hay, pero no dónde: errores de ortografía, palabras que suenan igual (their, there, they’re) o formas mal escritas. Hay que leerlo entero y marcar las palabras incorrectas.',
      'An English text appears with several hidden mistakes, and you are told how many there are but not where: spelling errors, words that sound the same (their, there, they’re) or misspelt forms. You read it all and mark the wrong words.',
      'Surt un text en anglès amb diverses faltes amagades i es diu quantes n’hi ha, però no on: errors d’ortografia, paraules que sonen igual (their, there, they’re) o formes mal escrites. Cal llegir-lo sencer i marcar les paraules incorrectes.'),
    T('Marcar una palabra correcta también resta, así que hay que estar seguro. Es una buena prueba de lectura atenta en inglés, más cercana a escribir de verdad que un ejercicio de rellenar huecos.',
      'Marking a correct word also counts against you, so you need to be sure. It is a good test of careful reading in English, closer to real writing than a fill-in-the-gaps exercise.',
      'Marcar una paraula correcta també resta, així que cal estar segur. És una bona prova de lectura atenta en anglès, més propera a escriure de debò que un exercici d’omplir buits.'),
  ],
  '/examen/historia': [
    T('Sale un acontecimiento histórico y hay que escribir el año en que ocurrió. No hace falta clavarlo: el examen calcula un margen según lo separados que estén los diez acontecimientos, y si te sales del margen se acaba. Cuanto más cerca, más puntos.',
      'A historical event appears and you type the year it happened. You do not need to be exact: the exam works out a margin based on how spread out the ten events are, and if you fall outside it, the exam ends. The closer you are, the more points.',
      'Surt un fet històric i cal escriure l’any en què va passar. No cal clavar-lo: l’examen calcula un marge segons com d’allunyats estiguin els deu fets, i si et surts del marge s’acaba. Com més a prop, més punts.'),
    T('Sirve para construir la cronología mental que pide la Historia: saber que la caída de Roma, el descubrimiento de América y la Revolución Francesa están separados por siglos, no solo memorizar fechas sueltas.',
      'It helps build the mental timeline that History requires: knowing that the fall of Rome, the discovery of America and the French Revolution are centuries apart, not just memorising isolated dates.',
      'Serveix per construir la cronologia mental que demana la Història: saber que la caiguda de Roma, el descobriment d’Amèrica i la Revolució Francesa estan separats per segles, no només memoritzar dates soltes.'),
  ],
  '/examen/diagnostico': [
    T('Un examen tipo «¿Quién es quién?»: hay varios candidatos (elementos químicos, órganos, rocas…) y van saliendo pistas una a una. Con cada pista hay que descartar los que ya no encajan hasta quedarse con el bueno. Cuantas menos pistas necesites, mejor nota.',
      'A «Guess Who?»-style exam: there are several candidates (chemical elements, organs, rocks…) and clues come up one by one. With each clue you rule out those that no longer fit until you are left with the right one. The fewer clues you need, the better your mark.',
      'Un examen tipus «Qui és qui?»: hi ha diversos candidats (elements químics, òrgans, roques…) i van sortint pistes una a una. Amb cada pista cal descartar els que ja no encaixen fins a quedar-se amb el bo. Com menys pistes necessitis, millor nota.'),
    T('Obliga a usar las propiedades de cada cosa para razonar, no solo a reconocer nombres: saber que el oxígeno no es un metal o que el estómago está en el aparato digestivo sirve para tachar candidatos.',
      'It makes you use each thing’s properties to reason, not just recognise names: knowing that oxygen is not a metal, or that the stomach belongs to the digestive system, is what lets you cross candidates out.',
      'Obliga a fer servir les propietats de cada cosa per raonar, no només a reconèixer noms: saber que l’oxigen no és un metall o que l’estómac és a l’aparell digestiu serveix per ratllar candidats.'),
  ],
}
// Los diagnósticos por tema comparten la explicación de la mecánica.
for (const id of ['tabla-periodica', 'sistema-digestivo', 'sistema-nervioso', 'rocas-minerales', 'estados-materia']) {
  SOBRE_EXAMEN['/examen/diagnostico/' + id] = SOBRE_EXAMEN['/examen/diagnostico']
}
