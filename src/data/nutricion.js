// Nutrición y alimentación — grupos de alimentos, vitaminas, dieta saludable
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const PREGUNTAS = [

  // ── MACRONUTRIENTES ──────────────────────────────────────────────────────────
  q('nu-01','primaria',
    { es:'¿Cuáles son los tres macronutrientes principales que nos aportan energía?', en:'What are the three main macronutrients that provide us with energy?', ca:'Quins són els tres macronutrients principals que ens aporten energia?' },
    { es:['Vitaminas, minerales y agua','Hidratos de carbono, proteínas y grasas (lípidos)','Fibra, calcio y hierro','Glucosa, sal y cafeína'], en:['Vitamins, minerals and water','Carbohydrates, proteins and fats (lipids)','Fibre, calcium and iron','Glucose, salt and caffeine'], ca:['Vitamines, minerals i aigua','Hidrats de carboni, proteïnes i greixos (lípids)','Fibra, calci i ferro','Glucosa, sal i cafeïna'] },
    { es:'Hidratos de carbono, proteínas y grasas (lípidos)', en:'Carbohydrates, proteins and fats (lipids)', ca:'Hidrats de carboni, proteïnes i greixos (lípids)' },
    '🍽️',
    { es:'Macronutrientes: Hidratos de carbono (4 kcal/g) → energía rápida (pan, pasta, arroz). Proteínas (4 kcal/g) → construcción y reparación de tejidos (carne, huevos, legumbres). Grasas (9 kcal/g) → energía de reserva, hormonas, membranas (aceite, frutos secos).', en:'Macronutrients: Carbohydrates (4 kcal/g) → quick energy (bread, pasta, rice). Proteins (4 kcal/g) → building and repairing tissues (meat, eggs, pulses). Fats (9 kcal/g) → reserve energy, hormones, membranes (oil, nuts).', ca:'Macronutrients: Hidrats de carboni (4 kcal/g) → energia ràpida (pa, pasta, arròs). Proteïnes (4 kcal/g) → construcció i reparació de teixits (carn, ous, llegums). Greixos (9 kcal/g) → energia de reserva, hormones, membranes (oli, fruits secs).' },
  ),
  q('nu-02','primaria',
    { es:'¿Cuál es la principal función de los hidratos de carbono en el cuerpo?', en:'What is the main function of carbohydrates in the body?', ca:'Quina és la funció principal dels hidrats de carboni al cos?' },
    { es:['Construir músculos','Proporcionar energía rápida','Transportar oxígeno','Proteger los órganos'], en:['Build muscles','Provide quick energy','Transport oxygen','Protect organs'], ca:['Construir músculs','Proporcionar energia ràpida','Transportar oxigen','Protegir els òrgans'] },
    { es:'Proporcionar energía rápida', en:'Provide quick energy', ca:'Proporcionar energia ràpida' },
    '🍞',
    { es:'Los hidratos de carbono se convierten en glucosa, que es el combustible preferido del cerebro y los músculos. Los simples (azúcar, miel) dan energía rápida pero pasan rápido; los complejos (pan integral, legumbres) se absorben lentamente y sacian más.', en:'Carbohydrates are converted into glucose, which is the preferred fuel for the brain and muscles. Simple ones (sugar, honey) give quick energy but pass quickly; complex ones (wholegrain bread, pulses) are absorbed slowly and are more filling.', ca:'Els hidrats de carboni es converteixen en glucosa, que és el combustible preferit del cervell i els músculs. Els simples (sucre, mel) donen energia ràpida però passen ràpid; els complexos (pa integral, llegums) s\'absorbeixen lentament i sacien més.' },
  ),
  q('nu-03','primaria',
    { es:'¿Cuál es la función principal de las proteínas?', en:'What is the main function of proteins?', ca:'Quina és la funció principal de les proteïnes?' },
    { es:['Aportar energía de reserva','Construir y reparar tejidos del cuerpo (músculos, piel, órganos)','Regular la temperatura corporal','Transportar vitaminas hidrosolubles'], en:['Provide reserve energy','Build and repair body tissues (muscles, skin, organs)','Regulate body temperature','Transport water-soluble vitamins'], ca:['Aportar energia de reserva','Construir i reparar teixits del cos (músculs, pell, òrgans)','Regular la temperatura corporal','Transportar vitamines hidrosolubles'] },
    { es:'Construir y reparar tejidos del cuerpo (músculos, piel, órganos)', en:'Build and repair body tissues (muscles, skin, organs)', ca:'Construir i reparar teixits del cos (músculs, pell, òrgans)' },
    '🥩',
    { es:'Las proteínas están formadas por aminoácidos. Los esenciales deben obtenerse de la dieta (el cuerpo no los fabrica). Fuentes: carne, pescado, huevo, lácteos (proteína completa); legumbres + cereales (proteína vegetal completa combinada). También forman enzimas, hormonas y anticuerpos.', en:'Proteins are made of amino acids. Essential ones must be obtained from the diet (the body cannot make them). Sources: meat, fish, eggs, dairy (complete protein); pulses + cereals (complete combined plant protein). They also form enzymes, hormones and antibodies.', ca:'Les proteïnes estan formades per aminoàcids. Els essencials s\'han d\'obtenir de la dieta (el cos no els fabrica). Fonts: carn, peix, ou, lactis (proteïna completa); llegums + cereals (proteïna vegetal completa combinada). També formen enzims, hormones i anticossos.' },
  ),

  // ── VITAMINAS ────────────────────────────────────────────────────────────────
  q('nu-04','primaria',
    { es:'¿Qué vitamina produce el cuerpo cuando recibe luz solar?', en:'Which vitamin does the body produce when exposed to sunlight?', ca:'Quina vitamina produeix el cos quan rep llum solar?' },
    { es:['Vitamina A','Vitamina B12','Vitamina C','Vitamina D'], en:['Vitamin A','Vitamin B12','Vitamin C','Vitamin D'], ca:['Vitamina A','Vitamina B12','Vitamina C','Vitamina D'] },
    { es:'Vitamina D', en:'Vitamin D', ca:'Vitamina D' },
    '☀️',
    { es:'La vitamina D se sintetiza en la piel con la luz solar (UVB). Es esencial para absorber el calcio y mantener huesos y dientes fuertes. Su deficiencia causa raquitismo en niños y osteoporosis en adultos. También está en pescado azul, huevos y lácteos.', en:'Vitamin D is synthesised in the skin with sunlight (UVB). It is essential for absorbing calcium and keeping bones and teeth strong. Its deficiency causes rickets in children and osteoporosis in adults. It is also found in oily fish, eggs and dairy.', ca:'La vitamina D es sintetitza a la pell amb la llum solar (UVB). És essencial per absorbir el calci i mantenir ossos i dents forts. La seva deficiència causa raquitisme en nens i osteoporosi en adults. També es troba en peix blau, ous i lactis.' },
  ),
  q('nu-05','primaria',
    { es:'¿En qué alimentos se encuentra principalmente la vitamina C y para qué sirve?', en:'In which foods is vitamin C mainly found and what is it for?', ca:'En quins aliments es troba principalment la vitamina C i per a què serveix?' },
    { es:['En la carne roja; para tener energía','En cítricos, kiwis y pimientos; para el sistema inmunitario y producir colágeno','En el pan; para tener calcio','En el aceite de oliva; para proteger las articulaciones'], en:['In red meat; for energy','In citrus fruits, kiwis and peppers; for the immune system and producing collagen','In bread; for calcium','In olive oil; to protect joints'], ca:['A la carn vermella; per tenir energia','Als cítrics, kiwis i pebrots; per al sistema immunitari i produir col·lagen','Al pa; per tenir calci','A l\'oli d\'oliva; per protegir les articulacions'] },
    { es:'En cítricos, kiwis y pimientos; para el sistema inmunitario y producir colágeno', en:'In citrus fruits, kiwis and peppers; for the immune system and producing collagen', ca:'Als cítrics, kiwis i pebrots; per al sistema immunitari i produir col·lagen' },
    '🍊',
    { es:'Vitamina C (ácido ascórbico): antioxidante, refuerza el sistema inmunitario, necesaria para producir colágeno (piel, huesos, vasos sanguíneos). Su deficiencia causa escorbuto (encías sangrantes). El cuerpo no la almacena, hay que tomarla diariamente.', en:'Vitamin C (ascorbic acid): antioxidant, strengthens the immune system, needed to produce collagen (skin, bones, blood vessels). Its deficiency causes scurvy (bleeding gums). The body does not store it, so it must be taken daily.', ca:'Vitamina C (àcid ascòrbic): antioxidant, reforça el sistema immunitari, necessària per produir col·lagen (pell, ossos, vasos sanguinis). La seva deficiència causa escorbut (genives sagnants). El cos no l\'emmagatzema, cal prendre-la diàriament.' },
  ),
  q('nu-06','eso',
    { es:'¿Cuál es la diferencia entre vitaminas liposolubles e hidrosolubles?', en:'What is the difference between fat-soluble and water-soluble vitamins?', ca:'Quina és la diferència entre vitamines liposolubles i hidrosolubles?' },
    { es:['Las liposolubles se disuelven en agua; las hidrosolubles en grasa','Las liposolubles (A, D, E, K) se disuelven en grasa y se acumulan en el cuerpo; las hidrosolubles (B, C) en agua y se eliminan por la orina','Son exactamente lo mismo','Las hidrosolubles solo se encuentran en alimentos de origen animal'], en:['Fat-soluble dissolve in water; water-soluble in fat','Fat-soluble (A, D, E, K) dissolve in fat and accumulate in the body; water-soluble (B, C) in water and are excreted in urine','They are exactly the same','Water-soluble vitamins are only found in animal foods'], ca:['Les liposolubles es dissolen en aigua; les hidrosolubles en greix','Les liposolubles (A, D, E, K) es dissolen en greix i s\'acumulen al cos; les hidrosolubles (B, C) en aigua i s\'eliminen per l\'orina','Són exactament el mateix','Les hidrosolubles només es troben en aliments d\'origen animal'] },
    { es:'Las liposolubles (A, D, E, K) se disuelven en grasa y se acumulan en el cuerpo; las hidrosolubles (B, C) en agua y se eliminan por la orina', en:'Fat-soluble (A, D, E, K) dissolve in fat and accumulate in the body; water-soluble (B, C) in water and are excreted in urine', ca:'Les liposolubles (A, D, E, K) es dissolen en greix i s\'acumulen al cos; les hidrosolubles (B, C) en aigua i s\'eliminen per l\'orina' },
    '💊',
    { es:'Liposolubles (A, D, E, K): se almacenan en hígado y tejido graso; el exceso puede ser tóxico. Hidrosolubles (C y complejo B): el exceso se elimina por orina; hay que tomarlas regularmente. La vitamina B12 es la excepción: es hidrosoluble pero se almacena en el hígado.', en:'Fat-soluble (A, D, E, K): stored in the liver and fatty tissue; excess can be toxic. Water-soluble (C and B complex): excess is excreted in urine; they must be taken regularly. Vitamin B12 is the exception: it is water-soluble but stored in the liver.', ca:'Liposolubles (A, D, E, K): s\'emmagatzemen al fetge i al teixit gras; l\'excés pot ser tòxic. Hidrosolubles (C i complex B): l\'excés s\'elimina per l\'orina; cal prendre-les regularment. La vitamina B12 és l\'excepció: és hidrosoluble però s\'emmagatzema al fetge.' },
  ),

  // ── DIETA SALUDABLE Y GRUPOS DE ALIMENTOS ────────────────────────────────────
  q('nu-07','primaria',
    { es:'¿Qué es la dieta mediterránea y por qué se considera saludable?', en:'What is the Mediterranean diet and why is it considered healthy?', ca:'Què és la dieta mediterrània i per què es considera saludable?' },
    { es:['Una dieta basada solo en carne y pescado','Una dieta rica en frutas, verduras, legumbres, cereales integrales, aceite de oliva y pescado, con poca carne roja','Una dieta de solo ensaladas sin grasas','Una dieta basada en alimentos procesados y azúcares'], en:['A diet based only on meat and fish','A diet rich in fruits, vegetables, pulses, wholegrain cereals, olive oil and fish, with little red meat','A salad-only diet with no fats','A diet based on processed foods and sugars'], ca:['Una dieta basada només en carn i peix','Una dieta rica en fruites, verdures, llegums, cereals integrals, oli d\'oliva i peix, amb poca carn vermella','Una dieta de només amanides sense greixos','Una dieta basada en aliments processats i sucres'] },
    { es:'Una dieta rica en frutas, verduras, legumbres, cereales integrales, aceite de oliva y pescado, con poca carne roja', en:'A diet rich in fruits, vegetables, pulses, wholegrain cereals, olive oil and fish, with little red meat', ca:'Una dieta rica en fruites, verdures, llegums, cereals integrals, oli d\'oliva i peix, amb poca carn vermella' },
    '🥑',
    { es:'La dieta mediterránea está reconocida por la UNESCO como Patrimonio Cultural Inmaterial. Se asocia a menor riesgo de enfermedades cardiovasculares, diabetes tipo 2 y ciertos cánceres. El aceite de oliva virgen extra aporta grasas monoinsaturadas y antioxidantes.', en:'The Mediterranean diet is recognised by UNESCO as Intangible Cultural Heritage. It is associated with lower risk of cardiovascular diseases, type 2 diabetes and certain cancers. Extra virgin olive oil provides monounsaturated fats and antioxidants.', ca:'La dieta mediterrània és reconeguda per la UNESCO com a Patrimoni Cultural Immaterial. S\'associa a menor risc de malalties cardiovasculars, diabetis de tipus 2 i certs càncers. L\'oli d\'oliva verge extra aporta greixos monoinsaturats i antioxidants.' },
  ),
  q('nu-08','primaria',
    { es:'¿Cuántas porciones de frutas y verduras se recomiendan al día?', en:'How many portions of fruit and vegetables are recommended per day?', ca:'Quantes porcions de fruites i verdures es recomanen al dia?' },
    { es:['1 porción','2 porciones','5 porciones','10 porciones'], en:['1 portion','2 portions','5 portions','10 portions'], ca:['1 porció','2 porcions','5 porcions','10 porcions'] },
    { es:'5 porciones', en:'5 portions', ca:'5 porcions' },
    '🥦',
    { es:'La OMS recomienda al menos 5 porciones (400 g) de frutas y verduras al día. Son fuente de vitaminas, minerales, fibra y antioxidantes. Reducen el riesgo de enfermedades cardiovasculares, diabetes y algunos cánceres. Cuanto más variadas y coloridas, mejor.', en:'The WHO recommends at least 5 portions (400 g) of fruit and vegetables a day. They are a source of vitamins, minerals, fibre and antioxidants. They reduce the risk of cardiovascular disease, diabetes and some cancers. The more varied and colourful, the better.', ca:'L\'OMS recomana almenys 5 porcions (400 g) de fruites i verdures al dia. Són font de vitamines, minerals, fibra i antioxidants. Redueixen el risc de malalties cardiovasculars, diabetis i alguns càncers. Com més variades i acolorides, millor.' },
  ),
  q('nu-09','eso',
    { es:'¿Qué es el Índice de Masa Corporal (IMC) y cómo se calcula?', en:'What is the Body Mass Index (BMI) and how is it calculated?', ca:'Què és l\'Índex de Massa Corporal (IMC) i com es calcula?' },
    { es:['La relación entre el peso y la altura, calculada como peso (kg) / altura² (m)','La cantidad de grasa corporal medida en porcentaje','La relación entre el perímetro de cintura y la cadera','La cantidad de calorías consumidas al día'], en:['The relationship between weight and height, calculated as weight (kg) / height² (m)','The amount of body fat measured as a percentage','The relationship between waist and hip circumference','The number of calories consumed per day'], ca:['La relació entre el pes i l\'alçada, calculada com a pes (kg) / alçada² (m)','La quantitat de greix corporal mesurada en percentatge','La relació entre el perímetre de cintura i el maluc','La quantitat de calories consumides al dia'] },
    { es:'La relación entre el peso y la altura, calculada como peso (kg) / altura² (m)', en:'The relationship between weight and height, calculated as weight (kg) / height² (m)', ca:'La relació entre el pes i l\'alçada, calculada com a pes (kg) / alçada² (m)' },
    '⚖️',
    { es:'IMC = peso (kg) / altura² (m). Valores: <18,5 (bajo peso), 18,5-24,9 (normal), 25-29,9 (sobrepeso), ≥30 (obesidad). Es una herramienta de orientación, pero no tiene en cuenta la composición corporal (músculo vs. grasa) ni la distribución de la grasa.', en:'BMI = weight (kg) / height² (m). Values: <18.5 (underweight), 18.5-24.9 (normal), 25-29.9 (overweight), ≥30 (obesity). It is a guidance tool, but does not take into account body composition (muscle vs. fat) or fat distribution.', ca:'IMC = pes (kg) / alçada² (m). Valors: <18,5 (baix pes), 18,5-24,9 (normal), 25-29,9 (sobrepès), ≥30 (obesitat). És una eina d\'orientació, però no té en compte la composició corporal (múscul vs. greix) ni la distribució del greix.' },
  ),
  q('nu-11','primaria',
    { es:'¿Cuál es el nutriente inorgánico más importante para la vida y que NO aporta energía?', en:'What is the most important inorganic nutrient for life that does NOT provide energy?', ca:'Quin és el nutrient inorgànic més important per a la vida que NO aporta energia?' },
    { es:['Las proteínas','Los hidratos de carbono','El agua','Las vitaminas'], en:['Proteins','Carbohydrates','Water','Vitamins'], ca:['Les proteïnes','Els hidrats de carboni','L\'aigua','Les vitamines'] },
    { es:'El agua', en:'Water', ca:'L\'aigua' },
    '💧',
    { es:'El agua representa el 60-70% del cuerpo humano. No aporta calorías pero es imprescindible para: disolver nutrientes, transportarlos, regular la temperatura (sudoración), eliminar residuos por la orina y lubricar articulaciones. Se recomiendan unos 2 litros al día para adultos.', en:'Water makes up 60-70% of the human body. It provides no calories but is essential for: dissolving nutrients, transporting them, regulating temperature (sweating), eliminating waste through urine and lubricating joints. About 2 litres per day is recommended for adults.', ca:'L\'aigua representa el 60-70% del cos humà. No aporta calories però és imprescindible per: dissoldre nutrients, transportar-los, regular la temperatura (suor), eliminar residus per l\'orina i lubricar articulacions. Es recomanen uns 2 litres al dia per a adults.' },
  ),

  q('nu-12', 'primaria',
    { es: "¿Qué alimento es rico en proteínas?", en: "Which food is rich in protein?", ca: "Quin aliment és ric en proteïnes?" },
    { es: ["El pan","Los huevos","El aceite","El azúcar"], en: ["Bread","Eggs","Oil","Sugar"], ca: ["El pa","Els ous","L'oli","El sucre"] },
    { es: "Los huevos", en: "Eggs", ca: "Els ous" },
    '🥚',
    { es: "Los huevos, la carne, el pescado y las legumbres son las principales fuentes de proteína, que sirve para construir y reparar el cuerpo.", en: "Eggs, meat, fish and pulses are the main protein sources: protein builds and repairs the body.", ca: "Els ous, la carn, el peix i els llegums són les principals fonts de proteïna." }),

  q('nu-13', 'primaria',
    { es: "¿Cuántos vasos de agua se recomienda beber al día?", en: "How many glasses of water a day are recommended?", ca: "Quants gots d'aigua es recomana beure al dia?" },
    { es: ["1 o 2","Entre 6 y 8","Más de 20","Ninguno, basta con refrescos"], en: ["1 or 2","Between 6 and 8","More than 20","None, soft drinks are enough"], ca: ["1 o 2","Entre 6 i 8","Més de 20","Cap, amb refrescos n'hi ha prou"] },
    { es: "Entre 6 y 8", en: "Between 6 and 8", ca: "Entre 6 i 8" },
    '💧',
    { es: "Entre 6 y 8 vasos (1,5-2 litros). El agua no aporta energía, pero sin ella el cuerpo no puede transportar nutrientes ni regular su temperatura.", en: "Six to eight glasses (1.5-2 litres). Water has no calories but the body cannot transport nutrients without it.", ca: "Entre 6 i 8 gots (1,5-2 litres). L'aigua no aporta energia, però sense ella el cos no transporta nutrients." }),

  q('nu-14', 'primaria',
    { es: "¿Qué grupo de alimentos deberíamos comer en mayor cantidad?", en: "Which food group should we eat most of?", ca: "Quin grup d'aliments hauríem de menjar en més quantitat?" },
    { es: ["Dulces y bollería","Frutas y verduras","Carnes rojas","Fritos"], en: ["Sweets and pastries","Fruit and vegetables","Red meat","Fried food"], ca: ["Dolços i brioixeria","Fruites i verdures","Carns vermelles","Fregits"] },
    { es: "Frutas y verduras", en: "Fruit and vegetables", ca: "Fruites i verdures" },
    '🥦',
    { es: "Las frutas y verduras son la base de la dieta: aportan vitaminas, minerales y fibra con pocas calorías. Los dulces van en la punta de la pirámide.", en: "Fruit and vegetables are the base of the diet: vitamins, minerals and fibre with few calories.", ca: "Les fruites i verdures són la base de la dieta: vitamines, minerals i fibra amb poques calories." }),

  q('nu-15', 'primaria',
    { es: "¿Para qué sirve la fibra?", en: "What is fibre for?", ca: "Per a què serveix la fibra?" },
    { es: ["Dar energía rápida","Ayudar al tránsito intestinal","Construir músculo","Formar huesos"], en: ["Giving quick energy","Helping intestinal transit","Building muscle","Forming bones"], ca: ["Donar energia ràpida","Ajudar al trànsit intestinal","Construir múscul","Formar ossos"] },
    { es: "Ayudar al tránsito intestinal", en: "Helping intestinal transit", ca: "Ajudar al trànsit intestinal" },
    '🌾',
    { es: "La fibra no se digiere ni aporta energía: su trabajo es facilitar el tránsito intestinal. Está en la fruta, la verdura, las legumbres y los cereales integrales.", en: "Fibre is not digested: it helps intestinal transit. Found in fruit, vegetables, pulses and wholegrain cereals.", ca: "La fibra no es digereix: facilita el trànsit intestinal." }),

  q('nu-16', 'primaria',
    { es: "¿Qué es el desayuno?", en: "What is breakfast?", ca: "Què és l'esmorzar?" },
    { es: ["Una comida que se puede saltar sin más","La primera comida del día, que rompe el ayuno de la noche","Solo un vaso de leche","La comida de media tarde"], en: ["A meal you can skip with no consequences","The first meal of the day, breaking the night fast","Just a glass of milk","An afternoon snack"], ca: ["Un àpat que es pot saltar sense més","El primer àpat del dia, que trenca el dejuni de la nit","Només un got de llet","L'àpat de mitja tarda"] },
    { es: "La primera comida del día, que rompe el ayuno de la noche", en: "The first meal of the day, breaking the night fast", ca: "El primer àpat del dia, que trenca el dejuni de la nit" },
    '🌅',
    { es: "Tras 8-10 horas sin comer, el desayuno repone la glucosa que el cerebro necesita para concentrarse. Por eso se nota tanto en clase.", en: "After 8-10 hours without food, breakfast restores the glucose the brain needs to concentrate.", ca: "Després de 8-10 hores sense menjar, l'esmorzar reposa la glucosa que el cervell necessita." }),

  q('nu-17', 'eso',
    { es: "¿Qué diferencia hay entre una grasa saturada y una insaturada?", en: "What is the difference between saturated and unsaturated fat?", ca: "Quina diferència hi ha entre un greix saturat i un d'insaturat?" },
    { es: ["Ninguna, es lo mismo","La saturada es sólida a temperatura ambiente y en exceso sube el colesterol; la insaturada es líquida y es cardiosaludable","La insaturada engorda más","La saturada solo está en vegetales"], en: ["None, they are the same","Saturated fat is solid at room temperature and raises cholesterol in excess; unsaturated is liquid and heart-healthy","Unsaturated fat is more fattening","Saturated fat is only in plants"], ca: ["Cap, són el mateix","El saturat és sòlid a temperatura ambient i en excés puja el colesterol; l'insaturat és líquid i és cardiosaludable","L'insaturat engreixa més","El saturat només és en vegetals"] },
    { es: "La saturada es sólida a temperatura ambiente y en exceso sube el colesterol; la insaturada es líquida y es cardiosaludable", en: "Saturated fat is solid at room temperature and raises cholesterol in excess; unsaturated is liquid and heart-healthy", ca: "El saturat és sòlid a temperatura ambient i en excés puja el colesterol; l'insaturat és líquid i és cardiosaludable" },
    '🥑',
    { es: "Saturadas: mantequilla, embutidos, bollería (sólidas). Insaturadas: aceite de oliva, aguacate, frutos secos, pescado azul (líquidas). Las dos aportan 9 kcal/g, pero su efecto en las arterias es opuesto.", en: "Saturated: butter, cold meats (solid). Unsaturated: olive oil, avocado, nuts, oily fish (liquid). Same calories, opposite effect on arteries.", ca: "Saturats: mantega, embotits (sòlids). Insaturats: oli d'oliva, alvocat, fruits secs (líquids)." }),

  q('nu-19', 'eso',
    { es: "¿Qué significa que un alimento tenga \"calorías vacías\"?", en: "What does it mean for a food to have \"empty calories\"?", ca: "Què vol dir que un aliment tingui \"calories buides\"?" },
    { es: ["Que no tiene calorías","Que aporta energía pero casi ningún nutriente","Que se digiere muy rápido","Que es light"], en: ["That it has no calories","That it gives energy but almost no nutrients","That it digests very fast","That it is a light product"], ca: ["Que no té calories","Que aporta energia però gairebé cap nutrient","Que es digereix molt ràpid","Que és light"] },
    { es: "Que aporta energía pero casi ningún nutriente", en: "That it gives energy but almost no nutrients", ca: "Que aporta energia però gairebé cap nutrient" },
    '🍬',
    { es: "Los refrescos azucarados y la bollería industrial dan mucha energía y casi ninguna vitamina, mineral ni fibra: llenan de calorías sin alimentar.", en: "Sugary drinks and industrial pastries give lots of energy and almost no vitamins, minerals or fibre.", ca: "Els refrescos ensucrats i la brioixeria industrial donen molta energia i gairebé cap nutrient." }),

  q('nu-30', 'primaria',
    { es: '¿Qué diferencia hay entre alimentación y nutrición?', en: 'What is the difference between eating and nutrition?', ca: 'Quina diferència hi ha entre alimentació i nutrició?' },
    { es: ['Alimentarse es elegir y comer, algo voluntario; la nutrición es lo que el cuerpo hace después, sin que lo decidamos', 'Son exactamente lo mismo', 'Alimentarse es de día y nutrirse de noche', 'La nutrición solo la hacen los deportistas'], en: ['Eating is choosing and consuming food, which is voluntary; nutrition is what the body does afterwards, without us deciding', 'They are exactly the same', 'You eat by day and get nourished at night', 'Only athletes get nourished'], ca: ['Alimentar-se és triar i menjar, una cosa voluntària; la nutrició és el que el cos fa després, sense que ho decidim', 'Són exactament el mateix', 'Alimentar-se és de dia i nodrir-se de nit', 'La nutrició només la fan els esportistes'] },
    { es: 'Alimentarse es elegir y comer, algo voluntario; la nutrición es lo que el cuerpo hace después, sin que lo decidamos', en: 'Eating is choosing and consuming food, which is voluntary; nutrition is what the body does afterwards, without us deciding', ca: 'Alimentar-se és triar i menjar, una cosa voluntària; la nutrició és el que el cos fa després, sense que ho decidim' },
    '🍽️',
    { es: 'Por eso se puede comer mucho y estar mal nutrido: lo que importa no es la cantidad sino qué nutrientes llegan. La parte que podemos decidir es la primera, y de ahí depende toda la segunda.', en: 'That is why you can eat a lot and still be poorly nourished: what matters is not the amount but which nutrients arrive. The part we can decide is the first, and the whole second part depends on it.', ca: 'Per això es pot menjar molt i estar mal nodrit: el que importa no és la quantitat sinó quins nutrients arriben.' }),

  q('nu-31', 'primaria',
    { es: '¿Qué alimentos son ricos en hidratos de carbono?', en: 'Which foods are rich in carbohydrates?', ca: 'Quins aliments són rics en hidrats de carboni?' },
    { es: ['El pan, la pasta, el arroz y las patatas', 'La carne y el pescado', 'El aceite y la mantequilla', 'Las vitaminas'], en: ['Bread, pasta, rice and potatoes', 'Meat and fish', 'Oil and butter', 'Vitamins'], ca: ['El pa, la pasta, l\'arròs i les patates', 'La carn i el peix', 'L\'oli i la mantega', 'Les vitamines'] },
    { es: 'El pan, la pasta, el arroz y las patatas', en: 'Bread, pasta, rice and potatoes', ca: 'El pa, la pasta, l\'arròs i les patates' },
    '🍞',
    { es: 'Son el combustible que el cuerpo usa primero, sobre todo el cerebro. Los integrales son mejores porque llevan fibra y la energía se libera poco a poco, en vez de subir y bajar de golpe.', en: 'They are the fuel the body uses first, especially the brain. Wholegrain versions are better because they carry fibre and release energy gradually, instead of spiking and crashing.', ca: 'Són el combustible que el cos fa servir primer, sobretot el cervell. Els integrals són millors perquè porten fibra.' }),

  q('nu-32', 'primaria',
    { es: '¿Para qué sirven las grasas en una dieta equilibrada?', en: 'What are fats for in a balanced diet?', ca: 'Per a què serveixen els greixos en una dieta equilibrada?' },
    { es: ['Son una reserva de energía y ayudan a absorber algunas vitaminas', 'No sirven para nada y hay que eliminarlas', 'Solo dan sabor', 'Sustituyen al agua'], en: ['They are an energy store and help absorb some vitamins', 'They are useless and must be eliminated', 'They only add flavour', 'They replace water'], ca: ['Són una reserva d\'energia i ajuden a absorbir algunes vitamines', 'No serveixen de res i cal eliminar-los', 'Només donen gust', 'Substitueixen l\'aigua'] },
    { es: 'Son una reserva de energía y ayudan a absorber algunas vitaminas', en: 'They are an energy store and help absorb some vitamins', ca: 'Són una reserva d\'energia i ajuden a absorbir algunes vitamines' },
    '🥑',
    { es: 'Tienen mala fama pero son imprescindibles: forman parte de las membranas de las células y sin ellas no se aprovechan las vitaminas A, D, E y K. Lo que importa es de dónde vienen: aceite de oliva, frutos secos y pescado azul, mejor que bollería.', en: 'They have a bad name but are essential: they form part of cell membranes and without them vitamins A, D, E and K are not absorbed. What matters is the source: olive oil, nuts and oily fish rather than pastries.', ca: 'Tenen mala fama però són imprescindibles: formen part de les membranes de les cèl·lules.' }),

  q('nu-33', 'primaria',
    { es: '¿Por qué es importante el calcio y dónde se encuentra?', en: 'Why is calcium important and where is it found?', ca: 'Per què és important el calci i on es troba?' },
    { es: ['Forma huesos y dientes, y está en lácteos, legumbres, frutos secos y pescado con espina', 'Da energía rápida, y está en el azúcar', 'Transporta oxígeno, y está en la carne roja', 'Ayuda a ver, y está en la zanahoria'], en: ['It builds bones and teeth, and is in dairy, pulses, nuts and fish eaten with bones', 'It gives quick energy, and is in sugar', 'It carries oxygen, and is in red meat', 'It helps sight, and is in carrots'], ca: ['Forma ossos i dents, i és en lactis, llegums, fruits secs i peix amb espina', 'Dona energia ràpida, i és al sucre', 'Transporta oxigen, i és a la carn vermella', 'Ajuda a veure-hi, i és a la pastanaga'] },
    { es: 'Forma huesos y dientes, y está en lácteos, legumbres, frutos secos y pescado con espina', en: 'It builds bones and teeth, and is in dairy, pulses, nuts and fish eaten with bones', ca: 'Forma ossos i dents, i és en lactis, llegums, fruits secs i peix amb espina' },
    '🦴',
    { es: 'La infancia y la adolescencia son la etapa clave: es cuando el hueso acumula reserva para toda la vida. Y para fijarlo hace falta vitamina D, así que el sol también cuenta.', en: 'Childhood and adolescence are the key stage: that is when bone builds up a reserve for life. Fixing it also needs vitamin D, so sunlight counts too.', ca: 'La infància i l\'adolescència són l\'etapa clau: és quan l\'os acumula reserva per a tota la vida.' }),

  q('nu-34', 'primaria',
    { es: '¿Qué mineral necesita la sangre para transportar el oxígeno?', en: 'Which mineral does blood need to carry oxygen?', ca: 'Quin mineral necessita la sang per transportar l\'oxigen?' },
    { es: ['El hierro', 'El calcio', 'El sodio', 'El potasio'], en: ['Iron', 'Calcium', 'Sodium', 'Potassium'], ca: ['El ferro', 'El calci', 'El sodi', 'El potassi'] },
    { es: 'El hierro', en: 'Iron', ca: 'El ferro' },
    '🥩',
    { es: 'Forma parte de la hemoglobina de los glóbulos rojos. Si falta aparece la anemia, con cansancio y palidez. Está en la carne roja, las legumbres y las espinacas, y la vitamina C ayuda a absorberlo mejor.', en: 'It is part of the haemoglobin in red blood cells. Lacking it causes anaemia, with tiredness and pallor. It is in red meat, pulses and spinach, and vitamin C helps absorb it.', ca: 'Forma part de l\'hemoglobina dels glòbuls vermells. Si en falta apareix l\'anèmia.' }),

  q('nu-35', 'primaria',
    { es: '¿Qué son las legumbres y por qué conviene comerlas?', en: 'What are pulses and why is it good to eat them?', ca: 'Què són els llegums i per què convé menjar-los?' },
    { es: ['Lentejas, garbanzos, judías y guisantes: aportan proteína vegetal, fibra y hierro', 'Frutas de verano ricas en agua', 'Un tipo de cereal', 'Verduras de hoja verde'], en: ['Lentils, chickpeas, beans and peas: they provide plant protein, fibre and iron', 'Summer fruits rich in water', 'A kind of cereal', 'Green leafy vegetables'], ca: ['Llenties, cigrons, mongetes i pèsols: aporten proteïna vegetal, fibra i ferro', 'Fruites d\'estiu riques en aigua', 'Un tipus de cereal', 'Verdures de fulla verda'] },
    { es: 'Lentejas, garbanzos, judías y guisantes: aportan proteína vegetal, fibra y hierro', en: 'Lentils, chickpeas, beans and peas: they provide plant protein, fibre and iron', ca: 'Llenties, cigrons, mongetes i pèsols: aporten proteïna vegetal, fibra i ferro' },
    '🍲',
    { es: 'Son de los alimentos más completos y baratos que existen, y además su cultivo contamina mucho menos que la carne. Se recomienda comerlas dos o tres veces por semana.', en: 'They are among the most complete and cheapest foods there are, and growing them pollutes far less than meat. Two or three times a week is the recommendation.', ca: 'Són dels aliments més complets i barats que existeixen, i el seu conreu contamina molt menys que la carn.' }),

  q('nu-36', 'primaria',
    { es: '¿Por qué conviene comer pescado?', en: 'Why is it good to eat fish?', ca: 'Per què convé menjar peix?' },
    { es: ['Aporta proteínas de calidad y grasas buenas, sobre todo el pescado azul', 'Porque no tiene calorías', 'Porque sustituye a las verduras', 'Porque no hace falta cocinarlo'], en: ['It gives quality protein and good fats, especially oily fish', 'Because it has no calories', 'Because it replaces vegetables', 'Because it needs no cooking'], ca: ['Aporta proteïnes de qualitat i greixos bons, sobretot el peix blau', 'Perquè no té calories', 'Perquè substitueix les verdures', 'Perquè no cal cuinar-lo'] },
    { es: 'Aporta proteínas de calidad y grasas buenas, sobre todo el pescado azul', en: 'It gives quality protein and good fats, especially oily fish', ca: 'Aporta proteïnes de qualitat i greixos bons, sobretot el peix blau' },
    '🐟',
    { es: 'El azul —sardina, boquerón, salmón, atún— lleva omega 3, que cuida el corazón. El blanco, como la merluza, tiene menos grasa. Se recomiendan tres o cuatro raciones por semana entre los dos.', en: 'Oily fish — sardines, anchovies, salmon, tuna — carries omega 3, which looks after the heart. White fish like hake has less fat. Three or four servings a week between them is the recommendation.', ca: 'El blau —sardina, seitó, salmó, tonyina— porta omega 3, que cuida el cor.' }),

  q('nu-37', 'primaria',
    { es: '¿Qué son los alimentos ultraprocesados?', en: 'What are ultra-processed foods?', ca: 'Què són els aliments ultraprocessats?' },
    { es: ['Productos fabricados con muchos ingredientes añadidos, azúcar, sal y grasas', 'Alimentos cocinados en casa', 'Alimentos congelados', 'Alimentos frescos de temporada'], en: ['Products made with many added ingredients, sugar, salt and fats', 'Home-cooked food', 'Frozen food', 'Fresh seasonal food'], ca: ['Productes fabricats amb molts ingredients afegits, sucre, sal i greixos', 'Aliments cuinats a casa', 'Aliments congelats', 'Aliments frescos de temporada'] },
    { es: 'Productos fabricados con muchos ingredientes añadidos, azúcar, sal y grasas', en: 'Products made with many added ingredients, sugar, salt and fats', ca: 'Productes fabricats amb molts ingredients afegits, sucre, sal i greixos' },
    '🍬',
    { es: 'Bollería, refrescos, snacks o precocinados. Congelar o cocinar no es lo mismo que ultraprocesar: unas verduras congeladas son un alimento normal. Una pista útil es mirar la etiqueta: cuantos más ingredientes raros, más procesado.', en: 'Pastries, soft drinks, snacks or ready meals. Freezing or cooking is not the same as ultra-processing: frozen vegetables are ordinary food. A useful clue is the label: the more odd ingredients, the more processed.', ca: 'Brioixeria, refrescos, snacks o precuinats. Congelar o cuinar no és el mateix que ultraprocessar.' }),

  q('nu-38', 'primaria',
    { es: '¿Por qué es importante desayunar?', en: 'Why is breakfast important?', ca: 'Per què és important esmorzar?' },
    { es: ['Porque el cuerpo lleva muchas horas sin comer y necesita energía para la mañana', 'Porque adelgaza', 'Porque sustituye a la comida', 'Porque hay que comer siempre a la misma hora'], en: ['Because the body has gone many hours without food and needs energy for the morning', 'Because it makes you lose weight', 'Because it replaces lunch', 'Because you must always eat at the same time'], ca: ['Perquè el cos porta moltes hores sense menjar i necessita energia per al matí', 'Perquè aprima', 'Perquè substitueix el dinar', 'Perquè cal menjar sempre a la mateixa hora'] },
    { es: 'Porque el cuerpo lleva muchas horas sin comer y necesita energía para la mañana', en: 'Because the body has gone many hours without food and needs energy for the morning', ca: 'Perquè el cos porta moltes hores sense menjar i necessita energia per al matí' },
    '🥣',
    { es: 'Después de dormir se llevan diez o doce horas en ayunas, y el cerebro funciona con glucosa. Un desayuno de bollería y zumo azucarado da un subidón que se cae a media mañana; con fruta, lácteo y cereales integrales aguanta.', en: 'After sleeping you have gone ten or twelve hours without food, and the brain runs on glucose. A breakfast of pastries and sugary juice gives a spike that crashes mid-morning; fruit, dairy and wholegrain cereal lasts.', ca: 'Després de dormir es porten deu o dotze hores en dejú, i el cervell funciona amb glucosa.' }),

  q('nu-39', 'primaria',
    { es: '¿Qué pasa si tomamos demasiada sal?', en: 'What happens if we eat too much salt?', ca: 'Què passa si prenem massa sal?' },
    { es: ['Sube la tensión arterial y con el tiempo daña el corazón y los riñones', 'No pasa nada, se elimina sola', 'Se engorda inmediatamente', 'Se pierde la vista'], en: ['Blood pressure rises and over time it damages the heart and kidneys', 'Nothing, it is eliminated by itself', 'You gain weight immediately', 'You lose your sight'], ca: ['Puja la tensió arterial i amb el temps danya el cor i els ronyons', 'No passa res, s\'elimina sola', 'S\'engreixa immediatament', 'Es perd la vista'] },
    { es: 'Sube la tensión arterial y con el tiempo daña el corazón y los riñones', en: 'Blood pressure rises and over time it damages the heart and kidneys', ca: 'Puja la tensió arterial i amb el temps danya el cor i els ronyons' },
    '🧂',
    { es: 'La mayor parte de la sal que tomamos no viene del salero, sino escondida en pan, embutidos, conservas y precocinados. La OMS recomienda menos de cinco gramos al día, y la media española pasa del doble.', en: 'Most of the salt we eat does not come from the salt cellar but hidden in bread, cured meats, tinned food and ready meals. The WHO recommends under five grams a day, and the Spanish average is more than double.', ca: 'La major part de la sal que prenem ve amagada al pa, els embotits i els precuinats.' }),

  q('nu-40', 'primaria',
    { es: '¿Por qué es importante beber agua?', en: 'Why is drinking water important?', ca: 'Per què és important beure aigua?' },
    { es: ['Porque somos agua en gran parte y la usamos para transportar, regular la temperatura y eliminar desechos', 'Porque aporta muchas calorías', 'Porque sustituye a la comida', 'Solo cuando hace calor'], en: ['Because we are largely water and use it to transport things, regulate temperature and remove waste', 'Because it provides many calories', 'Because it replaces food', 'Only when it is hot'], ca: ['Perquè som aigua en gran part i la fem servir per transportar, regular la temperatura i eliminar residus', 'Perquè aporta moltes calories', 'Perquè substitueix el menjar', 'Només quan fa calor'] },
    { es: 'Porque somos agua en gran parte y la usamos para transportar, regular la temperatura y eliminar desechos', en: 'Because we are largely water and use it to transport things, regulate temperature and remove waste', ca: 'Perquè som aigua en gran part i la fem servir per transportar, regular la temperatura i eliminar residus' },
    '🚰',
    { es: 'Alrededor del 60 % del cuerpo es agua. No aporta ni una caloría, pero sin ella no funciona nada. Cuando aparece la sed ya se ha perdido algo de agua, así que conviene beber antes de tener sed.', en: 'About 60% of the body is water. It provides not one calorie, but nothing works without it. By the time you feel thirsty you have already lost some, so it is better to drink before feeling thirsty.', ca: 'Al voltant del 60 % del cos és aigua. Quan apareix la set ja s\'ha perdut una mica d\'aigua.' }),

  q('nu-41', 'primaria',
    { es: '¿Por qué se recomienda hacer ejercicio además de comer bien?', en: 'Why is exercise recommended as well as eating well?', ca: 'Per què es recomana fer exercici a més de menjar bé?' },
    { es: ['Porque fortalece corazón, músculos y huesos, y ayuda a mantener un peso saludable', 'Porque permite comer lo que sea sin consecuencias', 'Porque sustituye a dormir', 'Porque solo importa a los deportistas'], en: ['Because it strengthens heart, muscles and bones and helps keep a healthy weight', 'Because it lets you eat anything without consequences', 'Because it replaces sleep', 'Because it only matters to athletes'], ca: ['Perquè enforteix cor, músculs i ossos, i ajuda a mantenir un pes saludable', 'Perquè permet menjar el que sigui sense conseqüències', 'Perquè substitueix dormir', 'Perquè només importa als esportistes'] },
    { es: 'Porque fortalece corazón, músculos y huesos, y ayuda a mantener un peso saludable', en: 'Because it strengthens heart, muscles and bones and helps keep a healthy weight', ca: 'Perquè enforteix cor, músculs i ossos, i ajuda a mantenir un pes saludable' },
    '🏃',
    { es: 'Se recomienda al menos una hora al día a estas edades, y no hace falta que sea deporte de equipo: andar rápido, ir en bici o jugar en la calle cuentan. También mejora el ánimo y el sueño.', en: 'At these ages at least an hour a day is recommended, and it need not be team sport: brisk walking, cycling or playing outside all count. It also improves mood and sleep.', ca: 'Es recomana almenys una hora al dia a aquestes edats, i no cal que sigui esport d\'equip.' }),

]

export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
export const PREGUNTAS_ESO      = PREGUNTAS
