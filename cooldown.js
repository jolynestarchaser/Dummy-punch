let isBuffOnCooldown = false; // ตัวแปรเช็กสถานะ (Flag)

function useBuff() {
  // 1. เช็กก่อนว่าติดคูลดาวน์อยู่ไหม?
  if (isBuffOnCooldown) {
    consoleg.log("ใจเย็นๆ หมัดยังไม่ฟื้นพลัง!");
    return; // จบฟังก์ชันทันที ไม่ให้ทำงานต่อ
  }

  // 2. ถ้าไม่ติดคูลดาวน์ ให้เริ่มทำงาน
  // เรียกฟังก์ชันบัฟที่คุณเขียนไว้
  isBuffOnCooldown = true; // ล็อคทันที!

  // 3. (Optional) เปลี่ยน UI ให้ดูว่ากดไม่ได้แล้ว
  const buffBtn = document.querySelector("#buffButton");
  buffBtn.classList.add("opacity-50", "cursor-not-allowed", "bg-gray-500");
  buffBtn.classList.remove("bg-yellow-400");

  // 4. ตั้งเวลาปลดล็อค (เช่น 5 วินาที)
  setTimeout(() => {
    isBuffOnCooldown = false; // ปลดล็อค Flag

    // คืนค่า UI ให้กลับมาดูใช้งานได้
    buffBtn.classList.remove("opacity-50", "cursor-not-allowed", "bg-gray-500");
    buffBtn.classList.add("bg-yellow-400");
    console.log("บัฟพร้อมใช้งานแล้ว!");
  }, 5000); // 5000ms = 5 วินาที
}
