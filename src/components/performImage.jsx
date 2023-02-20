import React, { useState } from "react";
import "../styles/performImage.css";
import ZoomingImage from "./zoomingImage";
import ZoomingRectangle from './zoomingRectangle';
import UploadedImage from './uploadedImage';
import UploadControls from "./uploadControls";
import { 
  handleImageUpload,
  handleClearImage, 
  handleMouseMove, 
  handleRectWidthChange, 
  handleMouseEnter, 
  handleMouseLeave, 
  handleWheel } from '../utils/imageUtils';

const PerformImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [key, setKey] = useState(0);
  const [mousePos, setmousePos] = useState({ x: 0, y: 0 });
  const [rectWidth, setRectWidth] = useState(50);
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="upload-container">
      <UploadControls
        handleImageUpload={(event) => handleImageUpload(event, setImageUrl)}
        handleClearImage={() => handleClearImage(setImageUrl, setKey)}
        handleRectWidthChange={(event) => handleRectWidthChange(event, setRectWidth)}
        rectWidth={rectWidth}
        key={key}
      />
      {imageUrl && (
        <div className="image-container" onMouseMove={(event) => handleMouseMove(event, setmousePos)}>
          <UploadedImage
            imageUrl={imageUrl}
            handleMouseEnter={() => handleMouseEnter(setIsVisible)}
            handleMouseLeave={() => handleMouseLeave(setIsVisible)}
            handleWheel={(event) => handleWheel(event, setRectWidth)}
          />
          <ZoomingImage imageUrl={imageUrl} mousePos={mousePos} />
  
          {mousePos && isVisible && (
            <ZoomingRectangle x={mousePos.x} y={mousePos.y} width={rectWidth} />
          )}
        </div>
      )}
    </div>
  );
};

export default PerformImage;