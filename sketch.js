let hand_img;
let electroscope_img;
let neg_charge_img;
let pos_charge_img;

let MouseDraggedEvent = {
  mouseIsDragged: false,
  e: null,
};

// props variable
let hand;

function preload() {
  hand_img = loadImage("./images/electroscope_hand.png");
  electroscope_img = loadImage("./images/electroscope_img.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  hand = new Hand(hand_img);
  hand.mouseDragged(handDragged);
}

function draw() {
  background("#d6d6d6");
  // hand_img.resize(600, 0);
  // image(hand_img, 0.7 * width, 150);
  hand.draw();

  MouseDraggedEvent.mouseIsDragged = false;
}

function mouseDragged(e) {
  MouseDraggedEvent = {
    mouseIsDragged: true,
    e: e,
  };
}
