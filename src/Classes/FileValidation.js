export function getExtensionFromName(name) {
  let fileExtension = name.substring(name.lastIndexOf(".") + 1);
  return fileExtension;
}

export function checkFileSize(sizeinbytes, sizeType = "MB") {
  switch (sizeType) {
    case "GB":
      return (sizeinbytes / 1073741824).toFixed(2);
    default:
      return (sizeinbytes / 1048576).toFixed(2);
  }
}

export const isFileAllowed = (imageFile) => {
  if (
    !imageFile.match(/\.(doc|docx|pdf|xls|xlsx)$/) ||
    imageFile.match(/\.[0-9a-z]+\.(doc|docx|pdf|xls|xlsx)$/)
  ) {
    return false;
  }
  return true;
};

export const isVideoAllowed = (imageFile) => {
  if (!imageFile.match(/\.(mp4)$/) || imageFile.match(/\.[0-9a-z]+\.(mp4)$/)) {
    return false;
  }
  return true;
};

export const isJpgPng = (imageFile) => {
  if (
    !imageFile.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG|JFIF|jfif|webp|WEBP)$/) ||
    imageFile.match(/\.[0-9a-z]+\.(jpg|jpeg|png|JPG|JPEG|PNG|JFIF|jfif|webp|WEBP)$/)
  ) {
    return false;
  }
  return true;
};



export const isImageAllowed = (imageFile) => {
  if (
    !imageFile.match(/\.(jpg|jpeg|png|PNG|tif|tiff|TIFF|bmp|BMP|GIF|gif|EPS|eps|raw|RAW|JFIF|jfif|webp|WEBP)$/) ||
    imageFile.match(/\.[0-9a-z]+\.(jpg|jpeg|png|PNG|tif|tiff|TIFF|bmp|BMP|GIF|gif|EPS|eps|raw|RAW|JFIF|jfif|webp|WEBP)$/)
  ) {
    return false;
  }
  return true;
};
export const isStudyMaterial = (imageFile) => {
  if (
    !imageFile.match(/\.(jpg|jpeg|png|pdf|mp3|mp4|PNG|tif|tiff|TIFF|bmp|BMP|GIF|gif|EPS|eps|raw|RAW|JFIF|jfif|webp|WEBP)$/) ||
    imageFile.match(/\.[0-9a-z]+\.(jpg|jpeg|png|pdf|mp3|mp4|PNG|tif|tiff|TIFF|bmp|BMP|GIF|gif|EPS|eps|raw|RAW|JFIF|jfif|webp|WEBP)$/)
  ) {
    return false;
  }
  return true;
};

export const isFileImageAllowed = (imageFile) => {
  if (
    !imageFile.match(/\.(jpg|jpeg|png|doc|docx|pdf|xls|xlsx|PNG|tif|tiff|TIFF|bmp|BMP|GIF|gif|EPS|eps|raw|RAW|JFIF|jfif|webp|WEBP)$/) ||
    imageFile.match(/\.[0-9a-z]+\.(jpg|jpeg|png|doc|docx|pdf|xls|xlsx|PNG|tif|tiff|TIFF|bmp|BMP|GIF|gif|EPS|eps|raw|RAW|JFIF|jfif|webp|WEBP)$/)
  ) {
    return false;
  }
  return true;
};
export const isFileOnlyImagePdf = (imageFile) => {
  if (
    !imageFile.match(/\.(jpg|jpeg|png|pdf|PNG|tif|tiff|TIFF|bmp|BMP|GIF|gif|EPS|eps|raw|RAW|JFIF|jfif|webp|WEBP)$/) ||
    imageFile.match(/\.[0-9a-z]+\.(jpg|jpeg|png|pdf|PNG|tif|tiff|TIFF|bmp|BMP|GIF|gif|EPS|eps|raw|RAW|JFIF|jfif|webp|WEBP)$/)
  ) {
    return false;
  }
  return true;
};

export const onlyXmlAllowed = (imageFile) => {
  if (
    !imageFile.match(/\.(xls|xlsx)$/) ||
    imageFile.match(/\.[0-9a-z]+\.(xls|xlsx)$/)
  ) {
    return false;
  }
  return true;
};

export const isAudioAllowed = (imageFile) => {
  if (!imageFile.match(/\.(mp3)$/) || imageFile.match(/\.[0-9a-z]+\.(mp3)$/)) {
    return false;
  }
  return true;
};
export const examAnswerFileUpload = (file) => {
  if (
    !file.match(/\.(jpg|jpeg|png|pdf|mp3|mp4|PNG|tif|tiff|TIFF|bmp|BMP|GIF|gif|EPS|eps|raw|RAW|JFIF|jfif|webp|WEBP)$/) ||
    file.match(/\.[0-9a-z]+\.(jpg|jpeg|png|pdf|mp3|mp4|PNG|tif|tiff|TIFF|bmp|BMP|GIF|gif|EPS|eps|raw|RAW|JFIF|jfif|webp|WEBP)$/)
  ) {
    return false;
  }
  return true;
};
