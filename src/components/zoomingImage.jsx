import React from "react";

const ZoomingImage = ({ imageUrl, mousePos }) => {

  const { x, y } = mousePos || { x: 0, y: 0 };
  console.log(x,y);

  return (
    <img
      className="zooming-image"
      src={imageUrl}
      alt="zooming"
      style={{
        objectFit: "none",
        objectPosition: `${x}px ${y}px`,
      }}
    />
  );
};

export default ZoomingImage;
