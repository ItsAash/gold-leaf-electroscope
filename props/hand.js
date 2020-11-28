class Hand {
  constructor(handImage) {
    this.width = 700;
    this.height = 0;
    this.handImage = handImage;

    this.position = createVector(1.1 * width, 250);

    this.debugMode = false;

    this.mouseDraggedCallback = function () {};
  }

  draw() {
    push();
    imageMode(CENTER);
    this.handImage.resize(this.width, this.height);
    image(this.handImage, this.position.x, this.position.y);
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
      x > this.position.x - this.handImage.width / 2 &&
      x < this.position.x + this.handImage.width / 2 &&
      y > this.position.y - this.handImage.height / 2 &&
      y < this.position.y + this.handImage.height / 2
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
      this.handImage.width,
      this.handImage.height
    );
    pop();
  }
}
