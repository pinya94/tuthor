import { memo } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

// US States TopoJSON with name property
const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

// FIPS numeric id → state name (us-atlas states-10m.json doesn't include names in properties)
const FIPS_TO_NAME = {
  '01':'Alabama','02':'Alaska','04':'Arizona','05':'Arkansas','06':'California',
  '08':'Colorado','09':'Connecticut','10':'Delaware','12':'Florida','13':'Georgia',
  '15':'Hawaii','16':'Idaho','17':'Illinois','18':'Indiana','19':'Iowa',
  '20':'Kansas','21':'Kentucky','22':'Louisiana','23':'Maine','24':'Maryland',
  '25':'Massachusetts','26':'Michigan','27':'Minnesota','28':'Mississippi','29':'Missouri',
  '30':'Montana','31':'Nebraska','32':'Nevada','33':'New Hampshire','34':'New Jersey',
  '35':'New Mexico','36':'New York','37':'North Carolina','38':'North Dakota','39':'Ohio',
  '40':'Oklahoma','41':'Oregon','42':'Pennsylvania','44':'Rhode Island','45':'South Carolina',
  '46':'South Dakota','47':'Tennessee','48':'Texas','49':'Utah','50':'Vermont',
  '51':'Virginia','53':'Washington','54':'West Virginia','55':'Wisconsin','56':'Wyoming',
}

export default memo(function USAMap({ highlight }) {
  return (
    <ComposableMap
      projection="geoAlbersUsa"
      projectionConfig={{ scale: 1000 }}
      style={{ width: '100%', height: 'auto' }}
      viewBox="0 0 960 600"
    >
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map(geo => {
            const fips = String(geo.id).padStart(2, '0')
            const name = FIPS_TO_NAME[fips] || ''
            const isHighlighted = highlight && name === highlight
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={isHighlighted ? '#EDAE49' : '#1e3a4a'}
                stroke="#0d1117"
                strokeWidth={0.8}
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
