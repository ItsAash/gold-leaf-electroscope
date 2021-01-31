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
  createCanvas(1366, 637);

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

  if (hand.position.x <= 1087) {
    console.log("earthed");
  }

  if (true) {
    let leftRodCharges = electroscope.rod.leftRodCharges;
    let rightRodCharges = electroscope.rod.rightRodCharges;

    let charges = {
      leftPositive: 0,
      rightPositive: 0,
      leftNegative: 0,
      rightNegative: 0,
    };
    for (const c of leftRodCharges) {
      if (c.chargeValue === "pos") {
        charges.leftPositive++;
      } else {
        charges.leftNegative++;
      }
    }
    for (const c of rightRodCharges) {
      if (c.chargeValue === "pos") {
        charges.rightPositive++;
      } else {
        charges.rightNegative++;
      }
    }

    if (
      charges.leftPositive - charges.rightNegative ===
      charges.rightPositive - charges.leftNegative
    ) {
      electroscope.rod.state = map(leftRodCharges.length, 0, 8, 1, 2);
    }
  }

  MouseDraggedEvent.mouseIsDragged = false;
}
function mouseDragged(e) {
  MouseDraggedEvent = {
    mouseIsDragged: true,
    e: e,
  };
}
