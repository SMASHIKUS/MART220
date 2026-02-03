//Homework3 MART220
// ---------------- VARIABLES ----------------
let effects = [];
let effectTypes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  effectTypes.push(explosionEffect);
  effectTypes.push(ringEffect);
}

function draw() {
  background(0);

  for (let e of effects) {
    e.update();
    e.draw();
  }

  effects = effects.filter(e => !e.finished);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  let randomEffect = random(effectTypes);
  effects.push(randomEffect(mouseX, mouseY));
}

// ---------------- EFFECTS ----------------

function explosionEffect(x, y) {
  let particles = [];

  for (let i = 0; i < 30; i++) {
    let angle = random(TWO_PI);
    let speed = random(1, 5);

    particles.push({
      pos: createVector(x, y),
      vel: p5.Vector.fromAngle(angle).mult(speed),
      life: 60
    });
  }

  return {
    finished: false,

    update() {
      for (let p of particles) {
        p.pos.add(p.vel);
        p.life--;
      }

      particles = particles.filter(p => p.life > 0);

      if (particles.length === 0) {
        this.finished = true;
      }
    },

    draw() {
      stroke(255);
      for (let p of particles) {
        point(p.pos.x, p.pos.y);
      }
    }
  };
}

function ringEffect(x, y) {
  let radius = 0;
  let maxRadius = 120;

  return {
    finished: false,

    update() {
      radius += 4;
      if (radius > maxRadius) {
        this.finished = true;
      }
    },

    draw() {
      noFill();
      stroke(0, 200, 255);
      strokeWeight(3);
      ellipse(x, y, radius * 2);
    }
  };
}
