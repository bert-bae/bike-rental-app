import React from "react";
import Map, { Marker, GeolocateControl } from "react-map-gl";
import * as mapboxgl from "mapbox-gl";
import { Box } from "@mui/material";
import GeoSearch from "../GeoSearch";
/* eslint import/no-webpack-loader-syntax: off */
(mapboxgl as any).workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

export type MapMarkerType = {
  meta: Record<string, any>;
  lat: number;
  lng: number;
};

type MapWrapperProps = {
  lat: number;
  lng: number;
  markers?: MapMarkerType[];
  onLocationChange?: (lat: number, lng: number) => void;
};

const MapWrapper: React.FC<MapWrapperProps> = ({
  lat,
  lng,
  markers,
  onLocationChange,
}) => {
  const [viewState, setViewState] = React.useState({
    latitude: lat, //49.24589,
    longitude: lng, //-123.003309,
    zoom: 10,
  });
  const mapRef = React.useRef();

  const handleSearchSelect = (input: { lat: number; lng: number }) => {
    setViewState((prev) => ({
      ...prev,
      latitude: input.lat,
      longitude: input.lng,
    }));
  };

  React.useEffect(() => {
    onLocationChange &&
      onLocationChange(viewState.latitude, viewState.longitude);
  }, [viewState, onLocationChange]);

  React.useEffect(() => {
    setViewState((prev) => ({ ...prev, latitude: lat, longitude: lng }));
  }, [lat, lng]);

  return (
    <Box position="relative">
      <Box
        position="absolute"
        top="8px"
        right="50px"
        zIndex="1000"
        style={{ backgroundColor: "#FFF" }}
      >
        <GeoSearch placeholder="Search" onSelect={handleSearchSelect} />
      </Box>
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
      </Map>
    </Box>
  );
};

export default React.memo(MapWrapper);
