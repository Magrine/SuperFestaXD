const takeVideo = () => {
  let iframe, iframeCanvas, iframeVideo, canvasScreenshot;

  canvasScreenshot = document.createElement("canvas");
  iframe = document.querySelector("iframe").contentWindow.document.body;
  iframeCanvas = iframe.querySelector("canvas");

  iframeVideo = iframe.querySelector("video");

  // Ajuste a porcentagem desejada para o frame capturado
  const percentage = 50; // 50% do tamanho original

  const originalWidth = parseFloat(
    window.getComputedStyle(iframeCanvas).getPropertyValue("width")
  );
  const originalHeight = parseFloat(
    window.getComputedStyle(iframeCanvas).getPropertyValue("height")
  );

  canvasScreenshot.width = (percentage / 100) * originalWidth;
  canvasScreenshot.height = (percentage / 100) * originalHeight;

  const ctx = canvasScreenshot.getContext("2d");
  ctx.drawImage(
    iframeVideo,
    0,
    0,
    canvasScreenshot.width,
    canvasScreenshot.height
  );
  ctx.drawImage(
    iframeCanvas,
    0,
    0,
    canvasScreenshot.width,
    canvasScreenshot.height
  );
  return canvasScreenshot; //.toDataURL("image/webp");
};

export default takeVideo;
