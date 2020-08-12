import BoardSegment from './board_segment.js';

class SkateBoard {
  constructor(x, y, world, engine) {
    this.p0 = createVector(x, y);

    this.vertices = this.gen_vertices();
    this.segments = this.gen_segments(world, engine);

    const bodies = this.segments.map((x) => x.body);
    this.body = Matter.Body.create({
      parts: bodies,
      collisionFilter: {
        mask: 0x0001,
        category: 0x0001
      }
    });

    world.add(engine.world, this.body);
  }

  gen_vertices() {
    const w = 100;
    const vertices = [];
    const r = 100;

    const a_step = PI / 30;
    const a_buffer = PI / 4;
    const left_a_hi = PI + a_buffer;
    const right_a_hi = TWO_PI - a_buffer;
    const a_low = TWO_PI * 0.75;

    // Tail
    for (let a = right_a_hi; a >= a_low; a -= a_step) {
      const x = cos(a) * r;
      const y = sin(-a) * r;

      vertices.push({
        x: x + w / 2 + this.p0.x,
        y: y + this.p0.y,
      });
    }

    // Nose
    for (let a = a_low; a >= left_a_hi; a -= a_step) {
      const x = cos(a) * r;
      const y = sin(-a) * r;

      vertices.push({
        x: x - w / 2 + this.p0.x,
        y: y + this.p0.y,
      });
    }

    return vertices;
  }

  gen_segments(world, engine) {
    const segments = [];

    let p1 = this.vertices[0];
    let p2 = this.vertices[this.vertices.length - 1];

    for (let i = 1; i < this.vertices.length; i++) {
      p1 = this.vertices[i];
      p2 = this.vertices[i - 1];
      const segment = new BoardSegment(p1.x, p1.y, p2.x, p2.y, 10, world, engine);
      segments.push(segment);
    }

    return (segments);
  }

  update() {

  }

  draw() {
    for (const segment of this.segments) {
      segment.draw();
    }
  }
}

export default SkateBoard;
