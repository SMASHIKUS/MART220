//Twinstick Zombie Shooter Demo by Adam Jackson

//Variables

let playerImage;

let playerX = 0;
let playerY = 0;

let playerIdle = [];
let playerWalk = [];
let playerWalkLeft = [];
let playerWalkRight = [];
let playerWalkUp = [];

// Audio variables
let backgroundMusic;
let pickupSound;
let weaponPickupSound;

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
let musicStarted = false;
let lastWeaponPickedUp = -1;
let lastDirection = "right";

//Note: add/work on later: (in order of importance).
  // Fix camera to player--->zoom in on player and work on camera movement
  // let playerHealth = 100;
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
    playerWalkLeft[i] = loadImage("assets/images/CharacterSprites/Left (" + (i + 1) + ").png");
    playerWalkRight[i] = loadImage("assets/images/CharacterSprites/Right (" + (i + 1) + ").png");
    playerWalkUp[i] = loadImage("assets/images/CharacterSprites/Up (" + (i + 1) + ").png");
  }
  
  for (let i = 0; i < 3; i++) {
    foodImages[i] = loadImage("assets/images/Food/Food (" + (i + 1) + ").png");
    weaponImages[i] = loadImage("assets/images/Weapons/Weapon (" + (i + 1) + ").png");
  }
  
  // Load audio files
  backgroundMusic = loadSound("assets/audio/BackgroundMusic.wav");
  pickupSound = loadSound("assets/audio/PickupSound.mp3");
  weaponPickupSound = loadSound("assets/audio/WeaponPickupSound.flac");
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
        lastDirection = "left";
        image(playerWalkLeft[currentFrame], playerX, playerY);
      }
      else if (key == "d") {
        playerX += playerSpeed;
        lastDirection = "right";
        image(playerWalkRight[currentFrame], playerX, playerY);
      }
      else if (key == "w") {
        playerY -= playerSpeed;
        image(playerWalkUp[currentFrame], playerX, playerY);
      }
      else if (key == "s") {
        playerY += playerSpeed;
        image(playerWalk[currentFrame], playerX, playerY);
      }
      else {
        image(playerIdle[currentFrame], playerX, playerY);
      }
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
        // Play food pickup sound effect
        pickupSound.play();
      }
    }
    
    // Check for collision with weapons
    for (let i = weaponItems.length - 1; i >= 0; i--) {
      if (dist(playerX, playerY, weaponItems[i].x, weaponItems[i].y) < playerCollisionSize) {
        lastWeaponPickedUp = weaponItems[i].type;
        weaponItems.splice(i, 1);
        spawnWeapon();
        // Play weapon pickup sound effect
        weaponPickupSound.play();
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
  
  // Display score, timer, and last weapon picked up
  if (!gameOver) {
    fill(0);
    textSize(24);
    textAlign(RIGHT);
    text("Score: " + score, width - 10, 30);
    text("Time: " + ceil(timer / 60), width - 10, 60);
    
    // Display last weapon image
    if (lastWeaponPickedUp !== -1) {
      image(weaponImages[lastWeaponPickedUp], width - 60, 85, 25, 25);
    }
  }
}

function keyPressed() {
  if (!musicStarted) {
    userStartAudio();
    backgroundMusic.loop();
    musicStarted = true;
  }
}