import React from 'react';

const UploadedImage = ({imageUrl, handleMouseEnter, handleMouseLeave, handleWheel}) => {
      
    return (
    <img
      className="uploaded-image"
      src={imageUrl}
      alt="uploaded"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
    />
  );
};

export default UploadedImage;
