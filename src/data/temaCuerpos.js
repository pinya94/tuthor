// Cuerpos geométricos: áreas y volúmenes (1.º-4.º ESO, también 6.º Primaria
// para el ortoedro). /estudiar/matematicas/cuerpos-geometricos. No había ni
// tema ni página, y se busca mucho («volumen del cilindro», «área del cono»).
// Se fusiona en MATEMATICAS_TEMA. π ≈ 3,14 en los ejemplos.
const T = (es, en, ca) => ({ es, en, ca })
const L = T

export const cuerposGeometricos = {
  metaTitle: L('Cuerpos geométricos: áreas y volúmenes de prisma, pirámide, cilindro, cono y esfera — fórmulas y ejercicios', 'Solid shapes: surface area and volume of prisms, pyramids, cylinders, cones and spheres — formulas and practice', 'Cossos geomètrics: àrees i volums de prisma, piràmide, cilindre, con i esfera — fórmules i exercicis'),
  metaDesc: L('Poliedros y cuerpos redondos, tabla con las fórmulas del área y el volumen de cada uno (prisma, pirámide, cilindro, cono, esfera) y ejercicios resueltos paso a paso.', 'Polyhedra and solids of revolution, a table of surface area and volume formulas (prism, pyramid, cylinder, cone, sphere) and step-by-step worked exercises.', 'Poliedres i cossos rodons, taula amb les fórmules de l’àrea i el volum de cadascun (prisma, piràmide, cilindre, con, esfera) i exercicis resolts pas a pas.'),
  resumen: L(
    ['Los cuerpos geométricos ocupan espacio: tienen largo, ancho y alto. Los poliedros tienen todas sus caras planas (prismas, pirámides, el cubo) y los cuerpos redondos tienen alguna superficie curva (cilindro, cono, esfera). De cada cuerpo se calculan dos cosas: el área, que es la superficie que lo envuelve (en cm², como el papel para forrarlo), y el volumen, que es el espacio que ocupa (en cm³, como el agua que cabe dentro).', 'Hay dos ideas que ahorran memorizar fórmulas: el volumen de cualquier prisma y del cilindro es el área de la base por la altura, y la pirámide y el cono ocupan justo un tercio del prisma o del cilindro con la misma base y altura.'],
    ['Solid shapes take up space: they have length, width and height. Polyhedra have only flat faces (prisms, pyramids, the cube), while solids of revolution have a curved surface (cylinder, cone, sphere). For each solid we work out two things: the surface area, the surface that wraps it (in cm², like the paper to cover it), and the volume, the space it takes up (in cm³, like the water it holds).', 'Two ideas save memorising formulas: the volume of any prism and of the cylinder is the base area times the height, and the pyramid and the cone fill exactly one third of the prism or cylinder with the same base and height.'],
    ['Els cossos geomètrics ocupen espai: tenen llarg, ample i alt. Els poliedres tenen totes les cares planes (prismes, piràmides, el cub) i els cossos rodons tenen alguna superfície corba (cilindre, con, esfera). De cada cos se’n calculen dues coses: l’àrea, que és la superfície que l’embolcalla (en cm², com el paper per folrar-lo), i el volum, que és l’espai que ocupa (en cm³, com l’aigua que hi cap).', 'Hi ha dues idees que estalvien memoritzar fórmules: el volum de qualsevol prisma i del cilindre és l’àrea de la base per l’altura, i la piràmide i el con ocupen just un terç del prisma o del cilindre amb la mateixa base i altura.'],
  ),
  puntosClave: L(
    ['Área = superficie (cm²); volumen = espacio que ocupa (cm³). 1 dm³ = 1 litro.', 'Prisma y cilindro: V = área de la base · altura.', 'Pirámide y cono: V = (área de la base · altura) / 3.', 'Esfera: A = 4·π·r²; V = (4/3)·π·r³.', 'Cono: la generatriz g cumple g² = r² + h² (Pitágoras).', 'Área total = área de las bases + área lateral.'],
    ['Surface area = surface (cm²); volume = space taken up (cm³). 1 dm³ = 1 litre.', 'Prism and cylinder: V = base area × height.', 'Pyramid and cone: V = (base area × height) / 3.', 'Sphere: A = 4·π·r²; V = (4/3)·π·r³.', 'Cone: the slant height g satisfies g² = r² + h² (Pythagoras).', 'Total surface area = area of the bases + curved/lateral area.'],
    ['Àrea = superfície (cm²); volum = espai que ocupa (cm³). 1 dm³ = 1 litre.', 'Prisma i cilindre: V = àrea de la base · altura.', 'Piràmide i con: V = (àrea de la base · altura) / 3.', 'Esfera: A = 4·π·r²; V = (4/3)·π·r³.', 'Con: la generatriu g compleix g² = r² + h² (Pitàgores).', 'Àrea total = àrea de les bases + àrea lateral.'],
  ),
  secciones: [
    {
      titulo: L('Fórmulas de áreas y volúmenes', 'Surface area and volume formulas', 'Fórmules d’àrees i volums'),
      tabla: {
        columnas: L(['Cuerpo', 'Área total', 'Volumen'], ['Solid', 'Total surface area', 'Volume'], ['Cos', 'Àrea total', 'Volum']),
        filas: [
          [L('Cubo (arista a)', 'Cube (edge a)', 'Cub (aresta a)'), 'A = 6·a²', 'V = a³'],
          [L('Ortoedro (a, b, c)', 'Cuboid (a, b, c)', 'Ortoedre (a, b, c)'), 'A = 2·(ab + ac + bc)', 'V = a·b·c'],
          [L('Prisma', 'Prism', 'Prisma'), L('2·Ab + perímetro de la base · h', '2·base area + base perimeter · h', '2·Ab + perímetre de la base · h'), 'V = Ab·h'],
          [L('Pirámide', 'Pyramid', 'Piràmide'), L('Ab + área de los triángulos', 'base area + area of the triangles', 'Ab + àrea dels triangles'), 'V = (Ab·h) / 3'],
          [L('Cilindro', 'Cylinder', 'Cilindre'), 'A = 2·π·r² + 2·π·r·h', 'V = π·r²·h'],
          [L('Cono', 'Cone', 'Con'), 'A = π·r² + π·r·g', 'V = (π·r²·h) / 3'],
          [L('Esfera', 'Sphere', 'Esfera'), 'A = 4·π·r²', 'V = (4/3)·π·r³'],
        ],
      },
    },
    {
      titulo: L('Poliedros y cuerpos redondos', 'Polyhedra and solids of revolution', 'Poliedres i cossos rodons'),
      tabla: {
        columnas: L(['Tipo', 'Qué son', 'Ejemplos'], ['Type', 'What they are', 'Examples'], ['Tipus', 'Què són', 'Exemples']),
        filas: [
          [L('Prisma', 'Prism', 'Prisma'), L('dos bases iguales y paralelas unidas por rectángulos', 'two equal parallel bases joined by rectangles', 'dues bases iguals i paral·leles unides per rectangles'), L('caja de zapatos, cubo, tableta de chocolate', 'shoebox, cube, chocolate bar', 'capsa de sabates, cub, rajola de xocolata')],
          [L('Pirámide', 'Pyramid', 'Piràmide'), L('una base y caras triangulares que se juntan en un vértice', 'one base and triangular faces meeting at a point', 'una base i cares triangulars que s’ajunten en un vèrtex'), L('pirámides de Egipto, tejado de una torre', 'the pyramids of Egypt, a spire', 'piràmides d’Egipte, teulada d’una torre')],
          [L('Cilindro', 'Cylinder', 'Cilindre'), L('dos círculos iguales y una superficie curva', 'two equal circles and a curved surface', 'dos cercles iguals i una superfície corba'), L('lata, vaso, tubería', 'tin can, glass, pipe', 'llauna, got, canonada')],
          [L('Cono', 'Cone', 'Con'), L('una base circular y una superficie curva que acaba en un vértice', 'a circular base and a curved surface ending in a point', 'una base circular i una superfície corba que acaba en un vèrtex'), L('cucurucho, embudo, cono de tráfico', 'ice-cream cone, funnel, traffic cone', 'cucurutxo, embut, con de trànsit')],
          [L('Esfera', 'Sphere', 'Esfera'), L('todos sus puntos a la misma distancia (r) del centro', 'every point the same distance (r) from the centre', 'tots els punts a la mateixa distància (r) del centre'), L('balón, canica, naranja', 'ball, marble, orange', 'pilota, bala, taronja')],
        ],
      },
    },
  ],
  ejercicios: [
    { e: T('Una caja mide 6 cm de largo, 4 cm de ancho y 5 cm de alto. ¿Cuál es su volumen? ¿Y su área total?', 'A box is 6 cm long, 4 cm wide and 5 cm high. What is its volume? And its total surface area?', 'Una caixa fa 6 cm de llarg, 4 cm d’ample i 5 cm d’alt. Quin és el volum? I l’àrea total?'),
      s: T('V = 6 · 4 · 5 = 120 cm³. A = 2 · (6·4 + 6·5 + 4·5) = 2 · (24 + 30 + 20) = 148 cm².', 'V = 6 × 4 × 5 = 120 cm³. A = 2 × (6×4 + 6×5 + 4×5) = 2 × (24 + 30 + 20) = 148 cm².', 'V = 6 · 4 · 5 = 120 cm³. A = 2 · (6·4 + 6·5 + 4·5) = 2 · (24 + 30 + 20) = 148 cm².') },
    { e: T('Una lata cilíndrica tiene 4 cm de radio y 10 cm de altura. ¿Cuántos cm³ caben? ¿Cuántos mililitros?', 'A cylindrical tin has a radius of 4 cm and a height of 10 cm. How many cm³ does it hold? How many millilitres?', 'Una llauna cilíndrica té 4 cm de radi i 10 cm d’altura. Quants cm³ hi caben? Quants mil·lilitres?'),
      s: T('V = π · r² · h = 3,14 · 16 · 10 ≈ 502 cm³. Como 1 cm³ = 1 ml, caben unos 502 ml (medio litro).', 'V = π × r² × h = 3.14 × 16 × 10 ≈ 502 cm³. As 1 cm³ = 1 ml, it holds about 502 ml (half a litre).', 'V = π · r² · h = 3,14 · 16 · 10 ≈ 502 cm³. Com que 1 cm³ = 1 ml, hi caben uns 502 ml (mig litre).') },
    { e: T('Un cono y un cilindro tienen la misma base (r = 3 cm) y la misma altura (h = 9 cm). ¿Cuántas veces cabe el cono en el cilindro?', 'A cone and a cylinder have the same base (r = 3 cm) and the same height (h = 9 cm). How many times does the cone fit into the cylinder?', 'Un con i un cilindre tenen la mateixa base (r = 3 cm) i la mateixa altura (h = 9 cm). Quantes vegades cap el con dins el cilindre?'),
      s: T('3 veces. V cilindro = 3,14 · 9 · 9 ≈ 254 cm³ y V cono = 254 / 3 ≈ 85 cm³: el cono es un tercio del cilindro.', '3 times. V cylinder = 3.14 × 9 × 9 ≈ 254 cm³ and V cone = 254 / 3 ≈ 85 cm³: the cone is one third of the cylinder.', '3 vegades. V cilindre = 3,14 · 9 · 9 ≈ 254 cm³ i V con = 254 / 3 ≈ 85 cm³: el con és un terç del cilindre.') },
    { e: T('Un balón tiene 12 cm de radio. Calcula su superficie y su volumen.', 'A ball has a radius of 12 cm. Work out its surface area and volume.', 'Una pilota té 12 cm de radi. Calcula’n la superfície i el volum.'),
      s: T('A = 4 · π · r² = 4 · 3,14 · 144 ≈ 1.809 cm². V = (4/3) · π · r³ = (4/3) · 3,14 · 1.728 ≈ 7.235 cm³ (unos 7,2 litros).', 'A = 4 × π × r² = 4 × 3.14 × 144 ≈ 1,809 cm². V = (4/3) × π × r³ = (4/3) × 3.14 × 1,728 ≈ 7,235 cm³ (about 7.2 litres).', 'A = 4 · π · r² = 4 · 3,14 · 144 ≈ 1.809 cm². V = (4/3) · π · r³ = (4/3) · 3,14 · 1.728 ≈ 7.235 cm³ (uns 7,2 litres).') },
    { e: T('Un cono tiene 6 cm de radio y 8 cm de altura. Calcula la generatriz y el área lateral.', 'A cone has a radius of 6 cm and a height of 8 cm. Work out the slant height and the curved surface area.', 'Un con té 6 cm de radi i 8 cm d’altura. Calcula la generatriu i l’àrea lateral.'),
      s: T('g² = 6² + 8² = 36 + 64 = 100 → g = 10 cm. AL = π · r · g = 3,14 · 6 · 10 ≈ 188 cm².', 'g² = 6² + 8² = 36 + 64 = 100 → g = 10 cm. Curved area = π × r × g = 3.14 × 6 × 10 ≈ 188 cm².', 'g² = 6² + 8² = 36 + 64 = 100 → g = 10 cm. AL = π · r · g = 3,14 · 6 · 10 ≈ 188 cm².') },
  ],
}
