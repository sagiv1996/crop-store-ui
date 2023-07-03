import {
  useParams,
  Link,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import { GraphQLClient } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import MapDisplay from "../components/MapDisplay";
import ComboboxLocation from "../components/ComboxLocation";
import { getStores } from "../graphqlQueries";

const MapPage = () => {
  const [searchParams] = useSearchParams();
  const address = searchParams.get("address") || "";
  const { lat, lng } = useParams();
  const navigate = useNavigate();

  const handleChange = (newLocation) => {
    const { latLng } = newLocation;
    const { lat, lng } = latLng;
    navigate(`/map/${lat}/${lng}`);
  };
  const client = new GraphQLClient(
    `${import.meta.env.VITE_BACKEND_ENDPOINT}/graphql`
  );

  const { data, isLoading } = useQuery(["getStores", lat, lng], () =>
    client.request(getStores, { lat: Number(lat), lng: Number(lng) })
  );

  const center = { lat: Number(lat), lng: Number(lng) };

  return (
    <div>
      {isLoading ? (
        <div>Loading.....</div>
      ) : (
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-3/12 border md:border-r-8 overflow-x-auto md:overflow-visible">
            <div className="border p-4 rounded">
              <ComboboxLocation
                defaultValue={address}
                onChange={handleChange}
              />
            </div>
            <ul className="flex md:flex-col overflow-x-auto">
              {data &&
                data.stores.data.map((cropStore, index) => (
                  <li
                    key={cropStore.attributes.name}
                    className="flex-none border p-4 rounded"
                  >
                    <h3 className="text-xl font-bold">
                      {`${index + 1}`} - {cropStore.attributes.name}
                    </h3>
                    <h3 className="text-gray-600">
                      Distance: {cropStore.attributes.distance} km
                    </h3>
                    <Link
                      to={`/map/${cropStore.attributes.location.lat}/${cropStore.attributes.location.lng}`}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      View on Map
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="w-full md:w-9/12">
            <MapDisplay center={center} cropStores={data.stores.data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPage;
