import React, { useState, useEffect } from "react";

const ZoomingImage = ({
  zoomingImageSize,
  imageUrl,
  mousePos,
  rectWidth,
  imageBoxInfo,
  originalImageInfo,
}) => {
  const [clippedImageUrl, setClippedImageUrl] = useState(null);

  const xBoxStart =
    mousePos.x - rectWidth / 2 - imageBoxInfo.x - imageBoxInfo.borderSize + 1;
  const yBoxStart =
    mousePos.y - rectWidth / 2 - imageBoxInfo.y - imageBoxInfo.borderSize + 1;
  const xBoxEnd = xBoxStart + rectWidth - 1;
  const yBoxEnd = yBoxStart + rectWidth - 1;

  const scaleRatio =
    originalImageInfo.width /
    (imageBoxInfo.width - 2 * imageBoxInfo.borderSize);

  const xShowOriginalStart = xBoxStart * scaleRatio;
  const yShowOriginalStart = yBoxStart * scaleRatio;
  const xShowOriginalEnd = xBoxEnd * scaleRatio;
  const yShowOriginalEnd = yBoxEnd * scaleRatio;

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
        xShowOriginalStart,
        yShowOriginalStart,
        xShowOriginalEnd - xShowOriginalStart,
        yShowOriginalEnd - yShowOriginalStart,
        0,
        0,
        xShowOriginalEnd - xShowOriginalStart,
        yShowOriginalEnd - yShowOriginalStart
      );
      setClippedImageUrl(canvas.toDataURL());
    };
  }, [imageUrl, xBoxStart, yBoxStart, xBoxEnd, yBoxEnd]);

  if (!clippedImageUrl) {
    return null;
  }

  // Parameters for drawing vertical and horizontal lines:
  const me = {
    width: zoomingImageSize,
    height: zoomingImageSize,
    marginLeft: 3,
    marginTop: 10,
  };

  return (
    <div style={{ position: "relative" }}>
      <img
        className="zooming-image"
        src={clippedImageUrl}
        alt="zooming"
        width={zoomingImageSize}
        height={zoomingImageSize}
      />
      <div
        className="line-zoom"
        style={{
          left: me.marginLeft + me.width / 2,
          top: me.marginTop,
          height: me.height,
          width: "1px",
          boxShadow: "white 0px 0px 1px",
        }}
      />
      <div
        className="line-zoom"
        style={{
          left: me.marginLeft,
          top: me.marginTop + me.height / 2,
          width: me.width,
          height: "1px",
          boxShadow: "white 0px 0px 1px",
        }}
      />
    </div>
  );
};

export default ZoomingImage;
