// ---------------- SPRITE CLASS ----------------
class Sprite {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "gray";
    this.animations = {};
    this.currentAnimation = null;
    this.currentFrame = 0;
    this.frameCounter = 0;
    this.frameDelay = 5;
  }

  addAnimation(name, images) {
    this.animations[name] = images;
  }

  changeAnimation(name) {
    if (this.animations[name]) {
      this.currentAnimation = name;
      this.currentFrame = 0;
      this.frameCounter = 0;
    }
  }

  display() {
    if (this.currentAnimation && this.animations[this.currentAnimation]) {
      const img = this.animations[this.currentAnimation][this.currentFrame];
      imageMode(CENTER);
      image(img, this.x, this.y, this.w, this.h);
      
      this.frameCounter++;
      if (this.frameCounter >= this.frameDelay) {
        this.currentFrame = (this.currentFrame + 1) % this.animations[this.currentAnimation].length;
        this.frameCounter = 0;
      }
    } else {
      push();
      fill(this.color);
      rectMode(CENTER);
      rect(this.x, this.y, this.w, this.h);
      pop();
    }
  }

  overlaps(group, callback) {
    for (let sprite of group.sprites) {
      if (dist(this.x, this.y, sprite.x, sprite.y) < this.w / 2 + sprite.w / 2) {
        callback(this, sprite);
      }
    }
  }
}

class Group {
  constructor() {
    this.sprites = [];
  }

  add(sprite) {
    this.sprites.push(sprite);
  }

  remove(sprite) {
    const index = this.sprites.indexOf(sprite);
    if (index > -1) this.sprites.splice(index, 1);
  }

  display() {
    for (let sprite of this.sprites) {
      sprite.display();
    }
  }
}

// ---------------- VARIABLES ----------------
let player;

let playerIdle = [];
let playerWalk = [];

let foods;
let weapons;

let score = 0;
let timer = 20 * 60;
let gameOver = false;

// ---------------- PRELOAD ----------------
function preload() {
  for (let i = 0; i < 6; i++) {
    playerIdle[i] = loadImage("assets/images/CharacterSprites/Idle (" + (i + 1) + ").png");
    playerWalk[i] = loadImage("assets/images/CharacterSprites/Walk (" + (i + 1) + ").png");
  }
}

// ---------------- SETUP ----------------
function setup() {
  console.log("Setup starting...");
  createCanvas(400, 400);
  console.log("Canvas created");

  // Create player sprite
  player = new Sprite(width/2, height/2, 40, 40);
  player.color = "blue";
  console.log("Player created at", player.x, player.y);

  // Add animations
  player.addAnimation("idle", playerIdle);
  player.addAnimation("walk", playerWalk);
  player.changeAnimation("idle");

  // Groups
  foods = new Group();
  weapons = new Group();

  // Spawn items
  for (let i = 0; i < 3; i++) spawnFood();
  for (let i = 0; i < 3; i++) spawnWeapon();
  console.log("Setup complete. Foods:", foods.sprites.length, "Weapons:", weapons.sprites.length);
}

// ---------------- DRAW ----------------
function draw() {
  background(220);

  if (!gameOver) {
    timer--;
    if (timer <= 0) gameOver = true;

    handleMovement();

    // Collisions
    player.overlaps(foods, collectFood);
    player.overlaps(weapons, collectWeapon);
  }

  // Display all sprites
  push();
  player.display();
  foods.display();
  weapons.display();
  pop();

  drawUI();
}

// ---------------- PLAYER MOVEMENT ----------------
function handleMovement() {
  let moving = false;

  if (keyIsDown(65)) {
    player.x -= 2;
    moving = true;
  }
  if (keyIsDown(68)) {
    player.x += 2;
    moving = true;
  }
  if (keyIsDown(87)) {
    player.y -= 2;
    moving = true;
  }
  if (keyIsDown(83)) {
    player.y += 2;
    moving = true;
  }

  if (moving) {
    player.changeAnimation("walk");
  } else {
    player.changeAnimation("idle");
  }
}

// ---------------- FOOD ----------------
function spawnFood() {
  let f = new Sprite(random(width), random(height), 20, 20);
  f.color = "green";
  f.remove = function() { foods.remove(f); };
  foods.add(f);
}

function collectFood(player, food) {
  food.remove();
  score++;
  spawnFood();
}

// ---------------- WEAPONS ----------------
function spawnWeapon() {
  let w = new Sprite(random(width), random(height), 20, 20);
  w.color = "red";
  w.remove = function() { weapons.remove(w); };
  weapons.add(w);
}

function collectWeapon(player, weapon) {
  weapon.remove();
  spawnWeapon();
}

// ---------------- UI ----------------
function drawUI() {
  fill(0);
  textSize(20);

  if (!gameOver) {
    text("Score: " + score, 10, 20);
    text("Time: " + ceil(timer / 60), 10, 40);
  } else {
    textAlign(CENTER);
    textSize(40);
    text("GAME OVER", width/2, height/2);
  }
}