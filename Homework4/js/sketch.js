// Homework 3 MART220
// Original sketch by: mrm029
// Found at: https://editor.p5js.org/mrm029/sketches/rk8upjm9m

//--------VARIABLES--------//
let spaghettiImg;
let plateImg;
let spaghettiX = 0;
let spaghettiY = 0;
let plateX = 0;
let plateY = 0;
timeLeft = 10;
let timerInterval;
let shapes = [];
let totalShapeCount = 500;
function preload() {
    spaghettiImg = loadImage('assets/images/FlyingSpaghettiMonster.png');
    plateImg = loadImage('assets/images/Plate.png');
}

//--------SETUP & DRAW--------//
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  setInterval(randomMovement, 5000);
  timerInterval = setInterval(timer, 1000);

  // Fullscreen setup
  document.body.style.overflow = "hidden";
  document.body.style.margin = "0";
  document.body.style.padding = "0";

  for (let i = 0; i < totalShapeCount; i++) {
    shapes.push(createShape("rectangle"));
    shapes.push(createShape("ellipse"));
    shapes.push(createShape("triangle"));


  }
}

function draw() {
  background(0, 10); // faint trail effect

  for (let s of shapes) {
    s.x += s.dx;
    s.y += s.dy;

    // screen wrapping
    if (s.x > width) s.x = 0;
    if (s.x < 0) s.x = width;
    if (s.y > height) s.y = 0;
    if (s.y < 0) s.y = height;

    fill(s.r, s.g, s.b, s.a);

    if (s.type === "ellipse") {
      ellipse(s.x, s.y, s.w, s.h);
    } else if (s.type === "triangle") {
      triangle(
        s.x, s.y - s.h / 2,
        s.x - s.w / 2, s.y + s.h / 2,
        s.x + s.w / 2, s.y + s.h / 2
      );
    } else {
      rect(s.x, s.y, s.w, s.h);
    }
  }

//--------Title/Name Text--------//
  fill(255);
  textAlign(LEFT, TOP);
  textSize(32);
  text("Shattered Glass", 20, 30);
  textAlign(RIGHT, BOTTOM);
  text("Adam Jackson", width - 20, height - 30);

  spaghettiImg.resize(100, 0);
  image(spaghettiImg, spaghettiX, spaghettiY);

  plateImg.resize(200, 0);
  image(plateImg, plateX, plateY);

//--------Character Movement--------//
  if (isKeyPressed) {
        if (keyCode === LEFT_ARROW) {
            if (spaghettiX <= -100) {
                spaghettiX = width - 100;
            }
            spaghettiX -= 5;
        } else if (keyCode === RIGHT_ARROW) {
            if (spaghettiX >= width - 100) {
                spaghettiX = -100;
            }
            spaghettiX += 5;
        } else if (keyCode === UP_ARROW) {
            if (spaghettiY <= -100) {
                spaghettiY = height - 100;
            }
            spaghettiY -= 5;
        } else if (keyCode === DOWN_ARROW) {
            if (spaghettiY >= height - 100) {
                spaghettiY = -100;
            }
            spaghettiY += 5;
        }
    }    
}

function randomMovement() {
    //console.log("moving plate");
    plateX = random(0, width - 200);
    plateY = random(0, height - 200);
}

function timer() {
    console.log("timer tick");
    timeLeft--;
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        // Reset shapes and timer
        shapes = [];
        timeLeft = 10;
    }
}

//--------CLICK TO REDRAW--------//
function mousePressed() {
  shapes = [];

  for (let i = 0; i < totalShapeCount; i++) {
    shapes.push(createShape("rectangle"));
    shapes.push(createShape("ellipse"));
    shapes.push(createShape("triangle"));
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
    a:
      type === "ellipse" ? 50 :
      type === "triangle" ? 70 :
      90
  };
}
