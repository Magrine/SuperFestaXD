const takeScreenshot = () => {
  let iframe, iframeCanvas, iframeVideo, canvasScreenshot, a, date;

  date = new Date();

  canvasScreenshot = document.createElement("canvas");
  iframe = document.querySelector("iframe").contentWindow.document.body;
  iframeCanvas = iframe.querySelector("canvas");

  iframeVideo = iframe.querySelector("video");

  canvasScreenshot.width = parseFloat(
    window.getComputedStyle(iframeCanvas).getPropertyValue("width")
  );
  canvasScreenshot.height = parseFloat(
    window.getComputedStyle(iframeCanvas).getPropertyValue("height")
  );

  const ctx = canvasScreenshot.getContext("2d", { willReadFrequently: true });
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

  //console.log(iframeVideo);

  a = document.createElement("a");

  canvasScreenshot.toBlob((blob) => {
    const url = URL.createObjectURL(blob);

    a.href = url;
    a.download = `${date}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, "image/png");
};

export default takeScreenshot;
