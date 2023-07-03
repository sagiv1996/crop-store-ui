import { useEffect, useState } from "react";
import ComboboxLocation from "../components/ComboxLocation";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [geometry, setGeometry] = useState(null);
  const [address, setAddress] = useState();
  const [disabledButton, setDisabledButton] = useState(true);
  const navigate = useNavigate();

  const handleChange = (newLocation) => {
    const { latLng, address } = newLocation;
    setGeometry(latLng);
    setAddress(address);
  };

  useEffect(() => {
    setDisabledButton(Boolean(!geometry && !address));
  }, [geometry, address]);

  const handleSubmit = () => {
    navigate({
      pathname: `map/${geometry?.lat}/${geometry?.lng}`,
      search: `address=${encodeURI(address)}`,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md px-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow p-6">
          <h4 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 text-center">
            The WWW crop
          </h4>
          <h5 className="mb-4 text-lg font-bold tracking-tight text-gray-500 text-center">
            Enter your location
          </h5>
          <ComboboxLocation onChange={handleChange} />
          <button
            disabled={disabledButton}
            type="submit"
            className="w-full mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
