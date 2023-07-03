import { useParams } from "react-router-dom";
import MapDisplay from "../components/MapDisplay";

const MapPage = () => {
  const { lat, lng } = useParams();
  const center = { lat: Number(lat), lng: Number(lng) };

  return <MapDisplay center={center} />;
};

export default MapPage;
