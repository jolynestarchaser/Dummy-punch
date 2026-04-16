let punchCount = 0;
let autoPunchSpeed = 0;
const dummy = document.querySelector("#dummyImage");
const idleImage = "./src/dummy.png";
const damagedImage = "./src/dummy_dmg.png";

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

function startBuffPunch() {
  // 1. ตั้งค่าความเร็วในการรัว (เช่น ทุกๆ 100ms ต่อยหนึ่งครั้ง)
  const rapidPunch = setInterval(() => {
    if (autoPunchSpeed > 0) {
      punchCount += autoPunchSpeed;

      // เล่นเสียงและ Animation
      dmgSound.currentTime = 0;
      dmgSound.play();
      applyDamageStyle();

      // สั่ง resetStyle หลังจาก Animation จบ (สมมติว่าใช้เวลา 50ms ในการรัว)
      setTimeout(resetStyle, 100);

      updateDisplay();
    }
  }, 1000); // รัวทุก 0.1 วินาที

  // 2. สั่งให้ "หยุดรัว" เมื่อครบ 1000ms (1 วินาที)
  setTimeout(() => {
    clearInterval(rapidPunch); // สั่งทำลายลูปการรัวทิ้ง
    console.log("Buff Ended!");
  }, 30000);
}

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
