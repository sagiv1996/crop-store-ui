import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import CropDetails from "./CropDetails";

const MapDisplay = ({ center, cropStores }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["geometry", "drawing", "places"],
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState();

  const handleClickMarker = (markerId) => {
    setSelectedMarkerId(markerId);
    setIsOpen(true);
  };

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const [markers, setMarkers] = useState();
  useEffect(() => {
    if (isLoaded && cropStores) {
      setMarkers(cropStores);
    }
  }, [isLoaded, cropStores]);

  return (
    <div className="relative">
      {selectedMarkerId && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <CropDetails details={selectedMarkerId} id={selectedMarkerId} />

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </Dialog>
      )}

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
