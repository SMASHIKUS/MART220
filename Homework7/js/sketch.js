//Twinstick Zombie Shooter Demo by Adam Jackson

//Variables

let playerImage;

let playerX = 0;
let playerY = 0;

let playerIdle = [];
let playerWalk = [];

let foodImages = [];
let foodItems = [];

let weaponImages = [];
let weaponItems = [];

let playerSpeed = 2; // Increased player speed for better gameplay for this assingnment
let currentFrame = 0;
let frameCounter = 0;
let frameDelay = 10; // Reduced frame delay to match faster player speed

let timer = 20 * 60;
let score = 0;
let gameOver = false;
let playerCollisionSize = 32;

//Note: add/work on later: (in order of importance).
  // Left, right, and up movement and idle animations for player
  // Fix camera to player--->zoom in on player and work on camera movement
  // let playerHealth = 100;
  // weapon collision and equipping weapons
  // let zombieIdle = [];
  // let zombieX = 0;
  // let zombieY = 0;
  // let zombieImage;
  // let zombieWalk = [];
  // let zombieSpeed = 2;  
  // Attack animations and mechanics (zombie and player)
  // zombies chasing and attacking player
  // collision system with zombies, player, and weapons

function preload() {
  for (let i = 0; i < 6; i++) {
    playerIdle[i] = loadImage("assets/images/CharacterSprites/Idle (" + (i + 1) + ").png");
    playerWalk[i] = loadImage("assets/images/CharacterSprites/Walk (" + (i + 1) + ").png");
  }
  
  for (let i = 0; i < 3; i++) {
    foodImages[i] = loadImage("assets/images/Food/Food (" + (i + 1) + ").png");
    weaponImages[i] = loadImage("assets/images/Weapons/Weapon (" + (i + 1) + ").png");
  }
}

function setup() {
  createCanvas(400, 400);
  
  for (let i = 0; i < 3; i++) {
    spawnFood();
  }

  for (let i = 0; i < 3; i++) {
    spawnWeapon();
  }
}

function spawnFood() {
  let food = Food.spawn(foodImages);
  foodItems.push(food);
}

function spawnWeapon() {
  let weapon = Weapon.spawn(weaponImages);
  weaponItems.push(weapon);
}

function draw() {
  background(220);
  
  // Decrease timer
  if (!gameOver) {
    timer--;
    if (timer <= 0) {
      gameOver = true;
    }
  }
  
  if (!gameOver) {
    push();
    translate(-playerX + width/2, -playerY + height/2);
    
    for (let i = 0; i < foodItems.length; i++) {
      foodItems[i].display();
    }

    for (let i = 0; i < weaponItems.length; i++) {
      weaponItems[i].display();
    }

    frameCounter++;
    if (frameCounter >= frameDelay) {
      frameCounter = 0;
      currentFrame = (currentFrame + 1) % playerWalk.length;
    }

    //Player Movement
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
    
    // Check for collision with food
    for (let i = foodItems.length - 1; i >= 0; i--) {
      if (dist(playerX, playerY, foodItems[i].x, foodItems[i].y) < playerCollisionSize) {
        score++;
        foodItems.splice(i, 1);
        spawnFood();
      }
    }
    pop();
  }
  else {
    // Display game over screen
    fill(0);
    textSize(48);
    textAlign(CENTER);
    text("GAME OVER", width / 2, height / 2 - 50);

    textSize(32);
    text("Final Score: " + score, width / 2, height / 2 + 30);
  }
  
  // Display score and timer
  if (!gameOver) {
    fill(0);
    textSize(24);
    textAlign(RIGHT);
    text("Score: " + score, width - 10, 30);
    text("Time: " + ceil(timer / 60), width - 10, 60);
  }
}