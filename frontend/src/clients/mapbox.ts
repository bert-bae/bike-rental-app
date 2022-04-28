import geoClient from "@mapbox/mapbox-sdk/services/geocoding";

export const geocodeClient = geoClient({
  accessToken: process.env.REACT_APP_MAPBOX_PK,
});
