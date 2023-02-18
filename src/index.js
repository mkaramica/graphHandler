import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import UploadImage from "./components/uploadImage";

function App() {
  return (
    <React.StrictMode>
      <div>
        <UploadImage />
      </div>
    </React.StrictMode>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
