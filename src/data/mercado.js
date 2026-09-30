// El mercado: oferta, demanda y precio — Economía, 4º ESO + Bachillerato.
// Qué es un mercado, la ley de la demanda y de la oferta, el precio de
// equilibrio, excesos y escasez, desplazamientos de las curvas, elasticidad,
// tipos de mercado (competencia, monopolio, oligopolio) y fallos del mercado.
//
// Temario conceptual: se razona sobre causas y efectos, no se calcula (el
// cálculo de Economía de la Empresa ya lo tiene el examen de Punto de
// Equilibrio).
//
// La respuesta buena va siempre la PRIMERA en `opciones`: ExamenMC baraja el
// orden al servir cada pregunta (lib/ordenOpciones.js).
function q(id, nivel, emoji, pregunta, opciones, explicacion) {
  // La correcta se guarda como TEXTO (lo que leen ExamenMC y las tarjetas
  // imprimibles de lib/tarjetasExamen.js): el de la primera opción.
  const correcta = { es: opciones.es[0], en: opciones.en[0], ca: opciones.ca[0] }
  return { id, nivel, emoji, pregunta, opciones, correcta, explicacion }
}
const T = (es, en, ca) => ({ es, en, ca })
const O = (es, en, ca) => ({ es, en, ca })

export const PREGUNTAS = [
  // ── ESO ─────────────────────────────────────────────────────────────────
  q('me-01', 'eso', '🏪',
    T("En economía, ¿qué es un mercado?", "In economics, what is a market?", "En economia, què és un mercat?"),
    O(["Cualquier lugar o medio donde compradores y vendedores intercambian un bien o servicio", "Solo el edificio donde se venden alimentos", "Una empresa muy grande", "Un banco"],
      ["Any place or means through which buyers and sellers exchange a good or service", "Only the building where food is sold", "A very large company", "A bank"],
      ["Qualsevol lloc o mitjà on compradors i venedors intercanvien un bé o servei", "Només l'edifici on es venen aliments", "Una empresa molt gran", "Un banc"]),
    T("Un mercado no tiene por qué ser un sitio físico: hay mercado de la vivienda, de trabajo o de compraventa por internet. Basta con que se encuentren quienes demandan y quienes ofrecen.",
      "A market does not have to be a physical place: there is a housing market, a job market or online buying and selling. All it takes is for demand and supply to meet.",
      "Un mercat no ha de ser per força un lloc físic: hi ha mercat de l'habitatge, de treball o de compravenda per internet. N'hi ha prou que es trobin els qui demanen i els qui ofereixen.")),

  q('me-02', 'eso', '📉',
    T("Según la ley de la demanda, si sube el precio de un producto…", "According to the law of demand, if a product's price goes up…", "Segons la llei de la demanda, si puja el preu d'un producte…"),
    O(["Se compra menos cantidad", "Se compra más cantidad", "La cantidad comprada no cambia nunca", "Desaparecen los vendedores"],
      ["Less of it is bought", "More of it is bought", "The amount bought never changes", "Sellers disappear"],
      ["Se'n compra menys quantitat", "Se'n compra més quantitat", "La quantitat comprada no canvia mai", "Desapareixen els venedors"]),
    T("Precio y cantidad demandada van en sentido contrario: cuando algo se encarece, la gente compra menos o busca sustitutos. Por eso la curva de demanda baja hacia la derecha.",
      "Price and quantity demanded move in opposite directions: when something gets dearer, people buy less or look for substitutes. That is why the demand curve slopes down to the right.",
      "El preu i la quantitat demandada van en sentit contrari: quan una cosa s'encareix, la gent en compra menys o busca substituts. Per això la corba de demanda baixa cap a la dreta.")),

  q('me-03', 'eso', '📈',
    T("Según la ley de la oferta, si sube el precio de un producto, los vendedores…", "According to the law of supply, if a product's price goes up, sellers…", "Segons la llei de l'oferta, si puja el preu d'un producte, els venedors…"),
    O(["Quieren vender más cantidad, porque les compensa más", "Quieren vender menos", "Dejan de producirlo", "Bajan el precio"],
      ["Want to sell more, because it pays them better", "Want to sell less", "Stop making it", "Lower the price"],
      ["Volen vendre'n més quantitat, perquè els compensa més", "Volen vendre'n menys", "Deixen de produir-lo", "Abaixen el preu"]),
    T("A mayor precio, más beneficio por unidad, así que las empresas producen y ofrecen más. La curva de oferta sube hacia la derecha.",
      "A higher price means more profit per unit, so firms produce and offer more. The supply curve slopes up to the right.",
      "A més preu, més benefici per unitat, així que les empreses produeixen i ofereixen més. La corba d'oferta puja cap a la dreta.")),

  q('me-04', 'eso', '⚖️',
    T("¿Qué es el precio de equilibrio?", "What is the equilibrium price?", "Què és el preu d'equilibri?"),
    O(["El precio al que la cantidad que se quiere comprar coincide con la que se quiere vender", "El precio más alto posible", "El precio que fija siempre el Gobierno", "El precio más bajo posible"],
      ["The price at which the amount people want to buy equals the amount sellers want to sell", "The highest possible price", "The price always set by the government", "The lowest possible price"],
      ["El preu al qual la quantitat que es vol comprar coincideix amb la que es vol vendre", "El preu més alt possible", "El preu que fixa sempre el Govern", "El preu més baix possible"]),
    T("En el equilibrio se cruzan las curvas de oferta y demanda: no sobra ni falta producto. Si el precio se aleja de ese punto, el propio mercado tiende a devolverlo.",
      "At equilibrium the supply and demand curves cross: there is neither surplus nor shortage. If the price moves away from that point, the market itself tends to bring it back.",
      "A l'equilibri es creuen les corbes d'oferta i demanda: no sobra ni falta producte. Si el preu s'allunya d'aquest punt, el mateix mercat tendeix a retornar-l'hi.")),

  q('me-05', 'eso', '📦',
    T("Si el precio está por ENCIMA del de equilibrio, ¿qué ocurre?", "If the price is ABOVE equilibrium, what happens?", "Si el preu és PER SOBRE del d'equilibri, què passa?"),
    O(["Hay exceso de oferta: sobra producto y el precio tiende a bajar", "Hay escasez y el precio sube más", "Todo se vende al instante", "No pasa nada"],
      ["There is excess supply: goods pile up and the price tends to fall", "There is a shortage and the price rises further", "Everything sells instantly", "Nothing happens"],
      ["Hi ha excés d'oferta: sobra producte i el preu tendeix a baixar", "Hi ha escassetat i el preu puja més", "Tot es ven a l'instant", "No passa res"]),
    T("A un precio demasiado alto se ofrece mucho y se compra poco: se acumulan existencias. Para venderlas, los vendedores bajan precios, como en las rebajas.",
      "At too high a price a lot is offered and little is bought: stock builds up. To shift it, sellers cut prices, as in the sales.",
      "A un preu massa alt s'ofereix molt i es compra poc: s'acumulen existències. Per vendre-les, els venedors abaixen preus, com a les rebaixes.")),

  q('me-06', 'eso', '🎟️',
    T("Si el precio está por DEBAJO del de equilibrio, ¿qué ocurre?", "If the price is BELOW equilibrium, what happens?", "Si el preu és PER SOTA del d'equilibri, què passa?"),
    O(["Hay escasez: se quiere comprar más de lo que hay y el precio tiende a subir", "Sobra producto", "El precio baja aún más", "Los vendedores regalan el producto"],
      ["There is a shortage: people want to buy more than is available and the price tends to rise", "There is a surplus", "The price falls even further", "Sellers give the product away"],
      ["Hi ha escassetat: es vol comprar més del que hi ha i el preu tendeix a pujar", "Sobra producte", "El preu baixa encara més", "Els venedors regalen el producte"]),
    T("Con un precio demasiado bajo, mucha gente quiere comprar pero hay poco. Aparecen colas y reventa, y el precio acaba subiendo. Pasa con las entradas de conciertos muy demandados.",
      "With too low a price, many people want to buy but there is little available. Queues and resale appear, and the price ends up rising. It happens with tickets for very popular concerts.",
      "Amb un preu massa baix, molta gent vol comprar però n'hi ha poc. Apareixen cues i revenda, i el preu acaba pujant. Passa amb les entrades de concerts molt demanats.")),

  q('me-07', 'eso', '🍓',
    T("Una helada destruye media cosecha de fresas. ¿Qué pasará con su precio?", "A frost destroys half the strawberry crop. What will happen to their price?", "Una glaçada destrueix mitja collita de maduixes. Què passarà amb el seu preu?"),
    O(["Subirá, porque la oferta disminuye", "Bajará, porque hay menos fresas", "No cambiará", "Bajará, porque la demanda sube"],
      ["It will rise, because supply falls", "It will fall, because there are fewer strawberries", "It will not change", "It will fall, because demand rises"],
      ["Pujarà, perquè l'oferta disminueix", "Baixarà, perquè hi ha menys maduixes", "No canviarà", "Baixarà, perquè la demanda puja"]),
    T("Con menos fresas a la venta (la oferta se reduce) y la misma gente queriendo comprarlas, el nuevo equilibrio tiene un precio más alto y se venden menos.",
      "With fewer strawberries for sale (supply shrinks) and the same people wanting them, the new equilibrium has a higher price and fewer are sold.",
      "Amb menys maduixes a la venda (l'oferta es redueix) i la mateixa gent volent comprar-ne, el nou equilibri té un preu més alt i se'n venen menys.")),

  q('me-08', 'eso', '🍦',
    T("Llega una ola de calor. ¿Qué le pasa a la demanda de helados?", "A heatwave arrives. What happens to the demand for ice cream?", "Arriba una onada de calor. Què li passa a la demanda de gelats?"),
    O(["Aumenta, y con ella tienden a subir el precio y la cantidad vendida", "Disminuye", "No cambia", "Desaparece la oferta"],
      ["It rises, and with it the price and quantity sold tend to go up", "It falls", "It does not change", "Supply disappears"],
      ["Augmenta, i amb ella tendeixen a pujar el preu i la quantitat venuda", "Disminueix", "No canvia", "Desapareix l'oferta"]),
    T("Los gustos y las circunstancias (aquí, el calor) cambian cuánto se quiere comprar a cada precio: la curva de demanda se desplaza a la derecha y el equilibrio sube.",
      "Tastes and circumstances (here, the heat) change how much people want at each price: the demand curve shifts right and the equilibrium rises.",
      "Els gustos i les circumstàncies (aquí, la calor) canvien quant es vol comprar a cada preu: la corba de demanda es desplaça a la dreta i l'equilibri puja.")),

  q('me-09', 'eso', '🥤',
    T("¿Qué son dos bienes sustitutivos?", "What are two substitute goods?", "Què són dos béns substitutius?"),
    O(["Productos que satisfacen la misma necesidad, de modo que se puede usar uno en lugar del otro", "Productos que se usan siempre juntos", "Productos que no se venden", "Productos gratuitos"],
      ["Products that meet the same need, so one can be used instead of the other", "Products always used together", "Products that are not sold", "Free products"],
      ["Productes que satisfan la mateixa necessitat, de manera que es pot fer servir l'un en lloc de l'altre", "Productes que es fan servir sempre junts", "Productes que no es venen", "Productes gratuïts"]),
    T("La mantequilla y la margarina, o el autobús y el metro, son sustitutivos: si uno sube de precio, aumenta la demanda del otro. Los complementarios (coche y gasolina) se consumen juntos.",
      "Butter and margarine, or the bus and the underground, are substitutes: if one gets dearer, demand for the other rises. Complements (car and petrol) are consumed together.",
      "La mantega i la margarina, o l'autobús i el metro, són substitutius: si un puja de preu, augmenta la demanda de l'altre. Els complementaris (cotxe i gasolina) es consumeixen junts.")),

  q('me-10', 'eso', '🏆',
    T("¿Qué es un monopolio?", "What is a monopoly?", "Què és un monopoli?"),
    O(["Un mercado con una sola empresa que vende el producto", "Un mercado con miles de pequeñas tiendas", "Un tipo de impuesto", "Un mercado sin compradores"],
      ["A market with only one firm selling the product", "A market with thousands of small shops", "A type of tax", "A market with no buyers"],
      ["Un mercat amb una sola empresa que ven el producte", "Un mercat amb milers de botigues petites", "Un tipus d'impost", "Un mercat sense compradors"]),
    T("Sin competidores, el monopolista puede fijar precios más altos y producir menos que en competencia. Por eso los Estados los vigilan con leyes de defensa de la competencia.",
      "With no competitors, a monopolist can set higher prices and produce less than under competition. That is why states watch them with competition laws.",
      "Sense competidors, el monopolista pot fixar preus més alts i produir menys que en competència. Per això els Estats els vigilen amb lleis de defensa de la competència.")),

  q('me-11', 'eso', '🛒',
    T("¿Qué beneficio suele tener la competencia entre muchas empresas para los consumidores?", "What benefit does competition between many firms usually bring consumers?", "Quin benefici sol tenir la competència entre moltes empreses per als consumidors?"),
    O(["Precios más bajos y más variedad y calidad", "Precios siempre más altos", "Menos opciones para elegir", "Productos gratis para siempre"],
      ["Lower prices and more choice and quality", "Always higher prices", "Fewer options to choose from", "Free products for ever"],
      ["Preus més baixos i més varietat i qualitat", "Preus sempre més alts", "Menys opcions per triar", "Productes gratis per sempre"]),
    T("Para atraer clientes, las empresas compiten bajando precios, mejorando el producto o innovando. Si una cobra demasiado, los clientes se van a otra.",
      "To attract customers, firms compete by cutting prices, improving the product or innovating. If one charges too much, customers go elsewhere.",
      "Per atreure clients, les empreses competeixen abaixant preus, millorant el producte o innovant. Si una cobra massa, els clients se'n van a una altra.")),

  q('me-12', 'eso', '⛽',
    T("Sube mucho el precio de la gasolina. ¿Qué es probable que pase con la demanda de coches que gastan mucho?", "Petrol prices rise sharply. What is likely to happen to demand for fuel-hungry cars?", "Puja molt el preu de la gasolina. Què és probable que passi amb la demanda de cotxes que gasten molt?"),
    O(["Que baje, porque son bienes complementarios de la gasolina", "Que suba mucho", "Que no cambie en absoluto", "Que se vuelvan gratis"],
      ["It falls, because they are complements to petrol", "It rises sharply", "It does not change at all", "They become free"],
      ["Que baixi, perquè són béns complementaris de la gasolina", "Que pugi molt", "Que no canviï gens", "Que es tornin gratis"]),
    T("Coche y gasolina se usan juntos. Si usar el coche sale más caro, menos gente quiere comprar coches que consumen mucho y aumenta el interés por los eficientes o eléctricos.",
      "Cars and petrol are used together. If running a car costs more, fewer people want to buy thirsty cars and interest in efficient or electric ones grows.",
      "Cotxe i gasolina es fan servir junts. Si fer servir el cotxe surt més car, menys gent vol comprar cotxes que consumeixen molt i augmenta l'interès pels eficients o elèctrics.")),

  q('me-13', 'eso', '💶',
    T("Si suben mucho los sueldos de la gente, ¿qué suele pasar con la demanda de la mayoría de productos?", "If people's wages rise a lot, what usually happens to demand for most products?", "Si pugen molt els sous de la gent, què sol passar amb la demanda de la majoria de productes?"),
    O(["Aumenta, porque la gente puede gastar más", "Disminuye siempre", "No cambia nunca", "Solo cambia la oferta"],
      ["It rises, because people can spend more", "It always falls", "It never changes", "Only supply changes"],
      ["Augmenta, perquè la gent pot gastar més", "Disminueix sempre", "No canvia mai", "Només canvia l'oferta"]),
    T("Con más renta se compra más de casi todo (bienes normales). Hay excepciones, los bienes inferiores, que se compran menos al tener más dinero: por ejemplo, las marcas más baratas.",
      "With more income people buy more of almost everything (normal goods). There are exceptions, inferior goods, bought less as people get richer: for instance, the cheapest brands.",
      "Amb més renda es compra més de gairebé tot (béns normals). Hi ha excepcions, els béns inferiors, que es compren menys en tenir més diners: per exemple, les marques més barates.")),

  q('me-14', 'eso', '🏭',
    T("Una nueva máquina abarata mucho la fabricación de móviles. ¿Qué le pasa a su oferta?", "A new machine makes phones much cheaper to manufacture. What happens to their supply?", "Una màquina nova abarateix molt la fabricació de mòbils. Què li passa a la seva oferta?"),
    O(["Aumenta: se ofrecen más móviles a cada precio, y el precio tiende a bajar", "Disminuye", "No cambia", "Aumenta y el precio sube"],
      ["It rises: more phones are offered at each price, and the price tends to fall", "It falls", "It does not change", "It rises and the price goes up"],
      ["Augmenta: s'ofereixen més mòbils a cada preu, i el preu tendeix a baixar", "Disminueix", "No canvia", "Augmenta i el preu puja"]),
    T("Los avances tecnológicos y el abaratamiento de materias primas desplazan la oferta a la derecha. Por eso muchos aparatos electrónicos cuestan hoy menos que cuando salieron.",
      "Technological advances and cheaper raw materials shift supply to the right. That is why many electronic devices cost less today than when they came out.",
      "Els avenços tecnològics i l'abaratiment de les matèries primeres desplacen l'oferta a la dreta. Per això molts aparells electrònics costen avui menys que quan van sortir.")),

  // ── Bachillerato ────────────────────────────────────────────────────────
  q('me-15', 'bachillerato', '💊',
    T("¿Por qué la demanda de un medicamento imprescindible es inelástica?", "Why is demand for an essential medicine inelastic?", "Per què la demanda d'un medicament imprescindible és inelàstica?"),
    O(["Porque aunque suba el precio, la cantidad comprada apenas cambia: no hay sustitutos y se necesita", "Porque se deja de comprar en cuanto sube", "Porque es un bien de lujo", "Porque su oferta es infinita"],
      ["Because even if the price rises, the quantity bought barely changes: there are no substitutes and it is needed", "Because people stop buying it as soon as it rises", "Because it is a luxury good", "Because its supply is infinite"],
      ["Perquè encara que pugi el preu, la quantitat comprada gairebé no canvia: no hi ha substituts i es necessita", "Perquè es deixa de comprar tan bon punt puja", "Perquè és un bé de luxe", "Perquè la seva oferta és infinita"]),
    T("La elasticidad-precio mide cuánto reacciona la cantidad demandada a un cambio de precio. Es baja (inelástica) en bienes necesarios y sin sustitutos, y alta en bienes con muchos sustitutos o prescindibles.",
      "Price elasticity measures how much quantity demanded reacts to a change in price. It is low (inelastic) for necessary goods without substitutes, and high for goods with many substitutes or that can be done without.",
      "L'elasticitat-preu mesura quant reacciona la quantitat demandada a un canvi de preu. És baixa (inelàstica) en béns necessaris i sense substituts, i alta en béns amb molts substituts o prescindibles.")),

  q('me-16', 'bachillerato', '🧮',
    T("Si el precio de un producto sube un 10 % y la cantidad demandada baja un 30 %, su demanda es…", "If a product's price rises 10% and quantity demanded falls 30%, its demand is…", "Si el preu d'un producte puja un 10 % i la quantitat demandada baixa un 30 %, la seva demanda és…"),
    O(["Elástica (elasticidad 3, mayor que 1)", "Inelástica", "Perfectamente rígida", "Imposible de calcular"],
      ["Elastic (elasticity of 3, greater than 1)", "Inelastic", "Perfectly rigid", "Impossible to calculate"],
      ["Elàstica (elasticitat 3, més gran que 1)", "Inelàstica", "Perfectament rígida", "Impossible de calcular"]),
    T("Elasticidad = variación % de la cantidad / variación % del precio = 30 / 10 = 3 (en valor absoluto). Mayor que 1: la cantidad reacciona más que proporcionalmente, así que subir el precio reduce los ingresos.",
      "Elasticity = % change in quantity / % change in price = 30 / 10 = 3 (in absolute value). Greater than 1: quantity reacts more than proportionally, so raising the price lowers revenue.",
      "Elasticitat = variació % de la quantitat / variació % del preu = 30 / 10 = 3 (en valor absolut). Més gran que 1: la quantitat reacciona més que proporcionalment, així que apujar el preu redueix els ingressos.")),

  q('me-17', 'bachillerato', '🏠',
    T("Si el Gobierno fija un precio máximo del alquiler por debajo del de equilibrio, ¿qué efecto previsible señala el modelo de oferta y demanda?", "If the government sets a maximum rent below equilibrium, what effect does the supply and demand model predict?", "Si el Govern fixa un preu màxim del lloguer per sota del d'equilibri, quin efecte previsible assenyala el model d'oferta i demanda?"),
    O(["Más pisos demandados que ofrecidos: escasez de oferta", "Un exceso de pisos vacíos en alquiler", "Que el precio de mercado suba por encima del máximo legal", "Ningún efecto sobre las cantidades"],
      ["More flats demanded than offered: a supply shortage", "A surplus of empty flats to rent", "The market price rising above the legal maximum", "No effect on quantities"],
      ["Més pisos demandats que oferts: escassetat d'oferta", "Un excés de pisos buits de lloguer", "Que el preu de mercat pugi per sobre del màxim legal", "Cap efecte sobre les quantitats"]),
    T("Un precio máximo por debajo del equilibrio abarata para quien encuentra piso, pero el modelo predice escasez: más gente busca y algunos propietarios retiran la oferta. El debate real incluye otros factores, pero ese es el efecto que describe el modelo.",
      "A price ceiling below equilibrium makes things cheaper for those who find a flat, but the model predicts a shortage: more people search and some landlords withdraw. The real debate includes other factors, but that is the effect the model describes.",
      "Un preu màxim per sota de l'equilibri abarateix per a qui troba pis, però el model prediu escassetat: més gent busca i alguns propietaris retiren l'oferta. El debat real inclou altres factors, però aquest és l'efecte que descriu el model.")),

  q('me-18', 'bachillerato', '🌾',
    T("¿Qué efecto tiene un precio mínimo por encima del de equilibrio, como un precio garantizado a un producto agrícola?", "What effect does a price floor above equilibrium have, such as a guaranteed price for a farm product?", "Quin efecte té un preu mínim per sobre del d'equilibri, com un preu garantit a un producte agrícola?"),
    O(["Un excedente: se produce más de lo que se compra a ese precio", "Una escasez del producto", "Que el precio baje", "Ninguno"],
      ["A surplus: more is produced than is bought at that price", "A shortage of the product", "The price falling", "None at all"],
      ["Un excedent: es produeix més del que es compra a aquest preu", "Una escassetat del producte", "Que el preu baixi", "Cap"]),
    T("Con un precio mínimo alto, los agricultores producen más y los consumidores compran menos. El excedente tiene que almacenarse, destruirse o comprarlo el Estado, como pasó con la antigua PAC europea.",
      "With a high price floor, farmers produce more and consumers buy less. The surplus has to be stored, destroyed or bought by the state, as happened with the old EU farm policy.",
      "Amb un preu mínim alt, els pagesos produeixen més i els consumidors compren menys. L'excedent s'ha d'emmagatzemar, destruir o comprar l'Estat, com va passar amb l'antiga PAC europea.")),

  q('me-19', 'bachillerato', '🏢',
    T("¿Qué caracteriza a un oligopolio?", "What characterises an oligopoly?", "Què caracteritza un oligopoli?"),
    O(["Pocas empresas grandes dominan el mercado y cada una tiene en cuenta lo que hacen las demás", "Una sola empresa vende todo", "Infinitas empresas pequeñas e idénticas", "No hay vendedores"],
      ["A few large firms dominate the market and each takes the others' actions into account", "A single firm sells everything", "Countless small, identical firms", "There are no sellers"],
      ["Poques empreses grans dominen el mercat i cadascuna té en compte el que fan les altres", "Una sola empresa ho ven tot", "Infinites empreses petites i idèntiques", "No hi ha venedors"]),
    T("Telefonía, energía o aerolíneas suelen ser oligopolios. Existe el riesgo de que se pongan de acuerdo en precios (cártel), algo prohibido por las autoridades de competencia.",
      "Telecoms, energy or airlines are often oligopolies. There is a risk that they agree on prices (a cartel), something banned by competition authorities.",
      "La telefonia, l'energia o les aerolínies solen ser oligopolis. Hi ha el risc que es posin d'acord en preus (càrtel), cosa prohibida per les autoritats de competència.")),

  q('me-20', 'bachillerato', '🏭',
    T("¿Qué es una externalidad negativa?", "What is a negative externality?", "Què és una externalitat negativa?"),
    O(["Un coste que una actividad impone a terceros sin pagarlo, como la contaminación de una fábrica", "Un beneficio que recibe el comprador", "Un impuesto sobre la renta", "El precio de equilibrio"],
      ["A cost an activity imposes on third parties without paying for it, such as a factory's pollution", "A benefit the buyer receives", "An income tax", "The equilibrium price"],
      ["Un cost que una activitat imposa a tercers sense pagar-lo, com la contaminació d'una fàbrica", "Un benefici que rep el comprador", "Un impost sobre la renda", "El preu d'equilibri"]),
    T("Si la fábrica no paga el daño que causa, su producto sale «demasiado barato» y se produce más de lo socialmente deseable. Es un fallo de mercado; se corrige con impuestos, normas o derechos de emisión.",
      "If the factory does not pay for the harm it causes, its product is 'too cheap' and more is produced than is socially desirable. It is a market failure; it is corrected with taxes, rules or emission permits.",
      "Si la fàbrica no paga el dany que causa, el seu producte surt «massa barat» i es produeix més del que és socialment desitjable. És una fallada de mercat; es corregeix amb impostos, normes o drets d'emissió.")),

  q('me-21', 'bachillerato', '💡',
    T("¿Por qué el alumbrado público es un bien público que el mercado difícilmente ofrece solo?", "Why is street lighting a public good that the market hardly provides on its own?", "Per què l'enllumenat públic és un bé públic que el mercat difícilment ofereix sol?"),
    O(["Porque no se puede impedir que lo use quien no paga y su uso por uno no lo gasta para otros", "Porque es muy barato de producir", "Porque nadie lo necesita", "Porque solo lo usan las empresas"],
      ["Because non-payers cannot be kept from using it and one person's use does not use it up for others", "Because it is very cheap to produce", "Because nobody needs it", "Because only businesses use it"],
      ["Perquè no es pot impedir que el faci servir qui no paga i l'ús d'un no el gasta per als altres", "Perquè és molt barat de produir", "Perquè ningú el necessita", "Perquè només el fan servir les empreses"]),
    T("Los bienes públicos son no excluyentes y no rivales. Como cada uno puede beneficiarse sin pagar (el «gorrón»), ninguna empresa podría cobrarlo bien: por eso suelen financiarse con impuestos.",
      "Public goods are non-excludable and non-rival. As everyone can benefit without paying (the 'free rider'), no firm could charge for them properly: that is why they are usually funded by taxes.",
      "Els béns públics són no excloents i no rivals. Com que cadascú se'n pot beneficiar sense pagar (el «gorrer»), cap empresa no el podria cobrar bé: per això se solen finançar amb impostos.")),

  q('me-22', 'bachillerato', '🔍',
    T("¿Qué es la información asimétrica en un mercado?", "What is asymmetric information in a market?", "Què és la informació asimètrica en un mercat?"),
    O(["Que una parte sabe mucho más que la otra, como el vendedor de un coche usado sobre sus averías", "Que los precios son iguales en todas partes", "Que no hay publicidad", "Que el producto es gratuito"],
      ["One side knows far more than the other, like the seller of a used car about its faults", "Prices are the same everywhere", "There is no advertising", "The product is free"],
      ["Que una part sap molt més que l'altra, com el venedor d'un cotxe de segona mà sobre les avaries", "Que els preus són iguals a tot arreu", "Que no hi ha publicitat", "Que el producte és gratuït"]),
    T("Cuando el comprador no puede distinguir lo bueno de lo malo, desconfía y ofrece poco, y los buenos vendedores se retiran. Las garantías, las inspecciones y las reseñas intentan corregirlo.",
      "When the buyer cannot tell good from bad, they distrust and offer little, and good sellers withdraw. Warranties, inspections and reviews try to fix this.",
      "Quan el comprador no pot distingir el bo del dolent, desconfia i ofereix poc, i els bons venedors es retiren. Les garanties, les inspeccions i les ressenyes intenten corregir-ho.")),

  q('me-23', 'bachillerato', '🧾',
    T("Un impuesto por cada unidad vendida de tabaco, ¿cómo afecta al mercado?", "How does a tax on each unit of tobacco sold affect the market?", "Un impost per cada unitat venuda de tabac, com afecta el mercat?"),
    O(["Encarece el producto y reduce la cantidad vendida, aunque poco si la demanda es inelástica", "Lo abarata", "Aumenta mucho la cantidad vendida", "No afecta ni al precio ni a la cantidad"],
      ["It makes the product dearer and reduces the quantity sold, though only slightly if demand is inelastic", "It makes it cheaper", "It greatly increases the quantity sold", "It affects neither price nor quantity"],
      ["Encareix el producte i redueix la quantitat venuda, encara que poc si la demanda és inelàstica", "L'abarateix", "Augmenta molt la quantitat venuda", "No afecta ni el preu ni la quantitat"]),
    T("El impuesto actúa como un coste más para el vendedor. Con demanda inelástica (como la del tabaco), la cantidad baja poco y casi todo el impuesto lo acaba pagando el consumidor.",
      "The tax acts as an extra cost for the seller. With inelastic demand (like tobacco), quantity falls only a little and consumers end up paying most of the tax.",
      "L'impost actua com un cost més per al venedor. Amb demanda inelàstica (com la del tabac), la quantitat baixa poc i gairebé tot l'impost l'acaba pagant el consumidor.")),

  q('me-24', 'bachillerato', '✋',
    T("¿A qué se refería Adam Smith con la «mano invisible»?", "What did Adam Smith mean by the 'invisible hand'?", "A què es referia Adam Smith amb la «mà invisible»?"),
    O(["A que, al buscar cada uno su propio interés en el mercado, se acaba favoreciendo sin quererlo el interés general", "A un Gobierno que fija todos los precios en secreto", "A la corrupción de los mercados", "A los impuestos ocultos"],
      ["That by pursuing their own interest in the market, each person ends up unintentionally serving the general interest", "A government secretly setting all prices", "Market corruption", "Hidden taxes"],
      ["Que, en buscar cadascú el seu propi interès al mercat, s'acaba afavorint sense voler-ho l'interès general", "Un Govern que fixa tots els preus en secret", "La corrupció dels mercats", "Els impostos ocults"]),
    T("En «La riqueza de las naciones» (1776), Smith explicó cómo los precios coordinan a millones de personas sin un plan central. La economía moderna añade que esa coordinación falla en casos como los monopolios o las externalidades.",
      "In 'The Wealth of Nations' (1776), Smith explained how prices coordinate millions of people without a central plan. Modern economics adds that this coordination fails in cases such as monopolies or externalities.",
      "A «La riquesa de les nacions» (1776), Smith va explicar com els preus coordinen milions de persones sense un pla central. L'economia moderna hi afegeix que aquesta coordinació falla en casos com els monopolis o les externalitats.")),
]

// Convención de src/data: el nivel bajo se filtra y el alto usa el banco
// ENTERO (ver memoria «bancos-examen»).
export const PREGUNTAS_ESO = PREGUNTAS.filter(p => p.nivel === 'eso')
export const PREGUNTAS_BACHILLERATO = PREGUNTAS
