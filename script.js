let punchCount = 0;
let autoPunchSpeed = 0;

function increase() {
  punchCount++;
  document.querySelector("#number").textContent = punchCount;
  clickSound.currentTime = 0;
  clickSound.play();
  dmgSound.currentTime = 0;
  dmgSound.play();
  updateDisplay();
}

setInterval(() => {
  if (autoPunchSpeed > 0) {
    punchCount += autoPunchSpeed;
    dmgSound.currentTime = 0;
    dmgSound.play();
    updateDisplay();
  }
}, 1000);

function upgrade() {
  if (punchCount >= 20) {
    punchCount -= 20;
    autoPunchSpeed += 1;
    dmgSound.currentTime = 0;
    dmgSound.play();
    updateDisplay();
  }
}

function updateDisplay() {
  document.querySelector("#number").textContent = punchCount;
}
