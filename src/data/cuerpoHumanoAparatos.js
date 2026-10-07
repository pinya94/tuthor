// Cuerpo Humano (ampliación): los aparatos que el banco original no tocaba
// —excretor, locomotor, endocrino y reproductor— y más preguntas de los
// sentidos. Se suman a PREGUNTAS en data/cuerpoHumano.js, así que entran en
// el mismo examen, las tarjetas y los imprimibles sin tocar nada más.
//
// Mismo formato que cuerpoHumano.js: `correcta` es el TEXTO de la buena (lo
// exige tarjetasExamen). Aquí la buena va la primera y ExamenMC baraja.
function q(id, nivel, emoji, pregunta, opciones, explicacion) {
  const correcta = { es: opciones.es[0], en: opciones.en[0], ca: opciones.ca[0] }
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}
const T = (es, en, ca) => ({ es, en, ca })
const O = (es, en, ca) => ({ es, en, ca })
const N = (...xs) => ({ es: xs, en: xs, ca: xs })

export const PREGUNTAS_APARATOS = [
  // ── Aparato excretor ──
  q('ce-01', 'primaria', '💧',
    T('¿Qué órganos filtran la sangre y fabrican la orina?', 'Which organs filter the blood and make urine?', 'Quins òrgans filtren la sang i fabriquen l’orina?'),
    O(['Los riñones', 'El hígado', 'Los pulmones', 'La vejiga'], ['The kidneys', 'The liver', 'The lungs', 'The bladder'], ['Els ronyons', 'El fetge', 'Els pulmons', 'La bufeta']),
    T('Los dos riñones filtran toda la sangre del cuerpo muchas veces al día y separan los desechos y el agua sobrante, que forman la orina. La vejiga solo la guarda.', 'The two kidneys filter all the body’s blood many times a day and separate out waste and excess water, which form urine. The bladder only stores it.', 'Els dos ronyons filtren tota la sang del cos moltes vegades al dia i separen els residus i l’aigua sobrant, que formen l’orina. La bufeta només la guarda.')),
  q('ce-02', 'primaria', '🚽',
    T('¿Dónde se almacena la orina antes de expulsarla?', 'Where is urine stored before it is passed?', 'On s’emmagatzema l’orina abans d’expulsar-la?'),
    O(['En la vejiga urinaria', 'En los riñones', 'En el estómago', 'En el intestino grueso'], ['In the urinary bladder', 'In the kidneys', 'In the stomach', 'In the large intestine'], ['A la bufeta urinària', 'Als ronyons', 'A l’estómac', 'A l’intestí gros']),
    T('La vejiga es una bolsa elástica que se va llenando; cuando está llena, notamos las ganas de orinar y la orina sale por la uretra.', 'The bladder is a stretchy bag that gradually fills; when it is full we feel the need to urinate and urine leaves through the urethra.', 'La bufeta és una bossa elàstica que es va omplint; quan és plena, notem les ganes d’orinar i l’orina surt per la uretra.')),
  q('ce-03', 'eso', '🔬',
    T('¿Cómo se llaman las unidades microscópicas del riñón que filtran la sangre?', 'What are the microscopic units of the kidney that filter blood called?', 'Com es diuen les unitats microscòpiques del ronyó que filtren la sang?'),
    O(['Nefronas', 'Alvéolos', 'Neuronas', 'Vellosidades'], ['Nephrons', 'Alveoli', 'Neurons', 'Villi'], ['Nefrones', 'Alvèols', 'Neurones', 'Vellositats']),
    T('Cada riñón tiene alrededor de un millón de nefronas. Los alvéolos son de los pulmones, las neuronas del sistema nervioso y las vellosidades del intestino delgado.', 'Each kidney has about a million nephrons. Alveoli are in the lungs, neurons in the nervous system and villi in the small intestine.', 'Cada ronyó té al voltant d’un milió de nefrones. Els alvèols són dels pulmons, les neurones del sistema nerviós i les vellositats de l’intestí prim.')),
  q('ce-04', 'eso', '🔀',
    T('¿Qué conductos llevan la orina desde los riñones hasta la vejiga?', 'Which tubes carry urine from the kidneys to the bladder?', 'Quins conductes porten l’orina des dels ronyons fins a la bufeta?'),
    O(['Los uréteres', 'La uretra', 'Las arterias renales', 'Las trompas de Falopio'], ['The ureters', 'The urethra', 'The renal arteries', 'The Fallopian tubes'], ['Els urèters', 'La uretra', 'Les artèries renals', 'Les trompes de Fal·lopi']),
    T('Un uréter sale de cada riñón y baja hasta la vejiga. La uretra es el conducto que va de la vejiga al exterior: se parecen en el nombre, no en el camino.', 'A ureter leaves each kidney and runs down to the bladder. The urethra is the tube from the bladder to the outside: similar names, different routes.', 'Un urèter surt de cada ronyó i baixa fins a la bufeta. La uretra és el conducte que va de la bufeta a l’exterior: s’assemblen en el nom, no en el camí.')),
  q('ce-05', 'eso', '💦',
    T('Además de los riñones, ¿qué órgano elimina agua, sales y desechos con el sudor?', 'Apart from the kidneys, which organ gets rid of water, salts and waste in sweat?', 'A més dels ronyons, quin òrgan elimina aigua, sals i residus amb la suor?'),
    O(['La piel, con sus glándulas sudoríparas', 'El corazón', 'El cerebro', 'El páncreas'], ['The skin, with its sweat glands', 'The heart', 'The brain', 'The pancreas'], ['La pell, amb les glàndules sudorípares', 'El cor', 'El cervell', 'El pàncrees']),
    T('El sudor elimina algo de desechos y, sobre todo, refresca el cuerpo al evaporarse. Los pulmones también excretan: expulsan el dióxido de carbono.', 'Sweat removes some waste and, above all, cools the body as it evaporates. The lungs also excrete: they get rid of carbon dioxide.', 'La suor elimina alguns residus i, sobretot, refresca el cos en evaporar-se. Els pulmons també excreten: expulsen el diòxid de carboni.')),

  // ── Aparato locomotor ──
  q('cl-01', 'primaria', '🦴',
    T('¿Cuántos huesos tiene, aproximadamente, el esqueleto de una persona adulta?', 'About how many bones does an adult skeleton have?', 'Quants ossos té, aproximadament, l’esquelet d’una persona adulta?'),
    N('206', '106', '306', '26'),
    T('Unos 206. Un bebé nace con alrededor de 300, pero muchos se van soldando al crecer, como los del cráneo.', 'About 206. A baby is born with around 300, but many fuse together while growing, such as those of the skull.', 'Uns 206. Un nadó neix amb uns 300, però molts es van soldant en créixer, com els del crani.')),
  q('cl-02', 'primaria', '🦵',
    T('¿Cuál es el hueso más largo del cuerpo?', 'Which is the longest bone in the body?', 'Quin és l’os més llarg del cos?'),
    O(['El fémur', 'El húmero', 'La tibia', 'El radio'], ['The femur', 'The humerus', 'The tibia', 'The radius'], ['El fèmur', 'L’húmer', 'La tíbia', 'El radi']),
    T('El fémur, en el muslo, va de la cadera a la rodilla y mide alrededor de una cuarta parte de la altura de la persona. El húmero es el del brazo.', 'The femur, in the thigh, runs from the hip to the knee and is about a quarter of a person’s height. The humerus is the upper-arm bone.', 'El fèmur, a la cuixa, va del maluc al genoll i fa al voltant d’una quarta part de l’alçada de la persona. L’húmer és el del braç.')),
  q('cl-03', 'eso', '🔗',
    T('¿Qué une los huesos entre sí en las articulaciones?', 'What joins bones to each other at the joints?', 'Què uneix els ossos entre si a les articulacions?'),
    O(['Los ligamentos', 'Los tendones', 'Los nervios', 'Los vasos sanguíneos'], ['Ligaments', 'Tendons', 'Nerves', 'Blood vessels'], ['Els lligaments', 'Els tendons', 'Els nervis', 'Els vasos sanguinis']),
    T('Los ligamentos unen hueso con hueso; los tendones, músculo con hueso. Un esguince es una lesión de los ligamentos, por ejemplo en el tobillo.', 'Ligaments join bone to bone; tendons join muscle to bone. A sprain is an injury to the ligaments, for example in the ankle.', 'Els lligaments uneixen os amb os; els tendons, múscul amb os. Un esquinç és una lesió dels lligaments, per exemple al turmell.')),
  q('cl-04', 'eso', '💀',
    T('¿Qué huesos están unidos por articulaciones fijas, que no se mueven?', 'Which bones are joined by fixed joints that do not move?', 'Quins ossos estan units per articulacions fixes, que no es mouen?'),
    O(['Los del cráneo', 'Los de la rodilla', 'Los del codo', 'Los del hombro'], ['Those of the skull', 'Those of the knee', 'Those of the elbow', 'Those of the shoulder'], ['Els del crani', 'Els del genoll', 'Els del colze', 'Els de l’espatlla']),
    T('Los huesos del cráneo encajan como un puzle (suturas) para proteger el encéfalo. Rodilla, codo y hombro son articulaciones móviles; las vértebras, semimóviles.', 'The skull bones fit together like a jigsaw (sutures) to protect the brain. Knee, elbow and shoulder are movable joints; the vertebrae, partly movable.', 'Els ossos del crani encaixen com un trencaclosques (sutures) per protegir l’encèfal. Genoll, colze i espatlla són articulacions mòbils; les vèrtebres, semimòbils.')),
  q('cl-05', 'eso', '❤️',
    T('¿Qué tipo de músculo forma el corazón?', 'What type of muscle makes up the heart?', 'Quin tipus de múscul forma el cor?'),
    O(['Músculo cardíaco: estriado pero involuntario', 'Músculo esquelético, voluntario', 'Músculo liso, como el del estómago', 'No es un músculo: es un tendón'], ['Cardiac muscle: striated but involuntary', 'Skeletal muscle, voluntary', 'Smooth muscle, like the stomach’s', 'It is not a muscle: it is a tendon'], ['Múscul cardíac: estriat però involuntari', 'Múscul esquelètic, voluntari', 'Múscul llis, com el de l’estómac', 'No és un múscul: és un tendó']),
    T('Hay tres tipos: el esquelético (voluntario, mueve los huesos), el liso (involuntario, en las vísceras) y el cardíaco, que tiene bandas como el esquelético pero late sin que lo decidamos y sin cansarse.', 'There are three types: skeletal (voluntary, moves bones), smooth (involuntary, in the organs) and cardiac, which is banded like skeletal muscle but beats without our deciding and without tiring.', 'N’hi ha tres tipus: l’esquelètic (voluntari, mou els ossos), el llis (involuntari, a les vísceres) i el cardíac, que té bandes com l’esquelètic però batega sense que ho decidim i sense cansar-se.')),

  // ── Sistema endocrino ──
  q('cen-01', 'eso', '🧪',
    T('¿Cómo se llaman las sustancias que fabrican las glándulas endocrinas y que viajan por la sangre?', 'What are the substances made by endocrine glands that travel in the blood called?', 'Com es diuen les substàncies que fabriquen les glàndules endocrines i que viatgen per la sang?'),
    O(['Hormonas', 'Enzimas digestivas', 'Anticuerpos', 'Neurotransmisores'], ['Hormones', 'Digestive enzymes', 'Antibodies', 'Neurotransmitters'], ['Hormones', 'Enzims digestius', 'Anticossos', 'Neurotransmissors']),
    T('Las hormonas son mensajeros químicos: salen a la sangre y actúan en órganos lejanos. Los neurotransmisores pasan de neurona a neurona y las enzimas digestivas trabajan en el tubo digestivo.', 'Hormones are chemical messengers: they enter the blood and act on distant organs. Neurotransmitters pass from neuron to neuron and digestive enzymes work in the gut.', 'Les hormones són missatgers químics: surten a la sang i actuen en òrgans llunyans. Els neurotransmissors passen de neurona a neurona i els enzims digestius treballen al tub digestiu.')),
  q('cen-02', 'eso', '🍬',
    T('¿Qué hormona fabrica el páncreas para bajar el azúcar de la sangre?', 'Which hormone does the pancreas make to lower blood sugar?', 'Quina hormona fabrica el pàncrees per abaixar el sucre de la sang?'),
    O(['La insulina', 'La adrenalina', 'La tiroxina', 'La testosterona'], ['Insulin', 'Adrenaline', 'Thyroxine', 'Testosterone'], ['La insulina', 'L’adrenalina', 'La tiroxina', 'La testosterona']),
    T('La insulina hace que las células tomen la glucosa de la sangre. Cuando el páncreas no fabrica suficiente, o el cuerpo no responde a ella, aparece la diabetes.', 'Insulin makes cells take glucose from the blood. When the pancreas does not make enough, or the body does not respond to it, diabetes appears.', 'La insulina fa que les cèl·lules prenguin la glucosa de la sang. Quan el pàncrees no en fabrica prou, o el cos no hi respon, apareix la diabetis.')),
  q('cen-03', 'eso', '🧠',
    T('¿Qué glándula, en la base del encéfalo, controla a muchas de las demás?', 'Which gland, at the base of the brain, controls many of the others?', 'Quina glàndula, a la base de l’encèfal, controla moltes de les altres?'),
    O(['La hipófisis', 'El tiroides', 'Las suprarrenales', 'El páncreas'], ['The pituitary gland', 'The thyroid', 'The adrenal glands', 'The pancreas'], ['La hipòfisi', 'La tiroide', 'Les suprarenals', 'El pàncrees']),
    T('La hipófisis, del tamaño de un garbanzo, fabrica la hormona del crecimiento y otras que dan órdenes al tiroides, a las suprarrenales y a las glándulas sexuales. Por eso se la llama la glándula «directora».', 'The pituitary, the size of a chickpea, makes growth hormone and others that give orders to the thyroid, adrenals and sex glands. That is why it is called the "master" gland.', 'La hipòfisi, de la mida d’un cigró, fabrica l’hormona del creixement i d’altres que donen ordres a la tiroide, a les suprarenals i a les glàndules sexuals. Per això se la diu la glàndula «directora».')),
  q('cen-04', 'eso', '⚡',
    T('Ante un susto, el corazón se acelera y el cuerpo se prepara para huir. ¿Qué hormona lo provoca al instante?', 'When we get a fright, the heart races and the body gets ready to run. Which hormone causes this instantly?', 'Davant d’un ensurt, el cor s’accelera i el cos es prepara per fugir. Quina hormona ho provoca a l’instant?'),
    O(['La adrenalina', 'La insulina', 'La melatonina', 'La hormona del crecimiento'], ['Adrenaline', 'Insulin', 'Melatonin', 'Growth hormone'], ['L’adrenalina', 'La insulina', 'La melatonina', 'L’hormona del creixement']),
    T('La adrenalina, de las glándulas suprarrenales, acelera el corazón y la respiración y libera glucosa para tener energía rápida. La melatonina regula el sueño.', 'Adrenaline, from the adrenal glands, speeds up the heart and breathing and releases glucose for quick energy. Melatonin regulates sleep.', 'L’adrenalina, de les glàndules suprarenals, accelera el cor i la respiració i allibera glucosa per tenir energia ràpida. La melatonina regula el son.')),

  // ── Aparato reproductor ──
  q('crp-01', 'primaria', '🧬',
    T('¿Cómo se llama la célula reproductora masculina?', 'What is the male reproductive cell called?', 'Com es diu la cèl·lula reproductora masculina?'),
    O(['Espermatozoide', 'Óvulo', 'Cigoto', 'Neurona'], ['Sperm cell', 'Egg cell (ovum)', 'Zygote', 'Neuron'], ['Espermatozoide', 'Òvul', 'Zigot', 'Neurona']),
    T('Los espermatozoides se forman en los testículos y los óvulos en los ovarios. Cuando un espermatozoide y un óvulo se unen, forman el cigoto.', 'Sperm cells form in the testes and egg cells in the ovaries. When a sperm cell and an egg cell join, they form the zygote.', 'Els espermatozoides es formen als testicles i els òvuls als ovaris. Quan un espermatozoide i un òvul s’uneixen, formen el zigot.')),
  q('crp-02', 'primaria', '👶',
    T('¿En qué órgano se desarrolla el bebé durante el embarazo?', 'In which organ does the baby develop during pregnancy?', 'En quin òrgan es desenvolupa el nadó durant l’embaràs?'),
    O(['En el útero', 'En el ovario', 'En el estómago', 'En la trompa de Falopio'], ['In the uterus (womb)', 'In the ovary', 'In the stomach', 'In the Fallopian tube'], ['A l’úter', 'A l’ovari', 'A l’estómac', 'A la trompa de Fal·lopi']),
    T('El útero es un órgano musculoso que crece con el bebé durante unos nueve meses. El bebé recibe alimento y oxígeno de la madre a través de la placenta y el cordón umbilical.', 'The uterus is a muscular organ that grows with the baby for about nine months. The baby gets food and oxygen from the mother through the placenta and umbilical cord.', 'L’úter és un òrgan musculós que creix amb el nadó durant uns nou mesos. El nadó rep aliment i oxigen de la mare a través de la placenta i el cordó umbilical.')),
  q('crp-03', 'eso', '🎯',
    T('¿Dónde se produce normalmente la fecundación?', 'Where does fertilisation normally take place?', 'On es produeix normalment la fecundació?'),
    O(['En las trompas de Falopio', 'En el útero', 'En el ovario', 'En la placenta'], ['In the Fallopian tubes', 'In the uterus', 'In the ovary', 'In the placenta'], ['A les trompes de Fal·lopi', 'A l’úter', 'A l’ovari', 'A la placenta']),
    T('El óvulo sale del ovario y viaja por la trompa; allí suele encontrarse con el espermatozoide. Después, el embrión baja y se implanta en la pared del útero.', 'The egg leaves the ovary and travels down the tube; that is usually where it meets the sperm. Then the embryo moves down and implants in the wall of the uterus.', 'L’òvul surt de l’ovari i viatja per la trompa; allà sol trobar-se amb l’espermatozoide. Després, l’embrió baixa i s’implanta a la paret de l’úter.')),
  q('crp-04', 'eso', '🥚',
    T('¿Qué es el cigoto?', 'What is a zygote?', 'Què és el zigot?'),
    O(['La primera célula del nuevo ser, fruto de la unión de óvulo y espermatozoide', 'Un óvulo que no ha sido fecundado', 'La membrana que protege al feto', 'El órgano que alimenta al bebé'], ['The first cell of the new being, from the union of egg and sperm', 'An egg that has not been fertilised', 'The membrane that protects the foetus', 'The organ that feeds the baby'], ['La primera cèl·lula del nou ésser, fruit de la unió d’òvul i espermatozoide', 'Un òvul que no ha estat fecundat', 'La membrana que protegeix el fetus', 'L’òrgan que alimenta el nadó']),
    T('El cigoto reúne la información genética de la madre y del padre y empieza a dividirse enseguida: de esa única célula salen todas las del cuerpo. El órgano que alimenta al bebé es la placenta.', 'The zygote brings together the mother’s and father’s genetic information and starts dividing straight away: every cell in the body comes from that single cell. The organ that feeds the baby is the placenta.', 'El zigot reuneix la informació genètica de la mare i del pare i comença a dividir-se de seguida: d’aquesta única cèl·lula en surten totes les del cos. L’òrgan que alimenta el nadó és la placenta.')),
  q('crp-05', 'eso', '📆',
    T('¿Cuánto dura, aproximadamente, el ciclo menstrual?', 'About how long is the menstrual cycle?', 'Quant dura, aproximadament, el cicle menstrual?'),
    O(['Unos 28 días', 'Unos 7 días', 'Unos 9 meses', 'Un año'], ['About 28 days', 'About 7 days', 'About 9 months', 'One year'], ['Uns 28 dies', 'Uns 7 dies', 'Uns 9 mesos', 'Un any']),
    T('Hacia la mitad del ciclo un ovario suelta un óvulo (ovulación). Si no hay fecundación, la capa interna del útero se desprende: es la menstruación, que dura unos días. Nueve meses es el embarazo.', 'Around the middle of the cycle an ovary releases an egg (ovulation). If there is no fertilisation, the inner lining of the uterus is shed: that is menstruation, which lasts a few days. Nine months is pregnancy.', 'Cap a la meitat del cicle un ovari allibera un òvul (ovulació). Si no hi ha fecundació, la capa interna de l’úter es desprèn: és la menstruació, que dura uns dies. Nou mesos és l’embaràs.')),

  // ── Los sentidos ──
  q('cs-01', 'primaria', '👁️',
    T('¿Cómo se llama el agujero negro del centro del ojo, que se hace más grande cuando hay poca luz?', 'What is the black hole in the middle of the eye that gets bigger when there is little light?', 'Com es diu el forat negre del centre de l’ull, que es fa més gran quan hi ha poca llum?'),
    O(['La pupila', 'El iris', 'La retina', 'La córnea'], ['The pupil', 'The iris', 'The retina', 'The cornea'], ['La pupil·la', 'L’iris', 'La retina', 'La còrnia']),
    T('La pupila deja pasar la luz. El iris, la parte de color, es el músculo que la abre con poca luz y la cierra con mucha.', 'The pupil lets light in. The iris, the coloured part, is the muscle that opens it in dim light and closes it in bright light.', 'La pupil·la deixa passar la llum. L’iris, la part de color, és el múscul que l’obre amb poca llum i la tanca amb molta.')),
  q('cs-02', 'eso', '🖼️',
    T('¿En qué parte del ojo se forma la imagen?', 'In which part of the eye is the image formed?', 'En quina part de l’ull es forma la imatge?'),
    O(['En la retina', 'En el cristalino', 'En la córnea', 'En la pupila'], ['On the retina', 'In the lens', 'On the cornea', 'In the pupil'], ['A la retina', 'Al cristal·lí', 'A la còrnia', 'A la pupil·la']),
    T('El cristalino enfoca la luz y la imagen se forma, invertida, en la retina, que tiene las células sensibles (conos y bastones). El nervio óptico la lleva al cerebro, que la pone del derecho.', 'The lens focuses the light and the image forms, upside down, on the retina, which has the light-sensitive cells (cones and rods). The optic nerve takes it to the brain, which turns it the right way up.', 'El cristal·lí enfoca la llum i la imatge es forma, invertida, a la retina, que té les cèl·lules sensibles (cons i bastons). El nervi òptic la porta al cervell, que la posa del dret.')),
  q('cs-03', 'eso', '👂',
    T('¿Qué parte del oído se encarga también del equilibrio?', 'Which part of the ear is also in charge of balance?', 'Quina part de l’oïda s’encarrega també de l’equilibri?'),
    O(['El oído interno', 'El tímpano', 'El pabellón auditivo (la oreja)', 'La trompa de Eustaquio'], ['The inner ear', 'The eardrum', 'The outer ear (the pinna)', 'The Eustachian tube'], ['L’oïda interna', 'El timpà', 'El pavelló auditiu (l’orella)', 'La trompa d’Eustaqui']),
    T('En el oído interno están la cóclea, para oír, y los canales semicirculares, con un líquido que se mueve al girar la cabeza: por eso marea dar muchas vueltas.', 'The inner ear holds the cochlea, for hearing, and the semicircular canals, with a fluid that moves when the head turns: that is why spinning round makes you dizzy.', 'A l’oïda interna hi ha la còclea, per sentir, i els canals semicirculars, amb un líquid que es mou en girar el cap: per això mareja fer moltes voltes.')),
  q('cs-04', 'primaria', '✋',
    T('¿Cuál es el órgano de los sentidos más grande del cuerpo?', 'Which is the largest sense organ in the body?', 'Quin és l’òrgan dels sentits més gran del cos?'),
    O(['La piel', 'El ojo', 'La lengua', 'El oído'], ['The skin', 'The eye', 'The tongue', 'The ear'], ['La pell', 'L’ull', 'La llengua', 'L’oïda']),
    T('La piel, órgano del tacto, cubre todo el cuerpo y nota la presión, el calor, el frío y el dolor. En las yemas de los dedos tiene muchos más receptores que en la espalda.', 'The skin, the organ of touch, covers the whole body and senses pressure, heat, cold and pain. Fingertips have many more receptors than the back.', 'La pell, òrgan del tacte, cobreix tot el cos i nota la pressió, la calor, el fred i el dolor. A les puntes dels dits té molts més receptors que a l’esquena.')),
  q('cs-05', 'eso', '👅',
    T('Además de dulce, salado, ácido y amargo, ¿qué otro sabor básico detecta la lengua?', 'Besides sweet, salty, sour and bitter, which other basic taste does the tongue detect?', 'A més de dolç, salat, àcid i amarg, quin altre gust bàsic detecta la llengua?'),
    O(['Umami', 'Picante', 'Mentolado', 'Afrutado'], ['Umami', 'Spicy', 'Minty', 'Fruity'], ['Umami', 'Picant', 'Mentolat', 'Afruitat']),
    T('El umami es el sabor del glutamato: caldo, queso curado, tomate maduro. El picante no es un sabor: es una sensación de dolor y calor que notan los nervios de la boca.', 'Umami is the taste of glutamate: broth, mature cheese, ripe tomato. Spicy heat is not a taste: it is a sensation of pain and heat picked up by the nerves in the mouth.', 'L’umami és el gust del glutamat: brou, formatge curat, tomàquet madur. El picant no és un gust: és una sensació de dolor i calor que noten els nervis de la boca.')),
  q('cs-06', 'eso', '👓',
    T('Una persona miope ve mal de lejos. ¿Qué le pasa a su ojo?', 'A short-sighted person sees badly at a distance. What happens in their eye?', 'Una persona miop hi veu malament de lluny. Què li passa a l’ull?'),
    O(['La imagen se forma delante de la retina', 'La imagen se forma detrás de la retina', 'La pupila no se abre', 'No tiene cristalino'], ['The image forms in front of the retina', 'The image forms behind the retina', 'The pupil does not open', 'It has no lens'], ['La imatge es forma davant de la retina', 'La imatge es forma darrere de la retina', 'La pupil·la no s’obre', 'No té cristal·lí']),
    T('En la miopía el ojo enfoca demasiado y la imagen de lo lejano queda delante de la retina; se corrige con lentes divergentes. Si se forma detrás, es hipermetropía (se ve mal de cerca).', 'In short-sightedness the eye focuses too much and the image of distant things falls in front of the retina; it is corrected with diverging lenses. If it forms behind, that is long-sightedness (blurry close up).', 'En la miopia l’ull enfoca massa i la imatge del que és lluny queda davant de la retina; es corregeix amb lents divergents. Si es forma darrere, és hipermetropia (s’hi veu malament de prop).')),
]
