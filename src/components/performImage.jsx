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
  const [originalImageInfo, setOriginalImageInfo] = useState({ 
    width: 0, height: 0 
  });
  const [imageBoxInfo, setImageBoxInfo] = useState({
    width: 0, height: 0, x: 0, y: 0,borderSize: 0,
  });

  return (
    <div className="upload-container">
      <UploadControls
        handleImageUpload={(event) => handleImageUpload(event, setImageUrl, setOriginalImageInfo)}
        handleClearImage={() => handleClearImage(setImageUrl, setKey)}
        handleRectWidthChange={(event) => handleRectWidthChange(event, setRectWidth)}
        rectWidth={rectWidth}
        key={key}
      />
      {imageUrl && (
        <div
        className="image-container"
        onMouseMove={(event) => handleMouseMove(event, setmousePos)}
        
      >
          <UploadedImage
            imageUrl={imageUrl}
            handleMouseEnter={() => handleMouseEnter(setIsVisible)}
            handleMouseLeave={() => handleMouseLeave(setIsVisible)}
            handleWheel={(event) => handleWheel(event, setRectWidth)}
            onLoad={(event) => {
              setImageBoxInfo({
                width: event.target.offsetWidth,
                height: event.target.offsetHeight,
                x: event.target.offsetLeft,
                y: event.target.offsetTop,
                borderSize: parseInt(
                  window
                    .getComputedStyle(event.target, null)
                    .getPropertyValue("border-top-width"),
                  10
                ),
              });
            }}
          />
          <ZoomingImage 
          imageUrl={imageUrl}
          mousePos={mousePos}
          rectWidth={rectWidth} 
          originalImageInfo={originalImageInfo}
          imageBoxInfo={imageBoxInfo} />
  
          {mousePos && isVisible && (
            <ZoomingRectangle x={mousePos.x} y={mousePos.y} width={rectWidth} />
          )}
        </div>
      )}
    </div>
  );
};

export default PerformImage;