export function getFlippedVideoCanvas(video, count) {
  const frameCanvas = document.createElement("canvas");
  frameCanvas.width = 320;
  frameCanvas.height = 240;
  const frameCtx = frameCanvas.getContext("2d");
  frameCtx.translate(frameCanvas.width, frameCanvas.height);
  frameCtx.scale(-1, -1);

  //frameCtx.fillStyle = "#bdae2a";
  //frameCtx.fillStyle = "#80a692";
  frameCtx.fillStyle = `hsl(${count}, 64%, 45%)`; //64
  frameCtx.drawImage(video, 0, 0);
  // frameCtx.globalCompositeOperation = "color";
  frameCtx.globalCompositeOperation = "difference";
  frameCtx.fillRect(0,0, frameCanvas.width, frameCanvas.height);
  

  return frameCanvas;
}
