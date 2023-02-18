import React, { useState } from "react";
import "../styles/uploadImage.css";

const UploadImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [key, setKey] = useState(0);
  const [rectPos, setRectPos] = useState({ x: 0, y: 0 });
  const [rectWidth, setRectWidth] = useState(50);
  const [isVisible, setIsVisible] = useState(true);

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
    setKey((prevKey) => prevKey + 1);
  };

  const handleMouseMove = (event) => {
    setRectPos({ x: event.clientX, y: event.clientY });
  };

  const handleRectWidthChange = (event) => {
    const newWidth = parseInt(event.target.value, 10);
    if (!isNaN(newWidth) && newWidth >= 0) {
      setRectWidth(newWidth);
    }
  };

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const handleWheel = (event) => {
    event.preventDefault();
    const delta = event.deltaY;
    setRectWidth((prevWidth) => {
      const newWidth = prevWidth - delta / 10;
      return newWidth < 0 ? 0 : newWidth;
    });
  };

  return (
    <div className="upload-container" onMouseMove={handleMouseMove}>
      <div className="upload-controls">
        <label htmlFor="file-upload" className="upload-btn">
          Choose Image
        </label>
        <input
          id="file-upload"
          key={key}
          type="file"
          onChange={handleImageUpload}
        />
        <button className="clear-btn" onClick={handleClearImage}>
          Clear Image
        </button>
        <label htmlFor="rect-width-input" className="rect-width-label">
          Rectangle Width:
        </label>
        <input
          id="rect-width-input"
          type="number"
          min="0"
          value={rectWidth}
          onChange={handleRectWidthChange}
        />
      </div>
      {imageUrl && (
        <div className="image-container">
          <img
            className="uploaded-image"
            src={imageUrl}
            alt="uploaded"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onWheel={handleWheel}
          />
          <img 
            className="zooming-image"
            src={imageUrl}
            alt="zooming"
          />
          {rectPos && isVisible && (
            <div
              className="rectangle"
              style={{
                left: rectPos.x - rectWidth / 2,
                top: rectPos.y - rectWidth / 2,
                width: rectWidth,
                height: rectWidth,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UploadImage;
