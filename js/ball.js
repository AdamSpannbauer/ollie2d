class Ball {
  constructor(x, y, radius, world, engine) {
    this.body = Matter.Bodies.circle(x, y, radius, {
      collisionFilter: {
        mask: 0x0001,
        category: 0x0001,
      },
    });

    this.has_collided = false;
    this.since_collided = 0;
    this.ttl = 30;

    this.exists_in_world = true;
    this.exists = true;

    world.add(engine.world, this.body);
  }

  offscreen() {
    const { x, y } = this.body.position;
    const r = this.body.circleRadius;

    return (
      x + r * 1.1 < 0
       || x - r * 1.1 > width
       || y + r * 1.1 < 0
       || y - r * 1.1 > height
    );
  }

  update(sb_body, engine) {
    if (this.exists) {
      if (!this.has_collided) {
        const collision = Matter.SAT.collides(this.body, sb_body);
        if (collision.collided) {
          this.has_collided = true;
        }
      } else if (
        this.has_collided
        && this.since_collided > this.ttl
      ) {
        this.body.collisionFilter.mask = 0x0002;
        this.body.collisionFilter.category = 0x0002;
      } else if (
        this.has_collided
        && this.offscreen()
        && this.since_collided > this.ttl
      ) {
        this.body.collisionFilter.mask = 0x0002;
        this.body.collisionFilter.category = 0x0002;
        Matter.Composite.remove(engine.world, this.body);
        this.exists = false;
      } else if (
        this.has_collided
        && this.since_collided <= this.ttl
      ) {
        this.since_collided++;
      }
    }
  }

  draw() {
    if (this.exists) {
      push();
      noStroke();
      if (this.has_collided) {
        fill(255, 200);
      }
      ellipse(
        this.body.position.x,
        this.body.position.y,
        this.body.circleRadius * 2,
        this.body.circleRadius * 2,
      );
      pop();
    }
  }
}

export default Ball;
