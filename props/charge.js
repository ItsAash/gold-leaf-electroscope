/***
 * Charge Object
 * @class
 */
class Charge {
  constructor(position, chargeValue = "pos") {
    this.position = position;
    this.velocity = createVector(0, 0);
    this.chargeValue = chargeValue;
  }

  update() {
    // this.position.add(this.velocity);
  }

  draw(rotateAngle = 0.12, translatePoint = createVector()) {
    const chargeImage =
      this.chargeValue === "pos" ? pos_charge_img : neg_charge_img;
    chargeImage.resize(0.09700 * glass.width, 0);
    push();
    imageMode(CENTER);
    translate(translatePoint.x, translatePoint.y);
    rotate(radians(rotateAngle));
    image(chargeImage, this.position.x, this.position.y);
    pop();
    this.update();
  }
}
