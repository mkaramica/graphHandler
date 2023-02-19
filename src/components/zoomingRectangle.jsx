import React from 'react';

const ZoomingRectangle = ({ x, y, width }) => {
  return (
    <div
      className="rectangle"
      style={{
        left: x - width / 2,
        top: y - width / 2,
        width: width,
        height: width,
      }}
    />
  );
};

export default ZoomingRectangle;
