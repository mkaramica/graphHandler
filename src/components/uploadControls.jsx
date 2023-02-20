import React from "react";

const UploadControls = ({ handleImageUpload, handleClearImage, handleRectWidthChange, rectWidth, key }) => {
  
  return (
    <div className="upload-controls">
      <label htmlFor="file-upload" className="upload-btn m-2">
        Choose Image
      </label>
      <input id="file-upload" key={key} type="file" onChange={handleImageUpload} />
      <button className="clear-btn m-2" onClick={handleClearImage}>
        Clear Image
      </button>
      <label htmlFor="rect-width-input" className="rect-width-label">
        Rectangle Width:
      </label>
      <input id="rect-width-input" type="number" min="0" value={rectWidth} onChange={handleRectWidthChange} />
    </div>
  );
};

export default UploadControls;
