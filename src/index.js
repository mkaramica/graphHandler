import React from "react";
import ReactDOM from "react-dom";
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

ReactDOM.render(<App />, document.getElementById("root"));
