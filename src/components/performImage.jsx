import React, { useState, useEffect, useRef } from "react";
import "../styles/performImage.css";
import ZoomingImage from "./zoomingImage";
import ZoomingRectangle from "./zoomingRectangle";
import UploadedImage from "./uploadedImage";
import UploadControls from "./uploadControls";
import MousePositionTable from "./mousePositionTable";
import InfoSection from "./infoSection";
import CanvasLayer from "./canvasLayer";
import ActionDescription from "./actionDescription";
import {
  handleImageUpload,
  handleClearImage,
  handleMouseMove,
  handleRectWidthChange,
  handleZoomingImageSizeChange,
  handleMouseEnter,
  handleMouseLeave,
  handleWheel,
  handleImageClick,
  clearCanvas,
} from "../utils/imageUtils";

const PerformImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [key, setKey] = useState(0);
  const [mousePos, setmousePos] = useState({ x: 0, y: 0 });
  const [rectWidth, setRectWidth] = useState(50);
  const [isVisible, setIsVisible] = useState(true);
  const [originalImageInfo, setOriginalImageInfo] = useState({
    width: 0,
    height: 0,
  });
  const [imageBoxInfo, setImageBoxInfo] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    borderSize: 0,
  });

  const [zoomingImageSize, setZoomingImageSize] = useState(500);
  const canvasRef = useRef(null);

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
        handleImageUpload={(event) =>
          handleImageUpload(event, setImageUrl, setOriginalImageInfo, setKey)
        }
        handleClearImage={() => handleClearImage(setImageUrl, setKey)}
        handleRectWidthChange={(event) =>
          handleRectWidthChange(event, setRectWidth)
        }
        handleZoomingImageSizeChange={(event) =>
          handleZoomingImageSizeChange(event, setZoomingImageSize)
        }
        rectWidth={rectWidth}
        key={key}
        originalImageInfo={originalImageInfo}
        imageBoxInfo={imageBoxInfo}
        canvasRef={canvasRef}
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
            onClick={(event) =>
              handleImageClick(event, imageBoxInfo, canvasRef)
            }
          />
          <CanvasLayer imageBoxInfo={imageBoxInfo} canvasRef={canvasRef} />
          <ActionDescription imageBoxInfo={imageBoxInfo} />

          {mousePos && isVisible && (
            <div className="zooming-image-wrapper">
              <ZoomingImage
                zoomingImageSize={zoomingImageSize}
                imageUrl={imageUrl}
                mousePos={mousePos}
                rectWidth={rectWidth}
                originalImageInfo={originalImageInfo}
                imageBoxInfo={imageBoxInfo}
              />

              <MousePositionTable
                mousePos={mousePos}
                imageBoxInfo={imageBoxInfo}
                originalImageInfo={originalImageInfo}
              />
            </div>
          )}
          {mousePos && isVisible && (
            <div className="zooming-rectangle-wrapper">
              <ZoomingRectangle
                x={mousePos.x}
                y={mousePos.y}
                width={rectWidth}
              />
            </div>
          )}
        </div>
      )}

      <InfoSection />
    </div>
  );
};

export default PerformImage;
