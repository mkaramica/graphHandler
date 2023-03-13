import React from "react";

const ImageOptions = ({ axisData, setAxisData, onClick }) => {
  const p = 10;
  return (
    <div className="image-options">
      <h4>Options</h4>
      <hr style={{ margin: "10px 0" }} />
      <div>
        <h5>X-Axis</h5>
        <div>
          <input
            type="checkbox"
            id="x-axis-logscale"
            checked={axisData.xAxis.isLogScale}
            onChange={(e) =>
              setAxisData({
                ...axisData,
                xAxis: {
                  ...axisData.xAxis,
                  isLogScale: e.target.checked,
                  P1: {
                    ...axisData.xAxis.P1,
                    value:
                      e.target.checked && axisData.xAxis.P1.value <= 0
                        ? 1e-3
                        : axisData.xAxis.P1.value,
                  },
                  P2: {
                    ...axisData.xAxis.P2,
                    value:
                      e.target.checked && axisData.xAxis.P2.value <= 0
                        ? 1e-3
                        : axisData.xAxis.P2.value,
                  },
                },
              })
            }
          />
          <label htmlFor="x-axis-logscale">Log-Scale</label>
        </div>
        <div>
          <label htmlFor="x-axis-p1">Point #1</label>
          <input
            type="number"
            id="x-axis-p1"
            value={axisData.xAxis.P1.value}
            style={{ width: "140px", backgroundColor: "blue", color: "white" }}
            onChange={(e) =>
              setAxisData({
                ...axisData,
                xAxis: {
                  ...axisData.xAxis,
                  P1: {
                    value: e.target.value,
                    coordinate: {
                      X: axisData.xAxis.P1.coordinate.X,
                      Y: axisData.xAxis.P1.coordinate.Y,
                    },
                  },
                },
              })
            }
          />
        </div>
        <div>
          <label htmlFor="x-axis-p2">Point #2</label>
          <input
            type="number"
            id="x-axis-p2"
            value={axisData.xAxis.P2.value}
            style={{ width: "140px", backgroundColor: "red", color: "white" }}
            onChange={(e) =>
              setAxisData({
                ...axisData,
                xAxis: {
                  ...axisData.xAxis,
                  P2: {
                    value: e.target.value,
                    coordinate: {
                      X: axisData.xAxis.P2.coordinate.X,
                      Y: axisData.xAxis.P2.coordinate.Y,
                    },
                  },
                },
              })
            }
          />
        </div>
      </div>
      <div>
        <hr style={{ margin: "10px 0" }} />
        <h5>Y-Axis</h5>
        <div>
          <input
            type="checkbox"
            id="y-axis-logscale"
            checked={axisData.yAxis.isLogScale}
            onChange={(e) =>
              setAxisData({
                ...axisData,
                yAxis: {
                  ...axisData.yAxis,
                  isLogScale: e.target.checked,
                  P1: {
                    ...axisData.yAxis.P1,
                    value:
                      e.target.checked && axisData.yAxis.P1.value <= 0
                        ? 1e-3
                        : axisData.yAxis.P1.value,
                  },
                  P2: {
                    ...axisData.yAxis.P2,
                    value:
                      e.target.checked && axisData.yAxis.P2.value <= 0
                        ? 1e-3
                        : axisData.yAxis.P2.value,
                  },
                },
              })
            }
          />
          <label htmlFor="y-axis-logscale">Log-Scale</label>
        </div>
        <div>
          <label htmlFor="y-axis-p1">Point #1</label>
          <input
            type="number"
            id="y-axis-p1"
            value={axisData.yAxis.P1.value}
            style={{ width: "140px", backgroundColor: "green", color: "white" }}
            onChange={(e) =>
              setAxisData({
                ...axisData,
                yAxis: {
                  ...axisData.yAxis,
                  P1: {
                    value: e.target.value,
                    coordinate: {
                      X: axisData.yAxis.P1.coordinate.X,
                      Y: axisData.yAxis.P1.coordinate.Y,
                    },
                  },
                },
              })
            }
          />
        </div>
        <div>
          <label htmlFor="y-axis-p2">Point #2</label>
          <input
            type="number"
            id="y-axis-p2"
            value={axisData.yAxis.P2.value}
            style={{
              width: "140px",
              backgroundColor: "orange",
              color: "white",
            }}
            onChange={(e) =>
              setAxisData({
                ...axisData,
                yAxis: {
                  ...axisData.yAxis,
                  P2: {
                    value: e.target.value,
                    coordinate: {
                      X: axisData.yAxis.P2.coordinate.X,
                      Y: axisData.yAxis.P2.coordinate.Y,
                    },
                  },
                },
              })
            }
          />
        </div>
      </div>
      <div style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }} />
      <hr style={{ margin: "10px 0" }} />
      <button style={{ width: "140px" }} onClick={onClick}>
        Clear Information
      </button>
    </div>
  );
};

export default ImageOptions;
