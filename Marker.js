import React from 'react';
import { Marker } from 'react-native-maps';
import MarkerSvg from './MarkerSvg';

export function getRandomCoords ({
    boundaries
}) {

    return {
        lat: Math.random() * (boundaries.northEast.latitude - boundaries.southWest.latitude) + boundaries.southWest.latitude, 
        lng: Math.random() * (boundaries.northEast.longitude - boundaries.southWest.longitude) + boundaries.southWest.longitude
    }
  
}

function MarkerComponent ({
    coords,
}) {

    let { lat, lng } = coords;

    return <Marker
        coordinate={{ 
            latitude: parseFloat(lat),
            longitude: parseFloat(lng)
        }}
    >
        <MarkerSvg width={15} height={15} />
    </Marker>

}

export default React.memo(MarkerComponent);