import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import PerformImage from "./components/performImage";

function App() {
  return (
    <React.StrictMode>
      <div>
        <PerformImage />
      </div>
    </React.StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<App />);
