  const generateFileName = (originalFile) => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = originalFile.type === 'image/png' ? 'png' : 'jpg';
    return `${timestamp}_${randomString}.${extension}`;
  };
  
async function getCroppedImg(imageSrc, pixelCrop) {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  const mimeType = originalFile.type === 'image/png' ? 'image/png' : 'image/jpeg';
    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          const file = new File([blob], generateFileName(originalFile), { type: mimeType });
          resolve(file);
        },
        mimeType,
        0.9 // Quality for JPEG
      );
    });
}

export default getCroppedImg