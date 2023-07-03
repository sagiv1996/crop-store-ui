import { useParams } from "react-router-dom";
import MapDisplay from "../components/MapDisplay";
import ComboboxLocation from "../components/ComboxLocation";
import { GraphQLClient } from "graphql-request";
import { getStores } from "../graphqlQueries";
import { useEffect } from "react";
const MapPage = () => {
  const { lat, lng } = useParams();
  const center = { lat: Number(lat), lng: Number(lng) };
  console.log(`${import.meta.env.VITE_BACKEND_ENDPOINT}graphql`);
  const client = new GraphQLClient(
    `${import.meta.env.VITE_BACKEND_ENDPOINT}graphql`
  );

  useEffect(() => {
    client
      .request(getStores, { lat: Number(lat), lng: Number(lng) })
      .then((res) => console.log({ res }));
  }, [lat, lng]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-3/12 border md:border-r-8 overflow-x-auto md:overflow-visible">
        <div className="border p-4 rounded">
          <ComboboxLocation />
        </div>
        <ul className="flex md:flex-col overflow-x-auto"></ul>
      </div>
      <div className="w-full md:w-9/12">
        <MapDisplay center={center} />
      </div>
    </div>
  );
};

export default MapPage;
