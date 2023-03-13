import React from "react";

const MousePositionTable = ({
  mousePos,
  imageBoxInfo,
  originalImageInfo,
  axisData,
  calculateDefinedCoordinate,
}) => {
  const imageBoxWidth = imageBoxInfo.width - 2 * imageBoxInfo.borderSize;
  const scaleRatio = isNaN(imageBoxWidth)
    ? 1
    : originalImageInfo.width / imageBoxWidth;

  const browserCoor = {
    X: mousePos.x - imageBoxInfo.x - imageBoxInfo.borderSize + 1,
    Y: mousePos.y - imageBoxInfo.y - imageBoxInfo.borderSize + 1,
  };

  const originalCoor = {
    X: Math.round(scaleRatio * (browserCoor.X - 1)) + 1,
    Y: Math.round(scaleRatio * (browserCoor.Y - 1)) + 1,
  };

  const defCoor = calculateDefinedCoordinate(originalCoor, axisData);

  if (
    originalCoor.X >= 0 &&
    originalCoor.X <= originalImageInfo.width &&
    originalCoor.Y >= 0 &&
    originalCoor.Y <= originalImageInfo.height
  ) {
    return (
      <table className="mouse-position-table">
        <thead>
          <tr>
            <th>Coordinates</th>
            <th>X</th>
            <th>Y</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Original</td>
            <td>{originalCoor.X || 0}</td>
            <td>{originalCoor.Y || 0}</td>
          </tr>
          <tr>
            <td>Browser</td>
            <td>{browserCoor.X || 0}</td>
            <td>{browserCoor.Y || 0}</td>
          </tr>
          <tr>
            <td>Defined XY</td>
            <td>{defCoor.x ? defCoor.x.toExponential(2) : "-"}</td>
            <td>{defCoor.y ? defCoor.y.toExponential(2) : "-"}</td>
          </tr>
        </tbody>
      </table>
    );
  }
};

export default MousePositionTable;
