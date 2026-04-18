//Twinstick Zombie Shooter Demo by Adam Jackson

//Player variables

let playerImage;

let playerX = 0;
let playerY = 0;

let playerHealth = 100;

let playerIdle = [];
let playerWalk = [];
let playerWalkLeft = [];
let playerWalkRight = [];
let playerWalkUp = [];

// Zombie variables

let zombieImage;

let numZombies = [];
let zombieLocation = [];
let zombieHealth = 25;

let zombieIdle = [];
let zombieWalk = [];
let zombieWalkLeft = [];
let zombieWalkRight = [];

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

// Melee attack variables
let melee = {
  active: false,
  timer: 0,
  duration: 8,
  cooldown: 0,
  cooldownDuration: 20
};

let timer = 20 * 60;
let score = 0;
let gameOver = false;
let playerCollisionSize = 32;
let musicStarted = false;
let lastWeaponPickedUp = -1;
let lastDirection = "right";
let zombieItems = [];
let particles = [];

//Note: add/work on later: (in order of importance).
  // Fix camera to player--->zoom in on player and work on camera movement

function preload() {
  for (let i = 0; i < 6; i++) {
    playerIdle[i] = loadImage("assets/images/CharacterSprites/Idle (" + (i + 1) + ").png");
    playerWalk[i] = loadImage("assets/images/CharacterSprites/Walk (" + (i + 1) + ").png");
    playerWalkLeft[i] = loadImage("assets/images/CharacterSprites/Left (" + (i + 1) + ").png");
    playerWalkRight[i] = loadImage("assets/images/CharacterSprites/Right (" + (i + 1) + ").png");
    playerWalkUp[i] = loadImage("assets/images/CharacterSprites/Up (" + (i + 1) + ").png");

      zombieWalk[i] = loadImage("assets/images/ZombieSprites/Walk (" + (i + 1) + ").png");
      zombieWalkLeft[i] = loadImage("assets/images/ZombieSprites/Left (" + (i + 1) + ").png");
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

  for (let i = 0; i < 3; i++) {
    spawnZombie();
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

function spawnZombie() {
  let zombie = Zombie.spawn(zombieWalk);
  zombieItems.push(zombie);
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

    for (let i = 0; i < zombieItems.length; i++) {
      zombieItems[i].moveTowardsPlayer(playerX, playerY);
      zombieItems[i].display();
    }
    
    // Check if zombie touches player
    checkZombiePlayerCollision(playerX, playerY);

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
    
    // Update cooldown
    if (melee.cooldown > 0) melee.cooldown--;
    
    // Draw melee
    drawMelee(playerX, playerY, lastDirection);
    
    // Check melee collision with zombies
    checkMeleeCollision(playerX, playerY, lastDirection);
    
    // Update and display particles
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].display();
      if (particles[i].isDead()) {
        particles.splice(i, 1);
      }
    }
    
    // Respawn zombies if killed
    while (zombieItems.length < 3) {
      spawnZombie();
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
    
    // Display last weapon image just under the time
    if (lastWeaponPickedUp !== -1) {
      image(weaponImages[lastWeaponPickedUp], width - 45, 85, 30, 30);
    }
  }
}

function drawMelee(x, y, direction) {
  if (!melee.active) return;

  melee.timer--;

  if (melee.timer <= 0) {
    melee.active = false;
    return;
  }

  let progress = melee.timer / melee.duration;
  let startAngle = -PI / 1.5;
  let endAngle = PI / 1.5;
  let swingAngle = lerp(startAngle, endAngle, 1 - progress);

  // Convert direction to angle
  let angle = 0;
  if (direction === "right") angle = 0;
  else if (direction === "left") angle = PI;
  else if (direction === "up") angle = -HALF_PI;
  else if (direction === "down") angle = HALF_PI;

  push();
  translate(x, y);
  rotate(angle + swingAngle);

  // Draw weapon image if one has been picked up
  if (lastWeaponPickedUp !== -1) {
    push();
    translate(40, 0);
    scale(1.5);
    image(weaponImages[lastWeaponPickedUp], 0, 0);
    pop();
  } else {
    // Fallback to bar if no weapon picked up
    fill(180);
    stroke(1);
    strokeWeight(1);
    rect(0, -5 / 2, 60, 5);
  }

  pop();
}

function performMelee() {
  if (melee.cooldown > 0) return;
  melee.active = true;
  melee.timer = melee.duration;
  melee.cooldown = melee.cooldownDuration;
}

function checkMeleeCollision(playerX, playerY, direction) {
  if (!melee.active) return;

  let swingProgress = melee.timer / melee.duration;
  let startAngle = -PI / 1.5;
  let endAngle = PI / 1.5;
  let swingAngle = lerp(startAngle, endAngle, 1 - swingProgress);

  // Convert direction to angle
  let angle = 0;
  if (direction === "right") angle = 0;
  else if (direction === "left") angle = PI;
  else if (direction === "up") angle = -HALF_PI;
  else if (direction === "down") angle = HALF_PI;

  let weaponAngle = angle + swingAngle;
  let weaponDist = 40;
  let weaponX = playerX + cos(weaponAngle) * weaponDist;
  let weaponY = playerY + sin(weaponAngle) * weaponDist;

  for (let i = zombieItems.length - 1; i >= 0; i--) {
    let z = zombieItems[i];
    if (dist(weaponX, weaponY, z.x, z.y) < 40) {
      // Create particles at zombie location
      for (let j = 0; j < 8; j++) {
        particles.push(new Particle(z.x, z.y));
      }
      // Remove zombie
      zombieItems.splice(i, 1);
      score += 10;
    }
  }
}

function checkZombiePlayerCollision(playerX, playerY) {
  for (let z of zombieItems) {
    if (dist(playerX, playerY, z.x, z.y) < 40) {
      gameOver = true;
      return;
    }
  }
}

function keyPressed() {
  if (!musicStarted) {
    userStartAudio();
    backgroundMusic.loop();
    musicStarted = true;
  }
  
  if (key === " ") {
    performMelee();
  }
}

function mousePressed() {
  if (mouseButton === RIGHT) {
    performMelee();
    return false;
  }
}