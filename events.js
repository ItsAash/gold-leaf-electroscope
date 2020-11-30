function handDragged() {
  const xDiff = mouseX - pmouseX;
  if (hand.position.x >= 1.1 * width && xDiff > 0)
    return (hand.position.x = 1.1 * width);
  if (hand.position.x <= 0.805 * width && xDiff < 0)
    return (hand.position.x = 0.805 * width);
  hand.position.add(xDiff, 0);
}

function glassDragged() {
  const xDiff = mouseX - pmouseX;
  if (glass.position.x <= 0.02 * width && xDiff < 0)
    return (glass.position.x = 0.02 * width);
  if (glass.position.x >= 0.33 * width && xDiff > 0)
    return (glass.position.x = 0.33 * width);
  glass.position.add(xDiff, 0);
}
