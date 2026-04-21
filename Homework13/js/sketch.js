// draw robbie the robot
let img, img2, img3, img4, img5;

let robbie;
let currentImageSet = 0;
let imageSets;


function preload() {

  title = loadImage("assets/images/Title.png");

  img = loadImage("assets/images/Cyberpunk2077.png");
  img2 = loadImage("assets/images/Fallout4.png");
  img3 = loadImage("assets/images/FINALFANTASYX.png");
  img4 = loadImage("assets/images/NoMansSky.png");
  img5 = loadImage("assets/images/Skyrim.png");

  robbie = loadModel('assets/models/RobotCharacter.obj', true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // Create different image set combinations
  imageSets = [
    [img, img2, img3, img4, img5],
    [img2, img3, img4, img5, img],
    [img3, img4, img5, img, img2],
    [img4, img5, img, img2, img3],
    [img5, img, img2, img3, img4]
  ];
}
function draw() {
  background(200);
  orbitControl();

  drawNameandTitle();
  drawPicture()
  drawPicture2();
  drawPicture3();
  drawPicture4();
  drawPicture5();

  drawRobbie();
}

function mousePressed() {
  currentImageSet = (currentImageSet + 1) % imageSets.length;
}

function drawNameandTitle() {
    push();
    normalMaterial();
    translate(300, 0, -200);
    rotateY(frameCount * -0.02);
    texture(title);
    sphere(100, 24, 16);
    pop();
}


function drawPicture() {
  push();
  normalMaterial();

  let angle = frameCount * 0.01;
  let radius = 350;
  let x = cos(angle) * radius;
  let z = sin(angle) * radius;

  translate(x, 250, z);
  //rotateZ(frameCount * 0.001);
  texture(imageSets[currentImageSet][0]);
  plane(400, 400);
  pop();
}

function drawPicture2() {
  push();
  normalMaterial();

  let angle = frameCount * 0.01 + TWO_PI / 5;
  let radius = 350;
  let x = cos(angle) * radius;
  let z = sin(angle) * radius;

  translate(x, 250, z);
  //rotateZ(frameCount * 0.001);
  texture(imageSets[currentImageSet][1]);
  plane(400, 400);
  pop();
}

function drawPicture3() {
  push();
  normalMaterial();

  let angle = frameCount * 0.01 + (TWO_PI * 2) / 5;
  let radius = 350;
  let x = cos(angle) * radius;
  let z = sin(angle) * radius;

  translate(x, -250, z);
  //rotateZ(frameCount * 0.001);
  texture(imageSets[currentImageSet][2]);
  plane(400, 400);
  pop();
}

function drawPicture4() {
  push();
  normalMaterial();

  let angle = frameCount * 0.01 + (TWO_PI * 3) / 5;
  let radius = 350;
  let x = cos(angle) * radius;
  let z = sin(angle) * radius;

  translate(x, -250, z);
  //rotateZ(frameCount * 0.001);
  texture(imageSets[currentImageSet][3]);
  plane(400, 400);
  pop();
}

function drawPicture5() {
  push();
  normalMaterial();

  let angle = frameCount * 0.01 + (TWO_PI * 4) / 5;
  let radius = 350;
  let x = cos(angle) * radius;
  let z = sin(angle) * radius;

  translate(x, 0, z);
  //rotateZ(frameCount * 0.001);
  texture(imageSets[currentImageSet][4]);
  plane(400, 400);
  pop();
}

function drawRobbie() {
  rotate(3.14);
  normalMaterial();
  scale(3);
  model(robbie);
}