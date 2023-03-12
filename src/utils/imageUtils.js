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

export function handleImageClick(event, imageBoxInfo, canvasRef) {
  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");
  const radius = 7;
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

  drawCircle(context, canvasCoorcircle, "red");
}

export function clearCanvas(canvasRef) {
  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
}
