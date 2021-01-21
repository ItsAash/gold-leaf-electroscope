/**
 * Images
 */
let hand_img;
let electroscope_img;
let neg_charge_img;
let pos_charge_img;
let glass_rod;

let MouseDraggedEvent = {
  mouseIsDragged: false,
  e: null,
};

// props variable
let hand;
let glass;
let electroscope;

function preload() {
  hand_img = loadImage("./images/electroscope_hand.png");
  electroscope_img = loadImage("./images/electroscope_img.png");
  glass_rod = loadImage("./images/glass_rod.svg");
  neg_charge_img = loadImage("./images/neg_charge.svg");
  pos_charge_img = loadImage("./images/pos_charge.svg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  hand = new Hand(hand_img);
  hand.mouseDragged(handDragged);

  glass = new GlassRod(glass_rod);
  glass.mouseDragged(glassDragged);

  electroscope = new Electroscope(electroscope_img);
}

function draw() {
  background("#d6d6d6");

  hand.draw();
  glass.draw();
  electroscope.draw();
  MouseDraggedEvent.mouseIsDragged = false;
}
function mouseDragged(e) {
  MouseDraggedEvent = {
    mouseIsDragged: true,
    e: e,
  };
}
