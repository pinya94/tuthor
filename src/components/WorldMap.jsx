import { memo } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import { A3_TO_NUM } from '../data/isoNumerico'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'


export const REGION_VIEW = {
  europa:  { center: [15, 50],  zoom: 3.5 },
  asia:    { center: [85, 30],  zoom: 2.2 },
}

const CONTINENT_VIEW = {
  'Europa':        { center: [15, 52],   zoom: 2.5 },
  'Europa/Asia':   { center: [45, 48],   zoom: 1.6 },
  'Asia':          { center: [85, 28],   zoom: 1.6 },
  'África':        { center: [20, 3],    zoom: 1.7 },
  'América_norte': { center: [-95, 35],  zoom: 2 },
  'América_sur':   { center: [-60, -18], zoom: 2 },
  'América':       { center: [-75, 5],   zoom: 1.3 },
  'Oceanía':       { center: [145, -28], zoom: 2.2 },
}

function getContView(continent, hemisferio) {
  if (continent === 'América') {
    if (hemisferio === 'sur') return CONTINENT_VIEW['América_sur']
    if (hemisferio === 'norte') return CONTINENT_VIEW['América_norte']
    return CONTINENT_VIEW['América']
  }
  return CONTINENT_VIEW[continent] || null
}

function WorldMap({ highlight, highlightColor = '#EDAE49', baseColor = '#c8ced8', borderColor = '#9ca3af', className = '', region, continent, hemisferio }) {
  const numId = highlight ? A3_TO_NUM[highlight] : null
  const view = region ? REGION_VIEW[region] : continent ? getContView(continent, hemisferio) : null

  const rotate = view ? [-(view.center[0]), 0, 0] : [-10, 0, 0]

  return (
    <div className={`w-full aspect-[2/1] ${className}`}>
      <ComposableMap
        projectionConfig={{ rotate, scale: 147 }}
        width={800}
        height={400}
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup center={view?.center || [0, 20]} zoom={view?.zoom || 1} minZoom={view?.zoom || 1} maxZoom={view?.zoom || 1} filterZoomEvent={() => false} onMoveStart={() => {}} onMoveEnd={() => {}}>
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
                      hover: { outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}

export default memo(WorldMap)
