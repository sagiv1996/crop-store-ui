import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/map/:lat/:lng"
            element={<MapPage />}
            lazy={true}
          ></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
