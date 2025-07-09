import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Make sure Tailwind is imported here
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="top-center" />
    </BrowserRouter>
  </React.StrictMode>
);
// This code initializes a React application, rendering the main App component within a BrowserRouter.
// It also includes a Toaster component for displaying notifications using react-hot-toast.
// The Tailwind CSS styles are imported to style the application.