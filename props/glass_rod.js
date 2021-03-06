class GlassRod {
  constructor(glassImage) {
    this.width = width / 6;
    this.height = 0;
    this.glassImage = glassImage;

    this.position = createVector(0.02 * width, 0.3 * height);

    this.debugMode = false;

    this.charged = "pos";

    this.mouseDraggedCallback = function () {};
  }

  draw() {
    push();
    imageMode(CENTER);
    this.glassImage.resize(this.width, this.height);
    translate(this.position.x, this.position.y);
    rotate(radians(-45));
    image(this.glassImage, 0, 0);
    pop();
    if (MouseDraggedEvent.mouseIsDragged && this.contains(mouseX, mouseY)) {
      this.mouseDraggedCallback(MouseDraggedEvent.e);
    }
    this.drawCharges();
    if (this.debugMode) {
      this.drawBorders();
    }

    const strength = map(
      dist(
        this.position.x,
        this.position.y,
        electroscope.position.x,
        electroscope.position.y
      ),
      400,
      200,
      1,
      4
    );

    const rodCharges = electroscope.rod.leftRodCharges.concat(
      electroscope.rod.rightRodCharges
    );

    const posRodChargeCount = rodCharges.filter((a) => a.chargeValue === "pos")
      .length;

    const negRodChargeCount = rodCharges.filter((a) => a.chargeValue === "neg")
      .length;

    // console.log(posChargeCount, negChargeCount);

    const posPlateChargeCount = electroscope.charges.filter(
      (a) => a.chargeValue === "pos"
    );

    const negPlateChargeCount = electroscope.charges.filter(
      (a) => a.chargeValue === "neg"
    );

    if (floor(strength) === 1) {
      if (this.charged === "pos" && !earthing) {
        // positive rod case and no earthing
        if (charge1 === undefined) {
          charge1 =
            rodCharges.length / 2 === floor(rodCharges.length / 2)
              ? electroscope.rod.leftRodCharges.find(
                  (e) => e.chargeValue === "neg" && !e.moving
                )
              : electroscope.rod.rightRodCharges.find(
                  (e) => e.chargeValue === "neg" && !e.moving
                );
          charge1.moving = true;
          animateRodToElectroscope("neg", () => {
            if (rodCharges.length / 2 === floor(rodCharges.length / 2)) {
              const index = electroscope.rod.leftRodCharges.indexOf(charge1);
              electroscope.rod.leftRodCharges.splice(index, 1);
            } else {
              const index = electroscope.rod.rightRodCharges.indexOf(charge1);
              electroscope.rod.rightRodCharges.splice(index, 1);
            }
            electroscope.pushCharge(charge1);
            charge1.moving = false;
            charge1 = undefined;
          });
        }
      } else if (this.charged === "neg" && !earthing) {
        // negative rod case and no earthing
        if (charge1 === undefined) {
          charge1 = electroscope.charges.find(
            (e) => e.chargeValue === "neg" && !e.moving
          );
          charge1.moving = true;
          animateElectroscopeToRod("neg", () => {
            const index = electroscope.charges.indexOf(charge1);
            electroscope.charges.splice(index, 1);
            if (rodCharges.length / 2 === floor(rodCharges.length / 2)) {
              electroscope.rod.leftRodCharges.push(charge1);
            } else {
              electroscope.rod.rightRodCharges.push(charge1);
            }
            charge1.moving = false;
            charge1 = undefined;
          });
        }
      } else if (this.charged === "pos" && earthing) {
        // positive charge earthing
        if (charge1 === undefined) {
          charge1 = new Charge(
            p5.Vector.add(
              electroscope.position,
              createVector(
                1000,
                -electroscope.electroscopeImage.height / 2 + 17
              )
            ),
            "neg"
          );
          charge1.moving = true;
          animateHandToElectroscope("neg", () => {
            electroscope.pushCharge(charge1);
            charge1.moving = false;
            charge1 = undefined;
          });
        }
      } else if (this.charged === "neg" && earthing) {
        // negative charge earthing
        if (charge1 === undefined) {
          charge1 = electroscope.charges.find(
            (e) => e.chargeValue === "neg" && !e.moving
          );
          charge1.moving = true;
          animateElectroscopeToHand("neg", () => {
            const index = electroscope.charges.indexOf(charge1);
            electroscope.charges.splice(index, 1);
          });
          charge1.moving = false;
          charge1 = undefined;
        }
      }
    }

    if (floor(strength) === 2) {
      if (this.charged === "pos" && !earthing) {
        // positive rod case and no earthing
        if (charge2 === undefined) {
          charge2 =
            rodCharges.length / 2 === floor(rodCharges.length / 2)
              ? electroscope.rod.leftRodCharges.find(
                  (e) => e.chargeValue === "neg" && !e.moving
                )
              : electroscope.rod.rightRodCharges.find(
                  (e) => e.chargeValue === "neg" && !e.moving
                );
          charge2.moving = true;
          animateRodToElectroscope("neg", () => {
            if (rodCharges.length / 2 === floor(rodCharges.length / 2)) {
              const index = electroscope.rod.leftRodCharges.indexOf(charge2);
              electroscope.rod.leftRodCharges.splice(index, 1);
            } else {
              const index = electroscope.rod.rightRodCharges.indexOf(charge2);
              electroscope.rod.rightRodCharges.splice(index, 1);
            }
            electroscope.pushCharge(charge2);
            charge2.moving = false;
            charge2 = undefined;
          });
        }
      } else if (this.charged === "neg" && !earthing) {
        // negative rod case and no earthing
        if (charge2 === undefined) {
          charge2 = electroscope.charges.find(
            (e) => e.chargeValue === "neg" && !e.moving
          );
          animateElectroscopeToRod("neg", () => {
            const index = electroscope.charges.indexOf(charge2);
            electroscope.charges.splice(index, 1);
            if (rodCharges.length / 2 === floor(rodCharges.length / 2)) {
              electroscope.rod.leftRodCharges.push(charge2);
            } else {
              electroscope.rod.rightRodCharges.push(charge2);
            }
            charge2.moving = false;
            charge2 = undefined;
          });
        }
      } else if (this.charged === "pos" && earthing) {
        // positive charge earthing
        if (charge2 === undefined) {
          charge2 = new Charge(
            p5.Vector.add(
              electroscope.position,
              createVector(
                1000,
                -electroscope.electroscopeImage.height / 2 + 17
              )
            ),
            "neg"
          );
          charge2.moving = true;
          animateHandToElectroscope("neg", () => {
            electroscope.pushCharge(charge2);
            charge2.moving = false;
            charge2 = undefined;
          });
        }
      } else if (this.charged === "neg" && earthing) {
        // negative charge earthing
        if (charge2 === undefined) {
          charge2 = electroscope.charges.find(
            (e) => e.chargeValue === "neg" && !e.mouseDragged
          );
          charge2.moving = true;
          animateElectroscopeToHand("neg", () => {
            const index = electroscope.charges.indexOf(charge2);
            electroscope.charges.splice(index, 1);
            charge2.moving = false;
            charge2 = undefined;
          });
        }
      }
    }

    // movable check
    const m_strength = map(
      Math.abs(posRodChargeCount - negRodChargeCount),
      0,
      4,
      0,
      5
    );
    electroscope.rod.state = m_strength;
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
      x > this.position.x - this.glassImage.width / 2 &&
      x < this.position.x + this.glassImage.width / 2 &&
      y > this.position.y - this.glassImage.height / 2 &&
      y < this.position.y + this.glassImage.height / 2
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
    ellipse(this.position.x, this.position.y, 20, 20);
    noFill();
    stroke(255);
    strokeWeight(2);
    rect(
      this.position.x,
      this.position.y,
      this.glassImage.width,
      this.glassImage.height
    );
    pop();
  }

  drawCharges() {
    const offSetX = 60 * (width / 1366);
    const offSetY = 60 * (width / 1366);

    const chargeImage =
      this.charged === "pos" ? pos_charge_img : neg_charge_img;
    chargeImage.resize(0.1 * this.width, 0);
    for (let i = 0; i < 6; i++) {
      push();
      translate(
        this.position.x - this.width / 2 + offSetX,
        this.position.y - this.width / 2 + offSetY
      );
      rotate(radians(45));
      const charge = new Charge(
        createVector(i * 30 * (width / 1366), 0),
        this.charged
      );
      charge.draw();
      pop();
    }
  }
}
