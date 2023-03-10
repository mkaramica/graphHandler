import React from "react";

const MousePositionTable = ({ mousePos, imageBoxInfo, originalImageInfo }) => {
  const scaleRatio =
    originalImageInfo.width /
    (imageBoxInfo.width - 2 * imageBoxInfo.borderSize);

  const browserCoor = {
    X: mousePos.x - imageBoxInfo.x - imageBoxInfo.borderSize + 1,
    Y: mousePos.y - imageBoxInfo.y - imageBoxInfo.borderSize + 1,
  };

  const originalCoor = {
    X: Math.round(scaleRatio * (browserCoor.X - 1)) + 1,
    Y: Math.round(scaleRatio * (browserCoor.Y - 1)) + 1,
  };

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
          <td>{originalCoor.X}</td>
          <td>{originalCoor.Y}</td>
        </tr>
        <tr>
          <td>Browser</td>
          <td>{browserCoor.X}</td>
          <td>{browserCoor.Y}</td>
        </tr>
        <tr>
          <td>Defined XY</td>
          <td>{mousePos.x}</td>
          <td>{mousePos.y}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default MousePositionTable;
