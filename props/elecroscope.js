class Electroscope {
  constructor(electroscopeImage) {
    this.width = (273.2 / 1366) * width;
    this.height = 0;
    this.electroscopeImage = electroscopeImage;

    this.position = createVector(0.5 * width, 0.62 * height);

    this.debugMode = true;
    this.rod = new moveableRod(createVector(0, (width / 1366) * 100));

    this.mouseDraggedCallback = function () {};

    this.charges = [];
    for (let i = -5; i <= 6; i++) {
      this.electroscopeImage.resize(this.width, this.height);
      const prevCharge = this.charges[this.charges.length - 1];
      let nextCharge = "pos";
      if (prevCharge) {
        nextCharge = prevCharge.chargeValue === "pos" ? "neg" : "pos";
      }
      let yOffSet = 8;
      if (nextCharge === "pos") {
        yOffSet = -8;
      }
      const x = i * 12;
      const y = -this.electroscopeImage.height / 2 + 17 + yOffSet;
      this.charges.push(
        new Charge(p5.Vector.add(this.position, createVector(x, y)), nextCharge)
      );
    }
  }

  draw() {
    push();
    imageMode(CENTER);
    this.electroscopeImage.resize(this.width, this.height);
    // 405
    translate(this.position.x, this.position.y);
    image(this.electroscopeImage, 0, 0);
    this.rod.draw();
    pop();

    this.drawCharges(this.charges);

    if (MouseDraggedEvent.mouseIsDragged && this.contains(mouseX, mouseY)) {
      this.mouseDraggedCallback(MouseDraggedEvent.e);
    }
    if (this.debugMode) {
      this.drawBorders();
    }
  }

  /**
   * If mouse is dragged inside the object. It sets the callback
   * @param {requestCallBack} trigger
   */
  mouseDragged(trigger) {
    this.mouseDraggedCallback = trigger;
  }
  /**
   * This callback is called whenever event happens
   * @callback requestCallBack
   */

  /**
   * Check if position is inside image or not
   * @param {number} x X position
   * @param {number} y Y position
   * @returns {boolean} True if it lies inside, False if not
   */
  contains(x, y) {
    if (
      x > this.position.x - this.electroscopeImage.width / 2 &&
      x < this.position.x + this.electroscopeImage.width / 2 &&
      y > this.position.y - this.electroscopeImage.height / 2 &&
      y < this.position.y + this.electroscopeImage.height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }

  drawBorders() {
    push();
    rectMode(CENTER);
    fill(0);
    ellipse(this.position.x, this.position.y, 5, 5);
    noFill();
    stroke(255);
    strokeWeight(2);
    rect(
      this.position.x,
      this.position.y,
      this.electroscopeImage.width,
      this.electroscopeImage.height
    );
    pop();
  }

  drawCharges(charge) {
    for (let i = 0; i < this.charges.length; i++) {
      const charge = this.charges[i];
      charge.draw();
    }
  }
}

function moveableRod(position) {
  this.state = 0;
  this.initailAngle = 15; // degrees
  this.height = (width / 1366) * 90;
  this.width = (width / 1366) * 16;

  const offset = [-7, 7];
  this.leftRodCharges = [];
  this.rightRodCharges = [];
  // drawing rods

  this.initCharge = () => {
    this.leftRodCharges = [];
    this.rightRodCharges = [];
    for (let i = -7; i <= 0; i++) {
      const prevCharge = this.leftRodCharges[this.leftRodCharges.length - 1];
      let nextCharge = "pos";
      if (prevCharge) {
        nextCharge = prevCharge.chargeValue === "pos" ? "neg" : "pos";
      }
      let xOffSet = 5;
      if (nextCharge === "pos") {
        xOffSet = -5;
      }
      const x = xOffSet;
      const y = i * 11;

      this.leftRodCharges.push(
        // new Charge(p5.Vector.add(position, createVector(x, y)), nextCharge)
        new Charge(
          { x: position.x - 6 + x, y: position.y - 11 + y },
          nextCharge
        )
      );

      this.rightRodCharges.push(
        new Charge(
          { x: position.x + 6 + x, y: position.y - 11 + y },
          nextCharge
        )
      );
    }
  };

  this.draw = () => {
    this.drawRods();

    this.initCharge();
    // left rod charges
    for (let charge of this.leftRodCharges) {
      charge.draw(this.state * this.initailAngle, {
        x: position.x,
        y: position.y - this.height / 2,
      });
    }

    //  right rod charges
    for (let charge of this.rightRodCharges) {
      charge.draw(-1 * this.state * this.initailAngle, {
        x: position.x,
        y: position.y - this.height / 2,
      });
    }
  };

  this.drawRods = () => {
    // left rod
    push();
    rectMode(CENTER);
    strokeWeight(0);
    translate(position.x + offset[0], position.y - this.height / 2);
    rotate(radians(this.state * this.initailAngle));
    fill(70);
    rect(0, this.height / 2, this.width, this.height);
    fill(255);
    ellipse(0, 0, 4, 4);
    pop();

    // right rod
    push();
    rectMode(CENTER);
    strokeWeight(0);
    translate(position.x + offset[1], position.y - this.height / 2);
    rotate(radians(-1 * this.state * this.initailAngle));
    fill(70);
    rect(0, this.height / 2, this.width, this.height);
    fill(255);
    ellipse(0, 0, 4, 4);
    pop();
  };

  this.setState = (value) => {
    this.state = value;
    this.initCharge();
  };
  this.initCharge();
}
