// El mol y la estequiometría — Física y Química, 4.º de ESO y 1.º de
// Bachillerato. Cantidad de sustancia, masa molar, número de Avogadro, leyes
// ponderales, gases ideales, cálculos estequiométricos (reactivo limitante,
// pureza, rendimiento), fórmula empírica y concentración de disoluciones.
//
// Cada pregunta con números da las masas atómicas que usa, y las cuentas
// salen exactas o con dos decimales. Los distractores son los fallos de
// siempre: dividir al revés, olvidar un subíndice o un coeficiente, usar
// grados Celsius en la ecuación de los gases o no pasar mL a L.
//
// La respuesta buena va siempre la PRIMERA en `opciones`: ExamenMC baraja el
// orden al servir cada pregunta (lib/ordenOpciones.js).
function q(id, nivel, emoji, pregunta, opciones, explicacion) {
  const correcta = { es: opciones.es[0], en: opciones.en[0], ca: opciones.ca[0] }
  return { id, nivel, emoji, pregunta, opciones, correcta, explicacion }
}
const T = (es, en, ca) => ({ es, en, ca })
const O = (es, en, ca) => ({ es, en, ca })
// Opciones numéricas: iguales en los tres idiomas salvo la coma decimal.
const N = (...xs) => ({ es: xs, en: xs.map(x => x.replace(/(\d),(\d)/g, '$1.$2')), ca: xs })

export const PREGUNTAS = [
  // ── ESO ─────────────────────────────────────────────────────────────────
  q('eq-01', 'eso', '🔢',
    T('¿Qué es un mol?', 'What is a mole?', 'Què és un mol?'),
    O(['La cantidad de sustancia que contiene 6,022 · 10²³ partículas', 'La masa de un átomo de carbono', 'Un gramo de cualquier sustancia', 'El volumen que ocupa un litro de gas'],
      ['The amount of substance that contains 6.022 · 10²³ particles', 'The mass of one carbon atom', 'One gram of any substance', 'The volume taken up by one litre of gas'],
      ['La quantitat de substància que conté 6,022 · 10²³ partícules', 'La massa d’un àtom de carboni', 'Un gram de qualsevol substància', 'El volum que ocupa un litre de gas']),
    T('El mol es una unidad para contar partículas, como la docena cuenta huevos: un mol son 6,022 · 10²³ átomos, moléculas o iones (el número de Avogadro). Cuánto pesa ese mol depende de la sustancia.',
      'The mole is a unit for counting particles, like a dozen counts eggs: one mole is 6.022 · 10²³ atoms, molecules or ions (Avogadro’s number). How much that mole weighs depends on the substance.',
      'El mol és una unitat per comptar partícules, com la dotzena compta ous: un mol són 6,022 · 10²³ àtoms, molècules o ions (el nombre d’Avogadro). Quant pesa aquest mol depèn de la substància.')),

  q('eq-02', 'eso', '💧',
    T('¿Cuál es la masa molar del agua, H₂O? (H = 1, O = 16)', 'What is the molar mass of water, H₂O? (H = 1, O = 16)', 'Quina és la massa molar de l’aigua, H₂O? (H = 1, O = 16)'),
    N('18 g/mol', '17 g/mol', '34 g/mol', '32 g/mol'),
    T('Se suman las masas de todos los átomos de la fórmula: 2 · 1 + 16 = 18 g/mol. Si se olvida el subíndice 2 del hidrógeno sale 17.',
      'Add the masses of every atom in the formula: 2 · 1 + 16 = 18 g/mol. Forgetting the subscript 2 on hydrogen gives 17.',
      'Se sumen les masses de tots els àtoms de la fórmula: 2 · 1 + 16 = 18 g/mol. Si s’oblida el subíndex 2 de l’hidrogen surt 17.')),

  q('eq-03', 'eso', '💨',
    T('¿Cuántos moles hay en 88 g de CO₂? (C = 12, O = 16)', 'How many moles are there in 88 g of CO₂? (C = 12, O = 16)', 'Quants mols hi ha en 88 g de CO₂? (C = 12, O = 16)'),
    N('2 mol', '0,5 mol', '3,1 mol', '3872 mol'),
    T('La masa molar del CO₂ es 12 + 2 · 16 = 44 g/mol, y n = masa ÷ masa molar = 88 ÷ 44 = 2 mol. Dividir al revés da 0,5; olvidar un oxígeno (28 g/mol) da 3,1.',
      'The molar mass of CO₂ is 12 + 2 · 16 = 44 g/mol, and n = mass ÷ molar mass = 88 ÷ 44 = 2 mol. Dividing the wrong way gives 0.5; forgetting one oxygen (28 g/mol) gives 3.1.',
      'La massa molar del CO₂ és 12 + 2 · 16 = 44 g/mol, i n = massa ÷ massa molar = 88 ÷ 44 = 2 mol. Dividir al revés dona 0,5; oblidar un oxigen (28 g/mol) dona 3,1.')),

  q('eq-04', 'eso', '🔬',
    T('¿Cuántas moléculas hay en 2 mol de agua? (Nₐ = 6,022 · 10²³)', 'How many molecules are there in 2 mol of water? (Nₐ = 6.022 · 10²³)', 'Quantes molècules hi ha en 2 mol d’aigua? (Nₐ = 6,022 · 10²³)'),
    N('1,2 · 10²⁴', '6,0 · 10²³', '3,0 · 10²³', '3,6 · 10²⁴'),
    T('Moléculas = moles · Nₐ = 2 · 6,022 · 10²³ ≈ 1,2 · 10²⁴. El 3,6 · 10²⁴ son los ÁTOMOS, porque cada molécula de agua tiene tres.',
      'Molecules = moles · Nₐ = 2 · 6.022 · 10²³ ≈ 1.2 · 10²⁴. The 3.6 · 10²⁴ is the number of ATOMS, because each water molecule has three.',
      'Molècules = mols · Nₐ = 2 · 6,022 · 10²³ ≈ 1,2 · 10²⁴. El 3,6 · 10²⁴ són els ÀTOMS, perquè cada molècula d’aigua en té tres.')),

  q('eq-05', 'eso', '⚖️',
    T('10 g de una sustancia A reaccionan por completo con 6 g de B en un recipiente cerrado. ¿Cuánto pesan los productos?', '10 g of substance A react completely with 6 g of B in a closed container. How much do the products weigh?', '10 g d’una substància A reaccionen completament amb 6 g de B en un recipient tancat. Quant pesen els productes?'),
    N('16 g', '4 g', '60 g', '10 g'),
    T('Ley de Lavoisier: en una reacción la masa se conserva. Los átomos solo se reorganizan, así que los productos pesan lo mismo que los reactivos: 10 + 6 = 16 g.',
      'Lavoisier’s law: mass is conserved in a reaction. The atoms are only rearranged, so the products weigh the same as the reactants: 10 + 6 = 16 g.',
      'Llei de Lavoisier: en una reacció la massa es conserva. Els àtoms només es reorganitzen, així que els productes pesen el mateix que els reactius: 10 + 6 = 16 g.')),

  q('eq-06', 'eso', '🧩',
    T('Ajusta la reacción N₂ + H₂ → NH₃. ¿Qué coeficiente lleva el NH₃?', 'Balance the reaction N₂ + H₂ → NH₃. What coefficient goes in front of NH₃?', 'Ajusta la reacció N₂ + H₂ → NH₃. Quin coeficient porta l’NH₃?'),
    N('2', '1', '3', '6'),
    T('N₂ + 3 H₂ → 2 NH₃: hay 2 nitrógenos a la izquierda, así que hacen falta 2 NH₃; esos llevan 6 hidrógenos, que son 3 H₂.',
      'N₂ + 3 H₂ → 2 NH₃: there are 2 nitrogens on the left, so you need 2 NH₃; those contain 6 hydrogens, which is 3 H₂.',
      'N₂ + 3 H₂ → 2 NH₃: hi ha 2 nitrògens a l’esquerra, així que calen 2 NH₃; aquests porten 6 hidrògens, que són 3 H₂.')),

  q('eq-07', 'eso', '🔥',
    T('En la reacción 2 H₂ + O₂ → 2 H₂O, ¿cuántos moles de agua se forman con 4 mol de H₂ y oxígeno de sobra?', 'In the reaction 2 H₂ + O₂ → 2 H₂O, how many moles of water form from 4 mol of H₂ with plenty of oxygen?', 'En la reacció 2 H₂ + O₂ → 2 H₂O, quants mols d’aigua es formen amb 4 mol d’H₂ i oxigen de sobres?'),
    N('4 mol', '2 mol', '8 mol', '1 mol'),
    T('Los coeficientes dicen que 2 mol de H₂ dan 2 mol de H₂O: la proporción es 1 a 1. Con 4 mol de hidrógeno salen 4 mol de agua.',
      'The coefficients say that 2 mol of H₂ give 2 mol of H₂O: the ratio is 1 to 1. With 4 mol of hydrogen you get 4 mol of water.',
      'Els coeficients diuen que 2 mol d’H₂ donen 2 mol d’H₂O: la proporció és 1 a 1. Amb 4 mol d’hidrogen surten 4 mol d’aigua.')),

  q('eq-08', 'eso', '🧂',
    T('Disuelves 20 g de sal en agua hasta tener 500 mL de disolución. ¿Cuál es la concentración en g/L?', 'You dissolve 20 g of salt in water to make 500 mL of solution. What is the concentration in g/L?', 'Dissols 20 g de sal en aigua fins a tenir 500 mL de dissolució. Quina és la concentració en g/L?'),
    N('40 g/L', '10 g/L', '0,04 g/L', '10 000 g/L'),
    T('Primero se pasa el volumen a litros: 500 mL = 0,5 L. Después, 20 g ÷ 0,5 L = 40 g/L. Dividir entre 500 sin pasar a litros da 0,04.',
      'First convert the volume to litres: 500 mL = 0.5 L. Then 20 g ÷ 0.5 L = 40 g/L. Dividing by 500 without converting gives 0.04.',
      'Primer es passa el volum a litres: 500 mL = 0,5 L. Després, 20 g ÷ 0,5 L = 40 g/L. Dividir entre 500 sense passar a litres dona 0,04.')),

  q('eq-09', 'eso', '📐',
    T('¿Qué indican los coeficientes de una ecuación química ajustada?', 'What do the coefficients of a balanced chemical equation tell you?', 'Què indiquen els coeficients d’una equació química ajustada?'),
    O(['La proporción en moles (o en moléculas) en que reaccionan y se forman las sustancias', 'La proporción en gramos de cada sustancia', 'Cuántos átomos tiene cada molécula', 'Lo rápido que ocurre la reacción'],
      ['The ratio in moles (or molecules) in which the substances react and form', 'The ratio in grams of each substance', 'How many atoms each molecule has', 'How fast the reaction happens'],
      ['La proporció en mols (o en molècules) en què reaccionen i es formen les substàncies', 'La proporció en grams de cada substància', 'Quants àtoms té cada molècula', 'Com de ràpid passa la reacció']),
    T('2 H₂ + O₂ → 2 H₂O se lee «2 mol de hidrógeno con 1 de oxígeno dan 2 de agua». No son gramos: 2 mol de H₂ pesan 4 g y 1 mol de O₂, 32 g. Los átomos de cada molécula los dan los subíndices.',
      '2 H₂ + O₂ → 2 H₂O reads "2 mol of hydrogen with 1 of oxygen give 2 of water". They are not grams: 2 mol of H₂ weigh 4 g and 1 mol of O₂, 32 g. The atoms in each molecule are given by the subscripts.',
      '2 H₂ + O₂ → 2 H₂O es llegeix «2 mol d’hidrogen amb 1 d’oxigen donen 2 d’aigua». No són grams: 2 mol d’H₂ pesen 4 g i 1 mol d’O₂, 32 g. Els àtoms de cada molècula els donen els subíndexs.')),

  q('eq-10', 'eso', '🧂',
    T('¿Cuánto pesan 0,5 mol de NaCl? (Na = 23, Cl = 35,5)', 'How much do 0.5 mol of NaCl weigh? (Na = 23, Cl = 35.5)', 'Quant pesen 0,5 mol de NaCl? (Na = 23, Cl = 35,5)'),
    N('29,25 g', '58,5 g', '117 g', '0,0085 g'),
    T('Masa molar del NaCl: 23 + 35,5 = 58,5 g/mol. Masa = moles · masa molar = 0,5 · 58,5 = 29,25 g. Dividir en vez de multiplicar da 117 g o 0,0085 g.',
      'Molar mass of NaCl: 23 + 35.5 = 58.5 g/mol. Mass = moles · molar mass = 0.5 · 58.5 = 29.25 g. Dividing instead of multiplying gives 117 g or 0.0085 g.',
      'Massa molar del NaCl: 23 + 35,5 = 58,5 g/mol. Massa = mols · massa molar = 0,5 · 58,5 = 29,25 g. Dividir en lloc de multiplicar dona 117 g o 0,0085 g.')),

  q('eq-11', 'eso', '🔩',
    T('Un mol de hierro pesa 56 g y un mol de aluminio, 27 g. ¿Por qué no pesan lo mismo?', 'One mole of iron weighs 56 g and one mole of aluminium 27 g. Why do they not weigh the same?', 'Un mol de ferro pesa 56 g i un mol d’alumini, 27 g. Per què no pesen el mateix?'),
    O(['Tienen el mismo número de átomos, pero cada átomo de hierro pesa más', 'Porque en un mol de hierro hay más átomos', 'Porque el hierro es un sólido más duro', 'Porque el mol no es igual para todos los elementos'],
      ['They have the same number of atoms, but each iron atom is heavier', 'Because there are more atoms in a mole of iron', 'Because iron is a harder solid', 'Because a mole is not the same for every element'],
      ['Tenen el mateix nombre d’àtoms, però cada àtom de ferro pesa més', 'Perquè en un mol de ferro hi ha més àtoms', 'Perquè el ferro és un sòlid més dur', 'Perquè el mol no és igual per a tots els elements']),
    T('Un mol siempre son 6,022 · 10²³ partículas, sea de lo que sea. Lo que cambia es la masa de cada átomo: el de hierro pesa unas dos veces lo que el de aluminio, y por eso su mol también.',
      'A mole is always 6.022 · 10²³ particles, whatever they are. What changes is the mass of each atom: an iron atom weighs about twice an aluminium atom, and so does its mole.',
      'Un mol sempre són 6,022 · 10²³ partícules, siguin del que siguin. El que canvia és la massa de cada àtom: el de ferro pesa unes dues vegades el d’alumini, i per això el seu mol també.')),

  // ── Bachillerato ────────────────────────────────────────────────────────
  q('eq-12', 'bachillerato', '🧪',
    T('Disuelves 0,2 mol de NaOH en agua hasta 500 mL de disolución. ¿Cuál es la molaridad?', 'You dissolve 0.2 mol of NaOH in water to make 500 mL of solution. What is the molarity?', 'Dissols 0,2 mol de NaOH en aigua fins a 500 mL de dissolució. Quina és la molaritat?'),
    N('0,4 M', '0,1 M', '0,0004 M', '2,5 M'),
    T('Molaridad = moles de soluto ÷ litros de disolución = 0,2 ÷ 0,5 = 0,4 mol/L. Sin pasar los mL a litros sale 0,0004; multiplicando, 0,1; dividiendo al revés, 2,5.',
      'Molarity = moles of solute ÷ litres of solution = 0.2 ÷ 0.5 = 0.4 mol/L. Without converting mL to litres you get 0.0004; multiplying, 0.1; dividing the wrong way, 2.5.',
      'Molaritat = mols de solut ÷ litres de dissolució = 0,2 ÷ 0,5 = 0,4 mol/L. Sense passar els mL a litres surt 0,0004; multiplicant, 0,1; dividint al revés, 2,5.')),

  q('eq-13', 'bachillerato', '🎈',
    T('¿Qué volumen ocupa 1 mol de cualquier gas ideal a 0 °C y 1 atm (condiciones normales)?', 'What volume does 1 mol of any ideal gas take up at 0 °C and 1 atm (standard conditions)?', 'Quin volum ocupa 1 mol de qualsevol gas ideal a 0 °C i 1 atm (condicions normals)?'),
    N('22,4 L', '1 L', '2,24 L', '6,022 L'),
    T('Con PV = nRT: V = 1 · 0,082 · 273 ÷ 1 ≈ 22,4 L. Es el mismo para todos los gases ideales, porque en un gas lo que cuenta es el número de partículas, no de qué son.',
      'From PV = nRT: V = 1 · 0.082 · 273 ÷ 1 ≈ 22.4 L. It is the same for every ideal gas, because in a gas what counts is the number of particles, not what they are.',
      'Amb PV = nRT: V = 1 · 0,082 · 273 ÷ 1 ≈ 22,4 L. És el mateix per a tots els gasos ideals, perquè en un gas el que compta és el nombre de partícules, no de què són.')),

  q('eq-14', 'bachillerato', '🌡️',
    T('2 mol de un gas ocupan 10 L a 27 °C. ¿Qué presión tiene? (R = 0,082 atm·L/(mol·K))', '2 mol of a gas take up 10 L at 27 °C. What is its pressure? (R = 0.082 atm·L/(mol·K))', '2 mol d’un gas ocupen 10 L a 27 °C. Quina pressió té? (R = 0,082 atm·L/(mol·K))'),
    N('4,92 atm', '0,44 atm', '49,2 atm', '0,20 atm'),
    T('La temperatura va SIEMPRE en kelvin: 27 + 273 = 300 K. P = nRT ÷ V = 2 · 0,082 · 300 ÷ 10 = 4,92 atm. Con 27 °C sin pasar a kelvin sale 0,44 atm.',
      'Temperature ALWAYS goes in kelvin: 27 + 273 = 300 K. P = nRT ÷ V = 2 · 0.082 · 300 ÷ 10 = 4.92 atm. Using 27 °C without converting to kelvin gives 0.44 atm.',
      'La temperatura va SEMPRE en kelvin: 27 + 273 = 300 K. P = nRT ÷ V = 2 · 0,082 · 300 ÷ 10 = 4,92 atm. Amb 27 °C sense passar a kelvin surt 0,44 atm.')),

  q('eq-15', 'bachillerato', '⛔',
    T('Para la reacción 2 H₂ + O₂ → 2 H₂O se mezclan 3 mol de H₂ y 2 mol de O₂. ¿Qué reactivo es el limitante y cuánta agua se forma?', 'For the reaction 2 H₂ + O₂ → 2 H₂O, 3 mol of H₂ and 2 mol of O₂ are mixed. Which reactant is limiting and how much water forms?', 'Per a la reacció 2 H₂ + O₂ → 2 H₂O es barregen 3 mol d’H₂ i 2 mol d’O₂. Quin reactiu és el limitant i quanta aigua es forma?'),
    O(['El H₂; se forman 3 mol de agua', 'El O₂; se forman 4 mol de agua', 'El O₂; se forman 2 mol de agua', 'El H₂; se forman 6 mol de agua'],
      ['H₂; 3 mol of water form', 'O₂; 4 mol of water form', 'O₂; 2 mol of water form', 'H₂; 6 mol of water form'],
      ['L’H₂; es formen 3 mol d’aigua', 'L’O₂; es formen 4 mol d’aigua', 'L’O₂; es formen 2 mol d’aigua', 'L’H₂; es formen 6 mol d’aigua']),
    T('3 mol de H₂ solo necesitan 1,5 mol de O₂, y hay 2: sobra oxígeno. El hidrógeno se acaba antes, así que limita, y da tantos moles de agua como de H₂: 3 mol. Que haya menos moles de O₂ no lo hace limitante.',
      '3 mol of H₂ only need 1.5 mol of O₂, and there are 2: oxygen is left over. Hydrogen runs out first, so it is limiting, and it gives as many moles of water as of H₂: 3 mol. Having fewer moles of O₂ does not make it limiting.',
      '3 mol d’H₂ només necessiten 1,5 mol d’O₂, i n’hi ha 2: sobra oxigen. L’hidrogen s’acaba abans, així que limita, i dona tants mols d’aigua com d’H₂: 3 mol. Que hi hagi menys mols d’O₂ no el fa limitant.')),

  q('eq-16', 'bachillerato', '🏔️',
    T('Al calentar caliza, CaCO₃ → CaO + CO₂. ¿Cuánto CO₂ se obtiene de 100 g de CaCO₃? (Ca = 40, C = 12, O = 16)', 'When limestone is heated, CaCO₃ → CaO + CO₂. How much CO₂ is obtained from 100 g of CaCO₃? (Ca = 40, C = 12, O = 16)', 'En escalfar pedra calcària, CaCO₃ → CaO + CO₂. Quant CO₂ s’obté de 100 g de CaCO₃? (Ca = 40, C = 12, O = 16)'),
    N('44 g', '56 g', '100 g', '22 g'),
    T('M(CaCO₃) = 40 + 12 + 48 = 100 g/mol, así que hay 1 mol. La ecuación dice 1 a 1: sale 1 mol de CO₂, que son 12 + 32 = 44 g. Los 56 g son el CaO, el otro producto (44 + 56 = 100: la masa se conserva).',
      'M(CaCO₃) = 40 + 12 + 48 = 100 g/mol, so there is 1 mol. The equation is 1 to 1: 1 mol of CO₂ forms, which is 12 + 32 = 44 g. The 56 g is the CaO, the other product (44 + 56 = 100: mass is conserved).',
      'M(CaCO₃) = 40 + 12 + 48 = 100 g/mol, així que hi ha 1 mol. L’equació diu 1 a 1: surt 1 mol de CO₂, que són 12 + 32 = 44 g. Els 56 g són el CaO, l’altre producte (44 + 56 = 100: la massa es conserva).')),

  q('eq-17', 'bachillerato', '📉',
    T('Según los cálculos deberían salir 50 g de producto, pero en el laboratorio se obtienen 40 g. ¿Cuál es el rendimiento?', 'According to the calculations 50 g of product should form, but 40 g are obtained in the lab. What is the yield?', 'Segons els càlculs haurien de sortir 50 g de producte, però al laboratori se n’obtenen 40 g. Quin és el rendiment?'),
    N('80 %', '125 %', '20 %', '90 %'),
    T('Rendimiento = obtenido ÷ teórico · 100 = 40 ÷ 50 · 100 = 80 %. Nunca puede pasar del 100 %: si sale 125 % es que se ha dividido al revés.',
      'Yield = obtained ÷ theoretical · 100 = 40 ÷ 50 · 100 = 80 %. It can never be over 100 %: getting 125 % means you divided the wrong way.',
      'Rendiment = obtingut ÷ teòric · 100 = 40 ÷ 50 · 100 = 80 %. Mai no pot passar del 100 %: si surt 125 % és que s’ha dividit al revés.')),

  q('eq-18', 'bachillerato', '⛏️',
    T('Una muestra de 200 g de mineral tiene un 75 % de CaCO₃ (M = 100 g/mol). ¿Cuántos moles de CaCO₃ contiene?', 'A 200 g sample of ore is 75 % CaCO₃ (M = 100 g/mol). How many moles of CaCO₃ does it contain?', 'Una mostra de 200 g de mineral té un 75 % de CaCO₃ (M = 100 g/mol). Quants mols de CaCO₃ conté?'),
    N('1,5 mol', '2 mol', '0,5 mol', '150 mol'),
    T('Primero la parte pura: 75 % de 200 g = 150 g de CaCO₃. Después, 150 ÷ 100 = 1,5 mol. Si se usa la muestra entera salen 2 mol, que es suponer que todo es caliza.',
      'First the pure part: 75 % of 200 g = 150 g of CaCO₃. Then 150 ÷ 100 = 1.5 mol. Using the whole sample gives 2 mol, which assumes it is all limestone.',
      'Primer la part pura: 75 % de 200 g = 150 g de CaCO₃. Després, 150 ÷ 100 = 1,5 mol. Si es fa servir tota la mostra surten 2 mol, que és suposar que tot és calcària.')),

  q('eq-19', 'bachillerato', '🔍',
    T('Un hidrocarburo tiene un 75 % de carbono y un 25 % de hidrógeno en masa. ¿Cuál es su fórmula empírica? (C = 12, H = 1)', 'A hydrocarbon is 75 % carbon and 25 % hydrogen by mass. What is its empirical formula? (C = 12, H = 1)', 'Un hidrocarbur té un 75 % de carboni i un 25 % d’hidrogen en massa. Quina és la seva fórmula empírica? (C = 12, H = 1)'),
    N('CH₄', 'C₃H', 'CH₃', 'CH₂'),
    T('En 100 g hay 75 g de C y 25 g de H. Pasados a moles: 75 ÷ 12 = 6,25 mol de C y 25 ÷ 1 = 25 mol de H. Dividiendo entre el menor: 1 C por cada 4 H, CH₄. Leer los porcentajes como si fueran átomos da C₃H.',
      'In 100 g there are 75 g of C and 25 g of H. In moles: 75 ÷ 12 = 6.25 mol of C and 25 ÷ 1 = 25 mol of H. Dividing by the smaller: 1 C for every 4 H, CH₄. Reading the percentages as if they were atoms gives C₃H.',
      'En 100 g hi ha 75 g de C i 25 g d’H. Passats a mols: 75 ÷ 12 = 6,25 mol de C i 25 ÷ 1 = 25 mol d’H. Dividint entre el menor: 1 C per cada 4 H, CH₄. Llegir els percentatges com si fossin àtoms dona C₃H.')),

  q('eq-20', 'bachillerato', '🚰',
    T('A 100 mL de HCl 2 M se le añade agua hasta 500 mL. ¿Cuál es la nueva concentración?', 'Water is added to 100 mL of 2 M HCl up to 500 mL. What is the new concentration?', 'A 100 mL d’HCl 2 M s’hi afegeix aigua fins a 500 mL. Quina és la nova concentració?'),
    N('0,4 M', '2 M', '10 M', '0,2 M'),
    T('Al diluir no cambian los moles de soluto: 0,1 L · 2 M = 0,2 mol. Ahora están en 0,5 L: 0,2 ÷ 0,5 = 0,4 M. Es lo mismo que M₁·V₁ = M₂·V₂. Al añadir agua la concentración tiene que bajar, nunca subir a 10 M.',
      'Diluting does not change the moles of solute: 0.1 L · 2 M = 0.2 mol. Now they are in 0.5 L: 0.2 ÷ 0.5 = 0.4 M. It is the same as M₁·V₁ = M₂·V₂. Adding water must lower the concentration, never raise it to 10 M.',
      'En diluir no canvien els mols de solut: 0,1 L · 2 M = 0,2 mol. Ara són en 0,5 L: 0,2 ÷ 0,5 = 0,4 M. És el mateix que M₁·V₁ = M₂·V₂. En afegir aigua la concentració ha de baixar, mai pujar a 10 M.')),

  q('eq-21', 'bachillerato', '🌬️',
    T('Una mezcla de 2 mol de N₂ y 3 mol de O₂ tiene una presión total de 10 atm. ¿Cuál es la presión parcial del O₂?', 'A mixture of 2 mol of N₂ and 3 mol of O₂ has a total pressure of 10 atm. What is the partial pressure of O₂?', 'Una mescla de 2 mol de N₂ i 3 mol d’O₂ té una pressió total de 10 atm. Quina és la pressió parcial de l’O₂?'),
    N('6 atm', '4 atm', '5 atm', '3 atm'),
    T('Ley de Dalton: cada gas aporta según su fracción molar. χ(O₂) = 3 ÷ (2 + 3) = 0,6, y P(O₂) = 0,6 · 10 = 6 atm. Repartir a partes iguales da 5; los 4 atm son los del N₂.',
      'Dalton’s law: each gas contributes according to its mole fraction. χ(O₂) = 3 ÷ (2 + 3) = 0.6, and P(O₂) = 0.6 · 10 = 6 atm. Splitting equally gives 5; the 4 atm belong to N₂.',
      'Llei de Dalton: cada gas aporta segons la seva fracció molar. χ(O₂) = 3 ÷ (2 + 3) = 0,6, i P(O₂) = 0,6 · 10 = 6 atm. Repartir a parts iguals dona 5; les 4 atm són les de l’N₂.')),

  q('eq-22', 'bachillerato', '🔥',
    T('El metano arde así: CH₄ + 2 O₂ → CO₂ + 2 H₂O. ¿Cuánto oxígeno hace falta para quemar 16 g de CH₄? (C = 12, H = 1, O = 16)', 'Methane burns like this: CH₄ + 2 O₂ → CO₂ + 2 H₂O. How much oxygen is needed to burn 16 g of CH₄? (C = 12, H = 1, O = 16)', 'El metà crema així: CH₄ + 2 O₂ → CO₂ + 2 H₂O. Quant oxigen cal per cremar 16 g de CH₄? (C = 12, H = 1, O = 16)'),
    N('64 g', '32 g', '16 g', '128 g'),
    T('16 g de CH₄ son 1 mol (12 + 4). La ecuación pide 2 mol de O₂ por cada mol de metano, y cada mol de O₂ pesa 32 g: 2 · 32 = 64 g. Olvidar el coeficiente 2 da 32 g.',
      '16 g of CH₄ is 1 mol (12 + 4). The equation needs 2 mol of O₂ for each mole of methane, and each mole of O₂ weighs 32 g: 2 · 32 = 64 g. Forgetting the coefficient 2 gives 32 g.',
      '16 g de CH₄ són 1 mol (12 + 4). L’equació demana 2 mol d’O₂ per cada mol de metà, i cada mol d’O₂ pesa 32 g: 2 · 32 = 64 g. Oblidar el coeficient 2 dona 32 g.')),

  q('eq-23', 'bachillerato', '📏',
    T('En el agua, el hidrógeno y el oxígeno se combinan siempre en proporción 1 g de H por cada 8 g de O. ¿Cuánto oxígeno reacciona con 4 g de hidrógeno?', 'In water, hydrogen and oxygen always combine in the ratio 1 g of H for every 8 g of O. How much oxygen reacts with 4 g of hydrogen?', 'En l’aigua, l’hidrogen i l’oxigen es combinen sempre en proporció 1 g d’H per cada 8 g d’O. Quant oxigen reacciona amb 4 g d’hidrogen?'),
    N('32 g', '8 g', '0,5 g', '36 g'),
    T('Ley de Proust de las proporciones definidas: un compuesto tiene siempre la misma proporción en masa. Con 4 veces más hidrógeno hace falta 4 veces más oxígeno: 4 · 8 = 32 g. Los 36 g serían el agua formada.',
      'Proust’s law of definite proportions: a compound always has the same mass ratio. With 4 times as much hydrogen you need 4 times as much oxygen: 4 · 8 = 32 g. The 36 g would be the water formed.',
      'Llei de Proust de les proporcions definides: un compost té sempre la mateixa proporció en massa. Amb 4 vegades més hidrogen calen 4 vegades més oxigen: 4 · 8 = 32 g. Els 36 g serien l’aigua formada.')),

  q('eq-24', 'bachillerato', '🥤',
    T('Una disolución tiene 1 mol de azúcar y 9 mol de agua. ¿Cuál es la fracción molar del azúcar?', 'A solution has 1 mol of sugar and 9 mol of water. What is the mole fraction of sugar?', 'Una dissolució té 1 mol de sucre i 9 mol d’aigua. Quina és la fracció molar del sucre?'),
    N('0,1', '0,11', '0,9', '10'),
    T('Fracción molar = moles de esa sustancia ÷ moles TOTALES = 1 ÷ (1 + 9) = 0,1. Dividir solo entre los del agua da 0,11; el 0,9 es la del agua. Nunca pasa de 1.',
      'Mole fraction = moles of that substance ÷ TOTAL moles = 1 ÷ (1 + 9) = 0.1. Dividing only by the water gives 0.11; 0.9 is the water’s. It can never exceed 1.',
      'Fracció molar = mols d’aquesta substància ÷ mols TOTALS = 1 ÷ (1 + 9) = 0,1. Dividir només entre els de l’aigua dona 0,11; el 0,9 és la de l’aigua. Mai no passa d’1.')),
]

export const PREGUNTAS_ESO = PREGUNTAS.filter(p => p.nivel === 'eso')
export const PREGUNTAS_BACH = PREGUNTAS
