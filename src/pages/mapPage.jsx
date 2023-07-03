import { useParams, Link } from "react-router-dom";
import MapDisplay from "../components/MapDisplay";
import ComboboxLocation from "../components/ComboxLocation";
import { GraphQLClient } from "graphql-request";
import { getStores } from "../graphqlQueries";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const MapPage = () => {
  const { lat, lng } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["getStores", lat, lng],
    queryFn: async () =>
      await client.request(getStores, { lat: Number(lat), lng: Number(lng) }),
    enabled: !!lat && !!lng,
  });

  const center = { lat: Number(lat), lng: Number(lng) };
  const client = new GraphQLClient(
    `${import.meta.env.VITE_BACKEND_ENDPOINT}graphql`
  );

  return (
    <div>
      {isLoading ? (
        <div>Loading.....</div>
      ) : (
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-3/12 border md:border-r-8 overflow-x-auto md:overflow-visible">
            <div className="border p-4 rounded">
              <ComboboxLocation />
            </div>
            <ul className="flex md:flex-col overflow-x-auto">
              {data &&
                data.stores.data.map((cropStore) => (
                  <li
                    key={cropStore.attributes.name}
                    className="flex-none  border p-4 rounded"
                  >
                    <h3 className="text-xl font-bold">
                      {cropStore.attributes.name}
                    </h3>
                    <h3 className="text-gray-600">
                      Distance: {cropStore.attributes.distance} km
                    </h3>
                    <Link
                      to={`/map/${cropStore.attributes.location.lat}/${cropStore.attributes.location.lng}`}
                      className="text-blue-500 hover:text-blue-600"
                      onClick={() =>
                        setOpenDialog(cropStore.attributes.location)
                      }
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
