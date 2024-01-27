import ReactMapGL, {
  GeolocateEvent,
  ViewStateChangeEvent,
  GeolocateControl,
  Marker,
  NavigationControl,
  ViewState,
  MapRef as ReactMapGLRef,
  MarkerDragEvent,
} from "react-map-gl";
import Box from "@mui/material/Box";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import Geocoder from "./Geocoder";

interface AddLocationProps {
  onSelectLocation: (location: { longitude: number; latitude: number }) => void;
}

const mapbox: string = import.meta.env.VITE_MAP_BOX_ACCESS_TOKEN as string;

const AddLocation: React.FC<AddLocationProps> = ({ onSelectLocation }) => {
  const [viewport, setViewport] = useState({
    latitude: 10.1632,
    longitude: 76.6413,
    zoom: 10,
  });

  const mapRef = useRef<ReactMapGLRef>(null);

  const handleGeolocate = (e: GeolocateEvent) => {
    if ("coords" in e) {
      const coords = e.coords as GeolocationCoordinates;

      if (coords) {
        setViewport({
          latitude: coords.latitude,
          longitude: coords.longitude,
          zoom: 10,
        });
      }
    }
  };

  const handleAnotherMove = (e: ViewStateChangeEvent) => {
    const newViewport: ViewState = e.viewState;
    setViewport(newViewport);
  };

  const handleMarkerDragEnd = (event: MarkerDragEvent) => {
    setViewport({
      ...viewport,
      latitude: event.lngLat.lat,
      longitude: event.lngLat.lng,
    });
    console.log("Updated Latitude:", viewport.latitude);
    console.log("Updated Longitude:", viewport.longitude);
  };

  const handleLocationSelect = () => {
    // You may have your logic to get the selected location here
    // For example, if you have a map library, get the selected location from the map.

    // Once you have the selected location, call the onSelectLocation prop
    onSelectLocation(viewport);
  };

  return (
    <>
      <Box sx={{ height: 400, position: "relative" }}>
        <ReactMapGL
          initialViewState={viewport}
          onMove={handleAnotherMove}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={mapbox}
          ref={mapRef}
          style={{ width: "100%", height: "100%" }}
          scrollZoom
          dragPan
          dragRotate
          doubleClickZoom
          touchZoomRotate
        >
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation
            onGeolocate={handleGeolocate}
          />

          <Marker
            latitude={viewport.latitude}
            longitude={viewport.longitude}
            offset={[-20, -10]}
            draggable
            onDragEnd={handleMarkerDragEnd}
          >
            <HiLocationMarker className="w-10 h-10" />
          </Marker>

          <NavigationControl position="bottom-right" />
          <Geocoder setViewport={setViewport} />
        </ReactMapGL>
      </Box>
      <div className="flex items-center justify-between bg-white p-4">
        <button
          onClick={handleLocationSelect}
          className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Select Location
        </button>
      </div>
    </>
  );
};

export default AddLocation;
