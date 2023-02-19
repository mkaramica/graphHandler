import React from "react";

const ZoomingImage = ({ imageUrl }) => {

  //const { top, left } = objectPosition || { top: 0, left: 0 };

  const top = 650;
  const left = 2700;

  return (
    <img
      className="zooming-image"
      src={imageUrl}
      alt="zooming"
      style={{
        objectFit: "none",
        objectPosition: `${left} ${top}`,
      }}
    />
  );
};

export default ZoomingImage;
