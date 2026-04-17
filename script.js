let punchCount = 0;
let autoPunchSpeed = 0;
let qStacks = 0;
let isOraCooldown = false;
let isMudaCooldown = false;
let isQCooldown = false;
const dummy = document.querySelector("#dummyImage");
const idleImage = "./src/dummy.png";
const damagedImage = "./src/dummy_dmg.png";

//DMG

function applyDamageStyle(event) {
  dummy.src = damagedImage;
  dummy.classList.add("scale-110", "animate-hit");

  if (event) showFloatingText("+1", event, "text-yellow-400");

  increase();
}

function resetStyle() {
  dummy.src = idleImage;
  dummy.classList.remove("scale-110", "animate-hit");
}

function punch(event) {
  applyDamageStyle(event);
  clickSound.currentTime = 0;
  clickSound.play();
  setTimeout(resetStyle, 100);
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

function oraPunch(event) {
  if (punchCount < 20 || isOraCooldown) {
    if (isOraCooldown)
      (coolDown.play(),
        (coolDown.currentTime = 0),
        showFloatingText("Cooldown!!", event, "text-red-500"));
    else {
      disable.play();
      disable.currentTime = 0;
    }
    return;
  }

  punchCount -= 20;
  autoPunchSpeed += 1;
  isOraCooldown = true;
  startOra();
  updateDisplay();

  setTimeout(() => {
    isOraCooldown = false;
    updateDisplay();
  }, 10000);
}

function mudaPunch(event) {
  if (punchCount < 30 || isMudaCooldown) {
    if (isMudaCooldown)
      (coolDown.play(),
        (coolDown.currentTime = 0),
        showFloatingText("Cooldown!!", event, "text-red-500"));
    else {
      disable.play();
      disable.currentTime = 0;
    }
    return;
  }

  punchCount -= 30;
  autoPunchSpeed += 1;
  isMudaCooldown = true; // ล็อค
  startMuda();
  updateDisplay();

  setTimeout(() => {
    isMudaCooldown = false; // ปลดล็อคหลัง 20 วิ
    updateDisplay();
  }, 20000);
}

//Yasuo
function steelTempest(event) {
  // เพิ่ม event
  if (isQCooldown) {
    coolDown.currentTime = 0;
    coolDown.play();
    showFloatingText("Cooldown!!", event, "text-red-500"); // โชว์เตือนคูลดาวน์
    return;
  }
  isQCooldown = true;
  qStacks++;
  applyDamageStyle();

  if (qStacks === 4) {
    punchCount += 7;
    showFloatingText("Sorye ge ton yasuo! +7", event, "text-blue-400 text-3xl"); // ตัวใหญ่พิเศษ
    dummy.classList.add("animate-ping");
    r.currentTime = 0;
    r.play();
    bigSlash.currentTime = 0;
    bigSlash.play();
    qStacks = 0;
  } else {
    punchCount += 1;
    showFloatingText("+1", event, "text-white");
    if (qStacks === 1) {
      q1.currentTime = 0;
      q1.play();
      slash1.currentTime = 0;
      slash1.play();
    }
    if (qStacks === 2) {
      q2.currentTime = 0;
      q2.play();
      slash2.currentTime = 0;
      slash2.play();
    }
    if (qStacks === 3) {
      q3.currentTime = 0;
      q3.play();
      slash1.currentTime = 0;
      slash1.play();
    }
  }

  updateDisplay();
  setTimeout(resetStyle, 100);
  setTimeout(() => dummy.classList.remove("animate-ping"), 500);

  setTimeout(() => {
    isQCooldown = false;
    updateDisplay();
  }, 2000);
}

// Display

function updateDisplay() {
  const qBtn = document.querySelector("#qButton");
  const oraBtn = document.querySelector("#oraButton");
  const mudaBtn = document.querySelector("#mudaButton");

  document.querySelector("#number").textContent = punchCount;
  document.querySelector("#autoSpeed").textContent = autoPunchSpeed;
  document.querySelector("#stacks").textContent = qStacks;

  // --- UI สำหรับปุ่ม Q ---
  if (isQCooldown) {
    qBtn.classList.add("opacity-50", "grayscale");
  } else {
    qBtn.classList.remove("opacity-50", "grayscale");
  }

  // --- UI สำหรับปุ่ม Ora (เช็กทั้งแต้มและคูลดาวน์) ---
  if (punchCount < 20 || isOraCooldown) {
    oraBtn.classList.add("bg-gray-600", "opacity-50", "cursor-not-allowed");
    oraBtn.classList.remove("bg-purple-600", "hover:bg-purple-700");
  } else {
    oraBtn.classList.remove("bg-gray-600", "opacity-50", "cursor-not-allowed");
    oraBtn.classList.add("bg-purple-600", "hover:bg-purple-700");
  }

  // --- UI สำหรับปุ่ม Muda (เช็กทั้งแต้มและคูลดาวน์) ---
  if (punchCount < 30 || isMudaCooldown) {
    mudaBtn.classList.add("bg-gray-600", "opacity-50", "cursor-not-allowed");
    mudaBtn.classList.remove("bg-orange-600", "hover:bg-orange-700");
  } else {
    mudaBtn.classList.remove("bg-gray-600", "opacity-50", "cursor-not-allowed");
    mudaBtn.classList.add("bg-orange-600", "hover:bg-orange-700");
  }
}

function showFloatingText(message, event, colorClass = "text-white") {
  const text = document.createElement("div");
  text.innerText = message;

  // ใส่ Class Tailwind 4 ที่คุณมีใน index.html
  text.className = `absolute pointer-events-none font-black text-2xl z-50 ${colorClass} animate-float-up`;

  // ตั้งตำแหน่งตามเมาส์
  text.style.left = `${event.pageX}px`;
  text.style.top = `${event.pageY}px`;

  document.body.appendChild(text);

  // ลบทิ้งเมื่อ Animation จบ
  setTimeout(() => {
    text.remove();
  }, 1000);
}
