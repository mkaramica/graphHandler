import React, { useEffect, useRef } from "react";

const CanvasLayer = ({ imageBoxInfo }) => {
  const canvasRef = useRef(null);
  const { x, y, width, height, borderSize } = imageBoxInfo;
  /*
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // calculate the center point of the canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // set the circle properties
    const radius = Math.min(canvas.width, canvas.height) / 4;
    const fillColor = "#FF0000";

    // begin drawing the circle
    context.beginPath();

    const aspectRatio = canvas.width / canvas.height;
    const radiusX = canvas.width / 50;
    const radiusY = radiusX;

    // draw the circle using the arc() method
    context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);

    // fill the circle with the specified color
    context.fillStyle = fillColor;
    context.fill();
  }, [imageBoxInfo]);
*/
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
