import React, { useState } from "react";
import "../styles/uploadImage.css";

const UploadImage = () => {
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  };

  const handleClearImage = () => {
    setImageUrl("");
  };

  return (
    <div className="upload-container">
      <div className="upload-controls">
        <label htmlFor="file-upload" className="upload-btn">
          Choose Image
        </label>
        <input id="file-upload" type="file" onChange={handleImageUpload} />
        <button className="clear-btn" onClick={handleClearImage}>Clear Image</button>
      </div>
      {imageUrl && (
        <div className="image-container">
          <img className="uploaded-image" src={imageUrl} alt="uploaded" />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
