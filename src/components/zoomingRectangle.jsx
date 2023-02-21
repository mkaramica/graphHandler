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
        className="line-zoom"
        style={{
          left: x-1.2,
          top: y - width / 2,
          width: "1px",
          height: width,
          boxShadow: "white 0px 0px 1px"
        }}
      />
      <div
        className="line-zoom"
        style={{
          left: x - width / 2,
          top: y-1.2,
          height: "1px",
          width: width,
          boxShadow: "white 0px 0px 1px"
        }}
      />
    </div>
    
    
  );
};

export default ZoomingRectangle;
