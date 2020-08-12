function position_canvas(cnv, canvas_w, canvas_h) {
  let w = canvas_w;
  let h = canvas_h;

  if (windowWidth < w * 1.1) {
    w = windowWidth * 0.9;
    h = w * (canvas_w / canvas_h);
  }

  if (windowHeight < h * 1.1) {
    h = windowHeight * 0.9;
    w = h * (canvas_h / canvas_w);
  }

  resizeCanvas(w, h);

  const x = (windowWidth - width) / 2;
  const y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

export default position_canvas;
