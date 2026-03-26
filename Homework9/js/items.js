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
