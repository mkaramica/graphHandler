import React, { useRef } from "react";

const CanvasLayer = ({ imageBoxInfo, canvasRef }) => {
  const { x, y, width, height, borderSize } = imageBoxInfo;

  return (
    <canvas
      ref={canvasRef}
      className="canvas-layer"
      style={{
        position: "absolute",
        left: `${x + borderSize}px`,
        top: `${y + borderSize}px`,
        width: `${width - 2 * borderSize}px`,
        height: `${height - 2 * borderSize}px`,
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        pointerEvents: "none",
      }}
    />
  );
};

export default CanvasLayer;
