class Electroscope {
  constructor(electroscopeImage) {
    this.width = 270;
    this.height = 0;
    this.electroscopeImage = electroscopeImage;

    this.position = createVector(0.5 * width, 0.64 * height);

    this.debugMode = false;

    this.mouseDraggedCallback = function () {};
  }

  draw() {
    push();
    imageMode(CENTER);
    this.electroscopeImage.resize(this.width, this.height);
    translate(this.position.x, this.position.y);
    image(this.electroscopeImage, 0, 0);
    pop();
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
    ellipse(this.position.x, this.position.y, 20, 20);
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
}
