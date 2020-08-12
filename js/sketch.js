import position_canvas from './position_canvas.js';
import SkateBoard from './skateboard.js';
import Ball from './ball.js';

const canvas_w = 512;
const canvas_h = 512;
let cnv;

const default_collision_category = 0x0001;

let sb;
let pop_ball;
let ground;

let reset_button;

const engine = Matter.Engine.create();

function windowResized() {
  position_canvas(cnv, width, height);
}

function preload() {

}

function reset_world() {
  Matter.World.clear(engine.world);
  Matter.Engine.clear(engine);

  sb = new SkateBoard(width / 2, height / 2, Matter.World, engine);
  sb.body.restitution = 0.4;

  ground = Matter.Bodies.rectangle(width / 2, height - 15, width * 2, 40, {
    isStatic: true,
    collisionFilter: {
      mask: 0x0001,
      category: 0x0001,
    },
  });
  ground.collisionFilter.category = default_collision_category;
  Matter.World.add(engine.world, ground);

  pop_ball = new Ball(width * 0.75, 0, 50, Matter.World, engine);
  pop_ball.body.restitution = 0.8;
}

function setup() {
  cnv = createCanvas(canvas_w, canvas_h);
  position_canvas(cnv, width, height);

  reset_world();

  reset_button = createButton('Reset');
  reset_button.mousePressed(reset_world);
}

function draw() {
  background(30, 30, 50);
  Matter.Engine.update(engine);

  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width * 2, 40);

  pop_ball.draw();
  pop_ball.update(sb.body, engine);

  sb.draw();
  sb.update();
}

window.preload = preload;
window.windowResized = windowResized;
window.setup = setup;
window.draw = draw;
