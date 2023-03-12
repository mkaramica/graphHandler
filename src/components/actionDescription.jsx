import React from "react";

const ActionDescription = ({ imageBoxInfo }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: `${imageBoxInfo.x}px`,
        top: `${imageBoxInfo.y + imageBoxInfo.height + 10}px`,
        width: `${imageBoxInfo.width}px`,
        backgroundColor: "#d1f5d3",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        maxHeight: "7%",
        overflow: "auto",
      }}
    >
      <h4 style={{ margin: 0 }}>Action Guide</h4>
      <p style={{ margin: 0, fontSize: "16px" }}>
        This is a guide for actions you can take on the image
      </p>
    </div>
  );
};

export default ActionDescription;
