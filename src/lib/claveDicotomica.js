// Clave dicotómica (biología · seres vivos, primaria y ESO): se clasifica un
// ser vivo recorriendo una clave de preguntas de sí/no, como hacen los
// biólogos de campo. Cada ser vivo trae sus rasgos visibles escritos: la
// destreza es LEER los rasgos y seguir la clave, no recitar de memoria.
//
// La clave es un árbol: cada nodo es una pregunta y cada rama lleva a otro
// nodo o a un grupo. El camino correcto de un ser vivo se calcula desde su
// grupo (no se guarda a mano), así que un dato y la clave nunca se contradicen.
//
// Niveles (la raíz de la clave cambia):
//   facil   → vertebrados: mamíferos, aves, peces, reptiles, anfibios
//   medio   → animales: + artrópodos (4 grupos), anélidos, equinodermos,
//             cnidarios, moluscos y poríferos
//   dificil → animales y plantas: + musgos, helechos, gimnospermas y
//             angiospermas

const T = (es, en, ca) => ({ es, en, ca })

export const GRUPOS = {
  mamifero:    { nombre: T('Mamífero', 'Mammal', 'Mamífer') },
  ave:         { nombre: T('Ave', 'Bird', 'Au') },
  pez:         { nombre: T('Pez', 'Fish', 'Peix') },
  reptil:      { nombre: T('Reptil', 'Reptile', 'Rèptil') },
  anfibio:     { nombre: T('Anfibio', 'Amphibian', 'Amfibi') },
  insecto:     { nombre: T('Insecto', 'Insect', 'Insecte') },
  aracnido:    { nombre: T('Arácnido', 'Arachnid', 'Aràcnid') },
  miriapodo:   { nombre: T('Miriápodo', 'Myriapod', 'Miriàpode') },
  crustaceo:   { nombre: T('Crustáceo', 'Crustacean', 'Crustaci') },
  anelido:     { nombre: T('Anélido', 'Annelid', 'Anèl·lid') },
  equinodermo: { nombre: T('Equinodermo', 'Echinoderm', 'Equinoderm') },
  cnidario:    { nombre: T('Cnidario', 'Cnidarian', 'Cnidari') },
  molusco:     { nombre: T('Molusco', 'Mollusc', 'Mol·lusc') },
  porifero:    { nombre: T('Porífero', 'Sponge', 'Porífer') },
  musgo:       { nombre: T('Musgo (briofita)', 'Moss (bryophyte)', 'Molsa (briòfit)') },
  helecho:     { nombre: T('Helecho (pteridofita)', 'Fern (pteridophyte)', 'Falguera (pteridòfit)') },
  gimnosperma: { nombre: T('Gimnosperma', 'Gymnosperm', 'Gimnosperma') },
  angiosperma: { nombre: T('Angiosperma', 'Angiosperm', 'Angiosperma') },
}

// Los nodos de la clave. `si`/`no`: id de otro nodo o de un grupo.
export const NODOS = {
  planta:   { q: T('¿Es una planta (verde, fija al suelo, hace la fotosíntesis)?', 'Is it a plant (green, rooted, does photosynthesis)?', 'És una planta (verda, fixada a terra, fa la fotosíntesi)?'), si: 'vasos', no: 'columna' },
  columna:  { q: T('¿Tiene columna vertebral (esqueleto interno con vértebras)?', 'Does it have a backbone (internal skeleton with vertebrae)?', 'Té columna vertebral (esquelet intern amb vèrtebres)?'), si: 'leche', no: 'patas' },
  leche:    { q: T('¿Sus crías maman leche?', 'Do its young feed on milk?', 'Les seves cries mamen llet?'), si: 'mamifero', no: 'plumas' },
  plumas:   { q: T('¿Tiene plumas?', 'Does it have feathers?', 'Té plomes?'), si: 'ave', no: 'branquias' },
  branquias:{ q: T('¿Tiene aletas y respira por branquias toda su vida?', 'Does it have fins and breathe through gills all its life?', 'Té aletes i respira per brànquies tota la vida?'), si: 'pez', no: 'escamas' },
  escamas:  { q: T('¿Tiene la piel cubierta de escamas secas?', 'Is its skin covered in dry scales?', 'Té la pell coberta d’escates seques?'), si: 'reptil', no: 'anfibio' },
  patas:    { q: T('¿Tiene patas articuladas y un esqueleto por fuera (exoesqueleto)?', 'Does it have jointed legs and an outer skeleton (exoskeleton)?', 'Té potes articulades i un esquelet per fora (exoesquelet)?'), si: 'seis', no: 'anillos' },
  seis:     { q: T('¿Tiene 6 patas?', 'Does it have 6 legs?', 'Té 6 potes?'), si: 'insecto', no: 'ocho' },
  ocho:     { q: T('¿Tiene 8 patas?', 'Does it have 8 legs?', 'Té 8 potes?'), si: 'aracnido', no: 'muchas' },
  muchas:   { q: T('¿Tiene el cuerpo largo y muchísimas patas (más de 20)?', 'Does it have a long body and lots of legs (more than 20)?', 'Té el cos llarg i moltíssimes potes (més de 20)?'), si: 'miriapodo', no: 'crustaceo' },
  anillos:  { q: T('¿Tiene forma de gusano, con el cuerpo dividido en anillos?', 'Is it worm-shaped, with its body divided into rings?', 'Té forma de cuc, amb el cos dividit en anells?'), si: 'anelido', no: 'estrella' },
  estrella: { q: T('¿Tiene forma de estrella o de bola, en cinco partes iguales, con la piel con pinchos?', 'Is it star- or ball-shaped, in five equal parts, with spiny skin?', 'Té forma d’estrella o de bola, en cinc parts iguals, amb la pell amb punxes?'), si: 'equinodermo', no: 'urticante' },
  urticante:{ q: T('¿Tiene tentáculos que pican y el cuerpo gelatinoso o en forma de pólipo?', 'Does it have stinging tentacles and a jelly-like or polyp-shaped body?', 'Té tentacles que piquen i el cos gelatinós o en forma de pòlip?'), si: 'cnidario', no: 'blando' },
  blando:   { q: T('¿Tiene el cuerpo blando, sin anillos, y muchas veces una concha?', 'Does it have a soft body, without rings, and often a shell?', 'Té el cos tou, sense anells, i moltes vegades una closca?'), si: 'molusco', no: 'porifero' },
  vasos:    { q: T('¿Tiene raíz, tallo y hojas de verdad (con vasos que llevan la savia)?', 'Does it have true roots, stem and leaves (with vessels carrying sap)?', 'Té arrel, tija i fulles de veritat (amb vasos que porten la saba)?'), si: 'semillas', no: 'musgo' },
  semillas: { q: T('¿Produce semillas?', 'Does it produce seeds?', 'Produeix llavors?'), si: 'fruto', no: 'helecho' },
  fruto:    { q: T('¿Tiene flores y sus semillas van dentro de un fruto?', 'Does it have flowers, with its seeds inside a fruit?', 'Té flors i les seves llavors van dins d’un fruit?'), si: 'angiosperma', no: 'gimnosperma' },
}

export const NIVELES = {
  facil:   { raiz: 'leche', grupos: ['mamifero', 'ave', 'pez', 'reptil', 'anfibio'] },
  medio:   { raiz: 'columna', grupos: ['mamifero', 'ave', 'pez', 'reptil', 'anfibio', 'insecto', 'aracnido', 'miriapodo', 'crustaceo', 'anelido', 'equinodermo', 'cnidario', 'molusco', 'porifero'] },
  dificil: { raiz: 'planta', grupos: null }, // todos
}

// Seres vivos: grupo, emoji (null si no hay uno seguro en Windows 10) y sus
// rasgos visibles. `nota`: un dato curioso que sale al corregir.
const S = (grupo, emoji, nombre, rasgos, nota = null) => ({ grupo, emoji, nombre, rasgos, nota })
export const SERES = {
  vaca:        S('mamifero', '🐄', T('Vaca', 'Cow', 'Vaca'), T('Pelo corto, cuatro patas; el ternero mama leche.', 'Short hair, four legs; the calf drinks milk.', 'Pèl curt, quatre potes; el vedell mama llet.')),
  murcielago:  S('mamifero', '🦇', T('Murciélago', 'Bat', 'Ratpenat'), T('Vuela con alas de piel; sus crías maman leche.', 'Flies on skin wings; its young drink milk.', 'Vola amb ales de pell; les seves cries mamen llet.'), T('Vuela, pero no es un ave: es el único mamífero que vuela de verdad.', 'It flies, but it is not a bird: it is the only mammal that truly flies.', 'Vola, però no és un ocell: és l’únic mamífer que vola de debò.')),
  delfin:      S('mamifero', '🐬', T('Delfín', 'Dolphin', 'Dofí'), T('Vive en el mar, tiene aletas y respira aire por un orificio; la cría mama leche.', 'Lives in the sea, has fins and breathes air through a blowhole; the calf drinks milk.', 'Viu al mar, té aletes i respira aire per un orifici; la cria mama llet.'), T('Tiene aletas, pero respira aire con pulmones y amamanta: es un mamífero, no un pez.', 'It has fins, but breathes air with lungs and feeds milk: it is a mammal, not a fish.', 'Té aletes, però respira aire amb pulmons i alleta: és un mamífer, no un peix.')),
  ballena:     S('mamifero', '🐋', T('Ballena', 'Whale', 'Balena'), T('Enorme, vive en el mar y sube a respirar aire; la cría mama leche.', 'Huge, lives in the sea and surfaces to breathe air; the calf drinks milk.', 'Enorme, viu al mar i puja a respirar aire; la cria mama llet.')),
  canguro:     S('mamifero', '🦘', T('Canguro', 'Kangaroo', 'Cangur'), T('Salta sobre dos patas; la cría crece en una bolsa y mama leche.', 'Hops on two legs; the joey grows in a pouch and drinks milk.', 'Salta sobre dues potes; la cria creix en una bossa i mama llet.')),
  erizo:       S('mamifero', '🦔', T('Erizo (de tierra)', 'Hedgehog', 'Eriçó (de terra)'), T('Cubierto de púas, que son pelos duros; sus crías maman leche.', 'Covered in spines, which are stiff hairs; its young drink milk.', 'Cobert de pues, que són pèls durs; les seves cries mamen llet.')),
  raton:       S('mamifero', '🐁', T('Ratón', 'Mouse', 'Ratolí'), T('Pequeño, con pelo y bigotes; las crías maman leche.', 'Small, with fur and whiskers; the young drink milk.', 'Petit, amb pèl i bigotis; les cries mamen llet.')),
  pinguino:    S('ave', '🐧', T('Pingüino', 'Penguin', 'Pingüí'), T('No vuela, nada en el mar; cuerpo cubierto de plumas; pone huevos.', 'Cannot fly, swims in the sea; body covered in feathers; lays eggs.', 'No vola, neda al mar; cos cobert de plomes; pon ous.'), T('No vuela, pero tiene plumas: es un ave. Sus alas le sirven para nadar.', 'It cannot fly, but it has feathers: it is a bird. Its wings are for swimming.', 'No vola, però té plomes: és un ocell. Les ales li serveixen per nedar.')),
  aguila:      S('ave', '🦅', T('Águila', 'Eagle', 'Àguila'), T('Plumas, pico curvo y garras; pone huevos.', 'Feathers, hooked beak and talons; lays eggs.', 'Plomes, bec corbat i urpes; pon ous.')),
  buho:        S('ave', '🦉', T('Búho', 'Owl', 'Duc'), T('Caza de noche; plumas suaves y ojos grandes; pone huevos.', 'Hunts at night; soft feathers and big eyes; lays eggs.', 'Caça de nit; plomes suaus i ulls grans; pon ous.')),
  gallina:     S('ave', '🐔', T('Gallina', 'Hen', 'Gallina'), T('Plumas, pico y cresta; pone huevos.', 'Feathers, beak and comb; lays eggs.', 'Plomes, bec i cresta; pon ous.')),
  pato:        S('ave', '🦆', T('Pato', 'Duck', 'Ànec'), T('Nada y vuela; plumas impermeables y patas palmeadas.', 'Swims and flies; waterproof feathers and webbed feet.', 'Neda i vola; plomes impermeables i potes palmades.')),
  tiburon:     S('pez', '🦈', T('Tiburón', 'Shark', 'Tauró'), T('Vive siempre en el agua; aletas y branquias; esqueleto de cartílago.', 'Always lives in water; fins and gills; skeleton of cartilage.', 'Viu sempre a l’aigua; aletes i brànquies; esquelet de cartílag.'), T('Su esqueleto es de cartílago, no de hueso, pero tiene columna: es un pez.', 'Its skeleton is cartilage, not bone, but it has a backbone: it is a fish.', 'El seu esquelet és de cartílag, no d’os, però té columna: és un peix.')),
  sardina:     S('pez', '🐟', T('Sardina', 'Sardine', 'Sardina'), T('Nada en bancos; escamas, aletas y branquias toda la vida.', 'Swims in shoals; scales, fins and gills all its life.', 'Neda en bancs; escates, aletes i brànquies tota la vida.')),
  payaso:      S('pez', '🐠', T('Pez payaso', 'Clownfish', 'Peix pallasso'), T('Vive entre anémonas; aletas y branquias.', 'Lives among anemones; fins and gills.', 'Viu entre anemones; aletes i brànquies.')),
  globo:       S('pez', '🐡', T('Pez globo', 'Pufferfish', 'Peix globus'), T('Se hincha si lo atacan; aletas y branquias.', 'Puffs up when attacked; fins and gills.', 'S’infla si l’ataquen; aletes i brànquies.')),
  caballito:   S('pez', null, T('Caballito de mar', 'Seahorse', 'Cavallet de mar'), T('Nada en vertical; aletas pequeñas y branquias toda la vida.', 'Swims upright; small fins and gills all its life.', 'Neda en vertical; aletes petites i brànquies tota la vida.'), T('Con esa forma no lo parece, pero tiene aletas y branquias: es un pez.', 'It does not look like one, but it has fins and gills: it is a fish.', 'Amb aquesta forma no ho sembla, però té aletes i brànquies: és un peix.')),
  serpiente:   S('reptil', '🐍', T('Serpiente', 'Snake', 'Serp'), T('Sin patas; piel de escamas secas; pone huevos con cáscara.', 'No legs; skin of dry scales; lays shelled eggs.', 'Sense potes; pell d’escates seques; pon ous amb closca.')),
  tortuga:     S('reptil', '🐢', T('Tortuga', 'Tortoise', 'Tortuga'), T('Caparazón duro; patas y cabeza con escamas secas; respira aire.', 'Hard shell; legs and head with dry scales; breathes air.', 'Closca dura; potes i cap amb escates seques; respira aire.'), T('Tiene concha, pero también columna vertebral y escamas: es un reptil, no un molusco.', 'It has a shell, but also a backbone and scales: it is a reptile, not a mollusc.', 'Té closca, però també columna vertebral i escates: és un rèptil, no un mol·lusc.')),
  cocodrilo:   S('reptil', '🐊', T('Cocodrilo', 'Crocodile', 'Cocodril'), T('Vive en ríos, pero respira aire; piel de escamas duras y secas.', 'Lives in rivers but breathes air; skin of hard, dry scales.', 'Viu als rius, però respira aire; pell d’escates dures i seques.')),
  lagartija:   S('reptil', '🦎', T('Lagartija', 'Wall lizard', 'Sargantana'), T('Toma el sol en las piedras; escamas secas; pone huevos.', 'Basks on stones; dry scales; lays eggs.', 'Pren el sol a les pedres; escates seques; pon ous.')),
  rana:        S('anfibio', '🐸', T('Rana', 'Frog', 'Granota'), T('Piel desnuda y húmeda; de renacuajo tenía branquias, de adulta pulmones.', 'Bare, moist skin; as a tadpole it had gills, as an adult lungs.', 'Pell nua i humida; de cullerot tenia brànquies, d’adulta pulmons.'), T('Cambia de forma al crecer (metamorfosis): por eso no respira por branquias toda la vida.', 'It changes shape as it grows (metamorphosis): that is why it does not breathe through gills all its life.', 'Canvia de forma en créixer (metamorfosi): per això no respira per brànquies tota la vida.')),
  salamandra:  S('anfibio', null, T('Salamandra', 'Salamander', 'Salamandra'), T('Parece una lagartija, pero su piel es lisa, húmeda y sin escamas.', 'Looks like a lizard, but its skin is smooth, moist and scaleless.', 'Sembla una sargantana, però la seva pell és llisa, humida i sense escates.'), T('Se parece a un reptil, pero la piel húmeda y sin escamas la delata: es un anfibio.', 'It looks like a reptile, but its moist scaleless skin gives it away: it is an amphibian.', 'S’assembla a un rèptil, però la pell humida i sense escates la delata: és un amfibi.')),
  triton:      S('anfibio', null, T('Tritón', 'Newt', 'Tritó'), T('Vive en charcas; piel húmeda sin escamas; cola aplanada.', 'Lives in ponds; moist skin without scales; flattened tail.', 'Viu a les basses; pell humida sense escates; cua aplanada.')),
  hormiga:     S('insecto', '🐜', T('Hormiga', 'Ant', 'Formiga'), T('Exoesqueleto, antenas y 6 patas articuladas.', 'Exoskeleton, antennae and 6 jointed legs.', 'Exoesquelet, antenes i 6 potes articulades.')),
  mariposa:    S('insecto', '🦋', T('Mariposa', 'Butterfly', 'Papallona'), T('Alas con escamas de colores; 6 patas articuladas.', 'Wings with coloured scales; 6 jointed legs.', 'Ales amb escates de colors; 6 potes articulades.')),
  abeja:       S('insecto', '🐝', T('Abeja', 'Bee', 'Abella'), T('Dos pares de alas, aguijón; 6 patas articuladas.', 'Two pairs of wings, a sting; 6 jointed legs.', 'Dos parells d’ales, fibló; 6 potes articulades.')),
  mariquita:   S('insecto', '🐞', T('Mariquita', 'Ladybird', 'Marieta'), T('Caparazón rojo con puntos; 6 patas articuladas.', 'Red shell with spots; 6 jointed legs.', 'Closca vermella amb punts; 6 potes articulades.')),
  saltamontes: S('insecto', '🦗', T('Saltamontes', 'Grasshopper', 'Llagosta'), T('Patas traseras para saltar; 6 patas articuladas en total.', 'Back legs for jumping; 6 jointed legs in all.', 'Potes del darrere per saltar; 6 potes articulades en total.')),
  arana:       S('aracnido', '🕷️', T('Araña', 'Spider', 'Aranya'), T('Teje telas; 8 patas articuladas, sin antenas.', 'Spins webs; 8 jointed legs, no antennae.', 'Teixeix teles; 8 potes articulades, sense antenes.'), T('No es un insecto: tiene 8 patas y no tiene antenas.', 'It is not an insect: it has 8 legs and no antennae.', 'No és un insecte: té 8 potes i no té antenes.')),
  escorpion:   S('aracnido', '🦂', T('Escorpión', 'Scorpion', 'Escorpí'), T('Pinzas y cola con aguijón; 8 patas articuladas.', 'Pincers and a stinging tail; 8 jointed legs.', 'Pinces i cua amb fibló; 8 potes articulades.')),
  garrapata:   S('aracnido', null, T('Garrapata', 'Tick', 'Paparra'), T('Diminuta, chupa sangre; 8 patas articuladas.', 'Tiny, sucks blood; 8 jointed legs.', 'Diminuta, xucla sang; 8 potes articulades.')),
  ciempies:    S('miriapodo', null, T('Ciempiés', 'Centipede', 'Centpeus'), T('Cuerpo largo en segmentos, con un par de patas en cada uno: decenas de patas.', 'Long segmented body, one pair of legs on each: dozens of legs.', 'Cos llarg en segments, amb un parell de potes a cadascun: desenes de potes.')),
  milpies:     S('miriapodo', null, T('Milpiés', 'Millipede', 'Milpeus'), T('Cuerpo largo y cilíndrico; dos pares de patas por segmento: cientos.', 'Long cylindrical body; two pairs of legs per segment: hundreds.', 'Cos llarg i cilíndric; dos parells de potes per segment: centenars.')),
  cangrejo:    S('crustaceo', '🦀', T('Cangrejo', 'Crab', 'Cranc'), T('Caparazón duro, pinzas; 10 patas articuladas; respira por branquias.', 'Hard shell, pincers; 10 jointed legs; breathes through gills.', 'Closca dura, pinces; 10 potes articulades; respira per brànquies.')),
  gamba:       S('crustaceo', '🦐', T('Gamba', 'Prawn', 'Gamba'), T('Exoesqueleto fino, antenas largas; 10 patas articuladas.', 'Thin exoskeleton, long antennae; 10 jointed legs.', 'Exoesquelet fi, antenes llargues; 10 potes articulades.')),
  langosta:    S('crustaceo', '🦞', T('Bogavante', 'Lobster', 'Llamàntol'), T('Pinzas enormes; 10 patas articuladas; vive en el fondo del mar.', 'Huge pincers; 10 jointed legs; lives on the seabed.', 'Pinces enormes; 10 potes articulades; viu al fons del mar.')),
  cochinilla:  S('crustaceo', null, T('Cochinilla de la humedad', 'Woodlouse', 'Porquet de Sant Antoni'), T('Se hace una bola; vive bajo piedras húmedas; 14 patas articuladas.', 'Rolls into a ball; lives under damp stones; 14 jointed legs.', 'Es fa una bola; viu sota pedres humides; 14 potes articulades.'), T('Parece un insecto, pero es un crustáceo de tierra: pariente de las gambas.', 'It looks like an insect, but it is a land crustacean: a relative of prawns.', 'Sembla un insecte, però és un crustaci de terra: parent de les gambes.')),
  lombriz:     S('anelido', null, T('Lombriz de tierra', 'Earthworm', 'Cuc de terra'), T('Cuerpo alargado y blando, dividido en muchos anillos; sin patas.', 'Long soft body divided into many rings; no legs.', 'Cos allargat i tou, dividit en molts anells; sense potes.')),
  sanguijuela: S('anelido', null, T('Sanguijuela', 'Leech', 'Sangonera'), T('Gusano aplanado con anillos y ventosas; chupa sangre.', 'Flattened ringed worm with suckers; sucks blood.', 'Cuc aplanat amb anells i ventoses; xucla sang.')),
  estrellamar: S('equinodermo', '⭐', T('Estrella de mar', 'Starfish', 'Estrella de mar'), T('Cinco brazos iguales; piel rugosa con pinchos.', 'Five equal arms; rough spiny skin.', 'Cinc braços iguals; pell rugosa amb punxes.')),
  erizomar:    S('equinodermo', null, T('Erizo de mar', 'Sea urchin', 'Garota'), T('Una bola cubierta de pinchos largos, en cinco partes iguales.', 'A ball covered in long spines, in five equal parts.', 'Una bola coberta de punxes llargues, en cinc parts iguals.'), T('No tiene nada que ver con el erizo de tierra, que es un mamífero.', 'It has nothing to do with the hedgehog, which is a mammal.', 'No té res a veure amb l’eriçó de terra, que és un mamífer.')),
  medusa:      S('cnidario', null, T('Medusa', 'Jellyfish', 'Medusa'), T('Cuerpo gelatinoso y transparente; tentáculos que pican.', 'Jelly-like see-through body; stinging tentacles.', 'Cos gelatinós i transparent; tentacles que piquen.')),
  anemona:     S('cnidario', null, T('Anémona de mar', 'Sea anemone', 'Anemone de mar'), T('Pegada a las rocas como un pólipo; tentáculos que pican.', 'Stuck to rocks like a polyp; stinging tentacles.', 'Enganxada a les roques com un pòlip; tentacles que piquen.')),
  coral:       S('cnidario', null, T('Coral', 'Coral', 'Corall'), T('Colonias de pequeños pólipos con tentáculos que pican.', 'Colonies of tiny polyps with stinging tentacles.', 'Colònies de petits pòlips amb tentacles que piquen.'), T('Parece una roca o una planta, pero el coral es un animal: miles de pólipos juntos.', 'It looks like a rock or a plant, but coral is an animal: thousands of polyps together.', 'Sembla una roca o una planta, però el corall és un animal: milers de pòlips junts.')),
  caracol:     S('molusco', '🐌', T('Caracol', 'Snail', 'Cargol'), T('Cuerpo blando, sin anillos, dentro de una concha en espiral.', 'Soft body, without rings, inside a spiral shell.', 'Cos tou, sense anells, dins d’una closca en espiral.')),
  pulpo:       S('molusco', '🐙', T('Pulpo', 'Octopus', 'Pop'), T('Cuerpo blando sin concha; ocho brazos con ventosas que no pican.', 'Soft body without a shell; eight arms with suckers that do not sting.', 'Cos tou sense closca; vuit braços amb ventoses que no piquen.'), T('Es un molusco, pariente del caracol, aunque haya perdido la concha.', 'It is a mollusc, a relative of the snail, even though it has lost its shell.', 'És un mol·lusc, parent del cargol, encara que hagi perdut la closca.')),
  calamar:     S('molusco', '🦑', T('Calamar', 'Squid', 'Calamar'), T('Cuerpo blando con una «pluma» dentro; tentáculos con ventosas que no pican.', 'Soft body with a «pen» inside; tentacles with suckers that do not sting.', 'Cos tou amb una «ploma» a dins; tentacles amb ventoses que no piquen.')),
  mejillon:    S('molusco', null, T('Mejillón', 'Mussel', 'Musclo'), T('Cuerpo blando entre dos conchas; vive pegado a las rocas.', 'Soft body between two shells; lives stuck to rocks.', 'Cos tou entre dues closques; viu enganxat a les roques.')),
  esponja:     S('porifero', null, T('Esponja de mar', 'Sea sponge', 'Esponja de mar'), T('Fija al fondo; cuerpo lleno de poros, sin órganos ni tentáculos.', 'Fixed to the seabed; body full of pores, no organs or tentacles.', 'Fixa al fons; cos ple de porus, sense òrgans ni tentacles.'), T('No se mueve y parece una planta, pero es el animal más sencillo que existe.', 'It does not move and looks like a plant, but it is the simplest animal there is.', 'No es mou i sembla una planta, però és l’animal més senzill que existeix.')),
  musgo:       S('musgo', null, T('Musgo', 'Moss', 'Molsa'), T('Alfombra verde y baja en sitios húmedos; sin raíz ni vasos de verdad.', 'Low green carpet in damp places; no true roots or vessels.', 'Catifa verda i baixa en llocs humits; sense arrel ni vasos de veritat.')),
  helecho:     S('helecho', '🌿', T('Helecho', 'Fern', 'Falguera'), T('Hojas grandes y divididas; bajo las hojas, puntos de esporas; no hace semillas.', 'Large divided fronds; spore dots under the leaves; no seeds.', 'Fulles grans i dividides; sota les fulles, punts d’espores; no fa llavors.')),
  colacaballo: S('helecho', null, T('Cola de caballo', 'Horsetail', 'Cua de cavall'), T('Tallos huecos en segmentos; se reproduce por esporas, sin semillas.', 'Hollow segmented stems; reproduces by spores, without seeds.', 'Tiges buides en segments; es reprodueix per espores, sense llavors.')),
  pino:        S('gimnosperma', '🌲', T('Pino', 'Pine', 'Pi'), T('Hojas en aguja; las semillas (piñones) van en piñas, sin fruto ni flores vistosas.', 'Needle leaves; seeds (pine nuts) in cones, no fruit or showy flowers.', 'Fulles en agulla; les llavors (pinyons) van en pinyes, sense fruit ni flors vistoses.')),
  abeto:       S('gimnosperma', null, T('Abeto', 'Fir', 'Avet'), T('Árbol de hoja perenne en aguja; semillas en piñas.', 'Evergreen tree with needle leaves; seeds in cones.', 'Arbre de fulla perenne en agulla; llavors en pinyes.')),
  manzano:     S('angiosperma', '🍎', T('Manzano', 'Apple tree', 'Pomera'), T('Florece en primavera; sus semillas van dentro de la manzana.', 'Blossoms in spring; its seeds are inside the apple.', 'Floreix a la primavera; les llavors van dins de la poma.')),
  girasol:     S('angiosperma', '🌻', T('Girasol', 'Sunflower', 'Gira-sol'), T('Flor grande y amarilla; las pipas son sus frutos con la semilla dentro.', 'Large yellow flower; the seeds we eat are fruits with the seed inside.', 'Flor gran i groga; les pipes són els seus fruits amb la llavor a dins.')),
  rosal:       S('angiosperma', '🌹', T('Rosal', 'Rose bush', 'Roser'), T('Flores vistosas; después de la flor sale un fruto con semillas.', 'Showy flowers; after the flower comes a fruit with seeds.', 'Flors vistoses; després de la flor surt un fruit amb llavors.')),
  trigo:       S('angiosperma', '🌾', T('Trigo', 'Wheat', 'Blat'), T('Flores pequeñas en espiga; cada grano es un fruto con su semilla.', 'Small flowers in an ear; each grain is a fruit with its seed.', 'Flors petites en espiga; cada gra és un fruit amb la seva llavor.'), T('Sus flores no son vistosas, pero las tiene: es una angiosperma.', 'Its flowers are not showy, but it has them: it is an angiosperm.', 'Les seves flors no són vistoses, però en té: és una angiosperma.')),
  palmera:     S('angiosperma', '🌴', T('Palmera', 'Palm tree', 'Palmera'), T('Racimos de flores; sus semillas van dentro de dátiles o cocos.', 'Clusters of flowers; its seeds are inside dates or coconuts.', 'Raïms de flors; les llavors van dins de dàtils o cocos.')),
}

// Grupos de cada nivel (los de difícil, todos).
export const gruposNivel = nivel => NIVELES[nivel]?.grupos ?? Object.keys(GRUPOS)

// El camino correcto desde la raíz hasta el grupo: [{ nodo, resp: 'si'|'no' }].
export function camino(raiz, grupo) {
  const buscar = (id, ruta) => {
    if (id === grupo) return ruta
    const n = NODOS[id]
    if (!n) return null
    return buscar(n.si, [...ruta, { nodo: id, resp: 'si' }]) ?? buscar(n.no, [...ruta, { nodo: id, resp: 'no' }])
  }
  return buscar(raiz, [])
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
let seq = 0

export function genRonda(nivel = 'facil', { rand = Math.random, evitar = null } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const grupos = gruposNivel(nivel)
  // Primero el grupo y luego el ser: si no, los grupos con muchos ejemplos
  // (aves, insectos) saldrían mucho más que la esponja.
  for (;;) {
    const grupo = elige(rand, grupos)
    const ser = elige(rand, Object.keys(SERES).filter(id => SERES[id].grupo === grupo))
    if (!ser || ser === evitar) continue
    return { id: ++seq, nivel, raiz: cfg.raiz, ser, grupo, pasos: camino(cfg.raiz, grupo) }
  }
}

// La ronda se juega en varios pasos; al terminar, el componente responde
// 'ok' (llegó al grupo) o el índice del paso en que se equivocó.
export const esCorrecta = (ronda, r) => r === 'ok'
export const genRound = difficulty => genRonda(difficulty)
export const isCorrect = esCorrecta

// ── Textos ───────────────────────────────────────────────────────────────
const tx = (o, l) => o[l] ?? o.es
export const nombreSer = (ronda, l) => tx(SERES[ronda.ser].nombre, l)
export const rasgosSer = (ronda, l) => tx(SERES[ronda.ser].rasgos, l)
export const nombreGrupo = (g, l) => tx(GRUPOS[g].nombre, l)
export const pregunta = (nodo, l) => tx(NODOS[nodo].q, l)

// «Es un mamífero» / «Es un ave» (en castellano, «un ave»: a tónica) /
// «És una au» / «It is an insect». El artículo no se adivina del nombre.
const FEMENINOS = { es: ['gimnosperma', 'angiosperma'], ca: ['ave', 'gimnosperma', 'angiosperma'] }
export function esUn(grupo, l) {
  const n = nombreGrupo(grupo, l).toLowerCase()
  if (l === 'en') return `It is ${/^[aeiou]/.test(n) ? 'an' : 'a'} ${n}.`
  const art = (FEMENINOS[l] ?? FEMENINOS.es).includes(grupo) ? 'una' : 'un'
  return `${l === 'ca' ? 'És' : 'Es'} ${art} ${n}.`
}

export function explicacion(ronda, l) {
  const si = { es: 'sí', en: 'yes', ca: 'sí' }[l] ?? 'sí'
  const no = { es: 'no', en: 'no', ca: 'no' }[l] ?? 'no'
  const ruta = ronda.pasos.map(p => `${tx(NODOS[p.nodo].q, l)} → ${p.resp === 'si' ? si : no}`).join(' · ')
  const finTxt = esUn(ronda.grupo, l)
  const nota = SERES[ronda.ser].nota ? ' ' + tx(SERES[ronda.ser].nota, l) : ''
  return `${ruta}. ${finTxt}${nota}`
}

// JSON-LD / ejemplos: «¿A qué grupo pertenece…?» con otros tres grupos del nivel.
export function schemaQuestion(ronda, l) {
  const otros = gruposNivel(ronda.nivel).filter(g => g !== ronda.grupo)
  // Distractores estables (sin azar): los vecinos en la lista del nivel.
  const i = Math.max(0, gruposNivel(ronda.nivel).indexOf(ronda.grupo))
  const tres = [0, 1, 2].map(k => otros[(i + k) % otros.length])
  return {
    question: { es: `${nombreSer(ronda, l)}: ${rasgosSer(ronda, l)} ¿A qué grupo pertenece?`, en: `${nombreSer(ronda, l)}: ${rasgosSer(ronda, l)} Which group does it belong to?`, ca: `${nombreSer(ronda, l)}: ${rasgosSer(ronda, l)} A quin grup pertany?` }[l] ?? '',
    correctAnswer: nombreGrupo(ronda.grupo, l),
    wrongAnswers: tres.map(g => nombreGrupo(g, l)),
  }
}

// Lo que sale al corregir en el juego, donde el camino ya se ve paso a paso.
export const conclusion = (ronda, l) => esUn(ronda.grupo, l) + (SERES[ronda.ser].nota ? ' ' + tx(SERES[ronda.ser].nota, l) : '')
