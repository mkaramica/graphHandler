import React, { useState, useEffect } from "react";
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
  handleZoomingImageSizeChange,
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
  const [imageSize, setImageSize] = useState(300);


  useEffect(() => {
    const handleResize = () => {
      const imageEl = document.querySelector(".uploaded-image");
      if (imageEl) {
        setImageBoxInfo({
          width: imageEl.offsetWidth,
          height: imageEl.offsetHeight,
          x: imageEl.offsetLeft,
          y: imageEl.offsetTop,
          borderSize: parseInt(
            window
              .getComputedStyle(imageEl, null)
              .getPropertyValue("border-top-width"),
            10
          ),
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  

  return (
    <div className="upload-container">
      <UploadControls
        handleImageUpload={(event) => handleImageUpload(event, setImageUrl, setOriginalImageInfo)}
        handleClearImage={() => handleClearImage(setImageUrl, setKey)}
        handleRectWidthChange={(event) => handleRectWidthChange(event, setRectWidth)}
        handleZoomingImageSizeChange={(event) => handleZoomingImageSizeChange(event, setImageSize)}
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
              setOriginalImageInfo({
                width: event.target.naturalWidth,
                height: event.target.naturalHeight,
              });
            }}
            onClick={(event) => {
              console.log(`Mouse location: x=${event.clientX}, y=${event.clientY}`);
            }}
          />
          <ZoomingImage 
          imageSize={imageSize}
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
      <div className="info-section">
        <h2>About Me</h2>
        <p>Name: Mahdi Karami</p>
        <p>Email: mahdi.karami@gmail.com</p>
        <p>Cellphone: (+1) 226-344-7809</p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/mahdikarami">https://www.linkedin.com/in/mahdikarami</a></p>
      </div>
    </div>
  );
};


export default PerformImage;