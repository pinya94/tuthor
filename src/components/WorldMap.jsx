import { memo } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// ISO 3166-1 alpha-3 → numeric (used by world-atlas topojson)
const A3_TO_NUM = {
  AFG:'004',DZA:'012',AGO:'024',ARG:'032',AUS:'036',AUT:'040',BGD:'050',BEL:'056',
  BOL:'068',BIH:'070',BWA:'072',BRA:'076',BRN:'096',BGR:'100',BFA:'854',BDI:'108',
  KHM:'116',CMR:'120',CAN:'124',CAF:'140',TCD:'148',CHL:'152',CHN:'156',COL:'170',
  COG:'178',COD:'180',CRI:'188',CIV:'384',HRV:'191',CUB:'192',CYP:'196',CZE:'203',
  DNK:'208',DOM:'214',ECU:'218',EGY:'818',SLV:'222',GNQ:'226',ERI:'232',EST:'233',
  ETH:'231',FIN:'246',FRA:'250',GAB:'266',GMB:'270',GEO:'268',DEU:'276',GHA:'288',
  GRC:'300',GTM:'320',GIN:'324',GNB:'624',GUY:'328',HTI:'332',HND:'340',HUN:'348',
  ISL:'352',IND:'356',IDN:'360',IRN:'364',IRQ:'368',IRL:'372',ISR:'376',ITA:'380',
  JAM:'388',JPN:'392',JOR:'400',KAZ:'398',KEN:'404',KWT:'414',KGZ:'417',LAO:'418',
  LVA:'428',LBN:'422',LSO:'426',LBR:'430',LBY:'434',LIE:'438',LTU:'440',LUX:'442',
  MDG:'450',MWI:'454',MYS:'458',MLI:'466',MLT:'470',MRT:'478',MEX:'484',MDA:'498',
  MCO:'492',MNG:'496',MNE:'499',MAR:'504',MOZ:'508',MMR:'104',NAM:'516',NPL:'524',
  NLD:'528',NZL:'554',NIC:'558',NER:'562',NGA:'566',PRK:'408',MKD:'807',NOR:'578',
  OMN:'512',PAK:'586',PAN:'591',PNG:'598',PRY:'600',PER:'604',PHL:'608',POL:'616',
  PRT:'620',QAT:'634',ROU:'642',RUS:'643',RWA:'646',SAU:'682',SEN:'686',SRB:'688',
  SLE:'694',SVK:'703',SVN:'705',SOM:'706',ZAF:'710',KOR:'410',SSD:'728',ESP:'724',
  LKA:'144',SDN:'729',SUR:'740',SWZ:'748',SWE:'752',CHE:'756',SYR:'760',TWN:'158',
  TJK:'762',TZA:'834',THA:'764',TGO:'768',TTO:'780',TUN:'788',TUR:'792',TKM:'795',
  UGA:'800',UKR:'804',ARE:'784',GBR:'826',USA:'840',URY:'858',UZB:'860',VEN:'862',
  VNM:'704',YEM:'887',ZMB:'894',ZWE:'716',AND:'020',SMR:'674',BLR:'112',ALB:'008',
  AZE:'031',ARM:'051',BHS:'044',BLZ:'084',BTN:'064',DJI:'262',
}

export const REGION_VIEW = {
  europa:  { center: [15, 50],  zoom: 3.5 },
  asia:    { center: [85, 30],  zoom: 2.2 },
}

function WorldMap({ highlight, highlightColor = '#EDAE49', baseColor = '#2d3748', borderColor = '#4a5568', className = '', region }) {
  const numId = highlight ? A3_TO_NUM[highlight] : null
  const view = region ? REGION_VIEW[region] : null

  const rotate = view ? [-(view.center[0]), 0, 0] : [-10, 0, 0]

  return (
    <div className={`w-full aspect-[2/1] ${className}`}>
      <ComposableMap
        projectionConfig={{ rotate, scale: 147 }}
        width={800}
        height={400}
        style={{ width: '100%', height: '100%' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map(geo => {
              const isHighlighted = numId ? geo.id === numId : false
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isHighlighted ? highlightColor : baseColor}
                  stroke={borderColor}
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none', fill: isHighlighted ? highlightColor : '#3d4a5c' },
                    pressed: { outline: 'none' },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  )
}

export default memo(WorldMap)
