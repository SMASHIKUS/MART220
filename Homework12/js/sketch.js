//Homework 12 - 3D Shapes

//Variables
let img;
let img2;

let x = 0;
let y = 0;
let z = 0;

function preload() {
    img = loadImage("images/PlanetGreen.png");
    img2 = loadImage("images/PlanetBlack.png");
    img3 = loadImage("images/PlanetRed.png");
    img4 = loadImage("images/PlanetBlue.png");
    img5 = loadImage("images/PlanetPurple.png");

}


function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    textureMode(NORMAL);
    angleMode(DEGREES);
}

function draw() {
  background(0);
  orbitControl();

    drawPlanet();

    drawPlanet2();

    drawPlanet3();

    drawPlanet4();

    drawPlanet5();
}

function drawPlanet() {
    push();
    normalMaterial();
    translate(200, 200);
    rotateY(frameCount * 0.05);
    rotateX(frameCount * 0.09);
    rotateZ(frameCount * 0.02);
    texture(img);
    cone(100, 100, 24, 16, true);
    pop();
}

function drawPlanet2() {
    push();
    normalMaterial();
    translate(-200, 200);
    rotateY(frameCount * 0.6);
    rotateX(frameCount * 0.8);
    rotateZ(frameCount * 0.1);
    texture(img2);
    cylinder(100, 100,24, 16, true, true);
    pop();
}

function drawPlanet3() {
    push();
    normalMaterial();
    translate(200, -200);
    rotateY(frameCount * 0.5);
    rotateX(frameCount * 0.1);
    rotateZ(frameCount * 0.2);
    texture(img3);
    box(100, 100, 100);
    pop();
}

function drawPlanet4() {
    push();
    normalMaterial();
    translate(-200, -200);
    rotateY(frameCount * -0.9);
    texture(img4);
    sphere(100, 24, 16);
    pop();
}

function drawPlanet5() {
    push();
    normalMaterial();
    translate(0, 0);
    rotateY(frameCount * 9);
    rotateX(frameCount * 1);
    rotateZ(frameCount * 2);
    texture(img5);
    ellipsoid(50, 150, 75, 24, 24);

    pop();
}