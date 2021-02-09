/***
 * Charge Object
 * @class
 */
class Charge {
  constructor(position, chargeValue = "pos") {
    this.position = createVector(position.x, position.y);
    this.velocity = createVector(0, 0);
    this.chargeValue = chargeValue;

    this.moveCheckValue = {
      cb: function () {},
      distance: createVector(0, 0),
    };
    this.moving = false;
    this.prev = createVector();
  }

  update() {
    this.position.add(this.velocity);
    const distance = this.moveCheckValue.distance;
    const finalPoint = p5.Vector.add(
      this.prev,
      createVector(distance.x, distance.y)
    );

    let condition_x;
    let condition_y;
    if (distance.x > 0) {
      condition_x = this.position.x >= finalPoint.x;
    } else {
      condition_x = this.position.x <= finalPoint.x;
    }

    if (distance.y > 0) {
      condition_y = this.position.y >= finalPoint.y;
    } else {
      condition_y = this.position.y <= finalPoint.y;
    }

    // const dx =
    //   ((finalPoint.x - this.position.x) * distance.x) / Math.abs(distance.x) ||
    //   0;
    // const dy =
    //   ((finalPoint.y - this.position.y) * distance.y) / Math.abs(distance.y) ||
    //   0;

    if (condition_x && condition_y) {
      this.velocity = createVector();
      this.moving = false;
      this.moveCheckValue.cb();
      this.moveCheckValue = {
        cb: function () {},
        distance: createVector(0, 0),
      };
    }
  }

  draw(rotateAngle = 0.12, translatePoint = createVector()) {
    const chargeImage =
      this.chargeValue === "pos" ? pos_charge_img : neg_charge_img;
    chargeImage.resize(0.097 * glass.width, 0);
    push();
    imageMode(CENTER);
    translate(translatePoint.x, translatePoint.y);
    rotate(radians(rotateAngle));
    image(chargeImage, this.position.x, this.position.y);
    pop();
    this.update();
  }
  /**
   * This method take point and animate charge moving to that point.
   * @param {Object} distance  Distance charge need to move {x, y}.
   * @param {Function} callback Callback function after reaching the point.
   */
  move(distance, callback) {
    if (this.moving) return;
    this.moveCheckValue = {
      cb: callback,
      distance: distance,
    };
    this.velocity = createVector(
      (distance.x / Math.abs(distance.x)) * 10,
      (distance.y / Math.abs(distance.y)) * 10
    );
    this.moving = true;
    this.prev = this.position.copy();
  }
}

function animateElectroscopeToRod(
  chargeValue = "pos",
  callback = function () {}
) {
  const charge = new Charge(
    createVector(0.5 * width, 0.3 * height),
    chargeValue
  );
  animating_charges.push(charge);
  charge.move(createVector(0, 250), () => {
    animating_charges.splice(animating_charges.indexOf(charge, 1));
    callback();
  });
}

function animateRodToElectroscope(
  chargeValue = "pos",
  callback = function () {}
) {
  const charge = new Charge(
    createVector(0.5 * width, 0.7 * height),
    chargeValue
  );
  animating_charges.push(charge);
  charge.move(createVector(0, -250), () => {
    animating_charges.splice(animating_charges.indexOf(charge, 1));
    callback();
  });
}

function animateElectroscopeToHand(
  chargeValue = "pos",
  callback = function () {}
) {
  const charge = new Charge(
    createVector(0.5 * width, 0.33 * height),
    chargeValue
  );
  animating_charges.push(charge);
  charge.move(createVector(0.5 * width, 0), () => {
    animating_charges.splice(animating_charges.indexOf(charge, 1));
    callback();
  });
}

function animateHandToElectroscope(
  chargeValue = "pos",
  callback = function () {}
) {
  const charge = new Charge(createVector(width, 0.33 * height), chargeValue);
  animating_charges.push(charge);
  charge.move(createVector(-0.5 * width, 0), () => {
    animating_charges.splice(animating_charges.indexOf(charge, 1));
    callback();
  });
}
