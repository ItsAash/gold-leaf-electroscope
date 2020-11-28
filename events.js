function handDragged() {
  const xDiff = mouseX - pmouseX;
  if (hand.position.x >= 1.1 * width && xDiff > 0)
    return (hand.position.x = 1.1 * width);
  if (hand.position.x <= 0.8 * width && xDiff < 0)
    return (hand.position.x = 0.8 * width);
  hand.position.add(xDiff, 0);
}
