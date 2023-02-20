export const handleImageUpload = (event, setImageUrl, setOriginalImageInfo) => {
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

export const handleMouseEnter = (setIsVisible) => {
  setIsVisible(true);
};

export const handleMouseLeave = (setIsVisible) => {
  setIsVisible(false);
};

export const handleWheel = (event, setRectWidth) => {
  const minRectWidth = 5;
  const widthIncrement = -20;
  event.preventDefault();
  const delta = event.deltaY;
  setRectWidth((prevWidth) => {
    const newWidth = prevWidth - delta / widthIncrement;
    return newWidth < minRectWidth ? minRectWidth : newWidth;
  });
};
