import React from "react";

const ZoomingImage = ({ imageUrl, mousePos  }) => {

  return (
    <img
      className="zooming-image"
      src={imageUrl}
      alt="zooming"
      style={{
        objectFit: "none",
        objectPosition: `${100}px ${100}px`,
      }}
    />
  );
};

export default ZoomingImage;
