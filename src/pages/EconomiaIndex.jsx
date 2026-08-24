import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'

export default function EconomiaIndex() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const ca = lang === 'ca', en = lang === 'en'

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <div className="text-center mb-6">
        <p className="text-white/40 text-sm mb-1">
          {ca ? 'Estudiar · Economia' : en ? 'Study · Economics' : 'Estudiar · Economía'}
        </p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {ca ? 'Tria un tema' : en ? 'Pick a topic' : 'Elige un tema'}
        </h1>
        <p className="text-white/40 mt-1 text-sm">
          {ca ? 'Finances personals per a tots els nivells' : en ? 'Personal finance for all levels' : 'Finanzas personales para todos los niveles'}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto w-full">
        <button
          onClick={() => navigate(localPath('/info/estudiar/finanzas-personales'))}
          className="group relative rounded-2xl overflow-hidden text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-black/40 cursor-pointer"
        >
          <div className="bg-gradient-to-br from-amber-500 to-red-700 p-5 aspect-square flex flex-col justify-between">
            <span className="text-4xl">💰</span>
            <div>
              <h3 className="font-black text-white text-base leading-tight">
                {ca ? 'Finances Personals' : en ? 'Personal Finance' : 'Finanzas Personales'}
              </h3>
              <p className="text-white/65 text-xs mt-1 leading-relaxed line-clamp-2">
                {ca ? 'Inflació, interès compost, deute i senyals d\'estafa' : en ? 'Inflation, compound interest, debt and scam signals' : 'Inflación, interés compuesto, deuda y señales de estafa'}
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => navigate(localPath('/examen/punto-equilibrio'))}
          className="group relative rounded-2xl overflow-hidden text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-black/40 cursor-pointer"
        >
          <div className="bg-gradient-to-br from-emerald-500 to-teal-700 p-5 aspect-square flex flex-col justify-between">
            <span className="text-4xl">🏭</span>
            <div>
              <h3 className="font-black text-white text-base leading-tight">
                {ca ? 'Punt d\'Equilibri' : en ? 'Break-Even Point' : 'Punto de Equilibrio'}
              </h3>
              <p className="text-white/65 text-xs mt-1 leading-relaxed line-clamp-2">
                {ca ? 'Calcula el llindar de rendibilitat: CF, preu i cost variable' : en ? 'Work out the break-even threshold: fixed costs, price and variable cost' : 'Calcula el umbral de rentabilidad: costes fijos, precio y coste variable'}
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
