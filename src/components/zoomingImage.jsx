import React, { useState, useEffect } from "react";

const ZoomingImage = ({ 
  imageUrl, mousePos,rectWidth, imageBoxInfo, originalImageInfo  
}) => {
  const [clippedImageUrl, setClippedImageUrl] = useState(null);

  const xBoxStart = mousePos.x - rectWidth/2 - imageBoxInfo.x - imageBoxInfo.borderSize
  const yBoxStart = mousePos.y - rectWidth/2 - imageBoxInfo.y - imageBoxInfo.borderSize
  const xBoxEnd = xBoxStart + rectWidth 
  const yBoxEnd = yBoxStart + rectWidth 

  const scaleRatio = originalImageInfo.width/(imageBoxInfo.width- 2*imageBoxInfo.borderSize)

  const xShowOriginalStart = xBoxStart * scaleRatio
  const yShowOriginalStart = yBoxStart * scaleRatio
  const xShowOriginalEnd = xBoxEnd * scaleRatio
  const yShowOriginalEnd = yBoxEnd * scaleRatio

  useEffect(() => {
    const clippedImage = new Image();
    clippedImage.src = imageUrl;
    clippedImage.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = xShowOriginalEnd - xShowOriginalStart;
      canvas.height = yShowOriginalEnd - yShowOriginalStart;
      const context = canvas.getContext("2d");
      context.drawImage(
        clippedImage, 
        xShowOriginalStart, yShowOriginalStart,
        xShowOriginalEnd - xShowOriginalStart,
        yShowOriginalEnd - yShowOriginalStart,
        0, 0, 
        xShowOriginalEnd - xShowOriginalStart,
        yShowOriginalEnd - yShowOriginalStart
        );
      setClippedImageUrl(canvas.toDataURL());
    };
  }, [imageUrl, xBoxStart, yBoxStart, xBoxEnd, yBoxEnd]);

  if (!clippedImageUrl) {
    return null;
  }

  return (
    <img
      className="zooming-image"
      src={clippedImageUrl}
      alt="zooming"
    />
  );
};

export default ZoomingImage;
