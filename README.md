# React Vite Project

This is a React and Vite project that includes two routes and utilizes several libraries and APIs for functionality.

## Prerequisites

Before running the project, make sure you have the following:

- Node.js (version 12 or higher) installed on your machine
- Access to the required environment variables:
  - `VITE_GOOGLE_MAPS_API_KEY`: API key for Google Maps API
  - `VITE_BACKEND_ENDPOINT`: Backend API endpoint

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-directory>`
3. Install the dependencies: `npm install`

## Configuration

1. Create a `.env` file in the project root.
2. Set the following environment variables in the `.env` file:
   - `VITE_GOOGLE_MAPS_API_KEY=<your-api-key>`
   - `VITE_BACKEND_ENDPOINT=<backend-endpoint>`

## Usage

### Development Mode

To run the project in development mode, use the following command:
`npm run dev`

This will start the development server and the application will be accessible at `http://localhost:5173/`.

### Production Build

To build the project for production, use the following command:
`npm run build`


This will create an optimized production build in the `dist` directory.

### Deployment

To deploy the project, you can use the static files generated in the `dist` directory.

## Libraries and APIs

This project utilizes the following libraries and APIs:

- `@headlessui/react` - A set of completely unstyled, accessible UI components for React.
- `@react-google-maps/api` - React components for Google Maps API integration.
- `@tanstack/react-query` - A library for managing and caching asynchronous data in React applications.
- `graphql` - A JavaScript reference implementation for GraphQL.
- `graphql-request` - A minimal GraphQL client for fetching data.
- `ra-data-graphql` - A GraphQL data provider for the React Admin framework.
- `react` and `react-dom` - The core libraries for building React applications.
- `react-icons` - A library that provides a collection of icons for React components.
- `react-router-dom` - A library for routing and navigation in React applications.

Make sure to install these dependencies using `npm install` before running the project.

## Routes

This project includes the following routes:

1. `/` - The home route that includes an input box using the Google Places API. When the user enters data, more data is loaded, and the user can select a value.After the user has chosen an entry, he can press the "Search" button and go to the second route. If the value of the button is not selected, it is disabled.
2. `/map/:lat/:lng?address=<address>&cropStoreId=<cropStoreId>` - Shows a map and next to it the existing branches.
The center of the map comes from the link (lat, lng).
In addition, you can write an address and cropStoreId. Information and sending an address, it will be displayed in the input box (otherwise it will only be there and it will be possible to enter another value and go to the relevant page). If you click on a specific marker on the map, or alternatively send cropStoreId, the page will open a pop up window and load the information about the desired branch

Remember to replace `<repository-url>` and `<project-directory>` with the actual URL of your repository and the directory where the project is located.


![Screenshot 2023-07-03 222906](https://github.com/sagiv1996/crop-store-ui/assets/71065719/377580b1-06b1-47db-b4f5-97205d34799d)
![Screenshot 2023-07-03 223139](https://github.com/sagiv1996/crop-store-ui/assets/71065719/9259ec11-c0f8-4f3b-b5dc-080d629f8ae6)
![Screenshot 2023-07-03 223217](https://github.com/sagiv1996/crop-store-ui/assets/71065719/75c72f08-e02e-4f9b-9797-35cbf0e12cd4)
![Screenshot 2023-07-03 223237](https://github.com/sagiv1996/crop-store-ui/assets/71065719/c7a1184a-e95b-4840-a8e5-077d1b8d25ee)
