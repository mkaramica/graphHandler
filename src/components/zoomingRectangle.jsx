import React from 'react';

const ZoomingRectangle = ({ x, y, width }) => {
  return (
    <div>
      <div
        className="rectangle"
        style={{
          left: x - width / 2,
          top: y - width / 2,
          width: width,
          height: width,
        }}
      />
      <div
        className="rectangle"
        style={{
          left: x,
          top: y - width / 2,
          width: "1px",
          height: width,
        }}
      />
      <div
        className="rectangle"
        style={{
          left: x - width / 2,
          top: y,
          height: "1px",
          width: width,
        }}
      />
    </div>
    
    
  );
};

export default ZoomingRectangle;
