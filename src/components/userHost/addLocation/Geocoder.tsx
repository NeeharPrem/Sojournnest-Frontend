import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

interface geoCoder {
  setViewport: React.Dispatch<React.SetStateAction<{
    latitude: number;
    longitude: number;
    zoom: number;
  }>>;
}

const Geocoder = ({ setViewport }: geoCoder) => {
 
  const ctrl = new MapboxGeocoder({
      accessToken: import.meta.env.VITE_MAP_BOX_ACCESS_TOKEN,
      marker:false,
      collapsed:true
    })

  useControl(() => ctrl)
  ctrl.on('result', (e) => {
    const coords = e.result.geometry.coordinates
    setViewport({
      latitude: coords[1],
      longitude: coords[0],
      zoom: 8
    })
  })

  return (
    null
  )
}

export default Geocoder