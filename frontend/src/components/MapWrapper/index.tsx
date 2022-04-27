import React from "react";
import Map, { Marker, GeolocateControl } from "react-map-gl";
import * as mapboxgl from "mapbox-gl";
import { Box } from "@mui/material";
// import Geocoder from "react-map-gl-geocoder";
// import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
/* eslint import/no-webpack-loader-syntax: off */
(mapboxgl as any).workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

export type MapMarkerType = {
  meta: Record<string, any>;
  lat: number;
  lng: number;
};

type MapWrapperProps = {
  markers?: MapMarkerType[];
  onLocationChange?: (lat: number, lng: number) => void;
};

const MapWrapper: React.FC<MapWrapperProps> = ({
  markers,
  onLocationChange,
}) => {
  const [viewState, setViewState] = React.useState({
    latitude: 49.24589,
    longitude: -123.003309,
    zoom: 10,
  });
  const mapRef = React.useRef();

  React.useEffect(() => {
    onLocationChange &&
      onLocationChange(viewState.latitude, viewState.longitude);
  }, [viewState, onLocationChange]);

  return (
    <Box position="relative">
      <Map
        ref={mapRef.current}
        {...viewState}
        maxZoom={14}
        minZoom={8}
        style={{ width: "100%", height: "450px" }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_PK}
        onMove={(evt: any) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        attributionControl={false}
      >
        {/* <Geocoder
          mapRef={mapRef.current}
          onViewportChange={(e: any) => console.log(e)}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_PK}
          position="top-right"
        /> */}
        <GeolocateControl />
        {markers &&
          markers.map((marker) => (
            <Marker
              key={marker.meta.id}
              color="#FF4500"
              scale={0.5}
              latitude={marker.lat}
              longitude={marker.lng}
              onClick={() => console.log("clicked")}
            />
          ))}
        {/* {locations && <Source type="geojson" data={[]}></Source>} */}
      </Map>
    </Box>
  );
};

export default React.memo(MapWrapper);
