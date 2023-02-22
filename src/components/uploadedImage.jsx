import React from 'react';

const UploadedImage = ({
  imageUrl, handleMouseEnter, 
  handleMouseLeave, handleWheel, onLoad, onClick }) => {
      
    return (
    <img
      className="uploaded-image"
      src={imageUrl}
      alt="uploaded"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
      onLoad={onLoad}
      onClick={onClick}
    />
  );
};

export default UploadedImage;
