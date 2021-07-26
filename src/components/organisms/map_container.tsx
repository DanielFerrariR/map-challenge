import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { ensure } from 'src/utils'
import { Box } from 'src/components/atoms'
import { useSelector } from 'src/store'
import { MapSearchInput } from 'src/components/molecules'

type Location =
  | {
      status: 'ready'
      location: GeolocationPosition
    }
  | { status: 'idle' | 'notSupported' }

const libraries: (
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'places'
  | 'visualization'
)[] = ['places']

const MapContainer = () => {
  const [location, setLocation] = React.useState<Location>({ status: 'idle' })
  const [, setMap] = React.useState(null)
  const places = useSelector((state) => state.places)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: ensure(process.env.GOOGLE_MAPS_API_KEY),
    libraries
  })

  const onLoad = React.useCallback((newMap) => {
    const bounds = new window.google.maps.LatLngBounds()
    newMap.fitBounds(bounds)
    setMap(newMap)
  }, [])

  const onUnmount = React.useCallback(() => {
    setMap(null)
  }, [])

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({ location: position, status: 'ready' })
      })
    } else {
      setLocation({ status: 'notSupported' })
    }
  }, [])

  return isLoaded ? (
    <Box position="relative" display="flex" justifyContent="center" height={1}>
      <GoogleMap
        center={
          location.status === 'ready'
            ? {
                lat: location.location.coords.latitude,
                lng: location.location.coords.longitude
              }
            : undefined
        }
        mapContainerStyle={{
          width: '100%',
          height: '100%'
        }}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {location.status === 'ready' && (
          <Marker
            label="My Location"
            position={{
              lat: location.location.coords.latitude,
              lng: location.location.coords.longitude
            }}
          />
        )}
        {places.map((place) => (
          <Marker
            key={place.id}
            label={place.name}
            position={{
              lat: place.latlng[0],
              lng: place.latlng[1]
            }}
          />
        ))}
      </GoogleMap>
      <Box position="absolute" top="76px" width={1} px={2} maxWidth={400}>
        <MapSearchInput />
      </Box>
    </Box>
  ) : (
    <></>
  )
}

export default React.memo(MapContainer)
