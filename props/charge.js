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
    this.position.add(this.velocity);
  }

  draw() {
    const chargeImage =
      this.chargeValue === "pos" ? pos_charge_img : neg_charge_img;
    chargeImage.resize(0.1 * glass.width, 0);
    push();
    imageMode(CENTER);
    image(chargeImage, this.position.x, this.position.y);
    pop();
    this.update();
  }
}
