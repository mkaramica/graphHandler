import React from 'react';

const UploadedImage = ({
  imageUrl, handleMouseEnter, 
  handleMouseLeave, handleWheel, onLoad }) => {
      
    return (
    <img
      className="uploaded-image"
      src={imageUrl}
      alt="uploaded"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
      onLoad={onLoad}
    />
  );
};

export default UploadedImage;
