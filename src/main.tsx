import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TournoiProvider } from "./context/TournoiContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TournoiProvider>
      <App />
    </TournoiProvider>
  </React.StrictMode>
);