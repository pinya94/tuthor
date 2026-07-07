// El Intruso — word pools for ES / CA / EN at 3 difficulty levels
// Each question: { w: [word1,word2,word3,word4], o: 'odd_word', c: 'Category', e: 'Explanation' }

export const PREGUNTAS = {

  /* ─────────────────────── ESPAÑOL ─────────────────────── */
  es: {
    facil: [
      { w:['perro','gato','pájaro','mesa'],        o:'mesa',        c:'Animales',               e:'Mesa es un mueble, los demás son animales' },
      { w:['rojo','azul','verde','grande'],         o:'grande',      c:'Colores',                e:'Grande describe un tamaño, los demás son colores' },
      { w:['correr','saltar','nadar','libro'],      o:'libro',       c:'Verbos de movimiento',   e:'Libro es un sustantivo, los demás son verbos' },
      { w:['manzana','pera','plátano','zanahoria'], o:'zanahoria',   c:'Frutas',                 e:'La zanahoria es una verdura, las demás son frutas' },
      { w:['lunes','martes','miércoles','enero'],   o:'enero',       c:'Días de la semana',      e:'Enero es un mes, los demás son días de la semana' },
      { w:['médico','maestro','bombero','feliz'],   o:'feliz',       c:'Profesiones',            e:'Feliz es un adjetivo, los demás son profesiones' },
      { w:['España','Francia','Roma','Alemania'],   o:'Roma',        c:'Países',                 e:'Roma es una ciudad, los demás son países' },
      { w:['piano','guitarra','violín','pincel'],   o:'pincel',      c:'Instrumentos musicales', e:'Pincel es un utensilio, los demás son instrumentos musicales' },
      { w:['rosa','tulipán','margarita','roble'],   o:'roble',       c:'Flores',                 e:'El roble es un árbol, las demás son flores' },
      { w:['lluvia','nieve','viento','paraguas'],   o:'paraguas',    c:'Meteorología',           e:'El paraguas es un objeto, los demás son fenómenos meteorológicos' },
      { w:['triángulo','cuadrado','círculo','pirámide'], o:'pirámide', c:'Figuras planas',       e:'La pirámide es una figura en 3D, las demás son figuras planas' },
      { w:['París','Londres','Berlín','Europa'],    o:'Europa',      c:'Capitales europeas',     e:'Europa es un continente, las demás son ciudades' },
      { w:['mar','río','lago','desierto'],          o:'desierto',    c:'Masas de agua',          e:'El desierto no es una masa de agua, los demás sí lo son' },
      { w:['verano','invierno','otoño','mañana'],   o:'mañana',      c:'Estaciones del año',     e:'Mañana es una parte del día, los demás son estaciones' },
      { w:['naranja','limón','pomelo','fresa'],     o:'fresa',       c:'Frutas cítricas',        e:'La fresa no es una fruta cítrica, las demás sí lo son' },
      { w:['pan','leche','queso','cuchillo'],       o:'cuchillo',    c:'Alimentos',              e:'El cuchillo es un utensilio, los demás son alimentos' },
      { w:['uno','dos','tres','muchos'],            o:'muchos',      c:'Números',                e:'Muchos es un cuantificador indefinido, los demás son números concretos' },
      { w:['perder','ganar','empatar','jugar'],     o:'perder',      c:'Resultados de un partido', e:'Perder es un resultado negativo; ganar, empatar y jugar no implican necesariamente resultado' },
    ],
    medio: [
      { w:['béisbol','fútbol','baloncesto','ajedrez'],    o:'ajedrez',     c:'Anglicismos deportivos',    e:'Ajedrez viene del árabe, los demás son préstamos del inglés' },
      { w:['médico','cómodo','rápido','examen'],          o:'examen',      c:'Palabras esdrújulas',       e:'Examen es una palabra llana, las demás son esdrújulas' },
      { w:['alegría','tristeza','rapidez','saltar'],      o:'saltar',      c:'Sustantivos abstractos',    e:'Saltar es un verbo, los demás son sustantivos abstractos' },
      { w:['veloz','rápido','ágil','silencioso'],         o:'silencioso',  c:'Sinónimos de rápido',       e:'Silencioso significa callado, los demás son sinónimos de rápido' },
      { w:['enorme','diminuto','gigante','inmenso'],      o:'diminuto',    c:'Sinónimos de grande',       e:'Diminuto significa muy pequeño, los demás son sinónimos de grande' },
      { w:['naranja','limón','pomelo','fresa'],           o:'fresa',       c:'Frutas cítricas',           e:'La fresa no es una fruta cítrica, las demás sí lo son' },
      { w:['tomar','coger','agarrar','dejar'],            o:'dejar',       c:'Sinónimos de agarrar',      e:'Dejar significa soltar, es el antónimo; los demás significan agarrar' },
      { w:['hamburguesa','pizza','sushi','paella'],       o:'paella',      c:'Comida de origen extranjero', e:'La paella es española, los demás son platos de origen foráneo' },
      { w:['primero','segundo','quinto','mucho'],         o:'mucho',       c:'Números ordinales',         e:'Mucho es un cuantificador indefinido, los demás son números ordinales' },
      { w:['papel','cartón','plástico','cristal'],        o:'cristal',     c:'Reciclaje en el mismo contenedor', e:'El cristal va al contenedor verde, los demás van al azul o amarillo' },
      { w:['cuaderno','lápiz','borrador','mochila'],      o:'mochila',     c:'Útiles de escritura',       e:'La mochila es un contenedor, los demás son útiles para escribir o borrar' },
      { w:['reír','llorar','gritar','susurrar'],          o:'susurrar',    c:'Expresiones sonoras intensas', e:'Susurrar es hablar muy bajito, los demás implican una expresión sonora intensa' },
      { w:['frío','caliente','tibio','siempre'],          o:'siempre',     c:'Temperatura',               e:'Siempre es un adverbio de tiempo, los demás se refieren a temperatura' },
      { w:['hacer','poner','tener','saber'],              o:'saber',       c:'Verbos con pretérito irregular del mismo grupo', e:'Saber tiene irregularidades distintas; hacer/poner/tener forman el pretérito de forma similar (-hice, -puse, -tuve)' },
      { w:['café','sofá','mamá','casa'],                  o:'casa',        c:'Palabras agudas con tilde',  e:'Casa es llana y no lleva tilde; café, sofá y mamá son agudas y sí llevan tilde' },
      { w:['comer','beber','correr','estar'],             o:'estar',       c:'Verbos de necesidades físicas', e:'Estar es un verbo copulativo; comer, beber y correr expresan necesidades o acciones físicas' },
      { w:['pino','roble','olivo','rosa'],                o:'rosa',        c:'Árboles',                   e:'La rosa es un arbusto o planta, los demás son árboles' },
      { w:['historia','geografía','biología','fútbol'],   o:'fútbol',      c:'Asignaturas escolares',      e:'El fútbol es un deporte, los demás son asignaturas académicas' },
    ],
    dificil: [
      { w:['haber','deber','poder','tener'],              o:'tener',       c:'Verbos auxiliares o modales', e:'Tener no funciona como auxiliar en español moderno; haber, deber y poder sí (tiempos compuestos y perífrasis modales)' },
      { w:['efímero','fugaz','eterno','pasajero'],        o:'eterno',      c:'Sinónimos de transitorio',  e:'Eterno significa que dura para siempre; efímero, fugaz y pasajero son sinónimos de breve o transitorio' },
      { w:['epicentro','epidermis','epílogo','prólogo'],  o:'prólogo',     c:'Palabras con prefijo epi-', e:'Prólogo lleva el prefijo pro-, los demás llevan el prefijo epi-' },
      { w:['soslayar','eludir','sortear','afrontar'],     o:'afrontar',    c:'Sinónimos de evitar',       e:'Afrontar significa encarar directamente; los demás son sinónimos de esquivar o evitar' },
      { w:['diáfano','translúcido','opaco','transparente'], o:'opaco',     c:'Materiales que dejan pasar la luz', e:'Opaco no deja pasar la luz; los demás sí la dejan pasar en mayor o menor grado' },
      { w:['arcaísmo','neologismo','préstamo','sinónimo'], o:'sinónimo',   c:'Fenómenos del cambio léxico', e:'Sinónimo es una relación semántica; los demás describen fenómenos de cambio en el vocabulario' },
      { w:['apócope','síncopa','aféresis','metátesis'],   o:'metátesis',   c:'Fenómenos de pérdida de sonidos', e:'La metátesis es un cambio de posición de sonidos, no una pérdida; los demás implican supresión de fonemas' },
      { w:['gerundio','infinitivo','participio','pronombre'], o:'pronombre', c:'Formas no personales del verbo', e:'El pronombre es una categoría nominal; gerundio, infinitivo y participio son formas no personales del verbo' },
      { w:['pleonasmo','oxímoron','hipérbole','onomatopeya'], o:'onomatopeya', c:'Figuras retóricas semánticas', e:'La onomatopeya es un recurso fónico, no semántico; las demás operan sobre el significado' },
      { w:['euforia','melancolía','nostalgia','alegría'], o:'alegría',     c:'Palabras de origen griego', e:'Alegría tiene raíz latina/germánica; euforia, melancolía y nostalgia son de origen griego' },
      { w:['cóncavo','convexo','plano','esférico'],       o:'esférico',    c:'Tipos de curvatura de una superficie', e:'Esférico describe un sólido 3D; cóncavo, convexo y plano describen tipos de curvatura de una superficie' },
      { w:['paródia','sátira','ironía','metáfora'],       o:'metáfora',    c:'Figuras de tono crítico o humorístico', e:'La metáfora es una figura de sustitución semántica; parodia, sátira e ironía implican un tono crítico o humorístico' },
      { w:['catarsis','éxtasis','anagnórisis','écfrasis'], o:'écfrasis',   c:'Conceptos de teoría dramática', e:'La écfrasis es una descripción literaria de una obra de arte; las demás son conceptos de teoría dramática o narrativa' },
      { w:['hiperonimia','hiponimia','polisemia','antonimia'], o:'antonimia', c:'Relaciones semánticas de inclusión o similitud', e:'La antonimia es una relación de oposición; hiperonimia, hiponimia y polisemia se refieren a relaciones de inclusión o multiplicidad de significados' },
      { w:['grafema','fonema','morfema','lexema'],         o:'grafema',     c:'Unidades lingüísticas abstractas', e:'El grafema es una unidad gráfica (escritura); fonema, morfema y lexema son unidades abstractas de la lengua oral o gramatical' },
    ],
  },

  /* ─────────────────────── CATALÀ ─────────────────────── */
  ca: {
    facil: [
      { w:['gat','gos','ocell','taula'],              o:'taula',       c:'Animals',               e:'La taula és un moble, els altres són animals' },
      { w:['vermell','blau','verd','gran'],            o:'gran',        c:'Colors',                e:'Gran descriu una mida, els altres són colors' },
      { w:['córrer','saltar','nedar','llibre'],        o:'llibre',      c:'Verbs de moviment',     e:'Llibre és un substantiu, els altres són verbs' },
      { w:['poma','pera','plàtan','pastanaga'],        o:'pastanaga',   c:'Fruites',               e:'La pastanaga és una verdura, les altres són fruites' },
      { w:['dilluns','dimarts','dimecres','gener'],    o:'gener',       c:'Dies de la setmana',    e:'Gener és un mes, els altres són dies de la setmana' },
      { w:['metge','mestre','bomber','feliç'],         o:'feliç',       c:'Professions',           e:'Feliç és un adjectiu, els altres són professions' },
      { w:['Espanya','França','Roma','Alemanya'],      o:'Roma',        c:'Països',                e:'Roma és una ciutat, els altres són països' },
      { w:['piano','guitarra','violí','pinzell'],      o:'pinzell',     c:'Instruments musicals',  e:'El pinzell és un estri de pintura, els altres són instruments' },
      { w:['rosa','tulipa','margarida','roure'],       o:'roure',       c:'Flors',                 e:'El roure és un arbre, les altres són flors' },
      { w:['pluja','neu','vent','paraigua'],           o:'paraigua',    c:'Meteorologia',          e:'El paraigua és un objecte, els altres són fenòmens meteorològics' },
      { w:['triangle','quadrat','cercle','piràmide'],  o:'piràmide',    c:'Figures planes',        e:'La piràmide és una figura en 3D, les altres són figures planes' },
      { w:['París','Londres','Berlín','Europa'],       o:'Europa',      c:'Capitals europees',     e:'Europa és un continent, les altres són ciutats' },
      { w:['mar','riu','llac','desert'],               o:'desert',      c:'Masses d\'aigua',       e:'El desert no és una massa d\'aigua, els altres sí que ho són' },
      { w:['estiu','hivern','tardor','matí'],          o:'matí',        c:'Estacions de l\'any',   e:'El matí és una part del dia, els altres són estacions' },
      { w:['taronja','llimona','pomelo','maduixa'],    o:'maduixa',     c:'Fruites cítriques',     e:'La maduixa no és una fruita cítrica, les altres sí que ho són' },
      { w:['pa','llet','formatge','ganivet'],          o:'ganivet',     c:'Aliments',              e:'El ganivet és un estri, els altres són aliments' },
      { w:['u','dos','tres','molts'],                  o:'molts',       c:'Números',               e:'Molts és un quantificador indefinit, els altres són números concrets' },
    ],
    medio: [
      { w:['bàsquet','futbol','beisbol','escacs'],          o:'escacs',      c:'Anglicismes esportius',    e:'Escacs prové de l\'àrab, els altres són préstecs de l\'anglès' },
      { w:['mèdic','còmode','ràpid','examen'],              o:'examen',      c:'Paraules esdrúixoles',     e:'Examen és una paraula plana, les altres són esdrúixoles' },
      { w:['alegria','tristesa','rapidesa','saltar'],        o:'saltar',      c:'Substantius abstractes',   e:'Saltar és un verb, els altres són substantius abstractes' },
      { w:['veloç','ràpid','àgil','silenciós'],             o:'silenciós',   c:'Sinònims de ràpid',        e:'Silenciós significa callat, els altres són sinònims de ràpid' },
      { w:['enorme','diminut','gegant','immens'],           o:'diminut',     c:'Sinònims de gran',         e:'Diminut significa molt petit, els altres són sinònims de gran' },
      { w:['agafar','prendre','atrapar','deixar'],          o:'deixar',      c:'Sinònims d\'agafar',       e:'Deixar significa soltar, és l\'antònim; els altres signifiquen agafar' },
      { w:['hamburguesa','pizza','sushi','paella'],         o:'paella',      c:'Menjar d\'origen estranger', e:'La paella és valenciana/espanyola, els altres plats són d\'origen estranger' },
      { w:['primer','segon','cinquè','molt'],               o:'molt',        c:'Números ordinals',         e:'Molt és un quantificador indefinit, els altres són números ordinals' },
      { w:['paper','cartró','plàstic','vidre'],             o:'vidre',       c:'Materials del mateix contenidor de reciclatge', e:'El vidre va al contenidor verd, els altres van al blau o groc' },
      { w:['quadern','llapis','goma','motxilla'],           o:'motxilla',    c:'Estris d\'escriptura',     e:'La motxilla és un contenidor, els altres són estris per escriure o esborrar' },
      { w:['riure','plorar','cridar','xiuxiuejar'],         o:'xiuxiuejar',  c:'Expressions sonores intenses', e:'Xiuxiuejar és parlar molt baix, els altres impliquen una expressió sonora intensa' },
      { w:['fred','calent','tebi','sempre'],                o:'sempre',      c:'Temperatura',              e:'Sempre és un adverbi de temps, els altres es refereixen a temperatura' },
      { w:['fer','posar','tenir','saber'],                  o:'saber',       c:'Verbs irregulars del mateix grup', e:'Saber té irregularitats pròpies; fer, posar i tenir formen el pretérit de manera similar' },
      { w:['cafè','sofà','mamà','casa'],                    o:'casa',        c:'Paraules agudes amb accent', e:'Casa és plana i no porta accent; cafè, sofà i mamà són agudes i sí porten accent' },
      { w:['pi','roure','olivera','rosa'],                  o:'rosa',        c:'Arbres',                   e:'La rosa és un arbust o planta, els altres són arbres' },
      { w:['història','geografia','biologia','futbol'],     o:'futbol',      c:'Assignatures escolars',    e:'El futbol és un esport, els altres són assignatures acadèmiques' },
      { w:['menjar','beure','córrer','ser'],                o:'ser',         c:'Verbs de necessitats físiques', e:'Ser és un verb copulatiu; menjar, beure i córrer expressen necessitats o accions físiques' },
    ],
    dificil: [
      { w:['haver','deure','poder','tenir'],                 o:'tenir',       c:'Verbs auxiliars o modals', e:'Tenir no funciona com a auxiliar en català modern; haver, deure i poder sí (temps compostos i perífrasis modals)' },
      { w:['efímer','fugaç','etern','passatger'],           o:'etern',       c:'Sinònims de transitori',  e:'Etern significa que dura per sempre; efímer, fugaç i passatger són sinònims de breu o transitori' },
      { w:['epicentre','epidermis','epíleg','pròleg'],      o:'pròleg',      c:'Paraules amb prefix epi-', e:'Pròleg porta el prefix pro-, els altres porten el prefix epi-' },
      { w:['eludir','esquivar','defugir','afrontar'],       o:'afrontar',    c:'Sinònims d\'evitar',      e:'Afrontar significa encarar directament; els altres són sinònims d\'esquivar o evitar' },
      { w:['diàfan','translúcid','opac','transparent'],     o:'opac',        c:'Materials que deixen passar la llum', e:'Opac no deixa passar la llum; els altres sí que la deixen passar en major o menor grau' },
      { w:['arcaisme','neologisme','manlleu','sinònim'],    o:'sinònim',     c:'Fenòmens del canvi lèxic', e:'Sinònim és una relació semàntica; els altres descriuen fenòmens de canvi en el vocabulari' },
      { w:['apòcope','síncope','afereta','metàtesi'],       o:'metàtesi',    c:'Fenòmens de pèrdua de sons', e:'La metàtesi és un canvi de posició de sons, no una pèrdua; els altres impliquen supressió de fonemes' },
      { w:['gerundi','infinitiu','participi','pronom'],     o:'pronom',      c:'Formes no personals del verb', e:'El pronom és una categoria nominal; gerundi, infinitiu i participi són formes no personals del verb' },
      { w:['pleonasme','oxímoron','hipèrbole','onomatopeia'], o:'onomatopeia', c:'Figures retòriques semàntiques', e:'L\'onomatopeia és un recurs fònic, no semàntic; les altres operen sobre el significat' },
      { w:['eufòria','melancolia','nostàlgia','alegria'],   o:'alegria',     c:'Paraules d\'origen grec', e:'Alegria té arrel llatina/germànica; eufòria, melancolia i nostàlgia són d\'origen grec' },
      { w:['còncau','convex','pla','esfèric'],              o:'esfèric',     c:'Tipus de curvatura d\'una superfície', e:'Esfèric descriu un sòlid 3D; còncau, convex i pla descriuen tipus de curvatura d\'una superfície' },
      { w:['paròdia','sàtira','ironia','metàfora'],         o:'metàfora',    c:'Figures de to crític o humorístic', e:'La metàfora és una figura de substitució semàntica; paròdia, sàtira i ironia impliquen un to crític o humorístic' },
      { w:['catarsi','èxtasi','anagnòrisi','ècfrasi'],      o:'ècfrasi',     c:'Conceptes de teoria dramàtica', e:'L\'ecfrasi és una descripció literària d\'una obra d\'art; les altres són conceptes de teoria dramàtica' },
      { w:['gerundi','infinitiu','participi','adverbi'],    o:'adverbi',     c:'Formes no personals del verb',  e:'L\'adverbi és una categoria gramatical independent; gerundi, infinitiu i participi són formes no personals del verb' },
      { w:['grafema','fonema','morfema','lexema'],          o:'grafema',     c:'Unitats lingüístiques abstractes', e:'El grafema és una unitat gràfica (escriptura); fonema, morfema i lexema són unitats abstractes de la llengua oral o gramatical' },
    ],
  },

  /* ─────────────────────── ENGLISH ─────────────────────── */
  en: {
    facil: [
      { w:['dog','cat','bird','table'],               o:'table',       c:'Animals',               e:'A table is furniture, the others are animals' },
      { w:['red','blue','green','big'],               o:'big',         c:'Colours',               e:'"Big" describes a size, the others are colours' },
      { w:['run','jump','swim','book'],               o:'book',        c:'Verbs of movement',     e:'"Book" is a noun, the others are verbs' },
      { w:['apple','pear','banana','carrot'],         o:'carrot',      c:'Fruits',                e:'A carrot is a vegetable, the others are fruits' },
      { w:['Monday','Tuesday','Wednesday','January'], o:'January',     c:'Days of the week',      e:'January is a month, the others are days of the week' },
      { w:['doctor','teacher','fireman','happy'],     o:'happy',       c:'Jobs',                  e:'"Happy" is an adjective, the others are jobs' },
      { w:['Spain','France','Rome','Germany'],        o:'Rome',        c:'Countries',             e:'Rome is a city, the others are countries' },
      { w:['piano','guitar','violin','brush'],        o:'brush',       c:'Musical instruments',   e:'A brush is a painting tool, the others are instruments' },
      { w:['rose','tulip','daisy','oak'],             o:'oak',         c:'Flowers',               e:'An oak is a tree, the others are flowers' },
      { w:['rain','snow','wind','umbrella'],          o:'umbrella',    c:'Weather phenomena',     e:'An umbrella is an object, the others are weather phenomena' },
      { w:['triangle','square','circle','pyramid'],   o:'pyramid',     c:'2D shapes',             e:'A pyramid is a 3D solid, the others are flat shapes' },
      { w:['Paris','London','Berlin','Europe'],       o:'Europe',      c:'European capitals',     e:'Europe is a continent, the others are cities' },
      { w:['sea','river','lake','desert'],            o:'desert',      c:'Bodies of water',       e:'A desert has no water, the others are bodies of water' },
      { w:['summer','winter','autumn','morning'],     o:'morning',     c:'Seasons',               e:'"Morning" is a time of day, the others are seasons' },
      { w:['orange','lemon','grapefruit','strawberry'], o:'strawberry', c:'Citrus fruits',        e:'Strawberry is not a citrus fruit, the others are' },
      { w:['bread','milk','cheese','knife'],          o:'knife',       c:'Foods',                 e:'A knife is a utensil, the others are foods' },
      { w:['one','two','three','many'],               o:'many',        c:'Numbers',               e:'"Many" is an indefinite quantity, the others are specific numbers' },
    ],
    medio: [
      { w:['knife','knock','kneel','keep'],           o:'keep',        c:'Words with a silent k', e:'"Keep" has a pronounced k; knife, knock and kneel all have a silent k' },
      { w:['nation','station','action','fashion'],    o:'fashion',     c:'Words ending in -tion', e:'"Fashion" ends in -shion (not -tion); the others genuinely end in -tion' },
      { w:['children','mice','oxen','deers'],         o:'deers',       c:'Irregular plurals',     e:'"Deers" does not exist; deer is its own plural. The others are correct irregular plurals' },
      { w:['honest','hour','heir','hero'],            o:'hero',        c:'Words with a silent h', e:'"Hero" has a pronounced h; honest, hour and heir begin with a silent h' },
      { w:['sheep','deer','moose','goose'],           o:'goose',       c:'Animals with same singular and plural', e:'"Goose" becomes "geese"; sheep, deer and moose keep the same form in plural' },
      { w:['beautiful','gorgeous','stunning','ugly'], o:'ugly',        c:'Synonyms of beautiful', e:'"Ugly" means the opposite; the others all mean very attractive' },
      { w:['always','never','sometimes','quickly'],   o:'quickly',     c:'Adverbs of frequency',  e:'"Quickly" is an adverb of manner; the others say how often something happens' },
      { w:['fast','quick','swift','slow'],            o:'slow',        c:'Synonyms of fast',      e:'"Slow" is the antonym; the others all mean fast' },
      { w:['their','there','they\'re','through'],     o:'through',     c:'Homophones of "there"', e:'"Through" sounds different; their, there and they\'re are all pronounced /ðɛr/' },
      { w:['speak','spoke','spoken','speaked'],       o:'speaked',     c:'Forms of the verb "speak"', e:'"Speaked" does not exist; speak, spoke and spoken are the correct forms' },
      { w:['break','broke','broken','breaked'],       o:'breaked',     c:'Forms of the verb "break"', e:'"Breaked" is not a word; break, broke and broken are the correct forms' },
      { w:['bite','kite','site','kit'],               o:'kit',         c:'Words that rhyme with "bite"', e:'"Kit" rhymes with "bit" not "bite"; bite, kite and site all rhyme (/aɪt/)' },
      { w:['i.e.','e.g.','viz.','N.B.'],             o:'N.B.',        c:'Abbreviations introducing examples or equivalents', e:'"N.B." means "note well" (nota bene), a warning; the others introduce examples or equivalents' },
      { w:['affect','infect','detect','select'],      o:'affect',      c:'Words ending in -ect',  e:'"Affect" ends in -ect but has a different root; infect, detect and select all share the -ect suffix with a clear meaning' },
      { w:['prefix','suffix','infix','context'],      o:'context',     c:'Types of affix',        e:'"Context" is not a type of affix; prefix, suffix and infix are positions where an affix can appear' },
      { w:['synonym','antonym','homonym','acronym'],  o:'acronym',     c:'Word relationship terms', e:'An acronym is a word formed from initials; synonym, antonym and homonym all describe relationships between words' },
      { w:['joyful','cheerful','merry','miserable'],  o:'miserable',   c:'Synonyms of happy',     e:'"Miserable" means the opposite; the others are synonyms of happy' },
    ],
    dificil: [
      { w:['flaunt','flout','float','flute'],         o:'flute',       c:'Words often confused with "flaunt"', e:'Flute is a musical instrument; flaunt (show off), flout (disobey) and float are often confused together' },
      { w:['affect','effect','impact','cause'],       o:'cause',       c:'Words related to "consequence"',    e:'"Cause" is the opposite — it comes before; affect, effect and impact all relate to the result or consequence' },
      { w:['comprise','compose','consist','control'], o:'control',     c:'Verbs of composition',              e:'"Control" has no compositional meaning; comprise, compose and consist of all describe what something is made of' },
      { w:['allusion','illusion','elusion','delusion'], o:'elusion',   c:'Words that look like "illusion"',   e:'"Elusion" (evading) is less common and semantically distinct; allusion, illusion and delusion are commonly confused near-homophones' },
      { w:['sanguine','sanguinary','sanguineous','serene'], o:'serene', c:'Words derived from Latin sanguis (blood)', e:'"Serene" has no connection to blood; sanguine, sanguinary and sanguineous all derive from Latin "sanguis"' },
      { w:['irony','sarcasm','satire','simile'],      o:'simile',      c:'Forms of indirect or critical expression', e:'A simile is a direct comparison ("like a..."); irony, sarcasm and satire all involve indirect or critical expression' },
      { w:['mitigate','militate','arbitrate','negotiate'], o:'militate', c:'Commonly confused with "mitigate"', e:'"Militate against" means to work against something; mitigate, arbitrate and negotiate are commonly paired verbs in legal/formal use' },
      { w:['plethora','myriad','dearth','multitude'], o:'dearth',      c:'Synonyms of "many" or "abundance"', e:'"Dearth" means a lack or shortage; plethora, myriad and multitude all mean a great many' },
      { w:['apathy','empathy','sympathy','antipathy'], o:'apathy',     c:'Words ending in -pathy relating to feeling towards others', e:'"Apathy" is an absence of feeling; empathy, sympathy and antipathy all describe feelings directed towards others' },
      { w:['endemic','epidemic','pandemic','academic'], o:'academic',  c:'Words describing disease spread', e:'"Academic" has no medical meaning; endemic, epidemic and pandemic describe the geographic scope of disease spread' },
      { w:['presume','assume','consume','resume'],    o:'consume',     c:'Verbs meaning to take for granted or begin again', e:'"Consume" means to use up or eat; presume, assume and resume relate to supposition or continuation' },
      { w:['lexicon','syntax','morphology','biography'], o:'biography', c:'Branches of linguistics', e:'"Biography" is a type of text, not a branch of linguistics; lexicon, syntax and morphology are core areas of linguistics' },
      { w:['hyperbole','litotes','synecdoche','metaphor'], o:'metaphor', c:'Figures of speech involving understatement or part/whole', e:'"Metaphor" is a general substitution; hyperbole (overstatement), litotes (understatement) and synecdoche (part for whole) form a specific set' },
      { w:['noun','verb','adjective','clause'],       o:'clause',      c:'Parts of speech (word classes)', e:'A clause is a syntactic unit, not a word class; noun, verb and adjective are parts of speech' },
      { w:['connote','denote','devote','promote'],    o:'promote',     c:'Verbs related to meaning or reference', e:'"Promote" has no semantic/referential meaning; connote and denote relate to meaning, devote is sometimes confused with them' },
    ],
  },
}

export function getQuestionsForPool(lang, nivel, count = 10, seed = null) {
  const pool = PREGUNTAS[lang]?.[nivel] ?? PREGUNTAS.es.facil
  if (seed === null) {
    // Random mode: shuffle and take first `count`
    const arr = [...pool]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr.slice(0, Math.min(count, arr.length))
  } else {
    // Seeded mode for daily challenge: deterministic selection
    const arr = [...pool]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(((seed * (i + 1) * 2654435761) >>> 0) % (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr.slice(0, Math.min(count, arr.length))
  }
}
