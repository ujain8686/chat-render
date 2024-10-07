import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Socket from "./client/Socket";
import Page from "./client/Posts/Page.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Socket />
  // </StrictMode>,
);
