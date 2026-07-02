import { memo } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

const GEO_URL = 'https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/spain-communities.geojson'

// When an island community is active, zoom to it instead of the peninsula
const ISLAND_CONFIG = {
  Canarias: { center: [-15.5, 28.2], scale: 3200 },
  Baleares: { center: [2.8,  39.5],  scale: 8000 },
}

export default memo(function SpainMap({ highlight }) {
  const island = ISLAND_CONFIG[highlight]
  const projConfig = island
    ? { center: island.center, scale: island.scale }
    : { center: [-3.5, 40], scale: 2400 }

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={projConfig}
      style={{ width: '100%', height: 'auto' }}
      viewBox="0 0 800 520"
    >
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map(geo => {
            const name = geo.properties?.name || geo.properties?.NAME || ''
            const isHighlighted = highlight && name === highlight
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={isHighlighted ? '#EDAE49' : '#1e3a4a'}
                stroke="#0d1117"
                strokeWidth={1.2}
                style={{
                  default: { outline: 'none' },
                  hover:   { outline: 'none' },
                  pressed: { outline: 'none' },
                }}
              />
            )
          })
        }
      </Geographies>
    </ComposableMap>
  )
})
