import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/inter";
import "./styles/index.css";
import App from "./App.tsx";
import { applyTheme, getInitialTheme } from "./helpers/Theme";

// Before the first render: every page (login included) opens with the right theme
applyTheme(getInitialTheme());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
