export function getFlippedVideoCanvas(video) {
  const frameCanvas = document.createElement("canvas");
  frameCanvas.width = 320;
  frameCanvas.height = 240;
  const frameCtx = frameCanvas.getContext("2d");
  frameCtx.translate(frameCanvas.width, frameCanvas.height);
  frameCtx.scale(-1, -1);
  frameCtx.drawImage(video, 0, 0);
  return frameCanvas;
}
