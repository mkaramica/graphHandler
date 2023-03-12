import React from "react";

const UploadControls = ({
  handleImageUpload,
  handleClearImage,
  handleRectWidthChange,
  handleZoomingImageSizeChange,
  rectWidth,
  zoomingImageSize,
  originalImageInfo,
  imageBoxInfo,
}) => {
  return (
    <div className="upload-controls">
      <label htmlFor="file-upload" className="upload-btn m-2">
        Choose Image
      </label>
      <input id="file-upload" type="file" onChange={handleImageUpload} />
      <button className="clear-btn m-2" onClick={handleClearImage}>
        Clear Image
      </button>
      <label htmlFor="rect-width-input" className="rect-width-label">
        Rectangle Width:
      </label>
      <input
        id="rect-width-input"
        type="number"
        min="0"
        style={{ backgroundColor: "yellow" }}
        value={rectWidth}
        onChange={handleRectWidthChange}
      />

      <label
        htmlFor="original-image-size-label"
        style={{ marginLeft: "5px", backgroundColor: "lightgreen" }}
      >
        Original Image Size: ({originalImageInfo.width}*
        {originalImageInfo.height})
      </label>

      <label
        htmlFor="browser-image-size-label"
        style={{ marginLeft: "5px", backgroundColor: "skyblue" }}
      >
        Image Size in Browser: (
        {imageBoxInfo.width - 2 * imageBoxInfo.borderSize}*
        {imageBoxInfo.height - 2 * imageBoxInfo.borderSize})
      </label>

      <label htmlFor="zooming-image-size" style={{ marginLeft: "5px" }}>
        Zooming Image Size:
      </label>

      <input
        type="range"
        min="50"
        max="500"
        value={zoomingImageSize}
        onChange={handleZoomingImageSizeChange}
      />
    </div>
  );
};

export default UploadControls;
