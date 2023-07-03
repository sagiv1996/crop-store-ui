import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";

const MapDisplay = ({ center, cropStores }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["geometry", "drawing", "places"],
  });

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const [markers, setMarkers] = useState();
  useEffect(() => {
    console.log({ cropStores });
    if (isLoaded && cropStores) {
      setMarkers(cropStores);
    }
  }, [isLoaded, cropStores]);

  return (
    <div className="relative">
      {isLoaded && cropStores && (
        <div className="h-full">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
          >
            {markers?.map((marker, index) => (
              <Marker
                onClick={() => handleClickMarker(marker.id)}
                position={marker.attributes.location}
                label={marker.attributes.name}
                key={index}
              ></Marker>
            ))}
          </GoogleMap>
        </div>
      )}
    </div>
  );
};

export default MapDisplay;
