import { useLang } from '../context/LangContext'
import SEOEstatico from '../components/SEOEstatico'
import { ArteMateria } from '../components/arte/materias'
import TarjetaArte from '../components/TarjetaArte'
import { ARTE_TEMAS } from '../components/arte/temas'

export default function EconomiaIndex() {  const { lang, localPath, tr } = useLang()
  const ca = lang === 'ca', en = lang === 'en'

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <SEOEstatico path="/estudiar/economia" />
      <div className="text-center mb-6">
        <ArteMateria id="economia" />
        <p className="text-white/40 text-sm mb-1">
          {ca ? 'Estudiar · Economia' : en ? 'Study · Economics' : 'Estudiar · Economía'}
        </p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {ca ? 'Tria un tema' : en ? 'Pick a topic' : 'Elige un tema'}
        </h1>
        <p className="text-white/40 mt-1 text-sm">
          {ca ? 'Finances personals, el mercat i l\'empresa' : en ? 'Personal finance, markets and business' : 'Finanzas personales, el mercado y la empresa'}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto w-full">
        <TarjetaArte Arte={ARTE_TEMAS['economia/finanzas-personales']}
          titulo={tr({ es: 'Finanzas Personales', en: 'Personal Finance', ca: 'Finances Personals' })}
          sub={tr({ es: 'Inflación, interés compuesto, deuda y señales de estafa', en: 'Inflation, compound interest, debt and scam signals', ca: 'Inflació, interès compost, deute i senyals d\'estafa' })}
          to={localPath('/info/estudiar/finanzas-personales')} />
        <TarjetaArte Arte={ARTE_TEMAS['economia/punto-equilibrio']}
          titulo={tr({ es: 'Punto de Equilibrio', en: 'Break-Even Point', ca: 'Punt d\'Equilibri' })}
          sub={tr({ es: 'Calcula el umbral de rentabilidad: costes fijos, precio y coste variable', en: 'Work out the break-even threshold: fixed costs, price and variable cost', ca: 'Calcula el llindar de rendibilitat: CF, preu i cost variable' })}
          to={localPath('/examen/punto-equilibrio')} />
        <TarjetaArte Arte={ARTE_TEMAS['economia/mercado']}
          titulo={tr({ es: 'El Mercado', en: 'The Market', ca: 'El Mercat' })}
          sub={tr({ es: 'Oferta, demanda y precio: por qué suben y bajan las cosas', en: 'Supply, demand and price: why things get dearer or cheaper', ca: 'Oferta, demanda i preu: per què les coses pugen i baixen' })}
          to={localPath('/examen/mercado')} />
      </div>
    </div>
  )
}
