let punchCount = 0;
let autoPunchSpeed = 0;
let qStacks = 0;
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

  dmgSound.currentTime = 0;
  dmgSound.play();
  updateDisplay();
}

// Skills

function startOra() {
  const rapidPunch = setInterval(() => {
    if (autoPunchSpeed > 0) {
      punchCount += autoPunchSpeed;
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

function startMuda() {
  const rapidPunch = setInterval(() => {
    if (autoPunchSpeed > 0) {
      punchCount += autoPunchSpeed;

      // เล่นเสียงและ Animation
      mudaMuda.play();
      dmgSound.currentTime = 0;
      dmgSound.play();
      applyDamageStyle();

      setTimeout(resetStyle, 100);

      updateDisplay();
    }
  }, 200);

  setTimeout(() => {
    clearInterval(rapidPunch);
    console.log("Buff Ended!");
  }, 3500);
}
// function startMuda() {
//   const poison = setInterval(() => {
//     if (autoPunchSpeed > 0) {
//       punchCount += autoPunchSpeed;

//       // เล่นเสียงและ Animation
//       mudaMuda.play();
//       dmgSound.currentTime = 0;
//       dmgSound.play();
//       applyDamageStyle();

//       setTimeout(resetStyle, 100);

//       updateDisplay();
//     }
//   }, 1000);
// }

// Upgrade

function oraPunch() {
  if (punchCount >= 20) {
    punchCount -= 20;
    autoPunchSpeed += 1;
    startOra();
    updateDisplay();
  } else {
    disable.play();
    disable.currentTime = 0;
  }
}

function mudaPunch() {
  if (punchCount >= 30) {
    punchCount -= 30;
    autoPunchSpeed += 1;
    startMuda();
    updateDisplay();
  } else {
    disable.play();
    disable.currentTime = 0;
  }
}

//Yasuo
function steelTempest() {
  qStacks++;
  applyDamageStyle();

  setTimeout(resetStyle, 100);
  if (qStacks === 4) {
    let criticalDamage = 7;

    punchCount += criticalDamage;

    dummy.classList.add("animate-ping");

    r.play();

    qStacks = 0;
  } else {
    let normalDamage = 1;
    punchCount += normalDamage;

    if (qStacks === 1) (q1.play(), (q1.currentTime = 0));
    if (qStacks === 2) (q2.play(), (q2.currentTime = 0));
    if (qStacks === 3) (q3.play(), (q3.currentTime = 0));
  }

  updateDisplay();
  // อย่าลืมลบ Class animation ออกด้วย setTimeout นะครับ
  setTimeout(() => dummy.classList.remove("animate-ping"), 500);
}

// Display

function updateDisplay() {
  document.querySelector("#number").textContent = punchCount;
  document.querySelector("#autoSpeed").textContent = autoPunchSpeed;
  document.querySelector("#stacks").textContent = qStacks;

  // ปรับแต่งปุ่ม Yasuo ตาม Stack
  const qBtn = document.querySelector("#qButton");
  if (qStacks === 3) {
    qBtn.classList.add("ring-4", "ring-white", "animate-pulse");
  } else {
    qBtn.classList.remove("ring-4", "ring-white", "animate-pulse");
  }
  const oraBtn = document.querySelector("#oraButton");
  const mudaBtn = document.querySelector("#mudaButton");
  const numberDisplay = document.querySelector("#number");

  numberDisplay.textContent = punchCount;

  // ตรวจสอบเงื่อนไขแต้มสำหรับปุ่ม Muda
  if (punchCount < 30) {
    // แต้มไม่พอ: เปลี่ยนเป็นสีเทา และทำให้ดูเหมือนกดไม่ได้
    mudaBtn.classList.add("bg-gray-600", "opacity-50", "cursor-not-allowed");
    mudaBtn.classList.remove("bg-orange-600", "hover:bg-orange-700"); // สมมติสีเดิมคือม่วง
  } else {
    // แต้มพอแล้ว: คืนค่าสีเดิมให้ปุ่ม
    mudaBtn.classList.remove("bg-gray-600", "opacity-50", "cursor-not-allowed");
    mudaBtn.classList.add("bg-orange-600", "hover:bg-orange-700");
  }
  if (punchCount < 20) {
    oraBtn.classList.add("bg-gray-600", "opacity-50", "cursor-not-allowed");
    oraBtn.classList.remove("bg-purple-600", "hover:bg-purple-700");
  } else {
    // แต้มพอแล้ว: คืนค่าสีเดิมให้ปุ่ม
    oraBtn.classList.remove("bg-gray-600", "opacity-50", "cursor-not-allowed");
    oraBtn.classList.add("bg-purple-600", "hover:bg-purple-700");
  }
}
