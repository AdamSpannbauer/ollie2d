class BoardSegment {
  constructor(x1, y1, x2, y2, thick, world, engine, is_static) {
    this.x = (x1 + x2) / 2;
    this.y = (y1 + y2) / 2;

    this.w = dist(x1, y1, x2, y2);
    this.h = thick;

    is_static = Boolean(is_static);

    const delta_x = x1 - x2;
    const delta_y = y1 - y2;
    const a = atan2(delta_y, delta_x);

    this.body = Matter.Bodies.rectangle(
      this.x, this.y, this.w, this.h, {
        isStatic: is_static,
        angle: a,
      },
    );
  }

  draw() {
    push();
    beginShape();
    noStroke();
    for (const v of this.body.vertices) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
    pop();
  }
}

export default BoardSegment;
