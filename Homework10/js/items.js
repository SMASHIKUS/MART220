// Food Class
class Food {
  constructor(x, y, type, size, imageArray) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.size = size;
    this.images = imageArray;
  }

  display() {
    push();
    translate(this.x, this.y);
    scale(this.size);
    image(this.images[this.type], 0, 0);
    pop();
  }

  static spawn(imageArray) {
    let food = new Food(
      random(0, width),
      random(0, height),
      floor(random(imageArray.length)),
      random(0.5, 1.5),
      imageArray
    );
    return food;
  }
}

// Weapon Class
class Weapon {
  constructor(x, y, type, size, imageArray) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.size = size;
    this.images = imageArray;
  }

  display() {
    push();
    translate(this.x, this.y);
    scale(this.size);
    image(this.images[this.type], 0, 0);
    pop();
  }

  static spawn(imageArray) {
    let weapon = new Weapon(
      random(0, width),
      random(0, height),
      floor(random(imageArray.length)),
      1,
      imageArray
    );
    return weapon;
  }
}

// Zombie Class
class Zombie {
  constructor(x, y, imageArray) {
    this.x = x;
    this.y = y;
    this.imageArray = imageArray;
    this.health = 25;
    this.size = 1;
    this.currentFrame = 0;
    this.frameCounter = 0;
    this.frameDelay = 10;
    this.speed = 1.5;
  }

  moveTowardsPlayer(playerX, playerY) {
    let dx = playerX - this.x;
    let dy = playerY - this.y;
    let distance = sqrt(dx * dx + dy * dy);
    
    if (distance > 0) {
      this.x += (dx / distance) * this.speed;
      this.y += (dy / distance) * this.speed;
    }
    
    // Update animation frame
    this.frameCounter++;
    if (this.frameCounter >= this.frameDelay) {
      this.frameCounter = 0;
      this.currentFrame = (this.currentFrame + 1) % this.imageArray.length;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    scale(this.size);
    if (this.imageArray && this.imageArray.length > 0) {
      image(this.imageArray[this.currentFrame], 0, 0);
    }
    pop();
  }

  static spawn(imageArray) {
    let angle = random(TWO_PI);
    let distance = 300; // Spawn distance from player
    let x = playerX + cos(angle) * distance;
    let y = playerY + sin(angle) * distance;
    
    let zombie = new Zombie(x, y, imageArray);
    return zombie;
  }

  takeDamage(amount) {
    this.health -= amount;
    return this.health <= 0;
  }
}

// Particle Class
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-4, 4);
    this.vy = random(-6, -1);
    this.life = 30;
    this.maxLife = 30;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.2; // gravity
    this.life--;
  }

  display() {
    let alpha = map(this.life, 0, this.maxLife, 0, 255);
    fill(255, 0, 0, alpha);
    noStroke();
    ellipse(this.x, this.y, 4);
  }

  isDead() {
    return this.life <= 0;
  }
}
