import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";

const MapDisplay = ({ center }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["geometry", "drawing", "places"],
  });



  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  return (
    <div className="relative">
      {isLoaded && (
        <div className="h-full">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
          ></GoogleMap>
        </div>
      )}
    </div>
  );
};

export default MapDisplay;
