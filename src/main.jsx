import React from "react";
import ReactDOM from "react-dom/client";
import MyRoute from "./MyRoute";
import { ThemeProvider } from "./context/ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <MyRoute />
    </ThemeProvider>
  </React.StrictMode>
);