import React from 'react'
import GoogleMapReact from 'google-map-react'
import {LocationOn} from '@mui/icons-material'

import './map.css'
import { 
  Box, 
  useTheme, 
} from '@mui/material'


// export interface Location {
//   address: string;
//   lat: number;
//   lng: number;
// }
// const greatPlaceStyle = {
//   position: 'absolute',
//   transform: 'translate(-50%, -50%)'
// } className="google-map"

const LocationPin = ({ text }) => (
  <Box className="pin">
    <LocationOn size='small' color='error' />
    <p className="pin-text">{text}</p>
  </Box>
)

const Map = ({ location, zoomLevel }) => {
  const theme = useTheme();
  return(
  <Box sx={{height:330, minWidth:{xs:450,sm:500,md:420,lg:430,xl:430}, backgroundColor:theme.palette.background.paper, borderRadius:2, boxShadow:4}}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyC6RmZh2dXa0WVjRHz2QpneKF16UlYQGis' }}
      defaultCenter={location}
      defaultZoom={zoomLevel}
      disableDefaultUI={true}
      options={{
        mapTypeControl: false,
        // mapTypeId: 'satellite',
        mapTypeId: 'terrain',
        // mapTypeId: 'hybrid',
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: false,
        disableDefaultUI: false,
        draggable: false,
        navigationControl: false,
        keyboardShortcuts: false,
      }}
      mapElement={<div style={{ height: `250` }} />}
    >
      <LocationPin
        lat={location.lat}
        lng={location.lng}
        text={location.address}
      />
    </GoogleMapReact>
  </Box>
  )
  }
export default Map