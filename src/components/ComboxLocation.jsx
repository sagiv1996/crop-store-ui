import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import React, { useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";

const ComboboxLocation = ({ onChange, defaultValue = "" }) => {
  const searchBoxRef = useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["geometry", "drawing", "places"],
  });
  const [value, setValue] = useState(defaultValue);

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places?.length > 0) {
      const place = places[0];
      const address = place.formatted_address;
      const latLng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      onChange({ address, latLng });
      setValue(address);
    }
  };

  return (
    <div>
      {isLoaded && (
        <div className="relative">
          <StandaloneSearchBox
            onLoad={(ref) => (searchBoxRef.current = ref)}
            onPlacesChanged={handlePlacesChanged}
          >
            <div className="flex items-center">
              <div className="mr-2 ">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoFocus
                type="text"
                placeholder="Search for a place"
                className="w-full py-2 pl-3 text-sm text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </StandaloneSearchBox>
        </div>
      )}
    </div>
  );
};
export default ComboboxLocation;
