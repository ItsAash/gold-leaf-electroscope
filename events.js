function handDragged() {
  const offSet = (45 / screen.width) * width;
  const maxLeft =
    (electroscope.position.x +
      electroscope.width / 2 +
      hand.width / 2 -
      offSet) /
    width;
  const maxRight = 1.1;

  const xDiff = mouseX - pmouseX;
  if (hand.position.x >= maxRight * width && xDiff > 0)
    return (hand.position.x = maxRight * width);
  if (hand.position.x <= maxLeft * width && xDiff < 0)
    return (hand.position.x = maxLeft * width);
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

/*
alias ga='git add'
alias gc='git commit -v'
alias gd='git diff'
alias gst='git status'

alias gco='git checkout'
alias gcm='git checkout master'

alias gb='git branch'
# view remote branches
alias gbr='git branch --remote'

alias gup='git pull --rebase'
alias gp='git push'
# push a newly created local branch to origin
alias gpsup='git push --set-upstream origin $(git_current_branch)'
*/
