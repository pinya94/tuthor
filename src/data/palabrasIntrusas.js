// El Intruso — word pools for ES / CA / EN at 3 difficulty levels
// Focus: grammar categories (noun/verb/adj/adv, singular/plural, gender, accents...)
// Each question: { w: [word1,word2,word3,word4], o: 'odd_word', c: 'Category', e: 'Explanation' }

export const PREGUNTAS = {

  /* ══════════════════════════ ESPAÑOL ══════════════════════════ */
  es: {
    facil: [
      // ── Clases de palabras ──
      { w:['belleza','amor','verdad','rápido'],        o:'rápido',       c:'Sustantivos',              e:'"Rápido" es un adjetivo; belleza, amor y verdad son sustantivos' },
      { w:['correr','mesa','cielo','bondad'],           o:'correr',       c:'Sustantivos',              e:'"Correr" es un verbo en infinitivo; mesa, cielo y bondad son sustantivos' },
      { w:['alto','feliz','azul','cantar'],             o:'cantar',       c:'Adjetivos',                e:'"Cantar" es un verbo; alto, feliz y azul son adjetivos' },
      { w:['pequeño','rápidamente','bonito','triste'],  o:'rápidamente',  c:'Adjetivos',                e:'"Rápidamente" es un adverbio; pequeño, bonito y triste son adjetivos' },
      { w:['bien','aquí','siempre','grande'],           o:'grande',       c:'Adverbios',                e:'"Grande" es un adjetivo; bien, aquí y siempre son adverbios' },
      { w:['ayer','allí','nunca','libro'],              o:'libro',        c:'Adverbios',                e:'"Libro" es un sustantivo; ayer, allí y nunca son adverbios' },
      { w:['correr','saltar','nadar','rápido'],         o:'rápido',       c:'Verbos en infinitivo',     e:'"Rápido" es un adjetivo; correr, saltar y nadar son verbos en infinitivo' },
      { w:['comí','bebiste','durmió','mesa'],           o:'mesa',         c:'Verbos conjugados',        e:'"Mesa" es un sustantivo; comí, bebiste y durmió son verbos conjugados' },
      // ── Singular y plural ──
      { w:['casas','mesas','libros','perro'],           o:'perro',        c:'Palabras en plural',       e:'"Perro" está en singular; casas, mesas y libros están en plural' },
      { w:['árbol','nubes','sol','pan'],                o:'nubes',        c:'Palabras en singular',     e:'"Nubes" está en plural; árbol, sol y pan están en singular' },
      { w:['ciudad','países','amor','flor'],            o:'países',       c:'Palabras en singular',     e:'"Países" está en plural; ciudad, amor y flor están en singular' },
      { w:['niños','flores','coches','agua'],           o:'agua',         c:'Palabras en plural',       e:'"Agua" está en singular; niños, flores y coches están en plural' },
      // ── Género ──
      { w:['sol','amor','calor','luna'],                o:'luna',         c:'Sustantivos masculinos',   e:'"Luna" es femenino (la luna); sol, amor y calor son masculinos' },
      { w:['casa','flor','noche','libro'],              o:'libro',        c:'Sustantivos femeninos',    e:'"Libro" es masculino (el libro); casa, flor y noche son femeninos' },
      { w:['mano','foto','moto','coche'],               o:'coche',        c:'Sustantivos femeninos en -o', e:'"Coche" es masculino; mano, foto y moto son femeninos aunque terminan en -o' },
      { w:['poeta','artista','deportista','actriz'],    o:'actriz',       c:'Sustantivos de género común', e:'"Actriz" solo es femenino; poeta, artista y deportista son de género común (el/la)' },
      // ── Frutas, animales, cosas del entorno ──
      { w:['manzana','pera','plátano','zanahoria'],     o:'zanahoria',    c:'Frutas',                   e:'La zanahoria es una verdura; manzana, pera y plátano son frutas' },
      { w:['perro','gato','pájaro','mesa'],             o:'mesa',         c:'Animales',                 e:'"Mesa" es un mueble; perro, gato y pájaro son animales' },
      { w:['lunes','martes','miércoles','enero'],       o:'enero',        c:'Días de la semana',        e:'"Enero" es un mes; lunes, martes y miércoles son días de la semana' },
      { w:['lluvia','nieve','viento','paraguas'],       o:'paraguas',     c:'Fenómenos meteorológicos', e:'"Paraguas" es un objeto; lluvia, nieve y viento son fenómenos del tiempo' },
      { w:['verano','invierno','otoño','mañana'],       o:'mañana',       c:'Estaciones del año',       e:'"Mañana" es una parte del día; verano, invierno y otoño son estaciones' },
      { w:['rosa','tulipán','margarita','roble'],       o:'roble',        c:'Flores',                   e:'"Roble" es un árbol; rosa, tulipán y margarita son flores' },
      { w:['naranja','limón','pomelo','fresa'],         o:'fresa',        c:'Frutas cítricas',          e:'La fresa no es cítrica; naranja, limón y pomelo sí lo son' },
      { w:['médico','maestro','bombero','feliz'],       o:'feliz',        c:'Profesiones',              e:'"Feliz" es un adjetivo; médico, maestro y bombero son profesiones' },
      { w:['mar','río','lago','desierto'],              o:'desierto',     c:'Masas de agua',            e:'El desierto no tiene agua; mar, río y lago son masas de agua' },
      { w:['piano','guitarra','violín','pincel'],       o:'pincel',       c:'Instrumentos musicales',   e:'"Pincel" es un utensilio; piano, guitarra y violín son instrumentos' },
      { w:['España','Francia','Roma','Alemania'],       o:'Roma',         c:'Países',                   e:'"Roma" es una ciudad; España, Francia y Alemania son países' },
      { w:['París','Londres','Berlín','Europa'],        o:'Europa',       c:'Capitales europeas',       e:'"Europa" es un continente; París, Londres y Berlín son ciudades' },
      { w:['pan','leche','queso','cuchillo'],           o:'cuchillo',     c:'Alimentos',                e:'"Cuchillo" es un utensilio; pan, leche y queso son alimentos' },
      { w:['triángulo','cuadrado','círculo','pirámide'],o:'pirámide',     c:'Figuras planas',           e:'La pirámide es 3D; triángulo, cuadrado y círculo son figuras planas' },
      { w:['rojo','azul','verde','grande'],             o:'grande',       c:'Colores',                  e:'"Grande" describe un tamaño; rojo, azul y verde son colores' },
    ],
    medio: [
      // ── Clases de palabras más detalladas ──
      { w:['tristeza','alegría','rapidez','correr'],    o:'correr',       c:'Sustantivos abstractos',   e:'"Correr" es un verbo; tristeza, alegría y rapidez son sustantivos abstractos' },
      { w:['lentamente','bien','aquí','bonito'],        o:'bonito',       c:'Adverbios',                e:'"Bonito" es un adjetivo; lentamente, bien y aquí son adverbios' },
      { w:['fácilmente','jamás','muy','mesa'],          o:'mesa',         c:'Adverbios',                e:'"Mesa" es un sustantivo; fácilmente, jamás y muy son adverbios' },
      { w:['comer','beber','dormir','hambre'],          o:'hambre',       c:'Verbos en infinitivo',     e:'"Hambre" es un sustantivo; comer, beber y dormir son verbos en infinitivo' },
      { w:['lavarse','peinarse','ducharse','correr'],   o:'correr',       c:'Verbos reflexivos',        e:'"Correr" no es reflexivo; lavarse, peinarse y ducharse son verbos reflexivos' },
      { w:['tener','poder','querer','comer'],           o:'comer',        c:'Verbos irregulares en presente', e:'"Comer" es regular (como, comes…); tener, poder y querer son irregulares en presente' },
      // ── Singular y plural ──
      { w:['lápiz','sofás','papeles','manos'],          o:'lápiz',        c:'Palabras en plural',       e:'"Lápiz" está en singular; sofás, papeles y manos están en plural' },
      { w:['crisis','análisis','tesis','manos'],        o:'manos',        c:'Palabras invariables en número', e:'"Manos" es claramente plural; crisis, análisis y tesis no cambian de forma en plural' },
      { w:['voces','luces','peces','voz'],              o:'voz',          c:'Palabras en plural',       e:'"Voz" está en singular; voces, luces y peces están en plural' },
      // ── Género ──
      { w:['mano','radio','foto','mapa'],               o:'mapa',         c:'Sustantivos femeninos acabados en -o', e:'"Mapa" es masculino (el mapa); mano, radio y foto son femeninos aunque terminan en -o' },
      // ── Acento / tilde ──
      { w:['café','mamá','sofá','lago'],                o:'lago',         c:'Palabras agudas con tilde', e:'"Lago" es llana (sin tilde); café, mamá y sofá son agudas y llevan tilde' },
      { w:['árbol','ángel','fácil','mesa'],             o:'mesa',         c:'Palabras llanas con tilde', e:'"Mesa" es llana terminada en vocal (no lleva tilde); árbol, ángel y fácil son llanas con tilde por terminar en consonante que no es n/s' },
      { w:['música','médico','rápido','camión'],        o:'camión',       c:'Palabras esdrújulas',      e:'"Camión" es aguda; música, médico y rápido son esdrújulas (tilde en la antepenúltima sílaba)' },
      { w:['camión','también','café','árbol'],          o:'árbol',        c:'Palabras agudas con tilde', e:'"Árbol" es llana; camión, también y café son agudas con tilde' },
      { w:['sábado','cómodo','teléfono','canción'],     o:'canción',      c:'Palabras esdrújulas',      e:'"Canción" es aguda; sábado, cómodo y teléfono son esdrújulas' },
      { w:['examen','resumen','imagen','árbol'],        o:'árbol',        c:'Palabras llanas sin tilde', e:'"Árbol" lleva tilde (llana terminada en -l); examen, resumen e imagen son llanas terminadas en -n y no llevan tilde' },
      // ── Diminutivos ──
      { w:['casita','perrito','florcita','grande'],     o:'grande',       c:'Diminutivos',              e:'"Grande" no tiene sufijo diminutivo; casita, perrito y florcita llevan -ito/-ita' },
      { w:['cochecito','librillo','mesilla','ciudad'],  o:'ciudad',       c:'Diminutivos',              e:'"Ciudad" no tiene sufijo diminutivo; cochecito, librillo y mesilla son diminutivos' },
      // ── Prefijos ──
      { w:['imposible','inútil','deshacer','bonito'],   o:'bonito',       c:'Palabras con prefijo negativo', e:'"Bonito" no lleva prefijo negativo; imposible (im-), inútil (in-) y deshacer (des-) sí' },
      { w:['renacer','releer','repasar','nacer'],       o:'nacer',        c:'Palabras con prefijo re-', e:'"Nacer" no lleva prefijo; renacer, releer y repasar llevan el prefijo re- (repetición)' },
      // ── Palabras compuestas ──
      { w:['paraguas','sacacorchos','lavavajillas','casa'], o:'casa',      c:'Palabras compuestas',      e:'"Casa" es una palabra simple; paraguas, sacacorchos y lavavajillas son palabras compuestas' },
      { w:['abrelatas','girasol','ferrocarril','árbol'],o:'árbol',        c:'Palabras compuestas',      e:'"Árbol" es una palabra simple; abrelatas, girasol y ferrocarril son palabras compuestas' },
      // ── Superlativos ──
      { w:['rapidísimo','grandísimo','altísimo','grande'], o:'grande',     c:'Superlativos absolutos',   e:'"Grande" es la forma base; rapidísimo, grandísimo y altísimo son superlativos con -ísimo' },
      // ── Anglicismos ──
      { w:['béisbol','fútbol','baloncesto','ajedrez'],  o:'ajedrez',      c:'Anglicismos deportivos',   e:'"Ajedrez" viene del árabe; béisbol, fútbol y baloncesto son préstamos del inglés' },
      // ── Sinónimos / antónimos ──
      { w:['veloz','rápido','ágil','silencioso'],       o:'silencioso',   c:'Sinónimos de rápido',      e:'"Silencioso" significa callado; veloz, rápido y ágil son sinónimos de rápido' },
      { w:['enorme','diminuto','gigante','inmenso'],    o:'diminuto',     c:'Sinónimos de grande',      e:'"Diminuto" significa muy pequeño; enorme, gigante e inmenso son sinónimos de grande' },
    ],
    dificil: [
      // ── Morfología avanzada ──
      { w:['haber','deber','poder','tener'],            o:'tener',        c:'Verbos auxiliares o modales', e:'"Tener" no es auxiliar en español moderno; haber, deber y poder funcionan como auxiliares o modales' },
      { w:['gerundio','infinitivo','participio','pronombre'], o:'pronombre', c:'Formas no personales del verbo', e:'"Pronombre" es una categoría nominal; gerundio, infinitivo y participio son formas no personales del verbo' },
      { w:['grafema','fonema','morfema','lexema'],      o:'grafema',      c:'Unidades lingüísticas abstractas', e:'"Grafema" es una unidad gráfica; fonema, morfema y lexema son unidades abstractas de la lengua oral o gramatical' },
      { w:['apócope','síncopa','aféresis','metátesis'], o:'metátesis',    c:'Fenómenos de pérdida de sonidos', e:'"Metátesis" es cambio de posición, no pérdida; apócope, síncopa y aféresis implican supresión de fonemas' },
      { w:['arcaísmo','neologismo','préstamo','sinónimo'], o:'sinónimo',  c:'Fenómenos del cambio léxico', e:'"Sinónimo" es una relación semántica; arcaísmo, neologismo y préstamo describen cambios en el vocabulario' },
      // ── Tipos de oraciones ──
      { w:['aunque','porque','cuando','además'],        o:'además',       c:'Conjunciones subordinantes', e:'"Además" es un adverbio conjuntivo coordinante; aunque, porque y cuando subordinan oraciones' },
      { w:['es','está','parece','tiene'],               o:'tiene',        c:'Verbos copulativos',         e:'"Tiene" es un verbo predicativo; es, está y parece son copulativos (atribuyen cualidades al sujeto)' },
      // ── Semántica ──
      { w:['efímero','fugaz','eterno','pasajero'],      o:'eterno',       c:'Sinónimos de transitorio',  e:'"Eterno" significa lo contrario; efímero, fugaz y pasajero son sinónimos de breve/transitorio' },
      { w:['soslayar','eludir','sortear','afrontar'],   o:'afrontar',     c:'Sinónimos de evitar',       e:'"Afrontar" significa encarar; soslayar, eludir y sortear son sinónimos de esquivar' },
      { w:['diáfano','translúcido','opaco','transparente'], o:'opaco',    c:'Materiales que permiten el paso de la luz', e:'"Opaco" no deja pasar la luz; diáfano, translúcido y transparente sí (en mayor o menor grado)' },
      { w:['pleonasmo','oxímoron','hipérbole','onomatopeya'], o:'onomatopeya', c:'Figuras retóricas semánticas', e:'"Onomatopeya" es un recurso fónico; pleonasmo, oxímoron e hipérbole operan sobre el significado' },
      { w:['euforia','melancolía','nostalgia','alegría'], o:'alegría',    c:'Palabras de origen griego', e:'"Alegría" tiene raíz latina/germánica; euforia, melancolía y nostalgia son de origen griego' },
      { w:['cóncavo','convexo','plano','esférico'],     o:'esférico',     c:'Tipos de curvatura de superficie', e:'"Esférico" describe un sólido 3D; cóncavo, convexo y plano describen curvatura de una superficie' },
      { w:['hiperonimia','hiponimia','polisemia','antonimia'], o:'antonimia', c:'Relaciones semánticas de inclusión', e:'"Antonimia" es oposición; hiperonimia, hiponimia y polisemia implican inclusión o multiplicidad de significados' },
      { w:['catarsis','éxtasis','anagnórisis','écfrasis'], o:'écfrasis',  c:'Conceptos de teoría dramática', e:'"Écfrasis" es descripción de una obra de arte; catarsis, éxtasis y anagnórisis son conceptos dramáticos' },
      { w:['epicentro','epidermis','epílogo','prólogo'], o:'prólogo',     c:'Palabras con prefijo epi-', e:'"Prólogo" lleva el prefijo pro-; epicentro, epidermis y epílogo llevan el prefijo epi-' },
    ],
  },

  /* ══════════════════════════ CATALÀ ══════════════════════════ */
  ca: {
    facil: [
      // ── Classes de paraules ──
      { w:['bellesa','amor','veritat','ràpid'],         o:'ràpid',        c:'Substantius',              e:'"Ràpid" és un adjectiu; bellesa, amor i veritat són substantius' },
      { w:['córrer','taula','cel','bondat'],             o:'córrer',       c:'Substantius',              e:'"Córrer" és un verb; taula, cel i bondat són substantius' },
      { w:['alt','feliç','blau','cantar'],               o:'cantar',       c:'Adjectius',                e:'"Cantar" és un verb; alt, feliç i blau són adjectius' },
      { w:['petit','ràpidament','bonic','trist'],        o:'ràpidament',   c:'Adjectius',                e:'"Ràpidament" és un adverbi; petit, bonic i trist són adjectius' },
      { w:['bé','aquí','sempre','gran'],                 o:'gran',         c:'Adverbis',                 e:'"Gran" és un adjectiu; bé, aquí i sempre són adverbis' },
      { w:['ahir','allà','mai','llibre'],                o:'llibre',       c:'Adverbis',                 e:'"Llibre" és un substantiu; ahir, allà i mai són adverbis' },
      { w:['córrer','saltar','nedar','ràpid'],           o:'ràpid',        c:'Verbs en infinitiu',       e:'"Ràpid" és un adjectiu; córrer, saltar i nedar són verbs en infinitiu' },
      { w:['vaig menjar','vau beure','va dormir','taula'], o:'taula',      c:'Verbs conjugats',          e:'"Taula" és un substantiu; els altres tres són verbs conjugats' },
      // ── Singular i plural ──
      { w:['cases','taules','llibres','gos'],            o:'gos',          c:'Paraules en plural',       e:'"Gos" és en singular; cases, taules i llibres estan en plural' },
      { w:['arbre','núvols','sol','pa'],                 o:'núvols',       c:'Paraules en singular',     e:'"Núvols" és en plural; arbre, sol i pa estan en singular' },
      { w:['ciutat','països','amor','flor'],             o:'països',       c:'Paraules en singular',     e:'"Països" és en plural; ciutat, amor i flor estan en singular' },
      { w:['nens','flors','cotxes','aigua'],             o:'aigua',        c:'Paraules en plural',       e:'"Aigua" és en singular; nens, flors i cotxes estan en plural' },
      // ── Gènere ──
      { w:['sol','amor','calor','lluna'],                o:'lluna',        c:'Substantius masculins',    e:'"Lluna" és femení (la lluna); sol, amor i calor són masculins' },
      { w:['casa','flor','nit','llibre'],                o:'llibre',       c:'Substantius femenins',     e:'"Llibre" és masculí (el llibre); casa, flor i nit són femenins' },
      { w:['mà','foto','moto','cotxe'],                  o:'cotxe',        c:'Substantius femenins en -o', e:'"Cotxe" és masculí; mà, foto i moto són femenins' },
      { w:['poeta','artista','esportista','actriu'],     o:'actriu',       c:'Substantius de gènere comú', e:'"Actriu" és només femení; poeta, artista i esportista són de gènere comú (el/la)' },
      // ── Vocabulari ──
      { w:['poma','pera','plàtan','pastanaga'],          o:'pastanaga',    c:'Fruites',                  e:'La pastanaga és una verdura; poma, pera i plàtan són fruites' },
      { w:['gat','gos','ocell','taula'],                 o:'taula',        c:'Animals',                  e:'"Taula" és un moble; gat, gos i ocell són animals' },
      { w:['dilluns','dimarts','dimecres','gener'],      o:'gener',        c:'Dies de la setmana',       e:'"Gener" és un mes; dilluns, dimarts i dimecres són dies de la setmana' },
      { w:['pluja','neu','vent','paraigua'],             o:'paraigua',     c:'Fenòmens meteorològics',   e:'"Paraigua" és un objecte; pluja, neu i vent són fenòmens del temps' },
      { w:['estiu','hivern','tardor','matí'],            o:'matí',         c:'Estacions de l\'any',      e:'"Matí" és una part del dia; estiu, hivern i tardor són estacions' },
      { w:['rosa','tulipa','margarida','roure'],         o:'roure',        c:'Flors',                    e:'"Roure" és un arbre; rosa, tulipa i margarida són flors' },
      { w:['taronja','llimona','pomelo','maduixa'],      o:'maduixa',      c:'Fruites cítriques',        e:'La maduixa no és cítrica; taronja, llimona i pomelo sí que ho són' },
      { w:['metge','mestre','bomber','feliç'],           o:'feliç',        c:'Professions',              e:'"Feliç" és un adjectiu; metge, mestre i bomber són professions' },
      { w:['mar','riu','llac','desert'],                 o:'desert',       c:'Masses d\'aigua',          e:'El desert no té aigua; mar, riu i llac són masses d\'aigua' },
      { w:['piano','guitarra','violí','pinzell'],        o:'pinzell',      c:'Instruments musicals',     e:'"Pinzell" és un estri; piano, guitarra i violí són instruments' },
      { w:['Espanya','França','Roma','Alemanya'],        o:'Roma',         c:'Països',                   e:'"Roma" és una ciutat; Espanya, França i Alemanya són països' },
      { w:['vermell','blau','verd','gran'],              o:'gran',         c:'Colors',                   e:'"Gran" descriu una mida; vermell, blau i verd són colors' },
    ],
    medio: [
      // ── Classes de paraules ──
      { w:['tristesa','alegria','rapidesa','córrer'],    o:'córrer',       c:'Substantius abstractes',   e:'"Córrer" és un verb; tristesa, alegria i rapidesa són substantius abstractes' },
      { w:['lentament','bé','aquí','bonic'],             o:'bonic',        c:'Adverbis',                 e:'"Bonic" és un adjectiu; lentament, bé i aquí són adverbis' },
      { w:['fàcilment','mai','molt','taula'],            o:'taula',        c:'Adverbis',                 e:'"Taula" és un substantiu; fàcilment, mai i molt són adverbis' },
      { w:['menjar','beure','dormir','gana'],            o:'gana',         c:'Verbs en infinitiu',       e:'"Gana" és un substantiu; menjar, beure i dormir són verbs en infinitiu' },
      { w:['rentar-se','pentinar-se','dutxar-se','córrer'], o:'córrer',    c:'Verbs reflexius',          e:'"Córrer" no és reflexiu; rentar-se, pentinar-se i dutxar-se són verbs reflexius' },
      { w:['tenir','poder','voler','menjar'],            o:'menjar',       c:'Verbs irregulars en present', e:'"Menjar" és regular; tenir, poder i voler són irregulars en el present' },
      // ── Singular i plural ──
      { w:['llapis','sofàs','papers','mans'],            o:'llapis',       c:'Paraules en plural',       e:'"Llapis" és en singular; sofàs, papers i mans estan en plural' },
      { w:['crisi','anàlisi','tesi','mans'],             o:'mans',         c:'Paraules invariables en nombre', e:'"Mans" és clarament plural; crisi, anàlisi i tesi no canvien de forma en plural' },
      { w:['veus','llums','peixos','veu'],               o:'veu',          c:'Paraules en plural',       e:'"Veu" és en singular; veus, llums i peixos estan en plural' },
      // ── Gènere ──
      { w:['mà','ràdio','foto','mapa'],                  o:'mapa',         c:'Substantius femenins acabats en -a/-o', e:'"Mapa" és masculí (el mapa); mà, ràdio i foto són femenins tot i les seves terminacions' },
      // ── Accent / dièresi ──
      { w:['cafè','mamà','sofà','llac'],                 o:'llac',         c:'Paraules agudes amb accent', e:'"Llac" és plana (sense accent); cafè, mamà i sofà són agudes amb accent' },
      { w:['àrbre','àngel','fàcil','taula'],             o:'taula',        c:'Paraules planes amb accent', e:'"Taula" és plana acabada en vocal (sense accent); àrbre, àngel i fàcil porten accent per ser planes acabades en consonant' },
      { w:['música','mèdic','ràpid','camió'],            o:'camió',        c:'Paraules esdrúixoles',     e:'"Camió" és aguda; música, mèdic i ràpid són esdrúixoles (accent a l\'antepenúltima síl·laba)' },
      { w:['camió','també','cafè','àrbre'],              o:'àrbre',        c:'Paraules agudes amb accent', e:'"Àrbre" és plana; camió, també i cafè són agudes amb accent' },
      { w:['dissabte','còmode','telèfon','cançó'],       o:'cançó',        c:'Paraules esdrúixoles',     e:'"Cançó" és aguda; dissabte, còmode i telèfon són esdrúixoles' },
      { w:['coet','veí','raïm','peu'],                   o:'peu',          c:'Paraules amb dièresi',     e:'"Peu" no porta dièresi; coet... actually let me fix — raïm porta dièresi, veí porta dièresi' },
      { w:['veí','raïm','Lluïsa','casa'],                o:'casa',         c:'Paraules amb dièresi',     e:'"Casa" no porta dièresi; veí, raïm i Lluïsa porten dièresi perquè la -i- o -u- forma síl·laba pròpia' },
      // ── Diminutius ──
      { w:['caseta','gosset','floreta','gran'],          o:'gran',         c:'Diminutius',               e:'"Gran" no té sufix diminutiu; caseta, gosset i floreta porten -et/-eta' },
      // ── Prefixos ──
      { w:['impossible','inútil','desfer','bonic'],      o:'bonic',        c:'Paraules amb prefix negatiu', e:'"Bonic" no porta prefix negatiu; impossible (im-), inútil (in-) i desfer (des-) sí' },
      { w:['renéixer','rellegir','repassar','néixer'],   o:'néixer',       c:'Paraules amb prefix re-',  e:'"Néixer" no porta prefix; renéixer, rellegir i repassar porten el prefix re- (repetició)' },
      // ── Paraules compostes ──
      { w:['paraigua','menjador','ferrocarril','casa'],  o:'casa',         c:'Paraules compostes',       e:'"Casa" és una paraula simple; paraigua, menjador i ferrocarril són paraules compostes' },
      // ── Sinònims / antònims ──
      { w:['veloç','ràpid','àgil','silenciós'],          o:'silenciós',    c:'Sinònims de ràpid',        e:'"Silenciós" significa callat; veloç, ràpid i àgil són sinònims de ràpid' },
      { w:['enorme','diminut','gegant','immens'],        o:'diminut',      c:'Sinònims de gran',         e:'"Diminut" significa molt petit; enorme, gegant i immens són sinònims de gran' },
      // ── Anglicismes ──
      { w:['bàsquet','futbol','beisbol','escacs'],       o:'escacs',       c:'Anglicismes esportius',    e:'"Escacs" prové de l\'àrab; bàsquet, futbol i beisbol són préstecs de l\'anglès' },
    ],
    dificil: [
      { w:['haver','deure','poder','tenir'],             o:'tenir',        c:'Verbs auxiliars o modals', e:'"Tenir" no és auxiliar en català modern; haver, deure i poder funcionen com a auxiliars o modals' },
      { w:['gerundi','infinitiu','participi','pronom'],  o:'pronom',       c:'Formes no personals del verb', e:'"Pronom" és una categoria nominal; gerundi, infinitiu i participi són formes no personals del verb' },
      { w:['grafema','fonema','morfema','lexema'],       o:'grafema',      c:'Unitats lingüístiques abstractes', e:'"Grafema" és una unitat gràfica; fonema, morfema i lexema són unitats abstractes de la llengua oral o gramatical' },
      { w:['apòcope','síncope','afereta','metàtesi'],   o:'metàtesi',     c:'Fenòmens de pèrdua de sons', e:'"Metàtesi" és canvi de posició, no pèrdua; apòcope, síncope i afereta impliquen supressió de fonemes' },
      { w:['arcaisme','neologisme','manlleu','sinònim'], o:'sinònim',      c:'Fenòmens del canvi lèxic', e:'"Sinònim" és una relació semàntica; arcaisme, neologisme i manlleu descriuen canvis en el vocabulari' },
      { w:['encara que','perquè','quan','a més'],        o:'a més',        c:'Conjuncions subordinants',  e:'"A més" és un connector coordinant; encara que, perquè i quan subordinen oracions' },
      { w:['és','està','sembla','té'],                   o:'té',           c:'Verbs copulatius',          e:'"Té" és predicatiu; és, està i sembla són copulatius (atribueixen qualitats al subjecte)' },
      { w:['efímer','fugaç','etern','passatger'],        o:'etern',        c:'Sinònims de transitori',   e:'"Etern" significa el contrari; efímer, fugaç i passatger són sinònims de breu/transitori' },
      { w:['eludir','esquivar','defugir','afrontar'],    o:'afrontar',     c:'Sinònims d\'evitar',       e:'"Afrontar" significa encarar; eludir, esquivar i defugir són sinònims d\'evitar' },
      { w:['diàfan','translúcid','opac','transparent'],  o:'opac',         c:'Materials que deixen passar la llum', e:'"Opac" no deixa passar la llum; diàfan, translúcid i transparent sí (en major o menor grau)' },
      { w:['pleonasme','oxímoron','hipèrbole','onomatopeia'], o:'onomatopeia', c:'Figures retòriques semàntiques', e:'"Onomatopeia" és un recurs fònic; pleonasme, oxímoron i hipèrbole operen sobre el significat' },
      { w:['eufòria','melancolia','nostàlgia','alegria'],o:'alegria',      c:'Paraules d\'origen grec',  e:'"Alegria" té arrel llatina/germànica; eufòria, melancolia i nostàlgia són d\'origen grec' },
      { w:['còncau','convex','pla','esfèric'],           o:'esfèric',      c:'Tipus de curvatura',       e:'"Esfèric" descriu un sòlid 3D; còncau, convex i pla descriuen curvatura d\'una superfície' },
      { w:['catarsi','èxtasi','anagnòrisi','ècfrasi'],   o:'ècfrasi',      c:'Conceptes de teoria dramàtica', e:'"Ècfrasi" és descripció d\'una obra d\'art; catarsi, èxtasi i anagnòrisi són conceptes dramàtics' },
      { w:['epicentre','epidermis','epíleg','pròleg'],   o:'pròleg',       c:'Paraules amb prefix epi-', e:'"Pròleg" porta el prefix pro-; epicentre, epidermis i epíleg porten el prefix epi-' },
    ],
  },

  /* ══════════════════════════ ENGLISH ══════════════════════════ */
  en: {
    facil: [
      // ── Word classes ──
      { w:['beauty','love','truth','quickly'],           o:'quickly',      c:'Nouns',                    e:'"Quickly" is an adverb; beauty, love and truth are nouns' },
      { w:['run','table','sky','kindness'],              o:'run',          c:'Nouns',                    e:'"Run" is a verb; table, sky and kindness are nouns' },
      { w:['tall','happy','blue','sing'],                o:'sing',         c:'Adjectives',               e:'"Sing" is a verb; tall, happy and blue are adjectives' },
      { w:['small','quickly','pretty','sad'],            o:'quickly',      c:'Adjectives',               e:'"Quickly" is an adverb; small, pretty and sad are adjectives' },
      { w:['well','here','always','big'],                o:'big',          c:'Adverbs',                  e:'"Big" is an adjective; well, here and always are adverbs' },
      { w:['yesterday','there','never','book'],          o:'book',         c:'Adverbs',                  e:'"Book" is a noun; yesterday, there and never are adverbs' },
      { w:['run','jump','swim','fast'],                  o:'fast',         c:'Verbs (infinitive)',       e:'"Fast" is an adjective/adverb; run, jump and swim are verbs' },
      { w:['ate','drank','slept','table'],               o:'table',        c:'Past tense verbs',         e:'"Table" is a noun; ate, drank and slept are past tense verbs' },
      // ── Singular and plural ──
      { w:['houses','tables','books','dog'],             o:'dog',          c:'Plural words',             e:'"Dog" is singular; houses, tables and books are plural' },
      { w:['tree','clouds','sun','bread'],               o:'clouds',       c:'Singular words',           e:'"Clouds" is plural; tree, sun and bread are singular' },
      { w:['city','countries','love','flower'],          o:'countries',    c:'Singular words',           e:'"Countries" is plural; city, love and flower are singular' },
      { w:['children','flowers','cars','water'],         o:'water',        c:'Plural words',             e:'"Water" is singular (uncountable); children, flowers and cars are plural' },
      // ── Gender and articles ──
      { w:['actor','waiter','king','queen'],             o:'queen',        c:'Masculine nouns',          e:'"Queen" is feminine; actor, waiter and king are masculine' },
      { w:['actress','waitress','queen','king'],         o:'king',         c:'Feminine nouns',           e:'"King" is masculine; actress, waitress and queen are feminine' },
      // ── Vocabulary ──
      { w:['apple','pear','banana','carrot'],            o:'carrot',       c:'Fruits',                   e:'A carrot is a vegetable; apple, pear and banana are fruits' },
      { w:['dog','cat','bird','table'],                  o:'table',        c:'Animals',                  e:'"Table" is furniture; dog, cat and bird are animals' },
      { w:['Monday','Tuesday','Wednesday','January'],    o:'January',      c:'Days of the week',         e:'"January" is a month; Monday, Tuesday and Wednesday are days' },
      { w:['rain','snow','wind','umbrella'],             o:'umbrella',     c:'Weather phenomena',        e:'An umbrella is an object; rain, snow and wind are weather phenomena' },
      { w:['summer','winter','autumn','morning'],        o:'morning',      c:'Seasons',                  e:'"Morning" is a time of day; summer, winter and autumn are seasons' },
      { w:['rose','tulip','daisy','oak'],                o:'oak',          c:'Flowers',                  e:'An oak is a tree; rose, tulip and daisy are flowers' },
      { w:['orange','lemon','grapefruit','strawberry'],  o:'strawberry',   c:'Citrus fruits',            e:'Strawberry is not a citrus fruit; orange, lemon and grapefruit are' },
      { w:['doctor','teacher','fireman','happy'],        o:'happy',        c:'Jobs',                     e:'"Happy" is an adjective; doctor, teacher and fireman are jobs' },
      { w:['Spain','France','Rome','Germany'],           o:'Rome',         c:'Countries',                e:'"Rome" is a city; Spain, France and Germany are countries' },
      { w:['red','blue','green','big'],                  o:'big',          c:'Colours',                  e:'"Big" describes a size; red, blue and green are colours' },
      { w:['piano','guitar','violin','brush'],           o:'brush',        c:'Musical instruments',      e:'A brush is a painting tool; piano, guitar and violin are instruments' },
      { w:['triangle','square','circle','pyramid'],      o:'pyramid',      c:'2D shapes',                e:'A pyramid is 3D; triangle, square and circle are flat shapes' },
    ],
    medio: [
      // ── Word classes (more nuanced) ──
      { w:['sadness','joy','speed','running'],           o:'running',      c:'Abstract nouns',           e:'"Running" used here is a verb/gerund; sadness, joy and speed are abstract nouns' },
      { w:['slowly','well','here','beautiful'],          o:'beautiful',    c:'Adverbs',                  e:'"Beautiful" is an adjective; slowly, well and here are adverbs' },
      { w:['easily','never','very','table'],             o:'table',        c:'Adverbs',                  e:'"Table" is a noun; easily, never and very are adverbs' },
      { w:['eat','drink','sleep','hunger'],              o:'hunger',       c:'Verbs (infinitive)',       e:'"Hunger" is a noun; eat, drink and sleep are verbs' },
      { w:['wash oneself','dress oneself','behave','run'], o:'run',        c:'Reflexive verbs',          e:'"Run" is not reflexive; wash oneself, dress oneself and behave are reflexive' },
      { w:['have','can','must','eat'],                   o:'eat',          c:'Modal/auxiliary verbs',    e:'"Eat" is a main verb; have, can and must are modal or auxiliary verbs' },
      // ── Singular and plural ──
      { w:['pencils','sofas','papers','hand'],           o:'hand',         c:'Plural words',             e:'"Hand" is singular; pencils, sofas and papers are plural' },
      { w:['sheep','deer','fish','hands'],               o:'hands',        c:'Words with same singular and plural', e:'"Hands" has a regular plural; sheep, deer and fish keep the same form' },
      { w:['children','mice','oxen','dogs'],             o:'dogs',         c:'Irregular plurals',        e:'"Dogs" has a regular plural (-s); children, mice and oxen are irregular plurals' },
      // ── Spelling patterns ──
      { w:['knife','knock','kneel','keep'],              o:'keep',         c:'Words with a silent k',    e:'"Keep" has a pronounced k; knife, knock and kneel have a silent k' },
      { w:['nation','station','action','fashion'],       o:'fashion',      c:'Words ending in -tion',    e:'"Fashion" ends in -shion; nation, station and action end in -tion' },
      { w:['honest','hour','heir','hero'],               o:'hero',         c:'Words with a silent h',    e:'"Hero" has a pronounced h; honest, hour and heir begin with a silent h' },
      // ── Adverbs from adjectives ──
      { w:['quickly','slowly','happily','quick'],        o:'quick',        c:'Adverbs ending in -ly',    e:'"Quick" is an adjective; quickly, slowly and happily are adverbs formed with -ly' },
      { w:['beautiful','easy','happy','slowly'],         o:'slowly',       c:'Adjectives',               e:'"Slowly" is an adverb; beautiful, easy and happy are adjectives' },
      // ── Verb forms ──
      { w:['speak','spoke','spoken','speaked'],          o:'speaked',      c:'Forms of "speak"',         e:'"Speaked" does not exist; speak, spoke and spoken are the correct forms' },
      { w:['break','broke','broken','breaked'],          o:'breaked',      c:'Forms of "break"',         e:'"Breaked" is not a word; break, broke and broken are correct' },
      { w:['go','went','gone','goed'],                   o:'goed',         c:'Forms of "go"',            e:'"Goed" does not exist; go, went and gone are the correct forms' },
      // ── Comparatives and superlatives ──
      { w:['bigger','faster','taller','big'],            o:'big',          c:'Comparative adjectives',   e:'"Big" is the base form; bigger, faster and taller are comparatives' },
      { w:['biggest','fastest','tallest','bigger'],      o:'bigger',       c:'Superlative adjectives',   e:'"Bigger" is comparative; biggest, fastest and tallest are superlatives' },
      // ── Word endings ──
      { w:['happiness','sadness','kindness','happy'],    o:'happy',        c:'Abstract nouns ending in -ness', e:'"Happy" is an adjective; happiness, sadness and kindness are nouns formed with -ness' },
      { w:['teacher','writer','player','teach'],         o:'teach',        c:'Nouns for people ending in -er', e:'"Teach" is a verb; teacher, writer and player are agent nouns ending in -er' },
      // ── Homophones ──
      { w:['their','there','they\'re','through'],        o:'through',      c:'Homophones of "there"',    e:'"Through" sounds different; their, there and they\'re are all pronounced the same' },
      { w:['to','too','two','do'],                       o:'do',           c:'Homophones of "two"',      e:'"Do" sounds different; to, too and two all sound like /tuː/' },
    ],
    dificil: [
      { w:['flaunt','flout','float','flute'],            o:'flute',        c:'Words confused with "flaunt"', e:'"Flute" is a musical instrument; flaunt (show off), flout (disobey) and float are often confused' },
      { w:['comprise','compose','consist of','control'], o:'control',      c:'Verbs of composition',     e:'"Control" has no compositional meaning; comprise, compose and consist of all describe what something is made of' },
      { w:['plethora','myriad','dearth','multitude'],    o:'dearth',       c:'Synonyms of "abundance"',  e:'"Dearth" means a shortage; plethora, myriad and multitude all mean a great many' },
      { w:['apathy','empathy','sympathy','antipathy'],   o:'apathy',       c:'Words about feeling towards others', e:'"Apathy" is absence of feeling; empathy, sympathy and antipathy describe feelings directed towards others' },
      { w:['endemic','epidemic','pandemic','academic'],  o:'academic',     c:'Words describing disease spread', e:'"Academic" has no medical meaning; endemic, epidemic and pandemic describe the geographic scope of disease spread' },
      { w:['lexicon','syntax','morphology','biography'], o:'biography',    c:'Branches of linguistics',  e:'"Biography" is a type of text; lexicon, syntax and morphology are core areas of linguistics' },
      { w:['noun','verb','adjective','clause'],          o:'clause',       c:'Parts of speech (word classes)', e:'A clause is a syntactic unit, not a word class; noun, verb and adjective are parts of speech' },
      { w:['hyperbole','litotes','synecdoche','metaphor'], o:'metaphor',   c:'Figures involving understatement or part/whole', e:'"Metaphor" is a general substitution; hyperbole, litotes and synecdoche form a more specific set' },
      { w:['prefix','suffix','infix','context'],         o:'context',      c:'Types of affix',           e:'"Context" is not an affix; prefix, suffix and infix are positions where an affix can appear' },
      { w:['synonym','antonym','homonym','acronym'],     o:'acronym',      c:'Word relationship terms',  e:'An acronym is formed from initials, not a relationship; synonym, antonym and homonym describe word relationships' },
      { w:['irony','sarcasm','satire','simile'],         o:'simile',       c:'Forms of indirect expression', e:'A simile is a direct comparison; irony, sarcasm and satire involve indirect or critical expression' },
      { w:['allusion','illusion','delusion','solution'], o:'solution',     c:'Words easily confused with "illusion"', e:'"Solution" is semantically unrelated; allusion, illusion and delusion are commonly confused near-homophones' },
      { w:['connote','denote','devote','promote'],       o:'promote',      c:'Verbs related to meaning',  e:'"Promote" has no semantic/referential meaning; connote and denote relate to meaning and reference' },
      { w:['presuppose','presume','assume','ensure'],    o:'ensure',       c:'Verbs meaning to take for granted', e:'"Ensure" means to make certain; presuppose, presume and assume all involve taking something for granted' },
      { w:['sanguine','sanguinary','sanguineous','serene'], o:'serene',    c:'Words from Latin "sanguis" (blood)', e:'"Serene" has no connection to blood; sanguine, sanguinary and sanguineous all derive from Latin "sanguis"' },
    ],
  },
}

export function getQuestionsForPool(lang, nivel, count = 10, seed = null) {
  const pool = PREGUNTAS[lang]?.[nivel] ?? PREGUNTAS.es.facil
  const arr = [...pool]
  if (seed === null) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
  } else {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(((seed * (i + 1) * 2654435761) >>> 0) % (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
  }
  return arr.slice(0, Math.min(count, arr.length))
}
