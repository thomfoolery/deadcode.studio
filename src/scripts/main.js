// create illo
let illo = new Zdog.Illustration({
  // set canvas with selector
  element: '#zdog-canvas',
  dragRotate: true,
});

// D
new Zdog.Ellipse({
  addTo: illo,
  diameter: 80,
  quarters: 2,
  stroke: 20,
  color: '#C25',
  translate: { x: -160, },
});

// E
new Zdog.Shape({
  addTo: illo,
  radius: 50,
  path: [
    { x: -35, y: -35 },          // start at top left
    { x:  35, y: -35 },          // line to top right
    { move: { x: -35, y: 0 } }, // move to bottom left
    { x:  35, y:  0 },          // line to bottom right
    { move: { x: -35, y: 35 } }, // move to bottom left
    { x:  35, y:  35 },          // line to bottom right
  ],
  closed: false,
  stroke: 20,
  color: '#EA0',
  translate: {
    x: -40,
    y: 0,
  },
});

// A
new Zdog.Polygon({
  addTo: illo,
  radius: 50,
  sides: 3,
  stroke: 20,
  color: '#EA0',
  translate: {
    x: 70,
    y: 15,
  },
});

// D
new Zdog.Ellipse({
  addTo: illo,
  diameter: 80,
  quarters: 2,
  stroke: 20,
  color: '#C25',
  translate: { x: 160, },
});

// C
new Zdog.Ellipse({
  addTo: illo,
  diameter: 80,
  quarters: 2,
  stroke: 20,
  color: '#C25',
  translate: {
    x: -120,
    y: 120,
  },
  rotate: { z: Zdog.TAU/2 }
});

// O
new Zdog.Ellipse({
  addTo: illo,
  diameter: 80,
  stroke: 20,
  color: '#C25',
  translate: {
    x: -40,
    y: 120,
  },
});

// D
new Zdog.Ellipse({
  addTo: illo,
  diameter: 80,
  quarters: 2,
  stroke: 20,
  color: '#C25',
  translate: {
    x: 50,
    y: 120,
  },
});

// E
new Zdog.Shape({
  addTo: illo,
  radius: 50,
  path: [
    { x: -35, y: -35 },          // start at top left
    { x:  35, y: -35 },          // line to top right
    { move: { x: -35, y: 0 } }, // move to bottom left
    { x:  35, y:  0 },          // line to bottom right
    { move: { x: -35, y: 35 } }, // move to bottom left
    { x:  35, y:  35 },          // line to bottom right
  ],
  closed: false,
  stroke: 20,
  color: '#EA0',
  translate: {
    x: 180,
    y: 120,
  },
});


function animate() {
  // rotate illo each frame
  // illo.rotate.y += 0.03;
  illo.updateRenderGraph();
  // animate next frame
  requestAnimationFrame( animate );
}
// start animation
animate();
