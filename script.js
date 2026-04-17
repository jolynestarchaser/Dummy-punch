let punchCount = 0;
let autoPunchSpeed = 0;
const dummy = document.querySelector("#dummyImage");
const idleImage = "./src/dummy.png";
const damagedImage = "./src/dummy_dmg.png";

//DMG

function applyDamageStyle() {
  dummy.src = damagedImage;
  dummy.classList.add("scale-110", "animate-hit");
  increase();
}

function resetStyle() {
  dummy.src = idleImage;
  dummy.classList.remove("scale-110", "animate-hit");
}

function punch() {
  applyDamageStyle();
  clickSound.currentTime = 0;
  clickSound.play();

  setTimeout(resetStyle, 100); //
}

function increase() {
  punchCount++;
  document.querySelector("#number").textContent = punchCount;

  dmgSound.currentTime = 0;
  dmgSound.play();
  updateDisplay();
}

// Buff

function startBuffPunch() {
  const rapidPunch = setInterval(() => {
    if (autoPunchSpeed > 0) {
      punchCount += autoPunchSpeed;

      // เล่นเสียงและ Animation
      oraOra.play();
      dmgSound.currentTime = 0;
      dmgSound.play();
      applyDamageStyle();

      setTimeout(resetStyle, 100);

      updateDisplay();
    }
  }, 250);

  setTimeout(() => {
    clearInterval(rapidPunch);
    console.log("Buff Ended!");
  }, 5000);
}

function startPoison() {
  const poison = setInterval(() => {
    if (autoPunchSpeed > 0) {
      punchCount += autoPunchSpeed;

      // เล่นเสียงและ Animation
      dmgSound.currentTime = 0;
      dmgSound.play();
      applyDamageStyle();

      setTimeout(resetStyle, 100);

      updateDisplay();
    }
  }, 1000);
}

// Upgrade

function upgrade() {
  if (punchCount >= 20) {
    punchCount -= 20;
    autoPunchSpeed += 1;
    startBuffPunch();
    updateDisplay();
  } else {
    disable.play();
    disable.currentTime = 0;
  }
}

function upgrade2() {
  if (punchCount >= 30) {
    punchCount -= 30;
    autoPunchSpeed += 1;
    startPoison();
    updateDisplay();
  } else {
    disable.play();
    disable.currentTime = 0;
  }
}

// Display

function updateDisplay() {
  document.querySelector("#number").textContent = punchCount;
}
