// Etiquetas nutricionales del juego Lee la Etiqueta (biología · nutrición).
//
// Productos GENÉRICOS (ninguna marca) con valores típicos por 100 g o 100 ml,
// redondeados como en un envase real. Varían de una marca a otra; lo que se
// practica es leer la tabla, no memorizar estos números. `racion` es la
// porción habitual del envase (una lata, un vaso, una bolsa).
//
// Orden de la tabla, el del reglamento europeo de etiquetado (UE 1169/2011):
// energía, grasas (saturadas), hidratos (azúcares), fibra, proteínas, sal.
const P = (id, emoji, nombre, liquido, racion, nombreRacion, kcal, grasas, saturadas, hidratos, azucares, fibra, proteinas, sal) =>
  ({ id, emoji, nombre, liquido, racion, nombreRacion, kcal, grasas, saturadas, hidratos, azucares, fibra, proteinas, sal })
const T = (es, en, ca) => ({ es, en, ca })

export const PRODUCTOS = [
  P('cola', '🥤', T('Refresco de cola', 'Cola drink', 'Refresc de cola'), true, 330, T('una lata (330 ml)', 'one can (330 ml)', 'una llauna (330 ml)'), 42, 0, 0, 10.6, 10.6, 0, 0, 0),
  P('zumo', '🧃', T('Zumo de naranja envasado', 'Packaged orange juice', 'Suc de taronja envasat'), true, 200, T('un vaso (200 ml)', 'one glass (200 ml)', 'un got (200 ml)'), 45, 0.1, 0, 10, 9, 0.2, 0.7, 0),
  P('leche', '🥛', T('Leche entera', 'Whole milk', 'Llet sencera'), true, 250, T('un vaso (250 ml)', 'one glass (250 ml)', 'un got (250 ml)'), 63, 3.6, 2.4, 4.7, 4.7, 0, 3.1, 0.13),
  P('batido', '🍫', T('Batido de chocolate', 'Chocolate milkshake', 'Batut de xocolata'), true, 200, T('un brik (200 ml)', 'one carton (200 ml)', 'un brik (200 ml)'), 80, 1.5, 1, 12, 11, 0.5, 3.5, 0.15),
  P('isotonica', '🧴', T('Bebida isotónica', 'Sports drink', 'Beguda isotònica'), true, 500, T('una botella (500 ml)', 'one bottle (500 ml)', 'una ampolla (500 ml)'), 25, 0, 0, 6, 6, 0, 0, 0.3),
  P('yogur', '🥣', T('Yogur natural', 'Plain yoghurt', 'Iogurt natural'), false, 125, T('un yogur (125 g)', 'one pot (125 g)', 'un iogurt (125 g)'), 61, 3, 2, 4.5, 4.5, 0, 3.6, 0.13),
  P('yogurfresa', '🍓', T('Yogur de fresa azucarado', 'Sweetened strawberry yoghurt', 'Iogurt de maduixa ensucrat'), false, 125, T('un yogur (125 g)', 'one pot (125 g)', 'un iogurt (125 g)'), 95, 2.6, 1.7, 14, 13.5, 0.2, 3.3, 0.12),
  P('galletas', '🍪', T('Galletas con chocolate', 'Chocolate biscuits', 'Galetes amb xocolata'), false, 40, T('4 galletas (40 g)', '4 biscuits (40 g)', '4 galetes (40 g)'), 500, 24, 12, 64, 34, 3, 6, 0.5),
  P('cereales', '🥣', T('Cereales de desayuno azucarados', 'Sugary breakfast cereal', 'Cereals d’esmorzar ensucrats'), false, 30, T('un bol (30 g)', 'one bowl (30 g)', 'un bol (30 g)'), 380, 2, 0.5, 84, 30, 3, 7, 0.6),
  P('avena', '🌾', T('Copos de avena', 'Rolled oats', 'Flocs de civada'), false, 40, T('un bol (40 g)', 'one bowl (40 g)', 'un bol (40 g)'), 370, 7, 1.3, 59, 1, 10, 13, 0.01),
  P('panintegral', '🍞', T('Pan de molde integral', 'Wholemeal sliced bread', 'Pa de motlle integral'), false, 60, T('dos rebanadas (60 g)', 'two slices (60 g)', 'dues llesques (60 g)'), 250, 3.5, 0.6, 41, 4, 7, 10, 1.1),
  P('panblanco', '🍞', T('Pan de molde blanco', 'White sliced bread', 'Pa de motlle blanc'), false, 60, T('dos rebanadas (60 g)', 'two slices (60 g)', 'dues llesques (60 g)'), 265, 4, 0.5, 48, 5, 2.5, 8.5, 1.2),
  P('patatas', '🥔', T('Patatas fritas de bolsa', 'Crisps', 'Patates fregides de bossa'), false, 45, T('una bolsa (45 g)', 'one bag (45 g)', 'una bossa (45 g)'), 540, 34, 3, 50, 0.5, 4.5, 6.5, 1.4),
  P('cacao', '🌰', T('Crema de cacao y avellanas', 'Chocolate hazelnut spread', 'Crema de cacau i avellanes'), false, 15, T('una cucharada (15 g)', 'one tablespoon (15 g)', 'una cullerada (15 g)'), 540, 31, 10.6, 57, 56, 3.4, 6.3, 0.1),
  P('chocolate', '🍫', T('Chocolate negro 70 %', 'Dark chocolate 70%', 'Xocolata negra 70 %'), false, 20, T('dos onzas (20 g)', 'two squares (20 g)', 'dues unces (20 g)'), 580, 42, 25, 34, 28, 11, 8, 0.02),
  P('jamon', '🍖', T('Jamón cocido', 'Cooked ham', 'Pernil dolç'), false, 50, T('tres lonchas (50 g)', 'three slices (50 g)', 'tres llesques (50 g)'), 110, 3, 1, 1.5, 1, 0, 18, 2),
  P('chorizo', '🌭', T('Chorizo', 'Chorizo', 'Xoriço'), false, 30, T('seis rodajas (30 g)', 'six slices (30 g)', 'sis rodanxes (30 g)'), 455, 38, 14, 2, 1, 0, 24, 4),
  P('atun', '🐟', T('Atún en aceite (escurrido)', 'Tuna in oil (drained)', 'Tonyina en oli (escorreguda)'), false, 56, T('una lata (56 g)', 'one tin (56 g)', 'una llauna (56 g)'), 200, 11, 2, 0, 0, 0, 25, 1),
  P('garbanzos', '🥫', T('Garbanzos cocidos', 'Cooked chickpeas', 'Cigrons cuits'), false, 150, T('un plato (150 g)', 'one plate (150 g)', 'un plat (150 g)'), 115, 2, 0.3, 13, 0.6, 6, 7, 0.6),
  P('pizza', '🍕', T('Pizza congelada', 'Frozen pizza', 'Pizza congelada'), false, 175, T('media pizza (175 g)', 'half a pizza (175 g)', 'mitja pizza (175 g)'), 250, 10, 4.5, 30, 3, 2, 10, 1.3),
  P('magdalenas', '🧁', T('Magdalenas', 'Muffins', 'Magdalenes'), false, 60, T('dos magdalenas (60 g)', 'two muffins (60 g)', 'dues magdalenes (60 g)'), 430, 22, 2.6, 52, 27, 1.3, 6, 0.7),
  P('ketchup', '🍅', T('Kétchup', 'Ketchup', 'Quètxup'), false, 15, T('una cucharada (15 g)', 'one tablespoon (15 g)', 'una cullerada (15 g)'), 100, 0.1, 0, 23, 22, 0.8, 1.2, 1.8),
  P('almendras', '🥜', T('Almendras naturales', 'Plain almonds', 'Ametlles naturals'), false, 30, T('un puñado (30 g)', 'a handful (30 g)', 'un grapat (30 g)'), 600, 52, 4, 6, 4, 12, 21, 0.01),
  P('queso', '🧀', T('Queso curado', 'Mature cheese', 'Formatge curat'), false, 30, T('tres lonchas (30 g)', 'three slices (30 g)', 'tres llesques (30 g)'), 400, 33, 21, 0.5, 0.5, 0, 26, 1.8),
]
