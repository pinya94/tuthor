function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const PREGUNTAS = [
  q('f01', 'eso',
    { es: '¿Qué representa la "m" en la función lineal y = mx + b?', en: 'What does "m" represent in the linear function y = mx + b?', ca: 'Què representa la "m" en la funció lineal y = mx + b?' },
    { es: ['La pendiente', 'La ordenada en el origen', 'El eje x', 'El dominio'], en: ['The slope', 'The y-intercept', 'The x-axis', 'The domain'], ca: ['El pendent', "L'ordenada a l'origen", "L'eix x", 'El domini'] },
    { es: 'La pendiente', en: 'The slope', ca: 'El pendent' },
    '📈',
    { es: 'En y = mx + b, la "m" es la pendiente: indica cuánto sube o baja la recta por cada unidad que avanza en x. Si m > 0 la recta sube, si m < 0 baja, si m = 0 es horizontal.', en: 'In y = mx + b, "m" is the slope: it shows how much the line rises or falls per unit along x. If m > 0 the line goes up, if m < 0 it goes down, if m = 0 it is horizontal.', ca: 'En y = mx + b, la "m" és el pendent: indica quant puja o baixa la recta per cada unitat que avança en x. Si m > 0 la recta puja, si m < 0 baixa, si m = 0 és horitzontal.' }
  ),
  q('f02', 'eso',
    { es: '¿Cuánto vale y cuando x = 3 en la función y = 2x + 1?', en: 'What is y when x = 3 in the function y = 2x + 1?', ca: 'Quant val y quan x = 3 en la funció y = 2x + 1?' },
    { es: ['7', '5', '9', '6'], en: ['7', '5', '9', '6'], ca: ['7', '5', '9', '6'] },
    { es: '7', en: '7', ca: '7' },
    '🔢',
    { es: 'Sustituimos x = 3: y = 2(3) + 1 = 6 + 1 = 7. Para evaluar una función solo hay que sustituir el valor de x en la expresión.', en: 'We substitute x = 3: y = 2(3) + 1 = 6 + 1 = 7. To evaluate a function, just substitute the x value into the expression.', ca: 'Substituïm x = 3: y = 2(3) + 1 = 6 + 1 = 7. Per avaluar una funció només cal substituir el valor de x a l\'expressió.' }
  ),
  q('f03', 'eso',
    { es: '¿Qué representa la "b" en y = mx + b?', en: 'What does "b" represent in y = mx + b?', ca: 'Què representa la "b" en y = mx + b?' },
    { es: ['La ordenada en el origen (punto donde corta el eje Y)', 'La pendiente', 'El valor máximo', 'La abscisa en el origen'], en: ['The y-intercept (where the line crosses the Y axis)', 'The slope', 'The maximum value', 'The x-intercept'], ca: ["L'ordenada a l'origen (punt on talla l'eix Y)", 'El pendent', 'El valor màxim', "L'abscissa a l'origen"] },
    { es: 'La ordenada en el origen (punto donde corta el eje Y)', en: 'The y-intercept (where the line crosses the Y axis)', ca: "L'ordenada a l'origen (punt on talla l'eix Y)" },
    '📊',
    { es: 'La "b" es la ordenada en el origen: el valor de y cuando x = 0. Es el punto donde la recta cruza el eje vertical. En y = 2x + 5, cuando x = 0: y = 5, así que la recta cruza el eje Y en (0, 5).', en: '"b" is the y-intercept: the value of y when x = 0. It is the point where the line crosses the vertical axis. In y = 2x + 5, when x = 0: y = 5, so the line crosses the Y-axis at (0, 5).', ca: 'La "b" és l\'ordenada a l\'origen: el valor de y quan x = 0. És el punt on la recta creua l\'eix vertical. En y = 2x + 5, quan x = 0: y = 5, per tant la recta creua l\'eix Y a (0, 5).' }
  ),
  q('f04', 'eso',
    { es: '¿En qué cuadrante está el punto (−3, 4)?', en: 'In which quadrant is the point (−3, 4)?', ca: 'En quin quadrant està el punt (−3, 4)?' },
    { es: ['Segundo cuadrante (II)', 'Primer cuadrante (I)', 'Tercer cuadrante (III)', 'Cuarto cuadrante (IV)'], en: ['Second quadrant (II)', 'First quadrant (I)', 'Third quadrant (III)', 'Fourth quadrant (IV)'], ca: ['Segon quadrant (II)', 'Primer quadrant (I)', 'Tercer quadrant (III)', 'Quart quadrant (IV)'] },
    { es: 'Segundo cuadrante (II)', en: 'Second quadrant (II)', ca: 'Segon quadrant (II)' },
    '🗺️',
    { es: 'Los cuadrantes: I (x+, y+), II (x−, y+), III (x−, y−), IV (x+, y−). El punto (−3, 4) tiene x negativa e y positiva → cuadrante II.', en: 'Quadrants: I (x+, y+), II (x−, y+), III (x−, y−), IV (x+, y−). The point (−3, 4) has negative x and positive y → quadrant II.', ca: 'Quadrants: I (x+, y+), II (x−, y+), III (x−, y−), IV (x+, y−). El punt (−3, 4) té x negativa i y positiva → quadrant II.' }
  ),
  q('f05', 'eso',
    { es: 'Una función tiene pendiente m = −2. ¿Cómo es la recta?', en: 'A function has slope m = −2. How does the line behave?', ca: 'Una funció té pendent m = −2. Com és la recta?' },
    { es: ['Decreciente (baja de izquierda a derecha)', 'Creciente (sube de izquierda a derecha)', 'Horizontal', 'Vertical'], en: ['Decreasing (goes down from left to right)', 'Increasing (goes up from left to right)', 'Horizontal', 'Vertical'], ca: ['Decreixent (baixa d\'esquerra a dreta)', 'Creixent (puja d\'esquerra a dreta)', 'Horitzontal', 'Vertical'] },
    { es: 'Decreciente (baja de izquierda a derecha)', en: 'Decreasing (goes down from left to right)', ca: 'Decreixent (baixa d\'esquerra a dreta)' },
    '📉',
    { es: 'Pendiente negativa (m < 0) → la recta es decreciente: baja a medida que x aumenta. Pendiente positiva → creciente. Pendiente cero → horizontal. Pendiente indefinida → vertical.', en: 'Negative slope (m < 0) → the line is decreasing: it goes down as x increases. Positive slope → increasing. Zero slope → horizontal. Undefined slope → vertical.', ca: 'Pendent negatiu (m < 0) → la recta és decreixent: baixa a mesura que x augmenta. Pendent positiu → creixent. Pendent zero → horitzontal. Pendent indefinit → vertical.' }
  ),
  q('f06', 'eso',
    { es: '¿Qué tipo de función es y = x²?', en: 'What type of function is y = x²?', ca: 'Quin tipus de funció és y = x²?' },
    { es: ['Función cuadrática (parábola)', 'Función lineal (recta)', 'Función constante', 'Función exponencial'], en: ['Quadratic function (parabola)', 'Linear function (straight line)', 'Constant function', 'Exponential function'], ca: ['Funció quadràtica (paràbola)', 'Funció lineal (recta)', 'Funció constant', 'Funció exponencial'] },
    { es: 'Función cuadrática (parábola)', en: 'Quadratic function (parabola)', ca: 'Funció quadràtica (paràbola)' },
    '🔵',
    { es: 'y = x² es una función cuadrática: la variable x está elevada al cuadrado. Su gráfica es una parábola con vértice en el origen. Es simétrica respecto al eje Y.', en: 'y = x² is a quadratic function: the variable x is squared. Its graph is a parabola with its vertex at the origin. It is symmetric with respect to the Y-axis.', ca: 'y = x² és una funció quadràtica: la variable x està elevada al quadrat. La seva gràfica és una paràbola amb vèrtex a l\'origen. És simètrica respecte a l\'eix Y.' }
  ),
  q('f07', 'eso',
    { es: '¿Cuál es la pendiente de la recta que pasa por (0, 2) y (3, 8)?', en: 'What is the slope of the line passing through (0, 2) and (3, 8)?', ca: 'Quin és el pendent de la recta que passa per (0, 2) i (3, 8)?' },
    { es: ['2', '3', '6', '4'], en: ['2', '3', '6', '4'], ca: ['2', '3', '6', '4'] },
    { es: '2', en: '2', ca: '2' },
    '📐',
    { es: 'Fórmula de la pendiente: m = (y₂ − y₁) / (x₂ − x₁) = (8 − 2) / (3 − 0) = 6 / 3 = 2. La pendiente es 2.', en: 'Slope formula: m = (y₂ − y₁) / (x₂ − x₁) = (8 − 2) / (3 − 0) = 6 / 3 = 2. The slope is 2.', ca: 'Fórmula del pendent: m = (y₂ − y₁) / (x₂ − x₁) = (8 − 2) / (3 − 0) = 6 / 3 = 2. El pendent és 2.' }
  ),
  q('f08', 'eso',
    { es: '¿Cuál de estas expresiones NO es una función lineal?', en: 'Which of these expressions is NOT a linear function?', ca: 'Quina d\'aquestes expressions NO és una funció lineal?' },
    { es: ['y = x² + 3', 'y = 2x − 5', 'y = −x + 7', 'y = 4'], en: ['y = x² + 3', 'y = 2x − 5', 'y = −x + 7', 'y = 4'], ca: ['y = x² + 3', 'y = 2x − 5', 'y = −x + 7', 'y = 4'] },
    { es: 'y = x² + 3', en: 'y = x² + 3', ca: 'y = x² + 3' },
    '❓',
    { es: 'Las funciones lineales son de la forma y = mx + b (grado 1). y = x² + 3 tiene x al cuadrado (grado 2) → es cuadrática, no lineal. y = 4 es constante (caso especial de lineal con m = 0).', en: 'Linear functions have the form y = mx + b (degree 1). y = x² + 3 has x squared (degree 2) → it is quadratic, not linear. y = 4 is constant (special case of linear with m = 0).', ca: 'Les funcions lineals són de la forma y = mx + b (grau 1). y = x² + 3 té x al quadrat (grau 2) → és quadràtica, no lineal. y = 4 és constant (cas especial de lineal amb m = 0).' }
  ),
  q('f09', 'eso',
    { es: 'En y = 3x − 6, ¿para qué valor de x es y = 0? (abscisa en el origen)', en: 'In y = 3x − 6, for what value of x is y = 0? (x-intercept)', ca: 'En y = 3x − 6, per a quin valor de x és y = 0? (abscissa a l\'origen)' },
    { es: ['x = 2', 'x = 3', 'x = 6', 'x = −2'], en: ['x = 2', 'x = 3', 'x = 6', 'x = −2'], ca: ['x = 2', 'x = 3', 'x = 6', 'x = −2'] },
    { es: 'x = 2', en: 'x = 2', ca: 'x = 2' },
    '🔍',
    { es: 'Para encontrar la abscisa en el origen, igualamos y = 0: 0 = 3x − 6 → 3x = 6 → x = 2. La recta cruza el eje X en el punto (2, 0).', en: 'To find the x-intercept, set y = 0: 0 = 3x − 6 → 3x = 6 → x = 2. The line crosses the X-axis at (2, 0).', ca: 'Per trobar l\'abscissa a l\'origen, igualem y = 0: 0 = 3x − 6 → 3x = 6 → x = 2. La recta creua l\'eix X al punt (2, 0).' }
  ),
  q('f10', 'eso',
    { es: '¿Cuál es la ecuación de la recta con pendiente 3 que pasa por el origen?', en: 'What is the equation of the line with slope 3 passing through the origin?', ca: 'Quina és l\'equació de la recta amb pendent 3 que passa per l\'origen?' },
    { es: ['y = 3x', 'y = 3x + 3', 'y = x + 3', 'y = 3'], en: ['y = 3x', 'y = 3x + 3', 'y = x + 3', 'y = 3'], ca: ['y = 3x', 'y = 3x + 3', 'y = x + 3', 'y = 3'] },
    { es: 'y = 3x', en: 'y = 3x', ca: 'y = 3x' },
    '✨',
    { es: 'Si la recta pasa por el origen (0, 0), entonces b = 0. Con pendiente m = 3: y = 3x + 0 = 3x. Las rectas que pasan por el origen tienen la forma y = mx (proporcionalidad directa).', en: 'If the line passes through the origin (0, 0), then b = 0. With slope m = 3: y = 3x + 0 = 3x. Lines through the origin have the form y = mx (direct proportionality).', ca: 'Si la recta passa per l\'origen (0, 0), aleshores b = 0. Amb pendent m = 3: y = 3x + 0 = 3x. Les rectes que passen per l\'origen tenen la forma y = mx (proporcionalitat directa).' }
  ),
  q('f11', 'eso',
    { es: 'Dos funciones son paralelas. ¿Qué tienen en común?', en: 'Two functions are parallel. What do they have in common?', ca: 'Dues funcions són paral·leles. Què tenen en comú?' },
    { es: ['La misma pendiente (m)', 'La misma ordenada en el origen (b)', 'El mismo valor máximo', 'El mismo dominio'], en: ['The same slope (m)', 'The same y-intercept (b)', 'The same maximum value', 'The same domain'], ca: ['El mateix pendent (m)', 'La mateixa ordenada a l\'origen (b)', 'El mateix valor màxim', 'El mateix domini'] },
    { es: 'La misma pendiente (m)', en: 'The same slope (m)', ca: 'El mateix pendent (m)' },
    '⟶',
    { es: 'Las rectas paralelas tienen la misma pendiente pero distinta ordenada en el origen. Por ejemplo: y = 2x + 1 e y = 2x − 3 son paralelas (ambas tienen m = 2). Nunca se cortan.', en: 'Parallel lines have the same slope but different y-intercepts. For example: y = 2x + 1 and y = 2x − 3 are parallel (both have m = 2). They never intersect.', ca: 'Les rectes paral·leles tenen el mateix pendent però diferent ordenada a l\'origen. Per exemple: y = 2x + 1 i y = 2x − 3 són paral·leles (totes dues tenen m = 2). Mai es tallen.' }
  ),
  q('f12', 'eso',
    { es: '¿Qué es el dominio de una función?', en: 'What is the domain of a function?', ca: 'Què és el domini d\'una funció?' },
    { es: ['El conjunto de valores de x para los que la función está definida', 'El conjunto de valores que toma y', 'El punto más alto de la gráfica', 'La pendiente máxima'], en: ['The set of x values for which the function is defined', 'The set of values that y takes', 'The highest point of the graph', 'The maximum slope'], ca: ['El conjunt de valors de x per als quals la funció està definida', 'El conjunt de valors que pren y', 'El punt més alt de la gràfica', 'El pendent màxim'] },
    { es: 'El conjunto de valores de x para los que la función está definida', en: 'The set of x values for which the function is defined', ca: 'El conjunt de valors de x per als quals la funció està definida' },
    '🎯',
    { es: 'El dominio es el conjunto de valores válidos para x (variable independiente). El recorrido (o imagen) es el conjunto de valores que toma y. En y = 2x + 1, el dominio son todos los números reales (x puede ser cualquier número).', en: 'The domain is the set of valid values for x (independent variable). The range is the set of values that y takes. In y = 2x + 1, the domain is all real numbers (x can be any number).', ca: 'El domini és el conjunt de valors vàlids per a x (variable independent). El recorregut (o imatge) és el conjunt de valors que pren y. En y = 2x + 1, el domini és tots els nombres reals (x pot ser qualsevol nombre).' }
  ),
  q('f13', 'eso',
    { es: 'Si y = −x + 4, ¿cuál es el valor de y cuando x = 6?', en: 'If y = −x + 4, what is y when x = 6?', ca: 'Si y = −x + 4, quin és el valor de y quan x = 6?' },
    { es: ['−2', '2', '10', '−10'], en: ['−2', '2', '10', '−10'], ca: ['−2', '2', '10', '−10'] },
    { es: '−2', en: '−2', ca: '−2' },
    '🧮',
    { es: 'Sustituimos x = 6: y = −(6) + 4 = −6 + 4 = −2. Ojo con el signo negativo: −x significa multiplicar x por −1.', en: 'Substitute x = 6: y = −(6) + 4 = −6 + 4 = −2. Watch the negative sign: −x means multiply x by −1.', ca: 'Substituïm x = 6: y = −(6) + 4 = −6 + 4 = −2. Atenció al signe negatiu: −x significa multiplicar x per −1.' }
  ),
  q('f14', 'eso',
    { es: '¿Cuántos puntos necesitas para trazar una recta?', en: 'How many points do you need to draw a straight line?', ca: 'Quants punts necessites per traçar una recta?' },
    { es: ['2', '1', '3', '4'], en: ['2', '1', '3', '4'], ca: ['2', '1', '3', '4'] },
    { es: '2', en: '2', ca: '2' },
    '✏️',
    { es: 'Con 2 puntos distintos se determina una única recta. En la práctica, calculamos (al menos) 2 puntos de la función (por ejemplo x = 0 y x = 1) y los unimos para trazar la gráfica.', en: 'Two distinct points determine a unique straight line. In practice, we calculate at least 2 points of the function (e.g. x = 0 and x = 1) and join them to draw the graph.', ca: 'Amb 2 punts distincts es determina una única recta. En la pràctica, calculem (almenys) 2 punts de la funció (per exemple x = 0 i x = 1) i els unim per traçar la gràfica.' }
  ),
  q('f15', 'eso',
    { es: '¿Qué indica que una función sea "creciente" en un intervalo?', en: 'What does it mean for a function to be "increasing" on an interval?', ca: 'Què indica que una funció sigui "creixent" en un interval?' },
    { es: ['Al aumentar x, aumenta y', 'Al aumentar x, disminuye y', 'y siempre vale 0', 'x e y son iguales'], en: ['As x increases, y increases', 'As x increases, y decreases', 'y is always 0', 'x and y are equal'], ca: ['En augmentar x, augmenta y', 'En augmentar x, disminueix y', 'y sempre val 0', 'x i y són iguals'] },
    { es: 'Al aumentar x, aumenta y', en: 'As x increases, y increases', ca: 'En augmentar x, augmenta y' },
    '📈',
    { es: 'Una función es creciente cuando al moverse hacia la derecha (x aumenta) la gráfica también sube (y aumenta). Es decreciente cuando al aumentar x, y disminuye. La pendiente positiva indica crecimiento.', en: 'A function is increasing when moving right (x increases) the graph also goes up (y increases). It is decreasing when as x increases, y decreases. A positive slope indicates growth.', ca: 'Una funció és creixent quan en moure\'s cap a la dreta (x augmenta) la gràfica també puja (y augmenta). És decreixent quan en augmentar x, y disminueix. El pendent positiu indica creixement.' }
  ),
]

export const PREGUNTAS_ESO = PREGUNTAS
