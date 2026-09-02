// Sustancias con sus puntos de fusión y ebullición reales (°C a 1 atm), para
// el juego Cambio de Estado.
//
// El objetivo didáctico es romper la idea de que "sólido = frío" y
// "gas = caliente". El estado no depende de si una temperatura nos parece alta
// o baja a NOSOTROS, sino de dónde cae respecto a los puntos de esa sustancia
// concreta: el mercurio es líquido a 20 °C y el hierro sigue siendo sólido a
// 1000 °C. Por eso la lista mezcla a propósito metales, gases y líquidos
// cotidianos, y las preguntas eligen temperaturas que suenan contradictorias.
//
// Los valores están redondeados al grado, que es la precisión con la que se
// dan en cualquier libro de texto de la ESO.

const s = (id, nombre, fusion, ebullicion, nota) => ({ id, nombre, fusion, ebullicion, nota })

export const SUSTANCIAS = [
  s('agua', { es: 'Agua', en: 'Water', ca: 'Aigua' }, 0, 100,
    { es: 'Los 0 y los 100 °C del agua son la referencia de la escala Celsius: por eso los sabemos de memoria.', en: 'Water\'s 0 and 100 °C are the reference points of the Celsius scale, which is why we know them by heart.', ca: 'Els 0 i els 100 °C de l\'aigua són la referència de l\'escala Celsius.' }),

  s('mercurio', { es: 'Mercurio', en: 'Mercury', ca: 'Mercuri' }, -39, 357,
    { es: 'Es el único metal líquido a temperatura ambiente, y por eso se usaba en los termómetros antiguos.', en: 'The only metal that is liquid at room temperature, which is why it was used in old thermometers.', ca: 'És l\'únic metall líquid a temperatura ambient, i per això s\'usava als termòmetres antics.' }),

  s('hierro', { es: 'Hierro', en: 'Iron', ca: 'Ferro' }, 1538, 2862,
    { es: 'A 1000 °C el hierro está al rojo vivo, pero sigue siendo sólido: aún le faltan 500 grados para fundirse.', en: 'At 1000 °C iron is red hot but still solid: it is 500 degrees short of melting.', ca: 'A 1000 °C el ferro és roent, però encara és sòlid: li falten 500 graus per fondre\'s.' }),

  s('oxigeno', { es: 'Oxígeno', en: 'Oxygen', ca: 'Oxigen' }, -218, -183,
    { es: 'El aire que respiramos es gas porque estamos muy por encima de sus −183 °C. En un laboratorio se puede tener oxígeno líquido, azul pálido.', en: 'The air we breathe is gas because we are far above its −183 °C. In a lab you can have pale blue liquid oxygen.', ca: 'L\'aire que respirem és gas perquè som molt per sobre dels seus −183 °C.' }),

  s('nitrogeno', { es: 'Nitrógeno', en: 'Nitrogen', ca: 'Nitrogen' }, -210, -196,
    { es: 'El nitrógeno líquido hierve a −196 °C: por eso "hierve" a borbotones sobre una mesa, donde hace 200 grados de más para él.', en: 'Liquid nitrogen boils at −196 °C, which is why it bubbles furiously on a table 200 degrees too warm for it.', ca: 'El nitrogen líquid bull a −196 °C: per això bull a borbolls sobre una taula.' }),

  s('etanol', { es: 'Alcohol (etanol)', en: 'Alcohol (ethanol)', ca: 'Alcohol (etanol)' }, -114, 78,
    { es: 'Hierve a 78 °C, antes que el agua. En eso se basa la destilación: se calienta la mezcla y sale primero el alcohol.', en: 'It boils at 78 °C, before water. Distillation relies on this: heat the mixture and the alcohol comes off first.', ca: 'Bull a 78 °C, abans que l\'aigua. En això es basa la destil·lació.' }),

  s('oro', { es: 'Oro', en: 'Gold', ca: 'Or' }, 1064, 2856,
    { es: 'Se funde a 1064 °C, temperatura que ya se alcanzaba en hornos de la Antigüedad: por eso hay joyas de oro de hace milenios.', en: 'It melts at 1064 °C, a temperature ancient furnaces could already reach — hence gold jewellery thousands of years old.', ca: 'Es fon a 1064 °C, temperatura que ja s\'assolia en forns de l\'Antiguitat.' }),

  s('aluminio', { es: 'Aluminio', en: 'Aluminium', ca: 'Alumini' }, 660, 2470,
    { es: 'Se funde a 660 °C, mucho antes que el hierro. Por eso es tan fácil de reciclar: hace falta mucha menos energía.', en: 'It melts at 660 °C, far below iron. That is why it is so easy to recycle: it needs much less energy.', ca: 'Es fon a 660 °C, molt abans que el ferro. Per això és tan fàcil de reciclar.' }),

  s('plomo', { es: 'Plomo', en: 'Lead', ca: 'Plom' }, 327, 1749,
    { es: 'Con 327 °C se funde en una cocina potente. Es el metal más fácil de fundir de los comunes, y por eso se usó desde la Antigüedad.', en: 'At 327 °C it melts on a strong stove. The easiest common metal to melt, used since antiquity.', ca: 'Amb 327 °C es fon en una cuina potent: el metall comú més fàcil de fondre.' }),

  s('sal', { es: 'Sal común', en: 'Table salt', ca: 'Sal comuna' }, 801, 1465,
    { es: 'La sal se funde a 801 °C. En la cocina nunca la vemos líquida porque haría falta un horno industrial.', en: 'Salt melts at 801 °C. We never see it liquid in a kitchen: that needs an industrial furnace.', ca: 'La sal es fon a 801 °C: a la cuina no la veiem mai líquida.' }),

  s('cobre', { es: 'Cobre', en: 'Copper', ca: 'Coure' }, 1085, 2562,
    { es: 'Se funde a 1085 °C. Dominar esa temperatura fue lo que abrió la Edad de los Metales.', en: 'It melts at 1085 °C. Mastering that temperature is what opened the Metal Ages.', ca: 'Es fon a 1085 °C. Dominar aquesta temperatura va obrir l\'Edat dels Metalls.' }),

  s('helio', { es: 'Helio', en: 'Helium', ca: 'Heli' }, -272, -269,
    { es: 'Se licúa a −269 °C, a cuatro grados del cero absoluto. Es la sustancia más difícil de convertir en líquido que existe.', en: 'It liquefies at −269 °C, four degrees from absolute zero: the hardest substance in existence to turn into a liquid.', ca: 'Es liqua a −269 °C, a quatre graus del zero absolut.' }),

  s('cloro', { es: 'Cloro', en: 'Chlorine', ca: 'Clor' }, -101, -34,
    { es: 'A temperatura ambiente es un gas verdoso y tóxico. El de las piscinas no es cloro puro, sino un compuesto disuelto.', en: 'At room temperature it is a greenish toxic gas. Pool "chlorine" is not pure chlorine but a dissolved compound.', ca: 'A temperatura ambient és un gas verdós i tòxic.' }),

  s('butano', { es: 'Butano', en: 'Butane', ca: 'Butà' }, -138, -1,
    { es: 'Hierve a −1 °C, así que a temperatura ambiente sería gas. En la bombona está líquido porque va a presión, no por frío.', en: 'It boils at −1 °C, so at room temperature it would be gas. In the cylinder it is liquid because of pressure, not cold.', ca: 'Bull a −1 °C: a la bombona és líquid per la pressió, no pel fred.' }),

  s('estano', { es: 'Estaño', en: 'Tin', ca: 'Estany' }, 232, 2602,
    { es: 'Se funde a 232 °C, tan poco que se derrite en una sartén. Por eso el estaño de soldar se trabaja con un simple soldador eléctrico.', en: 'It melts at 232 °C, low enough to melt in a frying pan — which is why solder works with a simple iron.', ca: 'Es fon a 232 °C, tan poc que es fon en una paella.' }),

  s('zinc', { es: 'Zinc', en: 'Zinc', ca: 'Zinc' }, 420, 907,
    { es: 'Se funde a 420 °C y hierve a 907, un margen líquido estrechísimo para un metal. Por eso se evapora al galvanizar acero.', en: 'It melts at 420 °C and boils at 907, a very narrow liquid range for a metal.', ca: 'Es fon a 420 °C i bull a 907, un marge líquid estretíssim per a un metall.' }),

  s('plata', { es: 'Plata', en: 'Silver', ca: 'Plata' }, 962, 2162,
    { es: 'Se funde a 962 °C, casi como el oro. Los dos se trabajan en los mismos hornos de joyería desde hace milenios.', en: 'It melts at 962 °C, close to gold: both are worked in the same jewellery furnaces.', ca: 'Es fon a 962 °C, gairebé com l\'or.' }),

  s('wolframio', { es: 'Wolframio', en: 'Tungsten', ca: 'Tungstè' }, 3422, 5555,
    { es: 'Es el metal que aguanta más calor sin fundirse: 3422 °C. Por eso el filamento de las bombillas antiguas era de wolframio.', en: 'The metal that resists the most heat before melting: 3422 °C. Old light-bulb filaments were made of it.', ca: 'És el metall que aguanta més calor sense fondre\'s: 3422 °C.' }),

  s('hidrogeno', { es: 'Hidrógeno', en: 'Hydrogen', ca: 'Hidrogen' }, -259, -253,
    { es: 'Solo es líquido entre −259 y −253 °C: seis grados de margen. Así se transporta como combustible de cohetes.', en: 'It is liquid only between −259 and −253 °C: a six-degree window. That is how it is carried as rocket fuel.', ca: 'Només és líquid entre −259 i −253 °C: sis graus de marge.' }),

  s('metano', { es: 'Metano', en: 'Methane', ca: 'Metà' }, -182, -162,
    { es: 'Es el gas natural de la cocina. Se licúa a −162 °C, y así viaja en barco: ocupa 600 veces menos que en gas.', en: 'The natural gas of a kitchen hob. It liquefies at −162 °C and travels by ship taking 600 times less space.', ca: 'És el gas natural de la cuina. Es liqua a −162 °C.' }),

  s('amoniaco', { es: 'Amoniaco', en: 'Ammonia', ca: 'Amoníac' }, -78, -33,
    { es: 'A temperatura ambiente es gas. El amoniaco de limpieza es ese gas disuelto en agua, no amoniaco puro.', en: 'At room temperature it is a gas. Household ammonia is that gas dissolved in water, not pure ammonia.', ca: 'A temperatura ambient és gas. L\'amoníac de neteja és aquest gas dissolt en aigua.' }),

  s('acetona', { es: 'Acetona', en: 'Acetone', ca: 'Acetona' }, -95, 56,
    { es: 'Hierve a 56 °C, bastante antes que el agua. Por eso se evapora en cuanto la pones en la piel y deja sensación de frío.', en: 'It boils at 56 °C, well before water, which is why it evaporates on skin and feels cold.', ca: 'Bull a 56 °C, bastant abans que l\'aigua.' }),

  s('glicerina', { es: 'Glicerina', en: 'Glycerol', ca: 'Glicerina' }, 18, 290,
    { es: 'Se congela a 18 °C, así que en una casa fría puede solidificar. Es de los pocos líquidos de casa que lo hacen por encima de cero.', en: 'It freezes at 18 °C, so it can solidify in a cold house — one of the few household liquids that does so above zero.', ca: 'Es congela a 18 °C, així que en una casa freda pot solidificar.' }),

  s('parafina', { es: 'Parafina (vela)', en: 'Paraffin wax', ca: 'Parafina (espelma)' }, 57, 370,
    { es: 'La cera de una vela se funde a unos 57 °C: la llama la derrite y esa cera líquida es la que sube por la mecha y arde.', en: 'Candle wax melts around 57 °C: the flame melts it and that liquid wax climbs the wick and burns.', ca: 'La cera d\'una espelma es fon als 57 °C aproximadament.' }),

  s('azufre', { es: 'Azufre', en: 'Sulfur', ca: 'Sofre' }, 115, 445,
    { es: 'Se funde a 115 °C, menos que el plomo. Es uno de los pocos no metales que aparece sólido y amarillo en la naturaleza.', en: 'It melts at 115 °C, lower than lead, and is one of the few non-metals found solid and yellow in nature.', ca: 'Es fon a 115 °C, menys que el plom.' }),

  s('naftalina', { es: 'Naftalina', en: 'Naphthalene', ca: 'Naftalina' }, 80, 218,
    { es: 'Las bolas de naftalina se hacen pequeñas sin mojar nada: pasan directamente de sólido a gas, que es sublimación.', en: 'Mothballs shrink without wetting anything: they go straight from solid to gas — sublimation.', ca: 'Les boles de naftalina es fan petites sense mullar res: subliman.' }),

  s('acido-acetico', { es: 'Ácido acético (vinagre)', en: 'Acetic acid (vinegar)', ca: 'Àcid acètic (vinagre)' }, 17, 118,
    { es: 'El ácido del vinagre se congela a 17 °C. En un laboratorio frío aparece sólido, y por eso se le llama ácido acético glacial.', en: 'Vinegar\'s acid freezes at 17 °C. In a cold lab it appears solid, hence "glacial acetic acid".', ca: 'L\'àcid del vinagre es congela a 17 °C.' }),

  s('bromo', { es: 'Bromo', en: 'Bromine', ca: 'Brom' }, -7, 59,
    { es: 'Es el único no metal líquido a temperatura ambiente, de un rojo muy oscuro. El mercurio y el bromo son los dos únicos elementos líquidos a 20 °C.', en: 'The only non-metal that is liquid at room temperature, dark red. Bromine and mercury are the only two elements liquid at 20 °C.', ca: 'És l\'únic no metall líquid a temperatura ambient.' }),

  s('propano', { es: 'Propano', en: 'Propane', ca: 'Propà' }, -188, -42,
    { es: 'Hierve a −42 °C, aún más frío que el butano. Por eso la bombona de propano aguanta mejor el invierno a la intemperie.', en: 'It boils at −42 °C, colder than butane, which is why propane cylinders cope better with winter outdoors.', ca: 'Bull a −42 °C, encara més fred que el butà.' }),

  s('titanio', { es: 'Titanio', en: 'Titanium', ca: 'Titani' }, 1668, 3287,
    { es: 'Se funde a 1668 °C, más que el hierro, y pesa casi la mitad. Esa combinación es la que lo hace ideal para aviones y prótesis.', en: 'It melts at 1668 °C, above iron, and weighs almost half as much — ideal for aircraft and implants.', ca: 'Es fon a 1668 °C, més que el ferro, i pesa gairebé la meitat.' }),
]

export const porId = id => SUSTANCIAS.find(x => x.id === id)

// Los seis cambios de estado con su nombre. La pareja sólido↔gas es la que
// más se olvida y la que más aparece en los exámenes.
export const CAMBIOS = [
  { id: 'fusion', de: 'solido', a: 'liquido',
    nombre: { es: 'Fusión', en: 'Melting', ca: 'Fusió' },
    ejemplo: { es: 'El hielo de un vaso se derrite.', en: 'Ice in a glass melts.', ca: 'El gel d\'un got es fon.' } },
  { id: 'solidificacion', de: 'liquido', a: 'solido',
    nombre: { es: 'Solidificación', en: 'Freezing', ca: 'Solidificació' },
    ejemplo: { es: 'El agua de la cubitera se congela.', en: 'Water in the ice tray freezes.', ca: 'L\'aigua de la cubitera es congela.' } },
  { id: 'vaporizacion', de: 'liquido', a: 'gas',
    nombre: { es: 'Vaporización', en: 'Vaporisation', ca: 'Vaporització' },
    ejemplo: { es: 'El agua de la olla hierve y sale vapor.', en: 'Water in the pot boils and steam comes off.', ca: 'L\'aigua de l\'olla bull i en surt vapor.' } },
  { id: 'condensacion', de: 'gas', a: 'liquido',
    nombre: { es: 'Condensación', en: 'Condensation', ca: 'Condensació' },
    ejemplo: { es: 'Se empañan los cristales en invierno.', en: 'Windows fog up in winter.', ca: 'Els vidres s\'entelen a l\'hivern.' } },
  { id: 'sublimacion', de: 'solido', a: 'gas',
    nombre: { es: 'Sublimación', en: 'Sublimation', ca: 'Sublimació' },
    ejemplo: { es: 'El hielo seco pasa a gas sin mojar nada.', en: 'Dry ice turns to gas without wetting anything.', ca: 'El gel sec passa a gas sense mullar res.' } },
  { id: 'sublimacion-inversa', de: 'gas', a: 'solido',
    nombre: { es: 'Sublimación inversa', en: 'Deposition', ca: 'Sublimació inversa' },
    ejemplo: { es: 'Se forma escarcha directamente sobre la hierba.', en: 'Frost forms straight onto the grass.', ca: 'Es forma gebre directament sobre l\'herba.' } },
]

export const ESTADOS = {
  solido: { label: { es: 'Sólido', en: 'Solid', ca: 'Sòlid' }, emoji: '🧊' },
  liquido: { label: { es: 'Líquido', en: 'Liquid', ca: 'Líquid' }, emoji: '💧' },
  gas: { label: { es: 'Gas', en: 'Gas', ca: 'Gas' }, emoji: '💨' },
}
