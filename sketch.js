// Defining variables
var side = 800;
var Z = {
  x: side / 2,
  y: side / 2,
  diameter: 30
};

// Function that squares complex numbers
function complexSquare(coords) {
  let a = coords[0];
  let b = coords[1];

  return ([pow(a, 2) - pow(b, 2), 2 * a * b]);
}

// Get n iterations after z
function getIterations(z, n) {
  var iterations = [];
  append(iterations, z);

  for (let i = 0; i < n; i++) {
    append(iterations, complexSquare(iterations.reverse()[0]));
  }

  return (iterations);

}

// Converts screen coords to graph coords
function onGraph(screen_coords) {
  graphX = map(screen_coords[0], 0, side, -1.25, 1.25);
  graphY = map(screen_coords[1], 0, side, 1.25, -1.25);
  return ([graphX, graphY])
}

// Converts graph coords to screen coords
function onScreen(graph_coords) {
  screenX = map(graph_coords[0], -1.25, 1.25, 0, side);
  screenY = map(graph_coords[1], 1.25, -1.25, 0, side);
  return ([screenX, screenY])
}

// Create canvas
function setup() {
  createCanvas(side, side);
  frameRate(60);
}

// Main sequence
function draw() {
  let mouse = [mouseX, mouseY];
  let Z_graph = onGraph([Z.x, Z.y]);

  background(0);
  noFill();
  stroke(255);
  ellipse(side/2, side/2, onScreen([1, 0])[0]);
  fill(255);


  // Draw axes
  stroke(255);
  line(0, side / 2, side, side / 2);
  line(side / 2, 0, side / 2, side);

  // Bounding circle while mouse-hover
  if (dist(Z.x, Z.y, mouse[0], mouse[1]) < Z.diameter / 2) {
    fill(0);
    stroke(255);
    ellipse(Z.x, Z.y, 45);
  }

  // Make Z ellipse draggable
  if (dist(mouseIsPressed) {
    fill(255);
    Z.x = mouse[0];
    Z.y = mouse[1];
    Z.diameter = 45;
  }

  // Draw Z ellipse
  fill(255);
  ellipse(Z.x, Z.y, Z.diameter);
  Z.diameter = 30;
  text("Z".concat(' = ', str(Z_graph[0]), ' + ', str(Z_graph[1]), 'i'), Z.x, Z.y - 20)

  // Get n iterations after z and draw ellipses for each
  let iterations_array = getIterations(Z_graph, 10);
  for(let i=0; i < iterations_array.length; i++) {
    let iteration_screen = onScreen(iterations_array[i]);
    fill(255, 212, 56)
    noStroke();
    ellipse(iteration_screen[0], iteration_screen[1], 10);
    // fill(255);
    // text(str(i), iteration_screen[0], iteration_screen[1] - 20)
  }

}
