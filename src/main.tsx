import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./globals.css";

const root = document.querySelector("#root");
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>,
  );
}
