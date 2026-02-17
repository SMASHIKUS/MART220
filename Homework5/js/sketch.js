//Twinstick Zombie Shooter Demo by Adam Jackson

//Variables

let playerImage;

let playerX = 0;
let playerY = 0;

let playerIdle = [];
let playerWalk = [];

let foodImages = [];
let foodItems = [];

let playerSpeed = 1;
let currentFrame = 0;
let frameCounter = 0;
let frameDelay = 20;

//Note add later: 
  //let playerHealth = 100;
  // let zombieIdle = [];
  // let zombieX = 0;
  // let zombieY = 0;
  // let zombieImage;
  // let zombieWalk = [];
  // let zombieSpeed = 2;
  // Fix camera to player

function preload() {
  for (let i = 0; i < 6; i++) {
    playerIdle[i] = loadImage("assets/images/Idle (" + (i + 1) + ").png");
    playerWalk[i] = loadImage("assets/images/Walk (" + (i + 1) + ").png");
  }
  
  for (let i = 0; i < 2; i++) {
    foodImages[i] = loadImage("assets/images/Food (" + (i + 1) + ").png");
  }
}

function setup() {
  createCanvas(400, 400);
  
  for (let i = 0; i < 3; i++) {
    spawnFood();
  }
}

function spawnFood() {
  let food = {
    x: random(0, width),
    y: random(0, height),
    type: floor(random(foodImages.length)),
    size: random(0.5, 1.5)
  };
  foodItems.push(food);
}

function draw() {
  background(220);

  for (let i = 0; i < foodItems.length; i++) {
    let food = foodItems[i];
    push();
    translate(food.x, food.y);
    scale(food.size);
    image(foodImages[food.type], 0, 0);
    pop();
  }

  frameCounter++;
  if (frameCounter >= frameDelay) {
    frameCounter = 0;
    currentFrame = (currentFrame + 1) % playerWalk.length;
  }

  if (keyIsPressed) {
    if (key == "a") {
      playerX -= playerSpeed;
    }
    if (key == "w") {
      playerY -= playerSpeed;
    }
    if (key == "d") {
      playerX += playerSpeed;
    }
    if (key == "s") {
      playerY += playerSpeed;
    }
    image(playerWalk[currentFrame], playerX, playerY);
  }
  else {
    image(playerIdle[currentFrame], playerX, playerY);
  }
}
