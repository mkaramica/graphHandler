export const handleImageUpload = (
  event,
  setImageUrl,
  setOriginalImageInfo,
  setKey
) => {
  // clear current image and render it.
  setImageUrl("");
  setKey((prevKey) => prevKey + 1);

  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    setImageUrl(reader.result);
    const img = new Image();
    img.onload = () => {
      setOriginalImageInfo({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
      alert(
        `Original Image size: ${img.naturalWidth} x ${img.naturalHeight} Pixels`
      );
    };
    img.src = reader.result;
  };
};

export const handleClearImage = (setImageUrl, setKey) => {
  setImageUrl("");
  setKey((prevKey) => prevKey + 1);
};

export const handleMouseMove = (event, setmousePos) => {
  setmousePos({ x: event.clientX, y: event.clientY });
};

export const handleRectWidthChange = (event, setRectWidth) => {
  const newWidth = parseInt(event.target.value, 10);
  if (!isNaN(newWidth) && newWidth >= 0) {
    setRectWidth(newWidth);
  }
};

export const handleZoomingImageSizeChange = (event, setZoomingImageSize) => {
  const newSize = parseInt(event.target.value, 10);
  setZoomingImageSize(newSize);
};

export const handleMouseEnter = (setIsVisible) => {
  setIsVisible(true);
};

export const handleMouseLeave = (setIsVisible) => {
  setIsVisible(false);
};

export const handleWheel = (event, setRectWidth) => {
  const minRectWidth = 5;
  const widthIncrement = -20;
  //event.preventDefault();
  const delta = event.deltaY;
  setRectWidth((prevWidth) => {
    const newWidth = prevWidth - delta / widthIncrement;
    return newWidth < minRectWidth ? minRectWidth : newWidth;
  });
};

export function drawCircle(context, canvasCoorcircle, color) {
  context.beginPath();
  context.ellipse(
    canvasCoorcircle.X,
    canvasCoorcircle.Y,
    canvasCoorcircle.radiusX,
    canvasCoorcircle.radiusY,
    0,
    0,
    2 * Math.PI
  );
  context.fillStyle = color;
  context.fill();
}

export function handleImageClick(
  event,
  imageBoxInfo,
  originalImageInfo,
  canvasRef,
  mouseClickingMode,
  setMouseClickingMode,
  axisData,
  setAxisData
) {
  const radius = mouseClickingMode < 4 ? 12 : 8;

  let color = "black";

  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");
  const imageCoorCircle = {
    X: event.clientX - imageBoxInfo.x - imageBoxInfo.borderSize + 1,
    Y: event.clientY - imageBoxInfo.y - imageBoxInfo.borderSize + 1,
    radius: radius,
  };

  const canvasRatioX =
    canvas.width / (imageBoxInfo.width - 2 * imageBoxInfo.borderSize);

  const canvasRatioY =
    canvas.height / (imageBoxInfo.height - 2 * imageBoxInfo.borderSize);

  const canvasCoorcircle = {
    X: (imageCoorCircle.X - 1) * canvasRatioX,
    Y: (imageCoorCircle.Y - 1) * canvasRatioY,
    radiusX: imageCoorCircle.radius * canvasRatioX,
    radiusY: imageCoorCircle.radius * canvasRatioY,
  };

  let currentAxis, currentPoint;

  switch (mouseClickingMode) {
    case 0:
      color = "blue";
      currentAxis = "xAxis";
      currentPoint = "P1";
      break;
    case 1:
      color = "red";
      currentAxis = "xAxis";
      currentPoint = "P2";
      break;
    case 2:
      color = "green";
      currentAxis = "yAxis";
      currentPoint = "P1";
      break;
    case 3:
      color = "orange";
      currentAxis = "yAxis";
      currentPoint = "P2";
      break;
    case 4:
    // Do nothing
  }

  drawCircle(context, canvasCoorcircle, color);

  // Update axisData:
  const aspectRatio =
    originalImageInfo.width /
    (imageBoxInfo.width - 2 * imageBoxInfo.borderSize);

  const OriginalImageClickCoor = {
    X: (imageCoorCircle.X - 1) * aspectRatio + 1,
    Y: (imageCoorCircle.Y - 1) * aspectRatio + 1,
  };

  if (mouseClickingMode < 4) {
    setAxisData({
      ...axisData,
      [currentAxis]: {
        ...axisData[currentAxis],
        [currentPoint]: {
          ...axisData[currentAxis][currentPoint],
          coordinate: {
            X: OriginalImageClickCoor.X,
            Y: OriginalImageClickCoor.Y,
          },
        },
      },
    });
  }

  if (mouseClickingMode === 4) {
    const defCoor = calculateDefinedCoordinate(
      OriginalImageClickCoor,
      axisData
    );
    console.log(
      `x:${defCoor.x.toExponential(3)}, y: ${defCoor.y.toExponential(3)}`
    );
  }

  if (mouseClickingMode < 4) setMouseClickingMode(mouseClickingMode + 1);
}

export function clearCanvas(canvasRef, setMouseClickingMode) {
  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  setMouseClickingMode(0);
}

export function giveDescriptionGuide(mouseClickingMode) {
  const defaultDescription =
    "This is a guide for actions you can take on the image.";
  const descriptionguide = {
    0: "Click on x-axis: Point-1",
    1: "Click on x-axis: Point-2",
    2: "Click on y-axis: Point-1",
    3: "Click on y-axis: Point-2",
    4: "Click on data-points to know their coordinates",
  };
  if (!descriptionguide[mouseClickingMode]) return defaultDescription;
  return descriptionguide[mouseClickingMode];
}

export function calculateDefinedCoordinate(OriginalImageClickCoor, axisData) {
  const X0 = OriginalImageClickCoor.X;
  const Y0 = OriginalImageClickCoor.Y;

  const XP1 = {
    X: axisData.xAxis.P1.coordinate.X,
    Y: axisData.xAxis.P1.coordinate.Y,
  };
  const XP2 = {
    X: axisData.xAxis.P2.coordinate.X,
    Y: axisData.xAxis.P2.coordinate.Y,
  };
  const YP1 = {
    X: axisData.yAxis.P1.coordinate.X,
    Y: axisData.yAxis.P1.coordinate.Y,
  };
  const YP2 = {
    X: axisData.yAxis.P2.coordinate.X,
    Y: axisData.yAxis.P2.coordinate.Y,
  };

  let x1 = axisData.xAxis.P1.value;
  let x2 = axisData.xAxis.P2.value;
  let y1 = axisData.yAxis.P1.value;
  let y2 = axisData.yAxis.P2.value;

  if (axisData.xAxis.isLogScale) {
    x1 = Math.log(x1);
    x2 = Math.log(x2);
  }

  if (axisData.yAxis.isLogScale) {
    y1 = Math.log(y1);
    y2 = Math.log(y2);
  }

  const m_xAxis = (XP2.Y - XP1.Y) / (XP2.X - XP1.X);
  const m_yAxis = (YP2.Y - YP1.Y) / (YP2.X - YP1.X);

  const Xx =
    (Y0 - m_yAxis * X0 + m_xAxis * XP1.X - XP1.Y) / (m_xAxis - m_yAxis);

  const Xy =
    (YP1.Y - m_yAxis * YP1.X + m_xAxis * X0 - Y0) / (m_xAxis - m_yAxis);

  let x = ((Xx - XP1.X) / (XP2.X - XP1.X)) * (x2 - x1) + x1;
  let y = ((Xy - YP1.X) / (YP2.X - YP1.X)) * (y2 - y1) + y1;

  if (axisData.xAxis.isLogScale) {
    x = Math.exp(x);
  }
  if (axisData.xAxis.isLogScale) {
    y = Math.exp(y);
  }

  return { x: x, y: y };
}
