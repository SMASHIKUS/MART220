// Homework 2 MART220
// Original sketcth by: mrm029
// Found at: https://editor.p5js.org/mrm029/sketches/rk8upjm9m

//--------VARIABLES--------//
let shapes = [];
let totalShapeCount = 500;

//--------SETUP & DRAW--------//
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  //Fullscreen setup
  document.body.style.overflow = "hidden";
  document.body.style.margin = "0";
  document.body.style.padding = "0";

  for (let i = 0; i < totalShapeCount; i++) {
    shapes.push(createShape("rectangle"));
    shapes.push(createShape("ellipse"));
  }
}
function draw() {
  background(0, 10); // faint trail effect

  for (let s of shapes) {
    s.x += s.dx;
    s.y += s.dy;

    // screen wrapping effect
    if (s.x > width) s.x = 0;
    if (s.x < 0) s.x = width;
    if (s.y > height) s.y = 0;
    if (s.y < 0) s.y = height;

    fill(s.r, s.g, s.b, s.a);

    if (s.type === "ellipse") {
      ellipse(s.x, s.y, s.w, s.h);
    } else {
      rect(s.x, s.y, s.w, s.h);
    }
  }
}

//--------CREATE SHAPE FUNCTION--------//
function createShape(type) {
  return {
    type: type,
    x: random(width),
    y: random(height),
    w: random(5, 100),
    h: random(5, 100),
    dx: random(-1, 1),
    dy: random(-1, 1),
    r: random(255),
    g: random(255),
    b: random(255),
    a: type === "ellipse" ? 50 : 90
  };
}



