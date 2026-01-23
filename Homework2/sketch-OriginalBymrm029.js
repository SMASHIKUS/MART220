var x, y, w, h;
var totalShapeCount = 500;


function setup() {
  createCanvas(500,600);
  
  var i = 0
  
  stroke(255, 50);
  for (i = 0; i < totalShapeCount; i++) {
     drawRandomShape("rectangle");
  }
  
  stroke (0, 50);
  for (i = 0; i < totalShapeCount; i++) {
  	 drawRandomShape("ellipse");
  }
}

function draw() {
  
}

function drawRandomShape(choice) {
  x = random(width);
  y = random(height);
  w = random(5, 100);
  h = random(5, 100);
  
  if (choice == "ellipse") {
    noStroke();
    fill(random(25), random(5), random(255), 50);
    ellipse(x, y, w, h);
  }
  else {
    noStroke();
    fill(random(255), random(255), random(255), 90);
    rect(x, y, w, h);
  }
}