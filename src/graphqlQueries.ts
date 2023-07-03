import { gql } from "graphql-request";

export const getStores = gql`
  query GetStores($lat: Float!, $lng: Float!) {
    stores(lat: $lat, lng: $lng) {
      data {
        id
        attributes {
          distance
          name
          address
          location
        }
      }
    }
  }
`;

export const getStoreById = gql`
  query GetStoreById($id: ID) {
    store(id: $id) {
      data {
        id
        attributes {
          name
          address
          location
          phoneNumber
          openingHours
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
