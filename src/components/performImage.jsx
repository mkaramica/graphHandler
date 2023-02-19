import React, { useState } from "react";
import "../styles/performImage.css";
import ZoomingImage from "./zoomingImage";
import ZoomingRectangle from './zoomingRectangle';
import UploadedImage from './uploadedImage';
import UploadControls from "./uploadControls";


const PerformImage = () => {
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
    const minRectWidth = 20; 
    const widthIncrement = 20;
    event.preventDefault();
    const delta = event.deltaY;
    setRectWidth((prevWidth) => {
      const newWidth = prevWidth - delta / widthIncrement;
      return newWidth < minRectWidth ? minRectWidth : newWidth;
    });
  };

  return (
    <div className="upload-container" onMouseMove={handleMouseMove}>
      <UploadControls
        handleImageUpload={handleImageUpload}
        handleClearImage={handleClearImage}
        handleRectWidthChange={handleRectWidthChange}
        rectWidth={rectWidth}
        key={key}
      />
      {imageUrl && (
        <div className="image-container">
          <UploadedImage
            imageUrl={imageUrl}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            handleWheel={handleWheel}
          />
          <ZoomingImage 
          imageUrl={imageUrl}
           />
          {rectPos && isVisible && (
            <ZoomingRectangle x={rectPos.x} y={rectPos.y} width={rectWidth} />
          )}
        </div>
      )}
    </div>
  );
};

export default PerformImage;
