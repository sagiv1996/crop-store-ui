import React from "react";
import { Dialog } from "@headlessui/react";
import { FaPhone } from "react-icons/fa";
import { GraphQLClient } from "graphql-request";
import { getStoreById } from "../graphqlQueries";
import { useQuery } from "@tanstack/react-query";
import defaultImage from "../assets/defaultImage.png";

const url = import.meta.env.VITE_BACKEND_ENDPOINT;
const client = new GraphQLClient(`${url}/graphql`);

const CropDetails = ({ id }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [`getStoreid`, id],
    queryFn: async () => await client.request(getStoreById, { id }),
    enabled: !!id,
  });

  const today = new Date().toLocaleString("en-us", { weekday: "long" });

  const getImageUrl = (record) => {
    try {
      return url + record.store.data.attributes.image.data.attributes?.url;
    } catch (e) {
      return defaultImage;
    }
  };

  const isOpenNow = (day) => {
    /**
     * Checks if the crop is currently open based on the provided day.
     * @param {string} day - The day for which to check if the crop is open.
     * @returns {boolean} - Indicates whether the crop is open now.
     */
    const now = new Date();
    if (day !== today) {
      return false;
    }

    const { open, close } = data.store.data.attributes.openingHours[today];
    const [hourOpen, minutesOpen] = open.split(":").map(Number);
    const [hourClose, minutesClose] = close.split(":").map(Number);
    const timeOpen = new Date().setHours(hourOpen, minutesOpen);
    const timeClose = new Date().setHours(hourClose, minutesClose);
    return now > timeOpen && now < timeClose;
  };

  if (isError) {
    return "An error occurred";
  } else if (isLoading) {
    return "Loading...";
  }
  return (
    <div>
      <Dialog.Title
        as="h3"
        className="text-xl font-medium leading-6 text-gray-900"
      >
        {data.store.data.attributes?.name}
      </Dialog.Title>
      <Dialog.Title
        as="h4"
        className="text-lg font-semibold leading-7 text-gray-700"
      >
        Address: {data.store.data.attributes?.address}
      </Dialog.Title>
      <Dialog.Description className="flex items-center space-x-2">
        <span className="text-gray-600">
          {data.store.data.attributes?.phoneNumber}
        </span>
        <a
          className="text-blue-500 hover:text-blue-600"
          href={`tel:${data.store.data.attributes?.phoneNumber}`}
        >
          <FaPhone
            size={20}
            title={`Call to ${data.store.data.attributes?.phoneNumber}`}
          />
        </a>
      </Dialog.Description>
      <ul className="list-disc pl-4">
        {Object.entries(data.store.data.attributes.openingHours).map(
          ([day, hours], index) => (
            <li
              key={index}
              className={
                isOpenNow(day)
                  ? "text-green-500"
                  : today === day
                  ? "text-red-500"
                  : "text-grey-500"
              }
            >
              <span className="font-semibold mr-1">{day}</span>
              <span>{`${hours.open} - ${hours.close}`}</span>
            </li>
          )
        )}
      </ul>
      <img src={getImageUrl(data)} alt="Crop Image" />
    </div>
  );
};

export default CropDetails;
